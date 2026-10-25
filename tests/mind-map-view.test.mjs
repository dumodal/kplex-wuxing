/** Real pure Mind Map policy/state/geometry. Finite inputs do not stand in for cold production acquisition or native acceptance. */
import assert from 'node:assert/strict';
import test from 'node:test';
import {loadPortableModules} from './support/portableTypeScript.mjs';
const {exports:M}=loadPortableModules(['src/core/plex/views/mindmap/state.ts','src/core/plex/views/mindmap/configuration.ts','src/core/plex/views/mindmap/layout.ts','src/core/plex/views/mindmap/definition.ts','src/core/plex/views/mindmap/occurrences.ts','src/core/plex/views/hierarchy.ts']);

/** Finite canonical incidence and explicit coverage certificates; no reader, scheduler or native API is supplied to the policy. */
function graphInput(children,options={}){
 const ids=new Set(['R','A',...Object.keys(children),...Object.values(children).flat()]);const nodes=new Map([...ids].map(id=>[id,{id,kind:'markdown',label:id}]));
 let current=true,reads=0;const rows=id=>(children[id]??[]).map(target=>({node:nodes.get(target),role:'child',relationType:1,direction:1}));
 const read={coverage:'cached',isCurrent:()=>current,node:id=>{reads++;return nodes.get(id)??null},scope:id=>options.scope?.(id)??{coverage:'local',prepared:true,complete:true,pending:false},
  relations:(id,role,max)=>{reads++;const all=rows(id);return{items:all.slice(0,max),coverage:'cached',truncated:all.length>max}},
  relation:(id,target)=>({items:rows(id).filter(row=>row.node.id===target),coverage:'cached',truncated:false}),compare:(a,b)=>a.id.localeCompare(b.id)};
 return{input:{attention:'A',layoutRoot:'R',maximum:32,state:null,read,...options.input},nodes,project(){return M.mindMapViewDefinition.project(this.input)},get reads(){return reads},retire(){current=false}};
}

test('matching one duplicate occurrence keeps only its real ancestor path, and broken/cyclic ancestry confers no visibility',()=>{
 const rows=[{id:'root'},{id:'B',parent:'root'},{id:'C',parent:'root'},{id:'D1',parent:'B'},{id:'D2',parent:'C'},
  {id:'missing-parent',parent:'absent'},{id:'cycle',parent:'cycle'}];
 assert.deepEqual([...M.hierarchyPathClosure(rows,['D2'],'root')],['root','D2','C']);
 assert.deepEqual([...M.hierarchyPathClosure(rows,['missing-parent','cycle'],'root')],['root']);
});

test('retained unshown branches cannot bias the visible root split under partial coverage',()=>{
 const sides=Object.fromEntries(Array.from({length:20},(_,i)=>[M.mindMapOccurrence(['R','Previously-shown-'+i]),1]));
 const f=graphInput({R:['B','C']},{scope:()=>({coverage:'local',prepared:true,complete:false,pending:false}),input:{state:{version:1,scope:'R',initialGenerations:1,expanded:[],collapsed:[],sides}}});
 const p=f.project();assert.deepEqual([...new Set(p.occurrences.filter(row=>row.branch.depth===1).map(row=>row.branch.side))].sort(),[-1,1]);
 for(const[id,side]of Object.entries(sides))assert.equal(p.stateSuggestion.sides[id],side,'Partial absence cannot delete retained intent');
});

