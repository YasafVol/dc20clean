// DC20 Character Calculator Service
// Handles calculation of derived stats based on DC20 rules

import { skillsData } from '../rulesdata/skills';
import { ancestriesData } from '../rulesdata/ancestries';
import { findClassByName } from '../rulesdata/loaders/class-features.loader';
import type { IClassDefinition } from '../rulesdata/schemas/class.schema';

export interface CharacterInProgressData {
	id: string;
	// Attributes
	attribute_might: number;
	attribute_agility: number;
	attribute_charisma: number;
	attribute_intelligence: number;

	// Progression
	level: number;
	combatMastery: number;

	// Class & Ancestry
	classId: string | null;
	ancestry1Id: string | null;
	ancestry2Id: string | null;
	selectedTraitIds: string;
	selectedFeatureChoices: string;

	// Character Details
	finalName: string | null;
	finalPlayerName: string | null;

	// Skills (if implemented)
	skillsJson?: string;
	tradesJson?: string;
	languagesJson?: string;

	// Manual Defense Overrides
	manualPD?: number;
	manualAD?: number;
	manualPDR?: number;

	// Timestamps
	createdAt: Date;
	updatedAt?: Date;
	completedAt?: string;
}

export interface CalculatedCharacterStats {
	// Basic Info
	id: string;
	finalName: string;
	finalPlayerName?: string;
	finalLevel: number;

	// Timestamps
	createdAt: Date;
	updatedAt?: Date;
	completedAt?: string;

	// Attributes
	finalMight: number;
	finalAgility: number;
	finalCharisma: number;
	finalIntelligence: number;

	// Calculated Stats
	finalPrimeModifierValue: number;
	finalPrimeModifierAttribute: string;
	finalCombatMastery: number;

	// Saves (Attribute + Combat Mastery)
	finalSaveMight: number;
	finalSaveAgility: number;
	finalSaveCharisma: number;
	finalSaveIntelligence: number;

	// Health & Resources
	finalHPMax: number;
	finalSPMax: number;
	finalMPMax: number;

	// Defenses
	finalPD: number; // Precision Defense
	finalAD: number; // Area Defense

	// Other Stats
	finalSaveDC: number;
	finalDeathThreshold: number;
	finalMoveSpeed: number;
	finalJumpDistance: number;
	finalRestPoints: number;
	finalGritPoints: number;
	finalInitiativeBonus: number;

	// PDR (Precision Damage Reduction)
	finalPDR: number;

	// Class & Ancestry Info
	classId: string | null;
	className: string;
	ancestry1Id: string | null;
	ancestry1Name?: string;
	ancestry2Id: string | null;
	ancestry2Name?: string;
	selectedFeatureChoices?: string;
	selectedTraitIds?: string;

	// JSON data fields
	skillsJson?: string;
	tradesJson?: string;
	languagesJson?: string;
}

// Import class data (we need to create this import based on what's available)
const getClassData = async (classId: string): Promise<IClassDefinition | null> => {
	try {
		// Dynamic import of class data
		const { classesData } = await import('../rulesdata/loaders/class.loader');

		const classData = classesData.find((c) => c.id === classId);
		return classData || null;
	} catch (error) {
		console.warn('Could not load class data:', error);
		return null;
	}
};

// Get ancestry data by ID
const getAncestryData = (ancestryId: string | null): { id: string; name: string } | null => {
	if (!ancestryId) return null;

	const ancestry = ancestriesData.find((a) => a.id === ancestryId);
	return ancestry ? { id: ancestry.id, name: ancestry.name } : null;
};

const calculatePrimeModifier = (attributes: {
	might: number;
	agility: number;
	charisma: number;
	intelligence: number;
}): { value: number; attribute: string } => {
	// Find the highest attribute
	const { might, agility, charisma, intelligence } = attributes;
	const attrArray = [
		{ value: might, name: 'MIG' },
		{ value: agility, name: 'AGI' },
		{ value: charisma, name: 'CHA' },
		{ value: intelligence, name: 'INT' }
	];

	const highest = attrArray.reduce((prev, curr) => (curr.value > prev.value ? curr : prev));

	return {
		value: highest.value,
		attribute: highest.name
	};
};

