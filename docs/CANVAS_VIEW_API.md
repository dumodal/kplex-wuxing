# Canvas-view API reference

This reference is being completed during PR220. Configuration, captured UI contributions and the executable columns example are implemented. Shared badges, assignment targets and section anchors remain in progress. Historical standalone view tests do not certify the expanded Facets feature.

## Ownership and versions

Pure policy lives under `src/core/plex/views/`. The native session owns selection/root/editor intent; the existing plugin settings writer owns durable type configuration. A view receives neither the plugin nor `data.json` access. These are architectural contracts, not a JavaScript security sandbox.

The current definition compatibility boundary is `PlexViewDefinition.version: 1`. It is distinct from `PlexViewConfigurationSchema.version` and the native/session payload versions. A configuration schema may advance without changing the view API or a canvas's selected view. Built-in IDs remain `classic`, `mindmap`, `wuxing`; extension IDs should use an owner-qualified convention such as `org.example.columns`, within the registry's 80-character lowercase identity syntax. Duplicate/incompatible registration fails.

## View configuration

The implemented exports are in `src/core/plex/views/configuration.ts`; their plain types originate in `configurationContracts.ts`.

| Export | Behavior |
| --- | --- |
| `PlexViewConfigurationSchema` | Positive version, known field defaults/validators and optional bounded increasing migrations. |
| `PlexViewConfigurationMigration` | `from`, `to`, synchronous `migrate(values)` on detached JSON. Original data remains intact on failure. |
| `readViewConfiguration` | Pure effective values. Defaults and successful read-time upgrades do not write or materialize a namespace. |
| `readViewConfigurationAt` | One known field/address leaf, with explicit `present`; no foreign settings exposure. |
| `migrateViewConfiguration` | Returns unchanged/migrated namespace map or unavailable with the original payload. Does not persist. |
| `editViewConfiguration` | Backward-compatible scalar-field update. |
| `editViewConfigurationAt` | Immutable set/remove at a bounded field/path address against the latest accepted map. Optional expected leaf rejects stale values. |
| `resetViewConfiguration` | Explicit known field/leaf defaults or this view's known defaults. Preserves other views and unknown fields. Future/failed payloads refuse a downgrade. |
| `removeViewConfiguration` | Separate explicit namespace removal; never used automatically for missing/disabled extensions. Host UI must state/confirm that scope. |
| `viewConfigurationUpdateDomain` | Chooses a scalar field or declared stable-entry remote owner. |
| `viewConfigurationOwnerDomains` / `viewConfigurationChangedDomains` | Precise owner/aggregate epochs: container drafts retire on child changes without retiring unrelated entry drafts. |

`ViewConfigurationAddress` contains `field` and optional `path`. Stable object keys are preferable to array indices. Paths have at most six components and reject prototype keys and invalid array offsets. A set requires a JSON value; remove is an explicit operation. Missing intermediate objects are not invented. The complete resulting field and namespace must validate before a write.

Existing bounds remain: 32 view namespaces, 64 fields per namespace, 16,384 encoded UTF-16 characters per namespace/value, JSON depth eight and 4,096 traversal nodes. At most eight migration steps execute. Oversized/unsupported data remains inert; operations reject rather than truncate it or remove limits.

Each field may optionally declare `entries: true` for a stable-key object collection. Each entry remains an **atomic coherent value**. Different presets may rebase independently; a remote change to the same preset retires its old draft. Arrays and every other existing settings root remain atomic. This is not a general recursive merge. Local queued leaf operations still rebase on the newest map, preserving unrelated local fields.

Resetting an entry collection restores its declared default entries and retains additional user presets. Deleting a preset is a separate explicit operation; reset does not silently remove those other entries.

Migrations retain unknown fields/wrapper metadata when their registered function preserves those values. A future version is unavailable, never destructively downgraded. Thrown, invalid, asynchronous or oversized migration results expose `migration-failed` and retain the original. A successful explicit migration is idempotent once committed. Missing extensions retain their configuration; safe rendering fallback must not rewrite the requested identity.

## Host configuration operations

The existing `KplexPlugin` writer implements these operations. They are host composition seams; a pure definition does not receive the plugin instance. UI contributions will receive narrower capabilities scoped to their registered view and captured canvas.

