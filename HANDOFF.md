# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Return: paired factory ontology defaults

Implementation is complete on `2026-10-20-paired-ontology-defaults`, based on `f646c75bc7d2a4b8ca2f64af43cb8826a30afab9`. This is the maintainer's fresh-install defaults request, not a continuation of deferred indexing work. The maintainer subsequently authorized creating and merging the PR without waiting for GitHub CI. Release remains outside scope.

- Fresh/no-data settings use nine natural inverse pairs through the canonical version-1 ontology grammar. Saved configurations and ExcaliBrain imports keep historical fallbacks; literal slash fields are preserved.
- All original physical field names/roles remain. Fresh hierarchy copies are detached, and persistence/restart is covered.
- Production changes only touch `src/settings.ts`. Three policy fixtures now compare equivalent saved ontology inventories. No semantic-policy, source acquisition, compiler, cache/schema, CSS or localization changes.
- Final focused tests: 135 passed; build passed; release/architecture/core/lint passed. Full verification remains limited by the known hydration watchdog timer assertion (`tests/indexing.test.mjs:3433`, 1 versus 0). Native exact-build Small-vault smoke passed. Ontology browser checks: 35/36 passed, one Chromium bundle-load setup failure before scenario execution; not rerun.
- See [validation report](docs/validation/paired-ontology-defaults-2026-10-20.md) for exact scope, commands, native evidence and limitations. Human source review checked current AGENTS/CONTRIBUTING/architecture ownership, migration compatibility, physical-field invariance and independent copies.
- Help-vault edits from the preceding documentation task remain intact and uncommitted on their independent branch. No personal vault access.

Highest-probability manual check: on an actual new installation, inspect Manage ontology and verify the paired rows and reciprocal labels. Existing-install native loading passed; fresh data and restart are production-function tests. macOS and physical mobile first-install checks remain unperformed.
