# Active Context

## 1. Current Focus: Character Finalization and Persistence

The most recent work has been focused on ensuring that character data is correctly and persistently saved to the database when the user completes the character creation process. This involved significant changes to the frontend and backend to move away from `localStorage` for final character storage.

## 2. Key Changes and Decisions

-   **Frontend (`CharacterCreation.tsx`):**
    -   The `handleNext` function was modified to send the final character state to the `/api/character/progress/complete` endpoint via a `fetch` call.
    -   The logic for saving to `localStorage` was removed.
    -   A success snackbar was added to provide user feedback upon successful save.

-   **Backend (`/api/character/progress/complete/+server.ts`):**
    -   This endpoint now handles the full character finalization process.
    -   It performs a Prisma `upsert` on the `CharacterInProgress` table to save the latest state.
    -   It then creates or updates a corresponding record in the `CharacterSheetData` table, performing all necessary calculations for the final stats (e.g., HP, defenses, save masteries).
    -   The operation is wrapped in a Prisma transaction to ensure atomicity.

-   **Prisma Schema (`schema.prisma`):**
    -   The `CharacterSheetData` model is now fully utilized.
    -   A relation was established between `CharacterInProgress` and `CharacterSheetData` to link the in-progress and final character records.

## 3. Important Patterns and Preferences

-   **Data Flow:** The frontend is responsible for collecting user input and managing the UI state. The backend is responsible for all business logic, calculations, and data persistence. This separation of concerns should be maintained.
-   **State Management:** The `characterContext.tsx` with its reducer pattern is the preferred way to manage global state in the frontend.
-   **API Design:** API endpoints should be designed to be stateless and idempotent where possible. The `complete` endpoint is a good example of this, as it can be called multiple times for the same character without causing issues (it will simply update the existing records).
-   **Type Safety:** The project heavily relies on TypeScript and Prisma for end-to-end type safety. This should be a priority in any future development.

## 4. Next Steps

-   **Skills, Trades, Languages, and Equipment:** The finalization endpoint currently saves empty JSON arrays for these. The next logical step is to implement the UI and logic for selecting these and then update the finalization endpoint to handle them.
-   **Error Handling:** The frontend error handling for the finalization API call is currently minimal (a `console.error`). This should be improved to provide better user feedback, perhaps using the snackbar component.
-   **Loading Characters:** The `LoadCharacter.tsx` component currently loads from `localStorage`. This needs to be updated to fetch a list of completed characters from the database.
