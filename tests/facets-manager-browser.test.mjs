/** Real registered native manager and original plugin queue/reconciliation prototypes.
 * Finite Obsidian controls surround actual preset/color/settings behavior. No alternate writer. */
import assert from 'node:assert/strict';
import test from 'node:test';
import {colorEditorScenario} from './support/colorEditorBrowser.mjs';

const initialize=`
 const M=sourceModules,check=(value,message)=>{if(!value)throw Error(message)},copy=value=>structuredClone(value);
 const equal=(a,b,message)=>check(JSON.stringify(a)===JSON.stringify(b),message+' '+JSON.stringify([a,b]));
 const p=await createAppearanceHost({});p.viewSettingsRegistry=M.builtInCanvasViewSettings;p.manifest={id:'k-plex'};
 let disk=copy(p.writes.at(-1));p.writes=[];p.loadData=async()=>copy(disk);p.saveData=async value=>{disk=copy(value);p.writes.push(copy(value))};
 p.initializeSettingsReconciliation(copy(disk));
 const app={workspace:{on:()=>({}),offref:()=>{}}},tab=new M.KplexSettingTab(app,p),t=M.createTranslator('en');
 const last=()=>M.TestModal.instances.at(-1),button=(modal,label)=>[...modal.contentEl.querySelectorAll('button')].filter(row=>row.textContent===label).at(-1);
 const fields=(modal,name)=>[...modal.contentEl.querySelectorAll('input,textarea,select')].filter(input=>input.parentElement.parentElement.firstElementChild.textContent===name);
 const manager=()=>{tab.openCanvasViewManager('wuxing');return last()};
 const edit=(manager,name)=>{[...manager.contentEl.querySelectorAll('.kplex-style-manager-row')].find(row=>row.textContent.startsWith(name)).click();return last()};
 const save=async modal=>{button(modal,t('common.save')).click();await waitFor(()=>!modal.modalEl.isConnected)};
 const close=modal=>modal.close();
 const drain=async()=>{await p.settingsWriteQueue;await Promise.resolve();await new Promise(resolve=>setTimeout(resolve,20))};
`;
const scenario=body=>colorEditorScenario(`(async()=>{${initialize}\n${body}\ntab.hide();return true})()`);

test('native workflow defaults and stable pair overrides compose without editing relationship data',async()=>{
 assert.equal(await scenario(`
 const m=manager(),editor=edit(m,'ACE'),select=(key,value,index=0)=>{const node=fields(editor,t(key))[index];node.value=value;node.dispatchEvent(new Event('change',{bubbles:true}))};
 select('facets.layout','horizontal');editor.contentEl.querySelector('.kplex-facet-flow-settings').open=true;
 select('facets.flowDirection','both');select('facets.flowStyle','line');input(fields(editor,t('facets.flowCaption'))[0],'Default workflow');
 const pair=fields(editor,t('facets.flowPair',{source:'Add',target:'Connect'}))[0];pair.checked=true;pair.dispatchEvent(new Event('change',{bubbles:true}));
 check(editor.contentEl.querySelector('.kplex-facet-flow-settings').open,'Pair edits preserve the open native disclosure');
 input(fields(editor,t('facets.flowCaption'))[1],'');select('facets.flowDirection','backward',1);
 equal(p.writes,[],'Workflow remains inert detached configuration');await save(editor);await drain();
 const preset=disk.canvasViewSettings.wuxing.values.presets.ace;equal(preset.flow,{direction:'both',style:'line',caption:'Default workflow'},'Sequential default fields compose');equal(preset.flowOverrides,[{source:'add',target:'connect',caption:'',direction:'backward'}],'Pair stores explicit fields only, including an intentional blank caption');
 equal(preset.categories,M.FACET_TEMPLATES.ace.categories,'Guide editing never changes recognizers or assignment values');close(m);
 `),true);
});

