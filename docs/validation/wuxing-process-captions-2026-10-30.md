# Wu Xing circular process captions, 2026-10-30

## Delivered scope

Fork `kplex-wuxing` version 0.3.1 on `sync/upstream-2026-10-30`. Changes are saved locally and uncommitted; no GitHub push or PR.

- Five adjacent generating edges, including Water → Wood, carry measured process captions. Captions follow their edge tangent, flip upright and reserve a rotated footprint outside category panels.
- Double-click or keyboard-activate a caption to open a small native editor directly. Saving uses the captured preset configuration queue and persists only that pair's prose; cancellation and stale owners are guarded.
- Circular flow controls include the closing edge. Explicit blank captions suppress that edge's text. Existing guide identities and semantic graph relationships are preserved.
- Existing live `wuxing` preset is named “五行 · 过程导航”; all five edges initially say “促成下一丛的出现”. Relative labels and regulating guides remain hidden. Note statuses, categories and note content are unchanged.

## Validation

Node 22.22.2. Final focused pure geometry + mounted production UI + native editor suite: 65/65 passed. Final ESLint and real production build passed. Architecture suite and dependency boundaries passed earlier in this feature run.

Full `npm run verify` is NOT green. Release, architecture, core (130), main (1680), UI (405), and source (357) lanes passed before final measurement-only refinement. Browser storage lane found the existing on-demand folder-order inventory assertion, already reproduced against untouched upstream in the sync report. A metadata recovery case hit a Chromium startup timeout; its isolated rerun passed (1/1). The browser on-demand process then stalled after completed test 279 for over 11 minutes and was terminated; that process's remaining cases are unverified. No assertions were weakened. This full lane is a recorded limitation, not evidence of a clean full regression.

## Native acceptance in dumodal

CLI was enabled by the user. Refreshed the native manifest and reloaded the actual installed fork: runtime version 0.3.1, caption editor present. Used the existing current note and selected the existing Wu Xing preset. Used the Fit graph control to show the complete pentagon.

Observed five literal captions in Obsidian, rotations +36, -72, 0, +72, -36 degrees. Each Chinese text measured 288.01 local pixels within a 323-pixel text clip, so all characters fit. Screen font was approximately 11.19 pixels at the full-diagram overview; ordinary canvas zoom remains available.

Native double-click opened the focused caption editor without the full Settings page. Saved a temporary edit on Water → Wood, verified the actual settings file, unchanged categories and unchanged center note, then restored the opening preset through the same native queue. Receipt: `native-edit-receipt.json`. Screenshot: `native-final-fit.png`.

Installed `main.js`, `manifest.json`, and `styles.css` were byte-verified against dist; artifact copying preserved settings. Only the existing preset was subsequently updated through the plugin API.

Task receipts and logs: `/Users/dumo/Downloads/dumodal-Codex/2026-10-30-kplex-process-captions/`.

Final installation backup: `/Users/dumo/Downloads/dumodal-Codex/2026-10-30-kplex-process-captions/before-install-1793301820758`.

Artifact SHA-256:

```json
{
  "main.js": "ba5425c2f023245e8728d061a40bd942d5d4cbb70c0f8e0922c310386621e769",
  "manifest.json": "1b2fa37480de059c4c817891a3e3fca754438ddc87a5226d2a096ea0b39cb76d",
  "styles.css": "975679136301e888d5c39e8c9da3836fe7fb53e83d9817e9d1d935fea383d80b"
}
```

## Subsequent visual refinements and adaptive sizing

Later local changes unify relation/guide fonts, soften history fills, hide the canvas heading, replace the center phase badge with one layered border, and route Facets semantic edges as dashed free card-to-card connectors. Cross-links are enabled in dumodal. Native inspection confirmed a transparent borderless editor placeholder under one colored editor shell, hidden physical gates, and an actual drafted label at the straight segment midpoint. Semantic data is unchanged.

Added optional preset `sizing: "fixed" | "content"`; absence preserves existing fixed dimensions and scrolling. Content mode measures only each area's admitted note/editor/badge envelopes, chooses multiple columns and expands its bounds; empty regions compact. Existing manual dimensions are ignored in content mode and retained for switching back. Native preset editor exposes Area sizing with Fixed size with scrolling / Fit displayed notes. Fixed width/height sliders are hidden in content mode. Copy is localized in all eight catalogs.

Final affected suite (preset geometry, manager UI, shared Wu Xing browser renderer, localization): 91/91 passed. Real production build and ESLint passed. Native dumodal is set to content mode; six visible area surfaces had equal client/scroll heights and widths, confirming no internal overflow for the actual current note. Screenshot: `native-adaptive.png` in the task receipts directory. This does not bypass the existing admitted-neighbor limit or expand graph depth. Previous full regression limitations remain as recorded above.

## Fixed bottom diagnostics and compact spacing

The optional `diagnostics.dock` preset value now presents a horizontal screen-space strip between the bottom-left layout button and bottom-right zoom controls, without a footer row. Original diagnostic world frames and fit-only badges are suppressed while canonical occurrences and real inbound edges remain in the shared scene. Dock cards reuse existing-note navigation and native drag payloads; finite dashed continuations update through the owned camera frame, ResizeObserver and strip scrolling, without polling/index acquisition. Docking is a localized preset toggle and defaults off for old presets.

