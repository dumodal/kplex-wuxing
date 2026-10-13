# Indexing performance: first measured increment for #153

## Scope and decision

This is the first bounded implementation from [PR #153](https://github.com/zsviczian/kplex/pull/153): a targeted M work-count baseline and E1, the ordinary semantic-no-op correction. It does not implement A–D or E2/E3, certify the full measurement matrix, diagnose #93, or claim a startup/whole-engine speedup. Further packages need their own measurements and checkpoints.

The checkout started clean on `main` at accepted runtime base `df5335808aacfd6a11ac7ff4ef008f9406f27893`. Measurements were captured before committing on `2026-10-13-indexing-performance`, whose planning head was `3dec09763968f27f12a783fdad37540a4ca8a4e7`. The maintainer subsequently authorized the local checkpoint commit `1411e4b`; it has not been pushed. Related #147/#148/#149 remain open. Settings-policy ownership, release metadata, label rendering and paused C15–C26 work are outside this increment.

Measurement selected a contained, reproducible cost: an ordinary no-op with existing depth-eight evidence compacted the entire evidence store and cloned the source's complete neighbor map, even though no evidence fork or relationship write was needed. Warm input already avoided body reads/parses. E1 removes that maintenance without changing source admission or semantic interpretation.

## Environment and fixture identity

- Acceptance runtime: Node **22.22.2**; actual installed dependencies and `obsidian` **1.13.0** declarations. System Node 22.22.3 was identified before checks, then the existing temporary 22.22.2 executable was used without changing the system installation.
- Native host: Windows `10.0.26200`, Intel Core i9-12900, 68,448,301,056 bytes physical memory; Obsidian **1.14.4**, installer **1.14.0**, Electron **43.3.0**, Chromium **150.0.7871.212**, host Node **24.18.1**.
- The user authorized both existing disposable vaults. CLI-reported paths were verified before writes: `C:/Obsidian/kplex-test-small` and `C:/Obsidian/kplex-test`, with explicit `.obsidian` config paths. CLI access requires sandbox escalation; the sandbox-only “unable to find Obsidian” response was not treated as absence of the host.
- Small-vault inventory before the owned probe: **106 files, 88 Markdown files, 13 folders**, On demand mode. The native controlled full graph with the probe contained **726 pages, 1,509 pairs, 2,078 declarations**. These are measured runtime counts, not the large fixture's expected counts.
- At the user's request, the existing high-node generator created a new isolated `kplex-test/Indexing-performance-153` folder without replacing notes or configuration. Byte/inventory verification passed: **20,000 Markdown notes**, **80,000 distinct placeholder targets**, **8,000 distinct URLs**, **259,000 source link occurrences**, **8,831,230 Markdown bytes**; fixture digest `50b8cb12ef83c3cd62f1605390fe6ff793079a9f6e37e471e59d0060cf287cd0`. Vault inventory after generation was **20,106 files / 20,088 Markdown files / 15 folders**. This high-node fixture is distinct from Synthetic-Scale-v2's large-note profile; neither its expected 108,000 document/placeholder/URL nodes nor its source counts establish runtime graph completion.

## Reproducible work counts

`node scripts/testing/noop-patch-work.mjs` uses unchanged compiled production GraphBuilder, parser, fingerprint and evidence owners through the existing contributor harness. Only native input/storage surfaces are doubled. One high-degree canonical page, N original declarations and eight retained evidence layers are prepared outside measurement. A new scalar property must still be discovered. The fake clock supports work-count assertions only; no elapsed times are reported.

| Degree | Baseline neighbor entries copied | Candidate | Baseline compacted pairs/declarations | Candidate | Body reads/parses, both |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 256 | 256 | 0 | 256 / 256 | 0 / 0 | 0 / 0 |
| 512 | 512 | 0 | 512 / 512 | 0 / 0 | 0 / 0 |
| 1,024 | 1,024 | 0 | 1,024 / 1,024 | 0 / 0 | 0 / 0 |
| 2,048 | 2,048 | 0 | 2,048 / 2,048 | 0 / 0 | 0 / 0 |
| 4,096 | 4,096 | 0 | 4,096 / 4,096 | 0 / 0 | 0 / 0 |

For these baseline operations, W(2N)/W(N) = **2**. This establishes unnecessary linear maintenance per edit, not a quadratic term in this fixture. Across k no-ops on a fixed E-declaration graph, the threshold-triggered unrelated compaction was O(E) once; it is now absent. Neighbor copying was O(kd) for a degree-d source and is also removed. Other fingerprint/source/field-discovery work remains, so the whole no-op operation is not claimed O(1).

The candidate retains the same evidence generation at depth eight. Repeated no-ops do not grow it; the next semantic patch still compacts before adding a fork. Obsolete records already retained in the bounded chain can therefore survive until that patch. Independent map-depth compaction remains active, including large field-discovery transactions; this is not a retained-heap or universal memory improvement claim.

## Native baseline and candidate

Run `node scripts/testing/obsidian/noopPatch.mjs` with explicit vault name/path/config and a fresh `KPLEX_HOST_REPORT_DIR`, after exact-build staging. The 180-second outer experiment cap, 15-second CLI cap, setup deadlines and cancellation cleanup are test-owned; production watchdogs/scheduling are unchanged.

The driver creates one owned 512-target Markdown note, waits for actual MetadataCache facts, rebuilds an isolated installed production GraphIndex, primes source acquisition, and measures three ordinary hot no-ops at evidence depth eight. It verifies IDs/order/multiplicity, canonical targets, fingerprint stability, exactly one commit, zero body reads/parses, and start/end foreground/throttling samples. It destroys the isolated index, removes its note/controller/wrappers, and byte-checks settings and enablement. The source adjacency iterator and compaction write owner alone are instrumented; no global Map/JSON instrumentation or per-record output exists. Original receiver/results/promises are forwarded.

Graph acceleration and whole URL-cache replay are not consumed by this controlled workload. The timed owner has hot body/current acquired source input; setup rebuilding/acquisition is excluded. This is not a cold/warm startup experiment, source-head inventory benchmark or storage-throughput measurement.

Baseline: all three runs copied **513 neighbor entries** and compacted **1,509 pairs / 2,078 declarations**, with **one commit and zero body reads/parses**. Neighbor/evidence containers were replaced. All sampled windows were visible/focused with original background throttling enabled. Inclusive elapsed observations: **104.4 / 75.3 / 76.9 ms**; largest synchronous commit about **0.1 ms**. These await-inclusive observations are not exclusive CPU/disk time, paint latency or a randomized comparison.

Candidate: all three runs copied **zero neighbor entries** and performed **zero evidence compactions/pair/declaration copies**, with **one commit and zero body reads/parses**. Both containers were retained. The graph remained **726 pages / 1,509 pairs / 2,078 declarations**. All samples retained actual foreground and normal throttling. Inclusive elapsed observations: **29.1 / 23.1 / 21.4 ms**; largest synchronous commit about **0.1 ms**.

| Observation | Baseline, n = 3 | Candidate, n = 3 |
| --- | ---: | ---: |
| Neighbor entries copied per no-op | 513 | 0 |
| Evidence compactions per no-op | 1 | 0 |
| Compacted pair/declaration output per no-op | 1,509 / 2,078 | 0 / 0 |
| Body reads / parses | 0 / 0 | 0 / 0 |
| Median inclusive call duration | 76.9 ms | 23.1 ms |
| Range | 75.3–104.4 ms | 21.4–29.1 ms |

These were sequential baseline-then-candidate trials, not alternating/randomized samples or a low-instrumentation CPU attribution study. The smaller observed call times support further investigation but do not establish a percentage improvement, responsiveness/paint guarantee or startup gain. Native JS heap samples were roughly 119–127 MB in the baseline and 142–143 MB in the candidate; main-application state and GC were uncontrolled, so these are neither matched retained-heap measurements nor attributable evidence of a memory improvement/regression. No per-target index or additional retained generation was introduced. Full M memory/heartbeat acceptance remains outstanding.

Exact native work receipts: [baseline](indexing-noop-2026-10-13/baseline-native.json), [candidate](indexing-noop-2026-10-13/candidate-native.json). Final candidate `main.js` SHA-256: `ad01f904d6c4b2111d79e87fd8e84fe541c2ae0ce7e72e592b62f9d7114d4d15`; manifest/styles hashes are unchanged. Receipts include the precise source/fixture/driver hashes and environment.

Baseline `main.js` SHA-256: `9707dde2c484435a84d53ac3ea4d08955d3e969ec83caef74b552f6719a7b8d4`; `manifest.json`: `19d9ecce5557733e0ff0f2e27155e635c30158c3cfa6fbca0f11c16e4dedfd2c`; `styles.css`: `e8c9279e8904888aa71d5dd2b01f320d5b32fd10e15feb0b9a9576a34f11cea3`.

## Behavior, ownership and checks

The only production change is in GraphBuilder. Compaction can omit evidence when the existing fingerprint proves no new evidence fork is needed. Field discovery stays private; the canonical page's scalar mtime and the hot body/fingerprint publish inside the existing synchronous per-file callback. The source page is read through the cloning overlay only on the recompile path. Provenance-only fingerprint changes still recompile even when the topology is unchanged. File/event identity, cancellation, source acquisition, host-task yielding, semantic no-op events and general map-layer lifetime remain unchanged.

No new settings, schema, protocol, dependency, runtime telemetry, network, UI copy or architecture owner is introduced. The package script only registers the new regression file; other scripts and release fields remain intact. The temporary planning marker is removed, and HANDOFF's standing header is preserved.

Actual checks:

- Baseline `node scripts/testing/obsidian/verify.mjs` passed under Node 22.22.2: complete `npm run verify`, actual production build, exact-artifact staging and rendered/no-error native smoke. The real-IDB source lane passed **443 tests**, including the existing **20,015-owner** high-degree publication fixture. Baseline receipt: `%TEMP%/kplex-153-baseline-host/report.json`.
- Focused candidate `node --test --test-concurrency=1 tests/noop-patch-publication.test.mjs`: **10 passed**, no failures/skips. Covers degree scaling, retained semantic identities, actual read/parse/acquire/mtime publication, retirement/rename/delete/equal-stat replacement/event fences, subsequent compaction, bounded large field-map history and actual IndexedDB persistence plus a held late source.
- Baseline and candidate work-count drivers passed at all five sizes. The new file is registered in the normal `npm test` lane.
- Full candidate `node scripts/testing/obsidian/verify.mjs` passed under Node 22.22.2: architecture/core checks, official Obsidian lint, complete `npm test` (including the new file), production TypeScript/esbuild build and exact-artifact native render/no-error smoke. The unchanged real-IDB source lane again passed **443 tests**. The final focused ten-test lane was rerun after documentation review and passed. [Exact baseline host receipt](indexing-noop-2026-10-13/baseline-host.json), [candidate host receipt](indexing-noop-2026-10-13/candidate-host.json).
- The same verified final artifacts were staged in the **20,088-Markdown-file** native vault using the existing native runner and an explicit hash-checked reuse of the successful full verification receipt. Command registration, rendered `.kplex-app` and no captured JS errors passed. [Large-vault receipt](indexing-noop-2026-10-13/large-host.json). This was a scale render smoke, not complete indexing, high-hub navigation or a startup timing claim.
- `node scripts/testing/obsidian/foreground.mjs` passed in the small vault against the exact candidate: folder/gate reads, navigation, create/remove link, note creation and visible edits succeeded while background acquisition remained held; **zero broad flushes**, background resumed, original configuration restored, controller removed and **zero owned fixtures remaining**. [Focused receipt](indexing-noop-2026-10-13/foreground.json).
- Final source review checked canonical ownership/reuse, default compaction behavior at every caller, retained semantic identities and arrays, revision/lifetime checks, atomic metadata/cache effects, TSDoc and cleanup. Only GraphBuilder's existing owner changes; no core-to-host edge or structural extraction was added. `git diff --check` passed. Test-only probes are absent from production source/bundle.

Failures are retained explicitly: the first native probe attempt rejected an incorrectly escaped test-controller newline before creating a controller/note. The driver now uses a raw template and checks embedded syntax locally before CLI delivery; its corrected baseline run passed. This was a test-tool failure, not a production result. Subsequent review added callback documentation and restoration of window bounds/minimized/maximized state after measurements, with independent native cleanup actions. Timed operations, work counters and fixture inputs remain the same; receipts retain the actual driver/setup source hashes. No test assertion deadline, golden, lint rule or production watchdog was relaxed.

PowerShell's redirected native-command wrapper returned shell status 1 for verification despite the driver recording `passed` and completing all checks/build/staging. A minimal successful Node process writing stderr reproduced that wrapper behavior; later native calls explicitly propagated `$LASTEXITCODE` and returned 0. This shell transport artifact is recorded separately from test/driver outcomes; no source/test failure was ignored.

## Outstanding scope

Hydration signatures, shared URL/origin adjacency, distinct aliases, preview independence, cross-owner persistence and general/dense evidence storage remain separate A–D/E2/E3 packages. The full M startup/storage/CPU/retained-memory matrix is also outstanding. Do not infer their bottlenecks or acceptance from this no-op receipt.

Device/second-OS evidence remains unavailable. Highest-value manual follow-up: in a disposable realistic iOS/Android vault, repeatedly save prose-only edits on a high-degree note, navigate/close/reopen K-Plex, then change one actual relationship; expect stable relationships/cache recovery and no input/memory termination regression. Windows automation cannot establish physical touch, device memory or mobile lifecycle.
