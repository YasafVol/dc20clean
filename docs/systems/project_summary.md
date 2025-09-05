# DC20Clean – Project Summary

This document provides a comprehensive overview of the DC20Clean character creation system for the DC20 tabletop RPG, including its purpose, technology stack, and architecture.

## Overview

DC20Clean is a modern web-based character creation and management system for the DC20 tabletop RPG. It provides an intuitive, step-by-step interface for creating characters with full rules validation, real-time calculations, and comprehensive features including the new **Mastery Cap System** for skills and trades.

## Technology Stack

The project leverages a modern technology stack, including:

- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: Styled Components with CSS-in-JS
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **State Management**: React Context API
- **Testing**:
  - **Unit Testing**: [Vitest](https://vitest.dev/)
  - **E2E Testing**: [Playwright](https://playwright.dev/)

## Core Features

- **Character Creation Wizard**: Step-by-step character creation with live validation
- **Mastery Cap System**: ✅ Level-based skill/trade mastery with feature-granted exceptions
- **Rules Engine**: Comprehensive DC20 rules implementation with effect system
- **Real-time Calculations**: Dynamic stat calculations and validation
- **Responsive UI**: Works on desktop and mobile devices

## Project Structure

The project is organized into the following key directories:

- `src/routes/character-creation/`: Character creation wizard components and flow
- `src/lib/rulesdata/`: Canonical DC20 rules data (classes, ancestries, spells, etc.)
- `src/lib/services/`: Core business logic including enhancedCharacterCalculator
- `src/lib/stores/`: React Context state management
- `src/lib/hooks/`: Custom React hooks for character building
- `e2e/`: End-to-end tests for character creation flows

## Key Scripts

The `package.json` file defines several important scripts for managing the project:

- `dev`: Starts the development server
- `build`: Creates a production build
- `test:unit`: Runs unit tests with Vitest
- `test:e2e`: Runs end-to-end tests with Playwright
- `db:*`: Database management scripts with Prisma migrations
