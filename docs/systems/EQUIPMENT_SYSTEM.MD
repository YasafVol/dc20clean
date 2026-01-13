# DC20Clean – Custom Equipment System (v0.10)

> Purpose
> Central reference for custom equipment creation, data models, validation rules, storage, and UI flows.

---

## 1. Key Files & Roles

### Schemas (`src/lib/rulesdata/equipment/schemas/`)
- `baseEquipment.ts` — Shared types, validation interfaces, equipment categories, damage types
- `weaponSchema.ts` — Weapon types, styles, properties, CustomWeapon interface
- `armorSchema.ts` — Armor types, properties, CustomArmor interface
- `shieldSchema.ts` — Shield types, properties, CustomShield interface
- `spellFocusSchema.ts` — Spell focus properties, CustomSpellFocus interface

### Options/Data (`src/lib/rulesdata/equipment/options/`)
- `weaponOptions.ts` — Weapon styles, enhancements, properties, 38 preset weapons
- `armorOptions.ts` — Armor properties, 7 preset armors
- `shieldOptions.ts` — Shield properties, rules, 5 preset shields
- `spellFocusOptions.ts` — Spell focus properties, 13 preset spell focuses

### Validation (`src/lib/rulesdata/equipment/validation/`)
- `equipmentValidator.ts` — Point budget validation, requirements, exclusions, stacking limits

### Storage (`src/lib/rulesdata/equipment/storage/`)
- `equipmentStorage.ts` — localStorage CRUD, export/import JSON

### UI (`src/routes/custom-equipment/`)
- `CustomEquipment.tsx` — Main page, category selection, tabs
- `components/WeaponBuilder.tsx` — 4-step weapon creation wizard
- `components/ArmorBuilder.tsx` — 3-step armor creation wizard
- `components/ShieldBuilder.tsx` — 3-step shield creation wizard
- `components/SpellFocusBuilder.tsx` — 3-step spell focus creation wizard
- `components/SavedEquipmentList.tsx` — View/filter/delete/export saved equipment

---

## 2. Data Shapes

### Base Equipment Interface

```typescript
interface BaseEquipment {
	id: string;
	name: string;
	description?: string;
	properties: string[];      // Array of property IDs
	pointsSpent: number;
	maxPoints: number;
	createdAt: string;
	updatedAt: string;
}
```

### Equipment Categories (4)

| Category    | Points | Description                                      |
| ----------- | ------ | ------------------------------------------------ |
| Weapon      | 2      | Melee/ranged with styles and enhancements        |
| Armor       | 2      | Light/heavy with PD, AD, and damage reduction    |
| Shield      | 2      | Light/heavy with defensive bonuses               |
| Spell Focus | 1 (2H: 2) | One/two-handed with spellcasting bonuses      |

---

## 3. Weapon System

### Weapon Types (2)

| Type   | Base Damage | Range  | Inherent Properties |
| ------ | ----------- | ------ | ------------------- |
| Melee  | 1           | 1      | —                   |
| Ranged | 1           | 15/45  | Ammo, Two-Handed    |

### Weapon Styles (11)

Each style has a **Weapon Enhancement** costing 1 AP or 1 SP:

| Style    | Damage Type | Enhancement | Effect                                |
| -------- | ----------- | ----------- | ------------------------------------- |
| Axe      | Slashing    | Bleed       | Target makes Physical Save or Bleeds  |
| Bow      | Piercing    | Slow        | Target makes Agility Save or Slowed   |
| Crossbow | Piercing    | Accuracy    | Add d4 to Attack Check                |
| Fist     | B/P/S       | Grapple     | Target makes Physical Save or Grappled |
| Hammer   | Bludgeoning | Knockback   | Push target 1+ Spaces                 |
| Pick     | Piercing    | Hinder      | Target becomes Hindered               |
| Sling    | Bludgeoning | Hinder      | Target becomes Hindered               |
| Spear    | Piercing    | Slow        | Target becomes Slowed                 |
| Staff    | Bludgeoning | Trip        | Target falls Prone                    |
| Sword    | Slashing    | Accuracy    | Add d4 to Attack Check                |
| Whip     | Slashing    | Pull        | Pull target 1+ Spaces                 |

### Weapon Properties

