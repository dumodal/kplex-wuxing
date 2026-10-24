# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Wu Xing PR220 implementation

Zsolt's Codex Agent, 2026-10-25 Budapest. State: implementing in the Windows equipped environment; no subagents.

## Identity and authority

- Branch: `2026-10-24-canvas-wuxing`; initial clean checkout main `4b9a4f5127409829acd3abf0b617286902a68d8a`.
- Existing planning head `4c2f4c34420619c1848aa46f51af24a9f8bd365e` preserved. GitHub confirmed #218 merged as `998781070a9382005154f4f884ed753280a9cf52` at the 22:55 UTC check on October 24. Normal integration commit/start SHA: `48a33a4f0168a6277138e0fc757dab9b740cfc50`.
- User authorizes complete implementation, commits, pushes and PR updates. No merge, release, force-push or personal-vault deployment.
- #219/M0 is independent, never a gate. Wu Xing retains the existing single attention-following editor and its attention-equality guard.

## Scope and owners

Read AGENTS.md, CONTRIBUTING.md, architecture/view contracts, accepted #218 specification/comments, revised #220 and docs/WU_XING_VIEW.md, and #219 current checkpoints. Implement bounded current-note/direct-neighbor five-phase classification, explicit property/type/tag source, exact aliases, empty phases, truthful unclassified/conflict/unavailable states, deterministic measured packing, bounded scroll overflow, canonical links, decorative guides, native settings and production registration. Reuse shared lenses/filters/grouping/Find/actions/editor/Sidecar/session owners.

Additive W0 proposal posted to #219 before shared edits: optional cache-only property availability and bounded layout decorations; no new parser/index/scheduler, source acquisition or editor host. Settings use accepted `PlexViewDefinition.configuration`, `CanvasViewSettingsRegistry` and serialized `updateCanvasViewSetting` writer. Type configuration stays separate from canvas state.

## Environment and validation plan

- Real dependencies installed. Default Node22.22.3; official task-owned Node22.22.2 downloaded under TEMP for required acceptance.
- Required: full verify/build/scanner, focused classifier/layout/property lifetime/bounded reads and browser integration; exact-build Windows selector/settings, native editor content/caret/save/focus/resize, keyboard/modifiers/clipboard, independent Compass/Wu Xing main/popout/Sidecar and restoration, cleanup.
- Use authorized prepared `C:\Obsidian\kplex-test-small`, explicit vault/config variables, CLI path verification before writes and existing process helpers. Do not reset trust/settings or use a personal vault. Native drivers serial.
- Preserve #215 extra-tab restart and combined-editor baseline failures as limitations; do not weaken assertions. Physical mobile/macOS checks remain separate.

## Progress/evidence

Production W0–W3 implementation and focused test coverage complete at the first review checkpoint; full/native acceptance is pending. Node22.22.2 real production build, complete Obsidian scanner and architecture check (165 roots/305 reachable files/zero violations) pass. Focused policy/property/shared contract/session/Compass tests:22 pass. Selector/settings/localization/non-Classic Chromium batch:36 pass; the additional Wu Xing Chromium case passes after correcting two test-only assertions to use the existing selected-node DTO and shared-group CSS class. Initial sandbox Esbuild resolution failed before tests; authoritative rerun outside that filesystem restriction passes. No test assertion/deadline was weakened.

Includes native registry/settings integration and eight catalogs, current docs and optional current-file/cache-fenced property/decorations boundaries. A bounded admitted-file metadata listener handles presentation-only field changes. Attention/editor is fixed inside the phase above the shared neighbor scroller. Compass-only quadrant relinking is now explicitly guarded; other areas require a declared drop role. No independently bound editor or M0 code is consumed.

Read-only CLI preflight confirms `C:\Obsidian\kplex-test-small`, Obsidian1.14.5(installer1.14.0). No native writes/staging/tests yet. Next: full verification, guarded exact-build Windows driver, editor/independent canvas/Sidecar/clipboard/modifier checks, resource restoration and final PR evidence.
