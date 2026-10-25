/** Stage only three built artifacts in the explicitly authorized disposable Small. This is a
 * hash-checked native-test handoff, never a build/verification receipt or personal-vault installer. */
import assert from 'node:assert/strict';
import {copyFileSync,readFileSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
import {validateTarget} from './runner.mjs';
import {obsidianCliExecutable,spawnNativeSync} from './processTools.mjs';
assert.equal(process.env.KPLEX_TEST_VAULT_NAME,'kplex-test-small');
const target=validateTarget({vaultName:process.env.KPLEX_TEST_VAULT_NAME,vaultPath:process.env.KPLEX_TEST_VAULT_PATH,configDir:process.env.KPLEX_TEST_CONFIG_DIR});
const source=resolve(process.argv[2]??'dist'),backup=process.argv[3];
assert(backup&&existsSync(join(backup,'baseline.json')),'Original private resource backup required');
const cli=(command,...args)=>{const result=spawnNativeSync(obsidianCliExecutable(),['vault=kplex-test-small',command,...args],{encoding:'utf8',timeout:15000,killSignal:'SIGKILL',maxBuffer:2*1024*1024});if(result.error||result.status!==0||/^Error:/m.test(result.stdout))throw Error(result.error?.message||result.stderr||result.stdout);return result.stdout.trim()};
const hash=path=>createHash('sha256').update(readFileSync(path)).digest('hex');
assert.equal(resolve(cli('vault','info=path').replace(/^path\s+/,'')),target.vault);
assert(!cli('eval','code=JSON.stringify({controller:!!window.kplexIndexingProbe})').includes('"controller":true'),'Finish previous native controller first');
const names=['main.js','manifest.json','styles.css'],hashes=Object.fromEntries(names.map(name=>[name,hash(join(source,name))]));
const enabledPath=join(target.config,'community-plugins.json'),originalEnabled=JSON.parse(readFileSync(enabledPath,'utf8'));
assert(Array.isArray(originalEnabled)&&originalEnabled.every(id=>typeof id==='string'),'Native enablement list required');
/** CLI completion can precede the native enablement-file write. Observe each actual transition
 * before the next stage or probe snapshot; do not waive the probe's byte-preservation assertion. */
async function enabledState(expected){
 const end=Date.now()+20000,targetState=JSON.stringify([...expected].sort());
 while(true){const value=JSON.parse(readFileSync(enabledPath,'utf8'));if(Array.isArray(value)&&JSON.stringify([...value].sort())===targetState)return;
  assert(Date.now()<end,'Native enablement write did not settle');await new Promise(resolve=>setTimeout(resolve,100))}
}
cli('plugin:disable','id=k-plex');
await enabledState(originalEnabled.filter(id=>id!=='k-plex'));
for(const name of names){copyFileSync(join(source,name),join(target.pluginDir,name));assert.equal(hash(join(target.pluginDir,name)),hashes[name])}
cli('plugin:enable','id=k-plex');
await enabledState([...new Set([...originalEnabled,'k-plex'])]);
console.log(JSON.stringify({staged:true,hashes,enablementWriteSettled:true,verificationClaim:false}));
