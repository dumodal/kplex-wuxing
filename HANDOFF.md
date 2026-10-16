# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.






---

# PR #158 — F7 retry-safe queue / final verification

Branch2026-10-14-issue-155-theme-palette; reviewed base01f779a. Pushed F1–F6 through15999e4. User authorizes regular commits/pushes. Named themes/reset/Compass and all8 locales/guide delivered. Keep draft; no merge/release/import-export/sharing. C14 accepted; structural refactor paused. No personal-vault access.

F7 final runtime candidate: compatibility saveSettings defers saved-policy advancement to the existing updateStyleSettings disk queue; persistExistingChanges records its exact snapshot after success. This fixes independently reproduced stale-library persistence on failed retry and queued workflow saves. No new writer/dirty tracker/full-library scan. Normal unchanged editor Save remains no-op. Three new production regressions cover retry, older failure/newer appearance and workflow overlap. Native style lane adds actual failed imperative color retry and reload (15 cases).

106 affected tests/types/real build pass. Exact final native6 migration/15 style/9 previews(all measured work0)/27 colors-theme-reset/6 foreground pass. Main5f5c81d1581aae1688a4d2efdae2b7bbffb27d993e9cf5c4f9444ec84c09fdb3; CSS3eb0bbcaa7951147ebf1e2f7d69938a052a1eb8d2b4869dc8a5845994414bffc; manifest19d9ecce5557733e0ff0f2e27155e635c30158c3cfa6fbca0f11c16e4dedfd2c unchanged0.1.3. Original runtime/workspace/four exact config bytes/106 files restored; owned fixtures/controllers gone, validated test build retained.

Fresh full verification is REQUIRED for F7 (expected1997; actual outcome authoritative). F6 compatibility-verify-1 deliberately interrupted during source-browser after new regression, owned root23944/test descendants stopped before staging; preserve audit/log, never call full pass. F5 full1993 and CI20cae21 pass; not evidence for changed runtime. F6 CI15999e4 may still run. CI takes30–36min; run full/local and latest remote in parallel, no browser/native overlap locally.

F5 style1 and unfixed matched style4 time out late in Settings Save, scoped Small-window recoveries verified (no notes deleted). Persistence omission is proven/fixed; exact renderer event-loop cause remains unproven. Corrected matched migration→style sequences pass twice with complete live/durable appearance verified. Rollback-only2dde prototype fails workflow-overlap; exact artifact, reconstructed canonical source/patch and hashes in TEMP/kplex-158-theme-compatibility-rollback-prototype. Do not ship it. Final5f5c queue-owned policy passes all106. All failures, intermediate variants/raw evidence retained locally; no new public archive.

Next: commit/push F7; freeze runtime and run strict verify:obsidian to fresh compatibility-verify-2 report/log. No more speculative implementation. Restore original outer baseline afterward with TEMP/kplex-158-theme-compatibility-final-restore.mjs (preserve its existing final-restoration.json first or use new output name). Update report/ledger/PR with actual full/native/CI, source receipt and verified local evidence supplement; commit/push docs, remain draft. Physical mobile/macOS/minimum1.13/community visual acceptance remain separate.

Raw TEMP/kplex-158-theme-compatibility-*; F5 final-* retained. Original private baselinezK88UZ untouched, configuration backups unpublished. Existing local64-file evidence LOCALAPPDATA/kplex-validation/pr-158/named-themes-2026-10-16. Testvault untouched; Large used read-only diagnostic host only, no note/config changes or whole-app restart. CurrentSmall C:/Obsidian/kplex-test-small, .obsidian; CLI C:/Program Files/Obsidian/Obsidian.com. Verify identity before writes. Old window IDs obsolete. No active native probe.

Node22.22.2 TEMP/kplex-node-v22.22.2; npm CLI C:/nvm4w/nodejs/node_modules/npm/bin/npm-cli.js. Native/browser SERIAL. PowerShell Unicode Python needs UTF8 OutputEncoding. No pending permission question.
