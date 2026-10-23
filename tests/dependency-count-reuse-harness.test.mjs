/**
 * Portable test-only contracts for synthetic dependency workloads and reversible observers.
 * Isolated VM realms protect Node/test prototypes; production IndexedDB behavior is covered by
 * the separate real-browser lane rather than by these small method doubles.
 */
import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { installDependencyCountReuseFixture } from "./support/dependencyCountReuseFixture.mjs";

/** Isolated realm avoids mutating native Node/other test prototypes. */
function realm() {
  const context = vm.createContext({ TextEncoder });
  vm.runInContext(`window={sourceModules:{},value:/** Fixture installation needs no real request in this observer-only realm. */()=>{}};
    IDBObjectStore=class {/** Expose only the store name consumed by operation attribution. */constructor(){this.name='rows';}};
    IDBIndex=class {/** Bind index calls to their observed store. */constructor(){this.objectStore={name:'rows'};}};
    IDBCursor=class {/** Expose the cursor's owning store name for attribution. */constructor(){this.source={name:'rows'};}};
    IDBDatabase=class {};
    for(const name of ['get','getAll','getAllKeys','count','put','add','delete','openCursor','openKeyCursor'])IDBObjectStore.prototype[name]=/** Return an identity-sensitive store result through the installed observer. */function(){return this.name};
    for(const name of ['get','getKey','getAll','getAllKeys','count','openCursor','openKeyCursor'])IDBIndex.prototype[name]=/** Preserve an observable index result while testing wrapper retirement. */function(){return this.objectStore.name};
    IDBCursor.prototype.delete=/** Provide a cursor retirement identity without emulating storage. */function(){};IDBCursor.prototype.continue=/** Provide a cursor traversal identity without scheduling native work. */function(){};
    IDBDatabase.prototype.transaction=/** Supply an exact transaction result for forwarding assertions. */function(){return 'native transaction'};
    (${installDependencyCountReuseFixture.toString()})();`, context);
  return context;
}

test("detailed phase observer restores exact prototypes and nested phases after a rejected repair", /** Exercise nested attribution, rejection and exact independent cleanup in an isolated realm. */async () => {
  const context = realm();
  const result = await vm.runInContext(`(/** Keep all installed prototype wrappers and fault injection within this disposable realm. */async()=>{
    const nativeGet=IDBObjectStore.prototype.get,nativeCount=IDBIndex.prototype.count,nativeTransaction=IDBDatabase.prototype.transaction;
    const repository={
      /** Model an indexed proof operation nested beneath another awaited phase. */async authenticateLocalCountReuse(){new IDBIndex().count();},
      /** Verify attribution returns to staging after the nested proof completes. */async stageLocalDependencies(db,rows){new IDBObjectStore().put(rows[0]);await this.authenticateLocalCountReuse();new IDBObjectStore().get();},
      /** Reject after one request so cleanup is checked on the failure path. */async repairLocalDependencies(){new IDBObjectStore().get();throw new Error('injected repair fault');},
      /** Forward the controlled rejection through an enclosing activation phase. */async activate(){await this.repairLocalDependencies();},
    };
    const originalStage=repository.stageLocalDependencies,originalRepair=repository.repairLocalDependencies;
    const observer=window.dependencyCountReuse.observe(repository);
    let rejected=false;
    try{
      await repository.stageLocalDependencies(null,[{key:'synthetic',index:0}]);
      try{await repository.activate();}catch(error){rejected=error.message==='injected repair fault';}
      new IDBObjectStore().get();new IDBDatabase().transaction(['rows'],'readwrite');
      return {rejected,operations:observer.operations,staging:observer.staging};
    }finally{
      observer.retire();
      if(IDBObjectStore.prototype.get!==nativeGet||IDBIndex.prototype.count!==nativeCount||IDBDatabase.prototype.transaction!==nativeTransaction||repository.stageLocalDependencies!==originalStage||repository.repairLocalDependencies!==originalRepair)throw new Error('Observer leaked wrapped identities');
    }
  })()`, context);
  assert.equal(result.rejected, true);
  assert.equal(result.operations["authentication-proof|index.count|rows"], 1);
  assert.equal(result.operations["membership-staging|get|rows"], 1);
  assert.equal(result.operations["selected-count-repair|get|rows"], 1);
  assert.equal(result.operations["other|get|rows"], 1);
  assert.equal(result.operations["other|transaction:readwrite|rows"], 1);
  assert.equal(result.staging.pages, 1);
  assert.equal(result.staging.records, 1);
});

test("synthetic genuine fact edits preserve projection fields while mixed controls change exact keys", /** Keep semantic fact changes distinct from local membership changes in benchmark inputs. */() => {
  const context = realm();
  const facts = vm.runInContext(`(/** Capture finite synthetic variants without opening storage or a browser. */()=>{const f=window.dependencyCountReuse.facts;return {old:f(0,0),fresh:f(0,1),changed:f(0,1,true),wide:f(0,1,false,true)}})()`, context);
  assert.notEqual(facts.old.metadata[0].value, facts.fresh.metadata[0].value);
  assert.equal(facts.old.resolution[0].target, facts.fresh.resolution[0].target);
  assert.notEqual(facts.old.resolution[0].count, facts.fresh.resolution[0].count);
  assert.equal(facts.old.resolution.length, facts.changed.resolution.length);
  assert.notEqual(facts.old.resolution[0].target, facts.changed.resolution[0].target);
  assert.ok(facts.wide.resolution[0].target.length > 2400);
});

test("late negative control changes only the final resolved host fact after the same long prefix", /** Prove the unfavorable zero-hit control preserves its long common membership prefix. */() => {
  const context = realm();
  const facts = vm.runInContext(`(/** Capture equal-length variants differing only at the final resolved target. */()=>{const f=window.dependencyCountReuse.facts;return {fresh:f(0,1),late:f(0,1,'late')}})()`, context);
  assert.deepEqual(facts.late.metadata, facts.fresh.metadata);
  assert.deepEqual(facts.late["body-urls"], facts.fresh["body-urls"]);
  assert.deepEqual(facts.late.values, facts.fresh.values);
  assert.deepEqual(facts.late.resolution.slice(0, -1), facts.fresh.resolution.slice(0, -1));
  assert.notEqual(facts.late.resolution.at(-1).target, facts.fresh.resolution.at(-1).target);
  assert.equal(JSON.stringify({ ...facts.late.resolution.at(-1), target: facts.fresh.resolution.at(-1).target }), JSON.stringify(facts.fresh.resolution.at(-1)));
});
