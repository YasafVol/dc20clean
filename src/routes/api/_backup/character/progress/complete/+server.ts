// src/routes/api/character/progress/complete/+server.ts

import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { classesData } from '$lib/rulesdata/loaders/class.loader';
import { findClassByName, getLegacyChoiceId } from '$lib/rulesdata/loaders/class-features.loader';
import { traitsData } from '$lib/rulesdata/_new_schema/traits';
import { processTraitEffects } from '$lib/services/traitEffectProcessor';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

function validateFeatureChoices(classId: string, selectedChoicesJson: string) {
	const classData = classesData.find((c) => c.id === classId);
	if (!classData) throw new Error(`Invalid class ID: ${classId}`);

	const choices = JSON.parse(selectedChoicesJson || '{}');

	// Use the new class features structure for validation
	const classFeatures = findClassByName(classData.name);
	if (!classFeatures) return; // No class features to validate

	// Get level 1 features that have choices
	const level1Features = classFeatures.coreFeatures.filter((feature) => feature.levelGained === 1);

	level1Features.forEach((feature) => {
		if (feature.choices) {
			feature.choices.forEach((choice, choiceIndex) => {
				// Create the same legacy choice ID mapping used in the UI
				const choiceId = getLegacyChoiceId(
					classFeatures.className,
					feature.featureName,
					choiceIndex
				);

				if (choice.options && choice.options.length > 0) {
					const selectedValue = choices[choiceId];
					if (selectedValue === undefined) {
						throw new Error(`Missing required choice for ${classData.name}: ${choice.prompt}`);
					}

					// Validate the selected option(s)
					if (choice.count > 1) {
						// Multiple selections - should be a JSON array
						try {
							const selectedValues: string[] = JSON.parse(selectedValue);
							const validOptions = choice.options.map((o) => o.name);
							for (const value of selectedValues) {
								if (!validOptions.includes(value)) {
									throw new Error(
										`Invalid selected option for ${choiceId} in class ${classData.name}`
									);
								}
							}
							if (selectedValues.length !== choice.count) {
								throw new Error(
									`Must select exactly ${choice.count} options for ${choiceId} in class ${classData.name}`
								);
							}
						} catch (error) {
							throw new Error(
								`Invalid selection format for ${choiceId} in class ${classData.name}`
							);
						}
					} else {
						// Single selection
						const validOptions = choice.options.map((o) => o.name);
						if (!validOptions.includes(selectedValue)) {
							throw new Error(`Invalid selected option for ${choiceId} in class ${classData.name}`);
						}
					}
				}
			});
		}
	});
}

function validateAttributeCapsAfterTraits(
	attributes: any,
	selectedTraitIdsJson: string,
	ancestry1Id: string | null,
	ancestry2Id: string | null
) {
	const selectedTraitIds = JSON.parse(selectedTraitIdsJson || '[]');

	// Use the same trait processing logic as the calculator
	const processedEffects = processTraitEffects(selectedTraitIds, ancestry1Id, ancestry2Id);

	// Apply attribute modifiers
	const finalAttributes = {
		attribute_might: attributes.attribute_might + processedEffects.attributeModifiers.might,
		attribute_agility: attributes.attribute_agility + processedEffects.attributeModifiers.agility,
		attribute_charisma:
			attributes.attribute_charisma + processedEffects.attributeModifiers.charisma,
		attribute_intelligence:
			attributes.attribute_intelligence + processedEffects.attributeModifiers.intelligence
	};

	const ATTRIBUTE_MAX_L1 = 3;
	for (const [attrName, finalValue] of Object.entries(finalAttributes)) {
		if (finalValue > ATTRIBUTE_MAX_L1) {
			throw new Error(
				`Final attribute ${attrName.replace('attribute_', '')} exceeds Level 1 cap (+3) after applying traits.`
			);
		}
	}
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Basic validation
		if (
			!data.finalName ||
			typeof data.finalName !== 'string' ||
			data.finalName.trim().length === 0
		) {
			return json({ error: 'Character name is required.' }, { status: 400 });
		}

		// Validate attributes and point buy (Stage A)
		const attributes = {
			attribute_might: data.attribute_might,
			attribute_agility: data.attribute_agility,
			attribute_charisma: data.attribute_charisma,
			attribute_intelligence: data.attribute_intelligence
		};
		const totalPoints = Object.values(attributes).reduce(
			(sum, v) => sum + (typeof v === 'number' ? v : 0),
			0
		);
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
		if (!data.classId || !classesData.find((c) => c.id === data.classId)) {
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
			validateAttributeCapsAfterTraits(
				attributes,
				data.selectedTraitIds,
				data.ancestry1Id,
				data.ancestry2Id
			);
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
