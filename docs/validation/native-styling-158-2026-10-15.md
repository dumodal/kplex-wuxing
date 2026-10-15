# Native styling and Idea Compass — PR #158

**Implementation in progress; keep the PR draft.** Checkpoints A and B deliver native chrome, the preview-only theme sampler and backward-compatible color contracts and queued persistence. Live editor integration, fresh native defaults and compass sectors remain pending. No merge, release or issue closure is authorized.

## Checkpoint A

The branch integrates `main@867ef55` through `689399d`. Existing graph semantics, geometry, saved literal colors and imported style precedence remain unchanged. Native chrome now consumes Obsidian surfaces, text, controls, borders and shadows. Public K-Plex overrides inherit from body or the view instead of being masked by root declarations. This checkpoint does not yet change fresh graph/canvas defaults.

`ThemePreviewSampler` is an editor adapter, not a live graph dependency. It samples current colors directly and resolves two modes in a bounded, script-free isolated document using already loaded readable CSS. CSP blocks resources; no host appearance changes, vault reads, graph engine, remote requests or saved RGB substitutions are part of production sampling. The editor owns cache invalidation and disposal. Missing/inaccessible context, limits and inline host-mode colors lower alternate-mode confidence to **Estimated**. Arbitrary host scripts and selector context cannot be reproduced reliably.

### Verification

Windows 10.0.26200, Node **22.22.2**, Obsidian **1.14.4**, Electron **43.3.0**, Chromium **150.0.7871.212**; only the authorized disposable `kplex-test-small` vault was used.

| Check | Result |
| --- | --- |
| `node scripts/testing/obsidian/verify.mjs` | **1,902 tests**, no failures/skips/cancellations; architecture, core, official lint, production build and exact staged native smoke pass |
| `node scripts/testing/obsidian/foreground.mjs` | Six foreground scenarios pass during held background inventory; zero foreground full flushes; owned fixtures/controller removed |
| `node scripts/testing/obsidian/themePreview.mjs` | Six Default/Minimal/Things × main/popout combinations match actual native light/dark switches |
| Focused tests | Public body/local overrides/reset, detached controls, explicit literals, modern colors, alpha, isolated resource blocking, cancellation, inaccessible/limited CSS and inline-mode confidence |
| Cleanup | Original settings/enabled-plugin bytes match; appearance/workspace restored; owned frames/popout/controllers removed; temporary awake lease released without power-policy changes |

The initial full run found an obsolete test requiring root variable declarations. Its correction asserts inherited consumer hooks; it also exposed and restored the toolbar's `--kplex-panel-2` hook. Focused tests and the complete second run pass. Raw failed observations remain preserved.

Exact staged SHA-256:

| Artifact | SHA-256 |
| --- | --- |
| `main.js` | `4cb08ded50af580470c6049b3e10a88d9f0d356399368442379e0515fa8f2711` |
| `styles.css` | `992d7b85fef40e9e2aab65f1063871ad34079c027e83447e113ecbd6cece170a` |
| `manifest.json` | `19d9ecce5557733e0ff0f2e27155e635c30158c3cfa6fbca0f11c16e4dedfd2c` |

The sampler source SHA-256 is `3944031c50beeb0fc190a3826e92c4c99d38b49f46b4c500ecefa2c15f0e92c7`. It is compiled separately by the native feasibility driver; it is not imported into the live plugin bundle until editor integration. The unchanged `main.js` hash therefore proves preserved runtime code, not delivered palette UI.

### Reproduction and evidence

