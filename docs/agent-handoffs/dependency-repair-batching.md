# Temporary plan marker: dependency-count maintenance batching

Prepared by Zsolt's Codex Agent, 2026-10-23.

The sole active assignment is [root HANDOFF.md](../../HANDOFF.md). This Windows implementation thread starts from accepted `main@0f94252aabb8b23458b5df192380854ea0bddd53`, including #204 but not unmerged #205.

Target ordinary dependency-count maintenance for new, genuinely changed and deleted sources: reduce per-occurrence native request/continuation and repeated ledger writes within the existing bounded journal transaction. Preserve exact multiplicity, decrement-before-increment validation, crash-resumable cursors, concurrent-writer safety and foreground responsiveness. #204's authenticated unchanged-projection fast path remains intact.

Finish #205's separate exact-head CI disposition without weakening its responsiveness assertion. If #205 is accepted before implementation, update from accepted main normally and pin the comparison baseline. Do not merge it or import its unaccepted candidate automatically.

Mac [PR #206](https://github.com/zsviczian/kplex/pull/206) continues independently. Do not touch its startup/event/retry owners, branch, experiment, instructions or private data.

Status: documentation-only plan. No runtime implementation, build, new benchmark or validation result is included. Remove this marker before final review; do not archive it or create a second handoff.
