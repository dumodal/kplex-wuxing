/** Actual focal-point fit math, graph camera/layout callbacks and native drawing fit lifetimes. */
import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import {loadPortableModules} from './support/portableTypeScript.mjs';
const {exports: {centeredViewportFit, sameFitCamera, wuXingScaffoldBounds, EmbeddedDrawingFit, centerArrivalFrames}} = loadPortableModules([
  'src/ui/components/viewportFit.ts', 'src/adapters/obsidian/EmbeddedDrawingFit.ts', 'src/ui/components/centerArrival.ts']);
const source=ts.createSourceFile('graph.tsx',readFileSync('src/ui/PlexGraph.tsx','utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);

/** Run production callbacks with explicit finite composition dependencies, without a second policy. */
function callback(name, dependencies) {
  let selected;
  /** Select the actual declaration or layout callback, preserving its complete body. */
  const visit=node=>{
    if(name!=='layout'&&ts.isVariableDeclaration(node)&&node.name.getText(source)===name&&ts.isArrowFunction(node.initializer))selected=node.initializer.getText(source);
    if(name==='layout'&&ts.isCallExpression(node)&&node.expression.getText(source)==='useLayoutEffect'
      &&node.arguments[0]?.getText(source).includes('const shouldRecenter'))selected=node.arguments[0].getText(source);
    ts.forEachChild(node,visit);
  };
  visit(source);assert(selected,name);
  const js=ts.transpileModule(`const selected=${selected};`,{compilerOptions:{target:ts.ScriptTarget.ES2021}}).outputText;
  return Function(...Object.keys(dependencies),`${js}\nreturn selected;`)(...Object.values(dependencies));
}

/** Supply an asymmetric displayed scene and real camera application/fit/layout owners. */
function graphFixture() {
  const ctx={camera:{current:{x:0,y:0,scale:1}},automaticFit:{current:null},activePath:'Center.md',
    cameraIntentPlaced:{current:false},
    cameraFrame:{current:1},cameraElement:{current:null},syncCentralEditorOverlay:()=>{},
    scene:{nodes:[{role:'center',page:{path:'Center.md'},x:30,y:-20,width:200,height:100}],zoneViewports:{}},
    centralEditorMaximized:false,Platform:{isIosApp:false},IOS_MAX_ZOOM:2,MAX_ZOOM:5,ZONES:['child'],zoneForRole:role=>role==='child'?'child':null,
    centeredViewportFit,sameFitCamera,wuXingScaffoldBounds,sceneMotion:{cancelAll(){}},preserveCameraOnNextLayout:{current:false},displayResizeLayout:{current:false},
    centralEditorAvailabilityRef:{current:false},centralEditorAvailable:false,centralEditorSize:null,centralEditorSizeKeyRef:{current:''},
    previousNodeRects:{current:new Map([['prior',{}]])},pathChangedThisRender:true,navigationOrigin:'user',settings:{allowAutozoom:true,animationSpeed:0},incomingCenter:{current:null}};
  ctx.viewport={current:{clientWidth:800,clientHeight:600,ownerDocument:{defaultView:{}},querySelectorAll:()=>[
    {dataset:{kplexPath:ctx.activePath},getBoundingClientRect:()=>({left:300,top:250,width:200,height:100})}]}};
  /** Rebind render-owned callbacks after navigation just as React composition does. */
  ctx.render=()=>{ctx.applyCamera=callback('applyCamera',ctx);ctx.flushCameraTransform=callback('flushCameraTransform',ctx);ctx.fit=callback('fit',ctx);ctx.layout=callback('layout',ctx);};
  ctx.index={isWuXingMode:()=>Boolean(ctx.scene.wuXing)};
  ctx.render();return ctx;
}

test('passive follow cancels existing motion and suppresses immediate and late-layout arrivals while deliberate navigation still animates', /** Run the production preparation/layout owners with positive animation speed and inspect actual emitted frames. */ () => {
  const ctx=graphFixture(),plays=[],classes=['kplex-role-center'];
  classes.contains=/** Supply native class membership used by the production layout callback. */ value=>classes.includes(value);
  let cancels=0;
  Object.assign(ctx,{selection:{readSelected:()=>null},navigationOccurrence:{current:null},wanderMotion:{current:false},centerArrivalFrames,
    sceneMotion:{cancelAll(){cancels++},play(element,frames,options){plays.push({frames,options})}},
    areaResizeDrag:{current:null},nodeDrag:null,connectDrag:null,suppressLayoutMotionUntil:{current:0}});
  ctx.viewport.current.getBoundingClientRect=/** Bound captured deliberate source geometry. */ ()=>({left:0,top:0,right:800,bottom:600});
  ctx.viewport.current.querySelectorAll=/** Present one live center whose old geometry differs from its final layout. */ ()=>[{
    dataset:{kplexPath:ctx.activePath},classList:classes,getBoundingClientRect:()=>({left:300,top:250,width:200,height:100,right:500,bottom:350})}];
  ctx.settings.animationSpeed=1;
  const prepare=callback('prepareNavigation',ctx);
  ctx.incomingCenter.current={identity:ctx.activePath,rect:{left:10,top:10,width:200,height:100},origin:'user'};
  ctx.navigationOccurrence.current={identity:ctx.activePath,id:'old'};
  prepare(ctx.activePath,'follow');assert.equal(cancels,1);assert.equal(ctx.incomingCenter.current,null);assert.equal(ctx.navigationOccurrence.current,null);
  ctx.navigationOrigin='follow';ctx.render();ctx.layout();assert.equal(plays.length,0);
  ctx.pathChangedThisRender=false;ctx.scene.nodes.push({role:'right',page:{path:'Late.md'},x:1000,y:0,width:200,height:100});ctx.render();ctx.layout();assert.equal(plays.length,0);
  ctx.navigationOrigin='user';ctx.pathChangedThisRender=true;
  ctx.incomingCenter.current={identity:ctx.activePath,rect:{left:10,top:10,width:200,height:100},origin:'user'};
  ctx.render();ctx.layout();assert.equal(plays.length,1);assert(plays[0].frames.length>2,'deliberate center retains its curved arrival');
});

test('same-center navigation-origin changes retain outline expansion while genuine center changes reset it', /** Execute the real outline effect with React-style dependency comparisons. */ () => {
  let effect;
  /** Locate the production owner instead of recreating its outline policy. */
  const visit=node=>{
    if(ts.isCallExpression(node)&&node.expression.getText(source)==='useEffect'
      &&node.arguments[0]?.getText(source).includes('transitionPath.current = activePath'))effect=node;
    ts.forEachChild(node,visit);
  };
  visit(source);assert(effect);
  const ctx={activePath:'Center.md',navigationOrigin:'follow',settings:{animationSpeed:1},transitionPath:{current:'Center.md'},sectionFoldCenter:{current:'Center.md'},
    setSectionExpanded(){ctx.expanded=false},setSectionExpansion(){ctx.expansion=null},setExpandedSectionIds(ids){ctx.ids=ids}};
  const js=ts.transpileModule(`const effect=${effect.arguments[0].getText(source)};const deps=${effect.arguments[1].getText(source)};`,{compilerOptions:{target:ts.ScriptTarget.ES2021}}).outputText;
  let previous;
  /** Run only when the production effect's actual dependency values change. */
  const render=()=>{
    const {effect:run,deps}=Function(...Object.keys(ctx),`${js}\nreturn {effect,deps};`)(...Object.values(ctx));
    if(!previous||deps.some((value,index)=>!Object.is(value,previous[index])))run();previous=deps;
  };
  render();ctx.expanded=true;ctx.expansion={outline:true};ctx.ids=new Set(['section']);
  ctx.navigationOrigin='user';render();assert.equal(ctx.expanded,true);assert.deepEqual([...ctx.ids],['section']);assert(ctx.expansion);
  ctx.activePath='Next.md';render();assert.equal(ctx.expanded,false);assert.equal(ctx.expansion,null);assert.equal(ctx.ids.size,0);
});

test('passive follow retires a deliberate transition through its original owning window', /** Execute the production transition effect across two window identities. */ () => {
  let selected;
  /** Locate the real timer owner rather than substituting a timer policy. */
  const visit=node=>{
    if(ts.isCallExpression(node)&&node.expression.getText(source)==='useEffect'
      &&node.arguments[0]?.getText(source).includes('setSceneTransitioning(navigationOrigin !== "follow")'))selected=node.arguments[0].getText(source);
    ts.forEachChild(node,visit);
  };
  visit(source);assert(selected);
  const cleared=[],created=[],prior={clearTimeout:id=>cleared.push(['prior',id])},owner={
    clearTimeout:id=>cleared.push(['owner',id]),setTimeout(fn,ms){created.push({fn,ms});return 9}};
  const ctx={navigationOrigin:'follow',settings:{animationSpeed:1},viewport:{current:{ownerDocument:{defaultView:owner}}},window:owner,
    sceneTransitionTimer:{current:4},sceneTransitionTimerWindow:{current:prior},setSceneTransitioning:value=>{ctx.transitioning=value}};
  const js=ts.transpileModule(`const selected=${selected};`,{compilerOptions:{target:ts.ScriptTarget.ES2021}}).outputText;
  const run=()=>Function(...Object.keys(ctx),`${js}\nreturn selected();`)(...Object.values(ctx));
  run();assert.deepEqual(cleared,[['prior',4]]);assert.equal(created.length,0);assert.equal(ctx.transitioning,false);assert.equal(ctx.sceneTransitionTimerWindow.current,null);
  ctx.navigationOrigin='user';run();assert.equal(created.length,1);assert.equal(ctx.sceneTransitionTimerWindow.current,owner);assert.equal(ctx.transitioning,true);
  ctx.navigationOrigin='follow';run();assert.deepEqual(cleared,[['prior',4],['owner',9]]);assert.equal(created.length,1);assert.equal(ctx.transitioning,false);
});

test('asymmetric bounds keep the focus centered and every padded displayed extent inside the viewport',()=>{
  for(const [width,height]of [[800,600],[240,300],[1440,875]]){
    const focus={x:37,y:-23},bounds={left:-300,top:-120,right:1500,bottom:900};
    const camera=centeredViewportFit(width,height,focus,bounds,5);
    assert.equal(camera.x+focus.x*camera.scale,width/2);assert.equal(camera.y+focus.y*camera.scale,height/2);
    assert(camera.x+bounds.left*camera.scale>=46-1e-8);assert(camera.x+bounds.right*camera.scale<=width-46+1e-8);
    assert(camera.y+bounds.top*camera.scale>=46-1e-8);assert(camera.y+bounds.bottom*camera.scale<=height-46+1e-8);
  }
});

test('actual graph fit follows late nodes and bounded panels, and all manual camera applications retire it',()=>{
  const ctx=graphFixture();ctx.layout();ctx.pathChangedThisRender=false;
  const initial=ctx.camera.current.scale;
  ctx.scene.nodes.push({role:'right',page:{path:'Late.md'},x:1200,y:200,width:200,height:100});ctx.render();ctx.layout();
  assert(ctx.camera.current.scale<initial);assert.equal(ctx.camera.current.x+30*ctx.camera.current.scale,400);
  assert.equal(ctx.camera.current.y-20*ctx.camera.current.scale,300);
  // A bounded zone fits its viewport, not thousands of offscreen overflow rows.
  ctx.scene.zoneViewports.child={left:-200,top:100,width:400,height:200};
  ctx.scene.nodes.push({role:'child',page:{path:'Overflow.md'},x:0,y:50000,width:300,height:30});ctx.render();ctx.fit();
  assert(ctx.camera.current.scale>0.1);
  const fitted={...ctx.camera.current};ctx.applyCamera(c=>({...c,scale:c.scale*1.3,x:c.x+17}));
  const manual={...ctx.camera.current};ctx.scene.nodes.push({role:'right',page:{path:'Later.md'},x:5000,y:0,width:200,height:100});ctx.render();ctx.layout();
  assert.deepEqual(ctx.camera.current,manual);assert.equal(ctx.automaticFit.current,null);
  ctx.centralEditorAvailable=true;ctx.centralEditorAvailabilityRef.current=true;
  ctx.centralEditorSize={width:450,height:400};ctx.render();ctx.layout();
  assert.deepEqual(ctx.camera.current,manual,'a fluid editor frame resize cannot revive retired camera fitting');
  ctx.applyCamera(fitted);ctx.render();ctx.layout();assert.deepEqual(ctx.camera.current,fitted,'returning to old coordinates does not renew automatic ownership');
  ctx.fit();assert(ctx.automaticFit.current);ctx.scene.nodes.push({role:'left',page:{path:'Newest.md'},x:-7000,y:0,width:200,height:100});ctx.render();ctx.layout();
  assert(ctx.camera.current.scale<fitted.scale,'explicit Fit renews ownership for later publication');
});

test('navigation renews graph fitting but disabled autozoom and deliberate display transitions preserve manual intent',()=>{
  const ctx=graphFixture();ctx.layout();ctx.applyCamera({x:91,y:83,scale:1.7});
  ctx.activePath='Next.md';ctx.pathChangedThisRender=true;ctx.scene.nodes[0].page.path=ctx.activePath;ctx.render();ctx.layout();
  assert.equal(ctx.automaticFit.current.path,'Next.md');assert.equal(ctx.camera.current.x+30*ctx.camera.current.scale,400);
  const prior={...ctx.camera.current};ctx.pathChangedThisRender=false;ctx.preserveCameraOnNextLayout.current=true;
  ctx.scene.nodes.push({role:'right',page:{path:'New.md'},x:5000,y:0,width:100,height:50});ctx.render();ctx.layout();assert.deepEqual(ctx.camera.current,prior);
  ctx.settings.allowAutozoom=false;ctx.render();ctx.layout();assert.deepEqual(ctx.camera.current,prior);
});

test('manual input during an initially empty neighborhood remains authoritative when its first nodes arrive',()=>{
  const ctx=graphFixture(),nodes=ctx.scene.nodes;ctx.scene.nodes=[];ctx.layout();ctx.pathChangedThisRender=false;
  ctx.applyCamera({x:123,y:91,scale:0.7});ctx.scene.nodes=nodes;ctx.render();ctx.layout();
  assert.deepEqual(ctx.camera.current,{x:123,y:91,scale:0.7});assert.equal(ctx.automaticFit.current,null);
});

/** Use explicit animation-frame batches to expose cancellation and native state changes without sleeps. */
function drawingFixture() {
  let next=0,fits=0;const frames=new Map(),state={owner:{},width:300,height:200,camera:{x:0,y:0,scale:0.55},eligible:true};
  const ownerWindow={requestAnimationFrame:fn=>{const id=++next;frames.set(id,fn);return id},cancelAnimationFrame:id=>frames.delete(id)};
  const controller=new EmbeddedDrawingFit(ownerWindow,()=>({...state,camera:{...state.camera}}),()=>{fits++;state.camera={x:-50,y:20,scale:0.8}});
  /** Execute one native frame, keeping later frames queued separately. */
  const flush=()=>{const pending=[...frames.values()];frames.clear();for(const fn of pending)fn()};
  return{controller,state,frames,flush,fits:()=>fits};
}

test('untouched reading drawing refits changed dimensions once and records its new native camera',()=>{
  const f=drawingFixture();f.controller.resize();f.flush();f.flush();assert.equal(f.fits(),0);
  f.state.width=600;f.controller.resize();f.controller.resize();f.flush();f.flush();f.flush();assert.equal(f.fits(),1);
  f.controller.resize();f.flush();f.flush();assert.equal(f.fits(),1,'ordinary render does not refit');
  f.state.height=400;f.controller.resize();f.flush();f.flush();f.flush();assert.equal(f.fits(),2);
  f.controller.dispose();assert.equal(f.frames.size,0);
});

test('drawing input, external camera changes and disposal cancel resize fitting until a new opening',()=>{
  for(const interrupt of [f=>f.controller.interrupt(),f=>{f.state.camera.x=100}]){
    const f=drawingFixture();f.controller.resize();f.flush();f.flush();f.state.width=500;f.controller.resize();interrupt(f);f.flush();f.flush();
    assert.equal(f.fits(),0);f.state.width=700;f.controller.resize();f.flush();f.flush();assert.equal(f.fits(),0);
    f.controller.reset();f.controller.resize();f.flush();f.flush();f.state.height=400;f.controller.resize();f.flush();f.flush();f.flush();assert.equal(f.fits(),1);
    f.controller.dispose();
  }
  const f=drawingFixture();f.controller.resize();const retired=[...f.frames.values()][0];f.controller.dispose();retired();f.flush();assert.equal(f.fits(),0);assert.equal(f.frames.size,0);
});

test('a newer native resize during post-fit recording does not mistake our camera update for manual input',()=>{
  const f=drawingFixture();f.controller.resize();f.flush();f.flush();
  f.state.width=600;f.controller.resize();f.flush();f.flush();assert.equal(f.fits(),1);
  f.state.height=500;f.controller.resize();f.flush();f.flush();f.flush();assert.equal(f.fits(),2);
  f.controller.dispose();
});

test('drawing fit excludes edit/fullscreen/disabled/loading reads and never applies a retired opening callback',()=>{
  const f=drawingFixture();f.controller.resize();f.flush();f.flush();f.state.width=800;f.state.eligible=false;f.controller.resize();f.flush();f.flush();assert.equal(f.fits(),0);
  f.state.eligible=true;f.controller.resize();const retired=[...f.frames.values()][0];f.controller.reset();f.state.owner={};retired();f.flush();f.flush();assert.equal(f.fits(),0);
  f.controller.dispose();
});


test('Wu Xing camera fits the ring and leaves the active note off center', () => {
  const ctx=graphFixture();
  ctx.scene.wuXing={focalPoint:{x:0,y:0},vertices:[{x:0,y:-300},{x:285,y:-93},{x:176,y:243},{x:-176,y:243},{x:-285,y:-93}]};
  for(const vertex of ctx.scene.wuXing.vertices) vertex.frame={left:vertex.x-100,top:vertex.y-78,width:200,height:130};
  ctx.scene.nodes[0].x=176; ctx.scene.nodes[0].y=243;
  ctx.render(); ctx.fit();
  const c=ctx.camera.current;
  assert.equal(c.x,400);assert.equal(c.y,300);
  assert.notEqual(c.x+176*c.scale,400);
  for(const v of ctx.scene.wuXing.vertices) {
    assert(c.x+v.x*c.scale>=0 && c.x+v.x*c.scale<=800);
    assert(c.y+(v.y-55)*c.scale>=0 && c.y+v.y*c.scale<=600);
  }
});


test('phase panel bottom-edge drag grows every role downward', () => {
 for(const zone of ['parent','child','left','right','sibling']) {
  const ctx={areaResizeDrag:{current:{zone,pointerId:1,startClientY:100,startScale:1,startHeight:200}},
   scene:{zoneAreas:{[zone]:{resizeEdge:'bottom'}}},pendingAreaHeight:{current:null},areaResizeFrame:{current:{id:1}}};
  callback('move',ctx)({pointerId:1,clientY:130,preventDefault(){}});
  assert.equal(ctx.pendingAreaHeight.current.height,230);
 }
});


test('Wu Xing opens fitted even with navigation autozoom disabled, including empty phase frames', () => {
  const ctx=graphFixture();ctx.settings.allowAutozoom=false;
  ctx.scene.nodes=[];
  ctx.scene.wuXing={focalPoint:{x:0,y:0},vertices:[{x:0,y:-450},{x:428,y:-139},{x:265,y:364},{x:-265,y:364},{x:-428,y:-139}]};
  for(const v of ctx.scene.wuXing.vertices) v.frame={left:v.x-160,top:v.y-120,width:320,height:240};
  ctx.render();ctx.layout();
  assert(ctx.camera.current.scale<1,'initial Wu Xing opening must fit independently of navigation autozoom');
  for(const v of ctx.scene.wuXing.vertices) {
    const c=ctx.camera.current;
    assert(c.x+v.frame.left*c.scale>=0 && c.x+(v.frame.left+v.frame.width)*c.scale<=800);
    assert(c.y+v.frame.top*c.scale>=0 && c.y+(v.frame.top+v.frame.height)*c.scale<=600);
  }
  ctx.pathChangedThisRender=false;
  ctx.applyCamera({x:121,y:98,scale:.7});
  ctx.scene.nodes.push({role:'center',page:{path:'Center.md'},x:265,y:364,width:200,height:90});
  ctx.render();ctx.layout();assert.deepEqual(ctx.camera.current,{x:121,y:98,scale:.7},'late notes preserve manual camera intent');
});


test('a hidden Wu Xing pane waits for positive dimensions and loading placeholders do not consume its opening fit', () => {
  const ctx=graphFixture();ctx.settings.allowAutozoom=false;ctx.index={isWuXingMode:()=>true};
  const nodes=ctx.scene.nodes;ctx.scene.nodes=[];ctx.render();ctx.layout();assert.equal(ctx.cameraIntentPlaced.current,false);
  ctx.scene.nodes=nodes;ctx.scene.wuXing={focalPoint:{x:0,y:0},vertices:[{frame:{left:-500,top:-500,width:1000,height:1000}}]};
  ctx.viewport.current.clientWidth=0;ctx.viewport.current.clientHeight=0;ctx.render();ctx.layout();
  assert.equal(ctx.cameraIntentPlaced.current,false,'hidden opening cannot record an unusable fit');
  ctx.viewport.current.clientWidth=800;ctx.viewport.current.clientHeight=600;ctx.render();ctx.layout();
  assert(ctx.camera.current.scale<1);assert.equal(ctx.cameraIntentPlaced.current,true);
});
