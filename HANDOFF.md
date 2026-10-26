# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR222 follow-up: implementation checkpoint; native/full verification pending

Starting5c35fcb; accepted main7064644 included. Branch2026-10-25-facets-layouts-and-sharing. Keep PR222 draft/open/unmerged. User authorizes coherent commits/pushes and disposable Windows validation. Production is read-only except explicitly permitted main.js/styles.css; no production deployment/file/settings/workspace change made. No production observation payload belongs in GitHub records.

Implemented: canonical shared-owner Mind Map merged peer totals with coverage/unavailable flags; known cached children yield incomplete metadata rather than unavailable; eight-catalog coverage/cycle explanations and accessible hints; full-width native preset Help source below description. Existing shared measured columns pass a live area-width regression. Branch chevron distinguishes hierarchy from Markdown section plus/minus and isolates click/double-click from note activation/opening. Mind Map sections:false retained; larger section capability question remains pending.

Actual checks: focused38+36 and latest23 pass on Node22.22.2/real deps; production build/scanner pass on current runtime. Native UX lane now asserts full-width Help, keyboard Home/End columns, canonical gate totals and real chevron; next run exact build in Small, restore resources, then relevant independent pairs/editor checks and full verify:obsidian/exact-head CI. Existing source budgets, readers, camera/editor lifecycles and no-extra-work guards unchanged. Prior5c35fcb evidence remains attributed separately.
