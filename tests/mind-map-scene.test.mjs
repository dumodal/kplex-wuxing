/** Actual shared scene admission/measurement around finite canonical incidence. Cold source acquisition and native editor behavior have separate host lanes. */
import assert from 'node:assert/strict';
import test from 'node:test';
import {plexViewModules,viewPage} from './support/plexViewFixture.mjs';
const M=await plexViewModules(['src/ui/plexViews/prepareScene.ts','src/core/plex/views/mindmap/definition.ts','src/adapters/obsidian/actionNode.ts']);

/** Real shared read/scene policy with explicit cached coverage and no source or file-reading capability. */
function fixture(){
 const children={R:['B','C'],B:['D'],C:['D'],D:['R']},pages=new Map(['R','A','B','C','D'].map(id=>{const page=viewPage(id);page.file.stat={mtime:1,size:1,ctime:1};return[id,page]}));
 let current=true;const source={get:id=>pages.get(id),titleFor:page=>page.name,isVisiblePage:()=>true,captureSemanticGateRead:()=>({isCurrent:()=>current}),
  neighbours:(page,role)=>role==='child'?(children[page.path]??[]).map(id=>({page:pages.get(id),role,relationType:1,linkDirection:1})):[],
  sortNeighbours:rows=>rows.sort((a,b)=>a.page.path.localeCompare(b.page.path)),viewScopeCoverage:()=>({coverage:'local',prepared:true,complete:true,pending:false}),explainRelationship:()=>null};
 const settings={...M.migrateAndMergeSettings({groupRelations:false}),maxItemCount:32,canvasViewSettings:{mindmap:{version:1,values:{initialGenerations:3}}}};
 const prepare=(state=null,matches=()=>true,bindings=[])=>M.prepareViewScene(M.mindMapViewDefinition,M.plexViewRead(source,()=>current,32,'A',256),source,'A',state,settings,()=>current,undefined,matches,
  {translate:key=>key,unfolded:new Set(),layoutRoot:'R'},{bindings,supports:()=>true});
 return{pages,source,settings,children,prepare,retire:()=>{current=false}};
}

test('real shared admission retains child provenance, reference sizing, measured editor geometry and exact filtered ancestry',()=>{
 const f=fixture(),first=f.prepare();assert.equal(first.failure,false);assert.equal(first.scene.entryOccurrence,'root');assert.equal(first.projection.attention,'A');
 const copies=first.scene.nodes.filter(row=>row.page.path==='D');assert.equal(copies.length,2);assert(copies.every(row=>row.semanticSourceId==='B'||row.semanticSourceId==='C'));
 const reference=first.scene.nodes.find(row=>row.page.path==='R'&&row.occurrenceId!=='root');assert(reference);assert.equal(reference.role,'child');
 const target=copies.find(row=>row.semanticSourceId==='B'),page=f.pages.get('D'),referenceId=M.actionNodeRef(page);
 const binding={id:'binding',viewId:'mindmap',occurrenceId:target.occurrenceId,target:{nodeId:'D',path:page.file.path,fileIdentity:referenceId.fileIdentity},dimensions:{width:660,height:410},mode:'source',closing:false};
 const prepared=f.prepare(first.projection.stateSuggestion,()=>false,[binding]);assert.equal(prepared.failure,false);
 assert.deepEqual(prepared.scene.nodes.map(row=>row.page.path),['R','B','D'],'Only the real root/B/D ancestry is pinned by the exact binding');
 const D=prepared.scene.nodes.find(row=>row.page.path==='D');assert.equal(D.width,660);assert.equal(D.height,410);assert.equal(prepared.scene.boundEditors[0].binding.id,binding.id);
 assert.equal(prepared.scene.edges.length,2);assert(prepared.scene.edges.every(edge=>edge.role==='child'));
 f.retire();assert.equal(f.prepare().failure,true);
});

