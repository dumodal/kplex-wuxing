# Temporary plan marker: paired ontology fields (#151, PR #190)

**Status: implementation handoff only; no runtime implementation or acceptance yet.**
Updated by Zsolt's Codex Agent on 2026-10-19.

- Feature request: [#151](https://github.com/zsviczian/kplex/issues/151).
- Implementation plan: [draft PR #190](https://github.com/zsviczian/kplex/pull/190).
- Superseded implementation: [#154](https://github.com/zsviczian/kplex/pull/154).
- Base: `zsviczian/kplex` `main@a8e0efa3997979adfb89fc456a5c2c493460e6b0`.
- Workspace: `2026-10-19-issue-151-directional-labels`.

## Current authoring and configuration contract

Notes use ordinary directional property names. Either declaration is sufficient:

```markdown
# Note B
replies to:: [[Note A]]
```

```markdown
# Note A
replied by:: [[Note B]]
```

YAML uses the same separate keys. Never require both declarations or create
automatic mirrored writes. Preserve both source declarations if authored.

In the existing ontology textareas, `replies to/replied by` under Previous
configures `replies to` as Previous and `replied by` as Next, and records their
pairing. Parse this configuration once per committed revision into ordinary
effective field assignments and a separate derived pairing lookup. Keep raw
textarea entries as the editable authority; do not maintain a second independently
editable pair registry. Physical fields, definitions and provenance stay unchanged
in the semantic index. Pairing/captions must not add inverse metadata to evidence,
change source parsing or add indexing work when effective assignments are unchanged.

## Pairing UX and validation

Manual textarea editing is fully supported. The preferred small modal extension
is one optional **Pair with** ontology suggester in the existing Add/change
ontology modal, using the selected semantic direction to filter eligible partners:

- Parent/Child and Previous/Next are reciprocal directions.
- Friend pairs with Friend; Challenger pairs with Challenger.
- Hidden and Excluded do not offer pairing.

Offer existing, compatible, unpaired fields; exclude self and fields already
paired elsewhere. Show the current partner when editing an existing pair.
Each normalized field can belong to at most one pair, regardless of textarea
or forward/inverse position. Manual edits and modal saves share that validation.
Unpairing preserves both physical fields and their existing roles. Direction
changes must not silently move or discard a partner. Revalidate against latest
configuration at the queued save boundary. Preserve order and unrelated entries.

Keep the modal compact; manual entry remains a complete first milestone, not
dependent on a new manager or complex pairing workflow. The PR distinguishes
confirmed requirements from the proposed modal UX and compatibility decisions.

The PR owns the detailed implementation plan, source references and pending
acceptance tests. Real source/ontology changes retain their normal processing;
caption or pairing-only work must not be confused with those changes.

**Temporary:** remove this file before final review; do not archive it. Follow
[the issue resolution workflow](../agent-workflows/issue-resolution.md) and
[the mixed-agent workflow](../AGENT_WORKFLOW.md). The root `HANDOFF.md` remains
the single transient implementation/return document and is unchanged here.
