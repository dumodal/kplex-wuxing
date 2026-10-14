# Bounded ordinary evidence maintenance (PR #153 E2)

This checkpoint follows the [measured ordinary-evidence gate](indexing-evidence-maintenance-baseline-2026-10-14.md).
Baseline runtime is B2 `c507ba1`; `c9703bf` adds measurement tooling without runtime changes.
The candidate passes full verification, three alternating native pairs and foreground smoke.
The checkpoint commit contains this report and the exact source/artifact ledger below.

## Change and bounds

The existing portable evidence owner may flatten small positive ordinary-patch overrides above
one unchanged standalone root. It retains at most 32 changed pairs, 256 current plus overwritten
root declaration entries, 64 KiB of scalar strings, and eight layers/256 examined layer keys.
These limits bound additional retained shadowed payload, not the complete graph's heap usage.
They are private admission limits, not settings. No global derived index is activated.

Any latest tombstone, root tombstone, active target-kind metadata, unknown non-scalar evidence,
excessive depth, large bucket or excessive payload uses the unchanged full compactor. Empty
synthetic history also retains full maintenance. Public `fork()` and `compactCooperative()` retain
their immediate-parent and standalone-result contracts. No persisted schema or source authority changes.

A separate host patch fork folds only a just-completed bounded head into its first private child.
That detail preserves the full compactor's original eight-patch maintenance cadence. Simply
retaining a depth-one sparse result would advance the next maintenance epoch by one patch;
dropping a tombstone early can change later delete/re-add insertion order. Focused tests reproduce
that counterexample and compare every publication with the unchanged standalone compactor.
Array references can be shared during the bounded fold because ordinary pair writes replace arrays;
path sets and Maps remain private. Public mutation retires folding authorization. Cancellation or
reentrant changes/metadata activation at sparse checkpoints reject the prepared result.

GraphBuilder opts only ordinary Markdown maintenance into sparse admission. Semantic no-ops keep
their existing evidence pointer. URL and structural maintenance retain the full path. Ordinary
neighbor Maps, per-file atomic publication, IDs, inverse/Hidden/date semantics and source guards remain.

## Controlled actual-patch work

The final fifteen workload/size cells retain identical unsorted graph, canonical-target-path,
evidence-order and ID digests. These finite-host-input runs count actual production patch work;
their fixed CPU clock supplies no elapsed-time evidence. Body reads/parses remain zero.

| Workload | Baseline maintenance | Candidate maintenance | Other work |
| --- | --- | --- | --- |
| 64 role replacements, 4,097 originals | 8 full compactions; 32,776 declaration entries copied | 8 sparse compactions; 8 declaration entries copied; 8 folded pair entries / 16 path entries | 192 ordinary neighbor copies unchanged |
| 64 endpoint changes, 4,097 originals | 8 full compactions; 32,776 declaration entries copied | Same full fallback | 256 ordinary neighbor copies unchanged |
| Growing 4,096 owners | 511 full compactions; 1,046,528 declaration entries copied | 102 full + 409 sparse compactions; 210,120 + 8,168 declaration entries copied; 8,168 folded pair / 16,336 path entries | 8,386,560 ordinary neighbor copies unchanged |

Counts are bucket entries copied, not duplicated declaration objects, bytes or heap savings.
Growing ingestion still requires full rebases and quadratic ordinary adjacency copying. This is
a bounded replacement-set improvement, not globally linear ingestion or a whole-startup claim.

## Native comparison and validation

The driver uses one actual 4,096-link native
note and one owned frontmatter leaf, an installed isolated GraphIndex and real file/parser/IDB
inputs. Every timed edit alternates the actual role; a bounded non-ontology marker gives distinct
physical sizes across rapid edits. The final fixture awaits actual Vault modify delivery and
completes real source reconciliation before patch timing, recording preparation reads/parses
separately. No cached body, event or source authority is fabricated. Setup/edit/acquisition waits
are outside timing. Depth-eight maintenance
is forced for eight edits per independent lifetime, so this measures a maintenance-heavy API
workload rather than the natural frequency of compaction in user editing.

Each final invocation has one instrumented work/heartbeat/atomic-commit run and one timing group
without those observers. Three baseline/candidate pairs alternate exact previously verified builds;
source read/parser counters remain lightweight forwarding observers in both groups.
The native graph also includes existing small-vault evidence. Source acquisition counts are observed,
not assumed zero. Preliminary baseline attempts retained equal graph digests but unequal source-read
budgets (2–4 per eight edits); failed receipts are retained. Corrected distinct-revision baseline
passes at four reads/parses per group, with eight full compactions copying 44,432 declaration entries.
Baseline preliminary totals are 1,380.9 / 1,420.0 / 1,373.9 ms. These sequential observations are
excluded from the final prepared-source comparison. A subsequent failed invocation (one versus
zero timed reads) exposed asynchronous source work despite matching graph values; final explicit
reconciliation establishes the matched source condition instead of accepting unequal inputs.

