/** Native Obsidian modal shell; React owns guide content while the plugin owns dismissal persistence. */
import { Modal, type App } from "obsidian";
import { createRoot, type Root } from "react-dom/client";
import type { Translator } from "../lang";
import { WuXingIntroductionContent } from "./features/WuXingIntroductionContent";

/** Display one dismissible guide with native Escape/close behavior and bounded React cleanup. */
export class WuXingIntroductionModal extends Modal {
  private root: Root | null = null;
  private released = false;

  /** Capture only localization and a lifecycle callback; this shell has no vault mutation capability. */
  constructor(app: App, private readonly translate: Translator, private readonly onDismiss: () => void) {
    super(app);
    this.modalEl.addClass("kplex-wuxing-introduction-modal");
    this.setTitle(translate("wuxing.guide.title"));
  }

  /** Mount educational content when the native dialog opens. */
  onOpen(): void {
    this.contentEl.empty();
    this.root = createRoot(this.contentEl);
    this.root.render(<WuXingIntroductionContent translate={this.translate}
      onClose={/** Native close also handles Escape and the window close control. */ () => this.close()} />);
  }

  /** Retire the React subtree and notify dismissal once, including native close paths. */
  onClose(): void {
    this.root?.unmount();
    this.root = null;
    this.contentEl.empty();
    if (this.released) return;
    this.released = true;
    this.onDismiss();
  }
}
