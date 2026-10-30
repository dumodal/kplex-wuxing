/** A short native caption draft reuses the same entry-scoped configuration writer and style
 * modal lifecycle as the full Facets editor. It cannot change note properties or graph links. */
import {Setting, type App, type ButtonComponent} from "obsidian";
import {StyleEditorModal, labelIconButton} from "../../StyleEditorModal";
import type {CanvasViewManagerContext} from "../managerContracts";
import type {FacetPreset} from "../../../core/plex/views/facets/contracts";
import {facetLibrary} from "../../../core/plex/views/facets/configuration";
import {facetFlowId, facetFlowPairs, facetFlowStyle, readFacetCaptionTarget, readRelationshipCaptionTarget} from "../../../core/plex/views/facets/flow";
import {isFacetPreset} from "../../../core/plex/views/facets/validation";
import {configurationExpected} from "../../../core/plex/views/configurationPaths";
import {facetCategoryLabel} from "../../../core/plex/views/facets/labels";
import {canvasViewText} from "../labels";

export class FacetCaptionEditor extends StyleEditorModal {
  private readonly address;
  private readonly expected;
  private readonly owner: () => boolean;
  private caption: string;
  private saveButton: ButtonComponent | null = null;
  private status: HTMLElement | null = null;
  private release: (() => void) | null = null;
  /** Capture one current preset and pair; subsequent external changes reject rather than overwrite. */
  constructor(app: App, private readonly options: CanvasViewManagerContext, id: string,
    private readonly preset: FacetPreset, private readonly source: string, private readonly target: string, private readonly relationshipKey?: string) {
    super(app);this.address = {field: "presets", path: [id]};this.expected = options.read(this.address);
    this.owner = options.capture(this.address);this.caption = relationshipKey ? preset.relationshipCaptions?.[relationshipKey] ?? "" : facetFlowStyle(preset, source, target).caption ?? "";
  }
  /** Native text controls retain Save/Cancel, focus and pending-write ownership from the shared shell. */
  onOpen(): void {
    this.beginEditor(this.options.colors.sourceScope, this.options.colors.bindEditor);const t = this.translate;
    this.modalEl.addClass("kplex-facet-caption-editor");this.titleEl.setText(t(this.relationshipKey ? "facets.relationshipCaption" : "facets.flowCaption"));
    this.contentEl.createEl("p", {text: this.relationshipKey ? `${this.source.split("/").pop()} ↔ ${this.target.split("/").pop()}`
      : `${canvasViewText(facetCategoryLabel(this.preset.categories[this.source], this.source), t)} → ${canvasViewText(facetCategoryLabel(this.preset.categories[this.target], this.target), t)}`});
    if (this.relationshipKey) this.contentEl.createEl("p", {text: t("facets.relationshipCaptionHelp")});
    new Setting(this.contentEl).setName(t(this.relationshipKey ? "facets.relationshipCaption" : "facets.flowCaption")).addText(/** User prose is bounded data, never a translation key or executable source. */ input => {
      input.inputEl.maxLength = 80;input.setValue(this.caption).onChange(/** Keep typing local until explicit Save. */ value => {this.caption = value;this.validate();});
      this.focusAfterAttachment(input.inputEl);
    });
    this.status = this.contentEl.createDiv({cls: "setting-item-description", attr: {role: "status", "aria-live": "polite"}});
    new Setting(this.contentEl).addButton(/** Cancel discards this one detached text draft. */ button => {
      labelIconButton(button.buttonEl, t("common.cancel"), "x");button.onClick(/** Pending writes retain the shell's dismissal guard. */ () => this.close());
    }).addButton(/** Save routes through the existing disk-before-publication settings queue. */ button => {
      this.saveButton = button;labelIconButton(button.buttonEl, t("common.save"), "save");button.setCta().onClick(/** Submit only the captured pair. */ () => this.submit());
    });
    this.release = this.options.subscribe(/** External preset replacement makes this draft read-only. */ () => this.validate());this.validate();
  }
  /** Preserve the exact draft on stale ownership, validation failure or durable write rejection. */
  private validate(): boolean {
    const current = this.owner() && configurationExpected(this.options.read(this.address), this.expected);
    this.status?.setText(current ? "" : this.translate("facets.staleDraft"));
    this.saveButton?.setDisabled(!this.canEdit() || !current || this.caption.length > 80);return current;
  }
  /** Merge only one caption with the opening immutable snapshot; sibling presets are rebased by the host. */
  private submit(): void {
    if (!this.validate() || !this.canEdit() || this.caption.length > 80) return;
    if (this.relationshipKey) {
      const captions = {...this.preset.relationshipCaptions}, caption = this.caption.trim();
      if (caption) captions[this.relationshipKey] = caption;else delete captions[this.relationshipKey];
      const value = {...this.preset, relationshipCaptions: captions};
      this.runOperation(/** Save only presentation prose through the existing durable settings queue. */ current =>
        this.options.save(this.address, {kind: "set", value}, this.expected, () => current() && this.owner()));return;
    }
    const id = facetFlowId(this.source, this.target), previous = this.preset.flowOverrides?.find(/** Keep explicit direction/style for this pair. */ pair => facetFlowId(pair.source, pair.target) === id);
    const value = {...this.preset, flowOverrides: [...(this.preset.flowOverrides ?? []).filter(/** Other pair overrides remain byte-for-byte values. */ pair => facetFlowId(pair.source, pair.target) !== id),
      {...previous, source: this.source, target: this.target, caption: this.caption}]};
    this.runOperation(/** The captured modal and incoming settings epoch must both remain current. */ current =>
      this.options.save(this.address, {kind: "set", value}, this.expected, () => current() && this.owner()));
  }
  /** A failed durable write must not turn stale controls back into an enabled Save. */
  protected onOperationRejected(): void {this.validate();}
  /** Release precisely this caption's subscription and native controls after save or dismissal. */
  onClose(): void {super.onClose();this.release?.();this.release = null;this.saveButton = null;this.contentEl.empty();this.options.closed();}
}

/** Resolve a bounded text-editor target against the current validated library. Missing, retired
 * or nonadjacent category identities cannot acquire a settings-write capability. */
export function createFacetCaptionEditor(app: App, options: CanvasViewManagerContext, target?: string): FacetCaptionEditor | null {
  const relationship = readRelationshipCaptionTarget(target);
  if (relationship) {
    const preset = facetLibrary(options.configuration())?.presets[relationship.preset];
    if (!isFacetPreset(preset)) return null;
    const endpoints = JSON.parse(relationship.key) as [string, string, string, number, number];
    return new FacetCaptionEditor(app, options, relationship.preset, structuredClone(preset), endpoints[0], endpoints[1], relationship.key);
  }
  const address = readFacetCaptionTarget(target);if (!address) return null;
  const preset = facetLibrary(options.configuration())?.presets[address.preset];
  if (!isFacetPreset(preset) || !facetFlowPairs(preset).some(/** Captured directions must still belong to the current guide cycle. */ pair => pair.source === address.source && pair.target === address.target)) return null;
  return new FacetCaptionEditor(app, options, address.preset, structuredClone(preset), address.source, address.target);
}
