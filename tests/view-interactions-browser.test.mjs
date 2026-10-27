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
  const rootCard=ui.container.querySelector('[data-kplex-keyboard-id="root"]'),rootBox=rootCard.getBoundingClientRect();
  check(symbol.left<rootBox.right&&symbol.right>rootBox.right&&symbol.top<rootBox.bottom&&symbol.bottom>rootBox.bottom,'Visible glyph must straddle the note corner');
  for(const card of ui.container.querySelectorAll('.kplex-thought')){const r=card.getBoundingClientRect();if(!overlaps(box,r))continue;
   check(card===rootCard&&Math.max(box.left,r.left)>=symbol.left&&Math.min(box.right,r.right)<=symbol.right&&Math.max(box.top,r.top)>=symbol.top&&Math.min(box.bottom,r.bottom)<=symbol.bottom,'Only the visible corner glyph may overlap its own note; the transparent target must not steal body/adjacent-node taps');}
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

for(const view of ['classic','mindmap','wuxing'])test(`${view}: every eligible note receives the shared editor control`,async()=>{
 const host=await chromiumHarness(output.outputFiles[0].text+';window.sourceModules=sourceModules;');
 try{assert(await host.evaluate(`(async()=>{${canvasSceneFixture}${register}
 const ui=attach(await mount(M.builtInPlexViews.resolve('${view}')));
 try{const cards=[...ui.container.querySelectorAll('.kplex-thought')];check(cards.length>=3,'Real note fixture');
 for(const card of cards)check(card.querySelector('.kplex-thought-corner-action:not(:disabled)'),'Eligible note lacks shared editor control');
 if('${view}'==='mindmap'){const card=cards.find(card=>card.querySelector('.is-branch-disclosure')),r=card.getBoundingClientRect(),f=card.querySelector('.kplex-branch-disclosure-symbol').getBoundingClientRect();
 check(f.width===16&&f.height===16&&f.left<r.right&&f.right>r.right&&f.top<r.bottom&&f.bottom>r.bottom,'Small desktop disclosure belongs on the node corner');}
 return true;}finally{releases.forEach(release=>release());ui.close();plugin.actionManager.dispose();style.remove()}})()`));}finally{await host.cleanup();}
});


test('optional bounded hierarchy viewport retains connectors, clips paint and reveals the expanded row',async()=>{
 const host=await chromiumHarness(output.outputFiles[0].text+';window.sourceModules=sourceModules;');
 try{assert(await host.evaluate(`(async()=>{${canvasSceneFixture}${register}
 settings.animationSpeed=0;
 const children=Array.from({length:28},(_,i)=>'Overflow '+i+'.md');
 for(const path of children)pages.set(path,{...pages.get('C.md'),path,name:path,file:{...pages.get('C.md').file,path}});
 index.neighbours=(page,role)=>(page.path==='A.md'&&role==='parent'?['B.md']:page.path==='B.md'&&role==='child'?['A.md',...children]:[]).map(path=>({page:pages.get(path),role,relationType:1,linkDirection:1}));
 const base=M.builtInPlexViews.resolve('mindmap'),definition={...base,id:'test.bounded-hierarchy',layout(...args){const layout=base.layout(...args);return {...layout,areas:layout.areas.map(area=>area.id!=='parent'?area:{...area,bounds:{...area.bounds,y:area.bounds.y+area.bounds.height-140,height:140},viewport:{...area.viewport,y:area.viewport.y+area.viewport.height-140,height:140,scrollable:undefined}})}}};
 const ui=attach(await mount(definition));
 const card=path=>[...ui.container.querySelectorAll('.kplex-thought')].find(el=>el.dataset.kplexPath===path);
 const panel=()=>ui.container.querySelector('.kplex-zone-parent .kplex-zone-scroll');
 card('B.md').querySelector('.is-branch-disclosure').click();await wait();ui.render();await wait();ui.render();await wait();
 check(card(children[27]),'Wide parent branch must be admitted');
 const scroll=panel(),b=card('B.md').getBoundingClientRect(),v=scroll.getBoundingClientRect();
 check(scroll.scrollHeight>scroll.clientHeight&&b.top>=v.top-1&&b.bottom<=v.bottom+1,'Expansion must reveal its exact parent after measured reflow');
 const count=()=>ui.container.querySelectorAll('.kplex-edge-hit').length,before=count(),attention=ui.props.activePath,root=ui.session.layoutRoot(attention);
 check(before>=children.length,'All admitted canonical routes exist before clipping');
 scroll.scrollTop=0;scroll.dispatchEvent(new Event('scroll',{bubbles:true}));await wait();ui.render();await wait();
 check(card('B.md').getBoundingClientRect().top>scroll.getBoundingClientRect().bottom,'Expanded parent is genuinely outside the area aperture');
 check(count()===before,'Offscreen source must not erase its visible connector segments');
 const clipped=[...ui.container.querySelectorAll('.kplex-edge-hit')].filter(path=>path.closest('svg')!==ui.container.querySelector('.kplex-links'));
 check(clipped.length>=children.length,'Bounded routes must clip visible stroke and actual hit paths together');
 for(const path of clipped){const svg=path.closest('svg');check(svg.getAttribute('overflow')==='hidden'&&Number(svg.getAttribute('height'))>0,'Measured SVG aperture');}
 scroll.scrollTop=scroll.scrollHeight;scroll.dispatchEvent(new Event('scroll',{bubbles:true}));await wait();ui.render();await wait();check(count()===before,'Opposite scroll retains routes');
 check(ui.props.activePath===attention&&ui.session.layoutRoot(attention)===root&&work.body===0&&work.scans===0,'Overflow remains presentation-only without navigation, body parsing or inventory');
 releases.forEach(release=>release());ui.close();plugin.actionManager.dispose();style.remove();return true})()`));}finally{await host.cleanup()}
});


