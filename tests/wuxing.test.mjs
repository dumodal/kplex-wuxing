/** Exercises the actual fork classifier and neighborhood projection with bounded metadata fixtures. */
import assert from 'node:assert/strict';
import test from 'node:test';
import { build } from 'esbuild';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const result = await build({entryPoints:['src/core/plex/wuxing.ts','src/index/GraphIndex.ts','src/core/plex/wuxingOnboarding.ts'],bundle:true,write:false,outdir:'/tmp/wuxing-unused',platform:'node',format:'cjs',external:['obsidian']});
const modules=result.outputFiles.map(file=>{const m={exports:{}};new Function('module','exports','require',file.text)(m,m.exports,id=>id==='obsidian'?{TFile:class {},TFolder:class {},Platform:{isMobile:false}}:require(id));return m.exports;});
const {wuXingElement,wuXingRole,wuXingActionBlocked}=modules.find(m=>m.wuXingRole);
const {GraphIndex}=modules.find(m=>m.GraphIndex);

test('all 25 pairs follow generation and control, and reverse correctly',()=>{
 const elements=['🟡','🔵','🟢','🔴','🟤'];
 const expected=[['previous','child','right','left','parent'],['parent','previous','child','right','left'],['left','parent','previous','child','right'],['right','left','parent','previous','child'],['child','right','left','parent','previous']];
 const inverse={parent:'child',child:'parent',left:'right',right:'left',previous:'previous'};
 elements.forEach((a,i)=>elements.forEach((b,j)=>{assert.equal(wuXingRole(a,b),expected[i][j]);assert.equal(wuXingRole(b,a),inverse[wuXingRole(a,b)]);}));
});
test('metadata accepts scalar/list emoji and refuses missing or ambiguous phases',()=>{
 for(const v of ['🔵',['🔵'],[' 🔵 '],['🔵','🔵'],'🔵\uFE0F']) assert.equal(wuXingElement(v),'🔵');
 for(const v of [null,undefined,[],['🔵','🟡'],['🔵','done'],{},22,'water','🟡🔵']) assert.equal(wuXingElement(v),null);
});
test('five zones use only existing neighbors and react to live status changes',()=>{
 const statuses=new Map(); const pages=new Map();
 const add=(path,status)=>{const p={path,name:path,file:{path,extension:'md'},neighbours:new Map()};pages.set(path,p);statuses.set(path,status);return p;};
 const center=add('center.md','🟡');
 const nodes=['🟡','🔵','🟢','🔴','🟤'].map((s,i)=>add(`note${i}.md`,[s]));
 const missing=add('missing.md',null);add('unlinked.md','🔵');
 for(const p of [...nodes,missing]) center.neighbours.set(p.path,{target:p,isHidden:false,direction:1});
 const idx=Object.create(GraphIndex.prototype);
 idx.plugin={manifest:{id:'kplex-wuxing'},settings:{maxItemCount:100,renderSiblings:false}};
 idx.app={vault:{getFileByPath:path=>pages.get(path)?.file??null},metadataCache:{getFileCache:file=>({frontmatter:{status:statuses.get(file.path)}})}};
 idx.get=path=>pages.get(path);idx.semanticRelationSource=page=>({page,settings:{}});idx.isVisiblePage=()=>true;idx.sortNeighbours=items=>items;idx.relationViewSignature=()=>'';
 center.neighbours.set(center.path,{target:center,isHidden:false,direction:1});
 const original=JSON.stringify([...center.neighbours.keys()]);
 let n=idx.getNeighborhood(center.path);
 assert.deepEqual([n.siblings,n.children,n.rightFriends,n.leftFriends,n.parents].map(items=>items.map(x=>x.page.path)),nodes.map(x=>[x.path]));
 assert.equal(idx.wuXingUnclassifiedCount(center.path),1);
 idx.plugin.settings.maxItemCount=0; const capped=idx.getNeighborhood(center.path);
 assert.equal(capped.children.length,0);assert.equal(capped.wuXingCounts.child,1);
 idx.plugin.settings.maxItemCount=100;
 statuses.set(center.path,'🔵');n=idx.getNeighborhood(center.path);
 assert.equal(n.parents[0].page.path,nodes[0].path);assert.equal(n.siblings[0].page.path,nodes[1].path);
 statuses.set(nodes[0].path,['🔵','🟡']);assert.equal(idx.wuXingUnclassifiedCount(center.path),2);
 statuses.set(center.path,null);n=idx.getNeighborhood(center.path);assert.equal(n.parents.length+n.children.length+n.leftFriends.length+n.rightFriends.length+n.siblings.length,0);
 assert.equal(JSON.stringify([...center.neighbours.keys()]),original);
});
test('status-derived relationships cannot invoke ontology mutations or section projections',()=>{
 for(const id of ['relationship.create-center.child','relationship.relink','relationship.details','section.expand','sections.expand']) assert.equal(wuXingActionBlocked(id),true);
 for(const id of ['navigation.back','node.open','search.focus']) assert.equal(wuXingActionBlocked(id),false);
});

test('status resolves current vault file even for provisional or stale graph handles',()=>{
 const file={path:'questions.md',extension:'md'};
 const idx=Object.create(GraphIndex.prototype);
 idx.app={vault:{getFileByPath:path=>path===file.path?file:null},metadataCache:{getFileCache:f=>f===file?{frontmatter:{status:['🔵']}}:null}};
 assert.equal(idx.wuXingPhase({path:file.path,file:null}),'🔵');
 assert.equal(idx.wuXingPhase({path:file.path,file:{path:'old.md',extension:'md'}}),'🔵');
 assert.equal(idx.wuXingPhase({path:'deleted.md',file} ),null);
});


test('A/B learning defaults use the existing cycle for every reference phase',()=>{
 const {wuXingStartingPhases}=modules.find(m=>m.wuXingStartingPhases);
 for(const reference of ['🟡','🔵','🟢','🔴','🟤']){
  const phases=wuXingStartingPhases(reference);
  assert.equal(wuXingRole(reference,phases.original),'child');
  assert.equal(wuXingRole(reference,phases.captured),'right');
 }
 assert.deepEqual(wuXingStartingPhases('🟡'),{original:'🔵',captured:'🟢'});
});
