# Sequential indexing checkpoints, 2026-10-13 overnight

The maintainer authorized continuing unsupervised for approximately seven hours from
**2026-10-13 20:51 UTC**, with a commit after each independently validated checkpoint. The Windows update interrupted work after B1. On 2026-10-14 the maintainer renewed work
**without a hard deadline** and authorized **push after each checkpoint commit**. Scope is the measured packages in PR #153; no automatic
structural refactor, cache redesign, release, merge, PR-ready status authorization. Push is now authorized for the working branch.

| Checkpoint | State / commit | Measured result | Validation |
| --- | --- | --- | --- |
| E1 semantic no-op | Previously committed `1411e4b` | Removes unnecessary adjacency/evidence copies on hot no-ops | [First report](indexing-noop-performance-2026-10-13.md) |
| A hydration guards | Committed `a162044`; pushed | 4,096-record / 256-field fixture: median 17,230 to 4,893 signatures; observed 533.9 to 241.5 ms | Full verify, native hydration/cancellation and foreground; [report](indexing-hydration-guards-2026-10-13.md) |
| B1 URL facet sharing | Committed `186406e`; pushed | 4,096 aliases/tags/style tags copied to zero each; adjacency unchanged | Full verify + native/foreground pass; native alias copies 512 to zero; [report](indexing-url-facets-2026-10-13.md) |
| B3 compiler membership | Committed `34cbbbc`; pushed | 4,096 owners: includes visits 8,390,655 to zero; membership seeds 8,394,751 to two | Focused 42 pass; full verify/native/foreground pass; native engine median 255.8 to 36.1 ms, repeated-label control 24.3 to 24.9 ms; [report](indexing-url-alias-membership-2026-10-14.md) |
| C independent preview | Committed `4b42edb`; pushed | Controlled 200ms hold: saved preview 235-285ms to 1.0-4.5ms, matching final digests, zero reads/parses | Full verify 495 browser tests, focused 53, native and foreground pass; warm native Eager 460.5 to 43.9ms / On-demand 492.2 to 52.1ms; older-head Eager adds one validation read/parse; [report](indexing-independent-preview-2026-10-14.md) |
| B2 private URL adjacency | Committed `c507ba1`; pushed | 4,096 owners: working neighbor copies8,394,750 to0;12,285 replay keys, largest2; display71,744 unchanged | Full verify495 browser cases, focused45, native/foreground pass; native selected copies131,327 to0; observed medians537.4 to256.7ms with overlapping trial ranges; [report](indexing-url-adjacency-2026-10-14.md) |
| M-D URL write profile | Committed `708ce32`; pushed | 512 singleton transactions; cache-only six-row batches86, median32.2ms vs61.1ms concurrent singletons | Exact native roundtrip512, bodyreads/parses0, scoped idle758.1ms and tx164.3ms overlap; [report](indexing-url-cache-write-baseline-2026-10-14.md) |
| M-E2 ordinary evidence | Committed `c9703bf`; pushed | 64tiny edits /4,097originals copy32,776 bucket entries; growing4,096owners copy1,046,528evidence entries plus8,386,560ordinary neighbor entries | Actual patch/resolver,15 cells, inactive target metadata, reads/parses0; [gate](indexing-evidence-maintenance-baseline-2026-10-14.md) |
| E2 bounded ordinary evidence | Committed `8c4f899`; pushed | 64role edits /4,097originals copy32,776 to8; native8forced compactions44,432 to16 | Full495 browser cases,11focused,15exactdigests,3alternatingnativepairs,6foreground cases; individual patch median7.75 to5.10ms, noisy group totals show no overall latency win; [report](indexing-sparse-evidence-2026-10-14.md) |
| M-E3 dense pair appends | Committed `7d49b4a`; pushed | 4,096same-pair originals copy8,386,560prior entries; same4,096distributed originals copy0 | Actual compiler/evidence,10cells, exactlineorder/multiplicity/IDs; fixedclock noelapsedclaim; [gate](indexing-evidence-append-baseline-2026-10-14.md) |
| E3 private compiler appends | Validated; this checkpoint commit | Dense4,096prefixcopies8,386,560to0; native16,384values134,225,920to0 | Full495browser,15focused/86affected,10exactdigests,3alternatingnativepairs:median1085.7to759.7ms (~30% fixture gain);6foreground; [report](indexing-private-compiler-append-2026-10-14.md) |

B2 is committed and pushed. Independent adjacency privacy, stable published-only targets, bounded
replay and immutable fallback/compaction preserve retained Map and canonical target contracts.
Current displayed graphs retain one neighbor map per path rather than chains of prior target
copies. This structural bound is not a retained-heap measurement; target/storage metadata adds
objects. No source authority, scheduler, schema or public semantic owner changed. D batching potential is measured at708ce32; stored-write fencing remains a separate candidate. E2 follows its ordinary-work gate.

Measurements distinguish actual removed work from inclusive duration. B1's sub-millisecond native
baseline does not support an elapsed-speedup claim. Full M retained-heap/heartbeat/native scale
acceptance and physical iOS/Android/macOS remain pending. The existing synthetic 20,000-note fixture
is preserved; small-vault functional probes remain preferred. Each native driver is serialized and
owns independent cleanup. Completed source/artifacts/tests stay frozen before the next checkpoint.
