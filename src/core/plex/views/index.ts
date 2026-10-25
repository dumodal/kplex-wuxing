/** Public pure-policy entry point for internal canvas views. No host/UI/native effect crosses
 * this module; downloadable code loading remains outside the API and this implementation. */
export {CANVAS_VIEW_API_VERSION} from "./contracts";
export type {CanvasViewText, PlexViewStateAction, PlexViewStateResult, PlexViewDefinition, PlexViewInput,
  PlexViewRead, PlexProjection, PlexOccurrence, PlexViewEdge, PlexViewRelation, PlexRelationRead, PlexEvidenceRead,
  PlexMeasurement, PlexArea, PlexDecoration, PlexViewLayout, PlexViewScopeRead, PhysicalPort, OccurrenceId,
  AreaId, ViewPoint, ViewRect, ViewCoverage} from "./contracts";
export {PlexViewRegistry} from "./registry";
export {readViewConfiguration, readViewConfigurationAt, editViewConfiguration, editViewConfigurationAt,
  resetViewConfiguration, migrateViewConfiguration, removeViewConfiguration, VIEW_CONFIGURATION_LIMITS} from "./configuration";
export type {PlexViewConfigurationSchema, PlexViewConfigurationMigration, PlexViewConfiguration,
  ViewConfigurationAddress, ViewConfigurationEdit, ViewConfigurationExpected, ViewConfigurationMigrationResult} from "./configuration";
export {boundedViewState} from "./state";
export {validCanvasViewText, validPlexViewStateAction} from "./presentation";
