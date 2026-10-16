# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---


# PR #158 extension — named themes and scoped reset

Implementing the maintainer-authorized extension on `2026-10-14-issue-155-theme-palette`, reviewed base `01f779a5d92ab72508998f86eadc59ab43acdd17`. Keep draft, no merge/release/sharing/import-export or unrelated refactoring. C14 accepted; C15–C26 paused. Regular validated commits/pushes authorized. No personal-vault access. All native testing only kplex-test-small with explicit identity/path/config checks.

Pushed F1 `39089fb`: JSON model/scoped reset foundation, full1,969 and real build. Pushed F2 `ce8c6d7`: Compass fixed footer/shared directional previews/whole percentages/native Light5→7%, focused66/build/native20 and restoration pass. Current F3 integrates migration/first-run ExcaliBrain preservation, queued library/effective projection, default copy-on-write, metadata operations, legacy synchronization and activation-bound editors/lenses/scalars. Source module `appearanceThemes.ts`; existing main.updateStyleSettings/enqueueSettingsWrite/settingsSnapshotForPersistence remain authoritative.

F3 installed native build main SHA6745c7fcf337e164b83f8e6c1a6ed6377796c8820714c037a681a48778724d8c; native20 and complete runtime/workspace/four configuration byte restoration pass,106 files, no owned notes/controllers. Temp prefix `kplex-158-theme-persistence-*`, private baseline `...private-baseline-N0S94b`; keep private. Broad verification3 records architecture/core/874 general/110 UI/334 source all passing; source-browser527/529 with two on-demand extraction dependency failures. Corrected finite fixture includes real ownership methods/core module, entire on-demand rerun `kplex-158-theme-on-demand-1.log`; all73 tests pass (including both formerly failing cases). Earlier full failures are preserved indexing/image fixture omissions, corrected with real source dependencies. Report actual combined results; do not claim a clean single-command npm run verify. Actual build/types and official lint pass. Final clean full run still required after UI.

Next F4/F5: prepared source is OUTSIDE repo in `%TEMP%/kplex-158-theme-ui-stage/`: StyleManagerList.ts, AppearanceThemesModal.ts, extended ColorAdoptionModal.ts,32-key/eight-locale translations.json, mechanical apply-shared-managers.py and theme-settings-methods.txt. These are unvalidated drafts, NOT production sources. Apply only after F3 validated commit; review before copying. Have both existing managers consume the common shell, extend ColorSwatchList with private per-row preferences, add scrollableContent to the native StyleEditorModal and reuse it in Compass/reset/theme editor, wire native top-row controls/reset/locales. Preserve old base-adoption shortcut/button via scoped.baseShortcut; top reset exposes three scopes and factory disable. Clean up native manager no-Cancel stale state with explicit discard and clear theme listeners on plugin unload. Fix draft casts/labels/TypeScript/locale details; all new module/function TSDoc. No second writer/scheduler, CSS sampling into storage or lens behavior copying.

Extend native/browser tests for actual theme Settings management/create/delete/reset, failed persistence/restart/default no-op, stable lens color isolation, cross-window stale editors and metadata no-scene/paint-only graph counters. Preserve existing managers/pages/editor behavior. Update docs/APPEARANCE.md, concise extension report, ledger and PR body. Required final verify:obsidian + affected native styling/style-operations/migration/theme-preview lanes, serial browser/native drivers. Use pinned Node22.22.2 from `%TEMP%/kplex-node-v22.22.2`; npm path `C:/nvm4w/nodejs/node_modules/npm/bin/npm-cli.js`. Set `$OutputEncoding=[Text.UTF8Encoding]::new($false)` before any Unicode Python stdin (PS5 default is ASCII). Native fixture variables: name kplex-test-small; C:/Obsidian/kplex-test-small; config .obsidian; CLI C:/Program Files/Obsidian/Obsidian.com. testvault remains untouched. No new public evidence archive approval.
