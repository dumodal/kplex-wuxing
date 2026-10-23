# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #205: validated Windows implementation return

Prepared by **Zsolt's Codex Agent**, 2026-10-23. Scoped implementation and required local/Windows acceptance are complete. Keep #205 draft for maintainer review. No merge, release, main write or production deployment occurred. The maintainer explicitly authorized regular validated commits/pushes for this assignment.

Branch: `2026-10-23-cached-source-read-batching`.
Accepted base: `0f94252aabb8b23458b5df192380854ea0bddd53`, preserving merged #201/#203/#204.
Published implementation: `8b1df5764d4799960a64ee2b149566b6278d0516`, remote identity verified.
Companion #206, `sourceAcquisition.ts` and startup admission/event/readiness/retry policy are untouched. Exact private reader proposal was posted in #205 comment 6362396841; no shared-seam integration was needed.

## Implementation and evidence

Only production `SourceRepository.ts` changes. Ordinary current-grammar metadata visits prepare one chunk/first posting page inside atomic head/all-family-lease selection. Limits remain one chunk, 256 records, 256 KiB and the existing 8 MiB decode budget. All leases/authentication/final freshness, masks, cancellation/close and conservative failed-release protection remain. Prepared decode belongs to the registered reader; no public API/schema/scheduler/proof cache/resource-budget change. Dense/legacy/oversized/memory paths retain ordinary reads; expanded pin write-store scope is documented.

Runtime source SHA-256: `534a061e64ddfe7a609cc774788567ec8ba6afc4c953ea556e7ff9834fe4c63e`.
Built and installed `main.js`: `7fa00a354d38fb2cedecbb9d15c5277e0513813b7074d487f5ebda9820c2b79f`.
Baseline `main.js`: `46bcd36b14291169465f98f0c2635ffb331d576eb84177d1e030281a90dc15d1`.
Manifest/styles are unchanged. Full identities, raw receipt locations, every pair and failure are in [the validation report](docs/validation/cached-source-read-batching-205-2026-10-23.md).

- Sixteen-source metadata helper 48→32 native transactions; complete restart inventory 82→66. Requests, committed leases, hashes, decodes and bytes unchanged. Native caller corroborates 32 transactions with independently verified zero owned durable leases/readers/decode.
- Controlled 64/128/256 comparisons include complete release, later edit/old-record reclamation and real browser-process restart/reopen. First representative CPU pairs +4.57%,−11.13%,−8.38%; oracle confirmation −4.64%,−4.99%,−4.96%. All unfavorable endpoints retained. No shifted repair/deferred work or reclamation debt.
- Final real-IDB diagnostics 14/14 and focused safety 11/11 pass, zero skips. Limits, corruption, shared revisions, concurrent foreground/edits, close/cancel, masks and aborted-release conservatism are covered.
- Node 22.22.2 full `npm run verify`, real typings/build and strict `verify:obsidian` pass. Main 1355, DOM 227, portable-source 357 and real-IDB 690 executions pass with zero skips; 20,015-source exact metadata/evidence/gates/degrees case passes.
- Exact-build SI4/SI5 recovery, foreground inventory/live updates, startup admission, gates/tags/folders/search, rename and ontology checks pass serially. Intentional native caller failure proves durable and wrapper/controller/config cleanup. Initial startup attempt refused an open Plex; retained failure was followed by prerequisite-controlled rerun and original layout/config restoration.
- Separate tooling checkpoint `b8fac4f` reproduces/fixes inherited Windows symlink EPERM with a genuine junction and unchanged alias refusal; 22/22 tests pass, no skipped safety.

## Final state and qualifications

Small is back to 107 files / 88 Markdown notes, original Eager profile, ready semantic/URL state, zero active readers/decode/unsaved/pending work/controllers. All owned fixtures/configuration/layout changes restored. Two global conservative family leases remain: exact key/source/revision/owner fingerprints match both records in all three October 22 checkpoints, including the original pre-investigation database. They predate #205, have no current owner/selected revision, and were preserved. Their original failure cause is unknown. Fresh comparison arms and all observed new native leases close to zero; do not claim Small's entire database is lease-free.

Native Windows host: Obsidian 1.14.5 (installer 1.14.0), Electron 43.3.0 / Chrome 150.0.7871.212 / embedded Node 24.18.1. Drivers/builds use Node 22.22.2. Component browser is Chrome 155.0.8059.82. CPU covers the isolated Chromium renderer with host doubles and no GraphIndex background checkpoint, not whole Obsidian/Browser/storage CPU. Heap endpoints are samples; transaction elapsed time is not exclusive lock time. Physical-cache equivalence, Mac/phone or original overall CPU acceptance is unclaimed. No additional manual gate is requested for this Windows scope.

Independent review covered ownership/bounds/authentication/finality/cancellation/conservative failure, reuse/TSDoc, actual production callers, attribution and harness cleanup. Required available checks are complete. GitHub workflow 401 for implementation 8b1df57 was still running at documentary finalization; CI is not called passed. Final PR/remote checkpoint verification reports its actual state without waiting for CI.

Raw receipts remain private under `%TEMP%\kplex-205-validation` and report-listed owned browser directories. Historical lease comparison read archived files in matching Electron V8 context only; no checkpoint restore, global reset or forced cleanup occurred. Production vaults were never accessed/deployed. C14 remains accepted; structural refactoring stays paused. No further optimization or measurement campaign is pending for this scoped return.
