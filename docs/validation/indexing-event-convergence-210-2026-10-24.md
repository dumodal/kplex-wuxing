# PR210 indexing event convergence — implementation in progress

Prepared by Zsolt's Codex Agent. Accepted comparison baseline:
`90032c6d7499fa4e40179110f7b5672d356aa390`, including accepted #206/#207.
Initial branch head: `162f10b16c13d35444609314e44323738723c257`, initially clean.
Fetched main subsequently contains only release-metadata commit `6295b329…` beyond
that baseline. It is preserved; comparisons do not silently adopt a new baseline.

## Historical evidence and current reproduction

The two #202 reports cited in the PR have no exact source/artifact identity.
Their dictionaries distinguish overlapping activity intervals, checks from unique
owners, and full-build starts from completed builds. They motivate these tests;
they do not prove the same multi-hour symptom survives current accepted code.

The corrected deterministic real Chromium IndexedDB fixture starts from 24
authenticated source owners and complete dependency authority. An actual unscoped
resolver close starts broad validation. Three modify/metadata/known-resolver waves
are delivered at fixed owner boundaries 6, 12 and 18, targeting the last, first,
then last owner. Cardinality, order and final content are identical in both arms.

| Result | Accepted baseline | Initial correction |
| --- | --- | --- |
| Inventory outcomes | false / false / false / true | true |
| Markdown inventories | 4 | 1 |
| Dependency ensures | 65 | 28 |
| Delivered mutations | 3 | 3 |
| Authenticated final values | changed-1 / changed-2 | changed-1 / changed-2 |

This is work-count/causal evidence, not comparative CPU or native throughput. Both
arms eventually close. The baseline test intentionally fails the predeclared
one-sweep-plus-repair allowance of 36 ensures; the candidate passes. The initial
62-ensure characterization used an event trigger based on repeated ensure counts.
It reproduced cancellation, but the faster candidate received only two events.
That candidate attempt failed the cardinality check. It is retained as a harness
failure and is excluded from equal-input comparisons, not reported as a speedup.
Corrected baseline receipt: private `%TEMP%/kplex-210-causal-lryPQb/baseline.log`.

The causal chain is known native source event → exact inventory revision advance
→ broad callback cancellation → global/local authority remains incomplete → next
broad admission revisits the completed prefix. Existing durable source facts and
parser input survive, but they do not themselves certify dependency completion.

## Correction and validity contract

The acquisition owner retains its exact inventory revision. One additional scalar
scope revision distinguishes known same-incarnation Markdown source events from
topology, unknown/global resolver, environment, pause and unload invalidation.
Broad work can retain the former scope; each source still checks native identity,
path, stat, event revision, metadata identity, environment and repository selection.
An edit to an in-flight selected owner remains conservatively cancelled.

After captured dependency coverage closes, existing pending-source/referrer repair
drains known events without exposing semantic readiness. A final exact event
revision and existing repository projection/independent-writer fence are required.
Failure cannot retain temporary broad lookup authority. No schema, repository
read/lease/count mechanism, scheduling policy, timeout, feature flag, retained
proof cache or decoded-family store is added. Exact seam was posted on #210 before
changing restart-inventory callback fencing. No Mac work or private data is used.

Separately, actual coordinator callbacks reproduce metadata changed(A), then
delete(A), leaving zero dirty paths and mixed startup/metadata reasons. The real
interval admits one competing full builder on baseline. The narrow correction
extends #206's guard only to explicitly recognized startup and harmless covered
patch/scheduling reasons during incomplete source-backed eager startup. The
candidate admits zero. Dirty owners, real structural/unknown reasons, manual,
forced, cold, completed startup and On-demand controls retain admission.
This does not establish or claim a fix for repeated incomplete full-build results.

## Validation and remaining gates

- Pinned Node22.22.2 and real installed Obsidian declarations: affected typecheck
  passes. Targeted coordinator controls pass 24/24, zero failures/skips.
- Nine new real-IDB event controls pass, including extra/expired resolver, rename,
  delete/recreate, pause, unload, selected-owner same-stat and final-proof events.
- Independent review found temporary broad lookup authority could survive an
  exceptional final proof. The failure path now clears it. The independent-writer
  fixture initially used unchanged physical stats without an observed event, so
  acquisition legitimately reused the old head. Its unexpected completion is
  retained. Adding head assertions inside the intercepted production owner then
  produced a false positive: reconciliation caught the assertion as a failure.
  Consequently the published 80/80 aggregate does not establish independent-writer
  coverage. The corrected fixture changes physical input, retains actual selected
  sequences and the proof outcome, and asserts those facts outside the production
  catch boundary. The corrected control now passes, including an observed newer
  durable sequence and actual `superseded` proof result.
- A Date-registry change between owners could be absorbed by overwriting earlier
  observations. Acquisition now rejects contradictory observations before that
  overwrite, checking only the current owner's fields. Final/idle checks still
  validate the complete vocabulary; no new all-field scan per source is added.
- Current focused checkpoint: **80/80 passed, zero failures/skips**, including all
  12 event/proof/failure/environment real-IDB controls, 44 acquisition contracts
  and 24 coordinator controls. Private receipt: `%TEMP%/kplex-210-checkpoint-2.log`.
  Earlier broad run retained 185/186 passes; the writer-fixture qualifications above
  apply to that result and the later 80/80 aggregate. No result is discarded.
- Existing affected real-IDB/portable run: 150/151 passed. One old test required
  unconditional local-event cancellation. Its updated expectation requires the
  current scoped sweep to drain the event, retain exact durable values/body-work
  assertions and emit one readiness signal without a duplicate debounce. The two
  focused scheduling cases then pass. Original failed receipt is preserved at
  `%TEMP%/kplex-210-focused-rerun.log`; thresholds are unchanged.
