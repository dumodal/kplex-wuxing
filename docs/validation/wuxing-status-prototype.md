# Wu Xing status prototype

Date: 2026-10-15. Local ZIP checkout; no Git metadata, commits, pushes or pull request.

## Behavior

The `kplex-wuxing` plugin identity enables a read-only status-derived projection of existing direct connections. Exact 🟡, 🔵, 🟢, 🔴, 🟤 scalars and lists with one unique phase are accepted. Missing, unsupported or ambiguous values are not guessed; a banner reports unclassified visible connections. No note metadata is migrated or written by this projection.

The generating cycle is presented as Wood → Fire → Earth → Metal → Water → Wood. Relationships are read relative to the selected note, which may have any phase: same phase is 同我; one step forward 我生; two 我克; three 克我; four 生我. Metal is a personal reference example from dumo, not the starting phase of the general framework. The cycle closes back on itself; its presentation order does not impose a fixed reference point. Existing links establish adjacency; metadata never creates whole-vault connections. Underlying source evidence remains unchanged.

Historical stage one used existing layout zones: top 生我, bottom 我生, left 克我, right 我克, outer-right 同我. Same-phase nodes have direct center connectors. This initial layout was superseded by the 2026-10-16 pentagon implementation below. Legacy relationship editing and section expansion actions are blocked in this prototype; normal note editing remains available. The original ontology settings and some disabled legacy controls remain and will need later UI simplification.

Status drives node colors and relation labels are enabled. Expanded depth and cross-links start off. Views and IndexedDB are namespaced separately from upstream. The new view identity means the prior experimental tab should be closed and a new graph opened after reload.

## Validation

Node 22.22.2 via a scoped npm runtime; real installed Obsidian types and dependencies.

- Production build passed.
- Architecture checks passed (109 migrated roots, no violations).
- Core checks passed (128 tests).
- Obsidian lint passed again on the final production source.
- Indexing fixture, settings independence, warm caches and incremental workflows passed.
- Broad portable run: 822/825 passed initially. Three failures were new locale metadata, test dependency compilation and intentionally renamed manifest IDs. Fixed and reran localization, identity and Wu Xing tests: 32/32 passed.
- Wu Xing tests cover all 25 phase pairs and inverses, supported/invalid metadata, existing-edge-only neighborhoods, center changes, same-phase visibility with legacy siblings disabled, live metadata reads and blocked ontology actions.
- Browser UI suite: 63/63 passed.
- Source repository suite: 334/334 passed.
- IndexedDB/browser suite completed: 517/517 passed, exit 0. Final validation recorded 2026-10-16.
- Native Obsidian CLI is disabled and installer reports older CLI support. Actual reloaded plugin rendering remains unverified. User is actively editing in Obsidian, so no forced reload.

## Local delivery

Installed artifacts: `/Users/dumo/Documents/dumodal/.obsidian/plugins/kplex-wuxing/`.
Previous build: `/Users/dumo/Downloads/dumodal-Codex/2026-10-15-kplex-wuxing/status-prototype-backup/`.
Do not overwrite running data.json. Reload from Obsidian when ready and open a new graph tab.

## Source identity

```text
bbc4b68aad9d1e6846e9c9acb0f55616edf7916f71dc30bda3a0f1aa4cc86db0  src/main.ts
f15d8cd4c45857d33eb9ba0614cf04c2ba433a680957e4903ed9e2d859fe8c8c  src/index/GraphIndex.ts
268658cccda346533ded07150b015adfc733019c4e2e3ed17bb6a2c1ab7a84c6  src/core/plex/wuxing.ts
ba1b09423b5d8d6cfb3fac21568980097ab23b2360bfb3d50e7a0c93940829af  src/lang/wuxing.ts
922fcee3c46c5dce7e2f04c3a5fcb1820e788b461f4bcea7461ca8eb5b10e030  src/ui/layout.ts
74351e9876a3d55c6dd93fb2c1daa4abafb85d9d059c1c60ebb832dd72962efa  src/ui/PlexGraph.tsx
7a07f262beaa239f72c16d49b30c93d998b8732351df2adafcbab431773d5f96  src/ui/KplexView.tsx
4401e72e459d6e60d4cc70d72ab60ed2aa042209b611e4070c38a49e09d9adb9  src/index/IndexedDbCache.ts
```


