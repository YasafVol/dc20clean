# DC20Clean – Database & Storage System

> Purpose
> Document the character persistence architecture, covering both localStorage (current) and Convex cloud storage (planned).

---

## 1. Overview

The DC20 Character Creator uses a **hybrid storage model**:

| Storage | Status | Use Case |
|---------|--------|----------|
| **localStorage** | Active (default) | Anonymous users, offline-first |
| **Convex** | Planned | Authenticated users, cloud sync |

The storage abstraction layer (`src/lib/storage/`) allows seamless switching between backends.

---

## 2. Data Model

### 2.1 SavedCharacter

The primary data structure for character persistence. Defined in `src/lib/types/dataContracts.ts`.

**Key sections:**

| Section | Fields | Description |
|---------|--------|-------------|
| Identity | `id`, `finalName`, `finalPlayerName`, `level` | Core character info |
| Class/Ancestry | `classId`, `className`, `ancestry1Id`, `ancestry1Name`, etc. | Build choices |
| Attributes | `finalMight`, `finalAgility`, `finalCharisma`, `finalIntelligence` | Core stats |
| Derived Stats | `finalHPMax`, `finalSPMax`, `finalMPMax`, `finalPD`, `finalAD`, etc. | Calculated values |
| Selections | `selectedTraitIds`, `selectedFeatureChoices`, `skillsData`, `tradesData` | User choices |
| Game State | `characterState` | Current HP, inventory, notes, etc. |
| Metadata | `createdAt`, `lastModified`, `schemaVersion` | Timestamps and version |

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
  };
  inventory: {
    items: InventoryItemData[];
    currency: { gold: number; silver: number; copper: number };
  };
  notes: { playerNotes: string };
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

| Function | File | Purpose |
|----------|------|---------|
| `getAllSavedCharacters()` | `storageUtils.ts` | Load all characters |
| `saveAllCharacters()` | `storageUtils.ts` | Save all characters |
| `getCharacterById()` | `storageUtils.ts` | Load single character |
| `saveCharacter()` | `storageUtils.ts` | Save/update single character |
| `saveCharacterState()` | `storageUtils.ts` | Update only game state |

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

## 5. Convex Implementation (Planned)

### 5.1 Status

**Prep work complete** - See `docs/plannedSpecs/CONVEX_MIGRATION_SPEC.md`

### 5.2 Schema

```typescript
// convex/schema.ts
characters: defineTable({
  userId: v.string(),  // Links to authenticated user
  finalName: v.string(),
  level: v.number(),
  // ... all SavedCharacter fields
})
  .index("by_user", ["userId"])
  .index("by_user_and_name", ["userId", "finalName"])
```

### 5.3 Authentication

- **Google OAuth** and **GitHub OAuth**
- User ID linked to all character records
- Characters only visible to their owner

### 5.4 Benefits

- **Cloud sync** across devices
- **Data safety** - server-side backups
- **Scalability** - no localStorage limits
- **User accounts** - character ownership

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

---

## 7. Key Files

| File | Purpose |
|------|---------|
| `src/lib/types/dataContracts.ts` | SavedCharacter, CharacterState types |
| `src/lib/utils/storageUtils.ts` | localStorage CRUD operations |
| `src/lib/storage/characterStorage.ts` | Storage interface definition |
| `src/lib/storage/localStorageAdapter.ts` | localStorage adapter |
| `src/lib/storage/convexStorageAdapter.ts` | Convex adapter (placeholder) |
| `src/lib/storage/index.ts` | Backend selector |
| `convex/schema.ts.draft` | Convex schema (pending activation) |
| `convex/characters.ts.draft` | Convex mutations/queries (pending) |

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
- **Convex Migration** — `docs/plannedSpecs/CONVEX_MIGRATION_SPEC.md`

---

> Last updated: 2026-01-14
> Maintainer: @DC20Clean-Team
