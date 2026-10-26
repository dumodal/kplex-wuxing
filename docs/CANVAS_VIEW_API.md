# Canvas-view API reference

PR #220 implements this internal API through `ae2801b`. See the [developer guide](CANVAS_VIEW_DEVELOPER_GUIDE.md), [Facets specification](FACETS_VIEW.md), [end-user guide](FACETS.md) and [validation record](validation/facets-220-2026-10-25.md). Final expanded native/CI acceptance is recorded separately; implementation does not imply those checks passed.

## Public entries and ownership

- Pure policy: `src/core/plex/views/index.ts`.
- Host/UI composition: `src/ui/plexViews/api.ts`.
- Executable ordinary example: `src/core/plex/views/example.ts` and `src/ui/plexViews/example.ts`.
- Executable section conformance: `tests/support/sectionViewProbe.ts`; absent from production registration and compiled under `tsconfig.core.json`.

`CANVAS_VIEW_API_VERSION` is **1**. Definition compatibility, configuration schema versions and workspace/session payload versions are independent. Registration closes when `PlexViewRegistry` and `CanvasViewSettingsRegistry` are constructed. IDs match `[a-z][a-z0-9.-]{0,79}`; duplicates/incompatible definitions fail. Unknown selected IDs retain their settings/state while rendering the available fallback. This is a trusted internal boundary, not a security sandbox, downloadable loader or marketplace.

| Owner | Responsibility |
| --- | --- |
| `PlexViewDefinition` | Bounded pure projection, measured layout, capability/schema declarations and optional pure state reduction. |
| `PlexViewSession` | One canvas's selected ID/state/root, workspace restoration, transient resources, guarded selection and camera intent. |
| Existing settings queue | Disk-before-publication type configuration, incoming synchronization, stale-owner checks and failures. |
| `PlexGraph` / shared components | Nodes, gates, links, areas, Find, selection, navigation, drag transport, actions, editor/Sidecar and cleanup. |
| Existing graph/property/source owners | Canonical evidence, cached field availability, source preparation and ordinary incremental note indexing. |

A view does not receive App, a plugin/index instance, file-writing access or a private renderer. It does not persist state/configuration itself.

## Definition and scene

Required definition members: `id`, `version`, `labelKey`, `icon`, `capabilities`, `defaultState`, `restoreState`, `project`, `layout`. Optional members are declared in `contracts.ts`: `configuration`, `reduceState`, `navigation`, `navigationEntry`, `editorHosting`, `hierarchy`, `colorReferences`, `propertyAssignments`, `propertyDependencies`, `badgeBudget`, `areaPreferenceBudget`.

`project(PlexViewInput)` receives attention, optional layout root/retained hierarchy scopes/editor identities, its own configuration/state and `PlexViewRead`. It returns a `PlexProjection` or null. `layout` receives the admitted projection, actual `PlexMeasurement[]`, state/editor information and context containing area heights/configuration. Layout has no source reader or scheduling port.

| Payload | Meaning |
| --- | --- |
| `PlexOccurrence` | Stable displayed identity plus canonical `nodeId`, shared thought representation, optional role/relation, physical ports, area/group partition, badge/description, hierarchy or typed section reference. |
| `PlexViewEdge` | Exact displayed source/target occurrence and physical ports. Semantic edges additionally retain canonical note IDs and the original admitted relation. Derived/decorative edges have no relationship-edit authority. |
| `PlexProjection` | Attention and entry/root/editor/frame anchors, occurrences/edges, coverage/truncation, optional heading/status and bounded hierarchy intent. |
| `PlexMeasurement` | Shared measured width/height and optional editor/badge/envelope information keyed by occurrence. |
| `PlexViewLayout` | One position for each admitted occurrence, explicit areas and optional decorations. |

Node position `x/y` is its **center** in world coordinates. Area/decoration bounds use top-left `x/y`. Never substitute viewport center for an off-origin frame/editor occurrence. Physical port placement is separate from a semantic role.

The adapter validates identities, canonical endpoints, finite geometry, bounds and capabilities. Invalid/unavailable scenes fall back to the actual attention/editor host; stale graph payloads do not gain action authority. One scene admits at most 2,048 occurrences; areas/decorations are each capped at 64. Specialized definitions apply tighter bounds.

