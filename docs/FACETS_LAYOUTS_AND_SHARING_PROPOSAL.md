# Draft specification: Facets layouts and portable Facets/Lens presets

Status: **specification only**. This branch deliberately contains no feature code or validation claim.
Target: K-Plex built-in Facets view and shared lens/settings components.
Related: [#220](https://github.com/zsviczian/kplex/pull/220), [#135](https://github.com/zsviczian/kplex/issues/135), [Nick Milo's Maps of the Ideaverse](https://github.com/nickmilo/ideaverse-maps).
Initial accepted baseline: main at 26623c8393bddc0c3bcac39468078ec20ceccbc8 on 2026-10-25.

## 0. Mandatory start: update from latest main BEFORE implementation

1. Inspect the current remote **main**, #220, related issues/PRs and this draft PR. Do not implement against the initial baseline documented here.
2. #220 defines Facets and its canvas-view API; **wait until #220 has been accepted and merged into main**. Do not copy its moving branch into this work branch or invent replacement contracts.
3. Once merged, normally integrate the latest accepted main into this existing remote branch (merge/reconcile, no force-push). Confirm the new base, branch head and actual relevant code are readable remotely. Reread AGENTS.md, CONTRIBUTING.md, docs/ARCHITECTURE.md, docs/CANVAS_VIEW_API.md, docs/CANVAS_VIEW_DEVELOPER_GUIDE.md, docs/FACETS.md and actual source/tests at that revision. Adjust paths and this proposal to accepted code rather than treating provisional names as APIs.
4. Check for new overlapping PRs and accepted user decisions before edits. Update main again immediately before final verification and PR handoff. Remain on this branch; never write main directly.
5. Record the dependency/accepted starting SHA in this PR before coding. If #220 is not yet accepted, stop at preparation; there is no need to add speculative feature code.

The implementation agent should use repository-prescribed mixed-agent, build, scanner and native testing procedures. This draft authorizes design/implementation **on its branch after the prerequisite**, not merging, release, force-push, or personal-vault deployment.

## 1. Product intent and boundaries

Facets remains a **local, attention-centered K-Plex graph**, with the focused note and at most a bounded few hundred interactive neighboring notes. Preserve native ThoughtNode, editor, Sidecar, canonical relationships, evidence, lenses, keyboard/search/history/pins/F4, drag/drop and modifier conventions.

Classification decides a note's category; the layout decides where the category appears; decorative guides illustrate workflow; lenses decide visibility. None of the new layouts or guide arrows redefines semantic relationships.

No all-vault Ideaverse clone, Idea Emergence score or level index, 3D rendering, compact 14,000-point renderer, force simulation, independent parser/indexer, or additional note-writing engine.

Do not enlarge the fixed Facets 3–7 category limit, scene budgets or native-editor count merely to support a layout. Keep the existing property/rule evaluator and per-canvas view state owners.

## 2. Layout choices and Views and lenses controls

Add a **Layout dropdown** next to the existing Facets Preset dropdown in the **Views and lenses** panel. Use exactly the same shared native select/choice style and captured canvas actions as the existing Facets preset selector; no radio-list or private toolbar.

Expose the same layout options through Facets preset editing and, where useful, the shared bottom-left layout controls. Distinguish a preset's saved default layout from a per-canvas selection/override so two Facets canvases can show the same preset using different layouts. One change must not overwrite a different canvas's camera, focus, settings, lens draft, or preferences.

Initially support:

- **Circular:** current Facets arrangement, center focus with ordered category areas around it; preserve existing default visuals and Wu Xing generation/regulation guides.
- **Concentric rectangles:** **nested rounded-rectangle outlines/bands** around a centered focus, as in the maintainer's supplied image: center, then distinct enclosed category bands from inside to outside (or reversed by configurable ordering). This is the preferred first Gravity-inspired form. Exact circular rings are optional, not a prerequisite.
- **Vertical stack:** category regions in a sequence bottom-to-top or top-to-bottom.
- **Horizontal spread:** category regions in a sequence left-to-right or right-to-left.
- **Quadrants:** a four-category 2x2 arrangement, especially suited to local Sensemaking. Clearly disable or provide a documented fallback for non-four-category presets; do not silently drop categories.

Order is by stable category identity, never by mutable translated label. Circular and concentric layouts always place the focused node at the logical center. All layouts retain exactly one focused note; never duplicate it into a category.

### Focused node anchor in linear layouts

For vertical and horizontal layouts, configure the focused node's placement independently from category order. At minimum permit: **top-center, bottom-center, left-center, right-center**, with a deterministic sensible default for each orientation. An explicit centered/interposed anchor may be supported only when it can avoid ambiguous category membership, collision and editor interactions.

Focus placement is a pure presentation choice and must never reroot/reclassify the note. Preserve expanded editor measurements, gates, crosslinks, native edit/dirty protection, camera fitting, Find and keyboard selection. Show a clear schematic preview for the selected anchor in Settings.

### True concentric geometry

Nested rectangles represent **non-overlapping bands**, not several fully overlapping rectangular hit targets. The inner rounded frame encloses the focus; each following frame adds a band in which its own category's notes live.

Define accurate category occupancy, hit testing, drop targets and accessible navigation for the annular rectangular bands. Investigate the smallest shared area/shape extension needed; a false rectangular hitbox that makes an outer category intercept a drop into an inner category is unacceptable.

Retain distinct areas, scroll/overflow behavior, readable labels, configured colors and real ThoughtNode geometry. Dense categories may require growth and fit; bounded fallback/overflow must be explicit. Decorative outlines and unused band interiors are not semantic edge targets. Do not implement a separate Facets card system or DOM-based interaction bypass.

### Variable area width and automatic multiple columns

**Facets areas must be individually resizable in width as well as height.** Currently #220 has a shared height preference/vertical resize control, a general preset region-width default, and one column in its measured Facets area packer. Build on those owners, rather than solving this through a new renderer or an unrelated global card-size preference.

- Preserve a configurable **preset default area width** and support optional stable per-category/diagnostic-area width defaults, with bounded **per-canvas, per-preset, per-area width overrides** analogous to existing area heights. The UI must let users set an exact width in settings and **drag an area side edge to resize its width**, just as they drag the top/bottom edge to change height. Offer a keyboard-accessible input/adjustment path and touch-appropriate handle.
- Extend the existing shared area contract to support an **independent horizontal resize capability alongside vertical resize**, e.g. an optional width preference plus side-edge/handle declaration. Do not repurpose a single height-only `resizeEdge` field so that users must choose between width and height. Existing Compass/Mind Map behavior remains unchanged unless they explicitly opt into width resizing.
- **Determine the number of node columns automatically from the area's usable world-space width and actual measured node widths, padding and gaps** (one column when only one fits, multiple when safely possible). Users primarily control density by resizing width; no separate manual Columns count is required for the first implementation. The layout must reflow after width changes and as needed when card measurements/fonts/editor dimensions change, without relying on DOM inspection or triggering semantic source work.
- Columns must be deterministic and visually balanced; prevent card overlap, clipping/zero-width columns, text truncation beyond existing node rules, scroll-height errors and misleading empty regions. Reflow is presentation only: keep stable canonical occurrences, relation endpoints, node edit/hover/selection/drop identity and current scroll/camera intent.
- Recompute adjacent category positions, flow-guide routes, measured fit bounds and diagnostic dock placement from **individual actual area dimensions**. Do not assume every area has the same width or that the widest card in an unrelated category determines all category widths.
- Handle circular, linear and quadrant layouts through the normal measured shared area owner. **Concentric rectangular bands** need a clearly documented concept of usable band width/thickness and nonoverlapping inner/outer drop geometry; adapt width/resizing meaning to those shapes rather than showing a misleading rectangular grip or allowing the outer band to intercept an inner drop.
- Existing area height overrides and width overrides must survive compatible layout toggles. Constrain sizes with documented min/max values and prevent panel overlap or viewport runaway. World-space column counts must not churn with camera-only zoom/pan.

Preserve shared `ThoughtNode` and `measuredAreaGrid`/reflow where applicable; extend shared resize/measurement components narrowly. Avoid a view-local area geometry or pointer controller.

## 3. Configurable visual flow between categories

Introduce bounded **declarative guide definitions** on linear layouts (and reuse the same mechanism wherever appropriate) rather than creating semantic graph edges. Allow a preset-level default plus per-adjacent-category overrides using stable source/target category IDs.

- Flow direction: forward, backward or bidirectional relative to the ordered category sequence.
- Stroke/arrow style: directional arrow(s), plain line with no arrowheads, or neither line nor arrow.
- Custom caption text, including empty, with **start / middle / end** placement on the visual connection.
- Respect vertical/horizontal orientation and reversed order: arrows must point geometrically up/down/left/right as configured, not assume a fixed screen direction. Support theme-friendly colors and readable caption backgrounds as appropriate.
- Guide visibility and caption are presentation only; never mutate graph relationships or claim causal evidence. These guides do not receive node/relationship context actions, keyboard link identity, drag-authority, or canonical relationship IDs.

Reuse the shared PlexDecoration guide renderer, color owner and layout measurement/bounds. Check label collisions, long captions, touch targets and RTL/localization where relevant. Preserve actual semantic connectors/crosslinks independently of guide arrows.

## 4. Configurable diagnostics: one combined area by default

Facets distinguishes **Unassigned, Conflicting, Checking… and Cannot classify**. Preserve all four distinct classification results and their current truthfulness, including under negated rules or incomplete metadata.

**Default: Combine diagnostics — ON.** Instead of three or four separately framed areas, display **one combined Diagnostics area** containing all diagnostic notes. This is the preferred, cleaner default for new and migrated/current presets unless an explicit setting says otherwise.

- Give **each diagnostic note a small, readable, colored or neutral status chip attached to its own node edge**, e.g. Unassigned, Conflicting, Checking… or Cannot classify. Reuse/extend the **shared node badge/decoration primitive** from #220, with accurate measured bounds, accessibility name/description, collision avoidance with gate/resize/editor controls, and actual status semantics. The chip must be identifiable without depending on color alone.
- Match Unassigned and Conflicting status colors to the preset's configurable diagnostic palette; use clear neutral/informational treatment for Checking/Cannot classify. Explain Cannot classify through the existing availability/reason description, not by inventing a category or choosing a phase. Do not lose reason detail or the node's other accessible labels.
- Each note appears **once** in this combined region. The region's single header/count reflects the total **distinct** diagnostic notes; optional per-status counts, small filters or indicators can help discovery without dividing it into multiple areas. Keep category-specific lens rules and canonical relationship evidence unchanged. Combined status notes remain searchable, navigable, draggable out to **real writable category** targets when eligible, and inspectable via all shared node behaviors.
- A combined Diagnostics area **has no implicit property assignment or property-clearing drop target**: dropping anywhere in an undifferentiated combined area must not mean Unassigned or Conflicting. Preserve explicit **Assign category** and safe **Clear/Unassign category** actions through their existing shared action owner. In separate mode, a specifically labeled Unassigned target may retain #220's safe clearing semantics.
- Do not make the existing shared central-node badge conflict with the per-node diagnostic chip. **#220's current badge admission has a small count cap** and was designed mainly for the focused node; inspect and extend it safely for a potentially populated diagnostics area rather than silently dropping chips or globally removing admission/cost limits. Keep rendering, measurement and visibility bounded by the admitted scene; use shared UI components, not custom duplicated note cards.

Offer the checkbox **Combine diagnostics** in the bottom-left **Configure Canvas Layout** panel, alongside the existing shared layout controls (conceptually like Compass's Simplified view checkbox). Also offer the same setting in the Facets preset manager.

- **Preset-level default:** combined = true. **Per-canvas choice:** a live, restorable override using the accepted session state owner, so changing one canvas need not change another. Editing the preset default is an intentional settings save and must not silently reset per-canvas session choices. Use the existing settings/choice/controller mechanics, not duplicate React/local storage.
- Turning it off returns to **Separate diagnostic areas**, retaining Unassigned/Conflicting/Checking/Cannot classify as their own individually labeled regions. Switching between modes must not reclassify files, reset the focused note, lose lens/filter drafts, or destroy existing area-size preferences.
- When separate mode is active, the *arrangement* setting controls the order of diagnostic areas. In combined mode, there is only one area: hide or disable the irrelevant inter-area arrangement option. Its node columns still reflow automatically with the combined area's width.

In **both** modes, support a configurable diagnostics dock:
- **Side:** top, right, bottom or left (default right).
- **Area arrangement (separate mode):** vertical or horizontal (default vertical).
- Stable status order and optional collapse/hiding of empty diagnostic sections; never hide populated unknown/error statuses without a discoverable indicator.
- **Both width and height** via the same shared area resize/setting controls described in section 2. The combined dock has its **own stable area ID** and width/height overrides; distinct separate status areas retain their own size IDs. Toggle modes without colliding or discarding saved dimensions.
- Locate the dock outside the **measured** category/focus/guide footprint and recompute collisions, hit regions, scroll/overflow and camera fit when the dock is moved/resized or category layout changes.

Checking is transient; Cannot classify is a persistent unavailable/unsupported result. Neither may be presented as definitely Unassigned. Conflicting cannot be assigned as a property value. All placement and display changes are presentation-only; the explicit property writer remains the sole authority for metadata edits.

## 5. Curated initial presets and examples

**ARC** is the correct user-facing terminology for Nick Milo's model. As Facets/ACE has not yet been released, **replace the supplied ACE preset with one ARC preset**, instead of shipping both duplicates or building elaborate compatibility layers solely for the unreleased label. Use user-facing stages **Add, Relate, Communicate**. People may still freely rename the categories. Preserve explicitly customized existing drafts where the accepted settings/writer requires doing so; honor stable IDs only where there is genuinely saved data to protect.

Curated, locally useful examples:
- **ARC**: three-stage horizontal flow with editable guide arrows/captions, local property/rule mapping and explicit documentation that it is an adaptation of Nick's method, not Nick's complete implementation.
- **Sensemaking**: four quadrants Synthesizer (reflection/top-down), Producer (expression/top-down), Inner Guide (reflection/bottom-up), Creative (expression/bottom-up), using **available local properties/rules**. Do not reproduce Nick's whole-vault weighted feature analysis, claim AI classification or infer unsupported prose features. Explain conditions and allow authoring/override.
- **State / Publishing pipeline**: Seed → Research → Draft → Review → Published as a vertical or horizontal demonstration, using a configurable metadata property; no automatic changes to users' files.
- **Local map roles**: optional example for concentric rectangles (e.g. major maps, supporting maps, concepts, references), using explicit user-configured facts, not fabricated Idea Emergence scores.

Retain PARA, GTD, Wu Xing and eACCESS as applicable. A Gravity-like preset is a **layout configuration** over selected category rules, not a separate semantic classifier.

Do not add an Emergence Level 1–5 model or threshold arithmetic to the indexer. An immediately linked peripheral note is, by definition, not a globally unlinked note; never misrepresent local categories as Nick's full corpus-wide levels.

## 6. Portable Facets AND lens configurations

Implement **versioned, data-only JSON import/export** through the existing Facets preset manager and the existing lens management UI. This is the Facets/lens-specific delivery of part of [#135](https://github.com/zsviczian/kplex/issues/135), not a whole-plugin settings importer or a general marketplace.

Facets UI actions:
- **Export preset…** exports the full selected Facets configuration: category IDs/order/names, aliases, source/property or rules, explicit writable assignment values, colors, layout and focus anchor, per-area default widths/heights and automatic column rules, flow guide definitions/captions, combined-versus-separate diagnostic mode (combined default), dock side/orientation and status-badge policies, and supported display defaults.
- **Import preset…** validates and previews the exact changes, asks to import as new or replace a specific existing preset, then commits through the existing queued settings writer.
- **Copy AI authoring prompt** supplies a detailed, accurate instruction for an AI assistant to generate a compatible preset (rules grammar, category limits, color references, layout and focused-node anchor choices, automatic width-driven multi-column rules, combined diagnostic badges, diagnostic dock policies, safe assignments, examples, current specification/docs links).

**The exported Facets JSON must include the detailed AI authoring context as a documentation-only section**, including schema/compatibility version, portable prompt, rule examples, links to the actual repository's Facets/API/authoring guides, and interpretation of layout/arrow fields. Exports should remain self-contained enough for an offline assistant. On import, AI context is inert text, never evaluated or persisted as live rule/settings state.

**Lens manager:** provide comparable Import lens / Export lens / Copy AI lens prompt actions with the existing lens definitions, predicate grammar, styles/visibility rules and source ownership. Use a common outer envelope and import preview/validation primitives where practical, with separate typed payloads for Facets presets and lenses. Allow explicitly chosen lens dependencies to accompany a Facets package, but never silently export every active lens, private rule or unrelated setting.

Publish the documented schema or a machine-validated schema generator for both kinds, plus examples and an AI-authoring skill/instructions grounded in the implemented validator. The GUI, future CLI API and AI tooling must eventually use **one canonical import/export validator**, avoiding a separate AI configuration store. CLI commands themselves are follow-up scope.

### Safety and compatibility

- Bound format versions, strings, nesting, category counts and total file size; reject prototype keys, unknown executable payloads, malformed links, invalid colors and unsupported rules safely.
- Export no vault paths, personal note contents, history/pins, secrets, device-specific preferences, private source state, remote-content permission or unapproved automation by default.
- Import does **not** edit note YAML or relationships, activate a lens silently, change ontology/indexing policy, or perform any code/network execution.
- Preview category/color/rule changes, name/ID collisions and optional referenced palette/lens dependencies. Preserve unrelated installed presets and lenses. Cancel and failed writes must leave old state intact.
- Respect supported theme color tokens and safe portability of explicitly selected custom colors. Device/pane-specific layout override data must not be silently imported as another device's preferences.
- Preserve unknown future-format packages for diagnostics or refusal; do not destructively migrate an unsupported version.

## 7. Reuse and ownership

Actual source to inspect on accepted main (currently in #220, **not on initial main**):
- src/core/plex/views/facets/{contracts,templates,validation,configuration,projection,layout,rules}.ts
- src/ui/plexViews/facets/{FacetPresetManager,FacetPresetEditor}.ts or their accepted equivalents
- src/core/plex/views/{contracts,configuration,dropTargets}.ts
- src/ui/plexViews/{settingsContributions,CanvasViewContributionController,CanvasViewLayoutControls}.tsx/ts
- src/core/plex/{predicate,predicateParser,lens}.ts
- src/ui/PlexGraph.tsx, src/ui/ThoughtNode.tsx and existing area/camera/native editor components.

New layouts must be pure, measured projection/layout strategies. Keep the accepted index, native editor, ActionManager, drag transport, relation writer, settings queue and palette/style system. Extract/reuse a **shared** configuration manager, schema validation, common choice controls, node-attached status chip, width/height resize controls, automatic measured multi-column packing, guide caption and layout-preview components where useful. Avoid cloning the lens condition editor, StyleColorControls, StyleManagerList, native node/card components, or settings framework.

All new localized UI labels must use the existing eight catalogs. Preserve native keyboard, screen-reader, modifier/touch and popout behavior.

## 8. Acceptance and testing

1. All five layout modes work with 3–7 categories where supported, including empty/dense categories, long titles, expanded native editor, filtering and grouping; the quadrants constraint is explicit. All normal category areas support width/height configuration and auto multi-column packing from actual usable width; verify 1/2/3+ columns, variable card widths, row/scroll height, stable fitting and layout-specific geometry.
2. Concentric rectangles have disjoint physical band hit tests; category drops never land in the wrong nested band; supported band-thickness/width changes, height, scroll/zoom/fit preserve focus/editor and cannot falsely capture interior drops.
3. Linear layouts support each cardinal focused-node anchor; changing it never duplicates focus, loses editor bindings, changes relationships, or rewrites metadata.
4. Guide direction and captions work with both axis orientations, reverse order, all arrow/no-line combinations and start/middle/end caption positions. Decorative marks never become editable graph links.
5. **Combined Diagnostics is the default** and shows each distinct diagnostic note once with a correctly measured, legible, accessible edge status chip; status colors/reasons/counts stay accurate. Bottom-left **Combine diagnostics** checkbox, separate-mode fallback, all dock sides, vertical/horizontal separate arrangement, width-driven diagnostic columns and independent per-canvas/preset area width+height overrides all work. Changing modes preserves old size preferences and shared note actions; the combined dock never silently clears a property on drop. Unavailable metadata remains unavailable.
6. ARC and Sensemaking presets ship with documented, editable classification; existing Wu Xing relative roles and both cycles, PARA, GTD and eACCESS regressions are preserved.
7. Portable Facets and lens JSON export/import round-trip identically, including combined diagnostic defaults, side/orientation, per-area width/height defaults and column behavior; importing two independent presets does not overwrite the other, unknown/future/invalid JSON fails safely, and AI prompt text is inert.
8. Two canvases with different layouts/presets/lenses remain independent; F4, pins, history, Find, Sidecar, modifiers and text editor drops retain their shared behavior.
9. Layout choice, diagnostic combine/split, area width drag and resulting column reflow, hover, navigation, filtering, opening manager and JSON preview cause zero new note-body reads, source acquisition, whole-vault scans or semantic rebuilding.
10. Documentation, end-user presets guide and type-checked shareable examples match the shipped behavior; include authentic native screenshots and a bounded fixture.

Run Node 22.22.2, npm run verify, real production build, Obsidian scanner, focused Chromium and applicable exact-build native checks in authorized disposable vault(s). Report exact commands, passes/failures, unperformed checks and up to three priority manual tests. Preserve test resources; no personal-vault deployment.

## 9. Explicitly out of scope

- The new shared link metrics and Bases-backed lens filters (separate follow-up PR).
- A generic whole-vault Atlas/Ideaverse map, 3D visualization or live force renderer.
- User-facing universal idea-importance scores, Idea Emergence indexer formulas, prose-based AI scoring.
- CLI implementation, external script execution, automatic AI network calls, extension marketplace.
- Any graph ontology rewrite caused by changing layout or importing a preset.

At final handoff, confirm main/head revision; keep PR open/unmerged for maintainer review. Comments identify the author as **Zsolt's Codex Agent**.
