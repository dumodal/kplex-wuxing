# Private compiler evidence appends (PR #153 E3)

Runtime baseline is E2 `8c4f899`; the [append measurement gate](indexing-evidence-append-baseline-2026-10-14.md)
is committed/pushed as `7d49b4a`. Full verification, three alternating native pairs and all six
foreground workflows pass. The checkpoint commit contains the source/artifact ledger below.

## Ownership contract

Only `RelationEvidenceStore.createPrivateCompilation()` enables append-in-place, on a newly
created empty standalone store. The canonical normalized compiler is its production consumer.
Normal constructors and every ordinary/public patch store retain copy-on-write. Standalone shape,
inactive metadata and evidence inequality never grant ownership.

The permission is irreversible for an existing store. Compiler finalization and terminal rejection
seal it before output can escape. Fork construction seals the parent before capturing its base;
starting an original-declaration iterator seals it before a suspended consumer can retain a bucket.
Ordering, both compaction APIs and target-index activation also seal before their first await or
standalone return. Copied resolver views retain their normal behavior without forcing private
ingestion to stop. No public read, immediate-parent fork or standalone compaction contract changes.

The append path captures the previous bucket length before pushing, then uses the existing
pair/count/path/ID bookkeeping. After sealing, the existing prefix-copy path is used. Explicit
creation plus these boundaries prevent an owned array from growing beneath a retained generation.
Original declaration objects, multiplicity, inverse/Hidden/date semantics, suppression and configured
field ordering remain canonical. Source batches/checkpoints, parser and publication rules are unchanged.

No additional per-target index, cache, queue or persisted field is introduced. A growing JS array
can resize its internal backing storage; eliminating explicit prefix copies does not establish zero
allocation, byte savings, lower retained heap or device memory acceptance.

## Controlled work and correctness

All ten exact baseline/candidate graph/evidence digests match the committed gate. The test helper
can compile named modules from exact Git bytes without rewriting the checkout; other dependencies
and default consumers remain unchanged. The candidate flag selects the asserted work receipt,
not a substitute implementation or different source data.

| Dense originals | Baseline explicit prior entries copied | Candidate | Array replacements, baseline / candidate |
| --- | --- | --- | --- |
| 256 | 32,640 | 0 | 256 / 1 |
| 512 | 130,816 | 0 | 512 / 1 |
| 1,024 | 523,776 | 0 | 1,024 / 1 |
| 2,048 | 2,096,128 | 0 | 2,048 / 1 |
| 4,096 | 8,386,560 | 0 | 4,096 / 1 |

Distributed control stays at zero copied prior entries with one new array per pair. Counts exclude
ordering, filtering, compaction and engine-internal storage growth. Fixed-clock portable runs do not
provide elapsed timings. Fifteen focused cases pass, covering suspended original iterators, copied
views/entry iteration, parent/constructor/host forks, adoption, compaction, ordering, active indexes,
cancelled operations and successful/rejected/incomplete graph/node compiler finalization. The 86
affected golden/compiler/sparse/no-op/private cases pass. Full `verify:obsidian` passes architecture
7, restricted core128, normal812, UI63, portable sources334, browser sources495, official lint,
production build and native smoke. Runtime sources stayed frozen before the successful full run.
Exact candidate `main.js` is `60fcb5dd51261d2f91c6175398e49344695e81359269a705358d923e4ac72e18`;
manifest0.1.3 and stylesheet bytes are unchanged.

## Native method and preliminary scale

The native driver uses real physical `Child:: [[target]]` occurrences in one owned note. Actual
parser positions and the installed compiler retain each inline value. This avoids claiming that
repeating an identical raw URL spelling creates N originals: the current parser deduplicates those
URLs. The portable normalized-URL stream is a core-contract control, not physical-parser proof.

An actual installed isolated GraphIndex performs one untimed full rebuild, then one warm full
rebuild for observation. Final warmup pauses optional inventory through the same existing API that
full rebuilds already use, then lets production body writes and snapshot persistence finish naturally.
It checks the actual completed snapshot and records cache/queue/source state. The actual warm
rebuild keeps its normal scheduling and reenables optional inventory on publication. No source
authority or complete-pipeline closure is claimed. No flush, pacing policy or fact is fabricated.
Warm timed rebuilds must issue zero
body reads/parses. Setup/acquisition and later cache drain are outside this API measurement.

Counted runs filter the canonical evidence prototype by the owned source only, restore exact methods
and measure native event-loop gaps. Timing runs omit append/heartbeat observers, retaining lightweight
source counters. All ordered graph/evidence IDs, genuine positions, canonical targets and retained
old evidence are checked outside timing. The synchronous full-rebuild commit block has no separate
observer; heartbeat is not actual paint or exclusive CPU duration.

