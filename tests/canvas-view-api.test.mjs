/** Public policy/UI exports, measured canonical scenes and captured contribution lifetimes.
 * Native Menu rendering and the real queued writer have separate browser/native coverage. */
import assert from 'node:assert/strict';
import test from 'node:test';
import {plexViewModules,viewPage} from './support/plexViewFixture.mjs';
const M=await plexViewModules(['src/core/plex/views/index.ts','src/core/plex/views/example.ts',
  'src/application/PlexViewSession.ts','src/ui/plexViews/settingsContributions.ts','src/ui/plexViews/example.ts',
  'src/ui/plexViews/CanvasViewContributionController.ts','src/ui/plexViews/contributionValidation.ts',
  'src/ui/plexViews/prepareScene.ts','src/ui/plexViews/labels.ts']);
const definition=M.exampleViewDefinition;

test('shared area grid preserves unadorned geometry and native dimensions',()=>{
  const items=[{id:'a',width:100,height:40},{id:'b',width:200,height:80},{id:'c',width:120,height:30}];
  const grid=M.measuredAreaGrid(items,2,20,10);
  assert.equal(grid.width,388);assert.equal(grid.height,178);
  assert.deepEqual([...grid.positions], [['a',{x:84,y:82,width:100,height:40}],['b',{x:264,y:82,width:200,height:80}],['c',{x:84,y:147,width:120,height:30}]]);
  assert.deepEqual(M.measuredAreaGrid([],1,0,0),{positions:new Map(),width:0,height:0});
});

test('shared area envelopes reserve badges without resizing nodes or overlapping adjacent cells',()=>{
  const items=Object.freeze([Object.freeze({id:'a',width:160,height:44,insets:Object.freeze({top:28,right:40})}),Object.freeze({id:'b',width:160,height:64})]);
  const grid=M.measuredAreaGrid(items,2,16,18);
  assert.equal(grid.width,424);assert.equal(grid.height,130);
  assert.deepEqual(grid.positions.get('a'),{x:104,y:92,width:160,height:44});
  assert.deepEqual(grid.positions.get('b'),{x:320,y:78,width:160,height:64});
  const a=grid.positions.get('a'),b=grid.positions.get('b');
  assert.equal(a.y-a.height/2-items[0].insets.top,42);
  assert.equal(b.x-b.width/2-(a.x+a.width/2+items[0].insets.right),16);
  assert.deepEqual([...M.measuredAreaGrid(items,2,16,18).positions],[...grid.positions]);
});

test('automatic area columns use actual cell envelopes at exact world-width thresholds',()=>{
  const items=Array.from({length:6},(_,i)=>({id:String(i),width:100,height:40}));
  assert.equal(M.measuredAreaColumns(items,263,16),1);
  assert.equal(M.measuredAreaColumns(items,264,16),2);
  assert.equal(M.measuredAreaColumns(items,380,16),3);
  assert.equal(M.measuredAreaColumns(items,728,16),6);
  assert.equal(M.measuredAreaColumns(items,728,16,24,3),3);
  assert.equal(M.measuredAreaColumns([],200,16),1);
  const varied=[{id:'wide',width:600,height:40},{id:'b',width:100,height:60},{id:'c',width:100,height:40}];
  assert.equal(M.measuredAreaColumns(varied,880,16),3);
  assert.equal(M.measuredAreaColumns([{...varied[0],insets:{right:40}},...varied.slice(1)],880,16),2);
  assert.equal(M.measuredAreaColumns(varied,200,16),1);
});

