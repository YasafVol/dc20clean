import { skillsData as rulesSkills } from '../rulesdata/skills';
import { tradesData as rulesTrades } from '../rulesdata/trades';
import type { DenormalizedMasteryEntry, MasteryLadder } from '../types/dataContracts';

export interface FinalAttributes {
	might: number;
	agility: number;
	charisma: number;
	intelligence: number;
	prime: number; // max of the four; used by Awareness per spec
}

export interface DenormalizeInput {
	finalAttributes: FinalAttributes;
	skillsRanks: Record<string, number>;
	tradesRanks: Record<string, number>;
	languagesData: Record<string, { fluency: 'limited' | 'fluent' } | any> | string[] | undefined;
}

export interface DenormalizeOutput {
	skillTotals: Record<string, number>;
	skillMastery: Record<string, DenormalizedMasteryEntry>;
	knowledgeTradeMastery: Record<'arcana' | 'history' | 'nature' | 'occultism' | 'religion', DenormalizedMasteryEntry>;
	masteryLadders: {
		skills: Record<string, MasteryLadder>;
		knowledgeTrades: Record<'arcana' | 'history' | 'nature' | 'occultism' | 'religion', MasteryLadder>;
		practicalTrades: {
			A?: { label: string; ladder: MasteryLadder; finalValue: number };
			B?: { label: string; ladder: MasteryLadder; finalValue: number };
			C?: { label: string; ladder: MasteryLadder; finalValue: number };
			D?: { label: string; ladder: MasteryLadder; finalValue: number };
		};
	};
	languageMastery: {
		A?: { name: string; limited: boolean; fluent: boolean };
		B?: { name: string; limited: boolean; fluent: boolean };
		C?: { name: string; limited: boolean; fluent: boolean };
		D?: { name: string; limited: boolean; fluent: boolean };
	};
}

const KNOWLEDGE_TRADE_IDS = new Set(['arcana', 'history', 'nature', 'occultism', 'religion']);

function buildLadder(masteryLevel: number): MasteryLadder {
	return {
		'2': masteryLevel >= 2,
		'4': masteryLevel >= 4,
		'6': masteryLevel >= 6,
		'8': masteryLevel >= 8,
		'10': masteryLevel >= 10
	};
}

function computeFinalValue(
	governingAttributes: string[] |
		('might' | 'agility' | 'charisma' | 'intelligence' | 'prime')[],
	baseAttributeValues: FinalAttributes,
	masteryLevel: number
): number {
	let best = Number.NEGATIVE_INFINITY;
	for (const attr of governingAttributes) {
		const v = attr === 'prime' ? baseAttributeValues.prime : (baseAttributeValues as any)[attr] ?? 0;
		if (v > best) best = v;
	}
	if (!isFinite(best)) best = 0;
	return best + masteryLevel;
}

