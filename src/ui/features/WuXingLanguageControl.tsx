/** Portable terminology selector; the host owns persistence, graph publication, and camera state. */
import type { Translator } from "../../lang";
import type { WuXingLanguage } from "../../lang/wuxing";

/** Render one selected display language with a native keyboard-accessible select. */
export function WuXingLanguageControl({ language, translate, onChange }: {
  language: WuXingLanguage;
  translate: Translator;
  onChange: (language: WuXingLanguage) => void;
}) {
  return <label className="kplex-wuxing-language">
    <span>{translate("wuxing.language")}</span>
    <select aria-label={translate("wuxing.language")} value={language}
      onChange={/** Restrict the presentation preference to the two supported languages. */ event => onChange(event.currentTarget.value === "en" ? "en" : "zh")}>
      <option value="en">{translate("wuxing.english")}</option>
      <option value="zh">{translate("wuxing.chinese")}</option>
    </select>
  </label>;
}
