/** Portable measured grid geometry for view-declared areas. Inputs are admitted rectangles, never source readers or host objects; shared host owners retain clipping, filtering, hit-testing, resizing and persistence. */
import type {ViewRect} from "./contracts";

export type MeasuredAreaItem = Readonly<{id: string; width: number; height: number}>;
export type MeasuredAreaGrid = Readonly<{positions: ReadonlyMap<string, ViewRect>; width: number; height: number}>;

/** Pack finite measured cells into aligned columns/rows. Editor dimensions stay unchanged; the caller supplies density-adjusted gaps and places the resulting area in world coordinates. */
export function measuredAreaGrid(items: readonly MeasuredAreaItem[], columns: number,
  columnGap: number, rowGap: number, paddingX = 24, paddingTop = 42, paddingBottom = 16): MeasuredAreaGrid {
  if (!Number.isInteger(columns) || columns < 1 || columns > 32 || items.length > 2048
    || ![columnGap, rowGap, paddingX, paddingTop, paddingBottom].every(value => Number.isFinite(value) && value >= 0)) throw new Error("Invalid area grid policy");
  if (!items.length) return {positions: new Map(), width: 0, height: 0};
  const count = Math.min(columns, items.length), widths = Array<number>(count).fill(0), heights = Array<number>(Math.ceil(items.length / count)).fill(0), ids = new Set<string>();
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (!item.id || ids.has(item.id) || ![item.width, item.height].every(value => Number.isFinite(value) && value > 0)) throw new Error("Invalid measured area item");
    ids.add(item.id); widths[index % count] = Math.max(widths[index % count], item.width);
    heights[Math.floor(index / count)] = Math.max(heights[Math.floor(index / count)], item.height);
  }
  const xs: number[] = [], ys: number[] = [];
  let x = paddingX, y = paddingTop;
  for (const width of widths) {xs.push(x + width / 2);x += width + columnGap;}
  for (const height of heights) {ys.push(y + height / 2);y += height + rowGap;}
  const positions = new Map<string, ViewRect>();
  for (let index = 0; index < items.length; index++) positions.set(items[index].id,
    {x: xs[index % count], y: ys[Math.floor(index / count)], width: items[index].width, height: items[index].height});
  return {positions, width: x - columnGap + paddingX, height: y - rowGap + paddingBottom};
}
