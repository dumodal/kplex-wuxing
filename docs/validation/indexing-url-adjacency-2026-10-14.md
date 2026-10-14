# Bounded private URL adjacency (PR #153 B2)

Baseline is committed C `4b42edb`. The maintainer authorizes sequential independent checkpoints,
with commit and push after validation. B2 passes final full verification and exact-build native
publication/foreground checks on Windows. Native elapsed observations remain limited as below.

## Ownership and behavior

URL-only working pages use owned adjacency maps. Private preparation forks them without copying
unchanged entries. Synchronous publication can replay at most **1,024 changed-key operations in
total across the patch**, after separate live adjacency ownership checks. The check captures the
working revision, display-flush revision, exact map identity and active cache lifetime. Evidence
pointer inequality does not establish adjacency privacy. Ordinary Markdown keeps copied native
adjacency; unknown native URL maps are copied before becoming owned.

Every immediate child is checked before any canonical mutation. Shared parent identities disable
both replays. Over-limit or interleaved-flush publication freezes the old base and publishes its
private child. Consumed and cancelled wrappers release their parent/value references and reject
reads, including held iterator continuation. Fallback history compacts privately at depth above
eight or when retained entry counts exceed twice logical size, with a 256-entry floor. Compaction
checks cancellation every 256 entries and at final completion. No async work follows a partial
canonical commit. Existing canonical working page identities, relationship meaning, evidence IDs,
priority lanes, count/byte acquisition limits and source-authority checks remain unchanged.

Display maps and relation objects are detached at existing flush boundaries. Stable published-only
target identities point at the latest displayed native maps, never at working pages. Retained
top-level display maps keep their exact entries; their relation targets follow display revisions,
as graph target identities already do. Retained target maps also remain unchanged. Deleted target
facades release their neighbors and leave the current target registry.

This target boundary is necessary: simply copying display maps leaves `Relation.target` pointing
at canonical working pages, exposing their mutable neighbors. Rebinding to immutable copies of
prior target pages would instead retain a chain of old high-degree generations. Stable published
targets avoid both problems. The deterministic reachability check confirms one displayed neighbor
map per current published path after repeated batches. This is a structural bound, not a byte or
retained-heap measurement. Target facades add one graph-page object per current displayed path;
detached display relationships add objects compared with the old shallow Map copy. Owned working
maps also carry wrapper/local-storage metadata; removed copy counts do not establish heap savings.

## Deterministic work comparison

`scripts/testing/url-adjacency-work.mjs` compiles actual GraphIndex/GraphBuilder sources for the
exact baseline and candidate. Owners point at one shared URL using a repeated fixed label; display
flushes occur every 128 owners. CPU clock and publication timers are controlled for work counts,
so portable durations are not performance evidence. Both builds preserve every unsorted page,
alias, relationship, target path, evidence declaration/ID and owner order in matching digests.

| Owners | Baseline working entries copied | Candidate working entries copied | Candidate replay keys | Display entries, both |
| --- | --- | --- | --- | --- |
| 256 | 33,150 | 0 | 765 | 644 |
| 512 | 131,838 | 0 | 1,533 | 1,800 |
| 1,024 | 525,822 | 0 | 3,069 | 5,648 |
| 2,048 | 2,100,222 | 0 | 6,141 | 19,488 |
| 4,096 | 8,394,750 | 0 | 12,285 | 71,744 |

Largest individual admitted replay is **two keys**; this append sequence requires **zero adjacency
compactions**. Page objects still clone, Map/Set membership still runs, and display materialization
is unchanged in count. Fixed-size display batches continue to revisit a growing shared target;
this change does not make total discovery or all display work linear.

## Native observations

`scripts/testing/obsidian/urlAdjacency.mjs` uses 512 actual owned notes in `kplex-test-small`, real
native parser output and the exact installed publisher. Four independent index lifetimes separate
one iterator-count run from three elapsed trials. Count wrappers are absent from elapsed runs.
Parsing, note creation, primary-index settlement and final ordered graph digests are outside timing.
This measures prepared-input URL publication, not complete startup or paint.

