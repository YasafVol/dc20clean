# DC20 Monster System (DM Tools)

> **Status:** Implementation Complete  
> **Last Updated:** 2026-01-31 (v2: added flavor fields & importer)  
> **Related:** [ENCOUNTER_SYSTEM_SPEC.MD](./ENCOUNTER_SYSTEM_SPEC.MD)

---

## 1. Overview

**Purpose:** Enable DMs to create mathematically-balanced monsters using DC20's point-buy framework.

**Scope:** DM-facing system, completely separate from character creation. Includes monster design, feature point-buy, action building, and community sharing.

**Key Principles:**
- All stats derived from canonical Monster Statistics Table
- Role modifiers shift defenses, not break the math
- Feature Power budget enforces balance
- Tier system (Standard/Apex/Legendary) scales encounter cost

**Routes:**
- `/dm/monsters` - Monster list
- `/dm/monsters/:id` - Monster designer (Laboratory)
- `/dm/monsters/new` - Create new monster

---

## 2. Monster Statistics Table (Source of Truth)

From Bestiary Vol 2, p. 4:

| Level | HP | PD | AD | Base Damage | Attack | Save DC | Feature Power |
|-------|----|----|----|----|--------|---------|---------------|
| -1 (Novice) | 5 | 10 | 10 | 1 | +2 | 12 | 0 |
| 0 | 8 | 11 | 11 | 1 | +3 | 13 | 1 |
| 1 | 10 | 12 | 12 | 1.5 | +4 | 14 | 1 |
| 2 | 13 | 12 | 12 | 2 | +4 | 14 | 2 |
| 3 | 15 | 13 | 13 | 3 | +5 | 15 | 2 |
| 4 | 18 | 13 | 13 | 3.5 | +5 | 15 | 3 |
| 5 | 21 | 15 | 15 | 4.5 | +7 | 17 | 3 |
| 6 | 23 | 15 | 15 | 5 | +7 | 17 | 4 |
| 7 | 25 | 16 | 16 | 5.5 | +8 | 18 | 4 |
| 8 | 27 | 16 | 16 | 6.5 | +8 | 18 | 4 |
| 9 | 29 | 17 | 17 | 7 | +9 | 19 | 5 |
| 10 | 31 | 18 | 18 | 8 | +10 | 20 | 6 |

---

## 3. Role Modifiers

| Role | HP Modifier | PD Offset | AD Offset | Primary Attributes |
|------|-------------|-----------|-----------|-------------------|
| Artillerist | -10% | +2 | -2 | AGI, INT |
| Brute | +25% | -2 | +2 | MIG |
| Controller | 0% | 0 | 0 | INT, CHA |
| Defender | +10% | +2 | +2 | MIG, AGI |
| Leader | 0% | 0 | 0 | CHA |
| Lurker | -20% | +3 | -3 | AGI |
| Skirmisher | 0% | +1 | +1 | AGI |
| Support | -15% | -2 | -2 | CHA |

---

## 4. Tier System

| Tier | HP Multiplier | Encounter Cost | Initiative Entries |
|------|---------------|----------------|-------------------|
| Standard | 1× | Level × 1 | 1 |
| Apex | 2× | Level × 2 | 2 (future: Arena) |
| Legendary | 4× | Level × 4 | 1 + Legendary AP |

---

## 5. Calculation Model

### 5.1 Calculation Order

```
1. Lookup base stats for level
2. Apply role HP modifier (multiply)
3. Apply tier HP multiplier (multiply)
4. Round HP to nearest integer
5. Apply role PD/AD offsets (add)
6. Copy Attack, Save DC, Base Damage from table
7. Calculate Feature Power budget from table
8. Calculate Encounter Cost = Level × Tier Multiplier
```

### 5.2 Formula Reference

```typescript
finalHP = Math.round(baseHP × roleHPModifier × tierHPMultiplier)
finalPD = basePD + rolePDOffset
finalAD = baseAD + roleADOffset
finalAttack = baseAttack  // No modifiers
finalSaveDC = baseSaveDC  // No modifiers
featurePowerMax = baseFeaturePower  // From table
encounterCost = level × tierCostMultiplier
```

### 5.3 Example Calculation

**Level 4 Brute Apex Monster:**
- Base HP: 18, Base PD: 13, Base AD: 13
- Role (Brute): HP × 1.25, PD - 2, AD + 2
- Tier (Apex): HP × 2
- Final HP: 18 × 1.25 × 2 = 45
- Final PD: 13 - 2 = 11
- Final AD: 13 + 2 = 15
- Encounter Cost: 4 × 2 = 8

---

## 6. Feature System

### 6.1 Official Features (Seed Data)

Features from Bestiary Vol 1-3. All use prefixed UUIDs.

