import React, { useState, useEffect } from 'react';

// Import types
import type {
	CharacterSheetProps,
	CharacterSheetData,
	SkillData,
	TradeData,
	LanguageData,
	FeatureData,
	CurrentValues,
	AttackData,
	SpellData,
	InventoryItemData,
	CharacterState
} from '../../types';
import type { Spell } from '../../lib/rulesdata/spells-data/types/spell.types';
import type { Weapon } from '../../lib/rulesdata/inventoryItems';
import type { InventoryItem } from '../../lib/rulesdata/inventoryItems';
import {
	getVersatileDamage,
	getWeaponRange,
	getWeaponFeatures,
	parseDamage
} from '../../lib/utils/weaponUtils';

// Import new component modules
import LeftColumn from './components/LeftColumn';
import Currency from './components/Currency';
import Resources from './components/Resources';
import Defenses from './components/Defenses';
import Combat from './components/Combat';
import Attacks from './components/Attacks';
import Spells from './components/Spells';
import Inventory from './components/Inventory';
import Features from './components/Features';
import Movement from './components/Movement';
import RightColumnResources from './components/RightColumnResources';
import DeathExhaustion from './components/DeathExhaustion';
import PlayerNotes from './components/PlayerNotes';
import DiceRoller from './components/DiceRoller';

// Import character state management utilities
import {
	getCharacterState,
	initializeCharacterState,
	saveCharacterState,
	updateCharacterState,
	revertToOriginal,
	characterStateToCurrentValues
} from '../../lib/utils/characterState';

// Import defense notes utilities
import { clearDefenseNotesForField } from '../../lib/utils/defenseNotes';

// Import rules data
import { skillsData } from '../../lib/rulesdata/skills';
import { tradesData } from '../../lib/rulesdata/trades';
import { knowledgeData } from '../../lib/rulesdata/knowledge';
import { traitsData } from '../../lib/rulesdata/traits';
import {
	findClassByName,
	getClassSpecificInfo,
	getLegacyChoiceId,
	getDisplayLabel
} from '../../lib/rulesdata/loaders/class-features.loader';
import { ancestriesData } from '../../lib/rulesdata/ancestries';
import { getDetailedClassFeatureDescription } from '../../lib/utils/classFeatureDescriptions';

// Import styled components
import {
	StyledContainer,
	StyledBackButton,
	StyledCharacterSheet,
	StyledMainGrid,
	StyledLeftColumn,
	StyledMiddleColumn,
	StyledRightColumn,
	StyledMobileNav,
	StyledMobileNavButton,
	StyledActionButtons,
	StyledActionButton
} from './styles/Layout';

import { StyledHeader, StyledHeaderSection, StyledLabel, StyledValue } from './styles/Header';

import {
	StyledFeaturePopupOverlay,
	StyledFeaturePopupContent,
	StyledFeaturePopupHeader,
	StyledFeaturePopupTitle,
	StyledFeaturePopupClose,
	StyledFeaturePopupDescription,
	StyledFeaturePopupSourceInfo
} from './styles/FeaturePopup';

import { calculateDeathThreshold } from '../../lib/rulesdata/death';

// Character data service - fetches from localStorage and fixes missing/invalid calculations
const getCharacterData = async (characterId: string): Promise<CharacterSheetData> => {
	console.log('Loading character data for ID:', characterId);

	// Get characters from localStorage
	const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');

	// Find the character by ID
	const character = savedCharacters.find((char: any) => char.id === characterId);

	if (!character) {
		throw new Error(`Character with ID "${characterId}" not found in localStorage`);
	}

	// Fix missing or invalid prime modifier values
	const fixedCharacter = { ...character };
	
	// Recalculate prime modifier if missing or invalid
	if (!fixedCharacter.finalPrimeModifierValue || isNaN(fixedCharacter.finalPrimeModifierValue)) {
		const attributes = {
			might: fixedCharacter.finalMight || 0,
			agility: fixedCharacter.finalAgility || 0,
			charisma: fixedCharacter.finalCharisma || 0,
			intelligence: fixedCharacter.finalIntelligence || 0
		};
		
		const maxValue = Math.max(...Object.values(attributes));
		const primeAttribute = Object.keys(attributes).find(
			key => attributes[key as keyof typeof attributes] === maxValue
		) || 'might';
		
		fixedCharacter.finalPrimeModifierValue = maxValue;
		fixedCharacter.finalPrimeModifierAttribute = primeAttribute;
	}
	
	// Fix missing combat mastery
	if (!fixedCharacter.finalCombatMastery || isNaN(fixedCharacter.finalCombatMastery)) {
		fixedCharacter.finalCombatMastery = Math.ceil((fixedCharacter.finalLevel || 1) / 2);
	}

	// Return the fixed character data
	return {
		...fixedCharacter,
		selectedTraitIds: fixedCharacter.selectedTraitIds || fixedCharacter.selectedTraitsJson || '[]',
		selectedFeatureChoices: fixedCharacter.selectedFeatureChoices || '{}'
	};
};

// Save manual defense overrides to localStorage
const saveManualDefense = (
	characterId: string,
	field: 'manualPD' | 'manualPDR' | 'manualAD',
	value: number | undefined
) => {
	const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
	const characterIndex = savedCharacters.findIndex((char: any) => char.id === characterId);

	if (characterIndex !== -1) {
		// Update the character's manual defense value
		savedCharacters[characterIndex] = {
			...savedCharacters[characterIndex],
			[field]: value,
			lastModified: new Date().toISOString()
		};

		localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
		console.log(`Manual defense ${field} updated for character ${characterId}:`, value);
	}
};

