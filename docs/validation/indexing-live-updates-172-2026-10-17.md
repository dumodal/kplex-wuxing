# Live indexing and external materialization: PR #172

Work in progress; #172 remains draft and #161 remains open. No merge recommendation yet.
The accepted main runtime is `d40a339` (also unchanged by merged #169 at `9381c38`).
It was integrated into the existing implementation branch without rewriting history at `612a0c8`.
Baseline `main.js` SHA-256: `fbe9eaa3ba01e0b9c9634ddb5b82fc62503fb3d90da27be025547560182c1c85`.
Node 22.22.2; Windows / Obsidian 1.14.4; Excalidraw 2.29.0. Only the authorized disposable
`kplex-test-small` was accessed: 107 files / 88 Markdown before and after each pilot.

## First causal checkpoint

| Symptom / variant | Baseline result | First confirmed boundary / bounded correction |
| --- | --- | --- |
| A: externally created note absent from Find | Reproduced: live `TFile` and metadata, no physical or visible search hit while the actual coordinator's local-baseline publication was held; present after release. | Reactive unmanaged Markdown creation omits provisional availability when startup, a hidden surface or an active coordinator prevents immediate insertion. Use the existing physical availability owner. |
| B: stationary center remains incomplete | Reproduced in real IndexedDB: unrelated U patch held at its parser; A demand ends without an A read. After U drains, all task maps are empty but A remains inferred. Release/reacquire immediately produces explicit `Child`. | A center blocked by `building` is not retried when that owner finishes. Retain only the unmet live demand and wake it from existing completion boundaries. Implementation/testing pending. |
| #161: no prior ghost navigation | Reproduced with actual Create EX and trusted pointer input: pinned tab becomes the native child while the graph remains on Starting. The reusable native lane independently fails exact lookup after successful explicit precreation and pinned-target controls. | A published local parent scope renders an exact native child that `index.get(childPath)` cannot retrieve. Fix the read-selection owner; do not bypass lookup in the UI or confer write authority. |
| #161: prior ghost navigation | Independently reproduced: ghost/back navigation works; actual Create EX retains explicit `Child`, but the first trusted click still leaves graph and pinned file inconsistent. | Same exact-lookup omission; distinct from the stationary body-processing defect. |
| #161: tab reveal / repeated cycles | Tab reveal repairs navigation in the first pilot; four complete cycles then agree on graph/pinned identities. Relations remain inferred in that run, so this is not a semantic acceptance pass. | Preserve this control separately from first-click success; verify four full correct cycles after the fixes. |
| #161: later `Parent::` drawing edit | Reproduced: actual saved drawing and native metadata contain both links, but the stationary graph shows both as inferred children; no parent, hot body or active center task remains. | Consistent with the confirmed liveness failure. Require explicit parent above / child below and solid links after an actual drawing save. |
| C: excessive invalidation after small changes | Not established. A small On-demand event trace consumed the known resolver wave with no additional source reads/parses or broad inventory. | Trace actual session strategy and first invalidator before choosing a correction. Unknown resolver/folder changes keep conservative validation. |

The discovery pilot held a forced **On-demand local-baseline** publication. It does not establish
the required unrelated P3/P4 hold, Eager restart, or startup listener-handover acceptance; those
remain validation work. A restart-required Eager setup and two drawing-save setup controls are
retained and excluded. The drawing harness now waits for the actual scene update before saving.
No latency or native resource improvement is claimed from these functional pilots.

## Checkpoint A: provisional discovery

Unmanaged Markdown creates retain the existing idle-visible insertion path. Otherwise they call
`updateHostFileAvailability()` so native filenames can be discovered and selected independently
of unrelated graph work. The managed-create early return, dirty-source revision, per-file patch
backlog and source/write validation owners are preserved. No body read, canonical relationship
publication, scheduler, persistence format or source-validation change is introduced.

Node 22.22.2 `node tests/indexing.test.mjs` passed, including actual reactive-listener/GraphIndex
cases for startup handover, hidden demand and a held On-demand coordinator, plus rename,
deletion, replaced native identity and managed materialization controls. Full verification and
exact-build native acceptance of the implementation are pending. Older-publication search
continuity is a separate focused regression under investigation.

## Evidence and remaining acceptance

Private verified copies are retained outside temporary storage at
`%LOCALAPPDATA%/kplex-validation/pr-172/baseline-d40a339/` and
`%LOCALAPPDATA%/kplex-validation/pr-172/baseline-native-issue161/`, with per-file SHA-256 manifests.
The latter contains the exact reusable driver/helper and its expected failing native receipt.
Raw originals and failed controls remain intact. No archive or raw traces are published.

Remaining gates include exact-build full verification; real unrelated P3/P4 holds with visible
search selection; stationary completion/cancellation; both actual Create EX variants, four
cycles and later explicit edits; rename/delete/replacement and hidden/reveal controls; genuine
Eager restart and bounded small-change invalidation/resource observations. Linux, macOS and
physical mobile acceptance remain unrun. No personal vault access, receipt, reader sharing,
new scheduler/schema, release or automatic merge is authorized.
