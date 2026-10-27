# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR222 bottom-aligned, growing Mind Map parent area

Starting published head a475f37df9612a3a20af73a0f2598a8296ab91fc. Maintainer requests parent cards near the bottom of their area and an automatically growing area with no internal Mind Map area scrolling. PR222 remains draft/open/unmerged; full regression/CI deferred.

The pure measured Mind Map layout now uses max(saved minimum, complete parent-grid height), keeping its bottom/root-relative gap fixed and growing upward. Empty minimum-height space sits above the grid. Native editor rectangles, subtree controls and outward parent-column directions retain full measurement. The existing140?800/default300 per-canvas preference is now the editable minimum, reported through heightPreference.value; actual measured bounds can exceed800. No semantic source or settings owner changes.

Optional shared contract extensions: viewport.scrollable:false selects a fixed region through the same renderer/tools; admission rejects nonzero initial scroll and content larger than its declared viewport. Existing scrollable viewports retain defaults. reflow.filterLayout:"keep" retains real matching ancestor paths and their measured positions, avoiding filter repacking overflow or accidental shifts. Mind Map uses both; other consumers remain unchanged. Fixed region wheel/touch routes through existing canvas handling; native document editor scroll remains native. No view-ID dispatch, duplicate area UI, parser/index/scheduler/renderer/editor/writer.

Node22.22.2/real dependencies:52 distinct measured-policy/scene/API/cross-link/filter tests and10 real-browser interaction cases PASS (62 total across focused files; overlapping runs attributed in local logs). Coverage includes empty-space alignment under140/800 minima, fixed root/lateral positions, expanded26-child forests and1100px editor dimensions growing past800, shared stable filters/exact duplicate ancestors, rejected malformed fixed-viewport declarations, legacy defaults and plain wheel zoom. Existing bounded-viewport connector/reveal test is retained as an explicit custom-view fixture because Mind Map no longer declares that viewport mode. Its first adapted fixture had a syntax typo; corrected fixture passed without changing production or weakening assertions. Initial restricted dependency bundling required normal authorized access. Installed Obsidian types, touched-source official scanner and actual production build PASS. Native Windows checks follow this checkpoint and are not yet claimed passed.

Production/clipboard untouched. Physical mobile/Mac/minimum-host and known215whole-app restart/two-editor/Sidecar limits remain separate. Multiple editors and focused-editor Properties targeting remain assessed follow-ups from the prior checkpoint. The shared bounded scrolling/connector behavior remains supported for other views. No additional manual Windows checks requested before available native validation is complete.

## Native follow-up: fixed-region source reveal

The first exact-build Windows run on3ba4d9b reached the new growing-area case but refused its wheel probe because expansion had moved the parent outside the actual canvas. Earlier native guards passed; no acceptance is claimed for the incomplete lane. Cleanup and full restoration passed2026-10-27T04:52:17.178Z (9configs/117content/original workspace/window/digest).

Fixed-region branch expansion now delegates to the existing exact Find/reveal owner for minimal canvas panning, keeping root/attention/selection/editor identity and focus intact. Delayed loading settlement captures its expected camera; a user camera move, changed scope/lifetime or folded/removed occurrence retires it. No new camera or scroll controller. Added actual source visibility browser assertion and production-callback tests for cancellation. The first new cancellation assertion exposed retention of an impossible folded/loading intent; the owner now explicitly retires a non-expanded occurrence, and22viewport tests pass. Existing10browser cases and52policy/admission/filter checks pass:84distinct focused cases total, with superseded overlapping attempts recorded in logs. The native parent toolbar check now runs before any explicit Fit as well as after Fit/resizing. Rebuilt source requires native rerun. Full regression still deferred.

## Native pre-Fit toolbar correction

The next Windows lane on7a52950 correctly refused the strengthened immediate toolbar assertion: a growing native editor extended above the canvas before Fit. Cleanup and outer restoration passed2026-10-27T05:00:08.762Z. The existing overlay synchronization now computes shared toolbar insets against both the area clip and actual canvas bounds; document size/content, camera, focus and native host lifetime are unchanged. This preserves reachable controls without forcing a Fit. Portable geometry checks cover top/left/right intersections and unchanged native rectangles. Final23viewport checks pass; combined with52policy and10browser checks this is85distinct affected cases. Official scanner and real build are rerun for the corrected source; native acceptance remains pending until the next exact-build lane passes.
