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
	AttributeValue,
	AttributeInfo,
	AttributeName,
	AttributeSave,
	AttributeContext,
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
			Awareness: 'skillAwareness',
			Athletics: 'skillAthletics',
			Intimidation: 'skillIntimidation',
			Acrobatics: 'skillAcrobatics',
			Trickery: 'skillTrickery',
			Stealth: 'skillStealth',
			Animal: 'skillAnimal',
			Insight: 'skillInsight',
			Influence: 'skillInfluence',
			Investigation: 'skillInvestigation',
			Medicine: 'skillMedicine',
			Survival: 'skillSurvival'
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
				<SkillName $isMobile={isMobile}>
					{t(`characterSheet.${getSkillTranslationKey(skill.name)}`).toUpperCase()}
				</SkillName>
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

	const formatSigned = (value: number): string => `${value >= 0 ? '+' : ''}${value}`;

	const renderAttributeHeader = ({
		nameKey,
		tooltipLabel,
		value,
		save,
		breakdown,
		testId
	}: {
		nameKey: string;
		tooltipLabel: string;
		value: number;
		save: number;
		breakdown?: EnhancedStatBreakdown;
		testId?: string;
	}) => (
		<AttributeHeader>
			<AttributeInfo $isMobile={isMobile}>
				<AttributeName $isMobile={isMobile}>{t(`characterSheet.${nameKey}`)}</AttributeName>
				<Tooltip
					content={
						breakdown ? createEnhancedTooltip(tooltipLabel, breakdown) : `${value} ${tooltipLabel}`
					}
					position="top"
				>
					<AttributeValue $isMobile={isMobile} data-testid={testId}>
						{formatSigned(value)}
					</AttributeValue>
				</Tooltip>
				<AttributeSave
					$isMobile={isMobile}
					onClick={() => onSkillClick?.(`${tooltipLabel} Save`, save)}
					style={{ cursor: onSkillClick ? 'pointer' : 'default' }}
				>
					({formatSigned(save)} {t('characterSheet.attrSave').toLowerCase()})
				</AttributeSave>
			</AttributeInfo>
		</AttributeHeader>
	);

	return (
		<>
			{/* Combat Mastery */}
			<PrimeSection $isMobile={isMobile}>
				<PrimeLabel $isMobile={isMobile}>{t('characterSheet.attrCombatMastery')}</PrimeLabel>
				<PrimeValue $isMobile={isMobile}>+{state.character?.finalCombatMastery || 0}</PrimeValue>
			</PrimeSection>

			{/* Prime Modifier & Awareness */}
			<AttributeSection $isMobile={isMobile}>
				<AttributeHeader>
					<AttributeInfo $isMobile={isMobile}>
						<AttributeName $isMobile={isMobile}>{t('characterSheet.attrPrime')}</AttributeName>
						<AttributeValue $isMobile={isMobile}>{formatSigned(primeValue)}</AttributeValue>
						{!usePrimeCapRule && (
							<AttributeContext $isMobile={isMobile}>
								({primeAttributeLabel.toLowerCase()})
							</AttributeContext>
						)}
					</AttributeInfo>
				</AttributeHeader>
				{renderSkills(skillsByAttribute.prime)}
			</AttributeSection>

			{/* Might Section */}
			<AttributeSection $isMobile={isMobile}>
				{renderAttributeHeader({
					nameKey: 'attrMight',
					tooltipLabel: 'Might',
					value: characterData.finalMight,
					save: characterData.finalSaveMight,
					breakdown: breakdowns?.attribute_might,
					testId: 'sheet-attribute-might-value'
				})}

				{renderSkills(skillsByAttribute.might)}
			</AttributeSection>

			{/* Agility Section */}
			<AttributeSection $isMobile={isMobile}>
				{renderAttributeHeader({
					nameKey: 'attrAgility',
					tooltipLabel: 'Agility',
					value: characterData.finalAgility,
					save: characterData.finalSaveAgility,
					breakdown: breakdowns?.attribute_agility,
					testId: 'sheet-attribute-agility-value'
				})}

				{renderSkills(skillsByAttribute.agility)}
			</AttributeSection>

			{/* Charisma Section */}
			<AttributeSection $isMobile={isMobile}>
				{renderAttributeHeader({
					nameKey: 'attrCharisma',
					tooltipLabel: 'Charisma',
					value: characterData.finalCharisma,
					save: characterData.finalSaveCharisma,
					breakdown: breakdowns?.attribute_charisma
				})}

				{renderSkills(skillsByAttribute.charisma)}
			</AttributeSection>

			{/* Intelligence Section */}
			<AttributeSection $isMobile={isMobile}>
				{renderAttributeHeader({
					nameKey: 'attrIntelligenceAbbr',
					tooltipLabel: 'Intelligence',
					value: characterData.finalIntelligence,
					save: characterData.finalSaveIntelligence,
					breakdown: breakdowns?.attribute_intelligence
				})}

				{renderSkills(skillsByAttribute.intelligence)}
			</AttributeSection>
		</>
	);
};

export default Attributes;
