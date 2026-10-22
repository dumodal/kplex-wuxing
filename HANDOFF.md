# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: Mac real-vault indexing comparison and long-tail attribution

**Prepared by Zsolt's Codex Agent, 2026-10-22, Europe/Budapest.**
**State:** Planning only. No Mac measurement, harness implementation or deployment has run here.
**Recipient:** Local Mac agent with Obsidian CLI, filesystem access and real dependencies.
**Purpose:** Measure cold indexing, warm startup and continuing post-ready CPU work on a disposable copy of the maintainer's actual vault. Explain the remaining bottleneck and recommend the next bounded optimization. This measurement PR is separate from #201; it does not authorize new indexing optimizations, merging #201 or changing production data.

## 1. Fixed identity, baseline and authority

| Item | Value |
| --- | --- |
| Repository / measurement branch | `zsviczian/kplex` / `2026-10-22-mac-vault-indexing-study` |
| Measurement branch base | `main@a233338ee6558dfb82ea4426935ceb1324fbc241` |
| Protected production vault | `Zsolt's Brain (2025)` |
| Authorized disposable copy | `kplex-test-brain-mac` |
| Intended location | A separate local folder, preferably a sibling of the production folder, never inside it and never inside an automatically synced location |
| Primary host | Maintainer's Mac; record actual model, chip, memory, macOS, Obsidian/installer/Electron versions |
| Acceptance Node | `22.22.2`, real installed Obsidian typings |
| Initial A/B runtime revisions | A: `551a3b52895484de3dd41e5c6eb2fa8c6712fec4`; B: #201 head `c4a656b54cfe66b686e662e4d8bbfa0536cc4149` |
| New measurements | Same Mac, same copied notes/configuration and declared cache condition; Windows figures are context, not interchangeable baselines |

The absolute production/test paths were not provided. Resolve them locally from Obsidian's registered vault information and the actual folder selected by the maintainer. Do not guess the macOS username or use example paths from older reports. Once found, resolve real paths and record them privately. If discovery is ambiguous, ask for the test folder path only.

Preparation verified that main is one commit beyond #201's base, changing release metadata and a release-review document, not indexing source. Freeze A/B commits, source diffs and all three built/installed artifact hashes before a series. Recheck #201 when work starts: a later corrected candidate may replace B before the series, but label it explicitly and never mix candidate revisions within one result. Do not merge or cherry-pick runtime fixes into this measurement branch merely to build B; use independent pinned worktrees/artifact directories. Its existing Windows measurement helpers can be reused from the pinned #201 revision without accepting that PR's runtime changes into main.

Allowed: implement/review test harness and bounded opt-in observation hooks; build/deploy exact artifacts only into the verified copy; back up and reset only the copy's positively identified K-Plex database; restore test-owned configuration/cache checkpoints between runs; perform controlled startup/reload tests. Normal read-only diagnostics from an already-running production session may provide separate observational evidence. No production plugin deployment/toggle, note/settings edits, reindex command, forced flush, cache reset, fault injection or broad storage export is authorized. Do not automatically quit a production window or terminate an application containing other open vaults. Full-process tests require the maintainer to save/close other vaults first.

## 2. Maintainer preparation: no production plugin changes required

Preferred preparation is deliberately staged so trusting community plugins cannot consume the first K-Plex run.

1. Preserve a current production Index Diagnostics report locally before any restart if the slow session is still running. Save outstanding edits. Make the folder copy while notes/configuration are stable; do not reset or rebuild production.
2. Copy the complete production vault, including its actual configuration folder (normally hidden `.obsidian`), into the new folder `kplex-test-brain-mac`. Use real copied files, not an alias/symlink/shared plugin directory. Keep the copy outside cloud/sync roots. Keep private backups outside both vaults and outside the source checkout.
3. **Do not open or trust the copy yet. Give the local agent this PR first.** The agent prepares the copied configuration offline: preserve its original bytes privately; set the copy's `community-plugins.json` to an empty enabled-plugin list; disable core Sync/Publish and any auto-write/startup automation in the copy using the installed configuration format. Preserve installed plugins and K-Plex `data.json`, ontology, display settings and property-type configuration. Do not clear all core plugins: Date/Daily Notes interpretation must remain comparable. Park automatically restored K-Plex/companion panes until the defined launch action, retaining the original layout receipt.
4. After the agent verifies isolation, open the copy as a vault and approve the normal trust/community-plugin prompt. The enabled list is empty, so K-Plex must still be off. Do not enable it manually. The agent verifies both the actual loaded instance is absent and the saved enabled list excludes `k-plex`.
5. Leave the copy open with CLI enabled. Let Obsidian finish its own metadata discovery with K-Plex disabled. The agent stages the exact build, arms measurement, and only then enables K-Plex for its first measured indexing run. For comparable runs, leave the Mac plugged in, awake and the selected window visible/unlocked; do not use the original vault concurrently.

