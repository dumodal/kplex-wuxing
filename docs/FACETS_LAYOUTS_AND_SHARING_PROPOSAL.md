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

## 3. Configurable visual flow between categories

Introduce bounded **declarative guide definitions** on linear layouts (and reuse the same mechanism wherever appropriate) rather than creating semantic graph edges. Allow a preset-level default plus per-adjacent-category overrides using stable source/target category IDs.

- Flow direction: forward, backward or bidirectional relative to the ordered category sequence.
- Stroke/arrow style: directional arrow(s), plain line with no arrowheads, or neither line nor arrow.
- Custom caption text, including empty, with **start / middle / end** placement on the visual connection.
- Respect vertical/horizontal orientation and reversed order: arrows must point geometrically up/down/left/right as configured, not assume a fixed screen direction. Support theme-friendly colors and readable caption backgrounds as appropriate.
- Guide visibility and caption are presentation only; never mutate graph relationships or claim causal evidence. These guides do not receive node/relationship context actions, keyboard link identity, drag-authority, or canonical relationship IDs.

Reuse the shared PlexDecoration guide renderer, color owner and layout measurement/bounds. Check label collisions, long captions, touch targets and RTL/localization where relevant. Preserve actual semantic connectors/crosslinks independently of guide arrows.

## 4. Independent placement of diagnostic categories

Facets currently distinguishes **Unassigned, Conflicting, Checking… and Cannot classify**. Preserve those meanings and the current truthfulness of pending/missing metadata, including under negative predicate rules.

Provide a preset **diagnostics dock** (separate from regular categories):
- Side: **top, right, bottom or left**; default right.
- Arrangement: **vertical or horizontal**; default vertical.
- Stable ordering and optional collapse/visibility of empty diagnostic regions, while keeping populated statuses discoverable and keyboard-accessible.
- Meaningful fixed-size/resize controls via the existing area capability/settings owner. Scrolling, zoom/fit, occupancy and drop handling remain reliable.
- Position outside the measured regular category/focus footprint so it cannot cover a concentric band or flow connector.

Checking is transient; Cannot classify is a persistent unavailable/unsupported result. Never treat either as definitely Unassigned. Conflicting cannot be written as a property value. Unassigned keeps #220's explicitly safe property-clearing action. Diagnostics positioning does not rewrite notes or change membership.

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
- **Export preset…** exports the full selected Facets configuration: category IDs/order/names, aliases, source/property or rules, explicit writable assignment values, colors, layout and focus anchor, flow guide definitions/captions, diagnostic dock preferences, and supported display defaults.
- **Import preset…** validates and previews the exact changes, asks to import as new or replace a specific existing preset, then commits through the existing queued settings writer.
- **Copy AI authoring prompt** supplies a detailed, accurate instruction for an AI assistant to generate a compatible preset (rules grammar, category limits, color references, layout semantics, diagnostic policies, safe assignments, examples, current specification/docs links).

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

New layouts must be pure, measured projection/layout strategies. Keep the accepted index, native editor, ActionManager, drag transport, relation writer, settings queue and palette/style system. Extract/reuse a **shared** configuration manager, schema validation, common choice controls, guide caption and layout-preview components where useful. Avoid cloning the lens condition editor, StyleColorControls, StyleManagerList, or settings framework.

All new localized UI labels must use the existing eight catalogs. Preserve native keyboard, screen-reader, modifier/touch and popout behavior.

## 8. Acceptance and testing

1. All five layout modes work with 3–7 categories where supported, including empty/dense categories, long titles, expanded native editor, filtering and grouping; the quadrants constraint is explicit.
2. Concentric rectangles have disjoint physical band hit tests; category drops never land in the wrong nested band; resizing and scroll/zoom/fit preserve focus/editor.
3. Linear layouts support each cardinal focused-node anchor; changing it never duplicates focus, loses editor bindings, changes relationships, or rewrites metadata.
4. Guide direction and captions work with both axis orientations, reverse order, all arrow/no-line combinations and start/middle/end caption positions. Decorative marks never become editable graph links.
5. Diagnostics side/orientation/ordering/availability and per-canvas area overrides are correct in every layout. Unavailable metadata remains unavailable.
6. ARC and Sensemaking presets ship with documented, editable classification; existing Wu Xing relative roles and both cycles, PARA, GTD and eACCESS regressions are preserved.
7. Portable Facets and lens JSON export/import round-trip identically; importing two independent presets does not overwrite the other, unknown/future/invalid JSON fails safely, and AI prompt text is inert.
8. Two canvases with different layouts/presets/lenses remain independent; F4, pins, history, Find, Sidecar, modifiers and text editor drops retain their shared behavior.
9. Layout choice, hover, navigation, filtering, opening manager and JSON preview cause zero new note-body reads, source acquisition, whole-vault scans or semantic rebuilding.
10. Documentation, end-user presets guide and type-checked shareable examples match the shipped behavior; include authentic native screenshots and a bounded fixture.

Run Node 22.22.2, npm run verify, real production build, Obsidian scanner, focused Chromium and applicable exact-build native checks in authorized disposable vault(s). Report exact commands, passes/failures, unperformed checks and up to three priority manual tests. Preserve test resources; no personal-vault deployment.

## 9. Explicitly out of scope

- The new shared link metrics and Bases-backed lens filters (separate follow-up PR).
- A generic whole-vault Atlas/Ideaverse map, 3D visualization or live force renderer.
- User-facing universal idea-importance scores, Idea Emergence indexer formulas, prose-based AI scoring.
- CLI implementation, external script execution, automatic AI network calls, extension marketplace.
- Any graph ontology rewrite caused by changing layout or importing a preset.

At final handoff, confirm main/head revision; keep PR open/unmerged for maintainer review. Comments identify the author as **Zsolt's Codex Agent**.