| Host operation | Scope and lifecycle |
| --- | --- |
| `readCanvasViewConfiguration(id)` | Registered view's effective configuration, or explicit unavailable. |
| `updateCanvasViewSetting(id, field, value)` | Existing scalar compatibility path, on the same scoped updater. |
| `updateCanvasViewConfiguration(id, address, edit, expected?)` | Detaches input at submission, rechecks registration/remote ownership at the queue boundary and commits through the existing disk writer. |
| `resetCanvasViewConfiguration(id, address?)` | Explicit address or whole known-view reset. Container epochs protect against incoming descendant changes. |
| `migrateCanvasViewConfiguration(id)` | Persists only a successful registered upgrade, retaining other namespaces and unknown data. Repeated unchanged migration writes nothing. |

Durable storage precedes live installation. Failure does not publish an authoritative optimistic configuration. Existing incoming synchronization, save/conflict feedback, unloaded/retired-definition guards and queue recovery remain. Routine successful/queued refresh stays quiet. Configuration completion requests presentation refresh only; it grants no note write, navigation, source acquisition or semantic rebuild.

Notes, session selection and transient runtime state remain separate owners. Changing a configuration/preset never assigns note properties by itself. Explicit category writes will use a separate shared action and appropriate write-completion outcome.

## Public policy and UI entry points

`src/core/plex/views/index.ts` exports `CANVAS_VIEW_API_VERSION`, policy/scene types, registry, bounded state/text validation and configuration operations. `src/ui/plexViews/api.ts` exports the existing settings registry, contribution types, captured controller, text resolver and shared heading/choice/rail components. The host entry point is Obsidian-bound. Neither entry point loads downloaded code.

Registration rejects duplicate/invalid IDs, incompatible API versions, invalid defaults and unsupported navigation/editor combinations. Known capability members are optional; omission means unavailable. `capabilities: {}` is valid. The host admits canonical endpoints and finite measured output before rendering. Unsupported point/synthetic output is rejected.

`PlexViewDefinition.reduceState(state, action, configuration)` optionally returns `updated` with bounded replacement state or `unavailable` with optional text. It receives no host/file effects. The existing session remains the persistence and editor-admission owner. Definitions must decline commands against unsupported future state while retaining opaque saved data. Attention-following editors retain their equality guard.

## Captured UI contributions

`CanvasViewSettingsContribution` retains `items` and `layoutControls`, and optionally supplies `menus` and `choices`. Providers receive `CanvasViewContributionContext`: registered `viewId`, detached session state and this view's effective configuration. They receive no plugin, active leaf, mutable index or full settings map.

`CanvasViewCommand` admits only presentation state actions, scoped configuration edits and explicit opening of this view's native Settings page. It grants no file/property/relationship writes. `CanvasViewContributionController` captures the exact native session, definition, revision and configuration. Invocation rechecks them and mounted lifetime, then uses the existing session or queued writer. Focus changes cannot redirect it. Commands are one-shot; stale, unsupported and failed requests return explicit outcomes. Unmount disposes the controller. Storage precedes successful configuration completion.

`CanvasViewMenuItem` supports actions, submenus, separators, stable IDs, checked state, visibility, enabled state and unavailable reasons. Bounds are64 total entries,32 siblings and three submenu levels. Contributions append to the common menu before Support. Native submenus reuse the existing compatibility adapter; older hosts retain a flat labelled group. Disabled items have no action authority.

`CanvasViewChoice` supplies up to eight labelled groups of at most32 options. Views and lenses derives selection from the opening canvas using the same commands as menus; there is no second selection store. The example demonstrates state commands; Facets preset selection follows in checkpointC.

## Labels and shared layout controls

`CanvasViewText` is explicitly `{literal: string}` or `{key: string}`. Literal text bypasses catalog lookup, including user text resembling a key. Keys use the existing plain-label resolver. Text is rendered as text, never HTML; literals are bounded to512 characters and keys to128.

`PlexProjection.heading` is optional. Undefined inherits existing host presentation, null/empty literal deliberately adds no caption, and nonempty text supplies the shared top heading. This never renames nodes, areas, physical gates or semantic roles. Compass retains its relationship captions.

`layoutControls` accepts the existing static slider array or a context provider returning at most16 registered-field controls. `CanvasViewLayoutControl` supports shared slider/checkbox components, literal/catalog copy and optional bounded paths. Values come from committed configuration. Empty/unavailable groups render nothing. The existing graph camera owner preserves intent during presentation changes.

Native Settings `context.key(field, path?)` and live rails address the same schema leaves and queued writer. Encoded native keys contain stable keys only; numeric indices use an unambiguous `~N` segment. Prototype/empty/oversized paths are rejected. Received-control epochs use the same declared stable-entry owner as queued writes. No payload or executable expression is encoded into a control key.

## Executable example and remaining API work

