# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Return: dependency-count reuse ? PR #204

**State/direction:** Local validation complete; main agent publishing the reviewed checkpoint for maintainer review. Keep draft; no merge/release. Prepared 2026-10-23 by Zsolt's Codex Agent.
**Branch:** 2026-10-23-dependency-count-reuse.
**Accepted base:** main@cd12a857c1c2c89c2d13f6c6b2a3e1a5203d5ffa, including merged #201.
**Durable evidence:** [dependency-count reuse validation](docs/validation/dependency-count-reuse-204-2026-10-23.md).

## Implementation and review return

All production changes are confined to src/index/SourceRepository.ts. Matching ordinary replacements authenticate bounded original rows, recompute their ordered digest and validate selected ledger multiplicity before the existing activation transaction rechecks predecessor/owner/local-state revision, staging and ordinary ticket fences. New source facts/head/families/owner/sequence still publish. Existing private reclaim drains old membership rows before return and remains crash-resumable. Changed/uncertain states keep normal repair. No schema, scheduler, concurrency, defaults, parsing or semantic policy changed; optional alias failure semantics remain separate.

Source SHA-256: 951ce4e86ad1bea9b86a53d7efad1c2e4375e3eda38e220b4933409510a337ef.
Final built/installed main.js: 46bcd36b14291169465f98f0c2635ffb331d576eb84177d1e030281a90dc15d1.
Baseline main.js: 608b2dd34e98ac84d117ebeb86d8cd287e26b3f34b8302a0f1ee7e72c9a53194.
Manifest/styles hashes and exact browser bundle/source identities are in the validation report/private receipts. Production output is unchanged by this documentation/tooling checkpoint.

## Actual evidence

- Corrected full cohort: all 30 real-Chromium arms passed; corrected late control: all eight passed. Representative three matched 128-owner pairs reduced renderer CPU by 31.8% unchanged / 24.2% mixed, complete-maintenance elapsed by 26.4% / 19.3%. All old memberships and retired source/family rows are included. Redundant key writes 4,984 to zero; mixed retains exactly 1,246 required writes. Every restart/edit oracle found zero debt.
- Initial design failed the late-change control (+20.4% median CPU). Retained unfavorable evidence led to post-staging equality gating. Corrected changed projections perform zero authentication; median late-control CPU is essentially unchanged, with a slower individual elapsed arm retained. Small later reopen/edit elapsed increases and unequal starting heap samples remain documented.
- Actual Small Vault edits advanced eight source revisions with matching 128 memberships; final diagnostic authenticated/reclaimed all 128. Across eight matching edits plus one changed URL, key writes were 288 baseline versus 32 final. These diagnostic counts are not native CPU measurements or a private-vault hit rate.
- Node22.22.2 full npm run verify, installed Obsidian types and production build passed; six lane totals 7/130/1333/227/357/679, zero failed/cancelled/skipped. Strict exact-build deployment/render/error receipt passed. PowerShell wrapper status1 from redirected npm stderr notices is retained and explained in the report; child verification and runner receipt passed.
- Focused real-IDB11/11 plus final harness3/3 passed. Covers shared/repeated keys, physical old-row/digest/ledger corruption, byte pages including UTF-8, changed fallback, competing connections/CAS, unsaved/legacy/pending state, cancellation/close/storage failure, reclaim/reopen/edit/deletion. Independent/main source review found no remaining defect.
- Exact46bcd36b Windows native checks passed: normal acquisition diagnostic; two expected diagnostic faults with independently verified cleanup; SI4 Small settings; SI5 five recovery cases and three warm plugin reloads (heads unchanged, zero semantic read/parse); foreground inventory; actual On-demand live updates/Find before held unrelated work; gate counts; rename; stationary startup ontology updates. The first live-update attempt failed its Eager-profile prerequisite; a fresh actual required-profile run passed and original settings/configuration bytes were restored.
- Existing guarded Small remains 107 files/88 Markdown notes. Final checks find index ready, zero pending source work, only Small open, no JavaScript errors and exact artifact still installed. Native baseline diagnostic used Obsidian1.14.4; a user-authorized graceful restart loaded1.14.5. CPU cohorts used identical Chrome155.0.8059.82 and were finished before reopening Small.

## Ownership, cleanup and limits

Main/offline review preserved C14 ownership, bounded storage, primary journals, multiplicity, per-file publication and existing source/acquisition/recovery boundaries. New test helpers use existing portable/browser/native process/target guards. Native pass now requires all independent cleanup owners and confirmed controller removal; outer transport failures cancel/join owned cleanup with a bounded lifetime. Normal and deliberate fault runs verified these paths. The temporary plan marker is removed.

Raw traces/source snapshots/builds remain private TEMP under kplex-204-validation, kplex-dependency-count-reuse-lDO9Af (corrected full), and kplex-dependency-count-reuse-wbKzGF (corrected late). Do not publish vault data or raw logs. Other historical failures and receipt identities remain in the durable report.

Renderer CPU excludes Browser/storage-process CPU; no exclusive-store CPU, allocation/true-peak, equivalent physical storage/OS cache/heap or whole-vault saving is established. Windows automation does not prove physical touch/mobile/Mac behavior. This is a narrow dependency-count improvement; the broader indexing CPU objective remains open.

PR #203 and its Mac experiment, branch, candidate selection, instructions, files and agent are completely untouched. No measurements were requested from it.

## Next action

Verify this branch's publication and CI at its final head; record the actual checks in draft #204. Maintainer reviews the scoped improvement and stated limits. No further optimization, merge, release, main writes or #203 work is authorized here. This handoff remains transient; overwrite this body for the next assignment while preserving the standing header.
