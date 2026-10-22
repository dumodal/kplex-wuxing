# Standing instructions ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR201 checkpoint returned for review

Updated2026-10-22. Main validation agent to maintainer/next pinned-commit agent.
Branch:2026-10-21-indexing-cpu-reduction. Preserved parent c4a656b54cfe66b686e662e4d8bbfa0536cc4149;
runtime baseline551a3b52895484de3dd41e5c6eb2fa8c6712fec4. The delivered commit is recorded in PR201
and the completion message; pin that immutable commit, not a moving branch. PR stays draft.

Final mainSHA256:c39fb4876315a3348b782fe91400398faab1f98de8c0852eb9cc06bf24509a58.
Manifest4d2783cf09dc3f39842e9c76604cfb6b413997287d3c8a361a6994b86fc8c619;
styles88b61aa508ede97b10fbd30c957d14ba19b257aa26f5ee9f547f13faa0f43974.
See [durable validation](docs/validation/indexing-cpu-201-2026-10-21.md) for all arms, individual
runs, process attribution, retained failures, hashes, scope and limitations. Older uncommitted /
documentation-only descriptions are historical; the maintainer saved the first implementation as c4.

SI4 now resolves every aria-labelledby reference in the node's owning document and checks alias
text; no production aria-label/title restoration. Complete14-step Small runs pass baseline/c4/F.
The only new runtime correction batches <=256 selected heads with sequence shape in one atomic
readonly transaction. Multi-page/global and late local/source/host/policy/demand fences remain.
Startup-backlog/parser reuse fixes remain intact. No schema/default/scheduler/global-proof change.

Node22.22.2 real-dependency full verify2682 executions+exact native smoke pass; later38 tooling
contracts and applicable native lanes pass on the unchanged C39runtime. Final native coverage
includes SI5five recovery cases; held-background foreground/live edits; startup/ontology;
interactions/gates/folder actions; both-mode rename; dates24per mode; sections/Excalidraw/node
and popout tooltips. Corrected Eager Date controls pass24on both exact baseline/F. Their setup
joins normal initial/reload readiness without weakening oracles/deadlines. Retain original Fsetup
and baseline-reload failures; passing isolated controls do not resolve the stranded-startup cause.

Five matched pairs per workload, same verified all-store logical checkpoint:
warm CPU12.307083->11.551398s(-6.14%), graph-ready1.5595->.8659s, background10.2348->10.6920s;
reconstruction CPU18.972149->18.684169s(-1.52%), background16.9642->16.8122s. Warm through-idle /
30s medians improve, but material late spikes remain in individual pairs and disabled controls.
Native diagnostics confirm required requested-view proof work plus repeated exact family reads;
16warm coordination transactions are removed. Exclusive CPU contribution remains unproved.

PERFORMANCE ACCEPTANCE OPEN: physical DB/heap state is not equivalent; late warm CPU cause is
unresolved. No tolerance or maintainer tradeoff acceptance is invented. Keep draft; no merge,
release, history rewrite or PR203 change. A bounded separate Windows Small fresh-process/native
attribution follow-up is proposed; other open vaults were not terminated. The broader50% target
and repeated validation/replay, interruption/progress, adjacency/evidence and persistence/retry
opportunities remain open. PR203 independently ranks real-vault issues; do not duplicate it.

Original disposable database restored/verified after a native wrong-SHA no-mutation control;
107files/88Markdown/12folders and original settings/trust-related configuration preserved.
Final sanity: no fixtures/controllers/debugger, zero unsaved/source/cache writer debt, exact F
installed. Raw traces/backups stay local. Source/rules/TSDoc/portable ownership/cleanup review and
focused/final checks recorded in the report. C14 accepted; C15+ paused. Await review; no automatic
refactor or further speculative runtime optimization. Mac/physical-device/full-process acceptance
remains separate; no new manual test is needed for the completed local SI4/head-batch review.
