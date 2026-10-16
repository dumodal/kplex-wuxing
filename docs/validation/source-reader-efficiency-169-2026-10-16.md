# Source-reader efficiency: PR #169

Status: measurement gate in progress; **production source-reader code is unchanged**.
Branch `2026-10-15-source-reader-efficiency`; accepted main `d40a339` (merged #171),
integration checkpoint `69fa58a9f4cb2125850ea24ff1019eb0f5673541`. Integration changed no
runtime/tests/scripts relative to main. Earlier #165 timings are historical, not this control.

## Attribution and bounded hypothesis

The initial offline-change barrier performs a head-only inspection, dependency verification and
leased metadata replay. Quiet source reconciliation then skips body reconstruction/acquisition.
An unchanged resolver wave additionally opens body, metadata and resolution reader lifetimes.
Leases protect immutable revisions; they never establish current-head, physical, host or policy proof.

For eligible single-chunk/parser3 wave sources, sharing metadata and resolution under the existing
selected reader could remove two pin/release write transactions while adding one inter-family
readonly head check. The theoretical total is one fewer transaction per owner, approximately5percent
of the measured wave fixture. This is not a resource saving or implementation decision. Body reads,
repair/write boundaries, compatibility authentication and initial/inter-family/post-release fences
remain independent. No receipt, schema, scheduler or broad rebuild change is proposed.

## Current evidence

Windows10.0.26200/i9-12900/24logical processors/68,448,301,056bytes; Node22.22.2;
Obsidian1.14.4, Electron43.3.0/Node24.18.1/Chrome150.0.7871.212.
The authorized reopened `kplex-test` corpus has20,088 Markdown notes/9,062,067bytes,
108,217 graph nodes/197,561 declarations, no notes above128KiB. This is the earlier high-node
fixture, **not Synthetic-Scale-v2**. Existing Eager preparation is outside restart timing.
Only disposable vaults have been accessed; the newly authorized personal-vault diagnostic scope
has not been used. Original executable/configuration/runtime state is backed up privately.

Real Chromium/IndexedDB operations, with setup excluded:

| Shape | Quiet transactions for N owners | Resolver-wave transactions |
| --- | --- | --- |
| Single chunk | 7N+9 | 20N+10 |
| Multiple chunks | 7N+9 | 31N+10 |
| Compatible URL-free parser2 | 14N+9 | 30N+10 |

Main independently reran2observer contracts, all18small shape/wave conditions (2/4/8owners),
and6single-chunk doubling conditions (32/64/128). The offline return independently ran18detailed
and18counts conditions with identical transaction counts. All successful conditions show zero
fresh Vault reads/parses/repairs and drained methods/transactions/readers/leases/decode. Repeated
exact-owner reads are measured separately. Two cycles cost26/48/32transactions respectively.
Actual failed-release protection is independently checked through a second IDB connection.

The larger all-shape32/64/128 attempt hit the existing60-second CDP evaluation deadline; its
unfinished condition/stage was not preserved by the old end-only writer, so the cause is unknown.
No deadline was weakened or native efficiency inferred. The same driver now appends condition
starts/results and preserves partial failure reports. The bounded passing multi-chunk matrix is
retained; the oversized failed setup is not presented as a product regression or acceptance pass.

## Measurement owners and controls

The existing `startupResources.mjs` owner adds detailed-only method/lease attribution. Bounded opaque
lease keys remain private, capped at4096; committed add/delete/abort observations determine row
accounting. Consumer-held time and the overlapping pin/release/selection wait union are separate.
Neither awaited duration nor summed transaction lifetime is CPU or exclusive disk time. Counts
mode omits the new detailed methods/clocks/argument inspection. Both arms use one frozen observer.

The existing profile builder optionally emits source maps, with exact hardening-column corrections.
The restart driver takes at most two3-second native CLI/CDP samples in host comparison/reconciliation.
It exports fixed disjoint source categories; sampled V8 time is separate from cumulative native
renderer CPU. The unsupported Node inspector connection attempt is preserved and its hook removed.
Actual CDP/map attribution passed against500head-only reads. No runtime CPU hook remains.
Primary counts arms do not enable the sampler or detailed StartupDiagnostics.

Native control pilot and GateM resource decision are pending. A favorable operation count alone
cannot authorize the production correction or support a shipping recommendation. Later acceptance
must preserve matched inputs, exact source/artifact identities, foreground behavior, genuine drain,
610-second quiet windows, ordinary-edit lifecycle and second-connection safety. No optimization
has been implemented, and no merge/release is authorized for #169.

Raw evidence remains local at `%TEMP%/kplex-169-2026-10-16/` plus the named offline fixture logs.
Profile directories preserve failed controls/source snapshots and exact artifacts/maps/identities;
private configuration backups are separate. No raw archive is published. Final closeout will bind
verified source references/checksums and remove the temporary planning marker.
