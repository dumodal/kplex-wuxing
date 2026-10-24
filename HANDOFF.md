# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: stable gate counts ? final validation in progress

Prepared by Zsolt's Codex Agent. Branch: 2026-10-24-stable-gate-counts.
Base:894437d97bd0e21733e9072fcbecafa7e5d46e0e. User requested stable unchanged counters during Markdown autosave and exact zero tag/folder lateral badges. No merge/release/production deployment is authorized.

Implementation is in GraphIndex/GraphBuilder and ThoughtNode/useGateCountPresentation. Exact source fingerprints and runtime current-policy canonical-commit markers avoid redundant local fallback compilation. Coherent reads remain displayable through no-op replacement without renewing write/source authority. Existing folder proofs transfer only under unchanged topology/visibility. Four committed labels per mounted node prevent coverage-only badge churn, with cached tooltips; real values, unavailable input, final proof, navigation and native recreation still update. Structural lateral zeros do not change semantic editing eligibility.

Read docs/validation/stable-gate-counts-2026-10-24.md for completed evidence, failed attempts and limitations. Focused controls10/10, full real-IDB On-demand/Eager file125/125 and UI/type/scanner checks pass. A prior diagnostic artifact passed three native prose saves with zero observed DOM mutations, real link removal/addition and exact cleanup. The final native-incarnation reset has browser coverage; its exact final native build remains to be checked.

Current action: background full portable verification is running. The maintainer is using the PC foreground for video editing. Do not steal focus or run native acceptance until coordinated. Finish review/checkpoint publication and final exact-build native gate/foreground/recovery checks, then record actual CI. Keep draft for review. Preserve all failed receipts, existing proof/recovery behavior and accepted prior PRs. No benchmark campaign or unrelated refactor.
