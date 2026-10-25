/** Mind Map type defaults/validation. Root, branch state, camera and editor bindings remain native-session intent. */
import type {PlexViewConfiguration, PlexViewConfigurationSchema} from "../configuration";

export const MIND_MAP_LIMITS = {occurrences: 256, depth: 8, scopes: 8, stateCharacters: 12_000, occurrenceCharacters: 4096} as const;
export type MindMapConfiguration = Readonly<{arrangement: "balanced" | "left" | "right"; horizontalSpacing: number;
  verticalSpacing: number; initialGenerations: number; maximumDepth: number; maximumOccurrences: number}>;

/** Shared schema fields use exact finite ranges; no native or semantic settings are copied into this type. */
function integer(defaultValue: number, minimum: number, maximum: number) {
  return {defaultValue, validate: (value: unknown): boolean => typeof value === "number" && Number.isInteger(value) && value >= minimum && value <= maximum};
}

export const mindMapConfigurationSchema: PlexViewConfigurationSchema = {version: 1, fields: {
  arrangement: {defaultValue: "balanced", validate: (value): boolean => value === "balanced" || value === "left" || value === "right"},
  horizontalSpacing: integer(96, 40, 240), verticalSpacing: integer(24, 12, 80), initialGenerations: integer(1, 1, 3),
  maximumDepth: integer(6, 1, MIND_MAP_LIMITS.depth), maximumOccurrences: integer(256, 16, MIND_MAP_LIMITS.occurrences),
}};

/** Decode only schema-admitted effective values; absent payload inherits defaults without materializing global settings. */
export function mindMapConfiguration(configuration?: PlexViewConfiguration): MindMapConfiguration | null {
  if (configuration?.status === "unavailable") return null;
  const values = configuration?.values ?? {};
  /** Only an absent field inherits defaults; a present null remains invalid schema input. */
  const read = (name: string): unknown => Object.prototype.hasOwnProperty.call(values, name) ? values[name] : mindMapConfigurationSchema.fields[name].defaultValue;
  for (const [name, field] of Object.entries(mindMapConfigurationSchema.fields)) if (!field.validate(read(name))) return null;
  const arrangement = read("arrangement");
  if (arrangement !== "balanced" && arrangement !== "left" && arrangement !== "right") return null;
  return {arrangement, horizontalSpacing: Number(read("horizontalSpacing")), verticalSpacing: Number(read("verticalSpacing")),
    initialGenerations: Number(read("initialGenerations")), maximumDepth: Number(read("maximumDepth")), maximumOccurrences: Number(read("maximumOccurrences"))};
}
