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

/** Find only the nearest genuine earlier occurrence on this reference's own admitted ancestor
 * chain. Opaque IDs are never decoded; same-note copies on another branch confer no authority. */
export function hierarchyReferenceAncestor(rows: readonly Readonly<{id: string; canonical: string; parent?: string; reference?: boolean}>[], referenceId: string): string | null {
  if (rows.length > 2048) return null;
  const nodes = new Map(rows.map(row => [row.id, row]));
  if (nodes.size !== rows.length) return null;
  const reference = nodes.get(referenceId);
  if (!reference?.reference) return null;
  let parent = reference.parent;const visited = new Set([referenceId]);
  for (let depth = 0; parent && depth < 8 && !visited.has(parent); depth++) {
    visited.add(parent);const row = nodes.get(parent);if (!row) return null;
    if (row.canonical === reference.canonical && !row.reference) return row.id;
    parent = row.parent;
  }
  return null;
}
