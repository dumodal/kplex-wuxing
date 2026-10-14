# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# PR #153: unattended implementation and validation ready for maintainer review

The maintainer authorized continued unsupervised work, with a commit and push after every independently validated checkpoint. This branch is `2026-10-13-indexing-performance`. No merge, release, PR-ready change, external message or structural C15-C26 refactor is authorized. C14 remains accepted. Do not spawn agents. Read AGENTS.md and CONTRIBUTING.md before further work; keep user-visible progress within60seconds and checklist/ETA within10minutes during active work.

## Delivered results

The progress table and all checkpoint links are in `docs/validation/indexing-overnight-2026-10-13.md`. Earlier A/B/C/E changes remain committed and pushed. Recent checkpoints:

- `99f12f3`: native URL heap/flush attribution.
- `ba83041`: reuse published URL vocabulary; exact work/public search oracles, full verification and native comparisons pass. Independent native median graph heap39.43→37.91MB and largest unforced flush49.7→35.4ms versus preceding E3.
- `3ef54e2`: actual adjacency storage baseline.
- `cacefe5`: reuse native backing for the private URL delta. Separate live Maps8,042→0; independent graph heap38.30→37.47MB;16,384two-entry wrapper controls3.74→2.17MB. No source/scheduling/schema/semantic change.
- `b6f4202`: matched aggregate A→B5 outcome, all28native lifetimes/22stages pass. See the explicit tradeoff below.
- This checkpoint adds the completed real-source retention exercise and documentation; its parent isb6f4202. Stage, commit and push these final files, then report completion and the remaining acceptance items. No runtime code is changed by this final validation checkpoint.

## Remaining acceptance gate

PR153 M4 requires an explicit decision for a material retained-memory/foreground tradeoff. Direct A a162044 versus current B5 cacefe5 results:

- Three unwrapped replay medians25,895.8→13,807.2ms, approximately46.7% shorter; ranges do not overlap. Separate counted origin working visits31,996,000→0 in every pair.
- Five retained graph medians34,200,172→36,853,296bytes: +2,653,124bytes, approximately7.8% of this isolated URL graph. Every pair has a premium; none excluded.
- Largest unforced flush medians32.2→35.3ms, with larger naturally accumulated batches. Largest heartbeat-gap medians49.5→42.8ms have mixed pair signs and overlapping ranges. GC still drives some worst gaps.

The earlier B4/B5 reductions do not eliminate this aggregate space/flush cost. Unconditional aggregate performance acceptance awaits the maintainer's decision. Keep the PR draft; do not merge/release or claim mobile/OOM/full-startup/paint/process-peak acceptance. D's bounded URL writer is explicitly deferred under the PR's measurement exit rule: cache-only61.1→32.2ms versus859ms pipeline, with significant stored-write/generation-fencing complexity. No additional runtime candidate is justified by current exclusive measurements; do not start an unmeasured redesign merely to continue.

## Current accepted production identity

Both authorized vaults have the exact B5 build:

- Main SHA256: `0e0d599107d4efbd565a215f8544716831fd044a830317d362ac3f14a67dc9f4`.
- Styles: `e8c9279e8904888aa71d5dd2b01f320d5b32fd10e15feb0b9a9576a34f11cea3`.
- Manifest0.1.3: `19d9ecce5557733e0ff0f2e27155e635c30158c3cfa6fbca0f11c16e4dedfd2c`.
- UrlAdjacencyMap source: `375c260daf99de88004e1f18dac7d9f601ad998e2ee9d8c31af2a846c32800a4`.

Full verification exits0: architecture7/core128/normal824/UI63/portable334/browser495/lint/real build/exact small-vault native smoke; six foreground cases also pass. Full receipt: `docs/validation/indexing-url-adjacency-storage-2026-10-14/host-verification.json`. Later measurement/tooling checkpoints transparently reuse this unchanged runtime acceptance, rather than claiming another full suite run.

## Final retention validation

New `scripts/testing/obsidian/urlUpdateRetention.mjs` reuses `nativeUrlFixture` without changing its small-vault bound. One owned note alternates two fixed512-target URL sets through64real Vault.modify/current-metadata/refreshUrlOwner operations. Foreground immediate publication is production policy, not a test-forced flush. Primary work settles before defined GC epochs.

Final diagnostic source SHA256: `acb2470205dda0be2910d988721cd0c4b0b5ec55c7b54724c089ab5d114321a6`. The two-revision pilot and initial64run passed. Review added an explicit initial metadata stamp and collection of all observed Maps after disposal, then the final64run passed. Earlier sources/receipts remain distinct, not excluded failures. Final results:

