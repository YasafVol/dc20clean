import React, { useState, useEffect } from 'react';

// Import Provider hooks
import { useCharacterSheet, useCharacterResources } from './hooks/CharacterSheetProvider';

// Import types
import type {
	CharacterSheetProps,
	SkillData,
	TradeData,
	LanguageData,
	FeatureData,
	AttackData,
	SpellData,
	InventoryItemData
} from '../../types';
import type { Spell } from '../../lib/rulesdata/spells-data/types/spell.types';
import type { Weapon } from '../../lib/rulesdata/inventoryItems';
import type { InventoryItem } from '../../lib/rulesdata/inventoryItems';
import type { ManeuverData } from '../../types';
import type { Maneuver } from '../../lib/rulesdata/maneuvers';

// Legacy JSON parsing function - removed in favor of typed data contracts

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
import { updateCharacterState, revertToOriginal } from '../../lib/utils/characterState';

// Import defense notes utilities
import { clearDefenseNotesForField } from '../../lib/utils/defenseNotes';

// Import rules data
import { skillsData } from '../../lib/rulesdata/skills';
import { tradesData } from '../../lib/rulesdata/trades';
import { traitsData } from '../../lib/rulesdata/_new_schema/traits';
import {
	findClassByName,
	getClassSpecificInfo,
	getLegacyChoiceId,
	getDisplayLabel
} from '../../lib/rulesdata/loaders/class-features.loader';
import { ancestriesData } from '../../lib/rulesdata/_new_schema/ancestries';
import { getDetailedClassFeatureDescription } from '../../lib/utils/classFeatureDescriptions';

// Import styled components
import {
	StyledContainer,
	CharacterSheetGlobalStyle,
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
	StyledFeaturePopupDescription
} from './styles/FeaturePopup';

import { allSpells } from '../../lib/rulesdata/spells-data/spells';
import { allManeuvers } from '../../lib/rulesdata/maneuvers';

import { handlePrintCharacterSheet } from './utils';

// LEGACY: saveManualDefense function removed - now handled by CharacterSheetProvider

