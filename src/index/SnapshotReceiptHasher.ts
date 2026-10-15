/**
 * Bounded equality commitments for optional disposable snapshot receipts. This storage helper
 * borrows the canonical streaming serializer, receives digest/yield/lifetime capabilities, and
 * retains one fixed-size frame. It owns no host discovery, graph semantics, timers or database.
 */
import { iterateReferencePayloadChunks } from "../core/parser/referenceValues";

/** Exact ordered record identity; the count also binds empty streams and truncation. */
export type SnapshotReceiptDigest = Readonly<{ sha256: string; records: number }>;
/** Selected source catalog and canonical semantic input stream under one closed source lifetime. */
export type SnapshotSourceValidation = Readonly<{ sequence: number; heads: SnapshotReceiptDigest;
  inputs: SnapshotReceiptDigest; markdownOwners: number }>;
/** Optional version-two receipt also binds canonical Markdown replay order; version one falls back. */
export type SnapshotSourceReceipt = Readonly<{ version: 2; fingerprintVersion: 3; generation: string;
  source: SnapshotSourceValidation; pages: SnapshotReceiptDigest; evidence: SnapshotReceiptDigest; binding: string }>;

/** Hash one stream without retaining an encoded graph, decoded source mirror or per-owner proof map. */
export class SnapshotReceiptHasher {
  private buffer = "";
  private chain = "";
  private records = 0;
  private ended = false;
  private valid = true;

  /** Digest and checkpoint run outside native transactions and must preserve their caller's lifetime. */
  constructor(private readonly family: string, private readonly digest: (text: string) => Promise<string>,
    private readonly current: () => boolean, private readonly checkpoint?: () => Promise<void>) {}

  /** Hash a fixed UTF-16 frame as JSON, preserving split surrogate code units without UTF-8 aliases. */
  private async flush(): Promise<boolean> {
    if (!this.valid || !this.current()) return this.valid = false;
    this.chain = await this.digest(JSON.stringify([1, this.family, this.chain, this.buffer]));
    this.buffer = "";
    await this.checkpoint?.();
    return this.valid = this.current();
  }

  /** Frame boundaries depend only on the logical stream, never native chunk sizes or elapsed time. */
  private async append(text: string): Promise<boolean> {
    for (let offset = 0; offset < text.length;) {
      const take = Math.min(32 * 1024 - this.buffer.length, text.length - offset);
      this.buffer += text.slice(offset, offset + take);
      offset += take;
      if (this.buffer.length === 32 * 1024 && !(await this.flush())) return false;
    }
    return this.valid && this.current();
  }

  /** Serialize one object/array in bounded pieces; raw boundary markers cannot occur in JSON data. */
  async add(record: object): Promise<boolean> {
    if (this.ended || !this.valid || !this.current() || !(await this.append("\u0000"))) return false;
    for (const piece of iterateReferencePayloadChunks(record, 2048)) if (!(await this.append(piece))) return false;
    if (!(await this.append("\u0001"))) return false;
    this.records += 1;
    return true;
  }

  /** Finalize once; a failed or superseded stream can never produce a partial commitment. */
  async finish(): Promise<SnapshotReceiptDigest | null> {
    if (this.ended || !this.valid || !this.current()) return null;
    this.ended = true;
    if (!(await this.flush())) return null;
    const sha256 = await this.digest(JSON.stringify([1, this.family, this.chain, this.records, "end"]));
    return this.current() ? { sha256, records: this.records } : null;
  }
}

/** Reject malformed optional proofs without making an otherwise readable legacy snapshot unusable. */
export function snapshotSourceReceipt(value: unknown, generation: string): SnapshotSourceReceipt | null {
  /** Narrow only small receipt objects; never copy untrusted additional fields. */
  const object = (item: unknown): item is Record<string, unknown> => item !== null && typeof item === "object" && !Array.isArray(item);
  /** All counts are exact nonnegative integers. */
  const count = (item: unknown): item is number => typeof item === "number" && Number.isSafeInteger(item) && item >= 0;
  /** A digest binds an exact logical record count, including zero. */
  const digest = (item: unknown): item is SnapshotReceiptDigest => object(item) && typeof item.sha256 === "string"
    && /^[a-f0-9]{64}$/.test(item.sha256) && count(item.records);
  if (!object(value) || value.version !== 2 || value.fingerprintVersion !== 3 || value.generation !== generation
    || typeof value.binding !== "string" || !/^[a-f0-9]{64}$/.test(value.binding) || !object(value.source)
    || !count(value.source.sequence) || !count(value.source.markdownOwners) || !digest(value.source.heads)
    || !digest(value.source.inputs) || value.source.inputs.records !== value.source.markdownOwners
    || !digest(value.pages) || !digest(value.evidence)) return null;
  return { version: 2, fingerprintVersion: 3, generation,
    source: { sequence: value.source.sequence, markdownOwners: value.source.markdownOwners,
      heads: { sha256: value.source.heads.sha256, records: value.source.heads.records },
      inputs: { sha256: value.source.inputs.sha256, records: value.source.inputs.records } },
    pages: { sha256: value.pages.sha256, records: value.pages.records },
    evidence: { sha256: value.evidence.sha256, records: value.evidence.records }, binding: value.binding };
}

/** Compare scalar commitments without treating object identity or property order as source authority. */
export function sameSnapshotReceiptDigest(left: SnapshotReceiptDigest | null, right: SnapshotReceiptDigest): boolean {
  return left?.sha256 === right.sha256 && left.records === right.records;
}