## 2026-10-16: fixed phase ring and local distribution

User confirmed fixed phase positions with the active note moving to its own phase. User then specified wood at top, fire upper-right, earth lower-right, metal lower-left and water upper-left, using their radar diagrams as the visual reference. This is a deliberate fork layout change; upstream layout policy remains available outside the fork identity.

- The active note retains central-role typography but sits at its own phase vertex, alongside same-phase neighbors. Same-phase nodes no longer receive upstream sibling shrinking.
- A separate presentation scaffold preserves five vertices even when groups are empty. It never creates semantic edges. Unknown active status retains the active note at the vacant center and the existing unclassified notice.
- Geometry uses only the bounded supplied neighborhood. Group panels scroll; radius accounts for visible bounds rather than offscreen rows. Filters retain vertical group positions. Metadata changes use the same live normalized status for color and classification.
- Camera fit targets the ring origin rather than the active note. Real connectors choose physical endpoints from actual positions. Legacy four-direction gate controls/count bubbles are hidden in fork views because their spatial meaning no longer holds.
- Experimental radar counts include the active note and currently recognized valid-status direct neighbors before per-phase maxItemCount display truncation. The default was explained while the optional metric preference remained unanswered. Counts are not whole-vault totals, complete incidence promises or an energy measurement. Display truncation, local filters/lenses and scroll position do not change these counts; host/index visibility and recognition updates do. Self-links are excluded so the active note counts exactly once.
- Radar radius = ring radius × 0.57 × sqrt(phase count / total). This monotone bounded scaling makes sparse distributions readable. The balanced reference uses share 0.2 on all five axes. Empty phases have radius zero. Wedges color the sectors of the actual polygon; no measurements are written to notes.
- Existing graph-depth defaults remain one. Native editor maximization follows the active note's actual coordinates.

Validation: real production build passed; focused classifier/layout/camera tests passed before the radar addition (40 tests). Browser fixture renders actual layout, WuXingGuide and ThoughtNode with bounded host doubles, checks five colors and metal lower-left, and hides obsolete gates; 5 browser/classifier tests passed. The saved preview uses clearly labeled synthetic notes and omits semantic connectors, so it is a visual fixture, not proof of native Obsidian rendering. Full verification is running; native reload remains pending because CLI is unavailable.

Preview and logs: `/Users/dumo/Downloads/dumodal-Codex/2026-10-16-kplex-pentagon/`.

Review corrections: counted pre-limit available relationships in ephemeral Neighborhood.wuXingCounts (no persisted schema change), excluded self-links from neighbors/unclassified counts, and made area-height drag direction read the actual resize edge. Re-ran classifier, layout, camera and localization checks: 65/65 passed before the final self-link notice consistency adjustment. Final affected checks follow below.


### Final user steering: phase groups own the relationships

User requested single-character relations and tangible group frames, explicitly replacing individual note wires with box-to-box relationships. Final display has five persistent phase frames, single-character phase titles, five generating arrows and five controlling arrows. Clockwise wood → fire → earth → metal → water defines generation; a two-step jump defines control. Water therefore points to wood with 生 and to fire with 克. Note containment expresses membership, with no individual relationship wires drawn in fork mode. Empty frames remain. The current note stays emphasized inside its own group. Group arrows describe methodology only; they do not create note links or affect neighborhood navigation.

The broad npm run verify completed successfully (architecture 7, core 128, main 829, browser UI 63, source 334, IndexedDB/browser 517), before the final phase-frame display refinement. Subsequent final affected checks cover exact frame bounds, empty groups, typography/colors, off-center camera, pre-limit radar counts, single-character labels, actual Chromium rendering and water arrow destinations. Native Obsidian reload remains unverified; CLI is unavailable. The user-facing preview uses synthetic notes with production layout, guide and node components, not a screenshot of the live vault.

