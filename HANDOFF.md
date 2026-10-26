# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR222 node controls, editor switching and clarified Enter defaults

Starting published checkpoint325c6a4. The maintainer requested an on-node lower-right disclosure, editor buttons on eligible notes across views, automatic save/close/open when choosing another editor, and reachable parent-area editor controls. Latest keyboard steer: Enter centers (Mind Map reroot); Control/Command+Enter opens a new native tab; Alt/Option+Enter folds. Explicit custom bindings remain authoritative. Full regression/CI remains deferred; keep PR222 draft/open/unmerged.

Implementation retains shared owners. The16px glyph straddles the node corner like its editor button. Its44px touch target extends outward; only the visible glyph overlaps its own body, and existing measured clearance protects neighboring notes/gates. Attention views center the chosen note through accepted navigation and use their existing editor; occurrence hosting stays opt-in. The existing editor.expand action serializes explicit switching through native save/close, reacquires the same displayed occurrence and native identity, and refuses stale/retired/concurrent requests. Failed saves retain the old binding/buffer. No second editor, writer, parser, renderer or metadata owner. Capacity stays one; root-removing navigation/fold guards remain.

Area editors retain their normal clip, native document host and resize/zoom lifecycle. Their toolbar is inset into the visible area with measured clip offsets, rather than extending above the clipped body. Native content reserves toolbar space. Default shortcut generation3 migrates inherited versions1/2 without overriding explicit keys or previous accepted conflicts; Shift+Enter has no new graph default.

Targeted portable/browser checks and production scanner/build are recorded below at publication. Narrow exact-build Windows acceptance is next, including actual save failure/recovery, replacement, all-view buttons, parent toolbar hit targets/close and clarified Enter/new-tab/fold input. Physical touch, macOS and minimum-host remain separate. Do not treat the older85b79b2 full3229/CI560 or325c6a4 native13 as evidence for these new changes. No production observation/deployment/write.

Checkpoint on Node22.22.2/real dependencies: **98 targeted checks PASS** across editor transactions, shared canvas mouse/touch controls and all-note buttons, clarified bindings and v1/v2 migration, native host defaults and camera behavior. Installed types, official source scanner and real production build PASS. Initial new-test corrections supplied the actual original native file in the same-binding fixture and measured the visible16px symbol independently of a touch-capable host?s larger button. No product/assertion/deadline weakening. Windows lane pending.

## Canonical facade correction

The c4e6c88 Windows run exposed a real shared admission issue: normal metadata publication can replace a canonical GraphPage facade while the visible occurrence still holds its previous facade. Diagnostic booleans confirmed that native identity, path, visibility, filter and area admission were all valid; only JavaScript object equality rejected it. The editor action now reacquires current canonical facts while requiring the same displayed occurrence, path and exact native file. It also rejects a physical rename under a still-stale semantic page. This does not change relationship-write/provenance authority or other consumers. No guard is bypassed on a changed native incarnation, hidden/filtered/missing occurrence or retired request.

Final Node22.22.2 focused suite: **101 PASS**, zero failed/cancelled/skipped, including cached-facade replacement plus native replacement, physical rename, current filter/visibility/area and stale-target assertions. Official touched-source scanner and real production build PASS. Temporary boolean diagnostics were removed from source and the built main.js; search confirmed absence. Exact-build Windows acceptance follows this correction.

Earlier Windows attempts are not complete passes. They separately exposed a stale Shift+Enter driver call after the Alt-only steer, a toolbar locator expecting aria-label instead of the existing aria-labelledby accessible name, and typing before native ready state. The driver now uses Alt, actual accessible names, and explicit native readiness/DOM focus. The save/replacement/content/caret and hit-testing assertions remain. Native diagnostic runs are not acceptance receipts; all attempts restored9configs/117content/original live workspace/window/digest, latest19:34:32.700Z.
