/** Pure measured subtree geometry. Supplied occurrence ancestry/sides remain stable; no source, native editor or camera effects occur here. */
import type {PlexProjection, PlexMeasurement, PlexViewLayout, ViewRect} from "../contracts";
import type {MindMapConfiguration} from "./configuration";
import {MIND_MAP_LIMITS} from "./configuration";

/** Place disjoint vertical subtree bands around a fixed root, with outward x spacing from measured parent/child rectangles. */
export function layoutMindMap(projection: PlexProjection, measurements: readonly PlexMeasurement[], configuration: MindMapConfiguration): PlexViewLayout {
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
  for (const side of [-1, 1] as const) place(horizontal.filter(branch => branch.branch?.side === side), positions.get(root)!, side);
  /** Measure each parent's outward forest before placing its real semantic context above colliding root/side rectangles. */
  const width = (id: string): number => sizes.get(id)!.width + ((children.get(id)?.length ?? 0)
    ? horizontalSpacing + Math.max(...children.get(id)!.map(child => width(child.id))) : 0);
  const totalWidth = above.reduce((sum, row) => sum + width(row.id), 0) + Math.max(0, above.length - 1) * horizontalSpacing;
  let left = -totalWidth / 2;
  for (const parent of above) {
    const forestWidth = width(parent.id);
    // A compact parent belongs just above the root, not above the tallest unrelated side branch.
    // Expanded/wide parent forests move farther only when their horizontal span would collide.
    const top = Math.min(-rootSize.height / 2, ...[...positions.values()]
      .filter(rect => rect.x + rect.width / 2 > left && rect.x - rect.width / 2 < left + forestWidth)
      .map(rect => rect.y - rect.height / 2));
    const size = sizes.get(parent.id)!, rect = {x: left + size.width / 2, y: top - verticalSpacing - extents.get(parent.id)! / 2,
      width: size.width, height: size.height};
    positions.set(parent.id, rect); place(children.get(parent.id) ?? [], rect, 1);
    left += forestWidth + horizontalSpacing;
  }
  if (positions.size !== branches.length) throw new Error("Disconnected hierarchy");
  return {positions, areas: []};
}
