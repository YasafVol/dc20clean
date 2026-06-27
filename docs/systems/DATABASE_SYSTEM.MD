# DC20Clean – Database & Storage System

> Purpose: Persistence architecture for characters and DM Tools: hybrid localStorage/Convex storage, schemas, auth, migrations.
> Status: Active
> Last Updated: 2026-06-27

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

| Section        | Fields                                                                   | Description                                     |
| -------------- | ------------------------------------------------------------------------ | ----------------------------------------------- |
| Identity       | `id`, `finalName`, `finalPlayerName`, `level`                            | Core character info                             |
| Class/Ancestry | `classId`, `className`, `ancestry1Id`, `ancestry1Name`, etc.             | Build choices                                   |
| Attributes     | `finalMight`, `finalAgility`, `finalCharisma`, `finalIntelligence`       | Core stats                                      |
| Derived Stats  | `finalHPMax`, `finalSPMax`, `finalMPMax`, `finalPD`, `finalAD`, etc.     | Calculated values                               |
| Selections     | `selectedTraitIds`, `selectedTraitChoices`, `selectedFeatureChoices`, `skillsData`, `tradesData` | User choices                                    |
| Game State     | `characterState`                                                         | Current HP, inventory, notes, etc.              |
| Display Arrays | `resistances?`, `vulnerabilities?`, `senses?`, `combatTraining?`         | Calculated display data (v2.2.0+)               |
| Metadata       | `createdAt`, `lastModified`, `schemaVersion`, `rulesVersion`             | Timestamps, storage shape, rules interpretation |

### 2.2 Display Arrays (v2.2.0+)

Optional calculated display arrays populated by the calculator for character sheet display:

- **`resistances?`**: `Array<{ type: string; value: number | 'half'; source: string }>` — Damage resistances (e.g., "Fire", "Cold")
- **`vulnerabilities?`**: `Array<{ type: string; value: number | 'half'; source: string }>` — Damage vulnerabilities
- **`senses?`**: `Array<{ type: string; range: number; source: string }>` — Special senses (e.g., "Darkvision", "Tremorsense")
- **`combatTraining?`**: `Array<{ type: string; source: string }>` — Combat training grants (weapons, armor, shields)

These fields are auto-populated from effect system grants (`GRANT_RESISTANCE`, `GRANT_VULNERABILITY`, `GRANT_SENSE`, `GRANT_COMBAT_TRAINING`) and default to empty arrays if missing (migrated automatically).

### 2.3 CharacterState

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

`activeConditions` stores universal condition IDs. Stacking conditions use concrete IDs such as `slowed-2` or `exhaustion-4` in the same string array and normalize back to their catalog IDs at runtime. `characterState.ui.activeConditions` stores older toggle-style UI condition state for compatibility. `defenseOverrides` stores manual precision/area defense overrides from the redesigned sheet.

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

Local mode does not create a Convex client or mount Convex authentication, so
`VITE_CONVEX_URL` is not required for the default localStorage application.
When `VITE_USE_CONVEX=true`, startup requires `VITE_CONVEX_URL` and fails with a
configuration error if it is missing.

### 3.4 Runtime State Normalization

`normalizeCharacterStateForStorage()` is the shared boundary normalizer for
legacy or partial `SavedCharacter.characterState` data. It fills required
runtime resource fields, UI defaults, inventory currency, notes, and array
surfaces before storage consumers or Convex mutations handle the character.
Convex writes must run character state through this normalizer because table
validators require complete `resources.current` and currency fields, while
older local or cloud records may contain partial nested objects.

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
- Convex authentication is mounted only when `VITE_USE_CONVEX=true`; local mode
  uses an unauthenticated app-auth context and keeps cloud-only routes hidden.

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

Internal versioning policy is defined in `docs/systems/VERSIONING_SYSTEM.MD`. This
storage system owns `schemaVersion` persistence and participates in `rulesVersion`
compatibility, but it must not conflate those lanes.

### 6.1 Schema Versioning

```typescript
const CURRENT_SCHEMA_VERSION = '2.2.0';

// Each character stores its version
character.schemaVersion = CURRENT_SCHEMA_VERSION;
```

**Current Version**: `2.2.0` (as of 2026-06-01)

`schemaVersion` is only the storage-shape version. It must not be used to infer which DC20 rules text a character was built under. Numeric legacy values such as `2` are normalized to semver strings during load/save.

**Version History**:

- `2.0.0`: Initial schema
- `2.1.0`: Added `selectedFeatureChoices`, migrated `selectedTalents` from array to count-based record
- `2.2.0`: Added optional display arrays (`resistances`, `vulnerabilities`, `senses`, `combatTraining`)

### 6.2 Rules Versioning

```typescript
const CURRENT_RULES_VERSION = 'dc20-0.10.5';

// Missing rulesVersion is inferred as the legacy v0.10 ruleset.
character.rulesVersion ?? 'dc20-0.10';
```

