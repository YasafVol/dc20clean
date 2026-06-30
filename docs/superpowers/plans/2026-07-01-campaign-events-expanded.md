# Campaign Events — Expanded Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 12 new campaign event types (dice rolls, rage, wild form, spells, maneuvers, long rest, conditions, exhaustion) and a filter panel to the campaign event feed.

**Architecture:** Rename `useCampaignEventProducer` → `useCampaignVitalEvents` (post-save HP/death events). New `useCampaignStateEvents` hook handles immediate state-change events (rage, wild form, conditions, exhaustion). Provider creates UI callbacks for dice rolls, spell casts, maneuver uses, and long rests — it gains direct access to `campaignLinks`/`postEvent`. Filter panel in `CampaignDetail` persists per-campaign to localStorage.

**Tech Stack:** React 19, TypeScript, Convex (`postEvent` mutation), localStorage for filter state.

## Global Constraints

- No new npm dependencies
- All new event types use `type: string` — no Convex schema changes needed
- Short rest events are out of scope (short rest not yet implemented in codebase)
- `readOnly=true` characters (campaign viewers) must never fire events
- All `useEffect` dependency arrays that intentionally omit values get `// eslint-disable-line react-hooks/exhaustive-deps`
- Run `npx tsc --noEmit` after every task before committing

---

## File Map

| File | Change |
|---|---|
| `src/routes/character-sheet/hooks/useCampaignVitalEvents.ts` | New (renamed from `useCampaignEventProducer.ts`) |
| `src/routes/character-sheet/hooks/useCampaignEventProducer.ts` | Delete |
| `src/routes/character-sheet/hooks/useCampaignStateEvents.ts` | New |
| `src/routes/character-sheet/hooks/useCharacterSheetReducer.ts` | Add `SET_WILD_FORM_ACTIVE` action + `setWildFormActive` callback |
| `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx` | Mount new hooks; add `campaignLinks`, `postEvent`, and UI callbacks to context |
| `src/routes/character-sheet/CharacterSheetRedesign.tsx` | Wild form toggle UI; wire `onRoll`, `onSpellCast`, `onManeuverUse`; call long rest event |
| `src/routes/character-sheet/components/DiceRoller.tsx` | Extend `onRoll` callback signature to include `modifier` and `label` |
| `src/routes/character-sheet/components/Spells.tsx` | Add `onSpellCast` prop + Cast button |
| `src/routes/character-sheet/components/Maneuvers.tsx` | Add `onManeuverUse` prop + Use button |
| `src/routes/campaigns/CampaignDetail.tsx` | Update `formatEvent`; add filter panel |
| `src/lib/hooks/useCampaignToasts.ts` | Update `eventMessage` + variant logic |

---

## Task 1: Rename useCampaignEventProducer → useCampaignVitalEvents

**Files:**
- Create: `src/routes/character-sheet/hooks/useCampaignVitalEvents.ts`
- Delete: `src/routes/character-sheet/hooks/useCampaignEventProducer.ts`
- Modify: `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`

**Interfaces:**
- Produces: `useCampaignVitalEvents(characterId, readOnly, savedHP, savedMaxHP, characterName, deathThreshold, savedIsDead): void` — identical behavior to old hook, new name.

- [ ] **Step 1: Create useCampaignVitalEvents.ts**

Content is identical to `useCampaignEventProducer.ts` — only the export name changes:

```typescript
// src/routes/character-sheet/hooks/useCampaignVitalEvents.ts
import { useEffect, useRef } from 'react';
import { getHealthStatus } from '../../../lib/rulesdata/death';
import { useCampaignsForCharacter, useCampaignMutations } from '../../../lib/hooks/useCampaigns';

export function useCampaignVitalEvents(
	characterId: string | null,
	readOnly: boolean,
	savedHP: number | null,
	savedMaxHP: number | null,
	characterName: string | null,
	deathThreshold: number,
	savedIsDead: boolean
) {
	const campaignLinks = useCampaignsForCharacter(readOnly ? null : characterId);
	const { postEvent } = useCampaignMutations();
	const prevStatusRef = useRef<string | null>(null);
	const prevIsDeadRef = useRef<boolean | undefined>(undefined);

	useEffect(() => {
		if (readOnly || !characterId || savedHP === null || savedMaxHP === null) return;
		const status = getHealthStatus(savedHP, savedMaxHP, deathThreshold).status;
		const prevStatus = prevStatusRef.current;
		if (prevStatus === null) {
			prevStatusRef.current = status;
			return;
		}
		prevStatusRef.current = status;
		if (campaignLinks.length === 0) return;
		const NOTABLE = new Set(['bloodied', 'well-bloodied', 'deaths-door', 'healthy']);
		if (!NOTABLE.has(status) || status === prevStatus) return;
		const type =
			status === 'healthy'      ? 'recovered'   :
			status === 'bloodied'     ? 'bloodied'    :
			status === 'well-bloodied'? 'well_bloodied':
			'deaths_door';
		const payload = { characterName: characterName ?? 'Unknown', currentHP: savedHP, maxHP: savedMaxHP };
		for (const { campaignDocId } of campaignLinks) {
			postEvent(campaignDocId, type, payload, characterId).catch(() => {});
		}
	}, [savedHP, savedMaxHP, campaignLinks.length]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (readOnly || !characterId) return;
		const prevIsDead = prevIsDeadRef.current;
		prevIsDeadRef.current = savedIsDead;
		if (prevIsDead === undefined) return;
		if (!savedIsDead || savedIsDead === prevIsDead) return;
		if (campaignLinks.length === 0) return;
		const payload = { characterName: characterName ?? 'Unknown' };
		for (const { campaignDocId } of campaignLinks) {
			postEvent(campaignDocId, 'dead', payload, characterId).catch(() => {});
		}
	}, [savedIsDead, campaignLinks.length]); // eslint-disable-line react-hooks/exhaustive-deps
}
```