test('shared area packing retains finite budgets and rejects invalid identities, insets and policies',()=>{
  const item={id:'a',width:100,height:40};
  for(const items of [[item,item],[{...item,insets:{top:-1}}],[{...item,insets:{right:Infinity}}],Array.from({length:2049},(_,i)=>({...item,id:String(i)}))]){
    assert.throws(()=>M.measuredAreaGrid(items,1,16,18));assert.throws(()=>M.measuredAreaColumns(items,500,16));
  }
  for(const columns of [0,33,1.5])assert.throws(()=>M.measuredAreaGrid([item],columns,16,18));
  for(const width of [0,-1,NaN,Infinity])assert.throws(()=>M.measuredAreaColumns([item],width,16));
  assert.throws(()=>M.measuredAreaColumns([item],500,16,24,33));
});
/** Independent canvases share type settings only, with visible host-effect counters. */
function fixture(contribution=M.exampleSettingsContribution){
  const fallback={...definition,id:'org.example.other'};
  const views=new M.PlexViewRegistry([definition,fallback],definition.id);
  const registry=new M.CanvasViewSettingsRegistry(views,[contribution]);
  let stored={},mounted=true;const effects={workspace:0,configuration:0,camera:0,settings:0,failed:0};
  const session=new M.PlexViewSession(views,()=>effects.workspace++);
  const controller=new M.CanvasViewContributionController(session,registry,{
    settings:()=>stored,mounted:()=>mounted,beforePresentationChange:()=>effects.camera++,
    update:async(id,address,edit,expected)=>{stored=M.editViewConfigurationAt(views.resolve(id),stored,address,edit,expected);effects.configuration++;},
    openSettings:id=>{assert.equal(id,definition.id);effects.settings++;return true;},failed:()=>effects.failed++,
  });
  return {session,controller,registry,effects,get stored(){return stored},setStored:value=>{stored=value},unmount:()=>{mounted=false}};
}

test('versioned public registration rejects incompatible contracts and omitted capabilities remain unavailable',()=>{
  assert.equal(M.CANVAS_VIEW_API_VERSION,1);assert.deepEqual(definition.capabilities,{});
  for(const alter of [d=>({...d,version:2}),d=>({...d,icon:'bad icon'}),d=>({...d,capabilities:{editor:'yes'}}),
    d=>({...d,project:null}),d=>({...d,defaultState:{data:'x'.repeat(17000)}})]){
    assert.throws(()=>new M.PlexViewRegistry([alter(definition)],definition.id));
  }
  assert.throws(()=>new M.PlexViewRegistry([definition,definition],definition.id));
  const f=fixture(),release=f.session.retainEditor();assert.equal(f.session.canSelect('org.example.other'),false);release();
  assert.equal(f.session.canSelect('org.example.other'),true);
});

test('example projection/layout uses shared measurements and real canonical edge evidence without source access',()=>{
  const pages=new Map(['Focus.md','Child.md'].map(id=>[id,viewPage(id)]));let reads=0;
  for(const page of pages.values())page.file.stat={mtime:1,ctime:1,size:1};
  const source={get:id=>pages.get(id),isVisiblePage:()=>true,titleFor:page=>page.name,captureSemanticGateRead:()=>({isCurrent:()=>true}),
    neighbours:(page,role)=>{reads++;return page.path==='Focus.md'&&role==='child'?[{page:pages.get('Child.md'),role,relationType:1,linkDirection:1}]:[]},
    sortNeighbours:rows=>rows,explainRelationship:()=>null};
  const settings=M.migrateAndMergeSettings({});
  const prepare=(state,configuration={})=>M.prepareViewScene(definition,M.plexViewRead(source,()=>true,10,'Focus.md'),source,
    'Focus.md',state,{...settings,canvasViewSettings:configuration},()=>true);
  const right=prepare({version:1,side:1});assert.equal(right.failure,false);assert.equal(right.scene.nodes.length,2);
  assert.equal(right.scene.edges[0].sourcePath,'Focus.md');assert.equal(right.scene.edges[0].targetPath,'Child.md');
  assert.equal(right.scene.nodes.find(n=>n.page.path==='Child.md').x>0,true);assert.deepEqual(right.projection.heading,{literal:'Example columns'});
  const left=prepare({version:1,side:-1});assert.equal(left.scene.nodes.find(n=>n.page.path==='Child.md').x<0,true);
  const hidden=prepare({version:1,side:1},M.editViewConfiguration(definition,{},'showHeading',false));assert.equal(hidden.projection.heading,null);
  assert.equal(reads,3,'Only one bounded direct-role query per scene');
});

test('menu and panel choice commands share exact session state and independent restoration',async()=>{
  const a=fixture(),b=fixture();
  const menu=a.controller.menus()[0];assert.equal(menu.kind,'submenu');assert.equal(menu.items[1].checked,true);
  const left=a.controller.choices()[0].options[0].command;
  assert.deepEqual(await left.run(),{status:'completed'});assert.deepEqual(a.session.state,{version:1,side:-1});
  assert.deepEqual(b.session.state,{version:1,side:1});assert.deepEqual(await left.run(),{status:'unavailable'});
  assert.deepEqual(await menu.items[1].command.run(),{status:'unavailable'},'Older menu cannot undo a later choice');
  const restored=fixture();restored.session.restore(a.session.getState());assert.deepEqual(restored.session.state,a.session.state);
  assert.deepEqual(a.effects,{workspace:1,configuration:0,camera:1,settings:0,failed:0});
});

