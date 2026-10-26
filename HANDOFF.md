# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #222: final UI polish and verification checkpoint

Existing branch: 2026-10-25-facets-layouts-and-sharing. Main 7064644 is included and unchanged on remote. Implementation 4fc8c40; published native-driver/evidence checkpoint ca6e703. Pending checkpoint adds one standalone Help title correction plus real results/screenshots. Keep PR222 draft/open/unmerged. Commits/pushes/PR updates authorized; no release, force-push, personal-vault deployment or223 implementation. No subagents.

## Implemented

All requested preset-owned layout, grouped selector/cog/Info, Mind Map Enter folding and outward parent columns, responsive preset editor/single icon footer, draft JSON actions, Reset feedback, adaptive import and native read-only guide. Existing parser/index/renderer/editor/relationship/settings owners retained. All8catalogs. Final screenshot correction uses complete standalone guide title; preset Help titles unchanged. Focused26 and real build pass for that correction. First build invocation's nonexistent project-local npm path failed before building; existing npmInvocation corrected it.

## Host recovery and cleanup

Maintainer recovered Obsidian after test-only download hook froze it. User now explicitly authorizes restart on another freeze; no production work open. Production Zsolt's Brain remains protected and untouched. Experimental hook removed/not committed; all4 test Save pickers cancelled without saving. Old application/controller retired. Sample10 cleanup completed via Vault API (8 owned notes and empty folder; existing force=true needed for folder), then outer restoration PASSED06:27:37.468Z:9config/117content/live layout/window/digest7bdaf015f88c6ee1945410755a5aaccf7e04408fe597e729cafca24c5bc332ba. Backup TEMP/kplex-facets-222-ux-17b76e1b retained. No pending recovery resources.

## Verification actually completed

Implementation4fc: full local Node22.22.2 npm run verify passed3208 (7/130/1618/319/357/777), scanner/build, completion observed06:36:23Z. CI541 also passed3208. Sanitized receipt docs/validation/facets-222-ux-portable-verification.json. Rebuilt mainf3dfe5b2/styles8d1191 matched native artifact. UX11=16, layouts2=15, pairs2=12 passed/restored on that artifact. Those receipts precede the title-only polish.

Final title build mainSHA256 fec13b74980caebc0f1c3d7bbabe13b7b986865983cc516207e8adf2f4cd5b56, styles unchanged8d1191. UX12 passed16 including exact standalone title, restored06:42:24.656Z. Current editor-lifecycle2 execsession starts next (see live session tools), private log TEMP/kplex-222-ux-editor-lifecycle-2-log.txt. Never start parallel native lanes. Images now from final UX12. Full final-build verify:obsidian and exact-head CI still pending.

CI542 ca6 attempt1 failed one Chromium-startup timeout before a hotkey test (1617 other main passed); single failed-job retry requested06:24Z. No source/assertion/deadline changes. Keep failure separate from eventual retry result.

## Next actions

1. Finish serial final-build native editor-lifecycle, layouts/pairs, sharing/Help/features as applicable. Each TEMP/kplex-222-run-native.ps1 lane owns fresh capture/stage/restore. Preserve every failed setup/result.
2. Actual native Save JSON through ComputerUse, outside CLI polling: fresh outer backup/stage, open existing preset editor, native download to unique absent TEMP file, inspect through canonical validator, Cancel unsaved draft, restore Small. Do not reinstall main-process hooks or poll CLI while OS Save dialog is open. OS clipboard rich/custom guarded/unverified; never clear/bypass.
3. Commit/push meaningful checkpoint and verify remote. Then clean final-head npm run verify:obsidian using Node22.22.2 and fresh outer backup/restore. Record actual final artifact/receipts, CI/main/readback. Keep222 draft/open/unmerged for user.

Driver Node TEMP/kplex-node-v22.22.2/node-v22.22.2-win-x64, realdeps. Explicit Small C:/Obsidian/kplex-test-small/.obsidian; CLI C:/Program Files/Obsidian/Obsidian.com. Host1.14.5/Electron43.3.0/rendererNode24.18.1. Mac/physicalmobile/minimumhost and known215 limits remain; view recreation is not whole-app restart. Update chat checklist at least every10min and meaningful progress each minute. ETA about1h, contingent final CI. Standing prefix raw-preserved; Refactor plan.md appendbytesonly.
