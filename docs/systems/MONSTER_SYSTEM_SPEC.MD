# DC20 Monster System (DM Tools)

> **Status:** Specification Complete  
> **Last Updated:** 2026-01-31  
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

## 8. Data Schema

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

## 12. Implementation Tasks

### Phase 1: Specification & Types
- [ ] Create `src/lib/rulesdata/schemas/monster.schema.ts`
- [ ] Define `SavedMonster` interface
- [ ] Define `MonsterAction` interface
- [ ] Define `MonsterTier` type
- [ ] Define `MonsterRole` interface
- [ ] Create `src/lib/utils/idGenerator.ts`

### Phase 2: Data Layer
- [ ] Create `src/lib/rulesdata/dm/monsterStatistics.ts`
- [ ] Create `src/lib/rulesdata/dm/monsterRoles.ts`
- [ ] Create `src/lib/rulesdata/dm/monsterFeatures.ts` (seed data with UUIDs)

### Phase 3: Calculator (TDD)
- [ ] Write `monsterCalculator.test.ts` - base stats tests
- [ ] Write `monsterCalculator.test.ts` - role modifier tests
- [ ] Write `monsterCalculator.test.ts` - tier multiplier tests
- [ ] Write `monsterCalculator.test.ts` - feature validation tests
- [ ] Write `monsterCalculator.test.ts` - action validation tests
- [ ] Implement `src/lib/services/monsterCalculator.ts` - make all tests pass
- [ ] Write `monsterCalculator.test.ts` - edge cases
- [ ] Verify all tests pass

### Phase 4: Convex Schema
- [ ] Add `monsters` table to `convex/schema.ts`
- [ ] Add `customFeatures` table to `convex/schema.ts`
- [ ] Define indexes (by_user, by_approval_status, by_forked_from)
- [ ] Run `npx convex dev` to validate schema

### Phase 5: Convex Functions (TDD for complex)
- [ ] Write `convex/monsters.test.ts` - fork tracking tests
- [ ] Write `convex/monsters.test.ts` - soft delete tests
- [ ] Implement `convex/monsters.ts` - queries (list, getById, listHomebrew, listTrash)
- [ ] Implement `convex/monsters.ts` - basic mutations (create, update)
- [ ] Implement `convex/monsters.ts` - fork mutation
- [ ] Implement `convex/monsters.ts` - soft delete/restore/hardDelete
- [ ] Implement `convex/monsters.ts` - submitForReview
- [ ] Implement `convex/customFeatures.ts`
- [ ] Verify all tests pass

### Phase 6: Frontend Hooks
- [ ] Create `src/lib/hooks/useMonsters.ts`
- [ ] Create `src/lib/hooks/useMonsterFeatures.ts`
- [ ] Create `src/lib/hooks/useMonsterBuilder.ts` (context + reducer)

### Phase 7: UI Components
- [ ] Create `src/routes/dm/monsters/MonsterList.tsx`
- [ ] Create `src/routes/dm/monsters/MonsterDesigner.tsx`
- [ ] Create `src/routes/dm/monsters/components/RoleSelector.tsx`
- [ ] Create `src/routes/dm/monsters/components/FeaturePointBuy.tsx`
- [ ] Create `src/routes/dm/monsters/components/ActionBuilder.tsx`
- [ ] Create `src/routes/dm/monsters/components/StatPreview.tsx`
- [ ] Create `src/routes/dm/monsters/components/MonsterCard.tsx`
- [ ] Add form validation (inline errors)
- [ ] Add toast notifications
- [ ] Create `src/routes/dm/monsters/components/CustomFeatureCreator.tsx`

### Phase 8: Integration
- [ ] Add routes to `App.tsx`
- [ ] Add DM Tools section to `Menu.tsx`
- [ ] Test full flow: create → save → list → edit → delete → restore

### Phase 9: Export/Import
- [ ] Implement `exportMonsterToJson()` utility
- [ ] Implement `importMonsterFromJson()` utility
- [ ] Add Export button to MonsterCard
- [ ] Add Import button to MonsterList
- [ ] Test import/export round-trip
