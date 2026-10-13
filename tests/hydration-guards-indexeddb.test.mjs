/**
 * Hydration lifetime/value/publication regressions through the production index and real Chromium
 * IndexedDB. Only explicit reentry/await holds are injected; snapshot decoding, graph semantics and
 * cancellation ownership remain production behavior. Every fixture and wrapper is retired on failure.
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { chromiumHarness } from './support/browserTypeScript.mjs';
import { hydrationWorkBundle, contributorBrowserInitialize, initializeHydrationWork } from './support/hydrationWorkFixture.mjs';

const bundle = await hydrationWorkBundle();

/** Run independent actual-IDB cases in one browser, with bounded waits that cannot hide a leaked task. */
test('hydration guards retain policy/lifetime/physical fences while removing per-record signatures', async t => {
  const browser = await chromiumHarness(bundle);
  try {
    assert.equal(await browser.evaluate(contributorBrowserInitialize), true);
    assert.equal(await browser.evaluate(initializeHydrationWork), true);
    assert.equal(await browser.evaluate(String.raw`(() => {
      /** Limit a public wait without releasing the deliberately held storage operation. */
      window.hydrationDeadline=(promise,label)=>{
        let timer;return Promise.race([promise,new Promise((_,reject)=>timer=setTimeout(()=>reject(Error(label+' remained pending')),3000))]).finally(()=>clearTimeout(timer));
      };
      /** Pause the real reader's open await once, retaining its original continuation/receiver. */
      window.holdHydrationOpen=(index,phase)=>{
        const owner=index.indexedDb,original=owner.open;
        let enter,release,held=false;
        const entered=new Promise(resolve=>enter=resolve),gate=new Promise(resolve=>release=resolve);
        owner.open=async function(...args){
          const result=await original.apply(this,args);
          if(!held && index.getSnapshotHydrationDiagnostics().phase===phase){held=true;enter();await gate;}
          return result;
        };
        return {entered,release,restore(){owner.open=original;release();}};
      };
      return true;
    })()`), true);

    for (const records of [256, 1024, 4096]) {
      await t.test(`current chunked ${records}-record graph preserves ordered semantics with bounded signature work`, async () => {
        const result=await browser.evaluate(`(async()=>{
          const f=await hydrationWorkFixture('guards-work-${records}',${records},256);
          const probe=sourceModules.installHydrationWorkProbe(()=>performance.now(),()=>f.index.getSnapshotHydrationDiagnostics().phase);
          try {
            const expected=hydrationWorkValue({state:f.state});
            ok((await f.index.restoreIndexedDbSnapshot(['Hub.md'])).restored,'Preview');
            ok((await f.index.waitForSnapshotHydration()).restored,'Full graph');
            const phases=probe.snapshot();probe.restore();
            equal(hydrationWorkValue(f.index),expected,'Exact ordered roles, direction and provenance');
            equal(f.f.reads.length,0,'Warm body reads');equal(f.f.parses.length,0,'Warm parses');
            return {records:${records},phases};
          } finally {probe.restore();f.close();}
        })()`);
        // Notifications occur every 256 records; storage batches/yields add full checks. This bound
        // detects per-record serialization without asserting scheduler-dependent exact call counts.
        for (const phase of ['pages','relations','evidence']) {
          assert.ok(result.phases[phase].calls < records / 8, `${phase}: ${JSON.stringify(result.phases[phase])}`);
        }
      });
    }

    for (const mutation of ['in-place','replacement','observed-ABA','invalidate-ABA','unload','purge','supersede','physical-replacement','membership']) {
      await t.test(`${mutation} during a real storage await rejects late hydration`, async () => {
        assert.equal(await browser.evaluate(`(async()=>{
          const f=await hydrationWorkFixture('guards-await-${mutation}',512,128),index=f.index;
          const hold=holdHydrationOpen(index,'pages');let fullGuard;
          const iterate=index.indexedDb.iterateSnapshotPages;
          index.indexedDb.iterateSnapshotPages=function(meta,visit,current,...args){fullGuard=current;return iterate.call(this,meta,visit,current,...args);};
          try {
            const restore=index.restoreIndexedDbSnapshot(['Hub.md']);
            await hydrationDeadline(hold.entered,'Storage hold');
            const state=index.state,revision=index.publicationRevision,waiting=index.waitForSnapshotHydration();
            const mutation='${mutation}';
            if(mutation==='in-place') f.settings.hierarchy.parents.push('Changed');
            if(mutation==='replacement') f.plugin.settings={...f.settings,inverseInfer:true};
            if(mutation==='observed-ABA'){
              f.settings.hierarchy.parents.push('Changed');equal(fullGuard(),false,'Observe changed policy');
              f.settings.hierarchy.parents.pop();equal(fullGuard(),false,'Retired value lifetime cannot revive');
            }
            if(mutation==='invalidate-ABA'){
              f.settings.hierarchy.parents.push('Changed');index.invalidateSemanticPolicy();f.settings.hierarchy.parents.pop();
            }
            if(mutation==='unload') index.destroy();
            if(mutation==='purge') await index.purgePersistentIndexCache();
            if(mutation==='supersede') index.publishRestoredState(state,null,true,false);
            if(mutation==='physical-replacement'){
              const replacement=new ContributorFile(f.file.path);replacement.stat={...f.file.stat};replacement.parent=f.file.parent;
              f.f.files.set(f.file.path,replacement);
            }
            if(mutation==='membership') f.f.add('Added.md','');
            const retiredState=index.state;
            if(['invalidate-ABA','unload','purge'].includes(mutation)){
              equal((await hydrationDeadline(waiting,'Cancelled public hydration')).restored,false,'Public wait settles before storage resumes');
            }
            hold.release();
            await hydrationDeadline(restore,'Initial restore');
            equal((await hydrationDeadline(waiting,'Late hydration')).restored,false,'Captured generation rejected');
            equal(index.state===retiredState,true,'Late private records do not replace visible graph or unloaded state');
            equal(index.publicationRevision,revision+(mutation==='supersede'?1:0),'No late publication');
            equal(index.fullSnapshotHydrated,false,'Rejected generation is not complete');
            equal(f.f.reads.length,0,'No fallback body scan');equal(f.f.parses.length,0,'No fallback parser');
            return true;
          } finally {index.indexedDb.iterateSnapshotPages=iterate;hold.restore();f.close();}
        })()`), true);
      });
    }

    for (const phase of ['pages','relations','evidence']) {
      await t.test(`${phase} transaction completion revalidates settings before decoding returned chunks`, async () => {
        assert.equal(await browser.evaluate(`(async()=>{
          const f=await hydrationWorkFixture('guards-transaction-${phase}',1024,128),index=f.index;
          const owner=index.indexedDb,open=owner.openTransaction;
          let enter,release,held=false;
          const entered=new Promise(resolve=>enter=resolve),gate=new Promise(resolve=>release=resolve);
          const native=Object.getOwnPropertyDescriptor(IDBTransaction.prototype,'oncomplete');
          owner.openTransaction=function(...args){
            const tx=open.apply(this,args);
            if(!held && index.getSnapshotHydrationDiagnostics().phase==='${phase}' && args[1]==='snapshotChunks'){
              held=true;
              // Retain the actual transaction/request results. Only completion delivery is paused,
              // so the production reader must validate its values after transactionDone awaits.
              Object.defineProperty(tx,'oncomplete',{configurable:true,get(){return native.get.call(this);},set(callback){
                native.set.call(this,function(event){enter();gate.then(()=>callback.call(tx,event));});
              }});
            }
            return tx;
          };
          try {
            const restore=index.restoreIndexedDbSnapshot(['Hub.md']);
            await hydrationDeadline(entered,'Transaction completion hold');
            const state=index.state,revision=index.publicationRevision,processed=index.getSnapshotHydrationDiagnostics()['${phase}'];
            f.settings.hierarchy.parents.push('Changed');release();await restore;
            equal((await index.waitForSnapshotHydration()).restored,false,'Returned transaction cannot adopt old policy');
            equal(index.getSnapshotHydrationDiagnostics()['${phase}'],processed,'No returned stale record decoded');
            equal(index.state===state,true,'No stale graph publication');equal(index.publicationRevision,revision,'Revision retained');
            return true;
          } finally {owner.openTransaction=open;release?.();f.close();}
        })()`), true);
      });
    }

    for (const phase of ['pages','relations','evidence','promote']) {
      await t.test(`${phase} progress reentry cannot publish the captured policy after an in-place edit`, async () => {
        assert.equal(await browser.evaluate(`(async()=>{
          const f=await hydrationWorkFixture('guards-progress-${phase}',1024,128),index=f.index;let changed=false,visible,revision,notificationPhase;
          // The phase owner receives the new phase before the index's passive diagnostic mirror.
          f.plugin.startupDiagnostics={phase:(_,phase)=>notificationPhase=phase,count(){},processed(){},mark(){}};
          f.plugin.notifyStartupProgress=()=>{
            const d=index.getSnapshotHydrationDiagnostics();
            if(!changed && notificationPhase==='${phase}' && ('${phase}'==='promote' || d['${phase}']>=256)){
              changed=true;visible=index.state;revision=index.publicationRevision;f.settings.hierarchy.parents.push('Changed');
            }
          };
          try {
            await index.restoreIndexedDbSnapshot(['Hub.md']);
            equal((await index.waitForSnapshotHydration()).restored,false,'Policy edit rejects promotion');
            ok(changed,'Actual progress callback exercised');equal(index.state===visible,true,'Retain published generation');
            equal(index.publicationRevision,revision,'No late promotion');equal(index.fullSnapshotHydrated,false,'Not complete');
            return true;
          } finally {f.plugin.notifyStartupProgress=undefined;f.close();}
        })()`), true);
      });
    }

    await t.test('legacy cursors retain full value validation on each host continuation', async () => {
      assert.equal(await browser.evaluate(String.raw`(async()=>{
        const f=await fixture('guards-legacy'),generation='legacy';let changed=false,calls=0,visits=0;
        try {
          const db=await f.cache.open();
          await edit(db,['pages'],tx=>{for(let n=0;n<3;n++)tx.objectStore('pages').put({generation,path:'P'+n,value:{path:'P'+n}});});
          const current=()=>{calls++;return !changed;};
          const okRead=await f.cache.iterateSnapshotPages({schema:2,generation},()=>{visits++;changed=true;},current,undefined,()=>true);
          equal(okRead,false,'Legacy full guard survives an independently cheap record capability');
          equal(visits,1,'Next cursor callback cannot use retired policy');ok(calls>=2,'Full value checks on host callbacks');
          return true;
        } finally {f.close();}
      })()`), true);
    });
  } finally { await browser.cleanup(); }
});
