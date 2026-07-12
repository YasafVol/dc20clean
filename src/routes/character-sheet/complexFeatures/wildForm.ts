import { ancestriesData } from '../../../lib/rulesdata/ancestries/ancestries';
import { traitsData } from '../../../lib/rulesdata/ancestries/traits';
import type { Trait } from '../../../lib/rulesdata/schemas/character.schema';

export const WILD_FORM_TEMPLATES = [
	{ id: 'defensive', name: 'Defensive', traitIds: ['beastborn_natural_armor', 'beastborn_tough'] },
	{
		id: 'grappler',
		name: 'Grappler',
		traitIds: ['beastborn_powerful_build', 'beastborn_quick_reactions']
	},
	{
		id: 'parkour',
		name: 'Parkour',
		traitIds: ['beastborn_climb_speed', 'beastborn_jumper', 'beastborn_quick_reactions']
	},
	{
		id: 'infiltrator',
		name: 'Infiltrator',
		traitIds: ['beastborn_camouflage', 'beastborn_prowler']
	}
] as const;

const beastborn = ancestriesData.find((ancestry) => ancestry.id === 'beastborn');

export const WILD_FORM_TRAITS: Trait[] = (beastborn?.expandedTraitIds ?? [])
	.map((id) => traitsData.find((trait) => trait.id === id))
	.filter((trait): trait is Trait =>
		Boolean(trait && trait.cost >= 0 && trait.id !== 'beastborn_beastkind')
	);

export function getWildFormTraitCost(traitIds: string[]): number {
	return traitIds.reduce(
		(total, id) => total + (WILD_FORM_TRAITS.find((trait) => trait.id === id)?.cost ?? 0),
		0
	);
}

export function canSelectWildFormTrait(
	selectedIds: string[],
	trait: Trait,
	budget: number
): boolean {
	if (selectedIds.includes(trait.id)) return true;
	const prerequisites =
		trait.requirements?.hasAllTraits ?? trait.requirements?.hasTrait ?? trait.prerequisites ?? [];
	const prerequisitesMet = prerequisites.every(
		(id) => id === 'beastborn_natural_weapon' || selectedIds.includes(id)
	);
	return prerequisitesMet && getWildFormTraitCost(selectedIds) + trait.cost <= budget;
}
