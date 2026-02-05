import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Use Provider hooks
import {
	useCharacterSheet,
	useCharacterResources,
	useCharacterConditions,
	useCharacterLanguages,
	useCharacterCalculatedData
} from './hooks/CharacterSheetProvider';
import { useBreakpoint } from './hooks/useBreakpoint';

// Import types
import type { FeatureData, InventoryItemData } from '../../types';
import type { Weapon, InventoryItem } from '../../lib/rulesdata/inventoryItems';

// Import new components
import { HeroSection } from './components/new/HeroSection';

// Import condition analyzer
import { getDiceModifierForAction } from '../../lib/services/conditionEffectsAnalyzer';

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
import ActiveConditionsTracker from './components/ActiveConditionsTracker';
import Currency from './components/Currency';
import PlayerNotes from './components/PlayerNotes';
import DiceRoller, { DiceRollerRef } from './components/DiceRoller';
import { AutoSaveIndicator } from './components/AutoSaveIndicator';
import Movement from './components/Movement';
import FeaturePopup from './components/FeaturePopup';
import WeaponPopup from './components/WeaponPopup';
import InventoryPopup from './components/InventoryPopup';
import CalculationTooltip from './components/shared/CalculationTooltip';
import DeathExhaustion from './components/DeathExhaustion';
import KnowledgeTrades from './components/KnowledgeTrades';
import Languages from './components/Languages';
import Attributes from './components/Attributes';
import MobileBottomNav from './components/shared/MobileBottomNav';
import HamburgerDrawer from './components/shared/HamburgerDrawer';

// Import theme
import { theme, media } from './styles/theme';
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
	background: var(--bg-primary);

	${media.tablet} {
		padding: ${theme.spacing[4]} ${theme.spacing[6]};
	}

	${media.mobile} {
		padding: ${theme.spacing[3]} ${theme.spacing[4]};
	}
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

	${media.tablet} {
		font-size: ${theme.typography.fontSize['2xl']};
	}

	${media.mobile} {
		font-size: ${theme.typography.fontSize.xl};
	}
`;

const CharacterMeta = styled.div`
	display: flex;
	gap: ${theme.spacing[4]};
	align-items: center;
	font-size: ${theme.typography.fontSize.base};
	color: ${theme.colors.text.secondary};
	flex-wrap: wrap;

	${media.mobile} {
		font-size: ${theme.typography.fontSize.sm};
		gap: ${theme.spacing[2]};
	}
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

	${media.mobile} {
		display: none; /* Hide on mobile - use hamburger menu instead */
	}
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

const MobileMenuButton = styled(motion.button)`
	display: none;

	${media.mobile} {
		display: flex;
		align-items: center;
		justify-content: center;
		background: ${theme.colors.bg.tertiary};
		color: ${theme.colors.text.primary};
		border: 1px solid ${theme.colors.border.default};
		border-radius: ${theme.borderRadius.md};
		padding: ${theme.spacing[2]};
		width: 40px;
		height: 40px;
		font-size: ${theme.typography.fontSize.xl};
		cursor: pointer;
	}
`;

const MainContent = styled.main`
	max-width: 1600px;
	margin: 0 auto;
	padding: ${theme.spacing[8]};

	${media.tablet} {
		padding: ${theme.spacing[6]};
	}

	${media.mobile} {
		padding: ${theme.spacing[4]};
		padding-bottom: 80px; /* Space for mobile bottom nav */
	}
`;

const TwoColumnLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: ${theme.spacing[6]};

	${media.tablet} {
		grid-template-columns: 280px 1fr;
		gap: ${theme.spacing[4]};
	}

	${media.mobile} {
		grid-template-columns: 1fr;
		gap: ${theme.spacing[3]};
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

	${media.mobile} {
		max-width: 100vw;
		overflow-x: hidden;
	}
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

	/* Hide desktop tabs on mobile - use bottom nav instead */
	${media.mobile} {
		display: none;
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
	display: flex;
	align-items: center;
	gap: ${theme.spacing[2]};

	${media.hover} {
		&:hover {
			background: ${theme.colors.bg.tertiary};
			color: ${theme.colors.text.primary};
		}
	}

	${media.tablet} {
		padding: ${theme.spacing[3]} ${theme.spacing[4]};
		font-size: ${theme.typography.fontSize.sm};
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

const TabBadge = styled.span`
	background: ${theme.colors.accent.primary};
	color: ${theme.colors.text.inverse};
	border-radius: ${theme.borderRadius.full};
	padding: 2px 6px;
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: 1;
	min-width: 18px;
	text-align: center;
`;

const TabContent = styled(motion.div)`
	padding: ${theme.spacing[6]};
	overflow-x: hidden;
	max-width: 100%;

	${media.mobile} {
		padding: ${theme.spacing[4]};
	}
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
	| 'knowledge'
	| 'utility'
	| 'notes';

const CharacterSheetRedesign: React.FC<CharacterSheetRedesignProps> = ({ characterId, onBack }) => {
	logger.debug('ui', 'CharacterSheetRedesign render', { characterId });

	// Responsive breakpoint detection (mobile only, tablet treated as desktop)
	const breakpoint = useBreakpoint();
	const isMobile = breakpoint === 'mobile';

	const [activeTab, setActiveTab] = useState<TabId>('attacks');
	const [hamburgerDrawerOpen, setHamburgerDrawerOpen] = useState(false);
	const [autoRollConfig, setAutoRollConfig] = useState<{
		trigger: boolean;
		diceType: 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';
		bonus?: number;
		mode?: 'normal' | 'advantage' | 'disadvantage' | 'no-d20';
	}>({ trigger: false, diceType: 'd20' });
	const [selectedFeature, setSelectedFeature] = useState<FeatureData | null>(null);
	const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
	const [selectedInventoryItem, setSelectedInventoryItem] = useState<{
		inventoryData: InventoryItemData;
		item: InventoryItem | null;
	} | null>(null);
	const [tooltipState, setTooltipState] = useState<{
		visible: boolean;
		type:
			| 'hp'
			| 'mana'
			| 'stamina'
			| 'rest'
			| 'grit'
			| 'attack'
			| 'precisionAD'
			| 'areaAD'
			| 'precisionDR'
			| null;
		x: number;
		y: number;
	}>({ visible: false, type: null, x: 0, y: 0 });

	// Ref for dice roller auto-population
	const diceRollerRef = useRef<DiceRollerRef>(null);
	// Ref for tooltip delay timeout
	const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Handle skill/save clicks to auto-populate dice roller
	const handleSkillClick = (skillName: string, bonus: number) => {
		logger.debug('ui', 'Skill clicked for dice roller', { skillName, bonus, refExists: !!diceRollerRef.current });

		// Determine action type based on skill name
		let actionType:
			| 'attack'
			| 'physical-check'
			| 'mental-check'
			| 'physical-save'
			| 'mental-save'
			| 'agility-save'
			| null = null;

		if (skillName === 'Attack') {
			actionType = 'attack';
		} else if (['Acrobatics', 'Athletics', 'Sleight of Hand', 'Stealth'].includes(skillName)) {
			actionType = skillName === 'Acrobatics' ? 'agility-save' : 'physical-check';
		} else if (
			[
				'Deception',
				'History',
				'Insight',
				'Intimidation',
				'Investigation',
				'Persuasion',
				'Performance'
			].includes(skillName)
		) {
			actionType = 'mental-check';
		}

		// Check for active conditions that affect this action
		const activeConditions = state.character?.characterState?.activeConditions || [];
		if (actionType && activeConditions.length > 0) {
			const diceModifier = getDiceModifierForAction(activeConditions, actionType);

			if (diceModifier.mode !== 'normal') {
				logger.debug('ui', 'Applying condition-based dice modifier', diceModifier);
				// Set the roll mode before rolling
				diceRollerRef.current?.setRollMode(diceModifier.mode);
			}
		} else {
			// Reset to normal if no conditions apply
			diceRollerRef.current?.setRollMode('normal');
		}

		diceRollerRef.current?.addRollWithModifier(bonus, skillName);
	};

	// Use Provider hooks
	const {
		state,
		updateHP,
		updateMP,
		updateSP,
		updateTempHP,
		updateActionPoints,
		updateGritPoints,
		updateRestPoints,
		toggleActiveCondition,
		saveStatus,
		retryFailedSave
	} = useCharacterSheet();

	logger.debug('ui', 'CharacterSheet render', { saveStatus });

	const resources = useCharacterResources();
	const conditionStatuses = useCharacterConditions();
	const languages = useCharacterLanguages();
	const calculatedData = useCharacterCalculatedData();

	// Calculate active conditions count (must be before early returns - Rules of Hooks)
	const activeConditionsCount = React.useMemo(() => {
		if (!conditionStatuses) return 0;
		return conditionStatuses.filter((cs) => cs.interactions && cs.interactions.length > 0).length;
	}, [conditionStatuses]);

	// Cleanup tooltip timeout on unmount
	React.useEffect(() => {
		return () => {
			if (tooltipTimeoutRef.current) {
				clearTimeout(tooltipTimeoutRef.current);
			}
		};
	}, []);

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

	const openWeaponPopup = (weapon: Weapon) => {
		setSelectedWeapon(weapon);
	};

	const closeWeaponPopup = () => {
		setSelectedWeapon(null);
	};

	const openInventoryPopup = (inventoryData: InventoryItemData, item: InventoryItem | null) => {
		setSelectedInventoryItem({ inventoryData, item });
	};

	const closeInventoryPopup = () => {
		setSelectedInventoryItem(null);
	};

	const handleMouseEnter = (
		type:
			| 'hp'
			| 'mana'
			| 'stamina'
			| 'rest'
			| 'grit'
			| 'attack'
			| 'precisionAD'
			| 'areaAD'
			| 'precisionDR',
		e: React.MouseEvent
	) => {
		const rect = e.currentTarget.getBoundingClientRect();
		// Clear any existing timeout
		if (tooltipTimeoutRef.current) {
			clearTimeout(tooltipTimeoutRef.current);
		}
		// Set new timeout to show tooltip after 500ms
		tooltipTimeoutRef.current = setTimeout(() => {
			setTooltipState({
				visible: true,
				type,
				x: rect.left + rect.width / 2,
				y: rect.top
			});
		}, 500);
	};

	const handleMouseLeave = () => {
		// Clear timeout if user moves away before tooltip shows
		if (tooltipTimeoutRef.current) {
			clearTimeout(tooltipTimeoutRef.current);
			tooltipTimeoutRef.current = null;
		}
		setTooltipState({ visible: false, type: null, x: 0, y: 0 });
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

	const tabs: { id: TabId; label: string; emoji: string; badge?: number }[] = [
		{ id: 'attacks', label: 'Attacks', emoji: '⚔️' },
		{ id: 'spells', label: 'Spells', emoji: '📜' },
		{ id: 'inventory', label: 'Inventory', emoji: '🎒' },
		{ id: 'maneuvers', label: 'Maneuvers', emoji: '⚡' },
		{ id: 'features', label: 'Features', emoji: '✨' },
		{ id: 'conditions', label: 'Conditions', emoji: '🎭', badge: activeConditionsCount },
		{ id: 'knowledge', label: 'Knowledge', emoji: '📚' },
		{ id: 'utility', label: 'Utility', emoji: '🔧' },
		{ id: 'notes', label: 'Notes', emoji: '📝' }
	];

	// Primary tabs for mobile bottom navigation (4 tabs: character stats + 3 core actions)
	const mobileTabs: { id: string; label: string; emoji: string; badge?: number }[] = [
		{ id: 'character', label: 'Char', emoji: '👤' },
		{ id: 'attacks', label: 'Attack', emoji: '⚔️' },
		{ id: 'spells', label: 'Spell', emoji: '📜' },
		{ id: 'features', label: 'Feat', emoji: '✨' }
	];

	// Overflow tabs shown in hamburger menu on mobile (includes inventory)
	const hamburgerMenuItems: { id: string; label: string; emoji: string; badge?: number }[] = [
		{ id: 'inventory', label: 'Inventory', emoji: '🎒' },
		{ id: 'conditions', label: 'Conditions', emoji: '🎭', badge: activeConditionsCount },
		{ id: 'maneuvers', label: 'Maneuvers', emoji: '⚡' },
		{ id: 'knowledge', label: 'Knowledge', emoji: '📚' },
		{ id: 'utility', label: 'Utility', emoji: '🔧' },
		{ id: 'notes', label: 'Notes', emoji: '📝' }
	];

	// Export PDF handler - mirrors CharacterSheetClean behavior and exports current sheet state.
	const handleExportPdf = async () => {
		if (!characterData) return;

		try {
			const [pdf, calc, denormMod] = await Promise.all([
				import('../../lib/pdf/transformers'),
				import('../../lib/services/enhancedCharacterCalculator'),
				import('../../lib/services/denormalizeMastery')
			]);
			const { fillPdfFromData } = await import('../../lib/pdf/fillPdf');

			const buildData = calc.convertToEnhancedBuildData({
				...characterData,
				attribute_might: characterData.finalMight,
				attribute_agility: characterData.finalAgility,
				attribute_charisma: characterData.finalCharisma,
				attribute_intelligence: characterData.finalIntelligence,
				classId: characterData.classId,
				ancestry1Id: characterData.ancestry1Id,
				ancestry2Id: characterData.ancestry2Id,
				selectedTraitIds: characterData.selectedTraitIds || [],
				selectedTraitChoices: (characterData as any).selectedTraitChoices || {},
				featureChoices: characterData.selectedFeatureChoices || {},
				skillsData: characterData.skillsData || {},
				tradesData: characterData.tradesData || {},
				languagesData: characterData.languagesData || { common: { fluency: 'fluent' } }
			});
			const calcResult = calc.calculateCharacterWithBreakdowns(buildData);

			const denorm =
				characterData.masteryLadders &&
				characterData.skillTotals &&
				characterData.knowledgeTradeMastery &&
				characterData.languageMastery
					? ({
							masteryLadders: characterData.masteryLadders,
							skillTotals: (characterData as any).skillTotals,
							knowledgeTradeMastery: (characterData as any).knowledgeTradeMastery,
							languageMastery: (characterData as any).languageMastery
						} as any)
					: denormMod.denormalizeMastery({
							finalAttributes: {
								might: calcResult.stats.finalMight,
								agility: calcResult.stats.finalAgility,
								charisma: calcResult.stats.finalCharisma,
								intelligence: calcResult.stats.finalIntelligence,
								prime: calcResult.stats.finalPrimeModifierValue
							},
							skillsRanks: characterData.skillsData || {},
							tradesRanks: characterData.tradesData || {},
							languagesData: characterData.languagesData || { common: { fluency: 'fluent' } }
						});

			const pdfData = pdf.transformCalculatedCharacterToPdfData(calcResult, {
				saved: characterData,
				denorm
			});
			const blob = await fillPdfFromData(pdfData, { flatten: false, version: '0.10' });

			const safeName = (characterData.finalName || characterData.id || 'Character')
				.replace(/[^A-Za-z0-9]+/g, '_')
				.replace(/^_+|_+$/g, '')
				.slice(0, 60);
			const fileName = `${safeName}_vDC20-0.10.pdf`;

			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (err) {
			console.error('Export PDF failed', err);
			alert('Failed to export PDF: ' + (err instanceof Error ? err.message : String(err)));
		}
	};

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

					{/* Mobile hamburger menu - only visible on mobile */}
					<MobileMenuButton whileTap={{ scale: 0.95 }}>☰</MobileMenuButton>

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
						<ActionButton
							onClick={handleExportPdf}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							📄 Export PDF
						</ActionButton>
					</ActionButtons>
				</HeaderContent>
			</Header>

			<MainContent>
				{/* On mobile, show TwoColumnLayout ONLY when 'character' tab is active */}
				{/* On desktop, always show TwoColumnLayout with tabs inside */}
				{(!isMobile || activeTab === 'character') && (
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
									isMobile={isMobile}
									onSkillClick={handleSkillClick}
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
								activeConditions={state.character?.characterState?.activeConditions || []}
								onHPChange={updateHP}
								onTempHPChange={updateTempHP}
								onManaChange={updateMP}
								onStaminaChange={updateSP}
								onRestChange={updateRestPoints}
								onGritChange={updateGritPoints}
								onSkillClick={handleSkillClick}
								onHPMouseEnter={(e) => handleMouseEnter('hp', e)}
								onHPMouseLeave={handleMouseLeave}
								onManaMouseEnter={(e) => handleMouseEnter('mana', e)}
								onManaMouseLeave={handleMouseLeave}
								onStaminaMouseEnter={(e) => handleMouseEnter('stamina', e)}
								onStaminaMouseLeave={handleMouseLeave}
								onRestMouseEnter={(e) => handleMouseEnter('rest', e)}
								onRestMouseLeave={handleMouseLeave}
								onGritMouseEnter={(e) => handleMouseEnter('grit', e)}
								onGritMouseLeave={handleMouseLeave}
								onAttackMouseEnter={(e) => handleMouseEnter('attack', e)}
								onAttackMouseLeave={handleMouseLeave}
								onPrecisionADMouseEnter={(e) => handleMouseEnter('precisionAD', e)}
								onPrecisionADMouseLeave={handleMouseLeave}
								onAreaADMouseEnter={(e) => handleMouseEnter('areaAD', e)}
								onAreaADMouseLeave={handleMouseLeave}
								onPrecisionDRMouseEnter={(e) => handleMouseEnter('precisionDR', e)}
								onPrecisionDRMouseLeave={handleMouseLeave}
							/>

							{/* Tabs Section - Only visible on desktop */}
							{!isMobile && (
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
											{activeTab === 'attacks' && (
												<Attacks
													onAttackClick={(attack, weapon) => {
														if (weapon) {
															openWeaponPopup(weapon);
														}
													}}
												/>
											)}
											{activeTab === 'spells' && (
												<Spells
													onSpellClick={(spell) => {
														setAutoRollConfig({
															trigger: true,
															diceType: 'd20',
															mode: 'normal'
														});
														setTimeout(
															() => setAutoRollConfig({ trigger: false, diceType: 'd20' }),
															200
														);
													}}
												/>
											)}
											{activeTab === 'inventory' && <Inventory onItemClick={openInventoryPopup} />}
											{activeTab === 'maneuvers' && <Maneuvers onManeuverClick={() => {}} />}
											{activeTab === 'features' && <Features onFeatureClick={openFeaturePopup} />}
											{activeTab === 'conditions' && (
												<>
													<ActiveConditionsTracker
														activeConditions={
															state.character?.characterState?.activeConditions || []
														}
														onToggleCondition={toggleActiveCondition}
													/>
												</>
											)}
											{activeTab === 'knowledge' && (
												<>
													<SectionCard
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														$withMarginBottom
													>
														<KnowledgeTrades isMobile={isMobile} onSkillClick={handleSkillClick} />
													</SectionCard>
													<SectionCard initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
														<Languages languages={languages || []} isMobile={isMobile} />
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
							)}
						</RightColumn>
					</TwoColumnLayout>
				)}

				{/* Mobile Tab Content - Only visible when NOT on character tab */}
				{isMobile && activeTab !== 'character' && (
					<TabContainer>
						<AnimatePresence mode="wait">
							<TabContent
								key={activeTab}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.2 }}
							>
								{activeTab === 'attacks' && (
									<Attacks
										onAttackClick={(attack, weapon) => {
											if (weapon) {
												openWeaponPopup(weapon);
											}
										}}
									/>
								)}
								{activeTab === 'spells' && (
									<Spells
										onSpellClick={(spell) => {
											setAutoRollConfig({
												trigger: true,
												diceType: 'd20',
												mode: 'normal'
											});
											setTimeout(() => setAutoRollConfig({ trigger: false, diceType: 'd20' }), 200);
										}}
									/>
								)}
								{activeTab === 'inventory' && <Inventory onItemClick={openInventoryPopup} />}
								{activeTab === 'maneuvers' && <Maneuvers onManeuverClick={() => {}} />}
								{activeTab === 'features' && <Features onFeatureClick={openFeaturePopup} />}
								{activeTab === 'conditions' && (
									<ActiveConditionsTracker
										activeConditions={state.character?.characterState?.activeConditions || []}
										onToggleCondition={toggleActiveCondition}
									/>
								)}
								{activeTab === 'knowledge' && (
									<>
										<SectionCard
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											$withMarginBottom
										>
											<KnowledgeTrades isMobile={isMobile} onSkillClick={handleSkillClick} />
										</SectionCard>
										<SectionCard initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
											<Languages languages={languages || []} isMobile={isMobile} />
										</SectionCard>
									</>
								)}
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
				)}
			</MainContent>
			<WeaponPopup weapon={selectedWeapon} onClose={closeWeaponPopup} />
			<InventoryPopup selectedInventoryItem={selectedInventoryItem} onClose={closeInventoryPopup} />
			<CalculationTooltip
				title={
					tooltipState.type === 'hp'
						? 'Hit Points Calculation'
						: tooltipState.type === 'mana'
							? 'Mana Points Calculation'
							: tooltipState.type === 'stamina'
								? 'Stamina Points Calculation'
								: tooltipState.type === 'rest'
									? 'Rest Points Calculation'
									: tooltipState.type === 'grit'
										? 'Grit Points Calculation'
										: tooltipState.type === 'attack'
											? 'Attack/Spell Bonus Calculation'
											: tooltipState.type === 'precisionAD'
												? 'Precision AD Calculation'
												: tooltipState.type === 'areaAD'
													? 'Area AD Calculation'
													: 'Precision DR'
				}
				breakdown={
					tooltipState.type === 'hp'
						? calculatedData?.breakdowns?.hpMax
						: tooltipState.type === 'mana'
							? calculatedData?.breakdowns?.mpMax
							: tooltipState.type === 'stamina'
								? calculatedData?.breakdowns?.spMax
								: tooltipState.type === 'rest'
									? calculatedData?.breakdowns?.hpMax
									: tooltipState.type === 'grit'
										? calculatedData?.breakdowns?.gritPoints
										: tooltipState.type === 'attack'
											? {
													base: combatMastery,
													total: attackBonus,
													effects: [
														{
															name: `Prime Modifier (${primeAttribute})`,
															value: primeValue
														}
													]
												}
											: tooltipState.type === 'precisionAD'
												? calculatedData?.breakdowns?.pd
												: tooltipState.type === 'areaAD'
													? calculatedData?.breakdowns?.ad
													: {
															base: precisionDR,
															total: precisionDR,
															effects: []
														}
				}
				visible={tooltipState.visible}
				positionX={tooltipState.x}
				positionY={tooltipState.y}
			/>

			{/* Mobile Bottom Navigation - Only visible on mobile */}
			<MobileBottomNav
				tabs={mobileTabs}
				activeTab={activeTab}
				onTabChange={setActiveTab}
				onMoreClick={() => setHamburgerDrawerOpen(true)}
			/>

			{/* Hamburger Menu Drawer - Mobile only */}
			<HamburgerDrawer
				isOpen={hamburgerDrawerOpen}
				onClose={() => setHamburgerDrawerOpen(false)}
				items={hamburgerMenuItems}
				onItemClick={setActiveTab}
				activeItemId={activeTab}
			/>
		</PageContainer>
	);
};

export default CharacterSheetRedesign;

