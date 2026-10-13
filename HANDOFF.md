# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.



---

# Scanner assertion cleanup — validation return

Directly on main, base a77e9c0da44a65fdc173657e08740867986c6f3a; changes remain uncommitted. The maintainer requested the three unnecessary assertion findings in src/main.ts and explicitly excluded extensive tests.

All three modal-close wrappers now invoke the original class callback through prototype.onClose.call(modal), preserving the receiver without bind's weak return type or a redundant assertion. The original consent/cancellation cleanup remains in its existing wrapper.

Node 22.22.2: `npx eslint src/main.ts` passes without warnings/errors; `npm run build` passes against actual Obsidian types; git diff --check passes. No extended suites ran. Logs are `/private/tmp/kplex-assertion-cleanup-lint.log` and `/private/tmp/kplex-assertion-cleanup-build-final.log`.

The exact built artifacts were staged in CLI-confirmed kplex-test-small, preserving data.json. Main.js SHA-256: 9707dde2c484435a84d53ac3ea4d08955d3e969ec83caef74b552f6719a7b8d4. A single native Cancel smoke check passed: deletion consent cancelled, modal removed, pending ownership released, note retained; no errors captured. No note was deleted/edited and the temporary controller was removed. Receipt: `/private/tmp/kplex-assertion-cleanup-smoke.json`. Production and sibling repositories were untouched.

Prior work is merged through PR #152. Its full verification CI passed after replacing a stale comment-based status-hook extractor with TypeScript AST selection. Prior [attachment/localization](docs/validation/sidecar-attachment-2026-10-13.md), [callout](docs/validation/index-status-callout-2026-10-13.md), and [risk regression](docs/validation/risk-based-regression-2026-10-13.md) evidence remains historical. The earlier #25 ResizeObserver error gate, physical Android acceptance and Windows production-vault vocabulary observation remain separately tracked; this cleanup does not claim to resolve them.