test('native layout defaults preview anchors and preserve exact independent area defaults through one save',async()=>{
 assert.equal(await scenario(`
 const m=manager(),editor=edit(m,'PARA'),select=(key,value)=>{const node=fields(editor,t(key))[0];node.value=value;node.dispatchEvent(new Event('change',{bubbles:true}))};
 select('facets.layout','horizontal');check(editor.contentEl.querySelector('.kplex-facet-anchor-preview.is-horizontal.is-anchor-top'),'Native anchor preview matches the horizontal default');
 select('facets.focusAnchor','right');check(editor.contentEl.querySelector('.kplex-facet-anchor-preview.is-anchor-right'),'Explicit cardinal anchor is previewed');
 const first=editor.contentEl.querySelector('h3').parentElement,width=[...first.querySelectorAll('input')].find(node=>node.parentElement.parentElement.firstElementChild.textContent===t('wuxing.width'));
 input(width,920);const height=[...first.querySelectorAll('input')].find(node=>node.parentElement.parentElement.firstElementChild.textContent===t('wuxing.height'));input(height,460);
 equal(p.writes,[],'Layout and exact dimensions remain detached');await save(editor);await drain();
 const preset=disk.canvasViewSettings.wuxing.values.presets.para;equal([preset.layout,preset.focusAnchor],['horizontal','right'],'Layout and anchor use the existing preset writer');equal(preset.areaSizes.categories.projects,{width:920,height:460},'Exact area defaults compose without overwriting their other axis');close(m);
 `),true);
});

test('diagnostics dock edits compose in one detached native draft and save through the existing queue',async()=>{
 assert.equal(await scenario(`
 const m=manager(),editor=edit(m,'Wu Xing');
 check(!fields(editor,t('facets.diagnosticsArrangement')).length,'Combined mode hides the irrelevant inter-area arrangement');
 const combine=fields(editor,t('facets.combineDiagnostics'))[0];combine.checked=false;combine.dispatchEvent(new Event('change',{bubbles:true}));
 for(const [label,value]of [['facets.diagnosticsSide','left'],['facets.diagnosticsArrangement','horizontal']]){const select=fields(editor,t(label))[0];select.value=value;select.dispatchEvent(new Event('change',{bubbles:true}))}
 const empty=fields(editor,t('facets.diagnosticsShowEmpty'))[0];empty.checked=false;empty.dispatchEvent(new Event('change',{bubbles:true}));
 equal(p.writes,[],'Dock remains a detached draft until Save');await save(editor);await drain();
 equal(disk.canvasViewSettings.wuxing.values.presets.wuxing.diagnostics,{combined:false,side:'left',orientation:'horizontal',showEmpty:false},'Sequential controls retain sibling draft changes in one queued save');
 check(p.writes.length===1,'One durable preset update');close(m);
 `),true);
});

test('selected preset deep link opens the existing editor without activating or saving a preset',async()=>{
 assert.equal(await scenario(`
 check(tab.openCanvasViewManager('wuxing','para'),'Registered target opens');
 const editor=last(),parent=M.TestModal.instances.at(-2);equal(fields(editor,t('facets.name'))[0].value,'PARA','Exact selected preset draft');
 check(fields(editor,t('wuxing.label')).length===4,'Existing four-category editor reused');equal(p.writes,[],'Opening does not save or activate');
 close(editor);close(parent);check(window.migrationListeners===0,'Deep-link child and manager retire original lifetimes');
 `),true);
});

test('Wu Xing model controls use the original preset draft and queued writer, with read-only explanatory help',async()=>{
 assert.equal(await scenario(`
 const m=manager(),editor=edit(m,'Wu Xing');
 const name=t('facets.relativeLabels'),control=fields(editor,name)[0];
 check(control&&editor.contentEl.textContent.includes(t('facets.wuxingHelp')),'Relative role help is reachable in the native preset editor');
 check(editor.contentEl.textContent.includes(t('facets.cyclesHelp')),'Both model cycles are explained');
 check(control.type==='checkbox','Original native toggle');control.checked=false;control.dispatchEvent(new Event('change',{bubbles:true}));
 equal(p.writes,[],'Model controls remain local until Save');await save(editor);await drain();
 const preset=M.facetLibrary(M.readViewConfiguration(M.builtInPlexViews.resolve('wuxing'),p.settings.canvasViewSettings)).presets.wuxing;
 check(preset.relativeLabels===false&&preset.interpretation==='wuxing','Same entry writer persists optional model presentation');
 check(preset.categories.wood.assignment==='wood','Model control does not change assignment values');close(m);
 `),true);
});

