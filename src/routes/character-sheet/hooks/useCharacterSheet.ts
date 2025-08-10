import { useState, useEffect } from 'react';

// Import types
import type {
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
} from '../../../types';
import type { Spell } from '../../../lib/rulesdata/spells-data/types/spell.types';
import type { Weapon } from '../../../lib/rulesdata/inventoryItems';
import type { InventoryItem } from '../../../lib/rulesdata/inventoryItems';

// Import character state management utilities
import {
    getCharacterState,
    initializeCharacterState,
    saveCharacterState,
    updateCharacterState,
    revertToOriginal,
    characterStateToCurrentValues,
    setManualDefense
} from '../../../lib/utils/characterState';

// Import defense notes utilities
import { clearDefenseNotesForField } from '../../../lib/utils/defenseNotes';

// Import rules data
import { skillsData } from '../../../lib/rulesdata/skills';
import { tradesData } from '../../../lib/rulesdata/trades';
import { knowledgeData } from '../../../lib/rulesdata/knowledge';
import { traitsData } from '../../../lib/rulesdata/traits';
import {
	findClassByName,
	getClassSpecificInfo,
	getLegacyChoiceId,
	getDisplayLabel
} from '../../../lib/rulesdata/loaders/class-features.loader';
import { ancestriesData } from '../../../lib/rulesdata/ancestries';
import { getDetailedClassFeatureDescription } from '../../../lib/utils/classFeatureDescriptions';
import { calculateDeathThreshold } from '../../../lib/rulesdata/death';

// Character data service - fetches from localStorage and uses already calculated stats
const getCharacterData = async (characterId: string): Promise<CharacterSheetData> => {
	console.log('Loading character data for ID:', characterId);

	// Get characters from localStorage
	const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');

	// Find the character by ID
	const character = savedCharacters.find((char: any) => char.id === characterId);

	if (!character) {
		throw new Error(`Character with ID "${characterId}" not found in localStorage`);
	}

	// Return the character data as-is since it's already calculated, but ensure trait and feature data is included
	return {
		...character,
		selectedTraitIds: character.selectedTraitIds || character.selectedTraitsJson || '[]',
		selectedFeatureChoices: character.selectedFeatureChoices || '{}'
	};
};

// Manual defense persistence is centralized via characterState.setManualDefense

export const useCharacterSheet = (characterId: string) => {
	// All state variables
	const [characterData, setCharacterData] = useState<CharacterSheetData | null>(null);
	const [characterState, setCharacterState] = useState<CharacterState | null>(null);
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

                // Load the character data from storage
                const data = await getCharacterData(characterId);

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

                // Merge manual defense overrides from CharacterState into display facade
                const effectiveCharacterData = {
                    ...data,
                    manualPD: initialState.manualDefenses?.manualPD ?? (data as any).manualPD,
                    manualPDR: initialState.manualDefenses?.manualPDR ?? (data as any).manualPDR,
                    manualAD: initialState.manualDefenses?.manualAD ?? (data as any).manualAD
                } as CharacterSheetData;
                setCharacterData(effectiveCharacterData);

                // Update component states from the comprehensive state
				const legacyCurrentValues = characterStateToCurrentValues(initialState);
				setCurrentValues(legacyCurrentValues);
				setAttacks(initialState.attacks?.current || []);
				setSpells(initialState.spells?.current || []);
				setInventory(initialState.inventory?.current || []);

                console.log('Character data and state loaded:', {
                    characterData: effectiveCharacterData,
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

	// Calculate original defense values (without manual overrides) with detailed breakdown
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

		// Use the same formula as in characterCalculator.ts
		const calculatedPD =
			8 +
			characterData.finalCombatMastery +
			characterData.finalAgility +
			characterData.finalIntelligence;
		const calculatedAD =
			8 + characterData.finalCombatMastery + characterData.finalMight + characterData.finalCharisma;

		// Create detailed breakdown strings
		const pdBreakdown = `8 (base) + ${characterData.finalCombatMastery} (Combat Mastery) + ${characterData.finalAgility} (Agility) + ${characterData.finalIntelligence} (Intelligence) = ${calculatedPD}`;
		const adBreakdown = `8 (base) + ${characterData.finalCombatMastery} (Combat Mastery) + ${characterData.finalMight} (Might) + ${characterData.finalCharisma} (Charisma) = ${calculatedAD}`;

		// For PDR, we'd need to recalculate based on armor/class, but for now we'll use the difference
		// between final value and any manual override
		const calculatedPDR =
			characterData.manualPDR !== undefined
				? characterData.finalPDR // This would be the auto-calculated value stored somewhere
				: characterData.finalPDR;

		const pdrBreakdown =
			calculatedPDR > 0
				? `${calculatedPDR} (from equipped armor and class features)`
				: '0 (no PDR from current equipment/class)';

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

        // Persist centrally
        setManualDefense(characterData.id, field, value);

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
		if (characterData?.skillsData) {
			characterSkills = characterData.skillsData;
		} else if (characterData?.skillsJson) {
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
		if (characterData?.tradesData) {
			characterTrades = characterData.tradesData;
		} else if (characterData?.tradesJson) {
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
		// Parse character's trade proficiencies (if any) - knowledge is stored in tradesData
		let characterTrades: Record<string, number> = {};
		if (characterData?.tradesData) {
			characterTrades = characterData.tradesData;
		} else if (characterData?.tradesJson) {
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
		if (!characterData?.languagesData && !characterData?.languagesJson) {
			return [];
		}

		try {
			const languagesFromDB = characterData.languagesData || JSON.parse(characterData.languagesJson || '[]');

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
				const selectedTraitIds: string[] = Array.isArray(characterData.selectedTraitIds) 
					? characterData.selectedTraitIds 
					: JSON.parse(characterData.selectedTraitIds);
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

            // Clear the manual defense values in centralized state
            setManualDefense(characterId, 'manualPD', undefined);
            setManualDefense(characterId, 'manualPDR', undefined);
            setManualDefense(characterId, 'manualAD', undefined);

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

	return {
		// State
		characterData,
		currentValues,
		loading,
		error,
		selectedFeature,
		selectedSpell,
		selectedAttack,
		selectedInventoryItem,
		attacks,
		spells,
		inventory,
		activeMobileSection,
		setActiveMobileSection,

		// Computed data
		trades,
		knowledge,
		languages,
		features,
		skillsByAttribute,

		// Event handlers
		adjustResource,
		handleResourceInputChange,
		handleManualDefenseChange,
		openFeaturePopup,
		closeFeaturePopup,
		openSpellPopup,
		closeSpellPopup,
		openAttackPopup,
		closeAttackPopup,
		openInventoryPopup,
		closeInventoryPopup,
		handleCurrencyChange,
		handleExhaustionChange,
		handleDeathStepChange,
		handleRevertToOriginal,
		copyCharacterToClipboard,

		// Utility functions
		getCalculatedDefenses,
		getFillPercentage,
		getHPFillPercentage,
		getClassDisplayInfo,
		updateAttacks,
		updateSpells,
    updateInventory,

    // Persisted calculation breakdowns for drill-down UI
    breakdowns: characterState?.calculation?.breakdowns
	};
};