- Full focused rerun, broader race controls, matched CPU/elapsed comparison,
  full verification/build, exact-build guarded Windows checks and remote CI are
  pending. No merge recommendation or completed implementation is claimed yet.

The PR remains draft. Raw receipts stay private. #207's accepted storage limitation
is not reopened. No merge, main write, release or production deployment.

## Bounded comparative protocol (declared before timing)

The separate `scripts/testing/indexing-event-convergence.mjs` runner compares exact
baseline source with the current acquisition source in otherwise identical browser
bundles. It pins source, tooling, oracle and executable bundle hashes. Main's narrow
admission guard has separate coordinator/native checks; it is outside this browser
CPU comparison. No runtime file is changed to select an arm.

After harness tests and a 16-owner smoke pair, collect one detailed native-request
diagnostic pair per cell, separately from timing. Timing uses a settled eight-owner
no-event control pair, three matched pairs with 16 owners and a broad pass but no
concurrent source events, and three matched pairs each at 96 and 384 owners with
exactly three fixed-position edit/metadata/known-resolver waves. Alternate arm order
between pairs. Every arm starts in a fresh owned Chromium profile/database with
closed seeded authority, and must deliver the same final documents and reach actual
source, journal, lease and semantic closure. Keep failures and partial receipts.

Measure each arm's cumulative renderer ProcessTime and main-thread TaskDuration
endpoints, elapsed work, last-event-to-closure interval and exact repeated work.
Browser/storage/utility CPU is unmeasured; do not add workers to renderer totals.
Equal bounded fixture counters and a 20 ms diagnostic heartbeat are included in
both timing arms. The independent semantic oracle/database enumeration is outside
timing. Heap endpoints are neither allocation nor peak memory. No other build,
test suite or native indexing run may overlap timing.

Use existing production flush joins with an explicit 16-join/45-second fixture
bound, retaining every cancelled/incomplete outcome. These joins do not establish
automatic native convergence. A separate guarded Windows scenario uses real Vault
writes and MetadataCache notifications, passively observes natural completion and
does not call flush/reconcile/trigger. A declared dependency-await gate establishes
functional event ordering only. Keep responsiveness requirements unchanged.

After each measured work interval, observe a separate 500 ms quiet tail, perform
the same subsequent edit, reopen acquisition/connection on the same database and
verify full final semantics, cleanup and absence of shifted lease/journal debt.
This is not a browser-restart/storage-growth study or full application startup.
Accept useful reduction only with exact mutation equivalence, genuine final
closure, oracle parity, retained negative controls and applicable green checks;
better timing cannot excuse stale facts or false readiness. No numeric acceptance
threshold or production timeout is changed.

## Verification in progress

Published implementation checkpoint `a61b92485102ac6483a37dc0a63e17bbfaa59908`
failed CI426 in the existing URL-heavy post-parse graph-patch timer assertion:
64.8 ms against the unchanged 50 ms requirement. Causal reachability and an
appropriate unchanged-check follow-up are pending; this is not relabeled a pass.
Read-only review confirms that the fixture loads both changed production owners.
The timed block directly calls patchMarkdownPaths -> patchMarkdownFiles -> acquire;
that path, parser, repository, scheduler and test are unchanged against the fixed
baseline. Modified reconcile/admission methods are not directly called by that
block, but earlier fixture state/timers prevent claiming causal impossibility.
One unchanged-head CI retry is running. After the local suite, run the entire
unchanged indexing fixture in isolation; its top-level script has no case filter.
If the failure repeats, compare the identical accepted-baseline fixture before
attributing it or changing production code. The 50 ms assertion remains intact.
The full local run separately encountered a Chromium fixture bootstrap failure
before the production bundle loaded in the ontology-settings on-demand case.
The run continues to completion; preserve the failed receipt and rerun the exact
case before attributing it. Neither failure is silently excluded.
Native driver cleanup tests pass 5/5, including partial setup, independently failed
teardown and explicit absence of readiness-forcing calls. This is tooling evidence,
not native acceptance. The driver retains bounded partial event/writes/probe state
on failures and qualifies write acknowledgements by owner and event position.

The initial full local run completed its browser lane at **732/733**, zero skips;
the single failure was the bootstrap receipt above. Prior verification stages
passed, but npm verification exited failed before the final build. The entire
unchanged indexing fixture then passed in isolation, as did the exact ontology
case (1/1, no skipped cases in its filtered receipt). Corrected event controls and
both harnesses pass **19/19**, zero skips. Private receipts:
`%TEMP%/kplex-210-verify-a61.log`, `kplex-210-indexing-isolated.log`,
`kplex-210-ontology-isolated.log`, `kplex-210-tooling-controls.log`.
One passing isolated run does not replace final complete verification or CI.

The 16-owner tooling smoke pair passes both arms, including semantic oracle,
quiet tail, subsequent edit, connection/acquisition reopen and complete resource
retirement. Private receipts: `%TEMP%/kplex-source-event-210-64TRY5/`.
Its renderer CPU is 0.121754/0.106979 seconds and elapsed160.8/127.9 ms
(baseline/candidate); this is a single smoke pair, not the matched study claim.

Qualification limit: the source-event predicate proves current live Markdown
TFile equality, not historical incarnation membership by itself. Observed native
create/delete/rename notifications independently invalidate topology; captured old
TFiles also fail the Vault identity fence. The final dependency projection is not
an independent replacement for native topology notifications. No safety claim is
made for an entirely missing create/delete notification on a newly inserted or
replaced file. Supported ordering remains conservative in delete/recreate controls.
