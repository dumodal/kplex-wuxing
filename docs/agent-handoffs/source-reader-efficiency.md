# Temporary draft-PR marker: source-reader efficiency

Prepared by Zsolt's Codex Agent on 2026-10-15.

Planning only: no runtime changes or new benchmark results are included.
The detailed assignment, measurement gates and acceptance criteria belong in this branch's draft PR description.

Base: `main@b7bb8e83ca46657a554c788778bad3a533f8da16`, including merged [PR #165](https://github.com/zsviczian/kplex/pull/165). The reviewed predecessor head is `949ccfe159b05f587e7df2c1dd77925f0146895a`.

Objective: measure and reduce source-reader lease/head-selection overhead during background validation without weakening source freshness, payload integrity, concurrent-reader protection, cancellation or mobile resource bounds. Fewer transactions alone do not establish lower CPU or faster completion.

The optional snapshot/source receipt remains rejected and out of scope. No new persistence format, scheduler, parser or broad refactoring is authorized by this plan.

Follow AGENTS.md, CONTRIBUTING.md and docs/AGENT_WORKFLOW.md. Root HANDOFF.md is the only transient transfer document. Remove this temporary marker before final review; do not archive it. Keep the PR draft; do not merge or release.
