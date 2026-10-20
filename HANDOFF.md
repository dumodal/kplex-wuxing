# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: device-specific startup indexing — issue #191

Prepared by **Zsolt's Codex Agent**, 2026-10-20.

**State:** prepared, implementation handoff only. Direction: planning agent to implementing agent, then independent main-agent validation. No runtime changes or runtime acceptance are included in this checkpoint.

**Repository:** `zsviczian/kplex`. Continue branch `2026-10-20-issue-191-startup-policy`, based on accepted `main@843e47f471f897951165b962e12a1d6a64ce089e` (merged #190). Read the actual branch head and its existing draft PR before implementation; do not create a competing branch/PR. Root HANDOFF and the temporary planning marker are the only intended planning changes. Reconcile subsequent accepted main changes normally; no history rewriting.

**Issue:** https://github.com/zsviczian/kplex/issues/191. Related #192 is research only and is explicitly excluded from implementation here. Follow AGENTS.md, CONTRIBUTING.md, docs/AGENT_WORKFLOW.md and docs/agent-workflows/issue-resolution.md. C14 remains accepted and structural refactoring paused.

## Outcome and scope

The maintainer requests independent settings for desktop, tablet and mobile/phone: **start K-Plex indexing before a K-Plex view is opened?** This controls the whole session preparation pipeline, including restoring/hydrating saved graph and source data from cache, not just URL body discovery.

When disabled for the current device and no Plex is open, ordinary Obsidian use must not silently initiate broad graph/search preparation, cache hydration, source inventory or Markdown/URL body scans. On first actual use, start the existing pipeline once, retain fast cached/current-center presentation and preserve all correctness/lifecycle guards.

This is a startup-admission setting, not a replacement for Eager/On-demand semantics, Web link indexing, background pacing, or ongoing close/cancel behavior. It does not promise zero plugin memory, instantaneous first-open completion, a smaller fully built graph, or reclamation of Obsidian's shared content cache.

## Settings and product contract

Use the existing native declarative Indexing settings page and ordinary persisted preference writer. Add a compact group such as **Prepare index before opening K-Plex**, with independent **Desktop**, **Tablet**, and **Phone** toggles. Suggested explanatory text: "Prepare the index when Obsidian starts, including loading saved index data. Turn off to wait until you open K-Plex. The first opening may take longer. Changes apply after restarting Obsidian."

- **Proposed defaults for maintainer review:** desktop enabled; tablet and phone disabled. These are recommendations, not defaults previously specified by the maintainer. Document the deliberate missing-key/upgrade behavior; explicit saved values always win. Do not silently inherit the current device's value into the other two.
- Recommended policy: restart-required, matching the existing indexing-strategy model. Capture the selected device's preference once for the plugin session. Local/incoming edits persist for the next plugin reload/application start, without starting, stopping, clearing or rebuilding the current index. UI must disclose this. A first view still starts the current session regardless of the captured pre-open preference.
- Three flat booleans are a reasonable implementation choice (proposed names `indexBeforeViewDesktop`, `indexBeforeViewTablet`, `indexBeforeViewMobile`); these names are not existing APIs. Reuse current field-level persistence/conflict handling rather than introducing a second writer or unnecessarily grouping unrelated device edits into one conflicting root.
- Device selection must reuse `readObsidianPresentationEnvironment` and `persistedLayoutDeviceClass`. Presentation `phone` maps to the existing stored `mobile` vocabulary. Tablets are not the phone setting; OS and input capability are not form factor. Use the main host's device, not a sidebar/popout width. Resize, orientation and popout migration do not change the already-captured session policy.
- Keep startup preferences outside themes, imported ExcaliBrain appearance/ontology, graph semantic signatures and source/snapshot formats. Missing/malformed booleans receive the documented defaults; explicit false survives migration/reload and external settings reception. Maintain all eight locales and user-facing documentation.

### Admission table

| Session state | Required behavior |
| --- | --- |
| Device preference enabled, no Plex | Admit normal preparation after existing layout/settings readiness. Include cache restoration/hydration even when URL discovery is disabled by its separate setting. Retain existing cooperative scheduler/pacing; do not add a desktop idle scheduler. |
| Device preference disabled, no Plex | Keep the session dormant: no broad catalog, hydration, source inventory, semantic build or URL/body scan. Lightweight registrations and invalidation are allowed. |
| Restored live Plex, either preference | Treat it as already opened and admit preparation once. A registered factory, saved center/history/pin or empty startup callback is not an open view. Test restored inactive tabs and sidebar states explicitly; do not confuse open-view identity with foreground visibility. |
| First Plex opened before layout-ready | Remember the live opening and admit after layout/settings readiness; do not lose it to an early return. |
| First Plex opened later; concurrent opens | All surfaces join the same admitted session. Mount loading/cached presentation immediately; never make native view opening await complete hydration or indexing. |
| Close/reopen after admission | Preserve current cancellation, checkpoint-resume and visibility behavior. Do not recreate the session/index or replay successful startup phases on every opening. Cancelled/incomplete initial work can resume through its existing owner. |
| Explicit rebuild/rescan action without a Plex | Treat genuine invocation, not action registration/availability checking, as explicit work demand and route through coherent initialization as needed. Passive settings/diagnostics reads do not admit work. |

Enabled means permission to prepare according to the independently selected indexing and URL modes, not permission to force Eager semantics or background URLs. Replace the old narrow `largeIosExpensiveRebuild` admission exception coherently with the device policy; retain its memory budgets, cooperative pacing, safe cancellation and durable body checkpoints. Do not leave an undocumented iOS-only veto that makes an explicitly enabled pre-open option misleading.

## Current evidence and source map

The inspected startup in `main.ts` admits `startBackgroundUrlIndex()`, `primePhysicalSearchCatalog()` and `restorePersistedSnapshot()` before its narrow final iOS guard. `ensureInitialIndex()` also starts background URLs on the On-demand path. Early Vault listeners separately call `refreshUrlOwner()`. Thus gating only the last rebuild, only URL discovery, or only `onKplexViewOpened()` is insufficient.

Issue #191's reported memory/timing comparisons use 0.1.2 and development `b9d3527`, with inspection at `98843fc`; they are not fresh measurements of this baseline. Its physical tablet observation has a simultaneous Omnisearch-setting confound. Establish exact candidate/baseline evidence; do not reuse those numbers as current acceptance.

Commit-pinned owners to inspect and extend:

- [Plugin lifecycle and startup admission](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/main.ts): onload/onLayoutReady, early URL listeners, installPreRestoreChangeFence/classifyPreRestoreChanges, registerReactiveIndexListeners, onKplexViewOpened/onKplexViewStateRestored, finishStartupIndexPreparation, ensureInitialIndex/ensureIndexReady/performRebuild and unload. Preserve standalone settings/migration, native document/Sidecar association, ontology context-menu registration and saved navigation while moving index-dependent work behind admission.
- [Native views](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/ui/KplexView.tsx): existing nonblocking view-open path, live view/session identity, restored state, main/sidebar/popout ownership. Do not await whole startup in onOpen or put foreground demand behind its own background wait.
- [GraphIndex](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/index/GraphIndex.ts): constructor side effects, primeSavedNavigation/primePhysicalSearchCatalog, independent URL restore/discovery/refresh, restorePersistedSnapshot, initializeOnDemandBaseline, source inventory admission, visible demand, purge and destroy. Keep GraphIndex's existing cache, publication and scheduler ownership.
- [Source acquisition](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/adapters/obsidian/sourceAcquisition.ts): start/enable/inventory and event admission. Construction is documented side-effect-free; verify all actual start paths. Do not add another source scheduler or event journal.
- [Settings](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/settings.ts) and [external reconciliation](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/adapters/obsidian/settingsReconciliation.ts): defaults, migration, native controls, per-field writes and incoming changes. Read their actual call contracts before extending.
- [Device facts](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/adapters/obsidian/presentationEnvironment.ts) and [stored device mapping](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/core/plex/viewPresentation.ts): reuse classification instead of Platform.isMobile for both phone/tablet.
- [Settings policy/signature](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/core/graph/settingsPolicy.ts): startup preferences must not change semantic signatures or invalidate source/cache proof.
- [Startup/URL lifetime regressions](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/tests/startup-url-cache-lifetime.test.mjs), [foreground startup](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/tests/foreground-startup-indexeddb.test.mjs), [On-demand tests](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/tests/on-demand-indexing.test.mjs), and the native startup drivers documented in CONTRIBUTING.md. Extend actual owners/harnesses; do not replace them with a toy parallel startup implementation.

Already merged #153/#163/#177/#183/#185/#186/#190 contain startup, source and visible-center fixes to preserve. Open #194 concerns the ontology manager, not this feature; do not absorb its implementation or overwrite its separate branch's handoff.

## Implementation approach and safety boundaries

1. Characterize the real startup admission paths and settings effects, then add the three preferences and pure device selection with migration/serialization tests. No runtime change is needed to read/calculate the setting.
2. Split lightweight host setup from index preparation inside the existing lifecycle owner. Introduce one narrow idempotent session-admission task/state, not a second index coordinator. It owns admission only; existing restore/initial/build tasks keep their completion and retry lifetimes. Preserve the existing overlap that allows P1 center presentation while broader work is pending. Do not wrap the entire startup in a foreground lease, introduce promise self-joins, or reset a stalled phase by repeatedly admitting it.
3. Route eager startup, restored/first view and explicit work through that owner. Audit early URL events, source inventory, reactive listeners, view-state restoration, visibility callbacks, timers, semantic settings reception and action preflights for bypasses. Opening Settings, copying diagnostics, changing a startup preference or receiving settings must not accidentally hydrate/index a dormant session.
4. Keep current file/metadata invalidation while dormant without body reads. Reuse coalesced revision/changed-owner bookkeeping; never accumulate every event or create another whole-vault mirror. Same-stat content changes, rename/delete/recreation and policy changes must invalidate stale saved facts. At admission, use the latest settings and current native inventory with normal source validation. Do not skip invalidation to achieve a zero-work test or unconditionally discard valid persisted caches because startup was deferred.
5. Keep lifecycle/setup independent: native settings and theme migration/notification, commands, ontology editing entry points and Sidecar synchronization cannot disappear merely because index startup is deferred. A background job that legitimately requires current graph data must wait for admission; a passive host service must not create it. Preserve unload/purge cancellation and exclude late completion from a retired plugin.
6. Provide truthful status: deferred is not indexing, completed, corrupt cache or startup timeout. Existing diagnostics should report the selected device/preference and pending admission without loading the index. Start startup-phase watchdog clocks only when their work begins; waiting all day for a first view cannot consume a hydration inactivity deadline. Avoid a new diagnostic framework.

No adapter/direct-filesystem Markdown reads, private Obsidian cache manipulation, read API substitutions, parser/compiler/evidence changes, source/snapshot schema changes, reader-sharing/receipt experiments, C15+ refactoring or index teardown-on-last-close design. Keep current Vault.read/cachedRead choices unchanged in this PR. Follow #192 separately only after explicit authorization.

## Acceptance and validation

Add focused lifecycle tests using the actual plugin/GraphIndex boundaries and real IndexedDB where relevant, retaining current assertions and deadlines:

- Three device classes × enabled/disabled × Eager/On-demand × cold/warm. Include independent Web link background/on-demand settings. A warm saved graph must remain unhydrated while dormant and be eligible for normal reuse after admission; enabled plus URL-on-demand must still permit graph/cache startup.
- No-view disabled sessions: assert zero broad physical-search priming, URL restore/discovery/acquisition, graph/source hydration, source inventory, semantic builds and note-body reads/parses. Count real operations, not merely one outer method; settings-file reads and minimal host registrations are separate. Seed saved history/pins and fire unrelated file/metadata/settings events to expose accidental admission. Test a long virtual dormant interval without watchdog/retry churn.
- Early view before layout-ready, late first view, restored main/sidebar/popout/inactive tab, concurrent views, first demand during pre-open startup, rapid close/reopen, initial cancellation/resume, failed storage, cache purge, plugin unload/reload and late awaits. One admitted session, no duplicate successful hydration/body reads or deadlocks. Loading/center presentation is nonblocking.
- Dormant edits including same-stat writes, new file/folder, rename, deletion/recreation and incoming semantic policy. First opening observes the current graph, preserves ordered relationship semantics and never upgrades stale preview to write authority. Unchanged warm cache remains reusable; relevant changes follow existing incremental/conservative paths.
- Preference migration/defaults/explicit false, independent persistence for each device, settings-only zero semantic signature change, failed writes, external field-level merges and actual restart application. Changing preferences after startup does not stop/clear the active session. All locales and native layout/accessibility remain covered.
- Preserve existing first-center/history/Sidecar continuity and late-ontology/progressive-edit regressions. Test current-node response while unrelated broad I/O is held; no broad flush from foreground navigation. Preserve iOS cancellation and resume behavior after first use.

Run `npm run verify` with Node 22.22.2, actual installed Obsidian types and browser lanes. Record failures/unavailable prerequisites honestly. The inherited #190 handoff reports an unrelated browser bootstrap failure and Node 22.22.3 local build; neither is a passing verification of this assignment. Do not weaken or silently skip that case.

The equipped validation agent uses exact-build `npm run verify:obsidian` and the applicable existing startup/native drivers in explicitly configured disposable vaults. Add narrowly scoped native scenarios through those owners, not an unrelated benchmark framework. Measure current main versus candidate under identical settings/fixture/cache conditions: dormant startup CPU/retained heap, first usable center, background completion and actual body reads. Separate saved-graph hydration from note reads and cold from warm. Do not add reporter savings together or claim zero total host/cache memory. Any scale run should use the repository's verified fixture contract and report exact artifact/fixture identity; no personal vault access is authorized.

Highest-value physical acceptance: (1) phone/tablet cold and warm no-Plex startup then first open; (2) restored Plex/sidebar plus suspend/resume and rapid close/reopen; (3) desktop opt-in/opt-out with a warm cache and popout. Emulation proves routing, not physical-device performance.

## Delivery

Return the complete reviewed diff and actual checks/limitations by replacing this assignment body while preserving the standing header. Independent validation precedes authorized branch publication. Remove `docs/agent-handoffs/issue-191.md` before final review; do not archive HANDOFF. Update the same draft PR with actual outcomes and source/build identities. Keep #191 open until a validated implementation is delivered; no automatic ready/merge/release/branch deletion.

Planning checkpoint checks: source and relevant repository contracts inspected at the pinned baseline; remote document read-back and branch/PR identity checks are required before reporting creation. No build, tests, Obsidian session or performance measurements have been run for this documentation-only assignment.
