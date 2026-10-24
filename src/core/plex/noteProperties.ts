/** Cache-only property availability shared by presentation consumers. Missing values are distinct from an unavailable source; no body acquisition is permitted. */
export type NotePropertyAvailability = "available" | "unavailable" | "unsupported";
export type NotePropertyRead = Readonly<{status: "available"; value: unknown}>
  | Readonly<{status: "unavailable" | "unsupported"}>;
