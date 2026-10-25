/** Exact-build production Mind Map acceptance in the authorized Small vault. Shared transport/session helpers own native isolation; no test definition or editor is installed. */
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {runControlledProbe} from './controlledProbe.mjs';
import {nativeDocumentSessions} from './nativeDocumentSessions.mjs';
import {validateTarget} from './runner.mjs';

/** Run separate bounded editor and two-canvas lanes against actual production registration, then restore all owned resources independently of success. */
async function scenario(app,c){
 const p=app.plugins.plugins['k-plex'],workspace=app.workspace;
 if(!p||app.vault.getFiles().length>=1000||app.setting.isOpen)throw Error('Clean disposable Small required');
 const original=structuredClone(p.settings),policy=p.savedSettingsPolicy,layout=workspace.getLayout(),sessions=c.documentSessions(p),owners=sessions.capture();
 const files=[],hosts=[],releases=[],restores=[],embedded=new Set(),cases=[],cleanup=[],folder='Kplex-219-Mindmap-'+Date.now();let createdFolder,failure;
 /** Every native continuation belongs to this exact still-live controller. */
 const check=(value,message)=>{if(c.closed||!value)throw Error(message)};
 /** Opaque fixture paths name only files owned by this scenario. */
 const path=name=>folder+'/'+name+'.md';
 /** Bound waits reject retired controllers before another native effect. */
 const wait=async ms=>{check(true,'Retired controller');await new Promise(resolve=>window.setTimeout(resolve,ms));check(true,'Retired controller')};
 /** Conditions receive a fixed deadline; no failed assertion is retried as a new scenario. */
 const until=async(read,message)=>{const end=Date.now()+20000;while(!read()){check(Date.now()<end,message);await wait(30)}};
 /** Read the actual owning native shell, never a globally active canvas. */
 const root=host=>host.view.contentEl.querySelector('.kplex-app');
 /** The existing document session owns selected view/root/bindings. */
 const session=host=>host.view.documentSession.plexView;
 /** Capture the native action surface associated with this exact leaf. */
 const surface=host=>[...p.actionSurfaceHosts].find(([,registration])=>registration.leaf===host)?.[0];
 /** All structural/editor operations go through the shipped shared manager. */
 const act=async(host,id,args,target)=>{const result=await p.actionManager.dispatch({id,source:'internal',surfaceId:surface(host),...(args?{args}:{}),...(target?{target}:{})});c.progress={...c.progress,lastAction:{id,result}};await wait(40);return result};
 /** Native actions may resolve a current fixture file; stale-incarnation tests remain in the dedicated M0 lane. */
 const target=(name,occurrenceId)=>({kind:'explicit',node:{identity:path(name),path:path(name),kind:'file'},...(occurrenceId?{occurrenceId}:{})});
 /** Exact displayed lineage, independent of order and canonical same-note copies. */
 const occurrence=(...names)=>names.length===1?'root':JSON.stringify(names.map(path));
 /** Enumerate only actual displayed occurrences in one canvas. */
 const nodes=host=>[...root(host).querySelectorAll('[data-kplex-keyboard-id]')];
 /** Native editor leaves are observed through the existing reviewed setViewState seam. */
 const instance=host=>[...embedded].find(leaf=>leaf.view.containerEl.isConnected&&root(host)?.querySelector('.kplex-central-editor-leaf-host')?.contains(leaf.view.containerEl));
 /** The existing filter panel is portaled into its opening document. */
 const panel=host=>root(host).ownerDocument.querySelector('.kplex-filter-panel');
 /** Return the existing native select in that panel. */
 const selector=host=>panel(host)?.querySelector('.kplex-view-selector select');
 /** Open the captured canvas's shared panel without another selector implementation. */
 const openPanel=async host=>{if(!panel(host))root(host).querySelector('.kplex-filter-trigger').click();await until(()=>selector(host),'Owning panel selector absent')};
 /** Submit against the opening session even when the other document has keyboard focus. */
 const choose=async(host,id)=>{await openPanel(host);const element=selector(host);element.value=id;element.dispatchEvent(new element.ownerDocument.defaultView.Event('change',{bubbles:true}));await wait(80)};
 /** Native code must receive trusted primary input at a visible actual occurrence. */
 const clickNative=async readTarget=>{await until(()=>readTarget()?.isConnected,'Primary occurrence absent');const first=readTarget();const doc=first.ownerDocument,win=doc.defaultView.require('@electron/remote').getCurrentWindow();win.show();win.focus();win.webContents.focus();await until(()=>{const element=readTarget(),rect=element?.getBoundingClientRect();return element?.ownerDocument===doc&&rect.width>0&&rect.height>0&&element.contains(doc.elementFromPoint(Math.round(rect.left+rect.width/2),Math.round(rect.top+rect.height/2)))},'Visible unobscured primary target required');const element=readTarget(),rect=element.getBoundingClientRect(),x=Math.round(rect.left+rect.width/2),y=Math.round(rect.top+rect.height/2),hit=doc.elementFromPoint(x,y);c.progress={...c.progress,input:{rect:{left:rect.left,top:rect.top,width:rect.width,height:rect.height},viewport:{width:doc.defaultView.innerWidth,height:doc.defaultView.innerHeight},hitClass:typeof hit?.className==='string'?hit.className:null,hitInside:element.contains(hit),windowId:win.id,focused:win.isFocused()}};let trusted=false;const observe=event=>{trusted=event.isTrusted};element.addEventListener('click',observe,{once:true});try{win.webContents.sendInputEvent({type:'mouseMove',x,y});for(const type of ['mouseDown','mouseUp'])win.webContents.sendInputEvent({type,x,y,button:'left',clickCount:1});await until(()=>trusted,'Trusted primary click not delivered')}finally{element.removeEventListener('click',observe)}};
 c.progress={phase:'fixture',lane:c.lane,cases};
 try{
  await until(()=>!p.isStartupInitializing(),'Startup pending');
  const information=p.appearanceMigrationDialog;
  if(information?.modalEl.isConnected){const done=information.modalEl.querySelector('button.mod-cta');check(information.modalEl.classList.contains('kplex-notification-modal')&&done?.textContent===p.translator('common.done'),'Unexpected staging information owner');done.click();await until(()=>!information.modalEl.isConnected,'Staging information did not dismiss');await p.settingsWriteQueue;cases.push({id:'staging-native-theme-information-dismissed'})}
  const remote=require('@electron/remote'),win=remote.getCurrentWindow();remote.app.focus({steal:true});win.show();win.focus();win.webContents.focus();
  workspace.leftSplit.collapse();workspace.rightSplit.collapse();c.progress={phase:'disable-native-follow',lane:c.lane,cases};await sessions.off();
  c.progress={phase:'create-folder',lane:c.lane,cases};createdFolder=await app.vault.createFolder(folder);const child=p.settings.hierarchy.children[0];check(child,'Child ontology required');const children={R:['P','Q'],P:['B'],Q:['B'],B:['D'],D:['R']};
  for(const name of ['R','A','P','Q','B','C','D','S']){c.progress={phase:'create-fixture-note',note:name,lane:c.lane,cases};const links=children[name]?.map(value=>'[['+path(value)+']]'),file=await app.vault.create(path(name),(links?'---\n'+JSON.stringify(child)+': '+JSON.stringify(links)+'\n---\n':'')+'# '+name+'\n');files.push(file);p.index.insertCreatedFile(file);releases.push(p.index.acquireSemanticDemand(file.path))}
  c.progress={phase:'settle-fixture',lane:c.lane,cases};await until(()=>files.every(file=>app.metadataCache.getFileCache(file))&&!p.index.hasPendingSemanticPreparation()&&!p.index.hasActiveSemanticPreparation(),'Fixture not ready');
  Object.assign(p.settings,{documentSyncMode:'off',sidecarOpen:false,embedCentralNode:false,autoOpenCentralDocument:false,followActiveFile:false,centralNodeMarkdownMode:'source',animationSpeed:0,allowAutozoom:true,graphDepth:1,renderSiblings:false,showPageNodes:true,showInferredNodes:true,showFolderNodes:false,showTagNodes:false,graphLenses:[],applyPowerFilter:false,groupRelations:false,
   canvasViewSettings:{...p.settings.canvasViewSettings,mindmap:{version:1,values:{arrangement:'balanced',initialGenerations:1,maximumDepth:6,maximumOccurrences:128,horizontalSpacing:96,verticalSpacing:24}}}});p.index.notifyPresentation();
  c.progress={phase:'open-native-host',lane:c.lane,cases};const host=workspace.getLeaf('tab');hosts.push(host);const prototype=Object.getPrototypeOf(host),setState=prototype.setViewState;
  prototype.setViewState=function(...args){if(this.containerEl.closest('.kplex-central-editor-leaf-host'))embedded.add(this);return setState.apply(this,args)};restores.push(()=>{prototype.setViewState=setState});
  await host.setViewState({type:'k-plex-react-view',active:true});await workspace.revealLeaf(host);await host.view.waitUntilReady();host.view.centerPresentation.update({embedCentralNode:false,centralNodeMarkdownMode:'source'});p.notifyNavigation(path('A'),host);
  await until(()=>host.view.documentSession.centerPath===path('A'),'Initial attention absent');session(host).select('mindmap');session(host).setRoot(path('R'));
  await until(()=>nodes(host).length===3&&!root(host).querySelector('.kplex-view-error'),'Production rooted Mind Map absent');
  check(session(host).definition.id==='mindmap'&&session(host).definition.editorHosting==='occurrence','Production definition mismatch');
  if(c.lane==='editor'){
   c.progress={phase:'canonical-branches',cases};
   for(let i=0;i<3;i++)check((await act(host,'branches.expand-generation')).status==='completed','Generation expansion rejected');
   await until(()=>nodes(host).length===9,'Diamond/cycle hierarchy absent');
   const copies=nodes(host).filter(node=>node.dataset.kplexPath===path('B')),references=nodes(host).filter(node=>node.dataset.kplexPath===path('R')&&node.dataset.kplexKeyboardId!=='root');
   check(copies.length===2&&copies[0].dataset.kplexKeyboardId!==copies[1].dataset.kplexKeyboardId&&references.length===2,'Canonical duplicates/cycles lost occurrence identity');
   check(references.every(node=>node.querySelector('.kplex-thought-branch-status')?.textContent===p.translator('mindmap.reference')&&!node.querySelector('.kplex-section-fold-handle')),'Cycles did not terminate as references');
   cases.push({id:'production-diamond-and-terminal-cycle-references'});
   const find=root(host).querySelector('.kplex-find');find.querySelector('button').click();await until(()=>find.querySelector('input'),'Find input absent');const input=find.querySelector('input');Object.getOwnPropertyDescriptor(input.ownerDocument.defaultView.HTMLInputElement.prototype,'value').set.call(input,'B');input.dispatchEvent(new input.ownerDocument.defaultView.Event('input',{bubbles:true}));
   await until(()=>p.actionManager.readSnapshot(surface(host))?.selected?.node.identity===path('B'),'Find did not select B');
   check(!session(host).editors.bindings.length&&host.view.documentSession.centerPath===path('A')&&session(host).layoutRoot(path('A'))===path('R'),'Find opened an editor or rerooted');
   cases.push({id:'find-selects-exact-occurrence-without-activation-or-editor'});find.querySelector('button[aria-label="'+p.translator('find.close')+'"]').click();await until(()=>!find.querySelector('input'),'Find did not dismiss');
   await until(()=>!root(host).querySelector('.kplex-view-error')&&['R','P','Q','B','D'].every(name=>{const scope=p.index.viewScopeCoverage(path(name));return scope.prepared&&!scope.pending}),'Find dismissal frontiers did not settle');
   await act(host,'view.fit');const B1=occurrence('R','P','B'),B2=occurrence('R','Q','B'),camera=root(host).querySelector('.kplex-camera').style.transform;
   await clickNative(()=>nodes(host).find(node=>node.dataset.kplexKeyboardId===B1));await until(()=>session(host).editors.bindings[0]?.occurrenceId===B1&&instance(host)?.view.editor,'Primary click did not open native B1');
   const leaf=instance(host),editor=leaf.view.editor,binding=session(host).editors.bindings[0],content=root(host).querySelector('.kplex-central-editor-content');
   check(leaf.view.file===files.find(file=>file.path===path('B'))&&host.view.documentSession.centerPath===path('B')&&session(host).layoutRoot(path('B'))===path('R'),'Primary activation retargeted root/document');
   check(!nodes(host).find(node=>node.dataset.kplexKeyboardId===B2).querySelector('.kplex-central-editor-placeholder'),'B2 expanded with B1');
   check(root(host).querySelector('.kplex-camera').style.transform===camera,'Primary editor expansion changed camera');
   const capacity=await act(host,'editor.expand',undefined,target('B',B2));check(capacity.status==='unavailable'&&capacity.reasonKey==='actions.editor-capacity','Second occurrence replaced editor');
   p.notifyNavigation(path('C'),host);await until(()=>host.view.documentSession.centerPath===path('C'),'Attention C absent');check(instance(host)===leaf&&leaf.view.editor===editor&&session(host).layoutRoot(path('C'))===path('R'),'Attention retargeted native editor or root');
   cases.push({id:'trusted-primary-B1-editor-retains-root-through-attention-C',capacity:1});
   c.progress={...c.progress,phase:'settle-attention-frontiers'};
   await until(()=>!root(host).querySelector('.kplex-view-error')&&nodes(host).some(node=>node.dataset.kplexKeyboardId===B1)&&['R','P','Q','B','D'].every(name=>{const scope=p.index.viewScopeCoverage(path(name));return scope.prepared&&!scope.pending}),'Current attention/root/editor frontiers did not settle');
   check(root(host).querySelector('.kplex-camera').style.transform===camera,'Attention changed the explicit fitted camera');
   await act(host,'view.pan.right');await act(host,'view.zoom-out');
   const marker='Kplex-219-Mindmap-dirty';content.querySelector('.cm-content').focus();const endLines=editor.getValue().split('\n');editor.replaceRange('\n'+marker+'\n',{line:endLines.length-1,ch:endLines[endLines.length-1].length});const line=editor.getValue().split('\n').findIndex(value=>value.includes(marker));editor.setSelection({line,ch:1},{line,ch:5});
   const dirty=editor.getValue(),selection=JSON.stringify(editor.listSelections()),manualCamera=root(host).querySelector('.kplex-camera').style.transform;check(!(await app.vault.read(leaf.view.file)).includes(marker),'Genuinely dirty editor required');
   c.progress={...c.progress,phase:'dirty-editor-admission'};
   await until(()=>!root(host).querySelector('.kplex-view-error')&&nodes(host).some(node=>node.dataset.kplexKeyboardId===B1)&&['R','P','Q','B','D'].every(name=>{const scope=p.index.viewScopeCoverage(path(name));return scope.prepared&&!scope.pending}),'Dirty editor frontiers did not settle');
   check(!(await app.vault.read(leaf.view.file)).includes(marker),'Dirty editor autosaved before geometry proof');
   check((await act(host,'editor.resize',{bindingId:binding.id,width:660,height:410})).status==='completed','Editor resize rejected');await p.updateCanvasViewSetting('mindmap','horizontalSpacing',200);await p.updateCanvasViewSetting('mindmap','verticalSpacing',60);await wait(100);
   check(instance(host)===leaf&&leaf.view.editor===editor&&root(host).querySelector('.kplex-central-editor-content')===content&&editor.getValue()===dirty&&JSON.stringify(editor.listSelections())===selection&&content.contains(content.ownerDocument.activeElement),'Reflow lost native editing state/focus');
   check(root(host).querySelector('.kplex-camera').style.transform===manualCamera&&session(host).layoutRoot(path('C'))===path('R'),'Geometry changed manual camera or root');
   const rects=nodes(host).map(node=>node.getBoundingClientRect());for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];check(a.right<=b.left+1||b.right<=a.left+1||a.bottom<=b.top+1||b.bottom<=a.top+1,'Measured expanded nodes overlap')}
   const anchor=nodes(host).find(node=>node.dataset.kplexKeyboardId===B1).getBoundingClientRect(),box=root(host).querySelector('.kplex-central-editor-overlay').getBoundingClientRect();check(['left','top','width','height'].every(key=>Math.abs(anchor[key]-box[key])<1),'Native editor anchor/geometry mismatch');
   cases.push({id:'dirty-native-resize-type-reflow-focus-and-nonoverlap'});
   await openPanel(host);const filter=panel(host).querySelector('.kplex-quick-lens-row input');Object.getOwnPropertyDescriptor(filter.ownerDocument.defaultView.HTMLInputElement.prototype,'value').set.call(filter,'Kplex-219-no-match');filter.dispatchEvent(new filter.ownerDocument.defaultView.Event('input',{bubbles:true}));await wait(100);
   check(instance(host)===leaf&&nodes(host).some(node=>node.dataset.kplexKeyboardId===B1)&&!nodes(host).some(node=>node.dataset.kplexKeyboardId===B2),'Filter did not pin only the exact editor ancestry');
   const folded=await act(host,'branch.toggle',undefined,target('P',occurrence('R','P')));check(folded.status==='unavailable'&&folded.reasonKey==='actions.branch-editor-blocked'&&instance(host)===leaf,'Ancestor fold removed live editor');
   const reroot=await act(host,'view.root.selected',undefined,target('C'));check(reroot.status==='unavailable'&&session(host).layoutRoot(path('C'))===path('R'),'Reroot implicitly removed editor');
   await choose(host,'classic');check(session(host).definition.id==='mindmap'&&selector(host).value==='mindmap'&&panel(host).querySelector('[role=status]'),'Blocked selector appeared selected');
   panel(host).querySelector('.kplex-filter-clear').click();root(host).querySelector('.kplex-filter-trigger').click();cases.push({id:'exact-filter-pin-branch-root-and-selector-save-guards'});
   workspace.moveLeafToPopout(host);await until(()=>root(host).ownerDocument!==document&&instance(host)?.view.editor?.getValue().includes(marker),'Dirty native popout migration lost B');await host.view.waitUntilReady();
   check(session(host).layoutRoot(path('C'))===path('R')&&instance(host).view.file.path===path('B'),'Popout retargeted binding/root');
   const parents=[];workspace.iterateRootLeaves(candidate=>{if(candidate!==host&&candidate.view.containerEl.ownerDocument===document&&candidate.view.containerEl.isConnected)parents.push(candidate.parent)});check(parents.length,'Main native parent absent');host.parent.removeChild(host);parents[0].insertChild(parents[0].children.length,host);await workspace.revealLeaf(host);await host.view.waitUntilReady();
   await until(()=>root(host).ownerDocument===document&&instance(host)?.view.editor?.getValue().includes(marker),'Main migration lost B');check((await act(host,'editor.collapse',{bindingId:session(host).editors.bindings[0].id})).status==='completed','Native durable close rejected');
   check((await app.vault.read(files.find(file=>file.path===path('B')))).includes(marker)&&!session(host).editors.bindings.length,'Native close lost edits or retained owner');cases.push({id:'dirty-popout-main-migration-and-durable-collapse'});
   const saved=host.getViewState();await host.setViewState({type:'empty'});await host.setViewState(saved);await host.view.waitUntilReady();await until(()=>session(host).definition.id==='mindmap'&&nodes(host).some(node=>node.dataset.kplexKeyboardId===B1),'Root/folds did not restore');check(session(host).layoutRoot(path('C'))===path('R'),'Restoration followed attention');cases.push({id:'production-root-fold-restoration',applicationRestart:false});
   const rootChoice=[...root(host).querySelectorAll('button[aria-label]')].find(element=>element.getAttribute('aria-label')===p.translator('mindmap.useAttentionRoot'));check(rootChoice,'Explicit outside-attention root control absent');await clickNative(()=>[...root(host).querySelectorAll('button[aria-label]')].find(element=>element.getAttribute('aria-label')===p.translator('mindmap.useAttentionRoot')));await until(()=>session(host).layoutRoot(path('C'))===path('C')&&nodes(host).length===1&&!root(host).querySelector('.kplex-view-error'),'Explicit current-note reroot failed');check(host.view.documentSession.centerPath===path('C'),'Reroot changed attention');cases.push({id:'trusted-explicit-root-from-outside-current-map'});
  }else{
   c.progress={phase:'independent-native-sessions',cases};const other=workspace.getLeaf('tab');hosts.push(other);await other.setViewState({type:'k-plex-react-view',active:true});await other.view.waitUntilReady();other.view.centerPresentation.update({embedCentralNode:false});p.notifyNavigation(path('S'),other);await until(()=>other.view.documentSession.centerPath===path('S'),'Second attention absent');workspace.moveLeafToPopout(other);await until(()=>root(other).ownerDocument!==document,'Actual second popout absent');await other.view.waitUntilReady();
   await workspace.revealLeaf(other);await until(()=>p.documentSession(other)===other.view.documentSession&&!other.view.documentSession.disposed&&root(other).getBoundingClientRect().width>100,'Popout native owner not ready');
   await workspace.revealLeaf(host);await until(()=>{const page=p.index.get(path('A')),scope=p.index.viewScopeCoverage(path('A'));return page?.file===files.find(file=>file.path===path('A'))&&scope.prepared&&!scope.pending},'Main canonical file not prepared');
   await p.openSidecar(host,p.index.get(path('A')));const companion=p.sidecarLeaves.get(host);check(companion,'Owned main Sidecar absent');await companion.loadIfDeferred();await until(()=>companion.view.file?.path===path('A'),'Owned main Sidecar file absent');
   await openPanel(host);await openPanel(other);const firstPanel=panel(host),secondPanel=panel(other),before={root:session(host).layoutRoot(path('A')),camera:root(host).querySelector('.kplex-camera').style.transform,attention:host.view.documentSession.centerPath};
   const newLens=[...firstPanel.querySelectorAll('button[aria-label]')].find(element=>element.getAttribute('aria-label')===p.translator('filter.newLens'));check(newLens,'New lens control absent');newLens.click();await until(()=>firstPanel.querySelector('.kplex-lens-editor input'),'Native lens draft absent');
   const draftName=firstPanel.querySelector('.kplex-lens-editor input');Object.getOwnPropertyDescriptor(draftName.ownerDocument.defaultView.HTMLInputElement.prototype,'value').set.call(draftName,'Owned unsaved Mind Map draft');draftName.dispatchEvent(new draftName.ownerDocument.defaultView.Event('input',{bubbles:true}));const retainedLenses=JSON.stringify(p.settings.graphLenses),retainedHistory=JSON.stringify(p.settings.navigationHistory),retainedFilter=firstPanel.querySelector('.kplex-quick-lens-row input')?.value;
   await workspace.revealLeaf(other);await choose(host,'classic');check(session(other).definition.id==='classic'&&other.view.documentSession.centerPath===path('S'),'Main switch changed popout');
   await workspace.revealLeaf(host);await choose(other,'mindmap');await until(()=>nodes(other).some(node=>node.dataset.kplexPath===path('S'))&&!root(other).querySelector('.kplex-view-error'),'Popout Mind Map absent');await choose(host,'mindmap');
   check(panel(host)===firstPanel&&panel(other)===secondPanel,'Compatible switch remounted shared panel');check(session(host).layoutRoot(path('A'))===before.root&&root(host).querySelector('.kplex-camera').style.transform===before.camera&&host.view.documentSession.centerPath===before.attention,'Other focus changed root/camera/attention');
   check(draftName.isConnected&&draftName.value==='Owned unsaved Mind Map draft'&&JSON.stringify(p.settings.graphLenses)===retainedLenses&&JSON.stringify(p.settings.navigationHistory)===retainedHistory&&firstPanel.querySelector('.kplex-quick-lens-row input')?.value===retainedFilter,'Production switch discarded draft or changed lenses/history/filter');
   check(session(other).layoutRoot(path('S'))===path('S')&&selector(host).value==='mindmap'&&selector(other).value==='mindmap','Owning session choice/root mismatch');
   await choose(other,'classic');check(selector(host).value==='mindmap'&&session(host).layoutRoot(path('A'))===path('R'),'Popout switch changed main');check(p.sidecarLeaves.get(host)===companion&&companion.view.file?.path===path('A')&&!p.sidecarLeaves.get(other),'Selection redirected another canvas Sidecar');cases.push({id:'production-Compass-Mindmap-independent-main-popout-panels-roots-and-Sidecar'});
   firstPanel.querySelector('.kplex-lens-editor-actions button').click();
   await p.closeSidecar(host);
   const saved=[host,other].map(leaf=>({leaf,state:structuredClone(leaf.getViewState()),view:session(leaf).definition.id,root:session(leaf).layoutRoot(leaf.view.documentSession.centerPath),attention:leaf.view.documentSession.centerPath}));
   for(const value of saved){await value.leaf.setViewState({type:'empty'});await value.leaf.setViewState(value.state);await value.leaf.view.waitUntilReady();await until(()=>session(value.leaf).definition.id===value.view&&nodes(value.leaf).length,'Independent owned view did not restore');check(session(value.leaf).layoutRoot(value.attention)===value.root&&value.leaf.view.documentSession.centerPath===value.attention,'Restoration changed root/attention');await openPanel(value.leaf);check(selector(value.leaf).value===value.view,'Restored dropdown does not match actual view')}
   cases.push({id:'production-independent-native-view-restoration',applicationRestart:false});
  }
  c.progress={phase:'complete',cases};return{lane:c.lane,cases,capacity:1,limits:['Native Electron automation; no physical Windows/mobile proof.','Owned native-view restoration is not whole-application restart.','Dedicated M0 FileManager cache-gate limitation remains unproven; no FileManager pass claimed.','Session acceptance preserves a main-window Sidecar; separate fresh-popout Sidecar creation remained empty and is not a passing workflow.']};
 }catch(error){failure=error;c.progress={...c.progress,diagnostic:{preparation:p.index.getSemanticPreparationDiagnostics(),pending:p.index.hasPendingSemanticPreparation(),active:p.index.hasActiveSemanticPreparation(),hosts:hosts.length,files:files.length,views:hosts.map(host=>({attention:host.view.documentSession?.centerPath,root:host.view.documentSession?.plexView?.layoutRoot(host.view.documentSession.centerPath),sidecar:!!p.sidecarLeaves.get(host),sidecarState:p.sidecarLeaves.get(host)?.getViewState(),nativeOwner:p.documentSession(host)===host.view.documentSession,disposed:host.view.documentSession?.disposed,bindings:host.view.documentSession?.plexView?.editors.bindings.map(binding=>({id:binding.id,occurrence:binding.occurrenceId,closing:binding.closing})),failure:root(host)?.querySelector('.kplex-view-error')?.textContent,status:root(host)?.querySelector('.kplex-central-editor-status')?.textContent})),modals:[...document.querySelectorAll('.modal-container')].filter(element=>element.getBoundingClientRect().width).map(element=>element.className)}};throw error}
 finally{
  const errors=[];/** Cleanup does not depend on a live assertion controller and attempts every owned resource. */
  const clean=async(label,action)=>{try{await action();cleanup.push({label,status:'passed'})}catch(error){errors.push(label+': '+String(error));cleanup.push({label,status:'failed'})}c.progress={...c.progress,cleanup}};
  for(const restore of restores.reverse())await clean('restore-native-wrapper',restore);
  for(const host of hosts.reverse())await clean('close-owned-host',async()=>{if(workspace.getLeafById(host.id)===host){await p.closeSidecar(host);host.detach()}});
  for(const release of releases.reverse())await clean('release-demand',release);
  p.settings=original;await clean('restore-live-settings',()=>p.saveSettings(false,false));p.savedSettingsPolicy=policy;
  await clean('restore-workspace',()=>workspace.changeLayout(layout));await clean('restore-native-document-sessions',()=>sessions.restore(owners));await new Promise(resolve=>window.setTimeout(resolve,500));
  for(const file of files.reverse())if(app.vault.getFileByPath(file.path)===file)await clean('delete-owned-file',()=>app.vault.delete(file,true));
  if(createdFolder&&app.vault.getFolderByPath(folder)===createdFolder&&!createdFolder.children.length)await clean('delete-owned-folder',()=>app.vault.delete(createdFolder,true));
  await clean('drain-settings',()=>p.settingsWriteQueue);await clean('restore-settings-bytes',()=>app.vault.adapter.write(p.manifest.dir+'/data.json',c.originalData));
  if(errors.length)throw Error((failure?String(failure)+'; ':'')+errors.join('; '));
 }
}

