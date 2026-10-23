# Startup source convergence — PR #206

Prepared by **Zsolt's Codex Agent**, 2026-10-23, Europe/Budapest.

**Status: A1/A2 correctness checkpoints verified; B implementation verified in the combined candidate, with native acceptance and work/CPU measurement continuing. No CPU improvement is claimed.**

## Scope and checkpoints

This work starts from accepted runtime `0f94252aabb8b23458b5df192380854ea0bddd53`,
including merged #201 and #204. The historical [#203 report](mac-vault-indexing-203-2026-10-22.md)
remains evidence about its frozen older runtimes; its timings are not the baseline for this patch.

1. **A — recovery:** reproduce a failed initial source adoption, identify its failed prerequisite
   and recovery signal, then make the existing startup coordinator resume automatically.
2. **B — avoided work:** establish which startup observations change source validity and remove
   only demonstrated redundant acquisition/reconciliation. Measure avoided work separately from A.

SourceRepository validation, reader leases, schema and count-reuse/reclaim protocols belong to
the accepted base and Windows #205. The reserved adapter read-plumbing seam remains unchanged.
This branch does not import #205's unfinished implementation.

## Baseline and safety

The Node **22.22.2** real-dependency production build passed. Its `main.js` SHA-256 is
`46bcd36b14291169465f98f0c2635ffb331d576eb84177d1e030281a90dc15d1`, exactly matching
the final #204 recorded artifact. No new release version is assigned.

Fresh native inspection verified the existing `kplex-test-brain-mac` copy by actual vault name
and resolved path, with K-Plex and all community plugins off, Sync/Publish off, AC connected,
nominal thermal state and one Obsidian window. Historical controllers/debuggers and native-IDB
wrappers were absent. Every deployment/restoration remains explicitly target-guarded.

Fresh read-only hashing found **20,190 copied content files / 10,956,614,603 bytes**, identical
to the final #203 manifest. The protected original's **223 configuration files** also match that
retained final manifest. The original's full content was not hashed in #203 or this audit;
configuration comparison must not be described as full original-content verification.

Private starting configuration/artifact backups and new receipts use a separate private directory
identified as `kplex-206-l1y0aw88`. Historical evidence and seeds remain preserved. The relevant
retained S2 full-snapshot stream has SHA-256
`4e70e31200f9017642c7b2e509283910881fb718a99e17114f0c91205706f4c2`;
the A4 warm seed is a different checkpoint. A retained sidecar alone does not prove a successful
new import: decoded verification and the native committed receipt are required before activation.

## Checkpoint A1 — settled recovery continuation

The unchanged current-base coordinator fails controlled recovery regressions: initial adoption
returns incomplete after missing source metadata or a controlled storage-write failure; source
authority and requested semantics later recover, but the coordinator never adopts again. The
write-failure fixture explicitly injects post-eviction memory state; it does not test the eviction
algorithm itself. Recovery uses the actual source event/storage path and does not manually invoke
a second adoption.

A1 notifies the existing initial-index owner after source inventory ownership releases and after
requested semantic tasks settle. One coalesced continuation joins original preparation/adoption,
then rechecks captured lifetime, demand, source, publication and policy fences. Unchanged failure
signals do not spin. Notifications grant no readiness; actual adoption still owns completion.
Persistent failures, supersession, unloading, closed demand and genuine edit backlog remain explicit.
No timer, polling, watchdog change, storage-schema change or SourceRepository modification is added.

On Node22.22.2, all existing indexing fixtures, 58 startup-admission scenarios and 15 new coordinator
scenarios pass. The acquisition/real-IDB lane passes 46 tests, including two new real-storage
recovery cases. Full `npm run verify` passed with real dependencies, followed by exact-build Small
native command/render/no-captured-JavaScript-error smoke. That smoke does not establish native
fault recovery or complete interaction acceptance. The tested bundle is
`4b53d61d2ae7d1ff4a3a127b71c0d30036722e726559bf264113eaac4e39cf28`.

A separate settings-publication regression exposes three remaining cases: presentation facets,
legacy display-name policy and empty-demand semantic-policy refresh can supersede an initial
adopter without a later source/scope-finalizer signal. The A1 checkpoint retained these failing follow-up fixtures outside its test inventory; A2 corrects
and registers them below. Full fresh-process and real-copy acceptance remains separate. A1 is a correctness checkpoint, not measured CPU savings.

## Measurement plan and limits

- Capture one ordinary accepted-base warm control and one targeted S2 application-startup
  reproduction, retaining the existing 45-minute run cap and ten-minute quiet requirement.
- Develop controlled recovery/event-order regressions before another long reproduction.
- Iterate on reduced fixtures. Aim for three matched representative before/after pairs where
  feasible; retain incomplete, unmatched, route- or coverage-qualified observations explicitly.
- Keep builds, full tests, hashing/imports and heavy oracles outside timing windows. Measure whole
  process identities once, through actual source/URL/persistence closure and matched quiet.
