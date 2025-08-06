// src/routes/api/character/[characterId]/+server.ts

import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from './$types';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ params }) => {
	const { characterId } = params;

	if (!characterId) {
		return json({ error: 'Character ID is required' }, { status: 400 });
	}

	try {
		// First try to get the finalized character sheet data
		const finalizedCharacter = await prisma.characterSheetData.findUnique({
			where: { id: characterId }
		});

		if (finalizedCharacter) {
			return json(finalizedCharacter);
		}

		// If not found in finalized data, check if it's in progress
		const progressCharacter = await prisma.characterInProgress.findUnique({
			where: { id: characterId }
		});

		if (!progressCharacter) {
			return json({ error: 'Character not found' }, { status: 404 });
		}

		// For now, return an error indicating the character isn't finalized
		// In the future, we could calculate stats on-the-fly from progress data
		return json(
			{
				error: 'Character creation not yet complete. Please finish character creation first.'
			},
			{ status: 400 }
		);
	} catch (error) {
		console.error('Error fetching character:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
