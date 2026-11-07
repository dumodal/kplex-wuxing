# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Wu Xing integration on official 0.4.2

User requested a fresh official base with the personal Wu Xing design layered onto it. Work is on `integrate/official-0.4.2-wuxing`, based on upstream `ef2e352a56762cf226bd5e3bfbe7673f47e5a07f`. The user authorized commit and GitHub publication on 2026-11-07 after trying the integration in dumodal. Publish the reviewed source to the fork, preserving both upstream and prior fork history. Do not create a GitHub Release or modify upstream.

Official projection/layout, center-anchored straight note links, gate-hiding and native preset writer are retained. The personal guide is opt-in through a boolean `blueprint` field; ordinary official presets retain their existing behavior. Ported the unified phase reference layer, approved two-word qualities, bottom legend and optional current-note phase outline. Kept fork plugin/view/cache identities isolated. Read-only compatibility supplies absent official placement/link flags to old personal presets while respecting explicit false and preserving unknown stored data. Portable exports preserve the new presentation flags and omit only known obsolete local history/caption fields without changing the stored originals. Other unknown future fields still fail strict export validation.

A public, privacy-checked example is `presets/facets/wuxing-local.json`. Card typography and global styling remain under the official appearance/settings owners; existing fork settings are not replaced. No custom curve router was ported.

Validation on Node 22.22.2 and installed Obsidian types: production build, Obsidian lint, release metadata, architecture (264 roots / 468 reachable files / zero violations), numeric controls and whitespace checks passed. Core: 133/133. Focused real-browser/preset/portable/localization/identity/image-export/cache regression: 189/189. Browser checks exercise hidden/shown guide with stable card geometry and camera, exact center-line connectors, per-preset flag isolation, actual Save/Cancel/Reset and old-setting/export compatibility. Initial sandbox localhost refusal was rerun with browser access; intermediate implementation failures were corrected without relaxing upstream assertions. Raw output stays outside the vault in the user's Downloads task directory.

Native dumodal trial: user authorized installation into the isolated kplex-wuxing plugin. Prior code and preferences were backed up outside the vault; only main.js, manifest.json and styles.css were replaced. Refreshed Obsidian manifest metadata, reloaded 0.4.2 and restored the existing graph. Runtime inspection found five phase frames, ten note links, zero curved note links, zero gates and no view error. The stored preset was unchanged; its background guide remained off. Official k-plex files were untouched. This is a bounded native smoke check, not exhaustive native acceptance.

Limits: physical mobile acceptance and the full indexing/throughput aggregate were not run. Inherited official fixes are retained, not independently proven to fix every previous native issue. The install ZIP remains local; publishing source does not create a GitHub Release.
