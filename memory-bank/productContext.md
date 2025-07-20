# Product Context

## 1. What problem is this project solving?

The project aims to solve the complex and often tedious process of creating a character for the DC20 tabletop role-playing game. Manually creating a character involves tracking many rules, stats, and choices, which can be overwhelming for new players and time-consuming for experienced ones. This tool streamlines the process by:

-   **Guiding the user** through a step-by-step wizard.
-   **Automating calculations** for stats like defenses, save masteries, and HP.
-   **Enforcing rules** to prevent invalid character builds (e.g., point-buy limits, trait selection rules).
-   **Persistently storing** character data, so users can save their progress and load characters later.
-   **Generating a final, printable character sheet** in PDF format.

## 2. How does this project solve this problem?

The project is a web-based application that provides a rich, interactive user interface for character creation.

-   **Frontend (React/Vite/TypeScript):** A single-page application built with React and styled-components provides a dynamic and responsive user experience. It uses a context-based state management (`characterContext.tsx`) to handle the character's data as the user progresses through the creation wizard.
-   **Backend (Serverless Functions):** The backend is built with serverless functions (as seen in `src/routes/api/...`) that handle saving progress and finalizing the character. This allows for a scalable and maintainable architecture.
-   **Database (PostgreSQL/Prisma):** A PostgreSQL database stores all character data, both in-progress and finalized sheets. Prisma is used as the ORM to provide a type-safe way to interact with the database.
-   **PDF Generation Service:** A dedicated microservice (`pdf-service`) is responsible for taking the final character data and generating a fillable PDF character sheet, providing a tangible output for the user.

## 3. Who is the user, and what is their experience?

The primary users are players of the DC20 TTRPG. This includes:

-   **New Players:** Who need a guided experience to help them understand the rules and create a valid character.
-   **Experienced Players:** Who want a faster, more convenient way to create and manage their characters.

The user experience is designed to be a "wizard"-style flow, breaking down the complex process into manageable steps:

1.  **Class & Features:** Select a class and make initial feature choices.
2.  **Attributes:** Allocate points to core attributes (Might, Agility, etc.).
3.  **Ancestry:** Choose one or two ancestries and select from a list of available traits.
4.  **Character Name:** Give the character a name and provide the player's name.

The UI is themed to fit the fantasy genre of the game, with custom styling to create an immersive experience.
