/** Shared list/grid filtering mechanics over measured occurrences. Geometry policy is supplied by the view's area. */
import type {PlexArea} from "../../core/plex/views/contracts";
import type {PositionedNode} from "../../types";
import {occurrenceKey, type SceneAreaLayout, type SceneViewport} from "./scene";

/** Keep coordinates unless the view explicitly opts into filtered repacking; duplicate canonical notes remain independent rows. */
export function reflowArea(panel: SceneViewport, nodes: PositionedNode[], filter: string,
  matches: (node: PositionedNode, filter: string) => boolean, policy?: PlexArea["reflow"]): SceneAreaLayout {
  const filtering = filter.trim().length > 0, rows = filtering ? nodes.filter(node => matches(node, filter)) : nodes;
  const localPositions = new Map<string, {x: number; y: number}>();
  if (!filtering || !policy) {
    for (const node of rows) localPositions.set(occurrenceKey(node), {x: node.x - panel.left, y: node.y - panel.contentTop});
    return {nodes: rows, localPositions, contentHeight: panel.contentHeight, count: rows.length, filtering};
  }
  const columns = Math.max(1, Math.min(16, Math.round(policy.columns))), gap = Math.max(0, policy.rowGap);
  const top = Math.max(42, policy.paddingTop ?? 42), bottom = Math.max(0, policy.paddingBottom ?? 16);
  let y = top;
  for (let offset = 0; offset < rows.length; offset += columns) {
    const row = rows.slice(offset, offset + columns), height = Math.max(...row.map(node => node.height));
    const width = row.reduce((sum, node) => sum + node.width, 0) + Math.max(0, policy.columnGap) * (row.length - 1);
    let x = Math.max(8, (panel.width - width) / 2);
    for (const node of row) {localPositions.set(occurrenceKey(node), {x: x + node.width / 2, y: y + height / 2});x += node.width + Math.max(0, policy.columnGap);}
    y += height + gap;
  }
  return {nodes: rows, localPositions, contentHeight: Math.max(panel.height, y - (rows.length ? gap : 0) + bottom), count: rows.length, filtering};
}
