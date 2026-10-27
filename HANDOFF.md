# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# iOS shared node controls

Baseline accepted main ccb7189b5ad8722625ad9d1b669d1c8568be52bb; branch 2026-10-27-ios-node-controls. CSS-only product change: scoped shared ThoughtNode control reset overrides Obsidian tablet button padding, removes native appearance and bounds editor icon to 16px. Section 10/14px glyphs and Mind Map 16px symbol/44px hit area preserved. No API/action/layout/index changes.

Before-fix browser reproduction: actual Compass editor button 42x16 under shipped-equivalent tablet rule. After-fix fine/coarse checks across all three views pass. Node22.22.2: 30/30 affected browser checks; actual build/types, official scanner and architecture9 pass, zero violations. Full regression deferred under maintainer instruction. Physical iOS/WKWebView unavailable, acceptance pending: square section glyph, compact editor background, single activation and independent gate/note taps.

Exact Help deployment/reload 2026-10-27T20:02:35.132Z preserved leaf/center/liveRoot/Compass/preset/37cards/33visible/camera. User data/workspace/shortcut deletions excluded; no note edits or production access. Details and hashes: docs/validation/ios-node-controls-2026-10-27.md. Publish draft PR, keep open/unmerged; no version bump/release.
