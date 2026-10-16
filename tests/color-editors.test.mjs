/** Actual source/literal controls and private CSS bindings in real Chromium; no vault or graph fixture. */
import assert from "node:assert/strict";
import test from "node:test";
import {build} from "esbuild";
import {chromiumHarness} from "./support/browserTypeScript.mjs";
import {nativeColorControls,initializeColorDom} from "./support/nativeColorControls.mjs";
const compiled=await build({stdin:{resolveDir:process.cwd(),contents:`export * from './src/ui/ColorLiteralEditor';export * from './src/ui/ColorSourceModal';export * from './src/adapters/obsidian/colorScope';export * from './src/adapters/obsidian/colorSample';export * from './src/adapters/obsidian/colorPresentation';export * from './src/core/plex/colorPreferences';export * from './src/core/contracts/colorValue';export * from './src/lang';`},bundle:true,write:false,format:"iife",globalName:"sourceModules",platform:"browser",plugins:[{name:"native-controls",setup(builder){builder.onResolve({filter:/^obsidian$/},()=>({path:"obsidian",namespace:"native"}));builder.onLoad({filter:/.*/,namespace:"native"},()=>({contents:nativeColorControls}));}}]});
/** Run one isolated document and always release its actual browser process/profile. */
async function scenario(code){const host=await chromiumHarness(compiled.outputFiles[0].text);try{assert.equal(await host.evaluate(initializeColorDom),true);return await host.evaluate(code)}finally{await host.cleanup()}}

test("literal controls preserve exact alpha, partial text/caret, IME, reset and retired callbacks",async()=>{
 const result=await scenario(`(async()=>{
  const changes=[],labels={rgb:'RGB',value:'Value',opacity:'Opacity',reset:'Reset',invalid:'Invalid',legacy:'Legacy'};
  const editor=new sourceModules.ColorLiteralEditor(scope,{label:'Fixed',initial:'rgba(12,34,56,0.123456789)',labels,onChange:(value,valid)=>changes.push({value,valid})});
  if(changes.length)throw Error('Opening notified');
  const text=scope.querySelector('input[type=text]'),rgb=scope.querySelector('input[type=color]'),opacity=scope.querySelector('input[type=number]');
  input(rgb,'#abcdef');if(sourceModules.parseLiteralColor(editor.getValue()).alpha!==0.123456789)throw Error('Alpha rounded');
  text.focus();input(text,'#12');text.setSelectionRange(2,2);editor.setDisabled(true);editor.setDisabled(false);
  if(text.value!=='#12'||text.selectionStart!==2||editor.isValid())throw Error('Partial draft lost');
  text.dispatchEvent(new CompositionEvent('compositionstart'));input(text,'#11223300');if(editor.isValid())throw Error('IME admitted');
  text.dispatchEvent(new CompositionEvent('compositionend'));if(!editor.isValid()||sourceModules.parseLiteralColor(editor.getValue()).alpha!==0)throw Error('Zero alpha lost');
  input(rgb,'#ffffff');if(sourceModules.parseLiteralColor(editor.getValue()).alpha!==0)throw Error('RGB changed zero');
  input(opacity,'100');if(sourceModules.parseLiteralColor(editor.getValue()).alpha!==1)throw Error('One alpha lost');
  scope.querySelector('button').click();if(editor.getValue()!=='rgba(12,34,56,0.123456789)')throw Error('Reset lost original');
  const count=changes.length;editor.dispose();input(rgb,'#123456');if(changes.length!==count)throw Error('Retired callback');return true;
 })()`);assert.equal(result,true);
});

