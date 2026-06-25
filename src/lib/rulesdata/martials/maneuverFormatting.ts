import type { ManeuverCost, ManeuverEnhancement } from '../schemas/maneuver.schema';

type LegacyManeuverCost = ManeuverCost & { mp?: number };

export function formatManeuverCost(cost?: LegacyManeuverCost): string {
	if (!cost) return '-';

	const parts = [`${cost.ap} AP`];
	const staminaCost = cost.sp ?? cost.mp;
	if (staminaCost && staminaCost > 0) {
		parts.push(`${staminaCost} SP`);
	}

	return parts.join(', ');
}

export function formatManeuverEnhancementCost(enhancement: ManeuverEnhancement): string {
	if (enhancement.costString) return enhancement.costString;

	const parts: string[] = [];
	if (enhancement.ap) parts.push(`${enhancement.ap} AP`);
	if (enhancement.sp) parts.push(`${enhancement.sp} SP`);
	return parts.join(', ') || '-';
}
