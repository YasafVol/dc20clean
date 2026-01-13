/**
 * @file src/lib/rulesdata/equipment/validation/equipmentValidator.ts
 * @description Validation logic for custom equipment.
 */

import { ValidationResult, ValidationError } from '../schemas/baseEquipment';
import { CustomWeapon } from '../schemas/weaponSchema';
import { CustomArmor } from '../schemas/armorSchema';
import { CustomShield } from '../schemas/shieldSchema';
import { CustomSpellFocus } from '../schemas/spellFocusSchema';
import {
	getWeaponProperty,
	getPropertiesForWeaponType,
	MELEE_WEAPON_PROPERTIES,
	RANGED_WEAPON_PROPERTIES
} from '../options/weaponOptions';
import { getArmorProperty, getPropertiesForArmorType } from '../options/armorOptions';
import { getShieldProperty, getPropertiesForShieldType } from '../options/shieldOptions';
import { getSpellFocusProperty, SPELL_FOCUS_RULES } from '../options/spellFocusOptions';

// ================================================================= //
// WEAPON VALIDATION
// ================================================================= //

export function validateWeapon(weapon: Partial<CustomWeapon>): ValidationResult {
	const errors: ValidationError[] = [];
	const warnings: string[] = [];

	// Check required fields
	if (!weapon.weaponType) {
		errors.push({ message: 'Weapon type is required (melee or ranged)' });
	}

	if (!weapon.style) {
		errors.push({ message: 'Weapon style is required' });
	}

	if (!weapon.damageType) {
		errors.push({ message: 'Damage type is required' });
	}

	if (!weapon.properties) {
		errors.push({ message: 'Properties array is required' });
		return { isValid: false, errors, warnings };
	}

	// Get available properties for this weapon type
	const availableProperties = weapon.weaponType
		? getPropertiesForWeaponType(weapon.weaponType)
		: [];
	const propertyMap = new Map(availableProperties.map((p) => [p.id, p]));

	// Calculate points spent
	let pointsSpent = 0;
	const propertyCounts = new Map<string, number>();

	for (const propId of weapon.properties) {
		const property = propertyMap.get(propId) || getWeaponProperty(propId);

		if (!property) {
			errors.push({
				propertyId: propId,
				message: `Unknown property: ${propId}`
			});
			continue;
		}

		// Check if property is available for this weapon type
		if (weapon.weaponType === 'melee' && property.rangedOnly) {
			errors.push({
				propertyId: propId,
				message: `Property "${property.name}" is only available for ranged weapons`
			});
		}

		if (weapon.weaponType === 'ranged' && property.meleeOnly) {
			errors.push({
				propertyId: propId,
				message: `Property "${property.name}" is only available for melee weapons`
			});
		}

		// Count property occurrences
		const count = (propertyCounts.get(propId) || 0) + 1;
		propertyCounts.set(propId, count);

		// Check max stacks
		const maxStacks = property.maxStacks || 1;
		if (count > maxStacks) {
			errors.push({
				propertyId: propId,
				message: `Property "${property.name}" can only be taken ${maxStacks} time(s)`
			});
		}

		// Check requirements
		if (property.requires) {
			for (const required of property.requires) {
				if (!weapon.properties.includes(required)) {
					const requiredProp =
						MELEE_WEAPON_PROPERTIES.find((p) => p.id === required) ||
						RANGED_WEAPON_PROPERTIES.find((p) => p.id === required);
					errors.push({
						propertyId: propId,
						message: `Property "${property.name}" requires "${requiredProp?.name || required}"`
					});
				}
			}
		}

		// Check exclusions
		if (property.excludes) {
			for (const excluded of property.excludes) {
				if (weapon.properties.includes(excluded)) {
					const excludedProp =
						MELEE_WEAPON_PROPERTIES.find((p) => p.id === excluded) ||
						RANGED_WEAPON_PROPERTIES.find((p) => p.id === excluded);
					errors.push({
						propertyId: propId,
						message: `Property "${property.name}" cannot be combined with "${excludedProp?.name || excluded}"`
					});
				}
			}
		}

		pointsSpent += property.cost;
	}

	// Check points budget
	const maxPoints = weapon.maxPoints || 2;
	if (pointsSpent > maxPoints) {
		errors.push({
			message: `Points spent (${pointsSpent}) exceeds maximum (${maxPoints})`
		});
	}

	// Multi-Faceted validation
	if (weapon.properties.includes('multi-faceted') && !weapon.secondaryStyle) {
		warnings.push('Multi-Faceted property selected but no secondary style chosen');
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings
	};
}

// ================================================================= //
// ARMOR VALIDATION
// ================================================================= //

export function validateArmor(armor: Partial<CustomArmor>): ValidationResult {
	const errors: ValidationError[] = [];
	const warnings: string[] = [];

	// Check required fields
	if (!armor.armorType) {
		errors.push({ message: 'Armor type is required (light or heavy)' });
	}

	if (!armor.properties) {
		errors.push({ message: 'Properties array is required' });
		return { isValid: false, errors, warnings };
	}

	// Get available properties for this armor type
	const availableProperties = armor.armorType
		? getPropertiesForArmorType(armor.armorType)
		: [];
	const propertyMap = new Map(availableProperties.map((p) => [p.id, p]));

	// Calculate points spent
	let pointsSpent = 0;
	const propertyCounts = new Map<string, number>();

	for (const propId of armor.properties) {
		const property = propertyMap.get(propId) || getArmorProperty(propId);

		if (!property) {
			errors.push({
				propertyId: propId,
				message: `Unknown property: ${propId}`
			});
			continue;
		}

		// Check if property is available for this armor type
		if (armor.armorType === 'light' && property.heavyOnly) {
			errors.push({
				propertyId: propId,
				message: `Property "${property.name}" is only available for heavy armor`
			});
		}

		if (armor.armorType === 'heavy' && property.lightOnly) {
			errors.push({
				propertyId: propId,
				message: `Property "${property.name}" is only available for light armor`
			});
		}

		// Count property occurrences
		const count = (propertyCounts.get(propId) || 0) + 1;
		propertyCounts.set(propId, count);

		// Check max stacks
		const maxStacks = property.maxStacks || 1;
		if (count > maxStacks) {
			errors.push({
				propertyId: propId,
				message: `Property "${property.name}" can only be taken ${maxStacks} time(s)`
			});
		}

		pointsSpent += property.cost;
	}

	// Check points budget
	const maxPoints = armor.maxPoints || 2;
	if (pointsSpent > maxPoints) {
		errors.push({
			message: `Points spent (${pointsSpent}) exceeds maximum (${maxPoints})`
		});
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings
	};
}

