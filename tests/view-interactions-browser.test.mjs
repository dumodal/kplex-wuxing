/** Targeted actual shared canvas interaction checks. Native host facts are finite fixtures;
 * view projection/layout, action acceptance and semantic button/touch dispatch are production. */
import assert from 'node:assert/strict';
import test from 'node:test';
import {chromiumHarness} from './support/browserTypeScript.mjs';
import {plexViewBrowserModules} from './support/plexViewBrowser.mjs';
import {canvasSceneFixture} from './support/canvasSceneFixture.mjs';
const output=await plexViewBrowserModules({captureNotices:true});
const register=`
 const releases=[];
 const attach=ui=>{const release=plugin.actionManager.registerSurface({id:ui.props.actionSurfaceId,generation:1,
  get implementations(){return ui.ports.current.implementations},readSnapshot:()=>({mounted:true,visible:true,windowId:'interaction',
   center:M.actionNodeRef(pages.get(ui.props.activePath)),selected:ui.ports.current.readSelected(),focusRegion:'graph',interactionRevision:0,viewRevision:ui.session.getSnapshot()})});releases.push(release);
  ui.props.onActivate=(page,intent)=>{if(ui.session.definition.navigation==='rooted'){check(intent==='destination','Rooted activation must use accepted destination');check(ui.session.setRoot(page.path),'Root admission');}
   ui.props.activePath=page.path;ui.render();return true};ui.render();return ui};
 const dispatch=async(ui,id)=>{const result=await plugin.actionManager.dispatch({id,source:'local-hotkey',surfaceId:ui.props.actionSurfaceId});ui.render();await wait();return result};
`;

for(const view of ['classic','mindmap','wuxing'])test(`${view}: plain arrows leave the central area and Enter centers without renaming`,async()=>{
 const host=await chromiumHarness(output.outputFiles[0].text+';window.sourceModules=sourceModules;');
 try{assert(await host.evaluate(`(async()=>{${canvasSceneFixture}${register}
 settings.actionPreferences.crossSectionAtBoundary=false;
 const ui=attach(await mount(M.builtInPlexViews.resolve('${view}')));await dispatch(ui,'selection.center');
 const initial=ui.ports.current.readSelected();let selected=initial;
 for(const direction of ['right','down','left','up']){await dispatch(ui,'selection.move.'+direction);selected=ui.ports.current.readSelected();if(selected&&selected.node.identity!=='A.md')break;}
 check(selected&&selected.node.identity!=='A.md','Plain arrows must reach another area without Alt or the retired stop-at-boundary preference');
 const target=selected.node.identity;check((await dispatch(ui,'node.activate')).status==='completed','Enter accepted');check(ui.props.activePath===target,'Enter must center the selected canonical note');
 if('${view}'==='mindmap')check(ui.session.layoutRoot(target)===target,'Mind Map Enter reroots through destination admission');
 await dispatch(ui,'selection.center');check((await dispatch(ui,'node.activate')).status==='completed'&&!document.querySelector('.modal'),'Enter on current center never starts renaming');
 check(work.body===0&&work.scans===0,'Selection/centering performs no Markdown reads or vault scans');
 releases.forEach(release=>release());ui.close();plugin.actionManager.dispose();style.remove();return true})()`));}finally{await host.cleanup()}
});

test('Mind Map note click centers while its separate disclosure only folds',async()=>{
 const host=await chromiumHarness(output.outputFiles[0].text+';window.sourceModules=sourceModules;');
 try{assert(await host.evaluate(`(async()=>{${canvasSceneFixture}${register}
 const graph={'A.md':['B.md'],'B.md':['C.md']};index.neighbours=(page,role)=>role==='child'?(graph[page.path]??[]).map(path=>({page:pages.get(path),role,relationType:1,linkDirection:1})):[];
 const ui=attach(await mount(M.builtInPlexViews.resolve('mindmap'))),card=path=>ui.container.querySelector('[data-kplex-path="'+path+'"]');
 card('B.md').querySelector('.is-branch-disclosure').click();await wait();ui.render();await wait();
 check(card('C.md')&&ui.props.activePath==='A.md'&&ui.session.layoutRoot('A.md')==='A.md','Disclosure expands without navigation');
 card('B.md').dispatchEvent(new MouseEvent('click',{bubbles:true}));await wait();ui.render();await wait();
 check(ui.props.activePath==='B.md'&&ui.session.layoutRoot('B.md')==='B.md','Ordinary note click centers and reroots');
 releases.forEach(release=>release());ui.close();plugin.actionManager.dispose();style.remove();return true})()`));}finally{await host.cleanup()}
});

test('touch disclosure keeps a 16px symbol inside an isolated 44px hit target and consumes one fold per tap',async()=>{
 const host=await chromiumHarness(output.outputFiles[0].text+';window.sourceModules=sourceModules;');
 try{
  await host.command('Emulation.setDeviceMetricsOverride',{width:1280,height:960,deviceScaleFactor:1,mobile:false});
  await host.command('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});
  assert(await host.evaluate(`(async()=>{${canvasSceneFixture}${register}
  const ui=attach(await mount(M.builtInPlexViews.resolve('mindmap')));window.interactionFixture={ui,releases,plugin,style};
  const control=ui.container.querySelector('[data-kplex-keyboard-id="root"] .is-branch-disclosure'),box=control.getBoundingClientRect(),symbol=control.querySelector('.kplex-branch-disclosure-symbol').getBoundingClientRect();
  check(box.width===44&&box.height===44&&symbol.width===16&&symbol.height===16,'Small visual symbol / larger measured touch target');
  const overlaps=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
  for(const card of ui.container.querySelectorAll('.kplex-thought'))check(!overlaps(box,card.getBoundingClientRect()),'Touch target cannot steal a thought-body tap');
  for(const gate of ui.container.querySelectorAll('.kplex-gate'))check(!overlaps(box,gate.getBoundingClientRect()),'Touch target cannot steal a gate gesture');
  window.interactionFixture.point={x:box.left+36,y:box.top+36};window.interactionFixture.events=[];
  check(document.elementFromPoint(window.interactionFixture.point.x,window.interactionFixture.point.y)===control,'Trusted tap must target the actual visible transparent hit area');
  for(const type of ['pointerdown','pointerup','click','touchstart','touchend'])control.addEventListener(type,e=>window.interactionFixture.events.push({type:e.type,trusted:e.isTrusted}));
  return true})()`));
  const point=await host.evaluate('window.interactionFixture.point');
  for(const type of ['touchStart','touchEnd'])await host.command('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{...point,id:1,radiusX:8,radiusY:8,force:1}]});
  assert(await host.evaluate(`(async()=>{await new Promise(resolve=>setTimeout(resolve,160));const f=window.interactionFixture;f.ui.render();
   const control=f.ui.container.querySelector('[data-kplex-keyboard-id="root"] .is-branch-disclosure');
   if(control.getAttribute('aria-expanded')!=='false'||f.ui.props.activePath!=='A.md'||f.ui.session.layoutRoot('A.md')!=='A.md')throw Error('One transparent-area tap must fold once without centering '+JSON.stringify({expanded:control.getAttribute('aria-expanded'),events:f.events,point:f.point,hit:document.elementFromPoint(f.point.x,f.point.y)?.className,viewport:[innerWidth,innerHeight]}));return true})()`));
 }finally{
  await host.evaluate(`(()=>{const f=window.interactionFixture;if(f){f.releases.forEach(release=>release());f.ui.close();f.plugin.actionManager.dispose();f.style.remove();delete window.interactionFixture;}return true})()`);
  await host.cleanup();
 }
});
