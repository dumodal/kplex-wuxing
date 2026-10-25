/** Read-only learning examples for the personal A/B intake defaults, reusing the existing phase cycle. */
import { WUXING_EMOJI, type WuXingElement } from "./wuxing";

/** Return the generated and regulated phases relative to a valid example reference, without assigning metadata. */
export function wuXingStartingPhases(reference: WuXingElement): { original: WuXingElement; captured: WuXingElement } {
  const index = WUXING_EMOJI.indexOf(reference);
  return { original: WUXING_EMOJI[(index + 1) % 5], captured: WUXING_EMOJI[(index + 2) % 5] };
}
