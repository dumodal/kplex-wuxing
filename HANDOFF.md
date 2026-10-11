# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# Issue 54 - main-agent validation return

State: accepted/inactive after maintainer physical-mobile confirmation. The known unchanged startup-suite failure remains recorded. No automatic refactor work.
Branch: fix/54-mobile-sidebar-follow; base 095e8ba514139675028e907f63489e3a749e533c; initial tree clean. Maintainer authorized commit, branch publication, PR creation and merge.

Delivered: latest canonical note follows on sidebar reveal without manual Plex/note activation or automatic arrival motion; central double tap reuses the visible underlying main tab or creates a tab; all seven compact control labels stay visible. Existing deliberate history/Wander motion, same-file companion propagation, embedded/Sidecar exclusions and persisted settings remain intact.

Independent review fixed actual native geometry/publication ordering, borrowed-preview lease continuity, same-center outline reset and owning-window transition cleanup. Exact-center demand remains GraphIndex-owned; no full-vault work, polling, schema change, network call or production diagnostics. C14 remains accepted and structural refactoring paused.

Final Node 22.22.2 checks: architecture 7 with zero violations, restricted core 88, whole-source official Obsidian lint clean, focused follow/motion 40 pass, final aggregate portable 650/650 and browser UI 54/54 pass, and actual production build/typecheck pass. Strict full verify completed: aggregate 643, browser UI 54, sources 333 pass; source browser 427 pass/1 fail. The reproducible unchanged tests/source-startup-indexeddb.test.mjs:539 reads A.md twice instead of once. All 61 compiled inputs equal base after newline normalization and the sole raw-byte difference emits identical JS. The gate remains failed; no test was weakened or unrelated semantic change made. Final broad rerun also required supplying the new timer-window ref to the existing typography unmount callback fixture; all original assertions retained and the rerun passed.

Exact final artifacts were staged only in disposable kplex-test-small. Obsidian 1.14.0 (installer 1.14.0), Windows 10.0.26200: final desktop and 390px mobile-emulation drivers each pass all eight scenarios with no captured JS errors. Covers hidden newest follow, no passive animation, unavailable-page suppression/newest supersession, native sync/history motion, actual central touch-handler main-tab reuse, empty-main-tab creation and seven visible labels. DOM pointer events are synthetic; physical touch and paint are not demonstrated. Native drawer animation must settle before synthetic contacts; earlier harness failures were corrected without altering gesture behavior.

Cleanup verified: mobile false, 88 original markdown files, no fixture folder/probe globals. Settings/community config original bytes, workspace/native owners and bounds restored. Final main.js SHA256 54beb73bdbe9f7fd3823913d7421cda532d14bbcc167a2f6d257840943270866; source inventory SHA256 57662c7985ecc298a79fc30b27f726a03e122e20fa28f5ded76342633f485c11. Full source/artifact identities, receipts, independent review and evidence limits are in docs/validation/sidebar-follow-2026-10-11.json. Generated dist is installable evidence and remains uncommitted.

Maintainer confirmation (2026-10-11): "I tested the solution on my mobile and confirm it all works as expected." Physical mobile behavior is accepted on that evidence; detailed device/gesture traces were not supplied. Maintainer then authorized commit, publication, PR creation, merge, switching main and fetching after the prior report identified the unchanged startup failure. That test remains failed, with no gate weakened. Repository identities will be recorded by the PR and final delivery; no plugin/package release is requested.
