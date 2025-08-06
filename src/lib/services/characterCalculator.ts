// DC20 Character Calculator Service
// Handles calculation of derived stats based on DC20 rules

import { ancestriesData } from '../rulesdata/ancestries';
import { findClassByName } from '../rulesdata/loaders/class-features.loader';
import { classesData } from '../rulesdata/loaders/class.loader';
import { traitsData } from '../rulesdata/traits';
import { tradesData } from '../rulesdata/trades';
import { knowledgeData } from '../rulesdata/knowledge';
import { skillsData } from '../rulesdata/skills';
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
	
	// Spells and Maneuvers selections (for edit functionality)
	selectedSpells?: string;
	selectedManeuvers?: string;

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
	
	// Spells and Maneuvers selections (for edit functionality)
	selectedSpells?: string;
	selectedManeuvers?: string;
	
	// Calculated bonus data
	skillsWithBonuses?: any[];
	tradesWithBonuses?: any[];
}

// Import class data (we need to create this import based on what's available)
const getClassData = async (classId: string): Promise<IClassDefinition | null> => {
	try {
		// Static import of class data
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

	// Get class features data
	const classFeatures = classData ? findClassByName(classData.name) : null;

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
	let finalSaveDC = 10; // Base (correct DC20 base)
	let finalDeathThreshold = 10; // Base
	let finalMoveSpeed = 5; // Default base, will be set by class data
	let finalRestPoints = 4; // Will be set to finalHPMax later
	let finalInitiativeBonus = 0; // Base

	// Add class contributions
	if (classData) {
		finalHPMax += classData.baseHpContribution;
		finalSPMax = classData.startingSP;
		finalMPMax = classData.startingMP;
		// Note: saveDCBase is not used in correct formula, keeping base at 10
		finalDeathThreshold = classData.deathThresholdBase;
		finalMoveSpeed = classData.moveSpeedBase;
		// finalRestPoints will be set to finalHPMax after all calculations
		finalInitiativeBonus = classData.initiativeBonusBase;

		// Apply effects from class features using the new class features structure
		if (classFeatures) {
			// Get level 1 features
			const level1Features = classFeatures.coreFeatures.filter(
				(feature) => feature.levelGained === 1
			);

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

	// Process selected feature choices (robust parsing approach)
	if (characterData.selectedFeatureChoices && classFeatures) {
		try {
			const selectedChoices: { [key: string]: string } = JSON.parse(
				characterData.selectedFeatureChoices
			);

			// Find all level 1 features with choices
			const level1Features = classFeatures.coreFeatures.filter(
				(feature) => feature.levelGained === 1
			);

			level1Features.forEach((feature) => {
				if (feature.choices) {
					feature.choices.forEach((choice, choiceIndex) => {
						const choiceId = `${classFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_${choiceIndex}`;
						const selectedOptions = selectedChoices[choiceId];

						if (selectedOptions) {
							let optionsToProcess: string[] = [];

							// Handle both single selection and multiple selection
							try {
								optionsToProcess = JSON.parse(selectedOptions);
								if (!Array.isArray(optionsToProcess)) {
									optionsToProcess = [selectedOptions];
								}
							} catch {
								optionsToProcess = [selectedOptions];
							}

							// Process each selected option
							optionsToProcess.forEach((optionName) => {
								const selectedOption = choice.options?.find((opt) => opt.name === optionName);
								if (selectedOption) {
									const description = selectedOption.description.toLowerCase();

									// Parse stat bonuses from descriptions using regex patterns

									// MP bonuses: "your maximum mp increases by X", "mp increases by X", "+X mp"
									const mpMatch =
										description.match(
											/(?:your maximum mp increases by|mp increases by|\+)\s*(\d+)\s*mp/i
										) || description.match(/maximum mp increases by\s*(\d+)/i);
									if (mpMatch) {
										finalMPMax += parseInt(mpMatch[1]);
									}

									// Ancestry Points: "you get X ancestry points", "X ancestry points"
									const ancestryMatch = description.match(
										/(?:you get|gain)\s*(\d+)\s*ancestry points?/i
									);
									if (ancestryMatch) {
										// Note: This would need to be handled in character creation logic, not just stats
										console.log(
											`Feature choice grants ${ancestryMatch[1]} ancestry points: ${optionName}`
										);
									}

									// SP bonuses: "your maximum sp increases by X", "+X sp"
									const spMatch = description.match(
										/(?:your maximum sp increases by|sp increases by|\+)\s*(\d+)\s*sp/i
									);
									if (spMatch) {
										finalSPMax += parseInt(spMatch[1]);
									}

									// HP bonuses: "your maximum hp increases by X", "+X hp"
									const hpMatch = description.match(
										/(?:your maximum hp increases by|hp increases by|\+)\s*(\d+)\s*hp/i
									);
									if (hpMatch) {
										finalHPMax += parseInt(hpMatch[1]);
									}

									// Maneuver learning: "you learn X maneuvers", "learn X defensive maneuvers"
									const maneuverMatch = description.match(
										/you learn\s*(\d+)\s*(?:defensive\s+)?maneuvers?/i
									);
									if (maneuverMatch) {
										// Note: This would be handled in maneuver tracking, not base stats
										console.log(
											`Feature choice grants ${maneuverMatch[1]} maneuvers: ${optionName}`
										);
									}

									// Spell learning: "you learn X additional spell", "you learn X spell"
									const spellMatch = description.match(
										/you learn\s*(\d+)\s*(?:additional\s+)?spells?/i
									);
									if (spellMatch) {
										// Note: This would be handled in spell tracking, not base stats
										console.log(`Feature choice grants ${spellMatch[1]} spells: ${optionName}`);
									}

									// Save DC bonuses: "save dc increases by X", "+X to save dc"
									const saveDCMatch = description.match(
										/(?:save dc increases by|\+)\s*(\d+)(?:\s*to save dc)?/i
									);
									if (saveDCMatch) {
										finalSaveDC += parseInt(saveDCMatch[1]);
									}

									// Movement speed: "move speed increases by X", "+X movement"
									const speedMatch = description.match(
										/(?:move speed increases by|movement.*increases by|\+)\s*(\d+)(?:\s*(?:feet|ft|spaces?))?.*(?:movement|speed)/i
									);
									if (speedMatch) {
										finalMoveSpeed += parseInt(speedMatch[1]);
									}
								}
							});
						}
					});
				}
			});
		} catch (error) {
			console.warn('Error processing feature choices:', error);
		}
	}

	// Process trait effects for movement speed
	if (characterData.selectedTraitIds) {
		try {
			const selectedTraitIds = JSON.parse(characterData.selectedTraitIds);

			selectedTraitIds.forEach((traitId: string) => {
				const trait = traitsData.find((t) => t.id === traitId);
				if (trait?.effects) {
					trait.effects.forEach((effect) => {
						if (effect.type === 'MODIFY_SPEED') {
							// Convert from internal units (5 = 1 space) to spaces
							finalMoveSpeed += effect.value / 5;
						}
					});
				}
			});
		} catch (error) {
			console.warn('Error processing trait effects for movement speed:', error);
		}
	}

	// Add attribute bonuses
	finalSaveDC += primeModifier.value + finalCombatMastery; // Save DC = 10 + Prime + Combat Mastery
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

	// Process skills with calculated bonuses
	let skillsJson = characterData.skillsJson;
	if (!skillsJson) {
		// Create default skills with 0 proficiency
		const defaultSkills: Record<string, number> = {};
		skillsData.forEach((skill) => {
			defaultSkills[skill.id] = 0;
		});
		skillsJson = JSON.stringify(defaultSkills);
	}

	// Calculate skill bonuses: Attribute + Mastery*2
	const skillsWithBonuses: any[] = [];
	try {
		const skillProficiencies = JSON.parse(skillsJson);
		skillsData.forEach((skill) => {
			const proficiency = skillProficiencies[skill.id] || 0;
			const masteryBonus = proficiency * 2;
			
			// Get attribute modifier based on skill's attribute association
			let attributeModifier = 0;
			switch (skill.attributeAssociation.toLowerCase()) {
				case 'might':
					attributeModifier = finalMight;
					break;
				case 'agility':
					attributeModifier = finalAgility;
					break;
				case 'charisma':
					attributeModifier = finalCharisma;
					break;
				case 'intelligence':
					attributeModifier = finalIntelligence;
					break;
				default:
					attributeModifier = 0;
			}
			
			const totalBonus = attributeModifier + masteryBonus;
			
			skillsWithBonuses.push({
				id: skill.id,
				name: skill.name,
				attribute: skill.attributeAssociation,
				proficiency,
				bonus: totalBonus
			});
		});
	} catch (error) {
		console.warn('Error calculating skill bonuses:', error);
	}

	// Process trades with calculated bonuses
	const tradesWithBonuses: any[] = [];
	try {
		const tradeProficiencies = JSON.parse(characterData.tradesJson || '{}');
		// Import trades data
		const allTradesAndKnowledge = [...tradesData, ...knowledgeData];
		
		allTradesAndKnowledge.forEach((trade) => {
			const proficiency = tradeProficiencies[trade.id] || 0;
			const masteryBonus = proficiency * 2;
			
			// Get attribute modifier based on trade's attribute association
			let attributeModifier = 0;
			switch (trade.attributeAssociation.toLowerCase()) {
				case 'might':
					attributeModifier = finalMight;
					break;
				case 'agility':
					attributeModifier = finalAgility;
					break;
				case 'charisma':
					attributeModifier = finalCharisma;
					break;
				case 'intelligence':
					attributeModifier = finalIntelligence;
					break;
				default:
					attributeModifier = 0;
			}
			
			const totalBonus = attributeModifier + masteryBonus;
			
			tradesWithBonuses.push({
				id: trade.id,
				name: trade.name,
				proficiency,
				bonus: totalBonus
			});
		});
	} catch (error) {
		console.warn('Error calculating trade bonuses:', error);
	}

	// DC20 Rule: Rest Points = HP
	finalRestPoints = finalHPMax;

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
		languagesJson: characterData.languagesJson || '{"common": {"fluency": "fluent"}}',
		
		// Spells and Maneuvers selections (for edit functionality)
		selectedSpells: characterData.selectedSpells,
		selectedManeuvers: characterData.selectedManeuvers,
		
		// Calculated skill and trade bonuses
		skillsWithBonuses,
		tradesWithBonuses
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
