/** Production perspective invariants: fixed 3D edge lengths, bounded depth and deterministic resets. */
import assert from "node:assert/strict";
import test from "node:test";
import {loadPortableModules} from "./support/portableTypeScript.mjs";
const {exports:{createWuXingProjection}}=loadPortableModules(['src/ui/wuxingPerspective.ts']);
const radius=500;
const vertices=p=>Array.from({length:5},(_,i)=>{const a=-Math.PI/2+i*Math.PI*2/5;return p.project(Math.cos(a)*radius,Math.sin(a)*radius);});
test('balanced default is flat; wood dominance moves wood forward and fades the rear in two tiers',()=>{
 const flat=createWuXingProjection([1,1,1,1,1],0,0,radius);assert(Math.abs(flat.yaw)<1e-12 && Math.abs(flat.pitch)<1e-12);
 const p=createWuXingProjection([100,0,0,0,0],0,0,radius),v=vertices(p);
 assert(v[0].depth>v[1].depth && v[1].depth>v[2].depth);
 assert(Math.abs(v[1].depth-v[4].depth)<1e-9);assert(Math.abs(v[2].depth-v[3].depth)<1e-9);
 assert(v[0].scale>v[1].scale && v[1].scale>v[2].scale);
 assert(p.opacity(v[0].depth)>p.opacity(v[1].depth));assert(p.opacity(v[1].depth)>p.opacity(v[2].depth));
});
test('rotation preserves equal 3D edges and diagonals while projected lengths change',()=>{
 const p=createWuXingProjection([20,0,0,0,0],20,-12,radius),v=vertices(p);
 const distance=(a,b)=>Math.hypot(a.x/a.scale-b.x/b.scale,a.y/a.scale-b.y/b.scale,a.depth-b.depth);
 const edges=v.map((a,i)=>distance(a,v[(i+1)%5])),diagonals=v.map((a,i)=>distance(a,v[(i+2)%5]));
 assert(edges.every(d=>Math.abs(d-edges[0])<1e-8));assert(diagonals.every(d=>Math.abs(d-diagonals[0])<1e-8));
 assert(v.every(a=>Number.isFinite(a.scale)&&a.scale>.75&&a.scale<1.4));
 const reset=createWuXingProjection([20,0,0,0,0],0,0,radius);
 assert.deepEqual(vertices(reset),vertices(createWuXingProjection([20,0,0,0,0],0,0,radius)));
 assert.notDeepEqual(v,vertices(reset));
});
