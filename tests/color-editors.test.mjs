/** Actual source/literal controls and private CSS bindings in real Chromium; no vault or graph fixture. */
import assert from "node:assert/strict";
import test from "node:test";
import {build} from "esbuild";
import {chromiumHarness} from "./support/browserTypeScript.mjs";
import {nativeColorControls,initializeColorDom} from "./support/nativeColorControls.mjs";
const compiled=await build({stdin:{resolveDir:process.cwd(),contents:`export * from './src/adapters/obsidian/colorChanges';export * from './src/adapters/obsidian/themePreview';export * as React from 'react';export {createRoot} from 'react-dom/client';export {flushSync} from 'react-dom';export * from './src/ui/PlexFilter';export * from './src/settings';export * from './src/ui/ColorPaletteModal';export * from './src/ui/ColorPairModal';export * from './src/ui/CompassSettingsModal';export * from './src/core/plex/colorEditing';export {Modal as TestModal} from 'obsidian';export * from './src/ui/ColorLiteralEditor';export * from './src/ui/ColorSourceModal';export * from './src/adapters/obsidian/colorScope';export * from './src/adapters/obsidian/colorSample';export * from './src/adapters/obsidian/colorPresentation';export * from './src/core/plex/colorPreferences';export * from './src/core/contracts/colorValue';export * from './src/lang';`},bundle:true,write:false,format:"iife",globalName:"sourceModules",platform:"browser",plugins:[{name:"native-controls",setup(builder){builder.onResolve({filter:/^obsidian$/},()=>({path:"obsidian",namespace:"native"}));builder.onLoad({filter:/.*/,namespace:"native"},()=>({contents:nativeColorControls}));}}]});
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


test("paired editor preserves the other mode, exact alpha, partial drafts, explicit resets and failed-save retry",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en'),initial={id:'pair',name:'Pair',light:'rgba(1,2,3,.123456789)',dark:'#aabbcc80'};let writes=0,fail=true,saved;
  const dialog=new sourceModules.ColorPairModal({}, {title:'Pair',initial,sourceScope:scope,translate:t,preferences:()=>preferences,nodeStyle:()=>({}),linkStyle:()=>({}),background:()=>undefined,
   onSave:async pair=>{writes++;if(fail)throw Error('disk rejected');saved=pair;return{refreshPending:false}}});dialog.open();
  const controls=[...dialog.contentEl.querySelectorAll('fieldset')],light=controls[0],dark=controls[1];
  input(light.querySelector('input[type=color]'),'#112233');if(sourceModules.parseLiteralColor(dark.querySelector('input[type=text]').value).alpha!==128/255)throw Error('Opposite mode overwritten');
  const alpha=sourceModules.parseLiteralColor(light.querySelector('input[type=text]').value).alpha;if(alpha!==.123456789||writes)throw Error('Alpha/open write');
  input(light.querySelector('input[type=text]'),'#12');const save=[...dialog.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Save');if(!save.disabled)throw Error('Partial draft admitted');
  light.querySelector('button').click();if(light.querySelector('input[type=text]').value!==initial.light)throw Error('Variant reset failed');
  input(dark.querySelector('input[type=number]'),'0');if(light.querySelector('input[type=text]').value!==initial.light)throw Error('Opacity edited opposite mode');
  save.click();await waitFor(()=>writes===1&&dialog.modalEl.getAttribute('aria-busy')==='false');if(!dialog.modalEl.isConnected||dark.querySelector('input[type=number]').value!=='0')throw Error('Failure lost draft');
  fail=false;save.click();await waitFor(()=>!dialog.modalEl.isConnected);if(writes!==2||sourceModules.parseLiteralColor(saved.dark).alpha!==0||saved.light!==initial.light)throw Error('Retry changed pair');
  const reset=new sourceModules.ColorPairModal({}, {title:'Reset',initial,sourceScope:scope,translate:t,preferences:()=>preferences,nodeStyle:()=>({}),linkStyle:()=>({}),background:()=>undefined,onSave:async()=>{throw Error('Unexpected write')}});reset.open();
  for(const el of reset.contentEl.querySelectorAll('input[type=color]'))input(el,'#ffffff');[...reset.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Reset both variants').click();
  const values=[...reset.contentEl.querySelectorAll('fieldset input[type=text]')].map(el=>el.value);if(JSON.stringify(values)!==JSON.stringify([initial.light,initial.dark]))throw Error('Pair reset lost opening values');reset.retire();
  if(document.querySelector('iframe[sandbox]')||window.migrationListeners)throw Error('Pair lifetime leaked');return true;
 })()`),true);
});

test("searchable palette bounds rows and atomically replaces all configured uses before deleting",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en');for(let i=0;i<15;i++)preferences.palette.push({id:'p'+i,name:'Pair '+i,light:'#11223300',dark:'#aabbcc80'});
  let settings={colorPreferences:preferences,baseNodeStyle:{textColor:{kind:'palette',id:'p0'}},graphLenses:[{style:{edge:{strokeColor:{kind:'palette',id:'p0'}}}}]},writes=0,changed;
  const options={sourceScope:scope,translate:t,preferences:()=>settings.colorPreferences,nodeStyle:()=>settings.baseNodeStyle,linkStyle:()=>({}),background:()=>undefined,read:()=>settings,readOnly:()=>false,canDelete:()=>true,
   subscribe:callback=>{changed=callback;return()=>changed=null},write:async edit=>{const draft=structuredClone(settings);edit(draft);settings=draft;writes++;changed?.();return{refreshPending:false}}};
  const dialog=new sourceModules.ColorPaletteModal({},options);dialog.open();if(dialog.contentEl.querySelectorAll('.kplex-palette-row').length!==12||writes)throw Error('Unbounded rows/open write');
  [...dialog.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Show 3 more').click();if(dialog.contentEl.querySelectorAll('.kplex-palette-row').length!==15)throw Error('More missing');
  input(dialog.contentEl.querySelector('input[type=search]'),'Pair 0');if(dialog.contentEl.querySelectorAll('.kplex-palette-row').length!==1)throw Error('Search missing');
  dialog.contentEl.querySelector('.kplex-palette-row').querySelectorAll('button')[2].click();
  const remove=sourceModules.TestModal.instances.at(-1),deleteButton=[...remove.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Delete');if(!deleteButton.disabled)throw Error('In-use deletion admitted self replacement');
  input(remove.contentEl.querySelector('.kplex-color-source-editor select'),'inherit','change');if(deleteButton.disabled)throw Error('Explicit Default not admitted');deleteButton.click();await waitFor(()=>writes===1);
  if(settings.colorPreferences.palette.some(pair=>pair.id==='p0')||sourceModules.namedColorUsage(settings).has('p0'))throw Error('Non-atomic delete');
  if(settings.baseNodeStyle.textColor!==undefined||settings.graphLenses[0].style.edge.strokeColor!==undefined)throw Error('Configured refs not replaced');dialog.retire();
  if(changed||window.migrationListeners)throw Error('Manager lifetime leaked');return true;
 })()`),true);
});

