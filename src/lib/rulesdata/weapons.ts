// DC20 Weapons Data - Based on official DC20 weapon tables
export interface WeaponData {
	id: string;
	name: string;
	weightCategory: 'light' | 'heavy';
	type: 'melee' | 'ranged';
	damage: number; // Base damage (1, 2, 3, 4)
	versatileDamage?: number; // Damage when used two-handed (for versatile weapons)
	damageType: 'bludgeoning' | 'piercing' | 'slashing';
	requirements?: {
		might?: number;
		agility?: number;
	};
	properties: string[];
	range?: {
		short: number;
		long: number;
	};
	ammunition?: string; // e.g., "Ammo (20/60)"
	reload?: number; // Reload value for crossbows
	specialNotes?: string;
}

export const weaponsData: WeaponData[] = [
	// MELEE WEAPONS - AXES
	{
		id: 'sickle',
		name: 'Sickle',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['Thrown (10/20)', 'Concealable']
	},
	{
		id: 'hand_axe',
		name: 'Hand Axe',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'battleaxe',
		name: 'Battleaxe/Scythe',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'slashing',
		properties: ['Versatile']
	},
	{
		id: 'halberd',
		name: 'Halberd',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'greataxe',
		name: 'Greataxe',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'slashing',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact']
	},

	// MELEE WEAPONS - CHAINED
	{
		id: 'bolas',
		name: 'Bolas',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['Thrown (10/20)', 'Concealable'],
		specialNotes: 'On hit: target is Grappled. Requires contested Physical Save to escape'
	},
	{
		id: 'nunchucks',
		name: 'Nunchucks',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'flail',
		name: 'Flail/Meteor Hammer',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'bludgeoning',
		properties: ['Versatile']
	},
	{
		id: 'war_flail',
		name: 'War Flail',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'great_flail',
		name: 'Great Flail',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'bludgeoning',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact']
	},

	// MELEE WEAPONS - HAMMERS
	{
		id: 'club',
		name: 'Club',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['Thrown (10/20)', 'Concealable']
	},
	{
		id: 'light_hammer',
		name: 'Light Hammer',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'warhammer',
		name: 'Warhammer/Mace',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'bludgeoning',
		properties: ['Versatile']
	},
	{
		id: 'lucerne',
		name: 'Lucerne',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'greatmaul',
		name: 'Greatmaul',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'bludgeoning',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact']
	},

	// MELEE WEAPONS - PICKS
	{
		id: 'climbing_pick',
		name: 'Climbing Pick',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'piercing',
		properties: ['Thrown (10/20)', 'Concealable', 'Special'],
		specialNotes: 'ADV on climbing checks while wielding'
	},
	{
		id: 'mining_pick',
		name: 'Mining Pick',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'pickaxe',
		name: 'Pickaxe',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'piercing',
		properties: ['Versatile']
	},
	{
		id: 'billhook',
		name: 'Billhook',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'greatpick',
		name: 'Greatpick',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'piercing',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact']
	},

	// MELEE WEAPONS - SPEARS
	{
		id: 'stake',
		name: 'Stake',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'piercing',
		properties: ['Thrown (10/20)', 'Concealable']
	},
	{
		id: 'javelin',
		name: 'Javelin',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'spear',
		name: 'Spear/Trident',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'piercing',
		properties: ['Versatile']
	},
	{
		id: 'pike',
		name: 'Pike',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'lance',
		name: 'Lance',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'piercing',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact', 'Reach', 'Unwieldy'],
		specialNotes: 'Can be wielded one-handed while mounted'
	},

	// MELEE WEAPONS - STAFFS
	{
		id: 'stick',
		name: 'Stick',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'bludgeoning',
		properties: ['Thrown (10/20)', 'Concealable']
	},
	{
		id: 'baton',
		name: 'Baton',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'quarterstaff',
		name: 'Quarterstaff',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'bludgeoning',
		properties: ['Versatile']
	},
	{
		id: 'longpole',
		name: 'Longpole',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'greatstaff',
		name: 'Greatstaff',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'bludgeoning',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact']
	},

	// MELEE WEAPONS - SWORDS
	{
		id: 'dagger',
		name: 'Dagger',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['Thrown (10/20)', 'Concealable']
	},
	{
		id: 'shortsword',
		name: 'Shortsword',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['Thrown (5/10)']
	},
	{
		id: 'longsword',
		name: 'Longsword',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'slashing',
		properties: ['Versatile']
	},
	{
		id: 'glaive',
		name: 'Glaive',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['2-Handed', 'Reach']
	},
	{
		id: 'greatsword',
		name: 'Greatsword',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'slashing',
		requirements: { might: 2 },
		properties: ['2-Handed', 'Impact']
	},

	// MELEE WEAPONS - FIST
	{
		id: 'brass_knuckles',
		name: 'Brass Knuckles',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: []
	},
	{
		id: 'hand_claw',
		name: 'Hand Claw',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: []
	},
	{
		id: 'hand_hook',
		name: 'Hand Hook',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: []
	},
	{
		id: 'boulder_gauntlet',
		name: 'Boulder Gauntlet',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		requirements: { might: 2 },
		properties: ['Impact']
	},

	// MELEE WEAPONS - WHIPS
	{
		id: 'scourge_whip',
		name: 'Scourge Whip',
		weightCategory: 'light',
		type: 'melee',
		damage: 1,
		damageType: 'slashing',
		properties: ['Reach', 'Concealable']
	},
	{
		id: 'chain_whip',
		name: 'Chain Whip',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'slashing',
		properties: ['Reach']
	},
	{
		id: 'bull_whip',
		name: 'Bull Whip',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'slashing',
		requirements: { might: 2 },
		properties: ['Reach', 'Versatile', 'Unwieldy']
	},
	{
		id: 'great_whip',
		name: 'Great Whip',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'slashing',
		requirements: { might: 2 },
		properties: ['Reach', '2-Handed', 'Impact', 'Unwieldy']
	},

	// MELEE WEAPONS - SPECIAL
	{
		id: 'gauntlet',
		name: 'Gauntlet',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['Special'],
		specialNotes: 'Can wield weapon or shield with same hand'
	},
	{
		id: 'rapier',
		name: 'Rapier',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		damageType: 'piercing',
		properties: ['Special'],
		specialNotes: 'Benefits from Sword Weapon Style'
	},
	{
		id: 'morningstar',
		name: 'Morningstar',
		weightCategory: 'light',
		type: 'melee',
		damage: 2,
		versatileDamage: 3,
		damageType: 'piercing',
		properties: ['Special', 'Versatile'],
		specialNotes: 'Benefits from Hammer Weapon Style'
	},
	{
		id: 'greatstar',
		name: 'Greatstar',
		weightCategory: 'heavy',
		type: 'melee',
		damage: 3,
		damageType: 'piercing',
		requirements: { might: 2 },
		properties: ['Special', '2-Handed', 'Impact'],
		specialNotes: 'Benefits from Hammer Weapon Style'
	},
	{
		id: 'net',
		name: 'Net',
		weightCategory: 'light',
		type: 'melee',
		damage: 0, // Net does no damage
		damageType: 'bludgeoning',
		properties: ['Special', 'Thrown (2/5)'],
		specialNotes:
			'Contested Physical Save. Success: Restrained and Grappled. Deal 1 Slashing to net to break free'
	},

	// RANGED WEAPONS - BOWS
	{
		id: 'sling',
		name: 'Sling',
		weightCategory: 'light',
		type: 'ranged',
		damage: 1,
		damageType: 'bludgeoning',
		requirements: { agility: 1 },
		properties: [],
		ammunition: 'Ammo (10/30)'
	},
	{
		id: 'shortbow',
		name: 'Shortbow',
		weightCategory: 'light',
		type: 'ranged',
		damage: 2,
		damageType: 'piercing',
		requirements: { agility: 1 },
		properties: ['2-Handed'],
		ammunition: 'Ammo (20/60)'
	},
	{
		id: 'longbow',
		name: 'Longbow',
		weightCategory: 'heavy',
		type: 'ranged',
		damage: 2,
		damageType: 'piercing',
		requirements: { might: 1, agility: 1 },
		properties: ['2-Handed'],
		ammunition: 'Ammo (30/90)'
	},
	{
		id: 'greatbow',
		name: 'Greatbow',
		weightCategory: 'heavy',
		type: 'ranged',
		damage: 3,
		damageType: 'piercing',
		requirements: { might: 2, agility: 1 },
		properties: ['2-Handed', 'Threatening', 'Unwieldy'],
		ammunition: 'Ammo (40/120)'
	},

	// RANGED WEAPONS - CROSSBOWS
	{
		id: 'hand_crossbow',
		name: 'Hand Crossbow',
		weightCategory: 'light',
		type: 'ranged',
		damage: 1,
		damageType: 'piercing',
		requirements: { agility: 1 },
		properties: ['Impact'],
		ammunition: 'Ammo (10/30)',
		reload: 1
	},
	{
		id: 'light_crossbow',
		name: 'Light Crossbow',
		weightCategory: 'light',
		type: 'ranged',
		damage: 3,
		damageType: 'piercing',
		requirements: { agility: 1 },
		properties: ['2-Handed', 'Impact'],
		ammunition: 'Ammo (15/45)',
		reload: 1
	},
	{
		id: 'heavy_crossbow',
		name: 'Heavy Crossbow',
		weightCategory: 'heavy',
		type: 'ranged',
		damage: 3,
		damageType: 'piercing',
		requirements: { might: 1, agility: 1 },
		properties: ['2-Handed', 'Impact'],
		ammunition: 'Ammo (20/60)',
		reload: 1
	},
	{
		id: 'light_ballista',
		name: 'Light Ballista',
		weightCategory: 'heavy',
		type: 'ranged',
		damage: 4,
		damageType: 'piercing',
		requirements: { might: 4, agility: 1 },
		properties: ['Special', '2-Handed', 'Impact', 'Threatening', 'Unwieldy'],
		ammunition: 'Ammo (40/120)',
		reload: 1,
		specialNotes: 'Costs 1 AP to deploy. Must be in control. Requires Might 4 to pick up'
	},

	// RANGED WEAPONS - SPECIAL
	{
		id: 'boomerang',
		name: 'Boomerang',
		weightCategory: 'light',
		type: 'ranged',
		damage: 2,
		damageType: 'bludgeoning',
		properties: ['Special'],
		range: { short: 10, long: 20 },
		specialNotes: "Returns to thrower's hand on miss"
	},
	{
		id: 'dart',
		name: 'Dart',
		weightCategory: 'light',
		type: 'ranged',
		damage: 1,
		damageType: 'piercing',
		properties: ['Special', 'Concealable'],
		range: { short: 10, long: 20 },
		specialNotes: 'Can be drawn as part of Attack Check'
	},
	{
		id: 'throwing_star',
		name: 'Throwing Star',
		weightCategory: 'light',
		type: 'ranged',
		damage: 1,
		damageType: 'slashing',
		properties: ['Special', 'Concealable'],
		range: { short: 10, long: 20 },
		specialNotes: 'Can be drawn as part of Attack Check'
	},
	{
		id: 'blowgun',
		name: 'Blowgun (Needle)',
		weightCategory: 'light',
		type: 'ranged',
		damage: 1,
		damageType: 'piercing',
		requirements: { agility: 1 },
		properties: ['Special'],
		ammunition: 'Ammo (10/20)',
		specialNotes:
			'When Hidden: attack does not reveal position on miss/Heavy Hit. Does Poison damage'
	}
];

