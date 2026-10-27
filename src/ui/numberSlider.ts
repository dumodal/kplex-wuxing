/** Shared native numeric control: bounded slider, persistent value and latest-only async delivery.
 * Callers retain draft/inheritance, validation, save ownership and lifecycle guards. */
import type {Setting, SliderComponent} from "obsidian";
import {LatestSliderValue} from "./components/latestSliderValue";

/** Mount without publishing a value. Peer refreshes cannot rewind an active pending gesture. */
export function numberSlider(row: Setting, options: Readonly<{
  label: string; value: number; min: number; max: number; step: number; disabled?: boolean;
  format?: (value: number) => string; onChange: (value: number) => void | Promise<void>;
}>) {
  row.settingEl.addClass("kplex-number-setting");
  let slider: SliderComponent, committed = options.value, draft: number | null = null, alive = true;
  const output = row.controlEl.createEl("output", {cls: "kplex-number-value", attr: {"aria-live": "off"}});
  /** Reading the display never normalizes or writes its owner's saved scalar. */
  const refresh = (): void => {
    if (!alive) return;
    const value = draft ?? committed, text = options.format?.(value) ?? String(Number(value.toFixed(2)));
    slider?.setValue(value);output.setText(text);slider?.sliderEl.setAttribute("aria-valuetext", text);
  };
  const delivery = new LatestSliderValue(value => {draft = value;refresh();}, error => console.error("K-Plex numeric setting callback failed", error));
  row.addSlider(control => {
    slider = control;
    control.setLimits(options.min, options.max, options.step).setValue(committed).setInstant(true).setDisabled(!!options.disabled)
      .onChange(value => {
        if (!alive || control.sliderEl.disabled) return;
        delivery.submit(value, next => {committed = next;return options.onChange(next);});
      });
    control.sliderEl.setAttribute("aria-label", options.label);
  });
  row.controlEl.append(output);refresh();
  return {
    /** Reconcile a saved/draft value without emitting a user edit or losing pending thumb input. */
    setValue(value: number): void {committed = value;refresh();},
    /** Explicit reset wins over an unsent gesture; ordinary peer refreshes use setValue. */
    resetValue(value: number): void {committed = value;delivery.cancelPending();refresh();},
    /** Native disabled state remains owned by the containing Settings row or modal. */
    setDisabled(value: boolean): void {slider.setDisabled(value);},
    /** Detach UI; callback owners still guard any last explicitly requested value. */
    dispose(): void {alive = false;delivery.dispose();},
    input: slider!.sliderEl,
  };
}
