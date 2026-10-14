# Temporary draft-PR marker: fresh-snapshot restart recovery

Prepared by Zsolt's Codex Agent on 2026-10-14.

Implementation handoff only; no runtime fix or measured speedup is included.
The assessment, supplied restart evidence, implementation plan and acceptance criteria belong in this branch's draft PR description.

Accepted branch base: `main@df5335808aacfd6a11ac7ff4ef008f9406f27893`.
Reviewed improved implementation: [PR #153](https://github.com/zsviczian/kplex/pull/153) at `cc0aacd01a0ab9b3497c18f8b85e0398fe61e8dc`; that PR is not yet merged.
Before implementation, verify and integrate the maintainer-approved performance baseline without reverting its optimizations or importing its raw reports into this plan-only diff.

Target: explain and fix a freshly saved, fresh-at-admission snapshot being abandoned before full page hydration, followed by approximately twenty minutes of source-backed recovery on a real Obsidian restart. Exact invalidation trigger remains unconfirmed.

Follow AGENTS.md, CONTRIBUTING.md and the existing mixed-agent workflow. Root HANDOFF.md remains the single transient transfer file; its standing header must be preserved.
Remove this temporary marker before final review. Do not merge, release, mark ready or claim a fix from this planning commit.
