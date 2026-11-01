/** Paint-only smooth routing for personal Wu Xing. Measured card borders and visible obstacles
 * determine short border-to-border paths; shared line segments are allowed. Semantic roles/ports,
 * canonical edges, card spacing and host camera remain untouched. */
import type {GateSide, PositionedEdge, PositionedNode} from "../../types";
import {edgePhysicalOccurrence, type SceneViewport} from "./scene";
import {edgeViewportEndpoints, type ViewportEdgeEndpoint} from "./areaVisibility";

type Point = Readonly<{x: number; y: number}>;
type Cubic = Readonly<{a: Point; c1: Point; c2: Point; b: Point}>;
type Obstacle = Readonly<{id: string; left: number; top: number; right: number; bottom: number}>;
export type FloatingEdgeRoute = Readonly<{d: string; midpoint: Point;
  endpoints: Readonly<{source: ViewportEdgeEndpoint; target: ViewportEdgeEndpoint}>}>;
type Candidate = FloatingEdgeRoute & Readonly<{curves: readonly Cubic[]}>;

/** Attach to the rounded card perimeter in the approach direction, with a small stroke gap.
 * The returned side is clipping vocabulary only; it never replaces the edge's semantic port. */
function boundary(node: PositionedNode, toward: Point): Readonly<{point: Point; normal: Point; port: GateSide}> {
  const dx = toward.x - node.x, dy = toward.y - node.y, length = Math.hypot(dx, dy) || 1;
  const direction = {x: dx || dy ? dx / length : 1, y: dy / length};
  const halfWidth = node.width / 2 + 4, halfHeight = node.height / 2 + 4;
  const radius = Math.min(node.role === "center" ? 22 : 16, halfWidth, halfHeight);
  let low = 0, high = Math.hypot(halfWidth, halfHeight);
  for (let step = 0; step < 24; step++) {
    const distance = (low + high) / 2, x = Math.abs(direction.x * distance) - halfWidth + radius, y = Math.abs(direction.y * distance) - halfHeight + radius;
    const signed = Math.hypot(Math.max(x, 0), Math.max(y, 0)) + Math.min(Math.max(x, y), 0) - radius;
    if (signed > 0) high = distance;else low = distance;
  }
  const x = direction.x * high, y = direction.y * high;
  const nx = Math.sign(x) * Math.max(0, Math.abs(x) - halfWidth + radius), ny = Math.sign(y) * Math.max(0, Math.abs(y) - halfHeight + radius), magnitude = Math.hypot(nx, ny) || 1;
  const normal = {x: nx / magnitude, y: ny / magnitude};
  return {point: {x: node.x + x, y: node.y + y}, normal,
    port: Math.abs(normal.x) > Math.abs(normal.y) ? normal.x < 0 ? "left" : "right" : normal.y < 0 ? "top" : "bottom"};
}

/** Project onto a rounded outline rather than tracing a ray from the card center. The convex
 * rounded rectangle permits continuous attachment anywhere along its facing edge. */
function nearestBoundary(node: PositionedNode, toward: Point): ReturnType<typeof boundary> {
  const halfWidth = node.width / 2 + 4, halfHeight = node.height / 2 + 4, radius = Math.min(node.role === "center" ? 22 : 16, halfWidth, halfHeight);
  const x = Math.max(-halfWidth + radius, Math.min(halfWidth - radius, toward.x - node.x));
  const y = Math.max(-halfHeight + radius, Math.min(halfHeight - radius, toward.y - node.y));
  const dx = toward.x - node.x - x, dy = toward.y - node.y - y, length = Math.hypot(dx, dy);
  if (length < 1e-9) return boundary(node, toward);
  const normal = {x: dx / length, y: dy / length};
  return {point: {x: node.x + x + normal.x * radius, y: node.y + y + normal.y * radius}, normal,
    port: Math.abs(normal.x) > Math.abs(normal.y) ? normal.x < 0 ? "left" : "right" : normal.y < 0 ? "top" : "bottom"};
}

