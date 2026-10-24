# PR219 occurrence-editor host: interim evidence

Zsolt's Codex Agent. 2026-10-25 Budapest / 24 UTC. **M0 is implemented in part and remains under validation. Mind Map is not implemented.** Wu Xing is independent and keeps the unchanged attention-following editor contract.

## Artifact and scope

Branch `2026-10-24-canvas-mindmap`, accepted main `998781070a9382005154f4f884ed753280a9cf52`. Published foundation `726a057`, admission `9e7cb86`, rooted session `5cae146`; native integration was tested as uncommitted changes above that parent. All recorded runtime source hashes were compared with the checkpoint before publication and matched. Production builds embed the manifest version, not Git identity; source/artifact hashes establish attribution.

Native main.js SHA256: `b315d1cd1c86ed4df43b413b60858e047cbe5132c8618f88d09b4e92cd89f18a`; manifest: `c28f61576adfe73800994c8fd47671fcd5880c21809cac63595cfbe3715c7a01`; CSS: `ec5b05c72b5f97f005dd81a8d7b7eceffe003cc3e16b0f94b3a9e8a2ad96dc53`.

Node22.22.2 with real dependencies; macOS Darwin23.5.0, Obsidian1.15.0 / installer1.14.0. Installed declarations/minimum1.13.0. Only the already authorized disposable `kplex-test-small` was staged. Interim staging was not full verification. The production registry still exposes Compass only.

## Correction implemented

Optional occurrence hosting is additive. Omitted editor/navigation policies preserve Compass and unchanged non-Classic attention-following definitions. The existing per-canvas session owns capacity-one bindings, root, transient state and bounded restoration intent. Shared actions expand/collapse/resize the exact admitted occurrence; duplicates do not share expansion state. Native tokens and buffers are not serialized.

The shared renderer resolves the explicit canonical/native document, supplies occurrence dimensions through measurement/layout and retains its existing native component through ordinary attention, reflow and scroll geometry changes. Background admission does not navigate attention or Sidecar. Native links use shared navigation without incidentally retargeting the bound editor. Explicit collapse awaits the existing native save lifecycle; failed save retains the editor. Cross-definition transitions and branch removal that cannot retain it are refused explicitly.

## Actual automated results

- 116 focused tests passed: action foundation, view session/contracts/Compass golden, native controller doubles and all localization catalogs. Initial new English description failed the existing minimum-word assertion; copy corrected and affected checks rerun. No assertion weakened.
- 12 Chromium tests passed: actual shared non-Classic/rooted renderer plus existing canvas selector/settings suites.
- Real production build, complete Obsidian scanner, architecture checks (7 tests, zero violations) and whitespace check passed. An unsafe iterator `any` introduced in root eviction was corrected; scanner rules unchanged.
- Full `npm run verify`, final exact-build `verify:obsidian` and exact-head remote CI remain pending for this native integration. Earlier foundation checks and #218's successful final verification are not substitutes.

## Native observations, in order

Attempt1 passed all eight cases with normal probe cleanup:

1. Root R / attention A / native editor B1, with root, attention, Sidecar and native focus retained during background open.
2. Attention C retains R and the same B native instance. Opening B2 returns explicit capacity-one restriction.
3. Genuinely dirty B, caret/selection and native focus survive resize to660×410, nearby-node reflow and area scrolling. Observed clip: `inset(33.1617px 0px 0px)`.
4. Lens filtering pins B1 alone; branch removal is refused. The actual selector reflects rejected transitions and explains incompatibility.
5. Injected native save rejection retains B; restored save plus explicit collapse persists the marker to the Vault.
6. Bounded intent restores after owned native view recreation with fresh native identity. This is not a whole-application restart.
7. Genuinely dirty main→popout→main migration retains B content and persists it on explicit close.
8. An unchanged off-centre attention definition, with neither new policy, retains native editor/buffer/caret through compatible Compass switches.

Attempt2 strengthened the nonempty-selection precondition and required overlay placement within1 CSS pixel of B1's displayed rectangle, with positive clipping. Those checks and the first seven cases passed again. The run then **failed** before physical rename at `app.fileManager.renameFile(B, renamedPath)`. The native method was awaiting `runAsyncLinkUpdate` → `metadataCache.onCleanCache`; `inProgressTaskCount` was0, but the link-resolver runnable remained active and `isCacheClean()` was false. No physical rename or M0 deletion control completed. This observation alone does not establish an M0 regression or a baseline host fault.

The240-second experiment deadline and20-second normal cleanup deadline both failed because the foreign await did not settle. This is preserved as a failed sample, not discarded or retried into a pass. Independent path/PID/content-guarded cleanup closed the owned canvas, removed its four notes/folder, retired only the timed-out closed controller and terminated only Small's renderer through ordinary vault close. The renderer exit cancelled the unsettled realm. Independent restoration passed; normal attempt2 cleanup did not.

## Restoration and retained evidence

Small was restored and closed at `2026-10-24T23:41:20.309Z`; renderer37228 exited. All eight original configuration/plugin files and all77 content files match the backup. Content:74 Markdown files /362132 bytes; sorted-entry digest `36372292bd7d6d60f52dfe7eccacc4e56d223bdf602c8f0f8614502357cff162`. No personal-vault deployment or new vault was used.

Private evidence remains under `/private/tmp/kplex-219-native`: `attempt-1/occurrence-editors-219.json`, `attempt-2/occurrence-editors-219.json`, failed staging receipts, attempt2 independent abort/retirement receipts and `restoration.json`. Logs: `/private/tmp/kplex-219-native-attempt-1.log`, `...attempt-2.log`, `...host-focused-3.log`, `...host-browser.log`, `...host-scanner-2.log`, `...host-architecture.log` and `...native-probe-build.log`. Private backups remain intact and are not committed.

## Remaining proof and next experiment

Run one bounded accepted-main native editor/migration control observing the cache-clean gate. Keep foreign operations bounded and preserve their ordering/outcomes; do not change scheduler/cache flags to manufacture completion. External Vault rename can separately represent an external filesystem producer, but cannot count as a passing FileManager workflow.

Complete external rename/deletion/recreation identity and durable teardown controls, plus authoritative hiding combined with failed save. Then run full verification, exact-build native acceptance and final-head CI before marking M0 accepted or shipping a production occurrence definition. Existing #215 combined-editor/two-Sidecar and extra-tab limitations remain documented. Physical Windows/mobile, full application restart and simultaneous editors are unproven; capacity is exactly one. No manual performance campaign is requested.