Region spacing now admits 0–200 with a step of 2 in both preset and on-canvas controls. With outer guides hidden, circular packing uses actual axis-aligned card envelopes rather than conservative enclosing circles, while preserving non-overlap and the attention editor envelope. Guides-on layouts retain their existing caption spacing policy.

Validation: final affected pure geometry and mounted production browser recheck 50/50 passed, including new fixed-tray navigation and zero-spacing non-overlap cases. Remaining manager/localization cases passed in the preceding combined run. Production build and ESLint passed. Native dumodal confirmed no legacy world Diagnostics frame, no history footer, a fixed 36px-high Diagnostics strip 16px above the viewport bottom, unchanged strip position on zoom, and no overlap with right controls. Actual Region spacing input minimum is 0. The user is actively tuning the current value; do not overwrite it during later installation. Screenshot `native-fixed-diagnostics-compact.png` is in the task receipt directory.

## Adaptive width/height controls correction

Content mode originally chose columns from note count and ignored the visible width/height controls. Corrected it to use `regionWidth` as a measured column-width target and `regionHeight` as an effective minimum; full note/editor envelopes can still require a wider single column or taller region. Narrower targets now produce fewer columns and more rows without an internal scrollbar. The width control is labeled Region width target in content mode, and both width/height are exposed in the preset editor. Existing per-area manual dimensions remain ignored without deleting them, as before.

Added a regression covering narrow versus wide packing, row growth and minimum height. Final affected suite: 96/96 passed; production build and ESLint passed. Installed the exact three dist artifacts with user settings preserved. Native loaded regions had varying widths and actual minimum heights responding to the user's active changes. Current UI values are user-owned and must not be reset to values mentioned in earlier receipts.

## Per-connection presentation annotations

Existing Facets semantic connectors now support double-clicking a line or its text to open the guarded native caption editor; the label also supports Enter/Space. Per-edge literal prose is stored only in the active preset's `relationshipCaptions`, keyed by bounded canonical endpoints, original field, relation type and normalized evidence direction. Reversing focus preserves the same identity; distinct evidence fields cannot borrow a caption. Captions do not create a link or modify a note, status, ontology registration or underlying role. Clearing the input deletes only the presentation override and restores the original label policy. Both ordinary/cross connectors and screen-fixed diagnostic continuations support the same editor. CJK-aware label backing dimensions prevent narrow ASCII measurement from cutting the background short.

Validation: combined preset/manager/browser/localization suite 99/99 passed. After adding diagnostic-continuation editing, final mounted browser suite 15/15 passed; final production build and scoped ESLint passed. Native acceptance saved a temporary caption, confirmed disk persistence and visible text, reopened it, then restored the opening override state by clearing through the same editor. SHA-256 verification of 14 bounded scene Markdown files confirmed all were unchanged. Receipt: `native-relationship-annotation-receipt.json` in the task directory. No example prose remains in user settings. Source remains saved locally and uncommitted; no push or PR.

Annotations are preset-local presentation values. Their current canonical identities use note paths and original evidence fields; this feature does not introduce a separate global edge database or automatic interpretation/registration of the prose as ontology.

## Real mouse double-click correction

A normal primary mouse press on an editable edge previously bubbled to the canvas pan owner, which captured the pointer. The initial programmatic `dblclick` tests bypassed native pointer capture and therefore did not prove real-user double clicking. Editable edge hit targets now retain primary mouse input, and opening annotations retires the existing hover tooltip. Added a separate Connection annotation action to the actual edge context menu.

New browser acceptance drives Input.dispatchMouseEvent press/release pairs with click counts 1 and 2 against an actually hit-tested unlabeled edge; it passed with exactly one editor request and unchanged camera. Native Obsidian acceptance also used actual CDP mouse events, not a DOM-dispatched dblclick. It opened the Connection annotation form with an editable text input and no old hover tooltip. No caption was submitted. Receipt `native-real-doubleclick-receipt.json` is in the task directory. Production build and scoped ESLint passed.

### Loose directional clusters and quieter relation captions

- Added optional preset `arrangement: scatter`, with seeded measured-envelope packing, hidden category outlines, stable Five Phase directions, no internal scrolling and preserved property drop targets. Grid remains selectable in layout settings.
- Activated scatter only for the existing dumodal Wu Xing preset and set the actual base connection label font to 11 px. Native DOM confirms relation caption and category count both 11 px, five outlines hidden, no scene error. Existing spacing, width and other user choices preserved.
- 86 focused preset, localization, browser and property-drop tests passed; production build and Obsidian lint passed. Final artifacts installed with byte verification and live view reloaded. No note metadata changed by this presentation update.

### Optional hidden group chrome

Added preset-scoped `hideGroups` and a "Hide Wu Xing groups" checkbox beside cycle-guide/tint appearance controls, plus the native preset editor. It hides category names, relative labels, both count displays and filter controls together, preserving note layout, property drop areas, relation labels and Diagnostics. Enabled on the existing dumodal preset via the live guarded settings writer. Native verification: 10 category text elements and all 5 category tools have computed display none; 14 note cards remain, Diagnostics remains, no scene error. Installed assets byte-verified. No Markdown or ontology changes.
