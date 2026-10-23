# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: Windows dependency-count reuse

**Prepared:** 2026-10-23, Europe/Budapest, by Zsolt's Codex Agent.
**State/direction:** Prepared investigation-to-implementation handoff for the Windows agent with real dependencies, Chromium and Obsidian CLI. No runtime implementation or measurements have been performed in this planning change.
**Branch:** `2026-10-23-dependency-count-reuse`.
**Accepted base:** `main@cd12a857c1c2c89c2d13f6c6b2a3e1a5203d5ffa`, the merge of #201.

## Objective and independence from #203

Measure and, where the proof is sufficient, eliminate repeated decrement/increment bookkeeping when an ordinary source replacement has exactly the same local-dependency projection as its predecessor. Reuse the existing repository transaction/journal/reclaim owners. The user-visible goal is less CPU and storage work during reauthorization/reconciliation without delaying navigation, tag/folder availability or editing.

PR #203 is actively measuring a real-vault copy on the Mac. **Leave it completely uninterrupted:** do not change its branch, handoff, report, binaries, candidate pins, instructions, running process or cache; do not request new probes or data from that agent. Work only on this branch and existing Windows disposable fixtures. There is no dependency on #203 completing or supplying its private harness. Do not merge/rebase either experiment into the other.

This assignment includes implementation after a local proof of redundant work. Do not stop at instrumentation when a safe bounded correction is demonstrated. Conversely, an unmeasured hypothesis is not permission to rewrite storage. If this optimization is unsafe or has negligible opportunity, deliver that specific result and the reason rather than broadening the task.

## Evidence and what remains unknown