test("unused deletion rejects a newly arrived use and post-durable manager errors report saved refresh pending",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en');preferences.palette.push({id:'race',name:'Race',light:'#112233',dark:'#445566'});
  let settings={colorPreferences:preferences,baseNodeStyle:{}},writes=0,failRefresh=false;const common={sourceScope:scope,translate:t,preferences:()=>{if(failRefresh)throw Error('render failed');return settings.colorPreferences},nodeStyle:()=>({}),linkStyle:()=>({}),background:()=>undefined,read:()=>settings,readOnly:()=>false,canDelete:()=>true,subscribe:()=>()=>{},
   write:async edit=>{const draft=structuredClone(settings);edit(draft);settings=draft;writes++;failRefresh=true;return{refreshPending:false}}};
  const manager=new sourceModules.ColorPaletteModal({},common);manager.open();manager.contentEl.querySelector('.kplex-palette-row').querySelectorAll('button')[2].click();const remove=sourceModules.TestModal.instances.at(-1);
  settings.baseNodeStyle.textColor={kind:'palette',id:'race'};[...remove.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Delete').click();await waitFor(()=>remove.modalEl.getAttribute('aria-busy')==='false');
  if(writes||settings.colorPreferences.palette.length!==1||!remove.modalEl.isConnected||!window.notices.some(message=>message.includes('now used')))throw Error('New use silently cleared');remove.retire();
  manager.contentEl.querySelector('.kplex-palette-name').click();const pair=sourceModules.TestModal.instances.at(-1);input(pair.contentEl.querySelector('input[type=text]'),'Renamed');[...pair.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Save').click();
  await waitFor(()=>writes===1&&!pair.modalEl.isConnected);if(settings.colorPreferences.palette[0].name!=='Renamed'||!window.notices.some(message=>message.includes('saved')))throw Error('Durable outcome became unsaved');manager.retire();return true;
 })()`),true);
});

test("actual custom node source action preserves alpha through type switches and parent durable Save",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en');let settings=structuredClone(sourceModules.DEFAULT_SETTINGS),writes=0;
  const app={workspace:{on:()=>({}),offref:()=>{}}},plugin={settings,translator:t,index:{subscribePresentation:()=>()=>{},allPages:()=>[],unassignedOntologyFields:()=>[]},updateStyleSettings:async edit=>{const next=structuredClone(settings);edit(next);settings=next;plugin.settings=next;writes++;return{refreshPending:false}}};
  const tab=new sourceModules.KplexSettingTab(app,plugin);tab.update=()=>{};tab.openNodeStyleEditor('property',null);const parent=sourceModules.TestModal.instances.at(-1);
  input(parent.contentEl.querySelector('input[aria-label="Note type"]'),'Project');parent.contentEl.querySelector('button[aria-label="Background"]').click();const source=sourceModules.TestModal.instances.at(-1);
  input(source.contentEl.querySelector('.kplex-color-source-editor select'),'fixed','change');input(source.contentEl.querySelector('fieldset input[type=text]'),'rgba(12,34,56,.123456789)');
  [...source.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Use color').click();await waitFor(()=>!source.modalEl.isConnected);if(writes)throw Error('Child wrote settings');
  input(parent.contentEl.querySelector('select'),'tag','change');if(parent.contentEl.querySelector('button[aria-label="Background"]').textContent!=='rgba(12,34,56,.123456789)')throw Error('Type switch lost source');
  [...parent.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Save').click();await waitFor(()=>writes===1);if(settings.tagNodeStyles['#Project'].backgroundColor!=='rgba(12,34,56,.123456789)')throw Error('Parent lost exact alpha');
  settings.noteTypeStyles.Alpha={textColor:'#FFEEDD66'};tab.openNodeStyleEditor('property','Alpha');const imported=sourceModules.TestModal.instances.at(-1);imported.contentEl.querySelector('button[aria-label="Text"]').click();const rgb=sourceModules.TestModal.instances.at(-1);
  input(rgb.contentEl.querySelector('input[type=color]'),'#010203');[...rgb.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Use color').click();await waitFor(()=>!rgb.modalEl.isConnected);[...imported.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Save').click();await waitFor(()=>writes===2);
  if(sourceModules.parseLiteralColor(settings.noteTypeStyles.Alpha.textColor).alpha!==102/255||!settings.noteTypeStyles.Alpha.textColor.startsWith('#010203'))throw Error('Imported RGB edit lost alpha');tab.disposeActionSettings();return true;
 })()`),true);
});