const CharacterSheet: React.FC<CharacterSheetProps> = ({ characterId, onBack }) => {
	// Use Provider hooks for data and update methods
	const {
		state,
		updateHP,
		updateSP,
		updateMP,
		updateTempHP,
		updateActionPoints,
		updateExhaustion,
		updateCurrency
	} = useCharacterSheet();
	const resources = useCharacterResources();

	// Get data from Provider instead of local state
	const loading = state.loading;
	const error = state.error;
	const characterData = state.character;
	const characterState = characterData?.characterState;

	// Calculate max values for current resources
	const characterMaxValues = characterData
		? {
				currentGritPoints: characterData.finalGritPoints,
				currentRestPoints: characterData.finalRestPoints,
				currentHP: characterData.finalHPMax,
				currentSP: characterData.finalSPMax,
				currentMP: characterData.finalMPMax,
				tempHP: 0,
				actionPointsUsed: 0,
				exhaustionLevel: 0,
				// Death tracking
				deathSteps: 0,
				isDead: false,
				// Currency
				goldPieces: 0,
				silverPieces: 0,
				copperPieces: 0,
				electrumPieces: 0,
				platinumPieces: 0
			}
		: {};

	const currentValues = resources?.current || characterMaxValues;

	// Keep local popup state (these don't need Provider)
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

	// Load character data
	// Data loading is now handled by the Provider, so no useEffect needed here

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

		// OPTIMIZED: Trust stored defense values and breakdowns (no recalculation needed)
		let calculatedPD, calculatedAD, calculatedPDR;
		let pdBreakdown, adBreakdown, pdrBreakdown;

		// Use stored values - they are the single source of truth
		calculatedPD = characterData.finalPD;
		calculatedAD = characterData.finalAD;
		calculatedPDR = characterData.finalPDR;

		// Use stored breakdowns if available, otherwise create simple fallback
		const storedBreakdowns = (characterData as any).breakdowns || {};

		pdBreakdown = storedBreakdowns.pd?.effects
			? storedBreakdowns.pd.effects
					.map((e: any) => `${e.value > 0 ? '+' : ''}${e.value} (${e.source.name || e.source})`)
					.join(' ') + ` = ${calculatedPD}`
			: `8 (base) + ${characterData.finalCombatMastery} (Combat Mastery) + ${characterData.finalAgility} (Agility) + ${characterData.finalIntelligence} (Intelligence) = ${calculatedPD}`;

		adBreakdown = storedBreakdowns.ad?.effects
			? storedBreakdowns.ad.effects
					.map((e: any) => `${e.value > 0 ? '+' : ''}${e.value} (${e.source.name || e.source})`)
					.join(' ') + ` = ${calculatedAD}`
			: `8 (base) + ${characterData.finalCombatMastery} (Combat Mastery) + ${characterData.finalMight} (Might) + ${characterData.finalCharisma} (Charisma) = ${calculatedAD}`;

		pdrBreakdown = calculatedPDR > 0 ? `${calculatedPDR} (from stored calculation)` : '0 (no PDR)';

		console.log('🚀 OPTIMIZED: Using stored defense values (no recalculation needed)');

		return {
			calculatedPD,
			calculatedPDR,
			calculatedAD,
			pdBreakdown,
			adBreakdown,
			pdrBreakdown
		};
	};

	// Parse skills data from character - show ALL skills with their proficiency levels and calculated bonuses
	const getSkillsData = (): SkillData[] => {
		// Parse character's skill proficiencies (if any)
		let characterSkills: Record<string, number> = {};
		if (characterData?.skillsData) {
			characterSkills = characterData.skillsData;
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
		}

		// Show ALL knowledge skills with their proficiency levels and calculated bonuses
		return tradesData
			.filter((trade) => trade.tools === 'none')
			.map((knowledge) => {
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
		if (!characterData?.languagesData) {
			return [];
		}

		try {
			const languagesFromDB = characterData.languagesData;

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
					// Try to parse as JSON first
					let selectedChoices: { [key: string]: string } = {};

					// Handle new data structure - selectedFeatureChoices is already an object
					if (
						typeof characterData.selectedFeatureChoices === 'object' &&
						characterData.selectedFeatureChoices !== null
					) {
						selectedChoices = characterData.selectedFeatureChoices as { [key: string]: string };
					} else if (typeof characterData.selectedFeatureChoices === 'string') {
						// Legacy handling - try to parse as JSON string
						try {
							selectedChoices = JSON.parse(characterData.selectedFeatureChoices);
						} catch (jsonError) {
							// If JSON parsing fails, it might be legacy comma-separated data
							console.warn(
								'Failed to parse selectedFeatureChoices as JSON, attempting legacy format conversion:',
								characterData.selectedFeatureChoices
							);

							// For legacy data that might be stored as "Magic,Trickery" format
							// We'll skip processing for now to prevent errors
							console.warn('Skipping feature choices processing due to legacy data format');
							return features;
						}
					}

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
										let selectedValueArray: string[] = [];

										if (Array.isArray(selectedOptionValues)) {
											// New format - already an array
											selectedValueArray = selectedOptionValues;
										} else if (typeof selectedOptionValues === 'string') {
											// Legacy format - JSON string or comma-separated
											try {
												selectedValueArray = JSON.parse(selectedOptionValues);
											} catch (parseError) {
												// Try comma-separated format
												if (selectedOptionValues.includes(',')) {
													selectedValueArray = selectedOptionValues.split(',').map((v) => v.trim());
												} else {
													// Single value that failed JSON parse
													selectedValueArray = [selectedOptionValues];
												}
											}
										} else {
											console.warn('Unexpected format for choice values:', selectedOptionValues);
											return; // Use return instead of continue in forEach
										}

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

			// TODO: Clear the manual defense values in localStorage
			// saveManualDefense(characterId, 'manualPD', undefined);
			// saveManualDefense(characterId, 'manualPDR', undefined);
			// saveManualDefense(characterId, 'manualAD', undefined);

			// Reload the page to reflect changes
			window.location.reload();
		} else {
			revertToOriginal(characterId, dataType);

			// Update local state based on what was reverted
			if (dataType === 'resources') {
				// Revert to max values using Provider methods
				updateHP(characterData?.finalHPMax || 0);
				updateSP(characterData?.finalSPMax || 0);
				updateMP(characterData?.finalMPMax || 0);
				updateTempHP(0);
				updateActionPoints(0);
				updateExhaustion(0);
			} else if (dataType === 'currency') {
				// Reset currency using Provider method
				updateCurrency(0, 0, 0);
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
				// Reset spells to empty array
				setSpells([]);
			} else if (dataType === 'maneuvers') {
				// Reset maneuvers to empty array
				setManeuvers([]);
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

	// Wrapper function to call the extracted print function with all required parameters
	const handlePrint = () => {
		if (!characterData) return;

		handlePrintCharacterSheet(
			characterData,
			attacks,
			spells,
			characterState,
			maneuvers,
			getCalculatedDefenses,
			currentValues,
			features,
			languages,
			trades,
			inventory,
			skillsByAttribute,
			allSpells,
			allManeuvers
		);
	};

	return (
		<StyledContainer style={{ position: 'relative' }}>
			<CharacterSheetGlobalStyle />
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
				<StyledActionButton onClick={handlePrint} title="Print character sheet as PDF">
					🖨️ Print PDF
				</StyledActionButton>
			</StyledActionButtons>

			<StyledBackButton onClick={onBack}>
				<span className="desktop-text">← Back to Menu</span>
				<span className="mobile-text">←</span>
			</StyledBackButton>

			<StyledCharacterSheet className="character-sheet-content">
				{/* Header Section */}
				<StyledHeader
					style={{
						background: (currentValues as any)?.isDead
							? 'linear-gradient(45deg, rgba(139, 0, 0, 0.1), rgba(139, 0, 0, 0.05))'
							: 'transparent',
						borderColor: (currentValues as any)?.isDead ? '#8B0000' : undefined,
						position: 'relative'
					}}
				>
					{(currentValues as any)?.isDead && (
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								background: `repeating-linear-gradient(
								45deg,
								transparent,
								transparent 10px,
								rgba(139, 0, 0, 0.05) 10px,
								rgba(139, 0, 0, 0.05) 20px
							)`,
								pointerEvents: 'none'
							}}
						/>
					)}
					<StyledHeaderSection>
						<StyledLabel>Player Name</StyledLabel>
						<StyledValue>{characterData.finalPlayerName || 'Unknown'}</StyledValue>
						<StyledLabel style={{ marginTop: '0.5rem' }}>Character Name</StyledLabel>
						<StyledValue
							style={{
								color: (currentValues as any)?.isDead ? '#8B0000' : undefined,
								textDecoration: (currentValues as any)?.isDead ? 'line-through' : undefined,
								textDecorationColor: (currentValues as any)?.isDead ? '#8B0000' : undefined,
								textDecorationThickness: (currentValues as any)?.isDead ? '2px' : undefined,
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem'
							}}
						>
							{(currentValues as any)?.isDead && (
								<span
									style={{
										fontSize: '1.5rem',
										color: '#8B0000',
										animation: 'pulse 2s infinite'
									}}
								>
									💀
								</span>
							)}
							{characterData.finalName}
							{(currentValues as any)?.isDead && (
								<span
									style={{
										fontSize: '1.5rem',
										color: '#8B0000',
										animation: 'pulse 2s infinite'
									}}
								>
									💀
								</span>
							)}
						</StyledValue>
						{(currentValues as any)?.isDead && (
							<div
								style={{
									color: '#8B0000',
									fontWeight: 'bold',
									fontSize: '1rem',
									marginTop: '0.25rem',
									textAlign: 'center'
								}}
							>
								💀 DEAD 💀
							</div>
						)}
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
						<StyledValue>{characterData.level}</StyledValue>
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
								languages={languages}
							/>
						</StyledLeftColumn>

						{/* Middle Column - Resources, Combat, and Core Stats */}
						<StyledMiddleColumn>
							{/* Resources Section - Circular design like official sheet */}
							<Resources isMobile={false} />

							{/* Defenses - Shield-like design */}
							<Defenses isMobile={false} />

							{/* Combat Section */}
							<Combat />

							{/* Death & Exhaustion */}
							<DeathExhaustion />

							{/* Attacks Section */}
							<Attacks onAttackClick={openAttackPopup} />

							{/* Inventory */}
							<Inventory onItemClick={openInventoryPopup} />

							{/* Player Notes */}
							<PlayerNotes />
						</StyledMiddleColumn>

						{/* Right Column - Movement, Resources, Inventory, Features */}
						<StyledRightColumn>
							{/* Movement & Utility */}
							<Movement />

							{/* Resources */}
							<RightColumnResources />

							{/* Features */}
							<Features onFeatureClick={openFeaturePopup} />

							{/* Currency Section */}
							<Currency />
						</StyledRightColumn>
					</StyledMainGrid>
				)}

				{/* Spells Section - Full width, after main content */}
				{characterData.className && findClassByName(characterData.className)?.spellcastingPath && (
					<div
						style={{
							marginTop: '2rem',
							padding: '1rem',
							background: 'white',
							borderRadius: '8px',
							border: '2px solid #e0e0e0'
						}}
					>
						<h2 style={{ color: '#2c3e50', marginBottom: '1rem', textAlign: 'center' }}>Spells</h2>
						<Spells onSpellClick={openSpellPopup} readOnly={true} />
					</div>
				)}

				{/* Maneuvers Section - Full width, after main content */}
				{characterData.className && findClassByName(characterData.className)?.martialPath && (
					<div
						style={{
							marginTop: '2rem',
							padding: '1rem',
							background: 'white',
							borderRadius: '8px',
							border: '2px solid #e0e0e0'
						}}
					>
						<h2 style={{ color: '#2c3e50', marginBottom: '1rem', textAlign: 'center' }}>
							Maneuvers
						</h2>
						<Maneuvers onManeuverClick={openManeuverPopup} />
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
									languages={languages}
								/>
								<Features onFeatureClick={openFeaturePopup} />
							</div>
						)}

						{/* Combat Tab - Mobile */}
						{activeMobileSection === 'combat' && (
							<div>
								<Resources isMobile={true} />
								<Defenses isMobile={true} />
								<Combat />
								<DeathExhaustion />
								<Spells onSpellClick={openSpellPopup} />
								<Attacks onAttackClick={openAttackPopup} />
								{characterData.className &&
									findClassByName(characterData.className)?.spellcastingPath && (
										<Spells onSpellClick={openSpellPopup} readOnly={true} />
									)}
								{characterData.className &&
									findClassByName(characterData.className)?.martialPath && (
										<Maneuvers onManeuverClick={openManeuverPopup} />
									)}
								<Movement />
								<RightColumnResources />
							</div>
						)}

						{/* Items Tab - Mobile */}
						{activeMobileSection === 'features' && (
							<div>
								<Inventory onItemClick={openInventoryPopup} />
								<Currency />
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
										<StyledValue>{characterData.level}</StyledValue>
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
								<PlayerNotes />
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
										<div
											key={index}
											style={{
												marginTop: '0.5rem',
												padding: '0.5rem',
												backgroundColor: '#f5f5f5',
												borderRadius: '4px'
											}}
										>
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
