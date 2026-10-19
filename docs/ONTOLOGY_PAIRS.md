# Paired ontology fields

Configure pairs under **Settings → K-Plex → Ontology → Relationship fields**. A pair gives a connection a natural label from either endpoint while notes keep ordinary property names.

For example, enter `replies to/replied by` in **Previous fields**. This assigns `replies to` to Previous and `replied by` to Next. One entry is enough; do not repeat the reversed pair in Next.

Either note can declare the relationship. In Note B:

```markdown
replies to:: [[Note A]]
```

Or in its YAML properties:

```yaml
---
replies to: "[[Note A]]"
---
```

Alternatively, Note A can contain `replied by:: [[Note B]]`, or the same `replied by` key in YAML. You need only one declaration. K-Plex never automatically writes a matching property in the other note. If you write both, both remain evidence even though the connector wording appears once.

From Note B the connection reads **replies to**; from Note A it reads **replied by**. Enable relationship labels in **Visual styling → Link styling** or the relevant relationship style to display them. Captions do not rename properties: connection details, edits, unlinking, exact-field filters and field styles still use the original declaring field.

| Field direction | Partner direction |
| --- | --- |
| Parent | Child |
| Child | Parent |
| Previous | Next |
| Next | Previous |
| Friend | Friend |
| Challenger | Challenger |

Hidden and Excluded fields cannot form pairs. A field can have only one partner across all lists. Self-pairs, chains, reversed duplicates and conflicting roles are rejected. Incomplete or invalid textarea text stays local, with feedback; the last valid saved configuration remains active.

You can also open **Add/change ontology** for a field and use **Pair with**. Suggestions contain existing eligible fields in the reciprocal direction. An existing pair shows its current partner. Clear the field to unpair it. Changing the direction may require explicitly clearing or replacing an incompatible partner before Save. Clearing or replacing a pair keeps the former partner as an ordinary assignment. Cancel leaves configuration unchanged.

Both role lists show a read-only pairing summary. For example, a Child entry `quoted-in/based on` can coexist with a standalone Parent entry `based on`: they form one shared pair, and the standalone entry keeps its original position/default. The pair is saved in one list only. Do not add the reversed pair to the other list.

Ordinary unpaired entries continue to work. Literal slashes in a property name must be escaped in settings: `cost\/benefit` configures the physical property `cost/benefit`. Escape a literal backslash as `\\`. Only an unescaped slash separates a pair. Notes always use the physical property name without these settings escapes.

Existing K-Plex settings and ExcaliBrain imports preserve literal slash/backslash names through a versioned, lossless settings migration. They are never guessed to be pairs. The syntax version and escaped representation are saved through normal settings persistence; no notes or source grammar are changed.

Pairing fields that already have compatible assignments changes presentation without reindexing. Adding a newly recognized field or changing an assignment's direction retains the normal indexing update.
