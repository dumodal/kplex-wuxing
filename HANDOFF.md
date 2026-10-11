# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---


# PR 136 / issue 114 - reviewed implementation return

State: inactive, returned to maintainer. Implementation is uncommitted on 2026-10-11-issue-114-arrow-direction; plan head 79a2b594dde32056ae2f667c606f48d1c4d7565f, base 2b128c89555b88ebf207a709d7c0669bed3dfd73. Maintainer now authorized commit, push, finalizing PR 136, merge, and issue 114 closure with a next-release note. Publication is in progress; release itself is not requested. Structural refactoring remains paused at accepted C14.

## Scope and canonical owner

Core evidence aggregation selects active non-hidden DEFINED direction before inferred direction. Existing roles, definitions, inference and explanation provenance remain intact; reciprocal explicit directions still resolve to BOTH. Full/pair/cooperative resolution, section projection and URL projection delegate to the same semantic owner. No renderer classifier, enum/default change or scheduler refactor.

Canonical PersistedPage serialization stamps resolvedDirectionPolicyVersion=1. Legacy or unsupported resolved rows cannot hydrate or certify cached scopes; retained evidence rederives them using existing cooperative fallback. Current rows retain the fast path. Neutral sources, parsed bodies, DB/snapshot schema and settings signatures remain unchanged.

The temporary plan-only docs/agent-handoffs/issue-114.md is removed. Permanent acceptance tooling is scripts/testing/obsidian/arrowDirection.mjs with CONTRIBUTING.md instructions and the reviewed evidence in docs/validation/arrow-direction-2026-10-11.json. That report contains exact source hashes (inventory 43f0f69e293751f559b109c89ee011e4e389f721ec532aff7e89e4b69a754fee) and final installed artifact hashes.

## Actual independent validation

Pinned Node v22.22.2; actual installed dependencies and Obsidian 1.13.0 types. Architecture 7/7, strict core 92/92, official lint clean, real production build passed. Full verifier passed indexing plus 654 portable, 54 UI browser and 334 portable source tests. Final source IndexedDB browser lane passed 427/428. Only failure is the unchanged source-startup-indexeddb.test.mjs:539 offline-edit assertion: A.md is read twice rather than once, also recorded before this feature. Full verification FAILED; maintainer explicitly accepted this recorded limitation for merging PR 136. No full-green claim.

Final native smoke staged byte-identical production artifacts into the explicitly selected existing kplex-test-small vault. Windows Obsidian 1.14.0 native arrow acceptance passed 32 observations across both centers, inversion and inferred visibility, initial reconciliation, repeated policy refresh, real warm plugin reload and second view. Real visible SVG markers, roles, defined/inferred provenance and canonical TFiles passed; warm reload preserved neutral source heads. No captured JavaScript errors.

Cleanup independently confirmed fixture absent, controller absent, original 88 Markdown files, plugin enabled. Original settings/workspace/navigation owners and configuration bytes restored. Installed disposable plugin intentionally retains the candidate artifacts.

## Delivery and remaining limitation

Feature implementation and independent native review are complete. Required full gate remains failed; maintainer accepted it for this merge only and requested a separate branch from updated main to resolve the startup double-read. No additional feature-specific manual tests required by review; no macOS/popout/physical-mobile acceptance claimed. Warm repeat policy refresh is not a physical source edit; real source patch add/remove and clean-build parity are covered by integration tests.

Main-agent follow-up production changes were documentation only. Final build/native artifacts include them. git diff --check and native driver syntax check passed. Do not resume work or publish solely from this inactive handoff; follow the maintainer's next scoped instruction.
