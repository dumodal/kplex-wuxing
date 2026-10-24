/** Production Wu Xing definition composes local classification/projection and measured layout. Shared host infrastructure retains editing, source demand, styling and interactions. */
import type {PlexViewDefinition} from "../contracts";
import {wuXingConfigurationSchema, wuXingConfiguration} from "./configuration";
import {projectWuXing} from "./projection";
import {layoutWuXing} from "./layout";

export const wuXingViewDefinition: PlexViewDefinition = {
  id: "wuxing", version: 1, labelKey: "view.wuxing", icon: "orbit",
  capabilities: {sections: false, descendants: false, editor: true, compact: false, properties: true}, defaultState: null,
  configuration: wuXingConfigurationSchema,
  /** All Wu Xing preferences are type-wide; no shadow configuration enters session state. */
  restoreState: () => null,
  project: projectWuXing,
  /** Layout consumes only measured occurrences and validated effective type configuration. */
  layout: (projection, measurements, _preferences, _editor, context) => layoutWuXing(projection, measurements, wuXingConfiguration(context?.configuration)),
};
