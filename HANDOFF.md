# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Reload empty-canvas camera fix complete

Help before:19cards/0visible, camera y1622.5against final954px pane. Existing automatic viewport settlement generalized to attention-following views; autozoom-disabled navigation records automatic placement, without following ordinary scene reflow. Manual/restored cameras/live editors/display transitions retain coordinates. No new index/timer/state owner.

30targeted viewport/editor tests +1real-browser test (six view/autozoom cases)PASS22.22.2, build/types/touched scanner PASS. Actual Help two reloads PASS2026-10-27T07:46:47.332Z, same leaf/center/preset,19cards/original center visible withy477, no navigation/note edits. Exact deployed main8b2ff4729a036fb8f0d9e7039169f410e53c50ad4e67db6cbbaedb32f0685de9; styles unchangedd8984f7094c5a1638a69f38a4ba246df33c460f6775268d3faf25c68378fff83.

Evidence docs/validation/reload-viewport-222-2026-10-27.md and native JSON. User-owned Help settings/workspace/shortcuts excluded; source and Help branches pushed separately. Both PR222/Help4remain draft/open/unmerged, full regression deferred, no release/production deployment.
