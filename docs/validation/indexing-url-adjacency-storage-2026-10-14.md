# Reuse native backing for private URL adjacency

B5 follows the pushed [storage baseline](indexing-url-storage-baseline-2026-10-14.md) at `3ef54e2`.
That gate found8,042separate delta Maps alongside empty inherited Map backing in the actual graph.
This candidate keeps the same UrlAdjacencyMap owner and lifetime protocol while using native
superclass storage for each private local delta. C14 remains accepted; C15-C26 remain paused.

## Implementation and caller inventory

Only local get/has/set/delete/clear/size/entries change. Logical reads still compose exact captured
bases, tombstones, clear shadows and delete/reinsert order. Bounded adoption obtains the child's
native local entries after validating its lifetime and budget, rather than enumerating its logical
adjacency. Retirement clears native payload storage. Revision, frozen/retired/currentness checks,
1,024-key replay admission and cooperative compaction are unchanged.

Production callers use the overridden logical API. Source inventory found no intrinsic Map calls
or structured cloning of these private URL wrappers. Display publication creates separate native
Maps; ordinary document maps also stay native. Intrinsic backing is private delta storage, not a
complete published graph view. Independent GraphIndex privacy checks remain required for adoption;
the container type itself grants no ownership or authority. No settings, schema, scheduler, source
guard, dependency, release or ordinary-graph semantic change is introduced.

Two additional regressions characterize the existing contract before implementation: a five-key
delta over5,000neighbors cannot enumerate either logical map, and consumed/discarded native backing
must release its payload without changing a retained parent. Both pass the baseline. All33focused
Map/publication/search tests pass the candidate, including randomized mutable/immutable native
oracles, live iteration, undefined values, exact budgets, stale/consumed stages, cancellation and
retained published maps.

## Exact work gate

The existing actual index/compiler work script now accepts an explicit independent adjacency
source revision. Historical pre-B2 baselines need not contain that module; storage comparisons pin
it explicitly instead of silently using checkout code. The source ledger records all three owners.

Five sizes256/512/1024/2048/4096 match every work counter and complete ordered graph/evidence digest
against exact `3ef54e2` sources. At4,096owners:0working-neighbor copies,12,285replay writes, largest
replay2,0adjacency compactions,71,744display entries over32flushes. Largest digest
`e679d5a76b867e59d3661640a579534bd2967b0e019f8d17dfd49d971c97efc7`.
Fixed clocks/explicit display boundaries make these work results, not native latency claims.

## Validation

The frozen candidate passes the actual installed-type production build on Node22.22.2. An initial
sandboxed esbuild attempt failed parent-directory access after TypeScript passed; the authorized
build rerun exits0 without a source correction. Final full verification exits0 with architecture7/
core128/normal824/UI63/portable sources334/browser495/lint/production build/exact native smoke all
passing. The20,015-owner case preserves exact metadata/evidence/gates/degrees,8,187,369owner checks,
one publication and zero source I/O. All six exact-build foreground cases pass with cleanup.
All twelve matched native heap/flush replays and two component replays pass exact artifact staging,
source/orderedgraph/evidence digests and zero body reads/parses. All ten tracked graph roots collect
after every heap replay, and all48component root arrays collect. The final audit preserves20kfixture
bytes, settings/enabled bytes, workspace/window/throttling, both installed candidate builds and no
owned controller/debugger. No overall elapsed or paint gain is claimed.

Frozen source SHA256 `375c260daf99de88004e1f18dac7d9f601ad998e2ee9d8c31af2a846c32800a4`.
The accepted B4 three-file build was copied and checked against its full receipt before any runtime
edit; it is the exclusive native baseline, rather than E3 or older A. The earlier composite wrapper/
native heap difference includes all metadata and is not an expected saving for this candidate.
Final main SHA256 `0e0d599107d4efbd565a215f8544716831fd044a830317d362ac3f14a67dc9f4`;
manifest0.1.3 and styles retain their previous hashes. Final full/foreground receipts are saved in
the sibling raw directory.

## Matched native heap and pauses

Three retained and three unforced B4/candidate pairs use identical source/cache inputs and unchanged
production cadence. The middle pair reverses order. Retained-mode collections occur outside the
API; unforced mode has no pre-replay collection. Diagnostic timings remain separate from previous
low-instrumentation overall replay measurements.

