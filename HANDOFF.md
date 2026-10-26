# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR222: centering, folding and touch targets

Starting checkpoint `85b79b282058a8892d62215277f069f544c70e99` completed clean Node22.22.2 `verify:obsidian` and exact-head CI560: architecture7/core130/main1628/browser328/sources357/source-browser779 =3,229, zero failed/cancelled/skipped, real scanner/build/installation smoke; Windows native48. Final old-checkpoint restoration18:00:45.021Z. These receipts certify the hydration fix, not the interaction changes below.

The maintainer then requested plain node click/Enter centering, separate disclosure or modified Enter folding, plain-arrow area traversal, and a small touch glyph with a larger active area. The maintainer explicitly deferred another full regression until final merge acceptance. Current checks are targeted; full CI is deferred on these checkpoint commits, and PR222 remains draft/open/unmerged.

Implementation uses existing shared owners:

- Mind Map declares additive `hierarchy.primary: center`. Normal click/tap and keyboard Enter use accepted destination/root/navigation admission. Existing editor-removing reroot guards remain. Enter on the current Compass center no longer renames; Rename remains its separate action. Placeholder Mod-click stays with native materialization.
- `branch.toggle` remains the shared fold owner and composes existing supported Markdown-section actions. Control, Command, Alt/Option or Shift with Enter folds in graph focus. Native editor/search/control contexts keep their own keys. Default generation2 adds these inherited shortcuts without overriding explicit bindings or previously accepted conflicts.
- Plain arrows reuse the established within-area movement, then area-boundary selection/reveal. The old stop-at-boundary option is hidden; its persisted value remains compatible and inert. Explicit area-jump shortcuts still work.
- Optional `hierarchy.controls: measured` and `PlexMeasurement.controlReserve` provide shared touch clearance. The symbol stays16px; its transparent44px canvas-space button sits beyond a4px body/gate gap. Mind Map subtree/parent layout, shared filtered repacking and Fit reserve the footprint while retaining actual note/editor rectangles and canonical ports. Older view consumers omit the capability and keep their geometry.

Actual checkpoint checks on Node22.22.2/real dependencies: **151 focused tests PASS** across action defaults/migration, internal keys, view API, Mind Map policy/measurement/scene, native-follow boundaries and actual shared-canvas browser interactions. Includes all three built-in views, plain Enter centering/no rename, disclosure-only folding, disjoint dense control envelopes and a real Chromium touch tap in the transparent target outside the glyph. Official Obsidian scanner and real production build PASS.

Initial focused failures reflected the deliberately changed default generation/Enter mapping and two new fixture assumptions: missing required initialGenerations in the pure state fixture, and a CDP tap point below the default browser viewport. Expected defaults were updated to the accepted interaction; fixtures now supply valid state and an explicit visible viewport plus elementFromPoint precondition. No assertions or deadlines were weakened; existing native semantic button dispatch handled touch without a second gesture owner.

Targeted exact-build Windows interaction checks follow this checkpoint. Physical phone/tablet, macOS and minimum-host acceptance remain separate. Full regression/CI is pending by maintainer instruction. No production-vault deployment or file/settings/workspace modification is authorized or performed.
