# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.

---

# Main closeout #169; offline analysis preparation for #172

Main owns169 archive verification/durable backup, docs-only closeout, final CI and authorized
merge without branch deletion/release. Current169 headf794a067; base/main d40a339. Runtime,
reusable tools and regression tests are unchanged. No new evidence consolidation or experiments.

Offline materialization_trace may prepare READ-ONLY source analysis for172 while169 CI runs:
read current PR description captured at TEMP/kplex-172-work/pr-172.md and issue-161.md, plus
main/runtime owners. No implementation, tests, Git mutation, native/browser/vault access yet.
Map discovery, stationary requested-center completion and all161 navigation/materialization/
pinned-tab/relationship variants to precise causal candidates and focused reproduction hooks.
Do not claim source leads prove reported causes. Main will integrate resulting accepted main into
172 existing branch without rewriting history before implementation. No personal-vault access,
rejected receipt/reader sharing, new scheduler/schema or broad benchmark/architecture campaign.
172 remains draft; preserve Closes161; no merge/release/manual issue closure.
