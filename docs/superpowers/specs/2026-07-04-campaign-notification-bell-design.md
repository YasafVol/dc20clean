# Campaign Notification Bell — Design Spec

## Goal

Show a notification bell on the character sheet that counts campaign events posted by other users since the user last viewed the feed. Clicking it opens a right-side panel with the full campaign feed. Prerequisite: enforce one-character-one-campaign so bell logic is always single-campaign.

## Architecture

Two independent deliverables:

1. **Constraint enforcement** — prevent a character from being shared in more than one campaign simultaneously (backend guard + frontend error display).
2. **Notification bell + feed panel** — bell icon with unread badge, sliding drawer showing campaign feed.

## Global Constraints

- Tokyo Night theme tokens only (`theme` from `src/routes/character-sheet/styles/theme.ts`); no hardcoded color strings.
- No new Convex tables; extend existing queries/mutations only.
- `formatEvent` and `getEventAccent` extracted to a shared util so both `CampaignDetail` and the new panel reuse them without duplication.
- "Seen" state persisted in `localStorage`; no server-side read tracking.
- Bell hidden when character is not in any campaign.
- Panel is a pure UI component; data fetching lives in a hook.

---

## Part 1 — One-character-one-campaign constraint

### Backend: `convex/campaigns.ts` — `shareCharacter`

Before patching the member record, check whether `args.characterId` already appears in another campaign's member `sharedCharacterIds` for this user:

```ts
// Inside shareCharacter handler, after ownership check:
const allMemberships = await ctx.db
  .query('campaignMembers')
  .withIndex('by_user', (q) => q.eq('userId', userId))
  .filter((q) => q.eq(q.field('deletedAt'), undefined))
  .collect();

for (const m of allMemberships) {
  if (m._id.equals(member._id)) continue; // same campaign is fine (idempotent re-share)
  if (m.sharedCharacterIds.includes(args.characterId)) {
    const otherCampaign = await ctx.db.get(m.campaignId);
    const name = otherCampaign ? (otherCampaign as any).name : 'another campaign';
    throw new Error(`Character is already shared in "${name}". Unshare it there first.`);
  }
}
```

### Backend: `getCampaignsForCharacter` — add `campaignName`

Extend the result shape to include the campaign name (needed for the panel header):

```ts
results.push({
  campaignDocId: (campaign as any).id,   // app-level id
  campaignName: (campaign as any).name,
  memberDocId: m._id.toString(),
});
```

### Frontend: `CampaignDetail.tsx` — `handleShareCharacter`

Wrap the mutation call in try/catch and surface the error message:

```tsx
const handleShareCharacter = async (characterId: string) => {
  try {
    await mutations.shareCharacter(campaign.id, characterId);
    setShowSharePicker(false);
  } catch (err: any) {
    alert(err?.message ?? 'Failed to share character.');
  }
};
```

---

## Part 2 — Shared format utilities

### New file: `src/routes/character-sheet/utils/campaignFeedFormat.ts`

Extract from `CampaignDetail.tsx`:
- `formatEvent(event, characterName?)` → string
- `getEventAccent(type)` → color string (uses theme tokens)

Both functions are currently inlined in `CampaignDetail.tsx`. Move them to this util and import them back in `CampaignDetail.tsx` (no behavior change there).

---

## Part 3 — Notification bell + panel

### Hook: `useCampaignNotifications(characterId)`

Lives in `src/routes/character-sheet/hooks/useCampaignNotifications.ts`.

```ts
export function useCampaignNotifications(characterId: string | null) {
  const campaignLinks = useCampaignsForCharacter(characterId);
  const link = campaignLinks[0] ?? null;
  const { events } = useCampaignEvents(link?.campaignDocId ?? null);
  const currentUser = useCurrentUser();
  const storageKey = `campaign-notifications-seen-${characterId}`;

  const [lastSeenAt, setLastSeenAt] = useState<string>(
    () => localStorage.getItem(storageKey) ?? new Date(0).toISOString()
  );

  const markSeen = useCallback(() => {
    const now = new Date().toISOString();
    localStorage.setItem(storageKey, now);
    setLastSeenAt(now);
  }, [storageKey]);

  const unreadCount = useMemo(() => {
    if (!currentUser) return 0;
    return events.filter(
      (e) => e.actorUserId !== currentUser.userId && e.createdAt > lastSeenAt
    ).length;
  }, [events, currentUser, lastSeenAt]);

  return {
    campaignName: link?.campaignName ?? null,
    campaignId: link?.campaignDocId ?? null,
    events,
    unreadCount,
    markSeen,
    inCampaign: !!link,
  };
}
```

### Component: `CampaignFeedPanel.tsx`

Lives in `src/routes/character-sheet/components/CampaignFeedPanel.tsx`.

Fixed right-side drawer. Props:
```ts
interface Props {
  campaignName: string;
  events: CampaignEvent[];
  currentUserId: string;
  onClose: () => void;
}
```

Layout:
- `position: fixed; right: 0; top: 0; height: 100vh; width: 380px; z-index: 1000`
- Backdrop overlay (`position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 999`) — clicking it closes panel
- Header: campaign name + × close button
- Scrollable events list using `formatEvent` + `getEventAccent` from shared util
- Events newest-first (reverse sort by `createdAt`)
- Each event: left colored border accent, timestamp (`toLocaleString` short format), formatted text
- Empty state: "No events yet."

### Bell in `CharacterSheetRedesign.tsx`

```tsx
const { campaignName, events, unreadCount, markSeen, inCampaign } =
  useCampaignNotifications(characterId);
const [feedOpen, setFeedOpen] = useState(false);

const openFeed = () => { markSeen(); setFeedOpen(true); };
```

Bell button: absolute-positioned top-right (`position: absolute; top: 1rem; right: 1rem`). Only rendered when `inCampaign`. Bell SVG icon + red badge when `unreadCount > 0` (cap display at `99+`).

When `feedOpen && campaignName`: render `<CampaignFeedPanel>` with all required props.

---

## "Seen" timestamp semantics

- Stored as ISO string in `localStorage` key `campaign-notifications-seen-{characterId}`
- Initialized to `new Date(0).toISOString()` (epoch) on first visit → all existing events count as unread
- Updated to `Date.now()` when user opens the panel
- Events from self (`actorUserId === currentUser.userId`) are never counted as unread regardless of timestamp
- All events (including self's) are shown in the panel

---

## Files

| File | Action |
|---|---|
| `convex/campaigns.ts` | Modify `shareCharacter` (guard) + `getCampaignsForCharacter` (add `campaignName`) |
| `src/lib/hooks/useCampaigns.ts` | Update `useCampaignsForCharacter` return type to include `campaignName` |
| `src/routes/campaigns/CampaignDetail.tsx` | Add try/catch to `handleShareCharacter`; import format utils from new shared util |
| `src/routes/character-sheet/utils/campaignFeedFormat.ts` | New — extract `formatEvent` + `getEventAccent` |
| `src/routes/character-sheet/hooks/useCampaignNotifications.ts` | New — notification hook |
| `src/routes/character-sheet/components/CampaignFeedPanel.tsx` | New — right-side drawer |
| `src/routes/character-sheet/CharacterSheetRedesign.tsx` | Wire bell icon + `CampaignFeedPanel` |

## Out of scope

- Server-side read tracking
- Per-event dismiss
- Push notifications
- Multi-campaign aggregation (constraint prevents this)
