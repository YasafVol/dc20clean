import React, { useState } from 'react';
import { useCharacterSheet, useCharacterKnowledge, useCharacterLanguages, useCharacterTrades, useCharacterResources, useCharacterFeatures, useCharacterCurrency, useCharacterAttacks, useCharacterSpells, useCharacterManeuvers, useCharacterInventory } from './hooks/CharacterSheetProvider';
import { allSpells } from '../../lib/rulesdata/spells-data/spells';
import { weapons, allItems } from '../../lib/rulesdata/inventoryItems';
import { allManeuvers } from '../../lib/rulesdata/maneuvers';
import { skillsData } from '../../lib/rulesdata/skills';
import { calculateDeathThreshold, getDeathSteps } from '../../lib/rulesdata/death';

// Import Modal Components  
import FeaturePopup from './components/FeaturePopup';
import SpellPopup from './components/SpellPopup';
import AttackPopup from './components/AttackPopup';
import InventoryPopup from './components/InventoryPopup';

// Mobile-specific styled components
import styled from 'styled-components';

const MobileContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	background: #1a1a1a;
	color: white;
	width: 100vw;
	max-width: 100vw;
	overflow-x: hidden;
	box-sizing: border-box;
	contain: layout;
	position: relative;
`;

const MobileHeader = styled.div`
	background: #2a2a2a;
	padding: 1rem;
	text-align: center;
	border-bottom: 2px solid #444;
`;

const MobileCharacterName = styled.h1`
	margin: 0;
	font-size: 1.5rem;
	color: #f5d020;
`;

const MobileCharacterInfo = styled.p`
	margin: 0.5rem 0 0 0;
	font-size: 1rem;
	color: #ccc;
`;

const MobileNavigation = styled.div`
	display: flex;
	background: #333;
	border-top: 1px solid #444;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	width: 100%;
	max-width: 100vw;
	box-sizing: border-box;
	padding-bottom: env(safe-area-inset-bottom);
	min-height: calc(60px + env(safe-area-inset-bottom));
`;

const MobileNavButton = styled.button<{ $active: boolean }>`
	flex: 1;
	max-width: 25vw;
	padding: 0.75rem 0.25rem;
	background: ${props => props.$active ? '#f5d020' : '#333'};
	color: ${props => props.$active ? '#000' : '#fff'};
	border: none;
	font-size: 0.8rem;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.2s;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	min-width: 0;
	box-sizing: border-box;

	&:hover {
		background: ${props => props.$active ? '#f5d020' : '#444'};
	}
`;

const MobileContent = styled.div`
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 1rem;
	padding-bottom: calc(7rem + env(safe-area-inset-bottom)); /* Extra space to account for fixed bottom navigation + safe area */
	width: 100vw;
	max-width: 100vw;
	box-sizing: border-box;
	contain: layout;
	position: relative;
`;

const MobileSection = styled.div`
	margin-bottom: 2rem;
	width: 100%;
	max-width: 100vw;
	overflow: hidden;
	box-sizing: border-box;
`;

const MobileSectionTitle = styled.h2`
	color: #f5d020;
	font-size: 1.25rem;
	margin-bottom: 1rem;
	border-bottom: 1px solid #444;
	padding-bottom: 0.5rem;
`;

const MobileStatGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 0.75rem;
	margin-bottom: 1.5rem;
	width: 100%;
	max-width: 100vw;
	overflow: hidden;
	box-sizing: border-box;
`;

const MobileStatBox = styled.div`
	background: #2a2a2a;
	padding: 1rem;
	border-radius: 8px;
	text-align: center;
	border: 1px solid #444;
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	box-sizing: border-box;
`;

const MobileSkillsList = styled.div`
	margin-top: 8px;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	padding-top: 8px;
`;

const MobileSkillItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 13px;
	margin: 3px 0;
	opacity: 0.8;
	
	&:hover {
		opacity: 1;
	}
`;

const MobileSkillName = styled.span`
	text-align: left;
	flex: 1;
`;

const MobileSkillValue = styled.span`
	color: #f5d020;
	font-weight: bold;
	margin-left: 8px;
`;

const MobileStatLabel = styled.div`
	font-size: 0.8rem;
	color: #ccc;
	margin-bottom: 0.25rem;
`;

const MobileStatValue = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
	color: #f5d020;
`;

const MobileResourceBox = styled.div`
	background: #2a2a2a;
	border: 1px solid #444;
	border-radius: 8px;
	padding: 1rem;
	margin-bottom: 1rem;
`;

const MobileResourceHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
`;

const MobileResourceLabel = styled.div`
	font-weight: bold;
	color: #f5d020;
`;

const MobileResourceValue = styled.div`
	color: #ccc;
`;

const MobileResourceBar = styled.div`
	width: 100%;
	height: 8px;
	background: #444;
	border-radius: 4px;
	overflow: hidden;
	margin-bottom: 0.5rem;
`;

const MobileResourceFill = styled.div<{ $percentage: number }>`
	width: ${props => props.$percentage}%;
	height: 100%;
	background: linear-gradient(90deg, #4CAF50, #8BC34A);
	transition: width 0.3s ease;
`;

const MobileResourceControls = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

const MobileResourceButton = styled.button`
	width: 40px;
	height: 40px;
	border: none;
	background: #444;
	color: white;
	border-radius: 4px;
	font-size: 1.2rem;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background: #555;
	}

	&:active {
		background: #666;
	}
`;

const MobileResourceInput = styled.input`
	flex: 1;
	padding: 0.5rem;
	background: #333;
	border: 1px solid #555;
	color: white;
	text-align: center;
	border-radius: 4px;
`;

const MobileItemGrid = styled.div`
	display: grid;
	gap: 0.75rem;
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	box-sizing: border-box;
`;

const MobileItem = styled.div`
	background: #2a2a2a;
	border: 1px solid #444;
	border-radius: 8px;
	padding: 1rem;
	cursor: pointer;
	transition: all 0.2s;
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	box-sizing: border-box;

	&:hover {
		background: #333;
		border-color: #f5d020;
	}
`;

const MobileItemName = styled.div`
	font-weight: bold;
	color: #f5d020;
	margin-bottom: 0.25rem;
	word-wrap: break-word;
	overflow-wrap: break-word;
	hyphens: auto;
`;

const MobileItemDetails = styled.div`
	font-size: 0.9rem;
	color: #ccc;
	word-wrap: break-word;
	overflow-wrap: break-word;
	hyphens: auto;