test("scope binds exact names and pairs, rejects non-colors and cycles, follows context and disposes",async()=>{
 assert.equal(await scenario(`(async()=>{
  scope.style.setProperty('--Accent-X','#12345680');scope.style.setProperty('--bad','12px');scope.style.setProperty('--kplex-semantic-origin','12px');
  preferences.palette.push({id:'stable',name:'Readable',light:'#abcdef00',dark:'#33445588'});
  const good={kind:'theme',variable:'--Accent-X'},bad={kind:'theme',variable:'--bad'},pair={kind:'palette',id:'stable'},semantic={kind:'theme',variable:'--kplex-semantic-origin'};
  const binding=new sourceModules.ColorScope(scope,{preferences,references:[good,bad,pair,semantic]});
  const child=scope.createSpan();const read=value=>{child.style.color=sourceModules.colorValueCss(value,'rgb(1, 2, 3)');return getComputedStyle(child).color};
  if(Math.abs(sourceModules.parseLiteralColor(read(good)).alpha-128/255)>1/255||read(bad)!=='rgb(1, 2, 3)'||read(pair)!=='rgba(51, 68, 85, 0.533)'||read(semantic)!=='rgb(170, 85, 238)')throw Error('Binding mismatch '+[read(good),read(bad),read(pair),read(semantic)]);
  if(!binding.getIssues().some(issue=>issue.reason==='invalid-color'))throw Error('Missing repair feedback');
  document.body.className='theme-light';await waitFor(()=>read(pair)==='rgba(171, 205, 239, 0)');
  preferences.semantic.origin=semantic;binding.update({preferences,references:[semantic]});if(!binding.getIssues().some(issue=>issue.reason==='semantic-cycle'))throw Error('Cycle admitted');
  binding.dispose();if([...scope.style].some(name=>name.startsWith('--_kplex-')))throw Error('Alias leaked');return true;
 })()`),true);
});

test("source modal excludes writes on open/cancel/unchanged save and serializes explicit alpha edits",async()=>{
 assert.equal(await scenario(`(async()=>{
  const writes=[],t=sourceModules.createTranslator('en');let release;
  const options={title:'Color',initial:'#11223366',sourceScope:scope,translate:t,target:{kind:'canvas'},preferences:()=>preferences,nodeStyle:()=>({}),linkStyle:()=>({}),background:()=>undefined,onSave:async value=>{writes.push(value);await new Promise(r=>release=r);return {refreshPending:false}}};
  let modal=new sourceModules.ColorSourceModal({},options);modal.open();if(writes.length)throw Error('Opening wrote');
  const oldText=modal.contentEl.querySelector('input[type=text]');modal.close();input(oldText,'#abcdef');if(writes.length)throw Error('Retired input wrote');
  modal=new sourceModules.ColorSourceModal({},options);modal.open();[...modal.contentEl.querySelectorAll('button')].find(el=>el.textContent==='Save').click();if(writes.length||modal.modalEl.isConnected)throw Error('Unchanged write');
  modal=new sourceModules.ColorSourceModal({},options);modal.open();input(modal.contentEl.querySelector('input[type=color]'),'#abcdef');
  const save=[...modal.contentEl.querySelectorAll('button')].find(el=>el.textContent==='Save');save.click();save.click();modal.close();
  if(writes.length!==1||sourceModules.parseLiteralColor(writes[0]).alpha!==102/255||!modal.modalEl.isConnected||!save.disabled)throw Error('Pending/alpha violation');
  release();await waitFor(()=>!modal.modalEl.isConnected);await new Promise(r=>setTimeout(r,30));if(document.querySelector('iframe')||scope.querySelector('.kplex-color-draft-scope'))throw Error('Editor resources leaked');return true;
 })()`),true);
});

test("unresolved legacy expressions and opaque source values stay safe, repairable and unchanged without writes",async()=>{
 assert.equal(await scenario(`(async()=>{
  const reader=new sourceModules.ColorSampleReader(document);if(reader.read(scope,'var(--unavailable)')!==null||reader.read(scope,'12px')!==null)throw Error('Unavailable color sampled inherited text');
  if(!reader.read(scope,'var(--text-normal)'))throw Error('Valid theme variable unavailable');reader.dispose();
  const t=sourceModules.createTranslator('en'),writes=[],options={title:'Color',sourceScope:scope,translate:t,target:{kind:'canvas'},preferences:()=>preferences,nodeStyle:()=>({}),linkStyle:()=>({}),background:()=>undefined,onSave:async value=>{writes.push(value);return {refreshPending:false}}};
  for(const initial of [null,{kind:'future',payload:{kept:true}},{kind:'theme'},{kind:'theme',variable:null},{kind:'theme',variable:['--text-normal']},{kind:'palette',id:['stable']}]){
   const modal=new sourceModules.ColorSourceModal({}, {...options,initial});modal.open();
   [...modal.contentEl.querySelectorAll('button')].find(el=>el.textContent==='Save').click();if(modal.modalEl.isConnected||writes.length)throw Error('Opaque unchanged source wrote or crashed');
  }
  const modal=new sourceModules.ColorSourceModal({}, {...options,initial:null});modal.open();input(modal.contentEl.querySelector('select'),'inherit','change');[...modal.contentEl.querySelectorAll('button')].find(el=>el.textContent==='Save').click();await waitFor(()=>!modal.modalEl.isConnected);if(writes.length!==1||writes[0]!==undefined)throw Error('Explicit repair failed');return true;
 })()`),true);
});

