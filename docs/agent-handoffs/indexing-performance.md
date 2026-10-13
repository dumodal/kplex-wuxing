# Temporary indexing performance planning marker

Prepared by **Zsolt's Codex Agent**, 2026-10-13.

**Status:** Plan only. No runtime optimization, benchmark result or acceptance is included in this commit.

- Repository: `zsviczian/kplex`.
- Accepted base: `df5335808aacfd6a11ac7ff4ef008f9406f27893`.
- Workspace: `2026-10-13-indexing-performance`; target: `main`.
- The draft PR for this branch owns the detailed source assessment, prioritized work packages, measurement protocol and acceptance matrix.
- Related context: #93; historical URL/hydration work in #95, #102, #104, #105 and startup body reuse in #142. This plan does not claim to fix or close those issues.

Before implementation, read the draft PR and current `AGENTS.md`, `CONTRIBUTING.md`, `docs/ARCHITECTURE.md` and `docs/AGENT_WORKFLOW.md`. Transfer one bounded work package plus its measured baseline into the single root `HANDOFF.md`, preserving its standing header. Do not treat historical handoff text as current branch status. The offline agent returns uncommitted work for main-agent review unless separately authorized.

Remove this temporary marker before final review. Keep actual decisions and validation evidence in the PR and an appropriate reviewed validation report. C15-C26, cache-schema redesign and unrelated UI/settings features remain out of scope.
