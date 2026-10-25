# Facets

Facets places the current note in the center and its directly related notes in configurable category regions. Its colored badge shows the current note's classification. The surrounding categories do not replace the recorded relationships between notes.

Open **Views and lenses → Canvas view → Facets**. Choose a preset in the same panel. Manage definitions under **Settings → K-Plex → Canvas behavior → Views → Facets**. Each canvas keeps its own selected view/preset, camera and attention; definitions are shared settings. Switching views preserves lenses, filters and unsaved lens drafts.

## Choose a preset

| Preset | Default property | Categories |
| --- | --- | --- |
| ACE | `ace` | Add, Connect, Express |
| PARA | `para` | Projects, Areas, Resources, Archives |
| Wu Xing | `phase` | Water, Wood, Fire, Earth, Metal |
| GTD | `horizon` | Actions, Projects, Areas of focus, Goals, Vision, Purpose and principles |
| eACCESS | `access` | Encounters, Atlas, Calendar, Cards, Extras, Sources, Spaces |

These are editable examples inside one Facets view. You can create/duplicate presets with three to seven stable categories, rename/reorder them, choose colors, matching aliases and explicit assignment values, and adjust layout defaults. Deleting a preset asks for an explicit replacement so saved canvases remain recoverable. Restore defaults changes the local draft until Save. Cancel keeps the accepted definition.

The supplied [sample vault](../tests/fixtures/facets-vault/README.md) includes all five presets plus a custom four-category **State** example (`seed`, `research`, `draft`, `published`). It contains Markdown/configuration only, with no executable plugin. Use a separate disposable copy with the matching reviewed build; do not overwrite an existing vault's settings.

## Classify from one source

Select one source per preset: a Markdown property, note type, tag mapping or advanced rules. Property matching trims whitespace and preserves case. For example, default Wu Xing recognizes `wood`; add `Wood` as an alias if your notes use that spelling. Scalar/list values can match one category; matches in multiple distinct categories are conflicting. An alias alone does not grant write authority: assignment requires an explicit safe canonical value.

Empty categories remain visible. **Unassigned** means no configured category matched available data. **Conflicting** means multiple categories matched. **Checking…** is reserved for active preparation; persistent or unsupported metadata/rules show **Cannot classify** with a classification explanation. These notes remain reachable and are not silently assigned a phase.

Advanced rules reuse the shared Graph Lens conditions and Code grammar:

```text
note.phase == "water"
note.state == "draft" && note.priority >= 3
edge.role == "parent"
this.phase == "wood" && note.phase == "metal"
```

`note` reads the candidate. Availability-aware Facets rules explicitly read non-reserved `this` fields from this canvas's current note; fixed attributes such as `this.name` keep their usual meaning. Unavailable metadata stays unknown under negation. Strict `==` preserves case/type; `.equals()` compares text without case. Switching to Simple is refused if it would change the expression's meaning.

Relationship rules use actual recorded canonical contexts, with any-match within a category and conflicts across categories. The current note has no fabricated self-link. Rule classification stays separate from enabled filtering/styling lenses. General arithmetic or date calculations are outside this version.

## Assign deliberately

For a property preset with a safe explicit assignment value, use **Assign category** on a note or drop its body into a category. A native preview shows the note, property, current/proposed values and effect. Review it before assigning. Classification alone does not create a link; **Connect without assigning…** opens the existing connection workflow separately.

Lists retain unrelated values and order. Assigning an existing category is a no-op. Unassigned removes only values recognized by that preset. Reserved/current ontology, tag, type, alias, name and image properties remain protected. Tag/type/rule presets stay read-only for this action. Dirty native buffers must be saved first.

**Undo category assignment** reverses the last applied field value for this canvas only while that exact value is still current. Later edits, retired notes or changed owners are not overwritten. This receipt is temporary, not a replacement for Obsidian's note history.

## Read Wu Xing relative to the current note

Original term: Wu Xing (五行), pinyin **wǔ xíng**; here it is presented as Five Phases. A saved phase records your classification of the note. The optional relative labels explain that classification against the current note's phase.

The generating cycle is **Wood → Fire → Earth → Metal → Water → Wood**. Regulation skips one phase forward. Reordering the visible regions does not reorder this model.

| Candidate phase | With Wood current | With Metal current |
| --- | --- | --- |
| Wood | What shares my phase | What I regulate |
| Fire | What I generate | What regulates me |
| Earth | What I regulate | What generates me |
| Metal | What regulates me | What shares my phase |
| Water | What generates me | What I generate |

Following another note updates these explanations without changing either note's saved phase or recorded links. Keyboard selection, hovering, resizing and reclassification do not independently retarget the native editor or Sidecar. An unassigned, conflicting or unavailable current phase supplies no default reference; there is no automatic Wood assignment on opening.

Solid directed guides show generation. Dashed directed guides show regulation. Both connect phase regions as decorative model explanations. They cannot be selected as editable relationships, and neither proves causation. Actual note connectors continue to require recorded graph evidence.

The prototype by [Dumo Guo at fixed commit fa038f0](https://github.com/dumodal/kplex-wuxing/tree/fa038f0af796a9a6f42e6f8eb91e44c13ba3e067) was reviewed as a functional reference. [The specification's parity assessment](FACETS_VIEW.md#functional-reference-dumos-fixed-wu-xing-prototype) separates implemented reference behavior from its proposed interactive onboarding. A count-weighted balance star, automatic perspective tilt, separate bilingual display preference and richer onboarding remain future opportunities.

## Shared canvas behavior

Facets uses the existing measured nodes/links, bounded area overflow, grouping, Find, keyboard actions, navigation and Sidecar. Its native editor follows the current note and retains the normal save/switch/resize lifecycle. Decorative guides have no relationship-edit authority.

In **Area settings**, drag a region's bottom handle downward to grow it or upward to shrink it. Unassigned, Conflicting and Cannot classify use the same controls and keep independent sizes in each canvas. These status sections sit apart from the category regions on the right.

Alt/Option-click explicitly centers a note through the shared navigation action. Ctrl/Cmd placeholder creation keeps its existing meaning. Wander uses the displayed navigable notes in every registered view. Mind Map's ordinary branch clicks retain its root; cycle references reveal their earlier occurrence and explain the cycle.

Section expansion remains hidden in production Facets and Mind Map. Compass retains its existing section behavior. The reusable section boundary is tested separately and is not a shipped Mind Map section mode.

## Attribution and validation

PARA terminology is informed by [Forte Labs](https://fortelabs.com/blog/para/). GTD horizons are informed by [Getting Things Done](https://gettingthingsdone.com/2011/01/the-6-horizons-of-focus/). The supplied ACE wording and seven-category eACCESS arrangement are the maintainer's requested K-Plex adaptations, with [Linking Your Thinking](https://www.linkingyourthinking.com/) as related background; they are not claims of an official workflow definition.

See the [current validation record](validation/facets-220-2026-10-25.md) for exact source/test receipts and remaining Windows, Mac, physical-mobile and baseline limitations. PR #220 remains open and unmerged.