`badgeBudget` optionally admits 1–2,048 badges within that unchanged occurrence cap; omitted definitions retain 16. `areaPreferenceBudget` optionally retains up to 192 workspace size keys per dimension across presets; omitted definitions retain 64. Facets opts into 192 for 16 presets with at most seven category, four separate diagnostic and one combined diagnostic identities. Width and height remain independent maps in the existing canvas session; no setting, graph or source read is implied.

Areas may declare independent `heightPreference`/`resizeEdge` and `widthPreference`/`widthResizeEdge`. A dimension's optional `value` describes its editable thickness when the outer frame is larger. `measuredAreaColumns` and `measuredAreaGrid` use actual per-area node/badge envelopes and world-space dimensions; camera zoom does not change columns.

`decorationLabels(state, configuration)` optionally declares at most 32 unique bounded labels (IDs up to 128 characters, literal copy up to 80). The host measures them with the shared font/label pipeline and supplies `context.decorationMeasurements` to pure layout. It neither reads notes nor mounts another renderer. A guide may declare forward/backward/both arrow direction, line/none stroke and a caption with measured bounds/font size. Legacy `directed` guides retain their end arrow. Captions are literal/keyed text, never HTML; guides remain input-transparent with no semantic endpoints or action authority. Manual fit includes visible guide points and caption extents, while retaining the existing framing occurrence and camera guards.

An optional `shape: {kind: "rounded-band", inner, radius}` excludes one strictly enclosed rounded hole from the outer `bounds`. The shared `areaContains`/`areaShapePath` geometry owns physical hits, counts and painting. Regions, resize frames and drop highlights retain the same hole; generic paint components receive path data from the host, with no canvas-domain dependency. Omitted shapes keep the established inclusive rectangle. Scrolling content uses the area's independent viewport; the unused band has only the explicitly declared area meaning and never derives relationship authority from an outline.

`CanvasViewText` is `{literal: string}` or `{key: string}`. Literal user/vault labels never become catalog keys. Catalog keys used here have no required parameters. A heading omitted inherits host presentation; null/empty literal hides it.

## Production capabilities

Omitted optional capabilities are unavailable.

| Capability | Compass (`classic`) | Mind Map (`mindmap`) | Facets (`wuxing`) |
| --- | --- | --- | --- |
| Navigation | Attention-following | Rooted; explicit destinations reroot | Attention-following |
| Native editor | Existing attention-following | Accepted capacity-one occurrence host | Existing attention-following |
| Sections | Existing production owner | Disabled | Disabled for every preset |
| Descendant presentation | Existing Compass expansion | Bounded hierarchy capability | Disabled |
| Cached-property classification / badges | Not declared | Not declared | Enabled |
| Compact point rendering | Disabled | Disabled | Disabled |
| Areas | Existing quadrants | Rooted measured areas/parents | Measured category/diagnostic regions |

Mind Map's hierarchy does not imply the legacy `descendants` flag. Corpus reads/scoring, arbitrary graph scans, multiple editors and independent Facets occurrence bindings are unavailable. The section conformance fixture proves an optional boundary, not a shipped Mind Map section mode.

## Bounded reads and availability

`PlexViewRead` exports current/coverage checks, admitted-node lookup, bounded direct `relations`, optional exact cached `relation`/`scope`, pair `evidence`, comparison and optional `properties`. Corpus reports unavailable; an empty list never proves a whole-vault negative.

The host `plexViewRead` retains its established signature: numeric hierarchy-occurrence budget is argument **five** (default 0); the cached-property provider is argument **six**. Semantic operations cap at 16,384. Default property operations cap at `min(2048, maximum * 8 + 1)` and address admitted nodes only. A valid optional `viewDependencies` descriptor on that same sixth provider may enlarge the existing frame for up to 16 declared fields/evidence needs, still capped at 16,384. No declaration reads or acquires anything.

`NotePropertyRead` distinguishes available (including a proven absent value), unavailable metadata and unsupported input. Its optional `isCurrent` function retains the existing owner's exact native file/stat/cache proof for a synchronous evaluation frame; never serialize or retain it beyond that frame.

`GraphPredicateEngine.matches` keeps legacy behavior. `evaluateAvailable` opts into three-valued evaluation with the same parser/operators. Negation preserves unknown input; known true OR unknown and false AND unknown remain provable. `evaluatePortablePredicateContexts` supplies shared explicit any-match semantics across canonical contexts.

