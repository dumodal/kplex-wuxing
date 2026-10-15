/** Optional graph/source receipts through canonical compilation, actual storage and fresh-content validation. */
import assert from "node:assert/strict";
import test from "node:test";
import { contributorBrowserBundle, contributorBrowserInitialize } from "./support/contributorBrowserFixture.mjs";
import { chromiumHarness } from "./support/browserTypeScript.mjs";
import { centerGateSettings } from "./support/requestedCenterGateFixture.mjs";

const bundle = await contributorBrowserBundle(["src/index/GraphIndex.ts", "src/index/GraphBuilder.ts", "src/index/IndexSnapshot.ts", "src/index/SnapshotReceiptHasher.ts"]);

/** Construct real saved generations; only Obsidian file/cache/event inputs are doubled. */
const initialize = `(${async function initializeReceiptFixture() {
  window.centerGateSettings = CENTER_SETTINGS;
  /** Each test owns its exact database and source/graph lifetimes. */
  window.receiptFixture = async function receiptFixture(name) {
    const M=sourceModules,f=await fixture(name);let index,release,host=0;
    f.add('A.md','Friends:: [[B]]\nType:: Original');f.add('B.md','');
    f.app.vault.getName=/** Select this disposable browser fixture's existing source database. */ ()=>name;
    f.app.vault.getAbstractFileByPath=/** Preserve normal root/file binding in the canonical builder. */ path=>f.files.get(path)??(path===''||path==='/'?f.app.vault.getRoot():null);
    const settings=centerGateSettings({indexingMode:'eager',hierarchy:{hidden:[],parents:[],children:[],leftFriends:['Friends'],rightFriends:[],previous:[],next:[]},
      inferAllLinksAsFriends:false,inverseInfer:false,showFullTagName:true,tagStyleList:[],maxLabelLength:30,lastActivePath:'A.md',pinnedNodes:[]});
    /** Create the actual GraphIndex without replacing its source/repository/compiler owners. */
    function create() {
      const next=new M.GraphIndex({app:f.app,settings,getIndexSourceRevision:/** Observe this test's real host wave epoch. */ ()=>host},f.app);
      next.scheduleOrphanCleanup=/** Keep unrelated delayed orphan sweeping out of short fixtures. */ ()=>{};
      return next;
    }
    return {f,settings,
      /** Expose the current native production owner for assertions and fault injection. */
      get index(){return index;},
      /** A necessary canonical full compilation/save produces the first optional receipt. */
      async mint(requireReceipt=true){
        await f.acquire();ok(await f.acquisition.reconcile(),'Seed real source closure');f.acquisition.close();
        index=create();ok(await index.rebuild({validateSnapshotSources:true}),'Canonical full graph compilation');
        index.cancelPendingPersistence();ok(await index.persistIndexedDbSnapshot(index.snapshotPersistGeneration),'Complete generation activates');
        const meta=await index.indexedDb.readSnapshotMeta();
        if(requireReceipt){ok(meta?.sourceReceipt,'Necessary complete save includes optional source proof');
          ok(await index.indexedDb.readSnapshotSourceReceipt(meta,()=>true),'Stored metadata binding authenticates');}return meta;
      },
      /** Deliver an unchanged host event at a real read boundary, then hydrate actual stored chunks. */
      async restart(wave=true,expectFull=true){
        release?.();release=null;index?.destroy();index=create();
        if(wave){const pages=index.indexedDb.iterateSnapshotPages.bind(index.indexedDb);let delivered=false;
          index.indexedDb.iterateSnapshotPages=/** Preserve all real storage callbacks/guards and inject only the host event. */ async(...args)=>{
            if(!delivered){delivered=true;host++;f.app.metadataCache.trigger('resolved');}return pages(...args);
          };}
        release=index.acquireSemanticDemand('A.md');ok((await index.restorePersistedSnapshot(['A.md'])).restored,'Requested saved graph restores');
        if(index.hasPendingSnapshotHydration()){const result=await index.waitForSnapshotHydration();if(expectFull)ok(result.restored,'Complete hydration authenticates');}
        return index;
      },
      /** Independently retire source events, scheduled persistence, parser and database handles. */
      close(){release?.();index?.destroy();f.close();},
    };
  };
  return true;
}.toString().replace('CENTER_SETTINGS', centerGateSettings.toString())})()`;

