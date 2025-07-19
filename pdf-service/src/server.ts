import { createCharacterPdf } from './fill';
import prisma from '../src/lib/prisma'; // Adjust path as necessary

// Placeholder for the Character model as it's not in the provided schema.prisma
// Assuming a model named 'Character' with an 'id' and 'data' field.
// This will need to be updated if the actual schema differs.
interface Character {
  id: string;
  data: Record<string, any>;
}

export const runtime = 'nodejs'; // Force Node.js runtime on Vercel

export default async function GET(request: Request, { params }: { params: { id: string } }) {
  const characterId = params.id;

  if (!characterId) {
    return new Response('Character ID is required', { status: 400 });
  }

  let character: Character | null = null;
  try {
    // Placeholder: Replace with actual Prisma query for the Character model
    // Once the correct schema.prisma is provided, this will be updated.
    // For now, we'll simulate fetching data.
    // character = await prisma.character.findUnique({
    //   where: { id: characterId },
    // });

    // Simulating character data for testing purposes
    character = {
      id: characterId,
      data: {
        "Character Name": "Test Character",
        "Player Name": "Test Player",
        "Level": 1,
        "Might": 10,
        "Agility": 12,
        "Charisma": 14,
        "Intelligence": 16,
        "Combat Mastery": 1,
        "Move Speed": 30,
        "Hit Points Max": 100,
        "Stamina Points Max": 50,
        "Mana Points Max": 25,
        "Physical Defense": 10,
        "Mental Defense": 10,
        "Save DC": 12,
        "Death Threshold": 0,
        "Jump Distance": 15,
        "Rest Point Cap": 5,
        "Grit Point Cap": 3,
        "Initiative": 5,
        "Mastery-Awareness-2": true, // Example of a checkbox
        "Mastery-Athletics-4": true,
        "Mastery-Intimidation-6": false,
        "Mastery-Acrobatics-8": true,
        "Mastery-Trickery-10": false,
        "Mastery-Stealth-2": true,
        "Mastery-Animal-4": false,
        "Mastery-Influence-6": true,
        "Mastery-Insight-8": false,
        "Mastery-Investigation-10": true,
        "Mastery-Medicine-2": false,
        "Mastery-Survival-4": true,
        "Mastery-Arcana-6": false,
        "Mastery-History-8": true,
        "Mastery-Nature-10": false,
        "Mastery-Occultism-2": true,
        "Mastery-Religion-4": false,
        "Mastery-Trade-A-6": true,
        "Mastery-Trade-B-8": false,
        "Mastery-Trade-C-10": true,
        "Mastery-Trade-D-2": false,
        "Mastery-Language-A-Limited": true,
        "Mastery-Language-B-Fluent": true,
        "Mastery-Language-C-Limited": false,
        "Mastery-Language-D-Fluent": false,
        "Ancestry": "Human",
        "Class & Subclass": "Warrior",
        "Features": "Some class features text here.",
        "Attack A": "Sword",
        "Attack A Dmg": "1d8",
        "Attack A Type": "Slashing",
        "Attack A Notes": "Versatile (1d10)",
        "Attack B": "Bow",
        "Attack B Dmg": "1d6",
        "Attack B Type": "Piercing",
        "Attack B Notes": "Range 100/400",
        "Carried": "Backpack, Rope",
        "Stored": "Tent, Rations",
        "Supplies A": "Water",
        "Supplies A Amount": "2",
        "Supplies B": "Food",
        "Supplies B Amount": "3",
        "Attuned A": "Ring of Protection",
        "Attuned Item A": "Ring of Protection",
        "Equipped on the Head": "Helmet",
        "Equipped on the Body": "Leather Armor",
        "Equipped on the Right Hand": "Sword",
        "Equipped on the Left Hand": "Shield",
        "Physical-Damage-Reduction": true,
        "Elemantal-Damage-Reduction": false,
        "Mental-Damage-Reduction": true,
        "Burrow-Half": false,
        "Swim-Half": true,
        "Burrow-Full": false,
        "Swim-Full": false,
        "Fly-Half": true,
        "Fly-Full": false,
        "Climb-Half": true,
        "Climb-Full": false,
        "Expertise-Proficiency": true,
        "Athletics-Proficiency": true,
        "Intimidation-Proficiency": false,
        "Trickery-Proficiency": true,
        "Acrobatics-Proficiency": true,
        "Stealth-Proficiency": true,
        "Animal-Proficiency": false,
        "Influence-Proficiency": true,
        "Insight-Proficiency": true,
        "Medicine-Proficiency": false,
        "Investigation-Proficiency": true,
        "Survival-Proficiency": true,
        "History-Proficiency": true,
        "Arcana-Proficiency": false,
        "Nature-Proficiency": true,
        "Trade-A-Proficiency": true,
        "Religion-Proficiency": false,
        "Occultism-Proficiency": true,
        "Trade-D-Proficiency": false,
        "Trade-C-Proficiency": true,
        "Trade-B-Proficiency": false,
        "Glide-Half": true,
        "Glide-Full": false,
        "Misc": "Some miscellaneous notes."
      }
    };

    if (!character) {
      return new Response('Character not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching character:', error);
    return new Response('Internal Server Error', { status: 500 });
  }

  try {
    const pdfBytes = await createCharacterPdf(character.data);

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
