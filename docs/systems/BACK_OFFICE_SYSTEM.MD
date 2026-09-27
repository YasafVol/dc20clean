# DC20Clean — Back Office

> Purpose: Private, read-only workspace for understanding system specifications and reviewing stored monsters.
> Owns: Reviewer access, system-document navigation and rendering, monster review queries, and back-office routes.
> Does not own: Rules interpretation, monster editing or approval, source imports, general user administration, or documentation authoring.
> Authoritative source: `convex/backOffice.ts`, `convex/lib/backOfficeAccess.ts`, `src/routes/back-office/`, and `scripts/back-office/generateSystems.mjs`.
> Related systems: [Architecture](./PROJECT_TECHNICAL_OVERVIEW.MD), [Database](./DATABASE_SYSTEM.MD), [Monsters](./MONSTER_SYSTEM_SPEC.MD), [Testing](./TESTING_SYSTEM.MD).
> Status: Active
> Last Updated: 2026-09-28

## 1. Access and routes

1. `/back-office` and `/back-office/systems` open the system reader; `/back-office/systems/:documentId` opens a specific Markdown specification.
2. `/back-office/monsters` opens the monster list; `/back-office/monsters/:monsterId` uses the Convex document ID to open a stored stat block.
3. Access requires real Convex authentication and a server-owned user record with a verified email matching `yasaf.vol@gmail.com` or `nzinger@gmail.com` (Nir Zinger). Client-provided identity, local mode, and `VITE_BYPASS_AUTH` cannot grant access.
4. `backOffice.access` returns only a boolean. Every content query independently checks access before reading data or returning documents. Unknown, signed-out, and unverified accounts receive no review content.
5. The menu and homepage navigation expose the Back office link only after server confirmation. Direct links display sign-in, restricted-access, loading, unavailable-record, and query-failure states as appropriate. A missing back-office query displays a specific backend deployment message.
6. The workspace exports no mutations. It does not confer rights to existing monster mutation functions.

## 2. System reader

1. `docs/systems/` remains the documentation authority. The reader does not author or rewrite these files.
2. `systemNavigation.ts` supplies three overlapping reading views:
   1. Verticals: character building, rules and equipment, and the DM workspace.
   2. Flows: build/save/play, progression/upgrade/export, and monster/encounter/campaign preparation.
   3. Horizontals: shared mechanics, data/compatibility, and platform/quality.
3. These are curated navigation paths. They do not assert a complete FITL architecture or introduce another behavior specification. Horizontals here means shared systems; FITL's architectural layers are not relabeled as systems.
4. Search matches the full Markdown across all active documents and combines with the optional selected area. Without an area filter every specification remains discoverable, including newly added files.
5. Metadata displays purpose, ownership, exclusions, authority, and the recorded update date. Missing metadata is shown as unrecorded, not inferred.
6. The reader supports headings, an on-page outline, fenced code, lists, tables, and links between known system documents. External HTTP(S) links open separately. Other repository references are displayed without pretending that they are application pages. Raw HTML is not executed.
7. `backoffice:generate` snapshots only Markdown files directly under `docs/systems/` into `convex/backOfficeData/systems.json`. The snapshot is imported solely by the protected backend, never by public browser bundles or static assets.
8. `predev`, `prebuild`, and `preconvex:dev` regenerate the snapshot. `backoffice:check` detects drift. Direct Convex deployment commands must run `npm run backoffice:generate` first so the backend receives current documentation. Frontend builds alone do not update deployed Convex content.

## 3. Monster review

1. Reviewers can read active official, custom, and homebrew monsters across owners, including private and pending records. Soft-deleted records are excluded from both lists and details.
2. Lists use bounded reactive pagination, 30 initial records and at most 50 per backend page. Name search uses a Convex search index; role/tier filters apply to the complete query, not just loaded rows. Empty-search queries use indexes for the active filter combination.
3. Detail displays persisted HP, PD, AD, attack, save DC, damage, attributes, feature points, actions, descriptions, lore, tactics, visibility, and approval state. It does not recalculate, migrate, or save monsters.
4. Referenced features are resolved by application ID using the indexed feature catalog, preferring official entries, then the monster owner's entries, then approved public entries. Missing references are explicitly visible.
5. Existing fork metadata is displayed when available. The current monster schema has no source-document/page fields; the reader explicitly displays the absence of a stored source reference rather than assigning a publication or page.
6. Search and filters survive opening a detail link. A missing, deleted, or invalid record cannot produce an editable designer.

## 4. Verification

1. `convex/backOffice.test.ts` proves both reviewers' access, signed-out/unverified/other-account denial on every content query, pagination, complete-query role/tier filtering, search, deleted-record exclusion, and feature-reference resolution.
2. Reader navigation tests check document coverage and system-link resolution; UI tests check access states, system/monster review interactions, and overflow at phone, tablet, and desktop widths.
3. Verify the production browser bundle contains no system snapshot text. Backend deployment and authorized live sign-in are separate from local implementation verification.
