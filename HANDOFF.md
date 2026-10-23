# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR201 Windows performance acceptance — completed return, conclusion C

Main validation agent: Zsolt's Codex Agent. No active experiment or automatic
optimization follow-up. PR201 remains draft for the maintainer's merge/risk decision.
PR203's branch, candidate, instructions and Mac real-vault investigation were untouched.

Branch: 2026-10-21-indexing-cpu-reduction. Entry tooling/docs head: 8309371.
The commit containing this return changes only harness/tests/documentation.
Runtime baseline 551a3b52895484de3dd41e5c6eb2fa8c6712fec4 and candidate
fa08e60e1a7122f8b37fcd11c943b883317b6ae8 remain pinned. Built, measured and restored
candidate main SHA256 c39fb4876315a3348b782fe91400398faab1f98de8c0852eb9cc06bf24509a58.
No runtime edits/builds; startup-backlog, exact parser reuse, bounded source-head
validation and corrected SI4 are unchanged. Existing exact-artifact correctness
and successful pinned-runtime CI remain applicable.

Durable evidence: docs/validation/indexing-cpu-201-2026-10-21.md (new result first,
all prior checkpoints/failures retained); predeclared protocol is linked there.
The maintainer confirmed only Small remained open. Native guards verified one
recognized Small window before graceful application restarts; no forced kills,
new profiles/destinations, global storage resets, forced GC or scheduling changes.

Final cohort: host,A1,F1,F2,A2,A3,F3, serial fresh Browser and renderer lifetimes,
common authenticated logical checkpoint, separate preparation-process import,
60-second settling and unchanged warm activation. Normal maintenance entered and
fulfilled once per A/F arm near five minutes. Process/presence/CPU/memory/scalar
traces and wrapper retirement are retained privately. No detailed profiler ran.

Scenario collection and cleanup passed; acceptance remains open. Each arm
misses terminal CPU for an exited GPU; every acceptanceEligible/comparable flag
remains false. F2 also has 74 focus violations/65 hidden samples, four 46–60-second
gaps and a 657.029-second tail. Other six arms have no measured visibility/focus
violation. Actual post-tail F-A: -.038022,+.524616(unmatched657vs600s),-1.116261
CPU-seconds. No repeated candidate-specific excess or causal product path was
established. Old expensive tails were mainly selected renderer and also baseline;
new small 2–4-second renderer bins occur in both arms. Maintenance is separate.
Do not relabel passed collection as A, discard F2 or invent a tolerance/cause.

Stop C at the declared bound. No extra pairs, runtime fix or Windows adjustments.
Smallest next step is an explicit maintainer risk decision for a scoped merge.
Clean acceptance would first require stable foreground and independent terminal
process-CPU coverage, with controlled observer overhead, before replacement work.
No such additional experiment is started or implicitly authorized by this return.

Private root: TEMP/kplex-pr201-resume-windows-fresh-20261022-4; summary SHA256
88aa83805f20a760be071a21e3faf267d62832c0062d04e636c28db882e91ee4.
Earlier preflight and two cancelled baseline cohorts remain separate/private.
Original DB capture/restore/verify SHA c7f9185504f4703425854e62ac8f25fb0ec46f8048290fd00f81023e85f35600.
All 12 JSON files byte-restored, original layout/plugin/C39 artifact restored,
107 files/88 Markdown, zero source/cache/unsaved debt, no controller/debugger and
all test-owned display requests released. Native cleanup receipt passed.

New source: indexingFresh.mjs, Host, Scenario, Observation, Guards under
scripts/testing/obsidian; four focused test files are wired into npm test.
Main reviewed serialization, lifecycle/guard/cancellation ownership and TSDoc;
33 new and 45 existing runner/checkpoint/transport/probe executions passed on Node 22.22.2.
Syntax/whitespace/header preservation and unchanged runtime/artifact checks pass.
No full functional matrix repeated; exact C39 evidence is reused as requested.
Raw traces stay private. Git/PR publication status belongs in the PR/final return;
keep draft, no merge/release/history rewrite or automatic C15/refactor continuation.
