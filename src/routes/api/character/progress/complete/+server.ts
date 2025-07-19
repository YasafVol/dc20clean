// src/routes/api/character/progress/complete/+server.ts

import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { classesData } from '$lib/rulesdata/classes';
import { traitsData } from '$lib/rulesdata/traits';
import { ancestriesData } from '$lib/rulesdata/ancestries';
import { skillsData } from '$lib/rulesdata/skills';
import { tradesData } from '$lib/rulesdata/trades';
import { languagesData } from '$lib/rulesdata/languages';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

// Helper function to get an attribute's modifier
// In DC20, the attribute score itself is the modifier.
// Handles null or undefined scores by returning 0.
function getModifier(attributeScore: number | null | undefined): number {
  return attributeScore ?? 0;
}

function validateFeatureChoices(classId: string, selectedChoicesJson: string) {
  const classData = classesData.find(c => c.id === classId);
  if (!classData) throw new Error(`Invalid class ID: ${classId}`);

  const choices = JSON.parse(selectedChoicesJson || '{}');

  for (const requiredChoice of classData.featureChoicesLvl1 || []) {
    if (choices[requiredChoice.id] === undefined) {
      throw new Error(`Missing required choice for ${classData.name}: ${requiredChoice.prompt}`);
    }
    const validOptions = requiredChoice.options.map(o => o.value);
    if (!validOptions.includes(choices[requiredChoice.id])) {
      throw new Error(`Invalid selected option for ${requiredChoice.id} in class ${classData.name}`);
    }
  }
}

