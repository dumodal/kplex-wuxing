/** Render real phase geometry, radar and ThoughtNode in Chromium; host services stay bounded doubles. */
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { build } from "esbuild";
import test from "node:test";
import { chromiumHarness } from "./support/browserTypeScript.mjs";

const bundle = await build({stdin:{contents:`
import React from "react"; import {createRoot} from "react-dom/client"; import {flushSync} from "react-dom";
import {buildScene} from "./src/ui/layout"; import {ThoughtNode} from "./src/ui/ThoughtNode";
import {WuXingGuide} from "./src/ui/WuXingGuide"; import {migrateAndMergeSettings} from "./src/settings";
import {createTranslator} from "./src/lang";
import {createWuXingTranslator} from "./src/lang/wuxing";
import {WuXingLanguageControl} from "./src/ui/features/WuXingLanguageControl";
import {LayoutControls} from "./src/ui/components/LayoutControls";
import {WuXingIntroductionContent} from "./src/ui/features/WuXingIntroductionContent";
import {centeredViewportFit,wuXingScaffoldBounds} from "./src/ui/components/viewportFit";
window.sourceModules={React,createRoot,flushSync,buildScene,ThoughtNode,WuXingGuide,migrateAndMergeSettings,createTranslator,createWuXingTranslator,WuXingLanguageControl,LayoutControls,WuXingIntroductionContent,centeredViewportFit,wuXingScaffoldBounds};
`,resolveDir:process.cwd()},bundle:true,write:false,platform:"browser",format:"iife",jsx:"automatic",
plugins:[{name:"host",setup(b){b.onResolve({filter:/^obsidian$/},()=>({path:"obsidian",namespace:"host"}));b.onLoad({filter:/.*/,namespace:"host"},()=>({contents:
`export class App {} export class Modal {} export class Notice {} export class Setting {} export class AbstractInputSuggest {} export class PluginSettingTab {} export class Scope {}
export class ButtonComponent {} export class ExtraButtonComponent {} export class SearchComponent {}
export const getIcon=()=>null, getIconIds=()=>[],setIcon=()=>{},setTooltip=()=>{},getLanguage=()=>"en",Platform={};`
}));}}]});

