/** Facets retains the persisted wuxing identity. Shared host owners retain measurement,
 * native attention/occurrence editing, cached facts and all effects. Personal Wu Xing situates
 * classified attention inside its phase without changing canonical identity or relationships. */
import type {PlexViewDefinition} from "../contracts";
import {facetsConfigurationSchema, facetLibrary} from "../facets/configuration";
import {projectFacets, facetAreaId} from "../facets/projection";
import {facetShowsDiagnostics} from "../facets/presentation";
import {layoutFacets} from "../facets/layout";
import {facetState, resolveFacetPreset, restoreFacetState, reduceFacetState, orderedFacetPresets} from "../facets/state";
import {facetPropertyAssignments} from "../facets/assignment";
import {compileFacetRules} from "../facets/rules";
import {facetFlowLabels} from "../facets/flow";
import {facetRelativeLabel} from "../facets/labels";

export const wuXingViewDefinition: PlexViewDefinition = {
  id: "wuxing", version: 1, labelKey: "view.wuxing", icon: "orbit", editorHosting: "attention-and-occurrence",
  capabilities: {sections: false, descendants: false, editor: true, compact: false, properties: true, badges: true},
  badgeBudget: 2048,
  areaPreferenceBudget: 192,
  defaultState: {version: 1, preset: "wuxing"}, configuration: facetsConfigurationSchema,
  restoreState: restoreFacetState, reduceState: reduceFacetState,
  /** Omit unsupported/unclassified neighbors only from this canvas. Canonical graph facts and
   * the current attention remain available; diagnostic nodes must not survive without layout slots. */
  project: input => {
    const projection = projectFacets(input), library = facetLibrary(input.configuration);
    if (!projection || !library) return projection;
    const selected = resolveFacetPreset(library, facetState(input.state)?.preset);
    if (facetShowsDiagnostics(selected.preset)) return projection;
    const categoryAreas = new Set(selected.preset.order.map(id => facetAreaId(selected.id, "category", id)));
    const occurrences = projection.occurrences.filter(row => row.id === projection.entry || categoryAreas.has(row.areaId ?? "")).map(
      /** Attention keeps its unique editor/entry identity while joining its actual classified area.
       * Unsupported current files retain the recovery position rather than inventing a phase. */
      row => row.id === projection.entry && categoryAreas.has(row.groupingPartition ?? "") ? {...row, areaId: row.groupingPartition} : row);
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
    const categoryAreas = new Set(selected.preset.order.map(id => facetAreaId(selected.id, "category", id)));
    const partition = projection.occurrences.find(row => row.id === projection.entry)?.groupingPartition;
    const focusPhase = selected.preset.order.find(id => partition === facetAreaId(selected.id, "category", id));
    return {...layout, areas: layout.areas?.filter(area => categoryAreas.has(area.id)),
      decorations: layout.decorations?.filter(mark => mark.kind === "region" && categoryAreas.has(mark.areaId ?? mark.id)).map(mark => {
        if (mark.kind !== "region") return mark;
        const phase = selected.preset.order.find(id => mark.id === facetAreaId(selected.id, "category", id));
        // Reference copy is attached only after packing; the unified guide never adds header rows.
        return {...mark, description: phase ? facetRelativeLabel({...selected.preset, relativeLabels: true}, focusPhase, phase) : undefined};
      })};
  },
  /** Configured colors join the existing owning-document theme and palette projection. */
  colorReferences: configuration => {
    const library = facetLibrary(configuration);
    return library ? orderedFacetPresets(library).flatMap(({preset}) => [preset.conflictingColor, preset.unassignedColor,
      ...preset.order.map(id => preset.categories[id].color)]) : [];
  },
};