| Property     | Cost | Type  | Effect                              |
| ------------ | ---- | ----- | ----------------------------------- |
| Concealable  | 1    | Melee | ADV on first attack when drawn      |
| Guard        | 1    | Melee | +1 PD while wielding                |
| Heavy        | 2    | Both  | +1 damage (requires Two-Handed)     |
| Impact       | 1    | Both  | +1 damage on Heavy Hits             |
| Multi-Faceted| 1    | Both  | Gain second weapon style            |
| Reach        | 1    | Melee | +1 Space melee range                |
| Returning    | 1    | Melee | Returns on miss (requires Toss)     |
| Silent       | 1    | Both  | Stay hidden when attacking          |
| Toss         | 0    | Melee | Throw range 5/10                    |
| Thrown       | 0    | Melee | Throw range 10/20                   |
| Two-Handed   | -1   | Both  | Requires 2 hands                    |
| Unwieldy     | -1   | Both  | DisADV within 1 Space               |
| Versatile    | 1    | Melee | +2 to Hit with 2 hands              |
| Deft         | 1    | Ranged| No DisADV when Prone                |
| Long-Ranged  | 1    | Ranged| Range increases to 30/90            |
| Reload       | -1   | Ranged| +1 damage, requires reload action   |
| Cumbersome   | -1   | Ranged| 1 AP to draw/stow                   |

### Preset Weapons (38)

Organized by category:
- **One-Handed Melee** (12): Sickle, Brass Knuckles, Club, Light Hammer, etc.
- **Versatile** (10): Battleaxe, Flail, Longsword, Spear, etc.
- **Two-Handed Melee** (11): Scythe, Greataxe, Halberd, Greatsword, etc.
- **One-Handed Ranged** (3): Sling, Hand Crossbow, Hand Stonebow
- **Two-Handed Ranged** (10): Shortbow, Longbow, Light Crossbow, etc.

---

## 4. Armor System

### Armor Types (2)

| Type  | Don/Doff  | Metal | Special                              |
| ----- | --------- | ----- | ------------------------------------ |
| Light | 1 minute  | No    | No penalties                         |
| Heavy | 10 minutes| Yes   | Speed -1, DisADV on Agility, +1 damage on Unarmed Heavy Hits |

### Armor Properties

| Property   | Cost | Type  | Effect                    |
| ---------- | ---- | ----- | ------------------------- |
| PD Increase| 1    | Both  | +1 PD (can take 2x)       |
| AD Increase| 1    | Both  | +1 AD (can take 2x)       |
| PDR        | 2    | Heavy | Physical Damage Reduction |
| EDR        | 2    | Both  | Elemental Damage Reduction|
| Bulky      | -1   | Heavy | Speed -1                  |
| Rigid      | -1   | Heavy | DisADV on Agility Checks  |

### Preset Armor (7)

| Name                    | Type  | PD | AD | PDR  |
| ----------------------- | ----- | -- | -- | ---- |
| Light Defensive         | Light | 1  | 1  | —    |
| Light Deflecting        | Light | 2  | 0  | —    |
| Light Fortified         | Light | 0  | 2  | —    |
| Heavy Defensive         | Heavy | 1  | 1  | Half |
| Heavy Deflecting        | Heavy | 2  | 0  | Half |
| Heavy Fortified         | Heavy | 0  | 2  | Half |
| Heavy Highly Defensive  | Heavy | 2  | 2  | —    |

---

## 5. Shield System

### Shield Types (2)

| Type  | Description                          |
| ----- | ------------------------------------ |
| Light | Simple, no penalties (Buckler)       |
| Heavy | Designed for warfare (Tower Shield) |

### Shield Rules
- **Equip/Stow**: 1 AP
- **Attack**: 1 Bludgeoning damage (if trained)
- **Dual Wielding**: Only benefit from one shield at a time (Minor Action to switch), immune to Flanking

### Shield Properties

| Property   | Cost | Type  | Effect                              |
| ---------- | ---- | ----- | ----------------------------------- |
| PD Increase| 1    | Both  | +1 PD (Heavy: can take 2x)          |
| AD Increase| 1    | Both  | +1 AD (Heavy: can take 2x)          |
| Grasp      | 1    | Light | Free hand for grappling/reloading   |
| Toss       | 1    | Light | Throw range 5/10                    |
| Mounted    | 1    | Heavy | PD/AD also apply to mount           |
| PDR        | 2    | Heavy | Physical Damage Reduction           |
| EDR        | 2    | Heavy | Elemental Damage Reduction          |
| Bulky      | -1   | Heavy | Speed -1                            |
| Rigid      | -1   | Heavy | DisADV on Agility Checks            |

### Preset Shields (5)

| Name         | Type  | PD | AD | Properties |
| ------------ | ----- | -- | -- | ---------- |
| Buckler      | Light | 1  | 0  | Grasp      |
| Round Shield | Light | 0  | 1  | Toss       |
| Heater Shield| Light | 1  | 1  | —          |
| Kite Shield  | Heavy | 1  | 2  | Mounted    |
| Tower Shield | Heavy | 2  | 2  | —          |

