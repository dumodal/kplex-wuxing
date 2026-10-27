# Latest slider values and shared predicate expression editor

Starting checkpoint c18efc89a7dc5d76d161174d0772078f48e38d43 on the existing PR222 branch. No change to classification, predicate parsing, source acquisition, measurements, canonical relationships or native editor ownership.

## Behavior

The shared LayoutSlider immediately displays its newest local input. An asynchronous callback finishes before another begins; only the newest unstarted value is retained. Intermediate positions do not enter the existing settings writer. Axes remain independent; synchronous controls retain synchronous callbacks. Closing the rail retires UI updates but finishes its latest explicit intent when its captured canvas/view target is still current. View/root/state retirement rejects stale work through the existing writer guard. Normal save errors keep their existing actionable Notice and committed value; no automatic retry loop or competing persistence owner.

CanvasViewLayoutControls keeps registered numeric limits/formatters, shared controls and queued settings writes. Compass's existing synchronous/debounced local preview path remains. All registered view sliders use the same delivery component; browser cases cover both Mind Map density axes and Facets region width.

PredicateExpressionField is the shared Code field for lenses and Facets category rules: label above a full-width, vertically resizable, themed monospace textarea. The original Simple/Code editor, parser, validation, native preset draft and atomic writer remain. Property name/assignment and value mapping controls appear only for relevant sources, retaining hidden draft values when switching back. No new strings or translations.

## Checks

Node22.22.2 / real installed dependencies:

- 48 focused tests PASS: latest-slider-value, layout-control-touch, layout-control-touch-browser, canvas-view-settings, facets-manager-browser, predicate-conditions-browser.
- Three actual shared-renderer browser cases PASS: Mind Map vertical/horizontal density and Facets region width. Eight trusted native range key events produce exactly first/latest writes; older completion cannot rewind the thumb. Final focus, center DOM, attention, camera and body/scan/source acquisition counters remain unchanged.
- Native-manager browser checks at960/620/360px verify full width below the label, monospace/readable height, mounted typing/focus, hidden source field restoration and Cancel without save.
- Real production build / installed Obsidian types, full official Obsidian scanner and architecture7tests/211roots/391reachable files/0violations PASS.

The first scanner run found a Promise-returning discrete checkbox callback; the callback now explicitly discards its already-owned promise, then build/scanner/architecture pass. Earlier fixture setup corrections are test-only (native dropdown change event and initial view-session revision synchronization); no production assertions/deadlines weakened.

Exact-build Windows visual/native verification and Help deployment are the next delivery step. Full regression/CI remains deferred. Both source222 and Help4 remain draft/open/unmerged. Physical mobile/macOS/minimum-host and known215 limitations remain separate; these checks do not certify those environments.
