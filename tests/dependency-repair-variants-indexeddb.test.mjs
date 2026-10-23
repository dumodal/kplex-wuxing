/**
 * Focused real-IndexedDB safety contracts for the test-only PR207 causal variants. Exact accepted
 * baseline and frozen candidate source are supplied to the finite variant factory; only repository
 * source is overridden. Genuine replacements establish semantic/count parity, while bounded
 * selected journals expose multiplicity, rollback and durable recovery without replacing IDB.
 * This file owns no production configuration, native vault, benchmark timing or Git mutation.
 */
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { contributorBrowserBundle, contributorBrowserInitialize } from "./support/contributorBrowserFixture.mjs";
import { chromiumHarness } from "./support/browserTypeScript.mjs";
import { installDependencyCountReuseFixture } from "./support/dependencyCountReuseFixture.mjs";
import { createDependencyRepairVariants, DEPENDENCY_REPAIR_VARIANT_IDENTITIES } from "./support/dependencyRepairVariants.mjs";

/** Read an immutable accepted/frozen blob without checking out, modifying or publishing any branch. */
function pinnedSource(commit) {
  const identity = DEPENDENCY_REPAIR_VARIANT_IDENTITIES;
  const result = spawnSync("git", ["show", `${commit}:${identity.runtimeFile}`], {
    cwd: new URL("..", import.meta.url), encoding: "utf8", timeout: 15_000, windowsHide: true,
  });
  if (result.error || result.status !== 0) throw result.error ?? new Error(result.stderr || "Pinned source unavailable");
  return result.stdout;
}

const variants = createDependencyRepairVariants({
  baselineSource: pinnedSource(DEPENDENCY_REPAIR_VARIANT_IDENTITIES.baselineCommit),
  candidateSource: pinnedSource(DEPENDENCY_REPAIR_VARIANT_IDENTITIES.candidateCommit),
});

/** Install small durable-journal helpers; all requests and transactions remain genuine Chromium IDB. */
function installVariantContracts() {
  const M = window.sourceModules;
  /** Use canonical production key encoding while keeping every test value synthetic. */
  const key = name => M.sourceLocalDependencyKey("field", name);
  /** Capture all mutable selected-repair authority so failed pages cannot hide partial mutations. */
  async function snapshot(db) {
    const result = {};
    for (const store of ["meta", M.SOURCE_LOCAL_DEPENDENCY_STORE, M.SOURCE_LOCAL_KEY_STORE, M.SOURCE_LOCAL_REPAIR_STORE])
      result[store] = await value(db.transaction(store).objectStore(store).getAll());
    return result;
  }
  /** Seed an exact selected journal, with immutable row coordinates and occurrence-count ledgers. */
  async function journal(name, oldNames, newNames) {
    const cache = new M.KplexIndexedDbCache(name), db = await cache.open();
    ok(db, "Real journal database opens");
    const oldKeys = oldNames.map(/** Preserve every repeated old occurrence. */name => key(name));
    const newKeys = newNames.map(/** Preserve every repeated new occurrence. */name => key(name));
    await edit(db, ["meta", M.SOURCE_LOCAL_DEPENDENCY_STORE, M.SOURCE_LOCAL_KEY_STORE, M.SOURCE_LOCAL_REPAIR_STORE],
      /** Stage one pending selected repair atomically, as a deliberate mechanical fixture. */transaction => {
        transaction.objectStore("meta").put(M.sourceLocalDependencyState(17, true, 1));
        const rows = transaction.objectStore(M.SOURCE_LOCAL_DEPENDENCY_STORE), counts = new Map();
        for (const [revision, keys] of [["old", oldKeys], ["new", newKeys]]) for (let index = 0; index < keys.length; index++) {
          rows.put({ version: 1, sourceId: "Owner.md", sourceRevision: revision, index, key: keys[index] });
          if (revision === "old") counts.set(keys[index], (counts.get(keys[index]) ?? 0) + 1);
        }
        for (const [key, count] of counts) transaction.objectStore(M.SOURCE_LOCAL_KEY_STORE).put({ version: 1, key, count });
        transaction.objectStore(M.SOURCE_LOCAL_REPAIR_STORE).put({ version: 1, sourceId: "Owner.md",
          fromRevision: oldKeys.length ? "old" : null, fromRecords: oldKeys.length, fromIndex: 0,
          toRevision: newKeys.length ? "new" : null, toRecords: newKeys.length, toIndex: 0 });
      });
    return { name, cache, db, repository: cache.sources, oldKeys, newKeys };
  }
  /** Compare final persisted multiplicity and exact retained new coordinates, including negatives. */
  async function finalState(context) {
    const { db, repository, newKeys } = context, expected = new Map();
    for (const key of newKeys) expected.set(key, (expected.get(key) ?? 0) + 1);
    const counts = await value(db.transaction(M.SOURCE_LOCAL_KEY_STORE).objectStore(M.SOURCE_LOCAL_KEY_STORE).getAll());
    /** Sort both independent ledgers identically without relying on browser collation details. */
    const compare = (a, b) => a[0].localeCompare(b[0]);
    equal(counts.map(/** Project the complete actual ledger to its meaningful count tuple. */row => [row.key, row.count]).sort(compare), [...expected].sort(compare), "Exact complete occurrence ledger");
    const rows = await value(db.transaction(M.SOURCE_LOCAL_DEPENDENCY_STORE).objectStore(M.SOURCE_LOCAL_DEPENDENCY_STORE).getAll());
    equal(rows, newKeys.map(/** Require every new ordinal exactly once and no old membership survivor. */(key, index) => ({ version: 1, sourceId: "Owner.md", sourceRevision: "new", index, key })), "Exact new membership coordinates");
    equal(await value(db.transaction(M.SOURCE_LOCAL_REPAIR_STORE).objectStore(M.SOURCE_LOCAL_REPAIR_STORE).count()), 0, "Journal fully retires");
    const state = await value(db.transaction("meta").objectStore("meta").get(M.SOURCE_LOCAL_DEPENDENCY_STATE_KEY));
    equal(state.pending, 0, "Global pending slot retires exactly once");
    equal(state.revision, 18, "Global count revision advances exactly once");
    equal(repository.readers.size, 0, "No repair reader escapes");
    equal(repository.decodeBytes, 0, "No decode reservation escapes");
    return true;
  }
  /** Close and reopen the real connection before resuming the same committed durable journal. */
  async function reopen(context) {
    context.cache.close();
    const cache = new M.KplexIndexedDbCache(context.name), db = await cache.open();
    ok(db, "Durable journal reopens on a fresh connection");
    Object.assign(context, { cache, db, repository: cache.sources });
  }
  window.variantContracts = { key, snapshot, journal, finalState, reopen };
}

