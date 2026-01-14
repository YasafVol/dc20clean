# DC20Clean – Trades With Multiple Attributes (Spec, Prompt, Tracker)

> Purpose
>
> - Define rules, data contracts, UI, runtime logic, tests, and migration notes for expanding Trades to support multiple governing attributes.
> - Provide a ready-to-run implementation prompt for agents/humans.
> - Track work with a task checklist and status table.

---

## 1. Summary

- Trades may be governed by one or more attributes (1–4) instead of a single attribute.
- For a given Trade and proficiency level, compute one total per allowed attribute:
  - total = masteryBonus + attributeModifier
  - masteryBonus = proficiency × 2
  - attributeModifier ∈ {finalMight, finalAgility, finalCharisma, finalIntelligence}
- Character Sheet must display all applicable totals, sorted descending, compact format: e.g., Brewing +4(A)/+3(C)/+1(I).
- Character Creation should show the list of governing attributes for each Trade.
- Knowledge Trades are still identified by tools = "none" and remain Intelligence by default (unless a future spec changes them).

---

## 2. Data Contracts

### 2.1 ITradeData (rulesdata schema)

- Old
  - attributeAssociation: 'might' | 'agility' | 'charisma' | 'intelligence'
- New
  - primaryAttribute: 'might' | 'agility' | 'charisma' | 'intelligence'
  - attributeAssociations: Array<'might' | 'agility' | 'charisma' | 'intelligence'>
  - tools: string (unchanged; "none" denotes Knowledge Trades)

Notes

- All usages that display a Trade’s governing attribute(s) must be updated to join/format `attributeAssociations`.
- Knowledge Trades continue to use tools: 'none'.

### 2.2 UI TradeData (runtime)

- Extend the UI shape used by Character Sheet for Trades:
  - Keep `bonus?: number` (for knowledge compat), and add `bonuses?: Array<{ attribute: 'might' | 'agility' | 'charisma' | 'intelligence'; total: number }>`
  - UI renders `bonuses` when present; otherwise falls back to `bonus`.

#### Normalization rules (authoritative)

- Data field name is `attributeAssociations: string[]` everywhere in code.
  - Each trade maintains a `primaryAttribute` alongside the array; it must also appear in `attributeAssociations`.
  - If Section 12 shows `attributeAssociation` as an array, treat it as `attributeAssociations` when implementing.
- Knowledge trades must use `tools: 'none'` (lowercase) for consistency with current code.
- Attribute abbreviations for UI formatting: A=Agility, M=Might, C=Charisma, I=Intelligence.

---

## 3. Canonical Trade List Changes

Apply multi-attribute mappingsand all other changes needed to `src/lib/rulesdata/trades.ts` (according to Section 12 in this document):

---

## 4. Calculation Rules

- For each selected Trade with proficiency p (0–5):
  - masteryBonus = 2 × p
  - For each allowed attribute A in `attributeAssociations`, compute total(A) = masteryBonus + finalA
  - Character sheet renders all totals sorted descending by `total(A)`; tie-breaker: A > M > C > I (or any stable order you prefer)

Acceptance example

- Attributes: Might 3, Agility 2, Charisma 1, Intelligence -1; Brewing proficiency 1 (mastery +2)
- Allowed: A, I, C → Totals: A=4, C=3, I=1 → Display: Brewing +4(A)/+3(C)/+1(I)

---

## 5. UI/UX Changes

Character Sheet

- Trades list should display proficiency dots as before.
- Next to the dots, display the compact bonuses string when `bonuses` exists, else show single `bonus` (knowledge).
- Example format: "+4(A)/+3(C)/+1(I)".

Character Creation – Trades Tab

- Where we previously showed a single attribute, show a joined list of attributes (e.g., "Agility/Intelligence/Charisma").
- Tool requirement line unchanged.

Trait Choice UI (if describing trades)

- Replace single attribute mention with joined attribute list.

---

## 6. Code Touchpoints

- Data & Types
  - `src/lib/rulesdata/schemas/types.ts` → `ITradeData.attributeAssociations: string[]`
  - `src/lib/rulesdata/trades.ts` → convert data to plural field + new entries + Vehicles updates
  - `src/types/character.ts` → extend `TradeData` with optional `bonuses` array

- Calculations/Provider Hooks
  - `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx` → in `useCharacterTrades()` compute per-attribute totals and return `bonuses`
  - Persistence (Task 0): denormalized mastery is computed during completion and saved to `SavedCharacter` (`masteryLadders.practicalTrades`, `knowledgeTradeMastery`, `skillTotals`, and per-trade totals carried via mastery ladders). The PDF transformer prefers these fields with guarded fallback.
  - Knowledge hook remains unchanged

