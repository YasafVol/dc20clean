# DC20Clean — Campaign System

> Purpose: Multi-player campaign layer: campaign management, membership, character sharing, live event notifications, and read-only sheet viewing.
> Status: Active
> Last Updated: 2026-06-28

---

## 1. Overview

The Campaign System lets a Dungeon Master create a named campaign, share a join code with players, and view shared character sheets in real time. Players share one or more of their own characters into a campaign; the DM (and optionally Co-DMs) can view those sheets and receive HP-state change notifications as toasts.

All campaign data lives in Convex (cloud only). The system requires `VITE_USE_CONVEX=true`.

### Key features

- Campaign creation and join-by-code flow
- Role-based permission model (DM / Co-DM / Player)
- Character sharing within a campaign
- Live event feed (`campaignEvents` table, Convex real-time subscriptions)
- App-level toast notifications for notable HP transitions
- Read-only character sheet view for campaign members

---

## 2. Database Schema

All three tables use **soft-delete**: every record has an optional `deletedAt` field. All reads filter `deletedAt === undefined`. Hard deletion is never performed.

### 2.1 `campaigns`

```typescript
{
  userId: Id<'users'>,          // creator / DM (owner)
  id: string,                   // app-generated id, e.g. "camp_<uuid>"
  code: string,                 // 6-char alphanumeric join code
  name: string,
  description?: string,
  createdAt: string,            // ISO timestamp
  lastModified: string,         // ISO timestamp
  deletedAt?: string,           // soft-delete timestamp
}
```

**Indexes:**

| Index name   | Fields   | Notes                                                                 |
| ------------ | -------- | --------------------------------------------------------------------- |
| `by_user`    | `userId` | List all campaigns owned by a user                                    |
| `by_app_id`  | `id`     | Lookup by app-level string id. Named `by_app_id` because `by_id` is reserved by the Convex platform |
| `by_code`    | `code`   | Join-by-code lookup                                                   |

### 2.2 `campaignMembers`

```typescript
{
  campaignId: Id<'campaigns'>,
  userId: Id<'users'>,
  role: 'dm' | 'co_dm' | 'player',
  sharedCharacterIds: string[],   // app-level character ids shared by this member
  displayName?: string,           // captured at join time from user profile
  joinedAt: string,               // ISO timestamp
  deletedAt?: string,             // soft-delete timestamp
}
```

**Indexes:**

| Index name                | Fields                  | Notes                                              |
| ------------------------- | ----------------------- | -------------------------------------------------- |
| `by_campaign`             | `campaignId`            | List all members of a campaign                     |
| `by_user`                 | `userId`                | List all campaigns a user belongs to               |
| `by_campaign_and_user`    | `campaignId`, `userId`  | Point lookup — membership check and auth helpers   |

### 2.3 `campaignEvents`

```typescript
{
  campaignId: Id<'campaigns'>,
  type: string,                  // event type string, e.g. "well_bloodied"
  actorUserId: Id<'users'>,      // who triggered the event
  characterId?: string,          // optional app-level character id
  payload: any,                  // event-specific data
  createdAt: string,             // ISO timestamp
  deletedAt?: string,            // soft-delete timestamp
}
```

**Indexes:**

| Index name               | Fields                        | Notes                                    |
| ------------------------ | ----------------------------- | ---------------------------------------- |
| `by_campaign`            | `campaignId`                  | All events in a campaign                 |
| `by_campaign_and_time`   | `campaignId`, `createdAt`     | Ordered event feed (used by `listEvents` with `.order('desc')`) |

---

## 3. Backend: `convex/campaigns.ts`

### 3.1 Auth helpers

Three internal helpers enforce the permission hierarchy. Each throws on failure.

| Helper              | Requirement              |
| ------------------- | ------------------------ |
| `requireMembership` | Caller is an active (non-deleted) member of the campaign |
| `requireManager`    | Caller has role `dm` OR `co_dm`                          |
| `requireDm`         | Caller has role `dm` only                                |

All helpers query `campaignMembers` via the `by_campaign_and_user` index.

### 3.2 Queries

| Export                    | Args                               | Returns                              | Description |
| ------------------------- | ---------------------------------- | ------------------------------------ | ----------- |
| `listMyCampaigns`         | `{}`                               | `CampaignWithRole[]`                 | All active campaigns where the caller is a member, with their role |
| `getCampaign`             | `{ id: string }`                   | `CampaignDetail \| null`             | Full campaign detail + all active members + caller's role. Returns `null` if not a member |
| `getRoster`               | `{ campaignId: string }`           | `RosterEntry[]`                      | Flattened list of all shared characters across all members, with HP data |
| `listEvents`              | `{ campaignId: string, limit?: number }` | `CampaignEvent[]`              | Most recent events (default 50), ordered newest-first |
| `getCampaignsForCharacter`| `{ characterId: string }`          | `Array<{ campaignDocId, memberDocId }>` | Which campaigns share a given character — used by the event producer |

### 3.3 Mutations

