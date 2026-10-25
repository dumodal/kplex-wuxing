/** Bounded shared preset values, legacy migration, independent intent and truthful cached-field
 * classification. Production registration/rendering/native acceptance follow in checkpointC. */
import assert from 'node:assert/strict';
import test from 'node:test';
import {plexViewModules} from './support/plexViewFixture.mjs';
const M=await plexViewModules(['src/core/plex/views/facets/contracts.ts','src/core/plex/views/facets/templates.ts',
 'src/core/plex/views/facets/validation.ts','src/core/plex/views/facets/configuration.ts','src/core/plex/views/facets/state.ts',
 'src/core/plex/views/facets/classification.ts','src/core/plex/views/configurationValues.ts',
 'src/core/plex/views/configuration.ts','src/core/plex/views/facets/projection.ts','src/core/plex/views/facets/layout.ts',
 'src/core/plex/views/decorations.ts']);
const definition={id:'wuxing',configuration:M.facetsConfigurationSchema};
const available=stored=>M.readViewConfiguration(definition,stored),library=stored=>M.facetLibrary(available(stored));
const node={id:'A',kind:'document',file:{extension:'md'},noteType:'water',tags:['wood']};

test('five ordinary editable templates cover3/4/5/6/7 categories within existing settings bounds',()=>{
 M.validateViewConfigurationSchema(M.facetsConfigurationSchema);
 assert.deepEqual(M.FACET_TEMPLATE_ORDER.map(id=>M.FACET_TEMPLATES[id].order.length),[3,4,5,6,7]);
 for(const [id,preset]of Object.entries(M.FACET_TEMPLATES)){
  assert.equal(M.isFacetPreset(preset),true,id);assert.equal(preset.guides,id==='wuxing');
  assert.deepEqual(Object.keys(preset.categories),preset.order);assert.equal(preset.categories[preset.order[0]].assignment,preset.categories[preset.order[0]].values[0]);
 }
 const stored=M.editViewConfiguration(definition,{},'presets',M.FACET_TEMPLATES);
 assert.equal(available(stored).status,'available');assert(JSON.stringify(stored).length<=16384);
 assert.deepEqual(M.configurationJson(stored),stored);assert.equal(M.isFacetPreset(M.FACET_STATE_EXAMPLE),true);
 assert.deepEqual(M.FACET_STATE_EXAMPLE.order,['seed','research','draft','published']);assert.equal(M.FACET_STATE_EXAMPLE.field,'state');
});

test('Wu Xing migration retains mappings, exact case, source, labels/order/start/layout and unknown fields',()=>{
 const raw={other:{version:8,values:{opaque:'other'}},wuxing:{version:1,wrapper:'keep',values:{source:'property',field:'State',
  order:'metal,earth,fire,wood,water',start:'fire',waterLabel:'Literal water',waterValues:' Liquid,liquid\nwater ',
  woodValues:'',spacing:88,regionWidth:440,regionHeight:360,guides:false,tints:false,unknownFuture:{retain:true}}}};
 const before=structuredClone(raw),effective=available(raw);assert.equal(effective.status,'available');
 const preset=library(raw).presets.wuxing;assert.equal(preset.field,'State');assert.deepEqual(preset.order,['metal','earth','fire','wood','water']);assert.equal(preset.start,'fire');
 assert.deepEqual(preset.categories.water.values,['Liquid','liquid','water']);assert.equal(preset.categories.water.label,'Literal water');assert.equal(preset.categories.water.assignment,'Liquid');
 assert.equal('assignment'in preset.categories.wood,false);assert.equal(preset.spacing,88);assert.equal(preset.regionWidth,440);assert.equal(preset.regionHeight,360);assert.equal(preset.guides,false);assert.equal(preset.tints,false);
 const migrated=M.migrateViewConfiguration(definition,raw);assert.equal(migrated.status,'migrated');assert.equal(migrated.settings.wuxing.version,2);
 assert.equal(migrated.settings.wuxing.wrapper,'keep');assert.deepEqual(migrated.settings.wuxing.values.unknownFuture,{retain:true});assert.deepEqual(migrated.settings.other,raw.other);
 assert.equal('waterValues'in migrated.settings.wuxing.values,false,'Explicit known-field retirement prevents duplicate legacy storage');
 assert.deepEqual(raw,before);assert.equal(M.migrateViewConfiguration(definition,migrated.settings).status,'unchanged');
 assert.equal(Object.keys(library(migrated.settings).presets).length,5,'Unchanged templates inherit without duplicate materialization');
});

