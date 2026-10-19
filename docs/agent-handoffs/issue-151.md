# Temporary plan marker: directional relationship labels (#151)

**Status: implementation handoff only; no runtime implementation or acceptance yet.**
Prepared by Zsolt's Codex Agent on 2026-10-19.

- Feature request: [#151](https://github.com/zsviczian/kplex/issues/151).
- Superseded implementation: [#154](https://github.com/zsviczian/kplex/pull/154).
- Base: `zsviczian/kplex` `main@a8e0efa3997979adfb89fc456a5c2c493460e6b0`.
- Workspace: `2026-10-19-issue-151-directional-labels`.

## Maintainer-confirmed physical-property model

The complete slash string is one physical property name in the note and one
literal ontology entry in the existing relationship-field settings:

```markdown
replies to/replied by:: [[Note A]]
```

```yaml
---
replies to/replied by: "[[Note A]]"
---
```

When Note B declares that field under Previous, its connection to A displays
`replies to`; viewing A's connection to B displays `replied by`. Keep the complete
physical key and its existing normalized identity for indexing, predicates,
styles, suggestions, source navigation and mutations. Do not create separate
`replies to` and `replied by` property assignments or persist inverse-label
metadata in semantic evidence. Existing role inversion and declaration
multiplicity remain unchanged. Caption formatting belongs to presentation.

The associated draft PR owns the detailed implementation plan, compatibility
limits and acceptance tests. Real property/ontology edits retain their normal
indexing work; the new label projection must add none.

**Temporary:** remove this file before final review; do not archive it. Follow
[the issue resolution workflow](../agent-workflows/issue-resolution.md) and
[the mixed-agent workflow](../AGENT_WORKFLOW.md). The root `HANDOFF.md` remains
the single transient implementation/return document and is unchanged here.
