# Background indexing resource efficiency — PR #165

Measurement is in progress; no production optimization or resource improvement is claimed yet.
Merged #163 baseline: `8df393a`; integration checkpoint: `a86b4a0`. The shipping baseline main is
SHA-256 `e5994ecce833d5e3e17ad3615fec740ffa45aa3e87066e0c58b7f8d501440a0b`.
#153/#163 behavior and architecture remain; C14 is accepted and C15–C26 remain paused.

## Initial work counts

`scripts/testing/source-validation-work.mjs --baseline-ref=8df393a` runs genuine acquisition,
dependency closure, a new storage connection/acquisition lifetime, and the production restart
inventory in real Chromium/IndexedDB. Setup is outside measurement. The second case delivers
an ordinary `resolved` event to the existing source owner; it does not disable validation.

| Markdown owners | Clean restart transactions | Unchanged resolver-wave transactions |
| --- | ---: | ---: |
| 32 | 233 | 682 |
| 64 | 457 | 1,354 |
| 128 | 905 | 2,698 |

All cases reach genuine source authority with zero native body reads, parses or source repairs.
At 128 owners the resolver-wave case calls `inspect` 384 times, pins 768 times, checks local
dependencies 256 times and delivers metadata/resolution families 256 times each. It invokes the
digest owner 2,816 times versus 512 without the wave. These are operation counts, not CPU or
battery measurements. They identify repeated family proof as a candidate for a bounded correction;
the offline metadata/dependency-upgrade barrier remains necessary.
[Compact samples and source/tool identities](background-index-efficiency-165-samples.json) retain
the validated counts; full raw groups are preserved separately.

## Measurement contract

The existing `warmRestart.mjs` now supports a prespecified resource acceptance window. First
readiness, real source/cache/task drain and quiescence are separate milestones. The quiet window
is **610 seconds**, covering two 300-second snapshot-maintenance periods plus ten seconds, as
well as the 30-second source poll. No deadline, pacing, concurrency or throttling is changed.
An unexplained inventory, full build, node-catalog replay or complete save during that window
fails acceptance. Ordinary bounded maintenance is counted and must drain by completion.

`buildStartupProfile.mjs` builds test-only variants in memory from exact committed sources;
shipping source and `dist` remain unchanged. Profiles refuse any vault other than `kplex-test`
and `kplex-test-small`. The resource observer forwards original receivers, native requests and
promises, restores its own methods and is retired on unload/driver cleanup. Bounded aggregate
groups retain no owner paths or payloads. Counts mode disables detailed startup timing and skips
family/digest/byte observers; matched low-instrumentation comparisons remain required.

Native CPU uses [`process.cpuUsage()`](https://nodejs.org/api/process.html#processcpuusagepreviousvalue)
user/system deltas in microseconds for the selected renderer process. This includes host and
observer activity and is not plugin-exclusive CPU or energy. Detailed IDB accounting counts
transactions by store/mode, requests and JSON payload byte estimates, including lease/journal
bookkeeping; these estimates are not physical disk/WAL bytes. Family deliveries, decode and
pending-work high-water marks are separate counters. Sampled heap/RSS are unforced observations,
not retained memory or proven peaks. Controlled retained-heap checks remain a separate lane.

The small-vault pilot restores full saved hydration and passes a 610.8-second quiet-window/drain
and cleanup check. The finalized observer separately passes a native reload with one inventory,
zero full builds/catalogs/snapshot writes and no pending resources. A once-per-request host-wrapper
placement error was caught in observer setup; that version's inflated observations are explicitly
excluded and preserved. Global-scope factory execution, once-only wrapping and exact method
restoration now pass in all six real-IDB cases. These are functional observer checks, not a
baseline/candidate performance result. Large-vault observations, counterbalanced comparisons,
offline delta/corruption checks and resource tradeoffs remain pending.

The registered real-IDB observer regression passes exact request/promise/receiver forwarding,
once-only wrapping, aggregate-only exports, decode release and cleanup; 16 existing host-runner
contracts also pass. Test-only JavaScript syntax and diff whitespace checks pass. The unchanged
shipping runtime retains #163's full/native verification; runtime changes will require fresh checks.

## Evidence and acceptance

Raw successful/failed/setup receipts, exact profile artifacts and source identities are preserved
outside the PR tree pending final evidence packaging. Reusable benchmark/profile drivers live in
the repository. No evidence has been discarded. No personal-vault access is performed or authorized.

Remaining platform acceptance will be reported explicitly: lower-powered desktop/full-process
restart, physical iOS/Android startup/navigation/suspend-resume with memory headroom, and the other
desktop OS's changed-source/interrupted-validation workflows. Keep PR #165 draft; no merge/release.
