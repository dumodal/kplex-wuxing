/** Bounded optional receipt hashing: exact Unicode framing, multiplicity and terminal cancellation. */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { loadPortableModules } from "./support/portableTypeScript.mjs";
const {exports:M}=loadPortableModules(["src/index/SnapshotReceiptHasher.ts"]);

/** Exercise actual serialization/digests while observing only transient input sizes. */
async function commitment(records){
  let largest=0;
  const hash=new M.SnapshotReceiptHasher('receipt-contract',
    /** A real digest consumes bounded text, never an entire large logical record. */ async text=>{
      largest=Math.max(largest,text.length);return createHash('sha256').update(text).digest('hex');
    },/** Keep this fixture's lifetime current. */ ()=>true);
  for(const record of records)assert.equal(await hash.add(record),true);
  return {value:await hash.finish(),largest};
}

/** UTF-8 replacement, ambiguous concatenation and omitted duplicate records must not authenticate equality. */
test('snapshot receipt commits exact Unicode, record boundaries, multiplicity and bounded large values',async()=>{
  assert.notDeepEqual((await commitment([{text:'\ud800'}])).value,(await commitment([{text:'\ufffd'}])).value);
  assert.notDeepEqual((await commitment([{text:'A\u0000B'}])).value,(await commitment([{text:'A'},{text:'B'}])).value);
  assert.notDeepEqual((await commitment([{target:null},{target:null}])).value,(await commitment([{target:null}])).value);
  assert.notDeepEqual((await commitment([])).value,(await commitment([{}])).value);
  const result=await commitment([{text:'🐈\u0000"\\'.repeat(100000)}]);
  assert.equal(result.value.records,1);assert.match(result.value.sha256,/^[a-f0-9]{64}$/);
  assert(result.largest<32*1024*6+1024,'Even worst-case JSON escaping stays bounded per digest call');
});

/** A native digest may finish after cancellation; its result cannot become a partial or revived receipt. */
test('snapshot receipt cancellation during native hashing is terminal',async()=>{
  let current=true,calls=0;
  const hash=new M.SnapshotReceiptHasher('cancelled',/** Retire the actual asynchronous consumer before returning its digest. */ async text=>{
    calls++;current=false;return createHash('sha256').update(text).digest('hex');
  },/** Read the caller's live lifetime. */ ()=>current);
  assert.equal(await hash.add({text:'x'.repeat(100000)}),false);assert.equal(calls,1);
  current=true;assert.equal(await hash.finish(),null);assert.equal(await hash.add({text:'later'}),false);
});
