# Technology Context

## 1. Core Technologies

-   **Frontend Framework:** React 19.1.0 (Clean React + Vite setup, no SvelteKit remnants)
-   **Build Tool / Dev Server:** Vite 6.2.6 (Standard Vite configuration for React)
-   **Language:** TypeScript 5.0.0
-   **Styling:**
    -   styled-components 6.1.19
    -   Tailwind CSS 4.0.0 (via `@tailwindcss/vite`)
-   **Backend:** Node.js (v20 as per `.nvmrc`) with serverless functions
-   **Database ORM:** Prisma 6.10.1
-   **Database:** PostgreSQL (via `docker-compose.yml`)
-   **PDF Generation:** pdf-lib 1.17.1

## 2. Development Environment

-   **Package Manager:** npm (inferred from `package-lock.json`)
-   **Node.js Version:** 20 (`.nvmrc`)
-   **Linting:** ESLint 9.18.0 with plugins for React, React Hooks, and TypeScript
-   **Formatting:** Prettier 3.4.2 with plugins for Tailwind CSS (Svelte plugin removed during migration cleanup)
-   **Testing:**
    -   **Unit/Integration:** Vitest 3.2.3
    -   **End-to-End (E2E):** Playwright 1.53.0

## 2.1. Migration Status
-   **SvelteKit Cleanup Complete:** All SvelteKit dependencies, configurations, and build artifacts have been removed
-   **Clean React Setup:** Project now runs as a standard React + Vite application
-   **Dev Script:** Uses standard `vite` command instead of SvelteKit's `vite dev`

## 3. Key Dependencies

-   **`fantasy-name-generator`:** Used for suggesting character names
-   **`@oslojs/crypto` & `@oslojs/encoding`:** Used for session management and token generation in `src/lib/server/auth.ts`
-   **`drizzle-kit` & `drizzle-orm`:** Although present, the primary ORM in use appears to be Prisma, based on the schema file and API endpoints. Drizzle might be a remnant of a previous setup or used for specific tasks not immediately apparent
-   **React Ecosystem:**
    -   `@types/react` & `@types/react-dom`: TypeScript definitions for React
    -   `@vitejs/plugin-react`: Vite plugin for React support
    -   `eslint-plugin-react` & `eslint-plugin-react-hooks`: ESLint plugins for React development

## 4. Deployment and Configuration

-   **Deployment Target:** Vercel (inferred from `vercel.json` and the use of serverless functions)
-   **Environment Variables:** The application uses a `.env` file for configuration, with `.env.example` providing a template. The primary variable is `DATABASE_URL`
-   **TypeScript Configuration:**
    -   `tsconfig.json`: Configures the main application, including React JSX settings
    -   `tsconfig.node.json`: Specific configuration for Node.js scripts like `vite.config.ts`
    -   `pdf-service/tsconfig.json`: Separate configuration for the PDF service
-   **Docker:** `docker-compose.yml` is used to run a local PostgreSQL database for development
-   **Vite Configuration:** `vite.config.ts` configured for React with proper plugin setup

## 5. Removed Dependencies (SvelteKit Migration)

The following dependencies were removed during the SvelteKit to React migration cleanup:
-   `@sveltejs/kit`, `@sveltejs/adapter-vercel`, `@sveltejs/package`
-   `@sveltejs/vite-plugin-svelte`
-   `svelte`, `svelte-check`
-   `eslint-plugin-svelte`
-   `prettier-plugin-svelte`
-   `vitest-browser-svelte`

These have been replaced with their React equivalents or removed entirely where not needed.
