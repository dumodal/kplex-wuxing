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
Branch: `2026-10-24-warm-source-selection`; initial comparison baseline: `af09bc42d78abe03ed0d32e0edcdf22d0ebe08ae`; accepted integration baseline: `6fa936d6522ba45f2c6bb2dfb853671e5218b055` (merged #211).
The equipped Mac agent implements the maintainer-authorized #212 scope. No delegation was used.
Keep [PR212](https://github.com/zsviczian/kplex/pull/212) draft; do not merge, release or deploy to a production vault.

## Result and evidence

- Shared clean dependency/head observation removes one head-only transaction per current-format warm owner. Metadata still independently pins/authenticates and checks the same revision/sequence at original-connection lease retirement. No schema, scheduler, persistent cache or count/semantic change from #212. Accepted #211 is included only through the normal main merge; no unmerged work is imported or modified.
- Exceptional-owner cost: one legacy owner adds one probe transaction; the mixed two-owner control balances that against one current owner saving one transaction. Missing heads also add one probe transaction. Cold-start/legacy-heavy completion latency is unmeasured.
- Complete 128-owner diagnostic: 777 → 649 transactions; head gets/hashes/decodes/leases equal. Three alternating timing pairs show median 4.7% elapsed / 2.7% renderer CPU gain. Third pair and its reopen regress slightly and are retained. No production-vault speedup claim.
- All 20 bounded comparison arms passed actual restart, independent semantic/provenance parity, unchanged-head, quiet-tail, later edit and second restart closure. All profiles removed.
- 36 focused real-IDB contracts and three measurement-harness controls passed. An independent writer during awaited SHA initially exposed a candidate finality defect; the added same-transaction retirement check fixes it. Fixture mistakes and original failures are preserved in the report/receipts.
- Durable details: [validation report](docs/validation/warm-source-selection-212-2026-10-24.md), [sanitized receipts](docs/validation/warm-source-selection-212-2026-10-24.json), architecture/source repository contracts.

## Validation and accepted-main integration

Original af09bc4 acceptance remains recorded with green CI441/CI442. Final readback discovered
accepted main 6fa936d (merged #211) and a HANDOFF conflict. The normal main merge is resolved,
accepted runtime/test changes are preserved, and only #212's two production files differ from 6fa936d.
Both test inventories and the accepted stable-gates native command remain present.

Fresh 6fa936d comparison: all 20 arms passed, unchanged operation saving; 128-owner medians improve
7.2% elapsed /4.2% renderer CPU. Original adverse results are retained, not relabelled. Integrated
`verify:obsidian` passed with the real build, 228 browser UI and 775 real-IDB source tests. Exact-build
reader/selection/cleanup controls, two foreground warm reloads and all six foreground inventory
workflows passed. Small's fresh original settings/workspace/enablement/artifacts/content and closed
startup state were restored after proving the exact tested renderer exited.

Current durable evidence: [integration report](docs/validation/warm-source-selection-212-main-integration-2026-10-24.md)
and [receipts](docs/validation/warm-source-selection-212-main-integration-2026-10-24.json). Source/artifact
identities describe the measured pre-commit integration tree; remote CI checks the committed tree
separately. Final integration commit/publication/head/CI are recorded on PR212 after this report commit.
Keep the PR draft for independent review. No additional manual check is required for the scoped
contracts. No production-scale, cold-start/legacy-heavy, Windows/minimum-host or physical-device
speedup is claimed. Only existing Small was opened; the deleted Brain copy remains unavailable.

## Review and delivery

The Mac agent is authorized to commit/push scoped work to this existing branch and update/read back the draft PR. Preserve failed evidence; preserve all existing guards including the 50 ms URL-heavy and 45 ms parser assertions. No main write, force push, unmerged #211 import or modification, PR merge, release, new persistent destination, large fixture or production-vault deployment. A normal merge of accepted main into this dedicated branch is authorized integration work.

Highest-risk review area is exact finality/resource retirement under an independent writer or failed final native transaction. Those races have focused real-IDB coverage. Native results and precise remaining limitations must be added before a merge recommendation.
