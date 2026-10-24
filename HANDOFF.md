# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: preserve indexing progress through event bursts

Prepared by **Zsolt's Codex Agent**, 2026-10-24, Europe/Budapest.
**Direction:** implementation assignment to the Windows agent with real dependencies, Chromium IndexedDB and Obsidian CLI.
**State:** implementation checkpoint a61b924 is published. Corrected event/proof and harness controls pass19/19; unchanged indexing and the failed-bootstrap ontology case pass in isolation. Initial full run retains732/733 browser assertions and CI426 retains its64.8ms timer failure; unchanged CI retry is running. Smoke comparison passes, with declared matched timings, final full verification/build and exact-build native acceptance still pending. See docs/validation/indexing-event-convergence-210-2026-10-24.md; no final acceptance or merge recommendation yet.
**Branch:** `2026-10-24-indexing-event-convergence`.
**Accepted comparison base:** `90032c6d7499fa4e40179110f7b5672d356aa390` (main, including merged #201/#203/#204/#205/#206/#207).

## Objective

Keep source reconciliation making useful, validity-preserving progress while ordinary file/metadata events arrive, then converge after a finite event burst ends. Remove demonstrated repeated global work and no-progress rebuild admission through the existing owners. Preserve immediate edits, early previews, navigation, tags, folders, search, gates and relationship authority.

First establish what still reproduces on this integrated base. The motivating reports are from older versions; they are not proof that current main has the same defect. If current code already handles a reported pattern, retain a regression/control and say so. Implement a narrow correction when a current defect and safe change are established; do not stop at instrumentation or force a speculative fix to make this assignment look successful.

## Evidence and interpretation limits

Read the public reports in [#202](https://github.com/zsviczian/kplex/issues/202), with their own exported numeric column dictionaries:

- [Mac report, 2026-10-23](https://github.com/zsviczian/kplex/issues/202#issuecomment-6366018555): version0.2.2, 13,206 notes, roughly four-hour capture age; 1,366 source-inventory passes, 1,365 cancelled activities, no completed activity, 255,669 checks, 246,069 body reuses, 8,418 reads/parses, zero full-build starts and zero current unsaved sources. The fourth hourly bucket observes 282 cancellations, 77,131 checks and only three reads/parses. There are 130 `expired-resolver` cause observations; recent global passes mainly select `local-authority-unavailable`. PublishedMarkdownFiles60 is publication coverage, not the number of sources processed: durable activations8,404 are separately reported.
- [Windows report, 2026-10-24](https://github.com/zsviczian/kplex/issues/202#issuecomment-6379243427): version0.2.2, 6,782 notes, first strict readiness at5,788,843ms; 111 source inventories, 93 full-build starts, 90 incomplete and112 cancelled activities overall. Repeated decisions include `coalesced-backlog|interval|metadata:changed|startup:post-initial-backlog|vault:create|vault:create-markdown|view-visible` with modified0. It eventually settles. Build starts are not completed rebuilds; mixed-kind totals are not all inventory outcomes.

Neither report contains exact source/artifact identity or an event-by-event causal trace. Counters can overlap, a check is not a unique note, durations include awaits, the monotonic clock is not suspend-proof, and cause observations are not an attribution of every cancellation. Do not call these CPU profiles, a cache-corruption diagnosis, a proven timer-expiry root cause or a post-optimization regression. URL completion was earlier than the prolonged source work; avoid reopening parser/URL optimization without new evidence.

Current source, not merely historical symptoms, supplies the hypothesis: native observations advance `inventoryRevision`; broad `reconcile()` captures one revision and aborts on change. Global resolver uncertainty is coalesced until a pass begins, then a subsequent event can cancel that pass. With global/local authority still unavailable, another attempt can select the broad route and revisit owners. Determine which completed work was genuinely invalidated, which remains reusable, and what re-admits the next attempt.

Preserve the merged reports under `docs/validation/`. #206 already removes discovery-driven body/URL invalidation, prevents a narrow startup-only competing rebuild and resumes failed adoption after genuine recovery. #204/#205/#207 improve storage work. This task must build on them rather than rerun or replace them. #207's accepted storage/reopening limitation is not an active investigation here.

## Owners, reading and parallel boundary

Read AGENTS.md, CONTRIBUTING.md, docs/AGENT_WORKFLOW.md, docs/ARCHITECTURE.md, docs/INDEXING_ARCHITECTURE.md, docs/SOURCE_REPOSITORY.md and docs/INDEXING_DIAGNOSTICS.md. Follow their references for contributor discovery and valid publication. C14 structural refactoring stays paused.

Pinned starting points:

- [Native event admission](https://github.com/zsviczian/kplex/blob/90032c6d7499fa4e40179110f7b5672d356aa390/src/adapters/obsidian/sourceAcquisition.ts#L315-L385): `start`, `changed`, `observeBeforeStart`, `queueKnownResolutionImpact`, per-source cancellation and tombstone owners.
- [Resolver/global fences](https://github.com/zsviczian/kplex/blob/90032c6d7499fa4e40179110f7b5672d356aa390/src/adapters/obsidian/sourceAcquisition.ts#L468-L563): `noteResolverWaveCause`, `consumeKnownResolverWave`, `markContributorHostChange`, current expiry and bounded folder proof.
- [Inventory continuation](https://github.com/zsviczian/kplex/blob/90032c6d7499fa4e40179110f7b5672d356aa390/src/adapters/obsidian/sourceAcquisition.ts#L1960-L2220): `requestInventory`, `reconcile`, `flush`, plus `reconcileKnownImpacts`, `reconcileRestartHostInventory`, deferred resolution and final dependency-inventory proof. Trace their callees and state ownership before choosing a design.
- [Rebuild/backlog owner](https://github.com/zsviczian/kplex/blob/90032c6d7499fa4e40179110f7b5672d356aa390/src/main.ts#L1515-L1665): `performRebuild`, dirty revision/path/reason consumption, actual caller/timer and incomplete-build follow-up. `GraphIndex` retains publication and source-backed adoption; do not create another coordinator.
- `tests/source-acquisition.test.mjs`, `tests/source-startup-indexeddb.test.mjs`, `tests/startup-source-ownership.test.mjs`, `tests/startup-discovery-indexeddb.test.mjs`, `tests/startup-source-convergence-indexeddb.test.mjs`, and the existing local-maintenance/folder/dependency/contributor contracts. Use actual production methods and real storage; host/event fixtures must not duplicate the algorithm under test.
- Existing native owners: `scripts/testing/obsidian/localFolderWave.mjs`, `foreground.mjs`, `foregroundLiveUpdates.mjs`, `startupSourceRecovery.mjs`, the #203/#206 bounded probes and shared runner/process helpers. Inspect each prerequisite instead of assuming the Small fixture still has an old file count.

**Windows owns event qualification, invalidation scope and reconciliation progress in this assignment.** A proposed Mac follow-up would own cost per unchanged-cache read and node-vocabulary construction, not these policies. No such new Mac assignment is assumed to be active. Recheck open branches/PRs at start. Before overlapping edits to the restart-inventory loop/read plumbing, post an exact seam proposal and coordinate; keep repository read/lease/count/schema algorithms unchanged here. Do not touch a Mac vault, historical branch, private archive or running experiment.

## Stage 1 — causal reproduction on accepted main

1. Verify the branch, initial dirty files, accepted source/artifact, Node22.22.2, installed typings, browser and native CLI. Preserve newer unrelated work. If main advances, record whether to incorporate accepted changes before the series; never switch baselines inside a cohort.
2. Use deterministic tests with controlled awaits at real owner boundaries. Reproduce an initially incomplete broad pass and a separately settled local-maintenance case. Deliver real file/metadata event shapes while work is held; do not manufacture failure by merely incrementing an internal revision or forcing the result false.
3. Exercise finite edits to a small subset while a larger unchanged inventory exists, repeated edits to the same owner, changes to already-visited and not-yet-visited owners, and aliases/topology that affect referrers. Distinguish transient synchronous bursts from spaced events arriving during awaited work.
4. Cover a timely known resolver close, a close after the existing expiry, repeated/extra or unscoped closes, and a genuinely unrelated later resolver change. A longer token timeout is not proof that the later event is covered. Treat delayed timers/suspend conservatively.
5. Reproduce the Windows mixed backlog separately through actual coordinator methods and interval. `modified:0` or equal reason strings do not prove there is no structural work. Identify why each incomplete full build is readmitted and what prerequisite changed. If #201/#206 already resolve this pattern, add the control and do not broaden the patch.
6. Capture the decisive chain: native event class -> invalidated scope/revisions -> interrupted owner/phase -> retained committed work -> next admission -> actual completion or blocking prerequisite. Separate cancellation, incomplete prerequisite, failure, supersession and foreground pacing.

Return an early causal checkpoint with a minimal failing test, specific preserved/invalidated facts and the smallest correction. If the current-base hypotheses are rejected, record successful controls and the exact missing evidence. Do not spend another session forcing the historical four-hour totals to recur or contacting reporters unasked.

### Observation limits

Prefer test-only forwarding at existing coarse boundaries. Retain aggregate reasons and bounded recent transition rows, plus test-owned synthetic owner identities when needed privately. No production per-note logging, new polling timer, database scan, telemetry or private-name export. Do not retain an unbounded event queue or a second complete inventory just to count visits.

If current diagnostics cannot distinguish cancellation causes, add only the necessary bounded, path-free category/aggregate at the existing owner, with serialization/privacy/size/overhead tests and backward-compatible report handling. Reuse IndexingActivity/startup diagnostics. No counter reset, omission change or relabeling cancelled passes as completed to improve the result.

## Stage 2 — implement the proved correction

Choose the smallest owner-level fix after Stage1; no new scheduler or storage architecture is authorized. Potential directions are qualified local invalidation, preserving still-valid per-source progress across a superseded broad attempt, or waiting on a meaningful changed prerequisite rather than immediately readmitting identical incomplete work. These are alternatives to investigate, not an assumed implementation.

Write down the validity contract before carrying progress forward:

- A committed source fact, a validated per-source result and a complete inventory/negative lookup proof are different things. Retaining one does not authorize the others.
- Bind retained work to exact native incarnation/path, source/head selection, body/parser revision and relevant resolution/environment/policy lifetime. A file-only change may affect aliases/referrers; being a known path does not make its impact purely local.
- Preserve real global uncertainty. Do not simply remove `inventoryRevision` comparisons, keep `uncertainResolution` permanently true to swallow events, reuse a stale inventory projection, or silently bless an expired resolver witness.
- Do not carry captured coordinates/order through create/delete/move unless its existing validity contract remains established. Handle events during final proof/publication as well as during the source loop.
- Fence affected facts/write authority immediately, even if safe unaffected preparation can continue. Preserve negative coverage, exact contribution multiplicity, tombstones and independent writers. Only actual current completion publishes readiness or clears pending work.
- A bounded in-memory continuation within the existing owner is acceptable only with explicit invalidation, retained-byte/record bounds and unload/restart cleanup. No permanent whole-vault proof cache or new durable journal/schema. Do not retain decoded families or TFile event histories without a measured bound.
- Preserve the existing foreground scheduler, byte/record slices, parser sharing and physical same-stat checks. Do not make edits wait for an entire inventory or hold high-priority leases while awaiting lower-priority work.
- Preserve #206's after-owner-release recovery notification, deduplicated recovery stamps and actual adoption. No polling/retry storm, false source authority or direct ready-flag mutation.
- Persistent missing metadata, unavailable storage or a genuine endless global mutation stream may remain incomplete. The guarantee is useful safe progress where possible and convergence after a finite burst ends, not a fabricated global snapshot while inputs never stabilize.
- Coalescing must not swallow a newer edit or explicit rebuild. An unchanged incomplete attempt must not repeatedly consume work without a changed prerequisite, but suppression cannot strand legitimate recovery. Keep each caller's completion/error contract and cancellation ownership.

If the mixed-rebuild issue survives and belongs to this same event/admission chain, correct it in a separate reviewable checkpoint. If it is an independent architectural problem, return a scoped follow-up rather than bundling a second redesign. Preserve explicit/manual builds, genuine structural changes and On-demand/deferred startup semantics.

## Stage 3 — demonstrate convergence and reduced work

Predeclare operation expectations from the reproduced scope before timing. Do not select tolerances afterward. A useful local-event fixture should show materially fewer repeated checks/reads/writes of unchanged owners; merely fewer diagnostic pass starts is insufficient. Do not promise a universal O(N+events) bound when global changes legitimately invalidate more input.

Required cases:

- Clean startup/no-event and already-settled local edit controls; eager and On-demand with actual before-view admission policies.
- Finite and sustained-but-bounded local bursts, including repeat edits at different positions in the inventory, then a quiescent tail. All edits survive; the final graph agrees with the same final documents in an independent settled reference.
- Unrelated-owner progress while another owner changes, without sacrificing interactive work; genuinely global resolver/environment events remain conservative.
- Delayed/extra/missing resolver closes; qualified and unqualified folder creation, folder members/move/delete, ambiguity/new materialization and alias retargeting; Date/Daily Notes/property environment changes.
- Same-stat modify, delete/recreate at the same path, rename chains and stale async results at every reused-proof/publication boundary.
- Missing/delayed metadata; storage-write failure, unsaved payload eviction and recovery; competing connections; partially completed dependency inventory; close/unload/reopen and changing demand/settings.
- Mixed backlog with zero dirty Markdown paths but real structural changes, and a covered/no-op control; automatic incomplete builds must have justified follow-up, while manual/explicit rebuild remains available.
- Early previews/tags/folders/search, physical Find/create, relationship editing, gate counts/provenance and source recovery throughout background work. Preserve all current strict assertions and responsiveness bounds.

Use production owners and real Chromium IndexedDB for critical races. Deterministic gates prove event ordering, not native performance. Add an actual Windows fixture scenario using real file operations and observed host events, not forced `reconcile()`/`flush()`/`resolved` calls to grant readiness. Record any explicit fault/event injection separately. Reuse the prepared disposable vault and report actual counts; no private production dataset is needed.

For performance, start with a small no-event control plus one representative event-heavy workload at two meaningful fixture sizes. Use at least three matched alternating baseline/candidate pairs for the main claim. Both arms must execute the same number, kind, order and final content of mutations; fixed-duration event generators can deliver fewer edits to a faster build and are not equivalent work. A distinct natural-time soak may complement, not replace, the controlled comparison.

Measure event-delivery span, time from last event to true convergence, total elapsed/CPU to closure, unique versus revisited test owners, checks/body reuse/reads/parses/activations, inventory starts/outcomes, full-build admissions/outcomes, remaining work, foreground action latency and memory. Include a matched quiet interval and subsequent edit/reopen. Separate detailed accounting from lightweight timing, identify process coverage and observer overhead, and keep cancelled/censored runs. A capped incomplete baseline demonstrates a convergence failure, not a fabricated completed speedup percentage.

Keep the study bounded: use reduced fixtures and causal checkpoints, not a repeat of every prior Mac/Windows matrix. Do not require perfect whole-process accounting before reporting deterministic work reductions; disclose missing coverage instead. Run existing full verification on Node22.22.2 with real dependencies, then exact-build `verify:obsidian` and affected startup recovery, SI4/SI5, foreground/live-update, folder/rename, tag/folder/gate/search and settings lanes serially. Required unavailable checks remain pending. Remote CI and native checks may run concurrently; local heavy build/test work must not overlap timed observations.

## Safety, delivery and stopping

Use guarded `C:\Obsidian\kplex-test-small`; use existing `C:\Obsidian\kplex-test` only after confirming its current fixture/scale. Require explicit name/path/config variables and CLI path checks through shared helpers. Never target the default/personal vault. Ask before a new persistent destination or an application-wide restart with other vaults open. Preserve configuration, ordinary cache history and historical evidence; reset only expressly test-owned state under existing guards. Cleanup runs independently of success and removes owned fixtures/observers/resources and restores settings. Raw traces stay private.

Out of scope: general warm-read/lease batching, storage/count algorithms or #207 reopen diagnosis, new parser/graph representation, broad-tag continuation repair, tablet rendering, style ordering, new settings/defaults, releases and production deployment. Do not automatically close #202; it remains the diagnostic collection issue.

Deliver on this branch:

- A current-main reproduction and causal explanation, distinguishing which old patterns are already resolved.
- One small correction at a time, with regression/negative controls and architecture/TSDoc review.
- Sanitized `docs/validation/` evidence with exact source/artifact/host identities, all observations, real verification and cleanup, plus remaining risk.
- A concise answer: what caused repeated work, which work now survives safely, measured reduction and time-to-convergence, interaction correctness, and merge/no-go recommendation.

The equipped Windows agent may implement, validate, commit and push scoped checkpoints to this branch and update this PR, with remote readback and preserved history. Delegated offline returns remain uncommitted under the standing workflow unless separately authorized. Keep this PR draft for maintainer review; no automatic merge, main write, release, force-push, branch deletion or production deployment. Remove the temporary plan marker before final review. Comments identify **Zsolt's Codex Agent**.

If the event patterns no longer reproduce, return the useful negative result and focused regression coverage. If preserving progress requires a changed trust model, persistent schema or broad architecture redesign, stop at the design decision instead of implementing it silently. Do not extend investigation indefinitely or claim old reports fixed without current evidence.

Preparation verified repository identity/access, accepted main, open-PR/duplicate status, current event/reconciliation/backlog code, existing tests and workflow; it reused the cited public diagnostics as historical inputs. Only this handoff and the temporary planning marker are changed. No runtime reproduction, new optimization, build, native test or benchmark has run in this preparation.
