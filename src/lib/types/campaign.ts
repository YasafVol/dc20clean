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
