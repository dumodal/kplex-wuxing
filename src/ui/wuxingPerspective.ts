/**
 * Pure lightweight perspective for the fixed Wu Xing plane. Counts choose a bounded default tilt;
 * explicit angles are offsets from that default. No WebGL, scene engine, host APIs or persistence.
 * Phase cards remain upright billboards while their centers, sizes and visibility express depth.
 */
export type PhaseProjection = { x: number; y: number; depth: number; scale: number };

/** Clamp malformed persisted/manual values and keep the plane comfortably away from edge-on. */
const bounded = (value: number, limit: number): number => Number.isFinite(value) ? Math.max(-limit, Math.min(limit, value)) : 0;

/** Create one immutable camera policy for a finite five-phase scene; balanced counts have no bias. */
export function createWuXingProjection(counts: readonly number[], yawOffset: number, pitchOffset: number, radius: number) {
  const total = counts.reduce((sum, value) => sum + Math.max(0, value), 0);
  let directionX = 0, directionY = 0;
  counts.forEach((value, i) => {
    const angle = -Math.PI / 2 + i * Math.PI * 2 / 5;
    const weight = total > 0 ? Math.max(0, value) / total : 0;
    directionX += Math.cos(angle) * weight;
    directionY += Math.sin(angle) * weight;
  });
  const yaw = bounded(-directionX * 14 + bounded(yawOffset, 25), 30) * Math.PI / 180;
  const pitch = bounded(directionY * 14 + bounded(pitchOffset, 25), 30) * Math.PI / 180;
  const distance = Math.max(1, radius) * 2.8;
  /** Rotate the fixed plane, then apply perspective; front-facing text itself stays upright. */
  const project = (x: number, y: number): PhaseProjection => {
    const tiltedY = y * Math.cos(pitch), tiltedZ = y * Math.sin(pitch);
    const rotatedX = x * Math.cos(yaw) + tiltedZ * Math.sin(yaw);
    const depth = -x * Math.sin(yaw) + tiltedZ * Math.cos(yaw);
    const scale = distance / (distance - depth);
    return { x: rotatedX * scale, y: tiltedY * scale, depth, scale };
  };
  const depths = Array.from({ length: 5 }, (_, i) => {
    const angle = -Math.PI / 2 + i * Math.PI * 2 / 5;
    return project(Math.cos(angle) * radius, Math.sin(angle) * radius).depth;
  });
  const near = Math.max(...depths), far = Math.min(...depths);
  const strength = Math.min(1, Math.hypot(yaw, pitch) / (14 * Math.PI / 180));
  /** Fade rear groups smoothly without making empty-but-important phase regions disappear. */
  const opacity = (depth: number): number => near - far < 0.001 ? 1
    : 1 - strength * 0.55 * (near - depth) / (near - far);
  return { project, opacity, yaw, pitch };
}
