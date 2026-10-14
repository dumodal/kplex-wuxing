# Saved preview independent of URL replay (PR #153 C)

## Scope and ownership

Baseline: B3 `34cbbbc`, committed and pushed after complete verification. The maintainer authorizes
continued unsupervised checkpoints without a hard deadline and a commit/push after each validated
increment. This checkpoint changes the existing GraphIndex restore coordinator, with no new
scheduler, inventory, schema, settings, dependencies or relationship rules.

`restorePersistedSnapshot` starts/reuses the existing URL task and immediately enters the existing
bounded graph preview owner. It explicitly handles rejection of the detached optional URL task.
The public graph wait races its own supersession/cancellation; graph and URL acquisition keep
separate watchdogs and generation fences. Both **90-second inactivity** and **five-second polling**
remain unchanged. Eager preview arbitration still releases before broad recovery/hydration, and
P1/P2 preview work never awaits the P3 URL replay it can pause. Source/full hydration remains P4.

The real-IDB purge regression exposed queued diagnostics persistence that checked unload but not
purge. Its queue now checks both before storage access. This prevents a pre-purge queued write from
calling `open` after retirement. No logging or diagnostics instrumentation is added to production.

Source audit also covers main.ts: URL event listeners precede layout-ready startup; the temporary
pre-restore change fence transitions to normal listeners after the public restore returns. Existing
independent URL search entries survive full graph/search replacement; synchronization mirrors current
URL labels into canonical pages without replacing saved evidence. Current owner event tokens reject
same-stat stale cache records. Preview results never certify URL completion or exact source/write
authority. Cached raw GraphPages may retain coherent older adjacency: event tests assert the composed
public neighborhood reader, current URL incidence and final search, rather than claiming every cached
page is a frozen current semantic view.

## Controlled real-IDB dependency comparison

`scripts/testing/saved-preview-url-work.mjs --baseline-ref=34cbbbc` and the candidate use the actual
snapshot/URL writers, builder/compiler and readers. Genuine Markdown creates a saved body-only URL
edge. Each mode is captured **before index construction** and asserted through `isOnDemandMode`;
current display defaults come from the existing shared gate fixture. Initial fixture prototypes that
changed the setting after construction were discarded before accepting these results.

URL page acquisition is held after its actual transaction completes, or the actual publication
predecessor/compiler is held outside transactions. The hold stays unresolved for a declared **200 ms**
observation window. No virtual watchdog time is advanced and no production timeout changes.

| Mode / hold | Baseline preview (ms) | Candidate preview (ms) | Baseline / candidate catalog reads before release |
| --- | ---: | ---: | ---: |
| Eager / page | 285.2 | 4.5 | 0 / 1 |
| Eager / predecessor | 242.1 | 1.5 | 0 / 1 |
| Eager / compiler | 239.7 | 1.3 | 0 / 1 |
| On-demand / page | 235.3 | 1.2 | 0 / 1 |
| On-demand / predecessor | 235.7 | 1.0 | 0 / 1 |
| On-demand / compiler | 236.5 | 1.0 | 0 / 1 |

Every candidate preview completes while the gate remains unresolved. All baseline previews remain
pending until release. Final ordered graph/URL adjacency, aliases, declarations and same-sequence IDs
have matching digests. Actual warm body reads/parses are **zero** in both variants. Overall measured
completion remains about **231–288 ms** including the artificial hold: this removes a dependency,
not demonstrated total CPU or whole-startup work. Digests/setup are outside reported durations.

## Actual native bootstrap comparison

`scripts/testing/obsidian/urlPreviewStartup.mjs` reloads the actual installed plugin in each mode.
A temporary inherited native lifecycle-registration hook captures the newly constructed index before
main.ts registers its layout callback. It holds an actual transaction-complete URL page and observes
main.ts's actual `snapshotRestoreTask` promise. A separate actual native GraphIndex/builder seeds a
valid complete derived snapshot; it is destroyed without purging the actual vault's cache.

Baseline installed main.js is B3
`d421681740293b6863bbcdc9d5ad2f5ceebc9469ad5d7877ff9cc60f241318d2`.
With a declared **250 ms hold**, neither mode's public restore settles before release. Observed public
completion: **459.2 ms Eager / 511.0 ms On-demand**, with **zero reads/parses**. Both already expose
the saved body edge through another preview path, and physical search works while the public restore
waits. Therefore no new first-visible-body-edge or paint improvement is claimed. URL inventory remains
incomplete and exact-pair write readiness is false during the hold. The baseline On-demand overall
status is already up to date despite independent URL inventory; this behavior is recorded, not
introduced or reclassified by C.

