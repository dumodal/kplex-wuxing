/** Shared native menu for statically registered views. A one-option production registry adds no toolbar noise. */
import {Menu} from "obsidian";
import type {MouseEvent} from "react";
import type {PlexViewSession} from "../../application/PlexViewSession";
import type {Translator} from "../../lang";
import {ObsidianIcon} from "../ObsidianIcon";
import {viewLabel} from "./labels";

/** Native workspace/document ownership stays in the shell's injected menu presenter. */
export function PlexViewSelector({session, translate, showMenu}: {
  session: PlexViewSession; translate: Translator; showMenu: (menu: Menu, event: MouseEvent<HTMLButtonElement>) => void;
}) {
  if (session.registry.available.length < 2) return null;
  return <button type="button" className="kplex-icon-button" aria-label={translate("view.choose")} aria-haspopup="menu"
    onClick={event => {
      const menu = new Menu();
      for (const definition of session.registry.available) menu.addItem(item => item.setTitle(viewLabel(definition.labelKey, translate))
        .setIcon(definition.icon).setDisabled(!session.canSelect(definition.id)).setChecked(definition.id === session.definition.id).onClick(() => session.select(definition.id)));
      showMenu(menu, event);
    }}><ObsidianIcon name={session.definition.icon} size={16} /></button>;
}
