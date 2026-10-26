/** Shared presentation-only clipping and reveal geometry over already admitted measured rows. */
import type {PositionedEdge, PositionedNode} from "../../types";
import {edgePhysicalOccurrence, type SceneViewport} from "./scene";

/** Keep routes between exact physical endpoints, clipping area-local overflow without changing canonical evidence.
 * Cross-area routes retain the span between both visible areas (or an unbounded endpoint's measured card).
 * The SVG viewport clips stroke, arrowheads, caption and hit path together. */
export function edgeViewportClip(edge: PositionedEdge, nodes: ReadonlyMap<string, PositionedNode>,
  viewport: (node: PositionedNode) => SceneViewport | undefined): {left: number; top: number; width: number; height: number} | undefined {
  const source = nodes.get(edgePhysicalOccurrence(edge, "source")), target = nodes.get(edgePhysicalOccurrence(edge, "target"));
  if (!source || !target) return undefined;
  const a = viewport(source), b = viewport(target);
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
