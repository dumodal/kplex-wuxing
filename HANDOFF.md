# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR222 heading fix: implementation and native evidence complete

Branch2026-10-25-facets-layouts-and-sharing; runtimecd82da8d95acf69446f0fa4fa5b8b83107127768; accepted main7064644 included. Final documentation checkpoint changes no production/tests/scripts/packages/styles. Keep222 draft/open/unmerged. No production files/settings/workspace/deployment changed. No merge/release/force-push.

Shared sectionNodeSize fixes short-heading clipping by reserving marker/padding/readable width across plugin views. Compass keeps exact density-adjusted geometry. Configured text/width limits remain; source text/provenance/parser/index/editor ownership are unchanged. Earlier canonical counts, central section source policy and independent controls remain.

Actual current results:55 focused tests PASS with real text-fit at several font sizes, Compass parity and editor admission; official scanner/real Node22.22.2 build PASS. Native UX31/pairs13/editor11 PASS55 on identical main6c56ff064a927ad5b43bffc4958409c1a9630f48a2d72cacfd67e8d3980a05dd/styles19a1bb1a25bfbc6db417420e2a07a281e50b48cb5f121ff52d486d9cc3dd47d5. All restored9configs/117contents/original workspace/window/digest; final native13:49:46.496Z. Receipts docs/validation/section-heading-222-native-summary.json and section-heading-222-2026-10-26.md.

Clean runtime-head full verify:obsidian and exact final documentation-head CI conclusions, actual suite totals, final artifact equality/restoration and remote readback are recorded in PR222 before final delivery. No incomplete check is presented as a pass. This documentation publication overlaps those checks; runtime/tests remain frozen. Earlier full3223/native54/CI553/CI554 receipts retain their pre-heading attribution and do not substitute for new-head acceptance.

Coverage limits: Mac/physical mobile/minimumhost/OSclipboard, known215 fresh-popout Sidecar/two simultaneous editor-Sidecar pairs/application restart. Priority manual follow-ups: Mac section/editor/focus/popout, physical touch, minimum host. No additional source work or partner-adoption gate. Await maintainer review after final PR verification readback.