This produces **cold K-Plex storage with an already-initialized Obsidian metadata cache**. It is a clean K-Plex first indexing measurement, not a claim that every Obsidian/OS/filesystem cache is cold. The separate application-startup lane below measures startup interaction.

Alternative only when the maintainer has already trusted/enabled the copy: label that first activation unmeasured. Preserve its diagnostics; disable K-Plex in the copy, verify all connections/writers have ended, and reset only its exact database under the safeguards below before a new measured cold run. Never describe an already-started index as untouched. Temporarily disabling K-Plex in the original before copying is unnecessary and would disturb the original observation state.

## 3. Safety and cache identity preflight

Read `AGENTS.md`, `CONTRIBUTING.md`, `docs/AGENT_WORKFLOW.md`, `docs/OBSIDIAN_RUNTIME_TESTING.md`, `docs/INDEXING_DIAGNOSTICS.md`, `docs/SOURCE_REPOSITORY.md`, and the pinned #201 validation report before implementing the harness.

Use existing `validateTarget`, `obsidianCliExecutable`, `spawnNativeSync`, and portable-verification helpers. `validateTarget` permits a matching explicit folder/vault name; some scenario drivers hard-code Small, so adapt the appropriate owner rather than running an incompatible fixture driver against private notes. Set all three variables from verified local state:

- `KPLEX_TEST_VAULT_NAME=kplex-test-brain-mac`
- `KPLEX_TEST_VAULT_PATH`: resolved absolute copy path
- `KPLEX_TEST_CONFIG_DIR`: resolved actual copied config directory, ordinarily `<copy>/.obsidian`

Record the protected production path separately. Refuse same/equivalent paths, ancestor/descendant relationships, symlinks or shared/hard-linked write targets. Check config and plugin artifacts as well as the vault root. Refuse filename/database ambiguity. Every CLI call must target the copy explicitly and verify `vault info=path`; never fall back to the active/default vault. Read installed CLI help. Passing a vault selector to an application-wide restart does not isolate other vaults.

**Important source-confirmed distinction:** at the measurement baseline, `GraphIndex` passes `app.vault.getName()` into `KplexIndexedDbCache`. `safeDbName()` selects `k-plex-index-v1-` plus the first 96 hexadecimal characters of the UTF-8 vault name. Reverify this in each tested revision. The short distinct test name has a distinct database name from production. K-Plex uses IndexedDB, not a cache copied inside `.obsidian/plugins/k-plex`. A Finder copy of notes/configuration does not transfer the original K-Plex database/history. Enumerate databases without creating one and verify the test database is absent before first activation; a reused test name might already have data. If enumeration cannot establish absence, report that and use a guarded test-only reset, not an assumed cold label.

All database reset/import tooling must validate BOTH the live test-vault identity and the exact expected test database name. Explicitly deny the production name. Close plugin/database owners, await deletion success and handle blocked/late events; no wildcard database deletion, origin-wide clearing, Obsidian metadata-cache reset, or deletion of Application Support. A graph rebuild is not an equivalent database reset. Back up existing test storage before intentionally deleting it and exclude backup/reset time from measurement.

Disable Sync before first opening; do not connect the copy to the production remote vault. Keep Git auto-push, publishing, automatic plugin updates, startup scripts and other external writers disabled. Preserve their settings as private evidence, not execution authority. Initially run a declared K-Plex-only community-plugin profile, then a separate production-like profile with vetted companion plugins as needed. Do not claim that a K-Plex-only success rules out a companion/event interaction. Verify file counts and a private content-manifest digest before and after runs; no production-note mutation is needed for the main experiment.

## 4. Questions and prior evidence

The maintainer's Mac report from 2026-10-21 recorded 11,839 Markdown files / 110,464 graph nodes, a fresh full snapshot with zero restore delta, then a full rebuild and a source pass still active about 26 minutes later. Acquisition recorded 10,191 reads/parses with no body reuse and 722 currently unsaved sources. Durations included waits and were not sampled CPU. These are historical observations, not the expected exact counts of today's copy.

