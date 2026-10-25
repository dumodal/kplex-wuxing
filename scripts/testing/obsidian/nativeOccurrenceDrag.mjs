/** Bounded native HTML-drag proof in the caller's owned fixture. The temporary non-Classic definition has no editor, parser, writer or registry lifetime of its own. */
export async function acceptNativeOccurrenceDrag({app,p,c,host,compass,restores,path,root,session,nodes,act,check,wait,until,clickNative,drag,opened,cases,instance}) {
 const owner=session(host),registry=owner.registry,prior=owner.definition.id;
 const ids={r:path('P'),c:path('Q'),b:path('B')},child=p.settings.hierarchy.children[0];
 const definition={id:'test.native-occurrence-drag',version:1,labelKey:'Native occurrence proof',icon:'network',navigation:'rooted',capabilities:{sections:false,descendants:false,editor:false,compact:false},defaultState:null,restoreState:()=>null,
  project(input){const r=input.read.node(ids.r),other=input.read.node(ids.c),b=input.read.node(ids.b);if(!r||!other||!b)return null;
   const first=input.read.relations(r.id,'child').items.find(row=>row.node.id===b.id),second=input.read.relations(other.id,'child').items.find(row=>row.node.id===b.id);
   return{attention:input.attention,layoutRoot:r.id,entry:'r',frame:'r',coverage:'cached',truncated:false,occurrences:[
    {id:'r',nodeId:r.id,representation:'thought',ports:{top:'parent',bottom:'child'}},{id:'c',nodeId:other.id,representation:'thought',role:'child',ports:{top:'parent',bottom:'child'}},
    {id:'b-first',nodeId:b.id,representation:'thought',role:'child',relation:first,ports:{left:'parent',bottom:'child'}},{id:'b-second',nodeId:b.id,representation:'thought',role:'child',relation:second,ports:{left:'parent',bottom:'child'}}],
    edges:[...(first?[{id:'rb',kind:'semantic',source:'r',target:'b-first',sourceNode:r.id,targetNode:b.id,sourcePort:'bottom',targetPort:'left',relation:first}]:[]),...(second?[{id:'cb',kind:'semantic',source:'c',target:'b-second',sourceNode:other.id,targetNode:b.id,sourcePort:'bottom',targetPort:'left',relation:second}]:[])]};},
  layout(_projection,measurements){const points={r:[0,0],c:[-210,140],'b-first':[230,-120],'b-second':[230,140]};return{positions:new Map(measurements.map(row=>[row.id,{x:points[row.id][0],y:points[row.id][1],width:row.width,height:row.height}])),areas:[]};}};
 const captured=[],manager=app.dragManager,start=manager.onDragStart;
 manager.onDragStart=function(...args){const result=start.apply(this,args),source=this.draggable?.source;if(source?.kind==='kplex-node-link')captured.push({trusted:args[0].isTrusted,id:source.occurrence?.id,origin:source.occurrence?.relationship?.origin.identity,role:source.role});return result};
 restores.push(()=>{manager.onDragStart=start;owner.registry=registry});
 owner.registry=new registry.constructor([...registry.available,definition]);owner.select(definition.id);owner.setRoot(ids.r);
 await until(()=>nodes(host).filter(node=>node.dataset.kplexPath===ids.b).length===2&&!root(host).querySelector('.kplex-view-error'),'Two same-role native occurrences absent');await act(host,'view.fit');
 const node=id=>nodes(host).find(element=>element.dataset.kplexKeyboardId===id),file=id=>app.vault.getFileByPath(id);
 const identities=Object.values(ids).map(id=>({id,canonical:p.index.allPages().find(page=>page.path===id),file:file(id)}));
 check(identities.every(row=>row.canonical),'Published fixture endpoints absent');
 const beforeR=await app.vault.read(file(ids.r)),beforeC=await app.vault.read(file(ids.c)),beforeB=await app.vault.read(file(ids.b));
 const childrenBefore=structuredClone(app.metadataCache.getFileCache(file(ids.r)).frontmatter[child]);
 const count=opened.length;await drag(()=>node('b-second'),()=>node('r').querySelector('[data-kplex-gate="top"]'));
 await until(()=>opened.length===count+1&&opened[count].modal.modalEl.isConnected,'Second native occurrence did not open composer');
 const {modal,options}=opened[count],source=captured.at(-1);
 check(source?.trusted&&source.id==='b-second'&&source.origin===ids.c&&source.role==='child','Native HTML payload lost exact second occurrence/source');
 check(options.mode==='create'&&options.origin.path===ids.r&&options.fixedTarget.path===ids.b&&options.semanticRole==='parent'&&options.existingDirection===undefined,'Second occurrence borrowed first R→B relink authority');
 const parent=p.defaultOntologyField('parent');
 await until(()=>modal.modalEl.querySelector('.kplex-add-related-ontology-search input')?.value===parent&&typeof modal.submitCallback==='function','Canonical creation composer/ontology not ready');
 check(p.ontologyFieldsForRole('parent').some(field=>field.toLocaleLowerCase()===parent.toLocaleLowerCase()),'Parent ontology field unavailable');
 await until(()=>modal.modalEl.querySelector('button[data-kplex-primary-action="true"]')?.disabled===false,'Native additive save unavailable');await clickNative(()=>modal.modalEl.querySelector('button[data-kplex-primary-action="true"]'));
 await until(()=>!modal.modalEl.isConnected,'Native additive save did not settle');
 await until(()=>JSON.stringify(app.metadataCache.getFileCache(file(ids.r))?.frontmatter?.[parent]).includes('B'),'Added parent declaration absent');
 check(JSON.stringify(app.metadataCache.getFileCache(file(ids.r)).frontmatter[child])===JSON.stringify(childrenBefore),'Existing R→B child declaration was removed');
 const identityChecks=identities.map(({id,canonical,file:original})=>({id,canonicalRetained:p.index.allPages().find(page=>page.path===id)===canonical,currentReadIdentity:p.index.get(id)?.path===id&&p.index.get(id)?.file===original,nativeRetained:file(id)===original}));check(identityChecks.every(row=>row.canonicalRetained&&row.currentReadIdentity&&row.nativeRetained),'Native additive save replaced canonical/native identity: '+JSON.stringify(identityChecks));
 check(await app.vault.read(file(ids.c))===beforeC&&await app.vault.read(file(ids.b))===beforeB,'Native additive drop altered unrelated source/target notes');
 check((await app.vault.read(file(ids.r))).includes(beforeR.slice(beforeR.indexOf('# P'))),'Native additive drop altered the original body');
 cases.push({id:'trusted-native-second-occurrence-additive-save',sourceId:source.id,canonicalOriginMatched:true,mode:options.mode,canonicalAndNativeIdentityRetained:true,originalChildDeclarationRetained:true,otherSourceBytesRetained:true,targetBytesRetained:true});
 owner.select(prior);owner.registry=registry;owner.setRoot(path('R'));await until(()=>owner.definition.id==='mindmap'&&node('root'),'Production Mind Map did not restore');await act(host,'view.fit');
 await until(()=>!p.index.hasPendingSemanticPreparation()&&!p.index.hasActiveSemanticPreparation(),'Native additive source maintenance did not settle');
 const expanded=await act(host,'editor.expand',undefined,{kind:'explicit',node:{identity:path('R'),path:path('R'),kind:'file'},occurrenceId:'root'});check(expanded.status==='completed','Native text-drop editor unavailable');
 await until(()=>instance(host)?.view.editor&&root(host).querySelector('.kplex-central-editor-overlay .cm-content'),'Native source editor absent');
 const leaf=instance(host),editor=leaf.view.editor,before=editor.getValue(),binding=owner.editors.bindings[0].id;
 const bodyLine=()=>[...root(host).querySelectorAll('.kplex-central-editor-overlay .cm-line')].find(line=>line.textContent.includes('# R'));
 await until(bodyLine,'Owned Markdown body line absent');await clickNative(bodyLine);
 await drag(()=>root(compass).querySelector('.kplex-role-center'),bodyLine);
 await until(()=>editor.getValue()!==before,'Native text drop did not reach CodeMirror');
 check(instance(host)===leaf&&owner.editors.bindings[0].id===binding&&owner.layoutRoot(path('C'))===path('R'),'Native text drop retargeted root/editor');
 const after=editor.getValue();check(after.includes('C'),'Native source did not insert its captured C link');
 const closed=await act(host,'editor.collapse');check(closed.status==='completed','Native text-drop save/collapse failed');
 check(await app.vault.read(file(path('R')))===after,'Native text-drop edits were not durably saved');
 cases.push({id:'trusted-native-occurrence-editor-text-drop',sameNativeInstance:true,sameBinding:true,rootRetained:true,durableSave:true});
}
