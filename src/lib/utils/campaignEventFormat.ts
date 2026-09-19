export interface CampaignEventPayload {
	characterName?: string;
	displayName?: string;
	spellName?: string;
	sustained?: boolean;
	maneuverName?: string;
	conditionId?: string;
	level?: number;
	prevLevel?: number;
	label?: unknown;
	mode?: unknown;
	allResults?: unknown;
	modifier?: unknown;
	total?: unknown;
}

export function formatDiceRollExpression(payload: unknown): string {
	const p = (payload && typeof payload === 'object' ? payload : {}) as CampaignEventPayload;
	const label = typeof p.label === 'string' && p.label.length > 0 ? p.label : 'd20';
	const mode = p.mode === 'advantage' ? ' (adv)' : p.mode === 'disadvantage' ? ' (dis)' : '';
	const dice = Array.isArray(p.allResults) ? `[${p.allResults.join(', ')}]` : '';
	const modifier = typeof p.modifier === 'number' ? p.modifier : 0;
	const modifierText = modifier === 0 ? '' : `${modifier > 0 ? '+' : ''}${modifier}`;
	const total = typeof p.total === 'number' ? p.total : '?';
	const calculation = [`${label}${mode}`, dice, modifierText].filter(Boolean).join(' ');

	return `${calculation} = ${total}`;
}
