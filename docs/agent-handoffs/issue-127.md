# Temporary plan-only handoff for issue #127

Prepared by Zsolt's Codex Agent on 2026-10-11. This file only initializes a draft implementation PR; it is not a fix.

- Issue and technical assessment: https://github.com/zsviczian/kplex/issues/127
- Base: `main@2b128c89555b88ebf207a709d7c0669bed3dfd73`
- Workspace: `2026-10-11-issue-127-remote-image-consent`

The associated draft PR owns the implementation plan and acceptance criteria. Read its current description, the issue, `AGENTS.md`, `CONTRIBUTING.md` and `docs/AGENT_WORKFLOW.md` before coding. Require explicit opt-in before remote node images or thumbnails can load, including migrated settings, cached visuals and late asynchronous results. Preserve local images and graph semantics; reuse the existing imagery/settings/UI owners. Do not implement unrelated privacy or API features.

Use the same branch and PR. The offline agent returns uncommitted changes and actual checks/limitations through the single root `HANDOFF.md`, preserving its standing header; the main validation agent independently reviews, tests and publishes under maintainer authorization. A historical HANDOFF return does not resume its old assignment.

Remove this temporary file before final review. Do not archive it, claim unrun tests passed, close the issue because this PR exists, or merge without authorization.
