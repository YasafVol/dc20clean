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
