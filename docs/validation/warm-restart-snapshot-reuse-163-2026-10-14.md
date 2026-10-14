# Fresh snapshot reuse during startup — PR #163

Implementation and acceptance in progress. Base: merged #153, `ae473fc`; integration commit: `3c10ce9`.
This work does not extend #153's URL optimization or change its accepted memory tradeoff.

## Finding and correction

A real partial-Eager file publication can supersede the private full-snapshot candidate after the
saved preview appears but before the first chunk arrives. The publication guard correctly rejects
the candidate. The outer coordinator previously treated that interruption as a reason to start
global persisted-source inventory and node-vocabulary recovery, even for unchanged cached facts.
The deterministic real-IndexedDB reproduction identifies `publication-superseded`, reader boundary
`open`, publisher `file-patch`, publication 1→2, and zero decoded records. Before correction it
performs one inventory and one global catalog build; no note reads or parses are needed for that detour.

The old candidate remains rejected. A trusted, physically current complete active schema-3 snapshot may get **one new
attempt**, after the existing P4 checkpoint, only if all intervening publications were accounted:
at most one actual body-free structural/host baseline plus file commits, at most 256 total.
Current semantic fingerprints for all committed file owners must match
the saved records before any replacement is published. Missing/mismatched proof, other publishers,
later interruptions, checkpoint generations and all existing invalidation guards retain their fallback. The structural
receipt belongs only to `initializeOnDemandBaseline`; an arbitrary snapshot publication cannot borrow it,
and a reentrant extra publication deliberately prevents accounting. The second attempt
captures its own publication fence; there is no retry loop or retained discarded full graph.

The storage reader now identifies its existing guard boundaries. One run-scoped, path-free first
failure survives candidate cancellation. Attempt count and actual completion route distinguish
saved preview, full snapshot, checkpoint and source-vocabulary recovery. Support projection admits
only finite enums and scalar counters; no paths, signatures, note data or exceptions are exported.
These diagnostics never decide admission or make readiness/source-authority flags true.

No schema, settings, compiler, evidence precedence, scheduler, watchdog-threshold, URL-priority or persistence
transaction changes. Retry admission does not advance the progress clock. On-demand remains local. Existing whole-graph publication and source
authority remain separate owners; partial graphs still cannot be saved as complete generations.

## Evidence and measurement limits

