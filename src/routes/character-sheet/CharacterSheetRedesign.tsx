import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Use Provider hooks
import {
	useCharacterSheet,
	useCharacterResources,
	useCharacterConditions,
	useCharacterLanguages
} from './hooks/CharacterSheetProvider';

// Import types
import type { FeatureData } from '../../types';

// Import new components
import { HeroSection } from './components/new/HeroSection';

// Import skills data
import { skillsData } from '../../lib/rulesdata/skills';

// Import existing components
import Spells from './components/Spells';
import Maneuvers from './components/Maneuvers';
import Attacks from './components/Attacks';
import Inventory from './components/Inventory';
import Features from './components/Features';
import Conditions from './components/Conditions';
import ConditionsReference from './components/ConditionsReference';
import Currency from './components/Currency';
import PlayerNotes from './components/PlayerNotes';
import DiceRoller from './components/DiceRoller';
import Movement from './components/Movement';
import RightColumnResources from './components/RightColumnResources';
import FeaturePopup from './components/FeaturePopup';
import DeathExhaustion from './components/DeathExhaustion';
import KnowledgeTrades from './components/KnowledgeTrades';
import Languages from './components/Languages';
import Attributes from './components/Attributes';

// Import theme
import { theme } from './styles/theme';
import { logger } from '../../lib/utils/logger';

interface CharacterSheetRedesignProps {
	characterId: string;
	onBack?: () => void;
}

// Styled components with new theme
const PageContainer = styled.div`
	min-height: 100vh;
	background: ${theme.colors.bg.primary};
	color: ${theme.colors.text.primary};
	font-family: ${theme.typography.fontFamily.primary};
`;

const Header = styled(motion.header)`
	background: ${theme.colors.bg.elevated};
	border-bottom: 1px solid ${theme.colors.border.default};
	padding: ${theme.spacing[6]} ${theme.spacing[8]};
	box-shadow: ${theme.shadows.md};
	position: sticky;
	top: 0;
	z-index: ${theme.zIndex.sticky};
	backdrop-filter: blur(10px);
	background: rgba(26, 27, 38, 0.95);
`;

const HeaderContent = styled.div`
	max-width: 1600px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: ${theme.spacing[6]};
`;

const CharacterIdentity = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};
`;

const CharacterName = styled.h1`
	font-size: ${theme.typography.fontSize['4xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	margin: 0;
	line-height: ${theme.typography.lineHeight.tight};
`;

const CharacterMeta = styled.div`
	display: flex;
	gap: ${theme.spacing[4]};
	align-items: center;
	font-size: ${theme.typography.fontSize.base};
	color: ${theme.colors.text.secondary};
`;

const MetaItem = styled.span`
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};

	&:not(:last-child)::after {
		content: '•';
		margin-left: ${theme.spacing[4]};
		color: ${theme.colors.text.muted};
	}
`;

const ActionButtons = styled.div`
	display: flex;
	gap: ${theme.spacing[3]};
`;

const ActionButton = styled(motion.button)`
	background: ${theme.colors.bg.tertiary};
	color: ${theme.colors.text.primary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	padding: ${theme.spacing[3]} ${theme.spacing[4]};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};

	&:hover {
		background: ${theme.colors.accent.primary};
		color: ${theme.colors.text.inverse};
		border-color: ${theme.colors.accent.primary};
		box-shadow: ${theme.shadows.md};
	}

	&:active {
		transform: scale(0.98);
	}
`;

const BackButton = styled(ActionButton)`
	background: transparent;

	&:hover {
		background: ${theme.colors.bg.tertiary};
		color: ${theme.colors.text.primary};
	}
`;

const MainContent = styled.main`
	max-width: 1600px;
	margin: 0 auto;
	padding: ${theme.spacing[8]};
`;

const TwoColumnLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: ${theme.spacing[6]};

	@media (max-width: 1100px) {
		grid-template-columns: 1fr;
	}
`;

const LeftColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[6]};
`;

const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[6]};
`;

const ThreeColumnLayout = styled.div`
	display: grid;
	grid-template-columns: 280px 1fr 300px;
	gap: ${theme.spacing[6]};
	margin-top: ${theme.spacing[6]};

	@media (max-width: 1400px) {
		grid-template-columns: 260px 1fr 280px;
		gap: ${theme.spacing[4]};
	}

	@media (max-width: 1200px) {
		grid-template-columns: 1fr;
	}
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[6]};
`;

