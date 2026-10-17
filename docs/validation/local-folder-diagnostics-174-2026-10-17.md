# Local folder waves and indexing diagnostics — PR #174

Implementation and acceptance are in progress. Neither component is recommended for merge yet.
The two components are evaluated independently: folder admission cannot pay for diagnostic cost.

## Baseline and bounded scope

Baseline is merged main `23aa44eae13797a93890fd1ce1679074d45d9295`, integrated without
rewriting history at `d4d65cd`. This preserves #172/#161 and the accepted #173 changes.
Use only the authorized disposable vaults. No personal-vault access or evidence publication.

The existing source coordinator treats a folder create as uncovered resolver activity. A natural
closing `resolved` event can therefore globalize a subsequent small note update. A narrow candidate
must prove a genuinely new empty folder under an established parent in an already reconciled Eager
session, account for its subsequent native members and preserve normal affected-source/referrer work.
Partial/startup authority, missing or ambiguous events, replacement, nested ancestry, rename/delete,
expired waves and extra closes remain conservative. No source schema, receipt, parser or scheduler
redesign is proposed.

The separate diagnostics component records fixed categories/scalars at coarse boundaries. It adds no
per-file/link/evidence/IDB instrumentation, timer, polling, sampling, I/O or upload. See the
[schema, privacy and collection guide](../INDEXING_DIAGNOSTICS.md). Detailed profiling stays opt-in.
The former 0.5% CPU allowance is withdrawn; it is not an acceptance threshold.

## Reproduced amplification

One serial natural-event pilot on the exact baseline bundle in `kplex-test-small` (107 files,
88 Markdown before owned fixtures) reproduced the #172 causal result:

| Change | Checks / reused bodies / fresh reads / parses | Global source passes | Renderer CPU, user + system | Observed drain interval |
| --- | ---: | ---: | ---: | ---: |
| Note in established folder | 2 / 1 / 1 / 1 | 0 | 421 ms | 1,574 ms |
| New folder immediately followed by note | 92 / 91 / 1 / 1 | 1 | 1,578 ms | 5,997 ms |
| New folder alone | 0 / 0 / 0 / 0 | 0 | 235 ms | 922 ms |
| Note after that folder settles | 2 / 1 / 1 / 1 | 0 | 235 ms | 1,713 ms |

All four intervals had zero full builds, node-catalog builds and complete/checkpoint snapshot saves.
These are causal pilot observations, **not matched efficiency estimates**: sequential arms add owned
files and durable cache history differs. CPU includes host work; sampled memory can miss peaks.
Drain checks cover existing readers/queues and observed transactions, not physical I/O or paint.
The pilot excludes later periodic maintenance and the required 610-second quiet window.

Baseline bundle SHA-256: `8d20bf308e935f353a9eea24256d44838b33863cd6d99d7b00ed056e7459e8c1`.
Raw pilot, source references, controller and rollback receipts remain private; originals are retained.

## Diagnostic safety and cost checkpoint

The frozen D0 actual-owner comparison uses Node 22.22.2, seven alternating AB/BA repetitions,
200,000 updates per arm and separate allocation/copy trials. Additional CPU was approximately
**0.55 microseconds per begin/end pair**, or 0.80 microseconds for a combined cause/phase/pass/stop
sequence. Windows CPU counters have coarse resolution; these are amplified estimates, not native
per-event timings. No-op closed-phase stops were below that measurement's CPU resolution.

Fresh owners added approximately 8,900–8,915 bytes of post-GC heap plus buffer data; the filled
25-hour/two-active-pass fixture was approximately 9,015–9,033 bytes per owner. A separate V8
data-root observation counted **15,896 bytes**, including the owner, shared dictionaries, shapes,
clock/context headers and all eight one-key weak admission tables, below the 32KiB state target.
That observation excludes compiled code, loader caches and ancestor/global graphs. It is not a
whole-module incremental-memory guarantee. Reading the tiny totals buffer before this snapshot can
materialize its 32-byte backing earlier than production; unmodified per-owner trials are separate.

Allocation sampling estimated 1.28–1.79 MB for 50,000 actual begin/end pairs versus 0–34 KB for the
no-op control. These are sampled process allocations, including clock/engine/harness effects;
owner-frame attribution was unavailable. They do **not** establish zero allocations. Explicit
capture averaged 0.143 ms CPU and serialization 0.033 ms per copy for the 6,069-byte fixture.
Projection cost is measured separately. No idle clock reads or retained-state changes occurred
across the driver-owned idle yield; source review confirms no production idle resource was added.

