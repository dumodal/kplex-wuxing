/** Per-canvas preset intent. Definitions/colors live in shared configuration; unknown/future
 * requested IDs and state stay intact rather than being rewritten during safe fallback rendering. */
import type {PlexViewConfiguration} from "../configuration";
import type {PlexViewStateAction, PlexViewStateResult} from "../contracts";
import {configurationRecord as record} from "../configurationValues";
import {facetLibrary} from "./configuration";
import {FACET_TEMPLATES} from "./templates";
import {facetId, isFacetPreset, isFacetReplacement} from "./validation";
import type {FacetPresetLibrary, FacetPresetSelection, FacetPreset} from "./contracts";

/** Existing null state means the original Wu Xing preset. Unsupported versions remain opaque. */
export function restoreFacetState(value: unknown): unknown {return value ?? {version: 1, preset: "wuxing"};}
/** A malformed/current or future payload is displayable through fallback but has no implicit
 * mutation authority. Explicit session recovery remains owned by the existing host. */
export function facetState(value: unknown): Readonly<{version: 1; preset: string}> | null {
  return value === null || value === undefined ? {version: 1, preset: "wuxing"}
    : record(value) && value.version === 1 && facetId(value.preset) ? {version: 1, preset: value.preset} : null;
}
/** Resolve one finite explicit replacement chain. Missing/future/cyclic entries never execute. */
export function resolveFacetPreset(library: FacetPresetLibrary, requestedId = "wuxing"): FacetPresetSelection {
  let id = requestedId; const seen = new Set<string>();
  for (let count = 0; count < 16 && !seen.has(id); count++) {
    seen.add(id);const value = library.presets[id];
    if (isFacetPreset(value)) return {requestedId, id, preset: value, status: id === requestedId ? "ready" : "replaced"};
    if (!isFacetReplacement(value)) break;
    id = value.replacement;
  }
  const entries = orderedFacetPresets(library), fallback = entries.find(entry => entry.id === "wuxing") ?? entries[0];
  const unresolved = library.presets[id];
  return {requestedId, id: fallback?.id ?? "wuxing", preset: fallback?.preset ?? FACET_TEMPLATES.wuxing,
    status: record(unresolved) && typeof unresolved.version === "number" && unresolved.version > 1 ? "future" : "missing"};
}
/** Known editable entries only; unknown ordering IDs remain saved but are not executable choices. */
export function orderedFacetPresets(library: FacetPresetLibrary): readonly Readonly<{id: string; preset: FacetPreset}>[] {
  const ids = [...new Set([...library.order, ...Object.keys(library.presets)])];
  return ids.flatMap(id => {const preset = library.presets[id];return isFacetPreset(preset) ? [{id, preset}] : [];});
}
/** The menu and panel dispatch this same pure action through the existing guarded session. */
export function reduceFacetState(state: unknown, action: PlexViewStateAction, configuration: PlexViewConfiguration): PlexViewStateResult {
  const library = facetLibrary(configuration), current = facetState(state);
  if (!current || !library || action.id !== "preset.select" || !facetId(action.args) || !isFacetPreset(library.presets[action.args])) return {status: "unavailable"};
  return {status: "updated", state: {...(record(state) ? state : {}), version: 1, preset: action.args}};
}
/** Deletion needs an explicit current replacement even for closed canvases. One atomic entry
 * update preserves sibling presets and makes old restored intent resolve deterministically. */
export function replaceFacetPreset(library: FacetPresetLibrary, id: string, replacement: string): Readonly<{version: 1; replacement: string}> {
  if (id === replacement || !facetId(id) || !facetId(replacement) || !isFacetPreset(library.presets[id]) || !isFacetPreset(library.presets[replacement]))
    throw new Error("A current replacement preset is required");
  return {version: 1, replacement};
}
