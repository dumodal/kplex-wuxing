/** Pure measured subtree and parent-area geometry. Parent forests occupy measured grid cells above the root; their width reserves lateral branch space. Supplied occurrence ancestry/sides remain stable; the shared host owns area filtering/scrolling/resizing and all native editor/camera effects. */
import type {PlexProjection, PlexMeasurement, PlexViewLayout, ViewRect} from "../contracts";
import type {MindMapConfiguration} from "./configuration";
import {MIND_MAP_LIMITS} from "./configuration";
import {measuredAreaGrid} from "../areaLayout";

/** Place disjoint vertical subtree bands around a fixed root, with outward x spacing from measured parent/child rectangles. */
export function layoutMindMap(projection: PlexProjection, measurements: readonly PlexMeasurement[], configuration: MindMapConfiguration,
  areaHeights: Readonly<Record<string, number>> = {}): PlexViewLayout {
  const horizontalSpacing = configuration.horizontalSpacing / configuration.horizontalDensity;
  const verticalSpacing = configuration.verticalSpacing / configuration.verticalDensity;
  const root = projection.entry, branches = projection.occurrences, sizes = new Map(measurements.map(row => [row.id, row]));
  if (branches.length > MIND_MAP_LIMITS.occurrences || new Set(branches.map(row => row.id)).size !== branches.length) throw new Error("Invalid hierarchy identity");
  const children = new Map<string, typeof branches[number][]>();
  for (const branch of branches) {
    const size = sizes.get(branch.id);
    if (!size || ![size.width, size.height].every(value => Number.isFinite(value) && value > 0) || !branch.branch) throw new Error("Invalid measured hierarchy");
    if (branch.id === root) {if (branch.branch.parent) throw new Error("Root cannot have a parent");continue;}
    const parent = branch.branch.parent;
    if (!parent || !sizes.has(parent)) throw new Error("Missing hierarchy parent");
    const rows = children.get(parent) ?? []; rows.push(branch); children.set(parent, rows);
  }
  const extents = new Map<string, number>(), active = new Set<string>();
  /** Compute every subtree once; malformed ancestry cannot recurse without a finite bound. */
  const measure = (id: string, depth: number): number => {
    const known = extents.get(id); if (known !== undefined) return known;
    if (depth > MIND_MAP_LIMITS.depth || active.has(id)) throw new Error("Invalid hierarchy ancestry");
    active.add(id); const rows = children.get(id) ?? [];
    const band = rows.reduce((sum, child) => sum + measure(child.id, depth + 1), 0) + Math.max(0, rows.length - 1) * verticalSpacing;
    const height = Math.max(sizes.get(id)!.height, band); active.delete(id); extents.set(id, height); return height;
  };
  for (const branch of branches) measure(branch.id, 0);
  const rootSize = sizes.get(root); if (!rootSize) throw new Error("Missing hierarchy root");
  const positions = new Map<string, ViewRect>([[root, {x: 0, y: 0, width: rootSize.width, height: rootSize.height}]]);
  /** A branch owns its measured band; ancestors remain horizontally separate even when an editor grows. */
  const place = (rows: readonly typeof branches[number][], parent: ViewRect, side: -1 | 1): void => {
    const total = rows.reduce((sum, child) => sum + extents.get(child.id)!, 0) + Math.max(0, rows.length - 1) * verticalSpacing;
    let top = parent.y - total / 2;
    for (const child of rows) {
      const size = sizes.get(child.id)!, height = extents.get(child.id)!;
      const rect = {width: size.width, height: size.height, x: parent.x + side * (parent.width / 2 + horizontalSpacing + size.width / 2), y: top + height / 2};
      if (positions.has(child.id)) throw new Error("Repeated hierarchy parent"); positions.set(child.id, rect);
      place(children.get(child.id) ?? [], rect, side); top += height + verticalSpacing;
    }
  };
  const first = children.get(root) ?? [];
  const above = first.filter(branch => branch.role === "parent"), horizontal = first.filter(branch => branch.role !== "parent");
  /** A measured parent subtree is one grid tile, preserving its real ancestry and all editor dimensions. */
  const width = (id: string): number => sizes.get(id)!.width + ((children.get(id)?.length ?? 0)
    ? horizontalSpacing + Math.max(...children.get(id)!.map(child => width(child.id))) : 0);
  // Preserve outward physical gates when visibility removes a parent. Left branches retain
  // the first column; the other columns share right branches. Empty packing cells are geometry
  // only and never become occurrences, semantic targets, cards or focus candidates.
  const leftParents = above.filter(row => row.branch!.side === -1), rightParents = above.filter(row => row.branch!.side === 1);
  const columns = configuration.parentColumns, ordered: Array<typeof above[number] | undefined> = [];
  while (leftParents.length || rightParents.length) for (let column = 0; column < columns; column++)
    ordered.push(columns > 1 && column === 0 ? leftParents.shift() : rightParents.shift() ?? (columns === 1 ? leftParents.shift() : undefined));
  const grid = measuredAreaGrid(ordered.map((row, index) => row ? {id: row.id, width: width(row.id), height: extents.get(row.id)!}
    : {id: `empty-parent-cell-${index}`, width: 1, height: 1}),
    configuration.parentColumns, horizontalSpacing, verticalSpacing);
  const parentWidth = Math.max(rootSize.width, grid.width), height = Math.max(140, Math.min(800, areaHeights.parentHeight ?? 300));
  const parentBounds = {x: -parentWidth / 2, y: -rootSize.height / 2 - verticalSpacing - height, width: parentWidth, height};
  if (!Number.isFinite(height)) throw new Error("Invalid parent area height");
  for (const parent of above) {
    const tile = grid.positions.get(parent.id)!, size = sizes.get(parent.id)!;
    const side = columns === 1 ? 1 : parent.branch!.side;
    const rect = {x: parentBounds.x + (parentWidth - grid.width) / 2 + tile.x + side * (-tile.width / 2 + size.width / 2),
      y: parentBounds.y + tile.y,
      width: size.width, height: size.height};
    positions.set(parent.id, rect); place(children.get(parent.id) ?? [], rect, side);
  }
  // The parent area's actual measured width, not child columns or node interior padding, sets the lateral baseline.
  const lateralRoot = {...positions.get(root)!, width: parentWidth};
  for (const side of [-1, 1] as const) {
    const rows = horizontal.filter(branch => branch.branch?.side === side);
    place([...rows.filter(row => row.role !== "child"), ...rows.filter(row => row.role === "child")], lateralRoot, side);
  }
  if (positions.size !== branches.length) throw new Error("Disconnected hierarchy");
  const areas: PlexViewLayout["areas"][number][] = [{id: "parent", labelKey: "graph.zoneParents", bounds: {...parentBounds, height}, resizeEdge: "top",
    heightPreference: {key: "parentHeight", minimum: 140, maximum: 800}, dropRole: "parent",
    viewport: {...parentBounds, height, contentTop: parentBounds.y, contentHeight: Math.max(height, grid.height), initialScrollTop: 0},
    reflow: {columns: configuration.parentColumns, columnGap: horizontalSpacing, rowGap: verticalSpacing}}];
  const padding = Math.min(8, verticalSpacing / 4, horizontalSpacing / 4);
  for (const [id, dropRole] of [["child-left", "child"], ["child-right", "child"], ["left", "left"]] as const) {
    const rects = branches.filter(row => row.areaId === id).map(row => positions.get(row.id)!);
    if (!rects.length) continue;
    const left = Math.min(...rects.map(rect => rect.x - rect.width / 2)) - padding, top = Math.min(...rects.map(rect => rect.y - rect.height / 2)) - padding;
    areas.push({id, labelKey: dropRole === "child" ? "graph.zoneChildren" : "graph.zoneFriendsChallengers", dropRole,
      bounds: {x: left, y: top, width: Math.max(...rects.map(rect => rect.x + rect.width / 2)) + padding - left,
        height: Math.max(...rects.map(rect => rect.y + rect.height / 2)) + padding - top}});
  }
  return {positions, areas};
}