test("five colored regions and off-center current note render with fixed wood-top orientation", async()=>{
 const browser=await chromiumHarness(bundle.outputFiles[0].text);
 try {
  await browser.command("Emulation.setDeviceMetricsOverride",{width:1200,height:800,deviceScaleFactor:1,mobile:false});
  const css=await readFile("styles.css","utf8");
  await browser.evaluate(`document.head.insertAdjacentHTML("beforeend",'<style>'+${JSON.stringify(css)}+'</style>');document.body.style.cssText="margin:0;background:#faf8f2;--text-normal:#303b3a;--text-muted:#68716a;--text-faint:#a2aaa0;--background-primary:#faf8f2;font-family:Arial,sans-serif";`);
  await browser.evaluate(`(()=>{
    const {React,createRoot,flushSync,buildScene,ThoughtNode,WuXingGuide,migrateAndMergeSettings,createTranslator,centeredViewportFit,wuXingScaffoldBounds}=window.sourceModules;
    const phases=['🟡','🔵','🟢','🔴','🟤'],labels=['金','水','木','火','土'],colors=['#ffde24','#51adfb','#2abb56','#f95148','#80716b'];
    const settings=migrateAndMergeSettings({graphDepth:1,showNeighborCount:false,noteTypeStyles:Object.fromEntries(phases.map((phase,i)=>[phase,{backgroundColor:colors[i],textColor:i===4?'#ffffff':'#161616'}]))});
    const page=(name,phase)=>({path:name+'.md',name,phase,file:{extension:'md'},aliases:[],tags:[],styleTags:[],neighbours:new Map()});
    const currentPhase=${JSON.stringify(process.env.WUXING_DEMO_MODE==='wood'?'🟢':'🟡')};
    const n={center:page('当前笔记 · '+labels[phases.indexOf(currentPhase)],currentPhase),siblings:[],parents:[],children:[],leftFriends:[],rightFriends:[]};
    const fields=['siblings','children','rightFriends','leftFriends','parents'];
    ${JSON.stringify(process.env.WUXING_DEMO_MODE==='empty'?[0,0,0,0,0]:process.env.WUXING_DEMO_MODE==='wood'?[0,0,12,0,0]:process.env.WUXING_DEMO_MODE==='balanced'?[1,2,2,2,2]:[1,4,3,2,1])}.forEach((count,i)=>{n[fields[(i-phases.indexOf(currentPhase)+5)%5]]=Array.from({length:count},(_,j)=>({page:page(labels[i]+' · 连接笔记 '+(j+1),phases[i]),relationType:1,typeDefinition:'',linkDirection:0}));});
    const index={titleFor:p=>p.name,neighbourCount:()=>0,gateStats:()=>({top:{visibleCount:0},bottom:{visibleCount:0},left:{visibleCount:0},right:{visibleCount:0}}),isWuXingMode:()=>true,wuXingPhase:p=>p.phase,neighbours:()=>[],visibleRelationshipsWithin:()=>[]};
    const scene=buildScene(n,index,settings,false),noop=()=>{},translate=createTranslator('en');
    window.demoScene=scene;
    const root=createRoot(document.body.appendChild(document.createElement('div')));
    const fitted=centeredViewportFit(1200,800,scene.wuXing.focalPoint,wuXingScaffoldBounds(scene.wuXing.vertices),3);
    const scale=fitted.scale;window.demoCamera=fitted;
    const renderNode=node=>React.createElement(ThoughtNode,{key:node.page.path,node,settings,selected:node.role==='center',highlighted:false,dimmed:false,highlightedGates:new Set(),translate,onActivate:noop,onOpen:noop,onHoverNode:noop,onHoverGate:noop,onHoverEnd:noop,onHoverPreview:noop,onGatePointerDown:noop,onNodePointerDown:noop});
    flushSync(()=>root.render(React.createElement('div',{className:'is-wuxing',style:{position:'relative',height:800}},
      React.createElement('div',{style:{position:'absolute',left:36,top:24,color:'#4d5750'}},'五行分组 · 演示数据'),
      React.createElement('div',{style:{position:'absolute',left:36,top:52,color:'#68716a',fontSize:13}},'框与框之间相生、相克 · 五角星渐变呈现数量分布'),
      React.createElement('div',{style:{position:'absolute',left:fitted.x,top:fitted.y,transform:'scale('+scale+')'}},
        React.createElement('svg',{width:1800,height:1600,viewBox:'-900 -800 1800 1600',style:{position:'absolute',left:-900,top:-800,overflow:'visible'}},
          React.createElement(WuXingGuide,{geometry:scene.wuXing,phaseLabel:phase=>['Metal','Water','Wood','Fire','Earth'][phases.indexOf(phase)],generateLabel:'Generates',controlLabel:'Regulates',description:'演示分布'})),
        renderNode(scene.nodes[0]),
        ...Object.entries(scene.zoneViewports).map(([role,panel])=>React.createElement('div',{key:role,className:'kplex-zone-panel',style:{position:'absolute',left:panel.left,top:panel.top,width:panel.width,height:panel.height}},
          React.createElement('div',{className:'kplex-zone-tools'},React.createElement('button',{type:'button'},'筛选')),
          React.createElement('div',{className:'kplex-zone-scroll',style:{height:'100%',overflow:'auto'}},React.createElement('div',{className:'kplex-zone-content',style:{height:panel.contentHeight}},
            ...scene.nodes.filter(n=>n.role===role).map(n=>renderNode({...n,x:n.x-panel.left,y:n.y-panel.contentTop}))))))))));
  })()`);
  const result=await browser.evaluate(`({waterLinks:[...document.querySelectorAll('.kplex-wuxing-phase-connection[data-source-phase="🔵"]')].map(e=>({target:e.dataset.targetPhase,label:e.querySelector('text').textContent})),groupEdges:document.querySelectorAll('.kplex-wuxing-phase-edge').length,frames:document.querySelectorAll('.kplex-wuxing-phase-frame').length,edgeLabels:[...document.querySelectorAll('.kplex-wuxing-phase-edge-label')].map(e=>e.textContent),wedges:document.querySelectorAll('.kplex-wuxing-wedge').length,vertices:window.demoScene.wuXing.vertices.map(v=>v.phase),center:window.demoScene.nodes[0],polygons:[...document.querySelectorAll('.kplex-wuxing-wedge')].map(e=>e.getAttribute('fill')),gateDisplay:getComputedStyle(document.querySelector('.kplex-gate-wrap')).display})`);
  assert.deepEqual(result.waterLinks,[{target:"🟢",label:"Generates"},{target:"🔴",label:"Regulates"}]);assert.equal(result.groupEdges,10);assert.equal(result.frames,5);assert.deepEqual(new Set(result.edgeLabels),new Set(["Generates","Regulates"]));assert.equal(result.wedges,5);assert.deepEqual(result.vertices,['🟢','🔴','🟤','🟡','🔵']);
  if(process.env.WUXING_DEMO_MODE==='wood') assert(result.center.y<0);else assert(result.center.x<0 && result.center.y>0);assert.equal(result.gateDisplay,'none');
  assert.equal(new Set(result.polygons).size,5);
  const shapes=await browser.evaluate(`({straight:[...document.querySelectorAll('.is-generative .kplex-wuxing-phase-edge')].every(e=>e.getAttribute('d').includes(' L ')&&!e.getAttribute('d').includes(' Q ')),curved:[...document.querySelectorAll('.is-control .kplex-wuxing-phase-edge')].every(e=>e.getAttribute('d').includes(' Q ')),oldRadar:document.querySelectorAll('.kplex-wuxing-axis,.kplex-wuxing-balance,.kplex-wuxing-distribution').length,star:document.querySelectorAll('.kplex-wuxing-star polygon').length})`);
  assert.deepEqual(shapes,{straight:true,curved:true,oldRadar:0,star:5});
  const cycleVisibility=await browser.evaluate(`(()=>{
    const edges=[...document.querySelectorAll('.kplex-wuxing-phase-edge')].map(e=>({width:parseFloat(getComputedStyle(e).strokeWidth),opacity:Number(getComputedStyle(e).opacity)*Number(getComputedStyle(e.parentElement).opacity),dash:getComputedStyle(e).strokeDasharray,stroke:getComputedStyle(e).stroke}));
    const marker=document.querySelector('.kplex-wuxing-guide marker');return {edges,markerWidth:Number(marker.getAttribute('markerWidth')),markerUnits:marker.getAttribute('markerUnits'),headFill:marker.querySelector('path').getAttribute('fill')};
  })()`);
  for(const edge of cycleVisibility.edges){assert(edge.width>=2,'both cycles need a visible stroke at overview scale');assert(edge.opacity>=.85,'cycle lines must not fade with phase depth');assert.equal(edge.dash,'none','each cycle should read as a continuous path');}
  assert(cycleVisibility.markerWidth*await browser.evaluate('window.demoCamera.scale')>=8,'arrowheads must be visible at the fitted overview scale');
  assert.equal(cycleVisibility.markerUnits,'userSpaceOnUse');assert.notEqual(cycleVisibility.headFill,'none','direction uses a filled arrowhead');
  const curves=await browser.evaluate(`(()=>{const vertices=window.demoScene.wuXing.vertices;return [...document.querySelectorAll('.is-control .kplex-wuxing-phase-edge')].map(path=>{const source=path.parentElement.dataset.sourcePhase;const i=vertices.findIndex(v=>v.phase===source);const f=vertices[(i+1)%5].frame;const length=path.getTotalLength();return {segments:(path.getAttribute('d').match(/ Q /g)||[]).length,entersFrame:Array.from({length:99},(_,j)=>path.getPointAtLength(length*(j+1)/100)).some(p=>p.x>f.left&&p.x<f.left+f.width&&p.y>f.top&&p.y<f.top+f.height)};});})()`);
  assert.equal(curves.length,5);assert(curves.every(c=>c.segments===1&&!c.entersFrame));
  const arms=await browser.evaluate(`([...document.querySelectorAll('.kplex-wuxing-wedge')].map((p,i)=>({opacity:Number(p.getAttribute('opacity')),tip:p.points.getItem(2),vertex:window.demoScene.wuXing.vertices[i]})).map(a=>({opacity:a.opacity,count:a.vertex.count,reach:Math.hypot(a.tip.x,a.tip.y)/Math.hypot(a.vertex.x,a.vertex.y)})))`);
  const total=arms.reduce((s,a)=>s+a.count,0);
  for(const arm of arms){assert.equal(arm.opacity,arm.count>0?1:0);assert(Math.abs(arm.reach-0.88*Math.sqrt(arm.count/total))<0.0001);}
  const overlap=await browser.evaluate(`(()=>{const note=document.querySelector('.kplex-role-center').getBoundingClientRect();return [...document.querySelectorAll('.kplex-zone-tools')].some(e=>{const r=e.getBoundingClientRect();return r.left<note.right&&r.right>note.left&&r.top<note.bottom&&r.bottom>note.top;});})()`);
  assert.equal(overlap,false,'phase tools must not cover the current note');
  const readable=await browser.evaluate(`(()=>{const scale=window.demoCamera.scale;return {
    headings:[...document.querySelectorAll('.kplex-wuxing-phase-label')].map((e,i)=>({phase:window.demoScene.wuXing.vertices[i].phase,font:parseFloat(getComputedStyle(e).fontSize)*scale,box:e.getBoundingClientRect().toJSON()})),
    notes:[...document.querySelectorAll('.kplex-thought')].map(e=>({phase:window.demoScene.nodes.find(n=>n.page.path===e.dataset.kplexPath).page.phase,font:parseFloat(getComputedStyle(e).fontSize)*scale,height:e.getBoundingClientRect().height,opacity:Number(getComputedStyle(e).opacity)})),
    arrows:[...document.querySelectorAll('.kplex-wuxing-phase-connection')].map(e=>({font:parseFloat(getComputedStyle(e.querySelector('text')).fontSize)*scale,width:Number(e.querySelector('rect').getAttribute('width')),text:e.querySelector('text').getComputedTextLength()}))
  };})()`);
  for(const heading of readable.headings){assert(heading.font>=12,'overview phase heading must remain readable');assert(heading.box.left>=0&&heading.box.right<=1200&&heading.box.top>=0&&heading.box.bottom<=800,'overview includes every phase heading');}
  for(const note of readable.notes){assert(note.font>=12,'overview note label must remain readable');assert(note.height>=note.font*1.08,'larger text requires actual card height');assert(note.opacity>=.85,'rear note labels retain contrast');}
  for(const arrow of readable.arrows)assert(arrow.width>=arrow.text,'English relation labels must fit their backgrounds');
  for(const note of readable.notes){const heading=readable.headings.find(h=>h.phase===note.phase);assert(note.font<=heading.font*.9,'phase headings must be visually larger than note titles');assert(note.font<=readable.arrows[0].font*1.3,'note titles must remain balanced with relationship labels');}
  const currentLabel=await browser.evaluate(`(()=>{const e=document.querySelector('.kplex-role-center .kplex-thought-text');return {width:e.clientWidth,content:e.scrollWidth};})()`);
  assert(currentLabel.content<=currentLabel.width,'short current-note title must fit the enlarged card');
  const firstRows=await browser.evaluate(`([...document.querySelectorAll('.kplex-zone-panel')].map(panel=>{const row=panel.querySelector('.kplex-thought').getBoundingClientRect(),box=panel.getBoundingClientRect();return {top:row.top,bottom:row.bottom,panelTop:box.top,panelBottom:box.bottom};}))`);
  for(const row of firstRows)assert(row.top>=row.panelTop&&row.bottom<=row.panelBottom,'first note row must be fully visible below the group controls');
  if(process.env.WUXING_PREVIEW_PATH){const shot=await browser.command('Page.captureScreenshot',{format:'png'});await writeFile(process.env.WUXING_PREVIEW_PATH,Buffer.from(shot.data,'base64'));}
 } finally {await browser.cleanup();}
});


