/** Editable local templates. ARC adapts Add/Relate/Communicate; Sensemaking uses explicit local
 * properties rather than corpus scores. All presets share one classifier/layout/settings owner. */
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

export const FACET_TEMPLATE_ORDER = ["arc", "para", "wuxing", "gtd", "eaccess", "sensemaking", "publishing", "map-roles"] as const;
export const FACET_TEMPLATES: Readonly<Record<string, FacetPreset>> = {
  arc: {...template("facets.presetArc", "arc", [{id: "add"}, {id: "relate"}, {id: "communicate"}], true), layout: "horizontal"},
  para: template("facets.presetPara", "para", [{id: "projects"}, {id: "areas"}, {id: "resources"}, {id: "archives"}]),
  wuxing: {...template("facets.presetWuXing", "phase", ["water", "wood", "fire", "earth", "metal"].map(id => ({id, labelKey: `wuxing.${id}`,
    ...(id === "metal" ? {color: "--text-muted"} : {})})), true), interpretation: "wuxing", relativeLabels: true, regulatingGuides: true},
  gtd: template("facets.presetGtd", "horizon", [{id: "actions"}, {id: "projects"}, {id: "areas", labelKey: "facets.areasOfFocus"},
    {id: "goals"}, {id: "vision"}, {id: "purpose", labelKey: "facets.purposeAndPrinciples"}]),
  eaccess: template("facets.presetEaccess", "access", [{id: "encounters"}, {id: "atlas"}, {id: "calendar"}, {id: "cards"}, {id: "extras"}, {id: "sources"}, {id: "spaces"}]),
  sensemaking: {...template("facets.presetSensemaking", "sensemaking", [{id: "synthesizer"}, {id: "producer"}, {id: "inner-guide", labelKey: "facets.innerGuide"}, {id: "creative"}]),
    source: "rules", layout: "quadrants", categories: Object.fromEntries(["synthesizer", "producer", "creative", "inner-guide"].map(/** Explicit two-axis property facts never infer a role from prose or graph scores. */ (id, index) => [id, {
      label: "", labelKey: id === "inner-guide" ? "facets.innerGuide" : `facets.${id}`, color: {kind: "theme", variable: colors[index]}, values: [id],
      rule: `note.approach == "${index < 2 ? "top-down" : "bottom-up"}" and note.mode == "${index === 0 || index === 3 ? "reflection" : "expression"}"`,
    }])), order: ["synthesizer", "producer", "creative", "inner-guide"]},
  publishing: {...template("facets.presetPublishing", "state", [{id: "seed"}, {id: "research"}, {id: "draft"}, {id: "review"}, {id: "published"}], true), layout: "vertical"},
  "map-roles": {...template("facets.presetMapRoles", "map-role", [{id: "hub", labelKey: "facets.mapHub"}, {id: "supporting-map", labelKey: "facets.supportingMap"},
    {id: "concept", labelKey: "facets.mapConcept"}, {id: "reference", labelKey: "facets.mapReference"}]), layout: "concentric"},
};

/** A custom literal-label fixture, not a sixth shipped built-in template. */
export const FACET_STATE_EXAMPLE: FacetPreset = {...template("", "state", [{id: "seed"}, {id: "research"}, {id: "draft"}, {id: "published"}]),
  name: "State", categories: Object.fromEntries(["Seed", "Research", "Draft", "Published"].map((label, index) => {
    const id = label.toLowerCase(), category = FACET_TEMPLATES.para.categories[FACET_TEMPLATES.para.order[index]];
    return [id, {label, values: [id], assignment: id, color: category.color}];
  }))};
