# Internal Plex view foundation — PR215

Zsolt's Codex Agent, 2026-10-24, interim publication at 18:31 UTC requested by the maintainer. Implementation is committed; validation continues. Pending rows are not passes and this report does not establish merge readiness.

## Identity and scope

- PR: <https://github.com/zsviczian/kplex/pull/215>, branch `2026-10-24-plex-view-plugins`.
- Research/planning base: `595495105f56ae8d159f71b41706157e9f24c851`.
- Accepted runtime base: `659697a686f341497725dfb31e94a8bc2bcf2b25`, normally merged into the existing branch (`2de5bf8cf62a003d25170c3ed0af48723494e1e0`). GitHub main rechecked unchanged during implementation.
- Runtime/test/harness commit: `211c7e485f95f1ed75221655697ca009fc9cab6b` (`feat: extract Classic Plex view policy and session foundation`). This interim report is published separately. The running fourth verification began at dirty `2de5bf8`; subsequent changes before the implementation commit were native-driver overlap coverage and trailing blank-line cleanup, with no further runtime behavior change. Final artifact identity and native acceptance must still be checked.
- Only Classic is statically registered in production. No index scheduler/storage/parser/resolver redesign, public loading, production-vault deployment, merge or release.
- Required CLI Node: 22.22.2; actual repository dependencies and installed Obsidian typings. Native host observed: macOS arm64 Apple M1 / 8 GiB, Obsidian 1.15.0 (installer 1.14.0), Electron 43.3.0, Chromium 150.0.7871.212, native bundled Node v24.18.1. Required CLI Node remains 22.22.2. Headless Chromium was 156.0.8078.48; these are distinct hosts. Final artifact identities follow below.

## Implementation and compatibility

`core/plex/views/` owns internal contracts, static registration and Classic's portable projection/geometry. The retained GraphIndex neighbourhood API and host layout facade delegate to those owners. Shared measurement/styles, grouping, predicates/lenses, actions, keyboard/Find, rendering, native editor and Sidecar ownership remain shared. `ui/plexViews/classic/` owns Classic sections/area packing, partitions, controls, labels, legacy heights and tint policy.

The per-native-document `PlexViewSession` keeps selection/preferences/area heights in bounded workspace state; unknown IDs retain payloads and use Classic. Camera/selection/unfolded groups stay transient and attention-scoped. Legacy Classic flat/device/surface settings remain authoritative; global pins/history and Footprints storage do not change. Compatible changes preserve the native shell/editor. An active native editor blocks an incompatible definition. Failed layout produces a localized recovery scene using only current canonical attention.

Occurrences and canonical endpoints are separate. Generic areas have no implicit ontology write meaning; ports declare semantic intent explicitly. Semantic edge endpoints are checked against their occurrence nodes. Decorative/derived edges cannot inspect or mutate pair evidence. Delayed writers, pickers, modal callbacks and prepared actions retain view/native lifetime fences. View-owned presentation demand, pointer captures, hover, frames, timers, dialogs and native drag tokens retire independently of shared attention demand.

