/** Paint-only lanes for collinear center-to-category connections. The plan borrows existing
 * card rectangles and occurrence identities; it never places notes or changes semantic ports. */
import type {PositionedEdge, PositionedNode} from "../../types";
import {edgePhysicalOccurrence} from "./scene";

type Point = Readonly<{x: number; y: number}>;
export type StackedEdgeRoute = Readonly<{laneX: number; hubSource: boolean;
  hub: Readonly<{x: number; y: number; width: number; height: number}>}>;
type Candidate = Readonly<{edge: PositionedEdge; hub: PositionedNode; peer: PositionedNode; hubSource: boolean}>;

/** Admit only a truly aligned vertical column with at least two connections. Canonical edge
 * identities break distance ties, so typing/paint changes or input iteration cannot reshuffle lanes.
 * Viewport eligibility stays with the caller and its existing endpoint-visibility owner. */
export function stackedEdgeRoutes(edges: readonly PositionedEdge[], nodes: ReadonlyMap<string, PositionedNode>): ReadonlyMap<string, StackedEdgeRoute> {
  const groups = new Map<string, Candidate[]>(), routes = new Map<string, StackedEdgeRoute>();
  for (const edge of edges) {
    if (edge.isCrossLink || edge.kind && edge.kind !== "semantic") continue;
    const sourceKey = edgePhysicalOccurrence(edge, "source"), targetKey = edgePhysicalOccurrence(edge, "target");
    const source = nodes.get(sourceKey), target = nodes.get(targetKey);if (!source || !target || source === target) continue;
    const hubSource = source.role === "center", hub = hubSource ? source : target, peer = hubSource ? target : source;
    if (hub.role !== "center" || peer.role === "center" || !peer.areaId || hub.areaId === peer.areaId) continue;
    const hubPort = hubSource ? edge.sourcePort : edge.targetPort, peerPort = hubSource ? edge.targetPort : edge.sourcePort;
    if (hubPort !== "top" && hubPort !== "bottom" || peerPort !== "top" && peerPort !== "bottom") continue;
    if (Math.abs(peer.x - hub.x) > 12 || Math.abs(peer.y - hub.y) <= (hub.height + peer.height) / 2) continue;
    const key = JSON.stringify([hubSource ? sourceKey : targetKey, peer.areaId, peer.y < hub.y ? "above" : "below"]);
    const group = groups.get(key) ?? [];group.push({edge, hub, peer, hubSource});groups.set(key, group);
  }
  for (const group of groups.values()) {
    if (group.length < 2) continue;
    group.sort((a, b) => Math.abs(a.peer.y - a.hub.y) - Math.abs(b.peer.y - b.hub.y) || a.edge.id.localeCompare(b.edge.id));
    // Nearest routes are innermost. Farther horizontal branches cannot cross shorter rails.
    const left = Math.min(...group.map(row => Math.min(row.hub.x - row.hub.width / 2, row.peer.x - row.peer.width / 2))) - 24;
    const spacing = Math.min(18, 96 / Math.max(1, group.length - 1));
    group.forEach((row, rank) => routes.set(row.edge.id, {laneX: left - rank * spacing, hubSource: row.hubSource,
      hub: {x: row.hub.x, y: row.hub.y, width: row.hub.width, height: row.hub.height}}));
  }
  return routes;
}

/** Keep the exact original gate endpoints and path direction. The departure fans beside the
 * hub before turning vertically; target branches approach inside the existing inter-row gap.
 * Reverse-direction edges reverse every curve/control point, not their semantic arrow policy. */
export function stackedEdgeGeometry(source: Point, target: Point, route: StackedEdgeRoute, style: "bezier" | "straight"):
  Readonly<{d: string; midpoint: Point}> | null {
  const a = route.hubSource ? source : target, b = route.hubSource ? target : source;
  if (Math.abs(b.y - a.y) < 16 || route.laneX >= Math.min(a.x, b.x)) return null;
  const direction = b.y < a.y ? -1 : 1;
  const margin = Math.max(1, Math.abs(a.y - route.hub.y) - route.hub.height / 2);
  const lead = Math.min(24, margin, Math.abs(b.y - a.y) / 4);
  const turn = {x: route.laneX, y: a.y + direction * lead}, end = {x: route.laneX, y: b.y};
  const first = {x: a.x + (route.laneX - a.x) * 0.3, y: a.y}, second = {x: route.laneX, y: a.y};
  const radius = Math.min(8, Math.abs(end.y - turn.y) / 3, Math.abs(b.x - end.x) / 3);
  const before = {x: end.x, y: end.y - direction * radius}, after = {x: end.x + radius, y: end.y};
  const point = (value: Point) => `${value.x} ${value.y}`;
  if (style === "straight") {
    const points = [a, turn, end, b];if (!route.hubSource) points.reverse();
    return {d: `M ${point(points[0])} ${points.slice(1).map(value => `L ${point(value)}`).join(" ")}`,
      midpoint: {x: route.laneX, y: (turn.y + end.y) / 2}};
  }
  const d = route.hubSource
    ? `M ${point(a)} C ${point(first)}, ${point(second)}, ${point(turn)} L ${point(before)} Q ${point(end)}, ${point(after)} L ${point(b)}`
    : `M ${point(b)} L ${point(after)} Q ${point(end)}, ${point(before)} L ${point(turn)} C ${point(second)}, ${point(first)}, ${point(a)}`;
  return {d, midpoint: {x: route.laneX, y: (turn.y + end.y) / 2}};
}
