export type CharacterCreationStepId =
	| 'class'
	| 'leveling'
	| 'ancestry'
	| 'attributes'
	| 'background'
	| 'spells'
	| 'maneuvers'
	| 'name';

export interface CharacterCreationStep {
	number: number;
	id: CharacterCreationStepId;
	label: string;
}

export interface CharacterCreationStepLabels {
	class: string;
	leveling: string;
	ancestry: string;
	attributes: string;
	background: string;
	spells: string;
	maneuvers: string;
	name: string;
}

export function buildCharacterCreationSteps({
	level,
	hasSpells,
	hasManeuvers,
	labels
}: {
	level: number;
	hasSpells: boolean;
	hasManeuvers: boolean;
	labels: CharacterCreationStepLabels;
}): CharacterCreationStep[] {
	const steps: CharacterCreationStep[] = [];

	const pushStep = (id: CharacterCreationStepId) => {
		steps.push({ number: steps.length + 1, id, label: labels[id] });
	};

	pushStep('class');

	if (level > 1) {
		pushStep('leveling');
	}

	pushStep('ancestry');
	pushStep('attributes');
	pushStep('background');

	if (hasSpells) {
		pushStep('spells');
	}

	if (hasManeuvers) {
		pushStep('maneuvers');
	}

	pushStep('name');

	return steps;
}
