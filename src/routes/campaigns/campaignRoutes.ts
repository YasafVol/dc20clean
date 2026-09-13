export function buildCampaignCharacterViewPath(
	campaignId: string,
	characterId: string,
	characterDocId: string
): string {
	return `/campaigns/${campaignId}/character/${characterId}?record=${encodeURIComponent(characterDocId)}`;
}
