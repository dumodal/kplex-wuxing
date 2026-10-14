# Ordinary evidence maintenance gate (PR #153 E2)

Runtime baseline is B2 `c507ba1`; subsequent `708ce32` adds D measurement tooling only. This
checkpoint measures actual GraphBuilder/core-evidence work and proposes a narrow next candidate.
It changes no runtime behavior or public read contract. It is not full E2 acceptance.

## Controlled work

`node scripts/testing/evidence-maintenance-work.mjs` runs the actual ordinary per-file patch
preparer, resolver, publisher and evidence maintenance. Finite native facts and hot parsed bodies
are controlled inputs. CPU time is fixed, so durations are deliberately excluded. Target-kind
lookup metadata remains inactive throughout; source/body reads and parser admissions are zero.
Receipts retain exact source hashes, unsorted graph/target/evidence/ID digests and operation counts.

The fixed graph has N unrelated originals plus one leaf relationship. Sixty-four genuine edits
either alternate the leaf's endpoint or replace its role on the same pair. Each edit publishes one
source, with constant logical evidence size. Calibration uses the real patch path before counting.

| Unrelated originals | Full compactions, 64 edits | Pair/declaration entries copied | Neighbor entries copied, endpoint / role |
| --- | --- | --- | --- |
| 256 | 8 | 2,056 | 256 / 192 |
| 512 | 8 | 4,104 | 256 / 192 |
| 1,024 | 8 | 8,200 | 256 / 192 |
| 2,048 | 8 | 16,392 | 256 / 192 |
| 4,096 | 8 | 32,776 | 256 / 192 |

Thus sparse ordinary edits still pay for the unchanged global evidence graph. E1 correctly removes
this cost for semantic no-ops; these edits genuinely change relationship meaning. Declaration-copy
counts refer to bucket entries/visits, not new copies of every declaration object or decoded bytes.

Growing ingestion uses actual one-file patches, each adding a genuine owner pointing at a physical
hub. Parsed-body inputs enter the hot cache at the next-owner boundary, respecting the production
1,200-entry desktop limit rather than preloading an entire vault.

| Owners | Full compactions | Pair/declaration entries copied | Ordinary neighbor entries copied |
| --- | --- | --- | --- |
| 256 | 31 | 3,968 | 32,640 |
| 512 | 63 | 16,128 | 130,816 |
| 1,024 | 127 | 65,024 | 523,776 |
| 2,048 | 255 | 261,120 | 2,096,128 |
| 4,096 | 511 | 1,046,528 | 8,386,560 |

The latter adjacency cost is ordinary published graph storage; B2 intentionally optimizes only
the private URL lane. Removing evidence maintenance alone will not make this ingestion linear.
This fixture does not establish which startup route uses per-file ingestion in a particular vault;
one-shot private compilation, offline reconciliation and native startup need separate attribution.

## Narrow candidate and limits

Investigate a bounded sparse replacement compaction alongside the existing full compaction API.
For ordinary inactive stores only, collapse recent overrides above one unchanged standalone anchor
when the changed working set and copied/retained scalar payload are small. Keep depth eight.
The completed store must retain only the anchor plus the latest bounded overrides, releasing
intermediate generations. Existing full compaction must continue returning a standalone store.

Eligibility must be conservative: for example at most 32 pair keys, 256 current/overwritten
originals and 64 KiB of scalar-string payload; these are proposed private limits, not settings.
Unknown/non-scalar payload, active target-kind indexes, large buckets or excessive history fall back
to the unchanged full path. Checkpoints and final cancellation must leave every old store intact.
For a stable small replacement set, maintenance can then depend on that set rather than N.

Tombstones require special care: a full compaction drops empty buckets and their old ordering
positions. Keeping a deleted key hidden in an anchor can incorrectly restore its original position
after re-add. Initially **fall back to full compaction whenever a latest override is empty or an
anchor contains tombstones**, preserving the existing order contract. Do not add a broad ordered
persistent-container framework to optimize this control case. Test delete/re-add across compaction
against the old implementation, including pair/path iteration, IDs and directional evidence.

This is a targeted replacement improvement, not a global amortized-linear claim. Growing append
and tombstoned workloads can retain full compactions. Prove explicit retention limits, especially
when a large old raw value becomes a small replacement, before accepting an anchored result.
Stop at this gate if preserving read/retention contracts requires broad extraction, schema changes
or C15-C26 work. D's queue remains a separate candidate with its own stored-write fencing needs.

## Validation status

All fifteen size/workload cells pass their actual semantic/source-count assertions on Node22.22.2.
No production code was changed, so B2's full/native/foreground verification remains the runtime
baseline. The tool initially referenced an unexported constructor and then overfilled the hot
cache; setup was corrected to use the actual store constructor and bounded per-owner hot inputs.
No production resource limit, parser, source guard or test threshold was weakened.

[Raw work receipt](indexing-evidence-maintenance-baseline-2026-10-14/work.json) includes complete
digests/counts. Native timing, offline-change reconciliation, inactive/activated retained heap,
randomized overwrite/tombstone equivalence and physical-device acceptance remain pending. No
manual Windows check is requested for this measurement-only checkpoint.
