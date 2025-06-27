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
.prettierignore
.prettierrc
.repomixignore
docker-compose.yml
drizzle.config.ts
e2e/demo.test.ts
eslint.config.js
package.json
playwright.config.ts
prisma/migrations/20250526210112_init/migration.sql
prisma/migrations/20250620112102_allow_next_in_stage_a/migration.sql
prisma/migrations/migration_lock.toml
prisma/schema.prisma
project_summary.md
README.md
repomix.config.json
src/app.css
src/app.d.ts
src/app.html
src/demo.spec.ts
src/hooks.server.ts
src/lib/index.ts
src/lib/rulesdata/ancestries.ts
src/lib/rulesdata/attributes.ts
src/lib/rulesdata/classes.ts
src/lib/rulesdata/languages.ts
src/lib/rulesdata/skills.ts
src/lib/rulesdata/trades.ts
src/lib/rulesdata/traits.ts
src/lib/rulesdata/types.ts
src/lib/server/auth.ts
src/lib/server/db/index.ts
src/lib/server/db/schema.ts
src/lib/stores/characterInProgressStore.ts
src/routes/+layout.svelte
src/routes/+page.svelte
src/routes/api/character/progress/_backup_merge_stages_20250621/stageA+server.ts
src/routes/api/character/progress/_backup_merge_stages_20250621/stageB+server.ts
src/routes/api/character/progress/complete/+server.ts
src/routes/demo/+page.svelte
src/routes/demo/lucia/+page.server.ts
src/routes/demo/lucia/+page.svelte
src/routes/demo/lucia/login/+page.server.ts
src/routes/demo/lucia/login/+page.svelte
src/routes/page.svelte.test.ts
svelte.config.js
tsconfig.json
vite.config.ts
vitest-setup-client.ts
```

# Files

## File: .repomixignore
````
# Add patterns to ignore here, one per line
# Example:
# *.log
# tmp/
*.pdf
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

## File: .prettierignore
````
# Package Managers
package-lock.json
pnpm-lock.yaml
yarn.lock
bun.lock
bun.lockb
````

## File: .prettierrc
````
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "none",
	"printWidth": 100,
	"plugins": ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
	"overrides": [
		{
			"files": "*.svelte",
			"options": {
				"parser": "svelte"
			}
		}
	]
}
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

## File: eslint.config.js
````javascript
import prettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
);
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

## File: src/app.css
````css
@import 'tailwindcss';
@plugin '@tailwindcss/forms';
@plugin '@tailwindcss/typography';
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

## File: src/app.html
````html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div>%sveltekit.body%</div>
	</body>
</html>
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

## File: src/hooks.server.ts
````typescript
import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

export const handle: Handle = handleAuth;
````

## File: src/lib/index.ts
````typescript
// Reexport your entry components here
````

## File: src/lib/rulesdata/ancestries.ts
````typescript
// src/lib/rulesdata/ancestries.ts

import type { IAncestry } from './types';

export const ancestriesData: IAncestry[] = [
  {
    id: 'human',
    name: 'Human',
    description: 'Humans are the most common ancestry in the world, known for their adaptability and resilience.',
    defaultTraitIds: ['human_attribute_increase', 'human_skill_expertise', 'human_resolve', 'human_undying'],
    expandedTraitIds: ['human_trade_expertise', 'human_determination', 'human_unbreakable', 'human_attribute_decrease'],
  },
  {
    id: 'elf',
    name: 'Elf',
    description: 'Elves are graceful and long-lived beings with a deep connection to nature.',
    defaultTraitIds: ['elf_elven_will', 'elf_nimble', 'elf_agile_explorer', 'elf_discerning_sight'],
    expandedTraitIds: ['elf_quick_reactions', 'elf_peerless_sight', 'elf_climb_speed', 'elf_speed_increase', 'elf_trade_expertise_elf', 'elf_plant_knowledge', 'elf_brittle', 'elf_frail', 'elf_might_decrease'],
  },
  {
    id: 'dwarf',
    name: 'Dwarf',
    description: 'Dwarves are a stout and resilient folk, known for their craftsmanship and deep connection to the earth.',
    defaultTraitIds: ['dwarf_tough', 'dwarf_toxic_fortitude', 'dwarf_physically_sturdy', 'dwarf_iron_stomach'],
    expandedTraitIds: ['dwarf_thick_skinned', 'dwarf_natural_combatant', 'dwarf_stone_blood', 'dwarf_minor_tremorsense', 'dwarf_stubborn', 'dwarf_trade_expertise', 'dwarf_earthen_knowledge', 'dwarf_charisma_attribute_decrease', 'dwarf_short_legged'],
  },
  {
    id: 'halfling',
    name: 'Halfling',
    description: 'Halflings are a small and nimble folk, known for their bravery and love of comfort.',
    defaultTraitIds: ['halfling_small_sized', 'halfling_elusive', 'halfling_bravery', 'halfling_endurance', 'halfling_deft_footwork', 'halfling_beast_whisperer'],
    expandedTraitIds: ['halfling_beast_insight', 'halfling_burst_of_bravery', 'halfling_trade_expertise', 'halfling_critter_knowledge', 'halfling_brittle', 'halfling_intelligence_attribute_decrease', 'halfling_short_legged'],
  },
  {
    id: 'gnome',
    name: 'Gnome',
    description: 'Gnomes are small and energetic folk, known for their inventiveness and connection to the feywild.',
    defaultTraitIds: ['gnome_small_sized', 'gnome_escape_artist', 'gnome_magnified_vision', 'gnome_mental_clarity', 'gnome_strong_minded', 'gnome_predict_weather'],
    expandedTraitIds: ['gnome_mana_increase', 'gnome_trapper', 'gnome_lightning_insulation', 'gnome_trade_expertise', 'gnome_storm_knowledge', 'gnome_agility_attribute_decrease', 'gnome_short_legged'],
  },
  {
    id: 'orc',
    name: 'Orc',
    description: 'Orcs are a strong and fierce folk, known for their martial prowess and intimidating presence.',
    defaultTraitIds: ['orc_cursed_mind', 'orc_rush', 'orc_brutal_strikes', 'orc_tough', 'orc_orcish_resolve', 'orc_already_cursed'],
    expandedTraitIds: ['orc_intimidating_shout', 'orc_dash', 'orc_finishing_blow', 'orc_imposing_presence', 'orc_provocation', 'orc_reckless'],
  },
  {
    id: 'dragonborn',
    name: 'Dragonborn',
    description: 'Dragonborn are a proud and powerful folk, who trace their lineage back to dragons.',
    defaultTraitIds: ['dragonborn_darkvision', 'dragonborn_draconic_resistance', 'dragonborn_draconic_breath_weapon', 'dragonborn_reptilian_superiority'],
    expandedTraitIds: ['dragonborn_mana_increase', 'dragonborn_thick_skinned', 'dragonborn_second_breath', 'dragonborn_concussive_breath', 'dragonborn_draconic_affinity', 'dragonborn_dying_breath', 'dragonborn_draconic_ward', 'dragonborn_draconic_protection', 'dragonborn_glide_speed', 'dragonborn_guardians_bond'],
    origin: { // Draconic Origin
      prompt: 'Choose a Draconic Origin:',
      options: ['cold', 'corrosion', 'fire', 'lightning', 'poison', 'sonic', 'psychic', 'radiant', 'umbral'],
    },
  },
  {
    id: 'giantborn',
    name: 'Giantborn',
    description: 'Giantborn are a large and powerful folk, who trace their lineage back to giants.',
    defaultTraitIds: ['giantborn_tough', 'giantborn_powerful_build', 'giantborn_unstoppable', 'giantborn_giants_resolve', 'giantborn_unyielding_movement'],
    expandedTraitIds: ['giantborn_giants_fortitude', 'giantborn_strong_body', 'giantborn_mighty_hurl', 'giantborn_titanic_toss', 'giantborn_mighty_leap', 'giantborn_brute', 'giantborn_heavy_riser', 'giantborn_clumsiness', 'giantborn_intelligence_attribute_decrease'],
  },
  {
    id: 'angelborn',
    name: 'Angelborn',
    description: 'Angelborn are a celestial folk, known for their grace and divine connection.',
    defaultTraitIds: ['angelborn_radiant_resistance', 'angelborn_celestial_magic', 'angelborn_healing_touch', 'angelborn_divine_glow'],
    expandedTraitIds: ['angelborn_mana_increase', 'angelborn_celestial_clarity', 'angelborn_angelic_insight', 'angelborn_gift_of_the_angels', 'angelborn_blinding_light', 'angelborn_glide_speed', 'angelborn_pacifist', 'angelborn_umbral_weakness'],
    variantTraits: [ // Fallen Angelborn
      { id: 'angelborn_fallen', name: 'Fallen', cost: 0, description: 'You can now spend your Ancestry Points on Fiendborn Traits.' }
    ],
  },
  {
    id: 'fiendborn',
    name: 'Fiendborn',
    description: 'Fiendborn are a fiendish folk, known for their cunning and infernal connection.',
    defaultTraitIds: ['fiendborn_fiendish_resistance', 'fiendborn_fiendish_magic', 'fiendborn_darkvision', 'fiendborn_lights_bane'],
    expandedTraitIds: ['fiendborn_mana_increase', 'fiendborn_silver_tongued', 'fiendborn_fiendish_aura', 'fiendborn_superior_darkvision', 'fiendborn_infernal_bravery', 'fiendborn_intimidator', 'fiendborn_charming_gaze', 'fiendborn_glide_speed', 'fiendborn_radiant_weakness', 'fiendborn_divine_dampening'],
    origin: { // Fiendish Origin
      prompt: 'Choose a Fiendish Origin:',
      options: ['cold', 'corrosion', 'fire', 'poison', 'umbral'],
    },
    variantTraits: [ // Fiendborn Redemption
      { id: 'fiendborn_redeemed', name: 'Redeemed', cost: 0, description: 'You can now spend your Ancestry Points on Angelborn Traits.' }
    ],
  },
  {
    id: 'beastborn',
    name: 'Beastborn',
    description: 'Beastborn are a diverse folk, who take on the characteristics of various beasts.',
    defaultTraitIds: [], // Beastborn has no Default Traits
    expandedTraitIds: [ // Listed under Beast Traits sections in PDF
      // Senses
      'beastborn_darkvision', 'beastborn_echolocation', 'beastborn_keen_sense', 'beastborn_sunlight_sensitivity',
      // Mobility
      'beastborn_quick_reactions', 'beastborn_climb_speed', 'beastborn_spider_climb', 'beastborn_web_walk', 'beastborn_water_breathing', 'beastborn_swim_speed', 'beastborn_speed_increase', 'beastborn_sprint', 'beastborn_charge', 'beastborn_burrow_speed',
      // Jumping
      'beastborn_jumper', 'beastborn_strong_jumper',
      // Flying
      'beastborn_glide_speed', 'beastborn_limited_flight', 'beastborn_full_flight', 'beastborn_flyby', 'beastborn_stealth_feathers', 'beastborn_winged_arms',
      // Body
      'beastborn_tough', 'beastborn_thick_skinned', 'beastborn_powerful_build', 'beastborn_long_limbed', 'beastborn_secondary_arms', 'beastborn_prehensile_appendage', 'beastborn_hazardous_hide', 'beastborn_natural_armor', 'beastborn_hard_shell', 'beastborn_shell_retreat', 'beastborn_camouflage', 'beastborn_prowler', 'beastborn_cold_resistance', 'beastborn_fire_resistance', 'beastborn_short_legged', 'beastborn_small_sized', 'beastborn_reckless',
      // Natural Weapons
      'beastborn_natural_weapon', 'beastborn_extended_natural_weapon', 'beastborn_natural_projectile', 'beastborn_natural_weapon_passive', 'beastborn_rend', 'beastborn_retractable_natural_weapon', 'beastborn_venomous_natural_weapon',
      // Miscellaneous
      'beastborn_fast_reflexes', 'beastborn_mimicry', 'beastborn_intimidating_shout', 'beastborn_toxic_fortitude', 'beastborn_shoot_webs',
    ],
    origin: { // Beastborn Origin
      prompt: 'Choose a type of Beast you are modeled after:',
      options: [], // Options are open-ended, based on GM/player choice
    },
  },
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
  derivedStats: [ // Examples, verify/adjust based on actual rules for each attribute
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
  derivedStats: [
    { statName: 'Grit Points', formula: '2 + Charisma' }
  ]
},
{
  id: 'intelligence',
  name: 'Intelligence',
  description: 'Your Reasoning, Understanding, and Wisdom.',
  derivedStats: [
    { statName: 'Base Skill Points', formula: '5 + Intelligence' }
  ]
}
];
````

## File: src/lib/rulesdata/classes.ts
````typescript
import type { IClassDefinition } from './types.js';

// IClassDefinition for Barbarian:
export const barbarianClass: IClassDefinition = {
  id: 'barbarian',
  name: 'Barbarian',
  description: 'Barbarians charge into battle with reckless abandon, ignoring their own safety as they brush off damage and deal even more in return. They trade defense for more offense and let out blood-crazed battle cries.',
  baseHpContribution: 9, // From class table p.118
  startingSP: 1, // From class table p.118
  startingMP: 0,
  skillPointGrantLvl1: 0,
  tradePointGrantLvl1: 0,
  combatTraining: ['Weapons', 'All Armor', 'All Shields'], // From p.118 "Barbarian Martial Path"
  maneuversKnownLvl1: 'All Attack', // From p.118 "Maneuvers Known" - "All Attack"
  techniquesKnownLvl1: 0, // From p.118 "Techniques Known" - 0
  saveDCBase: 8, // From p.118 "Save DC" - 8
  deathThresholdBase: 10, // From p.118 "Death Threshold" - 10
  moveSpeedBase: 30, // From p.118 "Move Speed" - 30
  restPointsBase: 4, // From p.118 "Rest Points" - 4
  gritPointsBase: 2, // From p.118 "Grit Points" - 2
  initiativeBonusBase: 0, // From p.118 "Initiative Bonus" - 0
  cantripsKnownLvl1: 0,
  spellsKnownLvl1: 0,
  level1Features: [
    {
      id: 'barbarian_rage',
      name: 'Rage',
      level: 1,
      description: 'During Combat, you can spend 1 AP and 1 SP to enter a Rage for 1 minute. For the duration, you’re subjected to the following effects: You deal +1 damage on Melee Martial Attacks. You have ADV on Might Saves. Your PD decreases by 5. You gain Resistance (Half) to Elemental and Physical damage. Ending Early: Your Rage ends early if you fall Unconscious, die, or you choose to end it for free on your turn.',
      effects: [
          { type: 'GRANT_ABILITY', value: 'Rage_Mechanics_Bundle' } // Complex ability
      ]
    },
    {
      id: 'barbarian_berserker',
      name: 'Berserker',
      level: 1,
      description: 'Your primal savagery grants you the following benefits: Charge: When you make a Melee Martial Attack on your turn, you can move up to 2 Spaces immediately before making the Attack. Berserker Defense: While you aren’t wearing Armor you gain +2 AD. Fast Movement: You gain +1 Speed while not wearing Armor. Mighty Leap: You can use your Might instead of Agility to determine your Jump Distance and the damage you take from Falling.',
      effects: [
        { type: 'GRANT_ABILITY', subFeature: 'Charge', descriptionOverride: 'Move 2 Spaces before Melee Martial Attack.' },
        { type: 'GRANT_PASSIVE', subFeature: 'Berserker_Defense', descriptionOverride: '+2 AD when not wearing Armor.' },
        { type: 'GRANT_PASSIVE', subFeature: 'Fast_Movement', descriptionOverride: '+1 Speed when not wearing Armor.' },
        { type: 'GRANT_PASSIVE', subFeature: 'Mighty_Leap', descriptionOverride: 'Use Might for Jump Distance & Falling Damage calc.' }
      ]
    },
    {
      id: 'barbarian_shattering_force',
      name: 'Shattering Force (Flavor)',
      level: 1,
      description: 'When you Hit a structure or mundane object with a Melee Attack, it’s considered a Critical Hit.',
      effects: [{ type: 'FLAVOR_MECHANIC_NOTE', value: 'Melee attacks vs objects/structures are Critical Hits.' }]
    }
  ],
  featureChoicesLvl1: [] // No explicit user choices for L1 features for Barbarian
};

// IClassDefinition for Sorcerer:
export const sorcererClass: IClassDefinition = {
  id: 'sorcerer',
  name: 'Sorcerer',
  description: 'Sorcerers tap into the raw magic in their own bodies as a conduit to harness, manipulate, and sculpt magic with wild resolve. They can overload themselves and even cast Spells without Mana, pushing the limits of magic and their own bodies.',
  baseHpContribution: 8, // From class table p.149 Lvl 1 HP
  startingSP: 0,
  startingMP: 6, // From class table p.149 Lvl 1 MP
  skillPointGrantLvl1: 0, // From class table p.149
  tradePointGrantLvl1: 0, // From class table p.149
  combatTraining: ['Light Armor'], // From p.149 "Sorcerer Spellcasting Path"
  maneuversKnownLvl1: 0, // From class table p.149
  techniquesKnownLvl1: 0, // From class table p.149
  cantripsKnownLvl1: 2, // From class table p.149
  spellsKnownLvl1: 3,   // From class table p.149
  saveDCBase: 8, // From p.149 "Save DC" - 8
  deathThresholdBase: 10, // From p.149 "Death Threshold" - 10
  moveSpeedBase: 30, // From p.149 "Move Speed" - 30
  restPointsBase: 4, // From p.149 "Rest Points" - 4
  gritPointsBase: 2, // From p.149 "Grit Points" - 2
  initiativeBonusBase: 0, // From p.149 "Initiative Bonus" - 0
  level1Features: [
    {
      id: 'sorcerer_innate_power',
      name: 'Innate Power',
      level: 1,
      description: 'Choose a Sorcerous Origin that grants you a benefit: Intuitive Magic, Resilient Magic, or Unstable Magic. Additionally, you gain the following benefits: Your Maximum MP increases by 1. Once per Long Rest, you can use a 1 MP Spell Enhancement without spending any MP (up to your Mana Spend Limit). You regain the ability to use this benefit when you roll for Initiative.',
      effects: [
          { type: 'MODIFY_MP_MAX', value: 1 },
          { type: 'GRANT_ABILITY', value: 'Free_1MP_Spell_Enhancement_Once_Per_Long_Rest' }
      ]
    },
    {
      id: 'sorcerer_overload_magic',
      name: 'Overload Magic',
      level: 1,
      description: 'You can spend 2 AP in Combat to channel raw magical energy for 1 minute, or until you become Incapacitated, die, or choose to end it early at any time for free. For the duration, your magic is overloaded and you’re subjected to the following effects: You gain +5 to all Spell Checks you make. You must immediately make an Attribute Save (your choice) against your Save DC upon using this Feature, and again at the start of each of your turns. Failure: You gain Exhaustion. You lose any Exhaustion gained in this way when you complete a Short Rest.',
      effects: [{ type: 'GRANT_ABILITY', value: 'Overload_Magic_Mechanics_Bundle' }]
    },
    {
      id: 'sorcerer_sorcery_flavor',
      name: 'Sorcery (Flavor)',
      level: 1,
      description: 'You learn the Sorcery Spell.',
      effects: [{ type: 'GRANT_SPELL_KNOWN', value: 'sorcery_cantrip_id' }]
    }
  ],
  featureChoicesLvl1: [
    {
      id: 'sorcerous_origin_choice', // Key for storing choice
      prompt: 'Choose your Sorcerous Origin (DC20 p.150):',
      type: 'select_one',
      options: [
        { value: 'intuitive_magic', label: 'Intuitive Magic', description: 'You learn an additional Spell and Cantrip from your Sorcerer Spell List.', effectsOnChoice: [{ type: 'GRANT_BONUS_SPELL_KNOWN' }, { type: 'GRANT_BONUS_CANTRIP_KNOWN'}] },
        { value: 'resilient_magic', label: 'Resilient Magic', description: 'You gain Dazed Resistance.', effectsOnChoice: [{ type: 'GRANT_CONDITION_RESISTANCE', target: 'Dazed'}] },
        { value: 'unstable_magic', label: 'Unstable Magic', description: 'When you Critically Succeed or Fail on a Spell Check, roll on the Wild Magic Table...', effectsOnChoice: [{ type: 'ENABLE_WILD_MAGIC_TABLE_ON_CRIT_SPELL_CHECK'}] }
      ]
    },
    {
      id: 'sorcerer_spell_list_choice', // Key for storing choice
      prompt: 'Choose Your Sorcerer Spell List (DC20 p.149):',
      type: 'select_one',
      options: [
        { value: 'arcane', label: 'Arcane Spell List' },
        { value: 'divine', label: 'Divine Spell List' },
        { value: 'primal', label: 'Primal Spell List' }
      ]
    }
  ]
};

// IClassDefinition for Bard:
export const bardClass: IClassDefinition = {
  id: 'bard',
  name: 'Bard',
  description: 'Bards utilize artistic expression through various forms to connect with the emotions and heart of magic. This includes a wide range of mediums such as musical instruments, singing, dancing, drawing, painting, sculpting, poetry, storytelling, inspirational speech, and more. They are great at bringing the best out in those around them through both helping and performing, showcasing high proficiency across multiple disciplines. Bards are remarkably flexible and adaptable spellcasters, capable of tapping into a wide array of magical abilities with the appropriate artistic expression.',
  baseHpContribution: 8, // From class table p.121
  startingSP: 0, // From class table p.121
  startingMP: 6, // From class table p.121
  skillPointGrantLvl1: 2, // From class table p.121
  tradePointGrantLvl1: 3, // From class table p.121
  combatTraining: ['Light Armor', 'Light Shields'], // From p.121 "Bard Spellcasting Path"
  maneuversKnownLvl1: 0, // From class table p.121
  techniquesKnownLvl1: 0, // From class table p.121
  saveDCBase: 8, // General for Spellcasters
  deathThresholdBase: 10, // General
  moveSpeedBase: 30, // General
  restPointsBase: 4, // General
  gritPointsBase: 2, // General
  initiativeBonusBase: 0, // General
  cantripsKnownLvl1: 2, // From class table p.121
  spellsKnownLvl1: 3,   // From class table p.121
  level1Features: [
    {
      id: 'bard_font_of_inspiration',
      name: 'Font of Inspiration',
      level: 1,
      description: 'You are an ever present source of aid for your allies. You gain the following benefits: Ranged Help Attack: The range of your Help Action when aiding an Attack increases to 10 Spaces. Help Reaction: When a creature you can see makes a Check, you can take the Help Action as a Reaction to aid them with their Check, provided you’re within range to do so.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'bard_remarkable_repertoire',
      name: 'Remarkable Repertoire',
      level: 1,
      description: 'You’ve picked up a few tricks along your travels, granting you the following benefits: Jack of All Trades: You gain 2 Skill Points. Magical Secrets: You learn any 2 Spells of your choice from any Spell List. Magical Expression: You learn to express your art in a unique manner, granting you the ability to alter how you cast Spells. Choose the manner of your expression: Visual or Auditory.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'bard_crowd_pleaser',
      name: 'Crowd Pleaser (Flavor Feature)',
      level: 1,
      description: 'When you spend at least 5 minutes performing an Artistry Trade for one or more people who are actively watching or listening to your performance, you can make an Artistry Trade Check Contested by the targets’ Charisma Save. Success: You gain ADV on Charisma Checks against the target for 1 hour or until you become hostile. Creatures have ADV on the Save if they’re considered hostile toward you.',
      effects: [] // Flavor/narrative effect
    }
  ],
  featureChoicesLvl1: [] // No explicit Lvl 1 feature choices listed for Bard on p.122
};

// IClassDefinition for Champion:
export const championClass: IClassDefinition = {
  id: 'champion',
  name: 'Champion',
  description: 'Champions are weapon and armor specialists that push themselves to the limit in combat. They are able to master a wide variety of weapon types and learn their enemies as they fight them.',
  baseHpContribution: 9, // From class table p.124
  startingSP: 1, // From class table p.124
  startingMP: 0,
  skillPointGrantLvl1: 0, // From class table p.124
  tradePointGrantLvl1: 0, // From class table p.124
  combatTraining: ['Weapons', 'All Armors', 'All Shields'], // From p.124 "Champion Martial Path"
  maneuversKnownLvl1: 'All Attack', // From class table p.124
  techniquesKnownLvl1: 0, // From class table p.124
  saveDCBase: 8, // General for Martial Classes
  deathThresholdBase: 10, // General
  moveSpeedBase: 30, // General
  restPointsBase: 4, // General
  gritPointsBase: 2, // General
  initiativeBonusBase: 0, // General
  cantripsKnownLvl1: 0,
  spellsKnownLvl1: 0,
  level1Features: [
    {
      id: 'champion_master_at_arms',
      name: 'Master-at-Arms',
      level: 1,
      description: 'Your training in warfare has granted you greater offense, defense, and movement. Weapon Master: At the start of each of your turns, you can freely swap any Weapon you’re currently wielding in each hand for any other Weapon without provoking Opportunity Attacks. Maneuver Master: You learn 2 Maneuvers of your choice. Technique Master: You learn 1 Technique of your choice. Once per Combat, when you perform a Technique you can reduce its SP cost by 1.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'champion_fighting_spirit',
      name: 'Fighting Spirit',
      level: 1,
      description: 'You stand ready for Combat at any moment, granting you the following benefits: Combat Readiness: At the start of your first turn in Combat, you gain one of the following benefits: Brace: You gain the benefits of the Dodge Action and ADV on the next Save you make until the end of Combat. Advance: You gain the benefits of the Move Action and ADV on the next Physical Check you make until the end of Combat. Second Wind: Once per Combat when you start your turn Bloodied, you can regain 2 HP and 1 SP.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'champion_know_your_enemy',
      name: 'Know Your Enemy (Flavor Feature)',
      level: 1,
      description: 'You can spend 1 minute observing or interacting with a creature out of Combat (or spend 1 AP in Combat) to learn information about its physical capabilities compared to your own. Choose one of the following stats of the creature to assess: Might, Agility, PD, AD, and HP. Make a DC 10 Knowledge or Insight Check (your choice). Success: You learn if the chosen stat is higher, lower, or the same as yours.',
      effects: [] // Flavor/narrative effect
    }
  ],
  featureChoicesLvl1: [] // No explicit Lvl 1 feature choices listed for Champion on p.125
};

// IClassDefinition for Cleric:
export const clericClass: IClassDefinition = {
  id: 'cleric',
  name: 'Cleric',
  description: 'Clerics can reach out and call upon the power of a deity to aid them in battle and to support them and their allies. Clerics can range from a knowledgeable priest, to a knight in holy armor. They reach out to heir deity to empower their magic in ways mortals normally cannot.',
  baseHpContribution: 8, // From class table p.127
  startingSP: 0, // From class table p.127
  startingMP: 6, // From class table p.127
  skillPointGrantLvl1: 2, // From class table p.127
  tradePointGrantLvl1: 3, // From class table p.127
  combatTraining: ['Light Armor', 'Light Shields'], // From p.127 "Cleric Spellcasting Path"
  maneuversKnownLvl1: 0, // From class table p.127
  techniquesKnownLvl1: 0, // From class table p.127
  saveDCBase: 8, // General for Spellcasters
  deathThresholdBase: 10, // General
  moveSpeedBase: 30, // General
  restPointsBase: 4, // General
  gritPointsBase: 2, // General
  initiativeBonusBase: 0, // General
  cantripsKnownLvl1: 2, // From class table p.127
  spellsKnownLvl1: 3,   // From class table p.127
  level1Features: [
    {
      id: 'cleric_cleric_order',
      name: 'Cleric Order',
      level: 1,
      description: 'Your connection to your deity grants you the following benefits: Divine Damage: Choose an Elemental or Mystical damage type. The chosen damage type becomes your Divine Damage which is used for some Cleric Features. Divine Domain: You gain the benefits of 2 Divine Domains of your choice.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'cleric_divine_blessing',
      name: 'Divine Blessing',
      level: 1,
      description: 'You can spend 1 AP to say a prayer and petition your deity for their divine blessing. Choose 1 of the blessings listed below. Each blessing has a listed MP cost that you must spend to gain the blessing. Once during the next minute, you can apply the blessing to a Spell you cast. If your Spell targets more than 1 creature, the blessing only applies to 1 target of your choice. Unused Blessing: You can only have 1 blessing at a time. If you petition your deity for a blessing while you already have a blessing, the first blessing immediately ends without granting any benefit. If the blessing ends without granting any benefit, you regain the MP spent to gain the blessing.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'cleric_divine_omen',
      name: 'Divine Omen (Flavor Feature)',
      level: 1,
      description: 'Once per Long Rest, you can spend 10 minutes to commune with your Deity. Question: You can ask them 1 question, which must be posed in a way that could be answered with a yes or no. Response: The deity responds to the best of their knowledge and intentions in one of the following responses: Yes, No, or Unclear. Communing Again: If you commune with your deity more than once per Long Rest, you must make a DC 15 Spell Check. Failure: You receive no answer. Each time you commune again before you complete a Long Rest, the DC increases by 5.',
      effects: [] // Flavor/narrative effect
    }
  ],
  featureChoicesLvl1: [] // No explicit Lvl 1 feature choices listed for Cleric on p.128
};

// IClassDefinition for Commander:
export const commanderClass: IClassDefinition = {
  id: 'commander',
  name: 'Commander',
  description: 'Commanders are the leaders of the battlefield, inspiring their allies and leading them to victory. They can command their allies to attack or move around the battlefield, and are even able to “heal” allies by making them dig deep within themselves to push forward in combat.',
  baseHpContribution: 9, // From class table p.131
  startingSP: 1, // From class table p.131
  startingMP: 0,
  skillPointGrantLvl1: 0, // From class table p.131
  tradePointGrantLvl1: 0, // From class table p.131
  combatTraining: ['Weapons', 'All Armor', 'All Shields'], // From p.131 "Commander Martial Path"
  maneuversKnownLvl1: 'All Attack', // From class table p.131
  techniquesKnownLvl1: 0, // From class table p.131
  saveDCBase: 8, // General for Martial Classes
  deathThresholdBase: 10, // General
  moveSpeedBase: 30, // General
  restPointsBase: 4, // General
  gritPointsBase: 2, // General
  initiativeBonusBase: 0, // General
  cantripsKnownLvl1: 0,
  spellsKnownLvl1: 0,
  level1Features: [
    {
      id: 'commander_inspiring_presence',
      name: 'Inspiring Presence',
      level: 1,
      description: 'Whenever you spend SP while in Combat, you can restore an amount of HP equal to the SP spent. Choose any creatures within 5 Spaces that can see or hear you, and divide the HP among them.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'commander_commanders_call',
      name: 'Commander’s Call',
      level: 1,
      description: 'You can spend 1 AP and 1 SP to command a willing creature that you can see within 5 Spaces that can also see or hear you. The chosen creature can immediately take 1 of the following Actions of your choice as a Reaction for free. You can only use each of the following commands once on each of your turns: Attack: The creature makes an Attack with ADV. They can’t spend any resources on this Attack, such as AP, SP, or MP. Dodge: The creature takes the Full Dodge Action. Move: The creature moves up to their Speed without provoking Opportunity Attacks.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'commander_natural_leader',
      name: 'Natural Leader (Flavor Feature)',
      level: 1,
      description: 'You have ADV on Checks made to convince creatures that you are an authority figure. Additionally, you have ADV on the first Charisma Check made to interact with non-hostile members of military groups (such as soldiers, guards, etc.).',
      effects: [] // Flavor/narrative effect
    }
  ],
  featureChoicesLvl1: [] // No explicit Lvl 1 feature choices listed for Commander on p.132
};

// IClassDefinition for Druid:
export const druidClass: IClassDefinition = {
  id: 'druid',
  name: 'Druid',
  description: 'Druids tap into the power of nature, drawing upon the energies that flow through the world and creatures around them. and connect to plants, animals, and the plane itself. They can channel both the restorative and destructive forces of nature and shapeshift into wild beasts.',
  baseHpContribution: 8, // From class table p.134
  startingSP: 0, // From class table p.134
  startingMP: 6, // From class table p.134
  skillPointGrantLvl1: 2, // From class table p.134
  tradePointGrantLvl1: 3, // From class table p.134
  combatTraining: ['Light Armor'], // From p.134 "Druid Spellcasting Path"
  maneuversKnownLvl1: 0, // From class table p.134
  techniquesKnownLvl1: 0, // From class table p.134
  saveDCBase: 8, // General for Spellcasters
  deathThresholdBase: 10, // General
  moveSpeedBase: 30, // General
  restPointsBase: 4, // General
  gritPointsBase: 2, // General
  initiativeBonusBase: 0, // General
  cantripsKnownLvl1: 2, // From class table p.134
  spellsKnownLvl1: 3,   // From class table p.134
  level1Features: [
    {
      id: 'druid_druid_domain',
      name: 'Druid Domain',
      level: 1,
      description: 'You can spend 1 AP and 1 MP to create your own Druid Domain that includes small plant life, sand, shallow water, or other naturally occurring features. You create up to 8 Domain Spaces along the ground or walls. The first Domain Space must be within 1 Space of you, and each additional Domain Space must be adjacent to another Domain Space. If you use this Feature again, the first Domain Space of it must be within 1 Space of you or another Domain Space. Domain Spaces: The area is considered to be Difficult Terrain for creatures of your choice, and when you cast a Spell, you can do so as if you were standing in any Space within your Domain. Losing Domain Spaces: A Domain Space also disappears if you end your turn farther than 15 Spaces away from it or you die. Domain Actions: While you have Domain Spaces, you can take any of the following Domain Actions: Nature’s Grasp, Move Creature, Move Object, Wild Growth.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'druid_wild_form',
      name: 'Wild Form',
      level: 1,
      description: 'You can spend 1 AP and 1 MP to transform into a Wild Form of your choice. You can spend 1 AP on your turn to shift back and forth between your True Form and any Wild Forms you currently have available. Once per Long Rest, you can transform without spending MP or using MP enhancements. True Form: When you transform from your Wild Form to your True Form, your statistics return to normal. You immediately revert to your True Form when your Wild Form HP is reduced to 0 or you die. Wild Form: When you transform into a Wild Form, you gain the Wild Form’s current Wild Form HP (see Wild Form HP below), retaining any HP losses. Duration: Each Wild Form remains available until its Wild Form HP is reduced to 0 or you complete a Long Rest. Multiple Forms: You can have multiple Wild Forms available at a time which have their own Wild Form HP and Traits. Equipment: Your equipment falls to the ground or merges into your Wild Form (your choice for each item). You gain the benefits of Magic Items merged with your Wild Form, but you can’t activate them or spend their charges. Statistics: While in your Wild Form, you’re subjected to the following changes (unless otherwise stated): Stat Block: You use the Wild Form Stat Block below to determine your statistics. Identity: You maintain your personality, intellect, and ability to speak. Wild Form HP: You gain a secondary pool of Wild Form Health Points, which is 3 with a maximum of 3. Damage and healing effects target your Wild Form HP before your True Form HP, and any excess damage or healing carries over to your own HP. Natural Weapon: You have Natural Weapons (claws, horns, fangs, etc.) which you can use to make Unarmed Strikes that deal 1 Bludgeoning, Piercing, or Slashing damage (your choice when you use this Feature). Features & Talents: You don’t benefit from Talents or Class Features, except Druid Class Features, Subclass Features, and Talents. Additionally, you can’t cast Spells or perform Techniques. Traits: You don’t benefit from your Ancestry Traits, but you gain 3 Trait Points to spend on Beast Traits or Wild Form Traits of your choice. You can’t select negative Beast Traits. When you use this Feature, you can spend additional MP (up to your Mana Spend Limit) to gain 2 additional Trait Points per MP spent.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'druid_wild_speech',
      name: 'Wild Speech (Flavor Feature)',
      level: 1,
      description: 'You learn the Druidcraft Cantrip and can choose 1 of the following options: Animals: You can understand and speak with Beasts in a limited manner. You can understand the meaning of their movements, sounds, and behaviors, and they can understand the meanings of simple words, concepts, and emotions. Plants: You can understand and speak with Plants in a limited manner. You can understand the meaning of their swaying, folding, unfolding of their leaves and flowers, and they can understand the meanings of simple words, concepts, and emotions. Weather: You can reach out to nature and cast the Commune with Nature Spell as a Ritual once per Long Rest.',
      effects: [] // Flavor/narrative effect
    }
  ],
  featureChoicesLvl1: [] // No explicit Lvl 1 feature choices listed for Druid on p.135
};

// IClassDefinition for Hunter:
export const hunterClass: IClassDefinition = {
  id: 'hunter',
  name: 'Hunter',
  description: 'Hunters are master survivalists and natural explorers. They mark their targets to better track them and take them down, using their mastery over terrain, traps, and weapons to their advantage.',
  baseHpContribution: 9, // From class table p.139
  startingSP: 1, // From class table p.139
  startingMP: 0,
  skillPointGrantLvl1: 0, // From class table p.139
  tradePointGrantLvl1: 0, // From class table p.139
  combatTraining: ['Weapons', 'Light Armor', 'Light Shields'], // From p.139 "Hunter Martial Path"
  maneuversKnownLvl1: 'All Attack', // From class table p.139
  techniquesKnownLvl1: 0, // From class table p.139
  saveDCBase: 8, // General for Martial Classes
  deathThresholdBase: 10, // General
  moveSpeedBase: 30, // General
  restPointsBase: 4, // General
  gritPointsBase: 2, // General
  initiativeBonusBase: 0, // General
  cantripsKnownLvl1: 0,
  spellsKnownLvl1: 0,
  level1Features: [
    {
      id: 'hunter_hunters_mark',
      name: 'Hunter’s Mark',
      level: 1,
      description: 'You can spend 1 AP and 1 SP to focus on and mark a creature you can see within 15 Spaces as your quarry. Alternatively, you can mark a creature by studying its tracks for at least 1 minute. While a creature is marked, you gain the following benefits: You have ADV on Awareness and Survival Checks made to find the target. The first Martial Attack against your target on your turn has ADV and ignores PDR. When you score a Heavy or Critical Hit against the target, you automatically grant a d8 Help Die to the next Attack made against the target before the start of your next turn. The target is marked as long as it’s on the same Plane of Existence as you, and vanishes early if you complete a Long Rest, fall Unconscious, or use this Feature again to mark another creature.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'hunter_favored_terrain',
      name: 'Favored Terrain',
      level: 1,
      description: 'You are particularly familiar with two types of environments and are adept at the skills unique to the region. Choose 2 types of Favored Terrain listed below. Coast, Desert, Forest, Grassland, Jungle, Mountain, Swamp, Tundra, Subterranean, Urban. Additionally, while you’re in one of your Favored Terrains, you have ADV on Stealth and Survival Checks and can’t be Surprised.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'hunter_bestiary',
      name: 'Bestiary (Flavor Feature)',
      level: 1,
      description: 'You have developed a trove of knowledge hunting creatures which you’ve recorded in your Bestiary. Your Bestiary can take the form of a book, a memory vault within your mind, or some other representation of your choice. You have ADV on Checks made to learn or recall information about any creature recorded in your Bestiary. Starting Entries: Choose a Creature Type: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, or Undead. Your Bestiary includes prerecorded notes about various creatures of the chosen type. Making New Entries: You can spend 10 minutes of Light Activity recording information into your Bestiary about a specific creature you have slain within the last 24 hours.',
      effects: [] // Flavor/narrative effect
    }
  ],
  featureChoicesLvl1: [] // No explicit Lvl 1 feature choices listed for Hunter on p.139
};

// IClassDefinition for Monk:
export const monkClass: IClassDefinition = {
  id: 'monk',
  name: 'Monk',
  description: 'Monks are master martial artists that perfect their mind and bodies utilizing the ebb and flow of their inner energy. They use their body as a weapon and can enter into different stances that drastically change their combat abilities.',
  baseHpContribution: 9, // From class table p.143
  startingSP: 1, // From class table p.143
  startingMP: 0,
  skillPointGrantLvl1: 0, // From class table p.143
  tradePointGrantLvl1: 0, // From class table p.143
  combatTraining: ['Weapons', 'Light Armor'], // From p.143 "Monk Martial Path"
  maneuversKnownLvl1: 'All Attack', // From class table p.143
  techniquesKnownLvl1: 0, // From class table p.143
  saveDCBase: 8, // General for Martial Classes
  deathThresholdBase: 10, // General
  moveSpeedBase: 30, // General
  restPointsBase: 4, // General
  gritPointsBase: 2, // General
  initiativeBonusBase: 0, // General
  cantripsKnownLvl1: 0,
  spellsKnownLvl1: 0,
  level1Features: [
    {
      id: 'monk_monk_training',
      name: 'Monk Training',
      level: 1,
      description: 'Your martial arts training grants you greater offense, defense, and movement. Iron Palm: Your limbs are considered Natural Weapons with the Impact Property that deal 1 Bludgeoning damage. Patient Defense: While you aren’t wearing Armor you gain +2 PD. Step of the Wind: While you aren’t wearing Armor, you gain the following benefits: You gain +1 Speed and Jump Distance. You can move a number of Spaces up to your Speed along vertical surfaces and across liquids without falling during your move. You can use your Prime Modifier instead of Agility to determine your Jump Distance and the damage you take from Falling.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'monk_monk_stance',
      name: 'Monk Stance',
      level: 1,
      description: 'You learn 2 Monk Stances from the list below. Entering & Exiting: In Combat, at the start of each of your turns you can freely enter or swap into one of your Monk Stances. You can also spend 1 SP on your turn to swap to a different stance. You can end your Stance at any moment for free. You can only be in 1 Monk Stance at a time. Bear Stance, Bull Stance, Cobra Stance, Gazelle Stance, Mantis Stance, Mongoose Stance, Scorpion Stance, Turtle Stance, Wolf Stance.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'monk_meditation',
      name: 'Meditation (Flavor Feature)',
      level: 1,
      description: 'You can enter a state of meditation during a Short Rest (1 hour) or longer. Choose 1 Charisma or Intelligence Skill. When you complete the Rest, your Skill Mastery level increases by 1 (up to your Skill Mastery Cap) for the chosen Skill until you complete another Short or longer Rest. While meditating, you remain alert to danger.',
      effects: [] // Flavor/narrative effect
    }
  ],
  featureChoicesLvl1: [] // No explicit Lvl 1 feature choices listed for Monk on p.144
};

// IClassDefinition for Rogue:
export const rogueClass: IClassDefinition = {
  id: 'rogue',
  name: 'Rogue',
  description: 'Rogues are skilled, evasive, and cunning. They impose conditions onto enemies, then exploit those weaknesses to inflict even more harm.',
  baseHpContribution: 9, // From class table p.146
  startingSP: 1, // From class table p.146
  startingMP: 0,
  skillPointGrantLvl1: 0, // From class table p.146
  tradePointGrantLvl1: 0, // From class table p.146
  combatTraining: ['Weapons', 'Light Armor', 'Light Shields'], // From p.146 "Rogue Martial Path"
  maneuversKnownLvl1: 'All Attack', // From class table p.146
  techniquesKnownLvl1: 0, // From class table p.146
  saveDCBase: 8, // General for Martial Classes
  deathThresholdBase: 10, // General
  moveSpeedBase: 30, // General
  restPointsBase: 4, // General
  gritPointsBase: 2, // General
  initiativeBonusBase: 0, // General
  cantripsKnownLvl1: 0,
  spellsKnownLvl1: 0,
  level1Features: [
    {
      id: 'rogue_debilitating_strike',
      name: 'Debilitating Strike',
      level: 1,
      description: 'When you make an Attack with a Weapon, you can spend 1 SP to force the target to make a Physical Save against your Save DC. Save Failure: Until the start of your next turn, the target suffers 1 of the following effects of your choice: Deafened, Exposed, Hindered, or Slowed 2. A target can’t be affected by the same option more than once at a time.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'rogue_roguish_finesse',
      name: 'Roguish Finesse',
      level: 1,
      description: 'Cunning Action: You gain movement equal to half your Speed when you take the Disengage, Feint, or Hide Actions. You can use this movement immediately before or after you take the Action. Skill Expertise: Your Skill Mastery Limit increases by 1, up to Grandmaster (+10). A Skill can only benefit from one increase to its Mastery limit. Multi-Skilled: You gain 1 Skill Point.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'rogue_cypher_speech',
      name: 'Cypher Speech (Flavor Feature)',
      level: 1,
      description: 'You become Fluent in a Mortal Language of your choice. Additionally, you understand how to speak in code with a specific demographic of your choice (such as upper society, lower society, a faction, etc.). Your coded messages can be concealed in normal conversation and written communications. This allows you to leave simple messages such as “Safety”, “Threat”, or “Wealth”, or mark the location of a cache, a secret passageway, a safehouse, or an area of danger.',
      effects: [] // Flavor/narrative effect
    }
  ],
  featureChoicesLvl1: [] // No explicit Lvl 1 feature choices listed for Rogue on p.147
};

// IClassDefinition for Spellblade:
export const spellbladeClass: IClassDefinition = {
  id: 'spellblade',
  name: 'Spellblade',
  description: 'Spellblades combine their combat prowess with their ability to harness and channel magic into weapons. They can form a bond with a weapon to imbue it with damage, call it back to them, and more. Spellblades can learn a wide range of disciplines depending on their unique combination of martial and spellcasting prowess. They even gain the ability to cast spells through their weapons.',
  baseHpContribution: 9, // From class table p.153
  startingSP: 1, // From class table p.153
  startingMP: 3, // From class table p.153
  skillPointGrantLvl1: 0, // From class table p.153
  tradePointGrantLvl1: 0, // From class table p.153
  combatTraining: ['Weapons', 'Light Armor', 'Light Shields'], // From p.153 "Spellblade Martial Path"
  maneuversKnownLvl1: 'All Attack', // From class table p.153
  techniquesKnownLvl1: 0, // From class table p.153
  saveDCBase: 8, // General for Hybrid Classes
  deathThresholdBase: 10, // General
  moveSpeedBase: 30, // General
  restPointsBase: 4, // General
  gritPointsBase: 2, // General
  initiativeBonusBase: 0, // General
  cantripsKnownLvl1: 1, // From class table p.153
  spellsKnownLvl1: 1,   // From class table p.153
  level1Features: [
    {
      id: 'spellblade_bound_weapon',
      name: 'Bound Weapon',
      level: 1,
      description: 'During a Quick Rest, you can magically bond with 1 Weapon and choose an Elemental or Mystical damage type to become your Bound Damage type. This bond lasts until you end it for free or use this feature again. Your Bound Weapon gains the following properties: Smite, Illuminate, Recall. Ending Early: Your bond with the Weapon ends early if you use this Feature again, or you choose to end it for free.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'spellblade_spellblade_disciplines',
      name: 'Spellblade Disciplines',
      level: 1,
      description: 'You learn 2 Spellblade Disciplines from the list below. Magus, Warrior, Acolyte, Hex Warrior, Spell Breaker, Spell Warder, Blink Blade.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'spellblade_sense_magic',
      name: 'Sense Magic (Flavor Feature)',
      level: 1,
      description: 'You can spend 1 minute focusing your mind to detect the following creature types within 20 Spaces: Aberration, Celestial, Elemental, Fey, Fiend, or Undead. Make a Spell Check against each creature’s Mental Save. Check Success: You learn the target’s creature type and know its location until the end of your next turn. Check Failure: You learn nothing and can’t use this Feature against the target again until you complete a Long Rest.',
      effects: [] // Flavor/narrative effect
    }
  ],
  featureChoicesLvl1: [] // No explicit Lvl 1 feature choices listed for Spellblade on p.154
};

// IClassDefinition for Warlock:
export const warlockClass: IClassDefinition = {
  id: 'warlock',
  name: 'Warlock',
  description: 'Warlocks make a pact with a powerful entity that grants them magic. Their body and soul are a part of this contract and as such, they can tap into their own life force to enhance and amplify their magic and capabilities as well as drain the life force of other living creatures. They also choose a type of pact to be made that grants more powers.',
  baseHpContribution: 9, // From class table p.158
  startingSP: 0, // From class table p.158
  startingMP: 6, // From class table p.158
  skillPointGrantLvl1: 0, // From class table p.158
  tradePointGrantLvl1: 0, // From class table p.158
  combatTraining: ['Light Armor'], // From p.158 "Warlock Spellcasting Path"
  maneuversKnownLvl1: 0, // From class table p.158
  techniquesKnownLvl1: 0, // From class table p.158
  saveDCBase: 8, // General for Spellcasters
  deathThresholdBase: 10, // General
  moveSpeedBase: 30, // General
  restPointsBase: 4, // General
  gritPointsBase: 2, // General
  initiativeBonusBase: 0, // General
  cantripsKnownLvl1: 2, // From class table p.158
  spellsKnownLvl1: 3,   // From class table p.158
  level1Features: [
    {
      id: 'warlock_warlock_contract',
      name: 'Warlock Contract',
      level: 1,
      description: 'You have a binding agreement with your patron that allows you to make sacrifices in exchange for boons. Hasty Bargain: Once per turn when you make a Check, you can spend 1 HP to gain ADV on the Check. Desperate Bargain: Once per Combat, you can spend 1 AP to regain an amount of HP equal to your Prime Modifier. When you do, you become Exposed until the end of your next turn.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'warlock_pact_boon',
      name: 'Pact Boon',
      level: 1,
      description: 'You gain a Pact Boon from your Patron. Choose 1 of the following options: Weapon, Armor, Cantrip, or Familiar.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'warlock_beseech_patron',
      name: 'Beseech Patron (Flavor Feature)',
      level: 1,
      description: 'During a Long Rest, while sleeping or meditating, you can access an Inner Sanctum within your mind. Its appearance is influenced by your psyche and is subject to change. While inside your Inner Sanctum, you can attempt to contact your Patron. If they choose to respond, they enter your mind and you might possibly be able to see or hear them. While connected to your Patron in this way, you’re aware of your surroundings but you can’t take actions or move. Your Patron chooses when to end the connection, or you can make a Mental Save against your own Save DC to force the connection to end.',
      effects: [] // Flavor/narrative effect
    }
  ],
  featureChoicesLvl1: [] // No explicit Lvl 1 feature choices listed for Warlock on p.159
};

// IClassDefinition for Wizard:
export const wizardClass: IClassDefinition = {
  id: 'wizard',
  name: 'Wizard',
  description: 'Wizards learn to master each of the Spell Schools to control them in a structured and efficient way. They utilize sigils on the ground to enhance certain types of magic while they push spells to their limits.',
  baseHpContribution: 8, // From class table p.162
  startingSP: 0, // From class table p.162
  startingMP: 6, // From class table p.162
  skillPointGrantLvl1: 2, // From class table p.162
  tradePointGrantLvl1: 3, // From class table p.162
  combatTraining: ['Light Armor'], // From p.162 "Wizard Spellcasting Path"
  maneuversKnownLvl1: 0, // From class table p.162
  techniquesKnownLvl1: 0, // From class table p.162
  saveDCBase: 8, // General for Spellcasters
  deathThresholdBase: 10, // General
  moveSpeedBase: 30, // General
  restPointsBase: 4, // General
  gritPointsBase: 2, // General
  initiativeBonusBase: 0, // General
  cantripsKnownLvl1: 2, // From class table p.162
  spellsKnownLvl1: 3,   // From class table p.162
  level1Features: [
    {
      id: 'wizard_spell_school_initiate',
      name: 'Spell School Initiate',
      level: 1,
      description: 'You’ve completed training in a specialized School of Magic. Choose a Spell School. You gain the following benefits: School Magic: You learn 1 Arcane Cantrip and 1 Arcane Spell from this Spell School. Signature School: When you cast a Spell from the chosen School, you can reduce its MP cost by 1. Its total MP cost before the reduction still can’t exceed your Mana Spend Limit. You can use this Feature once per Long Rest, but regain the ability to use it again when you roll for Initiative.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'wizard_arcane_sigil',
      name: 'Arcane Sigil',
      level: 1,
      description: 'You can spend 1 AP and 1 MP to create a 1 Space diameter Arcane Sigil on the ground beneath you that lasts for 1 minute. When you create an Arcane Sigil choose 1 Spell School (Enchantment, Necromancy, Protection, etc.) or 1 Spell Tag (Fire, Cold, Teleportation, etc.). The Arcane Sigil radiates magic of the chosen type. Using a Sigil: While a creature is within the area of your Arcane Sigil, it has ADV on Spell Checks to cast or produce the effects of Spells with the chosen Spell School or Spell Tag. Moving a Sigil: You can spend 1 AP to teleport one of your Sigils within 10 spaces to your current space, but multiple Sigils can’t coexist in the same Space.',
      effects: [] // Complex effects, likely handled in logic
    },
    {
      id: 'wizard_ritual_caster',
      name: 'Ritual Caster (Flavor Feature)',
      level: 1,
      description: 'You learn 1 Arcane Spell with the Ritual Spell Tag each time you gain a Wizard Class Feature (including this one). You can only gain this benefit once per Level. Additionally, when you encounter an Arcane Spell with the Ritual Spell Tag in a form you can study (such as a spellbook, a spell scroll, or from an instructor), you can spend a number of hours equal to the Spell’s base MP cost to learn it. You can only cast Spells you learn with this feature as Rituals, unless you learned it from another source.',
      effects: [] // Flavor/narrative effect
    }
  ],
  featureChoicesLvl1: [] // No explicit Lvl 1 feature choices listed for Wizard on p.163
};


export const classesData: IClassDefinition[] = [
  barbarianClass,
  sorcererClass,
  bardClass,
  championClass,
  clericClass,
  commanderClass,
  druidClass,
  hunterClass,
  monkClass,
  rogueClass,
  spellbladeClass,
  warlockClass,
  wizardClass,
  // Add other classes here as they are populated
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
    description: 'Common is the most simple and universal language in the world. All Player Characters start Fluent in Common.'
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
    description: 'Draconic is a harsh, guttural language spoken by Dragons and Dragonkin. Typical Speakers: Dragons, Dragonkin.'
  },
  {
    id: 'dwarvish',
    name: 'Dwarvish',
    type: 'standard', // From DC20 p.18
    description: 'Dwarvish is a language of hard consonants and guttural sounds, spoken by Dwarves. Typical Speakers: Dwarves.'
  },
  {
    id: 'gnomish',
    name: 'Gnomish',
    type: 'standard', // From DC20 p.18
    description: 'Gnomish is a language filled with trills and clicks, spoken by Gnomes. Typical Speakers: Gnomes.'
  },
  {
    id: 'goblin',
    name: 'Goblin',
    type: 'standard', // From DC20 p.18
    description: 'Goblin is a rough and simple language spoken by Goblins, Hobgoblins, and Bugbears. Typical Speakers: Goblins, Hobgoblins, Bugbears.'
  },
  {
    id: 'halfling',
    name: 'Halfling',
    type: 'standard', // From DC20 p.18
    description: 'Halfling is a soft and gentle language spoken by Halflings. Typical Speakers: Halflings.'
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
    description: 'Undercommon is a language spoken by inhabitants of the Underdark, such as Drow. Typical Speakers: Drow, Underdark inhabitants.'
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
    description: 'Athletics covers activities that involve physical prowess, such as climbing, swimming, and jumping in difficult circumstances, or participating in a Grapple.'
  },
  {
    id: 'intimidation',
    name: 'Intimidation',
    attributeAssociation: 'might',
    description: 'Intimidation covers attempts to influence a creature’s behavior using threats, hostile actions, and physical violence.'
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
    description: 'Trickery covers non-verbal means of deceiving others, such as pickpocketing things, concealing an object on your person, or other forms of physical deception.'
  },
  {
    id: 'stealth',
    name: 'Stealth',
    attributeAssociation: 'agility',
    description: 'Stealth covers attempts to avoid being seen or heard by other creatures, such as sneaking about or hiding behind cover.'
  },
  {
    id: 'animal',
    name: 'Animal',
    attributeAssociation: 'charisma',
    description: 'Animal covers interactions such as corralling, training, calming, and gauging the intention of Beasts.'
  },
  {
    id: 'insight',
    name: 'Insight',
    attributeAssociation: 'charisma',
    description: 'Insight governs your ability to discern intentions. This could be from observing a creature’s body language, facial cues, and mannerisms. Alternatively, Insight can represent a gut feeling or intuition about a situation.'
  },
  {
    id: 'influence',
    name: 'Influence',
    attributeAssociation: 'charisma',
    description: 'Influence covers your attempts to manipulate a creature’s behavior using compelling arguments based on truth, half-truths, lies, or some combination in between.'
  },
  {
    id: 'investigation',
    name: 'Investigation',
    attributeAssociation: 'intelligence',
    description: 'Investigation covers using your senses to search for and discover things that are not readily observable. You look for clues and then make deductions on those clues to try and discern the locations of things or how they work (finding hidden objects, secret doors, or weak points in structures). It also covers the process of researching information through various texts.'
  },
  {
    id: 'medicine',
    name: 'Medicine',
    attributeAssociation: 'intelligence',
    description: 'Medicine covers activities that involve medical knowledge and application, such as treating a wounded creature, diagnosing an illness, or identifying a cure to an ailment.'
  },
  {
    id: 'survival',
    name: 'Survival',
    attributeAssociation: 'intelligence',
    description: 'Survival covers the activities required to survive in the wilderness, such as tracking quarry, foraging for food and water, and navigating through uncharted territory.'
  },
  {
    id: 'awareness',
    name: 'Awareness',
    attributeAssociation: 'prime', // Uses Prime Modifier
    description: 'Awareness governs your ability to detect the presence of other creatures or objects using your sight, hearing, smell, or other senses.'
  },
];
````

## File: src/lib/rulesdata/trades.ts
````typescript
import { ITradeData } from './types';

export const tradesData: ITradeData[] = [
  {
    id: 'alchemy',
    name: 'Alchemy',
    attributeAssociation: 'intelligence',
    description: 'Alchemy is the practice of creating something by combining or changing other things. This includes creating potions, poisons, and other alchemical substances.',
    tools: 'Alchemist’s Supplies'
  },
  {
    id: 'history',
    name: 'History',
    attributeAssociation: 'intelligence',
    description: 'History is the study of past events, ancient lore, and how civilizations have shaped the present. This includes recalling information about historical figures, events, and cultures.',
    tools: undefined // Knowledge trade
  },
  {
    id: 'arcana',
    name: 'Arcana',
    attributeAssociation: 'intelligence',
    description: 'Arcana is the study of magic, its history, theories, and the planes of existence. This includes recalling information about spells, magical creatures, and magical phenomena.',
    tools: undefined // Knowledge trade
  },
  {
    id: 'architecture',
    name: 'Architecture',
    attributeAssociation: 'intelligence',
    description: 'Architecture is the knowledge of building design, construction, and structural integrity. This includes understanding how buildings are constructed, identifying weak points, and designing structures.',
    tools: undefined // Knowledge trade
  },
  {
    id: 'blacksmithing',
    name: 'Blacksmithing',
    attributeAssociation: 'might',
    description: 'Blacksmithing is the crafting and repairing of metal objects, including weapons and armor. This includes working with forges, hammers, and other tools to shape metal.',
    tools: 'Smith’s Tools'
  },
  {
    id: 'brewing',
    name: 'Brewing',
    attributeAssociation: 'intelligence',
    description: 'Brewing is the art of creating beverages through fermentation, such as beer, wine, and spirits. This includes understanding the process of fermentation and using brewing equipment.',
    tools: 'Brewer’s Supplies'
  },
  {
    id: 'calligraphy',
    name: 'Calligraphy',
    attributeAssociation: 'agility',
    description: 'Calligraphy is the art of decorative handwriting and lettering. This includes using various pens, inks, and techniques to create visually appealing text.',
    tools: 'Calligrapher’s Supplies'
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    attributeAssociation: 'might',
    description: 'Carpentry is the crafting and repairing of wooden objects and structures. This includes working with wood, saws, hammers, and other tools to build and repair.',
    tools: 'Carpenter’s Tools'
  },
  {
    id: 'cartography',
    name: 'Cartography',
    attributeAssociation: 'intelligence',
    description: 'Cartography is the art and science of mapmaking. This includes creating maps, reading maps, and navigating using maps.',
    tools: 'Cartographer’s Tools'
  },
  {
    id: 'cobbling',
    name: 'Cobbling',
    attributeAssociation: 'agility',
    description: 'Cobbling is the crafting and repairing of footwear. This includes working with leather, thread, and tools to create and repair shoes and boots.',
    tools: 'Cobbler’s Tools'
  },
  {
    id: 'cooking',
    name: 'Cooking',
    attributeAssociation: 'intelligence',
    description: 'Cooking is the preparation of food for consumption. This includes understanding ingredients, recipes, and cooking techniques.',
    tools: 'Cook’s Utensils'
  },
  {
    id: 'deciphering',
    name: 'Deciphering',
    attributeAssociation: 'intelligence',
    description: 'Deciphering is the understanding of coded messages, ancient scripts, or hidden meanings. This includes analyzing patterns, symbols, and languages to uncover hidden information.',
    tools: undefined // Knowledge trade
  },
  {
    id: 'disguise',
    name: 'Disguise',
    attributeAssociation: 'charisma',
    description: 'Disguise is the altering of one’s appearance to resemble someone else or a different type of person. This includes using makeup, costumes, and props to change appearance.',
    tools: 'Disguise Kit'
  },
  {
    id: 'forgery',
    name: 'Forgery',
    attributeAssociation: 'agility',
    description: 'Forgery is the creating of convincing copies of documents, signatures, or objects. This includes replicating details and materials to create fakes.',
    tools: 'Forgery Kit'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    attributeAssociation: 'charisma',
    description: 'Gaming is the proficiency in various games of chance or skill. This includes understanding rules, strategies, and playing games.',
    tools: 'Gaming Set'
  },
  {
    id: 'herbalism',
    name: 'Herbalism',
    attributeAssociation: 'intelligence',
    description: 'Herbalism is the knowledge of plants, their properties, and uses. This includes identifying plants, preparing herbal remedies, and understanding plant effects.',
    tools: 'Herbalism Kit'
  },
  {
    id: 'jeweler',
    name: 'Jeweler',
    attributeAssociation: 'agility',
    description: 'Jeweler is the crafting and repairing of jewelry. This includes working with precious metals, gems, and tools to create and repair jewelry.',
    tools: 'Jeweler’s Tools'
  },
  {
    id: 'leatherworking',
    name: 'Leatherworking',
    attributeAssociation: 'agility',
    description: 'Leatherworking is the crafting and repairing of leather goods. This includes working with leather, tools, and techniques to create and repair items.',
    tools: 'Leatherworker’s Tools'
  },
  {
    id: 'linguistics',
    name: 'Linguistics',
    attributeAssociation: 'intelligence',
    description: 'Linguistics is the study of languages, their structure, and origins. This includes understanding grammar, syntax, and the history of languages.',
    tools: undefined // Knowledge trade
  },
  {
    id: 'masonry',
    name: 'Masonry',
    attributeAssociation: 'might',
    description: 'Masonry is the working with stone to build structures or objects. This includes cutting, shaping, and laying stone to create buildings and other structures.',
    tools: 'Mason’s Tools'
  },
  {
    id: 'medicine',
    name: 'Medicine',
    attributeAssociation: 'intelligence',
    description: 'Medicine is the knowledge and practice of healing injuries and treating diseases. This includes diagnosing ailments, administering treatments, and understanding medical procedures.',
    tools: 'Healer’s Kit'
  },
  {
    id: 'music',
    name: 'Music',
    attributeAssociation: 'charisma',
    description: 'Music is the performance of music using instruments or voice. This includes playing instruments, singing, and understanding musical theory.',
    tools: 'Musical Instrument'
  },
  {
    id: 'navigation',
    name: 'Navigation',
    attributeAssociation: 'intelligence',
    description: 'Navigation is the determining of one’s position and plotting a course. This includes using maps, compasses, and celestial bodies to navigate.',
    tools: 'Navigator’s Tools'
  },
  {
    id: 'painting',
    name: 'Painting',
    attributeAssociation: 'agility',
    description: 'Painting is the creating of art using paints. This includes using various paints, brushes, and techniques to create visual art.',
    tools: 'Painter’s Supplies'
  },
  {
    id: 'poisoner',
    name: 'Poisoner',
    attributeAssociation: 'intelligence',
    description: 'Poisoner is the knowledge and creation of poisons. This includes identifying poisonous substances, preparing poisons, and understanding their effects.',
    tools: 'Poisoner’s Kit'
  },
  {
    id: 'pottery',
    name: 'Pottery',
    attributeAssociation: 'agility',
    description: 'Pottery is the crafting of objects from clay. This includes shaping, firing, and glazing clay to create various objects.',
    tools: 'Potter’s Tools'
  },
  {
    id: 'religion',
    name: 'Religion',
    attributeAssociation: 'intelligence',
    description: 'Religion is the knowledge of deities, religious practices, and holy texts. This includes understanding religious beliefs, rituals, and scriptures.',
    tools: undefined // Knowledge trade
  },
  {
    id: 'sculpting',
    name: 'Sculpting',
    attributeAssociation: 'might',
    description: 'Sculpting is the creating of three-dimensional art from various materials. This includes shaping materials like stone, wood, or clay to create sculptures.',
    tools: 'Sculptor’s Tools'
  },
  {
    id: 'smithing',
    name: 'Smithing',
    attributeAssociation: 'might',
    description: 'Smithing is the general knowledge of working with metals. This includes understanding different metals, their properties, and basic metalworking techniques.',
    tools: 'Smith’s Tools' // Often overlaps with Blacksmithing, but can be broader
  },
  {
    id: 'survival',
    name: 'Survival',
    attributeAssociation: 'intelligence',
    description: 'Survival is the knowledge and skills needed to survive in the wilderness. This includes tracking, foraging, shelter building, and navigating in natural environments.',
    tools: undefined // Knowledge trade, though often associated with tools like a hunting trap or fishing tackle
  },
  {
    id: 'tailoring',
    name: 'Tailoring',
    attributeAssociation: 'agility',
    description: 'Tailoring is the crafting and repairing of clothing and textiles. This includes working with fabric, needles, and thread to create and repair garments.',
    tools: 'Weaver’s Tools' // Or Tailor's Tools, depending on specific terminology
  },
  {
    id: 'thieves',
    name: 'Thieves’',
    attributeAssociation: 'agility',
    description: 'Thieves’ is the knowledge and skills related to thievery, including lockpicking and disarming traps. This includes understanding security measures and using specialized tools.',
    tools: 'Thieves’ Tools'
  },
  {
    id: 'vehicles_land',
    name: 'Vehicles (Land)',
    attributeAssociation: 'agility',
    description: 'Vehicles (Land) is the proficiency in operating land-based vehicles. This includes riding horses, driving carts, and operating other land vehicles.',
    tools: undefined // Proficiency, not tool-based
  },
  {
    id: 'vehicles_water',
    name: 'Vehicles (Water)',
    attributeAssociation: 'agility',
    description: 'Vehicles (Water) is the proficiency in operating water-based vehicles. This includes sailing boats, piloting ships, and operating other water vehicles.',
    tools: undefined // Proficiency, not tool-based
  },
  {
    id: 'woodcarving',
    name: 'Woodcarving',
    attributeAssociation: 'agility',
    description: 'Woodcarving is the creating of art or objects from wood. This includes shaping wood using knives, chisels, and other tools.',
    tools: 'Woodcarver’s Tools'
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
    description: 'Choose an Attribute. The chosen Attribute increases by 1 (up to the Attribute Limit).',
    cost: 2,
    effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'any_attribute_choice', value: 1, userChoiceRequired: { prompt: "Choose an Attribute to increase by 1" } }]
  },
  {
    id: 'human_skill_expertise',
    name: 'Skill Expertise',
    description: 'Choose a Skill. Your Mastery Cap and Mastery Level in the chosen Skill both increase by 1. You can only benefit from 1 Feature that increases your Skill Mastery Limit at a time.',
    cost: 2,
    effects: [{ type: 'GRANT_SKILL_EXPERTISE', value: { skillId: 'any_skill_choice', capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: { prompt: "Choose a skill for Expertise" } }]
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
    description: 'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1. You can only benefit from 1 Feature that increases your Trade Mastery Limit at a time.',
    cost: 1,
    effects: [{ type: 'GRANT_TRADE_EXPERTISE', value: { tradeId: 'any_trade_choice', capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: { prompt: "Choose a Trade for Expertise" } }]
  },
  {
    id: 'human_determination',
    name: 'Human Determination',
    description: 'Once per Combat, you can give yourself ADV on an Attack Check or Spell Check while Bloodied.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_CHECK_WHILE_BLOODIED', target: 'Attack_or_Spell_Check', condition: 'bloodied' }]
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
    description: 'Choose an Attribute. You decrease the chosen Attribute by 1 (to a minimum of -2).',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'MODIFY_ATTRIBUTE', target: 'any_attribute_choice', value: -1, userChoiceRequired: { prompt: "Choose an Attribute to decrease by 1" } }]
  },

  // Elf Traits (p. 108)
  {
    id: 'elf_elven_will',
    name: 'Elven Will',
    description: 'You have ADV on Checks and Saves against being Charmed and put to Sleep.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Charmed' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Sleep_Magic' }]
  },
  {
    id: 'elf_nimble',
    name: 'Nimble',
    description: 'When you take the Dodge Action, you instead gain the benefits of the Full Dodge Action.',
    cost: 2,
    effects: [{ type: 'MODIFY_ACTION_BENEFIT', target: 'Dodge_Action', value: 'Full_Dodge_Benefit' }]
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
    description: 'You don’t have DisADV as a result of making an Attack with a Weapon at Long Range',
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
    description: 'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1. You can only benefit from 1 Feature that increases your Trade Mastery Limit at a time.',
    cost: 1,
    effects: [{ type: 'GRANT_TRADE_EXPERTISE', value: { tradeId: 'any_trade_choice', capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: { prompt: "Choose a Trade for Expertise" } }]
  },
  {
    id: 'elf_plant_knowledge',
    name: 'Plant Knowledge',
    description: 'While within forests, jungles, and swamps, you have ADV on Survival Checks. Additionally, you have ADV on Nature Checks made to recall information about plants.',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_ADV_ON_SURVIVAL_CHECKS_IN_ENVIRONMENTS', target: 'forests_jungles_swamps' }, { type: 'GRANT_ADV_ON_NATURE_CHECKS_ABOUT_PLANTS' }]
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
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Poison' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Poisoned' }]
  },
  {
    id: 'dwarf_physically_sturdy',
    name: 'Physically Sturdy',
    description: 'You have ADV on Saves against being Impaired, Deafened, or Petrified.',
    cost: 2,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Impaired' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Deafened' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Petrified' }]
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
    effects: [{ type: 'GRANT_COMBAT_TRAINING', target: 'Heavy_Armor' }, { type: 'GRANT_COMBAT_TRAINING', target: 'All_Shields' }]
  },
  {
    id: 'dwarf_stone_blood',
    name: 'Stone Blood',
    description: 'You have ADV on Saves against Bleeding. Additionally, you can spend 1 AP to end the Bleeding Condition on yourself.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Bleeding' }, { type: 'GRANT_ABILITY', value: 'End_Bleeding_Self_1AP' }]
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
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Taunted' }, { type: 'GRANT_ADV_ON_SAVE_VS_FORCED_MOVEMENT' }]
  },
  {
    id: 'dwarf_trade_expertise',
    name: 'Trade Expertise',
    description: 'Choose a Crafting or Services Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
    cost: 1,
    effects: [{ type: 'GRANT_TRADE_EXPERTISE', value: { tradeId: 'any_crafting_or_services_trade_choice', capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: { prompt: "Choose a Crafting or Services Trade for Expertise" } }]
  },
  {
    id: 'dwarf_earthen_knowledge',
    name: 'Earthen Knowledge',
    description: 'While within mountainous and subterranean environments, you have ADV on Survival Checks. Additionally, you have ADV on Nature Checks made to recall information about rocks, soil, crystals, and gems.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SURVIVAL_CHECKS_IN_ENVIRONMENTS', target: 'mountainous_and_subterranean' }, { type: 'GRANT_ADV_ON_NATURE_CHECKS_ABOUT_ROCKS_SOIL_CRYSTALS_GEMS' }]
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
    description: 'When you take the Disengage Action, you instead gain the benefits of the Full Disengage Action.',
    cost: 2,
    effects: [{ type: 'MODIFY_ACTION_BENEFIT', target: 'Disengage_Action', value: 'Full_Disengage_Action' }]
  },
  {
    id: 'halfling_bravery',
    name: 'Halfling Bravery',
    description: 'You have ADV on Saves against being Intimidated, Rattled, or Frightened',
    cost: 2,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Intimidated' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Rattled' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Frightened' }]
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
    description: 'You can move through the space of a hostile creature 1 size larger than you as if it were Difficult Terrain.',
    cost: 1,
    effects: [{ type: 'IGNORE_DIFFICULT_TERRAIN_WHEN_MOVING_THROUGH_SPACE_OF_LARGER_HOSTILE' }]
  },
  {
    id: 'halfling_beast_whisperer',
    name: 'Beast Whisperer',
    description: 'You can speak to Beasts in a limited manner. They can understand the meanings of simple words, concepts, or states of emotion. You don’t have a special ability to understand them in return.',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_LIMITED_COMMUNICATION_WITH_BEASTS' }]
  },
  {
    id: 'halfling_beast_insight',
    name: 'Beast Insight',
    description: 'You can understand Beasts in a limited manner. You can understand the meaning of their noises and behaviors, though they have no special ability to understand you in return.',
    cost: 1,
    effects: [{ type: 'GRANT_LIMITED_UNDERSTANDING_OF_BEASTS' }]
  },
  {
    id: 'halfling_burst_of_bravery',
    name: 'Burst of Bravery',
    description: 'Once per Combat, you can end the Intimidated, Rattled, or Frightened Condition on yourself for free at any time.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'End_Intimidated_Rattled_Frightened_Self_OncePerCombat' }]
  },
  {
    id: 'halfling_trade_expertise',
    name: 'Trade Expertise',
    description: 'Choose a Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
    cost: 1,
    effects: [{ type: 'GRANT_TRADE_EXPERTISE', value: { tradeId: 'any_trade_choice', capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: { prompt: "Choose a Trade for Expertise" } }]
  },
  {
    id: 'halfling_critter_knowledge',
    name: 'Critter Knowledge',
    description: 'You have ADV on Nature, Survival, and Animal Checks involving Small size creatures and smaller.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_CHECKS_INVOLVING_SMALL_CREATURES', target: 'Nature_Survival_Animal_Checks' }]
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
    description: 'You have ADV on Checks and Saves to avoid or escape being Grappled or Restrained.',
    cost: 2,
    effects: [{ type: 'GRANT_ADV_ON_CHECKS_SAVES_TO_AVOID_ESCAPE', target: 'Grappled_or_Restrained' }]
  },
  {
    id: 'gnome_magnified_vision',
    name: 'Magnified Vision',
    description: 'You have ADV on Investigation Checks made on something you’re holding or touching.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_INVESTIGATION_CHECKS_ON_HELD_TOUCHED' }]
  },
  {
    id: 'gnome_mental_clarity',
    name: 'Mental Clarity',
    description: 'You have ADV on Saves against being Dazed or Stunned.',
    cost: 2,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Dazed' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Stunned' }]
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
    description: 'You can naturally tell what the weather is going to be in the next hour in the area within 1 mile of you. You don’t have DisADV on Checks or Saves as a result of naturally occurring weather.',
    cost: 0,
    isMinor: true,
    effects: [{ type: 'GRANT_ABILITY', value: 'Predict_Weather_1Mile_1Hour' }, { type: 'IGNORE_DISADV_FROM_NATURAL_WEATHER' }]
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
    description: 'You have ADV on Investigation Checks to spot Traps and on Trickery Checks to Hide Traps.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_INVESTIGATION_CHECKS_TO_SPOT_TRAPS' }, { type: 'GRANT_ADV_ON_TRICKERY_CHECKS_TO_HIDE_TRAPS' }]
  },
  {
    id: 'gnome_lightning_insulation',
    name: 'Lightning Insulation',
    description: 'You have Lightning Resistance (Half) and can’t be struck by natural lightning.',
    cost: 2,
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Lightning' }, { type: 'IMMUNE_TO_NATURAL_LIGHTNING' }]
  },
  {
    id: 'gnome_trade_expertise',
    name: 'Trade Expertise',
    description: 'Choose a Crafting or Subterfuge Trade. Your Mastery Cap and Mastery Level in the chosen Trade both increase by 1.',
    cost: 1,
    effects: [{ type: 'GRANT_TRADE_EXPERTISE', value: { tradeId: 'any_crafting_or_subterfuge_trade_choice', capIncrease: 1, levelIncrease: 1 }, userChoiceRequired: { prompt: "Choose a Crafting or Subterfuge Trade for Expertise" } }]
  },
  {
    id: 'gnome_storm_knowledge',
    name: 'Storm Knowledge',
    description: 'While within rainy, snowy, or stormy environments, you have ADV on Survival Checks. Additionally, you have ADV on Knowledge Checks made to recall information about rain, snow, and storms.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SURVIVAL_CHECKS_IN_ENVIRONMENTS', target: 'rainy_snowy_stormy' }, { type: 'GRANT_ADV_ON_KNOWLEDGE_CHECKS_ABOUT_RAIN_SNOW_STORMS' }]
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
    description: 'Once per Combat when you willingly move toward an enemy, you can spend 1 AP to gain Temp HP equal to your Prime Modifier.',
    cost: 2,
    effects: [{ type: 'GRANT_TEMP_HP_ONCE_PER_COMBAT_WHEN_MOVE_TOWARD_ENEMY', value: 'Prime_Modifier' }]
  },
  {
    id: 'orc_brutal_strikes',
    name: 'Brutal Strikes',
    description: 'You deal +1 damage when you score a Brutal or Critical Hit with a Melee Weapon or Unarmed Strike.',
    cost: 2,
    effects: [{ type: 'MODIFY_DAMAGE_ON_HIT', target: 'Melee_Martial_Attack', value: 1, condition: 'Brutal_or_Critical_Hit' }]
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
    description: 'Once per Combat, you can spend 1 AP to let out an Intimidating Shout. All creatures within 5 Spaces that can hear you must make a Charisma Save contested by your Attack Check. Failure: A target is Hindered on the next Attack Check or Spell Attack it makes before the start of your next turn.',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Intimidating_Shout_OncePerCombat_1AP' }]
  },
  {
    id: 'orc_dash',
    name: 'Orc Dash',
    description: 'Once per Combat you can use your Minor Action to move, as long as that movement is towards an enemy.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Move_As_Minor_Action_OncePerCombat_Toward_Enemy' }]
  },
  {
    id: 'orc_finishing_blow',
    name: 'Finishing Blow',
    description: 'You deal +1 damage to creatures who are Well-Bloodied.',
    cost: 1,
    effects: [{ type: 'MODIFY_DAMAGE_ON_HIT', target: 'Martial_Attacks', value: 1, condition: 'Well_Bloodied' }]
  },
  {
    id: 'orc_imposing_presence',
    name: 'Imposing Presence',
    description: 'Once per Combat when a creature makes an Attack against you, you can force them to make a Charisma Save. Save Failure: They must choose a new target for the Attack. If there are no other targets, then the Attack is wasted.',
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
    description: 'You gain a Breath Weapon that you can use by spending 2 AP to exhale destructive power in an Area or Focused against a specific target. You can use this ability once per Long Rest, and regain the ability to use it again when you roll for Initiative.',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_OncePerLongRest_RegainOnInitiative' }]
  },
  {
    id: 'dragonborn_reptilian_superiority',
    name: 'Reptilian Superiority',
    description: 'You have ADV on Intimidation Checks against reptilian creatures of Medium Size and smaller (not including other Dragonborn).',
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
    description: 'You can now use your Draconic Breath Weapon twice per Combat. Additionally, whenever you use your Draconic Breath Weapon, you can spend 2 uses to increase the damage by 2 if its an Area, or by 4 if its Focused.',
    cost: 1,
    prerequisites: ['dragonborn_draconic_breath_weapon'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_TwicePerCombat' }, { type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_Enhanced_Damage_Spend_Uses' }]
  },
  {
    id: 'dragonborn_concussive_breath',
    name: 'Concussive Breath',
    description: 'When you use your Draconic Breath Weapon, you can force all targets to make a Physical Save. Save Failure: The target is pushed 1 Space away +1 additional Space for every 5 it fails its Save by.',
    cost: 1,
    prerequisites: ['dragonborn_draconic_breath_weapon'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_Concussive_Push' }]
  },
  {
    id: 'dragonborn_draconic_affinity',
    name: 'Draconic Affinity',
    description: 'When you take damage of the same type as your Draconic damage, your next Draconic Breath Weapon deals +1 bonus damage.',
    cost: 1,
    effects: [{ type: 'MODIFY_DAMAGE_ON_NEXT_DRACONIC_BREATH_WEAPON', value: 1, condition: 'take_same_type_damage' }]
  },
  {
    id: 'dragonborn_dying_breath',
    name: 'Dying Breath',
    description: 'Once per Combat when you enter Death’s Door, you regain a use of your Draconic Breath Weapon and can immediately use it as a Reaction for free (0 AP).',
    cost: 1,
    prerequisites: ['dragonborn_draconic_breath_weapon'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Draconic_Breath_Weapon_Reaction_On_Deaths_Door' }]
  },
  {
    id: 'dragonborn_draconic_ward',
    name: 'Draconic Ward',
    description: 'Once per Combat when you enter Death’s Door, you gain 2 Temp HP. Whenever you’re Hit by a Melee Attack while you have this Temp HP, your Attacker takes 1 Draconic damage.',
    cost: 1,
    effects: [{ type: 'GRANT_TEMP_HP_ONCE_PER_COMBAT_ON_DEATHS_DOOR', value: 2 }, { type: 'GRANT_DAMAGE_ON_MELEE_HIT_WHILE_TEMP_HP', target: 'Draconic_damage_type', value: 1 }]
  },
  {
    id: 'dragonborn_draconic_protection',
    name: 'Draconic Protection',
    description: 'Once per Combat, when an ally within 20 Spaces is on Death’s Door, you begin to surge with an ancient power. While they remain on Death’s Door their PD and AD increases by 5 until Combat ends.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Increase_PD_AD_Ally_On_Deaths_Door' }]
  },
  {
    id: 'dragonborn_glide_speed',
    name: 'Glide Speed',
    description: 'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren’t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
    cost: 2,
    effects: [{ type: 'GRANT_GLIDE_SPEED' }]
  },
  {
    id: 'dragonborn_guardians_bond',
    name: 'Guardian’s Bond',
    description: 'Once per Combat when an ally enters Death’s Door within 20 Spaces of you, you take an amount of True damage equal to your Prime Modifier.',
    cost: -1,
    isNegative: true,
    effects: [{ type: 'TAKE_TRUE_DAMAGE_ONCE_PER_COMBAT_WHEN_ALLY_DEATHS_DOOR', value: 'Prime_Modifier' }]
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
    effects: [{ type: 'MODIFY_SIZE', target: 'Large' }, { type: 'MODIFY_SPACE_OCCUPIED', target: '1_Size_Smaller' }]
  },
  {
    id: 'giantborn_unstoppable',
    name: 'Unstoppable',
    description: 'You have ADV on Saves against being Slowed or Stunned.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Slowed' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Stunned' }]
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
    description: 'Once per Combat when you take damage from an Attack, you can reduce the damage taken by an amount equal to your Might or Agility (your choice).',
    cost: 2,
    effects: [{ type: 'REDUCE_DAMAGE_TAKEN_ONCE_PER_COMBAT', value: 'Might_or_Agility' }]
  },
  {
    id: 'giantborn_mighty_hurl',
    name: 'Mighty Hurl',
    description: 'You throw creatures 1 Space farther than normal, and objects (including Weapons) 5 Spaces farther than normal.',
    cost: 1,
    effects: [{ type: 'MODIFY_THROW_DISTANCE_CREATURES', value: 1 }, { type: 'MODIFY_THROW_DISTANCE_OBJECTS', value: 5 }]
  },
  {
    id: 'giantborn_titanic_toss',
    name: 'Titanic Toss',
    description: 'You have ADV on Checks made to throw creatures. Additionally, you don’t have DisADV as a result of making an Attack with a Weapon with the Toss or Thrown Property at Long Range.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_CHECKS', target: 'Throw_Creatures' }, { type: 'IGNORE_DISADV_ON_RANGED_ATTACK_WITH_TOSS_THROWN_AT_LONG_RANGE' }]
  },
  {
    id: 'giantborn_mighty_leap',
    name: 'Mighty Leap',
    description: 'You can use your Might instead of Agility to determine your Jump Distance and the damage you take from Falling.',
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
    description: 'You learn 1 Spell of your choice from the Divine Spell List (Holy & Restoration during the Beta). Once per Long Rest, you can cast the chosen Spell spending 1 less MP than normal (minimum of 0 MP). The Spells total MP cost (before all reductions) still can’t exceed your Mana Spend Limit.',
    cost: 2,
    effects: [{ type: 'GRANT_SPELL_FROM_LIST', target: 'Divine_Spell_List' }, { type: 'REDUCE_MP_COST_ONCE_PER_LONG_REST', value: 1 }]
  },
  {
    id: 'angelborn_healing_touch',
    name: 'Healing Touch',
    description: 'Once per Combat, you can spend 1 AP to touch a creature and Heal it. Make a DC 10 Spell Check. Success: You can restore up to 2 HP to the target. Success (each 5): +1 HP. Failure: You only restore 2 HP.',
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
    effects: [{ type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Blinded' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Deafened' }]
  },
  {
    id: 'angelborn_angelic_insight',
    name: 'Angelic Insight',
    description: 'Once per Long Rest you can grant yourself ADV on an Insight Check to see if someone is lying.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_INSIGHT_CHECK_ONCE_PER_LONG_REST', condition: 'see_if_lying' }]
  },
  {
    id: 'angelborn_gift_of_the_angels',
    name: 'Gift of the Angels',
    description: 'Once per Combat you can spend 1 AP and 1 MP and touch a creature to heal them over time. The creature recovers 1 HP at the start of each of their turns for 1 minute (5 Rounds).',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Heal_Over_Time_OncePerCombat_1AP_1MP' }]
  },
  {
    id: 'angelborn_blinding_light',
    name: 'Blinding Light',
    description: 'Once per Combat, you can spend 1 AP to choose a creature within 5 Spaces and make a Spell Check contested by its Physical Save. Success: The target is Blinded until the end of your next turn.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Blind_Target_OncePerCombat_1AP' }]
  },
  {
    id: 'angelborn_glide_speed',
    name: 'Glide Speed',
    description: 'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren’t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
    cost: 2,
    effects: [{ type: 'GRANT_GLIDE_SPEED' }]
  },
  {
    id: 'angelborn_pacifist',
    name: 'Pacifist',
    description: 'Your divine call is to put others before yourself and resist doing harm. You suffer a -1 penalty to all Checks and Saves made during the first round of Combat.',
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
    description: 'You learn 1 Spell of your choice from the Arcane Spell List from the Destruction or Enchantment Spell Schools. If the Spell deals damage, it must be the same damage type as your Fiendish damage. Once per Long Rest, you can cast the chosen Spell spending 1 less MP than normal (minimum of 0 MP). The Spells total MP cost (before all reductions) still can’t exceed your Mana Spend Limit.',
    cost: 2,
    effects: [{ type: 'GRANT_SPELL_FROM_LIST_SCHOOLS', target: 'Arcane_Spell_List', schools: ['Destruction', 'Enchantment'] }, { type: 'REDUCE_MP_COST_ONCE_PER_LONG_REST', value: 1, condition: 'spell_damage_type_matches_fiendish' }]
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
    description: 'Once per Long Rest you can grant yourself ADV on an Influence Check when trying to deceive someone.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_INFLUENCE_CHECK_ONCE_PER_LONG_REST', condition: 'trying_to_deceive' }]
  },
  {
    id: 'fiendborn_fiendish_aura',
    name: 'Fiendish Aura',
    description: 'You learn the Sorcery Cantrip, but you must choose the type of energy that’s the same as your Fiendish Origin.',
    cost: 1,
    effects: [{ type: 'GRANT_SPELL_KNOWN', value: 'Sorcery_Cantrip' }, { type: 'SET_SORCERY_ENERGY_TYPE', target: 'Fiendish_Origin' }]
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
    description: 'You can spend 1 AP to gaze upon a creature you can see within 10 Spaces that can also see you. Make a Spell Check contested by the target’s Repeated Charisma Save. Success: The creature becomes Charmed by you for 1 minute. You can use this ability once per Long Rest, and when you roll for Initiative, or meet some other unique criteria at the GM’s discretion, this ability recharges.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Charm_Target_OncePerLongRest_1AP' }]
  },
  {
    id: 'fiendborn_glide_speed',
    name: 'Glide Speed',
    description: 'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren’t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
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
    description: 'You can spend 1 AP to roar, scream, or screech to gain Blindsight in a 10 Spaces radius that lasts until the start of your next turn. The sound can be heard from up to 100 Spaces away. You gain no benefit from this Trait in an area of Silence.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Echolocation_1AP_10Space_1Round' }]
  },
  {
    id: 'beastborn_keen_sense',
    name: 'Keen Sense',
    description: 'Choose 1 of the following senses: hearing, sight, or smell. You make Awareness Checks with ADV using the chosen sense.',
    cost: 1,
    effects: [{ type: 'GRANT_ADV_ON_AWARENESS_CHECKS_USING_SENSE', target: 'chosen_sense', userChoiceRequired: { prompt: "Choose a sense: hearing, sight, or smell" } }],
    // This trait can be chosen multiple times, but the interface doesn't directly support that.
    // The logic for handling multiple selections will need to be in the application.
  },
  {
    id: 'beastborn_sunlight_sensitivity',
    name: 'Sunlight Sensitivity',
    description: 'While you or your target is in sunlight, you have DisADV on Attacks and Awareness Checks that rely on sight.',
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
    description: 'You can walk without falling on the ceiling and vertical surfaces normally without needing to Climb.',
    cost: 1,
    prerequisites: ['beastborn_climb_speed'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Walk_On_Vertical_Surfaces_Ceilings' }]
  },
  {
    id: 'beastborn_web_walk',
    name: 'Web Walk',
    description: 'You can walk along and through webs unimpeded. Additionally, you know the location of any creature that’s in contact with the same web.',
    cost: 1,
    effects: [{ type: 'IGNORE_DIFFICULT_TERRAIN_FROM_WEBS' }, { type: 'KNOW_LOCATION_OF_CREATURES_IN_CONTACT_WITH_WEB' }]
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
    description: 'You gain a Swim Speed equal to your Ground Speed. Additionally, your Breath Duration increases by 3.',
    cost: 1,
    effects: [{ type: 'GRANT_SWIM_SPEED_EQUAL_TO_SPEED' }, { type: 'MODIFY_BREATH_DURATION', value: 3 }]
  },
  {
    id: 'beastborn_speed_increase',
    name: 'Speed Increase',
    description: 'Your Speed increases by 1 Space.',
    cost: 2,
    effects: [{ type: 'MODIFY_SPEED', value: 5 }],
    // This trait can be chosen up to 5 times, but the interface doesn't directly support that.
    // The logic for handling multiple selections will need to be in the application.
  },
  {
    id: 'beastborn_sprint',
    name: 'Sprint',
    description: 'You can use your Minor Action to take the Move Action. Once you use this Trait, you can’t use it again until you take a turn without taking the Move Action.',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Move_As_Minor_Action_OncePerTurn_NoMoveAction' }]
  },
  {
    id: 'beastborn_charge',
    name: 'Charge',
    description: 'If you move at least 2 Spaces in a straight line before making a Melee Attack, the damage of the Attack increases by 1.',
    cost: 2,
    effects: [{ type: 'MODIFY_DAMAGE_ON_MELEE_ATTACK', value: 1, condition: 'move_2_spaces_straight_before' }]
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
    description: 'Your Jump Distance increases by 2, and you can take the Jump Action as a Minor Action.',
    cost: 1,
    effects: [{ type: 'MODIFY_JUMP_DISTANCE', value: 2 }, { type: 'GRANT_ABILITY', value: 'Jump_As_Minor_Action' }]
  },
  {
    id: 'beastborn_strong_jumper',
    name: 'Strong Jumper',
    description: 'You no longer need to move 2 Spaces before performing a Running Jump, and you take 0 damage from Controlled Falling 5 Spaces or less.',
    cost: 1,
    effects: [{ type: 'IGNORE_2_SPACES_MOVEMENT_FOR_RUNNING_JUMP' }, { type: 'IGNORE_FALLING_DAMAGE_5_SPACES_OR_LESS' }]
  },
  {
    id: 'beastborn_glide_speed',
    name: 'Glide Speed',
    description: 'You have a set of wings that you can use to horizontally glide and slow your descent. Provided you aren’t Incapacitated, you gain the following benefits while in the air: Controlled Falling: You suffer no damage from Controlled Falling. Altitude Drop: If you end your turn midair, you Controlled Fall 4 Spaces. Glide Speed: You can use your movement to glide horizontally.',
    cost: 2,
    effects: [{ type: 'GRANT_GLIDE_SPEED' }]
  },
  {
    id: 'beastborn_limited_flight',
    name: 'Limited Flight',
    description: 'You have a set of wings that grant you limited flight. Provided you aren’t Incapacitated, you gain the following benefits: Vertical Ascent: You can spend 2 Spaces of movement to ascend 1 Space vertically. Hover: When you end your turn in the air, you maintain your altitude.',
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
    description: 'Your arms are also your wings. Anytime you use a Glide Speed or Flying Speed, you can’t hold anything in your hands.',
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
    effects: [{ type: 'MODIFY_SIZE', target: 'Large' }, { type: 'MODIFY_SPACE_OCCUPIED', target: '1_Size_Smaller' }]
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
    description: 'You have 2 slightly smaller secondary arms below your primary pair of arms. They function just like your primary arms, but they can’t wield Weapons with the Heavy Property or Shields.',
    cost: 1,
    effects: [{ type: 'GRANT_SECONDARY_ARMS' }]
  },
  {
    id: 'beastborn_prehensile_appendage',
    name: 'Prehensile Appendage',
    description: 'You have a prehensile tail or trunk that has a reach of 1 Space and can lift up an amount of pounds equal to your Might times 5 (or half as many kilograms). You can use it to lift, hold, or drop objects, and to push, pull, or grapple creatures. It can’t wield Weapons or Shields, you can’t use tools with it that require manual precision, and you can’t use it in place of Somatic Components for Spells.',
    cost: 1,
    effects: [{ type: 'GRANT_PREHENSILE_APPENDAGE' }]
  },
  {
    id: 'beastborn_hazardous_hide',
    name: 'Hazardous Hide',
    description: 'You have spikes, retractable barbs, poisonous skin, or some other form of defense mechanism to keep creatures from touching you. Choose 1 of the following damage types: Corrosion, Piercing, or Poison. While you are physically Grappled, your Grappler takes 1 damage of the chosen type at the start of each of its turns. Creatures that start their turn Grappled by you also take this damage.',
    cost: 1,
    effects: [{ type: 'GRANT_DAMAGE_TO_GRAPPLER', target: 'chosen_damage_type', value: 1, userChoiceRequired: { prompt: "Choose a damage type: Corrosion, Piercing, or Poison" } }]
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
    description: 'You have a large shell around your body for protection. Your AD increases by 1 (while you’re not wearing Armor), your Movement Speed decreases by 1, and you’re immune to being Flanked.',
    cost: 1,
    prerequisites: ['beastborn_thick_skinned'],
    effects: [{ type: 'MODIFY_AD', value: 1, condition: 'not_wearing_armor' }, { type: 'MODIFY_SPEED', value: -5 }, { type: 'IMMUNE_TO_FLANKING' }]
  },
  {
    id: 'beastborn_shell_retreat',
    name: 'Shell Retreat',
    description: 'Your body has a shell that you can retreat into. You can spend 1 AP to retreat into or come back out of your shell. You gain +5 PD and AD, PDR, EDR and ADV on Might Saves. While in your shell, you’re Prone, you can’t move, you have DisADV on Agility Saves, and you can’t take Reactions.',
    cost: 1,
    prerequisites: ['beastborn_hard_shell'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Retreat_Into_Shell_1AP' }]
  },
  {
    id: 'beastborn_camouflage',
    name: 'Camouflage',
    description: 'You can change the color and pattern of your body. You have ADV on Stealth Checks while motionless.',
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
    description: 'You have Cold Resistance (Half) and Resistance to Exhaustion from cold temperatures.',
    cost: 2,
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Cold' }, { type: 'GRANT_RESISTANCE_TO_EXHAUSTION', condition: 'cold_temperatures' }]
  },
  {
    id: 'beastborn_fire_resistance',
    name: 'Fire Resistance',
    description: 'You have Fire Resistance (Half) and Resistance to Exhaustion from hot temperatures.',
    cost: 2,
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Fire' }, { type: 'GRANT_RESISTANCE_TO_EXHAUSTION', condition: 'hot_temperatures' }]
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
    description: 'You have up to 2 Natural Weapons (claws, horns, fangs, tail, etc.) which you can use to make Unarmed Strikes that deal 1 Bludgeoning, Piercing, or Slashing damage (your choice upon gaining this Trait). You can perform Attack Maneuvers with your Natural Weapons.',
    cost: 1,
    effects: [{ type: 'GRANT_NATURAL_WEAPON', value: 1, userChoiceRequired: { prompt: "Choose a damage type: Bludgeoning, Piercing, or Slashing" } }],
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
    description: 'You can use your Natural Weapon to make a Ranged Martial Attack with a Range of 10 Spaces. The Natural Weapon might produce a spine, barb, fluid, or other harmful projectile (your choice).',
    cost: 1,
    prerequisites: ['beastborn_natural_weapon'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Natural_Projectile_Ranged_Attack' }]
  },
  {
    id: 'beastborn_natural_weapon_passive',
    name: 'Natural Weapon Passive',
    description: 'You can choose 1 Weapon Style that fits your desired Natural Weapon. You can benefit from the chosen Weapon Style’s passive with your Natural Weapon.',
    cost: 1,
    prerequisites: ['beastborn_natural_weapon'],
    effects: [{ type: 'GRANT_WEAPON_STYLE_PASSIVE_TO_NATURAL_WEAPON', target: 'chosen_weapon_style', userChoiceRequired: { prompt: "Choose a Weapon Style" } }]
  },
  {
    id: 'beastborn_rend',
    name: 'Rend',
    description: 'You can spend 1 AP when making an Attack Check with your Natural Weapon to force the target to make a Physical Save. Failure: Target begins Bleeding.',
    cost: 1,
    prerequisites: ['beastborn_natural_weapon'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Rend_Bleeding_1AP' }]
  },
  {
    id: 'beastborn_retractable_natural_weapon',
    name: 'Retractable Natural Weapon',
    description: 'Your Natural Weapon is able to be concealed or retracted and gains the Concealable Property (gain ADV on the first Attack Check you make in Combat).',
    cost: 1,
    prerequisites: ['beastborn_natural_weapon'],
    effects: [{ type: 'GRANT_PROPERTY_TO_NATURAL_WEAPON', target: 'Concealable' }]
  },
  {
    id: 'beastborn_venomous_natural_weapon',
    name: 'Venomous Natural Weapon',
    description: 'When you Hit a creature with your Natural Weapon, they make a Physical Save against your Save DC. Failure: The target becomes Impaired until the start of your next turn.',
    cost: 1,
    prerequisites: ['beastborn_natural_weapon'],
    effects: [{ type: 'GRANT_ABILITY', value: 'Venomous_Natural_Weapon_Impaired' }]
  },
  {
    id: 'beastborn_fast_reflexes',
    name: 'Fast Reflexes',
    description: 'You gain ADV on Initiative Checks and on the first Attack Check you make in Combat.',
    cost: 2,
    effects: [{ type: 'GRANT_ADV_ON_INITIATIVE_CHECKS' }, { type: 'GRANT_ADV_ON_FIRST_ATTACK_CHECK_IN_COMBAT' }]
  },
  {
    id: 'beastborn_mimicry',
    name: 'Mimicry',
    description: 'You can mimic simple sounds that you’ve heard (such as a baby’s crying, the creak of a door, or single words) and repeat short 3 word phrases that sound identical to what you heard. A creature can make an Insight Check contested by your Trickery Check to determine if this sound is real.',
    cost: 1,
    effects: [{ type: 'GRANT_ABILITY', value: 'Mimic_Simple_Sounds_Short_Phrases' }]
  },
  {
    id: 'beastborn_intimidating_shout',
    name: 'Intimidating Shout',
    description: 'Once per Combat, you can spend 1 AP to let out an Intimidating Shout. All creatures within 5 Spaces that can hear you must make a Charisma Save contested by your Attack Check. Failure: A target is Hindered on the next Attack Check or Spell Attack it makes before the start of your next turn.',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Intimidating_Shout_OncePerCombat_1AP' }]
  },
  {
    id: 'beastborn_toxic_fortitude',
    name: 'Toxic Fortitude',
    description: 'You have Poison Resistance (Half) and ADV on Saves against being Poisoned.',
    cost: 2,
    effects: [{ type: 'GRANT_RESISTANCE_HALF', target: 'Poison' }, { type: 'GRANT_ADV_ON_SAVE_VS_CONDITION', target: 'Poisoned' }]
  },
  {
    id: 'beastborn_shoot_webs',
    name: 'Shoot Webs',
    description: 'You can spend 1 AP to shoot web at a target within 5 Spaces. Make an Attack Check contested by the target’s Physical Save. Success: The target is Restrained by webbing and can spend 1 AP on their turn to attempt to escape (Martial Check vs your Save DC). The webbing can also be attacked and destroyed (PD 5, AD 10, 2 HP; Immunity to Bludgeoning, Poison, and Psychic damage).',
    cost: 2,
    effects: [{ type: 'GRANT_ABILITY', value: 'Shoot_Webs_1AP' }]
  },
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
  derivedStats?: Array<{ statName: string; formula: string; }>;
}

// Interface for Trait Effects
export interface ITraitEffect {
  type: string; // e.g., 'MODIFY_ATTRIBUTE', 'GRANT_SKILL_EXPERTISE', 'GRANT_FEATURE'
  target?: string; // e.g., attribute ID ('might'), skill ID ('athletics'), feature ID ('rage')
  value?: any; // e.g., number for attribute modification, object for skill expertise details
  condition?: string; // Optional condition for the effect to apply
  userChoiceRequired?: { // Details if the user needs to make a choice for this effect
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
  origin?: { // Optional origin property for ancestries with specific origins (e.g., Dragonborn, Fiendborn, Beastborn)
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

## File: src/lib/stores/characterInProgressStore.ts
````typescript
// src/lib/stores/characterInProgressStore.ts

import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { CharacterInProgress } from '@prisma/client'; // Assuming Prisma client is generated
import { classesData } from '../rulesdata/classes';

// Define the shape of the data stored in the characterInProgressStore
// This should mirror the CharacterInProgress Prisma model, plus any UI state
interface CharacterInProgressStoreData extends CharacterInProgress {
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

// Derived store for Save Masteries (DC20 p.22)
export const saveMasteries = derived(
  [characterInProgressStore, primeModifier, combatMastery],
  ([$store, $primeModifier, $combatMastery]) => {
    const primeModValue = $primeModifier.value;
    const primeModAttribute = $primeModifier.attribute;

    // Save Mastery = Combat Mastery + Attribute Modifier
    // If the attribute is the Prime Modifier, use the Prime Modifier value.
    // Otherwise, use the attribute's own modifier (which is the score itself).
    // Use the derived combatMastery store
    const currentCombatMastery = $combatMastery;

    return {
      might: currentCombatMastery + (primeModAttribute === 'Might' ? primeModValue : getModifier($store.attribute_might)),
      agility: currentCombatMastery + (primeModAttribute === 'Agility' ? primeModValue : getModifier($store.attribute_agility)),
      charisma: currentCombatMastery + (primeModAttribute === 'Charisma' ? primeModValue : getModifier($store.attribute_charisma)),
      intelligence: currentCombatMastery + (primeModAttribute === 'Intelligence' ? primeModValue : getModifier($store.attribute_intelligence)),
    };
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
    const classData = classesData.find(c => c.id === $store.classId);
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
    const classData = classesData.find(c => c.id === $store.classId);
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

// Derived store for Ancestry Points Remaining (Base 4 + Negative Traits - Spent)
export const ancestryPointsRemaining = derived(
  characterInProgressStore,
  ($store) => {
    const basePoints = 4; // DC20 p.16
    // Need to access traitsData to calculate points from negative traits
    // For now, this calculation is incomplete without access to traitsData
    const pointsFromNegativeTraits = 0; // Placeholder
    return basePoints + pointsFromNegativeTraits - $store.ancestryPointsSpent;
  }
);

/**
 * Derived store for Max HP (Class HP + Might Modifier + Ancestry HP)
 * Uses selected class's baseHpContribution, defaults to 8 if not set.
 */
export const maxHP = derived(
  characterInProgressStore,
  ($store) => {
    const classData = classesData.find(c => c.id === $store.classId);
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

## File: src/routes/+layout.svelte
````
<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}
````

## File: src/routes/+page.svelte
````
<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
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
    const { characterId, finalName, attribute_might, attribute_agility, attribute_charisma, attribute_intelligence } = await request.json();

    // Backend Validation
    if (!finalName || typeof finalName !== 'string' || finalName.trim().length === 0) {
        return error(400, { message: 'Character name is required.' });
    }
    // Optional: Add length constraints or character restrictions for finalName

    const attributes = {
      might: attribute_might,
      agility: attribute_agility,
      charisma: attribute_charisma,
      intelligence: attribute_intelligence,
    };

    // Validate attribute ranges
    for (const [name, value] of Object.entries(attributes)) {
      if (value < ATTRIBUTE_MIN || value > ATTRIBUTE_MAX_L1) {
        return error(400, { message: `Attribute ${name} is out of the allowed range (-2 to +3).` });
      }
    }

    // Validate total points spent
    const pointsSpent = (attributes.might - ATTRIBUTE_MIN) +
                        (attributes.agility - ATTRIBUTE_MIN) +
                        (attributes.charisma - ATTRIBUTE_MIN) +
                        (attributes.intelligence - ATTRIBUTE_MIN);

    if (pointsSpent !== POINT_BUY_BUDGET) {
      return error(400, { message: `Total points allocated must be exactly ${POINT_BUY_BUDGET}. You allocated ${pointsSpent}.` });
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
          currentStep: 1, // Mark Stage A as complete
        },
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
          currentStep: 1, // Mark Stage A as complete
        },
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
    if (!Array.isArray(data.selectedAncestries) || data.selectedAncestries.length === 0 || data.selectedAncestries.length > 2) {
         return json({ success: false, message: 'You must select between 1 and 2 ancestries.' }, { status: 400 });
    }
    // Validate ancestry IDs
    for (const ancestryId of data.selectedAncestries) {
        const validAncestry = ancestries.find(a => a.id === ancestryId);
        if (!validAncestry) {
            return json({ success: false, message: `Invalid ancestry ID: ${ancestryId}` }, { status: 400 });
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
            const validTrait = traits.find(t => t.id === traitId);
            if (!validTrait) {
                return json({ success: false, message: `Invalid trait ID: ${traitId}` }, { status: 400 });
            }
        }

        // Get full trait objects
        const selectedTraitObjects: ITrait[] = data.selectedTraits.map((id: string) => traits.find(t => t.id === id)).filter((t: ITrait | undefined): t is ITrait => t !== undefined);

        // Validate ancestry points budget
        const totalCost = selectedTraitObjects.reduce((sum: number, trait: ITrait) => sum + trait.cost, 0);
        if (totalCost !== 5) {
            return json({ success: false, message: `Total ancestry points must equal 5, got: ${totalCost}` }, { status: 400 });
        }

        // Validate minor trait limit
        const minorTraits = selectedTraitObjects.filter((t: ITrait) => t.isMinor);
        if (minorTraits.length > 1) {
            return json({ success: false, message: `Maximum of 1 minor trait allowed, got: ${minorTraits.length}` }, { status: 400 });
        }

        // Validate negative trait point gain limit
        const pointsFromNegative = selectedTraitObjects
            .filter((t: ITrait) => t.cost < 0)
            .reduce((sum: number, t: ITrait) => sum + Math.abs(t.cost), 0);
        if (pointsFromNegative > 2) {
            return json({ success: false, message: `Maximum of +2 points from negative traits allowed, got: ${pointsFromNegative}` }, { status: 400 });
        }
    }

    // 4. Validate attribute values after trait bonuses (within -2 and +3)
    // Assuming data.attributes is an object like { attribute_might: 1, ... }
    if (!data.attributes || typeof data.attributes !== 'object') {
         return json({ success: false, message: 'Attribute data is missing or invalid.' }, { status: 400 });
    }
    // Corrected attribute name to match schema
    const attributeNames = ['attribute_might', 'attribute_agility', 'attribute_charisma', 'attribute_intelligence'];
    for (const attrName of attributeNames) {
        const attrValue = data.attributes[attrName];
        if (typeof attrValue !== 'number' || attrValue < -2 || attrValue > 3) {
            return json({ success: false, message: `Invalid value for attribute ${attrName}: ${attrValue}. Must be between -2 and +3.` }, { status: 400 });
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
    const actualTotalPoints = attributeNames.reduce((sum, attrName) => sum + (data.attributes[attrName] - baseAttributeValue), 0);

    if (actualTotalPoints !== expectedTotalPoints) {
         return json({ success: false, message: `Total attribute points mismatch. Expected ${expectedTotalPoints}, got ${actualTotalPoints}.` }, { status: 400 });
    }


    try {
        // Fetch the existing character to ensure it's in the correct state (Stage A complete)
        const character = await prisma.characterInProgress.findUnique({
            where: { id: data.characterId },
            select: {
                currentStep: true,
                // Select other fields if needed for validation against previous stage data
            },
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
                currentStep: 2, // Mark Stage B as complete (using integer 2)
            },
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

## File: src/routes/api/character/progress/complete/+server.ts
````typescript
// src/routes/api/character/progress/complete/+server.ts

import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { classesData } from '$lib/rulesdata/classes';
import { traitsData } from '$lib/rulesdata/traits';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

function validateFeatureChoices(classId: string, selectedChoicesJson: string) {
  const classData = classesData.find(c => c.id === classId);
  if (!classData) throw new Error(`Invalid class ID: ${classId}`);

  const choices = JSON.parse(selectedChoicesJson || '{}');

  for (const requiredChoice of classData.featureChoicesLvl1 || []) {
    if (choices[requiredChoice.id] === undefined) {
      throw new Error(`Missing required choice for ${classData.name}: ${requiredChoice.prompt}`);
    }
    const validOptions = requiredChoice.options.map(o => o.value);
    if (!validOptions.includes(choices[requiredChoice.id])) {
      throw new Error(`Invalid selected option for ${requiredChoice.id} in class ${classData.name}`);
    }
  }
}

function validateAttributeCapsAfterTraits(attributes: any, selectedTraitIdsJson: string) {
  const selectedTraitIds = JSON.parse(selectedTraitIdsJson || '[]');
  const traits = selectedTraitIds.map((id: string) => traitsData.find(t => t.id === id)).filter((t: any) => t !== undefined);

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
      throw new Error(`Final attribute ${attrName.replace('attribute_', '')} exceeds Level 1 cap (+3) after applying traits.`);
    }
  }
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.finalName || typeof data.finalName !== 'string' || data.finalName.trim().length === 0) {
      return json({ error: 'Character name is required.' }, { status: 400 });
    }

    // Validate attributes and point buy (Stage A)
    const attributes = {
      attribute_might: data.attribute_might,
      attribute_agility: data.attribute_agility,
      attribute_charisma: data.attribute_charisma,
      attribute_intelligence: data.attribute_intelligence
    };
    const totalPoints = Object.values(attributes).reduce((sum, v) => sum + (typeof v === 'number' ? v : 0), 0);
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
    if (!data.classId || !classesData.find(c => c.id === data.classId)) {
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

## File: src/routes/demo/+page.svelte
````
<a href="/demo/lucia">lucia</a>
````

## File: src/routes/demo/lucia/+page.server.ts
````typescript
import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	return { user };
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/demo/lucia/login');
	}
};

function requireLogin() {
	const { locals } = getRequestEvent();

	if (!locals.user) {
		return redirect(302, '/demo/lucia/login');
	}

	return locals.user;
}
````

## File: src/routes/demo/lucia/+page.svelte
````
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<h1>Hi, {data.user.username}!</h1>
<p>Your user ID is {data.user.id}.</p>
<form method="post" action="?/logout" use:enhance>
	<button>Sign out</button>
</form>
````

## File: src/routes/demo/lucia/login/+page.server.ts
````typescript
import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/demo/lucia');
	}
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!validateUsername(username)) {
			return fail(400, {
				message: 'Invalid username (min 3, max 31 characters, alphanumeric only)'
			});
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password (min 6, max 255 characters)' });
		}

		const results = await db.select().from(table.user).where(eq(table.user.username, username));

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, { message: 'Incorrect username or password' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/demo/lucia');
	},
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (!validateUsername(username)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.user).values({ id: userId, username, passwordHash });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch {
			return fail(500, { message: 'An error has occurred' });
		}
		return redirect(302, '/demo/lucia');
	}
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}

function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}
````

## File: src/routes/demo/lucia/login/+page.svelte
````
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Login/Register</h1>
<form method="post" action="?/login" use:enhance>
	<label>
		Username
		<input
			name="username"
			class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</label>
	<label>
		Password
		<input
			type="password"
			name="password"
			class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
	</label>
	<button class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
		>Login</button
	>
	<button
		formaction="?/register"
		class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
		>Register</button
	>
</form>
<p style="color: red">{form?.message ?? ''}</p>
````

## File: src/routes/page.svelte.test.ts
````typescript
import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render h1', async () => {
		render(Page);

		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
	});
});
````

## File: svelte.config.js
````javascript
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: { adapter: adapter() }
};

export default config;
````

## File: tsconfig.json
````json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"module": "NodeNext",
		"moduleResolution": "NodeNext"
	}
}
````

## File: vite.config.ts
````typescript
import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
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
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
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
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
````

## File: vitest-setup-client.ts
````typescript
/// <reference types="@vitest/browser/matchers" />
/// <reference types="@vitest/browser/providers/playwright" />
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

## File: README.md
````markdown
# Svelte library

Everything you need to build a Svelte library, powered by [`sv`](https://npmjs.com/package/sv).

Read more about creating a library [in the docs](https://svelte.dev/docs/kit/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
````

## File: package.json
````json
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
