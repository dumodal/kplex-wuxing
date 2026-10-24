/** Cache-only scene admission rejects malformed semantics/geometry and reports unavailable capabilities honestly. */
import assert from 'node:assert/strict';
import test from 'node:test';
import {plexViewModules,viewPage} from './support/plexViewFixture.mjs';
const M=await plexViewModules(['src/ui/plexViews/prepareScene.ts','src/ui/plexViews/scene.ts','src/adapters/obsidian/actionNode.ts','tests/support/plexViewProbe.ts']);
/** Finite cached canonical graph; no acquisition, storage or note-reader capability exists. */
function fixture(maximum=10){
  const pages=new Map(['Focus.md','Root.md','Repeated.md','Hidden.md'].map(id=>{const page=viewPage(id);page.file.stat={mtime:1,ctime:1,size:1};return[id,page]}));
  let live=true;const source={get:id=>pages.get(id),titleFor:p=>p.name,isVisiblePage:p=>p.path!=='Hidden.md',captureSemanticGateRead:()=>({isCurrent:()=>live}),
    sortNeighbours:rows=>rows.sort((a,b)=>a.page.path.localeCompare(b.page.path)),
    neighbours:(_page,role)=>role==='child'?[{page:pages.get('Repeated.md'),role,relationType:1,linkDirection:1},{page:pages.get('Hidden.md'),role,relationType:1,linkDirection:1}]:[],
    explainRelationship:()=>({hidden:false,summary:'cached',resolvedRoles:[],decisions:[]})};
  const read=M.plexViewRead(source,()=>live,maximum,'Focus.md'),settings=M.migrateAndMergeSettings({});
  return{source,read,settings,retire:()=>{live=false},prepare:(definition=M.probeViewDefinition)=>M.prepareViewScene(definition,read,source,'Focus.md',null,settings,()=>live)};
}

test('bounded cache reads expose truncation, unavailable corpus and stale revision without inventing zero metrics',()=>{
  const f=fixture(1),relations=f.read.relations('Root.md','child');
  assert.equal(relations.truncated,true);assert.equal(relations.coverage,'cached');assert.equal(relations.items.length,1);
  assert.equal(f.read.node('Hidden.md'),null);assert.deepEqual(f.read.corpus,{available:false,reason:'unsupported'});
  assert.equal(f.read.evidence('Root.md','Repeated.md').coverage,'cached');f.retire();
  assert.equal(f.read.node('Focus.md'),null);assert.equal(f.read.relations('Root.md','child').coverage,'unavailable');assert.equal(f.read.evidence('Root.md','Repeated.md').coverage,'unavailable');
});

test('shared scene binds repeated occurrences to one canonical page with independent anchors and semantic edges',()=>{
  const f=fixture(),result=f.prepare();assert.equal(result.failure,false);
  const repeated=result.scene.nodes.filter(node=>node.page.path==='Repeated.md');assert.equal(repeated.length,2);assert.equal(repeated[0].page,repeated[1].page);
  assert.equal(result.scene.entryOccurrence,'look-here');assert.equal(result.projection.layoutRoot,'Root.md');assert.equal(result.scene.zoneAreas.grove.width,260);
  assert.equal(M.semanticEdgeForTarget(result.scene.edges,'Root.md','Focus.md','guide'),null);
  assert.equal(M.semanticEdgeForTarget(result.scene.edges,'Root.md','Repeated.md','real-child').id,'real-child');
});

