/**
 * Bounded native feasibility check for the production dual-mode snapshot adapter. Only the explicit
 * disposable small vault is allowed. Optional pinned local community CSS fixtures remain test-only;
 * reports contain token values/counts, never stylesheets or notes. Restore appearance/layout bytes.
 */
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {existsSync,mkdirSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnNativeSync,obsidianCliExecutable} from './processTools.mjs';
import {validateTarget} from './runner.mjs';
const root=fileURLToPath(new URL('../../..',import.meta.url)),vaultName=process.env.KPLEX_TEST_VAULT_NAME;
assert.equal(vaultName,'kplex-test-small');
const target=validateTarget({vaultName,vaultPath:process.env.KPLEX_TEST_VAULT_PATH,configDir:process.env.KPLEX_TEST_CONFIG_DIR});
const output=process.env.KPLEX_HOST_REPORT_DIR;assert(output&&!existsSync(output),'Use a fresh explicit report directory');mkdirSync(output,{recursive:true});
/** Retain bounded native IPC and detect error payloads independently of launcher exit status. */
function cli(command,...args){const r=spawnNativeSync(obsidianCliExecutable(),['vault='+vaultName,command,...args],{encoding:'utf8',timeout:30000,killSignal:'SIGKILL',maxBuffer:4*1024*1024});if(r.error||r.status!==0||/^Error:/m.test(r.stdout))throw Error(r.error?.message||r.stdout||r.stderr);return r.stdout.trim()}
/** Decode only the controller's minimized JSON response. */
function evaluate(code){const s=cli('eval','code='+code);return JSON.parse(s.slice(s.indexOf('{')))}
assert.equal(cli('vault','info=path').replace(/^path\s+/,''),target.vault);
const files=['appearance.json','workspace.json'];
const backups=files.map(name=>({name,bytes:existsSync(join(target.config,name))?readFileSync(join(target.config,name)):null}));
const themes=[{name:'Default',css:''}];
if(process.env.KPLEX_THEME_FIXTURES){const folder=process.env.KPLEX_THEME_FIXTURES;for(const item of JSON.parse(readFileSync(join(folder,'MANIFEST.json'),'utf8'))){const css=readFileSync(join(folder,item.name+'.css'),'utf8');assert.equal(createHash('sha256').update(css).digest('hex'),item.sha256);assert(!/url\(\s*["']?https?:|@import\b/i.test(css),'Native fixture must not load remote resources');themes.push({name:item.name,css,revision:item.revision,sha256:item.sha256})}}
const bundle=await build({absWorkingDir:root,entryPoints:['src/adapters/obsidian/themePreview.ts'],bundle:true,write:false,format:'iife',globalName:'previewModule',platform:'browser'});
const report={status:'running',startedAt:new Date().toISOString(),node:process.version,sourceSha256:createHash('sha256').update(readFileSync(join(root,'src/adapters/obsidian/themePreview.ts'))).digest('hex'),themes:themes.map(({css,...rest})=>rest)};
let installed=false;
try{
 evaluate(`(()=>{${bundle.outputFiles[0].text}
  if(window.__kplex158Preview)throw Error('Preview controller exists');
  const c=window.__kplex158Preview={done:false,rows:[],layout:app.workspace.getLayout(),active:app.workspace.activeLeaf,initialLight:document.body.classList.contains('theme-light'),owned:[],samplers:[],restores:[],popout:null};
  c.task=(async()=>{
   const wait=ms=>new Promise(r=>setTimeout(r,ms)),until=async(fn)=>{const end=Date.now()+5000;while(!fn()){if(Date.now()>end)throw Error('Native theme prerequisite timeout');await wait(25)}};
   const tokens=previewModule.THEME_PREVIEW_TOKENS;
   c.popout=app.workspace.getLeaf('window');await until(()=>c.popout.containerEl.ownerDocument!==document&&c.popout.containerEl.ownerDocument.styleSheets.length>0);
   const docs=[['main',document],['popout',c.popout.containerEl.ownerDocument]];
   for(const [label,doc]of docs){const scope=doc.win.createDiv({cls:'kplex-app kplex-preview-feasibility'});scope.setCssStyles({position:'fixed',left:'-100000px',width:'200px',height:'1px'});doc.body.append(scope);c.owned.push(scope);c.restores.push({doc,sheets:[...doc.adoptedStyleSheets]});}
   for(const theme of ${JSON.stringify(themes)}){
    for(const x of c.restores){if(theme.css){const sheet=new x.doc.defaultView.CSSStyleSheet();sheet.replaceSync(theme.css);x.doc.adoptedStyleSheets=[...x.sheets,sheet]}else x.doc.adoptedStyleSheets=x.sheets}
    const samplers=docs.map(()=>new previewModule.ThemePreviewSampler());c.samplers.push(...samplers);
    const first=[];
    for(let i=0;i<docs.length;i++)first.push(await samplers[i].sample(c.owned[i],tokens));
    if(!app.commands.executeCommandById('theme:toggle-light-dark'))throw Error('Native theme toggle unavailable');
    await until(()=>docs.every(([,d])=>d.body.classList.contains('theme-light')!==c.initialLight));await wait(100);
    for(let i=0;i<docs.length;i++){samplers[i].invalidate();const next=await samplers[i].sample(c.owned[i],tokens),before=first[i];if(!before||!next)throw Error('Snapshot cancelled');const parity=tokens.every(key=>before.light.colors[key]===next.light.colors[key]&&before.dark.colors[key]===next.dark.colors[key]);c.rows.push({theme:theme.name,document:docs[i][0],first:before,afterSwitch:next,parity});if(!parity||before.light.confidence!=='matched'||next.dark.confidence!=='matched')throw Error('Native dual-mode parity failed: '+theme.name+'/'+docs[i][0]);}
    app.commands.executeCommandById('theme:toggle-light-dark');await until(()=>docs.every(([,d])=>d.body.classList.contains('theme-light')===c.initialLight));await wait(100);for(const s of samplers)s.dispose();
   }
   return{rows:c.rows,host:process.versions,modeRestored:document.body.classList.contains('theme-light')===c.initialLight};
  })().then(value=>{c.done=true;c.value=value},error=>{c.done=true;c.error=String(error)});return JSON.stringify({started:true})})()`);
 installed=true;
 const deadline=Date.now()+90000;
 while(true){await new Promise(r=>setTimeout(r,250));const state=evaluate("JSON.stringify({done:window.__kplex158Preview?.done,error:window.__kplex158Preview?.error,value:window.__kplex158Preview?.value,rows:window.__kplex158Preview?.rows})");report.progress=state;if(state.done){if(state.error)throw Error(state.error);report.result=state.value;break}if(Date.now()>deadline)throw Error('Native preview deadline')}
 report.status='passed';
}catch(error){report.status='failed';report.error=String(error);process.exitCode=1}
finally{
 try{if(installed){evaluate("(()=>{const c=window.__kplex158Preview;if(!c)return JSON.stringify({absent:true});c.cleanup=(async()=>{await c.task;for(const s of c.samplers)s.dispose();for(const x of c.restores)x.doc.adoptedStyleSheets=x.sheets;for(const el of c.owned)el.remove();if(document.body.classList.contains('theme-light')!==c.initialLight)app.commands.executeCommandById('theme:toggle-light-dark');c.popout?.detach();await app.workspace.changeLayout(c.layout);return{modeRestored:document.body.classList.contains('theme-light')===c.initialLight,framesRemoved:!document.querySelector('iframe[sandbox]')}})().then(value=>{c.cleaned=true;c.cleanupValue=value},error=>{c.cleanupError=String(error)});return JSON.stringify({started:true})})()");const end=Date.now()+30000;while(true){await new Promise(r=>setTimeout(r,100));const state=evaluate("JSON.stringify({done:window.__kplex158Preview?.cleaned,error:window.__kplex158Preview?.cleanupError,value:window.__kplex158Preview?.cleanupValue})");if(state.error)throw Error(state.error);if(state.done){report.cleanup=state.value;break}if(Date.now()>end)throw Error('Preview cleanup deadline')}evaluate("(()=>{delete window.__kplex158Preview;return JSON.stringify({removed:!window.__kplex158Preview})})()")}}
 catch(error){report.cleanupError=String(error);report.status='failed';process.exitCode=1}
 for(const {name,bytes}of backups){const path=join(target.config,name);if(bytes)writeFileSync(path,bytes);else if(existsSync(path))rmSync(path)}
 report.configurationBytesRestored=backups.every(({name,bytes})=>bytes?readFileSync(join(target.config,name)).equals(bytes):!existsSync(join(target.config,name)));
 report.completedAt=new Date().toISOString();writeFileSync(join(output,'report.json'),JSON.stringify(report,null,2)+'\n');
}
console.log(JSON.stringify({status:report.status,error:report.error,report:join(output,'report.json')}));
