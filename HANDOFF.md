# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: PR215 Classic view foundation — final validation

Zsolt's Codex Agent, 2026-10-24. Active checkpoint, not final acceptance.

## Identity and authority

- Repo `/Users/zsviczian/GitHub/kplex`, branch `2026-10-24-plex-view-plugins`, draft <https://github.com/zsviczian/kplex/pull/215>. User requested implementation; no merge/release/production deployment authorized.
- Accepted main `659697a686f341497725dfb31e94a8bc2bcf2b25`, rechecked unchanged on GitHub. Runtime/tests/harness committed as `211c7e485f95f1ed75221655697ca009fc9cab6b`. Maintainer explicitly requested commit/push of solution plus interim report at18:30UTC; separate interim documentation commit is being published. Verify remote head after push.
- User approved native foreground **Available when needed**. Existing Small only; no new vault or subagents authorized. C15–C26 remains paused.
- Node22.22.2 at `/Users/zsviczian/.local/share/fnm/node-versions/v22.22.2/installation/bin`; prefix PATH for all verification.

## Implementation and evidence

Classic projection/geometry and host contributions extracted behind internal view contracts; shared scene handles arbitrary areas, occurrences distinct from canonical IDs, entry/editor/frame and physical semantic ports. Per-native-document sessions own bounded view preferences/lifetimes and retain shared shell/editor/Sidecar owners. Only Classic ships. Test-only situated definition mounts actual Chromium renderer and native session; advanced multihop/corpus metrics/compact rendering remain explicit prerequisites. See design section16 and validation report for complete boundaries.

Immutable16-case geometry golden, membership and original indexing/parser bounds remain unchanged. Third full portable attempt passed architecture/core/1442 functional/230 browser/357 source/775 real-IDB and real build; native smoke timed out with theme migration notice, then identical-hash smoke passed after Done. Separate editor and pairs native lanes,15 sessions and grouping pass. Combined editor-plus-two-pairs fails before any view switch on both candidate and exact accepted659 control; no combined acceptance claim.

Late fixes: live action snapshot reads session revision synchronously; held tag writer reports cancelled if no write happened; native picker permits expected focus-return interaction while retaining view/root/document/attention/file and direct epoch fences. Focused session7/7 and structural23/23 pass. Native sessions readiness now requires changed document timeOrigin, within original deadline. Typing-badge native test compares enclosing toolbar instead of Find inside it, same1px tolerance; accepted main reproduces old failure (8px badge/toolbar,33.921875px Find). Failed samples retained.

## Active commands and exact native state

- Final-source `npm run verify:obsidian` attempt4 runs in exec session52778. Log `/private/tmp/kplex-215-verify-native-4.log`; report `/private/tmp/kplex-215-native/verify-4/report.json`. At18:31UTC it passed release/architecture/core/scanner/indexing,1445 functional,230 Chromium and357 portable source tests; real-IDB suite progressing after20,015-owner case. It began at dirty2de5bf8 before implementation commit; no runtime behavior changed since launch. No concurrent native/browser drivers.
- New picker fix built successfully once; attempt4 rebuilds final source before exact staging. Earlier native-tested candidate main a02c3a4 is stale for picker change. Do not reuse its hash assertion to stage final code.
- **Small currently has accepted baseline db896c12 staged** for matched action control, until attempt4 final staging replaces it. Baseline runtime exact659 archive at `/private/tmp/kplex-215-accepted-baseline`; driver only diagnostic edit. Baseline actions original assertion fails, cleanup/config pass, report `/private/tmp/kplex-215-native/baseline-actions/report.json`.
- Original Small was CLOSED with0.1.3 installed. Before first CLI open, `/private/tmp/kplex-215-native/before.json` and `backup/` captured exact8 artifact/settings/workspace files plus visible76 files/74Markdown digest and startup state. Never overwrite backup.
- Small `/Users/zsviczian/Obsidian/kplex-test-small`, config `.obsidian`, currently open; no production vault touched. Actual host1.15.0 installer1.14.0/Electron43.3.0/Chrome150/Node24.18.1 native; CLI22.22.2.

## Next actions

1. Observe actual attempt4 result. Preserve failure if any; fix cause without waiving guards.
2. Once aggregate report PASS, run `/private/tmp/kplex-215-native-final-sequence.mjs` with requiredNode/escalation. It requires verify4 PASS, runs serial view editor/pairs, sessions, groups, workflows, actions, sections and writes fresh `*-final` reports/logs. Stops at failure. No driver active now besides verify4.
3. Apply/announce read `obsidian-device-emulation` skill and run existing `verify:obsidian:action-devices` serially with fresh reportdir. Actual emulation/classification/geometry and cleanup, no physical-device claims.
4. Review final code/report, renew affected checks only if changed. Search production source/dist for test probe markers. Finish report/Refactor plan (contains nonUTF8 legacybyte; append preserving originalbytes)/design/contributor/handoff docs with actual final identities/results.
5. Run `/private/tmp/kplex-215-native-restore.mjs` only after all native lanes. It reacquires exact Small PID, rejects active controllers/floating popouts, closes only Small, waits exit and restores8 original bytes plus content digest and original closed startup state. Must complete before delivery. Clipboard limitations remain explicit; no prior clipboard read/restore claim.
6. Implementation211c7e4 and interim documentation are being committed/pushed per explicit user instruction. Verify remote publication and update existing draft PR around implemented scope/interim results. Continue remaining checks, publish final report and obtain green exact-final-head CI. No merge/ready/release.

Progress updates: same Markdown checklist at least10min, commentary within60sec during work. Latest remaining ETA40–70minutes as of18:29UTC; revise on material native/CI failures. Required physical Windows/phone/tablet unrun; native combined editor/pairs limitation is reproduced baseline, not silently passed.
