# DC20Clean – Conditions System Specification

> **Purpose**  
> To create a comprehensive, character-specific conditions tracking system that aggregates condition interactions (immunities, resistances, vulnerabilities) from all character sources (ancestry, class, subclass, talents, features) and displays them in a dedicated character sheet section.

---

## 1. Vision & Goals

**1.1. Core Objective**

Provide players with a complete, at-a-glance view of how their character interacts with every DC20 condition, eliminating the need to manually track feature interactions during gameplay.

**1.2. Success Criteria**

- Every character has a calculated `CharacterConditionStatus[]` array covering all 27 DC20 conditions
- All ancestry traits, class features, subclass features, and talents that grant condition interactions are automatically detected and aggregated
- A new "Conditions" section in the character sheet displays all conditions with which the character has special interactions
- The system integrates seamlessly with the existing Effect System

**1.3. Value Proposition**

When a GM calls for a save against Frightened, the player immediately knows they have "Frightened Resistance (ADV on saves)" from their Dwarf ancestry trait, without searching through multiple feature descriptions.

---

## 2. Data Architecture

### 2.1. Existing Foundation

**Current Files:**

- `src/lib/rulesdata/conditions/conditions.types.ts` – Type definitions for conditions ✅
- `src/lib/rulesdata/conditions/conditions.data.ts` – Complete list of 27 DC20 conditions ✅

**Key Types (Already Defined):**

```typescript
// Condition behavior types
type ConditionType = 'stacking' | 'overlapping' | 'absolute';

// Condition interaction types (as per DC20 rules)
type ConditionInteractionType = 'immunity' | 'resistance' | 'vulnerability';

// Character's interaction with a specific condition
interface ConditionInteraction {
	type: ConditionInteractionType;
	source: string; // e.g., "Barbarian: Iron Mind (Level 7)"
	details?: string; // e.g., "Only while Raging"
}

// Character's complete status for one condition
interface CharacterConditionStatus {
	conditionId: string; // References ConditionDefinition.id
	interactions: ConditionInteraction[]; // Can have multiple sources
}
```

### 2.2. Integration with Effect System

**New Effect Types** (to be added to `src/lib/rulesdata/schemas/character.schema.ts`):

```typescript
// Condition interaction effects
{
  type: 'GRANT_CONDITION_IMMUNITY';
  target: string; // condition ID (e.g., 'frightened', 'charmed')
  value: true;
  details?: string; // optional contextual note
}

{
  type: 'GRANT_CONDITION_RESISTANCE';
  target: string; // condition ID
  value: 'ADV'; // or 'ADV_2' for stacking
  details?: string;
}

{
  type: 'GRANT_CONDITION_VULNERABILITY';
  target: string; // condition ID
  value: 'DisADV';
  details?: string;
}
```

**Mapping DC20 Rules to System:**

