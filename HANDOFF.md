# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.







---

# PR #170 — modifier hover implemented; draft validation gaps

PR #158 merged with authorization at b9d3527; local main fetched/fast-forwarded. Branch2026-10-16-alt-hover-highlight, runtimea16719e21efe89ed798ec0a712f4d6b9df53d591. Do not merge/release #170 without approval. C14 accepted; later refactoring paused.

Global hoverHighlightRequiresAlt false by default, existing750ms delay unchanged; opt-in immediate Alt/Option hover on nodes/gates/connectors, stationary press/release, owner-window cancellation. Shared hover owner; existing workflow save path, eight locales/environment formatting. Outside themes and graph policy; drag/touch/preview behavior preserved.

Node22.22.2 full strict2,003 tests/lint/installed types/build/native smoke pass; CI38911615521 green. Native8 actual Settings/durable toggle/trusted main+popout7 cases and cleanup pass;0 observed reads/parses/acquisitions/semantic/search. Runtime is unchanged from full-verified a16719e, rejected capture prototype reverted. Main SHA d59587875f14614c4d579e49033743d6f2a4f251acae1b1d7a14281d4931b200; native/full/final-restored hashes match.

Broader lanes NOT accepted: touch fails before cases when emulation leaves plugin disabled; automatic reload/layout/debugger restoration failed. Explicit same-build enable recovered desktop. Gate setup patch cancels before assertions in both runs despite no observed source/policy/metadata change; second after startup settled. Do not call these baseline bugs or feature regressions without comparison; causes unproven. No unrelated runtime/driver fix made. Keep draft pending investigation/maintainer acceptance; macOS Option/menu/popout and physical mobile/external keyboard also remain.

Final outer restore passes loaded desktop/106 files/no owned notes/controllers/original settings keys/four original config bytes. Validated build retained in Small. Testvault, Large and personal vaults untouched. No active native controller. TEMP/kplex-alt-hover-final-restoration.json proof; private original four-file backup TEMP/kplex-alt-hover-baseline. Never publish private baseline or raw touch configuration receipt.

Final report docs/validation/alt-hover-highlight-2026-10-16.md. LOCALAPPDATA/kplex-validation/pr-170/alt-hover-2026-10-16 contains58 checksum-verified files, source receipt binds canonical runtime a16719e and matching artifacts; raw TEMP logs/recoveries/prototype retained, unpublished. Native probe corrected only: focus preservation, exact visible gate, existing popout readiness, scoped release before document closure, original workspace-owner rebind. Temporary React inspection removed.

Delivery: native-probe cleanup and final validation documentation accompany the final branch head; PR #170 remains draft with actual outcomes and gaps. No further implementation needed for requested hover behavior. Follow up broader native acceptance separately. Equipped Node/browser/Obsidian CLI Windows environment; use only explicit Small C:/Obsidian/kplex-test-small/.obsidian identity, native/browser serial. No pending permission question.
