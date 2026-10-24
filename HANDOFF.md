# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: Sidecar viewport centering

Prepared by Zsolt's Codex Agent. Branch2026-10-24-sidecar-viewport-center; base d48f76641df149dd5bb4d000fe9764251ece9807 (PR213 merged). The previous feature is complete/merged; do not resume its broad verification or unrelated indexing/storage work.

User requests recentering Plex when Sidecar opens/closes: use existing autozoom when enabled, otherwise preserve zoom and translate the focal thought into the new viewport center. Implementation is UI-only: App passes existing per-view Sidecar state; graph frames once after two owning-window frames using latest composition. Input/navigation/supersession/unmount retire pending work. Existing ordinary-resize/manual-camera, display, native ownership, indexing and storage behavior remain.

Validation:18/18 focused camera/Sidecar tests,8/8 headless Chromium display/Sidecar controls,7/7 architecture plus0 boundary violations, actual-dependency build/types and official scanner pass on Node22.22.2. Original floating-point fixture and sandbox build failures retained/qualified in docs/validation/sidecar-viewport-center-2026-10-24.md. No performance campaign or full broad verify. Exact main.js f43871726a44a8b033f45854fb3ce4f3dfbd4138610abe3a3e50e2b30d79c8a9; manifest/styles hashes in report.

Foreground WAIT persists: do not stage/reload/access Obsidian until the maintainer explicitly says ready. Native open/close geometry checks are unrun; after ready use only existing guarded disposable Small, exact artifact and independent cleanup. Cover4 positions, both autozoom states, manual initial camera, modifier fold/unfold-close and cancelled transitions. Estimated5-10minutes native work. Main/popout native timing and physical Mac/mobile unverified.

Publish validated checkpoint/draft PR and verify remote. Do not merge/release/deploy production. Comments signed Zsolt's Codex Agent; raw logs private.
