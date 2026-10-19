/** Native Settings acceptance for the one-time 0.2.0 upgrade; no notes or release metadata change. */
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {runControlledProbe} from './controlledProbe.mjs';

/** Exercise the production queue and native declarative Settings, preserving the selected fixture configuration. */
async function scenario(app,c) {
  const p=app.plugins.plugins['k-plex'];
  if(!p||app.setting.isOpen)throw Error('Clean native Settings owner required');
  const settings=structuredClone(p.settings),policy=p.savedSettingsPolicy;
  const native=require('@electron/remote').getCurrentWindow(),bounds=native.getBounds(),maximized=native.isMaximized();
  const wait=ms=>new Promise(resolve=>window.setTimeout(resolve,ms));
  const check=(value,message)=>{if(!value)throw Error(message)};
  /** Native page replacement and queue publication are independently asynchronous. */
  const until=async(predicate,message)=>{const end=Date.now()+15000;while(!predicate()){check(!c.closed&&Date.now()<end,message);await wait(30)}};
  let originalSave;
  try {
    await until(()=>!p.isStartupInitializing(),'Startup did not settle');
    const remote=require('@electron/remote');remote.app.show?.();remote.app.focus({steal:true});native.restore();native.show();native.focus();
    check(p.settings.appearanceThemes&&!p.settings.appearanceThemesFuture,'Supported native library required');
    p.settings.appearanceThemes=structuredClone(p.settings.appearanceThemes);
    delete p.settings.appearanceThemes.nativeBaseMigration;
    const previous=structuredClone(p.settings.appearanceThemes),previousId=previous.selectedId;
    const semantics=JSON.stringify([p.settings.noteTypeStyles,p.settings.tagNodeStyles,p.settings.tagStyleList,p.settings.hierarchyLinkStyles,p.settings.colorPreferences,p.settings.graphLenses]);
    let writes=0;originalSave=p.saveData;
    p.saveData=function(...args){writes++;return originalSave.apply(this,args)};
    await p.updateStyleSettings(()=>{},p.captureAppearanceOwner(),{initializeThemes:{existing:true,version:'0.2.0',notifyMigration:true}});
    check(writes===1&&p.settings.appearanceThemes.nativeBaseMigration===1,'Upgrade did not use one durable operation');
    check(p.settings.standardStyleDefaults==='native'&&p.settings.appearanceThemes.selectedId!=='default','Native base not selected');
    check(JSON.stringify(p.settings.appearanceThemes.themes.slice(0,previous.themes.length))===JSON.stringify(previous.themes),'Prior theme was overwritten');
    check(JSON.stringify([p.settings.noteTypeStyles,p.settings.tagNodeStyles,p.settings.tagStyleList,p.settings.hierarchyLinkStyles,p.settings.colorPreferences,p.settings.graphLenses])===semantics,'Semantic appearance changed');
    check([...document.querySelectorAll('.notice')].some(el=>el.textContent.includes(p.translator('themes.nativeBaseAdopted'))),'Committed upgrade notice missing');
    p.openSettings();await until(()=>p.settingsTab.containerEl.isConnected,'Native Settings missing');
    check(p.settingsTab.openSettingsPage(p.translator('settings.ui.visual.styling')),'Visual styling page missing');
    const row=()=>[...document.querySelectorAll('.setting-item')].find(el=>el.querySelector('.setting-item-name')?.textContent===p.translator('themes.label')&&el.getClientRects().length);
    await until(()=>row()?.querySelector('select'),'Native theme selection missing');
    const select=row().querySelector('select');check(select.value===p.settings.appearanceThemes.selectedId,'Native selector displays old theme');
    const dismiss=document.querySelector('button[aria-label="'+p.translator('themes.dismissMigration')+'"]');check(dismiss,'Dismissible upgrade explanation missing');dismiss.click();
    await until(()=>!p.settings.appearanceThemes.migrationNotice,'Native dismissal did not persist');
    select.value=previousId;select.dispatchEvent(new Event('change',{bubbles:true}));
    await until(()=>p.settings.appearanceThemes.selectedId===previousId,'Native theme selection did not persist');
    app.setting.close();await p.settingsWriteQueue;const before=writes;
    await p.updateStyleSettings(()=>{},p.captureAppearanceOwner(),{initializeThemes:{existing:true,version:'0.3.0',notifyMigration:true}});
    check(writes===before&&p.settings.appearanceThemes.selectedId===previousId,'Later version reset the user selection');
    // A first installation is represented by its actual absence of prior K-Plex data, not version absence.
    await p.updateAppearanceThemes({kind:'select',id:'default'});
    p.settings.appearanceThemes={version:1,migrationComplete:true,selectedId:'default',themes:p.settings.appearanceThemes.themes.filter(theme=>theme.id==='default'),migrationNotice:false};
    const notices=[...document.querySelectorAll('.notice')].filter(el=>el.textContent.includes(p.translator('themes.nativeBaseAdopted'))).length;
    await p.updateStyleSettings(()=>{},p.captureAppearanceOwner(),{initializeThemes:{existing:false,version:'0.2.0',notifyMigration:false}});
    check(p.settings.appearanceThemes.themes.length===1&&!p.settings.appearanceThemes.migrationNotice,'Fresh install acquired an upgrade theme/message');
    check([...document.querySelectorAll('.notice')].filter(el=>el.textContent.includes(p.translator('themes.nativeBaseAdopted'))).length<=notices,'Fresh install displayed an upgrade popup');
    p.openSettings();await until(()=>p.settingsTab.containerEl.isConnected,'Fresh Settings missing');p.settingsTab.openSettingsPage(p.translator('settings.ui.visual.styling'));
    await until(()=>row()?.querySelector('select'),'Fresh theme row missing');
    check(![...document.querySelectorAll('.setting-item')].some(el=>el.getClientRects().length&&el.querySelector('.setting-item-name')?.textContent===p.translator('themes.nativeBaseAdopted')),'Fresh Settings displayed migration row');
    return {cases:['atomic existing-user adoption','native Visual styling selection and dismissal','later version preserves manual selection','fresh Default-only installation without popup or Settings message'],writes};
  } finally {
    if(app.setting.isOpen)app.setting.close();await p.settingsWriteQueue;
    if(originalSave)p.saveData=originalSave;
    p.settings=settings;p.savedSettingsPolicy=policy;
    await wait(300);await app.vault.adapter.write(p.manifest.dir+'/data.json',c.originalData);
    native.setBounds(bounds);if(maximized)native.maximize();
  }
}

if(process.env.KPLEX_TEST_VAULT_NAME!=='kplex-test-small')throw Error('Theme upgrade requires the explicit Small fixture');
const data=readFileSync(join(process.env.KPLEX_TEST_CONFIG_DIR,'plugins/k-plex/data.json'),'utf8');
await runControlledProbe('theme-upgrade-020',scenario,'c.originalData='+JSON.stringify(data)+';',['src/main.ts','src/settings.ts','src/core/plex/appearanceThemes.ts']);
