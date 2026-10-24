# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR215 extraction checkpoint and required occurrence-editor task

Zsolt's Codex Agent,2026-10-24. Maintainer explicitly requests docs publication now for preparing subsequent PRs; documentation can be extended later.

## Firm planning boundary

Read [the implemented capability matrix](docs/PLEX_VIEW_PLUGINS.md#16-implemented-boundary-and-capability-matrix) and [occurrence-editor hosting prerequisite](docs/PLEX_OCCURRENCE_EDITORS.md) before preparing view jobs. Arbitrary-node editing is required but **unsupported by the current runtime**. The current native host has one attention-following editor per Plex. Root/attention/selection/editor/focus independence, occurrence-keyed document bindings and the real R/A/B-to-C proof are a mandatory dependent task before parallel view implementation. Initial capacity one is acceptable; simultaneous editors are not requested or claimed. Branch expansion and editor expansion remain separate.

The maintainer permits finishing the verified extraction and identifying this bounded dependent task if runtime decoupling is too invasive for closeout. That path was selected after tracing the actual eligibility/document lookup, single overlay/size/maximize, camera fitting, attention-scoped transient state and native focus/navigation ownership. Do not remove the attention-equality guard as a shortcut. The task specifies replacement validation and reuse of existing native editor/lifecycle owners.

## Exact implementation and publication

- Repo `/Users/zsviczian/GitHub/kplex`, branch `2026-10-24-plex-view-plugins`, draft <https://github.com/zsviczian/kplex/pull/215>. Accepted main659697a; no merge/release/production deployment authorized. C15–C26 paused. No subagents.
- Runtime211c7e4; restoration coherence correctionc24fa9a208e86854e9612d1f250bc05a1c89168c; native diagnostic38d4340; second interim report2cc1c155f171ab5974a7934e090581315c1d4d13. All pushed/read back. Runtime unchanged sincec24fa9a.
- Current harness correctionf6d24e196be9969a43a6afbd1338c18bcefaa33d and these planning docs are being published under explicit user authority. Verify latest PR head and its checks; do not infer green status for a new commit from an earlier run.
- Required CLI Node22.22.2. Complete `npm run verify:obsidian` attempt5 PASS: architecture7/core130/functional1446/Chromium230/source357/real-IDB775/scanner/real build/types and exact native smoke. Report `/private/tmp/kplex-215-native/verify-5/report.json`. It began dirtyda6c90c before the pending changes were committed; actual compiled runtime is the correctedc24 code. CI459/run40122634910 PASS on clean published2cc1c15; CI458 PASS on earlierda6c90c.
- Final tested main.js `f86f94ddb54c44e83162af823ad5579c64d75be7067c61ddcdebe0359c5d12b0`, manifest `c28f61576adfe73800994c8fd47671fcd5880c21809cac63595cfbe3715c7a01`, styles `ec5b05c72b5f97f005dd81a8d7b7eceffe003cc3e16b0f94b3a9e8a2ad96dc53`.

## Native evidence and remaining limits

All native drivers are finished. Final artifact passes separate editor/pairs (`view-policies-coherent`), workflows8 (`workflows-coherent`), full Mac action21 with4 real OS clipboard chords (`actions-os-keys-2`), grouping4 including independent popout (`groups-explicit-attention`), sections12 (`sections-effective-typography`) and desktop/tablet/phone emulation (`devices-mounted-plex`). Device sizes1200x875/900x875/390x844; mode/bounds restored. Physical Windows/phone/tablet unrun. Skill used: `/Users/zsviczian/.codex/skills/obsidian-device-emulation/SKILL.md`.

Retained failures and narrow harness corrections are in the validation report. Native labels had switched to aria-labelledby in accepted#214; the action probe now resolves the actual translated name. Group popout now explicitly navigates to its fixture center. Section probe reacquires live nodes, explicitly Fits before trusted pointer input, and edits/restores the effective desktop typography override. Device preflight requires a visible Plex for Settings focus restoration. No original assertions/deadlines were waived.

**Still failed:** exact session restart inventory:13 interactions pass, all10 expected IDs retained,6 extra tabs appear. Same instrumented driver on exact accepted659 artifact reproduces the same10-to16 condition (`baseline-sessions-wide`); no new-regression claim or oracle weakening. Combined editor+two-pairs also fails before any view switch with native leaves typeempty, reproduced on accepted baseline earlier and final candidate (`view-combined-coherent`). Separate passes do not establish combined acceptance. Small app.js zoom errors and empty-folder teardown timeouts remain historical failed evidence, not claimed fixed.

## Native restoration — COMPLETE

Existing Small `/Users/zsviczian/Obsidian/kplex-test-small` is CLOSED again. Do not issue another CLI/CUA request to that vault during CI; it may reopen it. At19:50UTC `/private/tmp/kplex-215-native/restoration.json` PASS: exact tested renderer exited,0 controllers/popouts,8 original artifact/config/workspace files restored byte-for-byte, original0.1.3 installation and startup closed flag restored. Follow-up byte check also passes. Original visible content76files/74Markdown/355984bytes/digest `ecef2de03f4484f642031bc8e492a553797be5b81db938959b4c01aa7f5159eb` matches. No new vault or production vault touched. Native copy tests replaced OS clipboard with owned fixture content; unrelated prior clipboard contents were not read/restored.

## Remaining closeout

Publish docs immediately as requested, verify remote file/head read-back, update PR body to the actual extraction/editor prerequisite and native results, and wait for green CI on the published harness/docs commit. Keep PR draft; no merge/release. The full report is `docs/validation/plex-view-plugins-215-2026-10-24.md`; it preserves the interim history and can be extended without falsely marking unsupported hosting complete.

For the two baseline-shared native limits, the next bounded experiment is to capture the creation/type/caller of the6 new tabs and the first owned `setViewState(empty)` transition on accepted main under the fixed disposable fixture. Do not begin a general indexing campaign or suppress these guards. Occurrence-editor implementation must pass the required native proof before new views claim it.
