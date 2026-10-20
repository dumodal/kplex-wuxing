# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---


# Implementation return: #194 unified ontology manager

## Identity and authority

- Branch: `2026-10-20-ontology-manager`.
- Local and remote planning head: `8ea700c93ebda78cdc71d6132d656c8ac682b057`.
- Runtime baseline: `main@843e47f471f897951165b962e12a1d6a64ce089e`.
- Maintainer reviewed the implementation and explicitly authorized publication/merge of #194, followed by work on #195. The implementation and validation identity below is the accepted local return; publication and merge status are recorded in PR #194. No release or branch deletion is authorized.
- Exact runtime/test/tooling source manifest: private `zero-delivery-source-manifest.json`, SHA-256 `f0e9cad97e3555ea21cd7ced44e7b972eec4283e082b00681b72294d601e62aa`. It identifies 38 code/test/tooling paths independently of this transient handoff. Durable feature results: [validation report](docs/validation/ontology-manager-194-2026-10-20.md).

## Completed checklist

- [x] Trace current configuration, queue, shared list/editor, suggesters and actual native Settings ownership.
- [x] Replace the primary raw-list workflow and standalone discovered manager with the shared native searchable/filterable manager.
- [x] Implement pair-aware structured editing, new fields/partners, derived roles, pair-wide Save, explicit unpairing and confirmed endpoint removal through the existing queue.
- [x] Reuse shared physical-field/partner details in Markdown suggestions, native partner suggestions and the related-note composer.
- [x] Add the accepted Show documents extension using existing field postings, local filtering, full filtered Markdown copy and separate native/Plex opening.
- [x] Maintain all eight catalogs, user/contributor documentation, production-path regression tests and reusable native lanes.
- [x] Perform real build/scanner and focused/native validation; retain failures and platform limitations accurately.
- [x] Restore the disposable test vault, retain private evidence and remove temporary assignment/tooling files.
- [ ] Independent main-agent acceptance, required pinned-Node/remaining-platform checks, and authorized publication.

## Delivered behavior and review notes

`OntologyManagerModal` reuses the actual `StyleManagerList` shell, collection disclosure and native Modal ownership. All roles, Hidden, Excluded and discovered Unassigned states are represented. Pair rows show both physical names, orient by role filter independently of query and search either partner. Counts distinguish entries/physical fields; discovery is explicitly incomplete. Opening/filtering/searching never rescans; explicit rescan uses the existing ontology-discovery owner. Existing Hidden/discovery destinations open this same manager. Manager/children close on owning-window retirement or unload.

`AddToOntologyModal` remains the shared editor. Existing names cannot be renamed, either pair endpoint is selectable, compatible existing partners reuse the native suggester, and creating a new partner is explicit. Role moves show both assignments, Hidden/Excluded retain the configured partner in the preview until explicit unpairing, and removal requires confirmation of the selected name. Cancel/unchanged Save, IME, duplicate submission, failed storage, conflicts, accepted operations after dismissal and saved-refresh-pending are covered.

The existing configuration contract adds finite `OntologyEdit` preparation and raw affected-endpoint comparison. `editOntologyConfiguration` uses the established queued writer/received-owner fence and one durable operation, merging unrelated edits while rejecting stale affected declarations. The grammar/version, escaping, ordering, defaults, physical style keys and legacy multiple-assignment precedence are preserved. No source-note rename/rewrite is performed by vocabulary edits.

`ontologyPresentation` distinguishes collapsed manager rows from independently selectable physical endpoints. Direct-name matches precede marked partner-only matches; every selection inserts/writes only its primary physical field. Composer metadata refresh preserves local drafts.

Self-review covered the full production diff, TSDoc/lifetimes, C14 dependency ownership, scanner/API discipline, actual shared-component reuse, all eight locales, raw identity/order preservation, owner-document focus and durable failure/concurrency semantics. No indexing engine, parser/compiler/resolver/evidence engine, source acquisition, snapshot schema or layout policy changed. GraphIndex only adds a seven-line read-only query facade/import/header note over existing field postings; there is no new index extension. No semantic golden, strict timing/failure guard or architecture exception was relaxed. Metadata-only compatible pair changes remain presentation-only; real membership/role edits retain required semantic refresh. No performance improvement is claimed.

## Actual checks

Node: **22.22.3**; installed Obsidian types: **1.13.0**. Required Node **22.22.2** remains unvalidated. Native Windows: Obsidian **1.14.4**, installer **1.14.0**, Electron **43.3.0**, Chromium **150.0.7871.212**, embedded Node **24.18.1**.

