# Temporary draft-PR marker: background indexing efficiency

Prepared by Zsolt's Codex Agent on 2026-10-15.

Planning only: no runtime optimization or new performance measurement is included.
The implementation plan and acceptance criteria belong in this branch's draft PR description.

Maintainer context: the UI is available quickly and stays responsive. The problem is prolonged background CPU, memory and storage work, especially its potential cost on lower-powered computers, phones and tablets. Changing the indexing indicator or deferring the same work is not the objective.

Accepted branch base: `main@ae473fc5e18c0382e8b9023c5c433c5c7b744045`.
Implementation prerequisite: preserve [PR #163](https://github.com/zsviczian/kplex/pull/163), reviewed at `105a3a94907ef517855d3561844996c2628e3cab`, before measuring or optimizing the post-hydration path. It was still open and draft when this plan was prepared; do not assume it has merged.

Follow AGENTS.md, CONTRIBUTING.md and the mixed-agent workflow. Keep root HANDOFF.md as the single transient transfer file. Remove this temporary marker before final review; do not archive it. No merge, release or ready-for-review action is authorized by this planning commit.
