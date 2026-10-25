/** Explicit catalog/literal presentation values. User labels are never reinterpreted as keys. */
import type {CanvasViewText, PlexNodeBadge} from "../contracts";
import type {FacetPreset, FacetCategory, FacetMembership} from "./contracts";

/** Built-in explanatory names localize; editable literal names retain their exact text. */
export function facetPresetLabel(preset: FacetPreset): CanvasViewText {
  return preset.name.trim() ? {literal: preset.name} : {key: preset.nameKey ?? "facets.preset"};
}
/** Category identity is independent of its visible label and recognition/assignment values. */
export function facetCategoryLabel(category: FacetCategory, id: string): CanvasViewText {
  return category.label.trim() ? {literal: category.label} : category.labelKey ? {key: category.labelKey} : {literal: id};
}
/** Recoverable technical status is not a definite Unassigned classification. */
export function facetMembershipDescription(membership: FacetMembership): CanvasViewText {
  return {key: membership.status === "unresolved" ? `facets.reason.${membership.reason}` : `facets.reason.${membership.status}`};
}
/** Only the focus requests a visible badge; peripheral accessibility uses the same explanation. */
export function facetMembershipBadge(membership: FacetMembership, preset: FacetPreset): PlexNodeBadge {
  const label = membership.status === "assigned" ? facetCategoryLabel(preset.categories[membership.category], membership.category)
    : {key: membership.status === "unresolved" ? "facets.cannotClassify" : `facets.${membership.status}`};
  return {label, description: facetMembershipDescription(membership), background: membership.status === "assigned" ? preset.categories[membership.category].color
    : membership.status === "conflicting" ? preset.conflictingColor : membership.status === "unassigned" ? preset.unassignedColor
      : {kind: "theme", variable: "--background-secondary"}};
}
