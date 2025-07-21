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
