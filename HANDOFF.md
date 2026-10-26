# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR222 targeted heading measurement follow-up

Baseline6f630d967c03862fe8c7f87a0254a32e6f026a3a on2026-10-25-facets-layouts-and-sharing; accepted main7064644 included. Prior full3223/native54/CI553 and final pre-heading CI554 are explicitly historical for that artifact. Keep222 draft/open/unmerged. No production files/settings/workspace/deployment changed.

New maintainer clipping repro fixed through shared sectionNodeSize: all section-capable view hosts reserve heading marker/padding and readable minimum; Compass keeps its exact density-adjusted geometry. Configured text/width limits remain. No renderer/parser/index/source scheduler/writer or editor lifecycle change. Earlier canonical counts, central-source policy and independent controls remain.

Actual current checks:55 focused PASS (real text-fit at several font sizes, Compass parity, section/root/editor admission); scanner and real Node22.22.2 build PASS. Native UX28 PASS31, pairs6 PASS13, editor-lifecycle5 PASS11 =55 on identical main6c56ff064a927ad5b43bffc4958409c1a9630f48a2d72cacfd67e8d3980a05dd/styles19a1bb1a25bfbc6db417420e2a07a281e50b48cb5f121ff52d486d9cc3dd47d5. Every lane restored9configs/117contents/original workspace/window/digest; final13:49:46.496Z. No active native owner. Receipts docs/validation/section-heading-222-native-summary.json and section-heading-222-2026-10-26.md.

Next: clean full verify:obsidian on this published source with unconditional outer restoration, exact-head CI and final PR readback. Native artifact must match final build. Source/performance guards unchanged. Mac/physical mobile/minimumhost/OSclipboard and known215 baseline limitations remain separate. No merge/release/force-push.