/** An unchanged resolver wave must retain the exact complete graph through genuine authority closure. */
test("optional receipt retains unchanged graph without compilation, catalog replay or snapshot rewrite", async () => {
  const browser=await chromiumHarness(bundle);
  try {
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);
    assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Exercise the complete production receipt lifecycle. */ async()=>{
      const t=await receiptFixture('receipt-unchanged');
      try {
        const saved=await t.mint(),index=await t.restart();
        const state=index.state,revision=index.publicationRevision;
        index.rebuild=/** Any full compilation would violate unchanged receipt retention. */ ()=>{throw Error('Unnecessary full build');};
        index.indexedDb.writeSnapshot=/** The hydrated complete generation must not be rewritten. */ ()=>{throw Error('Equivalent snapshot save');};
        equal(await index.retainValidatedStartupSnapshot(()=>7),7,'Exact covered backlog revision returns');
        ok(index.state===state,'Graph identity retained');equal(index.publicationRevision,revision,'No semantic publication');
        ok(!index.sourceBackedSemantics&&!index.hasPendingSemanticPreparation(),'Current full semantics certified');
        ok(index.get('A.md').neighbours.get('B.md')?.isLeftFriend,'Canonical relationship preserved');
        equal((await index.indexedDb.readSnapshotMeta()).generation,saved.generation,'Complete generation unchanged');
        equal(index.getSemanticPreparationDiagnostics().fullBuilds,0,'No full build');
        ok(index.getSourceAcquisitionCounters().vaultReads>=2,'Actual content reads are counted, not hidden');
        t.f.app.metadataCache.trigger('resolved');
        equal(await index.retainValidatedStartupSnapshot(()=>8),8,'A later genuine unchanged wave revalidates without a build');
        ok(index.state===state,'Repeated wave retains the original graph');equal(index.publicationRevision,revision,'Repeated wave has no publication');return true;
      }finally{t.close();}
    })()`),true);
  } finally {await browser.cleanup();}
});

/** A quiet host must not grant legacy physical-stat authority before the receipt's raw-content proof. */
test("receipt keeps a quiet-host graph cached until genuine source validation",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Exercise a real complete receipt with no synthetic host event. */ async()=>{
      const t=await receiptFixture('receipt-quiet-authority');
      try{
        await t.mint();const index=await t.restart(false),state=index.state,revision=index.publicationRevision;
        ok(!index.fullSnapshotFresh,'Physical statistics alone cannot complete receipt authority');
        ok(index.sourceBackedSemantics,'Restored graph stays cached presentation before source proof');
        equal(await index.retainValidatedStartupSnapshot(),0,'Unchanged source inputs earn authority');
        ok(index.fullSnapshotFresh&&!index.sourceBackedSemantics,'Only completed validation promotes the graph');
        ok(index.state===state,'Validation preserves graph identity');equal(index.publicationRevision,revision,'No extra publication');
        return true;
      }finally{t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** Native file enumeration is not a semantic revision or a stable commitment order. */
test("receipt survives changed Markdown enumeration without changing compiler or inventory order",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Change only the host's ordinary file-array order after a genuine save. */ async()=>{
      const t=await receiptFixture('receipt-order-restart');
      try{
        await t.mint();const files=t.f.app.vault.getMarkdownFiles.bind(t.f.app.vault);
        t.f.app.vault.getMarkdownFiles=/** Native restart may enumerate the same owners in another order. */ ()=>files().reverse();
        const index=await t.restart(false),state=index.state,revision=index.publicationRevision;
        equal(await index.retainValidatedStartupSnapshot(),0,'Identical canonical per-owner inputs remain eligible');
        ok(index.state===state,'Exact graph preserved');equal(index.publicationRevision,revision,'No semantic publication');return true;
      }finally{t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** Compilation and source validation may enumerate identical owners independently. */
test("receipt creation cross-checks compiler inputs by owner despite a changed enumeration order",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Preserve the actual compiler while changing its host input order. */ async()=>{
      const t=await receiptFixture('receipt-order-compile'),prototype=sourceModules.GraphBuilder.prototype,build=prototype.build;
      try{
        const files=t.f.app.vault.getMarkdownFiles.bind(t.f.app.vault);
        prototype.build=/** No compiler behavior or facts are mocked. */ function(...args){
          t.f.app.vault.getMarkdownFiles=/** Only host enumeration changes; the compiler stays canonical. */ ()=>files().reverse();return build.apply(this,args);
        };
        ok((await t.mint()).sourceReceipt,'Actual matching source/compiler inputs earn a canonical receipt');
        prototype.build=build;
        const index=await t.restart(false);equal(await index.retainValidatedStartupSnapshot(),0,'Stored receipt validates');return true;
      }finally{prototype.build=build;t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** A valid legacy body-cache record is not proof that the graph used the selected neutral source. */
test("receipt creation refuses different canonical compiler inputs under unchanged source heads",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Change actual legacy-cache input only after authenticated source closure. */ async()=>{
      const t=await receiptFixture('receipt-compiler-input-mismatch'),prototype=sourceModules.GraphBuilder.prototype,build=prototype.build;
      try{
        prototype.build=/** Run the real compiler against a different valid parser-cache body. */ async function(...args){
          const file=t.f.files.get('A.md'),body=await this.metadataParser.parse('Friends:: [[B]]\\nType:: Different');
          ok(await this.bodyCache.putBody(file.path,file.stat.mtime,body),'Independent body cache write succeeds');
          return build.apply(this,args);
        };
        const saved=await t.mint(false);
        equal(t.index.get('A.md').noteType,'Different','Canonical compiler actually consumed the changed cache input');
        ok(!saved.sourceReceipt,'Unchanged heads cannot certify a graph compiled from different inputs');return true;
      }finally{prototype.build=build;t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** Actual unobserved content changes must retire the receipt and repair the stale body input. */
for(const staleCache of [false,true]){
test(`receipt refuses offline same-stat semantic edit and repairs the actual source owner${staleCache?' with stale cachedRead':''}`, async () => {
  const browser=await chromiumHarness(bundle);
  try {
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Change content without changing stats or delivering any file event. */ async()=>{
      const t=await receiptFixture('receipt-offline-same-stat-${staleCache}');
      try {
        await t.mint();const before=await t.f.repository.inspect('A.md',[]);
        if(${staleCache})t.f.app.vault.cachedRead=/** Model a still-valid stat-keyed host read cache while read() sees actual bytes. */ async file=>file.path==='A.md'?'Friends:: [[B]]\\nType:: Original':t.f.texts.get(file.path);
        t.f.texts.set('A.md','Friends:: [[B]]\\nType:: Changed');const index=await t.restart();
        equal(await index.retainValidatedStartupSnapshot(),null,'Same-stat source inputs cannot retain the receipt');
        ok(await index.sourceAcquisition.flush(),'Actual source repair closes');
        const after=await index.indexedDb.sources.inspect('A.md',[]);
        ok(after.head.sourceRevision!==before.head.sourceRevision,'Canonical source identity/revision changes');
        const body=await index.sourceAcquisition.readBody(t.f.files.get('A.md'));
        ok(JSON.stringify(body).includes('Changed'),'Repaired durable input contains the real content');return true;
      }finally{t.close();}
    })()`),true);
  } finally {await browser.cleanup();}
});
}

