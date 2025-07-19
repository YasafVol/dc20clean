import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { characterSheetData, characterInProgress } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
  const { characterId } = params;

  if (!characterId) {
    return json({ error: 'Character ID is required' }, { status: 400 });
  }

  try {
    // First try to get the finalized character sheet data
    const finalizedCharacter = await db
      .select()
      .from(characterSheetData)
      .where(eq(characterSheetData.id, characterId))
      .limit(1);

    if (finalizedCharacter.length > 0) {
      return json(finalizedCharacter[0]);
    }

    // If not found in finalized data, check if it's in progress
    const progressCharacter = await db
      .select()
      .from(characterInProgress)
      .where(eq(characterInProgress.id, characterId))
      .limit(1);

    if (progressCharacter.length === 0) {
      return json({ error: 'Character not found' }, { status: 404 });
    }

    // For now, return an error indicating the character isn't finalized
    // In the future, we could calculate stats on-the-fly from progress data
    return json({ 
      error: 'Character creation not yet complete. Please finish character creation first.' 
    }, { status: 400 });

  } catch (error) {
    console.error('Error fetching character:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};
