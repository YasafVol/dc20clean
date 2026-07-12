import type { ManeuverEnhancement } from '../../lib/rulesdata/schemas/maneuver.schema';

export function calculateEnhancementStaminaSpend(
	enhancements: ManeuverEnhancement[],
	selectedCounts: Record<string, number>
): number {
	return enhancements.reduce(
		(total, enhancement) =>
			total + Math.max(0, selectedCounts[enhancement.name] ?? 0) * Math.max(0, enhancement.sp ?? 0),
		0
	);
}

export function canDeclareEnhancements(spend: number, staminaSpendLimit: number): boolean {
	return spend <= staminaSpendLimit;
}
