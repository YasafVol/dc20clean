# Project Specification: DC20 Encounter Generator v0.5 (Fully Typed & Production-Ready)

## METADATA

- **Project Name:** DC20 Encounter Generator
- **Version:** 0.5 (Fully Typed & Production-Ready)
- **Output:** A self-contained, client-side web application.
- **Specification Format:** Agentic Markdown (MD)
- **Author:** Gemini AI (Incorporating all user feedback)
- **Date:** 2025-09-08

---

## 1. Project Charter & Vision

### 1.1. Goal

To create a high-performance, self-contained, client-side web application that allows a Dungeon Master (DM) to generate **mathematically sound, reproducible, and transparently balanced** monster encounters based on the DC20 ruleset, with a fully type-safe architecture from data ingestion to UI rendering.

### 1.2. Core Value Proposition

To be the most reliable and trustworthy encounter generator for DC20 by eliminating manual work, mathematical uncertainty, and performance bottlenecks. It provides a one-click solution with game-ready stat blocks, underpinned by a robust, deterministic, and type-safe rules engine.

---

## 2. Core Rules Engine Logic (Hardened & Explicit)

The entire engine is built on **scaled integer math** to avoid floating-point inaccuracies and ensure performance.

### 2.1. Effective Level Key Calculation

- **`effectiveLevelScaleFactor`:** A constant from `ApplicationConfiguration`, used to convert all effective levels into integers.
- **Formula:** `effectiveLevelKey = Math.round(monster.level * classificationMultipliers[monster.classification] * effectiveLevelScaleFactor)`
- **Implementation:** This key is the **sole metric** for all budget, tolerance, and selection mathematics. It is pre-computed and stored on each `Monster` object during data ingestion.

### 2.2. Target Budget & Adaptive Tolerance

- **`partyBudgetEffectiveLevelKey` Formula:** `(input.numberOfPlayerCharacters * input.playerCharacterLevel) * config.effectiveLevelScaleFactor`
- **`targetEncounterEffectiveLevelKey` Formula:** `partyBudgetEffectiveLevelKey + (difficultyRules[difficulty].playerLevelDifficultyModifier * input.playerCharacterLevel * config.effectiveLevelScaleFactor)`
- **`toleranceEffectiveLevelKey` Calculation (Corrected Units):**
  ```typescript
  // /src/lib/tolerance.ts
  export function computeToleranceEffectiveLevelKey(
  	targetKey: number,
  	config: ApplicationConfiguration
  ): number {
  	const percentTolerance = Math.ceil(config.tolerancePercent * targetKey);
  	return Math.max(
  		config.minimumToleranceEffectiveLevelKey,
  		Math.min(percentTolerance, config.maximumToleranceEffectiveLevelKey)
  	);
  }
  ```
- **Success Condition:** An encounter is a "perfect match" if `abs(actualKey - targetKey) <= toleranceKey`.

### 2.3. Hybrid Encounter Generation Strategy

- **Feasibility Precheck:** Before any search, compute the reachable sum band. If the target is outside it, short-circuit with a `TARGET_OUT_OF_REACH` error.
- **Small-n Exact Solver:** If `desiredMonsterCount <= config.exactSolverMaximumMonsterCount`, attempt a meet-in-the-middle exact search.
- **Heuristic Fallback:** If the exact solver fails or is skipped, use a "Greedy Selection with Directional Repair" heuristic.

---

## 3. Type System & Data Architecture (Strict & Complete)

This section defines the complete type surface area of the application. All data, functions, and component boundaries must adhere to these contracts.

### 3.1. Zod Schemas (`/src/types/schemas.ts`)

- **Purpose:** To provide runtime validation that mirrors the TypeScript interfaces.
- **Agentic Instruction:** Create Zod schemas for `ApplicationConfiguration`, `ResistanceOrVulnerability`, `Monster`, and `BestiaryFile` that exactly match the interfaces defined below.

### 3.2. TypeScript Interfaces

#### 3.2.1. Domain Literals & Tables (`/src/types/domain.ts`)

```typescript
export type MonsterClassification = 'Standard' | 'Apex' | 'Legendary';
export type EncounterDifficulty = 'Trivial' | 'Easy' | 'Medium' | 'Hard' | 'Deadly';
export type MonsterRole = string;
export type MonsterSize = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge';
export interface DifficultyRule {
	playerLevelDifficultyModifier: number;
}
export type DifficultyRuleTable = Readonly<Record<EncounterDifficulty, DifficultyRule>>;
export type ClassificationMultiplierTable = Readonly<Record<MonsterClassification, number>>;
```

