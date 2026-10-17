# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #174 — F3 native completion fix validated; D2/V closeout pending

Keep branch `2026-10-17-local-folder-diagnostics` draft. #173 merged23aa44e, #164 closed withcomment, mainintegratedd4d65cd. D0pushed786e91c; F2pushedb4bb401. No personal vault, merge, ready, release or raw publication.

F3 authoritative-absence source hunk plus38real-IDBtests/report/ledger are staged independently ofD2, readyforcheckpointcommit/push. Native rapidlycreate(empty)→fill→rename exposed existingadaptercontract mismatch: repository successfulabsent outcome was treatedasincomplete. D0globalrecovery masked it. Acceptactivated/absent onlycurrentpass+matchingoldPath+continuednativeabsence; heldA→B→Ctestpreservesnewerintent.38focusedbrowsercases, main/indexingfixtures, types/lint/build and native previouslyfailingpattern allpass. OrdinaryMD+validactualExcalidrawviewpass; inventory/configrestored. RawfailedD2nativefolder andD0passingcontrolpreserved. NoextraGlobalrecovery/scheduler redesign.

D2runtime/main/export/health/buildID/8localechanges remainUNSTAGED. Fullstrictverification+exactnativeSmoke passedbeforeF3 at `%TEMP%/kplex-174-final-verify-D2`, logwork/verify-D2-final.log: architecture7/indexing128/main960/UI131/sources334/browser596,0fail0skip. Integratedartifactmain6616c454…9e020e. LatestF3buildisrootdist andSmallinstalled frompin-F3-acceptance. Needfullfinalverifyafterruntimefix. D2benchmarkfinalactualdata-root16816bytes;~0.546usCPU/passpair;capture0.141ms/serialize0.031ms;nonzero sampledallocationsandwhole-modulelimitdisclosed.

NativeSupportReport now24/24pass (`native-D2-support-report-canonical-clipboard`) on preF3artifact; main/popoutCopyIndexdistinctwriters1each,wrong0, sharedownedactivity4669bytes, fullreport<=32KiB, actualSettings/narrow390/sidebar/popout, readerpurityandcleanupallpass. Earliercontrols failunowneddebuggermetrics andtestinvokingObsidian'sforwardingmainclipboardgetter, whichoverwrotepopoutinterception. Reusablehelpernowusesnativewindowresizeandcapturescanonicalmainclipboardbeforepopout; originalclipboardbackupretaineduntilallcopycasesfinish. Do notclaimearlyfailedcontrolsproveunexpectedclipboardwritesrestored. Privatecopy-method-probe establishedgetterbehavior; no productionwindowselectionchange. Actualmethoddistinct-windowunitpass includingrapidactiveWindowchange.

Nextrootseriallanes: commit/pushF3; runheldP3foreground live-updates(+composer) andissue161EX/pinned controls oncurrentbuild; finalcoarse-callfrequencyprobe ifneeded. Fullfinalverify(node22.22.2/npm_execpathactual/KPLEX_HOST_REPORT_DIR), thenexactfinalnativeReport/folder610quiet. Commit/pushD2validatedcheckpoint. Exactfinalcodebounded2hsoak reviewedprivate `%TEMP%/kplex-174-work/native-indexing-activity-soak-reviewed.mjs`; no native/browser/heavy/resourceoverlap, modesunchanged. Actual24h/mac/mobileunrun. No furtheroptimization/broadbenchmarking.

AlloriginalsprivateTEMPkplex-174-* plusD0nativekplex-obsidian-QUYpZD retained. Pendingprivatebackupdriver `%TEMP%/kplex-174-evidence-backup.mjs` (notexecuted; syntaxreviewneeded) copies toLOCALAPPDATA/KplexValidation/pr-174-2026-10-17/final-evidence, verifieshashes, skipsjunctions/node_modules/transienthandoffs, nooriginaldeletion/publication. Finishdocs/report/PRactualoutcomes,separateF/Dshipdecisions, removesingleplanmarker, finaldiff/checks/checkpointpush. Roothandlesallnative/Git. Sandboxprocesserror1909requiresauthorizedrequire_escalated. C14paused. Agentsareofflineonly andcurrentlydone.