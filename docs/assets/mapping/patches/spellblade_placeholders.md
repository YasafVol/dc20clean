# Spellblade Placeholder Features — Proposed Changes

Last updated: 2026-01-14

Context
- Goal: fill known placeholders in Spellblade progression (L5 and L8) with minimal, non‑mechanical feature stubs so the class table has no TODOs.
- Non-breaking: feature IDs added and referenced from progression; descriptions marked as placeholders; no balance impact.

Files to edit
- src/lib/rulesdata/classes-data/features/spellblade_features.ts
- src/lib/rulesdata/classes-data/progressions/spellblade.progression.ts

## 1) Add placeholder features to coreFeatures

Insert the following entries into `coreFeatures` (anywhere appropriate, e.g., after existing level 2 entries and before `subclasses:`):

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

Notes
- These are deliberately flavor-only to avoid introducing unapproved mechanics.

## 2) Reference placeholders from progression

Update `spellblade.progression.ts`:

- Level 5: set `gains.classFeatures` to include the L5 placeholder ID

```ts
// before
{
  level: 5,
  ...,
  gains: {
    classFeatures: [] // Level 5 class feature to be added
  }
}

// after
{
  level: 5,
  ...,
  gains: {
    classFeatures: ['spellblade_level_5_placeholder']
  }
}
```

- Level 8: set `gains.classFeatures` to include the capstone placeholder ID

```ts
// before
{
  level: 8,
  ...,
  gains: {
    pathProgression: true,
    classFeatures: [] // Capstone feature to be added
  }
}

// after
{
  level: 8,
  ...,
  gains: {
    pathProgression: true,
    classFeatures: ['spellblade_level_8_capstone_placeholder']
  }
}
```

## 3) Validation
- Loader and schemas accept these feature IDs; no change needed to class schema.
- UI will list the placeholders at the proper levels without mechanics.

## 4) Next
- Replace placeholders with finalized features once CH6 specifics are approved.
- Leave packs text as-is per “ignore packs” rule.