#201 corrects covered-startup-create rebuilding and exact completed-parser reuse. Its Windows report at B records median reconstruction CPU 9.810388 -> 9.201033 CPU-s (-6.21%) and warm CPU 3.927948 -> 4.529019 (+15.30%), using a Small fixture plus 64/128/256-owner experiments. All warm pairs showed more transactions/hashes after the full rebuild was removed. The original prolonged unsaved tail was not recreated. Full process restarts and representative large-vault comparisons remain missing. These figures are observations, not guaranteed Mac outcomes.

Answer:

- Does the real dataset show sustained work after graph readiness on A, B or both, even with fresh K-Plex storage?
- Is that work making steady progress, repeatedly cancelled, repeating the same owners, retrying unsaved records, or waiting without much CPU?
- Does the warm CPU regression survive matched cache states and low-overhead observation at real scale? Which processes and consumers account for it?
- Which large-vault opportunities remain material: repeated source validation/replay, restart loss of progress, adjacency copies/evidence compaction, source persistence/repair, or another measured cost?
- Can interactive navigation and tag/folder/search availability remain intact while indexing runs and after it settles?

Do not assume an aged cache is corrupt. In-memory unsaved masks/queues and per-session counters are not a durable archive copied with the vault. A clean-copy result alone cannot explain or disprove a defect dependent on the original saved/runtime state.

## 5. Measurement sequence and comparable starting states

Build and smoke-test harness changes on an existing disposable Small vault, not this copy's first activation. Do not run ordinary `verify:obsidian` staging against the real-data copy before arming: that helper enables the plugin and would consume its first run. Split reusable validation/staging/activation responsibilities without weakening the shared safety checks. Stage complete `main.js`, manifest and stylesheet atomically while the test plugin is off; verify built/staged hashes and the actual loaded instance after enabling.

Implement one serial driver with a run manifest, low-overhead sampler, bounded diagnostic capture and idempotent cleanup. Arm CPU observation before the enable/start action. Reuse existing lifecycle diagnostics; forwarding observers or an identical opt-in instrumentation patch may be used on both A/B builds. Where a startup hook is necessary, attach before measured work, document the patch hash and prove it changes no scheduling/validity behavior. Do not enable, allow indexing, then attach probes and call the result a complete cold run. Record any unavoidable early instrumentation gap; external CPU coverage should start before activation.

### Priority lanes

**C — K-Plex cold / Obsidian warm.** Freeze copied content, effective desktop settings, theme, window layout/center and other-plugin profile. Verify empty K-Plex storage. Record from enabling K-Plex until source/URL/persistence closure and a ten-minute quiet observation. Run A and B separately from equivalent empty test storage. The initial physical copy provides the first cold run; later cold repetitions reset only the guarded test database, not notes or Obsidian's cache. Do not compare A-cold with B-warm. Native/OS read-cache state is not guaranteed identical; record run order and alternate it where practical.

**W — Warm plugin reload.** After a completed baseline cold seed, save a private consistent checkpoint of all test K-Plex stores and the relevant configuration while writers/connections are stopped. Verify schema, complete store/key/value counts and digests outside timed work. Restore that SAME checkpoint for each comparable A/B warm run at the SAME test vault path/name; do not let B inherit extra repairs/compaction from the previous run. Recheck semantic and physical compatibility of the imported checkpoint. If faithful checkpoint restoration cannot be validated, use independently seeded per-build runs but label their cache states unmatched and withhold a causal paired percentage. Repeated natural reloads without restore are a separate aging series, not matched A/B pairs.

**S — Actual application startup.** Distinguish this from plugin reload and renderer reload. With other vaults closed by the maintainer, use a controlled full quit/relaunch of the test-only application session; verify process identities before/after and target the copy on reopen. Measure with ordinary saved plugin enablement and startup-before-view policy. Use a recording launch mechanism that survives restart and captures from process launch; observe metadata readiness as well as K-Plex. No simultaneous unmeasured production vault. If that isolation or early capture is unavailable, mark S pending and continue C/W without relabeling them. Keep first-host-discovery runs separate from settled-metadata startup runs.

**L — Long post-ready observation and normal use.** At least one longer A/B observation should follow the source tail, not stop at `strict-ready`. Collect aggregate progress at modest intervals and distinguish quiet/background work from a separate fixed navigation workload. Exercise existing notes plus tag/folder/URL centers and search without editing private notes. Preserve the same center/selection sequence privately, and compare correct coverage, labels, provenance and counts. Put detailed semantic checks outside timed windows or account for their cost identically. Do not include a full-vault oracle scan as unexplained indexing CPU.

