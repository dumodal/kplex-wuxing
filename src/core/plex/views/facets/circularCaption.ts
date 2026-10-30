/** Measured circular-guide text follows a local path tangent with an upright baseline. Its
 * rotated axis-aligned footprint participates in fit/docking; no host or semantic data is read. */
import type {PlexDecoration, PlexDecorationTextSize, ViewPoint} from "../contracts";

type Caption = NonNullable<Extract<PlexDecoration, {kind: "guide"}>["caption"]>;

/** Sample the actual polyline by arc length, keep text outside the ring and flip upside-down
 * tangents. Bounding geometry includes every rotated corner, even on left-facing edges. */
export function circularGuideCaption(label: string, measured: PlexDecorationTextSize, points: readonly ViewPoint[],
  position: "start" | "middle" | "end" = "middle"): Caption {
  const lengths = points.slice(1).map(/** Zero-length samples are harmless and never divide by zero. */ (point, index) => Math.hypot(point.x - points[index].x, point.y - points[index].y));
  const total = lengths.reduce(/** Accumulate only bounded pure geometry. */ (sum, length) => sum + length, 0);
  let distance = total * (position === "start" ? .3 : position === "end" ? .7 : .5), index = 0;
  while (index < lengths.length - 1 && distance > lengths[index]) distance -= lengths[index++];
  const a = points[index], b = points[index + 1], length = Math.max(.001, lengths[index]);
  const dx = (b.x - a.x) / length, dy = (b.y - a.y) / length;
  const center = {x: a.x + dx * distance, y: a.y + dy * distance};
  const width = measured.width, height = measured.height, sign = (-dy * center.x + dx * center.y) >= 0 ? 1 : -1;
  center.x += -dy * sign * (height / 2 + 12);center.y += dx * sign * (height / 2 + 12);
  let angle = Math.atan2(dy, dx) * 180 / Math.PI;
  if (angle > 90) angle -= 180;if (angle < -90) angle += 180;
  const radians = angle * Math.PI / 180, boundsWidth = Math.abs(Math.cos(radians)) * width + Math.abs(Math.sin(radians)) * height;
  const boundsHeight = Math.abs(Math.sin(radians)) * width + Math.abs(Math.cos(radians)) * height;
  return {label: {literal: label}, fontSize: measured.fontSize,
    bounds: {x: center.x - boundsWidth / 2, y: center.y - boundsHeight / 2, width: boundsWidth, height: boundsHeight},
    rotation: {angle, center, width, height}};
}
