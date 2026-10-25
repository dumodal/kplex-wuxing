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

Zsolt's Codex Agent, 2026-10-25 Budapest. State: complete implementation and serial Windows native checks; final clean-head verification/CI and outer restoration pending. No subagents.

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

Complete Node22.22.2 verify:obsidian passed at the earlier checkpoint:7 architecture/130 core/1454 functional/242 Chromium/357 source/775 real IndexedDB, scanner/build and exact-hash native smoke. Native editor validation then exposed off-origin attention centering with autozoom disabled. The narrow PlexGraph correction centers the existing framing occurrence while retaining scale; Compass remains origin-centered. Actual Chromium camera regression and real build pass. Eight catalogs now retain real UTF-8 translations; a focused Unicode assertion prevents the earlier encoding corruption.

Corrected artifact SHA256 `af16af2f83bb3e9c52fa9c19acd0b876be36f40ff54fb0602ef82786194c65ef` passes nine Windows native editor cases, including actual OS Ctrl+V/A/C with trusted exact-editor keys, dirty content/caret/focus through reclassification/resize/compatible switches, normal asynchronous save after explicit navigation, and source/remount identity across popout/main migration. Seven pair/selector cases pass with both main/popout native file-backed Sidecars using supported loaded-document attachment, captured-opening-owner selection after focus moves, independent camera/attention/editor/Sidecar and owned native view restoration, plus trusted OS Home/native select change. Original failed attempts remain retained: native opening must finish before dirty insertion; asynchronous save completion is observed rather than forced; migration must await the new host generation; offscreen window coordinates are unsuitable for OS input.

Fresh popout Sidecar creation stays a failed check: it opens an empty leaf. An isolated real build of exact accepted main9987810 reproduces this in unchanged Compass before any Wu Xing switch; its control cleanup passes. Loaded-document attachment is a separate supported workflow, not a pass for fresh creation. #215 full-app extra-tab/combined-editor failures remain unclaimed. Mac/mobile/minimum-host checks unrun.

All native controllers restored their own settings/layout/clipboard/fixtures. Outer private backup still holds nine original files and107 content hashes; restore with `wuxingResources.mjs restore` after final clean verification/native smoke. Current main remains9987810; partner219 remains unmerged and read-only. Next: freeze/push this checkpoint, run final clean Node22.22.2 verify:obsidian and exact-head CI, preserve ordered receipts, restore the outer baseline and publish review evidence. No merge/release/personal-vault deployment.
