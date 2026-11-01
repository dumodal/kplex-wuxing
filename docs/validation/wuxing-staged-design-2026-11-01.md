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
