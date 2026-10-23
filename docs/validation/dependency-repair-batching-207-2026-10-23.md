# Dependency repair batching — PR #207

Zsolt's Codex Agent. Active implementation/validation record; results remain pending.

## Accepted baseline and entry

The maintainer authorized merging #205 after its CI disposition. Exactly one unchanged-head retry of run 402 passed complete verification/build at `104a5837ca358238f2c3cbd5f7177516094ab138`, with zero failures/skips. The original 64.9 ms URL-heavy timer failure remains retained; the <50 ms assertion, deadlines and runtime were unchanged. The expensive native metadata-read path is unreachable in that Node fixture without IndexedDB. Generic memory-read branch changes do not establish that zero changed instructions execute. Prior implementation CI, full local verification and native exact-build checks also passed. This supports accepting a non-reproducible timing limitation; its precise cause is unknown and broader CPU acceptance remains open.

#205 merged normally as **`930747679894f003a2acf3b800df798826ee090c`**, verified reachable from main. #207 incorporated current main through normal merge **`86d7fe459161a36c7ddd7c5f5e5d2fa236526412`**, published and remotely verified before implementation or comparative measurements. The existing assignment/test plan and 2417-byte standing HANDOFF header were preserved.

The comparison baseline is **main `930747679894f003a2acf3b800df798826ee090c`**. Runtime `SourceRepository.ts` SHA-256: `534a061e64ddfe7a609cc774788567ec8ba6afc4c953ea556e7ff9834fe4c63e`.

| Baseline artifact | SHA-256 |
| --- | --- |
| main.js | `7fa00a354d38fb2cedecbb9d15c5277e0513813b7074d487f5ebda9820c2b79f` |
| manifest.json | `3395e425860e5068e9f3b3d9a0e3d58cefd2c11dededc690beb87f60e733ed7d` |
| styles.css | `88b61aa508ede97b10fbd30c957d14ba19b257aa26f5ee9f547f13faa0f43974` |

Private entry receipts/artifacts: `%TEMP%\kplex-207-validation`. Read-only native preflight verified the existing Small vault, 107 files/88 Markdown notes, one Obsidian window, ready source state and no pending work. No production vault or #206 branch/data was accessed.

## Protocol and decision rules, before new measurements

Use Node 22.22.2, actual dependencies and real Chromium IndexedDB. Compare the pinned baseline against only the candidate repository implementation, serially with alternating order. Keep browser version, synthetic facts, distributions, settings and procedure equal. Each arm uses the existing test-owned disposable browser harness, without forced GC or global cache resets. Fresh process/profile preparation is outside measured source maintenance; record this boundary. Physical storage/OS cache equality and whole-Obsidian CPU are not claimed.

Characterize creation, genuinely changed replacement and deletion separately, with unchanged projection as a #204 control. Mixed and mostly-distinct workloads are required; duplicate-heavy data is diagnostic only. Use 64/128/256-owner scaling and three alternating matched pairs at 128 for both representative distributions. Retain every failed/incomplete/unfavorable arm. Exclude only a documented protocol violation.

Detailed observers count membership requests, cursor opens/continuations/delivered rows, distinct page keys, ledger reads/mutations, old-row deletes, transactions and bytes separately from lightweight CPU runs. Source-derived JavaScript promise/await stages are not native request counts or CPU shares. Include complete repair, primary journals, lease release and known old-revision reclamation before completion. Follow with genuine editing and actual browser-process restart/reopen; record their cost separately. Do not subtract independent medians or mix CPU counters across process identities. Renderer CPU/main-thread task endpoints exclude Browser/storage/worker process CPU; restart wall time includes launch, while CPU before observer attachment remains unmeasured. Memory endpoints are samples, not allocation or true peaks. Transaction elapsed is not exclusive lock time.

Proceed only with exact correctness and recovery, unchanged <50 ms URL-heavy responsiveness assertion, no weakened deadlines/coverage, and useful representative complete-cost improvement. The predeclared performance gate is at least 20% fewer selected-repair logical native operations on mixed data and at least 5% lower median matched complete maintenance renderer CPU, improving in at least two of three representative mixed pairs. Mostly-distinct and small-edit controls must show no repeatable material regression: a >=10% CPU or elapsed increase in at least two of three pairs (and >5 ms absolute per-arm difference) requires investigation rather than acceptance. These are component-study rules, not a whole-vault CPU target. All actual endpoints and qualifications will be retained; a failed gate means correction or a precise no-go, not a favorable tolerance chosen later.

