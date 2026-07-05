import { useState, useCallback, useMemo } from 'react';
import { useMyCampaigns, useCampaignEvents } from '../../../lib/hooks/useCampaigns';
import { useCurrentUser } from '../../../components/auth/CurrentUserContext';
import type { CampaignEvent } from '../../../lib/types/campaign';

// Watches all campaigns the logged-in user belongs to (up to 3) so the bell and
// feed are consistent with the global toast system, which also watches all campaigns.
export function useCampaignNotifications(characterId: string | null): {
  campaignName: string | null;
  campaignId: string | null;
  events: CampaignEvent[];
  unreadCount: number;
  markSeen: () => void;
  inCampaign: boolean;
} {
  const { campaigns } = useMyCampaigns();

  // Always call 3 slots (rules of hooks — no conditional calls).
  const id0 = (campaigns[0]?.campaign as any)?.id ?? null;
  const id1 = (campaigns[1]?.campaign as any)?.id ?? null;
  const id2 = (campaigns[2]?.campaign as any)?.id ?? null;

  const { events: events0 } = useCampaignEvents(id0);
  const { events: events1 } = useCampaignEvents(id1);
  const { events: events2 } = useCampaignEvents(id2);

  const events = useMemo(
    () =>
      [...events0, ...events1, ...events2].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [events0, events1, events2]
  );

  const campaignName = useMemo(() => {
    if (campaigns.length === 0) return null;
    return campaigns.map((c) => (c.campaign as any).name as string).join(', ');
  }, [campaigns]);

  const primaryCampaignId = id0;

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
    // Count events from characters other than the one being viewed, or from
    // other users when no characterId is present (e.g. member_joined events).
    return events.filter((e) => {
      if (e.createdAt <= lastSeenAt) return false;
      if (e.characterId != null) return e.characterId !== characterId;
      // No characterId: fall back to user-based filter
      return currentUser ? e.actorUserId !== currentUser.userId : false;
    }).length;
  }, [events, characterId, currentUser, lastSeenAt]);

  return {
    campaignName,
    campaignId: primaryCampaignId,
    events,
    unreadCount,
    markSeen,
    inCampaign: campaigns.length > 0,
  };
}
