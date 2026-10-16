# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# PR #158 — named themes / scoped reset, F5 acceptance

Main validation agent on `2026-10-14-issue-155-theme-palette`. Reviewed base01f779a; pushed F1 `39089fb`, F2 `ce8c6d7`, F3 `34b22f9`. F4 is validated and ready to commit/push. Regular commits/pushes authorized; keep draft, no merge/release/import-export/sharing. C14 accepted; structural refactor paused. No personal-vault access.

F4 delivers native theme controls, searchable bounded manager, actual shared StyleManagerList consumers, private paired summaries and the existing ColorAdoptionModal extended to base/semantic/all reset. Preserves existing pages and editors. All eight locales and APPEARANCE guide updated. Immediate native Settings rows follow document adoption; dirty drafts remain fenced by activation. Bulk previews use the stable owning Settings body.

Validation:131 affected tests,19 runner tests,7 architecture/128 core, focused official lint and actual types/build pass. Exact native7 passes27 cases in authorized kplex-test-small (106 files). Theme phase12 successful writes; zero additional reads/parses/acquisitions/semantics/search/visuals; three neighborhood computations for real non-color changes. Inactive metadata zero graph work. This is operation evidence, not CPU/memory/energy measurement. Outer restoration passes original runtime/workspace and four exact configuration bytes; owned notes/controllers absent.

Current built/installed SHA-256 main353f65c1a39b189532fab0ad8decb0b7826c7dc1f4b4f3fe8ed69e04467a534b, CSS3eb0bbcaa7951147ebf1e2f7d69938a052a1eb8d2b4869dc8a5845994414bffc, manifest19d9ecce5557733e0ff0f2e27155e635c30158c3cfa6fbca0f11c16e4dedfd2c (0.1.3 unchanged).

Raw local evidence `%TEMP%/kplex-158-theme-ui-*`: focused5, lint3/build3, native7/color-styling-native.json, stable-restoration.json. Native1–6 failures and recovery1–3 remain. Private baselineQwNnDy and earlier config backups stay unpublished. No new public archive authorization. Native1–3 test helper returned chainable native Setting from async function, causing Promise assimilation starvation; fixed plain wrapper and actual helper regression. Native4 immediate-row adoption and native5/6 detached sampling-root defects corrected with browser/native regressions. Scoped recovery closed only identified Small windows; Large kplex-test used read-only diagnostic host, no note/config changes, no whole-app restart. Old window IDs obsolete; no active probe.

Next: commit/push F4, review future-library read-only UI without blocking supported legacy non-color edits; clean full verify:obsidian and affected native migration/style-operation/theme/main-popout lanes. Final source-frozen full result required (F3 broad1982 covered through corrected focused rerun, not clean full). Final diff/docs/report/PR update, commit/push, remain draft. macOS/physical mobile/minimum1.13/community-theme visual acceptance separate.

Node22.22.2 `%TEMP%/kplex-node-v22.22.2`; npm CLI C:/nvm4w/nodejs/node_modules/npm/bin/npm-cli.js. PowerShell Unicode Python requires UTF8 OutputEncoding. Native/browser lanes SERIAL. Explicit Small identity C:/Obsidian/kplex-test-small, config .obsidian, CLI C:/Program Files/Obsidian/Obsidian.com; verify CLI identity before writes, preserve exact runtime/workspace/config. Testvault untouched. Source staging scratch underTemp is stale; never reapply. No permission question pending.
