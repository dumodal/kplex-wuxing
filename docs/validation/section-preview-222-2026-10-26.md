# PR222: section links before hydration

Starting head: `bebbb9a58449a9be53fcc43917ce297e24eca459`, branch `2026-10-25-facets-layouts-and-sharing`, accepted main `7064644` included. Keep PR222 draft/open/unmerged.

The saved graph deliberately publishes resolved adjacency before its much larger private evidence store. Compass can therefore display its normal neighborhood while `evidenceFrom` is empty. Section expansion read the current note correctly, but its next presentation projection replaced every local placement with that empty evidence store. Compass outline lost its note relationships; Mind Map retained canonical nodes/edges but lacked physical section anchors until evidence promotion.

`GraphIndex.getSectionPreviewNeighborhood` exposes only the existing displayed neighborhood during that saved-preview interval. `SectionPreview` reuses those canonical rows and the explicit section owner's already parsed physical occurrences. It preserves roles, direction, style, preamble and known frontmatter header occurrences. Unplaced or incompatible rows remain on the note. Detailed indexed provenance wins per target and replaces the preview path after hydration. Source file identity, path, mtime, size and native metadata identity fence temporary placement. Removed/hidden canonical rows cannot be resurrected from old local placements.

Preview placements are presentation data, separate from `RelationshipExplanation` and indexed declarations. They do not publish graph state, create evidence, grant relationship-edit authority, acquire sources or certify hydration. The existing view contract, source/parser/resolver, section tree, renderer, editor, settings and scheduling owners remain unchanged.

Actual checkpoint checks on Node22.22.2 and real dependencies:

- 39 affected section, browser, anchor, Mind Map scene and source-replay tests PASS.
- Two real Chromium IndexedDB regressions PASS: eager private evidence is held independently of saved adjacency; On-demand saved preview remains readable without source certification. Each verifies immediate section targets/anchors, unchanged canonical state, no write authority, exactly one explicit source body read, no index parsing/acquisition/store work, stale metadata/file rejection and eventual real evidence takeover.
- Rendered Compass and Mind Map browser regressions retain targets and exact physical section attachment while evidence is absent; canonical retirement cannot restore an old section target.
- Installed Obsidian type check, touched-source official scanner and production bundle build PASS.

Exact-build Windows native and final full verification/CI results are recorded in PR222 before final delivery. The additional native interval forwards actual canonical neighborhoods while withholding detailed evidence; it proves native rendering and cleanup, not whole-application restart timing. The browser regression holds the genuine private snapshot reader through real IndexedDB. Existing platform and #215 baseline limitations remain separate. No production vault files/settings/workspace/deployment changed.
