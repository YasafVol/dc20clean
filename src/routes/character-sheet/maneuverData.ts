import type { Maneuver } from '../../lib/rulesdata/schemas/maneuver.schema';
import type { ManeuverData } from '../../types';

export function createManeuverDataFromManeuver(
	maneuver: Maneuver,
	id = `maneuver_${Date.now()}`
): ManeuverData {
	return {
		id,
		name: maneuver.name,
		type: maneuver.type,
		cost: { ...maneuver.cost },
		range: maneuver.range,
		description: maneuver.description,
		isReaction: maneuver.isReaction,
		trigger: maneuver.trigger,
		enhancements: maneuver.enhancements,
		notes: ''
	};
}
