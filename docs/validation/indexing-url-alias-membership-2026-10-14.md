# Compiler URL alias membership checkpoint (PR #153 B3)

## Scope

Baseline is committed B1 `186406e`. The Windows update interrupted the first measurement before
any production B3 edit. The maintainer renewed unsupervised work without a hard deadline on
2026-10-14, and explicitly authorized a push after each checkpoint commit. A and B1 are confirmed
on origin. This checkpoint keeps compiler-local URL alias membership; aggregate GraphIndex alias
output copying, B2 adjacency ownership and other PR packages remain separate.

The compiler previously searched the growing alias array for each primary label and constructed
a new Set from that array for every nonempty optional vocabulary. B3 preserves the ordered output
array and uses one private Set after two distinct aliases. Empty/single-label targets retain the
allocation-free comparison. Dense metadata alias seeds cooperate every 128 entries before the first
body append; ordinary growth seeds two entries. The largest synchronous seed is 128 entries.
Interleaved semantic aliases retain genuine duplicates and update an existing membership Set.
Node object identity keys the temporary map so synthetic opaque-ID relocation cannot mix vocabularies.
Finish (both graph/node projections) and terminal rejection release all membership entries.

No settings, schema, relationship policy, evidence IDs, source acquisition, scheduler, dependencies,
watchdogs or UI are changed. The semantic compiler remains the sole owner of URL vocabulary rules.

## Deterministic work comparison

`node scripts/testing/url-alias-membership-work.mjs --baseline-ref=186406e` and the candidate
compile the actual exact sources into the same finite host fixture. Bounded batches contain distinct
materialized owners pointing at one canonical URL, with first-seen labels, repeated aliases and raw
URL exclusions. All setup, full ordered graph/evidence digests and assertions are outside observation.
The injected clock is fixed; no portable elapsed-time claim is made.

At **4,096 owners with optional vocabularies**, baseline native `includes` visited **8,390,655**
array entries and membership construction enumerated **8,394,751** entries. Candidate `includes`
visits are **zero** and membership seeding enumerates **two** entries. Set lookups and constant-size
empty/single-label comparisons still perform work. Both results have **4,097 aliases**, **4,096
declarations**, zero body reads/parses and the same unsorted graph/evidence digest. The five-size
256/512/1,024/2,048/4,096 matrix also includes distinct labels without optional vocabularies and the
repeated-single-label control; raw receipts retain every count and digest.

The test-only probe forwards the actual target alias array through a Proxy. It counts numeric reads
made by native includes and iterator entries used by membership seeding. It changes no global
Map/Set/Array implementation and restores exact original array identities before oracle reads.
This removes the measured compiler-local quadratic membership work. It does not make aggregate
owner publication or adjacency materialization globally linear.

## Native observations

The bounded `scripts/testing/obsidian/urlAliasMembership.mjs` bundles exact baseline and checkout
core compilers into an owned controller in native Electron. They are independent test engines,
not replacements for the installed plugin. It feeds the same prepared 4,096-owner records through
actual accept/close/resolve methods, alternates B/C/C/B/B/C, and checks ordered output digests and
foreground/focus/throttling. Parsing, fixture setup, bundle loading and digests are outside timing.
Compute segments between host-task yields are reported separately from inclusive duration and paint.

Final frozen-source observations:

| Fixture (4,096 owners) | Baseline, three trials (ms) | Candidate, three trials (ms) | Medians (ms) |
| --- | --- | --- | --- |
| Distinct labels + optional vocabulary | 266.6 / 255.8 / 252.3 | 36.1 / 36.6 / 29.9 | **255.8 → 36.1** |
| Repeated single label | 31.7 / 18.3 / 24.3 | 26.9 / 17.7 / 24.9 | **24.3 → 24.9** |

The repeated-label control shows no established gain or meaningful regression within this observed
variation. It still builds no membership Set. Largest measured compute segment for distinct labels
was **14.7 ms baseline / 12.4 ms candidate**; repeated-label segments reached **19.1 ms**. These
are compiler observations, not whole-vault startup timings, paint or retained-heap measurements.
All six distinct-label digests match
`19a72577f33882862a1d42fc422e5b4b5f2e90f7d6bd90de0801f7c7755f8e71`;
the repeated control also matches across all six trials. Digests retain every node scalar/facet,
ordered relation/target and declaration including IDs.

The same scenario separately uses the actual installed GraphIndex publisher and native parser/Vault
through the B1-owned fixture. Its hot publication must add both parsed labels with zero additional
reads/parses. This functional check is distinct from the bundled core timing comparison. Cleanup
destroys its index, purges only its isolated database, deletes its one owned note/controller,
restores window geometry and compares exact settings/enabled-list bytes.

## Validation status

Focused compiler/source-patch suite: **42 pass**, including eight new tests for five-size work,
metadata duplicate/case/order semantics, cancellation within dense initial seeding, both terminal
projections and rejection cleanup. Existing golden, occurrence/provenance and source-patch cases pass.
The suites remain in normal npm test. Full `verify:obsidian` passed on Node **22.22.2**, including
all architecture/core/lint/test lanes, **464 real-browser source tests**, the 20,015-owner fixture
and the real production build. Final focused rerun: **42 pass**. Final native paired engine and
installed publisher passed; all six foreground interaction cases passed with **zero broad flushes**,
zero remaining owned resources and restored configuration. No production diagnostics were added.

Candidate main.js SHA-256:
`d421681740293b6863bbcdc9d5ad2f5ceebc9469ad5d7877ff9cc60f241318d2`.
Compiler SHA-256:
`233734223e03bcdd7fa24d380eeee4cff9e40332754e25e02f4736f04d8f74a2`.
All staged artifact hashes match; [raw receipts](indexing-url-alias-membership-2026-10-14/)
retain source/runtime identities and cleanup. The first final native driver attempt had a test-only
crypto-variable scope error after extending the control loop. Cleanup passed; correcting the driver
and repeating against unchanged production source passed. Its failure receipt is retained separately.

Highest-probability failure: stale membership after interleaved metadata aliases; the new test preserves
duplicates and verifies that a later body label cannot add another copy. No additional manual Windows
check is requested. macOS/physical mobile and full M heap/heartbeat/native-scale acceptance remain
pending; desktop native timings do not establish those results.