test('canonical children form stable two-sided occurrences, diamonds remain distinct and ancestor cycles are references',()=>{
 const f=graphInput({R:['B','C','R'],B:['D'],C:['D'],D:['R']},{input:{configuration:{status:'available',values:{initialGenerations:3}}}});
 const p=f.project();assert.equal(p.layoutRoot,'R');assert.equal(p.attention,'A');assert.equal(p.root,'root');assert.equal(p.editor,undefined);
 const diamonds=p.occurrences.filter(row=>row.nodeId==='D');assert.equal(diamonds.length,2);assert.notEqual(diamonds[0].id,diamonds[1].id);
 const references=p.occurrences.filter(row=>row.branch.reference);assert(references.length>=1);for(const row of references){assert.equal(row.branch.expanded,false);assert.equal(row.branch.canExpand,false)}
 assert(p.edges.every(edge=>edge.kind==='semantic'&&edge.relation.role==='child'&&f.input.read.relation(edge.sourceNode,edge.targetNode).items.length===1));
 assert(p.occurrences.some(row=>row.branch.side===-1));assert(p.occurrences.some(row=>row.branch.side===1));assert(p.preparation.parents.length<=8);
 const oldSides=p.stateSuggestion.sides;f.input.state=p.stateSuggestion;f.input.attention='C';const moved=f.project();assert.deepEqual(moved.occurrences.map(row=>[row.id,row.branch.side]),p.occurrences.map(row=>[row.id,row.branch.side]));
 f.nodes.set('AA',{id:'AA'});const old=f.input.read.relations;f.input.read.relations=(id,...args)=>id==='R'?{items:[{node:f.nodes.get('AA'),role:'child',relationType:1,direction:1},...old(id,...args).items],coverage:'cached',truncated:false}:old(id,...args);
 const added=f.project();for(const [id,side]of Object.entries(oldSides))assert.equal(added.stateSuggestion.sides[id],side,'Arriving earlier sibling cannot rebalance existing branches');
 f.retire();assert.equal(f.project(),null);
});

test('fold and generation reducers are occurrence-scoped, bounded, and do not confuse unknown empty incidence with a proven leaf',()=>{
 const f=graphInput({R:['B','C'],B:['D'],C:['D']},{scope:id=>id==='B'?{coverage:'cached',prepared:false,complete:false,pending:false}:{coverage:'local',prepared:true,complete:true,pending:false}});
 let p=f.project();const B=p.occurrences.find(row=>row.nodeId==='B');assert.equal(B.branch.canExpand,true);assert.equal(B.branch.expanded,false);
 f.input.state=M.mindMapViewDefinition.hierarchy.reduce(null,p,{kind:'toggle',occurrenceId:B.id});p=f.project();assert(p.occurrences.some(row=>row.nodeId==='D'));assert.deepEqual(p.preparation.parents,['B']);assert.equal(p.occurrences.find(row=>row.nodeId==='B').branch.status,'unavailable');
 f.input.state=M.mindMapViewDefinition.hierarchy.reduce(f.input.state,p,{kind:'expand-generation'});p=f.project();assert.equal(p.occurrences.filter(row=>row.nodeId==='D').length,2);
 f.input.state=M.mindMapViewDefinition.hierarchy.reduce(f.input.state,p,{kind:'collapse-generation'});p=f.project();assert.equal(p.occurrences.filter(row=>row.nodeId==='D').length,0);
 assert.equal(M.mindMapViewDefinition.hierarchy.reduce(f.input.state,p,{kind:'toggle',occurrenceId:'foreign'}),null);
 const unknown=graphInput({R:[]},{scope:()=>({coverage:'cached',prepared:false,complete:false,pending:true})}).project();assert.equal(unknown.occurrences[0].branch.canExpand,true);assert.equal(unknown.occurrences[0].branch.status,'loading');
});

test('high-degree and deep incidence is finite, explicit frontier retention wins, and exact live ancestry survives a truncated prefix',()=>{
 const children={R:Array.from({length:80},(_,i)=>'B'+String(i).padStart(2,'0'))};for(const B of children.R)children[B]=[B+'D'];
 const f=graphInput(children,{input:{maximum:16,configuration:{status:'available',values:{initialGenerations:2}}}});let p=f.project();assert(p.truncated);assert.equal(p.preparation.parents.length,8);assert(p.occurrences.length<=129);assert(f.reads<1000);
 const pinned='B15',editor=M.mindMapOccurrence(['R',pinned,pinned+'D']);f.input.state=p.stateSuggestion;f.input.retainedScopes=['B09','B10','B11','B12','B13','B14',pinned];f.input.editors=[{occurrenceId:editor,nodeId:pinned+'D'}];
 // New sorts outside the finite display prefix must not retire B's existing native editor path.
 f.input.read.relations=(id,role,max)=>{const all=(children[id]??[]).map(target=>({node:f.nodes.get(target),role:'child',relationType:1,direction:1}));return{items:all.slice(0,id==='R'?4:max),coverage:'cached',truncated:all.length>4}};
 p=f.project();assert(p.occurrences.some(row=>row.id===editor));assert(p.preparation.parents.includes(pinned));assert(p.preparation.parents.length<=8);assert(p.occurrences.length<=129);
 delete f.input.read.relation;p=f.project();assert(!p.occurrences.some(row=>row.id===editor),'Absent canonical pair cannot be invented to preserve an editor');
});