- Release metadata passed; `npm run check:architecture`: 7 tests, 0 violations; `npm run check:core`: 130 passed.
- `npm run lint:obsidian`: passed without findings; `npm run build`: real installed-type production build passed (Windows `npm.cmd`).
- Prior count-version focused command: **156 passed**, 0 skipped. Current narrow partial-zero correction: **45 passed**, 0 skipped (ontology presentation, actual manager/editor and localization). Exact commands are in the validation report.
- Primary portable batch: initially 1232/1234 passed; two narrow old-writer doubles corrected without weakening dismissal/retry assertions, all 35 in that file passed and included in the final focused run. Whole primary batch not repeated.
- Shared UI: 210 passed; portable sources: 334 passed.
- Chromium source/storage/lifecycle: **645 passed, 1 failed**. The held-cache visible-presentation case never loaded its script resources; subsequent case loaded the same shared bundle. Failure retained, not rerun.
- `npm run verify:obsidian`: **aggregate failed during portable verification** at an existing restore-watchdog timer-count assertion. Isolated unchanged main@843e47f also failed a timer-count assertion in that block using the same dependencies; candidate targeted runs also passed. Cause remains intermittent/unresolved, and production indexing/assertions were not altered. Later exact-build staging/native results are separate, not a green full gate.
- Original manager native lanes passed serially on its earlier artifact `7f53817`: manager On-demand/narrow 12 cases; reloaded Eager manager 11; adapted pairs 12; actual reload; external settings 7; trusted composer/folder 12 scenarios. Includes actual Settings navigation/main and popout owners, dirty receipt conflict, no-Plex management, native width440 wrapping, physical endpoint selection and stationary graph refresh. Cold Hidden navigation separately passed before the original preview-only refinement.
- Read-only UI and guarded composer interaction: zero additional reads/parses/acquisitions/rebuilds/semantic changes/snapshots/settings writes. Compatible pair-only edits: zero semantic/source work; genuine role/membership changes refresh once and persist once. These are functional counters, not comparative performance measurements.

- Extension: real Chromium IndexedDB case passed with unchanged selected heads and zero acquisition/source replacement. Existing `node scripts/run-indexing-tests.mjs` passed, including its watchdog block. The aggregate gate itself was not rerun or declared green.
- Final artifact native usage lane: 5 workflows passed (actual Settings lookup/filter/native clipboard, new native tab, Plex navigation). Listing/filter/copy recorded **0 reads, 0 parses, 0 acquisitions, 0 source replacements, 0 settings writes**; explicit navigation is measured separately. Editor draft retained. Current native test delegates to the real lookup and injects incomplete coverage for the final fixture field only (`KPLEX_ONTOLOGY_USAGE_PARTIAL_ZERO=true`); zero-result Unassigned removal still passes. Wrapper restored on exit. Details and harness-only corrections are in the validation report.

## Accepted extension: existing indexed documents only

The field editor now opens a native document list. It reuses StyleManagerList, native Setting actions, ClipboardSession and nodeMarkdownLink. Keywords match paths/names; copying includes every filtered result beyond Show more. Separate actions use existing new-tab and scoped Plex navigation. The selected physical name is queried independently of its reciprocal partner. Parent/window teardown fences pending lookup and clipboard feedback.

Existing SourceFacts field postings and metadata name facts already contain unassigned scalar/inline properties and physical source paths. The adapter authenticates selected metadata families, native identity and mtime/size before returning names, without acquiring, parsing or repairing anything. Incomplete indexing/missing or changed cache inputs are disclosed; Refresh only re-reads existing data. No source/schema/index structure/scheduler extension was added. All 8 locales have 11 new strings.

## Accepted cleanup follow-up: explicit counts

User confirmed Show documents works, then reported stale Unassigned occurrence counts after cleaning a property. Cause traced to GraphBuilder's existing patch discovery policy, which intentionally retains historical names/counts rather than subtracting per-source contributions. No indexing policy or catalog writer was changed.

Refresh counts now reads existing field postings for every physical field matching the current role/search, including undisclosed and previously hidden zero rows. It stores only a manager-local count overlay; confirmed-zero Unassigned fields disappear, configured zero-use fields stay. A returned numeric zero now hides an Unassigned field even with partial coverage, per the explicit follow-up requirement. Configured zero-use fields stay visible. A thrown lookup failure records no numeric count and keeps the historical row visible. Reuse of a field can reappear on the next explicit refresh. Checked values are labelled as document counts. Show documents/Refresh shares its already-requested result with the parent manager without another lookup or a draft save.

No automatic recount on open, typing or graph publication. Filter/search/editor/close fences stale completions; overlays expire on close. Six additional strings were translated in every locale. Native cleanup reproduced the stale catalog, verified assigned-zero preservation and removed the stale Unassigned row with zero source/settings work. The prior full affected 156-test command passed; the current partial-zero policy correction passed 45 focused tests plus the real build/scanner. Prior architecture checks passed; no new imports or architectural edges were introduced by this correction. Prior aggregate/platform limitations remain unchanged.