Final delivery: build and Obsidian lint passed on the final source; final affected suite 67/67 passed (including Chromium). Installed only main.js, manifest.json and styles.css; verified matching SHA-256. Previous installed artifacts retained in /Users/dumo/Downloads/dumodal-Codex/2026-10-16-kplex-pentagon/before-pentagon. No data.json or note files written. Native reload remains pending.

```text
41be9eb29aedcd4a091dfddb6b79d5d8d1b3ed3c26b0cd86f869a2d8ef7aeca8  main.js
7987b47529ec34b6d2b2ab430e68aa51a90a13b7395b6f5b36e467dfcf8b96c7  manifest.json
caef2968250eb2132c6c895672387d2ccd3fb7dc8cebaeab0952f70374fb30c0  styles.css
```


## Mild perspective and exterior controlling links · 2026-10-16

Fixed world-space phase frames now share a lightweight rotated plane. Local recognized counts select a bounded automatic tilt; manual yaw/pitch are persistent offsets, and reset returns both offsets to zero. Balanced counts stay flat. Rear frames and notes fade without disappearing. Counts do not resize the frames; overflow uses existing scroll panels. Current note remains inside its own phase.

Generating arrows follow the pentagon edges; controlling arrows and their single-character labels route outside the frames, leaving the central radar clear. Fork layout controls replace density sliders with angle sliders and omit parent/child limits. Upstream mode keeps its original controls. Phase toolbar space is inside the panel header.

Validation: focused geometry, settings and Chromium rendering checks passed 33/33; wood-only Chromium rendering and toolbar overlap check passed 1/1. Full npm run verify passed on Node 22.22.2: architecture 7, core 128, main 835, UI 63, sources 334, browser/IndexedDB 517; lint and production build passed. Installed dist/main.js, manifest.json and styles.css into the local kplex-wuxing plugin with matching SHA-256 hashes. Backup: /Users/dumo/Downloads/dumodal-Codex/2026-10-16-kplex-pentagon/before-tilt-195742. Browser fixtures use bounded Obsidian doubles; native Obsidian reload has not been verified.

Installed artifact identity:

```text
main.js: 1654f980790c88ca678678010c679992017fe561fd195a5a7991d420810e0a8f
manifest.json: 7987b47529ec34b6d2b2ab430e68aa51a90a13b7395b6f5b36e467dfcf8b96c7
styles.css: d2ca9d200ff7e93f0084ed303b79b4bfde0a9eb14c2dc8bcd37f9e2d3f14b88e
```


## Star gradient revision · 2026-10-16

User requested a five-point star backdrop rather than a conventional radar. Five fixed star arms now use phase-colored gradients shared with frame backgrounds; local count share increases gradient intensity. Removed radar axes, balanced reference, dots and outline. Generating arrows now use straight segments between frame borders; controlling arrows retain outer curves.

Deleted the legacy density/parent/child column toolbar JSX and its dead write state from this fork; camera sliders and reset are unconditional, typography remains. Disk artifacts had matched before this change, so the exact prior native toolbar symptom cannot be attributed to stale installation from disk evidence alone.

Validation on Node 22.22.2: affected UI/layout/localization/tooltip/perspective/Chromium checks 81/81; wood-only Chromium check 1/1; reviewer typography check 9/9. lint:obsidian and real production build passed. Prior full verify 1,884/1,884 belongs to the previous revision; broad database tests were not repeated for this display-only update. Native Obsidian reload pending.

Backup: /Users/dumo/Downloads/dumodal-Codex/2026-10-16-kplex-pentagon/before-star-201044

Installed artifact identity:
```text
main.js: adbcbaafb1e958026edef9601010ae5e11819e787d1407d49f6b968351a0bd69
styles.css: 1031cede6b6bcb947d0ef295c6678ea49f9fc381b0c1acf79be86ce363951c38
manifest.json: 7987b47529ec34b6d2b2ab430e68aa51a90a13b7395b6f5b36e467dfcf8b96c7
```


## Independent controlling bows · 2026-10-17

