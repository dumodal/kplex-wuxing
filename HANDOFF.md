# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR219 implementation in progress — M0 first

Zsolt's Codex Agent, 2026-10-25 Budapest /24 UTC. Branch `2026-10-24-canvas-mindmap` preserves latest remote specification67885e6 and normally integrates accepted main998781070a9382005154f4f884ed753280a9cf52 (#218). No uncommitted work was discarded; no force push. #218 is merged/read back, final exact-head local/native verification and CI467 passed. Its final evidence/correction is in PR218 comments6390380452/6390405634. Production builds use manifest version, not Git identity; the interim218 build-attribution claim was inaccurate.

## Scope and authority

Implement/publish #219 M0, then the complete Mind Map feature from docs/MIND_MAP_VIEW.md. Read docs/PLEX_OCCURRENCE_EDITORS.md and current architecture/capability matrix. Keep occurrence/root/attention/selection/focus independent; capacity one only; no native support claim until real R/A/B/C dirty-buffer/caret/resize/duplicate/removal/switch/popout/teardown proof passes. Preserve unchanged Compass AND off-centre non-Classic attention-following definitions. M0 is opt-in/backward-compatible.

#220 is independent after218 and may complete Wu Xing/native integration with its existing attention-following editor. Accepted settings/selector/validation and concrete overlap notice posted as220 comment6390487578. Mac owns M0/rooted navigation/bounded frontier; Windows owns classifier/property/decorations. Read partner at milestones, coordinate specific shared functions, do not reserve files or consume moving feature heads. No #219/#220 merge, release or production-vault deployment authorized. C15-C26 paused. No subagents.

## Plan and validation

Current: reconcile accepted contracts; add bounded binding owner and opt-in host policy with tests, then real shared action/scene/native host wiring, then native proof before Mind Map implementation. See the appended current checkpoint in MIND_MAP_VIEW.md. Preserve existing golden/action/Sidecar assertions and all no-extra-work guards. Node22.22.2 with real dependencies; native/browser lanes serial. Fullverify/build/scanner/exact-build native/CI required at final head. Publish coherent tested checkpoints and exact interface/evidence/limits on219/220.

## Native environment

Small restored and closed22:33:29UTC after218: original8files,77files/74Markdown/362132bytes content digest3c832485d9e14b0871813f8a17fb320211427c2e19389e345f97e1ff0a1babda; renderer exited/controllers0. Original backups and finalizer under /private/tmp/kplex-218-native and /private/tmp/kplex-218-native-restore.mjs must remain intact. Before219 native work establish fresh ownership/receipts and back up current Small; do not overwrite218 originals. User already authorizes existing disposable Small foreground checks. No new vault/personal deployment. Host1.15.0(installer1.14.0), macOS23.5.0; min/declarations1.13.0. Existing215 combined-editor/extra-tab limitations remain.

## M0 first implementation checkpoint

Added `PlexEditorBindings` owner (capacity1, detached frozen targets/dimensions, stable incarnations, explicit close transaction/cancellation), optional `PlexViewDefinition.editorHosting="occurrence"`, registration validation and session-owned lifetime/transition guard. No production definition opts in and no real native binding host exists yet.17 focused session/contracts/Compass goldens pass; architecture7/zero violations after renaming a type field flagged as global; repeated real build/scanner after the field rename also passed. Shared actions/scene validation/native geometry/rooted policy/restoration/native proof are next, not claimed.

## M0 scene admission checkpoint

`occurrenceEditors.ts` validates the unique displayed occurrence, canonical node/file path, existing opaque native file token, current visibility and injected native eligibility. `prepareViewScene` optionally takes this host proof and supplies bound dimensions plus per-measurement editor marker; legacy attention guard/layout boolean unchanged. Bound B1 is pinned through lens filtering, B2 remains ordinary; authoritative hidden/missing/stale/unsupported targets fail without attention fallback.19 focused checks, actual build/scanner/architecture pass. Renderer failure recovery must explicitly preserve/retire the bound native host; no runtime support claimed. Next: native shared actions/controller save/link routing and root-scoped session/camera/demand.

## M0 rooted session checkpoint

Optional navigation=rooted now independently owns bounded workspace roots in PlexViewSession. Root scope, camera, groups, scroll and selection survive attention changes. Initial capture/root demand uses layout effect before old attention demand release; root lease stays across ordinary attention changes and is released on teardown. Legacy definitions remain attention-scoped. Explicit setRoot refuses live bindings; guardState preflights branch state (real host registration still pending). Root passed explicitly to pure input/admission; root central sizing independent of attention.21 focused contract/session/golden tests and actual Chromium renderer original+rooted proof pass, with selected B1, nonempty retained camera, same root DOM and exact balanced3 acquisitions/releases. Build/scanner/architecture pass. No native occurrence-host support or full M0 acceptance claimed.
