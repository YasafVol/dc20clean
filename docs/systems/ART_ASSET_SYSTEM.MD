# Curated Art Assets

> Purpose: Define the bundled item-icon and creature-art catalog used by Equipage, inventory, and DM Tools.
> Owns: Stable asset IDs, pack provenance, static file paths, image choice and fallback behavior, and attribution.
> Does not own: Equipment mechanics, character persistence, monster statistics, encounter budgets, or user uploads.
> Authoritative source: `src/lib/assets/assetCatalog.ts`, `src/components/AssetPicker.tsx`, and `static/assets/curated/`.
> Related systems: [Equipage](./EQUIPMENT_SYSTEM.MD), [Character Sheet](./CHARACTER_SHEET.MD), [Alternative Character Sheet](./ALTERNATIVE_CHARACTER_SHEET.MD), [Monsters](./MONSTER_SYSTEM_SPEC.MD), [Encounters](./ENCOUNTER_SYSTEM_SPEC.MD), [Database](./DATABASE_SYSTEM.MD).
> Status: Active
> Last Updated: 2026-09-25

## Catalog and UI

1. `ART_ASSETS` contains 40 individual Heroic item icons, 15 Heroic creature portraits, and 15 Monsters & Minions battler sprites. These are selected files from three user-owned itch.io packs, not the source archives or full packs. The asset files total about 30 KB.
2. IDs are stable, category-based strings. Saved objects store the ID, never an asset URL. `getArtAsset` resolves known IDs; missing or retired IDs render no image and do not invalidate older records.
3. `AssetPicker` is the shared Tokyo Night picker. It filters by kind, category, and text, previews one selection, and supports removal. Item icon choices are offered in all five Equipage builders and freeform inventory creation. Creature art is offered in Monster Designer. The same saved monster art appears in its preview, list card, and encounter slot; encounters store only the monster ID.
4. Images use pixelated rendering. Static URLs come from `static/assets/curated/`; the manifest is the only place that maps IDs to those URLs. Adding or removing art requires updating the manifest and corresponding files together. Do not reuse an ID for different art.

## Provenance and release boundary

1. Heroic Icon Pack and Heroic Creature Pack are by Aleksandr Makarov. The original archives include license files. Both permit commercial product use and modification and require product credit. The Icon Pack excludes public hosting except as part of a game or similar product. The Creature Pack prohibits redistribution or repackaging of original or modified assets without signed permission.
2. RPG Monsters & Minions HUGE Pack is by Beowulf. The archive includes no license text. The creator's itch.io comments permit free or commercial digital projects and modification, prohibit redistribution and physical products, and welcome credit.
3. The app footer credits both creators. Source archives, sprite sheets, and unused files are excluded from the repository. Before public deployment, confirm this web tool's use of the embedded images meets each pack's product-use terms, especially the Heroic packs' hosting and redistribution wording.
