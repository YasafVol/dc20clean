import { useCallback, useEffect, useRef, useState } from 'react';
import { useMyCampaigns, useCampaignEvents } from './useCampaigns';
import type { CampaignEvent } from '../types/campaign';

function eventMessage(event: CampaignEvent): string {
  const name =
    (event.payload as Record<string, unknown>)?.characterName ??
    (event.payload as Record<string, unknown>)?.displayName ??
    'Someone';
  switch (event.type) {
    case 'well_bloodied':
      return `[!!] ${name} is well-bloodied!`;
    case 'bloodied':
      return `[~] ${name} is bloodied.`;
    case 'member_joined':
      return `[+] ${name} joined the campaign.`;
    case 'character_shared':
      return `[~] ${name} shared a character.`;
    default:
      return `[*] ${name}: ${event.type}`;
  }
}

interface CampaignEventWatcherProps {
  campaignId: string;
  mountTimestamp: string;
  onNewEvent: (msg: string, variant: 'info' | 'warning') => void;
}

export function CampaignEventWatcher({
  campaignId,
  mountTimestamp,
  onNewEvent,
}: CampaignEventWatcherProps): null {
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

export interface CampaignToast {
  message: string;
  variant: 'info' | 'warning';
  key: number;
}

export interface UseCampaignToastsResult {
  watchers: React.ReactElement[];
  toast: CampaignToast | null;
  clearToast: () => void;
}

export function useCampaignToasts(): UseCampaignToastsResult {
  const { campaigns } = useMyCampaigns();
  const [toast, setToast] = useState<CampaignToast | null>(null);
  const mountTimestamp = useRef(new Date().toISOString());

  const handleNewEvent = useCallback((message: string, variant: 'info' | 'warning') => {
    setToast((prev) => ({ message, variant, key: (prev?.key ?? 0) + 1 }));
  }, []);

  const watchers = campaigns.map(({ campaign }) =>
    React.createElement(CampaignEventWatcher, {
      key: campaign.id,
      campaignId: campaign.id,
      mountTimestamp: mountTimestamp.current,
      onNewEvent: handleNewEvent,
    })
  );

  return { watchers, toast, clearToast: () => setToast(null) };
}
