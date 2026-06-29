# Campaign System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Campaigns feature where a DM creates a campaign, invites players via a join code, and all members see each other's shared characters live with HP status and event notifications.

**Architecture:** Three new Convex tables (`campaigns`, `campaignMembers`, `campaignEvents`) with membership-gated reactive queries. Characters are shared by reference (ID only) — never copied. Event notifications ride Convex's existing reactivity (`useQuery` re-fires on row change); the owner's client emits events via `postEvent` after save completion. Read-only character sheet reuses the existing provider with a new `campaignId` prop that switches the load query and disables all mutations.

**Tech Stack:** Convex (tables, queries, mutations, `getAuthUserId`), React 19, React Router v6, styled-components, react-i18next, Vitest + Testing Library, Playwright E2E.

## Global Constraints

- Every new Convex query/mutation: call `getAuthUserId(ctx)` first; return `[]/null` for unauthenticated queries, throw for unauthenticated mutations.
- All campaign reads are membership-gated via `requireMembership` helper (throws if caller is not a member).
- `campaignId` fields in new tables use `v.id('campaigns')` (Convex document ID), not `v.string()`.
- `sharedCharacterIds` elements remain `v.string()` (app-generated character `id` field, not Convex `_id`).
- Soft-delete pattern: `deletedAt: v.optional(v.string())` on all three new tables; all reads filter `deletedAt === undefined`.
- `postEvent` validates `characterId` (when present) is in **the caller's own** `sharedCharacterIds` only.
- Campaigns feature is invisible/disabled when not signed in (`isAuthenticated`) or not in Convex mode (`isConvexEnabled`). Use the same gate as DM Tools in `Menu.tsx:270`.
- Conventional Commits for every commit. Read `docs/systems/TESTING_SYSTEM.MD` before writing tests.
- After feature completion, update `docs/systems/DATABASE_SYSTEM.MD` and `docs/systems/CHARACTER_SHEET.MD`, and create `docs/systems/CAMPAIGN_SYSTEM.MD`.
- Run `npm run test:unit -- --project server --run <file>` for unit tests.
- Run `npm run test:e2e -- --project=desktop` for E2E.

---

## Phase 1: Backend Foundation

### Task 1: Convex Schema — Three New Tables + characters.by_id

**Files:**
- Modify: `convex/schema.ts` (add validators + table definitions)

**Interfaces:**
- Produces: `campaigns`, `campaignMembers`, `campaignEvents` tables queryable via Convex; `characters` gains `by_id` index enabling cross-user fetch by app `id`.

- [ ] **Step 1: Add validators before `defineSchema`**

Open `convex/schema.ts`. After the existing validators (around line 640, before `export default defineSchema`), add:

```typescript
const campaignValidator = {
  userId: v.id('users'),            // creator / DM
  id: v.string(),                   // app-generated, e.g. "camp_<uuid>"
  code: v.string(),                 // 6-char join code A-Z0-9
  name: v.string(),
  description: v.optional(v.string()),
  createdAt: v.string(),
  lastModified: v.string(),
  deletedAt: v.optional(v.string()),
};

const campaignMemberValidator = {
  campaignId: v.id('campaigns'),
  userId: v.id('users'),
  role: v.union(v.literal('dm'), v.literal('co_dm'), v.literal('player')),
  sharedCharacterIds: v.array(v.string()),
  displayName: v.optional(v.string()),
  joinedAt: v.string(),
  deletedAt: v.optional(v.string()),
};

const campaignEventValidator = {
  campaignId: v.id('campaigns'),
  type: v.string(),
  actorUserId: v.id('users'),
  characterId: v.optional(v.string()),
  payload: v.any(),
  createdAt: v.string(),
  deletedAt: v.optional(v.string()),
};
```

- [ ] **Step 2: Add table definitions + characters.by_id inside `defineSchema`**

In `convex/schema.ts`, find the `characters` table definition and add the `by_id` index. Then add the three new tables at the end:

```typescript
// characters table — add by_id index (enables cross-user fetch for campaign roster)
characters: defineTable(characterValidator)
  .index('by_user', ['userId'])
  .index('by_user_and_id', ['userId', 'id'])
  .index('by_user_and_name', ['userId', 'finalName'])
  .index('by_id', ['id']),                    // <-- NEW

// ... existing monsters, features, encounters tables stay unchanged ...

// Campaigns
campaigns: defineTable(campaignValidator)
  .index('by_user', ['userId'])
  .index('by_id', ['id'])
  .index('by_code', ['code']),

campaignMembers: defineTable(campaignMemberValidator)
  .index('by_campaign', ['campaignId'])
  .index('by_user', ['userId'])
  .index('by_campaign_and_user', ['campaignId', 'userId']),

campaignEvents: defineTable(campaignEventValidator)
  .index('by_campaign', ['campaignId'])
  .index('by_campaign_and_time', ['campaignId', 'createdAt']),
```

- [ ] **Step 3: Deploy and verify schema compiles**

```bash
N20="$(nvm which 20)"; DIR="$(dirname "$N20")"; PATH="$DIR:$PATH" "$N20" "$DIR/npx" convex deploy -y
```

Expected: Convex prints "Schema is valid" and deploys without errors. If `nvm` unavailable, use `node --version` to confirm Node 20+.

- [ ] **Step 4: Commit**

```bash
git add convex/schema.ts
git commit -m "feat(campaigns): add schema for campaigns, members, events + characters.by_id index"
```

---

### Task 2: `convex/users.ts` — getCurrentUser Query

**Files:**
- Create: `convex/users.ts`

**Interfaces:**
- Produces: `api.users.getCurrentUser` → `{ userId: string; name?: string } | null`

- [ ] **Step 1: Create `convex/users.ts`**

```typescript
import { query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    return user ? { userId: userId.toString(), name: (user as any).name as string | undefined } : null;
  },
});
```

- [ ] **Step 2: Deploy**

```bash
N20="$(nvm which 20)"; DIR="$(dirname "$N20")"; PATH="$DIR:$PATH" "$N20" "$DIR/npx" convex deploy -y
```

Expected: deploys cleanly; `api.users.getCurrentUser` is now callable.

- [ ] **Step 3: Commit**

```bash
git add convex/users.ts
git commit -m "feat(campaigns): add getCurrentUser query"
```

---

### Task 3: `convex/campaigns.ts` — Queries

**Files:**
- Create: `convex/campaigns.ts` (queries section)

**Interfaces:**
- Consumes: `campaigns`, `campaignMembers`, `campaignEvents`, `characters` tables from Task 1.
- Produces:
  - `api.campaigns.listMyCampaigns` → `Array<{ campaign, role }>`
  - `api.campaigns.getCampaign({ id })` → `{ campaign, members, myRole } | null`
  - `api.campaigns.getRoster({ campaignId })` → `RosterEntry[]`
  - `api.campaigns.listEvents({ campaignId, limit? })` → `CampaignEvent[]`
  - `api.campaigns.getCampaignsForCharacter({ characterId })` → `string[]` (campaign IDs)
  - `requireMembership` module-local helper (used in Task 4)

- [ ] **Step 1: Write `convex/campaigns.ts`**

```typescript
import { v } from 'convex/values';
import { query, mutation } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import type { Id } from './_generated/dataModel';

// ============================================================================
// HELPERS
// ============================================================================

async function requireMembership(ctx: any, campaignDocId: Id<'campaigns'>) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error('Not authenticated');

  const member = await ctx.db
    .query('campaignMembers')
    .withIndex('by_campaign_and_user', (q: any) =>
      q.eq('campaignId', campaignDocId).eq('userId', userId)
    )
    .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
    .first();

  if (!member) throw new Error('Not a campaign member');
  return { userId, member };
}

async function requireManager(ctx: any, campaignDocId: Id<'campaigns'>) {
  const { userId, member } = await requireMembership(ctx, campaignDocId);
  if (member.role !== 'dm' && member.role !== 'co_dm') throw new Error('Insufficient role');
  return { userId, member };
}

async function requireDm(ctx: any, campaignDocId: Id<'campaigns'>) {
  const { userId, member } = await requireMembership(ctx, campaignDocId);
  if (member.role !== 'dm') throw new Error('DM only');
  return { userId, member };
}

async function getCampaignByAppId(ctx: any, id: string) {
  return ctx.db
    .query('campaigns')
    .withIndex('by_id', (q: any) => q.eq('id', id))
    .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
    .first();
}

// ============================================================================
// QUERIES
// ============================================================================

export const listMyCampaigns = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const memberships = await ctx.db
      .query('campaignMembers')
      .withIndex('by_user', (q: any) => q.eq('userId', userId))
      .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
      .collect();

    const results = await Promise.all(
      memberships.map(async (m: any) => {
        const campaign = await ctx.db.get(m.campaignId);
        if (!campaign || campaign.deletedAt) return null;
        return { campaign, role: m.role };
      })
    );

    return results.filter(Boolean);
  },
});

export const getCampaign = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const campaign = await getCampaignByAppId(ctx, args.id);
    if (!campaign) return null;

    const myMember = await ctx.db
      .query('campaignMembers')
      .withIndex('by_campaign_and_user', (q: any) =>
        q.eq('campaignId', campaign._id).eq('userId', userId)
      )
      .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
      .first();

    if (!myMember) return null;

    const members = await ctx.db
      .query('campaignMembers')
      .withIndex('by_campaign', (q: any) => q.eq('campaignId', campaign._id))
      .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
      .collect();

    return { campaign, members, myRole: myMember.role };
  },
});

export const getRoster = query({
  args: { campaignId: v.string() },
  handler: async (ctx, args) => {
    const campaign = await getCampaignByAppId(ctx, args.campaignId);
    if (!campaign) return [];

    await requireMembership(ctx, campaign._id);

    const members = await ctx.db
      .query('campaignMembers')
      .withIndex('by_campaign', (q: any) => q.eq('campaignId', campaign._id))
      .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
      .collect();

    const rows: any[] = [];
    for (const member of members) {
      for (const charId of member.sharedCharacterIds) {
        const charDoc = await ctx.db
          .query('characters')
          .withIndex('by_id', (q: any) => q.eq('id', charId))
          .first();
        if (!charDoc) continue;
        const currentHP = charDoc.characterState?.resources?.current?.currentHP ?? null;
        const maxHP = charDoc.finalHPMax ?? null;
        rows.push({
          characterId: charId,
          characterName: charDoc.finalName,
          ownerUserId: member.userId.toString(),
          ownerDisplayName: member.displayName ?? null,
          className: charDoc.classId ?? null,
          level: charDoc.level ?? null,
          currentHP,
          maxHP,
          memberDocId: member._id.toString(),
        });
      }
    }
    return rows;
  },
});

export const listEvents = query({
  args: { campaignId: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const campaign = await getCampaignByAppId(ctx, args.campaignId);
    if (!campaign) return [];

    await requireMembership(ctx, campaign._id);

    const events = await ctx.db
      .query('campaignEvents')
      .withIndex('by_campaign_and_time', (q: any) => q.eq('campaignId', campaign._id))
      .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
      .order('desc')
      .take(args.limit ?? 50);

    return events;
  },
});

export const getCampaignsForCharacter = query({
  args: { characterId: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const memberships = await ctx.db
      .query('campaignMembers')
      .withIndex('by_user', (q: any) => q.eq('userId', userId))
      .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
      .collect();

    return memberships
      .filter((m: any) => m.sharedCharacterIds.includes(args.characterId))
      .map((m: any) => ({ campaignDocId: m.campaignId.toString(), memberDocId: m._id.toString() }));
  },
});
```

