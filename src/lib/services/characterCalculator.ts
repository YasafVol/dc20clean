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
  
  // Save Masteries (DC20 p.22 - choose 2 attributes for Save Mastery)
  saveMasteryMight: boolean;
  saveMasteryAgility: boolean;
  saveMasteryCharisma: boolean;
  saveMasteryIntelligence: boolean;
  
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
  
  // Save Masteries (DC20 p.22)
  finalSaveMasteryMight: number;
  finalSaveMasteryAgility: number;
  finalSaveMasteryCharisma: number;
  finalSaveMasteryIntelligence: number;
  
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
  
  // Calculate Save Masteries (DC20 p.22)
  // Save Mastery = Combat Mastery + Attribute Modifier (only for selected attributes)
  const finalSaveMasteryMight = characterData.saveMasteryMight 
    ? finalCombatMastery + finalMight 
    : finalMight;
  const finalSaveMasteryAgility = characterData.saveMasteryAgility 
    ? finalCombatMastery + finalAgility 
    : finalAgility;
  const finalSaveMasteryCharisma = characterData.saveMasteryCharisma 
    ? finalCombatMastery + finalCharisma 
    : finalCharisma;
  const finalSaveMasteryIntelligence = characterData.saveMasteryIntelligence 
    ? finalCombatMastery + finalIntelligence 
    : finalIntelligence;
    
  console.log('Save Mastery calculations:', {
    combatMastery: finalCombatMastery,
    selections: {
      might: characterData.saveMasteryMight,
      agility: characterData.saveMasteryAgility,
      charisma: characterData.saveMasteryCharisma,
      intelligence: characterData.saveMasteryIntelligence
    },
    results: {
      might: finalSaveMasteryMight,
      agility: finalSaveMasteryAgility,
      charisma: finalSaveMasteryCharisma,
      intelligence: finalSaveMasteryIntelligence
    }
  });
  
  // Jump Distance = Agility (min 1)
  const finalJumpDistance = Math.max(1, finalAgility);
  
  // Grit Points = 2 + Charisma (from class base)
  const baseGritPoints = classData?.gritPointsBase || 2;
  const finalGritPoints = baseGritPoints + finalCharisma;
  
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
    
    // Save Masteries (DC20 p.22)
    finalSaveMasteryMight,
    finalSaveMasteryAgility,
    finalSaveMasteryCharisma,
    finalSaveMasteryIntelligence,
    
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
