# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# PR141 - Accepted publication checkpoint

State: inactive implementation handoff; root reviewed and accepted combined scope for authorized commit/push/merge/closure of originalPR141. Branch2026-10-11-issue-128-delete-cleanup-scope, validationHEADf0ce0467ecd0697247fd2e8360c72ad65e92da00, integratedmain001170c9615c0ee6672fa1a472df55203c907d0f. Original tree retained in recovery stash276d2932aeb7c323bbb780a35ff5b5877105ee0c. Final Git publication identity is verified in PR141 aftercommit. No competing PR; originalissue128 linked.

Approved changes: configured-ontology default deletion, explicit arbitrary property Remove/Hide consent, retained body/inline links and navigable partial results. Directional Hidden consent follows selected central/write note, preserves original links and inverse visibility. User wording retained. Shared source-owned referenceParams annotations56literal/127plain across183entries produce once-only double quotes across locales; values stay opaque, no role/count/shortcut heuristics, no catalog cloning. Locale tag prefix mechanical only; actual field tooltip distinguished from descriptive source kind. Latestmain rename/menu implementation preserved.

Independent root review and validation complete: architecture7/core94/portable710/browserUI60/portableSources334/browserIndexedDB442 allpass, zero failures/cancellations/skips/todos. Official Obsidian lint, actual installed-type production build and exact-artifact native render pass. Serial exact-artifact native deletion20, rename36observations(on-demand/eager), menu14includingpopout/migration/retirement pass. Source/artifact hashes match finalproductiongate. Original88notes/rawconfig restored, no ownedfixture/controllers/modals. Main.js 8c39cca6feddb3402fc0f9e98606c597b56cc70e38372d1447df5a301044d3df.

Durable evidence: docs/validation/delete-cleanup-release-2026-10-12.json; olderfeature reports retain original receipts/limitations. Physical phone/macOS/OS-native menu backend not claimed passed. User authorizes publication despite prior stated phone limitation. No unrelated refactor/schema/parser change, generated artifacts tracked or archivedhandoff.

Next root workflow: publish this accepted snapshot to existingPR141, merge/verifyclosed, switchmain/fetch/fastforward. Then execute separately requested unassisted Windows investigation on updatedmain, checking implementation inventories and versions before standaloneUI test, strictnativegate, renameacceptance and three serial historical-startup runs. Preserve Mac failures and deadlines; Windows diagnostic evidence belongs in a separate report, never substitute premerge results.