Native selected shared-target working entries fall from **131,327 to zero**; displayed entries
remain **1,284** at four flushes. Both sides retain zero additional reads/parses, foreground/focus,
original throttling and idle primary URL/source inventory at both observation boundaries. The
ordered graph/evidence digest matches in every trial:
`07dd13cdd96e3afb14d4e4213abe9ced73efe5c034ea84402b8316ec11d62e8e`.
Selected-target native counts exclude the other URL origin's small maps; portable counts include
all cloned/touched pages and display maps.

| Build | Three uninstrumented trials (ms) | Observed median (ms) |
| --- | --- | --- |
| C baseline | 537.4 / 284.7 / 570.7 | 537.4 |
| B2 candidate | 254.5 / 287.9 / 256.7 | 256.7 |

These sequential groups have substantial baseline variation and overlapping ranges. The lower
observed median is not a general 52% speedup claim, a randomized paired estimate, or whole-vault
startup/paint acceptance. Removed work is the stronger result. Earlier 355.2/290.6/632.1 ms trials
are retained as preliminary because their primary-inventory quiet condition was less complete.
The final baseline was reproduced from committed C in an isolated archive; all three artifact
hashes match C's prior full verification. Restaging transparently reuses that receipt, then reruns
native staging/render checks. The final candidate is restored and all installed hashes match.

## Validation

Final focused Map, production publication, existing evidence and alias suites: **45 passed**. Coverage
includes native Map ordering/undefined/NaN/clear/delete-reinsert/live iteration, exact 1,024 versus
1,025 admission, total multi-page budget, retained published maps/targets, mid-preparation flush,
stale ancestors/children, aliased parent fallback, cancellation, randomized mixed fallback chains,
cooperative depth/retention compaction and retirement of deleted/cleared/replaced private stages.
An ordinary-publication control retains its single canonical-page traversal and skips URL admission
metadata/preflight. Existing production digests and shared-origin lifecycle tests pass unchanged. Touched
types and official lint pass. The legacy indexing fixture passes after adding the new module to
its explicit compile inventory. The first full verification failed at that missing inventory entry
before native staging; its failed receipt is retained. A preliminary full repeat passed, followed
by ordinary-path/pruned-stage review corrections and a final full repeat: all architecture/core,
official lint, indexing/general/UI/portable source checks, **495 real-browser source tests**, the
20,015-owner fixture and actual production build/native smoke pass on Node **22.22.2**. The last
randomized test was added without a runtime change and passed in the final 45-test focused run.
All six native foreground cases pass with zero broad flushes, resumed source authority, no owned
resources remaining and original settings/enabled-list bytes restored.

Native runtime: Windows, Obsidian **1.14.4** (installer 1.14.0), Node **24.18.1**, Electron
**43.3.0**, Chrome **150.0.7871.212**. Final SHA-256 identities:

- `main.js`: `b455d6c5951131c1d8d22ba8d8807a58401253f2575ca8074546f6ce272b35f0`
- `GraphBuilder.ts`: `8c1efe13b0a91ca720c603bf93260e703d0c85fa6e6e8605328ca493fb98c74f`
- `GraphIndex.ts`: `d4d7b65e2988e494e662790d9718f63c7c08f6e490d76f504b0dc939f647fced`
- `UrlAdjacencyMap.ts`: `af48e7aa468246e8715feadfbdcd144dfd27aa3c5e41202b3c9d855fb12ae0ab`

[Raw receipts](indexing-url-adjacency-2026-10-14/) retain exact source/artifact identities,
baseline/candidate work and native observations, foreground results, final/full preliminary
verification and failed attempts. No parser, schema, setting, dependency or release metadata changes.

The first preliminary native baseline failed empty-owned-folder cleanup; the fixture now verifies
the exact empty folder identity and deletes it using native Vault force deletion. Subsequent
baseline cleanup passes. Another preliminary count receipt missed replacement maps during display
flush; final counters wrap the actual current map at each flush and retain earlier receipts as
preliminary. Native cleanup removes only owned notes/folder/database/controller and restores exact
settings/enabled-list bytes and window geometry. No production timing diagnostics are introduced.

Highest-probability failure is accidental working-map exposure through a displayed target; the new
test traverses every displayed relation after multiple batches and rejects working identities/maps.
No extra manual Windows check is requested after the automated native/foreground passes.
macOS, physical mobile and full M native-scale/heap/heartbeat acceptance remain pending.
