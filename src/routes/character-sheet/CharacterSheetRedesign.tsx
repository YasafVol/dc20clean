import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Import styled components
import {
	PageContainer,
	Header,
	HeaderContent,
	CharacterIdentity,
	CharacterName,
	CharacterMeta,
	MetaItem,
	ActionButtons,
	ActionButton,
	BackButton,
	MobileMenuButton,
	MainContent,
	TwoColumnLayout,
	LeftColumn,
	RightColumn,
	TabContainer,
	TabNav,
	Tab,
	TabContent,
	SectionCard,
	SectionTitle,
	LoadingContainer,
	ErrorContainer
} from './CharacterSheetRedesign.styled';

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
import KnowledgeTrades from './components/KnowledgeTrades';
import Languages from './components/Languages';
import Attributes from './components/Attributes';
import MobileBottomNav from './components/shared/MobileBottomNav';
import HamburgerDrawer from './components/shared/HamburgerDrawer';
import Snackbar from '../../components/Snackbar';

// Import theme
import { logger } from '../../lib/utils/logger';

interface CharacterSheetRedesignProps {
	characterId: string;
	onBack?: () => void;
}

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
	const { t } = useTranslation();

	// Responsive breakpoint detection (mobile only, tablet treated as desktop)
	const breakpoint = useBreakpoint();
	const isMobile = breakpoint === 'mobile';

	const [activeTab, setActiveTab] = useState<TabId>('attacks');
	const [hamburgerDrawerOpen, setHamburgerDrawerOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarVariant, setSnackbarVariant] = useState<'success' | 'error' | 'info'>('success');
	const [showSnackbar, setShowSnackbar] = useState(false);
	const [snackbarKey, setSnackbarKey] = useState(0);
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

	// Helper to show snackbar with proper state reset
	const showSnackbarWithMessage = (message: string, variant: 'success' | 'error' | 'info') => {
		// Hide existing snackbar first to ensure clean slate
		setShowSnackbar(false);
		// Use setTimeout to ensure state updates complete before showing new message
		setTimeout(() => {
			setSnackbarMessage(message);
			setSnackbarVariant(variant);
			setSnackbarKey((prev) => prev + 1);
			setShowSnackbar(true);
		}, 50);
	};

	// Defense overrides - track manual modifications
	const [defenseOverrides, setDefenseOverrides] = useState<{
		precisionAD?: number;
		areaAD?: number;
		precisionDR?: number;
	}>({});

	// Handle skill/save clicks to auto-populate dice roller
	const handleSkillClick = (skillName: string, bonus: number) => {
		logger.debug('ui', 'Skill clicked for dice roller', {
			skillName,
			bonus,
			refExists: !!diceRollerRef.current
		});

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
		let rollMode: 'normal' | 'advantage' | 'disadvantage' | 'no-d20' = 'normal';

		if (actionType && activeConditions.length > 0) {
			const diceModifier = getDiceModifierForAction(activeConditions, actionType);
			rollMode = diceModifier.mode;
			logger.debug('ui', 'Applying condition-based dice modifier', { actionType, diceModifier });
		}

		// Always pass mode to addRollWithModifier to prevent race conditions and mode persistence
		diceRollerRef.current?.addRollWithModifier(bonus, skillName, rollMode);
	};

	// Use Provider hooks
	const {
		state,
		updateHP,
		updateMP,
		updateSP,
		updateTempHP,
		updateGritPoints,
		updateRestPoints,
		toggleActiveCondition,
		updateDefenseOverrides: updateDefenseOverridesContext,
		setRageActive,
		saveStatus,
		retryFailedSave,
		updateInventory
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

	// Load defense overrides from character state on mount
	React.useEffect(() => {
		if (state.character?.characterState?.defenseOverrides) {
			setDefenseOverrides(state.character.characterState.defenseOverrides);
		}
	}, [state.character?.id]); // Only re-run when character changes

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

	/** Update a custom freeform inventory item's description or cost from the popup */
	const handleUpdateCustomItem = (
		itemId: string,
		updates: Partial<Pick<InventoryItemData, 'description' | 'cost'>>
	) => {
		const inventory = state.character?.characterState?.inventory?.items || [];
		const updatedItems = inventory.map((item: InventoryItemData) =>
			item.id === itemId ? { ...item, ...updates } : item
		);
		updateInventory(updatedItems);
		// Also update the local popup state so it stays in sync
		setSelectedInventoryItem((prev) => {
			if (!prev || prev.inventoryData.id !== itemId) return prev;
			return { ...prev, inventoryData: { ...prev.inventoryData, ...updates } };
		});
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
					{t('characterSheet.loading')}
				</LoadingContainer>
			</PageContainer>
		);
	}

	if (error || !characterData) {
		return (
			<PageContainer>
				<ErrorContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
					{error || t('characterSheet.notFound')}
				</ErrorContainer>
			</PageContainer>
		);
	}

	// Extract character data
	const currentHP = resources?.current?.currentHP ?? 0;
	const maxHP = calculatedData?.breakdowns?.hpMax?.total ?? characterData.finalHPMax ?? 0;
	const tempHP = resources?.current?.tempHP ?? 0;
	const currentMP = resources?.current?.currentMP ?? 0;
	const maxMP = calculatedData?.breakdowns?.mpMax?.total ?? characterData.finalMPMax ?? 0;
	const currentSP = resources?.current?.currentSP ?? 0;
	const maxSP = calculatedData?.breakdowns?.spMax?.total ?? characterData.finalSPMax ?? 0;

	// Rest and Grit values
	const currentRest = resources?.current?.currentRestPoints ?? 0;
	const maxRest = calculatedData?.breakdowns?.restPoints?.total ?? characterData.finalRestPoints ?? 0;
	const currentGrit = resources?.current?.currentGritPoints ?? 0;
	const maxGrit = calculatedData?.breakdowns?.gritPoints?.total ?? characterData.finalGritPoints ?? 0;

	const primeAttribute = characterData.finalPrimeModifierAttribute || 'charisma';
	const primeValue = characterData.finalPrimeModifierValue || 0;
	const combatMastery = characterData.finalCombatMastery || 0;

	// Rage state (temporary in-combat toggle)
	const hasRageFeature =
		characterData.classId === 'barbarian' ||
		(characterData.unlockedFeatureIds || []).includes('barbarian_rage') ||
		String(characterData.selectedMulticlassFeature || '').toLowerCase() === 'rage';
	const isRaging = !!characterData.characterState?.ui?.combatToggles?.isRaging;

	// Get defenses and combat stats from character data (with manual overrides if set)
	const basePrecisionAD = characterData.finalPD ?? 10;
	const baseAreaAD = characterData.finalAD ?? 10;
	const basePrecisionDR = characterData.finalPDR ?? 0;
	const ragePdPenalty = hasRageFeature && isRaging ? 5 : 0;

	const precisionAD = Math.max(0, (defenseOverrides.precisionAD ?? basePrecisionAD) - ragePdPenalty);
	const precisionADHeavyThreshold = precisionAD + 5;
	const precisionADBrutalThreshold = precisionAD + 10;
	const areaAD = defenseOverrides.areaAD ?? baseAreaAD;
	const precisionDR = defenseOverrides.precisionDR ?? basePrecisionDR;

	// Combat stats - use manual calculation since breakdowns may be incorrect
	const attackBonus = (combatMastery ?? 0) + primeValue;
	const saveDC = 10 + (combatMastery ?? 0) + primeValue;
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
		{ id: 'attacks', label: t('characterSheet.tabAttacks'), emoji: '⚔️' },
		{ id: 'spells', label: t('characterSheet.tabSpells'), emoji: '📜' },
		{ id: 'inventory', label: t('characterSheet.tabInventory'), emoji: '🎒' },
		{ id: 'maneuvers', label: t('characterSheet.tabManeuvers'), emoji: '⚡' },
		{ id: 'features', label: t('characterSheet.tabFeatures'), emoji: '✨' },
		{ id: 'conditions', label: t('characterSheet.tabConditions'), emoji: '🎭', badge: activeConditionsCount },
		{ id: 'knowledge', label: t('characterSheet.tabKnowledge'), emoji: '📚' },
		{ id: 'utility', label: t('characterSheet.tabUtility'), emoji: '🔧' },
		{ id: 'notes', label: t('characterSheet.tabNotes'), emoji: '📝' }
	];

	// Primary tabs for mobile bottom navigation (4 tabs: character stats + 3 core actions)
	const mobileTabs: { id: string; label: string; emoji: string; badge?: number }[] = [
		{ id: 'character', label: t('characterSheet.mobileChar'), emoji: '👤' },
		{ id: 'attacks', label: t('characterSheet.mobileAttack'), emoji: '⚔️' },
		{ id: 'spells', label: t('characterSheet.mobileSpell'), emoji: '📜' },
		{ id: 'features', label: t('characterSheet.mobileFeat'), emoji: '✨' }
	];

	// Overflow tabs shown in hamburger menu on mobile (includes inventory)
	const hamburgerMenuItems: { id: string; label: string; emoji: string; badge?: number }[] = [
		{ id: 'inventory', label: t('characterSheet.tabInventory'), emoji: '🎒' },
		{ id: 'conditions', label: t('characterSheet.tabConditions'), emoji: '🎭', badge: activeConditionsCount },
		{ id: 'maneuvers', label: t('characterSheet.tabManeuvers'), emoji: '⚡' },
		{ id: 'knowledge', label: t('characterSheet.tabKnowledge'), emoji: '📚' },
		{ id: 'utility', label: t('characterSheet.tabUtility'), emoji: '🔧' },
		{ id: 'notes', label: t('characterSheet.tabNotes'), emoji: '📝' }
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
			setSnackbarMessage(
				'Failed to export PDF: ' + (err instanceof Error ? err.message : String(err))
			);
			setShowSnackbar(true);
		}
	};

	// Copy character summary to clipboard
	const copyCharacterToClipboard = async () => {
		if (!state.character) return;

		try {
			// Export full character as JSON for reimporting
			const characterJson = JSON.stringify(state.character, null, 2);
			await navigator.clipboard.writeText(characterJson);
			showSnackbarWithMessage('Character JSON copied to clipboard!', 'success');
		} catch (err) {
			logger.error('ui', 'Failed to copy to clipboard', {
				error: err instanceof Error ? err.message : String(err)
			});
			showSnackbarWithMessage('Failed to copy to clipboard', 'error');
		}
	};

	// Handle defense value updates
	const updateDefense = (type: 'precisionAD' | 'areaAD' | 'precisionDR', value: number) => {
		const newOverrides = { ...defenseOverrides, [type]: value };
		setDefenseOverrides(newOverrides);
		updateDefenseOverridesContext(newOverrides); // Persist to character state
	};

	// Check if Combat Stats box has any overrides that differ from base values
	const hasCombatStatsOverride =
		(defenseOverrides.precisionAD !== undefined &&
			defenseOverrides.precisionAD !== basePrecisionAD) ||
		(defenseOverrides.areaAD !== undefined && defenseOverrides.areaAD !== baseAreaAD) ||
		(defenseOverrides.precisionDR !== undefined &&
			defenseOverrides.precisionDR !== basePrecisionDR);

	// Reset Combat Stats to calculated values
	const resetCombatStats = () => {
		setDefenseOverrides({});
		updateDefenseOverridesContext({}); // Clear from character state
		showSnackbarWithMessage(t('characterSheet.combatStatsReset'), 'info');
	};

	// Other boxes don't have override tracking (HP/MP/SP/Rest/Grit are gameplay values)
	const hasHealthOverride = false;
	const hasResourcesOverride = false;
	const hasRecoveryOverride = false;

	// Get tooltip data based on type
	const getTooltipData = () => {
		switch (tooltipState.type) {
			case 'hp':
				return {
					title: t('characterSheet.tooltipHP'),
					breakdown: calculatedData?.breakdowns?.hpMax
				};
			case 'mana':
				return {
					title: t('characterSheet.tooltipMana'),
					breakdown: calculatedData?.breakdowns?.mpMax
				};
			case 'stamina':
				return {
					title: t('characterSheet.tooltipStamina'),
					breakdown: calculatedData?.breakdowns?.spMax
				};
			case 'rest':
				return {
					title: t('characterSheet.tooltipRest'),
					breakdown: calculatedData?.breakdowns?.restPoints
				};
			case 'grit':
				return {
					title: t('characterSheet.tooltipGrit'),
					breakdown: calculatedData?.breakdowns?.gritPoints
				};
			case 'attack':
				return {
					title: t('characterSheet.tooltipAttack'),
					breakdown: calculatedData?.breakdowns?.attackSpellCheck || {
						base: combatMastery,
						total: (combatMastery ?? 0) + primeValue,
						effects: [{ name: `Prime Modifier (${primeAttribute})`, value: primeValue }]
					}
				};
			case 'precisionAD':
				return {
					title: t('characterSheet.tooltipPrecisionAD'),
					breakdown: calculatedData?.breakdowns?.pd
				};
			case 'areaAD':
				return {
					title: t('characterSheet.tooltipAreaAD'),
					breakdown: calculatedData?.breakdowns?.ad
				};
			case 'precisionDR':
				return {
					title: t('characterSheet.tooltipPrecisionDR'),
					breakdown: calculatedData?.breakdowns?.pdr || {
						base: precisionDR,
						total: precisionDR,
						effects: []
					}
				};
			default:
				return { title: '', breakdown: null };
		}
	};

	const tooltipData = getTooltipData();

	return (
		<PageContainer>
			<Header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ type: 'spring', stiffness: 100 }}
			>
				<HeaderContent>
					<CharacterIdentity>
						<CharacterName>{characterData.finalName || t('characterSheet.unnamedCharacter')}</CharacterName>
						<CharacterMeta>
							<MetaItem>{characterData.finalPlayerName || t('characterSheet.player')}</MetaItem>
							<MetaItem>
								{t('characterSheet.level')} {characterData.level || 1} {characterData.className || t('characterSheet.adventurer')}
							</MetaItem>
							<MetaItem>
								{characterData.ancestry1Name || t('characterSheet.unknown')}{' '}
								{characterData.ancestry2Name ? `/ ${characterData.ancestry2Name}` : ''}
							</MetaItem>
						</CharacterMeta>
					</CharacterIdentity>

					{/* Mobile hamburger menu - only visible on mobile */}
					<MobileMenuButton whileTap={{ scale: 0.95 }}>☰</MobileMenuButton>

					<ActionButtons>
						{onBack && (
							<BackButton onClick={onBack} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								← {t('characterSheet.back')}
							</BackButton>
						)}
						<ActionButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							🔄 {t('characterSheet.revertAll')}
						</ActionButton>
						<ActionButton
							onClick={copyCharacterToClipboard}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							📋 {t('characterSheet.copy')}
						</ActionButton>
						<ActionButton
							onClick={handleExportPdf}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							📄 {t('characterSheet.exportPdf')}
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
								precisionADHeavyThreshold={precisionADHeavyThreshold}
								precisionADBrutalThreshold={precisionADBrutalThreshold}
								precisionDR={precisionDR}
								areaAD={areaAD}
								attackBonus={attackBonus}
								saveDC={saveDC}
								initiative={initiative}
								activeConditions={state.character?.characterState?.activeConditions || []}
								hasHealthOverride={hasHealthOverride}
								hasResourcesOverride={hasResourcesOverride}
								hasRecoveryOverride={hasRecoveryOverride}
								hasCombatStatsOverride={hasCombatStatsOverride}
								onHPChange={updateHP}
								onTempHPChange={updateTempHP}
								onManaChange={updateMP}
								onStaminaChange={updateSP}
								onRestChange={updateRestPoints}
								onGritChange={updateGritPoints}
								onPrecisionADChange={(value) => updateDefense('precisionAD', value)}
								onAreaADChange={(value) => updateDefense('areaAD', value)}
								onPrecisionDRChange={(value) => updateDefense('precisionDR', value)}
								onCombatStatsReset={resetCombatStats}
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
								showRageToggle={hasRageFeature}
								isRaging={isRaging}
								onRageToggle={setRageActive}
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
											{activeTab === 'spells' && <Spells onSpellClick={() => {}} />}
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
														<SectionTitle>{t('characterSheet.movement')}</SectionTitle>
														<Movement />
													</SectionCard>
													<SectionCard
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														$withMarginBottom
													>
														<SectionTitle>{t('characterSheet.currency')}</SectionTitle>
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
								{activeTab === 'spells' && <Spells onSpellClick={() => {}} />}
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
											<SectionTitle>{t('characterSheet.movement')}</SectionTitle>
											<Movement />
										</SectionCard>
										<SectionCard
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											$withMarginBottom
										>
											<SectionTitle>{t('characterSheet.currency')}</SectionTitle>
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
			<InventoryPopup
				selectedInventoryItem={selectedInventoryItem}
				onClose={closeInventoryPopup}
				onUpdateCustomItem={handleUpdateCustomItem}
			/>
			<CalculationTooltip
				title={tooltipData.title}
				breakdown={tooltipData.breakdown}
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

			{/* Dice Roller Component */}
			<DiceRoller ref={diceRollerRef} />

			{/* Auto-save Status Indicator */}
			<AutoSaveIndicator status={saveStatus} onRetry={retryFailedSave} />

			{/* Feature Details Popup */}
			<FeaturePopup feature={selectedFeature} onClose={closeFeaturePopup} />

			{/* Snackbar for notifications */}
			<Snackbar
				key={snackbarKey}
				message={snackbarMessage}
				isVisible={showSnackbar}
				onClose={() => setShowSnackbar(false)}
				duration={3000}
				variant={snackbarVariant}
			/>
		</PageContainer>
	);
};

export default CharacterSheetRedesign;
