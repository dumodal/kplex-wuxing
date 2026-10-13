# Sequential indexing checkpoints, 2026-10-13 overnight

The maintainer authorized continuing unsupervised for approximately seven hours from
**2026-10-13 20:51 UTC**, with a commit after each independently validated checkpoint. Working
deadline: **2026-10-14 03:51 UTC**. Scope is the measured packages in PR #153; no automatic
structural refactor, cache redesign, release, merge, PR-ready status or push authorization.

| Checkpoint | State / commit | Measured result | Validation |
| --- | --- | --- | --- |
| E1 semantic no-op | Previously committed `1411e4b` | Removes unnecessary adjacency/evidence copies on hot no-ops | [First report](indexing-noop-performance-2026-10-13.md) |
| A hydration guards | Committed `a162044` | 4,096-record / 256-field fixture: median 17,230 to 4,893 signatures; observed 533.9 to 241.5 ms | Full verify, native hydration/cancellation and foreground; [report](indexing-hydration-guards-2026-10-13.md) |
| B1 URL facet sharing | Validated; committing now | 4,096 aliases/tags/style tags copied to zero each; adjacency unchanged | Full verify + native/foreground pass; native alias copies 512 to zero; [report](indexing-url-facets-2026-10-13.md) |

Current next scope: B2 adjacency. Source audit found that old displayed relation targets can refer
to working pages. This prevents treating evidence-pointer inequality as proof that neighbor maps
are private. A safe implementation needs explicit adjacency ownership, preservation of retained
parent maps and Map ordering, bounded replay, cooperative over-limit preparation and display copies
whose targets do not expose mutable working adjacency. This is not yet implemented or accepted. B3 compiler membership is independent; measure it next while keeping B2 deferred until ownership is explicit.

Measurements distinguish actual removed work from inclusive duration. B1's sub-millisecond native
baseline does not support an elapsed-speedup claim. Full M retained-heap/heartbeat/native scale
acceptance and physical iOS/Android/macOS remain pending. The existing synthetic 20,000-note fixture
is preserved; small-vault functional probes remain preferred. Each native driver is serialized and
owns independent cleanup. Completed source/artifacts/tests stay frozen before the next checkpoint.