- Exactly64isolated body reads and64parser calls.
- All revisions pass current/retired lookup/search, canonical relation and displayed-target isolation checks.
- Every GC epoch has514pages,1,024declarations,514published targets, origin depth0and512retained origin entries.
- Sixty-five observed displayed origin Maps leave only the current one per epoch and zero after disposal. The private index also collects.
- Renderer JS574,401,020→576,190,132bytes; revision8→64drift233,532bytes; after disposal575,188,184bytes. This includes Obsidian/primary/cache/diagnostic activity and is not isolated private-index allocation, process peak, a flat whole-plugin heap claim or hours-long/mobile acceptance.
- Independent native audit verifies owned note and primary persisted URL row absent,88Markdown/106files restored, primary URL work idle, no debugger, unchanged throttling and configuration-byte guards. Shared fixture enacts captured geometry restoration; no serialized before/after workspace comparison was captured.

Report/raw: `docs/validation/indexing-url-update-retention-2026-10-14.md` and sibling directory. Independent checks validate sixJSON receipts, three local links, actual driver/function/definition hashes, both installed artifact sets, unchanged production source, syntax and whitespace. Final64session63406 and preliminary60758 are complete; no active native/browser/build job, controller, debugger, subagent or goal remains. Temporary helpers: kplex-153-update-retention-{evidence,final-checks,audit}.mjs. Raw native folders use kplex-153-update-retention-{pilot,final,complete,audit}; use `complete` for final acceptance. The source snapshot in TEMP/kplex-153-url-update-retention-preliminary.mjs identifies earlier receipts.

## Environment and recovery notes

- Small vault: `C:/Obsidian/kplex-test-small`, config `.obsidian`,88Markdown/106files; prefer it for functional work.
- Large vault: `C:/Obsidian/kplex-test`, config `.obsidian`,20,088Markdown/20,107files/15folders including root. On-demand global source authority remains intentionally incomplete outside requested scopes.
- Preserve `Indexing-performance-153`, the existing20k-note fixture. Its byte hash is`50b8cb12ef83c3cd62f1605390fe6ff793079a9f6e37e471e59d0060cf287cd0`.
- Native URL seed`f4efd617186c7464198e8a8ca7073fed49d3e2a23d73f80af76f21e87014f5af`; graph/evidence`31a78202bb997736c2ea056a0d3e1865070e0454f0c04f023f6f9688f8042d50`; physical`c88c1776685b60c1456806457ac97679653f30326c6ef572ba5b13e747f607e0`. The graph has16,069TOTALpages =8,040URLs+8,029Markdown owners,16,127declarations and8,000origin neighbors.
- Node22.22.2: TEMP/kplex-node-v22.22.2/node.exe. Prepend its folder to PATH; npm_execpath isC:/nvm4w/nodejs/node_modules/npm/bin/npm-cli.js. Explicit KPLEX_TEST_VAULT_NAME/PATH/CONFIG_DIR are mandatory. Native/Git writes use already-authorized escalation.
- PowerShell5redirected native logs are UTF16LE BOM; use file scripts rather than embedded Node-e quoting. File imports require file:URLs. Historical temp build directories contain node_modules junctions; never recursively delete through them.
- Native document.hidden may remain true despite focus after minimization. Existing serial templates close Plex views/reload/settle and retain actual foreground/throttling. Wait URL completion before strict native render/opening Plex. Stage helper TEMP/kplex-153-b2-restage.mjs reuses prior full verification only by all three hashes, reruns stage/render, and saves/restores enabled bytes/settings guards.
- The first historical M stager changed enabled-list serialization irrecoverably; subsequent exact bytes are preserved. Do not retroactively claim that first serialization was restored. Never commit settings or vault contents.
- Old A artifact pointer isTEMP/kplex-153-m-baseline-artifact-location.txt (mainbc829...; hydration full receipt). The B5 exclusive baseline pointerTEMP/kplex-153-b5-baseline-artifact-location.txt is older B4/main7d7..., not A. Current production source is cacefe5/main0e0d....

The Windows assertions available here are automated and pass. No extra manual Windows check is requested. Remaining prioritized acceptance is the explicit aggregate tradeoff decision and macOS/physical Android/iOS coverage; whole application startup, process peak and hours-long sessions remain unmeasured. Further work should follow an accepted tradeoff or a newly measured concrete bottleneck, preserving every existing bound and semantic owner.
