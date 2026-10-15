# Proposed snapshot/source validation receipt for #165

Status: maintainer approved this scope on 2026-10-15. The separate implementation checkpoint is
has passed full correctness/native validation; resource acceptance is pending and it is not accepted for merge. Duplicate-read checkpoint
`d0d16fb` is already committed and pushed. The prototype adds no database version/store change.

The merged baseline stores complete graph generations and authenticated source heads separately.
A complete graph's saved semantic fingerprints are not a certificate for all current resolver and
Date/environment inputs. Zero source writes during a restart therefore cannot establish that the
retained graph was compiled from the selected source generation.

The draft PR explicitly requires a separately scoped proposal for a new persistent format. This
proposal requests only an optional, versioned validation receipt on a complete graph generation in
the existing disposable snapshot metadata. It does not require a database version/store change,
a second compiler, a scheduler change, a decoded source mirror, or a change to durable user data.

The receipt would bind an ordered, bounded-memory digest of exact selected source identities and
revisions to the graph generation, source sequence, and canonical host/environment/policy inputs.
It may be minted only around a genuine canonical compilation with already closed source authority,
unchanged source sequence and host/source/policy lifetime fences. Sampling the newest heads after
compiling an older graph is forbidden. Source cache replacement must fail the identity/digest proof
even if a sequence number is reused.

At restart, the existing dependency-discovery barrier and authenticated source validation still run.
Only a matching receipt under current publication fences permits retaining the graph and settling
the covered startup backlog. This path performs no full compilation, global vocabulary replay, or
complete snapshot save. New edits remain pending. Existing selected-owner patch paths remain the
only mechanism for finite changes whose complete impact coverage can be proved; unsupported or
uncertain coverage retains a precise conservative fallback.

Legacy, malformed, missing or mismatched receipts are never trusted. A legacy graph remains
available as cached presentation; a subsequent necessary canonical compilation and legitimate save
can produce its first receipt. No cache purge or snapshot rewrite merely to add the field is allowed.

Before accepting the implementation, test graph/source generation mismatch, source-cache
replacement, concurrent writers, same-stat events, policy ABA, Date/alias/path drift, cancellation,
missing/corrupt payloads and interrupted saves. Measure receipt creation/validation transactions,
CPU, bytes and retained memory, including first creation. The implementation must remain within
the established repository/compiler/publication owners and existing resource bounds.

Approval additionally requires optional/backward-compatible receipt versioning, lifecycle and
invalidation documentation; clean warm comparisons with and without the receipt through genuine
idle, including CPU, storage, total work and peak memory; and an independently revertible commit.
This approval is not a waiver of resource/correctness acceptance. No merge is authorized; results
and safety analysis require maintainer review. Consolidate the decision into the final report.

Safety investigation: physical statistics and an existing cached host content hash cannot by
themselves certify an unobserved offline same-stat edit. The receipt must not weaken that case.
Bounded current-content verification, integrated with the existing source/compilation owners,
is under evaluation. Its native reads, parsing during first creation, hashing, transient memory
and subsequent unchanged-validation cost must all be counted. If that cost prevents a real total-work
improvement, do not ship the receipt merely because it avoids a compiler invocation. No dependency
on an undocumented host hash has been introduced. The prototype reads/parses actual bounded notes
through the existing source owner and records that cost. Version-one format and rejection rules are
documented in the living report; resource acceptance remains pending.
