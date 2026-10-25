# Wu Xing terminology

Working note, started 2026-10-25. Continue developing this note during the terminology and ontology discussion. This is a record of working definitions and proposals, not a finalized implementation prompt.

## 五行 Wu Xing: Five Phases

"Five Phases" is the current English translation for this project. Original term: Wu Xing (五行); pinyin: wǔ xíng. "Five Agents" remains a possible future alternative, deferred until there is more feedback.

The five phases are:

| Chinese | Pinyin | English |
| --- | --- | --- |
| 木 | mù | Wood |
| 火 | huǒ | Fire |
| 土 | tǔ | Earth |
| 金 | jīn | Metal |
| 水 | shuǐ | Water |

In this adaptation, the phases describe dynamic patterns of activity and interaction. They should not become five rigid subject categories. A note receives its phase according to the role it currently plays in the practice, rather than its subject matter or document format alone. Writing, reading, and drawing can participate in any of the five phases, depending on context and direction.

The earlier "Five Agents" exploration connected the terminology with contemporary AI practice. That framing remains a future possibility; it is not the current display name or a commitment to executable AI assistants.

Current user direction: use "Five Phases" for now, retain the original term and pinyin in the introduction, and revisit "agents" after gathering further comments.

## General cycle order and personal reference

Present the generating cycle as **Wood → Fire → Earth → Metal → Water → Wood**. This is the explanatory order used throughout the general introduction. It describes a repeating cycle, so the first phase printed in the sequence is not a permanent origin or a universal reference point. [Source: Internet Encyclopedia of Philosophy](https://iep.utm.edu/wuxing/).

Metal is the personal reference example from dumo, whose Day Master is 辛 Xin Metal. It illustrates how to read the relationships from one position within the cycle. It does not define the beginning of Wuxing or require other readers to use Metal. The interactive guide now opens with Wood and uses the digital garden as its introductory metaphor. The Metal example remains optional personal tutorial material; Heavenly Stems are not part of the current introductory classification. The selected graph note remains the temporary reference during navigation.

## Five phases and five relationship families

The phases and their relationship families are distinct layers. Wood, Fire, Earth, Metal, and Water name the phases. 同我、我生、我克、克我、生我 describe how another participant relates to a particular reference point, called "I."

| Relationship | Working English definition |
| --- | --- |
| 同我 | What shares my phase |
| 我生 | What I generate |
| 我克 | What I regulate: what I obtain from outside or bring under my influence |
| 克我 | What regulates me: direction to work toward or rules I am expected to follow |
| 生我 | What generates or nourishes me |

These English phrases explain direction. They are not settled interface labels. In particular, "regulate," "constrain," "generate," and "nourish" need further discussion before becoming a consistent vocabulary.

Water is not permanently "what I generate." It occupies that relationship when the reference point is Metal. From Wood as the reference point, Water instead occupies "what generates me."

For the K-Plex adaptation, the selected note can become the reference point. Navigating to another note changes the relationships through which the surrounding field is understood. No phase is the permanent centre of the system.

## Deferred background: 十神 Shishen

The ten Heavenly Stems and Shishen are retained here as background for possible future discussion. They are outside the current five-phase classification and onboarding. The guide uses Wood and the digital garden; it does not require a stem or a birth chart.

The ten Heavenly Stems are ordered 甲、乙、丙、丁、戊、己、庚、辛、壬、癸, beginning with 甲 Jia (jiǎ). In the BaZi correspondence used here, 甲 is Yang Wood. Keep the stem sequence distinct from the phase cycle and from the reference chosen for a particular reading. [Stem order: Hong Kong Observatory](https://www.hko.gov.hk/tc/gts/time/stemsandbranches.htm); [phase correspondence: Yi Ching Malaysia](https://yichingmalaysia.org/bazi-basic/).

"Ten Gods" is a common English rendering. A suitable translation for this project is still open.

User proposal: understand Shishen as the yin and yang sides of the five phases, with two sides for each phase. 食神 Shi Shen and 伤官 Shang Guan both belong to 我生, the phase that the reference point generates, but differ through yin-yang polarity.

Structural refinement: the distinction is between the same and opposite polarity relative to the reference point. Neither 食神 nor 伤官 is permanently yin or permanently yang.

The working structure is:

**Five phases → five relationship families relative to "I" → ten relational roles through polarity.**

| Relationship family | Same polarity as the reference point | Opposite polarity to the reference point |
| --- | --- | --- |
| 同我 | 比肩 Bi Jian | 劫财 Jie Cai |
| 我生 | 食神 Shi Shen | 伤官 Shang Guan |
| 我克 | 偏财 Pian Cai | 正财 Zheng Cai |
| 克我 | 七杀 Qi Sha | 正官 Zheng Guan |
| 生我 | 偏印 Pian Yin | 正印 Zheng Yin |

This table records the structural classification used in the BaZi Ten Gods framework. It does not establish that a corresponding classification of knowledge or notes has already been designed.

### Example: 食神 and 伤官

| Reference point | Generated phase | 食神: same polarity | 伤官: opposite polarity |
| --- | --- | --- | --- |
| 甲: Yang Wood | Fire | 丙: Yang Fire | 丁: Yin Fire |
| 乙: Yin Wood | Fire | 丁: Yin Fire | 丙: Yang Fire |

The relationship stays 我生 in both cases. The subtype depends on the polarity comparison.

### Translation proposal, not yet accepted

"Ten Relational Roles" is a proposed explanatory English name for Shishen. Keep "Shishen 十神" alongside it while evaluating the translation.

The proposal distinguishes participants from roles: the phases participate in the system; Shishen names the roles they occupy relative to a reference point. "Ten Agents" remains a possible vocabulary direction, but would need to preserve this distinction explicitly.

Do not treat these proposed names as approved terminology. English names for the individual ten roles also remain open.

## Questions for the next discussion

- What do yin and yang mean for a note in this personal knowledge system?
- Does polarity belong to a note, an activity, a relationship, or a particular context of use?
- Should polarity be explicitly recorded, manually interpreted, or left unspecified until needed?
- How should the view distinguish a phase-derived relationship from an explicitly recorded relationship, such as one note actually inspiring another?
- Which English words best preserve the directional meaning of 生 and 克 without narrowing them prematurely?
- Does "Ten Relational Roles" convey enough of 神, or should Shishen remain untranslated with an explanatory phrase?

## Current implementation boundary

The current local prototype uses five-phase `status` metadata to classify existing connections relative to the selected note. The relationship settings contain five groups and provisional bilingual aliases, but the graph projection remains status-based. A five-phase status does not provide enough information to determine a Shishen subtype: polarity and its meaning for notes remain undefined.

The terminology discussion should guide later ontology work. It does not authorize automatic polarity assignment, metadata migration, or a claim that the ten roles already work in the view.

## Sources and interpretation boundaries

Traditional structure, established translation, and personal adaptation should remain distinguishable. A note in the vault records an idea; it is not independent evidence for an external historical or doctrinal claim.

- [Wuxing terminology on Wikipedia](https://en.wikipedia.org/wiki/Wuxing_%28Chinese_philosophy%29): lists "Five Agents" and "Five Phases" among the translations.
- [Wuxing in the Internet Encyclopedia of Philosophy](https://iep.utm.edu/wuxing/): discusses the dynamic and interdependent character of the phases.
- [《三命通会》卷五](https://zh.wikisource.org/wiki/三命通會/卷五), especially “论古人立印食官财名义”: classical reference for generation, control, and polarity distinctions. This is evidence of traditional doctrine, not empirical validation of the personal knowledge-system analogy.

## Display vocabulary, 2026-10-25

The graph customization panel provides a saved English or Chinese display choice. Existing settings default to Chinese. Each label displays one language at a time. English phase labels are Wood, Fire, Earth, Metal, and Water. The working arrow verbs are "Generates" for 生 and "Regulates" for 克. Relationship-family labels use the directional definitions above, shortened to "What I regulate," "What regulates me," and "What generates me" where one display phrase is needed. These remain working translations.

This choice changes display text only. Existing property names, bilingual aliases, status values, note text, and graph connections retain their original values. The ten Shishen subtype names are not newly translated by this change.

## Ontology working session: operational definitions and vault examples

Status: discussion draft. The examples below were checked in dumodal on 2026-10-25. Their existing statuses and links are observations; the proposed relationship interpretations are questions for dumo. No note metadata or semantic rules have been changed.

### Three layers to keep distinguishable

1. Personal phase assignment: `status` records the phase assigned to a note in the personal practice. It is not an independently measured property of its subject.
2. Phase-model relationship: the current graph calculates a family from the two phase assignments relative to the selected note. This is a deterministic reading within that model.
3. Recorded contribution or constraint: a source declaration, a provenance marker, or a user-authored relationship records a particular connection. A reference documents a reference; it does not automatically establish the full meaning of 生 or 克.

A further reference question remains: existing phase assignments were developed from the personal reference point of dumo, while graph navigation makes the selected note a temporary reference point. Rotating that reference point is mathematically defined by the phase cycle. Its interpretation for actual note-to-note activity still needs to be agreed.

### Proposed operational readings

| Family | Working reading | Boundary to test |
| --- | --- | --- |
| 同我 | Shares the phase of the current reference point; participates alongside it in that mode | Does not imply agreement, identical content, or a new link |
| 我生 | The current reference point contributes to the emergence or development of the other participant | A link or citation alone does not establish this interpretation |
| 生我 | The other participant contributes to the emergence or development of the current reference point | Being older or being an external resource is insufficient by itself |
| 我克 | Something I obtain from outside or bring under my influence | Obtaining it does not oblige me to give it more attention; too much capture or management can consume time and energy |
| 克我 | Gives me a direction to work toward, or sets rules I am expected to follow | It does not necessarily support or nourish me; too much can restrict action or exhaust me |

These are proposals for the knowledge-system adaptation, not new definitions attributed to classical Wuxing. In particular, whether a recorded source contribution should be called 生 independently of phase assignments is still open.

### Five existing pairs for discussion

| Existing pair | Checked evidence | Current phase-model reading | Question for the ontology |
| --- | --- | --- | --- |
| `Fromm 1976 «To Have or to Be»` → `占有式学习 vs 存在式学习` | Book note is Wood; draft is Water. The draft names the book and chapter as its source. The book also links back with an output marker. | With the Water draft selected, the Wood book occupies 我生. | Should the recorded source contribution also be expressible as 生我 from the draft, independent of this phase-model reading? |
| `隐喻如何赋予形式以意义` → `一个我在其中的世界，而不是我和世界` | Chapter note is Wood; draft is Water. The draft embeds a specific chapter block and discusses it as background for the course design. | With the Water draft selected, the Wood chapter occupies 我生. | Does the user want to record emergence, support, conceptual constraint, or more than one relationship here? |
| `五行笔记法` → `五行文件夹结构` | Both are Metal. The methodology note links to the folder-structure note. | 同我 in both directions. | Is shared methodological mode sufficient for this family even when the notes operate at different levels of detail? |
| `五行笔记法` → `working with kplex` | Methodology note is Metal; working note is Water and links to it. The methodology describes the personal reference frame that the adaptation draws on. | From the Water working note, the Metal methodology occupies 生我. | Does it also act as a constraint on the implementation? This is a proposed interpretation, not an asserted relationship. |
| `占有式学习 vs 存在式学习` → `占有的状态 state of having` | Water draft lists the Wood concept note as related material. | The concept occupies 我生 from the draft. | Should this remain a neutral reference until a more specific relationship is deliberately recorded? |

The differing readings in the first two examples are a design test, not proof that the phase model or the phase assignments are wrong. The implementation should not silently change either interpretation to make them agree.

### Decisions pending before changing relationship behavior

- Whether explicitly recorded relationships may differ from phase-derived relationships, and how both are identified.
- Whether one pair may carry several different relationship families at once.
- Whether inverse relationships are derived for reading only, without writing duplicate properties into the other note.
- Whether a neutral reference remains available without an assigned family.
- How to retain the five-family interface while leaving Shishen polarity unspecified.

Candidate acceptance cases, subject to these decisions: distinguish phase inference from recorded fields; preserve a neutral reference; retain multiple asserted relationships if allowed; reverse 我生 and 生我, reverse 我克 and 克我, and retain 同我 when moving the reference point; leave missing phase or polarity unknown. Do not add whole-vault links merely because notes share a phase.

## Accepted onboarding direction, 2026-10-25

The existing Wu Xing `status` assignments in dumodal are the prepared foundation for this test. Do not ask dumo to relabel the vault or treat the current test as blocked on phase assignment. New users still need an explanation of the reference point before choosing statuses.

The user approved the five-family definition table and its distinctions: 同我 shares the current phase or mode without requiring agreement; 我生 contributes to the emergence or development of another; 生我 contributes to the emergence or development of the current reference; 我克 concerns what is obtained from outside or brought under influence, with the attention cost of excess capture; 克我 concerns incoming direction or rules, with the restrictive or exhausting effects of excess.

### Starting choices after defining "I"

- A: material that comes from personal thought and expression starts as 我生, "What I generate."
- B: material captured from outside, such as a web post or quotation, starts as 我克, "What I obtain" in the capture workflow. The relationship display still uses the provisional "What I regulate"; the guide explains obtaining, selecting, and working with that material.

These are defaults in the personal framework, not a universal classification by file type or an exhaustive list of all possible roles. Transformation, publication, and reflection can change the role of a note.

### Reference-dependent status examples

The reader may try a reference phase inside the guide, starting with Wood and the digital garden example. The example control is temporary: it neither edits note metadata nor saves a personal reference phase. With Wood as reference, A maps to Fire and B to Earth. The optional personal tutorial from dumo uses Metal: A maps to Water and B to Wood. The existing cycle supplies these examples. A/B are relative relationship families, not permanently fixed phase names.

For status assignment, "I" is the participant organizing the personal practice. During graph navigation, the selected note is the temporary reference for reading phase relationships. Navigating does not reassign the statuses previously given to notes. The question of explicit relationships coexisting with phase-derived readings remains separate from this onboarding change.

### Language and onboarding behavior

English is now the default for new or unspecified language preferences. Chinese remains optional; explicitly saved Chinese is retained. This supersedes the earlier Chinese fallback described above.

The reusable onboarding content introduces the reference point, A/B intake, five phases, five relationship definitions, and a short navigation exercise. The experimental fork retains a manually opened Guide preview in the bottom-left customization panel. Automatic first-use opening has been removed. The intended upstream presentation is contextual help when a Wu Xing view or template is enabled; the integration mechanism remains for the maintainer to decide. There is no forced status migration, automatic note classification, or new Shishen polarity assignment.

## Methodological foundation

[Wu Xing ontology methodology](<Wu Xing ontology methodology.md>) records the process, change, and quality principle behind this fork, with Wood as a worked example and a distinction between source grounding and the personal phenomenological interpretation. Use that note as the methodological reference when developing definitions and onboarding.

## English naming revision, 2026-10-25

The current interface uses "Five Phases." The introduction includes a small original-term side note: "Wu Xing (五行) · Pinyin: wǔ xíng." Main phase and relationship labels still use one selected display language. The side note intentionally preserves the original name and pronunciation. "Five Agents" is retained only as a possible future interpretation pending feedback; it is no longer the current introductory label.

## Regulation definitions revised, 2026-10-25

The first three definitions remain unchanged. The two regulation directions now have distinct working meanings:

- 克我, "What regulates me": incoming direction or rules to follow. These do not necessarily support or nourish me. In excess, they can restrict action or exhaust me.
- 我克, "What I regulate": what I obtain from outside or bring under my influence. Capturing it does not create an obligation to keep investing attention. Excess capture or management can consume time and energy.

"Bring under my influence" is the current wording for the user description "cast shadow power on." It does not add a separate theory of shadow, ownership, or power. The definitions describe the personal ontology being developed here, not a claim that every constraint or captured resource has the same effect.

[Wu Xing onboarding content](<Wu Xing onboarding content.md>) provides portable user-facing copy for a possible upstream Wu Xing template or view, independent of the experimental plugin startup lifecycle.


## Personal reference and digital garden entry, 2026-10-25

Accepted direction: BaZi is optional. In the personal practice of dumo, the user-confirmed 日主 (rìzhǔ, Day Master) is 辛金 (xīn jīn, Yin Metal), supplying the Metal reference. A Day Master is the Heavenly Stem of the birth day in the BaZi framework; it is not simply a freely selected stem. This traditional definition is distinct from choosing a phase as a learning perspective in this adaptation. [Practitioner reference: Master Mandy Lim](https://masterlimfengshui.com/info/learn/day-master/).

The user subsequently chose Wood (木, mù) as the default teaching reference and the digital garden as the introductory metaphor. Do not introduce the ten Heavenly Stems, polarity classification, or a birth-chart calculation requirement into the current onboarding. The earlier Jia Wood discussion explains the route to this decision; Jia is not a new classification field or a required label in the guide. Shishen and stem-related material above remains background for possible future work.

"I" names the person participating in the practice. Wood supplies the initial perspective for exploring how memories, outside information, and personal expression participate in that practice. The garden metaphor makes growth, connection, and ongoing cultivation approachable; it does not assign every note to Wood. The selected graph note remains a separate temporary reference for reading relationships, without rewriting the personally assigned statuses. [[Wu Xing ontology methodology]] develops this distinction.


## Proposed navigation and gradual classification, 2026-10-25

Current behavior, checked against the source: a known current note without valid status remains visible at the centre of the five-phase scaffold. Linked notes that cannot be classified are counted but not shown inside phase groups. The original K-Plex navigation does not require Wu Xing status; this fork does not automatically switch to that original layout when status is missing.

Proposed behavior: keep unclassified connected notes visible in the middle of the pentagon. A deliberate drop into a phase would assign a remembered `status` value. Preserve a valid saved phase when a note is selected. The user explicitly approved Wood as a default only for an unclassified current note, superseding the suggestion that every selected note would open as Wood. The existing guide already starts its temporary example with Wood; defaulting an unclassified current note during graph navigation is a separate proposed feature.

The centre in this proposal means unclassified. It is not a sixth phase or a new asserted relationship. Whether default Wood is initially a provisional display reference or is saved through an explicit first-use action remains open for discussion. No automatic writing on navigation has been implemented. Detailed sharing copy and the upstream prompt are in [[Wu Xing onboarding content]]; methodological context is in [[Wu Xing ontology methodology]].