test('fold/sides restoration is detached, bounded, future-safe and scoped to the authoritative session root',()=>{
 const raw={version:1,scope:'R',initialGenerations:2,expanded:['B1'],collapsed:[],sides:{B1:-1},futureData:{flags:[true,null]}};
 const state=M.restoreMindMapState(raw);assert.equal(state.version,1);raw.expanded[0]='mutated';raw.futureData.flags.push(false);
 assert.deepEqual(state.expanded,['B1']);assert.deepEqual(state.futureData,{flags:[true,null]});
 assert.equal(M.scopeMindMapState(state,'R',3).initialGenerations,2,'Type defaults do not reopen generations in an existing map');
 const other=M.scopeMindMapState(state,'C',1);assert.equal(other.scope,'C');assert.deepEqual(other.expanded,[]);assert.deepEqual(other.sides,{});
 for(const value of [{version:99,future:true},{...state,expanded:['x'.repeat(4097)]},{...state,sides:{B1:0}},{...state,futureData:'x'.repeat(12000)}])assert.equal(M.restoreMindMapState(value).version,0);
});

test('type configuration validates exact ranges and leaves unavailable payloads inert',()=>{
 const defaults=M.mindMapConfiguration();assert.equal(defaults.initialGenerations,1);assert.equal(defaults.maximumOccurrences,256);
 assert.equal(M.mindMapConfiguration({status:'unavailable',reason:'unsupported'}),null);
 for(const values of [{maximumDepth:9},{initialGenerations:1.5},{maximumOccurrences:257},{arrangement:'unknown'},{verticalSpacing:NaN},{maximumDepth:null}])assert.equal(M.mindMapConfiguration({status:'available',values}),null);
});

test('renamed or missing roots require explicit recovery, and reduced limits retain a live editor path only through real canonical pairs',()=>{
 const f=graphInput({R:['B'],B:['D'],D:['E']},{input:{configuration:{status:'available',values:{initialGenerations:3}}}});let p=f.project();
 const D=p.occurrences.find(row=>row.nodeId==='D');f.input.state=p.stateSuggestion;f.input.editors=[{occurrenceId:D.id,nodeId:'D'}];
 f.input.configuration={status:'available',values:{maximumDepth:1,maximumOccurrences:16}};p=f.project();assert(p.occurrences.some(row=>row.id===D.id));assert(!p.occurrences.some(row=>row.nodeId==='E'));
 f.nodes.set('R',{id:'Renamed'});assert.equal(f.project(),null,'An old root alias cannot silently reroot the map');f.nodes.delete('R');assert.equal(f.project(),null);
});

test('measured subtree bands preserve the root and prevent overlaps before/after an editor expands',()=>{
 const occurrences=[{id:'R',branch:{depth:0,side:1}},...Array.from({length:30},(_,i)=>({id:'N'+i,branch:{parent:i<2?'R':'N'+Math.floor((i-2)/2),side:i%2?-1:1}}))];
 const projection={entry:'R',occurrences};const measurements=occurrences.map(({id})=>({id,width:180,height:40}));
 for(const expanded of [false,true]){
  if(expanded)Object.assign(measurements.find(row=>row.id==='N3'),{width:660,height:410,editor:true});
  const layout=M.layoutMindMap(projection,measurements,M.mindMapConfiguration());assert.deepEqual(layout.positions.get('R'),{x:0,y:0,width:180,height:40});
  const rows=[...layout.positions.values()];assert.equal(rows.length,occurrences.length);
  for(let i=0;i<rows.length;i++)for(let j=i+1;j<rows.length;j++){const a=rows[i],b=rows[j];assert(Math.abs(a.x-b.x)>=(a.width+b.width)/2||Math.abs(a.y-b.y)>=(a.height+b.height)/2,'Measured rectangles overlap')}
 }
 assert.throws(()=>M.layoutMindMap({entry:'R',occurrences:[{id:'R',branch:{side:1}},{id:'X',branch:{parent:'X',side:1}}]},[{id:'R',width:1,height:1},{id:'X',width:1,height:1}],M.mindMapConfiguration()),/ancestry/);
});
