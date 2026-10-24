# Sidecar viewport centering

Prepared by Zsolt's Codex Agent. Accepted base: d48f76641df149dd5bb4d000fe9764251ece9807 (merged PR213). Branch: 2026-10-24-sidecar-viewport-center.

## Cause and change

Ordinary pane resizing intentionally preserves a manually positioned camera. Autozoom resize handling also requires an existing automatic-fit certificate; manual pan/zoom retires that certificate. Consequently opening or closing Sidecar does not reliably center the Plex in its changed viewport.

App now supplies its existing per-view Sidecar open/closed state to PlexGraph. Only a state transition requests framing, after two animation frames in the viewport's owning window so native layout and ResizeObserver can publish new geometry. The callback reads the latest composed scene/settings. Autozoom enabled reuses the existing fit owner; disabled preserves the exact camera scale and translates the central occurrence to the viewport midpoint, including nonzero focal coordinates.

Pointer, wheel or keyboard input cancels the pending request. Navigation, a superseding transition and unmount cancel the original window's frames and listeners. Completion removes those listeners immediately. Initial mounting, unrelated Sidecar notifications, graph publications and ordinary splitter drags do not initiate this request. Disconnected or zero-size viewports do not write a camera. Existing display transitions, native document/fold ownership, indexing and storage paths are unchanged. No new setting or user-facing string is needed.

## Actual validation

Node22.22.2, actual installed dependencies:

- Focused production camera/Sidecar callbacks: `node --test --test-concurrency=1 tests/viewport-fit.test.mjs tests/sidecar-fold-ui.test.mjs`:18/18 pass, no failures/cancellations/skips. Cases cover narrower/wider/shorter/taller viewports, manual prior cameras, autozoom on/off, latest-render framing, input/navigation retirement, hidden geometry, cleanup and ordinary-resize controls.
- Headless Chromium UI checks: `node --test --test-concurrency=1 tests/display-modes.test.mjs tests/sidecar-attach-controls.test.mjs`:8/8 pass. These retain display-mode camera/root/state preservation and Sidecar control geometry; they are not native Obsidian acceptance of the new behavior.
- `npm run check:architecture`:7/7 pass;151 migrated roots,273 reachable files,0 violations.
- `npm run lint:obsidian`:exit0.
- `npm run build`:exit0, including TypeScript against installed Obsidian declarations and the actual production bundle.
- `git diff --check`:pass.

First focused attempt:17/18, because a new strict floating-point equality compared449.99999999999994 with450. The new geometric assertion now uses1e-9 numeric precision; exact zoom equality remains. No existing assertion or performance threshold changed. The original log is retained privately. First sandboxed build could not resolve the source because esbuild was denied ancestor-directory access; the normal build rerun outside that sandbox passed with the pinned Node directory first on PATH. Neither unsuccessful attempt is represented as a pass.

Final production SHA-256:

- main.js: f43871726a44a8b033f45854fb3ce4f3dfbd4138610abe3a3e50e2b30d79c8a9
- manifest.json:843d327e4a634a6e28cd645be8c533adc873a1ac1c6498502b5ca44e70120109
- styles.css:88b61aa508ede97b10fbd30c957d14ba19b257aa26f5ee9f547f13faa0f43974

Private logs under %TEMP% use prefix kplex-sidecar-center-. No indexing benchmark, performance campaign or complete broad verification was run for this UI-only change.

## Remaining native evidence

Foreground access remains on hold until the maintainer explicitly says ready. No staging, reload, foreground Obsidian operation or native acceptance has run. After ready, use existing guarded disposable Small and the exact artifact above: test ordinary open/close in all four positions after manual pan/zoom, with autozoom both enabled and disabled; verify focal centering and unchanged scale when disabled. Check modifier fold/unfold-close, rapid toggle/input cancellation and retained editor/focus/layout cleanup. Approximately5-10minutes of foreground work remains. Main-window/popout native layout timing and physical Mac/mobile behavior remain unverified. No merge, release or production deployment is authorized.