/** Alternate convex projections to find a short pair of outline contacts, including the
 * shared perpendicular when unequal-width cards overlap horizontally or vertically. */
function nearestPair(source: PositionedNode, target: PositionedNode): Readonly<{source: ReturnType<typeof boundary>; target: ReturnType<typeof boundary>}> {
  let from = nearestBoundary(source, target), to = nearestBoundary(target, from.point);
  for (let step = 0; step < 12; step++) {from = nearestBoundary(source, to.point);to = nearestBoundary(target, from.point);}
  return {source: from, target: to};
}

/** Evaluate a cubic for deterministic collision sampling and label placement. */
function pointAt(curve: Cubic, t: number): Point {
  const u = 1 - t;
  return {x: u * u * u * curve.a.x + 3 * u * u * t * curve.c1.x + 3 * u * t * t * curve.c2.x + t * t * t * curve.b.x,
    y: u * u * u * curve.a.y + 3 * u * u * t * curve.c1.y + 3 * u * t * t * curve.c2.y + t * t * t * curve.b.y};
}

/** Build only cubic segments, retaining source order and continuous tangents at an outer arc's
 * midpoint. Continuations still belong to the shared visible-endpoint policy. */
function candidate(source: PositionedNode, target: PositionedNode, sourceArea?: SceneViewport, targetArea?: SceneViewport,
  corridor?: Readonly<{axis: "x" | "y"; value: number}>): Candidate | null {
  const sourceAim = corridor ? corridor.axis === "x" ? {x: corridor.value, y: source.y} : {x: source.x, y: corridor.value} : target;
  const targetAim = corridor ? corridor.axis === "x" ? {x: corridor.value, y: target.y} : {x: target.x, y: corridor.value} : source;
  const pair = corridor ? undefined : nearestPair(source, target);
  const from = pair?.source ?? boundary(source, sourceAim), to = pair?.target ?? boundary(target, targetAim);
  const endpoints = edgeViewportEndpoints(from.point, to.point, from.port, to.port, sourceArea, targetArea, {source, target});
  if (!endpoints) return null;
  const a = endpoints.source.point, b = endpoints.target.point;
  let curves: readonly Cubic[];
  if (corridor) {
    const first = corridor.axis === "x" ? {x: corridor.value, y: a.y} : {x: a.x, y: corridor.value};
    const second = corridor.axis === "x" ? {x: corridor.value, y: b.y} : {x: b.x, y: corridor.value};
    const middle = {x: (first.x + second.x) / 2, y: (first.y + second.y) / 2};
    // Elliptical handles spread the bend over the complete arc, avoiding rigid flat elbows.
    curves = [{a, c1: {x: a.x + (first.x - a.x) * 0.55, y: a.y + (first.y - a.y) * 0.55},
      c2: {x: middle.x + (first.x - middle.x) * 0.55, y: middle.y + (first.y - middle.y) * 0.55}, b: middle},
    {a: middle, c1: {x: middle.x + (second.x - middle.x) * 0.55, y: middle.y + (second.y - middle.y) * 0.55},
      c2: {x: b.x + (second.x - b.x) * 0.55, y: b.y + (second.y - b.y) * 0.55}, b}];
  } else {
    const handle = Math.min(100, Math.hypot(b.x - a.x, b.y - a.y) / 3);
    curves = [{a, c1: {x: a.x + from.normal.x * handle, y: a.y + from.normal.y * handle},
      c2: {x: b.x + to.normal.x * handle, y: b.y + to.normal.y * handle}, b}];
  }
  const d = `M ${a.x} ${a.y} ${curves.map(/** Each segment joins with a continuous tangent. */ curve => `C ${curve.c1.x} ${curve.c1.y}, ${curve.c2.x} ${curve.c2.y}, ${curve.b.x} ${curve.b.y}`).join(" ")}`;
  return {d, curves, endpoints, midpoint: curves.length === 1 ? pointAt(curves[0], 0.5) : curves[0].b};
}

/** Exact segment/expanded-rectangle intersection over a sampled curve chord. Slab clipping also
 * catches a long chord crossing a thin card between sample points. */
