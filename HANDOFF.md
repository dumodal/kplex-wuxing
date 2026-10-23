# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Active acceptance: PR #206 integration and merge

Prepared by **Zsolt's Codex Agent**, 2026-10-23, Europe/Budapest.
State: implementing final integration and acceptance; main validation agent owns this assignment.

The maintainer authorizes normal integration of accepted main, conflict resolution, validation,
publication and merge without another approval once every stated acceptance gate passes.
Keep draft until then. No release, production deployment, force-push, branch deletion or #207 changes.

Branch: `2026-10-23-startup-source-convergence`; reviewed head
`12c911a2b3fd9fed64e50a375d0d4ebcb9c91e0b`; initial working tree clean.
Accepted main: `930747679894f003a2acf3b800df798826ee090c`, including #205 plus #201/#203/#204.
Normal merge is in progress. Only HANDOFF and Refactor plan conflicted: preserve this standing
header/current #206 assignment and both historical ledger inventories. Runtime merges cleanly.
Preserve #205 protected metadata fetching and #206 recovery/discovery/automatic-rebuild ownership.
No #207 branch or unfinished dependency-count work is imported, deployed or modified.

Read [historical validation](docs/validation/startup-source-convergence-206-2026-10-23.md)
and append a distinct integration section. Historical 6ad7c816 bundle/measurements stay unchanged.
Build a new exact artifact with Node22.22.2 and real dependencies/installed Obsidian typings.
Run full npm run verify, focused startup/discovery/recovery tests, exact-build affected native
Small lanes, remote CI, then one retained-S2 full-app startup and one separately declared warm
activation on the guarded Brain copy. No heavy verification overlaps timed native observation.
Keep the existing45-minute cap and ten-minute quiet interval. Verify actual source/URL/persistence
completion, avoided work, recovery, semantic/provenance behavior and foreground responsiveness.
Ask before application restart unless all other vaults are verifiably closed.

Authorized copy: `/Users/zsviczian/Obsidian/kplex-test-brain-mac`.
Exact DB: `k-plex-index-v1-6b706c65782d746573742d627261696e2d6d6163`.
Protected original: `/Users/zsviczian/Obsidian/Zsolt's Brain (2025)`; never write/toggle/deploy/restore.
Reverify target, disabled Sync/Publish/external writers and checkpoint compatibility before writes.
Small was closed with original configuration restored (including Sync and plugin enablement):
prepare it offline before opening. Never run mutating Small drivers against the real-data copy.
Preserve historical evidence under private archive2026-10-23-pr206-final and original203 streams.
Retained S2 SHA4e70e312...6f4c2, A4 SHA2c1ec851...dfe8. Do not overwrite historical receipts/seeds.

Retain named unresolved follow-ups: broad-tag completion on both artifacts; route-dependent joined
relationship-name ordering; unexplained first-baseline two-node terminal difference; very-early
recent-tab synchronization on both; isolated unattributed candidate renderer crash. Do not normalize
strict oracle differences or increase deadlines. A repeated crash/new substantive regression blocks
merge and leaves draft. Fewer pairs/power-qualified first baseline/censored second baseline and
controlled-versus-natural recovery distinctions remain accepted historical limitations.

Before merge: final-head verification and remote CI pass, exact native checks/targeted confirmations
pass subject only to accepted existing qualifications, owned resources/configuration/fixtures restored.
Inspect any main advance and rerun affected checks. Verify GitHub merged and resulting commit
reachable from main. C14 accepted; structural C15-C26 remain paused.