The [implemented capability matrix](../PLEX_VIEW_PLUGINS.md#16-implemented-boundary-and-capability-matrix) explicitly leaves general multihop preparation, corpus/property scoring, provenance-specific global metrics and compact large-map rendering unavailable. No absent metric is reported as zero. Initial synthetic groups belong to the shared grouping owner; point rendering and malformed output fail locally.

## Characterization and controlled observations

The geometry golden was captured before runtime extraction and was not regenerated afterward. Sixteen exact cases cover split/shared-left layout, depth one/two, density one/three and ordinary/native-editor dimensions. Membership covers ordered direct caps, previous/next merging, occupied exclusion and defined sibling precedence. Existing layout, grouping, sections, filtering/count, cross-link, keyboard, source and identity assertions remain in normal verification.

A deterministic comparison bundles accepted `659697a` layout source and current layout with identical finite canonical pages/settings. It counts cache-method calls, not elapsed time:

| Graph depth | Editor override | Accepted neighbour / title / count calls | Candidate neighbour / title / count calls |
| --- | --- | --- | --- |
| 1 | No | 0 / 11 / 0 | 0 / 11 / 0 |
| 1 | Yes | 0 / 11 / 0 | 0 / 11 / 0 |
| 2 | No | 42 / 11 / 0 | 40 / 11 / 0 |
| 2 | Yes | 42 / 11 / 0 | 40 / 11 / 0 |

Raw local comparison: `/private/tmp/kplex-215-work-comparison.json`; driver retained beside it. This establishes no extra calls on this fixture. It is not renderer CPU, actual paint, large-vault throughput, memory or latency evidence. No general optimization campaign was performed.

The situated probe imports no Classic policy and mounts the production PlexGraph/ActionManager in real Chromium. It has three arbitrary areas, duplicate canonical occurrences, off-centre attention/editor, a different layout root and a decorative guide. Passing focused checks cover independent selection/activation, Find returning two occurrences, area filtering/repacking, grouping/unfold, workspace area-height round trip, exact camera/selection restoration, cancellation of a prepared old-view action, local failure/recovery and listener/demand cleanup. Canonical identity remains shared. Its finite read double throws on unexpected source reads/settings writes/Classic projection.

Contract/session controls cover cache truncation/unavailable corpus/stale revisions, semantic endpoint and geometry validation, physical-port count mapping, malformed/huge/cyclic/deep state, independent session disposal, unknown payload round trip, attention-scoped transient retirement and incompatible editor leases. These use actual production owners and bounded host doubles; they do not establish native editor or source-backed corpus capabilities.

## Failures retained and corrected

1. Pre-extraction fixture setup initially passed a cap through public migration, which clamps it to ten. The fixture now explicitly selects cap two after migration. JSON golden comparison normalizes omitted `undefined` properties. Both corrections preceded runtime changes; expected geometry did not change afterward.
2. Initial browser fixture native constructors were incomplete (`FuzzySuggestModal`), and one cleanup mistakenly used `host.close()` rather than the harness's `cleanup()`. The exact owned Node/Chromium processes/profile were verified and removed, then `finally` cleanup corrected. Later missing finite host ports (`isVisiblePage`, file lookup, flair subscription) were supplied explicitly. No production fallback or assertion was weakened.
3. Moving callbacks exposed missing actual helper dependencies in isolated AST fixtures. The initial browser run had 71/72 passing with `attentionFallbackScene is not defined` masking absent Classic defaults. The cross-link fixture supplies the actual defaults and passes its original paint/focus/layout assertions. The first full portable portion later had 1438/1441 passing: tooltip and two structural-action fixtures omitted `semanticSceneEdge`. They now bind the actual production helper and optional standalone-session input; focused reruns pass unchanged assertions.
4. Indexing's manual transpilation inventory omitted the new session/registry modules. The inventory now includes real dependencies. A subsequent legacy layout call omitted `compactView`; the host finite preference projection now preserves the old boolean-default behavior. The unchanged complete indexing fixture then passed, including original graph golden and strict P15/parser guards.
5. The second full attempt passed all 1441 functional tests, then failed 10/230 browser tests. Recovery (three), compass (two), remote imagery (one) and ThoughtNode-based fixtures (four) omitted their newly extracted Classic/session/count helper context. Missing ThoughtNode context caused React retries and secondary style-work/null-DOM errors. The actual helpers were bound explicitly. A serial focused run of all affected browser files then passed 45/45 with original assertions, including zero repeated style-dictionary work.
6. Source review found that a null/unavailable projection had been treated as an empty successful scene, which could remove the native editor host. Null/stale/invalid projections now use local attention recovery, and an active editor requires an admitted attention occurrence. Contract and actual-renderer negative controls pass; the native probe includes the same unavailable case. The separate native editor lane subsequently passed these controls.
7. Small was originally closed. Its first CLI call arrived before Obsidian registered `vault`; strict preflight rejected the response despite exit zero. The backup had already completed. A subsequent read-only check confirmed the exact existing Small path, loaded plugin and live renderer before any staging. This is CLI startup evidence, not a product failure.

Raw failed and successful local logs remain `/private/tmp/kplex-215-*.log`. The first guarded verification report remains `/private/tmp/kplex-215-native/verify/report.json`; later attempts use separate directories. No failed sample was overwritten or relabelled green.

8. A final dispatch review found that copying the view revision from React options could conceal a synchronous retirement until the next render. The host action snapshot now calls the native session's live revision getter. A focused test compiles the actual snapshot callback and verifies retirement/disposal without changing the React options object (now 7/7 session tests including the picker focus-return case). The actual renderer and native probe also exercise immediate prepared-action cancellation.
9. The third full run paused after both deferred-neighbourhood assertions passed while their Node child remained idle, with no Chromium child or TCP socket. It exited naturally after roughly five minutes and the serial run resumed. A proposed read-only inspector diagnostic aborted at its PID check because the process had already exited; no signal/inspector was installed. Cause remains unproven; no harness/deadline/production change was made for this observation.

10. The third complete portable run passed all suites and the real build, then native `open-kplex` timed out with an Obsidian theme-migration notice open. Dismissing that notice and rerunning only exact-hash staging/smoke passed. The timeout remains recorded; it is not a complete aggregate pass. No native timeout was increased.
11. The combined native editor-plus-two-Sidecar-pairs probe lost its embedded Markdown editor before any view switch: owned embedded leaves became type `empty`. An exact accepted-main `659697a` build reproduced the same failure. Separate editor and pair lanes pass on the candidate, including switches and popout/main remount. This does not establish combined editor-plus-pairs acceptance. A focused next experiment is to record the first `setViewState(empty)` caller while adding each split/Sidecar one at a time.
12. The existing native sessions driver mistook the old document for readiness after a deliberate reload, then received transient CLI `eval` unavailable. Readiness now requires a new `performance.timeOrigin`, layout readiness and a reacquired action manager, within its original 45-second deadline. All 15 scenarios then passed with distinct before/after origins. No production reload behavior changed.
13. The existing native action lane failed typing-badge symmetry. An exact accepted-main control with the original assertion failed identically: badge left inset 8 px, Find button right inset 33.921875 px, enclosing toolbar right inset 8 px, equal tops. Find shares that toolbar with Footprints. The assertion now measures the toolbar edge, retaining its 1 px tolerance and existing overlap checks, additionally checking the whole toolbar for overlap. Initial candidate and baseline failures are preserved; corrected native acceptance remains pending.
14. Native workflows exposed a genuine callback regression: SuggestModal closes and restores graph focus before delivering its selection; focus advances interaction revision and incorrectly rejected the captured picker choice. Only picker continuations now permit that expected interaction change. Root/document, attention/file, view revision and direct view-lifetime guards remain. A production-helper control verifies focus return succeeds while view/navigation/document changes still reject; 7/7 session checks pass. Native workflow rerun remains pending.

## Validation ledger

| Lane | Actual result / limit |
| --- | --- |
| Exact Classic membership/geometry | Passing focused checks; immutable original golden. |
| Contracts and sessions | Passing focused checks, including physical count mapping and editor compatibility. |
| Actual Chromium alternative probe | Passing focused checks, including physical-port counts, camera/selection restoration and thrown/unavailable scene recovery. Latest contracts/session/renderer control run: 11/11. |
| Existing cross-link/structural AST fixtures | Focused original assertions pass after binding new helper dependencies. |
| Complete indexing fixture | PASS after dependency/default corrections; P1–P17, parser bounds and graph baseline unchanged. |
| Architecture and restricted core | Architecture 7 tests/zero violations and core 130 tests passed in full attempts. Third full attempt passed 1442 functional, 230 browser, 357 portable source and 775 real-IDB/browser tests plus real build. Final-source fourth run has passed 1445 functional, 230 Chromium and 357 portable source tests; real-IDB completion, final build and native staging remain in progress after the picker fix. |
| Official Obsidian scanner and real build | Passed focused runs. Renewed complete verification pending. |
| `npm run verify:obsidian` | First attempt failed in portable verification (3 fixture dependencies above), before staging. Second attempt passed functional tests but failed the 10 fixture-context browser cases above. Third portable portion and build passed; native startup timeout retained, followed by identical-hash smoke PASS. Fourth final-source aggregate is in progress. |
| Native view/editor/pairs/popout probe | Separate editor and pairs lanes PASS; combined case fails before switching on both candidate and exact accepted main (see failure 11). |
| Native Classic sessions/groups/actions/workflows/sections | Sessions 15 scenarios PASS after reload-readiness correction; groups PASS with zero semantic/rebuild work. Actions/workflows failed as diagnosed above and await corrected runs; sections pending. |
| Remote CI | Interim implementation/report publication requested; exact published-head checks pending. |
| Physical Windows/phone/tablet | Unavailable in this Mac session; no physical-device pass claimed. |

## Native restoration and final artifact receipt

The existing Small vault is `/Users/zsviczian/Obsidian/kplex-test-small`; no vault was created. Before first CLI open, the private backup captured original closed/open status, workspace, community/core plugin configuration, app configuration, K-Plex settings and three executable artifacts. Visible content inventory/digest was captured. Native probes own timestamped fixture folders and exact wrappers/leaves. Final close, byte restoration, content equality and controller cleanup are pending and must be recorded before delivery.

The picker-fixed production build completed with main.js `bc05e96d9c8b109674809b529127997687fb747c76e0ebe8f4f8b587751354ce`, manifest.json `c28f61576adfe73800994c8fd47671fcd5880c21809cac63595cfbe3715c7a01`, styles.css `ec5b05c72b5f97f005dd81a8d7b7eceffe003cc3e16b0f94b3a9e8a2ad96dc53`. These are interim candidate hashes; fourth verification must rebuild/stage and compare them before final native acceptance. Earlier native passes used main.js `a02c3a407f0b4e785f3c832b346c24eb60ba692f3e245bab038aa4c1b7d88780` before the picker correction. The exact accepted-main control used main.js `db896c12bbb22154f887480bad8684fc96aaac9e4966b0022d5af84787ae6b6f` and unchanged accepted manifest/styles.

Remaining work: finish fourth aggregate verification; run corrected native workflows/actions, sections and device emulation plus final source-native regressions; restore Small's original bytes/content/closed state; publish final evidence and obtain green exact-head CI. Physical Windows/phone/tablet remain unavailable. No merge/release or production deployment is authorized. This interim report does not establish merge readiness.
