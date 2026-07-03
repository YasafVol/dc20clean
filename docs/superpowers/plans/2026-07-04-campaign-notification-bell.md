# Campaign Notification Bell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a notification bell to the character sheet showing unread campaign events from other users, backed by a right-side feed panel, and enforce one-character-one-campaign at the Convex layer.

**Architecture:** Convex guards the share mutation; `getCampaignsForCharacter` is extended to return `campaignName`; a shared format util is extracted; a new `useCampaignNotifications` hook wires events + localStorage seen-state; a new `CampaignFeedPanel` drawer is composed from the hook; finally the bell + panel are mounted in `CharacterSheetRedesign`.

**Tech Stack:** React 19, Convex mutations/queries, localStorage, Tokyo Night theme tokens, inline styles (no CSS modules).

## Global Constraints

- Use Tokyo Night theme tokens only — import `theme` from `src/routes/character-sheet/styles/theme.ts`; no hardcoded color strings.
- No new Convex tables; extend existing queries/mutations only.
- `formatEvent` and `getEventAccent` must live in `src/routes/character-sheet/utils/campaignFeedFormat.ts` and be imported by both `CampaignDetail.tsx` and `CampaignFeedPanel.tsx`.
- "Seen" state in `localStorage` key `campaign-notifications-seen-{characterId}`; no server-side read tracking.
- Bell is hidden when character is not in any campaign (`inCampaign === false`).
- `CampaignFeedPanel` is a pure UI component; all data fetching lives in `useCampaignNotifications`.
- Run `npm run build` after every task to verify no TypeScript errors before committing.

---

### Task 1: Backend — one-character-one-campaign guard + campaignName in getCampaignsForCharacter

**Files:**
- Modify: `convex/campaigns.ts`

**Interfaces:**
- Produces: `shareCharacter` throws `Error` with message `Character is already shared in "${name}". Unshare it there first.` when the character already appears in another campaign member's `sharedCharacterIds`.
- Produces: `getCampaignsForCharacter` returns `Array<{ campaignDocId: string; campaignName: string; memberDocId: string }>` (adds `campaignName`).

- [ ] **Step 1: Add the one-character-one-campaign guard to `shareCharacter`**

Open `convex/campaigns.ts`. Find `shareCharacter` (around line 324). After the block that verifies the caller owns the character (after `if (!char) throw new Error('Character not found or not owned by caller');`), and **before** the early-return idempotency check (`if (member.sharedCharacterIds.includes(args.characterId)) return;`), add:

```ts
// One-character-one-campaign: reject if character already shared elsewhere
const allMemberships = await ctx.db
  .query('campaignMembers')
  .withIndex('by_user', (q: any) => q.eq('userId', userId))
  .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
  .collect();

for (const m of allMemberships) {
  if (m._id.equals(member._id)) continue;
  if ((m.sharedCharacterIds as string[]).includes(args.characterId)) {
    const otherCampaign = await ctx.db.get(m.campaignId);
    const name = otherCampaign ? (otherCampaign as any).name : 'another campaign';
    throw new Error(`Character is already shared in "${name}". Unshare it there first.`);
  }
}
```

- [ ] **Step 2: Add `campaignName` to `getCampaignsForCharacter` result**

Find `getCampaignsForCharacter` (around line 169). In the `results.push(...)` call (around line 187–190), change it to:

```ts
results.push({
  campaignDocId: (campaign as any).id,  // app-level id, e.g. camp_abc123
  campaignName: (campaign as any).name,
  memberDocId: m._id.toString(),
});
```

- [ ] **Step 3: Build and commit**

```bash
npm run build 2>&1 | grep -E "error|✓"
git add convex/campaigns.ts
git commit -m "feat(campaigns): enforce one-character-one-campaign + expose campaignName"
```

Expected: `✓ built in` with no error lines.

---

### Task 2: Update hook type + frontend error handling in CampaignDetail

**Files:**
- Modify: `src/lib/hooks/useCampaigns.ts`
- Modify: `src/routes/campaigns/CampaignDetail.tsx`

