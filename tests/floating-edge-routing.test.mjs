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


/** Sample real curve geometry for visual budgets and nearest-painted hover regression checks. */
const sample=(c,t)=>{const u=1-t;return{x:u**3*c.a.x+3*u*u*t*c.c1.x+3*u*t*t*c.c2.x+t**3*c.b.x,y:u**3*c.a.y+3*u*u*t*c.c1.y+3*u*t*t*c.c2.y+t**3*c.b.y}};
/** Approximate painted length independently of the router's score sampling. */
const length=route=>{let total=0;for(const c of route.curves){let previous=c.a;for(let i=1;i<=120;i++){const p=sample(c,i/120);total+=Math.hypot(p.x-previous.x,p.y-previous.y);previous=p;}}return total;};

test('hidden frame is a weak orientation reference without mandatory portals or shared departures',()=>{
 const source={...node('A',-600,-20,'center'),width:240,height:70,areaId:'water'},peers=[520,610,700].map((y,i)=>({...node('B'+i,-300,y),height:40,areaId:'metal'}));
 const nodes=new Map([['A',source],...peers.map(n=>[n.occurrenceId,n])]),edges=peers.map((n,i)=>edge('link'+i,n.occurrenceId)),areas=[{id:'water',bounds:{x:-780,y:-150,width:360,height:300}},{id:'metal',bounds:{x:-480,y:450,width:360,height:300}}],before=JSON.stringify({nodes:[...nodes],edges,areas});
 const natural=floatingEdgeRoutes(edges,nodes,()=>undefined),routes=floatingEdgeRoutes(edges,nodes,()=>undefined,areas);assert.equal(routes.size,3);assert([...routes.values()].some(r=>r.blueprint),'The background still supplies gentle directional guidance');
 for(const [id,route]of routes){const base=natural.get(id);assert.deepEqual(route.endpoints,base.endpoints,'Nearest actual card contacts stay fixed');assert.equal(route.curves.length,base.curves.length,'The guide cannot add a straight trunk or extra turns');assert(length(route)<=length(base)+Math.min(12,length(base)*.03)+.01,'The guide cannot produce a substantial detour');
  if(route.blueprint){assert(route.blueprint.strength>0&&route.blueprint.strength<.3);for(let i=0;i<=120;i++){const a=sample(base.curves[0],i/120),b=sample(route.curves[0],i/120);assert(Math.hypot(a.x-b.x,a.y-b.y)<=18.1,'Guidance stays visually close to the natural curve');}}
  else assert.deepEqual(route,base,'Obstacle detours keep their independent nearest-route geometry');
 }
 assert.equal(JSON.stringify({nodes:[...nodes],edges,areas}),before,'Soft guidance cannot move notes or edit semantic data');
 const {exports:{floatingEdgeAtPoint}}=loadPortableModules(['src/ui/plexViews/floatingEdgeRouting.ts']);
 for(const [id,route]of routes)assert.equal(floatingEdgeAtPoint(routes,route.midpoint,1),id,'Naturally separated curves remain individually hoverable');
});

test('all phase pairs use a reversible gentle direction while same-phase and missing frames remain natural',()=>{
 const areas=Array.from({length:5},(_,i)=>{const a=-Math.PI/2+i*2*Math.PI/5;return{id:'phase'+i,bounds:{x:850*Math.cos(a)-160,y:850*Math.sin(a)-175,width:320,height:350}}}),all=areas.map((a,i)=>({...node('N'+i,a.bounds.x+160,a.bounds.y+175),areaId:a.id})),nodes=new Map(all.map(n=>[n.occurrenceId,n]));
 const links=[];for(let i=0;i<5;i++)for(let j=i+1;j<5;j++)links.push({...edge('pair'+i+j,'N'+j),sourceOccurrence:'N'+i});
 const routes=floatingEdgeRoutes(links,nodes,()=>undefined,areas);assert.equal(routes.size,10);assert([...routes.values()].every(r=>r.blueprint&&r.curves.length===1),'Clear phase pairs retain one natural Bezier rather than a three-part channel');
 for(const link of links){const forward=routes.get(link.id),reverse=floatingEdgeRoutes([{...link,sourceOccurrence:link.targetOccurrence,targetOccurrence:link.sourceOccurrence}],nodes,()=>undefined,areas).get(link.id);assert(reverse.blueprint);assert(Math.hypot(forward.blueprint.direction.x+reverse.blueprint.direction.x,forward.blueprint.direction.y+reverse.blueprint.direction.y)<1e-8,'Reference orientation follows source/target direction without fixing contact sides');}
 const peer={...node('peer',all[0].x,all[0].y+90),areaId:all[0].areaId},localNodes=new Map([[all[0].occurrenceId,all[0]],['peer',peer]]),local=[{...edge('local','peer'),sourceOccurrence:all[0].occurrenceId}];assert.deepEqual(floatingEdgeRoutes(local,localNodes,()=>undefined,areas),floatingEdgeRoutes(local,localNodes,()=>undefined));assert.deepEqual(floatingEdgeRoutes(links,nodes,()=>undefined,[]),floatingEdgeRoutes(links,nodes,()=>undefined));
 const sorted=map=>[...map].sort(([a],[b])=>a.localeCompare(b));assert.deepEqual(sorted(floatingEdgeRoutes([...links].reverse(),new Map([...nodes].reverse()),()=>undefined,[...areas].reverse())),sorted(routes));
});

test('gentle direction bias retains clear bodies smooth detours and hidden-row suppression',()=>{
 const source={...node('A',-600,-20,'center'),width:240,height:70,areaId:'water'},peers=[520,610,700].map((y,i)=>({...node('B'+i,-300,y),height:40,areaId:'metal'})),nodes=new Map([['A',source],...peers.map(n=>[n.occurrenceId,n])]),links=peers.map((n,i)=>edge('link'+i,n.occurrenceId)),areas=[{id:'water',bounds:{x:-780,y:-150,width:360,height:300}},{id:'metal',bounds:{x:-480,y:450,width:360,height:300}}];
 for(const route of floatingEdgeRoutes(links,nodes,()=>undefined,areas).values())for(const [i,c]of route.curves.entries()){
  for(let j=0;j<=120;j++){const p=sample(c,j/120);for(const n of nodes.values())assert(!(p.x>n.x-n.width/2&&p.x<n.x+n.width/2&&p.y>n.y-n.height/2&&p.y<n.y+n.height/2),'Smooth curves cannot cut through note bodies');}
  if(i){const p=route.curves[i-1],a={x:p.b.x-p.c2.x,y:p.b.y-p.c2.y},b={x:c.c1.x-c.a.x,y:c.c1.y-c.a.y};assert((a.x*b.x+a.y*b.y)/(Math.hypot(a.x,a.y)*Math.hypot(b.x,b.y))>.99999,'Obstacle detours retain continuous tangents');}
 }
 const viewport={key:'metal',left:-480,top:490,width:360,height:70,contentTop:490,contentHeight:600,initialScrollTop:0};assert.equal(floatingEdgeRoutes(links,nodes,n=>n.areaId==='metal'?viewport:undefined,areas).size,1);
});
