This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info

# Directory Structure
```
.env.example
.gitignore
.npmrc
.nvmrc
.prettierignore
.prettierrc
.repomixignore
CLASS_REFACTOR_PLAN.md
docker-compose.yml
drizzle.config.ts
e2e/demo.test.ts
eslint.config.js
index.html
package.json
package.json.backup
playwright.config.ts
prisma/migrations/20250526210112_init/migration.sql
prisma/migrations/20250620112102_allow_next_in_stage_a/migration.sql
prisma/migrations/migration_lock.toml
prisma/schema.prisma
project_summary.md
README.md
repomix.config.json
SESSION_CONTEXT.md
src/app.d.ts
src/App.tsx
src/components/Menu.tsx
src/components/Snackbar.tsx
src/demo.spec.ts
src/lib/index.ts
src/lib/rulesdata/ancestries.ts
src/lib/rulesdata/attributes.ts
src/lib/rulesdata/classes/barbarian.json
src/lib/rulesdata/classes/bard.json
src/lib/rulesdata/classes/champion.json
src/lib/rulesdata/classes/cleric.json
src/lib/rulesdata/classes/commander.json
src/lib/rulesdata/classes/druid.json
src/lib/rulesdata/classes/hunter.json
src/lib/rulesdata/classes/monk.json
src/lib/rulesdata/classes/rogue.json
src/lib/rulesdata/classes/sorcerer.json
src/lib/rulesdata/classes/spellblade.json
src/lib/rulesdata/classes/warlock.json
src/lib/rulesdata/classes/wizard.json
src/lib/rulesdata/cleric-domains.ts
src/lib/rulesdata/death.ts
src/lib/rulesdata/inventoryItems.ts
src/lib/rulesdata/knowledge.ts
src/lib/rulesdata/languages.ts
src/lib/rulesdata/loaders/class.loader.ts
src/lib/rulesdata/maneuvers.ts
src/lib/rulesdata/monk-stances.ts
src/lib/rulesdata/schemas/class.schema.ts
src/lib/rulesdata/skills.ts
src/lib/rulesdata/spells-data/spells/additional-spells/close-wounds.ts
src/lib/rulesdata/spells-data/spells/additional-spells/death-bolt.ts
src/lib/rulesdata/spells-data/spells/additional-spells/druidcraft.ts
src/lib/rulesdata/spells-data/spells/additional-spells/find-familiar.ts
src/lib/rulesdata/spells-data/spells/additional-spells/index.ts
src/lib/rulesdata/spells-data/spells/additional-spells/shield.ts
src/lib/rulesdata/spells-data/spells/additional-spells/tethering-vines.ts
src/lib/rulesdata/spells-data/spells/fiendborn-ancestry-spells/acid-bolt.ts
src/lib/rulesdata/spells-data/spells/fiendborn-ancestry-spells/index.ts
src/lib/rulesdata/spells-data/spells/fiendborn-ancestry-spells/poison-bolt.ts
src/lib/rulesdata/spells-data/spells/fire-and-flames/burning-flames.ts
src/lib/rulesdata/spells-data/spells/fire-and-flames/dancing-flames.ts
src/lib/rulesdata/spells-data/spells/fire-and-flames/fire-bolt.ts
src/lib/rulesdata/spells-data/spells/fire-and-flames/fire-shield.ts
src/lib/rulesdata/spells-data/spells/fire-and-flames/fog-cloud.ts
src/lib/rulesdata/spells-data/spells/fire-and-flames/grease.ts
src/lib/rulesdata/spells-data/spells/fire-and-flames/index.ts
src/lib/rulesdata/spells-data/spells/fire-and-flames/minor-flame-blade.ts
src/lib/rulesdata/spells-data/spells/holy-and-restoration/bless.ts
src/lib/rulesdata/spells-data/spells/holy-and-restoration/guidance.ts
src/lib/rulesdata/spells-data/spells/holy-and-restoration/guiding-bolt.ts
src/lib/rulesdata/spells-data/spells/holy-and-restoration/heal.ts
src/lib/rulesdata/spells-data/spells/holy-and-restoration/index.ts
src/lib/rulesdata/spells-data/spells/holy-and-restoration/light.ts
src/lib/rulesdata/spells-data/spells/holy-and-restoration/sacred-bolt.ts
src/lib/rulesdata/spells-data/spells/holy-and-restoration/shield-of-faith.ts
src/lib/rulesdata/spells-data/spells/ice-and-illusions/catapult.ts
src/lib/rulesdata/spells-data/spells/ice-and-illusions/frost-bolt.ts
src/lib/rulesdata/spells-data/spells/ice-and-illusions/ice-knife.ts
src/lib/rulesdata/spells-data/spells/ice-and-illusions/index.ts
src/lib/rulesdata/spells-data/spells/ice-and-illusions/mage-hand.ts
src/lib/rulesdata/spells-data/spells/ice-and-illusions/magic-missile.ts
src/lib/rulesdata/spells-data/spells/ice-and-illusions/minor-illusion.ts
src/lib/rulesdata/spells-data/spells/ice-and-illusions/silent-image.ts
src/lib/rulesdata/spells-data/spells/index.ts
src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/crackling-lightning.ts
src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/gust.ts
src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/index.ts
src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/lightning-blade.ts
src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/lightning-bolt.ts
src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/misty-step.ts
src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/returning-shock.ts
src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/shocking-grasp.ts
src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/bane.ts
src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/befriend.ts
src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/command.ts
src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/index.ts
src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/message.ts
src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/psi-bolt.ts
src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/psychic-fear.ts
src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/sleep.ts
src/lib/rulesdata/spells-data/spells/special-class-spells/index.ts
src/lib/rulesdata/spells-data/spells/special-class-spells/sorcery.ts
src/lib/rulesdata/spells-data/types/spell.types.ts
src/lib/rulesdata/techniques.ts
src/lib/rulesdata/trades.ts
src/lib/rulesdata/traits.ts
src/lib/rulesdata/types.ts
src/lib/rulesdata/weapons.ts
src/lib/server/auth.ts
src/lib/server/db/index.ts
src/lib/server/db/schema.ts
src/lib/services/characterCalculator.ts
src/lib/services/characterCompletion.ts
src/lib/services/dataMapping.ts
src/lib/stores/characterContext.tsx
src/lib/stores/characterInProgressStore.ts
src/main.tsx
src/routes/api/character/[characterId]/+server.ts
src/routes/api/character/[characterId]/route.ts
src/routes/api/character/progress/_backup_merge_stages_20250621/stageA+server.ts
src/routes/api/character/progress/_backup_merge_stages_20250621/stageB+server.ts
src/routes/api/character/progress/complete/+server.ts
src/routes/character-creation/AncestryPointsCounter.tsx
src/routes/character-creation/AncestrySelector.tsx
src/routes/character-creation/Attributes.tsx
src/routes/character-creation/Background.tsx
src/routes/character-creation/CharacterCreation.tsx
src/routes/character-creation/CharacterName.tsx
src/routes/character-creation/ClassFeatures.tsx
src/routes/character-creation/ClassSelector.tsx
src/routes/character-creation/components/BackgroundPointsManager.tsx
src/routes/character-creation/components/LanguagesTab.tsx
src/routes/character-creation/components/SkillsTab.tsx
src/routes/character-creation/components/TradesTab.tsx
src/routes/character-creation/LoadCharacter.tsx
src/routes/character-creation/SelectedAncestries.tsx
src/routes/character-creation/styles/AncestryPointsCounter.styles.ts
src/routes/character-creation/styles/AncestrySelector.styles.ts
src/routes/character-creation/styles/Attributes.styles.ts
src/routes/character-creation/styles/Background.styles.ts
src/routes/character-creation/styles/CharacterCreation.styles.ts
src/routes/character-creation/styles/CharacterName.styles.ts
src/routes/character-creation/styles/ClassFeatures.styles.ts
src/routes/character-creation/styles/ClassSelector.styles.ts
src/routes/character-creation/styles/LoadCharacter.styles.ts
src/routes/character-creation/styles/SelectedAncestries.styles.ts
src/routes/character-sheet/CharacterSheetClean.tsx
src/routes/character-sheet/components/Attacks.tsx
src/routes/character-sheet/components/Attributes.tsx
src/routes/character-sheet/components/AttributesSections.tsx
src/routes/character-sheet/components/Combat.tsx
src/routes/character-sheet/components/Currency.tsx
src/routes/character-sheet/components/DeathExhaustion.tsx
src/routes/character-sheet/components/Defenses.tsx
src/routes/character-sheet/components/Features.tsx
src/routes/character-sheet/components/Inventory.tsx
src/routes/character-sheet/components/KnowledgeTrades.tsx
src/routes/character-sheet/components/Languages.tsx
src/routes/character-sheet/components/LeftColumn.tsx
src/routes/character-sheet/components/Movement.tsx
src/routes/character-sheet/components/Resources.tsx
src/routes/character-sheet/components/RightColumnResources.tsx
src/routes/character-sheet/styles/Attacks.ts
src/routes/character-sheet/styles/Attributes.ts
src/routes/character-sheet/styles/AttributesSections.styles.ts
src/routes/character-sheet/styles/Combat.ts
src/routes/character-sheet/styles/Currency.ts
src/routes/character-sheet/styles/Death.ts
src/routes/character-sheet/styles/DeathExhaustion.styles.ts
src/routes/character-sheet/styles/Defenses.ts
src/routes/character-sheet/styles/Exhaustion.ts
src/routes/character-sheet/styles/FeaturePopup.ts
src/routes/character-sheet/styles/Features.styles.ts
src/routes/character-sheet/styles/Features.ts
src/routes/character-sheet/styles/Header.ts
src/routes/character-sheet/styles/Info.ts
src/routes/character-sheet/styles/Inventory.ts
src/routes/character-sheet/styles/KnowledgeTrades.ts
src/routes/character-sheet/styles/Languages.ts
src/routes/character-sheet/styles/Layout.ts
src/routes/character-sheet/styles/Movement.styles.ts
src/routes/character-sheet/styles/Movement.ts
src/routes/character-sheet/styles/Potions.ts
src/routes/character-sheet/styles/Resources.ts
src/routes/character-sheet/styles/RightColumnResources.styles.ts
src/routes/character-sheet/styles/Skills.ts
src/styles/App.styles.ts
src/types/character.ts
src/types/index.ts
tsconfig.json
tsconfig.node.json
vercel.json
vite.config.ts
vitest-setup-client.ts
vitest.config.ts
```

# Files

## File: .env.example
````
DATABASE_URL="postgres://root:mysecretpassword@localhost:5432/local"
````

## File: .gitignore
````
test-results
node_modules

# Output
.output
.vercel
.netlify
.wrangler
/.svelte-kit
/build
/dist

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.*
!.env.example
!.env.test

# Vite
vite.config.js.timestamp-*
vite.config.ts.timestamp-*
````

## File: .npmrc
````
engine-strict=true
````

## File: .nvmrc
````
20
````

## File: .prettierignore
````
# Package Managers
package-lock.json
pnpm-lock.yaml
yarn.lock
bun.lock
bun.lockb
````

## File: .repomixignore
````
# Add patterns to ignore here, one per line
# Example:
# *.log
# tmp/
*.pdf
````

## File: CLASS_REFACTOR_PLAN.md
````markdown
# Refactoring Plan: Externalizing Class Data

**Date:** July 21, 2025

## 1. Task Prompt

Refactor the monolithic `src/lib/rulesdata/classes.ts` file to improve scalability and maintainability. The primary motivation is to support the future growth of class data, specifically the addition of complex nested data like level progression tables and expanded feature choices. The current implementation in a single file is becoming unwieldy.

## 2. Context & Problem Statement

### Current State
- All 13 class definitions are stored as exported `const` objects within a single TypeScript file: `src/lib/rulesdata/classes.ts`.
- The file is already large (~1000 lines) and contains only Level 1 data.
- As more data is added (e.g., progression tables from level 2-20, subclass features), this file will become extremely difficult to manage, navigate, and edit.
- This structure increases the risk of merge conflicts in a collaborative environment and makes it hard to focus on a single class's data without the cognitive overhead of all other classes being present.

### Proposed Solution: JSON Data with Schema Validation
The chosen solution is to externalize the class definitions from TypeScript code into individual JSON files. A validation layer using the Zod library will be introduced to ensure data integrity.

This architecture involves:
1.  **One JSON file per class:** e.g., `barbarian.json`, `sorcerer.json`.
2.  **A Zod Schema:** A single source of truth (`class.schema.ts`) that defines the valid structure of a class object.
3.  **A Data Loader:** A TypeScript module (`class.loader.ts`) responsible for importing all JSON files, validating them against the schema, and exporting them as a single, typed array for the application to consume.

### Key Benefits
- **Scalability:** Easily supports adding deep, complex data structures (like progression tables) to each class file without cluttering the global scope.
- **Maintainability:** Developers can edit a single class's data in a focused, isolated file (`barbarian.json`).
- **Data Integrity:** The Zod schema acts as a contract, preventing malformed or incomplete data from entering the application and causing runtime errors.
- **Reduced Merge Conflicts:** Team members working on different classes will be editing different files, minimizing Git conflicts.
- **Separation of Concerns:** Clearly separates the application's data (the "what") from its logic (the "how").

## 3. Detailed Implementation Plan

### Step 1: Project Setup
- **Install Zod:** Add the Zod library as a project dependency.
  ```bash
  npm install zod
  ```
- **Create Directory Structure:** Create the necessary directories to house the new files.
  ```
  /src/lib/rulesdata/
  ├── classes/
  ├── schemas/
  └── loaders/
  ```

### Step 2: Define the Validation Schema
- Create `src/lib/rulesdata/schemas/class.schema.ts`.
- Inside this file, use Zod to define a schema that precisely matches the `IClassDefinition` interface from `src/lib/rulesdata/types.ts`. This will involve creating schemas for nested objects like `level1Features` and `featureChoicesLvl1`.
- Export the main `classSchema` and a `classesDataSchema` (an array of `classSchema`).

### Step 3: Migrate Class Data to JSON
- For each of the 13 classes currently in `classes.ts`:
    1. Create a new file, e.g., `src/lib/rulesdata/classes/barbarian.json`.
    2. Copy the JavaScript object for that class from `classes.ts`.
    3. Paste it into the new `.json` file and convert it to valid JSON syntax (e.g., double quotes on all keys, remove trailing commas).

### Step 4: Create the Data Loader
- Create `src/lib/rulesdata/loaders/class.loader.ts`.
- This file will perform the following actions:
    1. Use Vite's `import.meta.glob` to dynamically and synchronously import all `*.json` files from the `../classes/` directory.
    2. Extract the data from the imported modules into a single array.
    3. Use the `classesDataSchema.parse()` method from the Zod schema to validate the entire data array.
    4. If validation is successful, export the validated data as a `const classesData: IClassDefinition[]`.
    5. If validation fails, throw a descriptive error to halt the build/runtime and alert the developer to the data inconsistency.

### Step 5: Update Application Imports
- Conduct a project-wide search for the import path `lib/rulesdata/classes`.
- In every file that uses this import, update the path to point to the new data loader: `lib/rulesdata/loaders/class.loader`.
- The variable name (`classesData`) will remain the same, so no other logic changes are required in the consuming components.

### Step 6: Cleanup
- After verifying that the application runs correctly with the new data structure, delete the now-obsolete `src/lib/rulesdata/classes.ts` file.

## 4. UI Impact Analysis

- **Minimal.** The only required change in the UI components is updating the import path for `classesData`.
- The data structure and type (`IClassDefinition[]`) provided to the components will be identical to the current implementation.
- All existing UI logic for rendering class lists, features, and descriptions will function without modification. This makes the refactor low-risk from a UI perspective.

## 5. Validation & Testing

- **Static Validation:** The build process (Vite) will fail if the Zod schema validation in the loader fails, providing an immediate check.
- **Runtime Validation:** Run the application and navigate to the character creation screen.
- **Verification Steps:**
    1. Confirm that the list of all 13 classes is displayed correctly.
    2. Select a class and verify that its description, features, and choices are rendered accurately.
    3. Test a few different classes to ensure all JSON files were loaded and parsed correctly.
````

## File: docker-compose.yml
````yaml
services:
  db:
    image: postgres
    restart: always
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: mysecretpassword
      POSTGRES_DB: local
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
````

## File: drizzle.config.ts
````typescript
import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: { url: process.env.DATABASE_URL },
	verbose: true,
	strict: true
});
````

## File: e2e/demo.test.ts
````typescript
import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});
````

## File: package.json.backup
````
{
	"name": "dc20clean",
	"version": "0.0.1",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build && npm run prepack",
		"preview": "vite preview",
		"prepare": "svelte-kit sync || echo '' && npx prisma generate --no-engine",
		"prepack": "svelte-kit sync && svelte-package && publint",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"format": "prettier --write .",
		"lint": "prettier --check . && eslint .",
		"test:unit": "vitest",
		"test": "npm run test:unit -- --run && npm run test:e2e",
		"test:e2e": "playwright test",
		"db:start": "docker compose up",
		"db:push": "drizzle-kit push",
		"db:migrate": "drizzle-kit migrate",
		"db:studio": "drizzle-kit studio"
	},
	"files": [
		"dist",
		"!dist/**/*.test.*",
		"!dist/**/*.spec.*"
	],
	"sideEffects": [
		"**/*.css"
	],
	"svelte": "./dist/index.js",
	"types": "./dist/index.d.ts",
	"type": "module",
	"exports": {
		".": {
			"types": "./dist/index.d.ts",
			"svelte": "./dist/index.js"
		}
	},
	"peerDependencies": {
		"svelte": "^5.0.0"
	},
	"devDependencies": {
		"@eslint/compat": "^1.2.5",
		"@eslint/js": "^9.18.0",
		"@playwright/test": "^1.49.1",
		"@sveltejs/adapter-vercel": "^5.6.3",
		"@sveltejs/kit": "^2.16.0",
		"@sveltejs/package": "^2.0.0",
		"@sveltejs/vite-plugin-svelte": "^5.0.0",
		"@tailwindcss/forms": "^0.5.9",
		"@tailwindcss/typography": "^0.5.15",
		"@tailwindcss/vite": "^4.0.0",
		"@types/node": "^22",
		"@vitest/browser": "^3.2.3",
		"drizzle-kit": "^0.30.2",
		"eslint": "^9.18.0",
		"eslint-config-prettier": "^10.0.1",
		"eslint-plugin-svelte": "^3.0.0",
		"globals": "^16.0.0",
		"playwright": "^1.53.0",
		"prettier": "^3.4.2",
		"prettier-plugin-svelte": "^3.3.3",
		"prettier-plugin-tailwindcss": "^0.6.11",
		"publint": "^0.3.2",
		"svelte": "^5.0.0",
		"svelte-check": "^4.0.0",
		"tailwindcss": "^4.0.0",
		"typescript": "^5.0.0",
		"typescript-eslint": "^8.20.0",
		"vite": "^6.2.6",
		"vite-plugin-devtools-json": "^0.2.0",
		"vitest-browser-svelte": "^0.1.0"
	},
	"keywords": [
		"svelte"
	],
	"dependencies": {
		"@node-rs/argon2": "^2.0.2",
		"@oslojs/crypto": "^1.0.1",
		"@oslojs/encoding": "^1.1.0",
		"@prisma/client": "^6.10.1",
		"@prisma/extension-accelerate": "^2.0.1",
		"drizzle-orm": "^0.40.0",
		"postgres": "^3.4.5",
		"prisma": "^6.10.1"
	}
}
````

## File: playwright.config.ts
````typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'e2e'
});
````

## File: prisma/migrations/20250526210112_init/migration.sql
````sql
-- CreateTable
CREATE TABLE "CharacterInProgress" (
    "id" TEXT NOT NULL,
    "attribute_might" INTEGER NOT NULL DEFAULT -2,
    "attribute_agility" INTEGER NOT NULL DEFAULT -2,
    "attribute_charisma" INTEGER NOT NULL DEFAULT -2,
    "attribute_intelligence" INTEGER NOT NULL DEFAULT -2,
    "pointsSpent" INTEGER NOT NULL DEFAULT 0,
    "ancestry1Id" TEXT,
    "ancestry2Id" TEXT,
    "selectedTraitIds" TEXT NOT NULL,
    "ancestryPointsSpent" INTEGER NOT NULL DEFAULT 0,
    "classId" TEXT,
    "selectedFeatureChoices" TEXT NOT NULL,
    "finalName" TEXT,
    "finalPlayerName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterInProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterSheetData" (
    "id" TEXT NOT NULL,
    "characterInProgressId" TEXT NOT NULL,
    "finalName" TEXT NOT NULL,
    "finalPlayerName" TEXT,
    "finalLevel" INTEGER NOT NULL DEFAULT 1,
    "finalMight" INTEGER NOT NULL,
    "finalAgility" INTEGER NOT NULL,
    "finalCharisma" INTEGER NOT NULL,
    "finalIntelligence" INTEGER NOT NULL,
    "finalPrimeModifierValue" INTEGER NOT NULL,
    "finalPrimeModifierAttribute" TEXT NOT NULL,
    "finalCombatMastery" INTEGER NOT NULL DEFAULT 1,
    "finalSaveMasteryMight" INTEGER NOT NULL,
    "finalSaveMasterityAgility" INTEGER NOT NULL,
    "finalSaveMasteryCharisma" INTEGER NOT NULL,
    "finalSaveMasteryIntelligence" INTEGER NOT NULL,
    "finalHPMax" INTEGER NOT NULL,
    "finalSPMax" INTEGER NOT NULL,
    "finalMPMax" INTEGER NOT NULL,
    "finalPD" INTEGER NOT NULL,
    "finalAD" INTEGER NOT NULL,
    "finalPDR" TEXT,
    "finalEDR" TEXT,
    "finalMDR" TEXT,
    "finalSaveDC" INTEGER NOT NULL,
    "finalDeathThreshold" INTEGER NOT NULL,
    "finalMoveSpeed" INTEGER NOT NULL,
    "finalJumpDistance" INTEGER NOT NULL,
    "finalRestPoints" INTEGER NOT NULL,
    "finalGritPoints" INTEGER NOT NULL,
    "finalInitiativeBonus" INTEGER NOT NULL,
    "skillsJson" TEXT NOT NULL,
    "tradesJson" TEXT NOT NULL,
    "languagesJson" TEXT NOT NULL,
    "ancestry1Name" TEXT,
    "ancestry2Name" TEXT,
    "selectedTraitsJson" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "classFeaturesLvl1Json" TEXT NOT NULL,
    "equipmentJson" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterSheetData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterSheetData_characterInProgressId_key" ON "CharacterSheetData"("characterInProgressId");

-- AddForeignKey
ALTER TABLE "CharacterSheetData" ADD CONSTRAINT "CharacterSheetData_characterInProgressId_fkey" FOREIGN KEY ("characterInProgressId") REFERENCES "CharacterInProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
````

## File: prisma/migrations/20250620112102_allow_next_in_stage_a/migration.sql
````sql
-- AlterTable
ALTER TABLE "CharacterInProgress" ADD COLUMN     "currentStep" INTEGER NOT NULL DEFAULT 1;
````

## File: prisma/migrations/migration_lock.toml
````toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"
````

## File: project_summary.md
````markdown
# Project Summary

This document provides a comprehensive overview of the Svelte library project, including its purpose, technology stack, and structure.

## Overview

This project is a Svelte-based library starter, designed to provide a foundation for developing and publishing reusable Svelte components. It includes a full development environment with a showcase application, a robust testing suite, and a database setup, making it suitable for building complex, data-driven libraries.

## Technology Stack

The project leverages a modern technology stack, including:

- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: Inferred to be [Lucia Auth](https://lucia-auth.com/) based on file structure and dependencies
- **Testing**:
  - **Unit Testing**: [Vitest](https://vitest.dev/)
  - **E2E Testing**: [Playwright](https://playwright.dev/)

## Project Structure

The project is organized into the following key directories:

- `src/lib`: Contains the core library code intended for packaging and distribution.
- `src/routes`: A showcase application for demonstrating the library's features.
- `src/routes/demo/lucia`: Includes pages and server-side logic for handling user authentication.
- `src/lib/server/auth.ts`: Server-side authentication logic.
- `src/lib/server/db`: Database schema and connection management.
- `e2e`: End-to-end tests for the showcase application.

## Key Scripts

The `package.json` file defines several important scripts for managing the project:

- `dev`: Starts the development server for the showcase app.
- `build`: Creates a production build of the showcase app.
- `package`: Packages the `src/lib` directory into a distributable format.
- `test`: Executes both unit and end-to-end tests.
- `db:*`: A set of scripts for managing the PostgreSQL database, including starting the container, applying schema changes, and running migrations.
````

## File: src/app.d.ts
````typescript
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import('$lib/server/auth').SessionValidationResult['user'];
			session: import('$lib/server/auth').SessionValidationResult['session'];
		}
	} // interface Error {}
	// interface Locals {}
} // interface PageData {}
// interface PageState {}

// interface Platform {}
export {};
````

## File: src/demo.spec.ts
````typescript
import { describe, it, expect } from 'vitest';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});
````

## File: src/lib/rulesdata/classes/barbarian.json
````json
{
  "id": "barbarian",
  "name": "Barbarian",
  "description": "Barbarians charge into battle with reckless abandon, ignoring their own safety as they brush off damage and deal even more in return. They trade defense for more offense and let out blood-crazed battle cries.",
  "baseHpContribution": 9,
  "startingSP": 1,
  "startingMP": 0,
  "skillPointGrantLvl1": 0,
  "tradePointGrantLvl1": 0,
  "combatTraining": ["Weapons", "All Armor", "All Shields"],
  "maneuversKnownLvl1": "All Attack",
  "techniquesKnownLvl1": 0,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "cantripsKnownLvl1": 0,
  "spellsKnownLvl1": 0,
  "level1Features": [
    {
      "id": "barbarian_rage",
      "name": "Rage",
      "level": 1,
      "description": "During Combat, you can spend 1 AP and 1 SP to enter a Rage for 1 minute. For the duration, you’re subjected to the following effects: You deal +1 damage on Melee Martial Attacks. You have ADV on Might Saves. Your PD decreases by 5. You gain Resistance (Half) to Elemental and Physical damage. Ending Early: Your Rage ends early if you fall Unconscious, die, or you choose to end it for free on your turn.",
      "effects": [
          { "type": "GRANT_ABILITY", "value": "Rage_Mechanics_Bundle" }
      ]
    },
    {
      "id": "barbarian_berserker",
      "name": "Berserker",
      "level": 1,
      "description": "Your primal savagery grants you the following benefits: Charge: When you make a Melee Martial Attack on your turn, you can move up to 2 Spaces immediately before making the Attack. Berserker Defense: While you aren’t wearing Armor you gain +2 AD. Fast Movement: You gain +1 Speed while not wearing Armor. Mighty Leap: You can use your Might instead of Agility to determine your Jump Distance and the damage you take from Falling.",
      "effects": [
        { "type": "GRANT_ABILITY", "subFeature": "Charge", "descriptionOverride": "Move 2 Spaces before Melee Martial Attack." },
        { "type": "GRANT_PASSIVE", "subFeature": "Berserker_Defense", "descriptionOverride": "+2 AD when not wearing Armor." },
        { "type": "GRANT_PASSIVE", "subFeature": "Fast_Movement", "descriptionOverride": "+1 Speed when not wearing Armor." },
        { "type": "GRANT_PASSIVE", "subFeature": "Mighty_Leap", "descriptionOverride": "Use Might for Jump Distance & Falling Damage calc." }
      ]
    },
    {
      "id": "barbarian_shattering_force",
      "name": "Shattering Force (Flavor)",
      "level": 1,
      "description": "When you Hit a structure or mundane object with a Melee Attack, it’s considered a Critical Hit.",
      "effects": [{ "type": "FLAVOR_MECHANIC_NOTE", "value": "Melee attacks vs objects/structures are Critical Hits." }]
    }
  ],
  "featureChoicesLvl1": []
}
````

## File: src/lib/rulesdata/classes/bard.json
````json
{
  "id": "bard",
  "name": "Bard",
  "description": "Bards utilize artistic expression through various forms to connect with the emotions and heart of magic. This includes a wide range of mediums such as musical instruments, singing, dancing, drawing, painting, sculpting, poetry, storytelling, inspirational speech, and more. They are great at bringing the best out in those around them through both helping and performing, showcasing high proficiency across multiple disciplines. Bards are remarkably flexible and adaptable spellcasters, capable of tapping into a wide array of magical abilities with the appropriate artistic expression.",
  "baseHpContribution": 8,
  "startingSP": 0,
  "startingMP": 6,
  "skillPointGrantLvl1": 2,
  "tradePointGrantLvl1": 3,
  "combatTraining": ["Light Armor", "Light Shields"],
  "maneuversKnownLvl1": 0,
  "techniquesKnownLvl1": 0,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "cantripsKnownLvl1": 2,
  "spellsKnownLvl1": 3,
  "level1Features": [
    {
      "id": "bard_font_of_inspiration",
      "name": "Font of Inspiration",
      "level": 1,
      "description": "You are an ever present source of aid for your allies. You gain the following benefits: Ranged Help Attack: The range of your Help Action when aiding an Attack increases to 10 Spaces. Help Reaction: When a creature you can see makes a Check, you can take the Help Action as a Reaction to aid them with their Check, provided you’re within range to do so.",
      "effects": []
    },
    {
      "id": "bard_remarkable_repertoire",
      "name": "Remarkable Repertoire",
      "level": 1,
      "description": "You’ve picked up a few tricks along your travels, granting you the following benefits: Jack of All Trades: You gain 2 Skill Points. Magical Secrets: You learn any 2 Spells of your choice from any Spell List. Magical Expression: You learn to express your art in a unique manner, granting you the ability to alter how you cast Spells. Choose the manner of your expression: Visual or Auditory.",
      "effects": []
    },
    {
      "id": "bard_crowd_pleaser",
      "name": "Crowd Pleaser (Flavor Feature)",
      "level": 1,
      "description": "When you spend at least 5 minutes performing an Artistry Trade for one or more people who are actively watching or listening to your performance, you can make an Artistry Trade Check Contested by the targets’ Charisma Save. Success: You gain ADV on Charisma Checks against the target for 1 hour or until you become hostile. Creatures have ADV on the Save if they’re considered hostile toward you.",
      "effects": []
    }
  ],
  "featureChoicesLvl1": [
    {
      "id": "bard_magical_expression",
      "prompt": "Choose your Magical Expression:",
      "type": "select_one",
      "options": [
        { "value": "visual", "label": "Visual" },
        { "value": "auditory", "label": "Auditory" }
      ]
    },
    {
      "id": "bard_magical_secrets",
      "prompt": "Choose 2 spells from any spell list:",
      "type": "select_multiple",
      "options": [],
      "maxSelections": 2
    }
  ]
}
````

## File: src/lib/rulesdata/classes/champion.json
````json
{
  "id": "champion",
  "name": "Champion",
  "description": "Champions are weapon and armor specialists that push themselves to the limit in combat. They are able to master a wide variety of weapon types and learn their enemies as they fight them.",
  "baseHpContribution": 9,
  "startingSP": 1,
  "startingMP": 0,
  "skillPointGrantLvl1": 0,
  "tradePointGrantLvl1": 0,
  "combatTraining": ["Weapons", "All Armors", "All Shields"],
  "maneuversKnownLvl1": "All Attack",
  "techniquesKnownLvl1": 0,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "cantripsKnownLvl1": 0,
  "spellsKnownLvl1": 0,
  "level1Features": [
    {
      "id": "champion_master_at_arms",
      "name": "Master-at-Arms",
      "level": 1,
      "description": "Your training in warfare has granted you greater offense, defense, and movement. Weapon Master: At the start of each of your turns, you can freely swap any Weapon you’re currently wielding in each hand for any other Weapon without provoking Opportunity Attacks. Maneuver Master: You learn 2 Maneuvers of your choice. Technique Master: You learn 1 Technique of your choice. Once per Combat, when you perform a Technique you can reduce its SP cost by 1.",
      "effects": []
    },
    {
      "id": "champion_fighting_spirit",
      "name": "Fighting Spirit",
      "level": 1,
      "description": "You stand ready for Combat at any moment, granting you the following benefits: Combat Readiness: At the start of your first turn in Combat, you gain one of the following benefits: Brace: You gain the benefits of the Dodge Action and ADV on the next Save you make until the end of Combat. Advance: You gain the benefits of the Move Action and ADV on the next Physical Check you make until the end of Combat. Second Wind: Once per Combat when you start your turn Bloodied, you can regain 2 HP and 1 SP.",
      "effects": []
    },
    {
      "id": "champion_know_your_enemy",
      "name": "Know Your Enemy (Flavor Feature)",
      "level": 1,
      "description": "You can spend 1 minute observing or interacting with a creature out of Combat (or spend 1 AP in Combat) to learn information about its physical capabilities compared to your own. Choose one of the following stats of the creature to assess: Might, Agility, PD, AD, and HP. Make a DC 10 Knowledge or Insight Check (your choice). Success: You learn if the chosen stat is higher, lower, or the same as yours.",
      "effects": []
    }
  ],
  "featureChoicesLvl1": [
    {
      "id": "champion_maneuver_master",
      "prompt": "Choose 2 Maneuvers:",
      "type": "select_multiple",
      "maxSelections": 2,
      "options": []
    },
    {
      "id": "champion_technique_master",
      "prompt": "Choose 1 Technique:",
      "type": "select_one",
      "options": []
    }
  ]
}
````

## File: src/lib/rulesdata/classes/cleric.json
````json
{
  "id": "cleric",
  "name": "Cleric",
  "description": "Clerics can reach out and call upon the power of a deity to aid them in battle and to support them and their allies. Clerics can range from a knowledgeable priest, to a knight in holy armor. They reach out to heir deity to empower their magic in ways mortals normally cannot.",
  "baseHpContribution": 8,
  "startingSP": 0,
  "startingMP": 6,
  "skillPointGrantLvl1": 2,
  "tradePointGrantLvl1": 3,
  "combatTraining": ["Light Armor", "Light Shields"],
  "maneuversKnownLvl1": 0,
  "techniquesKnownLvl1": 0,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "cantripsKnownLvl1": 2,
  "spellsKnownLvl1": 3,
  "level1Features": [
    {
      "id": "cleric_cleric_order",
      "name": "Cleric Order",
      "level": 1,
      "description": "Your connection to your deity grants you the following benefits: Divine Damage: Choose an Elemental or Mystical damage type. The chosen damage type becomes your Divine Damage which is used for some Cleric Features. Divine Domain: You gain the benefits of 2 Divine Domains of your choice.",
      "effects": []
    },
    {
      "id": "cleric_divine_blessing",
      "name": "Divine Blessing",
      "level": 1,
      "description": "You can spend 1 AP to say a prayer and petition your deity for their divine blessing. Choose 1 of the blessings listed below. Each blessing has a listed MP cost that you must spend to gain the blessing. Once during the next minute, you can apply the blessing to a Spell you cast. If your Spell targets more than 1 creature, the blessing only applies to 1 target of your choice. Unused Blessing: You can only have 1 blessing at a time. If you petition your deity for a blessing while you already have a blessing, the first blessing immediately ends without granting any benefit. If the blessing ends without granting any benefit, you regain the MP spent to gain the blessing.",
      "effects": []
    },
    {
      "id": "cleric_divine_omen",
      "name": "Divine Omen (Flavor Feature)",
      "level": 1,
      "description": "Once per Long Rest, you can spend 10 minutes to commune with your Deity. Question: You can ask them 1 question, which must be posed in a way that could be answered with a yes or no. Response: The deity responds to the best of their knowledge and intentions in one of the following responses: Yes, No, or Unclear. Communing Again: If you commune with your deity more than once per Long Rest, you must make a DC 15 Spell Check. Failure: You receive no answer. Each time you commune again before you complete a Long Rest, the DC increases by 5.",
      "effects": []
    }
  ],
  "featureChoicesLvl1": [
    {
      "id": "cleric_divine_damage",
      "prompt": "Choose your Divine Damage type:",
      "type": "select_one",
      "options": [
        { "value": "elemental", "label": "Elemental" },
        { "value": "mystical", "label": "Mystical" }
      ]
    },
    {
      "id": "cleric_divine_domain",
      "prompt": "Choose 2 Divine Domains:",
      "type": "select_multiple",
      "maxSelections": 2,
      "options": [
        { "value": "domain_of_life", "label": "Domain of Life" },
        { "value": "domain_of_death", "label": "Domain of Death" },
        { "value": "domain_of_knowledge", "label": "Domain of Knowledge" },
        { "value": "domain_of_war", "label": "Domain of War" }
      ]
    }
  ]
}
````

## File: src/lib/rulesdata/classes/commander.json
````json
{
  "id": "commander",
  "name": "Commander",
  "description": "Commanders are the leaders of the battlefield, inspiring their allies and leading them to victory. They can command their allies to attack or move around the battlefield, and are even able to “heal” allies by making them dig deep within themselves to push forward in combat.",
  "baseHpContribution": 9,
  "startingSP": 1,
  "startingMP": 0,
  "skillPointGrantLvl1": 0,
  "tradePointGrantLvl1": 0,
  "combatTraining": ["Weapons", "All Armor", "All Shields"],
  "maneuversKnownLvl1": "All Attack",
  "techniquesKnownLvl1": 0,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "cantripsKnownLvl1": 0,
  "spellsKnownLvl1": 0,
  "level1Features": [
    {
      "id": "commander_inspiring_presence",
      "name": "Inspiring Presence",
      "level": 1,
      "description": "Whenever you spend SP while in Combat, you can restore an amount of HP equal to the SP spent. Choose any creatures within 5 Spaces that can see or hear you, and divide the HP among them.",
      "effects": []
    },
    {
      "id": "commander_commanders_call",
      "name": "Commander’s Call",
      "level": 1,
      "description": "You can spend 1 AP and 1 SP to command a willing creature that you can see within 5 Spaces that can also see or hear you. The chosen creature can immediately take 1 of the following Actions of your choice as a Reaction for free. You can only use each of the following commands once on each of your turns: Attack: The creature makes an Attack with ADV. They can’t spend any resources on this Attack, such as AP, SP, or MP. Dodge: The creature takes the Full Dodge Action. Move: The creature moves up to their Speed without provoking Opportunity Attacks.",
      "effects": []
    },
    {
      "id": "commander_natural_leader",
      "name": "Natural Leader (Flavor Feature)",
      "level": 1,
      "description": "You have ADV on Checks made to convince creatures that you are an authority figure. Additionally, you have ADV on the first Charisma Check made to interact with non-hostile members of military groups (such as soldiers, guards, etc.).",
      "effects": []
    }
  ],
  "featureChoicesLvl1": []
}
````

## File: src/lib/rulesdata/classes/druid.json
````json
{
  "id": "druid",
  "name": "Druid",
  "description": "Druids tap into the power of nature, drawing upon the energies that flow through the world and creatures around them. and connect to plants, animals, and the plane itself. They can channel both the restorative and destructive forces of nature and shapeshift into wild beasts.",
  "baseHpContribution": 8,
  "startingSP": 0,
  "startingMP": 6,
  "skillPointGrantLvl1": 2,
  "tradePointGrantLvl1": 3,
  "combatTraining": ["Light Armor"],
  "maneuversKnownLvl1": 0,
  "techniquesKnownLvl1": 0,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "cantripsKnownLvl1": 2,
  "spellsKnownLvl1": 3,
  "level1Features": [
    {
      "id": "druid_druid_domain",
      "name": "Druid Domain",
      "level": 1,
      "description": "You can spend 1 AP and 1 MP to create your own Druid Domain that includes small plant life, sand, shallow water, or other naturally occurring features. You create up to 8 Domain Spaces along the ground or walls. The first Domain Space must be within 1 Space of you, and each additional Domain Space must be adjacent to another Domain Space. If you use this Feature again, the first Domain Space of it must be within 1 Space of you or another Domain Space. Domain Spaces: The area is considered to be Difficult Terrain for creatures of your choice, and when you cast a Spell, you can do so as if you were standing in any Space within your Domain. Losing Domain Spaces: A Domain Space also disappears if you end your turn farther than 15 Spaces away from it or you die. Domain Actions: While you have Domain Spaces, you can take any of the following Domain Actions: Nature’s Grasp, Move Creature, Move Object, Wild Growth.",
      "effects": []
    },
    {
      "id": "druid_wild_form",
      "name": "Wild Form",
      "level": 1,
      "description": "You can spend 1 AP and 1 MP to transform into a Wild Form of your choice. You can spend 1 AP on your turn to shift back and forth between your True Form and any Wild Forms you currently have available. Once per Long Rest, you can transform without spending MP or using MP enhancements. True Form: When you transform from your Wild Form to your True Form, your statistics return to normal. You immediately revert to your True Form when your Wild Form HP is reduced to 0 or you die. Wild Form: When you transform into a Wild Form, you gain the Wild Form’s current Wild Form HP (see Wild Form HP below), retaining any HP losses. Duration: Each Wild Form remains available until its Wild Form HP is reduced to 0 or you complete a Long Rest. Multiple Forms: You can have multiple Wild Forms available at a time which have their own Wild Form HP and Traits. Equipment: Your equipment falls to the ground or merges into your Wild Form (your choice for each item). You gain the benefits of Magic Items merged with your Wild Form, but you can’t activate them or spend their charges. Statistics: While in your Wild Form, you’re subjected to the following changes (unless otherwise stated): Stat Block: You use the Wild Form Stat Block below to determine your statistics. Identity: You maintain your personality, intellect, and ability to speak. Wild Form HP: You gain a secondary pool of Wild Form Health Points, which is 3 with a maximum of 3. Damage and healing effects target your Wild Form HP before your True Form HP, and any excess damage or healing carries over to your own HP. Natural Weapon: You have Natural Weapons (claws, horns, fangs, etc.) which you can use to make Unarmed Strikes that deal 1 Bludgeoning, Piercing, or Slashing damage (your choice when you use this Feature). Features & Talents: You don’t benefit from Talents or Class Features, except Druid Class Features, Subclass Features, and Talents. Additionally, you can’t cast Spells or perform Techniques. Traits: You don’t benefit from your Ancestry Traits, but you gain 3 Trait Points to spend on Beast Traits or Wild Form Traits of your choice. You can’t select negative Beast Traits. When you use this Feature, you can spend additional MP (up to your Mana Spend Limit) to gain 2 additional Trait Points per MP spent.",
      "effects": []
    },
    {
      "id": "druid_wild_speech",
      "name": "Wild Speech (Flavor Feature)",
      "level": 1,
      "description": "You learn the Druidcraft Cantrip and can choose 1 of the following options: Animals: You can understand and speak with Beasts in a limited manner. You can understand the meaning of their movements, sounds, and behaviors, and they can understand the meanings of simple words, concepts, and emotions. Plants: You can understand and speak with Plants in a limited manner. You can understand the meaning of their swaying, folding, unfolding of their leaves and flowers, and they can understand the meanings of simple words, concepts, and emotions. Weather: You can reach out to nature and cast the Commune with Nature Spell as a Ritual once per Long Rest.",
      "effects": []
    }
  ],
  "featureChoicesLvl1": [
    {
      "id": "druid_wild_speech_choice",
      "prompt": "Choose your Wild Speech option:",
      "type": "select_one",
      "options": [
        { "value": "animals", "label": "Animals" },
        { "value": "plants", "label": "Plants" },
        { "value": "weather", "label": "Weather" }
      ]
    },
    {
      "id": "druid_wild_form_traits",
      "prompt": "Spend 3 Trait Points on Beast or Wild Form Traits:",
      "type": "select_multiple",
      "options": [],
      "maxSelections": 3
    }
  ]
}
````

## File: src/lib/rulesdata/classes/hunter.json
````json
{
  "id": "hunter",
  "name": "Hunter",
  "description": "Hunters are master survivalists and natural explorers. They mark their targets to better track them and take them down, using their mastery over terrain, traps, and weapons to their advantage.",
  "baseHpContribution": 9,
  "startingSP": 1,
  "startingMP": 0,
  "skillPointGrantLvl1": 0,
  "tradePointGrantLvl1": 0,
  "combatTraining": ["Weapons", "Light Armor", "Light Shields"],
  "maneuversKnownLvl1": "All Attack",
  "techniquesKnownLvl1": 0,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "cantripsKnownLvl1": 0,
  "spellsKnownLvl1": 0,
  "level1Features": [
    {
      "id": "hunter_hunters_mark",
      "name": "Hunter’s Mark",
      "level": 1,
      "description": "You can spend 1 AP and 1 SP to focus on and mark a creature you can see within 15 Spaces as your quarry. Alternatively, you can mark a creature by studying its tracks for at least 1 minute. While a creature is marked, you gain the following benefits: You have ADV on Awareness and Survival Checks made to find the target. The first Martial Attack against your target on your turn has ADV and ignores PDR. When you score a Heavy or Critical Hit against the target, you automatically grant a d8 Help Die to the next Attack made against the target before the start of your next turn. The target is marked as long as it’s on the same Plane of Existence as you, and vanishes early if you complete a Long Rest, fall Unconscious, or use this Feature again to mark another creature.",
      "effects": []
    },
    {
      "id": "hunter_favored_terrain",
      "name": "Favored Terrain",
      "level": 1,
      "description": "You are particularly familiar with two types of environments and are adept at the skills unique to the region. Choose 2 types of Favored Terrain listed below. Coast, Desert, Forest, Grassland, Jungle, Mountain, Swamp, Tundra, Subterranean, Urban. Additionally, while you’re in one of your Favored Terrains, you have ADV on Stealth and Survival Checks and can’t be Surprised.",
      "effects": []
    },
    {
      "id": "hunter_bestiary",
      "name": "Bestiary (Flavor Feature)",
      "level": 1,
      "description": "You have developed a trove of knowledge hunting creatures which you’ve recorded in your Bestiary. Your Bestiary can take the form of a book, a memory vault within your mind, or some other representation of your choice. You have ADV on Checks made to learn or recall information about any creature recorded in your Bestiary. Starting Entries: Choose a Creature Type: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, or Undead. Your Bestiary includes prerecorded notes about various creatures of the chosen type. Making New Entries: You can spend 10 minutes of Light Activity recording information into your Bestiary about a specific creature you have slain within the last 24 hours.",
      "effects": []
    }
  ],
  "featureChoicesLvl1": [
    {
      "id": "hunter_favored_terrain_choice",
      "prompt": "Choose 2 types of Favored Terrain:",
      "type": "select_multiple",
      "maxSelections": 2,
      "options": [
        { "value": "coast", "label": "Coast" },
        { "value": "desert", "label": "Desert" },
        { "value": "forest", "label": "Forest" },
        { "value": "grassland", "label": "Grassland" },
        { "value": "jungle", "label": "Jungle" },
        { "value": "mountain", "label": "Mountain" },
        { "value": "swamp", "label": "Swamp" },
        { "value": "tundra", "label": "Tundra" },
        { "value": "subterranean", "label": "Subterranean" },
        { "value": "urban", "label": "Urban" }
      ]
    },
    {
      "id": "hunter_bestiary_choice",
      "prompt": "Choose a starting Creature Type for your Bestiary:",
      "type": "select_one",
      "options": [
        { "value": "aberration", "label": "Aberration" },
        { "value": "beast", "label": "Beast" },
        { "value": "celestial", "label": "Celestial" },
        { "value": "construct", "label": "Construct" },
        { "value": "dragon", "label": "Dragon" },
        { "value": "elemental", "label": "Elemental" },
        { "value": "fey", "label": "Fey" },
        { "value": "fiend", "label": "Fiend" },
        { "value": "giant", "label": "Giant" },
        { "value": "humanoid", "label": "Humanoid" },
        { "value": "monstrosity", "label": "Monstrosity" },
        { "value": "ooze", "label": "Ooze" },
        { "value": "plant", "label": "Plant" },
        { "value": "undead", "label": "Undead" }
      ]
    }
  ]
}
````

## File: src/lib/rulesdata/classes/monk.json
````json
{
  "id": "monk",
  "name": "Monk",
  "description": "Monks are master martial artists that perfect their mind and bodies utilizing the ebb and flow of their inner energy. They use their body as a weapon and can enter into different stances that drastically change their combat abilities.",
  "baseHpContribution": 9,
  "startingSP": 1,
  "startingMP": 0,
  "skillPointGrantLvl1": 0,
  "tradePointGrantLvl1": 0,
  "combatTraining": ["Weapons", "Light Armor"],
  "maneuversKnownLvl1": "All Attack",
  "techniquesKnownLvl1": 0,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "cantripsKnownLvl1": 0,
  "spellsKnownLvl1": 0,
  "level1Features": [
    {
      "id": "monk_monk_training",
      "name": "Monk Training",
      "level": 1,
      "description": "Your martial arts training grants you greater offense, defense, and movement. Iron Palm: Your limbs are considered Natural Weapons with the Impact Property that deal 1 Bludgeoning damage. Patient Defense: While you aren’t wearing Armor you gain +2 PD. Step of the Wind: While you aren’t wearing Armor, you gain the following benefits: You gain +1 Speed and Jump Distance. You can move a number of Spaces up to your Speed along vertical surfaces and across liquids without falling during your move. You can use your Prime Modifier instead of Agility to determine your Jump Distance and the damage you take from Falling.",
      "effects": []
    },
    {
      "id": "monk_monk_stance",
      "name": "Monk Stance",
      "level": 1,
      "description": "You learn 2 Monk Stances from the list below. Entering & Exiting: In Combat, at the start of each of your turns you can freely enter or swap into one of your Monk Stances. You can also spend 1 SP on your turn to swap to a different stance. You can end your Stance at any moment for free. You can only be in 1 Monk Stance at a time. Bear Stance, Bull Stance, Cobra Stance, Gazelle Stance, Mantis Stance, Mongoose Stance, Scorpion Stance, Turtle Stance, Wolf Stance.",
      "effects": []
    },
    {
      "id": "monk_meditation",
      "name": "Meditation (Flavor Feature)",
      "level": 1,
      "description": "You can enter a state of meditation during a Short Rest (1 hour) or longer. Choose 1 Charisma or Intelligence Skill. When you complete the Rest, your Skill Mastery level increases by 1 (up to your Skill Mastery Cap) for the chosen Skill until you complete another Short or longer Rest. While meditating, you remain alert to danger.",
      "effects": []
    }
  ],
  "featureChoicesLvl1": [
    {
      "id": "monk_stance_choice",
      "prompt": "Choose 2 Monk Stances:",
      "type": "select_multiple",
      "maxSelections": 2,
      "options": [
        { "value": "bear_stance", "label": "Bear Stance" },
        { "value": "bull_stance", "label": "Bull Stance" },
        { "value": "cobra_stance", "label": "Cobra Stance" },
        { "value": "gazelle_stance", "label": "Gazelle Stance" },
        { "value": "mantis_stance", "label": "Mantis Stance" },
        { "value": "mongoose_stance", "label": "Mongoose Stance" },
        { "value": "scorpion_stance", "label": "Scorpion Stance" },
        { "value": "turtle_stance", "label": "Turtle Stance" },
        { "value": "wolf_stance", "label": "Wolf Stance" }
      ]
    }
  ]
}
````

## File: src/lib/rulesdata/classes/rogue.json
````json
{
  "id": "rogue",
  "name": "Rogue",
  "description": "Rogues are skilled, evasive, and cunning. They impose conditions onto enemies, then exploit those weaknesses to inflict even more harm.",
  "baseHpContribution": 9,
  "startingSP": 1,
  "startingMP": 0,
  "skillPointGrantLvl1": 0,
  "tradePointGrantLvl1": 0,
  "combatTraining": ["Weapons", "Light Armor", "Light Shields"],
  "maneuversKnownLvl1": "All Attack",
  "techniquesKnownLvl1": 0,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "cantripsKnownLvl1": 0,
  "spellsKnownLvl1": 0,
  "level1Features": [
    {
      "id": "rogue_debilitating_strike",
      "name": "Debilitating Strike",
      "level": 1,
      "description": "When you make an Attack with a Weapon, you can spend 1 SP to force the target to make a Physical Save against your Save DC. Save Failure: Until the start of your next turn, the target suffers 1 of the following effects of your choice: Deafened, Exposed, Hindered, or Slowed 2. A target can’t be affected by the same option more than once at a time.",
      "effects": []
    },
    {
      "id": "rogue_roguish_finesse",
      "name": "Roguish Finesse",
      "level": 1,
      "description": "Cunning Action: You gain movement equal to half your Speed when you take the Disengage, Feint, or Hide Actions. You can use this movement immediately before or after you take the Action. Skill Expertise: Your Skill Mastery Limit increases by 1, up to Grandmaster (+10). A Skill can only benefit from one increase to its Mastery limit. Multi-Skilled: You gain 1 Skill Point.",
      "effects": []
    },
    {
      "id": "rogue_cypher_speech",
      "name": "Cypher Speech (Flavor Feature)",
      "level": 1,
      "description": "You become Fluent in a Mortal Language of your choice. Additionally, you understand how to speak in code with a specific demographic of your choice (such as upper society, lower society, a faction, etc.). Your coded messages can be concealed in normal conversation and written communications. This allows you to leave simple messages such as “Safety”, “Threat”, or “Wealth”, or mark the location of a cache, a secret passageway, a safehouse, or an area of danger.",
      "effects": []
    }
  ],
  "featureChoicesLvl1": [
    {
      "id": "rogue_cypher_language",
      "prompt": "Choose a Mortal Language:",
      "type": "select_one",
      "options": [{ "value": "common", "label": "Common" }]
    },
    {
      "id": "rogue_cypher_demographic",
      "prompt": "Choose a demographic for Cypher Speech:",
      "type": "select_one",
      "options": [
        { "value": "upper_society", "label": "Upper Society" },
        { "value": "lower_society", "label": "Lower Society" },
        { "value": "faction", "label": "A Faction" }
      ]
    }
  ]
}
````

## File: src/lib/rulesdata/classes/sorcerer.json
````json
{
  "id": "sorcerer",
  "name": "Sorcerer",
  "description": "Sorcerers tap into the raw magic in their own bodies as a conduit to harness, manipulate, and sculpt magic with wild resolve. They can overload themselves and even cast Spells without Mana, pushing the limits of magic and their own bodies.",
  "baseHpContribution": 8,
  "startingSP": 0,
  "startingMP": 6,
  "skillPointGrantLvl1": 0,
  "tradePointGrantLvl1": 0,
  "combatTraining": ["Light Armor"],
  "maneuversKnownLvl1": 0,
  "techniquesKnownLvl1": 0,
  "cantripsKnownLvl1": 2,
  "spellsKnownLvl1": 3,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "level1Features": [
    {
      "id": "sorcerer_innate_power",
      "name": "Innate Power",
      "level": 1,
      "description": "Choose a Sorcerous Origin that grants you a benefit: Intuitive Magic, Resilient Magic, or Unstable Magic. Additionally, you gain the following benefits: Your Maximum MP increases by 1. Once per Long Rest, you can use a 1 MP Spell Enhancement without spending any MP (up to your Mana Spend Limit). You regain the ability to use this benefit when you roll for Initiative.",
      "effects": [
          { "type": "MODIFY_MP_MAX", "value": 1 },
          { "type": "GRANT_ABILITY", "value": "Free_1MP_Spell_Enhancement_Once_Per_Long_Rest" }
      ]
    },
    {
      "id": "sorcerer_overload_magic",
      "name": "Overload Magic",
      "level": 1,
      "description": "You can spend 2 AP in Combat to channel raw magical energy for 1 minute, or until you become Incapacitated, die, or choose to end it early at any time for free. For the duration, your magic is overloaded and you’re subjected to the following effects: You gain +5 to all Spell Checks you make. You must immediately make an Attribute Save (your choice) against your Save DC upon using this Feature, and again at the start of each of your turns. Failure: You gain Exhaustion. You lose any Exhaustion gained in this way when you complete a Short Rest.",
      "effects": [{ "type": "GRANT_ABILITY", "value": "Overload_Magic_Mechanics_Bundle" }]
    },
    {
      "id": "sorcerer_sorcery_flavor",
      "name": "Sorcery (Flavor)",
      "level": 1,
      "description": "You learn the Sorcery Spell.",
      "effects": [{ "type": "GRANT_SPELL_KNOWN", "value": "sorcery_cantrip_id" }]
    }
  ],
  "featureChoicesLvl1": [
    {
      "id": "sorcerous_origin_choice",
      "prompt": "Choose your Sorcerous Origin (DC20 p.150):",
      "type": "select_one",
      "options": [
        { "value": "intuitive_magic", "label": "Intuitive Magic", "description": "You learn an additional Spell and Cantrip from your Sorcerer Spell List.", "effectsOnChoice": [{ "type": "GRANT_BONUS_SPELL_KNOWN" }, { "type": "GRANT_BONUS_CANTRIP_KNOWN"}] },
        { "value": "resilient_magic", "label": "Resilient Magic", "description": "You gain Dazed Resistance.", "effectsOnChoice": [{ "type": "GRANT_CONDITION_RESISTANCE", "target": "Dazed"}] },
        { "value": "unstable_magic", "label": "Unstable Magic", "description": "When you Critically Succeed or Fail on a Spell Check, roll on the Wild Magic Table...", "effectsOnChoice": [{ "type": "ENABLE_WILD_MAGIC_TABLE_ON_CRIT_SPELL_CHECK"}] }
      ]
    },
    {
      "id": "sorcerer_spell_list_choice",
      "prompt": "Choose Your Sorcerer Spell List (DC20 p.149):",
      "type": "select_one",
      "options": [
        { "value": "arcane", "label": "Arcane Spell List" },
        { "value": "divine", "label": "Divine Spell List" },
        { "value": "primal", "label": "Primal Spell List" }
      ]
    }
  ]
}
````

## File: src/lib/rulesdata/classes/spellblade.json
````json
{
  "id": "spellblade",
  "name": "Spellblade",
  "description": "Spellblades combine their combat prowess with their ability to harness and channel magic into weapons. They can form a bond with a weapon to imbue it with damage, call it back to them, and more. Spellblades can learn a wide range of disciplines depending on their unique combination of martial and spellcasting prowess. They even gain the ability to cast spells through their weapons.",
  "baseHpContribution": 9,
  "startingSP": 1,
  "startingMP": 3,
  "skillPointGrantLvl1": 0,
  "tradePointGrantLvl1": 0,
  "combatTraining": ["Weapons", "Light Armor", "Light Shields"],
  "maneuversKnownLvl1": "All Attack",
  "techniquesKnownLvl1": 0,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "cantripsKnownLvl1": 1,
  "spellsKnownLvl1": 1,
  "level1Features": [
    {
      "id": "spellblade_bound_weapon",
      "name": "Bound Weapon",
      "level": 1,
      "description": "During a Quick Rest, you can magically bond with 1 Weapon and choose an Elemental or Mystical damage type to become your Bound Damage type. This bond lasts until you end it for free or use this feature again. Your Bound Weapon gains the following properties: Smite, Illuminate, Recall. Ending Early: Your bond with the Weapon ends early if you use this Feature again, or you choose to end it for free.",
      "effects": []
    },
    {
      "id": "spellblade_spellblade_disciplines",
      "name": "Spellblade Disciplines",
      "level": 1,
      "description": "You learn 2 Spellblade Disciplines from the list below. Magus, Warrior, Acolyte, Hex Warrior, Spell Breaker, Spell Warder, Blink Blade.",
      "effects": []
    },
    {
      "id": "spellblade_sense_magic",
      "name": "Sense Magic (Flavor Feature)",
      "level": 1,
      "description": "You can spend 1 minute focusing your mind to detect the following creature types within 20 Spaces: Aberration, Celestial, Elemental, Fey, Fiend, or Undead. Make a Spell Check against each creature’s Mental Save. Check Success: You learn the target’s creature type and know its location until the end of your next turn. Check Failure: You learn nothing and can’t use this Feature against the target again until you complete a Long Rest.",
      "effects": []
    }
  ],
  "featureChoicesLvl1": [
    {
      "id": "spellblade_bound_damage",
      "prompt": "Choose your Bound Damage type:",
      "type": "select_one",
      "options": [
        { "value": "elemental", "label": "Elemental" },
        { "value": "mystical", "label": "Mystical" }
      ]
    },
    {
      "id": "spellblade_disciplines_choice",
      "prompt": "Choose 2 Spellblade Disciplines:",
      "type": "select_multiple",
      "maxSelections": 2,
      "options": [
        { "value": "magus", "label": "Magus" },
        { "value": "warrior", "label": "Warrior" },
        { "value": "acolyte", "label": "Acolyte" },
        { "value": "hex_warrior", "label": "Hex Warrior" },
        { "value": "spell_breaker", "label": "Spell Breaker" },
        { "value": "spell_warder", "label": "Spell Warder" },
        { "value": "blink_blade", "label": "Blink Blade" }
      ]
    }
  ]
}
````

## File: src/lib/rulesdata/classes/warlock.json
````json
{
  "id": "warlock",
  "name": "Warlock",
  "description": "Warlocks make a pact with a powerful entity that grants them magic. Their body and soul are a part of this contract and as such, they can tap into their own life force to enhance and amplify their magic and capabilities as well as drain the life force of other living creatures. They also choose a type of pact to be made that grants more powers.",
  "baseHpContribution": 9,
  "startingSP": 0,
  "startingMP": 6,
  "skillPointGrantLvl1": 0,
  "tradePointGrantLvl1": 0,
  "combatTraining": ["Light Armor"],
  "maneuversKnownLvl1": 0,
  "techniquesKnownLvl1": 0,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "cantripsKnownLvl1": 2,
  "spellsKnownLvl1": 3,
  "level1Features": [
    {
      "id": "warlock_warlock_contract",
      "name": "Warlock Contract",
      "level": 1,
      "description": "You have a binding agreement with your patron that allows you to make sacrifices in exchange for boons. Hasty Bargain: Once per turn when you make a Check, you can spend 1 HP to gain ADV on the Check. Desperate Bargain: Once per Combat, you can spend 1 AP to regain an amount of HP equal to your Prime Modifier. When you do, you become Exposed until the end of your next turn.",
      "effects": []
    },
    {
      "id": "warlock_pact_boon",
      "name": "Pact Boon",
      "level": 1,
      "description": "You gain a Pact Boon from your Patron. Choose 1 of the following options: Weapon, Armor, Cantrip, or Familiar.",
      "effects": []
    },
    {
      "id": "warlock_beseech_patron",
      "name": "Beseech Patron (Flavor Feature)",
      "level": 1,
      "description": "During a Long Rest, while sleeping or meditating, you can access an Inner Sanctum within your mind. Its appearance is influenced by your psyche and is subject to change. While inside your Inner Sanctum, you can attempt to contact your Patron. If they choose to respond, they enter your mind and you might possibly be able to see or hear them. While connected to your Patron in this way, you’re aware of your surroundings but you can’t take actions or move. Your Patron chooses when to end the connection, or you can make a Mental Save against your own Save DC to force the connection to end.",
      "effects": []
    }
  ],
  "featureChoicesLvl1": [
    {
      "id": "warlock_pact_boon_choice",
      "prompt": "Choose a Pact Boon:",
      "type": "select_one",
      "options": [
        { "value": "weapon", "label": "Pact of the Weapon" },
        { "value": "armor", "label": "Pact of the Armor" },
        { "value": "cantrip", "label": "Pact of the Cantrip" },
        { "value": "familiar", "label": "Pact of the Familiar" }
      ]
    }
  ]
}
````

## File: src/lib/rulesdata/classes/wizard.json
````json
{
  "id": "wizard",
  "name": "Wizard",
  "description": "Wizards learn to master each of the Spell Schools to control them in a structured and efficient way. They utilize sigils on the ground to enhance certain types of magic while they push spells to their limits.",
  "baseHpContribution": 8,
  "startingSP": 0,
  "startingMP": 6,
  "skillPointGrantLvl1": 2,
  "tradePointGrantLvl1": 3,
  "combatTraining": ["Light Armor"],
  "maneuversKnownLvl1": 0,
  "techniquesKnownLvl1": 0,
  "saveDCBase": 8,
  "deathThresholdBase": 10,
  "moveSpeedBase": 30,
  "restPointsBase": 4,
  "gritPointsBase": 2,
  "initiativeBonusBase": 0,
  "cantripsKnownLvl1": 2,
  "spellsKnownLvl1": 3,
  "level1Features": [
    {
      "id": "wizard_spell_school_initiate",
      "name": "Spell School Initiate",
      "level": 1,
      "description": "You’ve completed training in a specialized School of Magic. Choose a Spell School. You gain the following benefits: School Magic: You learn 1 Arcane Cantrip and 1 Arcane Spell from this Spell School. Signature School: When you cast a Spell from the chosen School, you can reduce its MP cost by 1. Its total MP cost before the reduction still can’t exceed your Mana Spend Limit. You can use this Feature once per Long Rest, but regain the ability to use it again when you roll for Initiative.",
      "effects": []
    },
    {
      "id": "wizard_arcane_sigil",
      "name": "Arcane Sigil",
      "level": 1,
      "description": "You can spend 1 AP and 1 MP to create a 1 Space diameter Arcane Sigil on the ground beneath you that lasts for 1 minute. When you create an Arcane Sigil choose 1 Spell School (Enchantment, Necromancy, Protection, etc.) or 1 Spell Tag (Fire, Cold, Teleportation, etc.). The Arcane Sigil radiates magic of the chosen type. Using a Sigil: While a creature is within the area of your Arcane Sigil, it has ADV on Spell Checks to cast or produce the effects of Spells with the chosen Spell School or Spell Tag. Moving a Sigil: You can spend 1 AP to teleport one of your Sigils within 10 spaces to your current space, but multiple Sigils can’t coexist in the same Space.",
      "effects": []
    },
    {
      "id": "wizard_ritual_caster",
      "name": "Ritual Caster (Flavor Feature)",
      "level": 1,
      "description": "You learn 1 Arcane Spell with the Ritual Spell Tag each time you gain a Wizard Class Feature (including this one). You can only gain this benefit once per Level. Additionally, when you encounter an Arcane Spell with the Ritual Spell Tag in a form you can study (such as a spellbook, a spell scroll, or from an instructor), you can spend a number of hours equal to the Spell’s base MP cost to learn it. You can only cast Spells you learn with this feature as Rituals, unless you learned it from another source.",
      "effects": []
    }
  ],
  "featureChoicesLvl1": [
    {
      "id": "wizard_spell_school_choice",
      "prompt": "Choose a Spell School:",
      "type": "select_one",
      "options": [
        {"value": "Abjuration", "label": "Abjuration"},
        {"value": "Conjuration", "label": "Conjuration"},
        {"value": "Divination", "label": "Divination"},
        {"value": "Enchantment", "label": "Enchantment"},
        {"value": "Evocation", "label": "Evocation"},
        {"value": "Illusion", "label": "Illusion"},
        {"value": "Necromancy", "label": "Necromancy"},
        {"value": "Transmutation", "label": "Transmutation"}
      ]
    }
  ]
}
````

## File: src/lib/rulesdata/cleric-domains.ts
````typescript
/**
 * @file cleric-domains.ts
 * @description Contains the schemas and a complete list of all Cleric Divine Domains
 * from the DC20 Beta 0.9.5 rulebook (page 128).
 *
 * General Rule for Domains:
 * From the Cleric Order feature, you gain the benefits of 2 Divine Domains of your choice.
 */

//==============================================================================
// SCHEMA / TYPE
//==============================================================================

/**
 * The definitive blueprint for a single Cleric Divine Domain object.
 */
export interface ClericDomain {
  /** The name of the domain, e.g., "Knowledge". */
  name: string;
  /** The full description of the mechanical benefits the domain provides. */
  description: string;
}


//==============================================================================
// CLERIC DOMAIN DATA
//==============================================================================

/**
 * A comprehensive list of all Cleric Divine Domains available in the game.
 */
export const clericDomains: ClericDomain[] = [
  {
    name: "Knowledge",
    description: "Your Mastery Limit increases by 1 for all Knowledge Trades. A Trade can only benefit from 1 Feature that increases its Mastery Limit at a time. Additionally, you gain 2 Skill Points."
  },
  {
    name: "Magic",
    description: "Your maximum MP increases by 1. Choose a Spell Tag (such as Fire, Holy, or Undeath). You learn 1 Spell with the chosen Spell Tag, and when you learn a new Spell you can choose any Spell that also has the chosen Spell Tag. This can be chosen multiple times."
  },
  {
    name: "Divine Damage Expansion",
    description: "When you deal damage with a Spell you can convert the damage to your Divine Damage type. Additionally, you gain Resistance (1) to your Divine Damage type."
  },
  {
    name: "Life",
    description: "When you produce an MP Effect that restores HP to at least 1 creature, you can restore 1 HP to 1 creature of your choice within 1 Space of you (including yourself)."
  },
  {
    name: "Death",
    description: "Enemy creatures within 10 Spaces of you take an additional 1 damage from Attacks while they’re Well-Bloodied."
  },
  {
    name: "Grave",
    description: "Allied creatures within 10 Spaces of you take 1 less damage from Attacks while they’re Well-Bloodied."
  },
  {
    name: "Light",
    description: "When you produce an MP Effect that targets at least 1 creature, you can force 1 target of your choice to make a Might or Charisma Save (their choice). Failure: Until the end of their next turn, they shed a 1 Space Aura of Bright Light and are Hindered on their next Attack."
  },
  {
    name: "Dark",
    description: "You gain 10 Space Darkvision. If you already have Darkvision it increases by 5 Spaces. While in an area of Dim Light, you can take the Hide Action to Hide from creatures that can see you. On a Success, you remain Hidden until you move or the area you’re in becomes Bright Light."
  },
  {
    name: "War",
    description: "You gain Combat Training with Weapons and access to Attack Maneuvers."
  },
  {
    name: "Peace",
    description: "You gain Combat Training with Heavy Armor and Heavy Shields and learn 1 Defensive Maneuver of your choice."
  },
  {
    name: "Order",
    description: "Once per turn, when a creature you can see within 10 Spaces of you makes a Check, you can spend 1 AP as a Reaction to remove all instances of ADV and DisADV from that Check."
  },
  {
    name: "Chaos",
    description: "When you make a Spell Check you can choose to give yourself ADV on it, but you must also roll on the Wild Magic Table. You can use this Feature once per Long Rest, and regain the ability to use it again when you roll for Initiative."
  },
  {
    name: "Divination",
    description: "You can’t be Flanked. When you spend MP, you gain the ability to see Invisible creatures and objects until the start of your next turn."
  },
  {
    name: "Trickery",
    description: "When you produce an MP Effect that targets at least 1 creature, you can choose 1 of the targets and create an illusory duplicate of it that lasts until the start of your next turn. The next Attack made against the target has DisADV, and causes the illusory duplicate to disappear."
  },
  {
    name: "Ancestral",
    description: "You get 2 Ancestry Points that you can spend on Traits from any Ancestry."
  }
];

/** A simple alias for the main clericDomains array. */
export const allClericDomains = clericDomains;
````

## File: src/lib/rulesdata/loaders/class.loader.ts
````typescript
import { classesDataSchema, type IClassDefinition } from '../schemas/class.schema';

// Use Vite's import.meta.glob to import all the JSON files from the classes directory.
// The `eager: true` option imports the modules directly, so they are available synchronously.
const classModules = import.meta.glob('../classes/*.json', { eager: true });

// Extract the default export (the class object) from each module.
const rawData = Object.values(classModules).map((module: any) => module.default);

// Validate the combined data against the Zod schema.
// The parse method will throw a detailed error if validation fails.
const validatedData = classesDataSchema.parse(rawData);

// Export the validated data with the correct type.
export const classesData: IClassDefinition[] = validatedData;
````

## File: src/lib/rulesdata/maneuvers.ts
````typescript
/**
 * @file maneuvers.ts
 * @description Contains the schemas and a complete list of all Martial Maneuvers
 * from the DC20 Beta 0.9.5 rulebook (pages 48-50).
 */

//==============================================================================
// SCHEMAS / TYPES
//==============================================================================

/**
 * Categorizes maneuvers based on their function as described in the rulebook.
 */
export enum ManeuverType {
	Attack = 'Attack',
	Save = 'Save',
	Grapple = 'Grapple',
	Defense = 'Defense'
}

/**
 * Represents the resource cost of a maneuver, typically in Action Points (AP).
 */
export interface ManeuverCost {
	ap: number;
}

/**
 * The definitive blueprint for a single Maneuver object.
 */
export interface Maneuver {
	name: string;
	type: ManeuverType;
	cost: ManeuverCost;
	description: string;
	isReaction: boolean;
	trigger?: string; // Optional: The condition for using a Reaction maneuver.
	requirement?: string; // Optional: Any prerequisites for using the maneuver.
}

//==============================================================================
// MANEUVER DATA
//==============================================================================

/**
 * A comprehensive list of all martial maneuvers available in the game.
 */
export const maneuvers: Maneuver[] = [
	// --- Attack Maneuvers (Page 48) ---
	{
		name: 'Extend Attack',
		type: ManeuverType.Attack,
		cost: { ap: 1 },
		description:
			'Your Melee Attack Range is increased by 1 Space (or your Ranged Attack Range is increased by 5 Spaces) for the Attack.',
		isReaction: false
	},
	{
		name: 'Power Attack',
		type: ManeuverType.Attack,
		cost: { ap: 1 },
		description: 'You deal +1 damage with the Attack. You can use this Maneuver multiple times.',
		isReaction: false
	},
	{
		name: 'Sweep Attack',
		type: ManeuverType.Attack,
		cost: { ap: 1 },
		description:
			'Choose 1 additional target within 1 Space of the original target that’s within your Attack Range. Make 1 Attack Check against all targets. Attack Hit: The original target takes your Attack’s damage, and each additional target Hit takes 1 damage of the same type. You can use this Maneuver multiple times.',
		isReaction: false
	},

	// --- Save Maneuvers (Page 49) ---
	{
		name: 'Bleed',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description: 'The target begins Bleeding (1 True damage at the start of their turn).',
		isReaction: false
	},
	{
		name: 'Daze',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description:
			'The target becomes Dazed (DisADV on Mental Checks) on the next Mental Check it makes before the end of your next turn.',
		isReaction: false
	},
	{
		name: 'Expose',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description:
			'The target becomes Exposed (Attacks against it have ADV) against the next Attack made against it before the end of your next turn.',
		isReaction: false
	},
	{
		name: 'Hamstring',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description:
			'The target becomes Slowed (every 1 Space you move costs an extra 1 Space of movement) until the end of your next turn.',
		isReaction: false
	},
	{
		name: 'Hinder',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description:
			'The target becomes Hindered (DisADV on Attacks) on the next Attack it makes before the end of your next turn.',
		isReaction: false
	},
	{
		name: 'Impair',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description:
			'The target becomes Impaired (DisADV on Physical Checks) on the next Physical Check it makes before the end of your next turn.',
		isReaction: false
	},
	{
		name: 'Knockback',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description:
			'The target is pushed 1 Space away + up to 1 additional Space for every 5 it fails its Save by.',
		isReaction: false
	},
	{
		name: 'Trip',
		type: ManeuverType.Save,
		cost: { ap: 1 },
		description: 'The target falls Prone.',
		isReaction: false
	},

	// --- Grapple Maneuvers (Page 49) ---
	{
		name: 'Body Block',
		type: ManeuverType.Grapple,
		cost: { ap: 1 },
		isReaction: true,
		trigger: 'You are targeted by an Attack.',
		description:
			'You reposition a creature Grappled by you to shield yourself from damage. You and the Grappled creature take half the damage dealt by the attack and you can move the Grappled creature to any space adjacent to you immediately afterwards.'
	},
	{
		name: 'Restrain',
		type: ManeuverType.Grapple,
		cost: { ap: 1 },
		description:
			'The target is Restrained until the Grapple ends. On its turn it can spend 1 AP to end being Restrained, but it remains Grappled until the Condition ends.',
		isReaction: false
	},
	{
		name: 'Slam',
		type: ManeuverType.Grapple,
		cost: { ap: 1 },
		description: 'The target takes 1 Bludgeoning damage. Success (each 5): +1 damage.',
		isReaction: false
	},
	{
		name: 'Takedown',
		type: ManeuverType.Grapple,
		cost: { ap: 1 },
		description: 'The target falls Prone. You don’t fall Prone unless you choose to do so.',
		isReaction: false
	},
	{
		name: 'Throw',
		type: ManeuverType.Grapple,
		cost: { ap: 1 },
		requirement: 'The Grappled creature is your Size or smaller.',
		description:
			'The target is thrown up to a number of Spaces away from you equal to 1/2 of your Might (ending the Grappled Condition) + up to 1 additional Space for every 5 they fail the Contest by.',
		isReaction: false
	},

	// --- Defense Maneuvers (Page 50) ---
	{
		name: 'Parry',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		isReaction: true,
		trigger:
			'When a creature you can see within 1 Space (including yourself) is targeted by an Attack against its PD.',
		description: 'You grant the target a +5 bonus to PD against this Attack.'
	},
	{
		name: 'Protect',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		isReaction: true,
		trigger: 'A creature you can see within 1 Space is Hit by an Attack.',
		description:
			'The target takes half of the damage and you take the other half. The damage you take bypasses any Damage Reduction.'
	},
	{
		name: 'Raise Shield',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		isReaction: true,
		trigger:
			'When a creature you can see within 1 Space (including yourself) is targeted by an Attack against its AD.',
		requirement: 'You’re wielding a Shield.',
		description: 'You grant the target a +5 bonus to AD against this Attack.'
	},
	{
		name: 'Side Step',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		isReaction: true,
		trigger: 'You’re targeted by an Attack against your PD.',
		description:
			'You move 1 Space to a Space that’s still within the Attack’s range. When you do, the Attack has DisADV against you. If you move behind Cover, you don’t gain the benefit of that Cover against the Attack.'
	},
	{
		name: 'Swap',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		description:
			'You switch Spaces with a willing creature within 1 Space. If this movement would provoke an Opportunity Attack against you or the target creature, any Opportunity Attacks are made against you.',
		isReaction: false // This is a standard action, not a reaction.
	},
	{
		name: 'Taunt',
		type: ManeuverType.Defense,
		cost: { ap: 1 },
		description:
			'Choose an enemy creature that can see or hear you within 5 Spaces. Make an Attack Check, Influence Check, or Intimidation Check (your choice) contested by the target’s Mental Save. Contest Success: The target is Taunted (DisADV on Attacks against creatures other than you) by you on their next Attack.',
		isReaction: false
	}
];

/** A simple alias for the main maneuvers array. */
export const allManeuvers = maneuvers;
````

## File: src/lib/rulesdata/monk-stances.ts
````typescript
/**
 * @file monk-stances.ts
 * @description Contains the schemas and a complete list of all Monk Stances
 * from the DC20 Beta 0.9.5 rulebook (page 144).
 *
 * General Rule for All Stances:
 * Entering & Exiting: In Combat, at the start of each of your turns you can freely enter or
 * swap into one of your Monk Stances. You can also spend 1 SP on your turn to swap to a
 * different stance. You can end your Stance at any moment for free.
 * You can only be in 1 Monk Stance at a time.
 */

//==============================================================================
// SCHEMA / TYPE
//==============================================================================

/**
 * The definitive blueprint for a single Monk Stance object.
 */
export interface MonkStance {
  /** The name of the stance, e.g., "Bear Stance". */
  name: string;
  /** A short, descriptive tagline for the stance, e.g., "Big Hits". */
  tagline: string;
  /** A list of the mechanical benefits the stance provides. */
  description: string[];
  /** Any special requirements for the stance to be active. */
  requirement?: string;
}


//==============================================================================
// MONK STANCE DATA
//==============================================================================

/**
 * A comprehensive list of all Monk Stances available in the game.
 */
export const monkStances: MonkStance[] = [
  {
    name: "Bear Stance",
    tagline: "Big Hits",
    description: [
      "+1 damage when you score a Heavy, Brutal, or Critical Hit with a Melee Martial Attack.",
      "Once on each of your turns, when you Miss an Attack with a Melee Martial Attack, you gain ADV on the next Melee Martial Attack you make before the end of your turn."
    ]
  },
  {
    name: "Bull Stance",
    tagline: "Knockback",
    description: [
      "You deal +1 Bludgeoning damage whenever you Succeed on a Physical Check to push a target or knock them back.",
      "When you shove or push a target, it’s knocked back 1 additional space. Additionally, you can choose to move in a straight line with the target an amount of spaces equal to how far they’re knocked back. This movement requires no AP and doesn’t provoke Opportunity Attacks."
    ]
  },
  {
    name: "Cobra Stance",
    tagline: "Counter",
    description: [
      "+1 damage with Melee Martial Attack against creatures that have damaged you since the start of your last turn.",
      "When a creature within your Melee Range misses you with a Melee Attack, you can spend 1 AP as a Reaction to make a Melee Martial Attack against it."
    ]
  },
  {
    name: "Gazelle Stance",
    tagline: "Nimble",
    requirement: "While not wearing Heavy Armor",
    description: [
      "+1 Movement Speed and Jump Distance.",
      "Ignore Difficult Terrain.",
      "ADV on Agility Saves and Acrobatics Checks."
    ]
  },
  {
    name: "Mantis Stance",
    tagline: "Grapple",
    description: [
      "ADV on all Martial Checks to initiate, maintain, or escape Grapples.",
      "If you have a creature Grappled at the start of your turn, you get +1 AP to use on a Grapple Maneuver against the Grappled creature."
    ]
  },
  {
    name: "Mongoose Stance",
    tagline: "Multi",
    description: [
      "Your Melee Martial Attacks deal +1 damage while you’re Flanked.",
      "When you make a Melee Martial Attack against a target, you can make another Melee Martial Attack for free against a different target within your Melee Range. You can only make this bonus Melee Martial Attack once on each of your turns. Make a single Attack Check and apply the number rolled to each target’s Physical Defense. Attack Hit: You deal your Melee Martial Attack damage."
    ]
  },
  {
    name: "Scorpion Stance",
    tagline: "Quick Strike",
    description: [
      "When a creature enters your Melee Range, you can make an Opportunity Attack against them with a Melee Martial Attack.",
      "When you make a Melee Martial Attack, you can spend 1 AP to deal +1 damage and force the target to make a Physical Save against your Save DC. Failure: The target is Impaired (DisADV on Physical Checks) on the next Physical Check it makes before the end of your next turn."
    ]
  },
  {
    name: "Turtle Stance",
    tagline: "Sturdy",
    description: [
      "Your Speed becomes 1 (unless it’s already lower).",
      "You gain PDR, EDR, and MDR.",
      "You have ADV on Might Saves and Saves against being moved or knocked Prone."
    ]
  },
  {
    name: "Wolf Stance",
    tagline: "Hit & Run",
    description: [
      "After you make an Attack with a Melee Martial Attack, you can immediately move up to 1 Space for free.",
      "You have ADV on Opportunity Attacks, and creatures have DisADV on Opportunity Attacks made against you."
    ]
  }
];

/** A simple alias for the main monkStances array. */
export const allMonkStances = monkStances;
````

## File: src/lib/rulesdata/schemas/class.schema.ts
````typescript
import { z } from 'zod';

// Schema for ITraitEffect
const traitEffectSchema = z.object({
  type: z.string(),
  target: z.string().optional(),
  value: z.any().optional(),
  condition: z.string().optional(),
  userChoiceRequired: z.object({
    prompt: z.string(),
    options: z.array(z.string()).optional(),
  }).optional(),
  descriptionOverride: z.string().optional(),
  subFeature: z.string().optional(),
  schools: z.array(z.string()).optional(),
});

// Schema for IClassFeatureChoiceOption
const classFeatureChoiceOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  description: z.string().optional(),
  effectsOnChoice: z.array(traitEffectSchema).optional(),
});

// Schema for IClassFeatureChoice
const classFeatureChoiceSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  type: z.enum(['select_one', 'select_multiple']),
  maxSelections: z.number().optional(),
  options: z.array(classFeatureChoiceOptionSchema),
});

// Schema for IClassFeature
const classFeatureSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  level: z.number(),
  effects: z.array(traitEffectSchema).optional(),
});

// Schema for IClassDefinition
export const classSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  baseHpContribution: z.number(),
  startingSP: z.number(),
  startingMP: z.number(),
  skillPointGrantLvl1: z.number().optional(),
  tradePointGrantLvl1: z.number().optional(),
  combatTraining: z.array(z.string()).optional(),
  maneuversKnownLvl1: z.union([z.string(), z.number()]).optional(),
  techniquesKnownLvl1: z.number().optional(),
  saveDCBase: z.number(),
  deathThresholdBase: z.number(),
  moveSpeedBase: z.number(),
  restPointsBase: z.number(),
  gritPointsBase: z.number(),
  initiativeBonusBase: z.number(),
  cantripsKnownLvl1: z.number().optional(),
  spellsKnownLvl1: z.number().optional(),
  level1Features: z.array(classFeatureSchema),
  featureChoicesLvl1: z.array(classFeatureChoiceSchema).optional(),
});

// Schema for an array of class definitions
export const classesDataSchema = z.array(classSchema);

// Infer the TypeScript type from the schema
export type IClassDefinition = z.infer<typeof classSchema>;
````

## File: src/lib/rulesdata/spells-data/spells/additional-spells/close-wounds.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const closeWounds: Spell = {
	name: 'Close Wounds',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Restoration,
	isCantrip: true,
	cost: { ap: 1 },
	range: '1 Space',
	duration: 'Instant',
	spellLists: [SpellList.Divine],
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Heal Allied Creature',
			description:
				'You touch an allied creature that has at least 1 HP, tapping into its inner life force to cause a surge of natural healing. Make a DC 10 Spell Check. Success: The target can spend 1 Rest Point to regain 2 HP. Failure: The target spends 1 Rest Point to regain 1 HP.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Range',
			description: 'You increase the range to 10 Spaces (and don’t have to touch the target).'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Bolster',
			description:
				'You increase the HP regained by 3. You can take this enhancement multiple times.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/additional-spells/death-bolt.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const deathBolt: Spell = {
	name: 'Death Bolt',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Divine],
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Umbral damage.'
		},
		{
			title: 'Black Orb',
			description:
				'Black wispy magic swirls around your hands. Your touch send chills down the spine of creatures and make small plants wither. You can hold this dark energy in your hands for 1 minute.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Bloodied.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Umbral damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Dampen Heal',
			description:
				'Creatures that take damage from this Spell can’t regain HP until the start of their next turn.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/additional-spells/druidcraft.ts
````typescript
import {
	Spell,
	SpellSchool,
	PremadeSpellList
} from '../../types/spell.types';

export const druidcraft: Spell = {
	name: 'Druidcraft',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Transmutation,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Natural Sensory Effect',
			description:
				'You target an area within range and produce a harmless natural smell (such as flowers, faint odor of skunk, etc.) or sound (rustling leaves, a small animal, etc.).'
		},
		{
			title: 'Accelerate Plant Growth',
			description:
				'You target a living mundane plant and instantly accelerate the growth of the plant (flowers bloom, seeds open, etc.).'
		},
		{
			title: 'Revive Plant',
			description:
				'You target a wounded or dead mundane plant (smaller than a 1 Space cube) and bring it back to life.'
		}
	],
	enhancements: [] // No enhancements specified in PDF
};
````

## File: src/lib/rulesdata/spells-data/spells/additional-spells/find-familiar.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const findFamiliar: Spell = {
	name: 'Find Familiar',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Conjuration,
	isCantrip: false,
	isRitual: true,
	cost: { ap: 1, mp: 1 },
	range: '2 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Summon Familiar',
			description:
				'You summon a friendly spirit that enters your service. It takes the form of a Tiny creature of your choice, but with a Creature Type of your choice (except Giant and Humanoid). Your Familiar uses the statblock below: Familiar Level 1/8, Tiny (Chosen Type) HP Shared Prime & CM Shared PD 8+CM PDR 0 AD 8+CM MDR 0 MIG 0 CHA 0 AGI 0 INT 0 Check Shared Save DC Shared AP Shared Speed 5 Recasting the Spell: You can’t have more than 1 Familiar at a time. If you cast this Spell while you already have a Familiar, your Familiar can retain its form, adopt a new form of your choice, or it disappears and a new one takes its place. The new Familiar can be a previous one you summoned in the past or a new one altogether. In either case, you can reassign its Familiar Traits. Base Familiar Traits: Your Familiar has the following Familiar Traits: Familiar Bond: Your Familiar shares your HP and Death’s Door Threshold. If you both take damage from the same source, you only take 1 instance of that damage. While your Familiar occupies the same Space as you, it can’t be targeted by Attacks. Shared Telepathy: While within 20 Spaces, you and your Familiar can speak Telepathically with each other. Spell Delivery: While within 10 Spaces of your Familiar, you can cast a Spell with a range of Touch as if you were standing in your Familiar’s Space. Additional Traits: When you cast this Spell, you can spend additional MP (up to your Mana Spend Limit) to grant your Familiar 2 additional Traits per MP spent. You can choose Traits from the Familiar Traits or Beast Traits (you can’t choose Negative Traits). Spell Actions: Pocket Dimension: You can spend a Minor Action to dismiss the Familiar into a pocket dimension, summon it from that pocket dimension, or summon it from anywhere on the same plane of existence. When dismissed, any items it was carrying are left behind. When summoned, it appears in the nearest unoccupied Space of your choice. Shared Senses: While your Familiar is within 20 Spaces, you can spend 1 AP to connect your senses to the Familiar’s senses until the end of your next turn. For the duration, you’re Deafened and Blinded to your own senses but you can see what your Familiar sees and hear what it hears. The connection ends early if either of you moves farther than 20 Spaces from each other. Managing the Familiar: Combat: The Familiar shares your Initiative, acting on your turn. You can spend 1 AP to command the Familiar to use an Action. It can’t take the Attack Action or Spell Action unless it has a Familiar Feature that allows it to. When you take an Action, your Familiar can move up to its Speed immediately before or after the Action. If you don’t command it, it takes the Dodge Action. Shared MCP: When the Familiar makes a Check, it shares your Multiple Check Penalty. Death & Resurrection: Your Familiar dies when you die. When it does, its body disappears and its spirit returns from which it came. If you’re resurrected, the Familiar doesn’t return to life until the next time you cast this Spell. When it does, you follow the normal rules for recasting the Spell.'
		}
	],
	enhancements: [] // No enhancements specified in PDF
};
````

## File: src/lib/rulesdata/spells-data/spells/additional-spells/index.ts
````typescript
import { druidcraft } from './druidcraft';
import { findFamiliar } from './find-familiar';
import { shield } from './shield';
import { tetheringVines } from './tethering-vines';
import { closeWounds } from './close-wounds';
import { deathBolt } from './death-bolt';

export const additionalSpells = [
	druidcraft,
	findFamiliar,
	shield,
	tetheringVines,
	closeWounds,
	deathBolt
];
````

## File: src/lib/rulesdata/spells-data/spells/additional-spells/shield.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const shield: Spell = {
	name: 'Shield',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Protection,
	isCantrip: true,
	cost: { ap: 1 },
	range: '1 Space',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Create Barrier',
			description:
				'You create a barrier of magic to protect yourself or another creature nearby. Trigger: When a creature you can see within range (including yourself) is targeted by an Attack. Reaction: You grant the target a +5 bonus to its PD and AD against the Attack.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Increase Range',
			description: 'The range increases to 5 Spaces.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Multiple Targets',
			description:
				'You can target 1 additional creature in range from the same triggering Attack (such as an Area of Effect).'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Increase Duration',
			description: 'The PD and AD bonus lasts until the start of your next turn.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/additional-spells/tethering-vines.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const tetheringVines: Spell = {
	name: 'Tethering Vines',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Conjuration,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Sprout Vines',
			description:
				'Choose a Space within range. Vines and weeds sprout up from the ground in a 3 Space Radius from the chosen Space, making the area Difficult Terrain. Make a Spell Check Contested by a Physical Save from all creatures (other than you) within range. Success: The creature is Tethered. Tethered: While Tethered, the creature can’t leave the area. The creature can spend 1 AP to make a Physical Check of your choice against your Save DC. Success: The target is no longer Tethered. When the Spell ends, the conjured plants wilt away.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Widen Vines', description: 'The radius increases by 1 Space.' }
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/fiendborn-ancestry-spells/acid-bolt.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const acidBolt: Spell = {
	name: 'Acid Bolt',
	premadeList: PremadeSpellList.FiendbornAncestry,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Corrosion damage.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Hindered.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Corrosion damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Corrode',
			description:
				'The target makes a Physical Save. Failure: Target becomes Hindered for 1 minute or until a creature (including itself) within 1 Space spends 1 AP to clear off the acid.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/fiendborn-ancestry-spells/index.ts
````typescript
import { poisonBolt } from './poison-bolt';
import { acidBolt } from './acid-bolt';

export const fiendbornAncestrySpells = [poisonBolt, acidBolt];
````

## File: src/lib/rulesdata/spells-data/spells/fiendborn-ancestry-spells/poison-bolt.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const poisonBolt: Spell = {
	name: 'Poison Bolt',
	premadeList: PremadeSpellList.FiendbornAncestry,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Poison damage.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Impaired.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Poison damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Sicken',
			description:
				'The target makes a Physical Save. Failure: Target becomes Impaired for 1 minute. A creature within 1 Space, including itself, can spend 1 AP to make a DC 10 Medicine Check to end the Condition early.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/fire-and-flames/burning-flames.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const burningFlames: Spell = {
	name: 'Burning Flames',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: 'Self (10 Spaces)',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Area of Effect',
			description:
				'A brilliant flame manifests around you. Choose a type of area: Line, Cone, or Sphere. You are the Spell’s Point of Origin. Line: The Spell affects every target in a 1 Space wide and 10 Space long line. Cone: The Spell creates a 3 Space long Cone. Sphere: The Spell affects every target in a 2 Space radius. Make a Spell Check against every target’s AD within the Spell’s area. Hit: The target takes 2 Fire damage.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Burning',
			description:
				'Each target makes a Physical Save. Failure: The target begins Burning until a creature (including itself) within 1 Space spends 1 AP to put it out.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Range',
			description:
				'The Point of Origin of the Spell becomes a point of your choice within 15 Spaces (instead of Self).'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/fire-and-flames/dancing-flames.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const dancingFlames: Spell = {
	name: 'Dancing Flames',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '20 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Create Flames',
			description:
				'Make a DC 10 Spell Check. Success: You create up to 3 torch-sized Flames within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. Success (each 5): +1 Flame. Failure: 2 Flames. You can also combine 4 Flames into 1 glowing vaguely humanoid form of Medium Size. Whichever form you choose, each Flame sheds Bright Light in a 2 Space radius. You can spend 1 AP to move the Flames up to 10 Spaces to a new Space within range. A Flame must be within 5 Spaces of another Flame created by this Spell and be within 20 Spaces from you, or it winks out of existence.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 2,
			name: 'Detonate',
			description:
				'Spend 2 AP and 1 MP to detonate the Flames. Make a single Spell Check and compare it against the AD of each target sharing a Space with a Flame. Hit: Each Flame in that Space deals 1 Fire damage to the target, but doesn’t benefit from Heavy, Brutal, or Critical Hits.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/fire-and-flames/fire-bolt.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const fireBolt: Spell = {
	name: 'Fire Bolt',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [ClassName.Wizard, ClassName.Sorcerer],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Fire damage.'
		},
		{
			title: 'Fire Orb',
			description:
				'A flickering flame appears in your hand. The flame can remain there for 10 minutes and harms neither you nor your equipment. The flame sheds Bright Light in a 5 Space radius. The Spell ends early if you dismiss it for free, if you cast it again, or spend 1 AP to make a Spell Attack with it.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Burning.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Fire damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by +5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Burning',
			description: 'The target makes a Physical Save. Failure: Target begins Burning.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/fire-and-flames/fire-shield.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const fireShield: Spell = {
	name: 'Fire Shield',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Abjuration,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: 'Self',
	duration: '1 hour',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Protective Force',
			description:
				'A protective magical force surrounds you, manifesting as spectral flames that cover you and your gear. You emit Bright Light in a 2 Space Radius. Make a DC 15 Spell Check. Success: You gain 3 Temp HP. Success (each 5): +1 Temp HP. Failure: 2 Temp HP. If a creature hits you with a Melee Attack while you have this Temp HP, the creature takes 1 Fire damage for each Temp HP it consumed with its Attack. The Spell ends once the Temp HP is consumed.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 3,
			name: 'Fire Protection',
			description: 'You gain Fire Resistance (Half) and 10 more Temp HP.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/fire-and-flames/fog-cloud.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const fogCloud: Spell = {
	name: 'Fog Cloud',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Conjuration,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '20 Spaces',
	duration: '1 hour (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Create Fog',
			description:
				'Make a DC 10 Spell Check. Success: You create a sphere of fog with up to a 4 Space radius, centered on a point within range. Succeed (each 5): Radius increases by 1 Space. Failure: 3 Space radius. The Sphere spreads around corners and its area is Fully Concealed. Creatures within 1 Space of each other can see each other normally. The fog lasts for the duration or until a wind of moderate or greater speed disperses it.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Area of Effect',
			description: 'The radius of the Spell’s effect increases by 3 Spaces.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/fire-and-flames/grease.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const grease: Spell = {
	name: 'Grease',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Conjuration,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Slick Ground',
			description:
				'Make a DC 10 Spell Check. Success: Slick grease covers the ground in 4 Spaces of your choosing within range. Failure: Only 3 Spaces. The Spaces must connect to each other and all be within range of the Spell. These Spaces are considered to be Difficult Terrain for the duration and are flammable. If fire touches one of these Spaces, the grease ignites and deals 1 Fire damage to any creature within the Space instantly and again to any creature who ends their turn in this Space before the Spell ends. If a creature is standing in one of the Spaces when the grease initially appears, when they end their turn, or when they enter it for the first time on a turn they must make an Agility Save. Failure: They fall Prone.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'More Grease', description: 'You add 4 more Spaces of grease.' },
		{
			type: 'MP',
			cost: 1,
			name: 'More Fire',
			description: 'Fire damage dealt by the Spell is increased by 1.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/fire-and-flames/index.ts
````typescript
import { fireBolt } from './fire-bolt';
import { minorFlameBlade } from './minor-flame-blade';
import { dancingFlames } from './dancing-flames';
import { burningFlames } from './burning-flames';
import { fogCloud } from './fog-cloud';
import { fireShield } from './fire-shield';
import { grease } from './grease';

export const fireAndFlamesSpells = [
	fireBolt,
	minorFlameBlade,
	dancingFlames,
	burningFlames,
	fogCloud,
	fireShield,
	grease
];
````

## File: src/lib/rulesdata/spells-data/spells/fire-and-flames/minor-flame-blade.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const minorFlameBlade: Spell = {
	name: 'Minor Flame Blade',
	premadeList: PremadeSpellList.FireAndFlames,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: 'Self',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Imbue Weapon',
			description:
				'You imbue a Melee Weapon you’re wielding with flames. Until the end of your next turn, the next Attack Check that hits with this weapon deals an additional 1 Fire damage to your target or a creature within 1 Space of the target.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Flame Strike',
			description:
				'You deal an extra 2 Fire damage to the target (must be done before the Attack is made). Miss: Deal 1 Fire damage to the target.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Flame Bound',
			description:
				'You deal an extra 1 Fire damage to the target and another target within 1 Space.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/holy-and-restoration/bless.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const bless: Spell = {
	name: 'Bless',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Divination,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Bless Creatures',
			description:
				'Make a DC 10 Spell Check. Success: You bless up to 3 creatures of your choice within range. Success (each 10): +1 additional creature. Failure: Only 2 creatures. Whenever a target makes a Check or Save before the Spell ends, the target can roll a d4 and add the number rolled to the total.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Targets',
			description: 'You increase the number of targets by 1.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Grace',
			description: 'You change the d4 granted by the Spell to a d6.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/holy-and-restoration/guidance.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const guidance: Spell = {
	name: 'Guidance',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Divination,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: '1 Round',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Grant Help Die',
			description:
				'You grant a Help Die (d8) to an ally within range. The target can use this Help Die to add to any Check they make before the start of your next turn. Casting Guidance counts as taking the Help Action and still triggers the “Multiple Action Penalty (Help)”. If you cast Guidance again or take the Help Action, the Help Die would be a d6, then a d4, then you wouldn’t be able to grant any more during the same round of Combat.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Sustained',
			description: 'The duration increases to 1 minute, but it requires the Sustain Action.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Expand',
			description:
				'You grant an additional Help Die (of the same size you granted with the casting of the Spell).'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/holy-and-restoration/guiding-bolt.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const guidingBolt: Spell = {
	name: 'Guiding Bolt',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '15 Spaces',
	duration: '1 Round',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Flash of Light',
			description:
				'A flash of light streaks toward a creature of your choice within range, surrounding them in a holy glow. Make a Spell Check against the target’s PD. Hit: The target takes 3 Radiant damage and the next Attack Check made against the target before the end of your next turn has ADV.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Guiding Damage',
			description:
				'The next Attack Check made against the target also deals an extra 3 Radiant damage on a Hit.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/holy-and-restoration/heal.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const heal: Spell = {
	name: 'Heal',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Restoration,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Heal Target',
			description:
				'Make a DC 10 Spell Check. Success: You heal the target creature within range for 3 HP. Success (each 5): + 1 HP. Critical Success: +2 HP. Failure: Only heal for 2 HP. If you’re touching the target of this Spell when you cast it, they regain an extra 1 HP.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Quick Heal',
			description: 'You reduce the AP cost of this Spell by 1.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Bolster',
			description:
				'You increase the HP regained by 3. You can take this enhancement multiple times.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/holy-and-restoration/index.ts
````typescript
import { sacredBolt } from './sacred-bolt';
import { guidance } from './guidance';
import { light } from './light';
import { guidingBolt } from './guiding-bolt';
import { bless } from './bless';
import { heal } from './heal';
import { shieldOfFaith } from './shield-of-faith';

export const holyAndRestorationSpells = [
	sacredBolt,
	guidance,
	light,
	guidingBolt,
	bless,
	heal,
	shieldOfFaith
];
````

## File: src/lib/rulesdata/spells-data/spells/holy-and-restoration/light.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const light: Spell = {
	name: 'Light',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Conjuration,
	isCantrip: true,
	cost: { ap: 1 },
	range: 'Touch',
	duration: '1 hour',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Shed Light',
			description:
				'You touch an object that’s no larger than Medium. Until the spell ends, the object sheds Bright Light in a 5 Space radius. You choose the color of the light. Completely covering the object with something opaque blocks the light. The Spell ends if you cast it again or dismiss it as a Free Action. If you target an object held or worn by a hostile creature, make an Attack Check contested by the target’s Agility Save. Success: You cast Light on the object.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Blinding Light',
			description:
				'You make a Spell Check contested by a Physical Save from all targets within 2 Spaces of the Light source. Failure: The target is Blinded for 1 Round.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/holy-and-restoration/sacred-bolt.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const sacredBolt: Spell = {
	name: 'Sacred Bolt',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Divine],
	availableClasses: [ClassName.Cleric],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Radiant damage.'
		},
		{
			title: 'Sacred Glow',
			description:
				'A beam of Bright Light illuminates a creature that you can see within range, or you can make a creature within range glow with a subtle Dim Light for 10 minutes.'
		}
	],
	cantripPassive: 'You deal +1 Radiant damage against Undead and Exposed creatures.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Radiant damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Holy Bolt',
			description:
				'The target makes a Mental Save. Failure: Target becomes Exposed (Attack Checks against it have ADV) against the next Attack Check made against it before the end of your next turn.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/holy-and-restoration/shield-of-faith.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const shieldOfFaith: Spell = {
	name: 'Shield of Faith',
	premadeList: PremadeSpellList.HolyAndRestoration,
	school: SpellSchool.Protection,
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '10 Spaces',
	duration: '10 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Protective Field',
			description:
				'A shimmering field appears and surrounds a creature of your choice within range. Make a DC 10 Spell Check. Success: The target gains +2 PD for the duration. Success (each 10): +1 PD. Failure: The target gains 1 PD instead.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Targets',
			description: 'You increase the number of creatures you can affect by 1.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/ice-and-illusions/catapult.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const catapult: Spell = {
	name: 'Catapult',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Launch Object',
			description:
				'Choose one object weighing 1 to 5 pounds within range that isn’t being worn or carried. The object flies in a straight line up to 15 Spaces in a direction you choose before falling to the ground, stopping early if it impacts against a solid surface. If you attempt to strike a creature, make a Spell Check against the target’s PD. Hit: 3 Bludgeoning damage.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Damage', description: 'You deal +2 Bludgeoning damage.' }
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/ice-and-illusions/frost-bolt.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const frostBolt: Spell = {
	name: 'Frost Bolt',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [ClassName.Wizard, ClassName.Sorcerer],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Cold damage.'
		},
		{
			title: 'Ice Orb',
			description:
				'A flurry of ice appears in your hand. The ice can remain there for 10 minutes and harms neither you nor your equipment, cooling the area within 5 Spaces. The Spell ends early if you dismiss it for free, if you cast it again, or spend 1 AP to make a Spell Attack with it.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Slowed.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Cold damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Slow',
			description:
				'The target makes a Physical Save. Failure: Target becomes Slowed until the end of your next turn.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/ice-and-illusions/ice-knife.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const iceKnife: Spell = {
	name: 'Ice Knife',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Ice Shard',
			description:
				'You create a shard of ice and fling it at one creature within range. Make a Spell Check against the target’s PD. Hit: The target takes 2 Cold damage and then the ice explodes. Compare the Spell Check to the AD of each creature within 1 space of the original target (including the target). Hit: Deal 1 Cold damage. Miss: The spell doesn’t explode and only deals half damage to the original target.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: 'You increase the damage of the initial hit and the explosion by 1 each.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/ice-and-illusions/index.ts
````typescript
import { frostBolt } from './frost-bolt';
import { minorIllusion } from './minor-illusion';
import { mageHand } from './mage-hand';
import { catapult } from './catapult';
import { magicMissile } from './magic-missile';
import { iceKnife } from './ice-knife';
import { silentImage } from './silent-image';

export const iceAndIllusionsSpells = [
	frostBolt,
	minorIllusion,
	mageHand,
	catapult,
	magicMissile,
	iceKnife,
	silentImage
];
````

## File: src/lib/rulesdata/spells-data/spells/ice-and-illusions/mage-hand.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const mageHand: Spell = {
	name: 'Mage Hand',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Conjuration,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Spectral Hand',
			description:
				'A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as a Free Action. The hand vanishes if it ever moves outside of the Spell’s range or if you cast this Spell again. When you cast the Spell, and by spending 1 AP while the Spell is active, you can control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a container. You can move the hand up to 5 Spaces each time you use it, but it must stay within range. The hand can’t Attack, activate magic items, or carry more than 10 pounds.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Range Hand', description: 'The range increases to 20 Spaces.' },
		{ type: 'MP', cost: 1, name: 'Lasting Hand', description: 'The duration increases to 1 hour.' }
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/ice-and-illusions/magic-missile.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const magicMissile: Spell = {
	name: 'Magic Missile',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Glowing Darts',
			description:
				'You attempt to fire out glowing darts of magical force. Make a DC 10 Spell Check. Success: You create 2 Missiles. Success (each 5): +1 Missile. Failure: Only 1 Missile. Each Missile automatically deals 1 True damage to its target. Each missile may have the same or different targets.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Damage', description: '+1 Missile.' },
		{ type: 'MP', cost: 1, name: 'Range', description: 'You increase the range to 15 Spaces.' }
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/ice-and-illusions/minor-illusion.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const minorIllusion: Spell = {
	name: 'Minor Illusion',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Illusion,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Create Sound or Image',
			description:
				'You create a sound or an image of an object within range that lasts for the duration. The illusion ends if you dismiss it for 1 AP or cast this Spell again. If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else’s voice, a lion’s roar, a beating of drums, or any other sound you choose. The sound can continue unabated throughout the duration or you can make discrete sounds at different times before the Spell ends. If you create an image of an object—such as a chair, muddy footprints, or a small chest—it must be no larger than 1 Space. The image can’t create sound, light, smell, or any other sensory effect. Discerning the Illusion: If the illusion is an image, any physical interaction with the image reveals it to be an illusion as things pass through it. A creature can spend 1 AP to examine the sound or image to attempt to determine if the illusion is real, by making an Investigation Check against your Save DC. Success: The creature discerns that the objects or sounds made by the Spell are illusions. If the illusion is an image, the illusion becomes transparent to the creature.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Sight and Sound',
			description: 'The illusion can include both a sound and an image.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/ice-and-illusions/silent-image.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const silentImage: Spell = {
	name: 'Silent Image',
	premadeList: PremadeSpellList.IceAndIllusions,
	school: SpellSchool.Illusion,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: '10 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Create Image',
			description:
				'You create the image of an object, a creature, or some other visible phenomenon in a 3 Space cube. The image appears at a spot within range and lasts for the duration. The image is purely visual and isn’t accompanied by sound, smell, or other sensory effects. You can spend 1 AP to cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural. Discerning the Illusion: Physical interaction with the image reveals it to be an illusion. Alternatively, a creature can spend 1 AP to examine the image to attempt to determine if the illusion is real. The creature makes an Investigation Check against your Save DC. Success: The creature discerns the illusion for what it is, revealing it to be false and making the illusion transparent to the creature.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Sound and Smell',
			description: 'You can add sounds and a smell to the illusion.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/index.ts
````typescript
import { fireAndFlamesSpells } from './fire-and-flames';
import { iceAndIllusionsSpells } from './ice-and-illusions';
import { lightningAndTeleportationSpells } from './lightning-and-teleportation';
import { psychicAndEnchantmentSpells } from './psychic-and-enchantment';
import { holyAndRestorationSpells } from './holy-and-restoration';
import { specialClassSpells } from './special-class-spells';
import { fiendbornAncestrySpells } from './fiendborn-ancestry-spells';
import { additionalSpells } from './additional-spells';

export * from './fire-and-flames';
export * from './ice-and-illusions';
export * from './lightning-and-teleportation';
export * from './psychic-and-enchantment';
export * from './holy-and-restoration';
export * from './special-class-spells';
export * from './fiendborn-ancestry-spells';
export * from './additional-spells';

export const allSpells = [
	...fireAndFlamesSpells,
	...iceAndIllusionsSpells,
	...lightningAndTeleportationSpells,
	...psychicAndEnchantmentSpells,
	...holyAndRestorationSpells,
	...specialClassSpells,
	...fiendbornAncestrySpells,
	...additionalSpells
];
````

## File: src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/crackling-lightning.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const cracklingLightning: Spell = {
	name: 'Crackling Lightning',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: 'Self (10 Spaces)',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Area of Effect',
			description:
				'Crackling lightning forms around you. Choose a type of area: Line, Cone, or Sphere. You are the Spell’s Point of Origin. Line: The Spell affects every target in a 1 Space wide and 10 Space long line. Cone: The Spell creates a 3 Space long Cone. Sphere: The Spell affects every target in a 2 Space radius. Make a Spell Check against every target’s AD within the Spell’s area. Hit: The target takes 2 Lightning damage.'
		}
	],
	enhancements: [
		{
			type: 'AP',
			cost: 1,
			name: 'Frazzled',
			description:
				'Each target makes a Mental Save. Failure: The target becomes Dazed for 1 minute.'
		},
		{
			type: 'MP',
			cost: 1,
			name: 'Range',
			description:
				'The Point of Origin of the Spell becomes a point of your choice within 15 Spaces (instead of Self).'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/gust.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const gust: Spell = {
	name: 'Gust',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '5 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Push Creature',
			description:
				'Choose a Medium or smaller creature and make a Spell Check contested by their Might Save. Success: Target is pushed 1 Space in a direction of your choice. Success (each 5): +1 Space.'
		},
		{
			title: 'Push Object',
			description:
				'Choose an object that’s neither held nor carried and that weighs no more than 5 pounds. Make a DC 10 Spell Check. Success: The object is pushed up to 3 Spaces away from you. Success (each 5): +1 Space. Failure: Only 2 Spaces.'
		},
		{
			title: 'Sensory Effect',
			description:
				'You create a harmless sensory effect using air, such as causing leaves to rustle, wind to slam shutters closed, or your clothing to ripple as in a breeze.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Wind Tunnel',
			description:
				'You create a 10 Space long and 2 Space wide Line that lasts 1 minute and requires the Sustain Action. The start of the Wind Tunnel must be within 5 Spaces of you. You choose the direction the Line goes in and what direction the wind is blowing. Creatures in the Wind Tunnel are Slowed 1 moving against the wind, but can move 2 Spaces for every 1 Space spent moving the same direction as the wind. Any creature that starts their turn in the Wind Tunnel must make a Might Save or be pushed 4 Spaces in the direction of the wind. You can spend 1 AP to reverse the direction of the wind in the tunnel.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/index.ts
````typescript
import { lightningBolt } from './lightning-bolt';
import { lightningBlade } from './lightning-blade';
import { shockingGrasp } from './shocking-grasp';
import { gust } from './gust';
import { returningShock } from './returning-shock';
import { mistyStep } from './misty-step';
import { cracklingLightning } from './crackling-lightning';

export const lightningAndTeleportationSpells = [
	lightningBolt,
	lightningBlade,
	shockingGrasp,
	gust,
	returningShock,
	mistyStep,
	cracklingLightning
];
````

## File: src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/lightning-blade.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const lightningBlade: Spell = {
	name: 'Lightning Blade',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: 'Self (1 Space radius)',
	duration: '1 round',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Imbue Weapon',
			description:
				'You imbue a Melee Weapon you’re wielding with crackling energy. The next Attack Check that hits with this weapon sheathes the target in booming energy. If the target leaves, or is moved from, the current Space they’re in, they automatically take 2 Lightning damage and the Spell ends. This effect can be stacked multiple times from the same or different sources.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Damage',
			description: 'You increase the Lightning damage dealt by 2.'
		},
		{ type: 'MP', cost: 1, name: 'Duration', description: 'You increase the duration to 1 minute.' }
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/lightning-bolt.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const lightningBolt: Spell = {
	name: 'Lightning Bolt',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane, SpellList.Primal],
	availableClasses: [ClassName.Wizard, ClassName.Sorcerer],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Lightning damage.'
		},
		{
			title: 'Lightning Orb',
			description:
				'Crackling lightning appears between both of your hands. The electric energy can remain there for 10 minutes and harms neither you nor your equipment. The energy sheds Bright Light in a 10 Space radius. The Spell ends early if you dismiss it for free, if you cast it again, stop using both hands, or spend 1 AP to make a Spell Attack with it.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are wearing metal armor.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Lightning damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Chain',
			description:
				'Choose 1 additional target within 2 Spaces of the original target. Compare your Spell Check against the new target’s PD. Hit: The additional target takes 2 Lightning damage and is unaffected by features that allow you to deal more damage, including Heavy Hits and higher (except the Cantrip Passive). You can use this Enhancement multiple times, choosing an additional target within 2 Spaces of the previously chosen target.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/misty-step.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const mistyStep: Spell = {
	name: 'Misty Step',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Astromancy,
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: 'Self',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Teleport',
			description:
				'You are briefly surrounded by a silvery mist and attempt to teleport to a new location. Make a DC 20 Spell Check. Success: You teleport up to 5 Spaces to an unoccupied Space that you can see. Success (each 5): +2 Spaces. Failure: Only 3 Spaces.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Far Step',
			description: 'You increase the distance you can teleport by 4 Spaces.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/returning-shock.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const returningShock: Spell = {
	name: 'Returning Shock',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '15 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Shock on Damage',
			description:
				'Trigger: You are damaged by a creature within range. Reaction: Make a Spell Check against the target’s PD. Hit: 3 Lightning damage.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Chain',
			description:
				'You can choose 1 additional target within 2 Spaces of the original target. Compare you Spell Check against the new target’s PD. Hit: The additional target takes 3 Lightning damage, and is unaffected by features that allow you to deal more damage, including Heavy Hits and higher. You can use this Enhancement multiple times, choosing an additional target within 2 Spaces of the previously chosen target.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/lightning-and-teleportation/shocking-grasp.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const shockingGrasp: Spell = {
	name: 'Shocking Grasp',
	premadeList: PremadeSpellList.LightningAndTeleportation,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '1 Space',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Shock',
			description:
				'Lightning springs from your hand to shock a creature within range. Make a Spell Check against the target’s PD, and you have ADV if they’re wearing armor made of metal. The target must make a Physical Save. Hit: 1 Lightning damage. Failed Save: Target can’t spend AP until the start of its next turn.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Lightning Lure',
			description:
				'The damage increases by 1 and the range becomes 5 Spaces. Additionally, if the target fails their Save you can pull them up to 3 spaces toward you.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/bane.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const bane: Spell = {
	name: 'Bane',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '5 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Curse',
			description:
				'Choose 3 creatures that you can see within range. Make a Spell Check contested by their Mental Save. Failure: The target must roll a d4 and subtract the number from each Attack Check or Save they make until the Spell ends.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Targets',
			description: 'You increase the number of targets by 1.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Dread',
			description: 'Targets subtract a d6 instead of a d4 from their Attack Checks and Saves.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/befriend.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const befriend: Spell = {
	name: 'Befriend',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: '1 min (Sustained)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Charm Creature',
			description:
				'You attempt to Charm a creature within range. Choose a non-hostile creature that can see and hear you and make a Spell Check contested by the target’s Charisma Save. Success: The creature is Charmed by you for the duration or until it takes damage. When the Spell effect ends or you fail the Check, the creature realizes that you used magic to influence its mood and may become hostile toward you.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Hostile Charm',
			description: 'You can target even hostile creatures with the Spell.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'Clear Suspicion',
			description: 'The target doesn’t realize that magic was used on them when the Spell ends.'
		},
		{
			type: 'MP',
			cost: 2,
			name: 'More Friends',
			description: 'You can target an additional creature and increase the range by 10 Spaces.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/command.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const command: Spell = {
	name: 'Command',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: '1 Round',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Issue Command',
			description:
				'You speak a command to a creature that you can see within range that can hear you. You don’t have to see the creature if you’ve seen them within the last minute. Make a Spell Check contested by the target’s Charisma Save. Success: The creature immediately spends 2 AP to follow the command given, regardless of its usual AP cost. The creature can’t spend any resources (AP, SP, or MP) to modify the Action it takes. Ignoring a Command: The Spell has no effect if the target doesn’t understand your language, if it’s unable to follow your command, or if your command is directly harmful to itself. Choosing a Command: You can choose from the list of example commands below or improvise your own at the GM’s discretion. Move: The target moves up to its Speed to a location (or in a direction) of your choice. Prone: The target falls Prone. Drop: The target drops anything it’s holding. Attack: The target makes 1 Attack Check or Spell Check (your choice) that normally costs 1 AP. You choose the target of the Attack, which must be within the commanded creature’s range.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Duration', description: 'You increase the duration by 1 Round.' },
		{ type: 'MP', cost: 2, name: 'Targets', description: 'You can add 1 additional target.' }
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/index.ts
````typescript
import { psiBolt } from './psi-bolt';
import { message } from './message';
import { befriend } from './befriend';
import { psychicFear } from './psychic-fear';
import { bane } from './bane';
import { command } from './command';
import { sleep } from './sleep';

export const psychicAndEnchantmentSpells = [
	psiBolt,
	message,
	befriend,
	psychicFear,
	bane,
	command,
	sleep
];
````

## File: src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/message.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const message: Spell = {
	name: 'Message',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Divination,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: '1 Round (each way)',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Whisper Message',
			description:
				'You point your finger toward a creature you can see within range and verbally whisper a message. The target hears the message in their head and they can reply back with a whisper that you can hear in your head. If you’re familiar with a creature, but you can’t see them or you know they’re beyond a wall or barrier, you can still target them with this Spell but the range is reduced by half.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Range', description: 'You increase the range to 30 Spaces.' }
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/psi-bolt.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const psiBolt: Spell = {
	name: 'Psi Bolt',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Destruction,
	isCantrip: true,
	cost: { ap: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [SpellList.Arcane],
	availableClasses: [ClassName.Wizard, ClassName.Sorcerer],
	effects: [
		{
			title: 'Spell Attack',
			description:
				'You can make a Spell Check against the PD of a target within range. Hit: The target takes 2 Psychic damage.'
		},
		{
			title: 'Headache',
			description:
				'You tear into the mind of a creature you can see within range and give them a mild headache for 1 minute.'
		}
	],
	cantripPassive: 'You deal +1 damage against creatures that are Dazed.',
	enhancements: [
		{ type: 'AP', cost: 1, name: 'Damage', description: 'You deal +1 Psychic damage.' },
		{ type: 'AP', cost: 1, name: 'Range', description: 'You increase the range by 5 Spaces.' },
		{
			type: 'AP',
			cost: 1,
			name: 'Dazed',
			description:
				'The target makes a Mental Save. Failure: Target becomes Dazed (DisADV on Mental Checks) on the next Mental Check it makes before the end of your next turn.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/psychic-fear.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const psychicFear: Spell = {
	name: 'Psychic Fear',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '10 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Discordant Melody',
			description:
				'You whisper a discordant melody, only audible to your target, to a creature of your choice within range that you can see and that can hear you, wracking it with terrible pain. Make a Spell Check against the target’s AD while it makes an Intelligence Save. Hit: The target takes 2 Psychic damage. Save Failure: If it has any AP, the target spends 1 AP to move as far as its Speed allows away from you. The creature doesn’t move into obviously dangerous ground, such as a fire or a pit.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Loud Whispers',
			description:
				'On a failed Save, the target to uses an additional 1 AP (if available) to move an additional number of Spaces away from you equal to its Speed.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/psychic-and-enchantment/sleep.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const sleep: Spell = {
	name: 'Sleep',
	premadeList: PremadeSpellList.PsychicAndEnchantment,
	school: SpellSchool.Enchantment,
	isCantrip: false,
	cost: { ap: 2, mp: 1 },
	range: '15 Spaces',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Magical Slumber',
			description:
				'You attempt to force creatures within 4 Spaces of a point you choose within range to fall into a magical slumber. Make a DC 10 Spell Check. Success: This Spell can effect 10 HP worth of creatures. Success (each 5): +2 HP. Failure: 5 HP. Starting with the creature with the lowest current HP, each creature affected by this Spell falls Unconscious. Subtract each creature’s HP from the total before moving on to the creature with the next lowest current HP. A creature’s HP must be equal to or less than the remaining total for that creature to be affected. The sleep lasts until the Spell ends or another creature within 1 Space spends 1 AP to shake or slap the sleeping creature awake. Undead and creatures that don’t sleep aren’t affected by this spell.'
		}
	],
	enhancements: [
		{ type: 'MP', cost: 1, name: 'Slumber', description: 'You increase the HP affected by 10.' }
	]
};
````

## File: src/lib/rulesdata/spells-data/spells/special-class-spells/index.ts
````typescript
import { sorcery } from './sorcery';

export const specialClassSpells = [sorcery];
````

## File: src/lib/rulesdata/spells-data/spells/special-class-spells/sorcery.ts
````typescript
import {
	Spell,
	SpellSchool,
	SpellList,
	PremadeSpellList
} from '../../types/spell.types';

export const sorcery: Spell = {
	name: 'Sorcery',
	premadeList: PremadeSpellList.SpecialClass,
	school: SpellSchool.Transmutation,
	isCantrip: true,
	cost: { ap: 1 },
	range: '1 Space',
	duration: '1 min',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [ClassName.Sorcerer],
	effects: [
		{
			title: 'Minor Wonder',
			description:
				'You manifest a minor wonder (Divine), a sign of supernatural power (Primal), or arcane prowess (Arcane) depending on which Spell List you have access to. When you gain this Spell, choose from the following types of energy: Fire, Water, Lightning, Earth, Holy, Unholy, or Arcane (which manifests as energy of a specific color). This chosen type will be the form this Spell’s energy takes. You create one of the following magical effects of your chosen energy type within range and can dismiss it by spending 1 AP: Your voice booms up to 3 times louder than normal. You summon harmless magic of your chosen energy type to swirl around you in a visual display. Your eyes glow with your chosen energy type.'
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Multiple Effects',
			description: 'You can have up to all 3 of the effects going at once.'
		}
	]
};
````

## File: src/lib/rulesdata/spells-data/types/spell.types.ts
````typescript
// ./spells-data/types/spell.types.ts

/**
 * @file spell.types.ts
 * @description This file contains the definitive TypeScript schemas and enumerations
 * for modeling all spells in the DC20 system.
 */

export enum SpellSchool {
	Astromancy = 'Astromancy',
	Conjuration = 'Conjuration',
	Destruction = 'Destruction',
	Divination = 'Divination',
	Enchantment = 'Enchantment',
	Illusion = 'Illusion',
	Protection = 'Protection',
	Restoration = 'Restoration',
	Transmutation = 'Transmutation',
	Abjuration = 'Abjuration'
}

export enum SpellList {
	Arcane = 'Arcane',
	Primal = 'Primal',
	Divine = 'Divine'
}

export enum ClassName {
	Wizard = 'Wizard',
	Sorcerer = 'Sorcerer',
	Cleric = 'Cleric',
	Druid = 'Druid'
}

export enum PremadeSpellList {
	FireAndFlames = 'Fire & Flames List',
	IceAndIllusions = 'Ice & Illusions List',
	LightningAndTeleportation = 'Lightning & Teleportation List',
	PsychicAndEnchantment = 'Psychic & Enchantment List',
	HolyAndRestoration = 'Holy & Restoration List',
	SpecialClass = 'Special Class Feature Spells',
	FiendbornAncestry = 'Fiendborn Ancestry Trait Spells',
	Additional = 'Additional Spells'
}

export interface SpellCost {
	ap: number;
	mp?: number;
}

export interface SpellEffect {
	title: string;
	description: string;
}

export interface SpellEnhancement {
	type: 'AP' | 'MP';
	cost: number;
	name: string;
	description: string;
}

export interface Spell {
	name: string;
	premadeList: PremadeSpellList;
	school: SpellSchool;
	isCantrip: boolean;
	isRitual?: boolean;
	cost: SpellCost;
	range: string;
	duration: string;
	spellLists: SpellList[];
	availableClasses: ClassName[];
	effects: SpellEffect[];
	cantripPassive?: string;
	enhancements: SpellEnhancement[];
}
````

## File: src/lib/rulesdata/techniques.ts
````typescript
/**
 * @file techniques.ts
 * @description Contains the schemas and a complete list of all Martial Techniques
 * from the DC20 Beta 0.9.5 rulebook (pages 51-53).
 */

//==============================================================================
// SCHEMAS / TYPES
//==============================================================================

/**
 * Represents the resource cost of a technique or its enhancement.
 */
export interface MartialAbilityCost {
	ap?: number;
	sp?: number;
}

/**
 * The blueprint for a Technique's optional enhancement.
 */
export interface TechniqueEnhancement {
	name: string;
	cost: {
		ap?: number;
		sp: number;
	};
	description: string;
}

/**
 * The definitive blueprint for a single Technique object.
 */
export interface Technique {
	name: string;
	cost: MartialAbilityCost;
	description: string;
	isReaction: boolean;
	trigger?: string;
	requirement?: string;
	enhancements: TechniqueEnhancement[];
}

//==============================================================================
// TECHNIQUE DATA
//==============================================================================

/**
 * A comprehensive list of all martial techniques available in the game.
 */
export const techniques: Technique[] = [
	{
		name: 'Forbearance',
		cost: { ap: 1, sp: 1 },
		isReaction: true,
		trigger: 'When a creature you can see within 1 Space is targeted by an Attack.',
		description:
			'You become the new target of the Check, and choose to switch places with the original target (if it’s willing). If the Check is accompanied by a Save, you make the Save instead of the original target.',
		enhancements: [
			{
				name: 'Steadfast Forbearance',
				cost: { sp: 1 },
				description:
					'If multiple creatures within 1 Space of you are targeted by the same Check, you can attempt to protect them as well. You can spend 1 SP per additional target to become the new target of its Check as well. You take the collective damage of all protected creatures against the Check.'
			},
			{
				name: 'Immense Defense',
				cost: { sp: 2 },
				description: 'You gain Resistance (Half) against all damage taken using this Technique.'
			}
		]
	},
	{
		name: 'Heroic Bash',
		cost: { ap: 1, sp: 1 },
		isReaction: false,
		requirement: 'Melee Weapon or Unarmed Strike',
		description:
			"Using a Melee Weapon (or Unarmed Strike) you can attempt to send an enemy hurling through the air. Make an Attack Check against the PD of a target within 1 Space of you, and it makes a Physical Save against your Save DC. Attack Hit: It takes your Weapon's (or Unarmed Strike) damage. Save Failure: It gets knockback horizontally up to 3 Spaces + 1 additional Space for every 5 it fails the Save by.",
		enhancements: [
			{
				name: 'Extended Knockback',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to increase the Knockback distance by 2 Spaces and increase the damage by 1.'
			},
			{
				name: 'Painful Knockback',
				cost: { sp: 1 },
				description: 'You can spend 1 SP to increase the damage by 2.'
			},
			{
				name: 'Bash & Smash',
				cost: { ap: 1, sp: 1 },
				description:
					'You can spend an additional 1 AP and 1 SP to change the Target from one creature to every creature’s PD within 1 Space.'
			}
		]
	},
	{
		name: 'Heroic Leap',
		cost: { ap: 1, sp: 1 },
		isReaction: false,
		requirement: 'Melee Weapon or Unarmed Strike',
		description:
			'You perform an exceptional leap and assault a creature. You gain up to your Speed in Spaces and increase your Jump Distance by 1 on the next Long or Vertical Jump you make. You leap into the air and make an Attack Check against the PD of a target within 1 Space of where you land, and it makes a Physical Save against your Save DC. Attack Hit: It takes your Weapon (or Unarmed Strike) damage. Save Failure: The target falls Prone.',
		enhancements: [
			{
				name: 'Brutal Leap',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to transfer all of the Falling damage you would usually take into the target instead.'
			},
			{
				name: 'Far Leap',
				cost: { sp: 1 },
				description: 'You can spend 1 SP to increase your damage by 1 and your Jump Distance by 2.'
			},
			{
				name: 'Heroic Slam',
				cost: { ap: 1, sp: 1 },
				description:
					'You can spend 1 AP and 1 SP to compare your Attack Check against the AD of all creatures within 1 Space of where you land (instead of a single target).'
			}
		]
	},
	{
		name: 'Heroic Parry',
		cost: { ap: 1, sp: 1 },
		isReaction: true,
		trigger:
			'You or a creature you can see within 1 Space are targeted by an Attack against its PD.',
		description: 'You grant the target a +5 bonus to its PD until the start of its next turn.',
		enhancements: [
			{
				name: 'Heroic Disengage',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to allow the target to Disengage and move up to half its Speed after the Attack.'
			}
		]
	},
	{
		name: 'Heroic Taunt',
		cost: { ap: 1, sp: 1 },
		isReaction: false,
		description:
			'You attempt to Taunt all enemies within 5 Spaces. Make an Attack Check or Intimidation Check (your choice) contested by each target’s Mental Save. Contest Success: Each creature you beat is Taunted (DisADV on Attack and Spell Checks against creatures other than you) by you until the end of your next turn.',
		enhancements: [
			{
				name: 'Legendary Taunt',
				cost: { sp: 2 },
				description:
					'You can spend 2 SP to have any damage dealt by Taunted enemies to be halved against any creatures other than you.'
			}
		]
	},
	{
		name: 'Slip Away',
		cost: { ap: 1, sp: 1 },
		isReaction: true,
		trigger: 'A Creature misses you with an Attack.',
		description: 'You take the Full Dodge Action and move up to your Speed.',
		enhancements: [
			{
				name: 'Diving Attack',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to make an Attack Check against a creature within 1 Space of you as part of Slip Away (you make this attack before the creature makes theirs).'
			}
		]
	},
	{
		name: 'Sunder Armor',
		cost: { ap: 1, sp: 1 },
		isReaction: false,
		description:
			'You make a Martial Attack against a creature’s PD. Hit: Until the start of your next turn, the target gains Vulnerability (1) to a damage type dealt by the Attack.',
		enhancements: []
	},
	{
		name: 'Tumble and Dive',
		cost: { ap: 2, sp: 1 },
		isReaction: true,
		trigger: 'You are the target of an Attack.',
		description:
			'You move up to your Speed and avoid the attack entirely as long as you end your movement outside the range or behind Full Cover of the Attack. Additional Opportunity Attacks are still able to be made against you.',
		enhancements: [
			{
				name: 'Heroic Dive',
				cost: { sp: 2 },
				description:
					'You can spend 2 SP to bring a willing creature within 1 Space along with you as part of Tumble and Dive. They move the same amount of Spaces as you and must also end their movement within 1 Space of you.'
			}
		]
	},
	{
		name: 'Volley',
		cost: { ap: 2, sp: 1 },
		isReaction: false,
		requirement: 'Ranged Weapon',
		description:
			'You launch a volley of projectiles. Choose a point within your Weapon’s range. Make a single Attack Check and compare it against the AD of all creatures of your choice within 1 Space of the chosen point. Attack Hit: You deal 2 damage of the Weapon’s type to each creature.',
		enhancements: [
			{
				name: 'Impairing Volley',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to cause each creature within the area to make a Physical Save against your Save DC. Failure: They’re Impaired (DisADV on Physical Checks) until the end of your next turn.'
			},
			{
				name: 'Blanket of Arrows',
				cost: { sp: 1 },
				description: 'You can spend 1 SP to increase the area to 3 Spaces from the chosen point.'
			},
			{
				name: 'Line of Arrows',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to also target each creature occupying a Space in a Line between you and the chosen point.'
			}
		]
	},
	{
		name: 'Whirlwind',
		cost: { ap: 2, sp: 1 },
		isReaction: false,
		requirement: 'Melee Weapon or Unarmed Strike',
		description:
			'You make a single Attack Check against the AD of all creatures of your choice within 1 Space of you. Attack Hit: You deal your Weapon (or Unarmed Strike) damage to each creature.',
		enhancements: [
			{
				name: 'Blood Whirl',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to force each creature targeted to make a Physical Save against your Save DC. Failure: They begin Bleeding.'
			},
			{
				name: 'Wide Swing',
				cost: { sp: 1 },
				description:
					'You can spend 1 SP to increase the range of Whirlwind by 1 Space, targeting each creature of your choice within 2 Spaces of you.'
			},
			{
				name: 'Throwing Finisher',
				cost: { sp: 1 },
				description:
					'If you’re wielding a Melee Weapon, you can choose to spend an extra 1 SP at the end of the Whirlwind to throw the Weapon at a target within 5 Spaces. Use the same single Attack Check against this target as well. The weapon lands within 1 Space of the target (GM discretion).'
			}
		]
	}
];

/** A simple alias for the main techniques array. */
export const allTechniques = techniques;
````

## File: src/lib/server/auth.ts
````typescript
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: table.Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await db.insert(table.session).values(session);
	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const [result] = await db
		.select({
			// Adjust user table here to tweak returned data
			user: { id: table.user.id, username: table.user.username },
			session: table.session
		})
		.from(table.session)
		.innerJoin(table.user, eq(table.session.userId, table.user.id))
		.where(eq(table.session.id, sessionId));

	if (!result) {
		return { session: null, user: null };
	}
	const { session, user } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.session).where(eq(table.session.id, session.id));
		return { session: null, user: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(table.session)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.session.id, session.id));
	}

	return { session, user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(table.session).where(eq(table.session.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}
````

## File: src/routes/character-sheet/components/Attacks.tsx
````typescript
import React from 'react';
import type { AttackData, CharacterSheetData } from '../../../types';
import {
	WeaponData,
	weaponsData,
	getHeavyHitDamage,
	getBrutalHitDamage,
	getWeaponAttackBonus
} from '../../../lib/rulesdata/weapons';
import {
	StyledAttacksSection,
	StyledAttacksHeader,
	StyledAttacksTitle,
	StyledAddWeaponButton,
	StyledAttacksContainer,
	StyledAttacksHeaderRow,
	StyledHeaderColumn,
	StyledEmptyState,
	StyledAttackRow,
	StyledRemoveButton,
	StyledWeaponSelect,
	StyledDamageCell,
	StyledInfoIcon,
	StyledDamageTypeCell
} from '../styles/Attacks';

export interface AttacksProps {
	attacks: AttackData[];
	setAttacks: React.Dispatch<React.SetStateAction<AttackData[]>>;
	characterData: CharacterSheetData;
}

const Attacks: React.FC<AttacksProps> = ({ attacks, setAttacks, characterData }) => {
	const addWeaponSlot = () => {
		const newAttack: AttackData = {
			id: `attack_${Date.now()}`,
			weaponId: '',
			name: '',
			attackBonus: 0,
			damage: '',
			damageType: 'slashing',
			critRange: '20',
			critDamage: '',
			brutalDamage: '',
			heavyHitEffect: ''
		};
		setAttacks((prev) => [...prev, newAttack]);
	};

	const removeWeaponSlot = (attackIndex: number) => {
		setAttacks((prev) => prev.filter((_, index) => index !== attackIndex));
	};

	const handleWeaponSelect = (attackIndex: number, weaponId: string) => {
		const weapon = weaponsData.find((w: any) => w.id === weaponId);
		if (!weapon) return;

		const newAttackData = calculateAttackData(weapon);

		setAttacks((prev) =>
			prev.map((attack, index) =>
				index === attackIndex ? { ...newAttackData, id: attack.id } : attack
			)
		);
	};

	const calculateAttackData = (weapon: WeaponData): AttackData => {
		if (!characterData) {
			return {
				id: '',
				weaponId: weapon.id,
				name: weapon.name,
				attackBonus: 0,
				damage: '',
				damageType: weapon.damageType,
				critRange: '',
				critDamage: '',
				brutalDamage: '',
				heavyHitEffect: ''
			};
		}

		const mightMod = Math.floor((characterData.finalMight - 10) / 2);
		const agilityMod = Math.floor((characterData.finalAgility - 10) / 2);

		const attackBonus = getWeaponAttackBonus(
			weapon,
			characterData.finalCombatMastery,
			mightMod,
			agilityMod
		);
		const damageString = weapon.versatileDamage
			? `${weapon.damage}(${weapon.versatileDamage})`
			: weapon.damage.toString();
		const critRange = '20'; // Default crit range
		const critDamage = '';
		const brutalDamage = '';
		const heavyHitEffect = weapon.properties.includes('Impact') ? 'Prone/Push' : '';

		return {
			id: '',
			weaponId: weapon.id,
			name: weapon.name,
			attackBonus,
			damage: damageString,
			damageType: weapon.damageType,
			critRange,
			critDamage,
			brutalDamage,
			heavyHitEffect
		};
	};

	const getDamageCalculationTooltip = (weapon: WeaponData): string => {
		if (!characterData) return '';

		const mightMod = Math.floor((characterData.finalMight - 10) / 2);
		const agilityMod = Math.floor((characterData.finalAgility - 10) / 2);
		const baseDamage = weapon.versatileDamage || weapon.damage;
		const hasImpact = weapon.properties.includes('Impact');

		let tooltip = `DC20 Damage Calculation:\n\n`;
		tooltip += `Base Damage: ${baseDamage}${weapon.versatileDamage ? ` (${weapon.damage} one-handed, ${weapon.versatileDamage} two-handed)` : ''}\n`;

		const attributeName = weapon.type === 'ranged' ? 'Agility' : 'Might';
		const attributeValue = weapon.type === 'ranged' ? agilityMod : mightMod;

		if (attributeValue > 0) {
			tooltip += `+ ${attributeName} Modifier: +${attributeValue}\n`;
		}

		tooltip += `\nHit Results:\n`;
		tooltip += `• Hit: ${baseDamage}${attributeValue > 0 ? ` + ${attributeValue} = ${baseDamage + attributeValue}` : ''} damage\n`;

		// Heavy Hit calculation with Impact
		const heavyDamage = getHeavyHitDamage(weapon);
		tooltip += `• Heavy Hit (+5 over Defense): ${heavyDamage}${attributeValue > 0 ? ` + ${attributeValue} = ${heavyDamage + attributeValue}` : ''} damage`;
		if (hasImpact) {
			tooltip += ` (base ${baseDamage} + 1 heavy + 1 impact)`;
		} else {
			tooltip += ` (base ${baseDamage} + 1 heavy)`;
		}
		tooltip += `\n`;

		if (hasImpact) {
			tooltip += `  └─ Impact: Target must make Might Save or be knocked Prone and pushed 5 feet\n`;
		}

		// Brutal Hit calculation with Impact
		const brutalDamage = getBrutalHitDamage(weapon);
		tooltip += `• Brutal Hit (+10 over Defense): ${brutalDamage}${attributeValue > 0 ? ` + ${attributeValue} = ${brutalDamage + attributeValue}` : ''} damage`;
		if (hasImpact) {
			tooltip += ` (base ${baseDamage} + 2 brutal + 1 impact)`;
		} else {
			tooltip += ` (base ${baseDamage} + 2 brutal)`;
		}
		tooltip += `\n`;

		if (weapon.properties.length > 0) {
			tooltip += `\nWeapon Properties: ${weapon.properties.join(', ')}`;
		}

		if (weapon.specialNotes) {
			tooltip += `\nSpecial: ${weapon.specialNotes}`;
		}

		return tooltip;
	};

	return (
		<StyledAttacksSection>
			<StyledAttacksHeader>
				<StyledAttacksTitle>ATTACKS</StyledAttacksTitle>
				<StyledAddWeaponButton onClick={addWeaponSlot}>+ Add Weapon</StyledAddWeaponButton>
			</StyledAttacksHeader>

			<StyledAttacksContainer>
				<StyledAttacksHeaderRow>
					<span></span> {/* Empty column for remove button */}
					<StyledHeaderColumn>Weapon</StyledHeaderColumn>
					<StyledHeaderColumn align="center">
						Base
						<br />
						Dmg
					</StyledHeaderColumn>
					<StyledHeaderColumn align="center">
						Heavy
						<br />
						Dmg
					</StyledHeaderColumn>
					<StyledHeaderColumn align="center">
						Brutal
						<br />
						Dmg
					</StyledHeaderColumn>
					<StyledHeaderColumn align="center">Type</StyledHeaderColumn>
					<StyledHeaderColumn align="center">
						<StyledInfoIcon title="Damage calculation info">i</StyledInfoIcon>
					</StyledHeaderColumn>
				</StyledAttacksHeaderRow>

				{attacks.length === 0 ? (
					<StyledEmptyState>
						No weapons added. Click "Add Weapon" to add your first weapon.
					</StyledEmptyState>
				) : (
					attacks.map((attack, index) => {
						const weapon = attack.weaponId
							? weaponsData.find((w: any) => w.id === attack.weaponId)
							: null;

						return (
							<StyledAttackRow key={attack.id}>
								{/* Remove Button */}
								<StyledRemoveButton onClick={() => removeWeaponSlot(index)} title="Remove weapon">
									×
								</StyledRemoveButton>

								{/* Weapon Selection */}
								<StyledWeaponSelect
									value={attack.weaponId}
									onChange={(e: any) => handleWeaponSelect(index, e.target.value)}
								>
									<option value="">Select Weapon...</option>
									{weaponsData.map((weapon: any) => (
										<option key={weapon.id} value={weapon.id}>
											{weapon.name} ({weapon.weightCategory})
										</option>
									))}
								</StyledWeaponSelect>

								{/* Base Damage */}
								<StyledDamageCell
									title={
										weapon
											? `Base weapon damage: ${weapon.damage}${weapon.versatileDamage ? ` (${weapon.versatileDamage} when two-handed)` : ''}`
											: ''
									}
								>
									{weapon
										? weapon.versatileDamage
											? `${weapon.damage}(${weapon.versatileDamage})`
											: weapon.damage
										: '-'}
								</StyledDamageCell>

								{/* Heavy Damage */}
								<StyledDamageCell
									color="#d2691e"
									title={
										weapon
											? weapon.properties.includes('Impact')
												? `Heavy Hit: ${getHeavyHitDamage(weapon)} damage (base ${weapon.versatileDamage || weapon.damage} + 1 heavy + 1 impact) + Target must make Might Save or be knocked Prone and pushed 5 feet`
												: `Heavy Hit: ${getHeavyHitDamage(weapon)} damage (base ${weapon.versatileDamage || weapon.damage} + 1 heavy)`
											: ''
									}
								>
									{weapon ? (
										<>
											{getHeavyHitDamage(weapon)}
											{weapon.properties.includes('Impact') && (
												<div style={{ fontSize: '0.6rem' }}>+Prone/Push</div>
											)}
										</>
									) : (
										'-'
									)}
								</StyledDamageCell>

								{/* Brutal Damage */}
								<StyledDamageCell
									color="#dc143c"
									title={
										weapon
											? weapon.properties.includes('Impact')
												? `Brutal Hit: ${getBrutalHitDamage(weapon)} damage (base ${weapon.versatileDamage || weapon.damage} + 2 brutal + 1 impact)`
												: `Brutal Hit: ${getBrutalHitDamage(weapon)} damage (base ${weapon.versatileDamage || weapon.damage} + 2 brutal)`
											: ''
									}
								>
									{weapon ? getBrutalHitDamage(weapon) : '-'}
								</StyledDamageCell>

								{/* Damage Type */}
								<StyledDamageTypeCell title={weapon ? `${weapon.damageType} damage` : ''}>
									{weapon
										? weapon.damageType === 'slashing'
											? 'S'
											: weapon.damageType === 'piercing'
												? 'P'
												: weapon.damageType === 'bludgeoning'
													? 'B'
													: 'X'
										: '-'}
								</StyledDamageTypeCell>

								{/* Damage Calculation Info */}
								<div style={{ textAlign: 'center', fontSize: '1.1rem' }}>
									{weapon ? (
										<StyledInfoIcon title={getDamageCalculationTooltip(weapon)}>i</StyledInfoIcon>
									) : (
										'-'
									)}
								</div>
							</StyledAttackRow>
						);
					})
				)}
			</StyledAttacksContainer>
		</StyledAttacksSection>
	);
};

export default Attacks;
````

## File: src/routes/character-sheet/components/AttributesSections.tsx
````typescript
import React from 'react';
import type { SkillData, TradeData, LanguageData, CharacterSheetData } from '../../../types';
import {
	StyledAttributesSectionsContainer,
	StyledPrimeSection,
	StyledPrimeBox,
	StyledPrimeLabel,
	StyledPrimeValue,
	StyledSkillRow,
	StyledSkillName,
	StyledAttributeSection,
	StyledAttributeHeader,
	StyledAttributeBox,
	StyledAttributeAbbr,
	StyledAttributeValue,
	StyledAttributeInfo,
	StyledAttributeName,
	StyledAttributeSave,
	StyledAttributeSkillRow,
	StyledKnowledgeTradesSection,
	StyledSectionTitle,
	StyledSectionSubtitle,
	StyledLanguageRow,
	StyledLanguageName,
	StyledFluencyControls,
	StyledFluencyBox,
	StyledFluencyLabel,
	StyledNoItemsMessage
} from '../styles/AttributesSections.styles';
import { StyledProficiencyDots, StyledDot } from '../styles/Skills';

interface SkillsByAttribute {
	prime: SkillData[];
	might: SkillData[];
	agility: SkillData[];
	charisma: SkillData[];
	intelligence: SkillData[];
}

interface AttributesSectionsProps {
	characterData: CharacterSheetData;
	skillsByAttribute: SkillsByAttribute;
	knowledge: TradeData[];
	trades: TradeData[];
	languages: LanguageData[];
}

const AttributesSections: React.FC<AttributesSectionsProps> = ({
	characterData,
	skillsByAttribute,
	knowledge,
	trades,
	languages
}) => {
	return (
		<StyledAttributesSectionsContainer>
			{/* Prime Modifier & Awareness */}
			<StyledPrimeSection>
				<StyledPrimeBox>
					<StyledPrimeLabel>Prime</StyledPrimeLabel>
					<StyledPrimeValue>
						{characterData.finalPrimeModifierAttribute} +{characterData.finalPrimeModifierValue}
					</StyledPrimeValue>
				</StyledPrimeBox>

				{/* Awareness (Prime skill) */}
				{skillsByAttribute.prime.map((skill) => (
					<StyledSkillRow key={skill.id}>
						<StyledSkillName>{skill.name.toUpperCase()}</StyledSkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= skill.proficiency} />
							))}
						</StyledProficiencyDots>
					</StyledSkillRow>
				))}
			</StyledPrimeSection>

			{/* Might Section */}
			<StyledAttributeSection>
				<StyledAttributeHeader>
					<StyledAttributeBox>
						<StyledAttributeAbbr>MIG</StyledAttributeAbbr>
						<StyledAttributeValue>{characterData.finalMight}</StyledAttributeValue>
					</StyledAttributeBox>
					<StyledAttributeInfo>
						<StyledAttributeName>MIGHT</StyledAttributeName>
						<StyledAttributeSave>SAVE +{characterData.finalSaveMight}</StyledAttributeSave>
					</StyledAttributeInfo>
				</StyledAttributeHeader>

				{/* Might Skills */}
				{skillsByAttribute.might.map((skill) => (
					<StyledAttributeSkillRow key={skill.id}>
						<StyledSkillName>{skill.name.toUpperCase()}</StyledSkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= skill.proficiency} />
							))}
						</StyledProficiencyDots>
					</StyledAttributeSkillRow>
				))}
			</StyledAttributeSection>

			{/* Agility Section */}
			<StyledAttributeSection>
				<StyledAttributeHeader>
					<StyledAttributeBox>
						<StyledAttributeAbbr>AGI</StyledAttributeAbbr>
						<StyledAttributeValue>{characterData.finalAgility}</StyledAttributeValue>
					</StyledAttributeBox>
					<StyledAttributeInfo>
						<StyledAttributeName>AGILITY</StyledAttributeName>
						<StyledAttributeSave>SAVE +{characterData.finalSaveAgility}</StyledAttributeSave>
					</StyledAttributeInfo>
				</StyledAttributeHeader>

				{/* Agility Skills */}
				{skillsByAttribute.agility.map((skill) => (
					<StyledAttributeSkillRow key={skill.id}>
						<StyledSkillName>{skill.name.toUpperCase()}</StyledSkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= skill.proficiency} />
							))}
						</StyledProficiencyDots>
					</StyledAttributeSkillRow>
				))}
			</StyledAttributeSection>

			{/* Charisma Section */}
			<StyledAttributeSection>
				<StyledAttributeHeader>
					<StyledAttributeBox>
						<StyledAttributeAbbr>CHA</StyledAttributeAbbr>
						<StyledAttributeValue>{characterData.finalCharisma}</StyledAttributeValue>
					</StyledAttributeBox>
					<StyledAttributeInfo>
						<StyledAttributeName>CHARISMA</StyledAttributeName>
						<StyledAttributeSave>SAVE +{characterData.finalSaveCharisma}</StyledAttributeSave>
					</StyledAttributeInfo>
				</StyledAttributeHeader>

				{/* Charisma Skills */}
				{skillsByAttribute.charisma.map((skill) => (
					<StyledAttributeSkillRow key={skill.id}>
						<StyledSkillName>{skill.name.toUpperCase()}</StyledSkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= skill.proficiency} />
							))}
						</StyledProficiencyDots>
					</StyledAttributeSkillRow>
				))}
			</StyledAttributeSection>

			{/* Intelligence Section */}
			<StyledAttributeSection>
				<StyledAttributeHeader>
					<StyledAttributeBox>
						<StyledAttributeAbbr>INT</StyledAttributeAbbr>
						<StyledAttributeValue>{characterData.finalIntelligence}</StyledAttributeValue>
					</StyledAttributeBox>
					<StyledAttributeInfo>
						<StyledAttributeName>INTELLIGENCE</StyledAttributeName>
						<StyledAttributeSave>SAVE +{characterData.finalSaveIntelligence}</StyledAttributeSave>
					</StyledAttributeInfo>
				</StyledAttributeHeader>

				{/* Intelligence Skills */}
				{skillsByAttribute.intelligence.map((skill) => (
					<StyledAttributeSkillRow key={skill.id}>
						<StyledSkillName>{skill.name.toUpperCase()}</StyledSkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= skill.proficiency} />
							))}
						</StyledProficiencyDots>
					</StyledAttributeSkillRow>
				))}
			</StyledAttributeSection>

			{/* Knowledge Section */}
			<StyledKnowledgeTradesSection>
				<StyledSectionTitle>KNOWLEDGE</StyledSectionTitle>
				<StyledSectionSubtitle>Intelligence-based knowledge trades</StyledSectionSubtitle>
				{knowledge.map((knowledgeItem) => (
					<StyledAttributeSkillRow key={knowledgeItem.id}>
						<StyledSkillName>{knowledgeItem.name.toUpperCase()}</StyledSkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= knowledgeItem.proficiency} />
							))}
						</StyledProficiencyDots>
					</StyledAttributeSkillRow>
				))}
			</StyledKnowledgeTradesSection>

			{/* Trades Section */}
			<StyledKnowledgeTradesSection>
				<StyledSectionTitle>TRADES</StyledSectionTitle>
				<StyledSectionSubtitle>Selected practical trades & crafts</StyledSectionSubtitle>
				{trades.length > 0 ? (
					trades.map((trade) => (
						<StyledAttributeSkillRow key={trade.id}>
							<StyledSkillName>{trade.name.toUpperCase()}</StyledSkillName>
							<StyledProficiencyDots>
								{[1, 2, 3, 4, 5].map((level) => (
									<StyledDot key={level} filled={level <= trade.proficiency} />
								))}
							</StyledProficiencyDots>
						</StyledAttributeSkillRow>
					))
				) : (
					<StyledNoItemsMessage>No trades selected</StyledNoItemsMessage>
				)}
			</StyledKnowledgeTradesSection>

			{/* Languages Section */}
			<StyledKnowledgeTradesSection>
				<StyledSectionTitle>LANGUAGES</StyledSectionTitle>
				<StyledSectionSubtitle>
					LANGUAGE CHECK = d20 + Intelligence or Charisma
				</StyledSectionSubtitle>
				{languages.map((language) => (
					<StyledLanguageRow key={language.id}>
						<StyledLanguageName>{language.name.toUpperCase()}</StyledLanguageName>
						<StyledFluencyControls>
							<StyledFluencyBox active={language.fluency === 'limited'} />
							<StyledFluencyLabel>LIMITED</StyledFluencyLabel>
							<StyledFluencyBox active={language.fluency === 'fluent'} />
							<StyledFluencyLabel>FLUENT</StyledFluencyLabel>
						</StyledFluencyControls>
					</StyledLanguageRow>
				))}
			</StyledKnowledgeTradesSection>
		</StyledAttributesSectionsContainer>
	);
};

export default AttributesSections;
````

## File: src/routes/character-sheet/components/Combat.tsx
````typescript
import React from 'react';
import type { CharacterSheetData, CurrentValues } from '../../../types';
import {
	StyledCombatSection,
	StyledActionPoints,
	StyledActionPoint
} from '../styles/Combat';

export interface CombatProps {
	characterData: CharacterSheetData;
	currentValues: CurrentValues;
	setCurrentValues: React.Dispatch<React.SetStateAction<CurrentValues>>;
}

const Combat: React.FC<CombatProps> = ({ characterData, currentValues, setCurrentValues }) => {
	const renderActionPoints = () => {
		return [0, 1, 2, 3].map((index) => (
			<StyledActionPoint
				key={index}
				used={index < currentValues.actionPointsUsed}
				onClick={() => {
					const newUsed = index < currentValues.actionPointsUsed ? index : index + 1;
					setCurrentValues((prev) => ({ ...prev, actionPointsUsed: newUsed }));
				}}
			>
				{index + 1}
			</StyledActionPoint>
		));
	};

	return (
		<StyledCombatSection>
			<div
				style={{
					fontSize: '1.1rem',
					fontWeight: 'bold',
					color: '#8b4513',
					textAlign: 'center',
					marginBottom: '1rem'
				}}
			>
				COMBAT
			</div>

			{/* Action Points */}
			<div style={{ textAlign: 'center', marginBottom: '1rem' }}>
				<div
					style={{
						fontSize: '0.9rem',
						fontWeight: 'bold',
						color: '#8b4513',
						marginBottom: '0.5rem'
					}}
				>
					ACTION POINTS
				</div>
				<StyledActionPoints>{renderActionPoints()}</StyledActionPoints>
			</div>

			{/* Combat Stats */}
			<div style={{ fontSize: '0.9rem', color: '#8b4513' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '0.3rem',
						borderBottom: '1px solid #e5e5e5'
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
						<span>ATTACK / SPELL CHECK</span>
						<span
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: '14px',
								height: '14px',
								borderRadius: '50%',
								backgroundColor: '#8b4513',
								color: 'white',
								fontSize: '10px',
								fontWeight: 'bold',
								cursor: 'help',
								verticalAlign: 'middle'
							}}
							title={`Combat Mastery (${characterData.finalCombatMastery}) + ${characterData.finalPrimeModifierAttribute} Modifier (${characterData.finalPrimeModifierValue}) = +${characterData.finalCombatMastery + characterData.finalPrimeModifierValue}`}
						>
							i
						</span>
					</div>
					<span style={{ fontWeight: 'bold' }}>
						+{characterData.finalCombatMastery + characterData.finalPrimeModifierValue}
					</span>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '0.3rem',
						borderBottom: '1px solid #e5e5e5'
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
						<span>SAVE DC</span>
						<span
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: '14px',
								height: '14px',
								borderRadius: '50%',
								backgroundColor: '#8b4513',
								color: 'white',
								fontSize: '10px',
								fontWeight: 'bold',
								cursor: 'help',
								verticalAlign: 'middle'
							}}
							title={`10 + Combat Mastery (${characterData.finalCombatMastery}) + ${characterData.finalPrimeModifierAttribute} Modifier (${characterData.finalPrimeModifierValue}) = ${characterData.finalSaveDC}`}
						>
							i
						</span>
					</div>
					<span style={{ fontWeight: 'bold' }}>{characterData.finalSaveDC}</span>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '0.3rem'
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
						<span>MARTIAL CHECK</span>
						<span
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: '14px',
								height: '14px',
								borderRadius: '50%',
								backgroundColor: '#8b4513',
								color: 'white',
								fontSize: '10px',
								fontWeight: 'bold',
								cursor: 'help',
								verticalAlign: 'middle'
							}}
							title={`Attack/Spell Check (${characterData.finalCombatMastery + characterData.finalPrimeModifierValue}) + Action Points Bonus (${Math.floor(currentValues.actionPointsUsed / 3)}) = +${characterData.finalCombatMastery + characterData.finalPrimeModifierValue + Math.floor(currentValues.actionPointsUsed / 3)}`}
						>
							i
						</span>
					</div>
					<span style={{ fontWeight: 'bold' }}>
						+
						{characterData.finalCombatMastery +
							characterData.finalPrimeModifierValue +
							Math.floor(currentValues.actionPointsUsed / 3)}
					</span>
				</div>
			</div>
		</StyledCombatSection>
	);
};

export default Combat;
````

## File: src/routes/character-sheet/components/DeathExhaustion.tsx
````typescript
import React from 'react';
import type { CharacterSheetData, CurrentValues } from '../../../types';
import {
	StyledDeathExhaustionContainer,
	StyledExhaustionOnlyContainer,
	StyledExhaustionOnlyTitle
} from '../styles/DeathExhaustion.styles';

import {
	StyledDeathContainer,
	StyledDeathTitle,
	StyledHealthStatus,
	StyledDeathThreshold,
	StyledDeathStepsContainer,
	StyledDeathStepsTitle,
	StyledDeathStepsGrid,
	StyledDeathStep,
	StyledDeathStepTooltip,
	StyledHealthStatusTooltip
} from '../styles/Death';

import {
	StyledExhaustionContainer,
	StyledExhaustionLevel,
	StyledExhaustionTooltip
} from '../styles/Exhaustion';

import { getHealthStatus, calculateDeathThreshold, getDeathSteps } from '../../../lib/rulesdata/death';

interface DeathExhaustionProps {
	characterData: CharacterSheetData;
	currentValues: CurrentValues;
	onExhaustionChange: (level: number) => void;
	onDeathStepChange: (step: number) => void;
}

const DeathExhaustion: React.FC<DeathExhaustionProps> = ({
	characterData,
	currentValues,
	onExhaustionChange,
	onDeathStepChange
}) => {
	// Exhaustion level descriptions (based on DC20 rules)
	const exhaustionLevels = [
		{ level: 1, description: 'Fatigued: -1 to all Checks and Saves' },
		{ level: 2, description: 'Exhausted: -2 to all Checks and Saves' },
		{ level: 3, description: 'Debilitated: -3 to all Checks and Saves, Speed halved' },
		{ level: 4, description: 'Incapacitated: -4 to all Checks and Saves, Speed quartered' },
		{ level: 5, description: 'Unconscious: Helpless, cannot take actions' }
	];

	return (
		<StyledDeathExhaustionContainer>
			<StyledDeathContainer>
				<StyledDeathTitle>DEATH & HEALTH STATUS</StyledDeathTitle>

				{/* Health Status */}
				{(() => {
					const deathThreshold = calculateDeathThreshold(
						characterData.finalPrimeModifierValue,
						characterData.finalCombatMastery
					);
					const healthStatus = getHealthStatus(
						currentValues.currentHP,
						characterData.finalHPMax,
						deathThreshold
					);
					const deathSteps = getDeathSteps(currentValues.currentHP, deathThreshold);

					return (
						<>
							<StyledHealthStatusTooltip data-tooltip={healthStatus.effects.join('\n')}>
								<StyledHealthStatus status={healthStatus.status}>
									{healthStatus.description.toUpperCase()}
								</StyledHealthStatus>
							</StyledHealthStatusTooltip>

							<div style={{ fontSize: '0.8rem', color: '#8b4513', marginBottom: '0.3rem' }}>
								DEATH THRESHOLD
							</div>
							<StyledDeathThreshold>{deathThreshold}</StyledDeathThreshold>

							{/* Death Steps - only show when on Death's Door */}
							{healthStatus.status === 'deaths-door' && (
								<StyledDeathStepsContainer>
									<StyledDeathStepsTitle>
										DEATH STEPS ({deathSteps.currentStep}/{deathSteps.maxSteps})
									</StyledDeathStepsTitle>
									<StyledDeathStepsGrid>
										{Array.from({ length: deathSteps.maxSteps }, (_, index) => {
											const step = index + 1;
											const isFilled = step <= deathSteps.currentStep;
											const isDead = deathSteps.isDead && step === deathSteps.maxSteps;

											return (
												<StyledDeathStep
													key={step}
													filled={isFilled}
													isDead={isDead}
													onClick={() => onDeathStepChange(step)}
												>
													{!isDead && step}
													<StyledDeathStepTooltip>
														{isDead ? 'Dead' : `${step} HP below 0`}
													</StyledDeathStepTooltip>
												</StyledDeathStep>
											);
										})}
									</StyledDeathStepsGrid>
								</StyledDeathStepsContainer>
							)}
						</>
					);
				})()}
			</StyledDeathContainer>

			<StyledExhaustionOnlyContainer>
				<StyledExhaustionOnlyTitle>EXHAUSTION</StyledExhaustionOnlyTitle>
				<StyledExhaustionContainer>
					{exhaustionLevels.map(({ level, description }) => (
						<StyledExhaustionLevel
							key={level}
							filled={level <= currentValues.exhaustionLevel}
							onClick={() => onExhaustionChange(level)}
						>
							{level}
							<StyledExhaustionTooltip>{description}</StyledExhaustionTooltip>
						</StyledExhaustionLevel>
					))}
				</StyledExhaustionContainer>
			</StyledExhaustionOnlyContainer>
		</StyledDeathExhaustionContainer>
	);
};

export default DeathExhaustion;
````

## File: src/routes/character-sheet/components/Features.tsx
````typescript
import React from 'react';
import type { FeatureData } from '../../../types';
import {
	StyledFeaturesContainer,
	StyledFeaturesTitle,
	StyledFeatureCategory,
	StyledFeatureCategoryTitle,
	StyledFeatureGrid,
	StyledFeatureItem,
	StyledFeatureName,
	StyledFeatureReadMore,
	StyledNoFeaturesMessage,
	StyledFeaturesContent
} from '../styles/Features.styles';

interface FeaturesProps {
	features: FeatureData[];
	onFeatureClick: (feature: FeatureData) => void;
}

const Features: React.FC<FeaturesProps> = ({ features, onFeatureClick }) => {
	// Organize features by source
	const ancestryFeatures = features.filter((f) => f.source === 'ancestry');
	const classFeatures = features.filter((f) => f.source === 'class');
	const choiceFeatures = features.filter((f) => f.source === 'choice');

	return (
		<StyledFeaturesContainer>
			<StyledFeaturesTitle>FEATURES</StyledFeaturesTitle>

			<StyledFeaturesContent>
				{/* Ancestry Traits */}
				{ancestryFeatures.length > 0 && (
					<StyledFeatureCategory>
						<StyledFeatureCategoryTitle>Ancestry Traits</StyledFeatureCategoryTitle>
						<StyledFeatureGrid>
							{ancestryFeatures.map((feature) => (
								<StyledFeatureItem key={feature.id}>
									<StyledFeatureName>{feature.name}</StyledFeatureName>
									<StyledFeatureReadMore onClick={() => onFeatureClick(feature)}>
										Info
									</StyledFeatureReadMore>
								</StyledFeatureItem>
							))}
						</StyledFeatureGrid>
					</StyledFeatureCategory>
				)}

				{/* Class Features */}
				{classFeatures.length > 0 && (
					<StyledFeatureCategory>
						<StyledFeatureCategoryTitle>Class Features</StyledFeatureCategoryTitle>
						<StyledFeatureGrid>
							{classFeatures.map((feature) => (
								<StyledFeatureItem key={feature.id}>
									<StyledFeatureName>{feature.name}</StyledFeatureName>
									<StyledFeatureReadMore onClick={() => onFeatureClick(feature)}>
										Info
									</StyledFeatureReadMore>
								</StyledFeatureItem>
							))}
						</StyledFeatureGrid>
					</StyledFeatureCategory>
				)}

				{/* Feature Choices */}
				{choiceFeatures.length > 0 && (
					<StyledFeatureCategory>
						<StyledFeatureCategoryTitle>Selected Features</StyledFeatureCategoryTitle>
						<StyledFeatureGrid>
							{choiceFeatures.map((feature) => (
								<StyledFeatureItem key={feature.id}>
									<StyledFeatureName>{feature.name}</StyledFeatureName>
									<StyledFeatureReadMore onClick={() => onFeatureClick(feature)}>
										Info
									</StyledFeatureReadMore>
								</StyledFeatureItem>
							))}
						</StyledFeatureGrid>
					</StyledFeatureCategory>
				)}

				{/* No features message */}
				{features.length === 0 && (
					<StyledNoFeaturesMessage>No features available</StyledNoFeaturesMessage>
				)}
			</StyledFeaturesContent>
		</StyledFeaturesContainer>
	);
};

export default Features;
````

## File: src/routes/character-sheet/components/Inventory.tsx
````typescript
import React from 'react';
import type { InventoryItemData } from '../../../types';
import { allItems, type InventoryItem } from '../../../lib/rulesdata/inventoryItems';
import {
	StyledInventorySection,
	StyledInventoryTitle,
	StyledAddItemButton,
	StyledInventoryContainer,
	StyledInventoryHeaderRow,
	StyledInventoryHeaderColumn,
	StyledInventoryRow,
	StyledRemoveItemButton,
	StyledInventorySelect,
	StyledInventoryInput,
	StyledInventoryInfoIcon,
	StyledInventoryCost,
	StyledEmptyInventory
} from '../styles/Inventory';

export interface InventoryProps {
	inventory: InventoryItemData[];
	setInventory: React.Dispatch<React.SetStateAction<InventoryItemData[]>>;
}

const Inventory: React.FC<InventoryProps> = ({ inventory, setInventory }) => {
	const addInventorySlot = () => {
		const newInventoryItem: InventoryItemData = {
			id: `inventory_${Date.now()}`,
			itemType: '',
			itemName: '',
			count: 1,
			cost: '-'
		};
		setInventory((prev) => [...prev, newInventoryItem]);
	};

	const removeInventorySlot = (inventoryIndex: number) => {
		setInventory((prev) => prev.filter((_, index) => index !== inventoryIndex));
	};

	const handleInventoryItemSelect = (
		inventoryIndex: number,
		itemTypeOrName: string,
		isItemName: boolean = false
	) => {
		if (!isItemName) {
			// Selecting item type
			const itemType = itemTypeOrName as InventoryItemData['itemType'];
			setInventory((prev) =>
				prev.map((item, index) =>
					index === inventoryIndex ? { ...item, itemType, itemName: '', cost: '-' } : item
				)
			);
		} else {
			// Selecting item name
			const selectedItem = allItems.find((i: any) => i.name === itemTypeOrName);
			setInventory((prev) =>
				prev.map((item, index) =>
					index === inventoryIndex
						? {
								...item,
								itemName: itemTypeOrName,
								itemType: selectedItem?.itemType || item.itemType,
								cost: getItemCost(selectedItem)
							}
						: item
				)
			);
		}
	};

	const handleInventoryCountChange = (inventoryIndex: number, count: number) => {
		setInventory((prev) =>
			prev.map((item, index) =>
				index === inventoryIndex ? { ...item, count: Math.max(1, count) } : item
			)
		);
	};

	const getItemCost = (item: InventoryItem | undefined | null, count: number = 1): string => {
		if (!item || !('price' in item)) return '-';

		let basePrice = 0;
		let currency = 'g';

		if (typeof item.price === 'string') {
			// Parse string prices like "10g", "5s", etc.
			const match = item.price.match(/(\d+)([gs]?)/);
			if (match) {
				basePrice = parseInt(match[1]);
				currency = match[2] || 'g';
			}
		} else if (typeof item.price === 'number') {
			basePrice = item.price;
		}

		if (basePrice === 0) return '-';

		const totalPrice = basePrice * count;
		return `${totalPrice}${currency}`;
	};

	const getItemExtraInfo = (item: any): string => {
		if (!item) return 'No item selected';

		if (item.itemType === 'Weapon') {
			const parts = [];
			parts.push(`DAMAGE: ${item.damage || 'N/A'}`);
			if (item.versatileDamage) {
				parts.push(`VERSATILE: ${item.versatileDamage} (two-handed)`);
			}
			parts.push(`TYPE: ${item.type || 'N/A'}`);
			parts.push(`DAMAGE TYPE: ${item.damageType || 'N/A'}`);
			if (item.properties && item.properties.length > 0) {
				parts.push(`PROPERTIES: ${item.properties.join(', ')}`);
			}
			if (item.range) {
				parts.push(`RANGE: ${item.range}`);
			}
			if (item.weightCategory) {
				parts.push(`WEIGHT: ${item.weightCategory}`);
			}
			if (item.cost !== undefined) {
				parts.push(`VALUE: ${item.cost} coins`);
			}
			return parts.join('\n');
		} else if (item.itemType === 'Armor') {
			const parts = [];
			const pdBonus = item.pdBonus || 0;
			const adBonus = item.adBonus || 0;
			const speedPenalty = item.speedPenalty || 0;

			parts.push(`ARMOR CLASS: PD+${pdBonus}, AD+${adBonus}`);
			if (speedPenalty !== 0) {
				parts.push(`SPEED PENALTY: ${speedPenalty} feet`);
			}
			if (item.type) {
				parts.push(`TYPE: ${item.type}`);
			}
			if (item.properties && item.properties.length > 0) {
				parts.push(`PROPERTIES: ${item.properties.join(', ')}`);
			}
			if (item.cost !== undefined) {
				parts.push(`VALUE: ${item.cost} coins`);
			}
			if (item.description) {
				parts.push(`DESCRIPTION: ${item.description}`);
			}
			return parts.join('\n');
		} else if (item.itemType === 'Shield') {
			const parts = [];
			const pdBonus = item.pdBonus || 0;
			const adBonus = item.adBonus || 0;
			const speedPenalty = item.speedPenalty || 0;

			parts.push(`DEFENSE BONUS: PD+${pdBonus}, AD+${adBonus}`);
			if (speedPenalty !== 0) {
				parts.push(`SPEED PENALTY: ${speedPenalty} feet`);
			}
			if (item.type) {
				parts.push(`TYPE: ${item.type}`);
			}
			if (item.properties && item.properties.length > 0) {
				parts.push(`PROPERTIES: ${item.properties.join(', ')}`);
			}
			if (item.cost !== undefined) {
				parts.push(`VALUE: ${item.cost} coins`);
			}
			if (item.description) {
				parts.push(`DESCRIPTION: ${item.description}`);
			}
			return parts.join('\n');
		} else if (item.itemType === 'Potion') {
			const parts = [];
			parts.push(`HEALING: ${item.healing || 'N/A'}`);
			parts.push(`LEVEL: ${item.level || 1}`);
			if (item.cost !== undefined) {
				parts.push(`VALUE: ${item.cost} coins`);
			}
			if (item.description) {
				parts.push(`EFFECT: ${item.description}`);
			} else {
				parts.push(`EFFECT: Restores ${item.healing || 'N/A'} hit points when consumed`);
			}
			return parts.join('\n');
		} else if (item.itemType === 'Adventuring Supply') {
			const parts = [];
			if (item.description) {
				parts.push(`DESCRIPTION: ${item.description}`);
			}
			if (item.cost !== undefined) {
				parts.push(`VALUE: ${item.cost} coins`);
			}
			if (item.properties && item.properties.length > 0) {
				parts.push(`PROPERTIES: ${item.properties.join(', ')}`);
			}
			return parts.length > 0 ? parts.join('\n') : 'Standard adventuring equipment';
		}

		return 'Item information not available';
	};

	const createCustomTooltip = (e: React.MouseEvent<HTMLSpanElement>, content: string) => {
		const tooltip = document.createElement('div');
		tooltip.innerText = content;
		tooltip.style.cssText = `
			position: absolute;
			background: #333;
			color: white;
			padding: 8px 12px;
			border-radius: 4px;
			font-size: 12px;
			white-space: pre-line;
			z-index: 1000;
			max-width: 300px;
			pointer-events: none;
		`;
		document.body.appendChild(tooltip);

		const updatePosition = () => {
			const rect = e.currentTarget.getBoundingClientRect();
			tooltip.style.left = `${rect.left + window.scrollX}px`;
			tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
		};
		updatePosition();

		// Store tooltip reference on the element
		(e.currentTarget as HTMLElement & { _customTooltip?: HTMLDivElement })._customTooltip = tooltip;
	};	const removeCustomTooltip = (e: React.MouseEvent<HTMLSpanElement>) => {
		const element = e.currentTarget as HTMLElement & { _customTooltip?: HTMLDivElement };
		const tooltip = element._customTooltip;
		if (tooltip && tooltip.parentNode) {
			tooltip.parentNode.removeChild(tooltip);
		}
		element._customTooltip = undefined;
	};

	return (
		<StyledInventorySection>
			<StyledInventoryTitle>INVENTORY</StyledInventoryTitle>

			{/* Add Item Button */}
			<StyledAddItemButton onClick={addInventorySlot}>+ Add Item</StyledAddItemButton>

			<StyledInventoryContainer>
				<StyledInventoryHeaderRow>
					<span></span> {/* Empty column for remove button */}
					<StyledInventoryHeaderColumn>Type</StyledInventoryHeaderColumn>
					<StyledInventoryHeaderColumn>Item</StyledInventoryHeaderColumn>
					<StyledInventoryHeaderColumn align="center">Count</StyledInventoryHeaderColumn>
					<StyledInventoryHeaderColumn align="center">
						<StyledInventoryInfoIcon title="Item information">i</StyledInventoryInfoIcon>
					</StyledInventoryHeaderColumn>
					<StyledInventoryHeaderColumn align="center">Cost</StyledInventoryHeaderColumn>
				</StyledInventoryHeaderRow>

				{inventory.length === 0 ? (
					<StyledEmptyInventory>
						No items added. Click "Add Item" to add your first item.
					</StyledEmptyInventory>
				) : (
					inventory.map((item, index) => {
						const selectedItem = item.itemName
							? allItems.find((i) => i.name === item.itemName)
							: null;

						return (
							<StyledInventoryRow key={item.id}>
								{/* Remove Button */}
								<StyledRemoveItemButton
									onClick={() => removeInventorySlot(index)}
									title="Remove item"
								>
									×
								</StyledRemoveItemButton>

								{/* Item Type */}
								<StyledInventorySelect
									value={item.itemType}
									onChange={(e) => handleInventoryItemSelect(index, e.target.value, false)}
								>
									<option value="">Select Type</option>
									<option value="Weapon">Weapon</option>
									<option value="Armor">Armor</option>
									<option value="Shield">Shield</option>
									<option value="Adventuring Supply">Adventuring Supply</option>
									<option value="Potion">Healing Potion</option>
								</StyledInventorySelect>

								{/* Item Name */}
								<StyledInventorySelect
									value={item.itemName}
									onChange={(e) => handleInventoryItemSelect(index, e.target.value, true)}
									disabled={!item.itemType}
								>
									<option value="">Select Item</option>
									{item.itemType &&
										allItems
											.filter((i) => i.itemType === item.itemType)
											.map((itemData) => (
												<option key={itemData.name} value={itemData.name}>
													{itemData.name}
												</option>
											))}
								</StyledInventorySelect>

								{/* Count */}
								<StyledInventoryInput
									type="number"
									min="1"
									value={item.count}
									onChange={(e) => handleInventoryCountChange(index, parseInt(e.target.value) || 1)}
								/>

								{/* Info Indicator */}
								<div style={{ textAlign: 'center' }}>
									{selectedItem ? (
										<StyledInventoryInfoIcon
											title={getItemExtraInfo(selectedItem)}
											onMouseEnter={(e) => createCustomTooltip(e, getItemExtraInfo(selectedItem))}
											onMouseLeave={removeCustomTooltip}
										>
											i
										</StyledInventoryInfoIcon>
									) : (
										'-'
									)}
								</div>

								{/* Cost */}
								<StyledInventoryCost>{getItemCost(selectedItem, item.count)}</StyledInventoryCost>
							</StyledInventoryRow>
						);
					})
				)}
			</StyledInventoryContainer>
		</StyledInventorySection>
	);
};

export default Inventory;
````

## File: src/routes/character-sheet/components/RightColumnResources.tsx
````typescript
import React from 'react';
import type { CharacterSheetData, CurrentValues } from '../../../types';
import {
	StyledRightResourcesContainer,
	StyledRightResourcesTitle,
	StyledRightResourceRow,
	StyledRightResourceLabel,
	StyledRightResourceControls,
	StyledRightResourceInput,
	StyledRightResourceMax
} from '../styles/RightColumnResources.styles';

interface RightColumnResourcesProps {
	characterData: CharacterSheetData;
	currentValues: CurrentValues;
	onResourceInputChange: (resource: keyof CurrentValues, value: string) => void;
}

const RightColumnResources: React.FC<RightColumnResourcesProps> = ({
	characterData,
	currentValues,
	onResourceInputChange
}) => {
	return (
		<StyledRightResourcesContainer>
			<StyledRightResourcesTitle>RESOURCES</StyledRightResourcesTitle>

			<StyledRightResourceRow>
				<StyledRightResourceLabel>REST POINTS</StyledRightResourceLabel>
				<StyledRightResourceControls>
					<StyledRightResourceInput
						type="number"
						value={currentValues.currentRestPoints}
						onChange={(e) => onResourceInputChange('currentRestPoints', e.target.value)}
					/>
					<StyledRightResourceMax>/ {characterData.finalRestPoints}</StyledRightResourceMax>
				</StyledRightResourceControls>
			</StyledRightResourceRow>

			<StyledRightResourceRow>
				<StyledRightResourceLabel>GRIT POINTS</StyledRightResourceLabel>
				<StyledRightResourceControls>
					<StyledRightResourceInput
						type="number"
						value={currentValues.currentGritPoints}
						onChange={(e) => onResourceInputChange('currentGritPoints', e.target.value)}
					/>
					<StyledRightResourceMax>/ {characterData.finalGritPoints}</StyledRightResourceMax>
				</StyledRightResourceControls>
			</StyledRightResourceRow>
		</StyledRightResourcesContainer>
	);
};

export default RightColumnResources;
````

## File: src/types/index.ts
````typescript
// Main export file for all types
export * from './character';
````

## File: vitest-setup-client.ts
````typescript
/// <reference types="@vitest/browser/matchers" />
/// <reference types="@vitest/browser/providers/playwright" />
````

## File: vitest.config.ts
````typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					environment: 'browser',
					browser: {
						enabled: true,
						provider: 'playwright',
						instances: [{ browser: 'chromium' }]
					},
					include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}']
				}
			}
		]
	}
});
````

## File: .prettierrc
````
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "none",
	"printWidth": 100,
	"plugins": ["prettier-plugin-tailwindcss"]
}
````

## File: eslint.config.js
````javascript
import prettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	}
);
````

## File: index.html
````html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>DC20 Character Creator</title>
	</head>
	<body>
		<div id="root"></div>
		<script type="module" src="/src/main.tsx"></script>
	</body>
</html>
````

## File: prisma/schema.prisma
````
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-1.1.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Model to store the character creation progress
model CharacterInProgress {
  id                   String @id @default(uuid())
  // Stage A: Attributes
  attribute_might      Int    @default(-2)
  attribute_agility    Int    @default(-2)
  attribute_charisma   Int    @default(-2)
  attribute_intelligence Int  @default(-2)
  pointsSpent          Int    @default(0) // Points spent in point buy
  currentStep          Int    @default(1) // Current stage in the wizard (1 = Stage A, 2 = Stage B, etc.)

  // Core Stats
  level                Int    @default(1)
  combatMastery        Int    @default(1) // Calculated as half level rounded up

  // Stage B: Ancestry
  ancestry1Id          String? // ID of the first ancestry
  ancestry2Id          String? // ID of the second ancestry (for mixed ancestry)
  selectedTraitIds     String // JSON string of selected trait IDs
  ancestryPointsSpent  Int    @default(0) // Points spent on traits

  // Stage C: Class
  classId              String? // ID of the selected class
  selectedFeatureChoices String // JSON string of selected feature choice IDs/values

  // Save Masteries (DC20 p.22 - choose 2 attributes for Save Mastery)
  saveMasteryMight     Boolean @default(false)
  saveMasteryAgility   Boolean @default(false) 
  saveMasteryCharisma  Boolean @default(false)
  saveMasteryIntelligence Boolean @default(false)

  // Stage D: Skills (MVP Scope)
  // Will add skill selection fields here later

  // Stage E: Equipment (MVP Scope)
  // Will add equipment selection fields here later

  // Stage F: Details (MVP Scope)
  finalName            String?
  finalPlayerName      String?

  // Link to the final character sheet data (once creation is complete)
  finalCharacterSheet  CharacterSheetData?

  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}

// Model to store the final calculated character sheet data
model CharacterSheetData {
  id                   String @id @default(uuid())
  characterInProgressId String @unique // Link back to the progress record
  characterInProgress  CharacterInProgress @relation(fields: [characterInProgressId], references: [id])

  // Final Calculated Stats (based on MVP mvp.md Section IV)
  finalName            String
  finalPlayerName      String?
  finalLevel           Int    @default(1)

  finalMight           Int
  finalAgility         Int
  finalCharisma        Int
  finalIntelligence    Int

  finalPrimeModifierValue Int
  finalPrimeModifierAttribute String

  finalCombatMastery   Int    @default(1)

  finalSaveMasteryMight Int
  finalSaveMasterityAgility Int
  finalSaveMasteryCharisma Int
  finalSaveMasteryIntelligence Int

  finalHPMax           Int
  finalSPMax           Int
  finalMPMax           Int

  finalPD              Int
  finalAD              Int

  finalPDR             String?
  finalEDR             String?
  finalMDR             String?

  finalSaveDC          Int
  finalDeathThreshold  Int
  finalMoveSpeed       Int
  finalJumpDistance    Int
  finalRestPoints      Int
  finalGritPoints      Int
  finalInitiativeBonus Int

  skillsJson           String // JSON string of skill data
  tradesJson           String // JSON string of trade data
  languagesJson        String // JSON string of language data

  ancestry1Name        String?
  ancestry2Name        String?
  selectedTraitsJson   String // JSON string of selected traits

  className            String
  classFeaturesLvl1Json String // JSON string of Lvl 1 class features

  equipmentJson        String // JSON string of equipment

  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}
````

## File: repomix.config.json
````json
{
	"input": {
		"maxFileSize": 52428800
	},
	"output": {
		"filePath": "repomix-output.md",
		"style": "markdown",
		"parsableStyle": false,
		"fileSummary": true,
		"directoryStructure": true,
		"files": true,
		"removeComments": false,
		"removeEmptyLines": false,
		"compress": false,
		"topFilesLength": 5,
		"showLineNumbers": false,
		"copyToClipboard": false,
		"git": {
			"sortByChanges": true,
			"sortByChangesMaxCommits": 100
		}
	},
	"include": [],
	"ignore": {
		"useGitignore": true,
		"useDefaultPatterns": true,
		"customPatterns": []
	},
	"security": {
		"enableSecurityCheck": true
	},
	"tokenCount": {
		"encoding": "o200k_base"
	}
}
````

## File: SESSION_CONTEXT.md
````markdown
# DC20 Character Sheet Development Session Context

## Project Overview

- **Repository**: YasafVol/dc20clean
- **Branch**: converting-to-react
- **Main Focus**: React-based DC20 character creation and character sheet system
- **Primary File**: `/src/routes/character-sheet/CharacterSheetClean.tsx`

## Recent Issues Fixed

### 1. Character Creation Background Step Validation Bug

**Problem**: Background step completion validation was using hardcoded values instead of dynamic calculations based on Intelligence modifier and point conversions.

**Location**: `/src/routes/character-creation/CharacterCreation.tsx`

**Solution**: Updated step 3 validation logic to use flexible validation that accounts for:

- Intelligence modifier affecting skill points (5 + Int modifier)
- Point conversion system between skills/trades/languages
- Variable amounts instead of fixed values (5 skill, 5 trade, 3 language)

### 2. PDR (Physical Damage Reduction) Styling Alignment

**Problem**: PDR had square design while PD and MD had shield-like circular design, causing visual inconsistency and alignment issues.

**Location**: `/src/routes/character-sheet/CharacterSheetClean.tsx` (lines ~1390-1430)

**Final Solution Applied**:

```tsx
{
	/* Defenses - Shield-like design */
}
<div
	style={{
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: '1.5rem'
	}}
>
	<div style={{ textAlign: 'center', width: '120px' }}>
		<div
			style={{
				height: '32px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				marginBottom: '0.3rem'
			}}
		>
			<div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>
				PHYSICAL
			</div>
			<div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>
				DEFENSE
			</div>
		</div>
		<div
			style={{
				width: '80px',
				height: '90px',
				border: '3px solid #8b4513',
				borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'white',
				margin: '0 auto'
			}}
		>
			<div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>
				{characterData.finalPD}
			</div>
		</div>
		<div style={{ height: '20px', marginTop: '0.2rem' }}></div>
	</div>

	{/* PDR - Shield-like design */}
	<div style={{ textAlign: 'center', width: '120px' }}>
		<div
			style={{
				height: '32px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				marginBottom: '0.3rem'
			}}
		>
			<div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>
				PHYSICAL
			</div>
			<div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>
				DMG REDUCTION
			</div>
		</div>
		<div
			style={{
				width: '80px',
				height: '90px',
				border: '3px solid #8b4513',
				borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'white',
				margin: '0 auto'
			}}
		>
			<div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>
				{characterData.finalPDR || 0}
			</div>
		</div>
		<div
			style={{
				height: '20px',
				marginTop: '0.2rem',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			{characterData.finalPDR > 0 && (
				<div style={{ fontSize: '0.6rem', color: '#8b4513' }}>Auto-calculated</div>
			)}
		</div>
	</div>

	<div style={{ textAlign: 'center', width: '120px' }}>
		<div
			style={{
				height: '32px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				marginBottom: '0.3rem'
			}}
		>
			<div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>
				MYSTICAL
			</div>
			<div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#8b4513', lineHeight: '1' }}>
				DEFENSE
			</div>
		</div>
		<div
			style={{
				width: '80px',
				height: '90px',
				border: '3px solid #8b4513',
				borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'white',
				margin: '0 auto'
			}}
		>
			<div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>
				{characterData.finalAD}
			</div>
		</div>
		<div style={{ height: '20px', marginTop: '0.2rem' }}></div>
	</div>
</div>;
```

**Key Changes Made**:

- Changed PDR from square (`borderRadius: '8px'`) to shield-like (`borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'`)
- Increased PDR size from 60x60px to 80x90px to match PD and MD
- Consistent 120px width containers for all three sections
- Fixed 32px height for label areas with flexbox centering
- Consistent 20px bottom spacing for all sections
- Font size increased from 1.5rem to 2rem for PDR value
- Changed labels from "PDR" + "Physical Damage Reduction" to "PHYSICAL" + "DMG REDUCTION"
- Added `margin: '0 auto'` to center shields within containers
- Set `lineHeight: '1'` to prevent text spacing variations

## Design System & Style Standards

### Color Scheme

- **Primary Brown**: `#8b4513` (borders, text, UI elements)
- **Background**: `white` for content areas
- **Light Background**: `#f5f5dc` and `#f9f9f9` for highlighting
- **Resource Colors**:
  - Stamina Points: `#22c55e` (green)
  - Mana Points: `#3b82f6` (blue)
  - Hit Points: `#dc2626` (red)

### Shield Design Pattern

**Shield-like Elements** (PD, PDR, MD):

- Dimensions: `80px` width × `90px` height
- Border: `3px solid #8b4513`
- Border Radius: `50% 50% 50% 50% / 60% 60% 40% 40%` (creates shield shape)
- Background: `white`
- Text: `2rem` font size, bold, `#8b4513` color
- Container: `120px` width with centered content

### Typography Standards

- **Section Titles**: `1.1rem`, bold, `#8b4513`
- **Shield Labels**: `0.8rem`, bold, `#8b4513`, `lineHeight: '1'`
- **Shield Values**: `2rem`, bold, `#8b4513`
- **Small Text**: `0.6rem` for secondary info like "Auto-calculated"

### Layout Patterns

- **Flex Containers**: Use `justifyContent: 'space-around'` and `alignItems: 'center'` for shield rows
- **Consistent Spacing**: `marginBottom: '1.5rem'` for major sections
- **Fixed Heights**: Use consistent heights for label areas (32px) and spacing (20px) to ensure alignment

## Key Components & Files

### Character Sheet (`CharacterSheetClean.tsx`)

- **Left Column**: Attributes with skills (Prime, Might, Agility, Charisma, Intelligence)
- **Middle Column**: Resources (SP/MP/HP), Defenses (PD/PDR/MD), Combat, Death/Exhaustion, Attacks, Inventory
- **Right Column**: Movement, Resources, Features

### Character Creation (`CharacterCreation.tsx`)

- Multi-step wizard with validation
- Step 3 (Background) had validation issues that were fixed
- Uses dynamic point allocation based on Intelligence modifier

### Inventory System (`inventoryItems.ts`)

- Weapons, Armor, Shields, Adventuring Supplies, Healing Potions
- Comprehensive weapon properties and damage calculations
- Enums for categorization and type safety

## Technical Patterns

### Styled Components Usage

- Uses styled-components for complex styling
- Inline styles for simple, one-off styling
- Consistent naming pattern: `Styled[ComponentName]`

### State Management

- React useState for local component state
- Context for character data sharing
- Real-time updates for resource tracking (HP, SP, MP)

### Validation Patterns

- Step-based validation in character creation
- Dynamic calculations based on character attributes
- Flexible point allocation systems

## Development Best Practices Applied

### Code Organization

- Separate files for different data types (weapons, armor, etc.)
- Clear component hierarchy
- Consistent naming conventions

### User Experience

- Visual feedback for interactions
- Tooltips for complex game mechanics
- Responsive design elements
- Auto-calculated values where appropriate

### Data Integrity

- Type safety with TypeScript enums and interfaces
- Validation at multiple levels
- Consistent data structures

## Next Steps & Known Areas for Improvement

1. **Performance Optimization**: Large component could benefit from memoization
2. **Component Splitting**: CharacterSheetClean.tsx is quite large and could be broken down
3. **Accessibility**: Add proper ARIA labels and keyboard navigation
4. **Mobile Responsiveness**: Current design is desktop-focused
5. **Testing**: Add unit tests for validation logic and calculations

## File Locations Summary

- **Main Character Sheet**: `/src/routes/character-sheet/CharacterSheetClean.tsx`
- **Character Creation**: `/src/routes/character-creation/CharacterCreation.tsx`
- **Inventory Data**: `/src/lib/rulesdata/inventoryItems.ts`
- **Character Context**: `/src/lib/stores/characterContext.tsx`
- **Schema**: `/src/lib/server/db/schema.ts`

## Git Workflow

- Use local repository configuration for commits
- Ensure commits are attributed to nzinger1983 account
- Branch: converting-to-react (current working branch)

---

**Session Summary**: Fixed character creation validation bug and completely redesigned PDR to match shield aesthetic with perfect alignment. All three defense shields (PD, PDR, MD) now have consistent appearance and spacing. Git configuration properly set for correct commit attribution.
````

## File: src/components/Menu.tsx
````typescript
import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 2rem;
	background: linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%);
`;

const StyledTitle = styled.h1`
	margin-bottom: 3rem;
	color: #fbbf24;
	text-align: center;
	font-size: 3rem;
	font-weight: bold;
	text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
	letter-spacing: 2px;
	background: linear-gradient(45deg, #fbbf24 0%, #f59e0b 100%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

const StyledSubtitle = styled.p`
	margin-bottom: 4rem;
	color: #e5e7eb;
	text-align: center;
	font-size: 1.2rem;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	max-width: 600px;
	line-height: 1.6;
`;

const StyledMenuGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 2rem;
	max-width: 800px;
	width: 100%;
`;

const StyledMenuCard = styled.button`
	border: 2px solid #8b5cf6;
	padding: 3rem 2rem;
	border-radius: 20px;
	background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
	cursor: pointer;
	transition: all 0.3s ease;
	text-align: center;
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
	backdrop-filter: blur(10px);

	&:hover {
		transform: translateY(-8px);
		box-shadow: 0 16px 48px rgba(139, 92, 246, 0.5);
		border-color: #fbbf24;
	}
`;

const StyledIcon = styled.div`
	font-size: 4rem;
	margin-bottom: 1.5rem;
	background: linear-gradient(145deg, #8b5cf6 0%, #a855f7 100%);
	border-radius: 50%;
	width: 100px;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 1.5rem;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
	transition: all 0.3s ease;

	${StyledMenuCard}:hover & {
		background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
		transform: scale(1.1);
	}
`;

const StyledCardTitle = styled.h2`
	margin: 0 0 1rem 0;
	color: #fbbf24;
	font-size: 1.8rem;
	font-weight: bold;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	transition: all 0.3s ease;

	${StyledMenuCard}:hover & {
		color: #f59e0b;
	}
`;

const StyledCardDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 1rem;
	line-height: 1.6;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	opacity: 0.9;
`;

interface MenuProps {
	onCreateCharacter: () => void;
	onLoadCharacter: () => void;
}

function Menu({ onCreateCharacter, onLoadCharacter }: MenuProps) {
	return (
		<StyledContainer>
			<StyledTitle>DC20 Character Creator</StyledTitle>
			<StyledSubtitle>
				Welcome to the ultimate D&D character creation experience. Choose your path to begin your
				adventure.
			</StyledSubtitle>

			<StyledMenuGrid>
				<StyledMenuCard onClick={onCreateCharacter}>
					<StyledIcon>⚔️</StyledIcon>
					<StyledCardTitle>Create Character</StyledCardTitle>
					<StyledCardDescription>
						Start fresh and create a new character from scratch. Choose your class, allocate
						attributes, and select your ancestry to forge your unique hero.
					</StyledCardDescription>
				</StyledMenuCard>

				<StyledMenuCard onClick={onLoadCharacter}>
					<StyledIcon>📜</StyledIcon>
					<StyledCardTitle>Load Character</StyledCardTitle>
					<StyledCardDescription>
						Continue working on an existing character or load a previously saved creation. Perfect
						for refining your build or making adjustments.
					</StyledCardDescription>
				</StyledMenuCard>
			</StyledMenuGrid>
		</StyledContainer>
	);
}

export default Menu;
````

## File: src/components/Snackbar.tsx
````typescript
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const StyledSnackbar = styled.div<{ $isVisible: boolean; $isExiting: boolean }>`
	position: fixed;
	top: 2rem;
	right: 2rem;
	padding: 1rem 1.5rem;
	background: linear-gradient(145deg, #10b981 0%, #059669 100%);
	color: white;
	border-radius: 8px;
	box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
	font-weight: bold;
	font-size: 0.9rem;
	z-index: 1000;
	min-width: 300px;
	animation: ${(props) => (props.$isExiting ? slideOut : slideIn)} 0.3s ease-out;
	display: ${(props) => (props.$isVisible ? 'block' : 'none')};

	&::before {
		content: '✓';
		margin-right: 0.5rem;
		font-size: 1.2rem;
	}
`;

interface SnackbarProps {
	message: string;
	isVisible: boolean;
	onClose: () => void;
	duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, isVisible, onClose, duration = 3000 }) => {
	const [isExiting, setIsExiting] = useState(false);

	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				setIsExiting(true);
				setTimeout(() => {
					onClose();
					setIsExiting(false);
				}, 300); // Animation duration
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [isVisible, onClose, duration]);

	return (
		<StyledSnackbar $isVisible={isVisible} $isExiting={isExiting}>
			{message}
		</StyledSnackbar>
	);
};

export default Snackbar;
````

## File: src/lib/rulesdata/ancestries.ts
````typescript
// src/lib/rulesdata/ancestries.ts

import type { IAncestry } from './types';

export const ancestriesData: IAncestry[] = [
	{
		id: 'human',
		name: 'Human',
		description:
			'Humans are the most common ancestry in the world, known for their adaptability and resilience.',
		defaultTraitIds: [
			'human_attribute_increase',
			'human_skill_expertise',
			'human_resolve',
			'human_undying'
		],
		expandedTraitIds: [
			'human_trade_expertise',
			'human_determination',
			'human_unbreakable',
			'human_attribute_decrease'
		]
	},
	{
		id: 'elf',
		name: 'Elf',
		description: 'Elves are graceful and long-lived beings with a deep connection to nature.',
		defaultTraitIds: ['elf_elven_will', 'elf_nimble', 'elf_agile_explorer', 'elf_discerning_sight'],
		expandedTraitIds: [
			'elf_quick_reactions',
			'elf_peerless_sight',
			'elf_climb_speed',
			'elf_speed_increase',
			'elf_trade_expertise_elf',
			'elf_plant_knowledge',
			'elf_brittle',
			'elf_frail',
			'elf_might_decrease'
		]
	},
	{
		id: 'dwarf',
		name: 'Dwarf',
		description:
			'Dwarves are a stout and resilient folk, known for their craftsmanship and deep connection to the earth.',
		defaultTraitIds: [
			'dwarf_tough',
			'dwarf_toxic_fortitude',
			'dwarf_physically_sturdy',
			'dwarf_iron_stomach'
		],
		expandedTraitIds: [
			'dwarf_thick_skinned',
			'dwarf_natural_combatant',
			'dwarf_stone_blood',
			'dwarf_minor_tremorsense',
			'dwarf_stubborn',
			'dwarf_trade_expertise',
			'dwarf_earthen_knowledge',
			'dwarf_charisma_attribute_decrease',
			'dwarf_short_legged'
		]
	},
	{
		id: 'halfling',
		name: 'Halfling',
		description:
			'Halflings are a small and nimble folk, known for their bravery and love of comfort.',
		defaultTraitIds: [
			'halfling_small_sized',
			'halfling_elusive',
			'halfling_bravery',
			'halfling_endurance',
			'halfling_deft_footwork',
			'halfling_beast_whisperer'
		],
		expandedTraitIds: [
			'halfling_beast_insight',
			'halfling_burst_of_bravery',
			'halfling_trade_expertise',
			'halfling_critter_knowledge',
			'halfling_brittle',
			'halfling_intelligence_attribute_decrease',
			'halfling_short_legged'
		]
	},
	{
		id: 'gnome',
		name: 'Gnome',
		description:
			'Gnomes are small and energetic folk, known for their inventiveness and connection to the feywild.',
		defaultTraitIds: [
			'gnome_small_sized',
			'gnome_escape_artist',
			'gnome_magnified_vision',
			'gnome_mental_clarity',
			'gnome_strong_minded',
			'gnome_predict_weather'
		],
		expandedTraitIds: [
			'gnome_mana_increase',
			'gnome_trapper',
			'gnome_lightning_insulation',
			'gnome_trade_expertise',
			'gnome_storm_knowledge',
			'gnome_agility_attribute_decrease',
			'gnome_short_legged'
		]
	},
	{
		id: 'orc',
		name: 'Orc',
		description:
			'Orcs are a strong and fierce folk, known for their martial prowess and intimidating presence.',
		defaultTraitIds: [
			'orc_cursed_mind',
			'orc_rush',
			'orc_brutal_strikes',
			'orc_tough',
			'orc_orcish_resolve',
			'orc_already_cursed'
		],
		expandedTraitIds: [
			'orc_intimidating_shout',
			'orc_dash',
			'orc_finishing_blow',
			'orc_imposing_presence',
			'orc_provocation',
			'orc_reckless'
		]
	},
	{
		id: 'dragonborn',
		name: 'Dragonborn',
		description:
			'Dragonborn are a proud and powerful folk, who trace their lineage back to dragons.',
		defaultTraitIds: [
			'dragonborn_darkvision',
			'dragonborn_draconic_resistance',
			'dragonborn_draconic_breath_weapon',
			'dragonborn_reptilian_superiority'
		],
		expandedTraitIds: [
			'dragonborn_mana_increase',
			'dragonborn_thick_skinned',
			'dragonborn_second_breath',
			'dragonborn_concussive_breath',
			'dragonborn_draconic_affinity',
			'dragonborn_dying_breath',
			'dragonborn_draconic_ward',
			'dragonborn_draconic_protection',
			'dragonborn_glide_speed',
			'dragonborn_guardians_bond'
		],
		origin: {
			// Draconic Origin
			prompt: 'Choose a Draconic Origin:',
			options: [
				'cold',
				'corrosion',
				'fire',
				'lightning',
				'poison',
				'sonic',
				'psychic',
				'radiant',
				'umbral'
			]
		}
	},
	{
		id: 'giantborn',
		name: 'Giantborn',
		description: 'Giantborn are a large and powerful folk, who trace their lineage back to giants.',
		defaultTraitIds: [
			'giantborn_tough',
			'giantborn_powerful_build',
			'giantborn_unstoppable',
			'giantborn_giants_resolve',
			'giantborn_unyielding_movement'
		],
		expandedTraitIds: [
			'giantborn_giants_fortitude',
			'giantborn_strong_body',
			'giantborn_mighty_hurl',
			'giantborn_titanic_toss',
			'giantborn_mighty_leap',
			'giantborn_brute',
			'giantborn_heavy_riser',
			'giantborn_clumsiness',
			'giantborn_intelligence_attribute_decrease'
		]
	},
	{
		id: 'angelborn',
		name: 'Angelborn',
		description: 'Angelborn are a celestial folk, known for their grace and divine connection.',
		defaultTraitIds: [
			'angelborn_radiant_resistance',
			'angelborn_celestial_magic',
			'angelborn_healing_touch',
			'angelborn_divine_glow'
		],
		expandedTraitIds: [
			'angelborn_mana_increase',
			'angelborn_celestial_clarity',
			'angelborn_angelic_insight',
			'angelborn_gift_of_the_angels',
			'angelborn_blinding_light',
			'angelborn_glide_speed',
			'angelborn_pacifist',
			'angelborn_umbral_weakness'
		],
		variantTraits: [
			// Fallen Angelborn
			{
				id: 'angelborn_fallen',
				name: 'Fallen',
				cost: 0,
				description: 'You can now spend your Ancestry Points on Fiendborn Traits.'
			}
		]
	},
	{
		id: 'fiendborn',
		name: 'Fiendborn',
		description: 'Fiendborn are a fiendish folk, known for their cunning and infernal connection.',
		defaultTraitIds: [
			'fiendborn_fiendish_resistance',
			'fiendborn_fiendish_magic',
			'fiendborn_darkvision',
			'fiendborn_lights_bane'
		],
		expandedTraitIds: [
			'fiendborn_mana_increase',
			'fiendborn_silver_tongued',
			'fiendborn_fiendish_aura',
			'fiendborn_superior_darkvision',
			'fiendborn_infernal_bravery',
			'fiendborn_intimidator',
			'fiendborn_charming_gaze',
			'fiendborn_glide_speed',
			'fiendborn_radiant_weakness',
			'fiendborn_divine_dampening'
		],
		origin: {
			// Fiendish Origin
			prompt: 'Choose a Fiendish Origin:',
			options: ['cold', 'corrosion', 'fire', 'poison', 'umbral']
		},
		variantTraits: [
			// Fiendborn Redemption
			{
				id: 'fiendborn_redeemed',
				name: 'Redeemed',
				cost: 0,
				description: 'You can now spend your Ancestry Points on Angelborn Traits.'
			}
		]
	},
	{
		id: 'beastborn',
		name: 'Beastborn',
		description: 'Beastborn are a diverse folk, who take on the characteristics of various beasts.',
		defaultTraitIds: [], // Beastborn has no Default Traits
		expandedTraitIds: [
			// Listed under Beast Traits sections in PDF
			// Senses
			'beastborn_darkvision',
			'beastborn_echolocation',
			'beastborn_keen_sense',
			'beastborn_sunlight_sensitivity',
			// Mobility
			'beastborn_quick_reactions',
			'beastborn_climb_speed',
			'beastborn_spider_climb',
			'beastborn_web_walk',
			'beastborn_water_breathing',
			'beastborn_swim_speed',
			'beastborn_speed_increase',
			'beastborn_sprint',
			'beastborn_charge',
			'beastborn_burrow_speed',
			// Jumping
			'beastborn_jumper',
			'beastborn_strong_jumper',
			// Flying
			'beastborn_glide_speed',
			'beastborn_limited_flight',
			'beastborn_full_flight',
			'beastborn_flyby',
			'beastborn_stealth_feathers',
			'beastborn_winged_arms',
			// Body
			'beastborn_tough',
			'beastborn_thick_skinned',
			'beastborn_powerful_build',
			'beastborn_long_limbed',
			'beastborn_secondary_arms',
			'beastborn_prehensile_appendage',
			'beastborn_hazardous_hide',
			'beastborn_natural_armor',
			'beastborn_hard_shell',
			'beastborn_shell_retreat',
			'beastborn_camouflage',
			'beastborn_prowler',
			'beastborn_cold_resistance',
			'beastborn_fire_resistance',
			'beastborn_short_legged',
			'beastborn_small_sized',
			'beastborn_reckless',
			// Natural Weapons
			'beastborn_natural_weapon',
			'beastborn_extended_natural_weapon',
			'beastborn_natural_projectile',
			'beastborn_natural_weapon_passive',
			'beastborn_rend',
			'beastborn_retractable_natural_weapon',
			'beastborn_venomous_natural_weapon',
			// Miscellaneous
			'beastborn_fast_reflexes',
			'beastborn_mimicry',
			'beastborn_intimidating_shout',
			'beastborn_toxic_fortitude',
			'beastborn_shoot_webs'
		],
		origin: {
			// Beastborn Origin
			prompt: 'Choose a type of Beast you are modeled after:',
			options: [] // Options are open-ended, based on GM/player choice
		}
	}
];
````

## File: src/lib/rulesdata/attributes.ts
````typescript
// src/lib/rulesdata/attributes.ts

import type { IAttributeData } from './types';
// To be placed in: src/lib/rulesdata/attributes.ts
export const attributesData: IAttributeData[] = [
	// TODO: Replace bracketed placeholders with accurate information from the DC20 Beta 0.9.5 rulebook.
	{
		id: 'might',
		name: 'Might',
		description: 'Your Strength of Body.',
		derivedStats: [
			// Examples, verify/adjust based on actual rules for each attribute
			{ statName: 'AD (area defense)', formula: '8 + CM + Might + Charisma + Bonuses' },
			{ statName: 'Max HP', formula: 'Class HP + Might + Ancestry HP' }
		]
	},
	{
		id: 'agility',
		name: 'Agility',
		description: 'Your Balance, Nimbleness, and Dexterity.',
		derivedStats: [
			{ statName: 'PD (precision defense)', formula: '8 + CM + Agility + Intelligence + Bonuses' },
			{ statName: 'Jump Distance', formula: 'Agility (min 1)' },
			{ statName: 'Initiative', formula: 'CM + Agility' }
		]
	},
	{
		id: 'charisma',
		name: 'Charisma',
		description: 'Your Charm, Presence, Persuasiveness, and Force of Will.',
		derivedStats: [{ statName: 'Grit Points', formula: '2 + Charisma' }]
	},
	{
		id: 'intelligence',
		name: 'Intelligence',
		description: 'Your Reasoning, Understanding, and Wisdom.',
		derivedStats: [{ statName: 'Base Skill Points', formula: '5 + Intelligence' }]
	}
];
````

## File: src/lib/rulesdata/inventoryItems.ts
````typescript
// inventoryItems.ts

//==============================================================================
// SCHEMAS / TYPES
//==============================================================================

export enum ItemType {
	Weapon = 'Weapon',
	Armor = 'Armor',
	Shield = 'Shield',
	AdventuringSupply = 'Adventuring Supply',
	Potion = 'Potion'
}

export enum WeaponType {
	Melee = 'Melee',
	Ranged = 'Ranged',
	Special = 'Special'
}

export enum WeaponHandedness {
	OneHanded = 'One-Handed',
	Versatile = 'Versatile',
	TwoHanded = 'Two-Handed'
}

export enum WeaponStyle {
	Axe = 'Axe',
	Fist = 'Fist',
	Hammer = 'Hammer',
	Pick = 'Pick',
	Spear = 'Spear',
	Sword = 'Sword',
	Whip = 'Whip',
	Chained = 'Chained',
	Bow = 'Bow',
	Crossbow = 'Crossbow',
	AxePick = 'Axe/Pick',
	HammerPick = 'Hammer/Pick',
	SwordSpear = 'Sword/Spear',
	ChainedHammer = 'Chained/Hammer',
	Staff = 'Staff'
}

export enum DamageType {
	Slashing = 'S',
	Piercing = 'P',
	Bludgeoning = 'B',
	SlashingOrPiercing = 'S/P',
	BludgeoningOrPiercing = 'B/P'
}

// Based on properties from pages 76 & 77
export type WeaponProperty =
	| 'Ammo'
	| 'Concealable'
	| 'Guard'
	| 'Heavy'
	| 'Impact'
	| 'Long-Ranged'
	| 'Multi-Faceted'
	| 'Reach'
	| 'Reload'
	| 'Silent'
	| 'Toss (5/10)'
	| 'Thrown (10/20)'
	| 'Two-Handed'
	| 'Unwieldy'
	| 'Versatile'
	| 'Returning'
	| 'Capture (5/10)'
	| 'Capture (10/20)'
	| 'Range (15/45)'
	| 'Range (30/90)';

export interface Weapon {
	itemType: ItemType.Weapon;
	name: string;
	type: WeaponType;
	style: WeaponStyle | WeaponStyle[];
	handedness: WeaponHandedness;
	damage: string; // Using string to accommodate '0 B' etc.
	properties: WeaponProperty[];
}

export enum ArmorType {
	Light = 'Light Armor',
	Heavy = 'Heavy Armor'
}

export interface Armor {
	itemType: ItemType.Armor;
	name: string;
	type: ArmorType;
	pdBonus: number;
	adBonus: number;
	pdr?: 'Half';
	speedPenalty: number;
	agilityCheckDisadvantage: boolean;
}

export enum ShieldType {
	Light = 'Light Shield',
	Heavy = 'Heavy Shield'
}

export type ShieldProperty = 'Grasp' | 'Toss (5/10)' | 'Mounted';

export interface Shield {
	itemType: ItemType.Shield;
	name: string;
	type: ShieldType;
	pdBonus: number;
	adBonus: number;
	speedPenalty: number;
	agilityCheckDisadvantage: boolean;
	properties?: ShieldProperty[];
}

export interface AdventuringSupply {
	itemType: ItemType.AdventuringSupply;
	name: string;
	description: string;
	price?: string; // e.g., "5g"
}

export interface HealingPotion {
	itemType: ItemType.Potion;
	name: string;
	level: number;
	healing: string; // e.g., "2 HP"
	price: number; // in gold pieces (g)
}

// Union type for all inventory items
export type InventoryItem = Weapon | Armor | Shield | AdventuringSupply | HealingPotion;

//==============================================================================
// INVENTORY DATA
//==============================================================================

export const weapons: Weapon[] = [
	// Melee Weapons - One-Handed
	{
		itemType: ItemType.Weapon,
		name: 'Sickle',
		type: WeaponType.Melee,
		style: WeaponStyle.Axe,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Hand Axe',
		type: WeaponType.Melee,
		style: WeaponStyle.Axe,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Throwing Star',
		type: WeaponType.Melee,
		style: WeaponStyle.Axe,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Brass Knuckles',
		type: WeaponType.Melee,
		style: WeaponStyle.Fist,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 B',
		properties: ['Concealable', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Club',
		type: WeaponType.Melee,
		style: WeaponStyle.Hammer,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 B',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Light Hammer',
		type: WeaponType.Melee,
		style: WeaponStyle.Hammer,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 B',
		properties: ['Impact', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Dart',
		type: WeaponType.Melee,
		style: WeaponStyle.Pick,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 P',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Mining Pick',
		type: WeaponType.Melee,
		style: WeaponStyle.Pick,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 P',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Javelin',
		type: WeaponType.Melee,
		style: WeaponStyle.Spear,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 P',
		properties: ['Thrown (10/20)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Throwing Dagger',
		type: WeaponType.Melee,
		style: WeaponStyle.Sword,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S',
		properties: ['Concealable', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Short Sword',
		type: WeaponType.Melee,
		style: WeaponStyle.Sword,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S',
		properties: ['Guard', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Rapier',
		type: WeaponType.Melee,
		style: [WeaponStyle.Sword, WeaponStyle.Spear],
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S/P',
		properties: ['Guard', 'Multi-Faceted']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Chain Whip',
		type: WeaponType.Melee,
		style: WeaponStyle.Whip,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 S',
		properties: ['Reach', 'Impact']
	},

	// Melee Weapons - Versatile
	{
		itemType: ItemType.Weapon,
		name: 'Battleaxe',
		type: WeaponType.Melee,
		style: WeaponStyle.Axe,
		handedness: WeaponHandedness.Versatile,
		damage: '1 S',
		properties: ['Versatile', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Flail',
		type: WeaponType.Melee,
		style: WeaponStyle.Chained,
		handedness: WeaponHandedness.Versatile,
		damage: '1 B',
		properties: ['Versatile', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Morningstar',
		type: WeaponType.Melee,
		style: [WeaponStyle.Hammer, WeaponStyle.Pick],
		handedness: WeaponHandedness.Versatile,
		damage: '1 B/P',
		properties: ['Versatile', 'Multi-Faceted']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Warhammer',
		type: WeaponType.Melee,
		style: [WeaponStyle.Hammer, WeaponStyle.Pick],
		handedness: WeaponHandedness.Versatile,
		damage: '1 B/P',
		properties: ['Versatile', 'Multi-Faceted']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Pickaxe',
		type: WeaponType.Melee,
		style: WeaponStyle.Pick,
		handedness: WeaponHandedness.Versatile,
		damage: '1 P',
		properties: ['Versatile', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Spear',
		type: WeaponType.Melee,
		style: WeaponStyle.Spear,
		handedness: WeaponHandedness.Versatile,
		damage: '1 P',
		properties: ['Versatile', 'Toss (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Long Spear',
		type: WeaponType.Melee,
		style: WeaponStyle.Spear,
		handedness: WeaponHandedness.Versatile,
		damage: '1 P',
		properties: ['Versatile', 'Reach']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Quarterstaff',
		type: WeaponType.Melee,
		style: WeaponStyle.Staff,
		handedness: WeaponHandedness.Versatile,
		damage: '1 B',
		properties: ['Versatile', 'Guard']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Longsword',
		type: WeaponType.Melee,
		style: WeaponStyle.Sword,
		handedness: WeaponHandedness.Versatile,
		damage: '1 S',
		properties: ['Versatile', 'Guard']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Bastard Sword',
		type: WeaponType.Melee,
		style: WeaponStyle.Sword,
		handedness: WeaponHandedness.Versatile,
		damage: '1 S',
		properties: ['Versatile', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Bull Whip',
		type: WeaponType.Melee,
		style: WeaponStyle.Whip,
		handedness: WeaponHandedness.Versatile,
		damage: '1 S',
		properties: ['Versatile', 'Reach', 'Unwieldy', 'Impact']
	},

	// Melee Weapons - Two-Handed
	{
		itemType: ItemType.Weapon,
		name: 'Scythe',
		type: WeaponType.Melee,
		style: WeaponStyle.Axe,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 S',
		properties: ['Two-Handed', 'Heavy', 'Reach']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Greataxe',
		type: WeaponType.Melee,
		style: WeaponStyle.Axe,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 S',
		properties: ['Two-Handed', 'Heavy', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Halberd',
		type: WeaponType.Melee,
		style: [WeaponStyle.Axe, WeaponStyle.Pick],
		handedness: WeaponHandedness.TwoHanded,
		damage: '1 S/P',
		properties: ['Two-Handed', 'Multi-Faceted', 'Reach', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'War Flail',
		type: WeaponType.Melee,
		style: WeaponStyle.Chained,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 B',
		properties: ['Two-Handed', 'Heavy', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Meteor Hammer',
		type: WeaponType.Melee,
		style: [WeaponStyle.Chained, WeaponStyle.Hammer],
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 B',
		properties: ['Two-Handed', 'Heavy', 'Multi-Faceted', 'Reach', 'Unwieldy']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Greatmaul',
		type: WeaponType.Melee,
		style: WeaponStyle.Hammer,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 B',
		properties: ['Two-Handed', 'Heavy', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Pike',
		type: WeaponType.Melee,
		style: WeaponStyle.Spear,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 P',
		properties: ['Two-Handed', 'Heavy', 'Reach', 'Impact', 'Unwieldy']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Longpole',
		type: WeaponType.Melee,
		style: WeaponStyle.Staff,
		handedness: WeaponHandedness.TwoHanded,
		damage: '1 B',
		properties: ['Two-Handed', 'Guard', 'Reach', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Glaive',
		type: WeaponType.Melee,
		style: WeaponStyle.Sword,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 S',
		properties: ['Two-Handed', 'Heavy', 'Reach']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Greatsword',
		type: WeaponType.Melee,
		style: WeaponStyle.Sword,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 S',
		properties: ['Two-Handed', 'Heavy', 'Impact']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Great Whip',
		type: WeaponType.Melee,
		style: WeaponStyle.Whip,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 S',
		properties: ['Two-Handed', 'Heavy', 'Reach', 'Impact', 'Unwieldy']
	},

	// Ranged Weapons
	{
		itemType: ItemType.Weapon,
		name: 'Sling',
		type: WeaponType.Ranged,
		style: WeaponStyle.Bow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '1 B',
		properties: ['Ammo', 'Unwieldy', 'Impact', 'Range (15/45)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Shortbow',
		type: WeaponType.Ranged,
		style: WeaponStyle.Bow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '1 P',
		properties: ['Two-Handed', 'Ammo', 'Silent', 'Range (15/45)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Longbow',
		type: WeaponType.Ranged,
		style: WeaponStyle.Bow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '1 P',
		properties: ['Two-Handed', 'Ammo', 'Unwieldy', 'Impact', 'Long-Ranged']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Greatbow',
		type: WeaponType.Ranged,
		style: WeaponStyle.Bow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 P',
		properties: ['Two-Handed', 'Ammo', 'Unwieldy', 'Heavy', 'Range (15/45)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Blowgun (Needle)',
		type: WeaponType.Ranged,
		style: WeaponStyle.Crossbow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '1 P',
		properties: ['Two-Handed', 'Ammo', 'Silent', 'Range (15/45)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Hand Crossbow',
		type: WeaponType.Ranged,
		style: WeaponStyle.Crossbow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 P',
		properties: ['Ammo', 'Reload', 'Range (15/45)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Light Crossbow',
		type: WeaponType.Ranged,
		style: WeaponStyle.Crossbow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '2 P',
		properties: ['Two-Handed', 'Ammo', 'Reload', 'Impact', 'Range (15/45)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Heavy Crossbow',
		type: WeaponType.Ranged,
		style: WeaponStyle.Crossbow,
		handedness: WeaponHandedness.TwoHanded,
		damage: '3 P',
		properties: ['Two-Handed', 'Ammo', 'Unwieldy', 'Reload', 'Heavy', 'Range (15/45)']
	},

	// Special Weapons
	{
		itemType: ItemType.Weapon,
		name: 'Bolas',
		type: WeaponType.Special,
		style: WeaponStyle.Chained,
		handedness: WeaponHandedness.OneHanded,
		damage: '0 B',
		properties: ['Thrown (10/20)', 'Capture (10/20)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Net',
		type: WeaponType.Special,
		style: WeaponStyle.Chained,
		handedness: WeaponHandedness.Versatile,
		damage: '0 B',
		properties: ['Toss (5/10)', 'Versatile', 'Capture (5/10)']
	},
	{
		itemType: ItemType.Weapon,
		name: 'Boomerang',
		type: WeaponType.Special,
		style: WeaponStyle.Hammer,
		handedness: WeaponHandedness.OneHanded,
		damage: '1 B',
		properties: ['Toss (5/10)', 'Returning']
	}
];

export const armors: Armor[] = [
	// Light Armor
	{
		itemType: ItemType.Armor,
		name: 'Light Defensive Armor',
		type: ArmorType.Light,
		pdBonus: 1,
		adBonus: 1,
		speedPenalty: 0,
		agilityCheckDisadvantage: false
	},
	{
		itemType: ItemType.Armor,
		name: 'Light Deflecting Armor',
		type: ArmorType.Light,
		pdBonus: 2,
		adBonus: 0,
		speedPenalty: 0,
		agilityCheckDisadvantage: false
	},
	{
		itemType: ItemType.Armor,
		name: 'Light Fortified Armor',
		type: ArmorType.Light,
		pdBonus: 0,
		adBonus: 2,
		speedPenalty: 0,
		agilityCheckDisadvantage: false
	},

	// Heavy Armor
	{
		itemType: ItemType.Armor,
		name: 'Heavy Defensive Armor',
		type: ArmorType.Heavy,
		pdBonus: 1,
		adBonus: 1,
		pdr: 'Half',
		speedPenalty: -1,
		agilityCheckDisadvantage: true
	},
	{
		itemType: ItemType.Armor,
		name: 'Heavy Deflecting Armor',
		type: ArmorType.Heavy,
		pdBonus: 2,
		adBonus: 0,
		pdr: 'Half',
		speedPenalty: -1,
		agilityCheckDisadvantage: true
	},
	{
		itemType: ItemType.Armor,
		name: 'Heavy Fortified Armor',
		type: ArmorType.Heavy,
		pdBonus: 0,
		adBonus: 2,
		pdr: 'Half',
		speedPenalty: -1,
		agilityCheckDisadvantage: true
	},
	{
		itemType: ItemType.Armor,
		name: 'Highly Defensive Armor',
		type: ArmorType.Heavy,
		pdBonus: 2,
		adBonus: 2,
		pdr: 'Half',
		speedPenalty: -1,
		agilityCheckDisadvantage: true
	}
];

export const shields: Shield[] = [
	// Light Shields
	{
		itemType: ItemType.Shield,
		name: 'Buckler',
		type: ShieldType.Light,
		pdBonus: 1,
		adBonus: 0,
		speedPenalty: 0,
		agilityCheckDisadvantage: false,
		properties: ['Grasp']
	},
	{
		itemType: ItemType.Shield,
		name: 'Round Shield',
		type: ShieldType.Light,
		pdBonus: 0,
		adBonus: 1,
		speedPenalty: 0,
		agilityCheckDisadvantage: false,
		properties: ['Toss (5/10)']
	},
	{
		itemType: ItemType.Shield,
		name: 'Heater Shield',
		type: ShieldType.Light,
		pdBonus: 1,
		adBonus: 1,
		speedPenalty: 0,
		agilityCheckDisadvantage: false,
		properties: []
	},

	// Heavy Shields
	{
		itemType: ItemType.Shield,
		name: 'Kite Shield',
		type: ShieldType.Heavy,
		pdBonus: 1,
		adBonus: 2,
		speedPenalty: -1,
		agilityCheckDisadvantage: true,
		properties: ['Mounted']
	},
	{
		itemType: ItemType.Shield,
		name: 'Tower Shield',
		type: ShieldType.Heavy,
		pdBonus: 2,
		adBonus: 2,
		speedPenalty: -1,
		agilityCheckDisadvantage: true,
		properties: []
	}
];

export const adventuringSupplies: AdventuringSupply[] = [
	{
		itemType: ItemType.AdventuringSupply,
		name: 'Gauntlet',
		description:
			'Wearing a Gauntlet gives your Unarmed Strikes with that hand the Impact Weapon Property (+1 damage on Heavy Hits).',
		price: '5g'
	},
	{
		itemType: ItemType.AdventuringSupply,
		name: 'First Aid Kit',
		description:
			"A fully stocked kit contains 5 charges, which can be spent to treat a creature's wounds or cure an ailment by taking the Object Action."
	}
];

export const healingPotions: HealingPotion[] = [
	{
		itemType: ItemType.Potion,
		name: '1st Level Healing Potion',
		level: 1,
		healing: '2 HP',
		price: 10
	},
	{
		itemType: ItemType.Potion,
		name: '2nd Level Healing Potion',
		level: 2,
		healing: '4 HP',
		price: 25
	},
	{
		itemType: ItemType.Potion,
		name: '3rd Level Healing Potion',
		level: 3,
		healing: '6 HP',
		price: 40
	},
	{
		itemType: ItemType.Potion,
		name: '4th Level Healing Potion',
		level: 4,
		healing: '8 HP',
		price: 60
	},
	{
		itemType: ItemType.Potion,
		name: '5th Level Healing Potion',
		level: 5,
		healing: '10 HP',
		price: 100
	}
];

export const allItems = [
	...weapons,
	...armors,
	...shields,
	...adventuringSupplies,
	...healingPotions
];
````

## File: src/lib/rulesdata/knowledge.ts
````typescript
import { ITradeData } from './types';

export const knowledgeData: ITradeData[] = [
	{
		id: 'arcana',
		name: 'Arcana',
		attributeAssociation: 'intelligence',
		description:
			'Arcana is the study of magic, its history, theories, and the planes of existence. This includes recalling information about spells, magical creatures, and magical phenomena.',
		tools: undefined // Knowledge trade
	},
	{
		id: 'history',
		name: 'History',
		attributeAssociation: 'intelligence',
		description:
			'History is the study of past events, ancient lore, and how civilizations have shaped the present. This includes recalling information about historical figures, events, and cultures.',
		tools: undefined // Knowledge trade
	},
	{
		id: 'nature',
		name: 'Nature',
		attributeAssociation: 'intelligence',
		description:
			'Nature is the study of the natural world, including plants, animals, weather patterns, and natural phenomena.',
		tools: undefined // Knowledge trade
	},
	{
		id: 'religion',
		name: 'Religion',
		attributeAssociation: 'intelligence',
		description:
			'Religion is the knowledge of deities, religious practices, and holy texts. This includes understanding religious beliefs, rituals, and scriptures.',
		tools: undefined // Knowledge trade
	},
	{
		id: 'occultism',
		name: 'Occultism',
		attributeAssociation: 'intelligence',
		description:
			'Occultism is the study of hidden mysteries, forbidden lore, and supernatural phenomena beyond normal magical understanding.',
		tools: undefined // Knowledge trade
	}
];
````

## File: src/lib/rulesdata/languages.ts
````typescript
import type { ILanguageData } from './types';

export const languagesData: ILanguageData[] = [
	{
		id: 'common',
		name: 'Common',
		type: 'standard', // From DC20 p.18
		description:
			'Common is the most simple and universal language in the world. All Player Characters start Fluent in Common.'
	},
	{
		id: 'elvish',
		name: 'Elvish',
		type: 'standard', // From DC20 p.18
		description: 'Elvish is a fluid and melodic language spoken by Elves. Typical Speakers: Elves.'
	},
	{
		id: 'draconic',
		name: 'Draconic',
		type: 'exotic', // From DC20 p.18
		description:
			'Draconic is a harsh, guttural language spoken by Dragons and Dragonkin. Typical Speakers: Dragons, Dragonkin.'
	},
	{
		id: 'dwarvish',
		name: 'Dwarvish',
		type: 'standard', // From DC20 p.18
		description:
			'Dwarvish is a language of hard consonants and guttural sounds, spoken by Dwarves. Typical Speakers: Dwarves.'
	},
	{
		id: 'gnomish',
		name: 'Gnomish',
		type: 'standard', // From DC20 p.18
		description:
			'Gnomish is a language filled with trills and clicks, spoken by Gnomes. Typical Speakers: Gnomes.'
	},
	{
		id: 'goblin',
		name: 'Goblin',
		type: 'standard', // From DC20 p.18
		description:
			'Goblin is a rough and simple language spoken by Goblins, Hobgoblins, and Bugbears. Typical Speakers: Goblins, Hobgoblins, Bugbears.'
	},
	{
		id: 'halfling',
		name: 'Halfling',
		type: 'standard', // From DC20 p.18
		description:
			'Halfling is a soft and gentle language spoken by Halflings. Typical Speakers: Halflings.'
	},
	{
		id: 'orcish',
		name: 'Orcish',
		type: 'standard', // From DC20 p.18
		description: 'Orcish is a brutal and harsh language spoken by Orcs. Typical Speakers: Orcs.'
	},
	{
		id: 'primordial',
		name: 'Primordial',
		type: 'exotic', // From DC20 p.18
		description: 'Primordial is the language of Elementals. Typical Speakers: Elementals.'
	},
	{
		id: 'celestial',
		name: 'Celestial',
		type: 'exotic', // From DC20 p.18
		description: 'Celestial is the language of Celestials. Typical Speakers: Celestials.'
	},
	{
		id: 'abyssal',
		name: 'Abyssal',
		type: 'exotic', // From DC20 p.18
		description: 'Abyssal is the language of Demons. Typical Speakers: Demons.'
	},
	{
		id: 'infernal',
		name: 'Infernal',
		type: 'exotic', // From DC20 p.18
		description: 'Infernal is the language of Devils. Typical Speakers: Devils.'
	},
	{
		id: 'undercommon',
		name: 'Undercommon',
		type: 'exotic', // From DC20 p.18
		description:
			'Undercommon is a language spoken by inhabitants of the Underdark, such as Drow. Typical Speakers: Drow, Underdark inhabitants.'
	}
];
````

## File: src/lib/rulesdata/skills.ts
````typescript
import type { ISkillData } from './types';

export const skillsData: ISkillData[] = [
	{
		id: 'athletics',
		name: 'Athletics',
		attributeAssociation: 'might',
		description:
			'Athletics covers activities that involve physical prowess, such as climbing, swimming, and jumping in difficult circumstances, or participating in a Grapple.'
	},
	{
		id: 'intimidation',
		name: 'Intimidation',
		attributeAssociation: 'might',
		description:
			'Intimidation covers attempts to influence a creature’s behavior using threats, hostile actions, and physical violence.'
	},
	{
		id: 'acrobatics',
		name: 'Acrobatics',
		attributeAssociation: 'agility',
		description: 'Acrobatics covers activities that require flexibility, nimbleness, and balance.'
	},
	{
		id: 'trickery',
		name: 'Trickery',
		attributeAssociation: 'agility',
		description:
			'Trickery covers non-verbal means of deceiving others, such as pickpocketing things, concealing an object on your person, or other forms of physical deception.'
	},
	{
		id: 'stealth',
		name: 'Stealth',
		attributeAssociation: 'agility',
		description:
			'Stealth covers attempts to avoid being seen or heard by other creatures, such as sneaking about or hiding behind cover.'
	},
	{
		id: 'animal',
		name: 'Animal',
		attributeAssociation: 'charisma',
		description:
			'Animal covers interactions such as corralling, training, calming, and gauging the intention of Beasts.'
	},
	{
		id: 'insight',
		name: 'Insight',
		attributeAssociation: 'charisma',
		description:
			'Insight governs your ability to discern intentions. This could be from observing a creature’s body language, facial cues, and mannerisms. Alternatively, Insight can represent a gut feeling or intuition about a situation.'
	},
	{
		id: 'influence',
		name: 'Influence',
		attributeAssociation: 'charisma',
		description:
			'Influence covers your attempts to manipulate a creature’s behavior using compelling arguments based on truth, half-truths, lies, or some combination in between.'
	},
	{
		id: 'investigation',
		name: 'Investigation',
		attributeAssociation: 'intelligence',
		description:
			'Investigation covers using your senses to search for and discover things that are not readily observable. You look for clues and then make deductions on those clues to try and discern the locations of things or how they work (finding hidden objects, secret doors, or weak points in structures). It also covers the process of researching information through various texts.'
	},
	{
		id: 'medicine',
		name: 'Medicine',
		attributeAssociation: 'intelligence',
		description:
			'Medicine covers activities that involve medical knowledge and application, such as treating a wounded creature, diagnosing an illness, or identifying a cure to an ailment.'
	},
	{
		id: 'survival',
		name: 'Survival',
		attributeAssociation: 'intelligence',
		description:
			'Survival covers the activities required to survive in the wilderness, such as tracking quarry, foraging for food and water, and navigating through uncharted territory.'
	},
	{
		id: 'awareness',
		name: 'Awareness',
		attributeAssociation: 'prime', // Uses Prime Modifier
		description:
			'Awareness governs your ability to detect the presence of other creatures or objects using your sight, hearing, smell, or other senses.'
	}
];
````

## File: src/lib/rulesdata/traits.ts
````typescript
import type { ITrait } from './types';

export const traitsData: ITrait[] = [
	// Human Traits (p. 108)
	{
		id: 'human_attribute_increase',
		name: 'Attribute Increase',
		description:
			'Choose an Attribute. The chosen Attribute increases by 1 (up to the Attribute Limit).',
		cost: 2,
		effects: [
			{
				type: 'MODIFY_ATTRIBUTE',
				target: 'any_attribute_choice',
				value: 1,
				userChoiceRequired: { prompt: 'Choose an Attribute to increase by 1' }
			}
		]
	},
	{
		id: 'human_skill_expertise',
		name: 'Skill Expertise',
		description:
			'Choose a Skill. Your Mastery Cap and Mastery Level in the chosen Skill both increase by 1. You can only benefit from 1 Feature that increases your Skill Mastery Limit at a time.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_SKILL_EXPERTISE',
				value: { skillId: 'any_skill_choice', capIncrease: 1, levelIncrease: 1 },
				userChoiceRequired: { prompt: 'Choose a skill for Expertise' }
			}
		]
	},
	{
		id: 'human_resolve',
		name: 'Human Resolve',
		description: 'Your Death’s Door Threshold value is expanded by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_DEATH_THRESHOLD_MODIFIER', value: 1 }]
	},
	{
		id: 'human_undying',
		name: 'Undying',
		description: 'You have ADV on Saves against the Doomed Condition.',
		cost: 0,
		isMinor: true,
		effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Doomed' }]
	},
	{
		id: 'human_trade_expertise',
		name: 'Trade Expertise',
		description:
			'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1. You can only benefit from 1 Feature that increases your Trade Mastery Limit at a time.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_TRADE_EXPERTISE',
				value: { tradeId: 'any_trade_choice', capIncrease: 1, levelIncrease: 1 },
				userChoiceRequired: { prompt: 'Choose a Trade for Expertise' }
			}
		]
	},
	{
		id: 'human_determination',
		name: 'Human Determination',
		description:
			'Once per Combat, you can give yourself ADV on an Attack Check or Spell Check while Bloodied.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ADV_ON_CHECK_WHILE_BLOODIED',
				target: 'Attack_or_Spell_Check',
				condition: 'bloodied'
			}
		]
	},
	{
		id: 'human_unbreakable',
		name: 'Unbreakable',
		description: 'You have ADV on Death Saves.',
		cost: 1,
		effects: [{ type: 'GRANT_ADV_ON_SAVE', target: 'Death_Save' }]
	},
	{
		id: 'human_attribute_decrease',
		name: 'Attribute Decrease',
		description:
			'Choose an Attribute. You decrease the chosen Attribute by 1 (to a minimum of -2).',
		cost: -1,
		isNegative: true,
		effects: [
			{
				type: 'MODIFY_ATTRIBUTE',
				target: 'any_attribute_choice',
				value: -1,
				userChoiceRequired: { prompt: 'Choose an Attribute to decrease by 1' }
			}
		]
	},

	// Elf Traits (p. 108)
	{
		id: 'elf_elven_will',
		name: 'Elven Will',
		description: 'You have ADV on Checks and Saves against being Charmed and put to Sleep.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Charmed' },
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Sleep_Magic' }
		]
	},
	{
		id: 'elf_nimble',
		name: 'Nimble',
		description:
			'When you take the Dodge Action, you instead gain the benefits of the Full Dodge Action.',
		cost: 2,
		effects: [
			{ type: 'MODIFY_ACTION_BENEFIT', target: 'Dodge_Action', value: 'Full_Dodge_Benefit' }
		]
	},
	{
		id: 'elf_agile_explorer',
		name: 'Agile Explorer',
		description: 'You’re not affected by Difficult Terrain.',
		cost: 2,
		effects: [{ type: 'IGNORE_DIFFICULT_TERRAIN' }]
	},
	{
		id: 'elf_discerning_sight',
		name: 'Discerning Sight',
		description: 'You have ADV on Checks and Saves made to discern through visual illusions.',
		cost: 0,
		isMinor: true,
		effects: [{ type: 'GRANT_ADV_ON_CHECKS_SAVES_VS_ILLUSION_VISUAL' }]
	},
	{
		id: 'elf_quick_reactions',
		name: 'Quick Reactions',
		description: 'While you aren’t wearing Armor, you gain +1 PD.',
		cost: 1,
		effects: [{ type: 'MODIFY_PD', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'elf_peerless_sight',
		name: 'Peerless Sight',
		description:
			'You don’t have DisADV as a result of making an Attack with a Weapon at Long Range',
		cost: 1,
		effects: [{ type: 'IGNORE_DISADV_ON_RANGED_ATTACK_AT_LONG_RANGE' }]
	},
	{
		id: 'elf_climb_speed',
		name: 'Climb Speed',
		description: 'You gain a Climb Speed equal to your Movement Speed.',
		cost: 1,
		effects: [{ type: 'GRANT_CLIMB_SPEED_EQUAL_TO_SPEED' }]
	},
	{
		id: 'elf_speed_increase',
		name: 'Speed Increase',
		description: 'Your Speed increases by 1 Space.',
		cost: 2,
		effects: [{ type: 'MODIFY_SPEED', value: 5 }] // 1 Space = 5 feet
	},
	{
		id: 'elf_trade_expertise_elf',
		name: 'Trade Expertise (Elf)',
		description:
			'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1. You can only benefit from 1 Feature that increases your Trade Mastery Limit at a time.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_TRADE_EXPERTISE',
				value: { tradeId: 'any_trade_choice', capIncrease: 1, levelIncrease: 1 },
				userChoiceRequired: { prompt: 'Choose a Trade for Expertise' }
			}
		]
	},
	{
		id: 'elf_plant_knowledge',
		name: 'Plant Knowledge',
		description:
			'While within forests, jungles, and swamps, you have ADV on Survival Checks. Additionally, you have ADV on Nature Checks made to recall information about plants.',
		cost: 0,
		isMinor: true,
		effects: [
			{ type: 'GRANT_ADV_ON_SURVIVAL_CHECKS_IN_ENVIRONMENTS', target: 'forests_jungles_swamps' },
			{ type: 'GRANT_ADV_ON_NATURE_CHECKS_ABOUT_PLANTS' }
		]
	},
	{
		id: 'elf_brittle',
		name: 'Brittle',
		description: 'Your AD decreases by 1.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_AD', value: -1 }]
	},
	{
		id: 'elf_frail',
		name: 'Frail',
		description: 'Your HP maximum decreases by 2.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_HP_MAX_STATIC', value: -2 }]
	},
	{
		id: 'elf_might_decrease',
		name: 'Might Decrease',
		description: 'Your Might decreases by 1 (to a minimum of -2).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'might', value: -1 }]
	},

	// Dwarf Traits (p. 109)
	{
		id: 'dwarf_tough',
		name: 'Tough',
		description: 'Your HP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_HP_MAX_STATIC', value: 1 }]
	},
	{
		id: 'dwarf_toxic_fortitude',
		name: 'Toxic Fortitude',
		description: 'You have Poison Resistance (Half) and ADV on Saves against being Poisoned.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE_HALF', target: 'Poison' },
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Poisoned' }
		]
	},
	{
		id: 'dwarf_physically_sturdy',
		name: 'Physically Sturdy',
		description: 'You have ADV on Saves against being Impaired, Deafened, or Petrified.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Impaired' },
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Deafened' },
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Petrified' }
		]
	},
	{
		id: 'dwarf_iron_stomach',
		name: 'Iron Stomach',
		description: 'You have ADV on Saves against effects that come from consuming food or liquids.',
		cost: 0,
		isMinor: true,
		effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_EFFECT_FROM_CONSUMING' }]
	},
	{
		id: 'dwarf_thick_skinned',
		name: 'Thick-Skinned',
		description: 'While you aren’t wearing Armor, you gain +1 AD.',
		cost: 1,
		effects: [{ type: 'MODIFY_AD', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'dwarf_natural_combatant',
		name: 'Natural Combatant',
		description: 'You gain Combat Training with Heavy Armor and All Shields.',
		cost: 1,
		effects: [
			{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Armor' },
			{ type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields' }
		]
	},
	{
		id: 'dwarf_stone_blood',
		name: 'Stone Blood',
		description:
			'You have ADV on Saves against Bleeding. Additionally, you can spend 1 AP to end the Bleeding Condition on yourself.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Bleeding' },
			{ type: 'GRANT_ABILITY', value: 'End_Bleeding_Self_1AP' }
		]
	},
	{
		id: 'dwarf_minor_tremorsense',
		name: 'Minor Tremorsense',
		description: 'You have Tremorsense 3 Spaces.',
		cost: 1,
		effects: [{ type: 'GRANT_TREMORSENSE', value: 3 }]
	},
	{
		id: 'dwarf_stubborn',
		name: 'Stubborn',
		description: 'You have ADV on Saves against being Taunted and against being forcibly moved.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Taunted' },
			{ type: 'GRANT_ADV_ON_SAVE_VS_FORCED_MOVEMENT' }
		]
	},
	{
		id: 'dwarf_trade_expertise',
		name: 'Trade Expertise',
		description:
			'Choose a Crafting or Services Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_TRADE_EXPERTISE',
				value: {
					tradeId: 'any_crafting_or_services_trade_choice',
					capIncrease: 1,
					levelIncrease: 1
				},
				userChoiceRequired: { prompt: 'Choose a Crafting or Services Trade for Expertise' }
			}
		]
	},
	{
		id: 'dwarf_earthen_knowledge',
		name: 'Earthen Knowledge',
		description:
			'While within mountainous and subterranean environments, you have ADV on Survival Checks. Additionally, you have ADV on Nature Checks made to recall information about rocks, soil, crystals, and gems.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ADV_ON_SURVIVAL_CHECKS_IN_ENVIRONMENTS',
				target: 'mountainous_and_subterranean'
			},
			{ type: 'GRANT_ADV_ON_NATURE_CHECKS_ABOUT_ROCKS_SOIL_CRYSTALS_GEMS' }
		]
	},
	{
		id: 'dwarf_charisma_attribute_decrease',
		name: 'Charisma Attribute Decrease',
		description: 'You decrease your Charisma by 1 (to a minimum of -2).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'charisma', value: -1 }]
	},
	{
		id: 'dwarf_short_legged',
		name: 'Short-Legged',
		description: 'Your Speed decreases by 1 Space.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_SPEED', value: -5 }]
	},

	// Halfling Traits (p. 109)
	{
		id: 'halfling_small_sized',
		name: 'Small-Sized',
		description: 'Your Size is considered Small.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_SIZE', target: 'Small' }]
	},
	{
		id: 'halfling_elusive',
		name: 'Elusive',
		description:
			'When you take the Disengage Action, you instead gain the benefits of the Full Disengage Action.',
		cost: 2,
		effects: [
			{ type: 'MODIFY_ACTION_BENEFIT', target: 'Disengage_Action', value: 'Full_Disengage_Action' }
		]
	},
	{
		id: 'halfling_bravery',
		name: 'Halfling Bravery',
		description: 'You have ADV on Saves against being Intimidated, Rattled, or Frightened',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Intimidated' },
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Rattled' },
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Frightened' }
		]
	},
	{
		id: 'halfling_endurance',
		name: 'Halfling Endurance',
		description: 'You have Exhaustion Resistance.',
		cost: 1,
		effects: [{ type: 'GRANT_CONDITION_RESISTANCE', target: 'Exhaustion' }]
	},
	{
		id: 'halfling_deft_footwork',
		name: 'Deft Footwork',
		description:
			'You can move through the space of a hostile creature 1 size larger than you as if it were Difficult Terrain.',
		cost: 1,
		effects: [{ type: 'IGNORE_DIFFICULT_TERRAIN_WHEN_MOVING_THROUGH_SPACE_OF_LARGER_HOSTILE' }]
	},
	{
		id: 'halfling_beast_whisperer',
		name: 'Beast Whisperer',
		description:
			'You can speak to Beasts in a limited manner. They can understand the meanings of simple words, concepts, or states of emotion. You don’t have a special ability to understand them in return.',
		cost: 0,
		isMinor: true,
		effects: [{ type: 'GRANT_LIMITED_COMMUNICATION_WITH_BEASTS' }]
	},
	{
		id: 'halfling_beast_insight',
		name: 'Beast Insight',
		description:
			'You can understand Beasts in a limited manner. You can understand the meaning of their noises and behaviors, though they have no special ability to understand you in return.',
		cost: 1,
		effects: [{ type: 'GRANT_LIMITED_UNDERSTANDING_OF_BEASTS' }]
	},
	{
		id: 'halfling_burst_of_bravery',
		name: 'Burst of Bravery',
		description:
			'Once per Combat, you can end the Intimidated, Rattled, or Frightened Condition on yourself for free at any time.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ABILITY', value: 'End_Intimidated_Rattled_Frightened_Self_OncePerCombat' }
		]
	},
	{
		id: 'halfling_trade_expertise',
		name: 'Trade Expertise',
		description:
			'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_TRADE_EXPERTISE',
				value: { tradeId: 'any_trade_choice', capIncrease: 1, levelIncrease: 1 },
				userChoiceRequired: { prompt: 'Choose a Trade for Expertise' }
			}
		]
	},
	{
		id: 'halfling_critter_knowledge',
		name: 'Critter Knowledge',
		description:
			'You have ADV on Nature, Survival, and Animal Checks involving Small size creatures and smaller.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ADV_ON_CHECKS_INVOLVING_SMALL_CREATURES',
				target: 'Nature_Survival_Animal_Checks'
			}
		]
	},
	{
		id: 'halfling_brittle',
		name: 'Brittle',
		description: 'Your AD decreases by 1.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_AD', value: -1 }]
	},
	{
		id: 'halfling_intelligence_attribute_decrease',
		name: 'Intelligence Attribute Decrease',
		description: 'You decrease your Intelligence by 1 (to a minimum of -2).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'intelligence', value: -1 }]
	},
	{
		id: 'halfling_short_legged',
		name: 'Short-Legged',
		description: 'Your Speed decreases by 1 Space.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_SPEED', value: -5 }]
	},

	// Gnome Traits (p. 110)
	{
		id: 'gnome_small_sized',
		name: 'Small-Sized',
		description: 'Your Size is considered Small.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_SIZE', target: 'Small' }]
	},
	{
		id: 'gnome_escape_artist',
		name: 'Escape Artist',
		description:
			'You have ADV on Checks and Saves to avoid or escape being Grappled or Restrained.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_CHECKS_SAVES_TO_AVOID_ESCAPE', target: 'Grappled_or_Restrained' }
		]
	},
	{
		id: 'gnome_magnified_vision',
		name: 'Magnified Vision',
		description:
			'You have ADV on Investigation Checks made on something you’re holding or touching.',
		cost: 1,
		effects: [{ type: 'GRANT_ADV_ON_INVESTIGATION_CHECKS_ON_HELD_TOUCHED' }]
	},
	{
		id: 'gnome_mental_clarity',
		name: 'Mental Clarity',
		description: 'You have ADV on Saves against being Dazed or Stunned.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Dazed' },
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Stunned' }
		]
	},
	{
		id: 'gnome_strong_minded',
		name: 'Strong-Minded',
		description: 'You gain Psychic Resistance (1).',
		cost: 1,
		effects: [{ type: 'GRANT_RESISTANCE_STATIC', target: 'Psychic', value: 1 }]
	},
	{
		id: 'gnome_predict_weather',
		name: 'Predict Weather',
		description:
			'You can naturally tell what the weather is going to be in the next hour in the area within 1 mile of you. You don’t have DisADV on Checks or Saves as a result of naturally occurring weather.',
		cost: 0,
		isMinor: true,
		effects: [
			{ type: 'GRANT_ABILITY', value: 'Predict_Weather_1Mile_1Hour' },
			{ type: 'IGNORE_DISADV_FROM_NATURAL_WEATHER' }
		]
	},
	{
		id: 'gnome_mana_increase',
		name: 'Mana Increase',
		description: 'Your MP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_MP_MAX', value: 1 }]
	},
	{
		id: 'gnome_trapper',
		name: 'Trapper',
		description:
			'You have ADV on Investigation Checks to spot Traps and on Trickery Checks to Hide Traps.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_INVESTIGATION_CHECKS_TO_SPOT_TRAPS' },
			{ type: 'GRANT_ADV_ON_TRICKERY_CHECKS_TO_HIDE_TRAPS' }
		]
	},
	{
		id: 'gnome_lightning_insulation',
		name: 'Lightning Insulation',
		description: 'You have Lightning Resistance (Half) and can’t be struck by natural lightning.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE_HALF', target: 'Lightning' },
			{ type: 'IMMUNE_TO_NATURAL_LIGHTNING' }
		]
	},
	{
		id: 'gnome_trade_expertise',
		name: 'Trade Expertise',
		description:
			'Choose a Crafting or Subterfuge Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_TRADE_EXPERTISE',
				value: {
					tradeId: 'any_crafting_or_subterfuge_trade_choice',
					capIncrease: 1,
					levelIncrease: 1
				},
				userChoiceRequired: { prompt: 'Choose a Crafting or Subterfuge Trade for Expertise' }
			}
		]
	},
	{
		id: 'gnome_storm_knowledge',
		name: 'Storm Knowledge',
		description:
			'While within rainy, snowy, or stormy environments, you have ADV on Survival Checks. Additionally, you have ADV on Knowledge Checks made to recall information about rain, snow, and storms.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SURVIVAL_CHECKS_IN_ENVIRONMENTS', target: 'rainy_snowy_stormy' },
			{ type: 'GRANT_ADV_ON_KNOWLEDGE_CHECKS_ABOUT_RAIN_SNOW_STORMS' }
		]
	},
	{
		id: 'gnome_agility_attribute_decrease',
		name: 'Agility Decrease',
		description: 'You decrease your Agility by 1 (to a minimum of -2).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'agility', value: -1 }]
	},
	{
		id: 'gnome_short_legged',
		name: 'Short-Legged',
		description: 'Your Speed decreases by 1 Space.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_SPEED', value: -5 }]
	},

	// Orc Traits (p. 110)
	{
		id: 'orc_cursed_mind',
		name: 'Cursed Mind',
		description: 'You gain Psychic Vulnerability (1).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_VULNERABILITY_STATIC', target: 'Psychic', value: 1 }]
	},
	{
		id: 'orc_rush',
		name: 'Orc Rush',
		description:
			'Once per Combat when you willingly move toward an enemy, you can spend 1 AP to gain Temp HP equal to your Prime Modifier.',
		cost: 2,
		effects: [
			{ type: 'GRANT_TEMP_HP_ONCE_PER_COMBAT_WHEN_MOVE_TOWARD_ENEMY', value: 'Prime_Modifier' }
		]
	},
	{
		id: 'orc_brutal_strikes',
		name: 'Brutal Strikes',
		description:
			'You deal +1 damage when you score a Brutal or Critical Hit with a Melee Weapon or Unarmed Strike.',
		cost: 2,
		effects: [
			{
				type: 'MODIFY_DAMAGE_ON_HIT',
				target: 'Melee_Martial_Attack',
				value: 1,
				condition: 'Brutal_or_Critical_Hit'
			}
		]
	},
	{
		id: 'orc_tough',
		name: 'Tough',
		description: 'Your HP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_HP_MAX_STATIC', value: 1 }]
	},
	{
		id: 'orc_orcish_resolve',
		name: 'Orcish Resolve',
		description: 'You gain 1 additional AP while on Death’s Door.',
		cost: 1,
		effects: [{ type: 'MODIFY_AP_WHILE_DEATHS_DOOR', value: 1 }]
	},
	{
		id: 'orc_already_cursed',
		name: 'Already Cursed',
		description: 'You have ADV on Saves against Curses.',
		cost: 0,
		isMinor: true,
		effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Curses' }]
	},
	{
		id: 'orc_intimidating_shout',
		name: 'Intimidating Shout',
		description:
			'Once per Combat, you can spend 1 AP to let out an Intimidating Shout. All creatures within 5 Spaces that can hear you must make a Charisma Save contested by your Attack Check. Failure: A target is Hindered on the next Attack Check or Spell Attack it makes before the start of your next turn.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', value: 'Intimidating_Shout_OncePerCombat_1AP' }]
	},
	{
		id: 'orc_dash',
		name: 'Orc Dash',
		description:
			'Once per Combat you can use your Minor Action to move, as long as that movement is towards an enemy.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', value: 'Move_As_Minor_Action_OncePerCombat_Toward_Enemy' }]
	},
	{
		id: 'orc_finishing_blow',
		name: 'Finishing Blow',
		description: 'You deal +1 damage to creatures who are Well-Bloodied.',
		cost: 1,
		effects: [
			{
				type: 'MODIFY_DAMAGE_ON_HIT',
				target: 'Martial_Attacks',
				value: 1,
				condition: 'Well_Bloodied'
			}
		]
	},
	{
		id: 'orc_imposing_presence',
		name: 'Imposing Presence',
		description:
			'Once per Combat when a creature makes an Attack against you, you can force them to make a Charisma Save. Save Failure: They must choose a new target for the Attack. If there are no other targets, then the Attack is wasted.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', value: 'Force_New_Target_OncePerCombat_Reaction' }]
	},
	{
		id: 'orc_provocation',
		name: 'Provocation',
		description: 'You have DisADV on Checks and Saves against being Taunted.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_DISADV_ON_CHECKS_SAVES_VS_CONDITION', target: 'Taunted' }]
	},
	{
		id: 'orc_reckless',
		name: 'Reckless',
		description: 'Your PD decreases by 1.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_PD', value: -1 }]
	},

	// Dragonborn Traits (p. 111)
	{
		id: 'dragonborn_darkvision',
		name: 'Darkvision',
		description: 'You have Darkvision 10 Spaces.',
		cost: 1,
		effects: [{ type: 'GRANT_DARKVISION', value: 10 }]
	},
	{
		id: 'dragonborn_draconic_resistance',
		name: 'Draconic Resistance',
		description: 'You gain Resistance (Half) to your Draconic damage type.',
		cost: 2,
		effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Draconic_damage_type' }]
	},
	{
		id: 'dragonborn_draconic_breath_weapon',
		name: 'Draconic Breath Weapon',
		description:
			'You gain a Breath Weapon that you can use by spending 2 AP to exhale destructive power in an Area or Focused against a specific target. You can use this ability once per Long Rest, and regain the ability to use it again when you roll for Initiative.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_OncePerLongRest_RegainOnInitiative' }
		]
	},
	{
		id: 'dragonborn_reptilian_superiority',
		name: 'Reptilian Superiority',
		description:
			'You have ADV on Intimidation Checks against reptilian creatures of Medium Size and smaller (not including other Dragonborn).',
		cost: 0,
		isMinor: true,
		effects: [{ type: 'GRANT_ADV_ON_INTIMIDATION_CHECKS_VS_REPTILIAN_MEDIUM_SMALL' }]
	},
	{
		id: 'dragonborn_mana_increase',
		name: 'Mana Increase',
		description: 'Your MP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_MP_MAX', value: 1 }]
	},
	{
		id: 'dragonborn_thick_skinned',
		name: 'Thick-Skinned',
		description: 'While you aren’t wearing Armor, you gain +1 AD.',
		cost: 1,
		effects: [{ type: 'MODIFY_AD', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'dragonborn_second_breath',
		name: 'Second Breath',
		description:
			'You can now use your Draconic Breath Weapon twice per Combat. Additionally, whenever you use your Draconic Breath Weapon, you can spend 2 uses to increase the damage by 2 if its an Area, or by 4 if its Focused.',
		cost: 1,
		prerequisites: ['dragonborn_draconic_breath_weapon'],
		effects: [
			{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_TwicePerCombat' },
			{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_Enhanced_Damage_Spend_Uses' }
		]
	},
	{
		id: 'dragonborn_concussive_breath',
		name: 'Concussive Breath',
		description:
			'When you use your Draconic Breath Weapon, you can force all targets to make a Physical Save. Save Failure: The target is pushed 1 Space away +1 additional Space for every 5 it fails its Save by.',
		cost: 1,
		prerequisites: ['dragonborn_draconic_breath_weapon'],
		effects: [{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_Concussive_Push' }]
	},
	{
		id: 'dragonborn_draconic_affinity',
		name: 'Draconic Affinity',
		description:
			'When you take damage of the same type as your Draconic damage, your next Draconic Breath Weapon deals +1 bonus damage.',
		cost: 1,
		effects: [
			{
				type: 'MODIFY_DAMAGE_ON_NEXT_DRACONIC_BREATH_WEAPON',
				value: 1,
				condition: 'take_same_type_damage'
			}
		]
	},
	{
		id: 'dragonborn_dying_breath',
		name: 'Dying Breath',
		description:
			'Once per Combat when you enter Death’s Door, you regain a use of your Draconic Breath Weapon and can immediately use it as a Reaction for free (0 AP).',
		cost: 1,
		prerequisites: ['dragonborn_draconic_breath_weapon'],
		effects: [{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_Reaction_On_Deaths_Door' }]
	},
	{
		id: 'dragonborn_draconic_ward',
		name: 'Draconic Ward',
		description:
			'Once per Combat when you enter Death’s Door, you gain 2 Temp HP. Whenever you’re Hit by a Melee Attack while you have this Temp HP, your Attacker takes 1 Draconic damage.',
		cost: 1,
		effects: [
			{ type: 'GRANT_TEMP_HP_ONCE_PER_COMBAT_ON_DEATHS_DOOR', value: 2 },
			{ type: 'GRANT_DAMAGE_ON_MELEE_HIT_WHILE_TEMP_HP', target: 'Draconic_damage_type', value: 1 }
		]
	},
	{
		id: 'dragonborn_draconic_protection',
		name: 'Draconic Protection',
		description:
			'Once per Combat, when an ally within 20 Spaces is on Death’s Door, you begin to surge with an ancient power. While they remain on Death’s Door their PD and AD increases by 5 until Combat ends.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', value: 'Increase_PD_AD_Ally_On_Deaths_Door' }]
	},
	{
		id: 'dragonborn_glide_speed',
		name: 'Glide Speed',
		description:
			'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren’t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
		cost: 2,
		effects: [{ type: 'GRANT_GLIDE_SPEED' }]
	},
	{
		id: 'dragonborn_guardians_bond',
		name: 'Guardian’s Bond',
		description:
			'Once per Combat when an ally enters Death’s Door within 20 Spaces of you, you take an amount of True damage equal to your Prime Modifier.',
		cost: -1,
		isNegative: true,
		effects: [
			{ type: 'TAKE_TRUE_DAMAGE_ONCE_PER_COMBAT_WHEN_ALLY_DEATHS_DOOR', value: 'Prime_Modifier' }
		]
	},

	// Giantborn Traits (p. 112)
	{
		id: 'giantborn_tough',
		name: 'Tough',
		description: 'Your HP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_HP_MAX_STATIC', value: 1 }]
	},
	{
		id: 'giantborn_powerful_build',
		name: 'Powerful Build',
		description: 'You increase by 1 Size, but you occupy the Space of a creature 1 Size smaller.',
		cost: 2,
		effects: [
			{ type: 'MODIFY_SIZE', target: 'Large' },
			{ type: 'MODIFY_SPACE_OCCUPIED', target: '1_Size_Smaller' }
		]
	},
	{
		id: 'giantborn_unstoppable',
		name: 'Unstoppable',
		description: 'You have ADV on Saves against being Slowed or Stunned.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Slowed' },
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Stunned' }
		]
	},
	{
		id: 'giantborn_giants_resolve',
		name: 'Giant’s Resolve',
		description: 'While on Death’s Door, you reduce all damage taken by 1.',
		cost: 1,
		effects: [{ type: 'REDUCE_DAMAGE_TAKEN', value: 1, condition: 'deaths_door' }]
	},
	{
		id: 'giantborn_unyielding_movement',
		name: 'Unyielding Movement',
		description: 'You’re immune to being Slowed 2 (or higher).',
		cost: 0,
		isMinor: true,
		effects: [{ type: 'IMMUNE_TO_SLOWED_2_OR_HIGHER' }]
	},
	{
		id: 'giantborn_giants_fortitude',
		name: 'Giant’s Fortitude',
		description: 'You also gain the benefits of your Giant’s Resolve Trait while Well-Bloodied.',
		cost: 2,
		prerequisites: ['giantborn_giants_resolve'],
		effects: [{ type: 'GRANT_BENEFIT_WHILE_WELL_BLOODIED', target: 'giantborn_giants_resolve' }]
	},
	{
		id: 'giantborn_strong_body',
		name: 'Strong Body',
		description:
			'Once per Combat when you take damage from an Attack, you can reduce the damage taken by an amount equal to your Might or Agility (your choice).',
		cost: 2,
		effects: [{ type: 'REDUCE_DAMAGE_TAKEN_ONCE_PER_COMBAT', value: 'Might_or_Agility' }]
	},
	{
		id: 'giantborn_mighty_hurl',
		name: 'Mighty Hurl',
		description:
			'You throw creatures 1 Space farther than normal, and objects (including Weapons) 5 Spaces farther than normal.',
		cost: 1,
		effects: [
			{ type: 'MODIFY_THROW_DISTANCE_CREATURES', value: 1 },
			{ type: 'MODIFY_THROW_DISTANCE_OBJECTS', value: 5 }
		]
	},
	{
		id: 'giantborn_titanic_toss',
		name: 'Titanic Toss',
		description:
			'You have ADV on Checks made to throw creatures. Additionally, you don’t have DisADV as a result of making an Attack with a Weapon with the Toss or Thrown Property at Long Range.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_CHECKS', target: 'Throw_Creatures' },
			{ type: 'IGNORE_DISADV_ON_RANGED_ATTACK_WITH_TOSS_THROWN_AT_LONG_RANGE' }
		]
	},
	{
		id: 'giantborn_mighty_leap',
		name: 'Mighty Leap',
		description:
			'You can use your Might instead of Agility to determine your Jump Distance and the damage you take from Falling.',
		cost: 1,
		effects: [{ type: 'USE_ATTRIBUTE_FOR_JUMP_DISTANCE_FALLING_DAMAGE', target: 'Might' }]
	},
	{
		id: 'giantborn_brute',
		name: 'Brute',
		description: 'Once per Combat, you can take the Shove or Grapple Action as a Minor Action.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', value: 'Shove_or_Grapple_As_Minor_Action_OncePerCombat' }]
	},
	{
		id: 'giantborn_heavy_riser',
		name: 'Heavy Riser',
		description: 'You have to spend 4 Spaces of movement to stand up from Prone.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_MOVEMENT_TO_STAND_UP', value: 4 }]
	},
	{
		id: 'giantborn_clumsiness',
		name: 'Clumsiness',
		description: 'You have DisADV on Agility Checks.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_DISADV_ON_CHECKS', target: 'Agility_Checks' }]
	},
	{
		id: 'giantborn_intelligence_attribute_decrease',
		name: 'Intelligence Decrease',
		description: 'You decrease your Intelligence by 1 (to a minimum of -2).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'intelligence', value: -1 }]
	},

	// Angelborn Traits (p. 113)
	{
		id: 'angelborn_radiant_resistance',
		name: 'Radiant Resistance',
		description: 'You have Resistance (Half) to Radiant damage.',
		cost: 1,
		effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Radiant' }]
	},
	{
		id: 'angelborn_celestial_magic',
		name: 'Celestial Magic',
		description:
			'You learn 1 Spell of your choice from the Divine Spell List (Holy & Restoration during the Beta). Once per Long Rest, you can cast the chosen Spell spending 1 less MP than normal (minimum of 0 MP). The Spells total MP cost (before all reductions) still can’t exceed your Mana Spend Limit.',
		cost: 2,
		effects: [
			{ type: 'GRANT_SPELL_FROM_LIST', target: 'Divine_Spell_List' },
			{ type: 'REDUCE_MP_COST_ONCE_PER_LONG_REST', value: 1 }
		]
	},
	{
		id: 'angelborn_healing_touch',
		name: 'Healing Touch',
		description:
			'Once per Combat, you can spend 1 AP to touch a creature and Heal it. Make a DC 10 Spell Check. Success: You can restore up to 2 HP to the target. Success (each 5): +1 HP. Failure: You only restore 2 HP.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', value: 'Healing_Touch_OncePerCombat_1AP' }]
	},
	{
		id: 'angelborn_divine_glow',
		name: 'Divine Glow',
		description: 'Your body can emit a Bright Light in a 5 Space radius around you at will.',
		cost: 0,
		isMinor: true,
		effects: [{ type: 'GRANT_ABILITY', value: 'Emit_Bright_Light_5Space_Radius_AtWill' }]
	},
	{
		id: 'angelborn_mana_increase',
		name: 'Mana Increase',
		description: 'Your MP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_MP_MAX', value: 1 }]
	},
	{
		id: 'angelborn_celestial_clarity',
		name: 'Celestial Clarity',
		description: 'You have ADV on Saves against being Blinded or Deafened.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Blinded' },
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Deafened' }
		]
	},
	{
		id: 'angelborn_angelic_insight',
		name: 'Angelic Insight',
		description:
			'Once per Long Rest you can grant yourself ADV on an Insight Check to see if someone is lying.',
		cost: 1,
		effects: [{ type: 'GRANT_ADV_ON_INSIGHT_CHECK_ONCE_PER_LONG_REST', condition: 'see_if_lying' }]
	},
	{
		id: 'angelborn_gift_of_the_angels',
		name: 'Gift of the Angels',
		description:
			'Once per Combat you can spend 1 AP and 1 MP and touch a creature to heal them over time. The creature recovers 1 HP at the start of each of their turns for 1 minute (5 Rounds).',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', value: 'Heal_Over_Time_OncePerCombat_1AP_1MP' }]
	},
	{
		id: 'angelborn_blinding_light',
		name: 'Blinding Light',
		description:
			'Once per Combat, you can spend 1 AP to choose a creature within 5 Spaces and make a Spell Check contested by its Physical Save. Success: The target is Blinded until the end of your next turn.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', value: 'Blind_Target_OncePerCombat_1AP' }]
	},
	{
		id: 'angelborn_glide_speed',
		name: 'Glide Speed',
		description:
			'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren’t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
		cost: 2,
		effects: [{ type: 'GRANT_GLIDE_SPEED' }]
	},
	{
		id: 'angelborn_pacifist',
		name: 'Pacifist',
		description:
			'Your divine call is to put others before yourself and resist doing harm. You suffer a -1 penalty to all Checks and Saves made during the first round of Combat.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'PENALTY_ON_CHECKS_SAVES_FIRST_ROUND_OF_COMBAT', value: -1 }]
	},
	{
		id: 'angelborn_umbral_weakness',
		name: 'Umbral Weakness',
		description: 'You have Umbral Vulnerability (1).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_VULNERABILITY_STATIC', target: 'Umbral', value: 1 }]
	},

	// Fiendborn Traits (p. 114)
	{
		id: 'fiendborn_fiendish_resistance',
		name: 'Fiendish Resistance',
		description: 'You gain Resistance (Half) to your Fiendish damage type.',
		cost: 2,
		effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Fiendish_damage_type' }]
	},
	{
		id: 'fiendborn_fiendish_magic',
		name: 'Fiendish Magic',
		description:
			'You learn 1 Spell of your choice from the Arcane Spell List from the Destruction or Enchantment Spell Schools. If the Spell deals damage, it must be the same damage type as your Fiendish damage. Once per Long Rest, you can cast the chosen Spell spending 1 less MP than normal (minimum of 0 MP). The Spells total MP cost (before all reductions) still can’t exceed your Mana Spend Limit.',
		cost: 2,
		effects: [
			{
				type: 'GRANT_SPELL_FROM_LIST_SCHOOLS',
				target: 'Arcane_Spell_List',
				schools: ['Destruction', 'Enchantment']
			},
			{
				type: 'REDUCE_MP_COST_ONCE_PER_LONG_REST',
				value: 1,
				condition: 'spell_damage_type_matches_fiendish'
			}
		]
	},
	{
		id: 'fiendborn_darkvision',
		name: 'Darkvision',
		description: 'You have a Darkvision of 10 Spaces.',
		cost: 1,
		effects: [{ type: 'GRANT_DARKVISION', value: 10 }]
	},
	{
		id: 'fiendborn_lights_bane',
		name: 'Light’s Bane',
		description: 'You can spend 1 AP to snuff out a mundane light source within 5 Spaces of you.',
		cost: 0,
		isMinor: true,
		effects: [{ type: 'GRANT_ABILITY', value: 'Snuff_Out_Mundane_Light_Source_1AP' }]
	},
	{
		id: 'fiendborn_mana_increase',
		name: 'Mana Increase',
		description: 'Your MP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_MP_MAX', value: 1 }]
	},
	{
		id: 'fiendborn_silver_tongued',
		name: 'Silver-Tongued',
		description:
			'Once per Long Rest you can grant yourself ADV on an Influence Check when trying to deceive someone.',
		cost: 1,
		effects: [
			{ type: 'GRANT_ADV_ON_INFLUENCE_CHECK_ONCE_PER_LONG_REST', condition: 'trying_to_deceive' }
		]
	},
	{
		id: 'fiendborn_fiendish_aura',
		name: 'Fiendish Aura',
		description:
			'You learn the Sorcery Cantrip, but you must choose the type of energy that’s the same as your Fiendish Origin.',
		cost: 1,
		effects: [
			{ type: 'GRANT_SPELL_KNOWN', value: 'Sorcery_Cantrip' },
			{ type: 'SET_SORCERY_ENERGY_TYPE', target: 'Fiendish_Origin' }
		]
	},
	{
		id: 'fiendborn_superior_darkvision',
		name: 'Superior Darkvision',
		description: 'Your Darkvision increases to 20 Spaces.',
		cost: 1,
		prerequisites: ['fiendborn_darkvision'],
		effects: [{ type: 'MODIFY_DARKVISION', value: 20 }]
	},
	{
		id: 'fiendborn_infernal_bravery',
		name: 'Infernal Bravery',
		description: 'You have ADV on Saves against being Intimidated.',
		cost: 1,
		effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Intimidated' }]
	},
	{
		id: 'fiendborn_intimidator',
		name: 'Intimidator',
		description: 'Once per Combat you can take the Intimidate Action as a Minor Action.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', value: 'Intimidate_As_Minor_Action_OncePerCombat' }]
	},
	{
		id: 'fiendborn_charming_gaze',
		name: 'Charming Gaze',
		description:
			'You can spend 1 AP to gaze upon a creature you can see within 10 Spaces that can also see you. Make a Spell Check contested by the target’s Repeated Charisma Save. Success: The creature becomes Charmed by you for 1 minute. You can use this ability once per Long Rest, and when you roll for Initiative, or meet some other unique criteria at the GM’s discretion, this ability recharges.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', value: 'Charm_Target_OncePerLongRest_1AP' }]
	},
	{
		id: 'fiendborn_glide_speed',
		name: 'Glide Speed',
		description:
			'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren’t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
		cost: 2,
		effects: [{ type: 'GRANT_GLIDE_SPEED' }]
	},
	{
		id: 'fiendborn_radiant_weakness',
		name: 'Radiant Weakness',
		description: 'You have Radiant Vulnerability (1).',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'GRANT_VULNERABILITY_STATIC', target: 'Radiant', value: 1 }]
	},
	{
		id: 'fiendborn_divine_dampening',
		name: 'Divine Dampening',
		description: 'You recover 1 less HP when healed from divine sources.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'REDUCE_HP_REGAINED_FROM_DIVINE_SOURCES', value: 1 }]
	},

	// Beastborn Traits (p. 115-116)
	{
		id: 'beastborn_darkvision',
		name: 'Darkvision',
		description: 'You have Darkvision 10 Spaces.',
		cost: 1,
		effects: [{ type: 'GRANT_DARKVISION', value: 10 }]
	},
	{
		id: 'beastborn_echolocation',
		name: 'Echolocation',
		description:
			'You can spend 1 AP to roar, scream, or screech to gain Blindsight in a 10 Spaces radius that lasts until the start of your next turn. The sound can be heard from up to 100 Spaces away. You gain no benefit from this Trait in an area of Silence.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', value: 'Echolocation_1AP_10Space_1Round' }]
	},
	{
		id: 'beastborn_keen_sense',
		name: 'Keen Sense',
		description:
			'Choose 1 of the following senses: hearing, sight, or smell. You make Awareness Checks with ADV using the chosen sense.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_ADV_ON_AWARENESS_CHECKS_USING_SENSE',
				target: 'chosen_sense',
				userChoiceRequired: { prompt: 'Choose a sense: hearing, sight, or smell' }
			}
		]
		// This trait can be chosen multiple times, but the interface doesn't directly support that.
		// The logic for handling multiple selections will need to be in the application.
	},
	{
		id: 'beastborn_sunlight_sensitivity',
		name: 'Sunlight Sensitivity',
		description:
			'While you or your target is in sunlight, you have DisADV on Attacks and Awareness Checks that rely on sight.',
		cost: -2,
		isNegative: true,
		effects: [{ type: 'GRANT_DISADV_ON_ATTACKS_AWARENESS_CHECKS_IN_SUNLIGHT' }]
	},
	{
		id: 'beastborn_quick_reactions',
		name: 'Quick Reactions',
		description: 'While you aren’t wearing Armor, you gain +1 PD.',
		cost: 1,
		effects: [{ type: 'MODIFY_PD', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'beastborn_climb_speed',
		name: 'Climb Speed',
		description: 'You gain a Climb Speed equal to your Ground Speed.',
		cost: 1,
		effects: [{ type: 'GRANT_CLIMB_SPEED_EQUAL_TO_SPEED' }]
	},
	{
		id: 'beastborn_spider_climb',
		name: 'Spider Climb',
		description:
			'You can walk without falling on the ceiling and vertical surfaces normally without needing to Climb.',
		cost: 1,
		prerequisites: ['beastborn_climb_speed'],
		effects: [{ type: 'GRANT_ABILITY', value: 'Walk_On_Vertical_Surfaces_Ceilings' }]
	},
	{
		id: 'beastborn_web_walk',
		name: 'Web Walk',
		description:
			'You can walk along and through webs unimpeded. Additionally, you know the location of any creature that’s in contact with the same web.',
		cost: 1,
		effects: [
			{ type: 'IGNORE_DIFFICULT_TERRAIN_FROM_WEBS' },
			{ type: 'KNOW_LOCATION_OF_CREATURES_IN_CONTACT_WITH_WEB' }
		]
	},
	{
		id: 'beastborn_water_breathing',
		name: 'Water Breathing',
		description: 'You can breathe underwater.',
		cost: 1,
		effects: [{ type: 'GRANT_WATER_BREATHING' }]
	},
	{
		id: 'beastborn_swim_speed',
		name: 'Swim Speed',
		description:
			'You gain a Swim Speed equal to your Ground Speed. Additionally, your Breath Duration increases by 3.',
		cost: 1,
		effects: [
			{ type: 'GRANT_SWIM_SPEED_EQUAL_TO_SPEED' },
			{ type: 'MODIFY_BREATH_DURATION', value: 3 }
		]
	},
	{
		id: 'beastborn_speed_increase',
		name: 'Speed Increase',
		description: 'Your Speed increases by 1 Space.',
		cost: 2,
		effects: [{ type: 'MODIFY_SPEED', value: 5 }]
		// This trait can be chosen up to 5 times, but the interface doesn't directly support that.
		// The logic for handling multiple selections will need to be in the application.
	},
	{
		id: 'beastborn_sprint',
		name: 'Sprint',
		description:
			'You can use your Minor Action to take the Move Action. Once you use this Trait, you can’t use it again until you take a turn without taking the Move Action.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', value: 'Move_As_Minor_Action_OncePerTurn_NoMoveAction' }]
	},
	{
		id: 'beastborn_charge',
		name: 'Charge',
		description:
			'If you move at least 2 Spaces in a straight line before making a Melee Attack, the damage of the Attack increases by 1.',
		cost: 2,
		effects: [
			{
				type: 'MODIFY_DAMAGE_ON_MELEE_ATTACK',
				value: 1,
				condition: 'move_2_spaces_straight_before'
			}
		]
	},
	{
		id: 'beastborn_burrow_speed',
		name: 'Burrow Speed',
		description: 'You gain a Burrow Speed equal to half your Movement Speed.',
		cost: 2,
		effects: [{ type: 'GRANT_BURROW_SPEED_HALF_SPEED' }]
	},
	{
		id: 'beastborn_jumper',
		name: 'Jumper',
		description:
			'Your Jump Distance increases by 2, and you can take the Jump Action as a Minor Action.',
		cost: 1,
		effects: [
			{ type: 'MODIFY_JUMP_DISTANCE', value: 2 },
			{ type: 'GRANT_ABILITY', value: 'Jump_As_Minor_Action' }
		]
	},
	{
		id: 'beastborn_strong_jumper',
		name: 'Strong Jumper',
		description:
			'You no longer need to move 2 Spaces before performing a Running Jump, and you take 0 damage from Controlled Falling 5 Spaces or less.',
		cost: 1,
		effects: [
			{ type: 'IGNORE_2_SPACES_MOVEMENT_FOR_RUNNING_JUMP' },
			{ type: 'IGNORE_FALLING_DAMAGE_5_SPACES_OR_LESS' }
		]
	},
	{
		id: 'beastborn_glide_speed',
		name: 'Glide Speed',
		description:
			'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren’t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
		cost: 2,
		effects: [{ type: 'GRANT_GLIDE_SPEED' }]
	},
	{
		id: 'beastborn_limited_flight',
		name: 'Limited Flight',
		description:
			'You have a set of wings that grant you limited flight. Provided you aren’t Incapacitated, you gain the following benefits: Vertical Ascent: You can spend 2 Spaces of movement to ascend 1 Space vertically. Hover: When you end your turn in the air, you maintain your altitude.',
		cost: 2,
		prerequisites: ['beastborn_glide_speed'],
		effects: [{ type: 'GRANT_LIMITED_FLIGHT' }]
	},
	{
		id: 'beastborn_full_flight',
		name: 'Full Flight',
		description: 'You have a Fly Speed equal to your Ground Speed.',
		cost: 2,
		prerequisites: ['beastborn_limited_flight'],
		effects: [{ type: 'GRANT_FLY_SPEED_EQUAL_TO_SPEED' }]
	},
	{
		id: 'beastborn_flyby',
		name: 'Flyby',
		description: 'You don’t provoke Opportunity Attacks when you Fly out of an enemy’s reach.',
		cost: 1,
		prerequisites: ['beastborn_limited_flight'],
		effects: [{ type: 'IGNORE_OPPORTUNITY_ATTACKS_WHEN_FLY_OUT_OF_REACH' }]
	},
	{
		id: 'beastborn_stealth_feathers',
		name: 'Stealth Feathers',
		description: 'You have ADV on Stealth Checks while Flying.',
		cost: 2,
		prerequisites: ['beastborn_limited_flight'],
		effects: [{ type: 'GRANT_ADV_ON_STEALTH_CHECKS_WHILE_FLYING' }]
	},
	{
		id: 'beastborn_winged_arms',
		name: 'Winged Arms',
		description:
			'Your arms are also your wings. Anytime you use a Glide Speed or Flying Speed, you can’t hold anything in your hands.',
		cost: -1,
		isNegative: true,
		prerequisites: ['beastborn_limited_flight'], // Assuming Limited Flight or Full Flight
		effects: [{ type: 'PENALTY_CANT_HOLD_WHILE_FLYING' }]
	},
	{
		id: 'beastborn_tough',
		name: 'Tough',
		description: 'Your HP maximum increases by 1.',
		cost: 1,
		effects: [{ type: 'MODIFY_HP_MAX_STATIC', value: 1 }]
	},
	{
		id: 'beastborn_thick_skinned',
		name: 'Thick-Skinned',
		description: 'While you aren’t wearing Armor, you gain +1 AD.',
		cost: 1,
		effects: [{ type: 'MODIFY_AD', value: 1, condition: 'not_wearing_armor' }]
	},
	{
		id: 'beastborn_powerful_build',
		name: 'Powerful Build',
		description: 'You increase by 1 Size, but you occupy the Space of a creature 1 Size smaller.',
		cost: 2,
		effects: [
			{ type: 'MODIFY_SIZE', target: 'Large' },
			{ type: 'MODIFY_SPACE_OCCUPIED', target: '1_Size_Smaller' }
		]
	},
	{
		id: 'beastborn_long_limbed',
		name: 'Long-Limbed',
		description: 'When you make a Melee Martial Attack, your reach is 1 Space greater than normal.',
		cost: 3,
		effects: [{ type: 'MODIFY_MELEE_REACH', value: 1 }]
	},
	{
		id: 'beastborn_secondary_arms',
		name: 'Secondary Arms',
		description:
			'You have 2 slightly smaller secondary arms below your primary pair of arms. They function just like your primary arms, but they can’t wield Weapons with the Heavy Property or Shields.',
		cost: 1,
		effects: [{ type: 'GRANT_SECONDARY_ARMS' }]
	},
	{
		id: 'beastborn_prehensile_appendage',
		name: 'Prehensile Appendage',
		description:
			'You have a prehensile tail or trunk that has a reach of 1 Space and can lift up an amount of pounds equal to your Might times 5 (or half as many kilograms). You can use it to lift, hold, or drop objects, and to push, pull, or grapple creatures. It can’t wield Weapons or Shields, you can’t use tools with it that require manual precision, and you can’t use it in place of Somatic Components for Spells.',
		cost: 1,
		effects: [{ type: 'GRANT_PREHENSILE_APPENDAGE' }]
	},
	{
		id: 'beastborn_hazardous_hide',
		name: 'Hazardous Hide',
		description:
			'You have spikes, retractable barbs, poisonous skin, or some other form of defense mechanism to keep creatures from touching you. Choose 1 of the following damage types: Corrosion, Piercing, or Poison. While you are physically Grappled, your Grappler takes 1 damage of the chosen type at the start of each of its turns. Creatures that start their turn Grappled by you also take this damage.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_DAMAGE_TO_GRAPPLER',
				target: 'chosen_damage_type',
				value: 1,
				userChoiceRequired: { prompt: 'Choose a damage type: Corrosion, Piercing, or Poison' }
			}
		]
	},
	{
		id: 'beastborn_natural_armor',
		name: 'Natural Armor',
		description: 'While not wearing Armor, you gain PDR.',
		cost: 2,
		prerequisites: ['beastborn_thick_skinned'],
		effects: [{ type: 'GRANT_PDR', condition: 'not_wearing_armor' }]
	},
	{
		id: 'beastborn_hard_shell',
		name: 'Hard Shell',
		description:
			'You have a large shell around your body for protection. Your AD increases by 1 (while you’re not wearing Armor), your Movement Speed decreases by 1, and you’re immune to being Flanked.',
		cost: 1,
		prerequisites: ['beastborn_thick_skinned'],
		effects: [
			{ type: 'MODIFY_AD', value: 1, condition: 'not_wearing_armor' },
			{ type: 'MODIFY_SPEED', value: -5 },
			{ type: 'IMMUNE_TO_FLANKING' }
		]
	},
	{
		id: 'beastborn_shell_retreat',
		name: 'Shell Retreat',
		description:
			'Your body has a shell that you can retreat into. You can spend 1 AP to retreat into or come back out of your shell. You gain +5 PD and AD, PDR, EDR and ADV on Might Saves. While in your shell, you’re Prone, you can’t move, you have DisADV on Agility Saves, and you can’t take Reactions.',
		cost: 1,
		prerequisites: ['beastborn_hard_shell'],
		effects: [{ type: 'GRANT_ABILITY', value: 'Retreat_Into_Shell_1AP' }]
	},
	{
		id: 'beastborn_camouflage',
		name: 'Camouflage',
		description:
			'You can change the color and pattern of your body. You have ADV on Stealth Checks while motionless.',
		cost: 2,
		effects: [{ type: 'GRANT_ADV_ON_STEALTH_CHECKS_WHILE_MOTIONLESS' }]
	},
	{
		id: 'beastborn_prowler',
		name: 'Prowler',
		description: 'You have ADV on Stealth Checks while in Darkness.',
		cost: 1,
		effects: [{ type: 'GRANT_ADV_ON_STEALTH_CHECKS_WHILE_IN_DARKNESS' }]
	},
	{
		id: 'beastborn_cold_resistance',
		name: 'Cold Resistance',
		description:
			'You have Cold Resistance (Half) and Resistance to Exhaustion from cold temperatures.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE_HALF', target: 'Cold' },
			{ type: 'GRANT_RESISTANCE_TO_EXHAUSTION', condition: 'cold_temperatures' }
		]
	},
	{
		id: 'beastborn_fire_resistance',
		name: 'Fire Resistance',
		description:
			'You have Fire Resistance (Half) and Resistance to Exhaustion from hot temperatures.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE_HALF', target: 'Fire' },
			{ type: 'GRANT_RESISTANCE_TO_EXHAUSTION', condition: 'hot_temperatures' }
		]
	},
	{
		id: 'beastborn_short_legged',
		name: 'Short-Legged',
		description: 'Your Speed decreases by 1 Space.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_SPEED', value: -5 }]
	},
	{
		id: 'beastborn_small_sized',
		name: 'Small-Sized',
		description: 'Your Size is considered Small.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_SIZE', target: 'Small' }]
	},
	{
		id: 'beastborn_reckless',
		name: 'Reckless',
		description: 'Your PD decreases by 1.',
		cost: -1,
		isNegative: true,
		effects: [{ type: 'MODIFY_PD', value: -1 }]
	},
	{
		id: 'beastborn_natural_weapon',
		name: 'Natural Weapon',
		description:
			'You have up to 2 Natural Weapons (claws, horns, fangs, tail, etc.) which you can use to make Unarmed Strikes that deal 1 Bludgeoning, Piercing, or Slashing damage (your choice upon gaining this Trait). You can perform Attack Maneuvers with your Natural Weapons.',
		cost: 1,
		effects: [
			{
				type: 'GRANT_NATURAL_WEAPON',
				value: 1,
				userChoiceRequired: { prompt: 'Choose a damage type: Bludgeoning, Piercing, or Slashing' }
			}
		]
		// This trait can be chosen multiple times, but the interface doesn't directly support that.
		// The logic for handling multiple selections will need to be in the application.
	},
	{
		id: 'beastborn_extended_natural_weapon',
		name: 'Extended Natural Weapon',
		description: 'Your Natural Weapon now has the Reach Property.',
		cost: 2,
		prerequisites: ['beastborn_natural_weapon'],
		effects: [{ type: 'GRANT_PROPERTY_TO_NATURAL_WEAPON', target: 'Reach' }]
	},
	{
		id: 'beastborn_natural_projectile',
		name: 'Natural Projectile',
		description:
			'You can use your Natural Weapon to make a Ranged Martial Attack with a Range of 10 Spaces. The Natural Weapon might produce a spine, barb, fluid, or other harmful projectile (your choice).',
		cost: 1,
		prerequisites: ['beastborn_natural_weapon'],
		effects: [{ type: 'GRANT_ABILITY', value: 'Natural_Projectile_Ranged_Attack' }]
	},
	{
		id: 'beastborn_natural_weapon_passive',
		name: 'Natural Weapon Passive',
		description:
			'You can choose 1 Weapon Style that fits your desired Natural Weapon. You can benefit from the chosen Weapon Style’s passive with your Natural Weapon.',
		cost: 1,
		prerequisites: ['beastborn_natural_weapon'],
		effects: [
			{
				type: 'GRANT_WEAPON_STYLE_PASSIVE_TO_NATURAL_WEAPON',
				target: 'chosen_weapon_style',
				userChoiceRequired: { prompt: 'Choose a Weapon Style' }
			}
		]
	},
	{
		id: 'beastborn_rend',
		name: 'Rend',
		description:
			'You can spend 1 AP when making an Attack Check with your Natural Weapon to force the target to make a Physical Save. Failure: Target begins Bleeding.',
		cost: 1,
		prerequisites: ['beastborn_natural_weapon'],
		effects: [{ type: 'GRANT_ABILITY', value: 'Rend_Bleeding_1AP' }]
	},
	{
		id: 'beastborn_retractable_natural_weapon',
		name: 'Retractable Natural Weapon',
		description:
			'Your Natural Weapon is able to be concealed or retracted and gains the Concealable Property (gain ADV on the first Attack Check you make in Combat).',
		cost: 1,
		prerequisites: ['beastborn_natural_weapon'],
		effects: [{ type: 'GRANT_PROPERTY_TO_NATURAL_WEAPON', target: 'Concealable' }]
	},
	{
		id: 'beastborn_venomous_natural_weapon',
		name: 'Venomous Natural Weapon',
		description:
			'When you Hit a creature with your Natural Weapon, they make a Physical Save against your Save DC. Failure: The target becomes Impaired until the start of your next turn.',
		cost: 1,
		prerequisites: ['beastborn_natural_weapon'],
		effects: [{ type: 'GRANT_ABILITY', value: 'Venomous_Natural_Weapon_Impaired' }]
	},
	{
		id: 'beastborn_fast_reflexes',
		name: 'Fast Reflexes',
		description:
			'You gain ADV on Initiative Checks and on the first Attack Check you make in Combat.',
		cost: 2,
		effects: [
			{ type: 'GRANT_ADV_ON_INITIATIVE_CHECKS' },
			{ type: 'GRANT_ADV_ON_FIRST_ATTACK_CHECK_IN_COMBAT' }
		]
	},
	{
		id: 'beastborn_mimicry',
		name: 'Mimicry',
		description:
			'You can mimic simple sounds that you’ve heard (such as a baby’s crying, the creak of a door, or single words) and repeat short 3 word phrases that sound identical to what you heard. A creature can make an Insight Check contested by your Trickery Check to determine if this sound is real.',
		cost: 1,
		effects: [{ type: 'GRANT_ABILITY', value: 'Mimic_Simple_Sounds_Short_Phrases' }]
	},
	{
		id: 'beastborn_intimidating_shout',
		name: 'Intimidating Shout',
		description:
			'Once per Combat, you can spend 1 AP to let out an Intimidating Shout. All creatures within 5 Spaces that can hear you must make a Charisma Save contested by your Attack Check. Failure: A target is Hindered on the next Attack Check or Spell Attack it makes before the start of your next turn.',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', value: 'Intimidating_Shout_OncePerCombat_1AP' }]
	},
	{
		id: 'beastborn_toxic_fortitude',
		name: 'Toxic Fortitude',
		description: 'You have Poison Resistance (Half) and ADV on Saves against being Poisoned.',
		cost: 2,
		effects: [
			{ type: 'GRANT_RESISTANCE_HALF', target: 'Poison' },
			{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Poisoned' }
		]
	},
	{
		id: 'beastborn_shoot_webs',
		name: 'Shoot Webs',
		description:
			'You can spend 1 AP to shoot web at a target within 5 Spaces. Make an Attack Check contested by the target’s Physical Save. Success: The target is Restrained by webbing and can spend 1 AP on their turn to attempt to escape (Martial Check vs your Save DC). The webbing can also be attacked and destroyed (PD 5, AD 10, 2 HP; Immunity to Bludgeoning, Poison, and Psychic damage).',
		cost: 2,
		effects: [{ type: 'GRANT_ABILITY', value: 'Shoot_Webs_1AP' }]
	}
];
````

## File: src/lib/rulesdata/types.ts
````typescript
// src/lib/rulesdata/types.ts

// Interface for Attribute Data
export interface IAttributeData {
	id: 'might' | 'agility' | 'charisma' | 'intelligence';
	name: string;
	description: string;
	derivedStats?: Array<{ statName: string; formula: string }>;
}

// Interface for Trait Effects
export interface ITraitEffect {
	type: string; // e.g., 'MODIFY_ATTRIBUTE', 'GRANT_SKILL_EXPERTISE', 'GRANT_FEATURE'
	target?: string; // e.g., attribute ID ('might'), skill ID ('athletics'), feature ID ('rage')
	value?: any; // e.g., number for attribute modification, object for skill expertise details
	condition?: string; // Optional condition for the effect to apply
	userChoiceRequired?: {
		// Details if the user needs to make a choice for this effect
		prompt: string; // Prompt shown to the user
		options?: string[]; // Optional list of specific options (e.g., skill IDs, attribute IDs)
	};
	descriptionOverride?: string; // Optional override for how this effect is described
	subFeature?: string; // Optional sub-feature identifier for complex effects
	schools?: string[]; // Optional list of spell schools associated with the effect
}

// Interface for Traits
export interface ITrait {
	id: string;
	name: string;
	description: string;
	cost: number; // Ancestry points cost
	isMinor?: boolean; // True if this is a Minor Trait
	isNegative?: boolean; // True if this is a Negative Trait (grants points)
	effects?: ITraitEffect[]; // Array of effects the trait grants
	prerequisites?: any[]; // Optional prerequisites for taking this trait
	sourceAncestryId?: string; // ID of the ancestry this trait belongs to (for combined lists)
}

// Interface for Ancestries
export interface IAncestry {
	id: string;
	name: string;
	description: string;
	defaultTraitIds?: string[]; // Traits automatically granted
	expandedTraitIds: string[]; // Traits available for selection
	origin?: {
		// Optional origin property for ancestries with specific origins (e.g., Dragonborn, Fiendborn, Beastborn)
		prompt: string; // Prompt shown to the user for choosing an origin
		options?: string[]; // Optional list of specific options for the origin
	};
	variantTraits?: ITrait[]; // Optional list of variant traits (e.g., Fallen Angelborn, Redeemed Fiendborn)
}

// Interface for Class Feature Choice Options
export interface IClassFeatureChoiceOption {
	value: string; // Internal value for the choice
	label: string; // Display label for the choice
	description?: string; // Optional description for the choice
	effectsOnChoice?: ITraitEffect[]; // Effects granted if this option is chosen
}

// Interface for Class Feature Choices
export interface IClassFeatureChoice {
	id: string; // Internal ID for the choice (e.g., 'sorcerousOrigin')
	prompt: string; // Prompt shown to the user
	type: 'select_one' | 'select_multiple'; // Type of selection
	maxSelections?: number; // Max number of options if type is 'select_multiple'
	options: IClassFeatureChoiceOption[]; // Available options for the choice
}

// Interface for Class Features
export interface IClassFeature {
	id: string;
	name: string;
	description: string;
	level: number; // Level at which the feature is gained
	effects?: ITraitEffect[]; // Effects granted by the feature
}

// Interface for Class Definitions
export interface IClassDefinition {
	id: string;
	name: string;
	description: string;
	// Base stats granted by the class at Level 1
	baseHpContribution: number;
	startingSP: number;
	startingMP: number;
	skillPointGrantLvl1?: number; // Additional skill points granted at Lvl 1 (beyond Int mod)
	tradePointGrantLvl1?: number; // Additional trade points granted at Lvl 1 (beyond Int mod)
	combatTraining?: string[]; // Array of combat training proficiencies (e.g., 'Weapons', 'All Armor')
	maneuversKnownLvl1?: string | number; // Maneuvers known at Level 1 (can be 'All Attack' or a number)
	techniquesKnownLvl1?: number; // Techniques known at Level 1
	saveDCBase: number;
	deathThresholdBase: number;
	moveSpeedBase: number;
	restPointsBase: number;
	gritPointsBase: number; // Base grit points (before Charisma mod)
	initiativeBonusBase: number; // Base initiative bonus (before Agility mod)
	// Add cantripsKnownLvl1, spellsKnownLvl1 if applicable (not for Barbarian L1)
	cantripsKnownLvl1?: number;
	spellsKnownLvl1?: number;

	level1Features: IClassFeature[]; // Features gained at Level 1
	featureChoicesLvl1?: IClassFeatureChoice[]; // Choices available for features at Level 1
	// ... other level-specific data to be added later
}

// Interface for Skill Data
export interface ISkillData {
	id: string;
	name: string;
	attributeAssociation: 'might' | 'agility' | 'charisma' | 'intelligence' | 'prime'; // Associated attribute
	description: string;
}

// Interface for Trade Data
export interface ITradeData {
	id: string;
	name: string;
	attributeAssociation: 'might' | 'agility' | 'charisma' | 'intelligence'; // Associated attribute
	description: string;
	tools?: string; // Required tools for the trade
}

// Interface for Language Data
export interface ILanguageData {
	id: string;
	name: string;
	type: 'standard' | 'exotic'; // Type of language
	description: string;
}
````

## File: src/lib/rulesdata/weapons.ts
````typescript
// DC20 Weapons Data - Based on official DC20 weapon tables
export interface WeaponData {
	id: string;
	name: string;
	weightCategory: 'light' | 'heavy';
	type: 'melee' | 'ranged';
	damage: number; // Base damage (1, 2, 3, 4)
	versatileDamage?: number; // Damage when used two-handed (for versatile weapons)
	damageType: 'bludgeoning' | 'piercing' | 'slashing';
	requirements?: {
		might?: number;
		agility?: number;
	};
	properties: string[];
	range?: {
		short: number;
		long: number;
	};
	ammunition?: string; // e.g., "Ammo (20/60)"
	reload?: number; // Reload value for crossbows
	specialNotes?: string;
}

export const weaponsData: WeaponData[] = [
	// MELEE WEAPONS - AXES
	{
		id: 'sickle',
		name: 'Sickle',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['Thrown (10/20)', 'Concealable']
	},
	{
		id: 'hand_axe',
		name: 'Hand Axe',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'battleaxe',
		name: 'Battleaxe/Scythe',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'slashing',
		properties: ['Versatile']
	},
	{
		id: 'halberd',
		name: 'Halberd',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'greataxe',
		name: 'Greataxe',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'slashing',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact']
	},

	// MELEE WEAPONS - CHAINED
	{
		id: 'bolas',
		name: 'Bolas',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['Thrown (10/20)', 'Concealable'],
		specialNotes: 'On hit: target is Grappled. Requires contested Physical Save to escape'
	},
	{
		id: 'nunchucks',
		name: 'Nunchucks',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'flail',
		name: 'Flail/Meteor Hammer',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'bludgeoning',
		properties: ['Versatile']
	},
	{
		id: 'war_flail',
		name: 'War Flail',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'great_flail',
		name: 'Great Flail',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'bludgeoning',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact']
	},

	// MELEE WEAPONS - HAMMERS
	{
		id: 'club',
		name: 'Club',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['Thrown (10/20)', 'Concealable']
	},
	{
		id: 'light_hammer',
		name: 'Light Hammer',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'warhammer',
		name: 'Warhammer/Mace',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'bludgeoning',
		properties: ['Versatile']
	},
	{
		id: 'lucerne',
		name: 'Lucerne',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'greatmaul',
		name: 'Greatmaul',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'bludgeoning',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact']
	},

	// MELEE WEAPONS - PICKS
	{
		id: 'climbing_pick',
		name: 'Climbing Pick',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'piercing',
		properties: ['Thrown (10/20)', 'Concealable', 'Special'],
		specialNotes: 'ADV on climbing checks while wielding'
	},
	{
		id: 'mining_pick',
		name: 'Mining Pick',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'pickaxe',
		name: 'Pickaxe',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'piercing',
		properties: ['Versatile']
	},
	{
		id: 'billhook',
		name: 'Billhook',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'greatpick',
		name: 'Greatpick',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'piercing',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact']
	},

	// MELEE WEAPONS - SPEARS
	{
		id: 'stake',
		name: 'Stake',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'piercing',
		properties: ['Thrown (10/20)', 'Concealable']
	},
	{
		id: 'javelin',
		name: 'Javelin',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'spear',
		name: 'Spear/Trident',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'piercing',
		properties: ['Versatile']
	},
	{
		id: 'pike',
		name: 'Pike',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'lance',
		name: 'Lance',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'piercing',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact', 'Reach', 'Unwieldy'],
		specialNotes: 'Can be wielded one-handed while mounted'
	},

	// MELEE WEAPONS - STAFFS
	{
		id: 'stick',
		name: 'Stick',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['Thrown (10/20)', 'Concealable']
	},
	{
		id: 'baton',
		name: 'Baton',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'quarterstaff',
		name: 'Quarterstaff',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'bludgeoning',
		properties: ['Versatile']
	},
	{
		id: 'longpole',
		name: 'Longpole',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'greatstaff',
		name: 'Greatstaff',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'bludgeoning',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact']
	},

	// MELEE WEAPONS - SWORDS
	{
		id: 'dagger',
		name: 'Dagger',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['Thrown (10/20)', 'Concealable']
	},
	{
		id: 'shortsword',
		name: 'Shortsword',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'longsword',
		name: 'Longsword',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'slashing',
		properties: ['Versatile']
	},
	{
		id: 'glaive',
		name: 'Glaive',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'greatsword',
		name: 'Greatsword',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'slashing',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact']
	},

	// MELEE WEAPONS - FIST
	{
		id: 'brass_knuckles',
		name: 'Brass Knuckles',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: []
	},
	{
		id: 'hand_claw',
		name: 'Hand Claw',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: []
	},
	{
		id: 'hand_hook',
		name: 'Hand Hook',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: []
	},
	{
		id: 'boulder_gauntlet',
		name: 'Boulder Gauntlet',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		requirements: { might: 2 },
		properties: ['Impact']
	},

	// MELEE WEAPONS - WHIPS
	{
		id: 'scourge_whip',
		name: 'Scourge Whip',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['Reach', 'Concealable']
	},
	{
		id: 'chain_whip',
		name: 'Chain Whip',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['Reach']
	},
	{
		id: 'bull_whip',
		name: 'Bull Whip',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'slashing',
		requirements: { might: 2 },
		properties: ['Reach', 'Versatile', 'Unwieldy']
	},
	{
		id: 'great_whip',
		name: 'Great Whip',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'slashing',
		requirements: { might: 2 },
		properties: ['Reach', '2-Handed', 'Impact', 'Unwieldy']
	},

	// MELEE WEAPONS - SPECIAL
	{
		id: 'gauntlet',
		name: 'Gauntlet',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['Special'],
		specialNotes: 'Can wield weapon or shield with same hand'
	},
	{
		id: 'rapier',
		name: 'Rapier',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: ['Special'],
		specialNotes: 'Benefits from Sword Weapon Style'
	},
	{
		id: 'morningstar',
		name: 'Morningstar',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'piercing',
		properties: ['Special', 'Versatile'],
		specialNotes: 'Benefits from Hammer Weapon Style'
	},
	{
		id: 'greatstar',
		name: 'Greatstar',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'piercing',
		requirements: { might: 2 },
		properties: ['Special', '2-Handed', 'Impact'],
		specialNotes: 'Benefits from Hammer Weapon Style'
	},
	{
		id: 'net',
		name: 'Net',
		weightCategory: 'light',
		type: 'melee',
		damage: 0, // Net does no damage
		damageType: 'bludgeoning',
		properties: ['Special', 'Thrown (2/5)'],
		specialNotes:
			'Contested Physical Save. Success: Restrained and Grappled. Deal 1 Slashing to net to break free'
	},

	// RANGED WEAPONS - BOWS
	{
		id: 'sling',
		name: 'Sling',
		weightCategory: 'light',
		type: 'ranged',
		damage: 1,
		damageType: 'bludgeoning',
		requirements: { agility: 1 },
		properties: [],
		ammunition: 'Ammo (10/30)'
	},
	{
		id: 'shortbow',
		name: 'Shortbow',
		weightCategory: 'light',
		type: 'ranged',
		damage: 2,
		damageType: 'piercing',
		requirements: { agility: 1 },
		properties: ['2-Handed'],
		ammunition: 'Ammo (20/60)'
	},
	{
		id: 'longbow',
		name: 'Longbow',
		weightCategory: 'heavy',
		type: 'ranged',
		damage: 2,
		damageType: 'piercing',
		requirements: { might: 1, agility: 1 },
		properties: ['2-Handed'],
		ammunition: 'Ammo (30/90)'
	},
	{
		id: 'greatbow',
		name: 'Greatbow',
		weightCategory: 'heavy',
		type: 'ranged',
		damage: 3,
		damageType: 'piercing',
		requirements: { might: 2, agility: 1 },
		properties: ['2-Handed', 'Threatening', 'Unwieldy'],
		ammunition: 'Ammo (40/120)'
	},

	// RANGED WEAPONS - CROSSBOWS
	{
		id: 'hand_crossbow',
		name: 'Hand Crossbow',
		weightCategory: 'light',
		type: 'ranged',
		damage: 1,
		damageType: 'piercing',
		requirements: { agility: 1 },
		properties: ['Impact'],
		ammunition: 'Ammo (10/30)',
		reload: 1
	},
	{
		id: 'light_crossbow',
		name: 'Light Crossbow',
		weightCategory: 'light',
		type: 'ranged',
		damage: 3,
		damageType: 'piercing',
		requirements: { agility: 1 },
		properties: ['2-Handed', 'Impact'],
		ammunition: 'Ammo (15/45)',
		reload: 1
	},
	{
		id: 'heavy_crossbow',
		name: 'Heavy Crossbow',
		weightCategory: 'heavy',
		type: 'ranged',
		damage: 3,
		damageType: 'piercing',
		requirements: { might: 1, agility: 1 },
		properties: ['2-Handed', 'Impact'],
		ammunition: 'Ammo (20/60)',
		reload: 1
	},
	{
		id: 'light_ballista',
		name: 'Light Ballista',
		weightCategory: 'heavy',
		type: 'ranged',
		damage: 4,
		damageType: 'piercing',
		requirements: { might: 4, agility: 1 },
		properties: ['Special', '2-Handed', 'Impact', 'Threatening', 'Unwieldy'],
		ammunition: 'Ammo (40/120)',
		reload: 1,
		specialNotes: 'Costs 1 AP to deploy. Must be in control. Requires Might 4 to pick up'
	},

	// RANGED WEAPONS - SPECIAL
	{
		id: 'boomerang',
		name: 'Boomerang',
		weightCategory: 'light',
		type: 'ranged',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['Special'],
		range: { short: 10, long: 20 },
		specialNotes: "Returns to thrower's hand on miss"
	},
	{
		id: 'dart',
		name: 'Dart',
		weightCategory: 'light',
		type: 'ranged',
		damage: 1,
		damageType: 'piercing',
		properties: ['Special', 'Concealable'],
		range: { short: 10, long: 20 },
		specialNotes: 'Can be drawn as part of Attack Check'
	},
	{
		id: 'throwing_star',
		name: 'Throwing Star',
		weightCategory: 'light',
		type: 'ranged',
		damage: 1,
		damageType: 'slashing',
		properties: ['Special', 'Concealable'],
		range: { short: 10, long: 20 },
		specialNotes: 'Can be drawn as part of Attack Check'
	},
	{
		id: 'blowgun',
		name: 'Blowgun (Needle)',
		weightCategory: 'light',
		type: 'ranged',
		damage: 1,
		damageType: 'piercing',
		requirements: { agility: 1 },
		properties: ['Special'],
		ammunition: 'Ammo (10/20)',
		specialNotes:
			'When Hidden: attack does not reveal position on miss/Heavy Hit. Does Poison damage'
	}
];

// Helper functions for weapon calculations
export const getWeaponAttackBonus = (
	weapon: WeaponData,
	combatMastery: number,
	primaryMod: number,
	secondaryMod?: number
): number => {
	// Base attack bonus is Combat Mastery + appropriate attribute modifier
	let bonus = combatMastery;

	// DC20 uses attribute requirements instead of finesse
	if (weapon.type === 'ranged') {
		// Ranged weapons typically use Agility
		bonus += secondaryMod || primaryMod;
	} else {
		// Melee weapons typically use Might
		bonus += primaryMod;
	}

	return bonus;
};

export const getWeaponDamageBonus = (
	weapon: WeaponData,
	primaryMod: number,
	secondaryMod?: number
): number => {
	// Damage bonus follows same logic as attack bonus for attribute modifier
	if (weapon.type === 'ranged') {
		return secondaryMod || primaryMod;
	} else {
		return primaryMod;
	}
};

export const getWeaponDamageString = (weapon: WeaponData, damageBonus: number): string => {
	let damageStr = weapon.damage.toString();

	// Show versatile damage if available
	if (weapon.versatileDamage) {
		damageStr = `${weapon.damage}(${weapon.versatileDamage})`;
	}

	if (damageBonus === 0) {
		return damageStr;
	}
	return `${damageStr}+${damageBonus}`;
};

export const getCriticalDamage = (weapon: WeaponData): string => {
	// In DC20, critical hits do maximum damage + 2
	const baseDamage = weapon.versatileDamage || weapon.damage;
	return `${baseDamage + 2}`;
};

export const getBrutalDamage = (weapon: WeaponData): string => {
	// In DC20, brutal hits do +2 damage
	const baseDamage = weapon.versatileDamage || weapon.damage;
	return `${baseDamage + 2}`;
};

export const getHeavyHitEffect = (weapon: WeaponData): string => {
	// Check for Impact property
	if (weapon.properties.includes('Impact')) {
		return 'Target must make a Might Save or be knocked Prone and pushed 5 feet';
	}

	// Heavy hits in DC20 do +1 damage
	return '+1 damage';
};

// Helper function to calculate heavy hit damage including Impact
export const getHeavyHitDamage = (weapon: WeaponData): number => {
	const baseDamage = weapon.versatileDamage || weapon.damage;
	let heavyDamage = baseDamage + 1; // Heavy hit adds +1

	// Impact adds another +1 to heavy hits
	if (weapon.properties.includes('Impact')) {
		heavyDamage += 1;
	}

	return heavyDamage;
};

// Helper function to calculate brutal hit damage including Impact
export const getBrutalHitDamage = (weapon: WeaponData): number => {
	const baseDamage = weapon.versatileDamage || weapon.damage;
	let brutalDamage = baseDamage + 2; // Brutal hit adds +2

	// Impact adds +1 to brutal hits too
	if (weapon.properties.includes('Impact')) {
		brutalDamage += 1;
	}

	return brutalDamage;
};
````

## File: src/lib/server/db/index.ts
````typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';

const client = postgres(building ? '' : env.DATABASE_URL);

export const db = drizzle(client, { schema });
````

## File: src/lib/server/db/schema.ts
````typescript
import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
````

## File: src/lib/services/dataMapping.ts
````typescript
// Data mapping utilities for converting between IDs and names
import { ancestriesData } from '../rulesdata/ancestries';
import { classesData } from '../rulesdata/loaders/class.loader';
import type { IAncestry, IClassDefinition } from '../rulesdata/types';

export interface IdNameMapping {
	id: string;
	name: string;
}

/**
 * Get ancestry name from ancestry ID
 */
export const getAncestryName = (ancestryId: string | null): string | null => {
	if (!ancestryId) return null;
	const ancestry = ancestriesData.find((a: IAncestry) => a.id === ancestryId);
	return ancestry?.name || null;
};

/**
 * Get ancestry ID from ancestry name
 */
export const getAncestryId = (ancestryName: string | null): string | null => {
	if (!ancestryName) return null;
	const ancestry = ancestriesData.find(
		(a: IAncestry) => a.name.toLowerCase() === ancestryName.toLowerCase()
	);
	return ancestry?.id || null;
};

/**
 * Get class name from class ID
 */
export const getClassName = (classId: string | null): string | null => {
	if (!classId) return null;
	const classData = classesData.find((c: IClassDefinition) => c.id === classId);
	return classData?.name || null;
};

/**
 * Get class ID from class name
 */
export const getClassId = (className: string | null): string | null => {
	if (!className) return null;
	const classData = classesData.find(
		(c: IClassDefinition) => c.name.toLowerCase() === className.toLowerCase()
	);
	return classData?.id || null;
};

/**
 * Get all available ancestries as ID-name mappings
 */
export const getAncestryMappings = (): IdNameMapping[] => {
	return ancestriesData.map((ancestry: IAncestry) => ({
		id: ancestry.id,
		name: ancestry.name
	}));
};

/**
 * Get all available classes as ID-name mappings
 */
export const getClassMappings = (): IdNameMapping[] => {
	return classesData.map((classData: IClassDefinition) => ({
		id: classData.id,
		name: classData.name
	}));
};

/**
 * Ensure character data has both IDs and names for classes and ancestries
 * This is useful for backwards compatibility and data consistency
 */
export const normalizeCharacterData = (characterData: any): any => {
	const normalized = { ...characterData };

	// Ensure class has both ID and name
	if (normalized.classId && !normalized.className) {
		normalized.className = getClassName(normalized.classId);
	} else if (normalized.className && !normalized.classId) {
		normalized.classId = getClassId(normalized.className);
	}

	// Ensure ancestry1 has both ID and name
	if (normalized.ancestry1Id && !normalized.ancestry1Name) {
		normalized.ancestry1Name = getAncestryName(normalized.ancestry1Id);
	} else if (normalized.ancestry1Name && !normalized.ancestry1Id) {
		normalized.ancestry1Id = getAncestryId(normalized.ancestry1Name);
	}

	// Ensure ancestry2 has both ID and name
	if (normalized.ancestry2Id && !normalized.ancestry2Name) {
		normalized.ancestry2Name = getAncestryName(normalized.ancestry2Id);
	} else if (normalized.ancestry2Name && !normalized.ancestry2Id) {
		normalized.ancestry2Id = getAncestryId(normalized.ancestry2Name);
	}

	return normalized;
};
````

## File: src/routes/api/character/[characterId]/+server.ts
````typescript
import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { characterSheetData, characterInProgress } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
	const { characterId } = params;

	if (!characterId) {
		return json({ error: 'Character ID is required' }, { status: 400 });
	}

	try {
		// First try to get the finalized character sheet data
		const finalizedCharacter = await db
			.select()
			.from(characterSheetData)
			.where(eq(characterSheetData.id, characterId))
			.limit(1);

		if (finalizedCharacter.length > 0) {
			return json(finalizedCharacter[0]);
		}

		// If not found in finalized data, check if it's in progress
		const progressCharacter = await db
			.select()
			.from(characterInProgress)
			.where(eq(characterInProgress.id, characterId))
			.limit(1);

		if (progressCharacter.length === 0) {
			return json({ error: 'Character not found' }, { status: 404 });
		}

		// For now, return an error indicating the character isn't finalized
		// In the future, we could calculate stats on-the-fly from progress data
		return json(
			{
				error: 'Character creation not yet complete. Please finish character creation first.'
			},
			{ status: 400 }
		);
	} catch (error) {
		console.error('Error fetching character:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
````

## File: src/routes/api/character/[characterId]/route.ts
````typescript
// src/routes/api/character/[characterId]/+server.ts

import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ params }) => {
	const { characterId } = params;

	if (!characterId) {
		return json({ error: 'Character ID is required' }, { status: 400 });
	}

	try {
		// First try to get the finalized character sheet data
		const finalizedCharacter = await prisma.characterSheetData.findUnique({
			where: { id: characterId }
		});

		if (finalizedCharacter) {
			return json(finalizedCharacter);
		}

		// If not found in finalized data, check if it's in progress
		const progressCharacter = await prisma.characterInProgress.findUnique({
			where: { id: characterId }
		});

		if (!progressCharacter) {
			return json({ error: 'Character not found' }, { status: 404 });
		}

		// For now, return an error indicating the character isn't finalized
		// In the future, we could calculate stats on-the-fly from progress data
		return json(
			{
				error: 'Character creation not yet complete. Please finish character creation first.'
			},
			{ status: 400 }
		);
	} catch (error) {
		console.error('Error fetching character:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
````

## File: src/routes/api/character/progress/_backup_merge_stages_20250621/stageA+server.ts
````typescript
import { json, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Constants for validation (should ideally be shared or sourced from rules data)
const ATTRIBUTE_MIN = -2;
const ATTRIBUTE_MAX_L1 = 3;
const POINT_BUY_BUDGET = 12;

export async function POST({ request }) {
	try {
		const {
			characterId,
			finalName,
			attribute_might,
			attribute_agility,
			attribute_charisma,
			attribute_intelligence
		} = await request.json();

		// Backend Validation
		if (!finalName || typeof finalName !== 'string' || finalName.trim().length === 0) {
			return error(400, { message: 'Character name is required.' });
		}
		// Optional: Add length constraints or character restrictions for finalName

		const attributes = {
			might: attribute_might,
			agility: attribute_agility,
			charisma: attribute_charisma,
			intelligence: attribute_intelligence
		};

		// Validate attribute ranges
		for (const [name, value] of Object.entries(attributes)) {
			if (value < ATTRIBUTE_MIN || value > ATTRIBUTE_MAX_L1) {
				return error(400, { message: `Attribute ${name} is out of the allowed range (-2 to +3).` });
			}
		}

		// Validate total points spent
		const pointsSpent =
			attributes.might -
			ATTRIBUTE_MIN +
			(attributes.agility - ATTRIBUTE_MIN) +
			(attributes.charisma - ATTRIBUTE_MIN) +
			(attributes.intelligence - ATTRIBUTE_MIN);

		if (pointsSpent !== POINT_BUY_BUDGET) {
			return error(400, {
				message: `Total points allocated must be exactly ${POINT_BUY_BUDGET}. You allocated ${pointsSpent}.`
			});
		}

		let updatedCharacter;

		if (characterId) {
			// Update existing character progress
			updatedCharacter = await prisma.characterInProgress.update({
				where: { id: characterId },
				data: {
					finalName: finalName.trim(), // Save character name
					attribute_might,
					attribute_agility,
					attribute_charisma,
					attribute_intelligence,
					pointsSpent, // Store points spent for consistency, though backend validates
					level: 1, // Hardcoded to 1 for MVP
					combatMastery: 1, // Calculated as half level rounded up (1 for Level 1)
					selectedTraitIds: JSON.stringify([]), // Initialize selected traits for Stage B
					selectedFeatureChoices: JSON.stringify([]), // Initialize selected feature choices
					currentStep: 1 // Mark Stage A as complete
				}
			});
		} else {
			// Create new character progress (handles TD-002 for the first save)
			updatedCharacter = await prisma.characterInProgress.create({
				data: {
					finalName: finalName.trim(), // Save character name
					attribute_might,
					attribute_agility,
					attribute_charisma,
					attribute_intelligence,
					pointsSpent,
					level: 1, // Hardcoded to 1 for MVP
					combatMastery: 1, // Calculated as half level rounded up (1 for Level 1)
					selectedTraitIds: JSON.stringify([]), // Initialize selected traits for Stage B
					selectedFeatureChoices: JSON.stringify([]), // Initialize selected feature choices
					currentStep: 1 // Mark Stage A as complete
				}
			});
			// Note: The frontend will need to update its store with this new ID
		}

		// Return success response with the character ID
		return json({ success: true, characterId: updatedCharacter.id });
	} catch (e) {
		console.error('Backend error saving Stage A data:', e);
		// Handle Prisma errors or other exceptions
		if (e instanceof Error) {
			return error(500, { message: `Internal server error: ${e.message}` });
		}
		return error(500, { message: 'An unknown error occurred while saving attributes.' });
	} finally {
		await prisma.$disconnect();
	}
}
````

## File: src/routes/api/character/progress/_backup_merge_stages_20250621/stageB+server.ts
````typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';
import type { ITrait } from '$lib/rulesdata/types'; // Import ITrait type
import { ancestriesData as ancestries } from '$lib/rulesdata/ancestries';
import { traitsData as traits } from '$lib/rulesdata/traits';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	// Assuming data contains:
	// characterId: string;
	// selectedAncestries: string[]; // Array of ancestry IDs (max 2)
	// selectedTraits: string[]; // Array of trait IDs
	// attributes: { [key: string]: number }; // Attributes after potential reallocation

	// 1. Validate characterId exists and corresponds to an in-progress character
	if (!data.characterId) {
		return json({ success: false, message: 'Character ID is required.' }, { status: 400 });
	}

	// 2. Validate selected ancestries (max 2)
	if (
		!Array.isArray(data.selectedAncestries) ||
		data.selectedAncestries.length === 0 ||
		data.selectedAncestries.length > 2
	) {
		return json(
			{ success: false, message: 'You must select between 1 and 2 ancestries.' },
			{ status: 400 }
		);
	}
	// Validate ancestry IDs
	for (const ancestryId of data.selectedAncestries) {
		const validAncestry = ancestries.find((a) => a.id === ancestryId);
		if (!validAncestry) {
			return json(
				{ success: false, message: `Invalid ancestry ID: ${ancestryId}` },
				{ status: 400 }
			);
		}
	}

	// 3. Validate selected traits
	if (!Array.isArray(data.selectedTraits)) {
		return json({ success: false, message: 'Selected traits data is invalid.' }, { status: 400 });
	}
	// Validate trait IDs and rules
	if (data.selectedTraits.length > 0) {
		// Validate trait IDs exist
		for (const traitId of data.selectedTraits) {
			const validTrait = traits.find((t) => t.id === traitId);
			if (!validTrait) {
				return json({ success: false, message: `Invalid trait ID: ${traitId}` }, { status: 400 });
			}
		}

		// Get full trait objects
		const selectedTraitObjects: ITrait[] = data.selectedTraits
			.map((id: string) => traits.find((t) => t.id === id))
			.filter((t: ITrait | undefined): t is ITrait => t !== undefined);

		// Validate ancestry points budget
		const totalCost = selectedTraitObjects.reduce(
			(sum: number, trait: ITrait) => sum + trait.cost,
			0
		);
		if (totalCost !== 5) {
			return json(
				{ success: false, message: `Total ancestry points must equal 5, got: ${totalCost}` },
				{ status: 400 }
			);
		}

		// Validate minor trait limit
		const minorTraits = selectedTraitObjects.filter((t: ITrait) => t.isMinor);
		if (minorTraits.length > 1) {
			return json(
				{ success: false, message: `Maximum of 1 minor trait allowed, got: ${minorTraits.length}` },
				{ status: 400 }
			);
		}

		// Validate negative trait point gain limit
		const pointsFromNegative = selectedTraitObjects
			.filter((t: ITrait) => t.cost < 0)
			.reduce((sum: number, t: ITrait) => sum + Math.abs(t.cost), 0);
		if (pointsFromNegative > 2) {
			return json(
				{
					success: false,
					message: `Maximum of +2 points from negative traits allowed, got: ${pointsFromNegative}`
				},
				{ status: 400 }
			);
		}
	}

	// 4. Validate attribute values after trait bonuses (within -2 and +3)
	// Assuming data.attributes is an object like { attribute_might: 1, ... }
	if (!data.attributes || typeof data.attributes !== 'object') {
		return json(
			{ success: false, message: 'Attribute data is missing or invalid.' },
			{ status: 400 }
		);
	}
	// Corrected attribute name to match schema
	const attributeNames = [
		'attribute_might',
		'attribute_agility',
		'attribute_charisma',
		'attribute_intelligence'
	];
	for (const attrName of attributeNames) {
		const attrValue = data.attributes[attrName];
		if (typeof attrValue !== 'number' || attrValue < -2 || attrValue > 3) {
			return json(
				{
					success: false,
					message: `Invalid value for attribute ${attrName}: ${attrValue}. Must be between -2 and +3.`
				},
				{ status: 400 }
			);
		}
	}

	// 5. Validate total attribute points (should still be 12 from Stage A base -2)
	// This check assumes the attributes passed in `data.attributes` are the final values after reallocation.
	// The base value for each attribute is -2, so 4 attributes have a base total of -8.
	// The total points allocated in Stage A is 20 (from 12 points + 8 base).
	// If attributes were reallocated in the helper panel, the sum should still reflect the original points + base.
	// Sum of (attributeValue - baseValue) should equal total points allocated.
	const baseAttributeValue = -2;
	const expectedTotalPoints = 12; // Total points allocated in Stage A
	const actualTotalPoints = attributeNames.reduce(
		(sum, attrName) => sum + (data.attributes[attrName] - baseAttributeValue),
		0
	);

	if (actualTotalPoints !== expectedTotalPoints) {
		return json(
			{
				success: false,
				message: `Total attribute points mismatch. Expected ${expectedTotalPoints}, got ${actualTotalPoints}.`
			},
			{ status: 400 }
		);
	}

	try {
		// Fetch the existing character to ensure it's in the correct state (Stage A complete)
		const character = await prisma.characterInProgress.findUnique({
			where: { id: data.characterId },
			select: {
				currentStep: true
				// Select other fields if needed for validation against previous stage data
			}
		});

		if (!character) {
			return json({ success: false, message: 'Character not found.' }, { status: 404 });
		}

		// Optional: Validate that the character is currently at the correct step (Stage A complete)
		// if (character.currentStep !== 1) { // Check against integer 1 for Stage A
		//      return json({ success: false, message: `Character is not in the correct stage. Current stage: ${character.currentStep}` }, { status: 400 });
		// }

		// Update the CharacterInProgress table with Stage B data
		const updatedCharacter = await prisma.characterInProgress.update({
			where: { id: data.characterId },
			data: {
				ancestry1Id: data.selectedAncestries[0] || null, // Store first ancestry ID
				ancestry2Id: data.selectedAncestries[1] || null, // Store second ancestry ID (if exists)
				selectedTraitIds: JSON.stringify(data.selectedTraits), // Store trait IDs as JSON string
				// Update attributes if they were potentially modified in the helper panel
				attribute_might: data.attributes.attribute_might,
				attribute_agility: data.attributes.attribute_agility,
				attribute_charisma: data.attributes.attribute_charisma,
				attribute_intelligence: data.attributes.attribute_intelligence, // Corrected attribute name
				currentStep: 2 // Mark Stage B as complete (using integer 2)
			}
		});

		// Return success response
		return json({ success: true, character: updatedCharacter });
	} catch (error) {
		console.error('Error processing Stage B data:', error);
		// Return appropriate error response
		return json({ success: false, message: 'Failed to save Stage B data.' }, { status: 500 });
	}
};

// TODO: Consider implementing a GET handler to fetch existing Stage B data if needed for resuming progress
// export const GET: RequestHandler = async ({ url }) => {
//     const characterId = url.searchParams.get('characterId');
//     if (!characterId) {
//         return json({ success: false, message: 'Character ID is required.' }, { status: 400 });
//     }
//     try {
//         const character = await prisma.characterInProgress.findUnique({
//             where: { id: characterId },
//             select: {
//                 selectedAncestries: true,
//                 selectedTraits: true,
//                 // Select other relevant fields
//             },
//         });
//         if (!character) {
//             return json({ success: false, message: 'Character not found.' }, { status: 404 });
//         }
//         return json({ success: true, character });
//     } catch (error) {
//         console.error('Error fetching Stage B data:', error);
//         return json({ success: false, message: 'Failed to fetch Stage B data.' }, { status: 500 });
//     }
// };
````

## File: src/routes/character-creation/components/BackgroundPointsManager.tsx
````typescript
import React from 'react';

export interface BackgroundPointsData {
	skillPointsUsed: number;
	tradePointsUsed: number;
	languagePointsUsed: number;
	baseSkillPoints: number;
	baseTradePoints: number;
	baseLanguagePoints: number;
	availableSkillPoints: number;
	availableTradePoints: number;
	availableLanguagePoints: number;
}

export interface PointConversions {
	skillToTradeConversions: number;
	tradeToSkillConversions: number;
	tradeToLanguageConversions: number;
}

export interface ConversionActions {
	convertSkillToTrade: () => void;
	convertTradeToSkill: () => void;
	convertTradeToLanguage: () => void;
	resetConversions: () => void;
}

export const useBackgroundPoints = (
	skillPointsUsed: number,
	tradePointsUsed: number,
	languagePointsUsed: number,
	intelligenceModifier: number
) => {
	const [skillToTradeConversions, setSkillToTradeConversions] = React.useState(0);
	const [tradeToSkillConversions, setTradeToSkillConversions] = React.useState(0);
	const [tradeToLanguageConversions, setTradeToLanguageConversions] = React.useState(0);

	// Base points according to DC20 rules
	const baseSkillPoints = 5 + intelligenceModifier;
	const baseTradePoints = 3;
	const baseLanguagePoints = 2;

	// Calculate available points after conversions
	const availableSkillPoints =
		baseSkillPoints - skillToTradeConversions + Math.floor(tradeToSkillConversions / 2);
	const availableTradePoints =
		baseTradePoints -
		tradeToSkillConversions +
		skillToTradeConversions * 2 -
		tradeToLanguageConversions;
	const availableLanguagePoints = baseLanguagePoints + tradeToLanguageConversions * 2;

	// Conversion functions
	const convertSkillToTrade = () => {
		if (skillPointsUsed + 1 <= availableSkillPoints) {
			setSkillToTradeConversions((prev) => prev + 1);
		}
	};

	const convertTradeToSkill = () => {
		if (
			tradeToSkillConversions + 2 <= baseTradePoints + skillToTradeConversions * 2 &&
			tradePointsUsed + 2 <= availableTradePoints
		) {
			setTradeToSkillConversions((prev) => prev + 2);
		}
	};

	const convertTradeToLanguage = () => {
		if (availableTradePoints - tradePointsUsed >= 1) {
			setTradeToLanguageConversions((prev) => prev + 1);
		}
	};

	const resetConversions = () => {
		setSkillToTradeConversions(0);
		setTradeToSkillConversions(0);
		setTradeToLanguageConversions(0);
	};

	const pointsData: BackgroundPointsData = {
		skillPointsUsed,
		tradePointsUsed,
		languagePointsUsed,
		baseSkillPoints,
		baseTradePoints,
		baseLanguagePoints,
		availableSkillPoints,
		availableTradePoints,
		availableLanguagePoints
	};

	const conversions: PointConversions = {
		skillToTradeConversions,
		tradeToSkillConversions,
		tradeToLanguageConversions
	};

	const actions: ConversionActions = {
		convertSkillToTrade,
		convertTradeToSkill,
		convertTradeToLanguage,
		resetConversions
	};

	return { pointsData, conversions, actions };
};
````

## File: src/routes/character-creation/components/LanguagesTab.tsx
````typescript
import React from 'react';
import { languagesData } from '../../../lib/rulesdata/languages';
import type {
	BackgroundPointsData,
	PointConversions,
	ConversionActions
} from './BackgroundPointsManager';
import {
	StyledTabContent,
	StyledSelectionGrid,
	StyledSelectionItem,
	StyledSelectionHeader,
	StyledSelectionName,
	StyledProficiencyButton,
	StyledLanguageFluency,
	StyledPointsRemaining
} from '../styles/Background.styles';

interface LanguagesTabProps {
	currentLanguages: Record<string, { fluency: 'limited' | 'fluent' }>;
	pointsData: BackgroundPointsData;
	conversions: PointConversions;
	actions: ConversionActions;
	onLanguageChange: (languageId: string, fluency: 'limited' | 'fluent' | null) => void;
}

const LanguagesTab: React.FC<LanguagesTabProps> = ({
	currentLanguages,
	pointsData,
	conversions,
	actions,
	onLanguageChange
}) => {
	const getLanguageCost = (fluency: 'limited' | 'fluent') => {
		return fluency === 'limited' ? 1 : 2;
	};

	// Helper function for consistent button styling
	const getButtonStyle = (enabled: boolean, variant: 'primary' | 'danger' = 'primary') => ({
		padding: '0.5rem 1rem',
		backgroundColor: enabled ? (variant === 'primary' ? '#3b82f6' : '#ef4444') : '#6b7280',
		color: 'white',
		border: 'none',
		borderRadius: '6px',
		fontSize: '0.875rem',
		fontWeight: '500',
		cursor: enabled ? 'pointer' : 'not-allowed',
		transition: 'all 0.2s ease',
		opacity: enabled ? 1 : 0.6,
		':hover': enabled
			? {
					backgroundColor: variant === 'primary' ? '#2563eb' : '#dc2626',
					transform: 'translateY(-1px)',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
				}
			: {}
	});

	const hasConversions =
		conversions.skillToTradeConversions > 0 ||
		conversions.tradeToSkillConversions > 0 ||
		conversions.tradeToLanguageConversions > 0;

	return (
		<StyledTabContent>
			<StyledPointsRemaining>
				Language Points: {pointsData.availableLanguagePoints - pointsData.languagePointsUsed} /{' '}
				{pointsData.availableLanguagePoints} remaining
				{conversions.tradeToLanguageConversions > 0 && (
					<div
						style={{
							fontSize: '0.9rem',
							color: '#6366f1',
							marginTop: '0.5rem',
							padding: '0.25rem 0.5rem',
							backgroundColor: '#6366f11a',
							borderRadius: '4px',
							border: '1px solid #6366f133'
						}}
					>
						Active conversions: {conversions.tradeToLanguageConversions} trade →{' '}
						{conversions.tradeToLanguageConversions * 2} language
					</div>
				)}
				<div
					style={{
						marginTop: '0.75rem',
						display: 'flex',
						gap: '0.5rem',
						flexWrap: 'wrap'
					}}
				>
					<button
						onClick={actions.convertTradeToLanguage}
						disabled={pointsData.availableTradePoints - pointsData.tradePointsUsed < 1}
						style={getButtonStyle(
							pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1
						)}
						onMouseEnter={(e) => {
							if (pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1) {
								e.currentTarget.style.backgroundColor = '#2563eb';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1) {
								e.currentTarget.style.backgroundColor = '#3b82f6';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Convert 1 Trade → 2 Language Points
					</button>
					<button
						onClick={actions.resetConversions}
						disabled={!hasConversions}
						style={getButtonStyle(hasConversions, 'danger')}
						onMouseEnter={(e) => {
							if (hasConversions) {
								e.currentTarget.style.backgroundColor = '#dc2626';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (hasConversions) {
								e.currentTarget.style.backgroundColor = '#ef4444';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Reset Conversions
					</button>
				</div>
			</StyledPointsRemaining>
			<StyledSelectionGrid>
				{languagesData.map((language) => {
					const currentFluency = currentLanguages[language.id]?.fluency || null;
					const isCommon = language.id === 'common';

					return (
						<StyledSelectionItem key={language.id}>
							<StyledSelectionHeader>
								<StyledSelectionName>
									{language.name}
									{isCommon && (
										<span style={{ color: '#10b981', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
											(Free)
										</span>
									)}
								</StyledSelectionName>
								<div style={{ fontSize: '0.8rem', color: '#e2e8f0', textTransform: 'uppercase' }}>
									{(language as any).type}
								</div>
							</StyledSelectionHeader>
							<div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
								{language.description}
							</div>
							<StyledLanguageFluency>
								{!isCommon && (
									<StyledProficiencyButton
										$active={currentFluency === null}
										onClick={() => onLanguageChange(language.id, null)}
									>
										None
									</StyledProficiencyButton>
								)}
								{(['limited', 'fluent'] as const).map((fluency) => {
									const cost = getLanguageCost(fluency);
									const canAfford =
										isCommon ||
										currentFluency === fluency ||
										pointsData.languagePointsUsed + cost <= pointsData.availableLanguagePoints;

									return (
										<StyledProficiencyButton
											key={fluency}
											$active={currentFluency === fluency}
											$disabled={!canAfford && !isCommon}
											onClick={() => {
												if (isCommon || canAfford) {
													onLanguageChange(language.id, fluency);
												}
											}}
										>
											{fluency.charAt(0).toUpperCase() + fluency.slice(1)}{' '}
											{!isCommon && `(${cost})`}
										</StyledProficiencyButton>
									);
								})}
							</StyledLanguageFluency>
						</StyledSelectionItem>
					);
				})}
			</StyledSelectionGrid>
		</StyledTabContent>
	);
};

export default LanguagesTab;
````

## File: src/routes/character-creation/components/SkillsTab.tsx
````typescript
import React from 'react';
import { skillsData } from '../../../lib/rulesdata/skills';
import type {
	BackgroundPointsData,
	PointConversions,
	ConversionActions
} from './BackgroundPointsManager';
import {
	StyledTabContent,
	StyledSelectionGrid,
	StyledSelectionItem,
	StyledSelectionHeader,
	StyledSelectionName,
	StyledProficiencySelector,
	StyledProficiencyButton,
	StyledPointsRemaining
} from '../styles/Background.styles';

interface SkillsTabProps {
	currentSkills: Record<string, number>;
	pointsData: BackgroundPointsData;
	conversions: PointConversions;
	actions: ConversionActions;
	onSkillChange: (skillId: string, newLevel: number) => void;
}

const SkillsTab: React.FC<SkillsTabProps> = ({
	currentSkills,
	pointsData,
	conversions,
	actions,
	onSkillChange
}) => {
	const canIncreaseProficiency = (
		pointCost: number,
		pointsUsed: number,
		availablePoints: number
	) => {
		return pointsUsed + pointCost <= availablePoints;
	};

	// Helper function for consistent button styling
	const getButtonStyle = (enabled: boolean, variant: 'primary' | 'danger' = 'primary') => ({
		padding: '0.5rem 1rem',
		backgroundColor: enabled ? (variant === 'primary' ? '#3b82f6' : '#ef4444') : '#6b7280',
		color: 'white',
		border: 'none',
		borderRadius: '6px',
		fontSize: '0.875rem',
		fontWeight: '500',
		cursor: enabled ? 'pointer' : 'not-allowed',
		transition: 'all 0.2s ease',
		opacity: enabled ? 1 : 0.6,
		':hover': enabled
			? {
					backgroundColor: variant === 'primary' ? '#2563eb' : '#dc2626',
					transform: 'translateY(-1px)',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
				}
			: {}
	});

	const hasConversions =
		conversions.skillToTradeConversions > 0 ||
		conversions.tradeToSkillConversions > 0 ||
		conversions.tradeToLanguageConversions > 0;

	return (
		<StyledTabContent>
			<StyledPointsRemaining>
				Skill Points: {pointsData.availableSkillPoints - pointsData.skillPointsUsed} /{' '}
				{pointsData.availableSkillPoints} remaining
				{pointsData.baseSkillPoints !== 5 && (
					<div
						style={{
							fontSize: '0.9rem',
							color: pointsData.baseSkillPoints > 5 ? '#10b981' : '#ef4444',
							marginTop: '0.5rem',
							padding: '0.25rem 0.5rem',
							backgroundColor: pointsData.baseSkillPoints > 5 ? '#065f461a' : '#dc26261a',
							borderRadius: '4px',
							border: `1px solid ${pointsData.baseSkillPoints > 5 ? '#10b981' : '#ef4444'}33`
						}}
					>
						Intelligence modifier: {pointsData.baseSkillPoints > 5 ? '+' : ''}
						{pointsData.baseSkillPoints - 5}
					</div>
				)}
				{hasConversions && (
					<div
						style={{
							fontSize: '0.9rem',
							color: '#6366f1',
							marginTop: '0.5rem',
							padding: '0.25rem 0.5rem',
							backgroundColor: '#6366f11a',
							borderRadius: '4px',
							border: '1px solid #6366f133'
						}}
					>
						Active conversions:{' '}
						{conversions.skillToTradeConversions > 0
							? `${conversions.skillToTradeConversions} skill → ${conversions.skillToTradeConversions * 2} trade`
							: ''}
						{conversions.skillToTradeConversions > 0 &&
						(conversions.tradeToSkillConversions > 0 || conversions.tradeToLanguageConversions > 0)
							? ', '
							: ''}
						{conversions.tradeToSkillConversions > 0
							? `${conversions.tradeToSkillConversions} trade → ${Math.floor(conversions.tradeToSkillConversions / 2)} skill`
							: ''}
						{conversions.tradeToSkillConversions > 0 && conversions.tradeToLanguageConversions > 0
							? ', '
							: ''}
						{conversions.tradeToLanguageConversions > 0
							? `${conversions.tradeToLanguageConversions} trade → ${conversions.tradeToLanguageConversions * 2} language`
							: ''}
					</div>
				)}
				<div
					style={{
						marginTop: '0.75rem',
						display: 'flex',
						gap: '0.5rem',
						flexWrap: 'wrap'
					}}
				>
					<button
						onClick={actions.convertSkillToTrade}
						disabled={pointsData.availableSkillPoints - pointsData.skillPointsUsed < 1}
						style={getButtonStyle(
							pointsData.availableSkillPoints - pointsData.skillPointsUsed >= 1
						)}
						onMouseEnter={(e) => {
							if (pointsData.availableSkillPoints - pointsData.skillPointsUsed >= 1) {
								e.currentTarget.style.backgroundColor = '#2563eb';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (pointsData.availableSkillPoints - pointsData.skillPointsUsed >= 1) {
								e.currentTarget.style.backgroundColor = '#3b82f6';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Convert 1 Skill → 2 Trade Points
					</button>
					<button
						onClick={actions.resetConversions}
						disabled={!hasConversions}
						style={getButtonStyle(hasConversions, 'danger')}
						onMouseEnter={(e) => {
							if (hasConversions) {
								e.currentTarget.style.backgroundColor = '#dc2626';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (hasConversions) {
								e.currentTarget.style.backgroundColor = '#ef4444';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Reset Conversions
					</button>
				</div>
			</StyledPointsRemaining>
			<StyledSelectionGrid>
				{skillsData.map((skill) => {
					const currentLevel = currentSkills[skill.id] || 0;
					return (
						<StyledSelectionItem key={skill.id}>
							<StyledSelectionHeader>
								<StyledSelectionName>{skill.name}</StyledSelectionName>
								<div style={{ fontSize: '0.8rem', color: '#e2e8f0', textTransform: 'uppercase' }}>
									{skill.attributeAssociation}
								</div>
							</StyledSelectionHeader>
							<div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
								{skill.description}
							</div>
							<StyledProficiencySelector>
								{[0, 1, 2, 3, 4, 5].map((level) => (
									<StyledProficiencyButton
										key={level}
										$active={currentLevel === level}
										$disabled={
											level > currentLevel &&
											!canIncreaseProficiency(
												level - currentLevel,
												pointsData.skillPointsUsed,
												pointsData.availableSkillPoints
											)
										}
										onClick={() => {
											if (
												level <= currentLevel ||
												canIncreaseProficiency(
													level - currentLevel,
													pointsData.skillPointsUsed,
													pointsData.availableSkillPoints
												)
											) {
												onSkillChange(skill.id, level);
											}
										}}
									>
										{level}
									</StyledProficiencyButton>
								))}
							</StyledProficiencySelector>
						</StyledSelectionItem>
					);
				})}
			</StyledSelectionGrid>
		</StyledTabContent>
	);
};

export default SkillsTab;
````

## File: src/routes/character-creation/components/TradesTab.tsx
````typescript
import React from 'react';
import { tradesData } from '../../../lib/rulesdata/trades';
import { knowledgeData } from '../../../lib/rulesdata/knowledge';
import type {
	BackgroundPointsData,
	PointConversions,
	ConversionActions
} from './BackgroundPointsManager';
import {
	StyledTabContent,
	StyledSelectionGrid,
	StyledSelectionItem,
	StyledSelectionHeader,
	StyledSelectionName,
	StyledProficiencySelector,
	StyledProficiencyButton,
	StyledPointsRemaining
} from '../styles/Background.styles';

// Combine trades and knowledge for selection
const allTradesAndKnowledge = [...tradesData, ...knowledgeData];

interface TradesTabProps {
	currentTrades: Record<string, number>;
	pointsData: BackgroundPointsData;
	conversions: PointConversions;
	actions: ConversionActions;
	onTradeChange: (tradeId: string, newLevel: number) => void;
}

const TradesTab: React.FC<TradesTabProps> = ({
	currentTrades,
	pointsData,
	conversions,
	actions,
	onTradeChange
}) => {
	const canIncreaseProficiency = (
		pointCost: number,
		pointsUsed: number,
		availablePoints: number
	) => {
		return pointsUsed + pointCost <= availablePoints;
	};

	// Helper function for consistent button styling
	const getButtonStyle = (enabled: boolean, variant: 'primary' | 'danger' = 'primary') => ({
		padding: '0.5rem 1rem',
		backgroundColor: enabled ? (variant === 'primary' ? '#3b82f6' : '#ef4444') : '#6b7280',
		color: 'white',
		border: 'none',
		borderRadius: '6px',
		fontSize: '0.875rem',
		fontWeight: '500',
		cursor: enabled ? 'pointer' : 'not-allowed',
		transition: 'all 0.2s ease',
		opacity: enabled ? 1 : 0.6,
		':hover': enabled
			? {
					backgroundColor: variant === 'primary' ? '#2563eb' : '#dc2626',
					transform: 'translateY(-1px)',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
				}
			: {}
	});

	const hasConversions =
		conversions.skillToTradeConversions > 0 ||
		conversions.tradeToSkillConversions > 0 ||
		conversions.tradeToLanguageConversions > 0;

	return (
		<StyledTabContent>
			<StyledPointsRemaining>
				Trade Points: {pointsData.availableTradePoints - pointsData.tradePointsUsed} /{' '}
				{pointsData.availableTradePoints} remaining
				{hasConversions && (
					<div
						style={{
							fontSize: '0.9rem',
							color: '#6366f1',
							marginTop: '0.5rem',
							padding: '0.25rem 0.5rem',
							backgroundColor: '#6366f11a',
							borderRadius: '4px',
							border: '1px solid #6366f133'
						}}
					>
						Active conversions:{' '}
						{conversions.skillToTradeConversions > 0
							? `${conversions.skillToTradeConversions} skill → ${conversions.skillToTradeConversions * 2} trade`
							: ''}
						{conversions.skillToTradeConversions > 0 &&
						(conversions.tradeToSkillConversions > 0 || conversions.tradeToLanguageConversions > 0)
							? ', '
							: ''}
						{conversions.tradeToSkillConversions > 0
							? `${conversions.tradeToSkillConversions} trade → ${Math.floor(conversions.tradeToSkillConversions / 2)} skill`
							: ''}
						{conversions.tradeToSkillConversions > 0 && conversions.tradeToLanguageConversions > 0
							? ', '
							: ''}
						{conversions.tradeToLanguageConversions > 0
							? `${conversions.tradeToLanguageConversions} trade → ${conversions.tradeToLanguageConversions * 2} language`
							: ''}
					</div>
				)}
				<div
					style={{
						marginTop: '0.75rem',
						display: 'flex',
						gap: '0.5rem',
						flexWrap: 'wrap'
					}}
				>
					<button
						onClick={actions.convertTradeToSkill}
						disabled={pointsData.availableTradePoints - pointsData.tradePointsUsed < 2}
						style={getButtonStyle(
							pointsData.availableTradePoints - pointsData.tradePointsUsed >= 2
						)}
						onMouseEnter={(e) => {
							if (pointsData.availableTradePoints - pointsData.tradePointsUsed >= 2) {
								e.currentTarget.style.backgroundColor = '#2563eb';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (pointsData.availableTradePoints - pointsData.tradePointsUsed >= 2) {
								e.currentTarget.style.backgroundColor = '#3b82f6';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Convert 2 Trade → 1 Skill Point
					</button>
					<button
						onClick={actions.convertTradeToLanguage}
						disabled={pointsData.availableTradePoints - pointsData.tradePointsUsed < 1}
						style={getButtonStyle(
							pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1
						)}
						onMouseEnter={(e) => {
							if (pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1) {
								e.currentTarget.style.backgroundColor = '#2563eb';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (pointsData.availableTradePoints - pointsData.tradePointsUsed >= 1) {
								e.currentTarget.style.backgroundColor = '#3b82f6';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Convert 1 Trade → 2 Language Points
					</button>
					<button
						onClick={actions.resetConversions}
						disabled={!hasConversions}
						style={getButtonStyle(hasConversions, 'danger')}
						onMouseEnter={(e) => {
							if (hasConversions) {
								e.currentTarget.style.backgroundColor = '#dc2626';
								e.currentTarget.style.transform = 'translateY(-1px)';
								e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
							}
						}}
						onMouseLeave={(e) => {
							if (hasConversions) {
								e.currentTarget.style.backgroundColor = '#ef4444';
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}
						}}
					>
						Reset Conversions
					</button>
				</div>
			</StyledPointsRemaining>
			<StyledSelectionGrid>
				{allTradesAndKnowledge.map((trade) => {
					const currentLevel = currentTrades[trade.id] || 0;
					return (
						<StyledSelectionItem key={trade.id}>
							<StyledSelectionHeader>
								<StyledSelectionName>{trade.name}</StyledSelectionName>
								<div style={{ fontSize: '0.8rem', color: '#e2e8f0', textTransform: 'uppercase' }}>
									{trade.attributeAssociation}
								</div>
							</StyledSelectionHeader>
							<div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
								{trade.description}
							</div>
							{(trade as any).tools && (
								<div
									style={{
										fontSize: '0.8rem',
										color: '#fbbf24',
										marginBottom: '0.5rem',
										fontStyle: 'italic'
									}}
								>
									Tools: {(trade as any).tools}
								</div>
							)}
							<StyledProficiencySelector>
								{[0, 1, 2, 3, 4, 5].map((level) => (
									<StyledProficiencyButton
										key={level}
										$active={currentLevel === level}
										$disabled={
											level > currentLevel &&
											!canIncreaseProficiency(
												level - currentLevel,
												pointsData.tradePointsUsed,
												pointsData.availableTradePoints
											)
										}
										onClick={() => {
											if (
												level <= currentLevel ||
												canIncreaseProficiency(
													level - currentLevel,
													pointsData.tradePointsUsed,
													pointsData.availableTradePoints
												)
											) {
												onTradeChange(trade.id, level);
											}
										}}
									>
										{level}
									</StyledProficiencyButton>
								))}
							</StyledProficiencySelector>
						</StyledSelectionItem>
					);
				})}
			</StyledSelectionGrid>
		</StyledTabContent>
	);
};

export default TradesTab;
````

## File: src/routes/character-creation/styles/AncestryPointsCounter.styles.ts
````typescript
import styled from 'styled-components';

export const StyledContainer = styled.div`
	padding: 1.5rem;
	border: 2px solid #8b5cf6;
	border-radius: 12px;
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	margin-bottom: 1rem;
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
	text-align: center;
`;

export const StyledTitle = styled.h2`
	margin: 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	letter-spacing: 1px;
	border-bottom: 2px solid #ef4444;
	padding-bottom: 0.5rem;
`;
````

## File: src/routes/character-creation/styles/AncestrySelector.styles.ts
````typescript
import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: 2px solid #8b5cf6;
	padding: 1.5rem;
	border-radius: 12px;
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	margin-top: 2rem;
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
`;

export const StyledTitle = styled.h2`
	margin-top: 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	letter-spacing: 1px;
	border-bottom: 2px solid #ef4444;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 1rem;
	margin-top: 1rem;
`;

export const StyledCard = styled.button<{ $selected: boolean }>`
	border: 2px solid #a855f7;
	padding: 1.5rem;
	border-radius: 10px;
	background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
	cursor: pointer;
	transition: all 0.3s ease;
	text-align: left;
	box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
	height: 200px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	position: relative;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(168, 85, 247, 0.4);
		border-color: #fbbf24;
	}

	${(props) =>
		props.$selected &&
		`
    border-color: #ef4444;
    background: linear-gradient(145deg, #991b1b 0%, #dc2626 100%);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.5);
    transform: translateY(-2px);
  `}
`;

export const StyledCardHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
`;

export const StyledAncestryIcon = styled.div`
	font-size: 2rem;
	flex-shrink: 0;
	background: linear-gradient(145deg, #8b5cf6 0%, #a855f7 100%);
	border-radius: 50%;
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const StyledCardTitle = styled.h3`
	margin: 0;
	color: #fbbf24;
	font-size: 1.4rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledCardDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 0.9rem;
	line-height: 1.4;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	flex: 1;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	position: relative;
`;

export const StyledCardFooter = styled.div`
	margin-top: 0.5rem;
	display: flex;
	justify-content: flex-end;
`;

export const StyledReadMore = styled.button`
	color: #fbbf24;
	font-size: 0.85rem;
	font-weight: bold;
	cursor: pointer;
	text-decoration: underline;
	background: none;
	border: none;
	padding: 0.5rem 0.75rem;
	border-radius: 4px;
	transition: all 0.2s ease;

	&:hover {
		color: #f59e0b;
		background: rgba(251, 191, 36, 0.1);
	}

	&:active {
		transform: scale(0.95);
	}
`;

export const StyledTooltip = styled.div<{ $show: boolean }>`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
	color: #e5e7eb;
	padding: 2rem;
	border-radius: 12px;
	border: 3px solid #8b5cf6;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
	z-index: 2000;
	width: 90vw;
	max-width: 500px;
	max-height: 80vh;
	overflow-y: auto;
	font-size: 1rem;
	line-height: 1.6;
	opacity: ${(props) => (props.$show ? 1 : 0)};
	pointer-events: ${(props) => (props.$show ? 'auto' : 'none')};
	transition: opacity 0.3s ease;

	/* Custom scrollbar for popup */
	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background: #1e1b4b;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb {
		background: #8b5cf6;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #a855f7;
	}
`;

export const StyledTooltipOverlay = styled.div<{ $show: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	z-index: 1999;
	opacity: ${(props) => (props.$show ? 1 : 0)};
	pointer-events: ${(props) => (props.$show ? 'auto' : 'none')};
	transition: opacity 0.3s ease;
`;

export const StyledTooltipHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.5rem;
	padding-bottom: 1rem;
	border-bottom: 2px solid #8b5cf6;
`;

export const StyledTooltipIcon = styled.div`
	font-size: 3rem;
	background: linear-gradient(145deg, #8b5cf6 0%, #a855f7 100%);
	border-radius: 50%;
	width: 70px;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
`;

export const StyledTooltipTitle = styled.h3`
	margin: 0;
	color: #fbbf24;
	font-size: 1.8rem;
	font-weight: bold;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const StyledTooltipContent = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 1.1rem;
	line-height: 1.6;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledCloseHint = styled.div`
	margin-top: 1.5rem;
	padding-top: 1rem;
	border-top: 1px solid #8b5cf6;
	text-align: center;
	color: #9ca3af;
	font-size: 0.9rem;
	font-style: italic;
`;
````

## File: src/routes/character-creation/styles/Attributes.styles.ts
````typescript
import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: 2px solid #8b5cf6;
	padding: 1.5rem;
	border-radius: 12px;
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	margin-top: 2rem;
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
`;

export const StyledTitle = styled.h2`
	margin-top: 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	letter-spacing: 1px;
	border-bottom: 2px solid #ef4444;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledPointsRemaining = styled.p`
	margin: 0.5rem 0;
	font-weight: bold;
	color: #ef4444;
	font-size: 1.2rem;
	text-align: center;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1rem;
	margin-top: 1rem;
`;

export const StyledCard = styled.div`
	border: 2px solid #a855f7;
	padding: 1.5rem;
	border-radius: 10px;
	background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
	text-align: center;
	transition: all 0.3s ease;
	box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(168, 85, 247, 0.4);
		border-color: #fbbf24;
	}
`;

export const StyledCardTitle = styled.h3`
	margin: 0 0 0.5rem 0;
	color: #fbbf24;
	font-size: 1.4rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledControls = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	margin-top: 0.5rem;
`;

export const StyledButton = styled.button`
	width: 45px;
	height: 45px;
	border: 2px solid #dc2626;
	border-radius: 8px;
	background: linear-gradient(145deg, #991b1b 0%, #dc2626 100%);
	color: #fbbf24;
	cursor: pointer;
	font-size: 1.4rem;
	font-weight: bold;
	transition: all 0.2s ease;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);

	&:hover {
		background: linear-gradient(145deg, #dc2626 0%, #ef4444 100%);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(220, 38, 38, 0.5);
		border-color: #fbbf24;
	}

	&:active {
		transform: translateY(0);
	}

	&:disabled {
		opacity: 0.4;
		cursor: not-allowed;
		background: linear-gradient(145deg, #4b5563 0%, #6b7280 100%);
		border-color: #6b7280;
		transform: none;
		box-shadow: none;
	}
`;

export const StyledValue = styled.p`
	margin: 0;
	font-size: 1.5rem;
	font-weight: bold;
	min-width: 40px;
	color: #fbbf24;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
	padding: 0.5rem;
	border-radius: 6px;
	border: 1px solid #8b5cf6;
`;

export const StyledDescription = styled.p`
	color: #e5e7eb;
	font-size: 0.9rem;
	line-height: 1.4;
	margin: 0.5rem 0 1rem 0;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;
````

## File: src/routes/character-creation/styles/Background.styles.ts
````typescript
import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: 2px solid #8b5cf6;
	padding: 1.5rem;
	border-radius: 12px;
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	margin-top: 2rem;
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
	color: white;
	font-family: 'Inter', sans-serif;
`;

export const StyledSubheading = styled.h2`
	margin-top: 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	letter-spacing: 1px;
	border-bottom: 2px solid #ef4444;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledDescription = styled.p`
	color: #e2e8f0;
	text-align: center;
	margin-bottom: 1.5rem;
	line-height: 1.6;
	font-size: 1rem;
`;

export const StyledTabContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 1.5rem;
	border: 2px solid #a855f7;
	border-radius: 10px;
	background: rgba(45, 27, 105, 0.3);
	padding: 0.5rem;
	gap: 0.5rem;
`;

export const StyledTab = styled.button<{ $active: boolean }>`
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;

	background: ${(props) =>
		props.$active ? 'linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%)' : 'transparent'};
	color: ${(props) => (props.$active ? '#1e1b4b' : '#e2e8f0')};

	&:hover {
		background: ${(props) =>
			props.$active
				? 'linear-gradient(145deg, #f59e0b 0%, #d97706 100%)'
				: 'rgba(251, 191, 36, 0.1)'};
	}
`;

export const StyledTabContent = styled.div`
	margin: 0 auto;
`;

export const StyledPointsRemaining = styled.div`
	margin: 0.5rem 0;
	font-weight: bold;
	color: #ef4444;
	font-size: 1.2rem;
	text-align: center;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	margin-bottom: 1.5rem;
`;

export const StyledSelectionGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1rem;
	margin-top: 1rem;
`;

export const StyledSelectionItem = styled.div`
	border: 2px solid #a855f7;
	padding: 1.5rem;
	border-radius: 10px;
	background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
	transition: all 0.3s ease;
	box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);

	&:hover {
		border-color: #fbbf24;
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3);
	}
`;

export const StyledSelectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const StyledSelectionName = styled.h4`
	font-size: 1.1rem;
	font-weight: 600;
	margin: 0;
	color: #fbbf24;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledProficiencySelector = styled.div`
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	margin-top: 0.5rem;
`;

export const StyledProficiencyButton = styled.button<{ $active?: boolean; $disabled?: boolean }>`
	padding: 0.5rem 1rem;
	border: 2px solid ${(props) => (props.$active ? '#fbbf24' : '#6b7280')};
	border-radius: 6px;
	background: ${(props) => (props.$active ? '#fbbf24' : 'transparent')};
	color: ${(props) => (props.$active ? '#1e1b4b' : '#e2e8f0')};
	font-weight: 600;
	cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
	transition: all 0.2s ease;
	opacity: ${(props) => (props.$disabled ? 0.5 : 1)};

	&:hover:not(:disabled) {
		background: ${(props) => (props.$active ? '#f59e0b' : 'rgba(251, 191, 36, 0.1)')};
		border-color: #fbbf24;
	}
`;

export const StyledLanguageFluency = styled.div`
	display: flex;
	gap: 0.5rem;
	flex-wrap: wrap;
	margin-top: 0.5rem;
`;

export const StyledError = styled.div`
	background-color: rgba(239, 68, 68, 0.1);
	border: 1px solid #ef4444;
	color: #ef4444;
	padding: 0.75rem;
	border-radius: 6px;
	margin-top: 1rem;
	font-size: 0.9rem;
	text-align: center;
`;
````

## File: src/routes/character-creation/styles/CharacterCreation.styles.ts
````typescript
// Styled components for CharacterCreation component
import styled from 'styled-components';

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 1rem;
	min-height: 100vh;
	background: linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%);
`;

export const StyledTitle = styled.h1`
	margin-bottom: 2rem;
	color: #fbbf24;
	text-align: center;
	font-size: 2.2rem;
	font-weight: bold;
	text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
	letter-spacing: 2px;
	background: linear-gradient(45deg, #fbbf24 0%, #f59e0b 100%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

export const StyledStepIndicator = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
	padding: 0 1rem;
`;

export const StyledStepsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	flex: 1;
`;

export const StyledStep = styled.div<{ $active: boolean; $completed: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		transform: scale(1.05);
	}
`;

export const StyledStepNumber = styled.div<{ $active: boolean; $completed: boolean }>`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	font-size: 1.2rem;
	transition: all 0.3s ease;

	${(props) =>
		props.$completed &&
		`
    background: linear-gradient(145deg, #10b981 0%, #059669 100%);
    color: white;
    border: 2px solid #10b981;
  `}

	${(props) =>
		props.$active &&
		!props.$completed &&
		`
    background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
    color: #1e1b4b;
    border: 2px solid #fbbf24;
  `}
  
  ${(props) =>
		!props.$active &&
		!props.$completed &&
		`
    background: transparent;
    color: #9ca3af;
    border: 2px solid #9ca3af;
  `}
`;

export const StyledStepLabel = styled.span<{ $active: boolean; $completed: boolean }>`
	font-size: 0.9rem;
	font-weight: 600;
	text-align: center;

	${(props) =>
		props.$completed &&
		`
    color: #10b981;
  `}

	${(props) =>
		props.$active &&
		!props.$completed &&
		`
    color: #fbbf24;
  `}
  
  ${(props) =>
		!props.$active &&
		!props.$completed &&
		`
    color: #9ca3af;
  `}
`;

export const StyledNavigationButtons = styled.div`
	display: flex;
	gap: 1rem;
`;

export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
	padding: 0.5rem 1rem;
	border-radius: 6px;
	font-weight: bold;
	font-size: 0.9rem;
	cursor: pointer;
	transition: all 0.3s ease;
	border: none;
	min-width: 80px;

	${(props) =>
		props.$variant === 'primary' &&
		`
    background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
    color: #1e1b4b;
    
    &:hover {
      background: linear-gradient(145deg, #f59e0b 0%, #d97706 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
    }
  `}

	${(props) =>
		props.$variant === 'secondary' &&
		`
    background: transparent;
    color: #9ca3af;
    border: 2px solid #9ca3af;
    
    &:hover {
      color: #fbbf24;
      border-color: #fbbf24;
    }
  `}
  
  &:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}
`;
````

## File: src/routes/character-creation/styles/ClassFeatures.styles.ts
````typescript
import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: 2px solid #8b5cf6;
	padding: 1.5rem;
	border-radius: 12px;
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	margin-top: 2rem;
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
`;

export const StyledTitle = styled.h2`
	margin-top: 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	letter-spacing: 1px;
	border-bottom: 2px solid #ef4444;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledSection = styled.div`
	margin-top: 1rem;
`;

export const StyledSectionTitle = styled.h3`
	margin: 0 0 1rem 0;
	color: #ef4444;
	font-size: 1.5rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	border-bottom: 2px solid #ef4444;
	padding-bottom: 0.5rem;
`;

export const StyledCard = styled.div`
	border: 2px solid #a855f7;
	padding: 1.5rem;
	border-radius: 10px;
	margin-bottom: 1rem;
	background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
	box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
`;

export const StyledCardTitle = styled.h4`
	margin: 0 0 0.5rem 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledCardDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	line-height: 1.4;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledChoiceOptions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledLabel = styled.label`
	display: flex;
	align-items: flex-start;
	gap: 0.8rem;
	cursor: pointer;
	color: #e5e7eb;
	font-size: 0.95rem;
	line-height: 1.4;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	padding: 0.5rem;
	border-radius: 5px;
	transition: all 0.2s ease;

	&:hover {
		color: #fbbf24;
		background: rgba(139, 92, 246, 0.1);
	}
`;

export const StyledRadio = styled.input`
	margin-top: 0.25rem;
	flex-shrink: 0;
	width: 18px;
	height: 18px;
	accent-color: #ef4444;
	cursor: pointer;
`;

export const StyledOptionDescription = styled.span`
	font-size: 0.9em;
	color: #9ca3af;
	margin-left: 0.5rem;
	font-style: italic;
`;

export const StyledNoSelection = styled.p`
	color: #9ca3af;
	font-style: italic;
	text-align: center;
	font-size: 1.1rem;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;
````

## File: src/routes/character-creation/styles/ClassSelector.styles.ts
````typescript
import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: 2px solid #8b5cf6;
	padding: 1.5rem;
	border-radius: 12px;
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	margin-top: 2rem;
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
`;

export const StyledTitle = styled.h2`
	margin-top: 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	letter-spacing: 1px;
	border-bottom: 2px solid #ef4444;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin-top: 1rem;
`;

export const StyledCard = styled.button<{ $selected: boolean }>`
	border: 2px solid #a855f7;
	padding: 1.5rem;
	border-radius: 10px;
	background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
	cursor: pointer;
	transition: all 0.3s ease;
	flex: 1;
	min-width: 280px;
	max-width: 280px;
	height: 200px;
	text-align: left;
	box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(168, 85, 247, 0.4);
		border-color: #fbbf24;
	}

	${(props) =>
		props.$selected &&
		`
    border-color: #ef4444;
    background: linear-gradient(145deg, #991b1b 0%, #dc2626 100%);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.5);
    transform: translateY(-2px);
  `}
`;

export const StyledCardHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
`;

export const StyledClassIcon = styled.div`
	font-size: 2rem;
	flex-shrink: 0;
	background: linear-gradient(145deg, #8b5cf6 0%, #a855f7 100%);
	border-radius: 50%;
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const StyledCardTitle = styled.h3`
	margin: 0;
	color: #fbbf24;
	font-size: 1.4rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledCardDescription = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 0.9rem;
	line-height: 1.4;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	flex: 1;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	position: relative;
`;

export const StyledCardFooter = styled.div`
	margin-top: 0.5rem;
	display: flex;
	justify-content: flex-end;
`;

export const StyledReadMore = styled.button`
	color: #fbbf24;
	font-size: 0.85rem;
	font-weight: bold;
	cursor: pointer;
	text-decoration: underline;
	background: none;
	border: none;
	padding: 0.5rem 0.75rem;
	border-radius: 4px;
	transition: all 0.2s ease;

	&:hover {
		color: #f59e0b;
		background: rgba(251, 191, 36, 0.1);
	}

	&:active {
		transform: scale(0.95);
	}
`;

export const StyledTooltip = styled.div<{ $show: boolean }>`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
	color: #e5e7eb;
	padding: 2rem;
	border-radius: 12px;
	border: 3px solid #8b5cf6;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
	z-index: 2000;
	width: 90vw;
	max-width: 500px;
	max-height: 80vh;
	overflow-y: auto;
	font-size: 1rem;
	line-height: 1.6;
	opacity: ${(props) => (props.$show ? 1 : 0)};
	pointer-events: ${(props) => (props.$show ? 'auto' : 'none')};
	transition: opacity 0.3s ease;

	/* Custom scrollbar for popup */
	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-track {
		background: #1e1b4b;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb {
		background: #8b5cf6;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #a855f7;
	}
`;

export const StyledTooltipOverlay = styled.div<{ $show: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	z-index: 1999;
	opacity: ${(props) => (props.$show ? 1 : 0)};
	pointer-events: ${(props) => (props.$show ? 'auto' : 'none')};
	transition: opacity 0.3s ease;
`;

export const StyledTooltipHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.5rem;
	padding-bottom: 1rem;
	border-bottom: 2px solid #8b5cf6;
`;

export const StyledTooltipIcon = styled.div`
	font-size: 3rem;
	background: linear-gradient(145deg, #8b5cf6 0%, #a855f7 100%);
	border-radius: 50%;
	width: 70px;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
`;

export const StyledTooltipTitle = styled.h3`
	margin: 0;
	color: #fbbf24;
	font-size: 1.8rem;
	font-weight: bold;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const StyledTooltipContent = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 1.1rem;
	line-height: 1.6;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledCloseHint = styled.div`
	margin-top: 1.5rem;
	padding-top: 1rem;
	border-top: 1px solid #8b5cf6;
	text-align: center;
	color: #9ca3af;
	font-size: 0.9rem;
	font-style: italic;
`;
````

## File: src/routes/character-creation/styles/LoadCharacter.styles.ts
````typescript
// Styled components for LoadCharacter component
import styled from 'styled-components';

export const StyledContainer = styled.div`
	padding: 2rem;
	min-height: 100vh;
	background: linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%);
`;

export const StyledTitle = styled.h1`
	margin-bottom: 2rem;
	color: #fbbf24;
	text-align: center;
	font-size: 2.2rem;
	font-weight: bold;
	text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
	letter-spacing: 2px;
`;

export const StyledCharacterGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 1.5rem;
	max-width: 1200px;
	margin: 0 auto;
`;

export const StyledCharacterCard = styled.div`
	border: 2px solid #8b5cf6;
	border-radius: 12px;
	padding: 1.5rem;
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
	transition: all 0.3s ease;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 40px rgba(139, 92, 246, 0.4);
		border-color: #fbbf24;
	}
`;

export const StyledCardActions = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-top: 1rem;
`;

export const StyledActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
	flex: 1;
	padding: 0.6rem 1rem;
	border: 2px solid ${(props) => (props.variant === 'primary' ? '#fbbf24' : '#8b5cf6')};
	border-radius: 6px;
	background: ${(props) => (props.variant === 'primary' ? '#fbbf24' : 'transparent')};
	color: ${(props) => (props.variant === 'primary' ? '#1e1b4b' : '#8b5cf6')};
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.9rem;
	font-weight: bold;

	&:hover {
		background: ${(props) => (props.variant === 'primary' ? '#f59e0b' : '#8b5cf6')};
		color: ${(props) => (props.variant === 'primary' ? '#1e1b4b' : 'white')};
		transform: translateY(-1px);
	}
`;

export const StyledCharacterName = styled.h2`
	margin: 0 0 1rem 0;
	color: #fbbf24;
	font-size: 1.5rem;
	font-weight: bold;
	text-align: center;
`;

export const StyledPlayerName = styled.p`
	margin: 0 0 1rem 0;
	color: #e5e7eb;
	font-size: 1rem;
	text-align: center;
	opacity: 0.8;
`;

export const StyledCharacterDetails = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
`;

export const StyledDetailItem = styled.div`
	text-align: center;
`;

export const StyledDetailLabel = styled.div`
	color: #a855f7;
	font-size: 0.8rem;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

export const StyledDetailValue = styled.div`
	color: #e5e7eb;
	font-size: 1rem;
	font-weight: bold;
	margin-top: 0.25rem;
`;

export const StyledCompletedDate = styled.p`
	margin: 0;
	color: #6b7280;
	font-size: 0.875rem;
	text-align: center;
	font-style: italic;
`;

export const StyledEmptyState = styled.div`
	text-align: center;
	padding: 4rem 2rem;
	color: #6b7280;
`;

export const StyledEmptyTitle = styled.h2`
	color: #a855f7;
	font-size: 1.5rem;
	margin-bottom: 1rem;
`;

export const StyledEmptyText = styled.p`
	font-size: 1rem;
	line-height: 1.6;
`;

export const StyledBackButton = styled.button`
	padding: 0.75rem 1.5rem;
	margin-bottom: 2rem;
	border: none;
	border-radius: 8px;
	background: linear-gradient(145deg, #6b7280 0%, #4b5563 100%);
	color: white;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		background: linear-gradient(145deg, #4b5563 0%, #374151 100%);
		transform: translateY(-2px);
	}
`;
````

## File: src/routes/character-creation/styles/SelectedAncestries.styles.ts
````typescript
import styled from 'styled-components';

export const StyledOuterContainer = styled.div`
	border: 2px solid #8b5cf6;
	padding: 1.5rem;
	border-radius: 12px;
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	margin-top: 2rem;
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
`;

export const StyledMainTitle = styled.h2`
	margin-top: 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	letter-spacing: 1px;
	border-bottom: 2px solid #ef4444;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
`;

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

export const StyledAncestryDetails = styled.div`
	border: 2px solid #a855f7;
	padding: 1.5rem;
	border-radius: 10px;
	background: linear-gradient(145deg, #2d1b69 0%, #4c1d95 100%);
	box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2);
`;

export const StyledTitle = styled.h2`
	margin: 0 0 1rem 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	text-align: center;
	border-bottom: 2px solid #ef4444;
	padding-bottom: 0.5rem;
`;

export const StyledSubtitle = styled.h3`
	margin: 1rem 0 0.5rem 0;
	color: #ef4444;
	font-size: 1.3rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	border-bottom: 1px solid #ef4444;
	padding-bottom: 0.25rem;
`;

export const StyledList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

export const StyledListItem = styled.li`
	margin-bottom: 0.8rem;
	padding: 0.5rem;
	border-radius: 5px;
	background: rgba(139, 92, 246, 0.1);
	border-left: 3px solid #8b5cf6;
`;

export const StyledLabel = styled.label`
	display: flex;
	align-items: flex-start;
	gap: 0.8rem;
	cursor: pointer;
	color: #e5e7eb;
	font-size: 0.95rem;
	line-height: 1.4;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

	&:hover {
		color: #fbbf24;
	}
`;

export const StyledCheckbox = styled.input`
	margin-top: 0.25rem;
	flex-shrink: 0;
	width: 18px;
	height: 18px;
	accent-color: #ef4444;
	cursor: pointer;
`;
````

## File: src/routes/character-sheet/components/Currency.tsx
````typescript
import React from 'react';
import {
	CurrencyContainer,
	CurrencyTitle,
	CurrencyRow,
	CurrencyIconContainer,
	CurrencyIcon,
	CurrencyLabel,
	CurrencyInput
} from '../styles/Currency';

interface CurrencyProps {
	currentValues: {
		platinumPieces: number;
		goldPieces: number;
		electrumPieces: number;
		silverPieces: number;
		copperPieces: number;
	};
	onCurrencyChange: (currency: string, value: number) => void;
}

const Currency: React.FC<CurrencyProps> = ({ currentValues, onCurrencyChange }) => {
	const handleInputChange = (currency: string, value: string) => {
		onCurrencyChange(currency, parseInt(value) || 0);
	};

	const currencyTypes = [
		{
			key: 'platinumPieces',
			label: 'Platinum',
			color: '#e5e4e2',
			borderColor: '#d3d3d3',
			value: currentValues.platinumPieces
		},
		{
			key: 'goldPieces',
			label: 'Gold',
			color: '#ffd700',
			borderColor: '#b8860b',
			value: currentValues.goldPieces
		},
		{
			key: 'electrumPieces',
			label: 'Electrum',
			color: '#daa520',
			borderColor: '#b8860b',
			value: currentValues.electrumPieces
		},
		{
			key: 'silverPieces',
			label: 'Silver',
			color: '#c0c0c0',
			borderColor: '#a0a0a0',
			value: currentValues.silverPieces
		},
		{
			key: 'copperPieces',
			label: 'Copper',
			color: '#b87333',
			borderColor: '#8b4513',
			value: currentValues.copperPieces
		}
	];

	return (
		<CurrencyContainer>
			<CurrencyTitle>CURRENCY</CurrencyTitle>

			{currencyTypes.map(({ key, label, color, borderColor, value }) => (
				<CurrencyRow key={key}>
					<CurrencyIconContainer>
						<CurrencyIcon color={color} borderColor={borderColor} />
						<CurrencyLabel>{label}</CurrencyLabel>
					</CurrencyIconContainer>
					<CurrencyInput
						type="number"
						min="0"
						value={value}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleInputChange(key, e.target.value)
						}
					/>
				</CurrencyRow>
			))}
		</CurrencyContainer>
	);
};

export default Currency;
````

## File: src/routes/character-sheet/components/Defenses.tsx
````typescript
import React from 'react';
import {
	DefensesContainer,
	DefenseItem,
	DefenseLabelContainer,
	DefenseLabel,
	ShieldContainer,
	ShieldValue,
	DefenseFooter,
	AutoCalculatedNote
} from '../styles/Defenses';

interface DefensesProps {
	characterData: {
		finalPD: number;
		finalPDR: number;
		finalAD: number;
	};
}

const Defenses: React.FC<DefensesProps> = ({ characterData }) => {
	return (
		<DefensesContainer>
			{/* Physical Defense */}
			<DefenseItem>
				<DefenseLabelContainer>
					<DefenseLabel>PHYSICAL</DefenseLabel>
					<DefenseLabel>DEFENSE</DefenseLabel>
				</DefenseLabelContainer>
				<ShieldContainer>
					<ShieldValue>{characterData.finalPD}</ShieldValue>
				</ShieldContainer>
				<DefenseFooter />
			</DefenseItem>

			{/* Physical Damage Reduction */}
			<DefenseItem>
				<DefenseLabelContainer>
					<DefenseLabel>PHYSICAL</DefenseLabel>
					<DefenseLabel>DMG REDUCTION</DefenseLabel>
				</DefenseLabelContainer>
				<ShieldContainer>
					<ShieldValue>{characterData.finalPDR || 0}</ShieldValue>
				</ShieldContainer>
				<DefenseFooter>
					{characterData.finalPDR > 0 && <AutoCalculatedNote>Auto-calculated</AutoCalculatedNote>}
				</DefenseFooter>
			</DefenseItem>

			{/* Mystical Defense */}
			<DefenseItem>
				<DefenseLabelContainer>
					<DefenseLabel>MYSTICAL</DefenseLabel>
					<DefenseLabel>DEFENSE</DefenseLabel>
				</DefenseLabelContainer>
				<ShieldContainer>
					<ShieldValue>{characterData.finalAD}</ShieldValue>
				</ShieldContainer>
				<DefenseFooter />
			</DefenseItem>
		</DefensesContainer>
	);
};

export default Defenses;
````

## File: src/routes/character-sheet/components/Resources.tsx
````typescript
import React from 'react';
import {
	ResourcesContainer,
	ResourceColumn,
	ResourceLabel,
	ResourceControls,
	TempHPControls,
	TempHPLabel,
	TempHPInputSmall
} from '../styles/Resources';
import { StyledResourceButton } from '../styles/Resources';
import {
	StyledPotionContainer,
	StyledPotionFill,
	StyledPotionBubbles,
	StyledPotionValue,
	StyledLargePotionContainer,
	StyledLargePotionValue
} from '../styles/Potions';

interface ResourcesProps {
	characterData: {
		finalSPMax: number;
		finalMPMax: number;
		finalHPMax: number;
	};
	currentValues: {
		currentSP: number;
		currentMP: number;
		currentHP: number;
		tempHP: number;
	};
	onAdjustResource: (
		resource: 'currentSP' | 'currentMP' | 'currentHP' | 'tempHP',
		amount: number
	) => void;
	onResourceInputChange: (resource: 'tempHP', value: string) => void;
	getFillPercentage: (current: number, max: number) => number;
	getHPFillPercentage: (current: number, max: number, tempHP: number) => number;
}

const Resources: React.FC<ResourcesProps> = ({
	characterData,
	currentValues,
	onAdjustResource,
	onResourceInputChange,
	getFillPercentage,
	getHPFillPercentage
}) => {
	return (
		<ResourcesContainer>
			{/* Stamina Points */}
			<ResourceColumn>
				<ResourceLabel>STAMINA POINTS</ResourceLabel>
				<ResourceControls>
					<StyledResourceButton onClick={() => onAdjustResource('currentSP', -1)}>
						-
					</StyledResourceButton>
					<StyledPotionContainer style={{ borderColor: '#22c55e' }}>
						<StyledPotionFill
							fillPercentage={getFillPercentage(currentValues.currentSP, characterData.finalSPMax)}
							color="#22c55e"
						/>
						<StyledPotionBubbles
							color="#22c55e"
							fillPercentage={getFillPercentage(currentValues.currentSP, characterData.finalSPMax)}
						/>
						<StyledPotionValue>{currentValues.currentSP}</StyledPotionValue>
					</StyledPotionContainer>
					<StyledResourceButton onClick={() => onAdjustResource('currentSP', 1)}>
						+
					</StyledResourceButton>
				</ResourceControls>
				<div
					style={{
						fontSize: '1.1rem',
						fontWeight: '300',
						color: '#666',
						marginTop: '0.3rem',
						fontStyle: 'italic'
					}}
				>
					{characterData.finalSPMax}
				</div>
			</ResourceColumn>

			{/* Mana Points */}
			<ResourceColumn>
				<ResourceLabel>MANA POINTS</ResourceLabel>
				<ResourceControls>
					<StyledResourceButton onClick={() => onAdjustResource('currentMP', -1)}>
						-
					</StyledResourceButton>
					<StyledPotionContainer style={{ borderColor: '#3b82f6' }}>
						<StyledPotionFill
							fillPercentage={getFillPercentage(currentValues.currentMP, characterData.finalMPMax)}
							color="#3b82f6"
						/>
						<StyledPotionBubbles
							color="#3b82f6"
							fillPercentage={getFillPercentage(currentValues.currentMP, characterData.finalMPMax)}
						/>
						<StyledPotionValue>{currentValues.currentMP}</StyledPotionValue>
					</StyledPotionContainer>
					<StyledResourceButton onClick={() => onAdjustResource('currentMP', 1)}>
						+
					</StyledResourceButton>
				</ResourceControls>
				<div
					style={{
						fontSize: '1.1rem',
						fontWeight: '300',
						color: '#666',
						marginTop: '0.3rem',
						fontStyle: 'italic'
					}}
				>
					{characterData.finalMPMax}
				</div>
			</ResourceColumn>

			{/* Hit Points */}
			<ResourceColumn>
				<ResourceLabel>HIT POINTS</ResourceLabel>
				<ResourceControls>
					<StyledResourceButton onClick={() => onAdjustResource('currentHP', -1)}>
						-
					</StyledResourceButton>
					<StyledLargePotionContainer style={{ borderColor: '#dc2626' }}>
						<StyledPotionFill
							fillPercentage={getHPFillPercentage(
								currentValues.currentHP,
								characterData.finalHPMax,
								currentValues.tempHP
							)}
							color="#dc2626"
						/>
						<StyledPotionBubbles
							color="#dc2626"
							fillPercentage={getHPFillPercentage(
								currentValues.currentHP,
								characterData.finalHPMax,
								currentValues.tempHP
							)}
						/>
						<StyledLargePotionValue>{currentValues.currentHP}</StyledLargePotionValue>
					</StyledLargePotionContainer>
					<StyledResourceButton onClick={() => onAdjustResource('currentHP', 1)}>
						+
					</StyledResourceButton>
				</ResourceControls>
				<div
					style={{
						fontSize: '1.1rem',
						fontWeight: '300',
						color: '#666',
						marginTop: '0.3rem',
						fontStyle: 'italic',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '0.5rem'
					}}
				>
					<span>{characterData.finalHPMax}</span>
					{currentValues.tempHP > 0 && (
						<span style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '0.9rem' }}>
							(+{currentValues.tempHP} temp)
						</span>
					)}
				</div>

				{/* Temp HP Controls */}
				<TempHPControls>
					<TempHPLabel>TEMP HP:</TempHPLabel>
					<StyledResourceButton
						onClick={() => onAdjustResource('tempHP', -1)}
						style={{ fontSize: '0.7rem', width: '20px', height: '20px', padding: '0' }}
					>
						-
					</StyledResourceButton>
					<TempHPInputSmall
						type="number"
						value={currentValues.tempHP}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							onResourceInputChange('tempHP', e.target.value)
						}
					/>
					<StyledResourceButton
						onClick={() => onAdjustResource('tempHP', 1)}
						style={{ fontSize: '0.7rem', width: '20px', height: '20px', padding: '0' }}
					>
						+
					</StyledResourceButton>
				</TempHPControls>
			</ResourceColumn>
		</ResourcesContainer>
	);
};

export default Resources;
````

## File: src/routes/character-sheet/styles/Attacks.ts
````typescript
import styled from 'styled-components';

export const StyledAttacksSection = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const StyledAttacksHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
`;

export const StyledAttacksTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	text-align: center;
	flex: 1;
`;

export const StyledAddWeaponButton = styled.button`
	padding: 0.3rem 0.8rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: #8b4513;
	color: white;
	font-size: 0.8rem;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: #6d3410;
	}
`;

export const StyledAttacksContainer = styled.div`
	font-size: 0.8rem;
	color: #8b4513;
`;

export const StyledAttacksHeaderRow = styled.div`
	display: grid;
	grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.7fr 0.8fr;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	border-bottom: 1px solid #e5e5e5;
	padding-bottom: 0.3rem;
	align-items: center;
`;

export const StyledHeaderColumn = styled.span<{ align?: string }>`
	font-weight: bold;
	text-align: ${(props) => props.align || 'left'};
	font-size: 0.8rem;
	line-height: 1.1;
`;

export const StyledEmptyState = styled.div`
	text-align: center;
	font-style: italic;
	padding: 2rem;
	color: #666;
`;

export const StyledAttackRow = styled.div`
	display: grid;
	grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 0.7fr 0.8fr;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	align-items: center;
`;

export const StyledRemoveButton = styled.button`
	width: 24px;
	height: 24px;
	border: 1px solid #dc2626;
	border-radius: 4px;
	background: #dc2626;
	color: white;
	font-size: 0.8rem;
	font-weight: bold;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.2s;

	&:hover {
		background-color: #b91c1c;
	}
`;

export const StyledWeaponSelect = styled.select`
	padding: 0.2rem;
	border: 1px solid #8b4513;
	border-radius: 3px;
	font-size: 0.7rem;
	background: white;
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const StyledDamageCell = styled.div<{ color?: string }>`
	text-align: center;
	font-weight: bold;
	color: ${(props) => props.color || 'inherit'};
	cursor: help;
`;

export const StyledInfoIcon = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 14px;
	height: 14px;
	border-radius: 50%;
	background-color: #8b4513;
	color: white;
	font-size: 10px;
	font-weight: bold;
	cursor: help;
`;

export const StyledDamageTypeCell = styled.div`
	text-align: center;
	font-size: 1rem;
	font-weight: bold;
	cursor: help;
`;
````

## File: src/routes/character-sheet/styles/AttributesSections.styles.ts
````typescript
import styled from 'styled-components';

export const StyledAttributesSectionsContainer = styled.div`
	/* This is the container for all the remaining inline styled sections */
`;

export const StyledPrimeSection = styled.div`
	margin-bottom: 1rem;
`;

export const StyledPrimeBox = styled.div`
	text-align: center;
	padding: 0.5rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	background: #f5f5dc;
	margin-bottom: 0.5rem;
`;

export const StyledPrimeLabel = styled.div`
	color: #8b4513;
	font-weight: bold;
`;

export const StyledPrimeValue = styled.div`
	font-size: 1.4rem;
	font-weight: bold;
	color: #8b4513;
`;

export const StyledSkillRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: white;
	margin-bottom: 0.3rem;
`;

export const StyledSkillName = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const StyledAttributeSection = styled.div`
	margin-bottom: 1rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const StyledAttributeHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const StyledAttributeBox = styled.div`
	width: 60px;
	height: 60px;
	border: 2px solid #8b4513;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #f5f5dc;
	margin-right: 1rem;
`;

export const StyledAttributeAbbr = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
	color: #8b4513;
`;

export const StyledAttributeValue = styled.div`
	font-size: 1.4rem;
	font-weight: bold;
	color: #8b4513;
`;

export const StyledAttributeInfo = styled.div`
	flex: 1;
`;

export const StyledAttributeName = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.2rem;
`;

export const StyledAttributeSave = styled.div`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const StyledAttributeSkillRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: #f9f9f9;
	margin-bottom: 0.3rem;
`;

export const StyledKnowledgeTradesSection = styled.div`
	margin-bottom: 1rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const StyledSectionTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.5rem;
	text-align: center;
`;

export const StyledSectionSubtitle = styled.div`
	font-size: 0.8rem;
	color: #8b4513;
	margin-bottom: 0.5rem;
	text-align: center;
`;

export const StyledLanguageRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: #f9f9f9;
	margin-bottom: 0.3rem;
`;

export const StyledLanguageName = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const StyledFluencyControls = styled.div`
	display: flex;
	gap: 0.2rem;
`;

export const StyledFluencyBox = styled.div<{ active: boolean }>`
	width: 15px;
	height: 15px;
	border: 1px solid #8b4513;
	background: ${(props) => (props.active ? '#8b4513' : 'white')};
	border-radius: 2px;
`;

export const StyledFluencyLabel = styled.span`
	font-size: 0.8rem;
	color: #8b4513;
	margin-left: ${(props) => (props.children === 'FLUENT' ? '0.5rem' : '0')};
`;

export const StyledNoItemsMessage = styled.div`
	font-size: 0.9rem;
	color: #8b4513;
	text-align: center;
	font-style: italic;
	padding: 1rem;
`;
````

## File: src/routes/character-sheet/styles/Currency.ts
````typescript
import styled from 'styled-components';

export const CurrencyContainer = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const CurrencyTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 1rem;
	text-align: center;
`;

export const CurrencyRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const CurrencyIconContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.3rem;
`;

export const CurrencyIcon = styled.div<{ color: string; borderColor: string }>`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: ${(props) => props.color};
	border: 1px solid ${(props) => props.borderColor};
`;

export const CurrencyLabel = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
	font-weight: bold;
`;

export const CurrencyInput = styled.input`
	width: 60px;
	padding: 0.2rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	text-align: center;
	font-size: 0.8rem;
	background-color: white;

	&:focus {
		outline: none;
		border-color: #6d3410;
		box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.2);
	}
`;
````

## File: src/routes/character-sheet/styles/Death.ts
````typescript
import styled from 'styled-components';

export const StyledDeathContainer = styled.div`
	flex: 1;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	text-align: center;
`;

export const StyledDeathTitle = styled.div`
	font-size: 0.9rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.5rem;
`;

export const StyledHealthStatus = styled.div<{
	status: 'healthy' | 'bloodied' | 'well-bloodied' | 'deaths-door' | 'dead';
}>`
	font-size: 0.8rem;
	font-weight: bold;
	margin-bottom: 0.3rem;
	padding: 0.2rem 0.4rem;
	border-radius: 4px;
	color: ${(props) => {
		switch (props.status) {
			case 'healthy':
				return '#22c55e';
			case 'bloodied':
				return '#f59e0b';
			case 'well-bloodied':
				return '#f97316';
			case 'deaths-door':
				return '#dc2626';
			case 'dead':
				return '#7f1d1d';
			default:
				return '#8b4513';
		}
	}};
	background: ${(props) => {
		switch (props.status) {
			case 'healthy':
				return '#dcfce7';
			case 'bloodied':
				return '#fef3c7';
			case 'well-bloodied':
				return '#fed7aa';
			case 'deaths-door':
				return '#fecaca';
			case 'dead':
				return '#fca5a5';
			default:
				return 'transparent';
		}
	}};
`;

export const StyledDeathThreshold = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.5rem;
`;

export const StyledDeathStepsContainer = styled.div`
	margin-top: 0.5rem;
`;

export const StyledDeathStepsTitle = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
	color: #dc2626;
	margin-bottom: 0.3rem;
`;

export const StyledDeathStepsGrid = styled.div`
	display: flex;
	justify-content: center;
	gap: 0.2rem;
	flex-wrap: wrap;
`;

export const StyledDeathStep = styled.div<{ filled: boolean; isDead: boolean }>`
	position: relative;
	width: 20px;
	height: 20px;
	border: 2px solid ${(props) => (props.isDead ? '#7f1d1d' : '#dc2626')};
	background: ${(props) => {
		if (props.isDead) return '#7f1d1d';
		return props.filled ? '#dc2626' : 'white';
	}};
	color: ${(props) => {
		if (props.isDead) return 'white';
		return props.filled ? 'white' : '#dc2626';
	}};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.7rem;
	font-weight: bold;
	cursor: pointer;
	border-radius: 3px;
	transition: all 0.2s ease;

	&:hover {
		background: ${(props) => {
			if (props.isDead) return '#991b1b';
			return props.filled ? '#b91c1c' : '#fecaca';
		}};
		transform: scale(1.1);
	}

	${(props) =>
		props.isDead &&
		`
    &::after {
      content: '☠';
      font-size: 0.8rem;
    }
  `}
`;

export const StyledDeathStepTooltip = styled.div`
	position: absolute;
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
	background: #333;
	color: white;
	padding: 0.3rem 0.5rem;
	border-radius: 4px;
	font-size: 0.7rem;
	white-space: nowrap;
	z-index: 1000;
	margin-bottom: 5px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	opacity: 0;
	visibility: hidden;
	transition:
		opacity 0.2s ease,
		visibility 0.2s ease;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: 5px solid transparent;
		border-top-color: #333;
	}

	${StyledDeathStep}:hover & {
		opacity: 1;
		visibility: visible;
	}
`;

export const StyledHealthStatusTooltip = styled.div`
	position: relative;
	cursor: help;

	&::after {
		content: attr(data-tooltip);
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		background: #333;
		color: white;
		padding: 0.5rem;
		border-radius: 4px;
		font-size: 0.7rem;
		white-space: pre-line;
		z-index: 1000;
		margin-bottom: 5px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.2s ease,
			visibility 0.2s ease;
		max-width: 200px;
		text-align: left;
	}

	&:hover::after {
		opacity: 1;
		visibility: visible;
	}
`;
````

## File: src/routes/character-sheet/styles/DeathExhaustion.styles.ts
````typescript
import styled from 'styled-components';

export const StyledDeathExhaustionContainer = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 1.5rem;
`;

export const StyledExhaustionOnlyContainer = styled.div`
	flex: 1;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	text-align: center;
`;

export const StyledExhaustionOnlyTitle = styled.div`
	font-size: 0.9rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.5rem;
`;
````

## File: src/routes/character-sheet/styles/Defenses.ts
````typescript
import styled from 'styled-components';

export const DefensesContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-bottom: 1.5rem;
`;

export const DefenseItem = styled.div`
	text-align: center;
	width: 120px;
`;

export const DefenseLabelContainer = styled.div`
	height: 32px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 0.3rem;
`;

export const DefenseLabel = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
	color: #8b4513;
	line-height: 1;
`;

export const ShieldContainer = styled.div`
	width: 80px;
	height: 90px;
	border: 3px solid #8b4513;
	border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: white;
	margin: 0 auto;
`;

export const ShieldValue = styled.div`
	font-size: 2rem;
	font-weight: bold;
	color: #8b4513;
`;

export const DefenseFooter = styled.div`
	height: 20px;
	margin-top: 0.2rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const AutoCalculatedNote = styled.div`
	font-size: 0.6rem;
	color: #8b4513;
`;
````

## File: src/routes/character-sheet/styles/Exhaustion.ts
````typescript
import styled from 'styled-components';

export const StyledExhaustionContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 0.3rem;
	margin-top: 0.5rem;
`;

export const StyledExhaustionLevel = styled.div<{ filled: boolean }>`
	position: relative;
	width: 24px;
	height: 24px;
	border: 2px solid #8b4513;
	background: ${(props) => (props.filled ? '#8b4513' : 'white')};
	color: ${(props) => (props.filled ? 'white' : '#8b4513')};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.8rem;
	font-weight: bold;
	cursor: pointer;
	border-radius: 3px;
	transition: all 0.2s ease;

	&:hover {
		background: ${(props) => (props.filled ? '#654321' : '#f5f5dc')};
		transform: scale(1.1);
	}
`;

export const StyledExhaustionTooltip = styled.div`
	position: absolute;
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
	background: #333;
	color: white;
	padding: 0.5rem 0.75rem;
	border-radius: 4px;
	font-size: 0.8rem;
	white-space: nowrap;
	z-index: 1000;
	margin-bottom: 5px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	opacity: 0;
	visibility: hidden;
	transition:
		opacity 0.2s ease,
		visibility 0.2s ease;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: 5px solid transparent;
		border-top-color: #333;
	}

	${StyledExhaustionLevel}:hover & {
		opacity: 1;
		visibility: visible;
	}
`;
````

## File: src/routes/character-sheet/styles/FeaturePopup.ts
````typescript
import styled from 'styled-components';

export const StyledFeaturePopupOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

export const StyledFeaturePopupContent = styled.div`
	background: white;
	border: 3px solid #8b4513;
	border-radius: 12px;
	padding: 2rem;
	max-width: 600px;
	max-height: 80vh;
	overflow-y: auto;
	margin: 1rem;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

export const StyledFeaturePopupHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
	border-bottom: 2px solid #8b4513;
	padding-bottom: 1rem;
`;

export const StyledFeaturePopupTitle = styled.h2`
	margin: 0;
	color: #8b4513;
	font-size: 1.5rem;
	font-weight: bold;
`;

export const StyledFeaturePopupClose = styled.button`
	background: #8b4513;
	color: white;
	border: none;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	cursor: pointer;
	font-size: 1.2rem;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: #654321;
	}
`;

export const StyledFeaturePopupDescription = styled.div`
	color: #333;
	line-height: 1.6;
	font-size: 1rem;
`;

export const StyledFeaturePopupSourceInfo = styled.div`
	margin-top: 1rem;
	padding-top: 1rem;
	border-top: 1px solid #e5e5e5;
	font-size: 0.9rem;
	color: #666;
	font-style: italic;
`;
````

## File: src/routes/character-sheet/styles/Features.ts
````typescript
import styled from 'styled-components';

export const StyledFeatureGrid = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	margin-bottom: 1rem;
`;

export const StyledFeatureItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.4rem 0.5rem;
	border: 1px solid #e5e5e5;
	border-radius: 4px;
	background: #f9f9f9;
	min-height: 36px;
`;

export const StyledFeatureName = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
	font-weight: 500;
	flex: 1;
	line-height: 1.2;
	margin-right: 0.5rem;
`;

export const StyledFeatureReadMore = styled.button`
	background: #8b4513;
	color: white;
	border: none;
	border-radius: 3px;
	padding: 0.2rem 0.4rem;
	font-size: 0.75rem;
	cursor: pointer;
	margin-left: 0.5rem;
	white-space: nowrap;
	flex-shrink: 0;

	&:hover {
		background: #654321;
	}
`;

export const StyledFeatureCategory = styled.div`
	margin-bottom: 1rem;
`;

export const StyledFeatureCategoryTitle = styled.h4`
	margin: 0 0 0.5rem 0;
	color: #8b4513;
	font-size: 1rem;
	font-weight: bold;
	border-bottom: 1px solid #8b4513;
	padding-bottom: 0.2rem;
`;
````

## File: src/routes/character-sheet/styles/Header.ts
````typescript
import styled from 'styled-components';

export const StyledHeader = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr 1fr 1fr;
	gap: 1rem;
	margin-bottom: 1.5rem;
	border-bottom: 2px solid #8b4513;
	padding-bottom: 1rem;
`;

export const StyledHeaderSection = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StyledLabel = styled.label`
	font-size: 0.7rem;
	font-weight: bold;
	text-transform: uppercase;
	color: #8b4513;
	margin-bottom: 0.2rem;
`;

export const StyledValue = styled.div`
	font-size: 1rem;
	font-weight: bold;
	border-bottom: 1px solid #ccc;
	padding: 0.2rem 0;
	min-height: 1.5rem;
`;
````

## File: src/routes/character-sheet/styles/Info.ts
````typescript
import styled from 'styled-components';

export const StyledInfoSection = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: rgba(245, 243, 240, 0.5);
`;

export const StyledSectionTitle = styled.h3`
	font-size: 0.9rem;
	font-weight: bold;
	text-transform: uppercase;
	color: #8b4513;
	margin: 0 0 0.8rem 0;
	text-align: center;
	border-bottom: 1px solid #8b4513;
	padding-bottom: 0.3rem;
`;

export const StyledStatRow = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.4rem;
	font-size: 0.8rem;
`;

export const StyledStatLabel = styled.span`
	color: #666;
`;

export const StyledStatValue = styled.span`
	font-weight: bold;
	color: #2d2d2d;
`;
````

## File: src/routes/character-sheet/styles/Inventory.ts
````typescript
import styled from 'styled-components';

export const StyledInventorySection = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	margin-bottom: 1rem;
`;

export const StyledInventoryTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	text-align: center;
	margin-bottom: 1rem;
`;

export const StyledAddItemButton = styled.button`
	padding: 0.5rem 1rem;
	background-color: #8b4513;
	color: white;
	border: none;
	border-radius: 4px;
	font-size: 0.9rem;
	cursor: pointer;
	transition: background-color 0.2s;
	margin-bottom: 1rem;

	&:hover {
		background-color: #6d3410;
	}
`;

export const StyledInventoryContainer = styled.div`
	font-size: 0.8rem;
	color: #8b4513;
`;

export const StyledInventoryHeaderRow = styled.div`
	display: grid;
	grid-template-columns: 30px 100px 2fr 60px 30px 70px;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	border-bottom: 1px solid #e5e5e5;
	padding-bottom: 0.3rem;
	align-items: center;
`;

export const StyledInventoryHeaderColumn = styled.span<{ align?: string }>`
	font-weight: bold;
	text-align: ${(props) => props.align || 'left'};
`;

export const StyledInventoryRow = styled.div`
	display: grid;
	grid-template-columns: 30px 100px 2fr 60px 30px 70px;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	align-items: center;
`;

export const StyledRemoveItemButton = styled.button`
	width: 24px;
	height: 24px;
	border: 1px solid #dc2626;
	background-color: #fee2e2;
	color: #dc2626;
	border-radius: 4px;
	font-size: 14px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;

	&:hover {
		background-color: #fecaca;
	}
`;

export const StyledInventorySelect = styled.select`
	padding: 0.3rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 0.8rem;
	background-color: white;

	&:disabled {
		background-color: #f5f5f5;
		color: #999;
	}
`;

export const StyledInventoryInput = styled.input`
	padding: 0.3rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 0.8rem;
	text-align: center;
	background-color: white;
`;

export const StyledInventoryInfoIcon = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 14px;
	height: 14px;
	border-radius: 50%;
	background-color: #8b4513;
	color: white;
	font-size: 10px;
	font-weight: bold;
	cursor: help;
	position: relative;
`;

export const StyledInventoryCost = styled.div`
	text-align: center;
	font-size: 0.8rem;
	font-weight: bold;
`;

export const StyledEmptyInventory = styled.div`
	text-align: center;
	font-style: italic;
	padding: 2rem;
	color: #666;
`;
````

## File: src/routes/character-sheet/styles/KnowledgeTrades.ts
````typescript
import styled from 'styled-components';

export const KnowledgeTradesSection = styled.div`
	margin-bottom: 1rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const SectionTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.5rem;
	text-align: center;
`;

export const SectionDescription = styled.div`
	font-size: 0.8rem;
	color: #8b4513;
	margin-bottom: 0.5rem;
	text-align: center;
`;

export const EmptyMessage = styled.div`
	font-size: 0.9rem;
	color: #8b4513;
	text-align: center;
	font-style: italic;
	padding: 1rem;
`;
````

## File: src/routes/character-sheet/styles/Layout.ts
````typescript
import styled from 'styled-components';

export const StyledContainer = styled.div`
	min-height: 100vh;
	background: #f5f3f0;
	padding: 1rem;
	font-family: 'Georgia', serif;
	color: #2d2d2d;
`;

export const StyledBackButton = styled.button`
	position: fixed;
	top: 1rem;
	left: 1rem;
	padding: 0.5rem 1rem;
	border: 2px solid #8b4513;
	border-radius: 4px;
	background: #f5f3f0;
	color: #8b4513;
	cursor: pointer;
	font-weight: bold;
	z-index: 100;

	&:hover {
		background: #8b4513;
		color: #f5f3f0;
	}
`;

export const StyledCharacterSheet = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	background: #ffffff;
	border: 3px solid #8b4513;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	padding: 1.5rem;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:
			radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
			radial-gradient(circle at 80% 80%, rgba(139, 69, 19, 0.05) 0%, transparent 50%);
		pointer-events: none;
		border-radius: 5px;
	}
`;

export const StyledMainGrid = styled.div`
	display: grid;
	grid-template-columns: 300px 1fr 250px;
	gap: 1.5rem;
	height: auto;
`;

export const StyledLeftColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const StyledMiddleColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const StyledRightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
````

## File: src/routes/character-sheet/styles/Movement.styles.ts
````typescript
import styled from 'styled-components';

export const StyledMovementContainer = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	margin-bottom: 1rem;
`;

export const StyledMovementGrid = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
`;

export const StyledMovementStat = styled.div`
	text-align: center;
`;

export const StyledMovementLabel = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
	color: #8b4513;
`;

export const StyledMovementValue = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: #8b4513;
`;
````

## File: src/routes/character-sheet/styles/Movement.ts
````typescript
import styled from 'styled-components';

export const MovementContainer = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	margin-bottom: 1rem;
`;

export const MovementStats = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
`;

export const MovementStat = styled.div`
	text-align: center;
`;

export const StatLabel = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
	color: #8b4513;
`;

export const StatValue = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: #8b4513;
`;
````

## File: src/routes/character-sheet/styles/RightColumnResources.styles.ts
````typescript
import styled from 'styled-components';

export const StyledRightResourcesContainer = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	margin-bottom: 1rem;
`;

export const StyledRightResourcesTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	text-align: center;
	margin-bottom: 1rem;
`;

export const StyledRightResourceRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.8rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const StyledRightResourceLabel = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const StyledRightResourceControls = styled.div`
	display: flex;
	align-items: center;
	gap: 0.3rem;
`;

export const StyledRightResourceInput = styled.input`
	width: 40px;
	text-align: center;
	border: 1px solid #8b4513;
	border-radius: 4px;
	padding: 0.2rem;
	font-size: 0.9rem;
	color: #8b4513;

	&:focus {
		outline: none;
		border-color: #654321;
		box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.2);
	}
`;

export const StyledRightResourceMax = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
`;
````

## File: src/routes/character-sheet/styles/Skills.ts
````typescript
import styled from 'styled-components';

export const StyledSkillsSection = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: rgba(245, 243, 240, 0.5);
	flex: 1;
`;

export const StyledSkillItem = styled.div`
	display: grid;
	grid-template-columns: auto 1fr auto;
	gap: 0.5rem;
	align-items: center;
	margin-bottom: 0.3rem;
	font-size: 0.8rem;
`;

export const StyledProficiencyDots = styled.div`
	display: flex;
	gap: 2px;
`;

export const StyledDot = styled.div<{ filled: boolean }>`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	border: 1px solid #8b4513;
	background: ${(props) => (props.filled ? '#8b4513' : 'white')};
`;
````

## File: src/styles/App.styles.ts
````typescript
// Styled components for App component
import styled from 'styled-components';

export const StyledApp = styled.div`
	min-height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
`;

export const StyledHeader = styled.header`
	position: absolute;
	top: 1rem;
	right: 1rem;
	color: #fbbf24;
	font-size: 0.9rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	z-index: 10;
	display: flex;
	align-items: center;
	gap: 1rem;
`;

export const StyledBackButton = styled.button`
	padding: 0.5rem 1rem;
	border: 2px solid #fbbf24;
	border-radius: 6px;
	background: transparent;
	color: #fbbf24;
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.9rem;
	font-weight: bold;

	&:hover {
		background: #fbbf24;
		color: #1e1b4b;
		transform: translateY(-2px);
	}
`;

export const StyledMain = styled.main`
	flex: 1;
`;

export const StyledFooter = styled.footer`
	padding: 1rem;
	text-align: center;
	color: #9ca3af;
	font-size: 0.8rem;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	border-top: 1px solid rgba(139, 92, 246, 0.3);
	background: rgba(30, 27, 75, 0.5);
`;
````

## File: src/types/character.ts
````typescript
// Character Sheet Types and Interfaces

export interface CharacterSheetProps {
	characterId: string;
	onBack: () => void;
}

export interface CharacterSheetData {
	// Basic Info
	id: string;
	finalName: string;
	finalPlayerName?: string;
	finalLevel: number;

	// Attributes
	finalMight: number;
	finalAgility: number;
	finalCharisma: number;
	finalIntelligence: number;

	// Calculated Stats
	finalPrimeModifierValue: number;
	finalPrimeModifierAttribute: string;
	finalCombatMastery: number;

	// Saves (Attribute + Combat Mastery)
	finalSaveMight: number;
	finalSaveAgility: number;
	finalSaveCharisma: number;
	finalSaveIntelligence: number;

	// Health & Resources
	finalHPMax: number;
	finalSPMax: number;
	finalMPMax: number;

	// Defenses
	finalPD: number;
	finalAD: number;

	// PDR (Physical Damage Reduction)
	finalPDR: number;

	// Other Stats
	finalSaveDC: number;
	finalDeathThreshold: number;
	finalMoveSpeed: number;
	finalJumpDistance: number;
	finalRestPoints: number;
	finalGritPoints: number;
	finalInitiativeBonus: number;

	// Class & Ancestry Info
	className: string;
	ancestry1Name?: string;
	ancestry2Name?: string;

	// JSON data fields
	skillsJson?: string;
	tradesJson?: string;
	languagesJson?: string;
	selectedTraitIds?: string; // JSON string of selected trait IDs
	selectedFeatureChoices?: string; // JSON string of selected feature choices

	// Current values (optional, may not exist on first load)
	currentHP?: number;
	currentSP?: number;
	currentMP?: number;
	currentGritPoints?: number;
	currentRestPoints?: number;
	tempHP?: number;
	actionPointsUsed?: number;
	exhaustionLevel?: number;
}

export interface SkillData {
	id: string;
	name: string;
	attribute: string;
	proficiency: number; // 0-5
}

export interface TradeData {
	id: string;
	name: string;
	proficiency: number; // 0-5
}

export interface LanguageData {
	id: string;
	name: string;
	fluency: 'limited' | 'fluent';
}

export interface FeatureData {
	id: string;
	name: string;
	description: string;
	source: 'ancestry' | 'class' | 'choice';
	sourceDetail?: string; // e.g., "Human (Default)", "Barbarian Lvl 1", etc.
}

export interface CurrentValues {
	currentHP: number;
	currentSP: number;
	currentMP: number;
	currentGritPoints: number;
	currentRestPoints: number;
	tempHP: number;
	actionPointsUsed: number;
	exhaustionLevel: number; // 0-5
	// Currency
	goldPieces: number;
	silverPieces: number;
	copperPieces: number;
	electrumPieces: number;
	platinumPieces: number;
}

export interface AttackData {
	id: string;
	weaponId: string;
	name: string;
	attackBonus: number;
	damage: string;
	damageType: string;
	critRange: string;
	critDamage: string;
	brutalDamage: string;
	heavyHitEffect: string;
}

export interface InventoryItemData {
	id: string;
	itemType: 'Weapon' | 'Armor' | 'Shield' | 'Adventuring Supply' | 'Potion' | '';
	itemName: string;
	count: number;
	cost?: string;
}
````

## File: tsconfig.node.json
````json
{
	"compilerOptions": {
		"composite": true,
		"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
		"skipLibCheck": true,
		"module": "ESNext",
		"moduleResolution": "bundler",
		"allowSyntheticDefaultImports": true,
		"strict": true,
		"noEmit": true
	},
	"include": ["vite.config.ts"]
}
````

## File: src/lib/index.ts
````typescript
// Reexport your entry components here

// Rules data exports
export * from './rulesdata/weapons';
````

## File: src/lib/rulesdata/death.ts
````typescript
/**
 * DC20 Death & Health Threshold Rules
 * Based on official DC20 rulebook pages for Health Points & Death's Door
 */

export interface HealthStatus {
	status: 'healthy' | 'bloodied' | 'well-bloodied' | 'deaths-door' | 'dead';
	description: string;
	effects: string[];
}

export interface DeathSaveResult {
	success: boolean;
	effect: string;
}

/**
 * Calculate current health status based on HP
 */
export function getHealthStatus(
	currentHP: number,
	maxHP: number,
	deathThreshold: number
): HealthStatus {
	const halfHP = Math.floor(maxHP / 2);
	const quarterHP = Math.floor(maxHP / 4);

	if (currentHP <= deathThreshold) {
		return {
			status: 'dead',
			description: 'Dead',
			effects: ['Character is dead']
		};
	}

	if (currentHP <= 0) {
		return {
			status: 'deaths-door',
			description: "Death's Door",
			effects: [
				'Immediately gain Exhaustion 1',
				'Action Point Limit: 1 AP until end of next turn or restored to 1 HP',
				"Can't Concentrate",
				'Death Saves at end of turns (d20, 10+ succeeds)',
				'Failure: 1 True damage, Critical Failure: Unconscious until 1 HP',
				'Critical Success: Restored to 1 HP'
			]
		};
	}

	if (currentHP <= quarterHP) {
		return {
			status: 'well-bloodied',
			description: 'Well-Bloodied',
			effects: ['HP is 1/4 or lower of maximum', 'Subject to Well-Bloodied effects from abilities']
		};
	}

	if (currentHP <= halfHP) {
		return {
			status: 'bloodied',
			description: 'Bloodied',
			effects: ['HP is 1/2 or lower of maximum', 'Subject to Bloodied effects from abilities']
		};
	}

	return {
		status: 'healthy',
		description: 'Healthy',
		effects: ['No health penalties']
	};
}

/**
 * Calculate Death Threshold
 * Death Threshold = 0 HP minus Prime Modifier + Combat Mastery
 */
export function calculateDeathThreshold(primeModifier: number, combatMastery: number): number {
	return -(primeModifier + combatMastery);
}

/**
 * Death Save mechanics
 */
export function processDeathSave(roll: number): DeathSaveResult {
	if (roll === 1) {
		return {
			success: false,
			effect:
				'Critical Failure: Take 1 True damage and become Unconscious until restored to 1 HP or higher'
		};
	}

	if (roll === 20) {
		return {
			success: true,
			effect: 'Critical Success: Restored to 1 HP'
		};
	}

	if (roll >= 10) {
		return {
			success: true,
			effect: 'Success: Become Stabilized'
		};
	}

	return {
		success: false,
		effect: 'Failure: Take 1 True damage'
	};
}

/**
 * Death's Door After Combat rules
 */
export function getDeathsDoorAfterCombat(): string[] {
	return [
		"When Combat ends, any creature on Death's Door must immediately make a Death Save",
		'They repeat this Death Save every 12 seconds until they become Stabilized, are restored to 1 HP or higher, or die',
		'Failure: Take 1 True damage and fall Unconscious until Stabilized',
		'Success: Become Stabilized'
	];
}

/**
 * Stabilization rules
 */
export function getStabilizationRules(): string[] {
	return [
		"A creature that takes the Medicine Action and succeeds on a DC 10 Medicine Check can Stabilize a creature on Death's Door",
		"A Stabilized creature doesn't make Death Saves while on Death's Door",
		"A creature remains Stabilized until it's restored to 1 HP or takes damage"
	];
}

/**
 * Continuous damage rules (Bleeding, Burning)
 */
export function getContinuousDamageRules(): string[] {
	return [
		"Continuous damage (such as Bleeding and Burning) does not affect you while on Death's Door",
		"You still have these conditions on you, but they don't deal damage unless you're above 0 HP"
	];
}

/**
 * Death's Door threshold tracking for UI
 * Returns how many "steps" until death based on current HP and death threshold
 */
export function getDeathSteps(
	currentHP: number,
	deathThreshold: number
): {
	currentStep: number;
	maxSteps: number;
	isDead: boolean;
} {
	if (currentHP > 0) {
		return { currentStep: 0, maxSteps: 0, isDead: false };
	}

	const maxSteps = Math.abs(deathThreshold);
	const currentStep = Math.abs(currentHP);
	const isDead = currentHP <= deathThreshold;

	return { currentStep, maxSteps, isDead };
}
````

## File: src/lib/rulesdata/trades.ts
````typescript
import { ITradeData } from './types';

export const tradesData: ITradeData[] = [
	{
		id: 'alchemy',
		name: 'Alchemy',
		attributeAssociation: 'intelligence',
		description:
			'Alchemy is the practice of creating something by combining or changing other things. This includes creating potions, poisons, and other alchemical substances.',
		tools: "Alchemist's Supplies"
	},
	{
		id: 'architecture',
		name: 'Architecture',
		attributeAssociation: 'intelligence',
		description:
			'Architecture is the knowledge of building design, construction, and structural integrity. This includes understanding how buildings are constructed, identifying weak points, and designing structures.',
		tools: undefined // Knowledge trade
	},
	{
		id: 'blacksmithing',
		name: 'Blacksmithing',
		attributeAssociation: 'might',
		description:
			'Blacksmithing is the crafting and repairing of metal objects, including weapons and armor. This includes working with forges, hammers, and other tools to shape metal.',
		tools: "Smith's Tools"
	},
	{
		id: 'brewing',
		name: 'Brewing',
		attributeAssociation: 'intelligence',
		description:
			'Brewing is the art of creating beverages through fermentation, such as beer, wine, and spirits. This includes understanding the process of fermentation and using brewing equipment.',
		tools: "Brewer's Supplies"
	},
	{
		id: 'calligraphy',
		name: 'Calligraphy',
		attributeAssociation: 'agility',
		description:
			'Calligraphy is the art of decorative handwriting and lettering. This includes using various pens, inks, and techniques to create visually appealing text.',
		tools: "Calligrapher's Supplies"
	},
	{
		id: 'carpentry',
		name: 'Carpentry',
		attributeAssociation: 'might',
		description:
			'Carpentry is the crafting and repairing of wooden objects and structures. This includes working with wood, saws, hammers, and other tools to build and repair.',
		tools: "Carpenter's Tools"
	},
	{
		id: 'cartography',
		name: 'Cartography',
		attributeAssociation: 'intelligence',
		description:
			'Cartography is the art and science of mapmaking. This includes creating maps, reading maps, and navigating using maps.',
		tools: "Cartographer's Tools"
	},
	{
		id: 'cobbling',
		name: 'Cobbling',
		attributeAssociation: 'agility',
		description:
			'Cobbling is the crafting and repairing of footwear. This includes working with leather, thread, and tools to create and repair shoes and boots.',
		tools: "Cobbler's Tools"
	},
	{
		id: 'cooking',
		name: 'Cooking',
		attributeAssociation: 'intelligence',
		description:
			'Cooking is the preparation of food for consumption. This includes understanding ingredients, recipes, and cooking techniques.',
		tools: "Cook's Utensils"
	},
	{
		id: 'deciphering',
		name: 'Deciphering',
		attributeAssociation: 'intelligence',
		description:
			'Deciphering is the understanding of coded messages, ancient scripts, or hidden meanings. This includes analyzing patterns, symbols, and languages to uncover hidden information.',
		tools: undefined // Knowledge trade
	},
	{
		id: 'disguise',
		name: 'Disguise',
		attributeAssociation: 'charisma',
		description:
			"Disguise is the altering of one's appearance to resemble someone else or a different type of person. This includes using makeup, costumes, and props to change appearance.",
		tools: 'Disguise Kit'
	},
	{
		id: 'forgery',
		name: 'Forgery',
		attributeAssociation: 'agility',
		description:
			'Forgery is the creating of convincing copies of documents, signatures, or objects. This includes replicating details and materials to create fakes.',
		tools: 'Forgery Kit'
	},
	{
		id: 'gaming',
		name: 'Gaming',
		attributeAssociation: 'charisma',
		description:
			'Gaming is the proficiency in various games of chance or skill. This includes understanding rules, strategies, and playing games.',
		tools: 'Gaming Set'
	},
	{
		id: 'herbalism',
		name: 'Herbalism',
		attributeAssociation: 'intelligence',
		description:
			'Herbalism is the knowledge of plants, their properties, and uses. This includes identifying plants, preparing herbal remedies, and understanding plant effects.',
		tools: 'Herbalism Kit'
	},
	{
		id: 'jeweler',
		name: 'Jeweler',
		attributeAssociation: 'agility',
		description:
			'Jeweler is the crafting and repairing of jewelry. This includes working with precious metals, gems, and tools to create and repair jewelry.',
		tools: "Jeweler's Tools"
	},
	{
		id: 'leatherworking',
		name: 'Leatherworking',
		attributeAssociation: 'agility',
		description:
			'Leatherworking is the crafting and repairing of leather goods. This includes working with leather, tools, and techniques to create and repair items.',
		tools: "Leatherworker's Tools"
	},
	{
		id: 'linguistics',
		name: 'Linguistics',
		attributeAssociation: 'intelligence',
		description:
			'Linguistics is the study of languages, their structure, and origins. This includes understanding grammar, syntax, and the history of languages.',
		tools: undefined // Knowledge trade
	},
	{
		id: 'masonry',
		name: 'Masonry',
		attributeAssociation: 'might',
		description:
			'Masonry is the working with stone to build structures or objects. This includes cutting, shaping, and laying stone to create buildings and other structures.',
		tools: "Mason's Tools"
	},
	{
		id: 'medicine',
		name: 'Medicine',
		attributeAssociation: 'intelligence',
		description:
			'Medicine is the knowledge and practice of healing injuries and treating diseases. This includes diagnosing ailments, administering treatments, and understanding medical procedures.',
		tools: "Healer's Kit"
	},
	{
		id: 'music',
		name: 'Music',
		attributeAssociation: 'charisma',
		description:
			'Music is the performance of music using instruments or voice. This includes playing instruments, singing, and understanding musical theory.',
		tools: 'Musical Instrument'
	},
	{
		id: 'navigation',
		name: 'Navigation',
		attributeAssociation: 'intelligence',
		description:
			"Navigation is the determining of one's position and plotting a course. This includes using maps, compasses, and celestial bodies to navigate.",
		tools: "Navigator's Tools"
	},
	{
		id: 'painting',
		name: 'Painting',
		attributeAssociation: 'agility',
		description:
			'Painting is the creating of art using paints. This includes using various paints, brushes, and techniques to create visual art.',
		tools: "Painter's Supplies"
	},
	{
		id: 'poisoner',
		name: 'Poisoner',
		attributeAssociation: 'intelligence',
		description:
			'Poisoner is the knowledge and creation of poisons. This includes identifying poisonous substances, preparing poisons, and understanding their effects.',
		tools: "Poisoner's Kit"
	},
	{
		id: 'pottery',
		name: 'Pottery',
		attributeAssociation: 'agility',
		description:
			'Pottery is the crafting of objects from clay. This includes shaping, firing, and glazing clay to create various objects.',
		tools: "Potter's Tools"
	},
	{
		id: 'sculpting',
		name: 'Sculpting',
		attributeAssociation: 'might',
		description:
			'Sculpting is the creating of three-dimensional art from various materials. This includes shaping materials like stone, wood, or clay to create sculptures.',
		tools: "Sculptor's Tools"
	},
	{
		id: 'smithing',
		name: 'Smithing',
		attributeAssociation: 'might',
		description:
			'Smithing is the general knowledge of working with metals. This includes understanding different metals, their properties, and basic metalworking techniques.',
		tools: "Smith's Tools"
	},
	{
		id: 'survival',
		name: 'Survival',
		attributeAssociation: 'intelligence',
		description:
			'Survival is the knowledge and skills needed to survive in the wilderness. This includes tracking, foraging, shelter building, and navigating in natural environments.',
		tools: undefined // Knowledge trade
	},
	{
		id: 'tailoring',
		name: 'Tailoring',
		attributeAssociation: 'agility',
		description:
			'Tailoring is the crafting and repairing of clothing and textiles. This includes working with fabric, needles, and thread to create and repair garments.',
		tools: "Weaver's Tools"
	},
	{
		id: 'thieves',
		name: "Thieves'",
		attributeAssociation: 'agility',
		description:
			"Thieves' is the knowledge and skills related to thievery, including lockpicking and disarming traps. This includes understanding security measures and using specialized tools.",
		tools: "Thieves' Tools"
	},
	{
		id: 'vehicles_land',
		name: 'Vehicles (Land)',
		attributeAssociation: 'agility',
		description:
			'Vehicles (Land) is the proficiency in operating land-based vehicles. This includes riding horses, driving carts, and operating other land vehicles.',
		tools: undefined
	},
	{
		id: 'vehicles_water',
		name: 'Vehicles (Water)',
		attributeAssociation: 'agility',
		description:
			'Vehicles (Water) is the proficiency in operating water-based vehicles. This includes sailing boats, piloting ships, and operating other water vehicles.',
		tools: undefined
	},
	{
		id: 'woodcarving',
		name: 'Woodcarving',
		attributeAssociation: 'agility',
		description:
			'Woodcarving is the creating of art or objects from wood. This includes shaping wood using knives, chisels, and other tools.',
		tools: "Woodcarver's Tools"
	}
];
````

## File: src/main.tsx
````typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
````

## File: src/routes/api/character/progress/complete/+server.ts
````typescript
// src/routes/api/character/progress/complete/+server.ts

import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { classesData } from '$lib/rulesdata/loaders/class.loader';
import { traitsData } from '$lib/rulesdata/traits';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

function validateFeatureChoices(classId: string, selectedChoicesJson: string) {
	const classData = classesData.find((c) => c.id === classId);
	if (!classData) throw new Error(`Invalid class ID: ${classId}`);

	const choices = JSON.parse(selectedChoicesJson || '{}');

	for (const requiredChoice of classData.featureChoicesLvl1 || []) {
		if (choices[requiredChoice.id] === undefined) {
			throw new Error(`Missing required choice for ${classData.name}: ${requiredChoice.prompt}`);
		}
		const validOptions = requiredChoice.options.map((o) => o.value);
		if (!validOptions.includes(choices[requiredChoice.id])) {
			throw new Error(
				`Invalid selected option for ${requiredChoice.id} in class ${classData.name}`
			);
		}
	}
}

function validateAttributeCapsAfterTraits(attributes: any, selectedTraitIdsJson: string) {
	const selectedTraitIds = JSON.parse(selectedTraitIdsJson || '[]');
	const traits = selectedTraitIds
		.map((id: string) => traitsData.find((t) => t.id === id))
		.filter((t: any) => t !== undefined);

	const finalAttributes = { ...attributes };

	for (const trait of traits) {
		const attrEffect = trait.effects?.find((e: any) => e.type === 'MODIFY_ATTRIBUTE');
		if (attrEffect && attrEffect.target && typeof attrEffect.value === 'number') {
			const attributeKey = `attribute_${attrEffect.target}`;
			if (attributeKey in finalAttributes) {
				finalAttributes[attributeKey] += attrEffect.value;
			}
		}
	}

	const ATTRIBUTE_MAX_L1 = 3;
	for (const [attrName, finalValue] of Object.entries(finalAttributes)) {
		if (finalValue > ATTRIBUTE_MAX_L1) {
			throw new Error(
				`Final attribute ${attrName.replace('attribute_', '')} exceeds Level 1 cap (+3) after applying traits.`
			);
		}
	}
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Basic validation
		if (
			!data.finalName ||
			typeof data.finalName !== 'string' ||
			data.finalName.trim().length === 0
		) {
			return json({ error: 'Character name is required.' }, { status: 400 });
		}

		// Validate attributes and point buy (Stage A)
		const attributes = {
			attribute_might: data.attribute_might,
			attribute_agility: data.attribute_agility,
			attribute_charisma: data.attribute_charisma,
			attribute_intelligence: data.attribute_intelligence
		};
		const totalPoints = Object.values(attributes).reduce(
			(sum, v) => sum + (typeof v === 'number' ? v : 0),
			0
		);
		if (totalPoints !== 0) {
			return json({ error: 'Attribute points must sum to 0 (point buy).' }, { status: 400 });
		}

		// Validate ancestry selections (Stage B)
		if (!data.ancestry1Id) {
			return json({ error: 'At least one ancestry must be selected.' }, { status: 400 });
		}
		if (data.ancestry2Id && data.ancestry1Id === data.ancestry2Id) {
			return json({ error: 'Cannot select the same ancestry twice.' }, { status: 400 });
		}

		// Validate selected trait IDs (Stage B)
		try {
			const selectedTraitIds = JSON.parse(data.selectedTraitIds || '[]');
			if (!Array.isArray(selectedTraitIds)) throw new Error();
			// Additional trait validation can be added here
		} catch {
			return json({ error: 'Invalid selectedTraitIds format.' }, { status: 400 });
		}

		// Validate class selection (Stage C)
		if (!data.classId || !classesData.find((c) => c.id === data.classId)) {
			return json({ error: 'A valid class must be selected.' }, { status: 400 });
		}

		// Validate feature choices (Stage C)
		try {
			validateFeatureChoices(data.classId, data.selectedFeatureChoices);
		} catch (err: any) {
			return json({ error: err.message }, { status: 400 });
		}

		// Cross-stage validation: attribute caps after traits
		try {
			validateAttributeCapsAfterTraits(attributes, data.selectedTraitIds);
		} catch (err: any) {
			return json({ error: err.message }, { status: 400 });
		}

		// Save to DB in a transaction
		const result = await prisma.$transaction(async (tx) => {
			// Upsert CharacterInProgress by id if provided, else create new
			let character;
			if (data.id) {
				character = await tx.characterInProgress.update({
					where: { id: data.id },
					data: {
						...data,
						updatedAt: new Date()
					}
				});
			} else {
				character = await tx.characterInProgress.create({
					data: {
						...data,
						createdAt: new Date(),
						updatedAt: new Date()
					}
				});
			}
			return character;
		});

		return json({ success: true, id: result.id });
	} catch (err: any) {
		return json({ error: err.message || 'Unknown error' }, { status: 500 });
	}
};
````

## File: src/routes/character-creation/LoadCharacter.tsx
````typescript
import { useState, useEffect } from 'react';
import {
	StyledContainer,
	StyledTitle,
	StyledCharacterGrid,
	StyledCharacterCard,
	StyledCardActions,
	StyledActionButton,
	StyledCharacterName,
	StyledPlayerName,
	StyledCharacterDetails,
	StyledDetailItem,
	StyledDetailLabel,
	StyledDetailValue,
	StyledCompletedDate,
	StyledEmptyState,
	StyledEmptyTitle,
	StyledEmptyText,
	StyledBackButton
} from './styles/LoadCharacter.styles';

interface SavedCharacter {
	id: string;
	finalName: string;
	finalPlayerName: string;
	classId: string;
	ancestry1Id: string;
	ancestry2Id?: string;
	completedAt: string;
	[key: string]: any;
}

interface LoadCharacterProps {
	onBack: () => void;
	onLoadCharacter?: (character: SavedCharacter) => void;
	onSelectCharacter?: (characterId: string) => void;
}

function LoadCharacter({ onBack, onLoadCharacter, onSelectCharacter }: LoadCharacterProps) {
	const [savedCharacters, setSavedCharacters] = useState<SavedCharacter[]>([]);

	useEffect(() => {
		const characters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
		setSavedCharacters(characters);
	}, []);

	const handleCharacterClick = (character: SavedCharacter) => {
		if (onLoadCharacter) {
			onLoadCharacter(character);
		} else {
			console.log('Loading character:', character);
			// TODO: Implement character loading logic
		}
	};

	const handleViewCharacterSheet = (character: SavedCharacter, event: React.MouseEvent) => {
		event.stopPropagation();
		if (onSelectCharacter) {
			onSelectCharacter(character.id);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const formatAncestry = (ancestry1: string, ancestry2?: string) => {
		if (ancestry2) {
			return `${ancestry1}/${ancestry2}`;
		}
		return ancestry1;
	};

	return (
		<StyledContainer>
			<StyledBackButton onClick={onBack}>← Back to Menu</StyledBackButton>

			<StyledTitle>Load Character</StyledTitle>

			{savedCharacters.length === 0 ? (
				<StyledEmptyState>
					<StyledEmptyTitle>No Saved Characters</StyledEmptyTitle>
					<StyledEmptyText>
						You haven't created any characters yet.
						<br />
						Go back to the menu and create your first character!
					</StyledEmptyText>
				</StyledEmptyState>
			) : (
				<StyledCharacterGrid>
					{savedCharacters.map((character) => (
						<StyledCharacterCard key={character.id}>
							<StyledCharacterName>
								{character.finalName || 'Unnamed Character'}
							</StyledCharacterName>

							<StyledPlayerName>Player: {character.finalPlayerName || 'Unknown'}</StyledPlayerName>

							<StyledCharacterDetails>
								<StyledDetailItem>
									<StyledDetailLabel>Race</StyledDetailLabel>
									<StyledDetailValue>
										{formatAncestry(
											character.ancestry1Name || character.ancestry1Id || 'Unknown',
											character.ancestry2Name || character.ancestry2Id
										)}
									</StyledDetailValue>
								</StyledDetailItem>

								<StyledDetailItem>
									<StyledDetailLabel>Class</StyledDetailLabel>
									<StyledDetailValue>
										{character.className || character.classId || 'Unknown'}
									</StyledDetailValue>
								</StyledDetailItem>
							</StyledCharacterDetails>

							<StyledCompletedDate>
								Created: {formatDate(character.createdAt || character.completedAt)}
							</StyledCompletedDate>

							<StyledCardActions>
								<StyledActionButton
									variant="primary"
									onClick={(e) => handleViewCharacterSheet(character, e)}
								>
									View Sheet
								</StyledActionButton>
								<StyledActionButton
									variant="secondary"
									onClick={() => handleCharacterClick(character)}
								>
									Edit
								</StyledActionButton>
							</StyledCardActions>
						</StyledCharacterCard>
					))}
				</StyledCharacterGrid>
			)}
		</StyledContainer>
	);
}

export default LoadCharacter;
````

## File: src/routes/character-creation/styles/CharacterName.styles.ts
````typescript
import styled from 'styled-components';

export const StyledContainer = styled.div`
	border: 2px solid #8b5cf6;
	padding: 2rem;
	border-radius: 12px;
	background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
	margin-top: 2rem;
	box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3);
	max-width: 600px;
	margin: 2rem auto;
`;

export const StyledTitle = styled.h2`
	margin-top: 0;
	color: #fbbf24;
	font-size: 1.3rem;
	font-weight: bold;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	letter-spacing: 1px;
	border-bottom: 2px solid #ef4444;
	padding-bottom: 0.5rem;
	margin-bottom: 2rem;
`;

export const StyledInputGroup = styled.div`
	margin-bottom: 1.5rem;
`;

export const StyledLabel = styled.label`
	display: block;
	margin-bottom: 0.5rem;
	color: #fbbf24;
	font-weight: bold;
	font-size: 1rem;
`;

export const StyledInput = styled.input`
	width: 100%;
	padding: 0.75rem;
	border: 2px solid #a855f7;
	border-radius: 8px;
	background: rgba(45, 27, 105, 0.8);
	color: #e5e7eb;
	font-size: 1rem;
	transition: all 0.3s ease;

	&:focus {
		outline: none;
		border-color: #fbbf24;
		box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2);
	}

	&::placeholder {
		color: #9ca3af;
	}
`;

export const StyledSuggestionSection = styled.div`
	margin-top: 1.5rem;
	padding: 1.5rem;
	border: 2px solid #a855f7;
	border-radius: 8px;
	background: rgba(45, 27, 105, 0.4);
`;

export const StyledSuggestionTitle = styled.h3`
	margin: 0 0 1rem 0;
	color: #fbbf24;
	font-size: 1.1rem;
	font-weight: bold;
`;

export const StyledSuggestionGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	gap: 0.5rem;
	margin-bottom: 1rem;
	max-height: 200px;
	overflow-y: auto;
`;

export const StyledSuggestionButton = styled.button`
	padding: 0.5rem 1rem;
	border: 2px solid #a855f7;
	border-radius: 6px;
	background: transparent;
	color: #e5e7eb;
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 0.9rem;

	&:hover {
		background: #a855f7;
		color: #1e1b4b;
		transform: translateY(-2px);
	}
`;

export const StyledGenerateButton = styled.button`
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 8px;
	background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%);
	color: #1e1b4b;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.3s ease;
	width: 100%;

	&:hover {
		background: linear-gradient(145deg, #f59e0b 0%, #d97706 100%);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}
`;

export const StyledCharacterInfo = styled.div`
	margin-bottom: 1.5rem;
	padding: 1rem;
	border: 2px solid #ef4444;
	border-radius: 8px;
	background: rgba(239, 68, 68, 0.1);
	text-align: center;
`;

export const StyledCharacterDetails = styled.p`
	margin: 0;
	color: #e5e7eb;
	font-size: 1rem;
	line-height: 1.6;
`;
````

## File: src/routes/character-sheet/components/Attributes.tsx
````typescript
import React from 'react';
import type { SkillData, CharacterSheetData } from '../../../types';
import {
	AttributeSection,
	AttributeHeader,
	AttributeBox,
	AttributeAbbreviation,
	AttributeValue,
	AttributeInfo,
	AttributeName,
	AttributeSave,
	SkillRow,
	SkillName,
	PrimeSection,
	PrimeLabel,
	PrimeValue
} from '../styles/Attributes';
import { StyledProficiencyDots, StyledDot } from '../styles/Skills';

interface AttributesProps {
	characterData: CharacterSheetData;
	skillsByAttribute: {
		prime: SkillData[];
		might: SkillData[];
		agility: SkillData[];
		charisma: SkillData[];
		intelligence: SkillData[];
	};
}

const Attributes: React.FC<AttributesProps> = ({ characterData, skillsByAttribute }) => {
	const renderSkills = (skills: SkillData[]) => {
		return skills.map((skill) => (
			<SkillRow key={skill.id}>
				<SkillName>{skill.name.toUpperCase()}</SkillName>
				<StyledProficiencyDots>
					{[1, 2, 3, 4, 5].map((level) => (
						<StyledDot key={level} filled={level <= skill.proficiency} />
					))}
				</StyledProficiencyDots>
			</SkillRow>
		));
	};

	return (
		<>
			{/* Prime Modifier & Awareness */}
			<PrimeSection>
				<PrimeLabel>Prime</PrimeLabel>
				<PrimeValue>
					{characterData.finalPrimeModifierAttribute} +{characterData.finalPrimeModifierValue}
				</PrimeValue>
			</PrimeSection>

			{/* Awareness (Prime skill) */}
			{renderSkills(skillsByAttribute.prime)}

			{/* Might Section */}
			<AttributeSection>
				<AttributeHeader>
					<AttributeBox>
						<AttributeAbbreviation>MIG</AttributeAbbreviation>
						<AttributeValue>{characterData.finalMight}</AttributeValue>
					</AttributeBox>
					<AttributeInfo>
						<AttributeName>MIGHT</AttributeName>
						<AttributeSave>SAVE +{characterData.finalSaveMight}</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.might)}
			</AttributeSection>

			{/* Agility Section */}
			<AttributeSection>
				<AttributeHeader>
					<AttributeBox>
						<AttributeAbbreviation>AGI</AttributeAbbreviation>
						<AttributeValue>{characterData.finalAgility}</AttributeValue>
					</AttributeBox>
					<AttributeInfo>
						<AttributeName>AGILITY</AttributeName>
						<AttributeSave>SAVE +{characterData.finalSaveAgility}</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.agility)}
			</AttributeSection>

			{/* Charisma Section */}
			<AttributeSection>
				<AttributeHeader>
					<AttributeBox>
						<AttributeAbbreviation>CHA</AttributeAbbreviation>
						<AttributeValue>{characterData.finalCharisma}</AttributeValue>
					</AttributeBox>
					<AttributeInfo>
						<AttributeName>CHARISMA</AttributeName>
						<AttributeSave>SAVE +{characterData.finalSaveCharisma}</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.charisma)}
			</AttributeSection>

			{/* Intelligence Section */}
			<AttributeSection>
				<AttributeHeader>
					<AttributeBox>
						<AttributeAbbreviation>INT</AttributeAbbreviation>
						<AttributeValue>{characterData.finalIntelligence}</AttributeValue>
					</AttributeBox>
					<AttributeInfo>
						<AttributeName>INTELLIGENCE</AttributeName>
						<AttributeSave>SAVE +{characterData.finalSaveIntelligence}</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.intelligence)}
			</AttributeSection>
		</>
	);
};

export default Attributes;
````

## File: src/routes/character-sheet/components/KnowledgeTrades.tsx
````typescript
import React from 'react';
import type { TradeData } from '../../../types';
import {
	KnowledgeTradesSection,
	SectionTitle,
	SectionDescription,
	EmptyMessage
} from '../styles/KnowledgeTrades';
import { SkillRow, SkillName } from '../styles/Attributes';
import { StyledProficiencyDots, StyledDot } from '../styles/Skills';

interface KnowledgeTradesProps {
	knowledge: TradeData[];
	trades: TradeData[];
}

const KnowledgeTrades: React.FC<KnowledgeTradesProps> = ({ knowledge, trades }) => {
	return (
		<>
			{/* Knowledge Section */}
			<KnowledgeTradesSection>
				<SectionTitle>KNOWLEDGE</SectionTitle>
				<SectionDescription>Intelligence-based knowledge trades</SectionDescription>
				{knowledge.map((knowledgeItem) => (
					<SkillRow key={knowledgeItem.id}>
						<SkillName>{knowledgeItem.name.toUpperCase()}</SkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= knowledgeItem.proficiency} />
							))}
						</StyledProficiencyDots>
					</SkillRow>
				))}
			</KnowledgeTradesSection>

			{/* Trades Section */}
			<KnowledgeTradesSection>
				<SectionTitle>TRADES</SectionTitle>
				<SectionDescription>Selected practical trades & crafts</SectionDescription>
				{trades.length > 0 ? (
					trades.map((trade) => (
						<SkillRow key={trade.id}>
							<SkillName>{trade.name.toUpperCase()}</SkillName>
							<StyledProficiencyDots>
								{[1, 2, 3, 4, 5].map((level) => (
									<StyledDot key={level} filled={level <= trade.proficiency} />
								))}
							</StyledProficiencyDots>
						</SkillRow>
					))
				) : (
					<EmptyMessage>No trades selected</EmptyMessage>
				)}
			</KnowledgeTradesSection>
		</>
	);
};

export default KnowledgeTrades;
````

## File: src/routes/character-sheet/components/LeftColumn.tsx
````typescript
import React from 'react';
import type { SkillData, TradeData, LanguageData, CharacterSheetData } from '../../../types';
import { StyledLeftColumn } from '../styles/Layout';
import Attributes from './Attributes';
import KnowledgeTrades from './KnowledgeTrades';
import Languages from './Languages';

interface LeftColumnProps {
	characterData: CharacterSheetData;
	skillsByAttribute: {
		prime: SkillData[];
		might: SkillData[];
		agility: SkillData[];
		charisma: SkillData[];
		intelligence: SkillData[];
	};
	knowledge: TradeData[];
	trades: TradeData[];
	languages: LanguageData[];
}

const LeftColumn: React.FC<LeftColumnProps> = ({
	characterData,
	skillsByAttribute,
	knowledge,
	trades,
	languages
}) => {
	return (
		<StyledLeftColumn>
			<Attributes characterData={characterData} skillsByAttribute={skillsByAttribute} />
			<KnowledgeTrades knowledge={knowledge} trades={trades} />
			<Languages languages={languages} />
		</StyledLeftColumn>
	);
};

export default LeftColumn;
````

## File: src/routes/character-sheet/components/Movement.tsx
````typescript
import React from 'react';
import type { CharacterSheetData } from '../../../types';
import {
	StyledMovementContainer,
	StyledMovementGrid,
	StyledMovementStat,
	StyledMovementLabel,
	StyledMovementValue
} from '../styles/Movement.styles';

interface MovementProps {
	characterData: CharacterSheetData;
}

const Movement: React.FC<MovementProps> = ({ characterData }) => {
	return (
		<StyledMovementContainer>
			<StyledMovementGrid>
				<StyledMovementStat>
					<StyledMovementLabel>MOVE SPEED</StyledMovementLabel>
					<StyledMovementValue>{characterData.finalMoveSpeed}</StyledMovementValue>
				</StyledMovementStat>
				<StyledMovementStat>
					<StyledMovementLabel>JUMP DISTANCE</StyledMovementLabel>
					<StyledMovementValue>{characterData.finalJumpDistance}</StyledMovementValue>
				</StyledMovementStat>
			</StyledMovementGrid>
		</StyledMovementContainer>
	);
};

export default Movement;
````

## File: src/routes/character-sheet/styles/Attributes.ts
````typescript
import styled from 'styled-components';

export const StyledAttributeSection = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: rgba(245, 243, 240, 0.5);
`;

export const StyledAttributeItem = styled.div`
	display: grid;
	grid-template-columns: 60px 1fr;
	gap: 0.5rem;
	margin-bottom: 1rem;
	align-items: center;
`;

export const StyledAttributeBox = styled.div`
	width: 50px;
	height: 50px;
	border: 2px solid #8b4513;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: white;
	position: relative;
`;

export const StyledAttributeAbbr = styled.div`
	font-size: 0.7rem;
	font-weight: bold;
	text-transform: uppercase;
	color: #8b4513;
`;

export const StyledAttributeValue = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	color: #2d2d2d;
`;

export const StyledAttributeDetails = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StyledAttributeName = styled.div`
	font-size: 0.9rem;
	font-weight: bold;
	text-transform: uppercase;
	color: #8b4513;
`;

export const StyledSaveBonus = styled.div`
	font-size: 0.8rem;
	color: #666;
`;

// New components for refactored layout
export const AttributeSection = styled.div`
	margin-bottom: 1rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const AttributeHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
`;

export const AttributeBox = styled.div`
	width: 60px;
	height: 60px;
	border: 2px solid #8b4513;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #f5f5dc;
	margin-right: 1rem;
`;

export const AttributeAbbreviation = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
	color: #8b4513;
`;

export const AttributeValue = styled.div`
	font-size: 1.4rem;
	font-weight: bold;
	color: #8b4513;
`;

export const AttributeInfo = styled.div`
	flex: 1;
`;

export const AttributeName = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.2rem;
`;

export const AttributeSave = styled.div`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const SkillRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: #f9f9f9;
	margin-bottom: 0.3rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const SkillName = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
`;

export const PrimeSection = styled.div`
	text-align: center;
	padding: 0.5rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	background: #f5f5dc;
	margin-bottom: 0.5rem;
`;

export const PrimeLabel = styled.div`
	color: #8b4513;
	font-weight: bold;
	font-size: 1rem;
`;

export const PrimeValue = styled.div`
	font-size: 1.4rem;
	font-weight: bold;
	color: #8b4513;
`;
````

## File: src/routes/character-sheet/styles/Combat.ts
````typescript
import styled from 'styled-components';

export const StyledCombatSection = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: rgba(245, 243, 240, 0.5);
`;

export const StyledDefenseGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	margin-bottom: 1rem;
`;

export const StyledDefenseBox = styled.div`
	text-align: center;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 0.8rem;
	background: white;
`;

export const StyledDefenseValue = styled.div`
	font-size: 1.8rem;
	font-weight: bold;
	color: #8b4513;
`;

export const StyledDefenseLabel = styled.div`
	font-size: 0.7rem;
	font-weight: bold;
	text-transform: uppercase;
	color: #666;
	margin-top: 0.2rem;
`;

export const StyledActionPoints = styled.div`
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	margin: 1rem 0;
`;

export const StyledActionPoint = styled.div<{ used: boolean }>`
	width: 40px;
	height: 40px;
	border: 2px solid #8b4513;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${(props) => (props.used ? '#8b4513' : 'white')};
	color: ${(props) => (props.used ? 'white' : '#8b4513')};
	cursor: pointer;
	font-weight: bold;

	&:hover {
		background: ${(props) => (props.used ? '#6b3410' : '#f0f0f0')};
	}
`;

export const StyledCombatStats = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	margin: 1rem 0;
`;

export const StyledCombatStatBox = styled.div`
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 0.5rem;
	text-align: center;
	background: white;
	flex: 1;
`;

export const StyledCombatStatValue = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: #333;
`;

export const StyledCombatStatLabel = styled.div`
	font-size: 0.7rem;
	font-weight: bold;
	text-transform: uppercase;
	color: #666;
	margin-top: 0.2rem;
`;
````

## File: src/routes/character-sheet/styles/Features.styles.ts
````typescript
import styled from 'styled-components';

export const StyledFeaturesContainer = styled.div`
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
	margin-bottom: 1rem;
	height: 762px;
	overflow-y: auto;
`;

export const StyledFeaturesTitle = styled.div`
	font-size: 1.1rem;
	font-weight: bold;
	color: #8b4513;
	text-align: center;
	margin-bottom: 1rem;
`;

export const StyledFeatureCategory = styled.div`
	margin-bottom: 1rem;
`;

export const StyledFeatureCategoryTitle = styled.div`
	font-size: 0.9rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.5rem;
	padding-bottom: 0.3rem;
	border-bottom: 1px solid #8b4513;
`;

export const StyledFeatureGrid = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
`;

export const StyledFeatureItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: #f9f9f9;
`;

export const StyledFeatureName = styled.span`
	font-size: 0.85rem;
	color: #8b4513;
	font-weight: 500;
	flex: 1;
`;

export const StyledFeatureReadMore = styled.button`
	background: #8b4513;
	color: white;
	border: none;
	border-radius: 3px;
	padding: 0.2rem 0.5rem;
	font-size: 0.7rem;
	cursor: pointer;
	font-weight: bold;

	&:hover {
		background: #654321;
	}
`;

export const StyledNoFeaturesMessage = styled.div`
	text-align: center;
	font-style: italic;
	padding: 1rem;
	color: #666;
`;

export const StyledFeaturesContent = styled.div`
	font-size: 0.9rem;
	color: #8b4513;
`;
````

## File: src/routes/character-sheet/styles/Languages.ts
````typescript
import styled from 'styled-components';

export const LanguagesSection = styled.div`
	margin-bottom: 1rem;
	border: 2px solid #8b4513;
	border-radius: 8px;
	padding: 1rem;
	background: white;
`;

export const LanguageRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	border: 1px solid #8b4513;
	border-radius: 4px;
	background: #f9f9f9;
	margin-bottom: 0.3rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const LanguageName = styled.span`
	font-size: 0.9rem;
	color: #8b4513;
	flex: 1;
	margin-right: 1rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	min-width: 0;
`;

export const FluencyContainer = styled.div`
	display: flex;
	gap: 0.2rem;
	flex-shrink: 0;
`;

export const FluencyBox = styled.div<{ filled: boolean }>`
	width: 15px;
	height: 15px;
	border: 1px solid #8b4513;
	background: ${(props) => (props.filled ? '#8b4513' : 'white')};
	border-radius: 2px;
`;

export const FluencyLabel = styled.span`
	font-size: 0.7rem;
	color: #8b4513;
	font-weight: bold;
	margin-right: 0.3rem;
`;

export const FluencyItem = styled.div`
	display: flex;
	align-items: center;
	gap: 0.2rem;
	flex-shrink: 0;
	min-width: fit-content;
`;

export const FluencyHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem;
	background: #f0f0f0;
	border: 1px solid #8b4513;
	border-radius: 4px;
	margin-bottom: 0.3rem;
	font-weight: bold;
	font-size: 0.85rem;
	color: #8b4513;
`;

export const LanguageNameHeader = styled.span`
	font-size: 0.85rem;
	color: #8b4513;
	font-weight: bold;
	flex: 1;
	margin-right: 1rem;
`;

export const FluencyHeaderContainer = styled.div`
	display: flex;
	gap: 0.2rem;
	flex-shrink: 0;
`;

export const FluencyHeaderLabel = styled.span`
	font-size: 0.75rem;
	color: #8b4513;
	font-weight: bold;
	text-align: center;
	min-width: 15px;
	cursor: help;
`;
````

## File: src/routes/character-sheet/styles/Potions.ts
````typescript
import styled from 'styled-components';

interface PotionCircleProps {
	fillPercentage: number;
	color: string;
}

export const StyledPotionContainer = styled.div`
	position: relative;
	width: 80px;
	height: 80px;
	border: 3px solid;
	border-radius: 50%;
	background: white;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const StyledPotionFill = styled.div<PotionCircleProps>`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: ${(props) => Math.max(0, props.fillPercentage)}%;
	background: linear-gradient(to top, ${(props) => props.color}dd, ${(props) => props.color}aa);
	border-radius: 0 0 50px 50px;
	transition: height 0.3s ease-in-out;
`;

export const StyledPotionBubbles = styled.div<{ color: string; fillPercentage: number }>`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	opacity: ${(props) => (props.fillPercentage > 20 ? 0.3 : 0)};
	transition: opacity 0.3s ease-in-out;

	&::before {
		content: '';
		position: absolute;
		top: 60%;
		left: 20%;
		width: 8px;
		height: 8px;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 50%;
		animation: bubble1 2s infinite ease-in-out;
	}

	&::after {
		content: '';
		position: absolute;
		top: 30%;
		right: 25%;
		width: 6px;
		height: 6px;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 50%;
		animation: bubble2 2.5s infinite ease-in-out;
	}

	@keyframes bubble1 {
		0%,
		100% {
			transform: translateY(0px) scale(1);
			opacity: 0.3;
		}
		50% {
			transform: translateY(-10px) scale(1.1);
			opacity: 0.8;
		}
	}

	@keyframes bubble2 {
		0%,
		100% {
			transform: translateY(0px) scale(1);
			opacity: 0.2;
		}
		50% {
			transform: translateY(-8px) scale(1.2);
			opacity: 0.6;
		}
	}
`;

export const StyledPotionValue = styled.div`
	position: relative;
	z-index: 10;
	font-size: 1.4rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
	color: #333;
`;

export const StyledLargePotionContainer = styled.div`
	position: relative;
	width: 100px;
	height: 100px;
	border: 3px solid;
	border-radius: 50%;
	background: white;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const StyledLargePotionValue = styled.div`
	position: relative;
	z-index: 10;
	font-size: 1.6rem;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
	color: #333;
`;

export const StyledTempHPDisplay = styled.div`
	position: relative;
	z-index: 10;
	font-size: 0.7rem;
	color: #333;
	display: flex;
	align-items: center;
	gap: 0.2rem;
	text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
`;
````

## File: src/lib/services/characterCompletion.ts
````typescript
// Shared character completion service
// Handles the completion flow with proper stat calculation, snackbar, and navigation

import { calculateCharacterStats, type CharacterInProgressData } from './characterCalculator';

export interface CharacterCompletionCallbacks {
	onShowSnackbar: (message: string) => void;
	onNavigateToLoad: () => void;
}

export const completeCharacter = async (
	characterState: any,
	callbacks: CharacterCompletionCallbacks
): Promise<void> => {
	try {
		// Character is complete, prepare the data for calculation
		const characterInProgress: CharacterInProgressData = {
			id: Date.now().toString(),
			attribute_might: characterState.attribute_might,
			attribute_agility: characterState.attribute_agility,
			attribute_charisma: characterState.attribute_charisma,
			attribute_intelligence: characterState.attribute_intelligence,
			level: characterState.level || 1,
			combatMastery: characterState.combatMastery || 1,
			classId: characterState.classId,
			ancestry1Id: characterState.ancestry1Id,
			ancestry2Id: characterState.ancestry2Id,
			selectedTraitIds: characterState.selectedTraitIds || '',
			selectedFeatureChoices: characterState.selectedFeatureChoices || '',
			finalName: characterState.finalName,
			finalPlayerName: characterState.finalPlayerName,
			skillsJson: characterState.skillsJson || '', // Default empty for now
			tradesJson: characterState.tradesJson || '', // Default empty for now
			languagesJson: characterState.languagesJson || '', // Default empty for now
			createdAt: new Date(),
			completedAt: new Date().toISOString()
		};

		console.log('Calculating stats for character:', characterInProgress);

		// Calculate all derived stats using DC20 rules
		const completedCharacterData = await calculateCharacterStats(characterInProgress);
		console.log('Character stats calculated:', completedCharacterData);
		console.log('Class info saved:', {
			classId: completedCharacterData.classId,
			className: completedCharacterData.className
		});
		console.log('Ancestry info saved:', {
			ancestry1Id: completedCharacterData.ancestry1Id,
			ancestry1Name: completedCharacterData.ancestry1Name,
			ancestry2Id: completedCharacterData.ancestry2Id,
			ancestry2Name: completedCharacterData.ancestry2Name
		});

		// Save to local storage
		const existingCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
		existingCharacters.push(completedCharacterData);
		localStorage.setItem('savedCharacters', JSON.stringify(existingCharacters));
		console.log('Character saved to localStorage. Total characters:', existingCharacters.length);

		// Show success snackbar
		callbacks.onShowSnackbar('Character created successfully!');

		// Navigate to load characters page after a short delay
		setTimeout(() => {
			console.log('Navigating to character load page...');
			callbacks.onNavigateToLoad();
		}, 1500);

		console.log('Character completed with calculated stats:', completedCharacterData);
	} catch (error) {
		console.error('Error completing character:', error);
		callbacks.onShowSnackbar('Error creating character. Please try again.');
	}
};
````

## File: src/routes/character-creation/CharacterName.tsx
````typescript
import { useState } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { nameByRace } from 'fantasy-name-generator';
import {
	StyledContainer,
	StyledTitle,
	StyledInputGroup,
	StyledLabel,
	StyledInput,
	StyledSuggestionSection,
	StyledSuggestionTitle,
	StyledSuggestionGrid,
	StyledSuggestionButton,
	StyledGenerateButton,
	StyledCharacterInfo,
	StyledCharacterDetails
} from './styles/CharacterName.styles';

// Name generation using fantasy-name-generator npm package
const generateNamesFromNPM = (race: string): string[] => {
	try {
		const names: string[] = [];

		// Generate 6 different names (3 male, 3 female)
		for (let i = 0; i < 3; i++) {
			const maleName = nameByRace(race, { gender: 'male' });
			const femaleName = nameByRace(race, { gender: 'female' });

			if (maleName && typeof maleName === 'string') {
				names.push(maleName);
			}
			if (femaleName && typeof femaleName === 'string') {
				names.push(femaleName);
			}
		}

		return names.filter((name) => name.length > 0);
	} catch (error) {
		console.error('Error generating names from npm package:', error);
		return [];
	}
};

function CharacterName() {
	const { state, dispatch } = useCharacter();
	const [characterName, setCharacterName] = useState(state.finalName || '');
	const [playerName, setPlayerName] = useState(state.finalPlayerName || '');
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [isGenerating, setIsGenerating] = useState(false);

	const getFallbackNames = (ancestry: string) => {
		const fallbackNames: { [key: string]: string[] } = {
			human: ['Aiden', 'Brianna', 'Connor', 'Diana', 'Ethan', 'Fiona'],
			elf: ['Aerdrie', 'Berrian', 'Caelynn', 'Dayereth', 'Enna', 'Galinndan'],
			dwarf: ['Adrik', 'Baern', 'Cathra', 'Darrak', 'Eberk', 'Falkrunn'],
			halfling: ['Alton', 'Bree', 'Cora', 'Daisy', 'Eldon', 'Finnan'],
			dragonborn: ['Arjhan', 'Balasar', 'Bharash', 'Donaar', 'Ghesh', 'Heskan'],
			gnome: ['Alston', 'Boddynock', 'Brocc', 'Burgell', 'Dimble', 'Eldon'],
			'half-elf': ['Aramil', 'Berrian', 'Carric', 'Dayereth', 'Enna', 'Galinndan'],
			'half-orc': ['Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh'],
			tiefling: ['Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados']
		};

		return fallbackNames[ancestry] || fallbackNames.human;
	};

	const generateNames = () => {
		// No need for rate limiting with npm package, but keep generating state for UX
		if (isGenerating) {
			return;
		}

		setIsGenerating(true);

		try {
			// Get character details
			const ancestry1 = state.ancestry1Id?.toLowerCase() || 'human';
			const ancestry2 = state.ancestry2Id?.toLowerCase();

			// Map ancestry names to npm package race names
			const raceMapping: { [key: string]: string } = {
				human: 'human',
				elf: 'elf',
				dwarf: 'dwarf',
				halfling: 'halfling',
				dragonborn: 'dragon',
				gnome: 'gnome',
				'half-elf': 'elf',
				'half-orc': 'orc',
				tiefling: 'demon',
				default: 'human'
			};

			// Always generate names from first ancestry
			const mappedRace1 = raceMapping[ancestry1] || 'human';
			const npmNames1 = generateNamesFromNPM(mappedRace1);
			const fallbackNames1 = getFallbackNames(ancestry1);
			let allNames = [...npmNames1, ...fallbackNames1].slice(0, 6);

			// If second ancestry exists, append 6 more names from it
			if (ancestry2) {
				const mappedRace2 = raceMapping[ancestry2] || 'human';
				const npmNames2 = generateNamesFromNPM(mappedRace2);
				const fallbackNames2 = getFallbackNames(ancestry2);
				const names2 = [...npmNames2, ...fallbackNames2].slice(0, 6);
				allNames = [...allNames, ...names2];
			}

			// Remove duplicates and limit appropriately
			const uniqueNames = [...new Set(allNames)];

			// Add a small delay for better UX (simulate processing)
			setTimeout(() => {
				setSuggestions(uniqueNames);
				setIsGenerating(false);
			}, 500);
		} catch (error) {
			console.error('Error generating names:', error);
			// Fallback to local names
			const fallbackNames = getFallbackNames(state.ancestry1Id?.toLowerCase() || 'human');
			setSuggestions(fallbackNames);
			setIsGenerating(false);
		}
	};

	const selectSuggestion = (name: string) => {
		setCharacterName(name);
		// Update the context immediately
		dispatch({
			type: 'UPDATE_STORE',
			updates: {
				finalName: name
			}
		});
	};

	const getCharacterDescription = () => {
		const ancestry1 = state.ancestry1Id;
		const ancestry2 = state.ancestry2Id;
		const classId = state.classId;

		let ancestryDescription = 'Your Character';

		if (ancestry1 && ancestry2) {
			// Both ancestries exist
			ancestryDescription = `${ancestry1.charAt(0).toUpperCase() + ancestry1.slice(1)}/${ancestry2.charAt(0).toUpperCase() + ancestry2.slice(1)}`;
		} else if (ancestry1) {
			// Only first ancestry
			ancestryDescription = `${ancestry1.charAt(0).toUpperCase() + ancestry1.slice(1)}`;
		}

		if (classId) {
			return `${ancestryDescription} ${classId.charAt(0).toUpperCase() + classId.slice(1)}`;
		}

		return ancestryDescription;
	};

	return (
		<StyledContainer>
			<StyledTitle>Name Your Character</StyledTitle>

			<StyledCharacterInfo>
				<StyledCharacterDetails>Creating: {getCharacterDescription()}</StyledCharacterDetails>
			</StyledCharacterInfo>

			<StyledInputGroup>
				<StyledLabel htmlFor="characterName">Character Name</StyledLabel>
				<StyledInput
					id="characterName"
					type="text"
					value={characterName}
					onChange={(e) => {
						const value = e.target.value;
						setCharacterName(value);
						// Update the context immediately
						dispatch({
							type: 'UPDATE_STORE',
							updates: {
								finalName: value.trim() || null
							}
						});
					}}
					placeholder="Enter your character's name"
				/>
			</StyledInputGroup>

			<StyledInputGroup>
				<StyledLabel htmlFor="playerName">Player Name</StyledLabel>
				<StyledInput
					id="playerName"
					type="text"
					value={playerName}
					onChange={(e) => {
						const value = e.target.value;
						setPlayerName(value);
						// Update the context immediately
						dispatch({
							type: 'UPDATE_STORE',
							updates: {
								finalPlayerName: value.trim() || null
							}
						});
					}}
					placeholder="Enter your name"
				/>
			</StyledInputGroup>

			<StyledSuggestionSection>
				<StyledSuggestionTitle>Name Suggestions</StyledSuggestionTitle>
				{suggestions.length > 0 && (
					<StyledSuggestionGrid>
						{suggestions.map((name, index) => (
							<StyledSuggestionButton key={index} onClick={() => selectSuggestion(name)}>
								{name}
							</StyledSuggestionButton>
						))}
					</StyledSuggestionGrid>
				)}
				<StyledGenerateButton onClick={generateNames} disabled={isGenerating}>
					{isGenerating ? 'Generating...' : 'Generate Names'}
				</StyledGenerateButton>
			</StyledSuggestionSection>
		</StyledContainer>
	);
}

export default CharacterName;
````

## File: src/routes/character-sheet/components/Languages.tsx
````typescript
import React from 'react';
import type { LanguageData } from '../../../types';
import { SectionTitle, SectionDescription } from '../styles/KnowledgeTrades';
import {
	LanguagesSection,
	LanguageRow,
	LanguageName,
	FluencyContainer,
	FluencyBox,
	FluencyHeader,
	LanguageNameHeader,
	FluencyHeaderContainer,
	FluencyHeaderLabel
} from '../styles/Languages';

interface LanguagesProps {
	languages: LanguageData[];
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
	return (
		<LanguagesSection>
			<SectionTitle>LANGUAGES</SectionTitle>
			<SectionDescription>LANGUAGE CHECK = d20 + Intelligence or Charisma</SectionDescription>
			
			{/* Header with L and F labels */}
			<FluencyHeader>
				<LanguageNameHeader>LANGUAGE</LanguageNameHeader>
				<FluencyHeaderContainer>
					<FluencyHeaderLabel title="Limited">L</FluencyHeaderLabel>
					<FluencyHeaderLabel title="Fluent">F</FluencyHeaderLabel>
				</FluencyHeaderContainer>
			</FluencyHeader>

			{languages.map((language) => (
				<LanguageRow key={language.id}>
					<LanguageName>{language.name.toUpperCase()}</LanguageName>
					<FluencyContainer>
						<FluencyBox filled={language.fluency === 'limited'} />
						<FluencyBox filled={language.fluency === 'fluent'} />
					</FluencyContainer>
				</LanguageRow>
			))}
		</LanguagesSection>
	);
};

export default Languages;
````

## File: src/routes/character-sheet/styles/Resources.ts
````typescript
import styled from 'styled-components';

export const StyledResourcesSection = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 1rem;
`;

export const StyledResourceBox = styled.div`
	border: 2px solid #8b4513;
	border-radius: 12px;
	padding: 1rem;
	text-align: center;
	background: white;
	position: relative;
`;

export const StyledResourceIcon = styled.div<{ bgColor: string }>`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background: ${(props) => props.bgColor};
	border: 3px solid #8b4513;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 0.5rem;
	font-size: 1.5rem;
	font-weight: bold;
	color: white;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const StyledResourceControls = styled.div`
	display: flex;
	gap: 0.3rem;
	justify-content: center;
	margin-top: 0.5rem;
`;

export const StyledResourceButton = styled.button<{ variant?: 'damage' | 'heal' }>`
	width: 25px;
	height: 25px;
	border: 1px solid
		${(props) =>
			props.variant === 'damage' ? '#d32f2f' : props.variant === 'heal' ? '#388e3c' : '#8b4513'};
	border-radius: 3px;
	background: ${(props) =>
		props.variant === 'damage' ? '#ffebee' : props.variant === 'heal' ? '#e8f5e8' : 'white'};
	color: ${(props) =>
		props.variant === 'damage' ? '#d32f2f' : props.variant === 'heal' ? '#388e3c' : '#8b4513'};
	cursor: pointer;
	font-size: 0.7rem;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background: ${(props) =>
			props.variant === 'damage' ? '#d32f2f' : props.variant === 'heal' ? '#388e3c' : '#8b4513'};
		color: white;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const StyledResourceInput = styled.input<{ variant?: 'circle' | 'standard' }>`
	width: ${(props) => (props.variant === 'circle' ? '50px' : '40px')};
	text-align: center;
	border: ${(props) => (props.variant === 'circle' ? 'none' : '1px solid #8b4513')};
	border-radius: ${(props) => (props.variant === 'circle' ? '0' : '3px')};
	background: ${(props) => (props.variant === 'circle' ? 'transparent' : 'white')};
	font-size: ${(props) => (props.variant === 'circle' ? '1.4rem' : '0.9rem')};
	font-weight: bold;
	padding: 0;
	margin: 0;
	outline: none;

	/* Remove number input spinner arrows completely */
	-webkit-appearance: textfield;
	-moz-appearance: textfield;
	appearance: textfield;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
		display: none;
	}

	&[type='number'] {
		-moz-appearance: textfield;
	}

	/* Force center alignment and remove any browser default styling */
	${(props) =>
		props.variant === 'circle' &&
		`
    line-height: 1;
    vertical-align: baseline;
    box-sizing: border-box;
  `}
`;

export const StyledTempHPInput = styled(StyledResourceInput)`
	width: 25px;
	font-size: 0.7rem;
`;

// New components for refactored layout
export const ResourcesContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin-bottom: 1.5rem;
`;

export const ResourceColumn = styled.div`
	text-align: center;
`;

export const ResourceLabel = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
	color: #8b4513;
	margin-bottom: 0.3rem;
`;

export const ResourceControls = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

export const TempHPControls = styled.div`
	font-size: 0.8rem;
	color: #dc2626;
	margin-top: 0.3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.3rem;
`;

export const TempHPLabel = styled.span`
	font-weight: normal;
`;

export const TempHPInputSmall = styled.input`
	color: #dc2626;
	background: white;
	border: 1px solid #dc2626;
	border-radius: 3px;
	width: 35px;
	text-align: center;
	font-size: 0.8rem;
	padding: 2px;

	&:focus {
		outline: none;
		border-color: #b91c1c;
		box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
	}
`;
````

## File: tsconfig.json
````json
{
	"compilerOptions": {
		"target": "ES2020",
		"useDefineForClassFields": true,
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"types": ["vite/client"],
		"module": "ESNext",
		"skipLibCheck": true,
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react-jsx",
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true,
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"sourceMap": true
	},
	"include": ["src", "pdf-service"],
	"references": [{ "path": "./tsconfig.node.json" }]
}
````

## File: vercel.json
````json
{
	"outputDirectory": "dist"
}
````

## File: vite.config.ts
````typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), react()],
	publicDir: 'static',
	build: {
		outDir: 'dist'
	}
});
````

## File: README.md
````markdown
001
````

## File: src/lib/services/characterCalculator.ts
````typescript
// DC20 Character Calculator Service
// Handles calculation of derived stats based on DC20 rules

import { skillsData } from '../rulesdata/skills';
import { ancestriesData } from '../rulesdata/ancestries';
import type { IClassDefinition } from '../rulesdata/schemas/class.schema';

export interface CharacterInProgressData {
	id: string;
	// Attributes
	attribute_might: number;
	attribute_agility: number;
	attribute_charisma: number;
	attribute_intelligence: number;

	// Progression
	level: number;
	combatMastery: number;

	// Class & Ancestry
	classId: string | null;
	ancestry1Id: string | null;
	ancestry2Id: string | null;
	selectedTraitIds: string;
	selectedFeatureChoices: string;

	// Character Details
	finalName: string | null;
	finalPlayerName: string | null;

	// Skills (if implemented)
	skillsJson?: string;
	tradesJson?: string;
	languagesJson?: string;

	// Timestamps
	createdAt: Date;
	updatedAt?: Date;
	completedAt?: string;
}

export interface CalculatedCharacterStats {
	// Basic Info
	id: string;
	finalName: string;
	finalPlayerName?: string;
	finalLevel: number;

	// Timestamps
	createdAt: Date;
	updatedAt?: Date;
	completedAt?: string;

	// Attributes
	finalMight: number;
	finalAgility: number;
	finalCharisma: number;
	finalIntelligence: number;

	// Calculated Stats
	finalPrimeModifierValue: number;
	finalPrimeModifierAttribute: string;
	finalCombatMastery: number;

	// Saves (Attribute + Combat Mastery)
	finalSaveMight: number;
	finalSaveAgility: number;
	finalSaveCharisma: number;
	finalSaveIntelligence: number;

	// Health & Resources
	finalHPMax: number;
	finalSPMax: number;
	finalMPMax: number;

	// Defenses
	finalPD: number;
	finalAD: number;

	// Other Stats
	finalSaveDC: number;
	finalDeathThreshold: number;
	finalMoveSpeed: number;
	finalJumpDistance: number;
	finalRestPoints: number;
	finalGritPoints: number;
	finalInitiativeBonus: number;

	// PDR (Physical Damage Reduction)
	finalPDR: number;

	// Class & Ancestry Info
	classId: string | null;
	className: string;
	ancestry1Id: string | null;
	ancestry1Name?: string;
	ancestry2Id: string | null;
	ancestry2Name?: string;

	// JSON data fields
	skillsJson?: string;
	tradesJson?: string;
	languagesJson?: string;
}

// Import class data (we need to create this import based on what's available)
const getClassData = async (classId: string): Promise<IClassDefinition | null> => {
	try {
		// Dynamic import of class data
		const { classesData } = await import('../rulesdata/loaders/class.loader');

		const classData = classesData.find((c) => c.id === classId);
		return classData || null;
	} catch (error) {
		console.warn('Could not load class data:', error);
		return null;
	}
};

// Get ancestry data by ID
const getAncestryData = (ancestryId: string | null): { id: string; name: string } | null => {
	if (!ancestryId) return null;

	const ancestry = ancestriesData.find((a) => a.id === ancestryId);
	return ancestry ? { id: ancestry.id, name: ancestry.name } : null;
};

const calculatePrimeModifier = (attributes: {
	might: number;
	agility: number;
	charisma: number;
	intelligence: number;
}): { value: number; attribute: string } => {
	// Find the highest attribute
	const { might, agility, charisma, intelligence } = attributes;
	const attrArray = [
		{ value: might, name: 'MIG' },
		{ value: agility, name: 'AGI' },
		{ value: charisma, name: 'CHA' },
		{ value: intelligence, name: 'INT' }
	];

	const highest = attrArray.reduce((prev, curr) => (curr.value > prev.value ? curr : prev));

	return {
		value: highest.value,
		attribute: highest.name
	};
};

export const calculateCharacterStats = async (
	characterData: CharacterInProgressData
): Promise<CalculatedCharacterStats> => {
	console.log('calculateCharacterStats called with:', characterData);

	// Get class data
	const classData = characterData.classId ? await getClassData(characterData.classId) : null;
	console.log('Class data loaded:', classData);

	// Get ancestry data
	const ancestry1Data = getAncestryData(characterData.ancestry1Id);
	const ancestry2Data = getAncestryData(characterData.ancestry2Id);
	console.log('Ancestry data loaded:', { ancestry1Data, ancestry2Data });

	// Basic attributes
	const finalMight = characterData.attribute_might;
	const finalAgility = characterData.attribute_agility;
	const finalCharisma = characterData.attribute_charisma;
	const finalIntelligence = characterData.attribute_intelligence;

	// Combat Mastery (half level rounded up)
	const finalCombatMastery = Math.ceil(characterData.level / 2);

	// Prime Modifier
	const primeModifier = calculatePrimeModifier({
		might: finalMight,
		agility: finalAgility,
		charisma: finalCharisma,
		intelligence: finalIntelligence
	});

	// Defenses (DC20 formulas)
	// PD = 8 + CM + Agility + Intelligence + Bonuses
	const finalPD = 8 + finalCombatMastery + finalAgility + finalIntelligence;

	// AD = 8 + CM + Might + Charisma + Bonuses
	const finalAD = 8 + finalCombatMastery + finalMight + finalCharisma;

	// Health & Resources
	let finalHPMax = finalMight; // Base from Might
	let finalSPMax = 0;
	let finalMPMax = 0;
	let finalSaveDC = 8; // Base
	let finalDeathThreshold = 10; // Base
	let finalMoveSpeed = 30; // Base
	let finalRestPoints = 4; // Base
	let finalInitiativeBonus = 0; // Base

	// Add class contributions
	if (classData) {
		finalHPMax += classData.baseHpContribution;
		finalSPMax = classData.startingSP;
		finalMPMax = classData.startingMP;
		finalSaveDC = classData.saveDCBase;
		finalDeathThreshold = classData.deathThresholdBase;
		finalMoveSpeed = classData.moveSpeedBase;
		finalRestPoints = classData.restPointsBase;
		finalInitiativeBonus = classData.initiativeBonusBase;
	}

	// Add attribute bonuses
	finalSaveDC += primeModifier.value; // Save DC = Base + Prime
	finalInitiativeBonus += finalCombatMastery + finalAgility; // Initiative = CM + Agility

	// Calculate Save Values (Updated Formula)
	// Save = Attribute Modifier + Combat Mastery (always)
	const finalSaveMight = finalMight + finalCombatMastery;
	const finalSaveAgility = finalAgility + finalCombatMastery;
	const finalSaveCharisma = finalCharisma + finalCombatMastery;
	const finalSaveIntelligence = finalIntelligence + finalCombatMastery;

	console.log('Save calculations:', {
		combatMastery: finalCombatMastery,
		attributes: {
			might: finalMight,
			agility: finalAgility,
			charisma: finalCharisma,
			intelligence: finalIntelligence
		},
		results: {
			might: finalSaveMight,
			agility: finalSaveAgility,
			charisma: finalSaveCharisma,
			intelligence: finalSaveIntelligence
		}
	});

	// Jump Distance = Agility (min 1)
	const finalJumpDistance = Math.max(1, finalAgility);

	// Grit Points = 2 + Charisma (from class base)
	const baseGritPoints = classData?.gritPointsBase || 2;
	const finalGritPoints = baseGritPoints + finalCharisma;

	// Calculate PDR (Physical Damage Reduction)
	const finalPDR = calculatePDR(characterData, classData);

	// Default skills if not provided
	let skillsJson = characterData.skillsJson;
	if (!skillsJson) {
		// Create default skills with 0 proficiency
		const defaultSkills: Record<string, number> = {};
		skillsData.forEach((skill) => {
			defaultSkills[skill.id] = 0;
		});
		skillsJson = JSON.stringify(defaultSkills);
	}

	return {
		// Basic Info
		id: characterData.id,
		finalName: characterData.finalName || 'Unnamed Character',
		finalPlayerName: characterData.finalPlayerName || undefined,
		finalLevel: characterData.level,

		// Timestamps
		createdAt: characterData.createdAt,
		updatedAt: characterData.updatedAt,
		completedAt: characterData.completedAt,

		// Attributes
		finalMight,
		finalAgility,
		finalCharisma,
		finalIntelligence,

		// Calculated Stats
		finalPrimeModifierValue: primeModifier.value,
		finalPrimeModifierAttribute: primeModifier.attribute,
		finalCombatMastery,

		// Saves (Attribute + Combat Mastery)
		finalSaveMight,
		finalSaveAgility,
		finalSaveCharisma,
		finalSaveIntelligence,

		// Health & Resources
		finalHPMax,
		finalSPMax,
		finalMPMax,

		// Defenses
		finalPD,
		finalAD,

		// Other Stats
		finalSaveDC,
		finalDeathThreshold,
		finalMoveSpeed,
		finalJumpDistance,
		finalRestPoints,
		finalGritPoints,
		finalInitiativeBonus,

		// PDR (Physical Damage Reduction)
		finalPDR,

		// Class & Ancestry Info
		classId: characterData.classId,
		className: classData?.name || 'Unknown',
		ancestry1Id: characterData.ancestry1Id,
		ancestry1Name: ancestry1Data?.name,
		ancestry2Id: characterData.ancestry2Id,
		ancestry2Name: ancestry2Data?.name,

		// JSON data fields
		skillsJson,
		tradesJson: characterData.tradesJson || '{}',
		languagesJson: characterData.languagesJson || '{"common": {"fluency": "fluent"}}'
	};
};

// Helper function to calculate PDR (Physical Damage Reduction)
const calculatePDR = (characterData: CharacterInProgressData, classData: any): number => {
	let pdr = 0;

	// Check for Beastborn Natural Armor trait
	if (characterData.selectedTraitIds) {
		try {
			const selectedTraits = JSON.parse(characterData.selectedTraitIds);
			if (selectedTraits.includes('beastborn_natural_armor')) {
				// Natural Armor grants PDR when not wearing armor
				// According to DC20 rules, this grants PDR (Physical Damage Reduction)
				pdr += 1;
			}
		} catch (error) {
			console.warn('Error parsing selectedTraitIds for PDR calculation:', error);
		}
	}

	// Check for Barbarian Rage ability
	if (classData?.id === 'barbarian') {
		// Barbarian Rage grants Resistance (Half) to Physical damage
		// This is effectively PDR, but it's a different mechanic
		// For now, we'll note this but not add to base PDR since Rage is conditional
		// TODO: Could add a note or separate field for conditional PDR
	}

	// TODO: Add additional PDR sources:
	// - Heavy Armor with PDR property (requires armor system integration)
	// - Shell Retreat ability (conditional)
	// - Magic items or other class features
	// - Equipment-based PDR calculation

	return pdr;
};
````

## File: src/lib/stores/characterInProgressStore.ts
````typescript
// src/lib/stores/characterInProgressStore.ts

import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { CharacterInProgress } from '@prisma/client'; // Assuming Prisma client is generated
import { classesData } from '../rulesdata/loaders/class.loader';

// Define the shape of the data stored in the characterInProgressStore
// This should mirror the CharacterInProgress Prisma model, plus any UI state
export interface CharacterInProgressStoreData extends CharacterInProgress {
  // Add any UI-specific state here if needed, e.g., current step in wizard
  currentStep: number;
  // Add temporary state for trait selection overflow
  overflowTraitId: string | null;
  overflowAttributeName: string | null;
  // Add Level and Combat Mastery
  level: number;
  combatMastery: number; // Derived, but included in interface for clarity
}

// Initial state for the store, matching Prisma defaults and adding UI state
const initialCharacterInProgressState: CharacterInProgressStoreData = {
  id: '', // Will be set when a new character is started/loaded
  attribute_might: -2,
  attribute_agility: -2,
  attribute_charisma: -2,
  attribute_intelligence: -2,
  pointsSpent: 0,

  // Core Stats
  level: 1, // Default to Level 1 for MVP
  combatMastery: 1, // Calculated: Math.ceil(level / 2)

  ancestry1Id: null,
  ancestry2Id: null,
  selectedTraitIds: '', // JSON string of selected trait IDs
  ancestryPointsSpent: 0,

  classId: null,
  selectedFeatureChoices: '', // JSON string of selected feature choice IDs/values

  // Skills, Equipment, Details fields will be added/updated later
  finalName: null,
  finalPlayerName: null,

  createdAt: new Date(), // Placeholder, will be set by DB
  updatedAt: new Date(), // Placeholder, will be set by DB

  // UI State
  currentStep: 1, // Start at Stage A (Attributes)
  overflowTraitId: null,
  overflowAttributeName: null,
};

// Create the writable store
export const characterInProgressStore: Writable<CharacterInProgressStoreData> = writable(initialCharacterInProgressState);

// Helper function to get an attribute's modifier
// In DC20, the attribute score itself is the modifier.
// Handles null or undefined scores by returning 0.
export function getModifier(attributeScore: number | null | undefined): number {
  return attributeScore ?? 0;
}

// Constant for Level 1 Combat Mastery (DC20 p.22)
export const L1_COMBAT_MASTERY = 1; // Keep for reference, but use derived store

// --- Derived Stores ---

// Derived store for Combat Mastery (half level rounded up)
export const combatMastery = derived(
  characterInProgressStore,
  ($store) => {
    return Math.ceil(($store.level ?? 1) / 2); // Default to level 1 if store.level is null/undefined
  }
);

// Derived store for the Prime Modifier Value and Attribute
export const primeModifier = derived(
  characterInProgressStore,
  ($store) => {
    const attributes = [
      { name: 'Might', value: $store.attribute_might },
      { name: 'Agility', value: $store.attribute_agility },
      { name: 'Charisma', value: $store.attribute_charisma },
      { name: 'Intelligence', value: $store.attribute_intelligence },
    ];

    // Find the highest attribute score
    let highestAttribute = attributes[0];
    for (let i = 1; i < attributes.length; i++) {
      if (attributes[i].value > highestAttribute.value) {
        highestAttribute = attributes[i];
      }
    }

    // Handle ties: If there's a tie, the player chooses.
    // For now, we'll just pick the first one in case of a tie.
    // A more complex implementation might require user input on tie-breaking.
    // Add a defensive check for highestAttribute
    if (!highestAttribute) {
        console.error("Error calculating primeModifier: highestAttribute is undefined.");
        return { value: 0, attribute: 'Unknown' }; // Return a default safe value
    }

    const primeModifierValue = highestAttribute.value;
    const primeModifierAttribute = highestAttribute.name;

    return { value: primeModifierValue, attribute: primeModifierAttribute };
  }
);

// Derived store for Grit Points (Base + Charisma Modifier)
export const gritPoints = derived(
  characterInProgressStore,
  ($store) => {
    // Assuming base Grit Points are defined in class data, but for now use a placeholder
    const baseGrit = 2; // Placeholder, should come from class data
    return baseGrit + getModifier($store.attribute_charisma);
  }
);

// Derived store for Jump Distance (Agility Modifier, min 1)
export const jumpDistance = derived(
  characterInProgressStore,
  ($store) => {
    const agilityModifier = getModifier($store.attribute_agility);
    return agilityModifier < 1 ? 1 : agilityModifier;
  }
);

/**
 * Derived store for Starting SP (from class)
 */
export const startingSP = derived(
  characterInProgressStore,
  ($store) => {
    if (!$store.classId) return 0;
    const classData = classesData.find((c: { id: string; }) => c.id === $store.classId);
    return classData?.startingSP ?? 0;
  }
);

/**
 * Derived store for Starting MP (from class)
 */
export const startingMP = derived(
  characterInProgressStore,
  ($store) => {
    if (!$store.classId) return 0;
    const classData = classesData.find((c: { id: string; }) => c.id === $store.classId);
    return classData?.startingMP ?? 0;
  }
);

// Derived store for Provisional Skill Points (5 + Intelligence Modifier + Class Bonus)
export const provisionalSkillPoints = derived(
  characterInProgressStore,
  ($store) => {
    const intelligenceModifier = getModifier($store.attribute_intelligence);
    // Assuming class data is available to get skillPointGrantLvl1
    // For now, use a placeholder of 0 if classId is not set
    const classSkillBonus = 0; // Placeholder, should come from class data based on $store.classId
    return 5 + intelligenceModifier + classSkillBonus;
  }
);

import { traitsData } from '../rulesdata/traits.ts';
import type { ITrait } from '../rulesdata/types.ts';

// ... (rest of the file)

// Derived store for Ancestry Points Remaining (Base 5 - Spent)
export const ancestryPointsRemaining = derived(
  characterInProgressStore,
  ($store) => {
    const basePoints = 5;
    const selectedTraitIds = JSON.parse($store.selectedTraitIds || '[]');
    
    const traits = selectedTraitIds.map((id: string) => traitsData.find((t: ITrait) => t.id === id)) as (ITrait | undefined)[];

    const totalCost = traits
      .filter((t): t is ITrait => t !== undefined)
      .reduce((acc: number, t: ITrait) => acc + t.cost, 0);

    return basePoints - totalCost;
  }
);

/**
 * Derived store for Max HP (Class HP + Might Modifier + Ancestry HP)
 * Uses selected class's baseHpContribution, defaults to 8 if not set.
 */
export const maxHP = derived(
  characterInProgressStore,
  ($store) => {
    const classData = classesData.find((c: { id: string; }) => c.id === $store.classId);
    const classHP = classData?.baseHpContribution ?? 8;
    const mightModifier = getModifier($store.attribute_might);
    const ancestryHP = 0; // Assuming 0 for MVP until Ancestry HP is implemented
    return classHP + mightModifier + ancestryHP;
  }
);

// Derived store for Area Defense (8 + CM + Might Modifier + Charisma Modifier + Bonuses)
export const areaDefense = derived(
  [characterInProgressStore, combatMastery],
  ([$store, $combatMastery]) => {
    const mightModifier = getModifier($store.attribute_might);
    const charismaModifier = getModifier($store.attribute_charisma);
    const bonuses = 0; // Assuming 0 for MVP until bonuses are implemented
    return 8 + $combatMastery + mightModifier + charismaModifier + bonuses;
  }
);

// Derived store for Precision Defense (8 + CM + Agility Modifier + Intelligence Modifier + Bonuses)
export const precisionDefense = derived(
  [characterInProgressStore, combatMastery],
  ([$store, $combatMastery]) => {
    const agilityModifier = getModifier($store.attribute_agility);
    const intelligenceModifier = getModifier($store.attribute_intelligence);
    const bonuses = 0; // Assuming 0 for MVP until bonuses are implemented
    return 8 + $combatMastery + agilityModifier + intelligenceModifier + bonuses;
  }
);

// Derived store for Initiative (CM + Agility Modifier)
export const initiative = derived(
  [characterInProgressStore, combatMastery],
  ([$store, $combatMastery]) => {
    const agilityModifier = getModifier($store.attribute_agility);
    return $combatMastery + agilityModifier;
  }
);
````

## File: src/routes/character-creation/AncestryPointsCounter.tsx
````typescript
import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { StyledContainer, StyledTitle } from './styles/AncestryPointsCounter.styles';

function AncestryPointsCounter() {
	const { ancestryPointsRemaining } = useCharacter();

	return (
		<StyledContainer>
			<StyledTitle>Ancestry Points: {ancestryPointsRemaining}</StyledTitle>
		</StyledContainer>
	);
}

export default AncestryPointsCounter;
````

## File: src/routes/character-creation/AncestrySelector.tsx
````typescript
import { useState } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries';
import type { IAncestry } from '../../lib/rulesdata/types';
import {
	StyledContainer,
	StyledTitle,
	StyledGrid,
	StyledCard,
	StyledCardHeader,
	StyledAncestryIcon,
	StyledCardTitle,
	StyledCardDescription,
	StyledCardFooter,
	StyledReadMore,
	StyledTooltip,
	StyledTooltipOverlay,
	StyledTooltipHeader,
	StyledTooltipIcon,
	StyledTooltipTitle,
	StyledTooltipContent,
	StyledCloseHint
} from './styles/AncestrySelector.styles';

// Ancestry-specific icons using Unicode symbols and emojis
const ancestryIcons: { [key: string]: string } = {
	human: '👤',
	elf: '🧝‍♂️',
	dwarf: '🧔',
	halfling: '🧙‍♂️',
	dragonborn: '🐉',
	gnome: '🎭',
	'half-elf': '🧝‍♀️',
	'half-orc': '👹',
	tiefling: '😈',
	orc: '🗡️',
	goblin: '👺',
	kobold: '🦎',
	default: '🌟'
};

function AncestrySelector() {
	const { state, dispatch } = useCharacter();
	const [popupAncestry, setPopupAncestry] = useState<string | null>(null);

	const selectedAncestries: string[] = [];
	if (state.ancestry1Id) selectedAncestries.push(state.ancestry1Id);
	if (state.ancestry2Id) selectedAncestries.push(state.ancestry2Id);

	function handleSelectAncestry(ancestryId: string) {
		const isSelected = selectedAncestries.includes(ancestryId);

		if (isSelected) {
			// Deselect
			let newAncestry1Id = state.ancestry1Id;
			let newAncestry2Id = state.ancestry2Id;

			if (state.ancestry1Id === ancestryId) {
				newAncestry1Id = null;
			} else if (state.ancestry2Id === ancestryId) {
				newAncestry2Id = null;
			}

			dispatch({ type: 'SET_ANCESTRY', ancestry1Id: newAncestry1Id, ancestry2Id: newAncestry2Id });
		} else {
			// Select
			if (!state.ancestry1Id) {
				dispatch({ type: 'SET_ANCESTRY', ancestry1Id: ancestryId, ancestry2Id: state.ancestry2Id });
			} else if (!state.ancestry2Id) {
				dispatch({ type: 'SET_ANCESTRY', ancestry1Id: state.ancestry1Id, ancestry2Id: ancestryId });
			}
		}
	}

	function getAncestryIcon(ancestryId: string): string {
		return ancestryIcons[ancestryId.toLowerCase()] || ancestryIcons.default;
	}

	function truncateText(text: string, maxLength: number): string {
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + '...';
	}

	function needsReadMore(text: string, maxLength: number): boolean {
		return text.length > maxLength;
	}

	function openPopup(ancestryId: string) {
		setPopupAncestry(ancestryId);
	}

	function closePopup() {
		setPopupAncestry(null);
	}

	return (
		<StyledContainer>
			<StyledTitle>Choose Your Ancestry</StyledTitle>
			<StyledGrid>
				{ancestriesData.map((ancestry: IAncestry) => (
					<StyledCard
						key={ancestry.id}
						type="button"
						$selected={selectedAncestries.includes(ancestry.id)}
						onClick={() => handleSelectAncestry(ancestry.id)}
					>
						<StyledCardHeader>
							<StyledAncestryIcon>{getAncestryIcon(ancestry.id)}</StyledAncestryIcon>
							<StyledCardTitle>{ancestry.name}</StyledCardTitle>
						</StyledCardHeader>
						<StyledCardDescription>{truncateText(ancestry.description, 80)}</StyledCardDescription>
						{needsReadMore(ancestry.description, 80) && (
							<StyledCardFooter>
								<StyledReadMore
									onClick={(e) => {
										e.stopPropagation();
										openPopup(ancestry.id);
									}}
								>
									read more...
								</StyledReadMore>
							</StyledCardFooter>
						)}
					</StyledCard>
				))}
			</StyledGrid>

			{/* Popup overlay and content */}
			<StyledTooltipOverlay $show={popupAncestry !== null} onClick={closePopup} />
			{popupAncestry && (
				<StyledTooltip $show={popupAncestry !== null}>
					<StyledTooltipHeader>
						<StyledTooltipIcon>{getAncestryIcon(popupAncestry)}</StyledTooltipIcon>
						<StyledTooltipTitle>
							{ancestriesData.find((a) => a.id === popupAncestry)?.name}
						</StyledTooltipTitle>
					</StyledTooltipHeader>
					<StyledTooltipContent>
						{ancestriesData.find((a) => a.id === popupAncestry)?.description}
					</StyledTooltipContent>
					<StyledCloseHint>Click anywhere to close</StyledCloseHint>
				</StyledTooltip>
			)}
		</StyledContainer>
	);
}

export default AncestrySelector;
````

## File: src/routes/character-creation/Background.tsx
````typescript
import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { useBackgroundPoints } from './components/BackgroundPointsManager';
import SkillsTab from './components/SkillsTab';
import TradesTab from './components/TradesTab';
import LanguagesTab from './components/LanguagesTab';
import {
	StyledContainer,
	StyledSubheading,
	StyledDescription,
	StyledTabContainer,
	StyledTab
} from './styles/Background.styles.ts';

type TabType = 'skills' | 'trades' | 'languages';

const Background: React.FC = () => {
	const { state, dispatch } = useCharacter();
	const [activeTab, setActiveTab] = React.useState<TabType>('skills');

	// Parse current selections
	const currentSkills = state.skillsJson ? JSON.parse(state.skillsJson) : {};
	const currentTrades = state.tradesJson ? JSON.parse(state.tradesJson) : {};
	const currentLanguages = state.languagesJson
		? JSON.parse(state.languagesJson)
		: { common: { fluency: 'fluent' } };

	// Calculate points used
	const skillPointsUsed = Object.values(currentSkills).reduce(
		(sum: number, level: any) => sum + level,
		0
	);
	const tradePointsUsed = Object.values(currentTrades).reduce(
		(sum: number, level: any) => sum + level,
		0
	);
	const languagePointsUsed = Object.entries(currentLanguages).reduce(
		(sum, [langId, data]: [string, any]) => {
			if (langId === 'common') return sum; // Common is free
			return (
				sum +
				(data.fluency === 'limited'
					? 1
					: data.fluency === 'fluent'
						? 2
						: 0)
			);
		},
		0
	);

	// Use the background points manager hook
	const { pointsData, conversions, actions } = useBackgroundPoints(
		skillPointsUsed,
		tradePointsUsed,
		languagePointsUsed,
		state.attribute_intelligence
	);

	// Handler functions
	const handleSkillChange = (skillId: string, newLevel: number) => {
		const updatedSkills = { ...currentSkills };
		if (newLevel === 0) {
			delete updatedSkills[skillId];
		} else {
			updatedSkills[skillId] = newLevel;
		}

		dispatch({
			type: 'UPDATE_SKILLS',
			skillsJson: JSON.stringify(updatedSkills)
		});
	};

	const handleTradeChange = (tradeId: string, newLevel: number) => {
		const updatedTrades = { ...currentTrades };
		if (newLevel === 0) {
			delete updatedTrades[tradeId];
		} else {
			updatedTrades[tradeId] = newLevel;
		}

		dispatch({
			type: 'UPDATE_TRADES',
			tradesJson: JSON.stringify(updatedTrades)
		});
	};

	const handleLanguageChange = (
		languageId: string,
		fluency: 'limited' | 'fluent' | null
	) => {
		const updatedLanguages = { ...currentLanguages };
		if (fluency === null) {
			delete updatedLanguages[languageId];
		} else {
			updatedLanguages[languageId] = { fluency };
		}

		dispatch({
			type: 'UPDATE_LANGUAGES',
			languagesJson: JSON.stringify(updatedLanguages)
		});
	};

	const renderCurrentTab = () => {
		switch (activeTab) {
			case 'skills':
				return (
					<SkillsTab
						currentSkills={currentSkills}
						pointsData={pointsData}
						conversions={conversions}
						actions={actions}
						onSkillChange={handleSkillChange}
					/>
				);
			case 'trades':
				return (
					<TradesTab
						currentTrades={currentTrades}
						pointsData={pointsData}
						conversions={conversions}
						actions={actions}
						onTradeChange={handleTradeChange}
					/>
				);
			case 'languages':
				return (
					<LanguagesTab
						currentLanguages={currentLanguages}
						pointsData={pointsData}
						conversions={conversions}
						actions={actions}
						onLanguageChange={handleLanguageChange}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<StyledContainer>
			<StyledSubheading>Background (Skills, Trades & Languages)</StyledSubheading>
			<StyledDescription>
				Choose your character's background skills, trades, and languages. You have{' '}
				<span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{pointsData.baseSkillPoints}</span>{' '}
				skill points{' '}
				<span style={{ fontSize: '0.9rem', color: '#6b7280' }}>(5 + Intelligence modifier)</span>,{' '}
				<span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{pointsData.baseTradePoints}</span>{' '}
				trade points, and{' '}
				<span style={{ fontWeight: 'bold', color: '#3b82f6' }}>
					{pointsData.baseLanguagePoints}
				</span>{' '}
				language points. <br />
				<span
					style={{
						marginTop: '0.5rem',
						display: 'inline-block',
						padding: '0.25rem 0.5rem',
						backgroundColor: '#f3f4f6',
						borderRadius: '4px',
						fontSize: '0.9rem',
						color: '#374151'
					}}
				>
					💡 Conversions: 1 skill ↔ 2 trade • 1 trade → 2 language
				</span>
				<br />
				All characters start fluent in Common for free.
			</StyledDescription>

			<StyledTabContainer>
				<StyledTab $active={activeTab === 'skills'} onClick={() => setActiveTab('skills')}>
					Skills ({pointsData.availableSkillPoints - pointsData.skillPointsUsed} left)
				</StyledTab>
				<StyledTab $active={activeTab === 'trades'} onClick={() => setActiveTab('trades')}>
					Trades ({pointsData.availableTradePoints - pointsData.tradePointsUsed} left)
				</StyledTab>
				<StyledTab $active={activeTab === 'languages'} onClick={() => setActiveTab('languages')}>
					Languages ({pointsData.availableLanguagePoints - pointsData.languagePointsUsed} left)
				</StyledTab>
			</StyledTabContainer>

			{renderCurrentTab()}
		</StyledContainer>
	);
};

export default Background;
````

## File: src/routes/character-creation/SelectedAncestries.tsx
````typescript
import React from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { ancestriesData } from '../../lib/rulesdata/ancestries';
import { traitsData } from '../../lib/rulesdata/traits';
import type { IAncestry, ITrait } from '../../lib/rulesdata/types';
import {
	StyledOuterContainer,
	StyledMainTitle,
	StyledContainer,
	StyledAncestryDetails,
	StyledTitle,
	StyledSubtitle,
	StyledList,
	StyledListItem,
	StyledLabel,
	StyledCheckbox
} from './styles/SelectedAncestries.styles';

function SelectedAncestries() {
	const { state, dispatch } = useCharacter();

	const selectedAncestry1 = ancestriesData.find((a) => a.id === state.ancestry1Id);
	const selectedAncestry2 = ancestriesData.find((a) => a.id === state.ancestry2Id);
	const selectedTraits: string[] = JSON.parse(state.selectedTraitIds || '[]');

	function getTrait(traitId: string): ITrait | undefined {
		return traitsData.find((t) => t.id === traitId);
	}

	function handleToggleTrait(traitId: string) {
		const trait = getTrait(traitId);
		if (!trait) return;

		let currentTraits = [...selectedTraits];

		if (currentTraits.includes(traitId)) {
			// Deselect
			currentTraits = currentTraits.filter((id) => id !== traitId);
		} else {
			// Select
			currentTraits.push(traitId);
		}

		dispatch({ type: 'SET_TRAITS', selectedTraitIds: JSON.stringify(currentTraits) });
	}

	function renderAncestryTraits(ancestry: IAncestry) {
		return (
			<StyledAncestryDetails>
				<StyledTitle>{ancestry.name}</StyledTitle>

				<StyledSubtitle>Default Traits</StyledSubtitle>
				<StyledList>
					{(ancestry.defaultTraitIds || []).map((traitId) => {
						const trait = getTrait(traitId);
						if (!trait) return null;
						return (
							<StyledListItem key={traitId}>
								<StyledLabel>
									<StyledCheckbox
										type="checkbox"
										checked={selectedTraits.includes(traitId)}
										onChange={() => handleToggleTrait(traitId)}
									/>
									{trait.name} ({trait.cost} pts) - {trait.description}
								</StyledLabel>
							</StyledListItem>
						);
					})}
				</StyledList>

				<StyledSubtitle>Expanded Traits</StyledSubtitle>
				<StyledList>
					{(ancestry.expandedTraitIds || []).map((traitId) => {
						const trait = getTrait(traitId);
						if (!trait) return null;
						return (
							<StyledListItem key={traitId}>
								<StyledLabel>
									<StyledCheckbox
										type="checkbox"
										checked={selectedTraits.includes(traitId)}
										onChange={() => handleToggleTrait(traitId)}
									/>
									{trait.name} ({trait.cost} pts) - {trait.description}
								</StyledLabel>
							</StyledListItem>
						);
					})}
				</StyledList>
			</StyledAncestryDetails>
		);
	}

	return (
		<StyledOuterContainer>
			<StyledMainTitle>Ancestry Traits</StyledMainTitle>
			<StyledContainer>
				{selectedAncestry1 && renderAncestryTraits(selectedAncestry1)}
				{selectedAncestry2 && renderAncestryTraits(selectedAncestry2)}
			</StyledContainer>
		</StyledOuterContainer>
	);
}

export default SelectedAncestries;
````

## File: src/routes/character-creation/Attributes.tsx
````typescript
import { useCharacter } from '../../lib/stores/characterContext';
import { attributesData } from '../../lib/rulesdata/attributes';
import {
	StyledContainer,
	StyledTitle,
	StyledPointsRemaining,
	StyledGrid,
	StyledCard,
	StyledCardTitle,
	StyledControls,
	StyledButton,
	StyledValue,
	StyledDescription
} from './styles/Attributes.styles';

type AttributeState = Record<string, number>;

function Attributes() {
	const { state, dispatch, attributePointsRemaining } = useCharacter();
	const typedState = state as unknown as AttributeState;

	function increaseAttribute(attribute: string) {
		if (attributePointsRemaining > 0) {
			const currentValue = typedState[attribute];
			// Maximum attribute value during character creation is +3
			if (currentValue < 3) {
				dispatch({ type: 'UPDATE_ATTRIBUTE', attribute, value: currentValue + 1 });
			}
		}
	}

	function decreaseAttribute(attribute: string) {
		const currentValue = typedState[attribute];
		if (currentValue > -2) {
			dispatch({ type: 'UPDATE_ATTRIBUTE', attribute, value: currentValue - 1 });
		}
	}

	return (
		<StyledContainer>
			<StyledTitle>Attributes</StyledTitle>
			<StyledPointsRemaining>Points Remaining: {attributePointsRemaining}</StyledPointsRemaining>
			<StyledGrid>
				{attributesData.map((attribute) => (
					<StyledCard key={attribute.id}>
						<StyledCardTitle>{attribute.name}</StyledCardTitle>
						<StyledDescription>{attribute.description}</StyledDescription>
						<StyledControls>
							<StyledButton
								onClick={() => decreaseAttribute('attribute_' + attribute.id)}
								disabled={typedState['attribute_' + attribute.id] <= -2}
							>
								-
							</StyledButton>
							<StyledValue>{typedState['attribute_' + attribute.id]}</StyledValue>
							<StyledButton
								onClick={() => increaseAttribute('attribute_' + attribute.id)}
								disabled={
									attributePointsRemaining <= 0 || typedState['attribute_' + attribute.id] >= 3
								}
							>
								+
							</StyledButton>
						</StyledControls>
					</StyledCard>
				))}
			</StyledGrid>
		</StyledContainer>
	);
}

export default Attributes;
````

## File: src/routes/character-creation/ClassFeatures.tsx
````typescript
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import {
	StyledContainer,
	StyledTitle,
	StyledSection,
	StyledSectionTitle,
	StyledCard,
	StyledCardTitle,
	StyledCardDescription,
	StyledChoiceOptions,
	StyledLabel,
	StyledRadio,
	StyledOptionDescription,
	StyledNoSelection
} from './styles/ClassFeatures.styles';

function ClassFeatures() {
	const { state, dispatch } = useCharacter();

	const selectedClass = classesData.find((c) => c.id === state.classId);
	const selectedFeatureChoices: { [key: string]: string } = JSON.parse(
		state.selectedFeatureChoices || '{}'
	);

	function handleFeatureChoice(choiceId: string, value: string) {
		const currentChoices = { ...selectedFeatureChoices };
		currentChoices[choiceId] = value;
		dispatch({
			type: 'SET_FEATURE_CHOICES',
			selectedFeatureChoices: JSON.stringify(currentChoices)
		});
	}

	if (!selectedClass) {
		return (
			<StyledContainer>
				<StyledNoSelection>Select a Class to see its features.</StyledNoSelection>
			</StyledContainer>
		);
	}

	return (
		<StyledContainer>
			<StyledTitle>{selectedClass.name} Features</StyledTitle>

			<StyledSection>
				<StyledSectionTitle>Level 1 Features</StyledSectionTitle>
				{(selectedClass.level1Features || []).map((feature: any, index: number) => (
					<StyledCard key={index}>
						<StyledCardTitle>{feature.name}</StyledCardTitle>
						<StyledCardDescription>{feature.description}</StyledCardDescription>
					</StyledCard>
				))}
			</StyledSection>

			{selectedClass.featureChoicesLvl1 && selectedClass.featureChoicesLvl1.length > 0 && (
				<StyledSection>
					<StyledSectionTitle>Feature Choices</StyledSectionTitle>
					{selectedClass.featureChoicesLvl1.map((choice: any) => (
						<StyledCard key={choice.id}>
							<StyledCardTitle>{choice.prompt}</StyledCardTitle>
							{choice.type === 'select_one' && (
								<StyledChoiceOptions>
									{choice.options.map((option: any) => (
										<StyledLabel key={option.value}>
											<StyledRadio
												type="radio"
												name={choice.id}
												value={option.value}
												checked={selectedFeatureChoices[choice.id] === option.value}
												onChange={() => handleFeatureChoice(choice.id, option.value)}
											/>
											{option.label}
											{option.description && (
												<StyledOptionDescription>({option.description})</StyledOptionDescription>
											)}
										</StyledLabel>
									))}
								</StyledChoiceOptions>
							)}
						</StyledCard>
					))}
				</StyledSection>
			)}
		</StyledContainer>
	);
}

export default ClassFeatures;
````

## File: src/routes/character-creation/ClassSelector.tsx
````typescript
import { useState } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import type { IClassDefinition } from '../../lib/rulesdata/types';
import {
	StyledContainer,
	StyledTitle,
	StyledGrid,
	StyledCard,
	StyledCardHeader,
	StyledClassIcon,
	StyledCardTitle,
	StyledCardDescription,
	StyledCardFooter,
	StyledReadMore,
	StyledTooltip,
	StyledTooltipOverlay,
	StyledTooltipHeader,
	StyledTooltipIcon,
	StyledTooltipTitle,
	StyledTooltipContent,
	StyledCloseHint
} from './styles/ClassSelector.styles';

// Class-specific icons using Unicode symbols and emojis
const classIcons: { [key: string]: string } = {
	fighter: '⚔️',
	wizard: '🧙‍♂️',
	rogue: '🗡️',
	cleric: '✨',
	ranger: '🏹',
	barbarian: '🪓',
	bard: '🎭',
	druid: '🌿',
	monk: '👊',
	paladin: '🛡️',
	sorcerer: '🔥',
	warlock: '👹',
	default: '⚡'
};

function ClassSelector() {
	const { state, dispatch } = useCharacter();
	const selectedClassId = state.classId;
	const [popupClass, setPopupClass] = useState<string | null>(null);

	function handleSelectClass(classId: string) {
		if (state.classId === classId) {
			dispatch({ type: 'SET_CLASS', classId: null }); // Deselect if already selected
		} else {
			dispatch({ type: 'SET_CLASS', classId }); // Select new class
		}
	}

	function getClassIcon(classId: string): string {
		return classIcons[classId.toLowerCase()] || classIcons.default;
	}

	function truncateText(text: string, maxLength: number): string {
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + '...';
	}

	function needsReadMore(text: string, maxLength: number): boolean {
		return text.length > maxLength;
	}

	function openPopup(classId: string) {
		setPopupClass(classId);
	}

	function closePopup() {
		setPopupClass(null);
	}

	return (
		<StyledContainer>
			<StyledTitle>Choose Your Class</StyledTitle>
			<StyledGrid>
				{classesData.map((classDef: IClassDefinition) => (
					<StyledCard
						key={classDef.id}
						type="button"
						$selected={selectedClassId === classDef.id}
						onClick={() => handleSelectClass(classDef.id)}
					>
						<StyledCardHeader>
							<StyledClassIcon>{getClassIcon(classDef.id)}</StyledClassIcon>
							<StyledCardTitle>{classDef.name}</StyledCardTitle>
						</StyledCardHeader>
						<StyledCardDescription>{truncateText(classDef.description, 80)}</StyledCardDescription>
						{needsReadMore(classDef.description, 80) && (
							<StyledCardFooter>
								<StyledReadMore
									onClick={(e) => {
										e.stopPropagation();
										openPopup(classDef.id);
									}}
								>
									read more...
								</StyledReadMore>
							</StyledCardFooter>
						)}
					</StyledCard>
				))}
			</StyledGrid>

			{/* Popup overlay and content */}
			<StyledTooltipOverlay $show={popupClass !== null} onClick={closePopup} />
			{popupClass && (
				<StyledTooltip $show={popupClass !== null}>
					<StyledTooltipHeader>
						<StyledTooltipIcon>{getClassIcon(popupClass)}</StyledTooltipIcon>
						<StyledTooltipTitle>
							{classesData.find((c) => c.id === popupClass)?.name}
						</StyledTooltipTitle>
					</StyledTooltipHeader>
					<StyledTooltipContent>
						{classesData.find((c) => c.id === popupClass)?.description}
					</StyledTooltipContent>
					<StyledCloseHint>Click anywhere to close</StyledCloseHint>
				</StyledTooltip>
			)}
		</StyledContainer>
	);
}

export default ClassSelector;
````

## File: src/App.tsx
````typescript
import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { CharacterProvider } from './lib/stores/characterContext';
import CharacterCreation from './routes/character-creation/CharacterCreation.tsx';
import LoadCharacter from './routes/character-creation/LoadCharacter.tsx';
import CharacterSheet from './routes/character-sheet/CharacterSheetClean.tsx';
import Menu from './components/Menu.tsx';
import {
	StyledApp,
	StyledHeader,
	StyledBackButton,
	StyledMain,
	StyledFooter
} from './styles/App.styles';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Georgia', 'Times New Roman', serif;
    background: linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%);
    color: #e5e7eb;
    min-height: 100vh;
  }
  
  #root {
    min-height: 100vh;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
  }
  
  ::-webkit-scrollbar-track {
    background: #1e1b4b;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #8b5cf6;
    border-radius: 6px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #a855f7;
  }
  
  /* Selection colors */
  ::selection {
    background: #fbbf24;
    color: #1e1b4b;
  }
  
  ::-moz-selection {
    background: #fbbf24;
    color: #1e1b4b;
  }
`;

function App() {
	const [currentView, setCurrentView] = useState<'menu' | 'create' | 'load' | 'sheet'>('menu');
	const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

	const handleCreateCharacter = () => {
		setCurrentView('create');
	};

	const handleLoadCharacter = () => {
		setCurrentView('load');
	};

	const handleViewCharacterSheet = (characterId: string) => {
		setSelectedCharacterId(characterId);
		setCurrentView('sheet');
	};

	const handleBackToMenu = () => {
		setCurrentView('menu');
		setSelectedCharacterId(null);
	};

	const renderCurrentView = () => {
		switch (currentView) {
			case 'menu':
				return (
					<Menu onCreateCharacter={handleCreateCharacter} onLoadCharacter={handleLoadCharacter} />
				);
			case 'create':
				return (
					<CharacterProvider>
						<StyledHeader>
							<StyledBackButton onClick={handleBackToMenu}>← Back to Menu</StyledBackButton>
							<span>Created by TBD Group</span>
						</StyledHeader>
						<StyledMain>
							<CharacterCreation onNavigateToLoad={handleLoadCharacter} />
						</StyledMain>
					</CharacterProvider>
				);
			case 'load':
				return (
					<LoadCharacter onBack={handleBackToMenu} onSelectCharacter={handleViewCharacterSheet} />
				);
			case 'sheet':
				return selectedCharacterId ? (
					<CharacterSheet characterId={selectedCharacterId} onBack={handleBackToMenu} />
				) : null;
			default:
				return null;
		}
	};

	return (
		<>
			<GlobalStyle />
			<StyledApp>
				{renderCurrentView()}
				<StyledFooter>All rights reserved to TBD Group, 2025</StyledFooter>
			</StyledApp>
		</>
	);
}

export default App;
````

## File: src/lib/stores/characterContext.tsx
````typescript
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import type { CharacterInProgress } from '@prisma/client';

// Define the shape of the data stored in the character store
export interface CharacterInProgressStoreData extends CharacterInProgress {
	currentStep: number;
	overflowTraitId: string | null;
	overflowAttributeName: string | null;
	level: number;
	combatMastery: number;
	// Background selections (Step 3: Skills, Trades, Languages)
	skillsJson: string;
	tradesJson: string;
	languagesJson: string;
}

// Initial state for the store
const initialCharacterInProgressState: CharacterInProgressStoreData = {
	id: '',
	attribute_might: -2,
	attribute_agility: -2,
	attribute_charisma: -2,
	attribute_intelligence: -2,
	pointsSpent: 0,
	level: 1,
	combatMastery: 1,
	ancestry1Id: null,
	ancestry2Id: null,
	selectedTraitIds: '',
	ancestryPointsSpent: 0,
	classId: null,
	selectedFeatureChoices: '',
	finalName: null,
	finalPlayerName: null,
	createdAt: new Date(),
	updatedAt: new Date(),
	currentStep: 1,
	overflowTraitId: null,
	overflowAttributeName: null,
	// Background selections (Step 3: Skills, Trades, Languages)
	skillsJson: '{}',
	tradesJson: '{}',
	languagesJson: '{"common": {"fluency": "fluent"}}'
};

// Action types
type CharacterAction =
	| { type: 'UPDATE_ATTRIBUTE'; attribute: string; value: number }
	| { type: 'UPDATE_SKILLS'; skillsJson: string }
	| { type: 'UPDATE_TRADES'; tradesJson: string }
	| { type: 'UPDATE_LANGUAGES'; languagesJson: string }
	| { type: 'SET_CLASS'; classId: string | null }
	| { type: 'SET_ANCESTRY'; ancestry1Id: string | null; ancestry2Id: string | null }
	| { type: 'SET_TRAITS'; selectedTraitIds: string }
	| { type: 'SET_FEATURE_CHOICES'; selectedFeatureChoices: string }
	| { type: 'UPDATE_STORE'; updates: Partial<CharacterInProgressStoreData> }
	| { type: 'NEXT_STEP' }
	| { type: 'PREVIOUS_STEP' }
	| { type: 'SET_STEP'; step: number };

// Reducer function
function characterReducer(
	state: CharacterInProgressStoreData,
	action: CharacterAction
): CharacterInProgressStoreData {
	switch (action.type) {
		case 'UPDATE_ATTRIBUTE':
			return {
				...state,
				[action.attribute]: action.value
			};
		case 'UPDATE_SKILLS':
			return {
				...state,
				skillsJson: action.skillsJson
			};
		case 'UPDATE_TRADES':
			return {
				...state,
				tradesJson: action.tradesJson
			};
		case 'UPDATE_LANGUAGES':
			return {
				...state,
				languagesJson: action.languagesJson
			};
		case 'SET_CLASS':
			return {
				...state,
				classId: action.classId
			};
		case 'SET_ANCESTRY':
			return {
				...state,
				ancestry1Id: action.ancestry1Id,
				ancestry2Id: action.ancestry2Id
			};
		case 'SET_TRAITS':
			return {
				...state,
				selectedTraitIds: action.selectedTraitIds
			};
		case 'SET_FEATURE_CHOICES':
			return {
				...state,
				selectedFeatureChoices: action.selectedFeatureChoices
			};
		case 'UPDATE_STORE':
			return {
				...state,
				...action.updates
			};
		case 'NEXT_STEP':
			return {
				...state,
				currentStep: Math.min(state.currentStep + 1, 6)
			};
		case 'PREVIOUS_STEP':
			return {
				...state,
				currentStep: Math.max(state.currentStep - 1, 1)
			};
		case 'SET_STEP':
			return {
				...state,
				currentStep: Math.max(1, Math.min(action.step, 6))
			};
		default:
			return state;
	}
}

// Context type
interface CharacterContextType {
	state: CharacterInProgressStoreData;
	dispatch: React.Dispatch<CharacterAction>;
	// Derived values
	attributePointsRemaining: number;
	ancestryPointsRemaining: number;
	combatMastery: number;
	primeModifier: { name: string; value: number };
}

// Create context
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

// Provider component
export function CharacterProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(characterReducer, initialCharacterInProgressState);

	// Derived values
	const attributePointsRemaining =
		12 -
		(state.attribute_might +
			2 +
			(state.attribute_agility + 2) +
			(state.attribute_charisma + 2) +
			(state.attribute_intelligence + 2));

	const ancestryPointsRemaining = 5 - state.ancestryPointsSpent;

	const combatMastery = Math.ceil((state.level ?? 1) / 2);

	const primeModifier = (() => {
		const attributes = [
			{ name: 'Might', value: state.attribute_might },
			{ name: 'Agility', value: state.attribute_agility },
			{ name: 'Charisma', value: state.attribute_charisma },
			{ name: 'Intelligence', value: state.attribute_intelligence }
		];

		let highestAttribute = attributes[0];
		for (let i = 1; i < attributes.length; i++) {
			if (attributes[i].value > highestAttribute.value) {
				highestAttribute = attributes[i];
			}
		}

		return highestAttribute;
	})();

	const contextValue: CharacterContextType = {
		state,
		dispatch,
		attributePointsRemaining,
		ancestryPointsRemaining,
		combatMastery,
		primeModifier
	};

	return <CharacterContext.Provider value={contextValue}>{children}</CharacterContext.Provider>;
}

// Custom hook to use the character context
export function useCharacter() {
	const context = useContext(CharacterContext);
	if (context === undefined) {
		throw new Error('useCharacter must be used within a CharacterProvider');
	}
	return context;
}

// Helper function to get an attribute's modifier
export function getModifier(attributeScore: number | null | undefined): number {
	return attributeScore ?? 0;
}
````

## File: package.json
````json
{
	"name": "dc20clean",
	"version": "0.0.1",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"prepare": "npx prisma generate --no-engine",
		"format": "prettier --write .",
		"lint": "prettier --check . && eslint .",
		"test:unit": "vitest",
		"test": "npm run test:unit -- --run && npm run test:e2e",
		"test:e2e": "playwright test",
		"db:start": "docker compose up",
		"db:push": "drizzle-kit push",
		"db:migrate": "drizzle-kit migrate",
		"db:studio": "drizzle-kit studio"
	},
	"files": [
		"dist",
		"!dist/**/*.test.*",
		"!dist/**/*.spec.*"
	],
	"sideEffects": [
		"**/*.css"
	],
	"type": "module",
	"devDependencies": {
		"@eslint/compat": "^1.2.5",
		"@eslint/js": "^9.18.0",
		"@playwright/test": "^1.49.1",
		"@tailwindcss/forms": "^0.5.9",
		"@tailwindcss/typography": "^0.5.15",
		"@tailwindcss/vite": "^4.0.0",
		"@types/node": "^22.16.5",
		"@types/react": "^19.1.8",
		"@types/react-dom": "^19.1.6",
		"@vitejs/plugin-react": "^4.7.0",
		"@vitest/browser": "^3.2.3",
		"drizzle-kit": "^0.30.2",
		"eslint": "^9.18.0",
		"eslint-config-prettier": "^10.0.1",
		"eslint-plugin-react": "^7.37.5",
		"eslint-plugin-react-hooks": "^5.2.0",
		"globals": "^16.0.0",
		"playwright": "^1.53.0",
		"prettier": "^3.4.2",
		"publint": "^0.3.2",
		"tailwindcss": "^4.0.0",
		"typescript": "^5.0.0",
		"typescript-eslint": "^8.20.0",
		"vite": "^6.2.6",
		"vite-plugin-devtools-json": "^0.2.0"
	},
	"keywords": [
		"react"
	],
	"dependencies": {
		"@node-rs/argon2": "^2.0.2",
		"@oslojs/crypto": "^1.0.1",
		"@oslojs/encoding": "^1.1.0",
		"@prisma/client": "^6.10.1",
		"@prisma/extension-accelerate": "^2.0.1",
		"@types/styled-components": "^5.1.34",
		"drizzle-orm": "^0.40.0",
		"fantasy-name-generator": "^2.0.0",
		"postgres": "^3.4.5",
		"prettier-plugin-tailwindcss": "^0.6.14",
		"prisma": "^6.10.1",
		"react": "^19.1.0",
		"react-dom": "^19.1.0",
		"styled-components": "^6.1.19",
		"ts-node": "^10.9.2",
		"zod": "^4.0.5"
	}
}
````

## File: src/routes/character-creation/CharacterCreation.tsx
````typescript
import React, { useState } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import AncestrySelector from './AncestrySelector.tsx';
import SelectedAncestries from './SelectedAncestries.tsx';
import AncestryPointsCounter from './AncestryPointsCounter.tsx';
import Attributes from './Attributes.tsx';
import ClassSelector from './ClassSelector.tsx';
import ClassFeatures from './ClassFeatures.tsx';
import Background from './Background.tsx';
import CharacterName from './CharacterName.tsx';
import Snackbar from '../../components/Snackbar.tsx';
import { completeCharacter } from '../../lib/services/characterCompletion';
import {
	StyledContainer,
	StyledTitle,
	StyledStepIndicator,
	StyledStepsContainer,
	StyledStep,
	StyledStepNumber,
	StyledStepLabel,
	StyledNavigationButtons,
	StyledButton
} from './styles/CharacterCreation.styles';

const CharacterCreation: React.FC<{ onNavigateToLoad: () => void }> = ({ onNavigateToLoad }) => {
	const { state, dispatch, attributePointsRemaining } = useCharacter();
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [showSnackbar, setShowSnackbar] = useState(false);

	const steps = [
		{ number: 1, label: 'Class & Features' },
		{ number: 2, label: 'Attributes' },
		{ number: 3, label: 'Background' },
		{ number: 4, label: 'Ancestry' },
		{ number: 5, label: 'Character Name' }
	];

	const handleStepClick = (step: number) => {
		dispatch({ type: 'SET_STEP', step });
	};

	const handleNext = async () => {
		if (state.currentStep === 5 && areAllStepsCompleted()) {
			// Character is complete, trigger completion using the service
			await completeCharacter(state, {
				onShowSnackbar: (message: string) => {
					setSnackbarMessage(message);
					setShowSnackbar(true);
				},
				onNavigateToLoad: onNavigateToLoad
			});
			return;
		} else {
			dispatch({ type: 'NEXT_STEP' });
		}
	};

	const handlePrevious = () => {
		dispatch({ type: 'PREVIOUS_STEP' });
	};

	const isStepCompleted = (step: number) => {
		switch (step) {
			case 1:
				return state.classId !== null;
			case 2:
				return attributePointsRemaining === 0;
			case 3: {
				// Background: check if meaningful selections have been made
				// Since conversions are local state and not persisted, we check for reasonable selections

				// Parse current selections
				let hasSkillSelections = false;
				let hasTradeSelections = false;
				let hasLanguageSelections = false;
				let skillPointsUsed = 0;
				let tradePointsUsed = 0;
				let languagePointsUsed = 0;

				try {
					if (state.skillsJson && state.skillsJson !== '{}') {
						const skills = JSON.parse(state.skillsJson) as Record<string, number>;
						skillPointsUsed = Object.values(skills).reduce(
							(sum: number, level: number) => sum + level,
							0
						);
						hasSkillSelections = skillPointsUsed > 0;
					}
				} catch (e) {
					// Ignore parsing errors
				}

				try {
					if (state.tradesJson && state.tradesJson !== '{}') {
						const trades = JSON.parse(state.tradesJson) as Record<string, number>;
						tradePointsUsed = Object.values(trades).reduce(
							(sum: number, level: number) => sum + level,
							0
						);
						hasTradeSelections = tradePointsUsed > 0;
					}
				} catch (e) {
					// Ignore parsing errors
				}

				try {
					if (state.languagesJson && state.languagesJson !== '{}') {
						const languages = JSON.parse(state.languagesJson) as Record<string, { fluency?: string }>;
						languagePointsUsed = Object.entries(languages).reduce(
							(sum, [langId, data]: [string, { fluency?: string }]) => {
								if (langId === 'common') return sum; // Common is free
								return (
									sum +
									(data.fluency === 'basic'
										? 1
										: data.fluency === 'advanced'
											? 2
											: data.fluency === 'fluent'
												? 3
												: 0)
								);
							},
							0
						);
						hasLanguageSelections = languagePointsUsed > 0;
					}
				} catch (e) {
					// Ignore parsing errors
				}

				// Calculate minimum expected points (without conversions)
				const intelligenceModifier = state.attribute_intelligence;
				const minSkillPoints = Math.max(1, 5 + intelligenceModifier); // At least 1, even with negative Int
				const minTradePoints = 3; // Base trade points
				const minLanguagePoints = 2; // Base language points

				// Step is complete if:
				// 1. User has made skill selections (at least some points spent)
				// 2. User has made selections in trades OR languages (or both)
				// 3. Total points used suggests they've engaged with the system meaningfully

				const totalMinPoints = minSkillPoints + minTradePoints + minLanguagePoints;
				const totalPointsUsed = skillPointsUsed + tradePointsUsed + languagePointsUsed;

				return (
					hasSkillSelections &&
					(hasTradeSelections || hasLanguageSelections) &&
					totalPointsUsed >= Math.floor(totalMinPoints * 0.6)
				); // Used at least 60% of base allocation
			}
			case 4:
				return state.ancestry1Id !== null;
			case 5:
				return (
					state.finalName !== null &&
					state.finalName !== '' &&
					state.finalPlayerName !== null &&
					state.finalPlayerName !== ''
				);
			default:
				return false;
		}
	};

	const areAllStepsCompleted = () => {
		return steps.every((step) => isStepCompleted(step.number));
	};

	const renderCurrentStep = () => {
		switch (state.currentStep) {
			case 1:
				return (
					<>
						<ClassSelector />
						<ClassFeatures />
					</>
				);
			case 2:
				return <Attributes />;
			case 3:
				return <Background />;
			case 4:
				return (
					<>
						<AncestrySelector />
						<AncestryPointsCounter />
						<SelectedAncestries />
					</>
				);
			case 5:
				return <CharacterName />;
			default:
				return null;
		}
	};

	return (
		<div>
			<StyledTitle>Character Creation</StyledTitle>

			<StyledStepIndicator>
				<StyledNavigationButtons>
					<StyledButton
						$variant="secondary"
						onClick={handlePrevious}
						disabled={state.currentStep === 1}
					>
						← Previous
					</StyledButton>
				</StyledNavigationButtons>

				<StyledStepsContainer>
					{steps.map((step) => (
						<StyledStep
							key={step.number}
							$active={state.currentStep === step.number}
							$completed={isStepCompleted(step.number)}
							onClick={() => handleStepClick(step.number)}
						>
							<StyledStepNumber
								$active={state.currentStep === step.number}
								$completed={isStepCompleted(step.number)}
							>
								{isStepCompleted(step.number) ? '✓' : step.number}
							</StyledStepNumber>
							<StyledStepLabel
								$active={state.currentStep === step.number}
								$completed={isStepCompleted(step.number)}
							>
								{step.label}
							</StyledStepLabel>
						</StyledStep>
					))}
				</StyledStepsContainer>

				<StyledNavigationButtons>
					<StyledButton
						$variant="primary"
						onClick={handleNext}
						disabled={state.currentStep === 5 && !areAllStepsCompleted()}
					>
						{state.currentStep === 5 ? 'Complete' : 'Next →'}
					</StyledButton>
				</StyledNavigationButtons>
			</StyledStepIndicator>

			<StyledContainer>{renderCurrentStep()}</StyledContainer>

			<Snackbar
				message={snackbarMessage}
				isVisible={showSnackbar}
				onClose={() => setShowSnackbar(false)}
				duration={3000}
			/>
		</div>
	);
};

export default CharacterCreation;
````

## File: src/routes/character-sheet/CharacterSheetClean.tsx
````typescript
import React, { useState, useEffect } from 'react';

// Import types
import type {
	CharacterSheetProps,
	CharacterSheetData,
	SkillData,
	TradeData,
	LanguageData,
	FeatureData,
	CurrentValues,
	AttackData,
	InventoryItemData
} from '../../types';

// Import new component modules
import LeftColumn from './components/LeftColumn';
import Currency from './components/Currency';
import Resources from './components/Resources';
import Defenses from './components/Defenses';
import Combat from './components/Combat';
import Attacks from './components/Attacks';
import Inventory from './components/Inventory';
import Features from './components/Features';
import Movement from './components/Movement';
import RightColumnResources from './components/RightColumnResources';
import DeathExhaustion from './components/DeathExhaustion';

// Import rules data
import { skillsData } from '../../lib/rulesdata/skills';
import { tradesData } from '../../lib/rulesdata/trades';
import { knowledgeData } from '../../lib/rulesdata/knowledge';
import { traitsData } from '../../lib/rulesdata/traits';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { ancestriesData } from '../../lib/rulesdata/ancestries';

// Import styled components
import {
	StyledContainer,
	StyledBackButton,
	StyledCharacterSheet,
	StyledMainGrid,
	StyledMiddleColumn,
	StyledRightColumn
} from './styles/Layout';

import { StyledHeader, StyledHeaderSection, StyledLabel, StyledValue } from './styles/Header';

import {
	StyledFeaturePopupOverlay,
	StyledFeaturePopupContent,
	StyledFeaturePopupHeader,
	StyledFeaturePopupTitle,
	StyledFeaturePopupClose,
	StyledFeaturePopupDescription,
	StyledFeaturePopupSourceInfo
} from './styles/FeaturePopup';

import { calculateDeathThreshold } from '../../lib/rulesdata/death';

// Character data service - fetches from localStorage and uses already calculated stats
const getCharacterData = async (characterId: string): Promise<CharacterSheetData> => {
	console.log('Loading character data for ID:', characterId);

	// Get characters from localStorage
	const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');

	// Find the character by ID
	const character = savedCharacters.find((char: any) => char.id === characterId);

	if (!character) {
		throw new Error(`Character with ID "${characterId}" not found in localStorage`);
	}

	// Return the character data as-is since it's already calculated, but ensure trait and feature data is included
	return {
		...character,
		selectedTraitIds: character.selectedTraitIds || character.selectedTraitsJson || '[]',
		selectedFeatureChoices: character.selectedFeatureChoices || '{}'
	};
};

// Save character current values back to localStorage
const saveCharacterData = (characterId: string, currentValues: CurrentValues) => {
	const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
	const characterIndex = savedCharacters.findIndex((char: any) => char.id === characterId);

	if (characterIndex !== -1) {
		// Update the character's current values
		savedCharacters[characterIndex] = {
			...savedCharacters[characterIndex],
			currentHP: currentValues.currentHP,
			currentSP: currentValues.currentSP,
			currentMP: currentValues.currentMP,
			currentGritPoints: currentValues.currentGritPoints,
			currentRestPoints: currentValues.currentRestPoints,
			tempHP: currentValues.tempHP,
			actionPointsUsed: currentValues.actionPointsUsed,
			exhaustionLevel: currentValues.exhaustionLevel,
			lastModified: new Date().toISOString()
		};

		localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
		console.log('Character saved to localStorage. Total characters:', savedCharacters.length);
	}
};

const CharacterSheet: React.FC<CharacterSheetProps> = ({ characterId, onBack }) => {
	const [characterData, setCharacterData] = useState<CharacterSheetData | null>(null);
	const [currentValues, setCurrentValues] = useState<CurrentValues>({
		currentHP: 0,
		currentSP: 0,
		currentMP: 0,
		currentGritPoints: 0,
		currentRestPoints: 0,
		tempHP: 0,
		actionPointsUsed: 0,
		exhaustionLevel: 0,
		// Currency
		goldPieces: 0,
		silverPieces: 0,
		copperPieces: 0,
		electrumPieces: 0,
		platinumPieces: 0
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedFeature, setSelectedFeature] = useState<FeatureData | null>(null);
	const [attacks, setAttacks] = useState<AttackData[]>([
		{
			id: '1',
			weaponId: '',
			name: '',
			attackBonus: 0,
			damage: '',
			damageType: '',
			critRange: '',
			critDamage: '',
			brutalDamage: '',
			heavyHitEffect: ''
		},
		{
			id: '2',
			weaponId: '',
			name: '',
			attackBonus: 0,
			damage: '',
			damageType: '',
			critRange: '',
			critDamage: '',
			brutalDamage: '',
			heavyHitEffect: ''
		},
		{
			id: '3',
			weaponId: '',
			name: '',
			attackBonus: 0,
			damage: '',
			damageType: '',
			critRange: '',
			critDamage: '',
			brutalDamage: '',
			heavyHitEffect: ''
		}
	]);
	const [inventory, setInventory] = useState<InventoryItemData[]>([]);

	// Load character data
	useEffect(() => {
		const loadCharacterData = async () => {
			try {
				setLoading(true);
				setError(null);

				const data = await getCharacterData(characterId);
				setCharacterData(data);

				// Initialize current values - use saved values if they exist, otherwise use max values
				const initialValues = {
					currentHP: data.currentHP !== undefined ? data.currentHP : data.finalHPMax,
					currentSP: data.currentSP !== undefined ? data.currentSP : data.finalSPMax,
					currentMP: data.currentMP !== undefined ? data.currentMP : data.finalMPMax,
					currentGritPoints:
						data.currentGritPoints !== undefined ? data.currentGritPoints : data.finalGritPoints,
					currentRestPoints:
						data.currentRestPoints !== undefined ? data.currentRestPoints : data.finalRestPoints,
					tempHP: data.tempHP || 0,
					actionPointsUsed: data.actionPointsUsed || 0,
					exhaustionLevel: data.exhaustionLevel || 0,
					// Currency - default to 0 if not saved
					goldPieces: 0,
					silverPieces: 0,
					copperPieces: 0,
					electrumPieces: 0,
					platinumPieces: 0
				};

				console.log('Character data loaded:', {
					finalSPMax: data.finalSPMax,
					currentSP: data.currentSP,
					initialSP: initialValues.currentSP
				});

				setCurrentValues(initialValues);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
			} finally {
				setLoading(false);
			}
		};

		loadCharacterData();
	}, [characterId]);

	// Resource management functions with auto-save
	const adjustResource = (resource: keyof CurrentValues, amount: number) => {
		setCurrentValues((prev) => {
			const newValue = prev[resource] + amount;
			let maxValue = 999;

			switch (resource) {
				case 'currentHP':
					// HP can go up to normal max + temp HP
					maxValue = (characterData?.finalHPMax || 0) + prev.tempHP;
					break;
				case 'currentSP':
					maxValue = characterData?.finalSPMax || 0;
					break;
				case 'currentMP':
					maxValue = characterData?.finalMPMax || 0;
					break;
				case 'currentGritPoints':
					maxValue = characterData?.finalGritPoints || 0;
					break;
				case 'currentRestPoints':
					maxValue = characterData?.finalRestPoints || 0;
					break;
				case 'actionPointsUsed':
					maxValue = 4; // Standard AP limit
					break;
				case 'exhaustionLevel':
					maxValue = 5; // Max exhaustion level
					break;
			}

			const newValues = {
				...prev,
				[resource]: Math.max(0, Math.min(newValue, maxValue))
			};

			// Special case: when reducing temp HP, cap current HP to new effective max
			if (resource === 'tempHP' && amount < 0) {
				const newEffectiveMaxHP = (characterData?.finalHPMax || 0) + newValues.tempHP;
				if (prev.currentHP > newEffectiveMaxHP) {
					newValues.currentHP = newEffectiveMaxHP;
				}
			}

			// Save to localStorage after state update
			if (characterData?.id) {
				setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
			}

			return newValues;
		});
	};

	const handleResourceInputChange = (resource: keyof CurrentValues, value: string) => {
		const numValue = parseInt(value) || 0;
		let maxValue = 999;

		switch (resource) {
			case 'currentHP':
				// HP can go up to normal max + temp HP
				maxValue = (characterData?.finalHPMax || 0) + currentValues.tempHP;
				break;
			case 'currentSP':
				maxValue = characterData?.finalSPMax || 0;
				break;
			case 'currentMP':
				maxValue = characterData?.finalMPMax || 0;
				break;
			case 'currentGritPoints':
				maxValue = characterData?.finalGritPoints || 0;
				break;
			case 'currentRestPoints':
				maxValue = characterData?.finalRestPoints || 0;
				break;
			case 'actionPointsUsed':
				maxValue = 4;
				break;
			case 'exhaustionLevel':
				maxValue = 5;
				break;
		}

		setCurrentValues((prev) => {
			const newValues = {
				...prev,
				[resource]: Math.max(0, Math.min(numValue, maxValue))
			};

			// Special case: when changing temp HP directly, cap current HP to new effective max
			if (resource === 'tempHP') {
				const newEffectiveMaxHP = (characterData?.finalHPMax || 0) + newValues.tempHP;
				if (prev.currentHP > newEffectiveMaxHP) {
					newValues.currentHP = newEffectiveMaxHP;
				}
			}

			// Save to localStorage after state update
			if (characterData?.id) {
				setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
			}

			return newValues;
		});
	};

	// Parse skills data from character - show ALL skills with their proficiency levels
	const getSkillsData = (): SkillData[] => {
		// Parse character's skill proficiencies (if any)
		let characterSkills: Record<string, number> = {};
		if (characterData?.skillsJson) {
			try {
				characterSkills = JSON.parse(characterData.skillsJson);
			} catch (error) {
				console.error('Error parsing skills JSON:', error);
			}
		}

		// Create skill data for ALL skills from rules data, merging with character's proficiencies
		return skillsData.map((skill) => ({
			id: skill.id,
			name: skill.name,
			attribute: skill.attributeAssociation,
			proficiency: characterSkills[skill.id] || 0 // Default to 0 if not found
		}));
	};

	// Parse trades data from character - show ONLY selected trades with their proficiency levels
	const getTradesData = (): TradeData[] => {
		// Parse character's trade proficiencies (if any)
		let characterTrades: Record<string, number> = {};
		if (characterData?.tradesJson) {
			try {
				characterTrades = JSON.parse(characterData.tradesJson);
			} catch (error) {
				console.error('Error parsing trades JSON:', error);
			}
		}

		// Only show trades that have been selected (proficiency > 0) from tradesData only
		return tradesData
			.filter((trade) => characterTrades[trade.id] && characterTrades[trade.id] > 0)
			.map((trade) => ({
				id: trade.id,
				name: trade.name,
				proficiency: characterTrades[trade.id] || 0
			}));
	};

	// Parse knowledge data from character - show ALL knowledge with their proficiency levels
	const getKnowledgeData = (): TradeData[] => {
		// Parse character's trade proficiencies (if any) - knowledge is stored in tradesJson
		let characterTrades: Record<string, number> = {};
		if (characterData?.tradesJson) {
			try {
				characterTrades = JSON.parse(characterData.tradesJson);
			} catch (error) {
				console.error('Error parsing trades JSON:', error);
			}
		}

		// Show ALL knowledge skills with their proficiency levels
		return knowledgeData.map((knowledge) => ({
			id: knowledge.id,
			name: knowledge.name,
			proficiency: characterTrades[knowledge.id] || 0 // Default to 0 if not found
		}));
	};

	// Parse languages data from character
	const getLanguagesData = (): LanguageData[] => {
		if (!characterData?.languagesJson) {
			return [];
		}

		try {
			const languagesFromDB = JSON.parse(characterData.languagesJson);

			return Object.entries(languagesFromDB)
				.filter(([_, data]: [string, any]) => data.fluency !== 'none')
				.map(([langId, data]: [string, any]) => ({
					id: langId,
					name: data.name || langId.charAt(0).toUpperCase() + langId.slice(1),
					fluency: data.fluency as 'limited' | 'fluent'
				}));
		} catch (error) {
			console.error('Error parsing languages JSON:', error);
			return [];
		}
	};

	// Get all features (traits and class features) for the character
	const getFeaturesData = (): FeatureData[] => {
		if (!characterData) return [];

		const features: FeatureData[] = [];

		// Get ancestry default traits
		const ancestry1 = ancestriesData.find((a) => a.name === characterData.ancestry1Name);
		if (ancestry1) {
			ancestry1.defaultTraitIds?.forEach((traitId) => {
				const trait = traitsData.find((t) => t.id === traitId);
				if (trait) {
					features.push({
						id: trait.id,
						name: trait.name,
						description: trait.description,
						source: 'ancestry',
						sourceDetail: `${ancestry1.name} (Default)`
					});
				}
			});
		}

		// Get selected ancestry traits
		if (characterData.selectedTraitIds) {
			try {
				const selectedTraitIds: string[] = JSON.parse(characterData.selectedTraitIds);
				selectedTraitIds.forEach((traitId) => {
					const trait = traitsData.find((t) => t.id === traitId);
					if (trait) {
						// Check if this trait is not already added as default
						const alreadyAdded = features.some((f) => f.id === trait.id);
						if (!alreadyAdded) {
							const sourceAncestry = ancestriesData.find(
								(a) => a.expandedTraitIds.includes(traitId) || a.defaultTraitIds?.includes(traitId)
							);
							features.push({
								id: trait.id,
								name: trait.name,
								description: trait.description,
								source: 'ancestry',
								sourceDetail: `${sourceAncestry?.name || 'Unknown'} (Selected)`
							});
						}
					}
				});
			} catch (error) {
				console.error('Error parsing selected traits JSON:', error);
			}
		}

		// Get class features
		const selectedClass = classesData.find((c) => c.name === characterData.className);
		if (selectedClass) {
			// Add level 1 features
			selectedClass.level1Features?.forEach((feature: any) => {
				features.push({
					id: feature.id,
					name: feature.name,
					description: feature.description,
					source: 'class',
					sourceDetail: `${selectedClass.name} (Lvl 1)`
				});
			});

			// Add selected feature choices
			if (characterData.selectedFeatureChoices) {
				try {
					const selectedChoices: { [key: string]: string } = JSON.parse(
						characterData.selectedFeatureChoices
					);
					selectedClass.featureChoicesLvl1?.forEach((choice: any) => {
						const selectedOptionValue = selectedChoices[choice.id];
						if (selectedOptionValue) {
							const selectedOption = choice.options?.find(
								(opt: any) => opt.value === selectedOptionValue
							);
							if (selectedOption) {
								features.push({
									id: `${choice.id}_${selectedOptionValue}`,
									name: selectedOption.label,
									description: selectedOption.description || 'Feature choice selected.',
									source: 'choice',
									sourceDetail: `${selectedClass.name} (Choice)`
								});
							}
						}
					});
				} catch (error) {
					console.error('Error parsing selected feature choices JSON:', error);
				}
			}
		}

		return features;
	};

	// Handle feature popup
	const openFeaturePopup = (feature: FeatureData) => {
		setSelectedFeature(feature);
	};

	const closeFeaturePopup = () => {
		setSelectedFeature(null);
	};

	// Currency management function
	const handleCurrencyChange = (currency: string, value: number) => {
		setCurrentValues((prev) => ({
			...prev,
			[currency]: value
		}));
	};

	// Handle exhaustion level changes
	const handleExhaustionChange = (level: number) => {
		setCurrentValues((prev) => {
			const newLevel = prev.exhaustionLevel === level ? level - 1 : level;
			const newValues = {
				...prev,
				exhaustionLevel: Math.max(0, Math.min(5, newLevel))
			};

			// Save to localStorage after state update
			if (characterData?.id) {
				setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
			}

			return newValues;
		});
	};

	// Handle death step changes
	const handleDeathStepChange = (step: number) => {
		if (!characterData) return;

		const deathThreshold = calculateDeathThreshold(
			characterData.finalPrimeModifierValue,
			characterData.finalCombatMastery
		);
		const targetHP = -step;

		// Don't allow going below death threshold
		if (targetHP < deathThreshold) {
			setCurrentValues((prev) => {
				const newValues = { ...prev, currentHP: deathThreshold };
				// Save to localStorage after state update
				if (characterData?.id) {
					setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
				}
				return newValues;
			});
		} else {
			setCurrentValues((prev) => {
				const newValues = { ...prev, currentHP: targetHP };
				// Save to localStorage after state update
				if (characterData?.id) {
					setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
				}
				return newValues;
			});
		}
	};

	// Helper function to safely calculate fill percentage
	const getFillPercentage = (current: number, max: number): number => {
		if (max === 0) return 0;
		return Math.max(0, Math.min(100, (current / max) * 100));
	};

	// Helper function for HP fill percentage (shows current HP vs total effective HP)
	const getHPFillPercentage = (currentHP: number, maxHP: number, tempHP: number): number => {
		const totalEffectiveHP = maxHP + tempHP;
		if (totalEffectiveHP === 0) return 0;
		return Math.max(0, (currentHP / totalEffectiveHP) * 100);
	};

	// Group skills by attribute like in the official sheet
	const getSkillsByAttribute = () => {
		const skills = getSkillsData();
		return {
			might: skills.filter((skill) => skill.attribute === 'might'),
			agility: skills.filter((skill) => skill.attribute === 'agility'),
			charisma: skills.filter((skill) => skill.attribute === 'charisma'),
			intelligence: skills.filter((skill) => skill.attribute === 'intelligence'),
			prime: skills.filter((skill) => skill.attribute === 'prime')
		};
	};

	// Get data from character or empty defaults if no character data
	const trades = characterData ? getTradesData() : [];
	const knowledge = characterData ? getKnowledgeData() : [];
	const languages = characterData ? getLanguagesData() : [];
	const features = characterData ? getFeaturesData() : [];
	const skillsByAttribute = characterData
		? getSkillsByAttribute()
		: { might: [], agility: [], charisma: [], intelligence: [], prime: [] };

	if (loading) {
		return (
			<StyledContainer>
				<div style={{ textAlign: 'center', padding: '4rem' }}>
					<h2>Loading character sheet...</h2>
				</div>
			</StyledContainer>
		);
	}

	if (error || !characterData) {
		return (
			<StyledContainer>
				<div style={{ textAlign: 'center', padding: '4rem' }}>
					<h2>Error loading character sheet</h2>
					<p>{error}</p>
					<StyledBackButton onClick={onBack}>← Back</StyledBackButton>
				</div>
			</StyledContainer>
		);
	}

	return (
		<StyledContainer>
			<StyledBackButton onClick={onBack}>← Back to Menu</StyledBackButton>

			<StyledCharacterSheet>
				{/* Header Section */}
				<StyledHeader>
					<StyledHeaderSection>
						<StyledLabel>Player Name</StyledLabel>
						<StyledValue>{characterData.finalPlayerName || 'Unknown'}</StyledValue>
						<StyledLabel style={{ marginTop: '0.5rem' }}>Character Name</StyledLabel>
						<StyledValue>{characterData.finalName}</StyledValue>
					</StyledHeaderSection>

					<StyledHeaderSection>
						<StyledLabel>Class & Subclass</StyledLabel>
						<StyledValue>{characterData.className}</StyledValue>
						<StyledLabel style={{ marginTop: '0.5rem' }}>Ancestry & Background</StyledLabel>
						<StyledValue>{characterData.ancestry1Name || 'Unknown'}</StyledValue>
					</StyledHeaderSection>

					<StyledHeaderSection>
						<StyledLabel>Level</StyledLabel>
						<StyledValue>{characterData.finalLevel}</StyledValue>
						<StyledLabel style={{ marginTop: '0.5rem' }}>Combat Mastery</StyledLabel>
						<StyledValue>+{characterData.finalCombatMastery}</StyledValue>
					</StyledHeaderSection>

					<div style={{ textAlign: 'center', alignSelf: 'center' }}>
						<div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>DC20</div>
					</div>
				</StyledHeader>

				{/* Main Grid - DC20 Official Layout */}
				<StyledMainGrid>
					{/* Left Column - Attributes with Skills */}
					<LeftColumn
						characterData={characterData}
						skillsByAttribute={skillsByAttribute}
						knowledge={knowledge}
						trades={trades}
						languages={languages}
					/>

					{/* Middle Column - Resources, Combat, and Core Stats */}
					<StyledMiddleColumn>
						{/* Resources Section - Circular design like official sheet */}
						<Resources
							characterData={characterData}
							currentValues={currentValues}
							onAdjustResource={adjustResource}
							onResourceInputChange={handleResourceInputChange}
							getFillPercentage={getFillPercentage}
							getHPFillPercentage={getHPFillPercentage}
						/>

						{/* Defenses - Shield-like design */}
						<Defenses characterData={characterData} />

						{/* Combat Section */}
						<Combat
							characterData={characterData}
							currentValues={currentValues}
							setCurrentValues={setCurrentValues}
						/>

						{/* Death & Exhaustion */}
						<DeathExhaustion
							characterData={characterData}
							currentValues={currentValues}
							onExhaustionChange={handleExhaustionChange}
							onDeathStepChange={handleDeathStepChange}
						/>

						{/* Attacks Section */}
						<Attacks attacks={attacks} setAttacks={setAttacks} characterData={characterData} />

						{/* Inventory */}
						<Inventory inventory={inventory} setInventory={setInventory} />
					</StyledMiddleColumn>

					{/* Right Column - Movement, Resources, Inventory, Features */}
					<StyledRightColumn>
						{/* Movement & Utility */}
						<Movement characterData={characterData} />

						{/* Resources */}
						<RightColumnResources
							characterData={characterData}
							currentValues={currentValues}
							onResourceInputChange={handleResourceInputChange}
						/>

						{/* Features */}
						<Features features={features} onFeatureClick={openFeaturePopup} />

						{/* Currency Section */}
						<Currency currentValues={currentValues} onCurrencyChange={handleCurrencyChange} />
					</StyledRightColumn>
				</StyledMainGrid>
			</StyledCharacterSheet>

			{/* Feature Popup */}
			{selectedFeature && (
				<StyledFeaturePopupOverlay onClick={closeFeaturePopup}>
					<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
						<StyledFeaturePopupHeader>
							<StyledFeaturePopupTitle>{selectedFeature.name}</StyledFeaturePopupTitle>
							<StyledFeaturePopupClose onClick={closeFeaturePopup}>×</StyledFeaturePopupClose>
						</StyledFeaturePopupHeader>
						<StyledFeaturePopupDescription>
							{selectedFeature.description}
						</StyledFeaturePopupDescription>
						{selectedFeature.sourceDetail && (
							<StyledFeaturePopupSourceInfo>
								Source: {selectedFeature.sourceDetail}
							</StyledFeaturePopupSourceInfo>
						)}
					</StyledFeaturePopupContent>
				</StyledFeaturePopupOverlay>
			)}
		</StyledContainer>
	);
};

export default CharacterSheet;
````
