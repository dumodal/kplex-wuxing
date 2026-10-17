# Temporary draft-PR marker: local folder updates and day-long diagnostics

Prepared by Zsolt's Codex Agent on 2026-10-17.

Planning only: no runtime correction, new diagnostic collection, or benchmark result is included. The complete assignment, safety constraints, budgets, and acceptance criteria live in this branch's draft PR description.

Verified starting base: `main@ef301dc07fa6a8754455a6aeb94ae871d2aacd75`, including merged #172 and its #161 fixes, plus #169/#165/#163/#153. Recheck current main and related work before implementation; do not assume another active branch has merged.

Two separately measurable work packages: (1) keep a narrowly proven new-empty-folder plus note-creation wave source-local without weakening ambiguous-wave fallback; (2) expose one privacy-safe indexing activity summary in both Copy Index Diagnostics and Report bug, useful across a few hours through a full day of one plugin lifetime, with fixed memory/output bounds and demonstrated negligible overhead.

Diagnostics remain local, passive and session-only: no automatic uploads, persistent identifiers, note/path/content capture, new polling or cache I/O. Day-long aggregate retention must not require enabling detailed profiling. No persistent source-validation receipt, new parser/scheduler/cache schema or unrelated refactoring is in scope.

Follow AGENTS.md, CONTRIBUTING.md and docs/AGENT_WORKFLOW.md. Root HANDOFF.md remains the single transient transfer document. Remove this temporary marker before final review; do not archive it. Keep the PR draft; no merge, release, user outreach or personal-vault access is authorized by this marker.
