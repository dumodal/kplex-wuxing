/**
 * Disposable-vault startup acceptance: exact main.js staging, genuine complete-graph preparation,
 * vault-window application reloads and aggregate observation. Never accepts a personal vault.
 * Existing CLI process deadlines and renderer throttling remain unchanged. Settings are backed
 * up before preparation and restored explicitly. Production indexing may read disposable notes;
 * the driver never edits notes and cannot target a personal vault.
 */
import { createHash } from 'node:crypto';
import { appendFileSync, copyFileSync, existsSync, mkdirSync, readFileSync, realpathSync, renameSync, writeFileSync } from 'node:fs';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';
import { obsidianCliExecutable, spawnNativeSync } from './processTools.mjs';
import { validateTarget } from './runner.mjs';

const root=resolve(fileURLToPath(new URL('../../..',import.meta.url))),vault=process.env.KPLEX_TEST_VAULT_NAME;
if(!['kplex-test','kplex-test-small'].includes(vault)) throw Error('Only the two explicitly authorized disposable vaults are accepted');
const target=validateTarget({vaultName:vault,vaultPath:process.env.KPLEX_TEST_VAULT_PATH,configDir:process.env.KPLEX_TEST_CONFIG_DIR});
const output=process.env.KPLEX_HOST_REPORT_DIR;
if(!output) throw Error('Set an explicit KPLEX_HOST_REPORT_DIR outside the vault');
const outputRelative=relative(target.vault,resolve(output));
if(!outputRelative||(!isAbsolute(outputRelative)&&outputRelative!=='..'&&!outputRelative.startsWith('..'+sep)))throw Error('Reports must be outside the vault');
mkdirSync(output,{recursive:true});
const action=process.argv[2]??'observe',label=process.env.KPLEX_RESTART_LABEL??action;
if(!/^[a-zA-Z0-9-]{1,80}$/.test(label))throw Error('Use a simple bounded receipt label');
if(existsSync(join(output,`${label}.json`)))throw Error('Receipt exists; choose a new KPLEX_RESTART_LABEL');
const report={action,vault,startedAt:new Date().toISOString(),node:process.version,samples:[]};
/** Hash only explicit executable/configuration artifacts; never walk note files. */
function hash(path){return createHash('sha256').update(readFileSync(path)).digest('hex');}
/** Keep every CLI operation bounded; raw transport output is not copied into reports. */
function cli(command,...args){
  const r=spawnNativeSync(obsidianCliExecutable(),[`vault=${vault}`,command,...args],{cwd:root,encoding:'utf8',timeout:30000,killSignal:'SIGKILL',maxBuffer:2*1024*1024});
  if(r.error||r.status!==0||/^Error:/m.test(r.stdout??'')) throw Error('Native command failed: '+command);
  return r.stdout.trim();
}
/** Decode one aggregate response; native startup banners may precede it. */
function evaluate(code){new Script(code);const raw=cli('eval','code='+code);return JSON.parse(raw.slice(raw.indexOf('{')));}
/** Yield between observations without changing renderer scheduling or throttling. */
const delay=/** Preserve timer resolution explicitly in Node rather than the renderer. */ ms=>new Promise(/** Resolve this poll only. */ done=>setTimeout(done,ms));
/** Persist only the latest summary; the append-only stream avoids rewriting a growing trace during timing. */
function save(){writeFileSync(join(output,`${label}.json`),JSON.stringify({...report,samples:report.samples.slice(-1)},null,2)+'\n');}
const sampleCode=String.raw`(/** Read existing aggregate diagnostics without acquiring note/source data. */ ()=>{
 const p=app.plugins.plugins['k-plex'],i=p?.index,w=require('@electron/remote').getCurrentWindow();
 if(${action==='run'}&&!window.kplexRestartHeartbeat){const b=window.kplexRestartHeartbeat={last:performance.now(),maxGapMs:0,samples:0};
  b.timer=window.setInterval(/** Observe inclusive renderer-task gaps after the first CLI observation. */ ()=>{const now=performance.now();b.maxGapMs=Math.max(b.maxGapMs,now-b.last);b.last=now;b.samples++;},50);}
 const base={at:Date.now(),timeOrigin:performance.timeOrigin,now:performance.now(),layoutReady:app.workspace.layoutReady,host:{node:process.versions.node,electron:process.versions.electron,chrome:process.versions.chrome},
  heapUsedBytes:process.memoryUsage().heapUsed,heartbeat:window.kplexRestartHeartbeat?{samples:window.kplexRestartHeartbeat.samples,maxGapMs:window.kplexRestartHeartbeat.maxGapMs}:null,
  foreground:{hidden:document.hidden,documentFocused:document.hasFocus(),windowFocused:w.isFocused(),throttling:w.webContents.getBackgroundThrottling()},loaded:!!i};
 if(!i)return JSON.stringify(base);
 const status=p.getIndexStatus(),h=i.getSnapshotHydrationDiagnostics(),d=p.getStartupDiagnostics(),s=i.getSavedSnapshotSummary(),repository=i.getSourceRepositoryDiagnostics();
 return JSON.stringify({...base,status:{upToDate:status.upToDate,phase:status.phase,indexedFiles:status.indexedFiles,totalFiles:status.totalFiles},
  initializing:p.isStartupInitializing(),building:!!i.building,inventory:!!i.sourceAcquisition.inventory,semanticDependencies:i.sourceAcquisition.hasSemanticDependencies(),
  semanticActivity:{pending:i.hasPendingSemanticPreparation(),active:i.hasActiveSemanticPreparation(),failure:i.getSemanticPreparationFailure()},scheduler:i.getWorkPriorityDiagnostics(),
  visible:{surfaces:app.workspace.getLeavesOfType('k-plex-react-view').length,demands:i.semanticDemandCounts.size,
   centerKey:require('node:crypto').createHash('sha256').update(p.settings.lastActivePath??'').digest('hex'),
   expectedCenter:${JSON.stringify(process.env.KPLEX_RESTART_CENTER??null)}===null?null:p.settings.lastActivePath===${JSON.stringify(process.env.KPLEX_RESTART_CENTER??null)},
   expectedDemand:${JSON.stringify(process.env.KPLEX_RESTART_CENTER??null)}===null?null:i.semanticDemandCounts.size>0&&[...i.semanticDemandCounts.keys()].every(/** Validate actual visible demand without exporting source identities. */ path=>path===${JSON.stringify(process.env.KPLEX_RESTART_CENTER??null)})},
  mode:{indexing:p.settings.indexingMode,urls:p.settings.urlIndexingMode,throttle:p.settings.indexingThrottle},
  graph:{nodes:i.size,fingerprints:i.indexedMarkdownFileCount(),full:i.isFullSnapshotHydrated(),navigable:!!i.warmSourceRecoveryAvailable||i.isFullSnapshotHydrated(),fresh:!!i.fullSnapshotFresh,sourceSemantics:!!i.sourceBackedSemantics,sourceBacked:!!i.sourceBackedStartup,vocabulary:!!i.sourceNodeVocabularyPublished,
   declarations:i.state.evidence.declarationCount},hydration:h,startup:d,source:i.getSourceAcquisitionCounters(),url:i.getUrlIndexProgress(),
  sourceRepository:Object.fromEntries(['activated','unsaved','empty','chunksWritten','bytesWritten','readFailures','sequenceMin','sequenceMax','peakDecodeBytes'].map(/** Export fixed aggregate fields only. */ key=>[key,Number.isFinite(repository[key])?repository[key]:null])),
  saved:{active:s.active?{createdAt:s.active.createdAt,schema:s.active.schema}:null,checkpoint:!!s.checkpoint,invalid:!!s.invalidActive},
  revisions:{publication:i.publicationRevision,source:p.getIndexSourceRevision(),policy:i.semanticPolicyRevision},
  decisions:i.getIndexDiagnostics().slice(-16).map(/** Omit arbitrary fields and source identities. */ row=>({at:row.at,stage:row.stage,reason:row.reason,durationMs:row.durationMs}))});
})()`;
/** Observe only scalar/finite product diagnostics; no source/head/metadata/content inspection. */
function sample(){
  const s=evaluate(sampleCode);
  appendFileSync(join(output,`${label}.samples.jsonl`),JSON.stringify(s)+'\n');
  report.sampleCount=(report.sampleCount??0)+1;
  const origins=report.foregroundByOrigin??={},f=origins[s.timeOrigin]??={samples:0,violations:0};
  f.samples++;f.violations+=Number(s.foreground.hidden||!s.foreground.documentFocused||!s.foreground.windowFocused||!s.foreground.throttling);
  const milestones=report.firstObservedByOrigin??={},m=milestones[s.timeOrigin]??={};
  for(const [name,ready] of [['layoutReady',s.layoutReady],['savedPreview',s.hydration?.route==='saved-preview'],
    ['fullNavigable',s.graph?.navigable],['fullGraph',s.graph?.full],['semanticDependencies',s.semanticDependencies],['reportedReady',s.status?.upToDate]]){
    if(ready&&m[name]===undefined)m[name]=s.now;
  }
  report.samples.push(s);if(report.samples.length>2400)report.samples.splice(1,1);save();return s;
}
/** Wait for honest readiness or a stable idle incomplete outcome; neither path changes flags, progress or deadlines. */
async function settled(previousOrigin){
  let stable=0,incomplete=0,firstReady;
  while(true){
    await delay(1000);
    let s;
    try{s=sample();}catch{report.transportReconnects=(report.transportReconnects??0)+1;save();await delay(10000);continue;}
    if(previousOrigin!==undefined&&s.timeOrigin===previousOrigin) continue;
    incomplete=s.loaded&&s.status.phase==='incomplete'&&!s.initializing&&!s.building&&!s.inventory&&!s.semanticActivity.active&&s.hydration.outcome!=='running'?incomplete+1:0;
    if(incomplete>=3){report.final=s;report.observedUntilNavigationMs=s.now;throw Error('Startup reports incomplete with no active source, build or semantic work');}
    stable=s.loaded&&s.status.upToDate&&!s.initializing&&!s.building&&!s.inventory&&s.hydration.outcome!=='running'?stable+1:0;
    if(stable===1)firstReady=s.at;
    if(stable>=3){if(previousOrigin!==undefined)report.firstReadyFromNavigationMs=firstReady-s.timeOrigin;return s;}
  }
}
/** Preserve actual renderer/focus facts for successful and failed reload trials alike. */
function recordReloadOutcome(previousOrigin){
  if(!report.final)return;
  report.rendererChanged=report.final.timeOrigin!==previousOrigin;
  report.observedUntilNavigationMs=report.final.now;
  report.allForeground=Object.entries(report.foregroundByOrigin).filter(/** The old window's pre-reload sample is outside the trial. */ ([origin])=>Number(origin)!==previousOrigin)
    .every(/** Report all observed exclusions without pretending polling proves continuous focus. */ ([,facts])=>facts.violations===0);
}
/** Start a long operation after returning from CLI transport; polling never cancels production work. */
function startTask(code){evaluate(`(/** Own completion before leaving CLI transport. */ ()=>{const c={done:false};window.kplexRestartProbe=c;window.setTimeout(/** Start only after the bounded command returns. */ ()=>{c.task=(/** Preserve the awaited production operation. */ async()=>{${code}})().then(/** Retain only the explicit aggregate result. */ value=>{c.done=true;c.value=value},/** Do not copy exceptions or note paths into the receipt. */ ()=>{c.done=true;c.failed=true})},20);return JSON.stringify({started:true})})()`);}
/** Wait for the owned controller while preserving aggregate progress and bounded transport calls. */
async function taskDone(){while(true){await delay(1000);sample();const s=evaluate("JSON.stringify({done:window.kplexRestartProbe?.done,failed:window.kplexRestartProbe?.failed,value:window.kplexRestartProbe?.value})");if(s.done){if(s.failed)throw Error('Owned native operation failed');return s.value;}}}
/** Back up configuration once per experiment; never replace an earlier original with test settings. */
function backup(){for(const [name,path] of [['data.json',join(target.pluginDir,'data.json')],['community-plugins.json',join(target.config,'community-plugins.json')]]){const destination=join(output,'original-'+name);if(!existsSync(destination))copyFileSync(path,destination);}}

