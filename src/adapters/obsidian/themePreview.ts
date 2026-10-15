/**
 * Preview-only, owner-document color sampling. A bounded, script-free isolated document resolves
 * already loaded CSS in both Obsidian modes. Samples never become saved colors or live graph
 * defaults. The editor owns invalidation/disposal; normal rendering never enumerates stylesheets.
 */
export type AppearanceMode = "light" | "dark";
export const THEME_PREVIEW_TOKENS = ["--background-primary", "--background-secondary", "--background-primary-alt",
  "--text-normal", "--text-muted", "--background-modifier-border", "--interactive-accent", "--text-on-accent",
  "--graph-line", "--color-purple", "--color-green", "--color-cyan", "--color-orange"] as const;
export type ThemePreviewSample = Readonly<{
  colors: Readonly<Record<string, string>>;
  confidence: "matched" | "estimated";
}>;
export type ThemePreviewPair = Readonly<{
  light: ThemePreviewSample; dark: ThemePreviewSample; activeMode: AppearanceMode;
  reasons: readonly string[]; stylesheetCount: number; cssBytes: number;
}>;
const MAX_BYTES = 8 * 1024 * 1024, MAX_SHEETS = 128, MAX_RULES = 30_000;

/** Copy only authored custom properties, preserving live accent inputs without copying content. */
function copyProperties(source: HTMLElement, target: HTMLElement): void {
  for (let i = 0; i < source.style.length; i++) {
    const name = source.style.item(i);
    if (name.startsWith("--")) target.style.setProperty(name, source.style.getPropertyValue(name), source.style.getPropertyPriority(name));
  }
}

/** Resolve complete CSS colors in their actual scope, including modern color syntax and alpha. */
function sampleColors(scope: HTMLElement, tokens: readonly string[], createProbe: () => HTMLElement): Record<string, string> {
  const owner = scope.ownerDocument, view = owner.defaultView;
  if (!view) return {};
  const computed = view.getComputedStyle(scope), probe = createProbe(), colors: Record<string, string> = {};
  scope.append(probe);
  try {
    for (const token of tokens) {
      const raw = computed.getPropertyValue(token).trim();
      probe.style.removeProperty("color");
      if (raw) probe.style.setProperty("color", raw);
      colors[token] = probe.style.getPropertyValue("color") ? view.getComputedStyle(probe).color : "";
    }
  } finally { probe.remove(); }
  return colors;
}

/** One open editor's snapshot lifetime; cancellation cannot publish a retired frame's result. */
export class ThemePreviewSampler {
  private revision = 0;
  private disposed = false;
  private frame: HTMLIFrameElement | null = null;
  private cancelLoad: (() => void) | null = null;
  private cached: { scope: HTMLElement; tokens: string; value: ThemePreviewPair } | null = null;

  /** Retire cached colors after a real owner-scope or CSS change, never on picker drag. */
  invalidate(): void { this.revision++; this.cached = null; this.cancelLoad?.(); this.frame?.remove(); this.frame = null; }

  /** Release the exact isolated document and its CSS; no polling/listeners survive the editor. */
  dispose(): void { this.disposed = true; this.invalidate(); }