- UI Components
  - Character Sheet Trades: `KnowledgeTrades.tsx` (and any desktop/mobile/clean variants) → render multi-bonus string
  - Character Creation: `TradesTab.tsx` → show joined `attributeAssociations`
  - Trait choice descriptors: `TraitChoiceSelector.tsx` → show joined `attributeAssociations`

- Tests
  - `src/lib/rulesdata/trades.spec.ts` → assert knowledge tools 'none'; assert multi-attribute sets exist for updated trades
  - Add a unit test for formatting a Brewing example (optional helper)

- Docs
  - Link this file from `docs/systems/BACKGROUND_SYSTEM.MD`

---

## 7. Migration & Compatibility

Saved Characters

- No change to storage schema for `tradesData` (still `Record<string, number>` proficiency).
- Denormalized fields are additive and optional: `skillTotals`, `masteryLadders`, `knowledgeTradeMastery` (used by UI/PDF when present).
- Multi-attribute remains a data and presentation change for interactive UI; persisted denorm is used for export and eventual UI migration.

Vehicles Consolidation (optional future)

- If combining `Vehicles (Land)` and `Vehicles (Water)` into one entry, a save migration must remap IDs. Out of scope for this spec.

---

## 8. Second-Order Effects / Risks

- Any place that uses `trade.attributeAssociation` must be updated to the plural `attributeAssociations` to avoid regressions.
- Sorting rule for the display string must be stable to avoid flicker when re-rendering.
- Tests and snapshots referencing single attribute strings need updates.
- Ensure newly added trades (Glassblowing, Lockpicking, Tinkering) integrate into the points system and selection limits.

---

## 9. Agent/Human Implementation Prompt

You are updating DC20Clean to support Trades with multiple governing attributes.

Do the following:

1. Data and Types

- In `src/lib/rulesdata/schemas/types.ts`, replace `attributeAssociation` with `attributeAssociations: Array<'might'|'agility'|'charisma'|'intelligence'>`.
- In `src/lib/rulesdata/trades.ts`, convert all entries to `attributeAssociations` and apply the mapping defined in this spec. Add Glassblowing, Lockpicking, Tinkering. Update Vehicles (Land/Water) tools to "Vehicle" and allow A/I/M.
- In `src/types/character.ts`, extend `TradeData` to include optional `bonuses` array while retaining `bonus` for knowledge.

2. Calculations

- In `useCharacterTrades()` (CharacterSheetProvider), compute masteryBonus = proficiency×2; for each attribute in `attributeAssociations`, compute total = masteryBonus + finalAttr. Return `bonuses` sorted desc by total. Maintain knowledge hook as-is.

3. UI

- Character Sheet Trades component(s): when `bonuses` exists, render a compact string like "+4(A)/+3(C)/+1(I)" next to the dots. If only `bonus` exists (knowledge), render it as today.
- Character Creation `TradesTab.tsx`: replace single attribute text with a joined attribute list.
- `TraitChoiceSelector.tsx`: update descriptors to show joined attributes.

4. Tests & Docs

- Update `src/lib/rulesdata/trades.spec.ts` to assert multi-attribute sets and tools for knowledge.
- Optionally add a small unit test for formatting the Brewing example.
- Link this file from `docs/systems/BACKGROUND_SYSTEM.MD` under the Trades section.

Constraints

- Do not change how Knowledge Trades are identified (tools: 'none').
- Keep saved character schema unchanged.
- Preserve formatting and coding style.

Acceptance Criteria

- Brewing example renders as: Brewing +4(A)/+3(C)/+1(I) for attributes (M=3, A=2, C=1, I=-1) with proficiency 1.
- Creation UI shows plural attribute lists for affected trades.
- All tests pass.

---

## 10. Task Tracker

### 10.1 Checklist

- [x] Update `ITradeData` to use `attributeAssociations[]`
- [x] Convert `trades.ts` data and add new entries + Vehicles updates (see Section 12)
- [x] Extend `TradeData` with `bonuses[]`
- [x] Compute multi-attribute totals in `useCharacterTrades()`
- [x] Render bonuses string in Character Sheet Trades components
- [x] Show plural attribute list in `TradesTab.tsx`
- [x] Update descriptors in `TraitChoiceSelector.tsx`
- [x] Update `trades.spec.ts` and add formatting test (optional)
- [x] Update `docs/systems/BACKGROUND_SYSTEM.MD` to link this spec

### 10.2 Status Table

