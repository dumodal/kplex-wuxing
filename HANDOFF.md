# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.







---

# Plex interaction updates: returned for maintainer review, inactive

Branch `2026-10-16-plex-interaction-updates`, source checkpoint
`6835353ccb82ee7cbee1f63c65470e51c62ab00e`, pushed to draft
https://github.com/zsviczian/kplex/pull/171 . Base `3294bea` is the authorized merge of #170.
All seven requested fixes/features are implemented. Main reviewed the scoped offline returns
and validated the exact final source; see the durable
[validation report](docs/validation/plex-interactions-2026-10-16.md) and Refactor plan I1/I2.

Final verification: 2,044 tests/lint/installed types/production build/exact native smoke pass.
Two final native interaction runs each pass 14 cases; hover passes seven main/popout/Settings
cases with zero observed source/semantic/search work; touch passes eight gestures/reload/geometry.
Final runtime is `852d2c8e`. Materialization and rename retire count tasks under captured keys,
reject stale native identity/proof and cannot leave an obsolete rendered placeholder. Properties
checks native file and editable metadata identity, ownership and accepted-load completion.

The broader gate/filter resource lane fails twice before completing its matrix: recorded oracle-
to-failure +9 checks/publications, unchanged source revision and zero fresh reads/parses/builds.
That interval includes filter setup; CPU cost and cause are unproven. Keep the assertion and
failure explicit. Actual macOS Option/menu/popout, physical mobile/external keyboard and other
native Properties versions need acceptance. Do not optimize or expand architecture without a
new assignment; C14 remains accepted and C15+ paused. No merge or release.

Original Small vault state restores: 107-file inventory/settings/layout/bounds/four config bytes/
debugger, no owned notes/controllers or active/pending preparation. Validated build is installed.
110 evidence files and six separate private files are checksum-verified under LOCALAPPDATA/
kplex-validation/pr-171 and pr-171-private; raw TEMP originals remain. HANDOFF must never be
archived. No personal vault access and no archive publication are authorized. CI is running;
main may finish checking it and update the PR without changing frozen source.
