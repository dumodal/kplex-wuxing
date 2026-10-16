# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# PR #158 ? active implementation

Main validation agent, 2026-10-16. Branch `2026-10-14-issue-155-theme-palette`. Main integrated at `689399d`; A/B/C1/C2 pushed (`8a33627`, `2d0232d`, `4f52c12`, `25ab5fa`). C2 remote CI retry passes; initial Chromium startup failure preserved.

Checkpoint D is validated: 1,956 tests, lint/types/real build/exact native smoke; native 16 color/Compass, 14 style, 6 migration, 6 sampling cases. Configuration/effective settings/workspace restore and awake release pass. Raw evidence verified unpublished: `%TEMP%/kplex-158-checkpoint-D-evidence.zip`, SHA `bbe6636aec5ee0c7d303dfb5dd6e878f53ce054fa54bdd670a55e785a355065d`. Durable details: `docs/validation/native-styling-158-2026-10-15.md`. D committed/pushed as `3ad76f6`. E1 fixes actual Settings detached-root ownership; 22 browser tests, lint/types/build and 17 exact native cases pass. Commit/push E1 next. Other user feedback remains active.

Continue unsupervised with regular validated commits and pushes. New maintainer feedback supersedes counterpart deferral: fix actual Settings paired contexts and inert canvas/tint actions; expand useful theme choices; round displayed alpha; add explicit recommendation both directions; explain adoption and semantic roles; separate Colors and Labels; show reusable dual swatches and palette strips. Read sibling Excalidraw StylesManager harvesting reference. Preserve source identities, exact untouched alpha, queued writes, motion/graph architecture. Prior tests sampled main/popout CSS and direct editor methods, not every actual declarative Settings click; do not claim those paths accepted.

Authorized disposable vaults only (`kplex-test-small`, `kplex-test`, now `testvault`). Verify explicit name/path/config through CLI before writes. No personal-vault access. Keep PR draft, no merge/release. Commit/push each validated checkpoint; no evidence archive publication without applicable approval. No subagents.

Prepared but unapplied closeout work: `%TEMP%/kplex-158-E-stage` with baseline hashes, transparent-preview backdrop correction/regression, dialog focus lifetime, theme driver and guides. Review/adapt for latest feedback rather than wholesale copying. Preserve private original config backups outside archives. All prior raw measurements retained.