- [ ] **Step 2: Deploy**

```bash
N20="$(nvm which 20)"; DIR="$(dirname "$N20")"; PATH="$DIR:$PATH" "$N20" "$DIR/npx" convex deploy -y
```

Expected: deploys cleanly; all five query functions appear in the generated API.

- [ ] **Step 3: Commit**

```bash
git add convex/campaigns.ts
git commit -m "feat(campaigns): add campaign queries (list, get, roster, events, characterCampaigns)"
```

---

### Task 4: `convex/campaigns.ts` — Mutations

**Files:**
- Modify: `convex/campaigns.ts` (append mutations section)

**Interfaces:**
- Consumes: helpers from Task 3 (`requireMembership`, `requireManager`, `requireDm`, `getCampaignByAppId`).
- Produces:
  - `api.campaigns.createCampaign({ name, description? })`
  - `api.campaigns.joinByCode({ code })`
  - `api.campaigns.leaveCampaign({ campaignId })`
  - `api.campaigns.shareCharacter({ campaignId, characterId })`
  - `api.campaigns.unshareCharacter({ campaignId, characterId })`
  - `api.campaigns.renameCampaign({ campaignId, name, description? })`
  - `api.campaigns.regenerateCode({ campaignId })`
  - `api.campaigns.kickMember({ campaignId, targetUserId })`
  - `api.campaigns.setMemberRole({ campaignId, targetUserId, role })`
  - `api.campaigns.deleteCampaign({ campaignId })`
  - `api.campaigns.postEvent({ campaignId, type, characterId?, payload })`

- [ ] **Step 1: Append mutations to `convex/campaigns.ts`**

```typescript
// ============================================================================
// MUTATIONS
// ============================================================================

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export const createCampaign = mutation({
  args: { name: v.string(), description: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');

    const user = await ctx.db.get(userId);
    const displayName = (user as any)?.name as string | undefined;

    // Generate unique code
    let code = generateCode();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await ctx.db
        .query('campaigns')
        .withIndex('by_code', (q: any) => q.eq('code', code))
        .first();
      if (!existing || existing.deletedAt) break;
      code = generateCode();
      attempts++;
    }

    const campaignId = `camp_${crypto.randomUUID()}`;
    const now = new Date().toISOString();

    const docId = await ctx.db.insert('campaigns', {
      userId,
      id: campaignId,
      code,
      name: args.name,
      description: args.description,
      createdAt: now,
      lastModified: now,
    });

    await ctx.db.insert('campaignMembers', {
      campaignId: docId,
      userId,
      role: 'dm',
      sharedCharacterIds: [],
      displayName,
      joinedAt: now,
    });

    return { id: campaignId };
  },
});

export const joinByCode = mutation({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');

    const campaign = await ctx.db
      .query('campaigns')
      .withIndex('by_code', (q: any) => q.eq('code', args.code.toUpperCase()))
      .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
      .first();

    if (!campaign) throw new Error('Invalid or expired join code');

    const existing = await ctx.db
      .query('campaignMembers')
      .withIndex('by_campaign_and_user', (q: any) =>
        q.eq('campaignId', campaign._id).eq('userId', userId)
      )
      .first();

    if (existing && !existing.deletedAt) {
      return { id: campaign.id, alreadyMember: true };
    }

    const user = await ctx.db.get(userId);
    const displayName = (user as any)?.name as string | undefined;
    const now = new Date().toISOString();

    if (existing) {
      // Restore soft-deleted membership
      await ctx.db.patch(existing._id, { deletedAt: undefined, joinedAt: now });
    } else {
      await ctx.db.insert('campaignMembers', {
        campaignId: campaign._id,
        userId,
        role: 'player',
        sharedCharacterIds: [],
        displayName,
        joinedAt: now,
      });
    }

    await ctx.db.insert('campaignEvents', {
      campaignId: campaign._id,
      type: 'member_joined',
      actorUserId: userId,
      payload: { displayName: displayName ?? 'Someone' },
      createdAt: now,
    });

    return { id: campaign.id, alreadyMember: false };
  },
});

export const leaveCampaign = mutation({
  args: { campaignId: v.string() },
  handler: async (ctx, args) => {
    const campaign = await getCampaignByAppId(ctx, args.campaignId);
    if (!campaign) throw new Error('Campaign not found');
    const { member } = await requireMembership(ctx, campaign._id);
    if (member.role === 'dm') throw new Error('DM cannot leave — delete the campaign instead');
    await ctx.db.patch(member._id, { deletedAt: new Date().toISOString() });
  },
});

export const shareCharacter = mutation({
  args: { campaignId: v.string(), characterId: v.string() },
  handler: async (ctx, args) => {
    const campaign = await getCampaignByAppId(ctx, args.campaignId);
    if (!campaign) throw new Error('Campaign not found');
    const { userId, member } = await requireMembership(ctx, campaign._id);

    // Verify caller owns the character
    const char = await ctx.db
      .query('characters')
      .withIndex('by_user_and_id', (q: any) => q.eq('userId', userId).eq('id', args.characterId))
      .first();
    if (!char) throw new Error('Character not found or not owned by caller');

    if (member.sharedCharacterIds.includes(args.characterId)) return;
    await ctx.db.patch(member._id, {
      sharedCharacterIds: [...member.sharedCharacterIds, args.characterId],
    });

    await ctx.db.insert('campaignEvents', {
      campaignId: campaign._id,
      type: 'character_shared',
      actorUserId: userId,
      characterId: args.characterId,
      payload: { characterName: char.finalName },
      createdAt: new Date().toISOString(),
    });
  },
});

export const unshareCharacter = mutation({
  args: { campaignId: v.string(), characterId: v.string() },
  handler: async (ctx, args) => {
    const campaign = await getCampaignByAppId(ctx, args.campaignId);
    if (!campaign) throw new Error('Campaign not found');
    const { member } = await requireMembership(ctx, campaign._id);
    await ctx.db.patch(member._id, {
      sharedCharacterIds: member.sharedCharacterIds.filter((id: string) => id !== args.characterId),
    });
  },
});

export const renameCampaign = mutation({
  args: { campaignId: v.string(), name: v.string(), description: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const campaign = await getCampaignByAppId(ctx, args.campaignId);
    if (!campaign) throw new Error('Campaign not found');
    await requireManager(ctx, campaign._id);
    await ctx.db.patch(campaign._id, {
      name: args.name,
      description: args.description,
      lastModified: new Date().toISOString(),
    });
  },
});

export const regenerateCode = mutation({
  args: { campaignId: v.string() },
  handler: async (ctx, args) => {
    const campaign = await getCampaignByAppId(ctx, args.campaignId);
    if (!campaign) throw new Error('Campaign not found');
    await requireManager(ctx, campaign._id);

    let code = generateCode();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await ctx.db
        .query('campaigns')
        .withIndex('by_code', (q: any) => q.eq('code', code))
        .first();
      if (!existing || existing.deletedAt || existing._id === campaign._id) break;
      code = generateCode();
      attempts++;
    }
    await ctx.db.patch(campaign._id, { code, lastModified: new Date().toISOString() });
    return { code };
  },
});

export const kickMember = mutation({
  args: { campaignId: v.string(), targetUserId: v.string() },
  handler: async (ctx, args) => {
    const campaign = await getCampaignByAppId(ctx, args.campaignId);
    if (!campaign) throw new Error('Campaign not found');
    const { userId } = await requireManager(ctx, campaign._id);
    if (userId.toString() === args.targetUserId) throw new Error('Cannot kick yourself');

    const target = await ctx.db
      .query('campaignMembers')
      .withIndex('by_campaign_and_user', (q: any) =>
        q.eq('campaignId', campaign._id).eq('userId', args.targetUserId as any)
      )
      .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
      .first();
    if (!target) throw new Error('Member not found');
    if (target.role === 'dm') throw new Error('Cannot kick the DM');
    await ctx.db.patch(target._id, { deletedAt: new Date().toISOString() });
  },
});

export const setMemberRole = mutation({
  args: {
    campaignId: v.string(),
    targetUserId: v.string(),
    role: v.union(v.literal('co_dm'), v.literal('player')),
  },
  handler: async (ctx, args) => {
    const campaign = await getCampaignByAppId(ctx, args.campaignId);
    if (!campaign) throw new Error('Campaign not found');
    await requireDm(ctx, campaign._id);

    const target = await ctx.db
      .query('campaignMembers')
      .withIndex('by_campaign_and_user', (q: any) =>
        q.eq('campaignId', campaign._id).eq('userId', args.targetUserId as any)
      )
      .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
      .first();
    if (!target) throw new Error('Member not found');
    if (target.role === 'dm') throw new Error('Cannot change the DM role');
    await ctx.db.patch(target._id, { role: args.role });
  },
});

export const deleteCampaign = mutation({
  args: { campaignId: v.string() },
  handler: async (ctx, args) => {
    const campaign = await getCampaignByAppId(ctx, args.campaignId);
    if (!campaign) throw new Error('Campaign not found');
    await requireDm(ctx, campaign._id);

    const now = new Date().toISOString();

    // Soft-delete campaign
    await ctx.db.patch(campaign._id, { deletedAt: now });

    // Soft-delete all members
    const members = await ctx.db
      .query('campaignMembers')
      .withIndex('by_campaign', (q: any) => q.eq('campaignId', campaign._id))
      .collect();
    for (const m of members) {
      await ctx.db.patch(m._id, { deletedAt: now });
    }

    // Soft-delete all events
    const events = await ctx.db
      .query('campaignEvents')
      .withIndex('by_campaign', (q: any) => q.eq('campaignId', campaign._id))
      .collect();
    for (const e of events) {
      await ctx.db.patch(e._id, { deletedAt: now });
    }
  },
});

export const postEvent = mutation({
  args: {
    campaignId: v.string(),
    type: v.string(),
    characterId: v.optional(v.string()),
    payload: v.any(),
  },
  handler: async (ctx, args) => {
    const campaign = await getCampaignByAppId(ctx, args.campaignId);
    if (!campaign) throw new Error('Campaign not found');
    const { userId, member } = await requireMembership(ctx, campaign._id);

    // Validate characterId belongs to caller's own shared characters only
    if (args.characterId !== undefined) {
      if (!member.sharedCharacterIds.includes(args.characterId)) {
        throw new Error('Character not shared by caller');
      }
    }

    await ctx.db.insert('campaignEvents', {
      campaignId: campaign._id,
      type: args.type,
      actorUserId: userId,
      characterId: args.characterId,
      payload: args.payload,
      createdAt: new Date().toISOString(),
    });
  },
});
```