- [ ] **Step 2: Update CharacterSheetProvider.tsx**

Find and replace the import:
```typescript
// Before:
import { useCampaignEventProducer } from './useCampaignEventProducer';
// After:
import { useCampaignVitalEvents } from './useCampaignVitalEvents';
```

Find and replace the call (search `useCampaignEventProducer(`):
```typescript
// Before:
useCampaignEventProducer(
// After:
useCampaignVitalEvents(
```

- [ ] **Step 3: Delete old file**

```bash
git rm src/routes/character-sheet/hooks/useCampaignEventProducer.ts
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```
Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add src/routes/character-sheet/hooks/useCampaignVitalEvents.ts \
        src/routes/character-sheet/hooks/CharacterSheetProvider.tsx
git commit -m "refactor(campaigns): rename useCampaignEventProducer → useCampaignVitalEvents"
```

---

## Task 2: Add wild form to reducer

**Files:**
- Modify: `src/routes/character-sheet/hooks/useCharacterSheetReducer.ts`

**Interfaces:**
- Produces: `setWildFormActive(isWildFormed: boolean): void` — exported callback, mirrors `setRageActive`
- Produces: `state.character.characterState.ui.combatToggles.isWildFormed: boolean`

- [ ] **Step 1: Read the SET_RAGE_ACTIVE case (lines ~599–620)**

Open `src/routes/character-sheet/hooks/useCharacterSheetReducer.ts` and read the `SET_RAGE_ACTIVE` case. Note the exact state mutation pattern (immer produce, direct assignment, `ensureCharacterState`, etc.). The wild form case must follow it exactly.

- [ ] **Step 2: Add action type to union**

Find the discriminated union where `SET_RAGE_ACTIVE` is declared (near line 55). Add directly after it:

```typescript
| { type: 'SET_WILD_FORM_ACTIVE'; isWildFormed: boolean }
```

- [ ] **Step 3: Handle action in switch**

Find `case 'SET_RAGE_ACTIVE':`. Add a new case immediately after its closing brace, mirroring it exactly but targeting `isWildFormed`:

```typescript
case 'SET_WILD_FORM_ACTIVE': {
    // Paste the exact body of SET_RAGE_ACTIVE here, then:
    // Replace: characterState.ui.combatToggles.isRaging = action.isRaging
    // With:    characterState.ui.combatToggles.isWildFormed = action.isWildFormed
    break;
}
```

- [ ] **Step 4: Export setWildFormActive callback**

Find where `setRageActive` is created (near line 783). Add directly after it:

```typescript
const setWildFormActive = useCallback((isWildFormed: boolean) => {
    if (readOnly) return;
    dispatch({ type: 'SET_WILD_FORM_ACTIVE', isWildFormed });
}, [readOnly]);
```

Add `setWildFormActive` to the hook's return object (same place `setRageActive` is returned).

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add src/routes/character-sheet/hooks/useCharacterSheetReducer.ts
git commit -m "feat(campaigns): add SET_WILD_FORM_ACTIVE reducer action + setWildFormActive callback"
```

---

## Task 3: Create useCampaignStateEvents + mount in Provider

**Files:**
- Create: `src/routes/character-sheet/hooks/useCampaignStateEvents.ts`
- Modify: `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`

**Interfaces:**
- Consumes: `useCampaignsForCharacter`, `useCampaignMutations` from `src/lib/hooks/useCampaigns`
- Produces: `useCampaignStateEvents(characterId, readOnly, isRaging, isWildFormed, activeConditions, exhaustionLevel, characterName): void`

- [ ] **Step 1: Create useCampaignStateEvents.ts**