test("actual lens editor retains its opening color baseline, excludes pending dismissal and keeps drafts after storage failure",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en'),R=sourceModules.React,{flushSync}=sourceModules;let calls=0,reject,resolve,child,retired=0,captured;
  let lenses=[{id:'lens',name:'Opening',enabled:true,scope:'node',mode:'style',expression:'node.kind == "note"',style:{node:{textColor:{kind:'palette',id:'a'}}}}];
  const index={suggestionCatalog:()=>({tags:[],noteTypes:[],folders:[],properties:[],paths:[]})};
  const onLensesChange=(next,baseline)=>{calls++;captured={next,baseline};return new Promise((yes,no)=>{resolve=yes;reject=no})};
  const onEditColor=request=>{child=request;const element=createDiv();document.body.append(element);return{element,retire:()=>{retired++;element.remove()}}};
  const props={index,revision:0,value:sourceModules.EMPTY_PLEX_FILTER,onChange:()=>{},onLensesChange,onEditColor,layoutMode:'keep',onLayoutModeChange:()=>{},showSiblings:false,onShowSiblingsChange:()=>{},visibility:{},onVisibilityChange:()=>{},sortOrder:'name',onSortOrderChange:()=>{},translate:t};
  const container=createDiv();document.body.append(container);const root=sourceModules.createRoot(container);const render=()=>flushSync(()=>root.render(R.createElement(sourceModules.PlexFilter,{...props,lenses})));render();
  flushSync(()=>container.querySelector('button').click());await waitFor(()=>document.querySelector('.kplex-lens-main'));
  flushSync(()=>document.querySelector('.kplex-lens-main').click());const name=document.querySelector('.kplex-lens-editor input');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(name,'Renamed');name.dispatchEvent(new Event('input',{bubbles:true}));await new Promise(r=>setTimeout(r,0));
  const sourceButtons=[...document.querySelectorAll('.kplex-lens-style-grid button')];flushSync(()=>sourceButtons.at(-1).click());if(!child||child.initial.id!=='a')throw Error('Lens did not use shared source port');
  lenses=structuredClone(lenses);lenses[0].style.node.textColor={kind:'palette',id:'b'};render();
  const save=[...document.querySelectorAll('.kplex-lens-editor-actions button')].find(b=>b.textContent==='Save lens');flushSync(()=>save.click());flushSync(()=>save.click());
  document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));document.querySelector('.kplex-lens-editor-actions button').click();
  if(calls!==1||!document.querySelector('.kplex-lens-editor')||!document.querySelector('.kplex-filter-panel')||!document.querySelector('.kplex-lens-fields').disabled)throw Error('Pending duplicate or dismissal');
  if(captured.baseline[0].style.node.textColor.id!=='a'||captured.next[0].name!=='Renamed'||child.apply('#ffffff'))throw Error('Opening baseline/pending draft fence lost');
  reject(Error('disk rejected'));await waitFor(()=>!document.querySelector('.kplex-lens-fields').disabled);if(!document.querySelector('.kplex-lens-editor')||name.value!=='Renamed')throw Error('Failed save lost draft');
  flushSync(()=>save.click());resolve({refreshPending:true});await waitFor(()=>!document.querySelector('.kplex-lens-editor'));
  if(calls!==2||!document.querySelector('.kplex-lens-section').textContent.includes('saved')||child.apply('#ffffff'))throw Error('Durable result/retired child fence lost');
  flushSync(()=>root.unmount());if(!retired||document.querySelector('.kplex-filter-panel'))throw Error('Lens lifetime leaked');return true;
 })()`),true);
});


test("semantic Default previews public inheritance safely and standard role previews use production fallbacks",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en'),settings=structuredClone(sourceModules.DEFAULT_SETTINGS);settings.colorPreferences.semantic.origin='#123456';
  const app={workspace:{on:()=>({}),offref:()=>{}}},plugin={settings,translator:t,index:{subscribePresentation:()=>()=>{},allPages:()=>[],unassignedOntologyFields:()=>[]}};
  const tab=new sourceModules.KplexSettingTab(app,plugin);tab.containerEl.style.setProperty('--kplex-semantic-origin','12px');tab.containerEl.style.setProperty('--kplex-tag-text','#56789a');
  tab.openSemanticColor('origin');const semantic=sourceModules.TestModal.instances.at(-1);input(semantic.contentEl.querySelector('.kplex-color-source-editor select'),'inherit','change');
  await waitFor(()=>semantic.contentEl.querySelector('.kplex-color-preview-canvas')?.style.getPropertyValue('--_kplex-preview-node-border'));
  const previewSeed=sourceModules.parseLiteralColor(semantic.contentEl.querySelector('.kplex-color-preview-canvas').style.getPropertyValue('--_kplex-preview-node-border'));
  if(!previewSeed||Math.round(previewSeed.red)!==170||Math.round(previewSeed.green)!==85||Math.round(previewSeed.blue)!==238)throw Error('Semantic Default preview used old choice or poisoned public token');semantic.retire();
  delete settings.colorPreferences.semantic.origin;tab.openSemanticColor('origin');const inherited=sourceModules.TestModal.instances.at(-1);input(inherited.contentEl.querySelector('.kplex-color-source-editor select'),'fixed','change');const seed=sourceModules.parseLiteralColor(inherited.contentEl.querySelector('fieldset input[type=text]').value);
  if(!seed||Math.round(seed.red)!==170||Math.round(seed.green)!==85||Math.round(seed.blue)!==238)throw Error('Initial Default conversion used a poisoned public token');inherited.retire();
  tab.openStandardColor('tagNodeStyle','textColor');const tag=sourceModules.TestModal.instances.at(-1);input(tag.contentEl.querySelector('.kplex-color-source-editor select'),'fixed','change');
  const tagSeed=sourceModules.parseLiteralColor(tag.contentEl.querySelector('fieldset input[type=text]').value);if(Math.round(tagSeed.red)!==86||Math.round(tagSeed.green)!==120||Math.round(tagSeed.blue)!==154)throw Error('Tag Default ignored native production fallback');tag.retire();tab.disposeActionSettings();return true;
 })()`),true);
});

