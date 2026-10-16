/** Real owning-window events exercise the shared node/gate/connector highlight owner. */
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {readFileSync} from 'node:fs';
import {after,before,test} from 'node:test';
import {chromiumHarness} from './support/browserTypeScript.mjs';
const bundle=await build({entryPoints:['src/ui/components/hoverHighlight.ts'],write:false,bundle:true,format:'iife',globalName:'sourceModules',platform:'browser'});
let host;
before(async()=>{host=await chromiumHarness(bundle.outputFiles[0].text)});
after(async()=>{await host?.cleanup()});

test('default mode retains the 750ms delay and cancels crossing, leaving and teardown',async()=>{
 const result=await host.evaluate(`(async()=>{const {HoverHighlight}=sourceModules,seen=[],intent=new HoverHighlight(window,false,value=>seen.push(value));const wait=ms=>new Promise(r=>setTimeout(r,ms));intent.enter('node',{altKey:false,pointerType:'mouse'});await wait(120);const early=[...seen];intent.enter('gate',{altKey:true,pointerType:'mouse'});await wait(820);const settled=[...seen];intent.enter('edge',{altKey:false,pointerType:'mouse'});intent.clear();await wait(820);return{early,settled,final:seen}})()`);
 assert.deepEqual(result,{early:[],settled:['gate'],final:['gate',null]});
});
test('modifier mode works immediately on all targets, including stationary press/release, blur and cleanup',async()=>{
 const result=await host.evaluate(`(()=>{const element=document.body,{HoverHighlight,bindHoverHighlight}=sourceModules,seen=[],intent=new HoverHighlight(window,true,value=>seen.push(value)),release=bindHoverHighlight(element,intent);const key=alt=>window.dispatchEvent(new KeyboardEvent(alt?'keydown':'keyup',{key:'Alt',altKey:alt}));intent.enter('node',{altKey:false,pointerType:'mouse'});key(true);key(false);intent.enter('gate',{altKey:true,pointerType:'mouse'});intent.enter('edge',{altKey:true,pointerType:'mouse'});window.dispatchEvent(new Event('blur'));key(true);intent.enter('new',{altKey:true,pointerType:'mouse'});release();key(false);key(true);return seen})()`);
 assert.deepEqual(result,[null,'node',null,'gate','edge',null,'new',null]);
});
test('no delayed activation without modifier; touch and retired hover cannot steal drag ownership',async()=>{
 const result=await host.evaluate(`(async()=>{const seen=[],intent=new sourceModules.HoverHighlight(window,true,v=>seen.push(v));intent.enter('node',{altKey:false,pointerType:'mouse'});await new Promise(r=>setTimeout(r,820));intent.enter('touch',{altKey:true,pointerType:'touch'});intent.clear(false);intent.modifier(true);return seen})()`);
 assert.deepEqual(result,[null]);
});
test('listeners and timers belong to the actual document, including a second window realm',async()=>{
 const result=await host.evaluate(`(async()=>{const frame=document.createElement('iframe');const loaded=new Promise(r=>frame.onload=r);document.body.append(frame);await loaded;const owner=frame.contentWindow,seen=[],intent=new sourceModules.HoverHighlight(owner,true,v=>seen.push(v)),release=sourceModules.bindHoverHighlight(owner.document.body,intent);intent.enter('gate',{altKey:false,pointerType:'mouse'});window.dispatchEvent(new KeyboardEvent('keydown',{altKey:true}));const main=[...seen];owner.dispatchEvent(new owner.KeyboardEvent('keydown',{altKey:true}));const secondary=[...seen];release();owner.dispatchEvent(new owner.KeyboardEvent('keydown',{altKey:true}));frame.remove();return{main,secondary,final:seen}})()`);
 assert.deepEqual(result,{main:[null],secondary:[null,'gate'],final:[null,'gate',null]});
});
test('all production hover targets forward the pointer modifier to one owner; preference stays outside themes',()=>{
 const graph=readFileSync('src/ui/PlexGraph.tsx','utf8'),node=readFileSync('src/ui/ThoughtNode.tsx','utf8');
 assert.match(graph,/scheduleHoverIntent\(\{ kind: "edge", id: edge.id \}, event\)/);
 assert.match(graph,/scheduleHoverIntent\(\{ kind: "node", path: baseNode.page.path \}, event\)/);
 assert.match(graph,/scheduleHoverIntent\(\{ kind: "gate", path: baseNode.page.path, gate \}, event\)/);
 assert.match(node,/onHoverNode\(node, e\)/);assert.match(node,/onHoverGate\(node, gate, e\)/);
 assert(!readFileSync('src/core/plex/appearanceThemes.ts','utf8').includes('hoverHighlightRequiresAlt'));
});
