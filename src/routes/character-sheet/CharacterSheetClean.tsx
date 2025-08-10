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
import type { ManeuverData } from './components/Maneuvers';
import type { Maneuver } from '../../lib/rulesdata/maneuvers';
import {
	getVersatileDamage,
	getWeaponRange,
	getWeaponFeatures,
	parseDamage
} from '../../lib/utils/weaponUtils';
import { convertToEnhancedBuildData, calculateCharacterWithBreakdowns } from '../../lib/services/enhancedCharacterCalculator';

// Import new component modules
import LeftColumn from './components/LeftColumn';
import Currency from './components/Currency';
import Resources from './components/Resources';
import Defenses from './components/Defenses';
import Combat from './components/Combat';
import Attacks from './components/Attacks';
import Spells from './components/Spells';
import Maneuvers from './components/Maneuvers';
import Inventory from './components/Inventory';
import Features from './components/Features';
import Movement from './components/Movement';
import RightColumnResources from './components/RightColumnResources';
import DeathExhaustion from './components/DeathExhaustion';

import PlayerNotes from './components/PlayerNotes';
import DiceRoller from './components/DiceRoller';

// Import modal components
import FeaturePopup from './components/FeaturePopup';
import SpellPopup from './components/SpellPopup';
import AttackPopup from './components/AttackPopup';
import InventoryPopup from './components/InventoryPopup';

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
import { traitsData } from '../../lib/rulesdata/_new_schema/traits';
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