  /** Sample loaded local CSS once per editor revision; unavailable context is explicitly estimated. */
  async sample(scope: HTMLElement, tokens: readonly string[] = THEME_PREVIEW_TOKENS): Promise<ThemePreviewPair | null> {
    if (this.disposed || !scope.isConnected || tokens.length > 64 || tokens.some(token => !/^--[A-Za-z_][A-Za-z0-9_-]{0,100}$/.test(token))) return null;
    const key = tokens.join("|");
    if (this.cached?.scope === scope && this.cached.tokens === key) return this.cached.value;
    this.cancelLoad?.();
    const generation = ++this.revision, owner = scope.ownerDocument, view = owner.defaultView;
    if (!view) return null;
    const activeMode: AppearanceMode = owner.body.classList.contains("theme-light") ? "light" : "dark";
    // Create through the equipped owning window; insertion adopts inert nodes into the isolated
    // document without assuming Obsidian helpers are installed in that script-free iframe realm.
    const helpers = owner.win as Window & { createSpan: typeof createSpan; createDiv: typeof createDiv; createEl: typeof createEl };
    /** The equipped parent factory creates only an inert probe, adopted by its destination scope. */
    const createProbe = (): HTMLElement => helpers.createSpan();
    const live = sampleColors(scope, tokens, createProbe), reasons: string[] = [], texts: string[] = [];
    // Host scripts can publish only the active mode through inline root colors. Their unavailable
    // alternate execution cannot be inferred by copying CSS; retain live paint and label estimates.
    if (tokens.some(token => token !== "--interactive-accent"
      && (owner.body.style.getPropertyValue(token) || owner.documentElement.style.getPropertyValue(token)))) reasons.push("inline-mode-context");
    let cssBytes = 0, ruleCount = 0;
    const sheets = [...Array.from(owner.styleSheets), ...owner.adoptedStyleSheets];
    if (sheets.length > MAX_SHEETS) reasons.push("stylesheet-limit");
    for (const sheet of sheets.slice(0, MAX_SHEETS)) {
      if (sheet.disabled) continue;
      try {
        const rules: string[] = [];
        for (const rule of Array.from(sheet.cssRules)) {
          if ("styleSheet" in rule) { reasons.push("import-unavailable"); continue; }
          const text = rule.cssText;
          cssBytes += text.length * 2;
          if (++ruleCount > MAX_RULES || cssBytes > MAX_BYTES) { reasons.push("stylesheet-limit"); break; }
          rules.push(text);
        }
        const media = sheet.media?.mediaText;
        texts.push(media ? `@media ${media}{${rules.join("\n")}}` : rules.join("\n"));
      } catch { reasons.push("stylesheet-unavailable"); }
      if (ruleCount > MAX_RULES || cssBytes > MAX_BYTES) break;
    }
    /** Preserve accurate current-mode colors while labelling missing alternate context honestly. */
    const fallback = (): ThemePreviewPair => ({
      activeMode, light: { colors: activeMode === "light" ? live : {}, confidence: activeMode === "light" ? "matched" : "estimated" },
      dark: { colors: activeMode === "dark" ? live : {}, confidence: activeMode === "dark" ? "matched" : "estimated" },
      reasons: [...new Set(reasons)], stylesheetCount: texts.length, cssBytes,
    });
    const frame = helpers.createEl("iframe");
    frame.setAttribute("sandbox", "allow-same-origin");
    frame.setAttribute("aria-hidden", "true"); frame.tabIndex = -1;
    for (const [property, value] of Object.entries({ position: "fixed", left: "-100000px", top: "0", width: `${view.innerWidth}px`,
      height: `${view.innerHeight}px`, visibility: "hidden", "pointer-events": "none", border: "0" })) frame.style.setProperty(property, value);
    this.frame?.remove(); this.frame = frame;
    /** Reject every late result after CSS supersession, scope removal or editor disposal. */
    const current = (): boolean => !this.disposed && this.revision === generation && scope.isConnected;
    try {
      await new Promise<void>((resolve, reject) => {
        let settled = false;
        /** Settle the exact pending load and remove its timer/listener on every terminal path. */
        const finish = (error?: Error): void => {
          if (settled) return;
          settled = true; view.clearTimeout(timer); frame.removeEventListener("load", loaded);
          if (this.cancelLoad === cancelled) this.cancelLoad = null;
          if (error) reject(error); else resolve();
        };
        /** A loaded srcdoc is ready for parent-owned CSS injection, with scripts still disabled. */
        const loaded = (): void => finish();
        /** Closing or superseding the editor promptly settles its retired load. */
        const cancelled = (): void => finish(new Error("preview-cancelled"));
        const timer = view.setTimeout(() => finish(new Error("preview-timeout")), 3000);
        this.cancelLoad = cancelled;
        frame.addEventListener("load", loaded, { once: true });
        frame.srcdoc = '<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'none\'; style-src \'unsafe-inline\'; img-src \'none\'; font-src \'none\'; connect-src \'none\'; frame-src \'none\'"></head><body></body></html>';
        owner.body.append(frame);
      });
      if (!current()) return null;
      const doc = frame.contentDocument, frameView = frame.contentWindow as (Window & { CSSStyleSheet: typeof CSSStyleSheet }) | null;
      if (!doc || !frameView || typeof frameView.CSSStyleSheet !== "function") throw new Error("isolation-unavailable");
      // Constructed sheets stay in the isolated realm; CSP forbids every external dependency.
      doc.adoptedStyleSheets = texts.map(/** Keep copied CSS in this exact isolated realm. */ text => { const sheet = new frameView.CSSStyleSheet(); sheet.replaceSync(text); return sheet; });
      doc.documentElement.className = owner.documentElement.className;
      doc.documentElement.dir = owner.documentElement.dir;
      copyProperties(owner.documentElement, doc.documentElement); copyProperties(owner.body, doc.body);
      const ancestors: HTMLElement[] = [];
      for (let element: HTMLElement | null = scope; element && element !== owner.body && ancestors.length < 12; element = element.parentElement) ancestors.unshift(element);
      let target = doc.body;
      for (const original of ancestors) {
        // Only inert context containers are copied, never note content or resource-bearing DOM.
        const clone = helpers.createDiv(); clone.className = original.className;
        if (original.id) clone.id = original.id;
        copyProperties(original, clone); target.append(clone); target = clone;
      }
      const sampled: Partial<Record<AppearanceMode, Record<string, string>>> = {};
      for (const mode of ["light", "dark"] as const) {
        doc.body.className = owner.body.className;
        doc.body.classList.remove("theme-light", "theme-dark"); doc.body.classList.add(`theme-${mode}`);
        sampled[mode] = sampleColors(target, tokens, createProbe);
      }
      if (tokens.some(token => sampled[activeMode]?.[token] !== live[token])) reasons.push("active-context-mismatch");
      if (!current()) return null;
      const confidence = reasons.length ? "estimated" : "matched";
      const value: ThemePreviewPair = { activeMode, light: { colors: activeMode === "light" ? live : sampled.light ?? {}, confidence: activeMode === "light" ? "matched" : confidence },
        dark: { colors: activeMode === "dark" ? live : sampled.dark ?? {}, confidence: activeMode === "dark" ? "matched" : confidence }, reasons: [...new Set(reasons)], stylesheetCount: texts.length, cssBytes };
      this.cached = { scope, tokens: key, value };
      return value;
    } catch (error) {
      if (!current()) return null;
      reasons.push(error instanceof Error && error.message === "preview-timeout" ? "preview-timeout" : "isolation-unavailable"); return fallback();
    } finally { frame.remove(); if (this.frame === frame) this.frame = null; }
  }
}
