# DC20Clean – Database & Storage System

> Purpose: Persistence architecture for characters and DM Tools: hybrid localStorage/Convex storage, schemas, auth, migrations.
> Status: Active
> Last Updated: 2026-02-06

---

## 1. Overview

The DC20 Character Creator uses a **hybrid storage model**:

| Storage          | Status           | Use Case                                  |
| ---------------- | ---------------- | ----------------------------------------- |
| **localStorage** | Active (default) | Anonymous users, offline-first            |
| **Convex**       | Active           | Authenticated users, cloud sync, DM Tools |

### 1.1 Data Domains

| Domain               | Tables                       | Status                         |
| -------------------- | ---------------------------- | ------------------------------ |
| Characters           | `characters`                 | Active (Convex + localStorage) |
| DM Tools: Monsters   | `monsters`, `customFeatures` | Active (Convex)                |
| DM Tools: Encounters | `encounters`                 | Active (Convex)                |

The storage abstraction layer (`src/lib/storage/`) allows seamless switching between backends.

---

## 2. Data Model

### 2.1 SavedCharacter

The primary data structure for character persistence. Defined in `src/lib/types/dataContracts.ts`.

**Key sections:**

| Section        | Fields                                                                   | Description                        |
| -------------- | ------------------------------------------------------------------------ | ---------------------------------- |
| Identity       | `id`, `finalName`, `finalPlayerName`, `level`                            | Core character info                |
| Class/Ancestry | `classId`, `className`, `ancestry1Id`, `ancestry1Name`, etc.             | Build choices                      |
| Attributes     | `finalMight`, `finalAgility`, `finalCharisma`, `finalIntelligence`       | Core stats                         |
| Derived Stats  | `finalHPMax`, `finalSPMax`, `finalMPMax`, `finalPD`, `finalAD`, etc.     | Calculated values                  |
| Selections     | `selectedTraitIds`, `selectedFeatureChoices`, `skillsData`, `tradesData` | User choices                       |
| Game State     | `characterState`                                                         | Current HP, inventory, notes, etc. |
| Metadata       | `createdAt`, `lastModified`, `schemaVersion`                             | Timestamps and version             |

### 2.2 CharacterState

Runtime state stored within `SavedCharacter.characterState`:

```typescript
interface CharacterState {
	resources: {
		current: {
			currentHP: number;
			currentSP: number;
			currentMP: number;
			currentGritPoints: number;
			currentRestPoints: number;
			tempHP: number;
			actionPointsUsed: number;
			exhaustionLevel: number;
			deathSteps: number;
			isDead: boolean;
		};
	};
	ui: {
		manualDefenseOverrides: { PD?: number; AD?: number; PDR?: number };
		combatToggles?: { isRaging?: boolean };
	};
	inventory: {
		items: InventoryItemData[];
		currency: { gold: number; silver: number; copper: number };
	};
	notes: { playerNotes: string };
	activeConditions?: string[];
	attacks?: AttackData[];
	spells?: SpellData[];
	maneuvers?: ManeuverData[];
}
```

---

## 3. Storage Architecture

### 3.1 Abstraction Layer

```
┌─────────────────────────────────────────┐
│         Application Code                │
│  (CharacterSheetProvider, LoadCharacter)│
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│       CharacterStorage Interface        │
│  getAllCharacters(), saveCharacter()    │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│ localStorage  │   │    Convex     │
│   Adapter     │   │   Adapter     │
└───────────────┘   └───────────────┘
```

### 3.2 Interface Definition

```typescript
// src/lib/storage/characterStorage.ts
interface CharacterStorage {
	getAllCharacters(): Promise<SavedCharacter[]>;
	getCharacterById(id: string): Promise<SavedCharacter | null>;
	saveCharacter(character: SavedCharacter): Promise<void>;
	saveAllCharacters(characters: SavedCharacter[]): Promise<void>;
	saveCharacterState(characterId: string, state: CharacterState): Promise<void>;
	deleteCharacter(id: string): Promise<void>;
	backup(): Promise<void>;
	restoreFromBackup(): Promise<boolean>;
}
```

### 3.3 Backend Selection

The storage backend is selected via environment variable:

```typescript
// VITE_USE_CONVEX=true → Convex
// VITE_USE_CONVEX=false (or unset) → localStorage
const storage = getDefaultStorage();
```

---

## 4. localStorage Implementation

### 4.1 Storage Key

```
savedCharacters → JSON array of SavedCharacter objects
savedCharacters_backup → Backup copy (for migration safety)
```

### 4.2 Key Functions

| Function                  | File              | Purpose                      |
| ------------------------- | ----------------- | ---------------------------- |
| `getAllSavedCharacters()` | `storageUtils.ts` | Load all characters          |
| `saveAllCharacters()`     | `storageUtils.ts` | Save all characters          |
| `getCharacterById()`      | `storageUtils.ts` | Load single character        |
| `saveCharacter()`         | `storageUtils.ts` | Save/update single character |
| `saveCharacterState()`    | `storageUtils.ts` | Update only game state       |

