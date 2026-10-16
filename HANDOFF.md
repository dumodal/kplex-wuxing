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

Prepared by **Zsolt's Codex Agent**, 2026-10-16. **Current state: maintainer-authorized implementation, main integration `689399d`, A `8a33627`, B `2d0232d`, C1 `4f52c12` committed/pushed. C2 is fully validated and ready for commit/push: 1,947 tests; exact native 12 color /14 style /6 migration /6 theme combinations. Final source/build and successful/failed evidence are preserved in the verified unpublished `%TEMP%\kplex-158-checkpoint-C2-evidence.zip` (6,464,566 bytes/143 entries, SHA `ea96ac043fd04bfa8ca3d0abd7a1eb24be971992f1d1039f26cf15f6d532d5d1`). Original disposable configuration/effective settings and saved workspace are restored; notes/controllers/frames absent, both awake requests ended. No personal vault access.**

Continue immediately after C2 commit/push with D Compass, then E final docs/acceptance. D is prepared **only in `%TEMP%\kplex-158-D-stage`**, not applied or product-validated. Its geometry/motion/settings/previews/all-eight-locales candidate passes overlay installed-type diagnostics. Read `%TEMP%\kplex-158-D-design-notes.txt`; the stage already incorporates most of that design. Actual WAAPI spec confirms `getComputedTiming().progress` includes global easing; never double-ease. Staged tests include 1,200 geometry cases and 70 actual-browser pose comparisons, but are NOT run yet. Compass modal is lazy at explicit Settings action so its React rail does not promote framework work into startup; tab generation fences the import. Review/test camera integration, existing viewport/display fixture ports, finite indexing TSX inventory, actual main/popout Compass controls and zero-work/idle-frame behavior. Native/browser drivers serial. Use only authorized disposable fixtures. Original private C2 config backups stay private, never archive. Keep draft; no merge/release. Root standing header must remain; remove the obsolete temporary issue-155 marker at E. Durable results belong in the evolving validation report and Refactor plan.

## 1. Assignment, baseline and priorities