const TabContainer = styled.div`
	background: ${theme.colors.bg.elevated};
	border-radius: ${theme.borderRadius.xl};
	box-shadow: ${theme.shadows.lg};
	overflow: hidden;
	border: 1px solid ${theme.colors.border.default};
`;

const TabNav = styled.div`
	display: flex;
	border-bottom: 1px solid ${theme.colors.border.default};
	background: ${theme.colors.bg.secondary};
	overflow-x: auto;
	scrollbar-width: thin;
	scrollbar-color: ${theme.colors.border.default} transparent;

	&::-webkit-scrollbar {
		height: 4px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background: ${theme.colors.border.default};
		border-radius: ${theme.borderRadius.full};
	}
`;

const Tab = styled(motion.button)<{ $active: boolean }>`
	background: ${(props) => (props.$active ? theme.colors.bg.elevated : 'transparent')};
	color: ${(props) => (props.$active ? theme.colors.accent.primary : theme.colors.text.secondary)};
	border: none;
	padding: ${theme.spacing[4]} ${theme.spacing[6]};
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.medium};
	cursor: pointer;
	transition: all ${theme.transitions.fast};
	white-space: nowrap;
	position: relative;

	&:hover {
		background: ${theme.colors.bg.tertiary};
		color: ${theme.colors.text.primary};
	}

	${(props) =>
		props.$active &&
		`
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 2px;
			background: ${theme.colors.accent.primary};
		}
	`}
`;

const TabContent = styled(motion.div)`
	padding: ${theme.spacing[6]};
`;

const SectionCard = styled(motion.div)<{ $withMarginBottom?: boolean }>`
	background: ${theme.colors.bg.secondary};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[6]};
	box-shadow: ${theme.shadows.md};
	border: 1px solid ${theme.colors.border.default};
	${(props) => props.$withMarginBottom && `margin-bottom: ${theme.spacing[4]};`}
`;

const SectionTitle = styled.h2`
	font-size: ${theme.typography.fontSize.xl};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.primary};
	margin: 0 0 ${theme.spacing[4]} 0;
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

const LoadingContainer = styled(motion.div)`
	padding: ${theme.spacing[8]};
	text-align: center;
`;

const ErrorContainer = styled(motion.div)`
	padding: ${theme.spacing[8]};
	text-align: center;
	color: ${theme.colors.accent.danger};
