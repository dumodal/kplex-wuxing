# Native warm URL reconstruction at 20,088 owners

Measurement checkpoint for PR #153, following E3 `0ad463c` on
`2026-10-13-indexing-performance`. The maintainer authorizes continued unsupervised work,
with a commit and push after each validated checkpoint. Production source and release
versions are unchanged in this measurement checkpoint.

## Scope and fixed inputs

The baseline is the actual previously validated A build, `a162044`, and the candidate
is E3 `0ad463c`, which includes B1/B3/B2/C/E2/E3. This compares the accumulated changes;
elapsed differences cannot be attributed exclusively to one package. The distinct-child
shared-origin fixture directly exercises B2's removed adjacency work. It does not exercise
thousands of distinct aliases on a single child URL.

The authorized native vault is `C:/Obsidian/kplex-test`, config `.obsidian`:
20,088 Markdown files and 20,107 total files at initial inspection. Its preserved
`Indexing-performance-153` subtree has 20,000 deterministic notes, 8,831,230 source bytes,
80,000 unresolved placeholders, 8,000 distinct child URLs under `https://example.com`,
and input digest `50b8cb12ef83c3cd62f1605390fe6ff793079a9f6e37e471e59d0060cf287cd0`.
Source counts describe this dedicated high-node fixture, not Synthetic-Scale-v2 or a
runtime graph acceptance result.

Each measured installed GraphIndex has a new disposable cache namespace. Its URL cache
contains all 20,088 physically current actual owner records copied through bounded cache
pages; ordinary graph snapshots, parsed bodies, neutral source heads and dependency
inventory are absent. Its working/published graphs start empty. The actual vault and its
normal caches are never purged. Test-only cache copying yields between pages outside
timing; measured replay retains production responsive 6/24 pacing and five-second display
publication, including actual final owner validation. On-demand global source authority
is deliberately not an acceptance condition.

Every run uses one counted lifetime and a separate timing-only lifetime. The selected
origin's iterator visits distinguish private working work from displayed publication work.
Heartbeat and unforced `performance.memory` samples belong to the counted lifetime.
These memory observations are neither retained-heap nor process-peak acceptance; the
counted run also deliberately retains one early display Map/alias array to verify its
contract. No memory improvement follows from those observations.

Exact physical file incarnations and path/mtime/size/ctime are fenced at setup/end and
by actual Vault events. Timed intervals require foreground, focus and unchanged enabled
background throttling; visibilitychange/blur invalidates a trial. The primary index must
be quiet. Graph/evidence digests are computed once after timing, preserving page/neighbor/
alias/declaration order, multiplicity, IDs and all relation values. Only object property
enumeration is normalized. Working targets must be canonical, and retained display Maps
and aliases must remain unchanged.

## Results

Driver Node22.22.2, Windows10.0.26200, i9-12900, 68,448,301,056 bytes RAM;
native Obsidian1.14.4/installer1.14.0, Node24.18.1/Electron43.3.0/Chrome150.0.7871.212.
Baseline main SHA256 `bc8293b5732420c424a83839eda2892764ca20e95667919a2cbde7e769fe92b6`;
candidate main `60fcb5dd51261d2f91c6175398e49344695e81359269a705358d923e4ac72e18`.
All three files match their prior full receipts. Both test vaults end on the candidate.

Three alternating baseline/candidate pairs passed, each with independent counted and
timing-only lifetimes. All twelve lifetimes reconstruct 16,069 pages and 16,127 declarations
from 8,083 URL references, with origin degree 8,000 and zero body reads/parses.

| Pair | Baseline elapsed (ms) | Candidate elapsed (ms) | Baseline heartbeat max (ms) | Candidate heartbeat max (ms) |
| --- | ---: | ---: | ---: | ---: |
| 1 | 31,805.6 | 17,120.8 | 60.3 | 67.6 |
| 2 | 26,554.8 | 15,980.5 | 33.5 | 72.1 |
| 3 | 25,720.5 | 13,664.3 | 52.4 | 94.4 |
| Median | 26,554.8 | 15,980.5 | 52.4 | 72.1 |

Observed elapsed median falls about 39.8% for this warm URL reconstruction/owner-validation
entry point. This is not total plugin startup, saved preview, cold parsing or actual paint.
Selected-origin working visits are exactly 31,996,000 = 8,000 * 7,999 / 2 in every baseline,
and zero in every candidate. Display visits are 40,118/36,222/35,229 versus
18,586/16,539/19,620, with counted flush counts 9/7/8 versus 4/5/4. Actual production cadence
is unchanged: faster working publication accumulates different batches between timer flushes.
Displayed work is therefore not a fixed-cadence equality comparison or a separate asymptotic claim.

**Foreground caveat:** all three candidate heartbeat maxima exceed the baseline range. The
observations include GC/scheduling and instrumented work; they do not identify the cause or prove
paint/input latency. They do prevent a responsiveness-win claim or unconditional performance
acceptance. The next gate must attribute synchronous display-flush and GC costs and measure
retained memory before choosing another production change or accepting a tradeoff. No assertion,
production pacing threshold or watchdog was relaxed to improve these numbers.

