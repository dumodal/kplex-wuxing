/** Host-free, single-language Wu Xing display overlays; metadata aliases remain unchanged. */
import { createTranslator, type TranslationKey, type Translator } from "./index";

export type WuXingLanguage = "en" | "zh";
export const wuXingTerms: Partial<Record<TranslationKey, string>> = {
  "role.parent": "生我",
  "role.child": "我生",
  "role.friend": "克我",
  "role.challenger": "我克",
  "role.friendLeft": "克我",
  "role.challengerRight": "我克",
  "role.previous": "同我",
  "role.next": "我克",
  "role.sibling": "同我",
  "app.zoneParents": "生我",
  "app.zoneFriendsPrevious": "克我",
  "app.zoneChallengersNext": "我克",
  "app.zoneChildren": "我生",
  "graph.zoneParents": "生我",
  "graph.zoneChildren": "我生",
  "graph.zoneFriendsPrevious": "克我",
  "graph.zoneChallengersNext": "我克",
  "graph.zoneSiblings": "同我",
  "view.displayName": "K-Plex Wu Xing"
};

/** English relationship directions follow the working terminology note rather than legacy kinship labels. */
const englishTerms: Partial<Record<TranslationKey, string>> = {
  "role.parent": "What generates me", "role.child": "What I generate",
  "role.friend": "What regulates me", "role.friendLeft": "What regulates me",
  "role.challenger": "What I regulate", "role.challengerRight": "What I regulate",
  "role.previous": "What shares my phase", "role.sibling": "What shares my phase", "role.next": "What I regulate",
  "app.zoneParents": "What generates me", "app.zoneChildren": "What I generate",
  "app.zoneFriendsPrevious": "What regulates me", "app.zoneChallengersNext": "What I regulate",
  "graph.zoneParents": "What generates me", "graph.zoneChildren": "What I generate",
  "graph.zoneFriendsPrevious": "What regulates me", "graph.zoneChallengersNext": "What I regulate",
  "graph.zoneSiblings": "What shares my phase", "view.displayName": "K-Plex Wu Xing",
};

/** Overlay only Wu Xing copy, resolving the current saved choice on each call without replacing host UI language. */
export function createWuXingTranslator(base: Translator, readLanguage: () => WuXingLanguage): Translator {
  const english = createTranslator("en"), chinese = createTranslator("zh-TW");
  return ((key, ...args) => {
    const useEnglish = readLanguage() !== "zh";
    if (key.startsWith("wuxing.")) return Reflect.apply(useEnglish ? english : chinese, undefined, [key, ...args]);
    return (useEnglish ? englishTerms : wuXingTerms)[key] ?? Reflect.apply(base, undefined, [key, ...args]);
  });
}
