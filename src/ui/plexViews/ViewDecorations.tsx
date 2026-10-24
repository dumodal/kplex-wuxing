/** Input-transparent scene decoration renderer. It paints bounded policy geometry using host theme tokens; marks have no graph endpoints, hit targets, listeners or write actions. */
import type {PlexDecoration} from "../../core/plex/views/contracts";
import type {Translator} from "../../lang";
import {viewLabel} from "./labels";
import type {PositionedNode} from "../../types";

/** Count admitted filtered rows, including offscreen overflow, without invoking node/relationship readers. Ungrouped fixed occurrences can sit inside a region without belonging to its scroll surface. */
export function viewDecorationCounts(decorations: readonly PlexDecoration[], nodes: readonly PositionedNode[], admitted: ReadonlySet<string>,
  areaRows: Readonly<Record<string, {nodes: readonly PositionedNode[]} | undefined>>): ReadonlyMap<string, number> {
  const counts = new Map<string, number>();
  for (const mark of decorations) {
    if (mark.kind !== "region" || !mark.areaId || !mark.count) continue;
    const rows = areaRows[mark.areaId]?.nodes ?? nodes.filter(node => node.areaId === mark.areaId);
    const fixed = nodes.filter(node => !node.areaId && node.x >= mark.bounds.x && node.x <= mark.bounds.x + mark.bounds.width
      && node.y >= mark.bounds.y && node.y <= mark.bounds.y + mark.bounds.height);
    counts.set(mark.areaId, [...rows, ...fixed].reduce((count, node) => count + (admitted.has(node.page.path) ? node.page.transient?.groupMembers?.length ?? 1 : 0), 0));
  }
  return counts;
}

/** Render local shown counts supplied by the shared visible-occurrence owner, including expanded group membership. */
export function ViewDecorations({decorations, counts, translate}: {decorations: readonly PlexDecoration[]; counts: ReadonlyMap<string, number>; translate: Translator}) {
  return <svg className="kplex-view-decorations" aria-hidden="true" focusable="false">
    {decorations.map(/** Regions and guides are deliberately outside the interactive semantic edge renderer. */ mark => mark.kind === "guide"
      ? <polyline key={mark.id} className="kplex-view-guide" points={mark.points.map(point => `${point.x},${point.y}`).join(" ")} fill="none" />
      : <g key={mark.id} data-kplex-decoration={mark.id} className={`kplex-view-region${mark.tint ? ` is-${mark.tint}` : ""}`}>
        <rect x={mark.bounds.x} y={mark.bounds.y} width={mark.bounds.width} height={mark.bounds.height} rx="14" />
        <text x={mark.bounds.x + 16} y={mark.bounds.y + 25}>{mark.label ?? viewLabel(mark.labelKey, translate)}</text>
        {mark.count && <text className="kplex-view-region-count" x={mark.bounds.x + 16} y={mark.bounds.y + 44}>
          {translate("view.shownLocally", {count: counts.get(mark.areaId ?? "") ?? 0})}
        </text>}
      </g>)}
  </svg>;
}
