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

Main validation agent implementing the maintainer-authorized extension on `2026-10-14-issue-155-theme-palette`, reviewed base `01f779a5d92ab72508998f86eadc59ab43acdd17`; initially clean. Keep draft, no merge/release/export/sharing or unrelated refactoring. C14 remains accepted; C15–C26 paused. Commit and push after validated checkpoints. No other repository changes or personal-vault access.

Foundation: `src/core/plex/appearanceThemes.ts` defines version1 JSON library, independent base/semantic copies, immutable factory identity, stable-ID lens color projection, metadata operations and scoped source resets. Six focused tests, core typecheck, installed-types check, focused official lint and architecture pass on Node22.22.2. Full `npm run verify` passes1,969 tests and real production build, raw `%TEMP%/kplex-158-themes-foundation-verify-1.log`; foundation source stayed frozen throughout. These helpers are not yet wired into startup/writers/UI, so no native feature acceptance is claimed.

Next: integrate loaded-data/first-run legacy-import migration before initializing factory presets; update the one existing settings queue to keep selected theme and effective fields coherent; opening-theme activation revision fences A→B→A and stale cross-window drafts. Keep stale unsubmitted drafts visible/read-only with explicit discard; accepted queued writes complete in order. Extract only common manager search/window/row/action shell for the two existing managers and themes, reuse paired previews/reset modal, maintain eight catalogs and docs/APPEARANCE.md. Extend source/editor/migration/policy tests, then full exact-build native lanes including actual Settings.

Successful first-run ExcaliBrain import is an existing appearance: selected User theme + native-base copy + Default theme. Only fresh/no-import installation starts with Default theme alone. Future color payloads must never become a fallback backup. Theme content excludes lens behavior and workflow settings; resets retain geometry, rule keys/order, named pairs, Compass enabled/intensity and all other saved themes.

Authorized disposable fixtures: kplex-test-small (`C:/Obsidian/kplex-test-small`, `.obsidian`), kplex-test; testvault was separately authorized for earlier work. Prefer Small and verify CLI path before writes. Use Node `%TEMP%/kplex-node-v22.22.2/node.exe`; run native/browser drivers serially. Existing PR158 A–E evidence remains local/unpublished, intact in `%LOCALAPPDATA%/kplex-validation/pr-158/`; do not repackage or publish without applicable approval. Prior styling implementation/local/native/CI passed through01f779a, with macOS/physical mobile/minimum1.13 runtime/visual acceptance gaps.

Compass correction was prepared under `%TEMP%/kplex-158-compass-ux-stage`, with BASE_SHA256.json guarding nine source/test/guide files before application. It is separately validated after F1. Same fallback helper for overview/editor, fixed footer + scroll body, whole-percent display, Light native5→7%. Applied after F1 commit39089fb: focused66, official lint/types/build and exact native20 pass. All four outer config files/runtime/workspace restore;106 files. Main.jsfd5144cf1646d294838ae71d4c33084ee721e62f196b5f76c4bff4d1b6f74dc6. Raw `%TEMP%/kplex-158-compass-ux-*` failures/results intact; no live probe/lease. New test build remains staged. Theme integration remains the original active task.