try{
  report.driverSha256=hash(fileURLToPath(import.meta.url));
  report.workingTreeSource=Object.fromEntries(['src/index/GraphIndex.ts','src/index/IndexedDbCache.ts','src/application/supportReportProjection.ts'].map(/** Identify local source independently of installed baseline/candidate artifact identity. */ path=>[path,hash(join(root,path))]));
  const reported=cli('vault','info=path').replace(/^path\s+/,'');
  if(realpathSync(reported)!==target.vault)throw Error('CLI selected a different vault');
  evaluate("(/** Select the named disposable window without changing background throttling. */ ()=>{const r=require('@electron/remote'),w=r.getCurrentWindow();r.app.show?.();r.app.focus({steal:true});w.restore();w.show();w.moveTop();w.focus();return JSON.stringify({focused:w.isFocused()})})()");
  report.artifacts=Object.fromEntries(['main.js','manifest.json','styles.css'].map(/** Retain exact installed identity before any operation. */ name=>[name,hash(join(target.pluginDir,name))]));
  if(action==='observe'){sample();}
  else if(action==='stage'){
    backup();
    const source=resolve(process.env.KPLEX_RESTART_MAIN??join(root,'dist','main.js')),destination=join(target.pluginDir,'main.js'),staged=destination+'.restart-staged';
    copyFileSync(source,staged);if(hash(staged)!==hash(source))throw Error('Staged artifact mismatch');
    evaluate("(/** Finish unloading before atomically replacing executable bytes. */ async()=>{await app.plugins.disablePlugin('k-plex');return JSON.stringify({disabled:!app.plugins.plugins['k-plex']})})()");
    renameSync(staged,destination);report.installedMain=hash(destination);
    startTask("await app.plugins.enablePlugin('k-plex');return {enabled:!!app.plugins.plugins['k-plex']}");await taskDone();
  }else if(action==='prepare'){
    backup();
    evaluate("(/** Retire live preferences before the owned disposable configuration change. */ async()=>{await app.plugins.disablePlugin('k-plex');return JSON.stringify({disabled:!app.plugins.plugins['k-plex']})})()");
    const path=join(target.pluginDir,'data.json'),data=JSON.parse(readFileSync(path,'utf8'));
    data.indexingMode='eager';if(process.env.KPLEX_RESTART_CENTER)data.lastActivePath=process.env.KPLEX_RESTART_CENTER;
    writeFileSync(path,JSON.stringify(data,null,2));
    startTask("await app.plugins.enablePlugin('k-plex');return {enabled:!!app.plugins.plugins['k-plex']}");await taskDone();await settled();
    startTask("const p=app.plugins.plugins['k-plex'],i=p.index;const alreadyCompiled=i.isFullSnapshotHydrated()&&!i.sourceBackedSemantics&&i.indexedMarkdownFileCount()===app.vault.getMarkdownFiles().length;const built=alreadyCompiled?false:await i.rebuild();if(!alreadyCompiled&&!built)throw Error('Full build rejected');i.cancelPendingPersistence();const saved=await i.persistIndexedDbSnapshot(i.snapshotPersistGeneration);if(!saved)throw Error('Complete save rejected');return {built,alreadyCompiled,saved}");
    report.preparation=await taskDone();report.final=await settled();
    if(!report.final.graph.full)throw Error('Preparation did not produce a complete graph');
  }else if(action==='wait'){
    report.final=await settled();
  }else if(action==='save'){
    startTask("const p=app.plugins.plugins['k-plex'],i=p.index;if(!p.getIndexStatus().upToDate||i.sourceAcquisition.inventory||!i.isFullSnapshotHydrated()||i.sourceBackedSemantics)throw Error('Current complete compiled graph required');i.cancelPendingPersistence();const saved=await i.persistIndexedDbSnapshot(i.snapshotPersistGeneration);if(!saved)throw Error('Complete save rejected');return {saved}");
    report.preparation=await taskDone();report.final=sample();
  }else if(action==='run'){
    const before=sample();
    const capable=evaluate("JSON.stringify({reload:!!app.commands.commands['app:reload']})");
    if(!capable.reload)throw Error('Host app:reload command unavailable');
    report.lifecycle='vault-window application reload; Electron process retained';
    report.previousTimeOrigin=before.timeOrigin;
    report.requestedAt=Date.now();
    evaluate("(/** Return before restarting the named vault's application renderer. */ ()=>{window.setTimeout(/** Invoke the verified native application command. */ ()=>app.commands.executeCommandById('app:reload'),100);return JSON.stringify({scheduled:true})})()");
    report.final=await settled(before.timeOrigin);
    recordReloadOutcome(before.timeOrigin);
    report.readyFromNavigationMs=report.final.at-report.final.timeOrigin;
  }else if(action==='restore-config'){
    startTask("await app.plugins.disablePlugin('k-plex');return {disabled:!app.plugins.plugins['k-plex']}");await taskDone();
    for(const [name,path] of [['data.json',join(target.pluginDir,'data.json')],['community-plugins.json',join(target.config,'community-plugins.json')]])copyFileSync(join(output,'original-'+name),path);
    startTask("await app.plugins.enablePlugin('k-plex');return {enabled:!!app.plugins.plugins['k-plex']}");await taskDone();
    report.configurationRestored=hash(join(output,'original-data.json'))===hash(join(target.pluginDir,'data.json'))
      &&hash(join(output,'original-community-plugins.json'))===hash(join(target.config,'community-plugins.json'));
    if(!report.configurationRestored)throw Error('Original configuration bytes were not restored');
  }else throw Error('Unknown action');
  report.status='passed';
}catch(error){if(action==='run')recordReloadOutcome(report.previousTimeOrigin);report.status='failed';report.error=error.message;process.exitCode=1;}
finally{
  try{evaluate("(/** Independently retire this driver's timer/controller after success or failure. */ ()=>{window.clearInterval(window.kplexRestartHeartbeat?.timer);delete window.kplexRestartHeartbeat;delete window.kplexRestartProbe;return JSON.stringify({removed:!window.kplexRestartProbe&&!window.kplexRestartHeartbeat})})()");}catch{report.cleanupUnavailable=true;}
  report.completedAt=new Date().toISOString();save();
}
console.log(JSON.stringify({status:report.status,error:report.error,file:join(output,`${label}.json`),full:report.final?.graph.full,route:report.final?.hydration.route,readyFromNavigationMs:report.readyFromNavigationMs}));
