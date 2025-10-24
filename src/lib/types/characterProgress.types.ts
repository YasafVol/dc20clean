/**
 * Character creation progress data structure
 * Originally defined in prisma/schema.prisma
 * Now managed in-memory and persisted to localStorage
 */
export interface CharacterInProgress {
  id: string;

  // Stage A: Attributes
  attribute_might: number;
  attribute_agility: number;
  attribute_charisma: number;
  attribute_intelligence: number;
  usePrimeCapRule?: boolean;
  pointsSpent: number;
  currentStep: number;

  // Core Stats
  level: number;
  combatMastery: number;

  // Stage B: Ancestry
  ancestry1Id: string | null;
  ancestry2Id: string | null;
  selectedTraitIds: string;
  ancestryPointsSpent: number;

  // Stage C: Class
  classId: string | null;
  selectedFeatureChoices: string;

  // Save Masteries
  saveMasteryMight: boolean;
  saveMasteryAgility: boolean;
  saveMasteryCharisma: boolean;
  saveMasteryIntelligence: boolean;

  // Stage F: Details
  finalName: string | null;
  finalPlayerName: string | null;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
