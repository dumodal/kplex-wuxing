/** Per-canvas view-specific choices adjacent to the existing shared view selector. */
import {useEffect, useRef, useState, useSyncExternalStore} from "react";
import type {Translator} from "../../lang";
import type {CanvasViewContributionController} from "./CanvasViewContributionController";
import {canvasViewText} from "./labels";

/** No duplicated selected state: every render derives choices from the captured native session. */
export function CanvasViewChoices({controller, translate}: Readonly<{controller: CanvasViewContributionController; translate: Translator}>) {
  useSyncExternalStore(controller.session.subscribe, controller.session.getSnapshot, controller.session.getSnapshot);
  const alive = useRef(false), [unavailable, setUnavailable] = useState(false);
  useEffect(/** Ignore outcomes after the panel or its owning canvas has disappeared. */ () => {alive.current = true; return () => {alive.current = false;};}, [controller]);
  return <>{controller.choices().map(choice => <label key={choice.id} className="kplex-filter-row" data-kplex-view-choice={choice.id}>
    <span>{canvasViewText(choice.label, translate)}</span>
    <select aria-label={canvasViewText(choice.label, translate)} value={choice.selected} disabled={!choice.enabled}
      onChange={/** The closure keeps the panel's opening canvas and exact admitted choice. */ event => {
        const selected = choice.options.find(option => option.id === event.currentTarget.value);
        event.currentTarget.value = choice.selected;
        if (choice.enabled && selected?.enabled) void selected.command.run().then(outcome => {
          if (alive.current) setUnavailable(outcome.status !== "completed");
        });
      }}>{choice.options.map(option => <option key={option.id} value={option.id} disabled={!option.enabled}>
        {canvasViewText(option.label, translate)}{option.unavailableReason ? ` — ${canvasViewText(option.unavailableReason, translate)}` : ""}
      </option>)}</select>
  </label>)}{unavailable && <div role="status" className="kplex-lens-help">{translate("view.unavailable")}</div>}</>;
}
