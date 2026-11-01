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