function intersects(a: Point, b: Point, obstacle: Obstacle): boolean {
  let low = 0, high = 1;
  for (const [start, delta, min, max] of [[a.x, b.x - a.x, obstacle.left - 3, obstacle.right + 3], [a.y, b.y - a.y, obstacle.top - 3, obstacle.bottom + 3]]) {
    if (Math.abs(delta) < 1e-9) {if (start < min || start > max) return false;continue;}
    const first = (min - start) / delta, second = (max - start) / delta;
    low = Math.max(low, Math.min(first, second));high = Math.min(high, Math.max(first, second));
    if (low > high) return false;
  }
  return true;
}

/** Sample once per candidate; only obstacles overlapping its control hull need chord checks. */
function score(route: Candidate, obstacles: readonly Obstacle[]): Readonly<{hits: readonly Obstacle[]; length: number}> {
  const points = [route.curves[0].a], hull = route.curves.flatMap(/** Bezier control hull bounds all sampled chords. */ curve => [curve.a, curve.c1, curve.c2, curve.b]);
  for (const curve of route.curves) for (let step = 1; step <= 48; step++) points.push(pointAt(curve, step / 48));
  const left = Math.min(...hull.map(/** Bound horizontal work before collision sampling. */ point => point.x)), right = Math.max(...hull.map(/** Bound horizontal work before collision sampling. */ point => point.x));
  const top = Math.min(...hull.map(/** Bound vertical work before collision sampling. */ point => point.y)), bottom = Math.max(...hull.map(/** Bound vertical work before collision sampling. */ point => point.y));
  const hits = obstacles.filter(/** Only currently visible card bodies can obstruct paint. */ obstacle => obstacle.right + 3 >= left && obstacle.left - 3 <= right && obstacle.bottom + 3 >= top && obstacle.top - 3 <= bottom
    && points.some(/** Chords retain intersection coverage between samples. */ (point, index) => index > 0 && intersects(points[index - 1], point, obstacle)));
  let length = 0;for (let index = 1; index < points.length; index++) length += Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y);
  return {hits, length};
}

/** Express a straight shortest span as a cubic, preserving one smooth SVG path vocabulary. */
function straightCubic(a: Point, b: Point): Cubic {
  return {a, c1: {x: a.x + (b.x - a.x) / 3, y: a.y + (b.y - a.y) / 3},
    c2: {x: a.x + (b.x - a.x) * 2 / 3, y: a.y + (b.y - a.y) * 2 / 3}, b};
}

/** Round only real obstacle turns. Short straight spans stay short; tangent joins contain no
 * right angles. The corner inset exceeds the maximum cut into a rounded turn. */
function pathCandidate(source: PositionedNode, target: PositionedNode, corners: readonly Point[], sourceArea?: SceneViewport, targetArea?: SceneViewport): Candidate | null {
  if (!corners.length) return candidate(source, target, sourceArea, targetArea);
  const from = nearestBoundary(source, corners[0]), to = nearestBoundary(target, corners[corners.length - 1]);
  const endpoints = edgeViewportEndpoints(from.point, to.point, from.port, to.port, sourceArea, targetArea, {source, target});if (!endpoints) return null;
  const points = [endpoints.source.point, ...corners, endpoints.target.point], curves: Cubic[] = [];let current = points[0];
  for (let index = 1; index < points.length - 1; index++) {
    const previous = points[index - 1], point = points[index], next = points[index + 1];
    const incoming = Math.hypot(point.x - previous.x, point.y - previous.y), outgoing = Math.hypot(next.x - point.x, next.y - point.y);
    if (incoming < 1e-6 || outgoing < 1e-6) continue;
    const cut = Math.min(24, incoming / 3, outgoing / 3);
    const before = {x: point.x + (previous.x - point.x) * cut / incoming, y: point.y + (previous.y - point.y) * cut / incoming};
    const after = {x: point.x + (next.x - point.x) * cut / outgoing, y: point.y + (next.y - point.y) * cut / outgoing};
    curves.push(straightCubic(current, before), {a: before,
      c1: {x: before.x + (point.x - before.x) * 2 / 3, y: before.y + (point.y - before.y) * 2 / 3},
      c2: {x: after.x + (point.x - after.x) * 2 / 3, y: after.y + (point.y - after.y) * 2 / 3}, b: after});current = after;
  }
  curves.push(straightCubic(current, points[points.length - 1]));
  return {curves, endpoints, midpoint: pointAt(curves[Math.floor(curves.length / 2)], 0.5),
    d: `M ${points[0].x} ${points[0].y} ${curves.map(/** Rounded turns and straight spans share exact tangent endpoints. */ curve => `C ${curve.c1.x} ${curve.c1.y}, ${curve.c2.x} ${curve.c2.y}, ${curve.b.x} ${curve.b.y}`).join(" ")}`};
}

