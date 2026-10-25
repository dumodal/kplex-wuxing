/** Production Mind Map policy, composed from pure hierarchy/state/geometry modules. Shared runtime owns acquisition, actions and the native editor. */
import type {PlexViewDefinition} from "../contracts";
import {mindMapConfiguration, mindMapConfigurationSchema, MIND_MAP_LIMITS} from "./configuration";
import {defaultMindMapState, restoreMindMapState} from "./state";
import {projectMindMap} from "./projection";
import {layoutMindMap} from "./layout";
import {reduceMindMap} from "./actions";

/** This definition is not user-visible until registered with its localized settings and real shared-host behavior. */
export const mindMapViewDefinition: PlexViewDefinition = {
  id: "mindmap", version: 1, labelKey: "view.mindmap", icon: "network", navigation: "rooted", editorHosting: "occurrence",
  capabilities: {sections: false, descendants: false, editor: true, compact: false}, defaultState: defaultMindMapState,
  hierarchy: {maximumScopes: MIND_MAP_LIMITS.scopes, primary: "activate-editor", reduce: reduceMindMap},
  configuration: mindMapConfigurationSchema, restoreState: restoreMindMapState, project: projectMindMap,
  /** Layout consumes the same admitted type settings as projection and the actual occurrence/editor measurements. */
  layout(projection, measurements, _preferences, _editor, context) {
    const configuration = mindMapConfiguration(context?.configuration);
    if (!configuration) throw new Error("Mind Map configuration unavailable");
    return layoutMindMap(projection, measurements, configuration);
  },
};