**Interfaces:**
- Consumes: `getCampaignsForCharacter` now returns `campaignName` (Task 1).
- Produces: `useCampaignsForCharacter` returns `Array<{ campaignDocId: string; campaignName: string; memberDocId: string }>`.

- [ ] **Step 1: Update the return type cast in `useCampaignsForCharacter`**

In `src/lib/hooks/useCampaigns.ts`, find `useCampaignsForCharacter` (around line 56). Change the return type cast from:

```ts
return (raw ?? []) as Array<{ campaignDocId: string; memberDocId: string }>;
```

to:

```ts
return (raw ?? []) as Array<{ campaignDocId: string; campaignName: string; memberDocId: string }>;
```

- [ ] **Step 2: Add try/catch to `handleShareCharacter` in CampaignDetail**

In `src/routes/campaigns/CampaignDetail.tsx`, find `handleShareCharacter` (around line 242). Replace:

```tsx
const handleShareCharacter = async (characterId: string) => {
  await mutations.shareCharacter(campaign.id, characterId);
  setShowSharePicker(false);
};
```

with:

```tsx
const handleShareCharacter = async (characterId: string) => {
  try {
    await mutations.shareCharacter(campaign.id, characterId);
    setShowSharePicker(false);
  } catch (err: any) {
    alert(err?.data?.message ?? err?.message ?? 'Failed to share character.');
  }
};
```

Note: Convex wraps thrown errors; the actual message is at `err.data.message` for Convex `ConvexError` or `err.message` for standard `Error`.

- [ ] **Step 3: Build and commit**

```bash
npm run build 2>&1 | grep -E "error|✓"
git add src/lib/hooks/useCampaigns.ts src/routes/campaigns/CampaignDetail.tsx
git commit -m "feat(campaigns): add one-character-one-campaign error feedback in UI"
```

---

### Task 3: Extract formatEvent + getEventAccent to shared util

**Files:**
- Create: `src/routes/character-sheet/utils/campaignFeedFormat.ts`
- Modify: `src/routes/campaigns/CampaignDetail.tsx`

**Interfaces:**
- Produces:
  - `formatEvent(event: CampaignEvent): string`
  - `getEventAccent(type: string): string`
  Both exported from `src/routes/character-sheet/utils/campaignFeedFormat.ts`.

- [ ] **Step 1: Create the shared util file**

Create `src/routes/character-sheet/utils/campaignFeedFormat.ts` with the exact bodies copied from `CampaignDetail.tsx` (lines 44–85 and 124–152):

```ts
import { theme } from '../styles/theme';
import type { CampaignEvent } from '../../../lib/types/campaign';

export function formatEvent(event: CampaignEvent): string {
  const p = event.payload as any;
  const name = p?.characterName ?? p?.displayName ?? 'Someone';
  switch (event.type) {
    case 'well_bloodied':      return `[!!] ${name} is well-bloodied!`;
    case 'bloodied':           return `[~] ${name} is bloodied.`;
    case 'deaths_door':        return `[!!] ${name} is on Death's Door!`;
    case 'dead':               return `[*] ${name} has died.`;
    case 'recovered':          return `[+] ${name} has recovered.`;
    case 'rage_start':         return `[>] ${name} enters a Rage!`;
    case 'rage_end':           return `[~] ${name} rage ends.`;
    case 'wild_form_enter':    return `[>] ${name} transforms into Wild Form!`;
    case 'wild_form_exit':     return `[~] ${name} returns from Wild Form.`;
    case 'spell_cast': {
      const sustained = p?.sustained ? ' (sustained)' : '';
      return `[*] ${name} casts ${p?.spellName ?? 'a spell'}${sustained}.`;
    }
    case 'maneuver_used':      return `[>] ${name} uses ${p?.maneuverName ?? 'a maneuver'}.`;
    case 'long_rest':          return `[+] ${name} takes a Long Rest.`;
    case 'condition_gained':   return `[!] ${name} gains condition: ${p?.conditionId ?? 'unknown'}.`;
    case 'condition_cured':    return `[+] ${name} is cured of: ${p?.conditionId ?? 'unknown'}.`;
    case 'exhaustion_changed': {
      const lvl = p?.level ?? '?';
      const prev = p?.prevLevel ?? '?';
      return (p?.level ?? 0) > (p?.prevLevel ?? 0)
        ? `[!] ${name} exhaustion → level ${lvl}.`
        : `[+] ${name} exhaustion → level ${lvl} (was ${prev}).`;
    }
    case 'dice_roll': {
      const label = p?.label ?? 'd20';
      const mode = p?.mode === 'advantage' ? ' (adv)' : p?.mode === 'disadvantage' ? ' (dis)' : '';
      const all = Array.isArray(p?.allResults) ? `[${p.allResults.join(', ')}]` : '';
      const mod = (p?.modifier ?? 0) !== 0
        ? ((p.modifier > 0 ? ' +' : ' ') + p.modifier)
        : '';
      return `[d] ${name}: ${label}${mode} ${all}${mod} = ${p?.total ?? '?'}`;
    }
    case 'member_joined':      return `[+] ${name} joined the campaign.`;
    case 'character_shared':   return `[~] ${name} shared a character.`;
    default:                   return `[*] ${event.type}: ${name}`;
  }
}

