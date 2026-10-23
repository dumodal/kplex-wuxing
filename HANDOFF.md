# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: Mac startup convergence and unnecessary source reprocessing

Prepared by **Zsolt's Codex Agent**, 2026-10-23, Europe/Budapest.
State: A1 pushed/remote-verified4407177ece2af255d265987fe5fdb6662db8b1dc; A2 committed91770e4, B is being committed separately. Combined A2/B full verification and exact-build Small smoke passed; frozen bundle6ad7c8165cfa0ad66448897aaf0c401b0ccf722702f3c7498c911348502d4a50. Native Small automatic metadata recovery passed with exactly2 attempts/no new full build or masks; SI4 passed. SI5 is actively running: do not overlap native drivers/probes. B main/test policy checkpoint is now recorded; preserve the exact frozen candidate for measurement. Baseline warm/S2 captures completed; S2 converged, controlled current-base recovery defect is separate. Private pointer `/private/tmp/kplex-206-active-path`. Small is open with only K-Plex and writers off; Brain remains open/off. Small pre-fault DB checkpoint and original config are private; restore original writers only after closing Small. Keep baseline0f94252 pinned, do not import Windows changes; later combined acceptance remains pending.
Recipient: Mac agent with real dependencies, Obsidian CLI and the retained private #203 fixtures/evidence.
Branch: `2026-10-23-startup-source-convergence`.
Common accepted runtime base: **`0f94252aabb8b23458b5df192380854ea0bddd53`**, including merged #201, final #203 tooling/report and #204.
Companion: [Windows cached-source read batching, PR #205](https://github.com/zsviczian/kplex/pull/205), branch `2026-10-23-cached-source-read-batching`.

## Objective and two implementation checkpoints

Reduce unnecessary startup source work while ensuring startup can complete after transient source recovery. Preserve early useful previews and interactive navigation, editing, tags/folders/search and exact semantic validity throughout indexing.

Deliver two separately reviewable checkpoints on this branch:

1. **Recovery/convergence:** reproduce and correct a failed initial source adoption that is not reconsidered after its prerequisites recover. This is a correctness/liveness result; do not present a changed completion flag as CPU savings.
2. **Work reduction:** establish which startup events/revision changes cause broad reacquisition or another near-vault-wide pass, then remove only work proved already covered or unnecessary. Retain legitimate offline/live edits and uncertainty handling.

Both include implementation after adequate causal proof. Do not rerun the entire old #203 matrix or stop at a larger diagnostic report when a safe bounded correction is identified. A fundamental trust/schema change or broad redesign requires a separate decision.

## 1. Final #203 evidence: use it without changing its meaning

Read the merged [final Mac study record](docs/validation/mac-vault-indexing-203-2026-10-22.md) and [#204 validation](docs/validation/dependency-count-reuse-204-2026-10-23.md).

The final #203 report deliberately measured historical A=`551a3b5` and B=`c4a656b`. It does not measure final #201, #204 or this base. Confirm the specific failure/work path on current accepted code before claiming it remains.

Useful starting conditions:

- Source-backed full-application startup S1 repaired 11,839 sources and took approximately 34 minutes / 4,900 CPU-seconds in both old arms. Source-head physical path/stat comparisons found no mtime/size/ctime mismatch. Matching physical coordinates alone do not prove host metadata/resolution is unchanged. Nearly all baseline CPU preceded its late unnecessary full rebuild.
- Progressive cold paths retained approximately five minutes / 545–586 CPU-seconds after graph readiness. Strict-AC C4 observed 11,823 later neutral reuses with no new source reads/parses/repairs/masks. Observed revisions changed: identical-revision replay is NOT established.
- Full-snapshot application startup S2 reached the 45-minute cap in both revisions despite later recovered source authority and drained masks/work. Diagnostics saw one failed `adoptStartupSources()` and no later attempt. Distinguish its failure reason from the state machine's missing continuation.
- C4's 32.22% lower candidate closure CPU used different routes (baseline progressive fallback versus candidate source catalog). Do not pool it into a general speedup. A watchdog decision may expose expensive alternate work; increasing the watchdog is not a root-cause fix.
- Later A4-seeded clean warm runs performed no source acquisition/read/parse/repair but tens of thousands of validations/leases. That separate necessary-read cost belongs to Windows #205.
- Seven bounded semantic targets matched. A broad-tag oracle timed out in both old revisions after rendering with semantic work pending; a later active-navigation probe rendered that same broad tag but did not reproduce the pending state. Preserve the unresolved case, not a blanket tag pass.
- Historical profiles were coverage-qualified; detailed warm phase tables overflowed. Native call counts, inclusive waits and "program" samples are not CPU shares. Setup/restoration can add host activity. The final report's ordinary OFF control is valid; post-restore OFF control is focus-qualified. No control subtraction is authorized as exact plugin CPU.

Current source leads (not a completed diagnosis): `adoptInitialSourceIndex()` sets completion from one adoption result; `ensureInitialIndex()` releases its task on incomplete state, but a later retry still needs an owner. GraphIndex's source-ready callback wakes its source-authority waiter and requested semantic consumers. The source adapter independently fences create/metadata/resolver events; graph-level covered-create suppression alone does not prove source-level invalidations have been covered.

## 2. Parallel ownership and independence

Both threads use the same accepted base and preserve #201 parser/startup fixes plus #204 count reuse. Do not change the Windows branch/handoff, import its unfinished runtime, rebase it or deploy it. Each change must work against the accepted base independently. After separate review, an integration check may combine them; do not add their measured percentages.

- **Mac owns:** `src/main.ts` startup admission/adoption/retry; `GraphIndex.ts` startup source-ready/hydration/adoption coordination; `sourceAcquisition.ts` native event qualification, per-file/host revision and reconciliation continuation policy; tests for these contracts.
- **Windows owns:** `SourceRepository.ts` reader/lease/selection batching and its repository-facing tests. Do not change leases, validation algorithms, dependency-count authentication/reclaim or storage schema in this Mac task.
- **Shared seam:** `durableHostInventory()` and the read-only selection/consumption portion of `reconcileRestartHostInventory()` are reserved for a narrow Windows adapter integration. Preserve those read-plumbing signatures/loops unless the exact overlap is coordinated in the two PRs. Mac may change surrounding event/continuation decisions, not independently implement batching. If a shared change is essential, post the precise hunk/API proposal first, assign one owner, and keep the companion build independent.
- Use distinct validation report/test files. Preserve both test inventories and ledger entries during later integration. Root HANDOFF is transient per branch; do not copy the other's active assignment over this one.

Read current AGENTS.md, CONTRIBUTING.md, docs/AGENT_WORKFLOW.md, docs/ARCHITECTURE.md, docs/INDEXING_ARCHITECTURE.md, docs/SOURCE_REPOSITORY.md and docs/OBSIDIAN_RUNTIME_TESTING.md. C14 remains accepted; no structural refactoring.

## 3. Existing Mac environment and private evidence

Authorized test vault: **`kplex-test-brain-mac`**. Protected original: **`Zsolt's Brain (2025)`**. Reuse the existing copy, guards, settings and private evidence; do not create another copy or begin a new first-trust setup.

Resolve and verify actual local paths from the existing private configuration. Do not invent paths/usernames or borrow the production database. Reverify real paths, aliases/shared targets, saved/loaded plugin state and installed artifact hashes before every deployment/reset/restore. Sync, Publish, external writers and automatic updates remain disabled in the copy. No production plugin toggle, note/config write, deployment, reindex, cache export/reset or fault injection.

Reuse merged `scripts/testing/obsidian/macStudy.mjs`, `macStudySafety.mjs`, `macStudyStorage.mjs`, `macStudyStartup.mjs`, `macStudyProbe.mjs`, `macStudyOracle.mjs`, `macStudyAvailability.mjs`, `macStudySystem.mjs`, and targeted profiling only when needed. Inspect current exported functions/CLI parameters rather than inventing commands. Retained private fixtures include the source-only/S1 and full-snapshot/S2 states plus A4 warm seed; identify the actual relevant receipt before restore. A4's documented SHA is `2c1ec8518b8ca5969ebefea7d09092a7284d40daa48844c6939e2640cde0dfe8` (15 stores / 1,537,695 rows), not proof that it is the S2 failure trigger.

Capture a new current-base artifact/fixture identity; do not compare new timings directly to old A/B as though only this patch changed. Build on Node22.22.2 with real typings. Keep Obsidian/installer/browser versions constant in pairs; record unavoidable host updates. The #204 artifact/hash belongs to its recorded build until verified locally.

Perform development/fault injection on existing Small/synthetic fixtures first. Use the real-data copy for targeted reproduction and final exact-build confirmation; private notes stay unchanged. New synthetic notes may be created only in a verified test-owned namespace and removed independently; do not edit private notes to build a fixture. Existing real targets suffice for navigation/read-only semantic checks.

A full application restart requires verifying other vaults are saved/closed; ask if this is not established. Do not kill other sessions or reset global Obsidian storage. Checkpoint imports, hashing/oracles and builds stay outside timed windows. Preserve the original #203 seeds; no stripping stores or rewriting observations to force the preferred route.

## 4. Checkpoint A — reliable initial adoption after recovery

Trace and test `startIndexPreparation`, `finishStartupIndexPreparation`, `ensureInitialIndex`, `adoptInitialSourceIndex`, `GraphIndex.adoptStartupSources`, source readiness notification, hydration cancellation/fallback, and task finalizers. Add precise finite failure reasons/one bounded owner trace through test-only observation when existing diagnostics are insufficient.

First capture: which precondition failed; whether the failure was transient, superseded or terminal; which source/host/generation it belongs to; what later signal proves a meaningful prerequisite changed; and why no attempt follows. Reproduce through the real startup coordinator, not a test that manually calls adoption again and bypasses the defect.

Implement a single coalesced continuation using existing lifecycle/task owners. Recheck demand/startup policy, current generation, source/host validity and unloading. Recovered authority must be consumed only after the relevant awaited owner has settled; avoid self-await, recursively joining the same inventory, concurrent adoption owners or ready-callback retry loops. Repeated notifications for an unchanged failed state must not spin or rescan the vault. A genuine later event must not be lost while an attempt is in flight.

Completion remains a semantic/publication decision, not a counter-based shortcut. Do not set `initialIndexComplete=true` merely because queues are empty, clear unsaved masks, trust a rendered preview or discard a backlog to manufacture readiness. Persistent damage stays explicitly incomplete. Preserve before-view/off and on-demand policy, cancellation when the last relevant surface closes, unload and next-open recovery.

Regression acceptance: controlled incomplete adoption followed by genuine recovery completes automatically exactly as current work permits; no manual reopen/rebuild; no new full-vault acquisition; stale notifications cannot complete a newer startup; persistent failure has bounded retries; live edits and tags/folders remain usable. Publish correctness evidence independently of CPU results.

## 5. Checkpoint B — remove demonstrated unnecessary reacquisition/pass work

Characterize source invalidation separately from graph dirty/rebuild state. Correlate native create/modify/metadata/resolved events with captured inventory revisions, per-file identity/dirty flags, actual source replacements, cancellations and pending-known backlog consumption. A small sampled trajectory plus fixed aggregate reason counts is preferable to an unbounded per-note trace.

Answer the specific observations:

1. Why does application startup replace nearly every source even when stored physical coordinates match? Did current host metadata/resolution change, did native discovery look like creation, did an incarnation fence retire data, or did a genuine unavailable/corrupt record require repair?
2. Which newly observed changes require the post-ready pass, and which have already been covered by the current inventory/publication? Do not call changed revisions duplicates without proof.
3. Does watchdog route selection reflect slow legitimate work, starvation, progress bookkeeping or a lost continuation? Do not increase its timeout, force a route or disable URL/source work as a substitute for understanding it.

Implement only demonstrated redundant admission/revalidation, reusing existing event and publication owners. Graph-level create filtering is not automatically valid for source facts. An unchanged path/mtime or equal dependency digest is insufficient for skipping source work; offline alias/path/Date changes and same-stat edits can alter meaning. Preserve exact native identity where applicable, host observation, body/semantic distinctions, tombstones, provenance and negative dependency coverage.

Retire covered work only at a coherent boundary. Events arriving after capture remain pending. Cancellation retains valid earlier progress and only the work genuinely still owed; it must not create a new broad retry loop. Do not move expensive work onto the first navigation or hold previews/tags/folders until global completion. No second scheduler, per-note permanent history, global trust flag or whole-vault shadow graph.

Measure realized #204 count-reuse activations separately from mere digest matches in the current-base reproduction, using bounded test observation. This clarifies what #204 already saves; do not alter its implementation or count its saving as this patch's contribution.

## 6. Validation and bounded measurement

Add controlled event-order/recovery tests before using another long real-vault run. Extend actual coordinator/startup/acquisition tests, including source-startup/foreground real-IDB fixtures. Negative cases include genuine late create/delete/rename/recreation; same-stat edits; offline alias/path/Date environment changes; delayed or missing metadata; missing/corrupt source/cache; unsaved eviction/recovery; settings change during startup; superseded adoption; close/unload/reopen; policy before-view off and both index modes.

Run focused tests then `npm run verify` under Node22.22.2, real dependencies and installed Obsidian types. Stage exact artifacts through established guards, then applicable startup/ontology/live-update/foreground, SI4/SI5, tag/folder/search/gate and rename/recovery lanes. Do not blindly run mutating Small fixture drivers on the real-data copy. The broad-tag failure remains a named pre-existing control: retain its target and classify any later failure; do not substitute an easy leaf tag or enlarge a deadline. Fix it here only if it is demonstrated to share this startup continuation defect; otherwise record it separately.

For performance, choose one current-base startup condition reproducing the cause and one ordinary warm control. Obtain a targeted baseline first, not the entire historical matrix. Preserve the 45-minute per-run cap for large-vault censored cases; once a causal sequence is captured, use deterministic reduced reproductions for development instead of repeating 45-minute failures. Set a session time/measurement plan and report against it. Three matched representative before/after pairs are the target where feasible; fewer, incomplete or unmatched runs remain explicitly limited, not a clean pass. No minimum overall percentage is preclaimed.

Report event/reason counts, unique versus revisited owners, source revision changes, acquisitions/replacements, parser work, passes/cancellations, #204 actual reuse, transactions/hashes and unsaved recovery. Separately report first useful preview, graph readiness, successful adoption, true source/URL/persistence closure and a matched quiet observation. Measure cumulative whole-process CPU plus elapsed/memory and interaction availability; worker CPU is not added twice. Distinguish natural route changes caused by the patch from host variation and do not pool unlike routes.

Native and external power/foreground/process coverage must agree. Keep profiling/heavy accounting outside timing; reuse fixed low-cardinality counters with explicit overflow instead of recreating the 256-bucket loss. Setup restoration can cause later CPU, so record its timing and use matched preparation/fresh-process separation where justified. Do not subtract a qualified OFF control or claim all remaining CPU is K-Plex. Incomplete/no-gain outcomes are valid evidence; no forced flush, sleeps, changed pacing or weakened guards to improve results.

Success: no stranded startup after genuine recovery; materially less proved-unnecessary source/pass work with correct final and in-progress behaviour; no transferred foreground/persistence debt. A liveness fix without CPU reduction is reported as such. If broad reacquisition is legitimate or cannot safely be reduced, deliver the demonstrated fix and precise remaining cause rather than force a performance claim.

## 7. Delivery, authority and cleanup

- [ ] Verify accepted-base runtime, retained fixture and current reproduction; state the exact failed condition/event chain.
- [ ] Implement/test bounded automatic startup resumption without false readiness or retry churn.
- [ ] Implement/test the highest-impact proved unnecessary source/pass work as a separate checkpoint.
- [ ] Measure selected current-base/candidate scenarios, semantic/interactive/recovery behaviour and remaining debt.
- [ ] Independently verify copy/configuration integrity, restore owned resources and return reviewable code plus sanitized evidence.

Preserve private seeds, raw traces, note paths/content and configuration outside Git. Final cleanup must leave the copy K-Plex/Sync/Publish/external writers disabled, remove owned controllers/debuggers/wrappers/power assertions and verify protected production configuration plus copied content against the retained manifests. The prior audit covered production configuration, not original full-content hashes; do not overstate it. Any failure remains explicit. Do not delete the test copy or its useful checkpoints automatically.

Write a new focused report rather than changing #203's historical evidence. Keep the branch's one transient handoff, preserve its standing header and remove the temporary marker before final review. Follow mixed-agent publication authority; historical merge approval for #203/#204 is not authority to merge this work, write main or deploy to production. Offline returns remain uncommitted by default; report exact patch/artifact/branch identity. Use **Zsolt's Codex Agent** in PR comments. Keep this PR draft for maintainer review.

The inherited Windows directory-symlink test-permission limitation is owned by #205's agent; do not duplicate its tooling repair. Shared source/test/ledger conflicts must preserve both threads. After independent acceptance, a separate combined real-vault check can assess interaction between avoided passes and cheaper reads; no assumed additive savings.

Current progress and limitations are recorded in docs/validation/startup-source-convergence-206-2026-10-23.md. A1 is published; A2/B runtime is frozen during combined verification. The new native recovery probe reopens coordinator flags on a settled native source-backed index and must not be described as a fresh-process startup reproduction. No CPU improvement is yet claimed.
