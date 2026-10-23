# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: batch ordinary dependency-count maintenance

Prepared by **Zsolt's Codex Agent**, 2026-10-23, Europe/Budapest.
State: implementation handoff; documentation only, no new runtime code or measurements.
Recipient: Windows agent with real dependencies, Chromium IndexedDB and Obsidian CLI.
Branch: `2026-10-23-dependency-repair-batching`.
Creation base: accepted `main@0f94252aabb8b23458b5df192380854ea0bddd53` (merged #201/#203/#204).
Parallel Mac work: [#206](https://github.com/zsviczian/kplex/pull/206), startup recovery and avoided reprocessing. Leave its branch, experiment, fixtures, candidate and instructions unchanged.

## Objective and relation to previous work

Reduce native request/continuation and repeated ledger-write work during creation, genuinely changed replacement, deletion and selected-count recovery. The target is `NeutralSourceRepository.repairLocalDependencies()`, not source admission, cached reader leases or the canonical dependency projection.

#204 avoids decrement/reincrement maintenance when a complete replacement has an authenticated identical projection. New owners and changed/deleted projections still use ordinary count repair. #205 coalesces a bounded metadata read with its pin transaction; it does not optimize this write path. The Mac thread decides which startup work is necessary; this thread makes necessary count maintenance cheaper.

Read the merged #203 and #204 reports and the [pinned #205 report](https://github.com/zsviczian/kplex/blob/104a5837ca358238f2c3cbd5f7177516094ab138/docs/validation/cached-source-read-batching-205-2026-10-23.md). #203's approximately 78.45% dependency-store request share is a historical diagnostic call count, not CPU attribution or a savings forecast. #204's unchanged-projection renderer savings do not apply to every cold owner or this task's comparison.

Current source-confirmed mechanism: ordinary repair already groups at most 256 membership occurrences into a native transaction, but its nested `apply()` awaits one membership get and one ledger get per occurrence, then queues one count mutation and, for an old occurrence, one row deletion. It repeats this even when many occurrences in that bounded page name the same key. This is not one transaction per occurrence. The opportunity is fewer native calls and serial request continuations within the existing bounded journal transaction, not merely increasing its batch size.

The expected benefit is a hypothesis until measured. Repeated-key workloads may reduce both ledger reads and writes; all-distinct workloads may only benefit from bounded read scheduling. Do not assume realistic pages have a high duplicate rate or that one large duplicate fixture represents the vault.

## Entry, #205 and baseline discipline

Finish the bounded #205 CI follow-up separately before modifying this task's production code. At preparation, implementation run401 (`39941638202`, commit8b1df576) passed, but final evidence run402 (`39943699965`, commit104a5837) failed `tests/indexing.test.mjs:4752`: URL-heavy post-parse graph patch blocked timers for64.9ms against the existing <50ms requirement. The intervening commit changed only documentation. This is evidence of a timing-dependent failure, not proof it is harmless or caused by #205. Recheck live status, preserve the failure, investigate without weakening the bound and report the exact-head result. Do not bury a responsiveness fix in this new PR or modify #206-owned graph/startup work without coordination.

This branch deliberately contains no unmerged #205 code. Characterization can use its accepted creation base independently. If the maintainer merges #205 before implementation/timing, incorporate the accepted main through a normal non-rewriting branch update, preserve this assignment and pin the new comparison base. Do not merge #205 yourself, cherry-pick an unaccepted candidate, force-push or silently change the baseline halfway through a cohort. If it remains unmerged, keep the two changes independent and report later combined verification as pending. Existing #204 count reuse must stay intact in either case.

Read AGENTS.md, CONTRIBUTING.md, docs/AGENT_WORKFLOW.md, docs/ARCHITECTURE.md, docs/SOURCE_REPOSITORY.md and docs/INDEXING_ARCHITECTURE.md. C14 remains accepted; no architectural extraction is authorized.

## Source and test owners

- `src/index/SourceRepository.ts`: `repairLocalDependencies`, `activate`, `write`, `repairAllLocalDependencies`, `settleLocalDependencyWork`, tombstone/unsaved/retry ownership, and #204 count reuse/private reclaim. Keep primary tickets and source activation fences unchanged.
- `src/index/SourceLocalDependencies.ts`: immutable membership rows, key-count state, exact occurrence multiplicity, selected repair cursors and private staging/reclaim distinction. Do not change its projection, key encoding or schema.
- `tests/source-local-dependencies-indexeddb.test.mjs`: real selected-count recovery, interruption points, shared/repeated keys, corruption, #204 unchanged fast path and changed fallback.
- `tests/source-indexeddb.test.mjs`, `tests/source-startup-indexeddb.test.mjs`, acquisition tests and existing real-browser/fixture helpers.
- Reuse `scripts/testing/dependency-count-reuse.mjs`, `tests/support/dependencyCountReuseFixture.mjs` and the native diagnostic owner where appropriate. Extend shared helpers rather than copying a new full measurement framework. Keep a distinct report/workload so #204's historical results are not overwritten.

No change to `main.ts`, `GraphIndex.ts`, source-acquisition event/retry/read-plumbing policy, metadata watchdog, UI defaults, parser, reader leases or the Mac harness is planned. Any essential cross-boundary edit needs a precise proposal before implementation, not an unannounced scope expansion.

## Stage 1 — characterize a real ordinary repair page

1. Pin accepted source/build/tool versions and verify existing Windows test-vault identity. Record current source/fixtures rather than importing private Mac notes.
2. Exercise genuine ordinary creation, changed replacement and deletion through real IndexedDB. Include a native acquisition demonstration using test-owned notes. Verify the expected ordered membership multiset and final ledger outside timing.
3. Count membership reads, distinct keys per bounded repair page, ledger reads/mutations, old-row deletions, serial await stages, native transactions and payload bytes separately. Keep staging, count maintenance, primary journals and later reclamation separate. No high-volume per-note logs or unbounded history.
4. Include all-distinct keys, heavily repeated keys, mixed/skewed distributions, shared keys across owners, repeated keys across page boundaries and a genuine late changed target. Do not count #204-skipped maintenance as this patch's saving.
5. Establish a deterministic operation-count baseline and a bounded design checkpoint. Continue to implementation if there is meaningful removable work and a sound safety argument; otherwise return the precise no-go. Avoid another broad A/B profiler campaign.

## Stage 2 — smallest bounded transaction-local improvement

Investigate gathering a contiguous repair prefix with bounded native reads, validating every membership, reading each distinct ledger once, and applying one final count mutation per key. Reuse the existing transaction, repair row, progress cursors and between-page yielding. A transaction-local Map is acceptable under record AND byte limits; no whole-source/vault map or permanent count mirror.

The implementation choice may use bounded exact-range fetches or queued bounded requests. Verify installed/native IndexedDB behaviour; do not invent a bulk API. A range result must prove every requested source/revision/ordinal, expected cardinality and continuity. Never let getAll silently skip a missing membership. Do not overfetch unbounded malformed/oversized rows; preserve or tighten existing single-record/aggregate limits with a conservative fallback. Count=256 alone is not a memory bound.

### Exact correctness requirements

- Preserve the effective order: old contributions are decremented before new contributions are added. Journals may cross that phase boundary within one transaction, but work cannot be netted across commits or sources.
- **A net delta of zero is not sufficient.** Example: a selected repair removes three occurrences of keyK then adds three, but the stored ledger contains only two. Existing code rejects the underflow. An optimized net-zero update must still reject; skipping the write cannot skip membership/ledger authentication. Similarly, a missing old ledger cannot be repaired silently by a compensating addition.
- Check minimum/intermediate counts, integer overflow, strict version/key/envelope shape and negative-coverage invariants, not only the final count. Preserve multiplicity; grouping is not set deduplication. Zero-count deletion and later readdition may coalesce only inside a transaction after equivalent validation.
- Commit ledger mutations, old-row deletions and exact `fromIndex`/`toIndex` advancement atomically. On abort none of that page is credited. After interruption resume exactly once; do not replay already-applied counts or skip an uncommitted suffix.
- Preserve selected-vs-private repair distinction and `pending`/revision completion state. Closed-world queries remain pending until all required selected maintenance closes. Never decrement the global pending count early or suppress primary contributor tickets.
- Serialize correctly against independent writers sharing a key or replacing/deleting the same owner. Do not pre-read mutable ledger values outside the transaction and later overwrite another writer's contribution.
- Hashing, host callbacks and scheduling waits remain outside native transactions. No larger batch/concurrency/timeout budgets, long transaction across unrelated awaits, whole-vault lock or new scheduler.
- Preserve cancellation/close checks and existing after-old/after-new/before-retire checkpoint intent. Retain foreground opportunities between bounded pages. CPU saved must not be purchased by longer blocking intervals or starving edits/navigation.
- #204's equality gate, authenticated reuse and private reclaim remain the fast path for eligible unchanged replacement. New/changed/deleted work remains correct, and inherited unresolved protection records must not be cleared to improve metrics.

Prefer one conservative helper in the repository with existing fallback. A schema, journal-format, trust-model or public interface change requires a separate decision. Do not expand into cross-owner batching or lease redesign here.

## Stage 3 — regressions and acceptance

Add failing-then-passing work tests and real-IndexedDB negative controls:

- Empty/new owner, 1/255/256/257 memberships; byte-boundary and wide UTF-8 keys; all-distinct and repeated keys across pages; old-to-new transition exactly before/inside/after a page.
- Repeated shared key counts across two or more owners; remove-to-zero, readdition, deletion/recreation, genuine changed targets, URL/origin memberships, nested tags, fields and resolver tokens. Verify exact negative as well as positive lookup results.
- Understated/missing/zero/malformed ledger, same-key compensating additions, overflow, missing/duplicated/wrong-source/wrong-revision/wrong-ordinal rows. Preserve fail-closed results and transaction rollback.
- Two connections editing shared counts or the same owner; superseded source ticket; cancellation/close/native abort before and after page commit; storage unavailable/unsaved eviction/retry; browser-process restart with a partial journal; subsequent edit/deletion and old-row reclamation.
- #204 unchanged count reuse and #205 read lifetime regressions when present. No added source writes during clean warm validation.
- Foreground navigation/editing/search and tag/folder/count/provenance correctness during dense repair. Keep the existing URL-heavy <50ms timer bound; do not alter it to obtain a pass.

Use Node22.22.2 with real dependencies/typings; run focused source tests, real Chromium IndexedDB, full `npm run verify`, exact-build `verify:obsidian` and applicable SI4/SI5, live-update, foreground, tag/folder/gate/search and rename/recovery checks. All fixture/controller/settings/database cleanup is independent of scenario success. Reuse configured Small; native scale claims require actual fixture counts.

For performance, extend the established #204 fixture to measure fresh creation, changed replacement and deletion. Keep unchanged replacement as a no-regression control. Use 64/128/256-owner scaling with representative 128-owner repeated and mostly-distinct workloads, at least three matched serial pairs in alternating order where feasible. Include complete selected-count repair, old-row and source-family reclamation, a subsequent ordinary edit and reopen. Observe total CPU with process scope explicit, wall time, native calls/transactions, retained bytes and longest transaction/task/interaction delays. Detailed counting is separate from lightweight timing; do not pool host versions or old reports.

Success requires substantial demonstrated reduction in this operation path and improved representative complete cost without regressing distinct-key/small edits, foreground behaviour or recovery. Do not invent a whole-vault CPU target or claim 78% savings. If only an unrealistic duplicate-only fixture improves, do not ship complexity on that basis. Preserve unfavorable runs and report whether physical/storage-process CPU and cache equivalence were actually observed. Avoid a new open-ended CPU-accounting project.

## Windows safety, delivery and authority

Use the existing guarded `C:\Obsidian\kplex-test-small` and existing browser-owned profiles. `kplex-test` may be used only after checking its current contents/scale. Require explicit vault/name/config variables and CLI real-path verification. No personal vault, new persistent test destination, global storage reset or production deployment. Ask before application-wide restart with other vaults open. Raw traces and checkpoints remain private and outside Git.

- [ ] Verify baseline and finish separate #205 CI disposition; characterize ordinary repair.
- [ ] Record the transaction-local safety design and measured opportunity.
- [ ] Implement the smallest bounded correction with negative/crash/concurrency tests.
- [ ] Validate complete cost, foreground behaviour and all applicable exact-build checks.
- [ ] Restore owned state; publish sanitized evidence and the reviewed branch checkpoint.

Write a new `docs/validation/` report with exact baseline/candidate/source/artifact identities, request and serialized-wait reductions, actual CPU coverage, all outcomes and remaining limitations. Preserve the standing handoff header; remove the temporary marker before final review. Follow mixed-agent publication authority and any explicit task prompt: no automatic merge, release, force-push, main write or #206 edits. Identify comments as **Zsolt's Codex Agent**.

The final return must explain what changed for a first-time source, a genuinely changed source and an unchanged #204 source; which operations disappear; why crash/concurrent count correctness is preserved; actual gains/negative-path limits; and whether the package is ready for review. Do not claim the Mac recovery defect or original thermal problem solved.

Preparation reviewed #205 code/tests/report/current CI, #206 scope, repository access/main/workflow and the surviving ordinary repair algorithm. Only documentation is published here; no runtime implementation, build, benchmark or native validation has been executed by this planning agent.
