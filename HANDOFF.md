# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Active PR220 Facets implementation

Branch2026-10-24-canvas-wuxing; accepted main26623c8393bddc0c3bcac39468078ec20ceccbc8 integrated0406844. Prior validated0169198 is historical. Latest published before this checkpoint3eff6b72e7f1232ac2954b3897bcff360bbf5545. Maintainer authorizes implementation/commits/push/PR updates; no merge/release/force push.

A/B and C1 complete; C2a production rendering complete. Native preset manager C2b, D assignment/undo, E shared predicate editor/rules, F sections/developer guide/fixtures/screenshots/final verification remain. Full specification docs/FACETS_VIEW.md, progress/results docs/validation/facets-220-2026-10-25.md and API docs/CANVAS_VIEW_API.md. Do not stop at intermediate checkpoints.



## C2a: production Facets renderer and shared controls

Production registry retains ID wuxing and displays Facets. Five presets use the existing captured menu/choice/session owner and queued configuration rails. Type definitions stay separate from per-canvas intent. Focus remains centered once, with an attached measured accessible badge and full editor/badge envelope. Real ThoughtNode, styles, canonical connectors, Find, grouping, native drag payloads and attention-following editor remain shared.

Optional badges capability, finite scene admission/status, region colors and configured color inventory compose the accepted renderer. The existing ColorScope and ColorSampleReader resolve native/theme/palette colors and choose badge contrast only on actual context changes. Regions remain decorative. Shared configuration now optionally inherits missing stable default entries and seeds only the addressed entry on an edit; existing entry internals never silently inherit. Queue/reconciliation/size/lifetime owners remain unchanged.

Node22.22.2:66 policy/configuration/selector cases;48 actual Settings-host/captured contributions/localization/editor-camera cases;5 actual renderer/preset/theme/independent canvas/Wander/modifier/cycle cases pass. Official scanner, real production build and architecture7 (194 roots,346 reachable files,zero violations) pass. Historical Wu helper tests retain exact original assertions as migration compatibility; production Facets is covered separately. Browser boundary was corrected to return stable MetadataCache objects, retaining actual cache-identity rejection. No assertion/budget/scanner gate was relaxed.

Native preset manager is next; safe assignment, advanced rules, sections, final API guide, fixtures/screenshots and final-head portable/CI/Windows acceptance remain pending. No candidate is deployed in Small or production. Small remains restored to its captured baseline. Production observation remained read-only.

## Native resources and safety

Small C:\Obsidian\kplex-test-small is restored, no staged candidate. Prior backup %TEMP%\kplex-facets-220-baseline-A:9 owned config/plugin files117 content; restoration digest7bdaf015f88c6ee1945410755a5aaccf7e04408fe597e729cafca24c5bc332ba. Capture a NEW unique backup before final staging; do not reuse historical backup over later user edits. Helpers wuxingResources.mjs capture/capture-window/restore and wuxingStage.mjs. Native drivers serial, explicit name/path/config-dir/CLI guards. Production Zsolt vault is read-only except user permits main.js deployment; none performed. No production content in public reports.

Node22.22.2 at %TEMP%\kplex-node-v22.22.2\node-v22.22.2-win-x64. Real build/scanner/browser needs approved sandbox escalation for esbuild parent reads; Git metadata writes/push escalation. Retain #215 baseline failures separately. Preserve reader fifth hierarchy budget/sixth property provider, both camera fixes, attention equality for Facets, canonical source occurrence and additiveOnly writer, saved-published relationship feedback. #219 is accepted; no moving partner branch consumption.

New maintainer requests already implemented/published: #221 shared Wander c3aa629, explicit Alt/Option center af22b8b, cycle reveal plus Notice13c3922. Exact-final-head Windows checks still required.