| Export             | Auth required  | Description |
| ------------------ | -------------- | ----------- |
| `createCampaign`   | Authenticated  | Creates campaign + DM membership record. Generates a unique join code (up to 10 retries). Returns `{ id: string }` |
| `joinByCode`       | Authenticated  | Finds campaign by code (case-insensitive), inserts or restores a `player` membership. Posts a `member_joined` event. Returns `{ id, alreadyMember }` |
| `leaveCampaign`    | Member         | Soft-deletes the caller's membership. DM cannot leave (must delete campaign instead) |
| `shareCharacter`   | Member         | Verifies caller owns the character (`by_user_and_id` index), then appends to `sharedCharacterIds`. Posts a `character_shared` event |
| `unshareCharacter` | Member         | Removes character from caller's `sharedCharacterIds` |
| `renameCampaign`   | Manager        | Updates `name`, `description`, `lastModified` |
| `regenerateCode`   | Manager        | Generates and persists a new unique join code. Returns `{ code }` |
| `kickMember`       | Manager        | Soft-deletes a non-DM member's record |
| `setMemberRole`    | DM only        | Promotes or demotes a member between `co_dm` and `player`. Cannot change the DM's role |
| `deleteCampaign`   | DM only        | Cascade soft-deletes: campaign → all members → all events |
| `postEvent`        | Member         | Inserts a `campaignEvents` record. Validates that any supplied `characterId` is in the caller's own `sharedCharacterIds` |

### 3.4 `characters.getByIdForMember` (in `convex/characters.ts`)

A dedicated query that provides secure cross-user character access for campaign viewing.

**Three-layer guard:**

1. **Auth check** — caller must be authenticated.
2. **Membership check** — campaign exists and caller is an active member (via `by_campaign_and_user` index).
3. **Sharing check** — the requested character appears in at least one active member's `sharedCharacterIds`.

Returns the full character document or `null` if any guard fails. Uses `by_app_id` for both the campaign and character lookups.

---

## 4. Permission Matrix

| Action                                 | DM  | Co-DM | Player |
| -------------------------------------- | --- | ----- | ------ |
| View roster / view shared characters   | Yes | Yes   | Yes    |
| Share / unshare own character          | Yes | Yes   | Yes    |
| Leave campaign                         | Yes | Yes   | Yes    |
| Rename campaign, regenerate join code  | Yes | Yes   | No     |
| Kick member                            | Yes | Yes   | No     |
| Promote / demote Co-DM                 | Yes | No    | No     |
| Delete campaign                        | Yes | No    | No     |

Notes:
- The DM cannot leave — they must delete the campaign.
- `setMemberRole` is guarded by `requireDm`; Co-DMs cannot promote/demote others.
- `kickMember` cannot target the DM.

---

## 5. Join Code Security

Join codes are generated by `generateCode()` in `convex/campaigns.ts`:

```typescript
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 32 chars
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => chars[b % chars.length]).join('');
}
```

- Uses `crypto.getRandomValues` — cryptographically random, NOT `Math.random()`.
- 32-character alphabet: `256 % 32 = 0`, so there is **zero modulo bias**.
- Ambiguous characters (0, 1, I, O) are excluded for readability.
- `createCampaign` and `regenerateCode` both retry up to 10 times on collision.
- `joinByCode` normalises the input to uppercase before lookup.

---

## 6. Event System

### 6.1 Built-in event types

| Type               | Produced by          | Payload fields                                     |
| ------------------ | -------------------- | -------------------------------------------------- |
| `member_joined`    | `joinByCode`         | `{ displayName }`                                  |
| `character_shared` | `shareCharacter`     | `{ characterName }`                                |
| `well_bloodied`    | `useCampaignEventProducer` | `{ characterName, currentHP, maxHP }`        |
| `bloodied`         | (reserved / future)  | `{ characterName, currentHP, maxHP }`              |

### 6.2 Adding a new event type

1. **Producer side**: emit the new type string via `postEvent` (client-side) or a Convex action (server-side).
2. **Feed display**: add a `case` to `formatEvent` in `src/routes/campaigns/CampaignDetail.tsx`.
3. **Toast delivery**: add a `case` to `eventMessage` in `src/lib/hooks/useCampaignToasts.ts`.

---

## 7. Frontend Architecture

### 7.1 Key files

| File | Role |
| ---- | ---- |
| `src/lib/types/campaign.ts` | TypeScript types: `SavedCampaign`, `CampaignMember`, `CampaignEvent`, `RosterEntry`, `CampaignWithRole`, `CampaignDetail` |
| `src/lib/hooks/useCampaigns.ts` | All query and mutation hooks: `useMyCampaigns`, `useCampaign`, `useCampaignRoster`, `useCampaignEvents`, `useCampaignsForCharacter`, `useCampaignMutations` |
| `src/components/auth/CurrentUserContext.tsx` | Current user provider |
| `src/routes/campaigns/CampaignList.tsx` | Campaign list page |
| `src/routes/campaigns/CampaignDetail.tsx` | Campaign detail: roster table, event feed, management controls, share picker |
| `src/routes/campaigns/JoinCampaign.tsx` | Join-by-code page |
| `src/routes/campaigns/CampaignCharacterView.tsx` | Read-only sheet route |
| `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx` | Sheet provider — read-only mode |
| `src/routes/character-sheet/hooks/useCampaignEventProducer.ts` | HP-state event producer |
| `src/lib/hooks/useCampaignToasts.ts` | App-level toast watcher and `CampaignEventWatcher` component |

