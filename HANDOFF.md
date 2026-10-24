# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: PR215 Classic foundation — restoration correction validation

Zsolt's Codex Agent,2026-10-24 18:50UTC. Active checkpoint; final acceptance pending.

## Identity and authorization

- Repo `/Users/zsviczian/GitHub/kplex`, branch `2026-10-24-plex-view-plugins`, draft PR215. Accepted main659697a unchanged; merge/release/production vault deployment NOT authorized. C15–C26 paused; no subagents.
- User explicitly requested **commit and push solution and interim report** at18:30UTC. Implementation211c7e4 plus reportda6c90c pushed/read back; PR body now implemented/interim, remains draft. CI458/run40121120055 running on da6c90c.
- New runtime correction committed c24fa9a208e86854e9612d1f250bc05a1c89168c; native failure diagnostics38d4340. Second interim documentation commit being prepared/pushed. Keep remote head verified.
- User approved native foreground **Available when needed**. Only existing `kplex-test-small` `/Users/zsviczian/Obsidian/kplex-test-small`, config `.obsidian`. No new vault.
- Required CLI Node22.22.2 PATH `/Users/zsviczian/.local/share/fnm/node-versions/v22.22.2/installation/bin`. Native Obsidian1.15.0 installer1.14.0/Electron43.3/Chrome150/nativeNode24.18.1.

## Current implementation and actual results

Classic-only shipped registry; portable projection/geometry plus host contributions, generic areas/occurrences/anchors/ports, bounded per-document preferences/lifetimes/recovery and actual test-only situated browser/native probe. See design section16/report for unsupported multihop/corpus/compact prerequisites. Frozen16-case geometry and original indexing/parser guards unchanged.

Attempt4 complete `verify:obsidian` PASS: architecture7/core130/functional1445/Chromium230/source357/real-IDB775/scanner/build/types/exact native smoke. Artifactbc05e96d9c8b109674809b529127997687fb747c76e0ebe8f4f8b587751354ce; manifestc28f6157/stylesec5b05c7. Its source receipt began dirty2de5bf8;211c7e4/da6c90c committed during run.

Native bc05: editor lane PASS; workflows-final8 scenarios,51 trusted keys/11 canonical writes PASS, cleanup/config PASS. Earlier sessions-2 all15 and grouping pass retained. Two pair lane cleanup failures (view-policies-final,view-pairs-cleanup-attribution) attribute60s rejection to Vault.delete(emptyFolder), folder alreadygone, no owned resources/settings differences; native app.js getZoomFactor error captured, also historically documented in PR187. No timeout change or claimed fix.

Native interaction fixture was degenerate:1097px viewport, left445.5547/right541.5234, main65.921875/graph~42/Find width0. Original backup right sidebar was collapsed; do not claim it originally consumed width. Public collapse both sides (receipt interaction-fixture.json, before-interaction-fixture.json) gives usable main. `view-policies-wide` editor AND pairs PASS all cleanup. `sessions-wide` passes13 interactions then fails exact native tab inventory after reload; cleanup/config PASS. Expected/actual inventory now captured by harness. Initial actions symmetry failure reproduced exact accepted659; measures toolbar edge now same1px tolerance plus retained/extended overlap checks. Narrow-fixture actions overlap and sections ctrl-wheel remain failed samples.

**Proven production defect found:** PlexViewSession.restore notified subscribers before native center/target/Sidecar preferences restored. Actual-owner test before log `/private/tmp/kplex-215-restoration-order-before.log` FAILS observing null/default/false; c24fa9a moves view publication after native scalar decode. After13/13 session checks and actual build PASS. Native inventory causality remains UNPROVEN. New build main f86f94ddb54c44e83162af823ad5579c64d75be7067c61ddcdebe0359c5d12b0.

## Active work / native state

- Complete `npm run verify:obsidian` attempt5 RUNNING exec35530, log `/private/tmp/kplex-215-verify-native-5.log`, report dir `/private/tmp/kplex-215-native/verify-5`. Started at dirtyda6c90c before c24fa9a commit; no runtime behavior changed after launch. No concurrent native/browser drivers.
- Small OPEN, currently installed old candidatebc05 until attempt5 stages newf86. `dist` alreadyf86 from focused build. Do NOT run old artifact native scripts until verify5 completes/stages.
- All prior native sequences exited:93244,90452,94485. Current old wide sequence results stop at sessions-wide. No active native controller; last driver cleanup confirmed. Both sidebars currently collapsed as interaction fixture, native source layout original help note. Native rendererPID43171 (reacquire, never assume for cleanup).
- Original Small CLOSED with0.1.3 installed. `/private/tmp/kplex-215-native/before.json` and `backup/` captured8 exact artifact/config/workspace files and76files/74Markdown content digest BEFORE first open. Do not overwrite. Original right sidebar collapsed; final byte restore required.

## Next actions

1. Finish second interim docs/report and push c24fa9a/38d4340 plus docs, verify PR head/read-back, update PR body/new CI. User authorized this explicitly.
2. Observe attempt5 actual result. Preserve failures; no arbitrary timeout/retry/outlier waiver. Native source fix requires renewed exact artifact receipt.
3. After verify5 PASS, prepare fresh serial native script from `/private/tmp/kplex-215-native-final-sequence.mjs`, change receipt toverify5, all report names to new unique names. Use public sidebar collapse before interaction fixtures and record actual main width. Native drivers serial only. Rerun sessions with new inventory diagnostics, editor/pairs, groups/workflows/actions/sections. Fixture setup is not a production geometry fix.
4. With usable width consider combined native editor+two-pairs lane (`KPLEX_PLEX_VIEW_NATIVE_LANE=combined`) to revisit old before-switch failure reproduced on accepted baseline under prior conditions. Do not claim prior combined accepted limitation caused by width without actual run. Private `/private/tmp/kplex-215-native-shell-control.mjs` exists but UNRUN; no need stage baseline again unless comparison justified.
5. Announce/apply read `obsidian-device-emulation` skill, run existing action-devices lane with actual app.emulateMobile/width/classification and restore. Physical Windows/phone/tablet unavailable.
6. Finish final report/architecture/design/contributor/Refactor-plan/handoff evidence. Refactor plan has legacy nonUTF8byte: append bytes preserving original, do not rewrite whole file as UTF8. Production src/dist must lack test probe markers.
7. Run `/private/tmp/kplex-215-native-restore.mjs` after all native work. Exact Small identity/controller/popout guard, close only Small, wait renderer exit, restore8 original bytes/content digest and originally-closed registry flag. MUST complete. Clipboard checks replace OS clipboard; original contents were not read/restored, state limitation honestly.
8. Publish final evidence and green exact-final-head CI. Keep PR draft unless applicable acceptance/approval; no merge/release.

Progress protocol: same checklist at least10min, commentary within60sec. Last user ETA45–75min at18:48UTC after proven runtime correction. Last checklist18:42UTC. Continue work, do not end after interim publication.
