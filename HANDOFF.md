# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in the issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: extract the Classic Plex as the first internal view plugin

Prepared by Zsolt's Codex Agent on 2026-10-24.

## Transfer state and identity

**Prepared for implementation.** Research/preparation agent -> implementation agent -> Obsidian-equipped validation agent. This is a feature-foundation assignment, not resumption of the paused general refactor.

- Branch: `2026-10-24-plex-view-plugins`.
- Accepted starting main: `595495105f56ae8d159f71b41706157e9f24c851`, after PR #214. Branch starting SHA was read back and verified.
- Opening changes: `docs/PLEX_VIEW_PLUGINS.md` and this assignment only. No production code or test changes have been made by the preparation agent.
- Durable design and source/research references: [Internal Plex view plugins](docs/PLEX_VIEW_PLUGINS.md). Ideaverse research is pinned to `4cce3f267148cc81e2961796e9a8dc7e20ff1aa0`.
- Resume the existing branch, verify its current head/diff and inspect any incoming dirty files before editing. Do not assume main is unchanged or overwrite concurrent work. Inspect actual Node/dependency/browser/Obsidian capabilities; do not inherit another assignment's test results.

## Objective

Make the present parent/child/friend/challenger/sibling behaviour the built-in `classic` Plex view definition. Keep the current default experience and all shared interactions intact. A future Mind Map or Ideaverse definition should plug into the same host without copying PlexGraph, indexing, search, lenses, actions, editor or Sidecar owners.

The first implementation ships Classic only. The registry and selector infrastructure are exercised with a test-only alternative definition, not unfinished public views. Follow the design's P0-P5 checkpoints, with focused reviewable changes and tests rather than a large unverified folder move.

## Mandatory boundaries

Keep shared: canonical source/index/relationship authority, bounded demand preparation, property/evidence access, lenses and predicate matching, search/Find, grouping mechanics, measurement/styles, node/connector primitives, keyboard/action ownership, navigation, editor lifecycle, native sync and Sidecar/workspace ownership.

Move behind Classic: fixed neighbourhood buckets and sibling projection, area IDs/labels/tints/bounds/sizing, geometry and framing policy, Classic grouping partitions, physical gate mapping and Classic-specific controls. Existing compatibility entry points may delegate to the extracted implementation; do not duplicate it.

Use existing NodeId/GraphNodeView. Distinguish canonical nodes from repeated view occurrences, semantic edges from derived/decorative connectors, arbitrary areas from semantic roles, and attention from layout root/selection/editor anchor. Pure core policy must not import Obsidian, DOM, GraphIndex or host-bound GraphPage types.

Do not rewrite the parser, resolver, source repository, scheduler or index publication system. Do not copy Ideaverse's scanner or full application. Do not introduce public plugin loading, GQL, a marketplace, a new general rendering engine or all three product views in this assignment. Do not change global ontology when selecting a view.

Preserve existing memoization/lazy presentation/count work, partial coverage, cancellation and synchronous publication. View registration/layout/paint cannot read notes. Switching a same-scope view must not trigger a rebuild or extra parsing. A new scope must acquire only explicit bounded demand through existing owners.

Keep legacy Classic settings and device/surface precedence authoritative in this PR; new namespaces must not force a broad data migration. Keep global saved history/pins and session-only Footprints as accepted in #31/#187. Keep native leaves/editors and the shared shell alive across compatible view changes.

## First implementation actions

1. Read AGENTS.md, CONTRIBUTING.md, docs/ARCHITECTURE.md, docs/AGENT_WORKFLOW.md and the design. Trace the current callers rather than relying only on this baseline.
2. Characterize Classic geometry, membership/order/caps, sibling derivation, grouping, Keep/Reflow, expanded/heading/editor modes, gates/cross-links, area filters and settings precedence before extraction.
3. Introduce the definition/registry and narrow read/scene boundary. Extract Classic policy from src/ui/PlexGraph.tsx, src/ui/layout.ts, src/ui/relationGroups.ts and GraphIndex.getNeighborhood through portable policy and host adapters. Preserve the classifier and source owner.
4. Parameterize shared area, occurrence, keyboard-entry, editor/framing and physical-port contracts. Preserve shared ActionManager delivery, menus, drag/drop, hover, tooltips, search, native editing and Sidecar.
5. Implement lifecycle, fallback and state compatibility. Prove a test-only view with three arbitrary areas, duplicate canonical-node occurrences, off-centre attention/editor anchor, a distinct layout root and a decorative edge uses the same infrastructure without Classic imports.
6. Complete P5 validation and record the actual capability matrix from design section 12. A registry-only wrapper is not a completed extraction.

## Preparation for two feature agents

Mind Map and Ideaverse agents must receive a specific validated shared commit. Do not let each invent an index adapter, settings scheme or action system.

The current source-backed model does not establish that every needed corpus metric is already exposed. Verify bounded multihop expansion for Mind Map and corpus/provenance/property coverage for Ideaverse. Exact body/up/related counts, navigation suppression and linked-line density differ from generic neighbour counts. Unknown metrics must stay unavailable, not zero. Large Emergence maps also need compact rendering rather than thousands of detailed DOM cards.

Keep those shared capability gaps explicit. Deliver minimal necessary adapters in a separate reviewed prerequisite if they exceed the Classic extraction. The Ideaverse agent may work on pure scoring/layout fixtures meanwhile, but must not ship a private whole-vault scanner. Reference parity versus a deliberately reduced scoring profile requires an explicit decision.

Parallel feature scope after that gate: Agent A implements Mind Map; Agent B implements Ideaverse Emergence, with Gravity later. Wu Xing remains the next real consumer; the non-centred contract probe covers its main architectural requirement now.

## Validation and return

Follow the acceptance matrix in the design and the repository's current commands. Use `npm run verify` with Node 22.22.2 and real dependencies, relevant browser tests, and exact-build native validation through the guarded disposable Obsidian workflow. Preserve goldens/assertions; explain intentional differences rather than regenerating expected output to hide them.

Priority native checks: independent Plex/Sidecar pairs and popouts during switch/close/reopen; native editor focus and Mac/Windows modifier actions; dense-scene touch/scroll and cancellation on tablet/phone. No production deployment, merge or release is authorized by this handoff. Native foreground access remains subject to the existing workflow and explicit readiness; do not inherit prior permission.

Return the actual changed files, contract choices, compatibility/performance observations, commands and environment versions, results/failures/unavailable checks, cleanup state, remaining shared capability gaps, and the next precise validation action. Review architecture, TSDoc, reusable components, localization, owning-document lifecycle and access boundaries independently of green tests. Update durable architecture records only with implemented, reviewed decisions.

## Preparation evidence and limits

The preparation agent inspected authenticated GitHub source/instructions and related issue decisions, researched official TheBrain documentation and the pinned Ideaverse implementation, and prepared this design/assignment. TheBrain's exact v15 desktop interactions were not exercised; version-specific evidence limits are in the design.

No runtime implementation, production build, automated test run, Obsidian validation, device acceptance or performance measurement has been performed for this new assignment. Earlier Sidecar/indexing test receipts are historical and are not acceptance evidence for the extraction.
