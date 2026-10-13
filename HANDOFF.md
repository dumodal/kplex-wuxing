# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---
# PR #153 — first measured indexing increment returned for review

State: returned for maintainer review. Implementation, local source review and available automated/native checks are complete for this bounded increment. All changes remain uncommitted; PR #153 stays draft. No merge/release or full-PR acceptance is claimed.

Identity: branch `2026-10-13-indexing-performance`, HEAD `3dec09763968f27f12a783fdad37540a4ca8a4e7`; accepted runtime base `df5335808aacfd6a11ac7ff4ef008f9406f27893`. Initial checkout was clean. Final GraphBuilder SHA-256: `b947b808d549768f162996159f1cf4203df2471a393f33e25b106d24fb5129b2`. Built/installed main.js SHA-256: `ad01f904d6c4b2111d79e87fd8e84fe541c2ae0ce7e72e592b62f9d7114d4d15`. Exact receipts and scope/limitations: [validation report](docs/validation/indexing-noop-performance-2026-10-13.md).

Scope: targeted M work-count baseline plus E1. GraphBuilder now skips unrelated evidence compaction when source fingerprints match and publishes scalar mtime/cache/field-discovery effects without cloning the source page's adjacency. Normal compaction defaults, map-depth maintenance, source acquisition, captured file/event/lifetime checks, provenance-only recompilation, canonical identity and atomic per-file publication are preserved. No new settings/schema/protocol/dependency/network/telemetry/UI or structural extraction. Related #147/#148/#149 remain separate; C15–C26 remain paused.

Measured production-method fixtures at N=256/512/1024/2048/4096: baseline copied N neighbor entries and compacted N pairs/declarations; candidate copied/compacted zero. Both used zero hot body reads/parses. This removes unnecessary maintenance, not all fingerprint/source work and not a claimed whole-engine bound.

Controlled exact-build native graph: 726 pages, 1,509 pairs, 2,078 declarations, source degree 513. Three baseline runs copied 513 neighbors and compacted the entire evidence; three candidate runs copied/compacted zero, retained both containers and performed exactly one commit, zero body reads/parses. Observed inclusive medians 76.9 ms and 23.1 ms are sequential diagnostics, not a randomized percentage/startup/paint or retained-memory claim.

Actual checks under Node 22.22.2 / installed Obsidian 1.13.0 types:
- Baseline and candidate complete `npm run verify` through `node scripts/testing/obsidian/verify.mjs`: architecture/core, official Obsidian lint, full tests and production build passed. The real-IDB source lane passed 443 tests in each run, including the existing 20,015-owner fixture.
- Final focused no-op suite: 10 passed, no failures/skips; real IDB acquisition/late-source fencing included. The file is registered in normal npm test.
- Exact-build native no-op comparison passed; source/native probes and owned note cleaned; settings/enablement bytes preserved.
- Exact-build render/no-error smoke passed in both user-authorized, CLI-confirmed vaults. Large staging reused the same hash-checked successful verification receipt, without repeating the suite.
- Existing native foreground driver passed folder/gates, navigation, link add/remove, node creation and visible edits while acquisition was held; zero broad flushes, background resumed, configuration restored, no remaining fixtures/controller.
- Source review covered canonical ownership/reuse, all compaction callers, source/event finality, metadata/cache atomicity, retained arrays/identities, TSDoc and cleanup. git diff --check passed; no test-probe prefix appears in src or dist/main.js.

The user-requested verified high-node fixture remains isolated at `C:/Obsidian/kplex-test/Indexing-performance-153`: 20,000 Markdown notes, 80,000 unresolved targets, 8,000 URLs, 259,000 source occurrences; digest `50b8cb12ef83c3cd62f1605390fe6ff793079a9f6e37e471e59d0060cf287cd0`. Existing content/settings were preserved. The whole vault has 20,088 Markdown files. Source fixture counts and render smoke do not certify complete large-vault indexing or high-hub navigation.

Recorded tool limitations: first native controller had an escaping error before side effects, corrected and syntax-prechecked; redirected PowerShell native stderr can yield shell status 1 despite successful Node completion, independently reproduced. Full verification receipts record actual passing driver/tests/build/staging; subsequent native commands explicitly propagate LASTEXITCODE. Native heap samples are uncontrolled application totals, not matched retained-heap acceptance. No guard/golden/watchdog was relaxed.

Next action: review this first checkpoint and the durable report before any publication. A–D/E2/E3, the full M startup/storage/CPU/memory/heartbeat matrix, physical devices and second desktop OS remain pending, with no inherited waiver. Highest-value manual check: repeated prose-only saves on a high-degree note, navigation and reload, then one genuine relationship edit in a disposable iOS/Android vault; expect stable semantics/cache recovery without input or memory termination regressions. This Windows environment cannot establish that device acceptance. Do not commit/push/update the PR, mark ready, merge or release without applicable maintainer authority.