`rulesVersion` is the rules interpretation fence. It is additive and is preserved on load, import, save, Convex normalization, draft state, character sheet auto-save, and PDF export routing. New characters are saved as `dc20-0.10.5`; missing or explicit `dc20-0.10` characters are legacy and classify as `upgrade-required` under the current runtime.

Compatibility states are computed at runtime:

| State              | Load | Sheet render | Edit / level up | Auto-save                              | PDF export                      |
| ------------------ | ---- | ------------ | --------------- | -------------------------------------- | ------------------------------- |
| `editable`         | Yes  | Yes          | Yes             | Full character save with recalculation | Yes                             |
| `upgrade-required` | Yes  | Yes          | Blocked         | Disabled                               | Best-effort stored-value export |
| `view-only`        | Yes  | Best effort  | Blocked         | Disabled                               | Best-effort stored-value export |

#### Explicit v0.10 to Current-Version Copy

`LoadCharacter.tsx` exposes an update-to-current-version action for legacy characters. The action is planned
and applied by `src/lib/rulesdata/versioning/characterUpgrade.ts`:

1. Inspect every persisted feature, trait, talent, spell, and maneuver selection through the
   versioned alias catalog.
2. Show automatic renames, reworked selections, deprecated removals, and unresolved blockers
   before writing data.
3. Refuse copy creation when an identity is ambiguous or the source rules version is unsupported.
4. Create a new current-rules copy with lineage metadata (`rulesUpgradeSourceId`,
   `rulesUpgradeSourceVersion`, `rulesUpgradedAt`) while leaving the legacy source record
   locked and unchanged.
5. Rewrite approved aliases, explicitly map listed reworks, remove listed deprecated selections
   in the new copy, and set that copy to `dc20-0.10.5`.
6. Mark the new copy `rulesUpgradeStatus: "needs-review"` for any risky result: removed
   choices, reworked choices, unresolved validation, or failed recalculation.

Migration never mutates the old instance. The legacy source remains view/export/delete only. The new copy preserves stored game state,
notes, inventory, and resources where possible; derived values are interpreted and recalculated
by the normal v0.10.5 sheet/editor pipeline after migration.

If a legacy character already has a current-rules copy, the default UI action opens that copy.
Users can explicitly create another copy from a secondary action.

PDF export always reads stored `SavedCharacter` values. It does not run the current calculator
during export for either legacy or current characters.

### 6.3 Auto-Migration

When loading characters, local storage deserialization automatically normalizes:

1. Adds missing fields with defaults
2. Converts legacy formats (object → array)
3. Updates schema version
4. Applies the same normalization to pasted character JSON import before saving

This is read-time normalization. It becomes durable when the normalized character is later saved. The legacy attacks object-map migration is the only localStorage migration currently persisted immediately on single-character lookup.

**Migration to v2.2.0**: Characters migrating from v2.1.0 or earlier receive empty/default-compatible display fields (`resistances`, `vulnerabilities`, `senses`, `combatTraining`) when loaded and are persisted on the next full save.

Imported older JSON is normalized through the same deserializer before duplicate-ID handling and save, so legacy stringified arrays, missing `rulesVersion`, and older talent shapes follow the same compatibility path as existing localStorage records.

### 6.4 localStorage → Convex Migration

**Not automatic** - users must:

1. Export characters to JSON (existing feature)
2. Sign in to Convex
3. Import characters (existing feature)

### 6.5 Convex Schema Update Workflow

When validators or table definitions change in `convex/`:

1. Run `npx convex dev --once`
2. Commit schema/function changes together with `convex/_generated/*`
3. Roll out frontend code that consumes the updated generated API

---

## 7. Key Files

### 7.1 Character Storage

| File                                               | Purpose                                  |
| -------------------------------------------------- | ---------------------------------------- |
| `src/lib/types/dataContracts.ts`                   | SavedCharacter, CharacterState types     |
| `src/lib/utils/storageUtils.ts`                    | localStorage CRUD operations             |
| `src/lib/storage/characterStorage.ts`              | Storage interface definition             |
| `src/lib/storage/localStorageAdapter.ts`           | localStorage adapter                     |
| `src/lib/storage/index.ts`                         | Backend selector                         |
| `src/lib/rulesdata/versioning/characterUpgrade.ts` | Explicit rules upgrade planner/converter |
| `convex/schema.ts`                                 | Convex schema (all tables)               |
| `convex/characters.ts`                             | Character mutations/queries              |

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

### 8.1 Loading Characters

```typescript
import { getDefaultStorage } from '@/lib/storage';

const storage = getDefaultStorage();
const characters = await storage.getAllCharacters();
```

### 8.2 Saving Character State

```typescript
// Auto-save in CharacterSheetProvider
import { getDefaultStorage } from '@/lib/storage';

const saveCharacterData = async (character: SavedCharacter) => {
	const storage = getDefaultStorage();
	await storage.saveCharacter(updatedCharacter);
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

> Last updated: 2026-06-19
> Maintainer: @DC20Clean-Team
