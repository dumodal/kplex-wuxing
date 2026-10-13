# Indexing performance: hydration guard checkpoint for #153

## Decision and scope

The maintainer requested a local commit of the first checkpoint, followed by the next measured
optimization from [PR #153](https://github.com/zsviczian/kplex/pull/153). The E1 checkpoint is committed
as `1411e4b` (`perf(index): avoid unchanged-source adjacency and evidence copies`) on
`2026-10-13-indexing-performance`. It has not been pushed. This second checkpoint implements A,
cheap hydration guards. After reviewing the result, the maintainer authorized committing this
checkpoint and continuing through further independently measured/validated checkpoints overnight.

Two production-method measurements informed the choice. Full graph hydration repeatedly serialized
mutable settings for each decoded record. Shared-URL staging also exhibited quadratic adjacency
copying, but correcting it requires a separate proof of private/public page ownership. A retains the
existing canonical settings owner and snapshot publication pipeline and is the more contained change.
Related #147/#148/#149, C15–C26, URL staging/publication, preview independence, cross-owner persistence
and evidence compaction are outside this checkpoint.

## Reproduction and measurement boundaries

Run under required Node **22.22.2**, using installed dependencies and actual Obsidian **1.13.0**
types. Browser measurements use real Chromium **153.0.0.0** and IndexedDB on Windows
**10.0.26200**, Intel Core i9-12900, 68,448,301,056 bytes physical RAM. The native host is the same
Obsidian 1.14.4 / Electron 43.3.0 / Chromium 150.0.7871.212 used by the
[first checkpoint](indexing-noop-performance-2026-10-13.md).

```sh
node scripts/testing/hydration-guard-work.mjs --baseline-ref=1411e4b
node scripts/testing/hydration-guard-work.mjs
node scripts/testing/hydration-guard-work.mjs --baseline-ref=1411e4b --case=4096:256
node scripts/testing/hydration-guard-work.mjs --case=4096:256
node scripts/testing/url-staging-work.mjs
node --test tests/hydration-guards-indexeddb.test.mjs
```

The optional baseline compiles the two changed owners directly from their committed Git contents;
all other runtime modules, host inputs, storage and fixture code are shared. No checkout, source
file or installed artifact is replaced. Source hashes identify the code actually compiled. Normal
tests compile the checkout with no source overrides. A missing baseline/browser fails the driver.

The hydration fixture writes a current schema-3 snapshot through the production writer. One real
fixture file links to N distinct unresolved targets; the graph has N+2 pages and N declarations.
F dormant parent fields grow the canonical policy input without changing those links. The current
URL-facet marker avoids an unrelated upgrade. Setup, cached-body seeding and the ordered graph oracle
are outside measurement. Actual production GraphIndex and chunk readers perform preview, relation,
evidence and final publication. Unrelated source reconciliation is held outside transactions and its
real continuation is released during cleanup; a hydrated preview does not acquire source/write authority.

A test-only CommonJS wrapper counts **IndexSnapshot.computeIndexSettingsSignature** calls, aggregate
returned characters and synchronous function duration. It preserves receiver/results and is removed
independently of assertions. It does not replace JSON, Map, the core policy encoder or the loader.
Counts exclude other settings projections/serializers and are attributed to the phase at call time.
Character totals are an allocation-work proxy, not heap bytes, retained memory or measured GC cost.
Elapsed hydration includes awaits, IDB and scheduler waits and excludes fixture setup; it is not CPU,
disk time, native input latency or actual paint. Sub-millisecond CPU sums have browser clock granularity.

## Initial measurement

Before changing runtime code, the five 256-field workloads produced:

| Records | Signature calls | Returned characters | Synchronous signature ms | Inclusive hydration ms |
| ---: | ---: | ---: | ---: | ---: |
| 256 | 1,357 | 7,544,920 | 7.1 | 48.5 |
| 512 | 2,632 | 14,633,920 | 10.4 | 81.3 |
| 1,024 | 4,716 | 26,220,960 | 17.6 | 143.2 |
| 2,048 | 8,885 | 49,400,600 | 32.6 | 217.4 |
| 4,096 | 17,226 | 95,776,560 | 62.9 | 374.4 |

At 1,024 records, F=0/128/512 produced 4,714/4,715/4,717 signature calls and about
1.39/13.54/51.59 million returned characters. Increasing both record and field counts increases
serialization work. Exact call counts vary with existing time-based cooperative yields.

The first candidate observation at 4,096 records reduced full **pages/relations/evidence** signature
calls from **4,135/4,134/4,133** to **22/22/21**. Whole-restore calls fell from **17,226 to 4,891**,
characters from **95,776,560 to 27,193,960**, synchronous signature work from **62.9 to 23.5 ms**,
and inclusive duration from **374.4 to 173.1 ms**. Both passed the exact ordered graph oracle with
zero body reads. These initial observations are single sequential diagnostics; their parser counter
observed fixture acquisition. Final measurements below observe the actual GraphIndex parser instead.
The remaining 4,816 candidate preview/search checks are deliberately unchanged. Fixed notification
and storage/yield boundaries still scale with record count; this is not an O(1) whole-hydration claim.

## Repeated comparison and receipts

Three fresh-profile comparisons used N=4,096/F=256 in serial order **B1,C1,C2,B2,B3,C3**. No other
browser/native test driver ran during them. Data is warm in IndexedDB, while these single-case browser
processes have not run the smaller hydration cases first. This explains why these times differ from
the matrix's later 4,096-record case; compare within one recipe. Probe overhead is present in both
variants and has not been separately calibrated. Three observations do not establish statistical
confidence, actual paint or a whole-vault/native startup improvement.

| Observation, median of three | Committed E1 baseline | Hydration-guard candidate |
| --- | ---: | ---: |
| Full page/relation/evidence signature calls | 12,405 | 67 |
| Whole-restore signature calls | 17,230 | 4,893 |
| Returned signature characters | 95,798,800 | 27,205,080 |
| Synchronous signature work | 116.3 ms | 31.5 ms |
| Inclusive hydration | 533.9 ms | 241.5 ms |
| Inclusive range | 479.7–624.3 ms | 241.3–241.6 ms |
| Actual body reads / index parser calls | 0 / 0 | 0 / 0 |

Every run asserts `restored` and the complete ordered graph oracle. Exact observations and tooling
hashes: [paired receipt](indexing-hydration-2026-10-13/paired.json). Subsequent fixture/probe edits
only added TSDoc; the final focused suite passed again. Production source/artifact hashes are unchanged.

The final eight-case matrix also passed with actual index-parser counters:

| N / F | Baseline calls | Candidate calls | Baseline / candidate inclusive ms |
| --- | ---: | ---: | ---: |
| 256 / 256 | 1,356 | 588 | 48.1 / 44.5 |
| 512 / 256 | 2,632 | 1,091 | 78.5 / 47.9 |
| 1,024 / 256 | 4,716 | 1,635 | 143.8 / 76.0 |
| 2,048 / 256 | 8,885 | 2,721 | 193.8 / 117.4 |
| 4,096 / 256 | 17,227 | 4,891 | 405.3 / 172.9 |
| 1,024 / 0 | 4,714 | 1,633 | 50.9 / 48.0 |
| 1,024 / 128 | 4,715 | 1,633 | 79.5 / 48.3 |
| 1,024 / 512 | 4,717 | 1,637 | 155.4 / 80.9 |

These are sequential per-matrix single observations, separate from the three fresh-profile pairs.
Both matrices use zero body reads/parses and pass the semantic oracle. Raw
[baseline](indexing-hydration-2026-10-13/baseline-matrix.json) and
[candidate](indexing-hydration-2026-10-13/candidate-matrix.json) receipts include per-phase counters,
source hashes and browser version. Initial exploratory
[baseline](indexing-hydration-2026-10-13/initial-baseline.json) and
[candidate](indexing-hydration-2026-10-13/initial-candidate.json) receipts retain the original observations
with the parser-counter limitation above.

## Alternative measured opportunity

The unchanged production URL-staging owner, given a shared URL and origin with a fixed label and
one occurrence per owner, copied these target-owned neighbor entries:

| Owners | Neighbor entries copied |
| ---: | ---: |
| 256 | 33,150 |
| 512 | 131,838 |
| 1,024 | 525,822 |
| 2,048 | 2,100,222 |
| 4,096 | 8,394,750 |

W(2N)/W(N) approaches 4. The test-owned private graph has no display readers, retained public
generations or flushes, and exclusive evidence adoption keeps evidence depth one. It records zero
body reads and zero display-flush copies; no fake-clock elapsed times are reported. This isolates
working-stage adjacency copying, without proving production can safely mutate retained URL pages.
It supports investigating B as a later independent checkpoint. [Raw work counts](indexing-hydration-2026-10-13/url-staging.json).

## Ownership and policy audit

GraphIndex captures the existing semantic-policy revision and immutable signature at restore
admission. Per-record guards check cancellation, run, closed/purged lifetime, semantic revision and
expected publication revision. Source/physical validity is independent: native source revision
changes still trigger captured physical identity/stat/membership checks, with mandatory full physical
checks at the existing promotion boundaries.

Full value checks remain after storage/task boundaries, actual reentrant 256-record progress
notifications and before presentation/publication. IndexedDbCache now checks immediately after
opening and completed chunk transactions, before decoding returned values. Legacy cursor callbacks
remain full checks on every host continuation. Other callers default to full checks; the cheap
capability is used only by the private full-restoration callbacks. No object-identity policy cache is
introduced. An observed signature mismatch permanently latches retirement, so observed A→B→A cannot
revive a candidate. Normal invalidation/unload/purge still settle public waits while external storage
is held, using the existing watchdog/cancellation owner. A final guard follows the promotion-phase
notification, whose listener can reenter settings code.

The canonical allowlist remains in `src/core/graph/settingsPolicy.ts`: seven ordered hierarchy roles,
inference flags, Date-property policy and image-property suppression names. No duplicate settings
classifier/signature version or new revision owner is introduced.

| Writer | Existing retirement route |
| --- | --- |
| Declarative hierarchy controls | `setControlValue` changes the array, then canonical `saveSettings` invalidates before its first await. |
| Inference, Date and image-property controls | Generic `setControlValue` → the same canonical `saveSettings` classifier. |
| Ontology assignment | `assignFieldToOntology` performs in-place splice/push, then `saveSettings` before asynchronous persistence. |
| Hidden-field setup | After disk completion it checks current hierarchy, installs the field and synchronously invalidates in the same continuation. |
| Settings/legacy import | Runtime import saves through the canonical route; startup migration/import occurs before restore admission. |
| Presentation/style managers | Canonical classification retains the existing presentation-only exception; no semantic revision is invented. |
| Unannounced direct mutation/replacement | Full signature value validation at boundaries catches values independently of identity/revision. |

No settings/schema/protocol/dependency/UI/network/telemetry or structural extraction changes are
introduced. Test controllers/probes are confined to test tooling and independently removed.

## Validation and remaining limits

Focused real-IDB guard suite: **21 passed**, no failures/skips. It covers 256/1,024/4,096 records with
the exact ordered role/direction/provenance oracle, bounded phase signature counts and zero reads/parses;
in-place/replacement/observed ABA/canonical ABA changes; immediate cancellation/unload/purge settlement;
publication supersession; equal-stat physical replacement and membership changes; settings edits after
actual page/relation/evidence transaction completion; each decoded-phase notification and promotion
notification; and legacy cursor reentry. The file is registered in `npm run test:sources:browser`.

Initial harness errors were corrected without weakening assertions: unload legitimately clears the
graph, so the late-publication assertion retains the post-unload state; phase notification happens
before GraphIndex updates its passive phase mirror, so the fault fixture observes the phase owner.
The final 21-test run passes both contracts. No production watchdog, deadline or golden was relaxed.

Under Node 22.22.2, `node scripts/testing/obsidian/verify.mjs` passed the complete `npm run verify`:
architecture/core checks, official Obsidian lint, all tests, actual TypeScript/esbuild production build
and exact-artifact small-vault render/no-error smoke. The real-IDB source lane passed **464 tests**,
including the 21 new guard tests and existing 20,015-owner fixture. The final focused guard suite
passed **21 tests** again after fixture/probe documentation review. The actual installed typings,
full checks, watchdog/deadlines and golden assertions were retained. [Full receipt](indexing-hydration-2026-10-13/host.json).

`node scripts/testing/obsidian/hydrationGuards.mjs` passed against the exact installed candidate in
the authorized, CLI-confirmed `C:/Obsidian/kplex-test-small` vault. The driver creates one 512-target
note and a unique test-owned IndexedDB namespace. Real native files/MetadataCache, parser/compiler,
snapshot writer/reader and installed GraphIndex produce **726 pages / 2,078 declarations**, with
**130 configured parent fields**. Full hydration preserves ordered semantics/provenance and uses
**zero body reads/parses**. Canonical policy invalidation settles the public wait while an actual
storage-open continuation is held; released late work does not publish. Foreground and original
background throttling remain enabled. Inclusive candidate duration **192.7 ms** is a functional
diagnostic with no corresponding native baseline. The note, controller and isolated database are
removed, window geometry is restored, and settings/enablement bytes are preserved. The native facade
changes only cache naming and excludes the existing vault's retired localStorage/file migration;
its files/resolution/storage/runtime remain native. [Native receipt](indexing-hydration-2026-10-13/native-hydration.json).

`node scripts/testing/obsidian/foreground.mjs` passed against that exact candidate: folder/gates,
navigation, link add/remove, node creation and visible edit succeeded while source acquisition was
held. **Zero broad flush calls**, background resumed, configuration restored, fixtures removed and
controller gone. [Foreground receipt](indexing-hydration-2026-10-13/foreground.json).

The same hash-checked build was staged in `C:/Obsidian/kplex-test`, retaining the previously verified
20,000-note high-node fixture. Command registration, rendered K-Plex and no captured JS errors passed,
reusing the successful full-verification receipt only after comparing every artifact hash. This is a
large-vault render smoke, not complete Eager indexing or native large-vault hydration timing.
[Large-vault receipt](indexing-hydration-2026-10-13/large-host.json).

The final read-only check confirmed both actual loaded instances contain the candidate guard,
all installed artifacts match the build, and no test controllers, owned note or foreground folder
remain. Inventories are **106 files / 88 Markdown** and **20,106 files / 20,088 Markdown**.
[Final native state](indexing-hydration-2026-10-13/final-native-state.json).

Final GraphIndex SHA-256: `c68ca5214d5eba74b4875384d41ffa7e5894b3bb9700235ef69e8a73d3c8e9fd`;
IndexedDbCache: `7f01d8791651aae70b0269e1131160dfa4fdad1b4a881baa9a727850d9f0af01`;
built/installed main.js: `bc8293b5732420c424a83839eda2892764ca20e95667919a2cbde7e769fe92b6`.
Manifest/styles retain their first-checkpoint hashes. Source review and `git diff --check` passed;
test-only controller/probe prefixes are absent from `src/` and `dist/main.js`. No further Windows
manual test is required for this bounded checkpoint's automated assertions.

Physical iOS/Android and macOS are separate unavailable environments. Highest-value manual check:
in a disposable mobile vault with a saved Eager graph, reopen K-Plex, change ontology during hydration,
then close/reopen it; expect the current ontology, responsive navigation and safe cache recovery.
Desktop automation cannot certify device memory/actual touch. Full M retained-heap/heartbeat/startup
acceptance and packages B–D/E2/E3 remain outstanding; this second increment does not close all of #153.
