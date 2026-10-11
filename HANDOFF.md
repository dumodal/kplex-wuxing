# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---


# Startup offline-edit duplicate read - reviewed return

State: inactive, returned to maintainer. Branch 2026-10-11-startup-offline-edit-double-read; base 1b0ac271e380aa715d0fd5e93521c16ab937d85e. Source fix committed as 67c9652 and integrated with main@43569ccd in f34956d51e6b643450484fe0aa5a8c7cec21ddc0. Maintainer now authorizes commit, push, PR creation and merge, including conflict resolution. Publication in progress; no release requested. C14 remains accepted; structural refactoring paused.

## Confirmed cause and fix

Requested foreground GraphBuilder preparation read/parsed A.md and cached its current-mtime body before graph cancellation. Restart inventory then indiscriminately set bodyDirty on physical drift, discarded that current-version input and reread/reparsed the same note. Real caller stacks and a deterministic actual-IndexedDB cancellation regression prove the cause. Original code fails the new regression with two reads; candidate passes with one. The original single-read/parse expectation remains unchanged.

The restart comparison now permits optional current-mtime parser input when a changed mtime already rejects the retired cache version. Same-mtime drift, changed known ctime, missing/tombstoned recreation and pre-existing native-event bodyDirty still force fresh native input. Source dirty/revision flags, normal reacquisition/authentication, CAS durability, exact native/caller/file fences and source authority remain intact. No scheduler/parser/schema/settings/semantic change. Module and affected-function TSDoc updated.

Five new real-IndexedDB cases cover cancelled foreground parsing plus same-mtime size/ctime, different-mtime ctime and observed native-edit cache collisions. All require canonical source/head/payload outcomes; original vocabulary, requested/full distinctions, no-full-build and full-oracle graph assertions remain.

## Actual independent acceptance

Pinned Node v22.22.2, real installed Obsidian 1.13.0 types, Windows Obsidian 1.14.0. Affected lane 75/75 passed. Strict verify:obsidian passed architecture 7/7, core 92/92, official lint, production indexing, 655 portable, 60 UI browser, 334 portable source and 433/433 source IndexedDB browser tests, including the original failure and five new cases. Zero failures/skips. Real type-check/production build and exact-byte native staging/smoke passed.

Native verify:obsidian:foreground passed all six paused-inventory scenarios: folder gates, navigation, add/remove relationship, note creation and visible edit. No broad foreground flush; inventory resumed and converged. Cleanup confirmed zero owned fixtures, controller removed, original 88 Markdown files and plugin enabled. Settings/configuration restored; no captured JavaScript errors. Disposable vault keeps the exact successful artifacts.

Durable record: docs/validation/startup-body-reuse-2026-10-11.json. Exact source inventory cb550742556e9b124e908888542eebd95638c66ec75f3c9179cd3ebb3381a979; source hashes and artifact hashes in that record. Main bundle SHA-256 c77561cf91d684cb44a6a92587b8b0f698dee44bddbc537e5ed8dc3378305cac. No source/runtime edits after independent validation began. Temporary trace copy removed; no production diagnostics introduced. git diff --check passed.

## Remaining scope

No blockers or additional manual tests required for this scoped non-interaction fix. Native Windows small-vault checks do not claim macOS/popout/physical-mobile or paint/memory acceptance. Full verification is green; no earlier PR waiver is carried forward. Publication authorized. Newer main from PR 137 is integrated; only the transient HANDOFF body conflicted and its standing header was preserved. Combined strict verification passed: architecture 7, core 92, portable 655, UI browser 60, portable sources 334 and IndexedDB browser 433, zero failures/skips, real build and exact native smoke. Combined native foreground passed all six cases with convergence/configuration cleanup. Final evidence is in the durable validation record. This inactive handoff does not authorize another task.
