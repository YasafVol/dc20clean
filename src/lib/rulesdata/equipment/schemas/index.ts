/**
 * @file src/lib/rulesdata/equipment/schemas/index.ts
 * @description Central export for all equipment schemas.
 */

export * from './baseEquipment';
export * from './weaponSchema';
export * from './armorSchema';
export * from './shieldSchema';
export * from './spellFocusSchema';

// Union type for all custom equipment
import { CustomWeapon } from './weaponSchema';
import { CustomArmor } from './armorSchema';
import { CustomShield } from './shieldSchema';
import { CustomSpellFocus } from './spellFocusSchema';

export type CustomEquipment = CustomWeapon | CustomArmor | CustomShield | CustomSpellFocus;