const CharacterSheet: React.FC<CharacterSheetProps> = ({ characterId, onBack }) => {
	const [characterData, setCharacterData] = useState<CharacterSheetData | null>(null);
	const [characterState, setCharacterState] = useState<CharacterState | null>(null);
	// Keep currentValues for backwards compatibility with existing components
	const [currentValues, setCurrentValues] = useState<CurrentValues>({
		currentHP: 0,
		currentSP: 0,
		currentMP: 0,
		currentGritPoints: 0,
		currentRestPoints: 0,
		tempHP: 0,
		actionPointsUsed: 0,
		exhaustionLevel: 0,
		// Currency
		goldPieces: 0,
		silverPieces: 0,
		copperPieces: 0,
		electrumPieces: 0,
		platinumPieces: 0
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedFeature, setSelectedFeature] = useState<FeatureData | null>(null);
	const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
	const [selectedAttack, setSelectedAttack] = useState<{
		attack: AttackData;
		weapon: Weapon | null;
	} | null>(null);
	const [selectedInventoryItem, setSelectedInventoryItem] = useState<{
		inventoryData: InventoryItemData;
		item: InventoryItem | null;
	} | null>(null);
	const [attacks, setAttacks] = useState<AttackData[]>([]);
	const [spells, setSpells] = useState<SpellData[]>([]);
	const [inventory, setInventory] = useState<InventoryItemData[]>([]);

	// Mobile navigation state
	type MobileSection = 'character' | 'combat' | 'features' | 'info';
	const [activeMobileSection, setActiveMobileSection] = useState<MobileSection>('character');
	const [isMobile, setIsMobile] = useState(false);

	// Check if mobile resolution
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Save character current values back to localStorage using comprehensive state management
	const saveCharacterData = (characterId: string, currentValues: CurrentValues) => {
		updateCharacterState(characterId, {
			resources: {
				original: characterState?.resources.original || {
					maxHP: characterData?.finalHPMax || 0,
					maxSP: characterData?.finalSPMax || 0,
					maxMP: characterData?.finalMPMax || 0,
					maxGritPoints: characterData?.finalGritPoints || 0,
					maxRestPoints: characterData?.finalRestPoints || 0
				},
				current: {
					currentHP: currentValues.currentHP,
					currentSP: currentValues.currentSP,
					currentMP: currentValues.currentMP,
					currentGritPoints: currentValues.currentGritPoints,
					currentRestPoints: currentValues.currentRestPoints,
					tempHP: currentValues.tempHP,
					actionPointsUsed: currentValues.actionPointsUsed,
					exhaustionLevel: currentValues.exhaustionLevel
				}
			},
			currency: {
				original: characterState?.currency.original || {
					goldPieces: 0,
					silverPieces: 0,
					copperPieces: 0,
					electrumPieces: 0,
					platinumPieces: 0
				},
				current: {
					goldPieces: currentValues.goldPieces,
					silverPieces: currentValues.silverPieces,
					copperPieces: currentValues.copperPieces,
					electrumPieces: currentValues.electrumPieces,
					platinumPieces: currentValues.platinumPieces
				}
			}
		});
	};

	// Save attacks to comprehensive state
	const saveAttacksData = (newAttacks: AttackData[]) => {
		updateCharacterState(characterId, {
			attacks: {
				original: characterState?.attacks.original || [],
				current: newAttacks
			}
		});
	};

	// Save spells to comprehensive state
	const saveSpellsData = (newSpells: SpellData[]) => {
		updateCharacterState(characterId, {
			spells: {
				original: characterState?.spells.original || [],
				current: newSpells
			}
		});
	};

	// Save inventory to comprehensive state
	const saveInventoryData = (newInventory: InventoryItemData[]) => {
		updateCharacterState(characterId, {
			inventory: {
				original: characterState?.inventory.original || [],
				current: newInventory
			}
		});
	};

	// Wrapper for setAttacks that also saves to comprehensive state
	const updateAttacks = (newAttacks: AttackData[] | ((prev: AttackData[]) => AttackData[])) => {
		setAttacks((prev) => {
			const result = typeof newAttacks === 'function' ? newAttacks(prev) : newAttacks;
			saveAttacksData(result);
			return result;
		});
	};

	// Wrapper for setSpells that also saves to comprehensive state
	const updateSpells = (newSpells: SpellData[] | ((prev: SpellData[]) => SpellData[])) => {
		setSpells((prev) => {
			const result = typeof newSpells === 'function' ? newSpells(prev) : newSpells;
			saveSpellsData(result);
			return result;
		});
	};

	// Wrapper for setInventory that also saves to comprehensive state
	const updateInventory = (
		newInventory: InventoryItemData[] | ((prev: InventoryItemData[]) => InventoryItemData[])
	) => {
		setInventory((prev) => {
			const result = typeof newInventory === 'function' ? newInventory(prev) : newInventory;
			saveInventoryData(result);
			return result;
		});
	};

	// Load character data
	useEffect(() => {
		const loadCharacterData = async () => {
			try {
				setLoading(true);
				setError(null);

				// Load the character data from API
				const data = await getCharacterData(characterId);
				setCharacterData(data);

				// Get existing character state from localStorage
				const existingState = getCharacterState(characterId);

				// Initialize comprehensive character state
				const initialState = initializeCharacterState(data, existingState);
				setCharacterState(initialState);

				// Save the initial state to localStorage if it doesn't exist
				if (!existingState) {
					saveCharacterState(characterId, initialState);
					console.log('Initial character state saved to localStorage');
				}

				// Update component states from the comprehensive state
				const legacyCurrentValues = characterStateToCurrentValues(initialState);
				setCurrentValues(legacyCurrentValues);
				setAttacks(initialState.attacks?.current || []);
				setSpells(initialState.spells?.current || []);
				setInventory(initialState.inventory?.current || []);

				console.log('Character data and state loaded:', {
					characterData: data,
					characterState: initialState,
					legacyCurrentValues
				});
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
			} finally {
				setLoading(false);
			}
		};

		loadCharacterData();
	}, [characterId]);

	// Calculate original defense values using enhanced calculator for supported classes
	const getCalculatedDefenses = () => {
		if (!characterData)
			return {
				calculatedPD: 0,
				calculatedPDR: 0,
				calculatedAD: 0,
				pdBreakdown: '',
				adBreakdown: '',
				pdrBreakdown: ''
			};

		// For supported classes, try to use enhanced calculator for accurate breakdowns
		const supportedClasses = ['barbarian', 'cleric', 'hunter', 'champion', 'wizard', 'monk', 'rogue', 'sorcerer', 'spellblade', 'warlock', 'bard', 'druid', 'commander'];
		
		let calculatedPD, calculatedAD, calculatedPDR;
		let pdBreakdown, adBreakdown, pdrBreakdown;

		if (supportedClasses.includes(characterData.classId || '')) {
			try {
				// Try to recalculate using enhanced system for precise breakdown
				const mockBuildData = {
					id: characterData.id,
					finalName: characterData.finalName || '',
					level: characterData.finalLevel || 1,
					attribute_might: characterData.finalMight || 0,
					attribute_agility: characterData.finalAgility || 0,
					attribute_charisma: characterData.finalCharisma || 0,
					attribute_intelligence: characterData.finalIntelligence || 0,
					combatMastery: characterData.finalCombatMastery || 1,
					classId: characterData.classId || '',
					ancestry1Id: characterData.ancestry1Id,
					ancestry2Id: characterData.ancestry2Id,
					selectedTraitIds: JSON.parse(characterData.selectedTraitIds || '[]'),
					selectedTraitChoices: JSON.parse(characterData.selectedTraitChoices || '{}'),
					featureChoices: JSON.parse(characterData.selectedFeatureChoices || '{}'),
					skillsJson: characterData.skillsJson || '{}',
					tradesJson: characterData.tradesJson || '{}',
					languagesJson: characterData.languagesJson || '{}',
					lastModified: Date.now()
				};

				const { convertToEnhancedBuildData, calculateCharacterWithBreakdowns } = require('../../lib/services/enhancedCharacterCalculator');
				const enhancedData = convertToEnhancedBuildData(mockBuildData);
				const result = calculateCharacterWithBreakdowns(enhancedData);

				calculatedPD = result.stats.finalPD;
				calculatedAD = result.stats.finalAD;
				calculatedPDR = result.stats.finalPDR;

				// Get breakdowns from enhanced calculator
				pdBreakdown = result.breakdowns?.pd ? 
					result.breakdowns.pd.effects.map(e => `${e.value > 0 ? '+' : ''}${e.value} (${e.source})`).join(' ') + ` = ${calculatedPD}` :
					`8 (base) + ${characterData.finalCombatMastery} (Combat Mastery) + ${characterData.finalAgility} (Agility) + ${characterData.finalIntelligence} (Intelligence) = ${calculatedPD}`;

				adBreakdown = result.breakdowns?.ad ?
					result.breakdowns.ad.effects.map(e => `${e.value > 0 ? '+' : ''}${e.value} (${e.source})`).join(' ') + ` = ${calculatedAD}` :
					`8 (base) + ${characterData.finalCombatMastery} (Combat Mastery) + ${characterData.finalMight} (Might) + ${characterData.finalCharisma} (Charisma) = ${calculatedAD}`;

				pdrBreakdown = calculatedPDR > 0
					? `${calculatedPDR} (from equipped armor and class features)`
					: '0 (no PDR from current equipment/class)';

			} catch (error) {
				console.warn('Enhanced calculator failed, falling back to manual calculation:', error);
				// Fallback to manual calculation
				calculatedPD = 8 + characterData.finalCombatMastery + characterData.finalAgility + characterData.finalIntelligence;
				calculatedAD = 8 + characterData.finalCombatMastery + characterData.finalMight + characterData.finalCharisma;
				calculatedPDR = characterData.finalPDR;

				pdBreakdown = `8 (base) + ${characterData.finalCombatMastery} (Combat Mastery) + ${characterData.finalAgility} (Agility) + ${characterData.finalIntelligence} (Intelligence) = ${calculatedPD}`;
				adBreakdown = `8 (base) + ${characterData.finalCombatMastery} (Combat Mastery) + ${characterData.finalMight} (Might) + ${characterData.finalCharisma} (Charisma) = ${calculatedAD}`;
				pdrBreakdown = calculatedPDR > 0 ? `${calculatedPDR} (from equipped armor and class features)` : '0 (no PDR from current equipment/class)';
			}
		} else {
			// Fallback for non-migrated classes (shouldn't happen now)
			calculatedPD = 8 + characterData.finalCombatMastery + characterData.finalAgility + characterData.finalIntelligence;
			calculatedAD = 8 + characterData.finalCombatMastery + characterData.finalMight + characterData.finalCharisma;
			calculatedPDR = characterData.finalPDR;

			pdBreakdown = `8 (base) + ${characterData.finalCombatMastery} (Combat Mastery) + ${characterData.finalAgility} (Agility) + ${characterData.finalIntelligence} (Intelligence) = ${calculatedPD}`;
			adBreakdown = `8 (base) + ${characterData.finalCombatMastery} (Combat Mastery) + ${characterData.finalMight} (Might) + ${characterData.finalCharisma} (Charisma) = ${calculatedAD}`;
			pdrBreakdown = calculatedPDR > 0 ? `${calculatedPDR} (from equipped armor and class features)` : '0 (no PDR from current equipment/class)';
		}

		return {
			calculatedPD,
			calculatedPDR,
			calculatedAD,
			pdBreakdown,
			adBreakdown,
			pdrBreakdown
		};
	};

	// Resource management functions with auto-save
	const adjustResource = (resource: keyof CurrentValues, amount: number) => {
		setCurrentValues((prev) => {
			const newValue = prev[resource] + amount;
			let maxValue = 999;

			switch (resource) {
				case 'currentHP':
					// HP can go up to normal max + temp HP
					maxValue = (characterData?.finalHPMax || 0) + prev.tempHP;
					break;
				case 'currentSP':
					maxValue = characterData?.finalSPMax || 0;
					break;
				case 'currentMP':
					maxValue = characterData?.finalMPMax || 0;
					break;
				case 'currentGritPoints':
					maxValue = characterData?.finalGritPoints || 0;
					break;
				case 'currentRestPoints':
					maxValue = characterData?.finalRestPoints || 0;
					break;
				case 'actionPointsUsed':
					maxValue = 4; // Standard AP limit
					break;
				case 'exhaustionLevel':
					maxValue = 5; // Max exhaustion level
					break;
			}

			const newValues = {
				...prev,
				[resource]: Math.max(0, Math.min(newValue, maxValue))
			};

			// Special case: when reducing temp HP, cap current HP to new effective max
			if (resource === 'tempHP' && amount < 0) {
				const newEffectiveMaxHP = (characterData?.finalHPMax || 0) + newValues.tempHP;
				if (prev.currentHP > newEffectiveMaxHP) {
					newValues.currentHP = newEffectiveMaxHP;
				}
			}

			// Save to localStorage after state update
			if (characterData?.id) {
				setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
			}

			return newValues;
		});
	};

	const handleResourceInputChange = (resource: keyof CurrentValues, value: string) => {
		const numValue = parseInt(value) || 0;
		let maxValue = 999;

		switch (resource) {
			case 'currentHP':
				// HP can go up to normal max + temp HP
				maxValue = (characterData?.finalHPMax || 0) + currentValues.tempHP;
				break;
			case 'currentSP':
				maxValue = characterData?.finalSPMax || 0;
				break;
			case 'currentMP':
				maxValue = characterData?.finalMPMax || 0;
				break;
			case 'currentGritPoints':
				maxValue = characterData?.finalGritPoints || 0;
				break;
			case 'currentRestPoints':
				maxValue = characterData?.finalRestPoints || 0;
				break;
			case 'actionPointsUsed':
				maxValue = 4;
				break;
			case 'exhaustionLevel':
				maxValue = 5;
				break;
		}

		setCurrentValues((prev) => {
			const newValues = {
				...prev,
				[resource]: Math.max(0, Math.min(numValue, maxValue))
			};

			// Special case: when changing temp HP directly, cap current HP to new effective max
			if (resource === 'tempHP') {
				const newEffectiveMaxHP = (characterData?.finalHPMax || 0) + newValues.tempHP;
				if (prev.currentHP > newEffectiveMaxHP) {
					newValues.currentHP = newEffectiveMaxHP;
				}
			}

			// Save to localStorage after state update
			if (characterData?.id) {
				setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
			}

			return newValues;
		});
	};

	const handleManualDefenseChange = (
		field: 'manualPD' | 'manualPDR' | 'manualAD',
		value: number | undefined
	) => {
		if (!characterData?.id) return;

		// Save to localStorage
		saveManualDefense(characterData.id, field, value);

		// Update local character data
		setCharacterData((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				[field]: value
			};
		});
	};

	// Parse skills data from character - show ALL skills with their proficiency levels and calculated bonuses
	const getSkillsData = (): SkillData[] => {
		// Parse character's skill proficiencies (if any)
		let characterSkills: Record<string, number> = {};
		if (characterData?.skillsJson) {
			try {
				characterSkills = JSON.parse(characterData.skillsJson);
			} catch (error) {
				console.error('Error parsing skills JSON:', error);
			}
		}

		// Create skill data for ALL skills from rules data, merging with character's proficiencies
		return skillsData.map((skill) => {
			const proficiency = characterSkills[skill.id] || 0;
			const masteryBonus = proficiency * 2;
			
			// Get attribute modifier based on skill's attribute association
			let attributeModifier = 0;
			switch (skill.attributeAssociation.toLowerCase()) {
				case 'might':
					attributeModifier = characterData?.finalMight || 0;
					break;
				case 'agility':
					attributeModifier = characterData?.finalAgility || 0;
					break;
				case 'charisma':
					attributeModifier = characterData?.finalCharisma || 0;
					break;
				case 'intelligence':
					attributeModifier = characterData?.finalIntelligence || 0;
					break;
				case 'prime':
					// For prime skills, use the prime modifier value
					attributeModifier = characterData?.finalPrimeModifierValue || 0;
					break;
				default:
					attributeModifier = 0;
			}
			
			const totalBonus = attributeModifier + masteryBonus;
			
			return {
				id: skill.id,
				name: skill.name,
				attribute: skill.attributeAssociation,
				proficiency,
				bonus: totalBonus
			};
		});
	};

	// Parse trades data from character - show ONLY selected trades with their proficiency levels and calculated bonuses
	const getTradesData = (): TradeData[] => {
		// Parse character's trade proficiencies (if any)
		let characterTrades: Record<string, number> = {};
		if (characterData?.tradesJson) {
			try {
				characterTrades = JSON.parse(characterData.tradesJson);
			} catch (error) {
				console.error('Error parsing trades JSON:', error);
			}
		}

		// Only show trades that have been selected (proficiency > 0) from tradesData only
		return tradesData
			.filter((trade) => characterTrades[trade.id] && characterTrades[trade.id] > 0)
			.map((trade) => {
				const proficiency = characterTrades[trade.id] || 0;
				const masteryBonus = proficiency * 2;
				
				// Get attribute modifier based on trade's attribute association
				let attributeModifier = 0;
				switch (trade.attributeAssociation.toLowerCase()) {
					case 'might':
						attributeModifier = characterData?.finalMight || 0;
						break;
					case 'agility':
						attributeModifier = characterData?.finalAgility || 0;
						break;
					case 'charisma':
						attributeModifier = characterData?.finalCharisma || 0;
						break;
					case 'intelligence':
						attributeModifier = characterData?.finalIntelligence || 0;
						break;
					default:
						attributeModifier = 0;
				}
				
				const totalBonus = attributeModifier + masteryBonus;
				
				return {
					id: trade.id,
					name: trade.name,
					proficiency,
					bonus: totalBonus
				};
			});
	};

	// Parse knowledge data from character - show ALL knowledge with their proficiency levels and calculated bonuses
	const getKnowledgeData = (): TradeData[] => {
		// Parse character's trade proficiencies (if any) - knowledge is stored in tradesJson
		let characterTrades: Record<string, number> = {};
		if (characterData?.tradesJson) {
			try {
				characterTrades = JSON.parse(characterData.tradesJson);
			} catch (error) {
				console.error('Error parsing trades JSON:', error);
			}
		}

		// Show ALL knowledge skills with their proficiency levels and calculated bonuses
		return knowledgeData.map((knowledge) => {
			const proficiency = characterTrades[knowledge.id] || 0;
			const masteryBonus = proficiency * 2;
			
			// Get attribute modifier based on knowledge's attribute association
			let attributeModifier = 0;
			switch (knowledge.attributeAssociation.toLowerCase()) {
				case 'might':
					attributeModifier = characterData?.finalMight || 0;
					break;
				case 'agility':
					attributeModifier = characterData?.finalAgility || 0;
					break;
				case 'charisma':
					attributeModifier = characterData?.finalCharisma || 0;
					break;
				case 'intelligence':
					attributeModifier = characterData?.finalIntelligence || 0;
					break;
				default:
					attributeModifier = 0;
			}
			
			const totalBonus = attributeModifier + masteryBonus;
			
			return {
				id: knowledge.id,
				name: knowledge.name,
				proficiency,
				bonus: totalBonus
			};
		});
	};

	// Parse languages data from character
	const getLanguagesData = (): LanguageData[] => {
		if (!characterData?.languagesJson) {
			return [];
		}

		try {
			const languagesFromDB = JSON.parse(characterData.languagesJson);

			return Object.entries(languagesFromDB)
				.filter(([_, data]: [string, any]) => data.fluency !== 'none')
				.map(([langId, data]: [string, any]) => ({
					id: langId,
					name: data.name || langId.charAt(0).toUpperCase() + langId.slice(1),
					fluency: data.fluency as 'limited' | 'fluent'
				}));
		} catch (error) {
			console.error('Error parsing languages JSON:', error);
			return [];
		}
	};

	// Get class-specific display information generically
	const getClassDisplayInfo = (): { label: string; value: string }[] => {
		if (!characterData?.className || !characterData?.selectedFeatureChoices) {
			return [];
		}

		const { displayInfo } = getClassSpecificInfo(
			characterData.className,
			characterData.selectedFeatureChoices
		);
		return displayInfo;
	};

	// Get all features (traits and class features) for the character
	const getFeaturesData = (): FeatureData[] => {
		if (!characterData) return [];

		const features: FeatureData[] = [];

		// Get ancestry default traits
		const ancestry1 = ancestriesData.find((a) => a.name === characterData.ancestry1Name);
		if (ancestry1) {
			ancestry1.defaultTraitIds?.forEach((traitId) => {
				const trait = traitsData.find((t) => t.id === traitId);
				if (trait) {
					features.push({
						id: trait.id,
						name: trait.name,
						description: trait.description,
						source: 'ancestry',
						sourceDetail: `${ancestry1.name} (Default)`
					});
				}
			});
		}

		// Get selected ancestry traits
		if (characterData.selectedTraitIds) {
			try {
				const selectedTraitIds: string[] = JSON.parse(characterData.selectedTraitIds);
				selectedTraitIds.forEach((traitId) => {
					const trait = traitsData.find((t) => t.id === traitId);
					if (trait) {
						// Check if this trait is not already added as default
						const alreadyAdded = features.some((f) => f.id === trait.id);
						if (!alreadyAdded) {
							const sourceAncestry = ancestriesData.find(
								(a) => a.expandedTraitIds.includes(traitId) || a.defaultTraitIds?.includes(traitId)
							);
							features.push({
								id: trait.id,
								name: trait.name,
								description: trait.description,
								source: 'ancestry',
								sourceDetail: `${sourceAncestry?.name || 'Unknown'} (Selected)`
							});
						}
					}
				});
			} catch (error) {
				console.error('Error parsing selected traits JSON:', error);
			}
		}

		// Get class features from the new class features structure
		const selectedClassFeatures = findClassByName(characterData.className);

		if (selectedClassFeatures) {
			// Add level 1 core features
			selectedClassFeatures.coreFeatures
				.filter((feature) => feature.levelGained === 1)
				.forEach((feature) => {
					features.push({
						id: feature.featureName,
						name: feature.featureName,
						description: feature.description,
						source: 'class',
						sourceDetail: `${selectedClassFeatures.className} (Lvl 1)`
					});
				});

			// Add selected feature choices
			if (characterData.selectedFeatureChoices) {
				try {
					const selectedChoices: { [key: string]: string } = JSON.parse(
						characterData.selectedFeatureChoices
					);

					// Process each core feature that has choices
					selectedClassFeatures.coreFeatures.forEach((feature) => {
						if (feature.choices) {
							feature.choices.forEach((choice, choiceIndex) => {
								// Use the same mapping logic as the class-features loader
								const choiceId = getLegacyChoiceId(
									selectedClassFeatures.className,
									feature.featureName,
									choiceIndex
								);
								const selectedOptionValues = selectedChoices[choiceId];

								if (selectedOptionValues && choice.options) {
									if (choice.count > 1) {
										// Handle multiple selections (like cleric domains)
										const selectedValueArray: string[] = JSON.parse(selectedOptionValues);

										selectedValueArray.forEach((value) => {
											const selectedOption = choice.options?.find((opt) => opt.name === value);

											if (selectedOption) {
												// Get the detailed description
												let description = selectedOption.description || 'Feature choice selected.';
												const detailedDescription = getDetailedClassFeatureDescription(
													choiceId,
													value
												);
												if (detailedDescription) {
													description = detailedDescription;
												}

												// Use generic display label
												const displayLabel = getDisplayLabel(
													selectedClassFeatures.className,
													feature.featureName,
													choiceIndex
												);
												const sourceDetail = `${selectedClassFeatures.className} (${displayLabel})`;

												const featureToAdd = {
													id: `${choiceId}_${value}`,
													name: selectedOption.name,
													description: description,
													source: 'choice' as const,
													sourceDetail: sourceDetail
												};
												features.push(featureToAdd);
											}
										});
									} else {
										// Handle single selections
										const selectedOption = choice.options?.find(
											(opt) => opt.name === selectedOptionValues
										);
										if (selectedOption) {
											// Get the detailed description
											let description = selectedOption.description || 'Feature choice selected.';
											const detailedDescription = getDetailedClassFeatureDescription(
												choiceId,
												selectedOptionValues
											);
											if (detailedDescription) {
												description = detailedDescription;
											}

											// Use generic display label
											const displayLabel = getDisplayLabel(
												selectedClassFeatures.className,
												feature.featureName,
												choiceIndex
											);
											const sourceDetail = `${selectedClassFeatures.className} (${displayLabel})`;

											features.push({
												id: `${choiceId}_${selectedOptionValues}`,
												name: selectedOption.name,
												description: description,
												source: 'choice',
												sourceDetail: sourceDetail
											});
										}
									}
								}
							});
						}
					});
				} catch (error) {
					console.error('Error parsing selected feature choices JSON:', error);
				}
			}
		}

		return features;
	};

	// Handle feature popup
	const openFeaturePopup = (feature: FeatureData) => {
		setSelectedFeature(feature);
	};

	const closeFeaturePopup = () => {
		setSelectedFeature(null);
	};

	// Handle spell popup
	const openSpellPopup = (spell: Spell) => {
		setSelectedSpell(spell);
	};

	const closeSpellPopup = () => {
		setSelectedSpell(null);
	};

	// Handle attack popup
	const openAttackPopup = (attack: AttackData, weapon: Weapon | null) => {
		setSelectedAttack({ attack, weapon });
	};

	const closeAttackPopup = () => {
		setSelectedAttack(null);
	};

	// Handle inventory popup
	const openInventoryPopup = (inventoryData: InventoryItemData, item: InventoryItem | null) => {
		setSelectedInventoryItem({ inventoryData, item });
	};

	const closeInventoryPopup = () => {
		setSelectedInventoryItem(null);
	};

	// Currency management function
	const handleCurrencyChange = (currency: string, value: number) => {
		setCurrentValues((prev) => {
			const newValues = {
				...prev,
				[currency]: value
			};

			// Save to localStorage after state update
			if (characterData?.id) {
				setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
			}

			return newValues;
		});
	};

	// Handle exhaustion level changes
	const handleExhaustionChange = (level: number) => {
		setCurrentValues((prev) => {
			const newLevel = prev.exhaustionLevel === level ? level - 1 : level;
			const newValues = {
				...prev,
				exhaustionLevel: Math.max(0, Math.min(5, newLevel))
			};

			// Save to localStorage after state update
			if (characterData?.id) {
				setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
			}

			return newValues;
		});
	};

	// Handle death step changes
	const handleDeathStepChange = (step: number) => {
		if (!characterData) return;

		const deathThreshold = calculateDeathThreshold(
			characterData.finalPrimeModifierValue,
			characterData.finalCombatMastery
		);
		const targetHP = -step;

		// Don't allow going below death threshold
		if (targetHP < deathThreshold) {
			setCurrentValues((prev) => {
				const newValues = { ...prev, currentHP: deathThreshold };
				// Save to localStorage after state update
				if (characterData?.id) {
					setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
				}
				return newValues;
			});
		} else {
			setCurrentValues((prev) => {
				const newValues = { ...prev, currentHP: targetHP };
				// Save to localStorage after state update
				if (characterData?.id) {
					setTimeout(() => saveCharacterData(characterData.id, newValues), 0);
				}
				return newValues;
			});
		}
	};

	// Helper function to safely calculate fill percentage
	const getFillPercentage = (current: number, max: number): number => {
		if (max === 0) return 0;
		return Math.max(0, Math.min(100, (current / max) * 100));
	};

	// Copy character data to clipboard
	// Revert character data to original values
	const handleRevertToOriginal = (
		dataType: 'resources' | 'currency' | 'attacks' | 'spells' | 'inventory' | 'all'
	) => {
		if (dataType === 'all') {
			// Revert all data types
			revertToOriginal(characterId, 'resources');
			revertToOriginal(characterId, 'currency');
			revertToOriginal(characterId, 'attacks');
			revertToOriginal(characterId, 'spells');
			revertToOriginal(characterId, 'inventory');

			// Also clear all manual defense overrides (PDR, PD, AD)
			clearDefenseNotesForField(characterId, 'manualPD');
			clearDefenseNotesForField(characterId, 'manualPDR');
			clearDefenseNotesForField(characterId, 'manualAD');

			// Clear the manual defense values in localStorage
			saveManualDefense(characterId, 'manualPD', undefined);
			saveManualDefense(characterId, 'manualPDR', undefined);
			saveManualDefense(characterId, 'manualAD', undefined);

			// Reload the page to reflect changes
			window.location.reload();
		} else {
			revertToOriginal(characterId, dataType);

			// Update local state based on what was reverted
			if (dataType === 'resources') {
				setCurrentValues((prev) => ({
					...prev,
					currentHP: characterData?.finalHPMax || 0,
					currentSP: characterData?.finalSPMax || 0,
					currentMP: characterData?.finalMPMax || 0,
					currentGritPoints: characterData?.finalGritPoints || 0,
					currentRestPoints: characterData?.finalRestPoints || 0,
					tempHP: 0,
					actionPointsUsed: 0,
					exhaustionLevel: 0
				}));
			} else if (dataType === 'currency') {
				setCurrentValues((prev) => ({
					...prev,
					goldPieces: 0,
					silverPieces: 0,
					copperPieces: 0,
					electrumPieces: 0,
					platinumPieces: 0
				}));
			} else if (dataType === 'attacks') {
				// Reset to default attacks
				const defaultAttacks: AttackData[] = [
					{
						id: '1',
						weaponId: '',
						name: '',
						attackBonus: 0,
						damage: '',
						damageType: '',
						critRange: '',
						critDamage: '',
						brutalDamage: '',
						heavyHitEffect: ''
					},
					{
						id: '2',
						weaponId: '',
						name: '',
						attackBonus: 0,
						damage: '',
						damageType: '',
						critRange: '',
						critDamage: '',
						brutalDamage: '',
						heavyHitEffect: ''
					},
					{
						id: '3',
						weaponId: '',
						name: '',
						attackBonus: 0,
						damage: '',
						damageType: '',
						critRange: '',
						critDamage: '',
						brutalDamage: '',
						heavyHitEffect: ''
					}
				];
				setAttacks(defaultAttacks);
			} else if (dataType === 'spells') {
				setSpells([]);
			} else if (dataType === 'inventory') {
				setInventory([]);
			}
		}
	};

	const copyCharacterToClipboard = async () => {
		try {
			if (!characterData) {
				alert('Character data not found');
				return;
			}

			const character = getCharacterFromStorage(characterData.id);
			if (!character) {
				alert('Character data not found in storage');
				return;
			}

			const characterBackup = {
				...character,
				exportedAt: new Date().toISOString(),
				exportVersion: '1.0'
			};

			const jsonString = JSON.stringify(characterBackup, null, 2);
			await navigator.clipboard.writeText(jsonString);

			// Show success message
			alert('Character data copied to clipboard! You can save this as a backup.');
		} catch (error) {
			console.error('Failed to copy character data:', error);
			alert('Failed to copy character data to clipboard');
		}
	};

	// Helper function to get character from localStorage
	const getCharacterFromStorage = (characterId: string) => {
		const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
		return savedCharacters.find((char: any) => char.id === characterId);
	};

	// Helper function for HP fill percentage (shows current HP vs total effective HP)
	const getHPFillPercentage = (currentHP: number, maxHP: number, tempHP: number): number => {
		const totalEffectiveHP = maxHP + tempHP;
		if (totalEffectiveHP === 0) return 0;
		return Math.max(0, (currentHP / totalEffectiveHP) * 100);
	};

	// Group skills by attribute like in the official sheet
	const getSkillsByAttribute = () => {
		const skills = getSkillsData();
		return {
			might: skills.filter((skill) => skill.attribute === 'might'),
			agility: skills.filter((skill) => skill.attribute === 'agility'),
			charisma: skills.filter((skill) => skill.attribute === 'charisma'),
			intelligence: skills.filter((skill) => skill.attribute === 'intelligence'),
			prime: skills.filter((skill) => skill.attribute === 'prime')
		};
	};

	// Get data from character or empty defaults if no character data
	const trades = characterData ? getTradesData() : [];
	const knowledge = characterData ? getKnowledgeData() : [];
	const languages = characterData ? getLanguagesData() : [];
	const features = characterData ? getFeaturesData() : [];
	const skillsByAttribute = characterData
		? getSkillsByAttribute()
		: { might: [], agility: [], charisma: [], intelligence: [], prime: [] };

	if (loading) {
		return (
			<StyledContainer>
				<div style={{ textAlign: 'center', padding: '4rem' }}>
					<h2>Loading character sheet...</h2>
				</div>
			</StyledContainer>
		);
	}

	if (error || !characterData) {
		return (
			<StyledContainer>
				<div style={{ textAlign: 'center', padding: '4rem' }}>
					<h2>Error loading character sheet</h2>
					<p>{error}</p>
					<StyledBackButton onClick={onBack}>← Back</StyledBackButton>
				</div>
			</StyledContainer>
		);
	}

	return (
		<StyledContainer style={{ position: 'relative' }}>
			{/* Action Buttons - Hidden on mobile */}
			<StyledActionButtons>
				<StyledActionButton
					$variant="danger"
					onClick={() => handleRevertToOriginal('all')}
					title="Revert all modifications back to calculated defaults"
				>
					🔄 Revert All
				</StyledActionButton>
				<StyledActionButton
					onClick={copyCharacterToClipboard}
					title="Copy character data to clipboard for backup"
				>
					📋 Copy to Clipboard
				</StyledActionButton>
			</StyledActionButtons>

			<StyledBackButton onClick={onBack}>← Back to Menu</StyledBackButton>

			<StyledCharacterSheet>
				{/* Header Section */}
				<StyledHeader>
					<StyledHeaderSection>
						<StyledLabel>Player Name</StyledLabel>
						<StyledValue>{characterData.finalPlayerName || 'Unknown'}</StyledValue>
						<StyledLabel style={{ marginTop: '0.5rem' }}>Character Name</StyledLabel>
						<StyledValue>{characterData.finalName}</StyledValue>
					</StyledHeaderSection>

					<StyledHeaderSection>
						<StyledLabel>Class & Subclass</StyledLabel>
						<StyledValue>{characterData.className}</StyledValue>
						{(() => {
							const classDisplayInfo = getClassDisplayInfo();
							return classDisplayInfo.map((info, index) => (
								<div key={index}>
									<StyledLabel style={{ marginTop: '0.25rem', fontSize: '0.8rem' }}>
										{info.label}
									</StyledLabel>
									<StyledValue style={{ fontSize: '0.9rem' }}>{info.value}</StyledValue>
								</div>
							));
						})()}
						<StyledLabel style={{ marginTop: '0.5rem' }}>Ancestry & Background</StyledLabel>
						<StyledValue>{characterData.ancestry1Name || 'Unknown'}</StyledValue>
					</StyledHeaderSection>

					<StyledHeaderSection>
						<StyledLabel>Level</StyledLabel>
						<StyledValue>{characterData.finalLevel}</StyledValue>
						<StyledLabel style={{ marginTop: '0.5rem' }}>Combat Mastery</StyledLabel>
						<StyledValue>+{characterData.finalCombatMastery}</StyledValue>
					</StyledHeaderSection>

					<div style={{ textAlign: 'center', alignSelf: 'center' }}>
						<div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>DC20</div>
					</div>
				</StyledHeader>

				{/* Mobile Navigation - Only show on mobile */}
				{isMobile && (
					<StyledMobileNav>
						<StyledMobileNavButton
							$isActive={activeMobileSection === 'character'}
							onClick={() => setActiveMobileSection('character')}
						>
							🎯 Skills
						</StyledMobileNavButton>
						<StyledMobileNavButton
							$isActive={activeMobileSection === 'combat'}
							onClick={() => setActiveMobileSection('combat')}
						>
							⚔️ Combat
						</StyledMobileNavButton>
						<StyledMobileNavButton
							$isActive={activeMobileSection === 'features'}
							onClick={() => setActiveMobileSection('features')}
						>
							🎒 Items
						</StyledMobileNavButton>
						<StyledMobileNavButton
							$isActive={activeMobileSection === 'info'}
							onClick={() => setActiveMobileSection('info')}
						>
							ℹ️ Info
						</StyledMobileNavButton>
					</StyledMobileNav>
				)}

				{/* Desktop Layout - Only show on desktop */}
				{!isMobile && (
					<StyledMainGrid>
						{/* Left Column - Attributes with Skills */}
						<StyledLeftColumn>
							<LeftColumn
								characterData={characterData}
								skillsByAttribute={skillsByAttribute}
								knowledge={knowledge}
								trades={trades}
								languages={languages}
							/>
						</StyledLeftColumn>

						{/* Middle Column - Resources, Combat, and Core Stats */}
						<StyledMiddleColumn>
							{/* Resources Section - Circular design like official sheet */}
							<Resources
								characterData={characterData}
								currentValues={currentValues}
								onAdjustResource={adjustResource}
								onResourceInputChange={handleResourceInputChange}
								getFillPercentage={getFillPercentage}
								getHPFillPercentage={getHPFillPercentage}
								isMobile={false}
							/>

							{/* Defenses - Shield-like design */}
							<Defenses
								characterData={{
									...characterData,
									manualPD: characterData?.manualPD,
									manualPDR: characterData?.manualPDR,
									manualAD: characterData?.manualAD
								}}
								calculatedDefenses={getCalculatedDefenses()}
								onUpdateManualDefense={handleManualDefenseChange}
								isMobile={false}
							/>

							{/* Combat Section */}
							<Combat
								characterData={characterData}
								currentValues={currentValues}
								setCurrentValues={setCurrentValues}
							/>

							{/* Death & Exhaustion */}
							<DeathExhaustion
								characterData={characterData}
								currentValues={currentValues}
								onExhaustionChange={handleExhaustionChange}
								onDeathStepChange={handleDeathStepChange}
							/>

							{/* Spells Section */}
							<Spells
								spells={spells}
								setSpells={updateSpells}
								characterData={characterData}
								onSpellClick={openSpellPopup}
							/>

							{/* Attacks Section */}
							<Attacks
								attacks={attacks}
								setAttacks={updateAttacks}
								characterData={characterData}
								onAttackClick={openAttackPopup}
							/>

							{/* Inventory */}
							<Inventory
								inventory={inventory}
								setInventory={updateInventory}
								onItemClick={openInventoryPopup}
							/>

							{/* Player Notes */}
							<PlayerNotes characterId={characterData.id} />
						</StyledMiddleColumn>

						{/* Right Column - Movement, Resources, Inventory, Features */}
						<StyledRightColumn>
							{/* Movement & Utility */}
							<Movement characterData={characterData} />

							{/* Resources */}
							<RightColumnResources
								characterData={characterData}
								currentValues={currentValues}
								onResourceInputChange={handleResourceInputChange}
							/>

							{/* Features */}
							<Features features={features} onFeatureClick={openFeaturePopup} />

							{/* Currency Section */}
							<Currency currentValues={currentValues} onCurrencyChange={handleCurrencyChange} />
						</StyledRightColumn>
					</StyledMainGrid>
				)}

				{/* Mobile Layout - Only show on mobile */}
				{isMobile && (
					<div>
						{/* Skills Tab - Mobile */}
						{activeMobileSection === 'character' && (
							<div>
								<LeftColumn
									characterData={characterData}
									skillsByAttribute={skillsByAttribute}
									knowledge={knowledge}
									trades={trades}
									languages={languages}
								/>
								<Features features={features} onFeatureClick={openFeaturePopup} />
							</div>
						)}

						{/* Combat Tab - Mobile */}
						{activeMobileSection === 'combat' && (
							<div>
								<Resources
									characterData={characterData}
									currentValues={currentValues}
									onAdjustResource={adjustResource}
									onResourceInputChange={handleResourceInputChange}
									getFillPercentage={getFillPercentage}
									getHPFillPercentage={getHPFillPercentage}
									isMobile={true}
								/>
								<Defenses
									characterData={{
										...characterData,
										manualPD: characterData?.manualPD,
										manualPDR: characterData?.manualPDR,
										manualAD: characterData?.manualAD
									}}
									calculatedDefenses={getCalculatedDefenses()}
									onUpdateManualDefense={handleManualDefenseChange}
									isMobile={true}
								/>
								<Combat
									characterData={characterData}
									currentValues={currentValues}
									setCurrentValues={setCurrentValues}
								/>
								<DeathExhaustion
									characterData={characterData}
									currentValues={currentValues}
									onExhaustionChange={handleExhaustionChange}
									onDeathStepChange={handleDeathStepChange}
								/>
								<Attacks
									attacks={attacks}
									setAttacks={updateAttacks}
									characterData={characterData}
									onAttackClick={openAttackPopup}
								/>
								<Movement characterData={characterData} />
								<RightColumnResources
									characterData={characterData}
									currentValues={currentValues}
									onResourceInputChange={handleResourceInputChange}
								/>
							</div>
						)}

						{/* Items Tab - Mobile */}
						{activeMobileSection === 'features' && (
							<div>
								<Inventory
									inventory={inventory}
									setInventory={updateInventory}
									onItemClick={openInventoryPopup}
								/>
								<Currency currentValues={currentValues} onCurrencyChange={handleCurrencyChange} />
							</div>
						)}

						{/* Info Tab - Mobile */}
						{activeMobileSection === 'info' && (
							<div>
								<div
									style={{
										border: '2px solid #8b4513',
										borderRadius: '8px',
										padding: '1rem',
										background: 'white',
										marginBottom: '1rem'
									}}
								>
									<h3
										style={{
											color: '#8b4513',
											marginTop: '0',
											marginBottom: '1rem',
											textAlign: 'center',
											fontSize: '1.2rem'
										}}
									>
										Character Information
									</h3>

									<div style={{ marginBottom: '1rem' }}>
										<StyledLabel>Player Name</StyledLabel>
										<StyledValue>{characterData.finalPlayerName || 'Unknown'}</StyledValue>
									</div>

									<div style={{ marginBottom: '1rem' }}>
										<StyledLabel>Character Name</StyledLabel>
										<StyledValue>{characterData.finalName}</StyledValue>
									</div>

									<div style={{ marginBottom: '1rem' }}>
										<StyledLabel>Class & Subclass</StyledLabel>
										<StyledValue>{characterData.className}</StyledValue>
										{(() => {
											const classDisplayInfo = getClassDisplayInfo();
											return classDisplayInfo.map((info, index) => (
												<div key={index}>
													<StyledLabel style={{ marginTop: '0.25rem', fontSize: '0.8rem' }}>
														{info.label}
													</StyledLabel>
													<StyledValue style={{ fontSize: '0.9rem' }}>{info.value}</StyledValue>
												</div>
											));
										})()}
									</div>

									<div style={{ marginBottom: '1rem' }}>
										<StyledLabel>Ancestry & Background</StyledLabel>
										<StyledValue>{characterData.ancestry1Name || 'Unknown'}</StyledValue>
									</div>

									<div style={{ marginBottom: '1rem' }}>
										<StyledLabel>Level</StyledLabel>
										<StyledValue>{characterData.finalLevel}</StyledValue>
									</div>

									<div style={{ marginBottom: '1rem' }}>
										<StyledLabel>Combat Mastery</StyledLabel>
										<StyledValue>+{characterData.finalCombatMastery}</StyledValue>
									</div>

									<div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
										<div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b4513' }}>
											DC20
										</div>
									</div>
								</div>
								<PlayerNotes characterId={characterData.id} />
							</div>
						)}
					</div>
				)}
			</StyledCharacterSheet>

			{/* Feature Popup */}
			{selectedFeature && (
				<StyledFeaturePopupOverlay onClick={closeFeaturePopup}>
					<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
						<StyledFeaturePopupHeader>
							<StyledFeaturePopupTitle>{selectedFeature.name}</StyledFeaturePopupTitle>
							<StyledFeaturePopupClose onClick={closeFeaturePopup}>×</StyledFeaturePopupClose>
						</StyledFeaturePopupHeader>
						<StyledFeaturePopupDescription>
							{selectedFeature.description}
						</StyledFeaturePopupDescription>
						{selectedFeature.sourceDetail && (
							<StyledFeaturePopupSourceInfo>
								Source: {selectedFeature.sourceDetail}
							</StyledFeaturePopupSourceInfo>
						)}
					</StyledFeaturePopupContent>
				</StyledFeaturePopupOverlay>
			)}

			{/* Spell Popup Modal */}
			{selectedSpell && (
				<StyledFeaturePopupOverlay onClick={closeSpellPopup}>
					<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
						<StyledFeaturePopupHeader>
							<StyledFeaturePopupTitle>{selectedSpell.name}</StyledFeaturePopupTitle>
							<StyledFeaturePopupClose onClick={closeSpellPopup}>×</StyledFeaturePopupClose>
						</StyledFeaturePopupHeader>
						<StyledFeaturePopupDescription>
							<strong>School:</strong> {selectedSpell.school}
							<br />
							<strong>AP Cost:</strong> {selectedSpell.cost.ap}
							<br />
							{selectedSpell.cost.mp && (
								<>
									<strong>MP Cost:</strong> {selectedSpell.cost.mp}
									<br />
								</>
							)}
							<strong>Range:</strong> {selectedSpell.range}
							<br />
							<strong>Duration:</strong> {selectedSpell.duration}
							<br />
							{selectedSpell.isCantrip && (
								<>
									<strong>Type:</strong> Cantrip
									<br />
								</>
							)}
							{selectedSpell.isRitual && (
								<>
									<strong>Ritual:</strong> Yes
									<br />
								</>
							)}
							<br />
							{selectedSpell.effects?.[0]?.description || 'No description available.'}
							{selectedSpell.cantripPassive && (
								<>
									<br />
									<br />
									<strong>Cantrip Passive:</strong> {selectedSpell.cantripPassive}
								</>
							)}
						</StyledFeaturePopupDescription>
						{selectedSpell.enhancements?.length > 0 && (
							<StyledFeaturePopupSourceInfo>
								Enhancements Available: {selectedSpell.enhancements.length}
							</StyledFeaturePopupSourceInfo>
						)}
					</StyledFeaturePopupContent>
				</StyledFeaturePopupOverlay>
			)}

			{/* Attack Popup Modal */}
			{selectedAttack && (
				<StyledFeaturePopupOverlay onClick={closeAttackPopup}>
					<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
						<StyledFeaturePopupHeader>
							<StyledFeaturePopupTitle>
								{selectedAttack.weapon?.name || selectedAttack.attack.name || 'Unknown Weapon'}
							</StyledFeaturePopupTitle>
							<StyledFeaturePopupClose onClick={closeAttackPopup}>×</StyledFeaturePopupClose>
						</StyledFeaturePopupHeader>
						<StyledFeaturePopupDescription>
							{selectedAttack.weapon ? (
								<>
									<strong>Weapon Type:</strong> {selectedAttack.weapon.type}
									<br />
									<strong>Handedness:</strong> {selectedAttack.weapon.handedness}
									<br />
									<strong>Style:</strong>{' '}
									{Array.isArray(selectedAttack.weapon.style)
										? selectedAttack.weapon.style.join('/')
										: selectedAttack.weapon.style}
									<br />
									<strong>Damage:</strong> {selectedAttack.weapon.damage}
									<br />
									{getVersatileDamage(selectedAttack.weapon) && (
										<>
											<strong>Versatile Damage:</strong>{' '}
											{getVersatileDamage(selectedAttack.weapon)?.twoHanded}
											<br />
										</>
									)}
									<strong>Damage Type:</strong>{' '}
									{parseDamage(selectedAttack.weapon.damage).typeDisplay}
									<br />
									{getWeaponRange(selectedAttack.weapon) && (
										<>
											<strong>Range:</strong> {getWeaponRange(selectedAttack.weapon)?.short}/
											{getWeaponRange(selectedAttack.weapon)?.long}
											<br />
										</>
									)}
									{selectedAttack.weapon.properties.includes('Ammo') && (
										<>
											<strong>Ammunition:</strong> Required
											<br />
										</>
									)}
									{selectedAttack.weapon.properties.includes('Reload') && (
										<>
											<strong>Reload:</strong> Required
											<br />
										</>
									)}
									<br />
									<strong>Damage Calculations:</strong>
									<br />• <strong>Hit:</strong> {selectedAttack.weapon.damage} + ability modifier
									<br />• <strong>Heavy Hit (+5):</strong> {selectedAttack.weapon.damage} + 1 +
									ability modifier
									<br />• <strong>Brutal Hit (+10):</strong> {selectedAttack.weapon.damage} + 2 +
									ability modifier
									<br />
									<br />
									{selectedAttack.weapon.properties.length > 0 && (
										<>
											<strong>Properties:</strong> {selectedAttack.weapon.properties.join(', ')}
											<br />
										</>
									)}
									{getWeaponFeatures(selectedAttack.weapon).length > 0 && (
										<>
											<strong>Features:</strong>{' '}
											{getWeaponFeatures(selectedAttack.weapon).join(', ')}
										</>
									)}
								</>
							) : (
								<>
									<strong>Custom Attack</strong>
									<br />
									<strong>Attack Bonus:</strong> +{selectedAttack.attack.attackBonus}
									<br />
									<strong>Damage:</strong> {selectedAttack.attack.damage}
									<br />
									<strong>Damage Type:</strong> {selectedAttack.attack.damageType}
									<br />
									{selectedAttack.attack.critRange && (
										<>
											<strong>Crit Range:</strong> {selectedAttack.attack.critRange}
											<br />
										</>
									)}
									{selectedAttack.attack.critDamage && (
										<>
											<strong>Crit Damage:</strong> {selectedAttack.attack.critDamage}
											<br />
										</>
									)}
									{selectedAttack.attack.brutalDamage && (
										<>
											<strong>Brutal Damage:</strong> {selectedAttack.attack.brutalDamage}
											<br />
										</>
									)}
									{selectedAttack.attack.heavyHitEffect && (
										<>
											<strong>Heavy Hit Effect:</strong> {selectedAttack.attack.heavyHitEffect}
										</>
									)}
								</>
							)}
						</StyledFeaturePopupDescription>
					</StyledFeaturePopupContent>
				</StyledFeaturePopupOverlay>
			)}

			{/* Inventory Popup Modal */}
			{selectedInventoryItem && (
				<StyledFeaturePopupOverlay onClick={closeInventoryPopup}>
					<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
						<StyledFeaturePopupHeader>
							<StyledFeaturePopupTitle>
								{selectedInventoryItem.item?.name ||
									selectedInventoryItem.inventoryData.itemName ||
									'Unknown Item'}
							</StyledFeaturePopupTitle>
							<StyledFeaturePopupClose onClick={closeInventoryPopup}>×</StyledFeaturePopupClose>
						</StyledFeaturePopupHeader>
						<StyledFeaturePopupDescription>
							{selectedInventoryItem.item ? (
								<>
									<strong>Type:</strong> {selectedInventoryItem.item.itemType}
									<br />
									{selectedInventoryItem.item.itemType === 'Weapon' && (
										<>
											<strong>Weapon Type:</strong> {(selectedInventoryItem.item as any).type}
											<br />
											<strong>Style:</strong> {(selectedInventoryItem.item as any).style}
											<br />
											<strong>Handedness:</strong> {(selectedInventoryItem.item as any).handedness}
											<br />
											<strong>Damage:</strong> {(selectedInventoryItem.item as any).damage}
											<br />
											{(selectedInventoryItem.item as any).properties && (
												<>
													<strong>Properties:</strong>{' '}
													{(selectedInventoryItem.item as any).properties.join(', ')}
													<br />
												</>
											)}
											{(selectedInventoryItem.item as any).price && (
												<>
													<strong>Price:</strong> {(selectedInventoryItem.item as any).price}
													<br />
												</>
											)}
										</>
									)}
									{selectedInventoryItem.item.itemType === 'Armor' && (
										<>
											<strong>Type:</strong> {(selectedInventoryItem.item as any).type}
											<br />
											<strong>PDR:</strong> {(selectedInventoryItem.item as any).pdr}
											<br />
											<strong>AD Modifier:</strong> {(selectedInventoryItem.item as any).adModifier}
											<br />
											{(selectedInventoryItem.item as any).agilityCap && (
												<>
													<strong>Agility Cap:</strong>{' '}
													{(selectedInventoryItem.item as any).agilityCap}
													<br />
												</>
											)}
											{(selectedInventoryItem.item as any).price && (
												<>
													<strong>Price:</strong> {(selectedInventoryItem.item as any).price}
													<br />
												</>
											)}
										</>
									)}
									{selectedInventoryItem.item.itemType === 'Shield' && (
										<>
											<strong>PDR:</strong> {(selectedInventoryItem.item as any).pdr}
											<br />
											<strong>AD Modifier:</strong> {(selectedInventoryItem.item as any).adModifier}
											<br />
											{(selectedInventoryItem.item as any).price && (
												<>
													<strong>Price:</strong> {(selectedInventoryItem.item as any).price}
													<br />
												</>
											)}
										</>
									)}
									{selectedInventoryItem.item.itemType === 'Potion' && (
										<>
											<strong>Level:</strong> {(selectedInventoryItem.item as any).level}
											<br />
											<strong>Healing:</strong> {(selectedInventoryItem.item as any).healing}
											<br />
											<strong>Price:</strong> {(selectedInventoryItem.item as any).price}g<br />
										</>
									)}
									{selectedInventoryItem.item.itemType === 'Adventuring Supply' && (
										<>
											{(selectedInventoryItem.item as any).description && (
												<>
													<strong>Description:</strong>{' '}
													{(selectedInventoryItem.item as any).description}
													<br />
												</>
											)}
											{(selectedInventoryItem.item as any).price && (
												<>
													<strong>Price:</strong> {(selectedInventoryItem.item as any).price}
													<br />
												</>
											)}
										</>
									)}
									<br />
									<strong>Count:</strong> {selectedInventoryItem.inventoryData.count}
									<br />
									{selectedInventoryItem.inventoryData.cost && (
										<>
											<strong>Cost:</strong> {selectedInventoryItem.inventoryData.cost}
										</>
									)}
								</>
							) : (
								<>
									<strong>Custom Item</strong>
									<br />
									<strong>Type:</strong> {selectedInventoryItem.inventoryData.itemType}
									<br />
									<strong>Count:</strong> {selectedInventoryItem.inventoryData.count}
									<br />
									{selectedInventoryItem.inventoryData.cost && (
										<>
											<strong>Cost:</strong> {selectedInventoryItem.inventoryData.cost}
										</>
									)}
								</>
							)}
						</StyledFeaturePopupDescription>
					</StyledFeaturePopupContent>
				</StyledFeaturePopupOverlay>
			)}

			{/* Draconic Dice Roller */}
			<DiceRoller 
				onRoll={(results, total, rollMode) => {
					console.log('Dice rolled:', { results, total, rollMode });
				}}
			/>
		</StyledContainer>
	);
};

export default CharacterSheet;