Final tested artifact SHA-256:

| File | SHA-256 |
| --- | --- |
| main.js | 82b95d35e4178829bb2c75c0377510b66d14542700e1e55f31b9d992ad592010 |
| styles.css | 8fd9dac8ebdafb07c38f82d74fdba5e3aa7ab3990a4348a6097c993f25d5c8a6 |
| manifest.json | 19d9ecce5557733e0ff0f2e27155e635c30158c3cfa6fbca0f11c16e4dedfd2c |

## Cleanup and evidence

Only explicitly configured `C:/Obsidian/kplex-test-small` was used. Independent final restoration passed: original **107-file inventory**, native layout and exact data/enablement/workspace/appearance bytes, rechecked after delayed native saves. Zero Plex views/managers/known test controllers remain; Settings is closed. The restored original pending migration notice may reopen. No native JavaScript errors were captured. The tested final executable remains staged in Small.

Private durable evidence: `%LOCALAPPDATA%/KplexValidation/ontology-manager-194`. Original manager backup: `native-baseline-1792477482962`; document-use backup: `usage-baseline-1792483111484`; recount backup: `usage-baseline-1792491707167`; current partial-zero backup/final audit: `usage-baseline-1792493313874`; original lanes: `delivery-*`; document-use extension: `usage-native-3`; recount extension: `counts-native-1`; final partial-zero correction: `partial-zero-native-1`. Original/final source snapshots/manifests and all passed/failed logs retained privately. No raw vault/configuration data or traces added to the repo. One-session staging/restoration helpers were retained privately and removed locally. Temporary planning marker removed; no handoff archive or refactor-ledger session entry created. Standing header preserved verbatim.

Native harness fixes are test-only: declarative subpage document lookup, visible/focused Settings ownership, detaching Electron geometry before owner closure, queued-save baseline restoration, and waiting for queued fixture rebuild/backlog before strict zero-work composer measurements. No generic retry or runtime workaround remains.

## Remaining review and acceptance

Next main-agent action: inspect this complete local diff and private source identity, validate on pinned Node and resolve/accept the recorded aggregate limitations, then perform authorized publication on this same branch. Keep PR draft meanwhile. No product decision or additional implementation is pending; independent acceptance is not claimed.

Prioritized physical coverage: (1) macOS native Settings/popout focus, suggestion/Escape and teardown; (2) physical phone/tablet software keyboard/IME, touch selection, long names and single-surface scrolling. Minimum Obsidian host remains untested. Windows DOM/native handlers do not prove those platforms. No duplicate Windows manual test is requested for automated workflows. No reliable ETA is assigned to unavailable devices or the unresolved aggregate watchdog/bootstrap failures.

## Changed-file inventory

- `CONTRIBUTING.md`
- `HANDOFF.md`
- `README.md`
- `docs/ONTOLOGY_PAIRS.md`
- `docs/agent-handoffs/ontology-manager.md` (deleted)
- `docs/validation/ontology-manager-194-2026-10-20.md`
- `package.json`
- `scripts/testing/obsidian/externalSettings.mjs`
- `scripts/testing/obsidian/folderCreationWorkflows.mjs`
- `scripts/testing/obsidian/ontologyInput.mjs`
- `scripts/testing/obsidian/ontologyManager.mjs`
- `scripts/testing/obsidian/ontologyPairs.mjs`
- `scripts/testing/obsidian/ontologyUsage.mjs`
- `src/adapters/obsidian/ontologyUsage.ts`
- `src/core/contracts/ontologyConfiguration.ts`
- `src/editor/OntologySuggester.ts`
- `src/index/GraphIndex.ts`
- `src/lang/de.ts`
- `src/lang/en.ts`
- `src/lang/es.ts`
- `src/lang/fr.ts`
- `src/lang/ja.ts`
- `src/lang/nl.ts`
- `src/lang/ru.ts`
- `src/lang/zh-TW.ts`
- `src/main.ts`
- `src/settings.ts`
- `src/ui/AddToOntologyModal.ts`
- `src/ui/NewRelatedNoteModal.ts`
- `src/ui/OntologyManagerModal.ts`
- `src/ui/OntologyPartnerSuggest.ts`
- `src/ui/OntologyUsageModal.ts`
- `src/ui/features/ontologyPresentation.ts`
- `styles.css`
- `tests/action-settings.test.mjs`
- `tests/indexing.test.mjs`
- `tests/ontology-configuration.test.mjs`
- `tests/ontology-pair-modal.test.mjs`
- `tests/ontology-presentation.test.mjs`
- `tests/ontology-suggester.test.mjs`
- `tests/ontology-usage.test.mjs`
- `tests/source-relationship-mutations-indexeddb.test.mjs`
- `tests/support/styleSettingsHost.mjs`
- `tests/ui-components.test.mjs`
