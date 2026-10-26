# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---


# PR222 section hydration fix: focused verification complete

Starting head bebbb9a58449a9be53fcc43917ce297e24eca459, branch 2026-10-25-facets-layouts-and-sharing, accepted main7064644 included. Keep draft/open/unmerged. No production deployment or file/settings/workspace changes.

Saved adjacency already supports Compass while detailed evidence loads privately. Reprojection erased explicit source placements against the empty evidence store. GraphIndex.getSectionPreviewNeighborhood exposes only that existing read; SectionPreview retains canonical rows and source-owned physical occurrences without creating indexed/editable evidence. Existing shared owners and source bounds remain. Native identity/stat/metadata fences retire stale placements.

Actual Node22.22.2:39 affected section/browser/anchor/scene/source-replay tests PASS;2 real-IDB held-hydration eager/On-demand regressions PASS; installed type check, touched-source scanner and production build PASS. Native UX34 and main/popout pairs13 PASS47 on identical main f2d525d86174ffda8da88a2308f60a9deba0bc5f306bc1d46713297990e52b7f. All resources restored, final16:51:28.525Z. Native UX29 first assumed an expanded ancestor; driver corrected to use the actual preserved fold state, then UX30 passed with unchanged assertions/deadlines. Full/exact-head CI still pending; do not substitute previous3225/native55/CI556 receipts for this changed artifact.

Details: docs/validation/section-preview-222-2026-10-26.md. Final exact head, full/native results, artifact hashes, restoration and remote readback will be reported in PR222. Preserve Mac/physical mobile/minimum-host/OS clipboard and known215 limits. Highest-risk manual follow-ups remain Mac sections/editor/focus/popout, physical touch and minimum host.

Full attempt fed4916/CI558 failed at the isolated indexing harness: new SectionPreview module missing from its explicit transpile inventory. Added one inventory entry, no runtime/assertion changes. Actual indexing harness now PASS, including startup58/source15/settings27 and section/indexing assertions. Failed-attempt restoration passed16:53:45.515Z. Corrected final-head full/CI results pending and reported in PR222 before delivery.
