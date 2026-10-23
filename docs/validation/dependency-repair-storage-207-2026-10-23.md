# PR207 dependency-repair storage isolation

Zsolt's Codex Agent,2026-10-23. This report supplements [the original validation report](dependency-repair-batching-207-2026-10-23.md); historical measurements and failures remain intact. Draft PR207, branch2026-10-23-dependency-repair-batching. No automatic merge/release/production deployment; #206 untouched.

## Checkpoint and precollection protocol

Accepted baseline930747679894f003a2acf3b800df798826ee090c remains fixed. Local/remote reviewed head d6ef7f07b199e2eb2497f13148374f5edf6802d3 matches. Production source SHA256 d8d6d532bb711b3cb2bb5d0e55152392495533b8eb64c069158ca8b0e98809d8; main.js19d75415c69d8c77bbde934f618eeece2f0387459a49003090eedef61b9bb28f; manifest3395e425860e5068e9f3b3d9a0e3d58cefd2c11dededc690beb87f60e733ed7d; styles88b61aa508ede97b10fbd30c957d14ba19b257aa26f5ee9f547f13faa0f43974. Baseline source534a061e64ddfe7a609cc774788567ec8ba6afc4c953ea556e7ff9834fe4c63e/main7fa00a354d38fb2cedecbb9d15c5277e0513813b7074d487f5ebda9820c2b79f. No production edit before first causal comparison. CI411 passed; independently checked diagnostic checkpoint CI412/run39986661351/job120527486343 is still running at protocol preparation, not presumed passed.

Finite source-override factory creates no production flag/settings/schema. A exact baseline; D exact frozen reviewed candidate. B retains D's grouped counts and changes only authenticated old-prefix reclamation to individual row deletes. C retains D's range reclamation and changes only grouped counts to ordered per-occurrence get/authenticate/check/write, one native request outstanding. B/C/D preserve D's bounded cursor prefix, byte/record limits, current fences and original atomic journal; A retains its original scaffold. Thus B-D isolates deletion strategy; C-D isolates grouped ledger work including request/continuation order. A-B/C is not an unqualified2x2 factorial because the read scaffold differs.

Four-way primary:256 owners, mixed distribution, complete original seed/deletion history, three serial quads in orders A/B/C/D;D/C/B/A;B/A/D/C. Fresh owned profile per arm, same source facts/settings, seed batches32 and measured transport batches8. Full actual source/membership/count oracle before measured work, after deletion, after real graceful restart, recreation and later edit. All selected maintenance, known family reclamation, journals, releases and debt close; native complete/abort drain, closed connection, acknowledged Browser.close, actual root exit0 and newPID required. No waits/GC/compaction/profile/global cache reset. Balanced power and unchanged headless/focus/throttling policy; no local builds/tests/native drivers overlap timing. Physical files/OS caches are not equivalent merely because logical states match.

Primary omits detailed request wrappers. A separate four-arm256-owner detailed cohort measures native calls/transactions/cursor advancement and logical rows, not counted as CPU acceptance. Root SystemInfo process snapshots outside renderer endpoints now work in the four-arm smoke: actual root PID verified, births/exits/gaps explicit. Renderer ProcessTime includes its threads; do not add it to SystemInfo renderer CPU again. Browser/storage utility CPU reported by identity/type, not inferred exclusive store CPU. Root connection/metrics overhead is included in its wider snapshot interval and comparable controls. No native allocation/peak claim from sampled heap endpoints.

Measure native open request-to-success, fixture open, lookup, closure/closeWork, shutdown-to-actual-exit, launch and outer transport separately. Restart/reopen sum includes post-exit file metadata observation; excludes intervening fixture binding and observer setup, so it is not continuous Obsidian startup. Profile regular-file totals remain separate from logical bytes/records; actual disk allocation is unmeasured unless a reliable platform-specific metric is established. No file content parsing is required for the causal comparison.

Fixed material criterion: >=10% AND >5ms paired excess in >=2/3 matched pairs, separately native open and restart/reopen sum. Expected interpretation: B~A,C~D implicates range reclamation; C~A,B~D implicates grouped ledger path; D alone implicates interaction; B/C/D all adverse leaves the shared scaffold unresolved. All unfavorable/incomplete runs retained; exclusions require protocol violation. No production correction until the full first comparison is complete and a mechanism isolated.

