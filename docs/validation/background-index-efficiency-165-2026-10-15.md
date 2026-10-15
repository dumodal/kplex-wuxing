# Background indexing resource efficiency — PR #165

The first correction halves repeated resolution-family authentication during unchanged resolver
waves. Three counterbalanced real-IDB pairs reproduce the work reduction; native candidate resource
acceptance and graph-retention work remain pending. This is not yet a merge recommendation.
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

## First production correction

An already authenticated body selection can defer resolution authentication to the existing
exact-head canonical comparison. It still validates metadata, checks the identical selected
sequence/revision, and performs the normal stored-resolution integrity checks and fresh resolver/
Date comparison. Changed selections validate all families. A concurrent foreground proof cannot
turn the partial inspection into a host-current shortcut. Optional URL-alias maintenance retains
its complete primary-family proof. No cache format, authority, scheduling or retention bound changes.

| Owners | Resolver-wave transactions, baseline → candidate | Resolution-family visits | Digest calls |
| --- | ---: | ---: | ---: |
| 32 | 682 → 650 | 64 → 32 | 704 → 608 |
| 64 | 1,354 → 1,290 | 128 → 64 | 1,408 → 1,216 |
| 128 | 2,698 → 2,570 | 256 → 128 | 2,816 → 2,432 |

All three AB/BA/AB pairs give the same counts: **4.7% fewer transactions**, **50% fewer resolution
authentications**, and **13.6% fewer digest calls** at 128 owners. Clean transactions remain
233/457/905. Every case closes actual source authority with zero Markdown reads, parses or repairs;
the 128-owner peak transient decode reservation remains 5,277 bytes. Synthetic elapsed samples
are retained, but these results do not establish native CPU, whole-startup, battery or thermal gains.

## Native diagnostic baseline

The unchanged merged runtime, with the detailed test observer, passes genuine full saved hydration
and source closure in `kplex-test`: 20,088 Markdown owners, 108,217 nodes, 197,561 declarations.
First observed readiness is 1,047.1 seconds after renderer navigation, stable readiness 1,049.3s,
and real cache/task drain 1,051.5s. The following **610.709s** quiet window passes with zero
violations, no new broad work, no pending resources and no active transactions. All observed
selected-window samples are foreground; cleanup succeeds.

The process CPU delta through the quiet window is 337.906s (294.578s user / 43.328s system),
including 5.672s during quiet observation. It starts when the onload observer is installed, excluding
earlier module/application startup; it is not a plugin-exclusive or whole-application CPU measure.
The diagnostic records 455,929 native transactions, two actual broad source passes, one actual full
build and one successful complete save. The probe counts three inventory method admissions because
joins are calls too: admissions must not be reported as three completed passes.

Resolution authentication is 40,176 deliveries for 20,088 owners. The save submits 279,044,330 bytes
of page/chunk JSON payloads; 20,076 local-dependency-owner puts occur independently of source-fact
writes. Zero body reads/parses/repairs or source chunks written therefore does not mean zero storage
work. No before/after graph checksum was captured for this initial diagnostic, so the save is not
claimed proven equivalent. New matched trials use separate, untimed stored-cache identity receipts.
Sampled maxima are 2,148,379,820 heap bytes and 2,865,561,600 RSS bytes, not controlled retained heap.

