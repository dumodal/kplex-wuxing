# Dense-pair append gate (PR #153 E3)

Runtime baseline is E2 `8c4f899`, committed and pushed after full/native/foreground validation.
This checkpoint changes measurement tooling only. E2's runtime acceptance remains applicable;
no compiler/evidence behavior, public store contract or persisted schema is changed here.

`node scripts/testing/evidence-append-work.mjs` supplies actual normalized URL occurrence records
to the production compiler in batches of at most 256. N occurrences belong either to one physical
owner and one pair, or N owners sharing one target. The same N original declarations survive in
both controls. Repeated labels do not multiply aliases. Each occurrence retains genuine one-based
line provenance; declaration order and IDs enter the unsorted graph/evidence digest.

The owner-local observer scopes `writePair` to actual `addDeclarationRecord` calls. It counts a
copied prefix only when the next bucket array differs from the currently owned array. Filtering,
sorting, compaction and other stores are excluded. Original receivers/results and inherited method
properties are restored in `finally`. CPU time is fixed: these are allocation/work proxies, not
elapsed timings or duplicated declaration objects.

| Originals | Dense prior entries copied | Dense arrays replaced | Distributed prior entries copied |
| --- | --- | --- | --- |
| 256 | 32,640 | 256 | 0 |
| 512 | 130,816 | 512 | 0 |
| 1,024 | 523,776 | 1,024 | 0 |
| 2,048 | 2,096,128 | 2,048 | 0 |
| 4,096 | 8,386,560 | 4,096 | 0 |

Doubling N approaches four times the copied-prefix work, matching N(N-1)/2. Every cell checks
exact original count, line order, pair count and inactive target-kind metadata. Distributed stores
have N pairs; dense stores have one. Node and resolver work differ, so this does not compare their
total cost or establish a native latency bottleneck. Input contains no origin facts; those are a
separate producer contract. No physical parser/source I/O or native startup is measured.
The current Markdown parser deduplicates identical raw URL spellings. Thus this normalized-contract
control does not prove N same-spelling URL declarations from one physical note. Native acceptance
uses distinct physical inline ontology occurrences, which retain multiplicity on the same pair.

## Narrow candidate and acceptance gate

Investigate append-in-place only for the canonical compiler's newly created, exclusively private,
standalone store. Normal public stores and fork/swap generations must keep existing copy-on-write
behavior. Creation must establish ownership explicitly; never infer it from the store type or
inactive metadata. Seal private append capability irreversibly before returning a compilation,
and revoke it before any fork or other operation can retain an earlier generation. Do not introduce
a general persistent-container framework or alter public iterators/retained generations.

The compiler already owns one private store until finalization. A focused creation/sealing contract
may therefore eliminate this prefix-copy term without a global index, new schema or extra payload
queue. Preserve all original IDs, multiplicity, inverse/Hidden/date semantics, ordering/suppression,
cooperative checkpoints and terminal compiler cancellation. A failed/rejected compilation must
retire its capability too. Guard activated indexes conservatively.

Before acceptance, compare all ten exact unsorted digests against this baseline, test sealing/fork
and retained public views, rerun canonical golden/core/patch tests, full build/verification and
exact native/foreground checks. Measure a native dense control without claiming a whole-engine
or startup gain. Stop at the design gate if ownership needs broad extraction or a changed public
store read contract. D remains a separate measured writer candidate with stored-receipt fencing;
its cache-only six-row median 61.1 to 32.2 ms is only part of the observed 859 ms owner pipeline.

All ten work cells pass on Node22.22.2; no runtime change requires a new full verification here.
Two initial fixture errors are retained: an origin was incorrectly assumed without supplying an
origin fact, and location fields were placed outside the actual provenance contract. The fixture
was corrected to the existing producer/compiler contracts; production and existing tests are unchanged.
[Raw work](indexing-evidence-append-baseline-2026-10-14/work.json),
[origin setup failure](indexing-evidence-append-baseline-2026-10-14/setup-origin-failed.txt) and
[location setup failure](indexing-evidence-append-baseline-2026-10-14/setup-location-failed.txt)
retain the evidence. Native timing, retained heap and physical-device acceptance are pending.
No manual Windows check is requested for this measurement-only checkpoint.