- `note.phase` reads the candidate's Markdown field.
- In availability-aware evaluation, non-reserved `this.phase` explicitly reads the focused note's field.
- Fixed `this` attributes (`path`, `name`, `aliases`, `tags`, `noteType`, `url`, `isFolder`, `isTag`, `mtime`) retain precedence. The legacy boolean resolver does not acquire arbitrary `this` fields.
- `==` preserves strict case/type equality; text `.equals()` is case-insensitive. `tryParseLosslessGraphLensSimpleExpression` refuses a mode switch that would change this meaning.
- Relationship-dependent contexts are real admitted relationships; no focus self-edge is fabricated. Evidence retains `active` and suppression provenance. Inactive evidence never becomes active.

Facets caches only bounded compiled syntax by consumed rule revision (16 plans, 16 fields, 2,048 characters/category). Its requested-field/value/pair reuse is transient per projection. Evidence is capped at 256 decisions/pair and 4,096/scene; excess/unreliable evaluation stays unresolved. Configuration/layout does not parse bodies or rebuild semantics; actual note edits retain normal incremental indexing.

## Type configuration and canvas state

`canvasViewSettings[viewId]` is durable type configuration. Selected view/preset, root, folds and bounded workspace intent belong to the canvas session. Hover/native objects/gestures remain transient. Lens definitions, filters and unsaved lens drafts keep their existing owners across view switching.

| Pure export | Effect |
| --- | --- |
| `readViewConfiguration`, `readViewConfigurationAt` | Effective values / one addressed leaf with explicit presence; no persistence or default materialization. |
| `migrateViewConfiguration` | Synchronous detached, bounded, increasing version steps; original payload preserved on failure. |
| `editViewConfiguration`, `editViewConfigurationAt` | Immutable scalar or addressed set/remove; optional expected leaf protects stale values. |
| `resetViewConfiguration` | Explicit owned defaults/leaf reset; unrelated and unknown values remain. Future/failed schemas refuse downgrade. |
| `removeViewConfiguration` | Explicit namespace removal; never an automatic missing-extension cleanup. |

`PlexViewConfigurationSchema.fields` declares defaults/validators; `entries: true` gives stable keyed entries independent remote ownership. `inheritEntries: true` inherits missing default entries without materializing the whole dictionary. Edits seed only the addressed entry. Existing entry members do not individually inherit; arrays/entries remain atomic. Limits include 32 views, 64 fields, depth 8, 4,096 JSON nodes, 16,384 encoded characters, 8 migration steps and 6 address segments.

Host updates rebase through the existing queue and incoming owner epochs. The optional current guard is checked before acceptance; a durable save is not falsely cancelled afterward. Routine visibility/lens changes produce no generic settings-changed notice. Save failures/conflicts remain actionable.

## Captured UI contributions

`CanvasViewSettingsContribution` composes native `items`, optional `manager`, `choices`, `menus`, `layoutControls` and `help(context, target)`. `CanvasViewContributionContext` contains the captured view ID/state and own configuration. Commands are finite descriptors: `state`, `configuration`, `settings` or `help`. Help choices carry a captured target; the controller rechecks definition/configuration/session/revision and the currently selected target before handing bounded Markdown to the optional native Help port. Existing consumers may omit it.

`CanvasViewContributionController` captures the opening session/definition/configuration/lifetime and rechecks received owners. Moving focus to another canvas does not redirect the selector, controls or a pending action. Stale/retired/one-shot commands return unavailable, not a write to another canvas.

The shared view selector exposes a settings cog. A choice may contribute an optional `settings: {kind: "settings", target?: string}` command; the bounded stable target is forwarded to the existing native manager factory as its optional third argument. Facets uses its selected preset ID to open the existing detached editor. Repeated clicks capture fresh commands for the same current choice; they never reuse a consumed command or follow global focus. These links reuse native Settings navigation and the existing queued writer, and opening/cancelling creates no configuration write.

