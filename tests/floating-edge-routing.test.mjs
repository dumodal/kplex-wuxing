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



/** Evaluate actual cubic geometry for overlap/occlusion assertions. */
const sample=(c,t)=>{const u=1-t;return{x:u**3*c.a.x+3*u*u*t*c.c1.x+3*u*t*t*c.c2.x+t**3*c.b.x,y:u**3*c.a.y+3*u*u*t*c.c1.y+3*u*t*t*c.c2.y+t**3*c.b.y}};

test('screenshot phase pairs use upper and lower rims even when note bodies occlude their lines',()=>{
 const current={...node('A',335,860,'center'),width:400,height:90,areaId:'water'},wood=[90,181,272,364,455].map((y,i)=>({...node('Wood'+i,1110,y),width:300,height:54,areaId:'wood'})),metal=[1580,1673,1766].map((y,i)=>({...node('Metal'+i,630,y),height:54,areaId:'metal'})),blue=[980,1080].map((y,i)=>({...node('Blue'+i,335,y),width:300,height:54,areaId:'water'})),fire={...node('Fire',1900,665),areaId:'fire'},earth={...node('Earth',1610,1580),areaId:'earth'};
 const nodes=new Map([['A',current],...[...wood,...metal,...blue,fire,earth].map(n=>[n.occurrenceId,n])]),areas=[{id:'water',bounds:{x:80,y:620,width:500,height:600}},{id:'fire',bounds:{x:1730,y:620,width:450,height:600}},{id:'wood',bounds:{x:860,y:30,width:530,height:520}},{id:'metal',bounds:{x:430,y:1490,width:400,height:400}},{id:'earth',bounds:{x:1460,y:1490,width:400,height:400}}],pair=['water','fire'];
 const links=[...wood,...metal,...blue,fire,earth].map(n=>edge('to-'+n.occurrenceId,n.occurrenceId));links.push({...edge('metal-wood','Wood4'),sourceOccurrence:'Metal0',sourcePath:'Metal0'},edge('metal-copy','Metal0'));
 const before=JSON.stringify({nodes:[...nodes],areas,links}),routes=floatingEdgeRoutes(links,nodes,()=>undefined,areas,pair);assert.equal(routes.size,links.length);
 for(const n of [...wood,...metal,...blue,earth]){const route=routes.get('to-'+n.occurrenceId),up=n.areaId==='wood';assert.equal(route.endpoints.source.port,up?'top':'bottom');assert.equal(route.endpoints.target.port,up?'bottom':'top');assert.equal(route.curves.length,1);assert.equal(route.curves[0].c1.x,route.curves[0].a.x,'Departure tangent is vertical');assert.equal(route.curves[0].c2.x,route.curves[0].b.x,'Arrival tangent is vertical');assert(!/[LQHV]/.test(route.d));}
 const wf=routes.get('to-Fire');assert.equal(wf.endpoints.source.port,'right');assert.equal(wf.endpoints.target.port,'left');assert.equal(wf.curves[0].c1.y,wf.curves[0].a.y,'Only parallel Water/Fire departs horizontally');
 assert.equal(routes.get('metal-copy').d,routes.get('to-Metal0').d,'Repeated links may coincide completely without artificial lanes');assert.equal(routes.get('metal-wood').endpoints.source.port,'top');assert.equal(routes.get('metal-wood').endpoints.target.port,'bottom');
 const nav=routes.get('to-Blue1'),covered=blue[0];assert(Array.from({length:121},(_,i)=>sample(nav.curves[0],i/120)).some(p=>Math.abs(p.x-covered.x)<covered.width/2&&Math.abs(p.y-covered.y)<covered.height/2),'A line may pass behind an intervening same-phase note instead of detouring sideways');
 const additional={...node('Blocker',routes.get('to-Metal0').midpoint.x,routes.get('to-Metal0').midpoint.y),areaId:'water'},withBlocker=new Map([...nodes,['Blocker',additional]]);assert.equal(floatingEdgeRoutes(links,withBlocker,()=>undefined,areas,pair).get('to-Metal0').d,routes.get('to-Metal0').d,'An occluding note cannot push a diagonal phase line to a side rim');
 const changed=links.map(e=>({...e,sourcePort:'right',targetPort:'left',role:'parent'}));assert.deepEqual(floatingEdgeRoutes(changed,nodes,()=>undefined,areas,pair),routes,'Canonical role and old fixed gates cannot determine this presentation');assert.equal(JSON.stringify({nodes:[...nodes],areas,links}),before);
 const sorted=m=>[...m].sort(([a],[b])=>a.localeCompare(b));assert.deepEqual(sorted(floatingEdgeRoutes([...links].reverse(),new Map([...nodes].reverse()),()=>undefined,[...areas].reverse(),pair)),sorted(routes));
 const {exports:{floatingEdgeAtPoint}}=loadPortableModules(['src/ui/plexViews/floatingEdgeRouting.ts']);assert.equal(floatingEdgeAtPoint(routes,wf.midpoint,1),'to-Fire','Uncovered painted curves retain nearest-pointer selection');
});

test('the horizontal exception belongs to an explicitly supplied parallel area pair only',()=>{
 const a={...node('A',-300,0,'center'),areaId:'metal'},b={...node('B',300,0),areaId:'earth'},nodes=new Map([['A',a],['B',b]]),links=[edge('AB','B')],areas=[{id:'metal',bounds:{x:-450,y:-100,width:300,height:200}},{id:'earth',bounds:{x:150,y:-100,width:300,height:200}}];
 const route=floatingEdgeRoutes(links,nodes,()=>undefined,areas,['water','fire']).get('AB');assert.equal(route.endpoints.source.port,'top');assert.equal(route.endpoints.target.port,'top','Other same-level phases use a smooth upper arc without acquiring side ports');assert.equal(route.curves.length,1);
 const rotated=[{id:'metal',bounds:{x:-450,y:-100,width:300,height:200}},{id:'earth',bounds:{x:150,y:300,width:300,height:200}}];assert.equal(floatingEdgeRoutes(links,nodes,()=>undefined,rotated,['metal','earth']).get('AB').endpoints.source.port,'bottom','A nonparallel pair cannot use the horizontal exception');
 const viewport={key:'earth',left:150,top:200,width:300,height:100,contentTop:200,contentHeight:600,initialScrollTop:0};assert.equal(floatingEdgeRoutes(links,nodes,n=>n.areaId==='earth'?viewport:undefined,areas,['metal','earth']).size,0,'Fully clipped notes stay hidden even when card occlusion is allowed');
 assert.deepEqual(floatingEdgeRoutes(links,nodes,()=>undefined,[]),floatingEdgeRoutes(links,nodes,()=>undefined),'Unavailable membership/frame geometry keeps the established fallback');
});
