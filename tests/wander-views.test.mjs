/** Issue221: real renderer/controller navigation across each registered canvas policy and the
 * public example, with prepared local incidence and intentionally incomplete gate counts. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {chromiumHarness} from './support/browserTypeScript.mjs';
import {plexViewBrowserModules} from './support/plexViewBrowser.mjs';
const output=await plexViewBrowserModules();
const initialize=`
const M=sourceModules,check=(value,message)=>{if(!value)throw Error(message)},wait=()=>new Promise(resolve=>setTimeout(resolve,70));
const style=document.createElement('style');style.textContent=${JSON.stringify(readFileSync('styles.css','utf8'))};document.head.append(style);
const pages=new Map(['A.md','B.md','C.md'].map(path=>[path,{path,name:path,file:{path,name:path,extension:'md',basename:path,stat:{mtime:1,ctime:1,size:1}},url:null,isFolder:false,isTag:false,aliases:[],tags:[],styleTags:[],primaryStyleTag:null,noteType:null,maxLabelLength:30,neighbours:new Map()}]));
const work={acquisitions:0,releases:0,properties:0,body:0,scans:0,gateReads:0},events=new Set(),subscribe=fn=>{events.add(fn);return()=>events.delete(fn)};
const nativeEvents={on:(name,callback)=>{const ref={name,callback};events.add(ref);return ref},offref:ref=>events.delete(ref)};
let prepared=true,visible=true;
const settings=M.migrateAndMergeSettings({animationSpeed:0,allowAutozoom:false,embedCentralNode:false,showFolderNodes:false,showTagNodes:false,groupRelations:false});
const rows=(page,role)=>(page.path==='A.md'&&role==='child'?['B.md','C.md']:page.path!=='A.md'&&role==='parent'?['A.md']:[])
 .map(path=>({page:pages.get(path),role,relationType:1,typeDefinition:'Related',linkDirection:1}));
const unavailableCounts=()=>{work.gateReads++;return Object.fromEntries(['top','bottom','left','right'].map(side=>[side,{visibleCount:0,hasAny:false,complete:false,coverage:'cached',countUnavailable:true}]))};
const index={isVisiblePage:()=>true,get:path=>pages.get(path),titleFor:page=>page.name,neighbours:rows,sortNeighbours:rows=>rows,
 captureSemanticGateRead:()=>({isCurrent:()=>true,read:()=>new Map()}),viewScopeCoverage:()=>({coverage:prepared?'local':'cached',prepared,complete:false,pending:!prepared}),
 acquireSemanticDemand:()=>{work.acquisitions++;return()=>work.releases++},acquirePresentationDemand:()=>()=>{},getNodeVisualRevision:()=>0,resolveNodeVisuals:async()=>new Map(),invalidateNodeVisual:()=>{},
 gateStats:unavailableCounts,neighbourCount:()=>0,subscribe,subscribePresentation:subscribe,visibleRelationshipsWithin:()=>[],explainRelationship:()=>null,
 getNeighborhood:path=>({center:pages.get(path),parents:rows(pages.get(path),'parent'),children:rows(pages.get(path),'child'),leftFriends:[],rightFriends:[],siblings:[]})};
const plugin={settings,index,viewSettingsRegistry:M.builtInCanvasViewSettings,translator:M.createTranslator('en'),app:{workspace:{...nativeEvents},
 metadataCache:{...nativeEvents,getFileCache:()=>{work.properties++;return{frontmatter:{phase:'water'}}}},vault:{getFileByPath:path=>pages.get(path)?.file??null,cachedRead:()=>{work.body++;throw Error('Unexpected body read')},getMarkdownFiles:()=>{work.scans++;throw Error('Unexpected inventory')}}},
 saveSettings:async()=>{},getTypographyDevice:()=> 'desktop',isKplexLeafVisible:()=>visible,subscribeKplexVisibility:subscribe,subscribeNodeFlair:subscribe,
 getHierarchyColorRevision:()=>0,isActionSurfaceCurrent:()=>true,getSavedSettingsPolicy:()=>null};
plugin.actionManager=new M.ActionManager({readCommandContext:()=>({sharedCenter:null,focusRegion:'graph'}),validateNode:()=>true});
const mount=async definition=>{
 const registry=new M.PlexViewRegistry([...M.builtInPlexViews.available,M.exampleViewDefinition]),session=new M.PlexViewSession(registry,()=>{});session.select(definition.id);
 const container=document.createElement('div');container.className='kplex-app';container.style.cssText='width:1200px;height:900px;position:relative';document.body.append(container);
 const root=M.createRoot(container),ports={current:null},moves=[];
 const props={plugin,index,settings,paintSettings:settings,paintLenses:{lenses:[]},surface:'leaf',hostLeaf:{},predicate:null,lenses:{lenses:[]},filterLayoutMode:'keep',predicateRevision:0,
 showCrossLinks:true,activePath:'A.md',renderRevision:0,semanticRevision:0,findFocusRequest:0,areaSettingsMode:false,onAreaSettingsModeChange:()=>{},onApplyFindFilter:()=>{},appliedFindFilterQuery:null,onClearFindFilter:()=>{},
 onActivate:()=>{},onWanderActivate:page=>{moves.push(page.path);props.activePath=page.path;render()},onOpen:()=>{},onOpenInSidecar:async()=>{},onCentralNodeEditorChange:()=>{},onCentralNodeModeChange:()=>{},
 actionPorts:ports,actionSurfaceId:'wander-'+definition.id,displayState:{zen:false,fullscreen:false},fullscreenAvailable:false,sidecarOpen:false,viewDefinition:definition,viewSession:session,viewRevision:session.getSnapshot()};
 const render=()=>{props.viewRevision=session.getSnapshot();M.flushSync(()=>root.render(M.createElement(M.PlexGraph,props)))};render();await wait();await wait();
 return{container,ports,session,props,moves,render,close:()=>{M.flushSync(()=>root.unmount());session.dispose();container.remove()}};
};
`;

test('Wander starts, highlights and navigates with local proof in Compass, Mind Map, Wu Xing and the public example',async()=>{
 const host=await chromiumHarness(output.outputFiles[0].text+';window.sourceModules=sourceModules;');
 try{assert.equal(await host.evaluate(`(async()=>{${initialize}
 for(const definition of [...M.builtInPlexViews.available,M.exampleViewDefinition]){
  const ui=await mount(definition),initial=ui.ports.current.readWanderScene();
  check(initial.center==='A.md'&&initial.candidates.length>0,'Displayed canonical candidates '+definition.id);
  check(initial.ready,'Prepared local scene with unavailable numerical gate counts must be ready: '+definition.id);
  prepared=false;check(!ui.ports.current.readWanderScene().ready,'Unprepared attention must wait '+definition.id);prepared=true;
  visible=false;check(!ui.ports.current.readWanderScene().ready,'Hidden native canvas cannot navigate '+definition.id);visible=true;
  const acquisitions=work.acquisitions,gateReads=work.gateReads;
  for(let i=0;i<50;i++)check(ui.ports.current.readWanderScene().ready,'Read-only readiness '+definition.id);
  check(work.acquisitions===acquisitions&&work.gateReads===gateReads,'Polls cannot acquire or query gate counts '+definition.id);
  let now=0,scheduled=null,zen=false;const controller=new M.WanderController({
   readScene:()=>ui.ports.current.readWanderScene(),highlight:d=>ui.ports.current.highlightWander(d),clear:()=>ui.ports.current.clearWander(),
   navigate:d=>ui.ports.current.navigateWander(d),readZen:()=>zen,setZen:value=>{zen=value},now:()=>now,random:()=>0,
   schedule:(callback,delay)=>{const entry={callback,at:now+delay};scheduled=entry;return()=>{if(scheduled===entry)scheduled=null}}});
  controller.start();const tick=()=>{const next=scheduled;check(next,'One owned timer '+definition.id);scheduled=null;now=next.at;M.flushSync(()=>next.callback())};
  tick();check(ui.container.querySelector('.is-keyboard-selected'),'Real shared selection '+definition.id);
  tick();check(ui.moves.length===1&&ui.moves[0]!=='A.md','Accepted navigation '+definition.id);await wait();await wait();
  check(ui.ports.current.readWanderScene().center===ui.moves[0],'Attention follows navigation '+definition.id);
  check(ui.ports.current.readWanderScene().ready,'Ready after navigation '+definition.id);tick();check(controller.getSnapshot().phase==='playing','Arrival completes '+definition.id);
  if(definition.navigation==='rooted')check(ui.session.layoutRoot(ui.moves[0])==='A.md','Wander retains rooted policy');
  controller.stop();check(!zen&&scheduled===null,'Stop restores Zen/timer '+definition.id);controller.dispose();ui.close();
 }
 check(work.body===0&&work.scans===0,'No body reads or vault scans');return true})()`),true)}finally{await host.cleanup()}
});
