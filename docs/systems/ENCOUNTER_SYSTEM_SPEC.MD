# DC20 Encounter System (DM Tools)

> **Status:** Implementation Complete  
> **Last Updated:** 2026-01-31  
> **Related:** [MONSTER_SYSTEM_SPEC.MD](./MONSTER_SYSTEM_SPEC.MD)

---

## 1. Overview

**Purpose:** Enable DMs to build balanced encounters using DC20's point-buy budget system.

**Scope:** DM-facing War Room for encounter planning. Integrates with Monster Designer.

**Key Principles:**
- Budget = Party Size × Average Level
- Difficulty modifies budget threshold
- Monster cost = Level × Tier Multiplier
- Real-time budget tracking

**Routes:**
- `/dm/encounters` - Encounter list
- `/dm/encounters/:id` - Encounter planner (War Room)
- `/dm/encounters/new` - Create new encounter

---

## 2. Budget Formulas

### 2.1 Base Budget

```
Base Budget = Party Size × Average Party Level
```

**Examples:**
| Party Size | Level | Budget |
|------------|-------|--------|
| 4 players | 4 | 16 |
| 5 players | 3 | 15 |
| 3 players | 6 | 18 |
| 6 players | 2 | 12 |

### 2.2 Difficulty Modifiers

| Difficulty | Formula | Modifier (for L4 party) |
|------------|---------|-------------------------|
| Trivial | Budget - (2 × Level) | -8 |
| Easy | Budget - (1 × Level) | -4 |
| Medium | Budget | 0 |
| Hard | Budget + (1 × Level) | +4 |
| Deadly | Budget + (2 × Level) | +8 |

### 2.3 Adjusted Budget Examples

For a party of 4 players at level 4 (Base Budget = 16):

| Difficulty | Adjusted Budget |
|------------|-----------------|
| Trivial | 8 |
| Easy | 12 |
| Medium | 16 |
| Hard | 20 |
| Deadly | 24 |

### 2.4 Monster Cost

| Tier | Cost Multiplier | L1 Monster | L4 Monster | L8 Monster |
|------|-----------------|------------|------------|------------|
| Standard | 1× | 1 | 4 | 8 |
| Apex | 2× | 2 | 8 | 16 |
| Legendary | 4× | 4 | 16 | 32 |

**Total Slot Cost = Monster Cost × Quantity**

---

## 3. Budget Validation

### 3.1 Thresholds

| Condition | Percentage | Status | UI Indicator |
|-----------|------------|--------|--------------|
| Spent < 80% | Under | Warning | Yellow bar, "May be too easy" |
| Spent 80-100% | On target | OK | Green bar |
| Spent 100-120% | Slightly over | Warning | Orange bar, "Challenging" |
| Spent > 120% | Over budget | Error | Red bar, "Very difficult" |

### 3.2 Visual Budget Meter

```
Budget: 16 / 20 (Hard)
[████████████████░░░░] 80%
         ↑ Medium threshold
```

---

## 4. Workflow

### 4.1 Step 1: Party Context

1. Enter party size (1-8 players)
2. Enter average party level (0-10)
3. Budget calculates automatically

### 4.2 Step 2: Difficulty Selection

1. Display all thresholds for reference
2. Select difficulty (Trivial → Deadly)
3. Adjusted budget updates

### 4.3 Step 3: Monster Slotting

1. Add empty monster slots
2. For each slot:
   - Click "Select Monster" → opens picker modal
   - Or click "Design" → opens Monster Designer with pre-filled level
3. Set quantity per slot
4. Budget meter updates in real-time

### 4.4 Step 4: Save & Export

1. Name the encounter
2. Add optional description/notes
3. Save to library
4. Optionally export or share

---

## 5. Data Schema

### 5.1 ID Format

- Encounters: `enc_<uuid>`
- Monster Slots: `slot_<uuid>`

### 5.2 PartyConfig

```typescript
interface PartyConfig {
  size: number;        // 1-8 players
  averageLevel: number; // 0-10
}
```