Continue [draft PR #158](https://github.com/zsviczian/kplex/pull/158) on `2026-10-14-issue-155-theme-palette`, targeting `main`. Include [#155](https://github.com/zsviczian/kplex/issues/155) and [#90](https://github.com/zsviczian/kplex/issues/90). Leave both issues open until implementation and acceptance; do not edit the reporter-owned #155 body.

- Original accepted base / current merge base: `df5335808aacfd6a11ac7ff4ef008f9406f27893`.
- Draft head reviewed: `345f47a9c83ab134e23726e5dff0d57d10bb0cfb`; its changes are documentation only. Runtime-source links below refer to this actual revision.
- Main integrated for implementation: `867ef55a280c730a6b0374338433fea3ab06b9de` at `689399d`. Historical preparation reviewed `b29833c6d2e79c173cc658b8e00e9aceef413e27`. At review, main has 32 commits beyond the merge base; the draft has three documentation commits. Main includes #168's new-drawing relationship fix and additional modal CSS, as well as the indexing/test advances. Preserve these changes when integrating.
- Before implementation, integrate current main through the maintainer's normal workflow and record the resulting base/head. Main removed the old completed root handoff: resolve the modify/delete conflict by retaining this active assignment, not restoring the old scanner-validation return. This preparation does not merge/rebase anything.
- Related PRs #154 (reciprocal ontology/link-style lookup), #147 (settings/input persistence), #149 (label sharpness), and #165 (indexing work/progress) are open at review. Recheck status and ownership before implementation; do not assume they merged or duplicate their changes.
- The reviewed manifest requires **Obsidian 1.13.0** and supports mobile. Validate against actual installed dependencies/types and the minimum supported host, not just a newer desktop browser.

Required outcome: a fresh K-Plex installation naturally follows the user's Obsidian theme, with no other plugin installed. User-defined semantic light/dark pairs are optional additions, not a prerequisite for readable defaults. Native integration, paired-color editing/preview, compatibility and existing compass scope are required. Counterpart suggestions are a useful bounded enhancement; external Style Settings/Style Manager controls are lower priority and must not delay the required standalone experience.

The maintainer includes #90 as **four full-viewport compass sectors**, superseding its earlier scroll-container rectangles and hide-with-container proposal. Retain its **off-by-default** setting unless explicitly changed by the maintainer. Exact hues/intensities are visual-validation proposals. #135 shareable presets remains excluded. No new layout mode, semantic classifier, index optimization, independent appearance-mode switch, or C15–C26 refactor.

## 2. Research verdict and concrete implementation traps

The supplied [Obsidian style guide](https://obsidian.md/help/style-guide) is a **writing/documentation guide**, not the visual CSS specification. Apply its sentence case, concise descriptions, terminology and interaction wording to settings/help. Use the official [CSS variables](https://docs.obsidian.md/Reference/CSS%20variables/CSS%20variables), [Colors](https://docs.obsidian.md/Reference/CSS%20variables/Foundations/Colors), native component references and installed API declarations for visual behavior. The guide's documentation-image icon dimensions are not a replacement for native UI icon tokens.

The draft's direction is aligned, but implementation cannot be certified from a plan. These source findings must be addressed together:

| Evidence | Consequence |
| --- | --- |
| [styles.css:1–240](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/styles.css#L1-L240) declares dark local tokens, fixed blue/black gradients, white borders, shadows and fixed control geometry. | Replacing the toolbar background alone is insufficient. Audit all shell/portal/control states, fonts, spacing, radii, icons, focus and shadows, not just colors. |
| [settings.ts:48–85](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/settings.ts#L48-L85) and [standard styles](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/settings.ts#L307-L378) contain literal graph defaults. [ThoughtNode.tsx:94–145](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/ui/ThoughtNode.tsx#L94-L145) supplies inline fills/text/gates/hatches. | Change fresh defaults, sanitation and DOM/SVG consumers together. Saved user literals remain deliberate overrides. CSS cannot reliably fix inline factory literals. |
| [GraphLens.ts:121–163](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/lens/GraphLens.ts#L121-L163) sanitizes hex colors and creates a literal amber default. [settings.ts:790–865](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/settings.ts#L790-L865) uses hex equality/summaries. | Replace `sixHex`, `canonicalHex`, `nodeStyleColor` and related assumptions where sources can be references. In particular, two distinct references must not both become `null` and compare equal in `hasMeaningfulLinkOverride`. |
| [style.ts](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/index/style.ts) deliberately layers kind/role/property/tag/ontology styles; folder/tag branches differ. | Select the winning field first, then resolve its color source. Reference type must not become a new precedence level. Later lens overrides still affect only supplied fields. |
| [PlexGraph edge renderer](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/ui/PlexGraph.tsx#L607-L716), [mini nodes/background picker](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/ui/PlexGraph.tsx#L3810-L3980), and [labels/markers](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/ui/PlexGraph.tsx#L3990-L4130) have separate consumers. | Cover every DOM/SVG path, including arrow markers, connector-label backgrounds, outline/expanded nodes and every background picker. Bring the canvas menu's mutate-then-save path into the durable queued editor contract. |
| [settingsPolicy.ts](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/core/graph/settingsPolicy.ts#L10-L144) has a narrow style-manager exception; scene memoization also observes settings. | No-indexing is not enough: color-only changes must not rebuild the scene, reset camera, reacquire images or remount native editors. Extend narrow existing impact owners. |
| [ColorComponent declarations](https://github.com/obsidianmd/obsidian-api/blob/9abd9605ce081383674aae1ed111c456edde0688/obsidian.d.ts#L2760-L2828) document six-digit hex/RGB/HSL APIs, not a paired RGBA editor. | Use the native picker for RGB plus a separate accessible opacity control/text value. Never rely on undocumented alpha support or feed theme references to the picker. |
| [Excalidraw StylesManager](https://github.com/zsviczian/obsidian-excalidraw-plugin/blob/master/src/core/managers/StylesManager.ts) samples both modes in an iframe, copies all head children, and republishes selected values with `!important` and a modified background alpha. | Reuse the isolation insight, not its embed-specific transparency, whole-head cloning, main-document assumptions or global override technique. A nested `.theme-dark` card is not an accurate substitute for `body.theme-dark` selectors. |

## 3. Native defaults and the CSS contract

Retain three layers: **native interface**, **Plex presentation tokens**, and **semantic style assignments**. Fresh installs must cover canvas, all standard node kinds, gates, connectors, labels, outline/mini/expanded nodes, toolbar, search, pins/history, buttons, menus, settings, dialogs, shadows, Sidecar and detached/portalled surfaces.

Use Obsidian's effective `.theme-light` / `.theme-dark`. No separate mode setting and no OS-only decision. Theme/snippet/accent changes propagate while views remain mounted. Prefer native declarative settings, `Modal`, menus, existing ActionButton/ObsidianIcon adapters and genuine semantic classes. Do not impersonate Canvas/File Explorer DOM merely to acquire another feature's selectors.

The following public K-Plex names are proposed, not existing APIs. Finalize a compact documented contract through real-theme checks:

| Element | Native basis / behavior |
| --- | --- |
| Canvas | `--kplex-canvas-background` → `--canvas-background` → `--background-primary`. |
| Shell, toolbar, history, settings cards | Appropriate primary/secondary surfaces, `--text-normal`, `--text-muted`, `--background-modifier-border`; remove fixed blue gradients. |
| Ordinary buttons and text inputs | Native controls/classes first; `--interactive-normal`, `--interactive-hover`, `--background-modifier-form-field`, border hover/focus tokens. |
| Icon buttons | Native icon color/hover/active/disabled, size/stroke and clickable-icon conventions where compatible; retain semantic buttons, labels and existing hit targets. |
| Primary/accent buttons | `--interactive-accent`, hover counterpart and `--text-on-accent`; do not pair an accent fill with arbitrary normal text. Preserve native focus-visible treatment. |
| Standard note | Neutral native surface, normal text and native border. |
| Central note | `--background-primary-alt` with primary fallback, normal text and restrained accent border; preserve custom style precedence and geometry. |
| Inferred note / placeholder | Muted/inferred treatment; placeholder text uses `--link-unresolved-color` with muted fallback and existing hatch distinction on a neutral fill. A missing note is not an error: no red factory fill or whole-node unresolved filter. |
| Folder | `--nav-item-color` with normal-text fallback, neutral surface/border and folder icon; no mandatory gold. |
| Tag | `--tag-color`, `--tag-background`, `--tag-border-color`, with accent/neutral fallbacks. Test transparent backgrounds over sectors. |
| URL / attachment | `--link-external-color` with link/accent fallback for URLs; ordinary note colors for attachments, preserving globe/paperclip icons. |
| Gates | Native muted stroke/fill; empty gates explicitly transparent. Preserve filled/empty/count, highlight and disabled semantics. |
| Connectors | `--graph-line` with muted-text fallback as the initial basis. Preserve ontology colors and inferred dashes; structural connectors may use kind-specific tokens. |
| Connector labels | Normal text on a dedicated `--kplex-link-label-background`, default primary surface, independent of an old saved canvas literal. |
| Hatches / mini / outline nodes | Corresponding slot tokens and local alpha, never hard-coded white. |
| Status / selection / attention | Appropriate native status/accent tokens, semantic classes and visible non-color cues. Challenger is not an error. New style-lens highlights use a theme reference; saved literals survive. |
| Typography and geometry of native chrome | `--font-interface`, native UI font sizes, spacing (`--size-*`), radii (`--radius-*`), input/icon conventions and `--shadow-s` where suitable. Do not replace graph layout metrics or persisted node geometry as a styling shortcut. |

A native token is not a contrast guarantee: `--graph-line`, accent colors and transparent fills still require contextual checks. Choose readable factory mappings in the acceptance matrix; do not silently rewrite arbitrary user colors or claim every community theme is WCAG compliant.

### Cascade and precedence

Consume public tokens with fallbacks; do not redeclare their defaults on `.kplex-app` or a descendant where they mask an inherited body override. Keep existing public aliases where practical. Example, using a private property only when there is an explicit saved field choice:

```css
.kplex-plex {
  background-color: var(--_kplex-canvas-choice,
    var(--kplex-canvas-background,
      var(--canvas-background, var(--background-primary))));
}
```

An inherited/default field leaves the private choice absent. An explicit fixed/named/theme source follows the winning style field; public K-Plex CSS supplies the default presentation, then Obsidian supplies the final fallback. Document this order. Reset removes the explicit override rather than saving today's resolved color. Test body and view-local overrides, including aliases resolved at the correct consumer scope. Do not define private defaults inline when doing so would prevent theme overrides.

A Canvas variable defined only inside a real Canvas descendant will not inherit into K-Plex. Use the documented fallback or K-Plex-specific theme token; do not promise exact arbitrary selector parity. Never write global Obsidian variables. Direct user/theme CSS remains author-controlled; K-Plex cannot guarantee safety against arbitrary `!important` overrides.

Use complete CSS colors, not shadow expressions or RGB/HSL channel tuples. Obsidian's Colors documentation deprecates several tuple variables from 1.13 and recommends full-color `color-mix()` where supported. Preserve live colors that compute to `oklch()`, `color(srgb ...)`, etc.; do not assume `getComputedStyle()` always returns `rgb(...)`. Validate CSS feature support/scanner acceptance on the supported hosts; SVG `fill-opacity` is suitable for sector alpha without channel conversion.

Native Markdown/Canvas/Excalidraw/Sidecar editors and imagery retain their own rendering. No whole-scene inversion, hue rotation, blend mode, opacity or counter-inversion. Shadows are full shadow values, not selectable colors.

## 4. One reusable semantic-color model

Offer built-in theme-backed semantic slots: **Origin** → Obsidian purple, **Development** → green, **Support** → cyan, and **Challenge / transformation** → orange as initial design choices. These are not universal meanings or mandatory coloring of every directional node. Proposed public tokens are `--kplex-semantic-origin`, `--kplex-semantic-development`, `--kplex-semantic-support` and `--kplex-semantic-challenge`.

Factory assignments are live references, never harvested hex pairs. Expose each semantic slot through the shared source editor. Reset restores its host-backed default. Keep the dependency graph finite/acyclic: reject direct and indirect self-reference. A user palette entry is a reusable named pair, not a complete node-style system.

Illustrative portable contract:

```ts
type ColorValue =
  | string // Existing supported literals, validated at the boundary.
  | { kind: 'theme'; variable: string }
  | { kind: 'palette'; id: string };

type SemanticColor = {
  id: string;    // Stable, bounded ID; never derived from an editable label.
  name: string;
  light: string; // Validated literal, including alpha.
  dark: string;
};
```

Undefined means inherit/default; transparent is an explicit value, not absence. Initial palette entries contain literal pairs only, not palette-to-palette formulas. Preserve reference identity, original supported literal representation and alpha on untouched saves. Use one sanitizer/copy/equality owner with detached immutable drafts. Distinguish two references even if they currently resolve to the same RGB; renaming never changes IDs.

Extend `NodeStyle`, `LinkStyle`, portable lens styles, `GraphLens` sanitation, own-data loading/persistence, summaries, meaningful-override checks, native/React editors and all background pickers together. Resolve after existing kind/role/tag/property/ontology/lens precedence. DOM/SVG consumes live CSS references where possible rather than per-node RGB snapshots.

Offer curated friendly native/K-Plex tokens plus an advanced validated custom-property **name**. Preserve case. Do not accept arbitrary declarations, selectors, scripts, `url(...)` or user-authored `var(...)` expressions. Validate the resolved value as a color in the actual owning scope; `CSS.supports('color', 'var(--x)')` alone is not resolution validation. A defined invalid value such as `--x: 12px` bypasses the normal missing-variable fallback. Missing, cyclic or non-color references need deterministic slot fallbacks and visible repair feedback, without silently deleting saved intent.

Cache validation by unique token, document/scope and CSS revision, not by graph node. The normal resolver does not enumerate stylesheets. Generated IDs/rules must be safe, bounded and lifecycle-owned; labels are text, not selectors. Preserve unknown future data or the established read-only future-schema behavior; do not manufacture a successful lossy migration.

## 5. Paired-color editor and settings UX

Use **Visual styling → Color palette**, a searchable bounded manager with name, Light/Dark swatches and a settings-only usage count/summary. Provide add, rename, duplicate and safe delete/replace. Show user-facing source identity, not a meaningless hex-only summary. Reuse existing collection helpers and native declarative subpages; no huge expanded list, nested scrolling or horizontal overflow.

One shared source-choice interaction serves node/link/lens fields, canvas background, semantic slots and sector fills: **Default / Inherit**, **Fixed color**, **Named color**, **Theme color**, as appropriate to the field. A fixed literal stays the same in both modes. Named/theme selections remain references after opening, cancelling, unchanged Save or switching Obsidian appearance. Converting a reference to a fixed literal requires an explicit user action.

### Literal/pair controls

Show Light and Dark together, side by side when space permits and vertically stacked on narrow/mobile screens. Each variant has a visible label, swatch, native Obsidian ColorComponent for RGB, editable hex/RGBA text and a separate opacity slider plus numeric percentage. Treat the native picker as the documented six-digit RGB selector; retain alpha separately when RGB changes. Do not depend on experimental browser color-input alpha or undocumented component fields. Use public methods and the installed types through an Obsidian adapter.

Text editing must tolerate partial input and IME composition without overwriting the field or jumping the caret. On invalid final input show an associated inline error; keep the last valid preview and disable Save until repaired. Synchronize controls without callback loops or rounding away alpha on untouched data. Test alpha zero, alpha one and intermediate values; zero is not a default/reset shortcut. Provide per-variant reset and a clearly described pair reset. RGB-only interaction must not silently alter the other variant.

Use a detached draft, live **local** preview and explicit Save/Cancel at the durable boundary. No disk writes on opening, per keystroke, picker drag, host theme switch, preview refresh or recommendation generation. An editor in a popout/settings window uses that element's document/window. Labels, keyboard access, focus return, Escape, color-dialog cancellation, disabled/saving feedback and touch layout are acceptance requirements; color alone is not an accessible name. Keep styled-tooltip `aria-label` ownership without duplicate native `title` tooltips.

### Preview content

Two mode-labelled cards must demonstrate real usage, not just swatches on generic white/black. Show a compact synthetic K-Plex sample with node text/fill/border, a gate and labelled connector; include tint over the canvas when editing a sector. Reuse existing production presentation/style helpers or extract a narrow shared renderer; do not mount a second graph engine, read vault data, run lens evaluation or load remote images for a preview.

Allow the editor to identify the relevant application (text/line, node fill, or background tint). Display the effective source and alpha. Show contrast against the actual sampled node/canvas/label surface for the relevant mode. A checkerboard can explain transparency but does not replace the themed preview. Use the final composited color, including node fill and sector intensity, when evaluating contrast.

The editor chrome remains in Obsidian's actual mode. Only preview cards simulate both modes. Never toggle the real body classes or host appearance setting, even briefly, to capture a preview.

## 6. Accurate dual-mode preview architecture

**A nested `.theme-light` / `.theme-dark` element is insufficient.** Theme rules such as `body.theme-dark`, `html`/root selectors, inline custom properties and Style Settings' `body.theme-dark.css-settings-manager` rules will not necessarily apply to a descendant card. CSS cannot reverse a resolved current-mode color into the theme's unknown opposite-mode color.

Recommended design: a small **preview-only, owner-document theme snapshot adapter**, using the browser's cascade in a script-free isolated document. This is an improvement on the Excalidraw precedent, not a copy of its runtime embedding mechanism. Live K-Plex keeps ordinary CSS inheritance; snapshotting never becomes its normal rendering dependency.

1. First validate the **active-mode** sample directly from the real K-Plex/editor context. Capture only the fixed token set needed by the preview and advanced references currently being edited. Use `element.ownerDocument.defaultView`, not a main-window singleton.
2. Lazily create an isolated offscreen iframe/document for the open editor. Reproduce relevant `html`/`body` classes, direction, safe theme data attributes and authored inline custom-property declarations, plus a minimal K-Plex ancestor/context structure. Set exactly one theme class on the isolated body when sampling each mode. Do not clone the live workspace, note content, event handlers or interactive host components.
3. Copy **styles only**, preserving source order and media conditions. Prefer already loaded local style text and readable local stylesheet rules. A bounded read/serialization of already loaded accessible stylesheets is permitted **only for this preview snapshot**; it is not an advanced-token crawler, runtime resolver scan or selector-rewriting engine. This explicitly narrows the earlier blanket “no stylesheet enumeration” statement. Catch inaccessible sheets; do not fetch them, crawl cross-origin rules, or use undocumented Obsidian CSS-loading APIs.
4. Never clone the whole head, scripts, arbitrary links or resource-bearing DOM. Use a script-disabled sandbox and restrictive CSP before attaching copied CSS; block network, images, fonts and imports. Do not replay resource URLs or duplicate image/font requests. Unavailable/imported/adopted stylesheet content and blocked dependencies must lower preview confidence rather than cause uncontrolled resource loading. Use standard DOM APIs in the iframe realm; Obsidian DOM helpers need not exist there.
5. Ask the browser to resolve the small color/token set in each isolated mode. Apply the resulting complete color values to **private preview-card properties only**. Do not install global harvested rules, append `!important`, alter background alpha as Excalidraw does for its embeds, or persist sampled values over theme/palette references.
6. Cache by document, relevant scope and CSS revision; bound source bytes/work and initialization time. Reharvest only when necessary while an editor is open, coalescing `css-change` and verified owner-local context changes. Color-picker movement changes local draft paint, not the stylesheet snapshot. Cancellation, close, replacement, CSS supersession, window migration and unload fence stale results and remove frames/styles/listeners in `finally` paths. No idle polling, per-node probes or self-triggered `css-change` loops.

**Honesty/failure contract:** compare the isolated active-mode results against live computed colors before trusting the snapshot. Validate theme selectors, body inline overrides, user accent and loaded Style Settings output. Theme/plugin JavaScript may publish only the active mode, and arbitrary theme CSS may depend on unreplicated context. There is no assumed public Obsidian API exposing a universally exact alternate theme snapshot.

Show the live current-mode preview accurately. Mark an unavailable/unmatched opposite-mode preview **Estimated** with a short explanation and neutral labelled fallback, rather than presenting current-mode colors as the opposite theme. The actual pair remains editable and savable; users can inspect it after switching Obsidian normally. Do not silently claim simulated pixels or contrast cover unreadable CSS, background imagery or host-only scripts. Default light/dark and selected real community themes must pass the accurate path; the fallback is for genuine limitations, not a substitute for implementing dual-mode preview.

Before building the full manager, have the equipped agent perform a bounded native feasibility probe: inspect accessible loaded CSS and compare live versus isolated token values in default light/dark and at least one body-qualified community theme, both in the main document and settings/popout document. Return minimized token results, supported host versions and any inaccessible resource category, not a private vault stylesheet dump. This resolves the preview's host-specific uncertainty early.

## 7. Optional counterpart recommendations

Prefer an explicit **Suggest dark variant** / **Suggest light variant** action with preview and **Apply suggestion** or a reversible draft change. Do not continuously overwrite a manually edited counterpart, add a persisted auto-link mode, or mutate colors when the theme changes. Saving an accepted suggestion stores a literal pair; it is not an ongoing formula.

A single color may be used as text, stroke, fill or faint tint. No universally correct opposite-mode color satisfies all these jobs. Generate for the selected usage and actual destination surfaces, and explain the context. For shared palette entries, warn that another usage may still need checking.

Recommended bounded algorithm, not an already implemented utility:

- Convert the source sRGB literal to OKLCH; preserve hue and alpha, handle near-neutral/undefined hue, and adjust lightness to suit the destination context. Gamut-map by reducing chroma rather than blindly clipping RGB channels. Use one tested pure utility; assess existing dependencies before introducing any library. No dependency on another Obsidian plugin or remote service.
- Search a bounded set of candidate lightness values, refine the closest acceptable candidate, and evaluate **after** conversion, serialization and alpha compositing against the real destination surface. Do not assume contrast is globally monotonic across fill/text and gamut-mapping cases. Avoid simple RGB inversion, `1 - L`, or a fixed light/dark threshold.
- For text, target at least 4.5:1 for ordinary text; use the 3:1 large-text exception only when the actual sample meets the definition. For essential graphical strokes/UI indicators, evaluate 3:1 against adjacent colors. For fills, test the actual label foreground over that fill and its backdrop. Decorative sector tints have no blanket 3:1 requirement; preserve readable foreground and use the existing intensity control.
- Do not silently increase alpha to reach a target. Transparent or restricted-gamut colors may have no solution, and some foreground/background combinations impose conflicting constraints. Return a clear warning and an unapplied candidate/no candidate rather than claiming success. A heuristic is not an accessibility certification; do not auto-correct a user's saved color on render.

Use [CSS Color 4's OKLab/OKLCH and gamut guidance](https://www.w3.org/TR/css-color-4/#ok-lab), [WCAG contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Test deterministic output, both directions, neutrals, saturated colors, low/zero alpha, gamut boundaries, impossible targets, serialized-result contrast and Apply/Undo/Cancel. Keep this enhancement independent of required picker/preview delivery if it cannot be safely completed.

## 8. Persistence, migration and concurrency

Extend `updateStyleSettings`, `enqueueSettingsWrite`, `StyleSettingsDraft` and `commitStyleChange`, not a second settings writer. Preserve [StyleEditorModal's durable-operation and lifetime behavior](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/settings.ts#L865-L965). Declarative controls normally have host-owned persistence: route compound palette/source edits through K-Plex's existing custom storage/queued operation boundary rather than accidentally enabling an independent automatic write path.

Rebase each operation on current settings while owning the serialized queue. Preserve detached drafts, concurrent node/lens/ontology/palette edits, duplicate-submit exclusion, storage-failed versus saved-refresh-pending outcomes and retired-dialog fences. Cancel discards an unsubmitted draft; it does not undo a disk operation already accepted. The canvas context-menu background editor must use the same semantics.

Deleting an in-use palette entry requires replacement or refusal with a settings-only usage summary. Replace references and delete atomically as one queued settings operation, including semantic slots, lenses, canvas and sectors. Do not scan the vault or graph. Invalid external edits remain repairable; renaming retains identity.

**Do not silently recolor an existing vault.** Preserve saved literals and alpha even when they equal former factory defaults: equality is not evidence that the user never chose them. Preserve imported ExcaliBrain keys, order, dictionaries, prefixes and non-color geometry. Shell theme integration is automatic; converting fixed graph colors is a separate opt-in promise.

Provide **Use theme colors for standard styles…** with a preview, exact affected-slot summary and confirmation. Change canvas/base/kind/role color slots only; preserve custom property/tag/ontology dictionaries, lenses, palette, non-color preferences and all note content. Do not reset the settings object. Foreign imports must not replace local palette/semantic-slot/tint preferences. Document downgrade limits and preserve unsupported future schema data or the established read-only pattern. No cache purge, database upgrade, semantic snapshot color data, source-fact change or note write.

## 9. Full-viewport Idea Compass sectors

Retain the prior accepted geometry, motion, interaction and off-by-default requirements. This feature is not just four colored scroll panels.

### Geometry and layering

Use one viewport-sized SVG underlay outside `.kplex-camera`, `viewBox="0 0 width height"`, with four convex polygons clipped from the viewport rectangle by two half-planes per sector. Do not reuse the fixed 3200×2400 link SVG or allocate a huge zoom-scaled world texture. A small pure geometry helper may live in `src/core/plex/compassBackground.ts`, with role-aware rendering in `src/ui/features/`; these names are proposals, not pre-existing APIs.

For apex `(cx, cy)`, `dx = x - cx`, `dy = y - cy` with screen y downward:

- North / parent: `dy <= -abs(dx)`.
- East / challenger: `dx >= abs(dy)`.
- South / child: `dy >= abs(dx)`.
- West / friend: `dx <= -abs(dy)`.

This is constant bounded geometry independent of graph size; each clipped polygon has at most six vertices. Handle offscreen apex, wide/tall viewport, missing center and zero dimensions without NaN. Cover the viewport exactly once apart from shared boundaries. Test antialias seams without darker overlapping bands. No visible diagonal strokes, decorative rays, blur, glow, masks, blending or unrelated animation.

Layer native base → sectors → links/nodes/scroll content → existing stronger DropAreaPreview/controls → native editors/menus. Underlay is `pointer-events: none`, `aria-hidden`, non-focusable and owns no handlers. Never apply opacity to a parent containing foreground content. All four sectors remain when lists are empty, filtered, collapsed or hidden.

Preserve role mapping: parent north, child south, friend/previous west, challenger/next east. Siblings retain their separate role; no fifth sector or implicit challenger classification. Future layout rotation can provide mapping but is not implemented here. Broad parent rows and peripheral siblings may cross diagonals: tint is a compass orientation cue, not an exact membership mask. Do not move nodes or change relationships to fit it.

### Rendered-center tracking

For a settled center, project the central occurrence with `cx = camera.x + camera.scale * center.x` and equivalent y. Do not anchor to viewport midpoint, graph bounds, keyboard selection or hover. Capture center geometry when the scene changes rather than scanning nodes per pointer frame.

Reuse [applyCamera/flushCameraTransform](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/ui/PlexGraph.tsx#L1207-L1399), existing resize observation and owner-window frame coalescing. Update four polygon attributes, not whole-scene React state on each camera event.

Arrival must follow the **actually rendered moving center**, not only the camera. [centerArrivalFrames](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/ui/components/centerArrival.ts) and [ElementMotion](https://github.com/zsviczian/kplex/blob/345f47a9c83ab134e23726e5dff0d57d10bb0cfb/src/ui/components/ElementMotion.ts) own numeric/keyframe poses and actual Web Animation timing. Narrowly share numeric samples and derive apex from that animation's progress, easing and piecewise interpolation, accounting for transform origin, width/height and pop scale. Do not independently evaluate a continuous curve that disagrees with browser interpolation between the sampled frames, parse transform strings each frame or add a second clock.

A finite view-owned animation-frame subscription may follow active arrival, coalesced with camera updates. Stop on completion, cancellation, new generation, hidden view, window migration and unload; share cancellation with `sceneMotion.cancelAll()` and flush the correct settled pose. No idle polling, per-frame computed-style/all-node rectangle scans or stale A→B→C/Wander callback writes. Reuse existing one-time motion rectangle capture. Handle non-curved native-editor arrival as well. Follow-origin, zero-speed and reduced-motion navigation land the apex immediately. Do not change the navigation curve/timing merely to simplify shading.

Preserve background pan/menu, selection, gate linking, file-explorer drop, history/pin linking, relink hysteresis and actual DropAreaPreview hit-testing. A wedge is **not a new drop target**. Native editor content remains outside the camera and above the underlay.

### Settings

Add **Directional background tint** under Visual styling / Canvas, off by default for fresh/upgraded vaults. Four shared source selectors inherit semantic tokens or choose fixed/named/theme colors. Add one intensity override and reset using existing LayoutSlider mechanics. Undefined intensity inherits; explicit zero means invisible.

Initial visual trial: about 5% light / 7% dark, conservative 0–15% user range. These are proposals, not demonstrated contrast guarantees. Explicit intensity overrides both mode defaults. Multiply source alpha by sector intensity only, preferably through SVG fill opacity. Document proposed `--kplex-compass-parent-color`, `--kplex-compass-child-color`, `--kplex-compass-friend-color`, `--kplex-compass-challenger-color`, and `--kplex-compass-opacity` with mode-aware fallbacks. Suppress decorative tint under forced-colors and retain useful non-color labels/icons/outlines.

## 10. Optional Style Settings / Style Manager compatibility

The supplied Style Settings repository now resolves to [community-archive/obsidian-style-settings](https://github.com/community-archive/obsidian-style-settings). Its [paired-color metadata](https://github.com/community-archive/obsidian-style-settings/blob/8ecefa956cf663ed11cb015769b3959df6419c40/README.md#variable-themed-color) supports `variable-themed-color`, `default-light`, `default-dark`, `format` and `opacity`. Its [CSS emitter](https://github.com/community-archive/obsidian-style-settings/blob/8ecefa956cf663ed11cb015769b3959df6419c40/src/SettingsManager.ts#L510-L545) writes body-qualified light/dark rules and triggers `css-change`; this is relevant to cascade and preview tests.

A newer alternative, [Style Manager](https://github.com/emarpiee/obsidian-style-manager), documents the same `/* @settings` format and warns against enabling both managers together. Support the common CSS boundary, not either plugin's internal API or storage. Do not introduce runtime imports, plugin lookups, install prompts, required companions or two-way synchronization of their `data.json`/Obsidian appearance settings. Do not depend on Excalidraw or its color manager either.

Minimum delivery is a useful public token table and plain CSS snippet examples. A low-cost optional enhancement is a small compatible `@settings` block or opt-in companion snippet for static presentation tokens; do not try to expose an unbounded dynamic named-palette manager through CSS metadata. K-Plex's native settings remain complete without it.

**Neutral-by-default rule:** metadata color defaults are literal swatches, not a portable expression for “follow the active theme.” Do not replace live Obsidian defaults with fixed light/dark values merely by installing/enabling a style manager or opening its settings. Use a separate opt-in class, default false, and private external-control variables. Example pattern, whose literal swatches are illustrative external overrides, not K-Plex factory colors:

```css
/* @settings
name: K-Plex appearance
id: kplex-appearance
settings:
  - id: kplex-external-color-overrides
    title: Use these color overrides
    type: class-toggle
    default: false
  - id: kplex-external-canvas-color
    title: Canvas background
    type: variable-themed-color
    format: hex
    opacity: true
    default-light: '#ffffff'
    default-dark: '#1e1e1e'
*/
body.kplex-external-color-overrides {
  --kplex-canvas-background: var(--kplex-external-canvas-color);
}
```

Keep this opt-in CSS separate from native palette persistence. Explicit K-Plex field choices still outrank its public default token; explain how to choose Default/Inherit to let external styling control that field. Disabling the gate or resetting/removing external controls restores the theme fallback without rewriting K-Plex data. Body/view-local public overrides remain usable through normal CSS.

Test each manager separately, with neither installed, with metadata untouched, after explicit changes/reset, after disabling it, and in both modes/popouts. Verify metadata survives in the actual delivered CSS artifact if bundled; a comment stripped during build is not compatibility. Keep stable IDs and localize supported metadata captions alongside native copy. Do not claim both managers can run together safely or that arbitrary plugin-specific settings are interoperable. This lower-priority integration can be deferred explicitly while retaining the public CSS contract and full standalone UX.

## 11. Ownership, lifecycle and performance gates

Follow the actual [architecture guide](docs/ARCHITECTURE.md), AGENTS and current owners; refactoring remains paused at C14. Pure ColorValue/equality/contrast/suggestion/geometry logic belongs in portable core as appropriate; DOM/CSS sampling, native controls, lifecycle and persistence belong in host adapters/composition. Shared feature content uses narrow data/action capabilities in `src/ui/features/` and existing reusable mechanics in `src/ui/components/`. Do not import Obsidian into newly portable components, pass the entire plugin into helpers, or create duplicate graph/lens/persistence engines.

Generated palette rules, scope contexts, validation caches, previews and listeners have explicit per-document ownership and cleanup, including multiple views, popouts, native settings windows, portal menus and detached Sidecar unfold controls. Theme changes should repaint CSS-backed references naturally. Use public `css-change` for caches/previews only where needed; add a bounded owner-local observer only when actual supported transitions require it. Do not trigger global events for local preview changes.

Color-only mode/theme changes cause **zero K-Plex settings writes, note reads/parses, source acquisition, semantic invalidation, graph/search rebuilds, camera/scroll/selection/fold resets or graph/native-editor remounts**. Palette/semantic/tint saves perform only necessary settings/presentation work. Extend narrow settings-impact inventories and fast paths; do not reconstruct scenes because the whole settings object was replaced. Mixed semantic/geometry changes retain their genuine effects. Host themes deliberately changing font metrics are a separate geometry case, not evidence against the color-only invariant.

No per-node CSS harvesting, all-node per-frame measurements, idle motion followers, duplicate image requests or remote-image consent bypass. Measure real work counts on small and representative large scenes; no invented startup speedup. Keep all new/changed modules/functions documented per TSDoc rules. Maintain English, German, French, Spanish, Dutch, Japanese, Traditional Chinese and Russian catalogs. User labels/IDs are not translated. Preserve native focus/input/IME/touch behavior, environment-aware shortcut hints, scanner rules and existing strict tests.

## 12. Implementation packages and acceptance

Use reviewable checkpoints on this same branch:

1. **A — Main integration and native contract.** Record revision/dependencies, preserve upstream changes, inventory all styling consumers, implement native tokens/cascade and run the bounded dual-mode host feasibility probe early.
2. **B — Color sources and migration.** Extend every type/sanitizer/equality/summary/resolver/editor boundary, test reference round trips and explicit adoption before exposing incomplete controls.
3. **C — Palette, semantic slots and previews.** Deliver shared native/React editors, RGB+alpha controls, usage/replacement, reliable paired previews and durable queue behavior. Add bounded opt-in counterpart suggestions if completed safely.
4. **D — Compass underlay.** Implement constant-size clipping, real center/camera/arrival synchronization and tint settings without changing layout or drop semantics.
5. **E — Exact-build acceptance and documentation.** Complete user/theme-author docs and public snippets; optionally add/test gated Style Settings/Style Manager metadata. Report any deferred optional part explicitly. Remove the temporary issue-155 marker before final review.

Every implementation check below is pending; documentation/source review does not satisfy it.

| Area | Required evidence |
| --- | --- |
| Native visual integration | Fresh default light/dark, at least two contrasting community-theme configurations and accent/snippet changes. Compare actual canvas/card/text/gate/connector/label/UI computed values to documented sources. Cover menus, search, history/pins, controls, shadows, outline/mini nodes, focus/hover/disabled and native editor/image exceptions. |
| Cascade / scope | Body and view-local overrides, absent/context-only variables, inherited aliases, explicit fixed/named/theme choices and reset. Main/sidebar/popout/settings/portals; mounted theme replacement and snippet enable/disable. OS appearance cannot override Obsidian selection. |
| Color-source correctness | Literal and alpha stability; undefined versus transparent; reference identity even at equal resolved RGB; distinct non-hex references in meaningful-override checks; palette/semantic changes across all consumers; later lens precedence; invalid/missing/cyclic/future data remains repairable. |
| Picker UX | RGB edit preserves alpha; zero/partial alpha, typed hex/RGBA, incomplete/invalid text, IME, keyboard/focus, native dialog cancellation, one/both resets, narrow/mobile layout, no callback loops, no writes before Save and no automatic opposite-variant overwrite. |
| Dual-mode preview | Actual body-qualified theme and Style Settings selectors, body inline values, user accent, view-local scope and modern computed color formats. Active snapshot matches live; opposite light/dark matches after a real host switch where supported. No global-mode mutation. Inaccessible CSS, host-only scripts, stale snapshots and timeout follow labelled fallback/cleanup. No network/image/font fetch or second graph/index instance. |
| Suggestions, when delivered | Deterministic context-specific output, gamut and serialization checks, ordinary-text/essential-stroke targets, low/zero alpha, impossible constraints, user acceptance/undo/cancel and no subsequent silent recomputation of saved pairs. |
| Migration / durable edits | Existing K-Plex and ExcaliBrain fixtures preserve literals/alpha/dictionary order/geometry. Adoption affects listed standard color slots only. Concurrent palette/lens/node/ontology saves, failed disk write, saved-refresh-pending, duplicate Save, late callbacks and in-use replacement/delete remain safe. |
| Compass geometry / motion | Cardinal assignment, offscreen and boundary apex, zero/wide/tall dimensions, four polygons, bounded vertices, coverage/seams, empty/filtered/collapsed zones. Pan/zoom/Fit/resize/fullscreen/Zen/Sidecar resize, compact/editor arrival and mid-pop, rapid A→B→C/Wander, cancellation, follow, reduced motion and animation off. Apex matches the actual rendered center. |
| Interaction / accessibility | Original background pan/menu, keyboard selection, gate/file-explorer/relink/history/pin drops and stronger DropAreaPreview remain correct. No wedge hit targets. Contrast uses final compositing, non-color cues remain available and forced-colors suppresses decoration only. |
| Work / lifetime | Instrument source/style/layout owners: zero extra source/index/search work, no whole-scene layout or remount for color-only edits, no per-node probe, no idle frames, no accumulating styles/listeners/iframes or duplicate image requests. Verify two-way window migration and repeated open/close/unload. |
| Optional external controls | Neither manager installed; each separately; untouched metadata neutral; explicit gated overrides; reset/disable; fixed K-Plex choices remain explicit; mode/popout behavior; actual distribution retains metadata. No imports or private storage coupling. |

Use production functions and real-browser computed styles/geometry, not source-text assertions alone. Extend `tests/excalibrain-migration.test.mjs`, `tests/on-demand-indexing.test.mjs`, relevant lens/settings-policy tests, `tests/ui-components.test.mjs`, `tests/canvas-menu.test.mjs`, element-motion/center-arrival and Wander tests; register focused color/preview/compass suites in the real test command. Preserve semantic/alpha goldens; explain intentional factory-default differences rather than regenerating fixtures blindly. Tests may measure rendered rectangles at animation checkpoints even though production must not scan them continuously.

Use **Node 22.22.2**, actual dependencies and installed Obsidian declarations: `npm i`, `npm run verify`. Main validation runs `npm run verify:obsidian` on the exact artifacts in a CLI-path-verified disposable vault, then applicable migration/style-operation acceptance and focused theme/palette/preview/compass checks. Reuse `scripts/testing/obsidian/styleOperations.mjs` and native process helpers. Run native/browser drivers serially; record source/artifact/host versions and restore settings/workspace/snippets/test resources on success and failure. Basic render smoke is not feature acceptance.

Up to three residual manual priorities after automation: (1) physical iOS/Android native picker, touch layout and theme switching; (2) visual contrast/compass meaning in light/dark/community/high-contrast themes, including wide parent rows; (3) native picker/focus and moving views/settings between windows and displays. Automate equivalent assertions where possible. Desktop emulation and screenshots do not establish physical paint/touch/memory acceptance.

## 13. Primary references and evidence limits

- [Obsidian writing style guide](https://obsidian.md/help/style-guide): settings/help language, not the CSS design-system specification.
- [Official Colors](https://docs.obsidian.md/Reference/CSS%20variables/Foundations/Colors), [CSS variable index](https://docs.obsidian.md/Reference/CSS%20variables/CSS%20variables), [Settings documentation source](https://github.com/obsidianmd/obsidian-developer-docs/blob/c56c7e770ba25dd0ea392aacf4588f9425970d36/en/Plugins/User%20interface/Settings.md) and [API declarations](https://github.com/obsidianmd/obsidian-api/blob/9abd9605ce081383674aae1ed111c456edde0688/obsidian.d.ts). Declarative settings require 1.13; K-Plex already declares that minimum. Installed types remain the implementation authority.
- Token references: [Canvas](https://github.com/obsidianmd/obsidian-developer-docs/blob/c56c7e770ba25dd0ea392aacf4588f9425970d36/en/Reference/CSS%20variables/Plugins/Canvas.md), [navigation](https://github.com/obsidianmd/obsidian-developer-docs/blob/c56c7e770ba25dd0ea392aacf4588f9425970d36/en/Reference/CSS%20variables/Components/Navigation.md), [tags](https://github.com/obsidianmd/obsidian-developer-docs/blob/c56c7e770ba25dd0ea392aacf4588f9425970d36/en/Reference/CSS%20variables/Editor/Tag.md), [links](https://github.com/obsidianmd/obsidian-developer-docs/blob/c56c7e770ba25dd0ea392aacf4588f9425970d36/en/Reference/CSS%20variables/Editor/Link.md), [graph](https://github.com/obsidianmd/obsidian-developer-docs/blob/c56c7e770ba25dd0ea392aacf4588f9425970d36/en/Reference/CSS%20variables/Plugins/Graph.md).
- [CSS custom-property invalid values](https://www.w3.org/TR/css-variables-1/#invalid-variables), [CSS Color 4](https://www.w3.org/TR/css-color-4/), [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html): validation, compositing and recommendation constraints.
- [Excalidraw StylesManager](https://github.com/zsviczian/obsidian-excalidraw-plugin/blob/master/src/core/managers/StylesManager.ts), [Style Settings paired colors](https://github.com/community-archive/obsidian-style-settings/blob/8ecefa956cf663ed11cb015769b3959df6419c40/README.md#variable-themed-color), [Style Manager](https://github.com/emarpiee/obsidian-style-manager), [JSON Canvas color/reference distinction](https://jsoncanvas.org/spec/1.0/#color) and [Advanced Canvas custom colors](https://github.com/Developer-Mike/obsidian-advanced-canvas#custom-colors): precedents, not dependencies, copied implementations or competing palette stores.

Preparation evidence: authenticated PR diff/comments and branch/main comparison; current source/API/manifest inspection; official CSS/writing/accessibility/color references; Excalidraw and both styling-manager source/documentation review. The prior assignment records a separate 508-case design-only geometry prototype; that historical equation check is not current production, browser or motion evidence. A separate standalone CSS-cascade fixture was attempted during this review, but headless Chromium did not return within its bounded launch window; no pass is claimed from that attempt. No production npm build/test suite, Obsidian native run or physical-device acceptance was performed. The available Node was 22.16.0, not the required validation runtime.

## 14. Return and completion checklist

- [ ] Record integrated branch/base/head, capabilities, relevant PR decisions and initial dirty-file state.
- [ ] Implement required packages with focused regressions; identify any deferred optional suggestion/external-manager work explicitly.
- [ ] Record architecture/component-reuse/TSDoc/localization self-review, changed files, actual commands/results and unavailable checks; return uncommitted changes unless separately authorized.
- [ ] Main agent independently reviews the exact return and validates exact built artifacts, native previews, settings/migration, compass motion and zero-work color changes.
- [ ] Publish user/theme-author guidance; remove the temporary marker and replace the PR's planning summary with actual outcomes and limitations.
- [ ] Verify remote files and intended PR/branch head after authorized publication. Keep draft until required acceptance; no merge, release or issue closure merely because this handoff exists.