test('legacy type/tag sources and maximum alias text retain their interpretation without body parsing',()=>{
 for(const source of ['type','tag']){
  const raw={wuxing:{version:1,values:{source,field:'phase'}}};assert.equal(library(raw).presets.wuxing.source,source);
 }
 const aliases=Array(512).fill('w').join(',');const raw={wuxing:{version:1,values:Object.fromEntries(['water','wood','fire','earth','metal'].map(id=>[id+'Values',aliases]))}};
 const migrated=M.migrateViewConfiguration(definition,raw);assert.equal(migrated.status,'migrated');assert.equal(available(migrated.settings).status,'available');
 assert.equal(library(migrated.settings).presets.wuxing.categories.water.values.length,512);assert(JSON.stringify(migrated.settings).length<=16384);
 const long='x'.repeat(1024),single=M.migrateViewConfiguration(definition,{wuxing:{version:1,values:{waterValues:long}}});
 assert.equal(single.status,'migrated');assert.deepEqual(library(single.settings).presets.wuxing.categories.water.values,[long]);
 assert.equal(library(single.settings).presets.wuxing.categories.water.assignment,long,'A maximum legacy scalar alias remains assignable without truncation');
});

test('failed/future migrations preserve original payload and refuse a destructive fallback write',()=>{
 for(const payload of [{version:9,values:{opaque:'future'}},{version:1,values:{waterValues:42}},
  {version:1,values:{presets:{foreign:'unknown'}}}]){
  const raw={wuxing:payload},before=structuredClone(raw),result=M.migrateViewConfiguration(definition,raw);
  assert.equal(result.status,'unavailable');assert.deepEqual(raw,before);assert.deepEqual(result.original,raw);
  assert.throws(()=>M.editViewConfiguration(definition,raw,'presetOrder',['wuxing']));
 }
});

test('preset selection is canvas state and preserves unknown compatible fields without changing configuration',()=>{
 const configuration=available({}),a={version:1,preset:'wuxing',opaque:'keep'},b={version:1,preset:'para'};
 const changed=M.reduceFacetState(a,{id:'preset.select',args:'ace'},configuration);
 assert.deepEqual(changed,{status:'updated',state:{version:1,preset:'ace',opaque:'keep'}});assert.equal(b.preset,'para');assert.equal(a.preset,'wuxing');
 assert.deepEqual(M.restoreFacetState(null),{version:1,preset:'wuxing'});assert.deepEqual(configuration,available({}));
 const future={version:7,preset:'future',opaque:{retain:true}};assert.equal(M.restoreFacetState(future),future);
 assert.equal(M.reduceFacetState(future,{id:'preset.select',args:'para'},configuration).status,'unavailable');assert.equal(M.facetState(future),null);
});

test('unknown/future preset IDs safely render fallback while retaining their requested identity and data',()=>{
 const stored={wuxing:{version:2,values:{presets:{newer:{version:8,opaque:{retain:true}}},presetOrder:['newer','para']}}};
 const before=structuredClone(stored),lib=library(stored);
 assert.equal(M.resolveFacetPreset(lib,'newer').status,'future');assert.equal(M.resolveFacetPreset(lib,'newer').requestedId,'newer');
 assert.equal(M.resolveFacetPreset(lib,'missing').status,'missing');assert.equal(M.resolveFacetPreset(lib,'missing').id,'wuxing');
 const edited=M.editViewConfigurationAt(definition,stored,{field:'presets',path:['para']},{kind:'set',value:{...M.FACET_TEMPLATES.para,name:'My PARA'}});
 assert.deepEqual(edited.wuxing.values.presets.newer,stored.wuxing.values.presets.newer);assert.deepEqual(stored,before);
});