An initial memory observation was inconclusive because it read the tiny typed-array buffer only
after taking the snapshot. The corrected order measures the same materialized state on both sides;
both original observations and the corrected raw result are retained. The originally unbounded weak
capture-admission table was replaced with eight one-key slots; old exported DTOs cannot grow it.
Capacity-limited pass detail now closes phases at the real boundary, so idle time cannot inflate them.
The legacy per-file detailed patch milestone is deliberately excluded from default capture.

The complete required verification and exact-build Obsidian smoke passed. After the final review
fixes, all 19 focused recorder/startup cases and affected official lint passed; installed types and
production build passed in the strict run. The first attempt failed because the explicit indexing
test inventory omitted the new dependency; that failed log is retained. The diagnostics-only native
control preserved the four source-work profiles above. Further stable-path controls passed on main
and D0, with exact configuration/fixture restoration and unchanged reads/parses/builds/saves.
For a globalizing close, both observed 92 checks and 1,499 source digests over 2,219,720 UTF-16 units.
Transactions were 1,526–1,527 and requests 2,920–2,925; local-note storage counts also varied with
existing host/storage timing. These are not byte-identical database images, so this does not prove
an exact zero transaction difference. No native resource saving is claimed for diagnostics.

One main repetition naturally separated the folder and file waves and needed only two source
checks. It is retained, not silently excluded: natural event timing determines whether baseline
globalization occurs. Native CPU/drain differences across these repetitions are inconclusive for
diagnostic overhead. Source review finds no diagnostic I/O/scheduler call; the amplified no-op
comparison supplies the small absolute CPU estimate instead.

A separate forwarding-only native frequency run observed 11 activity-method calls over a 1.59-second
existing-folder interval, 37 over a 5.57-second globalizing interval, eight over a 0.89-second
folder-only interval and 11 over a 1.62-second later-note interval. Many calls are already-observed
milestones that read no clock. That probe's CPU includes its wrappers and is not an uninstrumented
efficiency comparison. All native runs used the actual Eager strategy, responsive pacing, retained
background throttling and a stationary foreground center; URLs follow the existing actual strategy.

The natural Eager session used a complete physical node catalog while `fullSnapshotHydrated` and
`fullSnapshotFresh` were false. A full-semantic-snapshot-only folder predicate therefore excludes
this relevant workload. The narrowly scoped alternative under review is one state-bound physical
folder coverage bit/generation in the existing publication owner, granted only by existing complete
producers and fenced by the existing structural revision. No semantic authority follows from it.

## Folder proof and focused validation

F1 separates complete physical-folder membership from semantic completeness. Existing complete
structural/source-node and physically matched saved-snapshot producers grant one state-bound bit
only if their pre-enumeration topology epoch still matches. Replacement, clipped previews,
build/hydration interruption, retained warm recovery and incomplete subtree imports retire it.
No old graph, new catalog, persisted receipt or scheduler is retained.

Main's existing synchronous physical-create admission must qualify an already observed empty
folder under an established parent. A source witness retains at most 32 direct native file creates
until the existing 50 ms per-cause retirement deadline. Before rearming, an elapsed timestamp
guard rejects an already overdue witness; a delayed timer cannot revive it. The first close checks exact folder/parent/file identities,
membership, graph generation and coverage incarnation. Missing/nested membership retires that
incarnation; ordinary expiry alone preserves complete physical coverage. Unknown, expired,
replayed, replaced, nested and interrupted cases retain conservative source validation.

The isolated F2 Chromium/real-IndexedDB run passes **36/36 tests**, including genuine held
evidence hydration and warm retention, nonempty imports, missing nested members at close/expiry,
second-connection source replacement and failed structural tasks. The actual main create callback
is exercised; no test assigns complete/fresh flags. Eligible work reads/parses the new body once,
repairs actual referrers and performs no global inventory/head paging. Counts remain identical
with 3 versus 120 unrelated Markdown notes. Standalone body-free bootstrap and On-demand remain
conservative. Installed types, affected official lint and production build pass. An earlier set
of 204 source/startup/priority/On-demand regressions passed before the final retirement additions;
the final complete verification remains pending.

The first attempt at the final type check caught a private lifecycle-field access; the correction
passes main's existing admission explicitly. Earlier failed tests and rejected prototypes remain
preserved. These modeled operation/finality results do not establish native deadline eligibility,
CPU savings, storage latency or allocation behavior.

The first native matched F1 trial passes correctness/cleanup and the 610-second quiet control,
but **fails the efficiency gate**: baseline and F1 both perform 92 checks, 1,499 source digests and
one global pass. Inclusive renderer CPU is 2,327 versus 2,766 ms; drain is 5,978 versus 7,074 ms.
These single repetitions do not isolate overhead or establish a speed regression.
Both quiet controls have zero source reads/parses/digests/builds/saves and two existing cache
maintenance transactions/requests. Originals, exact sources and the failed-efficiency result remain.