`;

type TabId =
	| 'attacks'
	| 'spells'
	| 'inventory'
	| 'maneuvers'
	| 'features'
	| 'conditions'
	| 'resources'
	| 'knowledge'
	| 'utility'
	| 'notes';

const CharacterSheetRedesign: React.FC<CharacterSheetRedesignProps> = ({ characterId, onBack }) => {
	logger.debug('ui', 'CharacterSheetRedesign render', { characterId });

	const [activeTab, setActiveTab] = useState<TabId>('attacks');
	const [selectedFeature, setSelectedFeature] = useState<FeatureData | null>(null);

	// Use Provider hooks
	const {
		state,
		updateHP,
		updateMP,
		updateSP,
		updateTempHP,
		updateActionPoints,
		updateGritPoints,
		updateRestPoints
	} = useCharacterSheet();
	const resources = useCharacterResources();
	const conditionStatuses = useCharacterConditions();
	const languages = useCharacterLanguages();

	const characterData = state.character;
	const loading = state.loading;
	const error = state.error;

	// Feature popup handlers
	const openFeaturePopup = (feature: FeatureData) => {
		setSelectedFeature(feature);
	};

	const closeFeaturePopup = () => {
		setSelectedFeature(null);
	};

	if (loading) {
		return (
			<PageContainer>
				<LoadingContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					Loading character...
				</LoadingContainer>
			</PageContainer>
		);
	}

	if (error || !characterData) {
		return (
			<PageContainer>
				<ErrorContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					{error || 'Character not found'}
				</ErrorContainer>
			</PageContainer>
		);
	}

	// Extract character data
	const currentHP = resources?.current?.currentHP ?? 0;
	const maxHP = characterData.finalHPMax ?? 0;
	const tempHP = resources?.current?.tempHP ?? 0;
	const currentMP = resources?.current?.currentMP ?? 0;
	const maxMP = characterData.finalMPMax ?? 0;
	const currentSP = resources?.current?.currentSP ?? 0;
	const maxSP = characterData.finalSPMax ?? 0;

	// Rest and Grit values
	const currentRest = resources?.current?.currentRestPoints ?? 0;
	const maxRest = characterData.finalRestPoints ?? 0;
	const currentGrit = resources?.current?.currentGritPoints ?? 0;
	const maxGrit = characterData.finalGritPoints ?? 0;

	const primeAttribute = characterData.finalPrimeModifierAttribute || 'charisma';
	const primeValue = characterData.finalPrimeModifierValue || 0;
	const combatMastery = characterData.finalCombatMastery || 0;

	// Get defenses and combat stats from character data
	const precisionAD = characterData.finalPD ?? 10;
	const areaAD = characterData.finalAD ?? 10;
	const precisionDR = characterData.finalPDR ?? 0;

	// Combat stats - these would typically come from calculations
	const attackBonus = primeValue; // Simplified for now
	const saveDC = 10 + primeValue; // Simplified for now
	const initiative = characterData.finalAgility || 0; // Simplified for now

	// Get attribute values for AttributeCards
	const might = characterData.finalMight ?? 0;
	const agility = characterData.finalAgility ?? 0;
	const charisma = characterData.finalCharisma ?? 0;
	const intelligence = characterData.finalIntelligence ?? 0;

	// Prepare skills by attribute for Attributes component
	const characterSkills: Record<string, number> = characterData.skillsData || {};

	const skillsByAttribute = {
		prime: skillsData
			.filter((skill) => skill.attributeAssociation.toLowerCase() === 'prime')
			.map((skill) => ({
				...skill,
				proficiency: characterSkills[skill.id] || 0,
				bonus: (characterSkills[skill.id] || 0) * 2 + primeValue
			})),
		might: skillsData
			.filter((skill) => skill.attributeAssociation.toLowerCase() === 'might')
			.map((skill) => ({
				...skill,
				proficiency: characterSkills[skill.id] || 0,
				bonus: (characterSkills[skill.id] || 0) * 2 + might
			})),
		agility: skillsData
			.filter((skill) => skill.attributeAssociation.toLowerCase() === 'agility')
			.map((skill) => ({
				...skill,
				proficiency: characterSkills[skill.id] || 0,
				bonus: (characterSkills[skill.id] || 0) * 2 + agility
			})),
		charisma: skillsData
			.filter((skill) => skill.attributeAssociation.toLowerCase() === 'charisma')
			.map((skill) => ({
				...skill,
				proficiency: characterSkills[skill.id] || 0,
				bonus: (characterSkills[skill.id] || 0) * 2 + charisma
			})),
		intelligence: skillsData
			.filter((skill) => skill.attributeAssociation.toLowerCase() === 'intelligence')
			.map((skill) => ({
				...skill,
				proficiency: characterSkills[skill.id] || 0,
				bonus: (characterSkills[skill.id] || 0) * 2 + intelligence
			}))
	};

	const tabs: { id: TabId; label: string; emoji: string }[] = [
		{ id: 'attacks', label: 'Attacks', emoji: '⚔️' },
		{ id: 'spells', label: 'Spells', emoji: '📜' },
		{ id: 'inventory', label: 'Inventory', emoji: '🎒' },
		{ id: 'maneuvers', label: 'Maneuvers', emoji: '⚡' },
		{ id: 'features', label: 'Features', emoji: '✨' },
		{ id: 'conditions', label: 'Conditions', emoji: '🎭' },
		{ id: 'resources', label: 'Resources', emoji: '💎' },
		{ id: 'knowledge', label: 'Knowledge', emoji: '📚' },
		{ id: 'utility', label: 'Utility', emoji: '🔧' },
		{ id: 'notes', label: 'Notes', emoji: '📝' }
	];

	return (
		<PageContainer>
			<Header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ type: 'spring', stiffness: 100 }}
			>
				<HeaderContent>
					<CharacterIdentity>
						<CharacterName>{characterData.finalName || 'Unnamed Character'}</CharacterName>
						<CharacterMeta>
							<MetaItem>{characterData.finalPlayerName || 'Player'}</MetaItem>
							<MetaItem>
								Level {characterData.level || 1} {characterData.className || 'Adventurer'}
							</MetaItem>
							<MetaItem>
								{characterData.ancestry1Name || 'Unknown'}{' '}
								{characterData.ancestry2Name ? `/ ${characterData.ancestry2Name}` : ''}
							</MetaItem>
						</CharacterMeta>
					</CharacterIdentity>

					<ActionButtons>
						{onBack && (
							<BackButton onClick={onBack} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								← Back
							</BackButton>
						)}
						<ActionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							🔄 Revert All
						</ActionButton>
						<ActionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							📋 Copy
						</ActionButton>
						<ActionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							📄 Export PDF
						</ActionButton>
					</ActionButtons>
				</HeaderContent>
			</Header>

			<MainContent>
				<TwoColumnLayout>
					{/* Left Column (1/3) - Attributes with Prime & Awareness */}
					<LeftColumn>
						<SectionCard
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
						>
							<Attributes
								characterData={characterData}
								skillsByAttribute={skillsByAttribute}
								isMobile={false}
							/>
						</SectionCard>
					</LeftColumn>

					{/* Right Column (2/3) - Everything else */}
					<RightColumn>
						{/* Hero Section (HP/MP/SP/Rest/Grit, Defenses) */}
						<HeroSection
							currentHP={currentHP}
							maxHP={maxHP}
							tempHP={tempHP}
							currentMana={currentMP}
							maxMana={maxMP}
							currentStamina={currentSP}
							maxStamina={maxSP}
							currentRest={currentRest}
							maxRest={maxRest}
							currentGrit={currentGrit}
							maxGrit={maxGrit}
							precisionAD={precisionAD}
							precisionDR={precisionDR}
							areaAD={areaAD}
							attackBonus={attackBonus}
							saveDC={saveDC}
							initiative={initiative}
							onHPChange={updateHP}
							onTempHPChange={updateTempHP}
							onManaChange={updateMP}
							onStaminaChange={updateSP}
							onRestChange={updateRestPoints}
							onGritChange={updateGritPoints}
						/>

						{/* Tabs Section */}
						<TabContainer>
							<TabNav>
								{tabs.map((tab) => (
									<Tab
										key={tab.id}
										$active={activeTab === tab.id}
										onClick={() => setActiveTab(tab.id)}
										whileHover={{ y: -2 }}
										whileTap={{ scale: 0.98 }}
									>
										{tab.emoji} {tab.label}
									</Tab>
								))}
							</TabNav>

							<AnimatePresence mode="wait">
								<TabContent
									key={activeTab}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.2 }}
								>
									{activeTab === 'attacks' && <Attacks onAttackClick={() => {}} />}
									{activeTab === 'spells' && <Spells onSpellClick={() => {}} />}
									{activeTab === 'inventory' && <Inventory onItemClick={() => {}} />}
									{activeTab === 'maneuvers' && <Maneuvers onManeuverClick={() => {}} />}
									{activeTab === 'features' && <Features onFeatureClick={openFeaturePopup} />}
									{activeTab === 'conditions' && (
										<>
											<Conditions conditionStatuses={conditionStatuses || []} />
											<ConditionsReference />
										</>
									)}
									{activeTab === 'resources' && <RightColumnResources />}{' '}
									{activeTab === 'knowledge' && (
										<>
											<SectionCard
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												$withMarginBottom
											>
												<KnowledgeTrades isMobile={false} />
											</SectionCard>
											<SectionCard initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
												<Languages languages={languages || []} isMobile={false} />
											</SectionCard>
										</>
									)}{' '}
									{activeTab === 'utility' && (
										<>
											<SectionCard
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												$withMarginBottom
											>
												<SectionTitle>Movement</SectionTitle>
												<Movement />
											</SectionCard>
											<SectionCard
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												$withMarginBottom
											>
												<SectionTitle>Currency</SectionTitle>
												<Currency />
											</SectionCard>
										</>
									)}
									{activeTab === 'notes' && <PlayerNotes />}
								</TabContent>
							</AnimatePresence>
						</TabContainer>
					</RightColumn>
				</TwoColumnLayout>
			</MainContent>

			<DiceRoller />
			<FeaturePopup feature={selectedFeature} onClose={closeFeaturePopup} />
		</PageContainer>
	);
};

export default CharacterSheetRedesign;
