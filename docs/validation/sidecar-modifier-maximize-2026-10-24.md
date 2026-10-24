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
