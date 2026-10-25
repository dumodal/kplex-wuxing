---
title: Wu Xing onboarding content
type: onboarding-content
status:
  - 🟡
maturity: working
created: 2026-10-25
updated: 2026-10-25
tags:
  - wuxing
  - ontology
  - onboarding
related:
  - "[[Wu Xing terminology]]"
  - "[[Wu Xing ontology methodology]]"
---

# Wu Xing onboarding content

## Short overview for sharing

K-Plex Wu Xing adapts Wuxing (五行; pinyin: wǔ xíng), or Five Phases, into the spatial navigation of K-Plex. It approaches a personal knowledge system as a digital garden: a changing relationship with memories, information gathered from outside, and original expression. The phases describe qualities of activity and transformation rather than fixed subjects or file types.

The current prototype begins with existing connections between notes and reads their saved Wu Xing status. The generating and regulating cycles organize those connected notes into five phase groups relative to the selected note. Existing links determine which notes can appear; a shared phase does not create a connection. Notes need a valid phase to participate in this grouping. An unclassified current note remains visible in the centre, while unclassified connected notes are counted but omitted from the phase groups.

The proposed next step is to make navigation an ongoing classification practice. Unclassified connected notes would remain visible in the centre of the pentagon, ready to be dragged into a phase. A deliberate drop would save that phase in the note metadata. A current note with a saved phase would keep it; Wood would be the default only for an unclassified current note. This interactive workflow is a proposal for Zsolt to assess, and is not implemented in the current fork.

## Proposed interactive classification, for upstream review

Explore a Wu Xing template or view within the original K-Plex plugin that combines navigation with gradual phase assignment. Retain ordinary K-Plex navigation for notes without Wu Xing metadata. In the Wu Xing view, use the existing linked neighborhood and show unclassified connected notes in a central holding area, rather than hiding them until an external classification step is complete. Placing notes in this area must not create links, assign a phase, or imply one of the five relationship families.

Preserve a valid saved phase when a note becomes current. Use Wood as the proposed default reference only when the current note is unclassified. The Wood default should be visually distinguishable from a confirmed saved phase until the persistence behavior is agreed. The current read-only fork still leaves an unclassified current note in the centre; introducing this default into ordinary navigation is part of the proposal, separate from the already implemented Wood example in the guide.

Allow a deliberate drop into a phase group to assign the corresponding value in the existing `status` property. Reopening the note should recover its saved phase. Preserve unrelated metadata and links, show the result of the assignment, and provide a way to reverse a mistaken assignment. Explain the meaning of the two cycles and the five relationship families in contextual help. Missing or conflicting status values need an explicit handling rule; they should not be silently interpreted as an existing valid phase.

For Zsolt to assess: how this fits the custom-view or template architecture; whether the existing note-editing facilities support this kind of property assignment; how ordinary navigation and the unclassified holding area should coexist; and whether the initial Wood default should stay provisional until an explicit assignment or be saved through a separate first-use action. The user approved preserving existing phases and limiting the Wood default to unclassified current notes. Automatic metadata writing on opening is not yet an agreed requirement.

## Integration intent for the maintainer

This note supplies reusable introductory copy for a potential Wu Xing layout and ontology template inside the original K-Plex plugin. It does not prescribe a new plugin installation, a settings schema, or a particular integration API. The proposed upstream workflow is to enable a Wu Xing view or template within K-Plex, then make this contextual explanation available there. Whether integration occurs through a merge, a custom view, a template, or another mechanism remains a maintainer decision.

The experimental fork now opens its Guide preview only on explicit request. It no longer opens onboarding automatically when a graph appears. The existing modal and React content are reviewable prototypes; the prose below can be reused independently of that implementation.

Suggested presentation: show one selected language; offer a close control and an obvious way to reopen help from the active Wu Xing view or template. If a first-activation explanation is desired upstream, tie it to that feature activation rather than global K-Plex startup. These are proposals for integration, not claims about current upstream behavior.

English uses "Five Phases." Preserve the small original-term/pinyin note. "Five Agents" is deferred as a possible later framing. Existing note metadata is the foundation for the dumodal test and must not be relabeled by onboarding.

