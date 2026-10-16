/** Exact-build native color/Compass acceptance in the explicit disposable small vault; restores configuration, demands and two owned note fixtures. */
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync,existsSync,mkdirSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../../..',import.meta.url));
const {spawnNativeSync,obsidianCliExecutable}=await import(pathToFileURL(join(root,'scripts/testing/obsidian/processTools.mjs')));
const {validateTarget}=await import(pathToFileURL(join(root,'scripts/testing/obsidian/runner.mjs')));
const vaultName=process.env.KPLEX_TEST_VAULT_NAME;assert.equal(vaultName,'kplex-test-small');
const target=validateTarget({vaultName,vaultPath:process.env.KPLEX_TEST_VAULT_PATH,configDir:process.env.KPLEX_TEST_CONFIG_DIR});
const output=process.env.KPLEX_HOST_REPORT_DIR;assert(output&&(!existsSync(output)||readdirSync(output).length===0),'Use fresh explicit output');mkdirSync(output,{recursive:true});
/** Shell-free bounded selected-vault IPC, including the shared long-eval transport. */
function cli(command,...args){const r=spawnNativeSync(obsidianCliExecutable(),[`vault=${vaultName}`,command,...args],{encoding:'utf8',timeout:30000,killSignal:'SIGKILL',maxBuffer:4*1024*1024});if(r.error||r.status!==0||/^Error:/m.test(r.stdout))throw r.error??Error(r.stderr||r.stdout);return r.stdout.trim()}
/** Return finite JSON only; no live objects cross IPC or plugin lifetimes. */
function evaluate(code){return JSON.parse(cli('eval','code='+code).replace(/^=>\s*/,''))}
assert.equal(cli('vault','info=path'),target.vault);
const backups=['plugins/k-plex/data.json','community-plugins.json','workspace.json','appearance.json'].filter(name=>existsSync(join(target.config,name))).map(name=>({name,bytes:readFileSync(join(target.config,name))}));
const artifacts=Object.fromEntries(['main.js','styles.css','manifest.json'].map(name=>{const bytes=readFileSync(join(root,'dist',name));assert(bytes.equals(readFileSync(join(target.pluginDir,name))),'Stale installed '+name);return[name,createHash('sha256').update(bytes).digest('hex')]}));
/** Exercise actual native source controls and the production writer without changing any vault note. */
function start(){
 const p=app.plugins.plugins['k-plex'],tab=p.settingsTab,remote=require('@electron/remote'),native=remote.getCurrentWindow();
 if(window.__kplex158Colors||app.setting.isOpen)throw Error('Clean selected host required');
 const c=window.__kplex158Colors={settings:structuredClone(p.settings),policy:p.savedSettingsPolicy,layout:app.workspace.getLayout(),light:document.body.classList.contains('theme-light'),cases:[],restores:[],dialogs:[],done:false,counts:{writes:0,reads:0,parses:0,acquisitions:0,semantics:0,search:0,visuals:0,neighborhoods:0}};
 const wait=ms=>new Promise(resolve=>window.setTimeout(resolve,ms));
 const check=(condition,message)=>{if(!condition)throw Error(message)};
 const until=async(checker,message)=>{const end=performance.now()+10000;while(true){if(c.cancelled)throw Error('Native color trial cancelled');if(checker())return;if(performance.now()>end)throw Error(message);await wait(20)}};
 const docs=()=>[...new Set([document,tab.containerEl.ownerDocument])];
 const button=(root,key)=>[...root.querySelectorAll('button')].find(el=>el.textContent.trim()===p.translator(key));
 const input=(el,value,type='input')=>{el.value=value;el.dispatchEvent(new el.ownerDocument.defaultView.Event(type,{bubbles:true}))};
 const open=async()=>{tab.openCanvasColorEditor();await until(()=>docs().some(doc=>doc.querySelector('.kplex-color-modal')),'Native color editor missing');const dialog=[...tab.colorDialogs].at(-1);check(dialog,'Owned dialog missing');c.dialogs.push(dialog);return dialog};
 const observe=(owner,name,counter)=>{const previous=owner[name];owner[name]=function(...args){c.counts[counter]++;return previous.apply(this,args)};c.restores.push(()=>owner[name]=previous)};
 const passed=(name,details={})=>c.cases.push({name,...details});
 c.task=(async()=>{
  try{
   if(typeof remote.app.show==='function')remote.app.show();remote.app.focus({steal:true});native.restore();native.show();native.focus();native.webContents.focus();
   await until(()=>!document.hidden&&document.hasFocus(),'Selected host not foreground');
   await until(()=>p.getIndexStatus().upToDate,'Selected local index not ready');
   p.openSettings();await until(()=>tab.containerEl.isConnected,'Native Settings missing');
   observe(p,'saveData','writes');
   let dialog=await open(),root=dialog.contentEl;
   const initialWrites=c.counts.writes,initial=JSON.stringify(p.settings.backgroundColor);
   const text=root.querySelector('input[type=text]');input(text,'#12');text.dispatchEvent(new text.ownerDocument.defaultView.Event('blur'));
   check(button(root,'common.save').disabled,'Partial color admitted');check(c.counts.writes===initialWrites,'Opening or typing wrote');
   button(root,'common.cancel').click();await until(()=>!dialog.modalEl.isConnected,'Cancel did not close');check(JSON.stringify(p.settings.backgroundColor)===initial,'Cancel changed source');
   passed('open, partial text and Cancel make zero writes');
   dialog=await open();button(dialog.contentEl,'common.save').click();await until(()=>!dialog.modalEl.isConnected,'Unchanged Save did not close');check(c.counts.writes===initialWrites,'Unchanged Save wrote');passed('unchanged Save closes without a write');
   dialog=await open();root=dialog.contentEl;const number=root.querySelector('input[type=number]');input(number,'0');button(root,'common.save').click();await until(()=>!dialog.modalEl.isConnected,'Zero-alpha Save did not close');check(p.settings.backgroundColor.endsWith('00')||p.settings.backgroundColor==='transparent'||/[,/]\s*0\s*\)/.test(p.settings.backgroundColor),'Zero alpha lost');passed('native opacity zero commits explicitly');
   await p.updateStyleSettings(draft=>{draft.colorPreferences.palette.push({id:'checkpoint-pair',name:'Checkpoint pair',light:'#11223340',dark:'#aabbcc80'});draft.backgroundColor={kind:'palette',id:'checkpoint-pair'}});
   dialog=await open();root=dialog.contentEl;const selects=root.querySelectorAll('select');input(selects[0],'theme','change');input(selects[1],'--text-normal','change');check(!button(root,'common.save').disabled,'Valid native theme source rejected');
   await until(()=>root.querySelectorAll('.kplex-color-preview-canvas').length===2&&root.querySelector('.kplex-color-preview-canvas').style.getPropertyValue('--_kplex-preview-canvas'),'Paired native preview did not paint');
   check(c.counts.writes===initialWrites+2,'Preview wrote settings');button(root,'common.save').click();await until(()=>!dialog.modalEl.isConnected,'Theme Save did not close');check(p.settings.backgroundColor.kind==='theme'&&p.settings.backgroundColor.variable==='--text-normal','Reference flattened');passed('theme source previews and persists identity');
   app.setting.close();await wait(150);
   await p.updateStyleSettings(draft=>{draft.backgroundColor={kind:'palette',id:'checkpoint-pair'}});await wait(100);
   const graph=[...document.querySelectorAll('.kplex-plex')].find(el=>el.getBoundingClientRect().width>10);check(graph,'Visible Plex required');
   const center=graph.querySelector('.kplex-role-center'),camera=graph.querySelector('.kplex-camera'),transform=camera?.style.transform;check(center&&camera,'Rendered center/camera required');
   observe(app.vault,'read','reads');observe(app.vault,'cachedRead','reads');observe(p.index.sourceAcquisition,'parse','parses');observe(p.index.sourceAcquisition,'acquire','acquisitions');observe(p.index,'refreshSemanticSettings','semantics');observe(p.index,'prepareSearchIndex','search');observe(p.index,'invalidateNodeVisuals','visuals');observe(p.index,'getNeighborhood','neighborhoods');
   await p.updateStyleSettings(draft=>{const pair=draft.colorPreferences.palette.find(pair=>pair.id==='checkpoint-pair');pair.light='#22334440';pair.dark='#bbccdd80'});await wait(150);
   check(graph.querySelector('.kplex-role-center')===center&&graph.querySelector('.kplex-camera')===camera&&camera.style.transform===transform,'Paint replaced center/camera');
   const work=Object.fromEntries(Object.entries(c.counts).filter(([key])=>key!=='writes'));check(Object.values(work).every(value=>value===0),'Color save requested source/layout inputs '+JSON.stringify(work));passed('live named-color save preserves center/camera and requests zero graph work',{work});
   const paints=[];
   for(let n=0;n<2;n++){const light=document.body.classList.contains('theme-light');const computed=getComputedStyle(graph).backgroundColor;paints.push({mode:light?'light':'dark',color:computed});app.commands.executeCommandById('theme:toggle-light-dark');await until(()=>document.body.classList.contains('theme-light')!==light,'Native mode did not switch');await wait(150)}
   check(paints[0].color!==paints[1].color,'Named pair did not follow actual host mode');check(p.settings.backgroundColor.kind==='palette','Host mode flattened reference');passed('named pair follows actual host mode without source work',{paints});
   check(Object.entries(c.counts).filter(([key])=>key!=='writes').every(([,value])=>value===0),'Host mode requested graph work');
   p.openSettings();await until(()=>tab.containerEl.isConnected,'Native Settings did not reopen');
   tab.openColorPalette();await until(()=>[...tab.colorDialogs].some(d=>d.modalEl.classList.contains('kplex-palette-modal')),'Palette manager missing');
   const manager=[...tab.colorDialogs].find(d=>d.modalEl.classList.contains('kplex-palette-modal'));c.dialogs.push(manager);
   button(manager.contentEl,'colors.add').click();const pair=[...manager.children].at(-1);check(pair,'Native pair editor missing');c.dialogs.push(pair);
   input(pair.contentEl.querySelector('input[type=text]'),'Native acceptance pair');const variants=pair.contentEl.querySelectorAll('fieldset input[type=text]');
   input(variants[0],'rgba(12,34,56,.123456789)');input(variants[1],'#abcdef00');button(pair.contentEl,'common.save').click();await until(()=>!pair.modalEl.isConnected,'Pair Save did not close');
   const added=p.settings.colorPreferences.palette.find(item=>item.name==='Native acceptance pair');check(added&&added.light==='rgba(12,34,56,.123456789)'&&added.dark==='#abcdef00','Native pair changed variants or alpha');passed('native named-pair editor saves independent exact variants');
   const customKey='__kplex158_native_color';check(!p.settings.noteTypeStyles[customKey],'Synthetic style collision');
   await p.updateStyleSettings(draft=>{draft.baseNodeStyle.textColor={kind:'palette',id:added.id};draft.noteTypeStyles[customKey]={borderColor:{kind:'palette',id:added.id},fontSize:19}});await wait(150);
   input(manager.contentEl.querySelector('input[type=search]'),'Native acceptance pair');const row=manager.contentEl.querySelector('[data-kplex-color-id="'+added.id+'"]');check(row,'Native palette row missing');
   row.querySelectorAll('button')[2].click();const removal=[...manager.children].at(-1);c.dialogs.push(removal);check(button(removal.contentEl,'common.delete').disabled,'In-use native deletion admitted itself');
   const deleteBefore={...c.counts};input(removal.contentEl.querySelector('.kplex-color-source-editor select'),'inherit','change');button(removal.contentEl,'common.delete').click();await until(()=>!removal.modalEl.isConnected,'Replacement/delete did not close');await wait(150);
   check(!p.settings.colorPreferences.palette.some(item=>item.id===added.id)&&p.settings.baseNodeStyle.textColor===undefined&&p.settings.noteTypeStyles[customKey].borderColor===undefined,'Native deletion failed to replace all configured uses');
   check(p.settings.standardStyleDefaults==='native','Deleted standard reference would backfill on restart');
   const deleteWork=Object.fromEntries(Object.entries(c.counts).filter(([key])=>key!=='writes').map(([key,value])=>[key,value-deleteBefore[key]]));check(Object.values(deleteWork).every(value=>value===0),'Named replacement requested graph work '+JSON.stringify(deleteWork));passed('in-use native deletion atomically clears standard/custom references without source work',{work:deleteWork});manager.retire();
   const beforeSemantic=c.counts.writes;tab.openSemanticColor('origin');dialog=[...tab.colorDialogs].at(-1);c.dialogs.push(dialog);root=dialog.contentEl;
   input(root.querySelector('.kplex-color-source-editor select'),'theme','change');input(root.querySelectorAll('select')[1],'--kplex-semantic-origin','change');check(button(root,'common.save').disabled,'Native semantic self-cycle admitted');
   input(root.querySelectorAll('select')[1],'--text-normal','change');check(!button(root,'common.save').disabled,'Valid semantic source rejected');button(root,'common.cancel').click();check(c.counts.writes===beforeSemantic,'Semantic preview wrote settings');passed('native semantic editor rejects cycles and Cancel writes nothing');
   await p.updateStyleSettings(draft=>{draft.baseNodeStyle.textColor='#12345680'});const geometry={...p.settings.baseNodeStyle};delete geometry.textColor;
   tab.openStandardColor('baseNodeStyle','textColor');dialog=[...tab.colorDialogs].at(-1);c.dialogs.push(dialog);input(dialog.contentEl.querySelector('.kplex-color-source-editor select'),'inherit','change');button(dialog.contentEl,'common.save').click();await until(()=>!dialog.modalEl.isConnected,'Standard Default Save did not close');
   const durable=await p.loadData();check(durable.standardStyleDefaults==='native'&&!Object.hasOwn(durable.baseNodeStyle,'textColor')&&JSON.stringify(geometry)===JSON.stringify(p.settings.baseNodeStyle),'Standard Default lost persistence/geometry');passed('native standard Default persists its absence policy without changing other fields');
   const protectedFields=JSON.stringify([p.settings.noteTypeStyles,p.settings.tagNodeStyles,p.settings.hierarchyLinkStyles,p.settings.graphLenses,p.settings.colorPreferences]);const baseGeometry={...p.settings.baseNodeStyle};for(const field of ['backgroundColor','textColor','borderColor','gateStrokeColor','gateBackgroundColor'])delete baseGeometry[field];
   tab.openColorAdoption();dialog=[...tab.colorDialogs].at(-1);c.dialogs.push(dialog);check(dialog.contentEl.querySelectorAll('details li').length>0,'Adoption affected-slot list missing');
   await until(()=>dialog.contentEl.querySelector('.kplex-color-preview-canvas')?.style.getPropertyValue('--_kplex-preview-canvas'),'Adoption preview did not paint');button(dialog.contentEl,'colors.adoptConfirm').click();await until(()=>!dialog.modalEl.isConnected,'Adoption confirmation did not close');
   check(p.settings.backgroundColor===undefined&&p.settings.standardStyleDefaults==='native'&&JSON.stringify(baseGeometry)===JSON.stringify(p.settings.baseNodeStyle),'Adoption changed geometry or kept standard paint');
   check(protectedFields===JSON.stringify([p.settings.noteTypeStyles,p.settings.tagNodeStyles,p.settings.hierarchyLinkStyles,p.settings.graphLenses,p.settings.colorPreferences]),'Adoption changed protected custom/lens/palette fields');passed('native explicit adoption previews affected slots and preserves custom data/geometry');
   app.setting.close();await wait(150);const lensId='native-color-lens-158';check(!p.settings.graphLenses.some(lens=>lens.id===lensId),'Synthetic lens collision');
   await p.setGraphLenses([...p.settings.graphLenses,{id:lensId,name:'Native lens color',enabled:false,scope:'node',mode:'style',expression:'node.kind == "note"',style:{node:{textColor:'#11223380'}}}]);await wait(150);
   graph.closest('.kplex-app')?.querySelector('.kplex-filter-trigger')?.click();await until(()=>document.querySelector('.kplex-filter-panel'),'Native filter did not open');
   const lensRow=[...document.querySelectorAll('.kplex-lens-row')].find(row=>row.querySelector('.kplex-lens-name')?.textContent==='Native lens color');check(lensRow,'Native lens row missing');lensRow.querySelector('.kplex-lens-main').click();
   await until(()=>document.querySelector('.kplex-lens-editor'),'Native lens editor missing');const parentPanel=document.querySelector('.kplex-filter-panel');
   const label=[...parentPanel.querySelectorAll('.kplex-lens-style-grid label')].find(label=>label.textContent.startsWith(p.translator('filter.text')));check(label?.querySelector('button'),'Native lens source action missing');label.querySelector('button').click();
   await until(()=>document.querySelector('.kplex-color-modal'),'Native lens source dialog missing');const nested=document.querySelector('.kplex-color-modal');c.nestedSource=nested;
   const field=nested.querySelector('input[type=text]'),writeBeforeKeys=c.counts.writes;check(field,'Native source input missing');
   field.dispatchEvent(new field.ownerDocument.defaultView.PointerEvent('pointerdown',{bubbles:true,composed:true,pointerId:158,pointerType:'mouse',button:0}));await wait(50);
   check(nested.isConnected&&parentPanel.isConnected,'Nested source pointer dismissed parent');field.focus();
   c.keyRequest='native-source-escape';await until(()=>c.keyDelivered===c.keyRequest,'Native source Escape was not delivered');c.keyRequest=null;
   await until(()=>!nested.isConnected,'Native Escape did not close source');check(parentPanel.isConnected&&parentPanel.querySelector('.kplex-lens-editor'),'Native source Escape closed parent draft');
   c.keyRequest='native-filter-escape';await until(()=>c.keyDelivered===c.keyRequest,'Native filter Escape was not delivered');c.keyRequest=null;
   await until(()=>!parentPanel.isConnected,'Second native Escape did not close filter');check(c.counts.writes===writeBeforeKeys,'Native nested cancellation wrote settings');c.nestedSource=null;
   passed('native lens source retains pointer ownership and trusted Escape closes child before parent without writes');
   await p.updateStyleSettings(draft=>{draft.colorPreferences.compass.enabled=false;delete draft.colorPreferences.compass.intensity;draft.colorPreferences.compass.fills={}});
   /** Native Settings remains the originating document even when it owns a separate window. */
   const openCompass=async()=>{p.openSettings();await until(()=>tab.containerEl.isConnected,'Compass Settings origin missing');await tab.openCompassSettings();const dialog=[...tab.colorDialogs].find(item=>item.modalEl.classList.contains('kplex-compass-modal'));check(dialog,'Native Compass editor missing');c.dialogs.push(dialog);return dialog};
   let compass=await openCompass(),compassBefore=c.counts.writes;button(compass.contentEl,'common.save').click();await until(()=>!compass.modalEl.isConnected,'Unchanged Compass did not close');check(c.counts.writes===compassBefore,'Unchanged Compass wrote');
   compass=await openCompass();const toggle=compass.contentEl.querySelector('.checkbox-container');check(toggle,'Native Compass toggle missing');toggle.click();button(compass.contentEl,'common.cancel').click();check(c.counts.writes===compassBefore,'Compass Cancel wrote');passed('native Compass unchanged Save and local toggle Cancel write nothing');
   compass=await openCompass();compass.contentEl.querySelector('.checkbox-container').click();await until(()=>compass.contentEl.querySelector('input[type=range]'),'Native Compass rail missing');c.keyTarget=compass.contentEl.querySelector('input[type=range]');c.keyTarget.focus();c.keyEvents=[];
   const keyDoc=c.keyTarget.ownerDocument,keyObserver=event=>queueMicrotask(()=>c.keyEvents.push({key:event.key,code:event.code,trusted:event.isTrusted,prevented:event.defaultPrevented,target:event.target===c.keyTarget}));keyDoc.addEventListener('keydown',keyObserver,true);c.restores.push(()=>keyDoc.removeEventListener('keydown',keyObserver,true));
   c.keyRequest='native-compass-home';await until(()=>c.keyDelivered===c.keyRequest,'Native Compass range Home was not delivered');c.keyRequest=null;await until(()=>c.keyEvents.length>0,'Focused native range received no key event '+JSON.stringify({sameDoc:keyDoc===document,focus:keyDoc.hasFocus(),mainFocus:native.isFocused(),ownerRequire:typeof keyDoc.defaultView.require}));await until(()=>compass.draft.intensity===0,'Native range event did not reach local draft '+JSON.stringify(c.keyEvents));check(c.keyEvents.some(event=>event.key==='Home'&&event.trusted&&event.target),'Compass Home lacked trusted target delivery');check(compass.draft.intensity===0,'Native Compass Home did not update local range '+JSON.stringify({draft:compass.draft,range:c.keyTarget.value,active:c.keyTarget.ownerDocument.activeElement?.tagName,events:c.keyEvents}));c.keyTarget=null;
   button(compass.contentEl,'common.save').click();await until(()=>!compass.modalEl.isConnected,'Native Compass zero Save did not close');check(p.settings.colorPreferences.compass.enabled&&p.settings.colorPreferences.compass.intensity===0,'Native range lost explicit zero '+JSON.stringify(p.settings.colorPreferences.compass));
   app.setting.close();await wait(150);const underlay=graph.querySelector('.kplex-compass-background');check(underlay?.children.length===4&&getComputedStyle(underlay).display==='none','Zero tint did not retain four invisible decorations');passed('native React range accepts trusted Home and persists explicit zero');
   compassBefore={...c.counts};compass=await openCompass();button(compass.contentEl,'compass.resetIntensity').click();const north=compass.contentEl.querySelector('.kplex-style-row button');check(north,'Compass source action missing');north.click();
   const source=[...north.ownerDocument.querySelectorAll('.kplex-color-modal')].find(el=>!el.classList.contains('kplex-compass-modal'));check(source,'Native Compass source missing');c.nestedSource=source;
   input(source.querySelector('.kplex-color-source-editor select'),'fixed','change');input(source.querySelector('fieldset input[type=text]'),'#aabbcc80');button(source,'colors.useColor').click();await until(()=>!source.isConnected,'Compass local source did not close');c.nestedSource=null;
   check(c.counts.writes===compassBefore.writes,'Compass local source wrote settings');button(compass.contentEl,'common.save').click();await until(()=>!compass.modalEl.isConnected,'Compass settings Save did not close');app.setting.close();await wait(180);
   check(p.settings.colorPreferences.compass.intensity===undefined&&p.settings.colorPreferences.compass.fills.north==='#aabbcc80','Compass source or inherited intensity lost');
   const compassWork=Object.fromEntries(Object.entries(c.counts).filter(([key])=>key!=='writes').map(([key,value])=>[key,value-compassBefore[key]]));check(Object.values(compassWork).every(value=>value===0),'Compass paint requested graph work '+JSON.stringify(compassWork));
   const opacity=[];for(let n=0;n<2;n++){const light=document.body.classList.contains('theme-light'),value=Number(getComputedStyle(underlay).fillOpacity);check(Math.abs(value-(light?.05:.07))<1e-6,'Wrong native Compass mode intensity');opacity.push({mode:light?'light':'dark',value});app.commands.executeCommandById('theme:toggle-light-dark');await until(()=>document.body.classList.contains('theme-light')!==light,'Compass host mode did not switch');await wait(120)}
   check(getComputedStyle(underlay).pointerEvents==='none'&&underlay.parentElement===graph,'Compass intercepted input or entered camera');passed('native Compass source and inherited mode intensity retain identity and request zero graph work',{work:compassWork,opacity});
   /** Observe the actual rendered center only in this test; production uses captured geometry and numeric poses. */
   const assertApex=()=>{const svg=graph.querySelector('.kplex-compass-background'),polys=[...svg.children].map(el=>el.getAttribute('points').split(' ').filter(Boolean).map(pair=>pair.split(',').map(Number)));
    const apex=polys[0].find(point=>polys.every(poly=>poly.some(other=>Math.abs(point[0]-other[0])<1e-5&&Math.abs(point[1]-other[1])<1e-5)));
    const actual=graph.querySelector('.kplex-central-editor-overlay')??graph.querySelector('.kplex-role-center'),rect=actual.getBoundingClientRect(),root=graph.getBoundingClientRect();check(apex,'Native Compass shared apex missing');
    const error=Math.max(Math.abs(apex[0]-(rect.left+rect.width/2-root.left-graph.clientLeft)),Math.abs(apex[1]-(rect.top+rect.height/2-root.top-graph.clientTop)));check(error<1,'Native Compass missed rendered center by '+error);return error};
   graph.querySelector('button[aria-label="'+p.translator('graph.fitGraph')+'"]').click();await wait(120);let maxApexError=assertApex();
   graph.dispatchEvent(new graph.ownerDocument.defaultView.WheelEvent('wheel',{bubbles:true,cancelable:true,deltaY:-70,clientX:graph.getBoundingClientRect().left+graph.clientWidth/2,clientY:graph.getBoundingClientRect().top+graph.clientHeight/2}));await wait(100);maxApexError=Math.max(maxApexError,assertApex());
   c.compassOwned=[];c.compassDemand=[];const pathA='Kplex-Compass-Test-A.md',pathB='Kplex-Compass-Test-B.md';check(!app.vault.getFileByPath(pathA)&&!app.vault.getFileByPath(pathB),'Compass fixture collision');
   await app.vault.create(pathA,'[[Kplex-Compass-Test-B]]\n');c.compassOwned.push(pathA);
   const parentField=p.settings.hierarchy.parents[0];check(parentField,'Configured Parent field required for Compass fixture');await app.vault.create(pathB,'---\n'+JSON.stringify(parentField)+': "[[Kplex-Compass-Test-A]]"\n---\n');c.compassOwned.push(pathB);
   p.settings.embedCentralNode=false;p.settings.animationSpeed=.5;await p.saveSettings();for(const path of [pathA,pathB])c.compassDemand.push(p.index.acquireSemanticDemand(path));
   await until(()=>p.index.get(pathA)?.file&&p.index.get(pathB)?.file,'Compass sources did not materialize');p.notifyNavigation(pathA);await until(()=>graph.querySelector('.kplex-role-center')?.dataset.kplexPath===pathA,'Compass fixture center missing');await wait(1200);
   const target=[...graph.querySelectorAll('.kplex-thought')].find(el=>el.dataset.kplexPath===pathB);check(target,'Related Compass fixture missing');target.click();await until(()=>graph.querySelector('.kplex-role-center')?.dataset.kplexPath===pathB,'Compass arrival did not navigate');
   let animated=false;for(let n=0;n<8;n++){await wait(35);const center=graph.querySelector('.kplex-role-center');animated ||= center.getAnimations().length>0;maxApexError=Math.max(maxApexError,assertApex())}check(animated,'Native Compass arrival animation not observed');await wait(1200);maxApexError=Math.max(maxApexError,assertApex());
   const owner=graph.ownerDocument.defaultView,originalFrame=owner.requestAnimationFrame;let idleFrames=0;owner.requestAnimationFrame=function(callback){if(String(new Error().stack).includes('plugin:k-plex'))idleFrames++;return originalFrame.call(this,callback)};c.restores.push(()=>owner.requestAnimationFrame=originalFrame);await wait(250);check(idleFrames===0,'Settled native Compass scheduled '+idleFrames+' plugin frames');
   passed('native Compass tracks Fit, zoom and actual center arrival then schedules zero idle frames',{maxApexError,idleFrames});
   c.result={cases:c.cases,counts:c.counts,host:process.versions,foreground:!document.hidden};
  }catch(error){c.error=String(error.stack||error)}
  finally{
   try{if(c.nestedSource?.isConnected)button(c.nestedSource,'common.cancel')?.click();c.nestedSource=null;for(const dialog of c.dialogs)dialog.retire();await p.settingsWriteQueue;for(const restore of c.restores.reverse())restore();for(const release of c.compassDemand??[])release();for(const path of c.compassOwned??[]){const file=app.vault.getFileByPath(path);if(file)await app.vault.delete(file)}if((c.compassOwned??[]).some(path=>app.vault.getFileByPath(path)))throw Error("Owned Compass notes remain");if(c.result)c.result.fixtureNotesRemoved=true;p.settings=c.settings;p.savedSettingsPolicy=c.policy;if(app.setting.isOpen)app.setting.close();if(document.body.classList.contains('theme-light')!==c.light){app.commands.executeCommandById('theme:toggle-light-dark');await wait(100)}await p.index.refreshPresentationSettings();await app.workspace.changeLayout(c.layout);await wait(200);c.cleaned=true}
   catch(error){c.cleanupError=String(error.stack||error)}c.done=true;
  }
 })();return true;
}
/** Read reproducible source metadata through the same bounded process boundary. */
function git(...args){const result=spawnNativeSync('git',args,{cwd:root,encoding:'utf8',timeout:10000});if(result.error||result.status!==0)throw result.error??Error(result.stderr);return result.stdout.trim()}
const report={schemaVersion:1,status:'running',startedAt:new Date().toISOString(),node:process.version,obsidian:cli('version'),
 source:{revision:git('rev-parse','HEAD'),dirty:!!git('status','--porcelain'),driverSha256:createHash('sha256').update(readFileSync(new URL(import.meta.url))).digest('hex')},artifacts};