test('selection, revision, configuration, teardown and native lifetime changes retire captured callbacks',async()=>{
  for(const change of [f=>f.session.select('org.example.other'),f=>f.session.updateState({version:1,side:-1}),
    f=>f.setStored(M.editViewConfiguration(definition,{},'spacing',120)),f=>f.controller.dispose(),f=>f.unmount(),f=>f.session.dispose()]){
    const f=fixture(),captured=f.controller.capture({kind:'configuration',address:{field:'spacing'},edit:{kind:'set',value:100}});
    change(f);assert.equal((await captured.run()).status,'unavailable');assert.equal(f.effects.configuration,0);
  }
});

test('configuration and Settings commands use only the owning registered writer/page and preserve other namespaces',async()=>{
  const f=fixture();f.setStored({'org.example.other':{version:1,values:{opaque:'retained'}}});
  assert.equal((await f.controller.capture({kind:'configuration',address:{field:'spacing'},edit:{kind:'set',value:110}}).run()).status,'completed');
  assert.equal(f.stored[definition.id].values.spacing,110);assert.equal(f.stored['org.example.other'].values.opaque,'retained');
  assert.equal((await f.controller.capture({kind:'settings'}).run()).status,'completed');
  assert.equal(f.effects.settings,1);assert.equal(f.effects.workspace,0);
  assert.equal((await f.controller.capture({kind:'configuration',address:{field:'foreign'},edit:{kind:'set',value:1}}).run()).status,'failed');
  assert.equal(f.effects.failed,1);assert.equal(f.effects.configuration,1);
});

test('unsupported future state/configuration remains inert and is never destructively downgraded by commands',async()=>{
  const f=fixture(),future={version:3,side:-1,opaque:{payload:'retain'}};f.session.restore({version:1,id:definition.id,states:{[definition.id]:future}});
  const before=f.session.getState();assert.equal((await f.controller.capture({kind:'state',action:{id:'side',args:1}}).run()).status,'unavailable');
  assert.deepEqual(f.session.getState(),before);assert.equal(f.effects.workspace,0);
  f.setStored({[definition.id]:{version:7,values:{opaque:'retain'}}});
  assert.equal((await f.controller.capture({kind:'configuration',address:{field:'spacing'},edit:{kind:'set',value:100}}).run()).status,'unavailable');
  assert.equal(f.stored[definition.id].version,7);
});

test('bounded contribution admission rejects malformed/oversized descriptors without executing them',()=>{
  const action={kind:'action',id:'item',label:{literal:'Item'},command:{kind:'state',action:{id:'side',args:1}}};
  for(const menus of [[{...action,label:{literal:'x',key:'view.choose'}}],[{...action,command:{kind:'file-write'}}],
    Array.from({length:33},(_,i)=>({...action,id:'item'+i})),[action,action]]) assert.throws(()=>M.validateCanvasViewMenus(menus));
  let menus=[action];for(let i=0;i<5;i++)menus=[{kind:'submenu',id:'group',label:{literal:'Group'},items:menus}];
  assert.throws(()=>M.validateCanvasViewMenus(menus));
  const f=fixture({...M.exampleSettingsContribution,menus:()=>menus});assert.deepEqual(f.controller.menus(),[]);assert.equal(f.effects.failed,1);
  assert.deepEqual(new M.CanvasViewSettingsRegistry(f.session.registry,[]).layoutControls(definition),[]);
});

test('nested native control addresses retain stable identities and reject ambiguous/prototype paths',()=>{
  assert.deepEqual(M.canvasViewControl('canvasView:org.example.columns:presets:alpha/categories/~2/label'),
    {id:'org.example.columns',field:'presets',path:['alpha','categories',2,'label']});
  for(const key of ['canvasView:org.example.columns:presets:__proto__/label','canvasView:org.example.columns:presets:a//b',
    'canvasView:org.example.columns:presets:~01','canvasView:org.example.columns:presets:a/b/c/d/e/f/g'])assert.equal(M.canvasViewControl(key),null,key);
  assert.equal(M.validCanvasViewText({literal:''}),true);assert.equal(M.validCanvasViewText({literal:'view.choose'}),true);
  assert.equal(M.canvasViewText({literal:'view.choose'},()=>{throw Error('Literal must not use catalog')}),'view.choose');
});
