# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# PR #153 - B1 validated, next measured checkpoint

Branch: 2026-10-13-indexing-performance; base a162044. Main validation agent has native Windows Obsidian, real browser, dependencies and Node 22.22.2. Maintainer authorizes unsupervised checkpoints until approximately 2026-10-14 03:51 UTC and a commit after each. No push/merge/release/PR-ready authority.

B1 production scope: only URL GraphBuilder stages borrow replace-only aliases/tags/styleTags; neighbor maps remain copied. Full verify:obsidian passed, including 464 browser source tests and real build. Native alias entries 512 to zero, same ordered graph/evidence digest, reads/parses zero; foreground passed with independent cleanup. Exact candidate main.js 9a4be62d20b17251c837ec7f82759fe28e1a78d15adcce09d264a017ef1be5b5. See docs/validation/indexing-url-facets-2026-10-13.md and raw receipts. Commit this completed checkpoint before next production change.

Next: measure independent B3 compiler URL alias membership. B2 is deferred: displayed relation targets retain working page pointers, so evidence inequality does not prove private adjacency. Do not enable adjacency mutation without explicit ownership, Map ordering/tombstones/retained-parent isolation, bounded replay, mid-flush fencing and cooperative fallback.

Use kplex-test-small for functional native checks, preserve the synthetic large fixture in kplex-test. Run browser/build and native measurements serially, preserve all settings/workspace/throttling and clean owned notes/cache/controller. Full verification and exact native checks after each runtime increment, then commit before the next. Reports/limitations live in docs/validation/indexing-overnight-2026-10-13.md. Scale heap/heartbeat/native completion and macOS/physical mobile remain pending.
