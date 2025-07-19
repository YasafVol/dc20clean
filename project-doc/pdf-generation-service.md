# PDF Generation Service Documentation

## Overview
This document details the implementation of a self-contained, server-side PDF generation service for the DC20 character-creation monorepo. The service is designed to run on Vercel as a serverless function.

## High-Level Goal
The primary goal of this service is to generate character sheets in PDF format. When the front-end calls `GET /api/sheet/[id]` with a character ID, the service performs the following steps:
1.  Pulls the character record from a PostgreSQL database via Prisma.
2.  Merges the JSON payload of the character data into an AcroForm PDF template (`DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf`) using `pdf-lib`.
3.  Flattens the form fields and streams the finished PDF back to the client with `Content-Disposition: attachment`.

The service is designed for server-side execution only, with no client-side PDF rendering.

## Project Structure
The PDF service is located within the `pdf-service/` directory of the monorepo.

```
DC20CLEAN/                       # repo root (monorepo, pnpm workspaces)
├─ pdf-service/
│  └─ src/
│     ├─ DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf   # PDF template
│     ├─ DC20_Beta_0_9_5_fields.json                     # 309-field map
│     ├─ fill.ts                                         # Pure helper for PDF filling
│     └─ server.ts                                       # Vercel serverless function route
├─ prisma/
│  ├─ schema.prisma                                      # Database schema
│  └─ migrations/…
├─ src/
│  └─ lib/
│     └─ prisma.ts                                       # Global PrismaClient instance
└─ vercel.json                                           # Vercel configuration for rewrites
```

## Required Deliverables and Implementation Details

### 1. `fill.ts`
**Path:** `pdf-service/src/fill.ts`
**Description:** This module provides the core logic for filling the PDF form.
*   **Caching:** The PDF template (`DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf`) and the field map (`DC20_Beta_0_9_5_fields.json`) are loaded and cached in module scope to optimize performance for subsequent requests.
*   **Exported Function:** `createCharacterPdf(data: Record<string, any>): Promise<Uint8Array>`
    *   Takes a `data` object (character JSON payload) as input.
    *   Iterates over the `fieldMap` JSON.
    *   For each field, it attempts to set the text or check/uncheck a checkbox based on the `data` provided.
    *   Handles type conversions: numbers and booleans are prudently converted to strings for text fields.
    *   Includes error handling for missing fields in the PDF template or invalid data types for checkboxes.
    *   Flattens the form fields after filling to make them non-editable.
    *   Returns the generated PDF as a `Uint8Array`.

### 2. `server.ts`
**Path:** `pdf-service/src/server.ts`
**Description:** This file defines the Vercel serverless function endpoint.
*   **Route:** `GET /api/sheet/[id]` (configured via `vercel.json` rewrite).
*   **Parameter Handling:** Reads the `id` from `params.id`. Returns a 400 response if `id` is missing.
*   **Data Fetching (Placeholder):** Currently contains a placeholder for fetching character data from Prisma. **This section needs to be updated with the actual Prisma query for the `Character` model once its schema is confirmed.** For demonstration, it uses simulated character data.
*   **PDF Generation:** Calls `createCharacterPdf` from `fill.ts` with the fetched character data.
*   **Response:** Returns a `Response` object with:
    *   `Content-Type: application/pdf`
    *   `Content-Disposition: attachment; filename="character_[id].pdf"`
*   **Runtime:** `export const runtime = "nodejs";` is included to force Node.js runtime on Vercel, as required.

### 3. `lib/prisma.ts`
**Path:** `src/lib/prisma.ts`
**Description:** This helper ensures a single, global `PrismaClient` instance is used across the application, preventing multiple database connections, especially crucial in serverless environments with hot reloads.

### 4. `package.json` additions (root)
*   **Dependencies:**
    *   `"pdf-lib"`: For PDF manipulation.
    *   `"@pdf-lib/fontkit"`: For embedding fonts (required by `pdf-lib`).
    *   `"@prisma/client"`: Prisma ORM client.
*   **Scripts:**
    *   `"prisma:generate"`: Added to the root `package.json` scripts to ensure Prisma client generation.

### 5. `pdf-service/package.json`
A dedicated `package.json` file was created within `pdf-service/` to manage its specific dependencies and ensure it can be deployed as a self-contained unit.

### 6. `tsconfig.json` updates
*   The root `tsconfig.json` was updated to include the `pdf-service` directory in its `include` paths, allowing TypeScript to correctly resolve modules within the PDF service.
*   The `references` section for `tsconfig.node.json` was updated with `prepend: true` to resolve compilation issues.

### 7. `tsconfig.node.json` updates
*   The `noEmit` compiler option was set to `false` to resolve a TypeScript error related to referenced projects.

### 8. `vercel.json`
*   A rewrite rule was added to `vercel.json` to map incoming requests to `/api/sheet/:id` to the `pdf-service/src/server.ts` serverless function.

## Constraints & Edge Cases Handled
*   **Server-only:** `pdf-lib` is used exclusively on the server-side.
*   **Missing/Extra Fields:** The `fill.ts` module logs warnings for fields present in the PDF template but missing in the character data, or vice-versa, without throwing errors.
*   **Data Type Conversion:** Booleans and numbers in the character JSON are converted to strings for text fields.
*   **Template Filename:** The template filename is currently hardcoded but can be easily parameterized if versioning is required in the future.

## How to Test Locally
1.  Ensure your PostgreSQL database is running and `DATABASE_URL` is correctly set in your `.env` file.
2.  Run `npm install` in the root directory (`dc20clean/`) to install all dependencies and generate the Prisma client.
3.  Start the development server: `npm run dev`
4.  Use `curl` to download a sample PDF. Replace `<id>` with any string (e.g., `123`), as the Prisma query is currently mocked:
    ```bash
    curl http://localhost:3000/api/sheet/<id> --output char.pdf
    ```

## Optional: Splitting `pdf-service` into its own Vercel Project
If you later decide to deploy the `pdf-service` as a separate Vercel project:
1.  **Create New Vercel Project:** In your Vercel dashboard, create a new project and link it to a Git repository containing only the `pdf-service` directory (or a monorepo setup where `pdf-service` is the root).
2.  **Configure Root Directory:** Ensure the Vercel project's root directory is set to `pdf-service/`.
3.  **Environment Variables:** Set the `DATABASE_URL` environment variable in the new Vercel project settings.
4.  **Update Frontend:** Modify your frontend application to call the new Vercel deployment URL for the PDF service (e.g., `https://your-pdf-service.vercel.app/api/sheet/<id>`) instead of the monorepo's `/api/sheet` endpoint.
