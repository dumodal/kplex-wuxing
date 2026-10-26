# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR222 Compass occurrence editing and editor-safe view selection

Starting published head e1f61d6268d30d0fcf2ed4b604dafad83879d950. Maintainer request: changing view while a native editor is open must work, and noncentral Compass editor buttons must open in place without moving the center. Keep222draft/open/unmerged; full regression/CI deferred.

Implemented through existing owners. The captured selector calls requestSelection; an optional session guard awaits native save/close, releases the existing lease after success, and rechecks lifetime and canSelect before switching. Failed saves retain the current editor/view. No focus-based canvas lookup, second selector/settings writer or private native editor. Per-view/canvas state and lens/filter drafts keep their owners.

Compass?s existing Classic adapter now measures one exact noncentral occurrence using the shared PlexEditorBindings/native lifecycle. Role+center+canonical note distinguish same-note copies in different areas; ambiguous same-role section copies fail closed before admission. Existing canonical edge/evidence paths stay unchanged while physical endpoints follow the chosen occurrence. Filters/grouping retain the native occurrence; explicit attention changes close/save before navigation, while passive follow cannot discard it. The ordinary central editor, maximization and supported center file representations remain. Rooted Mind Map guards remain; Facets stays attention-following. Restoration revalidates native identity and occurrence. No parser, index, scheduler, renderer or file writer was added.

Actual Node22.22.2/real dependencies: **140 targeted tests PASS** across captured selector/preflight/failure/races, native switch boundaries, Compass1/2-area duplicate identity and geometry, filter retention, existing Classic density/layout, and rooted/passive navigation. Installed types, official touched-source scanner and real production build PASS. Earlier failures were explicit finite AST-fixture dependencies updated to the current production callbacks, and selector tests now await the actual save/selection result. Existing assertions and deadlines retained. Exact-build Windows lane follows this checkpoint: noncentral Compass opening/switching, central editor view transition, failed save/retry, occurrence restoration and main/popout captured selector isolation. These native cases are not yet claimed passed.

Full regression/CI remains deferred by maintainer instruction. Physical mobile, macOS, minimum-host and known215restart/Sidecar/two-editor-pair limitations remain separate. No production access/deployment. Prior validation receipts keep their exact earlier revision attribution.
