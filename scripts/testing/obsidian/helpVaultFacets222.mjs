/** Render an exact public Help checkpoint through production native views in the existing
 * disposable controller. The caller supplies a frozen Markdown/config snapshot and owns all
 * fixtures, settings, window, native leaves and unconditional outer restoration. */
export async function acceptHelpVaultFacets222(x) {
  const {app,p,c,host,native,files,releases,restores,cases,path,root,center,check,wait,until,choose,panel}=x;
  const payload=c.helpVault,doc=root(host).ownerDocument,session=host.view.documentSession.plexView;
  check(payload?.repository==='zsviczian/kplex-help'&&/^[a-f0-9]{40}$/.test(payload.commit),'Exact public Help checkpoint required');
  check(JSON.stringify(p.settings.hierarchy)===JSON.stringify(payload.hierarchy)&&p.settings.noteTypeField===payload.noteTypeField,'Disposable ontology must match Help');
  const byPath=new Map(payload.notes.map(note=>[note.path.replace(/\.md$/,''),note])),byName=new Map(payload.notes.map(note=>[note.name,note]));
  check(byName.size===payload.notes.length&&payload.notes.length<250,'Bounded uniquely named Help snapshot required');
  const owned=note=>path(note.name),refs=new Map();
  /** Rewrite only known fixture links so each copy resolves to its owned canonical target. */
  const copyText=text=>text.replace(/\[\[([^\]]+)\]\]/g,(original,content)=>{
    const split=content.indexOf('|'),link=split<0?content:content.slice(0,split),caption=split<0?'':content.slice(split),hash=link.indexOf('#');
    const key=(hash<0?link:link.slice(0,hash)).replace(/\.md$/,'').trim(),section=hash<0?'':link.slice(hash),target=byPath.get(key)??byName.get(key);
    return target?'[['+owned(target).replace(/\.md$/,'')+section+caption+']]':original;
  });
  for(const note of payload.notes){const file=await app.vault.create(owned(note),copyText(note.text));files.push(file);refs.set(note.path.replace(/\.md$/,''),file);p.index.insertCreatedFile(file);releases.push(p.index.acquireSemanticDemand(file.path));}
  await until(()=>[...refs.values()].every(file=>app.metadataCache.getFileCache(file))&&!p.index.hasActiveSemanticPreparation(),'Help fixture metadata did not settle',60000);
  p.settings.renderAlias=payload.renderAlias;p.settings.nameFields=payload.nameFields;
  p.settings.canvasViewSettings=structuredClone(payload.canvasViewSettings);await p.saveSettings(false,false);p.index.notifyPresentation();
  /** Keep every modal opened by this scenario under its exact cleanup lifetime. */
  const closeModals=async()=>{for(let i=0;i<8&&doc.querySelector('.modal');i++){doc.querySelectorAll('.modal-close-button').item(doc.querySelectorAll('.modal-close-button').length-1)?.click();await wait(70);}if(app.setting.isOpen)app.setting.close();};
  restores.push(closeModals);
  const screenshot=async name=>{await wait(180);const r=root(host).querySelector('.kplex-plex').getBoundingClientRect();require('node:fs').writeFileSync(c.screenshotPrefix+'-help-'+name+'.png',(await native.webContents.capturePage({x:Math.ceil(r.x),y:Math.ceil(r.y),width:Math.floor(r.width),height:Math.floor(r.height)})).toPNG());};
  const captureModal=async name=>{await wait(140);const r=doc.querySelector('.modal').getBoundingClientRect();require('node:fs').writeFileSync(c.screenshotPrefix+'-help-'+name+'.png',(await native.webContents.capturePage({x:Math.ceil(r.x),y:Math.ceil(r.y),width:Math.floor(r.width),height:Math.floor(r.height)})).toPNG());};
  const card=note=>[...root(host).querySelectorAll('.kplex-thought')].find(el=>el.dataset.kplexPath===owned(note));
  for(const demo of payload.demos){
    const target=refs.get(demo.center);check(target,'Help center missing');p.notifyNavigation(target.path,host);await until(()=>center(host)===target.path,'Help attention absent');
    await choose(host,'wuxing');const select=panel(host).querySelector('[data-kplex-view-choice="preset"] select');check(select,'Shared preset selector absent');
    check(JSON.stringify([...select.options].map(option=>option.value))===JSON.stringify(payload.selectable),'Unused presets remain in Help selector');
    select.value=demo.preset;select.dispatchEvent(new doc.defaultView.Event('change',{bubbles:true}));await until(()=>session.state?.preset===demo.preset&&!root(host).querySelector('.kplex-view-error'),'Help preset did not render');panel(host).querySelector('.kplex-filter-panel-header button').click();
    await until(()=>Object.entries(demo.membership).every(([source,expected])=>{const note=byPath.get(source),el=note&&card(note);if(!el)return false;if(source===demo.center)return expected.status!=='assigned'||Boolean(el.querySelector('.kplex-node-badge'));const area=[...el.closest('.kplex-zone-panel')?.classList??[]].find(name=>name.startsWith('kplex-zone-')&&name!=='kplex-zone-panel');const definition=payload.canvasViewSettings.wuxing.values.presets[demo.preset];return area?.slice('kplex-zone-'.length)===JSON.stringify(expected.status==='assigned'?['facets',demo.preset,'category',expected.category]:definition.diagnostics.combined?['facets',demo.preset,'diagnostics']:['facets',demo.preset,'status',expected.status]);}),'Actual native classification differs from production classifier for '+demo.preset,30000);
    const surface=[...p.actionSurfaceHosts].find(([,entry])=>entry.leaf===host)?.[0];await p.actionManager.dispatch({id:'view.fit',source:'internal',surfaceId:surface});await screenshot(demo.preset);
    cases.push({id:'native-help-facets-classification-and-canvas',preset:demo.preset,source:demo.source,layout:demo.layout,classified:Object.keys(demo.membership).length});
    if(demo.preset==='help-workshop'){
      root(host).querySelector('.kplex-filter-trigger').click();await until(()=>panel(host),'Preset Help panel absent');panel(host).querySelector('[data-kplex-view-choice="preset"]').querySelectorAll('button')[1].click();
      await until(()=>doc.querySelector('.kplex-markdown-help-modal h1'),'Real preset Help absent');await captureModal('preset-help');
      const edit=[...doc.querySelector('.kplex-markdown-help-modal').querySelectorAll('button')].find(button=>button.textContent===p.translator('view.editHelp'));check(edit,'Existing Edit help missing');edit.click();
      await until(()=>doc.querySelector('.kplex-facet-help-settings')?.closest('.modal'),'Native preset editor absent');await captureModal('preset-editor');await closeModals();
      if(panel(host))panel(host).querySelector('.kplex-filter-panel-header button').click();cases.push({id:'native-help-preset-help-and-editor-captured-without-saving'});
    }
  }
  const tooMany=[];
  for(const [source,file]of refs){const page=p.index.get(file.path),children=p.index.neighbours(page,'child');if(children.length>12)tooMany.push({source,children:children.map(row=>row.page.path.startsWith(file.parent.path+'/')?row.page.path.slice(file.parent.path.length+1):row.page.path)});}
  c.progress={...c.progress,helpCanonicalChildren:{checked:refs.size,tooMany}};check(!tooMany.length,'Native Help child count exceeds12: '+JSON.stringify(tooMany));
  cases.push({id:'native-help-canonical-child-budget',checked:refs.size,maximum:12});
  const mind=refs.get('09 Showcase examples/Example - Workshop plan');if(mind){p.notifyNavigation(mind.path,host);await until(()=>center(host)===mind.path,'Workshop plan absent');await choose(host,'mindmap');panel(host).querySelector('.kplex-filter-panel-header button').click();await wait(180);const surface=[...p.actionSurfaceHosts].find(([,entry])=>entry.leaf===host)?.[0];await p.actionManager.dispatch({id:'view.fit',source:'internal',surfaceId:surface});await screenshot('mindmap-workshop');cases.push({id:'native-help-mindmap-canvas-captured'});}
}
