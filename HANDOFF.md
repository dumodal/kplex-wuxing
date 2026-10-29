# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Wu Xing fork upstream synchronization

- Request: synchronize the existing fork to current upstream before developing editable process captions.
- Starting branch/head: `wuxing-local-design` at `4253471af944e2206555506322ec9665ddbedf36`.
- Destination: `sync/upstream-2026-10-30`; merge source `upstream/main` at `6596f689c07f1b8c9ba84d09b7cf9c01f929a568` (0.3.0).
- Adopt upstream Compass/Mind Map/Facets architecture. Keep fork manifests, serialized workspace view IDs, and IndexedDB/cache cleanup namespaces isolated as `kplex-wuxing`.
- Retain status/emoji recognition through upstream's built-in Wu Xing Facets preset. Existing old-fork visual effects and guided terminology are preserved on the original branch, not overlaid on the new architecture. Historical fork docs are not current feature claims.
- Local gradient/docs changes are preserved in the named pre-sync Git stash and Downloads task backup.
- No editable five-edge captions have been implemented in this synchronization. No vault settings, note content, or installed plugin artifacts were changed. No GitHub push or PR is included.
- Validation: Node 22.22.2, locked dependencies installed with lifecycle scripts disabled; `npm run verify` completed with two browser failures; all other lanes passed. The folder-order failure reproduces in an untouched upstream snapshot; the 20,015-owner browser test timed out and remains unresolved. Independent real production build passed; exact details and artifact receipts are in `docs/validation/wuxing-upstream-sync-2026-10-30.md`. Native startup/large-vault acceptance remains untested; no disposable vault is configured for this synchronization.
- Logs and exact local backups: `/Users/dumo/Downloads/dumodal-Codex/2026-10-30-kplex-upstream-sync/`.