The default guide reference is now Wood, introduced through the digital garden metaphor. Heavenly Stems, a Day Master selector, and birth-chart calculation are outside this introductory classification. BaZi is optional personal background; the Metal reference from dumo may be used as a later tutorial comparison, not as the default. The existing control selects one of five phases and does not store a personal profile.

## English user-facing copy

### Getting started with Five Phases

Original term: Wu Xing (五行) · Pinyin: wǔ xíng.

Five Phases is a framework for exploring how notes participate in your practice. Start with a reference point, then consider what a note is doing in that context.

This adaptation emphasizes process, change, and quality. Phase names refer to ways of developing and relating, extending beyond the physical materials that share their names.

The generating cycle is presented as Wood → Fire → Earth → Metal → Water → Wood. It repeats continuously. The phase you choose as a reference is a position within that cycle.

### 1. Define "I"

When assigning status, "I" means you as a participant in your knowledge practice: remembering, gathering information, and developing your own expression. This guide starts with Wood as a reference, using a digital garden to explore growth, connection, and developing possibilities. You can try another phase as your reference; a birth chart is not required. In the graph, the selected note becomes a temporary reference point for reading relationships. Navigating does not reassign note statuses.

### 2. Choose a starting role for the note

#### A. What I generate

Start here for thoughts, writing, or drawings that come from your own expression. This is a starting relationship, not a permanent label for every piece of writing.

#### B. What I obtain

Start here for material captured from outside, such as a web post or quotation. This begins in the relationship currently labeled "What I regulate": something you obtain, select, and work with. The English wording is provisional.

| Reference phase | A: original expression | B: outside capture |
| --- | --- | --- |
| Wood 🟢 | Fire 🔴 | Earth 🟤 |
| Fire 🔴 | Earth 🟤 | Metal 🟡 |
| Earth 🟤 | Metal 🟡 | Water 🔵 |
| Metal 🟡 | Water 🔵 | Wood 🟢 |
| Water 🔵 | Wood 🟢 | Fire 🔴 |

The guide begins with Wood. With Wood as reference, A starts as Fire and B as Earth. The digital garden is an invitation to explore your relationships with memories, outside information, and your own expression. It does not make every note Wood. You can try each reference phase; the examples do not assign or modify note metadata.

A and B are entry points in this personal framework, not an exhaustive classification. Revisit the role when you transform, publish, or reflect on the material. If your notes already have Wu Xing status, keep those assignments for this test.

```yaml
---
status: 🔴
---
```

Example only: Fire is A for a Wood reference. Keep `status` and its emoji values unchanged across display languages.

### The five phases

These descriptions are starting metaphors. Read them in context; no phase belongs permanently to one subject, activity, or file type.

| Phase | Working meaning |
| --- | --- |
| Wood 🟢 | Growth, connection, and developing possibilities. |
| Fire 🔴 | Manifestation, sharing, and becoming visible. |
| Earth 🟤 | Integration, accumulated experience, and settling. |
| Metal 🟡 | Definition, refinement, selection, and boundaries. |
| Water 🔵 | Flow, open expression, and thoughts taking shape. |

### 3. Read the five relationships

Read each relationship from the current reference point. Phase colors provide a model-based reading; a link alone does not prove that one note actually generated or constrained another.

| Relationship | Working meaning | Keep this distinction |
| --- | --- | --- |
| What shares my phase | Shares the current phase or mode of activity. | Does not necessarily agree with me. |
| What I generate | I contribute to its emergence or development. | More specific than merely linking to it. |
| What generates me | Contributes to my emergence or development. | More specific than being older or cited. |
| What I regulate | Something I obtain from outside or bring under my influence. | Obtaining it does not oblige me to give it more attention. Too much capture or management can consume my time and energy. |
| What regulates me | Gives me a direction to work toward, or sets rules I am expected to follow. | Does not necessarily support or nourish me. Too much can restrict my action or exhaust me. |

### Try it in your vault

Open a note that already has status and follow an existing connection. The selected note changes the reference point; the five group positions stay fixed. The graph uses existing links and does not connect notes just because their phases match.

## 中文用户文案

### 五行导航入门

原词：五行。拼音：wǔ xíng（Wu Xing）。

