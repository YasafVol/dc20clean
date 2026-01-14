# All Classes Placeholder Features — Proposed Changes

Last updated: 2026-01-14

Context
- Goal: Fill known placeholders in all class progressions (L5 and L8) and add missing startingEquipment.
- Non-breaking: feature IDs added and referenced from progression; descriptions marked as placeholders; no balance impact.
- Scope: 13 classes × 2 features = 26 placeholder features + 9 startingEquipment blocks

---

## Part 1: Level 5 & Level 8 Placeholder Features

### Template for each class

Add to `coreFeatures` array in each `*_features.ts`:

```ts
{
  id: '{class}_level_5_placeholder',
  featureName: '{Feature Name} (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: '{class}_level_8_capstone_placeholder',
  featureName: '{Capstone Name} (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

Update corresponding `*.progression.ts`:

```ts
// Level 5
{
  level: 5,
  // ... existing fields ...
  gains: {
    classFeatures: ['{class}_level_5_placeholder']
  }
}

// Level 8
{
  level: 8,
  // ... existing fields ...
  gains: {
    pathProgression: true,
    classFeatures: ['{class}_level_8_capstone_placeholder']
  }
}
```

### Per-Class Feature Names

| Class | L5 Feature Name | L8 Capstone Name |
|-------|-----------------|------------------|
| Barbarian | Primal Fury | Savage Apex |
| Bard | Virtuoso | Magnum Opus |
| Champion | Veteran Tactics | Unbreakable |
| Cleric | Divine Conduit | Avatar of Faith |
| Commander | Tactical Mastery | Supreme Commander |
| Druid | Nature's Champion | Primal Avatar |
| Hunter | Apex Predator | Perfect Hunt |
| Monk | Inner Harmony | Transcendence |
| Rogue | Shadow Master | Perfect Crime |
| Sorcerer | Arcane Surge | Reality Shaper |
| Spellblade | Martial Arcana | Arcane Apex |
| Warlock | Dark Pact | Patron's Vessel |
| Wizard | Arcane Mastery | Grand Magister |

---

## Part 2: Missing startingEquipment (9 classes)

### Barbarian
```ts
startingEquipment: {
  weaponsOrShields: ['2 Weapons or Shields'],
  rangedWeapons: ['Ranged Weapon with 20 Ammo', '3 Weapons with Toss or Thrown Property'],
  armor: ['1 set of Light Armor or Heavy Armor'],
  packs: 'Adventuring Pack (Coming Soon)'
}
```

### Bard
```ts
startingEquipment: {
  weaponsOrShields: ['1 Weapon or Light Shield'],
  armor: ['1 set of Light Armor'],
  spellFocus: ['1 Spell Focus (Musical Instrument)'],
  packs: 'Adventuring Pack (Coming Soon)'
}
```

### Champion
```ts
startingEquipment: {
  weaponsOrShields: ['2 Weapons or Shields'],
  rangedWeapons: ['Ranged Weapon with 20 Ammo', '3 Weapons with Toss or Thrown Property'],
  armor: ['1 set of any Armor'],
  packs: 'Adventuring Pack (Coming Soon)'
}
```

### Cleric
```ts
startingEquipment: {
  weaponsOrShields: ['1 Weapon or Light Shield'],
  armor: ['1 set of Light Armor'],
  spellFocus: ['1 Spell Focus (Holy Symbol)'],
  packs: 'Adventuring Pack (Coming Soon)'
}
```

### Commander
```ts
startingEquipment: {
  weaponsOrShields: ['2 Weapons or Shields'],
  rangedWeapons: ['Ranged Weapon with 20 Ammo', '3 Weapons with Toss or Thrown Property'],
  armor: ['1 set of any Armor'],
  packs: 'Adventuring Pack (Coming Soon)'
}
```

### Druid
```ts
startingEquipment: {
  weaponsOrShields: ['1 Weapon'],
  armor: ['1 set of Light Armor (non-metal)'],
  spellFocus: ['1 Spell Focus (Druidic Focus)'],
  packs: 'Adventuring Pack (Coming Soon)'
}
```

### Hunter
```ts
startingEquipment: {
  weaponsOrShields: ['2 Weapons or Light Shields'],
  rangedWeapons: ['Ranged Weapon with 20 Ammo'],
  armor: ['1 set of Light Armor'],
  packs: 'Adventuring Pack (Coming Soon)'
}
```

### Warlock
```ts
startingEquipment: {
  weaponsOrShields: ['1 Weapon or Light Shield'],
  armor: ['1 set of Light Armor'],
  spellFocus: ['1 Spell Focus'],
  packs: 'Adventuring Pack (Coming Soon)'
}
```

### Wizard
```ts
startingEquipment: {
  weaponsOrShields: ['1 Weapon'],
  armor: ['1 set of Light Armor'],
  spellFocus: ['1 Spell Focus (Arcane Focus or Spellbook)'],
  packs: 'Adventuring Pack (Coming Soon)'
}
```

---

## Part 3: Detailed Implementation Per Class

### Barbarian

**File: `barbarian_features.ts`**

Add after class declaration opening:
```ts
startingEquipment: {
  weaponsOrShields: ['2 Weapons or Shields'],
  rangedWeapons: ['Ranged Weapon with 20 Ammo', '3 Weapons with Toss or Thrown Property'],
  armor: ['1 set of Light Armor or Heavy Armor'],
  packs: 'Adventuring Pack (Coming Soon)'
},
```

Add to `coreFeatures` array:
```ts
{
  id: 'barbarian_level_5_placeholder',
  featureName: 'Primal Fury (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'barbarian_level_8_capstone_placeholder',
  featureName: 'Savage Apex (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

**File: `barbarian.progression.ts`**

Update Level 5:
```ts
gains: {
  classFeatures: ['barbarian_level_5_placeholder']
}
```

Update Level 8:
```ts
gains: {
  pathProgression: true,
  classFeatures: ['barbarian_level_8_capstone_placeholder']
}
```

---

### Bard

**File: `bard_features.ts`**

Add after class declaration opening:
```ts
startingEquipment: {
  weaponsOrShields: ['1 Weapon or Light Shield'],
  armor: ['1 set of Light Armor'],
  spellFocus: ['1 Spell Focus (Musical Instrument)'],
  packs: 'Adventuring Pack (Coming Soon)'
},
```

Add to `coreFeatures` array:
```ts
{
  id: 'bard_level_5_placeholder',
  featureName: 'Virtuoso (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'bard_level_8_capstone_placeholder',
  featureName: 'Magnum Opus (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

---

### Champion

**File: `champion_features.ts`**

Add after class declaration opening:
```ts
startingEquipment: {
  weaponsOrShields: ['2 Weapons or Shields'],
  rangedWeapons: ['Ranged Weapon with 20 Ammo', '3 Weapons with Toss or Thrown Property'],
  armor: ['1 set of any Armor'],
  packs: 'Adventuring Pack (Coming Soon)'
},
```

Add to `coreFeatures` array:
```ts
{
  id: 'champion_level_5_placeholder',
  featureName: 'Veteran Tactics (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'champion_level_8_capstone_placeholder',
  featureName: 'Unbreakable (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

---

### Cleric

**File: `cleric_features.ts`**

Add after class declaration opening:
```ts
startingEquipment: {
  weaponsOrShields: ['1 Weapon or Light Shield'],
  armor: ['1 set of Light Armor'],
  spellFocus: ['1 Spell Focus (Holy Symbol)'],
  packs: 'Adventuring Pack (Coming Soon)'
},
```

Add to `coreFeatures` array:
```ts
{
  id: 'cleric_level_5_placeholder',
  featureName: 'Divine Conduit (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'cleric_level_8_capstone_placeholder',
  featureName: 'Avatar of Faith (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

---

### Commander

**File: `commander_features.ts`**

Add after class declaration opening:
```ts
startingEquipment: {
  weaponsOrShields: ['2 Weapons or Shields'],
  rangedWeapons: ['Ranged Weapon with 20 Ammo', '3 Weapons with Toss or Thrown Property'],
  armor: ['1 set of any Armor'],
  packs: 'Adventuring Pack (Coming Soon)'
},
```

Add to `coreFeatures` array:
```ts
{
  id: 'commander_level_5_placeholder',
  featureName: 'Tactical Mastery (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'commander_level_8_capstone_placeholder',
  featureName: 'Supreme Commander (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

---

### Druid

**File: `druid_features.ts`**

Add after class declaration opening:
```ts
startingEquipment: {
  weaponsOrShields: ['1 Weapon'],
  armor: ['1 set of Light Armor (non-metal)'],
  spellFocus: ['1 Spell Focus (Druidic Focus)'],
  packs: 'Adventuring Pack (Coming Soon)'
},
```

Add to `coreFeatures` array:
```ts
{
  id: 'druid_level_5_placeholder',
  featureName: "Nature's Champion (Placeholder)",
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'druid_level_8_capstone_placeholder',
  featureName: 'Primal Avatar (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

---

### Hunter

**File: `hunter_features.ts`**

Add after class declaration opening:
```ts
startingEquipment: {
  weaponsOrShields: ['2 Weapons or Light Shields'],
  rangedWeapons: ['Ranged Weapon with 20 Ammo'],
  armor: ['1 set of Light Armor'],
  packs: 'Adventuring Pack (Coming Soon)'
},
```

Add to `coreFeatures` array:
```ts
{
  id: 'hunter_level_5_placeholder',
  featureName: 'Apex Predator (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'hunter_level_8_capstone_placeholder',
  featureName: 'Perfect Hunt (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

---

### Monk

**File: `monk_features.ts`** (already has startingEquipment)

Add to `coreFeatures` array:
```ts
{
  id: 'monk_level_5_placeholder',
  featureName: 'Inner Harmony (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'monk_level_8_capstone_placeholder',
  featureName: 'Transcendence (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

---

### Rogue

**File: `rogue_features.ts`** (already has startingEquipment)

Add to `coreFeatures` array:
```ts
{
  id: 'rogue_level_5_placeholder',
  featureName: 'Shadow Master (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'rogue_level_8_capstone_placeholder',
  featureName: 'Perfect Crime (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

---

### Sorcerer

**File: `sorcerer_features.ts`** (already has startingEquipment)

Add to `coreFeatures` array:
```ts
{
  id: 'sorcerer_level_5_placeholder',
  featureName: 'Arcane Surge (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'sorcerer_level_8_capstone_placeholder',
  featureName: 'Reality Shaper (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

---

### Spellblade

**File: `spellblade_features.ts`** (already has startingEquipment)

Add to `coreFeatures` array:
```ts
{
  id: 'spellblade_level_5_placeholder',
  featureName: 'Martial Arcana (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'spellblade_level_8_capstone_placeholder',
  featureName: 'Arcane Apex (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

---

### Warlock

**File: `warlock_features.ts`**

Add after class declaration opening:
```ts
startingEquipment: {
  weaponsOrShields: ['1 Weapon or Light Shield'],
  armor: ['1 set of Light Armor'],
  spellFocus: ['1 Spell Focus'],
  packs: 'Adventuring Pack (Coming Soon)'
},
```

Add to `coreFeatures` array:
```ts
{
  id: 'warlock_level_5_placeholder',
  featureName: 'Dark Pact (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'warlock_level_8_capstone_placeholder',
  featureName: "Patron's Vessel (Placeholder)",
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

---

### Wizard

**File: `wizard_features.ts`**

Add after class declaration opening:
```ts
startingEquipment: {
  weaponsOrShields: ['1 Weapon'],
  armor: ['1 set of Light Armor'],
  spellFocus: ['1 Spell Focus (Arcane Focus or Spellbook)'],
  packs: 'Adventuring Pack (Coming Soon)'
},
```

Add to `coreFeatures` array:
```ts
{
  id: 'wizard_level_5_placeholder',
  featureName: 'Arcane Mastery (Placeholder)',
  levelGained: 5,
  isFlavor: true,
  description: 'Placeholder feature for Level 5. See CH6 for final design.'
},
{
  id: 'wizard_level_8_capstone_placeholder',
  featureName: 'Grand Magister (Placeholder)',
  levelGained: 8,
  isFlavor: true,
  description: 'Placeholder capstone for Level 8. See CH6 for final design.'
}
```

---

## Files to Edit Summary

### Features Files (13 files)
| File | Add startingEquipment | Add L5/L8 Placeholders |
|------|----------------------|------------------------|
| `barbarian_features.ts` | ✅ Yes | ✅ Yes |
| `bard_features.ts` | ✅ Yes | ✅ Yes |
| `champion_features.ts` | ✅ Yes | ✅ Yes |
| `cleric_features.ts` | ✅ Yes | ✅ Yes |
| `commander_features.ts` | ✅ Yes | ✅ Yes |
| `druid_features.ts` | ✅ Yes | ✅ Yes |
| `hunter_features.ts` | ✅ Yes | ✅ Yes |
| `monk_features.ts` | ❌ No (exists) | ✅ Yes |
| `rogue_features.ts` | ❌ No (exists) | ✅ Yes |
| `sorcerer_features.ts` | ❌ No (exists) | ✅ Yes |
| `spellblade_features.ts` | ❌ No (exists) | ✅ Yes |
| `warlock_features.ts` | ✅ Yes | ✅ Yes |
| `wizard_features.ts` | ✅ Yes | ✅ Yes |

### Progression Files (13 files)
All progression files need L5 and L8 `gains.classFeatures` arrays updated.

---

## Validation
- Loader and schemas accept these feature IDs; no change needed to class schema.
- UI will list the placeholders at the proper levels without mechanics.

## Next Steps
- Replace placeholders with finalized features once CH6 specifics are approved.
- Implement adventuring packs system to replace "Coming Soon" text.
