/** Per-native-surface selection and bounded restoration. Native document/editor/Sidecar lifetimes remain separate. */
import type {PlexViewDefinition} from "../core/plex/views/contracts";
import type {PlexViewRegistry} from "../core/plex/views/registry";
import {nodeId, type NodeId} from "../core/graph/model";
import {PlexEditorBindings, type SavedPlexEditorIntent} from "./PlexEditorBindings";

export type PlexViewTransient = Readonly<{attention: NodeId; scope?: NodeId; camera: Readonly<{x: number; y: number; scale: number}>;
  selected: string | null; unfolded: readonly string[]}>;

/** Admit only small JSON workspace payloads; unknown view state is retained without executing it. */
function savedState(value: unknown): unknown {
  try {
    const encoded = JSON.stringify(value);
    if (!encoded || encoded.length > 16_384) return null;
    const result: unknown = JSON.parse(encoded);
    /** Deep payloads cannot make restoration recurse without a bound. */
    const bounded = (item: unknown, depth: number): boolean => depth <= 8 && (!item || typeof item !== "object"
      || Object.values(item).every(child => bounded(child, depth + 1)));
    return bounded(result, 0) ? result : null;
  } catch { return null; }
}

export class PlexViewSession {
  /** Document/editor lifetime does not follow attention or definition-owned transient resources. */
  readonly editors = new PlexEditorBindings(() => {
    if (this.closed) return;
    if (this.editors.bindings.length) this.restoredEditors = undefined;
    this.notify(); this.persist();
  });
  private requestedId: string;
  private readonly states = new Map<string, unknown>();
  private readonly listeners = new Set<() => void>();
  private readonly owned = new Set<() => void>();
  private readonly transient = new Map<string, PlexViewTransient>();
  private readonly areaHeights = new Map<string, Readonly<Record<string, number>>>();
  private readonly roots = new Map<string, NodeId>();
  private stateGuard: ((state: unknown) => boolean) | null = null;
  private restoredEditors: unknown;
  private editorUsers = 0;
  private generation = 0;
  private epoch = 0;
  private closed = false;
  private restored = false;
  /** Selection persists through the existing native workspace writer, not plugin settings. */
  constructor(readonly registry: PlexViewRegistry, private readonly persist: () => void) { this.requestedId = registry.fallbackId; }
  /** Resolve only static policy; unavailable saved IDs retain the fallback without discarding their payload. */
  get definition(): PlexViewDefinition { return this.registry.resolve(this.requestedId); }
  /** Decode this definition's finite preference payload without sharing runtime/native objects. */
  get state(): unknown {
    try { return this.definition.restoreState(this.states.get(this.definition.id) ?? this.definition.defaultState); }
    catch { return null; }
  }
  /** Stable scalar snapshot supports React without retaining graph/native objects. */
  getSnapshot = (): number => this.generation;
  subscribe = (listener: () => void): (() => void) => { this.listeners.add(listener); return () => this.listeners.delete(listener); };
  /** Register one view-instance lifetime; dispose synchronously before selecting its replacement. */
  own(dispose: () => void): () => void { if (this.closed) { dispose(); return () => {}; } this.owned.add(dispose); return () => {if (this.owned.delete(dispose)) dispose();}; }
  /** Late work must match both the exact selection generation and native session lifetime. */
  getLifetime(): number { return this.epoch; }
  /** Capture the selection lifetime independently of ordinary preference/paint publications. */
  capture(): () => boolean { const epoch = this.epoch; return () => !this.closed && epoch === this.epoch; }
  /** Same-definition selection performs no work; a replacement retires only view-owned resources. */
  select(id: string): void {
    if (this.closed || id === this.requestedId || !this.canSelect(id) || !/^[a-z][a-z0-9.-]{0,79}$/.test(id)) return;
    this.retire(); this.requestedId = id; this.notify(); this.persist();
  }
  /** An incompatible definition cannot silently destroy a live native editor. Closing it is a shared explicit action. */
  canSelect(id: string): boolean { return !this.closed && (!this.editors.bindings.length || this.registry.resolve(id).id === this.definition.id)
    && (!this.editorUsers || this.registry.resolve(id).capabilities.editor); }
  /** Lease only actual editor hosting; a compatible geometry change keeps the same native instance. */
  retainEditor(): () => void { this.editorUsers++; let alive = true; return () => {if (alive) {alive = false; this.editorUsers--;}}; }
  /** A rooted definition retains one explicit root while ordinary attention changes independently. */
  layoutRoot(attention: NodeId): NodeId { return this.definition.navigation === "rooted" ? this.roots.get(this.definition.id) ?? attention : attention; }
  /** Capture initial root once, outside render; this does not acquire sources or open a document. */
  ensureRoot(attention: NodeId): void { if (!this.roots.has(this.definition.id)) this.setRoot(attention); }
  /** Explicit reroot cannot remove a live editor implicitly. Collapse/save must complete first. */
  setRoot(root: NodeId): boolean {
    if (this.closed || this.definition.navigation !== "rooted" || typeof root !== "string" || !root || root.length > 4096) return false;
    if (this.roots.get(this.definition.id) === root) return true;
    if (this.editors.bindings.length) return false;
    if (this.roots.size >= 16 && !this.roots.has(this.definition.id)) {
      const oldest: unknown = this.roots.keys().next().value;
      if (typeof oldest === "string") this.roots.delete(oldest);
    }
    if (this.readEditorIntent()) this.restoredEditors = undefined;
    this.roots.set(this.definition.id, root); this.notify(); this.persist(); return true;
  }
  /** The mounted host preflights branch-state changes against exact current editor admission. */
  guardState(check: (state: unknown) => boolean): () => void {
    if (this.closed) return () => {};
    this.stateGuard = check;
    return () => {if (this.stateGuard === check) this.stateGuard = null;};
  }
  /** Restored intent grants no native authority. Admit this exact occurrence/file before opening it. */
  readEditorIntent(): SavedPlexEditorIntent | null {
    const raw = this.restoredEditors;
    if (this.closed || this.editors.bindings.length || this.definition.editorHosting !== "occurrence" || !raw || typeof raw !== "object"
      || Reflect.get(raw, "version") !== 1) return null;
    const bindings: unknown = Reflect.get(raw, "bindings");
    if (!Array.isArray(bindings) || bindings.length !== 1) return null;
    const value: unknown = bindings[0];
    if (!value || typeof value !== "object") return null;
    const viewId: unknown = Reflect.get(value, "viewId"), occurrenceId: unknown = Reflect.get(value, "occurrenceId"), mode: unknown = Reflect.get(value, "mode");
    const target: unknown = Reflect.get(value, "target"), dimensions: unknown = Reflect.get(value, "dimensions");
    if (viewId !== this.definition.id || typeof occurrenceId !== "string" || !occurrenceId || occurrenceId.length > 4096
      || mode !== "source" && mode !== "preview" || !target || typeof target !== "object" || !dimensions || typeof dimensions !== "object") return null;
    const identity: unknown = Reflect.get(target, "nodeId"), path: unknown = Reflect.get(target, "path");
    const width: unknown = Reflect.get(dimensions, "width"), height: unknown = Reflect.get(dimensions, "height");
    if (typeof identity !== "string" || !identity || identity.length > 4096 || typeof path !== "string" || !path || path.length > 4096
      || typeof width !== "number" || !Number.isFinite(width) || width <= 0 || width > 100_000
      || typeof height !== "number" || !Number.isFinite(height) || height <= 0 || height > 100_000) return null;
    return {viewId: this.definition.id, occurrenceId, mode, target: {nodeId: nodeId(identity), path}, dimensions: {width, height}};
  }
  /** Keep bounded transient geometry/selection in this native incarnation, outside data.json/workspace serialization. */
  retainTransient(id: string, value: PlexViewTransient): void {
    if (this.closed || !this.registry.has(id) || !Object.values(value.camera).every(Number.isFinite) || value.camera.scale <= 0
      || value.camera.scale > 16 || Math.abs(value.camera.x) > 1e9 || Math.abs(value.camera.y) > 1e9) return;
    if (this.transient.size >= 16 && !this.transient.has(id)) {
      const oldest: unknown = this.transient.keys().next().value;
      if (typeof oldest === "string") this.transient.delete(oldest);
    }
    this.transient.set(id, {attention: value.attention, ...(value.scope ? {scope: value.scope} : {}), camera: {...value.camera}, selected: value.selected?.slice(0, 4096) ?? null,
      unfolded: value.unfolded.slice(0, 256).filter(key => typeof key === "string" && key.length <= 4096)});
  }
  /** A new attention scope permanently retires references to the previous root; no pages or native objects are retained. */
  readTransient(id: string, attention: NodeId): PlexViewTransient | undefined {
    const value = this.transient.get(id);
    const expected = this.registry.resolve(id).navigation === "rooted" ? this.roots.get(id) ?? attention : attention;
    if (value && (value.scope ?? value.attention) !== expected) {this.transient.delete(id);return undefined;}
    return value;
  }
  /** New views keep small area preferences in their own native-session namespace; Classic never writes here. */
  getAreaHeights(): Readonly<Record<string, number>> { return this.areaHeights.get(this.definition.id) ?? {}; }
  /** Stage a finite presentation preference through the native workspace writer, never global settings or semantic invalidation. */
  setAreaHeight(key: string, height: number): boolean {
    if (this.closed || !key || ["__proto__", "constructor", "prototype"].includes(key) || key.length > 128 || !Number.isFinite(height) || height <= 0 || height > 100_000) return false;
    const previous = this.getAreaHeights();
    if (previous[key] === height || Object.keys(previous).length >= 64 && !(key in previous)) return false;
    this.areaHeights.set(this.definition.id, {...previous, [key]: height}); this.notify(); this.persist(); return true;
  }
  /** Persist one bounded view-local payload without sharing another view's transient state. */
  updateState(value: unknown): boolean {
    if (this.closed) return false;
    let next: unknown;
    try { next = this.definition.restoreState(value); } catch { next = null; }
    next = savedState(next);
    if (this.editors.bindings.length) {
      try { if (!this.stateGuard || !this.stateGuard(next)) return false; } catch { return false; }
    }
    this.states.set(this.definition.id, next); this.notify(); this.persist(); return true;
  }
  /** Native workspace allowlist excludes runtime instances, acquired scope and graph payloads. */
  getState(): unknown { return {version: 1, id: this.requestedId, states: Object.fromEntries(this.states), areaHeights: Object.fromEntries(this.areaHeights), roots: Object.fromEntries(this.roots),
    editors: this.editors.bindings.length ? {version: 1, bindings: this.editors.bindings.map(binding => ({viewId: binding.viewId,
      occurrenceId: binding.occurrenceId, target: {nodeId: binding.target.nodeId, path: binding.target.path}, dimensions: binding.dimensions, mode: binding.mode}))} : this.restoredEditors}; }
  /** Restore once; malformed and unavailable IDs safely retain the built-in experience. */
  restore(value: unknown): void {
    if (this.closed || this.restored) return;
    this.restored = true;
    if (!value || typeof value !== "object" || Reflect.get(value, "version") !== 1) return;
    const id: unknown = Reflect.get(value, "id"), states: unknown = Reflect.get(value, "states");
    this.restoredEditors = savedState(Reflect.get(value, "editors"));
    const roots: unknown = Reflect.get(value, "roots");
    if (roots && typeof roots === "object") for (const [view, root] of Object.entries(roots).slice(0, 16)) {
      if (/^[a-z][a-z0-9.-]{0,79}$/.test(view) && typeof root === "string" && root && root.length <= 4096) this.roots.set(view, nodeId(root));
    }
    if (states && typeof states === "object") for (const [key, state] of Object.entries(states).slice(0, 16)) {
      if (/^[a-z][a-z0-9.-]{0,79}$/.test(key)) this.states.set(key, savedState(state));
    }
    const areas: unknown = Reflect.get(value, "areaHeights");
    if (areas && typeof areas === "object") for (const [view, rawHeights] of Object.entries(areas).slice(0, 16)) {
      const heights: unknown = rawHeights;
      if (!/^[a-z][a-z0-9.-]{0,79}$/.test(view) || !heights || typeof heights !== "object") continue;
      const admitted: Record<string, number> = {};
      for (const [key, height] of Object.entries(heights).slice(0, 64)) if (key && !["__proto__", "constructor", "prototype"].includes(key) && key.length <= 128 && typeof height === "number" && Number.isFinite(height) && height > 0 && height <= 100_000) admitted[key] = height;
      this.areaHeights.set(view, admitted);
    }
    if (typeof id === "string" && /^[a-z][a-z0-9.-]{0,79}$/.test(id)) {
      if (id !== this.requestedId) {this.retire(); this.requestedId = id;}
      this.notify();
    }
  }
  /** Isolate a failed definition without mutating its saved preferences or native document owner. */
  recover(): void { if (this.requestedId === this.registry.fallbackId) {this.retire();this.notify();} else this.select(this.registry.fallbackId); }
  /** Permanent native close, unlike a compatible view change or React remount. */
  dispose(): void { if (this.closed) return; this.closed = true; this.editors.dispose(); this.retire(); this.listeners.clear(); this.states.clear(); this.transient.clear(); this.areaHeights.clear(); this.roots.clear(); this.stateGuard = null; this.restoredEditors = undefined; }
  /** Every disposer runs even if another outgoing view resource fails to close. */
  private retire(): void { this.epoch++; this.generation++; this.stateGuard = null; for (const dispose of [...this.owned]) {this.owned.delete(dispose);try {dispose();} catch { /* resource failure cannot retain another owner's lifetime */ }} }
  /** Re-render session selection/state without semantic publication or a fake navigation visit. */
  private notify(): void { this.generation++; for (const listener of this.listeners) listener(); }
}