All six final native invocations match the same ordered graph/evidence digest, with 5,554 originals
including the pre-existing small-vault content. Each timed eight-edit group has zero body reads/parses.
Actual preparation is excluded and separately reported: the counted index needs 90 reads/parses,
and the following timing index needs one, in every version/sample. A preparation failure is retained
separately; its exact cause was not captured. The final driver permits at most three setup passes,
retrying only a proven changed inventory revision; none of the accepted samples required a retry.
The setup and cleanup deadlines remain unchanged. This does not create a production retry policy.

| Native observation | Baseline | Candidate |
| --- | --- | --- |
| Eight forced compactions | 8 full; 44,432 declaration entries copied | 8 sparse; 16 entries copied; 8 folded pair / 16 path entries |
| Three eight-edit totals, ms | 419.5 / 796.8 / 804.0 | 773.2 / 397.2 / 770.9 |
| Group median / range, ms | 796.8 / 419.5-804.0 | 770.9 / 397.2-773.2 |
| Median of all 24 individual patches, ms | 7.75 | 5.10 |
| Individual range, ms | 6.2-397.1 | 3.9-384.6 |
| Largest heartbeat gap in counted runs, ms | 16.5 / 17.2 / 18.3 | 18.0 / 20.6 / 16.3 |
| Largest synchronous commit, ms | 0.2 | 0.2 |

Every individual patch, including the approximately 360-397 ms cases, remains in these statistics.
The group ranges overlap and pair differences change sign: **no overall elapsed-speedup claim**.
Individual medians and removed work support the bounded maintenance improvement, not exclusive
CPU attribution, natural editing frequency or whole-startup improvement. The 16 ms timer and
end-of-patch partial intervals measure native event-loop gaps, not frames, paint or trusted input.
The counted runs show no large synchronous commit or event-loop stall; they do not establish
physical-device responsiveness. All focus/visibility/throttling and primary-quiescence checks pass.

Eleven focused core cases pass, including retained generations, 320 mixed operations against the
full oracle, delete/re-add cadence, inactive/active facts, record/pair/string/depth limits, unknown
payload, maximum layer keys without unrelated root scans, final cancellation and reentrant changes.
The existing 44 affected regressions pass unchanged. Final full `verify:obsidian` passed architecture
7, restricted core 113, normal regressions 797, UI 63, portable sources 334, browser source 495,
official lint, production build and native smoke. This includes the 20,015-owner browser case with
zero body I/O and terminal cancellation checks. The initial full run failed `no-this-alias`; the
layer walk was corrected without suppression and the complete lane repeated successfully.
Exact final `main.js` is `e064f9b8db8f573019fd05f9997d88a65d6e43157e2f3da91d3a64600cb0f841`;
manifest 0.1.3 and stylesheet bytes are unchanged. All six final foreground scenarios pass:
folder/gate access, navigation, relationship creation/removal, note creation and visible editing
during paused source acquisition. Broad flush calls are zero; eventual source closure, zero owned
resources, controller removal and exact settings/enablement-byte restoration pass.

## Reproduction and receipts

Use Node 22.22.2 and the explicit three `kplex-test-small` vault variables from CONTRIBUTING.
Run `node --test tests/sparse-evidence-compaction.test.mjs` and
`node scripts/testing/evidence-maintenance-work.mjs`, with `--baseline-ref=c9703bf` for the old
GraphBuilder/evidence modules. Run `npm run verify:obsidian` and then
`npm run verify:obsidian:foreground` with separate report directories. No production instrumentation
is added; test observers restore original receiver/result/promise behavior.

For native pairing, stage each version's three exact artifacts using its successful full-verification
receipt. The baseline is the B2 build recorded in its report; candidate hashes are below. Set
`KPLEX_EVIDENCE_TIMING_TRIALS=1` and run
`node scripts/testing/obsidian/evidenceMaintenance.mjs` in baseline/candidate order three times,
with a fresh report directory each invocation. Baseline attribution also sets
`KPLEX_PROBE_BASELINE_REF=c9703bf` and `KPLEX_PROBE_ARTIFACT_DIR` to its preserved artifact directory.
Default three-trial invocations remain available for exploratory runs. Staging receipts reuse the
prior full acceptance by matching all three hashes; they are not six additional full test runs.

[Environment/source ledger](indexing-sparse-evidence-2026-10-14/environment-and-sources.json),
[paired summary](indexing-sparse-evidence-2026-10-14/paired-summary.json),
[portable baseline](indexing-sparse-evidence-2026-10-14/work-baseline.json),
[portable candidate](indexing-sparse-evidence-2026-10-14/work-candidate.json),
[full verification](indexing-sparse-evidence-2026-10-14/host-verification.json) and
[foreground receipt](indexing-sparse-evidence-2026-10-14/foreground.json) retain exact identities.
The same directory holds every final pair/staging receipt, preliminary native attempts and the
failed lint, acquisition-equivalence and preparation receipts. Runtime sources were frozen before
the successful full run; later changes refine only the test driver and documentation.

No new manual Windows check is requested while the automated native lane can exercise these contracts.
macOS/physical mobile and full M native-scale/retained-heap/heartbeat acceptance remain pending;
timings here do not establish actual paint or device memory behavior.
