/** Pure measured subtree geometry. Supplied occurrence ancestry/sides remain stable; no source, native editor or camera effects occur here. */
import type {PlexProjection, PlexMeasurement, PlexViewLayout, ViewRect} from "../contracts";
import type {MindMapConfiguration} from "./configuration";
import {MIND_MAP_LIMITS} from "./configuration";

/** Place disjoint vertical subtree bands around a fixed root, with outward x spacing from measured parent/child rectangles. */
export function layoutMindMap(projection: PlexProjection, measurements: readonly PlexMeasurement[], configuration: MindMapConfiguration): PlexViewLayout {
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
    const band = rows.reduce((sum, child) => sum + measure(child.id, depth + 1), 0) + Math.max(0, rows.length - 1) * configuration.verticalSpacing;
    const height = Math.max(sizes.get(id)!.height, band); active.delete(id); extents.set(id, height); return height;
  };
  for (const branch of branches) measure(branch.id, 0);
  const rootSize = sizes.get(root); if (!rootSize) throw new Error("Missing hierarchy root");
  const positions = new Map<string, ViewRect>([[root, {x: 0, y: 0, width: rootSize.width, height: rootSize.height}]]);
  /** A branch owns its measured band; ancestors remain horizontally separate even when an editor grows. */
  const place = (rows: readonly typeof branches[number][], parent: ViewRect, side: -1 | 1): void => {
    const total = rows.reduce((sum, child) => sum + extents.get(child.id)!, 0) + Math.max(0, rows.length - 1) * configuration.verticalSpacing;
    let top = parent.y - total / 2;
    for (const child of rows) {
      const size = sizes.get(child.id)!, height = extents.get(child.id)!;
      const rect = {width: size.width, height: size.height, x: parent.x + side * (parent.width / 2 + configuration.horizontalSpacing + size.width / 2), y: top + height / 2};
      if (positions.has(child.id)) throw new Error("Repeated hierarchy parent"); positions.set(child.id, rect);
      place(children.get(child.id) ?? [], rect, side); top += height + configuration.verticalSpacing;
    }
  };
  const first = children.get(root) ?? [];
  for (const side of [-1, 1] as const) place(first.filter(branch => branch.branch?.side === side), positions.get(root)!, side);
  if (positions.size !== branches.length) throw new Error("Disconnected hierarchy");
  return {positions, areas: []};
}
