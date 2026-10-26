# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #222: depth correction verified; final full verification next

Branch2026-10-25-facets-layouts-and-sharing. Published a6e08f5 includes final UX/native receipts; runtime16b8e82. All original requests implemented, native124 plus maintainer-assisted OS file export passed, Small restored. Keep222 draft/open/unmerged; no release or personal deployment. User authorizes restart if Obsidian freezes; production remains untouched.

## Current focused correction

Earlier requested Mind Map depth20/default10 conflicted with host hard8 admission and shared visibility/reference walks. Added optional hierarchy.maximumDepth1..20, omitted default8; Mind Map declares existing20. Existing validHierarchyDepth owner in core/hierarchy validates registry/walk bounds. Forwarded declaration through prepareViewScene and PlexGraph visibility/reference paths. Eight non-root scopes, reader argument5/6, rooted/editor/relationship/camera owners unchanged. Exact overlap comments6410463207/6410780797 posted before edits.

Focused45 pass; architecture/core130/scanner/real build Node22.22.2 pass. NativeUX13 passed19 including depth9 stays visible and eight-scope limit does not fail map; restored9configs/117contents/digest at2026-10-26T08:03:23.722Z. Receipt docs/validation/facets-222-depth-correction.json; current mainSHA256 dbb6264f76d3196775005f8af0cbcd9c003398c910f418f8f0fada0bc7f154d5. Tests cover default8 rejection, opt20 acceptance,21 rejection, deep path/reference, unchanged8scope budget. Initial fixture stat failure and admission-only pruning failures retained; diagnostic throw removed.

## Baseline and CI

Clean a6e08f5 full verify:obsidian passed3208/scanner/build/native installation smoke, outer restore07:33:10Z; receipt ux-pre-depth-verification.json. CI544 a6 SUCCESS, job121441927101. CI543 at16b8 failed unchanged eager alias test; three isolated repeats passed. No indexing/assertion/timing change. CI542 retry passed3208 after startup-timeout failure.

## Next

Commit/push this depth checkpoint immediately. Then remaining native layouts/pairs/sharing/Help/features/editor-lifecycle serially with fresh backups/restores, all on this new artifact. Actual assisted file export remains truthfully attributed to16b8; export code unchanged. Run TEMP/kplex-222-ux-final-verify.ps1 on clean new head (real npm run verify:obsidian Node22.22.2) with output TEMP/kplex-222-depth-final-full-log.txt; locator TEMP/kplex-222-ux-final-verification-current.json captures new backup/report/head. Preserve prior baseline e2d3e489. Final full result/CI/main/remote readback then final evidence checkpoint. Keep222 draft/open/unmerged. No further scope additions.

Current no active native controller; UX13 restored. Explicit Small C:/Obsidian/kplex-test-small/.obsidian, CLI Obsidian.com. Node TEMP/kplex-node-v22.22.2/node-v22.22.2-win-x64. Realdeps. Native host1.14.5/Electron43.3.0/rendererNode24.18.1. OSclipboard rich/custom guarded/unverified; Mac/mobile/minimumhost and known215 limits retained. Meaningful push/chat checkpoints, ETA45-75min (final full/CI). Standing prefix raw-preserved; Refactor plan.md appendbytesonly.
