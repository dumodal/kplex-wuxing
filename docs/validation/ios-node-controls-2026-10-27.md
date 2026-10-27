# iOS node-control sizing

Baseline: accepted main `ccb7189b5ad8722625ad9d1b669d1c8568be52bb` (PR #226).

The reported iPad screenshot shows the section disclosure stretched horizontally and an oversized rectangular editor-button background. Inspection of the installed Obsidian `app.css` found `.is-tablet button:not(.clickable-icon) { padding: var(--size-4-1) var(--size-4-5); }`. Its specificity exceeds the previous single-class node-control padding rules. With equivalent 4px/20px tablet padding, the actual Compass editor button reproduced at 42x16 in Chromium before the fix.

The shared ThoughtNode controls now use a narrowly scoped reset that outranks that tablet rule: zero padding/margin, border-box sizing and native appearance disabled. The editor control has explicit 16px minimum/maximum dimensions. Section glyph sizes remain 10px (fine pointer) / 14px (coarse pointer); branch disclosure retains its 16px symbol and separate 44px transparent hit target. No view API, action, layout measurement or metadata behavior changed. The obsolete comment attributing tablet padding to WebKit minimum dimensions was corrected.

## Validation

- Node 22.22.2, real installed dependencies.
- New production-component browser checks insert the tablet rule **after** plugin CSS and cover Compass, Mind Map and Facets, with fine and coarse pointers. Both reproduced the 42px editor width before the fix and pass afterward.
- Existing trusted Chromium touch check passes: one tap in the transparent branch target folds once without navigation; the target does not overlap adjacent cards/gates.
- `npm run build` (including actual TypeScript/Obsidian declarations), `npm run lint:obsidian` and `npm run check:architecture` pass (9 audit cases, zero architecture violations).
- Affected browser lane: `node --test --test-concurrency=1 tests/view-interactions-browser.test.mjs tests/section-view-browser.test.mjs`: **30/30 pass**.
- Full regression remains deferred under the maintainer's standing instruction for these targeted changes.

## Physical iOS acceptance remains pending

These checks demonstrate the CSS cascade correction in Chromium, not Safari/WKWebView behavior. Automated iOS testing is unavailable. On the iPad, verify the Compass section plus/minus stays square, editor backgrounds fit their icons, and both activate once. Also inspect Mind Map's chevron and editor icon, including folding through its larger invisible touch area; confirm ordinary note/gate taps remain independent. Check normal/hover/focus appearances with the device's actual theme. No production vault content was modified.

## Help deployment

Exact artifacts copied and plugin reloaded in `kplex-help` at `2026-10-27T20:02:35.132Z`. The same leaf, center/live root, Compass view, remembered Facets preset, 37 cards / 33 visible and camera transform were preserved. No notes edited or navigation performed; user-owned settings/workspace and shortcut deletions excluded from publication.

- `main.js` SHA256: `f5a5301296cfa1155fee72ed6d95131670c57e15cf06ac5832bb3b633bba727b` (unchanged).
- `styles.css` SHA256: `d300b29c863d73b89d1c0cfc0851171726ca21dd6867a5744c4ac6b780ee2ab1`.
- Manifest remains 0.3.0. No release or merge performed.
