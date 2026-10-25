/** Narrow native manager effects. The registered UI receives only its own configuration and
 * existing color/modal lifetime capabilities, never a plugin, graph or alternate writer. */
import type {PlexViewConfiguration, ViewConfigurationAddress, ViewConfigurationEdit, ViewConfigurationExpected} from "../../core/plex/views/configuration";
import type {StyleColorContext} from "../StyleColorControls";
import type {StyleCommitResult} from "../StyleEditorModal";

export type CanvasViewManagerContext = Readonly<{
  colors: StyleColorContext;
  configuration: () => PlexViewConfiguration;
  read: (address: ViewConfigurationAddress) => ViewConfigurationExpected;
  capture: (address: ViewConfigurationAddress) => () => boolean;
  subscribe: (changed: () => void) => () => void;
  save: (address: ViewConfigurationAddress, edit: ViewConfigurationEdit, expected: ViewConfigurationExpected,
    current: () => boolean) => Promise<StyleCommitResult>;
  closed: () => void;
}>;