---

## 6. Spell Focus System

### Hand Requirements

| Type       | Base Points | Effective Points |
| ---------- | ----------- | ---------------- |
| One-Handed | 1           | 1                |
| Two-Handed | 1           | 2 (Two-Handed costs -1) |

### Spell Focus Properties

| Property      | Cost | Effect                                    |
| ------------- | ---- | ----------------------------------------- |
| Channeling    | 1    | +1 to Spell Checks                        |
| Close Quarters| 1    | No DisADV on Ranged Spell Attacks in melee|
| Long-Ranged   | 1    | +5 Spaces range (range > 1 spells)        |
| Muffled       | 1    | Verbal Components heard within 5 Spaces   |
| Powerful      | 2    | +1 Spell Attack damage                    |
| Protective    | 1    | +1 AD                                     |
| Reach         | 1    | +1 Space range (range 1 spells)           |
| Reactive      | 1    | ADV on Spell Duel checks as Challenger    |
| Two-Handed    | -1   | Requires 2 hands                          |
| Vicious       | 1    | +1 to hit with Spell Attacks              |
| Warded        | 1    | MDR (Mystical Damage Reduction)           |

### Preset Spell Focuses (13)

**One-Handed (9)**:
- Orb (Channeling)
- Ceremonial Dagger (Close Quarters)
- Crystal (Vicious)
- Totem (Protective)
- Holy Medallion (Warded)
- Wand (Long-Ranged)
- Rod (Reach)
- Poppet (Muffled)
- Ritual Bell (Reactive)

**Two-Handed (4)**:
- Mage Staff (Powerful)
- Grimoire (Channeling, Vicious)
- Censer (Protective, Warded)
- Magical Instrument (Long-Ranged, Reactive)

---

## 7. Validation Rules

### Point Budget
- Each equipment type has a maximum point budget
- Properties have costs that add to (positive) or subtract from (negative) the total
- Cannot exceed max points

### Property Requirements
```typescript
// Example: Heavy property requires Two-Handed
{
	id: 'heavy',
	cost: 2,
	requires: ['two-handed']
}
```

### Property Exclusions
```typescript
// Example: Two-Handed and Versatile are mutually exclusive
{
	id: 'two-handed',
	cost: -1,
	excludes: ['versatile']
}
```

### Stacking Limits
```typescript
// Example: PD Increase can be taken twice on heavy armor
{
	id: 'pd-increase-heavy',
	cost: 1,
	maxStacks: 2
}
```

---

## 8. Storage

### localStorage Key
`customEquipment`

### Data Structure
```typescript
interface StoredEquipmentData {
	version: number;
	weapons: CustomWeapon[];
	armor: CustomArmor[];
	shields: CustomShield[];
	spellFocuses: CustomSpellFocus[];
}
```

### API Functions
```typescript
// CRUD
getAllCustomWeapons(): CustomWeapon[]
saveCustomWeapon(weapon: CustomWeapon): void
deleteCustomWeapon(id: string): void

// Same pattern for armor, shields, spellFocuses

// Export/Import
exportEquipmentToJson(): string
importEquipmentFromJson(json: string): { success: boolean; error?: string }
```

---

## 9. UI Flow

### Main Page (`/custom-equipment`)
1. **Create New** tab — Select equipment category
2. **Saved Equipment** tab — View/manage saved items

### Builder Flow (Example: Weapon)
1. **Step 1**: Choose Type (Melee/Ranged) or load preset
2. **Step 2**: Choose Style (determines enhancement)
3. **Step 3**: Choose Properties (point budget tracked)
4. **Step 4**: Review & Save (name, final stats preview)

### Saved Equipment List
- Filter by category (All, Weapons, Armor, Shields, Spell Focuses)
- Delete individual items
- Export all to JSON
- Import from JSON file

---

## 10. Future Enhancements

- [ ] Integration with character creation (equip custom items)
- [ ] Edit existing saved equipment
- [ ] Duplicate/clone functionality
- [ ] Search/filter presets
- [ ] Mobile-optimized layout
- [ ] Share equipment via URL/code

---

## 11. Related Systems

- **Character Sheet** — `docs/systems/CHARACTER_SHEET.MD`
- **Calculation System** — `docs/systems/CALCULATION_SYSTEM.MD`
- **Class System** — `docs/systems/CLASS_SYSTEM.MD` (combat training determines equipment eligibility)