---

## 8. Read-Only Sheet Mode

### 8.1 Trigger

`CharacterSheetProvider` accepts an optional `campaignId?: string` prop. When present, `readOnly = true` is set for the entire session:

```typescript
export function CharacterSheetProvider({ children, characterId, campaignId }) {
  const readOnly = !!campaignId;
  // ...
}
```

### 8.2 Load path

When `campaignId` is set, the character is loaded via `characters.getByIdForMember` (the three-layer guarded Convex query) rather than the local storage adapter:

```typescript
const campaignCharacter = useQuery(
  api.characters.getByIdForMember,
  campaignId ? { campaignId, characterId } : 'skip'
);
```

### 8.3 Save effects suppressed

- **Auto-save effect**: skipped if `readOnly`, so no debounced writes fire.
- **`saveNow`**: early return when `readOnly`.
- **`retryFailedSave`**: guarded by `if (readOnly || !state.character) return`.

### 8.4 Reducer no-op guards

`useCharacterSheetReducer` receives `readOnly` as a parameter. All reducer callbacks that mutate state (HP changes, condition toggles, inventory edits, etc.) are guarded: `if (readOnly) return`. This ensures the sheet is fully interactive-looking but writes nothing.

### 8.5 Read-only banner

`CharacterSheetRedesign.tsx` renders a banner above the sheet when `readOnly` is truthy:

```tsx
{readOnly && (
  <div ...>
    Read-only — viewing {state.character?.finalName ?? 'character'}'s sheet
  </div>
)}
```

---

## 9. Notification Production (`useCampaignEventProducer`)

Located in `src/routes/character-sheet/hooks/useCampaignEventProducer.ts`.

The hook fires `postEvent` mutations after a character is saved when the character transitions into a notable HP state.

```
CharacterSheetProvider saves character
  → savedHP / savedMaxHP state updated
    → useCampaignEventProducer effect runs
      → getHealthStatus(savedHP, savedMaxHP, deathThreshold)
        → compare to prevStatusRef
          → if transition into notable state → postEvent
```

**Notable states**: `well-bloodied`, `deaths-door`, `dead`.

**De-duplication**: `prevStatusRef` stores the previous status. Events only fire on *transitions into* notable states, never when the status is unchanged.

**First-load guard**: `if (prevStatus === null) return` — the first render after mount never fires an event (prevents replaying state on page load).

**No-op guards**:
- `readOnly` — passes `null` to `useCampaignsForCharacter` so no campaigns are found.
- No campaigns linked — effect short-circuits.

**Event types emitted**: `well_bloodied`, `deaths_door`, `dead` (mapped from status strings).

---

## 10. Notification Delivery (`useCampaignToasts`)

Located in `src/lib/hooks/useCampaignToasts.ts`.

The hook is mounted once at the app level (e.g. in `App.tsx`). It creates one `CampaignEventWatcher` render-null component per active campaign.

```
useCampaignToasts (app-level)
  ├── CampaignEventWatcher (campaign A) → useCampaignEvents(A) → real-time subscription
  ├── CampaignEventWatcher (campaign B) → useCampaignEvents(B) → real-time subscription
  └── ...
```

### Mount-timestamp guard

`mountTimestamp` is recorded once via `useRef(new Date().toISOString())`. `CampaignEventWatcher` skips any event whose `createdAt` is older than `mountTimestamp`, preventing history replay on page load or reconnect.

### Effect churn prevention

`handleNewEvent` is wrapped in `useCallback` with an empty dependency array so it is stable across re-renders. This prevents `CampaignEventWatcher`'s `useEffect` from re-running on every parent render.

### Toast state

`setToast` accumulates an incrementing `key` so consecutive events with the same message still trigger a new toast. `clearToast` is exposed to the consumer.

### Event-to-variant mapping

`well_bloodied` → `'warning'` variant. All other event types → `'info'` variant.

---

## 11. Known Limitations

| Issue | Notes |
| ----- | ----- |
| `displayName` staleness | `displayName` is captured from the user profile at join time and written into the `campaignMembers` record. If a user later renames their profile, the stored value becomes stale. |
| Client-emitted health events | `postEvent` is called from the browser after a save. This means a player could craft an arbitrary event payload. Future mitigation: derive health events server-side via a Convex action triggered on character write. |
| Untyped share picker | `CampaignDetail.tsx` casts the character list from `useQuery` as `(char: any)` because Convex list returns untyped documents at the call site. |

---

## 12. Related Systems

- **Database System** — `docs/systems/DATABASE_SYSTEM.MD`
- **Character Sheet** — `docs/systems/CHARACTER_SHEET.MD`
