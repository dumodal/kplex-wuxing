# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #158 — named-theme final acceptance / draft review

Main validation agent on 2026-10-14-issue-155-theme-palette. Reviewed base01f779a. Pushed F1 39089fb, F2 ce8c6d7, F3 34b22f9, F4 d72752d. Final safety/acceptance checkpoint ready to commit/push; regular commits/pushes authorized. Keep draft, no merge/release/import-export/sharing. C14 accepted; structural refactor paused. No personal-vault access.

Named themes/scoped reset and all8 locales/guide implemented. Existing single queue, active-only graph appearance, migration/import protection, Default copy-on-write, epoch stale-draft fencing, lens-color-only projection and shared actual manager/reset/editor owners preserved. Compass footer/previews/whole percentages/Light5→7% delivered. Future-library editor UI now read-only; raw future container retained.

Clean full verification through strict migration driver passes1993:7 architecture/128 core/875 general/120 UI/334 source/529 source-browser plus lint/types/real build. Final exact native6 migration/14 style/9 theme combinations/27 color-theme-reset/6 foreground pass. Native theme12writes/0 added source-semantic-search-visual/3 genuine non-color neighborhoods; inactive metadata0 graph. No CPU/memory claim. Final main SHAe7ef794fef92e3f52ced6f2dc1328cb37612f1a7fec821d4b424dadf88bcdd80, CSS3eb0bbcaa7951147ebf1e2f7d69938a052a1eb8d2b4869dc8a5845994414bffc, manifest19d9ecce5557733e0ff0f2e27155e635c30158c3cfa6fbca0f11c16e4dedfd2c (0.1.3 unchanged).

Qualified acceptance: final style1 timed out late in Settings Save. Scoped exact Small windows159/200 closed/verified; four config bytes restored, no notes deleted. Inspector enable timed out, owned debugger/controller released. Traced style2 and original style3 pass14. Preview1 missing main Plex setup; normal command opens it. Preview2/3 match9 but fail on4 neighborhoods, other categories0; memo stack captured, upstream trigger unproven. Attribution4 and original5 pass9/all0. No assertions relaxed or runtime cause/fix claimed. Preserve these failures in review, never call all native attempts green.

All raw local evidence TEMP/kplex-158-theme-final-*, source receipt kplex-158-named-themes-source-receipt.json. Private baselinezK88UZ/config backups remain unpublished. Earlier evidence retained. Final outer restoration passes runtime/workspace/four exact config bytes/106 files; no owned fixtures/controllers, validated build retained. Testvault untouched. Large diagnostic-only; no note/config writes or whole-app restart. No new public archive.

Next: final diff/source receipt, commit/push safety/docs, update PR body honestly, follow CI. Keep draft for retained Windows intermittents and physical mobile/macOS/minimum1.13/community visual acceptance. If further investigating native failures, use disposable fixtures and bounded observations; passing retries do not establish a cause.

Node22.22.2 TEMP/kplex-node-v22.22.2; npm CLI C:/nvm4w/nodejs/node_modules/npm/bin/npm-cli.js. Native/browser SERIAL. Small C:/Obsidian/kplex-test-small, config .obsidian, CLI C:/Program Files/Obsidian/Obsidian.com; verify identity before writes. Old window IDs obsolete. PowerShell Unicode Python needs UTF8 OutputEncoding. No pending permission question.
