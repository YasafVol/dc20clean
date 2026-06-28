# Campaign System — Technical Plan

> Status: Draft for review
> Date: 2026-06-28
> Companion: `2026-06-28-campaign-system-prd.md` (product/UI requirements)
> Branch: `feature/campaign-system`

This plan maps the PRD onto the existing codebase. It is grounded in the current
Convex/auth/storage/sheet architecture (file:line references throughout) and is
organized into independently shippable phases.

---

## 1. Architecture overview

Campaigns are Convex-native. No new infrastructure (no k8s, no push servers, no
queue). The app already uses **live reactive `useQuery`** in production
(`src/lib/hooks/useMonsters.ts:58`, `useEncounters.ts:14`, consumed in
`MonsterList.tsx:40`), so "everyone sees live data" and "notifications" both ride
Convex's existing reactivity: a query re-runs and pushes to all subscribers when
underlying rows change.

Three new tables, one new Convex module, new FE hooks/pages, and a read-only mode
for the existing character sheet. Characters are shared **by reference** (the
membership row lists character IDs); character data is never copied.

## 2. Data model (Convex)

New tables in `convex/schema.ts` (follow the existing `defineTable(...).index(...)`
pattern at `convex/schema.ts:634-663`; `authTables` + `v.id('users')` already in use).

### 2.1 `campaigns`
```
userId: v.id('users')        // creator / DM (ownership, like other tables)
id: v.string()               // app-generated campaign id
code: v.string()             // short join code (e.g. 6 chars, A–Z0–9)
name: v.string()
description: v.optional(v.string())
createdAt: v.string()
lastModified: v.string()
deletedAt: v.optional(v.string())   // soft delete, matches monsters/encounters
```
Indexes: `by_user (['userId'])`, `by_id (['id'])`, `by_code (['code'])`.
`by_code` powers join-by-code; uniqueness enforced in the join/create mutation
(generate-and-retry on collision).

### 2.2 `campaignMembers` (join table)
```
campaignId: v.string()
userId: v.id('users')
role: v.union(v.literal('dm'), v.literal('co_dm'), v.literal('player'))
sharedCharacterIds: v.array(v.string())   // character ids this member exposes
displayName: v.optional(v.string())        // cached for roster labels
joinedAt: v.string()
```
Indexes: `by_campaign (['campaignId'])`, `by_user (['userId'])`,
`by_campaign_and_user (['campaignId','userId'])` (membership lookup + unique guard).

### 2.3 `campaignEvents` (generic feed)
```
campaignId: v.string()
type: v.string()             // 'well_bloodied' | 'member_joined' | 'character_shared' | ...
actorUserId: v.id('users')
characterId: v.optional(v.string())
payload: v.any()             // type-specific (e.g. { characterName, currentHP, maxHP })
createdAt: v.string()
```
Indexes: `by_campaign (['campaignId'])`, `by_campaign_and_time (['campaignId','createdAt'])`.
New event features = new `type` strings; no schema change.

### 2.4 Characters table change
`convex/schema.ts` characters validator is unchanged structurally, but cross-user
reads require fetching a character by `id` regardless of owner. Add index
**`by_id (['id'])`** to `characters` (currently only `by_user`, `by_user_and_id`,
`by_user_and_name` at `convex/schema.ts:636-639`). Owner-scoped queries
(`characters.list`, `characters.getById`) stay exactly as-is.

## 3. Backend functions (`convex/campaigns.ts`, new)

Follow the conventions in `convex/encounters.ts` / `convex/monsters.ts`:
`getAuthUserId(ctx)` first; return `[]`/`null` for unauthenticated queries; throw
for unauthenticated mutations; index-based lookups.

**Shared helper** (module-local): `requireMembership(ctx, campaignId)` → resolves
`userId`, loads the `campaignMembers` row via `by_campaign_and_user`, throws if
absent; returns `{ userId, member }`. `requireManager` / `requireDm` wrap it with
role checks. Every function below calls one of these.

### Queries (all membership-gated, all reactive)
- `listMyCampaigns()` → campaigns where the caller has a `campaignMembers` row
  (query members `by_user`, then load campaigns by id). Returns campaign + role.
- `getCampaign({ id })` → campaign header + members + caller role; members only.
- `getRoster({ campaignId })` → for each member's `sharedCharacterIds`, load the
  character docs (via `characters` `by_id`) and project roster fields
  (finalName, owner, className, level, `characterState.resources.current.currentHP`,
  `finalHPMax`, derived status). Members only. **This is the live read** other
  members subscribe to.
- `listEvents({ campaignId, limit? })` → `campaignEvents` `by_campaign_and_time`,
  newest first. Members only.

### Mutations
- `createCampaign({ name, description? })` → generate unique `code`, insert
  campaign + DM `campaignMembers` row.
- `joinByCode({ code })` → look up `by_code`; if found and not already a member,
  insert player membership; emit `member_joined` event. Throws "invalid code".
- `leaveCampaign({ campaignId })` → delete caller's membership (DM blocked unless
  deleting; transfer is future).