Five independent quadratic controlling curves replace the shared circular route. Each bends outward around the intervening phase frame; sampled avoidance handles camera changes, sampled curve points inform fit, and labels sit at actual curve midpoints. Generating straight lines unchanged. Star tip reach is 0.88 × sqrt(local share); empty arms invisible, narrow shared notches keep isolated populated arms visible.

Affected geometry/browser checks 33/33, additional wood-only 1/1 and balanced 1/1 passed. Browser asserts five single-Q curves, no intervening-frame intrusion in tested views, and count-dependent arm reach/opacity. Lint and production build passed on Node 22.22.2. Full suite not repeated for this presentation update; native reload pending.
Backup: /Users/dumo/Downloads/dumodal-Codex/2026-10-17-kplex-independent-arcs/before-000533
Installed hashes:
```text
main.js: 811c16da4cfe8c5c2d4d65bc252d4dd4acb388293b4d530b7d301804ff440bfd
manifest.json: 7987b47529ec34b6d2b2ab430e68aa51a90a13b7395b6f5b36e467dfcf8b96c7
styles.css: 1031cede6b6bcb947d0ef295c6678ea49f9fc381b0c1acf79be86ce363951c38
```


## Live status file resolution · 2026-10-17

User screenshot shows questions for kplex unclassified, while disk file has status list 🔵 and four wikilinks. Status lookup now resolves the current Vault TFile by page.path rather than trusting a potentially missing/stale graph page.file. Regression covers null/stale handles and deleted physical files. This is a verified code-path defect, not confirmed native root-cause attribution. 36 affected classification/layout/browser tests, lint and production build passed; native reload and content restoration remain pending.
Backup: /Users/dumo/Downloads/dumodal-Codex/2026-10-17-kplex-independent-arcs/before-status-fix-014151
```text
main.js: 0c062aa9d7b6bd5a839fbf13213b234c55ff090068ca2680fc63f542e9826991
styles.css: 1031cede6b6bcb947d0ef295c6678ea49f9fc381b0c1acf79be86ce363951c38
manifest.json: 7987b47529ec34b6d2b2ab430e68aa51a90a13b7395b6f5b36e467dfcf8b96c7
```


## Bilingual ontology fields · 2026-10-19

Relationship fields exposes exactly five rows in Wu Xing mode: 同我 · Kinship, 我生 · Expression, 我克 · Stewardship, 克我 · Governance, 生我 · Nourishment. Hidden and Next rows omitted. Uses existing hierarchy setting persistence, with one-time seed vocabulary: Chinese names first, paired provisional English branch aliases. Custom aliases retained, upstream examples replaced; edits and order survive reload and Challenger is no longer injected after initialization. Existing hidden settings retained but not exposed here. Graph classification remains status-based; this revision does not implement ten-god subtype rendering.

36 affected layout/migration/classification checks passed; lint and production build passed. Installed in dumodal and dumo-notebook; settings file untouched on disk, initialization occurs through plugin load/persistence. Native settings-page inspection remains pending.
Backup: /Users/dumo/Downloads/dumodal-Codex/2026-10-19-kplex-ontology/before-001952
main.js SHA-256: b77d2277e295d71988c9f1d600e58c31bcfff5c3b95415a0c9b4317549c32a58


## 2026-10-25: saved English or Chinese display language

Connected source: `/Users/dumo/Documents/GitHub/kplex-wuxing`, local branch `wuxing-local-design`, based on `8df393a44272e4d6a5d2b403447ef0f3c81ae527`. The earlier Desktop source remains a backup. The transferred source and this revision are not committed or pushed.

The bottom-left graph customization panel now includes a native English or Chinese selector. `wuxingLanguage` persists through the existing settings snapshot mechanism; missing or unsupported values retain the previous Chinese display. A live translation overlay updates phase names, generating/regulating verbs, directional relationship labels, camera controls, and Wu Xing notices without changing the host application language, source metadata, custom aliases, adjacency, or graph semantics. English arrow labels receive wider backgrounds. The current working vocabulary is recorded in `docs/Wu Xing terminology.md`.

The former localization ownership failure was resolved by moving relationship headings and help text into the language catalogs. The five settings rows display one language at a time; their existing property aliases remain data and are preserved.

