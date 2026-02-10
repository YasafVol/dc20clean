# DC20Clean – Systems Explorer

> Purpose: Hidden internal route for visually exploring app systems from `docs/systems` using React Flow.
> Status: Active
> Last Updated: 2026-02-10

---

## 1. Overview

The Systems Explorer is a hidden route (`/systems`) intended for internal architecture navigation.
It displays system docs as a graph and lets developers switch between curated views from a dropdown overlay.

The route is not linked from the menu and must be accessed directly.

---

## 2. Key Files

| File                                            | Role                                                               |
| ----------------------------------------------- | ------------------------------------------------------------------ |
| `src/routes/systems/SystemsExplorer.tsx`        | Page-level React Flow canvas, overlays, and view switching         |
| `src/routes/systems/systemsGraphData.ts`        | Source data for systems metadata, views, and relationships         |
| `src/routes/systems/components/SystemNode.tsx`  | Custom node renderer                                               |
| `src/routes/systems/components/NodeTooltip.tsx` | Tooltip UI for node details (React Flow NodeToolbar-based pattern) |
| `src/App.tsx`                                   | Registers hidden `/systems` route                                  |

---

## 3. Data Model

Each system node includes:

- `id`
- `title`
- `purpose`
- `docPath`
- `lastUpdated`
- `category`
- `relatedSystemIds`

This data is intentionally docs-driven and mirrors the current `docs/systems` catalog.

---

## 4. Views

Supported views:

- All Systems
- Architecture & Cross-Cutting
- Character Creation
- Character Sheet
- DM Tools
- Infrastructure
- Conventions

Selecting a view rebuilds and refits the graph for that slice.

---

## 5. Interaction

- Pan/zoom canvas via React Flow controls
- Minimap is intentionally disabled to keep focus on node exploration and reduce visual clutter
- Canvas controls are styled to match the app's dark fantasy theme
- Hover a node to see tooltip details:
  - system title
  - purpose summary
  - doc path
  - last-updated date
- Dropdown overlay controls active system view

## 5.1 Layout

- Explorer canvas container is centered and constrained to roughly half-page width on desktop.
- On smaller viewports, the canvas expands to full width for usability.

---

## 6. Dependencies

- `@xyflow/react` (React Flow)

---

## 7. Testing

- `src/routes/systems/systemsGraphData.test.ts` validates:
  - all relationship IDs resolve to existing system IDs
  - each configured view returns at least one system
