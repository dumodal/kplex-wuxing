# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #201 implementation return: bounded partial result

**Updated:** 2026-10-22, Europe/Budapest.

**State:** Reviewable uncommitted implementation and validation work. The complete current automated
verification passes, but the requested CPU objective is not achieved. Observer controls, finite
128/256-owner pairs and the additional native passes below are complete. Small-only SI4 remains
unresolved against the same failing baseline control; separate diagnostic profiling completed. Keep PR #201
draft; this return grants no commit, push, merge, publication or release authority.

**Durable evidence authority:** [Indexing CPU work - PR #201](docs/validation/indexing-cpu-201-2026-10-21.md).
Consult that report for final gate/control/
scaling status, exact per-pair results, retained failures and artifact identities; this transient
handoff is a checkpoint return, not an archive or the final acceptance record.

## Identity and boundaries

| Item | Checkpoint return |
| --- | --- |
| Working branch | `2026-10-21-indexing-cpu-reduction` |
| Prepared branch base | `0c9416667c441c1ee9d3b064c7ca1500672e0a0a`; runtime baseline `551a3b5` |
| Current change state | Uncommitted source, test, native-driver and documentation changes; no Git action performed for this return |
| Current production `main.js` SHA-256 | `7d5430e59b6f204df0d4564e8d7ecdaf0776e5ea85063dce54e2d179f4ce4687` |
| Verification host | Windows 11 build 26200, Node 22.22.2, installed Obsidian typings 1.13.0; Obsidian 1.14.4, installer 1.14.0, Electron 43.3.0 / Chromium 150.0.7871.212 |
| Architecture status | C14 accepted; structural C15-C26 remain paused. This is scoped indexing feature/performance work, not resumed structural refactoring |
| Validation ownership | Main agent runs build/exact-artifact Obsidian lanes and manages the repository. Offline collaborators supplied scoped source analysis/implementation/review. This documentation return ran no tests or native operations |

## Implemented behavior within existing owners

- `src/main.ts` retires only covered pre-capture create notifications whose native identity, path
  and file statistics still match a fresh restore. Genuine later events, edits, unknown/destructive
  observations, same-stat lifetime changes and replacement native identities remain queued. The
  startup coordinator's outstanding-backlog scheduling obligation is preserved.
- `GraphBuilder`, `ObsidianSourceAcquisition` and `IndexedDbCache` share actual completed current
  parser input through the existing hot/queued/durable body paths. Optional receipts require the
  original native/per-file input lifetime. Host/caller/generation/publication and semantic/source
  authority keep their separate fences. Dirty/created state is not cleared to obtain a cache hit.
- Completed full-build parses enter the existing hot cache before group yield. Before a further P4
  parse submission, the existing priority checkpoint runs and original input epoch/file/caller
  checks close again. An exact completed-token hot/queued peek avoids a database wait or a join on
  preempted background work. Delayed cache writes require the exact accepted receipt to remain
  selected and unretired; older writers cannot replace newer completed input.
- Missing-head reconciliation can carry an exact accepted current-process parse across its own
  synthetic incarnation fence, without allowing an old unqualified path/mtime body to cross it.
- The existing optional body queue has estimated payload/count budgets: desktop 32 MiB / 1,200,
  mobile 8 MiB / 160, iOS 4 MiB / 48, plus the existing bounded in-flight batch. Eviction loses only
  acceleration. Parser/body-cache versions already equal 3 on baseline; no numeric cache-version
  bump, database/schema migration, extra source collection, worker pool or scheduler is introduced.
- Native zero-work/synthetic-startup fixtures now wait for setup source/URL closure, including
  immediately before a deliberate held rebuild after mutations. Original zero-work, continuity,
  publication and deadline assertions remain. These are fixture-isolation corrections, not a
  claimed production fix for the original intermittent ontology-tail failure.

Healthy controlled runs finish with zero unsaved sources. They do not explain the maintainer's
original 722 unsaved entries. Storage faults, domain backpressure, pending retirements, expired
retry lifetimes and evicted payload masks remain distinct conditions. No mask or authority fence
is discarded to manufacture convergence.

## Automated and bounded native evidence already obtained

Complete `final8` verification passes on the current artifact: **2,663 Node test executions**
(architecture 7, core 130, main 1,280, UI 227, source 357, real-IndexedDB 662), with zero failed,
cancelled or skipped cases. Production startup/indexing fixtures, official Obsidian lint, actual
TypeScript/Obsidian typings and production build pass. Exact-build Small-vault staging and the
316 ms basic rendered-plugin smoke pass with cleanup. Manifest/styles hashes are unchanged and
recorded in the durable report. The earlier `final6`/`c9c10e45...` results remain preliminary
checkpoint evidence and must not be substituted for the current artifact.

Twelve formal v2 native measurements (three pairs each for 64-owner reconstruction and controlled
warm restore) pass scenario/comparability/cleanup on the exact current artifact. They measure
all Electron-reported Obsidian process CPU through equivalent source/URL/cache closure, an equal
ten-second idle tail and a fixed 30-second observation; they are not full-process restarts or a
reproduction of the private Mac vault.

| v2 median | Baseline -> candidate | Result |
| --- | --- | --- |
| Reconstruction CPU to equivalent closure | 9.810388 -> 9.201033 CPU-s | 6.21% lower |
| Warm-restore CPU to equivalent closure | 3.927948 -> 4.529019 CPU-s | 15.30% higher |
| Reconstruction parser submissions | 195 -> 71 (candidate runs 72 / 71 / 71) | Source acquisition reads/parses 65 / 65 -> 0 / 0 in all three pairs |
| Warm graph-ready elapsed | 863.2 -> 341.4 ms | Earlier graph readiness, not CPU acceptance |

**The 50% end-to-end CPU reduction target is NOT met.** Cold input-work reduction and a modest
cold CPU observation do not compensate for the warm regression. Historical owned tombstone/cache
rows, all-process host activity, three pairs, enabled observers and variable idle CPU limit causal
and general performance conclusions. Remaining concurrently in-flight submissions are not proved
avoidable duplicates. Additional warm requested-proof work is a source-confirmed route difference,
not established redundant work or an assigned CPU share. No broad storage/global proof cache or
semantic-proof weakening is authorized by these observations.

Current artifact native foreground, startup admission, quiescent ontology, interaction updates
(15 passes plus one observation), six gate-count scenarios and folder-wave checks have passed
with restoration. Retain the earlier ontology `Remaining tail did not resume` failure and interaction
setup-overlap failures, including exact-baseline controls. The original ontology failure's cause
remains unproved. A separate diagnostic profile failed CLI/cleanup confirmation timing; later
cleanup was verified. It supplies no CPU attribution or product-failure proof. All these details
and any subsequent gates belong to the durable report.

Three observer-disabled controls per baseline/candidate arm pass. Finite 128- and 256-owner
experiments, one pair at each size, also pass: candidate source reads/parses are zero versus
baseline 129 / 129 and 257 / 257 respectively; CPU to equivalent closure is 2.98% / 5.17% lower.
These single finite pairs are not a general scaling/CPU acceptance result. The prepared help vault
is not verified Synthetic-Scale-v2; neither its name nor these samples supplies that acceptance.

Additional exact-artifact native passes cover rename in On demand and Eager, sections, 18 Excalidraw
cases, all five SI5 recovery cases, and 24 date-property cases in each mode. The corrected Eager
baseline date control also passes all 24. Reviewed date-harness setup corrections handle Windows
backup basenames, normalize received:<revision>: observation keys, and open the actual Eager view
before setup settling. They weaken no deadline, zero-work or readiness assertion and change no
runtime artifact. Small-only SI4 still fails the accessible-alias assertion on both candidate and
exact baseline; retain that unresolved failure rather than recording a pass or a product fix.

A separate five-millisecond renderer diagnostic profile passes in both builds with cleanup. It is
ineligible for CPU acceptance and identifies no dominant removable renderer hotspot. Its scope
and the definitive remaining native status are recorded in the durable report.

## Remaining investigation and acceptance

- Keep diagnostic profiles excluded from acceptance CPU and preserve all failure traces and coverage
  limits. Final native sanity passes: Small 107 files / 88 Markdown, no owned fixtures/controllers,
  debugger detached, source/cache tasks empty and zero unsaved; final runtime hashes match.
- Record the unresolved candidate/baseline Small SI4 accessible-alias failure and any remaining
  platform/native prerequisites. Do not turn a baseline failure into a pass or broaden this task to
  storage/proof redesign. Extra-run status can become stale; the durable report owns final detail.
- Review the final uncommitted diff and durable report before any authorized Git action. Production
  instrumentation search and driver cleanup pass. No PR update/publication is performed; do not
  claim CPU acceptance, the original unsaved-tail fix, merge or release.
- Rank any further change using actual bounded owner/head/family overlap and CPU attribution.
  Preserve foreground progress and final head/host/policy/lease/demand fences. Do not add a new
  scheduler, global proof cache, source schema or structural extraction to pursue the target.

No new CPU improvement is inferred from focused tests or an incomplete run. Windows automation
does not replace macOS, a full process restart or physical mobile acceptance. This remains a safe,
reviewable partial implementation with explicit performance/validation shortfalls, not a completed
resolution of the original heat/CPU objective.

## Prioritized manual checks after automated work

1. **Affected macOS original workload:** reproduce fresh restoration, initial create backlog and
   the prolonged post-ready source tail on the maintainer's affected setup. Verify genuine later
   edits remain visible, collect matched completed-work CPU/idle evidence and determine whether
   the unsaved set converges without discarding masks. Main-window/popout lifecycle needs its own
   observation where used; do not publish private vault identities/content.
2. **Full process restart, Eager and On demand separately:** use existing disposable fixtures and
   compare valid versus missing optional body caches, closed/no-view versus restored visible centers,
   and genuine edits/creation during startup. Confirm the correct route-specific coverage, navigation,
   tag/folder/search availability and eventual source/cache closure. Plugin reload evidence is not
   full-process restart evidence.
3. **Physical mobile/iOS pressure:** exercise large parser inputs, queue pressure, edits/navigation,
   unload/reopen and stale delayed writes on a real device. Confirm responsiveness and current input
   safety under optional-cache eviction; observe memory/GC behavior and ensure source authority and
   dirty state remain conservative. Desktop emulation is not physical touch/WebView validation.