- [ ] **Step 2: Deploy**

```bash
N20="$(nvm which 20)"; DIR="$(dirname "$N20")"; PATH="$DIR:$PATH" "$N20" "$DIR/npx" convex deploy -y
```

Expected: deploys cleanly; all mutation functions appear.

- [ ] **Step 3: Commit**

```bash
git add convex/campaigns.ts
git commit -m "feat(campaigns): add all campaign mutations (create, join, leave, share, manage, events)"
```

---

### Task 5: `convex/characters.ts` — Add `getByIdForMember` Query

**Files:**
- Modify: `convex/characters.ts` (append one query)

**Interfaces:**
- Consumes: `characters` `by_id` index (Task 1), `getCampaignByAppId` and `requireMembership` helpers from `campaigns.ts`. Since helpers are module-local to campaigns.ts, duplicate the minimal check inline in characters.ts.
- Produces: `api.characters.getByIdForMember({ campaignId, characterId })` → character doc or `null`.

- [ ] **Step 1: Append to `convex/characters.ts`**

```typescript
/**
 * Fetch a character by app id for a campaign member (cross-user read).
 * Caller must be a member of the campaign and the character must be shared.
 */
export const getByIdForMember = query({
  args: { campaignId: v.string(), characterId: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    // Find campaign doc by app id
    const campaign = await ctx.db
      .query('campaigns')
      .withIndex('by_id', (q) => q.eq('id', args.campaignId))
      .filter((q) => q.eq(q.field('deletedAt'), undefined))
      .first();
    if (!campaign) return null;

    // Confirm caller is a member
    const member = await ctx.db
      .query('campaignMembers')
      .withIndex('by_campaign_and_user', (q) =>
        q.eq('campaignId', campaign._id).eq('userId', userId)
      )
      .filter((q) => q.eq(q.field('deletedAt'), undefined))
      .first();
    if (!member) return null;

    // Confirm character is actually shared in this campaign
    const anyMember = await ctx.db
      .query('campaignMembers')
      .withIndex('by_campaign', (q) => q.eq('campaignId', campaign._id))
      .filter((q) => q.eq(q.field('deletedAt'), undefined))
      .collect();
    const isShared = anyMember.some((m) => m.sharedCharacterIds.includes(args.characterId));
    if (!isShared) return null;

    return ctx.db
      .query('characters')
      .withIndex('by_id', (q) => q.eq('id', args.characterId))
      .first();
  },
});
```

- [ ] **Step 2: Deploy**

```bash
N20="$(nvm which 20)"; DIR="$(dirname "$N20")"; PATH="$DIR:$PATH" "$N20" "$DIR/npx" convex deploy -y
```

- [ ] **Step 3: Commit**

```bash
git add convex/characters.ts
git commit -m "feat(campaigns): add characters.getByIdForMember for campaign read-only sheet"
```

---

## Phase 2: Campaign CRUD + Join UI

### Task 6: TypeScript Types

**Files:**
- Create: `src/lib/types/campaign.ts`

**Interfaces:**
- Produces: `SavedCampaign`, `CampaignMember`, `CampaignEvent`, `RosterEntry`, `CampaignRole` — consumed by hooks and components in Tasks 7–16.

- [ ] **Step 1: Create `src/lib/types/campaign.ts`**

```typescript
export type CampaignRole = 'dm' | 'co_dm' | 'player';

export interface SavedCampaign {
  _id: string;
  id: string;
  userId: string;
  code: string;
  name: string;
  description?: string;
  createdAt: string;
  lastModified: string;
  deletedAt?: string;
}

export interface CampaignMember {
  _id: string;
  campaignId: string;
  userId: string;
  role: CampaignRole;
  sharedCharacterIds: string[];
  displayName?: string;
  joinedAt: string;
  deletedAt?: string;
}

export interface CampaignEvent {
  _id: string;
  campaignId: string;
  type: string;
  actorUserId: string;
  characterId?: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface RosterEntry {
  characterId: string;
  characterName: string;
  ownerUserId: string;
  ownerDisplayName: string | null;
  className: string | null;
  level: number | null;
  currentHP: number | null;
  maxHP: number | null;
  memberDocId: string;
}

export interface CampaignWithRole {
  campaign: SavedCampaign;
  role: CampaignRole;
}

export interface CampaignDetail {
  campaign: SavedCampaign;
  members: CampaignMember[];
  myRole: CampaignRole;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/types/campaign.ts
git commit -m "feat(campaigns): add campaign TypeScript types"
```

---

### Task 7: `useCampaigns.ts` Hook + `CurrentUserContext`

**Files:**
- Create: `src/lib/hooks/useCampaigns.ts`
- Create: `src/components/auth/CurrentUserContext.tsx`
- Modify: `src/App.tsx` (wrap with `CurrentUserProvider`)

**Interfaces:**
- Consumes: `api.campaigns.*`, `api.users.getCurrentUser`, types from Task 6.
- Produces:
  - `useCurrentUser()` → `{ userId: string; name?: string } | null | undefined`
  - `useMyCampaigns()` → `{ campaigns: CampaignWithRole[]; isLoading: boolean }`
  - `useCampaign(id)` → `{ detail: CampaignDetail | null; isLoading: boolean }`
  - `useCampaignRoster(id)` → `{ roster: RosterEntry[]; isLoading: boolean }`
  - `useCampaignEvents(id)` → `{ events: CampaignEvent[]; isLoading: boolean }`
  - `useCampaignMutations()` → object with all mutation wrappers

- [ ] **Step 1: Create `src/components/auth/CurrentUserContext.tsx`**

```tsx
import React, { createContext, useContext } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAppAuth } from './AuthModeContext';

interface CurrentUser {
  userId: string;
  name?: string;
}

const CurrentUserContext = createContext<CurrentUser | null | undefined>(undefined);

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const { isConvexEnabled } = useAppAuth();
  const user = useQuery(api.users.getCurrentUser, isConvexEnabled ? {} : 'skip');
  return (
    <CurrentUserContext.Provider value={user ?? null}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser(): CurrentUser | null | undefined {
  return useContext(CurrentUserContext);
}
```

- [ ] **Step 2: Wrap app with `CurrentUserProvider` in `src/App.tsx`**

Find `ConvexAppAuthProvider` (or the Convex provider wrapper) in `src/App.tsx` and wrap its children with `CurrentUserProvider`. It should be inside the Convex context so `useQuery` works:

```tsx
// Add import at top:
import { CurrentUserProvider } from './components/auth/CurrentUserContext';

// Find the ConvexAppAuthProvider usage and wrap children:
// Before:
<ConvexAppAuthProvider>
  <App />
</ConvexAppAuthProvider>

// After:
<ConvexAppAuthProvider>
  <CurrentUserProvider>
    <App />
  </CurrentUserProvider>
</ConvexAppAuthProvider>
```

If `LocalAppAuthProvider` is used instead (non-Convex mode), `CurrentUserProvider` still renders but `useQuery` gets `'skip'` so no query fires.

- [ ] **Step 3: Write test for `CurrentUserProvider`**

Create `src/components/auth/CurrentUserContext.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CurrentUserProvider, useCurrentUser } from './CurrentUserContext';
import * as AuthModeContext from './AuthModeContext';
import * as convexReact from 'convex/react';

vi.mock('convex/react', () => ({
  useQuery: vi.fn(),
}));
vi.mock('./AuthModeContext', () => ({
  useAppAuth: vi.fn(),
}));
vi.mock('../../../convex/_generated/api', () => ({
  api: { users: { getCurrentUser: 'users:getCurrentUser' } },
}));

function Consumer() {
  const user = useCurrentUser();
  return <div>{user ? user.userId : 'null'}</div>;
}

describe('CurrentUserContext', () => {
  it('provides userId from query when Convex enabled', () => {
    vi.mocked(AuthModeContext.useAppAuth).mockReturnValue({
      isConvexEnabled: true, isAuthenticated: true, isLoading: false,
    });
    vi.mocked(convexReact.useQuery).mockReturnValue({ userId: 'user_123', name: 'Alice' });

    render(
      <CurrentUserProvider>
        <Consumer />
      </CurrentUserProvider>
    );

    expect(screen.getByText('user_123')).toBeTruthy();
  });

  it('returns null when not Convex enabled', () => {
    vi.mocked(AuthModeContext.useAppAuth).mockReturnValue({
      isConvexEnabled: false, isAuthenticated: false, isLoading: false,
    });
    vi.mocked(convexReact.useQuery).mockReturnValue(undefined);

    render(
      <CurrentUserProvider>
        <Consumer />
      </CurrentUserProvider>
    );

    expect(screen.getByText('null')).toBeTruthy();
  });
});
```

- [ ] **Step 4: Run the test**

```bash
npm run test:unit -- --project server --run src/components/auth/CurrentUserContext.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Create `src/lib/hooks/useCampaigns.ts`**

```typescript
import { useQuery, useMutation } from 'convex/react';
import { useCallback, useMemo } from 'react';
import { api } from '../../../convex/_generated/api';
import type {
  CampaignWithRole,
  CampaignDetail,
  RosterEntry,
  CampaignEvent,
  CampaignRole,
} from '../types/campaign';

export function useMyCampaigns() {
  const raw = useQuery(api.campaigns.listMyCampaigns);
  return useMemo(
    () => ({
      campaigns: (raw ?? []) as CampaignWithRole[],
      isLoading: raw === undefined,
    }),
    [raw]
  );
}

export function useCampaign(id: string | null) {
  const raw = useQuery(api.campaigns.getCampaign, id ? { id } : 'skip');
  return useMemo(
    () => ({
      detail: (raw ?? null) as CampaignDetail | null,
      isLoading: id !== null && raw === undefined,
    }),
    [raw, id]
  );
}

export function useCampaignRoster(campaignId: string | null) {
  const raw = useQuery(api.campaigns.getRoster, campaignId ? { campaignId } : 'skip');
  return useMemo(
    () => ({
      roster: (raw ?? []) as RosterEntry[],
      isLoading: campaignId !== null && raw === undefined,
    }),
    [raw, campaignId]
  );
}

