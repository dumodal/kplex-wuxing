/** Actual internal registry/session policies: isolation, fallback, stale work and bounded restoration. */
import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import {plexViewModules} from './support/plexViewFixture.mjs';
const M=await plexViewModules(['src/application/PlexViewSession.ts','src/core/plex/views/registry.ts','src/ui/plexViews/builtins.ts','tests/support/plexViewProbe.ts','src/ui/surfaceContinuation.ts']);

test('static registration validates identity/version and ships only implemented Compass/Wu Xing views',()=>{
  assert.deepEqual(M.builtInPlexViews.available.map(view=>view.id),['classic','wuxing']);
  assert.throws(()=>new M.PlexViewRegistry([M.builtInPlexViews.resolve('classic'),M.builtInPlexViews.resolve('classic')]));
  assert.throws(()=>new M.PlexViewRegistry([M.probeViewDefinition]));
  assert.throws(()=>new M.PlexViewRegistry([{...M.builtInPlexViews.resolve('classic'),version:2}]));
});

test('independent selection retires exact outgoing work without touching shared/native owners',()=>{
  const registry=new M.PlexViewRegistry([...M.builtInPlexViews.available,M.probeViewDefinition]),writes=[],a=new M.PlexViewSession(registry,()=>writes.push('A')),b=new M.PlexViewSession(registry,()=>writes.push('B'));
  const old=a.capture(),other=b.capture();let disposal=0;
  a.own(()=>{disposal++;throw Error('One failing resource');});a.own(()=>disposal++);
  a.select('test.situated');assert.equal(disposal,2);assert.equal(old(),false);assert.equal(other(),true);
  assert.equal(a.definition.id,'test.situated');assert.equal(b.definition.id,'classic');assert.deepEqual(writes,['A']);
  const fresh=a.capture();a.select('test.situated');assert.equal(fresh(),true);assert.equal(disposal,2);
  a.dispose();assert.equal(fresh(),false);assert.equal(other(),true);b.dispose();
});

test('unknown preference payloads round-trip while fallback/recovery retain saved state',()=>{
  const registry=new M.PlexViewRegistry([...M.builtInPlexViews.available,M.probeViewDefinition]);
  const a=new M.PlexViewSession(registry,()=>{});a.restore({version:1,id:'future.view',states:{'future.view':{version:3,axis:'time'},'test.situated':{zoom:0.5}}});
  assert.equal(a.definition.id,'classic');assert.equal(a.getState().id,'future.view');assert.deepEqual(a.getState().states['future.view'],{version:3,axis:'time'});
  a.select('test.situated');assert.deepEqual(a.state,{zoom:0.5});a.recover();assert.equal(a.definition.id,'classic');
  assert.deepEqual(a.getState().states['future.view'],{version:3,axis:'time'});
  a.select('test.situated');a.updateState({camera:{x:1,y:2,scale:0.8}});
  const b=new M.PlexViewSession(registry,()=>{});b.restore(JSON.parse(JSON.stringify(a.getState())));assert.equal(b.definition.id,'test.situated');assert.deepEqual(b.state,a.state);
  b.restore({version:1,id:'classic'});assert.equal(b.definition.id,'test.situated','Only initial native restoration is accepted');a.dispose();b.dispose();
});

test('malformed, oversized, cyclic and deep state cannot retain unbounded workspace payloads',()=>{
  const registry=new M.PlexViewRegistry([...M.builtInPlexViews.available,M.probeViewDefinition]),a=new M.PlexViewSession(registry,()=>{});
  a.select('test.situated');const cyclic={};cyclic.self=cyclic;
  for(const value of [cyclic,{huge:'x'.repeat(17000)},Array.from({length:10}).reduce(value=>({value}),{})]){
    a.updateState(value);assert.equal(a.state,null);
  }
  a.select('../unsafe');assert.equal(a.definition.id,'test.situated');a.dispose();a.select('classic');assert.equal(a.definition.id,'test.situated');
});

