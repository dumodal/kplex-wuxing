/**
 * Shared test-owned native URL graph fixture. Runs only inside an explicit Obsidian CLI controller,
 * uses real files/parser/compiler/cache and the installed GraphIndex, and isolates persistent cache
 * naming from the actual vault. Owns its note, database, wrappers and selected-window geometry.
 */

/** Set up an isolated actual index; close must run even when scenario assertions fail. */
export async function nativeUrlFixture(app,text,controller) {
  const p=app.plugins.plugins['k-plex'],path='__kplex-153-url-probe.md',namespace='__kplex153_url_'+Date.now();
  /** Fail into caller-owned cleanup instead of weakening any production lifetime. */
  const check=(value,message)=>{if(!value)throw Error(message);};
  check(p&&p.getIndexStatus().upToDate,'Existing plugin must be ready');
  check(app.vault.getMarkdownFiles().length<1000,'Use the small functional vault');
  check(!app.vault.getFileByPath(path),'Owned URL note already exists');
  const remote=require('@electron/remote'),win=remote.getCurrentWindow();
  const previous={bounds:win.getBounds(),maximized:win.isMaximized(),minimized:win.isMinimized()};
  remote.app.show?.();remote.app.focus({steal:true});win.restore();win.show();win.moveTop();win.focus();
  let file,index,cache,active=false;
  const operations={reads:0,parses:0};
  /** Dispatch actual native tasks while retaining a controller cancellation boundary. */
  const delay=ms=>new Promise(/** Own just this setup wait. */ resolve=>window.setTimeout(resolve,ms));
  /** Setup polling has its own deadline and cannot outlive outer cancellation. */
  const until=async(predicate)=>{const end=performance.now()+60_000;while(!predicate()){check(!controller.closed&&performance.now()<end,'Native setup deadline');await delay(50);}};
  /** Record focus/throttling without changing Electron's background policy. */
  const foreground=()=>({hidden:document.hidden,documentFocused:document.hasFocus(),windowFocused:win.isFocused(),throttling:win.webContents.getBackgroundThrottling()});
  /** Retire the private index before deleting its independently owned cache/note; continue cleanup after failures. */
  const close=async()=>{
    active=false;const errors=[];
    try{index?.destroy();}catch(error){errors.push(String(error));}
    try{if(cache){check(cache.vaultName===namespace&&namespace!==app.vault.getName(),'Cache ownership');check(await cache.purgeAndClose(),'Owned URL cache purge');}}catch(error){errors.push(String(error));}
    try{if(file&&app.vault.getFileByPath(path)===file)await app.vault.delete(file);check(!app.vault.getFileByPath(path),'Owned note cleanup');}catch(error){errors.push(String(error));}
    try{win.setBounds(previous.bounds);if(previous.maximized)win.maximize();if(previous.minimized)win.minimize();}catch(error){errors.push(String(error));}
    controller.index=null;if(errors.length)throw Error('Native URL cleanup: '+errors.join('; '));
  };
  controller.cleanup=close;
  try{
    file=await app.vault.create(path,text);
    await until(/** Use real metadata availability. */ ()=>Boolean(app.metadataCache.getFileCache(file)));
    const vault=new Proxy(app.vault,{/** Bind all native facts/read methods and override only the cache namespace. */ get(target,key){
      if(key==='getName')return /** No new vault destination is created. */ ()=>namespace;
      const value=Reflect.get(target,key,target);
      if(key==='cachedRead'||key==='read')return /** Count this isolated index's source reads and preserve the original promise. */ (...args)=>{if(active)operations.reads++;return value.apply(target,args);};
      return typeof value==='function'?value.bind(target):value;
    }});
    const host=new Proxy(app,{/** Retired legacy cleanup has no payload in this new namespace; all other APIs remain native. */ get(target,key){
      if(key==='vault')return vault;if(key==='saveLocalStorage')return /** Never alter the actual vault's legacy payload. */ ()=>undefined;
      const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;
    }});
    const settings=structuredClone(p.settings);settings.indexingMode='on-demand';
    const plugin={app:host,settings,manifest:{...p.manifest,dir:undefined},getIndexSourceRevision:/** Forward the actual host revision owner. */ ()=>p.getIndexSourceRevision(),
      notifyStartupProgress:/** Preserve the host notification boundary. */ ()=>p.notifyStartupProgress()};
    index=new p.index.constructor(plugin,host);controller.index=index;cache=index.indexedDb;
    const parse=index.metadataParser.parse;
    index.metadataParser.parse=/** Observe the actual parser without altering result or promise identity. */ function(...args){if(active)operations.parses++;return parse.apply(this,args);};
    const body=await index.metadataParser.parse(text);
    await until(/** Avoid competing with the primary index's response to the owned file event. */ ()=>p.getIndexStatus().upToDate&&p.index.urlPendingPublications===0);
    return {index,file,body,settings,operations,check,foreground,close,
      /** Bound source-operation attribution to a timed scenario. */ begin(){operations.reads=0;operations.parses=0;active=true;},
      /** Leave subsequent cleanup/verification outside source-operation counters. */ end(){active=false;}};
  }catch(error){await close();throw error;}
}

/** Preserve ordered graph/evidence values, including IDs, as an aggregate digest input outside timing. */
export function nativeUrlGraphValue(index) {
  return {pages:[...index.urlState.pages].map(/** Exclude real host identity while preserving all named facets and adjacency ordering. */ ([path,page])=>({path,name:page.name,url:page.url,aliases:page.aliases,tags:page.tags,styleTags:page.styleTags,
    neighbours:[...page.neighbours].map(/** Canonical target identity is checked separately by the scenario. */ ([path,{target,...relation}])=>[path,relation])})),
    evidence:[...index.urlState.evidence.declarations()]};
}
