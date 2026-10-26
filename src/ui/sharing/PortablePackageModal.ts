/** Shared native data-only transfer surface. Validation/planning are portable; native modal, clipboard and existing queued save owners retain effects. */
import {Setting, type App, type ButtonComponent} from "obsidian";
import {StyleEditorModal} from "../StyleEditorModal";
import {ClipboardSession} from "../../application/ClipboardSession";
import {NativeMarkdownHelp} from "../NativeMarkdownHelp";
import {validatePortablePackage} from "../../core/plex/sharing/validation";
import {preparePortableImport, PortableSharingCapacityError, type PreparedImport, type ImportChoices} from "../../core/plex/sharing/transfer";
import {PORTABLE_PACKAGE_LIMITS, type PortablePackage} from "../../core/plex/sharing/contracts";
import {FACETS_AUTHORING_CONTEXT, LENS_AUTHORING_CONTEXT} from "../../core/plex/sharing/authoring";
import type {PortableSharingContext} from "./contracts";

export type PortablePackageModalOptions = Readonly<{kind: "facets" | "lens"; mode: "import" | "export" | "prompt";
  context: PortableSharingContext; build?: (selectedLensIds: readonly string[], allowPrivate: boolean) => PortablePackage;
  closed: () => void}>;

export class PortablePackageModal extends StyleEditorModal {
  private clipboard: ClipboardSession | null = null;
  private help: NativeMarkdownHelp | null = null;
  private preview: HTMLElement | null = null;
  private status: HTMLElement | null = null;
  private applyButton: ButtonComponent | null = null;
  private plan: PreparedImport | null = null;
  private incoming: PortablePackage | null = null;
  private choices: ImportChoices = {targetId: "", replace: false, lensIds: [], replacePalette: []};
  private helpGeneration = 0;
  /** A source-scoped context captures the opening theme/session; no plugin or vault is exposed. */
  constructor(app: App, private readonly options: PortablePackageModalOptions) {super(app);}
  /** Every entry is explicit; no default export includes an active/private lens or device state. */
  onOpen(): void {
    const {context, mode, kind} = this.options, t = this.translate;
    this.beginEditor(context.sourceScope, context.bindEditor);this.titleEl.setText(t("sharing.title"));
    this.modalEl.addClass("kplex-portable-package-modal");const {body, actions} = this.scrollableContent();
    body.createEl("p", {text: t(mode === "import" ? "sharing.importHelp" : "sharing.exportHelp")});
    this.status = body.createDiv({attr: {role: "status", "aria-live": "polite"}});
    const source = body.createEl("textarea", {cls: "kplex-package-source", attr: {rows: "14", spellcheck: "false", "aria-label": t("sharing.source")}});
    source.maxLength = PORTABLE_PACKAGE_LIMITS.characters;
    new Setting(actions).addButton(button => button.setButtonText(t("common.cancel")).onClick(() => this.close()));
    if (mode === "prompt") {
      source.readOnly = true;source.value = kind === "facets" ? FACETS_AUTHORING_CONTEXT : LENS_AUTHORING_CONTEXT;
      this.copyAction(actions, source, "sharing.copyPrompt");return;
    }
    if (mode === "export") {this.renderExport(body, actions, source);return;}
    const fileRow = new Setting(body).setName(t("sharing.file"));
    const file = fileRow.controlEl.createEl("input", {attr: {type: "file", accept: ".json,application/json", "aria-label": t("sharing.file")}});
    file.addEventListener("change", /** Reading a user-chosen bounded JSON file never touches a Vault API or settings. */ () => {
      const selected = file.files?.[0];if (!selected || !this.canEdit()) return;
      if (selected.size > PORTABLE_PACKAGE_LIMITS.characters * 4) {this.invalid();return;}
      const generation = ++this.helpGeneration;
      void selected.text().then(/** A late file read cannot replace another chosen/typed source or a closed modal. */ value => {
        if (!this.canEdit() || generation !== this.helpGeneration) return;source.value = value;this.readIncoming(value);
      }, /** File errors retain the previous source and never commit a partial import. */ () => {if (this.canEdit() && generation === this.helpGeneration) this.invalid();});
    });
    this.preview = body.createDiv({cls: "kplex-package-preview"});
    source.addEventListener("input", /** Typing invalidates the exact reviewed plan immediately, without parsing on each key. */ () => {this.helpGeneration++;this.clearPreview();});
    new Setting(actions).addButton(button => button.setButtonText(t("sharing.preview")).onClick(() => {if (this.canEdit()) this.readIncoming(source.value);}))
      .addButton(button => {this.applyButton = button;button.setButtonText(t("sharing.apply")).setCta().setDisabled(true).onClick(() => {
        const plan = this.plan;if (!plan || !this.canEdit() || !context.current()) return;
        this.runOperation(current => context.save(plan, () => current() && context.current()));
      });});
    this.focusAfterAttachment(source);
  }
  /** Clipboard writes use the shared gesture-safe owner and report success only after fulfillment. */
  private copyAction(parent: HTMLElement, source: HTMLTextAreaElement, label: "sharing.copyJson" | "sharing.copyPrompt"): void {
    new Setting(parent).addButton(button => button.setButtonText(this.translate(label)).onClick(() => {
      if (!this.canEdit() || !source.value || this.clipboard?.state === "copying") return;this.clipboard?.dispose();const owner = source.ownerDocument.defaultView;
      this.clipboard = new ClipboardSession(source.value, owner?.navigator.clipboard?.writeText ? value => owner.navigator.clipboard.writeText(value) : null);
      this.clipboard.listen(/** Native feedback never claims an unfulfilled clipboard operation. */ state => {
        if (this.canEdit()) this.status?.setText(state === "copied" ? this.translate("footprints.copied") : state === "failed" ? this.translate("footprints.copyFailed") : "");
      });this.clipboard.copy();
    }));
  }
  /** Dependency and privacy choices rebuild an immutable export; the visible source and copied bytes are identical. */
  private renderExport(body: HTMLElement, actions: HTMLElement, source: HTMLTextAreaElement): void {
    let selected: string[] = [], allowPrivate = false;source.readOnly = true;
    const render = (): void => {
      if (!this.canEdit()) return;
      try {const pkg = this.options.build?.(selected, allowPrivate);source.value = pkg ? JSON.stringify(pkg, null, 2) : "";this.status?.setText("");}
      catch (error) {console.error("K-Plex portable export refused", error);source.value = "";this.status?.setText(this.translate("sharing.privacy"));}
    };
    if (this.options.kind === "facets") {
      const details = body.createEl("details");details.createEl("summary", {text: this.translate("sharing.dependencies")});
      for (const lens of this.options.context.read().lenses.slice(0, 256)) new Setting(details).setName(lens.name).setDesc(lens.expression).addToggle(toggle =>
        toggle.setValue(false).onChange(/** Only checked definitions accompany the chosen preset. */ value => {selected = value ? [...selected, lens.id] : selected.filter(id => id !== lens.id);render();}));
    }
    new Setting(body).setName(this.translate("sharing.allowPrivate")).setDesc(this.translate("sharing.privacy")).addToggle(toggle => toggle.setValue(false).onChange(value => {allowPrivate = value;render();}));
    this.copyAction(actions, source, "sharing.copyJson");
    new Setting(actions).addButton(button => button.setButtonText(this.translate("sharing.download")).onClick(() => {
      if (!this.canEdit() || !source.value) return;
      const owner = source.ownerDocument.defaultView;if (!owner) return;
      const blob = new owner.Blob([source.value], {type: "application/json"}), url = owner.URL.createObjectURL(blob);
      const link = this.contentEl.createEl("a", {attr: {href: url, download: "kplex-preset.json"}});
      try {link.click();} finally {link.remove();owner.URL.revokeObjectURL(url);}
    }));render();
  }
  /** Retire a prior native Help component and every exact-plan control on source changes. */
  private clearPreview(): void {this.plan = null;this.incoming = null;this.applyButton?.setDisabled(true);this.help?.dispose();this.help = null;this.preview?.empty();this.status?.setText("");}
  /** Error copy is localized; machine field paths/codes remain inert diagnostic data. */
  private invalid(detail = ""): void {this.plan = null;this.applyButton?.setDisabled(true);this.status?.setText(`${this.translate("sharing.invalid")}${detail ? ` ${detail}` : ""}`);}
  /** Validate first, then expose exact identity/collision/dependency choices without changing settings. */
  private readIncoming(source: string): void {
    this.clearPreview();const validation = validatePortablePackage(source);
    if (validation.status !== "valid") {this.invalid(validation.issues.map(issue => `${issue.path}: ${issue.code}`).join("; "));return;}
    if (validation.value.kind !== this.options.kind || !this.preview) {this.invalid();return;}
    const pkg = validation.value;this.incoming = pkg;this.choices = {targetId: pkg.id, replace: false, lensIds: [], replacePalette: []};
    if (validation.privacy.length) this.preview.createEl("p", {text: `${this.translate("sharing.privacy")} ${validation.privacy.join(", ")}`});
    const target = new Setting(this.preview).setName(this.translate("sharing.target"));
    target.addText(input => input.setValue(pkg.id).onChange(/** A changed destination invalidates consent to replace the previous destination. */ value => {
      this.choices = {...this.choices, targetId: value, replace: false};replaceToggle?.setValue(false);this.review();
    }));
    const installed = this.options.context.read(), entries = pkg.kind === "facets" ? Object.keys(installed.presets) : installed.lenses.map(lens => lens.id);
    this.preview.createEl("p", {cls: "setting-item-description", text: entries.join(", ")});
    let replaceToggle: import("obsidian").ToggleComponent | undefined;
    new Setting(this.preview).setName(this.translate("sharing.replace")).addToggle(toggle => {replaceToggle = toggle;toggle.setValue(false).onChange(value => {this.choices = {...this.choices, replace: value};this.review();});});
    for (const lens of pkg.kind === "facets" ? pkg.lenses ?? [] : []) new Setting(this.preview).setName(lens.name).setDesc(`${lens.id}: ${lens.expression}`).addToggle(toggle =>
      toggle.setValue(false).onChange(/** Dependency lenses require explicit selection and arrive disabled. */ value => {
        this.choices = {...this.choices, lensIds: value ? [...this.choices.lensIds, lens.id] : this.choices.lensIds.filter(id => id !== lens.id)};this.review();
      }));
    for (const pair of pkg.palette ?? []) {
      const existing = installed.palette.find(item => item.id === pair.id);
      new Setting(this.preview).setName(`${this.translate("sharing.palette")}: ${pair.name} (${pair.id})`)
        .setDesc(`${this.translate("sharing.replacePalette")}: ${pair.light} / ${pair.dark}${existing ? `\n${this.translate("sharing.keepPalette")}: ${existing.light} / ${existing.dark}` : ""}`).addDropdown(dropdown =>
      dropdown.addOption("keep", this.translate("sharing.keepPalette")).addOption("replace", this.translate("sharing.replacePalette")).setValue("keep").onChange(value => {
        this.choices = {...this.choices, replacePalette: value === "replace" ? [...this.choices.replacePalette, pair.id] : this.choices.replacePalette.filter(id => id !== pair.id)};this.review();
      }));
    }
    this.preview.createEl("pre", {cls: "kplex-package-json", text: JSON.stringify(pkg, null, 2)});
    if (pkg.kind === "facets") {
      const helpHost = this.preview.createDiv();new Setting(this.preview).addButton(button => button.setButtonText(this.translate("sharing.previewHelp")).onClick(() => {
        if (!this.canEdit()) return;this.help?.dispose();this.help = new NativeMarkdownHelp(this.app, helpHost);
        void this.help.render(pkg.preset.helpMarkdown).catch(/** Native errors cannot make the package actionable. */ error => {console.error("K-Plex imported Help preview failed", error);if (this.canEdit()) this.invalid();});
      }));
    }
    this.review();
  }
  /** Only a successfully reviewed, current plan enables Import. Save repeats all checks inside the queue. */
  private review(): void {
    this.plan = null;this.applyButton?.setDisabled(true);if (!this.incoming || !this.options.context.current()) return;
    try {const plan = preparePortableImport(this.incoming, this.choices, this.options.context.read());this.options.context.preview?.(plan);
      this.plan = plan;this.status?.setText("");this.applyButton?.setDisabled(false);}
    catch (error) {console.error("K-Plex portable preview refused", error);this.status?.setText(this.translate(error instanceof PortableSharingCapacityError ? "sharing.capacity" : "sharing.collision"));}
  }
  /** Failed writes retain source and require a fresh preview before another attempt. */
  protected onOperationRejected(): void {this.plan = null;this.applyButton?.setDisabled(true);this.status?.setText(this.translate("sharing.changed"));}
  /** Component, clipboard, late file reads and exact plan are retired on every native dismissal/migration. */
  onClose(): void {super.onClose();this.helpGeneration++;this.clipboard?.dispose();this.clipboard = null;this.help?.dispose();this.help = null;this.plan = null;this.contentEl.empty();this.options.closed();}
}
