# Campaign Events — Expanded Design

**Date:** 2026-06-30
**Status:** Approved
**Related:** docs/systems/CAMPAIGN_SYSTEM.MD

---

## Problem

The campaign event feed only tracks HP threshold crossings (bloodied, dead, recovered). DMs and players want richer session logs: dice results, rage/wild form activations, spell casts, condition tracking.

---

## Scope

Add 9 new event types, a wild form toggle, a dice-roll callback, a spell "Cast" button, a `useCampaignStateEvents` hook, and a filter panel on the campaign feed. Rename the existing `useCampaignEventProducer` to `useCampaignVitalEvents` to clarify the timing split.

---

## Event Types (complete list after this feature)

### Existing (unchanged)
| Type | Trigger |
|---|---|
| `member_joined` | User joins campaign |
| `character_shared` | Character shared into campaign |
| `bloodied` | HP drops to ≤50% max |
| `well_bloodied` | HP drops to ≤25% max |
| `deaths_door` | HP reaches 0 |
| `dead` | All death step boxes checked |
| `recovered` | HP rises back above 50% (healthy) |

### New events
| Type | Payload | Trigger |
|---|---|---|
| `dice_roll` | `{ characterName, label, mode, allResults, takenResult, modifier, total }` | Every roll completed in DiceRoller |
| `rage_start` | `{ characterName }` | Rage toggle: false → true |
| `rage_end` | `{ characterName }` | Rage toggle: true → false |
| `wild_form_enter` | `{ characterName }` | Wild Form toggle: false → true |
| `wild_form_exit` | `{ characterName }` | Wild Form toggle: true → false |
| `spell_cast` | `{ characterName, spellName, sustained }` | "Cast" button clicked on a spell row |
| `maneuver_used` | `{ characterName, maneuverName }` | "Use" button clicked on a maneuver row |
| `short_rest` | `{ characterName }` | Short Rest button pressed |
| `long_rest` | `{ characterName }` | Long Rest button pressed |
| `condition_gained` | `{ characterName, conditionId }` | Condition added to `activeConditions` |
| `condition_cured` | `{ characterName, conditionId }` | Condition removed from `activeConditions` |
| `exhaustion_changed` | `{ characterName, level, prevLevel }` | `exhaustionLevel` changes |

### `dice_roll` payload detail

```typescript
{
  characterName: string;
  label: string;           // "Athletics Check", "Fireball", "d20"
  mode: 'normal' | 'advantage' | 'disadvantage';
  allResults: number[];    // all dice rolled (e.g. [18, 12, 7] for 3d20 advantage)
  takenResult: number;     // the result that counts (highest for adv, lowest for disadv)
  modifier: number;        // bonus added to takenResult
  total: number;           // takenResult + modifier
}
```

Feed display:
```
[d] Yokhanan: Athletics Check — [18, 12, 7] advantage, took 18 + 3 = 21
[d] Yokhanan: d20 — [14] + 0 = 14
```

---

## Architecture

### Hook split (timing)

| Hook | Timing | Watches |
|---|---|---|
| `useCampaignVitalEvents` (renamed from `useCampaignEventProducer`) | Post-save | `savedHP`, `savedMaxHP`, `savedIsDead` |
| `useCampaignStateEvents` (new) | Immediate on state change | `isRaging`, `isWildFormed`, `activeConditions`, `exhaustionLevel` |

Both hooks live alongside `CharacterSheetProvider` and are mounted inside it. Both call `useCampaignsForCharacter` and `useCampaignMutations().postEvent`.

### UI callback flow

```
CharacterSheetProvider
  └── handleDiceRoll(result)      → postEvent('dice_roll', ...)    per campaign
  └── handleSpellCast(spell)      → postEvent('spell_cast', ...)   per campaign
  └── handleManeuverUse(maneuver) → postEvent('maneuver_used', ...) per campaign
  └── handleShortRest()           → postEvent('short_rest', ...)   per campaign
  └── handleLongRest()            → postEvent('long_rest', ...)    per campaign
        ↓ passed as props
  CharacterSheetRedesign
    └── DiceRoller    [onRollComplete={handleDiceRoll}]
    └── SpellList     [onSpellCast={handleSpellCast}]
    └── ManeuverList  [onManeuverUse={handleManeuverUse}]
    └── RestButtons   [onShortRest={handleShortRest} onLongRest={handleLongRest}]
```

