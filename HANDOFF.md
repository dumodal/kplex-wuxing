# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: substantially reduce indexing CPU work without functional regression

**State:** Prepared for the Windows Obsidian-equipped agent. Observation first, then scoped implementation and validation. This planning commit changes no runtime code and establishes no performance improvement.

**Prepared by:** Zsolt's Codex Agent, 2026-10-21, Europe/Budapest.

## 1. Identity, scope and immediate next action

| Item | Assignment |
| --- | --- |
| Repository | `zsviczian/kplex` |
| Implementation branch | `2026-10-21-indexing-cpu-reduction` |
| Accepted implementation baseline | `551a3b52895484de3dd41e5c6eb2fa8c6712fec4` on `main` |
| Earlier static-review revision | `b0fc3cbbfcfc57eebb36df8478dcdc8e955ed3d7` |
| Baseline relationship | The later baseline merges #200, the lens color-editor stacking fix. The comparison contains no indexing-source changes. Preserve that fix and its tests. |
| Starting changes | Plan/handoff documentation only. Inspect actual branch head and local dirty state before implementation; local state was unavailable to this preparation agent. |
| Primary environment | Windows, real Obsidian CLI, pinned Node **22.22.2**, real dependencies and Chromium/Edge where required. |
| Delivery | Continue this branch and its draft PR. Leave the PR in draft. No merge, release, force-push, personal-vault deployment or broad architecture migration is authorized by this handoff. |

The maintainer reports severe sustained Obsidian CPU load and heat after enabling K-Plex on an M1 Mac. The screenshot shows approximately 234% process CPU, but identifies neither the active index route nor a culprit. The maintainer explicitly chooses the always-on Windows machine for the investigation and implementation. **Do not require the Mac to remain on or wait for Mac evidence before doing the Windows work.**

Windows is suitable for proving excessive operation counts, duplicate parses, avoidable replay and restart amplification, and for controlled before/after tests of the shared code. Event timing, storage latency, OS CPU-percentage conventions and thermals can differ. A Windows improvement does not independently prove the original Mac heat is resolved. Record macOS/physical-mobile checks as unrun; they are separate later compatibility checks, not prerequisites for this investigation.

**Next action:** establish the exact installed Windows baseline, then reproduce the priority sequence in section 3.1: a fresh complete snapshot restores, a create-event backlog triggers a full rebuild, and source reconciliation continues with substantial reads/parses and no recorded body reuse. Explain the backlog admission, body-reuse rejection and unsaved-source reasons before selecting the largest measured safe fix. Do not spend the assignment adding diagnostics without proceeding to resolution once evidence is sufficient. Preserve the existing interactive graph throughout.

## 2. Maintainer requirements and non-regression boundary

Interactive indexing, response to user actions, and loading/navigating tags and folders are currently working well. Preserve these as first-class acceptance conditions, including while background indexing is active.

- Keep useful current-node previews, early navigation, edits and foreground preemption. A first-use stall that replaces background CPU is a regression.
- Preserve all supported node kinds: notes, tags, nested tags, folders, attachments, URLs, origins and unresolved/virtual nodes. Preserve search discovery, labels/aliases, direct folder/tag membership, numerical gate coverage and incremental updates.
- Preserve ontology roles/direction, frontmatter precedence, hidden/inferred semantics, provenance, declaration multiplicity, shared synthetic lifetimes and exact-pair edit authority. Partial/cached read presentation must never become complete negative evidence or write authority.
- Preserve canonical page identity and coherent synchronous publication of graph, evidence, cache/fingerprint, search and notifications. No await after partly mutating published state; no unchecked mutation of retained evidence or adjacency.
- Preserve source/host/policy/demand/parser-version fences, same-stat edits, rename/delete/recreation, settings changes, cancellation, unload/reload, storage failure and corruption recovery. Keep source facts independent of display settings.
- Preserve the existing device-specific startup admission, Eager/On-demand behavior, independent URL discovery, pacing preferences and P0-P4 ownership. Do not count disabling work, changing defaults, suppressing features, reducing node limits or delaying discovery as an optimization.

Use existing parser/compiler/resolver, acquisition, scheduler, cache, UI and host-test owners. No parallel grammar/classifier, new scheduler, generic indexing framework, unrelated UI rewrite, C15-C26 refactor, new worker pool, or wholesale storage redesign. Keep `Vault.cachedRead()` for the established desktop read-only path; #192's adapter-read proposal was declined. Preserve current mobile/platform distinctions unless a separately justified, scoped change is approved.

Do not remove digest/frame/posting checks, shorten evidence, silently broaden cache trust, raise decode budgets, relax tests/deadlines, alter the 50 ms resolver-wave assumption, or introduce a schema migration merely to obtain a better benchmark. A change to a correctness/coverage contract needs an explicit design decision. Safe reuse of exact validated immutable data may reduce work while keeping those contracts.

## 3. Evidence status and relevant history

The prior review traced actual source, callers and tests. It did not run Obsidian, profile the maintainer's machine, or execute repository verification. Its findings establish expensive mechanisms and plausible amplification, **not their ranking in the reported incident**. Re-rank using measured Windows evidence. The subsequently supplied Mac report in section 3.1 now supplies the first concrete reproduction target; it is a diagnostic capture, not a CPU profile or a validation pass.

Relevant context:

- [#195](https://github.com/zsviczian/kplex/pull/195) is merged. It owns device-specific startup admission/strategy, not a demonstrated CPU-efficiency fix. Desktop defaults to Eager/preparation before a view; missing device fields do not inherit the retired global mode. Capture the effective session policy, not just the stored legacy `indexingMode` field. Preserve explicit saved choices.
- [#192](https://github.com/zsviczian/kplex/issues/192) records content-cache memory measurements and the accepted decision to retain the Vault API. Memory retention is separate from repeated CPU work.
- The support report originally supplied in [#197](https://github.com/zsviczian/kplex/issues/197) records five global host-inventory attempts, four cancelled before the successful fifth; approximately 293.9 seconds accumulated in host-metadata comparison, 209.4 seconds in node vocabulary, and 582.9 seconds for source-vocabulary hydration. These are await-inclusive elapsed observations with overlapping phases, changed inputs and other plugins, not CPU measurements or an unchanged-vault benchmark. Do not add overlapping phase times. #197's actual styling defect was fixed in #200; the report is background evidence only.
- [#198](https://github.com/zsviczian/kplex/issues/198) is a separate tablet-rendering report. Do not claim to fix or close it from Windows indexing results.

The old root handoff concerned completed #197 work. Its durable result remains in `docs/validation/lens-color-stacking-197-2026-10-21.md`. This assignment replaces that transient body without reopening it or copying private runtime receipts.

### 3.1 Priority evidence from the maintainer's Mac report

**Provenance:** maintainer-supplied `Pasted text.txt`, generated at `2026-10-21T19:21:05.837Z`, K-Plex 0.2.1, Obsidian API 1.14.4, macOS desktop, Eager / background URLs / Responsive pacing. Original attachment SHA-256: `e9b23bd7e1dfa4330f6407529861dc15898e3d4d67c4300624745074d5ddf227`. The attachment is not assumed available in the agent's checkout; the decoded observations below are self-contained. The report supplies a version, not a commit or installed-artifact hash, so do not assert exact binary equivalence to the reviewed baseline. No private vault content is needed for reproduction.

#### Observed sequence and current state

| Session-relative observation | Report value |
| --- | --- |
| Fresh snapshot classified | About 3.4 seconds; `complete-snapshot-fresh` |
| URL background discovery complete | 53.199 seconds; ultimately 11,839 / 11,839 owners processed |
| Snapshot restore complete | 84.502 seconds; `full-snapshot`, one attempt, no recorded first failure |
| Restore delta | `complete-restored`: added 0, removed 0, modified 0 |
| Full rebuild admitted | 86.335 seconds; decision recorded 1.832 seconds after `complete-restored` |
| Exact decision reason | `full-rebuild:startup:post-initial-backlog\|vault:create\|vault:create-markdown` |
| Full rebuild complete | 115.529 seconds; elapsed 29.194 seconds |
| User-facing readiness milestone | `strict-ready` at 115.793 seconds |
| Second global source-inventory pass starts | 115.906 seconds |
| Capture | 1,669.396 seconds after startup (27 min 49.396 sec) |
| Still-active source inventory | Elapsed 1,553.490 seconds (25 min 53.490 sec) |
| Still-open phase | `source-reconciliation`, elapsed 1,410.149 seconds (23 min 30.149 sec) |

At capture, status is `upToDate: true`, `phase: ready`, 11,839 / 11,839 files, and an authoritative graph of 110,464 nodes. Source acquisition is still active with one repository writer and one background scheduler owner; URL, hydration, requested-semantic and gate task indicators are inactive at that instant. **Graph readiness does not mean all source/persistence work has drained.** Preserve the usable graph while addressing the continuing work; do not solve the discrepancy by blocking readiness or interaction until global source closure.

| Source-acquisition/session counter | Value |
| --- | ---: |
| `checked` | 10,190 |
| `vaultReads` / `parses` | 10,191 / 10,191 |
| `reusedBodies` / `legacyBodies` | 0 / 0 |
| `repaired` / `resolutionRefreshes` | 10,189 / 0 |
| `sourceInventoryPasses` / `fullBuildStarts` / `nodeCatalogStarts` | 2 / 1 / 0 |
| `completeSnapshotSaves` | 1 |

| Source-repository diagnostic | Value |
| --- | ---: |
| `activated` / `unsaved` | 9,468 / 722 |
| `chunksWritten` | 37,980 |
| `bytesWritten` | 59,459,315 (about 59.5 MB) |
| `familiesReused` | 0 |
| `readFailures` and all `familyFailures` | 0 |
| `lastReason` | `cancelled` |

Interpretation limits are mandatory:

- Durations are await-inclusive elapsed observations, not CPU time, continuous CPU activity or proven foreground timings. Do not add overlapping phases. The open phase duration is separate from completed phase aggregates.
- Acquisition counters are operations, not unique notes, and omit parsing performed through other callers. The current session has one cancelled source-inventory pass followed by one active pass, not evidence of a continuous restart storm. The cancellation coincides with full-build admission, whose baseline path deliberately pauses inventory; verify causality rather than treating that cancellation as another defect.
- Older persisted `cold-progressive` / `hydration-stalled` decisions predate this session. Do not combine them with session counters as one uninterrupted execution.
- At the reviewed baseline, `SourceRepository.getDiagnostics()` reports `activated` from `knownHeads.size` and `unsaved` from the current unsaved-source set. Neither is a lifetime success/failure count. `bytesWritten` is payload accounting, not measured physical disk traffic. Zero read failures does not prove all writes succeeded; one last-reason value cannot explain all 722 unsaved owners.
- A complete graph snapshot does not prove that every neutral source/body cache is present or valid. Legitimate missing/old facts remain an alternative explanation for reconstruction. Zero body reuse does not prove that the same exact source revision was parsed twice.

#### First three investigation and implementation priorities

**P1 — Explain the post-restore rebuild admission.** Trace [`main.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/main.ts), including `finishStartupIndexPreparation()`, the pre-restore reason/path records, captured inventory revision and normal rebuild/patch selection. Correlate the create backlog with actual event type, native identity, captured snapshot membership and the event's position before/after the restore boundary. Distinguish initial file-discovery notifications or already-covered events from genuine new files/folders/attachments, replacements and changes arriving during restoration. The zero restore delta is a clue, not permission to erase the backlog. If already-covered events cause the rebuild, suppress only that proven redundant work. Preserve the existing regression that queues genuinely outstanding startup work after initialization.

**P2 — Explain zero body reuse during prolonged reconstruction.** Add bounded reason counters at reuse decisions: observed body edit, `created` identity, missing/tombstoned head, physical-stat/incarnation mismatch, parser-version mismatch, missing parsed-body entry, unsaved masking, and cancellation/supersession. Trace [`sourceAcquisition.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/adapters/obsidian/sourceAcquisition.ts) (`start`, `needsBodyRead`, `readBody`, `loadBody`, `acquire`) alongside [`GraphIndex.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/index/GraphIndex.ts) (`rebuild`) and [`GraphBuilder.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/index/GraphBuilder.ts) (`collectMarkdownSources`).

The baseline create handler marks sources `dirty`, `bodyDirty` and `created`, and allocates an identity. `readBody()` refuses body reuse while body-dirty, and `loadBody()` also skips the parsed-body cache then. Full graph rebuilding intentionally uses `build({ acquireSources: false })`, leaving durable acquisition to inventory. **Hypothesis to test:** current full parser output obtained during rebuilding is subsequently rejected because the source still carries dirty acquisition state, leading to repeated work. Prove duplicate work per exact file identity/event/physical revision/parser version across full-build, URL and source callers. If confirmed, share the current complete parsed input through the existing bounded owner without granting source durability, resolution readiness or semantic authority. Do not clear dirty flags merely because the graph is ready or mtime matches, and do not put per-note durable writes back on the foreground/full-build critical path.

**P3 — Explain unsaved persistence and the long source-reconciliation tail.** Trace [`SourceRepository.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/index/SourceRepository.ts) diagnostics, replacement, unsaved retention, deletion, retry and dependency-completion paths. Count entry/exit reasons and retry outcomes for the current unsaved set; separate storage faults, backpressure, cancellation, pending retirement and masked/evicted inputs. Measure parsing, staging, validation/hashing, transactions, dependency work and waiting separately. Establish whether the 722 entries converge after events settle and whether they trigger redundant work or prevent closure. Do not relabel unsaved data as durable or discard masks to make the queue disappear.

These priorities take precedence over a speculative adjacency/evidence redesign for this incident. The capture records one full rebuild and zero node-catalog builds; the static cold/progressive findings remain relevant to their own measured workloads. A secondary warm-start profile should retain the 81.128-second hydration operation: pages 57.369 seconds, preview-search 11.971 seconds, relations 7.399 seconds and evidence 4.242 seconds, all await-inclusive. Do not infer a CPU hotspot from those phase names alone.

#### Focused reproduction and acceptance additions

Use the existing disposable Windows vaults. Compare plugin reload and full-process startup with a validated fresh graph snapshot, first with valid neutral/body caches and then with deliberately incomplete test-owned source facts. Include initial create notifications, a genuine create after inventory capture, same-stat edits and replacement/rename/delete events. Capture only bounded test-owned event identities; use aggregate reasons in published reports.

Required outcomes for a fix in this sequence:

- A healthy unchanged warm restore with already-covered startup events does not trigger an unjustified full rebuild. Genuine uncovered changes still reconcile through the correct current route; uncertain topology retains its safe fallback.
- A current complete parse can be reused across build/URL/source consumers when its exact lifetime is valid, while an intervening same-stat edit or recreated identity rejects it. Reuse does not certify source persistence or promote partial graph authority.
- Unsaved-source reasons and recovery are observable and converge under a healthy, quiescent fixture. Storage-degraded cases remain explicitly non-durable with bounded retries; a permanently unavailable store is not required to claim success.
- A benchmark continues after `strict-ready` through source/URL/persistence drain and an equal idle tail. Foreground navigation, edits, tags, folders, aliases/search and gate coverage stay correct during that tail. Report CPU and queued work at readiness and at real completion separately.

## 4. Static findings: mechanisms, qualifications and probes

All source links below are pinned to the accepted baseline. Read the complete methods and current tests before editing; a method name identifies the owner, not permission to bypass its callers. Section 3.1 defines the first reproduction target; these broader hypotheses remain available for subsequently measured bottlenecks.

### A. Whole-vault validation can lose progress on local events

**Source-confirmed mechanism:** [`sourceAcquisition.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/adapters/obsidian/sourceAcquisition.ts), particularly `start`, `markContributorHostChange`, `reconcile`, `reconcileRestartHostInventory`, `reconcileKnownImpacts`, `noteResolverWaveCause` and `consumeKnownResolverWave`.

`reconcile()` captures `inventoryRevision`; known source events advance it. Vault modify and metadata-changed observations can represent successive phases of one underlying edit. A broad pass then returns non-current. `restartInventoryChecked` becomes true only after the restart comparison closes, so an interrupted comparison can be repeated from its beginning. The 350 ms request timer coalesces admission, but does not itself preserve the validated prefix.

After local dependency authority closes, known edits can use local maintenance. **Do not describe every edit as a guaranteed vault scan.** The costly case is broad startup/recovery before that local route is available, plus genuinely global uncertainty.

Known resolver-wave coverage expires after 50 ms. An uncovered/expired/additional resolver close can select global uncertainty. This is a timing-sensitive path: do not assume Windows and macOS produce identical event sequences. The existing guard protects against treating unrelated resolver activity as a known change.

**Probe:** distinguish global pass start/cancel/end, actual phase, files/families visited before cancellation, revision/cause, and repeated unchanged-owner visits. Exercise a finite burst of known edits during restart and controlled late/extra resolver closes. Measure runtime amplification without inventing an infinite-loop diagnosis.

**Candidate resolution:** retain completed work for provably unchanged owners and drain known changed owners/proven dependants before a final consistency boundary. Use existing per-owner revision/dependency state and bounded continuation. Unknown resolver/topology changes must remain conservative. Prove offline alias/path drift and equal-stat events are still detected. An unchanged prefix may be reused only while its captured dependencies remain valid. Convergence is required after the finite event stream settles; perpetual edits cannot be promised global readiness.

**Impact hypothesis:** highest priority if failed broad attempts consume a substantial share of CPU. Do not merely lengthen debounce/expiry or ignore events.

### B. Warm-cache reads repeat storage coordination, validation and compilation

**Owners:** [`SourceRepository.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/index/SourceRepository.ts) (`inspect`, `pin`, `visitFamily`, `readSelected`, `selectionReason`, `ensureLocalDependencies`, `releaseLeases`); [`sourceAcquisition.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/adapters/obsidian/sourceAcquisition.ts) (`durableHostInventory`, `captureForReplay`, `replayNodeMetadata`, `environment`); [`GraphBuilder.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/index/GraphBuilder.ts) (`buildSourceNodeCatalog`).

Restart host comparison inspects heads/dependency owners and reads the metadata family. A family read pins immutable revisions, fetches chunks/postings, decodes/validates frames, hashes contents and postings, then releases leases. Selected readers also recheck selected heads. The next inventory phase re-examines sources. Source-backed vocabulary recovery replays all four families per Markdown owner through the canonical compiler even though its output retains nodes rather than full incidence.

The previous estimate of 100,000 transaction boundaries for 20,000 owners at five boundaries each was illustrative arithmetic. **Measure actual transactions/requests; do not equate either with physical disk reads or flushes.** Cheap head-only paths and prior decode coalescing already exist and must remain.

A secondary hot-loop candidate is the `captureForReplay()` validity predicate: `environment(cache)` enumerates Date-property names, sorts and serializes the environment. Repeated record-level checks can reconstruct an identical descriptor. Count calls/encoded bytes and profile before changing it. Keep full value checks where unannounced host changes could otherwise slip through.

**Probe:** family visits and decoded/hashed bytes per exact immutable family revision; readonly/readwrite transactions and lease mutations; selected-head validations; owner/node-catalog passes; environment serialization calls. Attribute native storage/crypto and renderer CPU separately from time waiting for admission or I/O. Avoid a new whole-vault diagnostic mirror.

**Candidate resolution:** use bounded batch reads where compatible; share exact authenticated immutable data within a bounded operation/session; reuse phase results and unchanged environment observations at safe boundaries. Cache the validated payload or a capability tied to that exact payload, not a bare boolean used to bless newly reread unchecked bytes. Bound retention in bytes and test eviction, multi-connection writers, leases, same-stat edits, parser/version changes, cancellation and corruption. Final publication still checks live selection/host/policy/demand.

Investigate whether recovery repeatedly reconstructs global vocabulary because the current usable result never becomes a reusable accelerator. Do not persist a partial graph as complete. Any new persistent projection/schema is a separate design decision; first exhaust reuse within existing owners and formats.

### C. Progressive ingestion can copy growing adjacency and repeatedly compact accumulated evidence

**Owners:** [`GraphBuilder.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/index/GraphBuilder.ts) (`PatchOverlayMap.get`, `cloneGraphPage`, `patchMarkdownFiles`, `compactPublishedPatchLayers`, `commitPatchState`); [`evidence.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/core/graph/evidence.ts) (`forkForPatch`, `compactOrdinaryPatchCooperative`, `compactSparseOverrides`, `compactCooperative`); [`GraphIndex.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/index/GraphIndex.ts) (`rebuildProgressively`).

The ordinary page clone uses `new Map(page.neighbours)`. The staging map clones on read. Patching a source can touch high-degree target pages and resolve both directions; that can copy a target's whole adjacency for a small delta. The private URL lane already has specialized adjacency ownership and delta adoption; ordinary Markdown cloning does not automatically inherit those guarantees.

For one hub growing by one neighbour per patch, copied entries are `N * (N - 1) / 2`: 499,500 at 1,000 owners, 31,996,000 at 8,000, and 199,990,000 at 20,000. A preloaded degree-N hub copied for each of N owners gives N-squared entries. These are conditional workload models, not proof that all graphs follow that shape.

The earlier isolated Linux/x64 Node 22.16.0 probe reproduced the ordinary clone branch, not the plugin: median elapsed times over three samples were 34.70 / 137.29 / 426.24 / 2461.74 ms at 1k / 2k / 4k / 8k owners. It demonstrates this operation's cost shape only. It used neither the acceptance Node version nor Obsidian and supplies no native performance pass. The implementing agent must measure production methods on Windows; the chat's two probe attachments are optional supporting material, not assumed checkout files.

Evidence maintenance has an eight-layer threshold. Sparse compaction permits at most 32 changed pairs with further record/string bounds and excludes several cases. When a progressive workload repeatedly exceeds that allowance, the full compactor traverses accumulated pairs/declarations and reconstructs the store. Eight new distinct pairs per source over 20,000 sources yields approximately 199.92 million surviving-pair visits in an illustrative eight-patch growing model, excluding other work. **That figure is arithmetic, not an execution measurement of the compactor.** Real threshold/adoption behavior must be counted.

`rebuildProgressively()` ingests through ordinary `patchMarkdownFiles(... discoveryMode: "rebuild")`, deliberately applying sources to the fresh baseline instead of suppressing them with an old fingerprint. Existing semantic-no-op optimization is useful but does not remove this bulk case. The tests deliberately protect sparse fallback, insertion order and retained generations: [`sparse-evidence-compaction.test.mjs`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/tests/sparse-evidence-compaction.test.mjs).

**Probe:** count actual clone calls and entries copied, evidence forks/full/sparse compactions and pairs/declarations traversed. Use production code with sparse, hub/tag-heavy and many-distinct-pair fixtures at N/2N/4N. Count failed/cancelled work as well as successful output. Show both startup-route frequency and end-to-end CPU share.

**Candidate resolution:** separate efficient bulk accumulation from ordinary small-edit patching, or extend bounded delta staging under proven private ownership. Reuse the canonical compiler and preserve the current foreground preview/edit path. Never put all interaction behind one private full-vault build. Prefer a narrow per-owner/batch change over replacing the entire graph representation. Do not solve an O(N-squared) workload by merely raising overlay limits or retaining longer chains. Preserve iteration order, declaration IDs/multiplicity, deletion/re-add semantics and snapshots held across awaits.

### D. URL-first acquisition can discard reusable full parser output

**Owners:** [`GraphIndex.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/index/GraphIndex.ts) (`startBackgroundUrlIndex`, `parseUrlOwnerBody`, `refreshUrlOwner`, `persistUrlOwner`); [`MetadataParser.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/index/MetadataParser.ts); [`sourceAcquisition.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/adapters/obsidian/sourceAcquisition.ts) (`loadBody`).

An uncached URL owner is read through `cachedRead()` and parsed by the full canonical parser. `refreshUrlOwner()` reduces the result to URLs and URL-bearing inline occurrences, then stores that compact representation. That path does not retain the original complete parse in the ordinary parsed-body cache. A later semantic consumer can miss its own accepted inputs and parse again. Warm caches/foreground-first acquisition can avoid this, so measure it per exact source revision.

**Probe:** instrument total `MetadataParser.parse()` submissions and input bytes at the shared entry, with caller/lane and exact revision in bounded test-only state. Source-acquisition counters alone omit independent URL parses. Verify URL-first, semantic-first, concurrent foreground demand and an intervening same-stat edit.

**Candidate resolution:** reuse the original complete `body` through the existing bounded, versioned cache/acquisition mechanism before deriving `urlBody`. Never store the URL-filtered projection as complete parser output: it lacks non-URL inline fields. Fence queued writes against file identity, event revision and parser version. Preserve the cache's actual key/format validity; do not bless a result solely because its mtime still matches.

Completed-result sharing is simpler than a new single-flight job service. A foreground request must never join a lower-priority job paused behind its own lease. If in-flight deduplication is necessary, prove priority escalation/cancellation and unload behavior rather than assuming one shared Promise is safe. Count added cache-write CPU/bytes against the saved parse cost.

### E. Cooperative responsiveness is distinct from total CPU efficiency

**Owners:** [`ForegroundWorkScheduler.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/index/ForegroundWorkScheduler.ts), [`MetadataParser.ts`](https://github.com/zsviczian/kplex/blob/551a3b52895484de3dd41e5c6eb2fa8c6712fec4/src/index/MetadataParser.ts), and URL/source/storage publication callers.

The scheduler's responsive background window is 6 ms work / 24 ms idle at cooperative checkpoints; it is not a process-wide CPU cap. The worker path posts complete parser jobs and does not call the renderer's checkpoint during a synchronous worker parse. Native database/crypto activity and allocation/GC can continue outside those slices. Existing priority leases also span awaited work, so separately measure time waiting for higher-priority tasks; it is not itself consumed CPU.

**Probe:** renderer plus parser-worker samples, native storage/crypto where available, total process CPU, queue/backlog sizes, GC/allocation and time-to-quiescence. Check idle-with-Plex-visible and idle-with-Plex-hidden to distinguish rendering from indexing. A heartbeat alone measures event-loop delay, not actual paint.

**Candidate resolution:** first remove repeated work identified in A-D. Only then consider narrow backpressure at existing job/byte admission boundaries if residual sustained load remains. Keep P0/P1 interaction responsive, fair background progress and bounded completion. More sleeping, more workers or moving the same work between threads does not establish CPU reduction.

## 5. Windows observation protocol

### 5.1 Environment and harness safety

Read `AGENTS.md`, `CONTRIBUTING.md`, `docs/ARCHITECTURE.md`, `docs/INDEXING_ARCHITECTURE.md`, `docs/SOURCE_REPOSITORY.md`, `docs/OBSIDIAN_RUNTIME_TESTING.md` and relevant existing tests. Some historic optimization handoffs imposed narrower scope restrictions; do not repeat old experiments blindly. This assignment targets measured amplification while retaining accepted correctness contracts.

Use the already prepared `C:\Obsidian\kplex-test-small` and `C:\Obsidian\kplex-test` only after verifying actual identity and contents. Follow the three explicit vault variables and CLI-reported-path preflight. Use `Obsidian.com`, existing `obsidianCliExecutable()` / `spawnNativeSync()` / `runPortableVerification()` helpers and Node argument arrays. Check installed CLI help rather than inventing commands. Reacquire plugin/index references after every reload.

Record commit, dirty diff/patch identity, built/installed artifact hashes, Node/Electron/Chromium/Obsidian/installer versions, fixture counts/bytes/degree distribution, enabled plugins/theme, effective device/session strategy, throttle and display settings. Build and stage serially. No deployment or mutation in a personal/default vault. Preserve configuration/workspace/notes and clean up owned fixtures even on failure. No new vault/destination without the required consent; use existing prepared resources meanwhile.

Use Synthetic-Scale-v2 for scale acceptance and record its actual counts/large-file fraction. Add small owned stress fixtures through the existing test approach; never overwrite a prepared fixture or mix v1/v2 timings. Cache-cold runs may reset only verified test-owned caches through the controlled disposable setup, with a restorable baseline. Do not purge a global profile or use cache deletion to conceal a validity bug.

An always-on computer is not necessarily an active foreground renderer. Record visibility/focus, lock/sleep/occlusion and any throttling changes throughout. Separate realistic hidden/locked tests from foreground comparisons. Do not disable OS security, lock policy or antivirus. Runs with changed visibility/power/remote-session conditions remain labeled and are excluded from comparable performance claims. If foreground automation cannot run while locked, continue portable/scaling/background tests and leave that foreground gate pending.

### 5.2 Measure completed work and CPU, not just an indicator

Primary metric: **cumulative CPU-seconds for the same completed workload**. Sample identified Obsidian processes, track PID plus creation time, and account for process births/exits/restarts. Sum user+kernel CPU once per process; worker threads already included in their process totals must not be added again. Keep per-renderer/worker profile attribution separate from the summed process metric. Include storage/utility/browser process cost where measurable and document any missing coverage; JS self-time alone is insufficient.

Use capability-checked Electron `cumulativeCPUUsage` when available in the installed runtime, or Windows process CPU accounting through test tooling. Never add a permanent Electron/debug-global production dependency. Percentage averages are secondary; record the normalization. Electron's Windows `idleWakeupsPerSecond` is documented as zero and is not evidence of no wakeups.

Report `sum(delta CPU seconds) / elapsed seconds` as average cores used; multiply by 100 for a one-core-equivalent percentage. Hardware-normalized percentage additionally divides by logical processor count. Do not compare raw Task Manager and Activity Monitor percentages. Use same-machine paired before/after comparisons; report raw process totals and an optional matched K-Plex-disabled control separately rather than claiming perfect plugin attribution by subtraction.

Start measurement before the admitted workload. End only after the same required coverage, URL/source work, persistence and queued tasks have settled, then include an equal idle tail. Use route-specific completed-work criteria: an On-demand session need not become a globally authoritative full graph. Also report fixed-horizon CPU and backlog so moving work outside the window cannot look like a gain. A cancelled or unfinished run is a failure/incomplete observation, not a faster completion. Bound each run and retain partial evidence on timeout.

Run cheap counters first; collect bounded sampling profiles on selected reproductions. Do not stack full tracing, heap snapshots and all probes into the performance run. Measure instrumented-versus-uninstrumented overhead, avoid per-record console logging and unbounded path maps, and validate final production builds with debug capture disabled. Keep raw private traces local; publish aggregate numbers and sanitized excerpts only.

### 5.3 Required work ledger

| Measure | Required interpretation |
| --- | --- |
| Global pass attempts, phase and completion/cancellation causes | Separate source inventory, full graph builds, node vocabulary, URL inventory and snapshot hydration. |
| Unique owners versus repeated unchanged-owner visits | Detect work discarded or replayed during one workload; use bounded test-only identities. |
| All parser submissions and bytes by exact revision/caller | Include worker/fallback and URL/semantic consumers; distinguish legitimate new revisions and failed/cancelled retries. |
| Body-reuse rejection and unsaved entry/exit reasons | Separate legitimate missing/stale input from dirty-state reuse failure; explain persistence recovery rather than relying on a last-reason scalar. |
| Readonly/readwrite transactions, requests, leases, family visits, decoded/hashed/written bytes | Distinguish coordination from I/O latency; do not sum overlapping await-inclusive spans as CPU. |
| Clone entries, evidence forks/full/sparse compactions, pairs/declarations traversed | Identify quadratic work and its share on real routes. |
| Foreground action latency, first useful preview, current edit publication, tag/folder/search availability | Protect responsiveness and result completeness throughout indexing, not merely at final idle. |
| Queue peaks, retained bytes/process memory, GC and idle activity | Reject speedups that trade for unbounded memory, starvation or continuous maintenance. |

The ranked result must contain: hypothesis, reproducing scenario, actual CPU/operation evidence, confidence, projected removable work, smallest proposed change, risks and a regression test. Inclusive profiles must not double-count nested functions. If no candidate explains most CPU, sample the remaining renderer/native path before speculative changes.

### 5.4 Scenario matrix

| Scenario | Required comparison |
| --- | --- |
| Priority fresh-restore sequence | Reproduce section 3.1 before broad redesign: fresh snapshot, create backlog, full-build admission and post-ready source work. Compare valid versus missing neutral/body caches and covered versus genuine later events. |
| Unchanged warm restart | Eager and On demand separately; effective startup-before-view policy recorded; no-view and same-visible-center runs. Distinguish plugin reload from a full Obsidian process restart. |
| Cold indexing and source-backed recovery | Empty owned cache versus valid neutral facts with absent/stale graph accelerator; URL-heavy, sparse, common-hub/tag and many-distinct-pair fixtures. Preserve coverage and early usability. |
| Event churn during startup | Finite known edits plus metadata waves, same-stat edits, late/extra resolved closes, rename/delete/recreation and a qualified empty-folder create. Record revisited work and convergence after quiescence. |
| Foreground interaction under load | Navigate rapidly, edit/relink, search, center folders/nested tags/URL nodes, then return to prior centers. Include unrelated edits, scrolling/pan/zoom/hover and live incoming updates. |
| Settled session | Matched visible/hidden idle windows, one local edit, then idle again. No recurring global work without a justified event or configuration change. |

For the selected expensive scenario, obtain at least three paired runs, preferably five, from matched source and cache states. Alternate baseline/candidate where practical; report medians, dispersion and every cancellation/failure. Do not let a candidate's warmed/migrated cache contaminate its baseline comparison. Include N/2N/4N operation-count scaling with unchanged per-note content/degree rules.

## 6. Implementation sequence and decision gates

- [ ] **O0 — Baseline and protection.** Verify branch/artifacts/environment, characterize current semantics and interactive behavior, reproduce section 3.1's post-restore sequence and capture its post-ready work plus settled idle. Add a failing characterization/regression for the first confirmed amplification.
- [ ] **O1 — Rank measured causes.** Produce the CPU/work ledger. Investigate post-restore rebuild admission, body-reuse rejection and unsaved-source recovery first (section 3.1 P1-P3). A/B remain broader warm/restart candidates, C cold/dense construction, and D URL parse sharing; measured evidence may change the order.
- [ ] **R1 — Fix the largest demonstrated contributor.** Make one independently reviewable change inside its existing owner. Run its correctness/race tests and the same native A/B workload before stacking another change.
- [ ] **R2 — Remove remaining material amplification.** Proceed to the next measured contributor only while the regression gates remain green. Count extra cache writes and memory introduced by reuse. Do not implement every hypothesis merely because it appears here.
- [ ] **V — Complete verification.** Run pinned-runtime portable/build checks, exact-build Windows host checks, scale/idle measurements and cleanup. Independently review final diff and production instrumentation state.
- [ ] **D — Return evidence and recommendation.** Update this transient body with actual findings/results, store sanitized durable validation and accepted architectural decisions in their designated locations, update the existing draft PR within publication authority, and retain all unresolved gates. Remove the temporary plan-only marker before final review.

**Engineering objective:** target at least a **50% reduction in end-to-end CPU-seconds** on the reproduced dominant expensive indexing workload, at equivalent coverage/settings and without worse interactive behavior. Seek order-of-magnitude reductions in specific redundant-work counters where A/C expose amplification. These are investigation targets, not measured results or permission to force unsafe changes. Report the achieved reduction honestly; a small local speedup does not satisfy the stated ambition. A safe partial improvement may be returned with the remaining bottleneck and target shortfall explicit.

Before comparing candidates, fix the latency/memory/completion tolerances from the baseline and existing strict tests. Preserve all existing deadlines; do not relax them after a miss. As an additional screening rule, investigate any reproducible p95 interaction regression beyond both 10% and 20 ms, and any new long main-thread stall, delayed node-kind availability or memory/backlog growth. This screening rule does not permit smaller functional regressions. Report insufficient sample counts rather than pretending p95/p99 are stable from a few actions.

Required operation-level outcomes for implemented fixes:

- Known finite local changes do not repeatedly discard unrelated validated startup progress; unknown changes still take a safe route and eventually converge.
- Stable exact source revisions do not undergo avoidable duplicate completed parsing solely because URL and semantic consumers both need them. Cancellation, parser changes and genuine events remain explicit exceptions.
- In the corrected bulk path, unchanged accumulated adjacency/evidence is not recopied at every source or fixed tiny patch epoch. Demonstrate improvement with actual production counters and scaling, not only the isolated arithmetic model.
- Reuse is bounded and revision-safe. Foreground work never deadlocks behind a background operation that it preempts. All queues make progress and drain after demand/events settle.
- After completion, the enabled plugin returns to matched near-baseline idle activity with no unjustified repeated global passes.

If a candidate fails semantics/interaction, repair or revert that candidate; retain the failing trace. Do not compensate by disabling tags/folders, reducing counts, hiding unknown coverage or adding another fallback/retry loop. Fundamental storage/trust/schema redesign stays a documented follow-up decision rather than an unreviewed expansion.

## 7. Validation gates

### Semantic and lifecycle parity

Capture matched baseline/candidate results through the canonical owners, at equivalent coverage. Full oracles must wait for their required authoritative state; partial previews must be compared as partial previews. Compare roles, direction, visibility/hidden decisions, provenance and declaration multiplicity, aliases/search results, shared URL origins, tag hierarchies, direct folder contents and gate counts. Normalize generated IDs only where existing oracle rules permit it; do not normalize away order/multiplicity defects.

Fault and race coverage must include source replacement while reading, same-stat edits, deletion/recreation, offline alias/path changes, unrelated changes during a long pass, invalid/missing chunks/postings, concurrent selected-head changes, storage degradation/recovery, parser upgrades, settings changes, demand release, multiple views/popouts and unload. Retained readers must see coherent state; no stale file resurrection, incorrect empty proof, missing shared node or unbounded queue is acceptable.

### Interactive acceptance while indexing runs

Use the existing native interaction harness, not just direct method calls. Assert current-node preview and navigation remain usable before global closure; typing and graph edits update while background work continues; folder and nested-tag centers remain reachable with correct children; URLs progressively gain referrers/aliases; attachment/ghost materialization remains correct. Preserve search vocabulary and numerical coverage independent of node limits. Pan/zoom/hover and style-only changes must not create semantic rebuilds. Main window, popout and Sidecar/document-follow behavior must retain their current ownership.

### Existing executable checks

Use pinned Node 22.22.2 and real installed Obsidian typings. Commands below exist in the baseline `package.json`; inspect their preconditions and fixture requirements in `CONTRIBUTING.md` before running. They are planned, not completed here.

- Portable acceptance: `npm run verify` (release/architecture/core/lint/tests/real build). The source and real-IndexedDB lanes are included; use `npm run test:sources` and `npm run test:sources:browser` for focused iterations.
- Exact-build deployment/smoke: `npm run verify:obsidian` on the explicit disposable vault, with build hashes checked.
- Core native protection, serially: `npm run verify:obsidian:foreground`, `npm run verify:obsidian:startup-admission`, `npm run verify:obsidian:ontology-startup-updates`, `npm run verify:obsidian:interaction-updates`, `npm run verify:obsidian:interaction-gates` and `npm run verify:obsidian:folder-wave`.
- For changed source/cache/publication paths: `npm run verify:obsidian:si4`, `npm run verify:obsidian:si5` and relevant rename/date/section/Excalidraw lanes. Use `npm run verify:obsidian:rename`, `npm run verify:obsidian:date-properties`, `npm run verify:obsidian:sections`, `npm run verify:obsidian:interaction-excalidraw` where affected and prerequisites are present. Do not run destructive fault setup against the wrong vault or present a prerequisite skip as a pass.
- Existing focused suites include `tests/source-acquisition.test.mjs`, `tests/source-startup-indexeddb.test.mjs`, `tests/source-folder-wave.test.mjs`, `tests/source-priority-indexeddb.test.mjs`, `tests/foreground-startup-indexeddb.test.mjs`, `tests/hydration-guards-indexeddb.test.mjs`, `tests/on-demand-indexing.test.mjs`, `tests/sparse-evidence-compaction.test.mjs`, `tests/private-compiler-evidence.test.mjs`, `tests/metadata-parser-priority.test.mjs`, URL evidence/adjacency/publication suites and `tests/noop-patch-publication.test.mjs`. Add workload-count regressions to appropriate owners rather than replacing behavior assertions with timing-only tests.
- For section 3.1, extend the existing startup-backlog coverage in `tests/indexing.test.mjs` and the source/body-cache tests: already-covered startup creates versus genuine later creates, exact parsed-input reuse across a rebuild without source acquisition, same-stat invalidation, and bounded unsaved recovery. Preserve the existing outstanding-backlog test rather than deleting its scheduling expectation indiscriminately.

Do not interpret earlier accepted Windows or mobile results as validation of this change. The previous handoff recorded an intermittent existing watchdog cleanup assertion and a subsequent complete pinned-runtime pass; a recurrence must be investigated/reported without weakening its assertion. Implementation changes after a run invalidate affected evidence.

## 8. Return package and current completion record

Return a compact measured baseline-versus-candidate table per selected scenario: exact artifact/cache/fixture identity, CPU-seconds, elapsed-to-equivalent-completion, fixed-horizon backlog, preview/tag/folder/search readiness, interaction distribution, reads/parses/bytes, global attempts/revisits, transactions/family validation, clone/compaction counts, memory and idle tail. State which source hypotheses were confirmed, rejected or left unmeasured and why. Explicitly answer section 3.1's three questions: which events justified the post-restore rebuild, why body reuse was rejected, and what caused/recovered the unsaved-source set.

Document each accepted change's owner, reason, removed work, retained invariants and real tests. Keep sanitized durable results in a focused `docs/validation/` report and link accepted architecture implications from `Refactor plan.md` when warranted. Raw personal paths/content and full profiles stay local with hashes and relevant excerpts. No release notes or broad refactor ledger claims before acceptance.

Current preparation evidence:

- Repository identity/read-write access and current `main` checked; no open PR existed at preparation time.
- Branch created from the exact baseline; prior static-review-to-baseline comparison checked, with no indexing-source changes.
- Repository workflow, existing handoff and validation commands inspected. Static findings are hypotheses about impact, with source-confirmed mechanisms and explicitly limited prior evidence.
- The maintainer's Mac diagnostic attachment was parsed against its embedded column definitions; the session timeline, counters and report hash in section 3.1 were checked. This changes investigation priorities, not acceptance status or proof of a root cause.
- No runtime implementation, repository tests, Obsidian deployment, Windows profile or measured CPU reduction performed by this preparation agent. All O0-D implementation/validation boxes remain pending.

The equipped agent should work through the bounded sequence with evidence checkpoints. Safe independent investigation/implementation can continue without waiting for minor clarifications. A missing environment or unresolved correctness decision must be recorded, not hidden behind a benchmark or substituted with an unrelated redesign. Keep the PR draft and return a truthful partial result if a required gate cannot be completed.

### External measurement references

- [Electron CPUUsage](https://www.electronjs.org/docs/latest/api/structures/cpu-usage): optional cumulative CPU seconds and interval-dependent percentages; Windows wakeup field limitation. Verify availability on the installed Electron version.
- [Electron ProcessMetric](https://www.electronjs.org/docs/latest/api/structures/process-metric): PID plus creation time for process identity.
- [Microsoft GetProcessTimes](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-getprocesstimes): summed process-thread user/kernel CPU time, distinct from elapsed time.
- [Obsidian CLI](https://help.obsidian.md/cli): Windows console launcher and current command documentation; use installed help and the repository's tested harness.