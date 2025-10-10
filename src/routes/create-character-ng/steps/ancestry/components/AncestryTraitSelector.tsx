import React from 'react';
import { Checkbox } from '../../../../../design-system';
import type { Trait } from '../../../../../lib/rulesdata/schemas/character.schema';
import { StyledTraitList, StyledTraitItem } from './AncestryTraitSelector.styles';

interface Props {
	traits: Trait[];
	selectedTraitIds: string[];
	onTraitToggle: (traitId: string, checked: boolean) => void;
	canSelectTrait: (traitId: string) => boolean;
}

export const AncestryTraitSelector: React.FC<Props> = ({
	traits,
	selectedTraitIds,
	onTraitToggle,
	canSelectTrait
}) => {
	return (
		<StyledTraitList>
			{traits.map((trait) => {
				const isSelected = selectedTraitIds.includes(trait.id);
				const canSelect = canSelectTrait(trait.id);
				const isDisabled = !isSelected && !canSelect;

				// Format cost display (works for 0, positive, and negative costs)
				const costDisplay = `(${trait.cost} pts)`;

				// Format label with name and cost
				const labelWithCost = `${trait.name} ${costDisplay}`;

				return (
					<StyledTraitItem key={trait.id} $disabled={isDisabled}>
						<Checkbox
							checked={isSelected}
							disabled={isDisabled}
							onChange={(checked) => onTraitToggle(trait.id, checked)}
							label={labelWithCost}
							subtext={trait.description}
						/>
					</StyledTraitItem>
				);
			})}
		</StyledTraitList>
	);
};

export default AncestryTraitSelector;
