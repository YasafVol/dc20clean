# Spells v0.10 Migration

## Summary of Changes from v0.9.5 to v0.10

### 1. Schema Changes

| Aspect           | v0.9.5                                                | v0.10                                           |
| ---------------- | ----------------------------------------------------- | ----------------------------------------------- |
| **Spell Lists**  | `spellLists: SpellList[]` (Arcane, Divine, Primal)    | `sources: SpellSource[]` (same values, renamed) |
| **Organization** | `premadeList: PremadeSpellList` (Fire & Flames, etc.) | Organized by **School** folders                 |
| **Classes**      | `availableClasses: ClassName[]`                       | Removed - determined by Sources                 |
| **Schools**      | 11 schools (includes Abjuration, Destruction, etc.)   | **8 schools**                                   |
| **Tags**         | Implicit                                              | Explicit `tags: SpellTag[]`                     |

### 2. New Schools in v0.10 (8 total)

- Astromancy (10 spells)
- Conjuration (14 spells)
- Divination (2 spells)
- Elemental (41 spells)
- Enchantment (12 spells)
- Invocation (15 spells)
- Nullification (16 spells)
- Transmutation (16 spells)

**Total: 126 spells**

### 3. Removed Schools

- Abjuration → Merged into Nullification
- Destruction → Merged into Elemental/Nullification
- Illusion → Merged into Conjuration
- Protection → Merged into Invocation/Nullification
- Restoration → Merged into Invocation

### 4. New Folder Structure

```
src/lib/rulesdata/spells-data/
├── astromancy/           (10 spells)
│   ├── arcane-bolt.ts
│   ├── arcane-wave.ts
│   ├── ...
│   └── index.ts
├── conjuration/          (14 spells)
├── divination/           (2 spells)
├── elemental/            (41 spells)
├── enchantment/          (12 spells)
├── invocation/           (14 spells)
├── nullification/        (16 spells)
├── transmutation/        (16 spells)
└── index.ts              (exports all + lookup utilities)
```

### 5. Full Spell List by School

#### Astromancy (10)

1. Arcane Bolt
2. Arcane Wave
3. Banish
4. Fly
5. Gravity Sink Hole
6. Haste
7. Slow Time
8. Telekinesis
9. Teleport
10. Translocation

#### Conjuration (14)

1. Arcane Barrier
2. Bind
3. Chaos Bomb
4. Disguise Self
5. Entangle
6. Force Dome
7. Illusory Image
8. Mage Armor
9. Oil Slick
10. Summon Familiar
11. Tendrils from Beyond
12. Unholy Aura
13. Wall of Fire
14. Wall of Force

#### Divination (2)

1. Bless
2. Empowered Sight

#### Elemental (41)

1. Absorb Elements
2. Acid Rain
3. Acid Stream
4. Air Slash
5. Blight Bomb
6. Cloud Cover
7. Cold Wave
8. Cone of Cold
9. Corrosive Bolt
10. Corrosive Cascade
11. Corrosive Wave
12. Elemental Shield
13. Eruption
14. Fire Blast
15. Fire Bolt
16. Fire Torrent
17. Fireball
18. Freeze
19. Frost Bolt
20. Frost Storm
21. Gust
22. Hydro Lance
23. Inflict Poison
24. Lightning Blast
25. Lightning Bolt
26. Lightning Cloud
27. Lightning Storm
28. Lightning Torrent
29. Living Bomb
30. Maelstrom
31. Poison Bolt
32. Poison Cloud
33. Spike Bolt
34. Spike Surge
35. Tornado
36. Toxic Aura
37. Wall of Water
38. Water Bolt
39. Wind Blade
40. Wind Burst
41. Wind Tunnel

#### Enchantment (12)

1. Charm
2. Command
3. Fear
4. Hex
5. Message
6. Mind Blast
7. Planar Protection
8. Psi Bolt
9. Psychic Wave
10. Shatter Reality
11. Slumber
12. Vicious Mockery

#### Invocation (15)

1. Cleanse
2. Close Wounds
3. Death Ward
4. Divine Protection
5. Heal
6. Life Transfer
7. Light
8. Luminous Burst
9. Mass Heal
10. Radiant Beam
11. Radiant Bolt
12. Regenerate
13. Solar Beam
14. Spirit Link
15. Sunburst

