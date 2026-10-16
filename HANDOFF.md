# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.







---

# Alt/Option hover highlighting — equipped implementation

User explicitly authorized merging PR #158. It is merged at b9d3527d82e85c5c8f377f7c4fc5f78110ebfece; local main was fetched/fast-forwarded before creating 2026-10-16-alt-hover-highlight. No release authorized.

Scope: optional global hoverHighlightRequiresAlt (false by default), native Plex behavior control, all eight locales, shared surface-owned node/gate/connector hover intent. Existing 750ms default; modifier mode immediate entry and stationary key transitions, release/leave/blur/navigation/teardown cancellation. Touch/drag owners remain separate. Outside appearance themes and graph policy; existing workflow save/presentation notification only.

Equipped Windows host, Node22.22.2, installed dependencies/browser/Obsidian CLI available. No delegation. Use only kplex-test-small, explicit C:/Obsidian/kplex-test-small and .obsidian identity; native/browser serial. Testvault/personal vault untouched.

Focused36 and migration/hover70 pass; actual production build passes. First full run stopped on existing menu test Chromium loading timeout; focused retry passes with unchanged assertions. Full retry and exact native acceptance pending. Preserve TEMP/kplex-alt-hover-* raw logs. Private pre-staging four-file config backup TEMP/kplex-alt-hover-baseline; never publish. Native hover driver owns two synthetic root notes and restores only owned state. See forthcoming docs/validation/alt-hover-highlight-2026-10-16.md for final evidence.

Next: finish full verification; native Settings/main/popout input acceptance and applicable touch/gate regressions; restore and check disposable state; review diff; commit/push feature and draft PR. No new merge/release authorization. Remaining independent acceptance: macOS Option/menu interaction and physical mobile/hardware-keyboard behavior.