- `shareCharacter({ campaignId, characterId })` / `unshareCharacter(...)` →
  validate the caller owns the character (`characters` `by_user_and_id`) and it is
  cloud-stored; add/remove from `sharedCharacterIds`; emit `character_shared`.
- `renameCampaign`, `regenerateCode` → `requireManager`.
- `kickMember({ campaignId, targetUserId })`, `setMemberRole({..., role})` →
  `requireManager` (only DM may set/relinquish `dm`).
- `deleteCampaign({ campaignId })` → `requireDm`; soft-delete + cascade member/event
  cleanup (or filter soft-deleted on read, matching existing pattern).
- `postEvent({ campaignId, type, characterId?, payload })` → `requireMembership`;
  validate `characterId` (if present) belongs to / is shared by the caller.
  Generic entry point used by the notification producer (§6).

### Auth identity helper (`convex/auth.ts` or new `convex/users.ts`)
The client currently has **no user id** (`AuthModeContext` exposes only
`isAuthenticated`/`isConvexEnabled`, `src/components/auth/AuthModeContext.tsx:23-32`).
Add `getCurrentUser()` query returning `{ userId, name? }` via `getAuthUserId`, so
the roster UI can mark "You" vs others and gate owner-only actions client-side
(server still authoritative).

## 4. Frontend data layer (`src/lib/hooks/useCampaigns.ts`, new)

Mirror `useMonsters.ts` / `useEncounters.ts` (reactive `useQuery` + `useMutation`):
- `useMyCampaigns()` → `useQuery(api.campaigns.listMyCampaigns)`.
- `useCampaign(id)` → `getCampaign` (skip when null).
- `useCampaignRoster(id)` → `getRoster` (live; drives the roster table + status).
- `useCampaignEvents(id)` → `listEvents` (live; drives feed + toasts).
- `useCampaignMutations()` → create/join/leave/share/unshare/rename/regenerate/
  kick/setRole/delete/postEvent.
- `useCurrentUser()` → `getCurrentUser`.

Types: add `SavedCampaign`, `CampaignMember`, `CampaignEvent`, `RosterEntry` to
`src/lib/types/` (new `campaign.ts`), referenced by hooks and components.

## 5. Routing, menu, i18n

- **Routes** in `src/App.tsx` (registered alongside `/dm/*`, ~`App.tsx:100-135`):
  - `/campaigns` → `CampaignList`
  - `/campaigns/:id` → `CampaignDetail`
  - `/campaigns/join/:code` → `JoinCampaign` (resolves code, joins, redirects)
- **Pages** under new `src/routes/campaigns/` (mirror `src/routes/dm/*` structure;
  `CampaignList.tsx`, `CampaignDetail.tsx`, `JoinCampaign.tsx`, `index.ts`).
- **Menu** new "Campaigns" section in `src/components/Menu.tsx`, gated by
  `isAuthenticated` + Convex mode exactly like the DM Tools section
  (`Menu.tsx:270`). Entries: My Campaigns, Join Campaign.
- **i18n** add `menu.campaignsSection`, `menu.myCampaigns`, `menu.joinCampaign`
  and page strings to `src/i18n/locales/en.json` + `es.json`.
- Gate page bodies with `AuthGuard` (`src/components/auth/AuthGuard.tsx:28`).

## 6. Notifications (event production + delivery)

**Delivery** (easy, reactive): components subscribe via `useCampaignEvents(id)`;
the feed renders the list; a small app-level watcher diffs the newest events and
raises a toast through the existing `Snackbar` (`src/components/Snackbar.tsx`).

**Production** (the integration point): the *owner's* client emits an event when a
watched threshold crosses. Reuse existing status logic — `death.ts` `getHealthStatus`
computes `well-bloodied` at `currentHP ≤ floor(maxHP/4)` (`src/lib/rulesdata/death.ts:20-72`),
and HP lives at `characterState.resources.current.currentHP`
(`src/lib/types/dataContracts.ts:33`), updated through `useCharacterSheetReducer`
(`updateHP` etc., `useCharacterSheetReducer.ts:632`).

Add a watcher hook used by the character sheet **for the owner only**: when the
character is shared into one or more campaigns and its health status transitions
into a notable state, call `postEvent` for each such campaign. Implementation:
- A query `getCampaignsForCharacter({ characterId })` (membership rows where the
  character id is in `sharedCharacterIds`) tells the client which campaigns to
  notify.
- An effect in `CharacterSheetProvider` (near the auto-save effect,
  `CharacterSheetProvider.tsx:518-530`) tracks previous status and fires `postEvent`
  on an upward-crossing transition (debounced/deduped to avoid spam on toggling).

This keeps event production client-driven and generic. A future hardening option
(server-derived events on character patch) is noted in §9 but out of scope now.

## 7. Read-only character sheet (non-owner view)