**1-Point Features:**
| Name | Description |
|------|-------------|
| Keen Smell | ADV on Awareness Checks using smell |
| Keen Sight | ADV on Awareness Checks using sight |
| Large Lungs | Can hold breath for 1 hour |
| False Appearance | Indistinguishable from object while motionless |
| Hover | Stays aloft even when Prone |
| Bright Energy | Emits Bright Light within 3 spaces |
| Forest Stride | Ignore Difficult Terrain from plants |
| Amorphous | Move through 1-inch spaces without squeezing |
| Keen Senses | ADV on Awareness Checks using hear/smell |

**2-Point Features:**
| Name | Description |
|------|-------------|
| Incorporeal Movement | Move through creatures/objects as difficult terrain. 3-10 True Damage if ending turn inside |
| Wispy Form | Opportunity Attacks against creature have DisADV |
| Fiery Retribution | Creatures touching/hitting with Melee take 1 Fire damage |
| Forceful | ADV on Grapple/Shove checks; targets have DisADV on Saves |
| Pack Tactics | +2 bonus to Attacks while Flanking |
| Telepathic Link | Telepathic link with master at any distance on same plane |
| Tunneler | Burrow through solid stone, leaving 1-space tunnel |
| Spider Climb | Walk on ceilings/vertical surfaces without check |
| Web Walk | Walk through webs unimpeded; know location of creatures on same web |

**3-Point Features:**
| Name | Description |
|------|-------------|
| Spellcaster | Cannot make Opportunity Attacks, but +2 bonus to Spell Duels |
| Unrelenting | Only reduced below 1 HP by Heavy Hit or Radiant damage |
| Stress | Lose DR and -5 to Defenses at 3 Stress points |
| Dimensional Disruption | Radiant damage prevents "Engulf" or "Swallow" abilities |
| Immutable Form | Immune to any spell/effect that would alter form |

### 6.2 Custom Features

Users can create custom features with:
- Name (required, 1-50 chars)
- Point cost (1-5)
- Description (required)
- Effects (optional, simplified builder)

Custom features stored in Convex `customFeatures` table.

### 6.3 Feature Data Sources

| Source | Location | Editable | Shareable |
|--------|----------|----------|-----------|
| Official | `src/lib/rulesdata/dm/monsterFeatures.ts` | No | N/A |
| Custom | Convex `customFeatures` table | Yes (owner) | Yes |
| Homebrew | Convex (approved custom) | Fork to edit | Already shared |

---

## 7. Action System

### 7.1 Action Schema

```typescript
interface MonsterAction {
  id: string;              // act_<uuid>
  name: string;
  apCost: number;          // 1-4
  type: 'martial' | 'spell' | 'special';
  targetDefense: 'pd' | 'ad';
  damage: number;
  damageType?: string;     // slashing, fire, etc.
  range?: number;          // spaces
  area?: string;           // cone, sphere, etc.
  description: string;
}
```

### 7.2 Targeting Rules

- Single-target Martial → Targets PD
- Area/Cone/Aura → Targets AD
- Spell attacks → Based on spell type

### 7.3 Damage Validation

- Warning if damage > baseDamage × 1.5
- Info if damage < baseDamage × 0.5

### 7.4 AP Limit

Every monster has 4 AP per turn to spend on actions.

---

## 8. Flavor/Lore Fields

Optional fields for thematic richness, not affecting combat math.

### 8.1 Monster Size

| Value | Description |
|-------|-------------|
| Tiny | < 2.5 ft |
| Small | 2.5–4 ft |
| Medium | 4–8 ft |
| Large | 8–15 ft |
| Huge | 15–25 ft |
| Gargantuan | > 25 ft |

### 8.2 Monster Type

14 creature categories from D&D/DC20 tradition:

`Aberration` | `Beast` | `Celestial` | `Construct` | `Dragon` | `Elemental` | `Fey` | `Fiend` | `Giant` | `Humanoid` | `Monstrosity` | `Ooze` | `Plant` | `Undead`

### 8.3 Monster Alignment

Standard alignment grid plus special values:

| Lawful | Neutral | Chaotic |
|--------|---------|---------|
| Lawful Good | Neutral Good | Chaotic Good |
| Lawful Neutral | True Neutral | Chaotic Neutral |
| Lawful Evil | Neutral Evil | Chaotic Evil |

Plus: `Unaligned` (mindless creatures), `Varies` (individual choice)

### 8.4 Lore & Tactics

| Field | Max Length | Purpose |
|-------|------------|---------|
| `lore` | 2000 chars | Background, habitat, behavior |
| `tactics` | 1000 chars | Combat strategy notes for DMs |

---

## 9. Data Schema

### 8.1 ID Format

All content uses prefixed UUIDs:
- Monsters: `mon_<uuid>`
- Features: `feat_<uuid>`
- Actions: `act_<uuid>`

### 8.2 SavedMonster Interface

