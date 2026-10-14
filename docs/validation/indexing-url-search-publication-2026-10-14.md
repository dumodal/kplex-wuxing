# Reuse published URL vocabulary during display flushes

B4 follows the committed/pushed [native heap/flush gate](indexing-native-url-memory-2026-10-14.md)
at `99f12f3`. That gate identified general search maintenance as a large synchronous flush region.
This change stays within GraphIndex; scheduling, display cadence, source authority, semantics,
cache formats and release versions are unchanged. C14 remains accepted; C15-C26 remain paused.

## Change and lifetime review

URL publication first updates its URL search catalog, then updates general search. Both effective
search merges already discard general entries whose keys are supplied by the URL catalog. The old
general update nevertheless resolved each URL again through `get()`, materializing current-support
evidence arrays and constructing another normalized search entry.

Only URL flushes opt into the private catalog-aware update after publishing that catalog in the
same synchronous boundary. New covered URLs need no general entry. Existing canonical URL fallbacks
retain their canonical page identity and receive the catalog's already-normalized vocabulary.
Existing noncanonical general entries rebind directly to the current catalog page, releasing the
obsolete displayed page while preserving entry identity. This covered-row update never scans the
general catalog. Uncovered retirements, canonical non-URL collisions and ordinary/default callers
retain the existing lookup/update path and cache invalidation.

Public search still performs its normal requested eligibility/current-owner checks. In particular,
an unnotified metadata replacement can leave a vocabulary row present while public results reject
the unsupported URL. Catalog reuse grants no source/edit authority. URL-catalog removal, retirement,
reinsert, canonical fallback and raw-cache callers were inventoried before changing behavior.

Initial skip-only code passed eight regressions and a preliminary full native-verification receipt.
Review then found that an ordinary caller can create a noncanonical general URL row; skipping its
next refresh would retain its old displayed page. Two new mode regressions failed that initial
code. A remove-based correction passed those tests and a second full verification, but review found
that removing even one duplicate used the existing general-array filter. Two stronger bounded-work
regressions failed that intermediate version and pass the final direct rebinding. Canonical fallback
coverage was strengthened to preserve current vocabulary as well as identity and ordinary refresh.
Preliminary artifacts/results remain
separate from final acceptance. The preliminary PowerShell wrapper classified npm notices on
stderr as `NativeCommandError` and returned1 despite a passed verification JSON; final execution
captures the actual Node exit explicitly.

## Deterministic work gate

`scripts/testing/url-search-publication-work.mjs` compiles actual GraphIndex/compiler/evidence with
the existing finite native-input fixture. An optional exact Git GraphIndex override selects
`99f12f3`; the checkout is never rewritten. N=256/512/1024/2048/4096 owners each add one distinct
child URL under one origin. One final explicit display boundary is observed after preparation.
Fixed CPU/virtual timers make these work counts, not elapsed or representative cadence results.
Scoped wrappers preserve receivers/results/descriptors and retire with the owned timer fixture.

| N=4,096 final flush | Baseline | Candidate |
| --- | ---: | ---: |
| General `get()` calls | 8,193 | 4,096 |
| Covered URL `get()` calls | 4,097 | 0 |
| Materialized evidence pair rows | 16,386 | 4,096 |
| Duplicate general URL entries | 4,097 | 0 |
| Source body reads/parses | 0/0 | 0/0 |

All five complete ordered graph/evidence/public-search digests match, including IDs, labels,
aliases, relation flags, result order and both search scopes. The largest digest is
`2a844e7fd3c4b6b5a2126bc9577811b01cb4f8506371a27e008bd95e2b1505c2`.
This removes redundant display work; it does not claim the whole engine becomes linear.

Ten regressions exercise both on-demand and Eager publication: covered lookup work, retained body
owner vocabulary, alias/prefix-cache updates, graph visibility versus Vault search, physical
fallback, replacement/delete/reinsert, unnotified metadata rejection, bounded noncanonical rebinding,
canonical identity/current fallback vocabulary and unchanged ordinary/default refresh.

## Validation

The final production source was frozen before acceptance. Ten focused tests and all five exact
baseline work/digest cells pass. Final full verification exits0 with architecture7/core128/normal822/
UI63/portable sources334/browser495/lint/production build/exact native smoke passing, including the
20,015-owner case with8,187,369owner checks and zero source I/O. All six exact-build foreground
cases pass with cleanup and configuration restoration. All twelve matched native E3-versus-B4
retained/unforced replays and their exact-build stages pass. Each replay preserves physical/seed/
ordered working/display graph and evidence digests with zero body reads/parses. All ten tracked
roots collect after each disposal. Final native audit verifies the complete20,000-note fixture,
both installed candidate builds, configuration bytes, workspace/window restoration, background
throttling, and absence of owned controllers or attached debugger.