test("palette duplicate preserves literal variants under an independent identity and unchanged pair Save writes nothing",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en');preferences.palette.push({id:'original',name:'Original',light:'rgba(12,34,56,.123456789)',dark:'#abcdef00'});let settings={colorPreferences:preferences},writes=0;
  const manager=new sourceModules.ColorPaletteModal({}, {sourceScope:scope,translate:t,preferences:()=>settings.colorPreferences,nodeStyle:()=>({}),linkStyle:()=>({}),background:()=>undefined,read:()=>settings,readOnly:()=>false,canDelete:()=>true,subscribe:()=>()=>{},write:async edit=>{const next=structuredClone(settings);edit(next);settings=next;writes++;return{refreshPending:false}}});manager.open();
  manager.contentEl.querySelector('.kplex-palette-row').querySelectorAll('button')[1].click();const duplicate=sourceModules.TestModal.instances.at(-1);[...duplicate.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Save').click();await waitFor(()=>writes===1&&!duplicate.modalEl.isConnected);
  const added=settings.colorPreferences.palette[1];if(!added||added.id==='original'||added.light!==preferences.palette[0].light||added.dark!==preferences.palette[0].dark)throw Error('Duplicate lost independent exact pair');
  manager.contentEl.querySelector('.kplex-palette-name').click();const unchanged=sourceModules.TestModal.instances.at(-1);[...unchanged.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Save').click();await waitFor(()=>!unchanged.modalEl.isConnected);if(writes!==1)throw Error('Unchanged pair wrote');manager.retire();return true;
 })()`),true);
});


test("appearance subscriptions ignore ordinary source events, recognize legacy in-place signals and retire callbacks",async()=>{
 assert.equal(await scenario(`(()=>{
  const settings={colorPreferences:preferences,baseNodeStyle:{}},listeners=new Set();let changes=0,releases=0;
  const stop=sourceModules.subscribeAppearanceSources(callback=>{listeners.add(callback);return()=>{listeners.delete(callback);releases++}},()=>settings,()=>changes++);
  const callback=[...listeners][0];for(let i=0;i<100;i++)callback({kind:'presentation'});if(changes)throw Error('Source events rescanned appearance');
  settings.colorPreferences={...preferences,palette:[]};callback({kind:'paint',changedKeys:['colorPreferences']});if(changes!==1)throw Error('Published owner not observed');
  settings.baseNodeStyle.textColor='#123456';callback({kind:'paint',changedKeys:['baseNodeStyle']});if(changes!==2)throw Error('Legacy in-place signal lost');
  stop();stop();callback({changedKeys:['colorPreferences']});if(changes!==2||releases!==1||listeners.size)throw Error('Subscription leaked');return true;
 })()`),true);
});

test("nested native source editors retain origin-only CSS and live palette previews refresh without writes or repeated sampling",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en'),settings=structuredClone(sourceModules.DEFAULT_SETTINGS),listeners=new Set();let writes=0,samples=0;
  settings.colorPreferences.palette=[{id:'pair',name:'Opening name',light:'#123456',dark:'#334455'}];settings.noteTypeStyles.Type={backgroundColor:{kind:'palette',id:'pair'}};
  const app={workspace:{on:()=>({}),offref:()=>{}}},plugin={settings,translator:t,index:{subscribePresentation:callback=>{listeners.add(callback);return()=>listeners.delete(callback)},allPages:()=>[],unassignedOntologyFields:()=>[]},updateStyleSettings:async()=>{writes++;throw Error('Unexpected write')}};
  const tab=new sourceModules.KplexSettingTab(app,plugin);tab.containerEl.style.setProperty('--Local-only','#789abc');tab.openNodeStyleEditor('property','Type');const parent=sourceModules.TestModal.instances.at(-1);
  parent.contentEl.querySelector('button[aria-label="Background"]').click();let child=sourceModules.TestModal.instances.at(-1);
  input(child.contentEl.querySelector('.kplex-color-source-editor select'),'theme','change');input(child.contentEl.querySelectorAll('select')[1],'custom','change');const variable=[...child.contentEl.querySelectorAll('label')].find(label=>label.textContent.includes('CSS variable name')).querySelector('input');input(variable,'--Local-only');variable.dispatchEvent(new Event('blur'));
  if([...child.contentEl.querySelectorAll('button')].find(b=>b.textContent==='Use color').disabled)throw Error('Origin-only CSS lost through native modal');child.retire();
  const original=sourceModules.ThemePreviewSampler.prototype.sample;sourceModules.ThemePreviewSampler.prototype.sample=function(...args){samples++;return original.apply(this,args)};
  parent.contentEl.querySelector('button[aria-label="Background"]').click();child=sourceModules.TestModal.instances.at(-1);await waitFor(()=>child.contentEl.querySelector('.kplex-color-preview-canvas')?.style.getPropertyValue('--_kplex-preview-node-fill'));const before=samples;
  settings.colorPreferences={...settings.colorPreferences,palette:[{...settings.colorPreferences.palette[0],name:'Renamed color',dark:'#556677'}]};for(const callback of [...listeners])callback({kind:'paint',changedKeys:['colorPreferences']});
  await waitFor(()=>sourceModules.parseLiteralColor(child.contentEl.querySelectorAll('.kplex-color-preview-canvas')[1].style.getPropertyValue('--_kplex-preview-node-fill'))?.red===85);
  if(!child.contentEl.textContent.includes('Renamed color')||parent.contentEl.querySelector('button[aria-label="Background"]').textContent!=='Renamed color'||samples!==before||writes)throw Error('Live metadata refresh wrote or resampled unchanged CSS');
  for(let i=0;i<50;i++)for(const callback of [...listeners])callback({kind:'presentation'});if(samples!==before)throw Error('Source events sampled CSS');
  child.retire();parent.retire();tab.disposeActionSettings();if(listeners.size)throw Error('Editor metadata subscription leaked');return true;
 })()`),true);
});

