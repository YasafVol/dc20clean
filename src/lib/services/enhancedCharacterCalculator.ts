/**
 * Enhanced Character Calculator with Effect Attribution
 * 
 * This is the unified calculation engine that provides detailed breakdowns
 * for tooltips and real-time validation for the UI.
 */

import type { 
  EnhancedCalculationResult, 
  EnhancedCharacterBuildData, 
  AttributedEffect, 
  EffectSource, 
  EnhancedStatBreakdown,
  ValidationResult,
  ValidationError,
  AttributeLimit,
  UnresolvedChoice,
  ChoiceOption,
  EffectPreview,
  TraitChoiceStorage,
  BuildStep
} from '../types/effectSystem';

import { traitsData } from '../rulesdata/_new_schema/traits';
import { ancestriesData } from '../rulesdata/_new_schema/ancestries';
import { barbarianClass } from '../rulesdata/_new_schema/barbarian_features';
import { clericClass } from '../rulesdata/_new_schema/cleric_features';
import { hunterClass } from '../rulesdata/_new_schema/hunter_features';
import { championClass } from '../rulesdata/_new_schema/champion_features';
import { wizardClass } from '../rulesdata/_new_schema/wizard_features';
import { monkClass } from '../rulesdata/_new_schema/monk_features';
import { rogueClass } from '../rulesdata/_new_schema/rogue_features';
import { sorcererClass } from '../rulesdata/_new_schema/sorcerer_features';
import { spellbladeClass } from '../rulesdata/_new_schema/spellblade_features';
import { warlockClass } from '../rulesdata/_new_schema/warlock_features';
import { bardClass } from '../rulesdata/_new_schema/bard_features';
import { druidClass } from '../rulesdata/_new_schema/druid_features';
import { commanderClass } from '../rulesdata/_new_schema/commander_features';
import barbarianTable from '../rulesdata/_new_schema/barbarian_table.json';
import clericTable from '../rulesdata/_new_schema/cleric_table.json';
import hunterTable from '../rulesdata/_new_schema/hunter_table.json';
import championTable from '../rulesdata/_new_schema/champion_table.json';
import wizardTable from '../rulesdata/_new_schema/wizard_table.json';
import monkTable from '../rulesdata/_new_schema/monk_table.json';
import rogueTable from '../rulesdata/_new_schema/rogue_table.json';
import sorcererTable from '../rulesdata/_new_schema/sorcerer_table.json';
import spellbladeTable from '../rulesdata/_new_schema/spellblade_table.json';
import warlockTable from '../rulesdata/_new_schema/warlock_table.json';
import bardTable from '../rulesdata/_new_schema/bard_table.json';
import druidTable from '../rulesdata/_new_schema/druid_table.json';
import commanderTable from '../rulesdata/_new_schema/commander_table.json';
import { attributesData } from '../rulesdata/attributes';
import { skillsData } from '../rulesdata/skills';
import { tradesData } from '../rulesdata/trades';
import type { Effect, ClassDefinition } from '../rulesdata/schemas/character.schema';

/**
 * Safe JSON parse with fallback
 */
