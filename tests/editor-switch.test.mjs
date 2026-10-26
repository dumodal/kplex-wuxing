/** Real shared action and binding transactions with finite save gates. Native document/focus
 * acceptance remains in the serial Windows lane; these checks never substitute a text writer. */
import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import {loadPortableModules} from './support/portableTypeScript.mjs';
const {exports:{PlexEditorBindings}}=loadPortableModules(['src/application/PlexEditorBindings.ts']);
const source=ts.createSourceFile('PlexGraph.tsx',readFileSync(new URL('../src/ui/PlexGraph.tsx',import.meta.url),'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
/** Extract actual action/close code without initializing a synthetic native Obsidian editor. */
function production(name,deps){let expression;const visit=node=>{if(ts.isVariableDeclaration(node)&&node.name.getText(source)===name)expression=node.initializer.getText(source);ts.forEachChild(node,visit)};visit(source);assert(expression,name);
 const compiled=ts.transpileModule('const selected='+expression,{compilerOptions:{target:ts.ScriptTarget.ES2021,module:ts.ModuleKind.None}}).outputText;
 return Function(...Object.keys(deps),compiled+';return selected')(...Object.values(deps));}
const deferred=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b});return{promise,resolve,reject}};
/** All file, occurrence and lifetime facts are explicit. The production action owns admission. */
function fixture(occurrence=true){
 const events=[],notices=[],gate=deferred(),oldFile={path:'A.md'},file={path:'B.md'},node={occurrenceId:'B',page:{path:'B.md',file}},state={current:true,node};
 const editors=new PlexEditorBindings(()=>events.push('binding-change'));
 const old=editors.open({viewId:'mindmap',occurrenceId:'A',target:{nodeId:'A.md',path:'A.md',fileIdentity:'file-A'},dimensions:{width:660,height:410},mode:'source'}).binding;
 if(!occurrence){const close=editors.beginClose(old.id);close.commit();}
 events.length=0;
 const viewSession={editors,capture:()=>()=>state.current},boundEditorClose={current:{id:old.id,close:async()=>{events.push('native-save');await gate.promise;events.push('native-close')}}};
 const shared={viewSession,boundEditorClose,preserveCameraOnNextLayout:{current:false},retainedBoundEditor:{current:{id:old.id}},Notice:class{constructor(message){notices.push(message)}},translate:key=>key};
 const deps={...shared,closeBoundEditor:production('closeBoundEditor',shared),editorExpansion:()=>state.node,
  editorExpansionCurrent:{current:()=>state.node},occurrenceEditorPolicy:occurrence,editorSwitch:{current:null},setEditorSwitching:value=>events.push('busy:'+value),
  activePath:'A.md',editorAttention:{current:'A.md'},centralEditorAvailable:true,centralEditorPage:{path:'A.md',file:oldFile},
  onCentralNodeEditorChange:value=>events.push('enabled:'+value),onActivate:page=>{events.push('navigate:'+page.path);return true},
  actionNodeRef:page=>({identity:page.path,path:page.path,fileIdentity:page.file===file?'file-B':'changed-file'}),occurrenceKey:row=>row.occurrenceId,
  viewDefinition:{id:occurrence?'mindmap':'wuxing'},settings:{centerEmbedWidth:660,centerEmbedHeight:410,centralNodeMarkdownMode:'source'},nodeId:value=>value,viewport:{current:{isConnected:true}}};
 return{events,notices,gate,editors,old,oldFile,file,node,state,deps,action:production('editorExpandAction',deps)};
}

test('another occurrence waits for native save/close before admitting one replacement editor',async()=>{
 const f=fixture(),result=f.action.execute({});assert.equal(f.editors.bindings[0].id,f.old.id);assert.equal(f.editors.bindings[0].closing,true);
 assert.deepEqual(f.events,['busy:true','binding-change','native-save']);assert.equal(f.action.availability({}).state,'disabled');
 assert.equal((await f.action.execute({})).status,'unavailable','Concurrent clicks cannot start another save/open');
 f.gate.resolve();assert.equal((await result).status,'completed');const binding=f.editors.bindings[0];
 assert.equal(binding.target.nodeId,'B.md');assert.notEqual(binding.id,f.old.id);assert.equal(f.editors.bindings.length,1);
 assert(f.events.indexOf('native-close')<f.events.lastIndexOf('binding-change'));assert.deepEqual(f.notices,[]);
});
test('failed native save keeps the original buffer binding and refuses replacement',async()=>{
 const f=fixture(),result=f.action.execute({});f.gate.reject(Error('Disk failure'));assert.equal((await result).status,'failed');
 assert.equal(f.editors.bindings[0].id,f.old.id);assert.equal(f.editors.bindings[0].closing,false);assert.deepEqual(f.notices,['actions.editor-save-failed']);
 assert(!f.events.includes('native-close'));assert.equal(f.deps.editorSwitch.current,null);
});
for(const invalid of ['view','attention','hidden','incarnation'])test('save completion cannot reopen a retired '+invalid+' target',async()=>{
 const f=fixture(),result=f.action.execute({});
 if(invalid==='view')f.state.current=false;
 if(invalid==='attention')f.deps.editorAttention.current='C.md';
 if(invalid==='hidden')f.state.node=null;
 if(invalid==='incarnation')f.state.node={...f.node,page:{...f.node.page,file:{path:'B.md'}}};
 f.gate.resolve();assert.notEqual((await result).status,'completed');assert.equal(f.editors.bindings.length,0);assert(!f.events.some(event=>event.startsWith('navigate:')));
});
test('same occurrence reuses the existing binding without saving or replacing its host',async()=>{
 const f=fixture();f.state.node={occurrenceId:'A',page:{path:'A.md',file:f.oldFile}};f.deps.actionNodeRef=page=>({identity:page.path,fileIdentity:'file-A'});
 f.action=production('editorExpandAction',f.deps);assert.equal((await f.action.execute({})).status,'completed');
 assert.equal(f.editors.bindings[0].id,f.old.id);assert(!f.events.includes('native-save'));
});
test('attention-following views save the old document then use accepted navigation and the existing central editor',async()=>{
 const f=fixture(false),result=f.action.execute({});assert.deepEqual(f.events,['busy:true','native-save']);
 f.gate.resolve();assert.equal((await result).status,'completed');assert.deepEqual(f.events,['busy:true','native-save','native-close','enabled:false','navigate:B.md','enabled:true','busy:false']);
 assert.equal(f.editors.bindings.length,0,'Attention views do not adopt independent occurrence bindings');
});
test('attention editor save failure retains its existing presentation and does not navigate',async()=>{
 const f=fixture(false),result=f.action.execute({});f.gate.reject(Error('Disk failure'));assert.equal((await result).status,'failed');
 assert(!f.events.some(event=>event.startsWith('navigate:')||event==='enabled:false'));assert.deepEqual(f.notices,['actions.editor-save-failed']);
});
test('newer attention wins over a slow prior editor-button request',async()=>{
 const f=fixture(false),result=f.action.execute({});f.deps.editorAttention.current='C.md';f.gate.resolve();assert.equal((await result).status,'cancelled');
 assert(!f.events.some(event=>event.startsWith('navigate:')||event==='enabled:false'));assert.equal(f.deps.editorSwitch.current,null);
});
