# PR201 Windows fresh-process acceptance protocol

Prepared 2026-10-22 before collecting any fresh-process measurements. This is a
bounded follow-up to [the retained validation record](indexing-cpu-201-2026-10-21.md),
not a new optimization or the PR203 Mac investigation.

## Immutable inputs and restart prerequisite

- Baseline A: `551a3b52895484de3dd41e5c6eb2fa8c6712fec4`, main SHA-256
  `3b96f51e8b734bd622fb0034f1e17682efb17eda8b6caed6e2d69ac7bd05e5f3`.
- Candidate F: `fa08e60e1a7122f8b37fcd11c943b883317b6ae8`, main SHA-256
  `c39fb4876315a3348b782fe91400398faab1f98de8c0852eb9cc06bf24509a58`.
- Existing disposable `C:\Obsidian\kplex-test-small`, its existing profile,
  107 files / 88 Markdown files / 12 visible folders. No new destination/profile.
- Verified logical all-store checkpoint SHA-256
  `9e4503aec40d4d80a247cfb6926b432bd3529dac6b2f886d13df11228b5a2106`;
  inventory digest `29cf2f3e71672f7674894a139469c4d211c62cb027173aa4bca22f5b4667b3d8`.
- Preserve original database, configuration, layout, plugin enablement and artifact
  backups; verify restoration independently at the end or after failure.

**Do not restart the application until the maintainer confirms all other vaults
are saved and closed.** Independently inspect native windows/processes before
each restart; a new/unrecognized vault stops the lifecycle operation. Do not
kill a process merely because a CLI request times out. No production-vault,
global-storage, forced-GC, cache-deletion or scheduling changes are authorized.

## Workload, preparation and order

Run serially: disabled-plugin host/preparation control, A1, F1, F2, A2, A3, F3.
Do not overlap builds, verification suites, profiling or another vault's work.
Three pairs are the initial limit. Two additional pairs are permitted only after
documenting a specific uncertainty they could resolve, before collecting them.

For each arm, use a preparation process with K-Plex disabled to restore and verify
the same logical checkpoint and selected-center/configuration bytes. Drain owned
preparation operations, record restoration start/end/verification times, then
close that process gracefully. Confirm its Browser and renderer identities exit.
Launch the same existing vault/profile in a new process with K-Plex disabled;
verify fresh Browser and renderer PID plus creation time. Record application
startup separately. Use the same fixed 60-second preparation-settling interval
after layout readiness in every arm, including the host control; keep its CPU
trace. This diagnostic preparation interval does not change product scheduling
or count as an indexing improvement. Continuing storage activity remains visible
and cannot be assumed drained just because the renderer was replaced.

Restore the old warm workload's actual settings: eager session, indexing before
view disabled, no popout/sidecar/document synchronization, same first Markdown
center, same companion profile. Enable the selected exact artifact and wait for
dormant layout readiness; verify no indexing admission. Arm measurement before
emitting the same three unchanged native create notifications (Markdown,
attachment, folder) and opening the Plex through `activateView()`. Record both
notification and activation markers. Keep plugin enable/setup CPU separate.
Do not call this a full-application-startup benchmark or pool its values with
the older long-lived-process reload cohort.

In the host control keep K-Plex disabled throughout, restore the same checkpoint
and configuration in the same preparation lifecycle, and mark an equivalent
foreground observation boundary after the same settling procedure. It has no
K-Plex graph-completion or semantic oracle; record that difference explicitly.
Observe it for 600 seconds after that marked dormant foreground boundary,
retaining preparation/settling CPU separately. This is its explicit comparison
window; do not fabricate a K-Plex completion event to align it.
Do not label the previous observer-disabled trials as this host control.

## Observation and controls

Keep the existing selected window visible and focused, with unchanged native
background-throttling policy. Capture power source/plan, display state and
background workloads before each arm. A changed condition is a retained protocol
violation, not grounds to hide an unfavorable run. Verify installed file hashes
and loaded plugin identity against the staged artifact before activation, and
verify hashes again afterward. Record exact source and harness identities.

Sample Electron cumulative CPU once per second, retaining **every** timestamped
process sample, PID/creation time/type, presence/birth/exit observations, sampling
gaps and memory samples. Count each process once; worker threads are already
included. Missing terminal CPU of exited processes must remain a coverage limit.
Record endpoint CPU to graph readiness and to ordinary source/URL/cache/snapshot
and scheduler closure. Do not force persistence flushes during measurement.

Observe **600 seconds after actual background completion**, not 600 seconds
after launch. Record post-completion CPU separately, including the initial 10
seconds and the later interval. Keep sampled scalar work/pending/unsaved state
and maintenance flags with bounded observation; avoid repeated database
enumeration, graph serialization, heap snapshots and per-source logging.
Timestamp any finite semantic oracle separately and retain CPU on both sides.
The warm fixture has no cold owned-source oracle loop; do not claim it does.

Observe the existing five-minute orphan-cleanup owner without changing its delay,
priority or promise identity: record schedule/reschedule, actual invocation and
settlement of `cleanupOrphanGenerations`, plus cancellation/retirement. A cleared
timer or elapsed five minutes is insufficient evidence of execution. Separate
maintenance CPU intervals from earlier tails. Restore any forwarding diagnostic
wrapper independently on success/failure; test its receiver, return, exception
and cleanup behavior before using it. Detailed profiling belongs in a separate
run targeted at the process and interval the retained samples identify.

## Decision rules and stopping

Retain the existing requirement: no repeatable material candidate-specific
post-completion CPU increase. There was no approved numerical tolerance in the
earlier record; this protocol does not introduce one to accept an unexplained
increase. Report every individual matched CPU difference and burst's measured
cost/duration, its process, frequency, overlap with the oracle/maintenance, and
whether baseline/control show the same phenomenon. Lower medians alone cannot
pass acceptance. Do not subtract independent medians or assign cause from flat
plugin counters or process identity alone.

- **A:** the three valid matched pairs show no repeatable material candidate-only
  excess, with complete ten-minute coverage and the host/preparation control
  supporting that interpretation. Recommend a scoped merge only within those
  recorded conditions and limits.
- **B:** repeated candidate excess is distinguishable from matched baseline and
  preparation/host activity, with process/path evidence supporting a regression.
  Identify the smallest correction; keep draft and request separate runtime-change
  authorization before implementing it.
- **C:** overlap/noise, incomplete coverage, unmatched preparation, unresolved
  path attribution or unavailable restart isolation prevents that distinction.
  Identify the smallest missing experiment or an explicit maintainer risk
  decision. Do not expand into more same-process trials or speculative changes.

Fresh processes remove the accumulated process heap, not physical LevelDB or OS
cache differences. The common logical checkpoint and host control test those
confounders; neither establishes identical physical storage. If restart safety is
unavailable, finish retained-trace analysis and report C with that precise
prerequisite. No runtime, SI4, settings/default, publication, recovery or PR203
changes belong to this assignment.
