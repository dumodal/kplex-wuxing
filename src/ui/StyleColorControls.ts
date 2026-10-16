/** Detached parent-style color fields; every native child reuses the single source editor. */
import type {App} from "obsidian";
import {ColorSourceModal} from "./ColorSourceModal";
import type {ColorPreviewOptions, ColorPreviewTarget} from "./ColorPreview";
import {colorIdentityText, type ColorValue} from "../core/contracts/colorValue";

export type StyleColorContext = Omit<ColorPreviewOptions, "target"> & Readonly<{
  subscribeCss?: (changed: () => void) => () => void;
  subscribeColors?: (changed: () => void) => () => void;
}>;

/** Parent owns the draft and lifetime; selecting a source never writes settings by itself. */
export class StyleColorControls {
  private readonly dialogs = new Set<ColorSourceModal>();
  private alive = true;
  private readonly refreshers = new Set<() => void>();
  private releaseColors: (() => void) | null = null;

  /** Capture narrow preview/data ports without acquiring a plugin, graph or settings writer. */
  constructor(private readonly app: App, private readonly context: StyleColorContext, private readonly canEdit: () => boolean) {
    this.releaseColors = context.subscribeColors?.(() => {if (this.alive) for (const refresh of this.refreshers) refresh();}) ?? null;
  }

  /** Render one source-identity action, using current lower-layer paint for Default. */
  add(container: HTMLElement, label: string, target: ColorPreviewTarget,
    read: () => ColorValue | undefined, write: (value: ColorValue | undefined) => void,
    inherit: () => ColorValue | undefined): void {
    const row = container.createDiv({cls: "kplex-style-row"});
    row.createSpan({text: label});
    const button = row.createEl("button", {attr: {type: "button", "aria-label": label}});
    const refresh = (): void => {const value = read(); button.setText(colorIdentityText(value, this.context.preferences().palette) || this.context.translate(value === undefined ? "colors.inherit" : "colors.unsupportedSource"));};
    this.refreshers.add(refresh); refresh();
    button.addEventListener("click", () => {
      if (!this.alive || !this.canEdit()) return;
      const dialog = new ColorSourceModal(this.app, {...this.context, target, inherit,
        title: label, initial: read(), help: this.context.translate("colors.parentHelp"), actionLabel: this.context.translate("colors.useColor"),
        onSave: async source => {
          if (!this.alive || !this.canEdit()) throw new Error("Parent style editor retired");
          write(source); refresh(); return {refreshPending: false};
        },
        onClosed: () => this.dialogs.delete(dialog),
      });
      this.dialogs.add(dialog); dialog.open();
    });
  }

  /** Retire children before parent Save/close/migration; late callbacks cannot mutate a captured draft. */
  dispose(): void { if (!this.alive) return; this.alive = false; this.releaseColors?.(); this.releaseColors = null; this.refreshers.clear(); for (const dialog of this.dialogs) dialog.retire(); this.dialogs.clear(); }
}