```typescript
// src/routes/character-sheet/hooks/useCampaignStateEvents.ts
import { useEffect, useRef } from 'react';
import { useCampaignsForCharacter, useCampaignMutations } from '../../../lib/hooks/useCampaigns';

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

	const prevIsRagingRef = useRef<boolean | undefined>(undefined);
	const prevIsWildFormedRef = useRef<boolean | undefined>(undefined);
	const prevConditionsRef = useRef<string[] | undefined>(undefined);
	const prevExhaustionRef = useRef<number | undefined>(undefined);

	// Rage
	useEffect(() => {
		if (readOnly || !characterId) return;
		const prev = prevIsRagingRef.current;
		prevIsRagingRef.current = isRaging;
		if (prev === undefined || isRaging === prev || campaignLinks.length === 0) return;
		const payload = { characterName: characterName ?? 'Unknown' };
		for (const { campaignDocId } of campaignLinks) {
			postEvent(campaignDocId, isRaging ? 'rage_start' : 'rage_end', payload, characterId).catch(() => {});
		}
	}, [isRaging, campaignLinks.length]); // eslint-disable-line react-hooks/exhaustive-deps

	// Wild form
	useEffect(() => {
		if (readOnly || !characterId) return;
		const prev = prevIsWildFormedRef.current;
		prevIsWildFormedRef.current = isWildFormed;
		if (prev === undefined || isWildFormed === prev || campaignLinks.length === 0) return;
		const payload = { characterName: characterName ?? 'Unknown' };
		for (const { campaignDocId } of campaignLinks) {
			postEvent(campaignDocId, isWildFormed ? 'wild_form_enter' : 'wild_form_exit', payload, characterId).catch(() => {});
		}
	}, [isWildFormed, campaignLinks.length]); // eslint-disable-line react-hooks/exhaustive-deps

	// Conditions — use joined string as dep to avoid array-reference churn
	const conditionsKey = activeConditions.join(',');
	useEffect(() => {
		if (readOnly || !characterId) return;
		const prev = prevConditionsRef.current;
		prevConditionsRef.current = [...activeConditions];
		if (prev === undefined || campaignLinks.length === 0) return;
		const prevSet = new Set(prev);
		const currSet = new Set(activeConditions);
		for (const conditionId of activeConditions.filter(c => !prevSet.has(c))) {
			for (const { campaignDocId } of campaignLinks) {
				postEvent(campaignDocId, 'condition_gained', { characterName: characterName ?? 'Unknown', conditionId }, characterId).catch(() => {});
			}
		}
		for (const conditionId of prev.filter(c => !currSet.has(c))) {
			for (const { campaignDocId } of campaignLinks) {
				postEvent(campaignDocId, 'condition_cured', { characterName: characterName ?? 'Unknown', conditionId }, characterId).catch(() => {});
			}
		}
	}, [conditionsKey, campaignLinks.length]); // eslint-disable-line react-hooks/exhaustive-deps

	// Exhaustion
	useEffect(() => {
		if (readOnly || !characterId) return;
		const prev = prevExhaustionRef.current;
		prevExhaustionRef.current = exhaustionLevel;
		if (prev === undefined || exhaustionLevel === prev || campaignLinks.length === 0) return;
		const payload = { characterName: characterName ?? 'Unknown', level: exhaustionLevel, prevLevel: prev };
		for (const { campaignDocId } of campaignLinks) {
			postEvent(campaignDocId, 'exhaustion_changed', payload, characterId).catch(() => {});
		}
	}, [exhaustionLevel, campaignLinks.length]); // eslint-disable-line react-hooks/exhaustive-deps
}
```

- [ ] **Step 2: Mount in CharacterSheetProvider.tsx**

Add import:
```typescript
import { useCampaignStateEvents } from './useCampaignStateEvents';
```

Inside the provider function, find where `useCampaignVitalEvents` is called. Add directly after it:

```typescript
useCampaignStateEvents(
	state.character?.id ?? null,
	readOnly,
	state.character?.characterState?.ui?.combatToggles?.isRaging ?? false,
	state.character?.characterState?.ui?.combatToggles?.isWildFormed ?? false,
	state.character?.characterState?.activeConditions ?? [],
	state.character?.characterState?.resources?.current?.exhaustionLevel ?? 0,
	state.character?.finalName ?? null,
);
```

Also extract `setWildFormActive` from the reducer destructure and add it to the context value and context type:
```typescript
// In reducer destructure:
const { ..., setRageActive, setWildFormActive, ... } = useCharacterSheetReducer(...);

// In context value object:
setWildFormActive,

// In context type interface:
setWildFormActive: (isWildFormed: boolean) => void;
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Test rage + condition events**

```bash
npm run dev
```

1. Open a barbarian character sheet in a campaign (non-readOnly).
2. Toggle rage on — verify `rage_start` event appears in campaign feed.
3. Toggle rage off — verify `rage_end` appears.
4. Add a condition (Poisoned) — verify `condition_gained` appears.
5. Remove it — verify `condition_cured` appears.
6. Change exhaustion level — verify `exhaustion_changed` appears with `level` and `prevLevel`.

- [ ] **Step 5: Commit**

```bash
git add src/routes/character-sheet/hooks/useCampaignStateEvents.ts \
        src/routes/character-sheet/hooks/CharacterSheetProvider.tsx
