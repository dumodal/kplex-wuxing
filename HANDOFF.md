# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Editor placement and area growth

PR225 merged by explicit instruction at d450ecc9c75287dca8e15626c7b7f8b9ccbb32ec; new branch2026-10-27-editor-area-growth starts there. Facets opts into additive attention-and-occurrence hosting: existing central attention editor retained; other notes bind shared occurrence owner in place. Single editor/native save guards remain. Classic packing now receives exact editor measurements and temporarily raises area caps; no saved setting writes. Shared scroll reveal runs once per binding/dimension and preserves native focus/manual scrolling. Facets/Mind Map measured category/subtree widths/heights retain their existing owners.

35focused checks PASS; broader82run79PASS/3fail. Exact accepted-main source comparison independently confirms the same3session failures (14/17baseline): old tests assume Classic editorHosting undefined despite accepted Compass occurrence capability. Assertions retained; not unrelated fixes. Actual build/types/full scanner/architecture9PASS Node22.22.2. Native three-view dirty-save/resize lane in progress. No merge of this branch/release/production deployment.

Final90focused PASS, final actual build/types/full scanner/architecture9PASS Node22.22.2. Native29PASS3/3 exact final artifact, each view opens Neighbor in place, resizes920x700 with no area clip, retains content/caret and saves dirty native content on close. Native27passedFacets then correctly hit Compass existing pill-to-role/center key upgrade;28/29check exact canonical note and same area, requiring DOM preservation only for pre-keyed views. All restore; final18:25:28.492Z9config/117content/original workspace/window/digest. Receipts docs/validation/editor-area-growth-2026-10-27.md. PR226 draft/open; full regression deferred and3exact-main session baseline failures retained. Help deployment follows.