Validation on Node 22.22.2:

- `npm run verify`: passed, exit 0. Architecture 7, core 128, main 837, browser UI 63, source 334, browser storage 517. Architecture reports 110 migrated roots and zero violations. Lint and the final production build passed.
- Focused Wu Xing classifier, perspective, and browser tests: 9 passed, zero failed.
- The browser test operates the actual language selector, renders the production guide in both languages, verifies the English arrow text fits its background, and restores serialized settings through the production migration. Host services are bounded test doubles.
- Live translator tests verify switching, host-language independence for Wu Xing terminology, parameter formatting, and unchanged host fallback. Settings tests verify language round-trip and preservation of aliases and camera offsets.
- `git diff --check`: passed.
- React review: native labeled select, bounded portable component, no new event listeners or effects, existing publication and persistence owners reused.

No plugin files were installed into either vault, and no running Obsidian settings were edited. Native Obsidian rendering and actual vault reload remain unverified. No additional manual acceptance is claimed.


### 2026-10-25: installation into dumodal

Installed the verified build into `/Users/dumo/Documents/dumodal/.obsidian/plugins/kplex-wuxing/` only. Copied `main.js`, `manifest.json`, and `styles.css`; source and destination SHA-256 values match. The installation did not modify `data.json` or any vault note.

Backup of the prior plugin artifacts and settings snapshot: `/Users/dumo/Downloads/dumodal-Codex/2026-10-25-kplex-language-selector/before-213334/`.

Installed hashes:

- main.js: `9a6582d3b4e0821fa3ca6af2fa190e9c8ec236541a6319deca81737da5b19891`
- manifest.json: `7987b47529ec34b6d2b2ab430e68aa51a90a13b7395b6f5b36e467dfcf8b96c7`
- styles.css: `8ed3d0fd017e01c9c8bd863128f455c5d1f3d943a17111341da9f3a2f5117ab6`

Native reload remains pending: Obsidian reports its command-line interface is disabled, and the UI-control runtime could not start. The user was given the manual disable/enable and graph-reopen steps. Do not treat the installed-file hash check as confirmation of live Obsidian rendering.


## 2026-10-25: English default and first-use guide

English is now the default for absent or unsupported `wuxingLanguage` values. Explicit Chinese remains valid. `wuxingGuideSeen` records dismissal; fresh settings leave it false. A visible graph requests one plugin-owned native guide, with shared duplicate prevention across panes. Hidden restored graph tabs do not trigger onboarding. Escape/native close and the Start exploring control retire the React subtree and remember dismissal; unload retires the guide without saving after teardown. A Guide button reopens it.

The content uses the approved five-family definitions and the accepted A/B intake defaults: original expression begins as 我生; external capture begins as 我克. A local reference-phase selector starts with Metal and recomputes example statuses through the existing cycle. Its state is not a personal setting and never writes metadata. Existing dumodal status assignments are the foundation of the test and remain unchanged. No relationship semantics, note links, or Shishen polarity rules were changed.

Focused verification: 126 tests passed across localization, settings/layout migration, production host callbacks, classification, perspective, and browser rendering. This covers English fallback, preserved explicit Chinese, guide dismissal/reopen/unload, single-language content, correct YAML examples, and reference-dependent A/B mapping.

The full repository run has passed architecture (7), core (128), lint, main (839), browser UI (63), and source (334) checks. Browser storage verification was still running at this checkpoint; final result follows when complete. A separate real production build passed before local installation.

Installed into dumodal only after backup: `/Users/dumo/Downloads/dumodal-Codex/2026-10-25-kplex-onboarding/before-220908/`. Source and destination artifacts match; the copy left `data.json` unchanged.

- main.js: `9679165317c4b3d7635cd77af7b9bea5c924d36ab8c057e7edc4b990f6204f1b`
- manifest.json: `7987b47529ec34b6d2b2ab430e68aa51a90a13b7395b6f5b36e467dfcf8b96c7`
- styles.css: `bce9b7f454e82a31031681400a884d80928d8e7b23370064f0adb536ada465f9`

