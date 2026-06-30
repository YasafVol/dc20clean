import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMyCampaigns, useCampaignEvents } from './useCampaigns';
import type { CampaignEvent } from '../types/campaign';

function eventMessage(event: CampaignEvent): string {
  const p = event.payload as any;
  const name = p?.characterName ?? p?.displayName ?? 'Someone';
  switch (event.type) {
    case 'well_bloodied':      return `${name} is well-bloodied!`;
    case 'bloodied':           return `${name} is bloodied.`;
    case 'deaths_door':        return `${name} is on Death's Door!`;
    case 'dead':               return `${name} has died.`;
    case 'recovered':          return `${name} has recovered.`;
    case 'rage_start':         return `${name} enters a Rage!`;
    case 'rage_end':           return `${name} rage ends.`;
    case 'wild_form_enter':    return `${name} transforms into Wild Form!`;
    case 'wild_form_exit':     return `${name} returns from Wild Form.`;
    case 'spell_cast':         return `${name} casts ${p?.spellName ?? 'a spell'}${p?.sustained ? ' (sustained)' : ''}.`;
    case 'maneuver_used':      return `${name} uses ${p?.maneuverName ?? 'a maneuver'}.`;
    case 'long_rest':          return `${name} takes a Long Rest.`;
    case 'condition_gained':   return `${name} gains: ${p?.conditionId ?? 'a condition'}.`;
    case 'condition_cured':    return `${name} cured of: ${p?.conditionId ?? 'a condition'}.`;
    case 'exhaustion_changed': return `${name} exhaustion level: ${p?.level ?? '?'}.`;
    case 'dice_roll':          return `${name}: ${p?.label ?? 'd20'} = ${p?.total ?? '?'}`;
    case 'member_joined':      return `${name} joined the campaign.`;
    case 'character_shared':   return `${name} shared a character.`;
    default:                   return `${name}: ${event.type}`;
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
    const WARNING_TYPES = new Set([
      'well_bloodied', 'deaths_door', 'dead',
      'rage_start', 'wild_form_enter', 'condition_gained', 'exhaustion_changed',
    ]);

    for (const event of events) {
      if (seenIds.current.has(event._id)) continue;
      seenIds.current.add(event._id);
      // Skip events that predate mount (history replay prevention)
      if (event.createdAt < mountTimestamp) continue;
      const variant = WARNING_TYPES.has(event.type as any) ? 'warning' : 'info';
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