/** Optional malformed/unknown fields preserve normal snapshot readability while refusing reuse. */
for(const mode of ['absent','unknown','wrong-generation','wrong-binding']){
  test(`optional receipt ${mode} keeps conservative legacy validation`,async()=>{
    const browser=await chromiumHarness(bundle);
    try{
      assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
      assert.equal(await browser.evaluate(`(/** Change only optional metadata through a real transaction. */ async()=>{
        const t=await receiptFixture('receipt-legacy-${mode}');
        try {
          const meta=await t.mint(),db=await t.index.indexedDb.open();
          if('${mode}'==='absent')delete meta.sourceReceipt;
          if('${mode}'==='unknown')meta.sourceReceipt.version=999;
          if('${mode}'==='wrong-generation')meta.sourceReceipt.generation='unrelated-generation';
          if('${mode}'==='wrong-binding')meta.sourceReceipt.binding='0'.repeat(64);
          await edit(db,['meta'],tx=>tx.objectStore('meta').put(meta));
          const index=await t.restart(false);ok(index.isFullSnapshotHydrated(),'Readable legacy graph survives '+JSON.stringify(index.getSnapshotHydrationDiagnostics()));
          equal(await index.retainValidatedStartupSnapshot(),null,'Optional uncertainty grants no retention proof');return true;
        }finally{t.close();}
      })()`),true);
    }finally{await browser.cleanup();}
  });
}

