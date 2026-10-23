# Startup source convergence — PR #206

Prepared by **Zsolt's Codex Agent**, 2026-10-23, Europe/Budapest.

**Status: investigation in progress. No runtime correction or performance improvement is claimed.**

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

## Current causal leads

The current plugin coordinator sets initial source completion from one `adoptStartupSources()`
result and releases its task when incomplete. GraphIndex's source-ready consumer wakes the
source-authority waiter and demanded semantic consumers, but does not notify that coordinator.
This is a source-trace lead, not yet a current-baseline native reproduction of the historical S2
failure. A controlled local regression drives the production coordinator and existing GraphIndex
source-ready callback without manually invoking adoption a second time. On the unchanged runtime
it fails the assertion that recovered authority must automatically resume startup, after all 58
existing startup-admission scenarios pass. This failing test remains part of checkpoint A work in
progress; the instrumentation checkpoint does not claim a passing runtime correction.

Adoption can also fail because source flush is incomplete, semantic preparation is pending,
or publication fences change. The actual failed condition and later meaningful recovery must
be recorded before choosing the correction. Empty work queues alone do not establish readiness.

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
Native observer validation remains pending. Diagnostic forwarding counts are not exclusive CPU attribution.

## Targeted S2 capture in progress

The original S2 checkpoint was fully verified in the current test database: **15 stores /
1,537,552 rows**, atomic changed-store import followed by decoded native readback. The storage
job exceeded two bounded observation windows; both receipts were retained and later observers
joined the same owned job. No second import or early activation occurred. Total preparation
was approximately sixteen minutes and is outside startup timing.

The current-base application launch began at **10:39:17.761 UTC**. Diagnostic attachment at
**10:40:05.878 UTC** was late: forwarding totals omit earlier work. Initial native source flags
show **11,819 body-dirty sources**, **zero `created` flags**, and 20 sources already repaired,
out of 11,839 Markdown owners. At about 29 minutes after attachment, more than 11,500 sources
had been checked/repaired, with no unsaved masks observed. Final adoption, true closure, quiet
and cleanup remain pending. This is not yet a repeated current-base stranded-startup result.

Two lifecycle paths explain a candidate admission cause: before layout readiness,
`installPreRestoreChangeFence()` forwards `Vault.create` through deferred host change with
`bodyChanged=true`; the independent URL create listener calls `refreshUrlOwner()` with its
ordinary changed-owner default. Installed Obsidian **1.13.0** declarations explicitly document
that `Vault.create` also fires for each existing file during initial vault loading and recommend
registering ordinary create handlers within `Workspace.onLayoutReady`. The source and URL
paths can therefore turn initial discovery into body invalidation and URL cache retirement.
A controlled before/after qualification and real/offline negative cases are still pending; no
cached-source validity check has been removed and no work reduction is claimed yet.

The current-baseline real-IDB coordinator regression also fails after actual missing-metadata
recovery: source authority and requested semantic preparation close, but no second adoption
follows. A local unvalidated correction joins existing startup owners and handles both source
and semantic completion signals. This checkpoint does not publish that runtime correction.
The new diagnostic probe additionally retains at most **eight anonymous weak native identities /
128 scalar owner transitions**, exposing dropped detail without exporting note paths.

## Remaining acceptance

- [ ] Current-baseline controlled failure and targeted native causal sequence.
- [ ] Checkpoint A implementation, bounded recovery/negative regressions and native confirmation.
- [ ] Checkpoint B demonstrated cause, independent implementation and regression evidence.
- [ ] Before/after work and CPU receipts, interaction/recovery checks, realized #204 reuse.
- [ ] Full real-dependency verification and applicable exact-build native lanes.
- [ ] Final copy/original-configuration audit and independent owned-resource cleanup.
- [ ] Validated commits pushed, remote checkpoint verified and draft #206 updated for review.

No merge, release, main-branch write or production deployment is authorized.
