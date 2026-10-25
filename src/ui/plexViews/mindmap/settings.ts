/** Mind Map native Settings contribution. Shared typography/editor/visibility and per-canvas root/folds remain under their existing owners. */
import type {CanvasViewSettingsContribution} from "../settingsContributions";

export const mindMapSettingsContribution: CanvasViewSettingsContribution = {
  id: "mindmap",
  /** Native controls address only registered type fields through the shared queued writer. Opening never persists defaults. */
  items: ({translate, key}) => [
    {name: translate("mindmap.arrangement"), control: {type: "dropdown", key: key("arrangement"), options: {
      balanced: translate("mindmap.balanced"), left: translate("mindmap.left"), right: translate("mindmap.right"),
    }}},
    {name: translate("mindmap.horizontalSpacing"), control: {type: "slider", key: key("horizontalSpacing"), min: 40, max: 240, step: 4}},
    {name: translate("mindmap.verticalSpacing"), control: {type: "slider", key: key("verticalSpacing"), min: 12, max: 80, step: 2}},
    {name: translate("mindmap.initialGenerations"), desc: translate("mindmap.initialGenerationsHelp"), control: {type: "slider", key: key("initialGenerations"), min: 1, max: 3, step: 1}},
    {name: translate("mindmap.maximumDepth"), control: {type: "slider", key: key("maximumDepth"), min: 1, max: 8, step: 1}},
    {name: translate("mindmap.maximumOccurrences"), desc: translate("mindmap.limitHelp"), control: {type: "slider", key: key("maximumOccurrences"), min: 16, max: 256, step: 1}},
  ],
};
