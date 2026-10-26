# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR222 implementation and local/native verification complete; final CI/readback pending

Branch2026-10-25-facets-layouts-and-sharing. Runtime c107681d97009ea1740bd5e0aeb5da38a0135c1a; accepted main7064644 included and remote unchanged. This final checkpoint changes evidence/docs only. All requested UX/Mind Map changes plus bounded depth correction implemented. Keep222 DRAFT/OPEN/UNMERGED, wait for maintainer. No release, force-push or personal-vault deployment.

## Actual results

Clean c107681 npm run verify:obsidian PASSED on real Node22.22.2/deps:7architecture/130core/1622main/319browser/357sources/777source-browser =3212; scanner/real build/exact native installation smoke pass. Source/staged mainSHA256 dbb6264f76d3196775005f8af0cbcd9c003398c910f418f8f0fada0bc7f154d5, styles8d1191d97810d38680697800625b1219b9e834752e561e795c2690b0ed61cc0e. All7 final Windows lanes PASS127: UX19/layouts15/pairs12/sharing8/Help8/features54/editor-lifecycle11. Each restored. Full outer restoration PASSED 2026-10-26T08:37:46.361Z:9configs/117contents/live layout/window/digest7bdaf015f88c6ee1945410755a5aaccf7e04408fe597e729cafca24c5bc332ba. No active test controller. Production untouched. Native/core timing/scaling assertions unchanged.

Real assisted OS file export was completed on16b8e82; canonical validator accepted9668bytes with unsaved draft name, installed preset unchanged, draft Cancelled and temporary file removed. Transfer/validator source unchanged throughc107681; attribution retained. OSclipboard rich/custom guarded/unverified. Mac/mobile/minimumhost and known215 Sidecar/simultaneous editor/app-restart limits remain. Recovery restart is not app-restart acceptance.

Receipts docs/validation/facets-222-ux-final-verification.json, facets-222-ux-native-summary.json, facets-222-depth-correction.json; detailed failures/chronology in facets-222-ux-2026-10-26.md. Prior clean a6 full3208 and CI544 preserved separately. CI543 unchanged eager-alias failure retained;3 isolated repeats and current local full pass without indexing/assertion changes. CI545 runtime c107 status still tracked through GitHub.

## Final actions

Commit/push this docs-only checkpoint, verify exact remote, then await its CI conclusion and inspect completed logs. Update PR with exact final head/CI result, verify draft/open/unmerged, clean checkout and current main. Do not rerun passed local/native checks for these docs. If CI fails, inspect actual failure; preserve guards and failed attempts. No further feature scope. Return concise completed checklist/results/limits and exact final head.

Private full backup TEMP/kplex-222-ux-final-verify-11ea33da and report TEMP/kplex-222-ux-final-full-11ea33da retained, restoration passed. Earlier sample10 recovery backup17b76e1b also restored. Full log TEMP/kplex-222-depth-final-full-log.txt. Prepared final native summary copied into repo. User authorizes Obsidian restart on freeze; no restart needed now. No native/exec test process remains after completed session2730. Standing prefix preserved byte-for-byte; Refactor plan.md appendbytesonly. ETA finalCI approximately30-40min.
