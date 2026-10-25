/** Input-transparent scene decoration renderer. It paints bounded policy geometry using host theme tokens; marks have no graph endpoints, hit targets, listeners or write actions. */
import type {PlexDecoration} from "../../core/plex/views/contracts";
import type {Translator} from "../../lang";
import {viewLabel, canvasViewText} from "./labels";
import type {PositionedNode} from "../../types";
import {colorValueCss} from "../../adapters/obsidian/colorPresentation";
import {useId} from "react";

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
  const prefix = useId();
  return <svg className="kplex-view-decorations" aria-hidden="true" focusable="false">
    {decorations.some(mark => mark.kind === "guide" && mark.directed) && <defs>
      <marker id={`${prefix}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--text-muted)" />
      </marker>
    </defs>}
    {decorations.map(/** Regions and guides are deliberately outside the interactive semantic edge renderer. */ (mark, index) => mark.kind === "guide"
      ? <polyline key={mark.id} className={`kplex-view-guide${mark.variant ? ` is-${mark.variant}` : ""}`} points={mark.points.map(point => `${point.x},${point.y}`).join(" ")} fill="none"
          markerEnd={mark.directed ? `url(#${prefix}-arrow)` : undefined} />
      : <g key={mark.id} data-kplex-decoration={mark.id} className={`kplex-view-region${mark.tint ? ` is-${mark.tint}` : ""}`}>
        <defs><clipPath id={`${prefix}-${index}`}><rect x={mark.bounds.x + 12} y={mark.bounds.y + 4} width={Math.max(0, mark.bounds.width - 24)} height={mark.description ? 68 : 44} /></clipPath></defs>
        <rect x={mark.bounds.x} y={mark.bounds.y} width={mark.bounds.width} height={mark.bounds.height} rx="14"
          style={mark.color ? {fill: colorValueCss(mark.color, "var(--background-secondary)"), stroke: colorValueCss(mark.color, "var(--background-modifier-border)")} : undefined} />
        <text clipPath={`url(#${prefix}-${index})`} x={mark.bounds.x + 16} y={mark.bounds.y + 25}>{mark.label ?? viewLabel(mark.labelKey, translate)}</text>
        {mark.description && <text clipPath={`url(#${prefix}-${index})`} className="kplex-view-region-description" x={mark.bounds.x + 16} y={mark.bounds.y + 44}>{canvasViewText(mark.description, translate)}</text>}
        {mark.count && <text className="kplex-view-region-count" x={mark.bounds.x + 16} y={mark.bounds.y + (mark.description ? 64 : 44)}>
          {translate("view.shownLocally", {count: counts.get(mark.areaId ?? "") ?? 0})}
        </text>}
      </g>)}
  </svg>;
}
