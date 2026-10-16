/** Exact-build native source/paint acceptance in the explicit disposable small vault; restores all owned state. */
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
   c.result={cases:c.cases,counts:c.counts,host:process.versions,foreground:!document.hidden};
  }catch(error){c.error=String(error.stack||error)}
  finally{
   try{if(c.nestedSource?.isConnected)button(c.nestedSource,'common.cancel')?.click();c.nestedSource=null;for(const dialog of c.dialogs)dialog.retire();await p.settingsWriteQueue;for(const restore of c.restores.reverse())restore();p.settings=c.settings;p.savedSettingsPolicy=c.policy;if(app.setting.isOpen)app.setting.close();if(document.body.classList.contains('theme-light')!==c.light){app.commands.executeCommandById('theme:toggle-light-dark');await wait(100)}await p.index.refreshPresentationSettings();await app.workspace.changeLayout(c.layout);await wait(200);c.cleaned=true}
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
  // Official Input.dispatchKeyEvent schema; nativeVirtualKeyCode remains platform-owned.
  for(const type of ['keyDown','keyUp'])cli('dev:cdp','method=Input.dispatchKeyEvent','params='+JSON.stringify({type,key:'Escape',code:'Escape',windowsVirtualKeyCode:27}));
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
