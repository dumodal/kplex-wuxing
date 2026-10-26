# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR222 implementation and final Windows lanes complete; full verification pending

Branch2026-10-25-facets-layouts-and-sharing; runtime2422cbd1ea71387755e549116b7bdc53d618a7b8; accepted main7064644 included. This checkpoint adds a Compass native regression and evidence only; production source/styles unchanged since2422cbd. Keep PR222 draft/open/unmerged. No production files/settings/workspace/deployment changed. Production observations excluded from current public records.

Implemented canonical Mind Map counts/coverage labels, full-width Help, measured Facets columns, additive central section policy (Compass attention/Mind Map root/Facets disabled), independent controls, source/provenance/measurement/shared tree and editor-safe layout. Reuse existing native focus owner for retained-focus section controls; no competing parser/renderer/writer/index/scheduler/editor bindings.

Actual validation:82 focused PASS after native fix; core130/scanner/real Node22.22.2 build PASS. Final native UX27 PASS30, pairs5 PASS13, editor-lifecycle4 PASS11 =54 cases on identical mainafe95a39a528f7c4fca4562e0aaa9880fa7bd129eba0b3bff179f03d4207f6ba and styles19a1bb1a25bfbc6db417420e2a07a281e50b48cb5f121ff52d486d9cc3dd47d5. Each restored9configs/117contents/live workspace/window/digest7bdaf015f88c6ee1945410755a5aaccf7e04408fe597e729cafca24c5bc332ba; final12:08:44.155Z. No active test owner. Detailed cases/failures in docs/validation/canvas-sections-222-native-summary.json and canvas-sections-222-2026-10-26.md.

Next: clean full npm run verify:obsidian on this published checkpoint, unconditional outer restoration, exact-head CI/log readback and final PR update. Source guards unchanged. Remaining coverage limits: Mac/physical mobile/minimumhost/OSclipboard, known215 fresh-popout Sidecar/two simultaneous editor-Sidecar pairs/application restart. No merge/release/force-push.
