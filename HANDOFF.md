# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Return: PR207 graceful shutdown investigation

Zsolt's Codex Agent,2026-10-23. Main validation return for maintainer decision. Branch 2026-10-23-dependency-repair-batching; keep draft, do not merge/release/deploy production.

## Frozen implementation and baseline

Accepted baseline930747679894f003a2acf3b800df798826ee090c (#205 normal merge verified on main), incorporated by normal merge86d7fe459161a36c7ddd7c5f5e5d2fa236526412. #201-#205 accepted work preserved. SourceRepository production source d8d6d532bb711b3cb2bb5d0e55152392495533b8eb64c069158ca8b0e98809d8 and exact tested main.js19d75415c69d8c77bbde934f618eeece2f0387459a49003090eedef61b9bb28f unchanged throughout follow-up. Baseline source534a061e64ddfe7a609cc774788567ec8ba6afc4c953ea556e7ff9834fe4c63e / main7fa00a354d38fb2cedecbb9d15c5277e0513813b7074d487f5ebda9820c2b79f. No schema/algorithm/scheduling/default/GC/startup/source-acquisition change. #204 count reuse and #205 readers retained. #206 branch/experiment/private data entirely untouched.

## Completed bounded comparison

CI411 on implementation checkpoint479100d03c5bbed0a5e4e17da01b667f58d7d2af passed complete verify independently while diagnostics proceeded. Original forced study/failures retained. New isolated tooling adds opt-in forced/graceful actual-PID lifecycle receipts, native terminal transaction drain/connection-close proof and reversible observers; default harness shutdown unchanged. Four-arm smoke,12 main arms (three alternating pairs per protocol at128 owners),12 bounded graceful size arms (three pairs each64/256) all pass, no exclusions/retries. All owned profiles removed. Fixed criterion: >=10% and >5ms excess in>=2/3 pairs, unchanged.

Graceful128 native-open baseline/candidate:24.9/40.8,454.4/39.2,26.5/39.2ms;2/3 trigger, combined restart/reopen0/3. Baseline454.4ms unfavorable outlier retained. Forced128 candidate611.8ms native-open outlier reproduced. Graceful256:34.7/118.2,32.5/89.1,34.1/117.7ms; combined528.1/722.4,531.0/676.5,570.4/672.2ms. All3 trigger both native and combined criteria. Candidate closeWork61-81ms versus baseline3.6-4.0ms at256, despite zero pending repair/count writes; renderer reopen CPU about7ms, Browser/storage CPU unmeasured. Logical inventories match exactly; terminal completion, clean exit0/new PID, recovery/recreation/edit/oracles/cleanup pass. Physical IndexedDB file sizes differ; they are not logical live data or proof of backend cause/cache equivalence.

## Recommendation and evidence

**Keep draft (option3).** Penalty is not confined to forced restart; it grows at256 in this bounded sample. Backend cause remains unproven, and larger-vault bounds are unknown. Do not dismiss it through better maintenance medians or change thresholds. Preceding256 delete/closure still saves26.8-30.6s wall and12.8-14.7 renderer CPU seconds. Preserve implementation. No speculative production correction is established. Smallest future causal probe would target browser/storage process during the same256 native-open/closure history; alternatively maintainer can explicitly accept the measured size-sensitive tradeoff. No further automatic experiment.

Pinned Node22.22.2 affected harness + complete real-IDB dependency integration file pass81/81, zero failures/skips. Prior complete real-dependency build, full local verify (real-IDB701/main1363/UI227/portable357/architecture7/core130) and final-artifact Windows Small correctness/recovery/interaction remain applicable; follow-up does not repeat or relabel them. Historical two conservative leases/native cleanup qualifications and earlier source5d52/buildd7d3 CPU cohort with final-source deterministic bridge remain in the report. No new physical mobile/macOS/full-app shutdown performance claim; no extra general UI manual matrix requested.

Detailed protocol, every pair, exact hashes, retained failures, original results and private receipt paths: docs/validation/dependency-repair-batching-207-2026-10-23.md. Tooling/documentation publication is recorded in PR207; verify the latest remote head before continuing.