export const calculateCharacterStats = async (
	characterData: CharacterInProgressData
): Promise<CalculatedCharacterStats> => {
	console.log('calculateCharacterStats called with:', characterData);

	// Get class data
	const classData = characterData.classId ? await getClassData(characterData.classId) : null;
	console.log('Class data loaded:', classData);

	// Get ancestry data
	const ancestry1Data = getAncestryData(characterData.ancestry1Id);
	const ancestry2Data = getAncestryData(characterData.ancestry2Id);
	console.log('Ancestry data loaded:', { ancestry1Data, ancestry2Data });

	// Basic attributes
	const finalMight = characterData.attribute_might;
	const finalAgility = characterData.attribute_agility;
	const finalCharisma = characterData.attribute_charisma;
	const finalIntelligence = characterData.attribute_intelligence;

	// Combat Mastery (half level rounded up)
	const finalCombatMastery = Math.ceil(characterData.level / 2);

	// Prime Modifier
	const primeModifier = calculatePrimeModifier({
		might: finalMight,
		agility: finalAgility,
		charisma: finalCharisma,
		intelligence: finalIntelligence
	});

	// Defenses (DC20 formulas)
	// PD (Precision Defense) = 8 + CM + Agility + Intelligence + Bonuses from items
	const calculatedPD = 8 + finalCombatMastery + finalAgility + finalIntelligence;
	const finalPD = characterData.manualPD !== undefined ? characterData.manualPD : calculatedPD;

	// AD (Area Defense) = 8 + CM + Might + Charisma + Bonuses from items
	const calculatedAD = 8 + finalCombatMastery + finalMight + finalCharisma;
	let finalAD = characterData.manualAD !== undefined ? characterData.manualAD : calculatedAD;

	// Health & Resources
	let finalHPMax = finalMight; // Base from Might
	let finalSPMax = 0;
	let finalMPMax = 0;
	let finalSaveDC = 8; // Base
	let finalDeathThreshold = 10; // Base
	let finalMoveSpeed = 30; // Base
	let finalRestPoints = 4; // Base
	let finalInitiativeBonus = 0; // Base

	// Add class contributions
	if (classData) {
		finalHPMax += classData.baseHpContribution;
		finalSPMax = classData.startingSP;
		finalMPMax = classData.startingMP;
		finalSaveDC = classData.saveDCBase;
		finalDeathThreshold = classData.deathThresholdBase;
		finalMoveSpeed = classData.moveSpeedBase;
		finalRestPoints = classData.restPointsBase;
		finalInitiativeBonus = classData.initiativeBonusBase;

		// Apply effects from class features using the new class features structure
		const classFeatures = findClassByName(classData.name);
		if (classFeatures) {
			// Get level 1 features
			const level1Features = classFeatures.coreFeatures.filter(feature => feature.levelGained === 1);
			
			level1Features.forEach((feature) => {
				if (feature.benefits) {
					feature.benefits.forEach((benefit) => {
						if (benefit.effects) {
							benefit.effects.forEach((effect) => {
								if (effect.type === 'MODIFIER') {
									// For now, we'll assume the condition is met.
									// A more robust solution would parse and evaluate the condition string.
									if (effect.target === 'defenses.ad') {
										finalAD += effect.value;
									} else if (effect.target === 'coreStats.moveSpeed') {
										finalMoveSpeed += effect.value;
									} else if (effect.target === 'resources.mpMax') {
										finalMPMax += effect.value;
									} else if (effect.target === 'coreStats.jumpDistance') {
										finalJumpDistance += effect.value;
									}
									// Add more target cases here as needed
								} else if (effect.type === 'OVERRIDE') {
									if (effect.target === 'coreStats.jumpDistance') {
										// A more robust solution would parse the value string
										finalJumpDistance = finalMight;
									}
								} else if (effect.type === 'GRANT_SKILL_POINTS') {
									// This is a placeholder. A real implementation would need to
									// modify the character's skill points data.
									console.log(`Granting ${effect.value} skill points.`);
								} else if (effect.type === 'GRANT_SPELLS') {
									// This is a placeholder. A real implementation would need to
									// add the spells to the character's spell list.
									console.log(`Granting ${effect.value} spells.`);
								} else if (effect.type === 'GRANT_CANTRIPS') {
									// This is a placeholder. A real implementation would need to
									// add the cantrips to the character's spell list.
									console.log(`Granting ${effect.value} cantrips.`);
								} else if (effect.type === 'GRANT_COMBAT_TRAINING') {
									// This is a placeholder. A real implementation would need to
									// add the combat training to the character's data.
									console.log(`Granting combat training: ${effect.value}`);
								} else if (effect.type === 'GRANT_MANEUVERS') {
									// This is a placeholder. A real implementation would need to
									// add the maneuvers to the character's data.
									console.log(`Granting ${effect.value} maneuvers.`);
								} else if (effect.type === 'GRANT_ANCESTRY_POINTS') {
									// This is a placeholder. A real implementation would need to
									// add the ancestry points to the character's data.
									console.log(`Granting ${effect.value} ancestry points.`);
								} else if (effect.type === 'GRANT_PASSIVE') {
									// This is a placeholder. A real implementation would need to
									// add the passive to the character's data.
									console.log(`Granting passive: ${effect.value}`);
								}
							});
						}
					});
				}
			});
		}
	}

	// Process selected feature choices (like Cleric domains)
	if (characterData.selectedFeatureChoices && classFeatures) {
		try {
			const selectedChoices: { [key: string]: string } = JSON.parse(characterData.selectedFeatureChoices);
			
			// Process Cleric domain benefits
			if (classFeatures.className === 'Cleric') {
				const domainChoiceId = 'cleric_divine_domains_0'; // Standard choice ID for divine domains
				const selectedDomains = selectedChoices[domainChoiceId];
				
				if (selectedDomains) {
					const domains = JSON.parse(selectedDomains);
					domains.forEach((domainName: string) => {
						switch (domainName) {
							case 'Magic':
								finalMPMax += 1; // Magic domain: "Your maximum MP increases by 1"
								break;
							case 'Divine Damage Expansion':
								// Resistance (1) to divine damage type - would be handled in defense/resistance calculation
								break;
							case 'Life':
								// When you produce an MP Effect that restores HP - active ability, not stat bonus
								break;
							case 'Death':
								// Enemy creatures within 10 Spaces take +1 damage while Well-Bloodied - combat effect
								break;
							case 'Grave':
								// Allied creatures within 10 Spaces take -1 damage while Well-Bloodied - combat effect  
								break;
							case 'Light':
								// MP Effect targeting ability - active ability, not stat bonus
								break;
							case 'Dark':
								// Darkvision and Hide ability - would be handled in abilities/vision calculation
								break;
							case 'War':
								// Combat abilities - would be handled in combat calculation
								break;
							case 'Knowledge':
								// Knowledge trade bonuses - would be handled in skill calculation
								break;
							case 'Nature':
								// Natural abilities - would be handled in abilities calculation
								break;
							case 'Trickery':
								// Stealth and deception bonuses - would be handled in skill calculation
								break;
							case 'Tempest':
								// Storm and weather abilities - combat effects
								break;
							// Note: Magic domain can be chosen multiple times for additional +1 MP each time
						}
					});
				}
			}
		} catch (error) {
			console.warn('Error processing feature choices:', error);
		}
	}

	// Add attribute bonuses
	finalSaveDC += primeModifier.value; // Save DC = Base + Prime
	finalInitiativeBonus += finalCombatMastery + finalAgility; // Initiative = CM + Agility

	// Calculate Save Values (Updated Formula)
	// Save = Attribute Modifier + Combat Mastery (always)
	const finalSaveMight = finalMight + finalCombatMastery;
	const finalSaveAgility = finalAgility + finalCombatMastery;
	const finalSaveCharisma = finalCharisma + finalCombatMastery;
	const finalSaveIntelligence = finalIntelligence + finalCombatMastery;

	console.log('Save calculations:', {
		combatMastery: finalCombatMastery,
		attributes: {
			might: finalMight,
			agility: finalAgility,
			charisma: finalCharisma,
			intelligence: finalIntelligence
		},
		results: {
			might: finalSaveMight,
			agility: finalSaveAgility,
			charisma: finalSaveCharisma,
			intelligence: finalSaveIntelligence
		}
	});

	// Jump Distance = Agility (min 1)
	let finalJumpDistance = Math.max(1, finalAgility);

	// Grit Points = 2 + Charisma (from class base)
	const baseGritPoints = classData?.gritPointsBase || 2;
	const finalGritPoints = baseGritPoints + finalCharisma;

	// Calculate PDR (Precision Damage Reduction) with manual override
	const calculatedPDR = calculatePDR(characterData, classData);
	const finalPDR = characterData.manualPDR !== undefined ? characterData.manualPDR : calculatedPDR;

	// Default skills if not provided
	let skillsJson = characterData.skillsJson;
	if (!skillsJson) {
		// Create default skills with 0 proficiency
		const defaultSkills: Record<string, number> = {};
		skillsData.forEach((skill) => {
			defaultSkills[skill.id] = 0;
		});
		skillsJson = JSON.stringify(defaultSkills);
	}

	return {
		// Basic Info
		id: characterData.id,
		finalName: characterData.finalName || 'Unnamed Character',
		finalPlayerName: characterData.finalPlayerName || undefined,
		finalLevel: characterData.level,

		// Timestamps
		createdAt: characterData.createdAt,
		updatedAt: characterData.updatedAt,
		completedAt: characterData.completedAt,

		// Attributes
		finalMight,
		finalAgility,
		finalCharisma,
		finalIntelligence,

		// Calculated Stats
		finalPrimeModifierValue: primeModifier.value,
		finalPrimeModifierAttribute: primeModifier.attribute,
		finalCombatMastery,

		// Saves (Attribute + Combat Mastery)
		finalSaveMight,
		finalSaveAgility,
		finalSaveCharisma,
		finalSaveIntelligence,

		// Health & Resources
		finalHPMax,
		finalSPMax,
		finalMPMax,

		// Defenses
		finalPD,
		finalAD,

		// Other Stats
		finalSaveDC,
		finalDeathThreshold,
		finalMoveSpeed,
		finalJumpDistance,
		finalRestPoints,
		finalGritPoints,
		finalInitiativeBonus,

		// PDR (Precision Damage Reduction)
		finalPDR,

		// Class & Ancestry Info
		classId: characterData.classId,
		className: classData?.name || 'Unknown',
		ancestry1Id: characterData.ancestry1Id,
		ancestry1Name: ancestry1Data?.name,
		ancestry2Id: characterData.ancestry2Id,
		ancestry2Name: ancestry2Data?.name,
		selectedFeatureChoices: characterData.selectedFeatureChoices,
		selectedTraitIds: characterData.selectedTraitIds,

		// JSON data fields
		skillsJson,
		tradesJson: characterData.tradesJson || '{}',
		languagesJson: characterData.languagesJson || '{"common": {"fluency": "fluent"}}'
	};
};