/** Find a short visible corner path around local blocking cards. Source and target are virtual
 * vertices: each first/last segment chooses its own nearest outline contact, rather than forcing
 * both ends to one side. At most32 blockers bound the local visibility graph to130 vertices. */
function shortestCandidate(source: PositionedNode, target: PositionedNode, obstacles: readonly Obstacle[], blockers: readonly Obstacle[], sourceArea?: SceneViewport, targetArea?: SceneViewport): Candidate | null {
  const points: Point[] = [source, target];
  for (const item of [...blockers].sort(/** Stable card identity resolves equal-length alternatives. */ (a, b) => a.id.localeCompare(b.id)).slice(0, 32)) {
    for (const x of [item.left - 16, item.right + 16]) for (const y of [item.top - 16, item.bottom + 16]) points.push({x, y});
  }
  const distances = Array<number>(points.length).fill(Infinity), previous = Array<number>(points.length).fill(-1), visited = new Set<number>();distances[0] = 0;
  for (let step = 0; step < points.length; step++) {
    let selected = -1;
    for (let index = 0; index < points.length; index++) if (!visited.has(index) && (selected < 0 || distances[index] < distances[selected])) selected = index;
    if (selected < 0 || !Number.isFinite(distances[selected])) break;
    if (selected === 1) {
      const corners: Point[] = [];let cursor = previous[1];
      while (cursor > 1) {corners.push(points[cursor]);cursor = previous[cursor];}
      corners.reverse();return pathCandidate(source, target, corners, sourceArea, targetArea);
    }
    visited.add(selected);
    for (let next = 1; next < points.length; next++) {
      if (next === selected || visited.has(next)) continue;
      const pair = selected === 0 && next === 1 ? nearestPair(source, target) : undefined;
      const a = pair?.source.point ?? (selected === 0 ? nearestBoundary(source, points[next]).point : points[selected]);
      const b = pair?.target.point ?? (next === 1 ? nearestBoundary(target, points[selected]).point : points[next]);
      if (obstacles.some(/** Routes may overlap other links, but visible card bodies remain obstacles. */ obstacle => intersects(a, b, obstacle))) continue;
      const distance = distances[selected] + Math.hypot(b.x - a.x, b.y - a.y);
      if (distance < distances[next] - 1e-6) {distances[next] = distance;previous[next] = selected;}
    }
  }
  return null;
}

/** Prefer the nearest outline pair and then short visible paths around actual blocking cards.
 * Rounded-corner candidates compete by sampled length; broad outer arcs remain a bounded fallback
 * for dense scenes. Other links are never obstacles and may freely share any part of the route. */