Every physical digest is `c88c1776685b60c1456806457ac97679653f30326c6ef572ba5b13e747f607e0`;
every seeded-fact digest is `f4efd617186c7464198e8a8ca7073fed49d3e2a23d73f80af76f21e87014f5af`.
Every working/display graph-and-evidence digest is
`31a78202bb997736c2ea056a0d3e1865070e0454f0c04f023f6f9688f8042d50`.
All six probes clean up successfully. All six exact-build staging/render checks pass with
independent settings/enablement restoration; outer workspace/window restoration passes.

## Failed setup attempts and corrections

All receipts below remain separate from the matched series in
[the raw evidence directory](indexing-native-url-scale-2026-10-14/).

- The initial cache had 20,079 rows despite 20,088 current in-memory owners. Inspection
  found nine missing help-note rows, all with actual physically current owner/body facts;
  two had URLs. Production `persistUrlOwner` filled only those nine, with zero body reads
  or parses. No empty facts were fabricated. The initial incomplete attempt failed before
  timing and cleaned up.
- The large renderer initially reported hidden despite a visible, focused native window.
  A background-throttled attempt was explicitly cancelled and cleaned up; it is not a
  foreground timing sample. Positioning and temporary topmost diagnostics also failed
  visibility checks. One actual window reload restored visibility. Returning it to its
  original minimized state lost visibility again, so the matched series keeps one outer
  window lifetime and restores the original bounds/minimized/maximized state at the end.
  No visibility property or throttling policy was overridden.
- The first build-switch render passed, then the temporary stager detected changed
  `community-plugins.json` bytes. Its disable/enable sequence retained both enabled plugins,
  but its original helper checked rather than restored bytes on failure. The exact original
  serialization for that attempt cannot be certified. The corrected helper saves the original
  bytes to disk before each switch, validates membership and restores exact bytes in finally;
  subsequent paired-series settings and enabled-list receipts are independently checked.
- The next older-build UI staging attempt found no rendered Plex element while restoration
  and foreground work overlapped. It failed the unchanged stager and restored configuration.
  The matched orchestration now saves the workspace, closes Plex views during replacement,
  waits for actual URL restore completion, then executes the existing strict render smoke.
  This setup is outside measured isolated URL reconstruction; the failed UI attempt is not
  relabelled a pass or used as evidence of a new runtime regression.

The native controller has a new explicit 15-minute overall experiment cap; existing probes
retain their 180-second default, CLI calls remain bounded and independent cleanup has its
existing 20-second cap. Production 90-second inactivity/watchdog and publication policies
are unchanged. Successful staging transparently reuses the prior full verification by all
three artifact hashes; it reruns staging/render, not the full suite.

## Remaining acceptance

The raw directory contains all six final probes and stage/configuration guards, the prior failed
attempts, the matched summary, final fixture audit and source/artifact/driver ledger. Production
source still matches E3's full acceptance: architecture7/core128/normal812/UI63/portable334/
browser495/lint/real build/native smoke. This measurement-only change reruns native scale/staging
and tooling syntax/whitespace checks; it does not claim a new full-suite execution.

Retained heap, native process peak, synchronous-stall attribution, full application startup,
actual paint, macOS and physical Android/iOS remain separate. No additional manual Windows test
is requested for this tooling-only checkpoint. The measured foreground concern is assigned to
the next automated checkpoint rather than delegated to the maintainer.

## Reproduction and validation

Use Node22.22.2, the actual dependencies and the exact baseline/candidate artifacts verified
against [A's full receipt](indexing-hydration-2026-10-13/host.json) and
[E3's full receipt](indexing-private-compiler-append-2026-10-14/host-verification.json).
Set `KPLEX_TEST_VAULT_NAME=kplex-test`, its absolute `KPLEX_TEST_VAULT_PATH` and
`KPLEX_TEST_CONFIG_DIR`, and a fresh `KPLEX_HOST_REPORT_DIR` for every invocation. Prepare
the same verified fixture/settings and complete current URL-owner cache before the series.

```sh
node --check scripts/testing/obsidian/controlledProbe.mjs
node --check scripts/testing/obsidian/largeUrlReplay.mjs
node scripts/testing/obsidian/largeUrlReplay.mjs
git diff --check
```

For the baseline, additionally set `KPLEX_PROBE_BASELINE_REF=a162044` and
`KPLEX_PROBE_ARTIFACT_DIR` to its exact build's `dist`; unset both for the candidate.
Alternate A/current three times with new report directories. Use the established native
runner/processTools for exact staging: preserve settings/enablement bytes and workspace,
close Plex views before disable/enable, wait for actual URL closure with no visible views,
then execute the unchanged render smoke before the isolated experiment. Keep one foreground
window lifetime across the series; restore the saved workspace/window afterward. Do not
substitute hidden-window samples, change throttling or extend production/test watchdogs.

Tooling syntax, exact native scale/staging, final fixture/configuration/workspace/window audit,
JSON validity, documentation links and whitespace checks pass. Raw evidence is aggregate-only;
the cache-inventory failure identifies only existing help-note paths, not vault body contents.
