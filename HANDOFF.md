# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #220: current implementation and validation handoff

Main validation agent to maintainer; implementation, commits, pushes and PR updates authorized. Keep #220 draft/open/unmerged. No release or personal-vault deployment.

- Branch: 2026-10-24-canvas-wuxing. Accepted integration baseline: main 26623c8393bddc0c3bcac39468078ec20ceccbc8, accepted #219 5754fc571f78f23231ea488a93e2397d477da44e, merge 0406844. Current prior published head: ced282594854ea548275a0941166fc7a642da42b. This checkpoint adds native acceptance corrections, authentic screenshots and targeted settings cogs.
- Equipped environment: real dependencies, Node22.22.2, Chromium, GitHub and Windows Obsidian CLI. No offline-agent transfer or pending partner adoption. Runtime host Obsidian1.14.5 / Electron43.3.0; renderer Node24.18.1 differs from build/automation Node22.22.2.
- A-F implemented: versioned optional view contracts/conformance; shared captured contributions/settings; Facets presets and centered measured layout/badge; guarded shared assignment/drop/Undo; existing predicate authoring with bounded availability; optional shared section/anchor proof and documented follow-up. See docs/FACETS_VIEW.md, CANVAS_VIEW_API.md, CANVAS_VIEW_DEVELOPER_GUIDE.md and FACETS.md. Production Mind Map/Facets do not declare sections support.
- Latest targeted request: adjacent view/preset selectors with responsive wrap, view cog to native view page, preset cog to the existing exact preset editor. Optional settings target uses the same captured controller, native manager/color/modal lifetime and queued settings writer. All eight locales updated. No competing owner.
- Previous runtime ced2825 main SHA256 b810583c1c6d884d3aa21ba08f0a007add69f68a4a3e2c79da952d9faafb4160: native features30, combined editor/Sidecar12, main/popout pairs11, selector/settings25, shared interactions10 and navigation/cycle5 all pass, each with cleanup. CI523 succeeded. Fresh native-tab placement fixed test fixture adjacency; it did not change editor production behavior.
- New cog runtime main SHA256 558588b7c36c050b279f9e710b4bd753d1ff612c0b84d453cece13a0caea2401: focused60/60, real build, scanner and native features42/42 pass. Cogs tested on all three view pages and repeated PARA/State preset opening/cancel; adjacent selectors and zero reads/parses/acquisitions/rebuilds for each cog. New fixture failures retained and corrected against actual native page/manager lifetime. See docs/validation/facets-220-2026-10-25.md and sanitized native summary.
- Mind Map config default depth10/max20 and displayed notes500/max2000 retained. Shared physical resize direction/status sizing and both camera fixes preserved. Wander all views, Alt explicit center and Ctrl placeholder creation preserved. Cycle reference reveals ancestor with explanatory Notice.

## Remaining work

Run final clean-head npm run verify:obsidian and exact-head CI; refresh affected exact-build native receipts; update PR with actual A-F status/tests/limits and exact pushed head. Required source-browser scaling guards remain unchanged. Final outer restoration still required after testing.

## Resource ownership and limitations

Only kplex-test-small (C:/Obsidian/kplex-test-small) is writable for host probes. Fresh outer backup %TEMP%/kplex-facets-220-final-9b1252f2 owns nine configuration/plugin files,117 content files, original live layout/window. Baseline content digest7bdaf015f88c6ee1945410755a5aaccf7e04408fe597e729cafca24c5bc332ba. Restore with existing wuxingResources.mjs restore after all tests; report exact restoration. Raw reports/backups remain private in TEMP. Production Zsolt's Brain has received no input, file writes or deployment.

Trusted Electron clipboard passed with original text/formats restored; OS clipboard transport did not pass. Fresh-popout Sidecar creation, whole-application extra-tab restart and two simultaneous editors/two Sidecars are retained #215 limitations, not claimed fixed. Native pairs explicitly attach loaded documents; native view recreation is not app restart. Mac, physical mobile and minimum-host validation are unavailable here. Optional production Mind Map sections require a separately scoped integration. No manual check replaces available automated Windows checks.
