# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Review handoff: PR #206 startup source convergence

Prepared by **Zsolt's Codex Agent**, 2026-10-23, Europe/Budapest.

Implementation and the authorized independent Mac validation are complete. Keep [PR #206](https://github.com/zsviczian/kplex/pull/206) **draft for maintainer review**. No merge, release, main write or production deployment is authorized. This handoff does not start later integration work.

Branch: `2026-10-23-startup-source-convergence`.
Accepted runtime base: `0f94252aabb8b23458b5df192380854ea0bddd53`, including #201/#204.

## Reviewable code and verification

- A1 `4407177ece2af255d265987fe5fdb6662db8b1dc`: bounded/coalesced existing-owner resumption after settled source/semantic recovery.
- A2 `91770e42947d49b543eb80e75e2b1b7fd5088c89`: meaningful presentation/alias/empty-demand semantic publication recovery.
- B `b38a8899b95b0acbf74349cbbe9a7e232fa5a56a`: pre-layout enumeration qualification for source/URL ownership and a narrow automatic startup-only competing-builder guard; genuine changes/explicit rebuilds preserved.
- Combined exact main.js SHA-256: `6ad7c8165cfa0ad66448897aaf0c401b0ccf722702f3c7498c911348502d4a50`. Runtime source remains unchanged from B; later commits are tooling/evidence.
- Node22.22.2 real-dependency `npm run verify:obsidian`/exact-build Small smoke passed. Native Small recovery/SI4/SI5/foreground/ontology/startup/admission and paired controls are retained with qualifications in the report. Native host1.15.0(installer1.14.0), Electron43.3.0/nativeNode24.18.1.
- `SourceRepository.ts` is unchanged: `951ce4e86ad1bea9b86a53d7efad1c2e4375e3eda38e220b4933409510a337ef`. No leases, validation, schema, count-reuse/reclaim or reserved adapter read-plumbing loop changed.

## Findings and limits

Read [the detailed validation report](docs/validation/startup-source-convergence-206-2026-10-23.md).

The second accepted-base S2 run naturally failed initial source adoption: flush=false with719masks at launch+2163.6s; authority recovered2436.1s/all owners drained2436.7s, but no second adoption followed for266.4s through the original45-minute cap. It is incomplete/censored at5214.95CPU-s, not another completed timing pair. The first complete base observed1963.1sclosure/4036.03CPU-s with missing independent external power series. Both candidate repetitions completed428.6/441.0s with693.78/728.23CPU-s through full10-minute quiet, zero source-body reads/parses/repairs/masks, one genuine resolution activation and retained cached-owner validation. No universal percentage or exact plugin-only CPU attribution.

Exact candidate real-copy S1 naturally selected source-backed eager startup and settled before controlled fault. Reopened initial coordinator flags on that settled lifetime, withheld metadata for one existing bounded owner (no note writes), then restored the genuine getter/change signal: exactly two actual adoptions(false,true), checked+2, no body reads/parses/full builds/masks, scene retained, independent cleanup passed. This qualifies the control and is not a naturally stranded fresh candidate startup.

Normal-cache baseline/candidates match all complete vocabularies and seven strict target hashes. Explicit accepted-base full rebuild also yields110470nodes; first baseline110472 extra identities were not captured/reproduced, so retain that qualification. Full reference has six strict hashes equal; saved-center difference is three joined type-name string orders only, with all exact decisions/provenance/gates/endpoints/roles/types/directions equal. Fixture overrides layer identically; order can affect arbitrary conflicting overrides/exact-text predicates, so no universal cosmetic claim or oracle normalization. Original broad tag fails cached profiles(2pending/256dependency visits); full state hits1000-relation budget, not a pass. Early recent-tab guard fails both baseline/candidate; workspace-ready control passes both without deadline change. One candidate Small renderer crash is retained/unattributed and isolated reload recovered.

## Safe final environment and private evidence

- Authorized copy: `/Users/zsviczian/Obsidian/kplex-test-brain-mac`.
- Exact DB: `k-plex-index-v1-6b706c65782d746573742d627261696e2d6d6163`.
- Protected original: `/Users/zsviczian/Obsidian/Zsolt's Brain (2025)`; never write/deploy/toggle/restore its database.
- Final copied nonconfiguration20190files/10956614603bytes and protected production223configurationfiles/84002510bytes match initial hashes. There is no original full-content baseline.
- Test-copy settings/community/core/workspace bytes restored; only exact candidate main.js/manifest intentionally retained, **disabled**. Original active file-explorer leaf and workspace bytes restored. Sync/Publish/external writers off, enabled set empty. One copy window, no owned controllers/hooks/debugger, native IDB methods and layout observer restored, no live owned test processes. Small closed/original19configuration files restored offline.
- Restricted durable evidence: `/Users/zsviczian/kplex-private-evidence/2026-10-23-pr206-final/`; read `evidence/ARCHIVE_INDEX.md` and `archive-manifest.json`. Per-file readback verification passed. Do not publish its raw paths/content/configuration. Original task directory `/private/tmp/kplex-206-l1y0aw88` remains retained; pointer `/private/tmp/kplex-206-active-path`.
- Historical203 compressed checkpoints/sidecars are unchanged in `/Users/zsviczian/kplex-private-evidence/2026-10-23-pr203-final/evidence/`. S2 raw hash4e70e312...6f4c2; A4 raw2c1ec851...dfe8; source-only S1 raw7bb3818f...59b2df. S1 old raw temp path was absent; new private unpack verified original897030856bytes. Failed pre-import receipt and all same-job resume receipts remain. No native operation remains active.

## Later coordination

#205 merged into main as `930747679894f003a2acf3b800df798826ee090c`; its read batching has not entered this branch/runtime. At the latest checkpoint #207 remains draft/open, head`d6ef7f07b199e2eb2497f13148374f5edf6802d3`, and owns dependency-count maintenance. Do not import unfinished Windows code or assume additive gains. A later authorized integration checkpoint must preserve both threads/tests/ledger and validate the combined exact artifact on this guarded Mac copy after independent review.

C14 remains accepted; C15-C26 remain paused. No additional manual testing is delegated for the completed authorized scope; existing limitations and later integration are explicitly retained for maintainer review.
