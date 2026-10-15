/** Real Chromium color/cascade, isolated-resource and cancellation checks for the preview adapter. */
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {createServer} from 'node:http';
import test from 'node:test';
import {chromiumHarness} from './support/browserTypeScript.mjs';
const compiled=await build({entryPoints:['src/adapters/obsidian/themePreview.ts'],bundle:true,write:false,format:'iife',globalName:'sourceModules',platform:'browser'});
/** Supply only public host DOM-helper spellings; the browser owns actual CSS and iframe behavior. */
async function fixture(host, extra=''){
 await host.evaluate(`(()=>{
  Object.defineProperty(Document.prototype,'win',{configurable:true,get(){return this.defaultView}});
  window.createEl=tag=>document.createElement(tag);window.createDiv=()=>createEl('div');window.createSpan=()=>createEl('span');
  document.body.className='theme-dark css-settings-manager';document.body.style.setProperty('--accent-input','219 80% 50%');
  const sheet=new CSSStyleSheet();sheet.replaceSync(${JSON.stringify(`body.theme-light{--background-primary:#fcfcfc;--text-normal:#222;--interactive-accent:hsl(var(--accent-input));--local-color:oklch(0.6 0.12 240)}body.theme-dark{--background-primary:#181818;--text-normal:#eee;--interactive-accent:hsl(var(--accent-input));--local-color:oklch(0.8 0.08 240)}body.theme-light.css-settings-manager .fixture-scope{--text-normal:#153060}.fixture-local{--background-primary:#abcdef}${extra}`)});document.adoptedStyleSheets=[sheet];
  window.scope=createDiv();scope.className='fixture-scope kplex-app';document.body.append(scope);
  window.sampler=new sourceModules.ThemePreviewSampler();window.tokens=['--background-primary','--text-normal','--interactive-accent','--local-color'];
 })()`);
}

test('both body-qualified modes match real switches, scoped aliases, accent and modern complete colors',async()=>{
 const host=await chromiumHarness(compiled.outputFiles[0].text);
 try{await fixture(host);const r=await host.evaluate(`(async()=>{
  const original=document.body.className,pair=await sampler.sample(scope,tokens),cached=await sampler.sample(scope,tokens);
  const untouched=original===document.body.className,frames=document.querySelectorAll('iframe').length;
  document.body.classList.replace('theme-dark','theme-light');sampler.invalidate();const switched=await sampler.sample(scope,tokens);
  scope.classList.add('fixture-local');sampler.invalidate();const local=await sampler.sample(scope,tokens);sampler.dispose();
  return{pair,cached:cached===pair,untouched,frames,switched,local,remaining:document.querySelectorAll('iframe').length};
 })()`);assert.equal(r.pair.dark.confidence,'matched');assert.equal(r.pair.light.confidence,'matched');assert.equal(r.pair.light.colors['--text-normal'],'rgb(21, 48, 96)');assert.equal(r.pair.dark.colors['--background-primary'],'rgb(24, 24, 24)');assert.deepEqual(r.pair.light.colors,r.switched.light.colors);assert.deepEqual(r.pair.dark.colors,r.switched.dark.colors);assert.match(r.pair.dark.colors['--local-color'],/^oklch\(/);assert.equal(r.local.light.colors['--background-primary'],'rgb(171, 205, 239)');assert.equal(r.cached,true);assert.equal(r.untouched,true);assert.equal(r.frames,0);assert.equal(r.remaining,0);
 }finally{await host.cleanup()}
});

test('opposite-mode stylesheet resources cannot issue requests from the script-free snapshot',async()=>{
 let requests=0;const server=createServer((_q,r)=>{requests++;r.writeHead(200,{'Content-Type':'image/svg+xml'});r.end('<svg xmlns="http://www.w3.org/2000/svg"/>')});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const host=await chromiumHarness(compiled.outputFiles[0].text);
 try{await fixture(host,`body.theme-light .fixture-scope{background-image:url(http://127.0.0.1:${server.address().port}/preview.svg)}`);const r=await host.evaluate(`(async()=>{const pair=await sampler.sample(scope,tokens);sampler.dispose();await new Promise(r=>setTimeout(r,100));return{pair,frames:document.querySelectorAll('iframe').length}})()`);assert.equal(requests,0);assert.equal(r.frames,0);assert.equal(r.pair.activeMode,'dark');
 }finally{await host.cleanup();await new Promise(r=>server.close(r))}
});

test('supersession and disposal settle promptly and leave no frame or cached late result',async()=>{
 const host=await chromiumHarness(compiled.outputFiles[0].text);
 try{await fixture(host);const r=await host.evaluate(`(async()=>{const first=sampler.sample(scope,tokens),second=sampler.sample(scope,tokens);const a=await first,b=await second;sampler.invalidate();const pending=sampler.sample(scope,tokens);sampler.dispose();const cancelled=await Promise.race([pending,new Promise(r=>setTimeout(()=>r('timeout'),1000))]);return{a,b,cancelled,after:await sampler.sample(scope,tokens),frames:document.querySelectorAll('iframe').length}})()`);assert.equal(r.a,null);assert.equal(r.b.dark.confidence,'matched');assert.equal(r.cancelled,null);assert.equal(r.after,null);assert.equal(r.frames,0);
 }finally{await host.cleanup()}
});

test('unreadable styles and bounded sheet limits return labelled estimates with accurate live colors',async()=>{
 const host=await chromiumHarness(compiled.outputFiles[0].text);
 try{await fixture(host);const r=await host.evaluate(`(async()=>{
  const live=await sampler.sample(scope,tokens);sampler.invalidate();const original=Object.getOwnPropertyDescriptor(document,'styleSheets');Object.defineProperty(document,'styleSheets',{configurable:true,get:()=>[{disabled:false,get cssRules(){throw new DOMException('Blocked','SecurityError')}}]});
  const inaccessible=await sampler.sample(scope,tokens);if(original)Object.defineProperty(document,'styleSheets',original);else delete document.styleSheets;
  sampler.invalidate();document.adoptedStyleSheets=[...document.adoptedStyleSheets,...Array.from({length:129},()=>new CSSStyleSheet())];const bounded=await sampler.sample(scope,tokens);sampler.dispose();return{live,inaccessible,bounded,frames:document.querySelectorAll('iframe').length};
 })()`);assert.equal(r.inaccessible.dark.confidence,'matched');assert.equal(r.inaccessible.light.confidence,'estimated');assert(r.inaccessible.reasons.includes('stylesheet-unavailable'));assert.deepEqual(r.inaccessible.dark.colors,r.live.dark.colors);assert.equal(r.bounded.light.confidence,'estimated');assert(r.bounded.reasons.includes('stylesheet-limit'));assert.equal(r.frames,0);
 }finally{await host.cleanup()}
});


test('inline active-mode host colors keep the live preview but label the unavailable opposite execution',async()=>{
 const host=await chromiumHarness(compiled.outputFiles[0].text);
 try{await fixture(host);const r=await host.evaluate(`(async()=>{document.body.style.setProperty('--background-primary','#123456');const pair=await sampler.sample(scope,tokens);sampler.dispose();return pair})()`);assert.equal(r.dark.colors['--background-primary'],'rgb(18, 52, 86)');assert.equal(r.dark.confidence,'matched');assert.equal(r.light.confidence,'estimated');assert(r.reasons.includes('inline-mode-context'));
 }finally{await host.cleanup()}
});
