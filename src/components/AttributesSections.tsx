import React from 'react';
import type { SkillData, TradeData, LanguageData, CharacterSheetData } from '../types';
import {
	StyledAttributesSectionsContainer,
	StyledPrimeSection,
	StyledPrimeBox,
	StyledPrimeLabel,
	StyledPrimeValue,
	StyledSkillRow,
	StyledSkillName,
	StyledAttributeSection,
	StyledAttributeHeader,
	StyledAttributeBox,
	StyledAttributeAbbr,
	StyledAttributeValue,
	StyledAttributeInfo,
	StyledAttributeName,
	StyledAttributeSave,
	StyledAttributeSkillRow,
	StyledKnowledgeTradesSection,
	StyledSectionTitle,
	StyledSectionSubtitle,
	StyledLanguageRow,
	StyledLanguageName,
	StyledFluencyControls,
	StyledFluencyBox,
	StyledFluencyLabel,
	StyledNoItemsMessage
} from '../routes/character-sheet/styles/AttributesSections.styles';
import { StyledProficiencyDots, StyledDot } from '../routes/character-sheet/styles/Skills';

interface SkillsByAttribute {
	prime: SkillData[];
	might: SkillData[];
	agility: SkillData[];
	charisma: SkillData[];
	intelligence: SkillData[];
}

interface AttributesSectionsProps {
	characterData: CharacterSheetData;
	skillsByAttribute: SkillsByAttribute;
	knowledge: TradeData[];
	trades: TradeData[];
	languages: LanguageData[];
}