`;

type MobileSectionType = 'character' | 'combat' | 'features' | 'info';

interface CharacterSheetMobileProps {
	characterId: string;
}

export const CharacterSheetMobile: React.FC<CharacterSheetMobileProps> = ({ characterId }) => {
	// Use Context hooks
	const { 
		state, 
		updateHP, 
		updateSP, 
		updateMP, 
		updateTempHP, 
		updateActionPoints, 
		updateCurrency, 
		updateExhaustion, 
		updateDeathStep,
		updateNotes,
		addAttack,
		removeAttack,
		updateAttack,
		addSpell,
		removeSpell,
		updateSpell,
		addManeuver,
		removeManeuver,
		updateInventory
	} = useCharacterSheet();
	const resources = useCharacterResources();
	const features = useCharacterFeatures();
	const currency = useCharacterCurrency();
	const attacks = useCharacterAttacks();
	const spells = useCharacterSpells();
	const maneuvers = useCharacterManeuvers();
	const inventory = useCharacterInventory();
	const knowledge = useCharacterKnowledge();
	const trades = useCharacterTrades();
	const languages = useCharacterLanguages();
	
	// Local state
	const [activeMobileSection, setActiveMobileSection] = useState<'character' | 'combat' | 'features' | 'info'>('character');
	const [selectedFeature, setSelectedFeature] = useState<any>(null);
	const [selectedSpell, setSelectedSpell] = useState<any>(null);
	const [selectedAttack, setSelectedAttack] = useState<any>(null);
	const [selectedInventoryItem, setSelectedInventoryItem] = useState<any>(null);
	
	// Helper function to get skills for an attribute with calculated values
	const getSkillsForAttribute = (attribute: string) => {
		if (!characterData) return [];
		
		return skillsData
			.filter(skill => skill.attributeAssociation?.toLowerCase() === attribute.toLowerCase())
			.map(skill => {
				const proficiency = characterData?.skillsData?.[skill.id] || 0;
				let attributeMod = 0;
				
				// Get the correct attribute modifier
				const attrLower = skill.attributeAssociation?.toLowerCase();
				switch (attrLower) {
					case 'might':
						attributeMod = characterData?.finalMight || 0;
						break;
					case 'agility':
						attributeMod = characterData?.finalAgility || 0;
						break;
					case 'charisma':
						attributeMod = characterData?.finalCharisma || 0;
						break;
					case 'intelligence':
						attributeMod = characterData?.finalIntelligence || 0;
						break;
					case 'prime':
						attributeMod = characterData?.finalPrimeModifierValue || 0;
						break;
					default:
						attributeMod = 0;
				}
				
				// Calculate final skill value: attribute modifier + proficiency
				const finalValue = attributeMod + proficiency;
				
				return {
					...skill,
					proficiency,
					attributeMod,
					finalValue
				};
			});
	};
	
	// Helper functions
	const adjustResource = (resource: string, amount: number) => {
		if (!resources) return;
		const current = resources?.current;
		
		switch (resource) {
			case 'currentHP':
				updateHP(Math.max(0, current.currentHP + amount));
				break;
			case 'currentSP':
				updateSP(Math.max(0, current.currentSP + amount));
				break;
			case 'currentMP':
				updateMP(Math.max(0, current.currentMP + amount));
				break;
			case 'tempHP':
				updateTempHP(Math.max(0, current.tempHP + amount));
				break;
			case 'actionPointsUsed':
				updateActionPoints(Math.max(0, Math.min(4, current.actionPointsUsed + amount)));
				break;
		}
	};
	
	const handleResourceInputChange = (resource: string, value: string) => {
		const numValue = parseInt(value) || 0;
		switch (resource) {
			case 'currentHP':
				updateHP(Math.max(0, numValue));
				break;
			case 'currentSP':
				updateSP(Math.max(0, numValue));
				break;
			case 'currentMP':
				updateMP(Math.max(0, numValue));
				break;
			case 'tempHP':
				updateTempHP(Math.max(0, numValue));
				break;
		}
	};
	
	const handleCurrencyChange = (currencyType: string, value: number) => {
		const updates: any = {};
		updates[currencyType.replace('Pieces', '')] = value;
		updateCurrency(updates.gold, updates.silver, updates.copper);
	};
	
	const getFillPercentage = (current: number, max: number) => {
		return max > 0 ? (current / max) * 100 : 0;
	};
	
	const getHPFillPercentage = (current: number, max: number, temp: number) => {
		return max > 0 ? ((current + temp) / max) * 100 : 0;
	};
	
	// Popup handlers
	const openFeaturePopup = (feature: any) => setSelectedFeature(feature);
	const closeFeaturePopup = () => setSelectedFeature(null);
	const openSpellPopup = (spellData: any) => {
		// Convert SpellData to Spell by looking up in allSpells
		if (spellData.spellName) {
			const fullSpell = allSpells.find(s => s.name === spellData.spellName);
			if (fullSpell) {
				setSelectedSpell(fullSpell);
			} else {
				console.warn('Could not find spell in allSpells:', spellData.spellName);
				setSelectedSpell(null);
			}
		} else {
			setSelectedSpell(null);
		}
	};
	const closeSpellPopup = () => setSelectedSpell(null);
	const openAttackPopup = (attack: any) => {
		// Find the weapon data that matches this attack
		const weapon = weapons.find(w => w.name === attack.weaponName) || null;
		setSelectedAttack({ attack, weapon });
	};
	const closeAttackPopup = () => setSelectedAttack(null);
	const openInventoryPopup = (data: any) => {
		// Handle both direct structure and separate parameters
		if (data.inventoryData && data.item !== undefined) {
			// Called with { inventoryData, item } structure
			setSelectedInventoryItem(data);
		} else {
			// Called with just inventory data (fallback)
			setSelectedInventoryItem(data);
		}
	};
	const closeInventoryPopup = () => setSelectedInventoryItem(null);
	

	const exhaustionLevels = [
		{ level: 1, description: 'Fatigued: -1 to all Checks and Saves' },
		{ level: 2, description: 'Exhausted: -2 to all Checks and Saves' },
		{ level: 3, description: 'Debilitated: -3 to all Checks and Saves, Speed halved' },
		{ level: 4, description: 'Incapacitated: -4 to all Checks and Saves, Speed quartered' },
		{ level: 5, description: 'Unconscious: Helpless, cannot take actions' }
	];

	// Exhaustion level handler with proper functionality
	const handleExhaustionChange = (level: number) => {
		// Toggle logic: if clicking current level, go to 0, otherwise set to clicked level
		const currentLevel = resources?.current?.exhaustionLevel || 0;
		const newLevel = currentLevel === level ? 0 : level;
		updateExhaustion(newLevel);
	};
	
	// Death step handler with proper functionality  
	const handleDeathStepChange = (step: number) => {
		if (!characterData) return;
		
		// Calculate death threshold and max steps
		const deathThreshold = calculateDeathThreshold(
			characterData.finalPrimeModifierValue,
			characterData.finalCombatMastery
		);
		const deathStepsInfo = getDeathSteps(resources?.current?.currentHP || 0, deathThreshold);
		
		// Get current step (manual tracking or calculated)
		const currentStep = (resources?.current?.deathSteps || 0) > 0 ? 
			(resources?.current?.deathSteps || 0) : deathStepsInfo.currentStep;
		
		// Toggle logic: if clicking current step, go to previous step, otherwise set to clicked step
		const newStep = currentStep === step ? Math.max(0, step - 1) : step;
		
		// Check if clicking on final step should mark as dead
		const isDead = newStep === deathStepsInfo.maxSteps;
		
		// Update the death step in state
		updateDeathStep(newStep, isDead);
	};

	// Helper functions to add new items
	const handleAddAttack = () => {
		// Create a pending attack entry with dropdown
		const pendingAttack = {
			id: Date.now().toString(),
			name: '', // Empty until selected
			weaponName: '',
			attackBonus: 0,
			damage: '',
			damageType: '',
			critRange: '',
			critDamage: '',
			brutalDamage: '',
			heavyHitEffect: '',
			isPending: true // Flag to indicate this needs selection
		};
		addAttack(pendingAttack);
	};

	// Handle selecting a weapon from dropdown for pending entries
	const handleWeaponSelection = (attackId: string, selectedWeaponName: string) => {
		const selectedWeapon = weapons.find(w => w.name === selectedWeaponName);
		if (selectedWeapon) {
			// Find the current attack to update
			const currentAttack = attacks.find(a => a.id === attackId);
			if (currentAttack) {
				const updatedAttack = {
					...currentAttack,
					name: selectedWeapon.name,
					weaponName: selectedWeapon.name,
					damage: selectedWeapon.damage || '1d6',
					damageType: 'slashing', // Default damage type
					isPending: false
				};
				updateAttack(attackId, updatedAttack);
			}
		}
	};

	const handleAddSpell = () => {
		// Create a pending spell entry with dropdown
		const pendingSpell = {
			id: Date.now().toString(),
			spellName: '', // Empty until selected
			school: '',
			level: 1,
			castingTime: '',
			range: '',
			duration: '',
			description: '',
			isPending: true // Flag to indicate this needs selection
		};
		addSpell(pendingSpell);
	};

	// Handle selecting a spell from dropdown for pending entries
	const handleSpellSelection = (spellId: string, selectedSpellName: string) => {
		const selectedSpell = allSpells.find(s => s.name === selectedSpellName);
		if (selectedSpell) {
			// Update all spell properties
			updateSpell(spellId, 'spellName', selectedSpell.name);
			updateSpell(spellId, 'school', selectedSpell.school);
			updateSpell(spellId, 'level', selectedSpell.isCantrip ? 0 : 1);
			updateSpell(spellId, 'castingTime', 'Action');
			updateSpell(spellId, 'range', selectedSpell.range);
			updateSpell(spellId, 'duration', selectedSpell.duration);
			updateSpell(spellId, 'description', selectedSpell.effects.map(e => e.description).join(' '));
			updateSpell(spellId, 'isPending', false);
		}
	};

	const handleAddManeuver = () => {
		// Create a pending maneuver entry with dropdown
		const pendingManeuver = {
			id: Date.now().toString(),
			name: '', // Empty until selected
			type: '',
			cost: '',
			description: '',
			isReaction: false,
			isPending: true // Flag to indicate this needs selection
		};
		addManeuver(pendingManeuver);
	};

	// Handle selecting a maneuver from dropdown for pending entries
	const handleManeuverSelection = (maneuverId: string, selectedManeuverName: string) => {
		const selectedManeuver = allManeuvers.find(m => m.name === selectedManeuverName);
		if (selectedManeuver) {
			// Remove the pending maneuver and add the selected one
			removeManeuver(maneuverId);
			const newManeuver = {
				id: maneuverId, // Keep the same ID
				name: selectedManeuver.name,
				type: selectedManeuver.type,
				cost: selectedManeuver.cost.toString(),
				description: selectedManeuver.description,
				isReaction: selectedManeuver.isReaction || false,
				isPending: false
			};
			addManeuver(newManeuver);
		}
	};

	const handleAddInventoryItem = () => {
		console.log('Adding new inventory item...');
		const currentItems = inventory.items || [];
		const pendingItem = {
			id: Date.now().toString(),
			name: '', // Empty until selected
			quantity: 1,
			weight: 0,
			description: '',
			category: '',
			isPending: true // Critical flag for pending state
		};
		updateInventory([...currentItems, pendingItem]);
	};

	// Handle inventory item selection from rules data
	const handleInventorySelection = (itemId: string, selectedItemName: string) => {
		const selectedItem = allItems.find(item => item.name === selectedItemName);
		if (selectedItem) {
			const currentItems = inventory.items || [];
			const updatedItems = currentItems.map(item => {
				if (item.id === itemId) {
					return {
						...item,
						name: selectedItem.name,
						category: selectedItem.itemType,
						description: (selectedItem as any).description || '',
						weight: (selectedItem as any).weight || 0,
						isPending: false // Mark as completed
					};
				}
				return item;
			});
			updateInventory(updatedItems);
		}
	};

	// Helper function to remove inventory items
	const handleRemoveInventoryItem = (itemId: string) => {
		const currentItems = inventory.items || [];
		const updatedItems = currentItems.filter((item: any) => item.id !== itemId);
		updateInventory(updatedItems);
	};
	
	const loading = state.loading;
	const error = state.error;
	const characterData = state.character;

	// Loading state
	if (loading) {
		return (
			<MobileContainer>
				<MobileContent>Loading character data...</MobileContent>
			</MobileContainer>
		);
	}

	// Error state
	if (error) {
		return (
			<MobileContainer>
				<MobileContent>Error: {error}</MobileContent>
			</MobileContainer>
		);
	}

	// No character data
	if (!characterData) {
		return (
			<MobileContainer>
				<MobileContent>Character not found</MobileContent>
			</MobileContainer>
		);
	}

	const renderCharacterSection = () => (
		<MobileContent>
			{/* Character Stats */}
			<MobileSection>
				<MobileSectionTitle>Attributes</MobileSectionTitle>
				<MobileStatGrid>
					<MobileStatBox>
						<MobileStatLabel>Might</MobileStatLabel>
						<MobileStatValue>{characterData.finalMight}</MobileStatValue>
						<MobileSkillsList>
							{getSkillsForAttribute('might').map(skill => (
								<MobileSkillItem key={skill.id}>
									<MobileSkillName>{skill.name}</MobileSkillName>
									<MobileSkillValue>+{skill.finalValue}</MobileSkillValue>
								</MobileSkillItem>
							))}
						</MobileSkillsList>
					</MobileStatBox>
					<MobileStatBox>
						<MobileStatLabel>Agility</MobileStatLabel>
						<MobileStatValue>{characterData.finalAgility}</MobileStatValue>
						<MobileSkillsList>
							{getSkillsForAttribute('agility').map(skill => (
								<MobileSkillItem key={skill.id}>
									<MobileSkillName>{skill.name}</MobileSkillName>
									<MobileSkillValue>+{skill.finalValue}</MobileSkillValue>
								</MobileSkillItem>
							))}
						</MobileSkillsList>
					</MobileStatBox>
					<MobileStatBox>
						<MobileStatLabel>Charisma</MobileStatLabel>
						<MobileStatValue>{characterData.finalCharisma}</MobileStatValue>
						<MobileSkillsList>
							{getSkillsForAttribute('charisma').map(skill => (
								<MobileSkillItem key={skill.id}>
									<MobileSkillName>{skill.name}</MobileSkillName>
									<MobileSkillValue>+{skill.finalValue}</MobileSkillValue>
								</MobileSkillItem>
							))}
						</MobileSkillsList>
					</MobileStatBox>
					<MobileStatBox>
						<MobileStatLabel>Intelligence</MobileStatLabel>
						<MobileStatValue>{characterData.finalIntelligence}</MobileStatValue>
						<MobileSkillsList>
							{getSkillsForAttribute('intelligence').map(skill => (
								<MobileSkillItem key={skill.id}>
									<MobileSkillName>{skill.name}</MobileSkillName>
									<MobileSkillValue>+{skill.finalValue}</MobileSkillValue>
								</MobileSkillItem>
							))}
						</MobileSkillsList>
					</MobileStatBox>
					<MobileStatBox>
						<MobileStatLabel>Prime</MobileStatLabel>
						<MobileStatValue>{characterData.finalPrimeModifierValue}</MobileStatValue>
						<MobileSkillsList>
							{getSkillsForAttribute('prime').map(skill => (
								<MobileSkillItem key={skill.id}>
									<MobileSkillName>{skill.name}</MobileSkillName>
									<MobileSkillValue>+{skill.finalValue}</MobileSkillValue>
								</MobileSkillItem>
							))}
						</MobileSkillsList>
					</MobileStatBox>
				</MobileStatGrid>
			</MobileSection>

			{/* Resources */}
			<MobileSection>
				<MobileSectionTitle>Resources</MobileSectionTitle>
				
				{/* HP */}
				<MobileResourceBox>
					<MobileResourceHeader>
						<MobileResourceLabel>Hit Points</MobileResourceLabel>
						<MobileResourceValue>
							{resources?.current.currentHP} / {resources?.original.maxHP}
							{resources?.current.tempHP > 0 && ` (+${resources?.current.tempHP} temp)`}
						</MobileResourceValue>
					</MobileResourceHeader>
					<MobileResourceBar>
						<MobileResourceFill
							$percentage={resources ? getHPFillPercentage(
								resources?.current.currentHP,
								resources?.original.maxHP,
								resources?.current.tempHP
							) : 0}
						/>
					</MobileResourceBar>
					<MobileResourceControls>
						<MobileResourceButton onClick={() => adjustResource('currentHP', -1)}>-</MobileResourceButton>
						<MobileResourceInput
							type="number"
							value={resources?.current.currentHP || 0}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentHP', e.target.value)}
						/>
						<MobileResourceButton onClick={() => adjustResource('currentHP', 1)}>+</MobileResourceButton>
					</MobileResourceControls>
				</MobileResourceBox>

				{/* Temp HP */}
				<MobileResourceBox>
					<MobileResourceHeader>
						<MobileResourceLabel>Temporary HP</MobileResourceLabel>
						<MobileResourceValue>{resources?.current.tempHP}</MobileResourceValue>
					</MobileResourceHeader>
					<MobileResourceControls>
						<MobileResourceButton onClick={() => adjustResource('tempHP', -1)}>-</MobileResourceButton>
						<MobileResourceInput
							type="number"
							value={resources?.current.tempHP}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('tempHP', e.target.value)}
						/>
						<MobileResourceButton onClick={() => adjustResource('tempHP', 1)}>+</MobileResourceButton>
					</MobileResourceControls>
				</MobileResourceBox>

				{/* SP */}
				{characterData.finalSPMax > 0 && (
					<MobileResourceBox>
						<MobileResourceHeader>
							<MobileResourceLabel>Stamina Points</MobileResourceLabel>
							<MobileResourceValue>
								{resources?.current.currentSP} / {characterData.finalSPMax}
							</MobileResourceValue>
						</MobileResourceHeader>
						<MobileResourceBar>
							<MobileResourceFill
								$percentage={getFillPercentage(resources?.current.currentSP, characterData.finalSPMax)}
							/>
						</MobileResourceBar>
						<MobileResourceControls>
							<MobileResourceButton onClick={() => adjustResource('currentSP', -1)}>-</MobileResourceButton>
							<MobileResourceInput
								type="number"
								value={resources?.current.currentSP}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentSP', e.target.value)}
							/>
							<MobileResourceButton onClick={() => adjustResource('currentSP', 1)}>+</MobileResourceButton>
						</MobileResourceControls>
					</MobileResourceBox>
				)}

				{/* MP */}
				{characterData.finalMPMax > 0 && (
					<MobileResourceBox>
						<MobileResourceHeader>
							<MobileResourceLabel>Mana Points</MobileResourceLabel>
							<MobileResourceValue>
								{resources?.current.currentMP} / {characterData.finalMPMax}
							</MobileResourceValue>
						</MobileResourceHeader>
						<MobileResourceBar>
							<MobileResourceFill
								$percentage={getFillPercentage(resources?.current.currentMP, characterData.finalMPMax)}
							/>
						</MobileResourceBar>
						<MobileResourceControls>
							<MobileResourceButton onClick={() => adjustResource('currentMP', -1)}>-</MobileResourceButton>
							<MobileResourceInput
								type="number"
								value={resources?.current.currentMP}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentMP', e.target.value)}
							/>
							<MobileResourceButton onClick={() => adjustResource('currentMP', 1)}>+</MobileResourceButton>
						</MobileResourceControls>
					</MobileResourceBox>
				)}

				{/* Rest Points */}
				{(resources?.original?.maxRestPoints || 0) > 0 && (
					<MobileResourceBox>
						<MobileResourceHeader>
							<MobileResourceLabel>Rest Points</MobileResourceLabel>
							<MobileResourceValue>
								{resources?.current?.currentRestPoints || 0} / {resources?.original?.maxRestPoints || 0}
							</MobileResourceValue>
						</MobileResourceHeader>
						<MobileResourceControls>
							<MobileResourceButton onClick={() => adjustResource('currentRestPoints', -1)}>-</MobileResourceButton>
							<MobileResourceInput
								type="number"
								value={resources?.current?.currentRestPoints || 0}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentRestPoints', e.target.value)}
							/>
							<MobileResourceButton onClick={() => adjustResource('currentRestPoints', 1)}>+</MobileResourceButton>
						</MobileResourceControls>
					</MobileResourceBox>
				)}

				{/* Grit Points */}
				{(resources?.original?.maxGritPoints || 0) > 0 && (
					<MobileResourceBox>
						<MobileResourceHeader>
							<MobileResourceLabel>Grit Points</MobileResourceLabel>
							<MobileResourceValue>
								{resources?.current?.currentGritPoints || 0} / {resources?.original?.maxGritPoints || 0}
							</MobileResourceValue>
						</MobileResourceHeader>
						<MobileResourceControls>
							<MobileResourceButton onClick={() => adjustResource('currentGritPoints', -1)}>-</MobileResourceButton>
							<MobileResourceInput
								type="number"
								value={resources?.current?.currentGritPoints || 0}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleResourceInputChange('currentGritPoints', e.target.value)}
							/>
							<MobileResourceButton onClick={() => adjustResource('currentGritPoints', 1)}>+</MobileResourceButton>
						</MobileResourceControls>
					</MobileResourceBox>
				)}
			</MobileSection>

			{/* Currency */}
			<MobileSection>
				<MobileSectionTitle>Currency</MobileSectionTitle>
				<MobileStatGrid>
					<MobileStatBox>
						<MobileStatLabel>Gold</MobileStatLabel>
						<MobileResourceInput
							type="number"
							value={currency.gold}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('goldPieces', parseInt(e.target.value) || 0)}
						/>
					</MobileStatBox>
					<MobileStatBox>
						<MobileStatLabel>Silver</MobileStatLabel>
						<MobileResourceInput
							type="number"
							value={currency.silver}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('silverPieces', parseInt(e.target.value) || 0)}
						/>
					</MobileStatBox>
					<MobileStatBox>
						<MobileStatLabel>Copper</MobileStatLabel>
						<MobileResourceInput
							type="number"
							value={currency.copper}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrencyChange('copperPieces', parseInt(e.target.value) || 0)}
						/>
					</MobileStatBox>
				</MobileStatGrid>
			</MobileSection>

			{/* Inventory */}
			<MobileSection>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<MobileSectionTitle>Inventory</MobileSectionTitle>
					<button
						onClick={handleAddInventoryItem}
						style={{
							background: '#4a4a4a',
							color: '#f5d020',
							border: '1px solid #f5d020',
							borderRadius: '4px',
							padding: '4px 8px',
							fontSize: '12px',
							cursor: 'pointer'
						}}
					>
						+ Add Item
					</button>
				</div>
				{inventory.items && inventory.items.length > 0 && (
					<MobileItemGrid>
						{inventory.items.map((item: any) => (
							<MobileItem
								key={item.id}
								style={{ position: 'relative' }}
							>
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleRemoveInventoryItem(item.id);
									}}
									style={{
										position: 'absolute',
										top: '4px',
										right: '4px',
										background: '#dc3545',
										color: 'white',
										border: 'none',
										borderRadius: '50%',
										width: '20px',
										height: '20px',
										fontSize: '12px',
										cursor: 'pointer',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									×
								</button>
								{(item as any).isPending ? (
									// Show dropdown for pending inventory items
									<div style={{ padding: '8px' }}>
										<select
											style={{
												width: '100%',
												padding: '4px',
												border: '1px solid #f5d020',
												borderRadius: '4px',
												background: '#2a2a2a',
												color: '#f5d020',
												fontSize: '14px'
											}}
											value=""
											onChange={(e) => {
												if (e.target.value) {
													handleInventorySelection(item.id, e.target.value);
												}
											}}
										>
											<option value="">Select an item...</option>
											{allItems.map((ruleItem) => (
												<option key={ruleItem.name} value={ruleItem.name}>
													{ruleItem.name} ({ruleItem.itemType})
												</option>
											))}
										</select>
									</div>
								) : (
									// Show normal inventory item display
									<div onClick={() => openInventoryPopup({ inventoryData: inventory, item: item })}>
										<MobileItemName>{item.name}</MobileItemName>
										<MobileItemDetails>
											{item.quantity && <div>Qty: {item.quantity}</div>}
											{item.weight && <div>Weight: {item.weight}</div>}
										</MobileItemDetails>
									</div>
								)}
							</MobileItem>
						))}
					</MobileItemGrid>
				)}
			</MobileSection>
		</MobileContent>
	);

	const renderCombatSection = () => (
		<MobileContent>
			{/* Attacks */}
			<MobileSection>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<MobileSectionTitle>Attacks</MobileSectionTitle>
					<button
						onClick={handleAddAttack}
						style={{
							background: '#4a4a4a',
							color: '#f5d020',
							border: '1px solid #f5d020',
							borderRadius: '4px',
							padding: '4px 8px',
							fontSize: '12px',
							cursor: 'pointer'
						}}
					>
						+ Add Attack
					</button>
				</div>
				<MobileItemGrid>
					{attacks.map((attack) => (
						<MobileItem
							key={attack.id}
							style={{ position: 'relative' }}
						>
							<button
								onClick={(e) => {
									e.stopPropagation();
									removeAttack(attack.id);
								}}
								style={{
									position: 'absolute',
									top: '4px',
									right: '4px',
									background: '#dc3545',
									color: 'white',
									border: 'none',
									borderRadius: '50%',
									width: '20px',
									height: '20px',
									fontSize: '12px',
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								×
							</button>
							{(attack as any).isPending ? (
								// Show dropdown for pending attacks
								<div style={{ padding: '8px' }}>
									<select
										style={{
											width: '100%',
											padding: '4px',
											border: '1px solid #f5d020',
											borderRadius: '4px',
											background: '#2a2a2a',
											color: '#f5d020',
											fontSize: '14px'
										}}
										value=""
										onChange={(e) => {
											if (e.target.value) {
												handleWeaponSelection(attack.id, e.target.value);
											}
										}}
									>
										<option value="">Select a weapon...</option>
										{weapons.map((weapon) => (
											<option key={weapon.name} value={weapon.name}>
												{weapon.name} ({weapon.type})
											</option>
										))}
									</select>
								</div>
							) : (
								// Show normal attack display
								<div onClick={() => openAttackPopup(attack)}>
									<MobileItemName>{attack.name || 'Unnamed Attack'}</MobileItemName>
									<MobileItemDetails>
										{attack.weaponName && <div>Weapon: {attack.weaponName}</div>}
										{attack.damage && <div>Damage: {attack.damage}</div>}
										{attack.attackBonus !== 0 && <div>Bonus: +{attack.attackBonus}</div>}
									</MobileItemDetails>
								</div>
							)}
						</MobileItem>
					))}
				</MobileItemGrid>
			</MobileSection>

			{/* Spells */}
			<MobileSection>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<MobileSectionTitle>Spells</MobileSectionTitle>
					<button
						onClick={handleAddSpell}
						style={{
							background: '#4a4a4a',
							color: '#f5d020',
							border: '1px solid #f5d020',
							borderRadius: '4px',
							padding: '4px 8px',
							fontSize: '12px',
							cursor: 'pointer'
						}}
					>
						+ Add Spell
					</button>
				</div>
				{spells.length > 0 && (
					<MobileItemGrid>
						{spells.map((spell) => (
							<MobileItem
								key={spell.id}
								style={{ position: 'relative' }}
							>
								<button
									onClick={(e) => {
										e.stopPropagation();
										removeSpell(spell.id);
									}}
									style={{
										position: 'absolute',
										top: '4px',
										right: '4px',
										background: '#dc3545',
										color: 'white',
										border: 'none',
										borderRadius: '50%',
										width: '20px',
										height: '20px',
										fontSize: '12px',
										cursor: 'pointer',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									×
								</button>
								{(spell as any).isPending ? (
									// Show dropdown for pending spells
									<div style={{ padding: '8px' }}>
										<select
											style={{
												width: '100%',
												padding: '4px',
												border: '1px solid #f5d020',
												borderRadius: '4px',
												background: '#2a2a2a',
												color: '#f5d020',
												fontSize: '14px'
											}}
											value=""
											onChange={(e) => {
												if (e.target.value) {
													handleSpellSelection(spell.id, e.target.value);
												}
											}}
										>
											<option value="">Select a spell...</option>
											{allSpells.map((ruleSpell) => (
												<option key={ruleSpell.name} value={ruleSpell.name}>
													{ruleSpell.name} ({ruleSpell.school})
												</option>
											))}
										</select>
									</div>
								) : (
									// Show normal spell display
									<div onClick={() => openSpellPopup(spell)}>
										<MobileItemName>{spell.spellName || 'Unnamed Spell'}</MobileItemName>
										<MobileItemDetails>School: {spell.school || '?'}</MobileItemDetails>
									</div>
								)}
							</MobileItem>
						))}
					</MobileItemGrid>
				)}
			</MobileSection>

			{/* Maneuvers */}
			<MobileSection>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<MobileSectionTitle>Maneuvers</MobileSectionTitle>
					<button
						onClick={handleAddManeuver}
						style={{
							background: '#4a4a4a',
							color: '#f5d020',
							border: '1px solid #f5d020',
							borderRadius: '4px',
							padding: '4px 8px',
							fontSize: '12px',
							cursor: 'pointer'
						}}
					>
						+ Add Maneuver
					</button>
				</div>
				{maneuvers.length > 0 && (
					<MobileItemGrid>
						{maneuvers.map((maneuver) => (
							<MobileItem
								key={maneuver.id}
								style={{ position: 'relative' }}
							>
								<button
									onClick={(e) => {
										e.stopPropagation();
										removeManeuver(maneuver.id);
									}}
									style={{
										position: 'absolute',
										top: '4px',
										right: '4px',
										background: '#dc3545',
										color: 'white',
										border: 'none',
										borderRadius: '50%',
										width: '20px',
										height: '20px',
										fontSize: '12px',
										cursor: 'pointer',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									×
								</button>
								{(maneuver as any).isPending ? (
									// Show dropdown for pending maneuvers
									<div style={{ padding: '8px' }}>
										<select
											style={{
												width: '100%',
												padding: '4px',
												border: '1px solid #f5d020',
												borderRadius: '4px',
												background: '#2a2a2a',
												color: '#f5d020',
												fontSize: '14px'
											}}
											value=""
											onChange={(e) => {
												if (e.target.value) {
													handleManeuverSelection(maneuver.id, e.target.value);
												}
											}}
										>
											<option value="">Select a maneuver...</option>
											{allManeuvers.map((ruleManeuver) => (
												<option key={ruleManeuver.name} value={ruleManeuver.name}>
													{ruleManeuver.name} ({ruleManeuver.type})
												</option>
											))}
										</select>
									</div>
								) : (
									// Show normal maneuver display
									<div
										onClick={() => {
											// Show maneuver details in alert since we don't have ManeuverPopup yet
											const maneuverDetails = allManeuvers.find(m => m.name === maneuver.name);
											if (maneuverDetails) {
												const info = `${maneuverDetails.name}\n\nType: ${maneuverDetails.type}\nCost: ${maneuverDetails.cost}\n\nDescription: ${maneuverDetails.description}\n\nRequirement: ${maneuverDetails.requirement || 'None'}\nTrigger: ${maneuverDetails.trigger || 'N/A'}`;
												alert(info);
											} else {
												alert(`${maneuver.name}\n\nType: ${maneuver.type || '?'}\nCost: ${maneuver.cost || '?'}`);
											}
										}}
									>
										<MobileItemName>{maneuver.name || 'Unnamed Maneuver'}</MobileItemName>
										<MobileItemDetails>
											{maneuver.cost && <div>Cost: {maneuver.cost}</div>}
											{maneuver.type && <div>Type: {maneuver.type}</div>}
										</MobileItemDetails>
									</div>
								)}
							</MobileItem>
						))}
					</MobileItemGrid>
				)}
			</MobileSection>

			{/* Action Points */}
			<MobileSection>
				<MobileSectionTitle>Action Points Used</MobileSectionTitle>
				<MobileStatGrid>
					{[1, 2, 3, 4].map((point) => (
						<MobileStatBox
							key={point}
							style={{
								background: resources?.current?.actionPointsUsed >= point ? '#b8940a' : '#2a2a2a',
								color: resources?.current?.actionPointsUsed >= point ? '#fff' : '#f5d020',
								cursor: 'pointer'
							}}
							onClick={() =>
								adjustResource(
									'actionPointsUsed',
									resources?.current?.actionPointsUsed >= point ? -1 : 1
								)
							}
						>
							<MobileStatValue 
								style={{ 
									color: resources?.current?.actionPointsUsed >= point ? '#fff' : '#f5d020' 
								}}
							>
								{point}
							</MobileStatValue>
						</MobileStatBox>
					))}
				</MobileStatGrid>
			</MobileSection>

			{/* Exhaustion */}
			<MobileSection>
				<MobileSectionTitle>Exhaustion Level</MobileSectionTitle>
				<MobileStatGrid>
					{exhaustionLevels.map(({ level }) => (
						<MobileStatBox
							key={level}
							style={{
								background: (resources?.current?.exhaustionLevel || 0) >= level ? '#ff4444' : '#2a2a2a',
								color: (resources?.current?.exhaustionLevel || 0) >= level ? '#fff' : '#ccc',
								cursor: 'pointer',
								border: (resources?.current?.exhaustionLevel || 0) === level ? '2px solid #ffaa44' : 'none'
							}}
							onClick={() => handleExhaustionChange(level)}
						>
							<MobileStatValue>{level}</MobileStatValue>
						</MobileStatBox>
					))}
				</MobileStatGrid>
				{/* Show current exhaustion description */}
				{(resources?.current?.exhaustionLevel || 0) > 0 && (
					<div style={{ 
						padding: '0.5rem', 
						backgroundColor: '#333', 
						marginTop: '0.5rem', 
						borderRadius: '4px',
						fontSize: '0.8rem',
						color: '#ff4444'
					}}>
						{exhaustionLevels.find(e => e.level === (resources?.current?.exhaustionLevel || 0))?.description}
					</div>
				)}
			</MobileSection>

			{/* Health Status / Death Steps */}
			<MobileSection>
				<MobileSectionTitle>Death Steps</MobileSectionTitle>
				{(() => {
					if (!characterData) return null;
					
					const deathThreshold = calculateDeathThreshold(
						characterData.finalPrimeModifierValue,
						characterData.finalCombatMastery
					);
					const deathStepsInfo = getDeathSteps(resources?.current?.currentHP || 0, deathThreshold);
					
					// Only show death steps if character has any
					if (deathStepsInfo.maxSteps === 0) {
						return <div style={{ padding: '1rem', color: '#ccc', textAlign: 'center' }}>
							No death steps (above 0 HP)
						</div>;
					}
					
					// Use manual death step tracking if it exists, otherwise use calculated values
					const currentStep = (resources?.current?.deathSteps || 0) > 0 ? 
						(resources?.current?.deathSteps || 0) : deathStepsInfo.currentStep;
					const isDead = resources?.current?.isDead || deathStepsInfo.isDead;
					
					return (
						<>
							<MobileStatGrid>
								{Array.from({ length: deathStepsInfo.maxSteps }, (_, index) => {
									const step = index + 1;
									const isFilled = step <= currentStep;
									const isDeadStep = isDead && step === deathStepsInfo.maxSteps;
									
									return (
										<MobileStatBox
											key={step}
											style={{
												background: isFilled ? '#ff4444' : '#2a2a2a',
												color: isFilled ? '#fff' : '#ccc',
												cursor: 'pointer',
												border: step === currentStep ? '2px solid #ffaa44' : 'none'
											}}
											onClick={() => handleDeathStepChange(step)}
										>
											<MobileStatLabel>Step</MobileStatLabel>
											<MobileStatValue style={{
												color: isFilled ? '#fff' : '#ccc'
											}}>
												{isDeadStep ? '💀' : step}
											</MobileStatValue>
										</MobileStatBox>
									);
								})}
							</MobileStatGrid>
							<div style={{ 
								padding: '0.5rem', 
								backgroundColor: '#333', 
								marginTop: '0.5rem', 
								borderRadius: '4px',
								fontSize: '0.8rem',
								color: '#ff4444',
								textAlign: 'center'
							}}>
								Death Threshold: {deathThreshold} | Steps: {currentStep}/{deathStepsInfo.maxSteps}
								{isDead && ' | DEAD'}
							</div>
						</>
					);
				})()}
			</MobileSection>
		</MobileContent>
	);

	const renderFeaturesSection = () => (
		<MobileContent>
			{/* Features */}
			<MobileSection>
				<MobileSectionTitle>Features & Traits</MobileSectionTitle>
				<MobileItemGrid>
					{features.map((feature) => (
						<MobileItem
							key={feature.id}
							onClick={() => openFeaturePopup(feature)}
						>
							<MobileItemName>{feature.name}</MobileItemName>
							<MobileItemDetails>{feature.sourceDetail}</MobileItemDetails>
						</MobileItem>
					))}
				</MobileItemGrid>
			</MobileSection>
		</MobileContent>
	);

	const renderInfoSection = () => (
		<MobileContent>
			{/* Skills */}
			{/* <MobileSection>
				<MobileSectionTitle>Skills</MobileSectionTitle>
				{Object.entries(skillsByAttribute).map(([attribute, skills]) => (
					<div key={attribute}>
						<h3 style={{ color: '#f5d020', marginBottom: '0.5rem' }}>
							{attribute.charAt(0).toUpperCase() + attribute.slice(1)}
						</h3>
						<MobileItemGrid>
							{skills.map((skill) => (
								<MobileItem key={skill.id}>
									<MobileItemName>{skill.name}</MobileItemName>
									<MobileItemDetails>
										Bonus: {skill.bonus >= 0 ? '+' : ''}{skill.bonus}
									</MobileItemDetails>
								</MobileItem>
							))}
						</MobileItemGrid>
					</div>
				))}
			</MobileSection> */}

			{/* Trades */}
			{trades.length > 0 && (
				<MobileSection>
					<MobileSectionTitle>Trades</MobileSectionTitle>
					<MobileItemGrid>
						{trades.map((trade) => (
							<MobileItem key={trade.id}>
								<MobileItemName>{trade.name}</MobileItemName>
								<MobileItemDetails>
									Bonus: {trade.bonus >= 0 ? '+' : ''}{trade.bonus}
								</MobileItemDetails>
							</MobileItem>
						))}
					</MobileItemGrid>
				</MobileSection>
			)}

			{/* Knowledge */}
			{knowledge.length > 0 && (
				<MobileSection>
					<MobileSectionTitle>Knowledge</MobileSectionTitle>
					<MobileItemGrid>
						{knowledge.map((know) => (
							<MobileItem key={know.id}>
								<MobileItemName>{know.name}</MobileItemName>
								<MobileItemDetails>
									Bonus: {know.bonus >= 0 ? '+' : ''}{know.bonus}
								</MobileItemDetails>
							</MobileItem>
						))}
					</MobileItemGrid>
				</MobileSection>
			)}

			{/* Languages */}
			{languages.length > 0 && (
				<MobileSection>
					<MobileSectionTitle>Languages</MobileSectionTitle>
					<MobileItemGrid>
						{languages.map((language) => (
							<MobileItem key={language.id}>
								<MobileItemName>{language.name}</MobileItemName>
								<MobileItemDetails>Fluency: {language.fluency}</MobileItemDetails>
							</MobileItem>
						))}
					</MobileItemGrid>
				</MobileSection>
			)}

			{/* Player Notes */}
			<MobileSection>
				<MobileSectionTitle>Player Notes</MobileSectionTitle>
				<div style={{ padding: '0.5rem' }}>
					<textarea
						value={characterData.characterState?.notes?.playerNotes || ''}
						onChange={(e) => updateNotes(e.target.value)}
						placeholder="Write your notes here..."
						style={{
							width: '100%',
							minHeight: '120px',
							padding: '0.75rem',
							border: '1px solid #555',
							borderRadius: '4px',
							backgroundColor: '#333',
							color: '#fff',
							fontFamily: 'inherit',
							fontSize: '0.9rem',
							resize: 'vertical'
						}}
					/>
				</div>
			</MobileSection>

			{/* Copy to Clipboard */}
			<MobileSection>
				<MobileSectionTitle>Export</MobileSectionTitle>
				<div style={{ padding: '0.5rem', textAlign: 'center' }}>
					<button
						onClick={() => {
							const characterSummary = `
