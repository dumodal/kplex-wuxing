/** Bounded preset admission atop the shared configuration JSON/color owners. Unknown future
 * presets remain inert values; malformed current presets are never silently repaired/truncated. */
import {sanitizeColorValue, isThemeColorName, isPaletteColorId} from "../../../contracts/colorValue";
import {configurationRecord as record, viewConfigurationEntryKey} from "../configurationValues";
import type {FacetPreset, FacetPresetReplacement} from "./contracts";
import {FACET_TEMPLATES} from "./templates";
export const FACET_LIMITS = {presets: 16, entries: 32, categories: 7, aliases: 512, label: 80, expression: 2048} as const;

/** Stable keys do not depend on translated labels or mutable note fields. */
export function facetId(value: unknown): value is string {return typeof value === "string" && value.length <= 48 && viewConfigurationEntryKey(value);}
/** Finite plain copy; bounds are also enforced by the enclosing shared JSON owner. */
function text(value: unknown, maximum: number, empty = true): value is string {
  return typeof value === "string" && value.length <= maximum && (empty || value.trim().length > 0);
}
/** Use the existing literal/theme/palette grammar, never arbitrary CSS or another color parser. */
function color(value: unknown): boolean {
  const parsed = sanitizeColorValue(value);
  if (parsed === undefined) return false;
  if (typeof parsed === "string") return true;
  return parsed.kind === "theme" ? isThemeColorName(parsed.variable) : isPaletteColorId(parsed.id);
}
/** An explicit replacement must name another stable entry; resolution detects cycles separately. */
export function isFacetReplacement(value: unknown): value is FacetPresetReplacement {
  return record(value) && value.version === 1 && facetId(value.replacement);
}
/** Known presets contain exactly three through seven ordered categories. */
export function isFacetPreset(value: unknown): value is FacetPreset {
  if (!record(value) || value.version !== 1 || !text(value.name, 100) || value.nameKey !== undefined && !text(value.nameKey, 128, false)
    || !["property", "type", "tag", "rules"].includes(String(value.source)) || !text(value.field, 128, false)
    || !record(value.categories) || !Array.isArray(value.order) || value.order.length < 3 || value.order.length > FACET_LIMITS.categories
    || !value.order.every(facetId) || new Set(value.order).size !== value.order.length || Object.keys(value.categories).length !== value.order.length
    || !facetId(value.start) || !value.order.includes(value.start) || typeof value.guides !== "boolean" || typeof value.tints !== "boolean"
    || !color(value.conflictingColor) || !color(value.unassignedColor)) return false;
  for (const [field, minimum, maximum] of [["spacing", 24, 200], ["regionWidth", 200, 640], ["regionHeight", 160, 600]] as const) {
    const scalar = value[field]; if (typeof scalar !== "number" || !Number.isFinite(scalar) || scalar < minimum || scalar > maximum) return false;
  }
  for (const [id, category] of Object.entries(value.categories)) {
    if (!facetId(id) || !value.order.includes(id) || !record(category) || !text(category.label, FACET_LIMITS.label)
      || category.labelKey !== undefined && !text(category.labelKey, 128, false) || !color(category.color)
      || !Array.isArray(category.values) || category.values.length > FACET_LIMITS.aliases || !category.values.every(item => text(item, 256, false))
      || category.assignment !== undefined && !text(category.assignment, 256, false)
      || category.rule !== undefined && !text(category.rule, FACET_LIMITS.expression)) return false;
  }
  return true;
}
/** Retain future entry schemas without executing or interpreting them as a current preset. */
export function validFacetLibrary(value: unknown): boolean {
  if (!record(value) || Object.keys(value).length > FACET_LIMITS.entries) return false;
  if (!Object.keys(value).every(facetId)) return false;
  let known = 0;
  return Object.entries({...FACET_TEMPLATES, ...value}).every(([id, preset]) => facetId(id) && (isFacetPreset(preset) ? ++known <= FACET_LIMITS.presets
    : isFacetReplacement(preset) || record(preset) && typeof preset.version === "number" && Number.isInteger(preset.version) && preset.version > 1));
}
/** Ordering is separate from the keyed collection; stale/missing IDs remain inert, never discarded. */
export function validFacetOrder(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.length <= FACET_LIMITS.entries && value.every(facetId) && new Set(value).size === value.length;
}
