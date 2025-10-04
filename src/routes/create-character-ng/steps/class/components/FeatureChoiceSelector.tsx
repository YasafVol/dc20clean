import React from 'react';
import { Checkbox, RadioButton } from '../../../../../design-system';
import {
	StyledChoiceContainer,
	StyledChoicePrompt,
	StyledChoiceOptions,
	StyledChoiceOption,
	StyledSelectionCounter
} from './FeatureChoiceSelector.styles';
import type { FormattedFeatureChoice } from '../../../../../lib/services/classFeatures.service';

interface FeatureChoiceSelectorProps {
	choice: FormattedFeatureChoice;
	selectedValue: string | string[];
	onChange: (choiceId: string, value: string, isSelected?: boolean) => void;
}

const FeatureChoiceSelector: React.FC<FeatureChoiceSelectorProps> = ({
	choice,
	selectedValue,
	onChange
}) => {
	const isSingleChoice = choice.type === 'select_one';

	const handleSingleChange = (value: string) => {
		onChange(choice.id, value);
	};

	const handleMultipleChange = (value: string, isSelected: boolean) => {
		onChange(choice.id, value, isSelected);
	};

	return (
		<StyledChoiceContainer>
			<StyledChoicePrompt>{choice.prompt}</StyledChoicePrompt>
			<StyledChoiceOptions>
				{choice.options.map((option) => {
					if (isSingleChoice) {
						// Radio button for single choice
						const isSelected = selectedValue === option.value;
						return (
							<StyledChoiceOption key={option.value}>
								<RadioButton
									label={option.label}
									subtext={option.description}
									checked={isSelected}
									onChange={() => handleSingleChange(option.value)}
									name={choice.id}
									value={option.value}
								/>
							</StyledChoiceOption>
						);
					} else {
						// Checkbox for multiple choice with maxSelections validation
						const currentValues: string[] = Array.isArray(selectedValue) ? selectedValue : [];
						const isSelected = currentValues.includes(option.value);
						const canSelect = currentValues.length < (choice.maxSelections || 999);
						const isDisabled = !isSelected && !canSelect;

						return (
							<StyledChoiceOption key={option.value} $disabled={isDisabled}>
								<Checkbox
									label={option.label}
									subtext={option.description}
									checked={isSelected}
									disabled={isDisabled}
									onChange={(checked) => handleMultipleChange(option.value, checked)}
								/>
							</StyledChoiceOption>
						);
					}
				})}
			</StyledChoiceOptions>
			{!isSingleChoice && choice.maxSelections && (
				<StyledSelectionCounter>
					Select up to {choice.maxSelections} options (
					{Array.isArray(selectedValue) ? selectedValue.length : 0}/{choice.maxSelections} selected)
				</StyledSelectionCounter>
			)}
		</StyledChoiceContainer>
	);
};

export default FeatureChoiceSelector;