The causal trace isolates F1's unnecessary absolute deadline: the folder qualifies at 6 ms,
its direct file arrives at 47 ms, metadata changes at 69 ms and resolution closes at 70.2 ms.
Membership, physical proof and generation remain current, and the existing per-event resolver
timer is live. The additional opening-time cap alone rejects it. F2 is being checked against
the existing 50 ms **per-cause** expiry, with a pre-rearm timestamp guard so a suspended/overdue
callback cannot revive old coverage. No timeout duration, member cap or source-validation rule
is increased. The two additional deterministic-clock regressions cover a continuously live
0/30/60/65 ms wave and an overdue callback that must reject rearming; they are not native timing
measurements.

### F2 native checkpoint

The same frozen driver and diagnostics-only D0 capture configuration compare the eligible
new-folder-plus-note interval below. The original F1 failure remains above. Current note inputs,
settings and 107-file baseline match; database bytes, CAS identities and prior cache history do not.

| Observation | D0, folder fix absent | F2 |
| --- | ---: | ---: |
| Source checks / reused bodies | 92 / 91 | 2 / 1 |
| Fresh reads / parses | 1 / 1 | 1 / 1 |
| Global passes | 1 | 0 |
| IndexedDB transactions / requests | 1,526 / 2,920 | 78 / 202 |
| Source digests / UTF-16 units | 1,499 / 2,219,720 | 58 / 14,359 |
| Inclusive renderer CPU | 2,327 ms | 469 ms |
| Observed drain | 5,977.5 ms | 1,684 ms |
| Sampled heap / RSS maxima | 217,649,220 / 614,596,608 bytes | 254,499,656 / 659,800,064 bytes |

Both perform zero full/node-catalog builds and snapshot/checkpoint saves. The existing-folder,
folder-only and subsequent settled-folder note controls retain their ordinary work counts.
All three D0/F1/F2 610-second quiet observations pass with zero source checks, reads, parses,
digests, builds and saves; each observes two existing cache-maintenance transactions/requests.
F2 quiet renderer CPU is 1,140 ms over approximately 610.45 seconds, versus 1,360 ms for D0;
that difference is not an isolated diagnostic or idle-overhead estimate. Foreground/throttling,
owned fixture inventory and exact configuration restoration pass.

The work-count reduction demonstrates avoided amplification for this eligible wave. CPU/drain
are inclusive single-run observations, not a universal speedup. Higher sampled memory after
sequential trials does not establish an allocation saving or attributable regression; GC/history
and missed peaks prevent that conclusion. Baseline can already stay local when native events
separate, as recorded earlier. On-demand, uncertain topology and incomplete physical authority
remain conservative. F2 source is independently pinned by staged patch SHA-256
`671fd2666c9aa94ee5d6bd8a29b5c8a26308ff06015fc41988bdc423ec81d1bd` on D0 `786e91c`.
Its isolated actual types, affected official lint, production build and main/indexing fixtures pass.
One bounded repetition with the same frozen driver again stays local: two checks, one read/parse,
58 source digests, 77 transactions/197 requests, 406 ms inclusive CPU and 1,689.9 ms drain. Exact
fixture/configuration restoration passes; the earlier dedicated quiet trial is not repeated here.
The integrated D2 native lanes, complete verification and two-hour soak remain pending.

## Predeclared remaining acceptance

1. Freeze and verify diagnostics-only D0, then compare unchanged native operation counts and actual
   coarse-call frequency against main. Amplify the exact owner against a no-op; report absolute CPU,
   allocation estimates, retained data and copy cost without converting timing noise into a win.
2. Validate the bounded folder candidate with real IndexedDB/event regressions, natural Eager and
   On-demand controls, affected referrers, valid Excalidraw/create-fill-rename sequences, lifecycle
   revocation and increasing unrelated input. Compare baseline/candidate with identical capture.
   Require genuine drain plus a serial 610-second quiet observation; document input/cache limits.
3. Exercise both actual copy surfaces, owning-window early clipboard/preview behavior, #172 held-P3
   Find/sync/stationary completion and affected #161 materialization/pinned navigation controls.
4. Run one bounded two-hour native session on disposable Small after final exact-build staging:
   ordinary owned create/edit/report cycles separated by quiet intervals, with no plugin reload,
   foreground policy changes or accelerated clock. Retain start/end and intermediate observations,
   cleanup receipts and capacity checks. This is distinct from accelerated 24/48-hour tests and
   does not claim an actual 24-hour device run. No overlapping browser/resource driver.
5. Full final verification and reviewed diff; separate F and D ship/revise/defer judgments. Keep
   #174 draft. macOS and physical Android/iOS lifecycle, suspend/resume and clipboard remain separate
   acceptance environments. Preserve a verified private durable evidence backup before closeout.