import { calculateDeathThreshold } from '../../lib/rulesdata/death';
import { allSpells } from '../../lib/rulesdata/spells-data/spells';
import { allManeuvers } from '../../lib/rulesdata/maneuvers';

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

	console.log('🔍 getCharacterData: Raw character data from localStorage:', {
		id: character.id,
		name: character.finalName,
		hasSpells: !!character.spells,
		spellsLength: character.spells?.length || 0,
		spells: character.spells,
		hasSelectedSpells: !!character.selectedSpells,
		selectedSpells: character.selectedSpells
	});

	// Return the character data as-is since it's already calculated, but ensure trait and feature data is included
	// Fix missing or invalid prime modifier values
	const fixedCharacter = { ...character };

	if ((!fixedCharacter.spells || fixedCharacter.spells.length === 0) && fixedCharacter.selectedSpells) {
		try {
			const selectedSpellNames = JSON.parse(fixedCharacter.selectedSpells);
			console.log('🔍 getCharacterData: Converting selectedSpells to SpellData[]:', selectedSpellNames);

			if (Array.isArray(selectedSpellNames) && selectedSpellNames.length > 0) {
				// Convert selected spell names to SpellData objects
				const userSelectedSpells = selectedSpellNames.map((spellName: string) => {
					const fullSpell = allSpells.find(s => s.name === spellName);
					if (fullSpell) {
						return {
							id: `spell_${Date.now()}_${Math.random()}`,
							spellName: fullSpell.name,
							school: fullSpell.school,
							isCantrip: fullSpell.isCantrip,
							cost: fullSpell.cost,
							range: fullSpell.range,
							duration: fullSpell.duration,
							isPrepared: true,
							notes: ''
						};
					}
					return null;
				}).filter(Boolean);

				fixedCharacter.spells = userSelectedSpells;
				console.log('🔍 getCharacterData: Converted spells:', userSelectedSpells.map(s => s.spellName));
			}
		} catch (error) {
			console.error('🔍 getCharacterData: Error parsing selectedSpells:', error);
		}
	}



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
	const [selectedManeuver, setSelectedManeuver] = useState<Maneuver | null>(null);
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
	const [maneuvers, setManeuvers] = useState<ManeuverData[]>([]);
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

	// Save maneuvers to comprehensive state
	const saveManeuversData = (newManeuvers: ManeuverData[]) => {
		updateCharacterState(characterId, {
			maneuvers: {
				original: characterState?.maneuvers.original || [],
				current: newManeuvers
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

	// Wrapper for setManeuvers that also saves to comprehensive state
	const updateManeuvers = (newManeuvers: ManeuverData[] | ((prev: ManeuverData[]) => ManeuverData[])) => {
		setManeuvers((prev) => {
			const result = typeof newManeuvers === 'function' ? newManeuvers(prev) : newManeuvers;
			saveManeuversData(result);
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
				setManeuvers(initialState.maneuvers?.current || []);
				setInventory(initialState.inventory?.current || []);

				console.log('Character sheet loaded with spells:', {
					spellsOriginal: initialState.spells?.original,
					spellsCurrent: initialState.spells?.current,
					spellsLength: initialState.spells?.current?.length || 0
				});

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
					selectedTraitIds: (() => {
						try { return JSON.parse(characterData.selectedTraitIds || '[]'); }
						catch { return []; }
					})(),
					selectedTraitChoices: (() => {
						try { return JSON.parse(characterData.selectedTraitChoices || '{}'); }
						catch { return {}; }
					})(),
					featureChoices: (() => {
						try { return JSON.parse(characterData.selectedFeatureChoices || '{}'); }
						catch { return {}; }
					})(),
					skillsJson: characterData.skillsJson || '{}',
					tradesJson: characterData.tradesJson || '{}',
					languagesJson: characterData.languagesJson || '{}',
					lastModified: Date.now()
				};

				// Import moved to top of file
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
				console.error('Enhanced calculator failed, using stored values:', error);
				// Fallback to stored character values if enhanced calculator fails
				calculatedPD = characterData.finalPD;
				calculatedAD = characterData.finalAD;
				calculatedPDR = characterData.finalPDR;

				pdBreakdown = `${calculatedPD} (stored value - enhanced calculator failed)`;
				adBreakdown = `${calculatedAD} (stored value - enhanced calculator failed)`;
				pdrBreakdown = calculatedPDR > 0 ? `${calculatedPDR} (stored value)` : '0 (no PDR)';
			}
		} else {
			// Class not in supported list - use stored values with warning
			console.warn(`Class "${characterData.classId}" not in supported classes list - using stored values`);
			calculatedPD = characterData.finalPD;
			calculatedAD = characterData.finalAD;
			calculatedPDR = characterData.finalPDR;

			pdBreakdown = `${calculatedPD} (stored value - class not in enhanced calculator)`;
			adBreakdown = `${calculatedAD} (stored value - class not in enhanced calculator)`;
			pdrBreakdown = calculatedPDR > 0 ? `${calculatedPDR} (stored value)` : '0 (no PDR)';
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

	const openManeuverPopup = (maneuver: Maneuver) => {
		setSelectedManeuver(maneuver);
	};

	const closeManeuverPopup = () => {
		setSelectedManeuver(null);
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

	// Navigation functions


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
		dataType: 'resources' | 'currency' | 'attacks' | 'spells' | 'maneuvers' | 'inventory' | 'all'
	) => {
		if (dataType === 'all') {
			// Revert all data types
			revertToOriginal(characterId, 'resources');
			revertToOriginal(characterId, 'currency');
			revertToOriginal(characterId, 'attacks');
			revertToOriginal(characterId, 'spells');
			revertToOriginal(characterId, 'maneuvers');
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
						weaponName: '',
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
						weaponName: '',
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
						weaponName: '',
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
				// Use the original spells from character state
				if (characterState?.spells?.original) {
					setSpells([...characterState.spells.original]);
				}
			} else if (dataType === 'maneuvers') {
				// Use the original maneuvers from character state
				if (characterState?.maneuvers?.original) {
					setManeuvers([...characterState.maneuvers.original]);
				}
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

	const handlePrintCharacterSheet = () => {
		try {
			if (!characterData) {
				alert('Character data not found');
				return;
			}

			// Create a new window for printing
			const printWindow = window.open('', '_blank');
			if (!printWindow) {
				alert('Please allow popups to print the character sheet');
				return;
			}

			// Get the character sheet element
			const characterSheetElement = document.querySelector('.character-sheet-content');
			if (!characterSheetElement) {
				alert('Character sheet content not found');
				return;
			}

			// Get current data for printing
			const currentAttacks = attacks;
			const currentSpells = spells.length > 0 ? spells : (characterState?.spells?.current || []);
			const currentManeuvers = maneuvers.length > 0 ? maneuvers : (characterState?.maneuvers?.current || []);

			// Debug logging
			console.log('Print function - currentSpells:', currentSpells);
			console.log('Print function - spells state:', spells);
			console.log('Print function - characterState?.spells?.current:', characterState?.spells?.current);
			console.log('Print function - currentManeuvers:', currentManeuvers);

			// Create print-friendly HTML
			const printHTML = `
				<!DOCTYPE html>
				<html>
				<head>
					<title>${characterData.finalName} - DC20 Character Sheet</title>
					<style>
						@page {
							size: A4;
							margin: 1cm;
						}
						body {
							font-family: 'Georgia', serif;
							color: #2d2d2d;
							background: white;
							margin: 0;
							padding: 20px;
							line-height: 1.4;
						}
						.character-sheet {
							max-width: 100%;
							border: 2px solid #8b4513;
							border-radius: 8px;
							padding: 20px;
							background: white;
							margin-bottom: 30px;
						}
						.page-break {
							page-break-before: always;
						}
						.header {
							display: grid;
							grid-template-columns: 1fr 1fr 1fr auto;
							gap: 20px;
							margin-bottom: 20px;
							padding-bottom: 15px;
							border-bottom: 2px solid #8b4513;
						}
						.header-section {
							display: flex;
							flex-direction: column;
							gap: 5px;
						}
						.label {
							font-weight: bold;
							font-size: 0.9rem;
							color: #8b4513;
						}
						.value {
							font-size: 1.1rem;
							font-weight: bold;
						}
						.dc20-logo {
							font-size: 2rem;
							font-weight: bold;
							color: #8b4513;
							text-align: center;
							align-self: center;
						}
						.main-grid {
							display: grid;
							grid-template-columns: 300px 1fr 250px;
							gap: 20px;
						}
						.column {
							display: flex;
							flex-direction: column;
							gap: 15px;
						}
						.section {
							border: 1px solid #ccc;
							border-radius: 6px;
							padding: 15px;
							background: #f9f9f9;
						}
						.section-title {
							font-weight: bold;
							font-size: 1.1rem;
							color: #8b4513;
							margin-bottom: 10px;
							border-bottom: 1px solid #8b4513;
							padding-bottom: 5px;
						}
						.resource-circle {
							display: inline-block;
							width: 60px;
							height: 60px;
							border: 3px solid #8b4513;
							border-radius: 50%;
							text-align: center;
							line-height: 60px;
							font-weight: bold;
							font-size: 1.2rem;
							margin: 5px;
							background: white;
						}
						.defense-box {
							display: inline-block;
							padding: 10px 15px;
							border: 2px solid #8b4513;
							border-radius: 6px;
							text-align: center;
							margin: 5px;
							background: white;
						}
						.defense-label {
							font-size: 0.8rem;
							color: #666;
						}
						.defense-value {
							font-size: 1.3rem;
							font-weight: bold;
							color: #8b4513;
						}
						.skill-row {
							display: flex;
							justify-content: space-between;
							padding: 3px 0;
							border-bottom: 1px solid #eee;
						}
						.skill-name {
							font-weight: bold;
						}
						.skill-bonus {
							color: #8b4513;
							font-weight: bold;
						}
						.attack-row {
							display: flex;
							justify-content: space-between;
							align-items: center;
							padding: 5px 0;
							border-bottom: 1px solid #eee;
						}
						.spell-grid {
							display: grid;
							grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
							gap: 10px;
						}
						.spell-item {
							border: 1px solid #ccc;
							border-radius: 4px;
							padding: 8px;
							background: white;
							font-size: 0.9rem;
						}
						.spell-card {
							page-break-inside: avoid;
							break-inside: avoid;
						}
						.maneuver-card {
							page-break-inside: avoid;
							break-inside: avoid;
						}
						.inventory-item {
							display: flex;
							justify-content: space-between;
							padding: 3px 0;
							border-bottom: 1px solid #eee;
						}
						@media print {
							body { margin: 0; }
							.character-sheet { border: none; }
						}
					</style>
				</head>
				<body>
					<div class="character-sheet">
						<div class="header">
							<div class="header-section">
								<div class="label">Player Name</div>
								<div class="value">${characterData.finalPlayerName || 'Unknown'}</div>
								<div class="label">Character Name</div>
								<div class="value">${characterData.finalName}</div>
							</div>
							<div class="header-section">
								<div class="label">Class & Subclass</div>
								<div class="value">${characterData.className}</div>
								<div class="label">Ancestry & Background</div>
								<div class="value">${characterData.ancestry1Name || 'Unknown'}</div>
							</div>
							<div class="header-section">
								<div class="label">Level</div>
								<div class="value">${characterData.finalLevel}</div>
								<div class="label">Combat Mastery</div>
								<div class="value">+${characterData.finalCombatMastery}</div>
							</div>
							<div class="dc20-logo">DC20</div>
						</div>
						
						<div class="main-grid">
							<div class="column">
								<div class="section">
									<div class="section-title">Resources</div>
									<div style="text-align: center;">
										<div class="resource-circle">${currentValues.currentHP}/${characterData.finalHPMax}</div>
										<div class="resource-circle">${currentValues.currentSP}/${characterData.finalSPMax}</div>
										<div class="resource-circle">${currentValues.currentMP}/${characterData.finalMPMax}</div>
									</div>
								</div>
								
								<div class="section">
									<div class="section-title">Defenses</div>
									<div style="text-align: center;">
										<div class="defense-box">
											<div class="defense-label">PD</div>
											<div class="defense-value">${getCalculatedDefenses().calculatedPD}</div>
										</div>
										<div class="defense-box">
											<div class="defense-label">AD</div>
											<div class="defense-value">${getCalculatedDefenses().calculatedAD}</div>
										</div>
										<div class="defense-box">
											<div class="defense-label">PDR</div>
											<div class="defense-value">${getCalculatedDefenses().calculatedPDR}</div>
										</div>
									</div>
								</div>
								
								<div class="section">
									<div class="section-title">Attributes</div>
									<div class="skill-row">
										<span class="skill-name">Might</span>
						<span class="skill-bonus">+${characterData.finalMight}</span>
					</div>
					<div class="skill-row">
						<span class="skill-name">Agility</span>
						<span class="skill-bonus">+${characterData.finalAgility}</span>
					</div>
					<div class="skill-row">
						<span class="skill-name">Charisma</span>
						<span class="skill-bonus">+${characterData.finalCharisma}</span>
					</div>
					<div class="skill-row">
						<span class="skill-name">Intelligence</span>
						<span class="skill-bonus">+${characterData.finalIntelligence}</span>
					</div>
				</div>
				
				<div class="section">
					<div class="section-title">Skills</div>
					${Object.entries(skillsByAttribute).map(([attr, skills]) => 
						skills.length > 0 ? `
							<div style="margin-bottom: 10px;">
								<div style="font-weight: bold; color: #8b4513; margin-bottom: 5px;">${attr.charAt(0).toUpperCase() + attr.slice(1)}</div>
								${skills.map(skill => `
									<div class="skill-row">
										<span class="skill-name">${skill.name}</span>
										<span class="skill-bonus">+${skill.bonus}</span>
									</div>
								`).join('')}
							</div>
						` : ''
					).join('')}
				</div>
			</div>
			
			<div class="column">
				<div class="section">
					<div class="section-title">Attacks</div>
					${currentAttacks.map(attack => `
						<div class="attack-row">
							<span class="skill-name">${attack.name}</span>
							<span class="skill-bonus">+${attack.attackBonus}</span>
						</div>
					`).join('')}
				</div>
				

				

				
				<div class="section">
					<div class="section-title">Features</div>
					${features.map(feature => `
						<div style="margin-bottom: 8px; padding: 5px; border: 1px solid #ddd; border-radius: 4px; background: white;">
							<strong>${feature.name}</strong><br>
							<small>${feature.source}</small>
						</div>
					`).join('')}
				</div>
			</div>
			
			<div class="column">
				<div class="section">
					<div class="section-title">Inventory</div>
					${inventory.map(item => `
						<div class="inventory-item">
							<span>${item.itemName}</span>
							<span>${item.count}</span>
						</div>
					`).join('')}
				</div>
				
				<div class="section">
					<div class="section-title">Languages</div>
					${languages.map(lang => `
						<div class="skill-row">
							<span class="skill-name">${lang.name}</span>
							<span class="skill-bonus">${lang.fluency}</span>
						</div>
					`).join('')}
				</div>
				
				<div class="section">
					<div class="section-title">Trades</div>
					${trades.map(trade => `
						<div class="skill-row">
							<span class="skill-name">${trade.name}</span>
							<span class="skill-bonus">+${trade.bonus}</span>
						</div>
					`).join('')}
				</div>
			</div>
		</div>
	</div>

	${characterData.className && findClassByName(characterData.className)?.spellcastingPath && currentSpells.length > 0 ? `
	<div class="page-break"></div>
	<div class="character-sheet">
		<div class="header">
			<div class="header-section">
				<div class="label">Character</div>
				<div class="value">${characterData.finalName}</div>
			</div>
			<div class="header-section">
				<div class="label">Class</div>
				<div class="value">${characterData.className}</div>
			</div>
			<div class="header-section">
				<div class="label">Level</div>
				<div class="value">${characterData.finalLevel}</div>
			</div>
			<div class="dc20-logo">DC20</div>
		</div>
		
		<h2 style="text-align: center; color: #8b4513; margin-bottom: 30px;">Spells</h2>
		
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px;">
			${currentSpells.map(spell => {
				const fullSpell = allSpells.find(s => s.name === spell.spellName);
				return `
					<div class="spell-card" style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px; background: #f8f9fa; margin-bottom: 20px;">
						<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
							<div>
								<h3 style="margin: 0 0 5px 0; color: #2c3e50; font-size: 1.4rem;">${spell.spellName}</h3>
							</div>
							<div>
								<span style="background: #3498db; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">${spell.school}</span>
								${spell.isCantrip ? '<span style="background: #e74c3c; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-left: 8px;">Cantrip</span>' : ''}
							</div>
						</div>
						
						<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 15px;">
							<div>
								<span style="font-weight: bold; color: #7f8c8d; font-size: 0.8rem; text-transform: uppercase;">Cost</span><br>
								<span style="color: #2c3e50; font-size: 0.9rem;">${spell.cost.ap} AP${spell.cost.mp ? `, ${spell.cost.mp} MP` : ''}</span>
							</div>
							<div>
								<span style="font-weight: bold; color: #7f8c8d; font-size: 0.8rem; text-transform: uppercase;">Range</span><br>
								<span style="color: #2c3e50; font-size: 0.9rem;">${spell.range}</span>
							</div>
							<div>
								<span style="font-weight: bold; color: #7f8c8d; font-size: 0.8rem; text-transform: uppercase;">Duration</span><br>
								<span style="color: #2c3e50; font-size: 0.9rem;">${spell.duration}</span>
							</div>
						</div>
						
						${fullSpell && fullSpell.effects && fullSpell.effects.length > 0 ? `
							<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
								<h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Description</h4>
								${fullSpell.effects.map((effect, index) => `
									<div style="margin-bottom: ${index < fullSpell.effects.length - 1 ? '15px' : '0'};">
										${effect.title ? `<strong style="color: #2c3e50; font-size: 1rem;">${effect.title}:</strong><br />` : ''}
										<span style="color: #34495e; line-height: 1.6; font-size: 0.95rem;">${effect.description}</span>
									</div>
								`).join('')}
							</div>
						` : ''}
						
						${fullSpell && fullSpell.cantripPassive ? `
							<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
								<h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Cantrip Passive</h4>
								<p style="color: #34495e; line-height: 1.6; margin: 0; font-size: 0.95rem;">${fullSpell.cantripPassive}</p>
							</div>
						` : ''}
						
						${fullSpell && fullSpell.enhancements && fullSpell.enhancements.length > 0 ? `
							<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
								<h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Enhancements</h4>
								${fullSpell.enhancements.map((enhancement, index) => `
									<div style="margin-top: 10px; padding: 10px; background-color: #f0f0f0; border-radius: 4px;">
										<strong style="color: #2c3e50; font-size: 0.95rem;">${enhancement.name}</strong> (${enhancement.type} ${enhancement.cost})
										<br />
										<span style="color: #34495e; line-height: 1.6; font-size: 0.9rem;">${enhancement.description}</span>
									</div>
								`).join('')}
							</div>
						` : ''}
						
						${spell.notes ? `
							<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
								<h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Notes</h4>
								<p style="color: #34495e; line-height: 1.6; margin: 0; font-size: 0.95rem;">${spell.notes}</p>
							</div>
						` : ''}
					</div>
				`;
			}).join('')}
		</div>
	</div>
	` : ''}

	${characterData.className && findClassByName(characterData.className)?.martialPath && currentManeuvers.length > 0 ? `
	<div class="page-break"></div>
	<div class="character-sheet">
		<div class="header">
			<div class="header-section">
				<div class="label">Character</div>
				<div class="value">${characterData.finalName}</div>
			</div>
			<div class="header-section">
				<div class="label">Class</div>
				<div class="value">${characterData.className}</div>
			</div>
			<div class="header-section">
				<div class="label">Level</div>
				<div class="value">${characterData.finalLevel}</div>
			</div>
			<div class="dc20-logo">DC20</div>
		</div>
		
		<h2 style="text-align: center; color: #8b4513; margin-bottom: 30px;">Maneuvers</h2>
		
		<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px;">
			${currentManeuvers.map(maneuver => {
				const fullManeuver = allManeuvers.find(m => m.name === maneuver.maneuverName);
				return `
					<div class="maneuver-card" style="border: 2px solid #e0e0e0; border-radius: 10px; padding: 20px; background: #f8f9fa; margin-bottom: 20px;">
						<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
							<div>
								<h3 style="margin: 0 0 5px 0; color: #2c3e50; font-size: 1.4rem;">${maneuver.maneuverName}</h3>
							</div>
							<div>
								<span style="background: #27ae60; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">${maneuver.type}</span>
								${maneuver.isReaction ? '<span style="background: #e67e22; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; margin-left: 8px;">Reaction</span>' : ''}
							</div>
						</div>
						
						<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 15px;">
							<div>
								<span style="font-weight: bold; color: #7f8c8d; font-size: 0.8rem; text-transform: uppercase;">Cost</span><br>
								<span style="color: #2c3e50; font-size: 0.9rem;">${maneuver.cost.ap} AP${maneuver.cost.mp ? `, ${maneuver.cost.mp} MP` : ''}</span>
							</div>
							${fullManeuver && fullManeuver.trigger ? `
								<div>
									<span style="font-weight: bold; color: #7f8c8d; font-size: 0.8rem; text-transform: uppercase;">Trigger</span><br>
									<span style="color: #2c3e50; font-size: 0.9rem;">${fullManeuver.trigger}</span>
								</div>
							` : ''}
							${fullManeuver && fullManeuver.requirement ? `
								<div>
									<span style="font-weight: bold; color: #7f8c8d; font-size: 0.8rem; text-transform: uppercase;">Requirement</span><br>
									<span style="color: #2c3e50; font-size: 0.9rem;">${fullManeuver.requirement}</span>
								</div>
							` : ''}
						</div>
						
						${fullManeuver && fullManeuver.description ? `
							<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
								<h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Description</h4>
								<p style="color: #34495e; line-height: 1.6; margin: 0; font-size: 0.95rem;">${fullManeuver.description}</p>
							</div>
						` : ''}
						
						${fullManeuver && fullManeuver.trigger ? `
							<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
								<h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Trigger</h4>
								<p style="color: #34495e; line-height: 1.6; margin: 0; font-size: 0.95rem; font-style: italic;">${fullManeuver.trigger}</p>
							</div>
						` : ''}
						
						${fullManeuver && fullManeuver.requirement ? `
							<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
								<h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Requirement</h4>
								<p style="color: #34495e; line-height: 1.6; margin: 0; font-size: 0.95rem;">${fullManeuver.requirement}</p>
							</div>
						` : ''}
						
						${maneuver.notes ? `
							<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
								<h4 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 1.1rem;">Notes</h4>
								<p style="color: #34495e; line-height: 1.6; margin: 0; font-size: 0.95rem;">${maneuver.notes}</p>
							</div>
						` : ''}
					</div>
				`;
			}).join('')}
		</div>
	</div>
	` : ''}
</body>
</html>
			`;

			// Write the HTML to the new window
			printWindow.document.write(printHTML);
			printWindow.document.close();

			// Wait for content to load, then print
			printWindow.onload = () => {
				setTimeout(() => {
					printWindow.print();
					printWindow.close();
				}, 500);
			};
		} catch (error) {
			console.error('Failed to print character sheet:', error);
			alert('Failed to print character sheet');
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
				<StyledActionButton
					onClick={handlePrintCharacterSheet}
					title="Print character sheet as PDF"
				>
					🖨️ Print PDF
				</StyledActionButton>
			</StyledActionButtons>

			<StyledBackButton onClick={onBack}>
				<span className="desktop-text">← Back to Menu</span>
				<span className="mobile-text">←</span>
			</StyledBackButton>

			<StyledCharacterSheet className="character-sheet-content">
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
								breakdowns={characterState?.calculation?.breakdowns}
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
								breakdowns={characterState?.calculation?.breakdowns}
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
								breakdowns={characterState?.calculation?.breakdowns}
								isMobile={false}
							/>

							{/* Combat Section */}
							<Combat
								characterData={characterData}
								currentValues={currentValues}
								setCurrentValues={setCurrentValues}
								breakdowns={characterState?.calculation?.breakdowns}
							/>

							{/* Death & Exhaustion */}
							<DeathExhaustion
								characterData={characterData}
								currentValues={currentValues}
								onExhaustionChange={handleExhaustionChange}
								onDeathStepChange={handleDeathStepChange}
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
							<Movement 
								characterData={characterData} 
								breakdowns={characterState?.calculation?.breakdowns}
							/>

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

				{/* Spells Section - Full width, after main content */}
				{characterData.className && findClassByName(characterData.className)?.spellcastingPath && (
					<div style={{ marginTop: '2rem', padding: '1rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
						<h2 style={{ color: '#2c3e50', marginBottom: '1rem', textAlign: 'center' }}>Spells</h2>
						{console.log('🔍 Rendering Spells component with:', { spellsCount: spells.length, spellNames: spells.map(s => s.spellName) })}
						<Spells
							spells={spells}
							setSpells={updateSpells}
							characterData={characterData}
							onSpellClick={openSpellPopup}
							readOnly={true}
						/>
					</div>
				)}

				{/* Maneuvers Section - Full width, after main content */}
				{characterData.className && findClassByName(characterData.className)?.martialPath && (
					<div style={{ marginTop: '2rem', padding: '1rem', background: 'white', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
						<h2 style={{ color: '#2c3e50', marginBottom: '1rem', textAlign: 'center' }}>Maneuvers</h2>
						<Maneuvers
							maneuvers={maneuvers}
							setManeuvers={updateManeuvers}
							characterData={characterData}
							onManeuverClick={openManeuverPopup}
						/>
					</div>
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
									breakdowns={characterState?.calculation?.breakdowns}
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
									breakdowns={characterState?.calculation?.breakdowns}
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
									breakdowns={characterState?.calculation?.breakdowns}
									isMobile={true}
								/>
								<Combat
									characterData={characterData}
									currentValues={currentValues}
									setCurrentValues={setCurrentValues}
									breakdowns={characterState?.calculation?.breakdowns}
								/>
								<DeathExhaustion
									characterData={characterData}
									currentValues={currentValues}
									onExhaustionChange={handleExhaustionChange}
									onDeathStepChange={handleDeathStepChange}
								/>
								<Spells
									spells={spells}
									setSpells={updateSpells}
									characterData={characterData}
									onSpellClick={openSpellPopup}
								/>
								<Attacks
									attacks={attacks}
									setAttacks={updateAttacks}
									characterData={characterData}
									onAttackClick={openAttackPopup}
								/>
								{characterData.className && findClassByName(characterData.className)?.spellcastingPath && (
									<Spells
										spells={spells}
										setSpells={updateSpells}
										characterData={characterData}
										onSpellClick={openSpellPopup}
										readOnly={true}
									/>
								)}
								{characterData.className && findClassByName(characterData.className)?.martialPath && (
									<Maneuvers
										maneuvers={maneuvers}
										setManeuvers={updateManeuvers}
										characterData={characterData}
										onManeuverClick={openManeuverPopup}
									/>
								)}
								<Movement 
									characterData={characterData} 
									breakdowns={characterState?.calculation?.breakdowns}
								/>
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
			<FeaturePopup feature={selectedFeature} onClose={closeFeaturePopup} />

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
							<strong>Description:</strong>
							<br />
							{selectedSpell.effects?.map((effect, index) => (
								<div key={index} style={{ marginBottom: '0.5rem' }}>
									{effect.title && <strong>{effect.title}:</strong>}
									<br />
									{effect.description}
								</div>
							)) || 'No description available.'}
							{selectedSpell.cantripPassive && (
								<>
									<br />
									<br />
									<strong>Cantrip Passive:</strong> {selectedSpell.cantripPassive}
								</>
							)}
							{selectedSpell.enhancements?.length > 0 && (
								<>
									<br />
									<br />
									<strong>Enhancements:</strong>
									{selectedSpell.enhancements.map((enhancement, index) => (
										<div key={index} style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
											<strong>{enhancement.name}</strong> ({enhancement.type} {enhancement.cost})
											<br />
											{enhancement.description}
										</div>
									))}
								</>
							)}
						</StyledFeaturePopupDescription>
					</StyledFeaturePopupContent>
				</StyledFeaturePopupOverlay>
			)}

			{/* Maneuver Popup Modal */}
			{selectedManeuver && (
				<StyledFeaturePopupOverlay onClick={closeManeuverPopup}>
					<StyledFeaturePopupContent onClick={(e) => e.stopPropagation()}>
						<StyledFeaturePopupHeader>
							<StyledFeaturePopupTitle>{selectedManeuver.name}</StyledFeaturePopupTitle>
							<StyledFeaturePopupClose onClick={closeManeuverPopup}>×</StyledFeaturePopupClose>
						</StyledFeaturePopupHeader>
						<StyledFeaturePopupDescription>
							<strong>Type:</strong> {selectedManeuver.type}
							<br />
							<strong>AP Cost:</strong> {selectedManeuver.cost.ap}
							<br />
							<strong>Action Type:</strong> {selectedManeuver.isReaction ? 'Reaction' : 'Action'}
							<br />
							{selectedManeuver.trigger && (
								<>
									<strong>Trigger:</strong> {selectedManeuver.trigger}
									<br />
								</>
							)}
							{selectedManeuver.requirement && (
								<>
									<strong>Requirement:</strong> {selectedManeuver.requirement}
									<br />
								</>
							)}
							<br />
							<strong>Description:</strong>
							<br />
							{selectedManeuver.description}
						</StyledFeaturePopupDescription>
					</StyledFeaturePopupContent>
				</StyledFeaturePopupOverlay>
			)}
			<SpellPopup spell={selectedSpell} onClose={closeSpellPopup} />

			{/* Attack Popup Modal */}
			<AttackPopup selectedAttack={selectedAttack} onClose={closeAttackPopup} />

			{/* Inventory Popup Modal */}
			<InventoryPopup selectedInventoryItem={selectedInventoryItem} onClose={closeInventoryPopup} />

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

