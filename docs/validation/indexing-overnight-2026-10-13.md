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
| C independent preview | Validated; committing/pushing next | Controlled 200ms hold: saved preview 235-285ms to 1.0-4.5ms, matching final digests, zero reads/parses | Full verify 495 browser tests, focused 53, native and foreground pass; warm native Eager 460.5 to 43.9ms / On-demand 492.2 to 52.1ms; older-head Eager adds one validation read/parse; [report](indexing-independent-preview-2026-10-14.md) |

C validation complete; older-head acquisition tradeoff is explicit in its report. Next implementation: B2 ownership and bounded adjacency deltas. B2 source audit found that old displayed relation targets can refer
to working pages. This prevents treating evidence-pointer inequality as proof that neighbor maps
are private. A safe implementation needs explicit adjacency ownership, preservation of retained
parent maps and Map ordering, bounded replay, cooperative over-limit preparation and display copies
whose targets do not expose mutable working adjacency. This is not yet implemented or accepted;
keep B2 deferred until ownership is explicit.

Measurements distinguish actual removed work from inclusive duration. B1's sub-millisecond native
baseline does not support an elapsed-speedup claim. Full M retained-heap/heartbeat/native scale
acceptance and physical iOS/Android/macOS remain pending. The existing synthetic 20,000-note fixture
is preserved; small-vault functional probes remain preferred. Each native driver is serialized and
owns independent cleanup. Completed source/artifacts/tests stay frozen before the next checkpoint.
