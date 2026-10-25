/** Facets UI contributions use the captured session and shared queued settings writer. */
import type {CanvasViewSettingsContribution} from "../settingsContributions";
import type {CanvasViewContributionContext, CanvasViewChoice} from "../contributionContracts";
import {facetLibrary} from "../../../core/plex/views/facets/configuration";
import {facetState, orderedFacetPresets, resolveFacetPreset} from "../../../core/plex/views/facets/state";
import {facetPresetLabel, facetHasWuXingPhases} from "../../../core/plex/views/facets/labels";
import {FacetPresetManager} from "../facets/FacetPresetManager";
import {facetDiagnostics, facetLayout, FACET_LAYOUTS} from "../../../core/plex/views/facets/presentation";

/** Both entry points dispatch the same state reducer, preserving independent canvas intent. */
function presetChoice(context: CanvasViewContributionContext): CanvasViewChoice | null {
  const library = facetLibrary(context.configuration), state = facetState(context.state);
  if (!library || !state) return null;
  const selected = resolveFacetPreset(library, state.preset);
  const options: CanvasViewChoice["options"][number][] = orderedFacetPresets(library).map(({id, preset}) => ({id,
    label: facetPresetLabel(preset), command: {kind: "state", action: {id: "preset.select", args: id}}}));
  if (!options.some(option => option.id === state.preset)) options.unshift({id: state.preset,
    label: {key: "facets.presetUnavailable"}, enabled: false, command: {kind: "state", action: {id: "preset.select", args: state.preset}}});
  return {id: "preset", label: {key: "facets.preset"}, selected: selected.status === "replaced" ? selected.id : state.preset, options,
    ...(selected.status === "ready" || selected.status === "replaced" ? {settings: {kind: "settings" as const, target: selected.id}} : {})};
}

/** Layout is a captured per-canvas override. Preset defaults remain explicit native saves. */
function layoutChoice(context: CanvasViewContributionContext): CanvasViewChoice | null {
  const library = facetLibrary(context.configuration), state = facetState(context.state);if (!library || !state) return null;
  const selected = resolveFacetPreset(library, state.preset), layout = facetLayout(selected.preset, selected.id, state);
  return {id: "layout", label: {key: "facets.layout"}, selected: layout.effective,
    enabled: selected.status === "ready" || selected.status === "replaced",
    options: FACET_LAYOUTS.map(/** Four-only quadrants stays visible with an actionable compatibility explanation. */ id => ({id, label: {key: `facets.layout.${id}`},
      enabled: id !== "quadrants" || selected.preset.order.length === 4,
      ...(id === "quadrants" && selected.preset.order.length !== 4 ? {unavailableReason: {key: "facets.quadrantsUnavailable"}} : {}),
      command: {kind: "state", action: {id: "layout.select", args: id}}}))};
}

export const wuXingSettingsContribution: CanvasViewSettingsContribution = {
  id: "wuxing",
  manager: (app, context, target) => new FacetPresetManager(app, context, target),
  items: ({translate, manage}) => [{name: translate("facets.about"), desc: translate("facets.aboutHelp")},
    ...(manage ? [{name: translate("facets.manage"), desc: translate("facets.managerHelp"), action: manage}] : [])],
  choices: context => [presetChoice(context), layoutChoice(context)].flatMap(/** Only current registered configuration contributes choices. */ choice => choice ? [choice] : []),
  menus: context => {
    const choice = presetChoice(context);
    return [...(choice ? [{id: "preset", kind: "submenu" as const, label: choice.label, icon: "orbit", items: choice.options.map(option =>
      ({...option, kind: "action" as const, checked: option.id === choice.selected}))}] : []),
    {id: "settings", kind: "action", label: {key: "facets.settings"}, icon: "settings", command: {kind: "settings"}}];
  },
  layoutControls: context => {
    const library = facetLibrary(context.configuration), state = facetState(context.state);
    if (!library || !state) return [];
    const selected = resolveFacetPreset(library, state.preset);
    if (selected.status !== "ready" && selected.status !== "replaced") return [];
    const address = (field: string) => ({field: "presets", path: [selected.id, field]});
    return [
      {...address("diagnostics"), path: [selected.id, "diagnostics", "combined"], kind: "checkbox", labelKey: "facets.combineDiagnostics",
        hintKey: "facets.combineDiagnosticsCanvasHint", state: {value: facetDiagnostics(selected.preset, selected.id, state).combined, actionId: "diagnostics.combine"}},
      {...address("spacing"), labelKey: "wuxing.spacing", icon: "move-horizontal", min: 24, max: 200, step: 8},
      {...address("regionWidth"), labelKey: "wuxing.width", icon: "move-horizontal", min: 200, max: 640, step: 20},
      {...address("regionHeight"), labelKey: "wuxing.height", icon: "move-vertical", min: 160, max: 600, step: 20},
      {...address("guides"), kind: "checkbox", labelKey: "wuxing.guides"},
      {...address("tints"), kind: "checkbox", labelKey: "wuxing.tints"},
      ...(selected.preset.interpretation === "wuxing" && facetHasWuXingPhases(selected.preset) ? [
        {...address("relativeLabels"), kind: "checkbox" as const, labelKey: "facets.relativeLabels" as const},
        {...address("regulatingGuides"), kind: "checkbox" as const, labelKey: "facets.regulatingGuides" as const},
      ] : []),
    ];
  },
};
