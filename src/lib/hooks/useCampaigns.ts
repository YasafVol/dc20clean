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
