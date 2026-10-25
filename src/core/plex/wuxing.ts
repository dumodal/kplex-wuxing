/** Pure status interpretation for the Wu Xing fork. It never creates graph connections. */
export const WUXING_EMOJI = ["🟡", "🔵", "🟢", "🔴", "🟤"] as const;
export type WuXingElement = typeof WUXING_EMOJI[number];
export type WuXingRole = "parent" | "child" | "left" | "right" | "previous";
export const WUXING_LABELS: Readonly<Record<WuXingRole, string>> = {
  parent: "生", child: "生", left: "克", right: "克", previous: "同",
};

/** Accept one exact emoji scalar or a one-element list; conflicting or malformed values stay unknown. */
export function wuXingElement(status: unknown): WuXingElement | null {
  const values = Array.isArray(status) ? status : [status];
  if (!values.length || values.some(value => typeof value !== "string")) return null;
  const normalized = [...new Set(values.map(value => String(value).trim().replace(/\uFE0F/g, "")))];
  if (normalized.length !== 1) return null;
  return WUXING_EMOJI.find(value => value === normalized[0]) ?? null;
}

/** Read relative steps around Wood → Fire → Earth → Metal → Water → Wood; control skips one phase.
 * The emoji array stores a rotated index beginning at Metal, not a conceptual origin or default reference.
 */
export function wuXingRole(center: unknown, target: unknown): WuXingRole | null {
  const source = wuXingElement(center), destination = wuXingElement(target);
  if (!source || !destination) return null;
  const delta = (WUXING_EMOJI.indexOf(destination) - WUXING_EMOJI.indexOf(source) + 5) % 5;
  return (["previous", "child", "right", "left", "parent"] as const)[delta];
}

/** Status-derived edges are read-only; section projection still uses the upstream ontology. */
export function wuXingActionBlocked(id: string): boolean {
  return id.startsWith("relationship.")
    || id.startsWith("sections.") || id.startsWith("section.");
}
