# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR222 implementation/native54 complete; full-run fixture correction

Runtime2422cbd1ea71387755e549116b7bdc53d618a7b8; accepted main7064644 included on2026-10-25-facets-layouts-and-sharing. Keep222 draft/open/unmerged. Current checkpoint changes test context/evidence only; production source/styles/native drivers unchanged. No production files/settings/workspace/deployment changed.

Implemented canonical Mind Map counts/metadata explanations, full-width Help, responsive measured columns, central sections through explicit optional view policy (Compass attention/Mind Map pinned root/Facets disabled), separate controls, shared source/tree/provenance/measurement/actions and existing native editor/focus owner. Native UX30/pairs13/editor11 PASS54 on identical mainafe95a39a528f7c4fca4562e0aaa9880fa7bd129eba0b3bff179f03d4207f6ba / styles19a1bb1a25bfbc6db417420e2a07a281e50b48cb5f121ff52d486d9cc3dd47d5; each restored9configs/117contents/workspace/window/digest.82 focused/core130/build/scanner pass retained with attribution.

First clean6253617 full verify:obsidian reached architecture7/core130/scanner/main1627 PASS, browser323/325. Iframe startup timeout unchanged isolated retry PASS. Attachment-rename extracted renderer lacked sectionDocument/sectionEditorAvailable context; actual Classic bindings supplied, original style-work/rename assertions unchanged and isolated retry PASS. No production fix or assertion weakening claimed. Sources/final build/native smoke not reached. Outer restore PASS12:23:26.534Z. Receipts in docs/validation/canvas-sections-222-*; earlier failed attempt retained.

Next: clean full verify:obsidian on this corrected published checkpoint, unconditional restore, exact-head CI/log readback and final PR handoff. Source/scope/performance guards unchanged. Mac/physical mobile/minimumhost/OSclipboard and known215 fresh-popout Sidecar/two simultaneous editor-Sidecar pairs/app restart remain separate. No merge/release/force-push.
