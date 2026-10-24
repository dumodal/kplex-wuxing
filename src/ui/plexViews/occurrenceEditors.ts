/** Exact displayed-occurrence/native-document admission. Geometry never substitutes attention or a duplicate. */
import type {PlexEditorBinding} from "../../application/PlexEditorBindings";
import type {PlexProjection, PlexViewDefinition, PlexViewRead} from "../../core/plex/views/contracts";
import type {GraphPage} from "../../types";
import {actionNodeRef} from "../../adapters/obsidian/actionNode";

export type OccurrenceEditorHost = Readonly<{bindings: readonly PlexEditorBinding[];
  /** The native owner verifies current Vault identity and supported Markdown representation. */
  supports: (page: GraphPage) => boolean}>;
export type AdmittedOccurrenceEditor = Readonly<{binding: PlexEditorBinding; page: GraphPage}>;

/** Pure/cache-only checks followed by a narrow native eligibility proof; no file reads or acquisition. */
export function admitOccurrenceEditors(definition: PlexViewDefinition, projection: PlexProjection, read: PlexViewRead,
  source: {get: (id: string) => GraphPage | undefined}, host?: OccurrenceEditorHost): ReadonlyMap<string, AdmittedOccurrenceEditor> {
  const admitted = new Map<string, AdmittedOccurrenceEditor>();
  if (!host?.bindings.length) return admitted;
  if (definition.editorHosting !== "occurrence" || host.bindings.length > 1) throw new Error("Unsupported editor binding host");
  for (const binding of host.bindings) {
    const occurrences = projection.occurrences.filter(row => row.id === binding.occurrenceId);
    const occurrence = occurrences[0];
    if (occurrences.length !== 1 || !occurrence.nodeId || occurrence.synthetic || occurrence.representation !== "thought"
      || binding.viewId !== definition.id || occurrence.nodeId !== binding.target.nodeId || !read.node(occurrence.nodeId)) {
      throw new Error("Unavailable bound editor occurrence");
    }
    const page = source.get(occurrence.nodeId), reference = page && actionNodeRef(page);
    if (!page || page.transient || !page.file || page.file.extension !== "md" || reference?.kind !== "file"
      || reference.identity !== binding.target.nodeId || page.file.path !== binding.target.path
      || reference.fileIdentity !== binding.target.fileIdentity || !host.supports(page)) throw new Error("Unavailable bound editor document");
    if (admitted.has(binding.occurrenceId)) throw new Error("Duplicate editor binding occurrence");
    admitted.set(binding.occurrenceId, {binding, page});
  }
  return admitted;
}
