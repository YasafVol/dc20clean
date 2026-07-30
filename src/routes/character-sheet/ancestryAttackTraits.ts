export interface AttackTraitNote {
	source: string;
	text: string;
}

interface AncestryAttackTraitsInput {
	selectedTraitIds: unknown;
	isNaturalWeapon: boolean;
	isMartialMelee: boolean;
	isSupportedAttack: boolean;
}

export interface AncestryAttackTraits {
	brutalDamageBonus: number;
	properties: string[];
	notes: AttackTraitNote[];
}

function normalizeTraitIds(selectedTraitIds: unknown): Set<string> {
	if (Array.isArray(selectedTraitIds)) {
		return new Set(
			selectedTraitIds.filter((traitId): traitId is string => typeof traitId === 'string')
		);
	}

	if (typeof selectedTraitIds !== 'string') return new Set();

	const parsed = parseJsonSafe<unknown>(selectedTraitIds);
	return Array.isArray(parsed)
		? new Set(parsed.filter((traitId): traitId is string => typeof traitId === 'string'))
		: new Set();
}

export function getAncestryAttackTraits({
	selectedTraitIds,
	isNaturalWeapon,
	isMartialMelee,
	isSupportedAttack
}: AncestryAttackTraitsInput): AncestryAttackTraits {
	const selected = normalizeTraitIds(selectedTraitIds);
	const properties: string[] = [];
	const notes: AttackTraitNote[] = [];

	if (isSupportedAttack && selected.has('orc_finishing_blow')) {
		notes.push({
			source: 'Finishing Blow',
			text: '+1 damage vs Well-Bloodied'
		});
	}

	if (isMartialMelee && selected.has('orc_brutal_strikes')) {
		notes.push({
			source: 'Brutal Strikes',
			text: '+1 Brutal/Critical damage'
		});
	}

	if (isMartialMelee && selected.has('beastborn_charge')) {
		notes.push({
			source: 'Charge',
			text: '+1 damage after moving 2+ Spaces straight'
		});
	}

	if (isMartialMelee && selected.has('beastborn_long_limbed')) {
		properties.push('Reach +1 Space');
	}

	if (isNaturalWeapon) {
		if (selected.has('beastborn_extended_natural_weapon')) {
			properties.push('Reach');
		}

		if (selected.has('beastborn_natural_projectile')) {
			properties.push('Ranged 10 Spaces');
		}

		if (selected.has('beastborn_retractable_natural_weapon')) {
			properties.push('Concealable');
			notes.push({
				source: 'Retractable',
				text: 'ADV on first Attack Check in Combat'
			});
		}

		if (selected.has('beastborn_natural_weapon_style')) {
			notes.push({
				source: 'Natural Weapon Style',
				text: 'Weapon Enhancement available; style choice not recorded'
			});
		}

		if (selected.has('beastborn_rend')) {
			notes.push({
				source: 'Rend',
				text: '1 AP; Physical Save failure → Bleeding'
			});
		}

		if (selected.has('beastborn_venomous_natural_weapon')) {
			notes.push({
				source: 'Venomous',
				text: '1 AP; Physical Save failure → Impaired (1 minute)'
			});
		}
	}

	return {
		brutalDamageBonus: isMartialMelee && selected.has('orc_brutal_strikes') ? 1 : 0,
		properties,
		notes
	};
}
import { parseJsonSafe } from '../../lib/utils/storageUtils';
