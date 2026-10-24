# Temporary plan marker: indexing progress through event bursts

Prepared by **Zsolt's Codex Agent**, 2026-10-24.

The sole active assignment is [root HANDOFF.md](../../HANDOFF.md).

This Windows implementation thread starts from accepted main `90032c6d7499fa4e40179110f7b5672d356aa390`, including all merged #201/#203/#204/#205/#206/#207 work. Historical [community diagnostics in #202](https://github.com/zsviczian/kplex/issues/202) motivate targeted current-main reproduction; they do not prove the same defects remain.

Objective: preserve valid indexing progress during file/metadata/resolver event bursts, eliminate demonstrated repeated global work or no-progress rebuild admission, and reach genuine completion after finite changes settle. Keep immediate edits, navigation, early tags/folders/search, exact source/dependency validity and crash recovery intact.

Use the existing event, reconciliation and startup owners. No new scheduler, weakened validity check, larger debounce/watchdog, storage/schema redesign or false readiness. Do not resume #207's accepted storage investigation or modify Mac experiments. Prove the cause, implement a narrow correction when justified, and report useful negative results when the old pattern is already fixed.

Status: documentation-only handoff; no runtime change, new reproduction, build or validation result. Remove this temporary marker before final review. Do not archive it or turn it into a second handoff.