let deliveredKey=null;
try{evaluate('JSON.stringify(('+start.toString()+')())');const deadline=Date.now()+120000;while(true){await new Promise(r=>setTimeout(r,100));const state=evaluate('JSON.stringify((()=>{const c=window.__kplex158Colors;return{done:c?.done,error:c?.error,cleanupError:c?.cleanupError,cleaned:c?.cleaned,cases:c?.cases,result:c?.result,keyRequest:c?.keyRequest}})())');report.progress=state;if(state.keyRequest&&state.keyRequest!==deliveredKey){
  if(state.keyRequest==='native-compass-home'){
   // Settings may own a separate native window. Electron sendInputEvent targets that exact
   // document, whereas the selected-vault CLI CDP bridge targets its main renderer.
   const owner=evaluate('JSON.stringify((()=>{const c=window.__kplex158Colors,target=c.keyTarget,view=target.ownerDocument.defaultView,native=view.require("@electron/remote").getCurrentWindow();native.show();native.focus();native.webContents.focus();target.focus();if(target.ownerDocument.activeElement!==target)throw Error("Native range did not take focus");for(const type of ["keyDown","keyUp"])native.webContents.sendInputEvent({type,keyCode:"Home"});return{ownerId:native.id,mainDocument:target.ownerDocument===document}})())');
   (report.keyTargets??=[]).push(owner);
  }else{
   // Official Input.dispatchKeyEvent schema; nativeVirtualKeyCode remains platform-owned.
   for(const type of ['keyDown','keyUp'])cli('dev:cdp','method=Input.dispatchKeyEvent','params='+JSON.stringify({type,key:'Escape',code:'Escape',windowsVirtualKeyCode:27}));
  }
  deliveredKey=state.keyRequest;evaluate('JSON.stringify((window.__kplex158Colors.keyDelivered='+JSON.stringify(deliveredKey)+'))');
 }if(state.done){if(state.error||state.cleanupError)throw Error(state.error||state.cleanupError);report.result=state.result;report.status='passed';break}if(Date.now()>deadline)throw Error('Native color deadline')}}
