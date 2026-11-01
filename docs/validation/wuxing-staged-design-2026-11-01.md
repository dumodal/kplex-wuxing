# Staged Wu Xing design on official 0.4.0

The user requested only visibility controls and node appearance first, with later design features added separately to isolate typing flicker.

## Baseline

Official tag 0.4.0 (`b64c88a`), with independent fork plugin identity, view IDs and cache namespace. Baseline commit: `d546e98`. Complete prior design remains on `sync/upstream-0.4.0` (`ecc2cb5`) and `wuxing-local-design` (`8dcc29e`).

## Step 1: visibility only

- Native preset editor and the shared canvas Appearance rail expose independent Hide group labels and counts, and Hide group frames controls. Existing upstream guide, regulating-cycle and relationship-label controls remain available.
- Only category chrome is hidden. Diagnostics, drop targets, node gates, official rectangular placement, measured envelopes, camera and native editors retain upstream behavior. Hidden headers retain their space.
- Existing fork preset fields remain stored but later-stage scatter, content sizing, caption editing and Diagnostics docking are not implemented here. Existing spacing values down to zero remain readable to prevent rejecting saved fork presets; native spacing controls retain official bounds.
- The current saved Wu Xing preset was checked read-only and is accepted. No settings or notes were modified.
- Node/grid layout, scene measurements, semantic index and publication code compare unchanged against official 0.4.0 (apart from cache identity).

Validation: Node 22.22.2, real production build passed. Focused preset/native-manager/browser/localization suite: 89/89 passed; after the saved-spacing compatibility adjustment, preset recheck: 33/33 passed and production build passed again. Browser checks compare exact node rectangles and DOM identity, retained camera, reversible visibility, Diagnostics reachability and unchanged source acquisitions. Native settings Save/Cancel and a new host loaded from persisted data preserve both flags and unknown fields.

Scope risk: presentation controls only, with no indexing/source scheduling or compiler changes. The expensive aggregate indexing/storage suites are not rerun for this UI scope. No native acceptance is claimed; Obsidian CLI cannot find running Obsidian.

Logs and staged build artifacts: `/Users/dumo/Downloads/dumodal-Codex/2026-11-01-kplex-staged-design/`.

## Step 2: optional node appearance

- Enable Use category color for center outline in the native preset editor or the shared canvas Appearance controls. This switch defaults off, allowing a visibility-only test before enabling the second step.
- The center card gets a neutral theme fill, category-colored border and 3px by 4px offset shadow. Its redundant category badge is visually hidden while its reserved geometry remains.
- Official font size, card dimensions, corner shape, other nodes, ports, connector routing, group/grid placement and native embedded editors are unchanged. No scatter, content sizing, Diagnostics docking or caption editing is imported.
- Native hosted content is excluded from the paint override. The browser regression retains the same input element and typed value when toggling the switch.
- Final focused suite: 122/122 passed, covering presets, detached native settings persistence, real Chromium canvas behavior, localization and 32 camera cases. Browser geometry comparisons include actual rendered card dimensions. Build, Obsidian lint, architecture (zero violations), numeric-control policy and release metadata passed.

## Comparing the two steps

- Visibility-only branch: `test/0.4.0-visibility-only`, commit `ed37a7a`.
- Combined branch: `test/0.4.0-visibility-and-appearance`; its final commit adds step 2 independently.
- Separate three-file installable builds are saved under `step-1-visibility/` and `step-2-node-appearance/` in the log folder. `artifact-receipt.json` identifies commits and file hashes.
- Both builds preserve plugin ID `kplex-wuxing`. No installed plugin, notes or vault settings have been modified, and no branches were pushed.
- Native typing-flicker acceptance remains pending. These browser/source results establish presentation behavior, not a confirmed fix in the user's running Obsidian.


## 2026-11-02: phase groups only, with original history

The user prefers to keep official note groups and remove the Diagnostics section from the personal Wu Xing canvas. The existing Past notes history footer is retained.

- A shared preset presentation policy omits diagnostics only for presets using the five-phase interpretation and all five phase identities. Generic Facets presets retain diagnostics.
- The registered view excludes nonassigned neighboring occurrences and their display edges, then omits diagnostic areas and region decorations from its published layout. No empty diagnostic rectangle affects the visible canvas or camera fit. The center remains visible even if its current file cannot be classified.
- Canonical notes, links, cached facts and search remain unchanged. Official phase group bounds and assigned-node positions compare exactly with their earlier layout. No scatter, content sizing or alternate node packing was added.
- The Wu Xing native preset editor and canvas controls omit diagnostic options. Saved diagnostic preferences remain intact across unrelated saves. Default Help in all eight locales describes the revised view.
- App.tsx already includes the upstream history footer on loading and normal graph surfaces. No source change was needed to restore it. The history regression now supplies legacy `showHistory: false` data and still verifies all 14 saved slots and their activation behavior.
- Final targeted result on Node 22.22.2: 139/139 passed, covering view projection/layout, real Chromium canvas rendering, native settings controls, camera behavior, history/Footprints and localization. Production build, Obsidian lint, architecture and numeric-control checks passed.
- Presentation projection and layout publication are the affected owners; indexing, source acquisition, canonical graph compilation and persistence implementations are unchanged. Expensive full indexing/storage suites were not rerun for this scope.
- Current-run evidence and the three-file build are under `/Users/dumo/Downloads/dumodal-Codex/2026-11-02-kplex-five-phase-only/`.
- No vault notes, settings or installed plugin files were changed. No push was performed. Obsidian CLI remains unavailable, so native typing-flicker acceptance remains pending.


