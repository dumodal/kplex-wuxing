# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# PR #158 — implemented; draft for review

Main validation agent, 2026-10-16. Branch `2026-10-14-issue-155-theme-palette`. Runtime and fixture source frozen at `701fd62`; integrated main `867ef55` through `689399d`. All checkpoints are committed/pushed. Documentation-only closeout is the remaining commit; no further runtime optimization/refactor is authorized. Keep draft, no merge/release/issue closure.

Delivered native theme chrome/defaults, preserved existing literal colors, shared literal/theme/named sources, paired palette CRUD/replacement/adoption, two-way local counterpart suggestions, readable displayed alpha, real dual-mode previews, separate Colors/Labels and reusable property/standard-style strips. Actual native Settings detachment/CSS refresh and accessible field names are corrected. Off-by-default Compass geometry follows the existing camera/exact center motion. Eight locales, current persistence/source/publication owners and future-data safeguards remain. C14 accepted, C15–C26 paused.

Node22.22.2 final full3 passes1,963 tests (7/128/859/106/334/529), official lint, installed types, actual build and exact Windows smoke. Matching native color/Compass19, style14, migration6, theme9 and held-inventory foreground6 pass. Implementation CI701fd62 passes (run38854240536). Final source-artifact SHA main4fbd918a6cf7637986c6cdc6b8fca65ae56582081aa4084d7cae346264fc4dc5; CSS45cc1d7da17b9282bf8eec1930cc31c5565e03fac2ee6406b05061f46d030655; manifest19d9ecce5557733e0ff0f2e27155e635c30158c3cfa6fbca0f11c16e4dedfd2c.

All four small-vault config files, original runtime keys and saved workspace restore; ready11/88, owned notes/controllers/frames absent. Awake lease23196 released at05:41:16UTC; no power-plan change. No personal vault accessed. Authorized testvault514-file observational Gruvbox check uses current isolated preview/sampler/translator, requests no note contents and preserves all configuration hashes, existing installed build and open Settings session. Green is#98971a in both modes; panels#f9f5d7/#282828. Initial diagnostic dependency/old-translator mismatches are retained as setup failures; no production change arose from them.

Final concise report, evidence index, appearance/theme-author guides and architecture notes are prepared; obsolete issue155 marker is removed after verified preservation. Durable local evidence `%LOCALAPPDATA%/kplex-validation/pr-158/`: A–D archives reverified; final supplement3,953,297bytes/237entries SHA437eef0034c44a7e887a705d8eadab7316e6e14ab29fd4c499c1b522293bf9aa passes exact inventory/CRC/all236 per-file hashes, and copied hashes match. No archive publication is authorized/performed. Original raw `%TEMP%/kplex-158-*` streams remain; private config backups stay outside archives. Root handoff is not archived.

Finish by checking documentation links/scope/whitespace and source equality to701fd62, committing/pushing closeout, updating draft PR body with explicit current-head report/guide links and actual results, then checking final-head CI. Do not alter tested runtime while waiting. Platform acceptance remains: physical mobile picker/touch/resume; macOS native picker/Settings/popout lifecycle; minimum1.13 runtime and community/high-contrast visual review. Style-manager metadata is deferred. PR162 is unchanged at reviewed b48c475 and remains changes-requested/unmerged.
