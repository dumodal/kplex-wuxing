# Temporary plan-only handoff for issue #128

Prepared by Zsolt's Codex Agent on 2026-10-11. P1 safety/decision handoff only; not a fix.

- Issue and assessment: https://github.com/zsviczian/kplex/issues/128
- Base: `main@2b128c89555b88ebf207a709d7c0669bed3dfd73`
- Workspace: `2026-10-11-issue-128-delete-cleanup-scope`

The associated draft PR holds the plan and acceptance criteria. Broad property cleanup is verified and already documented; it is not automatically a regression. The recommendation to preserve non-ontology references by default remains a proposal. Creating this draft does not select a destructive-write policy. Characterization and a concrete policy proposal can proceed; do not change runtime cleanup scope until the maintainer's decision is recorded in the issue/PR.

Before offline transfer, the main agent copies the current scope, evidence, policy status and acceptance into the single root `HANDOFF.md`, preserving its standing header. Supply needed inputs locally; do not assume offline GitHub/Obsidian access. The historical issue-54 return is not this assignment. Follow `AGENTS.md`, `CONTRIBUTING.md`, `docs/AGENT_WORKFLOW.md` and `docs/agent-workflows/issue-resolution.md`.

Reuse existing property writers, canonical reference matching and remaining-reference UI. Preserve retained property evidence/ghosts, native trash, failure reporting and explicit-delete history/navigation. Keep external file deletion distinct. Return uncommitted changes and actual checks/limitations; main agent independently validates before authorized publication. Retain the known baseline source-startup failure as a limitation, not a pass.

Remove this temporary file before final review; do not archive it. Keep the PR draft while the policy decision or required validation is outstanding. Do not close the issue solely because this PR exists, merge or release without authorization.