## Bounded design checkpoint

The baseline already groups at most 256 occurrences per transaction. It serially reads one membership, reads its ledger and writes a count for every occurrence. Proposed correction: validate a contiguous cursor prefix under record and byte bounds; read each distinct ledger once with at most one unvalidated result outstanding; replay every old decrement before every new increment with intermediate safe-integer/underflow checks; then commit one final count mutation per key, old-row deletion and exact journal advancement atomically. All mutable reads remain in the original readwrite transaction, preserving independent-writer serialization. No schema, journal format, scheduler, source admission, reader/lease, projection, setting or #206-owned change is authorized.

For N occurrences and D distinct page keys, ordinary logical work is N membership reads + N ledger reads + N mutations. The candidate uses N cursor steps + D ledger reads + D mutations, original journal work and one exact old-prefix range deletion per page. All-distinct creation pages inherently save no such native calls; any scheduling/CPU benefit must be measured. A bulk getAll(256) is rejected because large valid rows could overfetch excessive data. Cursor byte-boundary lookahead and the baseline exposure to one arbitrarily corrupt stored record must be reported honestly.

### Baseline characterization and final pre-comparison clarification

The baseline-only 13-arm characterization passed, including complete cleanup/edit/reopen. For two mixed owners, creation delivered 1246 memberships with 902 page-distinct keys; changed replacement delivered 2492 with 1786 page-distinct keys and deleted 1246 old rows; deletion delivered/deleted 1246 rows. Mostly-distinct creation delivered 1214 rows/1214 page-distinct keys. These are detailed operation receipts, not acceptance CPU results. Raw directory: `%TEMP%\kplex-dependency-repair-207-NFrEAz`.

This confirms that per-key coalescing alone cannot justify a large native-call claim on creation or all-distinct data. The final bounded correction also replaces per-row old-prefix deletes with one exact range deletion after every primary coordinate is authenticated, in the same transaction. It changes neither the logical rows reclaimed nor atomic count/cursor advancement. A forged selected journal with equal non-null old/new revisions is explicitly rejected after the existing private-marker handling: otherwise preloading could conceal the baseline's delete-before-read missing-row failure. The new negative test failed on the provisional implementation before this correction; no candidate CPU comparisons had started.

For clarity before comparative collection, the 20% request and 5% CPU gates apply to an **equal operation mix of creation + changed replacement + deletion** at the same owner count, summing actual endpoints within each matched pair. Per-operation outcomes remain separately reported and subject to the material-regression rule. This aggregate is a declared component workload, not a private-vault frequency estimate or one continuous browser lifetime. Reopen and later-edit CPU/wall endpoints and launch/restart wall cost remain separate mandatory comparisons; startup CPU before attachment is unmeasured. Neither percentage gate is changed. Candidate detailed observations must distinguish native range-delete requests from the logical rows reclaimed, and byte-boundary delivered lookahead from retained work.

## Results

The first baseline work-count test failed as intended: 257 ledger reads/writes versus three per-page distinct keys. The provisional implementation passed the original focused tests, then failed the newly added impossible-same-revision negative (incorrect `ready`). The exact accepted baseline passed that same negative through a private copy of the unchanged test with only the repository bundle overridden. The corrected candidate rejects it and preserves the durable snapshot. The initial full affected suite retained three obsolete per-occurrence write expectations (21 versus 22, 12 versus 28, 604 versus 608); those failures are retained, and exact coalesced expectations now preserve the fallback/semantic checks.

Corrected real-IndexedDB affected suite: **56/56 pass, zero skips**, including exact range bounds, fractional-neighbor rollback, advanced-cursor browser restart, native abort/interruption, unsaved recovery and inherited #204/#205 contracts. Portable harness: **6/6 pass**. Actual dependency typings/typecheck and production build pass on Node **22.22.2**. Candidate runtime SourceRepository SHA-256: `5d52a7f8021c63e1898cffd57f855d6c38732962f00a7ee95457799679b63250`; candidate production main.js: `d7d3f7eb1dcad8d4b3e468bde77465159919f3b3d99f22d70a9a3797d66270fa`. Manifest/styles match baseline. Power plan read-only receipt: Windows Balanced; no power-policy change was made.

Remaining: complete comparative costs, full verification and exact-build Windows checks. #207 remains draft and is not authorized for automatic merge or release.
