# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# History and pins enhancement

User-authorized merge of PR222 confirmed at35dccd595861406d31e4f8a709def4c225cb13e1 (head22e06ff; clean, no check runs). Existing final focused/native receipts apply; full regression remains deferred. New branch2026-10-27-history-pins-node-styles starts at that accepted main.

History and pins now optionally project shared resolveNodeStyle/nodePaint through nodeListPresentation: current kind/type/tag colors, pattern, border, icon and prefix. Compact dimensions remain list-owned. History uses HorizontalDragScroll with primary-mouse threshold/capture, synthesized-click suppression, cancellation/blur/unmount cleanup and owning document listeners; touch/pen/wheel/keyboard remain native. No metadata or graph writes.40 affected browser/domain tests PASS; build/types/full official scanner/architecture9PASS Node22.22.2. Windows native verification pending; do not merge enhancement.

Final42focused checks PASS (5new saved-list browser cases including second-document cleanup and touch after cancelled mouse). Final build/types/full scanner/architecture9PASS. Native26PASS3/3 with trusted60px drag/no navigation and actual live style writer. Earlier22-25driver setup/held-button/release sequencing corrected; resources restored each attempt, final15:25:57.919Z9config/117content/original workspace/window/digest. Mainf797c965f47afcf9eda0b2af12c1094335e026be7448429e740ea5aa7a731f65. PR225 draft/open; Help deployment follows. Receipts docs/validation/saved-node-lists-2026-10-27.md.