### 5.3 EncounterMonsterSlot

```typescript
interface EncounterMonsterSlot {
  id: string;               // slot_<uuid>
  monsterId: string | null; // null = empty slot
  quantity: number;         // 1+
  cost: number;             // Calculated: monster cost × quantity
  notes?: string;           // Optional notes for this slot
}
```

### 5.4 SavedEncounter

```typescript
interface SavedEncounter {
  // Identity
  id: string;                    // enc_<uuid>
  name: string;
  description?: string;
  
  // Party Configuration
  party: PartyConfig;
  difficulty: 'trivial' | 'easy' | 'medium' | 'hard' | 'deadly';
  
  // Budget (all calculated)
  baseBudget: number;            // party.size × party.averageLevel
  difficultyModifier: number;    // Based on difficulty
  adjustedBudget: number;        // baseBudget + difficultyModifier
  spentBudget: number;           // Sum of all slot costs
  remainingBudget: number;       // adjustedBudget - spentBudget
  
  // Monster Slots
  monsters: EncounterMonsterSlot[];
  
  // Environment & Notes
  environment?: string;          // e.g., "Forest clearing", "Dungeon room"
  gmNotes?: string;              // Private GM notes
  
  // Sharing (same as Monster)
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
}
```

---

## 6. Calculation Model

### 6.1 Budget Calculator

```typescript
interface EncounterCalculationInput {
  party: PartyConfig;
  difficulty: EncounterDifficulty;
  monsters: Array<{
    monsterId: string;
    quantity: number;
    monsterLevel: number;
    monsterTier: MonsterTier;
  }>;
}

interface EncounterCalculationResult {
  baseBudget: number;
  difficultyModifier: number;
  adjustedBudget: number;
  spentBudget: number;
  remainingBudget: number;
  budgetPercentage: number;
  
  // Per-slot breakdown
  slotCosts: Array<{
    monsterId: string;
    unitCost: number;
    quantity: number;
    totalCost: number;
  }>;
  
  // All thresholds for display
  difficultyThresholds: Record<EncounterDifficulty, number>;
  
  validation: {
    isOverBudget: boolean;      // > 120%
    isUnderBudget: boolean;     // < 80%
    isOnTarget: boolean;        // 80-100%
    budgetStatus: 'under' | 'on_target' | 'slightly_over' | 'over';
  };
}
```

### 6.2 Constants

```typescript
const DIFFICULTY_MODIFIERS: Record<EncounterDifficulty, number> = {
  trivial: -2,  // × party level
  easy: -1,
  medium: 0,
  hard: 1,
  deadly: 2,
};

const TIER_COST_MULTIPLIERS: Record<MonsterTier, number> = {
  standard: 1,
  apex: 2,
  legendary: 4,
};
```

---

## 7. Monster Integration

### 7.1 Adding Monsters to Slots

**Quick Monster Picker Modal:**
1. Opens when clicking empty slot
2. Shows tabs: "My Monsters" | "Homebrew Library"
3. Filter by: level range, tier, role, name search
4. Suggested level filter: party level ± 2
5. Click monster → adds to slot with quantity 1

### 7.2 Design Bridge

Empty slot has "Design New" button:
```typescript
// Navigation with pre-filled params
navigate(`/dm/monsters/new?level=${party.averageLevel}&tier=standard&returnTo=${encounterId}`);
```

After monster save:
- If `returnTo` param exists, navigate back to encounter
- New monster automatically added to the slot that triggered "Design"

### 7.3 Cost Recalculation Triggers

Budget recalculates when:
- `party.size` changes
- `party.averageLevel` changes
- `difficulty` changes
- Monster added to slot
- Monster removed from slot
- Slot quantity changes
- Monster in slot is edited (level/tier change)

---

## 8. Convex API

### 8.1 Queries

