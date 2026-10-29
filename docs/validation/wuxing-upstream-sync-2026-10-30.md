# Wu Xing upstream synchronization, 2026-10-30

## Scope and identities

- User request: synchronize the existing fork before implementing editable process descriptions on five-phase guides.
- Previous fork head: `4253471af944e2206555506322ec9665ddbedf36`, original branch `wuxing-local-design`.
- Upstream baseline: `6596f689c07f1b8c9ba84d09b7cf9c01f929a568`, version 0.3.0; 408 upstream commits and one fork commit since their common base.
- Working branch: `sync/upstream-2026-10-30`.

## Integration decision

Adopt the upstream view architecture and semantic/indexing implementation. Preserve independent plugin manifests, serialized workspace view IDs, and fork-local IndexedDB and legacy cache-cleanup keys. Update exact-identity fixtures rather than weakening assertions. Keep the upstream release/version/license contract and matched lockfile.

The upstream Wu Xing Facets template recognizes the existing `status` emoji values. It replaces the earlier forced custom layout on this branch. The old perspective/distribution renderer and dedicated onboarding remain in Git on the original branch; their historical docs are retained as historical records, not current claims. No note metadata, live plugin settings, or installed artifacts were changed. Existing presets in upstream K-Plex are not copied automatically to this independent plugin.

## Existing local changes

The original three dirty paths were `HANDOFF.md`, `docs/validation/wuxing-status-prototype.md`, and `styles.css`. They are preserved in the stash named `pre-upstream-sync-2026-10-30-local-gradient-and-notes`. A complete binary-capable patch plus original HANDOFF/style snapshots are under `/Users/dumo/Downloads/dumodal-Codex/2026-10-30-kplex-upstream-sync/`. These pre-existing local edits are excluded from the synchronization commit. The old overlay rule is not reapplied to unrelated upstream backgrounds.

## Validation

Node 22.22.2; dependencies installed from the upstream lockfile with `npm ci --ignore-scripts --no-audit --no-fund`. `npm run verify` completed with exit 1: release metadata, architecture (9), core (130), lint, main (1,679), UI (403), and source (357) checks passed. Browser storage completed with 852 passes and two failures (854 tests, no skips). Log: `/Users/dumo/Downloads/dumodal-Codex/2026-10-30-kplex-upstream-sync/verify.log`.

The two browser failures are:

1. `native folder bounded selection follows every configured sort order (on-demand)`: `Sorting acquires no inventory: 1`. A focused rerun reproduces it in the fork. The same eager/on-demand pair also runs against an untouched `git archive upstream/main` source snapshot, using the same installed locked dependencies: eager passes, on-demand fails with the same assertion. This establishes a baseline upstream failure under this environment; no sorting implementation or assertion was changed.
2. `20,015 independent owners publish complete cached center incidence with exact metadata/evidence/gates/degrees and no IO`: `CDP timeout: Runtime.evaluate`, approximately 260 seconds. No baseline reproduction or cause attribution is claimed. The timeout remains unresolved; no threshold was relaxed and the expensive scenario was not repeated merely to obtain a pass.

`npm run build` was then run independently and passed against the actual Obsidian types, producing all three nonempty installable artifacts under `dist/`. Dist manifest/style bytes match their root files, with plugin ID `kplex-wuxing` and version 0.3.0. SHA-256 and byte receipts are in the Downloads task's `artifact-receipt.json`.

Logs: `verify.log`, `folder-order-recheck.log`, `upstream-folder-order-recheck.log`, and `build.log`, all in the Downloads task directory. A full-suite pass is explicitly not claimed.

Native startup with existing fork settings and large-vault behavior have not been tested in Obsidian. No native disposable fixture is configured for this run. Source/build verification does not establish those results. No GitHub push, PR, merge into the remote default branch, release or live installation is part of this synchronization.

## Next scope

Editable captions along the five circular generating guides are not implemented here. They require extending circular guide layout, text measurement/rendering and a guarded settings writer; importing another preset does not add that capability.
