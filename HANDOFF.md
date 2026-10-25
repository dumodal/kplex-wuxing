# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Active PR220 Facets implementation

Branch2026-10-24-canvas-wuxing; accepted main26623c8393bddc0c3bcac39468078ec20ceccbc8 integrated0406844. Prior validated0169198 is historical. Latest published before D46e0845983ab6cec5560a29b1cb51e8a2c4bb77a. Maintainer authorizes implementation/commits/push/PR updates; no merge/release/force push.

A/B and C1 complete; C2a production rendering complete. C2b native preset manager complete and checked; D assignment/undo implemented and checked; E shared predicate editor/rules, F sections/developer guide/fixtures/screenshots/final verification remain. Full specification docs/FACETS_VIEW.md, progress/results docs/validation/facets-220-2026-10-25.md and API docs/CANVAS_VIEW_API.md. Do not stop at intermediate checkpoints.



## C2a: production Facets renderer and shared controls

Production registry retains ID wuxing and displays Facets. Five presets use the existing captured menu/choice/session owner and queued configuration rails. Type definitions stay separate from per-canvas intent. Focus remains centered once, with an attached measured accessible badge and full editor/badge envelope. Real ThoughtNode, styles, canonical connectors, Find, grouping, native drag payloads and attention-following editor remain shared.

Optional badges capability, finite scene admission/status, region colors and configured color inventory compose the accepted renderer. The existing ColorScope and ColorSampleReader resolve native/theme/palette colors and choose badge contrast only on actual context changes. Regions remain decorative. Shared configuration now optionally inherits missing stable default entries and seeds only the addressed entry on an edit; existing entry internals never silently inherit. Queue/reconciliation/size/lifetime owners remain unchanged.

Node22.22.2:66 policy/configuration/selector cases;48 actual Settings-host/captured contributions/localization/editor-camera cases;5 actual renderer/preset/theme/independent canvas/Wander/modifier/cycle cases pass. Official scanner, real production build and architecture7 (194 roots,346 reachable files,zero violations) pass. Historical Wu helper tests retain exact original assertions as migration compatibility; production Facets is covered separately. Browser boundary was corrected to return stable MetadataCache objects, retaining actual cache-identity rejection. No assertion/budget/scanner gate was relaxed.

Native preset manager is now implemented; safe assignment, advanced rules, sections, final API guide, fixtures/screenshots and final-head portable/CI/Windows acceptance remain pending. No candidate is deployed in Small or production. Small remains restored to its captured baseline. Production observation remained read-only.

## Native resources and safety

Small C:\Obsidian\kplex-test-small is restored, no staged candidate. Prior backup %TEMP%\kplex-facets-220-baseline-A:9 owned config/plugin files117 content; restoration digest7bdaf015f88c6ee1945410755a5aaccf7e04408fe597e729cafca24c5bc332ba. Capture a NEW unique backup before final staging; do not reuse historical backup over later user edits. Helpers wuxingResources.mjs capture/capture-window/restore and wuxingStage.mjs. Native drivers serial, explicit name/path/config-dir/CLI guards. Production Zsolt vault is read-only except user permits main.js deployment; none performed. No production content in public reports.

Node22.22.2 at %TEMP%\kplex-node-v22.22.2\node-v22.22.2-win-x64. Real build/scanner/browser needs approved sandbox escalation for esbuild parent reads; Git metadata writes/push escalation. Retain #215 baseline failures separately. Preserve reader fifth hierarchy budget/sixth property provider, both camera fixes, attention equality for Facets, canonical source occurrence and additiveOnly writer, saved-published relationship feedback. #219 is accepted; no moving partner branch consumption.

New maintainer requests already implemented/published: #221 shared Wander c3aa629, explicit Alt/Option center af22b8b, cycle reveal plus Notice13c3922. Exact-final-head Windows checks still required.


## C2b: native preset manager and guarded settings/color composition

The registered contribution exposes a native manager factory with own-configuration/read-address/captured-owner/save-address ports, existing StyleColorContext and exact close callback. Native Settings composes it without a view-ID branch or second writer. Facets reuses StyleManagerList, StyleEditorModal and StyleColorControls for search, create, duplicate, rename, preset/category reorder, explicit replacement deletion, restore-in-draft, matching aliases, canonical assignment, source/field, colors and layout defaults. Opening/search/unchanged Save/Cancel do no writes. New IDs are independent of labels; saved definition and per-canvas selection remain separate.

The queued writer accepts an optional pre-acceptance modal/session lifetime guard. The sparse inherited-entry path now also seeds only the addressed entry when the entire field is absent; actual manager tests caught the earlier all-default materialization. Same-entry changes preserve stale drafts; sibling entries rebase. Native disk failure keeps exact controls/content. Explicit replacement uses one atomic redirect and validates the current destination. A maximum1024-character legacy alias/assignment now migrates unchanged as permitted by the old field contract.

