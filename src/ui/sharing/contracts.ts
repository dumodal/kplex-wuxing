/** Narrow native package-management effects. Existing composition roots retain settings, theme and modal ownership. */
import type {SharingState, PreparedImport} from "../../core/plex/sharing/transfer";
import type {StyleCommitResult, StyleEditorModal} from "../StyleEditorModal";
export type PortableSharingContext = Readonly<{read: () => SharingState; current: () => boolean;
  save: (plan: PreparedImport, current: () => boolean) => Promise<StyleCommitResult>;
  sourceScope: HTMLElement; bindEditor?: (editor: StyleEditorModal) => void}>;