// Helper functions for weapon calculations
export const getWeaponAttackBonus = (
	weapon: WeaponData,
	combatMastery: number,
	primaryMod: number,
	secondaryMod?: number
): number => {
	// Base attack bonus is Combat Mastery + appropriate attribute modifier
	let bonus = combatMastery;

	// DC20 uses attribute requirements instead of finesse
	if (weapon.type === 'ranged') {
		// Ranged weapons typically use Agility
		bonus += secondaryMod || primaryMod;
	} else {
		// Melee weapons typically use Might
		bonus += primaryMod;
	}

	return bonus;
};

export const getWeaponDamageBonus = (
	weapon: WeaponData,
	primaryMod: number,
	secondaryMod?: number
): number => {
	// Damage bonus follows same logic as attack bonus for attribute modifier
	if (weapon.type === 'ranged') {
		return secondaryMod || primaryMod;
	} else {
		return primaryMod;
	}
};

export const getWeaponDamageString = (weapon: WeaponData, damageBonus: number): string => {
	let damageStr = weapon.damage.toString();

	// Show versatile damage if available
	if (weapon.versatileDamage) {
		damageStr = `${weapon.damage}(${weapon.versatileDamage})`;
	}

	if (damageBonus === 0) {
		return damageStr;
	}
	return `${damageStr}+${damageBonus}`;
};

