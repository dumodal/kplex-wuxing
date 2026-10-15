# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# PR #158 — Obsidian-native styling, semantic colors and Idea Compass sectors

Prepared by **Zsolt's Codex Agent**, 2026-10-15. **Design/implementation assignment only: no runtime feature has been implemented or validated in this preparation.**

## 1. Assignment, baseline and scope

Continue [draft PR #158](https://github.com/zsviczian/kplex/pull/158) on `2026-10-14-issue-155-theme-palette`. Include [#155, theme-adaptive interface and shadows](https://github.com/zsviczian/kplex/issues/155), and now [#90, directional backgrounds](https://github.com/zsviczian/kplex/issues/90), under the maintainer's explicit 2026-10-15 scope expansion. Leave both issues open until implementation and acceptance. Do not edit the reporter-owned #155 body.

- Original accepted base: `df5335808aacfd6a11ac7ff4ef008f9406f27893`.
- Reviewed branch head before this documentation update: `87d48304e1dfc5cc510d9087b9283f1c92b565d0`. Its only change was the temporary issue-155 marker, not runtime implementation.
- Main reviewed: `8df393a44272e4d6a5d2b403447ef0f3c81ae527`, 30 commits beyond the original base. The comparison shows no changes to the styling, settings, camera or motion owners cited below; indexing internals and test infrastructure have advanced.
- Before implementation, integrate current main through the maintainer's normal workflow and record the resulting base/head. Main removed the previous completed `HANDOFF.md`; resolve the resulting modify/delete conflict deliberately by keeping this active assignment, not resurrecting the old scanner-validation return. This preparation does not merge/rebase anything.
- Recheck related active work: #154 reciprocal ontology/link-style lookup, #147 settings/input persistence, #149 rendering/sharpness. Do not assume they merged or duplicate their implementations.

This replaces the earlier PR exclusion of #90. It also supersedes #90's tentative scroll-container rectangles and hide-with-container behavior: implement **four viewport-wide compass sectors**, not colored scroll panels. Retain #90's optional, **off-by-default** setting unless the maintainer explicitly changes that choice. Exact hues/intensity below are proposed defaults for visual validation, not already accepted screenshots.

Keep #135 shareable presets outside scope. No new layout mode, ontology/classification change, index optimization, global CSS inversion, independent light/dark switch, or C15–C26 refactor. The palette remains a set of reusable colors, not a second system of complete node styles.

## 2. Product requirements

A fresh installation must look like part of the user's Obsidian theme without configuring individual colors. This includes the canvas, standard nodes and all kinds, gates, connectors, labels, outline/expanded nodes, controls, toolbar, search, pins/history, dialogs, shadows and detached/portalled surfaces. Merely replacing the toolbar's blue background does not meet the requirement.

Use Obsidian's effective `.theme-light` / `.theme-dark` and CSS variables. The canvas follows the documented Canvas background variable where available, with the normal document background as fallback. Theme/snippet changes propagate while views stay open. Do not use OS `prefers-color-scheme` as a separate authority.

Retain three independent layers: **native interface**, **Plex presentation tokens**, and **semantic style assignments**. K-Plex variables provide a small documented override contract; their defaults delegate to appropriate Obsidian variables. A theme need not know K-Plex to produce coherent defaults. Theme-specific selectors targeting only another plugin's DOM are not guaranteed to apply; do not impersonate Canvas/File Explorer classes or scrape their stylesheets.

Existing custom fixed colors remain fixed, including imported colors and alpha. Provide an explicit, previewed adoption of theme defaults for standard graph styles. Images and native Markdown/Canvas/Excalidraw/Sidecar content keep their own rendering. Never recolor them through a parent filter, blend mode or opacity applied to the whole scene.

Directional tint is a subtle orientation aid centered on the focused note. Two implied diagonal boundaries divide the visible graph background into north/parent, south/child, west/friend and east/challenger sectors. Extend each sector to the viewport edge; no filled scroll rectangles, visible diagonal strokes, extra rays, glow or decorative animation. The shared apex follows the **rendered central node**, including pan, zoom and its arrival motion.

## 3. Initial design review: implementation traps

All source links in this section are pinned to the reviewed branch head, not assumed future APIs.

| Finding | Evidence and implementation consequence |
| --- | --- |
| CSS-only theming is insufficient | [styles.css, lines 1–235](https://github.com/zsviczian/kplex/blob/87d48304e1dfc5cc510d9087b9283f1c92b565d0/styles.css#L1-L235) sets dark interface tokens, gradients and shadows. [settings.ts, defaults](https://github.com/zsviczian/kplex/blob/87d48304e1dfc5cc510d9087b9283f1c92b565d0/src/settings.ts#L48-L85) and [standard styles](https://github.com/zsviczian/kplex/blob/87d48304e1dfc5cc510d9087b9283f1c92b565d0/src/settings.ts#L307-L378) supply literal white, blue, red and gold values. Change fresh defaults and rendering fallbacks together. |
| References can be lost by editors/sanitation | [GraphLens.ts](https://github.com/zsviczian/kplex/blob/87d48304e1dfc5cc510d9087b9283f1c92b565d0/src/lens/GraphLens.ts#L121-L163) admits hex strings only and creates an amber literal default. The original PR identified `sixHex`, `canonicalHex`, `nodeStyleColor` and native color drafts in settings.ts. Extend all boundaries together; a reference must survive unchanged Save and reload. |
| Existing precedence is intentional | [style.ts](https://github.com/zsviczian/kplex/blob/87d48304e1dfc5cc510d9087b9283f1c92b565d0/src/index/style.ts) layers kind/role/property/tag/ontology rules; folder/tag branches have their own order. Resolve color sources after selecting the winning field. Do not give theme/palette references a new precedence level. |
| Public-looking tokens may not be overridable | Public tokens currently redeclared on `.kplex-app` can mask inherited body values. Consume public overrides with native fallbacks rather than re-declaring defaults nearer the consumer. Test body, view-local and portal scopes. |
| Several rendering paths hard-code colors | [ThoughtNode.tsx](https://github.com/zsviczian/kplex/blob/87d48304e1dfc5cc510d9087b9283f1c92b565d0/src/ui/ThoughtNode.tsx#L94-L145) contains white hatch/gate/text fallbacks. [Edge](https://github.com/zsviczian/kplex/blob/87d48304e1dfc5cc510d9087b9283f1c92b565d0/src/ui/PlexGraph.tsx#L607-L716), [mini nodes/background picker](https://github.com/zsviczian/kplex/blob/87d48304e1dfc5cc510d9087b9283f1c92b565d0/src/ui/PlexGraph.tsx#L3810-L3980) and [label surfaces/markers](https://github.com/zsviczian/kplex/blob/87d48304e1dfc5cc510d9087b9283f1c92b565d0/src/ui/PlexGraph.tsx#L3990-L4130) also need coverage. Preserve section/native-content exceptions. |
| Camera coordinates are not the entire animation | [applyCamera/flushCameraTransform and the layout effect](https://github.com/zsviczian/kplex/blob/87d48304e1dfc5cc510d9087b9283f1c92b565d0/src/ui/PlexGraph.tsx#L1207-L1399) update a ref and coalesced transform, while [centerArrivalFrames](https://github.com/zsviczian/kplex/blob/87d48304e1dfc5cc510d9087b9283f1c92b565d0/src/ui/components/centerArrival.ts) animates the node separately. A camera-only apex jumps ahead of the incoming node. |
| Presentation-only is narrower than no indexing | [settingsPolicy.ts](https://github.com/zsviczian/kplex/blob/87d48304e1dfc5cc510d9087b9283f1c92b565d0/src/core/graph/settingsPolicy.ts#L10-L144) has a four-key style-manager exception. PlexGraph's scene memo also depends on the settings object. Palette/tint updates must not incidentally rebuild layout, reacquire sources or reset the camera. Extend existing owners narrowly. |
| A sector is not a layout container | Wide parent rows can extend across a diagonal; siblings occupy a separate peripheral region. Keep placement and drag eligibility unchanged. Tint illustrates compass orientation, not an exact membership mask or enlarged drop target. |

The canvas menu currently mutates `settings.backgroundColor` before `saveSettings(false)`. Bring that entry point into the same source-aware, durable queued edit contract as native style settings; do not leave an alternate picker that flattens references or overwrites a concurrent palette edit.

## 4. Obsidian token selection and cascade

The following is the recommended starting mapping, subject to actual light/dark/contrast tests. These K-Plex names are **proposed**, not existing APIs. All selectable color tokens contain complete CSS colors, not RGB channel tuples or shadow expressions.

| Surface or semantic slot | Native fallback and rationale |
| --- | --- |
| `--kplex-canvas-background` | `var(--canvas-background, var(--background-primary))`; Canvas where available, otherwise normal document surface. |
| Native shell / toolbar / history | `--background-secondary`, `--text-normal`, `--text-muted`, `--background-modifier-border`; no fixed blue gradient. |
| On-canvas controls | `--interactive-normal` / `--interactive-hover`, `--text-normal`, `--background-modifier-border`; focus `--interactive-accent`. Keep controls readable over custom backgrounds. |
| Standard note fill/text/border | `--background-primary`, `--text-normal`, `--background-modifier-border`. Start with readable neutral card surfaces rather than dark translucent defaults. |
| Central note | `--background-primary-alt` with primary fallback, normal text, accent border/focus treatment; preserve custom property/tag overrides and existing geometry. |
| Inferred note | Normal surface with `--text-muted`; retain existing inferred relationship line treatment. No fixed blue text. |
| Placeholder note | `--link-unresolved-color` with muted fallback, neutral surface, existing hatch distinction. Missing notes are not errors; remove the red factory fill. Do not import `--link-unresolved-filter` or reduce the whole node's opacity. |
| Folder note | `--nav-item-color` with normal-text fallback, neutral surface/border and folder icon. Do not assume folders are gold in every theme. |
| Tag note | `--tag-color`, `--tag-background`, `--tag-border-color`, with accent/neutral-border fallbacks. Test the transparent tag background over each sector. |
| URL / attachment | URL uses `--link-external-color` with link/accent fallback; attachments use ordinary note colors. Preserve globe/paperclip icons. |
| Gates | Muted stroke and filled-gate color, explicit transparent empty gates; retain filled/empty/count semantics and disabled states. |
| Ordinary / structural connectors | `--graph-line` with muted-text fallback. Folder/tag connector tokens can specialize to the corresponding native identity. Keep explicit ontology styles and inferred dashes. |
| Connector labels | Normal text over a dedicated `--kplex-link-label-background`, default primary surface; do not read the old literal canvas color for each label. |
| Hatches, outline and mini nodes | Reuse slot-appropriate text/surface/border tokens. Hatches use a faint/muted color with local alpha rather than hard-coded white. |
| Selection, attention and status | Native accent/focus tokens; actual errors/success use native error/success colors. Fresh style-lens highlight uses a theme token, not `#ffb300`; saved lens literals are preserved. |
| Shadows | Full `--shadow-s`-based expressions or restrained `none` where appropriate. Document these as shadow tokens, never selectable color values. |

Expose only useful K-Plex public tokens; do not create a setting for every CSS constant. Distinguish default style slots from component-private implementation variables. At a consumer, prefer patterns such as:

```css
/* Proposed cascade pattern; do not redeclare this public token on .kplex-app. */
.kplex-plex {
  background-color: var(--kplex-canvas-background,
    var(--canvas-background, var(--background-primary)));
}
```

Explicit field choices still flow through the existing style precedence and can use private generated CSS properties. A theme's `body.theme-light { --kplex-canvas-background: ... }` and a more local K-Plex override must both work. Keep compatible existing aliases where practical; do not fix conflicts with `!important`. Do not write global Obsidian variables.

Document which variables are read in which scope. A `--canvas-background` declared exclusively on a real Canvas descendant will not magically inherit into K-Plex; use the documented fallback or a K-Plex-specific theme override, not DOM impersonation. Native editors keep their normal selectors/styles. Theme changes affecting fonts can legitimately resize content; the zero-layout-work requirement below applies to **color-only** changes.

## 5. Shared semantic color capability and settings

### Built-in semantic choices

Offer a small built-in semantic token catalog usable by node, edge, lens and sector color selectors. Suggested aliases are **Origin** (`--kplex-semantic-origin` → `--color-purple`), **Development** (`--kplex-semantic-development` → `--color-green`), **Support** (`--kplex-semantic-support` → `--color-cyan`) and **Challenge / transformation** (`--kplex-semantic-challenge` → `--color-orange`). Use these as starting design choices, not claims that hues have universal meanings. In particular, challenger must not be styled as an error by default.

Factory selections remain live references to host-backed semantic tokens, not copied light/dark hex values. Expose four standard semantic-slot assignments through the same color-source editor so users can choose theme tokens, named colors or literals without writing CSS. Keep built-in defaults and user overrides distinct: resetting a slot restores its theme-backed fallback. These assignments must not introduce recursive semantic-token or palette references; reject direct/indirect self-reference, and keep the selectable built-in dependency graph finite and acyclic.

This catalog complements the original PR's **user-named paired palette**. It does not require a palette entry for every node type and does not automatically recolor every node/edge according to its compass direction.

### One portable color-source contract

Retain supported legacy fixed-color strings at their persistence boundary; introduce explicit references rather than accepting arbitrary CSS expressions. Illustrative names only:

```ts
type ColorValue =
  | string // Existing supported literal formats, validated at the boundary.
  | { kind: 'theme'; variable: string }
  | { kind: 'palette'; id: string };

type SemanticColor = {
  id: string;   // Stable identity, independent of editable/Unicode display name.
  name: string;
  light: string; // Validated literal color including alpha.
  dark: string;
};
```

Undefined remains inherit/default; transparent remains an explicit color. Initial user palette entries contain literal light/dark pairs only, with no palette-to-palette recursion or formulas. IDs must be bounded and safely mapped to private CSS identifiers; never interpolate user labels as selectors. Use one sanitizer/equality/copy owner, immutable references and detached drafts. Extend `NodeStyle`, `LinkStyle`, portable lens styles, lens sanitation, own-data load/save and native/React editors together.

Keep existing field selection/layering first, then resolve the winning ColorValue. A later style lens wins only the fields it supplies, regardless of whether an earlier field used a literal or a reference. Normal DOM/SVG should retain live CSS references; do not resolve every visible node to RGB on each render.

Theme choices include friendly curated Obsidian/K-Plex color tokens and an advanced validated custom-property **name**, preserving case. Reject declarations, selectors, scripts, `url(...)` and arbitrary `var(...)` expressions. Missing, cyclic or non-color references need deterministic slot fallbacks and visible editor feedback while preserving saved intent. CSS `var()` fallback alone does not handle a defined but invalid color. Validate advanced references in the actual owning scope and cache by unique token/scope/CSS revision, not by node. No cross-origin stylesheet enumeration. Direct third-party CSS is theme-author-owned, not something K-Plex promises to sanitize.

### Editor and persistence UX

Use **Visual styling → Color palette**, with a searchable bounded manager and paired Light/Dark swatches, explicit alpha, rename and duplicate. Provide one shared source-choice interaction: inherit/default where supported, fixed color, named color, theme/semantic color. Apply it to all relevant node/link/lens fields, canvas-background entry points, standard semantic slots and four sector fills. A fixed red stays red in both modes. Selecting a named pair exposes its identity as well as its current swatch.

Reuse native declarative settings, native modal shells and Obsidian ColorComponent through adapters. Portable React feature content receives narrow capabilities; share selection/validation/draft logic, not Obsidian imports in portable components. Opening, cancelling, switching the host theme or saving unchanged must never convert references/inheritance into literals. Preview both variants in local cards without changing Obsidian's actual global mode.

Extend `updateStyleSettings`, `enqueueSettingsWrite`, `StyleSettingsDraft` and `commitStyleChange`, not a second writer. Rebase each operation on current settings while owning the queue. Preserve concurrent node/lens/ontology/color edits, failed-storage versus saved-refresh-pending outcomes, duplicate-submission exclusion and retired-dialog fences. No per-keystroke disk writes. Cancel discards an unsubmitted draft; do not claim to cancel a disk operation already accepted.

Deleting an in-use named color requires a replacement or refusal with a settings-only usage summary. Replacement and deletion are one coherent queued operation over all references, including semantic slots, sectors, background and lenses. Scan settings only, never vault files/graph nodes. Renaming retains IDs. Invalid external edits fall back but remain repairable.

### Existing-vault compatibility

Fresh installs use the new theme-aware defaults. Preserve every existing saved fixed color and alpha, even when it equals an old factory value: equality does not prove the user never chose it. Preserve imported ExcaliBrain dictionaries, matching order, keys, prefixes and geometry. Shell theming is automatic; conversion of fixed graph colors is not.

Provide **Use theme colors for standard styles…** with an explicit preview/confirmation of canvas/base/kind/role color slots. Preserve custom property/tag/ontology dictionaries, lenses, palette entries, non-color preferences and all note contents. Do not reset the entire settings object. Foreign graph imports must not replace the local palette/semantic-slot/tint preferences. Unknown future schema data must round-trip or use the existing read-only future-schema pattern; document downgrade limitations. No new database schema, cache purge, source facts or graph snapshot data for colors.

## 6. Full-viewport compass sectors

### Rendering and geometry proposal

Use one lightweight SVG underlay with four clipped convex polygons, sized to the **visible Plex viewport**, outside `.kplex-camera`. Its `viewBox` is `0 0 width height`. Do not reuse the existing fixed 3200×2400 link SVG or create a giant zoom-scaled world surface.

Layer order: native base background → compass underlay → normal links/nodes/scroll content → existing stronger drag-area previews and controls → native embedded editor/menus as currently owned. Use `pointer-events: none`, `aria-hidden="true"`, `focusable="false"`, no event handlers and no added focus target. The graph's existing bare-space pan/context-menu behavior must remain unchanged. Do not apply opacity to any parent containing foreground content.

For local viewport coordinates and apex `(cx, cy)`, define `dx = x - cx`, `dy = y - cy` (screen y increases downward):

- Parent/north: `dy <= -abs(dx)`.
- Challenger/east: `dx >= abs(dy)`.
- Child/south: `dy >= abs(dx)`.
- Friend/west: `dx <= -abs(dy)`.

Clip the viewport rectangle against the two linear half-planes for each sector. This is constant bounded work independent of graph size; each polygon has at most six vertices. Use one small pure geometry helper, proposed under `src/core/plex/compassBackground.ts`, and a focused role-aware renderer under `src/ui/features/`. These are proposed modules, not existing APIs. Keep domain-independent components free of graph role policy.

The two diagonal boundaries are implicit shared polygon edges, not visible separator lines. Test antialias seams without overlapping polygons into darker bands. Handle zero-size/hidden viewports and absent centers without NaN or fabricated coordinates. An offscreen apex is valid; clipping must still cover the entire viewport exactly once apart from shared boundaries. Avoid blur, masks, blending, GPU filters, huge backing textures and a second fallback renderer unless a measured compatibility issue requires one.

### Center, camera and arrival motion

For the settled central occurrence, use `cx = camera.x + camera.scale * center.x` and the equivalent y expression. Do not anchor to viewport midpoint, overall graph-bounds midpoint, keyboard selection, hovered node or prospective drop target. Capture central geometry when the scene changes rather than scanning nodes on every pointer frame.

Synchronize the underlay from the existing owner-window coalesced `applyCamera` callback and `flushCameraTransform`, and from actual viewport/central-geometry changes. Update only the four polygon attributes. Reuse existing resize observation and camera lifetime; do not create a React state update of the whole scene for each pan/zoom event.

**Arrival is a required case, not an optional polish step.** `centerArrivalFrames` generates sampled translate/scale frames and `ElementMotion.play()` returns the actual Web Animation. Narrowly expose/share the numeric pose samples used to build those keyframes, and derive the sector apex from the same animation progress, easing and piecewise interpolation. Account for transform origin and changing width/height scale, including the small pop. Do not independently evaluate a continuous sine curve that disagrees with the browser's interpolation between the five existing samples, parse transform strings each frame, or start an unrelated animation clock.

A finite view-owned animation-frame subscription may update the apex while the central animation runs; coalesce it with camera updates. It must stop on completion, cancellation, new center generation, hidden surface, window migration or unload, and flush the exact settled center. No idle polling or per-frame `getComputedStyle`/all-node rectangle scans. Existing one-time motion rectangle capture is reusable. Share cancellation with `sceneMotion.cancelAll()` rather than leaving a background follower alive after the node animation stops. Do not change navigation timing/curve merely to simplify shading.

Apply the equivalent center projection to the existing non-curved editor arrival. Native editor content stays outside the transformed camera; the underlay remains behind its opaque native surface. Follow-origin navigation, animation speed zero and reduced-motion land the apex immediately with the node. Rapid A→B→C and Wander must not allow an old animation callback to restore a stale apex. Preserve the owning window's clock and request/cancel ownership.

### Semantic meaning, empty zones and interaction

Use the layout's role-to-physical-direction contract: today parent north, child south, friend/previous west, challenger/next east. The colors belong to semantic directions. A future rotated layout may provide its mapping, but do not add a rotation mode or infer roles from node positions now. Siblings retain their existing separate role; no fifth slice or implicit challenger classification.

All four sectors remain present when enabled, even when a corresponding list is empty, filtered or collapsed. This deliberately replaces #90's earlier container-visibility proposal. Scroll, folds, counts, ordering and positions are unaffected.

At some widths, a parent row or peripheral sibling can cross a diagonal. Explain the tint as a **compass orientation cue**, not guaranteed container membership. Never move nodes or change source relationships to fit a background sector. Preserve existing drop hit-testing, gate roles, relink hysteresis and `DropAreaPreview`; the existing stronger preview identifies the actual eligible drop area above the subtle underlay. Do not make an entire wedge a new drop target.

### Settings and appearance

Add **Directional background tint** under Visual styling / Canvas, reusing existing source selectors and LayoutSlider mechanics. Keep it off by default for fresh and upgraded vaults under #90's existing choice. Four fill assignments can inherit the standard semantic tokens or select a theme/named/fixed color; add one shared intensity override and Reset to theme/default. Undefined intensity inherits; explicit zero means invisible.

Suggested first visual trial: approximately 5% opacity in light mode, 7% in dark mode, with a conservative 0–15% user range. These numbers are proposals to validate against real themes, not a contrast guarantee. An explicit intensity overrides both mode defaults. Effective fill alpha is source alpha multiplied by tint intensity; normal card/edge/label opacity is not changed. Use SVG fill opacity rather than converting every source into RGB. Let theme authors override mode-specific defaults through documented K-Plex tokens.

Document a compact contract such as `--kplex-compass-parent-color`, `--kplex-compass-child-color`, `--kplex-compass-friend-color`, `--kplex-compass-challenger-color` and `--kplex-compass-opacity`. Resolve missing slot values through the semantic/native fallback chain. Suppress decorative tint under forced-colors; ensure labels, icons, outlines and relationship semantics remain usable without color. Do not silently rewrite custom colors to force contrast; use contextual preview/warnings instead.

## 7. Ownership, lifecycle and performance invariants

Extend the current owners identified above. Proposed pure color values/validation belong in `src/core/plex/`; host CSS validation/resources belong in an Obsidian adapter/composition. Palette manager feature content and compass presentation belong in `src/ui/features/`, using existing ActionButton, FloatingLayer, collection helpers, source-editor mechanics and native shells. Do not add a duplicate node-style classifier, lens evaluator, persistence writer, graph store or scheduler.

Generated private palette rules and validation caches need explicit document/scope ownership and reference-counted or equivalent cleanup. Cover multiple views in one document, popouts, native settings windows, portalled filters/dialogs and detached Sidecar unfold controls. Publish no main-window-only singleton. Theme changes should repaint CSS-backed sources without rehydrating the graph. Use the public `css-change` event only for previews/validated-reference caches that need invalidation; test mode/class, theme and snippet changes and add a bounded owner-local observer only if actual host events miss a supported transition.

Color-only mode/theme changes cause **zero K-Plex settings writes, note reads/parses, source acquisition, semantic invalidations, graph/search rebuilds or graph remounts**. Palette values, semantic slots and tint preferences produce only the necessary settings/presentation operation. Extend exact settings-impact inventories and the color-only fast path; mixed changes must still apply genuine semantic effects. Color-only edits must not reset camera/scroll/selection/folds or rerun scene construction just because a new settings object was allocated. Geometry/style changes outside this feature retain their normal behavior.

Theme CSS deliberately changing fonts/metrics is not a color-only change and may naturally reflow. Test this separately from the strict palette/mode-color lane. Node-style changes may reselect visual fields; that does not authorize source reclassification. Native editor identity and remote-image consent remain intact; color changes must not create extra image requests.

Keep every new/changed module/function documented per AGENTS. Maintain all eight catalogs: English, German, French, Spanish, Dutch, Japanese, Traditional Chinese and Russian. User palette labels are user content, not catalog keys. Preserve native focus, keyboard/IME, touch targets, tooltip ownership and accessibility. Do not weaken scanner, architecture, timing or migration tests.

## 8. Implementation packages

Keep independently reviewable checkpoints on this same draft branch, not parallel replacement PRs.

1. **A — Scope integration and theme contract.** Integrate current main, inspect dependencies, inventory literal colors and consumers, finalize public/native fallbacks and cascade tests. Theme native interface first; preserve saved graph literals.
2. **B — Shared color values and migration.** Implement reference-aware node/link/lens/default sanitation and resolution, immutable round trips, supported token validation and explicit standard-style adoption. Extend all consumers before enabling new selectors.
3. **C — Palette and semantic-slot settings.** Deliver paired drafts, shared selectors across native/React entry points, settings-only usage/replacement, queue/concurrency/recovery tests and local previews. Publish default choices as live references.
4. **D — Compass underlay.** Add constant-size clipping, view-owned rendering, camera/arrival synchronization and tint settings. Preserve existing layout and interaction semantics; test motion cancellation and offscreen centers.
5. **E — Acceptance and documentation.** Run real portable/browser/native lanes on the exact integrated source, publish a short end-user guide and complete theme-author snippet/token table. Replace this assignment with actual return results on transfer; remove the temporary issue-155 marker before final review.

## 9. Acceptance and validation plan

Every implementation check below is **pending**, not completed by preparing this document.

| Area | Required evidence |
| --- | --- |
| Native defaults | Fresh settings in default light/dark and a community theme. Canvas/native background, all standard kinds, gates, links, labels, mini/outline nodes, search/history/pins, controls and shadows follow documented variables. No surviving fixed white text/red ghost/gold folder fallback. |
| Cascade and scope | Body and view-local K-Plex overrides; host variables missing or scope-only; main/sidebar/popout, settings and portalled controls. Mode switch while mounted, theme replacement, snippet enable/disable and accent change. OS mode cannot override Obsidian's selected mode. |
| Source persistence | Fixed literal/alpha stability; palette/theme references survive save/reload/unchanged editor use; later lens precedence unchanged. Built-in token assignments follow themes; one named pair updates all uses. Missing/cyclic/invalid/future sources behave as documented without destructive sanitation. |
| Migration and concurrency | Existing K-Plex/ExcaliBrain fixtures retain literals, alpha, keys/order and non-color settings. Explicit adoption touches only listed standard color slots. Concurrent palette/lens/node/ontology saves, Cancel, failed disk write, saved-refresh-pending, duplicate Save, in-use replacement/delete and late-dialog completion remain safe. |
| Sector geometry | Cardinal role assignment, wide/tall viewport, boundary/offscreen apex, zero dimensions, four polygons, complete bounded coverage, no overlaps/seams, independent scroll areas and empty/filtered zones. Tint does not change counts, layout or drop targets. |
| Center motion | Pan/zoom/Fit/resize/fullscreen/Zen/Sidecar resize; compact-center and editor arrival including midpoint scaling; rapid navigation, Wander, cancellation, follow, reduced-motion and animation-off. Apex matches actual rendered center and remains correct after settled cleanup. |
| Interaction/visuals | Pointer-transparent underlay; original gate/file-explorer/relink/history/pin drops, background pan/menu and selection work. Strong drag previews are distinct from faint sectors. Native editors/images unaffected; readable default text and SVG labels/markers over every tint. |
| Work/lifetime | Instrument actual source/style/layout owners: zero extra source/index/search work, no whole-scene rerender/layout for color-only palette/tint changes, no per-node CSS probe, no idle animation frames, no accumulated styles/listeners or duplicate image fetch. Small and representative large scenes. |

Use actual production functions and real-browser computed styles/geometry, not source-text assertions alone. Extend `tests/excalibrain-migration.test.mjs`, `tests/on-demand-indexing.test.mjs`, relevant lens/settings-policy tests, `tests/ui-components.test.mjs`, `tests/canvas-menu.test.mjs` and existing center-arrival/Wander tests; register new focused color/compass tests in the real suite. Preserve alpha and semantic goldens. Explain intentional factory-default differences rather than blanket fixture regeneration.

Check returned Web Animation progress against the rendered center's rectangle at representative times; tests may measure DOM to establish correctness even though production must not continuously scan it. Verify no stale-frame write after cancellation. Test color-only CSS switching separately from themes that intentionally change geometry. Use operation counts, not invented startup speedups.

Required runtime: **Node 22.22.2**, actual dependencies and installed Obsidian declarations; run `npm i` and `npm run verify`. The main validation agent runs `npm run verify:obsidian` in a CLI-path-verified disposable vault, then applicable migration/style-operation acceptance plus a focused theme/palette/compass native lane. Reuse `scripts/testing/obsidian/styleOperations.mjs` and native process helpers. Run browser/native drivers serially, record exact source/artifact/host versions and restore workspace/settings/snippets/test resources even on failure. Basic render smoke alone does not validate this feature.

Up to three residual manual priorities after automation: physical iOS/Android theme-switch/pinch/navigation/arrival behavior; visual contrast and sector meaning in light/dark/community/high-contrast themes including wide parent rows; native color dialog/keyboard/touch and two-way popout migration. Desktop emulation and SVG assertions do not establish physical-device paint or memory acceptance.

## 10. Preparation evidence and completion gates

This preparation reviewed authenticated PR metadata/diff/comments, both issues/comments, repository instructions, targeted source owners, the branch/main comparison and official Obsidian CSS/API documentation. The reviewed PR contains no runtime theming implementation. No npm build, production tests, browser/native run, device test or visual theme acceptance was performed.

A separate **design-only Python geometry prototype** checked 508 deterministic viewport/apex cases, including offscreen centers: full area coverage, bounded vertices, cardinal inequalities and sampled interior membership passed. This validates the proposed clipping equations only; it is not a test of K-Plex code, rendering, motion, antialiasing or runtime performance. Do not count it in implementation-suite results.

- [ ] Integrate current main, preserve this active assignment and record exact resulting revision/dependency decisions.
- [ ] Implement packages with focused regressions, component reuse, catalog updates and architectural/TSDoc review.
- [ ] Main agent independently validates the actual return and exact artifacts; record failures, unavailable checks and explicitly accepted limitations.
- [ ] Publish final token/user documentation, remove the temporary marker and replace the PR's planning summary with actual behavior/results.
- [ ] Verify intended branch and PR heads; keep draft until required acceptance. Do not merge, release or close issues merely because this handoff exists.

## Primary documentation and retained design precedents

- [Obsidian Colors](https://docs.obsidian.md/Reference/CSS%20variables/Foundations/Colors): full semantic colors, text/surface/interaction tokens; 1.13 guidance favors full-color values over deprecated RGB/HSL tuples.
- [Canvas variables](https://github.com/obsidianmd/obsidian-developer-docs/blob/c56c7e770ba25dd0ea392aacf4588f9425970d36/en/Reference/CSS%20variables/Plugins/Canvas.md), [navigation items](https://github.com/obsidianmd/obsidian-developer-docs/blob/c56c7e770ba25dd0ea392aacf4588f9425970d36/en/Reference/CSS%20variables/Components/Navigation.md), [tags](https://github.com/obsidianmd/obsidian-developer-docs/blob/c56c7e770ba25dd0ea392aacf4588f9425970d36/en/Reference/CSS%20variables/Editor/Tag.md), [links](https://github.com/obsidianmd/obsidian-developer-docs/blob/c56c7e770ba25dd0ea392aacf4588f9425970d36/en/Reference/CSS%20variables/Editor/Link.md), [graph](https://github.com/obsidianmd/obsidian-developer-docs/blob/c56c7e770ba25dd0ea392aacf4588f9425970d36/en/Reference/CSS%20variables/Plugins/Graph.md): choose tokens by purpose, not remembered hex values.
- [Obsidian API declarations](https://github.com/obsidianmd/obsidian-api/blob/9abd9605ce081383674aae1ed111c456edde0688/obsidian.d.ts): public `css-change`; installed declarations remain authoritative for implementation/build acceptance.
- [CSS custom properties and invalid values](https://www.w3.org/TR/css-variables-1/#invalid-variables): missing-variable fallback is not complete color validation.
- Original PR precedents retained: [Style Settings paired themed colors](https://github.com/community-archive/obsidian-style-settings#variable-themed-color), [JSON Canvas color/reference distinction](https://jsoncanvas.org/spec/1.0/#color), [Advanced Canvas custom colors](https://github.com/Developer-Mike/obsidian-advanced-canvas#custom-colors). These inform UX, not dependencies, copied implementations, Canvas palette IDs or a competing palette store.