| Task                        | Owner | Status    | PR  | Notes                                                                                |
| --------------------------- | ----- | --------- | --- | ------------------------------------------------------------------------------------ |
| Schema change `ITradeData`  |       | Completed |     |                                                                                      |
| Data updates `trades.ts`    |       | Completed |     | See Section 12; Include Glassblowing, Lockpicking, Tinkering; Vehicles tools=Vehicle |
| UI type `TradeData` bonuses |       | Completed |     |                                                                                      |
| Hook `useCharacterTrades()` |       | Completed |     | Compute and sort bonuses                                                             |
| Character Sheet render      |       | Completed |     | Multi-attribute string                                                               |
| Creation UI `TradesTab`     |       | Completed |     | Joined attributes display                                                            |
| TraitChoice descriptors     |       | Completed |     | Use joined attributes                                                                |
| Tests update                |       | Completed |     | Knowledge tools; attributes sets                                                     |
| Background doc link         |       | Completed |     | Link to this spec                                                                    |

---

## 11. References

- `docs/systems/BACKGROUND_SYSTEM.MD` – Background pipeline and components
- `src/lib/rulesdata/schemas/types.ts` – ITradeData
- `src/lib/rulesdata/trades.ts` – Canonical trades data
- `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx` – Character sheet data hooks
- `src/routes/character-creation/components/TradesTab.tsx` – Trades UI in creation flow
- `src/lib/rulesdata/trades.spec.ts` – Rules data tests

## 12. update trades

