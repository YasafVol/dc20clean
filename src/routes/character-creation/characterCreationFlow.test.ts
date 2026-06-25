import { describe, expect, it } from 'vitest';
import { buildCharacterCreationSteps, type CharacterCreationStepLabels } from './characterCreationFlow';

const labels: CharacterCreationStepLabels = {
	class: 'Class',
	leveling: 'Leveling',
	ancestry: 'Ancestry',
	attributes: 'Attributes',
	background: 'Background',
	spells: 'Spells',
	maneuvers: 'Maneuvers',
	name: 'Name'
};

describe('buildCharacterCreationSteps', () => {
	it('builds the full eight-step flow for leveled hybrid characters', () => {
		const steps = buildCharacterCreationSteps({
			level: 2,
			hasSpells: true,
			hasManeuvers: true,
			labels
		});

		expect(steps.map((step) => step.id)).toEqual([
			'class',
			'leveling',
			'ancestry',
			'attributes',
			'background',
			'spells',
			'maneuvers',
			'name'
		]);
		expect(steps.at(-1)).toEqual({ number: 8, id: 'name', label: 'Name' });
	});

	it('omits leveling at level 1 and keeps step numbers contiguous', () => {
		const steps = buildCharacterCreationSteps({
			level: 1,
			hasSpells: true,
			hasManeuvers: false,
			labels
		});

		expect(steps.map((step) => step.number)).toEqual([1, 2, 3, 4, 5, 6]);
		expect(steps.map((step) => step.id)).toEqual([
			'class',
			'ancestry',
			'attributes',
			'background',
			'spells',
			'name'
		]);
	});
});
