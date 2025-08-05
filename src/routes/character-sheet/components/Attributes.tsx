import React from 'react';
import type { SkillData, CharacterSheetData } from '../../../types';
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
}

const Attributes: React.FC<AttributesProps> = ({ characterData, skillsByAttribute }) => {
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
						<AttributeValue>{characterData.finalMight}</AttributeValue>
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
						<AttributeValue>{characterData.finalAgility}</AttributeValue>
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
						<AttributeValue>{characterData.finalCharisma}</AttributeValue>
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
						<AttributeValue>{characterData.finalIntelligence}</AttributeValue>
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
