/** One input-transparent reference layer. Existing category bounds and the invisible frame origin are
 * borrowed read-only. Three phase qualities fit the existing header; complete cycle symbols in
 * the protected footer explain topology. These are presentation, never note layout or UI icons. */
import {useId} from "react";
import type {PlexDecoration} from "../../../core/plex/views/contracts";
import type {FacetPreset} from "../../../core/plex/views/facets/contracts";
import type {Translator} from "../../../lang";
import {wuXingBlueprint, WUXING_BLUEPRINT_PHASES} from "../../../core/plex/views/wuxing/blueprint";
import {facetCategoryLabel} from "../../../core/plex/views/facets/labels";
import {canvasViewText} from "../labels";
import {colorValueCss} from "../../../adapters/obsidian/colorPresentation";

/** Shared phase vertices: adjacent traversal is the generating ring, two-step traversal its star. */
const phaseVertices = ["0,-15", "14.27,-4.64", "8.82,12.14", "-8.82,12.14", "-14.27,-4.64"];

/** Stack localized middle-dot-separated terms inside an existing guide footprint. The complete
 * accessible label preserves reading order without measuring, resizing or moving any graph area. */
function BlueprintText({label, x, y, className}: {label: string; x: number; y: number; className?: string}) {
  return <text className={className} aria-label={label}>{label.split(" · ").map(
    /** Each catalog term owns one visible baseline rather than stretching the guide frame. */ (term, index) =>
      <tspan key={term} x={x} y={y + index * 14}>{term}</tspan>)}</text>;
}

/** Paint the focus-independent guide and its opaque footer below the complete phase frame.
 * Complete pentagon/pentagram symbols replace arrow samples. Three localized qualities stack
 * inside the existing header, retaining node packing. The footer stays above connectors. */
export function WuXingBlueprint({decorations, presetId, preset, translate}: {
  decorations: readonly PlexDecoration[]; presetId: string; preset: FacetPreset; translate: Translator;
}) {
  const prefix = useId(), guide = wuXingBlueprint(decorations, presetId, preset);
  if (!guide) return null;
  const legendX = guide.legend.x + guide.legend.width / 2, legendY = guide.legend.y + 26;
  return <><svg className="kplex-view-decorations kplex-wuxing-blueprint" data-kplex-blueprint="true" role="img"
    aria-label={translate("wuxing.blueprint.title")} focusable="false">
    <defs><marker id={`${prefix}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M 1 1 L 9 5 L 1 9 Z" />
    </marker></defs>
    {guide.links.map(link => <line key={`${link.kind}-${link.source}`} className={`kplex-blueprint-link is-${link.kind}`}
      data-kplex-blueprint-kind={link.kind} data-kplex-blueprint-source={link.source} data-kplex-blueprint-target={link.target}
      x1={link.start.x} y1={link.start.y} x2={link.end.x} y2={link.end.y} markerEnd={`url(#${prefix}-arrow)`} />)}
    {guide.phases.map(({phase, bounds}) => {
      const details = WUXING_BLUEPRINT_PHASES[phase], meaning = translate(details.meaning), clipId = `${prefix}-${phase}`, x = bounds.x, y = bounds.y;
      return <g key={phase} className="kplex-blueprint-phase" data-kplex-blueprint-phase={phase}>
        <defs><clipPath id={clipId}><rect x={x + 48} y={y + 4} width={Math.max(0, bounds.width - 60)} height={66} /></clipPath></defs>
        <circle cx={x + 25} cy={y + 25} r={15} style={{stroke: colorValueCss(preset.categories[phase].color, "var(--text-muted)")}} />
        <text className="kplex-blueprint-glyph" x={x + 25} y={y + 25} textAnchor="middle" dominantBaseline="central">{details.glyph}</text>
        <g clipPath={`url(#${clipId})`}>
          <text className="kplex-blueprint-name" x={x + 48} y={y + 21}>{canvasViewText(facetCategoryLabel(preset.categories[phase], phase), translate)}</text>
          <BlueprintText className="kplex-blueprint-meaning" label={meaning} x={x + 48} y={y + 36} />
        </g>
      </g>;
    })}
  </svg><svg className="kplex-view-decorations kplex-wuxing-blueprint kplex-wuxing-guide-footer" data-kplex-guide-footer="true" aria-hidden="true" focusable="false">
    <g className="kplex-blueprint-legend" transform={`translate(${legendX} ${legendY})`}>
      <rect data-kplex-guide-footer-bounds="true" x={-guide.legend.width / 2} y={-26} width={guide.legend.width} height={guide.legend.height} rx="12" />
      <text className="kplex-blueprint-title" textAnchor="middle" y={0}>{translate("wuxing.blueprint.title")}</text>
      <polygon className="kplex-blueprint-link is-generating" data-kplex-blueprint-symbol="generating" transform="translate(-149 22)" points={phaseVertices.join(" ")} />
      <BlueprintText className="kplex-blueprint-cycle-caption is-generating" label={translate("wuxing.blueprint.generating")} x={-121} y={18} />
      <polygon className="kplex-blueprint-link is-regulating" data-kplex-blueprint-symbol="regulating" transform="translate(31 22)" points={[0, 2, 4, 1, 3].map(index => phaseVertices[index]).join(" ")} />
      <BlueprintText className="kplex-blueprint-cycle-caption is-regulating" label={translate("wuxing.blueprint.regulating")} x={59} y={18} />
      <text className="kplex-blueprint-cue" textAnchor="middle" y={49}>{translate("wuxing.blueprint.cue")}</text>
    </g>
  </svg></>;
}
