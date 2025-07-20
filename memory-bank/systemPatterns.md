# System Patterns

## 1. Overall Architecture

The application follows a **monorepo, microservices-oriented architecture**. The main components are:

-   **Frontend Application:** A React-based single-page application that serves as the user interface for character creation.
-   **Backend API:** A set of serverless functions responsible for handling data persistence and business logic.
-   **PDF Generation Service:** A dedicated, self-contained service for creating PDF character sheets.
-   **Database:** A PostgreSQL database that acts as the single source of truth for all character data.

This architecture allows for a separation of concerns, where each part of the system can be developed, deployed, and scaled independently.

## 2. Frontend Architecture

-   **Component-Based UI:** The frontend is built using React, with a clear component-based structure (e.g., `AncestrySelector`, `ClassSelector`, `Attributes`).
-   **State Management:** Global state is managed using React's Context API (`characterContext.tsx`). This provides a centralized store for character data that can be accessed by any component in the creation wizard. The state is updated using a reducer pattern (`characterReducer`), which ensures predictable state transitions.
-   **Styling:** The application uses `styled-components` for CSS-in-JS styling, allowing for dynamic and scoped styling of components. A global style (`GlobalStyle`) is used to define the overall theme and custom scrollbars.
-   **Routing:** A simple, view-based routing is implemented within the `App.tsx` component, which switches between the main menu, character creation, and character loading views.

## 3. Backend and Data Persistence

-   **Serverless Functions:** The backend logic is implemented as serverless functions, which are likely deployed on a platform like Vercel. This is evident from the file structure in `src/routes/api/...` and the `vercel.json` configuration.
-   **Prisma ORM:** Prisma is used as the Object-Relational Mapper (ORM) to interact with the PostgreSQL database. This provides a type-safe and intuitive way to perform database operations. The database schema is defined in `prisma/schema.prisma`.
-   **Database Schema:** The database is designed with two main tables:
    -   `CharacterInProgress`: Stores the state of a character as it's being created. This allows users to save their progress and resume later.
    -   `CharacterSheetData`: Stores the final, calculated data for a completed character sheet. This table is populated when the user completes the creation process.
-   **Transactional Operations:** The finalization process uses a Prisma transaction (`$transaction`) to ensure that updating the `CharacterInProgress` record and creating/updating the `CharacterSheetData` record are atomic operations.

## 4. PDF Generation Service

-   **Microservice:** The PDF generation logic is encapsulated in its own service within the `pdf-service/` directory. This isolates the PDF generation logic from the main application, making it easier to maintain and deploy.
-   **Template-Based Generation:** The service uses a pre-existing fillable PDF form (`DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf`) as a template. The `pdf-lib` library is used to fill in the form fields with the character's data.
-   **Field Mapping:** A JSON file (`DC20_Beta_0_9_5_fields.json`) maps the fields in the PDF to the properties in the character data object. This makes it easy to update the PDF template without changing the code.
-   **Caching:** The PDF template and field map are cached in memory to improve performance on subsequent requests.