/** Metadata with a valid version/binding cannot authenticate corrupted actual graph payloads. */
for(const kind of ['pages','evidence']){
  test(`receipt rejects corrupted ${kind} chunks before complete authority`,async()=>{
    const browser=await chromiumHarness(bundle);
    try{
      assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
      assert.equal(await browser.evaluate(`(/** Mutate a structurally valid selected record in its actual chunk. */ async()=>{
        const t=await receiptFixture('receipt-corrupt-${kind}');
        try{
          const meta=await t.mint(),db=await t.index.indexedDb.open();
          const chunk=await value(db.transaction('snapshotChunks').objectStore('snapshotChunks').get([meta.generation,'${kind}',0]));
          ok(chunk?.values.length,'Genuine nonempty selected payload');
          if('${kind}'==='pages')chunk.values[0].name='Corrupted graph payload';else chunk.values[0].definition='Corrupted evidence payload';
          await edit(db,['snapshotChunks'],tx=>tx.objectStore('snapshotChunks').put(chunk));
          const index=await t.restart(true,false);
          equal(await index.retainValidatedStartupSnapshot(),null,'Corruption cannot certify the graph');
          ok(!index.isFullSnapshotHydrated(),'Corrupt generation never receives complete hydration authority');return true;
        }finally{t.close();}
      })()`),true);
    }finally{await browser.cleanup();}
  });
}

