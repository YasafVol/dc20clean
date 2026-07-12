import type { FeatureData } from '../../types';
import type { SavedCharacter } from '../../lib/types/dataContracts';
import { findClassByName } from '../../lib/rulesdata/loaders/class-features.loader';
import { findTalentById } from '../../lib/rulesdata/classes-data/talents/talent.loader';
import { normalizeSelectedTalents } from '../../lib/utils/storageUtils';
import { CHARACTER_PATHS } from '../../lib/rulesdata/progression/paths/paths.data';

function formatPathDescription(pathId: string, ranks: number): string {
	const path = CHARACTER_PATHS.find((candidate) => candidate.id === pathId);
	if (!path) return '';

	const totals = path.progression
		.filter((rank) => rank.pathLevel <= ranks)
		.reduce(
			(result, rank) => ({
				staminaPoints: result.staminaPoints + (rank.benefits.staminaPoints || 0),
				manaPoints: result.manaPoints + (rank.benefits.manaPoints || 0),
				maneuversLearned: result.maneuversLearned + (rank.benefits.maneuversLearned || 0),
				spellsLearned:
					result.spellsLearned +
					(rank.benefits.spellsLearned || 0) +
					(rank.benefits.cantripsLearned || 0)
			}),
			{ staminaPoints: 0, manaPoints: 0, maneuversLearned: 0, spellsLearned: 0 }
		);

	const benefits = [
		pathId === 'martial_path' ? 'Combat Training: Weapons' : 'Combat Training: Spell Focuses',
		totals.staminaPoints > 0 ? `+${totals.staminaPoints} maximum SP` : '',
		totals.manaPoints > 0 ? `+${totals.manaPoints} maximum MP` : '',
		totals.maneuversLearned > 0
			? `Learn ${totals.maneuversLearned} Maneuver${totals.maneuversLearned === 1 ? '' : 's'}`
			: '',
		totals.spellsLearned > 0
			? `Learn ${totals.spellsLearned} Spell${totals.spellsLearned === 1 ? '' : 's'}`
			: ''
	].filter(Boolean);

	return `Rank ${ranks}. ${benefits.join('. ')}. ${path.specialRules?.join(' ') || ''}`.trim();
}

export function buildProgressionFeatureEntries(character: SavedCharacter): FeatureData[] {
	const classDefinition = findClassByName(character.className);
	if (!classDefinition) return [];

	const entries: FeatureData[] = classDefinition.coreFeatures
		.filter((feature) => feature.levelGained <= character.level)
		.map((feature) => ({
			id: feature.id || feature.featureName,
			name: feature.featureName,
			description: feature.description,
			source: 'class',
			sourceDetail: `${classDefinition.className} (Lvl ${feature.levelGained})`
		}));

	const legacySubclass = character as SavedCharacter & {
		subclassId?: string;
		subclassName?: string;
	};
	const selectedSubclassKey =
		character.selectedSubclass || legacySubclass.subclassId || legacySubclass.subclassName;
	const selectedSubclass = selectedSubclassKey
		? classDefinition.subclasses?.find(
				(subclass) =>
					subclass.id === selectedSubclassKey ||
					subclass.subclassName === selectedSubclassKey ||
					subclass.subclassName === legacySubclass.subclassName
			)
		: undefined;

	for (const feature of selectedSubclass?.features || []) {
		if (feature.levelGained > character.level) continue;
		entries.push({
			id: feature.id || `${selectedSubclass?.subclassName}_${feature.featureName}`,
			name: feature.featureName,
			description: feature.description,
			source: 'subclass',
			sourceDetail: `${selectedSubclass?.subclassName} (Lvl ${feature.levelGained})`
		});
	}

	for (const [talentId, count] of Object.entries(
		normalizeSelectedTalents(character.selectedTalents as any)
	)) {
		const talent = findTalentById(talentId);
		if (!talent || count <= 0) continue;

		for (let index = 0; index < count; index++) {
			entries.push({
				id: `${talent.id}:${index}`,
				name: talent.name,
				description: talent.description,
				source: 'talent',
				sourceDetail: `${talent.category} Talent`
			});
		}
	}

	if (character.selectedMulticlassClass && character.selectedMulticlassFeature) {
		const multiclassDefinition = findClassByName(character.selectedMulticlassClass);
		const multiclassFeature = multiclassDefinition?.coreFeatures.find(
			(feature) =>
				feature.id === character.selectedMulticlassFeature ||
				feature.featureName === character.selectedMulticlassFeature
		);

		if (multiclassDefinition && multiclassFeature) {
			const tier = character.selectedMulticlassOption || 'multiclass';
			entries.push({
				id: `multiclass_${multiclassDefinition.className}_${multiclassFeature.id || multiclassFeature.featureName}`,
				name: multiclassFeature.featureName,
				description: multiclassFeature.description,
				source: 'talent',
				sourceDetail: `${tier.charAt(0).toUpperCase()}${tier.slice(1)} Multiclass • ${multiclassDefinition.className}`
			});
		}
	}

	for (const [allocationKey, pathId] of [
		['martial', 'martial_path'],
		['spellcasting', 'spellcaster_path']
	] as const) {
		const ranks = character.pathPointAllocations?.[allocationKey] || 0;
		if (ranks <= 0) continue;
		const path = CHARACTER_PATHS.find((candidate) => candidate.id === pathId);
		if (!path) continue;

		entries.push({
			id: path.id,
			name: path.name,
			description: formatPathDescription(path.id, ranks),
			source: 'path',
			sourceDetail: `Path Progression • Rank ${ranks}`
		});
	}

	return entries;
}