catch(error){report.status='failed';report.error=String(error);process.exitCode=1}
finally{
 try{
  const deadline=Date.now()+25000;
  while(true){
   const state=evaluate('JSON.stringify((()=>{const c=window.__kplex158Colors;if(!c)return{absent:true};if(!c.done)c.cancelled=true;return{done:c.done,cleaned:c.cleaned,cleanupError:c.cleanupError}})())');
   if(state.absent||state.done&&state.cleaned)break;
   if(state.done||Date.now()>deadline)throw Error(state.cleanupError||'Native controller did not safely drain');
   await new Promise(resolve=>setTimeout(resolve,100));
  }
  const state=evaluate('JSON.stringify((()=>{const c=window.__kplex158Colors;if(!c)return{absent:true};if(!c.done||!c.cleaned)throw Error("Native controller not safely drained");delete window.__kplex158Colors;return{removed:true}})())');report.controller=state;if(!state.removed&&!state.absent)throw Error('Controller cleanup missing');for(const backup of backups)writeFileSync(join(target.config,backup.name),backup.bytes);report.configurationBytesRestored=backups.every(backup=>readFileSync(join(target.config,backup.name)).equals(backup.bytes))}
 catch(error){report.cleanupError=String(error);report.status='failed';process.exitCode=1}
 report.completedAt=new Date().toISOString();writeFileSync(join(output,'color-styling-native.json'),JSON.stringify(report,null,2)+'\n');writeFileSync(join(output,'driver-source.mjs'),readFileSync(new URL(import.meta.url)));
}
console.log(JSON.stringify({status:report.status,error:report.error,cases:report.result?.cases.length,configurationBytesRestored:report.configurationBytesRestored}));
