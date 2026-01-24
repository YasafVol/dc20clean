# DC20Clean – Character Sheet Overview

> Purpose
> End-to-end map of Character Sheet UI: sections, data sources, and critical interactions.

---

## 1. Sections & Sources

- Attributes & Core Stats — from `CharacterSheetProvider` ? `calculateCharacterWithBreakdowns()`
- Resources (HP/SP/MP) — from calculator breakdowns and class tables (persisted in `characterState.resources`)
- Background (Skills/Trades/Languages) — see Background System; enforces mastery caps
- Spells — `SavedCharacter.spells` (canonical) + Spells System data for filtering/details
- Martials — `SavedCharacter.maneuvers` (canonical) + Martials System data for filtering/details
- Currency — `characterState.inventory.currency` persisted with character data
- Exhaustion & Info — modal and info buttons, sourced from rules and calculated state

---

## 2. Routing & State

- Routes under `src/routes/character-sheet/*` read from `CharacterSheetProvider` context.
- Provider computes and memoizes `calculationResult`; sections subscribe to relevant slices.
- Spells/Maneuvers visibility:
  - Spells shown when `calculationResult.spellsKnownSlots.length > 0` or saved spells exist.
  - Maneuvers shown when `calculationResult.levelBudgets.totalManeuversKnown > 0` or saved maneuvers exist.

---

## 3. Acceptance Checks

- Changing an attribute updates PD/AD/derived stats instantly.
- Adding/removing a trade updates its displayed bonuses string (multi-attribute) without refresh.
- Feature info buttons open details with data pulled from class/trait definitions.
- Spells/maneuvers add/remove persist and remain in sync after refresh/revert.

---

## 4. E2E Links

- `e2e/02-resources.e2e.spec.ts` — resources and precision notes
- `e2e/09-spells.e2e.spec.ts` — spells list operations
- `e2e/10-maneuvers.e2e.spec.ts` — martial operations
- `e2e/11-currency.e2e.spec.ts` — currency inputs
- `e2e/12-exhaustion-info.e2e.spec.ts` — exhaustion and info buttons

---

> Last updated: 2026-01-23
> Maintainer: @DC20Clean-Team
