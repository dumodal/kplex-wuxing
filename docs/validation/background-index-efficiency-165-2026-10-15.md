# Background indexing efficiency — PR #165

Ship the duplicate-read correction and truthful progress reporting. **Defer the optional receipt.**
Its correctness failures, whole-vault size exclusion and loss of eligibility after edits decide that
outcome independently of timings. Keep this PR draft for maintainer review; do not merge or release.

## Delivered behavior

- During an uncertain resolver wave, authenticate the selected resolution family once in its existing
  canonical comparison. Body/metadata integrity, exact source selection, physical identity, host and
  policy fences remain. Changed selections, optional alias maintenance and uncertain/corrupt data
  retain conservative validation. No durable format, schema, cache purge or scheduling change.
- Continue existing source progress notifications after graph hydration. Compilation, saving, URL
  work and local readiness keep their established precedence. Five fixed-size aggregate counters
  distinguish inventory/build/catalog starts from successfully activated saves through unload.

The correction is independently reviewable at `d0d16fb`; active production source is identical to that
checkpoint. M is merged main `8df393a` (#163); A contains the correction plus progress/reporting.
Native measurements do not isolate reporting's CPU cost from the duplicate-read correction.

## Resource results

The bounded native comparison is still in progress. Valid observations so far:

| Arm / observation | Renderer CPU s | Transactions | Requests | Genuine drain s |
| --- | ---: | ---: | ---: | ---: |
| A / first | 337.078 | 437,355 | 1,000,806 | 1,025.877 |
| M / first | 374.500 | 457,395 | 1,040,902 | 1,027.176 |
| M / second | 313.750 | 452,316 | 1,012,121 | 1,006.515 |

No repeatable native CPU or memory conclusion is claimed yet. All three valid observations pass
610-second quiet windows with zero violations, reuse/check 20,088 bodies with zero fresh reads/parses,
and complete one build/save with no catalog/checkpoint. Peak source decode reservation remains
183,261 bytes. The middle A observation finishes but is excluded in full for 84 foreground sample
violations. One bounded replacement A is running; the final A–M pair remains. If controls fail again,
close out with fewer samples and qualify conclusions rather than retry indefinitely.


Real Chromium/IndexedDB AB/BA/AB fixtures independently reproduce the algorithmic reduction at
32/64/128 owners. At 128 owners: resolver-wave transactions **2,698→2,570 (4.7% fewer)**,
resolution authentications **256→128 (50% fewer)** and digest calls **2,816→2,432 (13.6% fewer)**.
Clean-restart transactions905 and peak decode reservation5,277bytes are unchanged; zero fresh body
reads, parsing or source repairs are introduced. No additional inventory/build/catalog/save is scheduled
by the correction. These are operation counts, not CPU or energy.

One small 89-owner creation/restart/prose-edit/two-restart lifecycle records M/A CPU9.109/8.515s,
transactions6,416/6,415, body reads/parses2/2 and complete writes1/1 including initial creation.
This single ordered observation does not establish a small-vault CPU or memory benefit.

## Conditions and interpretation

The native comparison targets three observations per M/A arm in order **A–M / M–A / A–M**. Frozen test-only builds share
the same counts probe (`cfad37cb…`) and actual production build options. The first B–A–M group was
already running when the maintainer superseded the nine-trial receipt plan. It finished unchanged;
only the remaining M/A pairs followed. One middle A observation lost focus, finished unchanged and
was excluded in full; one bounded replacement A followed. This breaks strict adjacency of that pair.
All B outcomes and exclusions are preserved separately.

Every restart atomically stages the selected artifact while unloaded, then performs a native vault
window reload. Same public synthetic fixture, configuration, source heads/revisions and sorted
per-owner fingerprints are checked before/after outside timing. Actual host compiler encounter
order and raw graph commitments differ across reloads and remain recorded; they are semantically
relevant, not normalized away. This is a matched static-input restart comparison, not proof of identical
ordered graph payloads. All arms retain their ordinary startup fallback and source validation.

The fixture has 20,088 Markdown files,108,217 nodes and197,561 declarations. The 20,000 generated
notes plus 88 public help notes total 9,062,067 bytes; the largest is 37,623 bytes. Common preferences:
Eager indexing, background URLs, responsive pacing,60s update interval, the public command-palette
center, remote images off. No personal vault was accessed. Hardware: i9-12900,24 logical processors,
68,448,301,056bytes RAM, Windows build10.0.26200x64; Node22.22.2 driver; Obsidian1.14.4,
Electron43.3.0/Node24.18.1/Chrome150.0.7871.212 host. This is not a lower-powered/mobile result.

CPU is cumulative user+system for the verified selected renderer, including its worker threads,
host and observer work, from before reload through **genuine drain plus610s quiet**. Profile-only CPU
is also retained. Other Electron processes, energy and plugin-exclusive CPU are not measured. Source,
semantic work, scheduled persistence and observed transactions/promises must drain; no unexplained
inventory/build/catalog/save may occur in the quiet window. No deadlines, pacing or throttling change.
Foreground focus and ordinary background throttling are checked throughout. Heartbeat gaps are
inclusive browser-task observations, not input/paint latency. Six exact-shipping-build foreground
scenarios separately pass with source inventory held and zero foreground broad flush calls.

IDB transactions/requests are actual API operations, not physical disk/WAL bytes. Hash UTF16 units
measure argument volume, not bytes allocated or retained. This covers the source repository SHA256
boundary (payloads, manifests and observations), plus B-only framed receipt hashes; existing vault
rolling signatures and engine-internal hashing are not separately counted. Counts mode omits detailed
payload-size/decode observers; zero there means **unmeasured**, not no decoding. The production
source repository supplies peak decode reservation. Sampled heap/RSS maxima are not true peaks;
two forced collections outside primary timing observe live main-realm heap, not every worker or
plugin-exclusive retained memory. No attributable allocation, peak-memory or retained-memory win
is claimed. Three repetitions support an observed directional comparison, not statistical significance.

## Rejected receipt experiment

The rejected prototype and three failing provenance probes remain at
[`9124f5b`](https://github.com/zsviczian/kplex/commit/9124f5b4a523932ea468e9d73ffdbda2fddbeedd).
It is absent from production and from active test registration. Its prior40-case green suite did
**not** establish correctness: same-stat YAML, ordinary wiki-link and body-tag edits can be certified
against stale host-owned metadata despite fresh body reads. A real second-connection source
replacement held across final promotion also reproduced stale proof; a final scalar sequence fence
fixed that separate race in the preserved prototype without another whole-vault pass.

Eligibility requires every Markdown file≤128KiB and bounded decoded content. A disposable mixed
vault with163,840-byte prose and196,813-byte Excalidraw-shaped Markdown compiles normally but
cannot create a receipt. The cap was not raised and no owner was omitted. For both prose and semantic
edits: creation→restart succeeds; normal patch/five-minute save retires eligibility; two more restarts
do not restore it. No extra full build was forced to manufacture renewal.

Protocol2 first creation through ordinary startup costs569.735s renderer CPU,826,340 transactions/
1,678,868 requests, two complete source passes and one build/save; genuine drain2,034.741s plus
610.352s quiet. The completed warm B trial **fails strict retention** after host encounter order changes:
820.656s CPU,826,275 transactions/1,678,730 requests,20,088 extra fresh reads/parses, two complete
source passes and a build/save; drain2,149.901s plus610.989s quiet. This is observed fallback cost,
not successful retention or a paired receipt speedup. Small lifecycle B similarly adds89 fresh reads
and one extra complete save (CPU10.750s,9,197transactions). No further B trial/design work is required.

## Validation, evidence and follow-up

Receipt-free full verification11 passes on Node22.22.2: architecture7/core128/general829/UI63/
portable334/browser524, official lint, actual installed types, production build and exact-build
Windows native smoke, without failures/skips/JS errors. Main SHA-256:
`4813b60d280cf3dc7cb2ab1eaeea6769df6218b73183357e32f4bef00a5805e0`; manifest/styles unchanged.
Six exact-build foreground cases pass with zero broad flush calls, controller removal and settings-byte
restoration. Final full verification after all cleanup remains pending.

[Compact measurements](background-index-efficiency-165-samples.json) retain all arm results,
raw-report checksums, source/artifact/probe identities and limitations. [Evidence and reproduction
index](background-index-efficiency-165-evidence.md) identifies the verified raw archive, rejected tests,
fixture sources/checksums and reproducible procedures. Failed setup, controls and exploratory builds
remain evidence, outside accepted denominators. No raw evidence was deleted or published without
approval. The temporary planning marker is removed. Receipt-only tooling remains only until the running
measurements finish and will then be removed before final verification; reusable work-count, profile,
identity, restart/drain and retained-memory tools remain.

**Highest-value follow-up (not implemented):** measure repeated source-reader pin/unpin and head-selection transactions during the existing
unchanged-source validation pass. In the first A observation, the two pin/release store groups still
account for about 166,000 of 437,355 transactions (38%). Source reconciliation continues roughly
11 minutes after compilation/save. Group counts identify work volume, not exclusive wait/CPU cost;
isolate that cost before proposing a bounded correction through the existing source owner. No
implementation or new authority/scheduler/receipt design is included here.

Remaining acceptance: (1) lower-powered desktop/full-process restart resource and responsiveness;
(2) physical iOS/Android startup/navigation/suspend-resume and memory headroom; (3) macOS changed-
source/interrupted-validation and cleanup. Windows automation does not establish those outcomes.
