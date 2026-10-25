/** Internal scene-policy boundary. Definitions receive revision-scoped facts and measurements, never a host/index. */
import type {GraphNodeView, NodeId} from "../../graph/model";
import type {EvidenceDecision, RelationEvidence} from "../../graph/evidence";
import type {RelationshipExplanation} from "../../graph/resolver";
import type {LinkDirection, RelationType, Role} from "../../graph/relations";
import type {PlexViewConfiguration, PlexViewConfigurationSchema} from "./configuration";
import type {NotePropertyAvailability, NotePropertyRead} from "../noteProperties";

/** Policy API compatibility, independent of configuration and session payload schema versions. */
export const CANVAS_VIEW_API_VERSION = 1 as const;
/** Literal user/extension copy never passes through the host catalog lookup. */
export type CanvasViewText = Readonly<{literal: string} | {key: string}>;
export type PlexViewStateAction = Readonly<{id: string; args?: unknown}>;
export type PlexViewStateResult = Readonly<{status: "updated"; state: unknown}
  | {status: "unavailable"; reason?: CanvasViewText}>;

export type OccurrenceId = string;
export type AreaId = string;
export type PhysicalPort = "top" | "bottom" | "left" | "right";
export type ViewPoint = Readonly<{x: number; y: number}>;
export type ViewRect = ViewPoint & Readonly<{width: number; height: number}>;
export type ViewCoverage = "local" | "cached" | "unavailable";
/** Owning a frontier lease is distinct from prepared local incidence and certified complete incidence. */
export type PlexViewScopeRead = Readonly<{coverage: ViewCoverage; prepared: boolean; complete: boolean; pending: boolean}>;
export type PlexBranch = Readonly<{parent?: OccurrenceId; depth: number; side: -1 | 1; expanded: boolean;
  canExpand: boolean; reference: boolean; status: "ready" | "loading" | "partial" | "unavailable" | "limited"}>;
export type PlexBranchAction = Readonly<{kind: "toggle"; occurrenceId: OccurrenceId} | {kind: "expand-generation" | "collapse-generation"}>;
export type PlexViewRelation = Readonly<{
  node: GraphNodeView; role: Role; relationType: RelationType; definition?: string; direction: LinkDirection | null;
}>;
export type PlexRelationRead = Readonly<{items: readonly PlexViewRelation[]; coverage: ViewCoverage; truncated: boolean}>;
export type PlexEvidenceRead = Readonly<{coverage: ViewCoverage; value: Readonly<{
  source: NodeId; target: NodeId; hidden: boolean; summary: RelationshipExplanation["summary"];
  roles: readonly Readonly<RelationshipExplanation["resolvedRoles"][number]>[];
  decisions: readonly Readonly<{evidence: Readonly<RelationEvidence>; active: boolean; suppressionReason?: EvidenceDecision["suppressionReason"]}>[];
}> | null}>;
export type PlexViewRead = Readonly<{
  /** Current local incidence is independent of corpus/property completeness. Reads never acquire sources. */
  coverage: ViewCoverage; isCurrent: () => boolean;
  node: (id: NodeId) => GraphNodeView | null;
  relations: (id: NodeId, role: Role, maximum?: number) => PlexRelationRead;
  /** Exact cached pair, used to retain a live occurrence path outside a truncated display prefix. Never acquires sources. */
  relation?: (source: NodeId, target: NodeId, role: Role) => PlexRelationRead;
  /** Optional cache-only per-node proof. Absence cannot certify a leaf or start preparation. */
  scope?: (id: NodeId) => PlexViewScopeRead;
  evidence: (source: NodeId, target: NodeId) => PlexEvidenceRead;
  compare: (left: GraphNodeView, right: GraphNodeView) => number;
  /** Optional admitted-node metadata capability; no enumeration, body reads or acquisition. */
  properties?: Readonly<{availability: (id: NodeId) => NotePropertyAvailability; read: (id: NodeId, field: string) => NotePropertyRead}>;
  /** Unsupported corpus reads stay unavailable; an empty catalogue must never certify unlinked notes. */
  corpus: {available: false; reason: "unsupported"};
}>;
export type PlexOccurrence = Readonly<{
  id: OccurrenceId; areaId?: AreaId;
  /** Point rendering is reserved; the current host rejects it explicitly rather than rendering a detailed card. */
  representation: "thought" | "point";
  /** Optional semantic context for existing styles/lenses. It does not determine physical placement. */
  role?: Role; relation?: PlexViewRelation;
  groupingPartition?: string;
  /** Explicit occurrence hierarchy; canonical child semantics remain in real edge references. */
  branch?: PlexBranch;
  ports?: Partial<Record<PhysicalPort, "parent" | "child" | "left" | "right">>;
  /** Bounded available peer incidence shares one physical port; its lower-bound count never grants relation-edit authority. */
  peerPort?: Readonly<{side: PhysicalPort; count: number; complete: boolean}>;
} & ({nodeId: NodeId; synthetic?: never} | {nodeId?: never; synthetic: {kind: "group"; members: readonly OccurrenceId[]}})>;
export type PlexViewEdge = Readonly<{
  id: string; source: OccurrenceId; target: OccurrenceId; sourcePort: PhysicalPort; targetPort: PhysicalPort;
} & ({kind: "semantic"; sourceNode: NodeId; targetNode: NodeId; relation: PlexViewRelation}
  | {kind: "derived" | "decorative"; evidence?: readonly {sourceNode: NodeId; targetNode: NodeId; relation: PlexViewRelation}[]})>;
