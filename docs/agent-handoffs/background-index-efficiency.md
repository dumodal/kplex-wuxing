# Temporary draft-PR marker: background indexing efficiency

Prepared by Zsolt's Codex Agent on 2026-10-15.

Planning only: no runtime optimization or new performance measurement is included.
The implementation plan and acceptance criteria belong in [PR #165](https://github.com/zsviczian/kplex/pull/165).

Maintainer context: the UI is available quickly and stays responsive. The problem is prolonged background CPU, memory and storage work, especially its potential cost on lower-powered computers, phones and tablets. Changing the indexing indicator or deferring the same work is not the objective.

Original branch base: `main@ae473fc5e18c0382e8b9023c5c433c5c7b744045`.
During plan preparation, [PR #163](https://github.com/zsviczian/kplex/pull/163) merged into main as `8df393a44272e4d6a5d2b403447ef0f3c81ae527` at 2026-10-15 04:04:06 UTC. Its reviewed head was `105a3a94907ef517855d3561844996c2628e3cab`.
Before implementation, bring this documentation-only branch up to date with current main through the approved normal workflow. Preserve the merged snapshot-reuse fix and #153 optimizations; do not benchmark or implement against the older starting code.

Follow AGENTS.md, CONTRIBUTING.md and the mixed-agent workflow. Keep root HANDOFF.md as the single transient transfer file. Remove this temporary marker before final review; do not archive it. No merge of this PR, release or ready-for-review action is authorized by this planning commit.
