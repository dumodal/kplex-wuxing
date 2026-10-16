# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.







---

# Node tooltip follow-up: returned for review, inactive

Draft PR171 on `2026-10-16-plex-interaction-updates`, parent08f620f. Scoped offline agent returned
ThoughtNode and regressions; main independently reviewed, ran actual native verification and
manages the authorized checkpoint/push. No further work is assigned by this inactive handoff.

Compact browser title retained, duplicate host hint removed using existing aria-labelledby/name
pattern. Exact localized accessibility, gates, image titles and explicit previews are preserved.
Runtime source SHA-2565a976f6698628eee6c3411c2898159e4a6b37b12e76f292bd9af1511a28cbffc;
artifact fbe9eaa3ba01e0b9c9634ddb5b82fc62503fb3d90da27be025547560182c1c85.
Full strict2,045/focused9/native node5/interaction14/hover7 pass. Old-runtime native rejection
retained; complete-control lane passes12 then hits obsolete background-modal selector, so only
explicit node scope accepted here. No assertion weakened or unrelated production fix attempted.
See durable validation report and Refactor plan I3 for source/evidence references and limits.

Original107 files/settings/layout/bounds/four configuration bytes/debugger restore, no active or
pending work/controllers. Original110-file evidence remains unchanged; new supplement local
only, no archive publication. Earlier checkpoint CI passes; new checkpoint CI must be checked.
macOS/physical-device and existing gate/filter resource acceptance remain pending. PR stays draft;
no merge/release, personal-vault access, optimization or structural refactoring authorized.
