/** Shared disclosure footprint. The visible chevron stays small; touch hit-testing occupies a
 * measured corner outside the thought and gates. No input, source or view-session owner lives here. */
import type {PlexBranch} from "../../core/plex/views/contracts";

/** One body-external 44px hit target and 4px gap; layouts must pack the complete reserve. */
export function branchDisclosureReserve(branch: PlexBranch | undefined, touch: boolean): Readonly<{right: number; bottom: number}> | undefined {
  return touch && branch && (branch.canExpand || branch.expanded) ? {right: 48, bottom: 48} : undefined;
}