/** A settings registry can change and return between compiler boundaries without a host event. */
test("receipt creation refuses actual Date registry ABA observed inside canonical compilation",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Gate the actual Date-producing collector, keeping fingerprints and final state unchanged. */ async()=>{
      const t=await receiptFixture('receipt-date-aba'),prototype=sourceModules.GraphBuilder.prototype,original=prototype.collectMetadataSources;
      let observed=false;
      try{
        t.f.metadata.get('A.md').frontmatter.When='2026-10-01';
        prototype.collectMetadataSources=/** The canonical collector really sees the temporary Date classification. */ async function(...args){
          const file=args[1];if(file.path!=='A.md')return original.apply(this,args);
          t.f.app.dateFields.add('When');observed=true;
          try{return await original.apply(this,args);}finally{t.f.app.dateFields.delete('When');}
        };
        const meta=await t.mint(false);ok(observed,'Actual canonical collector exercised Date ABA');
        ok(!meta.sourceReceipt,'Observed environment drift cannot certify the complete generation');return true;
      }finally{prototype.collectMetadataSources=original;t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** Stable Date/Daily Notes inputs must remain eligible, rather than rejecting every Date-backed graph. */
test("receipt retains a canonical graph with ordinary Date properties",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Compile actual Date evidence, then validate the exact unchanged source environment. */ async()=>{
      const t=await receiptFixture('receipt-stable-date');
      try{
        t.f.metadata.get('A.md').frontmatter.When='2026-10-01';t.f.app.dateFields.add('When');
        await t.mint();const index=await t.restart();
        equal(await index.retainValidatedStartupSnapshot(),0,'Unchanged real Date inputs remain eligible');
        ok(index.get('A.md'),'Original canonical source remains');return true;
      }finally{t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** Once an existing proof observes drift, later equality must not revive that same capability. */
test("completed receipt source lifetime cannot revive after an environment guard observes ABA",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Observe real host classification through the completed native source guard. */ async()=>{
      const t=await receiptFixture('receipt-observed-guard-aba');
      try{
        t.f.metadata.get('A.md').frontmatter.When='2026-10-01';await t.mint();
        const proof=t.index.compiledSnapshotSourceProof.proof;ok(proof.isCurrent(),'Genuine complete source lifetime starts current');
        t.f.app.dateFields.add('When');equal(proof.isCurrent(),false,'Changed environment retires the lifetime');
        t.f.app.dateFields.delete('When');equal(proof.isCurrent(),false,'That same observed-invalid lifetime never revives');return true;
      }finally{t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** Daily Notes can also change without a source notification and return before the final guard. */
test("receipt creation latches actual Daily Notes ABA during canonical compilation",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Let the real Date collector consume another Daily Notes folder. */ async()=>{
      const t=await receiptFixture('receipt-daily-aba'),prototype=sourceModules.GraphBuilder.prototype,original=prototype.collectMetadataSources;
      try{
        t.f.metadata.get('A.md').frontmatter.When='2026-10-01';t.f.app.dateFields.add('When');
        prototype.collectMetadataSources=/** Actual producer reads must be checked, not only endpoint configuration. */ async function(...args){
          if(args[1].path!=='A.md')return original.apply(this,args);
          const folder=t.f.app.daily.folder;t.f.app.daily.folder='Other daily';
          try{return await original.apply(this,args);}finally{t.f.app.daily.folder=folder;}
        };
        ok(!(await t.mint(false)).sourceReceipt,'Daily Notes ABA cannot mint optional proof');return true;
      }finally{prototype.collectMetadataSources=original;t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** Actual source/lifecycle changes after a native read starts cannot revive an older receipt. */
for(const action of ['modify','rename','recreate','policy-aba','unload']){
  test(`receipt rejects ${action} during fresh-content validation`,async()=>{
    const browser=await chromiumHarness(bundle);
    try{
      assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
      assert.equal(await browser.evaluate(`(/** Hold one actual content result while the real owning event invalidates it. */ async()=>{
        const t=await receiptFixture('receipt-race-${action}');let unblock,entered;
        const gate=new Promise(resolve=>{unblock=resolve}),reached=new Promise(resolve=>{entered=resolve});
        const read=t.f.app.vault.read;let held=false;
        try{
          await t.mint();
          t.f.app.vault.read=/** Preserve the actual content result; delay only its delivery for a deterministic race. */ async function(file){
            const text=await read.call(this,file);if(!held&&file.path==='A.md'){held=true;entered();await gate;}return text;
          };
          const index=await t.restart(),retention=index.retainValidatedStartupSnapshot();await reached;
          const file=t.f.files.get('A.md');
          if('${action}'==='modify'){t.f.texts.set('A.md','Friends:: [[B]]\\nType:: Changed');t.f.app.vault.trigger('modify',file);}
          if('${action}'==='rename'){
            const cache=t.f.metadata.get('A.md'),text=t.f.texts.get('A.md');t.f.files.delete('A.md');t.f.metadata.delete('A.md');t.f.texts.delete('A.md');
            file.path='Moved.md';file.name='Moved.md';file.basename='Moved';t.f.files.set(file.path,file);t.f.metadata.set(file.path,cache);t.f.texts.set(file.path,text);
            t.f.app.vault.trigger('rename',file,'A.md');
          }
          if('${action}'==='recreate'){
            t.f.files.delete('A.md');t.f.app.vault.trigger('delete',file);
            const replacement=t.f.add('A.md','Friends:: [[B]]\\nType:: Replacement');t.f.app.vault.trigger('create',replacement);
          }
          if('${action}'==='policy-aba'){
            t.settings.noteTypeField='Other';index.invalidateSemanticPolicy();t.settings.noteTypeField='Type';index.invalidateSemanticPolicy();
          }
          if('${action}'==='unload')index.destroy();
          unblock();equal(await retention,null,'Superseded content cannot certify the old graph');
          if('${action}'!=='unload')ok(!index.retainedSnapshotSourceProof,'No older completed proof is revived');
          return true;
        }finally{unblock?.();t.f.app.vault.read=read;t.close();}
      })()`),true);
    }finally{await browser.cleanup();}
  });
}

/** Ineligible notes refuse the optimization before scanning any fresh body or disturbing source cache. */
test("oversized receipt input keeps legacy behavior without fresh-content scan or cache purge",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Declare a larger native note before a necessary ordinary full compilation. */ async()=>{
      const t=await receiptFixture('receipt-size-fallback');
      try{
        t.f.files.get('A.md').stat.size=256*1024;
        const meta=await t.mint(false);ok(!meta.sourceReceipt,'Unsupported content bound adds no receipt');
        equal(t.index.getSourceAcquisitionCounters().vaultReads,0,'No fresh validation scan just to create optional format');
        ok((await t.index.indexedDb.sources.inspect('A.md',[])).saved,'Existing source head survives');
        ok(await t.index.indexedDb.readSnapshotMeta(),'Normal complete snapshot survives');return true;
      }finally{t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** Optional proof cannot retain an unbounded configured semantic descriptor. */
test("oversized receipt policy keeps the normal canonical snapshot without optional proof",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** A large real compiler policy remains supported outside the narrower receipt capability. */ async()=>{
      const t=await receiptFixture('receipt-policy-size');
      try{
        t.settings.hierarchy.leftFriends=['Friends',...Array.from({length:10000},(_,index)=>'Configured relationship '+index)];
        const meta=await t.mint(false);
        ok(meta.settingsSignature.length*2>64*1024,'Actual configured descriptor exceeds the proof bound');
        ok(!meta.sourceReceipt,'Large policy gets no optional receipt');
        ok(t.index.get('A.md').neighbours.get('B.md')?.isLeftFriend,'Normal canonical compiler policy remains supported');return true;
      }finally{t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** Another connection can replace equivalent facts without notifying this GraphIndex's host lifetime. */
test("receipt activation refuses an independently changed source sequence while preserving the ordinary save",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Race a real second source writer at an existing snapshot write checkpoint. */ async()=>{
      const t=await receiptFixture('receipt-independent-activation');let other,checkpoint;
      try{
        const original=await t.mint(),index=t.index,cache=index.indexedDb;
        other=await fixture('receipt-independent-activation');other.add('A.md','Friends:: [[B]]\\nType:: Original');other.add('B.md','');other.acquisition.start();
        checkpoint=cache.backgroundCheckpoint;let changed=false;
        cache.backgroundCheckpoint=/** Write new genuine source identity/revision, not a simulated result. */ async()=>{
          await checkpoint?.();if(changed)return;changed=true;
          other.app.vault.trigger('modify',other.files.get('A.md'));await other.acquire();ok(await other.acquisition.flush(),'Second writer closes');
        };
        index.cancelPendingPersistence();ok(await index.persistIndexedDbSnapshot(index.snapshotPersistGeneration),'Normal complete graph save still activates');
        const active=await cache.readSnapshotMeta();ok(changed,'Independent writer really ran');
        ok(active.generation!==original.generation,'Ordinary save remains backward compatible');
        ok(!active.sourceReceipt,'Changed activation sequence cannot stamp the older graph');return true;
      }finally{if(t.index)t.index.indexedDb.backgroundCheckpoint=checkpoint;other?.close();t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** Exact selected identities/revisions are committed even if a replacement cache reuses a sequence. */
test("receipt rejects replaced source identities when the global sequence is reused",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Preserve valid immutable family payloads while recreating an equivalent selected head. */ async()=>{
      const t=await receiptFixture('receipt-source-sequence-aba');let other;
      try{
        const meta=await t.mint(),before=await t.index.indexedDb.sources.snapshotSelection(()=>true);
        other=await fixture('receipt-source-sequence-aba');other.add('A.md','Friends:: [[B]]\\nType:: Original');other.add('B.md','');other.acquisition.start();
        other.app.vault.trigger('modify',other.files.get('A.md'));await other.acquire();ok(await other.acquisition.flush(),'Replacement really activates');
        const db=await other.cache.open(),head=(await other.repository.inspect('A.md',[])).head;
        head.sequence=meta.sourceReceipt.source.sequence;
        await edit(db,['meta','sourceHeads'],tx=>{tx.objectStore('meta').put({key:'source-sequence',value:meta.sourceReceipt.source.sequence});tx.objectStore('sourceHeads').put(head);});
        const after=await t.index.indexedDb.sources.snapshotSelection(()=>true);
        equal(before.sequence,after.sequence,'Sequence deliberately reused');
        ok(before.heads.sha256!==after.heads.sha256,'Actual identity/revision digest differs');
        const index=await t.restart();equal(await index.retainValidatedStartupSnapshot(),null,'Sequence ABA cannot retain the old receipt');return true;
      }finally{other?.close();t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** Cancellation at the actual metadata activation transaction preserves the previous complete generation. */
test("interrupted receipt activation preserves the prior snapshot without deleting source payloads",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Retire the real writer after staging, at its native metadata transaction boundary. */ async()=>{
      const t=await receiptFixture('receipt-interrupted-save');let open;
      try{
        const original=await t.mint(),index=t.index,cache=index.indexedDb;open=cache.openTransaction;
        let staged=false,interrupted=false;
        cache.openTransaction=/** Preserve actual transactions and cancel only this caller's publication lifetime. */ function(db,stores,mode){
          const transaction=open.call(this,db,stores,mode);
          if(mode==='readwrite'&&Array.isArray(stores)&&stores.includes('snapshotChunks'))staged=true;
          if(staged&&!interrupted&&stores==='meta'&&mode==='readwrite'){interrupted=true;index.cancelPendingPersistence();}
          return transaction;
        };
        const run=index.snapshotPersistGeneration;
        equal(await index.persistIndexedDbSnapshot(run),false,'Retired writer cannot complete publication');
        ok(staged&&interrupted,'Actual staged payload/metadata activation boundary exercised');
        equal((await cache.readSnapshotMeta()).generation,original.generation,'Prior complete generation remains active');
        ok((await cache.sources.inspect('A.md',[])).saved,'Selected source facts survive interruption');return true;
      }finally{if(t.index&&open)t.index.indexedDb.openTransaction=open;t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** Receipt use cannot turn On-demand mode into a global source/graph verification strategy. */
test("On-demand strategy declines full snapshot receipt verification",async()=>{
  const browser=await chromiumHarness(bundle);
  try{
    assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
    assert.equal(await browser.evaluate(`(/** Switch the actual strategy before requesting optional retention. */ async()=>{
      const t=await receiptFixture('receipt-on-demand');
      try{
        await t.mint();t.settings.indexingMode='on-demand';
        const before=t.index.getSourceAcquisitionCounters();
        equal(await t.index.retainValidatedStartupSnapshot(),null,'Local strategy has no global receipt verification');
        equal(t.index.getSourceAcquisitionCounters(),before,'Receipt call starts no local or global acquisition');return true;
      }finally{t.close();}
    })()`),true);
  }finally{await browser.cleanup();}
});

/** URL indexing coverage is a separate existing policy; complete current facets need no replay in either mode. */
for(const mode of ['background','on-demand']){
  test(`receipt preserves URL incidence and labels in ${mode} URL mode`,async()=>{
    const browser=await chromiumHarness(bundle);
    try{
      assert.equal(await browser.evaluate(contributorBrowserInitialize),true);assert.equal(await browser.evaluate(initialize),true);
      assert.equal(await browser.evaluate(`(/** Seed genuine URL evidence through the shared compiler and restore its exact incidence. */ async()=>{
        const t=await receiptFixture('receipt-url-${mode}');
        try{
          t.settings.urlIndexingMode='${mode}';t.f.texts.set('B.md','[Receipt remote label](https://example.com/receipt)');
          await t.mint();const index=await t.restart();
          equal(await index.retainValidatedStartupSnapshot(),0,'Actual URL-mode graph validates unchanged');
          ok(index.get('https://example.com/receipt'),'Canonical URL node preserved');
          ok(index.search('Receipt remote label',10).some(page=>page.path==='https://example.com/receipt'),'Complete saved URL label remains searchable');
          equal(index.getSemanticPreparationDiagnostics().fullBuilds,0,'No URL-triggered full compilation');return true;
        }finally{t.close();}
      })()`),true);
    }finally{await browser.cleanup();}
  });
}
