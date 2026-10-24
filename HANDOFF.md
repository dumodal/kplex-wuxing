# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR212 implementation return — warm source-head selection

Prepared by **Zsolt's Codex Agent**, 2026-10-24.
Branch: `2026-10-24-warm-source-selection`; fixed accepted baseline: `af09bc42d78abe03ed0d32e0edcdf22d0ebe08ae`.
The equipped Mac agent implements the maintainer-authorized #212 scope. No delegation was used.
Keep [PR212](https://github.com/zsviczian/kplex/pull/212) draft; do not merge, release or deploy to a production vault.

## Result and evidence

- Shared clean dependency/head observation removes one head-only transaction per current-format warm owner. Metadata still independently pins/authenticates and checks the same revision/sequence at original-connection lease retirement. No schema, scheduler, persistent cache, count/semantic or #211 runtime change.
- Complete 128-owner diagnostic: 777 → 649 transactions; head gets/hashes/decodes/leases equal. Three alternating timing pairs show median 4.7% elapsed / 2.7% renderer CPU gain. Third pair and its reopen regress slightly and are retained. No production-vault speedup claim.
- All 20 bounded comparison arms passed actual restart, independent semantic/provenance parity, unchanged-head, quiet-tail, later edit and second restart closure. All profiles removed.
- 36 focused real-IDB contracts and three measurement-harness controls passed. An independent writer during awaited SHA initially exposed a candidate finality defect; the added same-transaction retirement check fixes it. Fixture mistakes and original failures are preserved in the report/receipts.
- Durable details: [validation report](docs/validation/warm-source-selection-212-2026-10-24.md), [sanitized receipts](docs/validation/warm-source-selection-212-2026-10-24.json), architecture/source repository contracts.

## Validation and current state

Pinned Node 22.22.2 and real dependencies/Obsidian declarations. Complete `npm run verify:obsidian`
passed after the existing cancellation injection was moved to both genuine pre-comparison paths
(shared selection and supported legacy ensure). All original assertions remain. The first failed
full run is retained. The passing run includes 772 real-IDB source tests and the real build.

Exact-artifact Small staging/DOM smoke, the original cached reader, new selection reader, deliberate
cleanup-failure control, two foreground warm reloads and all six foreground inventory cases passed.
Only existing Small was opened: 74 Markdown /76 visible files. Original settings/workspace/core and
community enablement/artifacts were restored byte-exact; content digest unchanged. The recorded
renderer exited and Small's original closed startup flag was restored. The registry's sticky open
flag initially stopped restoration before file writes; renderer-exit verification resolved that
check without changing permissions or opening another vault.

The validation report records exact source/artifact identities, complete results, adverse samples,
fallback overhead and native limitations. Its artifact was built from planning HEAD plus the
measured working tree; GitHub CI checks the final committed head separately. Final scoped branch
publication/head/CI are recorded on PR212 after this report commit. Keep the PR draft for review.
No additional manual check is required for the scoped contracts. The deleted Brain copy remains
unavailable; existing `kplex-test` supplied filesystem inventory only, not native scale evidence.

## Review and delivery

The Mac agent is authorized to commit/push scoped work to this existing branch and update/read back the draft PR. Preserve failed evidence; preserve all existing guards including the 50 ms URL-heavy and 45 ms parser assertions. No main write, force push, #211 import/modification, merge, release, new persistent destination, large fixture or production-vault deployment.

Highest-risk review area is exact finality/resource retirement under an independent writer or failed final native transaction. Those races have focused real-IDB coverage. Native results and precise remaining limitations must be added before a merge recommendation.
