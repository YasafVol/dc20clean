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
	InventoryItemData
} from '../../types';

// Import new component modules
import LeftColumn from './components/LeftColumn';
import Currency from './components/Currency';
import Resources from './components/Resources';
import Defenses from './components/Defenses';
import Combat from './components/Combat';
import Attacks from './components/Attacks';
import Inventory from './components/Inventory';
import Features from './components/Features';
import Movement from './components/Movement';
import RightColumnResources from './components/RightColumnResources';
import DeathExhaustion from './components/DeathExhaustion';

// Import rules data
import { skillsData } from '../../lib/rulesdata/skills';
import { tradesData } from '../../lib/rulesdata/trades';
import { knowledgeData } from '../../lib/rulesdata/knowledge';
import { traitsData } from '../../lib/rulesdata/traits';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { ancestriesData } from '../../lib/rulesdata/ancestries';

// Import styled components
import {
	StyledContainer,
	StyledBackButton,
	StyledCharacterSheet,
	StyledMidBorder,
	StyledInnerBorder,
	StyledCornerDecoration,
	StyledMainGrid,
	StyledMiddleColumn,
	StyledRightColumn
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

// Save character current values back to localStorage
const saveCharacterData = (characterId: string, currentValues: CurrentValues) => {
	const savedCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');
	const characterIndex = savedCharacters.findIndex((char: any) => char.id === characterId);

	if (characterIndex !== -1) {
		// Update the character's current values
		savedCharacters[characterIndex] = {
			...savedCharacters[characterIndex],
			currentHP: currentValues.currentHP,
			currentSP: currentValues.currentSP,
			currentMP: currentValues.currentMP,
			currentGritPoints: currentValues.currentGritPoints,
			currentRestPoints: currentValues.currentRestPoints,
			tempHP: currentValues.tempHP,
			actionPointsUsed: currentValues.actionPointsUsed,
			exhaustionLevel: currentValues.exhaustionLevel,
			lastModified: new Date().toISOString()
		};

		localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
		console.log('Character saved to localStorage. Total characters:', savedCharacters.length);
	}
};

const CharacterSheet: React.FC<CharacterSheetProps> = ({ characterId, onBack }) => {
	const [characterData, setCharacterData] = useState<CharacterSheetData | null>(null);
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
	const [attacks, setAttacks] = useState<AttackData[]>([
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
	]);
	const [inventory, setInventory] = useState<InventoryItemData[]>([]);

	// Load character data
	useEffect(() => {
		const loadCharacterData = async () => {
			try {
				setLoading(true);
				setError(null);

				const data = await getCharacterData(characterId);
				setCharacterData(data);

				// Initialize current values - use saved values if they exist, otherwise use max values
				const initialValues = {
					currentHP: data.currentHP !== undefined ? data.currentHP : data.finalHPMax,
					currentSP: data.currentSP !== undefined ? data.currentSP : data.finalSPMax,
					currentMP: data.currentMP !== undefined ? data.currentMP : data.finalMPMax,
					currentGritPoints:
						data.currentGritPoints !== undefined ? data.currentGritPoints : data.finalGritPoints,
					currentRestPoints:
						data.currentRestPoints !== undefined ? data.currentRestPoints : data.finalRestPoints,
					tempHP: data.tempHP || 0,
					actionPointsUsed: data.actionPointsUsed || 0,
					exhaustionLevel: data.exhaustionLevel || 0,
					// Currency - default to 0 if not saved
					goldPieces: 0,
					silverPieces: 0,
					copperPieces: 0,
					electrumPieces: 0,
					platinumPieces: 0
				};

				console.log('Character data loaded:', {
					finalSPMax: data.finalSPMax,
					currentSP: data.currentSP,
					initialSP: initialValues.currentSP
				});

				setCurrentValues(initialValues);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
			} finally {
				setLoading(false);
			}
		};

		loadCharacterData();
	}, [characterId]);

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

	// Parse skills data from character - show ALL skills with their proficiency levels
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
		return skillsData.map((skill) => ({
			id: skill.id,
			name: skill.name,
			attribute: skill.attributeAssociation,
			proficiency: characterSkills[skill.id] || 0 // Default to 0 if not found
		}));
	};

	// Parse trades data from character - show ONLY selected trades with their proficiency levels
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
			.map((trade) => ({
				id: trade.id,
				name: trade.name,
				proficiency: characterTrades[trade.id] || 0
			}));
	};

	// Parse knowledge data from character - show ALL knowledge with their proficiency levels
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

		// Show ALL knowledge skills with their proficiency levels
		return knowledgeData.map((knowledge) => ({
			id: knowledge.id,
			name: knowledge.name,
			proficiency: characterTrades[knowledge.id] || 0 // Default to 0 if not found
		}));
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

		// Get class features
		const selectedClass = classesData.find((c) => c.name === characterData.className);
		if (selectedClass) {
			// Add level 1 features
			selectedClass.level1Features?.forEach((feature: any) => {
				features.push({
					id: feature.id,
					name: feature.name,
					description: feature.description,
					source: 'class',
					sourceDetail: `${selectedClass.name} (Lvl 1)`
				});
			});

			// Add selected feature choices
			if (characterData.selectedFeatureChoices) {
				try {
					const selectedChoices: { [key: string]: string } = JSON.parse(
						characterData.selectedFeatureChoices
					);
					selectedClass.featureChoicesLvl1?.forEach((choice: any) => {
						const selectedOptionValue = selectedChoices[choice.id];
						if (selectedOptionValue) {
							const selectedOption = choice.options?.find(
								(opt: any) => opt.value === selectedOptionValue
							);
							if (selectedOption) {
								features.push({
									id: `${choice.id}_${selectedOptionValue}`,
									name: selectedOption.label,
									description: selectedOption.description || 'Feature choice selected.',
									source: 'choice',
									sourceDetail: `${selectedClass.name} (Choice)`
								});
							}
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

	// Currency management function
	const handleCurrencyChange = (currency: string, value: number) => {
		setCurrentValues((prev) => ({
			...prev,
			[currency]: value
		}));
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
		<StyledContainer>
			<StyledBackButton onClick={onBack}>← Back to Menu</StyledBackButton>

			<StyledCharacterSheet>
				<StyledMidBorder>
					<StyledInnerBorder>
						{/* Corner decorations */}
						<StyledCornerDecoration position="top-left" />
						<StyledCornerDecoration position="top-right" />
						<StyledCornerDecoration position="bottom-left" />
						<StyledCornerDecoration position="bottom-right" />
						
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

				{/* Main Grid - DC20 Official Layout */}
				<StyledMainGrid>
					{/* Left Column - Attributes with Skills */}
					<LeftColumn
						characterData={characterData}
						skillsByAttribute={skillsByAttribute}
						knowledge={knowledge}
						trades={trades}
						languages={languages}
					/>

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
						/>

						{/* Defenses - Shield-like design */}
						<Defenses characterData={characterData} />

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

						{/* Attacks Section */}
						<Attacks attacks={attacks} setAttacks={setAttacks} characterData={characterData} />

						{/* Inventory */}
						<Inventory inventory={inventory} setInventory={setInventory} />
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
					</StyledInnerBorder>
				</StyledMidBorder>
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
		</StyledContainer>
	);
};

export default CharacterSheet;
