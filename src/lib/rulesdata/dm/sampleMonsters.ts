/**
 * Sample Monsters for Seeding
 *
 * Pre-built monsters with calculated stats ready for import.
 * Uses the monsterCalculator to ensure proper stat values.
 */

import { generateContentId } from '../../utils/idGenerator';
import { calculateMonsterStats } from '../../services/monsterCalculator';
import {
	MONSTER_SCHEMA_VERSION,
	type SavedMonster,
	type MonsterTier,
	type MonsterRoleId,
	type MonsterSize,
	type MonsterType,
	type MonsterAlignment,
} from '../schemas/monster.schema';

interface SampleMonsterInput {
	name: string;
	level: number;
	tier: MonsterTier;
	roleId: MonsterRoleId;
	size: MonsterSize;
	monsterType: MonsterType;
	alignment: MonsterAlignment;
	description: string;
	lore: string;
	tactics: string;
	actions: Array<{
		name: string;
		type: 'martial' | 'spell' | 'special';
		targetDefense: 'pd' | 'ad';
		damage: number;
		damageType: string;
		range: number;
		description: string;
	}>;
}

function createMonster(input: SampleMonsterInput): SavedMonster {
	const stats = calculateMonsterStats({
		level: input.level,
		tier: input.tier,
		roleId: input.roleId,
	});

	const now = new Date().toISOString();
	const monsterId = generateContentId('monster');

	return {
		id: monsterId,
		name: input.name,
		description: input.description,
		level: input.level,
		tier: input.tier,
		roleId: input.roleId,

		// Flavor
		size: input.size,
		monsterType: input.monsterType,
		alignment: input.alignment,
		lore: input.lore,
		tactics: input.tactics,

		// Stats from calculator
		finalHP: stats.finalHP,
		finalPD: stats.finalPD,
		finalAD: stats.finalAD,
		finalAttack: stats.finalAttack,
		finalSaveDC: stats.finalSaveDC,
		finalBaseDamage: stats.finalBaseDamage,

		// Attributes (default)
		attributes: {
			might: 0,
			agility: 0,
			charisma: 0,
			intelligence: 0,
		},

		// Features (none for samples)
		featureIds: [],
		featurePointsSpent: 0,
		featurePointsMax: stats.featurePowerMax,

		// Actions with generated IDs
		actions: input.actions.map((action) => ({
			id: generateContentId('action'),
			name: action.name,
			apCost: 2,
			type: action.type,
			targetDefense: action.targetDefense,
			damage: action.damage,
			damageType: action.damageType,
			range: action.range,
			description: action.description,
		})),

		// Sharing
		visibility: 'private',
		approvalStatus: 'draft',
		isHomebrew: false,

		// Metadata
		createdAt: now,
		lastModified: now,
		schemaVersion: MONSTER_SCHEMA_VERSION,

		// Breakdowns
		breakdowns: stats.breakdowns,
	};
}

