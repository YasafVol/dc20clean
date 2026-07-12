import { resolveConditionDefinition } from '../../lib/rulesdata/conditions/conditions.data';

const MANUAL_MECHANIC_IDS = new Set([
	'bleeding-x',
	'burning-x',
	'charmed',
	'doomed-x',
	'exposed-x',
	'frightened',
	'paralyzed',
	'unconscious',
	'petrified',
	'stunned-x',
	'surprised',
	'taunted',
	'terrified',
	'tethered'
]);

export interface ActiveConditionSummaryRow {
	id: string;
	name: string;
	description: string;
	stackValue?: number;
}

export function getManualActiveConditionSummaries(
	activeConditions: string[]
): ActiveConditionSummaryRow[] {
	return activeConditions.flatMap((conditionId) => {
		const resolved = resolveConditionDefinition(conditionId);
		if (!resolved || !MANUAL_MECHANIC_IDS.has(resolved.definition.id)) return [];
		return [
			{
				id: conditionId,
				name: resolved.definition.name.replace(
					' X',
					resolved.stackValue ? ` ${resolved.stackValue}` : ''
				),
				description: resolved.definition.description.replaceAll(
					'X',
					String(resolved.stackValue ?? 'X')
				),
				stackValue: resolved.stackValue
			}
		];
	});
}