export const getCriticalDamage = (weapon: WeaponData): string => {
	// In DC20, critical hits do maximum damage + 2
	const baseDamage = weapon.versatileDamage || weapon.damage;
	return `${baseDamage + 2}`;
};

export const getBrutalDamage = (weapon: WeaponData): string => {
	// In DC20, brutal hits do +2 damage
	const baseDamage = weapon.versatileDamage || weapon.damage;
	return `${baseDamage + 2}`;
};

export const getHeavyHitEffect = (weapon: WeaponData): string => {
	// Check for Impact property
	if (weapon.properties.includes('Impact')) {
		return 'Target must make a Might Save or be knocked Prone and pushed 5 feet';
	}

	// Heavy hits in DC20 do +1 damage
	return '+1 damage';
};

// Helper function to calculate heavy hit damage including Impact
export const getHeavyHitDamage = (weapon: WeaponData): number => {
	const baseDamage = weapon.versatileDamage || weapon.damage;
	let heavyDamage = baseDamage + 1; // Heavy hit adds +1

	// Impact adds another +1 to heavy hits
	if (weapon.properties.includes('Impact')) {
		heavyDamage += 1;
	}

	return heavyDamage;
};

// Helper function to calculate brutal hit damage including Impact
export const getBrutalHitDamage = (weapon: WeaponData): number => {
	const baseDamage = weapon.versatileDamage || weapon.damage;
	let brutalDamage = baseDamage + 2; // Brutal hit adds +2

	// Impact adds +1 to brutal hits too
	if (weapon.properties.includes('Impact')) {
		brutalDamage += 1;
	}

	return brutalDamage;
};
