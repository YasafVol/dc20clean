import React from 'react';
import {
	StyledAttributeRow,
	StyledAttributeLabel,
	StyledAttributeValue,
	StyledButtonsContainer
} from './AttributeControl.styles';
import { Button } from '../../../../../design-system';

interface Props {
	label: string;
	value: number;
	onIncrease: () => void;
	onDecrease: () => void;
	canIncrease: boolean;
	canDecrease: boolean;
}

export const AttributeControl: React.FC<Props> = ({
	label,
	value,
	onIncrease,
	onDecrease,
	canIncrease,
	canDecrease
}) => {
	return (
		<StyledAttributeRow>
			<StyledAttributeLabel>{label}</StyledAttributeLabel>
			<StyledButtonsContainer>
				<Button
					label="−"
					onClick={onDecrease}
					disabled={!canDecrease}
					aria-label={`Decrease ${label}`}
				/>
				<StyledAttributeValue>{value}</StyledAttributeValue>
				<Button
					label="+"
					onClick={onIncrease}
					disabled={!canIncrease}
					aria-label={`Increase ${label}`}
				/>
			</StyledButtonsContainer>
		</StyledAttributeRow>
	);
};

export default AttributeControl;
