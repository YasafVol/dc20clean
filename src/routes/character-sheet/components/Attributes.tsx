import React from 'react';
import type { SkillData, CharacterSheetData } from '../../../types';
import type { EnhancedStatBreakdown } from '../../../lib/types/effectSystem';
import Tooltip from './Tooltip';
import { createEnhancedTooltip } from './EnhancedStatTooltips';
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
	characterData: CharacterSheetData;
	skillsByAttribute: {
		prime: SkillData[];
		might: SkillData[];
		agility: SkillData[];
		charisma: SkillData[];
		intelligence: SkillData[];
	};
	breakdowns?: Record<string, EnhancedStatBreakdown>;
}

const Attributes: React.FC<AttributesProps> = ({ characterData, skillsByAttribute, breakdowns }) => {
	const renderSkills = (skills: SkillData[]) => {
		return skills.map((skill) => (
			<SkillRow key={skill.id}>
				<SkillName>{skill.name.toUpperCase()}</SkillName>
				<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					<StyledProficiencyDots>
						{[1, 2, 3, 4, 5].map((level) => (
							<StyledDot key={level} filled={level <= skill.proficiency} />
						))}
					</StyledProficiencyDots>
					{skill.bonus !== undefined && (
						<span style={{
							fontSize: '0.875rem',
							fontWeight: '600',
							color: skill.bonus >= 0 ? '#059669' : '#dc2626',
							minWidth: '2rem',
							textAlign: 'center'
						}}>
							{skill.bonus >= 0 ? '+' : ''}{skill.bonus}
						</span>
					)}
				</div>
			</SkillRow>
		));
	};

	return (
		<>
			{/* Prime Modifier & Awareness */}
			<PrimeSection>
				<PrimeLabel>Prime</PrimeLabel>
				<PrimeValue>
					{characterData.finalPrimeModifierAttribute} +{characterData.finalPrimeModifierValue}
				</PrimeValue>
			</PrimeSection>

			{/* Awareness (Prime skill) */}
			{renderSkills(skillsByAttribute.prime)}

			{/* Might Section */}
			<AttributeSection>
				<AttributeHeader>
					<AttributeBox>
						<AttributeAbbreviation>MIG</AttributeAbbreviation>
						<Tooltip 
							content={
								breakdowns?.attribute_might 
									? createEnhancedTooltip('Might', breakdowns.attribute_might)
									: `${characterData.finalMight} Might`
							} 
							position="top"
						>
							<AttributeValue>{characterData.finalMight}</AttributeValue>
						</Tooltip>
					</AttributeBox>
					<AttributeInfo>
						<AttributeName>MIGHT</AttributeName>
						<AttributeSave>SAVE +{characterData.finalSaveMight}</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.might)}
			</AttributeSection>

			{/* Agility Section */}
			<AttributeSection>
				<AttributeHeader>
					<AttributeBox>
						<AttributeAbbreviation>AGI</AttributeAbbreviation>
						<Tooltip 
							content={
								breakdowns?.attribute_agility 
									? createEnhancedTooltip('Agility', breakdowns.attribute_agility)
									: `${characterData.finalAgility} Agility`
							} 
							position="top"
						>
							<AttributeValue>{characterData.finalAgility}</AttributeValue>
						</Tooltip>
					</AttributeBox>
					<AttributeInfo>
						<AttributeName>AGILITY</AttributeName>
						<AttributeSave>SAVE +{characterData.finalSaveAgility}</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.agility)}
			</AttributeSection>

			{/* Charisma Section */}
			<AttributeSection>
				<AttributeHeader>
					<AttributeBox>
						<AttributeAbbreviation>CHA</AttributeAbbreviation>
						<Tooltip 
							content={
								breakdowns?.attribute_charisma 
									? createEnhancedTooltip('Charisma', breakdowns.attribute_charisma)
									: `${characterData.finalCharisma} Charisma`
							} 
							position="top"
						>
							<AttributeValue>{characterData.finalCharisma}</AttributeValue>
						</Tooltip>
					</AttributeBox>
					<AttributeInfo>
						<AttributeName>CHARISMA</AttributeName>
						<AttributeSave>SAVE +{characterData.finalSaveCharisma}</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.charisma)}
			</AttributeSection>

			{/* Intelligence Section */}
			<AttributeSection>
				<AttributeHeader>
					<AttributeBox>
						<AttributeAbbreviation>INT</AttributeAbbreviation>
						<Tooltip 
							content={
								breakdowns?.attribute_intelligence 
									? createEnhancedTooltip('Intelligence', breakdowns.attribute_intelligence)
									: `${characterData.finalIntelligence} Intelligence`
							} 
							position="top"
						>
							<AttributeValue>{characterData.finalIntelligence}</AttributeValue>
						</Tooltip>
					</AttributeBox>
					<AttributeInfo>
						<AttributeName>INTELLIGENCE</AttributeName>
						<AttributeSave>SAVE +{characterData.finalSaveIntelligence}</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.intelligence)}
			</AttributeSection>
		</>
	);
};

export default Attributes;
