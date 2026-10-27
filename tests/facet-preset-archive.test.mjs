/** Retired presets remain ordinary portable packages, admitted by the same production owner. */
import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {loadPortableModules} from './support/portableTypeScript.mjs';
const h=loadPortableModules(['src/core/plex/sharing/validation.ts','src/core/plex/sharing/transfer.ts']);
const M=h.exports;
const files={arc:['arc','arc',3],para:['para','para',4],'gtd-horizons':['gtd','horizon',6],eaccess:['eaccess','access',7],sensemaking:['sensemaking','sensemaking',4],'publishing-pipeline':['publishing','state',5]};
for(const [file,[id,field,count]]of Object.entries(files))test(`archived ${id} retains a complete independently importable definition`,()=>{
 const pkg=JSON.parse(readFileSync(`presets/facets/${file}.json`,'utf8')),result=M.validatePortablePackage(pkg);
 assert.equal(result.status,'valid');assert.equal(pkg.kind,'facets');assert.equal(pkg.id,id);assert.equal(pkg.preset.field,field);assert.equal(pkg.preset.order.length,count);
 assert(pkg.preset.helpMarkdown.length>500);assert.equal(pkg.preset.helpSourceLocale,'en');assert.equal(pkg.lenses,undefined);assert.equal(pkg.palette,undefined);
 for(const category of Object.values(pkg.preset.categories)){assert(category.label&&!category.label.startsWith('facets.'));assert(category.values.length>0);assert(category.color);}
 const state={presets:{},lenses:[],palette:[]},plan=M.preparePortableImport(result.value,{targetId:id,replace:false,lensIds:[],replacePalette:[]},state),installed=M.applyPortableImport(plan,state);
 assert.deepEqual(installed.preset,pkg.preset);assert.deepEqual(state,{presets:{},lenses:[],palette:[]});assert.deepEqual(installed.lenses,[]);
 if(id==='sensemaking')assert(Object.values(pkg.preset.categories).every(category=>category.rule.includes('note.approach')&&category.rule.includes('note.mode')));
});
test.after(()=>h.cleanup());