## 2026-11-02: one complete five-phase blueprint

The user requested removing the standalone Water chip and consolidating phase-frame visibility, background labels and separate cycle controls into one complete optional reference layer.

- New preset flag `blueprint` defaults off. The canvas Appearance rail, canvas menu and native preset editor address that one saved field. Old guide/tint/relative-label/frame preferences remain stored but do not gate the personal blueprint. Generic Facets presets retain their original controls and measured flow captions.
- The center category chip is visually hidden while keeping its measured reserve and accessible category description. The actual note title and native editor content remain unchanged.
- The complete background includes all five group frames, colored phase glyphs, contextual activity cues and roles relative to the selected note. Legacy group text/count controls are replaced by the guide copy. The personal cues are not fixed subject categories.
- Exactly five generating arrows follow wood, fire, earth, metal, water, wood. Exactly five regulating arrows follow the two-step cycle. Both use straight frame-to-frame segments, with solid versus dashed styles and one legend. They do not become semantic note edges or hit targets. Visual category reorder/reversal does not reverse model direction.
- The old outer cycle routes are removed from the registered Wu Xing decoration output so invisible guides cannot enlarge canvas fitting. The registered layout adds explanatory relative-role text only after ordinary packing, preserving all card/header dimensions.
- Turning the blueprint on/off changes only paint. Existing official category packing, actual card rectangles, DOM identity, manual camera, source demand and native hosted input remain stable. No source acquisition, graph compiler or indexing scheduler changes were made.
- Default guide text/help is available in all eight supported locales. Meaning copy and glyph metadata are centralized for later refinement.
- Final Node 22.22.2 focused result: 142/142 passed. Coverage includes actual Appearance checkbox/menu actions, Save/Cancel/reload, preserved legacy settings, all ten directed phase edges, reversed category order, missing-reference behavior, live theme colors, actual card rectangles and camera, history/Footprints, localization and existing generic Facets flows. Production build, Obsidian lint, architecture and release metadata passed.
- The full indexing/storage aggregate was not rerun for this presentation-only scope. The indexing harness module inventory includes both new imported files.
- A Chromium preview checks guide on/off with identical note/camera geometry. It uses synthetic notes, an explicitly light canvas and Chinese copy; it is not a capture of the user's native vault. The preview also verifies that the note title remains present and visible while the category chip is hidden.
- Logs, preview PNGs, artifact and installation receipts are in `/Users/dumo/Downloads/dumodal-Codex/2026-11-02-kplex-blueprint/`. The installation receipt records the actual backup, installed byte hashes and settings-preservation check.
- Deployment is limited to the three plugin artifacts in dumodal; no notes or plugin settings are edited. Reload remains a separate native action because Obsidian CLI cannot connect.


## 2026-11-02: separate overlapping column connections

The user supplied a screenshot where several vertically stacked notes above the center share one long vertical connector. Their fixed group/card positions must remain stable.

- Root cause: aligned cards have the same physical gate x-coordinate. The existing shallow Bezier controls also share that x-coordinate, so different target distances paint the same vertical segment; opposite-facing semantic ports may also send that segment through cards.
- The personal Wu Xing renderer now allocates stable side lanes only to groups of at least two aligned vertical center-to-category connections. Nearest destinations use the innermost lane, farther destinations use progressively outer lanes. Input/paint iteration does not change ranking for the same scene.
- The planner borrows existing rectangles and edge identities. Source and target gate points, source/target order, arrow policy, styles, physical port metadata and canonical relation data are unchanged. Straight and Bezier modes retain their respective path treatment.
- Only endpoints admitted by the existing viewport-visibility owner share the lane budget. Hidden rows cannot crowd visible lanes; clipping/continuations still use their original rendering owner. Visible and hit paths share exactly the same new path. Connection labels use their individual lane midpoint.
- Isolated and diagonal connections, cross-links, other views and generic Facets keep existing routing. No node positioning, grouping, card size, camera, index, compiler, note or settings logic changed.
- Final production build, Obsidian lint and architecture/numeric-control checks passed on Node 22.22.2. Broad targeted run: 142/142 passed. The final parent/child gate-direction browser subset passed 2/2, checking both top and bottom departure gates.
- New regression coverage checks deterministic lanes under input reversal, exact original gate endpoints and reverse-direction ownership, unchanged nodes/roles/ports, hit-path equality, actual SVG-path samples outside visible card bodies, unchanged camera, viewport scrolling and no hidden-row routes or new semantic acquisition. Existing shared interaction, canvas, history and settings checks remain covered.
- Before/after PNGs use synthetic notes and identical card geometry. The baseline renders the unchanged production fallback curve; the after image uses the actual new router. They are browser previews, not native vault screenshots.
- Logs, previews, three-file build and deployment receipt: `/Users/dumo/Downloads/dumodal-Codex/2026-11-02-kplex-separated-connections/`.
- No full indexing/storage aggregate was rerun for this geometry-only scope. The transpiled indexing fixture inventory includes the new helper module. Native reload remains separate from artifact installation.

