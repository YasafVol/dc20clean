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
