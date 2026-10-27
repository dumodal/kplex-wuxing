# Numeric settings audit and shared controls

Starting5d4d3a35f7d0a3680a905ba188140ecca2326293, existing PR222 branch. The audit covers every production UI/settings source, not only Facets.

## Scope and owners

- All native declarative numeric preferences (general Canvas behavior, Compass, Mind Map, custom view contributions, styling/link widths/labels/gates, Sidecar) adapt through numberSlider. Existing captured scalar/appearance settings writers remain authoritative. Device typography uses the same control with inherited/customized explanations and reset.
- Existing styleNumberSlider now wraps that native component, retaining optional style overrides. Facets category/diagnostics dimensions reuse it: visible effective defaults, bounded integer sliders and explicit inheritance reset. Preset overall spacing/width/height also use the component.
- Lens border/line widths use existing React LayoutSlider; color opacity uses native numberSlider and a percent readout. Exact original color alpha, partial literal text/IME, Reset, Save/Cancel and queued style ownership remain.
- React/native sliders share LatestSliderValue for first/latest delivery. Explicit reset now cancels unsent gesture positions. No new parser, index, renderer or settings writer. Numeric schemas/limits/defaults unchanged.
- AGENTS.md and CONTRIBUTING.md now require bounded sliders with permanently visible values. The view developer guide states the same contribution contract. Optional overrides show effective inheritance and reset; opening must not persist a default. Predicate/property literals stay text.
- check-numeric-controls.mjs audits182UI/settings modules. Negative fixtures reject numeric input tags/DOM/declarations, numeric addText conversions and private sliders. Architecture verification runs this guard; native and React owners are explicit. Source review also checked every numeric conversion and all declarative text/dropdown settings; remaining fields edit names, paths, ontology, property/tag values, expressions or nonnumeric choices.

## Verification

Node22.22.2, real dependencies:186focused cases PASS across numeric UI/source guard, latest-value delivery, touch controls, captured canvas settings, typography, native preset manager, color editors, legacy style/import ownership and localization. This is affected-scope coverage, not full regression. Browser assertions mount all generic numeric definitions, require named permanent readouts/bounds and no default writes; exercise async first/latest, explicit reset, inherited dimensions and sibling preservation. Existing preset save/error/conflict/cancel and canonical no-source settings tests remain.

Real production build/installed Obsidian types, full official scanner and architecture9tests/211roots/392reachable files/0violations PASS. A scanner rerun corrected unbound cleanup references and a this alias; no rules suppressed. Older finite fixtures gained native slider methods/readout support; captured numeric row tests now inspect actual rendered controls/keys/bounds rather than assuming raw declarative fields. Their writer/ownership assertions are retained. Initial typography check exposed a real explicit-reset pending-draft issue; fixed through shared cancelPending and guarded reset, then all focused checks passed. Locale text was corrected after a Windows pipe encoding problem; all8catalogs and localization checks pass.

Exact-build Windows native visual/keyboard/inherit/reset/Cancel checks are running in the authorized Small vault with unconditional outer restoration. Help artifact deployment follows after checking for open drafts. Full regression/CI deferred; source222/Help4stay draft/open/unmerged. Mac/minimum-host/physical mobile and known215limitations remain separate.
