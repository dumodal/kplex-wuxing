/** Static internal composition root. Test definitions are injected into independent test registries only. */
import {classicViewDefinition} from "../../core/plex/views/classic/definition";
import {PlexViewRegistry} from "../../core/plex/views/registry";
export const builtInPlexViews = new PlexViewRegistry([classicViewDefinition]);