test('registered Settings opens searchable presets without saving defaults or choosing a canvas preset',async()=>{
 assert.equal(await scenario(`
 const a=new M.PlexViewSession(M.builtInPlexViews,()=>{}),b=new M.PlexViewSession(M.builtInPlexViews,()=>{});a.select('wuxing');b.select('wuxing');
 const before=[copy(a.getState()),copy(b.getState())],m=manager();
 check(m.contentEl.querySelectorAll('.kplex-style-manager-row').length===5,'Five bounded templates');
 input(m.contentEl.querySelector('input[type=search]'),'para');check(m.contentEl.querySelectorAll('.kplex-style-manager-row').length===1,'Shared searchable manager');
 equal(p.writes,[],'Opening/filtering never saves');equal([a.getState(),b.getState()],before,'Manager never chooses canvas state');
 const pages=M.builtInCanvasViewSettings.pages({translate:t,areaTint:()=>({name:'Tint'}),openManager:()=>{}});
 const page=pages.find(page=>page.name==='Facets');check(page.items.some(item=>item.name===t('facets.manage')&&typeof item.action==='function'),'Existing native page exposes registered manager action');
 close(m);a.dispose();b.dispose();check(window.migrationListeners===0,'Manager native lifecycle released');
 `),true);
});

test('preset editing saves one sparse stable entry with category labels, aliases, canonical assignment and order',async()=>{
 assert.equal(await scenario(`
 const m=manager(),e=edit(m,'ACE'),initial=copy(M.FACET_TEMPLATES.ace);
 input(fields(e,t('facets.name'))[0],'My ACE');input(fields(e,t('wuxing.label'))[0],'Ideas');
 input(fields(e,t('wuxing.spacing'))[0],88);input(fields(e,t('wuxing.width'))[0],440);
 input(fields(e,t('wuxing.values'))[0],['inbox','Idea','idea'].join(String.fromCharCode(10)));input(fields(e,t('facets.assignment'))[0],'inbox');
 const first=e.contentEl.querySelector('h3').parentElement;[...first.querySelectorAll('button')].find(row=>row.textContent===t('facets.moveDown')).click();
 await save(e);equal(Object.keys(disk.canvasViewSettings.wuxing.values.presets),['ace'],'Only addressed inherited entry materialized');
 const preset=disk.canvasViewSettings.wuxing.values.presets.ace;equal(preset.order,['connect','add','express'],'Category stable IDs reordered');
 equal(preset.categories.add.values,['inbox','Idea','idea'],'Exact aliases retain case');equal(preset.categories.add.assignment,'inbox','Explicit canonical value');
 equal(preset.categories.add.label,'Ideas','Rename does not change category ID');equal(preset.categories.connect,initial.categories.connect,'Other category unchanged');
 equal([preset.spacing,preset.regionWidth],[88,440],'Native preset layout defaults share the same saved fields as canvas rails');
 check(p.writes.length===1,'One durable entry operation');check(M.facetLibrary(p.readCanvasViewConfiguration('wuxing')).presets.para.nameKey==='facets.presetPara','Untouched templates still inherit');
 close(m);check(window.migrationListeners===0,'Nested native editors released');
 `),true);
});

test('manager preset reordering retains unknown order intent and persists through the existing queue',async()=>{
 assert.equal(await scenario(`
 await p.updateCanvasViewConfiguration('wuxing',{field:'presetOrder'},{kind:'set',value:['future-meta','ace','para','wuxing','gtd','eaccess']});p.writes=[];
 const m=manager(),row=[...m.contentEl.querySelectorAll('.kplex-style-manager-row')].find(row=>row.textContent.startsWith('ACE'));
 [...row.nextElementSibling.querySelectorAll('button')].find(button=>button.textContent===t('facets.moveDown')).click();await waitFor(()=>!m.modalEl.isConnected);
 equal(disk.canvasViewSettings.wuxing.values.presetOrder,['future-meta','para','ace','wuxing','gtd','eaccess'],'Unknown ordering ID retained while adjacent known presets move');
 check(!disk.canvasViewSettings.wuxing.values.presets,'Ordering does not materialize presets');check(p.writes.length===1,'One queued order write');
 `),true);
});

