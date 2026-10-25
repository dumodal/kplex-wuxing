/** Exact native area defaults compose with existing shared measured dimensions. These controls
 * edit only the parent preset draft, preserve inheritance on blank input and never resize a canvas. */
import {Setting} from "obsidian";
import type {FacetPreset} from "../../../core/plex/views/facets/contracts";
import type {Translator} from "../../../lang";

/** One optional width/height pair belongs to one stable category or diagnostics identity. */
export function renderAreaSizeSettings(body: HTMLElement, group: "categories" | "diagnostics", id: string,
  read: () => FacetPreset, change: (preset: FacetPreset) => void, t: Translator): void {
  for (const [field, label, minimum, maximum] of [["width", "wuxing.width", 200, 2400], ["height", "wuxing.height", 160, 1200]] as const) {
    const value = read().areaSizes?.[group]?.[id]?.[field];
    new Setting(body).setName(t(label)).setDesc(t("facets.areaSizeHelp", {minimum, maximum})).addText(/** Empty input means inherit the preset default. */ input => input
      .setValue(value === undefined ? "" : String(value)).onChange(/** Merge against current sibling edits; malformed numbers disable the parent Save. */ raw => {
        const preset = read(), sizes = {...preset.areaSizes?.[group]}, size = {...sizes[id]};
        if (!raw.trim()) delete size[field];else size[field] = Number(raw);
        if (Object.keys(size).length) sizes[id] = size;else delete sizes[id];
        change({...preset, areaSizes: {...preset.areaSizes, [group]: sizes}});
      }));
  }
}