test("language selection switches real graph labels, fits English arrows, and restores the saved choice", async () => {
  const browser = await chromiumHarness(bundle.outputFiles[0].text);
  try {
    await browser.command("Emulation.setDeviceMetricsOverride", {width: 1200, height: 1000, deviceScaleFactor: 1, mobile: false});
    const css = await readFile("styles.css", "utf8");
    await browser.evaluate(`document.head.insertAdjacentHTML('beforeend','<style>'+${JSON.stringify(css)}+'</style>');`);
    await browser.evaluate(`(() => {
      const {React,createRoot,flushSync,buildScene,WuXingGuide,migrateAndMergeSettings,createTranslator,createWuXingTranslator,WuXingLanguageControl,LayoutControls} = window.sourceModules;
      const settings = migrateAndMergeSettings({});
      const page = {path:'note.md',name:'Sample',phase:'🟡',file:{extension:'md'},neighbours:new Map()};
      const n = {center:page,siblings:[],parents:[],children:[],leftFriends:[],rightFriends:[]};
      const index = {titleFor:p=>p.name,neighbourCount:()=>0,gateStats:()=>({}),isWuXingMode:()=>true,wuXingPhase:p=>p.phase,neighbours:()=>[],visibleRelationshipsWithin:()=>[]};
      const scene = buildScene(n,index,settings,false);
      const root = createRoot(document.body.appendChild(document.createElement('div')));
      const translate = createWuXingTranslator(createTranslator('en'),()=>settings.wuxingLanguage);
      const keys = {'🟢':'wuxing.wood','🔴':'wuxing.fire','🟤':'wuxing.earth','🟡':'wuxing.metal','🔵':'wuxing.water'};
      window.renderLanguage = () => flushSync(()=>root.render(React.createElement(React.Fragment,null,
        React.createElement(LayoutControls,{width:1200,height:1000,expanded:true,toggle:null},
          React.createElement(WuXingLanguageControl,{language:settings.wuxingLanguage,translate,onChange:language=>{
            settings.wuxingLanguage=language;
            window.savedLanguageSettings=JSON.stringify(settings);
            window.renderLanguage();
          }})),
        React.createElement('svg',{width:1200,height:800,viewBox:'-900 -800 1800 1600'},
          React.createElement(WuXingGuide,{geometry:scene.wuXing,phaseLabel:phase=>translate(keys[phase]),generateLabel:translate('wuxing.generate'),controlLabel:translate('wuxing.control'),description:translate('wuxing.distribution')}))
      )));
      window.renderLanguage();
      window.reloadLanguage=()=>{Object.assign(settings,migrateAndMergeSettings(JSON.parse(window.savedLanguageSettings)));window.renderLanguage();};
    })()`);
    const labels = () => browser.evaluate(`({phases:[...document.querySelectorAll('.kplex-wuxing-phase-label')].map(e=>e.textContent),edges:[...new Set([...document.querySelectorAll('.kplex-wuxing-phase-edge-label')].map(e=>e.textContent))],language:document.querySelector('select').value})`);
    assert.deepEqual(await labels(), {phases:['Wood','Fire','Earth','Metal','Water'],edges:['Generates','Regulates'],language:'en'});
    await browser.evaluate(`(()=>{const select=document.querySelector('select');select.value='zh';select.dispatchEvent(new Event('change',{bubbles:true}));})()`);
    assert.deepEqual(await labels(), {phases:['木','火','土','金','水'],edges:['生','克'],language:'zh'});
    await browser.evaluate(`(()=>{const select=document.querySelector('select');select.value='en';select.dispatchEvent(new Event('change',{bubbles:true}));})()`);
    assert.deepEqual(await labels(), {phases:['Wood','Fire','Earth','Metal','Water'],edges:['Generates','Regulates'],language:'en'});
    assert(await browser.evaluate(`[...document.querySelectorAll('.kplex-wuxing-phase-connection')].every(e=>Number(e.querySelector('rect').getAttribute('width')) >= e.querySelector('text').getComputedTextLength())`));
    await browser.evaluate('window.reloadLanguage()');
    assert.equal((await labels()).language, 'en');
    await browser.evaluate(`(()=>{const select=document.querySelector('select');select.value='zh';select.dispatchEvent(new Event('change',{bubbles:true}));})()`);
    assert.deepEqual(await labels(), {phases:['木','火','土','金','水'],edges:['生','克'],language:'zh'});
  } finally { await browser.cleanup(); }
});