Read the pinned [#203 interim report](https://github.com/zsviczian/kplex/blob/c99073b312d0f81e8c5b1562e5b848bd8df8f8b9/docs/validation/mac-vault-indexing-203-2026-10-22.md), specifically **Separate full-snapshot diagnostics / Where the observed request volume goes**. That document is on another branch; it is not present on this branch by default. Read it at the pinned revision without checking out or editing #203.

The report records 7,613,254 / 7,615,311 observed native object-store request calls in its two diagnostic arms. `sourceLocalDependencies` and `sourceLocalDependencyKeys` account for 5,972,339 / 5,973,798 calls, approximately 78.45%. These include repeated readwrite gets and count puts/deletes. Parsing falls sharply between the tested builds while this volume barely changes.

Important limits: those are late-attached, separately instrumented diagnostics; neither reached formal completion. Their unsaved peaks are larger than the unprofiled runs. They do not measure exclusive CPU by store, do not establish an unchanged-projection hit rate, and do not promise 78% CPU savings. Their candidate is the older `c4a656b`, not the accepted final #201 runtime. Current main retains the relevant ordinary-activation mechanism, verified during preparation; reproduce and measure it on this assignment's actual base.

Current source evidence:

- `SourceRepository.write()` streams dependency memberships, their record count and rolling digest while staging new immutable rows. It does not retain a whole-source key set.
- `activate()` selects the new source head and local owner atomically. Ordinary activation creates an old-decrement/new-increment repair journal whenever either side has records.
- `repairLocalDependencies()` reads each old/new membership and its selected key count, updates that count, and deletes old rows after the decrement. Progress is journaled in bounded transactions.
- Optional URL-alias upgrade already checks exact selected-owner/version/record-count/digest equivalence, preserves counts and uses a private reclaim marker for old rows.
- The alias path has extra semantics: optional failures do not mask primary facts and its primary mutation ticket is acquired differently. **Do not label ordinary writes as alias upgrades or copy those weaker/different failure semantics into normal acquisition.**

A replacement may need a new source revision while its projected dependency contributions remain the same. Determine when that happens in current production call paths. Count equality by itself is insufficient; unchanged file stats or graph-ready state are also insufficient. An identical projection is not proof that source facts, relation meaning, search labels or source authority are unchanged.

This targets replacement work. Truly new owners still need their initial contribution counts; deletion and changed projections still need updates. Do not present the optimization as removing all cold-index storage work.

## Read these owners and contracts before coding

At the pinned base:

- [SourceRepository.ts](https://github.com/zsviczian/kplex/blob/cd12a857c1c2c89c2d13f6c6b2a3e1a5203d5ffa/src/index/SourceRepository.ts): `write`, `activate`, `repairLocalDependencies`, `settleLocalDependencyWork`, `cleanupStagedLocalDependencies`, `canDeferPrivateRepair`, `ensureLocalDependencies`, and primary dependency mutation/ticket owners.
- [SourceLocalDependencies.ts](https://github.com/zsviczian/kplex/blob/cd12a857c1c2c89c2d13f6c6b2a3e1a5203d5ffa/src/index/SourceLocalDependencies.ts): versioned owner/row/state/repair contracts and canonical membership projection. Memberships preserve occurrence multiplicity.
- [sourceAcquisition.ts](https://github.com/zsviczian/kplex/blob/cd12a857c1c2c89c2d13f6c6b2a3e1a5203d5ffa/src/adapters/obsidian/sourceAcquisition.ts): actual replacement/reauthorization callers, host/native incarnation and observation revisions. Trace for evidence, not an invitation to alter event handling.
- [SOURCE_REPOSITORY.md](https://github.com/zsviczian/kplex/blob/cd12a857c1c2c89c2d13f6c6b2a3e1a5203d5ffa/docs/SOURCE_REPOSITORY.md), `docs/INDEXING_ARCHITECTURE.md`, `docs/SOURCE_CONTRIBUTOR_DISCOVERY.md`, `docs/ARCHITECTURE.md` and the accepted checkpoint ledger.
- [source-local-dependencies-indexeddb.test.mjs](https://github.com/zsviczian/kplex/blob/cd12a857c1c2c89c2d13f6c6b2a3e1a5203d5ffa/tests/source-local-dependencies-indexeddb.test.mjs): alias-proof rejection, private-marker closure, projection upgrades and existing interruption checkpoints.
- `tests/source-startup-indexeddb.test.mjs`, `tests/source-indexeddb.test.mjs`, `tests/source-acquisition.test.mjs`, `tests/support/contributorBrowserFixture.mjs` and browser harness helpers.
- Existing #201 test-only probes/checkpoint tools and `scripts/testing/obsidian/runner.mjs` / `processTools.mjs`. Reuse them only where appropriate; do not recreate the entire #201 measurement campaign.

Follow current AGENTS/CONTRIBUTING/mixed-agent workflow and their source-comment/ownership requirements. C14 is accepted; structural refactoring remains paused.

## Stage 1 — prove and quantify the opportunity

1. Verify branch, base, dirty files, dependencies, Node 22.22.2 and actual browser/CLI access. Preserve merged #201 behaviour. Establish the current comparison baseline; do not reuse pre-#201 numbers as this task's baseline.
2. Build a small production-owner characterization in real Chromium IndexedDB. Start with a fully selected, healthy dependency owner; run a genuine ordinary source replacement that advances the source revision while producing an identical current-version membership sequence. Verify the actual old/new keys and multiplicities outside timing. Count native get/put/delete/transaction work, separating staging, selected-count repair and inactive-row reclamation.
3. Include changed-projection, first-creation, deletion and already-pending controls. Add shared keys across owners, repeated keys within one owner, nested tags, URL/origin contributions and enough rows to cross a 256-record page and a byte-boundary. A same-record-count/different-key case must not qualify.
4. Add bounded test-only aggregate diagnostics at existing staging/activation/repair boundaries: attempted replacements, exact-projection matches, record-weighted matches, disqualification reasons and operations attributable to each phase. Do not retain private filenames/content or add a global per-source history. Avoid per-note logs, extra database reads or expensive serialization in timed runs. Detailed equality/oracle work can run separately.
5. Exercise real source acquisition/reconciliation in the existing Windows disposable vault, including normal reload/reauthorization and genuine edits. Establish whether ordinary use reaches the characterized case, rather than relying solely on fabricated repository calls. Small fixture frequency is not a claim about the private Mac dataset.

Produce an early go/no-go summary: actual mechanism, production trigger, candidate eligibility fraction and record-weighted fraction in the tested workload, removable work and safety preconditions. The report's 78.45% request share is motivation, not the measured removable bound. If there is no defensible opportunity, stop with evidence and a precise follow-up recommendation; do not spend the session on a new generic profiler.

## Stage 2 — the smallest safe implementation

If Stage 1 confirms meaningful removable work and sufficient proof, extend the existing activation boundary to preserve selected counts for eligible identical ordinary projections. Start with conservative eligibility and ordinary fallback for everything else. The existing alias path is a design reference, not a flag to misuse.

Before coding the fast path, write down these invariants and check them against actual source:

- The predecessor's selected source/head/sequence and local owner agree, the projection version is current, and its counts are already valid under the existing state/journal contract. All required old-state authentication remains. Do not trust only a stored digest if required validity evidence is absent.
- The fully produced/staged new projection has matching record count and rolling digest under the same canonical projection and batching rules. Audit how ordering, byte boundaries and revision-string length affect the digest. Conservative false negatives are acceptable; unordered sets, count-only equality, extra global sorting or a changed digest/schema are not substitutes.
- Recheck predecessor, journal, current/closed state and new staging completeness inside the activation transaction. No stale preflight receipt can authorize the final commit.
- Publish the new source head, its actual families/sequence and new local-owner selection normally. Advance required revision/invalidations and preserve primary contributor tickets, host observation and closed-world lookup fences. The optimization changes count maintenance, not source authority or graph semantics.
- Preserve exact membership multiplicity and counts shared by other sources. Do not deduplicate repeated contributions.
- Account for memory/unsaved overlays, pending deletion, partially repaired counts, older projection formats, missing/corrupt state, concurrent writers and genuine changed memberships. Fallback must preserve existing conservative results and recovery, not silently certify an invalid selection.
- Retire inactive rows with the existing bounded, durable private reclaim protocol. Ensure ordinary replacements actually invoke/schedule its owner and that later writes/restarts can settle it. Merely changing `needsRepair` is insufficient: `activate` and `write` currently distinguish alias repair/cleanup after commit.
- No unbounded old-revision accumulation or hidden transfer of cost to the next restart/first interaction. Include reclaim work in the end-to-end result and test repeated eligible replacements.

A schema change, new global proof cache, new scheduling owner or altered trust model requires a separate explicit design decision. Stop with the proposed design rather than implementing such a change here. Do not bypass checks to manufacture a fast-path hit rate.

## Stage 3 — correctness, interruption and performance gates

Extend existing tests rather than replacing accepted expectations. Required focused cases:

- Eligible unchanged ordinary replacement advances the real head/owner and returns fresh source facts while preserving exact selected key counts; key-count writes caused solely by removing/readding identical contributions disappear. Test changed source data with the same dependency projection so the fast path cannot become source-update suppression.
- Changed projection (including equal count/different keys), first owner, tombstone/recreation, rename/path-dependent keys and legacy projection upgrade retain correct maintenance. Alias-only upgrades retain their distinct no-primary-mask failure behaviour.
- Multiple owners sharing keys and duplicates within an owner retain exact positive and negative lookup coverage, including tags/ancestors, canonical URL/origin keys, fields and resolver tokens.
- Two independent connections competing on the same source; replacement after preflight; unrelated owner counts changing concurrently; stale source tickets; invalid state/digest/missing rows where the established reader contract requires rejection.
- Cancellation/close/failure before staging, after a staged page, around activation and during private reclaim. Reopen the real database or browser process and prove counts are applied exactly once, selected rows survive, inactive rows are reclaimed and no stranded pending journal is introduced. Cover more than one page and repeated replacements.
- Unsaved fallback, payload eviction, pending deletion and recovery continue to mask stale facts. The optimization cannot clear an unsaved mask or advance readiness to claim savings.
- Navigation, relationship editing, search/aliases, early tag/folder availability, gate counts and provenance stay correct during background work as well as after closure. A source-storage optimization must not create extra parses, full rebuilds or foreground durability waits.

Use `npm run test:sources`, `npm run test:sources:browser` and complete `npm run verify` with real dependencies/typings on Node 22.22.2. Stage the exact final artifact with `npm run verify:obsidian`, then run applicable SI4/SI5, foreground/live-update, ontology/interaction, tag/folder/gate and rename/recovery coverage serially. Scope the lanes to affected contracts; Small native tests are not large-vault or physical-device acceptance.

For work/CPU comparison, prefer one deterministic repeated-replacement workload at 64/128/256 owners, with both dense/shared and mixed-change cases; use the established browser fixture for larger row counts. Do not create a new vault/profile without consent. Compare accepted base versus candidate with identical input and starting logical state, at least three paired trials for the representative workload. Run uninstrumented/lightweight timing separately from detailed counting. Record source activations, staging/repair/reclaim native calls, key writes, records/bytes, CPU/elapsed to complete maintenance, remaining journals/rows, memory and responsive action checks. Measure a later reopen and subsequent ordinary edit so deferred debt cannot masquerade as savings.

Operation reduction is the primary causal proof; total CPU is an empirical result. Do not promise a whole-vault percentage, pool Mac/Windows figures, infer CPU shares from request shares, or spend another open-ended session trying to obtain perfect process-exit accounting. Disclose actual CPU coverage/foreground/observer limits, preserve all runs, and give no clean performance pass to incomplete data. No new arbitrary overall 50% acceptance threshold: show exactly which work was removed and whether representative end-to-end cost improved without changed-path/interactive regression.

## Windows safety and excluded work

Use the existing prepared `C:\Obsidian\kplex-test-small` (functional) and, only after verifying actual fixture contents, `C:\Obsidian\kplex-test` (scale). Require matching explicit vault name/path/config variables and real-path validation. Use `Obsidian.com` through shared helpers. Keep raw traces in private TEMP storage and deterministic synthetic fixtures out of personal vaults. Back up and restore test-owned configuration/database state under existing guards; no global/origin-wide reset. Ask before application-wide restart if other vaults are open. Browser-process restart coverage can proceed without interrupting production Obsidian.

Out of scope: #203 measurements or raw private data; production-vault use; the `adoptStartupSources` incomplete-state fix; metadata-watchdog policy; broad event/reconciliation restart design; arbitrary storage-failure fixes; adjacency/evidence representation; new cache/schema/scheduler/concurrency budgets; release/default changes. Record related observations separately without bundling their fixes.

## Delivery and stopping

- [ ] Verify accepted baseline and reproduce ordinary unchanged-projection maintenance with counts and a real caller.
- [ ] Report go/no-go and eligibility/savings bounds; implement only the proved narrow optimization.
- [ ] Pass focused crash/recovery/parity and negative controls; measure complete staging/repair/reclaim cost.
- [ ] Complete real verification and exact-artifact Windows interaction/recovery checks; independently restore owned state.
- [ ] Return code, evidence, limitations and an actionable merge/no-go recommendation on this branch.

Keep one runtime change per independently validated checkpoint. Preserve the single transient handoff header; accepted sanitized evidence belongs in a focused `docs/validation/` report and this PR. Remove the temporary plan marker before final review. Use the repository's mixed-agent publication authority: an offline implementation return does not authorize commit/push/PR updates; the main validation agent publishes only under maintainer authority. Do not merge/release or write main. Identify comments as **Zsolt's Codex Agent**.

The final summary must answer: which ordinary trigger repeated unchanged bookkeeping; how often eligibility occurred in the tested workload; which checks made reuse safe; actual before/after operations and CPU including reclamation; whether new/changed/deleted cases and interaction remain correct; and what is still unknown about real-vault impact. Do not claim #203's heat, unsaved tail or startup-completion defect has been fixed by this work.

Preparation checked repository permissions, main/#201 state, related work, the pinned interim report, current source, existing regression fixtures and workflow. It changed documentation only. No runtime test, build, deployment, benchmark or code optimization is claimed at this stage.
