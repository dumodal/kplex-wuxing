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
Branch: `2026-10-24-warm-source-selection`; initial comparison baseline: `af09bc42d78abe03ed0d32e0edcdf22d0ebe08ae`; first accepted integration baseline: `6fa936d6522ba45f2c6bb2dfb853671e5218b055` (#211); latest accepted main: `d48f76641df149dd5bb4d000fe9764251ece9807` (#213).
The equipped Mac agent implements the maintainer-authorized #212 scope. No delegation was used.
Keep [PR212](https://github.com/zsviczian/kplex/pull/212) draft; do not merge, release or deploy to a production vault.

## Result and evidence

- Shared clean dependency/head observation removes one head-only transaction per current-format warm owner. Metadata still independently pins/authenticates and checks the same revision/sequence at original-connection lease retirement. No schema, scheduler, persistent cache or count/semantic change from #212. Accepted #211 is included only through the normal main merge; no unmerged work is imported or modified.
- Exceptional-owner cost: one legacy owner adds one probe transaction; the mixed two-owner control balances that against one current owner saving one transaction. Missing heads also add one probe transaction. Cold-start/legacy-heavy completion latency is unmeasured.
- Complete 128-owner diagnostic: 777 → 649 transactions; head gets/hashes/decodes/leases equal. Three alternating timing pairs show median 4.7% elapsed / 2.7% renderer CPU gain. Third pair and its reopen regress slightly and are retained. No production-vault speedup claim.
- All 20 bounded comparison arms passed actual restart, independent semantic/provenance parity, unchanged-head, quiet-tail, later edit and second restart closure. All profiles removed.
- 36 focused real-IDB contracts and three measurement-harness controls passed. An independent writer during awaited SHA initially exposed a candidate finality defect; the added same-transaction retirement check fixes it. Fixture mistakes and original failures are preserved in the report/receipts.
- Durable details: [validation report](docs/validation/warm-source-selection-212-2026-10-24.md), [sanitized receipts](docs/validation/warm-source-selection-212-2026-10-24.json), architecture/source repository contracts.

## Final accepted-main integration status

Main accepted #211 /6fa936d and then #213 /d48f766 during validation. Normal branch merges preserve
both accepted changes and resolve only HANDOFF; the test commands are retained. No unmerged work or
PR history is modified. Relative to d48f766, only #212's two production files differ. The user has
agreed to hold main unchanged through final CI.

All three measured cohorts remain separately identified: initial af09bc4, accepted 6fa936d and
latest d48f766. Each twenty-arm comparison passed semantic/provenance, quiet/edit/reopen and cleanup
checks. Latest 128-owner medians improve 7.7% elapsed /4.1% renderer CPU; one transaction is saved
per clean current-format owner. Earlier adverse samples and failures remain retained. The latest
two cohorts' executable bundles are byte-identical; no timing variation is attributed to #213.

Complete latest `verify:obsidian` passed with real build, 1,425 functional /228 browser UI /357
portable source /775 real-IDB source tests. Native exact-build smoke, reader/selection and deliberate
cleanup-failure controls, two foreground warm reloads and all six foreground workflows passed.
Small's fresh settings/workspace/enablement/artifacts/content digest and originally closed startup
state were restored after proving the exact tested renderer exited. An idle test worker delayed
the full suite but exited without intervention; no process kill, weakened assertion or deadline
extension manufactured a pass.

Current durable evidence: [integration report](docs/validation/warm-source-selection-212-main-integration-2026-10-24.md)
and [receipts](docs/validation/warm-source-selection-212-main-integration-2026-10-24.json). Source/artifact
identities describe each actual pre-commit tree. Final integrated branch head/publication/remote CI
are recorded on PR212 after this report commit; historical CI441/CI442 remain valid only for their
recorded tree. Keep the PR draft for independent review; no additional manual test is required for
the scoped contracts. No cold-start, legacy-heavy or production-vault speedup is claimed; only
existing Small was opened. The deleted Brain copy remains unavailable.

## Review and delivery

The Mac agent is authorized to commit/push scoped work to this existing branch and update/read back the draft PR. Preserve failed evidence; preserve all existing guards including the 50 ms URL-heavy and 45 ms parser assertions. No main write, force push, unmerged #211 import or modification, PR merge, release, new persistent destination, large fixture or production-vault deployment. A normal merge of accepted main into this dedicated branch is authorized integration work.

Highest-risk review area is exact finality/resource retirement under an independent writer or failed final native transaction. Those races have focused real-IDB coverage. Native results and precise remaining limitations must be added before a merge recommendation.
