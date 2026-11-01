/** One input-transparent reference layer. Existing category bounds and the invisible frame origin are
 * borrowed read-only, so toggling the complete blueprint cannot move notes or native editors. */
import {useId} from "react";
import type {PlexDecoration} from "../../../core/plex/views/contracts";
import type {FacetPreset} from "../../../core/plex/views/facets/contracts";
import type {Translator} from "../../../lang";
import {wuXingBlueprint, WUXING_BLUEPRINT_PHASES} from "../../../core/plex/views/wuxing/blueprint";
import {facetCategoryLabel} from "../../../core/plex/views/facets/labels";
import {canvasViewText} from "../labels";
import {colorValueCss} from "../../../adapters/obsidian/colorPresentation";

/** Paint the complete optional guide around the virtual origin, independently of attention. */
export function WuXingBlueprint({decorations, presetId, preset, translate}: {
  decorations: readonly PlexDecoration[]; presetId: string; preset: FacetPreset; translate: Translator;
}) {
  const prefix = useId(), guide = wuXingBlueprint(decorations, presetId, preset);
  if (!guide) return null;
  const legendX = 0, legendY = 58;
  return <svg className="kplex-view-decorations kplex-wuxing-blueprint" data-kplex-blueprint="true" role="img"
    aria-label={translate("wuxing.blueprint.title")} focusable="false">
    <defs><marker id={`${prefix}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 1 1 L 9 5 L 1 9 Z" />
    </marker></defs>
    {guide.links.map(link => <line key={`${link.kind}-${link.source}`} className={`kplex-blueprint-link is-${link.kind}`}
      data-kplex-blueprint-kind={link.kind} data-kplex-blueprint-source={link.source} data-kplex-blueprint-target={link.target}
      x1={link.start.x} y1={link.start.y} x2={link.end.x} y2={link.end.y} markerEnd={`url(#${prefix}-arrow)`} />)}
    {guide.phases.map(({phase, bounds, role}) => {
      const details = WUXING_BLUEPRINT_PHASES[phase], clipId = `${prefix}-${phase}`, x = bounds.x, y = bounds.y;
      return <g key={phase} className="kplex-blueprint-phase" data-kplex-blueprint-phase={phase}>
        <defs><clipPath id={clipId}><rect x={x + 48} y={y + 4} width={Math.max(0, bounds.width - 60)} height={46} /></clipPath></defs>
        <circle cx={x + 25} cy={y + 25} r={15} style={{stroke: colorValueCss(preset.categories[phase].color, "var(--text-muted)")}} />
        <text className="kplex-blueprint-glyph" x={x + 25} y={y + 25} textAnchor="middle" dominantBaseline="central">{details.glyph}</text>
        <g clipPath={`url(#${clipId})`}>
          <text className="kplex-blueprint-name" x={x + 48} y={y + 21}>{canvasViewText(facetCategoryLabel(preset.categories[phase], phase), translate)}{role && <tspan className="kplex-blueprint-role">{" · "}{canvasViewText(role, translate)}</tspan>}</text>
          <text className="kplex-blueprint-meaning" x={x + 48} y={y + 40}>{translate(details.meaning)}</text>
        </g>
      </g>;
    })}
    <g className="kplex-blueprint-legend" transform={`translate(${legendX} ${legendY})`}>
      <text className="kplex-blueprint-title" textAnchor="middle" y={0}>{translate("wuxing.blueprint.title")}</text>
      <line className="kplex-blueprint-link is-generating" x1={-165} y1={22} x2={-131} y2={22} markerEnd={`url(#${prefix}-arrow)`} />
      <text x={-121} y={26}>{translate("wuxing.blueprint.generating")}</text>
      <line className="kplex-blueprint-link is-regulating" x1={15} y1={22} x2={49} y2={22} markerEnd={`url(#${prefix}-arrow)`} />
      <text x={59} y={26}>{translate("wuxing.blueprint.regulating")}</text>
      <text className="kplex-blueprint-cue" textAnchor="middle" y={49}>{translate("wuxing.blueprint.cue")}</text>
    </g>
  </svg>;
}
