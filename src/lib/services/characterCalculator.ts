// DC20 Character Calculator Service
// Handles calculation of derived stats based on DC20 rules

import { skillsData } from '../rulesdata/skills';
import { ancestriesData } from '../rulesdata/ancestries';
import type { IClassDefinition } from '../rulesdata/types';

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
  finalPD: number;
  finalAD: number;
  
  // Other Stats
  finalSaveDC: number;
  finalDeathThreshold: number;
  finalMoveSpeed: number;
  finalJumpDistance: number;
  finalRestPoints: number;
  finalGritPoints: number;
  finalInitiativeBonus: number;
  
  // PDR (Physical Damage Reduction)
  finalPDR: number;
  
  // Class & Ancestry Info
  classId: string | null;
  className: string;
  ancestry1Id: string | null;
  ancestry1Name?: string;
  ancestry2Id: string | null;
  ancestry2Name?: string;
  
  // JSON data fields
  skillsJson?: string;
  tradesJson?: string;
  languagesJson?: string;
}

// Import class data (we need to create this import based on what's available)
const getClassData = async (classId: string): Promise<IClassDefinition | null> => {
  try {
    // Dynamic import of class data
    const { classesData } = await import('../rulesdata/classes');
    
    const classData = classesData.find(c => c.id === classId);
    return classData || null;
  } catch (error) {
    console.warn('Could not load class data:', error);
    return null;
  }
};

// Get ancestry data by ID
const getAncestryData = (ancestryId: string | null): { id: string; name: string } | null => {
  if (!ancestryId) return null;
  
  const ancestry = ancestriesData.find(a => a.id === ancestryId);
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
  
  const highest = attrArray.reduce((prev, curr) => 
    curr.value > prev.value ? curr : prev
  );
  
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
  // PD = 8 + CM + Agility + Intelligence + Bonuses
  const finalPD = 8 + finalCombatMastery + finalAgility + finalIntelligence;
  
  // AD = 8 + CM + Might + Charisma + Bonuses  
  const finalAD = 8 + finalCombatMastery + finalMight + finalCharisma;
  
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
  const finalJumpDistance = Math.max(1, finalAgility);
  
  // Grit Points = 2 + Charisma (from class base)
  const baseGritPoints = classData?.gritPointsBase || 2;
  const finalGritPoints = baseGritPoints + finalCharisma;
  
  // Calculate PDR (Physical Damage Reduction)
  const finalPDR = calculatePDR(characterData, classData);
  
  // Default skills if not provided
  let skillsJson = characterData.skillsJson;
  if (!skillsJson) {
    // Create default skills with 0 proficiency
    const defaultSkills: Record<string, number> = {};
    skillsData.forEach(skill => {
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
    
    // PDR (Physical Damage Reduction)
    finalPDR,
    
    // Class & Ancestry Info
    classId: characterData.classId,
    className: classData?.name || 'Unknown',
    ancestry1Id: characterData.ancestry1Id,
    ancestry1Name: ancestry1Data?.name,
    ancestry2Id: characterData.ancestry2Id,
    ancestry2Name: ancestry2Data?.name,
    
    // JSON data fields
    skillsJson,
    tradesJson: characterData.tradesJson || '{}',
    languagesJson: characterData.languagesJson || '{"common": {"fluency": "fluent"}}'
  };
};

// Helper function to calculate PDR (Physical Damage Reduction)
const calculatePDR = (characterData: CharacterInProgressData, classData: any): number => {
  let pdr = 0;
  
  // Check for Beastborn Natural Armor trait
  if (characterData.selectedTraitIds) {
    try {
      const selectedTraits = JSON.parse(characterData.selectedTraitIds);
      if (selectedTraits.includes('beastborn_natural_armor')) {
        // Natural Armor grants PDR when not wearing armor
        // According to DC20 rules, this grants PDR (Physical Damage Reduction)
        pdr += 1;
      }
    } catch (error) {
      console.warn('Error parsing selectedTraitIds for PDR calculation:', error);
    }
  }
  
  // Check for Barbarian Rage ability
  if (classData?.id === 'barbarian') {
    // Barbarian Rage grants Resistance (Half) to Physical damage
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
