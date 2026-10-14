# URL cache transaction measurement gate (PR #153 D)

Measured baseline is committed and pushed B2 `c507ba1`. No production persistence, acquisition,
scheduler or schema change is included in this checkpoint. The native driver uses 512 actual
owned notes, actual parser output and the installed GraphIndex/IndexedDB in a disposable namespace.
All three installed artifact hashes match B2's complete verification; main is
`b455d6c5951131c1d8d22ba8d8807a58401253f2575ca8074546f6ce272b35f0`.

## Completed work and scope

The actual six-owner refresh waves retain the existing read budget through persistence. Inputs
are already parsed, physically current native facts. Each isolated index runs the production
refresh, serial publisher and cache writer. No write result, IDB implementation, source guard,
body read or parser is substituted. A separate observed run forwards original promises and native
IDB requests, counts transaction **complete** events, and measures synchronous `objectStore.put()`
duration. Count wrappers are absent from the three elapsed runs. Cache readback verifies every
URL/label/alias/coordinate, inline occurrence, frontmatter payload, path, mtime and size.

All 512 owners round-trip, with zero additional reads/parses, unchanged ordered graph/evidence
digest `07dd13cdd96e3afb14d4e4213abe9ced73efe5c034ea84402b8316ec11d62e8e`,
foreground/focus/original throttling and idle primary inventory. The observed production wave has
**512 transactions, 512 complete events, zero aborts**, maximum one row per transaction, six
pending writes and six active read reservations. Maximum physical read reservation is 252 bytes
for this small fixture; it is not the decoded or queued URL payload size.

Final uninstrumented refresh trials are **923.4 / 826.0 / 859.0 ms**, median **859.0 ms**. Earlier
unchanged-source observations were 1,083.8 / 1,104.6 / 1,075.1 ms and are retained as preliminary;
this variation does not establish a change in plugin performance.

## Wait and serialization attribution

The observed run records 30 actual responsive idle windows: **758.1 ms** of interval union.
Transaction intervals cover **164.3 ms**; their combined union is **913.1 ms**, so they overlap.
These are observed event-loop intervals, not exclusive disk or CPU time. Summed per-put promise
wait is 512.1 ms and also overlaps; it must not be subtracted as a disjoint cost. Synchronous
native put calls total **15.1 ms** including structured-clone/enqueue binding work and observer
overhead. The observed run's timing is not the uninstrumented median.

The row's `scheduler` snapshot is collected after cache verification and includes its P4 readback
windows. Use the scoped `idleIntervals` for the 30 measured P3 windows; the snapshot's 33 windows
are not all charged to refresh. Existing responsive policy remains six milliseconds of work and
24 milliseconds idle. This measurement does not authorize changing that policy.

A separate JSON-size proxy over the actual 512 input records measures **206,824 UTF-16 bytes**,
largest record 404 bytes; stringify duration is **0.3 / 0.4 / 0.3 ms**. This is neither IndexedDB
encoded bytes nor decoded heap. It illustrates why physical file bytes alone are insufficient for
a write-buffer bound; future estimator/admission overhead still needs its own measurement.

## Isolated storage potential

Real `putUrlOwners()` calls write the same current compact facts after the refresh trials. Batch
order rotates across three rounds; every transaction is awaited to completion. Per-row physical
fence checks total equally across batch sizes. A separate concurrent-singleton control matches
the current six-owner storage concurrency without graph/compiler/pacing work.

| Storage-only shape | Transactions for 512 rows | Three trials (ms) | Median (ms) |
| --- | --- | --- | --- |
| Serial singleton | 512 | 85.4 / 82.6 / 90.9 | 85.4 |
| Six concurrent singletons | 512 | 59.8 / 61.2 / 61.1 | 61.1 |
| Batches of six | 86 | 37.3 / 32.2 / 30.5 | 32.2 |
| Batches of 64 | 8 | 21.3 / 18.7 / 22.0 | 21.3 |

Batch size 64 is a storage-only ceiling, not a proposed producer expansion. Current desktop read
admission is six, other mobile two, iOS one. The six-row benefit supports a bounded candidate;
it does not prove an end-to-end gain or justify releasing read reservations early. iOS cannot
gain cross-owner batching while preserving its one-owner admission.

## Next implementation checkpoint

Keep publication immediate and retain existing read count/byte admission. A writer can collect
completed facts at an existing host-task boundary without acquiring a P3/P4 lease. Bound admitted
snapshots by record count and estimated bytes, including in-flight records; a single oversized
or conservatively unmeasurable owner must run alone. Waiting producers retain identities/read
capabilities rather than payload snapshots. Estimation must not add an unbounded synchronous
JSON pass. No raw Markdown should be kept for optional persistence.

Validate each owner at transaction open. Serialize tombstones with writes and use an exact stored
write receipt for stale completion cleanup: an old completion must never delete a newer row,
including across cache connections. Any optional internal receipt field must preserve legacy URL
rows, public fact round-trip, DB version and source/snapshot compatibility. Failure remains visible;
request success is not a durability receipt. Do not add a second semantic scheduler.

Before committing a runtime candidate, cover per-path replacement, partial batch eligibility,
held-write count/byte backpressure, oversized owners, foreground actions, same-stat recreate,
rename, real abort/unavailable storage/retry, close/purge and late completion. Keep queued full
body reuse and neutral-source authority unchanged. Compare actual production transactions and
uninstrumented refresh against this baseline, not just the batch-only table.

## Validation and limits

`node --check scripts/testing/obsidian/urlCacheWrites.mjs` and the exact-build native run pass.
The driver deletes its own notes/folder/database/controller, restores geometry and verifies
original settings/enabled-list bytes. Both native runs passed cleanup. This tool-only checkpoint
does not require rerunning the unchanged production build's complete suite. B2's full verification
and native foreground results remain the production acceptance baseline.

Runtime is Windows, Obsidian 1.14.4 (installer 1.14.0), native Node 24.18.1 / Electron 43.3.0 /
Chrome 150.0.7871.212; driver Node 22.22.2. [Raw receipts](indexing-url-cache-write-baseline-2026-10-14/)
retain both runs and source/artifact identities. No manual Windows check is requested for this
measurement-only checkpoint. Native large-vault, macOS, physical mobile, retained heap and paint
acceptance remain pending.
