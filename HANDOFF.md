# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---


# PRIORITY: Small native recovery / restoration pending


### Native recovery required (2026-10-26 05:56Z)

Runtime4fc8c40 mainf3dfe5b2/styles8d1191. Refreshed native sample1 correctly caught that the test assumed the main-window width for a separate Settings window. Actual editor846px in900px Settings window=94%; resizing the actual test-owned Settings window to1280px produces1120px editor and seven icons on one row. Both1280/640 selector groups pass. Source product sizing was correct; input/screenshots must use the element's actual owning window.

Stage samples2-5 stopped on an unsupported intermediate persisted-enable-list assumption; actual CLI unload was confirmed loaded=false/enabled=false while the file still retained its original entry. Stage now proves actual unload before artifact replacement and retains final enablement-file/byte checks. Foreground before disable. All those outer restorations passed9/117/digest.

UX samples7-9 opened native Save pickers; async remote will-download callbacks did not complete the redirected download. No file was saved. Sample10 tried a synchronous main-process test hook and CLI became unresponsive. This experimental hook is removed from the driver; no main-process eval or download-hook code is being committed. Four test-generated kplex-preset.json pickers were identified with computer-use skill and cancelled, no production-window input. Small Settings/root remain unresponsive; no global restart/kill authorized while production has unsaved-state uncertainty. User asked asynchronously to reload onlySmall or confirm production saved before whole-app restart.

**RESTORATION PENDING** for private backup TEMP/kplex-facets-222-ux-17b76e1b. Do not claim restored. Earlier1-9 receipts passed; latest10 did not. The backup is intact (9 configs/117 content baseline/digest7bdaf015f88c6ee1945410755a5aaccf7e04408fe597e729cafca24c5bc332ba). Small may retain8 generated fixture notes under one Kplex-220-WuXing timestamp folder, plus test settings/layout. After recovery, use Vault API to remove only verified test-owned extras against baseline, then run existing outer restore. Do not delete arbitrary user additions. Native probe controller/main-hook retirement cannot be confirmed until recovery. Production Zsolt's Brain unchanged.

Continue independent full portable verification on realNode22.22.2 and CI while waiting. Keep222 draft/open/unmerged. Remaining refreshed native dialogs/import/Enter/parent columns/layout/editor/pairs and actual file completion remain UNVERIFIED. Existing111focused+arch/core/scanner/build actualpasses preserved.

--- Current implementation checkpoint ---


# PR #222 maintainer UX revision - native verification next

Latest user requests override the earlier per-canvas layout requirement: layout is preset-owned, remove it from Views/lenses; keep preset+cog+Info together; Mind Map Enter toggles selected branch; parent columns expand left/right (2:firstleft/secondright;3:firstleft/middle-right/right-right;1:right); improve dialogs with large responsive preset editor, compact icon action row, useful Reset feedback, direct JSON file/copy and explanatory import Info.

Starting f4d64a1, accepted main7064644 already included, existingbranch2026-10-25-facets-layouts-and-sharing. All requested implementation now present uncommitted for checkpoint publication. Node22.22.2 focused111/111+architecture7/core130/scanner/realbuildPASS. See docs/validation/facets-222-ux-2026-10-26.md for changed functions/contracts and retained fixture failures. New modules ui/sharing/portableTransfer.ts and ui/plexViews/facets/facetSharing.ts compose current owners; indexing finite transpile inventory updated. No new parser/index/renderer/editor/relationship writer. No subagents.

Next: commit/push this checkpoint; update native layouts/pairs drivers that still use the removed layout choice; add focused native UX lane for actual dialog geometry/icons/source export/import Info, Enter keys and parent columns with real editor safeguards. Current final build is new and has NO refreshed native receipt yet. Existing TEMP/kplex-222-run-native.ps1 can capture/stage/probe/restore Small, but add ux lane to its allowed list privately. Repo scripts/testing/obsidian/wuxing.mjs orchestrates scenario/helpers. Helpers context has p.updateCanvasViewConfiguration (existing queued writer), p.readPortableSharingState().presets (resolved preset library), root/choose/panel/reveal/native, cases, quiet(), files/restores owned. Native fixtures must no longer use [data-kplex-view-choice=layout]; use preset editor Save for UX and shared writer for pure layout/editor lane. Pair lane should verify same preset shares layout, different selected presets remain independent. Preserve raw prior receipts and explain intentional semantics change.

Use explicit SmallC:/Obsidian/kplex-test-small/.obsidian CLI C:/Program Files/Obsidian/Obsidian.com. Build/driverNode TEMP/kplex-node-v22.22.2/node-v22.22.2-win-x64; realdeps installed. Fresh backups and unconditional restore everylane; no active nativeprocess/controller now. Last previous-task outerbackup TEMP/kplex-222-final-verify-9366a2d0 RESTORED9config/117contents/digest7bdaf015f88c6ee1945410755a5aaccf7e04408fe597e729cafca24c5bc332ba at02:43:24Z. Capture current actual baseline; user may have changed disposableSmall since. Production Zsolt's Brain STRICTLY READ ONLY and untouched. OSclipboard rich/custom guarded; neverclear/writeBuffer/bypass. Native typed editor lifecycle lane avoidsclipboard, browser mockedclipboard tests truthful.

After native checks fix scoped failures, capture actual screenshots, full npm run verify:obsidian on exact published head via fresh outerSmallcapture/restore, CI exacthead, final main/remote readback. Keep222 DRAFT/OPEN/UNMERGED and wait for user. No release/forcepush/personaldeployment/223 implementation. Meaningful commit/push and chatchecklist/ETAupdates required. Current remaining ETA3-4h.

HANDOFF standing prefix raw-preserved; Refactor plan.md invalidUTF8 appendbytesonly. Header instructions apply. Latest PR kickoff comment6408651888 identifies exact overlapping functions and accepted219/220 alignment.
