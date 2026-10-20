# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Session closure: device-specific indexing — PR #195

No active implementation assignment. On 2026-10-20 the maintainer requested removing the
informational Web link indexing row, publishing/merging #195, closing #191 with a reference,
and returning the local checkout to main followed by fetch. This is explicit publication/merge
and issue-closure authorization following the previously disclosed validation limits.

## Delivered scope and identities

- Implementation branch: `2026-10-20-issue-191-startup-policy`.
- Integration base: `289e10a29649a2c4bb8fbcb0439b27fbee7d3071`, retaining accepted main
  `50346338f7caf15ff5d27a3d11ff7022c78bcd3c` and merged #194.
- Final publication/merge identity: [PR #195](https://github.com/zsviczian/kplex/pull/195).
  Related closure: [#191](https://github.com/zsviczian/kplex/issues/191).
- Desktop defaults to Eager indexing at plugin startup; tablet/phone default to On demand on
  first Plex opening. All six preferences are independent, migrate explicitly and apply at reload.
- One startup admission owner preserves dormant invalidation, warm reuse, current native files,
  source/write authority and early/concurrent/inactive view behavior. No parser/schema/read-API
  replacement, receipt/reader-sharing experiment or #192 implementation was introduced.
- Settings uses native controls, omits the Web link indexing explanation and retains restart
  disclosure. All eight locales and existing themes/ontology/import boundaries are preserved.
- Final main.js SHA-256: `ca7e60573a2fcb227e13f32bca4eb29cf6e43e49018b9fd6705385230fdb9b1b`.
  Plugin version unchanged; no release or branch deletion is authorized.

## Validation and remaining limits

See [the durable validation report](docs/validation/startup-policy-195-2026-10-20.md) for exact
commands, versions, source/artifact identities, failures and numerical observation limits.

Final row-removal checks on checksum-verified isolated Node 22.22.2: 105 affected tests, real build,
Obsidian scanner and actual native Indexing Settings pass. Small shows no Web link indexing row,
all six device controls and restart disclosure. Settings/workspace/enabled-list bytes are restored;
107 original files remain, with zero opened Plexes or Settings after the probe.

Previously completed feature checks include architecture (zero violations), host-free core 130,
58 production admission scenarios, 27 settings-independence cases, migration controls 69, external
settings browser 18 and real IndexedDB foreground startup 51. Native admission seven cases,
stationary progressive ontology and seven external-settings cases in each actual strategy pass.
Their artifact identity precedes only the final informational-row removal.

The final aggregate verification is not green: the existing restore-watchdog timer-count assertion
reported 1 instead of 0 at `tests/indexing.test.mjs:3478`. Similar failures were observed on the
baseline. An earlier full pinned run passed before the strategy extension. No assertion, timing
bound or deadline was weakened and no additional aggregate retry was made for this row removal.
Physical phone/tablet, macOS and full Obsidian process restart remain unrun. Plugin reload/native
DOM checks do not establish those results. Whole-renderer observations demonstrate no performance
improvement; the accepted result is deferred pipeline activity.

The maintainer's merge request follows disclosure of those limitations; it does not turn them into
passes. Preserve the report and private evidence rather than reopening unrelated optimization.

## Private evidence and workflow

`%LOCALAPPDATA%/KplexValidation/startup-policy-195` retains original backups, checksummed source
patch/manifest, logs, failed attempts and screenshots. The final UI receipt is under
`final-row-removal/report.json`. Do not publish private evidence or delete originals. No personal
vault was targeted; no personal-vault files were read or written. The candidate remains in Small.

The standing header is preserved byte-for-byte. The temporary planning marker was removed;
no handoff archive is created. No next task or structural refactor is implied by this closure.
