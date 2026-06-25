# DC20Clean - User Feedback System

> Purpose: Userback feedback widget integration, captured context, privacy boundaries, and implementation points.
> Status: Active
> Last Updated: 2026-06-26

## 1. Overview

DC20Clean uses Userback for in-app feedback collection.

The widget is client-side only and loads when `VITE_USERBACK_ACCESS_TOKEN` is set.
Without that environment variable, no Userback script is injected and no feedback
data is sent.

## 2. Key Files

| File                                  | Role                                                                                      |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| `src/lib/feedback/userback.ts`        | Loads the Userback script and writes flat custom data                                     |
| `src/components/UserbackFeedback.tsx` | React route listener; attaches page, auth, storage, character, and target-element context |
| `.env.local`                          | Local untracked Userback access token                                                     |
| `.env.example`                        | Documents the required env var without a token                                            |

## 3. Captured Context

Feedback submissions can include:

1. App context: app name, route, path, query string.
2. Runtime context: storage provider, Convex enabled, auth status.
3. Character context on character routes:
   1. character id
   2. character name
   3. class name
   4. level
   5. rules version
   6. schema version
4. UI target context from the last clicked element:
   1. generated selector
   2. short label
   3. viewport rectangle

The integration intentionally does not send the full saved character, notes,
inventory, selections, spells, maneuvers, or raw localStorage contents.

## 4. Privacy Boundary

Do not add broad state dumps to Userback custom data. If more context is needed,
add narrow primitive fields that help debugging a specific workflow.

Do not commit real Userback tokens to source files or docs. Keep active tokens in
`.env.local` or deployment environment variables.

## 5. Implementation Notes

Userback custom data is kept flat because the JavaScript SDK expects primitive
values. Route changes refresh page and character metadata. Pointer events refresh
the latest target-element metadata so annotated reports have a useful DOM hint in
addition to Userback's screenshot tools.
