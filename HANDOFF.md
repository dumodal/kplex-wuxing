# Standing instructions ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Help canvas and Facets validation

User authorizes a separate kplex-help branch, metadata/config curation, new reusable Facets demonstrations and release/help refresh; keep source PR222 open and help PR4 draft/open/unmerged. No release, production-vault deployment or Help executable/workspace changes. Source parent update is complete at72695a8/runtime130facf,85focused/native24PASS, restored05:03:39.951Z; its full regression remains deferred.

Frozen public Help source812da45ad1a74af5991febf557a5137084f8f3fa, branch2026-10-27-canvas-facets-help, PR4. Four curated presets: Workshop stage/property/horizontal; Read by topic/tag/circular; Learning route/note type/vertical; Workbench questions/two-property rules/quadrants. Existing builtin entries redirect to current examples through supported deletion semantics. Source agent validated real core config/classification/projection/layout on Node22.22.2;140pages static YAML/link/asset/semantic-child audit passes. Native source/classification/layout/canonical-child checks and actual screenshots are separate, pending.

The disposable capture lane uses the existing controlledProbe + Wu Xing fixture/cleanup owners, with an exact public Help snapshot and an owned flat Markdown copy. Only known internal fixture targets are rewritten to that copy, never production data. The existing native plugin loader stages that Help snapshot's actual settings under the outer9file backup, so ontologyPairingVersion1 and its reciprocal fields are interpreted through production. Source Help binaries/workspace are untouched. All captured assets stay temporary until inspection. Known limitations: source-copy asset targets may resolve to pre-existing public test assets; no new files/vault destination is created outside the owned Small fixture folder.

Help native1 declined its ontology preflight (older disposable config did not match public Help); cleanup/restoration passed05:16:56.451Z. Help native2 passed metadata/ontology setup but caught a misleading Unavailable preset dropdown entry after a valid retirement redirect; cleanup/restoration passed05:20:21.058Z. No screenshot/classification pass is claimed from those attempts.

Narrow source correction: presetChoice omits an unavailable placeholder when resolveFacetPreset reports a valid explicit replacement. Missing/future intent still retains its disabled recovery entry. The real native-manager/browser deletion test now asserts both cases and passes, with existing save/cancel/redirect assertions unchanged. Installed type/production build and touched-source official scanner are required before the next native pass. No parser/index/metadata writer/render owner changes. Full regression/CI remains deferred.