#### Nullification (16)

1. Arcane Shield
2. Bane
3. Corpse Explosion
4. Darkness
5. Death
6. Death Bolt
7. Disintegrate
8. Disintegrating Beam
9. Muffle
10. Sanctuary
11. Sphere of Death
12. Umbral Burst
13. Umbral Wave
14. Vampiric Touch
15. Wild Guard
16. Zone of Peace

#### Transmutation (16)

1. Acid Imbued
2. Alter Size
3. Chaos Bolt
4. Chaos Torrent
5. Cold Imbued
6. Earth Blessing
7. Fire Imbued
8. Invisibility
9. Lightning Imbued
10. Poison Imbued
11. Primal Hide
12. Psychic Imbued
13. Quicksand
14. Radiant Imbued
15. Umbral Imbued
16. Wind Blessing

### 6. Migration Status

| Current Spell (v0.9.5) | Status    | v0.10 Name        | New School    |
| ---------------------- | --------- | ----------------- | ------------- |
| fire-bolt              | ✅ Exists | Fire Bolt         | Elemental     |
| frost-bolt             | ✅ Exists | Frost Bolt        | Elemental     |
| lightning-bolt         | ✅ Exists | Lightning Bolt    | Elemental     |
| gust                   | ✅ Exists | Gust              | Elemental     |
| psi-bolt               | ✅ Exists | Psi Bolt          | Enchantment   |
| bane                   | ✅ Exists | Bane              | Nullification |
| bless                  | ✅ Exists | Bless             | Divination    |
| command                | ✅ Exists | Command           | Enchantment   |
| close-wounds           | ✅ Exists | Close Wounds      | Invocation    |
| death-bolt             | ✅ Exists | Death Bolt        | Nullification |
| heal                   | ✅ Exists | Heal              | Invocation    |
| light                  | ✅ Exists | Light             | Invocation    |
| message                | ✅ Exists | Message           | Enchantment   |
| poison-bolt            | ✅ Exists | Poison Bolt       | Elemental     |
| sleep                  | →         | Slumber           | Enchantment   |
| shield                 | →         | Arcane Shield     | Nullification |
| shield-of-faith        | →         | Divine Protection | Invocation    |
| find-familiar          | →         | Summon Familiar   | Conjuration   |
| minor-illusion         | →         | Illusory Image    | Conjuration   |
| silent-image           | Removed   | -                 | -             |
| acid-bolt              | →         | Corrosive Bolt    | Elemental     |
| befriend               | →         | Charm             | Enchantment   |
| psychic-fear           | →         | Fear              | Enchantment   |
| ...                    | ...       | ...               | ...           |

### 7. Spells to Add (New in v0.10)

82 new spells need to be created:

- Astromancy: 10 new
- Conjuration: ~10 new
- Elemental: ~30 new
- Enchantment: ~6 new
- Invocation: ~10 new
- Nullification: ~10 new
- Transmutation: 16 new

### 8. Migration Tasks

1. ✅ Update schema (`spell.schema.ts`)
2. ✅ Create new folder structure by school
3. ✅ Migrate existing spells to new format
4. ✅ Add all 125 spells from v0.10 (auto-generated from source doc)
5. ✅ Create spell registry (lookup by ID, school, source) - `spells-data/index.ts`
6. ⬜ Update spell service to use new structure
7. ⬜ Update tests
8. ⬜ Remove old spell folder structure (`spells-data/spells/`)

### 9. Generated Files Summary

- **8 school folders** created directly in `src/lib/rulesdata/spells-data/`
- **125 spell TypeScript files** generated
- **Main index** with lookup utilities at `src/lib/rulesdata/spells-data/index.ts`
- **Generator script** at `scripts/generateSpellFiles.mjs`
- **Old `spells/` folder removed**

### 10. Usage Example

```typescript
import {
	ALL_SPELLS,
	getSpellById,
	getSpellsBySchool,
	getSpellsBySource,
	getCantrips,
	fireBolt,
	heal
} from '@/lib/rulesdata/spells-data';

// Get a specific spell
const spell = getSpellById('fire-bolt');

// Get all Elemental spells
const elementalSpells = getSpellsBySchool('elemental');

// Get all Divine spells
const divineSpells = getSpellsBySource('divine');

// Get all cantrips
const cantrips = getCantrips();
```
