/** Narrow exact-build Windows input acceptance. The shared disposable controller owns every
 * fixture, native window, settings write and restoration; this is not the full regression lane. */
export async function acceptViewInteractions222(x){
 const {app,p,c,host,native,workspace,files,releases,restores,cases,path,root,center,check,wait,until,choose,panel,reveal}=x;
 const doc=root(host).ownerDocument,session=host.view.documentSession.plexView;
 const surface=()=>[...p.actionSurfaceHosts].find(([,entry])=>entry.leaf===host)?.[0];
 const action=(id,args)=>p.actionManager.dispatch({id,source:'internal',surfaceId:surface(),...(args?{args}:{})});
 const selected=()=>p.actionManager.readSnapshot(surface())?.selected;
 const card=name=>[...root(host).querySelectorAll('.kplex-thought:not(.is-kplex-section)')].find(el=>el.dataset.kplexPath===path(name));
 const click=async element=>{check(element?.isConnected,'Native interaction target absent');element.scrollIntoView({block:'nearest'});
  const r=element.getBoundingClientRect(),x=Math.round(r.x+r.width/2),y=Math.round(r.y+r.height/2),hit=doc.elementFromPoint(x,y);
  check(hit&&element.contains(hit),'Native interaction target obscured: '+element.className);
  for(const type of ['mouseDown','mouseUp'])native.webContents.sendInputEvent({type,x,y,button:'left',clickCount:1});await wait(150);};
 const key=async(keyCode,modifiers=[])=>{for(const type of ['keyDown','keyUp'])native.webContents.sendInputEvent({type,keyCode,modifiers});await wait(160);};
 const selectView=async id=>{await choose(host,id);panel(host).querySelector('.kplex-filter-panel-header button').click();await reveal(host);};
 const destination=async name=>{const node={identity:path(name),kind:'file',path:path(name)};
  const result=await p.actionManager.dispatch({id:'node.activate',source:'internal',surfaceId:surface(),target:{kind:'explicit',node},args:{intent:'destination'}});
  check(result.status==='completed','Existing destination admission refused '+name);await until(()=>center(host)===path(name),'Destination did not center');};
 check(!doc.querySelector('.modal')&&!app.setting.isOpen,'User-owned modal must remain untouched');
 const child=p.settings.hierarchy.children[0],concept=app.vault.getFileByPath(path('Concept'));
 const leaf=await app.vault.create(path('Input Leaf'),'---\nphase: metal\n---\n# Input Leaf\n\nOwned input fixture.\n');files.push(leaf);p.index.insertCreatedFile(leaf);releases.push(p.index.acquireSemanticDemand(leaf.path));
 await app.vault.process(concept,body=>body.replace('---\n','---\n'+JSON.stringify(child)+': '+JSON.stringify(['[['+leaf.path+']]'])+'\n'));
 await until(()=>p.index.neighbours(p.index.get(concept.path),'child').some(row=>row.page.path===leaf.path)&&!p.index.hasActiveSemanticPreparation(),'Owned branch incidence did not settle');
 await p.updateCanvasViewSetting('mindmap','initialGenerations',1);
 await selectView('mindmap');await until(()=>card('Concept')?.querySelector('.is-branch-disclosure'),'Branch disclosure absent');
 const rootBefore=session.layoutRoot(path('Memory'));
 await action('view.fit');await wait(120);await click(card('Concept').querySelector('.is-branch-disclosure'));
 await until(()=>card('Input Leaf'),'Disclosure did not expand child');
 check(center(host)===path('Memory')&&session.layoutRoot(path('Memory'))===rootBefore,'Disclosure changed root/attention');
 await click(card('Concept').querySelector('.is-branch-disclosure'));await until(()=>!card('Input Leaf'),'Disclosure did not fold child');
 cases.push({id:'native-disclosure-only-folds-without-root-or-attention-change'});
 await action('view.fit');await wait(120);await click(card('Concept'));
 await until(()=>center(host)===concept.path&&session.layoutRoot(concept.path)===concept.path,'Plain body click did not center/reroot');
 cases.push({id:'native-plain-body-click-uses-accepted-root-navigation'});
 await destination('Memory');await until(()=>card('Concept'),'Memory children absent');
 for(const modifier of ['shift','control','alt']){
  await action('selection.center');await action('graph.focus');await key('Right');
  check(selected()?.node.path!==path('Memory')&&selected()?.occurrenceId,'Plain arrow did not leave center');
  // A root selection provides a stable canonical fold target across inherited branch state.
  await action('selection.center');const before=session.state.collapsed.includes('root');await key('Enter',[modifier]);
  await until(()=>session.state.collapsed.includes('root')!==before,'Modified Enter did not toggle root: '+modifier);
  check(center(host)===path('Memory')&&session.layoutRoot(path('Memory'))===path('Memory'),'Modified Enter centered another note');
  await key('Enter',[modifier]);await until(()=>session.state.collapsed.includes('root')===before,'Modified Enter did not restore root fold: '+modifier);
  cases.push({id:'native-modified-enter-folds-without-centering',modifier});
 }
 await action('selection.center');await action('graph.focus');await key('Right');const picked=selected()?.node.path;
 check(picked&&picked!==path('Memory'),'Plain arrow selected no destination');await key('Enter');
 await until(()=>center(host)===picked&&session.layoutRoot(picked)===picked,'Plain Enter did not center selected note');
 await action('selection.center');await action('graph.focus');await key('Enter');check(!doc.querySelector('.modal'),'Enter on center opened Rename');
 cases.push({id:'native-plain-arrows-and-enter-center-no-rename'});
 await destination('Memory');await until(()=>card('Concept')?.querySelector('.is-branch-disclosure'),'Editor branch absent');
 if(!card('Input Leaf')){await action('view.fit');await wait(120);await click(card('Concept').querySelector('.is-branch-disclosure'));await until(()=>card('Input Leaf'),'Editor child absent');}
 await action('view.fit');await wait(120);await click(card('Concept').querySelector('.kplex-thought-corner-action'));
 await until(()=>session.editors.bindings.length===1&&root(host).querySelector('.kplex-central-editor-content .cm-content'),'Actual native editor did not open');
 const content=root(host).querySelector('.kplex-central-editor-content .cm-content');content.focus();
 await until(()=>workspace.activeLeaf?.view.file?.path===concept.path,'Native editor document focus absent');
 const editorLeaf=workspace.activeLeaf,editor=editorLeaf.view.editor,binding=session.editors.bindings[0];
 editor.setCursor(editor.lastLine(),editor.getLine(editor.lastLine()).length);await native.webContents.insertText('Kplex-222-input-editor-marker');
 await until(()=>editor.getValue().includes('Kplex-222-input-editor-marker'),'Native typed content absent');
 const value=editor.getValue(),cursor=JSON.stringify(editor.getCursor());await action('view.fit');await wait(120);await click(card('Input Leaf'));
 const facts={sameEditor:editorLeaf.view.editor===editor,sameContent:editor.getValue()===value,sameCursor:JSON.stringify(editor.getCursor())===cursor,
  sameBinding:session.editors.bindings[0]?.id===binding.id,sameRoot:session.layoutRoot(path('Memory'))===path('Memory'),sameAttention:center(host)===path('Memory')};
 c.progress={...c.progress,editorRerootGuard:facts};check(Object.values(facts).every(Boolean),'Click reroot disturbed live native editor: '+JSON.stringify(facts));
 check((await action('editor.collapse',{bindingId:binding.id})).status==='completed','Native editor collapse/save failed');
 await until(()=>!session.editors.bindings.length&&!root(host).querySelector('.kplex-central-editor-content'),'Native editor cleanup incomplete');
 check((await app.vault.read(concept)).includes('Kplex-222-input-editor-marker'),'Native editor save lost content');
 await reveal(host);await action('view.fit');await wait(120);await click(card('Input Leaf'));
 await until(()=>center(host)===leaf.path&&session.layoutRoot(leaf.path)===leaf.path,'Click after editor cleanup did not reroot');
 cases.push({id:'native-click-reroot-editor-identity-content-caret-save-guard-and-cleanup',facts});
 for(const id of ['classic','wuxing']){
  await destination('Memory');await selectView(id);await action('selection.center');await action('graph.focus');await key(id==='classic'?'Down':'Right');
  check(selected()?.node.path&&selected().node.path!==path('Memory'),'Plain arrow did not cross area in '+id);const target=selected().node.path;await key('Enter');
  await until(()=>center(host)===target,'Enter did not center in '+id);check(!doc.querySelector('.modal'),'Plain Enter opened modal in '+id);
  cases.push({id:'native-plain-arrow-and-enter-center-view',view:id});
 }
 await destination('Memory');await selectView('classic');await action('selection.center');await action('graph.focus');await key('Enter',['shift']);
 await until(()=>root(host).querySelector('.is-kplex-section'),'Modified Enter did not delegate supported Compass sections');
 await key('Enter',['shift']);await until(()=>!root(host).querySelector('.is-kplex-section'),'Modified Enter did not fold Compass sections');
 cases.push({id:'native-modified-enter-reuses-central-markdown-section-owner'});
 await action('graph.focus');await key('Enter');check(!doc.querySelector('.modal'),'Center Enter renamed Compass');
 cases.push({id:'native-current-compass-center-enter-no-rename'});
 restores.push(()=>{check(!session.editors.bindings.length,'Owned editor survived acceptance');});
}
