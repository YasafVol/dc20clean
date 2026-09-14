# Rulebook System

> Purpose: Passive in-app reading surface for the DC20 rules Markdown.
> Owns: Rulebook source ingestion, generated article boundaries, table of contents, search index, routes, lazy loading, and reader presentation.
> Does not own: Rules interpretation, character data, game calculations, character creation, or mutation of rules content at runtime.
> Authoritative source: `docs/assets/dc20-0.10.5/marker-ingestion/DC20 RPG 0.10.5 Beta v1.cleaned.md`, `docs/assets/dc20-0.10.5/rulebook-artifact/manifest.json`, and `src/routes/rulebook/`.
> Related systems: [Project Technical Overview](./PROJECT_TECHNICAL_OVERVIEW.MD), [Testing](./TESTING_SYSTEM.MD), [Versioning](./VERSIONING_SYSTEM.MD).
> Status: Active
> Last Updated: 2026-07-21

## 1. Scope

1. The Rulebook is a passive reference surface at `/rulebook` and `/rulebook/:groupId/:articleId`.
2. It does not write data, calculate rules, mutate characters, or link into character creation.
3. It is currently public like the other reference tools.
4. Future graph/atomic-rule work should build on this source boundary, not on route-local UI state.

## 2. Source Content

1. Full cleaned Markdown source:
   `docs/assets/dc20-0.10.5/marker-ingestion/DC20 RPG 0.10.5 Beta v1.cleaned.md`
2. Default table-of-contents source:
   `docs/assets/dc20-0.10.5/marker-ingestion/VISUAL_TOC_DRAFT.md`
3. The source files are generator inputs and are not imported by the runtime reader.
4. The visible TOC comes from the generated manifest; front matter remains in the artifact but is hidden from the passive reader.
5. The generated normalized artifact lives at `docs/assets/dc20-0.10.5/rulebook-artifact/` and is produced by `npm run rulebook:generate:0105`.
6. The generator preserves both source files and writes three artifact surfaces:
   1. `manifest.json` for stable hierarchy and source metadata.
   2. `articles/**/*.md` for article-level Markdown chunks.
   3. `mapping-report.json` for unresolved or ambiguous source mappings.
   4. `search-index.json` for deferred full-text search records.

## 2.1 Generated Article Boundary

1. Major PDF TOC entries such as `Core Rules`, `Combat Rules`, and `Classes` are navigation groups, not article files.
2. Their direct children are article files. Examples include `Attributes & Prime Modifier`, `Combat Resources`, and `Barbarian`.
3. Deeper PDF TOC entries remain headings and stable anchors inside their owning article.
4. Source headings absent from the PDF TOC remain micro-headings inside the nearest article.
5. The PDF TOC hierarchy overrides Marker heading levels during artifact generation.
6. Generated article and TOC-backed headings carry `<!-- rulebook-id: ... -->` comments and matching manifest `domId` values so future links and graph edges do not depend on display text.

## 3. UI Behavior

1. Home screen entry:
   `src/components/Menu.tsx` adds `Rule Book` under Reference Tools.
2. Route:
   `src/App.tsx` maps `/rulebook/*` to `src/routes/rulebook/Rulebook.tsx`.
3. Default view:
   The route opens on a manifest-backed table of contents. Each article is a real internal link.
4. Reader view:
   An article route loads and renders one generated Markdown article. The URL is the source of truth, so refresh, browser history, and direct links preserve the article.
5. Search:
   Search loads `search-index.json` on first use, ranks exact heading matches before body matches, and links to the owning article plus stable heading hash.
6. Article navigation:
   Articles expose breadcrumbs, a local outline, and previous/next article links.
7. Localization:
   Reader controls and status text use i18n. Rule content and generated titles remain in the source language.

## 4. Loading Strategy

1. Current approach:
   Eagerly load the small generated manifest inside the lazy Rulebook route.
2. Rationale:
   The home screen should not ship rules content, and opening the Rulebook should not construct the complete rulebook DOM.
3. Tradeoff:
   Vite emits each article as an independent lazy module. The largest spell article is still materially larger than ordinary articles because the source TOC groups all spells under one article.
4. Search loading:
   The full-text index is a separate dynamic chunk loaded only after a non-empty search query.
5. Rendering:
   `react-markdown` with `remark-gfm` owns Markdown semantics. A small local remark plugin maps generated `rulebook-id` comments onto stable heading DOM IDs.

## 5. Known Limits

1. The route has no source-PDF preview, backlinks, tags, annotations, or graph traversal.
2. Page numbers are provenance labels; they do not open the source PDF.
3. Generated IDs are deterministic from the current TOC. Cross-version aliases must be added before IDs are renamed in a future rules release.
4. It does not enforce authentication until the broader auth TODO is implemented.

## 6. Test Expectations

1. `npm run rulebook:generate:0105` must finish with zero unresolved and zero ambiguous mappings.
2. `rulebookData.test.ts` validates manifest integrity, public TOC filtering, route construction, article neighbors, and search ranking.
3. `e2e/15-rulebook.e2e.spec.ts` covers TOC navigation, lazy article rendering, GFM tables, search, and stable heading hashes on desktop and mobile.
4. Production builds must keep article Markdown and the search index outside the main application chunk.