git commit -m "feat(campaigns): add useCampaignStateEvents — rage, wild form, conditions, exhaustion"
```

---

## Task 4: Wild form toggle UI

**Files:**
- Modify: `src/routes/character-sheet/CharacterSheetRedesign.tsx`

**Interfaces:**
- Consumes: `setWildFormActive(isWildFormed: boolean)` from context (added Task 3)
- Consumes: `characterData.unlockedFeatureIds: string[]` — feature gate
- Consumes: `characterData.characterState?.ui?.combatToggles?.isWildFormed: boolean`

- [ ] **Step 1: Find rage toggle location in CharacterSheetRedesign.tsx**

Search for `isRaging` and `hasRageFeature` (around lines 388–392 and wherever the rage toggle button renders, likely passed to HeroSection around line 844). Understand how rage is displayed — the wild form toggle must be added in the same place.

- [ ] **Step 2: Add wild form detection**

Near where `hasRageFeature` and `isRaging` are computed, add:

```typescript
const hasWildFormFeature =
    (characterData.unlockedFeatureIds ?? []).includes('druid_wild_form');
const isWildFormed =
    characterData.characterState?.ui?.combatToggles?.isWildFormed ?? false;
```

- [ ] **Step 3: Get setWildFormActive from context**

Find where `setRageActive` is obtained (from context hook, props, or destructure). Add `setWildFormActive` in the same place.

- [ ] **Step 4: Render wild form toggle**

Find where the rage toggle button is rendered in JSX (search for `onRageToggle` or `isRaging` in the return). Add wild form toggle immediately after the rage toggle, gated on `hasWildFormFeature && !readOnly`:

```tsx
{hasWildFormFeature && !readOnly && (
    <button
        onClick={() => setWildFormActive(!isWildFormed)}
        style={{
            // Copy the exact style object from the rage toggle button
            // Then override background/borderColor/color for wild form:
            background: isWildFormed ? '#14532d' : 'transparent',
            borderColor: isWildFormed ? '#22c55e' : '#555',
            color: isWildFormed ? '#86efac' : '#aaa',
        }}
    >
        {isWildFormed ? 'Exit Wild Form' : 'Wild Form'}
    </button>
)}
```

Copy the full style from the rage toggle (padding, borderRadius, fontSize, cursor, border) — only change the color values above.

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 6: Test wild form toggle**

```bash
npm run dev
```

1. Use a character with `druid_wild_form` in `unlockedFeatureIds` (add it in the character builder if needed).
2. Open character sheet — verify "Wild Form" toggle appears.
3. Toggle on — verify `wild_form_enter` in campaign feed.
4. Toggle off — verify `wild_form_exit`.
5. Open a non-druid character — verify toggle does NOT appear.

- [ ] **Step 7: Commit**

```bash
git add src/routes/character-sheet/CharacterSheetRedesign.tsx
git commit -m "feat(campaigns): add wild form toggle UI for druids"
```

---

## Task 5: Dice roll campaign events

**Files:**
- Modify: `src/routes/character-sheet/components/DiceRoller.tsx`
- Modify: `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`
- Modify: `src/routes/character-sheet/CharacterSheetRedesign.tsx`

**Interfaces:**
- Consumes: `DiceRollResult` interface and `RollMode` type from `DiceRoller.tsx`
- Produces: Extended `onRoll?: (results: DiceRollResult[], total: number, rollMode: RollMode, modifier: number, label: string) => void`
- Produces: `handleDiceRoll` in Provider context

- [ ] **Step 1: Extend DiceRoller onRoll signature**

Open `src/routes/character-sheet/components/DiceRoller.tsx`.

Find `DiceRollerProps`. Change `onRoll`:
```typescript
onRoll?: (
    results: DiceRollResult[],
    total: number,
    rollMode: RollMode,
    modifier: number,
    label: string,
) => void;
```

Find where `onRoll` is called inside the component (search `props.onRoll?.(` or `onRoll?.(`). Extend the call to pass internal state:
```typescript
// Before (approximate):
onRoll?.(results, total, rollMode);
// After:
onRoll?.(results, total, rollMode, modifier, modifierLabel ?? '');
```

Where `modifier` and `modifierLabel` are the component's internal state values — confirm their exact variable names by reading the useState calls in DiceRoller.tsx.

- [ ] **Step 2: Add campaignLinks + postEvent to Provider + create handleDiceRoll**

Open `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`.

Add imports if not present:
```typescript
import { useCampaignsForCharacter, useCampaignMutations } from '../../../lib/hooks/useCampaigns';
```

Add these at the top of the provider function body (Convex deduplicates the query — calling `useCampaignsForCharacter` here is safe even though the inner hooks also call it):

```typescript
const campaignCharacterId = readOnly ? null : (state.character?.id ?? null);
const campaignLinks = useCampaignsForCharacter(campaignCharacterId);
const { postEvent } = useCampaignMutations();
```

Then add the callback:

```typescript
const handleDiceRoll = useCallback((
    results: DiceRollResult[],
    total: number,
    rollMode: RollMode,
    modifier: number,
    label: string,
) => {
    const characterId = state.character?.id;
    if (!characterId || campaignLinks.length === 0 || rollMode === 'no-d20') return;
    const payload = {
        characterName: state.character?.finalName ?? 'Unknown',
        label: label || 'd20',
        mode: rollMode === 'advantage' ? 'advantage'
            : rollMode === 'disadvantage' ? 'disadvantage'
            : 'normal',
        allResults: results.map(r => r.value),
        takenResult: total - modifier,
        modifier,
        total,
    };
    for (const { campaignDocId } of campaignLinks) {
        postEvent(campaignDocId, 'dice_roll', payload, characterId).catch(() => {});
    }
}, [state.character?.id, state.character?.finalName, campaignLinks, postEvent]);
```

Import `DiceRollResult` and `RollMode` from DiceRoller (check exact export names):
```typescript
import type { DiceRollResult, RollMode } from '../components/DiceRoller';
```

Add `handleDiceRoll` to the context value object and context type interface.

- [ ] **Step 3: Wire DiceRoller in CharacterSheetRedesign.tsx**

Get `handleDiceRoll` from context (same pattern as other context values).

Find `<DiceRoller />` (line ~1003) and add the prop:
```tsx
<DiceRoller onRoll={handleDiceRoll} />
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Test dice roll events**

```bash
npm run dev
```

1. Open character sheet in a campaign (non-readOnly).
2. Click any skill check to roll dice.
3. Check campaign feed — verify `dice_roll` event with correct label and total.
4. Roll with advantage — verify `mode: 'advantage'` and two values in `allResults`.

- [ ] **Step 6: Commit**

```bash
git add src/routes/character-sheet/components/DiceRoller.tsx \
        src/routes/character-sheet/hooks/CharacterSheetProvider.tsx \
        src/routes/character-sheet/CharacterSheetRedesign.tsx
git commit -m "feat(campaigns): fire dice_roll campaign event on every roll"
```

---

## Task 6: Spell cast campaign events

**Files:**
- Modify: `src/routes/character-sheet/components/Spells.tsx`
- Modify: `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`
- Modify: `src/routes/character-sheet/CharacterSheetRedesign.tsx`

**Interfaces:**
- Consumes: `SpellData` interface (objects in `state.character?.spells`) — check exact type name in `Spells.tsx`
- Produces: `onSpellCast?: (spell: SpellData) => void` prop on `Spells`; `handleSpellCast` in Provider context

- [ ] **Step 1: Add onSpellCast prop + Cast button to Spells.tsx**

Open `src/routes/character-sheet/components/Spells.tsx`.

Add to `SpellsProps`:
```typescript
onSpellCast?: (spell: SpellData) => void;
```

Destructure it in the component signature.

Find where each spell row renders (the `.map()` over spells). Inside each row, add a Cast button that fires only if `onSpellCast` is provided and not readOnly:

```tsx
{!readOnly && onSpellCast && (
    <button
        onClick={(e) => { e.stopPropagation(); onSpellCast(spell); }}
        style={{
            padding: '0.15rem 0.5rem',
            fontSize: '0.7rem',
            borderRadius: '4px',
            border: '1px solid #444',
            background: 'transparent',
            color: '#aaa',
            cursor: 'pointer',
            marginLeft: '0.5rem',
        }}
    >
        Cast
    </button>
)}
```

- [ ] **Step 2: Add handleSpellCast to Provider**

In `CharacterSheetProvider.tsx` (already has `campaignLinks`, `postEvent` from Task 5). Import `SpellData` type:
```typescript
import type { SpellData } from '../components/Spells'; // adjust path if type lives elsewhere
```

Add callback:
```typescript
const handleSpellCast = useCallback((spell: SpellData) => {
    const characterId = state.character?.id;
    if (!characterId || campaignLinks.length === 0) return;
    const payload = {
        characterName: state.character?.finalName ?? 'Unknown',
        spellName: spell.spellName,
        sustained: (spell.duration ?? '').toLowerCase().includes('sustain'),
    };
    for (const { campaignDocId } of campaignLinks) {
        postEvent(campaignDocId, 'spell_cast', payload, characterId).catch(() => {});
    }
}, [state.character?.id, state.character?.finalName, campaignLinks, postEvent]);
```

Add to context value and type.

- [ ] **Step 3: Wire in CharacterSheetRedesign.tsx**

Get `handleSpellCast` from context. Find `<Spells onSpellClick={...} ...>` (line ~881). Add:
```tsx
<Spells
    onSpellClick={/* existing */}
    onSpellCast={handleSpellCast}
    readOnly={readOnly}
    isMobile={isMobile}
/>
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Test**

```bash
npm run dev
```

1. Open character sheet in campaign, go to Spells tab.
2. Verify "Cast" button appears per spell.
3. Click Cast — verify `spell_cast` event in feed.
4. For a spell with "sustain" in duration — verify `sustained: true`.

- [ ] **Step 6: Commit**

```bash
git add src/routes/character-sheet/components/Spells.tsx \
        src/routes/character-sheet/hooks/CharacterSheetProvider.tsx \
        src/routes/character-sheet/CharacterSheetRedesign.tsx
git commit -m "feat(campaigns): add Cast button + spell_cast campaign event"
```

---

## Task 7: Maneuver use campaign events

**Files:**
- Modify: `src/routes/character-sheet/components/Maneuvers.tsx`
- Modify: `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`
- Modify: `src/routes/character-sheet/CharacterSheetRedesign.tsx`

**Interfaces:**
- Consumes: `ManeuverData` interface — check exact type name in `Maneuvers.tsx`
- Produces: `onManeuverUse?: (maneuver: ManeuverData) => void` prop; `handleManeuverUse` in context

- [ ] **Step 1: Add onManeuverUse prop + Use button to Maneuvers.tsx**

Open `src/routes/character-sheet/components/Maneuvers.tsx`.

Add to `ManeuversProps`:
```typescript
onManeuverUse?: (maneuver: ManeuverData) => void;
```

Destructure it. Find the maneuver row render (`.map()` over maneuvers). Add Use button:

```tsx
{!readOnly && onManeuverUse && (
    <button
        onClick={(e) => { e.stopPropagation(); onManeuverUse(maneuver); }}
        style={{
            padding: '0.15rem 0.5rem',
            fontSize: '0.7rem',
            borderRadius: '4px',
            border: '1px solid #444',
            background: 'transparent',
            color: '#aaa',
            cursor: 'pointer',
            marginLeft: '0.5rem',
        }}
    >
        Use
    </button>
)}
```

- [ ] **Step 2: Add handleManeuverUse to Provider**

Import `ManeuverData` type:
```typescript
import type { ManeuverData } from '../components/Maneuvers'; // adjust if type lives elsewhere
```

Add callback:
```typescript
const handleManeuverUse = useCallback((maneuver: ManeuverData) => {
    const characterId = state.character?.id;
    if (!characterId || campaignLinks.length === 0) return;
    const payload = {
        characterName: state.character?.finalName ?? 'Unknown',
        maneuverName: maneuver.name,
    };
    for (const { campaignDocId } of campaignLinks) {
        postEvent(campaignDocId, 'maneuver_used', payload, characterId).catch(() => {});
    }
}, [state.character?.id, state.character?.finalName, campaignLinks, postEvent]);
```

Add to context value and type.

- [ ] **Step 3: Wire in CharacterSheetRedesign.tsx**

Get `handleManeuverUse` from context. Find `<Maneuvers onManeuverClick={...} ...>` (line ~883). Add:
```tsx
<Maneuvers
    onManeuverClick={/* existing */}
    onManeuverUse={handleManeuverUse}
    readOnly={readOnly}
    isMobile={isMobile}
/>
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Test**

1. Open character sheet in campaign, go to Maneuvers tab.
2. Verify "Use" button appears per maneuver.
3. Click Use — verify `maneuver_used` event in feed with maneuver name.

- [ ] **Step 6: Commit**

```bash
git add src/routes/character-sheet/components/Maneuvers.tsx \
        src/routes/character-sheet/hooks/CharacterSheetProvider.tsx \
        src/routes/character-sheet/CharacterSheetRedesign.tsx
git commit -m "feat(campaigns): add Use button + maneuver_used campaign event"
```

---

## Task 8: Long rest campaign event

**Files:**
- Modify: `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`
- Modify: `src/routes/character-sheet/CharacterSheetRedesign.tsx`

**Interfaces:**
- Produces: `handleLongRestEvent: () => void` in Provider context
- Consumes: called by `handleLongRest()` in Redesign (lines ~519–532) after all rest updates

- [ ] **Step 1: Add handleLongRestEvent to Provider**

In `CharacterSheetProvider.tsx` (already has `campaignLinks`, `postEvent`):

```typescript
const handleLongRestEvent = useCallback(() => {
    const characterId = state.character?.id;
    if (!characterId || campaignLinks.length === 0) return;
    const payload = { characterName: state.character?.finalName ?? 'Unknown' };
    for (const { campaignDocId } of campaignLinks) {
        postEvent(campaignDocId, 'long_rest', payload, characterId).catch(() => {});
    }
}, [state.character?.id, state.character?.finalName, campaignLinks, postEvent]);
```

Add to context value and type:
```typescript
handleLongRestEvent: () => void;
```

- [ ] **Step 2: Call handleLongRestEvent in CharacterSheetRedesign**

Get `handleLongRestEvent` from context. Find `handleLongRest` function (lines ~519–532). Add the call at the very end of the function body, after all the `updateHP`/`updateMP`/etc. calls:

```typescript
const handleLongRest = async () => {
    // ... all existing update calls ...
    handleLongRestEvent();
};
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Test**

1. Open character sheet in campaign.
2. Click Long Rest, confirm dialog.
3. Verify `long_rest` event appears in campaign feed.

- [ ] **Step 5: Commit**

```bash
git add src/routes/character-sheet/hooks/CharacterSheetProvider.tsx \
        src/routes/character-sheet/CharacterSheetRedesign.tsx
git commit -m "feat(campaigns): fire long_rest event on long rest"
```

---

## Task 9: Update event display (CampaignDetail + toasts)

**Files:**
- Modify: `src/routes/campaigns/CampaignDetail.tsx`
- Modify: `src/lib/hooks/useCampaignToasts.ts`

- [ ] **Step 1: Replace formatEvent in CampaignDetail.tsx**

```typescript
function formatEvent(event: CampaignEvent): string {
  const p = event.payload as any;
  const name = p?.characterName ?? p?.displayName ?? 'Someone';
  switch (event.type) {
    // Vitals
    case 'well_bloodied':      return `[!!] ${name} is well-bloodied!`;
    case 'bloodied':           return `[~] ${name} is bloodied.`;
    case 'deaths_door':        return `[!!] ${name} is on Death's Door!`;
    case 'dead':               return `[*] ${name} has died.`;
    case 'recovered':          return `[+] ${name} has recovered.`;
    // Rage
    case 'rage_start':         return `[>] ${name} enters a Rage!`;
    case 'rage_end':           return `[~] ${name} rage ends.`;
    // Wild form
    case 'wild_form_enter':    return `[>] ${name} transforms into Wild Form!`;
    case 'wild_form_exit':     return `[~] ${name} returns from Wild Form.`;
    // Spells
    case 'spell_cast': {
      const sustained = p?.sustained ? ' (sustained)' : '';
      return `[*] ${name} casts ${p?.spellName ?? 'a spell'}${sustained}.`;
    }
    // Maneuvers
    case 'maneuver_used':      return `[>] ${name} uses ${p?.maneuverName ?? 'a maneuver'}.`;
    // Rest
    case 'long_rest':          return `[+] ${name} takes a Long Rest.`;
    // Conditions
    case 'condition_gained':   return `[!] ${name} gains condition: ${p?.conditionId ?? 'unknown'}.`;
    case 'condition_cured':    return `[+] ${name} is cured of: ${p?.conditionId ?? 'unknown'}.`;
    // Exhaustion
    case 'exhaustion_changed': {
      const lvl = p?.level ?? '?';
      const prev = p?.prevLevel ?? '?';
      return (p?.level ?? 0) > (p?.prevLevel ?? 0)
        ? `[!] ${name} exhaustion → level ${lvl}.`
        : `[+] ${name} exhaustion → level ${lvl} (was ${prev}).`;
    }
    // Dice
    case 'dice_roll': {
      const label = p?.label ?? 'd20';
      const mode = p?.mode === 'advantage' ? ' (adv)' : p?.mode === 'disadvantage' ? ' (dis)' : '';
      const all = Array.isArray(p?.allResults) ? `[${p.allResults.join(', ')}]` : '';
      const mod = (p?.modifier ?? 0) !== 0
        ? ((p.modifier > 0 ? ' +' : ' ') + p.modifier)
        : '';
      return `[d] ${name}: ${label}${mode} ${all}${mod} = ${p?.total ?? '?'}`;
    }
    // System
    case 'member_joined':      return `[+] ${name} joined the campaign.`;
    case 'character_shared':   return `[~] ${name} shared a character.`;
    default:                   return `[*] ${event.type}: ${name}`;
  }
}
```

- [ ] **Step 2: Update eventMessage in useCampaignToasts.ts**

Replace the `eventMessage` function:

```typescript
function eventMessage(event: CampaignEvent): string {
  const p = event.payload as any;
  const name = p?.characterName ?? p?.displayName ?? 'Someone';
  switch (event.type) {
    case 'well_bloodied':      return `${name} is well-bloodied!`;
    case 'bloodied':           return `${name} is bloodied.`;
    case 'deaths_door':        return `${name} is on Death's Door!`;
    case 'dead':               return `${name} has died.`;
    case 'recovered':          return `${name} has recovered.`;
    case 'rage_start':         return `${name} enters a Rage!`;
    case 'rage_end':           return `${name} rage ends.`;
    case 'wild_form_enter':    return `${name} transforms into Wild Form!`;
    case 'wild_form_exit':     return `${name} returns from Wild Form.`;
    case 'spell_cast':         return `${name} casts ${p?.spellName ?? 'a spell'}${p?.sustained ? ' (sustained)' : ''}.`;
    case 'maneuver_used':      return `${name} uses ${p?.maneuverName ?? 'a maneuver'}.`;
    case 'long_rest':          return `${name} takes a Long Rest.`;
    case 'condition_gained':   return `${name} gains: ${p?.conditionId ?? 'a condition'}.`;
    case 'condition_cured':    return `${name} cured of: ${p?.conditionId ?? 'a condition'}.`;
    case 'exhaustion_changed': return `${name} exhaustion level: ${p?.level ?? '?'}.`;
    case 'dice_roll':          return `${name}: ${p?.label ?? 'd20'} = ${p?.total ?? '?'}`;
    case 'member_joined':      return `${name} joined the campaign.`;
    case 'character_shared':   return `${name} shared a character.`;
    default:                   return `${name}: ${event.type}`;
  }
}
```

Find the variant determination logic (currently a ternary or conditional). Replace with:

```typescript
const WARNING_TYPES = new Set([
  'well_bloodied', 'deaths_door', 'dead',
  'rage_start', 'wild_form_enter', 'condition_gained', 'exhaustion_changed',
]);
const variant = WARNING_TYPES.has(event.type) ? 'warning' : 'info';
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Test display**

Trigger at least one of each event type and verify correct text and toast variant (warning = amber, info = neutral).

- [ ] **Step 5: Commit**

```bash
git add src/routes/campaigns/CampaignDetail.tsx \
        src/lib/hooks/useCampaignToasts.ts
git commit -m "feat(campaigns): update event display and toasts for all 12 new event types"
```

---

## Task 10: Filter panel on campaign feed

**Files:**
- Modify: `src/routes/campaigns/CampaignDetail.tsx`

- [ ] **Step 1: Add filter types and helpers at top of file (after imports)**

```typescript
type FilterCategory = 'vitals' | 'dice' | 'combat' | 'spells' | 'conditions' | 'system';

const FILTER_CATEGORIES: Array<{ key: FilterCategory; label: string; types: string[] }> = [
  { key: 'vitals',      label: 'HP / Vitals',       types: ['bloodied', 'well_bloodied', 'deaths_door', 'dead', 'recovered'] },
  { key: 'dice',        label: 'Dice Rolls',         types: ['dice_roll'] },
  { key: 'combat',      label: 'Combat Actions',     types: ['rage_start', 'rage_end', 'wild_form_enter', 'wild_form_exit'] },
  { key: 'spells',      label: 'Spells & Maneuvers', types: ['spell_cast', 'maneuver_used'] },
  { key: 'conditions',  label: 'Conditions',         types: ['condition_gained', 'condition_cured', 'exhaustion_changed'] },
  { key: 'system',      label: 'System',             types: ['member_joined', 'character_shared', 'long_rest'] },
];

const ALL_ENABLED: Record<FilterCategory, boolean> = {
  vitals: true, dice: true, combat: true, spells: true, conditions: true, system: true,
};

function loadFilters(campaignId: string): Record<FilterCategory, boolean> {
  try {
    const raw = localStorage.getItem(`campaign-feed-filters-${campaignId}`);
    if (!raw) return { ...ALL_ENABLED };
    return { ...ALL_ENABLED, ...JSON.parse(raw) };
  } catch {
    return { ...ALL_ENABLED };
  }
}

function saveFilters(campaignId: string, filters: Record<FilterCategory, boolean>) {
  localStorage.setItem(`campaign-feed-filters-${campaignId}`, JSON.stringify(filters));
}
```

- [ ] **Step 2: Add filter state inside CampaignDetail component**

After the existing `useState` declarations:

```typescript
const [filters, setFilters] = useState<Record<FilterCategory, boolean>>(
  () => loadFilters(id ?? '')
);

const toggleFilter = (key: FilterCategory) => {
  setFilters(prev => {
    const next = { ...prev, [key]: !prev[key] };
    saveFilters(id ?? '', next);
    return next;
  });
};

const allowedTypes = new Set(
  FILTER_CATEGORIES.filter(cat => filters[cat.key]).flatMap(cat => cat.types)
);

const filteredEvents = events.filter(e => allowedTypes.has(e.type));
```

- [ ] **Step 3: Replace event feed JSX**

Find the `{/* Event Feed */}` section. Replace the entire block with:

```tsx
{/* Event Feed */}
<div style={{ marginTop: '2rem' }}>
  <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Event Feed</h2>

  {/* Filter chips */}
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
    {FILTER_CATEGORIES.map(cat => (
      <button
        key={cat.key}
        onClick={() => toggleFilter(cat.key)}
        style={{
          padding: '0.2rem 0.6rem',
          borderRadius: '999px',
          fontSize: '0.75rem',
          border: '1px solid',
          cursor: 'pointer',
          background: filters[cat.key] ? '#1e3a5f' : 'transparent',
          borderColor: filters[cat.key] ? '#3b82f6' : '#444',
          color: filters[cat.key] ? '#93c5fd' : '#666',
          transition: 'all 0.15s',
        }}
      >
        {cat.label}
      </button>
    ))}
  </div>

  {filteredEvents.length === 0 && (
    <p style={{ color: '#888' }}>No events match the current filter.</p>
  )}
  <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
    {filteredEvents.map((event) => (
      <div key={event._id} style={{
        padding: '0.5rem 0.75rem',
        background: '#1a1a2e',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.875rem',
      }}>
        <span>{formatEvent(event)}</span>
        <span style={{ color: '#666', fontSize: '0.75rem' }}>
          {new Date(event.createdAt).toLocaleTimeString()}
        </span>
      </div>
    ))}
  </div>
</div>
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Test filter panel**

```bash
npm run dev
```

1. Open campaign detail with events in feed.
2. Verify 6 filter chips above feed.
3. Disable "Dice Rolls" — dice events disappear immediately.
4. Refresh page — dice still filtered (persists to localStorage).
5. Re-enable — dice reappear.
6. Disable all — "No events match" shown.

- [ ] **Step 6: Commit**

```bash
git add src/routes/campaigns/CampaignDetail.tsx
git commit -m "feat(campaigns): add per-category filter panel to campaign event feed"
```
