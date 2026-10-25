/** Shared bounded hierarchy visibility. A matching occurrence retains its actual ancestor path without inventing a semantic shortcut or matching its same-note copies. */
export function hierarchyPathClosure(rows: readonly Readonly<{id: string; parent?: string}>[], matched: Iterable<string>, root?: string): ReadonlySet<string> {
  const nodes = new Map(rows.map(/** Index occurrence identity, never canonical document identity. */ row => [row.id, row]));
  const keep = new Set<string>(root && nodes.has(root) ? [root] : []);
  for (const id of matched) {
    const path: string[] = []; let current: string | undefined = id;
    while (current && path.length <= 8 && nodes.has(current) && !path.includes(current)) {path.push(current);current = nodes.get(current)?.parent;}
    if (current || root && path[path.length - 1] !== root) continue;
    for (const member of path) keep.add(member);
  }
  return keep;
}