// Helper function to calculate PDR (Precision Damage Reduction)
const calculatePDR = (
	characterData: CharacterInProgressData,
	classData: IClassDefinition | null
): number => {
	let pdr = 0;

	// Check for Beastborn Natural Armor trait
	if (characterData.selectedTraitIds) {
		try {
			const selectedTraits = JSON.parse(characterData.selectedTraitIds);
			if (selectedTraits.includes('beastborn_natural_armor')) {
				// Natural Armor grants PDR when not wearing armor
				// According to DC20 rules, this grants PDR (Precision Damage Reduction)
				pdr += 1;
			}
		} catch (error) {
			console.warn('Error parsing selectedTraitIds for PDR calculation:', error);
		}
	}

	// Check for Barbarian Rage ability
	if (classData?.id === 'barbarian') {
		// Barbarian Rage grants Resistance (Half) to Precision damage
		// This is effectively PDR, but it's a different mechanic
		// For now, we'll note this but not add to base PDR since Rage is conditional
		// TODO: Could add a note or separate field for conditional PDR
	}

	// TODO: Add additional PDR sources:
	// - Heavy Armor with PDR property (requires armor system integration)
	// - Shell Retreat ability (conditional)
	// - Magic items or other class features
	// - Equipment-based PDR calculation

	return pdr;
};