// ================================================================= //
// SHIELD VALIDATION
// ================================================================= //

export function validateShield(shield: Partial<CustomShield>): ValidationResult {
	const errors: ValidationError[] = [];
	const warnings: string[] = [];

	// Check required fields
	if (!shield.shieldType) {
		errors.push({ message: 'Shield type is required (light or heavy)' });
	}

	if (!shield.properties) {
		errors.push({ message: 'Properties array is required' });
		return { isValid: false, errors, warnings };
	}

	// Get available properties for this shield type
	const availableProperties = shield.shieldType
		? getPropertiesForShieldType(shield.shieldType)
		: [];
	const propertyMap = new Map(availableProperties.map((p) => [p.id, p]));

	// Calculate points spent
	let pointsSpent = 0;
	const propertyCounts = new Map<string, number>();

	for (const propId of shield.properties) {
		const property = propertyMap.get(propId) || getShieldProperty(propId);

		if (!property) {
			errors.push({
				propertyId: propId,
				message: `Unknown property: ${propId}`
			});
			continue;
		}

		// Check if property is available for this shield type
		if (shield.shieldType === 'light' && property.heavyOnly) {
			errors.push({
				propertyId: propId,
				message: `Property "${property.name}" is only available for heavy shields`
			});
		}

		if (shield.shieldType === 'heavy' && property.lightOnly) {
			errors.push({
				propertyId: propId,
				message: `Property "${property.name}" is only available for light shields`
			});
		}

		// Count property occurrences
		const count = (propertyCounts.get(propId) || 0) + 1;
		propertyCounts.set(propId, count);

		// Check max stacks
		const maxStacks = property.maxStacks || 1;
		if (count > maxStacks) {
			errors.push({
				propertyId: propId,
				message: `Property "${property.name}" can only be taken ${maxStacks} time(s)`
			});
		}

		pointsSpent += property.cost;
	}

	// Check points budget
	const maxPoints = shield.maxPoints || 2;
	if (pointsSpent > maxPoints) {
		errors.push({
			message: `Points spent (${pointsSpent}) exceeds maximum (${maxPoints})`
		});
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings
	};
}

// ================================================================= //
// SPELL FOCUS VALIDATION
// ================================================================= //

export function validateSpellFocus(focus: Partial<CustomSpellFocus>): ValidationResult {
	const errors: ValidationError[] = [];
	const warnings: string[] = [];

	// Check required fields
	if (!focus.hands) {
		errors.push({ message: 'Hand requirement is required (one-handed or two-handed)' });
	}

	if (!focus.properties) {
		errors.push({ message: 'Properties array is required' });
		return { isValid: false, errors, warnings };
	}

	// Calculate points spent
	let pointsSpent = 0;
	const propertyCounts = new Map<string, number>();

	for (const propId of focus.properties) {
		const property = getSpellFocusProperty(propId);

		if (!property) {
			errors.push({
				propertyId: propId,
				message: `Unknown property: ${propId}`
			});
			continue;
		}

		// Count property occurrences
		const count = (propertyCounts.get(propId) || 0) + 1;
		propertyCounts.set(propId, count);

		// Check max stacks (spell focus properties can only be taken once)
		if (count > 1) {
			errors.push({
				propertyId: propId,
				message: `Property "${property.name}" can only be taken once`
			});
		}

		pointsSpent += property.cost;
	}

	// Check points budget
	// Two-Handed effectively gives +1 point (costs -1)
	const maxPoints = focus.hands === 'two-handed' ? 2 : SPELL_FOCUS_RULES.maxPoints;
	if (pointsSpent > maxPoints) {
		errors.push({
			message: `Points spent (${pointsSpent}) exceeds maximum (${maxPoints})`
		});
	}

	// Two-handed focus should have the two-handed property
	if (focus.hands === 'two-handed' && !focus.properties.includes('two-handed-focus')) {
		warnings.push('Two-handed focus should include the Two-Handed property');
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings
	};
}

// ================================================================= //
// GENERIC VALIDATION
// ================================================================= //

export function validateEquipment(
	equipment: Partial<CustomWeapon | CustomArmor | CustomShield | CustomSpellFocus>
): ValidationResult {
	if ('weaponType' in equipment || equipment.category === 'weapon') {
		return validateWeapon(equipment as Partial<CustomWeapon>);
	}
	if ('armorType' in equipment || equipment.category === 'armor') {
		return validateArmor(equipment as Partial<CustomArmor>);
	}
	if ('shieldType' in equipment || equipment.category === 'shield') {
		return validateShield(equipment as Partial<CustomShield>);
	}
	if ('hands' in equipment || equipment.category === 'spellFocus') {
		return validateSpellFocus(equipment as Partial<CustomSpellFocus>);
	}

	return {
		isValid: false,
		errors: [{ message: 'Unknown equipment type' }],
		warnings: []
	};
}