[Initial raw evidence and reproduction instructions](https://github.com/zsviczian/kplex/tree/3f698ada48cd5cbab0f9b1302644637b2130110e)
are archived separately from this PR: 36 entries, 2,143,914 ZIP bytes, SHA-256
`0d8e45a5c6d384786ab13c6db23cec778a5cc4f0021d6ed9dcb211e092585729`.
The downloaded archive's complete entry set, CRCs, byte counts and per-file checksums pass.
It retains initial failures/excluded fixture trials, full verification, comparative measurements,
source/build identities and actual artifacts. Configuration backups and note/cache payloads are
excluded. Native large-vault evidence is still in progress and is not part of this first archive.

The permitted passive personal-vault observation matches the supplied historical failure: 11,825
Markdown files, 110,358 published nodes, zero hydrated records and completion through node vocabulary.
Its retained timestamps span 1,185,897 ms (19m45.897s); source counters report zero vault reads/parses.
The window was unfocused, so this is **historical attribution, not a controlled before/after timing**.
The old build lacks a first-failure record: its precise historical invalidation trigger cannot be
retrospectively established from those counters alone. The reproduction proves the production
mechanism, not that every earlier slow run had the same trigger. No personal note content was
accessed and no personal vault/configuration/cache was changed or reloaded.

The existing disposable large fixture verifies byte-for-byte against
`scripts/testing/generate-high-node-vault.mjs`: 20,000 notes, 8,831,230 Markdown bytes, 80,000 distinct
placeholder targets, 8,000 URL targets and 259,000 source link occurrences. Input digest:
`50b8cb12ef83c3cd62f1605390fe6ff793079a9f6e37e471e59d0060cf287cd0`.
The genuine production full compiler and completed snapshot transaction produced 108,217 graph
nodes, 20,088 Markdown fingerprints and 197,561 declarations, including the 88 existing help notes.
Cold setup had no complete snapshot and hit the existing source-authority watchdog before the
ordinary coordinator completed that build/save. Its stale timeout keeps that setup session's status
incomplete even after source closure. Setup and its stopped observational controllers are excluded
from warm timing; no readiness flag, deadline or watchdog was changed to qualify the fixture.

A subsequent native application reload of the diagnostic baseline selects that complete fresh
snapshot, publishes its preview at 1,689.6 ms from renderer navigation, then rejects its full reader
at `checkpoint`: `publication-superseded`, publication 1→7, latest publisher `file-patch`, source
revision 0, policy revision 1 and zero decoded pages/relations/evidence. It selects source recovery
and proceeds through host-metadata comparison and cached-source reconciliation with zero source
reads/parses/repairs and zero URL-owner reads. This independently reproduces the mechanism in a real
application lifecycle. The selected visible hub has 19,999 incoming synthetic sources; this is a
high-fan-in scenario, not a representative timing for every vault or center.

The detailed baseline spends 313.8 s in host-metadata comparison and 692.2 s in cached-source
reconciliation. Source authority closes at 1,028.4 s from navigation. Its requested-semantics and
subsequent adoption phases take another 62.5 s and 62.9 s; a phase label alone does not prove the
catalog compiler ran. Hydration fails at 1,153.8 s. The normal coordinator then rebuilds/saves the
genuine full graph, but status remains incomplete with a later `decode-budget` diagnostic. The
observation ends at 1,384.9 s (23m04.9s), with all observed focus checks passing. This is a **failed
baseline**, not a successful startup timing or denominator for a speedup percentage. Raw samples
retain the failed restore and subsequent normal build/save. Matched candidate measurements remain
pending. Source/hydration phases overlap and must not be summed across lanes.

The first native candidate also rejects reuse: file-only accounting misses the genuine startup
structural baseline. Its raw early stop and exact checkpoint artifacts are preserved. A new real-IDB
regression reproduces that actual producer, alone and before unchanged/changed file commits; it is
red before the narrowly scoped structural receipt and green afterward, including unrelated and
reentrant publication controls. The corrected native profile now completes two attempts with
108,217 pages, 108,217 relation rows and 197,561 declarations. Exact navigation-clock milestones are
27.2424 s for complete cached navigation and 30.0268 s for snapshot completion. Later host observations
retain the existing conservative cached-presentation/rebuild path (one real cached full build).
Source authority and the detailed strict-ready milestone occur at 1,027.854 s; polling first observes
ready at 1,027.969 s and verifies idle readiness at 1,030.171 s. All 20,088 bodies are reused, with
zero source/URL reads, parses or repairs and all observed foreground checks passing. No
host-observation fence was relaxed to turn that later work green. The long source-validation tail
remains; this result does not claim a fast fully ready startup.

Unforced sampled renderer heap peaks at 805,255,716 bytes in the failed baseline and 2,350,183,696
bytes during the corrected profile's later rebuild; final samples are 413,573,096 and 442,582,068
bytes. These different completion/coverage paths and unforced samples do not establish retained
overhead or a true peak. Normal production repeats remain pending, and physical mobile memory
acceptance is required; #153's accepted retained-memory tradeoff is not reused as a claim here.

## Reproduction and validation

- `node scripts/testing/warm-restart-coordinator.mjs --baseline-ref=ae473fc` and the same command
  without the baseline option compare actual guard-owner sources with a genuine compiler snapshot
  and ordinary unchanged file patch. Add `--structural-baseline` to include the genuine startup
  baseline producer. Setup is outside timing; this is a work-count test, not startup.
- `node --test --test-concurrency=1 tests/hydration-guards-indexeddb.test.mjs tests/support-report.test.mjs tests/foreground-startup-indexeddb.test.mjs`:
  The expanded focused lane also includes `tests/saved-preview-url-indexeddb.test.mjs`: 115 tests
  pass, covering changed same-stat facts, missing proof, mixed publishers, retry invalidation,
  corrupt-active/checkpoint separation, canonical identity, real held URL work and watchdog progress.
  Old rejection assertions remain.
- Full `npm run verify:obsidian`, Node 22.22.2, passes for the structural correction against `kplex-test-small`:
  architecture 7 / core 128 / general-indexing 825 / UI 63 / portable sources 334 / real-browser
  sources 517; no failures or skips. Official lint, installed types, actual production build,
  exact-artifact staging and native smoke pass. Six `foreground.mjs` cases pass with configuration
  restored. The new driver's small-vault application reload also passes in on-demand mode.
- Three structural-plus-file baseline/coordinator trials: 490.3 / 412.5 / 398.0 ms, each one recovery
  admission and one global catalog; zero full-snapshot hydration. Three candidate trials: 361.9 / 318.9 / 309.8 ms,
  each zero recovery inventories/catalogs, 514 full pages and 513 declarations, matching the saved
  canonical adjacency/provenance oracle. Both use zero note reads/parses. The median reduction is
  22.7% in this deliberately held 512-target fixture, **not a whole-startup speedup**. Earlier trial
  sets remain in the raw archives. Verified production main SHA-256:
  `e5994ecce833d5e3e17ad3615fec740ffa45aa3e87066e0c58b7f8d501440a0b`.
- `scripts/testing/obsidian/warmRestart.mjs` requires the three explicit disposable-vault variables,
  an external `KPLEX_HOST_REPORT_DIR` and unique receipt labels. It refuses personal vaults. Its
  `stage`, `prepare`, `wait`, `save`, `run`, `observe` and `restore-config` actions retain artifact identities,
  configuration backups and aggregate samples. `prepare` uses the real full compiler and complete
  snapshot transaction. `run` uses the host's `app:reload` command and verifies changed renderer
  time origin; it is a vault-window application reload, with Electron process retained.

Native timing, archived raw receipts/checksums, final verification and remaining platform acceptance
will be recorded here before closeout. Renderer-task gaps start at the first observation and are
not paint measurements. Heap samples are neither forced-GC retained memory nor a proven peak.

## Deferred opportunities

Later or larger publication waves, changed/missing semantic proof and genuine structural changes
still use the existing conservative recovery. No general source-inventory/catalog throughput or
persistence batching work is included. Any broader optimization needs its own measured proposal;
C14 remains accepted and C15–C26 remain paused.