function routeAround(source: PositionedNode, target: PositionedNode, obstacles: readonly Obstacle[], sourceArea?: SceneViewport, targetArea?: SceneViewport): FloatingEdgeRoute | null {
  const direct = candidate(source, target, sourceArea, targetArea);if (!direct) return null;
  let best = direct, bestScore = score(direct, obstacles);if (!bestScore.hits.length) return best;
  const blockers = new Map(bestScore.hits.map(/** Retain only actual obstructing card identities. */ item => [item.id, item]));
  for (let attempt = 0; attempt < 4; attempt++) {
    const shortest = shortestCandidate(source, target, obstacles, [...blockers.values()], sourceArea, targetArea);
    if (shortest) {
      const result = score(shortest, obstacles);
      if (!result.hits.length) return !bestScore.hits.length && bestScore.length < result.length ? best : shortest;
      for (const hit of result.hits) blockers.set(hit.id, hit);
    }
    const bounds = [...blockers.values()], margin = 32 + attempt * 24;
    let left = Math.min(...bounds.map(/** Route beside blockers rather than around an unrelated source region. */ item => item.left)) - margin;
    let right = Math.max(...bounds.map(/** Route beside blockers rather than around an unrelated source region. */ item => item.right)) + margin;
    let top = Math.min(...bounds.map(/** Route beside blockers rather than around an unrelated source region. */ item => item.top)) - margin;
    let bottom = Math.max(...bounds.map(/** Route beside blockers rather than around an unrelated source region. */ item => item.bottom)) + margin;
    for (const node of [source, target]) {
      // A corridor can lie between the two cards, but its control handles cannot enter either body.
      if (left > node.x - node.width / 2 - 4 && left < node.x + node.width / 2 + 4) left = node.x - node.width / 2 - margin;
      if (right > node.x - node.width / 2 - 4 && right < node.x + node.width / 2 + 4) right = node.x + node.width / 2 + margin;
      if (top > node.y - node.height / 2 - 4 && top < node.y + node.height / 2 + 4) top = node.y - node.height / 2 - margin;
      if (bottom > node.y - node.height / 2 - 4 && bottom < node.y + node.height / 2 + 4) bottom = node.y + node.height / 2 + margin;
    }
    let clear: Candidate | null = null, clearLength = Infinity;
    for (const corridor of [{axis: "x" as const, value: left}, {axis: "x" as const, value: right}, {axis: "y" as const, value: top}, {axis: "y" as const, value: bottom}]) {
      const next = candidate(source, target, sourceArea, targetArea, corridor);if (!next) continue;
      const result = score(next, obstacles);
      if (!result.hits.length && result.length < clearLength) {clear = next;clearLength = result.length;}
      if (result.hits.length < bestScore.hits.length || result.hits.length === bestScore.hits.length && result.length < bestScore.length) {best = next;bestScore = result;}
      for (const hit of result.hits) blockers.set(hit.id, hit);
    }
    if (clear && (bestScore.hits.length || clearLength < bestScore.length)) {best = clear;bestScore = score(clear, obstacles);}
  }
  return best;
}

/** Prepare immutable curve paint once for the rendered scene. Hidden rows never supply routes
 * or obstacles; input order, semantic port assignment and hover state cannot change attachment. */
export function floatingEdgeRoutes(edges: readonly PositionedEdge[], nodes: ReadonlyMap<string, PositionedNode>,
  viewportForNode: (node: PositionedNode) => SceneViewport | undefined): ReadonlyMap<string, FloatingEdgeRoute> {
  const obstacles: Obstacle[] = [];
  for (const [id, node] of nodes) {
    const area = viewportForNode(node), left = Math.max(node.x - node.width / 2, area?.left ?? -Infinity), right = Math.min(node.x + node.width / 2, area ? area.left + area.width : Infinity);
    const top = Math.max(node.y - node.height / 2, area?.top ?? -Infinity), bottom = Math.min(node.y + node.height / 2, area ? area.top + area.height : Infinity);
    if (right > left && bottom > top) obstacles.push({id, left, top, right, bottom});
  }
  const routes = new Map<string, FloatingEdgeRoute>();
  for (const edge of edges) {
    const sourceId = edgePhysicalOccurrence(edge, "source"), targetId = edgePhysicalOccurrence(edge, "target"), source = nodes.get(sourceId), target = nodes.get(targetId);
    if (!source || !target || source === target) continue;
    const route = routeAround(source, target, obstacles.filter(/** Endpoints own their outward border tangent; only other cards obstruct the span. */ obstacle => obstacle.id !== sourceId && obstacle.id !== targetId), viewportForNode(source), viewportForNode(target));
    if (route) routes.set(edge.id, route);
  }
  return routes;
}
