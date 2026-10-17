# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #174 — final validation return

Main-agent implementation/review is complete through runtime D2 d6be473; documentation head
before final V is c12c369. Branch: 2026-10-17-local-folder-diagnostics. #173 merged at 23aa44e,
#164 closed with the requested comment; main integrated without history rewrite at d4d65cd.
D0 786e91c / F2 b4bb401 / F3 ebe26cc / D2 d6be473 are independently reviewable.
Keep #174 draft. No merge/release, personal-vault access, branch deletion or raw publication.

Full Node 22.22.2 verify:obsidian passes: architecture 7, core 128, main 960, UI 131, sources 334,
browser sources 598, zero failures/skips; installed types, core boundaries, official lint,
production build and exact Windows smoke. Runtime D2 CI passes in 26m52s and c12c369 CI in 32m8s.
Final documentation needs only content/link/whitespace/diff checks and final pushed-head CI.
Exact main SHA-256: d46b370199b0a2b06347266308e539f3a71a9e83459d50934be4b38bbc067ebc,
built at ebe26cc plus archived D2 patch a52fe34a0be2f1ed658be6d12a7194c2c257f840e983f349d7316d528e094e78.
Runtime/tooling remain unchanged; final CI is recorded in the PR after completion.

F2 reduces the eligible frozen combined wave from 92 to 2 source checks, 1,526/2,920 to 78/202
transactions/requests, 1,499 to 58 digests; both read/parse once, with zero full/catalog builds or
snapshot saves. Inclusive CPU/drain improve in that observation, sampled memory is higher and no
universal speedup/memory saving is claimed. Exact membership/identity/epoch/CAS/finality and
conservative fallback remain. F3 fixes absent-head retirement without erasing newer rename intent.
D adds bounded coarse accounting/shared safe exports/O(1) health/eight-locale disclosure. Independent
amplified cost is ~0.55 microseconds/pass pair; observed diagnostic data-root cut 16,816 bytes.
No receipt/schema/parser/compiler/scheduler redesign, per-file hot instrumentation or idle resource.

38 focused real-IDB cases, #172 held-P3 and #161's 28 variants pass. Final 610-second quiet,
ordinary Markdown, actual Excalidraw and create/fill/rename pass with exact cleanup.
The maintainer-authorized real two-hour retry now passes 120.34 minutes, five natural edit/drain/
capture checkpoints and 235 unchanged-idle controls/240 foreground samples. It owns and releases
a temporary display-awake lease to prevent the existing 15-minute host timeout; no settings,
simulated input, throttle or focus oracle changes. All earlier failed controls remain evidence.
Startup retention/privacy/capacity/capture purity and exact restoration pass. Same aged session
then passes 23 actual Settings/main/popout report cases; summaries 4,758 bytes, index reports 6,438.
Optional real clipboard writing remains pending to preserve rich formats; controlled distinct-owner
commands and earlier plain-text native control pass. No active native/resource lane remains.

F: ship within eligibility. D: ship with platform limitations, for independent review. Actual 24-hour
Windows use, macOS popout/copy/interrupted folder waves and physical Android/iOS suspend/resume,
clipboard/memory remain unrun. Next action is maintainer review, not more optimization.
See docs/validation/local-folder-diagnostics-174-2026-10-17.md and docs/INDEXING_DIAGNOSTICS.md.
The original verified private evidence remains immutable; the separately verified final-evidence-soak-complete copy
preserves the completed soak and aged report (1,748 files / 105,424,389 bytes; all entries and
1,745 source originals independently rechecked). Manifest SHA-256:
d32a6e8df72e67d322966bc2fe817ec3a8bd87f67acd6e3b33e20d249eafb077. No originals are deleted; never archive handoffs.