Menus allow 64 total items, 32 siblings and depth 3. Choices allow 8 groups with 32 options each. Live rails allow 16 validated sliders/checkboxes. Configuration rails address the same schema/queued writer as native Settings. An optional checkbox `state: {value, actionId}` instead dispatches its boolean through the captured contribution controller and existing session reducer; this is an explicit per-canvas preference such as Combine diagnostics. Its declared schema address still identifies the relevant preset/default. Do not add view-ID dropdown options or a separate settings path.

Native manager factories receive App only on the host side and a narrow `CanvasViewManagerContext`: own configuration/address reads, captured ownership, guarded save, presentation subscription, existing color/modal context, bounded cached suggestions and close. Shared `StyleEditorModal`, `StyleManagerList`, `StyleColorControls`, `PredicateConditions` and `PredicateRuleEditor` preserve their existing focus/cleanup owners.

The optional manager `sharing` context grants read-only finite preset/lens/palette data and a reviewed package commit through the existing settings queue. It exposes no plugin, vault, index, session selection or note writer. `PortablePackageModal` composes canonical package validation/import planning, shared ClipboardSession and NativeMarkdownHelp. `updateStyleSettings` can atomically include one registered-view leaf with palette/disabled-lens dependencies; it retains disk-before-publication, scoped expected values, theme/retirement fences and the existing palette-reference validation. Invalid/future packages and failed/stale writes are refused without partial publication. Details and schema: [Portable presets](PORTABLE_PRESETS.md).

## Targets, assignments and decorations

`PlexArea.dropTarget` is explicitly navigation, relationship (canonical role and optional admitted origin), property (declared assignment ID) or none. Legacy `dropRole` delegates to shared relationship meaning. Geometry/area color never grants write authority. Existing native drag payloads, exact source occurrence/current proof, additive-only safeguards and relationship writer remain the owners. Native editor text drops yield to the editor in every view.

Optional definition `propertyAssignments` returns bounded `PlexPropertyAssignment` descriptors. Facets property presets expose only safe exclusive canonical values and clear-recognized targets. Tag/type/rule classification stays read-only. `node.assign-category`, body/area drops and `view.property-assignment.undo` use the same native confirmation/effect. Lists retain unrelated values/order; reserved/configured semantic fields, stale coordinates and dirty native buffers are protected. One transient applied-value-checked field receipt per canvas enables Undo. Classification alone never connects notes; Connect without assigning delegates to the existing additive composer.

`PlexNodeBadge` uses shared measurement/color contrast and remains attached to its occurrence through editor resizing. `colorReferences` joins the existing owning-document ColorScope/palette owner. `PlexDecoration` regions optionally supply a description/color; guides optionally declare direction and generating/regulating variant. Decorations have no note endpoints, hit targets or actions. Wu Xing's relative roles/guides are read-only model explanations, separate from canonical evidence.

## Section boundary

Only an explicitly expanded single document supplies `PlexSectionRead`. `createPlexSectionViewContext` adapts the existing `SectionExpansion` hierarchy, ranges, projected provenance and captured native source revision. Bounds: 256 rows, 4,096 provenance entries and 8,192 inspected projected relationships. Missing/retired/oversized source data stays unavailable. Ordinary layout/paint cannot invoke a body parser.

A view can emit `PlexOccurrence.section` referring to a source-owned `PlexSectionRef {documentId, revision, sectionId}`. The shared adapter binds its transient source row and measures/renders the ordinary ThoughtNode. Such rows cannot bind editors or become semantic note endpoints. `sourceSection` on a canonical edge is an optional physical attachment only, validated against current target/role provenance. Initial support is outgoing root-source attachment on either physical side; target/reverse attachment is unsupported.

`plexSectionAnchor` maps genuine declarations to the lowest common visible ancestor. Preamble/multiple roots/missing provenance use the aggregate root/header. `visiblePlexSection` resolves folds, while wrong document/revision/removed row references fail. Geometry/clipping may use `sourceSectionOccurrence`; canonical `sourceOccurrence`, note paths and relationship evidence stay intact. Shared tree drawing/fold actions are reused. Native editor presence declines section replacement without changing the editor document/save lifecycle.

## Validation and limits

See the [ordered validation record](validation/facets-220-2026-10-25.md) for exact commits, passing checks, earlier failures and pending final native/CI acceptance. Preserve the documented #215 baseline failures. Browser input is not physical mobile, macOS or minimum-host acceptance. No merge, release, remote loader or personal-vault deployment is part of this API delivery.
