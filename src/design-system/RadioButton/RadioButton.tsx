import React from 'react';
import {
	StyledRadioButtonWrapper,
	StyledRadioButtonInput,
	StyledRadioButtonLabel,
	StyledTextContainer,
	StyledMainText,
	StyledPipeSeparator,
	StyledSubText
} from './RadioButton.styles';

export interface RadioButtonProps {
	/** The main label text */
	label: string;
	/** Optional subtext / description */
	subtext?: string;
	/** Whether the radio button is selected */
	checked?: boolean;
	/** Callback when radio button state changes */
	onChange?: (checked: boolean) => void;
	/** Whether the radio button is disabled */
	disabled?: boolean;
	/** Name attribute for the input (for grouping radio buttons) */
	name?: string;
	/** Value attribute for the input */
	value?: string;
	/** Test ID for testing */
	'data-testid'?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
	label,
	subtext,
	checked = false,
	onChange,
	disabled = false,
	name,
	value,
	'data-testid': testId
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange && !disabled) {
			onChange(event.target.checked);
		}
	};

	return (
		<StyledRadioButtonWrapper>
			<StyledRadioButtonInput
				type="radio"
				checked={checked}
				onChange={handleChange}
				disabled={disabled}
				name={name}
				value={value}
				data-testid={testId}
			/>
			<StyledRadioButtonLabel $disabled={disabled} $selected={checked}>
				<StyledTextContainer>
					<StyledMainText $selected={checked}>{label}</StyledMainText>
					{subtext && (
						<>
							<StyledPipeSeparator>|</StyledPipeSeparator>
							<StyledSubText>{subtext}</StyledSubText>
						</>
					)}
				</StyledTextContainer>
			</StyledRadioButtonLabel>
		</StyledRadioButtonWrapper>
	);
};

export default RadioButton;
