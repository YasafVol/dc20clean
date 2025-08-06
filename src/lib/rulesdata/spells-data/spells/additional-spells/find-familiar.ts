import { Spell, SpellSchool, PremadeSpellList } from '../../types/spell.types';

export const findFamiliar: Spell = {
	name: 'Find Familiar',
	premadeList: PremadeSpellList.Additional,
	school: SpellSchool.Conjuration,
	isCantrip: false,
	isRitual: true,
	cost: { ap: 1, mp: 1 },
	range: '2 Spaces',
	duration: 'Instant',
	spellLists: [], // Not specified in PDF, assuming empty
	availableClasses: [], // Not specified in PDF, assuming empty
	effects: [
		{
			title: 'Summon Familiar',
			description:
				'You summon a friendly spirit that enters your service. It takes the form of a Tiny creature of your choice, but with a Creature Type of your choice (except Giant and Humanoid). Your Familiar uses the statblock below: Familiar Level 1/8, Tiny (Chosen Type) HP Shared Prime & CM Shared PD 8+CM PDR 0 AD 8+CM MDR 0 MIG 0 CHA 0 AGI 0 INT 0 Check Shared Save DC Shared AP Shared Speed 5 Recasting the Spell: You can’t have more than 1 Familiar at a time. If you cast this Spell while you already have a Familiar, your Familiar can retain its form, adopt a new form of your choice, or it disappears and a new one takes its place. The new Familiar can be a previous one you summoned in the past or a new one altogether. In either case, you can reassign its Familiar Traits. Base Familiar Traits: Your Familiar has the following Familiar Traits: Familiar Bond: Your Familiar shares your HP and Death’s Door Threshold. If you both take damage from the same source, you only take 1 instance of that damage. While your Familiar occupies the same Space as you, it can’t be targeted by Attacks. Shared Telepathy: While within 20 Spaces, you and your Familiar can speak Telepathically with each other. Spell Delivery: While within 10 Spaces of your Familiar, you can cast a Spell with a range of Touch as if you were standing in your Familiar’s Space. Additional Traits: When you cast this Spell, you can spend additional MP (up to your Mana Spend Limit) to grant your Familiar 2 additional Traits per MP spent. You can choose Traits from the Familiar Traits or Beast Traits (you can’t choose Negative Traits). Spell Actions: Pocket Dimension: You can spend a Minor Action to dismiss the Familiar into a pocket dimension, summon it from that pocket dimension, or summon it from anywhere on the same plane of existence. When dismissed, any items it was carrying are left behind. When summoned, it appears in the nearest unoccupied Space of your choice. Shared Senses: While your Familiar is within 20 Spaces, you can spend 1 AP to connect your senses to the Familiar’s senses until the end of your next turn. For the duration, you’re Deafened and Blinded to your own senses but you can see what your Familiar sees and hear what it hears. The connection ends early if either of you moves farther than 20 Spaces from each other. Managing the Familiar: Combat: The Familiar shares your Initiative, acting on your turn. You can spend 1 AP to command the Familiar to use an Action. It can’t take the Attack Action or Spell Action unless it has a Familiar Feature that allows it to. When you take an Action, your Familiar can move up to its Speed immediately before or after the Action. If you don’t command it, it takes the Dodge Action. Shared MCP: When the Familiar makes a Check, it shares your Multiple Check Penalty. Death & Resurrection: Your Familiar dies when you die. When it does, its body disappears and its spirit returns from which it came. If you’re resurrected, the Familiar doesn’t return to life until the next time you cast this Spell. When it does, you follow the normal rules for recasting the Spell.'
		}
	],
	enhancements: [] // No enhancements specified in PDF
};
