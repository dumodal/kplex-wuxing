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
  exceptional final proof. The failure path now clears it; explicit throw and a
  verified second-connection activation reject readiness. The first writer probe
  lacked an explicit post-write selected-head observation and returned an
  unfavorable unexpected completion; it is retained. The revised control asserts
  a genuinely newer durable head, original projection identity and unchanged
  original-connection activation count before testing final rejection.
- A Date-registry change between owners could be absorbed by overwriting earlier
  observations. Acquisition now rejects contradictory observations before that
  overwrite, checking only the current owner's fields. Final/idle checks still
  validate the complete vocabulary; no new all-field scan per source is added.
- Current focused checkpoint: **80/80 passed, zero failures/skips**, including all
  12 event/proof/failure/environment real-IDB controls, 44 acquisition contracts
  and 24 coordinator controls. Private receipt: `%TEMP%/kplex-210-checkpoint-2.log`.
  Earlier broad run retained 185/186 passes; the one writer-probe failure preceded
  the explicit durable-head/connection assertions above. No result is discarded.
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
