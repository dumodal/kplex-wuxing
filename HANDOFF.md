# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: Windows cached-source validation and reader batching

Prepared by **Zsolt's Codex Agent**, 2026-10-23, Europe/Budapest.
State: prepared implementation handoff; documentation only in this checkpoint.
Recipient: Windows agent with Node/dependencies, real Chromium IndexedDB and Obsidian CLI.
Branch: `2026-10-23-cached-source-read-batching`.
Common accepted runtime base: **`0f94252aabb8b23458b5df192380854ea0bddd53`**, including merged #201, final #203 report/tooling and #204.
Companion Mac branch: `2026-10-23-startup-source-convergence`. Its PR is linked in this PR description.

## Objective

Substantially reduce the coordination and repeated-read cost of validating an unchanged cached vault. Implement a narrow bounded improvement in the existing source repository/read path after proving the actual operation pattern. Keep source authenticity, reader protection, final freshness and foreground responsiveness intact.

This is complementary to #204: #204 makes eligible source replacements cheaper; this task targets clean reads where no source replacement should be needed. It is implementation work, not another open-ended profiling campaign. Deliver a validated optimization when the evidence permits; return a precise no-go/design blocker when it does not.

## 1. Evidence and its limits

Read the final [#203 report](docs/validation/mac-vault-indexing-203-2026-10-22.md), particularly **Scope and outcome**, **A4-seeded warm cohort**, **Later warm diagnostic profiles and native resources**, and **Review conclusion and next investigation**. Also read the [#204 report](docs/validation/dependency-count-reuse-204-2026-10-23.md).

The Mac study measured old runtimes A=`551a3b5`, B=`c4a656b`, NOT this branch's accepted base. In six later warm timing arms it recorded zero parser calls/source acquisition/read/repair, 71,872 forwarded repository transactions and 48,173 hash calls. Ready CPU medians were approximately 223/233 CPU-seconds. Separate bounded resource captures recorded 11,886 committed reader-lease creations and retirements in each arm, with zero counter overflow/live leases. Detailed phase tables did overflow; their classified native operation counts are lower bounds, not complete totals or CPU shares. These are concrete motivation, not an exclusive attribution or a promised speedup.

Current source confirms: `pin()` selects a head and writes persistent family leases atomically; `releaseLeases()` deletes them through the original connection. `durableHostInventory()` consumes the metadata family through the ordinary repository reader. Restart inventory also performs head/local-dependency inspections. A later pass inspects owners again. Determine which work is necessary and which transaction boundaries or exact immutable reads can be shared within one valid lifetime.

**Do not assume leases are redundant.** They protect readers against other connections and reclamation. Batching transactions need not reduce lease-record mutations. Report transactions, requests, records, bytes and CPU separately. #204's 31.8%/24.2% synthetic renderer savings are not this task's baseline or expected gain.

## 2. Parallel ownership and branch discipline

Both agents start from the same accepted SHA and compare against that SHA independently. Do not rebase, merge, deploy or silently depend on the companion's unfinished code. Preserve all merged #201/#204 invariants. The historical #203 report/raw receipts remain immutable evidence; write new findings separately.

- **Windows owns:** `src/index/SourceRepository.ts` reader/lease/selection paths, repository-facing tests, the narrow batching capability and its performance fixture.
- **Mac owns:** startup admission/adoption/retry, event qualification and reconciliation scheduling in `src/main.ts`, `GraphIndex` startup callbacks and `sourceAcquisition.ts` event/continuation logic.
- **Shared seam:** `durableHostInventory()` and the read-only selection/consumption portion of `reconcileRestartHostInventory()` in `sourceAcquisition.ts`. Windows may make only a small integration change here after posting its exact function/API plan in its own PR and linking the companion. Keep exported existing signatures compatible where feasible. Do not alter event fences, completion flags, scan-admission rules or retry ownership. Mac must leave this read-plumbing seam unchanged unless explicitly coordinated. A shared need should be recorded, not solved by both agents independently.
- Reuse existing helpers. A narrow additional adapter helper is acceptable if it genuinely isolates batching; no parallel source model, new semantic owner or repository-wide refactor.
- Each branch has its own transient root HANDOFF. Preserve the standing header, avoid shared report filenames, preserve both test lists at integration and reconcile rather than overwrite unrelated ledger entries.

Read AGENTS.md, CONTRIBUTING.md, docs/AGENT_WORKFLOW.md, docs/ARCHITECTURE.md, docs/SOURCE_REPOSITORY.md, docs/INDEXING_ARCHITECTURE.md and applicable replay/reader contracts before editing. C14 remains accepted; structural extraction is paused.

## 3. Characterize one real read workload first

1. Verify exact branch/base, dirty files, tool availability and host/browser versions. Build the accepted base with real dependencies and capture all installed artifact hashes. Keep host/browser versions fixed within comparisons; label unavoidable changes.
2. Trace `pin`, `visit`/`readSelected`, `visitFamily`, `selectionReason`, `validateSelections`, `releaseLeases`, close, `cleanupRevision`, and their actual restart-inventory callers. Inspect current regression tests, not just the report.
3. Seed deterministic healthy source facts and metadata in real Chromium IndexedDB. Run the actual production read/inventory owner without parsing or source writes. Cover small single-chunk and dense multi-chunk metadata, shared family revisions and legacy parser compatibility. Establish exactly how many native transactions/requests, leases, family decodes/hashes and owner visits are attributable to the chosen read scope.
4. Use fixed low-cardinality operation/phase totals and overflow flags. Count direct original-connection lease release as well as wrapped repository transactions. Avoid mutable phase labels being interpreted as exclusive caller attribution; carry bounded request identity where needed. No per-note logging, whole-vault retained traces or heavy profiling during acceptance timing.
5. Add a failing operation-count characterization and a small production/native caller demonstration. Choose the highest-value safe boundary. Do not restart the full old Mac A/B study or import private data onto Windows.

The first checkpoint should state the proposed scope, safety argument and deterministic work reduction. Once adequate, implement rather than spending another session on more aggregate diagnostics.

## 4. Implementation direction and invariants

Evaluate batching bounded groups of exact head selection/protection, metadata reads and release through the existing repository. Reuse authenticated immutable data only within the selected read/request lifetime when its validity is still proved. This is a design direction, not an invented API or permission to remove authentication.

The chosen design must:

- Atomically bind source heads and protected family revisions against concurrent cleanup. Preserve per-source masks, tombstones, exact sequence/incarnation, current host/policy/demand and cancellation fences; no whole-graph-ready shortcut.
- Preserve hash/frame/posting validation and legacy grammar handling. A missing/corrupt/partial owner must remain non-ready, never silently absent. A late failure cannot publish a successful partial result as complete.
- Respect existing record AND aggregate byte/decode/backpressure limits. A count of 256 owners alone is not a memory bound. Bound retained heads, encoded buffers, decoded data, outstanding requests and protection lifetime. Dense owners may use the established single-owner path.
- Keep hashing, arbitrary callbacks and host yielding outside live native transactions. Do not hold a transaction open across unrelated awaits, increase worker/concurrency budgets or replace cooperative preemption with a large synchronous batch.
- Allow foreground navigation and edits to preempt background work. Do not hold a background resource that a foreground request must join while background is paused. Release protection promptly, including when abandoning a partly consumed batch.
- Register acquired protection before an unload can run; release each owned lease exactly once with the existing conservative failure semantics. Recheck freshness after awaited releases where the current contract requires it. A failed release is retained protection, not permission for forced reclamation.
- Handle partial pin/read/release failure, replacement/deletion between pages, other connections, cancel/close, unsaved payload eviction and storage reopening without stale publication or leaked unbounded leases.
- Preserve #204 publication/count-reuse/reclaim semantics unchanged. No schema migration, persisted global "already validated" flag, unbounded proof cache, expiry-based lease deletion or whole-vault protection lock.

A fundamental trust/schema/lifetime change requires a separate explicit decision. Prefer a conservative bounded fast path with the existing fallback. Measure negative paths so a genuinely changed/corrupt source does not pay an expensive unused proof then the full old work, as the rejected first design in #204 did.

## 5. Validation and performance acceptance

Extend existing real-IDB source/selected-read/foreground/startup tests. The exact file inventory is in the checkout; start with `tests/source-indexeddb.test.mjs`, `tests/source-startup-indexeddb.test.mjs`, `tests/foreground-startup-indexeddb.test.mjs`, acquisition tests and the selected-read contract fixtures.

Required regression cases:

- Exact unchanged facts and relationship/provenance/search/gate parity; zero unintended source activation/body reads/parses/full builds.
- Batch sizes 0/1/limit/limit+1, multiple family revisions, large rows, byte/decode limit, sparse/missing owners and partial failures.
- Independent connection replacing/deleting a selected owner or reclaiming old chunks before/during/after reads; unrelated writer interleaving; unknown/stale/corrupt selections and negative results.
- Cancellation/close at acquisition, decoded-page, publication and release boundaries; blocked/aborted release and storage recovery; browser-process restart; final live leases/reclamation debt no worse than the established contract.
- Foreground request and edit admitted while background batch is held, without deadlock, delayed tag/folder availability or false complete counts.
- Existing #204 shared-count/recovery regressions remain green.

Run Node **22.22.2**, actual dependencies/Obsidian typings, focused source/browser lanes and `npm run verify`. Stage the final exact build in guarded Windows Small with `npm run verify:obsidian`; run affected foreground/live-update, startup, SI4/SI5, gates/search/folder/tag and rename/recovery checks serially. Small correctness is not production-vault performance acceptance.

Known inherited integration limitation: #204's combined Windows check had `EPERM` creating a directory symlink in `tests/mac-study.test.mjs` (24/25 passed), while pre-integration #204 CI passed. Reproduce/record it as inherited. Do not silently skip, weaken path refusal or claim full verify passes. A minimal portable test-fixture correction is allowed as a separate tooling checkpoint only if it still exercises genuine alias/symlink refusal; otherwise report the environment prerequisite and complete independent checks. Do not duplicate that tooling repair in the Mac thread.

Use fixed accepted-base/candidate workloads at 64/128/256 owners for scaling, plus a larger synthetic metadata fixture where useful. Obtain at least three paired trials for the representative case, alternate order, and report every result. Detailed count/profiling runs are separate from lightweight timing. Include setup/restore effects, direct native calls and cleanup through actual closure; sample a later ordinary edit/reopen to exclude shifted debt. Keep power/focus and process identity/exit coverage explicit. Prefer whole-Obsidian CPU for native checks; renderer-only browser timing is component evidence, not a whole-process claim. No forced GC, relaxed pacing or post-hoc tolerance. Do not spend an open-ended extra campaign perfecting generic CPU accounting; report any limit precisely.

Success means materially less demonstrated coordination/repeated work, improved representative complete cost, preserved semantic and foreground behaviour, and no new clean-path source writes. The exact amount is empirical. If no safe useful reduction is established, stop with the tested alternatives and a precise reason; do not add complexity for a microbenchmark alone.

## 6. Environment, delivery and cleanup

Use existing `C:\Obsidian\kplex-test-small`; use `kplex-test` only after verifying its actual fixture scale. Require explicit matching name/path/config and CLI path checks. Reuse `runner.mjs`, `processTools.mjs`, real-browser helpers and the merged measurement/checkpoint owners as appropriate. Do not create a new persistent vault/profile or access production notes without separate consent. Ask before restarting an application with other vaults open. Keep raw receipts/checkpoints outside Git and vaults; restore owned settings, fixtures, wrappers, debugger and power resources independently of pass/fail.

- [ ] Characterize accepted-base cached-read cost and production caller; record proposed boundary and companion seam.
- [ ] Implement the smallest safe batching/reuse correction with failing-then-passing work and concurrency tests.
- [ ] Measure complete operations/CPU, negative controls, foreground and recovery; preserve #204.
- [ ] Complete applicable verification, cleanup and a focused sanitized validation report.
- [ ] Return exact branch/commit or uncommitted diff/artifact identity and a merge/no-go recommendation.

This assignment authorizes scoped implementation and test-vault validation, not main writes, merge, release, production deployment or changes to the companion branch. Follow mixed-agent publication authority; do not infer commit/push approval from the historical #203/#204 merge instructions. An offline return remains uncommitted by default. Keep this PR draft for maintainer review. Use **Zsolt's Codex Agent** in comments, preserve the transient header and remove the temporary plan marker before final review.

Return: what work was shared, exact safety boundary, actual transaction/request/lease/hash/byte reductions, all cost samples and limits, negative-path behaviour, semantic/foreground/recovery results and the small adapter integration seam. Do not claim that the Mac startup loop, broad-tag timeout or original heat is solved by this read optimization.

Preparation performed repository/source/report/workflow review and branch/documentation checks only. No implementation, tests, native deployment or speedup is claimed in this handoff commit.
