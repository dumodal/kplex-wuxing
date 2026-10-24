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

Prepared by Zsolt's Codex Agent. Base6fa936d6522ba45f2c6bb2dfb853671e5218b055; branch2026-10-24-sidecar-modifier-maximize. Read docs/validation/sidecar-modifier-maximize-2026-10-24.md for scope, ownership, focused evidence and retained failed preparation attempts. Do not resume PR211 or unrelated indexing/storage work.

Implementation: any alt/ctrl/meta/shift flag on the Open Sidecar React control dispatches a finite maximize boolean through the existing action manager and waits for successful normal open/layout before folding the exact pair. Native Unfold forwards the same shared modifier predicate and optionally closes only its captured managed sidecar after a still-current reveal. Existing source/session/leaf/view-generation/moving/topology/focus guards remain. Unrelated tabs survive. Ordinary controls and command defaults are unchanged. ALT/OPT tooltip wording is maintainer-requested; all8 locales maintained.

Focused tests110/110 pass. Existing real-dependency build/type check passed before localization-only Unicode transport repair; full renewed verification is now running with explicit Node/shell outcome capture in %TEMP%/kplex-modifier-sidecar-verification.json and kplex-modifier-sidecar-verify.log. First focused failure remains in kplex-modifier-sidecar-focused.log; corrected run is focused-corrected.log. Do not relabel pending checks as passes.

IMPORTANT: maintainer answered Wait until I say ready to foreground request for this assignment. WAIT for a new explicit ready; do not stage/reload/call foreground Obsidian while they edit video. The existing sidecarFolding native driver supports KPLEX_SIDECAR_MODIFIER_ONLY=true and exact disposable Small guards; syntax checked but not executed. After full verification and permission, stage exact production artifacts through existing guarded runner/receipt handling, then run the modifier-only matrix in a fresh report directory. Restore exact layout/config and verify independent cleanup. No new vault/profile, app-wide restart or production deployment.

Next: save/publish validated progress on this branch; finish full verification and compare final hashes; await foreground permission, run native checks; update draft PR/report with actual outcomes and read back remote head/CI. No merge or release authorized. Keep raw native traces private and sign GitHub comments Zsolt's Codex Agent.
