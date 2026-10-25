/** Portable guide content; temporary reference selection is local learning state and never edits vault metadata. */
import { useState } from "react";
import type { Translator } from "../../lang";
import { WUXING_EMOJI, type WuXingElement } from "../../core/plex/wuxing";
import { wuXingStartingPhases } from "../../core/plex/wuxingOnboarding";

const PHASES = [
  { phase: "🟢", name: "wuxing.wood", meaning: "wuxing.guide.woodBody" },
  { phase: "🔴", name: "wuxing.fire", meaning: "wuxing.guide.fireBody" },
  { phase: "🟤", name: "wuxing.earth", meaning: "wuxing.guide.earthBody" },
  { phase: "🟡", name: "wuxing.metal", meaning: "wuxing.guide.metalBody" },
  { phase: "🔵", name: "wuxing.water", meaning: "wuxing.guide.waterBody" },
] as const;
const RELATIONS = ["shares", "generated", "source", "regulated", "regulator"] as const;

/** Explain reference, A/B intake, phases, and directional relationships using the active display language. */
export function WuXingIntroductionContent({ translate, onClose }: { translate: Translator; onClose: () => void }) {
  const [reference, setReference] = useState<WuXingElement>("🟢");
  const examples = wuXingStartingPhases(reference);
  /** Localized phase names are presentation only; the persisted emoji values remain stable. */
  const phaseName = (phase: WuXingElement): string => translate(PHASES.find(item => item.phase === phase)!.name);
  return <div className="kplex-wuxing-introduction">
    <p>{translate("wuxing.guide.intro")}</p>
    <p className="setting-item-description" data-wuxing-origin>{translate("wuxing.guide.origin")}</p>
    <section>
      <h3>{translate("wuxing.guide.referenceHeading")}</h3>
      <p>{translate("wuxing.guide.referenceBody")}</p>
      <label className="kplex-wuxing-reference">
        <span>{translate("wuxing.guide.referenceLabel")}</span>
        <select value={reference} aria-label={translate("wuxing.guide.referenceLabel")}
          onChange={/** Reject unexpected control values without guessing a personal phase. */ event => {
            const candidate = event.currentTarget.value;
            const phase = WUXING_EMOJI.find(item => item === candidate);
            if (phase) setReference(phase);
          }}>
          {PHASES.map(item => <option key={item.phase} value={item.phase}>{translate(item.name)} {item.phase}</option>)}
        </select>
      </label>
      <p className="setting-item-description">{translate("wuxing.guide.referenceHint")}</p>
    </section>
    <section>
      <h3>{translate("wuxing.guide.assignmentHeading")}</h3>
      <div aria-live="polite" className="kplex-wuxing-starting-options">
        <h4>{translate("wuxing.guide.originalTitle")}</h4>
        <p>{translate("wuxing.guide.originalBody")}</p>
        <p>{translate("wuxing.guide.startingStatus")}: <span data-wuxing-original>{phaseName(examples.original)} {examples.original}</span></p>
        <pre><code>{translate("wuxing.guide.statusExample", {phase: examples.original})}</code></pre>
        <h4>{translate("wuxing.guide.capturedTitle")}</h4>
        <p>{translate("wuxing.guide.capturedBody")}</p>
        <p>{translate("wuxing.guide.startingStatus")}: <span data-wuxing-captured>{phaseName(examples.captured)} {examples.captured}</span></p>
        <pre><code>{translate("wuxing.guide.statusExample", {phase: examples.captured})}</code></pre>
      </div>
      <p>{translate("wuxing.guide.assignmentHint")}</p>
    </section>
    <section>
      <h3>{translate("wuxing.guide.agentsHeading")}</h3>
      <p>{translate("wuxing.guide.agentsHint")}</p>
      <table><thead><tr><th scope="col">{translate("wuxing.guide.agentHeader")}</th><th scope="col">{translate("wuxing.guide.meaningHeader")}</th></tr></thead>
        <tbody>{PHASES.map(item => <tr key={item.phase}><th scope="row">{translate(item.name)} {item.phase}</th><td>{translate(item.meaning)}</td></tr>)}</tbody></table>
    </section>
    <section>
      <h3>{translate("wuxing.guide.relationshipsHeading")}</h3>
      <p>{translate("wuxing.guide.relationshipsHint")}</p>
      <table><thead><tr><th scope="col">{translate("wuxing.guide.relationHeader")}</th><th scope="col">{translate("wuxing.guide.meaningHeader")}</th><th scope="col">{translate("wuxing.guide.boundaryHeader")}</th></tr></thead>
        <tbody>{RELATIONS.map(relation => <tr key={relation}><th scope="row">{translate(`wuxing.${relation}`)}</th><td>{translate(`wuxing.guide.${relation}Body`)}</td><td>{translate(`wuxing.guide.${relation}Boundary`)}</td></tr>)}</tbody></table>
    </section>
    <section>
      <h3>{translate("wuxing.guide.navigationHeading")}</h3>
      <p>{translate("wuxing.guide.navigationBody")}</p>
    </section>
    <p className="setting-item-description">{translate("wuxing.guide.reopenHint")}</p>
    <button type="button" className="mod-cta" onClick={onClose}>{translate("wuxing.guide.close")}</button>
  </div>;
}
