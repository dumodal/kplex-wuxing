# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #222: Facets layouts, diagnostics, help and portable sharing

Main equipped agent implementing maintainer assignment unsupervised. Commits/pushes/PR updates authorized on existing branch. Keep222 draft/open/unmerged at completion; wait for user. No release, force-push, personal-vault deployment or223 implementation.

## Actual accepted baseline

-220 merged after testing as7064644b9f68d44e908d84700d643a11f4977b6c, exact tested head4fadc0c, runtime444dc1c. CI528 and524 success. Local verify:obsidian3160 passed (7/130/1590/299/357/777), real Node22.22.2 dependencies/build/scanner/native smoke. Refreshed native42/11/25/10/5 pass. Rich/custom clipboard rerun stopped safely after7; earlierced2825 full editor12 pass is separate, never relabelled.
-222 existing specification head7f1e686a25b12012659df7ce237e32c67e100cb9 preserved and normally merged with accepted main in30d7a73c6efd9226fab18ba10cc26af9c45b721a. Pushed/readback and remote relevant source verified before implementation. Main/code contracts/docs and actual Obsidian types reread. Latest spec includes combined diagnostics, width/auto columns and contextual Markdown help.223 is spec-only and follows222; no moving partner code.
- Equipped: real dependencies, Node22.22.2 at TEMP/kplex-node-v22.22.2/node-v22.22.2-win-x64; Windows Obsidian CLI, Chromium, GitHub. No Mac/physical mobile/minimum-host validation. No subagents currently assigned.

## Scope and planned checkpoints

1. Shared optional width/height area controls and session dimensions, accurate band geometry/hit/clip/count, bounded badge admission/envelopes, width-driven measured columns. Existing rectangular areas/attention editor/camera defaults preserved.
2. Five pure layouts (circular, concentric rounded rectangular bands, vertical, horizontal, four-only quadrants), cardinal linear anchor/preview, adjacent declarative flow/captions, dock side/arrangement; combined Diagnostics default with per-note shared status chips and per-canvas override. No combined property-clearing drop authority.
3. ARC replacement preserving genuinely customized entries, local Sensemaking and Publishing examples. Per-preset Help source/preview/Info beside cog through shared captured contributions and native MarkdownRenderer+Component lifecycle, safe inactive content, all8locale defaults and literal user overrides. Inspect current configuration16384-character/4096-node/depth8 caps before choosing help bounds; do not materialize defaults on open.
4. One bounded versioned data-only Facets/lens JSON validator, existing predicate/color owners and queued saves; preview/new-or-replace/dependencies/privacy/failure guards. Inert detailed AI export context is distinct from helpMarkdown. Native import/export/copy prompts, documented schema/examples/AI-authoring instructions; no CLI implementation/network/code execution/note writes.
5. Type-checked samples, authentic native screenshots, focus/Sidecar/navigation/source-occurrence regressions, required full Node22.22.2 verify/build/scanner and exact-build native/CI, refresh main, restore Small, final review handoff; never merge222.

Exact shared overlap proposal posted on222 before edits: PlexArea/PlexDecoration; PlexViewSession dimensions; prepareViewScene/badge limits; measuredAreaGrid/reflowArea; PlexGraph.AreaResizeDrag/ResizableAreaFrame; CanvasViewLayoutControl optional state binding; captured help command/choice and reusable native help owner. Existing registry, reader signature (hierarchy argument5/properties6), canonical endpoints, both camera corrections and single attention-following Facets editor remain. No parser/index/scheduler/relationship writer/private rendering app.

Initial forecast10-14hours after integration; revise at meaningful pushed checkpoints with user-visible checklist/ETA. P1 implemented: optional shared width/session/controls, per-area measured automatic columns and badge envelope reservation. Architecture7/core130/scanner/build pass. Corrected affected group28/28 plus71 other focused cases pass; native areas19/19 with zero source work and full restoration. Full native feature samples retain an unadmitted/cached source fixture failure at Wander; normal startup/prepared-center setup remains required at final validation. See docs/validation/facets-222-2026-10-25.md and sanitized receipt. Combined diagnostics/layouts/help/sharing are next; no final acceptance claim.

## Test resources

Small only: C:/Obsidian/kplex-test-small, config .obsidian, CLI C:/Program Files/Obsidian/Obsidian.com; explicit KPLEX_TEST_VAULT_NAME/PATH/CONFIG_DIR. Native drivers serial, exact artifacts.220 outer backup TEMP/kplex-facets-220-final-9b1252f2 restored20:58:12Z:9 files/117 content hashes/live layout/window, digest7bdaf015f88c6ee1945410755a5aaccf7e04408fe597e729cafca24c5bc332ba; controller/restoreController/debugger allfalse. Capture a fresh private outer backup before222 staging. Raw private reports stay TEMP. Production Zsolt's Brain receives no writes/deployment/input.

Known215 fresh-popout/extra-tab restart/two-editor-pair and OS clipboard limits remain separate. Loaded pair restoration is not whole-app restart. Do not clear or raw-writeBuffer a rich/custom user clipboard to bypass the guard.
