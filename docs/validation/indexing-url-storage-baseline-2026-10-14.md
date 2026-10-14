# URL adjacency container storage baseline

This measurement-only checkpoint follows pushed B4 `ba83041`. Production source and all three
installed artifacts are unchanged. The next candidate is to reuse UrlAdjacencyMap's inherited
native Map backing instead of retaining a separate private delta Map. This report accepts no
implementation or predicted byte saving. C14 remains accepted; C15-C26 remain paused.

## Actual native representation

The existing large-vault replay restores actual cached facts for20,088Markdown owners in an owned
namespace, retaining the production scheduler and display cadence. After its API completes, the
probe counts each live URL wrapper and captured base once using exact object identity. Intrinsic
Map size observes native backing separately from the wrapper's logical size. It saves counts,
not entries, filenames or heap snapshots.

| Actual live isolated graph | Count |
| --- | ---: |
| Total working pages | 16,069 |
| URL pages | 8,040 |
| Non-URL owner pages | 8,029 |
| Unique URL wrappers including captured bases | 8,042 |
| Separate private delta Maps | 8,042 |
| Entries in inherited native wrapper backing | 0 |
| Entries in separate local Maps | 24,137 |
| Maximum private depth | 2 |

Of the URL pages,8have one neighbor,8,017have two,12have three through eight,2have nine through256,
and1has more than256. The same ordered source/graph/evidence digests as B4 pass, with0body reads or
parses. Total graph pages include both URL and Markdown owner pages;16,069is not a URL-only count.

## Component heap control

The exact installed wrapper constructor and native Map control each retain16,384containers with
identical numeric entries, separately, outside replay timing. Three rounds alternate native/wrapper
order. Each sample collects before and after allocation through actual renderer CDP, then drops
the owned array and verifies its WeakRef collection before the next sample. Commands retain the
existing20-second diagnostic deadline and independently detach the debugger. The real graph stays
live in the background throughout. No remote source, heap snapshot or production diagnostic is added.

| Entries per container | Native median bytes | Wrapper median bytes | Difference |
| --- | ---: | ---: | ---: |
| 0 | 1,581,104 | 3,811,600 | 2,230,496 |
| 1 | 1,566,948 | 3,742,728 | 2,175,780 |
| 2 | 1,578,468 | 3,742,892 | 2,164,424 |
| 8 | 2,483,044 | 4,659,192 | 2,176,148 |

These differences include every wrapper field, second Map and native representation detail. They
are not an exact saving for removing the second Map, nor a whole-plugin/process-peak estimate.
One one-entry native sample is-21,740bytes; it remains in the raw three-sample set. Unrelated
renderer heap can retire between collection boundaries, so individual deltas need not be positive.
The structural count of8,042extra Maps is independent of that noisy byte observation. A candidate
must establish its own matched component and complete-graph heap results rather than subtracting
this entire composite overhead as an expected gain.

## Validation and next checkpoint

The native replay, all24component samples/root-array collections, exact artifact staging/render,
configuration guards and outer workspace/window cleanup pass. The independent final audit verifies
the complete20kfixture bytes, settings/enabled bytes, both installed B4 artifacts, throttling and no
owned controller/debugger. Node syntax, JSON, local-link and whitespace checks apply. The unchanged
runtime reuses B4's [full verification and foreground receipt](indexing-url-search-publication-2026-10-14.md);
no additional full-suite run is claimed for this measurement tool.

Raw [native receipt](indexing-url-storage-baseline-2026-10-14/native-storage.json),
[complete sample analysis](indexing-url-storage-baseline-2026-10-14/analysis.json), stage/configuration
guards, final audit and source/artifact ledger are in the sibling raw directory.

The narrow proposal is to keep the same wrapper and ownership protocol while using native
superclass get/has/set/delete/clear/size/entries for the private local layer. Child adoption needs a
private local-entry accessor; logical reads must still apply immutable bases, shadows and ordering.
Preserve exact stale/frozen/consumed/iterator behavior, privacy checks,1,024-key replay admission,
eight-depth compaction and retained published maps. Ordinary document and displayed maps remain
native. Existing oracle/privacy/cancellation/work tests and matched native heap/flush/foreground
acceptance must pass before committing a runtime replacement. No scheduler/schema/source-authority
change is justified by this gate.

No additional manual Windows check is requested for measurement tooling. This is Windows desktop
evidence; macOS, physical mobile, actual paint, process peak and long-session acceptance remain
separate.

## Reproduction

Use Node22.22.2, the three explicit authorized large-vault variables and a fresh report directory.
Stage the accepted build by all three artifact hashes, preserve configuration, establish actual
foreground and settled primary work, then run:

```sh
node --check scripts/testing/obsidian/largeUrlStorage.mjs
node scripts/testing/obsidian/largeUrlStorage.mjs
git diff --check
```

The current B4 artifacts were separately preserved and verified against its full receipt before
this probe. They are the baseline for a future exclusive storage change, rather than E3 or older A.
