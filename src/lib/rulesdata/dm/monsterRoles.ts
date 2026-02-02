/**
 * Monster Roles
 *
 * Defines the 8 monster combat roles from the DC20 Bestiary.
 * Each role modifies base stats to create different combat profiles.
 *
 * Role modifiers are applied AFTER looking up base stats from the
 * Monster Statistics Table, and BEFORE applying tier multipliers.
 */

import { type MonsterRole, type MonsterRoleId } from '../schemas/monster.schema';

/**
 * Monster Role Definitions
 *
 * HP Modifier: Percentage change (e.g., 0.25 = +25%, -0.10 = -10%)
 * PD/AD Offset: Additive change to Physical/Arcane Defense
 */
export const MONSTER_ROLES: Record<MonsterRoleId, MonsterRole> = {
	artillerist: {
		id: 'artillerist',
		name: 'Artillerist',
		hpModifier: -0.1, // -10% HP
		pdOffset: 2, // +2 PD
		adOffset: -2, // -2 AD
		primaryAttributes: ['AGI', 'INT'],
		description:
			'Ranged attackers that excel at hitting targets from a distance. Higher PD to avoid melee threats, lower AD and HP as trade-off.'
	},
	brute: {
		id: 'brute',
		name: 'Brute',
		hpModifier: 0.25, // +25% HP
		pdOffset: -2, // -2 PD
		adOffset: 2, // +2 AD
		primaryAttributes: ['MIG'],
		description:
			'Heavy hitters with massive HP pools. Lower PD makes them vulnerable to physical attacks, but high AD protects against magic.'
	},
	controller: {
		id: 'controller',
		name: 'Controller',
		hpModifier: 0, // No HP change
		pdOffset: 0, // No PD change
		adOffset: 0, // No AD change
		primaryAttributes: ['INT', 'CHA'],
		description:
			'Battlefield manipulators that shape the fight through debuffs, zones, and forced movement. Balanced defensive stats.'
	},
	defender: {
		id: 'defender',
		name: 'Defender',
		hpModifier: 0.1, // +10% HP
		pdOffset: 2, // +2 PD
		adOffset: 2, // +2 AD
		primaryAttributes: ['MIG', 'AGI'],
		description:
			'Stalwart protectors with high defenses across the board. Built to absorb punishment and protect allies.'
	},
	leader: {
		id: 'leader',
		name: 'Leader',
		hpModifier: 0, // No HP change
		pdOffset: 0, // No PD change
		adOffset: 0, // No AD change
		primaryAttributes: ['CHA'],
		description:
			'Command creatures that buff allies and coordinate attacks. Balanced stats allow them to survive in various positions.'
	},
	lurker: {
		id: 'lurker',
		name: 'Lurker',
		hpModifier: -0.2, // -20% HP
		pdOffset: 3, // +3 PD
		adOffset: -3, // -3 AD
		primaryAttributes: ['AGI'],
		description:
			'Ambush predators that strike from hiding. Very high PD but fragile against magic. Low HP requires careful positioning.'
	},
	skirmisher: {
		id: 'skirmisher',
		name: 'Skirmisher',
		hpModifier: 0, // No HP change
		pdOffset: 1, // +1 PD
		adOffset: 1, // +1 AD
		primaryAttributes: ['AGI'],
		description:
			'Mobile combatants that excel at hit-and-run tactics. Slightly elevated defenses help survive repositioning.'
	},
	support: {
		id: 'support',
		name: 'Support',
		hpModifier: -0.15, // -15% HP
		pdOffset: -2, // -2 PD
		adOffset: -2, // -2 AD
		primaryAttributes: ['CHA'],
		description:
			'Healers and buffers that keep allies fighting. Lower defenses and HP require protection from frontline threats.'
	}
} as const;

/**
 * All monster roles as an array (for iteration)
 */
export const MONSTER_ROLES_LIST: readonly MonsterRole[] = Object.values(MONSTER_ROLES);

/**
 * Gets a monster role by ID
 *
 * @param roleId - The role ID to look up
 * @returns The role definition
 * @throws Error if role ID is invalid
 *
 * @example
 * getMonsterRole('brute')
 * // { id: 'brute', name: 'Brute', hpModifier: 0.25, pdOffset: -2, adOffset: 2, ... }
 */
export function getMonsterRole(roleId: MonsterRoleId): MonsterRole {
	const role = MONSTER_ROLES[roleId];
	if (!role) {
		throw new Error(
			`Invalid role ID: ${roleId}. Valid roles: ${Object.keys(MONSTER_ROLES).join(', ')}`
		);
	}
	return role;
}

/**
 * Checks if a string is a valid monster role ID
 *
 * @param roleId - String to check
 * @returns true if valid role ID
 */
export function isValidMonsterRoleId(roleId: string): roleId is MonsterRoleId {
	return roleId in MONSTER_ROLES;
}

/**
 * Gets all role IDs
 *
 * @returns Array of all valid role IDs
 */
export function getAllMonsterRoleIds(): MonsterRoleId[] {
	return Object.keys(MONSTER_ROLES) as MonsterRoleId[];
}

/**
 * Calculates HP modifier as a multiplier (for use in calculations)
 *
 * @param role - The monster role
 * @returns HP multiplier (e.g., 1.25 for +25%, 0.9 for -10%)
 *
 * @example
 * getRoleHPMultiplier(MONSTER_ROLES.brute)  // 1.25
 * getRoleHPMultiplier(MONSTER_ROLES.lurker) // 0.8
 */
export function getRoleHPMultiplier(role: MonsterRole): number {
	return 1 + role.hpModifier;
}
