# Indexing activity diagnostics

PR #174 implementation reference (schema 1, capture 1; draft acceptance). The passive recorder is implemented first; both public copy surfaces and validation are completed in later checkpoints. No efficiency or full-day device claim follows from this schema.

## Collection and privacy

Use the reviewed build normally for several hours to a day, then use **Copy index diagnostics** or **Report bug**. Review the copied text before sharing it. Record symptoms, build changes and plugin reloads separately. Copying never uploads a report or resets the capture. Several reports from one session overlap; they are not independent samples. No debug-console setup or profiling is needed.

Capture lasts for one plugin lifetime. Reload, process termination and mobile process eviction reset it. There is no cross-session diagnostic identifier or persistent diagnostic log. Only fixed categories, counts, durations and public build/mode metadata enter the new recorder. It retains no note/drawing content, paths, names, URLs, property values, custom field names, queries, raw exceptions/stacks or source identities. Existing disclosed theme/plugin metadata remains subject to the existing support-report policy.

The default recorder creates no timers, polling, watchers, heartbeat, I/O, network, CPU/heap sampling or background maintenance. `processed()`/per-file/parser/link/evidence/IDB loops add no new instrumentation. Coarse pass/phase/invalidation boundaries sample already maintained numeric counters; detailed owner/overlap profiling stays opt-in and separate.

## Retention and interpretation

One fixed 1,024-cell Float64 store (8,192 backing bytes), eight Uint32 totals, fixed tokens/scalars and static dictionaries own the new state. The backing size is not its complete retained-memory cost; container/dictionary/clock overhead must be measured. The hard additional-state target is 32KiB.

- 25 hourly slots retain the previous full24 hours plus the current partial hour. Slots rotate only on real coarse activity. Explicit copy projects the relevant window without mutating it; long idle jumps visit at most25 slots.
- Lifetime totals, first-observed startup milestones, two active pass rows,16 recent completed rows and a separate last-global-pass explanation survive local churn. Old detail rotates; lifetime totals do not. Two active-detail slots are a real cap: overflow increments omissions and makes outcome coverage explicitly capacity-limited.
- Start counts belong to the start hour. Outcomes and whole-interval counter observations belong entirely to completion hour. No work is prorated across hours. Passes and lanes may overlap: their counter deltas and elapsed times are **not exclusive work or CPU** and must not be summed as such.
- A visit/check is not a unique note. Unknown/reset/absent counters become null, not zero. Saturation at2^32-1 sets an explicit flag; it never wraps. These summaries do not measure physical storage bytes, CPU, energy, exclusive waits or paint.
- Monotonic session-relative milliseconds establish order. Detected clock rollback clamps ordering; long observed gaps are recorded without claiming suspend or continuous execution. Zero observations in an hour do not prove continuous idle or zero CPU.
- The new compact object is at most8KiB; the complete copied report remains at most32KiB. At capture, oldest recent detail is omitted first, then phase aggregate detail, then oldest displayed hour rows if necessary. Explicit omission counters preserve interpretation. Core totals, startup and last-global explanation remain. Recorder state is not truncated by copying.

## Shared field dictionary

Both exports receive the same owned `indexingActivity` object and shared projection. Eight fixed weak admission slots admit only the eight latest deeply frozen captures constructed by this module, without strongly retaining those report objects. Both synchronous export paths use the same fresh capture. Older captures become unavailable; this is a copy-boundary safety check, not persistent authority. Unknown objects, getters, proxies and `toJSON` cannot become a diagnostic input. JSON roundtrips do not preserve that internal brand. No persisted trust format is introduced.

`columns` supplies fixed public dictionaries and column order for numeric rows. Categories are fixed ordinal values, not vault IDs. Every row below resets with the plugin lifetime; no user-supplied keys are retained.

The legacy detailed `on-demand-center-patched` marker occurs inside a per-file patch loop and is deliberately excluded from default capture. Its default milestone remains null. Requested-scope publication supplies the coarse semantic-readiness boundary instead.

| Field | Owner, unit and aggregation | Limits/privacy/interpretation |
| --- | --- | --- |
| `schemaVersion`, `captureVersion` | Recorder/projection public integer versions | Unknown external objects/versions are unavailable. |
| `status`, `ageMs`, `windowStartMs` | Recorder lifecycle and injected monotonic clock, milliseconds | Session-relative; no wall clock or persistent session/vault ID. |
| `clock`, `clockRegressions`, `longObservationGaps` | Recorder coarse-boundary clock observations | Gaps are not proof of sleep, CPU or continuous coverage. |
| `saturated`, `outcomeCoverage` | Fixed recorder capacity/counter guards | Capacity-limited outcomes are incomplete observations, not successful zero work. |
| `totals` | Starts and complete/incomplete/cancelled/failed/superseded outcomes; coarse cause and unrecognized-category counts | Fixed counters; starts include work whose detail could not fit; omitted outcomes are disclosed. |
| `causes`, `pendingCause` | Fixed reason histogram plus first/coalesced cause mask since pass admission | Triggering observations, not a proven root cause. Unknown values increment a finite unknown category. |
| `milestones` | First actually observed known startup boundary, milliseconds after construction | Remains after readiness; absent milestones are null. No synthetic time-to-idle. |
| `phases` | Source/hydration lanes: current phase/open elapsed, transition counts, closed elapsed sums/maxima | Existing finite phase vocabulary; close on actual pass termination; elapsed includes awaits and lanes overlap. |
| `hours` | Hour index; local/global/unknown starts, completed/cancelled/incomplete-or-failed observations; source check/read/parse and build/save interval deltas | Fixed25 rows; completion-time deltas are nonexclusive. No inferred per-hour CPU. |
| `recent`, `active`, `lastGlobal` | Kind/scope/start/elapsed/outcome/first cause/selection reason/coalesced mask; nine source and five session-work interval deltas; flags |16/2/1 bounded rows. Last global is independent of local churn. Active rows have no fabricated outcome. |
| Source work columns | Acquisition's existing `checked`, `reusedBodies`, `legacyBodies`, `vaultReads`, `parses`, `repaired`, `resolutionRefreshes`, `pendingMetadata`, `failures` | Counter deltas across pass intervals; no identity sets or parallel per-file counters. |
| Session work columns | StartupDiagnostics' existing source inventory/full build/node catalog starts and activated complete/checkpoint saves | Saves count activation, not an attempted write. Lifetime owners remain authoritative. |
| `settings` | Public static build identity; actual session indexing mode, actual URL strategy, live pacing mode | Pending preferences remain separate from actual strategy; no runtime bundle hash or private label. Missing facts are null. |
| `current` | Already retained pending/source/hydration/semantic/build-blocked, persistence and scheduler scalar counts, plus current existing work counters | Read only on explicit capture through passive owners. Unsupported facts remain null; ready does not mean no background work. |
| `omitted` | Rotated/capacity/report-recent/report-phase/report-hour/expired-hour counts | Copy omissions and retained-state expiry are distinct; copying never erases history. |
| `work`, `duration`, `hoursBasis`, `columns` | Fixed public interpretation strings and dictionaries | No arbitrary labels, coercions, schema keys or private values. |

## Validation gates

Accelerated24/48-hour tests cover retention, rollover, idle gaps, overlap, cancellation, privacy, saturation, disposal and event storms. They do not establish24 hours of real-device use. A bounded multi-hour native soak, separate diagnostic overhead measurements and actual copy/report interactions are required before recommending the diagnostic component for shipping. Folder-wave resource gains cannot pay for diagnostic overhead. See the PR validation report for measured results and pending platform checks.