After isolation, bounded repeated lifecycle: three create/change/delete/reopen cycles in the same test-owned DB/profile, no reset between cycles, at256 owners for the implicated full variant and the selected correction/control. Repeat clean reopen without new source writes to distinguish transient/accumulating state. No extra scale campaign unless a meaningful remaining causal uncertainty requires it. If cause remains unresolved, preserve the current production implementation and return a precise decision.

Prerequisites passed:28 portable variant/lifecycle/observer contracts; four-way2-owner smoke all4 passed, root process CPU supported; focused real-IDB variant contracts44/44 (including4 factory contracts), zero failures/skips. Raw receipts/logs private under TEMP; exact source/bundle/tooling hashes recorded in each summary.


## First causal comparison: completed before any production edit

All12 arms passed,16:53:11-17:10:53UTC; private receipts `%TEMP%/kplex-repair-storage-207-causal-PsrFTk`. Full before/after/reopen/final-edit oracles and recreation/edit sequences match across all four variants in each quartet (sequences513/514). No exclusions/retries.

| Pair/variant | Wall ms | Renderer CPU s | Browser CPU s | Native open ms | closeWork ms | Reopen Browser CPU ms | Regular-file bytes after exit |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
|1/A|48991.9|22.610|80.460|34.4|5.6|67.6|37618665|
|1/B|37011.7|15.259|88.910|572.9|68.1|347.4|52713243|
|1/C|32293.4|13.729|73.275|85.1|80.0|281.5|63502798|
|1/D|23392.7|10.229|58.242|102.7|85.4|312.1|54674241|
|2/D|23332.4|9.935|57.674|97.7|83.2|315.0|53433814|
|2/C|33229.6|14.117|73.640|97.3|92.6|315.4|47702208|
|2/B|35533.2|13.927|82.935|124.2|80.1|341.1|62336689|
|2/A|50657.4|23.021|84.909|37.1|5.9|69.9|38593493|
|3/B|34954.0|13.762|83.298|120.7|77.3|335.1|51618979|
|3/A|51034.6|22.872|84.495|33.5|3.5|55.3|32040650|
|3/D|24422.7|10.828|60.374|121.6|73.5|301.1|69250090|
|3/C|32207.9|13.741|73.063|82.2|74.5|264.3|57746429|

B,C,D each trigger the unchanged native-open criterion in all3 paired contrasts with A. Simply removing either grouped counts or range deletion does not resolve the regression. B-D and C-D retain the shared cursor-prefix path; no claim is made that these4 arms isolate that third factor. Browser-root process CPU now shows additional reopen cost (roughly264-347ms in altered variants versus55-70ms baseline), while renderer reopen CPU is about7ms. Storage utility CPU is separately recorded and small; these are whole-process counters, not sampled backend stacks. Maintenance Browser CPU is meaningful alongside renderer savings: grouping-only does not reproduce fullD Browser CPU reduction.

CI412/run39986661351/job120527486343 completed successfully, including complete npm verify. Published test-only protocol checkpoint979cefe7ec01f253b00869591d683c48d76d4953 is verified on the remote branch. Source/artifact D remain unchanged through this completed comparison.

## Bounded shared-read follow-up protocol (before collection)

The four-way result leaves the common bounded membership reader unresolved. E therefore keeps BOTH grouped counts and validated range deletion, but reads exact ordinal rows one at a time and proves exact primary-range cardinality with one scalar count per observed prefix. Proof includes any discarded byte-boundary lookahead. Point reads without this proof would skip corrupt fractional keys; that unsafe variant is not measured or proposed. Same transaction, bytes/records/singleton/current/native-error/journal contracts remain. F keeps the original cursor and adds E's identical proof, distinguishing read strategy from the extra proof request. E/F are isolated test-only source overrides; production remainsD. No schema, scheduler, GC, arbitrary delay or product flag. The scalar proof bounds retained memory, not arbitrary backend enumeration work in already corrupt storage.