test('rename/reorder/scoped updates retain stable categories and other presets',()=>{
 let stored=M.editViewConfigurationAt(definition,{}, {field:'presets',path:['para']},{kind:'set',value:{...M.FACET_TEMPLATES.para,name:'My projects'}});
 stored=M.editViewConfigurationAt(definition,stored,{field:'presets',path:['para','categories','projects','label']},{kind:'set',value:'Work'});
 stored=M.editViewConfigurationAt(definition,stored,{field:'presets',path:['para','order']},{kind:'set',value:['archives','resources','areas','projects']});
 assert.equal(library(stored).presets.para.categories.projects.label,'Work');assert.equal(library(stored).presets.wuxing.categories.water.values[0],'water');
 assert.equal(M.resolveFacetPreset(library(stored),'para').id,'para');assert.equal(stored.wuxing.values.presets.para.categories.projects.assignment,'projects');
});

test('explicit replacement is required for deletion and covers restored closed-canvas intent without a rewrite',()=>{
 const lib=library({});for(const replacement of [undefined,'wuxing','missing'])assert.throws(()=>M.replaceFacetPreset(lib,'wuxing',replacement));
 const replacement=M.replaceFacetPreset(lib,'wuxing','para'),stored=M.editViewConfigurationAt(definition,{}, {field:'presets',path:['wuxing']},{kind:'set',value:replacement});
 const state={version:1,preset:'wuxing'},selection=M.resolveFacetPreset(library(stored),state.preset);
 assert.equal(selection.status,'replaced');assert.equal(selection.id,'para');assert.deepEqual(state,{version:1,preset:'wuxing'});
 const cyclic={presets:{a:{version:1,replacement:'b'},b:{version:1,replacement:'a'}},order:['a','b']};
 assert.equal(M.resolveFacetPreset(cyclic,'a').status,'missing');
});

test('preset/category/JSON limits reject rather than truncate or erase configuration',()=>{
 const custom=count=>Object.fromEntries(Array.from({length:count},(_,i)=>['custom'+i,{...M.FACET_STATE_EXAMPLE,name:'State'+i}]));
 assert.equal(M.validFacetLibrary(custom(11)),true);assert.equal(M.validFacetLibrary(custom(12)),false);
 for(const preset of [{...M.FACET_TEMPLATES.ace,order:['add','connect']},{...M.FACET_TEMPLATES.ace,order:['add','connect','connect']},
  {...M.FACET_TEMPLATES.ace,spacing:Infinity},{...M.FACET_TEMPLATES.ace,start:'missing'}])assert.equal(M.isFacetPreset(preset),false);
 const raw={wuxing:{version:2,values:{presets:{future:{version:3,opaque:'x'.repeat(17000)}}}}},before=structuredClone(raw);
 assert.equal(available(raw).status,'unavailable');assert.deepEqual(raw,before);assert.throws(()=>M.editViewConfiguration(definition,raw,'presets',{}));
});

test('primitive/list aliases remain trimmed/exact and conflicts deduplicate within each category',()=>{
 const preset=M.FACET_TEMPLATES.wuxing;
 assert.deepEqual(M.classifyFacetValues(' water ',preset),{status:'assigned',category:'water'});
 assert.deepEqual(M.classifyFacetValues('Water',preset),{status:'unassigned'});
 assert.deepEqual(M.classifyFacetValues(['water','water'],preset),{status:'assigned',category:'water'});
 assert.deepEqual(M.classifyFacetValues(['water','metal'],preset),{status:'conflicting',categories:['water','metal']});
 assert.deepEqual(M.classifyFacetValues(undefined,preset),{status:'unassigned'});
 for(const raw of [{phase:'water'},['water',{}],Array(257).fill('water'),'w'.repeat(4097)])assert.deepEqual(M.classifyFacetValues(raw,preset),{status:'unresolved',reason:'unsupported'});
});