/** A/B/C/D must differ in measured work, while preserving actual persisted count and recovery contracts. */
for (const variant of Object.values(variants)) test(`dependency repair variant ${variant.id} preserves real IndexedDB contracts`, { timeout: 180_000 },
  /** Run one variant in its own disposable browser/profile, keeping scenarios serial and bounded. */
  async t => {
    const bundle = await contributorBrowserBundle([DEPENDENCY_REPAIR_VARIANT_IDENTITIES.runtimeFile], variant.sourceOverrides);
    const browser = await chromiumHarness(bundle);
    try {
      assert.equal(await browser.evaluate(contributorBrowserInitialize), true);
      await browser.evaluate(`(${installDependencyCountReuseFixture.toString()})()`);
      await browser.evaluate(`(${installVariantContracts.toString()})()`);

      await t.test("genuine replacement, unchanged reuse, deletion and later editing retain exact source projections",
        /** Exercise public repository owners and the independent actual-source oracle, not just seeded journals. */async () => {
          assert.equal(await browser.evaluate(`(/** Keep the genuine lifecycle isolated from mechanical failure fixtures. */async()=>{
            const B=dependencyCountReuse,c=await B.setup('variant-genuine-${variant.id}',2,false,true,'mixed');
            try{
              await B.oracle(c);await B.replace(c,0,1,true);await B.closeWork(c);await B.oracle(c);
              const counts=await value(c.db.transaction(sourceModules.SOURCE_LOCAL_KEY_STORE).objectStore(sourceModules.SOURCE_LOCAL_KEY_STORE).getAll());
              await B.replace(c,1,1,false);await B.closeWork(c);
              equal(await value(c.db.transaction(sourceModules.SOURCE_LOCAL_KEY_STORE).objectStore(sourceModules.SOURCE_LOCAL_KEY_STORE).getAll()),counts,'Authenticated unchanged projection preserves exact counts');
              await B.oracle(c);equal((await c.repository.tombstone('Owner-0000.md')).outcome,'activated','Genuine deletion selects');await B.closeWork(c);await B.oracle(c);
              await B.replace(c,0,2,true);await B.closeWork(c);await B.replace(c,0,3,true);await B.closeWork(c);await B.oracle(c);return true;
            }finally{c.fixture.close();}
          })()`), true);
        });

      await t.test("cross-page repeated occurrences preserve old-before-new multiplicity",
        /** Cross the 256-record phase boundary without deduplicating any source occurrence. */async () => {
          assert.equal(await browser.evaluate(`(/** Replay one repeated key across both old/new pages. */async()=>{
            const V=variantContracts,c=await V.journal('variant-duplicates-${variant.id}',Array(300).fill('shared'),Array(302).fill('shared'));
            try{equal(await c.repository.repairLocalDependencies(c.db,'Owner.md',/** Keep the synthetic repair live for the whole page sequence. */()=>true),'ready','Repeated repair completes');return await V.finalState(c);}finally{c.cache.close();}
          })()`), true);
        });

      for (const mode of ["underflow-net-zero", "overflow", "gapped-old", "malformed-old"]) await t.test(`${mode} rolls back every count, row and journal cursor`,
        /** Deliberate corrupt test-owned state must reject atomically under every implementation strategy. */async () => {
          assert.equal(await browser.evaluate(`(/** Damage only a synthetic journal before entering the production repair owner. */async()=>{
            const M=sourceModules,V=variantContracts,mode=${JSON.stringify(mode)},c=await V.journal('variant-invalid-${variant.id}-'+mode,['shared','shared','shared'],['shared','shared','shared','added']);
            try{
              await edit(c.db,[M.SOURCE_LOCAL_DEPENDENCY_STORE,M.SOURCE_LOCAL_KEY_STORE],/** Corrupt only the owned fixture before the measured transaction begins. */async tx=>{
                const keys=tx.objectStore(M.SOURCE_LOCAL_KEY_STORE),rows=tx.objectStore(M.SOURCE_LOCAL_DEPENDENCY_STORE);
                if(mode==='underflow-net-zero')keys.put({version:1,key:V.key('shared'),count:2});
                if(mode==='overflow')keys.put({version:1,key:V.key('added'),count:Number.MAX_SAFE_INTEGER});
                if(mode==='gapped-old')rows.delete(['Owner.md','old',1]);
                if(mode==='malformed-old'){const row=await value(rows.get(['Owner.md','old',1]));rows.put({...row,unexpected:true});}
              });
              const before=await V.snapshot(c.db);equal(await c.repository.repairLocalDependencies(c.db,'Owner.md',/** A malformed journal must reject even while its caller remains live. */()=>true),'dependency-invalid','Malformed maintenance refuses ready');equal(await V.snapshot(c.db),before,'Whole rejected page remains durable and unchanged');
              await V.reopen(c);equal(await V.snapshot(c.db),before,'Rejected journal survives real connection reopen');return true;
            }finally{c.cache.close();}
          })()`), true);
        });

      await t.test("synchronous native quota failure retains identity and supports durable retry",
        /** Inject only a genuine request-boundary throw while preserving the actual database implementation. */async () => {
          assert.equal(await browser.evaluate(`(/** Keep native failure attribution separate from domain-invalid count failures. */async()=>{
            const M=sourceModules,V=variantContracts,c=await V.journal('variant-quota-${variant.id}',['old','shared'],['new','shared']),original=IDBObjectStore.prototype.get,failures=[];let fired=false,r;
            try{
              const injected=new DOMException('Synthetic variant quota failure','QuotaExceededError');
              r=new M.NeutralSourceRepository({open:/** Borrow the unchanged real connection for fault attribution. */async()=>c.db,failed:/** Retain identity only within this synthetic failure assertion. */(_db,error)=>failures.push(error),unavailableReason:/** Keep the storage owner's unavailable classification explicit. */()=> 'storage-unavailable'},M.sourceRepositoryRuntime());
              IDBObjectStore.prototype.get=/** Throw once at the real ledger request boundary, forwarding every other request unchanged. */function(...args){if(!fired&&this.name===M.SOURCE_LOCAL_KEY_STORE){fired=true;throw injected;}return original.apply(this,args);};
              const before=await V.snapshot(c.db);equal(await r.repairLocalDependencies(c.db,'Owner.md',/** No caller cancellation masks the injected native failure. */()=>true),'quota-exceeded','Native quota reason preserved');ok(fired,'Actual ledger request boundary reached');equal(failures.length,1,'Storage owner notified exactly once');ok(failures[0]===injected,'Original native error identity preserved');
              IDBObjectStore.prototype.get=original;equal(await V.snapshot(c.db),before,'Native failure rolls back its page');r.close();r=null;
              await V.reopen(c);equal(await c.repository.repairLocalDependencies(c.db,'Owner.md',/** The restored journal retry remains live. */()=>true),'ready','Durable quota retry resumes');return await V.finalState(c);
            }finally{IDBObjectStore.prototype.get=original;r?.close();c.cache.close();}
          })()`), true);
        });

      await t.test("native abort leaves the page replayable without crediting a partial cursor",
        /** Abort after an actual count mutation request and verify the native transaction rollback. */async () => {
          assert.equal(await browser.evaluate(`(/** The injected abort never substitutes an IndexedDB request result. */async()=>{
            const M=sourceModules,V=variantContracts,c=await V.journal('variant-abort-${variant.id}',['old','shared'],['new','shared']),original=IDBObjectStore.prototype.delete;let fired=false;
            try{
              IDBObjectStore.prototype.delete=/** Abort only after a genuine ledger delete has been queued. */function(...args){const request=original.apply(this,args);if(!fired&&this.name===M.SOURCE_LOCAL_KEY_STORE){fired=true;this.transaction.abort();}return request;};
              const before=await V.snapshot(c.db),reason=await c.repository.repairLocalDependencies(c.db,'Owner.md',/** Preserve an unowned native abort rather than caller cancellation. */()=>true);ok(fired,'Real ledger mutation queued before native abort');ok(reason!=='ready','Native abort cannot complete the journal');IDBObjectStore.prototype.delete=original;
              await V.reopen(c);equal(await V.snapshot(c.db),before,'Abort credits no count mutation row deletion or cursor');equal(await c.repository.repairLocalDependencies(c.db,'Owner.md',/** Allow the newly opened owner to resume the whole aborted page. */()=>true),'ready','Aborted page retries exactly once');return await V.finalState(c);
            }finally{IDBObjectStore.prototype.delete=original;c.cache.close();}
          })()`), true);
        });

      await t.test("cancellation after a committed page preserves its exact durable continuation",
        /** Stop at the inherited old-count checkpoint, then recover on a newly opened connection. */async () => {
          assert.equal(await browser.evaluate(`(/** Preserve committed-prefix progress instead of rolling it back or replaying it. */async()=>{
            const M=sourceModules,V=variantContracts,c=await V.journal('variant-cancel-${variant.id}',Array(260).fill('shared'),['new','new']);let live=true,r;
            try{
              r=new M.NeutralSourceRepository({open:/** Borrow the real connection while the owned checkpoint controls cancellation. */async()=>c.db,failed:/** Domain cancellation must not invoke storage recovery. */()=>{throw Error('Cancellation poisoned storage');},unavailableReason:/** Retain the normal storage-unavailable fallback. */()=> 'storage-unavailable'},{...M.sourceRepositoryRuntime(),localDependencyCheckpoint:/** Retire the caller immediately after its first committed old page. */phase=>{if(phase==='after-local-old-count-batch')live=false;}});
              equal(await r.repairLocalDependencies(c.db,'Owner.md',/** Expose only the explicitly cancelled caller lifetime. */()=>live),'cancelled','Checkpoint cancellation remains explicit');
              const marker=await value(c.db.transaction(M.SOURCE_LOCAL_REPAIR_STORE).objectStore(M.SOURCE_LOCAL_REPAIR_STORE).get('Owner.md'));equal(marker.fromIndex,256,'Only the first old page commits');equal(marker.toIndex,0,'New phase remains uncredited');equal((await value(c.db.transaction(M.SOURCE_LOCAL_KEY_STORE).objectStore(M.SOURCE_LOCAL_KEY_STORE).get(V.key('shared')))).count,4,'Committed prefix decremented exactly once');r.close();r=null;
              await V.reopen(c);equal(await c.repository.repairLocalDependencies(c.db,'Owner.md',/** A fresh caller owns the persisted continuation. */()=>true),'ready','Cancelled continuation resumes');return await V.finalState(c);
            }finally{r?.close();c.cache.close();}
          })()`), true);
        });
    } finally { await browser.cleanup(); }
  });
