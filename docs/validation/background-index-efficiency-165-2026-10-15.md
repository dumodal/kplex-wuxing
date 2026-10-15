# Background indexing resource efficiency — PR #165

The duplicate-read correction halves repeated resolution-family authentication during unchanged
resolver waves; three counterbalanced real-IDB pairs reproduce the reduction. The current receipt
is **rejected for shipping**: one large Markdown file excludes a vault, normal edits lose eligibility,
and native window restart order can prevent safe retention. Three additional source-provenance
probes incorrectly accept stale host-owned frontmatter/wiki/tag facts after same-stat edits.
Final promotion also needed a durable-source race correction. Scale resource comparisons are still in progress; no receipt
efficiency win or merge approval is claimed. Keep the duplicate-read checkpoint independently reviewable.
Merged #163 baseline: `8df393a`; integration checkpoint: `a86b4a0`. The shipping baseline main is
SHA-256 `e5994ecce833d5e3e17ad3615fec740ffa45aa3e87066e0c58b7f8d501440a0b`.
#153/#163 behavior and architecture remain; C14 is accepted and C15–C26 remain paused.

## Initial work counts

`scripts/testing/source-validation-work.mjs --baseline-ref=8df393a` runs genuine acquisition,
dependency closure, a new storage connection/acquisition lifetime, and the production restart
inventory in real Chromium/IndexedDB. Setup is outside measurement. The second case delivers
an ordinary `resolved` event to the existing source owner; it does not disable validation.

| Markdown owners | Clean restart transactions | Unchanged resolver-wave transactions |
| --- | ---: | ---: |
| 32 | 233 | 682 |
| 64 | 457 | 1,354 |
| 128 | 905 | 2,698 |

All cases reach genuine source authority with zero native body reads, parses or source repairs.
At 128 owners the resolver-wave case calls `inspect` 384 times, pins 768 times, checks local
dependencies 256 times and delivers metadata/resolution families 256 times each. It invokes the
digest owner 2,816 times versus 512 without the wave. These are operation counts, not CPU or
battery measurements. They identify repeated family proof as a candidate for a bounded correction;
the offline metadata/dependency-upgrade barrier remains necessary.
[Compact samples and source/tool identities](background-index-efficiency-165-samples.json) retain
the validated counts; full raw groups are preserved separately.

## First production correction

An already authenticated body selection can defer resolution authentication to the existing
exact-head canonical comparison. It still validates metadata, checks the identical selected
sequence/revision, and performs the normal stored-resolution integrity checks and fresh resolver/
Date comparison. Changed selections validate all families. A concurrent foreground proof cannot
turn the partial inspection into a host-current shortcut. Optional URL-alias maintenance retains
its complete primary-family proof. No cache format, authority, scheduling or retention bound changes.

| Owners | Resolver-wave transactions, baseline → candidate | Resolution-family visits | Digest calls |
| --- | ---: | ---: | ---: |
| 32 | 682 → 650 | 64 → 32 | 704 → 608 |
| 64 | 1,354 → 1,290 | 128 → 64 | 1,408 → 1,216 |
| 128 | 2,698 → 2,570 | 256 → 128 | 2,816 → 2,432 |

All three AB/BA/AB pairs give the same counts: **4.7% fewer transactions**, **50% fewer resolution
authentications**, and **13.6% fewer digest calls** at 128 owners. Clean transactions remain
233/457/905. Every case closes actual source authority with zero Markdown reads, parses or repairs;
the 128-owner peak transient decode reservation remains 5,277 bytes. Synthetic elapsed samples
are retained, but these results do not establish native CPU, whole-startup, battery or thermal gains.

## Native diagnostic baseline

The unchanged merged runtime, with the detailed test observer, passes genuine full saved hydration
and source closure in `kplex-test`: 20,088 Markdown owners, 108,217 nodes, 197,561 declarations.
First observed readiness is 1,047.1 seconds after renderer navigation, stable readiness 1,049.3s,
and real cache/task drain 1,051.5s. The following **610.709s** quiet window passes with zero
violations, no new broad work, no pending resources and no active transactions. All observed
selected-window samples are foreground; cleanup succeeds.

