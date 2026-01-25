// Shared character completion service - UPDATED: Uses typed data contracts
// Handles the completion flow with proper stat calculation, snackbar, and navigation

import { assignSpellsToCharacter } from './spellAssignment';
import { ALL_SPELLS as allSpells } from '../rulesdata/spells-data';
import { allManeuvers } from '../rulesdata/martials/maneuvers';
import {
	convertToEnhancedBuildData,
	calculateCharacterWithBreakdowns
} from './enhancedCharacterCalculator';
import { getInitializedCharacterState } from '../utils/storageUtils';
import { getDefaultStorage } from '../storage';
import type { SavedCharacter } from '../types/dataContracts';
import { denormalizeMastery } from './denormalizeMastery';
import { CURRENT_SCHEMA_VERSION } from '../types/schemaVersion';
import { logger } from '../utils/logger';

/**
 * Converts the movements array from calculator into the movement structure for SavedCharacter
 */
function processMovementsToStructure(
	movements: Array<{ type: string; speed: string; source: any }>,
	groundSpeed: number
): {
	burrow: { half: boolean; full: boolean };
	swim: { half: boolean; full: boolean };
	fly: { half: boolean; full: boolean };
	climb: { half: boolean; full: boolean };
	glide: { half: boolean; full: boolean };
} {
	const movement = {
		burrow: { half: false, full: false },
		swim: { half: false, full: false },
		fly: { half: false, full: false },
		climb: { half: false, full: false },
		glide: { half: false, full: false }
	};

	for (const m of movements) {
		const type = m.type as keyof typeof movement;
		if (!movement[type]) continue; // Skip unknown movement types

		const speedValue = parseInt(m.speed, 10);
		if (isNaN(speedValue)) continue; // Skip if speed is not a number

		// Determine if movement is half or full speed
		const halfSpeed = Math.floor(groundSpeed / 2);
		if (speedValue >= groundSpeed) {
			movement[type].full = true;
		} else if (speedValue >= halfSpeed) {
			movement[type].half = true;
		}
	}

	return movement;
}

/**
 * Converts count-based talents Record to array format for database storage.
 * Example: {talent1: 2, talent2: 1} → ['talent1', 'talent1', 'talent2']
 */
function convertTalentsToArray(talents: Record<string, number> | string[] | undefined): string[] {
	if (!talents) return [];
	// If already an array, return as-is
	if (Array.isArray(talents)) return talents;
	// Convert Record<string, number> to array with duplicates
	const result: string[] = [];
	for (const [talentId, count] of Object.entries(talents)) {
		for (let i = 0; i < count; i++) {
			result.push(talentId);
		}
	}
	return result;
}

export interface CharacterCompletionCallbacks {
	onShowSnackbar: (message: string) => void;
	onNavigateToLoad: () => void;
}

