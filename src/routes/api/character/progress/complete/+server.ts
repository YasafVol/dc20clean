// src/routes/api/character/progress/complete/+server.ts

import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { classesData } from '$lib/rulesdata/loaders/class.loader';
import { traitsData } from '$lib/rulesdata/traits';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

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

    // Save to DB in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Upsert CharacterInProgress by id if provided, else create new
      let character;
      if (data.id) {
        character = await tx.characterInProgress.update({
          where: { id: data.id },
          data: {
            ...data,
            updatedAt: new Date()
          }
        });
      } else {
        character = await tx.characterInProgress.create({
          data: {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
      }
      return character;
    });

    return json({ success: true, id: result.id });
  } catch (err: any) {
    return json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
};