if(process.env.KPLEX_TEST_VAULT_NAME!=='kplex-test-small')throw Error('Explicit Small required');
const lane=process.env.KPLEX_MINDMAP_LANE??'editor';if(!['editor','sessions'].includes(lane))throw Error('Expected editor or sessions lane');
const target=validateTarget({vaultName:process.env.KPLEX_TEST_VAULT_NAME,vaultPath:process.env.KPLEX_TEST_VAULT_PATH,configDir:process.env.KPLEX_TEST_CONFIG_DIR});
const definitions='c.lane='+JSON.stringify(lane)+';c.originalData='+JSON.stringify(readFileSync(join(target.pluginDir,'data.json'),'utf8'))+';c.documentSessions=('+nativeDocumentSessions.toString()+');';
await runControlledProbe('mindmap-219-'+lane,scenario,definitions,['src/application/PlexHierarchyDemand.ts','src/application/PlexViewSession.ts','src/ui/PlexGraph.tsx','src/ui/ThoughtNode.tsx','src/ui/plexViews/prepareScene.ts','src/ui/plexViews/useHierarchyDemand.ts','src/core/plex/views/mindmap/definition.ts','src/core/plex/views/mindmap/projection.ts','src/core/plex/views/mindmap/layout.ts','src/ui/plexViews/mindmap/settings.ts','scripts/testing/obsidian/mindMap.mjs','scripts/testing/obsidian/nativeDocumentSessions.mjs'],{maximumMs:240000});