Native Obsidian reload/display confirmation remains pending user testing. The command-line interface was disabled and UI automation was unavailable in the earlier installation check. Manual plugin toggle and visible-graph testing instructions were provided. Source remains uncommitted and unpushed on `wuxing-local-design`.


### Final onboarding verification and native feedback

The complete `npm run verify` finished with exit 0: architecture 7, core 128, main 839, browser UI 63, source 334, and browser storage 517 all passed. Lint and the final real production build passed. The separately run focused set passed 126 checks. `git diff --check` passed. The final rebuilt artifacts still match the files installed in dumodal.

User-confirmed native result on 2026-10-25: the first-use guide opens in English in dumodal, and changing the reference phase updates the A/B examples correctly. This is actual vault feedback, distinct from the earlier browser fixture results. Dismissal, reopening, and unload behavior have automated coverage; do not extend the user confirmation to native actions not explicitly reported.

English-default onboarding is ready for continued ontology testing. Existing note metadata was not changed. Source remains local, uncommitted, and unpushed on `wuxing-local-design`.


## 2026-10-25: Five Phases naming and original-term side note

The current English interface now uses "Five Phases" in the guide title, introduction, phase heading, help text, and notices. A small introduction side note reads: "Original term: Wu Xing (五行) · Pinyin: wǔ xíng." Phase and relationship labels remain in the selected language; the original-term note is an intentional exception. The design notes now mark "Five Agents" as a possible future alternative rather than the current label. No semantic, metadata, or persistence behavior changed.

Validation: 25 localization and Wu Xing browser checks passed, including the new original-term/pinyin assertion and English-only main content outside the side note. Obsidian lint, the real production build, and `git diff --check` passed. The preceding full verification remains recorded above; the targeted checks were used for this copy-only revision.

Installed into dumodal only. Prior files and settings snapshot backed up at `/Users/dumo/Downloads/dumodal-Codex/2026-10-25-kplex-five-phases/before-222231`. Installed artifacts match dist; `data.json` was not changed by the copy.

- main.js: `5adb6a5657f39b0770ad72bd8b66a7a9c736fcc9e200139b5293cf0835a0e601`
- manifest.json: `7987b47529ec34b6d2b2ab430e68aa51a90a13b7395b6f5b36e467dfcf8b96c7`
- styles.css: `bce9b7f454e82a31031681400a884d80928d8e7b23370064f0adb536ada465f9`

The updated wording still needs a native plugin reload. Source remains uncommitted and unpushed.


## 2026-10-25: Contextual onboarding content and directional regulation

Created `docs/Wu Xing onboarding content.md` as reusable English and Chinese copy for a potential Wu Xing view or ontology template inside upstream K-Plex. Its properties identify working onboarding content and link the terminology and methodology references. Integration remains a maintainer decision. Removed the visible-graph automatic opening effect; the lower-left Guide button still opens the native preview on explicit request. Existing seen-state persistence remains compatible.

The first three relationship definitions are unchanged. What regulates me now describes direction and rules, distinct from support or nourishment, with the possibility of excessive restriction or exhaustion. What I regulate describes outside acquisition or influence, without an obligation to spend additional attention, and with a cost when capture or management becomes excessive. Both display languages, the terminology note, methodology note, and portable onboarding content reflect this revision.

Validation: 85 focused localization, production-host callback, and Chromium guide checks passed. Obsidian lint and the real production build passed. Documentation properties, local reference targets, and absence of the automatic graph-opening call were checked. The preceding full verification remains recorded above; it was not rerun for this revision.

Installed matching artifacts into dumodal only. Backup: `/Users/dumo/Downloads/dumodal-Codex/2026-10-25-kplex-contextual-guide/before-222939`. `data.json` remained byte-for-byte unchanged during installation; no vault notes or metadata were modified.

- main.js: `721ff57a70c64659f209571ef79a76c5ca63454dd9b20c683b920abfc53d2bfb`
- manifest.json: `7987b47529ec34b6d2b2ab430e68aa51a90a13b7395b6f5b36e467dfcf8b96c7`
- styles.css: `bce9b7f454e82a31031681400a884d80928d8e7b23370064f0adb536ada465f9`

