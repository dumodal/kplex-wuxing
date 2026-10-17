# Standing instructions — preserve this header

This is a temporary handoff document between agents. The development of the solution involves agents with access to Obsidian CLI and a full development environment with all node packages installed, but also agents with more limited access. Development is done in "ping-pong" between these two types of agents. Agents should use this document to pass instructions and status from one another, such as instructions for testing/validation, or instructions for development work that can only be done in a full environment.

## Mixed agent handoff

### Instructions

The **offline development agent has no Obsidian CLI/runtime access** and performs most scoped implementation and substantial trace analysis. Its Node/dependency/browser/network/Git capabilities must be recorded, not assumed. The **main validation agent has Obsidian CLI and a full dependency environment** and prepares assignments, captures runtime evidence, reviews/fixes returns, performs native validation and handles authorized Git/PR actions. Host-only probes or supporting development can be requested from the main agent and the resulting evidence sent back for offline analysis.

Follow `AGENTS.md`, `CONTRIBUTING.md` and [the mixed agent workflow](docs/AGENT_WORKFLOW.md). Keep this single handoff transient: preserve the opening note/standing instructions and overwrite the assignment/results below on each transfer, in either direction. Do not archive handoffs or append a session history. Persist accepted architecture/checkpoint decisions and limitations in `Refactor plan.md`; feature-specific evidence belongs in its issue/PR or a reviewed validation report.

Return uncommitted changes and actual results for main-agent review unless the maintainer explicitly assigns other repository authority. Missing prerequisites/tests remain pending; a skip is not a pass. The main agent independently reviews, runs applicable checks, fixes defects and recommends only necessary prioritized manual checks. Commit/PR/merge/release steps follow applicable maintainer authorization after required validation or explicit acceptance of a recorded limitation.

Obsidian is the production host; preserve the established portable semantic, identity/source, publication/revision, localization and environment boundaries.




---

# PR #174 — D2 reviewed; final V acceptance active

State: main validation agent continuing. Offline implementation/review is returned and frozen.
Branch: `2026-10-17-local-folder-diagnostics`. Baseline main is merged #173 at
`23aa44eae13797a93890fd1ce1679074d45d9295`; integrated without history rewriting at `d4d65cd`.
#164 is closed with the requested comment. D0 `786e91c`, F2 `b4bb401` and F3 `ebe26cc` are pushed.
Keep #174 draft. No merge, release, personal-vault access or raw-evidence publication.

## Reviewed implementation

F2 authenticates only one bounded native empty-folder wave using existing complete physical
publication proof, exact identities/membership, existing per-cause expiry and one close. It never
grants semantic/source authority. F3 accepts successful `activated` or `absent` old-path retirement
only for the current pass, matching intent and continued native absence. Held A → B → C completion
cannot erase a newer rename. No receipt, schema, scheduler or parser/compiler redesign.

D2 adds shared branded safe captures to both real exports, O(1) retained health, static public build
identity and eight-locale disclosure. Unknown accessors/proxies/serializers are never trusted.
Report reads do not record readiness, reset capture, acquire sources or schedule work. Coarse
observations remain independent of detailed profiling; field/counter/overlap limits are documented.
Main-agent source review covered ownership, publication/finality, privacy, bounded retention,
exception isolation, localization, owner-document clipboard behavior, reuse and meaningful comments.

## Actual validation

Node 22.22.2 final combined `verify:obsidian` passes at
`%TEMP%/kplex-174-final-verify-F3-D2-35m`: architecture 7, indexing 128, main 960, UI 131,
sources 334, browser sources 598; zero failures/skips, actual installed types, core, official lint,
production build and exact native smoke pass. Main artifact SHA-256:
`d46b370199b0a2b06347266308e539f3a71a9e83459d50934be4b38bbc067ebc`.
The earlier aggregate 20-minute wrapper failure is preserved; its child finished before the clean
35-minute rerun. Individual 14-minute large-case and 30-second native CLI deadlines are unchanged.

38 focused real-IDB folder cases, native ordinary Markdown/real Excalidraw/create-fill-rename,
#172 held-P3 Find/sync/stationary completion and #161's 28 variants pass. The earlier 24-case
native report lane passes actual Settings, narrow desktop, sidebar and distinct main/popout writers.
Its final-artifact repeat completes 23 recorded cases; optional real clipboard writing remains pending to preserve non-plain-text formats. All guarded effects/owner checks and cleanup pass. The clipboard helper no longer invokes the main forwarding
getter while comparing capabilities. Earlier failed controls do not establish clipboard restoration.

Final D2 amplified cost is approximately 0.546 microseconds/pass pair; observed diagnostic data-root
cut 16,816 bytes. Capture/serialization approximately 0.141/0.031 ms; transient allocations are
nonzero. Native D CPU differences remain inconclusive. Folder work counts improve independently;
no universal speedup or memory saving is claimed. See the consolidated report and schema guide.

## Next action and safety limits

The first final-artifact quiet trial lost foreground focus and was explicitly cancelled through its
owned timer. Its exclusion and exact cleanup are preserved in
`%TEMP%/kplex-174-native-final-integrated-quiet`. The fresh unchanged-condition trial passes at
`%TEMP%/kplex-174-native-final-integrated-quiet-foreground`: 610.411 seconds, no source work,
build/save/digest; two existing cache transactions/requests. Ordinary Markdown, actual Excalidraw
and rapid create/fill/rename also pass. Final `supportReport.mjs` passes at
`%TEMP%/kplex-174-native-final-support-report`, with exact configuration/clipboard restoration.
D2 is ready for validated checkpoint commit/push. All native/browser/resource lanes remain serial.

Run the reviewed bounded real two-hour soak with the exact staged artifact and actual selected
mode/policy unchanged. Driver: `%TEMP%/kplex-174-work/native-indexing-activity-soak-reviewed.mjs`.
No forced builds/flushes, clock advance or changed policy. Preserve all failed controls/cleanup.
Then finalize separate F/D ship/revise/defer decisions, remove the planning marker, and create/verify
the private durable evidence copy using `%TEMP%/kplex-174-evidence-backup.mjs`. Do not archive this
handoff, follow dependency junctions, publish raw configuration/local metadata or delete originals.

Remaining device priorities: (1) real 24-hour Windows use with idle/edit/report cycles, (2) macOS
popout/copy and interrupted folder waves, (3) physical Android/iOS suspend/resume, clipboard and
memory. Accelerated 24/48-hour tests do not prove those device behaviors. C14 remains paused.