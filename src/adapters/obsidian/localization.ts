/** Supplies the host translator with an optional live, single-language Wu Xing display overlay. */
import { getLanguage } from "obsidian";
import { createTranslator, type Translator } from "../../lang";
import { createWuXingTranslator, type WuXingLanguage } from "../../lang/wuxing";

/** Preserve host UI language while the fork independently selects English or Chinese terminology. */
export function createObsidianTranslator(wuXing = false, readLanguage: () => WuXingLanguage = () => "en"): Translator {
  const base = createTranslator(getLanguage() || "en");
  return wuXing ? createWuXingTranslator(base, readLanguage) : base;
}