Native review of the revised wording still requires a plugin reload and manual Guide opening. Source remains local, uncommitted, and unpushed.


## 2026-10-25: General cycle order and personal reference

Corrected the opening Behavior description to present generation as Wood → Fire → Earth → Metal → Water → Wood. General introductions and the portable reference-example tables now use this order. Metal remains explicitly the personal example requested for the interactive guide; it is not a universal first phase or graph reference. The Heavenly Stem sequence begins with 甲 Jia; that ordered list and the continuously repeating generating cycle are distinguished in the terminology and methodology notes. The source comment now describes the same conceptual order while documenting the existing rotated internal index as an implementation detail. No runtime expressions, status assignments, graph relationships, saved settings, or installed plugin artifacts changed.

Validation: checked cycle wording, bilingual table order, local note references, and `git diff --check`. This documentation/comment-only revision does not require a runtime rebuild. Sources are linked in the terminology and methodology notes. Source remains uncommitted and unpushed.


## 2026-10-25: Wood default and digital garden methodology

The user accepted BaZi as optional personal background, then chose Wood and the digital garden as the general teaching entry. The guide now starts with Wood, without introducing Jia Wood or the ten Heavenly Stems into its classification. The personal Xin Metal example remains optional tutorial material in the methodology and terminology notes. No birth-chart calculation, personal profile, polarity assignment, or note-status migration was added.

The existing methodology note now explains the digital garden as an entry into understanding the unique relationships a person develops with memories, outside information, and personal expression through ongoing use. Wood describes the initial learning perspective and growth metaphor; it does not classify every note as Wood. The person and the temporary graph reference remain distinct. The portable onboarding copy and English/Chinese preview match this direction. With Wood as the example reference, original expression starts as Fire and outside capture as Earth.

Validation: 33 focused localization, Wu Xing model/perspective, and Chromium guide checks passed, including Wood as the initial selection and correct A/B outputs for all five reference choices. Full `npm run verify` completed with exit 0: architecture 7, core 128, main 839, browser UI 63, source 334, browser storage 517; lint and the final real build passed. Note properties, internal note references, introductory scope, and `git diff --check` were checked.

Installed matching artifacts into dumodal only; backup at `/Users/dumo/Downloads/dumodal-Codex/2026-10-25-kplex-digital-garden/before-224908`. `data.json` remained byte-for-byte unchanged during copying. No vault notes or their metadata were edited.

- main.js: `6bd354fd0f43e14f3031b2e490a50b76fdb6f1e5e14a952753b225874a7aac41`
- manifest.json: `7987b47529ec34b6d2b2ab430e68aa51a90a13b7395b6f5b36e467dfcf8b96c7`
- styles.css: `bce9b7f454e82a31031681400a884d80928d8e7b23370064f0adb536ada465f9`

Native review of the Wood default and new digital garden wording requires a plugin reload and manual Guide opening. Source remains local, uncommitted, and unpushed on `wuxing-local-design`.


## 2026-10-25: Opening overview and readable text

The first Wu Xing scene now fits all five phase frames and complete outer control routes, independently of the navigation autozoom preference. Loading placeholders do not consume the opening placement; hidden panes wait for positive dimensions. Later geometry and ordinary pane resizing follow only while the fitted camera still owns the scene. Manual pan or zoom retires that ownership. Legacy graph navigation and explicit display transitions retain their existing camera policy. The saved `allowAutozoom` preference is unchanged.

Wu Xing note labels now have larger presentation-only font sizes with matching row height and full list-card width. Rear note text retains at least 0.85 opacity before deliberate hover dimming; phase-frame depth fading remains. SVG phase names, counts, and relation labels are larger, with wider English label backgrounds. Larger frames and more spacing retain the complete diagram. The current note uses the first lane below the phase heading, leaving a fully visible first neighbor row. The previous center-at-vertex test was deliberately updated to assert this lane, containment, fixed phase order, and non-overlap. No note status, relationship, or saved style value was changed.

