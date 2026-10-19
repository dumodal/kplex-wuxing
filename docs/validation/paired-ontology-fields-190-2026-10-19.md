# Paired ontology fields and directional captions (PR #190)

Implements [#151](https://github.com/zsviczian/kplex/issues/151) on
`2026-10-19-issue-151-directional-labels`, after merging main `f3c2260` without
rewriting history. The PR remains draft and the issue remains open. No personal
vault, release, merge or branch deletion is part of this task.

## Behavior and boundaries

The existing ontology textareas persist the authoritative configuration. One
`replies to/replied by` entry under Previous assigns two ordinary fields to
Previous/Next and records their display pairing. Either ordinary inline or YAML
declaration suffices; there are no mirrored writes. Parent/Child, Previous/Next,
Friend/Friend and Challenger/Challenger use the same configuration owner.
Hidden/Excluded cannot pair. Duplicate, reversed, chained, self, competing and
role-conflicting pairs are rejected without replacing the last valid policy.

The native Add/change ontology modal adds one optional reciprocal-field input,
using the existing fuzzy matcher. It retains current partners, requires explicit
resolution after incompatible direction changes, preserves former counterpart
assignments, and revalidates both endpoints in the existing settings queue.
Cancellation, unchanged Save, concurrent dialogs, incoming-owner epochs,
duplicate submission, storage failure and saved-refresh-pending retain their
existing lifetime distinctions. Atomic publication updates affected roles while
preserving unrelated later imperative drafts; a conflicting legacy whole-root
save still requires its existing explicit retry.

Both reciprocal role rows also show a bounded, read-only summary of their shared
pair. This explains a standalone Parent entry beside a Child pair without
duplicating the editable declaration or moving the existing default field.

A settings-only cached projection supplies effective ordinary lists to existing
semantic consumers. It preserves unrelated ordering/multiplicity and the existing
version-4 semantic signature. An absent syntax version migrates literal slash and
backslash names through escaping; foreign ExcaliBrain fields always remain
literal. Partial imports preserve an implicit counterpart when its opposite role
was not supplied. Unsupported syntax versions are refused. A snapshot for an old
literal field is not accepted as if it represented newly expanded assignments.

Captions use active evidence and original declaring/target endpoints. Physical
definitions remain the keys for filtering, styling, source navigation and
mutations. Ordinary, crosslink, expanded descendant and transient/folded section
captions share the helper and SVG label renderer. Missing provenance falls back
to the available physical label. Disabled labels and irrelevant pairs do not
request caption-specific explanations. Reverse creation uses the configured
counterpart; reverse unlink still removes the actual original property.

Pairing changes no Markdown/YAML grammar, semantic compiler algorithm, source
record, evidence DTO, snapshot codec or inverse metadata. A separately authorized
startup fix below changes admission of visible edits within the existing writer.
Real source/role changes retain normal processing. All eight locales and
the [user guide](../ONTOLOGY_PAIRS.md) are maintained.

## Automated evidence

Final verification results and exact build identity are recorded below when the
serial portable and native lanes finish. Environment: Windows, Node **22.22.3**,
real installed dependencies/Obsidian typings. The requested exact **22.22.2**
runtime is not installed; this patch-version difference remains explicit.

Focused checks before the final full run passed: configuration/caption/compiler
and import regressions (145), production native-row/modal regressions (22),
indexing fixture plus 27 real-owner settings-independence scenarios, extracted
host/presentation regressions (149), actual SVG caption and crosslink rendering,
architecture, official Obsidian scanner and production build. Subsequent finite
publication and Hidden-first lookup corrections have dedicated regressions.

Full/incremental compiler cases compare ordinary and paired effective inputs for
every role, inline/YAML authoring from either endpoint and both-authored cases.
Real settings/index owners additionally check unchanged declarations,
fingerprints and signatures, pair/unpair zero-work and active/checkpoint warm
snapshot reuse. Exact-field styles/filters, missing provenance, Date/URL/ghost
endpoints and disabled/irrelevant label lookup guards are covered separately.

## Native evidence

Only explicitly selected **kplex-test-small**, with verified CLI path and artifact
hashes, is used. Native host: Obsidian **1.14.4**, installer **1.14.0**. Scenarios
own timestamped notes, dialogs, semantic leases and main/split/popout leaves.
They restore preferences, configuration bytes and native state independently of
assertions. The pre-staging baseline has 107 files, including 88 Markdown files,
and no K-Plex view.

The initial successful native workflow exercised actual Settings/manual pairing,
stationary reverse wording, physical-field width preservation, independent
main/split/popout perspectives, native current-partner unchanged Save,
both-authored wording deduplication, configured counterpart YAML creation and
reverse-source unlink. During its controlled pair-only interval, all eight work
counters were **zero**: Vault reads, parses, full builds, semantic invalidations,
preparations, acquisitions, publications and snapshot persistence calls. This is
a functional work-count observation, not an indexing-speed or paint measurement.

Final section/reload results and restoration checks remain pending until their
drivers complete. Plugin reload is distinct from whole-application restart.

The section workflow subsequently passed all 12 cases, including actual
transient and folded captions. Earlier folded-section failures clicked the old
center before navigation had rendered: the captured dispatch targeted B while
the probe expected A. Waiting for the actual central DOM path corrected the
probe; no runtime caption workaround was added.

## Pre-existing startup ontology defect

The maintainer's report described an ordinary field failure before pairing:
A originally declares B in YAML Child; while startup is still indexing, B gains
`Parent:: [[A]]` and A's old Child declaration is removed. B can appear as an
inferred Friend until later source work or navigation. Restart recognizes the
ontology. This is separate from reciprocal display wording.

A focused real-GraphIndex/GraphBuilder/Chromium-IDB reproduction holds an
unrelated startup tail **after A and B have passed the progressive cursor**,
then delivers both source edits and the normal visible-refresh calls. The
expected immediate Defined Child fails identically against isolated main
`f3c2260` and the #190 candidate, with no paired fields configured. These are
functional controls, not comparative performance experiments.

The causal path is source admission: `refreshVisibleMarkdownPath()` requests the
active center, but `ensureOnDemandCenter()` sees the busy build and retains its
build waiter. Its host preview uses only current available hot bodies; B's edited
inline declaration has not been acquired/committed by that writer. The removed
YAML declaration is no longer available, so native links can remain inferred.
Pairing an already configured field changes no effective role and correctly does
not bypass this source gap by forcing reindexing.

The ordinary retained-backlog patch, once admitted after the build, publishes
the Defined Child and original Parent field to the same stationary demand. The
maintainer subsequently authorized fixing this confirmed defect in #190, in a
separate checkpoint. Failed main/candidate reproductions and minimized inputs
are preserved privately.

The fix lets the **same progressive writer**, between complete source
transactions, drain at most 64 coalesced visible-file edits before continuing its
existing cursor. It uses normal GraphBuilder patches and the existing atomic
publisher. No private staging or native read is interrupted, no independent
writer is introduced, and completed unrelated sources are not restarted. The
ordinary no-edit path retains its original batch, notification and yield
behavior; an empty admission check creates no Promise or task yield. Early
visible sources are skipped when their original queued position is reached.
Native identity, current demand, generation and all normal patch fences remain
in force. Overflow stays in the coordinator's existing durable edit backlog.

The updated real-browser regression holds Pause after the cursor passed A/B,
delivers actual host observations plus visible refreshes, then releases only
Pause. A must display the Defined Child from B's Parent declaration while an
unrelated Tail remains held, with the same central demand and exactly one new
body read per edited owner. Same-stat edits, repeated notifications, released
demand and cancellation are covered. Existing late progressive-ontology cases
retain coverage of newly processed sources before build completion.

This fixes the reproduced progressive-ingestion path at its next safe source
boundary. It does not establish every possible cause of the original large-vault
observation or preempt an already-running native read. Warm source-authority and
whole-application restart variants remain separate acceptance; no rejected source
reader-sharing, receipt or broad startup optimization experiment was reopened.

## Retained failures and baseline correction

Early portable harnesses omitted newly imported modules and retained the old
native-modal context shape. Finite inventories now load the actual new owners;
production invariants and mutation assertions are retained. Early parser/parity
fixtures also needed the real resolved-target lookup and lossless literal-name
oracle. These failures are preserved privately.

The archived scene golden predates main #189's font-ink padding. Independent
isolated **main `f3c2260`** and **candidate `50d7424`** controls, with assertions
intact, failed the same old geometry values and produced **identical canonical
graph, evidence and scene output**. The indexing test applies only explicit
finite height/dependent-y deltas through its existing typography-delta helper,
checking each unique archived node and original scalar. No archived golden,
graph/evidence comparison, timing guard or production layout was weakened.

An early native expectation used spaced unpaired wording; the trace proved the
existing renderer correctly uses the normalized physical field name. The probe
was corrected, with no runtime change for that observation. Its first cleanup
also needed the existing native force-delete convention for a verified empty
owned folder; that folder was removed only after identity/emptiness checks.
One follow-up was started before prior cleanup finished and the controller guard
rejected it. Both failures remain evidence; the successful run began after the
controller and owned-file inventory were verified clear. Subsequent native and
browser-bearing lanes are serialized.

Raw logs, baseline configuration, failed observations and isolated controls stay
private; their final durable backup/checksum is recorded after restoration. No
raw traces are committed or published.

## Remaining acceptance

No comparative performance campaign ran under the user's restriction. Dense-scene
CPU/responsiveness, latency and memory comparisons therefore remain pending; no
performance improvement is claimed. Constant-size configuration-cache checks,
bounded visible-pair lookup behavior and functional zero-work observations do
not replace those measurements.

macOS, physical phone/tablet, whole-application restart and subjective paint
acceptance remain unverified. Prioritize a real-device optional-partner edit and
an application restart with a paired note central; the automated Windows/plugin
reload checks cannot establish those platform behaviors. Keep #190 draft until
the maintainer reviews or accepts these limits.
