/**
 * Presentational five-phase boxes, methodology connectors and local-distribution radar. Receives
 * composed scene geometry and localized labels; owns no metadata, graph queries or interactions.
 * Directed phase links describe the methodology, not note adjacency. Per-instance SVG markers
 * avoid collisions across simultaneous views; rectangle intersections keep arrows outside boxes.
 */
import { useId } from "react";
import type { PlexScene } from "./layout";

type PhaseGeometry = NonNullable<PlexScene["wuXing"]>;
type Vertex = PhaseGeometry["vertices"][number];
type Point = { x: number; y: number };

/** Return a frame center without assuming that its notes are vertically symmetric. */
function frameCenter(vertex: Vertex): Point {
  return { x: vertex.frame.left + vertex.frame.width / 2, y: vertex.frame.top + vertex.frame.height / 2 };
}

/** Intersect the center-to-target ray with the rectangle, leaving a small border gap. */
function framePort(vertex: Vertex, toward: Point): Point {
  const center = frameCenter(vertex);
  const dx = toward.x - center.x, dy = toward.y - center.y;
  const horizontal = Math.abs(dx) > 0.001 ? (vertex.frame.width / 2 + 5) / Math.abs(dx) : Infinity;
  const vertical = Math.abs(dy) > 0.001 ? (vertex.frame.height / 2 + 5) / Math.abs(dy) : Infinity;
  const scale = Math.min(horizontal, vertical);
  return Number.isFinite(scale) ? { x: center.x + dx * scale, y: center.y + dy * scale } : center;
}

/** Render phase boxes and continuous, high-contrast cycles with filled directional heads, without note edges. */
export function WuXingGuide({ geometry, phaseLabel, generateLabel, controlLabel, description }: {
  geometry: PhaseGeometry;
  phaseLabel: (phase: Vertex["phase"]) => string;
  generateLabel: string;
  controlLabel: string;
  description: string;
}) {
  const markerId = `kplex-wuxing-phase-arrow-${useId().replaceAll(":", "")}`;
  const vertices = geometry.vertices;
  const total = vertices.reduce((sum, vertex) => sum + vertex.count, 0);
  // A regular five-point star follows the same projected plane as the phase frames.
  // Notches are pentagram intersections: 1 / phi² divided by 2 cos(36°).
  const tips = vertices.map(vertex => {
    const share = total > 0 ? vertex.count / total : 0;
    const reach = 0.88 * Math.sqrt(share);
    return { x: vertex.x * reach, y: vertex.y * reach };
  });
  const notches = vertices.map((_, i) => {
    const currentVertex = vertices[i], nextVertex = vertices[(i + 1) % vertices.length];
    const share = total > 0 ? Math.min(currentVertex.count, nextVertex.count) / total : 0;
    // Keep a narrow base for an isolated arm so a single populated phase remains visible.
    const reach = 0.88 * Math.max(0.09, Math.sqrt(share));
    return { x: (currentVertex.x + nextVertex.x) * 0.236068 * reach,
      y: (currentVertex.y + nextVertex.y) * 0.236068 * reach };

  });
  const links = vertices.flatMap((source, i) => [1, 2].map(step => {
    const target = vertices[(i + step) % vertices.length];
    const from = frameCenter(source), to = frameCenter(target);
    const generating = step === 1;
    const route = source.controlRoute;
    const midpoint = route[Math.floor(route.length / 2)];
    const control = { x: 2 * midpoint.x - (from.x + to.x) / 2,
      y: 2 * midpoint.y - (from.y + to.y) / 2 };
    const a = framePort(source, generating ? to : control);
    const b = framePort(target, generating ? from : control);
    const outerPath = `M ${a.x} ${a.y} Q ${control.x} ${control.y} ${b.x} ${b.y}`;
    const labelPoint = generating
      ? { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
      : { x: (a.x + 2 * control.x + b.x) / 4, y: (a.y + 2 * control.y + b.y) / 4 };
    return { key: `${source.phase}:${target.phase}`, source: source.phase, target: target.phase, generating, labelPoint,
      label: generating ? generateLabel : controlLabel,
      labelWidth: Math.max(40, (generating ? generateLabel : controlLabel).length * 17 + 24),
      d: generating ? `M ${a.x} ${a.y} L ${b.x} ${b.y}` : outerPath };
  }));
  return <g className="kplex-wuxing-guide" role="img" aria-label={description}>
    <defs>
      {vertices.map((vertex, i) => {
        const share = total > 0 ? vertex.count / total : 0;
        return <linearGradient key={vertex.phase} id={`${markerId}-wash-${i}`} gradientUnits="userSpaceOnUse"
          x1="0" y1="0" x2={vertex.x} y2={vertex.y}>
          <stop offset="0" stopColor={vertex.color} stopOpacity="0.015" />
          <stop offset="0.45" stopColor={vertex.color} stopOpacity={0.025 + share * 0.12} />
          <stop offset="1" stopColor={vertex.color} stopOpacity={0.06 + Math.sqrt(share) * 0.32} />
        </linearGradient>;
      })}
      <marker id={markerId} viewBox="0 0 20 20" markerWidth="22" markerHeight="22" refX="18" refY="10" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M2,2 L18,10 L2,18 L6,10 Z" fill="context-stroke" />
      </marker>
    </defs>
    <g className="kplex-wuxing-star" aria-hidden="true">
      {vertices.map((vertex, i) => {
        const before = notches[(i + vertices.length - 1) % vertices.length], after = notches[i], tip = tips[i];
        return <polygon key={vertex.phase} className="kplex-wuxing-wedge"
          points={`0,0 ${before.x},${before.y} ${tip.x},${tip.y} ${after.x},${after.y}`}
          fill={`url(#${markerId}-wash-${i})`} opacity={vertex.count > 0 ? 1 : 0} />;
      })}
    </g>
    {links.map(link => <g key={link.key} data-source-phase={link.source} data-target-phase={link.target} className={`kplex-wuxing-phase-connection ${link.generating ? "is-generative" : "is-control"}`}>
      <path className="kplex-wuxing-phase-edge" d={link.d} fill="none" markerEnd={`url(#${markerId})`} vectorEffect="non-scaling-stroke" />
      <rect className="kplex-wuxing-phase-edge-label-background" x={link.labelPoint.x - link.labelWidth / 2} y={link.labelPoint.y - 22} width={link.labelWidth} height="40" rx="5" />
      <text className="kplex-wuxing-phase-edge-label" x={link.labelPoint.x} y={link.labelPoint.y + 8} textAnchor="middle">{link.label}</text>
    </g>)}
    {vertices.map((vertex, i) => <g key={`frame:${vertex.phase}`}>
      <rect className="kplex-wuxing-phase-frame" opacity={vertex.opacity} x={vertex.frame.left} y={vertex.frame.top} width={vertex.frame.width} height={vertex.frame.height} rx="16" fill={`url(#${markerId}-wash-${i})`} stroke={vertex.color} vectorEffect="non-scaling-stroke" />
      <text className="kplex-wuxing-phase-label" x={vertex.x} y={vertex.frame.top + 40 * vertex.scale} fontSize={36 * vertex.scale} textAnchor="middle">{phaseLabel(vertex.phase)}</text>
      <text className="kplex-wuxing-phase-count" x={vertex.frame.left + vertex.frame.width - 18} y={vertex.frame.top + 40 * vertex.scale} fontSize={28 * vertex.scale} textAnchor="end">{vertex.count}</text>
    </g>)}
  </g>;
}