test("onboarding explains A/B and all five relationships, changes examples with the reference, and closes", async () => {
  const browser=await chromiumHarness(bundle.outputFiles[0].text);
  try {
    await browser.command("Emulation.setDeviceMetricsOverride",{width:900,height:1000,deviceScaleFactor:1,mobile:false});
    const css=await readFile('styles.css','utf8');
    await browser.evaluate(`document.head.insertAdjacentHTML('beforeend','<style>'+${JSON.stringify(css)}+'</style>');`);
    await browser.evaluate(`(()=>{
      const {React,createRoot,flushSync,createTranslator,createWuXingTranslator,WuXingIntroductionContent}=window.sourceModules;
      const root=createRoot(document.body.appendChild(document.createElement('div')));
      window.guideCloseCount=0;
      window.renderIntroduction=language=>flushSync(()=>root.render(React.createElement(WuXingIntroductionContent,{translate:createWuXingTranslator(createTranslator('en'),()=>language),onClose:()=>{window.guideCloseCount++;flushSync(()=>root.unmount());}})));
      window.renderIntroduction('en');
    })()`);
    const info=()=>browser.evaluate(`({original:document.querySelector('[data-wuxing-original]').textContent,captured:document.querySelector('[data-wuxing-captured]').textContent,rows:document.querySelectorAll('tbody tr').length,text:document.body.textContent,code:document.querySelector('pre').textContent})`);
    const initial=await info();
    assert.equal(initial.original,'Fire 🔴');assert.equal(initial.captured,'Earth 🟤');assert.equal(initial.rows,10);
    assert(initial.text.includes('A. What I generate'));assert(initial.text.includes('B. What I obtain'));
    assert(initial.text.includes('Does not necessarily agree with me.'));
    assert(initial.text.includes('Something I obtain from outside or bring under my influence.'));
    assert(initial.text.includes('Gives me a direction to work toward, or sets rules I am expected to follow.'));
    assert(initial.text.includes('Too much capture or management can consume my time and energy.'));
    assert(initial.text.includes('Too much can restrict my action or exhaust me.'));
    assert(!initial.text.includes('Does not necessarily harm it.'));
    assert(!initial.text.includes('Does not necessarily oppose me.'));
    assert(initial.text.includes('If your notes already have Wu Xing status'));
    assert.equal(initial.code,'---\nstatus: 🔴\n---');
    assert(initial.text.includes('digital garden'));
    assert(initial.text.includes('a birth chart is not required'));
    assert(!initial.text.includes('Jia Wood'));
    assert(!initial.text.includes('Xin Metal'));
    assert.equal(await browser.evaluate("document.querySelector('select').value"),'🟢');
    assert(initial.text.includes('Five Phases'));
    assert(!initial.text.includes('Five Agents'));
    assert(initial.text.includes('Original term: Wu Xing (五行) · Pinyin: wǔ xíng.'));
    const withoutOrigin=await browser.evaluate(`(()=>{const content=document.querySelector('.kplex-wuxing-introduction').cloneNode(true);content.querySelector('[data-wuxing-origin]').remove();return content.textContent;})()`);
    assert(!/[\u3400-\u9fff]/u.test(withoutOrigin));
    for(const [reference,original,captured] of [
      ['🟡','Water 🔵','Wood 🟢'],['🔵','Wood 🟢','Fire 🔴'],['🟢','Fire 🔴','Earth 🟤'],
      ['🔴','Earth 🟤','Metal 🟡'],['🟤','Metal 🟡','Water 🔵'],
    ]) {
      await browser.evaluate(`(()=>{const select=document.querySelector('select');select.value=${JSON.stringify(reference)};select.dispatchEvent(new Event('change',{bubbles:true}));})()`);
      const changed=await info();assert.equal(changed.original,original);assert.equal(changed.captured,captured);
    }
    await browser.evaluate("window.renderIntroduction('zh')");
    const chinese=await info();assert(chinese.text.includes('A. 我生'));assert(chinese.text.includes('B. 我克'));assert(!chinese.text.includes('What I generate'));assert(chinese.text.includes('数字花园'));assert(chinese.text.includes('无须计算生辰八字'));
    assert.equal(chinese.original,'金 🟡');assert.equal(chinese.captured,'水 🔵');
    await browser.evaluate(`document.querySelector('button').click()`);
    assert.equal(await browser.evaluate('window.guideCloseCount'),1);
    assert.equal(await browser.evaluate("document.querySelector('.kplex-wuxing-introduction')===null"),true);
  } finally {await browser.cleanup();}
});
