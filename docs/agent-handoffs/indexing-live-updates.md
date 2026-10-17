# Temporary draft-PR marker: live updates during indexing

Prepared by Zsolt's Codex Agent on 2026-10-17.

Planning only: no runtime fix, benchmark, or reproduced user failure is included. The detailed assignment and acceptance criteria live in this branch's draft PR description.

Starting base: `main@d40a339ffce9cc40f332e20c5add2e01422cf847`, including merged #171 and earlier #153/#163/#165. Measurement-only PR #169 was still open at preparation (`f794a067032c88699fb25e7ba269e894d2e1a319`). Before implementation, verify its accepted integration and refresh this branch from main through the approved workflow; do not assume an unmerged branch is accepted or duplicate its tooling.

Priorities: make externally created notes discoverable and explicitly navigable during background indexing; make the stationary central graph converge without navigating away and back; explain and avoid disproportionate global invalidation after small, fully covered note changes. The three reported symptoms are not assumed to share one cause.

Keep filename availability, requested semantic readiness, and complete background validation distinct. Preserve canonical identity, current source/write authority, event ordering, cancellation and foreground priority. The rejected persistent receipt and reader-sharing experiment remain out of scope.

Follow AGENTS.md, CONTRIBUTING.md and docs/AGENT_WORKFLOW.md. Root HANDOFF.md remains the only transient transfer document. Remove this temporary marker before final review; do not archive it. Keep the PR draft; no merge, release or personal-vault access is authorized by this marker.
