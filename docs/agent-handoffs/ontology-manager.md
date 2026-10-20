# Temporary planning marker: unified ontology manager

Prepared by **Zsolt's Codex Agent** on 2026-10-20.

**Status: implementation handoff only; no runtime feature changes.**

Continue on `2026-10-20-ontology-manager`, targeting `main`. The runtime baseline is [843e47f471f897951165b962e12a1d6a64ce089e](https://github.com/zsviczian/kplex/commit/843e47f471f897951165b962e12a1d6a64ce089e), including merged [PR #190](https://github.com/zsviczian/kplex/pull/190). Related [issue #151](https://github.com/zsviczian/kplex/issues/151) is already completed; this is a follow-up UX enhancement.

Read the implementation assignment in the single root [HANDOFF.md](../../HANDOFF.md), together with [AGENTS.md](../../AGENTS.md), [CONTRIBUTING.md](../../CONTRIBUTING.md) and the [mixed-agent workflow](../AGENT_WORKFLOW.md).

The intended feature is one searchable, role-filtered ontology manager with both paired names always visible, reusing the existing style-manager shell and ontology editor. The same field/pair presentation serves native Markdown suggestions and the related-node composer. Unassigned, Hidden and Excluded metadata remain distinct. Pair browsing must not collapse independently selectable physical field names. Preserve the existing configuration grammar, one settings writer and semantic-impact rules; no indexing-engine or source-schema changes.

This file exists only to identify the plan-only draft PR. It is not a second handoff or an implementation report. **Remove it before final implementation review; do not archive it.** Keep the PR draft, preserve the root handoff's standing header, and report actual validation separately from planned tests.
