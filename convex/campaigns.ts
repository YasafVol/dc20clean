import { v } from 'convex/values';
import { query } from './_generated/server';
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
