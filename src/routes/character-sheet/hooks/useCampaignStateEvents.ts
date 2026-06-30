// src/routes/character-sheet/hooks/useCampaignStateEvents.ts
import { useEffect, useRef } from 'react';
import { useCampaignsForCharacter, useCampaignMutations } from '../../../lib/hooks/useCampaigns';

export function useCampaignStateEvents(
	characterId: string | null,
	readOnly: boolean,
	isRaging: boolean,
	isWildFormed: boolean,
	activeConditions: string[],
	exhaustionLevel: number,
	characterName: string | null,
) {
	const campaignLinks = useCampaignsForCharacter(readOnly ? null : characterId);
	const { postEvent } = useCampaignMutations();

	const prevIsRagingRef = useRef<boolean | undefined>(undefined);
	const prevIsWildFormedRef = useRef<boolean | undefined>(undefined);
	const prevConditionsRef = useRef<string[] | undefined>(undefined);
	const prevExhaustionRef = useRef<number | undefined>(undefined);

	// Rage
	useEffect(() => {
		if (readOnly || !characterId) return;
		const prev = prevIsRagingRef.current;
		prevIsRagingRef.current = isRaging;
		if (prev === undefined || isRaging === prev || campaignLinks.length === 0) return;
		const payload = { characterName: characterName ?? 'Unknown' };
		for (const { campaignDocId } of campaignLinks) {
			postEvent(campaignDocId, isRaging ? 'rage_start' : 'rage_end', payload, characterId).catch(() => {});
		}
	}, [isRaging, campaignLinks.length]); // eslint-disable-line react-hooks/exhaustive-deps

	// Wild form
	useEffect(() => {
		if (readOnly || !characterId) return;
		const prev = prevIsWildFormedRef.current;
		prevIsWildFormedRef.current = isWildFormed;
		if (prev === undefined || isWildFormed === prev || campaignLinks.length === 0) return;
		const payload = { characterName: characterName ?? 'Unknown' };
		for (const { campaignDocId } of campaignLinks) {
			postEvent(campaignDocId, isWildFormed ? 'wild_form_enter' : 'wild_form_exit', payload, characterId).catch(() => {});
		}
	}, [isWildFormed, campaignLinks.length]); // eslint-disable-line react-hooks/exhaustive-deps

	// Conditions — use joined string as dep to avoid array-reference churn
	const conditionsKey = activeConditions.join(',');
	useEffect(() => {
		if (readOnly || !characterId) return;
		const prev = prevConditionsRef.current;
		prevConditionsRef.current = [...activeConditions];
		if (prev === undefined || campaignLinks.length === 0) return;
		const prevSet = new Set(prev);
		const currSet = new Set(activeConditions);
		for (const conditionId of activeConditions.filter(c => !prevSet.has(c))) {
			for (const { campaignDocId } of campaignLinks) {
				postEvent(campaignDocId, 'condition_gained', { characterName: characterName ?? 'Unknown', conditionId }, characterId).catch(() => {});
			}
		}
		for (const conditionId of prev.filter(c => !currSet.has(c))) {
			for (const { campaignDocId } of campaignLinks) {
				postEvent(campaignDocId, 'condition_cured', { characterName: characterName ?? 'Unknown', conditionId }, characterId).catch(() => {});
			}
		}
	}, [conditionsKey, campaignLinks.length]); // eslint-disable-line react-hooks/exhaustive-deps

	// Exhaustion
	useEffect(() => {
		if (readOnly || !characterId) return;
		const prev = prevExhaustionRef.current;
		prevExhaustionRef.current = exhaustionLevel;
		if (prev === undefined || exhaustionLevel === prev || campaignLinks.length === 0) return;
		const payload = { characterName: characterName ?? 'Unknown', level: exhaustionLevel, prevLevel: prev };
		for (const { campaignDocId } of campaignLinks) {
			postEvent(campaignDocId, 'exhaustion_changed', payload, characterId).catch(() => {});
		}
	}, [exhaustionLevel, campaignLinks.length]); // eslint-disable-line react-hooks/exhaustive-deps
}
