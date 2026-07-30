import type { AttackData } from '../../types';
import type { Weapon } from '../../lib/rulesdata/inventoryItems';
import type { ConditionalModifier } from '../../lib/services/calculatorModules/abilityCollection';
import { calculateDamage, parseDamage } from '../../lib/utils/weaponUtils';

interface AttackPresentationInput {
	attack: AttackData;
	weapon: Weapon | null;
	conditionalModifiers?: ConditionalModifier[];
	activeConditions?: Iterable<string>;
	brutalDamageBonus?: number;
}

export interface AttackPresentation {
	isSupportedAttack: boolean;
	isMartialMelee: boolean;
	conditionalDamageBonus: number;
	baseDamage: string;
	heavyDamage: string;
	brutalDamage: string;
	damageType: string;
	note?: string;
}

const addDamage = (damage: string, bonus: number): string => {
	if (!damage || bonus === 0) return damage;
	return damage.replace(/\d+/g, (amount) => String(Number(amount) + bonus));
};

export function getAttackPresentation({
	attack,
	weapon,
	conditionalModifiers = [],
	activeConditions = [],
	brutalDamageBonus = 0
}: AttackPresentationInput): AttackPresentation {
	const active = new Set(activeConditions);
	const normalizedName = (attack.weaponName || attack.name).trim().toLocaleLowerCase();
	const isUnarmed = normalizedName === 'unarmed strike' || normalizedName === 'unarmed strikes';
	const isMeleeWeapon = weapon?.type.toLocaleLowerCase().includes('melee') ?? false;
	const isMartialMelee = isUnarmed || isMeleeWeapon;
	const conditionalDamageBonus = isMartialMelee
		? conditionalModifiers.reduce((total, modifier) => {
				const effect = modifier.effect as ConditionalModifier['effect'] & {
					target?: string;
					value?: number;
				};
				return effect.target === 'martial_melee_damage' && active.has(modifier.condition)
					? total + Number(effect.value ?? 0)
					: total;
			}, 0)
		: 0;

	const sourceDamage = attack.damage || weapon?.damage || '';
	const parsed = parseDamage(sourceDamage);
	const baseDamage = addDamage(sourceDamage, conditionalDamageBonus);
	const heavyBase = weapon
		? calculateDamage(weapon, 'heavy')
		: sourceDamage
			? `${parsed.amount + 1} ${parsed.type}`
			: '';
	const brutalBase = weapon
		? calculateDamage(weapon, 'brutal')
		: sourceDamage
			? `${parsed.amount + 2} ${parsed.type}`
			: '';

	return {
		isSupportedAttack: Boolean(weapon || isUnarmed),
		isMartialMelee,
		conditionalDamageBonus,
		baseDamage,
		heavyDamage: addDamage(heavyBase, conditionalDamageBonus),
		brutalDamage: addDamage(brutalBase, conditionalDamageBonus + brutalDamageBonus),
		damageType: parsed.typeDisplay,
		note:
			conditionalDamageBonus > 0
				? `Includes +${conditionalDamageBonus} active martial melee damage`
				: undefined
	};
}
