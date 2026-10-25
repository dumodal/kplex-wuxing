/** Deterministic measured3–7-region packing around one attention/editor envelope. Existing host
 * owners retain clipping/reflow/resizing/camera. Guides remain decorative without endpoints. */
import type {PlexProjection, PlexMeasurement, PlexViewLayout, PlexArea, PlexDecoration, ViewRect, CanvasViewText} from "../contracts";
import type {FacetPreset} from "./contracts";
import {measuredAreaGrid} from "../areaLayout";
import {nodeBadgeBounds} from "../decorations";
import {facetCategoryLabel} from "./labels";
import {facetAreaId} from "./projection";

/** Reuse the shared measured grid and native area reflow owner. Fixed attention never belongs
 * to a scroll surface, and empty regions retain their visible bounds and controls. */
function pack(id: string, bounds: ViewRect, projection: PlexProjection, measured: ReadonlyMap<string, PlexMeasurement>,
  positions: Map<string, ViewRect>, label: CanvasViewText, editable: boolean): PlexArea {
  const items = projection.occurrences.filter(row => row.areaId === id).flatMap(row => {const value = measured.get(row.id);return value ? [value] : [];});
  const grid = measuredAreaGrid(items, 1, 0, 18, 24, 18, 18), top = bounds.y + 54;
  for (const [key, rect] of grid.positions) positions.set(key, {...rect, x: bounds.x + bounds.width / 2, y: top + rect.y});
  return {id, bounds, labelKey: "key" in label ? label.key : "", ...("literal" in label ? {label: label.literal} : {}),
    ...(editable ? {resizeEdge: "bottom", heightPreference: {key: id, minimum: 160, maximum: 1200}} : {}),
    viewport: {x: bounds.x, y: top, width: bounds.width, height: bounds.height - 54, contentTop: top,
      contentHeight: Math.max(bounds.height - 54, grid.height), initialScrollTop: 0},
    reflow: {columns: 1, columnGap: 0, rowGap: 18, paddingTop: 18, paddingBottom: 18}};
}
/** Ring radius separates neighboring region diagonals and reserves the center's actual editor
 * plus badge envelope. Preset-scoped area overrides never leak to another preset/category. */
export function layoutFacets(projection: PlexProjection, measured: readonly PlexMeasurement[], presetId: string, preset: FacetPreset,
  areaHeights: Readonly<Record<string, number>> = {}, editable = true): PlexViewLayout {
  const measurements = new Map(measured.map(row => [row.id, row])), attention = measurements.get(projection.entry);
  if (!attention || preset.order.length < 3 || preset.order.length > 7) throw new Error("Invalid Facets center/categories");
  const peripherals = measured.filter(row => row.id !== projection.entry);
  const width = Math.max(preset.regionWidth, ...peripherals.map(row => row.width + 48));
  const height = (id: string): number => Math.max(160, Math.min(1200, areaHeights[id] ?? preset.regionHeight), ...peripherals.map(row => row.height + 100));
  const start = preset.order.indexOf(preset.start), order = [...preset.order.slice(start), ...preset.order.slice(0, start)];
  const regionHeight = Math.max(...order.map(id => height(facetAreaId(presetId, "category", id))));
  const diagonal = Math.hypot(width, regionHeight), badge = attention.badge && nodeBadgeBounds({x: 0, y: 0, width: attention.width, height: attention.height}, attention.badge);
  const centerRadius = Math.max(Math.hypot(attention.width, attention.height) / 2,
    badge ? Math.hypot(Math.max(Math.abs(badge.x), Math.abs(badge.x + badge.width)), Math.max(Math.abs(badge.y), Math.abs(badge.y + badge.height))) : 0);
  const radius = Math.max((diagonal + preset.spacing) / (2 * Math.sin(Math.PI / order.length)), centerRadius + diagonal / 2 + preset.spacing);
  const positions = new Map<string, ViewRect>([[projection.entry, {x: 0, y: 0, width: attention.width, height: attention.height}]]);
  const areas: PlexArea[] = [], decorations: PlexDecoration[] = [], centers: {x: number; y: number}[] = [];
  for (let index = 0; index < order.length; index++) {
    const categoryId = order[index], id = facetAreaId(presetId, "category", categoryId), category = preset.categories[categoryId];
    const angle = -Math.PI / 2 + index * Math.PI * 2 / order.length, center = {x: Math.cos(angle) * radius, y: Math.sin(angle) * radius};centers.push(center);
    const region = {x: center.x - width / 2, y: center.y - height(id) / 2, width, height: height(id)}, label = facetCategoryLabel(category, categoryId);
    areas.push(pack(id, region, projection, measurements, positions, label, editable));
    decorations.push({id, kind: "region", bounds: region, labelKey: "key" in label ? label.key : "", ...("literal" in label ? {label: label.literal} : {}),
      areaId: id, count: true, ...(preset.tints ? {color: category.color} : {})});
  }
  if (preset.guides) for (let index = 0; index < centers.length; index++) {
    const a = centers[index], b = centers[(index + 1) % centers.length], distance = Math.hypot(b.x - a.x, b.y - a.y), inset = diagonal / 2;
    const dx = (b.x - a.x) / distance, dy = (b.y - a.y) / distance;
    decorations.push({id: `facets-guide-${index}`, kind: "guide", points: [{x: a.x + dx * inset, y: a.y + dy * inset}, {x: b.x - dx * inset, y: b.y - dy * inset}]});
  }
  let top = -110;
  for (const status of ["unassigned", "conflicting", "checking", "unresolved"] as const) {
    const id = facetAreaId(presetId, "status", status);
    if ((status === "checking" || status === "unresolved") && !projection.occurrences.some(row => row.areaId === id)) continue;
    const region = {x: radius + width / 2 + preset.spacing, y: top, width, height: Math.max(160, Math.min(220, height(id)))};
    const label = {key: status === "unresolved" ? "facets.cannotClassify" : `facets.${status}`};
    areas.push(pack(id, region, projection, measurements, positions, label, false));decorations.push({id, kind: "region", bounds: region, labelKey: label.key, areaId: id, count: true,
      ...(status === "unassigned" ? {color: preset.unassignedColor} : status === "conflicting" ? {color: preset.conflictingColor} : {})});top += region.height + 20;
  }
  if (positions.size !== measured.length) throw new Error("Invalid Facets membership geometry");
  return {positions, areas, decorations};
}
