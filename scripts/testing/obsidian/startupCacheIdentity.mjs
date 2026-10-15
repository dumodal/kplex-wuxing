/**
 * Hash disposable-vault cache inputs outside timed startup. Records stream through the existing
 * bounded readers into an injected synchronous SHA-256 implementation; no payload/path is returned.
 * This test receipt identifies stored inputs, not host freshness or graph publication authority.
 */
export async function startupCacheIdentity(cache, createHash) {
  const db = await cache.open(), meta = await cache.readSnapshotMeta();
  if (!db || !meta || meta.key !== 'active' || meta.completedMarkdownPaths !== undefined) throw Error('Complete saved cache required for input identity');
  /** Read the actual global source sequence without changing leases, journals or source state. */
  function sequence() {
    return new Promise(/** Observe completion of this native readonly transaction. */ (resolve, reject) => {
      const tx = db.transaction('meta', 'readonly'), request = tx.objectStore('meta').get('source-sequence');
      let selected;
      request.addEventListener('success', /** Keep only this small scalar record until transaction completion. */ () => { selected = request.result; });
      tx.addEventListener('complete', /** Unknown/malformed sequence cannot certify stable cache input. */ () => {
        if (selected === undefined) resolve(0);
        else if (selected?.key === 'source-sequence' && Number.isSafeInteger(selected.value) && selected.value >= 0) resolve(selected.value);
        else reject(Error('Invalid source sequence for input identity'));
      }, { once: true });
      tx.addEventListener('abort', /** Fail rather than reporting a partial input digest. */ () => reject(Error('Source identity transaction aborted')), { once: true });
    });
  }
  /** Frame each stored row separately, retaining only a synchronous hash and aggregate sizes. */
  function stream() {
    const hash = createHash('sha256');let records = 0, bytes = 0;
    return {
      /** Stream one exact record; length framing preserves order and duplicate multiplicity. */
      add(record) {
        const text = JSON.stringify(record), length = new TextEncoder().encode(text).byteLength;
        hash.update(String(length) + ':');hash.update(text);records++;bytes += length;
      },
      /** Finish once; no source or graph record survives the call. */
      finish() { return { sha256: hash.digest('hex'), records, bytes }; },
    };
  }
  const before = await sequence(), pages = stream(), evidence = stream(), heads = stream();
  if (!(await cache.iterateSnapshotPages(meta, /** Hash only the selected complete generation's actual records. */ row => pages.add(row)))
    || !(await cache.iterateSnapshotEvidence(meta, /** Preserve evidence order and declaration multiplicity. */ row => evidence.add(row)))) {
    throw Error('Unreadable graph input identity');
  }
  let after = null;
  do {
    const page = await cache.sources.headPage(after);
    if (!page.available || page.invalid) throw Error('Unreadable source input identity');
    for (const head of page.heads) heads.add(head);
    after = page.next;
  } while (after !== null);
  const finalSequence = await sequence(), finalMeta = await cache.readSnapshotMeta();
  if (before !== finalSequence || JSON.stringify(meta) !== JSON.stringify(finalMeta)) throw Error('Input selection changed while hashing');
  const policy = stream();policy.add({ schema: meta.schema, vaultSignature: meta.vaultSignature,
    settingsSignature: meta.settingsSignature, urlAliasVersion: meta.urlAliasVersion, discoveredFields: meta.discoveredFields });
  return { formatVersion: 1, method: 'Ordered selected-record SHA-256; outside startup timing; no host-authority claim',
    activation: { createdAt: meta.createdAt, generationSha256: createHash('sha256').update(meta.generation).digest('hex') },
    graph: { pages: pages.finish(), evidence: evidence.finish(), policy: policy.finish() },
    sources: { sequence: before, heads: heads.finish() } };
}
