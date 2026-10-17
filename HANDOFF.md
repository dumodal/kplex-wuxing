# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #173 - implementation returned for draft review

Branch: `2026-10-17-issue-164-safe-plex-folding`. #172 merged at `ef301dc07fa6a8754455a6aeb94ae871d2aacd75`; #161 closed with the requested comment referencing #172. Main integrated without rewriting history at `2735550a28b7ad16a68da1df2a0cac4ad9845217`. Animation prerequisite checkpoint `75ac2ab` pushed. Feature checkpoint prepared below; keep #173 draft and #164 open. No merge/release/branch deletion/personal-vault access.

## Returned implementation and review

Stable fold action/command now toggles a graph-independent captured native pair. Existing Sidecar/fold maps remain sole ownership inventories. Exact generation/revision/window/group/ancestry fences, finite native picker, complete-group recovery, restore-before-release/reveal/migration, four edges, overlap/disjoint ownership and a proven late-startup-adoption race are covered. New folds deliberately require two direct native groups in an isolated split; unsafe layouts stay expanded. Native model/flex/dimensions are untouched. All eight locales and user documentation updated. No index/source/parser/settings/schema/scheduler changes; C14 structural refactoring remains paused.

Offline agent source review and independent main review found no additional concrete source blocker. Runtime tests exercise production owners, and UI tests compile real components. Main reviewed ownership, async fencing, architectural seams, lifecycle/document cleanup, native types, localization/accessibility and paint-versus-semantic boundaries. Automated verification supplements rather than replaces that review.

## Actual evidence

Only authorized disposable Small (107 files / 88 Markdown), Windows 10.0.26200 / Obsidian 1.14.4 / Electron 43.3.0 / Excalidraw 2.29.0; Node22.22.2. Final artifact SHA-256 `8d20bf308e935f353a9eea24256d44838b33863cd6d99d7b00ed056e7459e8c1` matches strict staging.

Full `npm run verify:obsidian` passes: 937 portable, 131 general Chromium, 334 source-contract and 560 source-browser tests; architecture/core, installed types, official scanner, production build and strict native staging. Persistence passes all five checks including trusted asymmetric native divider drag, live disable, enabled/disabled reload, and actual selected-renderer interruption with a new PID followed by disabled startup. Both groups remain reachable at the same native share. Configuration/runtime and note inventory restore, no errors. Full application/OS restart is separate.

The final-artifact matrix passes 36 functional checks, but runs nine/ten/eleven capture Obsidian's zoom-status exception during companion popout close. Simple no-fold controls and a matched matrix omitting the preceding fold are clean: this does not prove the exception unrelated. The helper-only control removing diagnostic child-realm remote proxies still passes all36 functional checks and reproduces the same zoom-status exception; exact closed-window and native-leaf-removal assertions remain. Do not suppress the error or claim native overall acceptance unless the final lane is clean.

Existing display-mode lane passes after correcting its proven Mac-only chrome assertion for Windows. Sidecar navigation passes38 samples. Existing broader action lane's semantic Mod transport was corrected for Windows; 13 groups pass before explicit F1 recorder assertion fails. Relationship workflow stops at Wrong child target/storage on both final and merged-#172 baseline; final artifact restored afterward. These partial lanes remain explicit, not accepted passes.

## Evidence and next owner

Curated source/artifact/driver/results/limits: `docs/validation/safe-plex-folding-173-2026-10-17.md`. Raw originals and failed controls retained in `%TEMP%/kplex-173-*`; final closeout records a verified private backup outside temporary storage. Do not publish private configuration/raw evidence or delete originals. All native drivers run serially with the three explicit disposable-vault variables. No active portable/native suite should overlap another.

Remaining acceptance: settle native popout-close error and broad action recorder gap; physical desktop group dragging/multi-monitor; full application interruption/restart and macOS/Linux/physical tablet lifecycle/touch. Never infer physical-device or perceived-paint coverage from Electron automation. Native repository management remains root-owned. Commit/push checkpoints within standing user authorization, update #173 with real outcomes, keep draft/#164 open. Do not resume receipts/reader optimizations or C15+ refactoring.
