/** Paint-only five-phase blueprint. It joins existing category rectangles and never places
 * notes, queries graph sources or changes classification. The footer footprint is fit/export-only. */
import type {PlexDecoration, ViewRect, ViewPoint} from "../contracts";
import type {FacetPreset} from "../facets/contracts";
import {FACET_WUXING_CYCLE} from "../facets/labels";
import {facetAreaId} from "../facets/projection";
import {facetIsWuXing} from "../facets/presentation";

export type WuXingPhase = typeof FACET_WUXING_CYCLE[number];
/** Approved personal phase qualities, applicable beyond human actions; not fixed subject categories. */
export const WUXING_BLUEPRINT_PHASES = {
  wood: {glyph: "木", meaning: "wuxing.blueprint.wood"},
  fire: {glyph: "火", meaning: "wuxing.blueprint.fire"},
  earth: {glyph: "土", meaning: "wuxing.blueprint.earth"},
  metal: {glyph: "金", meaning: "wuxing.blueprint.metal"},
  water: {glyph: "水", meaning: "wuxing.blueprint.water"},
} as const;
export type WuXingBlueprintPhase = Readonly<{phase: WuXingPhase; bounds: ViewRect}>;
export type WuXingBlueprintLink = Readonly<{source: WuXingPhase; target: WuXingPhase;
  kind: "generating" | "regulating"; start: ViewPoint; end: ViewPoint}>;

/** Intersect the directed center ray with both existing frames; bounded padding keeps arrowheads
 * outside each frame without reversing short connectors between closely spaced regions. The
 * guide borrows existing frame geometry independently of actual note-connection routing. */
export function wuXingFrameLink(a: ViewRect, b: ViewRect): Readonly<{start: ViewPoint; end: ViewPoint}> | null {
  const source = {x: a.x + a.width / 2, y: a.y + a.height / 2};
  const target = {x: b.x + b.width / 2, y: b.y + b.height / 2};
  const dx = target.x - source.x, dy = target.y - source.y, distance = Math.hypot(dx, dy);
  if (!distance) return null;
  const sourceRatio = Math.min(dx ? a.width / 2 / Math.abs(dx) : Infinity, dy ? a.height / 2 / Math.abs(dy) : Infinity);
  const targetRatio = Math.min(dx ? b.width / 2 / Math.abs(dx) : Infinity, dy ? b.height / 2 / Math.abs(dy) : Infinity);
  if (sourceRatio + targetRatio >= 1) return null;
  const padding = Math.min(8, distance * (1 - sourceRatio - targetRatio) / 4) / distance;
  return {start: {x: source.x + dx * (sourceRatio + padding), y: source.y + dy * (sourceRatio + padding)},
    end: {x: target.x - dx * (targetRatio + padding), y: target.y - dy * (targetRatio + padding)}};
}

/** Phase identities, rather than current focus, translated names or visual order, fix direction:
 * one step generates; two steps regulates. Every interior regulator is a straight star chord. */
export function wuXingBlueprint(decorations: readonly PlexDecoration[], presetId: string, preset: FacetPreset):
  Readonly<{phases: readonly WuXingBlueprintPhase[]; links: readonly WuXingBlueprintLink[]; legend: ViewRect}> | null {
  if (!facetIsWuXing(preset)) return null;
  const phases: WuXingBlueprintPhase[] = [];
  for (const phase of FACET_WUXING_CYCLE) {
    const region = decorations.find(mark => mark.kind === "region" && mark.id === facetAreaId(presetId, "category", phase));
    if (!region || region.kind !== "region") return null;
    phases.push({phase, bounds: region.bounds});
  }
  const links: WuXingBlueprintLink[] = [];
  for (const step of [1, 2] as const) for (let index = 0; index < phases.length; index++) {
    const source = phases[index], target = phases[(index + step) % phases.length], segment = wuXingFrameLink(source.bounds, target.bounds);
    if (segment) links.push({source: source.phase, target: target.phase, kind: step === 1 ? "generating" : "regulating", ...segment});
  }
  const left = Math.min(...phases.map(/** The legend follows the full framework rather than attention. */ row => row.bounds.x));
  const right = Math.max(...phases.map(/** Unequal phase widths keep the footer centered on the complete frame. */ row => row.bounds.x + row.bounds.width));
  const bottom = Math.max(...phases.map(/** Reserve a clear gap beneath the lowest phase. */ row => row.bounds.y + row.bounds.height));
  return {phases, links, legend: {x: (left + right) / 2 - 250, y: bottom + 36, width: 500, height: 104}};
}
