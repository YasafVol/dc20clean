import { fireAndFlamesSpells } from './fire-and-flames';
import { iceAndIllusionsSpells } from './ice-and-illusions';
import { lightningAndTeleportationSpells } from './lightning-and-teleportation';
import { psychicAndEnchantmentSpells } from './psychic-and-enchantment';
import { holyAndRestorationSpells } from './holy-and-restoration';
import { specialClassSpells } from './special-class-spells';
import { fiendbornAncestrySpells } from './fiendborn-ancestry-spells';
import { additionalSpells } from './additional-spells';

export * from './fire-and-flames';
export * from './ice-and-illusions';
export * from './lightning-and-teleportation';
export * from './psychic-and-enchantment';
export * from './holy-and-restoration';
export * from './special-class-spells';
export * from './fiendborn-ancestry-spells';
export * from './additional-spells';

export const allSpells = [
	...fireAndFlamesSpells,
	...iceAndIllusionsSpells,
	...lightningAndTeleportationSpells,
	...psychicAndEnchantmentSpells,
	...holyAndRestorationSpells,
	...specialClassSpells,
	...fiendbornAncestrySpells,
	...additionalSpells
];
