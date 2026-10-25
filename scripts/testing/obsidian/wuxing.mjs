/** Exact-build Wu Xing Windows acceptance on explicit disposable Small. Uses the production registry/settings/editor/Sidecar, owns bounded fixture resources and restores configuration independently of assertions. Run lanes serially. */
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {runControlledProbe} from './controlledProbe.mjs';
import {acceptWuXingEditor} from './wuxingEditor.mjs';
import {acceptWuXingPairs} from './wuxingPairs.mjs';

/** Keep every native effect under one exact controller lifetime; callbacks are serialized into the selected renderer, never production modules. */
async function scenario(app,c){
 const p=app.plugins.plugins['k-plex'],workspace=app.workspace,root=host=>host.view.contentEl.querySelector('.kplex-app');
 if(!p||app.setting.isOpen||app.vault.getFiles().length>=1000)throw Error('Clean disposable Small required');
 const original=structuredClone(p.settings),policy=p.savedSettingsPolicy,layout=workspace.getLayout(),folder='Kplex-220-WuXing-'+Date.now();
 const remote=require('@electron/remote'),native=remote.getCurrentWindow(),bounds=native.getBounds(),maximized=native.isMaximized(),minimized=native.isMinimized(),files=[],hosts=[],releases=[],restores=[],cases=[],cleanup=[];
 let createdFolder,failure;
 const path=name=>folder+'/'+name+'.md',check=(value,message)=>{if(c.closed||!value)throw Error(message)};
 const wait=async ms=>{check(true,'Retired controller');await new Promise(resolve=>window.setTimeout(resolve,ms));check(true,'Retired controller')};
 const until=async(read,message,maximumMs=20000)=>{const end=Date.now()+maximumMs;while(!read()){check(Date.now()<end,message);await wait(40)}};
 const center=host=>host.view.documentSession.centerPath;
 const observe=(owner,key,work,label=key)=>{const previous=owner[key];check(typeof previous==='function','Observation owner missing: '+key);owner[key]=function(...args){work[label]=(work[label]??0)+1;return previous.apply(this,args)};const restore=()=>{owner[key]=previous};restores.push(restore);return restore};
 const quiet=()=>{const work={reads:0,parses:0,acquisitions:0,rebuilds:0},stops=[observe(app.vault,'read',work,'reads'),observe(app.vault,'cachedRead',work,'reads'),observe(p.index.metadataParser,'parse',work,'parses'),observe(p.index,'acquireSemanticDemand',work,'acquisitions'),observe(p.index,'rebuild',work,'rebuilds'),observe(p.index,'rebuildProgressively',work,'rebuilds')];return label=>{for(const stop of stops)stop();check(Object.values(work).every(value=>value===0),label+': '+JSON.stringify(work));cases.push({id:label,work})}};
 const reveal=async host=>{const win=host.view.containerEl.ownerDocument.defaultView.require('@electron/remote').getCurrentWindow();win.restore();win.show();win.focus();win.webContents.focus();await workspace.revealLeaf(host);workspace.setActiveLeaf(host,{focus:true});await until(()=>host.view.containerEl.ownerDocument.hasFocus(),'Exact native canvas focus absent')};
 const panel=host=>host.view.containerEl.ownerDocument.querySelector('.kplex-filter-panel');
 const choose=async(host,id)=>{await reveal(host);if(!panel(host)){root(host).querySelector('.kplex-filter-trigger').click();await until(()=>panel(host)?.querySelector('.kplex-view-selector select'),'Native view selector absent')}
  const select=panel(host).querySelector('.kplex-view-selector select');check(JSON.stringify([...select.options].map(option=>option.value))===JSON.stringify(['classic','wuxing']),'Production options differ');select.value=id;select.dispatchEvent(new select.ownerDocument.defaultView.Event('change',{bubbles:true}));
  await until(()=>host.view.documentSession.plexView.definition.id===id&&select.value===id,'Owning native selection failed');
 };
 try{
  native.restore();if(c.osInput)native.setBounds({x:20,y:20,width:1400,height:1000});native.show();native.focus();native.webContents.focus();if(process.platform==='darwin')remote.app.focus({steal:true});await until(()=>!document.hidden,'Foreground unavailable');
  workspace.leftSplit.collapse();workspace.rightSplit.collapse();await until(()=>!p.isStartupInitializing()&&!p.index.hasPendingSemanticPreparation()&&!p.index.hasActiveSemanticPreparation(),'Startup/source preparation did not settle before fixture writes');
  createdFolder=await app.vault.createFolder(folder);
  const child=p.settings.hierarchy.children[0];check(child,'Configured child ontology required');
  const phase={Memory:'water',Concept:'wood',Concept2:'wood',Goal:'fire',Review:'earth',Method:'metal',Conflict:['water','wood'],Unmapped:null};
  for(const [name,value]of Object.entries(phase)){
   const frontmatter={phase:value,[p.settings.noteTypeField]:'Example',tags:['wuxing-fixture']};if(name==='Memory')frontmatter[child]=Object.keys(phase).filter(key=>key!=='Memory').map(key=>'[['+path(key)+']]');
   const yaml=Object.entries(frontmatter).map(([key,value])=>JSON.stringify(key)+': '+JSON.stringify(value)).join('\n');
   const file=await app.vault.create(path(name),'---\n'+yaml+'\n---\n# '+name+'\n\nDisposable Wu Xing native fixture.\n');files.push(file);p.index.insertCreatedFile(file);releases.push(p.index.acquireSemanticDemand(file.path));
  }
  await until(()=>files.every(file=>app.metadataCache.getFileCache(file))&&!p.index.hasPendingSemanticPreparation()&&!p.index.hasActiveSemanticPreparation(),'Fixture did not settle');
  Object.assign(p.settings,{canvasViewSettings:{},maxItemCount:100,documentSyncMode:'off',sidecarOpen:false,embedCentralNode:false,autoOpenCentralDocument:false,followActiveFile:false,centralNodeMarkdownMode:'source',animationSpeed:0,graphDepth:1,renderSiblings:false,showPageNodes:true,showInferredNodes:true,showFolderNodes:false,showTagNodes:false,graphLenses:[],applyPowerFilter:false});p.index.notifyPresentation();
  await until(()=>p.index.neighbours(p.index.get(path('Memory')),'child').length>=7,'Canonical direct relationships absent');
  const host=workspace.getLeaf('tab');hosts.push(host);await host.setViewState({type:'k-plex-react-view',active:true});await host.view.waitUntilReady();await p.setDocumentSyncMode(host,'off');
  host.view.centerPresentation.update({embedCentralNode:false,centralNodeMarkdownMode:'source'});p.notifyNavigation(path('Memory'),host);await until(()=>center(host)===path('Memory')&&root(host)?.querySelector('.kplex-filter-trigger'),'Attention did not render');await choose(host,'wuxing');
  await until(()=>root(host).querySelectorAll('.kplex-view-region').length===8&&!root(host).querySelector('.kplex-view-error'),'Wu Xing production scene absent');panel(host).querySelector('.kplex-filter-panel-header button').click();
  check(root(host).querySelectorAll('.kplex-view-guide').length===5,'Decorative cycle absent');
  check(root(host).querySelector('[data-kplex-decoration="wuxing.conflicting"]').textContent.includes('1'),'Conflicting list missing');
  cases.push({id:'production-registry-five-phases-canonical-links',regions:8,semanticConnectors:root(host).querySelectorAll('[data-kplex-edge-id]').length});
  const context={app,p,c,workspace,remote,native,bounds,host,hosts,files,releases,restores,cases,path,root,center,check,wait,until,choose,panel,reveal,observe,quiet};
  c.progress={phase:c.lane,cases};
  if(c.lane==='editor')await c.acceptEditor(context);else await c.acceptPairs(context);
  return {lane:c.lane,cases,cleanup,host:{node:process.version,electron:process.versions.electron,chrome:process.versions.chrome,hidden:document.hidden},limits:['Windows native automation is separate from macOS and physical mobile acceptance.','#215 extra-tab application restart/combined two-editor-pair baseline failures are not claimed fixed.']};
 }catch(error){failure=error;c.progress={...c.progress,cases};throw error}
 finally{
  const errors=[];
  const clean=async(label,action)=>{try{await action();cleanup.push({label,status:'passed'})}catch(error){errors.push(label+': '+String(error));cleanup.push({label,status:'failed',error:String(error)})}c.progress={...c.progress,cleanup}};
  await clean('close-owned-settings',()=>{if(app.setting.isOpen)app.setting.close()});
  for(const restore of restores.reverse())await clean('restore-resource',restore);
  for(const host of hosts.reverse())if(workspace.getLeafById(host.id)===host)await clean('detach-owned-host',()=>host.detach());
  for(const release of releases.reverse())await clean('release-demand',release);
  p.settings=original;await clean('restore-live-settings',()=>p.saveSettings(false,false));p.savedSettingsPolicy=policy;
  await clean('restore-layout',()=>workspace.changeLayout(layout));await clean('restore-window-bounds',()=>{native.setBounds(bounds);if(maximized)native.maximize();if(minimized)native.minimize()});
  for(const file of files.reverse())if(app.vault.getFileByPath(file.path)===file)await clean('delete-owned-fixture',()=>app.vault.delete(file,true));
  if(createdFolder&&app.vault.getFolderByPath(folder)===createdFolder&&!createdFolder.children.length)await clean('delete-owned-folder',()=>app.vault.delete(createdFolder,true));
  await clean('drain-settings',()=>p.settingsWriteQueue);await new Promise(resolve=>window.setTimeout(resolve,750));await clean('restore-settings-bytes',()=>app.vault.adapter.write(p.manifest.dir+'/data.json',c.originalData));
  if(errors.length)throw Error((failure?String(failure)+'; ':'')+'Wu Xing cleanup: '+errors.join('; '));
 }
}

if(process.env.KPLEX_TEST_VAULT_NAME!=='kplex-test-small')throw Error('Explicit disposable Small required');
const lane=process.env.KPLEX_WUXING_NATIVE_LANE??'editor';if(!['editor','pairs'].includes(lane))throw Error('Unknown Wu Xing native lane');
const definitions='c.lane='+JSON.stringify(lane)+';c.osInput='+JSON.stringify(process.env.KPLEX_WUXING_OS_INPUT==='true')+';c.loadedCompanion='+JSON.stringify(process.env.KPLEX_WUXING_LOADED_COMPANION==='true')+';c.originalData='+JSON.stringify(readFileSync(join(process.env.KPLEX_TEST_CONFIG_DIR,'plugins/k-plex/data.json'),'utf8'))+';c.acceptEditor='+acceptWuXingEditor.toString()+';c.acceptPairs='+acceptWuXingPairs.toString()+';';
await runControlledProbe('wuxing-220-'+lane,scenario,definitions,['src/ui/PlexGraph.tsx','src/core/plex/views/wuxing/definition.ts','src/core/plex/views/wuxing/layout.ts','src/adapters/obsidian/predicateContracts.ts'],{maximumMs:480000});
