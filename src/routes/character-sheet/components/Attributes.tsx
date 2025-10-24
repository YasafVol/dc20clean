import React from 'react';
import type { SkillData } from '../../../types';
import type { SavedCharacter } from '../../../lib/types/dataContracts';
import type { EnhancedStatBreakdown } from '../../../lib/types/effectSystem';
import Tooltip from './Tooltip';
import { createEnhancedTooltip } from './EnhancedStatTooltips';
import { useCharacterSheet } from '../hooks/CharacterSheetProvider';
import {
	AttributeSection,
	AttributeHeader,
	AttributeBox,
	AttributeAbbreviation,
	AttributeValue,
	AttributeInfo,
	AttributeName,
	AttributeSave,
	SkillRow,
	SkillName,
	PrimeSection,
	PrimeLabel,
	PrimeValue
} from '../styles/Attributes';
import { StyledProficiencyDots, StyledDot } from '../styles/Skills';

interface AttributesProps {
	characterData: SavedCharacter;
	skillsByAttribute: {
		prime: SkillData[];
		might: SkillData[];
		agility: SkillData[];
		charisma: SkillData[];
		intelligence: SkillData[];
	};
	breakdowns?: Record<string, EnhancedStatBreakdown>;
	isMobile?: boolean;
}

const Attributes: React.FC<AttributesProps> = ({
	characterData,
	skillsByAttribute,
	breakdowns,
	isMobile = false
}) => {
	const { state } = useCharacterSheet();

	// Get prime modifier directly from character data
	const primeValue = state.character?.finalPrimeModifierValue || 0;
	const primeAttributeRaw = state.character?.finalPrimeModifierAttribute || 'prime';
	const usePrimeCapRule = state.character?.usePrimeCapRule ?? primeAttributeRaw === 'prime';
	const primeAttributeLabel =
		typeof primeAttributeRaw === 'string' && primeAttributeRaw !== 'prime'
			? primeAttributeRaw.toUpperCase()
			: 'PRIME';

	const renderSkills = (skills: SkillData[]) => {
		return skills.map((skill) => (
			<SkillRow key={skill.id} $isMobile={isMobile}>
				<SkillName $isMobile={isMobile}>{skill.name.toUpperCase()}</SkillName>
				<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					<StyledProficiencyDots>
						{[1, 2, 3, 4, 5].map((level) => (
							<StyledDot key={level} $filled={level <= skill.proficiency} $isMobile={isMobile} />
						))}
					</StyledProficiencyDots>
					{skill.bonus !== undefined && (
						<span
							style={{
								fontSize: '0.875rem',
								fontWeight: '600',
								color:
									skill.bonus >= 0
										? isMobile
											? '#22c55e'
											: '#059669' // Green-500 for mobile, darker green for desktop
										: isMobile
											? '#ef4444'
											: '#dc2626', // Red-500 for mobile, darker red for desktop
								minWidth: '2rem',
								textAlign: 'center'
							}}
						>
							{skill.bonus >= 0 ? '+' : ''}
							{skill.bonus}
						</span>
					)}
				</div>
			</SkillRow>
		));
	};

	return (
		<>
			{/* Prime Modifier & Awareness */}
			<PrimeSection $isMobile={isMobile}>
				<PrimeLabel $isMobile={isMobile}>Prime</PrimeLabel>
				<PrimeValue $isMobile={isMobile}>
					{usePrimeCapRule ? `+${primeValue}` : `${primeAttributeLabel} +${primeValue}`}
				</PrimeValue>
			</PrimeSection>

			{/* Awareness (Prime skill) */}
			{renderSkills(skillsByAttribute.prime)}

			{/* Might Section */}
			<AttributeSection $isMobile={isMobile}>
				<AttributeHeader>
					<AttributeBox $isMobile={isMobile}>
						<AttributeAbbreviation $isMobile={isMobile}>MIG</AttributeAbbreviation>
						<Tooltip
							content={
								breakdowns?.attribute_might
									? createEnhancedTooltip('Might', breakdowns.attribute_might)
									: `${characterData.finalMight} Might`
							}
							position="top"
						>
							<AttributeValue $isMobile={isMobile}>{characterData.finalMight}</AttributeValue>
						</Tooltip>
					</AttributeBox>
					<AttributeInfo $isMobile={isMobile}>
						<AttributeName $isMobile={isMobile}>MIGHT</AttributeName>
						<AttributeSave $isMobile={isMobile}>SAVE +{characterData.finalSaveMight}</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.might)}
			</AttributeSection>

			{/* Agility Section */}
			<AttributeSection $isMobile={isMobile}>
				<AttributeHeader>
					<AttributeBox $isMobile={isMobile}>
						<AttributeAbbreviation $isMobile={isMobile}>AGI</AttributeAbbreviation>
						<Tooltip
							content={
								breakdowns?.attribute_agility
									? createEnhancedTooltip('Agility', breakdowns.attribute_agility)
									: `${characterData.finalAgility} Agility`
							}
							position="top"
						>
							<AttributeValue $isMobile={isMobile}>{characterData.finalAgility}</AttributeValue>
						</Tooltip>
					</AttributeBox>
					<AttributeInfo $isMobile={isMobile}>
						<AttributeName $isMobile={isMobile}>AGILITY</AttributeName>
						<AttributeSave $isMobile={isMobile}>
							SAVE +{characterData.finalSaveAgility}
						</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.agility)}
			</AttributeSection>

			{/* Charisma Section */}
			<AttributeSection $isMobile={isMobile}>
				<AttributeHeader>
					<AttributeBox $isMobile={isMobile}>
						<AttributeAbbreviation $isMobile={isMobile}>CHA</AttributeAbbreviation>
						<Tooltip
							content={
								breakdowns?.attribute_charisma
									? createEnhancedTooltip('Charisma', breakdowns.attribute_charisma)
									: `${characterData.finalCharisma} Charisma`
							}
							position="top"
						>
							<AttributeValue $isMobile={isMobile}>{characterData.finalCharisma}</AttributeValue>
						</Tooltip>
					</AttributeBox>
					<AttributeInfo $isMobile={isMobile}>
						<AttributeName $isMobile={isMobile}>CHARISMA</AttributeName>
						<AttributeSave $isMobile={isMobile}>
							SAVE +{characterData.finalSaveCharisma}
						</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.charisma)}
			</AttributeSection>

			{/* Intelligence Section */}
			<AttributeSection $isMobile={isMobile}>
				<AttributeHeader>
					<AttributeBox $isMobile={isMobile}>
						<AttributeAbbreviation $isMobile={isMobile}>INT</AttributeAbbreviation>
						<Tooltip
							content={
								breakdowns?.attribute_intelligence
									? createEnhancedTooltip('Intelligence', breakdowns.attribute_intelligence)
									: `${characterData.finalIntelligence} Intelligence`
							}
							position="top"
						>
							<AttributeValue $isMobile={isMobile}>
								{characterData.finalIntelligence}
							</AttributeValue>
						</Tooltip>
					</AttributeBox>
					<AttributeInfo $isMobile={isMobile}>
						<AttributeName $isMobile={isMobile}>INTELLIGENCE</AttributeName>
						<AttributeSave $isMobile={isMobile}>
							SAVE +{characterData.finalSaveIntelligence}
						</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.intelligence)}
			</AttributeSection>
		</>
	);
};

export default Attributes;
