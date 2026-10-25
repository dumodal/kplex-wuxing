/**
 * Pure viewport fitting for a caller-owned focal point and finite displayed rectangles. Symmetric
 * extents keep the focus centered even when content is asymmetric. No DOM, graph, timers or host
 * state is acquired; callers own camera application and automatic/manual interaction lifetimes.
 */
export type FitCamera = Readonly<{ x: number; y: number; scale: number }>;
export type FitBounds = Readonly<{ left: number; top: number; right: number; bottom: number }>;

/** Fit all supplied bounds around the focus, retaining the scale ceiling and viewport padding. */
export function centeredViewportFit(width: number, height: number, focus: { x: number; y: number },
  bounds: FitBounds, maxScale: number, padding = 46): FitCamera {
  const extentX = Math.max(1, Math.abs(bounds.left - focus.x), Math.abs(bounds.right - focus.x));
  const extentY = Math.max(1, Math.abs(bounds.top - focus.y), Math.abs(bounds.bottom - focus.y));
  // A fitted camera may go below the manual wheel minimum, so a large editor/scene still fits.
  const scale = Math.min(maxScale, Math.max(1, width - padding * 2) / (extentX * 2),
    Math.max(1, height - padding * 2) / (extentY * 2));
  return { x: width / 2 - focus.x * scale, y: height / 2 - focus.y * scale, scale };
}

/** Compare only camera intent, excluding geometry that may change during native layout. */
export function sameFitCamera(a: FitCamera, b: FitCamera): boolean {
  return a.x === b.x && a.y === b.y && a.scale === b.scale;
}


/** Include empty phase frames and complete outer control routes in the overview camera. */
export function wuXingScaffoldBounds(vertices: readonly {
  frame: { left: number; top: number; width: number; height: number };
  controlRoute?: readonly { x: number; y: number }[];
}[]): FitBounds | null {
  if (!vertices.length) return null;
  let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;
  /** Expand finite world-space geometry with room for frame headings and relation labels. */
  const include = (x: number, y: number, padding: number): void => {
    left = Math.min(left, x - padding); top = Math.min(top, y - padding);
    right = Math.max(right, x + padding); bottom = Math.max(bottom, y + padding);
  };
  for (const vertex of vertices) {
    include(vertex.frame.left, vertex.frame.top, 48);
    include(vertex.frame.left + vertex.frame.width, vertex.frame.top + vertex.frame.height, 48);
    for (const point of vertex.controlRoute ?? []) include(point.x, point.y, 28);
  }
  return { left, top, right, bottom };
}