test('the real hierarchy reader admits the full bounded scene and coverage never starts preparation',()=>{
 const f=fixture();f.children.R=[];
 for(let i=0;i<32;i++){
  const parent='P'+i;f.children.R.push(parent);f.children[parent]=[];
  for(const id of [parent,...Array.from({length:32},(_,j)=>parent+'-'+j)]){const page=viewPage(id);page.file.stat={mtime:1,ctime:1,size:1};f.pages.set(id,page);if(id!==parent)f.children[parent].push(id)}
 }
 f.settings.canvasViewSettings.mindmap.values.initialGenerations=2;
 // This case exercises an explicit256-note cap, independently of the editable type default.
 f.settings.canvasViewSettings.mindmap.values.maximumOccurrences=256;
 const result=f.prepare();assert.equal(result.failure,false);assert.equal(result.scene.nodes.length,256);assert(result.projection.truncated);assert.equal(result.projection.preparation.parents.length,8);
 const native={diagnosticsClosed:false,persistentCachePurged:false,hasCurrentCanonicalCenter:()=>false,hasCurrentOnDemandCachedScope:()=>false,
  onDemandHostScopes:new Map(),onDemandTasks:new Map(),onDemandPreviewTasks:new Map(),onDemandGateTasks:new Map(),onDemandBuildWaiters:new Map(),semanticPreparationTasks:new Map(),semanticDemandCounts:new Map(),onDemandBaselineTask:null,get:id=>f.pages.get(id)};
 assert.deepEqual(M.GraphIndex.prototype.viewScopeCoverage.call(native,'B'),{coverage:'cached',prepared:false,complete:false,pending:false});
 native.onDemandTasks.set('B',{});assert.equal(M.GraphIndex.prototype.viewScopeCoverage.call(native,'B').pending,true);
 native.hasCurrentCanonicalCenter=()=>true;assert.equal(M.GraphIndex.prototype.viewScopeCoverage.call(native,'B').complete,true);
 native.diagnosticsClosed=true;assert.deepEqual(M.GraphIndex.prototype.viewScopeCoverage.call(native,'B'),{coverage:'unavailable',prepared:false,complete:false,pending:false});
});

test('pair reads cannot acquire authority from a retired read, hidden target or old canonical identity alias',()=>{
 const f=fixture();f.source.cachedViewRelation=(source,target,role)=>f.source.neighbours(f.source.get(source),role).find(row=>row.page.path===target)??null;
 const read=M.plexViewRead(f.source,()=>true,32,'A');assert.equal(read.relation('B','D','child').items.length,1);
 f.source.isVisiblePage=page=>page.path!=='D';const hidden=M.plexViewRead(f.source,()=>true,32,'A');assert.equal(hidden.relation('B','D','child').items.length,0);
 f.retire();assert.equal(read.relation('B','D','child').coverage,'unavailable');
 const canonical={get:id=>({path:id==='old'?'renamed':id}),isVisiblePage:()=>true,neighbours:()=>[{page:{path:'D'}}]};
 assert.equal(M.GraphIndex.prototype.cachedViewRelation.call(canonical,'old','D','child'),null);
});

test('the shared peer port displays the bounded aggregate without adding or duplicating canonical gate totals',()=>{
 const f=fixture(),result=f.prepare(),root=result.scene.nodes.find(node=>node.occurrenceId==='root');assert.equal(result.failure,false);
 root.peerPort={side:'left',count:4,complete:false,shownCount:2};root.gateStats={top:{visibleCount:1,hasAny:true},bottom:{visibleCount:10,hasAny:true},left:{visibleCount:99,hasAny:true},right:{visibleCount:99,hasAny:true}};
 const stats=M.physicalGateStats(root);assert.deepEqual(stats.left,{visibleCount:4,complete:false,hasAny:true,shownCount:2});assert.equal(stats.bottom.visibleCount,10);assert.equal(stats.top.visibleCount,1);
});
