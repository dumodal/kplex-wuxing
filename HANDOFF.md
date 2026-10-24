# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: Sidecar modifier-click maximize

Prepared by Zsolt's Codex Agent. Base6fa936d6522ba45f2c6bb2dfb853671e5218b055; branch2026-10-24-sidecar-modifier-maximize; draft PR213. Runtime checkpoint da282fe044063082ad439f12e183f595a33c4fb8. Read docs/validation/sidecar-modifier-maximize-2026-10-24.md. Do not resume unrelated indexing/storage work.

Implementation complete: any alt/ctrl/meta/shift flag on Open Sidecar passes a validated transient maximize boolean through the existing action manager. Successful normal open/layout then folds the exact managed pair. Modified native Unfold reveals Plex and closes only its captured managed companion after the existing ownership/generation/focus guards, including the new post-focus reentry fence. Ordinary clicks and commands remain unchanged. All8 catalogs advertise the requested ALT/OPT hint.

Scoped validation:111/111 focused UI/action/native-owner/localization tests, actual-dependency production build/types, scanner and architecture pass on Node22.22.2. Final main.js SHA-25649dc4d0d1a599a110b9d7e3a75c4e7b62fe6c3edfcb571588c0dccc672878ea8. The first broad run failed a Chromium bundle-startup prerequisite; unchanged isolated retry passes. The second broad run was deliberately interrupted at the maintainer's scope steering after release/architecture/core/scanner/main/UI/source-contract stages passed; real browser checks incomplete. Preserve both logs, do not relabel either as complete verification. No performance campaign or renewed full verification is required for this UI-only change. No assertions/deadlines weakened.

IMPORTANT: maintainer answered Wait until I say ready. No foreground Obsidian access, staging/reload or native probe until a new explicit ready. Modifier-only native driver is syntax checked but unrun. After ready, verify exact runtime inputs/artifacts against kplex-modifier-sidecar-scoped-verification.json, stage through the existing guarded runner, then run KPLEX_SIDECAR_MODIFIER_ONLY=true in existing disposable Small with fresh report directories and independent exact cleanup. Approximately5minutes of native access remains. Do not create another vault/profile, restart the application or deploy to production.

Next: complete guarded native checks when authorized, update report/draftPR with actual results and remote checkpoint. No merge/release authorized; raw traces private; sign GitHub comments Zsolt's Codex Agent.
