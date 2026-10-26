/** Exact-build maintainer UX acceptance in disposable Small. The existing native controller
 * owns fixtures, input, settings, captures and unconditional restoration. Clipboard is untouched. */
export async function acceptFacets222UX(x){
 const {app,p,c,host,native,workspace,files,releases,restores,cases,path,root,center,check,wait,until,choose,panel,quiet,reveal}=x;
 const doc=root(host).ownerDocument,t=p.translator,session=host.view.documentSession.plexView;
 const settingsDoc=()=>p.settingsTab?.containerEl?.ownerDocument??doc;
 const button=(element,label)=>[...element.querySelectorAll('button')].find(el=>el.getAttribute('aria-label')===label||el.textContent===label);
 const field=(element,label)=>[...element.querySelectorAll('.setting-item')].find(row=>row.querySelector('.setting-item-name')?.textContent===label)?.querySelector('input,select,textarea');
 const editor=()=>settingsDoc().querySelector('.kplex-facet-preset-editor');
 const transfer=()=>settingsDoc().querySelector('.kplex-portable-package-modal');
 const manager=()=>[...settingsDoc().querySelectorAll('.modal')].find(el=>el.querySelector('.kplex-style-manager-row'));
 const change=(input,value)=>{check(input,'Native field absent');input.value=value;input.dispatchEvent(new input.ownerDocument.defaultView.Event(input.tagName==='SELECT'?'change':'input',{bubbles:true}));};
 /** Trusted native pointer input targets the real current element, never a stale coordinate. */
 const click=async element=>{check(element?.isConnected,'Native click target absent');element.scrollIntoView({block:'nearest'});const r=element.getBoundingClientRect();
  const owner=element.ownerDocument.defaultView.require('@electron/remote').getCurrentWindow();owner.restore();owner.show();owner.focus();owner.webContents.focus();await until(()=>element.ownerDocument.hasFocus(),'Invoking dialog focus absent');for(const type of ['mouseDown','mouseUp'])owner.webContents.sendInputEvent({type,x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2),button:'left',clickCount:1});await wait(120);};
 const key=async(keyCode,modifiers=[],owner=doc)=>{const contents=owner.defaultView.require('@electron/remote').getCurrentWindow().webContents;for(const type of ['keyDown','keyUp'])contents.sendInputEvent({type,keyCode,modifiers});await wait(160);};
 const action=async id=>{const surface=[...p.actionSurfaceHosts].find(([,entry])=>entry.leaf===host)?.[0];check(surface,'Native action surface absent');return p.actionManager.dispatch({id,source:'internal',surfaceId:surface});};
 const selected=()=>{const surface=[...p.actionSurfaceHosts].find(([,entry])=>entry.leaf===host)?.[0];return p.actionManager.readSnapshot(surface)?.selected;};
 /** Captures contain only this controller's generated notes and owned settings dialogs. */
 const capture=async(name,element)=>{const r=element.getBoundingClientRect();require('node:fs').writeFileSync(c.screenshotPrefix+'-ux-'+name+'.png',(await element.ownerDocument.defaultView.require('@electron/remote').getCurrentWindow().webContents.capturePage({x:Math.max(0,Math.ceil(r.x)),y:Math.max(0,Math.ceil(r.y)),width:Math.floor(r.width),height:Math.floor(r.height)})).toPNG());};
 const close=async element=>{const cancel=button(element,t('common.cancel'))??button(element,t('styles.operation.close'));if(cancel)await click(cancel);else await key('Escape',[],element.ownerDocument);await until(()=>!element.isConnected,'Owned dialog did not close');};
 restores.push(async()=>{for(let i=0;i<10;i++){const owned=[...settingsDoc().querySelectorAll('.kplex-markdown-help-modal,.kplex-portable-package-modal,.kplex-facet-preset-editor,.kplex-style-manager-modal')].at(-1);if(!owned)break;await close(owned);}if(app.setting.isOpen)app.setting.close();});
 check(!app.setting.isOpen&&!doc.querySelector('.modal'),'User-owned modal/settings must not be touched');
 await choose(host,'wuxing');
 for(const width of [1280,640]){
  native.setBounds({...native.getBounds(),width,height:900});await wait(250);
  if(!panel(host))await choose(host,'wuxing');
  const group=panel(host).querySelector('[data-kplex-view-choice="preset"]'),rects=[group.querySelector('select'),...group.querySelectorAll('button')].map(el=>el.getBoundingClientRect());
  check(!panel(host).querySelector('[data-kplex-view-choice="layout"]'),'Retired layout selector is still exposed');
  check(rects.length===3&&rects.every(r=>Math.abs(r.bottom-rects[0].bottom)<3)&&rects[2].width<50,'Preset/cog/Info split or Info stretched');
  await capture('selectors-'+width,panel(host));cases.push({id:'native-preset-controls-travel-together',windowWidth:width,controlWidths:rects.map(r=>r.width)});
 }
 native.setBounds({...native.getBounds(),width:1280,height:900});await wait(200);
 await click(panel(host).querySelector('[data-kplex-view-choice="preset"] button'));await until(editor,'Preset cog did not open editor');
 const form=editor(),settingsWindow=form.ownerDocument.defaultView.require('@electron/remote').getCurrentWindow(),settingsBounds=settingsWindow.getBounds();let restoredBounds=false;
 const restoreSettingsBounds=()=>{if(!restoredBounds&&!settingsWindow.isDestroyed())settingsWindow.setBounds(settingsBounds);restoredBounds=true};restores.push(restoreSettingsBounds);
 settingsWindow.restore();settingsWindow.setBounds({...settingsBounds,width:1280,height:900});await wait(250);
 const footer=form.querySelector('.kplex-style-editor-actions'),buttons=[...footer.querySelectorAll('button')];
 c.progress={...c.progress,uxEditor:{width:form.getBoundingClientRect().width,height:form.getBoundingClientRect().height,ownerWidth:form.ownerDocument.defaultView.innerWidth,mainWidth:doc.defaultView.innerWidth,sameDocument:form.ownerDocument===doc,computedWidth:form.ownerDocument.defaultView.getComputedStyle(form).width,computedMaximum:form.ownerDocument.defaultView.getComputedStyle(form).maxWidth}};await capture('preset-diagnostic',form);
 check(form.getBoundingClientRect().width>=900,'Preset editor is unnecessarily narrow '+JSON.stringify(c.progress.uxEditor));
 check(footer.querySelectorAll('.setting-item').length===1&&buttons.length>=7,'Preset actions do not share one row');
 const tops=buttons.map(el=>Math.round(el.getBoundingClientRect().top));check(Math.max(...tops)-Math.min(...tops)<3,'Wide-screen footer wrapped');
 check(buttons.every(el=>el.getAttribute('aria-label')&&el.querySelector('svg')&&!el.hasAttribute('title')),'Icon/name/tooltip contract failed');
 await capture('preset-editor',form);cases.push({id:'native-wide-preset-editor-single-icon-row',width:form.getBoundingClientRect().width,buttons:buttons.length});
 const before=JSON.stringify(p.readPortableSharingState().presets.wuxing),attention=center(host);
 await wait(300);const stop=quiet();
 change(field(form,t('facets.layout')),'concentric');
 check(field(form,t('facets.layout')).value==='concentric'&&JSON.stringify(p.readPortableSharingState().presets.wuxing)===before,'Unsaved layout changed accepted configuration');
 await click(button(form,t('facets.restore')));check(form.textContent.includes(t('facets.resetStatus'))&&field(form,t('facets.layout')).value==='circular','Reset has no visible feedback or wrong defaults');
 change(field(form,t('facets.layout')),'vertical');
 // Native Save opens an OS picker that blocks CLI transport. Complete that separate
 // check through Computer Use, outside this CLI-controlled transaction. Browser tests
 // retain exact bytes/URL cleanup/clipboard fulfillment; this case claims controls only.
 check(button(form,t('sharing.copyJson'))&&button(form,t('sharing.download')),'Direct JSON actions absent');
 cases.push({id:'native-draft-json-actions-present',nativeFileCompletionVerified:false,clipboardAccessed:false});
 await click(button(form,t('common.save')));await until(()=>!form.isConnected&&p.readPortableSharingState().presets.wuxing.layout==='vertical','Preset layout Save did not publish');
 check(center(host)===attention,'Saving layout changed attention');stop('native-preset-draft-reset-save-zero-source-work');
 await click(button(manager(),t('sharing.importPreset')));await until(transfer,'Import dialog absent');
 const incoming=transfer(),source=incoming.querySelector('textarea');check(source.placeholder===t('sharing.pasteHint')&&incoming.querySelector('input[type=file]'),'Import inputs are unexplained/missing');
 check(incoming.querySelectorAll('.kplex-style-editor-actions .setting-item').length===1&&button(incoming,t('sharing.apply')).disabled,'Import footer or review guard failed');
 const body=incoming.querySelector('.kplex-style-editor-body');check(body.scrollHeight<=body.clientHeight+2,'Empty import scrolls unnecessarily on a large screen');
 await capture('import-empty',incoming);const guideStop=quiet();await click(incoming.querySelector('.kplex-package-intro button'));
 await until(()=>settingsDoc().querySelector('.kplex-markdown-help-modal h2'),'Native format guide did not render');const guide=settingsDoc().querySelector('.kplex-markdown-help-modal');
 check(guide.querySelector('.modal-title')?.textContent===t('sharing.formatHelp'),'Standalone format guidance title was wrapped as a preset name');
 check(guide.querySelector('a[href="https://github.com/zsviczian/kplex/blob/main/docs/PORTABLE_PRESETS.md"]')&&!button(guide,t('view.editHelp')),'Format guide lacks reference or falsely offers preset editing');
 await capture('format-help',guide);await close(guide);guideStop('native-import-format-help-zero-source-work');
 await close(incoming);await close(manager());restoreSettingsBounds();if(app.setting.isOpen)app.setting.close();await wait(250);
 cases.push({id:'native-import-paste-file-guidance-single-footer-and-readonly-help'});
 // Real incremental note edits are outside zero-work presentation intervals.
 const child=p.settings.hierarchy.children[0],parents=[];
 for(let i=0;i<3;i++){
  const leaf=await app.vault.create(path('Outward '+i),'# Disposable outward child\n');files.push(leaf);p.index.insertCreatedFile(leaf);releases.push(p.index.acquireSemanticDemand(leaf.path));
  const body='---\n'+JSON.stringify(child)+': '+JSON.stringify(['[['+path('Memory')+']]','[['+leaf.path+']]'])+'\n---\n# Disposable parent\n';
  const parent=await app.vault.create(path('Parent '+i),body);files.push(parent);parents.push(parent);p.index.insertCreatedFile(parent);releases.push(p.index.acquireSemanticDemand(parent.path));
 }
 await until(()=>p.index.neighbours(p.index.get(path('Memory')),'parent').length>=3&&!p.index.hasActiveSemanticPreparation(),'Owned parent incidence did not settle');
 await choose(host,'mindmap');panel(host).querySelector('.kplex-filter-panel-header button').click();session.setAreaHeight('parentHeight',800);await reveal(host);
 const card=name=>[...root(host).querySelectorAll('.kplex-thought')].find(el=>el.dataset.kplexPath===path(name)&&!el.querySelector('.kplex-reference-label'));
 await until(()=>parents.every((_,i)=>card('Parent '+i)),'Native parent occurrences absent');
 await action('selection.center');await action('graph.focus');await key('Up',['alt']);await key('Right');
 check(selected()?.node.path?.includes('/Parent '),'Native arrow selection did not enter a parent');
 const picked=selected().node.path,initialRoot=session.layoutRoot(path('Memory'));await key('Enter');await until(()=>session.state.expanded.includes(selected()?.occurrenceId),'Enter did not expand selected parent');
 await key('Enter');await until(()=>session.state.collapsed.includes(selected()?.occurrenceId),'Enter did not fold selected parent');
 check(center(host)===path('Memory')&&session.layoutRoot(path('Memory'))===initialRoot&&selected().node.path===picked,'Enter changed root/attention/selection');cases.push({id:'native-arrow-selected-enter-fold-unfold-no-navigation'});
 for(let i=0;i<3;i++){await click(card('Parent '+i));await until(()=>card('Outward '+i),'Parent did not expand');}
 for(const columns of [1,2,3]){
  await wait(250);const columnsStop=quiet();await p.updateCanvasViewSetting('mindmap','parentColumns',columns);await wait(250);columnsStop('native-parent-columns-'+columns+'-zero-source-work');
  for(let i=0;i<3;i++){const a=card('Parent '+i).getBoundingClientRect(),b=card('Outward '+i).getBoundingClientRect(),direction=columns>1&&i%columns===0?-1:1;
   check(Math.sign(b.x+b.width/2-a.x-a.width/2)===direction,'Native parent column expanded inward: '+columns+'/'+i);}
  cases.push({id:'native-parent-column-outward-directions',columns});
 }
 await action('view.fit');await capture('mindmap-parent-columns',root(host).querySelector('.kplex-plex'));
 // The root does not consume a non-root scope. Eight admitted branch scopes can therefore
 // expose depth9; host admission must preserve that card without enlarging source demand.
 await wait(250);const depthSettingStop=quiet();await p.updateCanvasViewSetting('mindmap','maximumDepth',20);await wait(160);
 depthSettingStop('native-depth-configuration-zero-source-work');
 const depthFiles=[];
 for(let i=0;i<=10;i++){
  const yaml=JSON.stringify(child)+': '+JSON.stringify(i<10?['[['+path('Depth '+(i+1))+']]']:[]);
  const file=await app.vault.create(path('Depth '+i),'---\n'+yaml+'\n---\n# Disposable depth fixture\n');
  files.push(file);depthFiles.push(file);p.index.insertCreatedFile(file);releases.push(p.index.acquireSemanticDemand(file.path));
 }
 await until(()=>depthFiles.every(file=>app.metadataCache.getFileCache(file))&&!p.index.hasActiveSemanticPreparation()
  &&depthFiles.slice(0,-1).every((file,i)=>{const page=p.index.get(file.path);return page&&p.index.neighbours(page,'child').some(row=>row.page.path===depthFiles[i+1].path)}),'Canonical depth chain did not settle');
 session.setRoot(path('Depth 0'));p.notifyNavigation(path('Depth 0'),host);await until(()=>card('Depth 1')&&center(host)===path('Depth 0'),'Depth root did not render');
 for(let i=1;i<=8;i++){
  await action('view.fit');await wait(80);await click(card('Depth '+i));
  await until(()=>card('Depth '+(i+1))||root(host).querySelector('.kplex-view-error'),'Expanded depth frontier did not settle');
  check(!root(host).querySelector('.kplex-view-error')&&card('Depth '+(i+1)),'Deep bounded branch invalidated the entire view at '+(i+1));
 }
 check(card('Depth 9')&&!card('Depth 10'),'Ninth-depth admission changed the bounded frontier');
 cases.push({id:'native-mindmap-depth-nine-admission',configuredMaximumDepth:20});
 await action('view.fit');await wait(80);await click(card('Depth 9'));await wait(200);
 check(card('Depth 9')&&!card('Depth 10')&&!root(host).querySelector('.kplex-view-error')
  &&center(host)===path('Depth 0')&&session.layoutRoot(path('Depth 0'))===path('Depth 0'),'Existing eight-scope limit broke the view or changed navigation');
 cases.push({id:'native-mindmap-eight-scope-limit-retains-visible-frontier'});
 await action('view.fit');await capture('mindmap-depth-frontier',root(host).querySelector('.kplex-plex'));
}