```typescript
interface SavedMonster {
  // Identity
  id: string;                    // mon_<uuid>
  name: string;
  description?: string;
  level: number;                 // -1 to 10
  tier: 'standard' | 'apex' | 'legendary';
  roleId: string;
  
  // Flavor/Lore (optional)
  size?: MonsterSize;            // Tiny | Small | Medium | Large | Huge | Gargantuan
  monsterType?: MonsterType;     // Beast | Humanoid | Undead | Dragon | etc. (14 types)
  alignment?: MonsterAlignment;  // Lawful Good → Chaotic Evil | Unaligned | Varies
  lore?: string;                 // Background/flavor text (max 2000 chars)
  tactics?: string;              // Combat behavior notes (max 1000 chars)
  
  // Calculated Stats
  finalHP: number;
  finalPD: number;
  finalAD: number;
  finalAttack: number;
  finalSaveDC: number;
  finalBaseDamage: number;
  
  // Attributes (for flavor/roleplay)
  attributes: {
    might: number;
    agility: number;
    charisma: number;
    intelligence: number;
  };
  
  // Features
  featureIds: string[];
  featurePointsSpent: number;
  featurePointsMax: number;
  
  // Actions
  actions: MonsterAction[];
  
  // Sharing
  visibility: 'private' | 'public_anonymous' | 'public_credited';
  approvalStatus: 'draft' | 'pending_review' | 'approved' | 'rejected';
  isHomebrew: boolean;
  rejectionReason?: string;
  submittedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
  
  // Fork Tracking
  forkedFrom?: {
    id: string;
    type: 'official' | 'custom' | 'homebrew';
    name: string;
    userId?: string;
    forkedAt: string;
  };
  forkStats?: {
    forkCount: number;
    lastForkedAt?: string;
  };
  
  // Soft Delete
  deletedAt?: string;
  deletedBy?: string;
  scheduledPurgeAt?: string;
  
  // Metadata
  createdAt: string;
  lastModified: string;
  schemaVersion: string;
  
  // Calculation Breakdowns
  breakdowns: Record<string, {
    base: number;
    modifiers: Array<{ source: string; value: number }>;
    total: number;
  }>;
}
```

---

## 9. Convex API

### 9.1 Queries

| Query | Args | Returns | Description |
|-------|------|---------|-------------|
| `monsters.list` | - | `Monster[]` | User's monsters + approved homebrew |
| `monsters.getById` | `id: string` | `Monster \| null` | Single monster |
| `monsters.listHomebrew` | `filters?` | `Monster[]` | Approved public monsters |
| `monsters.listTrash` | - | `Monster[]` | User's deleted monsters |
| `customFeatures.list` | - | `Feature[]` | User's features + approved homebrew |

### 9.2 Mutations

| Mutation | Args | Returns | Description |
|----------|------|---------|-------------|
| `monsters.create` | `monster: SavedMonster` | `id` | Create new monster |
| `monsters.update` | `id, updates` | `id` | Update existing |
| `monsters.softDelete` | `id: string` | `void` | Move to trash |
| `monsters.restore` | `id: string` | `void` | Restore from trash |
| `monsters.hardDelete` | `id: string` | `void` | Permanent delete |
| `monsters.fork` | `sourceId, sourceType, sourceData` | `newId` | Fork monster |
| `monsters.submitForReview` | `id, visibility` | `void` | Submit to homebrew |
| `customFeatures.create` | `feature` | `id` | Create custom feature |
| `customFeatures.fork` | `sourceId, sourceType, sourceData` | `newId` | Fork feature |

---

## 10. Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| name | Required, 1-50 chars | "Name is required" / "Name must be 50 characters or less" |
| level | -1 to 10 | "Level must be between -1 (Novice) and 10" |
| roleId | Must exist | "Role is required" |
| featureIds | Points ≤ max | "Feature points exceeded (X/Y)" |
| actions | At least 1 | "At least one action is required" |
| action.damage | Warning if > 1.5× base | "Damage exceeds recommended maximum" |
| action.apCost | 1-4 | "AP cost must be between 1 and 4" |

---

## 11. Logging

Console-based logging for DM actions:

```typescript
dmLogger.action({
  action: 'create' | 'update' | 'delete' | 'restore' | 'fork' | 'submit',
  contentType: 'monster',
  contentId: string,
  contentName?: string,
  metadata?: Record<string, unknown>,
});
```

---

## 12. Implementation Status

All phases complete. Implementation files:

### Phase 1: Specification & Types ✅
- [x] `src/lib/rulesdata/schemas/monster.schema.ts` - SavedMonster, MonsterAction, MonsterTier, MonsterRole
- [x] `src/lib/utils/idGenerator.ts` - Prefixed UUID generation

