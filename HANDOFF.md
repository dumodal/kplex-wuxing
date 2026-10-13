# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# Validated Sidecar and status improvements — publication handoff

Direction: main validation agent → maintainer. Repository zsviczian/kplex, branch PR-cleanup, implementation base 186aec3aa6565a7014897b206c1f8cc0e9b9dba1. The maintainer explicitly authorized committing/pushing these session changes, creating/merging their PR, switching to main and fetching. This document captures the validated pre-commit checkpoint; Git and the PR supply the final publication identity. Structural refactoring stays paused at C14.

## Changes prepared for publication

- Explicit directional attachment of the visible eligible adjacent pane as Sidecar. Correct Lucide arrows on all edges; empty panes offer outward only; inward preserves native content/mode and reuses partial-index follow. Normal Open/geometry-only observations never adopt ordinary tabs.
- All attachment labels/descriptions and the updated position explanation translated in every supported language, with required locale coverage and explicit no-English-fallback checks.
- Indexing status uses one dedicated hover/focus/long-touch callout and retains accessible naming through aria-labelledby. Keyboard/double-tap and generic tooltip gestures remain covered.
- Sidecar opening retains ownership through native split layout and repairs zero allocation after unlink/move/reopen.
- Earlier deletion/Hidden native harness, style draft consent, rename startup and fixture corrections plus risk-based regression evidence are included. The branch's preceding deletion-message/context-menu fix is part of this PR as well.

## Verification and artifact identity

Node 22.22.2; real build and targeted official scanner lint passed. 108 focused host/action/localization checks and seven architecture checks passed at the implementation checkpoint; after translations, 22 locale checks and the real build/lint passed. Seven focused tooltip/status browser checks and one directional-control browser case passed at their recorded checkpoints. Current installed main.js SHA-256: 0f0cd0f18df4ad80baec64b6dd876196868aa5141aa7577982d8a4c26081dcde; CSS/manifest unchanged.

The exact build is installed in CLI-confirmed kplex-test-small; data.json was preserved at staging. Both installation checkpoints passed 12/12 native attachment cases with trusted Electron clicks and no errors captured. Test-created panes/demand/controllers were removed and pre-probe workspace/workflow state restored. Native UI stayed in English; other locales were verified through compiled catalogs and the actual translator without changing host preferences. Extended/performance suites were not rerun for each focused edit; the PR's normal CI runs the full verification lane.

Evidence: [attachment and localization](docs/validation/sidecar-attachment-2026-10-13.md), [current artifact receipt](docs/validation/sidecar-attachment-locales-2026-10-13.json), [index callout](docs/validation/index-status-callout-2026-10-13.md), [risk regression](docs/validation/risk-based-regression-2026-10-13.md). Historical artifact identities remain unchanged in their original receipts.

## PR verification follow-up

PR #152 is open. Its first CI run caught a test extractor locating useIndexStatus through a neighboring comment that changed during the callout fix. The fixture now selects the actual function declaration through the TypeScript AST; notification/visibility assertions are unchanged. The complete local indexing fixture passes after correction (`node scripts/run-indexing-tests.mjs`). Production sources/artifacts are unchanged.

## Remaining separately tracked observations

Risk results retain 23 passed (maintainer accepted #21), one failed (#25 earlier ResizeObserver strict error gate), one pending (#14 physical Android). The old #25 burst is unresolved despite the new native runs capturing no errors. Windows production-vault search-vocabulary failure remains undiagnosed; production vault was not probed. Physical Android/screen-reader/popout-native attachment is not claimed. All validation deployments/probes were limited to kplex-test-small; sibling repositories remain untouched.