test('create and duplicate preserve stable originals, category count bounds and explicit cancellation',async()=>{
 assert.equal(await scenario(`
 const m=manager();button(m,t('facets.create')).click();let e=last();
 for(let i=0;i<4;i++)button(e,t('facets.addCategory')).click();check(e.contentEl.querySelectorAll('h3').length===7,'Seven categories admitted');
 check(button(e,t('facets.addCategory')).disabled,'Eighth category unavailable');close(e);equal(p.writes,[],'Cancel discards new identity and category draft');
 e=edit(m,'PARA');button(e,t('facets.duplicate')).click();const duplicate=last();input(fields(duplicate,t('facets.name'))[0],'Project state');await save(duplicate);
 const entries=disk.canvasViewSettings.wuxing.values.presets,ids=Object.keys(entries);check(ids.length===1&&ids[0].startsWith('preset-'),'Duplicate gets one independent stable ID');
 equal(entries[ids[0]].order,M.FACET_TEMPLATES.para.order,'Duplicate retains category IDs within independent preset');
 check(M.facetLibrary(p.readCanvasViewConfiguration('wuxing')).presets.para.nameKey==='facets.presetPara','Original template unmodified');
 close(e);close(m);check(window.migrationListeners===0,'Duplicate and original child lifetimes released');
 `),true);
});

test('deletion requires explicit replacement, Cancel retains the editor and restored sessions resolve the redirect',async()=>{
 assert.equal(await scenario(`
 const m=manager(),e=edit(m,'ACE');button(e,t('common.delete')).click();let confirmation=last();
 check(button(confirmation,t('common.delete')).disabled,'Deletion has no implicit replacement');close(confirmation);
 check(e.modalEl.isConnected&&p.writes.length===0,'Cancel retains parent draft and settings');
 button(e,t('common.delete')).click();confirmation=last();input(confirmation.contentEl.querySelector('select'),'para','change');
 button(confirmation,t('common.delete')).click();await waitFor(()=>!confirmation.modalEl.isConnected);await drain();
 equal(disk.canvasViewSettings.wuxing.values.presets.ace,{version:1,replacement:'para'},'One atomic explicit replacement');
 const resolution=M.resolveFacetPreset(M.facetLibrary(p.readCanvasViewConfiguration('wuxing')),'ace');check(resolution.id==='para'&&resolution.status==='replaced','Closed/restored ACE intent follows explicit redirect');
 close(m);check(window.migrationListeners===0,'Deletion lifetimes released');
 `),true);
});

test('same-entry changes retain the stale draft while sibling preset edits rebase safely',async()=>{
 assert.equal(await scenario(`
 const m=manager(),e=edit(m,'ACE');input(fields(e,t('facets.name'))[0],'Unsaved local');
 await p.updateCanvasViewConfiguration('wuxing',{field:'presets',path:['para','name']},{kind:'set',value:'Remote PARA'});
 await save(e);check(disk.canvasViewSettings.wuxing.values.presets.ace.name==='Unsaved local'&&disk.canvasViewSettings.wuxing.values.presets.para.name==='Remote PARA','Sibling saves both retained');
 const stale=edit(m,'Unsaved local');input(fields(stale,t('facets.name'))[0],'Keep my draft');
 await p.updateCanvasViewConfiguration('wuxing',{field:'presets',path:['ace','name']},{kind:'set',value:'New accepted ACE'});
 check(button(stale,t('common.save')).disabled,'Changed opening entry excludes Save');check(fields(stale,t('facets.name'))[0].value==='Keep my draft','Stale draft retained');
 check(stale.contentEl.textContent.includes(t('facets.staleDraft')),'Actionable stale ownership message');close(stale);close(m);
 `),true);
});

test('native retirement before queue acceptance cannot publish the captured preset draft',async()=>{
 assert.equal(await scenario(`
 const m=manager(),e=edit(m,'ACE');input(fields(e,t('facets.name'))[0],'Retired write');
 let release;p.settingsWriteQueue=new Promise(resolve=>release=resolve);button(e,t('common.save')).click();
 e.retire();release();await drain();equal(p.writes,[],'Retired queued operation never saves');check(!disk.canvasViewSettings.wuxing,'No namespace was created');close(m);
 `),true);
});

