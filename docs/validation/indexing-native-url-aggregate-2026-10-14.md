# Aggregate native warm URL comparison after B4 and B5

This measurement-only checkpoint compares earlier A `a162044` directly with pushed B5 `cacefe5`.
Production source, dependencies, settings/schema and accepted candidate artifacts remain unchanged.
The earlier [scale](indexing-native-url-scale-2026-10-14.md) and
[heap/flush](indexing-native-url-memory-2026-10-14.md) gates found faster warm reconstruction with
larger live heap and longer pauses. Subsequent
[search-publication](indexing-url-search-publication-2026-10-14.md) and
[native-backing](indexing-url-adjacency-storage-2026-10-14.md) checkpoints remove independently
measured costs. This gate measures the remaining aggregate tradeoff rather than adding their
inclusive timings or assuming the earlier overhead is gone.

## Fixed corpus and cache conditions

The authorized large vault contains20,088Markdown notes,20,107files and15folders including root.
The existing20,000-note `Indexing-performance-153` corpus is preserved. Each isolated installed
index receives the same current actual URL-cache facts through bounded transactions outside API
timing. Source files/metadata are real; no fake empty-owner rows or whole-vault reset is used.

| Private index input | Condition |
| --- | --- |
| URL owner rows | 20,088current real rows, identical seed digest per lifetime |
| Graph snapshot | Absent |
| Body cache | Absent |
| Neutral source heads | Absent |
| Dependency inventory | Absent |
| Host file identity/metadata | Actual unchanged vault; physical checks outside timing and source fences retained |
| Primary plugin | Exact accepted build staged, visible and settled before each isolated trial |

This measures warm URL reconstruction plus current-owner closure. It does not measure full plugin
startup, a full application restart, ordinary full-graph hydration, total source authority, actual
paint, process peak or physical mobile. Global On-demand source authority remains intentionally
uncertified outside requested scopes. Cache seeding, fixture generation, semantic digests and staging stay outside
the recorded API interval; source-policy and90-second production inactivity fences are unchanged.

## Prespecified matched conditions

All native drivers run serially in an actual foreground window with production background
throttling. Settings/enabled bytes and workspace/window state restore in `finally`. Exact artifact
staging reuses prior full verification only by all three hashes, then reruns native render and
configuration guards. Even-numbered pairs reverse baseline/candidate order.

- Five retained pairs use the unchanged native CDP/GC driver, collecting outside the replay API.
- Three unforced pairs omit pre-replay collection and retain bounded complete GC/flush intervals.
- Three original two-lifetime CLI pairs keep counted work separate from the unwrapped elapsed
  lifetime. Only the second lifetime contributes low-instrumentation elapsed comparisons.

All28lifetimes and22stages are planned before results. No sample is discarded because of an
unfavorable metric. Graph/evidence and source digests, zero body work, retained-map equivalence,
root collection, native focus and independent cleanup remain strict gates. GC scopes/flushes may
overlap; interval unions are not exclusive CPU or additive time budgets.

## Retained graph heap

All five retained pairs pass. Collected live-minus-empty renderer JS bytes for the isolated graph:

| Pair | A bytes | B5 bytes |
| --- | ---: | ---: |
| 1 | 34,224,756 | 36,839,972 |
| 2 | 34,232,504 | 36,853,296 |
| 3 | 32,814,880 | 36,788,256 |
| 4 | 34,200,172 | 37,152,064 |
| 5 | 34,031,372 | 36,977,628 |

Group medians34,200,172→36,853,296bytes:2,653,124additional bytes, approximately7.8% of this isolated
slice. All five paired differences are positive (approximately2.62–3.97MB), and ranges do not
overlap. The third lower A observation remains included. B4/B5 independently reduce their preceding
versions' memory, but the accumulated implementation still has a retained-heap premium over A.
Do not infer the aggregate by adding or subtracting unmatched previous-report medians.

Current source retains bounded private-container metadata and one stable published target per path;
these are source-confirmed representation differences. No heap snapshot was taken, so the complete
premium is not attributed to one pool. Collection of owned roots checks teardown, not long-session
or mobile peak memory. This retained increase remains an explicit PR153 tradeoff; unconditional
aggregate performance acceptance requires the maintainer's decision after the complete results.

## Unforced native pauses

All three unforced pairs pass. Per-run largest observed intervals, in milliseconds:

| Pair | A flush | B5 flush | A heartbeat gap | B5 heartbeat gap |
| --- | ---: | ---: | ---: | ---: |
| 1 | 34.5 | 35.3 | 53.5 | 42.8 |
| 2 | 29.2 | 31.6 | 49.5 | 34.1 |
| 3 | 32.2 | 36.7 | 47.6 | 49.0 |

Largest-flush medians32.2→35.3ms, approximately3.1ms longer for B5. Its largest flushes cover
6,481/6,467/7,327paths versus A6,071/5,111/5,405under unchanged five-second cadence. These are
actual naturally accumulated batches, not fixed-work per-flush comparisons. Current synchronous
flush cost remains a tradeoff rather than an unconditional responsiveness improvement.

