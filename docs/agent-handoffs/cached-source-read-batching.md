# Temporary plan marker: cached-source read batching

Prepared by Zsolt's Codex Agent, 2026-10-23.

The sole active assignment is [root HANDOFF.md](../../HANDOFF.md). This Windows implementation thread starts at accepted `main@0f94252aabb8b23458b5df192380854ea0bddd53`, after #201, #203 and #204.

Prove and reduce clean cached-source validation/reader coordination through bounded existing repository lifetimes. Preserve leases, authentication, final freshness, foreground responsiveness and #204. Do not change startup invalidation/retry policy; that belongs to companion branch `2026-10-23-startup-source-convergence`.

Status: documentation-only plan; no runtime implementation or new performance result. The merged #203 final report motivates the work but measured older runtimes.

Remove this marker before final review. Do not archive it or create a second handoff.