[
{
"id": "illustration",
"name": "Illustration",
"attributeAssociation": ["agility"],
"description": "Illustration is the ability to put ink or paint to paper to create beautiful art in drawings, paintings, and calligraphy.",
"tools": "Calligrapher's Supplies"
},
{
"id": "musician",
"name": "Musician",
"attributeAssociation": ["agility", "charisma"],
"description": "Musicians are skilled in the use of a variety of instruments, which they can use to make impressive performances of sound.",
"tools": "Musical Instrument"
},
{
"id": "theatre",
"name": "Theatre",
"attributeAssociation": ["charisma"],
"description": "Theatre is the art of expressive performance, through acting, dancing, singing, or even juggling or other dazzling displays.",
"tools": "None"
},
{
"id": "alchemy",
"name": "Alchemy",
"attributeAssociation": ["intelligence", "agility"],
"description": "Alchemy is the practice of creating something by combining or changing other things, such as creating magical potions or changing one element into another.",
"tools": "Alchemist's Supplies"
},
{
"id": "blacksmithing",
"name": "Blacksmithing",
"attributeAssociation": ["might"],
"description": "Blacksmithing is the practice of melting and shaping metal into objects, such as nails, horse shoes, or armor and weapons.",
"tools": "Blacksmith's Tools"
},
{
"id": "glassblowing",
"name": "Glassblowing",
"attributeAssociation": ["agility", "might"],
"description": "Glassblowing is the practice of blowing molten sand into glass objects, such as cups, bowls, vases, ornaments, lenses, window panes, and other objects.",
"tools": "Glassblower's Tools"
},
{
"id": "herbalism",
"name": "Herbalism",
"attributeAssociation": ["intelligence"],
"description": "Herbalism is the practice of combining various mundane plants to create concoctions that can be used to treat afflictions, heal wounds, or poison enemies.",
"tools": "Herbalist's Supplies"
},
{
"id": "jeweler",
"name": "Jeweler",
"attributeAssociation": ["agility"],
"description": "Jewelers can beautify, identify, and even price various gems, stones, and jewelry, and can identify magical gems or the magical uses of mundane gems.",
"tools": "Jeweler's Tools"
},
{
"id": "leatherworking",
"name": "Leatherworking",
"attributeAssociation": ["agility"],
"description": "Leatherworking is the practice of making leather from animal skins or making leather into useable items, such as clothing, armor, weapons sheathes, and other objects.",
"tools": "Leatherworker's Tools"
},
{
"id": "sculpting",
"name": "Sculpting",
"attributeAssociation": ["agility"],
"description": "Sculpting is the practice of shaping bone, clay, glass, stone, or wood into figures, tools, idols, or simple weapons.",
"tools": "Sculptor's Tools"
},
{
"id": "tinkering",
"name": "Tinkering",
"attributeAssociation": ["agility", "intelligence"],
"description": "Tinkering is the practice of making, repairing, or operating mechanisms, such as traps, and clockwork devices.",
"tools": "Tinkerer's Tools"
},
{
"id": "weaving",
"name": "Weaving",
"attributeAssociation": ["agility"],
"description": "Weaving is the practice of creating material for clothing or using such material to create clothes, curtains, tapestries, and other woven objects.",
"tools": "Weaver's Tools"
},
{
"id": "arcana",
"name": "Arcana",
"attributeAssociation": ["intelligence"],
"description": "Arcane knowledge encompasses the study of arcane magic, the planes of existence, and the underlying principles that govern reality beyond mundane understanding.",
"tools": "None"
},
{
"id": "engineering",
"name": "Engineering",
"attributeAssociation": ["intelligence"],
"description": "Engineering represents a character's understanding of mechanics, construction, and the application of scientific principles in a world that blends magic and technology.",
"tools": "None"
},
{
"id": "history",
"name": "History",
"attributeAssociation": ["intelligence"],
"description": "History involves the study of past events, including recorded events, ancient lore, and provides insight into how civilizations, cultures, and legends have shaped the present world.",
"tools": "None"
},
{
"id": "nature",
"name": "Nature",
"attributeAssociation": ["intelligence"],
"description": "Nature represents a character's understanding of the natural world, including the elements, weather patterns, and magical and mundane ecosystems.",
"tools": "None"
},
{
"id": "occultism",
"name": "Occultism",
"attributeAssociation": ["intelligence"],
"description": "Occultism represents a character's understanding of forbidden magic, secret cults, and the dealings of sinister creatures.",
"tools": "None"
},
{
"id": "religion",
"name": "Religion",
"attributeAssociation": ["intelligence"],
"description": "Religion represents a character's understanding of divine magic, deities, and religious organizations.",
"tools": "None"
},
{
"id": "brewing",
"name": "Brewing",
"attributeAssociation": ["agility", "intelligence", "charisma"],
"description": "Brewing is the practice of producing alcohol, especially beer, mead, and wine.",
"tools": "Brewer's Supplies"
},
{
"id": "carpentry",
"name": "Carpentry",
"attributeAssociation": ["agility", "might"],
"description": "Carpentry is the practice of measuring, cutting, and installing pieces of wood to creature structures that form buildings, bridges, ships, and other large structures.",
"tools": "Carpenter's Tools"
},
{
"id": "cartography",
"name": "Cartography",
"attributeAssociation": ["intelligence", "agility"],
"description": "Cartography is the practice of drawing and understanding maps.",
"tools": "Cartographer's Tools"
},
{
"id": "cooking",
"name": "Cooking",
"attributeAssociation": ["agility", "intelligence", "charisma"],
"description": "Cooking is the practice of preparing, mixing, and heating edible ingredients to create meals.",
"tools": "Cooking Utensils"
},
{
"id": "masonry",
"name": "Masonry",
"attributeAssociation": ["might"],
"description": "Masonry is the practice of working and installing stone into structures that form buildings, bridges, furnaces, and other large structures.",
"tools": "Mason's Tools"
},
{
"id": "vehicles",
"name": "Vehicles",
"attributeAssociation": ["agility", "intelligence", "might"],
"description": "Vehicles covers the practice of managing, operating, and steering vehicles, whether on land, sea, or air.",
"tools": "Vehicle"
},
{
"id": "cryptography",
"name": "Cryptography",
"attributeAssociation": ["intelligence"],
"description": "Cryptography is the process of converting messages into secret or disguised words to protect them from being understood. The message must be deciphered to discern its true meaning.",
"tools": "Cryptographer's Tools"
},
{
"id": "disguise",
"name": "Disguise",
"attributeAssociation": ["agility", "charisma"],
"description": "The art of disguise is in the ability to alter one's appearance to conceal identity or appear as someone else.",
"tools": "Disguise Kit"
},
{
"id": "gaming",
"name": "Gaming",
"attributeAssociation": ["intelligence", "charisma"],
"description": "Gaming is the practice of playing games skillfully, for money or for entertainment.",
"tools": "Gaming Set"
},
{
"id": "lockpicking",
"name": "Lockpicking",
"attributeAssociation": ["agility", "intelligence"],
"description": "Lockpicking is the practice of opening devices secured by interworking mechanisms, such as locks and traps.",
"tools": "Lockpicking Tools"
}
]

## 13. ID Rename & Migration Policy

- Default policy: preserve existing IDs unless explicitly stated below.
- Specific remaps for this task:
  - `music` → keep as `music` id, but set name to "Musician" (no ID change)
  - `thieves` → keep as `thieves` id, but set name to "Lockpicking" (no ID change)
  - `deciphering` → keep as `deciphering` id, but set name to "Cryptography" (no ID change)
  - `vehicles_land` and `vehicles_water` → keep both entries (no consolidation) to avoid breaking existing saves; update attributes/tools only
- New trades added in Section 12 use new IDs as listed.
- If you strongly prefer consolidating vehicles into a single `vehicles` entry, do it in a separate migration PR that remaps saved characters.

---