- Keep broad-tag behavior as the original named unresolved control. No substituted leaf target,
  larger deadline, forced route, watchdog increase or control-CPU subtraction is authorized.

The first warm control completed at **806.345 seconds**, including **601.325 seconds** of
quiet after first observed ready/closure at **205.020 seconds**. It performed **zero** checked
sources, vault reads, parses, source repairs, activated replacements and unsaved masks. Optional
background URLs completed from the existing cache. This clean warm condition therefore realized
zero #204 replacement-count reuses; it is not evidence about an eligible replacement workload.
The end-to-end whole-process delta was **446.789 CPU-seconds**, explicitly **coverage-qualified**
by a **6.080-second** early native-sampler gap. AC, native foreground and unlock observations stayed
valid; no CPU subtraction or speedup comparison is drawn. Cleanup left the plugin off and the
community enabled set empty. The retained starting warm state was reused without a new seed import.

New optional diagnostic-only forwarding observers record bounded scalar adoption/flush/recovery
transitions, native event categories, inventory admissions versus joins and source acquisition
flags. They distinguish the actual ordinary activation private-reclaim branch (#204 realized
count reuse) from selected-count repair; matching digest eligibility alone is not counted as reuse.
They start no source work and perform no extra proof reads. The three observer tests and all 22 existing Mac-study tests passed under Node22.22.2.
Native observer forwarding completed without overflow in the targeted capture below. Diagnostic forwarding counts are not exclusive CPU attribution.

## Targeted current-base S2 result

The retained S2 stream was imported and decoded-readback verified: **15 stores / 1,537,552 rows**.
The atomic changed-store job exceeded two observation deadlines; subsequent observers joined the
same job, with no duplicate import or early activation. Approximately sixteen minutes of import
preparation are outside timing.

Launch began **10:39:17.761 UTC**; forwarding attached **48.117 seconds late**, so its totals are
lower bounds since attachment. Unlike historical S2, this current-base run **completed**: ready at
approximately **1,829.121 seconds** after launch, final source/URL/persistence closure at
**1,963.121 seconds**, followed by **601.257 seconds** quiet. Whole-process external CPU delta
was **4,036.03 CPU-seconds**, sampled without reported process errors (maximum gap1.056s).
Native foreground, unlock and AC checks remained valid. No historical stranded outcome is claimed
for this native run; the current-base liveness defect is established by controlled regressions.

Independent external power polling was inadvertently not armed for the first warm/S2 captures.
Retained retrospective system-power logs and terminal AC state agree with native AC observations,
but are not a prearmed external power series. This remains a measurement qualification; later
matched captures must arm the independent power recorder.

Initial attached source flags were **11,819 body-dirty**, zero created, and 20 already repaired,
out of 11,839 Markdown owners. Final production counters checked11,840/repaired11,839 owners;
URL processing completed11,839 owners with11,819 reads. Late forwarding observed11,820 source
acquisitions,11,819 unique identities and **one same-revision revisit**. Near-vault-wide identical-
revision replay is therefore not established. Actual activated ordinary private-reclaim branches
realized **11,819 #204 count reuses** since attachment; eligibility alone is not counted, and these
savings belong to #204.

Installed Obsidian1.13.0 declarations document `Vault.create` for existing files during initial
loading. The pre-layout source fence currently treats these as body changes, and the independent
URL create listener retires cached owner data. The controlled discovery regression fails in both
eager and on-demand modes on this baseline. Negative cases and a safe qualification are pending;
no cached-source validity check has been weakened.

One actual full semantic rebuild also occurred, marked `startup:stale-snapshot` with zero modified
paths. The source inventory was cancelled and restarted with revision1→2 and generation22→23,
while maintenance/host revisions remained1. The existing 120-second automatic dirty-index flush
can enter full rebuilding after snapshot hydration but before source adoption completes. This
caller attribution follows production call inventory/conditions and a controlled exact-interval
regression, not a captured native stack. Three startup-only ownership cases fail before correction;
seven genuine-change/cold/on-demand/explicit-demand controls pass. An empty later inventory was
small follow-up work, not another broad pass.

## Working follow-up A2 and checkpoint B

A2 now also notifies after coherent non-paint settings publication, meaningful legacy display-name
publication and empty-demand semantic settings refresh. Alias-vocabulary lifetime joins the queued
recovery fence. All three formerly failing settings cases pass without body reads/parses. Combined A2/B full
`npm run verify` and exact-build Small smoke pass on Node22.22.2; the frozen combined bundle is
`6ad7c8165cfa0ad66448897aaf0c401b0ccf722702f3c7498c911348502d4a50`.
A1/A2 and B remain separate code checkpoints; this bundle tests their composition, not an isolated
A2-only installable artifact.