export const completeCharacter = async (
	characterState: any,
	callbacks: CharacterCompletionCallbacks
): Promise<void> => {
	try {
		// Build the enhanced data for calculation using native objects
		const enhancedData = convertToEnhancedBuildData({
			id: Date.now().toString(),
			attribute_might: characterState.attribute_might,
			attribute_agility: characterState.attribute_agility,
			attribute_charisma: characterState.attribute_charisma,
			attribute_intelligence: characterState.attribute_intelligence,
			level: characterState.level || 1,
			// combatMastery is calculated by the calculator, not passed as input
			classId: characterState.classId,
			ancestry1Id: characterState.ancestry1Id,
			ancestry2Id: characterState.ancestry2Id,
			selectedTraitIds: characterState.selectedTraitIds || [],
			selectedFeatureChoices: characterState.selectedFeatureChoices || {},
			finalName: characterState.finalName,
			finalPlayerName: characterState.finalPlayerName,
			skillsData: characterState.skillsData || {},
			tradesData: characterState.tradesData || {},
			languagesData: characterState.languagesData || { common: { fluency: 'fluent' } },
			usePrimeCapRule: !!characterState.usePrimeCapRule,
			// CRITICAL: Include conversions for proper background validation
			skillToTradeConversions: characterState.skillToTradeConversions || 0,
			tradeToSkillConversions: characterState.tradeToSkillConversions || 0,
			tradeToLanguageConversions: characterState.tradeToLanguageConversions || 0,
			createdAt: new Date(),
			completedAt: new Date().toISOString()
		});

		logger.info('calculation', 'Calculating stats for character', {
			classId: characterState.classId,
			level: characterState.level || 1
		});

		// Run the enhanced calculator
		const calculationResult = calculateCharacterWithBreakdowns(enhancedData);

		// Compute denormalized mastery/totals (Task 0)
		const finalAttributes = {
			might: calculationResult.stats.finalMight,
			agility: calculationResult.stats.finalAgility,
			charisma: calculationResult.stats.finalCharisma,
			intelligence: calculationResult.stats.finalIntelligence,
			prime: calculationResult.stats.finalPrimeModifierValue
		};
		const denorm = denormalizeMastery({
			finalAttributes,
			skillsRanks: characterState.skillsData || {},
			tradesRanks: characterState.tradesData || {},
			languagesData: characterState.languagesData || { common: { fluency: 'fluent' } }
		});

		// Create the final character with unified 'final*' schema
		const completedCharacter: SavedCharacter = {
			id: Date.now().toString(),
			finalName: characterState.finalName,
			finalPlayerName: characterState.finalPlayerName,
			level: characterState.level || 1,
			classId: characterState.classId,
			className: calculationResult.stats.className || 'Unknown',
			ancestry1Id: characterState.ancestry1Id,
			ancestry1Name: calculationResult.stats.ancestry1Name || 'Unknown',
			ancestry2Id: characterState.ancestry2Id,
			ancestry2Name: calculationResult.stats.ancestry2Name || 'Unknown',

			// Map from calculation result to final* schema
			finalMight: calculationResult.stats.finalMight,
			finalAgility: calculationResult.stats.finalAgility,
			finalCharisma: calculationResult.stats.finalCharisma,
			finalIntelligence: calculationResult.stats.finalIntelligence,
			finalPrimeModifierValue: calculationResult.stats.finalPrimeModifierValue,
			finalPrimeModifierAttribute: calculationResult.stats.finalPrimeModifierAttribute,
			usePrimeCapRule: !!characterState.usePrimeCapRule,
			finalCombatMastery: calculationResult.stats.finalCombatMastery,
			// Saves = attribute + Combat Mastery
			finalSaveMight:
				calculationResult.stats.finalMight + calculationResult.stats.finalCombatMastery,
			finalSaveAgility:
				calculationResult.stats.finalAgility + calculationResult.stats.finalCombatMastery,
			finalSaveCharisma:
				calculationResult.stats.finalCharisma + calculationResult.stats.finalCombatMastery,
			finalSaveIntelligence:
				calculationResult.stats.finalIntelligence + calculationResult.stats.finalCombatMastery,
			finalHPMax: calculationResult.stats.finalHPMax,
			finalSPMax: calculationResult.stats.finalSPMax,
			finalMPMax: calculationResult.stats.finalMPMax,
			finalPD: calculationResult.stats.finalPD,
			finalAD: calculationResult.stats.finalAD,
			finalPDR: calculationResult.stats.finalPDR,
			finalSaveDC: calculationResult.stats.finalSaveDC,
			finalDeathThreshold: calculationResult.stats.finalDeathThreshold,
			finalMoveSpeed: calculationResult.stats.finalMoveSpeed,
			finalJumpDistance: calculationResult.stats.finalJumpDistance,
			finalRestPoints: calculationResult.stats.finalRestPoints,
			finalGritPoints: calculationResult.stats.finalGritPoints,
			finalInitiativeBonus: calculationResult.stats.finalInitiativeBonus,

			// Movement types (process GRANT_MOVEMENT effects into structure)
			movement: processMovementsToStructure(
				calculationResult.movements || [],
				calculationResult.stats.finalMoveSpeed
			),
			holdBreath: calculationResult.stats.finalMight,

			// Derived thresholds and bloodied values
			finalPDHeavyThreshold: calculationResult.stats.finalPD + 5,
			finalPDBrutalThreshold: calculationResult.stats.finalPD + 10,
			finalADHeavyThreshold: calculationResult.stats.finalAD + 5,
			finalADBrutalThreshold: calculationResult.stats.finalAD + 10,
			bloodiedValue: Math.ceil(calculationResult.stats.finalHPMax / 2),
			wellBloodiedValue: Math.ceil(calculationResult.stats.finalHPMax / 4),

			// Combat stats with breakdowns
			finalAttackSpellCheck: calculationResult.stats.finalAttackSpellCheck,
			finalMartialCheck: calculationResult.stats.finalMartialCheck,

			// Store typed data directly (no more JSON strings)
			selectedTraitIds: characterState.selectedTraitIds || [],
			selectedFeatureChoices: characterState.selectedFeatureChoices || {},
			skillsData: characterState.skillsData || {},
			tradesData: characterState.tradesData || {},
			languagesData: characterState.languagesData || { common: { fluency: 'fluent' } },

			// Level progression data (M2.7)
			// Convert Record<string, number> to string[] for database compatibility
			selectedTalents: convertTalentsToArray(characterState.selectedTalents),
			pathPointAllocations: characterState.pathPointAllocations || {},
			unlockedFeatureIds:
				calculationResult.resolvedFeatures?.unlockedFeatures.map((f) => f.id || f.featureName) ||
				[],
			selectedSubclass: characterState.selectedSubclass,
			pendingSubclassChoice:
				calculationResult.resolvedFeatures?.availableSubclassChoice &&
				!characterState.selectedSubclass,

			// Multiclass selections (M3.17)
			selectedMulticlassOption: characterState.selectedMulticlassOption,
			selectedMulticlassClass: characterState.selectedMulticlassClass,
			selectedMulticlassFeature: characterState.selectedMulticlassFeature,

			// New precomputed structures (optional until FE migration)
			skillTotals: denorm.skillTotals,
			skillMastery: denorm.skillMastery,
			knowledgeTradeMastery: denorm.knowledgeTradeMastery,
			masteryLadders: denorm.masteryLadders,
			languageMastery: denorm.languageMastery,
			spells: [], // Will be populated below
			maneuvers: [], // Will be populated below

			// CRITICAL: Store conversions for character editing
			skillToTradeConversions: characterState.skillToTradeConversions || 0,
			tradeToSkillConversions: characterState.tradeToSkillConversions || 0,
			tradeToLanguageConversions: characterState.tradeToLanguageConversions || 0,

			// Store calculation breakdowns for transparency
			breakdowns: calculationResult.breakdowns || {},

			// Initialize character state with current resources set to max values
			characterState: getInitializedCharacterState({
				finalHPMax: calculationResult.stats.finalHPMax,
				finalSPMax: calculationResult.stats.finalSPMax,
				finalMPMax: calculationResult.stats.finalMPMax,
				finalGritPoints: calculationResult.stats.finalGritPoints,
				finalRestPoints: calculationResult.stats.finalRestPoints
			}),

			// Metadata
			createdAt: new Date().toISOString(),
			lastModified: new Date().toISOString(),
			completedAt: new Date().toISOString(),
			schemaVersion: CURRENT_SCHEMA_VERSION
		};

		logger.debug('calculation', 'Character stats calculated', {
			characterId: completedCharacter.id,
			classId: completedCharacter.classId,
			className: completedCharacter.className,
			ancestry1Id: completedCharacter.ancestry1Id,
			ancestry1Name: completedCharacter.ancestry1Name
		});

		// Process user-selected spells from character creation
		if (completedCharacter.className && characterState.selectedSpells) {
			logger.debug('ui', 'Processing user-selected spells', {
				selectedSpells: characterState.selectedSpells,
				className: completedCharacter.className
			});

			try {
				// Handle both formats:
				// - Record<string, string> (slotId -> spellId) from new spell selection UI
				// - string[] (spell names) from legacy format
				let spellIds: string[] = [];

				if (
					typeof characterState.selectedSpells === 'object' &&
					!Array.isArray(characterState.selectedSpells)
				) {
					// New format: Record<string, string> - extract spell IDs from values
					spellIds = Object.values(characterState.selectedSpells).filter(
						(id): id is string => typeof id === 'string' && id.length > 0
					);
					logger.debug('ui', 'Extracted spell IDs from Record', { spellIds });
				} else if (Array.isArray(characterState.selectedSpells)) {
					// Legacy format: array of spell names
					spellIds = characterState.selectedSpells;
				}

				if (spellIds.length > 0) {
					// Convert spell IDs/names to SpellData objects
					const userSelectedSpells = spellIds
						.map((spellIdOrName: string) => {
							// Try to find by ID first, then by name
							const fullSpell =
								allSpells.find((s) => s.id === spellIdOrName) ||
								allSpells.find((s) => s.name === spellIdOrName);
							if (fullSpell) {
								return {
									id: `spell_${Date.now()}_${Math.random()}`,
									spellName: fullSpell.name,
									school: fullSpell.school,
									cost: fullSpell.cost,
									range: fullSpell.range,
									duration: fullSpell.duration,
									isPrepared: true,
									notes: ''
								};
							}
							logger.warn('ui', 'Spell not found', { spellIdOrName });
							return null;
						})
						.filter(Boolean);

					// Store typed spells data
					completedCharacter.spells = userSelectedSpells as any;
					logger.debug('ui', 'User selected spells assigned', {
						spellCount: userSelectedSpells.length,
						spells: userSelectedSpells.map((s: any) => s.spellName)
					});
				} else {
					logger.debug('ui', 'No user spells selected, falling back to auto-assignment');
					// Fallback to auto-assignment if no spells were selected
					const assignedSpells = assignSpellsToCharacter({
						className: completedCharacter.className,
						level: completedCharacter.level || 1,
						selectedFeatureChoices: completedCharacter.selectedFeatureChoices
					});
					completedCharacter.spells = assignedSpells as any;
					logger.debug('ui', 'Auto-assigned spells', {
						spellCount: assignedSpells.length
					});
				}
			} catch (e) {
				logger.warn('ui', 'Error parsing selected spells, falling back to auto-assignment', {
					error: e instanceof Error ? e.message : String(e)
				});
				// Fallback to auto-assignment
				const assignedSpells = assignSpellsToCharacter({
					className: completedCharacter.className,
					level: completedCharacter.level || 1,
					selectedFeatureChoices: completedCharacter.selectedFeatureChoices
				});
				completedCharacter.spells = assignedSpells as any;
			}
		}

		// Handle user-selected maneuvers
		if (characterState.selectedManeuvers) {
			try {
				// Use typed arrays directly
				const selectedManeuverNames = characterState.selectedManeuvers || [];

				if (Array.isArray(selectedManeuverNames) && selectedManeuverNames.length > 0) {
					// Convert selected maneuver names to ManeuverData objects
					const userSelectedManeuvers = selectedManeuverNames
						.map((maneuverName: string) => {
							const fullManeuver = allManeuvers.find((m) => m.name === maneuverName);
							if (fullManeuver) {
								return {
									id: `maneuver_${Date.now()}_${Math.random()}`,
									name: fullManeuver.name,
									type: fullManeuver.type,
									cost: fullManeuver.cost,
									description: fullManeuver.description,
									isReaction: fullManeuver.isReaction,
									notes: ''
								};
							}
							return null;
						})
						.filter(Boolean);

					// Store typed maneuvers data
					completedCharacter.maneuvers = userSelectedManeuvers as any;
					logger.debug('ui', 'User selected maneuvers assigned', {
						maneuverCount: userSelectedManeuvers.length
					});
				}
			} catch (e) {
				logger.warn('ui', 'Error parsing selected maneuvers', {
					error: e instanceof Error ? e.message : String(e)
				});
			}
		}

	// OPTIMIZED: Save using new typed storage utilities
	const storage = getDefaultStorage();
	const existingCharacters = await storage.getAllCharacters();
	existingCharacters.push(completedCharacter);
	await storage.saveAllCharacters(existingCharacters);

		logger.info('ui', 'Character creation complete', {
			characterId: completedCharacter.id,
			characterName: completedCharacter.finalName,
			className: completedCharacter.className,
			level: completedCharacter.level,
			totalCharacters: existingCharacters.length
		});

		// Track analytics event
		logger.track('character_creation_completed', {
			classId: completedCharacter.classId,
			level: completedCharacter.level,
			ancestry1Id: completedCharacter.ancestry1Id
		});

		// Show success snackbar
		callbacks.onShowSnackbar('Character created successfully!');

		// Navigate to load characters page after a short delay
		setTimeout(() => {
			logger.debug('ui', 'Navigating to character load page');
			callbacks.onNavigateToLoad();
		}, 1500);
	} catch (error) {
		logger.error('ui', 'Error completing character', {
			error: error instanceof Error ? error.message : String(error),
			stack: error instanceof Error ? error.stack : undefined
		});
		callbacks.onShowSnackbar('Error creating character. Please try again.');
	}
};
