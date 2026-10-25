/** Editable local templates. Property names/canonical values are K-Plex adaptations; the ACE
 * terminology and seven-category eACCESS mapping follow the maintainer's supplied design. */
import type {FacetPreset, FacetCategory} from "./contracts";
const colors = ["--color-blue", "--color-green", "--color-red", "--color-orange", "--color-purple", "--color-cyan", "--color-yellow"];

/** Templates are ordinary validated values, not separate view definitions or workflow engines. */
function template(nameKey: string, field: string, entries: readonly Readonly<{id: string; value?: string; labelKey?: string; color?: string}>[], guides = false): FacetPreset {
  return {version: 1, name: "", ...(nameKey ? {nameKey} : {}), source: "property", field,
    categories: Object.fromEntries(entries.map((entry, index): [string, FacetCategory] => [entry.id,
      {label: "", labelKey: entry.labelKey ?? `facets.${entry.id}`, color: {kind: "theme", variable: entry.color ?? colors[index]},
        values: [entry.value ?? entry.id], assignment: entry.value ?? entry.id}])),
    order: entries.map(entry => entry.id), start: entries[0].id,
    spacing: 56, regionWidth: 320, regionHeight: 280, guides, tints: true,
    conflictingColor: {kind: "theme", variable: "--color-orange"}, unassignedColor: {kind: "theme", variable: "--background-secondary"}};
}

export const FACET_TEMPLATE_ORDER = ["ace", "para", "wuxing", "gtd", "eaccess"] as const;
export const FACET_TEMPLATES: Readonly<Record<string, FacetPreset>> = {
  ace: template("facets.presetAce", "ace", [{id: "add"}, {id: "connect"}, {id: "express"}]),
  para: template("facets.presetPara", "para", [{id: "projects"}, {id: "areas"}, {id: "resources"}, {id: "archives"}]),
  wuxing: template("facets.presetWuXing", "phase", ["water", "wood", "fire", "earth", "metal"].map(id => ({id, labelKey: `wuxing.${id}`,
    ...(id === "metal" ? {color: "--text-muted"} : {})})), true),
  gtd: template("facets.presetGtd", "horizon", [{id: "actions"}, {id: "projects"}, {id: "areas", labelKey: "facets.areasOfFocus"},
    {id: "goals"}, {id: "vision"}, {id: "purpose", labelKey: "facets.purposeAndPrinciples"}]),
  eaccess: template("facets.presetEaccess", "access", [{id: "encounters"}, {id: "atlas"}, {id: "calendar"}, {id: "cards"}, {id: "extras"}, {id: "sources"}, {id: "spaces"}]),
};

/** A custom literal-label fixture, not a sixth shipped built-in template. */
export const FACET_STATE_EXAMPLE: FacetPreset = {...template("", "state", [{id: "seed"}, {id: "research"}, {id: "draft"}, {id: "published"}]),
  name: "State", categories: Object.fromEntries(["Seed", "Research", "Draft", "Published"].map((label, index) => {
    const id = label.toLowerCase(), category = FACET_TEMPLATES.para.categories[FACET_TEMPLATES.para.order[index]];
    return [id, {label, values: [id], assignment: id, color: category.color}];
  }))};
