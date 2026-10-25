# Canvas-view API reference

This reference is being completed during PR220. The configuration operations below are implemented and tested; the expanded UI/section contributions and final conformance example remain in progress. Historical standalone view tests do not certify the expanded Facets feature.

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

## Current validation

The implemented configuration batch passes 45 pure/actual Settings-host Chromium tests, including independent queued/received presets, stale same-preset and container epochs, A→B→A, reset scope, durable/idempotent migration, future payloads, disk rejection and retired registration. Architecture/core/scanner/build are separate gates. Native migration/preset UI and the remaining expanded API/Facets acceptance are still pending; see [the current validation record](validation/facets-220-2026-10-25.md).
