/** Facets retains the persisted wuxing identity. Shared host owners retain measurement,
 * native central/occurrence editing, cached facts and all effects. */
import type {PlexViewDefinition} from "../contracts";
import {facetsConfigurationSchema, facetLibrary} from "../facets/configuration";
import {projectFacets, facetAreaId} from "../facets/projection";
import {facetShowsDiagnostics} from "../facets/presentation";
import {layoutFacets} from "../facets/layout";
import {facetState, resolveFacetPreset, restoreFacetState, reduceFacetState, orderedFacetPresets} from "../facets/state";
import {facetPropertyAssignments} from "../facets/assignment";
import {compileFacetRules} from "../facets/rules";
import {facetFlowLabels} from "../facets/flow";

export const wuXingViewDefinition: PlexViewDefinition = {
  id: "wuxing", version: 1, labelKey: "view.wuxing", icon: "orbit", editorHosting: "attention-and-occurrence",
  capabilities: {sections: false, descendants: false, editor: true, compact: false, properties: true, badges: true},
  badgeBudget: 2048,
  areaPreferenceBudget: 192,
  defaultState: {version: 1, preset: "wuxing"}, configuration: facetsConfigurationSchema,
  restoreState: restoreFacetState, reduceState: reduceFacetState,
  /** The personal canvas hides diagnostic neighbors while keeping the official attention policy. */
  project: input => {
    const projection = projectFacets(input), library = facetLibrary(input.configuration);
    if (!projection || !library) return projection;
    const selected = resolveFacetPreset(library, facetState(input.state)?.preset);
    if (facetShowsDiagnostics(selected.preset)) return projection;
    const areas = new Set(selected.preset.order.map(id => facetAreaId(selected.id, "category", id)));
    const occurrences = projection.occurrences.filter(row => row.id === projection.entry || areas.has(row.areaId ?? ""));
    const visible = new Set(occurrences.map(row => row.id));
    return {...projection, occurrences, edges: projection.edges.filter(edge => visible.has(edge.source) && visible.has(edge.target))};
  },
  propertyAssignments: facetPropertyAssignments,
  /** Pure caption declarations reuse host measurement without reading note fields. */
  decorationLabels: (state, configuration) => {
    const library = facetLibrary(configuration), intent = facetState(state);if (!library || !intent) return [];
    const selected = resolveFacetPreset(library, intent.preset);return facetFlowLabels(selected.preset, selected.id, intent);
  },
  /** Declare syntax dependencies only; actual admitted field/evidence reads remain lazy. */
  propertyDependencies: (state, configuration) => {
    const library = facetLibrary(configuration), intent = facetState(state);
    if (!library || !intent) return {fields: []};
    const preset = resolveFacetPreset(library, intent.preset).preset;
    if (preset.source !== "rules") return {fields: preset.source === "property" ? [preset.field] : []};
    const plan = compileFacetRules(preset);
    return plan.status === "ready" ? {fields: plan.fields, evidence: plan.evidence} : {fields: []};
  },
  /** Resolve the same captured preset without source reads or session mutation. */
  layout: (projection, measurements, state, _editor, context) => {
    const library = facetLibrary(context?.configuration);
    if (!library) throw new Error("Unavailable Facets configuration");
    const intent = facetState(state), selected = resolveFacetPreset(library, intent?.preset);
    const layout = layoutFacets(projection, measurements, selected.id, selected.preset, context?.areaHeights,
      !!intent && (selected.status === "ready" || selected.status === "replaced"), context?.areaWidths, intent, context?.decorationMeasurements);
    if (facetShowsDiagnostics(selected.preset)) return layout;
    const areas = new Set(selected.preset.order.map(id => facetAreaId(selected.id, "category", id)));
    return {...layout, areas: layout.areas?.filter(area => areas.has(area.id)),
      decorations: layout.decorations?.filter(mark => mark.kind === "region" && areas.has(mark.areaId ?? mark.id)).map(mark => {
        if (mark.kind !== "region") return mark;
        const phase = selected.preset.order.find(id => mark.id === facetAreaId(selected.id, "category", id));
        return {...mark, description: undefined, ...(phase ? {color: selected.preset.categories[phase].color} : {})};
      })};
  },
  /** Configured colors join the existing owning-document theme and palette projection. */
  colorReferences: configuration => {
    const library = facetLibrary(configuration);
    return library ? orderedFacetPresets(library).flatMap(({preset}) => [preset.conflictingColor, preset.unassignedColor,
      ...preset.order.map(id => preset.categories[id].color)]) : [];
  },
};