const SAMPLE_MONSTER_INPUTS: SampleMonsterInput[] = [
	{
		name: 'Goblin Warrior',
		level: 1,
		tier: 'standard',
		roleId: 'skirmisher',
		size: 'Small',
		monsterType: 'Humanoid',
		alignment: 'Chaotic Evil',
		description: 'A small, vicious humanoid with green skin and sharp teeth.',
		lore: 'Goblins are small, black-hearted humanoids that lair in despoiled dungeons and other dismal settings.',
		tactics: 'Goblins prefer ambushes and gang tactics, attacking from hiding with ranged weapons before closing to melee.',
		actions: [
			{
				name: 'Shortsword',
				type: 'martial',
				targetDefense: 'pd',
				damage: 2,
				damageType: 'Physical',
				range: 5,
				description: 'Melee weapon attack.',
			},
			{
				name: 'Shortbow',
				type: 'martial',
				targetDefense: 'pd',
				damage: 2,
				damageType: 'Physical',
				range: 80,
				description: 'Ranged weapon attack.',
			},
		],
	},
	{
		name: 'Skeleton',
		level: 1,
		tier: 'standard',
		roleId: 'skirmisher',
		size: 'Medium',
		monsterType: 'Undead',
		alignment: 'Lawful Evil',
		description: 'A magically animated pile of bones that obeys its creator\'s commands.',
		lore: 'Skeletons are the animated bones of the dead, raised by dark magic.',
		tactics: 'Skeletons mindlessly follow orders, fighting until destroyed.',
		actions: [
			{
				name: 'Rusty Sword',
				type: 'martial',
				targetDefense: 'pd',
				damage: 2,
				damageType: 'Physical',
				range: 5,
				description: 'Melee weapon attack.',
			},
			{
				name: 'Shortbow',
				type: 'martial',
				targetDefense: 'pd',
				damage: 2,
				damageType: 'Physical',
				range: 80,
				description: 'Ranged weapon attack.',
			},
		],
	},
	{
		name: 'Wolf',
		level: 1,
		tier: 'standard',
		roleId: 'skirmisher',
		size: 'Medium',
		monsterType: 'Beast',
		alignment: 'Unaligned',
		description: 'A gray-furred predator with keen senses and pack instincts.',
		lore: 'Wolves hunt in packs, using coordinated tactics to bring down prey.',
		tactics: 'Wolves try to surround prey and knock it prone for advantage.',
		actions: [
			{
				name: 'Bite',
				type: 'martial',
				targetDefense: 'pd',
				damage: 2,
				damageType: 'Physical',
				range: 5,
				description: 'Melee natural attack. Target must succeed on a Save or be knocked prone.',
			},
		],
	},
	{
		name: 'Orc Berserker',
		level: 2,
		tier: 'standard',
		roleId: 'brute',
		size: 'Medium',
		monsterType: 'Humanoid',
		alignment: 'Chaotic Evil',
		description: 'A savage humanoid warrior consumed by bloodlust.',
		lore: 'Orcs are savage raiders who glory in battle and destruction.',
		tactics: 'Orc berserkers charge directly at the strongest-looking foe.',
		actions: [
			{
				name: 'Greataxe',
				type: 'martial',
				targetDefense: 'pd',
				damage: 4,
				damageType: 'Physical',
				range: 5,
				description: 'Melee weapon attack. Brutal: Extra damage on critical hits.',
			},
			{
				name: 'Javelin',
				type: 'martial',
				targetDefense: 'pd',
				damage: 3,
				damageType: 'Physical',
				range: 30,
				description: 'Ranged weapon attack.',
			},
		],
	},
	{
		name: 'Giant Spider',
		level: 2,
		tier: 'standard',
		roleId: 'controller',
		size: 'Large',
		monsterType: 'Beast',
		alignment: 'Unaligned',
		description: 'A massive arachnid with venomous fangs and web-spinning capabilities.',
		lore: 'Giant spiders lurk in dark caves and dense forests.',
		tactics: 'Giant spiders web targets from afar, then close in for the kill.',
		actions: [
			{
				name: 'Bite',
				type: 'martial',
				targetDefense: 'pd',
				damage: 3,
				damageType: 'Physical',
				range: 5,
				description: 'Melee natural attack. Target must Save or take poison damage.',
			},
			{
				name: 'Web',
				type: 'special',
				targetDefense: 'ad',
				damage: 0,
				damageType: 'Physical',
				range: 30,
				description: 'Ranged attack. On hit, target is restrained by webbing.',
			},
		],
	},
	{
		name: 'Cultist Fanatic',
		level: 2,
		tier: 'standard',
		roleId: 'artillerist',
		size: 'Medium',
		monsterType: 'Humanoid',
		alignment: 'Chaotic Evil',
		description: 'A devoted follower of dark powers, capable of minor spellcasting.',
		lore: 'Cultists serve dark masters in exchange for forbidden power.',
		tactics: 'Cultists attack from range, protecting more powerful cult leaders.',
		actions: [
			{
				name: 'Dagger',
				type: 'martial',
				targetDefense: 'pd',
				damage: 2,
				damageType: 'Physical',
				range: 5,
				description: 'Melee or ranged weapon attack.',
			},
			{
				name: 'Dark Bolt',
				type: 'spell',
				targetDefense: 'ad',
				damage: 3,
				damageType: 'Necrotic',
				range: 60,
				description: 'Ranged spell attack dealing necrotic damage.',
			},
		],
	},
	{
		name: 'Ogre',
		level: 4,
		tier: 'apex',
		roleId: 'brute',
		size: 'Large',
		monsterType: 'Giant',
		alignment: 'Chaotic Evil',
		description: 'A hulking brute of great strength and little intelligence.',
		lore: 'Ogres are dim-witted giants that bully smaller creatures.',
		tactics: 'Ogres charge the nearest enemy and pummel it with their club.',
		actions: [
			{
				name: 'Greatclub',
				type: 'martial',
				targetDefense: 'pd',
				damage: 8,
				damageType: 'Physical',
				range: 10,
				description: 'Melee weapon attack with extended reach.',
			},
			{
				name: 'Rock',
				type: 'martial',
				targetDefense: 'ad',
				damage: 6,
				damageType: 'Physical',
				range: 60,
				description: 'Ranged attack hurling a large rock.',
			},
		],
	},
	{
		name: 'Young Dragon',
		level: 8,
		tier: 'legendary',
		roleId: 'brute',
		size: 'Large',
		monsterType: 'Dragon',
		alignment: 'Varies',
		description: 'A juvenile dragon, already a fearsome predator with breath weapon.',
		lore: 'Dragons are the apex predators of fantasy worlds, hoarding treasure and terrorizing the land.',
		tactics: 'Young dragons use their breath weapon first, then engage in melee with bite and claws.',
		actions: [
			{
				name: 'Bite',
				type: 'martial',
				targetDefense: 'pd',
				damage: 12,
				damageType: 'Physical',
				range: 10,
				description: 'Melee natural attack.',
			},
			{
				name: 'Claw',
				type: 'martial',
				targetDefense: 'pd',
				damage: 8,
				damageType: 'Physical',
				range: 5,
				description: 'Melee natural attack. Can make two claw attacks.',
			},
			{
				name: 'Breath Weapon',
				type: 'special',
				targetDefense: 'ad',
				damage: 16,
				damageType: 'Fire',
				range: 30,
				description: '30-foot cone. Each creature in area must Save or take full damage. Recharge 5-6.',
			},
		],
	},
];

/**
 * Get sample monsters ready for seeding into Convex
 */
export function getSampleMonsters(): SavedMonster[] {
	return SAMPLE_MONSTER_INPUTS.map(createMonster);
}
