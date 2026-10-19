# Section layout and native-base upgrade — PR #189

The implementation follows merged #149 (`a8e0efa`). Runtime checkpoint `0048964`
contains the final large-font correction; subsequent native-harness/documentation changes do
not change runtime behavior. The final PR description records the delivered head and artifacts.

| Request | Implemented behavior |
| --- | --- |
| Section density | Related pills gain meaningful horizontal/vertical whitespace below maximum density. Maximum-density endpoints and the independent empty inter-section gutter are retained. |
| Cropped text | Geometry reserves line boxes and border width. The more specific canvas `line-height: 1.02` override is removed, so native views inherit the same 1.2 line-height used by measurement. Wrapped labels reserve two lines. |
| Section gate counts | Visible section-target occurrences resolve their current canonical page for counts and finite cache-only presentation demand. Synthetic heading gates remain section-owned. Missing canonical pages remain unavailable. |
| Section previews | The existing native hover event includes the heading's existing Obsidian subpath. |
| 0.2.0 appearance | The existing queued appearance initializer adopts native base colors once, preserving current semantics, non-color styles and all saved themes. Selection, appearance and completion marker persist together. Later versions retain manual selection. |
| Fresh installs | A pristine install keeps Default theme only. First-run ExcaliBrain imports retain their User-theme backup. Neither first-install path displays an upgrade popup or migration message. Actual loaded K-Plex data determines notification eligibility. |
| Wheel over lists | Ctrl/Cmd-wheel uses existing focal-point zoom over both bounded-list types. Unmodified list scrolling and embedded editor/modal scrolling retain their native routing. |
| One-sided layout | Friends and challengers share one continuous left list, scroll position, count and filter. Semantic roles, connector styles and section provenance remain unchanged. Moving an existing challenger within that list does not relink it as a friend. |
| Parent tooltip | Top/parent gates prefer below; bottom/child gates prefer above. Existing delay, Alt/Option gating and edge fallback remain. |

The release version remains 0.1.3 in this feature branch. Adoption is gated on 0.2.0 or later;
this PR neither publishes a release nor changes release metadata. All eight locales and
`docs/APPEARANCE.md` are updated.

Validation performed:

- Real `npm run build` with installed Obsidian types: pass, including after the final CSS fix.
- `check:release`, `check:architecture` (7 cases), `check:core` (130 cases): pass.
- `lint:obsidian`: pass. Final configured ESLint scan of every changed runtime owner: pass.
- Established indexing fixture lane and primary regression lane: pass; primary reports
  **1,153 pass / 0 fail**. Established serial UI/browser lane: **192 pass / 0 fail**.
- Final theme/localization/layout/viewport checks: **73 pass / 0 fail**.
- Final complete affected `native-theme` and `ui-components` suites: **27 pass / 0 fail**.
  The new large-font regression fails before removing the canvas override and passes afterward,
  across ordinary/central nodes, font sizes, borders and wrapping.
- The configured native staging/command/render owner passed in `kplex-test-small`.
  Its verification hook checked the recorded scoped-suite results; the stock all-suite
  `verify:obsidian` command was not used. The unrelated #149 foreground-startup browser failure
  was not rerun, as requested. This is scoped validation, not a claim that every storage-browser
  test or an unmodified full `npm run verify` completed for this PR.
- Exact-build native `sectionExpansion.mjs`: **11 cases pass**: shared lateral list and challenger
  filtering, Ctrl/Cmd overflow-wheel routing, actual fold controls, ordinary/preamble grouping,
  canonical numeric counts, modified heading hover anchor, large-label line boxes, gate tooltip
  preferences, stationary inbound add/remove and visibility round trip. The presentation-only
  interval recorded **0 Markdown reads, 0 parses and 0 index rebuilds**.
- Exact-build native `themeUpgrade.mjs`: **4 cases pass**, using actual Visual styling controls:
  one-write adoption, selection/dismissal, later-version retention and fresh Default-only behavior
  without popup or visible migration row. Tests exercise the production queue with prospective
  release versions; they do not misrepresent the installed 0.1.3 manifest as a released 0.2.0.

The native large-label failure measured a 23px line box against 26px content. Removing the
specific override gives a 27px line box in the same fixture. Earlier failed probes are retained:
one staging receipt initially read a PowerShell UTF-16 log as UTF-8; native upgrade harness
corrections respected its simulated startup fence and the actual mounted Settings owner.
These harness corrections did not change production lifecycle or persistence behavior.

Environment: Windows, Node 22.22.3, Obsidian 1.14.4 (installer 1.14.0), explicitly selected
disposable `kplex-test-small`. Native probes restore their own settings, controls, leaves and note
fixtures. Private reports, original configuration backups and failures remain outside Git; the
PR description records final restoration and durable evidence verification. No personal vault
was accessed and no comparative performance experiments were run. The work-count assertion is
not a performance-improvement claim.

Remaining platform coverage: macOS, physical phones/tablets and physical trackpad/wheel gestures
were not tested. Ctrl and Cmd wheel routing used native DOM events on Windows. Popout tooltip
ownership retains the existing browser/owning-document coverage; the new native acceptance ran
in the main window. Recheck large glyphs under other fonts/themes and native hover popovers on
those platforms during hands-on acceptance.