test("actual style-manager swatches preserve alpha and named/theme identity in their native document",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en'),settings=structuredClone(sourceModules.DEFAULT_SETTINGS),listeners=new Set();
  settings.colorPreferences.palette=[{id:'pair',name:'Visible name',light:'#12345600',dark:'#44556680'}];settings.noteTypeStyles.Type={backgroundColor:{kind:'palette',id:'pair'},borderColor:{kind:'theme',variable:'--text-normal'}};
  const app={workspace:{on:()=>({}),offref:()=>{}}},plugin={settings,translator:t,index:{subscribePresentation:callback=>{listeners.add(callback);return()=>listeners.delete(callback)},allPages:()=>[],unassignedOntologyFields:()=>[]}};
  const tab=new sourceModules.KplexSettingTab(app,plugin);tab.openNoteTypeStylesManager();const manager=sourceModules.TestModal.instances.at(-1),reader=new sourceModules.ColorSampleReader(document);
  const read=()=>{const swatch=manager.contentEl.querySelector('.kplex-style-manager-node-swatch');return reader.read(swatch,getComputedStyle(swatch).getPropertyValue('--kplex-style-node-bg'))};
  if(!manager.contentEl.textContent.includes('Visible name')||Math.abs(read().alpha-.5)>.003)throw Error('Named swatch became opaque fallback');
  document.body.className='theme-light';await waitFor(()=>read()?.alpha===0);if(settings.noteTypeStyles.Type.backgroundColor.id!=='pair')throw Error('Mode flattened saved reference');
  const search=manager.contentEl.querySelector('input[type=search]');input(search,'No match');if(manager.contentEl.querySelector('.kplex-style-manager-node-swatch')||manager.contentEl.style.getPropertyValue(sourceModules.paletteColorProperty('pair')))throw Error('Empty list retained binding');
  input(search,'');const action=manager.contentEl.querySelector('.kplex-style-manager-row');manager.retire();const count=sourceModules.TestModal.instances.length;action.click();if(sourceModules.TestModal.instances.length!==count)throw Error('Retired row opened an editor');tab.disposeActionSettings();reader.dispose();if(listeners.size||window.migrationListeners)throw Error('Manager lifetime leaked');return true;
 })()`),true);
});

test("nested native color modal keeps pointer and Escape ownership above the actual lens panel",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en'),R=sourceModules.React,{flushSync}=sourceModules;let dialog=null,changed=0;
  const lenses=[{id:'nested',name:'Nested',enabled:false,scope:'node',mode:'style',expression:'node.kind == "note"',style:{node:{textColor:'#11223380'}}}];
  const index={suggestionCatalog:()=>({tags:[],noteTypes:[],folders:[],properties:[],paths:[]})};
  const onEditColor=request=>{
    const doc=request.sourceScope.ownerDocument;
    const nativeEscape=event=>{if(event.key==='Escape'&&dialog?.modalEl.isConnected){event.stopPropagation();dialog.close()}};
    dialog=new sourceModules.ColorSourceModal({}, {title:request.title,initial:request.initial,target:request.target,sourceScope:scope,translate:t,preferences:()=>preferences,nodeStyle:()=>({}),linkStyle:()=>({}),background:()=>undefined,
      onSave:async value=>{if(!request.apply(value))throw Error('Parent retired');return{refreshPending:false}},onClosed:()=>doc.removeEventListener('keydown',nativeEscape)});
    dialog.open();doc.addEventListener('keydown',nativeEscape);
    return{element:dialog.modalEl,retire:()=>{doc.removeEventListener('keydown',nativeEscape);dialog.retire()}};
  };
  const props={index,revision:0,value:sourceModules.EMPTY_PLEX_FILTER,onChange:()=>{},lenses,onLensesChange:()=>{changed++;return Promise.resolve({refreshPending:false})},onEditColor,layoutMode:'keep',onLayoutModeChange:()=>{},showSiblings:false,onShowSiblingsChange:()=>{},visibility:{},onVisibilityChange:()=>{},sortOrder:'name',onSortOrderChange:()=>{},translate:t};
  const container=createDiv();document.body.append(container);const root=sourceModules.createRoot(container);flushSync(()=>root.render(R.createElement(sourceModules.PlexFilter,props)));
  flushSync(()=>container.querySelector('button').click());await waitFor(()=>document.querySelector('.kplex-lens-main'));flushSync(()=>document.querySelector('.kplex-lens-main').click());
  const buttons=[...document.querySelectorAll('.kplex-lens-style-grid button')];flushSync(()=>buttons.at(-1).click());await waitFor(()=>dialog?.modalEl.isConnected);
  const text=dialog.contentEl.querySelector('input[type=text]');flushSync(()=>text.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,composed:true,pointerId:1,pointerType:'mouse',button:0})));
  if(!dialog.modalEl.isConnected||!document.querySelector('.kplex-filter-panel'))throw Error('Nested source pointer dismissed the parent');
  text.focus();flushSync(()=>text.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true})));
  if(dialog.modalEl.isConnected||!document.querySelector('.kplex-lens-editor'))throw Error('Escape did not belong to native child');
  flushSync(()=>document.querySelectorAll('.kplex-lens-style-grid button')[2].click());const early=dialog,text2=early.contentEl.querySelector('input[type=text]');
  const nativeCapture=()=>early.close();window.addEventListener('keydown',nativeCapture,{capture:true,once:true});
  flushSync(()=>text2.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true})));
  if(early.modalEl.isConnected||!document.querySelector('.kplex-lens-editor'))throw Error('Earlier native capture made parent consume the same Escape');
  flushSync(()=>document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true})));if(document.querySelector('.kplex-filter-panel')||changed)throw Error('Parent Escape or zero-write cancellation failed');
  flushSync(()=>root.unmount());return true;
 })()`),true);
});

