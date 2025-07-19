import { createCharacterPdf } from './fill';
import { PrismaClient } from '@prisma/client'; // Import PrismaClient
const prisma = new PrismaClient(); // Initialize PrismaClient

type CharacterSheetData = Awaited<ReturnType<typeof prisma.characterSheetData.findUnique>>; // Infer type from findUnique

export const runtime = 'nodejs'; // Force Node.js runtime on Vercel

export default async function GET(request: Request, { params }: { params: { id: string } }) {
  const characterId = params.id;

  if (!characterId) {
    return new Response('Character ID is required', { status: 400 });
  }

  let characterData: CharacterSheetData | null = null;
  try {
    characterData = await prisma.characterSheetData.findUnique({
      where: { id: characterId },
    });

    if (!characterData) {
      return new Response('Character not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching character:', error);
    return new Response('Internal Server Error', { status: 500 });
  }

  // Data Transformation: Convert CharacterSheetData to Record<string, any>
  const transformedData: Record<string, any> = {
    "Character Name": characterData.finalName,
    "Player Name": characterData.finalPlayerName,
    "Level": characterData.finalLevel,
    "Might": characterData.finalMight,
    "Agility": characterData.finalAgility,
    "Charisma": characterData.finalCharisma,
    "Intelligence": characterData.finalIntelligence,
    "Combat Mastery": characterData.finalCombatMastery,
    "Move Speed": characterData.finalMoveSpeed,
    "Hit Points Max": characterData.finalHPMax,
    "Stamina Points Max": characterData.finalSPMax,
    "Mana Points Max": characterData.finalMPMax,
    "Physical Defense": characterData.finalPD,
    "Mental Defense": characterData.finalAD, // Assuming AD maps to Mental Defense
    "Save DC": characterData.finalSaveDC,
    "Death Threshold": characterData.finalDeathThreshold,
    "Jump Distance": characterData.finalJumpDistance,
    "Rest Point Cap": characterData.finalRestPoints,
    "Grit Point Cap": characterData.finalGritPoints,
    "Initiative": characterData.finalInitiativeBonus,
    "Ancestry": characterData.ancestry1Name, // Assuming ancestry1Name is the primary ancestry
    "Class & Subclass": characterData.className, // Assuming className is sufficient
    // Parse JSON fields
    ...JSON.parse(characterData.skillsJson || '{}'),
    ...JSON.parse(characterData.tradesJson || '{}'),
    ...JSON.parse(characterData.languagesJson || '{}'),
    ...JSON.parse(characterData.selectedTraitsJson || '{}'),
    ...JSON.parse(characterData.classFeaturesLvl1Json || '{}'),
    ...JSON.parse(characterData.equipmentJson || '{}'),
    // Add other fields as needed, mapping them from characterData to the PDF field names
    // For example, if you have specific fields for damage reduction:
    "Physical-Damage-Reduction": characterData.finalPDR,
    "Elemantal-Damage-Reduction": characterData.finalEDR,
    "Mental-Damage-Reduction": characterData.finalMDR,
    // Add save masteries
    "Save-Mastery-Might": characterData.finalSaveMasteryMight,
    "Save-Mastery-Agility": characterData.finalSaveMasterityAgility,
    "Save-Mastery-Charisma": characterData.finalSaveMasteryCharisma,
    "Save-Mastery-Intelligence": characterData.finalSaveMasteryIntelligence,
    // Add prime modifier
    "Prime-Modifier-Value": characterData.finalPrimeModifierValue,
    "Prime-Modifier-Attribute": characterData.finalPrimeModifierAttribute,
  };

  try {
    const pdfBytes = await createCharacterPdf(transformedData);

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="character_${characterId}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new Response('Error generating PDF', { status: 500 });
  }
}
