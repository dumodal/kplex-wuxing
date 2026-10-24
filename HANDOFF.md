# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: bound and share warm source-head selection

Prepared by **Zsolt's Codex Agent**, 2026-10-24, Europe/Budapest.
**State/direction:** scoped investigation and, if justified, implementation handoff to the Obsidian-equipped Mac agent. Planning only; no runtime change or test result is asserted by this branch.
**Branch:** `2026-10-24-warm-source-selection`. **Starting accepted main:** `af09bc42d78abe03ed0d32e0edcdf22d0ebe08ae` (includes merged #210 and the later CI-timer investigation documentation). Confirm current remote main/head before work; preserve later accepted commits.
**Related open PR:** [#211 — Stable gate counts](https://github.com/zsviczian/kplex/pull/211), in an independent Windows branch. #211 is not imported or modified by this assignment.

## Objective and decision point

Reduce redundant head-selection/transaction coordination when K-Plex validates an **unchanged warm source inventory**, without weakening any authenticated source, metadata, dependency or graph-publication proof.

This is a targeted opportunity, not an established fix. First characterize the complete current-main call chain and document which repeated selection has a safely reusable authority lifetime. If savings are negligible, or sharing requires an unproved trust extension, stop with an evidence-backed no-go instead of implementing a speculative optimization.

The historical #206 integration's ordinary warm activation completed in **153.016 seconds**, with **48,152 recorded hash calls and 59,968 transactions**, despite zero canonical body reads/parses/replacements in that original measured artifact. It is historical motivation, **not a benchmark for this starting commit or a CPU attribution of these calls**. The final #206+ #207 artifact did not inherit that run's CPU timing. No overall startup-time percentage or production-vault scale result should be inferred from this assignment's smaller fixtures.

## Required repository reading and actual owners

Read `AGENTS.md`, `CONTRIBUTING.md`, `docs/AGENT_WORKFLOW.md`, `docs/ARCHITECTURE.md`, `docs/SOURCE_REPOSITORY.md`, `docs/INDEX_SETTINGS_INDEPENDENCE_DESIGN.md`, the relevant current tests, and the following retained reports:

- `docs/validation/cached-source-read-batching-205-2026-10-23.md`: prior protected single-chunk metadata selection optimisation, actual transaction accounting and adverse samples. Its prior comparison baseline is obsolete for this new experiment.
- `docs/validation/startup-source-convergence-206-2026-10-23.md`: source-backed startup/warm validation, exact historical artifact and qualification boundaries.
- `docs/validation/indexing-event-convergence-210-2026-10-24.md`: latest accepted event/scope/final-fence contracts.
- PR #211's changed-source/read/compiled-badge semantics, **only to identify parallel boundaries and avoid overlap**, not to import its implementation.

Trace these actual methods and callers at the verified branch revision:

- `src/adapters/obsidian/sourceAcquisition.ts`: `reconcileRestartHostInventory()`, `durableHostInventory()`, per-owner capture, `reconcile()`, completion and deferred resolution fan-out.
- `src/index/SourceRepository.ts`: `inspect()`, `ensureLocalDependencies()`, `localDependencySelection()`, `pin()/unpin()`, `visit()` and protected metadata-family validation.
- Tests/drivers: `tests/support/cachedSourceReadFixture.mjs`, `scripts/testing/cached-source-read-batching.mjs`, real-IndexedDB source owner/reader/lease tests, and the existing guarded `scripts/testing/obsidian/cachedSourceReads.mjs` native driver.

Current source already selects an owner/head in `ensureLocalDependencies()` and separately selects the head in the restart comparison's `inspect(file.path, [])`. It subsequently reads authenticated metadata through `durableHostInventory()`. First determine whether an exact, short-lived inspected/selected receipt from dependency validation can remove the separate head inspection while preserving exceptional fallback. Do not assume the three operations have interchangeable authority or that protected family reads can be skipped.

## Storage and native vault rules — strict

The former large **“Zsolt's Brain” test copy has been deleted due to storage pressure**. Treat its physical vault, database, S2/A4 streams, earlier private archives and temporary paths as unavailable. **Do not recreate it**, restore saved large database snapshots, copy the protected real vault, or request a new large fixture.

Only existing `kplex-test` and `kplex-test-small` may be used for native Obsidian checks. Confirm their actual CLI-reported paths/configuration, identity, contents, owner permissions, and file counts; a vault name does not establish its scale. Never open/write the personal production vault or install into it. No new persistent vault or disk-heavy temporary store without separate maintainer approval.

For controlled comparisons, use bounded real Chromium IndexedDB **synthetic host fixtures** under small, disposable profiles. Keep a tight space budget: check available free space, measure peak owned profile usage, run serially, retire each profile before the next and avoid retained full database dumps. Test dense and multichunk cases with a few owners separately rather than multiplying dense fixtures across 256 owners. Keep raw evidence small/private, and include an explicit cleanup and disk-use report.

`kplex-test-small` is preferred for functional native checks; `kplex-test` may supply a warm check only after confirming its actual data and safe state. Do not run the PR203 `macStudy.mjs` or any guarded large-brain test lane that requires the deleted copy. A missing large-vault acceptance sample is a named limit, not a reason to regenerate data.

## Stage 1 — characterize and post the exact seam proposal

1. Confirm remote main, initial branch/dirty state, Node 22.22.2, real installed Obsidian typings, Chromium and native Mac CLI. Check #211 and any newly opened warm-cache PRs before editing.
2. Measure **complete healthy unchanged restart host comparison** with current production methods: selection/head reads, transactions/requests, durable metadata authentication/hash/decodes, lease creation/release, local dependency checks, state closure, elapsed and available CPU. Use an independent semantic/metadata oracle outside timed windows.
3. Record the exact repeated selection and distinguish necessary reads after awaits and independently mutable/unsaved storage from work eligible for sharing. Inspect source activation revision, sequence, native incarnation/stat, environment, local-journal/version, memory/unsaved/deletion overlays and cross-connection changes.
4. Publish a short causal checkpoint in this PR **before a shared-seam change**: baseline transaction trace; candidate short-lived receipt/API shape; owner of selection/protection; precise invalidation/fallback rules; why a later native/repository mutation cannot authorize stale data; expected saved operations; #211 overlap boundary.
5. If the safe saving is not supported, stop after characterization and recommend no-go. Preserve useful negative results.

## Stage 2 — minimal implementation only if justified

Prefer an explicit short-lived **source selection** or read-only receipt owned and disposed within the existing repository/acquisition boundary. Do not add a whole-vault head cache, carry selections through unrelated async host changes, or extend protected leases across long preparation work. Existing callers continue to use their original APIs unless a narrow result/overload proves simpler and safe.

Must preserve:
- Exact saved head revision/sequence and native TFile path/stat/incarnation identity; metadata-cache identity and environment/Date/Daily Notes/final publication fences.
- Existing #210 inventory-scope vs per-owner invalidation, later known-referrer repairs and final exact dependency projection proof.
- Source reader leases, bounded chunk/posting/hash/frame/manifest validation, decode reservations and explicit release/cleanup (including errors, cancellation, unload and post-commit).
- Missing/corrupt metadata, legacy owner upgrades, pending selected count repairs/private reclaim, storage unavailable, unsaved/memory masks, deletion/recreation/rename and concurrent independent writers.
- Foreground scheduler priority and byte/record bounds, source-backed recovery, requested scopes and early tags/folders/search/gates.

**No** new persistence schema/journal, writer/reader concurrency or memory-budget increase, weakened authenticity check, changed scheduler/debounce/watchdog, cache purge, arbitrary setting/default or startup-phase reorder. No change to #207's already accepted storage/reopen behaviour.

## Stage 3 — bounded comparison and acceptance

Use real production source/acquisition plus Chromium IndexedDB. Suggested cells: 32/128/256 ordinary small current-format owners; at least three **alternating matched baseline/candidate pairs** for the representative 128-owner case, with a no-change control and a few distinct dense/multichunk/legacy/fault arms. Fresh bounded profile per timing arm, identical logical database/input states, one task at a time, no coincident builds/native indexing. Do not silently reuse PR205's pinned old baseline or its numbers. Characterize both operation counts and **complete** wall/renderer CPU including reader release; instrumented accounting and lightweight timing are separate.

Require a real operation-count reduction and useful complete-cost improvement without a material regression in follow-up edit/reopen/foreground behaviour. Retain every adverse sample and incomplete/failure receipt. Native requests/transactions are not CPU shares; renderer CPU excludes Browser/storage processes; end-point heap isn't true peak; small fixtures cannot prove a production-vault speedup.

Automated negative/consistency cases:
- Selected head changes between dependency selection and metadata proof, including independent connection and changed sequence.
- Same-stat changed contents, new TFile on same path, rename/delete/recreate, aliases/referrers and changed MetadataCache, Date or Daily Notes configuration.
- Unsaved/in-memory overlay after selection, pending/corrupt local journal, damaged chunk/posting/hash/frame, missing/oversized/legacy family and storage failure.
- Cancellation/unload/exception at every awaited boundary, complete protection/decode cleanup, downstream final inventory/projection checks, correct semantic/gate/search/provenance output.
- After settled warm check, ordinary edit, old-family retirement, source reopen and correct zero *new* leases/writers/unsaved repair work.

Run `npm run verify` using pinned Node and real dependencies, plus relevant browser suites, exact installed artifact `verify:obsidian` and narrow native cached-reader / warm/reload / foreground checks in the **two allowed vaults only**, serially and with explicit 3-variable CLI path guards. Preserve settings, fixtures, workspace and enabled plugins; restore on failure. Prior inherited durable leases must not be silently erased or counted as newly leaked.

Review full changed source against architecture boundaries, TSDoc and coding standards; C15–C26 structural refactoring stays paused. Keep unchanged goldens/thresholds strict, including the recurrent P15 timing guard; do not resume that investigation.

## Coordination, checkpoints and delivery

**#211 Windows ownership:** `src/index/GraphIndex.ts` requested-scope lifecycle and Eager hot policy marker, `src/index/GraphBuilder.ts` canonical patch no-op receipt, `src/ui/ThoughtNode.tsx`, gate-count presentation and their UI tests. This Mac task owns `src/index/SourceRepository.ts` reader selection and the narrow `src/adapters/obsidian/sourceAcquisition.ts` caller. Do not edit/import #211 or alter the meaning of its cached counts. If an overlap is unavoidable, post the precise seam before changes and coordinate.

Create/publish implementation checkpoints through the **existing branch and draft PR** only, with branch-targeted writes and verified readback. The equipped Mac agent is authorized to implement, test, commit/push **scoped branch work** and update this PR; any delegated offline agent returns uncommitted changes under the usual workflow. Keep the single root HANDOFF updated as the transient transfer/return; preserve its standing header. Preserve historical validation records; add a concise, sanitised `docs/validation/` report for real results. Remove `docs/agent-handoffs/warm-source-selection.md` (temporary initial-PR marker) before final review. No merge, main write, release, production deployment, force-push, branch deletion or modification of #211.

When main advances (including #211 if later merged), inspect the new work and reconcile by normal merge on this branch only after checking the changed overlap; do not retroactively relabel measurements. Return the verified head/PR URL, established redundant operation, before/after full cost, correctness/failure evidence, exact artifacts/real tests, disk/profile cleanup and remaining limitations with a **merge/no-go recommendation**. Do not claim production-vault validation with the deleted Brain copy.

Preparation performed here: read current accepted main/repository workflows and actual owners; checked duplicate/open work; opened a branch with planning-only files. No production code, build, test, benchmark or native vault was run.