Final source SHA256 `31a9d5fe615a7febf6b514d7c1233d956aa112305341d666944c0a0474fdaa37`;
main `7d7e1433cfc4bd1391cb3a63e1defcafb11ca70bb3fb52d657873b18d242294b`.
Manifest0.1.3 and styles retain their preceding hashes. The raw directory contains the final
[full receipt](indexing-url-search-publication-2026-10-14/host-verification.json) and
[foreground receipt](indexing-url-search-publication-2026-10-14/foreground.json).

The E3 baseline's three accepted artifacts were copied before the first production build and
verified against its [full receipt](indexing-private-compiler-append-2026-10-14/host-verification.json).
Native comparisons must use that `99f12f3` runtime, rather than the older A baseline used for the
previous accumulated-performance measurements. Windows evidence does not replace macOS, physical
Android/iOS, whole application startup, actual paint, process peak or long-session acceptance.

## Matched native results

The unchanged preceding diagnostic driver replays actual cached facts for20,088Markdown owners in
an isolated namespace on the existing large vault. The same production five-second display cadence,
read/pacing policy and deadlines apply. Three baseline/candidate pairs run serially in each mode.
Retained mode collects outside the measured API and compares live-minus-empty renderer JS bytes;
unforced mode omits pre-replay collection and makes no retained-heap claim. These diagnostic timings
are separate from the preceding low-instrumentation overall replay measurements.

| Condition / pair | Baseline | Candidate |
| --- | ---: | ---: |
| Retained bytes1 | 39,512,032 | 38,058,272 |
| Retained bytes2 | 39,433,676 | 37,911,812 |
| Retained bytes3 | 39,081,148 | 36,374,000 |
| Retained-mode largest flush1/2/3, ms | 49.6 /43.6 /57.7 | 29.6 /38.7 /31.5 |
| Unforced largest flush1/2/3, ms | 58.8 /49.7 /48.1 | 35.4 /39.8 /35.3 |
| Unforced largest heartbeat gap1/2/3, ms | 59.0 /65.2 /51.4 | 43.9 /48.0 /40.3 |

Median retained bytes39,433,676→37,911,812:1,521,864fewer bytes, approximately3.9% of this isolated
URL slice. Median largest unforced flush49.7→35.4ms (approximately29% lower); general-search
maintenance within those largest flushes has median33.1→18.2ms. Median largest unforced heartbeat
gap59.0→43.9ms is an observed event-loop result, not actual paint or an interaction percentile.
All three paired results improve for each listed metric, but this small controlled fixture does
not establish a universal speedup, process peak, or recovery of the entire earlier accumulated
heap overhead. No new overall-startup or low-instrumentation replay gain is claimed.

The candidate's second unforced worst gap48ms overlaps46.45ms of observed GC and no flush. Its other
worst gaps overlap35.4/35.3ms flushes; GC overlap is0/1.815ms. GC scopes and flush intervals may nest
or overlap; interval unions are never added as exclusive CPU. Complete per-flush records, bounded
GC intervals, driver-definition hashes and independent cleanup checks are retained in
[matched analysis](indexing-url-search-publication-2026-10-14/matched-analysis.json), with the raw
receipts, source/artifact ledger and final physical/native audit in the same directory.

No additional manual Windows check is requested: the available public-search, foreground, source
lifetime and native scale checks have been automated. Before release, macOS and physical Android/iOS
still need their existing platform acceptance; a URL alias edit/delete should update search and
remove stale results without changing relationship semantics. This checkpoint introduces no touch
or popout behavior change and provides no new platform claim.

## Reproduction

Use Node22.22.2 and actual dependencies:

```sh
node scripts/testing/url-search-publication-work.mjs --baseline-ref=99f12f3
node scripts/testing/url-search-publication-work.mjs
node --test --test-concurrency=1 tests/url-search-publication.test.mjs
npm run verify:obsidian
```

Native verification requires the three explicit small-vault variables and a fresh report directory.
Matched scale work uses the preserved large vault, exact artifact/full-receipt staging, foreground
and cleanup conventions from the preceding reports. No additional manual Windows check is requested
while these available automated checks remain in progress.
