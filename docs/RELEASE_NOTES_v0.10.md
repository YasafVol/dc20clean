# DC20Clean v0.10.0 Release Notes

## Overview

This release aligns the character builder with the DC20 Beta v0.10 ruleset and updates the
UI, rules data, and PDF export to match the new systems and terminology.

## Highlights

- Full v0.10 rules implementation for leveling (1-10), talents, and progression.
- Spells and maneuvers split into dedicated creation steps with a revamped spell system.
- PDF export updated to the v0.10 template with expanded field coverage.
- New Conditions reference, Spellbook, and Custom Equipment Builder apps.

## Rules and Data

- v0.10 class progressions, features, and talents across 13 classes; Psion marked experimental.
- Techniques removed; maneuvers updated and expanded per v0.10.
- Spell schools and tags overhauled; class spell access derived from class features.
- Background, traits, effects, and calculation systems aligned to v0.10.

## UI and UX

- Character creation flow updated with new stepper layout and validation improvements.
- Character sheet updates including Conditions widget and mobile refinements.
- Unified styling pass and Tailwind migration completion.

## Storage and Infrastructure

- Convex schema and auth scaffolding with adapters (localStorage remains the default).
- Structured logging integrated with Sentry and Vercel Analytics.
- Schema versioning system updated to `2.1.0` with auto-migration for legacy data.

## PDF Export

- v0.10 field map and template are now default with 0.9.5 fallback support.
- Feature, misc, and inventory fields now populate from character data.

## Documentation

- Expanded system docs for v0.10 rules, leveling, spells, martials, equipment, and PDF export.
- Migration notes included for v0.9.5 to v0.10 changes.