CHARACTER SHEET EXPORT
=====================
Name: ${characterData.finalName || 'Unnamed Character'}
Class: ${characterData.className || 'Unknown'}
Level: ${characterData.level || 1}
Ancestry: ${characterData.ancestry1Name || 'Unknown'}

ATTRIBUTES
==========
Might: ${characterData.finalMight}
Agility: ${characterData.finalAgility}
Charisma: ${characterData.finalCharisma}
Intelligence: ${characterData.finalIntelligence}
Prime: ${characterData.finalPrimeModifierValue}

RESOURCES
=========
HP: ${resources?.current.currentHP} / ${resources?.original.maxHP}
SP: ${resources?.current.currentSP} / ${characterData.finalSPMax}
MP: ${resources?.current.currentMP} / ${characterData.finalMPMax}
${resources?.original.maxRestPoints > 0 ? `Rest Points: ${resources?.current.currentRestPoints} / ${resources?.original.maxRestPoints}` : ''}
${resources?.original.maxGritPoints > 0 ? `Grit Points: ${resources?.current.currentGritPoints} / ${resources?.original.maxGritPoints}` : ''}

DEFENSES  
========
PD: ${characterData.finalPD}
AD: ${characterData.finalAD}
PDR: ${characterData.finalPDR}

NOTES
=====
${characterData.characterState?.notes?.playerNotes || 'No notes'}
							`.trim();
							
							navigator.clipboard.writeText(characterSummary).then(() => {
								alert('Character sheet copied to clipboard!');
							}).catch(() => {
								alert('Failed to copy to clipboard');
							});
						}}
						style={{
							background: '#4a7c59',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							padding: '0.75rem 1.5rem',
							fontSize: '0.9rem',
							fontWeight: 'bold',
							cursor: 'pointer',
							width: '100%'
						}}
					>
						📋 Copy Character Sheet to Clipboard
					</button>
				</div>
			</MobileSection>
		</MobileContent>
	);

	return (
		<MobileContainer>
			{/* Header */}
			<MobileHeader>
				<MobileCharacterName>{characterData.finalName || 'Unnamed Character'}</MobileCharacterName>
				<MobileCharacterInfo>
					Level {characterData.level || 1} {characterData.className}
					{characterData.ancestry1Name && (
						<span>
							{' • '}
							{characterData.ancestry1Name}
							{characterData.ancestry2Name && ` / ${characterData.ancestry2Name}`}
						</span>
					)}
				</MobileCharacterInfo>
			</MobileHeader>

			{/* Navigation */}
			<MobileNavigation>
				<MobileNavButton
					$active={activeMobileSection === 'character'}
					onClick={() => setActiveMobileSection('character')}
				>
					Character
				</MobileNavButton>
				<MobileNavButton
					$active={activeMobileSection === 'combat'}
					onClick={() => setActiveMobileSection('combat')}
				>
					Combat
				</MobileNavButton>
				<MobileNavButton
					$active={activeMobileSection === 'features'}
					onClick={() => setActiveMobileSection('features')}
				>
					Features
				</MobileNavButton>
				<MobileNavButton
					$active={activeMobileSection === 'info'}
					onClick={() => setActiveMobileSection('info')}
				>
					Info
				</MobileNavButton>
			</MobileNavigation>

			{/* Content based on active section */}
			{activeMobileSection === 'character' && renderCharacterSection()}
			{activeMobileSection === 'combat' && renderCombatSection()}
			{activeMobileSection === 'features' && renderFeaturesSection()}
			{activeMobileSection === 'info' && renderInfoSection()}

			{/* Modal Popups - same as desktop! */}
			{selectedFeature && (
				<FeaturePopup
					feature={selectedFeature}
					onClose={closeFeaturePopup}
				/>
			)}

			{selectedSpell && (
				<SpellPopup
					spell={selectedSpell}
					onClose={closeSpellPopup}
				/>
			)}

			{selectedAttack && (
				<AttackPopup
					selectedAttack={selectedAttack}
					onClose={closeAttackPopup}
				/>
			)}

			{selectedInventoryItem && (
				<InventoryPopup
					selectedInventoryItem={selectedInventoryItem}
					onClose={closeInventoryPopup}
				/>
			)}
		</MobileContainer>
	);
};

export default CharacterSheetMobile;
