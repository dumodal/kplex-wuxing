/** Facets retains the persisted wuxing identity. Shared host owners retain measurement,
 * native attention-following editing, cached facts and all effects. */
import type {PlexViewDefinition} from "../contracts";
import {facetsConfigurationSchema, facetLibrary} from "../facets/configuration";
import {projectFacets} from "../facets/projection";
import {layoutFacets} from "../facets/layout";
import {facetState, resolveFacetPreset, restoreFacetState, reduceFacetState, orderedFacetPresets} from "../facets/state";
import {facetPropertyAssignments} from "../facets/assignment";

export const wuXingViewDefinition: PlexViewDefinition = {
  id: "wuxing", version: 1, labelKey: "view.wuxing", icon: "orbit",
  capabilities: {sections: false, descendants: false, editor: true, compact: false, properties: true, badges: true},
  defaultState: {version: 1, preset: "wuxing"}, configuration: facetsConfigurationSchema,
  restoreState: restoreFacetState, reduceState: reduceFacetState, project: projectFacets,
  propertyAssignments: facetPropertyAssignments,
  /** Resolve the same captured preset without source reads or session mutation. */
  layout: (projection, measurements, state, _editor, context) => {
    const library = facetLibrary(context?.configuration);
    if (!library) throw new Error("Unavailable Facets configuration");
    const intent = facetState(state), selected = resolveFacetPreset(library, intent?.preset);
    return layoutFacets(projection, measurements, selected.id, selected.preset, context?.areaHeights,
      !!intent && (selected.status === "ready" || selected.status === "replaced"));
  },
  /** Configured colors join the existing owning-document theme and palette projection. */
  colorReferences: configuration => {
    const library = facetLibrary(configuration);
    return library ? orderedFacetPresets(library).flatMap(({preset}) => [preset.conflictingColor, preset.unassignedColor,
      ...preset.order.map(id => preset.categories[id].color)]) : [];
  },
};