Target at least three paired C/W runs, five only if the available window permits; report all samples, medians, variation and within-pair deltas. Given the maintainer's few-hour Mac window, first obtain one meaningful cold A/B pair and one warm A/B pair, then prioritize the condition reproducing the long tail. Use an initial 120-minute session budget and a 45-minute per-run observation limit. On expiry save an incomplete/censored result, backlog and CPU before cleanup; do not claim completion or extend indefinitely without agreement. A 45-minute incomplete run may be more informative than many successful tiny tests. Report the next required session rather than consuming the entire window on generic suites.

Keep the machine on power with consistent power mode, foreground, visibility and sleep conditions. A bounded keep-awake assertion is acceptable during the approved test window; do not disable security/lock policy or background throttling to make results look faster. Do not overlap builds, browser tests, heavy backups or another vault's indexing with timed runs. Record thermal/power/other-process changes and allow recovery between runs; temperature/subjective heat is secondary to CPU-work evidence.

## 6. Counters, CPU attribution and end conditions

Primary outcome is accumulated process CPU-seconds through equivalent completion, plus a matched quiet interval. Track process births/exits by PID and creation time; sum user/kernel or supported Electron cumulative CPU once per process. Worker threads are already included in their process CPU; do not add sampled worker totals again. Separate renderer, main/Browser, workers and storage/native attribution from aggregate CPU. Include a K-Plex-disabled host control on the same copy; subtraction is an estimate, not perfect exclusive attribution. Report average cores used separately from wall time.

Read scalar state at low frequency (roughly 1-5 seconds, full diagnostic snapshots less often), measuring sampler/IPC overhead. Do not repeatedly enumerate the whole database, serialize the graph, log each note or capture heap snapshots during acceptance runs. Resource probes and sampling profiles need matched overhead controls. Use separate bounded profiles when a high-CPU phase appears; include parser-worker/native-storage coverage where available rather than treating a mostly idle renderer profile as a complete explanation. Keep unsupported process/native coverage explicit.

Record at graph readiness, true background closure, fixed 5/15/30-minute horizons when reached, and session/run limit:

- CPU, elapsed time, sampled memory, process scope and observation gaps; index/hydration/source/URL state and effective policy.
- Reads/parses and input bytes at the shared parser entry, source repairs/activations, accepted reuse and rejection reasons, completed versus cancelled work.
- Inventory/build starts and cancellations with causes, unique versus revisited owners, known-event backlog and source-progress deltas.
- Transactions/requests, immutable-family visits and hashed/decoded bytes; in diagnostics, exact revision/family overlap by neighbourhood, sibling, degree and URL-title consumer. Aggregate results publicly.
- Unsaved-set entry/exit reasons and age, pending retirements, storage/backpressure/cancellation outcomes, retry counts and unchanged-oldest-work signals. Do not explain all entries with one `lastReason` or erase masks.
- When the active route warrants it, actual adjacency entries copied and evidence-compaction traversals, rather than extrapolating from file count alone.
- First useful graph, tags/folders/search availability and controlled action latency while background work is active. Keep operation completion, DOM availability and actual paint distinct.

Closure requires route-appropriate current coverage, successful URL completion, no active inventory/acquisition or repository writer/deletion work, empty body/snapshot persistence queues and no unexplained unsaved owners under healthy storage. Preserve partial/on-demand semantics; do not force a globally complete graph in On demand just for a metric. Healthy Eager closure and a displayed ready indicator are separate observations. Allow legitimate event-triggered work, but explain any work returning during the quiet interval. No forced production flush, priority hold, deadline change or demand suppression inside measured work.

## 7. Existing-production-state question: optional separate lane

Before any maintainer-initiated shutdown, existing production diagnostics and passive process sampling can preserve the current symptom. Keep this lane read-only, separately labelled and outside paired copy measurements. Do not deploy instrumented code to production or scan private note contents into logs. Existing active runtime masks would be lost by restarting, and a database export alone would not preserve them.

The copy experiment intentionally starts with a new K-Plex database. To compare old versus fresh durable state rigorously later, first design a consistent, targeted export/restore into test-only storage and obtain explicit permission for any additional production acquisition. Never copy a live global IndexedDB directory, replace the entire Obsidian profile, or rename the test vault to production to borrow its database. Copying can change creation/mtime metadata; imported source heads may legitimately fail physical validation. Record that as a cache-compatibility condition, not corruption, and do not forge timestamps or bypass guards. If faithful old-state reproduction is unavailable, say so. A production observation versus a fresh-copy run has content/plugin/runtime/history confounders and cannot alone prove that resetting the cache fixes the root cause.

