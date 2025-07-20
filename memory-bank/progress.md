# Project Progress

## 1. What Works

-   **Character Creation Wizard:** The multi-step character creation process is fully functional. Users can navigate through the steps, make selections, and see their choices reflected in the UI.
    -   **Stage A (Attributes):** Point-buy system for attributes is implemented and validated.
    -   **Stage B (Ancestry):** Selection of one or two ancestries and their corresponding traits is working. The ancestry point system is in place.
    -   **Stage C (Class):** Class selection and feature choices (where applicable) are functional.
    -   **Stage D (Details):** Users can enter a character name and player name.
-   **Character Finalization:** The system now correctly saves the final character data to the database.
    -   The `CharacterInProgress` record is updated to reflect the completed state.
    -   A new `CharacterSheetData` record is created with all the calculated final stats.
-   **PDF Generation:** The `pdf-service` can successfully fetch a completed character's data from the database and generate a filled-out PDF character sheet.
-   **Local Development Environment:** The project can be run locally using `docker-compose` for the database and `npm run dev` for the frontend.

## 2. What's Left to Build

-   **Skills, Trades, and Languages:** The UI for selecting skills, trades, and languages needs to be created. The backend logic to save these selections also needs to be implemented.
-   **Equipment:** The equipment selection stage of the character creation process is not yet implemented.
-   **Character Loading:** The "Load Character" feature currently loads from `localStorage`. This needs to be refactored to fetch a list of saved characters from the database and allow the user to select one to view or edit.
-   **Character Editing:** There is currently no functionality to edit a character after it has been finalized.
-   **Authentication:** While there are some files related to authentication (`auth.ts`, `schema.ts`), it does not appear to be fully integrated into the application flow yet.

## 3. Current Status

The project has successfully completed the SvelteKit to React migration cleanup and is now a clean React + Vite application with no legacy SvelteKit code remaining. The core character creation and finalization flow is complete. The main focus now should be on implementing the remaining stages of character creation (skills, equipment, etc.) and improving the user experience by adding features like character loading and editing.

### Recent Milestone: Migration Cleanup Complete
- All SvelteKit dependencies and configurations removed
- Project now runs cleanly as React + Vite application
- Comprehensive documentation created for the cleanup process
- Development server verified to work correctly

## 4. Known Issues

-   **Frontend Error Handling:** As noted in `activeContext.md`, the error handling for API calls in the frontend is minimal and should be improved.
-   **Drizzle ORM:** The presence of Drizzle files alongside Prisma might cause confusion. It would be good to either fully remove Drizzle or clarify its role in the project.
-   **Hardcoded Rules Data:** All the game rules (classes, traits, etc.) are currently stored in TypeScript files in `src/lib/rulesdata`. While this is fine for now, it might be beneficial to move this data to a database or a more easily updatable format in the future.

## 5. Completed Milestones

-   **SvelteKit to React Migration Cleanup (January 2025):** Successfully removed all SvelteKit remnants from the codebase, including:
    -   Legacy configuration files and dependencies
    -   SvelteKit-specific scripts and build artifacts
    -   Outdated documentation and type declarations
    -   Created comprehensive documentation of the cleanup process
    -   Verified clean React + Vite operation
