import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';
import { skillsData } from '../../../lib/rulesdata/skills';
import { StyledDot, StyledProficiencyDots } from '../styles/Skills';
import {
	useCharacterCalculatedData,
	useCharacterSheet,
	useCharacterTrades
} from '../hooks/CharacterSheetProvider';
import {
	AttributeCard,
	AttributeHeader,
	AttributeName,
	AttributeNumbers,
	CardLabel,
	CardLimitLabel,
	CardLimitRow,
	CardValue,
	CombatMasteryCard,
	ManaInfoBody,
	ManaInfoButton,
	ManaInfoExample,
	ManaInfoHeading,
	MasteryBonus,
	MasteryName,
	MasteryResult,
	MasteryRow,
	MasteryRows,
	MasterySection,
	MasterySidebar,
	PrimeCard,
	SaveButton,
	TradeRows
} from './AlternativeMasterySection.styles';
import { theme } from '../styles/theme';
import AlternativeSectionDisclosure from './AlternativeSectionDisclosure';
import {
	StyledFeaturePopupClose,
	StyledFeaturePopupContent,
	StyledFeaturePopupHeader,
	StyledFeaturePopupOverlay,
	StyledFeaturePopupTitle
} from '../styles/FeaturePopup';

export type RollActionType =
	| 'attack'
	| 'physical-check'
	| 'mental-check'
	| 'physical-save'
	| 'mental-save'
	| 'agility-save';

type AttributeKey = 'might' | 'agility' | 'charisma' | 'intelligence';

interface AlternativeMasterySectionProps {
	onRoll: (label: string, bonus: number, actionType: RollActionType) => void;
}

interface MasteryItem {
	id: string;
	name: string;
	proficiency: number;
	bonus: number;
}

const ATTRIBUTE_KEYS: AttributeKey[] = ['might', 'agility', 'charisma', 'intelligence'];

function formatSigned(value: number): string {
	return `${value >= 0 ? '+' : ''}${value}`;
}

function checkActionType(attribute: AttributeKey): RollActionType {
	return attribute === 'might' || attribute === 'agility' ? 'physical-check' : 'mental-check';
}

function saveActionType(attribute: AttributeKey): RollActionType {
	if (attribute === 'agility') return 'agility-save';
	return attribute === 'might' ? 'physical-save' : 'mental-save';
}

function MasteryDots({ proficiency }: { proficiency: number }) {
	return (
		<StyledProficiencyDots aria-label={`Mastery ${proficiency} of 5`}>
			{[1, 2, 3, 4, 5].map((level) => (
				<StyledDot key={level} $filled={level <= proficiency} />
			))}
		</StyledProficiencyDots>
	);
}

function ActionRow({ item, onClick }: { item: MasteryItem; onClick: () => void }) {
	return (
		<MasteryRow
			type="button"
			onClick={onClick}
			aria-label={`Roll ${item.name} ${formatSigned(item.bonus)}`}
		>
			<MasteryName title={item.name}>{item.name}</MasteryName>
			<MasteryResult>
				<MasteryBonus>{formatSigned(item.bonus)}</MasteryBonus>
				<MasteryDots proficiency={item.proficiency} />
			</MasteryResult>
		</MasteryRow>
	);
}