#### 3.2.2. Configuration (`/src/types/configuration.ts`)

```typescript
export interface ApplicationConfiguration {
	version: string;
	bestiarySource: string;
	candidatePoolVarianceFraction: number;
	maximumCandidatePoolVarianceWidenFraction: number;
	tolerancePercent: number;
	minimumToleranceEffectiveLevelKey: number;
	maximumToleranceEffectiveLevelKey: number;
	effectiveLevelScaleFactor: number;
	enableDuplicateMonsters: boolean;
	allowSameNameDuplicateMonsters: boolean;
	maximumCopiesPerMonster: number;
	preferMonsterVariety: boolean;
	maximumSelectionAttempts: number;
	exactSolverMaximumMonsterCount: number;
	randomSeedDefaultBehavior: 'auto';
	maximumFileUploadBytes: number;
}
```

#### 3.2.3. Monster & Bestiary (`/src/types/monster.ts`, `/src/types/bestiary.ts`)

```typescript
export interface ResistanceOrVulnerability {
	kind: string;
	tier?: number;
	flat?: number;
}
export interface MonsterStats {
	hitPoints: number;
	physicalDefense: { low: number; mid: number; high: number };
	arcaneDefense: { low: number; mid: number; high: number };
	attributes: {
		might: number;
		agility: number;
		charisma: number;
		intellect: number;
		primeAttribute?: 'might' | 'agility' | 'charisma' | 'intellect';
	};
	attackBonus: number;
	savingThrowDifficultyClass: number;
	speed: number;
	otherSpeeds?: ReadonlyArray<{ kind: string; value: number }>;
}
export interface MonsterDefenses {
	resistances?: ReadonlyArray<ResistanceOrVulnerability>;
	vulnerabilities?: ReadonlyArray<ResistanceOrVulnerability>;
	immunities?: ReadonlyArray<string>;
}
export interface Monster {
	id: string;
	name: string;
	level: number;
	classification: MonsterClassification;
	role: MonsterRole;
	size: MonsterSize;
	type: string;
	sourcePage: number;
	effectiveLevelKey: number;
	effectiveLevelForDisplay: number;
	stats: MonsterStats;
	defenses?: MonsterDefenses;
	skills?: ReadonlyArray<{ name: string; bonus: number }>;
	senses?: ReadonlyArray<{ name: string; value?: number }>;
	features: ReadonlyArray<{ name: string; description: string }>;
	actions: ReadonlyArray<{
		cost: 1 | 2 | 3;
		name: string;
		description: string;
		enhancement?: string;
	}>;
	reactions?: ReadonlyArray<{ cost: 1 | 2 | 3; name: string; description: string }>;
}
export interface BestiaryFile {
	meta: { schemaVersion: string; bestiaryId: string; entryCount: number };
	monsters: Monster[];
}
```

#### 3.2.4. Rules Engine Contracts (`/src/types/engine.ts`)

```typescript
export interface EncounterGenerationInput {
	numberOfPlayerCharacters: number;
	playerCharacterLevel: number;
	desiredEncounterDifficulty: EncounterDifficulty;
	desiredMonsterCount: number;
	randomSeedString: string;
}
export interface SelectedMonsterInstance {
	monsterId: string;
	name: string;
	effectiveLevelKey: number;
	level: number;
	classification: 'Standard' | 'Apex' | 'Legendary';
}
export interface GeneratedEncounter {
	selectedMonsters: SelectedMonsterInstance[]; // deterministic order
	totalEncounterEffectiveLevelKey: number;
}
export type EncounterGenerationErrorCode =
	| 'NO_CANDIDATE_MONSTERS'
	| 'TARGET_OUT_OF_REACH'
	| 'VALIDATION_FAILURE'
	| 'INTERNAL_ERROR';
export interface EncounterGenerationSuccessMeta {
	targetEncounterEffectiveLevelKey: number;
	toleranceEffectiveLevelKey: number;
	differenceBetweenActualAndTargetEffectiveLevelKey: number;
	isPerfectMatchWithinTolerance: boolean;
	randomSeedString: string;
	rulesEngineVersion: string;
	bestiaryIdentifier: string;
}
export type EncounterGenerationResult =
	| { kind: 'success'; encounter: GeneratedEncounter; meta: EncounterGenerationSuccessMeta }
	| { kind: 'error'; code: EncounterGenerationErrorCode; message: string; details?: unknown };
```

