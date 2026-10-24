# Temporary plan marker — warm source selection

Prepared by **Zsolt's Codex Agent**, 2026-10-24.

**Temporary:** this file exists only to initialize a planning PR. Remove it before final review; do not archive it or treat it as a second HANDOFF.

The single assignment is [root HANDOFF.md](../../HANDOFF.md).

Base: accepted `main@af09bc42d78abe03ed0d32e0edcdf22d0ebe08ae`, including merged #210 and the timer-investigation documentation.

Objective: establish whether the clean warm `reconcileRestartHostInventory()` path performs redundant head selections around `inspect()`, `ensureLocalDependencies()` and authenticated `durableHostInventory()`. If a safe, material saving exists, implement the smallest short-lived source-selection reuse in the repository/acquisition boundary with exact concurrency, validity, recovery and native tests. This is an **investigation and implementation handoff**, not a completed fix.

Use only existing `kplex-test` and `kplex-test-small` for native validation, with synthetic Chromium/IndexedDB fixtures for controlled comparisons. The former `Zsolt's Brain` large test copy has been **deleted for storage reasons**; no restore, clone, S2/A4 import, disk-heavy fixture or personal-vault access is authorized.

Preserve #211's independent autosave presentation work and do not import its unmerged branch. Historical #205/#206/#210 validation reports motivate the work but cannot be relabelled as current binary timings.

Planning only: no source change, build, test or native deployment has been performed.
