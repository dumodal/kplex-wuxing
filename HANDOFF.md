# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# PR #139 — accepted; Windows verification follow-up

Direction: main validation agent → maintainer/Windows agent. Rename feature implementation is accepted/inactive. On 2026-10-11 the maintainer explicitly authorized commit, push, merge #139, close #126, switch to main and fetch, accepting the recorded verification limitation and taking the remaining investigation to Windows. Refactoring remains paused at C14. No release or personal-vault deployment is authorized.

The current rename candidate preserves exact native file/page identity, coordinates, aliases and reverse incidence across canonical and retained owners, including host previews, while retiring old source/write authority and pending builds. Durable implementation, review, native receipts, historical failures and exact inventories are in [rename validation](docs/validation/rename-identity-2026-10-11.md) and its JSON. The temporary plan-only handoff is removed.

Before final integration, production build, architecture 7, restricted core 92, lint, indexing/24 settings scenarios, 655 portable, 141 affected browser and two consecutive native runs of 36 observations pass. The latest complete source-browser retry passes 436/436 including startup; the strict gate still fails with 18 unchanged 20-second Chromium launcher timeouts. Two passive samples produced passing DOM results and status 0 while Node returned ETIMEDOUT. The launcher cause is unconfirmed. One obsolete preview-retirement test was corrected with stronger identity/path/alias/build-token/write-authority checks and passes 28/28. Failed receipts remain failures.

Working branch is `2026-10-11-issue-126-rename-identity`, starting HEAD `a310f4ddab81e23c834e45c76f5b31e4ead8ed0f`; the pending accepted-main merge started from `43569ccd0ea6011cd1a12616d1d37d3cc72a2346`. Fetch now discovers main `e30f85d412c334cf4f1327439ee8c8a4dba5ed6e` containing PR #142's startup body-reuse fix. Integrated it after checkpoint `3aab882`; only this transient handoff conflicted. Preserved the standing header/current rename acceptance and upstream durable startup report. Combined real build passes; host previews 28/28 and startup/rename real-browser tests 125/125 pass, zero failures/skips. Previous native artifacts did not test this newer source. Combined inventories/artifacts are in `finalMainIntegration` of the rename JSON.

Windows next action: use the final committed main containing #139 and #142, Node 22.22.2 and locked dependencies; record actual browser/Obsidian versions. Run standalone `tests/ui-components.test.mjs`, then strict `npm run verify:obsidian` using the prepared explicit disposable vault, Windows `Obsidian.com` and a fresh report directory. If strict staging succeeds, run `npm run verify:obsidian:rename`; repeat the offline-edit startup test serially. Retain deadlines/assertions, record error versus DOM/process/CLI outcomes, restore owned state and capture artifact hashes. Windows results do not replace macOS, Linux or physical-device acceptance. No additional feature work is queued.

Combined runtime inventory SHA256: `55e0d4a07d18a70b8497d2ad819c8a4eea852cf3102109b28e2c3972bc84d649`. Combined main.js SHA256: `6fbfa5eba87def3fd6b01d85a2a731a71679ae90b1e7138270e85273729faff7`. Feature acceptance is inactive; Windows launcher/full-gate investigation remains the maintainer’s next task.
