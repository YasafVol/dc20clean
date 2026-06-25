import type { ClassProgressionGains, ClassProgressionLevel } from '../../progressionTypes';

type ClassFeatureSchedule = Partial<Record<number, string[]>>;

export function createClassProgression(
	template: readonly ClassProgressionLevel[],
	classFeaturesByLevel: ClassFeatureSchedule
): ClassProgressionLevel[] {
	return template.map((levelData) => {
		const classFeatures = classFeaturesByLevel[levelData.level];
		const gains: ClassProgressionGains = { ...levelData.gains };

		if (classFeatures) {
			gains.classFeatures = [...classFeatures];
		} else if (gains.classFeatures) {
			gains.classFeatures = [...gains.classFeatures];
		}

		return {
			...levelData,
			gains
		};
	});
}