| Query | Args | Returns | Description |
|-------|------|---------|-------------|
| `encounters.list` | - | `Encounter[]` | User's encounters + approved homebrew |
| `encounters.getById` | `id: string` | `Encounter \| null` | Single encounter with populated monster data |
| `encounters.listHomebrew` | `filters?` | `Encounter[]` | Approved public encounters |
| `encounters.listTrash` | - | `Encounter[]` | User's deleted encounters |

### 8.2 Mutations

| Mutation | Args | Returns | Description |
|----------|------|---------|-------------|
| `encounters.create` | `encounter` | `id` | Create new encounter |
| `encounters.update` | `id, updates` | `id` | Update existing |
| `encounters.addMonsterSlot` | `encounterId, monsterId?, qty` | `slotId` | Add monster slot |
| `encounters.updateMonsterSlot` | `encounterId, slotId, updates` | `void` | Update slot |
| `encounters.removeMonsterSlot` | `encounterId, slotId` | `void` | Remove slot |
| `encounters.softDelete` | `id` | `void` | Move to trash |
| `encounters.restore` | `id` | `void` | Restore from trash |
| `encounters.hardDelete` | `id` | `void` | Permanent delete |
| `encounters.fork` | `sourceId, sourceType, sourceData` | `newId` | Fork encounter |
| `encounters.submitForReview` | `id, visibility` | `void` | Submit to homebrew |

---

## 9. Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| name | Required, 1-100 chars | "Name is required" |
| party.size | 1-8 | "Party size must be 1-8 players" |
| party.averageLevel | 0-10 | "Level must be between 0 and 10" |
| monsters | At least 1 slot with monster | "Add at least one monster" |
| spentBudget | Warning if > 120% | "Encounter is significantly over budget" |
| spentBudget | Warning if < 80% | "Encounter may be too easy" |

---

## 10. Export/Import

### 10.1 Export Format

```json
{
  "version": 1,
  "type": "encounter",
  "exportedAt": "2024-01-15T12:00:00.000Z",
  "encounter": {
    "id": "enc_xxx",
    "name": "Goblin Ambush",
    "party": { "size": 4, "averageLevel": 3 },
    "difficulty": "medium",
    "monsters": [
      { "id": "slot_xxx", "monsterId": "mon_xxx", "quantity": 4, "cost": 4 }
    ]
  },
  "bundledMonsters": [
    {
      "id": "mon_xxx",
      "name": "Goblin Warrior",
      "level": 1,
      "tier": "standard",
      ...
    }
  ]
}
```

### 10.2 Import Flow

1. User selects JSON file
2. Parse and validate schema version
3. Validate all required fields
4. Generate new UUIDs for encounter and all monsters
5. Check for monster name conflicts (offer rename)
6. Import monsters first
7. Import encounter with updated monster ID references
8. Navigate to imported encounter

### 10.3 Import Conflict Resolution

If imported monster name already exists:
- Option 1: Rename to "Name (Imported)"
- Option 2: Use existing monster (match by name)
- Option 3: Cancel import

---

## 11. Logging

Console-based logging for DM actions:

```typescript
dmLogger.action({
  action: 'create' | 'update' | 'delete' | 'restore' | 'fork' | 'submit',
  contentType: 'encounter',
  contentId: string,
  contentName?: string,
  metadata?: {
    partySize?: number,
    partyLevel?: number,
    difficulty?: string,
    monsterCount?: number,
  },
});
```

---

## 12. UI Components

### 12.1 EncounterPlanner Layout

