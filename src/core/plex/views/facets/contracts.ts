/** Plain Facets preset values. Stable category IDs survive rename/reorder; classification rules
 * and explicit assignment values are separate. No setting, note or native effect is owned here. */
import type {ColorValue} from "../../../contracts/colorValue";
export type FacetSource = "property" | "type" | "tag" | "rules";
export type FacetCategory = Readonly<{label: string; labelKey?: string; color: ColorValue;
  values: readonly string[]; assignment?: string; rule?: string}>;
export type FacetPreset = Readonly<{version: 1; name: string; nameKey?: string; source: FacetSource; field: string;
  categories: Readonly<Record<string, FacetCategory>>; order: readonly string[]; start: string;
  spacing: number; regionWidth: number; regionHeight: number; guides: boolean; tints: boolean;
  /** Optional model reading; ordered phase identities remain separate from geometry/order. */
  interpretation?: "wuxing"; relativeLabels?: boolean; regulatingGuides?: boolean;
  conflictingColor: ColorValue; unassignedColor: ColorValue}>;
/** Explicit deletion replacements also cover closed/restored canvases without editing their
 * opaque saved intent. They never reclassify or rewrite a note. Unknown future entries stay inert. */
export type FacetPresetReplacement = Readonly<{version: 1; replacement: string}>;
export type FacetPresetLibrary = Readonly<{presets: Readonly<Record<string, unknown>>; order: readonly string[]}>;
export type FacetPresetSelection = Readonly<{requestedId: string; id: string; preset: FacetPreset;
  status: "ready" | "replaced" | "missing" | "future"}>;
export type FacetMembership = Readonly<{status: "assigned"; category: string}
  | {status: "conflicting"; categories: readonly string[]}
  | {status: "unassigned" | "checking"}
  | {status: "unresolved"; reason: "unsupported" | "metadata" | "rule" | "relationship" | "preset"}>;