test('one explicit source uses bounded cached fields and distinguishes checking, cannot classify and known missing',()=>{
 let reads=0,fields=[],pending=false,status='available',raw='water';
 const read={properties:{read:(_id,field)=>{reads++;fields.push(field);return status==='available'?{status,value:raw}:{status}},availability:()=>status},scope:()=>({pending})};
 assert.deepEqual(M.classifyFacetNode(node,read,M.FACET_TEMPLATES.wuxing),{status:'assigned',category:'water'});assert.deepEqual(fields,['phase']);
 raw=undefined;assert.deepEqual(M.classifyFacetNode(node,read,M.FACET_TEMPLATES.wuxing),{status:'unassigned'});
 status='unavailable';assert.deepEqual(M.classifyFacetNode(node,read,M.FACET_TEMPLATES.wuxing),{status:'unresolved',reason:'metadata'});
 pending=true;assert.deepEqual(M.classifyFacetNode(node,read,M.FACET_TEMPLATES.wuxing),{status:'checking'});
 status='unsupported';assert.deepEqual(M.classifyFacetNode(node,read,M.FACET_TEMPLATES.wuxing),{status:'unresolved',reason:'unsupported'});
 status='available';const before=reads;
 assert.deepEqual(M.classifyFacetNode(node,read,{...M.FACET_TEMPLATES.wuxing,source:'type'}),{status:'assigned',category:'water'});
 assert.deepEqual(M.classifyFacetNode(node,read,{...M.FACET_TEMPLATES.wuxing,source:'tag'}),{status:'assigned',category:'wood'});assert.equal(reads,before,'No property fallback from type/tag');
 assert.deepEqual(M.classifyFacetNode({...node,kind:'folder'},read,M.FACET_TEMPLATES.wuxing),{status:'unresolved',reason:'unsupported'});
});

/** Direct admitted canonical facts with no acquisition, body, write, or corpus capability. */
function scene(presetId='wuxing',count=8){
 const preset=M.FACET_TEMPLATES[presetId],nodes=new Map(Array.from({length:count+1},(_,i)=>['N'+i,{...node,id:'N'+i}]));
 const work={fields:[],relations:0};const read={coverage:'cached',isCurrent:()=>true,node:id=>nodes.get(id)??null,compare:(a,b)=>a.id.localeCompare(b.id),
  relations:(id,role)=>{work.relations++;return{items:id==='N0'&&role==='child'?[...nodes.values()].slice(1).map(node=>({node,role,relationType:1,direction:1})):[],coverage:'cached',truncated:false}},
  properties:{read:(id,field)=>{work.fields.push([id,field]);return{status:'available',value:id==='N0'?preset.categories[preset.order[0]].values[0]:preset.categories[preset.order[Number(id.slice(1))%preset.order.length]].values[0]}},availability:()=> 'available'},
  scope:()=>({pending:false})};
 const projection=M.projectFacets({attention:'N0',maximum:count+1,state:{version:1,preset:presetId},configuration:available({}),read});
 const measured=projection.occurrences.map(row=>({id:row.id,width:row.id===projection.entry?600:240,height:row.id===projection.entry?700:40,
  expandedWidth:600,expandedReserve:0,mini:null,envelope:null,...(row.id===projection.entry?{badge:{width:120,height:24}}:{})}));
 return{preset,projection,measured,work,layout:(heights={})=>M.layoutFacets(projection,measured,presetId,preset,heights)};
}

test('Facets centers attention once, classifies unique direct neighbors once and retains canonical connectors',()=>{
 const f=scene('wuxing',12),p=f.projection;assert.equal(p.occurrences.filter(row=>row.nodeId==='N0').length,1);
 assert.equal(p.occurrences.find(row=>row.id===p.entry).areaId,undefined);assert(p.occurrences.find(row=>row.id===p.entry).badge);
 assert.equal(f.work.fields.length,13);assert(f.work.fields.every(([,field])=>field==='phase'));assert.equal(f.work.relations,6);
 for(const edge of p.edges){assert.equal(edge.kind,'semantic');assert.equal(edge.sourceNode,'N0');assert.equal(p.occurrences.find(row=>row.id===edge.target).nodeId,edge.targetNode);assert.equal(edge.relation.node.id,edge.targetNode)}
 assert.equal(f.layout().positions.get(p.entry).x,0);assert.equal(f.layout().positions.get(p.entry).y,0);
});

test('large local incidence stops at the shared scene bound before excess property work',()=>{
 const f=scene('ace',3000);assert.equal(f.projection.occurrences.length,2048);assert.equal(f.work.fields.length,2048);
 assert.equal(f.projection.edges.length,2047);assert.equal(f.projection.truncated,true);
});

