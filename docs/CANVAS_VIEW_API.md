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

Shared badges, property-assignment targets/actions and measured section sub-anchors remain pending in PR220. Existing shared navigation, area capability, exact-occurrence drag transport and saved/published relationship completion remain authoritative. These presentation commands do not replace those owners. Final native acceptance applies to the final published head.

## Current validation

The implemented configuration batch passes 45 pure/actual Settings-host Chromium tests, including independent queued/received presets, stale same-preset and container epochs, A→B→A, reset scope, durable/idempotent migration, future payloads, disk rejection and retired registration. Architecture/core/scanner/build are separate gates. Native migration/preset UI and the remaining expanded API/Facets acceptance are still pending; see [the current validation record](validation/facets-220-2026-10-25.md).

B2 adds a clean78-case API/menu/actual Chromium/settings/selector/session/renderer batch, plus the repository indexing/startup/watchdog/section suite and architecture7 with zero violations. Real production build and official scanner pass. Expanded final-head/native acceptance remains pending.
