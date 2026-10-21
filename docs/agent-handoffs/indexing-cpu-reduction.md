# Temporary plan marker: indexing CPU reduction

**Status:** Planning and agent handoff only; no runtime fix or performance result yet.

Prepared by **Zsolt's Codex Agent** on 2026-10-21.

Continue `2026-10-21-indexing-cpu-reduction`, based on `main@551a3b52895484de3dd41e5c6eb2fa8c6712fec4`, and its existing draft PR. The complete assignment, static analysis, Windows observation protocol, implementation sequence and regression gates are in the single root [HANDOFF.md](../../HANDOFF.md).

The maintainer selects Windows for profiling and validation. Observe the dominant CPU/repeated-work costs, then implement the highest-impact safe changes. Protect current interactive indexing, foreground response, tag/folder loading, all node kinds, semantic correctness and revision-safe publication. Compare CPU-seconds for equivalent completed work, not merely peak percentage or time to an early readiness indicator. The engineering target is at least 50% lower end-to-end CPU on the reproduced expensive workload without functional or interaction regression; this is a target, not a result.

Context: merged [#195](https://github.com/zsviczian/kplex/pull/195), the retained Vault API decision in [#192](https://github.com/zsviczian/kplex/issues/192), and historical diagnostics in [#197](https://github.com/zsviczian/kplex/issues/197). The separate tablet report [#198](https://github.com/zsviczian/kplex/issues/198) is not automatically resolved by this work.

This file is only the workflow's temporary plan marker. Keep implementation and measured results on the same branch/PR; use the root handoff for agent transfers and reviewed validation records for durable evidence. **Delete this marker before final review. Do not archive it.** Do not merge or mark unrelated issues fixed from a plan-only PR.