export function getEventAccent(type: string): string {
  switch (type) {
    case 'dead':
    case 'deaths_door':
    case 'well_bloodied':
      return theme.colors.accent.danger;
    case 'bloodied':
      return theme.colors.accent.warning;
    case 'recovered':
    case 'condition_cured':
    case 'long_rest':
      return theme.colors.accent.success;
    case 'dice_roll':
      return theme.colors.accent.primary;
    case 'rage_start':
    case 'wild_form_enter':
    case 'condition_gained':
    case 'exhaustion_changed':
      return theme.colors.accent.warning;
    case 'rage_end':
    case 'wild_form_exit':
      return theme.colors.text.muted;
    case 'spell_cast':
    case 'maneuver_used':
      return theme.colors.accent.secondary;
    default:
      return theme.colors.border.default;
  }
}
```

- [ ] **Step 2: Replace the two functions in CampaignDetail with imports**

In `src/routes/campaigns/CampaignDetail.tsx`:

Add this import after the existing imports (e.g., after `import { theme } from ...`):

```ts
import { formatEvent, getEventAccent } from '../character-sheet/utils/campaignFeedFormat';
```

Delete the `function formatEvent(...)` block (lines 44–85) and the `function getEventAccent(...)` block (lines 124–152) from `CampaignDetail.tsx`. The `getStatusPill` function (lines 87–122) stays — it is not shared.

- [ ] **Step 3: Build and commit**

```bash
npm run build 2>&1 | grep -E "error|✓"
git add src/routes/character-sheet/utils/campaignFeedFormat.ts src/routes/campaigns/CampaignDetail.tsx
git commit -m "refactor(campaigns): extract formatEvent+getEventAccent to shared util"
```

---

### Task 4: useCampaignNotifications hook

**Files:**
- Create: `src/routes/character-sheet/hooks/useCampaignNotifications.ts`

**Interfaces:**
- Consumes: `useCampaignsForCharacter` (returns `Array<{ campaignDocId, campaignName, memberDocId }>`), `useCampaignEvents`, `useCurrentUser` from `../../components/auth/CurrentUserContext`.
- Produces:
  ```ts
  function useCampaignNotifications(characterId: string | null): {
    campaignName: string | null;
    campaignId: string | null;
    events: CampaignEvent[];
    unreadCount: number;
    markSeen: () => void;
    inCampaign: boolean;
  }
  ```

- [ ] **Step 1: Create the hook**

Create `src/routes/character-sheet/hooks/useCampaignNotifications.ts`:

```ts
import { useState, useCallback, useMemo } from 'react';
import { useCampaignsForCharacter, useCampaignEvents } from '../../../lib/hooks/useCampaigns';
import { useCurrentUser } from '../../../components/auth/CurrentUserContext';
import type { CampaignEvent } from '../../../lib/types/campaign';

