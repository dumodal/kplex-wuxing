/**
 * Deterministic shared-URL working-staging counts for #153, using the production GraphBuilder.
 * Source/alias facts are fixed per owner. This private graph has no display readers or flushes;
 * evidence adoption is safe only because the driver retains no previous readable generation.
 * Fake-clock timings are omitted; target-owned iterators count actual neighbor copies only.
 */
import assert from 'node:assert/strict';
import { noopPatchBundle, portableNoopFixture } from '../../tests/support/noopPatchPortable.mjs';

const bundle=await noopPatchBundle(),results=[];
for(const count of [256,512,1024,2048,4096]){
  const f=portableNoopFixture(bundle,0),state=f.M.createGraphState();let copies=0;
  for(let n=0;n<count;n++){
    const file=f.host.add(`Owner-${n}.md`,'[Fixed](https://shared.example/path)'),body=f.M.parseBodyMetadata(f.host.texts.get(file.path));
    const restore=[];
    for(const path of ['https://shared.example/path','https://shared.example']){
      const map=state.pages.get(path)?.neighbours;if(!map)continue;
      const descriptor=Object.getOwnPropertyDescriptor(map,Symbol.iterator),iterator=map[Symbol.iterator];
      /** Observe this actual target map while preserving its entries and insertion order. */
      map[Symbol.iterator]=function*(){for(const entry of iterator.call(this)){copies++;yield entry;}};
      restore.push(/** Remove the iterator even if native/source publication rejects this owner. */ ()=>{
        if(descriptor)Object.defineProperty(map,Symbol.iterator,descriptor);else delete map[Symbol.iterator];
      });
    }
    try{
      assert(await f.builder.patchUrlReferences(state,file,body,
        /** No display generation is retained by this isolated staging workload. */ (_,publish)=>publish(),undefined,
        /** All evidence here is exclusively owned by this private driver. */ ()=>true));
    }finally{for(const cleanup of restore)cleanup();}
  }
  results.push({owners:count,neighbourEntriesCopied:copies,pages:state.pages.size,declarations:state.evidence.declarationCount,
    evidenceDepth:state.evidence.depth,displayFlushCopies:0,bodyReads:f.host.reads.length});
}
console.log(JSON.stringify({node:process.version,workload:'private shared URL, fixed label, one occurrence per owner',results},null,2));