## 2026-11-02: situated attention with an invisible frame center

The user requested that the current note occupy its own classified five-phase position, retain its larger card and existing category outline, and leave the geometric center unmarked. The camera must continue to use that invisible center. This expresses the current note as a participant in the relationship chain. This is a deliberate change to the earlier fixed-center layout, isolated on `test/0.4.0-focus-in-phase` from baseline `ff5f352`.

- The registered personal Wu Xing projection assigns the existing attention occurrence to its proven phase. Entry, editor, canonical identity, semantic endpoints/ports, link evidence, history and note metadata are unchanged. Current attention is admitted once, sorted before other phase members and included once in its phase count. Generic Facets retains its original center and Diagnostics. Unsupported/unclassified current files keep the visible recovery position; no phase is invented.
- Measured area packing owns the complete attention/card/editor rectangle. Circular framing reserves a compact virtual envelope at the world origin independently of the situated title or editor size. The camera and optional guide legend use that invisible origin; current-note navigation does not recenter on the phase card. Explicit editor maximization retains its established temporary camera and restore behavior.
- Attention keeps one top-level React paint slot through phase/preset changes and metadata availability transitions. Its coordinates follow the same shared area scroll projection; a world-space CSS rect clips the card and gates to that area's viewport. A narrow stacking rule keeps its actual body/drop target interactive above the scroll surface. Automatic and bound native editors borrow the same rendered location/aperture, keeping their established document owner.
- One-shot shared row reveal makes newly situated attention visible after navigation, classification or opening its editor. Ordinary updates and later manual scrolling do not pull it back. Hidden attention stays mounted and clipped; existing endpoint visibility suppresses floating routes from fully hidden rows.
- The preceding side-lane router now accepts columns reached from situated attention, including its own phase. Distinct x columns retain separate groups. Separated lanes may leave a shared area's aperture to pass beside cards; the existing endpoint-visibility proof still applies before any route paints. Canonical gate points, directions and hit/visible geometry remain shared.
- All code changes stay in view projection/layout and UI presentation. No indexing, source acquisition, graph compiler, ontology, persistent schema or note metadata owner was changed. No new preference or user-facing copy was introduced. Appearance controls, guide toggle, node gates and Past notes remain available.
- Validation uses Node 22.22.2. The focused command inventory is `node --test --test-concurrency=1 tests/viewport-fit.test.mjs tests/facets-presets.test.mjs tests/wuxing-browser.test.mjs tests/editor-area-growth.test.mjs tests/view-interactions-browser.test.mjs tests/facets-manager-browser.test.mjs tests/center-recovery.test.mjs tests/plex-footprints-ui.test.mjs`. Production `npm run build`, `npm run lint:obsidian`, `npm run check:architecture` and `npm run check:core` are also required. The full indexing/storage aggregate is intentionally omitted under the repository's presentation-scope risk policy.
- Earlier regression expectations that required the personal current card to remain at zero were deliberately updated to assert phase containment and a fixed invisible camera origin. Generic view framing, DOM identity, actual native body boundaries, semantic data, source-work assertions and manual-camera ownership remain enforced. New coverage checks all five phase destinations, large automatic and bound attention editors, exact one-occurrence identity, scrolling and return-to-phase reveal, same-phase lanes, badge subtree retention, guide legend position, and ordinary publication stability.
- Three PNGs use synthetic notes with production camera/layout: `focus-in-earth-guide.png`, `focus-in-earth.png` and `focus-in-water.png`. They are browser previews, not screenshots of the user's native vault. Logs, previews, artifact hashes, install backup and receipt belong in `/Users/dumo/Downloads/dumodal-Codex/2026-11-02-kplex-focus-in-phase/`.
- Native CLI connection remains unavailable: the installed Obsidian CLI reports that it cannot find the application. This does not establish whether the user's application is running. No application was closed or restarted. Native reload and observation of typing/camera behavior remain explicit manual acceptance.
- Final evidence: focused regression 166/166 passed; portable core 132/132 passed; production build, Obsidian lint and architecture/numeric-control checks passed (236 migrated roots, 430 reachable files, zero boundary violations). `git diff --check` passed. These results do not claim a full indexing/storage aggregate or native-app acceptance.
