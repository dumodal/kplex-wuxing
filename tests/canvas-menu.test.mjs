/**
 * Compiled canvas-menu routing and cancelable background-draft contracts. Finite Obsidian component
 * doubles observe callbacks/lifetimes only; installed typings, production build and the native lane
 * remain authoritative for real Menu, Modal and ColorComponent behavior.
 */
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import test from 'node:test';
const dir=mkdtempSync(join(tmpdir(),'kplex-canvas-menu-'));
process.on('exit',/** Retire only this suite's emitted fixture. */()=>rmSync(dir,{recursive:true,force:true}));
const stub=join(dir,'obsidian.cjs');
writeFileSync(stub,`exports.Menu=class{items=[];addItem(cb){const item={setTitle(v){this.title=v;return this},setIcon(v){this.icon=v;return this},setChecked(v){this.checked=v;return this},onClick(v){this.click=v;return this}};cb(item);this.items.push(item)}addSeparator(){this.items.push({separator:true})}};
exports.Modal=class{constructor(){this.contentEl={buttons:[],empty(){this.buttons=[]}};this.titleEl={setText(){}};this.modalEl={addClass(){}}}open(){this.onOpen()}close(){this.onClose()}};
exports.Setting=class{constructor(el){this.el=el}setName(){return this}addColorPicker(cb){const p={setValue(v){this.value=v;return this},onChange(cb){this.change=cb;return this}};this.el.picker=p;cb(p);return this}addButton(cb){const b={setButtonText(v){this.label=v;return this},setCta(){return this},setDisabled(v){this.disabled=v;return this},onClick(cb){this.click=cb;return this}};this.el.buttons.push(b);cb(b);return this}};exports.Notice=class{};`);
await build({stdin:{resolveDir:process.cwd(),contents:`export * from './src/ui/plexContextMenu';export * from './src/ui/PlexBackgroundModal';`},outfile:join(dir,'suite.cjs'),bundle:true,platform:'node',format:'cjs',alias:{obsidian:stub}});
const{createPlexContextMenu,PlexBackgroundModal}=(await import(pathToFileURL(join(dir,'suite.cjs')))).default;

test('desktop canvas menu routes settings/display/playback/background and ends with support',/** Checked states belong to the caller and support is invoked synchronously. */()=>{
 const calls=[];const menu=createPlexContextMenu({translate:key=>key,zen:true,fullscreen:false,fullscreenAvailable:true,runAction:id=>calls.push(id),openSettings:()=>calls.push('settings'),chooseBackground:()=>calls.push('background'),reportBug:()=>calls.push('report')});
 const items=menu.items.filter(item=>!item.separator);
 assert.deepEqual(items.map(item=>item.title),['actions.view.wander.start','actions.canvasSettings','actions.canvasZen','actions.canvasFullscreen','actions.canvasBackground','support.reportTitle']);
 assert.equal(items[2].checked,true);assert.equal(items[3].checked,false);assert.equal(menu.items.at(-2).separator,true);
 items.forEach(item=>item.click());assert.deepEqual(calls,['view.wander.start','settings','view.zen.toggle','view.fullscreen.toggle','background','report']);
});

test('unavailable fullscreen is omitted without hiding other canvas actions',/** Mobile retains every supported operation and independent Zen state. */()=>{
 const menu=createPlexContextMenu({translate:key=>key,zen:false,fullscreen:true,fullscreenAvailable:false,runAction(){},openSettings(){},chooseBackground(){},reportBug(){}});
 assert.equal(menu.items.some(item=>item.title==='actions.canvasFullscreen'),false);assert.equal(menu.items.find(item=>item.title==='actions.canvasZen').checked,false);assert.equal(menu.items.at(-1).title,'support.reportTitle');
});

test('cancel and retired Save callbacks never persist the local background draft',/** Native detached callbacks must not mutate settings after view teardown closes the picker. */async()=>{
 const writes=[];let closed=0;const modal=new PlexBackgroundModal({},'#11223366',key=>key,async color=>{writes.push(color)},()=>closed++);modal.open();const save=modal.contentEl.buttons.find(button=>button.label==='common.save');modal.contentEl.picker.change('#abcdef');modal.close();modal.close();await save.click();assert.deepEqual(writes,[]);assert.equal(closed,1);
});

test('unchanged Save preserves color identity; RGB edits preserve alpha and repeated Save serializes',/** One accepted write commits the chosen RGB with its original alpha and then releases the native shell. */async()=>{
 const unchanged=[];const first=new PlexBackgroundModal({},'#11223366',key=>key,async color=>{unchanged.push(color)});first.open();await first.contentEl.buttons.find(button=>button.label==='common.save').click();assert.deepEqual(unchanged,['#11223366']);
 const writes=[];let resolve,closed=0;const pending=new Promise(done=>{resolve=done});const modal=new PlexBackgroundModal({},'#11223366',key=>key,async color=>{writes.push(color);await pending},()=>closed++);modal.open();modal.contentEl.picker.change('#ABCDEF');const save=modal.contentEl.buttons.find(button=>button.label==='common.save');const completion=save.click();await save.click();assert.deepEqual(writes,['#abcdef66']);assert.equal(save.disabled,true);resolve();await completion;assert.equal(closed,1);assert.equal(modal.contentEl.buttons.length,0);
});
