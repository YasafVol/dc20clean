# Background Section UI Refactoring Memory

## Overview
We have updated the styling of the Background section in the character creation flow to match the Class Selection screen, using white borders and transparent backgrounds instead of purple-themed elements.

## Changes Made
1. Added `StyledActionButton` component to `Background.styles.ts` - a styled button with white borders and transparent background
2. Updated `SkillsTab.tsx` to use `StyledActionButton` for conversion buttons and info sections
3. Updated `TradesTab.tsx` to use `StyledActionButton` for conversion buttons and info sections
4. Updated `LanguagesTab.tsx` to use `StyledActionButton` for conversion buttons
5. Removed conflicting inline styling and event handlers that were interfering with hover effects
6. Standardized the info sections to use white borders on transparent backgrounds

## Styling Approach
- Replaced colored borders with white borders
- Switched colored backgrounds to transparent backgrounds
- Used the `$enabled` prop for StyledActionButton instead of inline styles
- Implemented proper hover effects through styled-components CSS

## Known Issues
- The button functionality has some issues in production that will be fixed separately
- The styling updates are prioritized over functionality fixes for now

## Next Steps
- Test the visual appearance across all sections of the background page
- Ensure consistency with the Class Selection screen
- Address functionality issues in a separate update