Use the [contributor native-test setup](../../CONTRIBUTING.md#desktop-cli-setup-windows-and-macos), all three explicit disposable-vault variables and a fresh `KPLEX_HOST_REPORT_DIR` for each command above. Run browser/native lanes serially. For community CSS sampling, set `KPLEX_THEME_FIXTURES` to a local folder containing `Minimal.css`, `Things.css` and its manifest; the driver verifies hashes and rejects external resource URLs/imports. These fixtures are loaded temporarily in each native document, not installed as themes or companion plugins.

| Public fixture | Pinned source | SHA-256 |
| --- | --- | --- |
| Minimal | [theme.css at 93321bd](https://github.com/kepano/obsidian-minimal/blob/93321bdc23fc879966e1e3aa0cfeda77012f540f/theme.css) | `b63ef8a162529a06a945b51a4dacf73333b1d273660be26c86def455584996a8` |
| Things | [theme.css at 9b8bef9](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css) | `b98c8b9ba0c3cc67ec42cbe34d5a1aea27a903bc7256351162e6584fb0b686d8` |

The sampled CSS estimate was **2.29–2.72 MB in UTF-16 units**, across 6–8 sheets. This is copied CSS size, not measured peak memory or a speed claim. Production budgets are 8 MiB copied CSS, 128 sheets, 30,000 top-level rules and 64 requested tokens, with a three-second frame-load deadline. Over-budget content is excluded and confidence lowered.

Complete local evidence: `%TEMP%\kplex-158-checkpoint-A-evidence.zip` — **222,442 bytes / 24 entries**, SHA-256 `a3151777b1c4f0e0a55ccd605e4f06a992dbbe6069e14d494972a4a94e010cff`. Exact entry sets, ZIP CRCs and every manifest checksum pass. It contains source snapshots, successful/failed logs and native reports, pinned fixture metadata and reproduction instructions. It excludes handoffs, note/cache payloads and private configuration backups. The archive has not been published.

### Remaining acceptance

Checkpoint A is a foundation, not complete acceptance of #155/#90. Paired editors, settings concurrency, live palette repaint, migration/adoption, compass motion and their resource/lifetime tests follow. Minimum Obsidian 1.13, macOS and physical iOS/Android acceptance remain open. Desktop theme-token parity does not prove full community-theme UI contrast, native touch/picker behavior or arbitrary companion-script compatibility.

## Checkpoint B

Typed literal, theme-variable and named-palette identities now pass through existing node/link/lens contracts, sanitizers, summaries and persistence without flattening references to sampled RGB. Literal edits preserve exact alpha. Palette IDs are stable; undefined inheritance differs from transparent. Optional versioned preferences retain unknown future payloads verbatim and read-only. Foreign graph imports preserve local palette/semantic/compass preferences. Semantic cycles and malformed new palette writes fail before storage.

The existing serialized style queue remains the only writer. Operations capture current appearance fields at their queue boundary, save before publication and retain unrelated concurrent changes. Focused regressions exercise reference/alpha round trips, import isolation, overlapping saves, future/null payloads, validation failure and retry. This checkpoint retains existing graph defaults and does not claim delivered palette UI or a paint-only render path.

Node **22.22.2** full verification passes **1,910 tests** (7 architecture /128 core /846 general /70 UI-browser /334 source /525 source-browser), official lint, installed types, the real production build and exact staged Windows smoke. The native style-operation lane passes **14 cases**. The native import lane passes all **six scenarios**, including rendered style managers, unchanged alpha-preserving save, rendered node/link appearance and persistence after reload.

Two initial portable failures (a touched lint type and an explicit test-module inventory) were corrected before the complete passing run. The first native import attempt revealed that its on-demand fixture had no source lease: metadata existed but the expected graph page had never been requested. A separate diagnostic confirmed that the normal existing demand lease acquires the fixture. The reusable migration driver now owns/releases that lease. The original assertions and timeout remain unchanged; no production indexing behavior or forced full build was added. Failed attempts and a failed diagnostic search control are preserved separately from passing evidence.

Exact staged `main.js` SHA-256: `77acef7a4c54aae198352e1365b8cbbdfc9a25efec5decb3c0471164691a366c`; CSS and manifest match A. Original configuration/enabled-plugin bytes are restored, original effective settings compare equal (apart from the new in-memory default), all owned notes/controllers are absent and the index returns to local readiness. The temporary awake lease is released. No personal vault was accessed.

Complete local B evidence: `%TEMP%\kplex-158-checkpoint-B-evidence.zip` — **665,904 bytes / 60 entries**, SHA-256 `f1ac010ef4c245dfed48f383d56df14ada229354cb77a48ba3f66d4e7b43a254`. Source snapshots, successful/failed verification and diagnostic logs, reproduction metadata, cleanup and lifetime receipts are preserved. Exact entry sets, CRCs and all per-file checksums pass. Private configuration backups, handoffs and note/cache payloads are excluded. This archive is not published. Minimum-host, macOS and physical-mobile acceptance remain pending; no CPU or memory saving is claimed.
