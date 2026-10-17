# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.


---

# PR #172 ? checkpoint B validated; focused native controls next

Existing branch: 2026-10-17-indexing-live-updates. #169 merged9381c38; integrated main612a0c8
without history rewriting. A7f2f2f2 pushed, full CI39011260178 passes. B production source is
frozen and validated; main is committing/pushing it now. No personal-vault access. Keep draft
and Closes #161. Do not merge172, close161 manually, release or reopen receipt/reader sharing.

Full Node22.22.2 verify + exact-build Small staging/smoke PASS. Native final issue161 lane2/2:
both ghost-history variants,16 full cycles,4 later Parent/Child edits; first-click graph/pinned
agreement, exact identities, roles/solid links, fixed-pin/tab-reveal/disabled-follow and cleanup PASS.
Artifact c720a9f6e678fd35f2c1bec3b6218f9d62216c4b12ca0982805e961c844f9006.
103 On-demand tests /560 source-browser cases PASS. Two prior Chromium-load full-run failures
and successful isolated reruns retained, no weakened timeouts. 37-file private durable checkpoint
at %LOCALAPPDATA%/kplex-validation/pr-172/checkpoint-b/MANIFEST.json verified. Do not archive
this handoff, publish evidence or delete originals. Durable report/ledger carry accepted results.

Next main-only serial native probes, all in authorized kplex-test-small:
1. TEMP/kplex-172-work/native-p3-proof.mjs ? UNEXECUTED real P3 cachedRead hold with visible
   Find selection/local completion and explicit recent-tab sync before release; cleanup independently.
2. handoff/validation/kplex-172-small-change-causal-probe.mjs ? UNEXECUTED short Eager three-arm
   source-globalization pilot; exact-artifact guards, private config backups, natural events only.
   No quiet-window/efficiency claim. Inspect failures before extending anything.
3. Existing-note composer source lead: NewRelatedNoteModal uses semantic search while Find uses
   vault-files. Native proof required; production fix not yet selected. Actual command
   k-plex:kplex-add-child; scoped portaled suggestions use tracked dialog.suggestionOwnerId.

No other production change is authorized by an unproved performance hypothesis. C remains
unproven; folder/uncovered resolver conservatism must not be suppressed. Missing Linux/macOS/
physical-device acceptance remains explicit. Use agents only offline, native/browser lanes serial.
