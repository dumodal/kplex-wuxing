# Native URL retained heap and display-flush attribution

Measurement follow-up to [the20,088-owner comparison](indexing-native-url-scale-2026-10-14.md),
committed/pushed as `92a70fa`. That comparison found about40% lower elapsed median but higher
candidate heartbeat maxima. This checkpoint changes test tooling only; production source and
the accepted E3 artifacts remain unchanged. It does not grant unconditional performance acceptance.

## Method

The same actual authorized vault, physical fixture, complete current URL facts and installed
A `a162044`/E3 `0ad463c` builds are compared. Each isolated GraphIndex gets a new disposable URL
cache namespace with no ordinary snapshot, parsed-body cache, neutral heads or dependency inventory.
Primary work must be quiet; actual foreground, focus, native throttling, physical/event fences,
production6/24 pacing and five-second publication remain required. No actual vault cache/file is
purged. Graph/evidence/seed identities must match the preceding measurement exactly.

The shared `largeUrlReplayScenario` is now import-safe and accepts optional test-owned lifecycle
hooks and a single unwrapped replay. Its normal direct CLI still runs the original counted and
timing-only lifetimes. Diagnostics time the actual synchronous `flushUrlPublication`, recording
pending path/owner counts and coarse `publishUrlSearch`, `patchSearchIndex` and `emitPresentation`
durations. Wrappers preserve receiver/results, support re-entry and restore exact methods. Eight
largest heartbeat intervals are retained. Inclusive durations may contain GC and must not be
summed as exclusive CPU.

Retained mode forces renderer collection outside the replay API, using the native debugger's
`HeapProfiler.collectGarbage` and `Runtime.getHeapUsage`: empty prepared index/cache, live validated
graph, then destroyed/purged index. The live-minus-empty JS difference includes actual URL graph,
compact owner facts and derived structures. It is an isolated renderer-JS measurement, not an
allocation count, whole-plugin footprint, native process peak or physical-device result. Process
memory observations are current KB, not peak. Disposal also releases fixture bookkeeping, so its
heap difference need not be zero.

The fixture's cleanup closure deliberately retains its closed-index array until released. The
outer diagnostic drops that test root after the fixture returns, yields/collects, then verifies
WeakRefs for the index, cache, working/published page/evidence containers, origin adjacency,
alias-owner/facet maps and candidate published-target map. This establishes collection of the
tracked isolated roots, not every possible long-session/plugin-reload leak.

Unforced mode omits pre-replay collection and reports no retained delta. Its live/disposal
collections happen after the API interval, preserving their separation from pause observation.
Neither diagnostic mode replaces the earlier low-instrumentation elapsed comparison.

Chromium tracing uses an explicit8MB record-until-full buffer. Delivery retains at most8,192
complete GC intervals and own timing markers; arguments, unrelated events, full traces and heap
snapshots are never saved. Actual user marks calibrate trace timestamps to the renderer clock;
drift must remain below5ms. Exact renderer PID/thread matching excludes other renderers/workers.
Trace loss/overflow or missing actual forced-GC calibration fails the run. GC scopes can overlap
or nest; analysis uses interval unions for overlap and does not sum nested durations.

