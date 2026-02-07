import React from 'react';
import { useTranslation } from 'react-i18next';
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
	SkillBonusContainer,
	SkillBonus,
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
	onSkillClick?: (skillName: string, bonus: number) => void;
}

const Attributes: React.FC<AttributesProps> = ({
	characterData,
	skillsByAttribute,
	breakdowns,
	isMobile = false,
	onSkillClick
}) => {
	const { t } = useTranslation();
	const { state } = useCharacterSheet();

	// Get prime modifier directly from character data
	const primeValue = state.character?.finalPrimeModifierValue || 0;
	const primeAttributeRaw = state.character?.finalPrimeModifierAttribute || 'prime';
	const usePrimeCapRule = state.character?.usePrimeCapRule ?? primeAttributeRaw === 'prime';
	const primeAttributeLabel =
		typeof primeAttributeRaw === 'string' && primeAttributeRaw !== 'prime'
			? primeAttributeRaw.toUpperCase()
			: 'PRIME';

	const getSkillTranslationKey = (skillName: string): string => {
		const skillMap: Record<string, string> = {
			'Awareness': 'skillAwareness',
			'Athletics': 'skillAthletics',
			'Intimidation': 'skillIntimidation',
			'Acrobatics': 'skillAcrobatics',
			'Trickery': 'skillTrickery',
			'Stealth': 'skillStealth',
			'Animal': 'skillAnimal',
			'Insight': 'skillInsight',
			'Influence': 'skillInfluence',
			'Investigation': 'skillInvestigation',
			'Medicine': 'skillMedicine',
			'Survival': 'skillSurvival'
		};
		return skillMap[skillName] || 'skillAwareness';
	};

	const renderSkills = (skills: SkillData[]) => {
		return skills.map((skill) => (
			<SkillRow
				key={skill.id}
				$isMobile={isMobile}
				onClick={() => onSkillClick?.(skill.name, skill.bonus || 0)}
				style={{ cursor: onSkillClick ? 'pointer' : 'default' }}
			>
				<SkillName $isMobile={isMobile}>{t(`characterSheet.${getSkillTranslationKey(skill.name)}`).toUpperCase()}</SkillName>
				<SkillBonusContainer>
					<StyledProficiencyDots>
						{[1, 2, 3, 4, 5].map((level) => (
							<StyledDot key={level} $filled={level <= skill.proficiency} $isMobile={isMobile} />
						))}
					</StyledProficiencyDots>
					{skill.bonus !== undefined && (
						<SkillBonus $isPositive={skill.bonus >= 0} $isMobile={isMobile}>
							{skill.bonus >= 0 ? '+' : ''}
							{skill.bonus}
						</SkillBonus>
					)}
				</SkillBonusContainer>
			</SkillRow>
		));
	};

	return (
		<>
			{/* Prime Modifier & Awareness */}
			<PrimeSection $isMobile={isMobile}>
				<PrimeLabel $isMobile={isMobile}>{t('characterSheet.attrPrime')}</PrimeLabel>
				<PrimeValue $isMobile={isMobile}>
					{usePrimeCapRule ? `+${primeValue}` : `${primeAttributeLabel} +${primeValue}`}
				</PrimeValue>
			</PrimeSection>

			{/* Combat Mastery */}
			<PrimeSection $isMobile={isMobile}>
				<PrimeLabel $isMobile={isMobile}>{t('characterSheet.attrCombatMastery')}</PrimeLabel>
				<PrimeValue $isMobile={isMobile}>+{state.character?.finalCombatMastery || 0}</PrimeValue>
			</PrimeSection>

			{/* Awareness (Prime skill) */}
			{renderSkills(skillsByAttribute.prime)}

			{/* Might Section */}
			<AttributeSection $isMobile={isMobile}>
				<AttributeHeader>
					<AttributeBox $isMobile={isMobile}>
						<AttributeAbbreviation $isMobile={isMobile}>{t('characterSheet.attrMightAbbr')}</AttributeAbbreviation>
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
						<AttributeName $isMobile={isMobile}>{t('characterSheet.attrMight')}</AttributeName>
						<AttributeSave
							$isMobile={isMobile}
							onClick={() => onSkillClick?.('Might Save', characterData.finalSaveMight)}
							style={{ cursor: onSkillClick ? 'pointer' : 'default' }}
						>
							{t('characterSheet.attrSave')} +{characterData.finalSaveMight}
						</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.might)}
			</AttributeSection>

			{/* Agility Section */}
			<AttributeSection $isMobile={isMobile}>
				<AttributeHeader>
					<AttributeBox $isMobile={isMobile}>
						<AttributeAbbreviation $isMobile={isMobile}>{t('characterSheet.attrAgilityAbbr')}</AttributeAbbreviation>
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
						<AttributeName $isMobile={isMobile}>{t('characterSheet.attrAgility')}</AttributeName>
						<AttributeSave
							$isMobile={isMobile}
							onClick={() => onSkillClick?.('Agility Save', characterData.finalSaveAgility)}
							style={{ cursor: onSkillClick ? 'pointer' : 'default' }}
						>
							{t('characterSheet.attrSave')} +{characterData.finalSaveAgility}
						</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.agility)}
			</AttributeSection>

			{/* Charisma Section */}
			<AttributeSection $isMobile={isMobile}>
				<AttributeHeader>
					<AttributeBox $isMobile={isMobile}>
						<AttributeAbbreviation $isMobile={isMobile}>{t('characterSheet.attrCharismaAbbr')}</AttributeAbbreviation>
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
						<AttributeName $isMobile={isMobile}>{t('characterSheet.attrCharisma')}</AttributeName>
						<AttributeSave
							$isMobile={isMobile}
							onClick={() => onSkillClick?.('Charisma Save', characterData.finalSaveCharisma)}
							style={{ cursor: onSkillClick ? 'pointer' : 'default' }}
						>
							{t('characterSheet.attrSave')} +{characterData.finalSaveCharisma}
						</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.charisma)}
			</AttributeSection>

			{/* Intelligence Section */}
			<AttributeSection $isMobile={isMobile}>
				<AttributeHeader>
					<AttributeBox $isMobile={isMobile}>
						<AttributeAbbreviation $isMobile={isMobile}>{t('characterSheet.attrIntelligenceAbbr')}</AttributeAbbreviation>
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
						<AttributeName $isMobile={isMobile}>{t('characterSheet.attrIntelligence')}</AttributeName>
						<AttributeSave
							$isMobile={isMobile}
							onClick={() =>
								onSkillClick?.('Intelligence Save', characterData.finalSaveIntelligence)
							}
							style={{ cursor: onSkillClick ? 'pointer' : 'default' }}
						>
							{t('characterSheet.attrSave')} +{characterData.finalSaveIntelligence}
						</AttributeSave>
					</AttributeInfo>
				</AttributeHeader>

				{renderSkills(skillsByAttribute.intelligence)}
			</AttributeSection>
		</>
	);
};

export default Attributes;
