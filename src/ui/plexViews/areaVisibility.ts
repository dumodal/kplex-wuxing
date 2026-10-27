/** Shared presentation-only clipping and reveal geometry over already admitted measured rows. */
import type {PositionedEdge, PositionedNode} from "../../types";
import {edgePhysicalOccurrence, type SceneViewport} from "./scene";

/** Keep routes between exact physical endpoints, clipping area-local overflow without changing canonical evidence.
 * Cross-area routes retain the span between both visible areas (or an unbounded endpoint's measured card).
 * The SVG viewport clips stroke, arrowheads, caption and hit path together. Optional visible-endpoint
 * policy suppresses the whole painted route when a scrolled physical gate is hidden; null never
 * removes the admitted canonical relationship. Omission preserves through-area routes. */
export function edgeViewportClip(edge: PositionedEdge, nodes: ReadonlyMap<string, PositionedNode>,
  viewport: (node: PositionedNode) => SceneViewport | undefined): {left: number; top: number; width: number; height: number} | null | undefined {
  const source = nodes.get(edgePhysicalOccurrence(edge, "source")), target = nodes.get(edgePhysicalOccurrence(edge, "target"));
  if (!source || !target) return undefined;
  const a = viewport(source), b = viewport(target);
  /** Match the real physical attachment, including section endpoints, after native scrolling. */
  const hidden = (node: PositionedNode, area: SceneViewport | undefined, port: PositionedEdge["sourcePort"]): boolean => {
    if (area?.edgeVisibility !== "visible-endpoints") return false;
    const x = node.x + (port === "left" ? -node.width / 2 : port === "right" ? node.width / 2 : 0);
    const y = node.y + (port === "top" ? -node.height / 2 : port === "bottom" ? node.height / 2 : 0);
    return x < area.left || x > area.left + area.width || y < area.top || y > area.top + area.height;
  };
  if (hidden(source, a, edge.sourcePort) || hidden(target, b, edge.targetPort)) return null;
  if (!a && !b) return undefined;
  /** Outside cards retain their gate/marker clearance; bounded rows share the actual area rectangle. */
  const bounds = (node: PositionedNode, area?: SceneViewport) => area ?? {
    left: node.x - node.width / 2 - 32, top: node.y - node.height / 2 - 32, width: node.width + 64, height: node.height + 64,
  };
  const first = bounds(source, a), second = bounds(target, b);
  const left = Math.min(first.left, second.left), top = Math.min(first.top, second.top);
  return {left, top, width: Math.max(first.left + first.width, second.left + second.width) - left,
    height: Math.max(first.top + first.height, second.top + second.height) - top};
}

/** Minimal bounded scroll that reveals a measured row; oversized editors retain the row's top edge. */
export function revealRowScrollTop(center: number, height: number, scrollTop: number, viewportHeight: number, contentHeight: number): number {
  const top = center - height / 2, bottom = center + height / 2;
  const next = top < scrollTop || height > viewportHeight ? top : bottom > scrollTop + viewportHeight ? bottom - viewportHeight : scrollTop;
  return Math.max(0, Math.min(Math.max(0, contentHeight - viewportHeight), next));
}

/** Keep an area-hosted editor's toolbar in the visible canvas intersection while its native body retains full dimensions. */
export function editorToolbarInsets(editor: {left: number; top: number; width: number; height: number},
  canvas: {width: number; height: number}, area: {left: number; top: number; width: number; height: number}): {top: number; left: number; right: number} {
  return {top: Math.max(0, -editor.top, area.top - editor.top), left: Math.max(0, -editor.left, area.left - editor.left),
    right: Math.max(0, editor.left + editor.width - canvas.width, editor.left + editor.width - area.left - area.width)};
}