### 4.3 Serialization

- Uses `JSON.stringify()` and `JSON.parse()` internally
- Schema version tracked for migration support
- Automatic migration of legacy formats (e.g., attacks as object → array)

### 4.4 Limitations

- **5-10MB limit** per origin (browser-dependent)
- **No cross-device sync**
- **Data loss risk** if browser data cleared
- **No authentication** - anyone with browser access can see characters

---

## 5. Convex Implementation (Active)

### 5.1 Status

**Active** - Convex is deployed and used for DM Tools and authenticated users.

### 5.2 Schema - Characters

```typescript
// convex/schema.ts
characters: defineTable({
	userId: v.id('users'),
	id: v.string(),
	finalName: v.string(),
	level: v.number()
	// ... all SavedCharacter fields
})
	.index('by_user', ['userId'])
	.index('by_user_and_id', ['userId', 'id'])
	.index('by_user_and_name', ['userId', 'finalName']);
```

### 5.3 Schema - DM Tools: Monsters

```typescript
monsters: defineTable({
  userId: v.id('users'),
  id: v.string(),                    // mon_<uuid>
  name: v.string(),
  level: v.number(),                 // -1 to 10
  tier: v.union(v.literal('standard'), v.literal('apex'), v.literal('legendary')),
  role: v.string(),
  // Stats
  finalHP: v.number(),
  finalPD: v.number(),
  finalAD: v.number(),
  finalAttack: v.number(),
  finalSaveDC: v.number(),
  finalBaseDamage: v.number(),
  // Features & Actions
  featureIds: v.array(v.string()),
  actions: v.array(monsterActionValidator),
  // Sharing & Metadata
  visibility: v.union(...),
  approvalStatus: v.union(...),
  // ...
})
  .index("by_user", ["userId"])
  .index("by_user_and_id", ["userId", "id"])
  .index("by_approval_status", ["approvalStatus"])
  .index("by_user_and_deleted", ["userId", "deletedAt"])

customFeatures: defineTable({
  userId: v.id('users'),
  id: v.string(),                    // feat_<uuid>
  name: v.string(),
  description: v.string(),
  pointCost: v.number(),             // 1-5
  // Sharing fields...
})
  .index("by_user", ["userId"])
  .index("by_approval_status", ["approvalStatus"])
```

### 5.4 Schema - DM Tools: Encounters

```typescript
encounters: defineTable({
  userId: v.id('users'),
  id: v.string(),                    // enc_<uuid>
  name: v.string(),
  party: partyConfigValidator,       // { size, averageLevel }
  difficulty: v.union(v.literal('trivial'), ...),
  // Budget
  baseBudget: v.number(),
  adjustedBudget: v.number(),
  spentBudget: v.number(),
  remainingBudget: v.number(),
  // Monster Slots
  monsters: v.array(encounterMonsterSlotValidator),
  // Sharing & Metadata
  visibility: v.union(...),
  approvalStatus: v.union(...),
  // ...
})
  .index("by_user", ["userId"])
  .index("by_user_and_id", ["userId", "id"])
  .index("by_approval_status", ["approvalStatus"])
  .index("by_user_and_deleted", ["userId", "deletedAt"])
```

### 5.5 Authentication

- **Google OAuth** and **GitHub OAuth** via Convex Auth
- User ID linked to all records
- Data only visible to owner (except approved homebrew)

### 5.6 Auth UI & Access Control

**Components** (`src/components/auth/`):

| Component              | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `AuthStatus`           | Sign in button / user menu in header      |
| `SignIn`               | OAuth sign-in dialog with feature context |
| `AuthGuard`            | Route protection wrapper                  |
| `useIsAuthenticated()` | Hook to check auth state                  |

**Access Control by Feature**:

| Feature                                           | Auth Required | Notes                                |
| ------------------------------------------------- | ------------- | ------------------------------------ |
| Character Creation                                | No            | Saves to localStorage without auth   |
| Character Creation → Save                         | **Prompted**  | Auth dialog when clicking "Complete" |
| Load Character                                    | No            | Loads from localStorage              |
| DM Tools (Laboratory, War Room)                   | **Yes**       | Menu items hidden until signed in    |
| Reference Tools (Spellbook, Conditions, Equipage) | No            | Public access                        |

**Character Creation Auth Flow**:

```
┌─────────────────────────────────────────────────────────────┐
│  User clicks "Complete" on final step                       │
└─────────────────────┬───────────────────────────────────────┘
                      │
            ┌─────────▼─────────┐
            │ Using Convex?     │
            │ (VITE_USE_CONVEX) │
            └─────────┬─────────┘
                      │
         ┌────────────┴────────────┐
         │ Yes                     │ No
         ▼                         ▼
┌─────────────────┐      ┌─────────────────┐
│ Authenticated?  │      │ Save to         │
└────────┬────────┘      │ localStorage    │
         │               │ immediately     │
    ┌────┴────┐          └─────────────────┘
    │ Yes     │ No
    ▼         ▼
┌───────┐  ┌────────────────────────┐
│ Save  │  │ Show auth dialog       │
│ to    │  │ Set pendingSave=true   │
│ Convex│  └───────────┬────────────┘
└───────┘              │
                       ▼
              ┌────────────────┐
              │ User signs in  │
              └────────┬───────┘
                       │
                       ▼
              ┌────────────────┐
              │ Auto-save      │
              │ triggered      │
              └────────────────┘
```

Key implementation: `src/routes/character-creation/CharacterCreation.tsx`

- `pendingSave` state tracks when waiting for auth
- `useEffect` auto-triggers save when auth completes
- No duplicate saves or manual re-click needed

### 5.7 Benefits

- **Cloud sync** across devices
- **Data safety** - server-side backups
- **Scalability** - no localStorage limits
- **User accounts** - content ownership
- **Sharing** - homebrew library for community content

---

## 6. Migration & Compatibility

### 6.1 Schema Versioning

```typescript
const CURRENT_SCHEMA_VERSION = 2;

// Each character stores its version
character.schemaVersion = CURRENT_SCHEMA_VERSION;
```

### 6.2 Auto-Migration

When loading characters, `deserializeCharacterFromStorage()` automatically:

1. Adds missing fields with defaults
2. Converts legacy formats (object → array)
3. Updates schema version

### 6.3 localStorage → Convex Migration

**Not automatic** - users must:

1. Export characters to JSON (existing feature)
2. Sign in to Convex
3. Import characters (existing feature)

### 6.4 Convex Schema Update Workflow

When validators or table definitions change in `convex/`:

1. Run `npx convex dev --once`
2. Commit schema/function changes together with `convex/_generated/*`
3. Roll out frontend code that consumes the updated generated API

---

## 7. Key Files

### 7.1 Character Storage

| File                                     | Purpose                              |
| ---------------------------------------- | ------------------------------------ |
| `src/lib/types/dataContracts.ts`         | SavedCharacter, CharacterState types |
| `src/lib/utils/storageUtils.ts`          | localStorage CRUD operations         |
| `src/lib/storage/characterStorage.ts`    | Storage interface definition         |
| `src/lib/storage/localStorageAdapter.ts` | localStorage adapter                 |
| `src/lib/storage/index.ts`               | Backend selector                     |
| `convex/schema.ts`                       | Convex schema (all tables)           |
| `convex/characters.ts`                   | Character mutations/queries          |

### 7.2 DM Tools Storage

| File                                            | Purpose                                                    |
| ----------------------------------------------- | ---------------------------------------------------------- |
| `src/lib/rulesdata/schemas/monster.schema.ts`   | SavedMonster, MonsterAction types                          |
| `src/lib/rulesdata/schemas/encounter.schema.ts` | SavedEncounter, EncounterMonsterSlot types                 |
| `src/lib/utils/idGenerator.ts`                  | Prefixed UUID generation (mon*, enc*, feat*, slot*, act\_) |
| `convex/monsters.ts`                            | Monster CRUD, fork, homebrew                               |
| `convex/encounters.ts`                          | Encounter CRUD, slot management                            |
| `convex/customFeatures.ts`                      | Custom feature management                                  |
| `src/lib/hooks/useMonsters.ts`                  | React hooks for monsters                                   |
| `src/lib/hooks/useEncounters.ts`                | React hooks for encounters                                 |

---

## 8. Usage Examples

### 8.1 Loading Characters (Current)

```typescript
// In LoadCharacter.tsx
import { getAllSavedCharacters } from '@/lib/utils/storageUtils';

const characters = getAllSavedCharacters();
```

### 8.2 Loading Characters (Future with Abstraction)

```typescript
import { getDefaultStorage } from '@/lib/storage';

const storage = getDefaultStorage();
const characters = await storage.getAllCharacters();
```

### 8.3 Saving Character State

```typescript
// Auto-save in CharacterSheetProvider
import { saveCharacter } from '@/lib/utils/storageUtils';

const saveCharacterData = async (character: SavedCharacter) => {
	await saveCharacter(updatedCharacter);
};
```

---

## 9. Related Systems

- **Character Sheet** — `docs/systems/CHARACTER_SHEET.MD`
- **PDF Export** — `docs/systems/PDF_EXPORT_SYSTEM.MD`
- **Calculation System** — `docs/systems/CALCULATION_SYSTEM.MD`
- **Monster System** — `docs/systems/MONSTER_SYSTEM_SPEC.MD`
- **Encounter System** — `docs/systems/ENCOUNTER_SYSTEM_SPEC.MD`

---

> Last updated: 2026-02-06
> Maintainer: @DC20Clean-Team