export default function AlternativeMasterySection({ onRoll }: AlternativeMasterySectionProps) {
	const { t } = useTranslation();
	const [showManaSpendInfo, setShowManaSpendInfo] = useState(false);
	const { state } = useCharacterSheet();
	const calculatedData = useCharacterCalculatedData();
	const trades = useCharacterTrades();
	const character = state.character;

	if (!character) return null;

	const stats = calculatedData?.stats;
	const attributeValues: Record<AttributeKey, number> = {
		might: stats?.finalMight ?? character.finalMight ?? 0,
		agility: stats?.finalAgility ?? character.finalAgility ?? 0,
		charisma: stats?.finalCharisma ?? character.finalCharisma ?? 0,
		intelligence: stats?.finalIntelligence ?? character.finalIntelligence ?? 0
	};
	const saveValues: Record<AttributeKey, number> = {
		might: stats?.finalSaveMight ?? character.finalSaveMight ?? 0,
		agility: stats?.finalSaveAgility ?? character.finalSaveAgility ?? 0,
		charisma: stats?.finalSaveCharisma ?? character.finalSaveCharisma ?? 0,
		intelligence: stats?.finalSaveIntelligence ?? character.finalSaveIntelligence ?? 0
	};
	const primeValue = stats?.finalPrimeModifierValue ?? character.finalPrimeModifierValue ?? 0;
	const combatMastery = stats?.finalCombatMastery ?? character.finalCombatMastery ?? 0;
	const masteryBySkill = character.skillsData ?? {};

	const skillGroups = ATTRIBUTE_KEYS.reduce<Record<AttributeKey, MasteryItem[]>>(
		(groups, attribute) => {
			groups[attribute] = skillsData
				.filter((skill) => skill.attributeAssociation === attribute)
				.map((skill) => {
					const proficiency = masteryBySkill[skill.id] ?? 0;
					return {
						id: skill.id,
						name: skill.name,
						proficiency,
						bonus: attributeValues[attribute] + proficiency * 2
					};
				});
			return groups;
		},
		{ might: [], agility: [], charisma: [], intelligence: [] }
	);

	const tradeGroups = ATTRIBUTE_KEYS.reduce<Record<AttributeKey, MasteryItem[]>>(
		(groups, attribute) => {
			groups[attribute] = [];
			return groups;
		},
		{ might: [], agility: [], charisma: [], intelligence: [] }
	);
	for (const trade of trades) {
		const governingAttribute = trade.bonuses?.[0]?.attribute ?? trade.primaryAttribute;
		tradeGroups[governingAttribute].push({
			id: trade.id,
			name: trade.name,
			proficiency: trade.proficiency,
			bonus: trade.bonus ?? attributeValues[governingAttribute] + trade.proficiency * 2
		});
	}

	const awarenessDefinition = skillsData.find((skill) => skill.id === 'awareness');
	const awarenessProficiency = masteryBySkill.awareness ?? 0;
	const awareness: MasteryItem = {
		id: 'awareness',
		name: awarenessDefinition?.name ?? 'Awareness',
		proficiency: awarenessProficiency,
		bonus: primeValue + awarenessProficiency * 2
	};

	const attributeLabels: Record<AttributeKey, string> = {
		might: t('characterSheet.attrMight'),
		agility: t('characterSheet.attrAgility'),
		charisma: t('characterSheet.attrCharisma'),
		intelligence: t('characterSheet.attrIntelligence')
	};

	return (
		<MasterySection aria-label="Attributes, skills, and trades">
			<AlternativeSectionDisclosure
				id="alternative-attributes"
				title={t('characterSheet.sectionAttributes')}
			>
				<MasterySidebar>
					<PrimeCard>
						<AttributeHeader>
							<AttributeName $color={theme.colors.accent.secondary}>
								{t('characterSheet.attrPrime')}
							</AttributeName>
							<AttributeNumbers>{formatSigned(primeValue)}</AttributeNumbers>
						</AttributeHeader>
						<MasteryRows>
							<ActionRow
								item={awareness}
								onClick={() => onRoll(awareness.name, awareness.bonus, 'mental-check')}
							/>
						</MasteryRows>
					</PrimeCard>
					<CombatMasteryCard>
						<CardLabel>{t('characterSheet.attrCombatMastery')}</CardLabel>
						<CardLimitRow>
							<CardLimitLabel>{t('characterSheet.attrManaSpendLimit')}</CardLimitLabel>
							<ManaInfoButton
								type="button"
								onClick={() => setShowManaSpendInfo(true)}
								aria-label={t('characterSheet.manaSpendLimitOpenInfo')}
							>
								<Info size={13} aria-hidden="true" />
							</ManaInfoButton>
						</CardLimitRow>
						<CardValue>{formatSigned(combatMastery)}</CardValue>
					</CombatMasteryCard>
				</MasterySidebar>

				{ATTRIBUTE_KEYS.map((attribute) => (
					<AttributeCard key={attribute} $color={theme.colors.attribute[attribute]}>
						<AttributeHeader>
							<AttributeName $color={theme.colors.attribute[attribute]}>
								{attributeLabels[attribute].toLowerCase()}
							</AttributeName>
							<AttributeNumbers>
								{formatSigned(attributeValues[attribute])}
								<SaveButton
									type="button"
									aria-label={`Roll ${attributeLabels[attribute]} save ${formatSigned(
										saveValues[attribute]
									)}`}
									onClick={() =>
										onRoll(
											`${attributeLabels[attribute]} ${t('characterSheet.attrSave')}`,
											saveValues[attribute],
											saveActionType(attribute)
										)
									}
								>
									({formatSigned(saveValues[attribute])}{' '}
									{t('characterSheet.attrSave').toLowerCase()})
								</SaveButton>
							</AttributeNumbers>
						</AttributeHeader>

						<MasteryRows>
							{skillGroups[attribute].map((skill) => (
								<ActionRow
									key={skill.id}
									item={skill}
									onClick={() => onRoll(skill.name, skill.bonus, checkActionType(attribute))}
								/>
							))}
							{tradeGroups[attribute].length > 0 && (
								<TradeRows>
									{tradeGroups[attribute].map((trade) => (
										<ActionRow
											key={trade.id}
											item={trade}
											onClick={() => onRoll(trade.name, trade.bonus, checkActionType(attribute))}
										/>
									))}
								</TradeRows>
							)}
						</MasteryRows>
					</AttributeCard>
				))}
			</AlternativeSectionDisclosure>
			{showManaSpendInfo && (
				<StyledFeaturePopupOverlay onClick={() => setShowManaSpendInfo(false)}>
					<StyledFeaturePopupContent
						role="dialog"
						aria-modal="true"
						aria-labelledby="mana-spend-limit-title"
						onClick={(event) => event.stopPropagation()}
					>
						<StyledFeaturePopupHeader>
							<StyledFeaturePopupTitle id="mana-spend-limit-title">
								{t('characterSheet.attrManaSpendLimit')}
							</StyledFeaturePopupTitle>
							<StyledFeaturePopupClose
								type="button"
								onClick={() => setShowManaSpendInfo(false)}
								aria-label={t('characterSheet.manaSpendLimitCloseInfo')}
							>
								×
							</StyledFeaturePopupClose>
						</StyledFeaturePopupHeader>
						<ManaInfoBody>
							<p>{t('characterSheet.manaSpendLimitIntro')}</p>
							<ul>
								<li>{t('characterSheet.manaSpendLimitRule')}</li>
								<li>{t('characterSheet.manaSpendLimitCalculation')}</li>
							</ul>
							<ManaInfoHeading>{t('characterSheet.manaSpendLimitExampleHeading')}</ManaInfoHeading>
							<ManaInfoExample>{t('characterSheet.manaSpendLimitExample')}</ManaInfoExample>
							<ManaInfoHeading>
								{t('characterSheet.manaSpendLimitExceptionHeading')}
							</ManaInfoHeading>
							<p>{t('characterSheet.manaSpendLimitException')}</p>
						</ManaInfoBody>
					</StyledFeaturePopupContent>
				</StyledFeaturePopupOverlay>
			)}
		</MasterySection>
	);
}