The process CPU delta through the quiet window is 337.906s (294.578s user / 43.328s system),
including 5.672s during quiet observation. It starts when the onload observer is installed, excluding
earlier module/application startup; it is not a plugin-exclusive or whole-application CPU measure.
The diagnostic records 455,929 native transactions, two actual broad source passes, one actual full
build and one successful complete save. The probe counts three inventory method admissions because
joins are calls too: admissions must not be reported as three completed passes.

Resolution authentication is 40,176 deliveries for 20,088 owners. The save submits 279,044,330 bytes
of page/chunk JSON payloads; 20,076 local-dependency-owner puts occur independently of source-fact
writes. Zero body reads/parses/repairs or source chunks written therefore does not mean zero storage
work. No before/after graph checksum was captured for this initial diagnostic, so the save is not
claimed proven equivalent. New matched trials use separate, untimed stored-cache identity receipts.
Sampled maxima are 2,148,379,820 heap bytes and 2,865,561,600 RSS bytes, not controlled retained heap.

An earlier setup centered a generated note attached to the 19,999-incoming-link hub. It settles
incomplete with `decode-budget`; no timed trial started. That failed high-fan-in setup is preserved
separately, rather than counted as an ordinary-center success. The successful ordinary case uses an
original help note disconnected from that generated hub. The 20,000 generated notes occupy only
8,831,230 Markdown bytes; this is a high-node/link fixture, not the separate large-prose fixture.
Its [original generator](https://github.com/zsviczian/kplex/blob/62c728393440aa3dfb57869ece83c4060092bcba/scripts/testing/generate-high-node-vault.mjs)
reproduces digest `50b8cb12ef83c3cd62f1605390fe6ff793079a9f6e37e471e59d0060cf287cd0`;
the fixture plus 88 help notes is held fixed. All88 help Markdown files match
[`kplex-help@f5f667e`](https://github.com/zsviczian/kplex-help/tree/f5f667ee7b36fbc218d88720fdd67a07a4ad562d)
byte for byte; a source/path/checksum manifest is preserved without note payloads. Fixture
timestamps, generated source identities and cache history are local state, not portable content IDs.
Fixture limitations remain explicit.

## Graph retention and reporting

The existing graph fingerprint is not a complete certificate relating a saved graph to its source
generation and resolver/Date environment. Zero activated heads or matching mtimes cannot replace
that proof. The [optional source-receipt proposal](background-index-efficiency-165-source-receipt-proposal.md)
was approved by the maintainer as a separately measurable/revertible checkpoint under the PR's
persistent-format boundary. Its separate implementation is under validation; native resource
acceptance is pending. Legacy/uncertain coverage keeps conservative fallback. The PR stays draft
and unmerged for review of safety and resource results.

The optional version-two `active.sourceReceipt` field uses the existing schema-3 graph metadata
and database version10; no store/version migration or purge occurs. It binds the exact generation,
page/evidence record commitments and counts, source sequence and ordered exact-head commitment,
canonical version3 input fingerprints in actual full-compiler Markdown replay order, Markdown count, and selection/policy metadata. SHA-256
commitments use fixed32Ki-character frames and the existing streaming serializer/digest capability;
neither a whole encoded graph nor another per-note proof map is retained. A semantic contract
change requires a receipt-version change; missing, malformed or unknown versions keep legacy reads.

| Receipt field | Version-two meaning |
| --- | --- |
| `version`, `fingerprintVersion`, `generation` | Receipt protocol 2, canonical fingerprint protocol 3, exact active graph generation. Protocol1 falls back conservatively. |
| `source.sequence`, `source.heads`, `source.inputs`, `source.markdownOwners` | Selected global revision, ordered exact-head digest/count, canonical input digest/count, and Markdown coverage. |
| `pages`, `evidence` | Ordered persisted-record digest/count, including declaration multiplicity. |
| `binding` | Commitment to those fields plus active key/schema/generation/time, vault/settings signatures, URL version, discovered fields and chunk counts. |

Each stream digest contains `sha256` and `records`; malformed counts or a mismatched input/owner
count refuse the optional capability. These are local equality/integrity checks, not an adversarial
security certificate. Receipt absence never forces migration or rewriting by itself. Normal saves
replace generations; old readers ignore the optional field, and old writers naturally omit it.
Cancellation preserves the previously active generation. Purge/unload and source, policy, graph or
host-lifetime invalidation retire proof; unsupported uncertainty keeps existing validation.

Receipt creation accompanies only an already necessary canonical full compilation and legitimate
complete save. Missing first-creation stream coverage can require one additional real source pass;
that cost must be reported, not hidden in setup. The source owner first closes actual validation.
Its sequence and exact catalog must remain unchanged around compilation; the compiler's existing
private fingerprint map must match the authenticated stream in that pass's captured order. Final
input commitments bind the compiler's actual encounter order, independently of inventory traversal. No new
per-owner proof map, graph traversal order or compiler hook is introduced. Actual Date/Daily Notes returns are
latched, so observed A→B→A drift refuses proof. The metadata activation transaction rechecks the
source sequence. Checkpoints and uncertain/cancelled work never receive a receipt; an optional-proof
failure still permits the normal legacy-readable graph save.

On reuse, payload integrity is checked in the existing hydration streams. The existing inventory
authenticates current resolution and reads/parses actual notes through `Vault.read`, comparing
their canonical inputs with the saved graph. This catches offline same-stat semantic edits without
trusting a cached host hash. A mismatch repairs that real source owner and rejects older coverage.
**Those extra native reads/parses are real work and must be included in the resource comparison.**
Eligibility currently requires every Markdown file's reported bytes ×2 to fit the existing256KiB
source-chunk target, and actual decoded text must also fit that bound. A larger/uncertain note
declines the optional path before a fresh-content scan; the ordinary pipeline remains available.
The large high-node fixture's largest note is37,623bytes, so this is not large-prose acceptance.
Text/hash ceilings are not a bound on total parser DTOs, worker copies or the whole UI graph;
dense single-note and physical-mobile memory acceptance remain separate.

A matching current proof promotes the complete graph without replacing its identity, a compiler,
global catalog replay or save. The coordinator clears only covered backlog; later changes remain.
Both existing initial-source adoption and subsequent rebuild coordination attempt this proof.
Even a quiet-host graph with matching physical statistics remains cached presentation until current
receipt validation completes. This prevents early legacy freshness from bypassing same-stat repair.
One bounded observer can revalidate a later genuine unscoped wave; quiet polling starts no new
pass. A graph/policy publication, purge or unload retires it. Unsupported finite differences keep
existing patch/fallback paths. Per-file publications currently retire eligibility: refreshing a
receipt across independently patched generations is deferred, not implied by matching mtimes.
An ordinary saved edit can therefore lose eligibility until the next legitimate full compilation;
no broad build is scheduled solely to regenerate the receipt.

The actual Windows plugin-disabled same-stat regression passes with unchanged mtime/size/ctime:
the source body is repaired, the old receipt grants no authority, and an actual requested scope
produces the new canonical note type. The ordinary source-backed fallback can retain cached global
fingerprints; it need not compile the whole graph solely to update a diagnostic map. The owned note
is removed and the plugin stays loaded. This is not a full-process offline or resource benchmark.
Earlier failures remain preserved: the initial helper checked green status prematurely; a stricter
run exposed quiet-host authority routing; another asserted global fingerprints during legitimate
source-backed fallback; a later fixture save raced queued native metadata work. A red real-IDB
quiet-host authority regression and both real coordinator routes now cover the correction. The
helper waits for queued and active reconciliation and verifies current canonical scoped semantics.

The earlier native reload exposed a mismatch between source-pass and saved input enumeration.
Checkpoint128cb28 canonicalized input commitments by source-head key and passed native functional
checks. A subsequent real compiler oracle demonstrates that this is insufficient: reversed note
order changes a shared URL's preferred label and ordered aliases while all per-owner tokens match.
Protocol2 therefore binds actual compiler replay order and verifies the current host enumeration
before accepting warm inputs. Source head identity remains independently key-ordered. Creation
cross-checks the compiler's existing private map order; concurrent order changes reject capability.
No compiler, inventory or alias ordering changes. The previous protocol1 safely uses ordinary
validation; its native results remain diagnostic evidence, not acceptance of the final protocol.

After hydration, an unfinished startup source pass now retains its actual existing note progress.
Its existing source callback also refreshes subscribed status listeners through the existing 250ms
throttle; only source-authority work advances the hydration watchdog. A real saved-graph regression
reproduces the missing notification and verifies the correction without graph publication or note reads.
Compilation, saving, URL work, On-demand mode and settled outcomes retain their own labels. All
visible strings already exist in the supported catalogs. Constant-size session counters distinguish
actual broad source passes, full-build/catalog starts (including cancelled starts), and successfully
activated complete/checkpoint saves. They continue after readiness until unload, independently of
detailed timing opt-in. The support report exports only these allowlisted counts and retains the
existing completion route; missing older evidence remains unknown.

## Product-fit decision gates

**Safety gate fails independently of performance.** After the passing40-case verification, three
additional real-IDB probes keep host metadata cached and change actual same-stat content: YAML
frontmatter, ordinary body wiki links, and body tags. All three incorrectly promote the old graph.
The fresh parser intentionally skips frontmatter and supplies inline fields/URLs; the fingerprint
still borrows frontmatter, tags and resolved-link facts from Obsidian's cache. A fresh `Vault.read`
therefore does not authenticate every semantic source. The red cases are preserved, not suppressed
or described as passing. A new raw hash alone also needs provenance connecting compilation's host
metadata to the actual bytes. No second parser, cache purge or broad redesign is introduced to
rescue this candidate. Preserve this rejected source checkpoint for evidence, and defer the receipt.

Every Markdown file must have a known nonnegative byte size at most131,072bytes, and actual decoded
text must fit262,144UTF-16bytes. This is a whole-vault restriction, including drawing Markdown; no
owner is omitted from completeness. It additionally requires Eager mode, a complete compatible
snapshot with current URL facets, exact source/graph/input/policy coverage, a semantic descriptor
at most64KiB, and at most1,024 observed environment fields within64KiB. Unknown or changed coverage
declines the optional path; it does not purge sources or the ordinary graph.

| Actual-input test | Receipt eligibility |
| --- | --- |
| Ordinary prose exactly128KiB; other notes small | Yes |
| Drawing-shaped Markdown48KiB; other notes small | Yes |
| Ordinary prose160KiB | No, entire vault |
| Drawing-shaped Markdown192KiB | No, entire vault |
| Small notes plus both large kinds | No, entire vault |

All five real-parser/IndexedDB cases pass. Native `kplex-test-small` confirms that163,840-byte
ordinary prose plus196,813-byte Excalidraw-shaped Markdown produces a complete normal graph but no
receipt. Owned files/folder are removed; focus/visibility/normal throttling pass. Its detailed
diagnostic includes fixture creation/normal processing and the initial canonical build/save:
2.031s selected-renderer CPU,1,619 transactions,4,199 requests and208 observation-digest admissions.
This is an eligibility diagnostic, not a matched resource benefit. A first controller cleanup failure
is preserved separately; its performance data is unavailable and excluded. Recovery removes its
empty owned folder and reloads the test window before the successful retry.

Native normal-use cases independently create a receipt, reload the plugin, edit through `Vault.modify`,
wait for the unchanged five-minute normal save timer, then reload twice. Both prose-only and semantic
edits pass; no full build is forced after either edit. Two corresponding real-IDB owner regressions pass.

| Native stage,89 Markdown owners | Persisted receipt | Full builds / complete saves | Fresh reads / parses |
| --- | --- | --- | --- |
| Initial necessary compilation/save | Protocol2 | One setup compilation/save | Setup recorded separately |
| First plugin reload | Retained/current | 0 / 0 | 89 / 89 |
| One ordinary prose or semantic edit and natural save | Absent | 0 / 1 | 1 / 1 additional |
| First post-edit plugin reload | Absent | 0 / 0 | 0 / 0 |
| Second post-edit plugin reload | Absent | 0 / 0 | 0 / 0 |

Eligibility does not return through quiet time or subsequent restarts. Only a later independently
necessary canonical compilation can create a new receipt. This does not demonstrate a benefit for
an actively edited vault. The native plugin lifecycle retains one window/its enumeration; a genuine
vault-window reload separately fails retention because saved/current replay digests differ, while
all88 per-owner inputs pass validation. The failed full-authority assertion remains a failure,
even with zero builds and ready requested scopes. Raw `retained` reference presence after an edit is
not current eligibility; the saved field is absent and its prior publication/source proof has expired.

The requested final-promotion race is reproduced with a real second connection replacing a source
after `candidate.validation.finish()` while final receipt decoding is held. The prior code incorrectly
promotes with unchanged local host epochs. The correction selects the durable source sequence as
the final await before synchronous promotion, through the existing source owner. No whole-vault
pass, scheduler or transaction framework is added; all33 then-registered receipt guards pass,
including the new red/green race. Full verification including all40 receipt cases passes.

One additional complete native lifecycle per build starts CPU accounting before fixture creation
and includes the initial canonical build/save, three plugin reloads and the ordinary prose edit.
Order is B/A/M; each uses the same final probe and normal scheduling. This is a diagnostic with
one observation per arm, not the planned counterbalanced scale acceptance or a timing effect size.

| Whole small-vault lifecycle | M: merged main | A: duplicate-read only | B: receipt |
| --- | ---: | ---: | ---: |
| Selected-renderer CPU, seconds | 9.109 | 8.515 | 10.750 |
| Source/cache drain, seconds | 44.492 | 44.414 | 349.938 |
| Native transactions | 6,416 | 6,415 | 9,197 |
| Of which readwrite | 1,402 | 1,400 | 2,544 |
| Native requests | 15,509 | 15,502 | 20,341 |
| Source body reads / parses | 2 / 2 | 2 / 2 | 91 / 91 |
| Complete snapshot writes, including initial setup | 1 | 1 | 2 |
| Digest calls | 5,596 | 5,593 | 8,450 |
| UTF-16 units submitted to digests | 9,323,345 | 9,322,804 | 16,620,955 |

B's89 added unchanged-reload reads use `Vault.read`; the broader source-read counter also includes
ordinary acquisition reads. B retains full graph authority, then follows the normal five-minute
save after the edit. M/A use the existing cached/source-backed route, update the source, and do not
schedule a complete graph save in this case. Those authority/end-state differences remain visible;
zero compiler calls in every post-creation phase do not establish equivalent work or a benefit.
Initial compilation is an explicit controlled test precondition, never post-edit receipt renewal.

Sampled heap/RSS maxima are297,941,180/738,086,912bytes (M),249,061,640/700,747,776 (A), and
208,793,060/651,317,248 (B). Final two-GC main heaps are260,012,744/222,023,220/183,891,336bytes,
respectively, after eligibility is already lost. Same-window heap rises with the B/A/M sequence;
these values cannot establish attributable receipt savings, allocation totals or true peaks. Work
counts/hashing volumes are allocation proxies. CPU includes host, probe and identity-check work.
This diagnostic stops at active-task/source/cache drain; it does not include a610s quiet window.
The scale series retains that requirement and is still pending. No improvement percentage is claimed.

The smallest follow-up worth proposing, rather than implementing here, is authenticated raw-content
fingerprints owned by existing source read/write paths: fresh bounded hashing could avoid parsing
unchanged content, with normal patch/save renewal instead of a new full compilation. Large-file
admission must use a demonstrated serial read/memory budget and cover every owner; `Vault.read`
still materializes a whole string, so streaming hash frames alone do not bound read memory or avoid
linear storage work. This needs a separate bounded proposal and resource proof. Raising128KiB,
trusting physical statistics/host cached hashes, skipping drawing files, or adding another scheduler
does not resolve these gates. Retain the already measured pass-local duplicate-read reuse now.

## Measurement contract

The separate protocol1 first-use diagnostic (not a clean-warm comparison) passes with a newly
minted receipt, two actual source passes, one full compilation/save and zero catalog starts.
First readiness is1,882.617s; stable readiness1,884.794s; genuine drain1,948.818s. The following
610s quiet observation has no broad-work violation, pending resource or active transaction.
Onload-observer CPU is576.204s (500.188user/76.016system); the same-PID lifecycle delta is576.985s.
It counts826,336 native transactions (341,882readwrite) and1,678,868 requests. Sampled heap/RSS
maxima are1,933,511,164/2,568,683,520bytes. No note bodies are freshly read/parsed during this
creation run. This material creation cost includes the additional validation pass and cannot be
treated as a warm benefit, compared as a matched percentage with the older detailed M diagnostic,
or used as resource acceptance for corrected protocol2. All55 request/transaction groups fit the
observer's256-group limit. Exact raw receipts, source and artifact identities remain preserved.

The existing `warmRestart.mjs` now supports a prespecified resource acceptance window. First
readiness, real source/cache/task drain and quiescence are separate milestones. The quiet window
is **610 seconds**, covering two 300-second snapshot-maintenance periods plus ten seconds, as
well as the 30-second source poll. No deadline, pacing, concurrency or throttling is changed.
An unexplained inventory, full build, node-catalog replay or complete save during that window
fails acceptance. Ordinary bounded maintenance is counted and must drain by completion.

The receipt comparison is prespecified as three counterbalanced pairs **B–A / A–B / B–A**:
control A is committed duplicate-read checkpoint `d0d16fb`; B is the separately committed receipt
implementation. Before any primary trial, add merged runtime M (`8df393a`) in the balanced triplets
**B–A–M / A–M–B / M–B–A**. Each arm occupies each position once; the original B/A pair order stays
unchanged. Nine counts-only trials distinguish whole-PR effects from the receipt's incremental cost.
Graph payload/policy and exact source-head identities are checked outside timing. Identity format3
also verifies the live fingerprint map against every saved graph input and hashes those tokens in
durable head-key order. A separate actual host-replay input digest preserves semantically relevant
compiler encounter order and rejects a concurrent enumeration change; protocol version is recorded.
Configuration is separate from raw discovery metadata; raw payload/order
commitments remain preserved. The inspection rejects concurrent live publication/policy/source
changes and incomplete head coverage. It grants no authority and performs no note reads or writes.
Only the optional capability and generation activation metadata may differ. Legitimate receipt
preparation is separate; no cache authority or metadata is stamped by the driver. Small-vault work
must also be reported: fresh-content verification can add cost where legacy startup already avoids
compilation. Failed controls and unfavorable outcomes remain in the complete evidence.

`buildStartupProfile.mjs` builds test-only variants in memory from exact committed sources;
shipping source and `dist` remain unchanged. Profiles refuse any vault other than `kplex-test`
and `kplex-test-small`. The resource observer forwards original receivers, native requests and
promises, restores its own methods and is retired on unload/driver cleanup. Bounded aggregate
groups retain no owner paths or payloads. Counts mode disables detailed startup timing and skips
family/digest/byte observers; matched low-instrumentation comparisons remain required.

`prepare-legacy` and `prepare-receipt` separately observe explicit test-only canonical compilation
and saving, with detailed transaction/request/payload attribution. These preparation costs are not
included in primary warm timings and are reported separately. The driver also samples native CPU
totals before reload and after observation; it subtracts only when the selected OS renderer PID is
unchanged, otherwise reporting that whole-navigation interval as unknown. The profile's own CPU
interval remains separately identified. A controlled `memory` action verifies the selected native
renderer and collects twice outside primary timing; it exports numeric live-heap/process fields and
detaches its owned debugger. Main-realm heap is not every worker isolate or plugin-exclusive memory.

Native CPU uses [`process.cpuUsage()`](https://nodejs.org/api/process.html#processcpuusagepreviousvalue)
user/system deltas in microseconds for the selected renderer process. This includes host and
observer activity and is not plugin-exclusive CPU or energy. Detailed IDB accounting counts
transactions by store/mode, requests and JSON payload byte estimates, including lease/journal
bookkeeping; these estimates are not physical disk/WAL bytes. Family deliveries, decode and
pending-work high-water marks are separate counters. Sampled heap/RSS are unforced observations,
not retained memory or proven peaks. Controlled retained-heap checks remain a separate lane.

The small-vault pilot restores full saved hydration and passes a 610.8-second quiet-window/drain
and cleanup check. The finalized observer separately passes a native reload with one inventory,
zero full builds/catalogs/snapshot writes and no pending resources. A once-per-request host-wrapper
placement error was caught in observer setup; that version's inflated observations are explicitly
excluded and preserved. Global-scope factory execution, once-only wrapping and exact method
restoration now pass in all six real-IDB cases. These are functional observer checks, not a
baseline/candidate performance result. Native matched comparisons, offline delta acceptance and
controlled retained-memory/resource tradeoffs remain pending.

The registered real-IDB observer regression passes exact request/promise/receiver forwarding,
once-only wrapping, aggregate-only exports, decode release and cleanup; 16 existing host-runner
contracts also pass. The duplicate-read regression fails on the prior algorithm (six validations
for three owners) and passes after correction. Eight real-IDB integrity/finality cases pass, including
corruption, concurrent foreground proof, independent head replacement, cancellation and same-stat
events. Twenty-three diagnostics/support privacy tests pass. Full Node22.22.2 verification passes
architecture7/core128/general828/UI63/portable-source334/browser524, lint, actual installed types,
production build and exact-artifact Windows native smoke with no failures/skips. Main SHA-256:
`4813b60d280cf3dc7cb2ab1eaeea6769df6218b73183357e32f4bef00a5805e0`; manifest/styles are unchanged.
The first full run had one pre-test Chromium bundle-load failure among 523 browser checks; all
71 affected relationship/runner checks then passed, followed by the complete passing repeat.
All runs are retained. A later setup invocation rejected a relative config path before verification;
the final absolute-path run passes after the notification correction. Its callback-documentation-only
follow-up also passes the focused browser test. No deadline or assertion was relaxed.

The stored-cache identity helper separately passes a genuine native read: 213 pages, 1,565
declarations and 139 selected source heads; only hashes/counts escape its bounded readers.
Snapshot activation metadata is separate from graph payload identity. Its unit contract covers
payload changes, negative/multiple declarations, reused source sequences and interrupted reads.
The native Node CPU-module PID equals the selected renderer PID; future profiles also record
the CPU closure's own identity and compare it with the [Electron renderer PID](https://www.electronjs.org/docs/latest/api/web-contents#contentsgetosprocessid).
The installed candidate reports one actual inventory pass and zero builds/catalogs/saves in this
small-vault plugin load. Temporary profile/controller names are absent from production source and main.
The format2 identity helper passes18 host-runner tests, including reordered traversal/map inputs,
changed cached fingerprints, tombstoned coverage and retired live lifetimes. A real candidate versus
merged-main native check has identical configuration/input/head/sequence/raw graph commitments;
the merged counts probe verifies selected-renderer CPU identity and zero pending transactions/work.

## Evidence and acceptance

Receipt product-fit checkpoint: full Node22.22.2 verification passes architecture7/core128/
general830/UI63/portable336/browser564, lint, installed types, production build and exact-build
Windows native smoke, no failures/skips/JS errors. Main SHA-256:
`e00f5ec596365858be90f1bfe953d8808706022986d744f82b27f49cbcf80c11`;
manifest/styles are unchanged. All40 receipt cases pass. Native plugin-reload retention, both
ordinary edit lifecycles, mixed-file conservative fallback and owned-fixture cleanup pass. The
protocol2 vault-window strict assertion fails and remains a failure. Preparation/retained-memory
helpers pass scope/lifetime checks. The subsequently added three stale-host source probes fail;
the40-case green suite does not establish full source correctness. Matched scale resource collection
is pending and cannot turn this rejected candidate into an accepted implementation.

Raw successful/failed/setup receipts, exact profile artifacts and source identities are preserved
outside the PR tree pending final evidence packaging. Reusable benchmark/profile drivers live in
the repository. No evidence has been discarded. No personal-vault access is performed or authorized.

Remaining platform acceptance will be reported explicitly: lower-powered desktop/full-process
restart, physical iOS/Android startup/navigation/suspend-resume with memory headroom, and the other
desktop OS's changed-source/interrupted-validation workflows. Keep PR #165 draft; no merge/release.
