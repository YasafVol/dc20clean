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
    .withIndex('by_app_id', (q: any) => q.eq('id', id))
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
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

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
          .withIndex('by_app_id', (q: any) => q.eq('id', charId))
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
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

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

// ============================================================================
// MUTATIONS
// ============================================================================

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => chars[b % chars.length]).join('');
}

export const createCampaign = mutation({
  args: { name: v.string(), description: v.optional(v.string()) },
  returns: v.object({ id: v.string() }),
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

    const members = await ctx.db
      .query('campaignMembers')
      .withIndex('by_campaign', (q: any) => q.eq('campaignId', campaign._id))
      .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
      .collect();
    const target = members.find((m: any) => m.userId.toString() === args.targetUserId);
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

    const members = await ctx.db
      .query('campaignMembers')
      .withIndex('by_campaign', (q: any) => q.eq('campaignId', campaign._id))
      .filter((q: any) => q.eq(q.field('deletedAt'), undefined))
      .collect();
    const target = members.find((m: any) => m.userId.toString() === args.targetUserId);
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
