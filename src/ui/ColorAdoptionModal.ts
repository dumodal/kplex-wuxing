/** Explicit, narrow adoption of native standard colors; custom styles and local palettes are untouched. */
import {Setting, type App} from "obsidian";
import {StyleEditorModal, type StyleCommitResult} from "./StyleEditorModal";
import {ColorPreview} from "./ColorPreview";
import type {StyleColorContext} from "./StyleColorControls";
import {withoutStyleColorOverrides} from "../core/plex/colorEditing";
import {NODE_COLOR_FIELDS, LINK_COLOR_FIELDS} from "../core/contracts/colorValue";

/** The caller supplies the exact confirmed slot inventory and the existing durable writer. */
export class ColorAdoptionModal extends StyleEditorModal {
  private preview: ColorPreview | null = null;
  private release: (() => void) | null = null;

  /** Capture a finite human-readable affected list, without any graph or note access. */
  constructor(app: App, private readonly context: StyleColorContext, private readonly slots: readonly string[],
    private readonly save: (current: () => boolean) => Promise<StyleCommitResult>, private readonly closed: () => void) { super(app); }

  /** Show the post-adoption paint and every affected slot before the destructive color-only confirmation. */
  onOpen(): void {
    this.beginEditor(this.context.sourceScope); this.modalEl.addClass("kplex-color-modal");
    const t = this.context.translate; this.titleEl.setText(t("colors.adopt"));
    this.contentEl.createDiv({text: t("colors.adoptHelp"), cls: "setting-item-description"});
    const details = this.contentEl.createEl("details");
    details.createEl("summary", {text: t("colors.affected", {count: this.slots.length})});
    const list = details.createEl("ul"); for (const slot of this.slots) list.createEl("li", {text: slot});
    this.preview = new ColorPreview(this.contentEl, {...this.context, target: {kind: "canvas"},
      nodeStyle: () => withoutStyleColorOverrides(this.context.nodeStyle(), NODE_COLOR_FIELDS),
      linkStyle: () => withoutStyleColorOverrides(this.context.linkStyle(), LINK_COLOR_FIELDS), background: () => undefined}, undefined);
    this.release = this.context.subscribeCss?.(() => this.preview?.invalidate()) ?? null;
    new Setting(this.contentEl).addButton(button => button.setButtonText(t("common.cancel")).onClick(() => this.close()))
      .addButton(button => button.setButtonText(t("colors.adoptConfirm")).setDestructive().onClick(() => this.runOperation(this.save)));
  }

  /** Retire isolated sampling and subscriptions before releasing native controls. */
  onClose(): void { super.onClose(); this.release?.(); this.release = null; this.preview?.dispose(); this.preview = null; this.contentEl.empty(); this.closed(); }
}