const AttributesSections: React.FC<AttributesSectionsProps> = ({
	characterData,
	skillsByAttribute,
	knowledge,
	trades,
	languages
}) => {
	return (
		<StyledAttributesSectionsContainer>
			{/* Prime Modifier & Awareness */}
			<StyledPrimeSection>
				<StyledPrimeBox>
					<StyledPrimeLabel>Prime</StyledPrimeLabel>
					<StyledPrimeValue>
						{characterData.finalPrimeModifierAttribute} +{characterData.finalPrimeModifierValue}
					</StyledPrimeValue>
				</StyledPrimeBox>

				{/* Awareness (Prime skill) */}
				{skillsByAttribute.prime.map((skill) => (
					<StyledSkillRow key={skill.id}>
						<StyledSkillName>{skill.name.toUpperCase()}</StyledSkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= skill.proficiency} />
							))}
						</StyledProficiencyDots>
					</StyledSkillRow>
				))}
			</StyledPrimeSection>

			{/* Might Section */}
			<StyledAttributeSection>
				<StyledAttributeHeader>
					<StyledAttributeBox>
						<StyledAttributeAbbr>MIG</StyledAttributeAbbr>
						<StyledAttributeValue>{characterData.finalMight}</StyledAttributeValue>
					</StyledAttributeBox>
					<StyledAttributeInfo>
						<StyledAttributeName>MIGHT</StyledAttributeName>
						<StyledAttributeSave>SAVE +{characterData.finalSaveMight}</StyledAttributeSave>
					</StyledAttributeInfo>
				</StyledAttributeHeader>

				{/* Might Skills */}
				{skillsByAttribute.might.map((skill) => (
					<StyledAttributeSkillRow key={skill.id}>
						<StyledSkillName>{skill.name.toUpperCase()}</StyledSkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= skill.proficiency} />
							))}
						</StyledProficiencyDots>
					</StyledAttributeSkillRow>
				))}
			</StyledAttributeSection>

			{/* Agility Section */}
			<StyledAttributeSection>
				<StyledAttributeHeader>
					<StyledAttributeBox>
						<StyledAttributeAbbr>AGI</StyledAttributeAbbr>
						<StyledAttributeValue>{characterData.finalAgility}</StyledAttributeValue>
					</StyledAttributeBox>
					<StyledAttributeInfo>
						<StyledAttributeName>AGILITY</StyledAttributeName>
						<StyledAttributeSave>SAVE +{characterData.finalSaveAgility}</StyledAttributeSave>
					</StyledAttributeInfo>
				</StyledAttributeHeader>

				{/* Agility Skills */}
				{skillsByAttribute.agility.map((skill) => (
					<StyledAttributeSkillRow key={skill.id}>
						<StyledSkillName>{skill.name.toUpperCase()}</StyledSkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= skill.proficiency} />
							))}
						</StyledProficiencyDots>
					</StyledAttributeSkillRow>
				))}
			</StyledAttributeSection>

			{/* Charisma Section */}
			<StyledAttributeSection>
				<StyledAttributeHeader>
					<StyledAttributeBox>
						<StyledAttributeAbbr>CHA</StyledAttributeAbbr>
						<StyledAttributeValue>{characterData.finalCharisma}</StyledAttributeValue>
					</StyledAttributeBox>
					<StyledAttributeInfo>
						<StyledAttributeName>CHARISMA</StyledAttributeName>
						<StyledAttributeSave>SAVE +{characterData.finalSaveCharisma}</StyledAttributeSave>
					</StyledAttributeInfo>
				</StyledAttributeHeader>

				{/* Charisma Skills */}
				{skillsByAttribute.charisma.map((skill) => (
					<StyledAttributeSkillRow key={skill.id}>
						<StyledSkillName>{skill.name.toUpperCase()}</StyledSkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= skill.proficiency} />
							))}
						</StyledProficiencyDots>
					</StyledAttributeSkillRow>
				))}
			</StyledAttributeSection>

			{/* Intelligence Section */}
			<StyledAttributeSection>
				<StyledAttributeHeader>
					<StyledAttributeBox>
						<StyledAttributeAbbr>INT</StyledAttributeAbbr>
						<StyledAttributeValue>{characterData.finalIntelligence}</StyledAttributeValue>
					</StyledAttributeBox>
					<StyledAttributeInfo>
						<StyledAttributeName>INTELLIGENCE</StyledAttributeName>
						<StyledAttributeSave>SAVE +{characterData.finalSaveIntelligence}</StyledAttributeSave>
					</StyledAttributeInfo>
				</StyledAttributeHeader>

				{/* Intelligence Skills */}
				{skillsByAttribute.intelligence.map((skill) => (
					<StyledAttributeSkillRow key={skill.id}>
						<StyledSkillName>{skill.name.toUpperCase()}</StyledSkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= skill.proficiency} />
							))}
						</StyledProficiencyDots>
					</StyledAttributeSkillRow>
				))}
			</StyledAttributeSection>

			{/* Knowledge Section */}
			<StyledKnowledgeTradesSection>
				<StyledSectionTitle>KNOWLEDGE</StyledSectionTitle>
				<StyledSectionSubtitle>Intelligence-based knowledge trades</StyledSectionSubtitle>
				{knowledge.map((knowledgeItem) => (
					<StyledAttributeSkillRow key={knowledgeItem.id}>
						<StyledSkillName>{knowledgeItem.name.toUpperCase()}</StyledSkillName>
						<StyledProficiencyDots>
							{[1, 2, 3, 4, 5].map((level) => (
								<StyledDot key={level} filled={level <= knowledgeItem.proficiency} />
							))}
						</StyledProficiencyDots>
					</StyledAttributeSkillRow>
				))}
			</StyledKnowledgeTradesSection>

			{/* Trades Section */}
			<StyledKnowledgeTradesSection>
				<StyledSectionTitle>TRADES</StyledSectionTitle>
				<StyledSectionSubtitle>Selected practical trades & crafts</StyledSectionSubtitle>
				{trades.length > 0 ? (
					trades.map((trade) => (
						<StyledAttributeSkillRow key={trade.id}>
							<StyledSkillName>{trade.name.toUpperCase()}</StyledSkillName>
							<StyledProficiencyDots>
								{[1, 2, 3, 4, 5].map((level) => (
									<StyledDot key={level} filled={level <= trade.proficiency} />
								))}
							</StyledProficiencyDots>
						</StyledAttributeSkillRow>
					))
				) : (
					<StyledNoItemsMessage>No trades selected</StyledNoItemsMessage>
				)}
			</StyledKnowledgeTradesSection>

			{/* Languages Section */}
			<StyledKnowledgeTradesSection>
				<StyledSectionTitle>LANGUAGES</StyledSectionTitle>
				<StyledSectionSubtitle>
					LANGUAGE CHECK = d20 + Intelligence or Charisma
				</StyledSectionSubtitle>
				{languages.map((language) => (
					<StyledLanguageRow key={language.id}>
						<StyledLanguageName>{language.name.toUpperCase()}</StyledLanguageName>
						<StyledFluencyControls>
							<StyledFluencyBox active={language.fluency === 'limited'} />
							<StyledFluencyLabel>LIMITED</StyledFluencyLabel>
							<StyledFluencyBox active={language.fluency === 'fluent'} />
							<StyledFluencyLabel>FLUENT</StyledFluencyLabel>
						</StyledFluencyControls>
					</StyledLanguageRow>
				))}
			</StyledKnowledgeTradesSection>
		</StyledAttributesSectionsContainer>
	);
};

export default AttributesSections;
