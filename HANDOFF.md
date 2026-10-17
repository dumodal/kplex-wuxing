# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #174 — local folder waves and day-long indexing diagnostics

Assignment prepared by Zsolt's Codex Agent, 2026-10-17.
Branch: `2026-10-17-local-folder-diagnostics`; starting main: `ef301dc07fa6a8754455a6aeb94ae871d2aacd75` (includes merged #172).
Draft: https://github.com/zsviczian/kplex/pull/174

**Status:** Implementation authorized. No #174 runtime correction, diagnostic implementation or measured benefit yet. Read the latest PR description, current branch/source, AGENTS.md, CONTRIBUTING.md and docs/AGENT_WORKFLOW.md before work. Prior #172/#161 fixes are accepted baseline. Main was fetched after the maintainer-authorized #173 merge (`23aa44eae13797a93890fd1ce1679074d45d9295`) and is being integrated here without rewriting history. #164 is closed with a comment referencing #173. The prior folding return remains durably recorded in `docs/validation/safe-plex-folding-173-2026-10-17.md` and `Refactor plan.md`; its private evidence remains untouched. This single transient handoff now carries #174's assignment, as required by the standing header. Do not modify main.

## Two separable checkpoints

**F — qualify a new-empty-folder + note creation wave.** Existing sourceAcquisition event coverage must prove a safe local pathway, preserving all ambiguous/unknown, nested, concurrent, expired, rename/delete and extra-resolved fallbacks. Measure unchanged versus qualified/fallback source visits, digests, IndexedDB transactions, CPU and true drain using equal inputs. Do not suppress folder uncertainty without a correctness proof.

**D — shared indexing activity summary** for *Copy Index Diagnostics* and *Report bug*, retaining session totals and bounded hour-level / recent-pass cause summaries through at least 24 hours of one plugin lifetime. No detailed profiling by default. Privacy: fixed allowlisted reasons/counters only; never retain or export private names, paths, content, URLs, raw errors, queries or durable IDs. Local, session-only, voluntary sharing; no upload or persistent trace. Both reports must share the same sanitized projection and obey the existing 32 KiB final-output budget.

## Diagnostic overhead — revised maintainer decision, superseding PR #174's former 0.5% ceiling

**Do not treat 0.5% (or any percentage) as a permitted performance budget.** Diagnostic bookkeeping should be effectively free in idle and absent from indexing hot paths. The old `<0.5% cumulative CPU` criterion has been withdrawn.

- Idle: **no new activity whatsoever** — no timers, polling, watchers, OS sampling, I/O or wakeups.
- **No new per-file, per-link, per-evidence-record or per-IDB-operation instrumentation**. Reuse counters already computed by existing code. Do not add timestamps, strings, allocations, serialization, owner sets or hashes in those loops.
- Only fixed-size scalar counter/slot updates at coarse pass, phase, invalidation and completion boundaries; reuse existing timestamps where possible. Avoid callbacks, logging, scheduling or presentation notifications owned by diagnostics.
- Keep state bounded across 24h+/event storms; do not allow long history, private IDs or copied graph/source objects. Retain startup totals and first-global-invalidating reason without turning on detailed owner/overlap tracing.
- Build, sanitize and serialize the report **only when the user explicitly copies** it; benchmark copy latency separately. Report generation must be passive: no vault enumeration, metadata acquisition, DB access, work admission, mutation or freeze/reset.
- Demonstrate cost by **amplifying the exact boundary-update implementation** against a no-op on the same runtime, reporting **absolute additional CPU time, allocations, retained memory, and actual update-call frequency** on realistic scenarios. Use a low-instrumentation native sanity control to check no added reads/parses/IDB work/builds/saves, no change to scheduler or foreground behavior. Native timing noise alone is not proof of negligible overhead.
- Any unexpectedly material cost must be explained and removed or diagnostic scope reduced. Do not let an indexing saving from F mask cost added by D. No numerical allowance is a target to spend.

## Delivery and validation

Follow PR checkpoints D0 (minimal safety schema and measured passive observer), F1 (proven narrow local path), D2 (24-hour bounded reports), V (separate resource/privacy/correctness judgments). Present independent **ship / revise / defer** recommendations for F and D. Document coverage gaps honestly: accelerated clock tests are not 24 hours of actual native use.

Run required Node 22.22.2 `npm run verify`, installed Obsidian typing/lint/build, relevant real IndexedDB and exact-build native tests. Use only approved disposable vaults; do not access the personal vault, contact users, merge, release or mark ready. Keep the current branch and draft PR. Preserve this standing header; replace this assignment section during the next agent handoff. Remove only the temporary `docs/agent-handoffs/local-folder-diagnostics.md` plan marker at PR closeout; never delete root HANDOFF.md.

