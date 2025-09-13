 # DC20Clean – Character Sheet Overview

 > Purpose
 > End-to-end map of Character Sheet UI: sections, data sources, and critical interactions.

 ---

 ## 1. Sections & Sources

 - Attributes & Core Stats — from `useCharacterBuilder()` → `calculationResult`
 - Resources (HP/SP/MP) — from calculator breakdowns and class tables
 - Background (Skills/Trades/Languages) — see Background System; enforces mastery caps
 - Spells — see Spells System; filters and actions
 - Martials — see Martials System; maneuvers/techniques/stances
 - Currency — simple inputs persisted with character data
 - Exhaustion & Info — modal and info buttons, sourced from rules and calculated state

 ---

 ## 2. Routing & State

 - Routes under `src/routes/character-sheet/*` read from React Context (`characterContext.tsx`).
 - Provider computes and memoizes `calculationResult`; sections subscribe to relevant slices.

 ---

 ## 3. Acceptance Checks

 - Changing an attribute updates PD/AD/derived stats instantly.
 - Adding/removing a trade updates its displayed bonuses string (multi-attribute) without refresh.
 - Feature info buttons open details with data pulled from class/trait definitions.

 ---

 ## 4. E2E Links

 - `e2e/02-resources.e2e.spec.ts` — resources and precision notes
 - `e2e/09-spells.e2e.spec.ts` — spells list operations
 - `e2e/10-maneuvers.e2e.spec.ts` — martial operations
 - `e2e/11-currency.e2e.spec.ts` — currency inputs
 - `e2e/12-exhaustion-info.e2e.spec.ts` — exhaustion and info buttons

 ---

 > Last updated: 2025-09-12
 > Maintainer: @DC20Clean-Team


