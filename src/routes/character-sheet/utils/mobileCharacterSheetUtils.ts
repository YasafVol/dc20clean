/**
 * Mobile Character Sheet Utilities
 * Contains helper functions for mobile character sheet operations
 */

import type { Maneuver } from '../../../lib/rulesdata/maneuvers';
import type { InventoryItem } from '../../../lib/rulesdata/inventoryItems';

/**
 * Calculate percentage for resource bars
 */
export const getFillPercentage = (current: number, max: number): number => {
	if (max === 0) return 0;
	return Math.min(100, Math.max(0, (current / max) * 100));
};

/**
 * Exhaustion level descriptions
 */
export const exhaustionLevels = [
	{ level: 1, description: 'Fatigued: -1 to all Checks and Saves' },
	{ level: 2, description: 'Exhausted: -2 to all Checks and Saves' },
	{ level: 3, description: 'Debilitated: -3 to all Checks and Saves, Speed halved' },
	{ level: 4, description: 'Incapacitated: -4 to all Checks and Saves, Speed quartered' },
	{ level: 5, description: 'Unconscious: Helpless, cannot take actions' }
];

/**
 * Create a pending spell entry
 */
export const createPendingSpell = () => ({
	id: Date.now().toString(),
	spellName: '',
	school: '',
	level: 1,
	castingTime: '',
	range: '',
	duration: '',
	description: '',
	isPending: true
});

/**
 * Create a pending attack entry
 */
export const createPendingAttack = () => ({
	id: Date.now().toString(),
	name: '',
	weaponName: '',
	attackBonus: 0,
	damage: '',
	damageType: '',
	critRange: '20',
	critDamage: '',
	brutalDamage: '',
	heavyHitEffect: '',
	isPending: true
});

/**
 * Create a pending maneuver entry
 */
export const createPendingManeuver = () => ({
	id: Date.now().toString(),
	name: '',
	type: '',
	cost: '',
	description: '',
	isPending: true
});

/**
 * Create a pending inventory item entry
 */
export const createPendingInventoryItem = () => ({
	id: Date.now().toString(),
	name: '',
	quantity: 1,
	weight: 0,
	description: '',
	category: '',
	isPending: true
});

/**
 * Convert rule spell to character spell data
 */
export const convertSpellToCharacterData = (ruleSpell: any, spellId: string) => ({
	id: spellId,
	spellName: ruleSpell.name,
	school: ruleSpell.school,
	level: ruleSpell.isCantrip ? 0 : (ruleSpell.cost?.spellLevel || 1),
	castingTime: 'Action',
	range: ruleSpell.range,
	duration: ruleSpell.duration,
	description: ruleSpell.effects.map((e: any) => e.description).join(' '),
	isPending: false
});

/**
 * Convert rule maneuver to character maneuver data
 */
export const convertManeuverToCharacterData = (ruleManeuver: Maneuver, maneuverId: string) => ({
	id: maneuverId,
	name: ruleManeuver.name,
	type: ruleManeuver.type,
	cost: ruleManeuver.cost.toString(),
	description: ruleManeuver.description,
	isPending: false
});

/**
 * Convert rule inventory item to character inventory data
 */
export const convertInventoryItemToCharacterData = (ruleItem: InventoryItem, itemId: string) => ({
	id: itemId,
	name: ruleItem.name,
	category: ruleItem.itemType,
	description: (ruleItem as any).description || '',
	weight: (ruleItem as any).weight || 0,
	quantity: 1,
	isPending: false
});

/**
 * Show detailed maneuver information in alert
 */
export const showManeuverDetails = (maneuver: any, allManeuvers: Maneuver[]) => {
	const maneuverDetails = allManeuvers.find(m => m.name === maneuver.name);
	if (maneuverDetails) {
		const info = `${maneuverDetails.name}\n\nType: ${maneuverDetails.type}\nCost: ${maneuverDetails.cost}\n\nDescription: ${maneuverDetails.description}\n\nRequirement: ${maneuverDetails.requirement || 'None'}\nTrigger: ${maneuverDetails.trigger || 'N/A'}`;
		alert(info);
	} else {
		alert(`${maneuver.name}\n\nType: ${maneuver.type || '?'}\nCost: ${maneuver.cost || '?'}`);
	}
};

/**
 * Format currency display helpers
 */
export const getCurrencyValue = (currency: any, type: 'gold' | 'silver' | 'copper'): number => {
	// Handle both old and new currency formats
	if (currency.gold !== undefined) {
		return currency[type] || 0;
	} else {
		const mapping = {
			gold: 'goldPieces',
			silver: 'silverPieces',
			copper: 'copperPieces'
		};
		return currency[mapping[type]] || 0;
	}
};