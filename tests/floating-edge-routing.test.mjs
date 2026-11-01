/** Observable floating border attachments, cubic-only paths, clipping and stable semantic data. */
import assert from 'node:assert/strict';
import test from 'node:test';
import {loadPortableModules} from './support/portableTypeScript.mjs';
const {exports:{floatingEdgeRoutes}}=loadPortableModules(['src/ui/plexViews/floatingEdgeRouting.ts']);
const node=(id,x,y,role='child')=>({occurrenceId:id,page:{path:id},role,x,y,width:160,height:50,style:{},areaId:id});
const edge=(id,target)=>({id,sourceOccurrence:'A',targetOccurrence:target,sourcePath:'A',targetPath:target,sourcePort:'bottom',targetPort:'top',role:'child',kind:'semantic',style:{}});

test('floating curves bind near the facing border independently of canonical direction and render no angular segments',()=>{
 const source=node('A',0,0,'center');
 for(const [x,y]of [[400,0],[-400,0],[0,300],[0,-300],[400,300],[-400,-300]]){
  const target=node('B',x,y),nodes=new Map([['A',source],['B',target]]),edges=[edge('AB','B')],before=JSON.stringify({nodes:[...nodes],edges});
  const route=floatingEdgeRoutes(edges,nodes,()=>undefined).get('AB');assert(route);assert(!/[LQHV]/.test(route.d));assert(route.d.includes(' C '));
  assert(route.endpoints.source.point.x*x+route.endpoints.source.point.y*y>0,'Source attaches on the side facing the actual destination');
  assert((route.endpoints.target.point.x-x)*x+(route.endpoints.target.point.y-y)*y<0,'Destination attachment faces the source');
  assert(Math.abs(route.endpoints.source.point.x)<=84.0001&&Math.abs(route.endpoints.source.point.y)<=29.0001,'Attachment is at the actual card outline, not an offset gate');
  assert.deepEqual(floatingEdgeRoutes(edges.map(row=>({...row,sourcePort:'left',targetPort:'right',role:'parent'})),nodes,()=>undefined).get('AB'),route,'Semantic port changes do not reroute floating paint');
  assert.equal(JSON.stringify({nodes:[...nodes],edges}),before);
 }
});

test('aligned columns use smooth obstacle detours with deterministic identity and shared hidden-row suppression',()=>{
 const source=node('A',0,300,'center'),peers=[0,-120,-240].map((y,i)=>node('B'+i,0,y)),nodes=new Map([['A',source],...peers.map(row=>[row.occurrenceId,row])]),edges=peers.map(row=>edge('to-'+row.occurrenceId,row.occurrenceId));
 const routes=floatingEdgeRoutes(edges,nodes,()=>undefined);assert.equal(routes.size,3);assert.equal(new Set([...routes.values()].map(row=>row.d)).size,3);
 assert([...routes.values()].some(row=>(row.d.match(/ C /g)||[]).length>1),'Obstructed connections use a smooth multi-cubic arc');
 const snapshot=value=>[...value].sort(([a],[b])=>a.localeCompare(b));assert.deepEqual(snapshot(floatingEdgeRoutes([...edges].reverse(),new Map([...nodes].reverse()),()=>undefined)),snapshot(routes));
 const viewport={key:'B0',left:-100,top:-40,width:200,height:80,contentTop:-40,contentHeight:500,initialScrollTop:0};
 assert.equal(floatingEdgeRoutes(edges,nodes,row=>row.role==='center'?undefined:viewport).size,1,'Clipped targets never paint floating routes');
});

test('screenshot regression selects the near sides for the upper workshop and lower K-Plex note',()=>{
 const current={...node('A',432,770,'center'),width:400,height:90};
 const workshop={...node('Workshop',1070,106),width:306,height:54},legacy={...node('Legacy',1070,200),width:300,height:54},newest={...node('Newest',1070,294),width:300,height:54};
 const method={...node('Method',545,1320),width:220,height:54},kplex={...node('Kplex',545,1415),width:220,height:54};
 const nodes=new Map([['A',current],...['workshop','legacy','newest','method','kplex'].map(key=>{const value={workshop,legacy,newest,method,kplex}[key];return[value.occurrenceId,value]})]);
 const before=JSON.stringify([...nodes]),routes=floatingEdgeRoutes([edge('workshop','Workshop'),edge('kplex','Kplex')],nodes,()=>undefined);
 const top=routes.get('workshop'),bottom=routes.get('kplex');
 assert(top.endpoints.target.point.x<workshop.x,'Upper workshop connects on its nearer left-facing outline instead of detouring around its right edge');
 assert(bottom.endpoints.source.point.y>current.y,'Lower K-Plex leaves the bottom of the current card instead of its far left edge');
 assert(bottom.endpoints.target.point.y<kplex.y,'Lower K-Plex is approached on its upper-facing outline');
 assert.equal(JSON.stringify([...nodes]),before,'Routing cannot change card positions or spacing');
});


test('overlapping projections use the perpendicular minimum and coincident links may share their whole path',()=>{
 const source={...node('A',0,0,'center'),width:400,height:80},target=node('B',100,300),nodes=new Map([['A',source],['B',target]]),edges=[edge('one','B'),edge('two','B')];
 const routes=floatingEdgeRoutes(edges,nodes,()=>undefined),first=routes.get('one'),second=routes.get('two');
 assert.equal(first.endpoints.source.point.x,first.endpoints.target.point.x,'Overlapping horizontal spans use a common vertical perpendicular');
 assert.equal(first.endpoints.target.point.y-first.endpoints.source.point.y,300-40-25-8,'Contact gap is the minimum outline separation including stroke clearance');
 assert.equal(first.d,second.d,'Sharing a route is allowed and carries no length penalty');assert.equal(first.midpoint.x,first.endpoints.source.point.x);
});
