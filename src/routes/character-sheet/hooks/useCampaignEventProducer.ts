import { useEffect, useRef } from 'react';
import { getHealthStatus } from '../../../lib/rulesdata/death';
import { useCampaignsForCharacter, useCampaignMutations } from '../../../lib/hooks/useCampaigns';

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
		if (readOnly || !characterId || savedHP === null || savedMaxHP === null) return;

		const status = getHealthStatus(savedHP, savedMaxHP, deathThreshold).status;
		const prevStatus = prevStatusRef.current;

		if (prevStatus === null) {
			// First time we have valid HP — record baseline, never fire on first load
			prevStatusRef.current = status;
			return;
		}

		prevStatusRef.current = status;

		// Only fire if campaigns are loaded and something notable changed
		if (campaignLinks.length === 0) return;
		const NOTABLE = new Set(['bloodied', 'well-bloodied', 'deaths-door', 'dead']);
		if (!NOTABLE.has(status) || status === prevStatus) return;

		const type =
			status === 'bloodied' ? 'bloodied' :
			status === 'well-bloodied' ? 'well_bloodied' :
			status === 'deaths-door' ? 'deaths_door' : 'dead';
		const payload = { characterName: characterName ?? 'Unknown', currentHP: savedHP, maxHP: savedMaxHP };

		for (const { campaignDocId } of campaignLinks) {
			postEvent(campaignDocId, type, payload, characterId).catch(() => {});
		}
	}, [savedHP, savedMaxHP, campaignLinks.length]); // campaignLinks.length needed: campaigns may load after first HP save
}
