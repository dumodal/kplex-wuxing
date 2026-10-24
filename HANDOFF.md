# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: UI refinements for Sidecar, visibility and central editor

Prepared by Zsolt's Codex Agent. Branch2026-10-24-sidecar-viewport-center; draft PR214; accepted base d48f76641df149dd5bb4d000fe9764251ece9807 (PR213 merged). Do not resume indexing/storage or broad performance work.

Completed: Sidecar open/close reframes via existing autozoom or preserves zoom and centers the focal node;9 visibility toggles use3/2/1 responsive columns with subtle theme dividers. Latest addition: original modifier-bearing central-node editor corner clicks reuse existing expanded-editor/camera owner; normal clicks and unsupported sidepanel behavior remain. Exact ALT/Opt hint is maintained in8 catalogs per maintainer request.

TooltipButton uses referenced accessible labels and the existing shared hover/long-press owner for all central-editor toolbar buttons. No native aria-label/title candidate on those controls/toolbar. Source audit found expanded mini-thought rows also combined native aria-label+title: retain the full path title and reference a full accessible name instead.7 remaining native JSX title elements have0 overlapping aria/shared markers. Preserve deliberate image/filename/select/iframe titles; do not erase accessibility for native third-party content.

Current validation:40/40 camera/modifier/localization,10/10 Chromium tooltip including native accessibility-tree name,4/4 affected editor/node/rename/preview browser cases,7/7 architecture and0 violations, official scanner and real production build/types on Node22.22.2. Earlier Sidecar UI8/8 and visibility/divider CSS receipts remain. Initial source-fixture duplicate cancel selection3/4 is retained; the new cleanup has a precise name and unchanged assertions pass4/4. Full details in docs/validation/sidecar-viewport-center-2026-10-24.md. No broad verify/performance campaign.

Final main.js e197ef623724d3271bfafbd5459152653d00f63f182b8a218fe00c660d1ec1f9; manifest843d327e4a634a6e28cd645be8c533adc873a1ac1c6498502b5ca44e70120109; styles0ece0916859bcda0203dc5dcbb3906ce1d932a2fbceb47a5dccd4076cd83f381. Prior f438 Sidecar-only artifact is historical, not the new native target.

Foreground WAIT persists until a new explicit ready. No staging/reload/foreground/native acceptance performed. After ready, use only existing guarded disposable Small and exact artifacts; cover4 Sidecar positions/both autozoom states, modifier expansion/restoration, one tooltip, editor focus and independent cleanup in main/popout. Native timing and physical Mac/mobile remain unverified. Estimated5-10minutes native access. Do not create vault/profile, restart application or deploy production.

Publish/verify the validated checkpoint on PR214, keep draft. No merge/release authorized. Comments signed Zsolt's Codex Agent; raw receipts private.