export function denormalizeMastery(input: DenormalizeInput): DenormalizeOutput {
	const { finalAttributes, skillsRanks, tradesRanks } = input;

	// 1) Skills
	const skillTotals: Record<string, number> = {};
	const skillMastery: Record<string, DenormalizedMasteryEntry> = {};
	const skillsLadders: Record<string, MasteryLadder> = {};

	for (const skill of rulesSkills) {
		const skillId = skill.id;
		const rank = Number(skillsRanks?.[skillId] ?? 0);
		const masteryLevel = Math.max(0, rank * 2);
		const governing = [skill.attributeAssociation]; // includes 'prime' for Awareness
		const baseAttributeValues = {
			might: finalAttributes.might,
			agility: finalAttributes.agility,
			charisma: finalAttributes.charisma,
			intelligence: finalAttributes.intelligence
		};
		const finalValue = computeFinalValue(governing as any, finalAttributes, masteryLevel);
		const masteryLadder = buildLadder(masteryLevel);

		skillTotals[skillId] = finalValue;
		skillMastery[skillId] = {
			governingAttributes: governing as string[],
			baseAttributeValues,
			masteryLevel,
			masteryLadder,
			finalValue
		};
		skillsLadders[skillId] = masteryLadder;
	}

	// 2) Knowledge trades (fixed list)
	const knowledgeTradeMastery: DenormalizeOutput['knowledgeTradeMastery'] = {
		arcana: undefined as any,
		history: undefined as any,
		nature: undefined as any,
		occultism: undefined as any,
		religion: undefined as any
	};
	const knowledgeLadders: DenormalizeOutput['masteryLadders']['knowledgeTrades'] = {
		arcana: buildLadder(0),
		history: buildLadder(0),
		nature: buildLadder(0),
		occultism: buildLadder(0),
		religion: buildLadder(0)
	};

	for (const trade of rulesTrades) {
		if (!KNOWLEDGE_TRADE_IDS.has(trade.id)) continue;
		const rank = Number(tradesRanks?.[trade.id] ?? 0);
		const masteryLevel = Math.max(0, rank * 2);
		const governing = [trade.attributeAssociation];
		const baseAttributeValues = {
			might: finalAttributes.might,
			agility: finalAttributes.agility,
			charisma: finalAttributes.charisma,
			intelligence: finalAttributes.intelligence
		};
		const finalValue = computeFinalValue(governing as any, finalAttributes, masteryLevel);
		const ladder = buildLadder(masteryLevel);

		(knowledgeTradeMastery as any)[trade.id] = {
			governingAttributes: governing as string[],
			baseAttributeValues,
			masteryLevel,
			masteryLadder: ladder,
			finalValue
		};
		(knowledgeLadders as any)[trade.id] = ladder;
	}

	// 3) Practical trades A–D: choose from non-knowledge, highest finalValue
	type PracticalItem = { id: string; name: string; finalValue: number; ladder: MasteryLadder };
	const practicalPool: PracticalItem[] = [];
	for (const trade of rulesTrades) {
		if (KNOWLEDGE_TRADE_IDS.has(trade.id)) continue;
		const rank = Number(tradesRanks?.[trade.id] ?? 0);
		const masteryLevel = Math.max(0, rank * 2);
		const governing = [trade.attributeAssociation];
		const finalValue = computeFinalValue(governing as any, finalAttributes, masteryLevel);
		practicalPool.push({ id: trade.id, name: trade.name, finalValue, ladder: buildLadder(masteryLevel) });
	}
	// Deterministic selection: sort desc by finalValue, then by id asc
	practicalPool.sort((a, b) => (b.finalValue - a.finalValue) || a.id.localeCompare(b.id));
	const practicalLadders: DenormalizeOutput['masteryLadders']['practicalTrades'] = {};
	const picks = practicalPool.slice(0, 4);
	const slotLabels = ['A', 'B', 'C', 'D'] as const;
	picks.forEach((p, idx) => {
		const slot = slotLabels[idx];
		(practicalLadders as any)[slot] = { label: p.name, ladder: p.ladder, finalValue: p.finalValue };
	});

	// 4) Languages A–D from languagesData
	const languageMastery: DenormalizeOutput['languageMastery'] = {};
	const assignLanguage = (index: number, name: string, fluency: string) => {
		const limited = fluency === 'limited';
		const fluent = fluency === 'fluent';
		const slot = slotLabels[index];
		(languageMastery as any)[slot] = { name, limited, fluent };
	};

	if (Array.isArray(input.languagesData)) {
		const names = input.languagesData.filter(Boolean) as string[];
		for (let i = 0; i < 4; i++) {
			const name = names[i] || '';
			if (!name) break;
			assignLanguage(i, name, 'fluent');
		}
	} else {
		const map = (input.languagesData as any) || {};
		const keys = Object.keys(map);
		for (let i = 0; i < 4; i++) {
			const name = keys[i] || '';
			if (!name) break;
			const fluency = (map[name]?.fluency as string) || (name ? 'fluent' : '');
			assignLanguage(i, name, fluency);
		}
	}

	return {
		skillTotals,
		skillMastery,
		knowledgeTradeMastery,
		masteryLadders: {
			skills: skillsLadders,
			knowledgeTrades: knowledgeLadders,
			practicalTrades: practicalLadders
		},
		languageMastery
	};
}