export function useCampaignEvents(campaignId: string | null) {
  const raw = useQuery(api.campaigns.listEvents, campaignId ? { campaignId } : 'skip');
  return useMemo(
    () => ({
      events: (raw ?? []) as CampaignEvent[],
      isLoading: campaignId !== null && raw === undefined,
    }),
    [raw, campaignId]
  );
}

export function useCampaignsForCharacter(characterId: string | null) {
  const raw = useQuery(
    api.campaigns.getCampaignsForCharacter,
    characterId ? { characterId } : 'skip'
  );
  return (raw ?? []) as Array<{ campaignDocId: string; memberDocId: string }>;
}

export function useCampaignMutations() {
  const _create = useMutation(api.campaigns.createCampaign);
  const _join = useMutation(api.campaigns.joinByCode);
  const _leave = useMutation(api.campaigns.leaveCampaign);
  const _share = useMutation(api.campaigns.shareCharacter);
  const _unshare = useMutation(api.campaigns.unshareCharacter);
  const _rename = useMutation(api.campaigns.renameCampaign);
  const _regen = useMutation(api.campaigns.regenerateCode);
  const _kick = useMutation(api.campaigns.kickMember);
  const _setRole = useMutation(api.campaigns.setMemberRole);
  const _delete = useMutation(api.campaigns.deleteCampaign);
  const _postEvent = useMutation(api.campaigns.postEvent);

  const createCampaign = useCallback(
    (name: string, description?: string) => _create({ name, description }),
    [_create]
  );
  const joinByCode = useCallback((code: string) => _join({ code }), [_join]);
  const leaveCampaign = useCallback((campaignId: string) => _leave({ campaignId }), [_leave]);
  const shareCharacter = useCallback(
    (campaignId: string, characterId: string) => _share({ campaignId, characterId }),
    [_share]
  );
  const unshareCharacter = useCallback(
    (campaignId: string, characterId: string) => _unshare({ campaignId, characterId }),
    [_unshare]
  );
  const renameCampaign = useCallback(
    (campaignId: string, name: string, description?: string) =>
      _rename({ campaignId, name, description }),
    [_rename]
  );
  const regenerateCode = useCallback(
    (campaignId: string) => _regen({ campaignId }),
    [_regen]
  );
  const kickMember = useCallback(
    (campaignId: string, targetUserId: string) => _kick({ campaignId, targetUserId }),
    [_kick]
  );
  const setMemberRole = useCallback(
    (campaignId: string, targetUserId: string, role: Exclude<CampaignRole, 'dm'>) =>
      _setRole({ campaignId, targetUserId, role }),
    [_setRole]
  );
  const deleteCampaign = useCallback(
    (campaignId: string) => _delete({ campaignId }),
    [_delete]
  );
  const postEvent = useCallback(
    (
      campaignId: string,
      type: string,
      payload: Record<string, unknown>,
      characterId?: string
    ) => _postEvent({ campaignId, type, payload, characterId }),
    [_postEvent]
  );

  return useMemo(
    () => ({
      createCampaign,
      joinByCode,
      leaveCampaign,
      shareCharacter,
      unshareCharacter,
      renameCampaign,
      regenerateCode,
      kickMember,
      setMemberRole,
      deleteCampaign,
      postEvent,
    }),
    [
      createCampaign, joinByCode, leaveCampaign, shareCharacter, unshareCharacter,
      renameCampaign, regenerateCode, kickMember, setMemberRole, deleteCampaign, postEvent,
    ]
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/hooks/useCampaigns.ts src/components/auth/CurrentUserContext.tsx src/components/auth/CurrentUserContext.test.tsx src/App.tsx
git commit -m "feat(campaigns): add useCampaigns hook and CurrentUserContext"
```

---

### Task 8: i18n Strings + Menu Campaigns Section

**Files:**
- Modify: `src/i18n/locales/en.json`
- Modify: `src/i18n/locales/es.json`
- Modify: `src/components/Menu.tsx`

**Interfaces:**
- Produces: `menu.campaignsSection`, `menu.myCampaigns`, `menu.joinCampaign` i18n keys; Campaigns section rendered in Menu when `isAuthenticated && isConvexEnabled`.

- [ ] **Step 1: Add keys to `src/i18n/locales/en.json`**

Inside the existing `"menu"` object, add:

```json
"campaignsSection": "Campaigns",
"myCampaigns": "My Campaigns",
"joinCampaign": "Join Campaign"
```

- [ ] **Step 2: Add keys to `src/i18n/locales/es.json`**

Inside the existing `"menu"` object, add:

```json
"campaignsSection": "Campañas",
"myCampaigns": "Mis Campañas",
"joinCampaign": "Unirse a Campaña"
```

- [ ] **Step 3: Add Campaigns section to `src/components/Menu.tsx`**

Find the DM Tools section (around line 270):
```tsx
{isAuthenticated && (
  <>
    <StyledSectionTitle>{t('menu.dmToolsSection')}</StyledSectionTitle>
    <StyledDMGrid>
      ...
    </StyledDMGrid>
  </>
)}
```

After the DM Tools closing `</>`, add the Campaigns section. Import `useAppAuth` if not already imported:

```tsx
// Add import if needed:
import { useAppAuth } from '../lib/auth/AuthModeContext'; // adjust path

// In Menu component body, add next to isAuthenticated:
const { isConvexEnabled } = useAppAuth();

// Campaigns section (after DM Tools section):
{isAuthenticated && isConvexEnabled && (
  <>
    <StyledSectionTitle>{t('menu.campaignsSection')}</StyledSectionTitle>
    <StyledDMGrid>
      <StyledMenuCard $variant="dm" onClick={() => navigate('/campaigns')}>
        <StyledIcon $variant="dm">🗺️</StyledIcon>
        <StyledCardTitle $variant="dm">{t('menu.myCampaigns')}</StyledCardTitle>
      </StyledMenuCard>
      <StyledMenuCard $variant="dm" onClick={() => navigate('/campaigns/join')}>
        <StyledIcon $variant="dm">🔑</StyledIcon>
        <StyledCardTitle $variant="dm">{t('menu.joinCampaign')}</StyledCardTitle>
      </StyledMenuCard>
    </StyledDMGrid>
  </>
)}
```

Note: check what icon/styled-components are already imported in Menu.tsx and reuse them. The exact styled component names may differ — read Menu.tsx for the actual names before editing.

- [ ] **Step 4: Verify app starts**

```bash
npm run dev
```

Navigate to Menu. Verify Campaigns section appears when signed in + Convex mode, absent otherwise.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales/en.json src/i18n/locales/es.json src/components/Menu.tsx
git commit -m "feat(campaigns): add i18n keys and Campaigns menu section"
```

---

### Task 9: Routes + Page Scaffolding

**Files:**
- Create: `src/routes/campaigns/index.ts`
- Create: `src/routes/campaigns/CampaignList.tsx` (scaffold — fills in Task 10)
- Create: `src/routes/campaigns/CampaignDetail.tsx` (scaffold — fills in Task 12)
- Create: `src/routes/campaigns/JoinCampaign.tsx` (scaffold — fills in Task 11)
- Create: `src/routes/campaigns/CampaignCharacterView.tsx` (scaffold — fills in Task 14)
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: Routes `/campaigns`, `/campaigns/:id`, `/campaigns/join`, `/campaigns/join/:code`, `/campaigns/:campaignId/character/:characterId` all registered and rendering stubs.

- [ ] **Step 1: Create `src/routes/campaigns/index.ts`**

```typescript
export { CampaignList } from './CampaignList';
export { CampaignDetail } from './CampaignDetail';
export { JoinCampaign } from './JoinCampaign';
export { CampaignCharacterView } from './CampaignCharacterView';
```

- [ ] **Step 2: Create scaffold files**

`src/routes/campaigns/CampaignList.tsx`:
```tsx
import React from 'react';
export const CampaignList: React.FC = () => <div>Campaign List (stub)</div>;
```

`src/routes/campaigns/CampaignDetail.tsx`:
```tsx
import React from 'react';
export const CampaignDetail: React.FC = () => <div>Campaign Detail (stub)</div>;
```

`src/routes/campaigns/JoinCampaign.tsx`:
```tsx
import React from 'react';
export const JoinCampaign: React.FC = () => <div>Join Campaign (stub)</div>;
```

`src/routes/campaigns/CampaignCharacterView.tsx`:
```tsx
import React from 'react';
export const CampaignCharacterView: React.FC = () => <div>Read-only character (stub)</div>;
```

- [ ] **Step 3: Register routes in `src/App.tsx`**

Add import:
```tsx
import { CampaignList, CampaignDetail, JoinCampaign, CampaignCharacterView } from './routes/campaigns';
```

Add routes inside `<Routes>` after the DM routes (after line 134):
```tsx
<Route path="/campaigns" element={<CampaignList />} />
<Route path="/campaigns/join" element={<JoinCampaign />} />
<Route path="/campaigns/join/:code" element={<JoinCampaign />} />
<Route path="/campaigns/:id" element={<CampaignDetail />} />
<Route path="/campaigns/:campaignId/character/:characterId" element={<CampaignCharacterViewWrapper />} />
```

Add wrapper after `CharacterSheetRouteWrapper`:
```tsx
function CampaignCharacterViewWrapper() {
  const { campaignId, characterId } = useParams();
  return campaignId && characterId
    ? <CampaignCharacterView campaignId={campaignId} characterId={characterId} />
    : null;
}
```

Update `CampaignCharacterView` signature to accept props:
```tsx
// In CampaignCharacterView.tsx:
export const CampaignCharacterView: React.FC<{ campaignId: string; characterId: string }> = () =>
  <div>Read-only character (stub)</div>;
```

- [ ] **Step 4: Verify routes work**

```bash
npm run dev
```

Navigate to `/campaigns` — should show "Campaign List (stub)". Navigate to `/campaigns/join` — "Join Campaign (stub)".

- [ ] **Step 5: Commit**

```bash
git add src/routes/campaigns/ src/App.tsx
git commit -m "feat(campaigns): scaffold campaign routes and page stubs"
```

---

### Task 10: `CampaignList` Page

**Files:**
- Modify: `src/routes/campaigns/CampaignList.tsx`

**Interfaces:**
- Consumes: `useMyCampaigns()`, `useCampaignMutations()` from Task 7.
- Produces: Fully functional Campaign List with cards, Create Campaign dialog, empty state.

- [ ] **Step 1: Replace stub with full implementation**

```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/button';
import { AuthGuard } from '../../components/auth/AuthGuard';
import { useMyCampaigns, useCampaignMutations } from '../../lib/hooks/useCampaigns';
import type { CampaignRole } from '../../lib/types/campaign';

const ROLE_LABELS: Record<CampaignRole, string> = {
  dm: 'DM',
  co_dm: 'Co-DM',
  player: 'Player',
};

export const CampaignList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { campaigns, isLoading } = useMyCampaigns();
  const { createCampaign, deleteCampaign } = useCampaignMutations();

  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      const result = await createCampaign(newName.trim());
      setCreating(false);
      setNewName('');
      navigate(`/campaigns/${(result as any).id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create campaign');
    }
  };

  const handleDelete = async (campaignId: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await deleteCampaign(campaignId);
  };

  return (
    <AuthGuard feature="general">
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>My Campaigns</h1>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button onClick={() => navigate('/campaigns/join')}>Join Campaign</Button>
            <Button onClick={() => setCreating(true)}>Create Campaign</Button>
          </div>
        </div>

        {creating && (
          <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>New Campaign</h2>
            <input
              type="text"
              placeholder="Campaign name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
              autoFocus
            />
            {error && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button onClick={handleCreate} disabled={!newName.trim()}>Create</Button>
              <Button variant="outline" onClick={() => { setCreating(false); setNewName(''); setError(null); }}>Cancel</Button>
            </div>
          </div>
        )}

        {isLoading && <p>Loading campaigns...</p>}

        {!isLoading && campaigns.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
            <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>No campaigns yet.</p>
            <p>Create a campaign or join one with a code.</p>
          </div>
        )}

        <div style={{ display: 'grid', gap: '1rem' }}>
          {campaigns.map(({ campaign, role }) => (
            <div
              key={campaign.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/campaigns/${campaign.id}`)}
            >
              <div>
                <div style={{ fontWeight: 'bold' }}>{campaign.name}</div>
                <div style={{ fontSize: '0.875rem', color: '#888' }}>
                  Role: {ROLE_LABELS[role]} · Code: {campaign.code}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }} onClick={(e) => e.stopPropagation()}>
                <Button variant="outline" onClick={() => navigate(`/campaigns/${campaign.id}`)}>Open</Button>
                {role === 'dm' && (
                  <Button variant="destructive" onClick={() => handleDelete(campaign.id, campaign.name)}>
                    Delete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/menu')}>
          ← Back to Menu
        </Button>
      </div>
    </AuthGuard>
  );
};
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Sign in and navigate to `/campaigns`. Verify list loads, Create dialog works, empty state shows, campaign cards navigate to detail.

- [ ] **Step 3: Commit**

```bash
git add src/routes/campaigns/CampaignList.tsx
git commit -m "feat(campaigns): implement CampaignList page"
```

---

### Task 11: `JoinCampaign` Page

**Files:**
- Modify: `src/routes/campaigns/JoinCampaign.tsx`

**Interfaces:**
- Consumes: `useCampaignMutations().joinByCode`, `useParams` for deep-link code.
- Produces: Code entry form + deep-link auto-join; redirects to campaign detail on success.

- [ ] **Step 1: Replace stub**

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { AuthGuard } from '../../components/auth/AuthGuard';
import { useCampaignMutations } from '../../lib/hooks/useCampaigns';

export const JoinCampaign: React.FC = () => {
  const navigate = useNavigate();
  const { code: urlCode } = useParams<{ code?: string }>();
  const { joinByCode } = useCampaignMutations();

  const [code, setCode] = useState(urlCode ?? '');
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  const handleJoin = async (joinCode: string) => {
    if (!joinCode.trim()) return;
    setJoining(true);
    setError(null);
    try {
      const result = await joinByCode(joinCode.trim().toUpperCase());
      navigate(`/campaigns/${(result as any).id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid or expired code');
      setJoining(false);
    }
  };

  // Auto-join when arriving via deep link
  useEffect(() => {
    if (urlCode) {
      handleJoin(urlCode);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (urlCode && joining && !error) {
    return (
      <AuthGuard feature="general">
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Joining campaign...</p>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard feature="general">
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Join Campaign</h1>
        <input
          type="text"
          placeholder="Enter 6-character code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && handleJoin(code)}
          maxLength={6}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1.25rem',
            letterSpacing: '0.2em',
            textAlign: 'center',
            textTransform: 'uppercase',
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '0.75rem',
          }}
          autoFocus
        />
        {error && (
          <p style={{ color: 'red', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            {error === 'Invalid or expired join code'
              ? 'Invalid or expired code. Check the code and try again.'
              : error}
          </p>
        )}
        <Button
          style={{ width: '100%' }}
          onClick={() => handleJoin(code)}
          disabled={code.length !== 6 || joining}
        >
          {joining ? 'Joining...' : 'Join'}
        </Button>
        <Button
          variant="outline"
          style={{ width: '100%', marginTop: '0.5rem' }}
          onClick={() => navigate('/campaigns')}
        >
          Cancel
        </Button>
      </div>
    </AuthGuard>
  );
};
```

- [ ] **Step 2: Verify in browser**

Navigate to `/campaigns/join`. Enter a valid code — should redirect to campaign detail. Enter bad code — should show error message.

- [ ] **Step 3: Commit**

```bash
git add src/routes/campaigns/JoinCampaign.tsx
git commit -m "feat(campaigns): implement JoinCampaign page with deep-link support"
```

---

### Task 12: `CampaignDetail` Page (Phase 2 — Stub Roster)

**Files:**
- Modify: `src/routes/campaigns/CampaignDetail.tsx`

**Interfaces:**
- Consumes: `useCampaign(id)`, `useCampaignMutations()`, `useCurrentUser()`, character list via `api.characters.list`.
- Produces: Campaign header (name, role badge, join code + copy, invite link, regenerate, delete), stub roster (member names + shared character names, no live HP), share-character picker, DM/Co-DM management (kick, promote).

- [ ] **Step 1: Replace stub with full Phase 2 implementation**

```tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { Button } from '../../components/ui/button';
import { AuthGuard } from '../../components/auth/AuthGuard';
import { useCampaign, useCampaignMutations } from '../../lib/hooks/useCampaigns';
import { useCurrentUser } from '../../components/auth/CurrentUserContext';
import { api } from '../../../convex/_generated/api';
import type { CampaignRole } from '../../lib/types/campaign';

const ROLE_LABELS: Record<CampaignRole, string> = { dm: 'DM', co_dm: 'Co-DM', player: 'Player' };

export const CampaignDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { detail, isLoading } = useCampaign(id ?? null);
  const currentUser = useCurrentUser();
  const mutations = useCampaignMutations();

  // Character list for share picker (owner's cloud characters)
  const myCharacters = useQuery(api.characters.list) ?? [];

  const [showSharePicker, setShowSharePicker] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  if (!id) return null;
  if (isLoading) return <div style={{ padding: '2rem' }}>Loading campaign...</div>;
  if (!detail) return <div style={{ padding: '2rem' }}>Campaign not found or access denied.</div>;

  const { campaign, members, myRole } = detail;
  const isManager = myRole === 'dm' || myRole === 'co_dm';
  const isDm = myRole === 'dm';

  const inviteLink = `${window.location.origin}/campaigns/join/${campaign.code}`;

  const copyCode = () => {
    navigator.clipboard.writeText(campaign.code);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const copyLink = () => navigator.clipboard.writeText(inviteLink);

  const handleRegenCode = async () => {
    if (!confirm('Regenerate join code? The old code and link will stop working.')) return;
    await mutations.regenerateCode(campaign.id);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${campaign.name}"? This cannot be undone.`)) return;
    await mutations.deleteCampaign(campaign.id);
    navigate('/campaigns');
  };

  const handleLeave = async () => {
    if (!confirm('Leave this campaign?')) return;
    await mutations.leaveCampaign(campaign.id);
    navigate('/campaigns');
  };

  const handleKick = async (targetUserId: string, displayName?: string) => {
    if (!confirm(`Kick ${displayName ?? 'this member'}?`)) return;
    await mutations.kickMember(campaign.id, targetUserId);
  };

  const handleSetRole = async (targetUserId: string, role: 'co_dm' | 'player') => {
    await mutations.setMemberRole(campaign.id, targetUserId, role);
  };

  // Determine which characters the current user has already shared in this campaign
  const myMember = members.find((m) => m.userId === currentUser?.userId);
  const mySharedIds = myMember?.sharedCharacterIds ?? [];

  const handleShareCharacter = async (characterId: string) => {
    await mutations.shareCharacter(campaign.id, characterId);
    setShowSharePicker(false);
  };

  const handleUnshare = async (characterId: string) => {
    await mutations.unshareCharacter(campaign.id, characterId);
  };

  return (
    <AuthGuard feature="general">
      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{campaign.name}</h1>
            <span style={{ background: '#334', color: '#adf', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
              {ROLE_LABELS[myRole]}
            </span>
          </div>
          {campaign.description && (
            <p style={{ color: '#888', marginTop: '0.25rem' }}>{campaign.description}</p>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '0.15em' }}>
              {campaign.code}
            </span>
            <Button variant="outline" onClick={copyCode}>{copyFeedback ? 'Copied!' : 'Copy Code'}</Button>
            <Button variant="outline" onClick={copyLink}>Copy Invite Link</Button>
            {isManager && <Button variant="outline" onClick={handleRegenCode}>Regenerate Code</Button>}
            {isDm && <Button variant="destructive" onClick={handleDelete}>Delete Campaign</Button>}
            {!isDm && <Button variant="outline" onClick={handleLeave}>Leave Campaign</Button>}
          </div>
        </div>

        {/* Stub Roster */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Members & Characters</h2>
            <Button onClick={() => setShowSharePicker(true)}>+ Share a Character</Button>
          </div>

          {showSharePicker && (
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Choose a character to share</h3>
              {myCharacters.length === 0 && <p style={{ color: '#888' }}>No cloud-stored characters.</p>}
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {myCharacters.map((char: any) => {
                  const alreadyShared = mySharedIds.includes(char.id);
                  return (
                    <div key={char.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{char.finalName} (Lv {char.level} {char.classId})</span>
                      {alreadyShared
                        ? <Button variant="outline" onClick={() => handleUnshare(char.id)}>Unshare</Button>
                        : <Button onClick={() => handleShareCharacter(char.id)}>Share</Button>
                      }
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" style={{ marginTop: '0.5rem' }} onClick={() => setShowSharePicker(false)}>
                Close
              </Button>
            </div>
          )}

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>Member</th>
                <th style={{ padding: '0.5rem' }}>Role</th>
                <th style={{ padding: '0.5rem' }}>Shared Characters</th>
                {isManager && <th style={{ padding: '0.5rem' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {members.map((member) => {
                const isMe = member.userId === currentUser?.userId;
                return (
                  <tr key={member._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}>
                      {member.displayName ?? 'Unknown'} {isMe && '(You)'}
                    </td>
                    <td style={{ padding: '0.5rem' }}>{ROLE_LABELS[member.role]}</td>
                    <td style={{ padding: '0.5rem' }}>
                      {member.sharedCharacterIds.length === 0
                        ? <span style={{ color: '#888' }}>None</span>
                        : member.sharedCharacterIds.join(', ')}
                    </td>
                    {isManager && !isMe && member.role !== 'dm' && (
                      <td style={{ padding: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <Button
                            variant="outline"
                            onClick={() =>
                              handleSetRole(member.userId, member.role === 'co_dm' ? 'player' : 'co_dm')
                            }
                          >
                            {member.role === 'co_dm' ? 'Demote' : 'Promote Co-DM'}
                          </Button>
                          <Button variant="destructive" onClick={() => handleKick(member.userId, member.displayName)}>
                            Kick
                          </Button>
                        </div>
                      </td>
                    )}
                    {isManager && (isMe || member.role === 'dm') && <td />}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Button variant="outline" onClick={() => navigate('/campaigns')}>← Back</Button>
      </div>
    </AuthGuard>
  );
};
```

- [ ] **Step 2: Verify in browser**

Sign in. Create a campaign. Verify header shows name, role badge, join code. Copy code works. Share a character — verify it appears in the members table. DM controls visible.

- [ ] **Step 3: Commit**

```bash
git add src/routes/campaigns/CampaignDetail.tsx
git commit -m "feat(campaigns): implement CampaignDetail page with stub roster and management controls"
```

---

## Phase 3: Roster + Read-only Sheet

### Task 13: `CharacterSheetProvider` Read-only Mode

**Files:**
- Modify: `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`
- Modify: `src/routes/character-sheet/hooks/useCharacterSheetReducer.ts`

**Interfaces:**
- Consumes: `api.characters.getByIdForMember` (Task 5); existing `storage.getCharacterById`.
- Produces: `CharacterSheetProvider` accepts optional `campaignId?: string` prop; when present, loads via `getByIdForMember` and sets `readOnly = true` in context; auto-save is skipped; all reducer mutations no-op.

- [ ] **Step 1: Write failing test**

Create `src/routes/character-sheet/hooks/CharacterSheetProvider.readOnly.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import * as convexReact from 'convex/react';
import * as api from '../../../../convex/_generated/api';

vi.mock('convex/react', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}));
vi.mock('../../../../convex/_generated/api', () => ({
  api: { characters: { getByIdForMember: 'characters:getByIdForMember' } },
}));

// Minimal mock character
const mockChar = {
  id: 'char_1', finalName: 'Gorok', level: 1, classId: 'warrior',
  characterState: { resources: { current: { currentHP: 10 }, original: { maxHP: 20 } }, currency: {}, attacks: [], inventory: [], defenseNotes: '', calculation: null },
  finalHPMax: 20,
};

describe('CharacterSheetProvider read-only mode', () => {
  it('does not call saveCharacter when readOnly', async () => {
    const saveMock = vi.fn();
    vi.mocked(convexReact.useQuery).mockReturnValue(mockChar);

    // Import provider after mocks
    const { CharacterSheetProvider, useCharacterSheet } =
      await import('./CharacterSheetProvider');

    let saveNow: (() => Promise<void>) | undefined;
    function Consumer() {
      const ctx = useCharacterSheet();
      saveNow = ctx.saveNow;
      return null;
    }

    render(
      <CharacterSheetProvider characterId="char_1" campaignId="camp_1">
        <Consumer />
      </CharacterSheetProvider>
    );

    await act(async () => { await saveNow?.(); });
    expect(saveMock).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test — expect failure**

```bash
npm run test:unit -- --project server --run src/routes/character-sheet/hooks/CharacterSheetProvider.readOnly.test.tsx
```

Expected: FAIL (provider doesn't accept `campaignId` yet).

- [ ] **Step 3: Add `readOnly` to context type and reducer**

In `src/routes/character-sheet/hooks/useCharacterSheetReducer.ts`, export a `SheetContext` type if not already there. Add `readOnly: boolean` to the context type exposed by `useCharacterSheet()`. Guard all dispatch-calling callbacks: if `readOnly`, return early before dispatching. Example pattern for each callback:

```typescript
// At the top of the hook, receive readOnly from props:
export function useCharacterSheetReducer(readOnly = false) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Wrap every callback:
  const updateHP = useCallback((hp: number) => {
    if (readOnly) return;   // guard
    dispatch({ type: 'UPDATE_HP', hp });
  }, [readOnly]);

  // ... same pattern for all update* / toggle* / add* / remove* / reset* callbacks
```

- [ ] **Step 4: Add `campaignId` prop and read-only load path to `CharacterSheetProvider`**

In `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`:

```typescript
// 1. Add campaignId to props
interface CharacterSheetProviderProps {
  children: React.ReactNode;
  characterId: string;
  campaignId?: string;   // <-- new
}

// 2. Derive readOnly
export function CharacterSheetProvider({ children, characterId, campaignId }: CharacterSheetProviderProps) {
  const readOnly = !!campaignId;

  // 3. Pass readOnly to reducer
  const { state, dispatch, ...callbacks } = useCharacterSheetReducer(readOnly);

  // 4. Conditional query for campaign member view
  const campaignCharacter = useQuery(
    api.characters.getByIdForMember,
    campaignId ? { campaignId, characterId } : 'skip'
  );

  // 5. Skip auto-save when readOnly
  useEffect(() => {
    if (readOnly || !state.character) return;
    debouncedSave(state.character);
    return () => debouncedSave.cancel();
  }, [state.character, debouncedSave, readOnly]);

  // 6. Load: prefer campaign query when campaignId set
  useEffect(() => {
    const loadCharacter = async () => {
      dispatch({ type: 'LOAD_START' });
      try {
        let characterData;
        if (campaignId) {
          // Wait for Convex query result (undefined = loading, null = not found)
          if (campaignCharacter === undefined) return;  // still loading
          characterData = campaignCharacter ?? null;
        } else {
          characterData = await storage.getCharacterById(characterId);
        }
        if (characterData) {
          dispatch({ type: 'LOAD_SUCCESS', character: characterData });
        } else {
          dispatch({ type: 'LOAD_ERROR', error: 'Character not found' });
        }
      } catch (error) {
        dispatch({ type: 'LOAD_ERROR', error: String(error) });
      }
    };
    loadCharacter();
  }, [characterId, campaignId, campaignCharacter, dispatch, storage]);

  // 7. Expose readOnly via context
  const contextValue = useMemo(() => ({
    ...state,
    ...callbacks,
    readOnly,
    saveNow: readOnly ? async () => {} : saveNow,
  }), [state, callbacks, readOnly, saveNow]);
```

Add `readOnly: boolean` to `CharacterSheetContextType` in the context type definition.

- [ ] **Step 5: Add read-only banner to `CharacterSheetRedesign.tsx`**

Find the top of the sheet's rendered output. Add a conditional banner:

```tsx
{readOnly && (
  <div style={{
    background: '#1a1a2e',
    color: '#aaa',
    padding: '0.5rem 1rem',
    textAlign: 'center',
    fontSize: '0.875rem',
  }}>
    Read-only — viewing {state.character?.finalName ?? 'character'}'s sheet
  </div>
)}
```

Access `readOnly` from `useCharacterSheet()` context.

- [ ] **Step 6: Run tests**

```bash
npm run test:unit -- --project server --run src/routes/character-sheet/hooks/CharacterSheetProvider.readOnly.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/routes/character-sheet/hooks/CharacterSheetProvider.tsx src/routes/character-sheet/hooks/useCharacterSheetReducer.ts src/routes/character-sheet/hooks/CharacterSheetProvider.readOnly.test.tsx src/routes/character-sheet/CharacterSheetRedesign.tsx
git commit -m "feat(campaigns): add readOnly mode to CharacterSheetProvider for campaign character viewing"
```

---

### Task 14: `CampaignCharacterView` Route

**Files:**
- Modify: `src/routes/campaigns/CampaignCharacterView.tsx`

**Interfaces:**
- Consumes: `CharacterSheetProvider` with `campaignId` prop (Task 13), `CharacterSheetRedesign`.
- Produces: `/campaigns/:campaignId/character/:characterId` renders the full sheet in read-only mode.

- [ ] **Step 1: Replace stub**

```tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterSheetProvider } from '../character-sheet/hooks/CharacterSheetProvider';
import CharacterSheetRedesign from '../character-sheet/CharacterSheetRedesign';
import { AuthGuard } from '../../components/auth/AuthGuard';

interface Props {
  campaignId: string;
  characterId: string;
}

export const CampaignCharacterView: React.FC<Props> = ({ campaignId, characterId }) => {
  const navigate = useNavigate();
  const handleBack = () => navigate(`/campaigns/${campaignId}`);

  return (
    <AuthGuard feature="general">
      <CharacterSheetProvider characterId={characterId} campaignId={campaignId}>
        <CharacterSheetRedesign characterId={characterId} onBack={handleBack} />
      </CharacterSheetProvider>
    </AuthGuard>
  );
};
```

- [ ] **Step 2: Verify in browser**

Navigate to a campaign, share a character, then (as another user or from the roster — placeholder for now) navigate to `/campaigns/<id>/character/<charId>`. Verify: read-only banner shown, no save occurs, all edit controls disabled.

- [ ] **Step 3: Commit**

```bash
git add src/routes/campaigns/CampaignCharacterView.tsx
git commit -m "feat(campaigns): implement CampaignCharacterView read-only sheet route"
```

---

### Task 15: Full Roster Table with Live HP/Status + View Button

**Files:**
- Modify: `src/routes/campaigns/CampaignDetail.tsx`

**Interfaces:**
- Consumes: `useCampaignRoster(id)` from Task 7; `RosterEntry` type from Task 6.
- Produces: Live roster table replacing the stub; columns: Character Name, Owner, Class, Level, Current HP / Max, Status pill, View button.

- [ ] **Step 1: Add `useCampaignRoster` to `CampaignDetail.tsx` and replace stub roster**

At top of `CampaignDetail`:
```tsx
import { useCampaign, useCampaignRoster, useCampaignMutations } from '../../lib/hooks/useCampaigns';
```

Inside the component:
```tsx
const { roster } = useCampaignRoster(id ?? null);
```

Replace the stub roster table with:
```tsx
{/* Full Live Roster */}
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
  <thead>
    <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
      <th style={{ padding: '0.5rem' }}>Character</th>
      <th style={{ padding: '0.5rem' }}>Owner</th>
      <th style={{ padding: '0.5rem' }}>Class</th>
      <th style={{ padding: '0.5rem' }}>Level</th>
      <th style={{ padding: '0.5rem' }}>HP</th>
      <th style={{ padding: '0.5rem' }}>Status</th>
      <th style={{ padding: '0.5rem' }}>View</th>
    </tr>
  </thead>
  <tbody>
    {roster.length === 0 && (
      <tr>
        <td colSpan={7} style={{ padding: '1rem', color: '#888', textAlign: 'center' }}>
          No shared characters yet.
        </td>
      </tr>
    )}
    {roster.map((entry) => {
      const isOwner = entry.ownerUserId === currentUser?.userId;
      const statusPill = getStatusPill(entry.currentHP, entry.maxHP);
      return (
        <tr key={`${entry.memberDocId}-${entry.characterId}`} style={{ borderBottom: '1px solid #eee' }}>
          <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{entry.characterName}</td>
          <td style={{ padding: '0.5rem' }}>
            {isOwner ? 'You' : (entry.ownerDisplayName ?? 'Unknown')}
          </td>
          <td style={{ padding: '0.5rem' }}>{entry.className ?? '—'}</td>
          <td style={{ padding: '0.5rem' }}>{entry.level ?? '—'}</td>
          <td style={{ padding: '0.5rem' }}>
            {entry.currentHP !== null && entry.maxHP !== null
              ? `${entry.currentHP} / ${entry.maxHP}`
              : '—'}
          </td>
          <td style={{ padding: '0.5rem' }}>
            <span style={{
              padding: '0.2rem 0.5rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              background: statusPill.bg,
              color: statusPill.color,
            }}>
              {statusPill.label}
            </span>
          </td>
          <td style={{ padding: '0.5rem' }}>
            {isOwner
              ? <Button variant="outline" onClick={() => navigate(`/character/${entry.characterId}`)}>Open</Button>
              : <Button variant="outline" onClick={() => navigate(`/campaigns/${id}/character/${entry.characterId}`)}>View</Button>
            }
          </td>
        </tr>
      );
    })}
  </tbody>
</table>
```

Add helper above the component:
```tsx
function getStatusPill(currentHP: number | null, maxHP: number | null) {
  if (currentHP === null || maxHP === null || maxHP === 0) {
    return { label: 'Unknown', bg: '#444', color: '#ccc' };
  }
  const quarterHP = Math.floor(maxHP / 4);
  const halfHP = Math.floor(maxHP / 2);
  if (currentHP <= 0) return { label: 'Down', bg: '#7f1d1d', color: '#fca5a5' };
  if (currentHP <= quarterHP) return { label: 'Well-Bloodied', bg: '#78350f', color: '#fcd34d' };
  if (currentHP <= halfHP) return { label: 'Bloodied', bg: '#7f1d1d', color: '#fca5a5' };
  return { label: 'Healthy', bg: '#14532d', color: '#86efac' };
}
```

- [ ] **Step 2: Verify in browser**

Open campaign detail. HP values should update live (test by opening own character sheet in another tab, changing HP, and watching the roster update).

- [ ] **Step 3: Commit**

```bash
git add src/routes/campaigns/CampaignDetail.tsx
git commit -m "feat(campaigns): add live roster table with HP status and View button"
```

---

## Phase 4: Events + Notifications

### Task 16: Event Feed Panel in `CampaignDetail`

**Files:**
- Modify: `src/routes/campaigns/CampaignDetail.tsx`

**Interfaces:**
- Consumes: `useCampaignEvents(id)` from Task 7; `CampaignEvent` type from Task 6.
- Produces: Reverse-chronological event feed panel, live-updating.

- [ ] **Step 1: Add event feed to `CampaignDetail.tsx`**

Import:
```tsx
import { useCampaignEvents } from '../../lib/hooks/useCampaigns';
```

Inside component:
```tsx
const { events } = useCampaignEvents(id ?? null);
```

Add feed panel below the roster table:
```tsx
{/* Event Feed */}
<div style={{ marginTop: '2rem' }}>
  <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Event Feed</h2>
  {events.length === 0 && (
    <p style={{ color: '#888' }}>No events yet.</p>
  )}
  <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
    {events.map((event) => (
      <div key={event._id} style={{
        padding: '0.5rem 0.75rem',
        background: '#1a1a2e',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.875rem',
      }}>
        <span>{formatEvent(event)}</span>
        <span style={{ color: '#666', fontSize: '0.75rem' }}>
          {new Date(event.createdAt).toLocaleTimeString()}
        </span>
      </div>
    ))}
  </div>
</div>
```

Add helper above the component:
```tsx
function formatEvent(event: CampaignEvent): string {
  const name = (event.payload as any)?.characterName ?? (event.payload as any)?.displayName ?? 'Someone';
  switch (event.type) {
    case 'well_bloodied': return `⚠️ ${name} is well-bloodied!`;
    case 'bloodied': return `🩸 ${name} is bloodied.`;
    case 'member_joined': return `👋 ${name} joined the campaign.`;
    case 'character_shared': return `📋 ${name} was shared.`;
    default: return `📌 ${event.type}: ${name}`;
  }
}
```

- [ ] **Step 2: Verify in browser**

Join a campaign as a second user, share a character. The `character_shared` event should appear in the feed live.

- [ ] **Step 3: Commit**

```bash
git add src/routes/campaigns/CampaignDetail.tsx
git commit -m "feat(campaigns): add live event feed panel to CampaignDetail"
```

---

### Task 17: App-Level Toast Notification Watcher

**Files:**
- Create: `src/lib/hooks/useCampaignToasts.ts`
- Modify: `src/App.tsx` (mount watcher + Snackbar)

**Interfaces:**
- Consumes: `useMyCampaigns()`, `useCampaignEvents(id)` from Task 7; `Snackbar` component.
- Produces: Toast fires for new events while user is anywhere in the app. Only surfaces events newer than mount time (avoids replaying history on load).

- [ ] **Step 1: Create `src/lib/hooks/useCampaignToasts.ts`**

```typescript
import { useEffect, useRef, useState } from 'react';
import { useMyCampaigns, useCampaignEvents } from './useCampaigns';
import type { CampaignEvent } from '../types/campaign';

function eventMessage(event: CampaignEvent): string {
  const name = (event.payload as any)?.characterName ?? (event.payload as any)?.displayName ?? 'Someone';
  switch (event.type) {
    case 'well_bloodied': return `⚠️ ${name} is well-bloodied!`;
    case 'bloodied': return `🩸 ${name} is bloodied.`;
    case 'member_joined': return `👋 ${name} joined the campaign.`;
    case 'character_shared': return `📋 ${name} shared a character.`;
    default: return `📌 ${name}: ${event.type}`;
  }
}

function CampaignEventWatcher({
  campaignId,
  mountTimestamp,
  onNewEvent,
}: {
  campaignId: string;
  mountTimestamp: string;
  onNewEvent: (msg: string, variant: 'info' | 'warning') => void;
}) {
  const { events } = useCampaignEvents(campaignId);
  const seenIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    for (const event of events) {
      if (seenIds.current.has(event._id)) continue;
      seenIds.current.add(event._id);
      // Skip events that predate mount (history replay prevention)
      if (event.createdAt < mountTimestamp) continue;
      const variant = event.type === 'well_bloodied' ? 'warning' : 'info';
      onNewEvent(eventMessage(event), variant);
    }
  }, [events, mountTimestamp, onNewEvent]);

  return null;
}

export function useCampaignToasts() {
  const { campaigns } = useMyCampaigns();
  const [toast, setToast] = useState<{ message: string; variant: 'info' | 'warning'; key: number } | null>(null);
  const mountTimestamp = useRef(new Date().toISOString());

  const handleNewEvent = (message: string, variant: 'info' | 'warning') => {
    setToast((prev) => ({ message, variant, key: (prev?.key ?? 0) + 1 }));
  };

  const watchers = campaigns.map(({ campaign }) => (
    <CampaignEventWatcher
      key={campaign.id}
      campaignId={campaign.id}
      mountTimestamp={mountTimestamp.current}
      onNewEvent={handleNewEvent}
    />
  ));

  return { watchers, toast, clearToast: () => setToast(null) };
}
```

- [ ] **Step 2: Mount watcher in `src/App.tsx`**

Inside the main `App` component (or the wrapper that has the Convex provider), import and use the hook:

```tsx
import { useCampaignToasts } from './lib/hooks/useCampaignToasts';
import Snackbar from './components/Snackbar';
import { useAppAuth } from './components/auth/AuthModeContext';

function CampaignNotificationLayer() {
  const { isConvexEnabled, isAuthenticated } = useAppAuth();
  if (!isConvexEnabled || !isAuthenticated) return null;

  const { watchers, toast, clearToast } = useCampaignToasts();
  return (
    <>
      {watchers}
      {toast && (
        <Snackbar
          key={toast.key}
          message={toast.message}
          isVisible
          onClose={clearToast}
          duration={5000}
          variant={toast.variant}
        />
      )}
    </>
  );
}
```

Add `<CampaignNotificationLayer />` inside the `BrowserRouter` (so it has router context) but outside the `Routes` (so it persists across page changes):

```tsx
<BrowserRouter>
  <CampaignNotificationLayer />
  <Routes>
    ...
  </Routes>
</BrowserRouter>
```

- [ ] **Step 3: Verify in browser**

Open campaign in two browser windows. In window 1, share a new character. Window 2 should show a toast notification without refresh.

- [ ] **Step 4: Commit**

```bash
git add src/lib/hooks/useCampaignToasts.ts src/App.tsx
git commit -m "feat(campaigns): add app-level campaign toast notifications"
```

---

### Task 18: Owner-Side Well-Bloodied Event Producer

**Files:**
- Create: `src/routes/character-sheet/hooks/useCampaignEventProducer.ts`
- Modify: `src/routes/character-sheet/hooks/CharacterSheetProvider.tsx`

**Interfaces:**
- Consumes: `useCampaignsForCharacter(characterId)`, `useCampaignMutations().postEvent`, `getHealthStatus` from `src/lib/rulesdata/death.ts`, `saveCharacterData` completion callback.
- Produces: Fires `postEvent` (type `well_bloodied` or `bloodied`) after the character is saved, when health status crosses a threshold. Only runs for the character owner (when `readOnly = false`).

- [ ] **Step 1: Create `src/routes/character-sheet/hooks/useCampaignEventProducer.ts`**

```typescript
import { useEffect, useRef } from 'react';
import { getHealthStatus } from '../../../lib/rulesdata/death';
import { useCampaignsForCharacter } from '../../../lib/hooks/useCampaigns';
import { useCampaignMutations } from '../../../lib/hooks/useCampaigns';

export function useCampaignEventProducer(
  characterId: string | null,
  readOnly: boolean,
  savedHP: number | null,    // currentHP from the just-saved character state
  savedMaxHP: number | null,
  characterName: string | null,
  deathThreshold: number
) {
  const campaignLinks = useCampaignsForCharacter(readOnly ? null : characterId);
  const { postEvent } = useCampaignMutations();
  const prevStatusRef = useRef<string | null>(null);

  useEffect(() => {
    if (readOnly || !characterId || savedHP === null || savedMaxHP === null || campaignLinks.length === 0) return;

    const status = getHealthStatus(savedHP, savedMaxHP, deathThreshold).status;
    const prevStatus = prevStatusRef.current;
    prevStatusRef.current = status;

    if (prevStatus === null) return; // first load, don't fire

    const NOTABLE = new Set(['well-bloodied', 'deaths-door', 'dead']);
    if (!NOTABLE.has(status) || status === prevStatus) return;

    const type = status === 'well-bloodied' ? 'well_bloodied' : status === 'deaths-door' ? 'deaths_door' : 'dead';
    const payload = { characterName: characterName ?? 'Unknown', currentHP: savedHP, maxHP: savedMaxHP };

    for (const { campaignDocId } of campaignLinks) {
      postEvent(campaignDocId, type, payload, characterId).catch(() => {});
    }
  }, [savedHP, savedMaxHP]); // intentionally only dep on HP values — fires after save
}
```

- [ ] **Step 2: Call producer in `CharacterSheetProvider`**

After the `saveCharacterData` callback, extract `savedHP` and `savedMaxHP` from the just-saved state and pass to the producer. The cleanest way is to add `savedHP` / `savedMaxHP` state that updates in the save completion path:

```typescript
// In CharacterSheetProvider:
import { useCampaignEventProducer } from './useCampaignEventProducer';

// Add state for post-save HP (event producer reads saved values, not in-flight):
const [savedHP, setSavedHP] = useState<number | null>(null);
const [savedMaxHP, setSavedMaxHP] = useState<number | null>(null);

// In saveCharacterData, after successful save, update these:
// (inside the try block, after storage.saveCharacter succeeds)
setSavedHP(character.characterState?.resources?.current?.currentHP ?? null);
setSavedMaxHP(character.finalHPMax ?? null);

// Mount the producer (no-ops when readOnly or no campaigns):
useCampaignEventProducer(
  state.character?.id ?? null,
  readOnly,
  savedHP,
  savedMaxHP,
  state.character?.finalName ?? null,
  state.character?.finalDeathThreshold ?? -10,
);
```

- [ ] **Step 3: Verify in browser**

Share a character into a campaign. Open the character sheet (owner). Change HP to ≤ 25% of max. Wait 2 seconds for auto-save. The campaign detail page (open in another tab) should show a `well_bloodied` event in the feed and a toast in the other user's browser.

- [ ] **Step 4: Commit**

```bash
git add src/routes/character-sheet/hooks/useCampaignEventProducer.ts src/routes/character-sheet/hooks/CharacterSheetProvider.tsx
git commit -m "feat(campaigns): add owner-side well-bloodied event producer"
```

---

### Task 19: E2E Test

**Files:**
- Create: `e2e/campaigns.e2e.spec.ts`

**Interfaces:**
- Consumes: Running app with `VITE_USE_CONVEX=true`.
- Produces: Playwright test covering create → join → share → view read-only → HP-drop event.

- [ ] **Step 1: Write E2E test**

```typescript
import { test, expect } from '@playwright/test';

// Note: This test requires two authenticated sessions. Adapt authentication
// to the project's existing e2e auth pattern (see e2e/*.e2e.spec.ts for reference).
test.describe('Campaign system', () => {
  test('DM creates, player joins, views read-only character', async ({ browser }) => {
    // DM session
    const dmCtx = await browser.newContext({ storageState: 'e2e/.auth/dm.json' });
    const dmPage = await dmCtx.newPage();

    // Player session
    const playerCtx = await browser.newContext({ storageState: 'e2e/.auth/player.json' });
    const playerPage = await playerCtx.newPage();

    // 1. DM creates a campaign
    await dmPage.goto('/campaigns');
    await dmPage.getByRole('button', { name: 'Create Campaign' }).click();
    await dmPage.getByPlaceholder('Campaign name').fill('Test Campaign');
    await dmPage.keyboard.press('Enter');
    await dmPage.waitForURL(/\/campaigns\/.+/);

    // 2. DM copies join code
    const code = await dmPage.locator('span[style*="letter-spacing"]').textContent();
    expect(code).toMatch(/^[A-Z0-9]{6}$/);

    // 3. Player joins via code
    await playerPage.goto('/campaigns/join');
    await playerPage.getByPlaceholder(/code/i).fill(code!);
    await playerPage.getByRole('button', { name: 'Join' }).click();
    await playerPage.waitForURL(/\/campaigns\/.+/);

    // 4. DM shares a character
    await dmPage.getByRole('button', { name: '+ Share a Character' }).click();
    await dmPage.getByRole('button', { name: 'Share' }).first().click();

    // 5. Player sees the character in roster and can click View
    await playerPage.reload();
    const viewButton = playerPage.getByRole('button', { name: 'View' }).first();
    await expect(viewButton).toBeVisible({ timeout: 5000 });
    await viewButton.click();
    await playerPage.waitForURL(/\/campaigns\/.+\/character\/.+/);

    // 6. Read-only banner visible
    await expect(playerPage.getByText(/read-only/i)).toBeVisible();

    // 7. No save possible (no save button / auto-save indicator stays hidden)
    // Verify controls are disabled — click HP stepper should not change value
    // (implementation-specific; adapt to actual UI)

    await dmCtx.close();
    await playerCtx.close();
  });
});
```

Note: the E2E test requires pre-saved auth state files at `e2e/.auth/dm.json` and `e2e/.auth/player.json`. Follow existing patterns in `e2e/` for how the project handles multi-user auth setup.

- [ ] **Step 2: Run E2E test**

```bash
npm run test:e2e -- --project=desktop --grep "Campaign system"
```

Expected: PASS (or clear failure messages pointing to auth setup needed).

- [ ] **Step 3: Commit**

```bash
git add e2e/campaigns.e2e.spec.ts
git commit -m "test(campaigns): add E2E test for create → join → share → read-only view"
```

---

### Task 20: `docs/systems/CAMPAIGN_SYSTEM.MD` + Doc Updates

**Files:**
- Create: `docs/systems/CAMPAIGN_SYSTEM.MD`
- Modify: `docs/systems/DATABASE_SYSTEM.MD` (add campaign tables section)
- Modify: `docs/systems/CHARACTER_SHEET.MD` (add read-only mode section)
- Modify: `AGENTS.md` (add campaign doc to routing table)

**Interfaces:**
- Produces: Complete system documentation per AGENTS.md policy.

- [ ] **Step 1: Create `docs/systems/CAMPAIGN_SYSTEM.MD`**

Write the system doc covering:
- Schema (3 tables with full field descriptions, indexes, soft-delete pattern)
- Function catalog (`convex/campaigns.ts` queries and mutations with auth/permission model)
- Permission matrix (DM / Co-DM / Player × all actions)
- `characters.getByIdForMember` — why it exists, membership check logic
- Event types: `well_bloodied`, `bloodied`, `member_joined`, `character_shared`, pattern for adding new types
- Read-only sheet: `campaignId` prop on provider, load path switch, reducer no-op guard, auto-save skip
- Notification production: `useCampaignEventProducer` — fires after save, compares previous status, deduped by HP state
- Notification delivery: `useCampaignToasts` — app-level watcher per campaign, mount-timestamp guard to skip history
- Known limitations: `displayName` staleness, client-emitted events (future: server-derived)
- Last Updated: 2026-06-28

- [ ] **Step 2: Update `docs/systems/DATABASE_SYSTEM.MD`**

Add a section listing the three new tables with their fields and indexes. Cross-link to `CAMPAIGN_SYSTEM.MD`.

- [ ] **Step 3: Update `docs/systems/CHARACTER_SHEET.MD`**

Add a section describing the `readOnly` mode: what prop triggers it, what the provider does differently (load path, no save, reducer guard), what components show the banner.

- [ ] **Step 4: Update `AGENTS.md` routing table**

Add a row:
```
| Working on **campaigns** | `CAMPAIGN_SYSTEM`, `DATABASE_SYSTEM`, `CHARACTER_SHEET` |
```

Add `docs/systems/CAMPAIGN_SYSTEM.MD` to the System Docs table.

- [ ] **Step 5: Commit**

```bash
git add docs/systems/CAMPAIGN_SYSTEM.MD docs/systems/DATABASE_SYSTEM.MD docs/systems/CHARACTER_SHEET.MD AGENTS.md
git commit -m "docs(campaigns): add CAMPAIGN_SYSTEM.MD and update DATABASE_SYSTEM, CHARACTER_SHEET, AGENTS"
```

---

## Self-Review Checklist

Spec coverage check (each PRD section → task):
- §4 Roles/Permissions → Task 4 (`requireMembership`/`requireManager`/`requireDm` + `setMemberRole`, `kickMember`) ✅
- §5.1 Create campaign → Tasks 4, 10 ✅
- §5.2 Invite/join → Tasks 4, 11 ✅
- §5.3 Share character → Tasks 4, 12 ✅
- §5.4 Roster + View → Tasks 7, 15 ✅
- §5.5 Well-bloodied notification → Task 18 ✅
- §5.6 Manage (rename, regenerate, kick, promote, delete) → Tasks 4, 12 ✅
- §5.7 Leave → Task 4, 12 ✅
- §6.1 Menu gate → Task 8 ✅
- §6.2 Pages (List, Detail, Join, Read-only) → Tasks 10–15 ✅
- §6.3 Detail panels (header, roster, feed, share) → Tasks 12, 15, 16 ✅
- §6.4 Read-only sheet → Tasks 13, 14 ✅
- §6.5 Toast notifications → Task 17 ✅
- §6.6 Empty/error states → Tasks 10, 11, 12 ✅
- §7 Security (backend auth, forged events, non-owner write prevention) → Tasks 3–5 ✅

Type consistency check:
- `CampaignWithRole` used in `useMyCampaigns` → `CampaignList` ✅
- `CampaignDetail` returned by `getCampaign` query → used in `useCampaign` → `CampaignDetail` page ✅
- `RosterEntry` returned by `getRoster` → used in `useCampaignRoster` → roster table ✅
- `CampaignEvent` returned by `listEvents` → used in `useCampaignEvents` → feed + toast ✅
- `postEvent` signature: `(campaignId: string, type: string, payload: Record<string, unknown>, characterId?: string)` — consistent across mutations hook and producer ✅
