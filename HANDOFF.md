# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# Wander, shared tooltips/menu and adaptive fit — validated return for authorized PR merge

Maintainer-requested implementation and equipped-agent validation. Branch `plex-wandering`, base `85edbbc8ea505651610674bded3375764ad690fa`. Preserve the earlier Wander/tooltips/menu return; this follow-up fixes navigation fitting during late dynamic indexing and untouched Excalidraw view-mode resize fitting. The maintainer explicitly requires preservation of customized Excalidraw/Obsidian Canvas transforms and pointer mapping. C14 accepted; C15–C26 paused. The maintainer subsequently authorized committing, publishing the branch, creating and merging a PR, then switching to main and fetching. GitHub commit/PR/merge identities belong in the PR and final delivery; prior validation records retain their historical uncommitted scope.

- [x] Trace current graph and drawing fit owners, native APIs and manual-input lifetimes.
- [x] Center the central node and fit bounded displayed extents; follow late layout/pane changes until manual camera input, with new navigation/explicit Fit renewal.
- [x] Refit untouched normal editor-node drawings in actual view mode through the native companion fit; preserve input/API-adjusted cameras and edit/fullscreen/disabled exclusions.
- [x] Preserve custom native geometry and pointer mapping; retain prior Wander, shared Plex toolbar, delayed tooltips and native canvas-menu work.
- [x] Complete real build/full verification, final affected tests, exact native graph7/drawing27/Wander17, cleanup audit and durable evidence.

Full `npm run verify:obsidian` passed architecture7/core88/aggregate626/UI53/portable sources333/real IndexedDB428/official lint/actual installed-type build/exact stage/native smoke. Frozen aggregate/UI arguments preceded the final initially-empty-camera, fluid-editor-resize and native-loading guards; later build/stage/smoke consumed final runtime code. Final affected83 (fit8/native wiring29/relationships46), official lint and all three native lanes passed after those guards. Final TSDoc-only edit rebuilt byte-identically. No complete final-source aggregate rerun is claimed. Failed receipts and exact evidence are in the durable record.

Customized `syncCentralEditorOverlay`, `toWorld` and native-fullscreen geometry bodies match HEAD; stylesheet unchanged from preceding return. Trusted native drawing pan at non-unit Plex zoom maps30×10 pixels correctly, and its camera survives later frame resizing. Untouched resize fits match native reference at each exact viewport. No new fork API, dependency, settings key, graph meaning, index/store/schema or network behavior. Existing companion-native opening/resize preferences remain separate.

Final SHA-256: main `81c69f9799bc681766269bd8f2e9c01554479702eae270a196128027b9c794bf`; styles `d15a037e214cab29e303054061b83b197701cfb7dfb2117308aeaa52e62765b2`; unchanged manifest/0.1.2 `0beacdb94adc4a0ec318d69dba87fcb4dc9c1a86784058db341fdefe0dfb4250`. Combined40-input ledger `438b66dce1bf3743fbec69037c1065b64e4c577fcc1aa4c7f2d07bbade383e3a`, `/private/tmp/kplex-auto-fit-source-ledger.json`;49 deliverable files. Built/installed bytes match, index empty, whitespace passed. Audit restored loaded/enabled K-Plex/Excalidraw, desktop1440×875 at(0,25), original throttling,74 Markdown files and background #0c3e6aff, with no owned fixtures/probes/UI or captured errors.

Implementation and available automated validation are complete; no remaining implementation ETA. Prioritized manual checks: physical Android/iOS navigation versus manual Plex/drawing pinch/pan and touch controls; Windows/community themes with narrow/docked Plex and a popout drawing, checking untouched resize fit, manual-camera preservation and pointer alignment at non-unit zoom. Main-window Electron geometry/input does not prove physical touch, every platform lifecycle or perceived paint. Prior OS menu/color-picker and Wander large-vault limits remain in their records. No further scope queued.

Durable records: [current adaptive fit](docs/validation/adaptive-fit-2026-10-11.md), [prior tooltips/menu](docs/validation/control-tooltips-and-canvas-menu-2026-10-11.md), [original Wander](docs/validation/wander-2026-10-11.md). Existing suggested future menu additions (Fit graph, Configure layout, Filters/Graph Lenses) remain outside the canvas-menu implementation.
