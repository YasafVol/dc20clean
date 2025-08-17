import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';
import type { ITrait } from '$lib/rulesdata/types'; // Import ITrait type
import { ancestriesData as ancestries } from '$lib/rulesdata/_new_schema/ancestries';
import { traitsData as traits } from '$lib/rulesdata/_new_schema/traits';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	// Assuming data contains:
	// characterId: string;
	// selectedAncestries: string[]; // Array of ancestry IDs (max 2)
	// selectedTraits: string[]; // Array of trait IDs
	// attributes: { [key: string]: number }; // Attributes after potential reallocation

	// 1. Validate characterId exists and corresponds to an in-progress character
	if (!data.characterId) {
		return json({ success: false, message: 'Character ID is required.' }, { status: 400 });
	}

	// 2. Validate selected ancestries (max 2)
	if (
		!Array.isArray(data.selectedAncestries) ||
		data.selectedAncestries.length === 0 ||
		data.selectedAncestries.length > 2
	) {
		return json(
			{ success: false, message: 'You must select between 1 and 2 ancestries.' },
			{ status: 400 }
		);
	}
	// Validate ancestry IDs
	for (const ancestryId of data.selectedAncestries) {
		const validAncestry = ancestries.find((a) => a.id === ancestryId);
		if (!validAncestry) {
			return json(
				{ success: false, message: `Invalid ancestry ID: ${ancestryId}` },
				{ status: 400 }
			);
		}
	}

	// 3. Validate selected traits
	if (!Array.isArray(data.selectedTraits)) {
		return json({ success: false, message: 'Selected traits data is invalid.' }, { status: 400 });
	}
	// Validate trait IDs and rules
	if (data.selectedTraits.length > 0) {
		// Validate trait IDs exist
		for (const traitId of data.selectedTraits) {
			const validTrait = traits.find((t) => t.id === traitId);
			if (!validTrait) {
				return json({ success: false, message: `Invalid trait ID: ${traitId}` }, { status: 400 });
			}
		}

		// Get full trait objects
		const selectedTraitObjects: ITrait[] = data.selectedTraits
			.map((id: string) => traits.find((t) => t.id === id))
			.filter((t: ITrait | undefined): t is ITrait => t !== undefined);

		// Validate ancestry points budget
		const totalCost = selectedTraitObjects.reduce(
			(sum: number, trait: ITrait) => sum + trait.cost,
			0
		);
		if (totalCost !== 5) {
			return json(
				{ success: false, message: `Total ancestry points must equal 5, got: ${totalCost}` },
				{ status: 400 }
			);
		}

		// Validate minor trait limit
		const minorTraits = selectedTraitObjects.filter((t: ITrait) => t.isMinor);
		if (minorTraits.length > 1) {
			return json(
				{ success: false, message: `Maximum of 1 minor trait allowed, got: ${minorTraits.length}` },
				{ status: 400 }
			);
		}

		// Validate negative trait point gain limit
		const pointsFromNegative = selectedTraitObjects
			.filter((t: ITrait) => t.cost < 0)
			.reduce((sum: number, t: ITrait) => sum + Math.abs(t.cost), 0);
		if (pointsFromNegative > 2) {
			return json(
				{
					success: false,
					message: `Maximum of +2 points from negative traits allowed, got: ${pointsFromNegative}`
				},
				{ status: 400 }
			);
		}
	}

	// 4. Validate attribute values after trait bonuses (within -2 and +3)
	// Assuming data.attributes is an object like { attribute_might: 1, ... }
	if (!data.attributes || typeof data.attributes !== 'object') {
		return json(
			{ success: false, message: 'Attribute data is missing or invalid.' },
			{ status: 400 }
		);
	}
	// Corrected attribute name to match schema
	const attributeNames = [
		'attribute_might',
		'attribute_agility',
		'attribute_charisma',
		'attribute_intelligence'
	];
	for (const attrName of attributeNames) {
		const attrValue = data.attributes[attrName];
		if (typeof attrValue !== 'number' || attrValue < -2 || attrValue > 3) {
			return json(
				{
					success: false,
					message: `Invalid value for attribute ${attrName}: ${attrValue}. Must be between -2 and +3.`
				},
				{ status: 400 }
			);
		}
	}

	// 5. Validate total attribute points (should still be 12 from Stage A base -2)
	// This check assumes the attributes passed in `data.attributes` are the final values after reallocation.
	// The base value for each attribute is -2, so 4 attributes have a base total of -8.
	// The total points allocated in Stage A is 20 (from 12 points + 8 base).
	// If attributes were reallocated in the helper panel, the sum should still reflect the original points + base.
	// Sum of (attributeValue - baseValue) should equal total points allocated.
	const baseAttributeValue = -2;
	const expectedTotalPoints = 12; // Total points allocated in Stage A
	const actualTotalPoints = attributeNames.reduce(
		(sum, attrName) => sum + (data.attributes[attrName] - baseAttributeValue),
		0
	);

	if (actualTotalPoints !== expectedTotalPoints) {
		return json(
			{
				success: false,
				message: `Total attribute points mismatch. Expected ${expectedTotalPoints}, got ${actualTotalPoints}.`
			},
			{ status: 400 }
		);
	}

	try {
		// Fetch the existing character to ensure it's in the correct state (Stage A complete)
		const character = await prisma.characterInProgress.findUnique({
			where: { id: data.characterId },
			select: {
				currentStep: true
				// Select other fields if needed for validation against previous stage data
			}
		});

		if (!character) {
			return json({ success: false, message: 'Character not found.' }, { status: 404 });
		}

		// Optional: Validate that the character is currently at the correct step (Stage A complete)
		// if (character.currentStep !== 1) { // Check against integer 1 for Stage A
		//      return json({ success: false, message: `Character is not in the correct stage. Current stage: ${character.currentStep}` }, { status: 400 });
		// }

		// Update the CharacterInProgress table with Stage B data
		const updatedCharacter = await prisma.characterInProgress.update({
			where: { id: data.characterId },
			data: {
				ancestry1Id: data.selectedAncestries[0] || null, // Store first ancestry ID
				ancestry2Id: data.selectedAncestries[1] || null, // Store second ancestry ID (if exists)
				selectedTraitIds: JSON.stringify(data.selectedTraits), // Store trait IDs as JSON string
				// Update attributes if they were potentially modified in the helper panel
				attribute_might: data.attributes.attribute_might,
				attribute_agility: data.attributes.attribute_agility,
				attribute_charisma: data.attributes.attribute_charisma,
				attribute_intelligence: data.attributes.attribute_intelligence, // Corrected attribute name
				currentStep: 2 // Mark Stage B as complete (using integer 2)
			}
		});

		// Return success response
		return json({ success: true, character: updatedCharacter });
	} catch (error) {
		console.error('Error processing Stage B data:', error);
		// Return appropriate error response
		return json({ success: false, message: 'Failed to save Stage B data.' }, { status: 500 });
	}
};

// TODO: Consider implementing a GET handler to fetch existing Stage B data if needed for resuming progress
// export const GET: RequestHandler = async ({ url }) => {
//     const characterId = url.searchParams.get('characterId');
//     if (!characterId) {
//         return json({ success: false, message: 'Character ID is required.' }, { status: 400 });
//     }
//     try {
//         const character = await prisma.characterInProgress.findUnique({
//             where: { id: characterId },
//             select: {
//                 selectedAncestries: true,
//                 selectedTraits: true,
//                 // Select other relevant fields
//             },
//         });
//         if (!character) {
//             return json({ success: false, message: 'Character not found.' }, { status: 404 });
//         }
//         return json({ success: true, character });
//     } catch (error) {
//         console.error('Error fetching Stage B data:', error);
//         return json({ success: false, message: 'Failed to fetch Stage B data.' }, { status: 500 });
//     }
// };
