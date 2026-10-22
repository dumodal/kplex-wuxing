# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR201 Windows tail assessment returned: conclusion C

Updated2026-10-22. Main validation agent to maintainer. Branch:
2026-10-21-indexing-cpu-reduction. Entry local/remote/head clean at
fa08e60e1a7122f8b37fcd11c943b883317b6ae8; subsequent documentation commits do not
change that runtime candidate. Baseline551a3b52895484de3dd41e5c6eb2fa8c6712fec4.
Candidate CI39772386240 completed/success. Keep PR201 draft; no merge or release.

Production remains frozen. Built/installed main SHA256:
c39fb4876315a3348b782fe91400398faab1f98de8c0852eb9cc06bf24509a58.
Startup backlog/parser-input reuse/bounded source-head validation/corrected SI4
are unchanged. Existing exact-artifact correctness evidence is reused. PR203's
branch, candidate, Mac investigation and instructions are unchanged and not awaited.

[Durable report](docs/validation/indexing-cpu-201-2026-10-21.md) now leads with
individual retained interval analysis. [Fresh-process protocol](docs/validation/indexing-cpu-201-windows-protocol.md)
is prepared before new collection: disabled-plugin preparation/host control plus
three alternating warm pairs, fresh Browser/renderer per arm after checkpoint
restoration in a preparation process, same Small/profile/notes/settings/center,
continuous timestamped process samples, normal orphan maintenance,600seconds after
actual closure. No new tolerance, forced GC, global storage reset or optimization.

Expensive post-completion intervals are mainly target renderer5588:
F3 total7.402648CPU-s/renderer6.600835; F5 total7.686786/renderer6.896267;
baselineA4 total7.532488/renderer6.770506. Browser costs approximately0.7CPU-s.
Observer-disabled F2 total8.302269/renderer7.450946 and A3 total2.955637/
renderer2.071459. K-Plex remained enabled in those observer controls; there is
NO historical disabled-plugin host control. Flat endpoint work/unsaved/debt and
similar baseline bursts establish neither plugin independence nor a product cause.

Old sampler discarded the individual1second series. Endpoint brackets establish
where CPU accrued, not exact burst starts/durations/gaps/process exits. Warm oracle
loops own no sources/hub; completion-to-idle bookkeeping/IPC costs are separately
small. Checkpoint import duration/separation was not captured; physical DB and
heap equivalence unproved. Five-minute orphan cleanup remained queued at all
30second endpoints; actual invocation/settlement and ten-minute cost unmeasured.
Private audit JSON SHA256d9c9a72ee34884a9786645da054118d0bf14cf57d18cfa696ed8015b2cb8c3cd
and siblingMD/script live under TEMP/kplex-pr201-tail-interval-audit*; raw traces private.

New matched measurements: NONE. Native process inventory showed excalidraw-test
and the Small session in the long-lived Obsidian instance. Required confirmation
that all other vaults were saved/closed was requested but unavailable at checkpoint.
No application-wide restart or substitute same-process batch was attempted.
Prerequisite: maintainer saves/closes all other vaults and confirms only Small,
then agent independently verifies windows and runs the seven-arm protocol.
Allow >=70minutes observation plus preparation. Pending confirmation is not consent.

Conclusion C: no repeatable candidate-specific regression has been established,
but absence has not been demonstrated. Keep draft and complete that comparison;
merging now needs explicit acceptance of unresolved tail risk. No product defect
cause or smallest runtime correction is established, so do not change production.
Do not expand into storage/scheduler redesign,50% target or the PR203 real-vault task.

Read-only native sanity2026-10-22T17:12:19.997Z passes: C39built/installed and
source hashes match,107files/88Markdown,no fixture/controller/debugger,pluginenabled,
zero unsaved/acquisition/body writer debt. No host mutation/harness/cleanup/runtime
change occurred in this follow-up; original restoration remains untouched.
Documentation links/content/whitespace and byte-preserved standing-header checks
are the affected lane. Earlier2682-execution full verify and specialized native
correctness remain scoped to their recorded immutable artifact; not rerun here.
C14 accepted; C15+ paused. Saved documentation commit and publication are recorded
in PR201 and the delivery message. Await restart prerequisite or maintainer risk decision.