test("nested semantic source failures reach the selected semantic identity with safe native fallback",async()=>{
 assert.equal(await scenario(`(()=>{
  preferences.semantic.origin={kind:'palette',id:'missing'};preferences.semantic.support={kind:'theme',variable:'--kplex-semantic-origin'};
  const support={kind:'theme',variable:'--kplex-semantic-support'},binding=new sourceModules.ColorScope(scope,{preferences,references:[support]});
  const issue=binding.getIssues().find(issue=>sourceModules.colorValuesEqual(issue.source,support));if(issue?.reason!=='missing-palette')throw Error('Missing nested repair cause');
  const sample=scope.createSpan();sample.style.color=sourceModules.colorValueCss(support,'rgb(1,2,3)');if(getComputedStyle(sample).color!=='rgb(170, 85, 238)')throw Error('Native semantic fallback lost');
  preferences.semantic.origin={kind:'theme',variable:'--kplex-semantic-origin'};binding.update({preferences,references:[support]});if(!binding.getIssues().some(issue=>sourceModules.colorValuesEqual(issue.source,support)&&issue.reason==='semantic-cycle'))throw Error('Incoming cycle not reported');binding.dispose();return true;
 })()`),true);
});

test("source-document adoption retires native preview ownership while accepted Save remains durable",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en'),writes=[];let release;
  const options={title:'Color',initial:'#11223366',sourceScope:scope,translate:t,target:{kind:'canvas'},preferences:()=>preferences,nodeStyle:()=>({}),linkStyle:()=>({}),background:()=>undefined,onSave:async value=>{writes.push(value);await new Promise(resolve=>release=resolve);return{refreshPending:false}}};
  const modal=new sourceModules.ColorSourceModal({},options);modal.open();input(modal.contentEl.querySelector('input[type=color]'),'#abcdef');[...modal.contentEl.querySelectorAll('button')].find(el=>el.textContent==='Save').click();if(writes.length!==1)throw Error('Save not accepted');
  const destination=document.createElement('iframe');document.body.append(destination);destination.contentDocument.body.append(scope);emitMigration(scope);
  if(modal.modalEl.isConnected||migrationListeners!==0||scope.querySelector('.kplex-color-draft-scope'))throw Error('Old-document editor ownership leaked');
  release();await new Promise(resolve=>setTimeout(resolve,30));if(writes.length!==1||document.querySelector('iframe[sandbox]'))throw Error('Late Save repainted retired editor');destination.remove();return true;
 })()`),true);
});

test("explicit Fixed conversion uses the consumer fallback and preserves exact named-variant alpha",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en'),options={title:'Color',sourceScope:scope,translate:t,target:{kind:'canvas'},preferences:()=>preferences,nodeStyle:()=>({}),linkStyle:()=>({}),background:()=>undefined,onSave:async()=>({refreshPending:false})};
  let modal=new sourceModules.ColorSourceModal({}, {...options,initial:undefined});modal.open();input(modal.contentEl.querySelector('select'),'fixed','change');let value=sourceModules.parseLiteralColor(modal.contentEl.querySelector('input[type=text]').value);if(value.red!==24||value.green!==24||value.blue!==24)throw Error('Canvas seeded from unrelated text color');modal.close();
  preferences.palette.push({id:'alpha',name:'Alpha',light:'#12345640',dark:'#33445588'});modal=new sourceModules.ColorSourceModal({}, {...options,initial:{kind:'palette',id:'alpha'}});modal.open();input(modal.contentEl.querySelector('select'),'fixed','change');const text=modal.contentEl.querySelector('input[type=text]');if(text.value!=='#33445588')throw Error('Named alpha rounded by CSS');input(modal.contentEl.querySelector('input[type=color]'),'#abcdef');if(sourceModules.parseLiteralColor(text.value).alpha!==136/255)throw Error('RGB changed named alpha');modal.close();return true;
 })()`),true);
});
