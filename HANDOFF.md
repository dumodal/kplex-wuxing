# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR222 implementation and complete available verification

Branch2026-10-25-facets-layouts-and-sharing. Runtime2422cbd1ea71387755e549116b7bdc53d618a7b8; full checked head307bf6ab7bb49ea6225b53b56ed808ee1a103e26; accepted main7064644 included. This final checkpoint changes evidence/docs only; production/tests/scripts/packages/styles remain identical to full checked307bf6a. Keep222 draft/open/unmerged for maintainer review. No production files/settings/workspace/deployment changed. No merge/release/force-push.

Implemented: canonical Mind Map gate totals with truthful coverage; clearer metadata/cycle explanations; independent branch/Markdown controls; central source policy Compass attention/Mind Map root/Facets disabled; source-owned outlines/provenance/shared renderer/measurement/actions; explicit-request and reroot cancellation; native editor buffer/caret/DOM focus/command-owner/saving retention; full-width Help; native-verified adaptive Facets columns. No competing parser/index/scheduler/renderer/writer/editor implementation.

Actual complete results: clean307bf6a npm run verify:obsidian PASS3223 (architecture7/core130/main1627/browser325/sources357/source-browser777), zero failed/cancelled/skipped, release metadata/scanner/real build/exact native installation smoke. Mainafe95a39a528f7c4fca4562e0aaa9880fa7bd129eba0b3bff179f03d4207f6ba / styles19a1bb1a25bfbc6db417420e2a07a281e50b48cb5f121ff52d486d9cc3dd47d5 match native UX30/pairs13/editor11 =54. Source/scaling/performance guards unchanged.

All native lanes and final outer resources restored; final12:57:35.840Z confirms9configs/117contents/original live workspace/window/digest7bdaf015f88c6ee1945410755a5aaccf7e04408fe597e729cafca24c5bc332ba. No active test owner. Exact307bf6a CI553/run40322813393/job121571795880 SUCCESS; downloaded logs confirm actual Node22.22.2/npm ci/3223/scanner/build. Final documentation-head CI and exact remote/readback are reported in the PR before final delivery. Receipts: docs/validation/canvas-sections-222-final-verification.json, canvas-sections-222-native-summary.json, canvas-sections-222-2026-10-26.md. Earlier failures retained separately; no assertions/deadlines weakened or unrelated fixes claimed.

Coverage limits: Mac/physical mobile/minimumhost/OSclipboard; known215 fresh-popout Sidecar creation, two simultaneous editor-Sidecar pairs, application restart. Manual priorities: native Mac section/editor/focus and popout; physical touch controls; minimum host. No further implementation gate or partner adoption. Await maintainer review after exact final-head CI/readback.