function safeJsonParse<T>(jsonString: string | undefined | null, fallback: T): T {
  if (!jsonString || typeof jsonString !== 'string') {
    return fallback;
  }
  
  try {
    const parsed = JSON.parse(jsonString);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (error) {
    console.warn('Failed to parse JSON:', jsonString, 'Error:', error);
    return fallback;
  }
}

/**
 * Convert character context data to enhanced build data
 */
export function convertToEnhancedBuildData(contextData: any): EnhancedCharacterBuildData {
  return {
    id: contextData.id || '',
    finalName: contextData.finalName || '',
    finalPlayerName: contextData.finalPlayerName,
    level: contextData.level || 1,
    
    attribute_might: contextData.attribute_might || 0,
    attribute_agility: contextData.attribute_agility || 0,
    attribute_charisma: contextData.attribute_charisma || 0,
    attribute_intelligence: contextData.attribute_intelligence || 0,
    
    combatMastery: contextData.combatMastery || 1,
    
    classId: contextData.classId || '',
    ancestry1Id: contextData.ancestry1Id || undefined,
    ancestry2Id: contextData.ancestry2Id || undefined,
    
    selectedTraitIds: Array.isArray(contextData.selectedTraitIds)
      ? contextData.selectedTraitIds
      : [],
    selectedTraitChoices: contextData.selectedTraitChoices ?? {},
    featureChoices: contextData.selectedFeatureChoices ?? {},
    
    // FIX: Serialize live store objects into the JSON strings the engine expects
    skillsJson: JSON.stringify(contextData.skillsData ?? {}),
    tradesJson: JSON.stringify(contextData.tradesData ?? {}),
    // Default Common to fluent when empty to match current UI assumptions
    languagesJson: JSON.stringify(contextData.languagesData ?? { common: { fluency: 'fluent' } }),
    
    // Optional manual overrides supported by the engine
    manualPD: contextData.manualPD,
    manualAD: contextData.manualAD,
    manualPDR: contextData.manualPDR,
    
    lastModified: Date.now()
  };
}

/**
 * Get class level progression data by ID
 */
function getClassProgressionData(classId: string): any | null {
  switch (classId) {
    case 'barbarian':
      return barbarianTable;
    case 'cleric':
      return clericTable;
    case 'hunter':
      return hunterTable;
    case 'champion':
      return championTable;
    case 'wizard':
      return wizardTable;
    case 'monk':
      return monkTable;
    case 'rogue':
      return rogueTable;
    case 'sorcerer':
      return sorcererTable;
    case 'spellblade':
      return spellbladeTable;
    case 'warlock':
      return warlockTable;
    case 'bard':
      return bardTable;
    case 'druid':
      return druidTable;
    case 'commander':
      return commanderTable;
    default:
      return null;
  }
}

/**
 * Get class features by ID (for abilities)
 */
function getClassFeatures(classId: string): ClassDefinition | null {
  switch (classId) {
    case 'barbarian':
      return barbarianClass;
    case 'cleric':
      return clericClass;
    case 'hunter':
      return hunterClass;
    case 'champion':
      return championClass;
    case 'wizard':
      return wizardClass;
    case 'monk':
      return monkClass;
    case 'rogue':
      return rogueClass;
    case 'sorcerer':
      return sorcererClass;
    case 'spellblade':
      return spellbladeClass;
    case 'warlock':
      return warlockClass;
    case 'bard':
      return bardClass;
    case 'druid':
      return druidClass;
    case 'commander':
      return commanderClass;
    default:
      return null;
  }
}

/**
 * Aggregate all effects with source attribution
 */
function aggregateAttributedEffects(buildData: EnhancedCharacterBuildData): AttributedEffect[] {
  const effects: AttributedEffect[] = [];
  
  // Add effects from selected traits
  for (const traitId of buildData.selectedTraitIds) {
    const trait = traitsData.find(t => t.id === traitId);
    if (trait?.effects) {
      for (const [effectIndex, effect] of trait.effects.entries()) {
        effects.push({
          ...effect,
          source: {
            type: 'trait',
            id: traitId,
            name: trait.name,
            description: trait.description,
            category: 'Selected Trait'
          },
          resolved: !effect.userChoice,
          dependsOnChoice: effect.userChoice ? `${traitId}-${effectIndex}` : undefined
        });
      }
    }
  }
  
  // Add effects from class features
  const classFeatures = getClassFeatures(buildData.classId);
  if (classFeatures) {
    for (const feature of classFeatures.coreFeatures) {
      // Direct feature effects
      if (feature.effects) {
        for (const effect of feature.effects) {
          effects.push({
            ...effect,
            source: {
              type: 'class_feature',
              id: feature.featureName,
              name: feature.featureName,
              description: feature.description,
              category: `${classFeatures.className} Level ${feature.levelGained}`
            },
            resolved: true
          });
        }
      }
      
      // Benefits within features
      if (feature.benefits) {
        for (const benefit of feature.benefits) {
          if (benefit.effects) {
            for (const effect of benefit.effects) {
              effects.push({
                ...effect,
                source: {
                  type: 'class_feature',
                  id: `${feature.featureName}_${benefit.name}`,
                  name: benefit.name,
                  description: benefit.description,
                  category: `${classFeatures.className} Level ${feature.levelGained}`
                },
                resolved: true
              });
            }
          }
        }
      }
      
      // Chosen options from feature choices
      if (feature.choices) {
        for (const choice of feature.choices) {
          const userChoice = buildData.featureChoices[choice.id];
          if (userChoice) {
            for (const option of choice.options) {
              if (userChoice === option.name || 
                  (Array.isArray(userChoice) && userChoice.includes(option.name))) {
                if (option.effects) {
                  for (const effect of option.effects) {
                    effects.push({
                      ...effect,
                      source: {
                        type: 'choice',
                        id: `${choice.id}_${option.name}`,
                        name: option.name,
                        description: option.description,
                        category: `${classFeatures.className} Choice`
                      },
                      resolved: true
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  return effects;
}

/**
 * Resolve user choices in effects
 */
function resolveEffectChoices(effects: AttributedEffect[], choices: TraitChoiceStorage): AttributedEffect[] {
  return effects.map(effect => {
    if (!effect.userChoice || !effect.dependsOnChoice) {
      return effect;
    }
    
    const chosenValue = choices[effect.dependsOnChoice];
    if (!chosenValue) {
      return effect; // Unresolved
    }
    
    // Resolve the choice
    let resolvedEffect = { ...effect };
    if (effect.target === 'any_attribute' && effect.type === 'MODIFY_ATTRIBUTE') {
      resolvedEffect.target = chosenValue;
      resolvedEffect.resolved = true;
      resolvedEffect.resolvedValue = chosenValue;
    } else if (effect.target === 'any_skill' && effect.type === 'GRANT_SKILL_EXPERTISE') {
      resolvedEffect.target = chosenValue;
      resolvedEffect.resolved = true;
      resolvedEffect.resolvedValue = chosenValue;
    } else if (effect.target === 'any_trade' && effect.type === 'GRANT_TRADE_EXPERTISE') {
      resolvedEffect.target = chosenValue;
      resolvedEffect.resolved = true;
      resolvedEffect.resolvedValue = chosenValue;
    }
    
    return resolvedEffect;
  });
}

/**
 * Create detailed stat breakdown
 */
function createStatBreakdown(
  statName: string, 
  baseValue: number, 
  effects: AttributedEffect[]
): EnhancedStatBreakdown {
  const relevantEffects = effects.filter(effect => {
    if (!effect.resolved) return false;
    
    // Map effect types to stat names
    if (effect.type === 'MODIFY_ATTRIBUTE') {
      return statName === `attribute_${effect.target}` || statName === effect.target;
    }
    if (effect.type === 'MODIFY_STAT') {
      return statName === effect.target;
    }
    
    return false;
  });
  
  const breakdown: EnhancedStatBreakdown = {
    statName,
    base: baseValue,
    effects: relevantEffects.map(effect => ({
      source: effect.source,
      value: effect.value as number,
      condition: effect.condition,
      description: `${effect.source.name}: ${effect.value > 0 ? '+' : ''}${effect.value}${effect.condition ? ` (${effect.condition})` : ''}`,
      isActive: !effect.condition // For now, assume conditional effects are not active
    })),
    total: baseValue + relevantEffects.reduce((sum, effect) => {
      if (!effect.condition) { // Only count non-conditional effects in total
        return sum + (effect.value as number);
      }
      return sum;
    }, 0)
  };
  
  // Calculate conditional total
  breakdown.conditionalTotal = baseValue + relevantEffects.reduce((sum, effect) => {
    return sum + (effect.value as number);
  }, 0);
  
  return breakdown;
}

/**
 * Validate attribute limits
 */
function validateAttributeLimits(buildData: EnhancedCharacterBuildData, effects: AttributedEffect[]): Record<string, AttributeLimit> {
  const limits: Record<string, AttributeLimit> = {};
  
  for (const attr of attributesData) {
    const baseValue = (buildData as any)[`attribute_${attr.id}`] || 0;
    const traitBonuses = effects
      .filter(effect => 
        effect.resolved && 
        effect.type === 'MODIFY_ATTRIBUTE' && 
        effect.target === attr.id
      )
      .reduce((sum, effect) => sum + (effect.value as number), 0);
    
    const current = baseValue + traitBonuses;
    const max = 3; // Level 1 limit
    
    limits[attr.id] = {
      current,
      base: baseValue,
      traitBonuses,
      max,
      exceeded: current > max,
      canIncrease: current < max,
      canDecrease: baseValue > -2
    };
  }
  
  return limits;
}

/**
 * Get unresolved choices for character creation UI
 */
function getUnresolvedChoices(effects: AttributedEffect[]): UnresolvedChoice[] {
  return effects
    .filter(effect => effect.userChoice && !effect.resolved)
    .map(effect => {
      const options = getOptionsForEffect(effect);
      
      return {
        traitId: effect.source.id,
        traitName: effect.source.name,
        effectIndex: 0, // Would need to track this properly
        effect,
        prompt: effect.userChoice!.prompt,
        options,
        isRequired: true
      };
    });
}

/**
 * Get choice options for an effect
 */
function getOptionsForEffect(effect: AttributedEffect): ChoiceOption[] {
  const baseOptions = effect.userChoice?.options || [];
  
  if (effect.type === 'MODIFY_ATTRIBUTE' && baseOptions.length === 0) {
    return attributesData.map(attr => ({
      value: attr.id,
      displayName: attr.name,
      description: attr.description,
      isValid: true // Would need proper validation
    }));
  }
  
  if (effect.type === 'GRANT_SKILL_EXPERTISE' && baseOptions.length === 0) {
    return skillsData.map(skill => ({
      value: skill.id,
      displayName: skill.name,
      description: skill.description,
      isValid: true
    }));
  }
  
  if (effect.type === 'GRANT_TRADE_EXPERTISE' && baseOptions.length === 0) {
    return tradesData.map(trade => ({
      value: trade.id,
      displayName: trade.name,
      description: trade.description,
      isValid: true
    }));
  }
  
  return baseOptions.map(option => ({
    value: option,
    displayName: option,
    isValid: true
  }));
}

/**
 * Main calculation function with detailed breakdowns
 */
export function calculateCharacterWithBreakdowns(
  buildData: EnhancedCharacterBuildData
): EnhancedCalculationResult {
  
  // 1. Aggregate all effects with source attribution
  const rawEffects = aggregateAttributedEffects(buildData);
  
  // 2. Resolve user choices
  const resolvedEffects = resolveEffectChoices(rawEffects, buildData.selectedTraitChoices);
  
  // 3. Calculate base stats
  const classProgressionData = getClassProgressionData(buildData.classId);
  const baseHP = 0; // Will calculate from level progression
  const baseSP = 0; // Will calculate from level progression  
  const baseMP = 0; // Will calculate from level progression
  
  // 4. Create detailed breakdowns
  const breakdowns: Record<string, EnhancedStatBreakdown> = {};
  
  // Attributes
  for (const attr of attributesData) {
    const baseValue = (buildData as any)[`attribute_${attr.id}`] || 0;
    breakdowns[`attribute_${attr.id}`] = createStatBreakdown(attr.id, baseValue, resolvedEffects);
  }
  
  // Calculate final attribute values
  const finalMight = breakdowns.attribute_might.total;
  const finalAgility = breakdowns.attribute_agility.total;
  const finalCharisma = breakdowns.attribute_charisma.total;
  const finalIntelligence = breakdowns.attribute_intelligence.total;
  
  // Derived stats
  const combatMastery = buildData.combatMastery;
  
  // Health & Resources - sum from level progression + modifiers
  let finalHPMax = finalMight; // Base from Might
  let finalSPMax = 0;
  let finalMPMax = 0;
  
  // Calculate from level progression if available
  if (classProgressionData?.levelProgression) {
    for (let level = 1; level <= buildData.level; level++) {
      const levelData = classProgressionData.levelProgression.find((lp: any) => lp.level === level);
      if (levelData) {
        finalHPMax += levelData.healthPoints || 0;
        finalSPMax += levelData.staminaPoints || 0;
        finalMPMax += levelData.manaPoints || 0;
      }
    }
  } else {
    // Fallback to base calculation
    finalHPMax += baseHP + (buildData.level - 1);
    finalSPMax = baseSP + finalAgility;
    finalMPMax = baseMP + finalIntelligence;
  }
  
  // Apply effect modifiers
  finalHPMax += resolvedEffects.filter(e => e.type === 'MODIFY_STAT' && e.target === 'hpMax').reduce((sum, e) => sum + (e.value as number), 0);
  finalSPMax += resolvedEffects.filter(e => e.type === 'MODIFY_STAT' && e.target === 'spMax').reduce((sum, e) => sum + (e.value as number), 0);
  finalMPMax += resolvedEffects.filter(e => e.type === 'MODIFY_STAT' && e.target === 'mpMax').reduce((sum, e) => sum + (e.value as number), 0);
  
  // Defenses with modifiers
  const basePD = 8 + combatMastery + finalAgility + finalIntelligence;
  const baseAD = 8 + combatMastery + finalMight + finalCharisma;
  const pdModifiers = resolvedEffects.filter(e => e.type === 'MODIFY_STAT' && e.target === 'pd').reduce((sum, e) => sum + (e.value as number), 0);
  const adModifiers = resolvedEffects.filter(e => e.type === 'MODIFY_STAT' && e.target === 'ad').reduce((sum, e) => sum + (e.value as number), 0);
  const finalPD = buildData.manualPD ?? (basePD + pdModifiers);
  const finalAD = buildData.manualAD ?? (baseAD + adModifiers);
  const finalPDR = buildData.manualPDR ?? 0;
  
  // Calculate prime attribute first
  const maxValue = Math.max(finalMight, finalAgility, finalCharisma, finalIntelligence);
  
  // Calculate other derived stats first
  const finalSaveDC = 8 + combatMastery + maxValue;
  const finalSaveMight = finalMight + combatMastery;
  const finalSaveAgility = finalAgility + combatMastery;
  const finalSaveCharisma = finalCharisma + combatMastery;
  const finalSaveIntelligence = finalIntelligence + combatMastery;
  const finalDeathThreshold = maxValue + combatMastery; // Prime + Combat Mastery (usually -4)
  const finalMoveSpeed = 5 + resolvedEffects.filter(e => e.type === 'MODIFY_STAT' && e.target === 'moveSpeed').reduce((sum, e) => sum + (e.value as number), 0);
  const finalJumpDistance = finalAgility + resolvedEffects.filter(effect => effect.type === 'MODIFY_STAT' && effect.target === 'jumpDistance').reduce((sum, effect) => sum + (effect.value as number), 0);
  const finalRestPoints = finalHPMax; // Rest Points = HP
  const finalGritPoints = Math.max(0, 2 + finalCharisma); // 2 + Charisma (minimum 0)
  const finalInitiativeBonus = finalAgility;
  
  // Create breakdowns for derived stats
  breakdowns.hpMax = createStatBreakdown('hpMax', finalHPMax, resolvedEffects);
  breakdowns.spMax = createStatBreakdown('spMax', finalSPMax, resolvedEffects);
  breakdowns.mpMax = createStatBreakdown('mpMax', finalMPMax, resolvedEffects);
  breakdowns.pd = createStatBreakdown('pd', basePD, resolvedEffects);
  breakdowns.ad = createStatBreakdown('ad', baseAD, resolvedEffects);
  
  // Movement breakdowns
  breakdowns.move_speed = createStatBreakdown('moveSpeed', finalMoveSpeed, resolvedEffects);
  breakdowns.jump_distance = createStatBreakdown('jumpDistance', finalJumpDistance, resolvedEffects);
  
  // Combat breakdowns
  const attackSpellCheckBase = combatMastery + maxValue;
  breakdowns.attack_spell_check = createStatBreakdown('attackSpellCheck', attackSpellCheckBase, resolvedEffects);
  breakdowns.save_dc = createStatBreakdown('saveDC', finalSaveDC, resolvedEffects);
  
  // Martial check is Attack/Spell Check + Action Points bonus (calculated at runtime)
  // For now, just use the base attack/spell check value
  breakdowns.martial_check = createStatBreakdown('martialCheck', attackSpellCheckBase, resolvedEffects);
  
  // Other stats
  const primeAttribute = ['might', 'agility', 'charisma', 'intelligence'].find(attr => {
    return breakdowns[`attribute_${attr}`].total === maxValue;
  }) || 'might';
  
  // 4.5. Compute background points (ported from useBackgroundPoints)
  const skills = JSON.parse(buildData.skillsJson || '{}') as Record<string, number>;
  const trades = JSON.parse(buildData.tradesJson || '{}') as Record<string, number>;
  const languages = JSON.parse(buildData.languagesJson || '{"common":{"fluency":"fluent"}}') as Record<string, { fluency: 'limited'|'fluent' }>;

  const skillPointsUsed = Object.values(skills).reduce((a, b) => a + (b || 0), 0);
  const tradePointsUsed = Object.values(trades).reduce((a, b) => a + (b || 0), 0);
  const languagePointsUsed = Object.entries(languages).reduce((sum, [id, d]) => id === 'common' ? sum : sum + (d.fluency === 'limited' ? 1 : 2), 0);

  const bonus = (target: string) =>
    resolvedEffects.filter(e => e.type === 'MODIFY_STAT' && e.target === target)
                   .reduce((s, e) => s + Number(e.value || 0), 0);

  const baseSkillPoints = 5 + finalIntelligence + bonus('skillPoints');
  const baseTradePoints = 3 + bonus('tradePoints');
  const baseLanguagePoints = 2 + bonus('languagePoints');

  const { skillToTrade = 0, tradeToSkill = 0, tradeToLanguage = 0 } = (buildData as any).conversions || {};

  const availableSkillPoints = baseSkillPoints - skillToTrade + Math.floor(tradeToSkill / 2);
  const availableTradePoints = baseTradePoints - tradeToSkill + (skillToTrade * 2) - tradeToLanguage;
  const availableLanguagePoints = baseLanguagePoints + (tradeToLanguage * 2);

  // Calculate ancestry points
  const selectedTraitCosts = buildData.selectedTraitIds.reduce((total, traitId) => {
    const trait = traitsData.find(t => t.id === traitId);
    return total + (trait?.cost || 0);
  }, 0);

  const baseAncestryPoints = 5 + bonus('ancestryPoints'); // Base 5 + any bonuses from effects
  const ancestryPointsUsed = selectedTraitCosts;
  const ancestryPointsRemaining = baseAncestryPoints - ancestryPointsUsed;

  // Background section for UI consumption
  const background = {
    baseSkillPoints,
    baseTradePoints,
    baseLanguagePoints,
    availableSkillPoints,
    availableTradePoints,
    availableLanguagePoints,
    skillPointsUsed,
    tradePointsUsed,
    languagePointsUsed,
    conversions: { skillToTrade, tradeToSkill, tradeToLanguage }
  };

  // Ancestry section for UI consumption
  const ancestry = {
    baseAncestryPoints,
    ancestryPointsUsed,
    ancestryPointsRemaining
  };
  
  // 5. Validation with step-aware errors
  const errors: ValidationError[] = [];
  
  // Ancestry point validation
  if (ancestryPointsUsed > baseAncestryPoints) {
    errors.push({
      step: BuildStep.Ancestry,
      field: 'ancestryPoints',
      code: 'POINTS_OVERBUDGET',
      message: `You are ${ancestryPointsUsed - baseAncestryPoints} ancestry point(s) over budget.`
    });
  }

  // Background point validation
  if (skillPointsUsed > availableSkillPoints) {
    errors.push({ 
      step: BuildStep.Background, 
      field: 'skillPoints', 
      code: 'POINTS_OVERBUDGET', 
      message: `You are ${skillPointsUsed - availableSkillPoints} skill point(s) over budget.` 
    });
  }
  if (tradePointsUsed > availableTradePoints) {
    errors.push({ 
      step: BuildStep.Background, 
      field: 'tradePoints', 
      code: 'POINTS_OVERBUDGET', 
      message: `You are ${tradePointsUsed - availableTradePoints} trade point(s) over budget.` 
    });
  }
  if (languagePointsUsed > availableLanguagePoints) {
    errors.push({ 
      step: BuildStep.Background, 
      field: 'languagePoints', 
      code: 'POINTS_OVERBUDGET', 
      message: `You are ${languagePointsUsed - availableLanguagePoints} language point(s) over budget.` 
    });
  }

  const attributeLimits = validateAttributeLimits(buildData, resolvedEffects);
  const validation: ValidationResult = {
    isValid: errors.length === 0 && !Object.values(attributeLimits).some(limit => limit.exceeded),
    errors,
    warnings: [],
    attributeLimits,
    masteryLimits: {
      maxSkillMastery: 1, // Default for level 1
      maxTradeMastery: 1,
      currentAdeptCount: 0,
      maxAdeptCount: 1,
      canSelectAdept: true
    }
  };
  
  // 6. Collect abilities and features
  const grantedAbilities = resolvedEffects
    .filter(effect => effect.resolved && effect.type === 'GRANT_ABILITY')
    .map(effect => ({
      name: effect.target,
      description: effect.value as string,
      source: effect.source,
      type: 'active' as const,
      isConditional: !!effect.condition,
      condition: effect.condition
    }));
  
  // 7. Conditional modifiers
  const conditionalModifiers = resolvedEffects
    .filter(effect => effect.resolved && effect.condition)
    .map(effect => ({
      effect,
      condition: effect.condition!,
      description: `${effect.source.name}: ${effect.value > 0 ? '+' : ''}${effect.value} ${effect.target} while ${effect.condition}`,
      affectedStats: [effect.target]
    }));
  
  // 8. Get unresolved choices
  const unresolvedChoices = getUnresolvedChoices(resolvedEffects);
  
  return {
    stats: {
      finalMight,
      finalAgility,
      finalCharisma,
      finalIntelligence,
      finalHPMax,
      finalSPMax,
      finalMPMax,
      finalPD,
      finalAD,
      finalPDR,
      finalMoveSpeed,
      finalJumpDistance,
      finalDeathThreshold,
      finalSaveDC,
      finalSaveMight,
      finalSaveAgility,
      finalSaveCharisma,
      finalSaveIntelligence,
      finalInitiativeBonus,
      finalRestPoints,
      finalGritPoints,
      
      // Prime modifier and combat mastery (needed for UI compatibility)
      finalPrimeModifierValue: maxValue,
      finalPrimeModifierAttribute: primeAttribute,
      finalCombatMastery: combatMastery,
      
      // Class and ancestry info for UI
      className: getClassFeatures(buildData.classId)?.className || 'Unknown',
      ancestry1Name: ancestriesData.find(a => a.id === buildData.ancestry1Id)?.name,
      ancestry2Name: ancestriesData.find(a => a.id === buildData.ancestry2Id)?.name
    },
    breakdowns,
    grantedAbilities,
    conditionalModifiers,
    combatTraining: [],
    resistances: [],
    vulnerabilities: [],
    senses: [],
    movements: [],
    background,
    ancestry,
    validation,
    unresolvedChoices,
    cacheTimestamp: Date.now(),
    isFromCache: false
  };
}
