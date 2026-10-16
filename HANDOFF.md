# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.





---

# PR #158 — active F6 compatibility correction / final verification

Main validation agent on2026-10-14-issue-155-theme-palette. Base01f779a; pushed F1–F5 through20cae21. Named themes/reset/Compass/all8 locales/guide delivered. Keep draft, regular commits/pushes authorized, no merge/release/import-export/sharing. C14 accepted; structural refactor paused. No personal-vault access.

F5 passed clean1993 full/native6 migration/14 style/9 themes/27 colors/6 foreground. Its CI runs about30min. While waiting, a second matched migration→style on20cae21 reproduced the native late Save timeout. A distinct real persistence bug is now PROVEN by a failing production-owner test: saveSettings can omit writing a replaced coherent root/library snapshot because inner updateStyleSettings sees no draft change. F6 compatibility route now requests persistence through the same queue; normal unchanged editor saves remain no-ops. Native migration cleanup verifies complete live/durable appearance/ontology/library after reload.

F6 source diff: main.ts finite persistExistingChanges option only from compatibility saveSettings; regression in excalibrain-migration; reusable independent assertRestoredKplexAppearance oracle + native migration assertions; contributor/report/ledger/handoff updates.103 affected tests, actual installed-types/build and two native migration→style6/14 sequences pass. Original preview9/all0, colors27, foreground6 pass. Main SHA96b13e20e1e5630cd460988abb6ceb7002f0a0253d6f9254c9a84ada259b5b52; CSS3eb0bbcaa7951147ebf1e2f7d69938a052a1eb8d2b4869dc8a5845994414bffc and manifest19d9ecce5557733e0ff0f2e27155e635c30158c3cfa6fbca0f11c16e4dedfd2c unchanged0.1.3. F6 exact full verification remains REQUIRED; do not claim F5’s full result for changed runtime.

Original Windows failed controls retained. F5 style1 and final-style4 after native-only migration3 required exact Small-window recovery (first159/200, second201/227); four config files restored, no notes deleted. Snapshot persistence bug corrected; exact UI event-loop starvation cause not captured, do not overclaim. F5 preview2/3 had4 neighborhoods; final fixed preview9/all0 passes. Physical mobile/macOS/minimum1.13/community visual acceptance remain separate.

F6 raw TEMP/kplex-158-theme-compatibility-*; F5 raw final-* retained. Private original baselinezK88UZ unchanged. Final F6 outer runtime/workspace/four config bytes restored,106 files, no owned fixtures/controllers, new build retained. Compatibility restoration stored separately; F5 original restoration receipt restored from its verified durable copy. Local earlier64-file evidence folder LOCALAPPDATA/kplex-validation/pr-158/named-themes-2026-10-16; nothing newly published. Large diagnostic-only, no note/config writes; testvault untouched.

Next: commit/push independently validated F6 checkpoint; freeze code and run full verify:obsidian (expected1994, actual result authoritative), using compatibility-verify-1 output. Restore outer baseline afterward with TEMP/kplex-158-theme-compatibility-restore.mjs. Collect source/evidence receipts preserving both variants. Update final report/PR/ledger and commit/push results, follow actual latest CI (about30min). No question pending.

Node22.22.2 TEMP/kplex-node-v22.22.2, npm CLI C:/nvm4w/nodejs/node_modules/npm/bin/npm-cli.js. Native/browser SERIAL. Small C:/Obsidian/kplex-test-small, .obsidian; CLI C:/Program Files/Obsidian/Obsidian.com. Verify identity before writes. Old window IDs obsolete. PowerShell Unicode Python needs UTF8 OutputEncoding.
