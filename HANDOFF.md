# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# PR 137 — implementation and native validation return

Direction: implementation/validation agent → maintainer. State: accepted/inactive following successful manual-test confirmation and explicit commit/publication/merge authorization. Full automated verification failures remain recorded. No automatic refactor work; C14 stays paused. Maintainer also authorized resolving merge conflicts. No plugin release is requested.

## Scope and identity

Branch `2026-10-11-issue-127-remote-image-consent`; plan commit `684af400007233632b57023e3fccfd109f29da3f` precedes implementation commit `30e480484cc54d341dbc13ffca44a31ba67759f4`. Approved runtime base `2b128c89555b88ebf207a709d7c0669bed3dfd73`. Initial tree was clean. Implementation commit and final merge identities will be recorded by PR #137. Temporary `docs/agent-handoffs/issue-127.md` is deleted in the diff. No package dependency, lockfile, CSS or generated artifact source change.

Delivered: `allowRemoteNodeImages` defaults false and grants only explicit boolean true. Existing Node images settings group has a localized toggle/disclosure. Existing parser/resolver rejects HTTP(S) imagery before resource assignment; local candidates/fallback and attachment behavior remain. Final ThoughtNode guard classifies resolved destinations, allowing host-owned local resource URLs independently of their spelling. Revocation synchronously invalidates cached/pending visuals and notifies all surfaces before persistence. Prepared presentation keeps permission live; real PlexGraph bulk and metadata effects fence promises and queued state updates across revoke/off-on/unmount. Consent-only saves perform zero semantic refresh or source work. Existing expanded mini-nodes remain label-only; no new imagery behavior was added. Browser requests sent during authorized opt-in cannot be undone.

Source owner review: small host-free policy, canonical GraphIndex/GraphPresentation/settings owners, existing declarative UI/localization and owning-document rendering. No semantic snapshot/index schema, ontology, relationship/image-only-link suppression, indexing engine, cache schema or global-plugin boundary changed. New/affected functions and headers have TSDoc. Two exact new catalog keys use established English fallback; translations remain pending. Human source review supplements automated architecture/lint and does not claim they prove every design property.

Implementation hash inventory SHA256 (excluding this handoff and its validation reports): `7e34a73e1ead8b4cc38f30f3586908c5b7af09d2dda0e46c511fb41210691907`. Runtime source inventory SHA256: `011afe501b11fa07829c453f7a2ed118b572992bf480de8b5f70bac0ed6709af`; JSON defines the deterministic inventory algorithm/file hashes.

## Actual checks and capabilities

Node 22.22.2, existing real dependencies/Obsidian typings 1.13.0. Native Obsidian 1.14.4 (installer 1.14.0), Darwin 23.5.0, installed Google Chrome. Source/build/browser/CLI/network/Git reads available; local IPC/browser server/staging needed sandbox escalation. Browser lanes and native drivers ran serially. No physical mobile environment.

- Final architecture 7 pass: 104 migrated roots, 189 reachable files, zero violations; official Obsidian lint clean.
- Final restricted core typecheck and 88 tests pass; indexing compatibility and all 24 settings-independence scenarios pass.
- Attempted full lane portable aggregate 651/651 pass; final sources 333/333 pass.
- Final consent/migration/settings suite 32/32 pass, including all 6 real browser/effect tests. Real Chromium/React/IndexedDB plus an owned image server prove zero arrivals when denied, modes/inline/local fallback/multiple documents, held results and revocation. Actual settings-save and PlexGraph effect callbacks are compiled, not duplicated implementations.
- Production build pass against actual installed typings. Final main.js `e2a47f009ec0f2e07711f0772e39e993ba79ee46de5fad22e040c080405f39da`; styles.css `e8c9279e8904888aa71d5dd2b01f320d5b32fd10e15feb0b9a9576a34f11cea3`; manifest.json `0beacdb94adc4a0ec318d69dba87fcb4dc9c1a86784058db341fdefe0dfb4250`.
- Exact built artifacts separately staged atomically only in disposable `kplex-test-small` after strict gate stopped before staging. The explicit staging receipt records the failed gate and grants no waiver.
- Final native consent lane 5/5 pass: initial/main navigation + expansion + trusted hover over all owned node bodies/local decode; fresh no-consent popout with main retained; opt-in across both; revoke plus native metadata change; saved opt-in/reload/subsequent revoke. No captured JS errors. Test folder, popout, probe/server removed; settings/community bytes, preferences/workspace/follow ownership restored. Final CLI confirms plugin loaded, no probe globals, no fixture. No production diagnostic prefix in src/dist.

## Failed gates and evidence limits

`npm run verify` via strict `verify:obsidian` failed: existing combined UI lane 39 pass/19 Chrome `--dump-dom` launcher ETIMEDOUT at unchanged 20-second bound. The unchanged FloatingLayer owner-document test reproduced the timeout; component/dependency/test sources match approved base. Underlying launcher cause is not established. Strict native runner did not stage; focused native acceptance was explicitly staged separately. This is not a full-verification pass.

`npm run test:sources:browser` finished 427 pass/1 fail: `tests/source-startup-indexeddb.test.mjs:539` offline-edit startup reads `["A.md","A.md"]` instead of once. Prior handoff records the same assertion on an earlier host. Isolated assertion passes on both approved base and implementation; the complete startup file also passes 49/49 separately on each tree. Broad-suite failure remains unresolved and cannot be waived by isolated passing checks. No timeout/assertion/golden/lint/architecture guard was relaxed; no unrelated engine fix was made.

Earlier native fixture failures (invalid PNG CRC, local lazy image outside viewport, incorrect assumption expanded mini-nodes have images) are explained in the durable report. Setup/assertions corrected to actual product behavior, cleanup passed each time. Native/iframe DOM/network evidence is not physical touch/WebView or paint acceptance. Previously accepted mobile sidebar work does not accept this feature.

## Maintainer acceptance and repository completion

On 2026-10-11 the maintainer confirmed “I confirm tests are successful” and authorized commit, push, completing the PR, merge, switching to main and fetch. The maintainer separately authorized resolving any merge conflicts. This follows the explicit report of both automated failures; those failures remain failures and no check is weakened. Device/OS/individual manual-test traces were not supplied; no detailed physical-device evidence is inferred. No further manual test is requested for this accepted handoff.

Finalize the existing PR #137, preserving its issue/history and replacing its planning description with final behavior and honest validation. Record actual commit/merge identities in GitHub and final delivery. Full evidence: [validation report](docs/validation/remote-node-image-consent-2026-10-11.md) and [JSON identities/receipts](docs/validation/remote-node-image-consent-2026-10-11.json). No automatic follow-up runner/startup diagnosis or refactor is authorized by this completed feature. Release/deployment to a personal vault is outside this assignment.

Current publication checkpoint: integrated `origin/main@1b0ac271e380aa715d0fd5e93521c16ab937d85e` (PR #136), resolving only current handoff/native-script conflicts. Combined build/lint/architecture 7/core 92/focused 32/indexing plus 24 scenarios pass. Initial indexing timing failure under parallel checks is retained; serial rerun passes unchanged. Rebuilt native consent 5/5 passes with cleanup/no errors. Combined source inventory `2ac330d5b4a706d4b9fbcd6a01e0d6672e2a39a03a25b24ef2f950855eb9c7e4`; main.js `a7ef4efef7707c24b05b5d137d0db16c96646cbf9878cf1817c56a41f6ab0258`. Full current receipts/file identities are in JSON mainIntegration. Earlier exact-build hashes describe the pre-integration manual-test candidate; no broad gate is relabeled green.
