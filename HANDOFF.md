# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.







---

# Plex interaction updates: final validation

Main validation agent owns branch `2026-10-16-plex-interaction-updates`, base
`3294bea18093b33791830fb55d97d53c6e3c980a` (authorized merge of #170 after complete CI retry).
The scoped offline owners have returned their changes; main reviewed/fixed the combined tree.
C14 is accepted and later structural refactoring remains paused.

The seven requested fixes/features are implemented. See
[the validation report](docs/validation/plex-interactions-2026-10-16.md) for behavior, ownership,
actual results and retained controls. All eight locales, native Settings and established writers
are preserved. Materialization rejects stale physical identities, remaps retained reads and cancels
older private graph builds. A native-observed gate task now retains its original admission path
for proof and cleanup; a settled task cannot survive rename/materialization under an obsolete key.
Properties checks both the native file and editable metadata identity, with per-pane accepted-load
serialization, ownership fences and failed-read suppression.

Final strict verification passes 2,044 tests/lint/installed types/production build/exact smoke.
The final exact build passes 14 native interaction cases plus one fixture observation and seven
actual Settings/main/popout hover cases. Owned count tasks fully retire, and the live index has
no active/pending preparation after fixture cleanup. Runtime SHA-256 is
852d2c8ef8bd1f3949396a06f7eec70ed2b2607cdb9d4fc66c5700d140c66700.
Touch passes 8 gestures/reload/geometry, and a second native interaction run passes all 14 cases.
Final restoration matches original 107 files/settings/layout/bounds/four configuration files and
debugger state; no active/pending work remains. Broader gate/filter resource acceptance fails
in two runs before the complete matrix (+9 checks/publications over the recorded oracle-to-failure
interval, no fresh reads/parses/builds). Preserve that assertion and failure; no optimization here.
Verified evidence/source receipts and draft PR closeout remain in progress.
The validated implementation checkpoint may now be committed/pushed under maintainer authorization.

Use only the authorized disposable Small vault, originally 107 files. Original private backups
remain in TEMP/kplex-interactions-2026-10-16/private-*. Raw failures and probes are retained;
HANDOFF must never be archived. Do not access personal vaults or publish a new evidence archive.
After final checks, commit and push the validated checkpoint and open the follow-up PR as draft.
No merge or release. macOS and physical mobile remain separate acceptance.
