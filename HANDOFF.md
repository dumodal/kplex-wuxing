# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR222 central Markdown sections: implementation ready for native validation

Branch2026-10-25-facets-layouts-and-sharing; starting5c35fcb, accepted main7064644 included. Keep draft/open/unmerged. Commits/pushes and disposable Windows checks authorized. No production files/settings/workspace/deployment changed. Production-derived observations do not belong in public records.

Implemented prior counts/metadata/Help/columns follow-up plus maintainer-expanded central section support. Additive sectionSource policy: Compass attention, Mind Map pinned root, Facets disabled. Separate node controls, shared source/tree/measurement/provenance/action owners, bounded structural heading retention, explicit-source/reroot cancellation fences, actionable failure retry. Root outline may coexist with a different occurrence editor; central source editor excludes its own outline. No competing parser/index/renderer/writer/source scheduler. Canonical edges, source budgets, camera and native save lifecycle retained.

Actual checks:82 focused tests PASS (portable sections, registry, hierarchy, editor admission, localization and actual shared browser); portable core130 PASS; real Node22.22.2 production build/scanner PASS. New native UX cases not yet run. Prior runtime241aca1 nativeUX21 PASS/restored including full-width Help, keyboard columns and canonical counts; not combined-section acceptance. UX20 timing failure restored; wait for actual area render fixed in script. Next: exact current native UX, independent pair/editor checks, restore, clean full verify:obsidian and exact-head CI. No merge/release/force-push.
