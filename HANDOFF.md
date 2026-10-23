# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #205: cached-source reader implementation return

Prepared by **Zsolt's Codex Agent**, 2026-10-23. Main Windows validation is in progress; remaining gates below are pending, not passes. The maintainer explicitly authorized scoped implementation and regular validated commits/pushes to this draft PR. No merge, release, main write or production deployment is authorized.

Branch: `2026-10-23-cached-source-read-batching`.
Accepted runtime baseline: `0f94252aabb8b23458b5df192380854ea0bddd53` (merged #201/#203/#204).
Companion #206 remains untouched. `sourceAcquisition.ts`, startup admission/event qualification/readiness/retry policy are unchanged. The exact private reader plan was posted in #205 comment6362396841 before implementation; no shared-seam change was needed.

## Implementation and review

Ordinary small current-grammar `visit(metadata)` shares one protected metadata chunk/first posting page with its atomic selected-head/all-family-lease transaction. Current eligibility: one chunk, at most256records and256KiB, under the unchanged8MiB aggregate decode budget. Existing hash/frame/posting/final freshness and original-connection lease release remain. Registered view ownership closes prepared decode on cancel/close/failed transfer. Dense/legacy/oversized/memory cases retain normal reads; expanded metadata-pin write-store scope is an explicit limitation.

Offline implementation and independent read-only source/harness review found no runtime blocker. The main agent independently reviewed ownership, bounds, authentication, finality, conservative failure and TSDoc. The native diagnostic was strengthened after review to require saved selections and query exact durable lease absence on normal and deliberate-failure exits. No optimization round or public API/schema/scheduler change was added.

Frozen runtime `SourceRepository.ts` SHA-256: `534a061e64ddfe7a609cc774788567ec8ba6afc4c953ea556e7ff9834fe4c63e`.
Candidate real-dependency production `main.js`: `7fa00a354d38fb2cedecbb9d15c5277e0513813b7074d487f5ebda9820c2b79f`.
Baseline `main.js`: `46bcd36b14291169465f98f0c2635ffb331d576eb84177d1e030281a90dc15d1`.
Manifest/styles are unchanged. Full identity, private receipt locations, protocols and every timing pair are in [the validation report](docs/validation/cached-source-read-batching-205-2026-10-23.md).

## Completed evidence

- Inherited Windows directory-symlink EPERM reproduced; genuine junction/symlink refusal preserved in separate published tooling checkpoint `b8fac4f2a0426e13c66a692d8ba9b75b2ece344a`. All22tooling tests pass, no skips.
- Expected baseline work-count failure3versus2 transactions retained. Corrected expanded reader safety suite passes11/11, zero skips. Two initial test-fixture failures were corrected without runtime changes.
- Actual production helper16owners:48→32 transactions; complete restart inventory82→66. Requests, leases, hashes, decodes and bytes unchanged. Native accepted-base caller confirms the same baseline pattern; its initial lease counters are attempts, not independent durable-retirement proof.
- Final real-IDB diagnostic controls pass14/14, including dense/legacy/shared revisions and two corrupt-family recovery controls; complete release, later edit/reclamation and genuine process restart/reopen pass.
- First full-cost cohort and stronger-oracle confirmation each pass12/12. First128-owner paired CPU changes+4.57%,−11.13%,−8.38%; confirmation−4.64%,−4.99%,−4.96%. All unfavorable endpoints are retained. No dirty/deferred work or persistent debt remains.
- CPU scope is isolated Chromium renderer ProcessTime with host doubles and no GraphIndex background checkpoint, not whole Obsidian/Browser/storage CPU. Heap endpoints are samples; native transaction elapsed lifetimes are not exclusive lock times. No physical-cache equivalence, OS process accounting, Mac/phone or old-Mac percentage claim follows.
- Real Node22.22.2 typings/build pass. Full `npm run verify` and strict `verify:obsidian` passed, including real typings/build, architecture/core/lint, main1355, browser227, portable-source357 and real-IDB690 executions, with zero skips. Exact build staged/smoked in guarded Small. Native caller passed32transactions/80requests/16lease add-delete attempts/48hashes and independently verified zero durable leases/readers/decode. Expected native failure after one read also proves complete durable/wrapper/controller/config cleanup.

## Remaining required gates

- [x] Complete full verification and exact-build staging/smoke; terminal result passed.
- [x] Candidate native caller and deliberate cleanup failure; exact durable lease absence and wrapper/controller/configuration restoration pass.
- [ ] Affected SI4/SI5, foreground inventory/live-updates, startup admission, gates/search/tag/folder, rename and ontology startup checks serially in existing guarded Small.
- [ ] Final configuration/fixture/artifact/controller cleanup and independent final diff review.
- [ ] Final report/ledger/handoff update, validated runtime checkpoint and push, draft PR description/checklist and remote-head verification.

Use existing `C:\Obsidian\kplex-test-small` only with explicit name/path/config guards. Only that disposable vault was open at preflight (88Markdown/107files); native checks must preserve originals. No application-wide restart is needed. Raw receipts stay private under `%TEMP%\kplex-205-validation` and the report-listed owned browser directories. Sandbox process creation error1909 was bypassed using the working regular Windows context; it did not change source or comparison conditions.

Do not re-run the old Mac study, request #206 measurements, change production scheduling/leases/defaults, remove conservative failed-release protection or continue optimizing after this useful bounded correction. Finish the remaining gates and keep #205 draft for review.
