/**
 * Test-only synthetic replacements and independent dependency oracles around production repository
 * owners in real Chromium IndexedDB. Detailed observers own reversible realm-local wrappers; callers
 * own fixture/database retirement. Synthetic contents and full oracles stay outside timing lanes.
 */
export function installDependencyCountReuseFixture() {
  const M = window.sourceModules;
  /** Reject a synthetic contract failure without treating partial maintenance as successful. */
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const request = window.value;
  /** Serialize deterministic synthetic oracle values without changing their occurrence order. */
  const encode = value => JSON.stringify(value);
  /** Measure encoded stored-row bytes using the same UTF-8 representation as production staging. */
  const byteLength = value => new TextEncoder().encode(encode(value)).length;
  /** Keep occurrence multiplicity, shared keys, URL origins, resolver tokens and tag ancestors. */
  function facts(index, revision, changed = false, wide = false) {
    const suffix = wide ? "x".repeat(2400) : "";
    const result = { values: [], "body-urls": [], metadata: [], resolution: [] };
    result.metadata.push({ kind: "alias", value: `Fresh label ${revision}` });
    result.metadata.push({ kind: "tag", value: "#shared/nested/leaf" });
    result.metadata.push({ kind: "field-name", fieldName: "Friends", normalizedFieldName: "friends", surface: "frontmatter" });
    for (let i = 0; i < 144; i++) {
      const target = `Shared-${i % 24}${changed === true && i === 0 ? "-different" : ""}${suffix}.md`;
      // The opt-in late control changes only the final host-resolved target. Host literals are
      // separate observed facts and remain unchanged, so the first unequal membership is near EOF.
      const resolvedTarget = changed === "late" && i === 143 ? `Shared-${i % 24}-different${suffix}.md` : target;
      result.resolution.push({ kind: "host-link", state: "resolved", target: resolvedTarget, count: 1 + revision });
      result.metadata.push({ kind: "host-literal", ordinal: i, rawTarget: `../${target}` });
    }
    for (let i = 0; i < 8; i++) result["body-urls"].push({ kind: "body-url", url: `https://Example.com/shared/${i % 4}`, label: `Label ${revision}`, line: i + 1 });
    return result;
  }
  /** Wrap only test-owned calls, restoring exact method identities on retirement. */
  function observe(repository) {
    let phase = "other";
    const operations = {}, restores = [], eligibility = { attempted: 0, matching: 0, records: 0, matchingRecords: 0, reasons: {}, firstMismatchIndices: {} };
    const staging = { pages: 0, records: 0, bytes: 0, maxPageRecords: 0, maxPageBytes: 0 };
    /** Attribute an observed native operation to the currently awaited production phase. */
    const add = (kind, store = "") => {
      const key = `${phase}|${kind}|${store}`;
      operations[key] = (operations[key] ?? 0) + 1;
    };
    /** Retain each exact method identity before installing its diagnostic-only replacement. */
    const patch = (object, name, wrap) => {
      const original = object[name]; object[name] = wrap(original);
      restores.push(/** Restore the observed object's original method after success or failure. */() => { object[name] = original; });
    };
    for (const name of ["get", "getAll", "getAllKeys", "count", "put", "add", "delete", "openCursor", "openKeyCursor"])
      patch(IDBObjectStore.prototype, name, /** Wrap without changing receiver, arguments or native return identity. */original => /** Count this store call before forwarding it unchanged. */function(...args) { add(name, this.name); return original.apply(this, args); });
    for (const name of ["get", "getKey", "getAll", "getAllKeys", "count", "openCursor", "openKeyCursor"])
      patch(IDBIndex.prototype, name, /** Preserve native index semantics while observing request volume. */original => /** Attribute index calls to their owning store. */function(...args) { add(`index.${name}`, this.objectStore.name); return original.apply(this, args); });
    patch(IDBCursor.prototype, "delete", /** Preserve cursor deletion behavior. */original => /** Include cursor-owned deletions in reclamation accounting. */function(...args) { add("cursor.delete", this.source.objectStore?.name ?? this.source.name); return original.apply(this, args); });
    patch(IDBCursor.prototype, "continue", /** Preserve cursor advancement behavior. */original => /** Count traversal independently of initial cursor requests. */function(...args) { add("cursor.continue", this.source.objectStore?.name ?? this.source.name); return original.apply(this, args); });
    patch(IDBDatabase.prototype, "transaction", /** Observe transaction creation without changing store ownership. */original => /** Normalize the store-list label and forward the original native call. */function(...args) { add(`transaction:${args[1] ?? "readonly"}`, Array.from(typeof args[0] === "string" ? [args[0]] : args[0]).sort().join(",")); return original.apply(this, args); });
    for (const [name, next] of [["stageChunks", "source-staging"], ["stageLocalDependencies", "membership-staging"], ["authenticateLocalCountReuse", "authentication-proof"], ["activate", "activation"], ["repairLocalDependencies", "selected-count-repair"], ["cleanupStagedLocalDependencies", "private-reclaim"], ["cleanupRevision", "old-revision-reclaim"]]) {
      if (typeof repository[name] !== "function") continue;
      patch(repository, name, /** Keep phase attribution local to the awaited repository operation. */original => /** Restore the enclosing phase even when production work rejects. */async function(...args) {
        const previous = phase; phase = next;
        try {
          if (name === "stageLocalDependencies") {
            const rows = args[1], bytes = rows.reduce(/** Include each serialized row and production separator allowance. */(sum, row) => sum + byteLength(row) + 1, 0);
            staging.pages++; staging.records += rows.length; staging.bytes += bytes;
            staging.maxPageRecords = Math.max(staging.maxPageRecords, rows.length); staging.maxPageBytes = Math.max(staging.maxPageBytes, bytes);
          }
          return await original.apply(this, args);
        } finally { phase = previous; }
      });
    }
    return { operations, eligibility, staging,
      /** Isolate expensive diagnostic oracle calls from measured production phases. */
      async inPhase(next, task) { const previous = phase; phase = next; try { return await task(); } finally { phase = previous; } },
      /** Retire installed wrappers in reverse order after every outcome. */
      retire() { for (const restore of restores.reverse()) restore(); } };
  }
  /** Independently derive selected counts from actual rows; no timing or count instrumentation is active. */
  async function oracle(context) {
    const { db, repository } = context;
    const owners = await request(db.transaction(M.SOURCE_LOCAL_OWNER_STORE).objectStore(M.SOURCE_LOCAL_OWNER_STORE).getAll());
    const rows = await request(db.transaction(M.SOURCE_LOCAL_DEPENDENCY_STORE).objectStore(M.SOURCE_LOCAL_DEPENDENCY_STORE).getAll());
    const counts = await request(db.transaction(M.SOURCE_LOCAL_KEY_STORE).objectStore(M.SOURCE_LOCAL_KEY_STORE).getAll());
    const repairs = await request(db.transaction(M.SOURCE_LOCAL_REPAIR_STORE).objectStore(M.SOURCE_LOCAL_REPAIR_STORE).getAll());
    const state = await request(db.transaction("meta").objectStore("meta").get(M.SOURCE_LOCAL_DEPENDENCY_STATE_KEY));
    const primary = await request(db.transaction("meta").objectStore("meta").get(M.SOURCE_DEPENDENCY_STATE_KEY));
    const impactJournals = await request(db.transaction(M.SOURCE_IMPACT_STORE).objectStore(M.SOURCE_IMPACT_STORE).count());
    const expected = new Map(), byOwner = new Map(owners.map(/** Bind rows to their actual selected source owner. */owner => [owner.sourceId, owner]));
    let inactive = 0;
    for (const row of rows) {
      const owner = byOwner.get(row.sourceId);
      if (owner?.state !== "complete" || owner.sourceRevision !== row.sourceRevision) { inactive++; continue; }
      expected.set(row.key, (expected.get(row.key) ?? 0) + 1);
    }
    assert(inactive === 0 && repairs.length === 0 && state.pending === 0, "Reclamation and repair debt must be closed");
    assert(encode([...expected].sort()) === encode(counts.map(/** Compare stored counts with independently enumerated occurrences. */row => [row.key, row.count]).sort()), "Every actual selected contribution equals the persisted count ledger");
    const selectedFamilies = new Map();
    for (const owner of owners.filter(/** Tombstones contribute no selected memberships. */owner => owner.state === "complete")) {
      const selected = rows.filter(/** Include only this exact selected source revision. */row => row.sourceId === owner.sourceId && row.sourceRevision === owner.sourceRevision);
      assert(selected.length === owner.records, "Selected owner record count");
      const head = await repository.inspect(owner.sourceId);
      assert(head.head?.sourceRevision === owner.sourceRevision && head.sequence === owner.sequence, "Actual head and local owner agree");
      selectedFamilies.set(owner.sourceId, head.head.families);
      const projected = [M.sourceLocalDependencyKey("node", owner.sourceId)];
      for (const family of M.SOURCE_FAMILIES) assert(await repository.visit(owner.sourceId, family, /** Derive dependency occurrences from authenticated actual source facts. */records => {
        for (const record of records) projected.push(...M.sourceLocalStoredDependencyKeys(head.head.physical.path, record));
        return true;
      }) === "ready", "Actual selected family authenticates");
      assert(encode(projected) === encode(selected.sort(/** Restore canonical source occurrence order. */(a, b) => a.index - b.index).map(/** Compare membership keys without revision-specific storage coordinates. */row => row.key)), "Actual source facts project to exactly the selected ordered rows");
    }
    const retiredFamilies = {};
    for (const store of [M.SOURCE_CHUNK_STORE, M.SOURCE_POSTING_STORE]) {
      const keys = await request(db.transaction(store).objectStore(store).getAllKeys());
      retiredFamilies[store] = keys.filter(/** Any family revision absent from selected manifests is unreclaimed debt. */key => selectedFamilies.get(key[0])?.[key[2]]?.revision !== key[1]).length;
      assert(retiredFamilies[store] === 0, "Old source chunks and postings must also be reclaimed");
    }
    assert(primary?.dirty === 0 && impactJournals === 0, "Primary staging and contributor journals must be closed");
    return { owners: owners.length, selectedRecords: rows.length, selectedBytes: rows.reduce(/** Retain only the aggregate selected-row byte total. */(sum, row) => sum + byteLength(row), 0), keys: counts.length, repairs: repairs.length, inactive, pending: state.pending, primaryDirty: primary.dirty, impactJournals, retiredFamilies, countDigest: await repository.observationDigest(encode(counts)) };
  }
  /** Replace all families normally; fresh labels and counts prove facts are not suppressed by projection reuse. */
  async function replace(context, index, revision, changed = false, wide = false, detailed = null) {
    const { repository, db } = context, sourceId = `Owner-${String(index).padStart(4, "0")}.md`;
    const old = await repository.inspect(sourceId), data = facts(index, revision, changed, wide);
    if (detailed && old.head) {
      const before = await detailed.inPhase("diagnostic-oracle", /** Enumerate the synthetic predecessor only in the separate detailed lane. */() => request(db.transaction(M.SOURCE_LOCAL_DEPENDENCY_STORE).objectStore(M.SOURCE_LOCAL_DEPENDENCY_STORE).index(M.SOURCE_LOCAL_REVISION_INDEX).getAll(IDBKeyRange.only([sourceId, old.head.sourceRevision]))));
      const projected = [M.sourceLocalDependencyKey("node", sourceId)];
      for (const family of M.SOURCE_FAMILIES) for (const fact of data[family]) projected.push(...M.sourceLocalStoredDependencyKeys(sourceId, fact));
      const previousKeys = before.sort(/** Compare predecessor occurrences in their stored ordinal order. */(a, b) => a.index - b.index).map(/** Exclude revision coordinates from the independent projection oracle. */row => row.key);
      const matching = encode(previousKeys) === encode(projected);
      detailed.eligibility.attempted++; detailed.eligibility.records += projected.length;
      if (matching) { detailed.eligibility.matching++; detailed.eligibility.matchingRecords += projected.length; }
      else {
        const reason = before.length === projected.length ? "same-count-different-keys" : "different-record-count";
        detailed.eligibility.reasons[reason] = (detailed.eligibility.reasons[reason] ?? 0) + 1;
        let prefix = 0;
        while (prefix < Math.min(previousKeys.length, projected.length) && previousKeys[prefix] === projected[prefix]) prefix++;
        detailed.eligibility.firstMismatchIndices[prefix] = (detailed.eligibility.firstMismatchIndices[prefix] ?? 0) + 1;
      }
    }
    const result = await repository.replace({ sourceId, expected: old.expected, physical: { identity: sourceId, path: sourceId, mtime: revision + 1, size: revision + 100 }, observation: { epoch: "dependency-benchmark", revision, environment: "0".repeat(64) }, bodyParserVersion: 3,
      families: Object.fromEntries(M.SOURCE_FAMILIES.map(/** Produce each genuine source family through ordinary backpressured replacement. */family => [family, /** Stop immediately when the repository rejects an emitted fact. */async emit => { for (const fact of data[family]) if (!await emit(fact)) return false; return true; }])) });
    assert(result.outcome === "activated", `Ordinary replacement failed: ${result.outcome}/${result.reason}`);
    if (old.head) for (const previous of new Set([old.head.sourceRevision, ...Object.values(old.head.families).map(/** Include retained family revisions in end-to-end reclamation. */family => family.revision)]))
      assert(await repository.cleanupRevision(sourceId, previous), "Known old revision reclaimed before timing ends");
    return result;
  }
  /** Fresh test-owned logical state; production storage/projection/repair implementations are unchanged. */
  async function seedRange(context, first = 0, limit = context.owners) {
    for (let i = first; i < Math.min(context.owners, first + limit); i++) await replace(context, i, 0, false, context.wide);
    assert(await context.repository.completeLocalDependencyInventory() === "ready", "Initial inventory closes");
  }
  /** Seed in bounded transport batches when the tool-side driver owns a larger fixture. */
  async function setup(name, owners, wide = false, seed = true) {
    const fixture = await window.fixture(name), db = await fixture.cache.open();
    const context = { fixture, db, repository: fixture.repository, name, owners, wide };
    try {
      if (seed) await seedRange(context);
      return context;
    } catch (error) { fixture.close(); throw error; }
  }
  /** Complete all count and private journals after the same deterministic replacement sequence. */
  async function workload(context, mixed = false, rounds = 1, detailed = null, first = 0, limit = context.owners) {
    const end = Math.min(context.owners, first + limit);
    for (let round = 1; round <= rounds; round++) for (let i = first; i < end; i++)
      await replace(context, i, round, context.changeMode === "late" ? "late" : mixed && i % 4 === 0, context.wide, detailed);
    assert(await context.repository.completeLocalDependencyInventory() === "ready", "Final inventory closes");
    const repairs = await request(context.db.transaction(M.SOURCE_LOCAL_REPAIR_STORE).objectStore(M.SOURCE_LOCAL_REPAIR_STORE).count());
    assert(repairs === 0, "No journal or private marker remains at measured completion");
    const primary = await request(context.db.transaction("meta").objectStore("meta").get(M.SOURCE_DEPENDENCY_STATE_KEY));
    const impactJournals = await request(context.db.transaction(M.SOURCE_IMPACT_STORE).objectStore(M.SOURCE_IMPACT_STORE).count());
    assert(primary?.dirty === 0 && impactJournals === 0, "No primary dirty fence or contributor journal remains at measured completion");
    return { activations: (end - first) * rounds, memory: performance.memory ? { usedJSHeapSize: performance.memory.usedJSHeapSize, totalJSHeapSize: performance.memory.totalJSHeapSize } : null, hidden: document.hidden, focused: document.hasFocus() };
  }
  window.dependencyCountReuse = { setup, seedRange, replace, workload, oracle, observe, facts, context: null };
}
