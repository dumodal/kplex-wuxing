/** One surface's delayed or modifier-gated hover highlight; drag and touch owners stay separate. */
export class HoverHighlight<T> {
  private timer: number | null = null;
  private candidate: T | null = null;
  private alt = false;

  constructor(private readonly owner: Window, private readonly requireAlt: boolean, private readonly publish: (target: T | null) => void) {}

  /** Remember the hovered occurrence so a stationary pointer can respond to modifier changes. */
  enter(target: T, event: { altKey: boolean; pointerType: string }): void {
    if (event.pointerType === "touch") return;
    this.clear(false);
    this.candidate = target;
    this.alt = event.altKey;
    if (this.requireAlt) this.publish(this.alt ? target : null);
    else this.timer = this.owner.setTimeout(() => { this.timer = null; this.publish(target); }, 750);
  }

  /** Key transitions never consume host shortcuts or alter a drag-owned highlight. */
  modifier(alt: boolean): void {
    if (!this.requireAlt || this.candidate === null || this.alt === alt) return;
    this.alt = alt;
    this.publish(alt ? this.candidate : null);
  }

  /** Retire pending activation before leave, navigation, blur, policy changes or teardown. */
  clear(active = true): void {
    if (this.timer !== null) this.owner.clearTimeout(this.timer);
    this.timer = null;
    this.candidate = null;
    if (active) this.publish(null);
  }
}

/** Bind only to this graph's owning window/document, with a single explicit cleanup path. */
export function bindHoverHighlight<T>(element: HTMLElement, highlight: HoverHighlight<T>): () => void {
  const doc = element.ownerDocument;
  const owner = doc.defaultView!;
  const key = (event: KeyboardEvent): void => highlight.modifier(event.altKey);
  const blur = (): void => highlight.clear();
  const visibility = (): void => { if (doc.visibilityState === "hidden") highlight.clear(); };
  owner.addEventListener("keydown", key);
  owner.addEventListener("keyup", key);
  owner.addEventListener("blur", blur);
  doc.addEventListener("visibilitychange", visibility);
  return () => {
    owner.removeEventListener("keydown", key);
    owner.removeEventListener("keyup", key);
    owner.removeEventListener("blur", blur);
    doc.removeEventListener("visibilitychange", visibility);
    highlight.clear();
  };
}
