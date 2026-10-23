# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Return: PR207 ordinary dependency repair

Zsolt's Codex Agent, 2026-10-23. Returned for maintainer code/evidence review.
Branch: `2026-10-23-dependency-repair-batching`; keep draft, do not merge/release/deploy production.

## Accepted baseline and #205

#205's one unchanged-head CI retry passed complete verification/build after the retained 64.9ms timer failure. Unchanged runtime, previous complete implementation/local/native passes and fixture-path review support its documented non-reproducible timing disposition; no assertion/deadline changed and no precise host/GC cause was established. Normal merge `930747679894f003a2acf3b800df798826ee090c` is verified reachable from main. It is #207's accepted baseline, incorporated by normal merge `86d7fe459161a36c7ddd7c5f5e5d2fa236526412` before implementation/comparison. #201–#205 work is preserved. #206 branch/experiment/data/startup/event owners remain untouched.

## Implementation and identity

Only production owner changed: `src/index/SourceRepository.ts`, ordinary selected-count repair. A contiguous cursor prefix shares the existing 256-record / 256 KiB allowance across old/new phases, with inherited legal oversized-singleton behavior. Each distinct ledger is read once; all old decrements precede new increments with exact intermediate underflow/overflow checks. One final mutation per key and one authenticated old-prefix range delete commit atomically with the original journal cursors/pending state. No schema/scheduling/settings/reader/lease/source-acquisition change; #204 unchanged-projection reuse remains.

Final source SHA256: `d8d6d532bb711b3cb2bb5d0e55152392495533b8eb64c069158ca8b0e98809d8`. Final tested production main.js: `19d75415c69d8c77bbde934f618eeece2f0387459a49003090eedef61b9bb28f`; manifest/styles match baseline. The large 98-arm CPU study measured earlier source 5d52…/build d7d3…; final code differs only in two catch expressions preserving Error/DOMException identity. The rejected intermediate normalization and lint/stopped verification failures are retained. A failing-then-passing six-case real-IDB regression validates storage notification, quota, attributed cancellation, rollback and exact recovery. Final 42-arm bridge passes; all 26 detailed arms exactly match earlier operation/digest/byte/debt results. Do not silently relabel historical CPU as final-build measurements.

## Results and completed validation

Mixed ordinary operation requests 17,516→12,248(−30.1%); mostly-distinct 17,068→14,652(−14.2%). Three alternating 128-owner pairs per ordinary operation: equal create/change/delete median pair-sum renderer CPU 49.268→28.320s(−42.6% paired), elapsed 101.804→57.055s(−43.7%) mixed;47.331→32.219s(−31.9%),101.634→66.569s(−34.9%) mostly-distinct. Browser/storage/utility CPU is unmeasured; later edits improve. Include all old-family reclamation/lease closure. One incomplete browser-start attempt remains retained.

Node 22.22.2 complete verify/build/real typings/official lint and strict exact-build Obsidian staging pass: architecture 7 / core 130 / main 1363 / UI 227 / portable 357 / real-IDB 701, zero failures/skips. Existing URL-heavy <50 ms guard and Windows genuine-junction alias refusal retained. Final-build Small ordinary repair, deliberate cleanup failure, SI4(functional Small, not 600-note scale), SI5, foreground/startup admission, tags/folders/gates/search, rename, held-startup ontology edits and On-demand live updates pass. Independent cleanup restores original settings/layout/config/file inventory. Initial final audit ran before restored Eager startup completed; retained failure, then natural completion and unchanged assertions pass. Final 107 files / 88 Markdown notes, ready Eager, no pending/unsaved/readers/decode/controllers; exactly 2 historical conservative leases preserved against October 22 receipts. No production deployment.

## Review decision

Ready for code/evidence review, **not an unqualified merge recommendation**. Three separate diagnostic pairs reproduce candidate-associated post-restart native IDB-open delay 25.1→521.3ms,27.1→188.1ms,25.7→34.9ms under existing SIGTERM/fallback protocol, with zero repair/count writes. Backend cause remains unknown; renderer CPU does not explain/exonerate storage waits. Responsiveness diagnostics show no observed ≥50 ms long tasks; native checks pass, but these do not resolve the restart tradeoff.

Next maintainer action: review implementation/report and decide whether to accept the measured restart qualification or authorize one focused graceful-quit versus existing-termination comparison. No speculative storage redesign/scheduling/GC tuning. Do not request Mac measurements. No extra general UI manual matrix is required for this backend-only change; full-app shutdown/macOS/physical-mobile acceptance remains unclaimed.

Detailed protocol, failures, identities, measurements and receipts: [validation report](docs/validation/dependency-repair-batching-207-2026-10-23.md). Architecture ownership/TSDoc/bounds/recovery/cleanup review completed independently. Publication and remote CI status belong to #207's published head; no automatic merge authority.