export type PlexProjection = Readonly<{
  attention: NodeId; layoutRoot?: NodeId; root?: OccurrenceId; entry: OccurrenceId; editor?: OccurrenceId; frame?: OccurrenceId;
  occurrences: readonly PlexOccurrence[]; edges: readonly PlexViewEdge[]; truncated: boolean; coverage: ViewCoverage;
  /** Undefined inherits normal host presentation; null or an empty literal explicitly hides it. */
  heading?: CanvasViewText | null;
  /** Only an opt-in hierarchy may request bounded, actually represented parent scopes outside projection/layout. */
  preparation?: Readonly<{parents: readonly NodeId[]}>;
  /** Bounded plain session intent (e.g. stable branch sides); the existing session validates and commits it. */
  stateSuggestion?: unknown;
}>;
export type PlexMeasurement = Readonly<{
  id: OccurrenceId; width: number; height: number; expandedWidth: number; expandedReserve: number;
  /** Only this occurrence has a bound expanded editor; the legacy layout boolean does not describe it. */
  editor?: true;
  mini: {width: number; viewportHeight: number; topGap: number} | null;
  envelope: {width: number; viewportHeight: number; topGap: number} | null;
}>;
export type PlexArea = Readonly<{
  id: AreaId; labelKey: string; bounds: ViewRect; resizeEdge?: "top" | "bottom";
  /** User labels are literal vault configuration, never translated as catalog keys. */
  label?: string;
  heightPreference?: {key: string; minimum: number; maximum: number};
  viewport?: ViewRect & {contentTop: number; contentHeight: number; initialScrollTop: number};
  /** Physical area action is explicit; arbitrary areas have no relationship-write meaning by default. */
  dropRole?: "parent" | "child" | "left" | "right";
  /** Exact admitted canonical origin; omission means projection root/entry. Area placement is never relationship provenance. */
  dropOrigin?: OccurrenceId;
  reflow?: Readonly<{columns: number; columnGap: number; rowGap: number; paddingTop?: number; paddingBottom?: number}>;
}>;
/** Pure presentation marks have no semantic endpoints or interaction/write authority. */
export type PlexDecoration = Readonly<{id: string} & (
  {kind: "region"; bounds: ViewRect; labelKey: string; label?: string; areaId?: AreaId; tint?: "water" | "wood" | "fire" | "earth" | "metal"; count?: boolean}
  | {kind: "guide"; points: readonly ViewPoint[]}
)>;
export type PlexViewLayout = Readonly<{
  positions: ReadonlyMap<OccurrenceId, ViewRect>; areas: readonly PlexArea[];
  decorations?: readonly PlexDecoration[];
}>;
export type PlexViewInput = Readonly<{
  attention: NodeId; read: PlexViewRead; maximum: number; state: unknown;
  /** Present only for an opt-in rooted native session; attention remains an independent navigation target. */
  layoutRoot?: NodeId;
  /** Plain current resource ownership, not coverage. Existing frontier slots take priority over newly arriving branches. */
  retainedScopes?: readonly NodeId[];
  /** Only plain occurrence/canonical identities; native tokens/buffers and dimensions remain with their existing owners. */
  editors?: readonly Readonly<{occurrenceId: OccurrenceId; nodeId: NodeId}>[];
  /** Type-wide configuration is separate from native-session state. */
  configuration?: PlexViewConfiguration;
}>;
export interface PlexViewDefinition {
  readonly id: string;
  readonly version: typeof CANVAS_VIEW_API_VERSION;
  readonly labelKey: string;
  readonly icon: string;
  readonly capabilities: Readonly<{sections?: boolean; descendants?: boolean; editor?: boolean; compact?: boolean; properties?: boolean}>;
  readonly defaultState: unknown;
  /** Omit for the existing attention-following host. Occurrence hosting requires explicit shared bindings. */
  readonly editorHosting?: "occurrence";
  /** Omit for attention-scoped geometry and navigation compatibility. */
  readonly navigation?: "rooted";
  /** Explicit selector entry may start at this canvas's current attention; workspace restoration still retains its saved root. */
  readonly navigationEntry?: "attention";
  /** Optional bounded branch-frontier policy, independent of attention-following definitions and native editor creation. */
  readonly hierarchy?: Readonly<{maximumScopes: number; primary: "activate" | "activate-editor" | "expand"; relations?: "child-and-peer";
    /** Return a small replacement view state, or null when the requested displayed branch is unavailable. */
    reduce: (state: unknown, projection: PlexProjection, action: PlexBranchAction) => unknown}>;
  readonly configuration?: PlexViewConfigurationSchema;
  /** Optional pure presentation-state actions. The session still validates/persists bounded state
   * and protects native editors; this reducer receives no host or file mutation capability. */
  readonly reduceState?: (state: unknown, action: PlexViewStateAction, configuration: PlexViewConfiguration) => PlexViewStateResult;
  /** Validate only this view's small session state; shared/native settings are not supplied. */
  restoreState(value: unknown): unknown;
  /** Material preparation is host-owned and bounded; pure projection consumes admitted facts only. */
  project(input: PlexViewInput): PlexProjection | null;
  /** Layout has no source reader, scheduling or subscription capability. */
  layout(projection: PlexProjection, measurements: readonly PlexMeasurement[], preferences: unknown, editor: boolean,
    context?: Readonly<{areaHeights: Readonly<Record<string, number>>; configuration?: PlexViewConfiguration}>): PlexViewLayout;
}