Provider creates the callbacks only when `campaignLinks.length > 0` (no-op if not in any campaign).

---

## Files Changed

| File | Change |
|---|---|
| `src/routes/character-sheet/hooks/useCampaignEventProducer.ts` | Rename → `useCampaignVitalEvents.ts` |
| `src/routes/character-sheet/hooks/useCampaignStateEvents.ts` | New — watches rage/wild form/conditions/exhaustion |
| `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx` | Mount `useCampaignStateEvents`; create `handleDiceRoll`, `handleSpellCast` callbacks; update producer import |
| `src/routes/character-sheet/hooks/useCharacterSheetReducer.ts` | Add `SET_WILD_FORM_ACTIVE` action + `isWildFormed` state (mirrors rage) |
| `src/routes/character-sheet/CharacterSheetRedesign.tsx` | Show wild form toggle for druids (`druid_wild_form` feature); pass `onRollComplete`, `onSpellCast` props |
| `src/routes/character-sheet/components/DiceRoller.tsx` | Add `onRollComplete?: (result: DiceRollResult) => void` prop; call after every roll |
| `src/routes/character-sheet/components/Spells.tsx` (or spell list) | Add "Cast" button per row; call `onSpellCast(spell)` |
| `src/routes/character-sheet/components/Maneuvers.tsx` (or maneuver list) | Add "Use" button per row; call `onManeuverUse(maneuver)` |
| `src/routes/character-sheet/components/RestButtons.tsx` (or wherever rest buttons live) | Call `onShortRest()` / `onLongRest()` callbacks after rest logic completes |
| `src/routes/campaigns/CampaignDetail.tsx` | Add `formatEvent` cases for 9 new types; add filter panel |
| `src/lib/hooks/useCampaignToasts.ts` | Add `eventMessage` cases + warning variants for rage/wild form/deaths |

---

## Wild Form Toggle

Mirrors rage exactly:

```typescript
// Reducer
| { type: 'SET_WILD_FORM_ACTIVE'; isWildFormed: boolean }

// State path: state.currentValues.isWildFormed
// Exposed: setWildFormActive(bool) callback from useCharacterSheetReducer
```

Visibility condition in CharacterSheetRedesign:
```typescript
const hasWildFormFeature =
  (characterData.unlockedFeatureIds || []).includes('druid_wild_form');
```

Toggle shown next to rage toggle when condition is met.

---

## Feed Filter Panel

Displayed above the event feed in `CampaignDetail`. Persisted to `localStorage` under key `campaign-feed-filters-{campaignId}`.

**Filter categories:**
| Category | Event types included |
|---|---|
| HP / Vitals | `bloodied`, `well_bloodied`, `deaths_door`, `dead`, `recovered` |
| Dice Rolls | `dice_roll` |
| Combat Actions | `rage_start`, `rage_end`, `wild_form_enter`, `wild_form_exit` |
| Spells | `spell_cast`, `maneuver_used` |
| Rests | `short_rest`, `long_rest` |
| Conditions | `condition_gained`, `condition_cured`, `exhaustion_changed` |
| System | `member_joined`, `character_shared` |

Default: all categories enabled. Filter state is local-only (not synced to Convex).

---

## `useCampaignStateEvents` Design

```typescript
export function useCampaignStateEvents(
  characterId: string | null,
  readOnly: boolean,
  isRaging: boolean,
  isWildFormed: boolean,
  activeConditions: string[],
  exhaustionLevel: number,
  characterName: string | null,
) {
  const campaignLinks = useCampaignsForCharacter(readOnly ? null : characterId);
  const { postEvent } = useCampaignMutations();
  // useRef for prev values of each tracked field
  // On change: fire postEvent immediately (no debounce)
  // First-load guard (undefined sentinel) same pattern as useCampaignVitalEvents
}
```

Condition diff: compare arrays to find added/removed IDs.
Exhaustion diff: compare prev number vs current; include both in payload.

---

## Out of Scope

- Filtering synced across users (Convex) — local filter state only
- Roll history panel — separate feature
- Spell sustain tracking (which spells currently sustained) — separate feature
- Events for non-campaign (local-only) sessions

---

## Known Limitations

- `dice_roll` events fire for ALL rolls including private/test rolls — no "share" gate
- Condition IDs posted as raw strings (e.g. `"slowed_1"`) — display layer maps to human name
- Wild form toggle is manual; app does not validate MP cost
