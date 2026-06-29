import { useEffect, useRef } from 'react';
import { getHealthStatus } from '../../../lib/rulesdata/death';
import { useCampaignsForCharacter, useCampaignMutations } from '../../../lib/hooks/useCampaigns';

export function useCampaignEventProducer(
	characterId: string | null,
	readOnly: boolean,
	savedHP: number | null,
	savedMaxHP: number | null,
	characterName: string | null,
	deathThreshold: number,
	savedIsDead: boolean
) {
	const campaignLinks = useCampaignsForCharacter(readOnly ? null : characterId);
	const { postEvent } = useCampaignMutations();
	const prevStatusRef = useRef<string | null>(null);
	const prevIsDeadRef = useRef<boolean>(false);

	// HP-based status transitions: bloodied, well-bloodied, deaths-door, recovered
	useEffect(() => {
		if (readOnly || !characterId || savedHP === null || savedMaxHP === null) return;

		const status = getHealthStatus(savedHP, savedMaxHP, deathThreshold).status;
		const prevStatus = prevStatusRef.current;

		if (prevStatus === null) {
			// First valid HP reading — record baseline, never fire
			prevStatusRef.current = status;
			return;
		}

		prevStatusRef.current = status;

		if (campaignLinks.length === 0) return;

		const NOTABLE = new Set(['bloodied', 'well-bloodied', 'deaths-door', 'healthy']);
		if (!NOTABLE.has(status) || status === prevStatus) return;

		const type =
			status === 'healthy' ? 'recovered' :
			status === 'bloodied' ? 'bloodied' :
			status === 'well-bloodied' ? 'well_bloodied' :
			'deaths_door';
		const payload = { characterName: characterName ?? 'Unknown', currentHP: savedHP, maxHP: savedMaxHP };

		for (const { campaignDocId } of campaignLinks) {
			postEvent(campaignDocId, type, payload, characterId).catch(() => {});
		}
	}, [savedHP, savedMaxHP, campaignLinks.length]); // eslint-disable-line react-hooks/exhaustive-deps

	// Death step tracking: fires when isDead flips true
	useEffect(() => {
		if (readOnly || !characterId) return;

		const prevIsDead = prevIsDeadRef.current;
		prevIsDeadRef.current = savedIsDead;

		if (!savedIsDead || savedIsDead === prevIsDead) return;
		if (campaignLinks.length === 0) return;

		const payload = { characterName: characterName ?? 'Unknown' };
		for (const { campaignDocId } of campaignLinks) {
			postEvent(campaignDocId, 'dead', payload, characterId).catch(() => {});
		}
	}, [savedIsDead, campaignLinks.length]); // eslint-disable-line react-hooks/exhaustive-deps
}