test('malformed policy output fails locally before renderer or relationship writers receive it',()=>{
  const transforms=[
    p=>({...p,attention:'Root.md'}),
    p=>({...p,occurrences:[...p.occurrences,p.occurrences[0]]}),
    p=>({...p,occurrences:p.occurrences.map((o,i)=>i?o:{...o,representation:'point'})}),
    p=>({...p,edges:p.edges.map(e=>e.kind==='semantic'?{...e,sourceNode:'Focus.md'}:e)}),
    p=>({...p,edges:[...p.edges,p.edges[0]]}),
    p=>({...p,entry:'missing'}),
  ];
  for(const transform of transforms){const f=fixture();assert.equal(f.prepare({...M.probeViewDefinition,project:input=>transform(M.probeViewDefinition.project(input))}).failure,true);}
  for(const alter of [a=>({...a,id:'__proto__'}),a=>({...a,viewport:{...a.bounds,contentTop:0,contentHeight:NaN,initialScrollTop:0}}),a=>({...a,heightPreference:{key:'bad',minimum:200,maximum:100}}),a=>({...a,reflow:{columns:0,rowGap:0,columnGap:0}})]){
    const f=fixture();assert.equal(f.prepare({...M.probeViewDefinition,layout(...args){const l=M.probeViewDefinition.layout(...args);return{...l,areas:l.areas.map(alter)}}}).failure,true);
  }
});


test('explicit physical ports retain canonical role counts and unavailable undeclared gates',()=>{
  const stats={top:{visibleCount:2,hasAny:true},bottom:{visibleCount:7,hasAny:true},left:{visibleCount:3,hasAny:true},right:{visibleCount:4,hasAny:true}};
  const physical=M.physicalGateStats({gateStats:stats,physicalPorts:{left:'child',bottom:'parent'}});
  assert.equal(physical.left,stats.bottom);assert.equal(physical.bottom,stats.top);assert.equal(physical.top.countUnavailable,true);
  assert.equal(M.physicalGateStats({gateStats:stats}),stats,'Classic count presentation retains its original identity');
});


test('unavailable projection never publishes an empty successful scene that could remove a live native editor',()=>{
 const f=fixture();assert.equal(f.prepare({...M.probeViewDefinition,project:()=>null}).failure,true);
 const result=M.prepareViewScene({...M.probeViewDefinition,project(input){const p=M.probeViewDefinition.project(input);return {...p,editor:'layout-root'}}},f.read,f.source,'Focus.md',null,f.settings,()=>true,{width:550,height:300});
 assert.equal(result.failure,true,'The existing attention editor cannot silently become another canonical document');
 const fallback=M.attentionFallbackScene(f.source,'Focus.md',f.settings,{width:550,height:300});assert.equal(fallback.editorOccurrence,'recovery-attention');assert.equal(fallback.nodes[0].page,f.source.get('Focus.md'));
});

test('bound occurrence dimensions reach shared layout independently of attention and same-note duplicates',()=>{
 const f=fixture(),page=f.source.get('Repeated.md'),reference=M.actionNodeRef(page),measurements=[],legacyModes=[];
 const definition={...M.probeViewDefinition,editorHosting:'occurrence',layout(projection,rows,state,legacy,context){measurements.push(rows);legacyModes.push(legacy);assert.equal(projection.editor,undefined);return M.probeViewDefinition.layout(projection,rows,state,legacy,context)}};
 const binding={id:'binding-B1',viewId:definition.id,occurrenceId:'repeat-above',target:{nodeId:reference.identity,path:page.file.path,fileIdentity:reference.fileIdentity},dimensions:{width:660,height:370},mode:'source',closing:false};
 const prepare=(bindings=[binding],matches=()=>true)=>M.prepareViewScene(definition,f.read,f.source,'Focus.md',null,f.settings,()=>true,undefined,matches,undefined,{bindings,supports:current=>current===page});
 const result=prepare();assert.equal(result.failure,false);assert.equal(result.projection.attention,'Focus.md');assert.equal(result.projection.layoutRoot,'Root.md');
 assert.equal(result.scene.boundEditors[0].page,page);assert.equal(result.scene.boundEditors[0].binding.id,'binding-B1');
 const B1=result.scene.nodes.find(row=>row.occurrenceId==='repeat-above'),B2=result.scene.nodes.find(row=>row.occurrenceId==='repeat-below');
 assert.equal(B1.page,B2.page);assert.equal(B1.width,660);assert.equal(B1.height,370);assert.notEqual(B2.width,660);
 assert.equal(measurements[0].find(row=>row.id==='repeat-above').editor,true);assert.equal(measurements[0].find(row=>row.id==='repeat-below').editor,undefined);assert.deepEqual(legacyModes,[false]);
 const pinned=prepare([binding],()=>false);assert.equal(pinned.failure,false);assert.deepEqual(pinned.scene.nodes.map(row=>row.occurrenceId),['repeat-above'],'Lens filtering pins the exact live occurrence, not both note copies');
 const resized=prepare([{...binding,dimensions:{width:710,height:420}}]);assert.equal(resized.scene.boundEditors[0].binding.id,binding.id);assert.equal(resized.scene.nodes.find(row=>row.occurrenceId==='repeat-above').width,710);
 const collapsed=prepare([]);assert.equal(collapsed.failure,false);assert.equal(collapsed.scene.boundEditors,undefined);assert(measurements.at(-1).every(row=>row.editor===undefined));
});

