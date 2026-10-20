# Temporary planning marker — issue #191

Prepared by **Zsolt's Codex Agent**.

**Implementation handoff only; not a runtime fix.** Remove this file before final PR review. Do not archive the root handoff.

Issue: [#191 — session indexing before K-Plex is opened](https://github.com/zsviczian/kplex/issues/191).

Baseline: [`main@843e47f`](https://github.com/zsviczian/kplex/commit/843e47f471f897951165b962e12a1d6a64ce089e).

Read the [root implementation handoff](../../HANDOFF.md) and the draft PR on `2026-10-20-issue-191-startup-policy`. They cover separate Desktop, Tablet and Phone settings controlling the complete startup pipeline, including cache restoration/hydration, with one shared first-use admission and existing semantic/cache/lifecycle safeguards.

Proposed defaults are Desktop on, Tablet/Phone off, subject to maintainer review. Existing Eager/On-demand and Web link indexing choices remain independent. No adapter reads or other #192 implementation is authorized in this PR.

This planning checkpoint changes documentation only. Keep #191 open and the PR draft; do not merge or release it as a fix.