test('measured3/4/5/6/7 regions stay disjoint from one another and the expanded center/badge',()=>{
 const overlaps=(a,b)=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
 for(const id of M.FACET_TEMPLATE_ORDER){
  const f=scene(id,0),layout=f.layout(),center=layout.positions.get(f.projection.entry),body={x:center.x-center.width/2,y:center.y-center.height/2,width:center.width,height:center.height};
  const badge=M.nodeBadgeBounds(center,{width:120,height:24}),regions=layout.decorations.filter(mark=>mark.kind==='region');
  assert.equal(layout.areas.length,f.preset.order.length+2,'Empty categories plus compact Unassigned/Conflicting remain reachable');
  for(let i=0;i<regions.length;i++){
   assert.equal(overlaps(regions[i].bounds,body),false,id+' center');assert.equal(overlaps(regions[i].bounds,badge),false,id+' badge');
   for(let j=i+1;j<regions.length;j++)assert.equal(overlaps(regions[i].bounds,regions[j].bounds),false,id+' disjoint regions');
  }
  assert.equal(layout.decorations.filter(mark=>mark.kind==='guide').length,id==='wuxing'?5:0);
  assert.deepEqual([...f.layout().positions],[...layout.positions],'Deterministic measured layout');
 }
});

test('dense overflow is bounded and preset/category-scoped area controls preserve the existing key budget',()=>{
 const f=scene('ace',180),first=M.facetAreaId('ace','category','add'),layout=f.layout({[first]:500});
 assert.equal(layout.areas.find(area=>area.id===first).bounds.height,500);
 assert(layout.areas.some(area=>area.viewport.contentHeight>area.viewport.height),'Dense rows remain in shared bounded scrollers');
 assert.equal(layout.positions.size,f.measured.length);for(const area of layout.areas)assert(area.viewport.height>0&&area.bounds.height<=1200);
 const other=scene('para',0);assert.equal(other.layout({[first]:500}).areas[0].bounds.height,280,'One preset does not inherit another preset override');
 const key=M.facetAreaId('p'.repeat(48),'category','c'.repeat(48));assert(key.length<=128);assert.notEqual(M.facetAreaId('a.b','category','c'),M.facetAreaId('a','category','b.c'));
 assert.notEqual(M.facetAreaId('ace','category','unassigned'),M.facetAreaId('ace','status','unassigned'),'Category names cannot collide with diagnostics');
});

test('shared badge validation/bounds keep labels, colors and optional geometry finite',()=>{
 assert.equal(M.validPlexNodeBadge({label:{literal:'Water'},background:{kind:'theme',variable:'--color-blue'}}),true);
 assert.equal(M.validPlexNodeBadge({label:{literal:'x'.repeat(81)}}),false);
 assert.equal(M.validPlexNodeBadge({label:{literal:'Water',key:'wuxing.water'}}),false);
 assert.equal(M.validPlexNodeBadge({label:{literal:'Water'},background:'url(https://invalid.example/)'}),false);
 assert.throws(()=>M.boundedViewColors(Array(257).fill('#ffffff')));
 const small=M.nodeBadgeBounds({x:20,y:40,width:200,height:100},{width:120,height:24}),expanded=M.nodeBadgeBounds({x:20,y:40,width:600,height:700},{width:120,height:24});
 assert.deepEqual(small,{x:-80,y:-46,width:120,height:24});assert.equal(expanded.x,-280);assert.equal(expanded.y,-346);
 assert.throws(()=>M.nodeBadgeBounds({x:0,y:0,width:NaN,height:100},{width:100,height:20}));
});

test('a wide measured badge contributes its complete envelope to region separation',()=>{
 const f=scene('wuxing',0),size=f.measured.find(row=>row.id===f.projection.entry);size.badge={width:1400,height:48};
 const layout=f.layout(),badge=M.nodeBadgeBounds(layout.positions.get(f.projection.entry),size.badge);
 for(const mark of layout.decorations.filter(mark=>mark.kind==='region')){
  const b=mark.bounds;assert.equal(badge.x<b.x+b.width&&badge.x+badge.width>b.x&&badge.y<b.y+b.height&&badge.y+badge.height>b.y,false);
 }
});