| Preliminary baseline physical inline values | Owned originals | Explicit prior entries copied | One warm rebuild, ms |
| --- | --- | --- | --- |
| 4,096 | 4,097 | 8,390,656 | 271.2 |
| 8,192 | 8,193 | 33,558,528 | 500.9 |
| 16,384 | 16,385 | 134,225,920 | 1,078.6 |

These exploratory single samples established safe fixture scaling; they precede the final complete
cache/source warmup condition and are excluded from baseline/candidate latency comparisons.
All three passed exact native graph/position/source-budget/focus/cleanup assertions. No whole-engine,
startup, natural editing frequency, retained-heap or physical-device speedup is claimed.

The first candidate warmup required unrelated optional source authority as well. After60seconds
its body/snapshot queues were empty, but source inventory was still active and authority false;
the run failed and cleaned up. Its receipt is retained. Final preparation isolates the full-rebuild
API using its existing inventory-pause boundary instead of extending deadlines or treating optional
inventory as completed. The slow inventory itself is not diagnosed or optimized by this checkpoint.

## Final alternating comparison

Each baseline/candidate invocation contains one counted/heartbeat run and one timing run without
those observers. Three exact-build pairs alternate baseline/candidate. All12 independent lifetimes
retain the same graph/evidence digest and 16,384 distinct physical inline positions. Every timed
rebuild has zero body reads/parses. Cache conditions match exactly:89 hot files, no pending body
writes, completed current snapshot, no active/waiting/paced work, and optional inventory paused.
Global source authority is false and not required by this isolated full-rebuild path. Publication
reenables optional inventory normally; its later completion is outside this measurement.

| Observation | E2 baseline | E3 candidate |
| --- | --- | --- |
| Actual owned originals | 16,385 | 16,385 |
| Explicit prior entries copied | 134,225,920 | 0 |
| Bucket-array replacements | 16,385 | 1 |
| Three warm rebuild times, ms | 1,085.7 / 1,077.2 / 1,086.2 | 665.9 / 759.7 / 769.1 |
| Median / range, ms | 1,085.7 / 1,077.2-1,086.2 | 759.7 / 665.9-769.1 |
| Counted largest heartbeat gaps, ms | 28.2 / 41.8 / 28.9 | 26.7 / 37.3 / 35.8 |

The observed median API duration is about30% lower in this generated dense warm-rebuild fixture.
All three candidate samples are faster than their paired baseline; no samples/outliers are removed.
This is a three-pair Windows observation with unchanged responsive pacing, not a universal gain.
Heartbeat ranges overlap and do not establish a frame/interaction improvement. Array-engine
capacity/GC and native retained heap remain unmeasured. Full foreground smoke independently passes
folder/gate access, navigation, link creation/removal, note creation and visible edits during held
source acquisition: broad flush0, eventual closure, owned resources0, controller removal and exact
settings/enablement-byte restoration. The source inventory warmup failure remains separate.

## Reproduction and receipts

Use Node22.22.2 and the explicit three disposable-vault variables in CONTRIBUTING. Run
`node --test tests/private-compiler-evidence.test.mjs` and the affected canonical suites. For
controlled work, run `node scripts/testing/evidence-append-work.mjs --baseline-ref=7d49b4a` and
`node scripts/testing/evidence-append-work.mjs --expect-private-appends`; both retain identical
graph/evidence values while asserting their distinct expected copy counts. The new focused suite
is registered in normal and restricted-core lanes.

Run `npm run verify:obsidian`, then use the successful exact-artifact receipt to stage each version
before `node scripts/testing/obsidian/evidenceAppend.mjs`. Set
`KPLEX_EVIDENCE_TIMING_TRIALS=1` and `KPLEX_EVIDENCE_OCCURRENCES=16384` for each of three
alternating pairs. Baseline attribution uses `KPLEX_PROBE_BASELINE_REF=7d49b4a` plus its preserved
artifact directory; candidate uses current `dist`. Staging reuses prior full acceptance by matching
all three hashes; it does not constitute six additional full test runs. Finish on the candidate
with `npm run verify:obsidian:foreground`. Runtime code stayed frozen after full verification;
later refinements only describe/control the benchmark's setup and saved evidence.

[Source/environment ledger](indexing-private-compiler-append-2026-10-14/environment-and-sources.json),
[paired summary](indexing-private-compiler-append-2026-10-14/paired-summary.json),
[work baseline](indexing-private-compiler-append-2026-10-14/work-baseline.json),
[work candidate](indexing-private-compiler-append-2026-10-14/work-candidate.json),
[full verification](indexing-private-compiler-append-2026-10-14/host-verification.json) and
[foreground receipt](indexing-private-compiler-append-2026-10-14/foreground.json) retain identities
and complete aggregates. The same directory contains every native pair/stage receipt, preliminary
scale/candidate observations and the failed full-authority warmup. No production diagnostic
logging, new dependency, settings migration or cache-version change is included.

No extra manual Windows check is requested while the automated lane can exercise these contracts.
macOS/physical mobile and the full M native-scale/retained-heap/heartbeat matrix remain pending.
