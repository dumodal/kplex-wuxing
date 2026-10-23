/**
 * Bounded test-only PR204 comparison using production repository owners in disposable real Chromium
 * databases. Owns serial browser lifetimes and private result receipts, separates diagnostic/native
 * request counting from renderer timing, and includes reclamation, process restart and later editing.
 * Native Obsidian and private vaults are never opened.
 */
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { contributorBrowserBundle, contributorBrowserInitialize } from "../../tests/support/contributorBrowserFixture.mjs";
import { chromiumHarness } from "../../tests/support/browserTypeScript.mjs";
import { installDependencyCountReuseFixture } from "../../tests/support/dependencyCountReuseFixture.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const base = "cd12a857c1c2c89c2d13f6c6b2a3e1a5203d5ffa";
const runtimeFile = "src/index/SourceRepository.ts";
/** Pin compared source/bundle bytes independently of the surrounding tooling commit. */
const sha256 = value => createHash("sha256").update(value).digest("hex");

/** Use exact source identities without moving a branch or invoking a shell. */
function git(args) {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8", timeout: 15000, windowsHide: true });
  if (result.status !== 0) throw new Error(`git ${args[0]} failed: ${result.stderr}`);
  return result.stdout;
}
/** Retain existing endpoint metrics, including optional renderer cumulative CPU; never infer store CPU. */
async function metrics(browser) {
  const result = await browser.command("Performance.getMetrics");
  const values = Object.fromEntries(result.metrics.map(/** Retain named cumulative CDP endpoints without deriving allocation or peak memory. */metric => [metric.name, metric.value]));
  if (!Number.isFinite(values.TaskDuration)) throw new Error("CDP TaskDuration unavailable");
  return values;
}
/** Chromium ProcessTime queries current renderer process cumulative CPU, excluding other processes. */
function cpuDelta(before, after) {
  return Number.isFinite(before.ProcessTime) && Number.isFinite(after.ProcessTime)
    && after.ProcessTime >= before.ProcessTime && after.ProcessTime > 0 ? after.ProcessTime - before.ProcessTime : null;
}
/** Bound each arm's host wait; Chromium's own command deadline bounds its awaited operation. */
async function initialize(browser) {
  await browser.evaluate(contributorBrowserInitialize);
  await browser.evaluate(`(${installDependencyCountReuseFixture.toString()})()`);
  await browser.command("Performance.enable", { timeDomain: "threadTicks" });
}
/** Run a complete replacement/reclaim interval, then restart the real browser and perform another edit. */
async function arm(bundle, name, config, detailed) {
  const browser = await chromiumHarness(bundle);
  const result = { name, ...config, detailed, status: "incomplete" };
  try {
    await initialize(browser);
    result.browserVersion = await browser.command("Browser.getVersion");
    result.target = await browser.command("Target.getTargetInfo");
    const database = `dependency-reuse-${name}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    await browser.evaluate(`(/** Create only this arm's owned logical database before measured work. */async()=>{const B=dependencyCountReuse;B.context=await B.setup(${JSON.stringify(database)},${config.owners},${Boolean(config.wide)},false);return true})()`);
    for (let first = 0; first < config.owners; first += 32)
      await browser.evaluate(`dependencyCountReuse.seedRange(dependencyCountReuse.context,${first},32)`);
    if (config.changeMode === "late") await browser.evaluate("dependencyCountReuse.context.changeMode='late';true");
    result.before = await browser.evaluate("dependencyCountReuse.oracle(dependencyCountReuse.context)");
    if (detailed) await browser.evaluate("dependencyCountReuse.observer=dependencyCountReuse.observe(dependencyCountReuse.context.repository)");
    const before = await metrics(browser), started = performance.now();
    try {
      const batches = [];
      // Keep each awaited browser command below the shared 60-second transport deadline. The
      // end-to-end endpoints include every batch and IPC gap; identical batching applies to A/F.
      for (let first = 0; first < config.owners; first += 32)
        batches.push(await browser.evaluate(`dependencyCountReuse.workload(dependencyCountReuse.context,${config.mixed},${config.rounds ?? 1},${detailed ? "dependencyCountReuse.observer" : "null"},${first},32)`));
      result.work = { activations: batches.reduce(/** Count completed activations across all timed transport batches. */(sum, batch) => sum + batch.activations, 0), batches };
    } finally {
      result.elapsedMs = performance.now() - started;
      const after = await metrics(browser);
      result.metricEndpoints = { before, after };
      result.rendererMainThreadTaskSeconds = after.TaskDuration - before.TaskDuration;
      result.rendererProcessCpuSeconds = cpuDelta(before, after);
      result.sampledJsHeap = { before: before.JSHeapUsedSize, after: after.JSHeapUsedSize };
      if (detailed) result.detail = await browser.evaluate("(/** Retire detailed wrappers before returning finite diagnostic aggregates. */()=>{const o=dependencyCountReuse.observer;o.retire();return {operations:o.operations,projectionOracle:o.eligibility,staging:o.staging}})()");
    }
    result.after = await browser.evaluate("dependencyCountReuse.oracle(dependencyCountReuse.context)");
    await browser.evaluate("dependencyCountReuse.context.fixture.close();true");
    const restartStart = performance.now();
    await browser.restart();
    result.browserRestartElapsedMs = performance.now() - restartStart;
    await initialize(browser);
    const reopenBefore = await metrics(browser), reopenStart = performance.now();
    result.reopen = await browser.evaluate(`(/** Reopen the same durable database in the restarted browser and authenticate its selected counts. */async()=>{const B=dependencyCountReuse,M=sourceModules,f=await fixture(${JSON.stringify(database)});B.context={fixture:f,repository:f.repository,db:await f.cache.open(),name:${JSON.stringify(database)},owners:${config.owners},wide:${Boolean(config.wide)}};const lookup=await f.repository.lookupLocalDependencyCounts([M.sourceLocalDependencyKey('node','Owner-0000.md')],/** This serial synthetic lookup remains live for its entire request. */()=>true,true);ok(lookup.outcome==='ready','Durable reopen lookup');return {outcome:lookup.outcome,counts:lookup.value.counts}})()`);
    result.reopen.elapsedMs = performance.now() - reopenStart;
    const reopenAfter = await metrics(browser);
    result.reopen.metricEndpoints = { before: reopenBefore, after: reopenAfter };
    result.reopen.rendererMainThreadTaskSeconds = reopenAfter.TaskDuration - reopenBefore.TaskDuration;
    result.reopen.rendererProcessCpuSeconds = cpuDelta(reopenBefore, reopenAfter);
    const editBefore = await metrics(browser), editStart = performance.now();
    result.subsequentEdit = await browser.evaluate(`(/** Measure a genuine dependency-changing edit after restart, including its maintenance closure. */async()=>{const B=dependencyCountReuse;const result=await B.replace(B.context,0,7,${config.changeMode === "late" ? false : !config.mixed},${Boolean(config.wide)});ok(await B.context.repository.completeLocalDependencyInventory()==='ready','Later edit closes');return {outcome:result.outcome,sequence:result.sequence}})()`);
    result.subsequentEdit.elapsedMs = performance.now() - editStart;
    const editAfter = await metrics(browser);
    result.subsequentEdit.metricEndpoints = { before: editBefore, after: editAfter };
    result.subsequentEdit.rendererMainThreadTaskSeconds = editAfter.TaskDuration - editBefore.TaskDuration;
    result.subsequentEdit.rendererProcessCpuSeconds = cpuDelta(editBefore, editAfter);
    result.reopenOracle = await browser.evaluate("dependencyCountReuse.oracle(dependencyCountReuse.context)");
    await browser.evaluate("dependencyCountReuse.context.fixture.close();true");
    result.status = "passed";
  } catch (error) { result.error = String(error.stack ?? error); }
  finally { await browser.cleanup(); }
  return result;
}

/** Negative controls count actual first creation, deletion and pending-journal recovery independently. */
async function controls(bundle, name) {
  const browser = await chromiumHarness(bundle);
  try {
    await initialize(browser);
    return await browser.evaluate(`(/** Exercise first creation, deletion and interrupted selected repair through production owners. */async()=>{
      const B=dependencyCountReuse,M=sourceModules,c=await B.setup(${JSON.stringify(name)},2),r=c.repository,db=c.db,results={};
      try{
        let o=B.observe(r);try{await B.replace(c,2,1);results.newOwner={operations:o.operations};}finally{o.retire();}
        results.afterNew=await B.oracle(c);
        o=B.observe(r);try{const result=await r.tombstone('Owner-0002.md');ok(result.outcome==='activated','Tombstone activates');ok(await r.flush(),'Deletion flush closes');results.deleted={operations:o.operations};}finally{o.retire();}
        results.afterDelete=await B.oracle(c);
        let cancelled=false;const checkpoint=r.runtime.localDependencyCheckpoint;
        r.runtime.localDependencyCheckpoint=/** Interrupt after a committed selected decrement batch. */phase=>{if(phase==='after-local-old-count-batch')cancelled=true;};
        const old=await r.inspect('Owner-0000.md'),data=B.facts(0,9,true);
        const result=await r.replace({sourceId:'Owner-0000.md',expected:old.expected,physical:{...old.head.physical,mtime:9},observation:{...old.head.observation,revision:9},families:Object.fromEntries(M.SOURCE_FAMILIES.map(/** Supply genuine changed facts to ordinary selected-count repair. */family=>[family,/** Preserve repository backpressure while producing the fault control. */async emit=>{for(const fact of data[family])if(!await emit(fact))return false;return true}]))},/** Stop only after the controlled committed repair checkpoint. */()=>!cancelled);
        r.runtime.localDependencyCheckpoint=checkpoint;
        results.interrupted={outcome:result.outcome,reason:result.reason,repairs:await value(db.transaction(M.SOURCE_LOCAL_REPAIR_STORE).objectStore(M.SOURCE_LOCAL_REPAIR_STORE).count())};
        ok(cancelled&&results.interrupted.repairs>0,'Actual selected repair interruption retains journal');
        o=B.observe(r);try{await B.replace(c,0,10);results.pendingRecovery={operations:o.operations};}finally{o.retire();}
        for(const previous of new Set([old.head.sourceRevision,...Object.values(old.head.families).map(/** Include retained family revisions in known predecessor reclamation. */family=>family.revision)]))ok(await r.cleanupRevision('Owner-0000.md',previous),'Interrupted predecessor reclaimed');
        results.afterRecovery=await B.oracle(c);
        return results;
      }finally{c.fixture.close();}
    })()`);
  } finally { await browser.cleanup(); }
}

/** Preserve every arm immediately; timing runs omit detailed wrappers and the semantic oracle. */
async function main() {
  if (process.version !== "v22.22.2") throw new Error(`Node 22.22.2 required; actual ${process.version}`);
  const mode = process.argv[2] ?? "smoke";
  if (!["smoke", "characterize", "representative", "full", "late-control"].includes(mode)) throw new Error("Use smoke, characterize, representative, full or late-control");
  const changed = git(["diff", base, "--name-only", "--", "src/"]).trim().split(/\r?\n/).filter(Boolean);
  if (changed.some(/** Other runtime changes would invalidate the single-file exact-baseline override. */file => file !== runtimeFile)) throw new Error(`Exact baseline override insufficient for runtime files: ${changed.join(", ")}`);
  const baselineSource = git(["show", `${base}:${runtimeFile}`]);
  const candidateSource = await readFile(join(root, runtimeFile), "utf8");
  const bundles = { A: await contributorBrowserBundle([runtimeFile], { [runtimeFile]: baselineSource }), F: await contributorBrowserBundle([runtimeFile]) };
  const directory = await mkdtemp(join(tmpdir(), "kplex-dependency-count-reuse-"));
  const summary = { mode, directory, createdAt: new Date().toISOString(), node: process.version, platform: process.platform, base, head: git(["rev-parse", "HEAD"]).trim(), sourceHashes: { A: sha256(baselineSource), F: sha256(candidateSource) }, bundleHashes: Object.fromEntries(Object.entries(bundles).map(/** Record each actual browser bundle separately from source identities. */([key, value]) => [key, sha256(value)])), conditions: { storage: "fresh test-owned real Chromium IndexedDB per arm", timing: "Existing CDP endpoint metrics: main-thread TaskDuration(threadTicks) plus ProcessTime current-renderer cumulative CPU when available; Browser/storage-process CPU excluded; no exclusive store CPU attribution", metricSemantics: "https://raw.githubusercontent.com/chromium/chromium/main/third_party/blink/renderer/core/inspector/inspector_performance_agent.cc", profile: "existing shared disposable Chromium harness; headless, disable-gpu", completion: "all known old source revisions reclaimed and no local journals; actual selected-row oracle follows timing", later: "same owned browser profile restarted, authenticated lookup then genuine dependency-changing edit", memory: "Endpoint JS heap samples only; not allocation or true peak", forcedGc: false }, results: [] };
  console.log(JSON.stringify({ directory, mode, sourceHashes: summary.sourceHashes }));
  await writeFile(join(directory, "summary.json"), JSON.stringify(summary, null, 2));
  /** Persist every completed/incomplete arm immediately so unfavorable evidence survives later faults. */
  const save = async (name, result) => { summary.results.push({ name, status: result.status ?? "passed" }); await writeFile(join(directory, `${name}.json`), JSON.stringify(result, null, 2)); await writeFile(join(directory, "summary.json"), JSON.stringify(summary, null, 2)); console.log(JSON.stringify({ name, status: result.status ?? "passed", elapsedMs: result.elapsedMs, rendererMainThreadTaskSeconds: result.rendererMainThreadTaskSeconds, rendererProcessCpuSeconds: result.rendererProcessCpuSeconds, error: result.error })); };
  if (mode === "late-control") {
    // Keep the deliberately unfavorable zero-hit cohort separate. Its late mismatch exposed the
    // historical streaming-proof penalty; final deferred authentication must skip that old-row work.
    for (const kind of ["A", "F"])
      await save(`detail-late-${kind}`, await arm(bundles[kind], `detail-late-${kind}`, { owners: 2, mixed: false, changeMode: "late", rounds: 1, wide: false }, true));
    for (let pair = 1; pair <= 3; pair++) for (const kind of pair % 2 ? ["A", "F"] : ["F", "A"]) {
      const name = `timing-16-late-${pair}-${kind}`;
      await save(name, await arm(bundles[kind], name, { owners: 16, mixed: false, changeMode: "late", rounds: 1, wide: false, pair }, false));
    }
    summary.finishedAt = new Date().toISOString();
    summary.status = summary.results.every(/** An incomplete or failed arm prevents a clean cohort pass. */result => result.status === "passed") ? "passed" : "failed";
    await writeFile(join(directory, "summary.json"), JSON.stringify(summary, null, 2));
    if (summary.status !== "passed") process.exitCode = 1;
    return;
  }
  for (const kind of ["A", "F"]) {
    let result;
    try { result = await controls(bundles[kind], `dependency-controls-${kind}-${Date.now()}`); }
    catch (error) { result = { status: "failed", error: String(error.stack ?? error) }; }
    await save(`controls-${kind}`, result);
    if (result.status === "failed") { summary.status = "failed"; await writeFile(join(directory, "summary.json"), JSON.stringify(summary, null, 2)); process.exitCode = 1; return; }
  }
  const sizes = mode === "full" ? [64, 128, 256] : mode === "representative" ? [128] : [2];
  for (const wide of [false, true]) for (const mixed of [false, true]) for (const kind of ["A", "F"]) {
    const name = `detail-${wide ? "byte" : "page"}-${mixed ? "mixed" : "same"}-${kind}`;
    await save(name, await arm(bundles[kind], name, { owners: 2, mixed, wide, rounds: 2 }, true));
  }
  if (mode !== "characterize") for (const owners of sizes) for (const mixed of [false, true]) {
    const pairs = owners === 128 ? 3 : 1;
    for (let pair = 1; pair <= pairs; pair++) for (const kind of pair % 2 ? ["A", "F"] : ["F", "A"]) {
      const name = `timing-${owners}-${mixed ? "mixed" : "same"}-${pair}-${kind}`;
      await save(name, await arm(bundles[kind], name, { owners, mixed, wide: false, pair }, false));
    }
  }
  summary.finishedAt = new Date().toISOString();
  summary.status = summary.results.every(/** Preserve all failed/incomplete evidence in the final cohort status. */result => result.status === "passed") ? "passed" : "failed";
  await writeFile(join(directory, "summary.json"), JSON.stringify(summary, null, 2));
  if (summary.status !== "passed") process.exitCode = 1;
}
await main();