The sheet has **no read-only mode today** and always auto-saves
(`CharacterSheetProvider.tsx:515-530`). Add an `isReadOnly` capability:
- `CharacterSheetProvider` accepts `readOnly?: boolean` (and/or derives it by
  comparing the loaded character's owner to `useCurrentUser()`).
- Gate every mutation in `useCharacterSheetReducer` (the `update*`/`toggle*`
  callbacks, `useCharacterSheetReducer.ts:632-791`) to no-op when read-only.
- Skip the debounced auto-save effect when read-only
  (`CharacterSheetProvider.tsx:526`).
- Disable edit controls in UI (Resources steppers `Resources.tsx:43-100`,
  `ActiveConditionsTracker.tsx:265-318`, notes/inventory/attacks) and show a
  "Read-only — viewing <owner>'s character" banner.
- Loading a co-member's character requires the member-gated fetch (a campaign
  query returning the character doc, or `characters.getByIdForMember` validating
  membership) rather than the owner-scoped `characters.getById`.

Route: reuse `/character/:id` with a read-only signal (e.g. router state / query
param indicating campaign context), or a dedicated
`/campaigns/:id/character/:characterId` that renders the same sheet in read-only.
Decision deferred to implementation; prefer reuse with a `readOnly` prop.

## 8. Security

- Every campaign query/mutation authenticates (`getAuthUserId`) and authorizes via
  `requireMembership`/`requireManager`/`requireDm` before reading or writing. No
  authorization is trusted from the client.
- Read of another user's character is allowed **only** through membership-gated
  campaign queries; the owner-scoped `characters.*` functions are untouched, and
  no mutation lets a non-owner write another user's character (read-only is
  structural, not just UI).
- `joinByCode` validates the code server-side; `regenerateCode` invalidates the
  old code. `postEvent` validates the actor is a member and may only attribute a
  `characterId` they own/share.
- New `by_id` index on `characters` only enables fetch-by-id; access control is
  still enforced in the campaign query that uses it.

## 9. Risks / open decisions
- **Client-emitted events** are trusted from the owner's client (consistent with
  the existing client-authored character data model). Acceptable for MVP; server-
  derived events are a future hardening.
- **Code collisions**: generate-and-retry against `by_code`; codes are short for
  shareability — keep enough entropy (≥ 6 chars) and retry on the unique check.
- **Roster fan-out cost**: `getRoster` loads N character docs per render; fine for
  table-stakes party sizes (≤ ~8). If it grows, project a lightweight summary doc.
- **Read-only route shape**: reuse `/character/:id` + `readOnly` vs dedicated route
  — decide during Phase 3.
- **DM leaving**: not supported in MVP (delete only); ownership transfer is future.

## 10. Phases (each independently shippable + tested)

**Phase 1 — Backend foundation**
Schema (3 tables + `characters.by_id`), `convex/campaigns.ts` (all queries/mutations
+ membership/role helpers), `getCurrentUser`. Convex unit tests for the permission
matrix and join/leave/kick/regenerate/membership-gated reads. `npx convex deploy`.

**Phase 2 — Campaign CRUD + join UI**
Types, `useCampaigns` hooks, routes + Menu section + i18n, `CampaignList`,
`CampaignDetail` (header + code/link + DM controls), `JoinCampaign`. Share/unshare
character picker (with the cloud-only constraint surfaced).

**Phase 3 — Roster + read-only viewing**
`getRoster` + roster table with live HP/status, member management actions, and the
read-only character sheet (`isReadOnly` in provider + reducer gating + disabled
controls + banner).

**Phase 4 — Events + notifications**
`campaignEvents` feed panel, toast delivery, the owner-side well-bloodied watcher
(+ `member_joined`, `character_shared`). End-to-end: HP drop → event → toast/feed
on other clients.

## 11. Testing
- **Convex**: unit tests per function — permission matrix (role × action),
  join/leave/kick/regenerate (old code invalid), membership-gated reads deny
  non-members, event fan-out (post → roster/feed query reflects it).
- **FE hooks/components**: reactive hooks render loading→data; roster table maps
  fields; read-only sheet renders controls disabled and performs no save.
- **E2E (Playwright)**: create → join (2nd identity) → share → view read-only →
  HP-drop event toast. Follows existing `e2e/` patterns.
- Coverage rules per `docs/systems/TESTING_SYSTEM.MD`.

## 12. Documentation
On completion, add `docs/systems/CAMPAIGN_SYSTEM.MD` (per AGENTS.md) covering the
schema, function catalog, permission matrix, event types, read-only sheet, and the
notification production/delivery path; cross-link from `AGENTS.md`,
`DATABASE_SYSTEM.MD`, and `CHARACTER_SHEET.MD`.

## 13. Touched files (summary)
- New: `convex/campaigns.ts`; `src/lib/hooks/useCampaigns.ts`;
  `src/lib/types/campaign.ts`; `src/routes/campaigns/{CampaignList,CampaignDetail,JoinCampaign,index}.tsx`;
  `docs/systems/CAMPAIGN_SYSTEM.MD`; tests.
- Modified: `convex/schema.ts` (3 tables + `characters.by_id`);
  `convex/auth.ts`/new `users.ts` (`getCurrentUser`); `src/App.tsx` (routes);
  `src/components/Menu.tsx` (section); `src/i18n/locales/{en,es}.json`;
  `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx` +
  `useCharacterSheetReducer.ts` (read-only gating); sheet edit components
  (disable controls in read-only).