test('compatible editor leases, per-view heights and transient geometry survive only their intended scope',()=>{
  const incompatible={...M.probeViewDefinition,id:'test.no-editor',capabilities:{...M.probeViewDefinition.capabilities,editor:false}};
  const registry=new M.PlexViewRegistry([...M.builtInPlexViews.available,M.probeViewDefinition,incompatible]);
  let writes=0;const a=new M.PlexViewSession(registry,()=>writes++),release=a.retainEditor();
  a.select('test.no-editor');assert.equal(a.definition.id,'classic');assert.equal(writes,0);
  a.select('test.situated');assert.equal(a.definition.id,'test.situated');const current=a.capture();
  assert.equal(a.setAreaHeight('groveHeight',170),true);assert.equal(current(),true,'Preference changes do not retire the view');
  for(const key of ['__proto__','constructor','prototype']) assert.equal(a.setAreaHeight(key,150),false);
  assert.equal(a.setAreaHeight('bad',Infinity),false);
  const transient={attention:'Focus.md',camera:{x:40,y:-10,scale:0.8},selected:'repeat-above',unfolded:['one']};
  a.retainTransient('test.situated',transient);transient.camera.x=999;
  assert.equal(a.readTransient('test.situated','Focus.md').camera.x,40,'Caller mutation cannot alter the retained camera');
  a.select('classic');assert.deepEqual(a.getAreaHeights(),{});a.select('test.situated');assert.deepEqual(a.getAreaHeights(),{groveHeight:170});
  const saved=JSON.parse(JSON.stringify(a.getState()));assert.equal(JSON.stringify(saved).includes('repeat-above'),false);
  const b=new M.PlexViewSession(registry,()=>{});b.restore(saved);assert.deepEqual(b.getAreaHeights(),{groveHeight:170});assert.equal(b.readTransient('test.situated','Focus.md'),undefined);
  assert.equal(a.readTransient('test.situated','Other.md'),undefined);assert.equal(a.readTransient('test.situated','Focus.md'),undefined,'A root change permanently retires old transient state');
  release();release();a.select('test.no-editor');assert.equal(a.definition.id,'test.no-editor');a.dispose();b.dispose();
});


test('action snapshot reads view retirement synchronously before React can publish another render',()=>{
 const source=ts.createSourceFile('usePlexActions.ts',readFileSync('src/ui/usePlexActions.ts','utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);let body;
 /** Compile the actual host snapshot callback; this fixture supplies only its finite native facts. */
 const visit=node=>{if(ts.isVariableDeclaration(node)&&node.name.getText(source)==='readSnapshot')body=node.initializer.getText(source);ts.forEachChild(node,visit)};visit(source);assert(body);
 const emitted=ts.transpileModule('const read='+body+';',{compilerOptions:{target:ts.ScriptTarget.ES2021}}).outputText;
 const registry=new M.PlexViewRegistry([...M.builtInPlexViews.available,M.probeViewDefinition]),session=new M.PlexViewSession(registry,()=>{});
 const root={isConnected:true,ownerDocument:{defaultView:{},activeElement:null},querySelector:()=>null};
 const current={current:{readViewRevision:session.getSnapshot,root:{current:root},plugin:{isKplexLeafVisible:()=>true,actionWindowId:()=> 'window',hasAssociatedEditor:()=>false},graph:{current:null}}};
 const read=Function('current','interactionRevision','commandFocusRegion','actionNodeRef','plexFocusRegion',emitted+';return read')(current,{current:0},{current:'graph'},()=>assert.fail('No canonical target needed'),()=> 'graph');
 const before=read();session.select('test.situated');const after=read();
 assert.notEqual(after.viewRevision,before.viewRevision,'An old React options object must not conceal the synchronous retirement');session.dispose();assert.notEqual(read().viewRevision,after.viewRevision);
});


test('native picker focus return can advance interaction while view, document and attention fences remain strict',()=>{
 let root={isConnected:true,ownerDocument:{}},snapshot={mounted:true,interactionRevision:1,viewRevision:1,center:{identity:'Focus',fileIdentity:'native'}};
 const strict=M.captureSurfaceContinuation(()=>root,()=>snapshot),picker=M.captureSurfaceContinuation(()=>root,()=>snapshot,{checkInteraction:false});
 snapshot={...snapshot,interactionRevision:2};assert.equal(strict(),false);assert.equal(picker(),true,'Native close returns focus before delivering its owned choice');
 snapshot={...snapshot,viewRevision:2};assert.equal(picker(),false,'Focus return never permits an outgoing view');
 snapshot={...snapshot,viewRevision:1,center:{identity:'Other',fileIdentity:'native'}};assert.equal(picker(),false);
 snapshot={...snapshot,center:{identity:'Focus',fileIdentity:'native'}};root={...root,ownerDocument:{}};assert.equal(picker(),false,'A replaced native document cannot deliver the captured choice');
});