export function useCampaignNotifications(characterId: string | null): {
  campaignName: string | null;
  campaignId: string | null;
  events: CampaignEvent[];
  unreadCount: number;
  markSeen: () => void;
  inCampaign: boolean;
} {
  const campaignLinks = useCampaignsForCharacter(characterId);
  const link = campaignLinks[0] ?? null;
  const { events } = useCampaignEvents(link?.campaignDocId ?? null);
  const currentUser = useCurrentUser();

  const storageKey = characterId
    ? `campaign-notifications-seen-${characterId}`
    : null;

  const [lastSeenAt, setLastSeenAt] = useState<string>(() => {
    if (!storageKey) return new Date(0).toISOString();
    return localStorage.getItem(storageKey) ?? new Date(0).toISOString();
  });

  const markSeen = useCallback(() => {
    if (!storageKey) return;
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

- [ ] **Step 2: Build and commit**

```bash
npm run build 2>&1 | grep -E "error|✓"
git add src/routes/character-sheet/hooks/useCampaignNotifications.ts
git commit -m "feat(character-sheet): add useCampaignNotifications hook"
```

---

### Task 5: CampaignFeedPanel component

**Files:**
- Create: `src/routes/character-sheet/components/CampaignFeedPanel.tsx`

**Interfaces:**
- Consumes: `formatEvent`, `getEventAccent` from `../utils/campaignFeedFormat`; `theme` from `../styles/theme`; `CampaignEvent` type.
- Props:
  ```ts
  interface CampaignFeedPanelProps {
    campaignName: string;
    events: CampaignEvent[];
    currentUserId: string;
    onClose: () => void;
  }
  ```
- Produces: `export function CampaignFeedPanel(props: CampaignFeedPanelProps): JSX.Element`

- [ ] **Step 1: Create the component**

Create `src/routes/character-sheet/components/CampaignFeedPanel.tsx`:

```tsx
import React from 'react';
import { theme } from '../styles/theme';
import { formatEvent, getEventAccent } from '../utils/campaignFeedFormat';
import type { CampaignEvent } from '../../../lib/types/campaign';

interface CampaignFeedPanelProps {
  campaignName: string;
  events: CampaignEvent[];
  currentUserId: string;
  onClose: () => void;
}

export function CampaignFeedPanel({ campaignName, events, currentUserId: _currentUserId, onClose }: CampaignFeedPanelProps) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 999,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '380px',
          height: '100vh',
          background: theme.colors.bg.secondary,
          borderLeft: `1px solid ${theme.colors.border.default}`,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: `1px solid ${theme.colors.border.default}`,
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ fontSize: '0.7rem', color: theme.colors.text.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.15rem' }}>
              Campaign Feed
            </div>
            <div style={{ fontWeight: 700, color: theme.colors.text.primary, fontSize: '1rem' }}>
              {campaignName}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: theme.colors.text.muted,
              fontSize: '1.25rem',
              lineHeight: 1,
              padding: '0.25rem',
            }}
            aria-label="Close feed"
          >
            ×
          </button>
        </div>

        {/* Events list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem' }}>
          {sorted.length === 0 ? (
            <p style={{ color: theme.colors.text.muted, fontSize: '0.875rem', textAlign: 'center', marginTop: '2rem' }}>
              No events yet.
            </p>
          ) : (
            sorted.map((event) => (
              <div
                key={event._id ?? event.createdAt}
                style={{
                  borderLeft: `3px solid ${getEventAccent(event.type)}`,
                  paddingLeft: '0.75rem',
                  marginBottom: '0.75rem',
                  paddingTop: '0.1rem',
                  paddingBottom: '0.1rem',
                }}
              >
                <div style={{ fontSize: '0.7rem', color: theme.colors.text.muted, marginBottom: '0.15rem' }}>
                  {new Date(event.createdAt).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div style={{ fontSize: '0.875rem', color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.mono }}>
                  {formatEvent(event)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
```

Note: `currentUserId` is accepted in props (for future use) but not used yet in rendering — all events are shown. The bell badge handles the "from others only" filtering in the hook.

- [ ] **Step 2: Build and commit**

```bash
npm run build 2>&1 | grep -E "error|✓"
git add src/routes/character-sheet/components/CampaignFeedPanel.tsx
git commit -m "feat(character-sheet): add CampaignFeedPanel right-side drawer"
```

---

### Task 6: Wire bell + panel into CharacterSheetRedesign

**Files:**
- Modify: `src/routes/character-sheet/CharacterSheetRedesign.tsx`

**Interfaces:**
- Consumes:
  - `useCampaignNotifications` from `./hooks/useCampaignNotifications` — returns `{ campaignName, campaignId, events, unreadCount, markSeen, inCampaign }`
  - `CampaignFeedPanel` from `./components/CampaignFeedPanel`
  - `useCurrentUser` from `../../components/auth/CurrentUserContext`
  - `characterId` is already a prop on `CharacterSheetRedesign` (`interface CharacterSheetRedesignProps { characterId: string; onBack?: () => void; }`)

- [ ] **Step 1: Add imports**

At the top of `src/routes/character-sheet/CharacterSheetRedesign.tsx`, add these imports after the existing component imports (e.g., after the `HamburgerDrawer` import):

```tsx
import { useCampaignNotifications } from './hooks/useCampaignNotifications';
import { CampaignFeedPanel } from './components/CampaignFeedPanel';
import { useCurrentUser } from '../../components/auth/CurrentUserContext';
```

- [ ] **Step 2: Add hook calls and state inside the component**

Inside `CharacterSheetRedesign` (after the existing `useState` / hook calls, e.g., after the `const [rulebookOpen, setRulebookOpen] = useState(false);` block), add:

```tsx
const currentUser = useCurrentUser();
const { campaignName, events: campaignEvents, unreadCount, markSeen, inCampaign } =
  useCampaignNotifications(characterId);
const [feedOpen, setFeedOpen] = useState(false);

const openFeed = () => {
  markSeen();
  setFeedOpen(true);
};
```

- [ ] **Step 3: Add bell button to the ActionButtons area**

In the JSX, inside the `<ActionButtons>` block (around line 726), add the bell button **before** the existing `{onBack && ...}` block:

```tsx
{inCampaign && (
  <ActionButton
    onClick={openFeed}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    title="Campaign feed"
    style={{ position: 'relative' }}
  >
    🔔
    {unreadCount > 0 && (
      <span style={{
        position: 'absolute',
        top: '-4px',
        right: '-4px',
        background: theme.colors.accent.danger,
        color: '#fff',
        borderRadius: '9999px',
        fontSize: '0.6rem',
        fontWeight: 700,
        minWidth: '16px',
        height: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 3px',
        lineHeight: 1,
      }}>
        {unreadCount > 99 ? '99+' : unreadCount}
      </span>
    )}
  </ActionButton>
)}
```

- [ ] **Step 4: Render CampaignFeedPanel**

Just before the closing `</PageContainer>` tag (before the `Snackbar`), add:

```tsx
{feedOpen && campaignName && currentUser && (
  <CampaignFeedPanel
    campaignName={campaignName}
    events={campaignEvents}
    currentUserId={currentUser.userId}
    onClose={() => setFeedOpen(false)}
  />
)}
```

- [ ] **Step 5: Build and commit**

```bash
npm run build 2>&1 | grep -E "error|✓"
git add src/routes/character-sheet/CharacterSheetRedesign.tsx
git commit -m "feat(character-sheet): add campaign notification bell with feed panel"
```

- [ ] **Step 6: Push**

```bash
git push origin main
```

---

## Self-review checklist

- [x] **Spec coverage:** backend guard ✓ | getCampaignsForCharacter campaignName ✓ | useCampaigns type update ✓ | CampaignDetail error feedback ✓ | shared format util ✓ | useCampaignNotifications ✓ | CampaignFeedPanel ✓ | bell in CharacterSheetRedesign ✓ | seen-state semantics (epoch init, self-filter, markSeen on open) ✓ | bell hidden when not in campaign ✓ | 99+ cap ✓
- [x] **No placeholders:** all code blocks complete.
- [x] **Type consistency:** `campaignDocId` used as campaign app ID throughout; `campaignName` returned from both Convex query and hook; `CampaignEvent` type imported from `src/lib/types/campaign.ts` in both util and panel.
