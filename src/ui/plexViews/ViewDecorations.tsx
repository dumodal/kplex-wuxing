/** Scene decorations use host theme tokens without graph endpoints. An optional caption-only settings callback edits preset text; region/line geometry never gains semantic or drop authority. */
import type {PlexDecoration} from "../../core/plex/views/contracts";
import type {Translator} from "../../lang";
import {viewLabel, canvasViewText} from "./labels";
import type {PositionedNode} from "../../types";
import {colorValueCss} from "../../adapters/obsidian/colorPresentation";
import {useId} from "react";
import {areaContains, areaShapePath} from "../../core/contracts/areaGeometry";

/** Count admitted filtered rows, including offscreen overflow, without invoking node/relationship readers. Ungrouped fixed occurrences can sit inside a region without belonging to its scroll surface. */
export function viewDecorationCounts(decorations: readonly PlexDecoration[], nodes: readonly PositionedNode[], admitted: ReadonlySet<string>,
  areaRows: Readonly<Record<string, {nodes: readonly PositionedNode[]} | undefined>>): ReadonlyMap<string, number> {
  const counts = new Map<string, number>();
  for (const mark of decorations) {
    if (mark.kind !== "region" || !mark.areaId || !mark.count) continue;
    const rows = areaRows[mark.areaId]?.nodes ?? nodes.filter(node => node.areaId === mark.areaId);
    const fixed = nodes.filter(node => !node.areaId && areaContains(mark.bounds, node, mark.shape));
    counts.set(mark.areaId, [...rows, ...fixed].reduce((count, node) => count + (admitted.has(node.page.path) ? node.page.transient?.groupMembers?.length ?? 1 : 0), 0));
  }
  return counts;
}

/** Render one measured caption in an upright local box. Only an explicit host callback enables
 * keyboard/double-click settings editing; pointer events cannot start canvas pan or graph actions. */
function GuideCaption({id, caption, clipId, translate, onEdit}: {id: string;
  caption: NonNullable<Extract<PlexDecoration, {kind: "guide"}>["caption"]>;
  clipId: string; translate: Translator; onEdit?: (id: string) => void}) {
  const rotation = caption.rotation, bounds = rotation ? {x: -rotation.width / 2, y: -rotation.height / 2, width: rotation.width, height: rotation.height} : caption.bounds;
  const text = canvasViewText(caption.label, translate);
  return <g className={`kplex-view-guide-caption${onEdit ? " is-editable" : ""}`} data-kplex-guide-caption={id}
    transform={rotation ? `translate(${rotation.center.x} ${rotation.center.y}) rotate(${rotation.angle})` : undefined}
    aria-label={onEdit ? `${translate("facets.flowCaption")}: ${text}` : text} role={onEdit ? "button" : undefined} tabIndex={onEdit ? 0 : undefined}
    onPointerDown={onEdit ? /** Caption editing never captures graph gestures. */ event => event.stopPropagation() : undefined}
    onClick={onEdit ? /** Single click retains the current map and focus. */ event => event.stopPropagation() : undefined}
    onDoubleClick={onEdit ? /** Explicit double-click opens one captured preset text editor. */ event => {event.stopPropagation();onEdit(id);} : undefined}
    onKeyDown={onEdit ? /** Keyboard activation shares the exact caption settings address. */ event => {
      if (event.key === "Enter" || event.key === " ") {event.preventDefault();event.stopPropagation();onEdit(id);}
    } : undefined}>
    <defs><clipPath id={clipId}><rect x={bounds.x + 6} y={bounds.y} width={Math.max(0, bounds.width - 12)} height={bounds.height} /></clipPath></defs>
    <rect x={bounds.x} y={bounds.y} width={bounds.width} height={bounds.height} rx="4" />
    <text x={bounds.x + bounds.width / 2} y={bounds.y + bounds.height / 2} clipPath={`url(#${clipId})`}
      textAnchor="middle" dominantBaseline="central" style={{fontSize: caption.fontSize}}>{text}</text>
  </g>;
}

/** Render local shown counts supplied by the shared visible-occurrence owner, including expanded group membership. */
export function ViewDecorations({decorations, counts, translate, onEditCaption, loose = false, hideGroups = false}: {decorations: readonly PlexDecoration[]; counts: ReadonlyMap<string, number>; translate: Translator; onEditCaption?: (id: string) => void; loose?: boolean; hideGroups?: boolean}) {
  const prefix = useId();
  return <svg className="kplex-view-decorations" aria-hidden={onEditCaption ? undefined : true} focusable="false">
    {decorations.some(mark => mark.kind === "guide" && (mark.directed || mark.direction)) && <defs>
      <marker id={`${prefix}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--text-muted)" />
      </marker>
    </defs>}
    {decorations.map(/** Regions and guides are deliberately outside the interactive semantic edge renderer. */ (mark, index) => mark.kind === "guide"
      ? <g key={mark.id}>
        <polyline className={`kplex-view-guide${mark.variant ? ` is-${mark.variant}` : ""}${mark.stroke === "none" ? " is-no-line" : ""}`} points={mark.points.map(point => `${point.x},${point.y}`).join(" ")} fill="none"
          markerStart={mark.direction === "backward" || mark.direction === "both" ? `url(#${prefix}-arrow)` : undefined}
          markerEnd={mark.directed || mark.direction === "forward" || mark.direction === "both" ? `url(#${prefix}-arrow)` : undefined} />
        {mark.caption && <GuideCaption id={mark.id} caption={mark.caption} clipId={`${prefix}-caption-${index}`} translate={translate} onEdit={onEditCaption} />}
      </g>
      : <g key={mark.id} data-kplex-decoration={mark.id} className={`kplex-view-region${hideGroups && mark.id.includes('"category"') ? " is-group-hidden" : ""}${loose && mark.id.includes('"category"') ? " is-loose" : ""}${mark.tint ? ` is-${mark.tint}` : ""}`}>
        <defs><clipPath id={`${prefix}-${index}`}><rect x={mark.bounds.x + 12} y={mark.bounds.y + 4} width={Math.max(0, mark.bounds.width - 24)} height={mark.description ? 68 : 44} /></clipPath></defs>
        {mark.shape ? <path d={areaShapePath(mark.bounds, mark.shape)} fillRule="evenodd"
          style={mark.color ? {fill: colorValueCss(mark.color, "var(--background-secondary)"), stroke: colorValueCss(mark.color, "var(--background-modifier-border)")} : undefined} />
          : <rect x={mark.bounds.x} y={mark.bounds.y} width={mark.bounds.width} height={mark.bounds.height} rx="14"
            style={mark.color ? {fill: colorValueCss(mark.color, "var(--background-secondary)"), stroke: colorValueCss(mark.color, "var(--background-modifier-border)")} : undefined} />}
        <text clipPath={`url(#${prefix}-${index})`} x={mark.bounds.x + 16} y={mark.bounds.y + 25}>{mark.label ?? viewLabel(mark.labelKey, translate)}</text>
        {mark.description && <text clipPath={`url(#${prefix}-${index})`} className="kplex-view-region-description" x={mark.bounds.x + 16} y={mark.bounds.y + 44}>{canvasViewText(mark.description, translate)}</text>}
        {mark.count && <text className="kplex-view-region-count" x={mark.bounds.x + 16} y={mark.bounds.y + (mark.description ? 64 : 44)}>
          {translate("view.shownLocally", {count: counts.get(mark.areaId ?? "") ?? 0})}
        </text>}
      </g>)}
  </svg>;
}