`src/core/plex/views/example.ts` and `src/ui/plexViews/example.ts` implement `org.example.columns` using the public entry points exclusively. They demonstrate measured direct-child scenes, canonical connectors, optional headings, native Settings, checked menu/panel choices and shared slider/checkbox rails. They are type-checked source and exercised in portable/Chromium conformance tests. The example is not registered in the shipped dropdown.

Shared badges and property-assignment targets/actions are implemented. Measured section sub-anchors remain pending in PR220. Existing shared navigation, area capability, exact-occurrence drag transport and saved/published relationship completion remain authoritative. These presentation commands do not replace those owners. Final native acceptance applies to the final published head.

C1 adds pure badge/color validation and geometry exports (`PlexNodeBadge`, `boundedViewColors`, `validPlexNodeBadge`, `nodeBadgeBounds`) and optional occurrence badge/description, measurement badge, projection status, region color and definition color-reference metadata. C2a admits these in `prepareViewScene` and renders badges attached to the real `ThoughtNode`. Opt in with `capabilities.badges`; omitted capabilities retain existing behavior. A projection admits at most16 badges. Full translated descriptions join the owning node's accessible name. Measured badge bounds contribute to layout and Fit. Regions/guides stay input-transparent decorations with no relationship authority.

`colorReferences(configuration)` returns at most256 existing `ColorValue` identities and joins the existing owning-document `ColorScope`, including palette and theme changes. Badge contrast reuses `ColorSampleReader` on color-context changes only. No settings are persisted by sampling, and numeric layout changes with unchanged colors retain the existing context. Normal nodes retain their observer-free defaults.

The production `wuxing` definition now displays **Facets**, with the five presets selected through the existing captured choice/menu contributions. It keeps the single attention-following editor. Preset settings are type-wide; selected preset, camera and area overrides are per canvas. Unknown/future preset intent remains saved and displays an explicit fallback status. Native preset management and guarded property assignment are implemented; rules and section anchors remain subsequent checkpoints.

A stable-entry schema field may additionally declare `inheritEntries: true` with `entries: true`. `readViewConfigurationAt` then resolves a missing addressed entry from that field's declared default without saving it. An edit seeds only that addressed entry before applying the bounded leaf operation against the latest queued map. Existing entries remain atomic; missing members within them never inherit silently. Whole-field reads remain sparse, unknown entries remain intact and all original JSON bounds still apply.

## Native managers and palette references

The UI contribution may supply `manager(app, context): StyleEditorModal`. Native Settings supplies `context.manage` only for that registered factory. `CanvasViewManagerContext` exposes this definition's configuration and addressed reads, captured incoming ownership, the existing guarded queued writer, a presentation subscription, existing `StyleColorContext` and exact close callback. It grants no graph/source access. Pure view definitions never receive App or these host capabilities. `updateCanvasViewConfiguration` optionally accepts a final lifetime guard, checked when its operation reaches the existing disk queue; submitted durable writes retain the established completion behavior.

Facets composes `StyleManagerList`, `StyleEditorModal` and `StyleColorControls`. Opening/searching does not save defaults or select a preset. Entry Save preserves sibling presets; drafts retain stable category identities, exact aliases, assignment values, colors and layout defaults. Unchanged Save is a no-op. Restore modifies a detached draft until Save. Deletion requires an explicit replacement; an atomic redirect preserves closed/restored canvas intent. Cancel, disk rejection, stale ownership and native retirement retain the established modal safeguards.

The shared palette manager includes registered view usage. A named color used by a preset must be explicitly reassigned in that preset before deletion; a style-only replacement cannot rewrite another settings owner. Unknown/future view namespaces conservatively exclude destructive palette deletion and explain recovery. New named view-color identities are checked against the current palette inside the original queue. Unchanged damaged references remain repairable. No second palette or replacement writer exists.

## Explicit drop meanings and property assignments

`PlexArea.dropTarget` declares `PlexDropMeaning`: `navigation`, `relationship` with canonical role/optional admitted origin occurrence, `property` with a registered assignment ID, or `none`. Explicit meaning takes precedence; legacy `dropRole` retains its relationship adapter. Resize/scroll controls and decorative guides supply no authority. `prepareViewScene` validates target shapes, admitted origins and assignment identities before rendering.

`PlexViewDefinition.propertyAssignments(state, configuration)` supplies at most32 bounded `PlexPropertyAssignment` descriptors. Each declares a field, explicit destination value, recognized memberships and destination-exclusive matches; an omitted value clears recognized memberships safely. This grants no native access. The host protects configured ontology, note-type, tag, alias, display-name and image fields and rechecks protection at commit. Unknown/future preset intent and unsupported/computed sources have no automatic write capability.

