Design System - Copilot Instructions
===================================

Purpose
-------
This file documents the conventions for components that belong to the `design-system` in this repository. These are machine-readable, easy-to-follow instructions intended for Copilot-style assistants and humans contributing new components.

Core rules
----------
- Design-system components are shared UI primitives used across the app.
- Each component MUST export its public API from the component's main file (e.g. `MyComp.tsx`) and have a small `index.ts` in the same component folder that re-exports the component and related types.
- The only top-level barrel file that re-exports components for consumers is `src/design-system/index.ts`. Do not export design-system components from other places.
- Each component MUST have a Storybook story to demonstrate usage. Stories live in a separate `meta/` subfolder (or `stories/`), not in the component root.
- Each component MUST include a unit test (Vitest/Jest) in a `__tests__` folder (next to the component) using the project's test utilities.
- Component source must be clean and minimal: the component folder should contain only the component implementation (`Component.tsx`), its styles (`Component.styles.ts`) and an `index.ts` that re-exports the component. All other artefacts (stories, sample data, docs, README, helpers) should go into a `meta/` subfolder.

File layout (example)
---------------------

src/design-system/MyComponent/
- MyComponent.tsx           // main component implementation
- MyComponent.styles.ts     // styled components / styles
- index.ts                  // export { MyComponent } from './MyComponent'; export type { ... }
- __tests__/                // unit tests for MyComponent
  - MyComponent.test.tsx
- meta/                     // non-production artifacts
  - MyComponent.stories.tsx
  - README.md
  - sampleData.ts
  - stories.helpers.ts

Export rules
------------
- The root `src/design-system/index.ts` must be the single entry point for other packages.
- When adding a new component, add an explicit export line in `src/design-system/index.ts` that exports the component and its types.

Testing
-------
- Each component must include at least one unit test covering:
  - Basic render (render without crashing)
  - Accessibility attributes (e.g., aria-label present where applicable)
  - Interactions (click handlers, navigation) for interactive components

Storybook
---------
- Stories must live in `meta/` and be co-located with their component. This keeps the component folder compact.
- Stories should include at least one story showing the default state and one showing interactive or alternative states.

Why this structure
------------------
- Keeps the runtime import surface minimal and predictable.
- Separates production code from docs and stories, which improves readability and makes automated packaging simpler.
- Ensures every shared component has tests and docs.

Adding a new component checklist
-------------------------------
1. Create `MyComponent.tsx` and `MyComponent.styles.ts` inside `src/design-system/MyComponent/`.
2. Create `index.ts` that re-exports the component and types.
3. Add tests under `__tests__/MyComponent.test.tsx`.
4. Add stories and README inside `meta/`.
5. Add export lines to `src/design-system/index.ts`.
6. Run unit tests and Storybook to validate.

Notes for Copilot
-----------------
- Always read `src/design-system/COPILOT_INSTRUCTIONS.md` before creating or reorganizing components.
- Keep changes atomic and run focused checks (typecheck/tests) only on modified files when the whole repo has pre-existing type errors.