```
┌─────────────────────────────────────────────────────────┐
│ [← Back]  Encounter Name: [________________]  [Save]    │
├─────────────────────────────────────────────────────────┤
│ PARTY CONFIGURATION                                     │
│ Players: [4 ▼]    Average Level: [4 ▼]                  │
│ Base Budget: 16                                         │
├─────────────────────────────────────────────────────────┤
│ DIFFICULTY                                              │
│ [Trivial: 8] [Easy: 12] [●Medium: 16] [Hard: 20] [Deadly: 24] │
├─────────────────────────────────────────────────────────┤
│ BUDGET METER                                            │
│ [████████████░░░░░░░░] 12/16 (75%)                      │
│ Status: Slightly under budget                           │
├─────────────────────────────────────────────────────────┤
│ MONSTER LINEUP                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🐺 Goblin Warrior (L1 Standard)      Qty: [4] Cost: 4│ │
│ │ [Edit] [Remove]                                      │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🐺 Goblin Shaman (L2 Standard)       Qty: [1] Cost: 2│ │
│ │ [Edit] [Remove]                                      │ │
│ └─────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ + Empty Slot                                         │ │
│ │ [Select Monster] [Design New]                        │ │
│ └─────────────────────────────────────────────────────┘ │
│ [+ Add Monster Slot]                                    │
├─────────────────────────────────────────────────────────┤
│ NOTES                                                   │
│ [Environment: Forest clearing               ]           │
│ [GM Notes: Ambush from trees, surprise round]           │
└─────────────────────────────────────────────────────────┘
```

---

## 13. Implementation Status

All phases complete. Implementation files:

### Phase 1: Specification & Types ✅
- [x] `src/lib/rulesdata/schemas/encounter.schema.ts` - SavedEncounter, EncounterMonsterSlot, PartyConfig, EncounterDifficulty

### Phase 2: Data Layer ✅
- [x] Constants defined in `encounter.schema.ts`:
  - DIFFICULTY_MODIFIERS
  - TIER_COST_MULTIPLIERS
  - BUDGET_THRESHOLDS

### Phase 3: Calculator (TDD) ✅
- [x] `src/lib/services/encounterBudgetCalculator.test.ts` - 32 tests covering:
  - Base budget calculation
  - Difficulty modifiers
  - Monster cost calculation
  - Budget validation
  - Threshold calculation
  - Edge cases (level 0, empty encounters)
- [x] `src/lib/services/encounterBudgetCalculator.ts` - All functions implemented
- [x] All tests passing

### Phase 4: Convex Schema ✅
- [x] `convex/schema.ts` - `encounters` table with validators
- [x] Indexes: by_user, by_user_and_id, by_approval_status, by_user_and_deleted

### Phase 5: Convex Functions ✅
- [x] `convex/encounters.ts`:
  - Queries: list, getById, listHomebrew, listTrash
  - Mutations: create, update, duplicate
  - Slot management: addMonsterSlot, updateMonsterSlot, removeMonsterSlot
  - Lifecycle: softDelete, restore, hardDelete
  - Sharing: fork, submitForReview

### Phase 6: Frontend Hooks ✅
- [x] `src/lib/hooks/useEncounters.ts` - Data access and mutations
- [x] `src/lib/hooks/useEncounterPlanner.tsx` - Context + reducer for UI state

### Phase 7: UI Components ✅
- [x] `src/routes/dm/encounters/EncounterList.tsx` - List view with cards
- [x] `src/routes/dm/encounters/EncounterPlanner.tsx` - Main editor (War Room)
- [x] `src/routes/dm/encounters/components/PartyConfigForm.tsx` - Party size/level
- [x] `src/routes/dm/encounters/components/DifficultySelector.tsx` - 5 difficulty buttons with calculation formula
- [x] `src/routes/dm/encounters/components/BudgetMeter.tsx` - Visual progress bar
- [x] `src/routes/dm/encounters/components/MonsterSlots.tsx` - Slot list + picker modal
- [x] `src/routes/dm/encounters/components/EncounterCard.tsx` - Summary card
- [x] `src/routes/dm/encounters/styles/EncounterStyles.ts` - Styled components

### Phase 8: Integration ✅
- [x] Routes in `App.tsx`: `/dm/encounters`, `/dm/encounters/:id`
- [x] Menu integration: "Encounter Planner" in DM Tools section
- [x] Navigation between Monsters and Encounters

### Phase 9: Export/Import (Future)
- [ ] Export/import utilities
- [ ] Bundled monster export
- [ ] Conflict resolution modal
