# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Help delivery checkpoint

Source runtime5cb0069: preset redirect fix + focused browser1/scanner/types/build PASS on Node22.22.2. Help native8 PASS12/12 against public Help4aa47f3, all4 sources/layouts and140canonical Child?12;11 authentic screenshots reviewed. Cleanup and outer restoration PASS2026-10-27T05:54:31.015Z (9config/117content/original workspace/window/digest). Production untouched.

Help agent finalizing new screenshot embeds/captions/Related-asset roles and independent audit/push on2026-10-27-canvas-facets-help/PR4. Frozen classification/config remains4aa. Source report: docs/validation/help-canvas-facets-222-2026-10-27.md and sanitized native JSON.

Earlier parent85focused/native24 remains runtime130facf, restored05:03:39.951Z; no false new-artifact attribution. Full regression/CI deferred. Both PR222 and Help PR4 remain draft/open/unmerged. No release, merge, production deployment, bundled Help binary/workspace change or additional vault creation. Finish final Help audit/remote verification/PR handoff; source checkpoint only test-driver/receipts now.