These APIs are defined by [Electron's debugger](https://www.electronjs.org/docs/latest/api/debugger),
[Chromium's protocol](https://github.com/ChromeDevTools/devtools-protocol) and
[Electron process-memory documentation](https://www.electronjs.org/docs/latest/api/process#processgetprocessmemoryinfo).
Every CDP response/trace completion has a20-second diagnostic cap; tracing/debugger/listeners/marks
are independently retired. Controller/production watchdogs are unchanged.

## Retained comparison

The matched source-frozen series uses chronological pairs C1/B2, C2/B3, C3/replacement-B.
One initial baseline loaded before the last probe-only edits; its successful result is retained
as preliminary and excluded rather than mixed with the final source identity.

| Pair | Baseline retained bytes | Candidate retained bytes | Baseline maximum flush (ms) | Candidate maximum flush (ms) |
| --- | ---: | ---: | ---: | ---: |
| 1 | 35,699,868 | 40,163,264 | 30.6 | 45.7 |
| 2 | 35,722,380 | 40,201,916 | 30.7 | 47.1 |
| 3 | 34,645,852 | 40,289,380 | 26.7 | 51.6 |
| Median | 35,699,868 | 40,201,916 | 30.6 | 47.1 |

The candidate retains4,502,048 additional bytes at the median, about12.6% of the measured isolated
URL index. This is a measured space tradeoff, not a memory win. All nine tracked baseline roots
and ten candidate roots collect after disposal. Candidate heartbeat maxima are54.3/47.6/57.0ms
versus38.3/44.2/32.1ms for the matched baselines. Collection/tracing changes allocation conditions;
these gaps do not retroactively explain every unrecorded pause in the earlier comparison.

Coarse attribution identifies general search-index work as a material part of flushes: one45.7ms
candidate flush spends32.2ms in `patchSearchIndex`, versus1.3ms in `publishUrlSearch` and less than
timer resolution in `emitPresentation`. This is a synchronous-region observation, not exclusive CPU.
The separate unforced matched series confirms a publication concern:

| Pair | Baseline max flush (ms) | Candidate max flush (ms) | Baseline max heartbeat (ms) | Candidate max heartbeat (ms) |
| --- | ---: | ---: | ---: | ---: |
| 1 | 32.8 | 44.5 | 33.4 | 55.0 |
| 2 | 32.3 | 64.4 | 43.8 | 78.3 |
| 3 | 31.7 | 48.6 | 43.3 | 55.4 |
| Median | 32.3 | 48.6 | 43.3 | 55.4 |

The candidate's worst gap in each unforced run overlaps42.6/64.4/48.6ms of synchronous flush
work, with only2.624/2.261/2.690ms of GC union overlap inside those same gaps. General
`patchSearchIndex` consumes30.1/41.5/32.6ms in each run's largest flush. GC also matters elsewhere:
baseline pair3's worst43.3ms gap overlaps42.18ms of GC and no flush. The
[matched interval analysis](indexing-native-url-memory-2026-10-14/matched-analysis.json) preserves
all eight largest gaps, union overlaps, largest-flush region timings and clock drift. GC and
flush overlap must not be added; these observations attribute substantial work in these runs,
not the exact cause of earlier unrecorded94ms pauses.

## Calibration failures and exclusions

- Initial Node/browser epoch alignment assumed an offset below one second and failed. Actual native
  observations show about a one-second difference; a measured offset is required, not an assumed
  shared epoch. The subsequent Node GC observer exposed a supported entry type but did not observe
  the actual browser collection, so its calibration failed before replay and cleaned up.
- Native Chromium calibration captured complete `V8.GCCompactor` intervals and both own markers
  without trace loss. That supported transport replaces the unavailable Node observer; no failed
  Node observation is relabelled a pass.
- The preliminary Chromium candidate passes semantic/unload checks, with39,534,192 retained bytes
  and48.7ms maximum flush overlapping48.9ms maximum heartbeat. It precedes coarse attribution and
  remains separate from the matched final data.
- Closing every Plex view can leave a quiet on-demand primary at “Preparing local graph”. Native
  diagnostics confirmed zero scheduler work and completed URL restoration. Preparation opens the
  normal test view only after URL closure, then retains the original strict quiet-primary check
  before isolated replay. No source readiness or authority is fabricated.

## Follow-up decision and limits

The candidate's lower elapsed time comes with larger synchronous display batches and higher retained
memory in this fixture. A narrow next candidate is to avoid general search work for URLs already
covered by the just-published URL catalog. Both effective search merges already discard those
duplicate general entries before using the URL catalog. Its caller/retirement/fallback inventory,
public search equality, work-count gate and exact native comparison must precede acceptance.
This proposal is not implemented by this checkpoint. Scheduler/display thresholds, source
authority, graph meaning, cache formats and C14/C15 ownership are unchanged.

All twelve final diagnostic replays match the preceding exact graph/evidence, physical and
seed digests with zero body reads/parses. All tracked roots collect, and native staging/render,
configuration guards and per-series workspace/window restoration pass. The original direct
CLI's two independent lifetimes also pass canonical targets, retained early display Maps/aliases,
zero-I/O and exact final digests after the shared-fixture reuse changes.

The raw directory retains successes, preliminary/excluded cases, calibration failures, stage
guards, interval analysis and source/artifact ledger. Final physical fixture/configuration/
workspace/window audit and Node syntax/JSON/local-link/whitespace checks pass. No new full-suite
execution is claimed for test-only changes; the unchanged runtime reuses E3's exact accepted
build. Full startup, actual paint, macOS, physical Android/iOS and long-session memory remain
separate. No additional manual Windows check is requested.

## Reproduction

Use Node22.22.2 and the three explicit authorized large-vault variables, fresh report directories,
the verified fixture/cache preparation and exact artifact staging described in
[the previous scale report](indexing-native-url-scale-2026-10-14.md).

```sh
node --check scripts/testing/obsidian/largeUrlReplay.mjs
node --check scripts/testing/obsidian/largeUrlMemory.mjs
node scripts/testing/obsidian/largeUrlMemory.mjs
git diff --check
```

`KPLEX_URL_MEMORY_MODE=retained` is the default; select `unforced` for no pre-replay collection.
For A, set `KPLEX_PROBE_BASELINE_REF=a162044` and its exact `KPLEX_PROBE_ARTIFACT_DIR`; unset
both for the candidate. Reuse only matching prior full receipts for all three artifacts, then
rerun strict staging/render and independent configuration guards. Keep one foreground window
lifetime through each series and restore the saved native workspace/window afterward.