/** Native modal content reuses the real React rail/source shell with a detached explicit-save draft. */
test("Compass editor preserves inherited and zero intensity, child drafts, failure and native lifetime",async()=>{
 const result=await scenario(`(async()=>{
  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms)),button=(root,text)=>[...root.querySelectorAll('button')].find(el=>el.textContent===text);
  const {CompassSettingsModal,TestModal,defaultColorPreferences,createTranslator}=sourceModules,t=createTranslator('en');let writes=0,saved=null,reject=false;
  const preferences=defaultColorPreferences();preferences.palette=[{id:'tint',name:'Tint',light:'#ff000080',dark:'#00ff0040'}];
  const context={sourceScope:scope,translate:t,preferences:()=>preferences,nodeStyle:()=>({}),linkStyle:()=>({}),background:()=>undefined};
  const save=async(initial,edited)=>{writes++;if(reject)throw Error('Expected Compass write fault');saved=structuredClone(edited);return{refreshPending:false}};
  const open=()=>{const modal=new CompassSettingsModal({},context,save,()=>{});modal.open();return modal};
  let modal=open();button(modal.contentEl,t('common.save')).click();await wait(20);if(writes||modal.modalEl.isConnected)throw Error('Unchanged Compass Save wrote');
  modal=open();await wait(40);const toggle=modal.contentEl.querySelector('input[type=checkbox]');toggle.checked=true;toggle.dispatchEvent(new Event('change',{bubbles:true}));
  const range=modal.contentEl.querySelector('input[type=range]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(range,'0');range.dispatchEvent(new Event('input',{bubbles:true}));await wait(30);
  if(modal.draft.intensity!==0||!modal.draft.enabled)throw Error('Explicit zero/toggle not retained');
  const north=modal.contentEl.querySelector('.kplex-style-row button');north.click();const child=TestModal.instances.at(-1);
  const select=child.contentEl.querySelector('.kplex-color-source-editor select');input(select,'named','change');child.contentEl.querySelector('.kplex-color-source-editor button').click();const chooser=TestModal.instances.at(-1);chooser.onChooseSuggestion(preferences.palette[0]);chooser.close();button(child.contentEl,t('colors.useColor')).click();await wait(20);
  if(writes||modal.draft.fills.north?.id!=='tint')throw Error('Child draft reached storage or lost identity');
  button(modal.contentEl,t('common.cancel')).click();if(writes||preferences.compass.enabled||preferences.compass.intensity!==undefined)throw Error('Cancel changed preferences');
  modal=open();await wait(40);modal.draft.enabled=true;modal.draft.intensity=0;reject=true;button(modal.contentEl,t('common.save')).click();await wait(30);if(!modal.modalEl.isConnected||modal.modalEl.getAttribute('aria-busy')!=='false'||modal.draft.intensity!==0)throw Error('Rejected draft lost');
  reject=false;button(modal.contentEl,t('common.save')).click();await wait(30);if(modal.modalEl.isConnected||saved.intensity!==0||!saved.enabled||writes!==2)throw Error('Explicit Save failed');
  modal=open();await wait(40);const destination=document.createElement('iframe');document.body.append(destination);destination.contentDocument.body.append(scope);emitMigration(scope);await wait(20);if(modal.modalEl.isConnected||document.querySelector('iframe[sandbox]'))throw Error('Compass migration leaked');
  destination.remove();return{writes,saved,original:preferences.compass};
 })()`);
 assert.equal(result.writes,2);assert.equal(result.saved.intensity,0);assert.equal(result.original.enabled,false);assert.equal(result.original.intensity,undefined);
});

