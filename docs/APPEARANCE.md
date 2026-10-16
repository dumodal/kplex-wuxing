# Colors and appearance

A fresh K-Plex installation follows Obsidian’s theme. Open **Settings → K-Plex → Visual styling → Colors** to change colors. No companion plugin is required.

## Choose a color source

Canvas, standard styles, custom node/link styles, style lenses, semantic colors and directional tint share these choices:

| Source | Behavior |
| --- | --- |
| **Default** | Inherit the next applicable style or native theme color. |
| **Fixed color** | Keep one literal color in both modes. RGB, opacity and hex/RGB(A) text can be edited independently. |
| **Named color** | Follow a saved pair’s Light or Dark variant. |
| **Theme color** | Follow an Obsidian or custom CSS color variable, such as `--interactive-accent`. Names are case-sensitive. |

Zero opacity is transparent. It is different from **Default**. Changing RGB preserves the current alpha; opening an editor does not convert a reference to a fixed color. Unsupported old literals remain intact until you deliberately replace them.

In a style, lens or tint editor, **Use color** updates its local draft. Select **Save** in the containing editor to keep the change. **Cancel** discards that draft. Opening, cancelling and saving an unchanged color make no settings write.

## Manage named colors

Select **Named colors** under **Visual styling → Colors**. Add a name and separate **Light** and **Dark** variants, then select **Save**. Each variant has its own RGB, opacity, text and reset controls; **Reset both variants** returns to the opening pair. Search and **Show more** keep larger palettes manageable.

Renaming keeps existing references. Duplicating creates an independent pair. Deleting a used color requires a replacement, including **Default**, and applies that replacement to its configured uses together. Counts describe settings uses, rather than the number of visible nodes. If another editor adds a use while deletion is open, reopen the confirmation to review it.

Select **Suggest dark from light** or **Suggest light from dark** to propose the opposite variant. The suggestion mirrors lightness while keeping hue, saturation and opacity. It changes only the local draft, and some colors near middle lightness will barely change. Adjust the result before saving; a suggestion cannot guarantee contrast for every use.

Generated RGBA text shows two alpha decimals. Saved untouched colors retain their exact values, and typing does not rewrite the active text field.

## Preview both modes

Standard styles show separate Light and Dark color strips; individual properties show paired swatches beside **Edit color**. Node strips are ordered background, text, border, gate outline, gate fill. Link strips are line and label.

The Light and Dark cards show a synthetic note, gates, connector and label using the selected sources. Tint editors include the tint over the canvas. Editing a preview does not switch Obsidian’s appearance or change notes.

**Estimated** means the alternate theme context could not be reproduced completely. Treat it as a preview, especially with community themes, snippets, translucent surfaces or high-contrast settings. Contrast figures describe the sample’s composited colors; patterned fills and uncertain surfaces can make a single figure unavailable.

## Preserve existing styles or adopt theme colors

Existing and imported literal colors stay as explicit choices, including colors that matched an older factory default. They can continue to override theme colors.

To adopt native colors, select **Use theme colors for standard styles…**, review the affected slots and preview, then confirm **Use theme colors**. This clears standard color overrides and the canvas color. Geometry, custom styles, lenses and named colors are preserved. You can also select **Default** for one standard field at a time.

If there are no standard color overrides, the dialog explains that theme colors are already in use and has nothing to clear. Its preview shows the resulting standard appearance, not every custom style in your vault.

A newer or unsupported saved color format is read-only. Other settings can still be saved without rewriting that color data. Releases predating theme/named color sources cannot interpret those references. Preserve a settings backup and convert affected fields to fixed colors before downgrading if their appearance must remain available.

## Directional background tint

Open **Visual styling → Colors → Directional background tint**. It is off by default. Enable **Show directional tint**, choose sources if desired and select **Save**.

| Direction | Compass meaning |
| --- | --- |
| North | Parents |
| East | Challengers and next |
| South | Children |
| West | Friends and previous |

The four sectors meet at the rendered center and cover the viewport while panning, zooming and navigating. They stay independent of empty, filtered or collapsed lists. Siblings keep their own relationship role; wide rows can cross a diagonal. Tint is an orientation cue, not an exact membership boundary or a drop target.

**Tint intensity** accepts 0–15%. **Use default intensity** follows a theme override, then 5% in light mode or 7% in dark mode. An explicit zero hides tint. Source alpha and intensity multiply, leaving text, nodes and controls at their normal opacity. Decorative tint is suppressed in forced-colors mode.

For CSS snippets and theme-author tokens, see [Theming K-Plex](THEMING.md).

## Labels

Use **Visual styling → Labels** for frontmatter display names, their field order and full tag names. Node and link geometry remain on their respective styling pages.