Facets uses the same targets for category areas and the catalog-backed `node.assign-category` action. The action accepts only an optional bounded `assignmentId`, never arbitrary fields or values. Native previews show the captured note, current/proposed field and shared-field effect. Scalar/list aliases preserve trimmed exact case; existing category membership is a no-op. Lists retain shape and unrelated primitive values. Unsupported structures and ambiguous field coordinates are read-only. Unassigned clears only recognized values; Conflicting is diagnostic.

The existing drag transport resolves native files/links or a current exact Plex source occurrence. Arbitrary text has no property-write authority. A property drop returns before semantic relink/removal. An unrelated note can be classified without navigation or a connection; its separate Connect action uses the existing additive-only relationship composer. Every canvas view yields native editor dragover/drop to that native editor.

`CanvasPropertyAssignmentActions` composes the existing `writeRelationshipMetadata` FileManager/convergence owner and ordinary incremental indexing. Only an explicit submitted edit reads the saved body to compare live native Markdown buffers. `embeddedMarkdownLeaf` supplies that query for its existing isolated leaves and normal workspace leaves; it never focuses, saves, retargets or replaces an editor. Windows CRLF normalization alone is not an unsaved edit. File identity/stat, original field, canvas/session, preset/category and native buffer guards close before mutation. There is no optimistic classification or separate metadata parser/writer/scheduler.

`view.property-assignment.undo` retains one bounded field receipt per live canvas. It uses the same native confirmation/writer and rechecks the exact applied value, preserving later user edits. View/preset/document retirement excludes stale undo. Receipts are ephemeral and never enter workspace or plugin data. Saved-pending convergence remains a saved outcome; failure retains the original native preview and actionable recovery. Exact-final-head Windows acceptance is still required; Chromium conformance uses finite native host boundaries.

Wander is shared base behavior for every view, not an opt-in gate capability. It uses admitted displayed canonical occurrences, the existing local attention-scope certificate, shared selection/reveal and normal activation. Complete corpus/numerical gate counts and a rendered center-role node are not prerequisites. Rooted layouts retain their navigation policy as attention moves. Unprepared/failed/hidden/stale scenes and active interaction/motion still decline; readiness never requests sources or gate counts.

Alt/Option-click is an explicit node-centering gesture for every view. The shared `node.activate` action accepts the finite invocation argument `{intent: "destination"}` and delegates to the existing navigation owner. Attention-following views activate the target; rooted views explicitly reroot and activate after their existing editor/native identity safeguards. Ordinary branch clicks retain their policy. Ctrl/Cmd-click still opens the in-place placeholder creation choice. Modifier combinations are not implicitly interpreted as centering. The same click/double-click separation applies to expanded rows.

For primary-expand hierarchy views, clicking a terminal ancestor-cycle reference reveals its nearest genuine earlier occurrence on the same branch and explains the cycle with a localized Notice. This uses shared selection/reveal, changes no root/attention/editor/fold intent, and performs no source acquisition. A same-note occurrence on another branch is not a substitute. The cycle guard still prevents recursive re-expansion.

## Current validation

The implemented configuration batch passes 45 pure/actual Settings-host Chromium tests, including independent queued/received presets, stale same-preset and container epochs, A→B→A, reset scope, durable/idempotent migration, future payloads, disk rejection and retired registration. Architecture/core/scanner/build are separate gates. Native migration/preset UI and the remaining expanded API/Facets acceptance are still pending; see [the current validation record](validation/facets-220-2026-10-25.md).

B2 adds a clean78-case API/menu/actual Chromium/settings/selector/session/renderer batch, plus the repository indexing/startup/watchdog/section suite and architecture7 with zero violations. Real production build and official scanner pass. Expanded final-head/native acceptance remains pending.


## Optional model explanations

PlexDecoration regions may supply a bounded CanvasViewText description below their title. Guides may declare directed=true and variant=generating or regulating. The existing adapter validates these optional presentation values; ViewDecorations paints them with per-canvas marker IDs. They carry no canonical endpoints, hit targets, drop meaning or relationship actions. Omitted fields preserve existing consumers.

The Wu Xing Facets preset optionally uses these marks for five relative explanations. Its fixed model cycle is independent of category placement; existing center groupingPartition preserves the classified category without assigning the focus to a scroll area. A missing/conflicting/unavailable phase never becomes a default reference. Native controls and live rails remain CanvasViewSettingsContribution contributions under the same queued writer.