function validateAttributeCapsAfterTraits(attributes: any, selectedTraitIdsJson: string) {
  const selectedTraitIds = JSON.parse(selectedTraitIdsJson || '[]');
  const traits = selectedTraitIds.map((id: string) => traitsData.find(t => t.id === id)).filter((t: any) => t !== undefined);

  const finalAttributes = { ...attributes };

  for (const trait of traits) {
    const attrEffect = trait.effects?.find((e: any) => e.type === 'MODIFY_ATTRIBUTE');
    if (attrEffect && attrEffect.target && typeof attrEffect.value === 'number') {
      const attributeKey = `attribute_${attrEffect.target}`;
      if (attributeKey in finalAttributes) {
        finalAttributes[attributeKey] += attrEffect.value;
      }
    }
  }

  const ATTRIBUTE_MAX_L1 = 3;
  for (const [attrName, finalValue] of Object.entries(finalAttributes)) {
    if (finalValue > ATTRIBUTE_MAX_L1) {
      throw new Error(`Final attribute ${attrName.replace('attribute_', '')} exceeds Level 1 cap (+3) after applying traits.`);
    }
  }
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.finalName || typeof data.finalName !== 'string' || data.finalName.trim().length === 0) {
      return json({ error: 'Character name is required.' }, { status: 400 });
    }

    // Validate attributes and point buy (Stage A)
    const attributes = {
      attribute_might: data.attribute_might,
      attribute_agility: data.attribute_agility,
      attribute_charisma: data.attribute_charisma,
      attribute_intelligence: data.attribute_intelligence
    };
    const totalPoints = Object.values(attributes).reduce((sum, v) => sum + (typeof v === 'number' ? v : 0), 0);
    if (totalPoints !== 0) {
      return json({ error: 'Attribute points must sum to 0 (point buy).' }, { status: 400 });
    }

    // Validate ancestry selections (Stage B)
    if (!data.ancestry1Id) {
      return json({ error: 'At least one ancestry must be selected.' }, { status: 400 });
    }
    if (data.ancestry2Id && data.ancestry1Id === data.ancestry2Id) {
      return json({ error: 'Cannot select the same ancestry twice.' }, { status: 400 });
    }

    // Validate selected trait IDs (Stage B)
    try {
      const selectedTraitIds = JSON.parse(data.selectedTraitIds || '[]');
      if (!Array.isArray(selectedTraitIds)) throw new Error();
      // Additional trait validation can be added here
    } catch {
      return json({ error: 'Invalid selectedTraitIds format.' }, { status: 400 });
    }

    // Validate class selection (Stage C)
    if (!data.classId || !classesData.find(c => c.id === data.classId)) {
      return json({ error: 'A valid class must be selected.' }, { status: 400 });
    }

    // Validate feature choices (Stage C)
    try {
      validateFeatureChoices(data.classId, data.selectedFeatureChoices);
    } catch (err: any) {
      return json({ error: err.message }, { status: 400 });
    }

    // Cross-stage validation: attribute caps after traits
    try {
      validateAttributeCapsAfterTraits(attributes, data.selectedTraitIds);
    } catch (err: any) {
      return json({ error: err.message }, { status: 400 });
    }

    // Start a Prisma transaction for atomicity
    const result = await prisma.$transaction(async (tx) => {
      // 1. Upsert CharacterInProgress record
      let characterInProgress;
      if (data.id) {
        characterInProgress = await tx.characterInProgress.update({
          where: { id: data.id },
          data: {
            ...data, // Update all relevant fields from the frontend state
            currentStep: 4, // Mark as completed stage
            updatedAt: new Date(),
          },
        });
      } else {
        // If no ID, it's a new character being finalized directly
        characterInProgress = await tx.characterInProgress.create({
          data: {
            ...data,
            currentStep: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }

      // 2. Prepare data for CharacterSheetData
      // This is the most critical part: map frontend state to CharacterSheetData fields
      // Perform calculations for final stats here using 'data' and rules data

      // Helper to get modifier (attribute score itself)
      const getMod = (attr: number | null | undefined) => attr ?? 0;

      // Combat Mastery (half level rounded up)
      const finalLevel = data.level || 1;
      const finalCombatMastery = Math.ceil(finalLevel / 2);

      // Prime Modifier
      const attributes = [
        { name: 'Might', value: data.attribute_might },
        { name: 'Agility', value: data.attribute_agility },
        { name: 'Charisma', value: data.attribute_charisma },
        { name: 'Intelligence', value: data.attribute_intelligence },
      ];
      let highestAttribute = attributes[0];
      for (let i = 1; i < attributes.length; i++) {
        if (attributes[i].value > highestAttribute.value) {
          highestAttribute = attributes[i];
        }
      }
      const finalPrimeModifierValue = highestAttribute.value;
      const finalPrimeModifierAttribute = highestAttribute.name;

      // Save Masteries
      const finalSaveMasteryMight = finalCombatMastery + (finalPrimeModifierAttribute === 'Might' ? finalPrimeModifierValue : getMod(data.attribute_might));
      const finalSaveMasterityAgility = finalCombatMastery + (finalPrimeModifierAttribute === 'Agility' ? finalPrimeModifierValue : getMod(data.attribute_agility));
      const finalSaveMasteryCharisma = finalCombatMastery + (finalPrimeModifierAttribute === 'Charisma' ? finalPrimeModifierValue : getMod(data.attribute_charisma));
      const finalSaveMasteryIntelligence = finalCombatMastery + (finalPrimeModifierAttribute === 'Intelligence' ? finalPrimeModifierValue : getMod(data.attribute_intelligence));

      // HP, SP, MP Max
      const classData = classesData.find(c => c.id === data.classId);
      const finalHPMax = (classData?.baseHpContribution ?? 8) + getMod(data.attribute_might); // Assuming ancestry HP is 0 for now
      const finalSPMax = classData?.startingSP ?? 0;
      const finalMPMax = classData?.startingMP ?? 0;

      // Defenses
      const finalPD = finalCombatMastery + getMod(data.attribute_agility) + getMod(data.attribute_intelligence);
      const finalAD = finalCombatMastery + getMod(data.attribute_might) + getMod(data.attribute_charisma);

      // Save DC
      const finalSaveDC = 8 + Math.max(getMod(data.attribute_charisma), getMod(data.attribute_intelligence)) + finalCombatMastery;

      // Death Threshold
      const finalDeathThreshold = finalLevel * 2;

      // Movement
      const finalMoveSpeed = 30; // Default for now
      const finalJumpDistance = getMod(data.attribute_agility) < 1 ? 1 : getMod(data.attribute_agility);

      // Points
      const finalRestPoints = 1; // Default for now
      const finalGritPoints = 2 + getMod(data.attribute_charisma); // Base 2 + Charisma Modifier

      // Initiative
      const finalInitiativeBonus = finalCombatMastery + getMod(data.attribute_agility);

      // Ancestry Names
      const ancestry1Name = data.ancestry1Id ? ancestriesData.find(a => a.id === data.ancestry1Id)?.name : null;
      const ancestry2Name = data.ancestry2Id ? ancestriesData.find(a => a.id === data.ancestry2Id)?.name : null;

      // Selected Traits
      const selectedTraitsJson = JSON.stringify(JSON.parse(data.selectedTraitIds || '[]').map((id: string) => {
        const trait = traitsData.find(t => t.id === id);
        return trait ? { id: trait.id, name: trait.name } : null;
      }).filter(Boolean));

      // Class Features Lvl 1
      const classFeaturesLvl1Json = JSON.stringify(JSON.parse(data.selectedFeatureChoices || '{}'));

      // Skills, Trades, Languages, Equipment (assuming raw data from frontend)
      const skillsJson = JSON.stringify(data.skills || []);
      const tradesJson = JSON.stringify(data.trades || []);
      const languagesJson = JSON.stringify(data.languages || []);
      const equipmentJson = JSON.stringify(data.equipment || []);

      const characterSheetDataToCreate = {
        characterInProgressId: characterInProgress.id,
        finalName: data.finalName,
        finalPlayerName: data.finalPlayerName,
        finalLevel: finalLevel,
        finalMight: data.attribute_might,
        finalAgility: data.attribute_agility,
        finalCharisma: data.attribute_charisma,
        finalIntelligence: data.attribute_intelligence,
        finalPrimeModifierValue: finalPrimeModifierValue,
        finalPrimeModifierAttribute: finalPrimeModifierAttribute,
        finalCombatMastery: finalCombatMastery,
        finalSaveMasteryMight: finalSaveMasteryMight,
        finalSaveMasterityAgility: finalSaveMasterityAgility,
        finalSaveMasteryCharisma: finalSaveMasteryCharisma,
        finalSaveMasteryIntelligence: finalSaveMasteryIntelligence,
        finalHPMax: finalHPMax,
        finalSPMax: finalSPMax,
        finalMPMax: finalMPMax,
        finalPD: finalPD,
        finalAD: finalAD,
        finalSaveDC: finalSaveDC,
        finalDeathThreshold: finalDeathThreshold,
        finalMoveSpeed: finalMoveSpeed,
        finalJumpDistance: finalJumpDistance,
        finalRestPoints: finalRestPoints,
        finalGritPoints: finalGritPoints,
        finalInitiativeBonus: finalInitiativeBonus,
        skillsJson: skillsJson,
        tradesJson: tradesJson,
        languagesJson: languagesJson,
        ancestry1Name: ancestry1Name,
        ancestry2Name: ancestry2Name,
        selectedTraitsJson: selectedTraitsJson,
        className: classData?.name || 'Unknown Class',
        classFeaturesLvl1Json: classFeaturesLvl1Json,
        equipmentJson: equipmentJson,
        finalPDR: null, // Placeholder, needs actual logic
        finalEDR: null, // Placeholder, needs actual logic
        finalMDR: null, // Placeholder, needs actual logic
      };

      // Check if a CharacterSheetData already exists for this CharacterInProgress
      const existingCharacterSheet = await tx.characterSheetData.findUnique({
        where: { characterInProgressId: characterInProgress.id },
      });

      let finalCharacterSheet;
      if (existingCharacterSheet) {
        // Update existing CharacterSheetData
        finalCharacterSheet = await tx.characterSheetData.update({
          where: { id: existingCharacterSheet.id },
          data: characterSheetDataToCreate,
        });
      } else {
        // Create new CharacterSheetData
        finalCharacterSheet = await tx.characterSheetData.create({
          data: characterSheetDataToCreate,
        });
      }

      // 3. Link CharacterInProgress to CharacterSheetData
      await tx.characterInProgress.update({
        where: { id: characterInProgress.id },
        data: {
          finalCharacterSheet: {
            connect: { id: finalCharacterSheet.id },
          },
        },
      });

      return { characterInProgressId: characterInProgress.id, characterSheetId: finalCharacterSheet.id };
    });

    return json({ success: true, characterInProgressId: result.characterInProgressId, characterSheetId: result.characterSheetId });
  } catch (err: any) {
    return json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
};