test('unchanged Save and canceled template restoration do not write, while explicit restore retains sibling presets',async()=>{
 assert.equal(await scenario(`
 const m=manager();await save(edit(m,'ACE'));equal(p.writes,[],'Unchanged Save has no settings or presentation work');
 await p.updateCanvasViewConfiguration('wuxing',{field:'presets',path:['ace','name']},{kind:'set',value:'Custom ACE'});
 await p.updateCanvasViewConfiguration('wuxing',{field:'presets',path:['para','name']},{kind:'set',value:'My PARA'});p.writes=[];
 let e=edit(m,'Custom ACE');button(e,t('facets.restore')).click();close(e);equal(p.writes,[],'Restore is a detached draft until explicit Save');
 e=edit(m,'Custom ACE');button(e,t('facets.restore')).click();await save(e);
 equal(disk.canvasViewSettings.wuxing.values.presets.ace,M.FACET_TEMPLATES.ace,'Explicit restore matches the ordinary template');
 check(disk.canvasViewSettings.wuxing.values.presets.para.name==='My PARA','Sibling preset retained');close(m);
 `),true);
});

test('real shared color-source child edits only the detached preset until parent Save',async()=>{
 assert.equal(await scenario(`
 const m=manager(),e=edit(m,'ACE'),row=e.contentEl.querySelector('.kplex-style-row');
 row.querySelector(':scope > button').click();const child=last();chooseThemeColor(child,'--color-green');button(child,t('colors.useColor')).click();await waitFor(()=>!child.modalEl.isConnected);
 equal(p.writes,[],'Choosing a source in the child does not persist the parent draft');await save(e);
 equal(disk.canvasViewSettings.wuxing.values.presets.ace.categories.add.color,{kind:'theme',variable:'--color-green'},'Parent Save retains the source identity');
 close(m);check(window.migrationListeners===0,'Shared color child resources retired');
 `),true);
});

test('failed durable save preserves the exact native draft and allows cancellation',async()=>{
 assert.equal(await scenario(`
 const m=manager(),e=edit(m,'ACE');input(fields(e,t('facets.name'))[0],'Keep this failed draft');let attempts=0;
 p.saveData=async()=>{attempts++;throw Error('Expected native disk failure')};button(e,t('common.save')).click();
 await waitFor(()=>attempts===1&&e.modalEl.getAttribute('aria-busy')==='false');
 check(e.modalEl.isConnected&&fields(e,t('facets.name'))[0].value==='Keep this failed draft','Exact rejected draft stays open');
 check(e.contentEl.textContent.includes(t('styles.operation.notSaved')),'Truthful actionable save failure');check(!disk.canvasViewSettings.wuxing,'Failed write publishes no namespace');
 close(e);close(m);check(window.migrationListeners===0,'Failed draft remains cleanly disposable');
 `),true);
});

test('registered preset palette uses are protected and new missing references reject inside the original writer',async()=>{
 assert.equal(await scenario(`
 const address={field:'presets',path:['ace','categories','add','color']};let failed=false;
 try{await p.updateCanvasViewConfiguration('wuxing',address,{kind:'set',value:{kind:'palette',id:'color-missing'}})}catch{failed=true}
 check(failed&&p.writes.length===0,'Missing new named reference cannot be saved');
 await p.updateStyleSettings(draft=>{draft.colorPreferences.palette.push({id:'color-preset',name:'Preset pair',light:'#eeee22',dark:'#222288'})});p.writes=[];
 await p.updateCanvasViewConfiguration('wuxing',address,{kind:'set',value:{kind:'palette',id:'color-preset'}});
 const uses=M.builtInCanvasViewSettings.paletteUsage(p.settings.canvasViewSettings);check(uses.available&&uses.uses.get('color-preset')===1,'Exact configured use counted once');
 tab.openColorPalette();const palette=last(),row=palette.contentEl.querySelector('[data-kplex-color-id="color-preset"]');
 check(button({contentEl:row},t('common.delete')).disabled&&row.textContent.includes(t('facets.paletteProtected')),'Existing palette manager protects the other settings owner');
 close(palette);check(!M.builtInCanvasViewSettings.paletteUsage({'future.view':{version:2,values:{}}}).available,'Unknown view metadata excludes unsafe deletion');
 `),true);
});