#### 3.2.5. Worker Protocol (`/src/workers/types.ts`)

```typescript
export type GenerateEncounterRequestMessage = {
	type: 'generateEncounterRequest';
	payload: { input: EncounterGenerationInput };
};
export type GenerateEncounterProgressMessage = {
	type: 'generateEncounterProgress';
	payload: {
		stage:
			| 'loadingBestiaryData'
			| 'creatingEffectiveLevelBuckets'
			| 'attemptingExactSolution'
			| 'executingHeuristicSearch';
		numberOfSwapAttemptsSoFar?: number;
	};
};
export type GenerateEncounterSuccessMessage = {
	type: 'generateEncounterSuccess';
	payload: Extract<EncounterGenerationResult, { kind: 'success' }>;
};
export type GenerateEncounterErrorMessage = {
	type: 'generateEncounterError';
	payload: Extract<EncounterGenerationResult, { kind: 'error' }>;
};
export type EncounterWorkerIncomingMessage = GenerateEncounterRequestMessage;
export type EncounterWorkerOutgoingMessage =
	| GenerateEncounterProgressMessage
	| GenerateEncounterSuccessMessage
	| GenerateEncounterErrorMessage;
```

#### 3.2.6. PRNG Interface (`/src/lib/prng.ts`)

```typescript
export interface PseudoRandomNumberGenerator {
	nextFloatUnitInterval(): number;
	nextIntegerInclusive(minimumInclusive: number, maximumInclusive: number): number;
	pickRandomElement<T>(items: readonly T[]): T;
	shuffleInPlace<T>(items: T[]): void;
}
```

#### 3.2.7. Data Service & UI Props (`/src/types/data-service.ts`, `/src/types/ui.ts`)

- As defined in the previous specification.

---

## 4. Development Plan: Tasks & Tracker

The plan remains the same, but the acceptance criteria for each ticket are now stricter, requiring adherence to the complete type system.

| Ticket ID | Task Description                                                                       | Status | Dependencies |
| :-------- | :------------------------------------------------------------------------------------- | :----- | :----------- |
| **500**   | **Project Setup & Tooling:** Init project, install all dependencies.                   | To Do  | -            |
| **501**   | **Define All Schemas & Types:** Create all Zod schemas and TypeScript interfaces.      | To Do  | #500         |
| **502**   | **Create Ingest Script:** Implement the data normalization and pre-computation script. | To Do  | #501         |
| **503**   | **Build Data Service:** Implement lazy-loading, Zod validation, and bucket creation.   | To Do  | #502         |
| **504**   | **Implement Rules Engine:** Code the hybrid solver with full type safety.              | To Do  | #503         |
| **505**   | **Implement Web Worker:** Set up worker with typed message contracts.                  | To Do  | #504         |
| **506**   | **Build UI Components:** Build all components with typed props.                        | To Do  | #501         |
| **507**   | **Integrate End-to-End:** Wire UI to the worker and handle all typed states.           | To Do  | #505, #506   |
| **508**   | **Write Comprehensive Tests:** Unit, matrix, and property-based tests.                 | To Do  | #504         |
| **509**   | **Implement Legal Fallback:** Build and test the local bestiary upload feature.        | To Do  | #507         |

---

## 5. Acceptance Checklist (Ship Criteria)

- [ ] **Type Safety:** The entire application surface area is typed, from config to UI props. Zod schemas provide runtime validation.
- [ ] **Engine:** Works exclusively in scaled integer `effectiveLevelKey` values. Tolerance math is unit-correct.
- [ ] **Solver:** Hybrid exact/heuristic solver is implemented with a feasibility precheck.
- [ ] **Determinism:** Same input + seed yields identical output and order.
- [ ] **Data:** Ingest script enforces a strict, clean schema with stable IDs and pre-computed keys.
- [ ] **Performance:** Web Worker offloads generation; `bestiary.json` is lazy-loaded. Performance budgets are met.
- [ ] **UI/UX:** Encounter summary is transparent, showing target, actual, delta, and tolerance with a clear "Perfect/Nearest" badge.
- [ ] **Robustness:** Handles edge cases gracefully with specific, typed error codes.
- [ ] **Legal:** A functional and safe local bestiary import feature is present.
- [ ] **Testing:** The test suite includes unit, matrix, and property-based tests, ensuring the generator is reliable under stress.

```

```
