# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #174 — F2 validated, D2 integration and V pending

Branch `2026-10-17-local-folder-diagnostics`, HEAD `786e91c` before the F2 checkpoint. #173 merged at `23aa44e`; #164 closed with the requested comment. Main integrated without rewriting history at `d4d65cd`. Keep #174 draft. No merge, ready, release, personal-vault access or raw publication.

F2 source/main/test/package hunks are staged independently of overlapping D2 working-tree changes. Do not stage all until F2 commit/push completes. Exact staged export `%TEMP%/kplex-174-work/F2-index-build`, patch SHA256 `671fd2666c9aa94ee5d6bd8a29b5c8a26308ff06015fc41988bdc423ec81d1bd`, has actual types, lint, production build, indexing/main fixtures and 36/36 browser/real-IDB tests passed. D0/F1/F2 frozen-driver native trials all complete with exact fixture/config restoration and dedicated610s quiet passes. F1 efficiency fails because its extra absolute opening deadline excludes the real70ms wave; preserved. F2 uses existing per-cause deadline with pre-rearm expiry guard. Eligible checks92→2, transactions1526→78, source digests1499→58, native CPU2327→469ms and drain5977.5→1684ms in one inclusive observation. Bounded F2 repetition also local:2checks/58digests/77tx197req/406msCPU/1689.9msdrain. No universal speed or memory claim. Frozen private driver untouched. See consolidated report for limitations.

D2 is applied UNSTAGED: shared owned-safe capture in both exports, bounded health and current work facts, runtime build ID, actual lifecycle coarse hooks, readiness-reader purity, eight locales.48 focused tests, installed types, affected lint, production build and corrected main/indexing fixtures pass. Independent source review finds no confirmed new privacy/passivity/retention defect. Root dist is integratedD2+F2 but Small still has F2-only. No native/resource lane currently active.

Next: commit/push isolatedF2 plus current report/ledger/handoff. Finish small cleanup review of reusable untracked localFolderWave tool; agent properties_trace is offline-reviewing it. Stage integrated exact artifacts, run real supportReport/CopyIndex main+popout and reusable ordinary/Excalidraw/create-fill-rename acceptance, #172 heldP3 and #161 lanes serially. Re-run exact finalD2 owner benchmark/memory/copy then full verify with KPLEX_HOST_REPORT_DIR (verify ignores --report-dir). Native two-hour reviewed private soak `%TEMP%/kplex-174-work/native-indexing-activity-soak-reviewed.mjs` SHA49e8389841490de9337f392e73a87f71e4cb7e43e0840c810937344f03145830 is unexecuted. Run after final code freeze; no native/browser/resource overlap. Real24h/mac/mobile remain pending.

All evidence originals remain private under `%TEMP%/kplex-174-*`; D0 strict native smoke also `%TEMP%/kplex-obsidian-QUYpZD`. Final durable private backup outsideTemp must verify file hashes, skip node_modules junctions and HANDOFF; do not delete originals/publish. Remove temporary plan marker only at closeout. C14 paused. Root handles all native/browser/Git. Node22.22.2 viaTEMP installation; use explicitSmall vars. Sandbox launch currently errors1909; authorized shell work requires require_escalated. Agents must not run native/browser/Git/heavy lanes. Full final verification, D2/V checkpoint commits/pushes, docs/PR actual outcomes and separateF/D decisions remain.