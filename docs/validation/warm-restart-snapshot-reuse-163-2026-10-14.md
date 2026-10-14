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

The old candidate remains rejected. A trusted, physically current schema-3 snapshot may get **one new
attempt**, after the existing P4 checkpoint, only if all intervening publications were accounted
file commits and there were at most 256. Current semantic fingerprints for those owners must match
the saved records before any replacement is published. Missing/mismatched proof, other publishers,
later interruptions and all existing invalidation guards retain their fallback. The second attempt
captures its own publication fence; there is no retry loop or retained discarded full graph.

The storage reader now identifies its existing guard boundaries. One run-scoped, path-free first
failure survives candidate cancellation. Attempt count and actual completion route distinguish
saved preview, full snapshot, checkpoint and source-vocabulary recovery. Support projection admits
only finite enums and scalar counters; no paths, signatures, note data or exceptions are exported.
These diagnostics never decide admission or make readiness/source-authority flags true.

No schema, settings, compiler, evidence precedence, scheduler, watchdog, URL-priority or persistence
transaction behavior changes. On-demand remains local. Existing whole-graph publication and source
authority remain separate owners; partial graphs still cannot be saved as complete generations.

## Evidence and measurement limits

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
Published graph/evidence counts and native startup samples are pending; these input counts are not
substitutes for a complete saved graph.

## Reproduction and validation

- `node scripts/testing/warm-restart-coordinator.mjs --baseline-ref=ae473fc` and the same command
  without the baseline option compare actual guard-owner sources with a genuine compiler snapshot
  and ordinary unchanged file patch. Setup is outside timing; this is a work-count test, not startup.
- `node --test --test-concurrency=1 tests/hydration-guards-indexeddb.test.mjs tests/support-report.test.mjs tests/foreground-startup-indexeddb.test.mjs`:
  76 focused tests passed before native acceptance. Old rejection assertions remain; added cases
  cover changed same-stat facts, missing proof, mixed publishers, retry invalidation and privacy.
- Full `npm run verify:obsidian`, Node 22.22.2, passes against `kplex-test-small`:
  architecture 7 / core 128 / general-indexing 825 / UI 63 / portable sources 334 / real-browser
  sources 509; no failures or skips. Official lint, installed types, actual production build,
  exact-artifact staging and native smoke pass. Six `foreground.mjs` cases pass with configuration
  restored. The new driver's small-vault application reload also passes in on-demand mode.
- Three baseline/coordinator trials: 514.3 / 430.5 / 394.4 ms, each one recovery inventory and one
  global catalog; zero full-snapshot hydration. Three candidate trials: 317.5 / 305.4 / 291.4 ms,
  each zero recovery inventories/catalogs, 514 full pages and 513 declarations, matching the saved
  canonical adjacency/provenance oracle. Both use zero note reads/parses. The median reduction is
  29.1% in this deliberately held 512-target fixture, **not a whole-startup speedup**.
- `scripts/testing/obsidian/warmRestart.mjs` requires the three explicit disposable-vault variables,
  an external `KPLEX_HOST_REPORT_DIR` and unique receipt labels. It refuses personal vaults. Its
  `stage`, `prepare`, `run`, `observe` and `restore-config` actions retain artifact identities,
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
