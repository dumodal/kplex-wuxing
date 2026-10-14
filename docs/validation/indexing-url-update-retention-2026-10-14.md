# Native URL replacement and retirement retention exercise

This validation-only checkpoint follows pushed aggregate gate `b6f4202`. Production source and
the accepted B5 `cacefe5` artifacts remain unchanged. It checks repeated real-source replacement,
retirement/reinsert, displayed-target isolation and teardown using the shared small-vault fixture.
The aggregate [heap/flush tradeoff](indexing-native-url-aggregate-2026-10-14.md) still awaits the
maintainer's acceptance decision; this exercise does not remove that cost.

## Fixture and production path

One test-owned Markdown note alternates two fixed sets of512distinct child URLs under a reserved
example origin. A real frontmatter counter lets the driver wait for the exact current native
metadata revision. Each of64edits uses Vault.modify and the installed refreshUrlOwner path, including
actual native reads/parser, file/metadata/event fences, compiler, cache persistence and foreground
publication. No fake parsed body, source-authority override or changed runtime deadline is used.

Foreground refresh publishes immediately under existing production policy; the driver adds no
manual flush. The primary index also observes the actual file events and settles before sampling.
The existing nativeUrlFixture owns the note, private cache namespace and captured window geometry.
Its small-vault bound remains unchanged. The new experiment's15-minute outer bound is selected before
its first run; existing60-second settle and20-second diagnostic command bounds remain strict.

Each revision checks exact active/retired endpoint support and public search vocabulary,514live
pages,1,024current declarations, canonical working relation targets and displayed targets that never
expose a working adjacency Map. Published-target count equals the current page count. The origin's
private history stays within the existing eight-layer bound.

## Results

A two-revision setup run and initial64-revision run passed. Review then added an explicit initial
metadata stamp and post-disposal collection of every observed displayed origin Map. The final,
unchanged64-revision run passes the stronger contract; all earlier successful receipts and the
preliminary driver source remain separately archived. No failed sample was hidden or deadline
weakened, and no production correction was needed.

- Exactly64isolated body reads and64parser calls for64actual replacements.
- Every sampled epoch:514pages,1,024declarations,514published targets, origin depth0and512retained
  origin entries. All64revisions pass the current/retired search and target-isolation checks.
- Sixty-five distinct displayed origin Maps are observed weakly. After each collection epoch,
  exactly the current Map remains; after fixture disposal, all65and the private index collect.
- The native note and original primary URL-owner/cache row retire after deletion. The independent
  read-only audit finds no owned row, no debugger, no pending primary URL work, and88Markdown/
  106total files restored. Configuration-byte guards pass. The shared fixture restores its captured
  geometry; no serialized before/after workspace comparison was captured or claimed.

Post-GC renderer JS observations (bytes):

| Revision | Renderer JS | Live displayed origin Maps |
| --- | ---: | ---: |
| 0 | 574,401,020 | 1 |
| 8 | 575,956,600 | 1 |
| 16 | 575,989,096 | 1 |
| 24 | 576,048,004 | 1 |
| 32 | 576,063,824 | 1 |
| 40 | 576,098,868 | 1 |
| 48 | 576,116,340 | 1 |
| 56 | 576,132,340 | 1 |
| 64 | 576,190,132 | 1 |
| After disposal | 575,188,184 | 0 |

Whole renderer heap increases1,789,112bytes from initial to revision64and233,532bytes from the
prespecified first eight-revision sample to64. Disposal remains787,164bytes above the initial
renderer sample. These include Obsidian, primary index, caches, diagnostic state and code warmup;
they are not an isolated private-index leak/saving, process peak or a flat whole-plugin heap claim.
The exact graph bounds and weak ownership checks establish the narrower retention result.
Sixty-four revisions are not hours-long or physical-mobile acceptance.

## Identities and validation

Final diagnostic source SHA256
`acb2470205dda0be2910d988721cd0c4b0b5ec55c7b54724c089ab5d114321a6`.
Independent analysis checks actual function/definition hashes for setup, preliminary and final
drivers, all sample/operation bounds, configuration cleanup, unchanged runtime source and exact
installed artifacts in both vaults. Final main remains
`0e0d599107d4efbd565a215f8544716831fd044a830317d362ac3f14a67dc9f4`, with unchanged0.1.3manifest/styles.

The [raw directory](indexing-url-update-retention-2026-10-14/) retains setup/preliminary/final native
receipts, the preliminary source, independent cleanup audit, sample analysis and source/artifact
ledger. Actual source/graph behavior uses the exact accepted
[B5 full and foreground verification](indexing-url-adjacency-storage-2026-10-14.md); no new full-suite
execution is claimed for validation tooling. Node syntax, JSON, local links and whitespace checks
pass. C14 remains accepted; C15-C26 remain paused. No extra manual Windows assertion check is needed;
macOS/physical-mobile, whole startup, process peak and longer sessions remain separately pending.

## Reproduction

Use Node22.22.2, the three explicit authorized small-vault variables and a fresh report directory.
The exact current plugin build must already be installed and the primary must be settled.

```sh
node --check scripts/testing/obsidian/urlUpdateRetention.mjs
node scripts/testing/obsidian/urlUpdateRetention.mjs
git diff --check
```

The default is64revisions. `KPLEX_URL_RETENTION_CYCLES=2` selects the explicit setup check. Run
serially in the actual foreground and leave production background throttling enabled. The probe
owns only its reserved note/private namespace and does not create or reset a vault.
