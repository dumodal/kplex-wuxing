# PR212 — acceptance after merged #211

## Baseline and integration

Prepared by **Zsolt's Codex Agent**. Accepted main advanced to
`6fa936d6522ba45f2c6bb2dfb853671e5218b055` (merged #211) during final PR212 acceptance.
CI441 and CI442 passed the preceding branch, but final readback found a HANDOFF conflict with the
new main. This record covers the normal main integration and its fresh acceptance; it does not
relabel the [initial af09bc4 evidence](warm-source-selection-212-2026-10-24.md).

The accepted #211 changes do not modify `SourceRepository.ts` or `sourceAcquisition.ts`. Their
baseline bytes match af09bc4, and PR212's candidate bytes are unchanged. Other accepted runtime
modules are now present in both comparison bundles. Relative to 6fa936d, these remain the only two
production files changed by PR212. No unmerged #211 work or history was modified.

The conflict resolution retains the #212 handoff/standing header, the accepted stable-gates test
command, and all new warm-selection test entries. No schema, scheduler, compiler, graph-publication
or gate semantics are changed by the resolution. The original exact-head/lease-retirement contract,
focused tests and failure analysis remain in the initial report. C15–C26 remain paused.

## Fresh current-baseline comparison

Node 22.22.2; `node scripts/testing/warm-source-selection.mjs compare`, now pinned to 6fa936d.
Same predeclared serial 32/128/256-owner matrix, three alternating 128-owner pairs and bounded
dense/legacy/shared-revision controls. No agent build, other test or native indexing overlapped.
The [receipts](warm-source-selection-212-main-integration-2026-10-24.json) retain every arm,
source/bundle hash, transaction/request total, semantic digest, follow-up edit/reopen and cleanup.

| Complete unchanged pass | Order | Baseline ms | Candidate ms | Baseline renderer CPU ms | Candidate renderer CPU ms |
| --- | --- | ---: | ---: | ---: | ---: |
| 32 owners | A, F | 47.347 | 46.551 | 41.978 | 37.999 |
| 128, pair 1 | A, F | 159.535 | 147.442 | 114.944 | 109.826 |
| 128, pair 2 | F, A | 161.924 | 148.115 | 114.876 | 110.024 |
| 128, pair 3 | A, F | 158.421 | 148.097 | 114.844 | 110.279 |
| 256 owners | A, F | 319.415 | 282.686 | 224.419 | 205.528 |

Current-baseline 128-owner medians improve **7.2% elapsed / 4.2% renderer CPU**. This is a small
synthetic workload, not a production-vault percentage. The earlier adverse pair remains retained;
the different cohort medians are not attributed to #211. Renderer CPU excludes Browser/storage
process CPU; detailed accounting remains separate from primary timing.

Counts are unchanged from the causal trace: 32-owner host comparison **130 → 98** transactions;
complete 128-owner reconciliation **777 → 649**. Head gets, hashes, decodes and lease counts remain
equal. All **20 current-baseline arms passed** exact unchanged heads, independent semantic/provenance
parity, quiet-tail closure, an ordinary edit and a second actual browser restart. All owned profiles
were deleted. The sampled profile maximum stayed below 10 MiB, against the unchanged 256 MiB
profile ceiling and 2 GiB free-space preflight; this is not a continuous disk or heap peak.

The tradeoffs remain: a clean current owner saves one transaction; a legacy owner adds one optional
probe transaction. The mixed two-owner legacy control therefore has no net saving and adds two
head requests. Genuinely missing heads also add one probe transaction before ordinary inspection.
Empty-cache cold-start and legacy-heavy latency are unmeasured. All adverse follow-up observations
remain in the receipts, including the slightly slower 256-owner edit (16.521/16.567 ms).

## Integrated verification and native acceptance

Integrated **`npm run verify:obsidian` passed** with Node 22.22.2, actual dependencies/Obsidian
typings and the real production build. All per-command groups passed: architecture 7, core 130,
functional 1,420, browser UI 228, portable sources 357 and **real-IndexedDB sources 775**. These are
not unique-test totals. The additional accepted-main cases are included, the two-path cancellation
contract passes, and the 20,015-owner publication case passes in 249.419 seconds. No assertion,
fixture size, timing budget or deadline was weakened.

The integrated built/staged `main.js` SHA-256 is
`8f613477a4b94c590533ac7d53164de25c1c550e1fb7b7bc986ac7bfae56c401`.
Manifest/styles hashes remain in the receipts. The artifact was built before the merge/report commit,
from the accepted-main integration working tree on `16cdb2d`; its build ID therefore includes that
pre-merge revision and dirty marker. The receipt pins the actual runtime sources, baseline and
executable bundles; this is not a claim that the artifact was built from a later clean commit.

Only existing Small was opened: Obsidian 1.15.0 (installer 1.14.0), Electron 43.3.0 /Chrome
150.0.7871.212, AC power, real foreground and original background throttling. A fresh backup and
CLI path guard preceded staging: 74 Markdown /76 visible files, originally closed.

| Integrated exact-build native check | Result |
| --- | --- |
| Strict staging /registered command /rendered DOM /captured JS errors | Passed, exact three artifact hashes |
| Protected metadata component, 16 existing sources | Passed; 32 transactions, 48 hashes, 16 lease adds/deletes; exact facts/heads; zero owned debt |
| Shared selection and protected metadata, 16 sources | Passed; 48 transactions, 48 head gets, 48 hashes, 16 lease adds/deletes; exact facts/heads; zero owned debt |
| Deliberate failure after one shared read | Expected failure; independent wrapper/controller/config cleanup passed, zero readers/decode/owned durable leases |
| Two warm reloads | Passed; strict readiness 3.194/2.856 s, unchanged source heads/settings, zero source Markdown reads/parses/repairs and zero full builds |
| Six foreground inventory workflows | Passed with held background inventory; resumed normally, zero source flush joins, no fixture/controller left |
| Fresh-state restoration | Passed; settings/workspace/core/community enablement/original artifacts byte-exact, all 76 visible files and content digest unchanged; exact selected renderer exited, original closed startup flag restored |

The first two reader rows cover different operation scopes, not native A/B timings. Warm counters
include 15 source-acquisition checks and 16 reused bodies per run; zero physical reads/parses is not
zero entry calls. Native elapsed observations are functional evidence, not production speedup,
exclusive CPU, synchronous task duration or actual paint. Inherited protection was not erased or
counted as newly leaked. Restoration uses the exact recorded renderer's exit before offline writes,
without reopening another vault or changing OS permissions.

All current-baseline profiles and native fixtures are retired. The normal accepted-main merge and
validation files are published together after these checks; remote head/status are read back on
PR212 after the commit. Historical CI441/CI442 remain green on their original tree and do not
substitute for the new integrated-commit CI.

The original 50 ms URL-heavy and 45 ms parser assertions, all correctness assertions and normal
test deadlines remain unchanged. Only existing Small is used natively. No deleted Brain copy,
new native vault, private database dump or additional large synthetic fixture was created. The
repository's existing 20,015-owner verification test remains enabled.

Final remote CI belongs to the integrated commit and is recorded on [PR212](https://github.com/zsviczian/kplex/pull/212)
after this report's commit. Keep the PR draft for independent review; no PR merge, release or
production-vault deployment is authorized. Production-scale speedup, Windows/minimum-host and
physical-device acceptance remain unclaimed. No additional manual check is required for the scoped
source contracts. Recommend the narrow correction for independent review with the measured
current-format benefit and explicit legacy/missing-head costs.
