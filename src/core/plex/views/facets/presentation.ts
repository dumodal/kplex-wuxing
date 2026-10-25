/** Pure effective presentation defaults. Shared preset configuration and explicit canvas choices
 * remain separate; resolving them never writes, reclassifies a note or acquires a source. */
import type {FacetPreset, FacetCanvasState, FacetDiagnostics, FacetDiagnosticStatus} from "./contracts";

export const FACET_DIAGNOSTIC_ORDER: readonly FacetDiagnosticStatus[] = ["unassigned", "conflicting", "checking", "unresolved"];
export type ResolvedFacetDiagnostics = Readonly<{combined: boolean; side: NonNullable<FacetDiagnostics["side"]>;
  orientation: NonNullable<FacetDiagnostics["orientation"]>; showEmpty?: boolean; order: readonly FacetDiagnosticStatus[]}>;

/** Diagnostic identity is fixed; labels/colors and dock placement cannot invent another result. */
export function isFacetDiagnosticStatus(value: unknown): value is FacetDiagnosticStatus {
  return FACET_DIAGNOSTIC_ORDER.some(/** Compare exact stable identities, never translated copy. */ status => status === value);
}

/** Old/current presets inherit combined diagnostics lazily. Explicit canvas choices survive
 * subsequent preset-default edits, including a choice equal to the old default. */
export function facetDiagnostics(preset: FacetPreset, presetId: string, state?: FacetCanvasState | null): ResolvedFacetDiagnostics {
  const values = preset.diagnostics;
  return {combined: state?.combinedDiagnostics?.[presetId] ?? values?.combined ?? true, side: values?.side ?? "right",
    orientation: values?.orientation ?? "vertical", showEmpty: values?.showEmpty, order: values?.order ?? FACET_DIAGNOSTIC_ORDER};
}