Run only3 matched256-owner quads A/E/F/D;D/F/E/A;E/A/D/F, using the same lifecycle/work/oracles/CPU observer and fixed criterion as the first comparison. This is the final read-path isolation step; if it remains unresolved, preserve production and return a precise no-go rather than expand into storage redesign/profiling. Four-arm read-control smoke passes;85 source/harness/native-IDB/inventory contracts pass, zero skips. E/F include ordinary and wide byte-lookahead fractional-neighbor failures, quota/cancellation/abort rollback and durable retries.

Repeated-cycle smokeD/E passes all create/change/delete and two real graceful reopens per DB. Windows read-attributes-only FILE_STANDARD_INFO AllocationSize observation succeeds through an isolated Python metadata process (about76-176ms in smoke), separately from reopen timing. It is used only in subsequent diagnostic counts/cycles, with its own elapsed and limitations; primary causal timing has no such allocation observer. Native reference: [FILE_STANDARD_INFO](https://learn.microsoft.com/en-us/windows/win32/api/winbase/ns-winbase-file_standard_info). Per-file EOF lengths, filesystem allocation and actual source-record bytes are distinct; allocation omits directories and is not exclusive physical-device attribution.

## Repeated-history protocol (declared before the full cycles)

Use one owned database/profile for three complete 256-owner mixed create → genuine change → deletion cycles, without resetting between cycles. Recreate tombstone owners on the second and third cycles with increasing observations. After each deletion, verify the complete source/membership/ledger oracle, terminal native transactions and repository closure, then gracefully exit and reopen twice. The second reopen contains no source writes and tests what a normal additional reopen does to the observed cost. Track every phase's renderer and process CPU, elapsed time, logical counts, regular-file lengths, per-file Windows allocation and inventory changes. Do not add delays, force GC, compact or change durability.

Compare D with E only if the completed read-path comparison supports E as a correction; otherwise compare D with accepted A as the bounded historical control. Variant order is D then the selected control; these are diagnostic lifecycle sequences, not additional matched timing pairs. Each variant owns one fresh profile initially, then retains it through all three cycles. Physical storage and OS caches remain unmatched. Allocation metadata runs only after actual process exit and has its own clock; aggregate restart time includes that observer and is not pooled with the primary comparison. A three-cycle result can show growth or stabilization within that window, not a production-vault bound.

## Completed read-path controls

All 12 arms passed, 17:19:10–17:36:48 UTC, with no exclusions or retries. All quartet source/membership/ledger/recreation/edit oracles match, and every native close, graceful process exit, distinct replacement PID and owned cleanup is verified. Private receipts: `%TEMP%/kplex-repair-storage-207-point-GHx8mU`. E and F remain test-only; neither is adopted.

| Pair/variant | Maintenance wall ms | Renderer CPU s | Browser CPU s | Native open ms | closeWork ms | Reopen Browser CPU ms | Regular-file bytes after exit |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
|1/A|52308.3|24.141|86.933|34.4|3.8|60.9|29567189|
|1/E|34018.0|16.526|79.139|111.3|81.2|325.0|70493938|
|1/F|25752.7|10.810|62.223|91.5|119.8|367.9|74170287|
|1/D|25129.3|11.141|61.189|174.8|136.2|554.7|81372207|
|2/D|25545.1|11.526|61.713|138.9|85.3|367.7|68546974|
|2/F|24653.1|10.799|61.091|80.2|72.6|257.0|68707481|
|2/E|32718.5|16.015|79.054|124.5|76.9|372.5|68668678|
|2/A|51581.1|23.798|83.578|32.9|3.4|55.1|29624554|
|3/E|33242.6|16.275|79.398|134.4|80.6|357.0|53392870|
|3/A|50124.8|23.463|82.466|32.1|6.8|64.6|30668715|
|3/D|24736.9|10.556|60.666|82.2|80.4|278.8|72138709|
|3/F|24973.0|10.524|60.397|88.0|71.3|275.0|70295148|

E and F each exceed the unchanged native-open material criterion in all three matched pairs against A. An ordinal point-read substitution with necessary coverage proof does not fix the penalty; the cursor-plus-proof control does not fix it either. E also sacrifices part of D’s maintenance savings. These results do not support changing production.

Both causal cohorts identify additional Browser-root process CPU during reopen, alongside approximately unchanged renderer CPU. Stable root PID counters are used directly; process births/exits and unavailable endpoints remain in receipts. The process snapshot window also includes metric/observer IPC and has no terminal sample for exited children. It is not an exclusive storage-thread profile or a complete sum over every process lifetime. Workers already present in process CPU are not added again.

Remaining causal uncertainty: B–F retain page-wide membership preparation before ledger mutation and deferred old-row reclamation, byte accounting and changed request sequencing. A interleaves ordinal read, ledger read/mutation and individual retirement per occurrence. The experiment rules out either simple independent revert as a demonstrated correction, but cannot attribute the physical history to a single shared instruction, engine compaction, GC, cursor prefetch or an interaction between mechanisms. No speculative runtime correction is made.

CI413/run39990635875 passed complete verification at published checkpoint979cefe7ec01f253b00869591d683c48d76d4953. Final diagnostic contracts pass111/111, zero failures/skips; final D/A cycle smokes pass. Deliberate two-owner driver failure exits1 as expected, retains its completed phase and error, and proves owned profile removal; it is a cleanup test, not an acceptance exclusion. Full repeated D/A cycles and a separate six-variant detailed native-request cohort remain in progress/pending. No new native deployment is needed for an unchanged production artifact.

## Retained incomplete repeated-history attempt

The first full D sequence in `%TEMP%/kplex-repair-cycles-207-full-Jkd4lM` completed cycle-one creation, genuine change, deletion CPU endpoints and the complete post-deletion logical oracle. It then failed in **post-window file metadata**, before either reopen: `ENOENT` when a listed `.ldb` file disappeared before `lstat`. The driver retained the failed result/phase and removed its owned profile. This is an observer race, not a demonstrated repository failure or a passing completed cycle. Its timings and error remain in private receipts. A continued in the same launch and is retained independently.

The existing stat helper assumed listed files remained present while Chromium was active. The narrow diagnostic correction records raced totals as **unknown**, with observed partial bytes/count and missing entries; only `ENOENT` is classified this way. Ownership/alias/error/entry bounds remain enforced. No retry, delay, backend change or runtime correction is introduced. Full per-file/allocation observations remain after verified process exit. Deterministic live-retirement, directory-retirement, unexpected-error, bound and alias tests are added before repeating the incomplete D history. Successful A data and the D retry have different post-work stat-helper versions; the workload, native oracles, CPU endpoints and post-exit allocation observer are unchanged. They remain a diagnostic growth sequence, not new pooled matched timing pairs.

All normal fixture source facts, memberships, counts, revisions and reclamation agree across variants. A deliberately retains the exact accepted baseline corruption contract: candidate-only fractional-neighbor negative fixtures are not claimed to pass on A's ordinal individual-deletion implementation. B–F preserve the stronger bounded-prefix authentication (including E/F byte-lookahead coverage). No corrupt fixture is used for the performance comparisons, and no variant gets less logical work in those comparisons.

The stat correction and independent review also close the touched helper's inherited directory-alias gap: authenticate `Default`, `IndexedDB` and traversed directories before enumeration; retain alias rejection and distinguish unexpected errors from retirement. A dedicated all-missing-entry case exercises the new entry bound rather than merely hitting the older regular-file bound. Focused contracts now pass **114/114**, zero failures/skips; robust D/A cycle smokes and deliberate failed-driver cleanup also pass. No safety assertion is relaxed.

A completed all three cycles in the retained first launch, with exact logical/oracle/closure checks and complete Windows allocation observations. Regular-file totals after the second reopen were 54,618,874 → 128,316,997 → 163,305,031 bytes. First/repeat native opens were 18.8/20.9, 97.6/82.2 and 38.6/21.7 ms. Physical-file growth and variable reopen cost therefore also occur in accepted baseline; these observations do not identify a candidate-specific leak or establish a growth bound. D's complete three-cycle repeat starts only after the corrected observer's 114 contracts and both smoke/cleanup checks pass. The original D incomplete attempt remains recorded, not converted to a pass.
