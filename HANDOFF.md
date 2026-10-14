# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# PR #153 - B3 validated; proceed with C measurement

Branch: 2026-10-13-indexing-performance. E1 1411e4b, A a162044 and B1 186406e are committed and confirmed on origin. Maintainer renewed work on 2026-10-14 without a hard deadline: commit and push after every validated checkpoint. No merge/release/PR-ready authority. Native Windows Obsidian/real Chromium/dependencies and Node 22.22.2 are available.

B3 is complete and ready to commit/push before any next production edit. Compiler-local URL alias membership: 4,096-owner optional vocabulary includes entries 8,390,655 to zero, membership seed entries 8,394,751 to two. Exact ordered graph/evidence/IDs match. Final paired native engine median 255.8 to 36.1 ms; single-label control 24.3 to 24.9 ms (no meaningful gain/regression established). These are prepared-input compiler timings, not whole startup. Full verify:obsidian (464 browser source tests), focused 42, native installed publisher and six foreground cases passed; zero broad flushes, reads/parses and owned resources. main.js d421681740293b6863bbcdc9d5ad2f5ceebc9469ad5d7877ff9cc60f241318d2. Report/receipts: docs/validation/indexing-url-alias-membership-2026-10-14.md.

Next independent C measurement is prepared in untracked scripts/testing/saved-preview-url-work.mjs and tests/support/savedPreviewUrlFixture.mjs. Do not include those two files in the B3 commit. They are not yet run: full verification/native timings were serialized. Run the baseline after committing B3, fix fixture issues, then implement independent saved-preview restoration only with measurements and all #153 C acceptance. Existing restorePersistedSnapshot waits for shared URL replay. Audit found independent urlSearchEntries survive optional full search replacement and URL event listeners are installed before layout. Keep separate watchdogs, public supersession, exact source authority, late overlay/search, body reuse and all no-reopen/cleanup fences. Actual bootstrap/native scenario is required, not detached index calls alone.

B2 remains deferred: displayed relation targets retain working page pointers. Evidence inequality alone cannot authorize adjacency mutation. Need explicit ownership, exact Map order/tombstones/retained-parent isolation, bounded replay, mid-flush fencing and cooperative fallback. C15-C26 remain paused.

Use kplex-test-small for quick native checks; preserve the synthetic large fixture in kplex-test. Run measurements/native drivers serially with browser/build stress stopped. Preserve settings/workspace/throttling and clean only owned fixtures/cache/controller. Full verification and applicable exact-build native checks after each production increment, then commit and push. See docs/validation/indexing-overnight-2026-10-13.md for durable progress. Full M retained-heap/heartbeat/native scale completion and physical mobile/macOS remain pending.