### Phase 2: Data Layer ✅
- [x] `src/lib/rulesdata/dm/monsterStatistics.ts` - Statistics table from Bestiary Vol 2
- [x] `src/lib/rulesdata/dm/monsterRoles.ts` - 8 role definitions with modifiers
- [x] `src/lib/rulesdata/dm/monsterFeatures.ts` - Official features with UUIDs
- [x] `src/lib/rulesdata/dm/index.ts` - Barrel export

### Phase 3: Calculator (TDD) ✅
- [x] `src/lib/services/monsterCalculator.test.ts` - Comprehensive test suite
- [x] `src/lib/services/monsterCalculator.ts` - All calculations implemented
- [x] All tests passing

### Phase 4: Convex Schema ✅
- [x] `convex/schema.ts` - `monsters` and `customFeatures` tables
- [x] Indexes: by_user, by_user_and_id, by_approval_status, by_user_and_deleted

### Phase 5: Convex Functions ✅
- [x] `convex/monsters.ts` - Full CRUD, fork, soft delete, homebrew
- [x] `convex/customFeatures.ts` - Custom feature management

### Phase 6: Frontend Hooks ✅
- [x] `src/lib/hooks/useMonsters.ts` - Monster data access
- [x] `src/lib/hooks/useMonsterFeatures.ts` - Feature management
- [x] `src/lib/hooks/useMonsterBuilder.tsx` - Context + reducer for UI

### Phase 7: UI Components ✅
- [x] `src/routes/dm/monsters/MonsterList.tsx` - List view with cards
- [x] `src/routes/dm/monsters/MonsterDesigner.tsx` - Main editor
- [x] `src/routes/dm/monsters/components/RoleSelector.tsx` - 4-column role grid
- [x] `src/routes/dm/monsters/components/FeaturePointBuy.tsx` - Feature selection
- [x] `src/routes/dm/monsters/components/ActionBuilder.tsx` - Action editor with traits
- [x] `src/routes/dm/monsters/components/StatPreview.tsx` - Calculated stats display
- [x] `src/routes/dm/monsters/components/MonsterCard.tsx` - Summary card
- [x] `src/routes/dm/monsters/styles/MonsterStyles.ts` - Styled components

### Phase 8: Integration ✅
- [x] Routes in `App.tsx`: `/dm/monsters`, `/dm/monsters/:id`
- [x] Menu integration: "Monster Forge" in DM Tools section
- [x] Vercel + Convex deployment integration

### Phase 9: Import Utility ✅
- [x] `src/lib/services/monsterImporter.ts` - Raw JSON to SavedMonster transformer
- [ ] UI buttons for import (pending)
- [ ] Export utility (future)

### Seed Data
- [x] `docs/seed-data/sample-monsters.json` - Template with 8 sample monsters

---

## 14. Import Utility

### 14.1 Overview

The `monsterImporter.ts` service transforms raw seed data JSON into the full `SavedMonster` schema.

### 14.2 API

```typescript
import { 
  importRawMonster,
  importRawMonsters,
  importMonstersFromJson 
} from '@/lib/services/monsterImporter';

// Single monster
const result = importRawMonster(rawMonster);
// result.success: boolean
// result.monster?: SavedMonster
// result.warnings: string[]
// result.errors: string[]

// Batch import
const batch = importRawMonsters(rawMonsters);
// batch.successful: SavedMonster[]
// batch.failed: { name, errors }[]
// batch.allWarnings: { name, warnings }[]

// From JSON string
const parsed = importMonstersFromJson(jsonString);
// Same as batch, plus parseError?: string
```

### 14.3 Field Mapping

| Seed Format | → | Schema Format |
|-------------|---|---------------|
| `role: "brute"` | → | `roleId: "brute"` |
| `actionType: "Attack"` | → | `type: "martial"` |
| `actionType: "Spell"` | → | `type: "spell"` |
| `targetDefense: "PD"` | → | `targetDefense: "pd"` |
| `targetDefense: "AD"` | → | `targetDefense: "ad"` |
| `type: "Beast"` | → | `monsterType: "Beast"` |
| `tier: "Elite"` | → | `tier: "apex"` |
| `tier: "Solo"` | → | `tier: "legendary"` |
| `features: [{name, desc}]` | → | `featureIds: ["feat_..."]` |

### 14.4 Auto-Generated Fields

The importer automatically generates:
- Missing UUIDs (prefixed with `mon_`, `act_`)
- Calculated stats (HP, PD, AD, Attack, Save DC, Base Damage)
- Metadata (`createdAt`, `lastModified`, `schemaVersion`)
- Default values (`apCost: 2`, `visibility: "private"`, etc.)
- Stat breakdowns for debugging

### 14.5 Validation & Warnings

The importer reports:
- **Errors** for missing required fields (name, level, role, actions)
- **Warnings** for mapped fields (role variations, action types)
- **Warnings** for features not found in official list (requires custom feature creation)
