# URL patch facet-copy checkpoint (PR #153 B1)

## Scope and baseline

The maintainer authorized unsupervised sequential checkpoints with a commit after each validated
checkpoint. Package A is committed as `a162044`; this B1 increment starts from that clean commit on
`2026-10-13-indexing-performance`. It changes only URL-owner clone facets in GraphBuilder. Ordinary
Markdown staging and all neighbor-map copying retain their existing behavior. No settings, cache
schema, dependency, scheduler, watchdog, UI or paused architectural extraction changes are included.

URL patches replace aliases/tags/style-tag arrays in `applyPreparedSourcePatch`; aggregate URL label
publication also assigns a new array or reuses an existing immutable facet array. No writer on this
lane pushes/splices/sorts retained GraphPage arrays. Their eager clone was consequently disposable
allocation. The URL-only stage now borrows those arrays while copying adjacency as before. Explicit
ordinary stages retain array copies; the option is not enabled for Markdown/structural patches.

## Work-count evidence

`node scripts/testing/url-facet-work.mjs --baseline-ref=a162044` and the default candidate driver
compile actual committed/checkout production methods with the same fixture. One reference append
is measured against independently sized target aliases/tags/style-tag facets. Setup and the ordered
semantic/facet oracle are outside the test-only owner probe. A fixed fake clock permits counts only.

| Entries in each retained facet | Baseline copies: aliases / tags / style tags | Candidate | Neighbor entries, both |
| ---: | ---: | ---: | ---: |
| 256 | 256 / 256 / 256 | 0 / 0 / 0 | 3 |
| 512 | 512 / 512 / 512 | 0 / 0 / 0 | 3 |
| 1,024 | 1,024 / 1,024 / 1,024 | 0 / 0 / 0 | 3 |
| 2,048 | 2,048 / 2,048 / 2,048 | 0 / 0 / 0 | 3 |
| 4,096 | 4,096 / 4,096 / 4,096 | 0 / 0 / 0 | 3 |

Both variants clone two pages, use zero body reads/parses and preserve original arrays and the new
relationship. Nonempty tags/style tags are deliberate legal negative controls, not a claim that
ordinary URL nodes naturally have thousands of such tags. Increasing distinct aliases during owner
ingestion can still involve other aggregate/compiler copying; this result attributes only page cloning.
The existing shared-target adjacency count (8,394,750 entries at 4,096 owners) is unchanged by B1.

The probe wraps only this GraphBuilder's `createPatchState` and actual `cloneOnRead` callback.
Selected input iterators count entries only while cloning and are restored before preparation
continues. No global Map/JSON/array operation is changed, and no vault content is logged.

## Native method comparison

`node scripts/testing/obsidian/urlFacets.mjs` uses shared bounded test transport and an isolated
actual native GraphIndex. It owns one 512-label Markdown note and a separate disposable cache
namespace, with real Vault, MetadataCache and parser/compiler. The current parser merges this
note's repeated target into one URL record with optional aliases: the actual graph has three pages
and two declarations. No count of 512 distinct evidence declarations is claimed.

Baseline installed main.js is the previously verified A artifact
`bc8293b5732420c424a83839eda2892764ca20e95667919a2cbde7e769fe92b6`. The driver explicitly attributes
committed source `a162044`, even though checkout source is already B1. Three repeated warm URL-owner
replacements count **512 retained alias entries** each, **zero display entries/flushes** and **zero
body reads/parses**. Inclusive observations **0.6 / 0.4 / 0.3 ms** have no demonstrated meaningful
latency benefit at this size; instrumentation and browser clock resolution are material. Count
reduction is the acceptance claim. The candidate counts **zero retained alias entries** in all
three trials, with zero display entries/flushes and zero body reads/parses. Its inclusive observations
are **0.4 / 0.4 / 0.3 ms**. Both runs retain foreground visibility/focus and ordinary throttling,
and have the same ordered graph/evidence digest:
`6443de5b18afd10a858774771685957426b98840fdf0497a59034492d77d6188`.

Owner-scoped alias iterators forward original values/order; instance flush wrappers separate display
materialization. Receiver/results are preserved. Setup, parsing and the complete ordered graph/evidence
digest (including same-sequence IDs) are outside timed regions. Foreground/visibility/ordinary
throttling are sampled before/after; cleanup deletes the owned note/cache/controller and restores
window geometry. Settings and community-plugin bytes must remain equal. Transport has a 180-second
experiment cap, 15-second CLI cap and independent cleanup; no production timeout is changed.

## Validation

`node --test --test-concurrency=1 tests/url-evidence-publication.test.mjs tests/url-alias-publication.test.mjs`
passed **24 tests**. Six new cases prove ordinary-vs-URL array identity, replace-only isolation,
five-size clone work, retained displayed alias/adjacency values and owner removal. Existing tests
retain the independent alias oracle, ordered evidence IDs/multiplicity/directions, shared origins,
mid-preparation flushes, over-1,024 deltas and unload fencing. The file remains in normal `npm test`.

Full `verify:obsidian` completed on Node **22.22.2**, including architecture/core checks,
Obsidian lint, all normal/source tests, **464 real-browser source tests** and the production build.
The native candidate comparison and foreground interaction driver passed against the exact staged
build. Owned notes/cache/controller were removed and configuration bytes restored/unchanged.
Raw receipts are in [the checkpoint directory](indexing-url-facets-2026-10-13/).

Candidate main.js SHA-256:
`9a4be62d20b17251c837ec7f82759fe28e1a78d15adcce09d264a017ef1be5b5`.
Source hashes are retained in the native receipt; staging verified all three artifacts match.
No new scale-duration/heap/heartbeat acceptance is claimed. No additional manual Windows test is
requested for this array-borrowing change; physical-device memory/touch and another desktop OS
remain outside available evidence. The highest-probability regression is mutation of a retained
facet; focused tests and actual native replacements cover the current replace-only writers.