- **Condition Immunity** → `GRANT_CONDITION_IMMUNITY` (can't be subjected to condition)
- **Condition Resistance** → `GRANT_CONDITION_RESISTANCE` (ADV on checks/saves against condition)
- **Condition Vulnerability** → `GRANT_CONDITION_VULNERABILITY` (DisADV on checks/saves against condition)

---

## 3. Feature Scanning & Aggregation

### 3.1. Source Feature Audit

**Goal:** Identify and catalog every feature across the codebase that provides condition interactions.

**Data Sources to Scan:**

1. `src/lib/rulesdata/ancestries/traits.ts` – Ancestry traits
2. `src/lib/rulesdata/classes-data/features/*_features.ts` – Class & subclass features
3. `src/lib/rulesdata/classes-data/talents/*.talents.ts` – Class talents
4. `src/lib/rulesdata/paths/` – Character path abilities (if applicable)

**Example Mappings:**

| Source            | Feature         | Condition Interaction                               | Effect Representation                                                      |
| ----------------- | --------------- | --------------------------------------------------- | -------------------------------------------------------------------------- |
| Human Trait       | Undying         | Resistance to Doomed                                | `{ type: 'GRANT_CONDITION_RESISTANCE', target: 'doomed-x', value: 'ADV' }` |
| Barbarian Level 1 | Rage            | ADV on Might Saves (relates to multiple conditions) | Requires breakdown: affects Weakened-X, Restrained, Paralyzed saves        |
| Paladin Subclass  | Divine Presence | Immunity to Frightened                              | `{ type: 'GRANT_CONDITION_IMMUNITY', target: 'frightened', value: true }`  |
| Elf Trait         | Fey Ancestry    | Resistance to Charmed                               | `{ type: 'GRANT_CONDITION_RESISTANCE', target: 'charmed', value: 'ADV' }`  |

**Special Cases:**

- **Stat-based saves** (e.g., "ADV on Might Saves"): Must be expanded to list affected conditions:
  - Might Saves relate to: Weakened-X, Restrained, Paralyzed, Petrified, etc.
  - Implementation: Create helper function `getConditionsAffectedByAttribute(attribute: string): string[]`

- **Conditional interactions** (e.g., "While Raging"):
  - Store in `details` field: `"Only while Raging"`
  - UI displays with context indicator

### 3.2. Refactoring Existing Features

**Phase 1: Explicit Condition References**

Update features that currently use text-only descriptions to include structured condition effects.

**Before:**

```typescript
{
  id: 'human_undying',
  name: 'Undying',
  description: 'You have ADV on Saves against the Doomed Condition.',
  cost: 0,
  effects: [{ type: 'GRANT_ADV_ON_SAVE', target: 'Doomed', value: 'ADV' }]
}
```

**After:**

```typescript
{
  id: 'human_undying',
  name: 'Undying',
  description: 'You have ADV on Saves against the Doomed Condition.',
  cost: 0,
  effects: [
    { type: 'GRANT_CONDITION_RESISTANCE', target: 'doomed-x', value: 'ADV' }
  ]
}
```

**Phase 2: Implicit Condition References**

Expand save-based advantages to explicit condition lists.

**Before:**

```typescript
{
  id: 'barbarian_rage',
  featureName: 'Rage',
  description: 'ADV on Might Saves...',
  effects: [
    {
      type: 'GRANT_ABILITY',
      target: 'rage',
      value: 'ADV on Might Saves, ...'
    }
  ]
}
```

**After (expanded):**

```typescript
{
  id: 'barbarian_rage',
  featureName: 'Rage',
  description: 'ADV on Might Saves...',
  effects: [
    { type: 'GRANT_ABILITY', target: 'rage', value: '...' },
    // Expanded condition interactions
    { type: 'GRANT_CONDITION_RESISTANCE', target: 'weakened-x', value: 'ADV', details: 'While Raging' },
    { type: 'GRANT_CONDITION_RESISTANCE', target: 'restrained', value: 'ADV', details: 'While Raging' },
    { type: 'GRANT_CONDITION_RESISTANCE', target: 'paralyzed', value: 'ADV', details: 'While Raging' },
    // ... etc for all Might Save conditions
  ]
}
```

---

## 4. Calculation Engine Integration

### 4.1. New Service: Condition Aggregator

**File:** `src/lib/services/conditionAggregator.ts`

**Primary Function:**

```typescript
/**
 * Aggregates all condition interactions for a character
 * @param character - The character data with selected features
 * @returns Array of condition statuses covering all 27 DC20 conditions
 */
export function calculateCharacterConditions(character: CharacterData): CharacterConditionStatus[] {
	const interactions = new Map<string, ConditionInteraction[]>();

	// 1. Start with all conditions (empty interactions)
	ALL_CONDITIONS.forEach((condition) => {
		interactions.set(condition.id, []);
	});

	// 2. Scan ancestry traits
	character.selectedTraits?.forEach((trait) => {
		processConditionEffects(trait.effects, trait.name, 'Ancestry', interactions);
	});

	// 3. Scan class features (up to character level)
	const classFeatures = getClassFeaturesUpToLevel(character.className, character.level);
	classFeatures.forEach((feature) => {
		processConditionEffects(feature.effects, feature.featureName, 'Class', interactions);
	});

	// 4. Scan subclass features
	if (character.subclass) {
		const subclassFeatures = getSubclassFeaturesUpToLevel(
			character.className,
			character.subclass,
			character.level
		);
		subclassFeatures.forEach((feature) => {
			processConditionEffects(feature.effects, feature.featureName, 'Subclass', interactions);
		});
	}

	// 5. Scan selected talents
	character.selectedTalents?.forEach((talent) => {
		processConditionEffects(talent.effects, talent.name, 'Talent', interactions);
	});

	// 6. Convert map to CharacterConditionStatus array
	return Array.from(interactions.entries()).map(([conditionId, interactionList]) => ({
		conditionId,
		interactions: interactionList
	}));
}
```

**Helper Function:**

```typescript
function processConditionEffects(
	effects: Effect[],
	sourceName: string,
	sourceCategory: string,
	interactions: Map<string, ConditionInteraction[]>
): void {
	effects.forEach((effect) => {
		if (
			effect.type === 'GRANT_CONDITION_IMMUNITY' ||
			effect.type === 'GRANT_CONDITION_RESISTANCE' ||
			effect.type === 'GRANT_CONDITION_VULNERABILITY'
		) {
			const conditionId = effect.target;
			const existingInteractions = interactions.get(conditionId) || [];

			existingInteractions.push({
				type: effect.type.replace('GRANT_CONDITION_', '').toLowerCase() as ConditionInteractionType,
				source: `${sourceCategory}: ${sourceName}`,
				details: effect.details
			});

			interactions.set(conditionId, existingInteractions);
		}
	});
}
```

### 4.2. Integration with Character Calculator

**File:** `src/lib/services/enhancedCharacterCalculator.ts`

**Update:** Add conditions to calculation result

```typescript
export interface EnhancedCalculationResult {
	// ... existing fields
	conditions: CharacterConditionStatus[]; // NEW
}

export function calculateCharacterWithBreakdowns(
	character: CharacterData
): EnhancedCalculationResult {
	// ... existing calculation logic

	const conditions = calculateCharacterConditions(character);

	return {
		// ... existing fields
		conditions
	};
}
```

---

## 5. UI/UX Design

### 5.1. Character Sheet Section

**Location:** New section in character sheet, displayed alongside Features

**Component:** `src/routes/character-sheet/components/Conditions.tsx`

**Visual Design:**

```
┌─────────────────────────────────────────┐
│ 🛡️ Condition Interactions               │
├─────────────────────────────────────────┤
│                                          │
│ 🚫 IMMUNITIES (3)                        │
│ ├─ Frightened                            │
│ │  └─ Source: Paladin: Aura of Courage   │
│ ├─ Charmed                               │
│ │  └─ Source: Elf Ancestry: Fey Ancestry │
│ └─ Poisoned                              │
│    └─ Source: Dwarf Ancestry: Dwarven    │
│       Resilience                         │
│                                          │
│ ✨ RESISTANCES (5)                       │
│ ├─ Doomed                                │
│ │  └─ ADV on saves - Human: Undying     │
│ ├─ Weakened                              │
│ │  └─ ADV on saves (While Raging)       │
│ │     - Barbarian: Rage                  │
│ ├─ Restrained                            │
│ │  └─ ADV on saves (While Raging)       │
│ │     - Barbarian: Rage                  │
│ │  └─ ADV on saves - Feat: Slippery     │
│ └─ ...                                   │
│                                          │
│ ⚠️ VULNERABILITIES (1)                   │
│ └─ Burning                               │
│    └─ DisADV on saves - Beastborn:       │
│       Wooden Skin                        │
│                                          │
│ 📋 ALL CONDITIONS (Expanded)             │
│ [Collapsible list of all 27 conditions  │
│  showing "No special interaction" for    │
│  conditions without modifiers]           │
└─────────────────────────────────────────┘
```

**Key Features:**

1. **Grouped by interaction type** – Immunities, Resistances, Vulnerabilities displayed prominently
2. **Source attribution** – Every interaction shows which feature grants it
3. **Contextual details** – Conditional interactions (e.g., "While Raging") clearly marked
4. **Expandable full list** – Shows all 27 conditions, marking those without interactions as "None"
5. **Search/Filter** – Quick filter to find specific conditions
6. **Info buttons** – Click condition name to see full DC20 rules description

### 5.2. Component Structure

```typescript
interface ConditionsProps {
	conditionStatuses: CharacterConditionStatus[];
	isMobile?: boolean;
}

const Conditions: React.FC<ConditionsProps> = ({ conditionStatuses, isMobile }) => {
	const [expandedView, setExpandedView] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	// Separate conditions by interaction type
	const immunities = conditionStatuses.filter((cs) =>
		cs.interactions.some((i) => i.type === 'immunity')
	);

	const resistances = conditionStatuses.filter((cs) =>
		cs.interactions.some((i) => i.type === 'resistance')
	);

	const vulnerabilities = conditionStatuses.filter((cs) =>
		cs.interactions.some((i) => i.type === 'vulnerability')
	);

	const noInteractions = conditionStatuses.filter((cs) => cs.interactions.length === 0);

	// ... rendering logic
};
```

### 5.3. Mobile Considerations

- Collapsible sections by default on mobile
- "Quick View" showing only conditions with interactions
- Swipe-to-reveal full condition descriptions
- Add to existing "Info" tab in mobile character sheet

---

## 6. Implementation Phases

### Phase 1: Foundation (Data & Types) ✅ COMPLETE

- [x] `conditions.types.ts` – Type definitions
- [x] `conditions.data.ts` – All 27 DC20 conditions
- [ ] Add new effect types to `character.schema.ts`
- [ ] Update Effect type union in calculator

### Phase 2: Feature Audit & Refactoring

**M2.1: Scan & Catalog**

- [ ] Create script `scripts/audit-condition-features.ts`
- [ ] Scan all ancestry traits for condition interactions
- [ ] Scan all class features for condition interactions
- [ ] Scan all talents for condition interactions
- [ ] Generate report: `CONDITION_FEATURES_AUDIT.md`

**M2.2: Create Mapping Helpers**

- [ ] Implement `getConditionsAffectedByAttribute(attribute: string): string[]`
- [ ] Document attribute → condition mappings
  - Might Saves → [weakened-x, restrained, paralyzed, petrified, ...]
  - Agility Saves → [slowed-x, immobilized, restrained, ...]
  - Charisma Saves → [charmed, frightened, intimidated, taunted, ...]
  - Intelligence Saves → [dazed-x, disoriented-x, ...]

**M2.3: Update Feature Definitions**

- [ ] Refactor ancestry traits with explicit condition effects
- [ ] Refactor class features with explicit condition effects
- [ ] Refactor subclass features with explicit condition effects
- [ ] Refactor talents with explicit condition effects
- [ ] Update tests to validate new effect types

**HR-1:** Human review of refactored features (sample 20% per source type)

### Phase 3: Calculation Engine

**M3.1: Condition Aggregator Service**

- [ ] Create `src/lib/services/conditionAggregator.ts`
- [ ] Implement `calculateCharacterConditions()`
- [ ] Implement `processConditionEffects()` helper
- [ ] Write unit tests for aggregation logic

**M3.2: Calculator Integration**

- [ ] Add `conditions: CharacterConditionStatus[]` to `EnhancedCalculationResult`
- [ ] Integrate `calculateCharacterConditions()` into main calculator flow
- [ ] Update `characterContext.tsx` to expose conditions
- [ ] Write integration tests

**HR-2:** Verify calculation accuracy with test characters (Human Undying + Barbarian Rage + Elf Fey Ancestry)

### Phase 4: UI Implementation

**M4.1: Conditions Component**

- [ ] Create `src/routes/character-sheet/components/Conditions.tsx`
- [ ] Implement grouped display (immunities/resistances/vulnerabilities)
- [ ] Implement search/filter functionality
- [ ] Add condition detail popups (show full DC20 description)
- [ ] Style component to match existing character sheet design

**M4.2: Character Sheet Integration**

- [ ] Add Conditions section to desktop layout (`CharacterSheetClean.tsx`)
- [ ] Add Conditions to mobile "Info" tab (`CharacterSheetMobile.tsx`)
- [ ] Ensure responsive behavior
- [ ] Add E2E test coverage

**M4.3: Polish & Accessibility**

- [ ] Add loading states
- [ ] Implement keyboard navigation
- [ ] Add ARIA labels for screen readers
- [ ] Test with various character builds (0 interactions, 10+ interactions)

**HR-3:** User testing with representative character builds

### Phase 5: Documentation & Testing

**M5.1: Documentation**

- [ ] Update `docs/systems/CALCULATION_SYSTEM.MD` with condition aggregation flow
- [ ] Update `docs/systems/CHARACTER_SHEET.MD` with Conditions section details
- [ ] Create `docs/systems/CONDITIONS_SYSTEM.MD` (move this spec into systems)
- [ ] Add inline JSDoc comments to all condition-related functions

**M5.2: E2E Testing**

- [ ] Create `e2e/13-conditions.e2e.spec.ts`
- [ ] Test condition display for character with multiple interactions
- [ ] Test search/filter functionality
- [ ] Test condition detail popups
- [ ] Test mobile responsive behavior

**M5.3: Edge Cases**

- [ ] Character with 0 condition interactions
- [ ] Character with 10+ sources for same condition (stacking display)
- [ ] Conditional interactions (verify "While Raging" displays correctly)
- [ ] Multiclass character (verify features from both classes)

---

## 7. File Touchpoints

### New Files

- ✅ `src/lib/rulesdata/conditions/conditions.types.ts`
- ✅ `src/lib/rulesdata/conditions/conditions.data.ts`
- `src/lib/services/conditionAggregator.ts`
- `src/routes/character-sheet/components/Conditions.tsx`
- `scripts/audit-condition-features.ts`
- `e2e/13-conditions.e2e.spec.ts`
- `docs/systems/CONDITIONS_SYSTEM.MD`

### Modified Files

- `src/lib/rulesdata/schemas/character.schema.ts` – Add condition effect types
- `src/lib/services/enhancedCharacterCalculator.ts` – Integrate condition aggregation
- `src/lib/stores/characterContext.tsx` – Expose conditions in context
- `src/routes/character-sheet/CharacterSheetClean.tsx` – Add Conditions section
- `src/routes/character-sheet/CharacterSheetMobile.tsx` – Add to Info tab
- `src/lib/rulesdata/ancestries/traits.ts` – Update traits with condition effects
- `src/lib/rulesdata/classes-data/features/*.ts` – Update features with condition effects
- `src/lib/rulesdata/classes-data/talents/*.ts` – Update talents with condition effects
- `docs/systems/CALCULATION_SYSTEM.MD` – Document condition flow
- `docs/systems/CHARACTER_SHEET.MD` – Document Conditions section

---

## 8. Acceptance Criteria

### AC-1: Data Completeness

- [ ] All 27 DC20 conditions defined in `conditions.data.ts`
- [ ] Every condition has `id`, `name`, `description`, `type`, `tags`
- [ ] Condition IDs match DC20 naming (e.g., `bleeding-x`, `frightened`)

### AC-2: Feature Coverage

- [ ] 100% of condition-granting features identified and cataloged
- [ ] All ancestry traits with condition interactions use structured effects
- [ ] All class features with condition interactions use structured effects
- [ ] All talents with condition interactions use structured effects

### AC-3: Calculation Accuracy

Given a character with:

- Human Ancestry (Undying trait → Doomed Resistance)
- Barbarian Level 1 (Rage → ADV on Might Saves)
- Elf Heritage (Fey Ancestry → Charmed Resistance)

Then `calculationResult.conditions` contains:

- `doomed-x`: 1 resistance interaction (Human: Undying)
- `charmed`: 1 resistance interaction (Elf: Fey Ancestry)
- `weakened-x`: 1 resistance interaction (Barbarian: Rage, "While Raging")
- `restrained`: 1 resistance interaction (Barbarian: Rage, "While Raging")
- ... (all Might Save conditions)
- All other conditions: 0 interactions

### AC-4: UI Functionality

- [ ] Conditions section visible in character sheet (desktop & mobile)
- [ ] Conditions grouped by type (immunities/resistances/vulnerabilities)
- [ ] Source attribution displayed for each interaction
- [ ] Conditional details (e.g., "While Raging") clearly marked
- [ ] Search/filter finds conditions by name
- [ ] Clicking condition name opens full DC20 description
- [ ] "No special interaction" displayed for unaffected conditions (in expanded view)

### AC-5: E2E Validation

- [ ] `e2e/13-conditions.e2e.spec.ts` passes
- [ ] Human Cleric test character shows expected condition interactions
- [ ] Hunter Beastborn test character shows expected condition interactions
- [ ] Mobile layout displays conditions correctly

---

## 9. Dependencies & Constraints

### Dependencies

- **Effect System** (`docs/systems/EFFECT_SYSTEM.MD`) – Must support new condition effect types
- **Calculation System** (`docs/systems/CALCULATION_SYSTEM.MD`) – Must integrate condition aggregation
- **Class System** (`docs/systems/CLASS_SYSTEM.MD`) – Features must use structured effects
- **Ancestry System** (`docs/systems/ANCESTRY_SYSTEM.MD`) – Traits must use structured effects

### Constraints

- **No Schema Migrations** – Use existing `Effect` type union, extend with new types
- **Backward Compatibility** – Existing characters without condition data default to empty interactions
- **Performance** – Condition calculation must not exceed 50ms for character with 20 features
- **Mobile-First** – Conditions UI must be usable on 375px viewport

---

## 10. Future Enhancements (Out of Scope)

- **Active Condition Tracking** – Track currently applied conditions during combat (separate feature)
- **Condition Stacking Calculator** – Calculate current Exhaustion X / Stunned X values
- **Homebrew Conditions** – Allow users to define custom conditions
- **Condition Automation** – Auto-apply condition effects to rolls (requires VTT integration)
- **Condition Presets** – "Common Combat Conditions" quick reference panel

---

## 11. Troubleshooting & FAQs

### Q: How do we handle features that give ADV on saves for an attribute (e.g., "ADV on Might Saves")?

**A:** Create a mapping helper `getConditionsAffectedByAttribute()` that returns all conditions resisted by that save type. Expand the single effect into multiple `GRANT_CONDITION_RESISTANCE` effects, one per affected condition. Mark each with `details: "While [condition applies]"` if contextual.

### Q: What if multiple sources grant the same condition interaction?

**A:** Store all sources in the `interactions[]` array. UI displays as:

```
Frightened
├─ Immunity - Paladin: Aura of Courage (Level 7)
└─ Immunity - Feat: Fearless Heart
```

Mechanically, one immunity is sufficient, but showing all sources helps players understand their character.

### Q: How do we handle conditional interactions (e.g., "Only while Raging")?

**A:** Use the `details` field in `ConditionInteraction`:

```typescript
{
  type: 'resistance',
  source: 'Barbarian: Rage',
  details: 'While Raging'
}
```

UI displays: `✨ ADV on saves (While Raging) - Barbarian: Rage`

### Q: Should we show conditions with no interactions in the main view?

**A:** No. Default view shows only conditions with interactions (immunities/resistances/vulnerabilities). Provide an "Expand All Conditions" toggle to show the complete list with "No special interaction" markers for thoroughness.

---

## 12. Agent Execution Notes

For AI agents implementing this spec:

1. **Start with Phase 2.1** (Feature Audit) – Create the audit script first to understand scope
2. **Follow HR checkpoints** – Do not proceed past HR-1, HR-2, HR-3 without explicit approval
3. **Maintain ID stability** – Do not change existing feature IDs; only add new effects
4. **Write tests first** – TDD approach for condition aggregator (Phase 3.1)
5. **Preserve existing UI** – Conditions section should not disrupt current character sheet layout
6. **Document as you go** – Update JSDoc comments with every function implementation

---

> **Last updated:** 2025-10-04  
> **Status:** Draft - Pending Phase 1 completion (Effect type additions)  
> **Maintainer:** @DC20Clean-Team  
> **Related Specs:** `EFFECT_SYSTEM.MD`, `CLASS_SYSTEM.MD`, `TRAITS_SYSTEM.MD`, `CALCULATION_SYSTEM.MD`
