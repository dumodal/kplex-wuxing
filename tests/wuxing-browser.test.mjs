/** Actual production Wu Xing/shared canvas mounts in Chromium. Native editor behavior is covered separately in the exact-build Windows lane. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {chromiumHarness} from './support/browserTypeScript.mjs';
import {plexViewBrowserModules} from './support/plexViewBrowser.mjs';
const output=await plexViewBrowserModules();

test('production Wu Xing decorates real local notes, refreshes cached fields, retains shared Find/actions/grouping and retires listeners',async()=>{
 const host=await chromiumHarness(output.outputFiles[0].text+';window.sourceModules=sourceModules;');
 try{
 const result=await host.evaluate(`(async()=>{
 const M=sourceModules,errors=[],check=(value,message)=>{if(!value)throw Error(message)},wait=()=>new Promise(resolve=>setTimeout(resolve,50));
 window.addEventListener('error',event=>errors.push(event.message));
 const style=document.createElement('style');style.textContent=${JSON.stringify(readFileSync('styles.css','utf8'))};document.head.append(style);
 const mount=document.createElement('div');mount.className='kplex-app';mount.style.cssText='width:1200px;height:900px;position:relative';document.body.append(mount);
 const pages=new Map(['Focus.md','Concept.md','Concept2.md','Conflict.md','Unknown.md','Missing.md'].map(path=>[path,{path,name:path,file:{path,name:path,extension:'md',basename:path,stat:{mtime:1,ctime:1,size:1}},url:null,isFolder:false,isTag:false,aliases:[],tags:[],styleTags:[],primaryStyleTag:null,noteType:null,maxLabelLength:30,neighbours:new Map()}]));
 const fields=new Map([['Focus.md',{phase:'water'}],['Concept.md',{phase:'wood'}],['Concept2.md',{phase:'wood'}],['Conflict.md',{phase:['fire','earth']}],['Unknown.md',{}]]);
 const caches=new Map([...fields].map(([id,frontmatter])=>[id,{frontmatter}])),work={semantic:0,releases:0,presentation:0,reads:0,parses:0,publishes:0,settingsWrites:0},events=new Set();
 const subscribe=fn=>{events.add(fn);return()=>events.delete(fn)},nativeEvents={on:(name,callback)=>{const ref={name,callback};events.add(ref);return ref},offref:ref=>events.delete(ref)};
 const settings=M.migrateAndMergeSettings({animationSpeed:0,graphDepth:1,allowAutozoom:false,embedCentralNode:false,showFolderNodes:false,showTagNodes:false});
 const gate=()=>({top:{visibleCount:0,hasAny:false,complete:true},bottom:{visibleCount:5,hasAny:true,complete:true},left:{visibleCount:0,hasAny:false,complete:true},right:{visibleCount:0,hasAny:false,complete:true}});
 const index={isVisiblePage:()=>true,get:path=>pages.get(path),titleFor:page=>page.name,
 neighbours:(page,role)=>page.path==='Focus.md'&&role==='child'?[...pages.values()].slice(1).map(page=>({page,role,relationType:1,typeDefinition:'Related',linkDirection:1})):[],
 sortNeighbours:rows=>[...rows].sort((a,b)=>a.page.path.localeCompare(b.page.path)),captureSemanticGateRead:()=>({isCurrent:()=>true,read:()=>new Map()}),
 acquireSemanticDemand:()=>{work.semantic++;return()=>work.releases++},acquirePresentationDemand:()=>{work.presentation++;return()=>work.presentation--},
 getNodeVisualRevision:()=>0,resolveNodeVisuals:async()=>new Map(),invalidateNodeVisual:()=>{},gateStats:gate,neighbourCount:()=>0,subscribe,subscribePresentation:subscribe,
 getNeighborhood:()=>({center:pages.get('Focus.md'),parents:[],children:[],leftFriends:[],rightFriends:[],siblings:[]}),visibleRelationshipsWithin:()=>[],explainRelationship:()=>null};
 const session=new M.PlexViewSession(M.builtInPlexViews,()=>{});session.select('wuxing');
 const plugin={settings,index,translator:M.createTranslator('en'),app:{workspace:{...nativeEvents},metadataCache:{...nativeEvents,getFileCache:file=>caches.get(file.path)??null},vault:{getFileByPath:path=>pages.get(path)?.file??null,cachedRead:()=>{work.reads++;throw Error('Unexpected body read')}}},
 saveSettings:()=>{work.settingsWrites++;throw Error('Unexpected settings write')},getTypographyDevice:()=> 'desktop',isKplexLeafVisible:()=>true,subscribeKplexVisibility:subscribe,subscribeNodeFlair:subscribe,getHierarchyColorRevision:()=>0,isActionSurfaceCurrent:()=>true,getSavedSettingsPolicy:()=>null};
 plugin.actionManager=new M.ActionManager({readCommandContext:()=>({sharedCenter:null,focusRegion:'graph'}),validateNode:()=>true});
 const actionPorts={current:null},activations=[],props={plugin,index,settings,paintSettings:settings,paintLenses:{lenses:[]},surface:'leaf',hostLeaf:{},predicate:null,lenses:{lenses:[]},filterLayoutMode:'keep',predicateRevision:0,showCrossLinks:true,activePath:'Focus.md',renderRevision:0,semanticRevision:0,findFocusRequest:0,areaSettingsMode:false,onAreaSettingsModeChange:()=>{},onApplyFindFilter:()=>{},appliedFindFilterQuery:null,onClearFindFilter:()=>{},onActivate:page=>activations.push(page.path),onWanderActivate:()=>{},onOpen:()=>{},onOpenInSidecar:async()=>{},onCentralNodeEditorChange:()=>{},onCentralNodeModeChange:()=>{},actionPorts,actionSurfaceId:'wuxing',displayState:{zen:false,fullscreen:false},fullscreenAvailable:false,sidecarOpen:false,viewSession:session};
 const relationshipWrites=[];plugin.openRelationModal=request=>relationshipWrites.push(request);
 const root=M.createRoot(mount);function Harness(){const revision=M.useSyncExternalStore(session.subscribe,session.getSnapshot);return M.createElement(M.PlexGraph,{...props,viewDefinition:session.definition,viewRevision:revision})}
 const render=()=>M.flushSync(()=>root.render(M.createElement(Harness)));render();await wait();
 const getNode=path=>[...mount.querySelectorAll('[data-kplex-keyboard-id]')].find(node=>node.dataset.kplexPath===path),region=id=>mount.querySelector('[data-kplex-decoration="wuxing.'+id+'"]');
 check(!mount.querySelector('.kplex-view-error'),'Actual Wu Xing scene failed');check(mount.querySelectorAll('.kplex-view-region').length===8,'Five phases plus reachable unclassified statuses');
 check(region('water').textContent.includes('1 shown locally')&&region('wood').textContent.includes('2 shown locally'),'Local counts and fixed attention');
 check(region('conflicting').textContent.includes('1 shown locally')&&region('unavailable').textContent.includes('1 shown locally'),'Conflict and metadata absence stay distinct');
 check(mount.querySelectorAll('.kplex-view-guide').length===5,'Decorative guides rendered');check(getComputedStyle(mount.querySelector('.kplex-view-decorations')).pointerEvents==='none','Decorations cannot capture input');
 const attention=getNode('Focus.md'),beforeTop=attention.style.top,camera=mount.querySelector('.kplex-camera').style.transform;
 const viewportBounds=mount.querySelector('.kplex-plex').getBoundingClientRect(),attentionBounds=attention.getBoundingClientRect();
 check(Math.abs(attentionBounds.x+attentionBounds.width/2-viewportBounds.x-viewportBounds.width/2)<3&&Math.abs(attentionBounds.y+attentionBounds.height/2-viewportBounds.y-viewportBounds.height/2)<3,'Autozoom-off navigation must center the off-origin attention occurrence');
 // Use the real shared drag/drop handlers and native adapter, with a finite host drag manager.
 const manager={draggable:null,dragLink:(event,linktext,sourcePath,title,source)=>{event.dataTransfer.setData('text/plain',linktext);return {type:'link',linktext,sourcePath,title,source,file:pages.get(linktext)?.file??null}},onDragStart(event,value){this.draggable=value},onDragEnd(){this.draggable=null}};
 plugin.app.dragManager=manager;const outbound=new DataTransfer();attention.dispatchEvent(new DragEvent('dragstart',{bubbles:true,cancelable:true,dataTransfer:outbound}));
 check(manager.draggable?.source?.node?.path==='Focus.md'&&manager.draggable.source.owner===mount.querySelector('.kplex-plex'),'Wu Xing exports through the shared captured payload owner');
 check(outbound.getData('text/plain')==='Focus.md','Native link payload retains the canonical file');attention.dispatchEvent(new DragEvent('dragend',{bubbles:true,dataTransfer:outbound}));check(manager.draggable===null,'Shared export cleanup retires only its drag');
 const drop=(x,y)=>{const target=document.elementFromPoint(x,y);check(target&&mount.contains(target),'Drop must hit the actual owning canvas');const dataTransfer=new DataTransfer();for(const type of ['dragover','drop'])target.dispatchEvent(new DragEvent(type,{bubbles:true,cancelable:true,dataTransfer,clientX:x,clientY:y}))};
 const concept=pages.get('Concept.md');for(const payload of [{type:'file',file:concept.file},{type:'link',file:concept.file,linktext:concept.path,sourcePath:'Focus.md'}]){
  manager.draggable=payload;drop(attentionBounds.x+attentionBounds.width/2,attentionBounds.y+attentionBounds.height/2);await wait();check(activations.at(-1)==='Concept.md','Shared file/link center drop navigates attention');
 }
 const afterDropNavigation=activations.length,phaseBounds=region('water').querySelector('rect').getBoundingClientRect();drop(phaseBounds.x+24,phaseBounds.y+20);await wait();
 check(activations.length===afterDropNavigation&&relationshipWrites.length===0,'A classification phase cannot navigate, assign status or write a relationship');manager.draggable=null;
 fields.get('Focus.md').phase='fire';for(const ref of [...events])if(ref?.name==='changed')ref.callback(pages.get('Focus.md').file);await wait();
 check(getNode('Focus.md')===attention,'Cached reclassification retained occurrence DOM identity');check(attention.style.top!==beforeTop,'Cached property event moved the phase anchor');check(mount.querySelector('.kplex-camera').style.transform===camera,'Property event preserved manual camera');
 check(region('fire').textContent.includes('1 shown locally'),'Reclassification updates counts');
 const before={...work},state=JSON.stringify(session.getState());
 settings.canvasViewSettings=M.editViewConfiguration(M.wuXingViewDefinition,settings.canvasViewSettings,'waterLabel','記憶 / Memory');settings.canvasViewSettings=M.editViewConfiguration(M.wuXingViewDefinition,settings.canvasViewSettings,'guides',false);props.settings={...settings};props.paintSettings=props.settings;render();await wait();
 check(region('water').textContent.includes('記憶 / Memory')&&!mount.querySelector('.kplex-view-guide'),'Type configuration reaches production decoration');check(JSON.stringify(session.getState())===state,'Type settings do not overwrite per-canvas state');check(JSON.stringify(work)===JSON.stringify(before),'Presentation settings do no extra source work');
 const releaseAction=plugin.actionManager.registerSurface({id:'wuxing',generation:1,get implementations(){return actionPorts.current.implementations},readSnapshot:()=>({mounted:true,visible:true,windowId:'test',center:M.actionNodeRef(pages.get('Focus.md')),selected:actionPorts.current.readSelected(),focusRegion:'graph',interactionRevision:0,viewRevision:session.getSnapshot()})});
 const act=async id=>{let promise;M.flushSync(()=>promise=plugin.actionManager.dispatch({id,source:'local-menu',surfaceId:'wuxing'}));const outcome=await promise;await wait();return outcome};
 await act('selection.center');check(actionPorts.current.readSelected().node.path==='Focus.md','Shared keyboard attention selection');await act('selection.move.right');check(activations.length===afterDropNavigation,'Selection does not activate or retarget a document');
 const find=mount.querySelector('.kplex-find');M.flushSync(()=>find.querySelector('button').click());const input=find.querySelector('input');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'Concept');M.flushSync(()=>input.dispatchEvent(new Event('input',{bubbles:true})));await wait();check(find.textContent.includes('2'),'Shared Find searches admitted Wu Xing notes');
 settings.groupRelations=true;props.settings={...settings};props.paintSettings=props.settings;render();await wait();check(mount.querySelector('.kplex-thought.is-relation-group'),'Shared grouping remains phase-scoped');
 const savedCamera=mount.querySelector('.kplex-camera').style.transform;M.flushSync(()=>session.select('classic'));await wait();M.flushSync(()=>session.select('wuxing'));await wait();check(mount.querySelector('.kplex-camera').style.transform===savedCamera,'View switch restores Wu Xing camera');
 check(!mount.querySelector('.kplex-view-error'),'Switch back to production Wu Xing succeeded');
 releaseAction();root.unmount();session.dispose();plugin.actionManager.dispose();style.remove();mount.remove();return {errors,events:events.size,work};
 })()`);
 assert.deepEqual(result.errors,[]);assert.equal(result.events,0);assert.equal(result.work.reads,0);assert.equal(result.work.parses,0);assert.equal(result.work.publishes,0);assert.equal(result.work.settingsWrites,0);assert.equal(result.work.semantic,result.work.releases);assert.equal(result.work.presentation,0);
 }finally{await host.cleanup()}
});