The final warm comparison authenticates the current native file through actual parsing, source
acquisition and source-inventory closure **before** snapshot seeding/reload. Setup work is excluded
from restart counts. Both builds therefore begin with a complete neutral head matching mtime, size
and ctime. The experiment also waits for actual Eager source authority/inventory closure after URL
release; UI readiness alone is insufficient. On-demand retains its existing finite/local strategy
and is not forced to run a global inventory.

| Authenticated warm restart | Baseline public completion | Candidate public completion | Reads / parses, both |
| --- | ---: | ---: | ---: |
| Eager | 460.5 ms, after release | **43.9 ms, while held** | 0 / 0 |
| On-demand | 492.2 ms, after release | **52.1 ms, while held** | 0 / 0 |

An additional older/missing-neutral-head run deliberately omits this warm authentication. Eager
baseline reused cached input with **zero** reads/parses; candidate performed **one** read and parse
of the owned file through `sourceAcquisition.loadBody`, then closed actual source authority. This is
**additional validation work** caused by earlier source preparation, not a duplicate read. It is a
real tradeoff, not counted as a zero-work warm result. The subsequent On-demand pass has the repaired
head and reads/parses zero in both builds. Existing #142 ambiguous-cache/physical-incarnation guards
and exact single-read regressions pass unchanged; none is relaxed to avoid the candidate's validation.
Native probes assert zero acquisition for authenticated warm input and at most one owned read/parse
for the repair variant. Full cold/recreated-vault CPU/I/O behavior is not certified by this warm test.

Earlier pre-authentication observations and an already-reloading preflight failure are retained with
clear receipt names. A bounded readiness wait now precedes independent native runs. The first
baseline artifact was reconstructed in an isolated temporary source tree from exact `34cbbbc` and
produced the same B3 SHA-256 above, with the unchanged dependency installation. Restaging reuses
prior full verification only when **all three artifact hashes** match, then reruns native render
checks; it does not claim another full portable run. The verified C artifact is restored afterward.

The driver owns one Markdown note, temporary native wrappers and its reload/seed lifetimes. It checks
actual captured strategies, foreground/focus/ordinary throttling and exact installed artifact hashes.
Cleanup independently removes the owned note, releases gates, destroys the seed, restores host
prototypes/methods, original settings/enabled-list bytes, workspace and window geometry. Native
baseline and candidate passed. [Raw receipts](indexing-independent-preview-2026-10-14/) retain both
warm and repair comparisons, source/host identities, exact restaging and cleanup.

## Validation

Focused **53 pass**: 31 real-IDB cases (including the suite parent) and the existing 22 virtual-clock
lifetime cases. New coverage includes valid saved/current URL-center preview under three holds in
both modes, real aborted URL transactions, missing/corrupt snapshots, rapid supersession, replacement
strategies, same-stat edit/rename/delete, optional full promotion preserving new search/incidence, and
unload/purge during held catalog/pages with zero late opens, publication, terminal rewrites or leases.
Sequencing-only old assertions were replaced by independent-catalog assertions while preserving
90-second expiry, five-second polling, healthy progress beyond 90 seconds, repeated-prefix rejection,
uncached discovery after abandonment and all late-owner/no-reopen/cleanup checks.

The new suite is in normal `test:sources:browser`. Full `verify:obsidian` passed on Node **22.22.2**:
architecture/core/Obsidian lint, all normal/source tests, **495 real-browser source tests**, the
20,015-owner fixture and real production build. Native matched-warm/repair bootstrap checks and
all six foreground cases passed; foreground broad flushes **zero**, remaining owned resources
**zero**, configuration restored. Highest risk is an earlier main listener
transition overlapping late URL replay; the actual bootstrap scenario and event tests address that
boundary. No additional manual Windows check is requested. macOS/physical mobile, paint, retained
heap and full M native-scale acceptance remain pending.

Candidate main.js SHA-256:
`f0f8c921778ed9d5646c0d831228c031b202a4a220dade57c341143099d64835`.
GraphIndex SHA-256:
`e0298a5c995b09d2732629afae86e8117f744d9a041f6350031b482b65389c00`.
