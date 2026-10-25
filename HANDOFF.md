# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR219 implementation in progress — M0 closeout, then Mind Map

Zsolt's Codex Agent,2026-10-25. Branch2026-10-24-canvas-mindmap, current published4b3addf87f324b5ee2be3510095a9c32ee9c9b14 above accepted main998781070a9382005154f4f884ed753280a9cf52. User authorizes implementation/publication, not merge219/220/release/production deployment. #218 merged/read back; final head e7bc550 passed full local/native/CI467. #220 independent and may complete Wu Xing using unchanged attention editor; no M0 adoption or acknowledgement gate. C15-C26 paused; no subagents.

## Current implementation

M0 published foundation726a057, admission9e7cb86, rooted5cae146, native17b7bc4, controls/harness4b3addf. Capacity one; optional editorHosting=occurrence and navigation=rooted are independent/additive. Shared expand/collapse/resize, exact canonical/native binding, root-scoped state/demand/camera, per-occurrence dimensions, stable native host, bounded intent restoration and save-aware close are implemented. Production still Compass only. M1-M3 Mind Map unimplemented. Preserve Classic/off-centre attention definitions and all existing guards.

Uncommitted correction: authoritative-hide+failed-save previously left retained native buffer visible. Failed attempt6 proves it. Shared exact-document helper now also drives removal; excluded/stale editor remains mounted but hidden/inert, and recovery status dispatches existing localized Close action. Attempt8 strictly serial12-case native pass confirms preserved buffer/instance and actual recovery action. New main hash4687f9b7854e08947cce40f20a0bf9b5774556fbbf6719c8019ee9a2594c0877. Attempt7 exploratory overlap/stage timeout retained, not acceptance.

## Validation and limits

Original native8 passed; external-Vault mutation/teardown11 passed; stronger removal recovery12 passed after concrete source-work settlement before reopening (no retries). Healthy no-save-fault M0 control passed actual FileManager renames with clean cache gate. Original longer injected-save-failure sequence stalled before physical FileManager rename and normal cleanup timed out; independently restored Small. Exact causal step remains unproven; no index/cache/scheduler alteration justified. Existing215 combined-editor/two-Sidecar and extra-tab limitations remain. Physical Windows/mobile/full-app restart/multiple editors unproven.

CI40144149938 on17b7bc4 failed9 source-extraction context/wiring assertions; corrected78 checks pass. Clean4b3addf full verify:obsidian passed7 architecture/130core/1458functional, failed2/241browser context fixtures (group sceneScope, attachment legacy policy); corrected8 group and1 focused attachment checks pass, all assertions retained. New runtime correction passes49 focused,12 actual browser, build/scanner/architecture. Full exact-head verify:obsidian/CI pending next commit. Original sandboxed verification failed listen EPERM; use require_escalated for browser/native checks. See docs/validation/occurrence-editors-219-2026-10-25.md for all ordered samples/logs.

## Native ownership

Small currently OPEN only for authorized checks, renderer40813. Original8 files/content backed up under /private/tmp/kplex-219-native/backup and original.json; finalizer /private/tmp/kplex-219-native-restore.mjs. Do not overwrite these or older218 backups. Original77files/74Markdown/362132bytes, sorted digest36372292bd7d6d60f52dfe7eccacc4e56d223bdf602c8f0f8614502357cff162. Latest normal probe cleanup passed/controllers removed; staged plugin artifacts remain test-owned until final restoration/close. Host Obsidian1.15.0(installer1.14.0), Darwin23.5.0, Node22.22.2 (native renderer Node24.18.1). Browser/native drivers strictly serial; a stage must finish before next native probe. User already authorizes Small foreground. No personal/new vault.

## Next

Rebuild after TSDoc-only additions, confirm same4687 runtime hash, publish correction/report and notify219/220. Run clean-head full verify:obsidian (real dependencies, Node22.22.2, permission for loopback), then native12-case lane serially, exact-headCI. Recheck main/partner milestones; do not treat old head checks or skipped checks as final. Restore Small original files/content/closed flag via guarded finalizer. Only then record bounded M0 acceptance and proceed Mind Map M1-M3 through canonical bounded frontier demand; no new indexing machinery. Keep commits independently reviewable. Windows property/decorations interfaces remain its ownership; last read production220 head22ae6e8. No consumption of moving partner branches.