A new native Small recovery lane passed: actual metadata-unavailable reconciliation causes one
failed adoption, genuine metadata recovery triggers one successful automatic adoption, the scene
remains present, full-build count stays0 and unsaved masks stay0. Exactly two attempts were observed.
The probe reopens initial coordinator flags on an already settled source-backed index; it is **not**
a fresh-process route reproduction. Method descriptors, owned note, settings bytes and controller
cleanup passed. Before faults, the exact Small database was checkpointed across15 stores with
stream SHA-256`1b6c510db41387d1fc38a257af8286b3da05d5f7fcbc9a793870fac946fe3118`.
Exact-build SI4 Small settings/gates/search/provenance/stale-write acceptance also passed. Native
SI5 and foreground acceptance subsequently passed; live/startup qualifications are recorded below.
Fresh-process real-copy timing and final audit remain pending.
Forty-one driver/observer checks passed after registering the native recovery command.

B qualifies initial create enumeration at the existing lifecycle listeners rather than changing
source validation. Pre-layout creates remain native physical inventory inputs; the independent URL
owner does not retire its cache solely for enumeration. Real modifies/deletes/renames remain fenced
before layout, and post-layout creates remain ordinary changes even before preparation admission.
The controlled real-IDB suite passes18 cases across eager/on-demand modes: clean discovery, same-stat
modify, late create/recreation, offline alias/Date/path drift, missing metadata and corrupt metadata.
The clean two-owner fixture performs zero source acquisitions/reads/parses/replacements or URL reads;
negative cases retain actual repair, Date resolution, new URL incidence and tombstoned old paths.
These are controlled work results, not native CPU measurements.

The automatic rebuild guard applies only to incomplete eager source-backed startup, no edited
Markdown paths and exclusively startup-prefixed backlog. It preserves that backlog and completion
state for the existing initial owner. Ten actual-interval/coordinator cases pass, including the three
formerly failing startup-only cases and seven genuine-change/cold/on-demand/explicit controls.
The existing indexing suite now explicitly expects no pre-layout body invalidation and adds the
opposite post-layout-before-admission control. Existing watchdog and same-stat protections pass.
No SourceRepository algorithm or reserved read-plumbing loop changes.

## Native interaction follow-up and qualifications

The exact combined bundle passes native Small SI5 restart/corrupt acceleration/requested-source
repair/offline-edit acceptance, with settings restored, fixtures absent and throttling restored.
The ordinary foreground lane also passes while unrelated inventory is held.

The original very-early On-demand live-update lane has a **pre-existing recent-tab failure** on
both accepted baseline46bcd36b and candidate6ad7c816. Find, physical creation and local semantics
succeed, but a recent-tab activation at about1.9–2.0s occurs inside the existing three-second
workspace/history guard. The target is canonical and physically available; no semantic task is
pending, while the activation is absent from history and the explicit sync action does not center
it before the unchanged15s deadline. Source recovery is not the failed prerequisite. Both failures
and successful cleanup are retained. No navigation production code is changed for this unrelated
condition.

A **separate workspace-ready variant** waits for that existing guard while retaining the unrelated
P3 read. It passes on both immutable baseline and candidate, including physical Find, local explicit
relationships, recent-tab synchronization and actual owner/queue drain after release. This pass
does not erase the original early failure or prove availability during workspace reassociation.
The same pre-fault Small checkpoint was decoded-restored before each immutable arm; installed
artifact hashes remain verified. Forty-one driver/observer checks pass after the tooling extension.

One candidate hot activation after restoring that checkpoint crashed Small's renderer before the
live-update controller could install. Native inspection showed a crashed renderer(pid0), with the
brain-copy renderer healthy and K-Plex off. The retained macOS report records `EXC_BREAKPOINT` /
`SIGTRAP` on a renderer worker thread; it supplies no causal JavaScript stack. Reloading only that
positively identified crashed Small window restored access; the subsequent exact-build variant
passed. No application-wide restart occurred. The crash, transport-timeout receipt and isolated
recovery remain an **unresolved qualification**, not attributed to #206 or silently counted as a pass.

## Parallel coordination checkpoint

At the A1 checkpoint GitHub reports #205 and #207 open/draft. The maintainer has authorized the
Windows agent to merge #205 independently and then continue #207. This branch keeps accepted
runtime0f94252 and the recorded artifact identities; no Windows code is imported mid-experiment.
A later combined Mac validation against integrated code remains required once both threads are ready.

## Remaining acceptance

- [ ] Current-baseline controlled failure and targeted native causal sequence.
- [ ] Checkpoint A implementation, bounded recovery/negative regressions and native confirmation.
- [ ] Checkpoint B demonstrated cause, independent implementation and regression evidence.
- [ ] Before/after work and CPU receipts, interaction/recovery checks, realized #204 reuse.
- [ ] Full real-dependency verification and applicable exact-build native lanes.
- [ ] Final copy/original-configuration audit and independent owned-resource cleanup.
- [ ] Validated commits pushed, remote checkpoint verified and draft #206 updated for review.

No merge, release, main-branch write or production deployment is authorized.
