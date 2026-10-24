# Mind Map canvas view

Prepared by Zsolt's Codex Agent, 2026-10-24. **Planning draft for the Mac agent. No implementation or runtime acceptance is claimed.**

## Baseline and start gate

Planning branch: `2026-10-24-canvas-mindmap`, created from `main@659697a686f341497725dfb31e94a8bc2bcf2b25`. Reviewed foundation: [#215 at 030d0f0](https://github.com/zsviczian/kplex/pull/215). Depends on [Canvas settings #218](https://github.com/zsviczian/kplex/pull/218).

**Before implementing, fetch and integrate latest accepted main into this existing branch. Confirm #215 and #218 have landed, record the actual base, reread repository instructions and the accepted view/settings contracts, and revise this draft where those contracts changed.** A planning branch is not a frozen implementation base. Preserve concurrent changes and use normal commits; no force-push, merge, release or production deployment without authorization.

The required [occurrence-editor task](https://github.com/zsviczian/kplex/blob/030d0f0558c78b25be0d27fba40caca60b9361cd/docs/PLEX_OCCURRENCE_EDITORS.md) is stage M0 below. It remains a prerequisite for native integration of the two new views. Keep its commits independently reviewable so the Windows/Wu Xing agent can consume a validated shared checkpoint without importing unfinished Mind Map code. The settings PR must stay small and must not absorb this host work.

## Product goal and source basis

Keep a stable map of a subject while moving attention between its notes and expanding an eligible node into an editor **in that occurrence's place**. Changing the edited/inspected note must not implicitly change the map root.

The maintainer supplied TheBrain 14 User Guide, printed pp.147–152 (PDF pp.154–159). It distinguishes a horizontally expanding symmetrical Mind Map, graphical Outline, individual branch expansion, generation-wide expansion/collapse, and changing focus/content while retaining the map layout. The public [official help](https://help.thebrain.com/ipad/index.html) provides the supporting illustration below. Its platform-specific gestures are reference material, not K-Plex shortcut requirements.

![Official TheBrain Mind Map reference: horizontal branches on both sides of a root](https://help.thebrain.com/ipad/images/0aa2e44a-2fdc-5284-a9cf-35be54aa7803.png)

*Source: TheBrain official help. Visual reference only; no affiliation or exact behavior/styling parity is claimed. The in-place native editor requirement comes from the maintainer, not from this screenshot.*

Outline can later reuse this hierarchy projection with a one-sided layout. A compact sidebar Tree view is another later surface. Neither is an additional deliverable in this PR; do not conflate document-heading expansion with a hierarchy between notes.

## Required interaction model

| Intent | Result |
| --- | --- |
| Enter Mind Map | Current attention becomes the initial root. Display a bounded child hierarchy. |
| Primary click/tap on an eligible collapsed note occurrence | Explicitly activate that note and request its in-place editor through shared actions. Root and branch identity remain unchanged. Respect existing modifier-open behavior and ignore drags/control clicks. |
| Select through arrows, typing or Find | Select/reveal the exact occurrence without opening an editor or rerooting. |
| Click within an expanded editor | Focus its existing native editor. Never toggle-collapse it because the click bubbles to the node. |
| Expand/collapse branch | Change that occurrence's displayed descendants; independent of editor expansion. |
| Expand/collapse one generation | Bounded frontier operation over current expansion, not an unbounded recursive scan. |
| Use as map root | Explicit reroot through the shared navigation owner, with safe handling of any editor that would be removed. |
| Close node editor | Collapse only that binding through the shared save/teardown path. |
| Follow an external note/search/history destination | Preserve root when an admitted occurrence exists. Otherwise request explicit reroot; resolve any live-editor removal safely before committing. No hidden replacement of editor content. |

Initial editor capacity is **one per canvas**, using an occurrence-keyed collection designed to allow more later. A second request has an explicit capacity result and clear recovery (close the current editor first); no silent replacement. Multiple simultaneous editors are tentative follow-up work, not an overnight acceptance criterion.

Unsupported targets retain their existing open/inspect behavior and never acquire a fake editable document. The first arbitrary-occurrence native proof is Markdown. Preserve all currently supported Compass editor/attachment/drawing/URL behavior; do not claim new target support without testing it.

## M0 — Shared occurrence editor and rooted-session prerequisite

Implement the complete bounded task in `docs/PLEX_OCCURRENCE_EDITORS.md`, retaining its native proof rather than treating a plural DTO as completion.

The reviewed #215 runtime still has a single `PlexProjection.editor`; `prepareViewScene()` requires its node to equal attention, and `PlexGraph` derives the actual editor page from `persistentNeighborhood.center`. Its `PlexViewSession` transient state is attention-scoped. These must change together behind a Classic compatibility policy. Do not only remove the equality guard.

Required ownership:

- Stable binding incarnation + exact occurrence ID + canonical document identity; native identity revalidated by the host. Definitions receive plain IDs, never TFile/WorkspaceLeaf/controller objects.
- Root, attention, selected occurrence, expanded editor bindings and actual keyboard focus owner are independent. Rooted state survives inspection of another branch.
- Explicit shared expand/collapse/resize actions reuse ActionManager, existing editor/controller and lifecycle fences. Background admission/measurement does not activate notes, steal focus or redirect Sidecar.
- Per-occurrence dimensions feed shared measurement before layout. Ordinary resize/reflow/pan and attention changes preserve the live native editor, file, dirty text, caret and selection.
- A filter/branch collapse/view switch that would remove a live editor pins it according to the approved filter policy, refuses the operation, or performs an explicit tested close/flush transaction. No hidden retargeting or discarded edits; authoritative visibility restrictions still apply.
- Classic preserves its established attention-following behavior, saved keys, commands and framing. One-sided layout, section expansion and all editor target kinds remain regression-covered.

**Native proof gate:** root R, attention A, editor bound to B; move attention to C and retain R/B and the same native editor; genuinely dirty B and resize/reflow while retaining text/caret; render B1/B2 and expand only B1; exercise capacity-one, filtering/collapse, compatible/incompatible switch, popout migration and teardown. Retain exact built/staged artifact identity and cleanup receipts.

Publish M0 as a separate, self-contained, tested commit sequence with the capability matrix updated. Native view integration remains blocked until review accepts it. If M0 cannot pass, return that limitation and keep the full feature draft; do not substitute Sidecar-only inspection for the requested in-place editor.

## M1 — Bounded hierarchy data and projection

Use resolved child relationships from the canonical compiler/resolver and current ontology. The same child semantic role can be physically left or right. Do not change global ontology settings to change the layout.

A bounded application adapter must prepare requested frontiers through existing demand/source owners. #215's cache-only `PlexViewRead` is not a general multihop acquisition API. Start with one generation; each branch/generation action requests only its explicit next frontier. Keep total occurrences, edges, depth, outstanding preparation and retained scopes bounded by the accepted host budgets. Surface truncation/loading/unavailable states. Do not describe cached empty incidence as a proven leaf.

Support eager and on-demand indexing. Root demand may remain while another visible node receives attention; release only the leases no longer needed by live root/expansion/editor owners. Cancellation, root/view replacement, rename/deletion and late publication retain source/policy/native/view fences. Never start acquisition during pure project/layout or add a second scheduler/scanner.

Occurrence IDs encode stable traversal identity, not sorted-array position. Repeated canonical notes under different parents have independent occurrences and expansion. Track ancestry per branch to terminate cycles while still allowing the same note in separate branches. Reference/cycle indicators do not invent semantic edges or writable nodes. Preserve provenance, actual endpoints, hidden-link handling and defined/inferred distinctions.

Keep the first hierarchy focused on children. Parent/lateral/root-sibling context and arbitrary hierarchy-field selection are later options unless they come without expanding the validated scope. Optional cross-links among displayed nodes must be actual canonical relationships and honor shared visibility settings.

## M2 — Stable horizontal layout

Use the existing measured thought/editor rectangles, node/link styling and physical-port renderer. Assign root branches deterministically to left/right, retain their side across attention changes, and avoid global rebalancing when an editor opens. Preserve root-relative branch identity when new data arrive.

Place child connectors on outward-facing ports without reversing their semantic role. Layout must account for editor dimensions and avoid overlaps with neighboring branches. Opening/resizing can move nearby nodes; ordinary attention changes must not trigger a new whole-map fit or large center-style size changes. Preserve manual camera intent; reroot/Fit remain deliberate framing operations.

Validate link clipping and scene extents for large horizontal/deep layouts, including outside Classic's typical bounds, scrolled/clipped editor occurrences and popout resizing. No force simulation or frame-by-frame source/layout recomputation.

Filtering, grouping, Find and keyboard navigation use shared owners. Specify how a filtered branch affects descendants and keep it deterministic; never turn a hidden ancestor into an invented direct semantic link. Keep/Reflow retains its advertised meaning. Group only appropriate branch partitions, never the root or a live editor; unfold through the shared mechanism. Same-note occurrences must remain independently selectable and discoverable.

## M3 — View settings and actions

Register `mindmap` with user-facing **Mind Map** in the accepted #218 contribution system under Canvas behavior > Views. No duplicate toolbar/settings framework.

Initial type settings: branch arrangement (balanced two-sided; optional single-sided only if reuse is cheap), horizontal and vertical spacing, initial visible generations, and a bounded depth/occurrence preference constrained by shared safety caps. Reuse common typography, styling, node-editor default mode, visibility/lenses and input preferences; do not clone them into mindmap settings. Root, branch fold state, occurrence side assignment and editor bindings are session state, not global settings.

Shared actions: expand/collapse branch, expand/collapse one generation, explicit reroot, open/collapse node editor and focus/reveal. Keep existing platform modifier/open behavior and native editor key ownership. Branch disclosure must be a separate accessible target from editor opening. Add all user-facing text to the shipped catalogs; retain stable action IDs and update action inventory only for implemented actions.

## M4 — Acceptance and validation

- Root remains fixed while inspecting/editing several admitted notes; branch expansion, canonical endpoints, camera intent and shared history/Footprints semantics remain correct.
- A clicked arbitrary eligible occurrence opens its actual document in place. M0's native R/A/B/C, dirty-state, duplicate and teardown proof passes. Capacity one is visible and truthful.
- Multi-parent diamonds, self-links, longer cycles, filtered ancestors, missing/renamed roots, unknown settings and high-degree graphs terminate deterministically with bounded work.
- On-demand expansion works from genuinely cold/unprepared branches, not only a fully cached test graph. Collapse/root/view retirement rejects late results.
- View-only geometry/configuration changes add no body reads, parsing or semantic rebuilds. Actual note edits follow ordinary incremental indexing. Expand requests acquire only approved bounded scope.
- Shared grouping, Keep/Reflow, Find, keyboard, actual semantic cross-links, appearance and independent canvas/Sidecar sessions work; Compass baseline goldens/assertions are retained.
- Run required Node22.22.2 `npm run verify`, focused hierarchy/editor/session/browser/source-demand checks, exact-build native editor/actions/Sidecar/popout scenarios and exact-head CI. Record physical Windows/mobile gaps separately from emulation.

Priority manual tests: edit B while changing attention and resizing; duplicate/cyclic branches with keyboard and modifiers; independent canvas/Sidecar pairs across switch/restart with content verified. #215 records baseline-native combined-editor and extra-tab failures; preserve those observations and do not claim they are fixed without a controlled comparison.

## Parallel work and communication

The Mac agent owns M0, rooted navigation, the shared occurrence-action/editor contract and Mind Map's bounded frontier adapter. The Windows agent owns Wu Xing phase classification/layout and a narrow cached-property bridge/decorations contribution. Agree on shared-file edits before either modifies contracts, PlexGraph, prepareScene, ActionManager or session owners. Prefer new focused modules; do not independently refactor the same large files.

After #218 lands, both update from main. Windows may start pure classifiers/layout/configuration fixtures while Mac completes M0; production/native integration waits for the accepted hosting checkpoint. The integration owner may land the isolated shared prerequisite on main or explicitly approve consuming its exact commits. This plan does not authorize either agent to merge/cherry-pick the other's unfinished feature automatically. If consuming a dependency is not approved, stay on fixture-level work and report the gate.

Commit and push coherent checkpoints: contract agreement, shared prerequisite, working vertical slice and validation. Confirm branch reachability. On the relevant PR, post a short message signed **Zsolt's Codex Agent** with commit SHA/link, provided/changed capability, tests actually run and dependency status. Read the other PR at kickoff, before a shared-interface change and before integration; fetch its branch read-only when helpful. A pushed commit is visibility, not acceptance. No timer-driven churn, mutual branch merging or shared HANDOFF overwrites. Keep each branch's HANDOFF current for its assignment; publish cross-agent decisions on the PRs.

## Exclusions and return

No simultaneous-editor workspace, native Obsidian Canvas replacement, manual branch-position persistence/reordering, whole-vault metrics, Ideaverse, external plugins, heading-node system, full Outline/Tree view, unrelated indexing/storage refactor or C15–C26 work.

Return actual implementation/files, accepted shared checkpoint, configuration contract, source/build identities, tests/failures/limits, cleanup and remaining decisions. Keep this PR draft until the complete feature and shared dependency are validated; do not merge the planning document as a completed view.