Largest heartbeat-gap medians49.5→42.8ms improve, but pair3is worse and ranges overlap. A's three
worst gaps overlap50.687/42.151/45.045ms of observed GC and no flush. B5's first worst gap overlaps
35.3ms flush with0GC; the second overlaps25.4ms flush with0GC; the third overlaps46.632ms GC and no
flush. GC can still dominate a current interval. Do not add nested/overlapping GC scopes or equate
heartbeat callbacks with actual paint or interaction percentiles.

All16retained/unforced replays preserve exact source and graph/evidence digests with zero body
reads/parses. All tracked roots collect:9for A and10for B5, which includes its new published-target
pool. Driver/scenario/definition hashes and complete bounded trace intervals are checked against
the unchanged current driver. Teardown collection is not long-session or peak-memory acceptance.

## Low-instrumentation replay

All three original two-lifetime pairs pass. Their second, unwrapped lifetimes alone supply elapsed
API duration in milliseconds:

| Pair | A | B5 |
| --- | ---: | ---: |
| 1 | 25,895.8 | 15,438.1 |
| 2 | 26,791.2 | 13,807.2 |
| 3 | 25,575.6 | 11,305.7 |

Medians25,895.8→13,807.2ms:approximately46.7% shorter warm URL reconstruction/owner closure in this
controlled fixture. Ranges25,575.6–26,791.2versus11,305.7–15,438.1ms do not overlap. Candidate times
still vary substantially; three runs do not establish a universal percentage or full-startup gain.
Do not attribute the difference from earlier candidate reports solely to B4/B5 across unmatched runs.

Every separate counted lifetime visits31,996,000selected-origin working entries for A and0for B5.
Counted display visits are A33,436/33,372/35,243versus B518,479/18,638/13,567. Those display counts
depend on natural elapsed five-second flush cadence and instrumentation; they are not a fixed-work
algorithmic reduction. Original early displayed-map/alias retention and canonical-target checks
also pass. All12lifetimes preserve the same16,069-page/16,127-declaration graph,8,000origin degree,
physical/source/evidence digests and zero timed body reads/parses.

## Outcome and acceptance limits

The current implementation substantially reduces measured warm reconstruction time and removes the
quadratic selected-origin working-copy term. It retains approximately2.65MBmore isolated live heap
than A and has approximately3.1mslonger median largest unforced display flush. Median worst observed
heartbeat improves, with mixed pair signs and continuing GC-driven gaps. These remain explicit
tradeoffs; PR153's unconditional performance acceptance awaits the maintainer's decision. Neither
the earlier memory premium nor all synchronous pauses are claimed eliminated.

All28native lifetimes and22exact-artifact stages pass; all16heap-diagnostic root sets collect.
Independent driver/function/definition and source identities are verified, with no excluded sample.
Per-series configuration/window/workspace cleanup and final audit pass: complete20kfixture bytes,
all20,107files, both installed B5 builds, original settings/enabled bytes and native throttling,
no owned controller or attached debugger. Source files match accepted B5 exactly. Final main
`0e0d599107d4efbd565a215f8544716831fd044a830317d362ac3f14a67dc9f4`;0.1.3manifest/styles unchanged.

The [raw directory](indexing-native-url-aggregate-2026-10-14/) retains all successful diagnostic and
replay lifetimes, native stages/configuration guards, exact interval/sample analysis, source/artifact
ledger, per-series guards and final physical/native audit. Node syntax, JSON, local links and
whitespace checks pass. No additional manual Windows check is requested for available automated
assertions. Before release, macOS/physical-mobile and whole-startup/process-peak/long-session limits
remain separate; Windows timer and GC observations do not establish physical touch or actual paint.

The unchanged candidate reuses the exact accepted
[B5 full/native/foreground verification](indexing-url-adjacency-storage-2026-10-14.md). No additional
full-suite execution is claimed for measurement-only work. C14 remains accepted; C15-C26 remain
paused. D's small cache-only batching result remains explicitly deferred under PR153's measurement
exit rule; this gate introduces no writer queue or source-authority shortcut.

## Reproduction

Use Node22.22.2, the three explicit authorized large-vault variables, verified exact A/B5 artifacts,
fresh per-condition report directories and the preserved corpus/current URL-row input.

```sh
node scripts/testing/obsidian/largeUrlMemory.mjs
node scripts/testing/obsidian/largeUrlReplay.mjs
git diff --check
```

Set `KPLEX_URL_MEMORY_MODE=retained` or `unforced` for the corresponding diagnostic series. For A,
set `KPLEX_PROBE_BASELINE_REF=a162044` and its exact `KPLEX_PROBE_ARTIFACT_DIR`; unset both for B5.
Keep the original direct CLI's two lifetimes and do not blend counted/forced-GC elapsed results
with its unwrapped timing. Available Windows assertions remain automated; macOS, physical mobile,
process peak, long sessions and release/merge decisions remain separate.