| Pair / observation | Baseline B4 | Candidate B5 |
| --- | ---: | ---: |
| Retained bytes1 | 38,397,984 | 37,471,740 |
| Retained bytes2 | 38,298,024 | 38,188,812 |
| Retained bytes3 | 37,931,284 | 35,555,072 |
| Retained largest flush1/2/3, ms | 28.3 /43.7 /31.3 | 31.9 /29.0 /34.4 |
| Unforced largest flush1/2/3, ms | 39.2 /30.2 /42.2 | 33.1 /30.4 /38.2 |
| Unforced largest heartbeat gap1/2/3, ms | 51.0 /42.5 /52.9 | 33.4 /35.1 /44.0 |

Median retained bytes38,298,024→37,471,740:826,284fewer bytes (approximately2.2% of this isolated
graph). Every paired retained delta improves, though ranges overlap and background renderer heap
drifts. Retained-mode largest-flush medians31.3/31.9ms are effectively unchanged. Unforced medians
39.2→33.1ms also have overlapping ranges and mixed pair signs; no universal CPU/latency speedup is
established. Largest unforced heartbeat-gap medians51.0→35.1ms are observations, not actual paint,
interaction percentiles or physical-device acceptance. The candidate has no measured increase in
the unforced pair maxima; the retained-mode pause results are mixed. Keep allocation, live heap,
GC overlap and synchronous timing as separate outcomes.

Candidate unforced worst-gap GC overlap is0/0/3.118ms; overlapping flush durations are33.1/24.4/38.2ms.
Intervals may nest or overlap and are never added as exclusive CPU. Complete raw intervals and
driver-definition identities are retained in
[matched analysis](indexing-url-adjacency-storage-2026-10-14/matched-analysis.json).

## Actual storage and component heap

The matched installed constructors restore the identical16,069-page graph with8,040URL pages.
Both versions retain8,042wrapper layers including captured bases,24,137logical neighbor entries
and maximum depth2. Baseline8,042separate local Maps become0; inherited native backing holds the
same24,137local entries. Non-URL owner pages and displayed Maps retain their existing representation.

Three rounds per condition retain16,384containers with identical numeric entries, alternate
wrapper/native order and collect outside replay timing. Actual renderer live-minus-empty medians:

| Entries/container | B4 wrapper bytes | B5 wrapper bytes | B4 / B5 native controls |
| --- | ---: | ---: | ---: |
| 0 | 3,812,120 | 2,246,932 | 1,589,848 /1,565,928 |
| 1 | 3,741,688 | 2,170,380 | 1,566,172 /1,579,032 |
| 2 | 3,741,720 | 2,166,792 | 1,592,492 /1,592,436 |
| 8 | 4,659,144 | 3,066,372 | 2,489,824 /2,482,184 |

The prespecified two-entry case matches the dominant live URL-page degree. Its wrapper median
decreases1,574,928bytes (approximately42%) with essentially unchanged native control. This is a
component result, not a full-plugin/process-peak percentage or exact per-object size. All samples,
including background drift, remain in the
[component analysis](indexing-url-adjacency-storage-2026-10-14/storage-analysis.json). The independent
complete-graph paired heap result above is consistent with fewer containers without predicting it
by multiplying a control difference.

Node syntax, all raw JSON, local report links and staged whitespace pass. The environment-only
denied build and authorized successful build remain separate receipts. No additional manual Windows
check is requested after the automated oracle/lifetime/work/full/native/foreground gates. macOS and
physical mobile still need their existing platform acceptance; particularly verify warm URL search,
alias edit/delete and navigation over a high-degree target with correct relationships and no stalled
background completion. There is no new touch/popout behavior or platform performance claim.

## Reproduction

```sh
node --test --test-concurrency=1 tests/url-adjacency-map.test.mjs tests/url-adjacency-publication.test.mjs tests/url-search-publication.test.mjs
node scripts/testing/url-adjacency-work.mjs --baseline-ref=3ef54e2 --adjacency-baseline-ref=3ef54e2
node scripts/testing/url-adjacency-work.mjs
npm run verify:obsidian
```

Use the three explicit authorized-vault variables and fresh report directories for native work.
Keep full verification, native drivers and build/browser stress serial. macOS, physical mobile,
process peak, actual paint and long-session acceptance remain separate. No extra manual Windows
check is requested after these automated validations.
