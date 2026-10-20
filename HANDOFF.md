# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# Assignment: Unified ontology manager and paired-field discovery

## 1. State, identity and authority

- **State:** Prepared implementation assignment; the planning checkpoint contains documentation only. No feature implementation or runtime validation has been performed for this assignment.
- **Sender:** Zsolt's Codex Agent. **Next recipient:** implementing agent, then independent main validation agent under the standing workflow.
- **Repository / branch:** `zsviczian/kplex`, `2026-10-20-ontology-manager`; target `main`. Continue the draft PR belonging to this branch, not a new competing branch or PR.
- **Exact runtime baseline:** [843e47f471f897951165b962e12a1d6a64ce089e](https://github.com/zsviczian/kplex/commit/843e47f471f897951165b962e12a1d6a64ce089e), the merge of [PR #190](https://github.com/zsviczian/kplex/pull/190). The branch was created from this exact commit. Read its current remote head before starting; subsequent planning commits do not change the runtime baseline.
- **Related issue:** [#151](https://github.com/zsviczian/kplex/issues/151) is already closed as completed. This is a follow-up usability enhancement, not an unfinished implementation of #151. Do not reopen or close issues automatically. No open PR was returned by the repository search during preparation; recheck before coding.
- **Initial changes:** this handoff and the temporary `docs/agent-handoffs/ontology-manager.md` planning marker. The preparing agent did not inspect an implementing agent's local working tree. Record local dirty files and preserve unrelated work.
- **Authority:** implement only this scoped feature when taking up the assignment. Offline-agent return is uncommitted by default. This handoff does not delegate merge, release, main-branch writes, branch deletion, or personal-vault deployment. Repository publication follows the standing authorization rules.

Read `AGENTS.md`, `CONTRIBUTING.md`, `docs/ARCHITECTURE.md`, `docs/AGENT_WORKFLOW.md` and `docs/agent-workflows/issue-resolution.md` first. C14 is accepted; structural refactoring remains paused. Follow the repository's checklist/ETA and progress protocol. Establish actual Node, installed dependencies, browser and Obsidian CLI capabilities rather than inheriting prior agents' claims.

## 2. Accepted product direction

Replace the fragmented ontology configuration experience with **one searchable, role-filtered manager**. This is the selected option: not collapsible direction groups, multiple editable lists, a quadrant diagram, or an ontology graph editor.

Whenever a configured field has a partner, both names must be visible without hover, memorization, opening an editor, or switching the role filter. Reuse this field-and-partner presentation in Settings first, then the Markdown ontology suggester, the related-node composer and the existing Add/change ontology editor.

Reuse node/link/theme manager infrastructure, not just its visual appearance. Keep the ontology's configuration/validation authoritative in its existing owner. The UI presents compatible choices and the writer independently revalidates them.

**Corrections to the conversational draft:**

1. The baseline has seven relationship textareas, a separate discovered/unassigned manager, and an Excluded metadata assignment supported by the ontology editor. **Unassigned and Excluded are different states.** Neither may disappear in the consolidated manager.
2. Friend and Challenger are self-reciprocal roles, not opposites. Existing distinct-field pairs within Friend or within Challenger remain supported; for example `supports` / `supported by` can both be Friend fields. Do not auto-pair every Friend field, create self-pairs, or remove existing same-role pairs.
3. Pair-only edits between already compatible assignments are presentation changes. Adding/removing a recognized field or changing its role is a real semantic-policy edit. Preserve the existing distinction; do not promise zero semantic work for every Save.
4. Settings can show one row per pair. Selection surfaces must still expose **each selectable physical field**, including both fields of a same-role pair. A pair row is not itself a property name.

## 3. Settings UX specification

### Entry and layout

Keep the native declarative **Settings → K-Plex → Ontology** page. Replace the primary raw-list workflow with a compact **Manage ontology** entry and useful configured/pair/unassigned counts. It opens one native Obsidian manager modal, consistent with the existing style managers. Keep **Editor suggester** configuration separate; it configures typing behavior, not ontology membership.

Unify the existing Discovered fields destination into this same manager, prefiltered to Unassigned where an existing entry point needs preservation. Do not retain another independently implemented discovered-field list. Update the Hidden-fields deep link to open this manager with Hidden selected; do not leave navigation targeting a removed textarea.

Manager controls: a search input, one **Show** dropdown, and **Add field**. The dropdown contains All, Parent, Child, Friend, Challenger, Previous, Next, Hidden, Unassigned, and Excluded metadata. Use localized role labels and a separator between directional roles and non-directional states. Default to All; it includes configured entries and currently available discovered/unassigned fields, with their states clearly labeled. It does not imply complete discovery of the vault.

Use `StyleManagerList` for search chrome, row activation, action placement, status and Show more. Preserve its existing disclosure behavior rather than adding another pagination/virtualization framework. Controls wrap at narrow widths; the native modal owns one vertical scroll surface, with no horizontal scrolling or nested list scroller.

### Row contract

Each side has its own physical field name and role. Illustrative content, not a new literal syntax:

| First field | Partner field |
| --- | --- |
| based on · Parent | basis for · Child |
| replies to · Previous | replied by · Next |
| supports · Friend | supported by · Friend |
| related to · Friend | No pair |
| hidden · Hidden | Not pairable |
| review topic · Unassigned | Not assigned |

An existing Lucide pairing icon may separate the sides. It means paired labels, not that both notes contain a declaration. Use text/accessible descriptions, not color or an arrow alone, to convey meaning. Do not display the raw slash-escaped settings serialization.

**All view:** one row per configured pair and one per unpaired field or discovered/unassigned name. Match normalized identities through the existing field-name contract. Do not deduplicate or sort the persisted lists as a side effect. If legacy unpaired names occur in more than one role, preserve their raw assignments and precedence; show their effective role plus a truthful multiple-assignment annotation rather than silently cleaning them up.

**Role-filtered view:** include a pair if either endpoint has the selected role, and display that endpoint first. Under Next, `replied by · Next` precedes `replies to · Previous`. Both endpoints remain visible. Same-role pairs still occupy one row. In All and same-role views, use a deterministic presentation orientation, independent of search text, so rows do not flip while typing. Sorting is presentation-only and must not alter remembered creation defaults or stored field order.

**Search:** match either physical name and localized role/status text. Keep a role filter active when searching the partner name; a Next-filtered search for `replies` must still find the Next-oriented pair. Clear search does not reset the role filter. Preserve query, filter and sensible scroll/focus when returning from an editor. Count pairs as one displayed entry; distinguish entry counts from physical-field counts in copy.

**Activation:** a row opens the existing ontology editor adapted for an unpaired field or a pair. A pair editor shows both fields and supports choosing which endpoint to edit/remove. No nested interactive controls inside the list's button row. Show no hover-only edit or pairing affordance.

**Unassigned:** use the existing `index.unassignedOntologyFields()` inventory through a narrow host-supplied reader. This is discovered metadata, not another persisted ontology role. Recheck current configuration when displaying it so newly assigned fields leave the Unassigned view. When discovery is incomplete/unavailable, show that state instead of reporting that all fields are assigned. Preserve available occurrence counts without adding a count scan over configured fields.

Keep an explicitly named **Rescan discovered fields** action available for discovery, reusing the existing `ontology-discovery` path and its cost warning. Never invoke it on manager open, filter change, typing, Show more, or ordinary list refresh. Do not relabel a rescan as a cheap refresh.

## 4. Shared field/pair editor

Extend `AddToOntologyModal`; do not create a separate settings-only editing workflow. The same content and validation must serve manager entry points and Markdown's Add/change ontology action. Native shells may remain distinct from portable presentation.

Fields: physical property name, role, optional paired property, and read-only derived partner role. Existing physical names are identities, not free-form display captions; keep existing names read-only in this PR rather than introducing ambiguous vault-wide rename behavior. A new field has an editable name. Use **Add field**, not **Add relationship**, in Settings: this configures vocabulary and does not link two notes.

Use the existing reciprocal mapping:

| Selected role | Partner role |
| --- | --- |
| Parent | Child |
| Child | Parent |
| Previous | Next |
| Next | Previous |
| Friend | Friend |
| Challenger | Challenger |
| Hidden / Excluded metadata | No pair |

Keep `ontologyConfiguration`, `eligibleOntologyPartners`, `assignOntologyField` and `normalizeFieldName` as the authorities. The inspected configuration tests already reject incompatible pair roles and partner stealing; the proposed Child/Challenger mismatch is **not a confirmed missing guard in #190**. Add explicit regression coverage for that example without claiming a reproduced bug.

Support these operations:

- Add an unpaired field or assign a discovered field to a role.
- Pair with an existing eligible, unclaimed field. Show the partner's role in suggestions. An incompatible or already paired existing property cannot be silently moved or stolen.
- Create both names of a new pair without requiring manual raw syntax or a preliminary saved field. Treat creation of the second property as an explicit choice, with the derived role shown. This preserves the capability currently available through a single `A/B` textarea entry. Validate both names and commit their complete candidate together.
- Unpair explicitly, preserving both physical fields as ordinary assignments in their original roles and order. Replacing a partner also preserves the old partner's assignment.
- Edit an existing pair's roles as one unit. Changing the first role derives the second role **in the local draft only**. Show both old/new assignments and require explicit **Save both directions**; never auto-save on dropdown change. Offer unpairing when only one endpoint should change. Hidden/Excluded requires explicit unpairing, with the unaffected field preserved.
- Remove one named field's ontology assignment, not notes or properties in the vault. If paired, explain that the pairing is removed and the other field remains assigned. An unassigned field remains discoverable if present in the existing inventory; removing an assignment is not excluding metadata. Warn that graph interpretation may change. Do not add bulk deletion or bulk source rewriting.

Save and Cancel must be explicit for this structured form. No per-keystroke persistence, role changes, or index work. Do not force a structured editor into `TextSettingDraft`'s textarea autosave policy merely to reuse its class. Preserve equivalent conflict/retry/composition protections. Invalid drafts remain local; storage errors retain the draft; saved-but-refresh-pending is not an unsaved state and must not invite duplicate writes.

## 5. Shared implementation structure

### Reuse map at the pinned baseline

| Existing owner | Planned use |
| --- | --- |
| [StyleManagerList](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/ui/StyleManagerList.ts) | Native manager mechanics already shared by node styles, relationship styles and themes. It does not own ontology rules, inventory or writes. |
| [settings.ts](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/settings.ts) | Declarative navigation, existing style-manager integrations, ontology summaries and discovered-field routing. Replace primary textarea destinations and duplicate discovered list. |
| [ontologyConfiguration.ts](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/core/contracts/ontologyConfiguration.ts) | Raw grammar, normalized roles, reciprocal pairing, eligible partners, lossless escaping and pure candidate edits. |
| [AddToOntologyModal](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/ui/AddToOntologyModal.ts) / [OntologyPartnerSuggest](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/ui/OntologyPartnerSuggest.ts) | Shared native editor and eligible-partner suggestions. Preserve stale-owner, busy, Save/Cancel and teardown behavior. |
| [OntologySuggester](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/editor/OntologySuggester.ts) | Native Markdown trigger/query lifecycle and exact physical-field insertion. |
| [NewRelatedNoteModal](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/ui/NewRelatedNoteModal.ts) | Shared React composer for creating/linking notes and fixed-target ontology additions. `.ts` is canonical; inspect whether an old `.tsx` companion exists before applying the repository's extension-compatibility rule. |
| [FuzzySearchInput](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/ui/FuzzySearchInput.tsx) / [FuzzySuggester](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/ui/components/FuzzySuggester.tsx) | Existing matching and input/portal/keyboard mechanics. `getLabel`, `getDetail` and `resultPrefix` are available; prefer these over a replacement widget. |
| [main.ts](https://github.com/zsviczian/kplex/blob/843e47f471f897951165b962e12a1d6a64ce089e/src/main.ts) | `assignFieldToOntology`, `updateOntologyField`, private `updateOntologyConfiguration`, settings queue/reconciliation, role/default/inverse lookup, manager lifetime and Hidden-settings navigation. |

Create a small **field/pair presentation model** from an already decoded `OntologyConfiguration`. Proposed names are implementation suggestions, not existing APIs. It needs stable normalized identity, physical spelling, effective role, optional partner/partner role, and state. Derive a deduplicated manager-row projection and a separate per-physical-field selection projection. Neither is a persisted registry or a graph/source DTO.

Place ontology-specific presentation in the appropriate feature/presentation layer, not domain-independent `src/ui/components`. Reuse one compact display/formatting owner across consumers. Native DOM adapters and React consumers may use thin rendering adapters over the same model, localized text and CSS; do not mount a React root per native suggestion merely to claim identical components. A reusable full pair row/editor and compact field detail are distinct views of the same data, not one giant mode-switching widget.

Reuse `StyleManagerList` directly in the native manager. Do not import its host-bound implementation into portable React or migrate all style managers as a prerequisite. If a small shared extension is necessary, keep node/link/theme behavior unchanged and add regression coverage.

### Atomic configuration changes

`updateOntologyConfiguration` is currently **private**. It already serializes edits against `settingsForWrite()`, validates, writes the durable snapshot, publishes affected groups and delegates the existing impact-based refresh. Do not call it from UI via a cast or expose arbitrary settings mutation callbacks.

For new-pair creation, pair-wide role changes and removal, add a narrow typed operation entry point at the existing host/application boundary and pure candidate transformations in the existing configuration owner where needed. Name those new APIs explicitly in the implementation. Existing single-field operations can continue to delegate to `assignFieldToOntology`.

Capture the opening field/pair state and `receivedSettingsOwner('hierarchy')`. Inside the one existing queue, recheck affected endpoint roles, partner ownership, required ordering anchors and source configuration. Preserve unrelated concurrent edits; refuse changed affected endpoints with recoverable conflict feedback. A stale UI row must not silently target a newly re-paired property.

Build a detached candidate, apply the complete operation, validate its final configuration, and persist **once**. Do not perform two durable single-field saves for a pair edit: that would expose a transient unpairing/invalid role combination and extra semantic refresh. Do not mutate cached arrays in place. Preserve unrelated raw entries, legacy multiplicity, escape sequences, pair declaration side on unchanged Save, and ordered defaults. Round-trip existing `hierarchy` and `ontologyPairingVersion: 1`; no schema migration is required just to replace the UI.

Reuse current settings notifications and exact lifetime cleanup to keep open managers/selectors current. Clean readers may refresh; a dirty editor must retain its draft or become explicitly conflicted, not be overwritten. Avoid new timers, polling, global registries, per-row listeners or coupling ontology ownership to an appearance-theme activation.

## 6. Pair-aware selection outside Settings

**Markdown suggester:** show the exact inserted field prominently and a secondary `Paired with: <partner> · <role>` line. Selecting inserts only the primary physical field followed by the current `:: ` syntax, including existing bold/mid-sentence behavior. Never insert a slash pair or decorative label.

Search either name, with direct matches ahead of partner-only matches. Preserve existing role-trigger eligibility; matching a partner must not offer an otherwise ineligible primary role. In the all-role picker, both endpoints remain independently selectable. Mark partner-only matches clearly, so remembering the other term helps without causing an unexpected insertion. Keep the native trigger matcher and its long-line/long-paste complexity unchanged; do not invoke graph search or source discovery while typing.

**Related-node composer:** reuse `FuzzySearchInput` and its detail slot for the same annotation. Keep one option per physical field, existing role/All filter, default selection, explicit empty-query disclosure and fuzzy ranking. The pair annotation remains visible for the selected value after the popup closes. Preserve name/alias/folder drafts, fixed-target flow, Link confirmation, Markdown/Excalidraw/Placeholder/URL actions, create-another completion and saved-pending/partial-file recovery.

The annotation describes the selected property; it must not imply that it will always be written on the central node. The existing mutation owner may write the inverse on a Markdown target when the origin is non-Markdown. Do not change that decision or mirror a property onto both notes. Preserve current physical style keys, exact-field filters and provenance/unlink identities.

Settings **All** deduplicates pairs; selector **All** does not collapse their two selectable field identities. This distinction needs an explicit test for Friend/Friend and Challenger/Challenger.

## 7. Scope and resource guardrails

No changes to GraphBuilder/GraphIndex scheduling, source acquisition, Markdown parsing, semantic classification, evidence schemas, graph snapshots or IndexedDB formats. No cache purge, implicit rescan, new background task, mirror writes, graph-layout change, new default ontology pairs, or general settings/style refactor. Do not absorb the startup defect or browser-bootstrap limitation recorded under #190 into this UX assignment.

Opening/browsing/searching/filtering/Show more/canceling and typing unsubmitted drafts must do no additional note reads/parses, semantic preparation/publication, source acquisition, full builds, snapshot writes or settings saves attributable to those interactions. Selecting an ontology candidate alone does not write settings; explicit creation/link/save retains its existing effects. Isolate legitimate unrelated startup/discovery work in measurement rather than suppressing it or claiming that the whole application is idle.

Pair/unpair between unchanged compatible assignments must retain semantic-signature equality and zero semantic/source work. Real membership/role changes use the existing settings-impact pathway. Do not bypass necessary semantic invalidation to meet a blanket zero-work assertion. An explicit discovery rescan is a separately measured, deliberate exception.

Retain existing list order and remembered defaults even if the manager displays alphabetically. Retain literal slashes/backslashes through the shared escaping owner; no manual `split('/')` in UI. Preserve Hidden versus Excluded versus Unassigned meaning. Keep styling in Visual styling; do not bundle link-style editors, pair-wide style synchronization, lenses or Connection details redesign into this PR.

New/changed copy belongs in all eight language catalogs. Preserve user-authored field spelling, Unicode and case/space normalization rules. Use native components, Obsidian theme variables, Lucide icons, owning-document/window lifetimes and keyboard/screen-reader names. Inspect actual installed Obsidian declarations and official documentation before using unfamiliar APIs. No scanner suppressions or weakened architecture/test gates.

## 8. Implementation sequence and acceptance

1. **Characterize and project:** trace remaining callers and baseline tests; add presentation-model tests for pair deduplication, oriented role filters, localized search, Unassigned/Excluded separation, legacy duplicate assignments and per-field selector identities. No changes to raw configuration on read.
2. **Settings first:** integrate the native manager and shared editor; adapt declarative navigation, Hidden setup links and discovered-field entry points. Implement only the narrow missing pure edit operations and their one-queue host route. Validate this before adapting suggestion consumers.
3. **Selection reuse:** enrich native Markdown suggestions, partner suggestions and the React composer through the shared model/formatting. Preserve selection/insertion/write semantics and all existing controls.
4. **Validation and delivery:** update user-facing `docs/ONTOLOGY_PAIRS.md` and relevant README wording, all locales, and affected native drivers. Remove the temporary planning marker. Return implementation/results here for independent review; update the existing PR with actual evidence, not planned successes.

Do not maintain a second advanced raw editor by default. If removing the textarea reveals an essential compatibility operation not covered above, characterize it and add the narrow manager equivalent; do not silently delete capability or invent a bulk migration.

### Required automated coverage

Extend actual production-path tests, not reimplemented toy logic. Start with the existing suites `tests/ontology-configuration.test.mjs`, `tests/ontology-pair-modal.test.mjs`, `tests/ontology-input.test.mjs`, `tests/ontology-suggester.test.mjs`, `tests/ui-components.test.mjs`, `tests/excalibrain-migration.test.mjs` and `tests/source-relationship-mutations-indexeddb.test.mjs`. Inspect their loaders before choosing commands. Reuse `tests/support/styleSettingsHost.mjs` for real queued-writer checks where applicable and maintain its finite module inventory. Add focused manager/presentation tests where no current suite fits.

Acceptance cases:

- All/each role/status, partner-name search, pairs represented once in manager views, correct role orientation and no stored reorder; same-role pair endpoints independently selectable.
- Unassigned assignment/removal and Excluded/Hidden distinctions; no new scan on display, and explicit rescan still works through its existing owner.
- New field, two-new-name pair, existing eligible pair, replacement, unpair, pair-wide role edit, single-endpoint removal, Cancel and unchanged Save.
- Every allowed reciprocal role plus explicit Child/Challenger rejection; self/normalized-self, chains, reversed duplicates, reused partner, incompatible/unsupported roles and malformed entries.
- Literal slash/backslash, Unicode and legacy imports; no invented pairing; unchanged unrelated fields/order/defaults/style keys and no source-note rewrites.
- One durable transaction for pair edits, failing storage, saved-refresh-pending, double Save, close/unload while pending, stale row/received settings, overlapping affected edits and mergeable unrelated edits. No intermediate published state.
- Exact editor insertion and replacement ranges, all/custom triggers, bold fields, IME, paste/long-line regression; direct versus partner-only match selection.
- Composer existing/new/fixed-target flows, disclosure with empty query, both same-role field options, inverse-write behavior for non-Markdown origins, keyboard selection versus form submit, and retained partial-save recovery.
- Regression checks for node/link/theme managers after any shared-shell change, including focus, counts, Show more and no new rendering on unrelated changes.
- Operation counters for read-only UI and compatible pairing changes; required semantic updates still happen for actual role/membership edits in both indexing modes.

Run `npm run verify` on required Node 22.22.2 with the real installed Obsidian type package. Record actual results and any failures; do not replace the real build with a stub check or weaken assertions. The planning checkpoint did not run these suites.

### Main-agent native acceptance

Use an existing explicitly configured disposable Small vault and exact staged artifacts. Run `npm run verify:obsidian`, then adapt/run relevant existing `verify:obsidian:ontology-pairs`, `verify:obsidian:ontology-pair-reload`, `verify:obsidian:ontology-input` and `verify:obsidian:external-settings` lanes. Old textarea assertions must be replaced by meaningful manager/editor assertions, not deleted merely to make a lane pass. Reuse existing composer/editor native drivers for the new selection details. Run browser/native drivers serially; no personal vault, cache reset or invented host pass.

Exercise real Settings navigation and Hidden deep links; both asymmetric and symmetric pairs; a stationary Plex while saved roles/pairs change; main, Settings popout and graph popout; incoming settings while a dirty editor is open; no-Plex management; reload persistence; and a long synthetic vocabulary at narrow widths. Record exact artifact hashes, owner/focus/scroll behavior, source-work counters and fixture/configuration restoration.

Up to three physical/manual checks remain separate from automation: (1) main/Settings-popout readability and pair orientation at narrow/wide sizes, (2) macOS and physical phone/tablet selection, software keyboard, focus and scrolling, and (3) end-to-end pairing from Settings followed by writing each endpoint and inspecting both graph perspectives. Only request manual work that available host automation cannot establish.

## 9. Return requirements

Overwrite the assignment body with the implementation return when transferring to the main reviewer; preserve the standing header. Retain durable design/results in the existing PR and appropriate feature docs before replacing this transient body. Do not create a dated handoff archive or a session report in the refactor ledger for this non-refactor task.

Return exact branch/base and local diff identity; changed-file inventory; which accepted behavior is complete; real commands, Node/host versions and outcomes; source/artifact identities; architecture/component reuse/TSDoc/localization review; failed or unavailable checks; and cleanup status. Distinguish implementation from portable/browser/native/device acceptance. Explain any remaining product decision without silently expanding scope. The next main-agent action is independent full-diff review, exact-build validation and authorized publication on this same branch.

Keep the PR draft. Do not merge, release, rewrite history, delete branches or mark #151 newly fixed by this plan. No runtime tests or performance improvement are claimed by the planning checkpoint.
