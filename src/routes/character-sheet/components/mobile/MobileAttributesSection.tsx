import React from 'react';
import {
	MobileSection,
	MobileSectionTitle,
	MobileAttributeGrid,
	MobileAttributeItem,
	MobileAttributeLabel,
	MobileAttributeValue
} from '../../styles/CharacterSheetMobile.styles';

interface MobileAttributesSectionProps {
	attributes: any;
	calculations: any;
}

const MobileAttributesSection: React.FC<MobileAttributesSectionProps> = ({
	attributes,
	calculations
}) => {
	const attributeList = [
		{ key: 'might', label: 'Might' },
		{ key: 'agility', label: 'Agility' },
		{ key: 'charisma', label: 'Charisma' },
		{ key: 'intelligence', label: 'Intelligence' },
		{ key: 'awareness', label: 'Awareness' }
	];

	const getAttributeValue = (key: string) => {
		const base = attributes?.[key] || 10;
		const bonus = calculations?.attributes?.[key]?.bonus || 0;
		return base + bonus;
	};

	const getAttributeModifier = (value: number) => {
		return Math.floor((value - 10) / 2);
	};

	return (
		<MobileSection>
			<MobileSectionTitle>Attributes</MobileSectionTitle>
			<MobileAttributeGrid>
				{attributeList.map((attr) => {
					const value = getAttributeValue(attr.key);
					const modifier = getAttributeModifier(value);
					return (
						<MobileAttributeItem key={attr.key}>
							<MobileAttributeLabel>{attr.label}</MobileAttributeLabel>
							<MobileAttributeValue>
								{value} ({modifier >= 0 ? '+' : ''}{modifier})
							</MobileAttributeValue>
						</MobileAttributeItem>
					);
				})}
			</MobileAttributeGrid>
		</MobileSection>
	);
};

export default MobileAttributesSection;