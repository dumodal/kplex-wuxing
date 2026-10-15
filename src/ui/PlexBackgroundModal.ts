/**
 * Native Obsidian color dialog for the canvas background. The shell owns a cancelable local draft,
 * native color/button components and close cleanup; the caller owns persistence and view lifetime.
 * Saving an unchanged color preserves its source identity; RGB changes retain literal alpha.
 * No graph/index state or vault file is acquired by this dialog.
 */
import { Modal, Notice, Setting, type App } from "obsidian";
import type { Translator } from "../lang";
import { colorRgbInput, parseLiteralColor, replaceLiteralRgb, type ColorValue } from "../core/contracts/colorValue";

export class PlexBackgroundModal extends Modal {
  private opened = false;
  private busy = false;

  /** Capture a draft and exact close callback without changing the persisted background. */
  constructor(app: App, private readonly initialColor: ColorValue | undefined, private readonly translate: Translator,
    private readonly onSave: (color: ColorValue | undefined) => Promise<void>, private onClosed?: () => void) {
    super(app);
  }

  /** Render the same native color component as Settings, with explicit Save and Cancel. */
  onOpen(): void {
    this.opened = true;
    this.modalEl.addClass("kplex-background-modal");
    this.titleEl.setText(this.translate("actions.canvasBackground"));
    const initialRgb = colorRgbInput(this.initialColor, "#0c3e6a");
    let color = initialRgb;
    new Setting(this.contentEl).setName(this.translate("settings.ui.plex.background"))
      .addColorPicker(/** The picker edits only this open dialog's draft. */ picker => picker.setValue(color)
        .onChange(/** Native ColorComponent emits six-digit CSS hex values. */ value => { color = value.toLowerCase(); }));
    new Setting(this.contentEl)
      .addButton(/** Cancel leaves the original preference intact. */ button => button.setButtonText(this.translate("common.cancel")).onClick(/** Native close retires the draft. */ () => this.close()))
      .addButton(/** Prevent overlapping persistence from repeated Save activation. */ button => button.setButtonText(this.translate("common.save")).setCta()
        .onClick(/** Commit only a still-open dialog; late native callbacks after close do nothing. */ async () => {
          if (!this.opened || this.busy) return;
          this.busy = true; button.setDisabled(true);
          try {
            const parsed = parseLiteralColor(this.initialColor) ?? { red: 12, green: 62, blue: 106, alpha: 1 };
            await this.onSave(color === initialRgb ? this.initialColor : replaceLiteralRgb(parsed, color) ?? this.initialColor);
            if (this.opened) this.close();
          } catch {
            if (this.opened) new Notice(this.translate("actions.failed"));
          } finally {
            this.busy = false;
            if (this.opened) button.setDisabled(false);
          }
        }));
  }

  /** Notify the originating view exactly once and release detached native controls. */
  onClose(): void {
    if (!this.opened) return;
    this.opened = false; this.contentEl.empty();
    const onClosed = this.onClosed; this.onClosed = undefined; onClosed?.();
  }
}
