/** Native Wu Xing settings contribution. Controls delegate field validation, durable serialization, incoming synchronization and presentation refresh to the existing shared settings owner. */
import type {CanvasViewSettingsContribution} from "../settingsContributions";
import {WUXING_PHASES} from "../../../core/plex/views/wuxing/configuration";

export const wuXingSettingsContribution: CanvasViewSettingsContribution = {
  id: "wuxing",
  /** Compose native pages without shadow settings, selectors or per-canvas configuration copies. */
  items: ({translate, key}) => [
    {name: translate("wuxing.about"), desc: translate("wuxing.aboutHelp")},
    {name: translate("wuxing.source"), control: {type: "dropdown", key: key("source"), options: {
      property: translate("wuxing.property"), type: translate("wuxing.noteType"), tag: translate("wuxing.tags"),
    }}},
    {name: translate("wuxing.field"), desc: translate("wuxing.fieldHelp"), control: {type: "text", key: key("field")}},
    {type: "group", heading: translate("wuxing.phases"), items: WUXING_PHASES.map(phase => ({
      type: "page", name: translate(`wuxing.${phase}`), items: [
        {name: translate("wuxing.label"), desc: translate("wuxing.labelHelp"), control: {type: "text", key: key(`${phase}Label`)}},
        {name: translate("wuxing.values"), desc: translate("wuxing.valuesHelp"), control: {type: "textarea", key: key(`${phase}Values`)}},
      ],
    }))},
    {type: "group", heading: translate("wuxing.arrangement"), items: [
      {name: translate("wuxing.order"), desc: translate("wuxing.orderHelp"), control: {type: "text", key: key("order")}},
      {name: translate("wuxing.start"), control: {type: "dropdown", key: key("start"), options: Object.fromEntries(WUXING_PHASES.map(phase => [phase, translate(`wuxing.${phase}`)]))}},
      {name: translate("wuxing.spacing"), control: {type: "slider", key: key("spacing"), min: 24, max: 200, step: 8}},
      {name: translate("wuxing.width"), control: {type: "slider", key: key("regionWidth"), min: 200, max: 640, step: 20}},
      {name: translate("wuxing.height"), control: {type: "slider", key: key("regionHeight"), min: 160, max: 600, step: 20}},
      {name: translate("wuxing.guides"), desc: translate("wuxing.guidesHelp"), control: {type: "toggle", key: key("guides")}},
      {name: translate("wuxing.tints"), control: {type: "toggle", key: key("tints")}},
    ]},
  ],
};