## 8. Deliverables and completion

- [ ] Verify copy identity, offline isolation, original protection, CLI and exact artifacts; pause only for the user's trust action or a genuinely ambiguous local path.
- [ ] Implement the reusable measurement harness, narrowly scoped reset/checkpoint guards, pre-enable observation and independent cleanup; test these before first real-data activation.
- [ ] Run the priority Mac cold/warm comparisons and post-ready observation within the time budget; include controlled restart where prerequisites permit.
- [ ] Attribute the expensive phase, reproduce or explicitly fail to reproduce the original symptom, and rank remaining opportunities with evidence and the smallest proposed change.
- [ ] Verify cleanup/content integrity, store sanitized results and return a concise decision on #201 plus the next optimization assignment.

Reuse helpers from `scripts/testing/obsidian/runner.mjs`, `processTools.mjs`, `startup.mjs`, and #201's pinned `indexingCpu.mjs` / `indexingCpuProbe.mjs`. Inspect their setup mutation, Windows/Small assumptions and observer overhead; do not copy the Small fixture workflow unchanged onto private notes. Harness changes require syntax/unit safety tests, especially production-path/name refusal, symlink refusal, armed-before-enable ordering, blocked reset, timeout and cleanup. Any compiled hook needs the real build and applicable verification, and must remain opt-in/absent from ordinary production output. Do not fix SI4, change parser/storage algorithms, increase budgets or relax semantic fences in this measurement PR.

Write a sanitized durable report under `docs/validation/` and update this PR's status with actual findings. Raw profiles, note paths/content, screenshots, databases, configuration/credentials, manifests mapping private files and installed binaries remain in private local storage outside Git. Public results may include aggregate counts, source/artifact hashes, timings and anonymized consumer labels; no private filenames or content fixtures. Author all PR comments as **Zsolt's Codex Agent**. Preserve the single transient root handoff, remove the temporary plan marker before final review, and follow repository publication authority. No merge/release, #201 rewrite, automatic issue closure or production deployment.

Return: per-run source/artifact/cache identities, settings and companion profile; cold/warm/plugin/application distinction; complete/incomplete status; CPU-to-ready versus CPU-to-closure/quiet; backlog/unsaved convergence; interaction correctness; instrumentation limits; confirmed/rejected/unmeasured hypotheses; and a ranked next implementation recommendation. An absent symptom on a fresh copy is an informative result with limits, not proof that the original vault or macOS is healthy.

Cleanup restores every test-owned observer/debugger/keep-awake resource, leaves Sync/external writers disabled in the copy, disables K-Plex there after the final report, and verifies copied note hashes and original protection. Keep valuable test cache/checkpoints for follow-up and tell the maintainer where they are; do not delete the whole copy automatically. Removing the folder later does not itself guarantee its IndexedDB is gone; offer the already-guarded test-only database cleanup only after evidence is retained. If cleanup fails, identify exact remaining resources rather than claiming success.

## References checked during preparation

- [PR #201](https://github.com/zsviczian/kplex/pull/201) and [pinned validation report](https://github.com/zsviczian/kplex/blob/c4a656b54cfe66b686e662e4d8bbfa0536cc4149/docs/validation/indexing-cpu-201-2026-10-21.md).
- [Cache construction](https://github.com/zsviczian/kplex/blob/a233338ee6558dfb82ea4426935ceb1324fbc241/src/index/GraphIndex.ts#L713-L718), [database naming](https://github.com/zsviczian/kplex/blob/a233338ee6558dfb82ea4426935ceb1324fbc241/src/index/IndexedDbCache.ts#L273-L279), and [target validation/staging](https://github.com/zsviczian/kplex/blob/a233338ee6558dfb82ea4426935ceb1324fbc241/scripts/testing/obsidian/runner.mjs).
- Official [Obsidian plugin security](https://obsidian.md/help/plugin-security), [data storage](https://obsidian.md/help/Files+and+folders/How+Obsidian+stores+data), and [CLI](https://obsidian.md/help/cli), checked 2026-10-22. Verify installed capabilities before use.

Preparation performed repository/source/workflow review and documentation checks only. The physical copy, its exact path, trust action, harness, Mac runtime and measurements remain for the equipped agent/maintainer. No measured improvement or successful Mac setup is claimed.