五行是一套观察笔记如何参与实践的关系框架。先确定参照点，再判断笔记在此刻扮演什么角色。

本框架优先关注过程、变化与质感。五行名称指向发展与关联的方式，其含义超出同名的物质材料。

相生循环按木 → 火 → 土 → 金 → 水 → 木介绍，循环往复。所选参照五行是循环中的一个位置。

### 1. 定义“我”

赋予 status 时，“我”是参与知识实践的你：回忆、收集信息，并发展自己的表达。本指南以木为参照，通过数字花园理解生长、连接与可能性的发展。你可以试选其他五行作为参照，无须计算生辰八字。在图谱中，当前笔记是读取关系的临时参照点；切换笔记不会重新分配 status。

### 2. 为笔记选择起始角色

#### A. 我生

源自自己表达的想法、文字或绘画，默认从我生开始。这是起始关系，不是把所有写作永久归为同一类。

#### B. 我克

从外部捕获的材料，例如网页或摘录，默认从我克开始：我获得、选择并加以处理的对象。此关系的英文译法仍可继续讨论。

| 参照五行 | A：原创表达 | B：外部捕获 |
| --- | --- | --- |
| 木 🟢 | 火 🔴 | 土 🟤 |
| 火 🔴 | 土 🟤 | 金 🟡 |
| 土 🟤 | 金 🟡 | 水 🔵 |
| 金 🟡 | 水 🔵 | 木 🟢 |
| 水 🔵 | 木 🟢 | 火 🔴 |

本指南从木开始。以木为参照时，A 从火开始，B 从土开始。数字花园邀请你理解自己与记忆、外部信息、个人表达之间的关系；这不意味着每篇笔记都归木。你可以试选各个参照五行；这些示例不分配或修改笔记元数据。

A、B 是这套个人框架的入门起点，并非穷尽所有分类。材料被转化、发布或回看时，可以重新判断其角色。已有五行 status 的笔记，在本次测试中保留原有归类。

```yaml
---
status: 🔴
---
```

此例中，火是以木为参照时的 A。切换显示语言不改变 `status` 字段及其 emoji 值。

### 五行

以下是帮助入门的描述，需结合语境理解。任何五行都不永久对应某个主题、动作或文件类型。

| 五行 | 工作定义 |
| --- | --- |
| 木 🟢 | 生长、连接、发展可能性。 |
| 火 🔴 | 显现、分享、被看见。 |
| 土 🟤 | 整合、经验积累、沉淀。 |
| 金 🟡 | 定义、提炼、选择、边界。 |
| 水 🔵 | 流动、开放表达、思绪成形。 |

### 3. 读取五类关系

每一类关系都从当前参照点出发读取。五行颜色提供模型中的读法；一条链接本身不能证明一篇笔记实际催生或约束了另一篇。

| 关系 | 工作定义 | 需要区分 |
| --- | --- | --- |
| 同我 | 与当前参照点共享五行或活动方式。 | 不一定与我意见一致。 |
| 我生 | 我促成它的出现或发展。 | 比单纯链接到它更具体。 |
| 生我 | 它促成我的出现或发展。 | 不只是时间更早或被引用。 |
| 我克 | 我从外部获取、或纳入自身影响范围的对象。 | 获取它不等于必须继续投入注意力。过度捕获或管理会消耗我的时间与精力。 |
| 克我 | 给我行动的方向，或设定我需要遵循的规则。 | 不一定支持或滋养我。过多时可能限制行动，甚至使我耗竭。 |

### 在笔记库中试一试

打开一篇已有 status 的笔记，沿现有链接移动。所选笔记改变参照点，五行分组的位置保持固定。图谱读取已有链接，不会仅因五行相同就自动连接笔记。

## Related references

- [[Wu Xing terminology]] records the current vocabulary and decisions.
- [[Wu Xing ontology methodology]] explains process, change, quality, and the phenomenological reading behind the framework.

The source catalogs for the current preview are `src/lang/en.ts` and `src/lang/zh-TW.ts`; the portable content component is `src/ui/features/WuXingIntroductionContent.tsx`. The reference-phase examples reuse the existing cycle. Their purpose is explanation, not automatic metadata assignment.
