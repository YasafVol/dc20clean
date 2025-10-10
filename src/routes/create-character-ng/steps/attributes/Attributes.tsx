import React from 'react';
import { StyledContainer, StyledContent } from './Attributes.styles';
import { useCharacter } from '../../../../lib/stores/characterContext';
import { attributesData } from '../../../../lib/rulesdata/attributes';
import {
	calculateAvailableAttributePoints,
	calculateAttributePointsSpent,
	canIncreaseAttribute,
	canDecreaseAttribute
} from '../../../../lib/services/attributes.service';
import AttributePointsDisplay from './components/AttributePointsDisplay';
import AttributeControl from './components/AttributeControl';

const Attributes: React.FC = () => {
	const { state, dispatch } = useCharacter();

	// Get current attribute values from character state
	const attributeValues = {
		might: state.attribute_might ?? -2,
		agility: state.attribute_agility ?? -2,
		charisma: state.attribute_charisma ?? -2,
		intelligence: state.attribute_intelligence ?? -2
	};

	// Calculate points
	const availablePoints = calculateAvailableAttributePoints(state);
	const pointsSpent = calculateAttributePointsSpent(state);

	const handleIncrease = (attributeId: string) => {
		dispatch({
			type: 'UPDATE_ATTRIBUTE',
			attribute: `attribute_${attributeId}`,
			value: attributeValues[attributeId as keyof typeof attributeValues] + 1
		});
	};

	const handleDecrease = (attributeId: string) => {
		dispatch({
			type: 'UPDATE_ATTRIBUTE',
			attribute: `attribute_${attributeId}`,
			value: attributeValues[attributeId as keyof typeof attributeValues] - 1
		});
	};

	return (
		<StyledContainer>
			<AttributePointsDisplay pointsSpent={pointsSpent} maxPoints={availablePoints} />

			<StyledContent>
				{attributesData.map((attribute) => {
					const currentValue = attributeValues[attribute.id as keyof typeof attributeValues];

					return (
						<AttributeControl
							key={attribute.id}
							label={attribute.name}
							value={currentValue}
							onIncrease={() => handleIncrease(attribute.id)}
							onDecrease={() => handleDecrease(attribute.id)}
							canIncrease={canIncreaseAttribute(state, attribute.id)}
							canDecrease={canDecreaseAttribute(state, attribute.id)}
						/>
					);
				})}
			</StyledContent>
		</StyledContainer>
	);
};

export default Attributes;