/** Four actual preview polygons use the same finite mode/alpha policy and preserve source precedence. */
test("Compass paired preview resolves theme and named fills with inherited, invalid and explicit zero intensity",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en'),prefs=sourceModules.defaultColorPreferences();prefs.compass.enabled=true;
  prefs.palette=[{id:'sectors',name:'Sectors',light:'#ff000080',dark:'#00ff0040'}];let changed;
  scope.style.setProperty('--kplex-compass-parent-color','#11223380');scope.style.setProperty('--kplex-compass-opacity','10%');
  const options={title:'Compass',sourceScope:scope,translate:t,target:{kind:'compass',direction:'north'},initial:undefined,preferences:()=>prefs,nodeStyle:()=>({}),linkStyle:()=>({}),background:()=>undefined,
   subscribeColors:callback=>{changed=callback;return()=>changed=null},onSave:async()=>{throw Error('Unexpected write')}};
  let modal=new sourceModules.ColorSourceModal({},options);modal.open();
  await waitFor(()=>modal.contentEl.querySelectorAll('.kplex-color-preview-compass').length===2&&[...modal.contentEl.querySelectorAll('.kplex-color-preview-compass')].every(g=>g.children[0].getAttribute('fill-opacity')==='.1'||g.children[0].getAttribute('fill-opacity')==='0.1'));
  for(const g of modal.contentEl.querySelectorAll('.kplex-color-preview-compass')){if(g.children.length!==4||sourceModules.parseLiteralColor(g.children[0].getAttribute('fill')).red!==17)throw Error('Inherited direction token lost')}
  modal.close();modal=new sourceModules.ColorSourceModal({}, {...options,initial:{kind:'palette',id:'sectors'}});modal.open();
  await waitFor(()=>modal.contentEl.querySelector('.kplex-color-preview-compass polygon')?.getAttribute('fill'));
  const groups=[...modal.contentEl.querySelectorAll('.kplex-color-preview-compass')];
  if(sourceModules.parseLiteralColor(groups[0].children[0].getAttribute('fill')).red!==255||sourceModules.parseLiteralColor(groups[1].children[0].getAttribute('fill')).green!==255)throw Error('Named variants lost');
  if(Math.abs(sourceModules.parseLiteralColor(groups[0].children[0].getAttribute('fill')).alpha-128/255)>1e-6)throw Error('Source alpha flattened');
  scope.style.setProperty('--kplex-compass-opacity','12px');
  await waitFor(()=>groups[0].children[0].getAttribute('fill-opacity')==='0.05'&&groups[1].children[0].getAttribute('fill-opacity')==='0.07');
  prefs.compass.intensity=0;changed();await waitFor(()=>groups.every(g=>g.children[0].getAttribute('fill-opacity')==='0'));
  modal.retire();if(changed||document.querySelector('iframe[sandbox]'))throw Error('Compass preview leaked');return true;
 })()`),true);
});

/** Exercise the native Settings action's actual queue callback against changed current preferences. */
test("Compass Settings merges only edited fields and rejects deleted named sources without restoring old palette data",async()=>{
 assert.equal(await scenario(`(async()=>{
  const t=sourceModules.createTranslator('en'),prefs=sourceModules.defaultColorPreferences(),app={workspace:{on:()=>({}),offref:()=>{}}};
  prefs.palette=[{id:'a',name:'Old',light:'#123456',dark:'#abcdef'},{id:'b',name:'Latest',light:'#223344',dark:'#aabbcc'}];prefs.compass.fills.north={kind:'palette',id:'a'};
  const p={settings:{colorPreferences:prefs,baseNodeStyle:{},baseLinkStyle:{}},translator:t,index:{subscribePresentation:()=>()=>{}}};let writes=0;
  p.updateStyleSettings=async edit=>{const draft=structuredClone(p.settings);edit(draft);p.settings=draft;writes++;return{refreshPending:false}};
  const tab=new sourceModules.KplexSettingTab(app,p);await tab.openCompassSettings();let modal=sourceModules.TestModal.instances.at(-1);modal.draft.intensity=8;
  p.settings.colorPreferences.compass.fills.north={kind:'palette',id:'b'};p.settings.colorPreferences.compass.extension='latest';p.settings.colorPreferences.palette=prefs.palette.filter(pair=>pair.id!=='a');p.settings.colorPreferences.semantic.support='#44556680';
  [...modal.contentEl.querySelectorAll('button')].find(button=>button.textContent===t('common.save')).click();await waitFor(()=>!modal.modalEl.isConnected);
  if(writes!==1||p.settings.colorPreferences.compass.intensity!==8||p.settings.colorPreferences.compass.fills.north.id!=='b'||p.settings.colorPreferences.compass.extension!=='latest'||p.settings.colorPreferences.palette.length!==1||p.settings.colorPreferences.semantic.support!=='#44556680')throw Error('Compass save restored unedited stale fields');
  await tab.openCompassSettings();modal=sourceModules.TestModal.instances.at(-1);modal.draft.fills.east={kind:'palette',id:'deleted'};
  [...modal.contentEl.querySelectorAll('button')].find(button=>button.textContent===t('common.save')).click();await waitFor(()=>modal.modalEl.getAttribute('aria-busy')==='false');
  if(!modal.modalEl.isConnected||writes!==1||p.settings.colorPreferences.compass.fills.east)throw Error('Missing named reference persisted');modal.retire();
  const before=sourceModules.TestModal.instances.length;p.settings.colorPreferencesFuture={version:99};await tab.openCompassSettings();if(sourceModules.TestModal.instances.length!==before)throw Error('Future preferences editable');tab.disposeActionSettings();return true;
 })()`),true);
});