Focused viewport, layout, phase-model, perspective, and Chromium checks passed. The browser fixture uses production scaffold bounds and fit math at 1200 × 800, asserts note/phase label sizes of at least 12 screen pixels, checks short current-title fit, visible first rows, rear contrast, and English relation backgrounds. Empty-neighbor and populated examples both passed. These are synthetic browser fixtures, not native vault screenshots.

An initial broad run exposed a legacy extracted-callback fixture missing the new graph-mode dependency. The fixture now supplies the real callback dependencies; display-resize coverage also distinguishes legacy disabled-autozoom behavior from the owned Wu Xing overview. The final full `npm run verify` exited 0: architecture 7, core 128, main 841, browser UI 63, source 334, and browser storage 517 all passed; lint/build passed. `git diff --check` passed. Final log: `/Users/dumo/Downloads/dumodal-Codex/2026-10-25-kplex-overview/verification-final.log`.

Review images: `/Users/dumo/Downloads/dumodal-Codex/2026-10-25-kplex-overview/populated.png` and `/Users/dumo/Downloads/dumodal-Codex/2026-10-25-kplex-overview/empty-groups.png`.

Installed matching final artifacts into dumodal only. Backup: `/Users/dumo/Downloads/dumodal-Codex/2026-10-25-kplex-overview/before-232302`. Settings remained byte-for-byte unchanged during installation, and no vault notes were modified.

- main.js: `eef5c5b33c20d0f76211226801eaa1a042a8bc02de8ec7c87196fe342e521081`
- manifest.json: `7987b47529ec34b6d2b2ab430e68aa51a90a13b7395b6f5b36e467dfcf8b96c7`
- styles.css: `268d4e84f5d109b09fed4726c4dd327f2f989bc85554de85ed1492a6333aa265`

Native opening/readability confirmation remains pending plugin reload and user testing. Source remains local, uncommitted, and unpushed on `wuxing-local-design`.


## 2026-10-25: Text hierarchy follow-up and overview proposal

Native user feedback confirmed that the opening layout fits in dumodal, while note titles were too large relative to phase headings and link labels. Reduced the default overview note-label baseline from 38 to 30 world pixels, and the current-note baseline from 42 to 32, with smaller role/style multipliers. Phase headings and relationship labels retain their previous sizes. Card heights follow the smaller painted text. Frame geometry, opening-camera policy, phase memberships, and saved metadata are unchanged.

The new browser hierarchy check reproduced the excessive-title problem before the change, then passed after it. It verifies phase headings are larger than note titles, note titles remain close to relationship labels, and the prior minimum readability/card-fit checks still pass at 1200 × 800. Populated and empty-neighbor previews passed. Focused layout/viewport checks and the final full verification passed: architecture 7, core 128, main 841, UI 63, source 334, browser storage 517; lint/build passed. `git diff --check` passed. The full log is `/Users/dumo/Downloads/dumodal-Codex/2026-10-25-kplex-type-balance/verification.log`.

The requested concise overview and a separate upstream drag-to-classify proposal were added to `docs/Wu Xing onboarding content.md`, with corresponding methodological and terminology updates. Current behavior was checked in GraphIndex: an unclassified current note remains in the centre, unclassified neighbors are counted but omitted, and the fork does not automatically fall back to the original layout. The proposed centre collection and status-writing gesture are not implemented. The user approved retaining existing phases and limiting the proposed Wood default to an unclassified current note; default persistence remains open.

Installed matching artifacts into dumodal only, with a backup at `/Users/dumo/Downloads/dumodal-Codex/2026-10-25-kplex-type-balance/before-235347`. `data.json` remained byte-for-byte unchanged during installation; no vault note metadata was edited.

- main.js: `7ab570dca10b66603cd554b78ee5de9d9b74c26dfeb9cfab508518789c1074b8`
- manifest.json: `7987b47529ec34b6d2b2ab430e68aa51a90a13b7395b6f5b36e467dfcf8b96c7`
- styles.css: `268d4e84f5d109b09fed4726c4dd327f2f989bc85554de85ed1492a6333aa265`

Native confirmation of the revised title proportions remains pending reload. The earlier native framing confirmation is preserved. All source and notes remain uncommitted and unpushed.