An earlier setup centered a generated note attached to the 19,999-incoming-link hub. It settles
incomplete with `decode-budget`; no timed trial started. That failed high-fan-in setup is preserved
separately, rather than counted as an ordinary-center success. The successful ordinary case uses an
original help note disconnected from that generated hub. The 20,000 generated notes occupy only
8,831,230 Markdown bytes; this is a high-node/link fixture, not the separate large-prose fixture.
Its [original generator](https://github.com/zsviczian/kplex/blob/62c728393440aa3dfb57869ece83c4060092bcba/scripts/testing/generate-high-node-vault.mjs)
reproduces digest `50b8cb12ef83c3cd62f1605390fe6ff793079a9f6e37e471e59d0060cf287cd0`;
the fixture plus 88 help notes is held fixed. Fixture limitations remain explicit.

## Graph retention and reporting

The existing graph fingerprint is not a complete certificate relating a saved graph to its source
generation and resolver/Date environment. Zero activated heads or matching mtimes cannot replace
that proof. The [optional source-receipt proposal](background-index-efficiency-165-source-receipt-proposal.md)
was approved by the maintainer as a separately measurable/revertible checkpoint under the PR's
persistent-format boundary; no format change has been implemented yet. Legacy/uncertain coverage
keeps conservative fallback. The PR stays draft and unmerged for review of safety and resource results.

After hydration, an unfinished startup source pass now retains its actual existing note progress.
Its existing source callback also refreshes subscribed status listeners through the existing 250ms
throttle; only source-authority work advances the hydration watchdog. A real saved-graph regression
reproduces the missing notification and verifies the correction without graph publication or note reads.
Compilation, saving, URL work, On-demand mode and settled outcomes retain their own labels. All
visible strings already exist in the supported catalogs. Constant-size session counters distinguish
actual broad source passes, full-build/catalog starts (including cancelled starts), and successfully
activated complete/checkpoint saves. They continue after readiness until unload, independently of
detailed timing opt-in. The support report exports only these allowlisted counts and retains the
existing completion route; missing older evidence remains unknown.

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
baseline/candidate performance result. Native matched comparisons, offline delta acceptance and
controlled retained-memory/resource tradeoffs remain pending.

The registered real-IDB observer regression passes exact request/promise/receiver forwarding,
once-only wrapping, aggregate-only exports, decode release and cleanup; 16 existing host-runner
contracts also pass. The duplicate-read regression fails on the prior algorithm (six validations
for three owners) and passes after correction. Eight real-IDB integrity/finality cases pass, including
corruption, concurrent foreground proof, independent head replacement, cancellation and same-stat
events. Twenty-three diagnostics/support privacy tests pass. Full Node22.22.2 verification passes
architecture7/core128/general828/UI63/portable-source334/browser524, lint, actual installed types,
production build and exact-artifact Windows native smoke with no failures/skips. Main SHA-256:
`4813b60d280cf3dc7cb2ab1eaeea6769df6218b73183357e32f4bef00a5805e0`; manifest/styles are unchanged.
The first full run had one pre-test Chromium bundle-load failure among 523 browser checks; all
71 affected relationship/runner checks then passed, followed by the complete passing repeat.
All runs are retained. A later setup invocation rejected a relative config path before verification;
the final absolute-path run passes after the notification correction. Its callback-documentation-only
follow-up also passes the focused browser test. No deadline or assertion was relaxed.

The stored-cache identity helper separately passes a genuine native read: 213 pages, 1,565
declarations and 139 selected source heads; only hashes/counts escape its bounded readers.
Snapshot activation metadata is separate from graph payload identity. Its unit contract covers
payload changes, negative/multiple declarations, reused source sequences and interrupted reads.
The native Node CPU-module PID equals the selected renderer PID; future profiles also record
the CPU closure's own identity and compare it with the [Electron renderer PID](https://www.electronjs.org/docs/latest/api/web-contents#contentsgetosprocessid).
The installed candidate reports one actual inventory pass and zero builds/catalogs/saves in this
small-vault plugin load. Temporary profile/controller names are absent from production source and main.

## Evidence and acceptance

Raw successful/failed/setup receipts, exact profile artifacts and source identities are preserved
outside the PR tree pending final evidence packaging. Reusable benchmark/profile drivers live in
the repository. No evidence has been discarded. No personal-vault access is performed or authorized.

Remaining platform acceptance will be reported explicitly: lower-powered desktop/full-process
restart, physical iOS/Android startup/navigation/suspend-resume with memory headroom, and the other
desktop OS's changed-source/interrupted-validation workflows. Keep PR #165 draft; no merge/release.