test('bound editor admission rejects missing, hidden, recreated or mismatched targets instead of retargeting attention',()=>{
 for(const failure of ['missing-occurrence','wrong-document','wrong-native-file','wrong-view','unsupported','native-rejected','authoritative-hidden','too-many','legacy-policy']){
  const f=fixture(),page=f.source.get('Repeated.md'),reference=M.actionNodeRef(page),definition={...M.probeViewDefinition,editorHosting:'occurrence'};
  const binding={id:'binding',viewId:definition.id,occurrenceId:'repeat-above',target:{nodeId:reference.identity,path:page.file.path,fileIdentity:reference.fileIdentity},dimensions:{width:660,height:370},mode:'source',closing:false};
  if(failure==='missing-occurrence')binding.occurrenceId='missing';
  if(failure==='wrong-document')binding.target.nodeId='Focus.md';
  if(failure==='wrong-native-file')page.file={...page.file};
  if(failure==='wrong-view')binding.viewId='other.view';
  if(failure==='unsupported')page.file.extension='png';
  if(failure==='authoritative-hidden')f.source.isVisiblePage=()=>false;
  if(failure==='legacy-policy')delete definition.editorHosting;
  const result=M.prepareViewScene(definition,f.read,f.source,'Focus.md',null,f.settings,()=>true,undefined,()=>true,undefined,
   {bindings:failure==='too-many'?[binding,{...binding,id:'second',occurrenceId:'repeat-below'}]:[binding],supports:()=>failure!=='native-rejected'});
  assert.equal(result.failure,true,failure);assert.deepEqual(result.scene.nodes,[],failure);assert.equal(result.scene.boundEditors,undefined,failure);
 }
});

test('rooted scene input keeps layout root separate from attention and central sizing',()=>{
 const f=fixture(),seen=[],definition={...M.probeViewDefinition,navigation:'rooted',project(input){seen.push({attention:input.attention,root:input.layoutRoot});return M.probeViewDefinition.project(input)}};
 const result=M.prepareViewScene(definition,f.read,f.source,'Focus.md',null,f.settings,()=>true,undefined,()=>true,
  {translate:value=>value,unfolded:new Set(),layoutRoot:'Root.md'});
 assert.equal(result.failure,false);assert.deepEqual(seen,[{attention:'Focus.md',root:'Root.md'}]);
 assert.equal(result.scene.nodes.find(row=>row.occurrenceId==='layout-root').role,'center');assert.equal(result.scene.nodes.find(row=>row.occurrenceId==='look-here').role,'child');
 assert.equal(f.prepare(definition).failure,true,'A rooted definition cannot silently replace its admitted root');
 const legacy=f.prepare();assert.equal(legacy.failure,false);assert.equal(legacy.scene.nodes.find(row=>row.occurrenceId==='look-here').role,'center','Omitted rooted policy preserves legacy attention styling');
});
