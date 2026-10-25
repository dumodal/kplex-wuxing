/** Native Facets acceptance. Uses the shipped selector, scoped writer, preset manager, shared
 * actions and native dialogs. All notes/configuration and captured images are test-owned. */
export async function acceptFacetsFeatures(x){
 const {app,p,c,host,native,cases,path,root,center,check,wait,until,localReady,choose,panel,reveal,quiet}=x;
 const session=host.view.documentSession.plexView,doc=host.view.containerEl.ownerDocument;
 const surface=/** Reacquire this exact native leaf's current shared action surface. */ ()=>[...p.actionSurfaceHosts].find(([,registration])=>registration.leaf===host)?.[0];
 const action=/** All native commands use the shipped catalog and captured owner. */ async(id,args)=>{const result=await p.actionManager.dispatch({id,source:'internal',surfaceId:surface(),...(args?{args}:{})});check(result.status==='completed',id+': '+JSON.stringify(result));return result};
 const preset=/** Select through the actual opening canvas's contributed dropdown. */ async id=>{await choose(host,'wuxing');const select=panel(host).querySelector('[data-kplex-view-choice="preset"] select');check(select,'Captured preset choice absent');select.value=id;select.dispatchEvent(new doc.defaultView.Event('change',{bubbles:true}));await until(()=>session.state?.preset===id,'Preset did not reach owning session');panel(host).querySelector('.kplex-filter-panel-header button').click();await wait(100)};
 const region=/** Exact opaque region identity avoids label and CSS-escaping assumptions. */ (id,category)=>[...root(host).querySelectorAll('[data-kplex-decoration]')].find(element=>element.dataset.kplexDecoration===JSON.stringify(['facets',id,'category',category]));
 const focus=/** Explicit navigation retains the normal attention/session lifecycle. */ async name=>{p.notifyNavigation(path(name),host);await until(()=>center(host)===path(name)&&root(host).querySelector('.kplex-node-badge'),'Focused note absent');await until(localReady,'Focused cached metadata did not settle');await wait(100)};
 const capture=/** Capture only the actual disposable canvas; no synthetic rendering or private notes. */ async name=>{await reveal(host);await action('view.fit');await wait(200);const bounds=root(host).getBoundingClientRect(),image=await native.webContents.capturePage({x:Math.max(0,Math.ceil(bounds.x)),y:Math.max(0,Math.ceil(bounds.y)),width:Math.floor(bounds.width),height:Math.floor(bounds.height)});require('node:fs').writeFileSync(c.screenshotPrefix+'-'+name+'.png',image.toPNG())};
 const configure=/** Fixture configuration returns to the existing queued settings writer. */ (path,value)=>p.updateCanvasViewConfiguration('wuxing',{field:'presets',path},{kind:'set',value});
 await action('view.fit');await action('view.areas.toggle');await until(()=>root(host).querySelector('.is-area-settings-mode'),'Area settings mode absent');await wait(200);
 const areaStop=quiet();
 for(const [kind,name]of [['category','water'],['status','unassigned'],['status','conflicting'],['status','unresolved']]){
  const id=JSON.stringify(['facets','wuxing',kind,name]);
  for(const delta of [12,-8]){
   const frame=root(host).querySelector('.'+doc.defaultView.CSS.escape('kplex-area-'+id)),handle=frame?.querySelector('[role="separator"]');check(handle,'Native resizable area absent: '+name);
   const box=handle.getBoundingClientRect(),x=Math.round(box.x+box.width/2),y=Math.round(box.y+box.height/2),before=Number(handle.getAttribute('aria-valuenow'));
   native.webContents.sendInputEvent({type:'mouseMove',x,y});native.webContents.sendInputEvent({type:'mouseDown',x,y,button:'left',clickCount:1});native.webContents.sendInputEvent({type:'mouseMove',x,y:y+delta,button:'left'});await wait(100);native.webContents.sendInputEvent({type:'mouseUp',x,y:y+delta,button:'left',clickCount:1});await wait(100);
   const after=session.getAreaHeights()[id];check(delta>0?after>before:after<before,'Native bottom-edge resize has wrong direction/no effect: '+name);cases.push({id:'native-area-resize-'+name,delta,before,after});
  }
 }
 areaStop('native-area-resize-zero-source-work');await action('view.areas.toggle');
 await configure(['state'],c.stateExample);await until(localReady,'Custom preset configuration did not settle');
 const stop=quiet();
 for(const [id,count]of[['ace',3],['para',4],['wuxing',5],['gtd',6],['eaccess',7],['state',4]]){
  await preset(id);check(root(host).querySelectorAll('.kplex-view-region').length===count+2+(id==='wuxing'?1:0),'Preset category/status region count differs: '+id);
  check(root(host).querySelector('.kplex-node-badge')?.textContent.trim(),'Centered category badge absent: '+id);
  cases.push({id:'native-preset-'+id,categories:count});
 }
 stop('all-preset-switches-zero-source-work');
 for(const id of ['ace','para','wuxing','gtd','eaccess','state']){await preset(id);await capture(id)}
 await preset('wuxing');
 const cycle=['wood','fire','earth','metal','water'],roles=['facets.relativeSame','facets.relativeGenerate','facets.relativeRegulate','facets.relativeRegulated','facets.relativeGenerated'];
 const originalBody=await app.vault.read(app.vault.getFileByPath(path('Memory')));
 const originalRelations=JSON.stringify(p.index.neighbours(p.index.get(path('Memory')),'child').map(page=>page.path).sort());
 for(const name of ['Concept','Method']){
  await focus(name);const phase=name==='Concept'?'wood':'metal';
  for(const candidate of cycle)check(region('wuxing',candidate)?.querySelector('.kplex-view-region-description')?.textContent===p.translator(roles[(cycle.indexOf(candidate)-cycle.indexOf(phase)+5)%5]),'Relative label differs: '+phase+' / '+candidate);
  check(root(host).querySelectorAll('.kplex-view-guide').length===10&&[...root(host).querySelectorAll('.kplex-view-guide')].every(element=>!element.hasAttribute('data-kplex-edge-id')&&doc.defaultView.getComputedStyle(element).pointerEvents==='none'),'Decorative cycles gained interaction authority');
  check(app.metadataCache.getFileCache(app.vault.getFileByPath(path(name))).frontmatter.phase===phase,'Focus changed stored phase');
 }
 check(await app.vault.read(app.vault.getFileByPath(path('Memory')))===originalBody&&JSON.stringify(p.index.neighbours(p.index.get(path('Memory')),'child').map(page=>page.path).sort())===originalRelations,'Relative perspective changed canonical relationships');
 cases.push({id:'wood-metal-relative-labels-preserve-stored-phases-and-canonical-evidence'});
 for(const name of ['Conflict','Unmapped']){await focus(name);for(const candidate of cycle)check(region('wuxing',candidate)?.querySelector('.kplex-view-region-description')?.textContent===p.translator('facets.relativeUnavailable'),'Unknown/conflicting focus claimed a relative role')}
 cases.push({id:'conflicting-unassigned-focus-no-assumed-relative-phase'});
 await focus('Concept');await action('selection.center');
 const before=await app.vault.read(app.vault.getFileByPath(path('Concept')));
 await action('node.assign-category',{assignmentId:JSON.stringify(['facets','wuxing','category','metal'])});
 const dialog=()=>[...doc.querySelectorAll('.modal')].find(element=>element.querySelector('.modal-title')?.textContent===p.translator('assignment.title'));
 await until(dialog,'Native category assignment preview absent');
 const apply=[...dialog().querySelectorAll('button')].find(button=>button.textContent===p.translator('assignment.apply'));check(apply,'Native Apply absent');apply.click();
 await until(()=>!dialog()&&app.metadataCache.getFileCache(app.vault.getFileByPath(path('Concept')))?.frontmatter.phase==='metal','Confirmed assignment did not converge');
 check((await app.vault.read(app.vault.getFileByPath(path('Concept')))).includes('Disposable Wu Xing native fixture.')&&await app.vault.read(app.vault.getFileByPath(path('Memory')))===originalBody,'Assignment changed unrelated content/source relationship');
 await action('view.property-assignment.undo');
 const undo=()=>[...doc.querySelectorAll('.modal')].find(element=>element.querySelector('.modal-title')?.textContent===p.translator('assignment.undo'));
 await until(undo,'Native Undo preview absent');[...undo().querySelectorAll('button')].find(button=>button.textContent===p.translator('assignment.undo')).click();
 await until(()=>!undo()&&app.metadataCache.getFileCache(app.vault.getFileByPath(path('Concept')))?.frontmatter.phase==='wood','Guarded Undo did not converge');
 check((await app.vault.read(app.vault.getFileByPath(path('Concept')))).split('---').slice(2).join('---')===before.split('---').slice(2).join('---'),'Assignment/Undo rewrote note body');
 cases.push({id:'native-property-preview-confirm-save-guarded-undo-preserves-body-and-source-relationships'});
 const rules=structuredClone(c.stateExample);rules.source='rules';rules.name='Native rule probe';
 for(const [id,rule]of Object.entries({seed:'note.phase == "water"',research:'this.phase == "water" and note.phase == "wood"',draft:'edge.role == "child" and note.phase == "fire"',published:'note.phase == "metal"'}))rules.categories[id].rule=rule;
 await configure(['state'],rules);await preset('state');await focus('Memory');
 check(region('state','research')?.textContent.includes('2 shown locally'),'Focus/candidate native rules did not classify two Wood notes');
 p.openSettings();const tab=p.settingsTab;await until(()=>tab.containerEl.isConnected,'Native Settings absent');
 for(const key of ['settings.ui.plex.behavior','view.wuxing']){check(tab.openSettingsPage(p.translator(key)),'Native Facets page absent');await wait(80)}
 const manage=[...doc.querySelectorAll('.setting-item')].find(row=>row.querySelector('.setting-item-name')?.textContent===p.translator('facets.manage')&&row.getBoundingClientRect().height>0);check(manage,'Native manager absent');(manage.querySelector('button')??manage).click();await until(()=>doc.querySelector('.kplex-style-manager-row'),'Preset library absent');
 [...doc.querySelectorAll('.kplex-style-manager-row')].find(row=>row.querySelector('.kplex-style-manager-name')?.textContent==='Native rule probe').click();
 await until(()=>doc.querySelector('.kplex-predicate-rule-editor textarea'),'Shared Code rule editor absent');
 const textarea=doc.querySelector('.kplex-predicate-rule-editor textarea'),save=()=>[...doc.querySelectorAll('.modal button')].find(button=>button.textContent===p.translator('common.save')&&button.getBoundingClientRect().height>0);
 const type=value=>{Object.getOwnPropertyDescriptor(doc.defaultView.HTMLTextAreaElement.prototype,'value').set.call(textarea,value);textarea.dispatchEvent(new doc.defaultView.Event('input',{bubbles:true}))};
 textarea.focus();type('not node.typo.exists()');await until(()=>save()?.disabled,'Invalid authored rule did not block native Save');check(doc.activeElement===textarea,'Validation stole native typing focus');
 type('note.phase == "water"');await until(()=>save()&&!save().disabled,'Corrected rule did not enable native Save');save().click();await p.settingsWriteQueue;app.setting.close();
 cases.push({id:'native-shared-rules-editor-focus-invalid-save-guard-and-correction'});
 await focus('Memory');
 for(const id of ['classic','mindmap','wuxing']){
  await choose(host,id);panel(host).querySelector('.kplex-filter-panel-header button').click();await wait(150);
  const beforeWander=center(host);await action('view.wander.start');await until(()=>root(host).querySelector('.kplex-wander-controls'),'Shared Wander controls absent: '+id);
  await until(()=>center(host)!==beforeWander,'Wander did not navigate through the current view: '+id);
  await action('view.wander.stop');await until(()=>!root(host).querySelector('.kplex-wander-controls'),'Shared Wander did not stop: '+id);cases.push({id:'native-wander-start-navigate-stop-'+id});
  await focus('Memory');
 }
 await preset('wuxing');
}
