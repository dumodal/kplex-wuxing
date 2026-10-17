# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# PR #172 ? validated Windows closeout, draft review only

Existing branch2026-10-17-indexing-live-updates; main9381c38 integrated without rewrite612a0c8.
#169 merged with verified durable private raw archive; no runtime indexing change/improvement.
A7f2f2f2 andB40c4f84 are pushed, full CI39011260178 and39014152315 PASS. Main is committing
tooling/report closeout now. Production source remains exactly B; artifact c720a9f6e678fd35f2c1bec3b6218f9d62216c4b12ca0982805e961c844f9006.

Full Node22.22.2 verify+exact-build native smoke PASS. #161 final2/2 native runs cover both prior
ghost-history variants,16fullcycles,4later Parent/Child edits, exact identities/roles/solid links,
first-click pinned agreement and cleanup. Real held-P3 Find/stationary semantics/recent-sync and
physical-only existing-note composer PASS. Existing inventory-held mutation lane six scenarios
PASS, foreground broadflush0; one initial-DOM setup failure/replay retained. Driver awaits existing
surface readiness. Native shell contract tests20/20, source/script syntax and diff checks PASS.

C investigation complete at bounded causal scope: two B Eager pilots plus one M control show
identical counts: existing-folder note2checks/77tx/197requests; folder+note92checks/1527tx/2925
requests,1read/parse each, no fullbuild/snapshot. Natural uncovered-folder resolverclose advances
host revision and causes whole-source cached validation. No efficiency gain claimed; cache-image
history differs. Do not suppress folder uncertainty. Future work is a separate bounded causal-proof
task for new-folder creation waves, not an approved automatic optimization.

All current disposable fixtures/config/session modes/wrappers restored;107files. Durable private
evidence: %LOCALAPPDATA%/kplex-validation/pr-172/checkpoint-b/ andcheckpoint-c-native/, manifests
verified (37/34files), raw originals retained, no archives published. Exact sources/failed controls
and limits in docs/validation/indexing-live-updates-172-2026-10-17.md and Refactor plan.md.

Keep172draft andCloses #161; do not merge/release/close161 manually. Linux/macOS/physicalmobile,
popout interruption and large-vault long quiet-window acceptance remain unrun. No personal-vault
access, receipt, reader-sharing, new scheduler/schema or C15+ structural work. Stop further runtime
changes unless review establishes a specific remaining cause; final-head tooling CI can be tracked
from the PR checks after closeout push. Do not archive this transient handoff.
