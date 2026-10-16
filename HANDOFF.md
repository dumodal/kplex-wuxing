# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.







---

# PR #170 — Small-vault retest complete; resource assertion remains open

Branch2026-10-16-alt-hover-highlight. Runtime remains a16719e, unchanged from full2,003/lint/types/build/exact smoke and green CI. User explicitly requested rerunning touch and gate tests in kplex-test-small. No merge/release approval for #170; keep draft. C14 accepted; later refactoring paused.

Exact d59587875f14614c4d579e49033743d6f2a4f251acae1b1d7a14281d4931b200 artifact retained. Original gate setup fails again. Trace and canonical fixture receipts establish3 readable foreground pages absent from canonical GraphState. Fixed test setup only: unconditional existing idempotent insertCreatedFile plus exact TFile identity check. Regression executes actual native binding block; Node22.22.2 native-runner20 tests and both driver syntax checks pass. No production change or relaxed assertion.

Unchanged touch driver passes8 trusted gestures, saved-value reload, pane geometry and all cleanup/restoration after releasing idle CLI debugger using public dev:debug off. No DevTools/competing controller existed. Earlier plugin-readiness failure did not recur; do not claim its historical cause is proven. Original CLI debugger state is restored afterward.

Gate corrected-setup runs both pass5 visual assertions (Keep/Reflow × cross-links and filter clear), then fail strict no-source-work on clear: +1 acquisition.checked and semantic revision, source revision fixed,0 fresh reads/parses/rebuild/body-read/requested-neighborhood/degree/pair calls. Additional validation/publication is proven; whether necessary readmission or redundant remains unproven. No broad semantic/performance implementation is authorized by this retest; report gap and keep draft.

Final restore passes exact runtime settings/layout/window bounds/four config bytes/original CLI debugger state/106 files/no owned notes/controllers, artifacts unchanged. Only authorized Small used; no personal/testvault/Large access. No active native test. TEMP/kplex-170-retest/restoration.json; private fresh baseline private-* there. Never publish these backups or raw touch baseline without review.

Updated docs/validation/alt-hover-highlight-2026-10-16.md and ledger record H3; CONTRIBUTING documents exclusive CDP ownership. LOCALAPPDATA/kplex-validation/pr-170/retest-2026-10-16 contains29 verified files plus manifest, source receipt f8f7af6b46e763ba5c21abacb40bdbdbb6cce5f8d30bc41aa4a87f7e4db314fc; all earlier evidence retained unchanged, unpublished. Native source trace is temporary and never ships. Delivery: this retest checkpoint accompanies the final branch head; PR #170 records the current acceptance and remaining resource assertion. macOS/physical mobile remain separate acceptance.