test('Mind Map parents align to the bottom, grow without native scrolling and retain shared filtering and wheel navigation',async()=>{
 const host=await chromiumHarness(output.outputFiles[0].text+';window.sourceModules=sourceModules;');
 try{assert(await host.evaluate(`(async()=>{${canvasSceneFixture}${register}
 settings.animationSpeed=0;const children=Array.from({length:28},(_,i)=>'Growing '+i+'.md');for(const path of children)pages.set(path,{...pages.get('C.md'),path,name:path,file:{...pages.get('C.md').file,path}});
 index.neighbours=(page,role)=>(page.path==='A.md'&&role==='parent'?['B.md']:page.path==='B.md'&&role==='child'?['A.md',...children]:[]).map(path=>({page:pages.get(path),role,relationType:1,linkDirection:1}));
 const ui=attach(await mount(M.builtInPlexViews.resolve('mindmap'))),panel=()=>ui.container.querySelector('.kplex-zone-parent'),card=path=>[...ui.container.querySelectorAll('.kplex-thought')].find(el=>el.dataset.kplexPath===path);
 ui.session.setAreaHeight('parentHeight',140);ui.render();await wait();const smallHeight=parseFloat(panel().style.height),bodyTop=parseFloat(card('B.md').style.top),rootTop=parseFloat(card('A.md').style.top);
 ui.session.setAreaHeight('parentHeight',800);ui.render();await wait();const p=panel(),fixed=p.querySelector('.kplex-zone-fixed');
 check(parseFloat(p.style.height)===800&&parseFloat(card('B.md').style.top)-bodyTop===800-smallHeight,'Added empty space is above bottom-aligned content');
 check(parseFloat(card('A.md').style.top)===rootTop&&!p.querySelector('.kplex-zone-scroll')&&fixed.scrollHeight<=fixed.clientHeight+1,'Mind Map declares no internal scroller');
 const camera=ui.container.querySelector('.kplex-camera'),before=camera.style.transform;card('B.md').dispatchEvent(new WheelEvent('wheel',{bubbles:true,cancelable:true,clientX:500,clientY:300,deltaY:-30}));await wait();check(camera.style.transform!==before,'Plain wheel on fixed parent area reaches shared canvas zoom');
 ui.session.setAreaHeight('parentHeight',140);ui.render();card('B.md').querySelector('.is-branch-disclosure').click();await wait();ui.render();await wait();ui.render();
 check(card(children[27])&&parseFloat(panel().style.height)>800,'Expanded forest grows beyond the minimum height control ceiling');
 const expandedParent=card('B.md').getBoundingClientRect(),canvasBounds=ui.container.querySelector('.kplex-plex').getBoundingClientRect();check(expandedParent.top>=canvasBounds.top&&expandedParent.bottom<=canvasBounds.bottom,'Expanded fixed-region source must be revealed through the existing canvas owner');
 const box=panel().querySelector('.kplex-zone-fixed');check(box.scrollHeight<=box.clientHeight+1&&!ui.container.querySelector('.kplex-zone-scroll'),'Expanded Mind Map has no scrollable areas');box.scrollTop=1000;check(box.scrollTop===0,'Fixed region cannot acquire hidden scroll offset');
 const toggle=panel().querySelector('.kplex-zone-filter-button');toggle.click();await wait();const field=panel().querySelector('input');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(field,'Growing 27');field.dispatchEvent(new Event('input',{bubbles:true}));await wait();ui.render();await wait();
 check(card('B.md')&&card(children[27])&&!card(children[0]),'Shared filter preserves exact matching ancestor path');
 check(box.scrollHeight<=box.clientHeight+1&&work.body===0&&work.scans===0,'Filtering and growth do not create scrolling, body reads or inventory');
 releases.forEach(release=>release());ui.close();plugin.actionManager.dispose();style.remove();return true})()`));}finally{await host.cleanup()}
});
