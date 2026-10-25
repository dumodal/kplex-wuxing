/** Actual production Wu Xing/shared canvas mounts in Chromium. Native editor behavior is covered separately in the exact-build Windows lane. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {chromiumHarness} from './support/browserTypeScript.mjs';
import {plexViewBrowserModules} from './support/plexViewBrowser.mjs';
import {canvasSceneFixture} from './support/canvasSceneFixture.mjs';
const output=await plexViewBrowserModules();

test('Facets production presets share captured controls, measured badges and live native colors independently',async()=>{
 const host=await chromiumHarness(output.outputFiles[0].text+';window.sourceModules=sourceModules;');
 try{assert.equal(await host.evaluate(`(async()=>{${canvasSceneFixture}
 document.body.className='theme-dark';document.body.style.cssText='--background-primary:#181818;--background-secondary:#282828;--text-normal:#eeeeee;--text-muted:#999999;--color-blue:#1144bb;--color-green:#33aa66;--color-red:#cc2233;--color-orange:#dd8833;--color-purple:#aa55ee;--color-cyan:#22bbcc;--color-yellow:#dddd22';
 const a=await mount(M.wuXingViewDefinition),b=await mount(M.wuXingViewDefinition),beforeB=JSON.stringify(b.session.getState());
 const controller=new M.CanvasViewContributionController(a.session,M.builtInCanvasViewSettings,{settings:()=>settings.canvasViewSettings,mounted:()=>a.container.isConnected,
 beforePresentationChange:()=>a.ports.current.preparePresentationChange(),update:()=>{throw Error('Unexpected type write')},openSettings:()=>true,failed:error=>{throw error}});
 const node=()=>[...a.container.querySelectorAll('[data-kplex-keyboard-id]')].find(row=>row.dataset.kplexPath==='A.md'),original=node(),bounds=()=>({top:original.style.top,left:original.style.left});
 const position=bounds(),camera=a.container.querySelector('.kplex-camera').style.transform;
 for(const [preset,count] of [['ace',3],['para',4],['wuxing',5],['gtd',6],['eaccess',7]]){
   const choice=controller.choices()[0];check(choice.options.length===5,'All templates exposed by shared choices');
   check((await choice.options.find(option=>option.id===preset).command.run()).status==='completed','Captured preset action accepted');a.render();await wait();
   const categories=[...a.container.querySelectorAll('[data-kplex-decoration]')].filter(row=>JSON.parse(row.dataset.kplexDecoration)[2]==='category');
   check(categories.length===count,'Exactly the selected preset categories render');check(node()===original,'Preset changes retain attention DOM identity');
   check(JSON.stringify(bounds())===JSON.stringify(position),'Attention remains centered through preset changes');
   check(a.container.querySelector('.kplex-camera').style.transform===camera,'Preset change preserves manual camera');
   const context={viewId:'wuxing',state:a.session.state,configuration:{status:'available',values:settings.canvasViewSettings.wuxing?.values??{}}};
   const controls=M.builtInCanvasViewSettings.layoutControls(M.wuXingViewDefinition,context);check(controls.length===5&&controls.every(control=>control.field==='presets'&&control.path[0]===preset),'Shared rails address only the selected preset');
   check(JSON.stringify(b.session.getState())===beforeB,'Other canvas retains independent selection');
 }
 check(b.container.querySelector('.kplex-node-badge').textContent==='Water','Other canvas retains its own badge');
 check((await controller.capture({kind:'state',action:{id:'preset.select',args:'wuxing'}}).run()).status==='completed','Return to Wu Xing');a.render();await wait();
 const badge=node().querySelector('.kplex-node-badge');check(getComputedStyle(badge).color==='rgb(255, 255, 255)','Dark fill chooses readable white text');
 document.body.style.setProperty('--color-blue','#ffff88');await wait();await wait();
 check(getComputedStyle(badge).color==='rgb(0, 0, 0)','Live theme change chooses readable black text');
 const region=[...a.container.querySelectorAll('[data-kplex-decoration]')].find(row=>row.dataset.kplexDecoration===JSON.stringify(['facets','wuxing','category','water']));
 check(getComputedStyle(region.querySelector(':scope > rect')).fill==='rgb(255, 255, 136)','Region resolves configured native color through the shared scope');
 const before={body:work.body,scans:work.scans,acquisitions:work.acquisitions};for(let i=0;i<25;i++)a.ports.current.readWanderScene();
 check(work.body===before.body&&work.scans===before.scans&&work.acquisitions===before.acquisitions,'Presentation and repeated Wander reads acquire no extra source work');
 controller.dispose();a.close();b.close();plugin.actionManager.dispose();check(events.size===0,'Exact shared subscriptions retire');style.remove();return true;
})()`),true)}finally{await host.cleanup()}
});

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
 const plugin={settings,index,viewSettingsRegistry:M.builtInCanvasViewSettings,translator:M.createTranslator('en'),app:{workspace:{...nativeEvents},metadataCache:{...nativeEvents,getFileCache:file=>caches.get(file.path)??null},vault:{getFileByPath:path=>pages.get(path)?.file??null,cachedRead:()=>{work.reads++;throw Error('Unexpected body read')}}},
 saveSettings:()=>{work.settingsWrites++;throw Error('Unexpected settings write')},getTypographyDevice:()=> 'desktop',isKplexLeafVisible:()=>true,subscribeKplexVisibility:subscribe,subscribeNodeFlair:subscribe,getHierarchyColorRevision:()=>0,isActionSurfaceCurrent:()=>true,getSavedSettingsPolicy:()=>null};
 plugin.actionManager=new M.ActionManager({readCommandContext:()=>({sharedCenter:null,focusRegion:'graph'}),validateNode:()=>true});
 const actionPorts={current:null},activations=[],props={plugin,index,settings,paintSettings:settings,paintLenses:{lenses:[]},surface:'leaf',hostLeaf:{},predicate:null,lenses:{lenses:[]},filterLayoutMode:'keep',predicateRevision:0,showCrossLinks:true,activePath:'Focus.md',renderRevision:0,semanticRevision:0,findFocusRequest:0,areaSettingsMode:false,onAreaSettingsModeChange:()=>{},onApplyFindFilter:()=>{},appliedFindFilterQuery:null,onClearFindFilter:()=>{},onActivate:page=>activations.push(page.path),onWanderActivate:()=>{},onOpen:()=>{},onOpenInSidecar:async()=>{},onCentralNodeEditorChange:()=>{},onCentralNodeModeChange:()=>{},actionPorts,actionSurfaceId:'wuxing',displayState:{zen:false,fullscreen:false},fullscreenAvailable:false,sidecarOpen:false,viewSession:session};
 const relationshipWrites=[];plugin.openRelationModal=request=>relationshipWrites.push(request);
 const root=M.createRoot(mount);function Harness(){const revision=M.useSyncExternalStore(session.subscribe,session.getSnapshot);return M.createElement(M.PlexGraph,{...props,viewDefinition:session.definition,viewRevision:revision})}
 const render=()=>M.flushSync(()=>root.render(M.createElement(Harness)));render();await wait();
 const getNode=path=>[...mount.querySelectorAll('[data-kplex-keyboard-id]')].find(node=>node.dataset.kplexPath===path),region=id=>[...mount.querySelectorAll('[data-kplex-decoration]')].find(row=>row.dataset.kplexDecoration===JSON.stringify(['facets','wuxing',['water','wood','fire','earth','metal'].includes(id)?'category':'status',id]));
 check(!mount.querySelector('.kplex-view-error'),'Actual Wu Xing scene failed');check(mount.querySelectorAll('.kplex-view-region').length===8,'Five phases plus reachable unclassified statuses '+JSON.stringify({errors,regions:mount.querySelectorAll('.kplex-view-region').length,text:mount.textContent.slice(0,900)}));
 check(region('water').textContent.includes('0 shown locally')&&getNode('Focus.md').querySelector('.kplex-node-badge').textContent==='Water'&&region('wood').textContent.includes('2 shown locally'),'Local counts and fixed attention');
 check(region('conflicting').textContent.includes('1 shown locally')&&region('unresolved').textContent.includes('1 shown locally'),'Conflict and metadata absence stay distinct');
 check(mount.querySelectorAll('.kplex-view-guide').length===5,'Decorative guides rendered');check(getComputedStyle(mount.querySelector('.kplex-view-decorations')).pointerEvents==='none','Decorations cannot capture input');
 const releaseAction=plugin.actionManager.registerSurface({id:'wuxing',generation:1,get implementations(){return actionPorts.current.implementations},readSnapshot:()=>({mounted:true,visible:true,windowId:'test',center:M.actionNodeRef(pages.get('Focus.md')),selected:actionPorts.current.readSelected(),focusRegion:'graph',interactionRevision:0,viewRevision:session.getSnapshot()})});
 const act=async id=>{let promise;M.flushSync(()=>promise=plugin.actionManager.dispatch({id,source:'local-menu',surfaceId:'wuxing'}));const outcome=await promise;await wait();return outcome};
 const zoomAnchor=()=>{const b=getNode('Focus.md').getBoundingClientRect();return{x:b.x+b.width/2,y:b.y+b.height/2}};
 const zoomBefore=zoomAnchor();await act('view.zoom-in');await wait();const zoomAfter=zoomAnchor();
 check(Math.abs(zoomAfter.x-zoomBefore.x)<1&&Math.abs(zoomAfter.y-zoomBefore.y)<1,'Shared zoom must preserve the off-origin viewport focus');
 await act('view.zoom-out');await wait();
 const attention=getNode('Focus.md'),beforeTop=attention.style.top;let camera=mount.querySelector('.kplex-camera').style.transform;
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
 await act('view.fit');await wait();camera=mount.querySelector('.kplex-camera').style.transform;const afterDropNavigation=activations.length,phaseBounds=region('water').querySelector(':scope > rect').getBoundingClientRect();drop(phaseBounds.x+24,phaseBounds.y+20);await wait();
 check(activations.length===afterDropNavigation&&relationshipWrites.length===0,'A classification phase cannot navigate, assign status or write a relationship');manager.draggable=null;
 fields.get('Focus.md').phase='fire';for(const ref of [...events])if(ref?.name==='changed')ref.callback(pages.get('Focus.md').file);await wait();
 check(getNode('Focus.md')===attention,'Cached reclassification retained occurrence DOM identity');check(attention.style.top===beforeTop&&attention.querySelector('.kplex-node-badge').textContent==='Fire','Cached property event updated the centered badge without moving attention');check(mount.querySelector('.kplex-camera').style.transform===camera,'Property event preserved manual camera');
 check(region('fire').textContent.includes('0 shown locally'),'Attention is not duplicated in category counts');
 const before={...work},state=JSON.stringify(session.getState());
 settings.canvasViewSettings=M.editViewConfigurationAt(M.wuXingViewDefinition,settings.canvasViewSettings,{field:'presets',path:['wuxing','categories','water','label']},{kind:'set',value:'記憶 / Memory'});settings.canvasViewSettings=M.editViewConfigurationAt(M.wuXingViewDefinition,settings.canvasViewSettings,{field:'presets',path:['wuxing','guides']},{kind:'set',value:false});props.settings={...settings};props.paintSettings=props.settings;render();await wait();
 check(region('water').textContent.includes('記憶 / Memory')&&!mount.querySelector('.kplex-view-guide'),'Type configuration reaches production decoration');check(JSON.stringify(session.getState())===state,'Type settings do not overwrite per-canvas state');check(JSON.stringify(work)===JSON.stringify(before),'Presentation settings do no extra source work');
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