Registered view colors contribute to the existing palette usage display. Preset-owned colors require explicit reassignment before named-color deletion; a style-only rewrite cannot cross settings owners. Unknown/future view namespaces conservatively exclude destructive palette deletion with actionable copy. New named identities are checked inside the existing view-settings queue; unchanged damaged identities remain repairable. Native preview/color-source behavior is reused and parent drafts do not persist from child-picker changes. All8 locales maintained, including audited property-reference metadata.

Node22.22.2: affected118-case configuration/actual-native-control Chromium/API/palette/migration/localization batch passes. Final11-case manager rerun after layout controls passes. Production build and official scanner pass. Architecture zero violations (194 roots350 reachable files). Required indexing/startup/source-convergence/settings-independence/watchdog/sections suite passes with real dependencies. Initial test failures distinguished a real sparse materialization bug from incorrect native action labeling/translation metadata; all original save, lifetime, resource and bound assertions remain. Exact-final-head Windows/native validation, D assignment/undo, E rules/shared editor and F sections/docs/fixtures remain pending. No native vault staged or production files modified.


## D: shared category targets, native field assignment and bounded Undo

Production Facets declares explicit property targets independently of area resizing/scrolling or decorative marks. The shared adapter distinguishes navigation/relationship/property/none and retains legacy dropRole meaning. Native file/link/current exact-occurrence drags and node.assign-category use one captured preview/action owner. Property drops return before semantic relink/removal, including cross-view drags; arbitrary text and retired source occurrences cannot assign. Existing native editor dragover/drop is yielded in every view. Unrelated notes can be classified alone; Connect without assigning uses the existing additive-only composer.

The finite pure transform preserves scalar/list case/aliases, unknown list values, metadata/body/location and relationships. Existing category assignment is a no-op; Unassigned clears recognized values only; conflicting or missing canonical mappings stay read-only. Reserved and current configured ontology/type/tag/alias/name/image fields are protected. The native effect reuses writeRelationshipMetadata/FileManager and its exact cache/body convergence and plugin cancellation lifetime, with normal incremental indexing. No relationship completion shortcut acknowledges a property save.

Native previews and writes retain file/path/stat, canvas/session/preset/category, exact current field and native buffer safeguards. The existing embedded leaf owner supplies a read-only saved-buffer query for its own live leaves and ordinary Markdown leaves; it never saves, closes, focuses or retargets editors. A half-constructed leaf is not added to the query's app-owned collection; exact existing disposal removes it. CRLF/LF representation alone is not a dirty edit. One ephemeral bounded field receipt per live canvas provides applied-value-checked Undo; later edits or retired owners cannot be overwritten. Native pending/failure outcomes remain truthful, with no optimistic phase change.

Node22.22.2:141 affected shared action/renderer/editor/property/cross-link/localization/camera cases pass. Final25 assignment/transform/real-renderer/native-control Chromium cases include external unrelated notes, stale/future presets, exact cross-view source occurrence, source-relationship retention, normal/center assignment, Undo and trusted Chromium pen pointer-capture input. Final35 regression cases pass; final41 embedded-owner/native-action cases pass after lifecycle review. The real build/scanner and architecture7 (197 roots355 files,zero violations) pass.

A full npm test run passed the standard indexing/startup/watchdog/section fixtures and all1570 first-lane cases, then failed3 of288 browser cases. Investigation found stale finite-host dependencies: the probe supplied only the obsolete scalar writer, extracted rendering lacked badgeColorRevision and extracted drops lacked the new target helper/setter. Those fixtures now supply the actual current ports. The editor-overlay assertion was deliberately updated to the required native-owned behavior, independently covered in all registered views. The unchanged no-extra-style-work assertion passes; ordinary views also avoid unnecessary badge refresh work. The35-case affected rerun passes. This is NOT a full-suite green claim: final complete npm/verify:obsidian/source/native/CI reruns remain mandatory after E/F.

All host mutation tests above use the actual production action/modal and metadata convergence with finite FileManager/Vault/MetadataCache boundaries. They are not Windows Obsidian acceptance or physical touch evidence. Small remains restored/no candidate staged, production untouched. E availability-aware rules/shared condition editor and F reusable section anchors, guide/fixtures/screenshots/final-head Windows delivery remain pending.


## Host-free assignment portability correction

The exact D head CI run 40211660706 failed because propertyAssignment.ts used structuredClone outside the ES2021 host-free contract. The native callback now copies only already-admitted primitives/flat primitive lists and rejects nested/unplanned values before mutation. No host global, JSON coercion or secondary metadata writer is introduced. Node22.22.2 restricted core130 and assignment26 pass. Real production build passes. Scanner result is recorded at publication. Final full-suite/Windows/CI acceptance remains required after E/F; this correction does not certify that expanded scope. Small remains restored and production untouched.
