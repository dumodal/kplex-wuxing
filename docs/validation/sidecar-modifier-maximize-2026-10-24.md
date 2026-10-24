# Sidecar modifier-click maximize

Prepared by Zsolt's Codex Agent. Base: 6fa936d6522ba45f2c6bb2dfb853671e5218b055 (merged PR211).
Branch: 2026-10-24-sidecar-modifier-maximize.

## Behavior and ownership

Holding any Alt/Option, Control, Meta/Command or Shift flag when selecting Open Sidecar opens its ordinary managed native pane, waits for existing layout/source ownership checks, then uses the existing Fold K-Plex tab group owner. Modifier-selecting the native Unfold control reveals the exact captured Plex and closes only its managed companion. Ordinary clicks and commands keep their existing behavior.

React dispatches a validated boolean maximize invocation argument through the existing action manager. It is not persisted. React and the native recovery control share one stateless event-modifier predicate. No global key listener, setting, command ID, document operation, indexing owner or storage behavior changes.

The opening continuation retains document-session, revision, native leaf, view and generation guards, and cannot fold during a nested moving lease or after a superseding open. Recovery retains the existing delayed-reveal focus/incarnation guards and closes only the captured managed leaf. Unsafe fold arrangements remain expanded. Unrelated native tabs are never closed; maximizing is the existing two-click result within the managed pair, not global workspace maximization.

Both relevant accessible tooltips include ALT/OPT+click, as explicitly requested by the maintainer; all four modifier flags and combinations are accepted. This literal dual-platform hint is a deliberate task-specific exception to the usual environment-specific shortcut formatting rule. Both strings are maintained in English, German, French, Spanish, Dutch, Japanese, Traditional Chinese and Russian. No duplicate HTML title is added.

## Validation checkpoint

Node22.22.2 and real installed dependencies. Focused production-action/native-owner/localization tests pass110/110, zero failures/cancellations/skips. Coverage includes all16 modifier combinations, unmodified command/click defaults, invalid action arguments, moving/layout completion, source/owner/view-generation supersession, unsafe topology, held reveal, genuine newer native selection and preservation of unrelated tabs.

The first focused attempt was109/110: its new focus-supersession fixture reselected the same sibling already focused by folding, so it had not changed the captured selection. The fixture now selects a different existing native leaf; the no-close assertion remains unchanged. Both private logs are retained. A shell encoding check also caught damaged non-ASCII tooltip literals during preparation; all8 catalogs were repaired through ASCII-safe Unicode serialization before the passing corrected run. No such build was staged.

The real-dependency type/build check passed before that localization-only correction. Complete renewed npm run verify is running, including the final exact production build. Do not treat that pending result as passed or use an earlier artifact as final acceptance.

The existing guarded Windows sidecarFolding driver has an opt-in KPLEX_SIDECAR_MODIFIER_ONLY matrix: actual Electron click delivery for each modifier, a combination, all4 pane positions, full allocation in both directions, tooltip/accessibility checks, ordinary click control and existing independent exact configuration/layout cleanup. Its syntax check passes; native execution is pending.

The maintainer explicitly answered: Wait until I say ready. No foreground Obsidian access, plugin staging/reload or native probe is authorized until that new ready response. Background verification may continue. Expected native work: approximately5minutes once ready. Existing disposable Small only; no production deployment, app-wide restart, merge or release. Physical macOS/mobile acceptance is unrun. No comparative CPU claim is made.

## Recovery reentry correction and retained verification failure

Additional production-owner coverage demonstrated that a synchronous native focus callback could re-claim the same companion leaf between the reveal guard and optional close. The original new path closed that successor. Recovery now rechecks the same revision/view-generation/attachment/focus certificate after selecting the Plex, before closing the captured leaf. The focused reproducer fails before the correction and passes afterward, including ownership ABA, view remount and newer native selection. No existing assertion was weakened.

Current focused controls pass **111/111**, zero failures/cancellations/skips. The first full verification passed release/core and1421 main tests, then failed1/228 UI cases because a Chromium test bundle did not load before the existing startup deadline. Its appearance-conflict assertion never ran. The unchanged isolated case subsequently passes1/1 with its original deadline. The first full run remains failed/incomplete; source/browser suites and final build were not reached. The corrected runtime must complete renewed full verification.

The current installed-dependency production build explicitly exits0 on Node22.22.2, including the repaired Unicode catalogs and reentry guard. Main artifact SHA-256: 49dc4d0d1a599a110b9d7e3a75c4e7b62fe6c3edfcb571588c0dccc672878ea8; manifest: 843d327e4a634a6e28cd645be8c533adc873a1ac1c6498502b5ca44e70120109; styles: 88b61aa508ede97b10fbd30c957d14ba19b257aa26f5ee9f547f13faa0f43974. This is not native acceptance: no staging/foreground operation has run.

Private receipts: kplex-modifier-sidecar-focus-reentry-before.log, focus-reentry-after.log, focused-final.log, ui-startup-retry.log, build-final.log/json and the first verify.log/verification.json under %TEMP%. All adverse attempts are retained. The maintainer's foreground WAIT remains in effect.
