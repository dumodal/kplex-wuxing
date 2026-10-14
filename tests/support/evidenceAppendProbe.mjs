/**
 * Test-only append allocation proxy for one actual evidence owner. Count existing bucket entries
 * copied while addDeclarationRecord executes, excluding ordering/compaction/filter writes. Original
 * receiver/results and method-property ownership are restored; counted runs provide no elapsed data.
 */

/** Observe only actual original declaration appends on this private compiler's evidence store. */
export function probeEvidenceAppends(store){
  const add=store.addDeclarationRecord,write=store.writePair,ownAdd=Object.getOwnPropertyDescriptor(store,'addDeclarationRecord'),ownWrite=Object.getOwnPropertyDescriptor(store,'writePair');
  const counts={appends:0,replacedArrays:0,inPlaceAppends:0,priorEntriesCopied:0,largestBucket:0};let appending=0;
  store.addDeclarationRecord=/** Scope nested bucket writes to genuine original admission, including directional Hidden. */function(...args){appending++;try{return add.apply(this,args);}finally{appending--;}};
  store.writePair=/** Identity distinguishes a new prefix copy from an owned existing array; no prefix rescan is added. */function(key,next,previousLength,...args){
    if(appending){counts.appends++;counts.largestBucket=Math.max(counts.largestBucket,next.length);if(this.readPair(key)===next)counts.inPlaceAppends++;else{counts.replacedArrays++;counts.priorEntriesCopied+=previousLength;}}
    return write.call(this,key,next,previousLength,...args);
  };
  return{counts,/** Restore inherited methods as inherited, rather than leaving test-owned shadow properties. */restore(){if(ownAdd)Object.defineProperty(store,'addDeclarationRecord',ownAdd);else delete store.addDeclarationRecord;if(ownWrite)Object.defineProperty(store,'writePair',ownWrite);else delete store.writePair;}};
}
