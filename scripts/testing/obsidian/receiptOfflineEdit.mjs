/**
 * Native disposable-small-vault receipt regression. Owns one synthetic note, its deliberately
 * equal-stat edit and plugin disable/enable interval; cleanup removes only that note. No other
 * note contents, workspace, preferences or cache payloads are exported. Called outside timing runs.
 */
export async function receiptOfflineEdit(app, expectedPath) {
  const fs=require('node:fs'),path=require('node:path');
  if(app.vault.getName()!=='kplex-test-small'||fs.realpathSync(app.vault.adapter.getBasePath())!==fs.realpathSync(expectedPath))throw Error('Exact disposable small vault required');
  const plugin=app.plugins.plugins['k-plex'];
  if(!plugin||plugin.index.isOnDemandMode())throw Error('Loaded Eager test build required');
  const field=plugin.settings.noteTypeField;
  if(typeof field!=='string'||!field.trim()||/[\r\n:]/.test(field))throw Error('Ordinary configured note type field required');
  const name='Kplex-Receipt-165-'+Date.now()+'.md',full=path.join(expectedPath,name);
  const oldMarker='Kplex165Old',newMarker='Kplex165New';
  const original=field+':: '+oldMarker+'\n',replacement=field+':: '+newMarker+'\n';
  if(Buffer.byteLength(original)!==Buffer.byteLength(replacement)||app.vault.getFileByPath(name)||fs.existsSync(full))throw Error('Owned equal-byte fixture required');
  const report={kind:'Plugin-disabled same-stat edit; selected test vault remains open',created:false,cleaned:false};
  let disabled=false,stage='create';
  /** Wait only for actual test prerequisites; production schedules and cache authority remain unchanged. */
  async function until(predicate,label){
    const start=Date.now();
    while(!predicate()){
      if(Date.now()-start>30000)throw Error('Native fixture prerequisite: '+label);
      await new Promise(/** Release the renderer task while waiting for native metadata/stat delivery. */ done=>window.setTimeout(done,50));
    }
  }
  try{
    const file=await app.vault.create(name,original);report.created=true;
    const stamp=Math.floor(Date.now()/1000)*1000;
    fs.utimesSync(full,stamp/1000,stamp/1000);
    stage='initial-metadata';
    await until(/** Observe actual host stats and metadata, without reading unrelated notes. */ ()=>file.stat.mtime===stamp&&file.stat.size===Buffer.byteLength(original)&&app.metadataCache.getFileCache(file),'initial metadata');
    stage='source-closure';
    if(!(await plugin.index.sourceAcquisition.flush()))throw Error('Native fixture source closure unavailable');
    await until(/** Drain queued as well as active native metadata reconciliation before the controlled save. */ ()=>!plugin.rebuildTask&&!plugin.index.building
      &&plugin.rebuildTimer===null&&plugin.getIndexStatus().upToDate,'existing rebuild');
    stage='compile';
    if(!(await plugin.index.rebuild({validateSnapshotSources:true})))throw Error('Native canonical fixture build rejected');
    plugin.index.cancelPendingPersistence();
    stage='save';
    if(!(await plugin.index.persistIndexedDbSnapshot(plugin.index.snapshotPersistGeneration)))throw Error('Native fixture save rejected');
    stage='receipt';
    const meta=await plugin.index.indexedDb.readSnapshotMeta();
    if(!(await plugin.index.indexedDb.readSnapshotSourceReceipt(meta,()=>true)))throw Error('Native fixture receipt unavailable');
    const fingerprint=plugin.index.semanticFingerprints.get(name);
    if(!fingerprint)throw Error('Canonical fixture fingerprint required');
    const physical={mtime:file.stat.mtime,size:file.stat.size,ctime:file.stat.ctime};
    stage='disabled-edit';
    disabled=true;await app.plugins.disablePlugin('k-plex');
    fs.writeFileSync(full,replacement,'utf8');fs.utimesSync(full,stamp/1000,stamp/1000);
    await until(/** Real host physical observations must equal the saved revision exactly. */ ()=>file.stat.mtime===physical.mtime&&file.stat.size===physical.size&&file.stat.ctime===physical.ctime,'equal physical revision');
    stage='restart';
    await app.plugins.enablePlugin('k-plex');disabled=false;
    await until(/** Green cached presentation is insufficient: require real automatic source and coordinator closure. */ ()=>{
      const current=app.plugins.plugins['k-plex'],index=current?.index;
      return current&&current!==plugin&&current.getIndexStatus().upToDate&&!current.isStartupInitializing()
        &&!index.building&&!index.sourceAcquisition.inventory&&index.sourceAcquisition.hasSemanticDependencies()
        &&!current.rebuildTask&&!index.hasPendingSemanticPreparation()&&!index.hasActiveSemanticPreparation();
    },'current replacement index');
    stage='current-result';
    const current=app.plugins.plugins['k-plex'],index=current.index,body=await index.sourceAcquisition.readBody(file);
    if(file.stat.mtime!==physical.mtime||file.stat.size!==physical.size||file.stat.ctime!==physical.ctime)throw Error('Physical revision changed during native same-stat validation');
    report.result={fingerprintChanged:index.semanticFingerprints.get(name)!==fingerprint,currentBody:JSON.stringify(body).includes(newMarker),
      sourceClosed:index.sourceAcquisition.hasSemanticDependencies(),inventoryActive:!!index.sourceAcquisition.inventory};
    report.source=index.getSourceAcquisitionCounters();
    if(!report.result.currentBody)throw Error('Same-stat body was not repaired and compiled');
    if(index.sourceBackedSemantics){
      if(index.fullSnapshotFresh||index.retainedSnapshotSourceProof)throw Error('Changed source incorrectly retained receipt authority');
      const release=index.acquireSemanticDemand(name);
      try{
        await index.ensureSemanticScope(name);
        if(index.semanticScopes.get(name)?.pagesByPath.get(name)?.noteType!==newMarker)throw Error('Current canonical note type missing');
      }finally{release();}
      report.recovery='Existing source-backed requested scope; global snapshot remains cached';
    }else{
      if(!report.result.fingerprintChanged||index.get(name)?.noteType!==newMarker)throw Error('Current canonical note type missing');
      report.recovery='Complete canonical graph';
    }
    report.samePhysicalRevision=true;report.currentBody=true;report.currentNoteType=true;
    report.source=index.getSourceAcquisitionCounters();
  }catch(error){
    // Export only owned prerequisite messages or a fixed exception category, never arbitrary host errors.
    const message=error instanceof Error?error.message:'';
    report.failure={stage,reason:/^(Native (fixture prerequisite: (initial metadata|existing rebuild|equal physical revision|current replacement index)|fixture (source closure unavailable|save rejected|receipt unavailable)|canonical fixture build rejected)|Canonical fixture fingerprint required|Physical revision changed during native same-stat validation|Same-stat body was not repaired and compiled|Changed source incorrectly retained receipt authority|Current canonical note type missing)$/.test(message)?message:'Unexpected native exception'};
  }finally{
    if(disabled){await app.plugins.enablePlugin('k-plex');disabled=false;}
    const file=app.vault.getFileByPath(name);
    if(report.created&&file)await app.vault.delete(file);
    report.cleaned=!app.vault.getFileByPath(name)&&!fs.existsSync(full);
    if(!report.cleaned)throw Error('Owned receipt fixture cleanup failed');
  }
  return report;
}
