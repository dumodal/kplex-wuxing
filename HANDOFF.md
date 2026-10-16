# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.

---

# PR #169: main-reviewed measurement checkpoint

Branch 2026-10-15-source-reader-efficiency, integrated accepted main at 69fa58a.
Offline measurement return reviewed; two observer contracts, 18 small shape/wave cases and six
single-chunk doubling cases independently passed. Production source-reader code is unchanged.
See docs/validation/source-reader-efficiency-169-2026-10-16.md for scope and limitations.
Main now owns the isolated native Gate M pilot, Git and PR updates. No concurrent browser/native
work. Metadata/resolution reader sharing remains a hypothesis, not an approved implementation.
Offline source analyst may prepare the narrow safety/API analysis without edits or native access.
Preserve all current-head, inter-family, post-release, physical/host/policy and parser safeguards.
No receipt, schema, scheduler, reclamation policy or C15+ architecture work. Stop at one measured
correction or a documented negative result. Commit and push validated checkpoints; keep PR draft.

Only authorized disposable fixtures have been accessed. Personal-vault permission is strictly
indexing diagnostics/main.js deployment and sanitized aggregate evidence; no note/path/payload
inspection or configuration/cache/note mutation. Offline agents have no personal-vault authority.
Raw evidence and byte-verified original configuration backups remain private under
TEMP/kplex-169-2026-10-16. Do not publish archives without applicable approval.
