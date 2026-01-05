import type { Spell } from '../../schemas/spell.schema';
import { SpellSchool, SpellSource } from '../../schemas/spell.schema';

export const summonFamiliar: Spell = {
	id: 'summon-familiar',
	name: 'Summon Familiar',
	sources: [SpellSource.Arcane, SpellSource.Divine, SpellSource.Primal],
	school: SpellSchool.Conjuration,
	tags: ['Summoning'],
	isCantrip: false,
	cost: { ap: 1, mp: 1 },
	range: '1 Space',
	duration: 'Instantaneous',
	effects: [
		{
			title: 'Effect',
			description:
				"You summon a friendly spirit that enters your service until you are reduced to 0 HP or you choose to end the Spell for free on your turn. It takes the form of a Tiny creature of your choice, but with a Creature Type of your choice (except Giant and Humanoid). Your Familiar uses the statblock below: #### Familiar Tiny (Chosen Type) | HP | Shared | AP | Shared | | :--- | :--- | :--- | :--- | | PD | 8 + CM | AD | 8 + CM | | PM | Shared | Save DC | Shared | | Speed | 5 | CM | Shared | | MIG | 0 | CHA | 0 | | AGI | 0 | INT | 0 | DC Tip: The Familiar shares your Prime Modifier and Combat Mastery so it's Attack, Martial and Spell Checks are the same as yours. MP Reduction: When you cast the Spell, your maximum MP is reduced by an amount equal to the MP spent. This MP reduction only ends when the Spell ends. You don't regain any lost MP when your maximum MP is restored. Recasting the Spell: You can't have more than 1 Familiar at a time. If you cast this Spell while you already have a Familiar, your Familiar can retain its form, adopt a new form of your choice, or it disappears and a new one takes its place. The new Familiar can be a previous one you summoned in the past or a new one altogether. In either case, you can reassign its Familiar Traits. Familiar Traits: Your Familiar has the following Familiar Traits:"
		}
	],
	enhancements: [
		{
			type: 'MP',
			cost: 1,
			name: 'Additional Traits',
			description:
				"Grant your Familiar 2 points worth of Familiar or Beast Traits (you can't choose Negative Traits). ### Expanded Familiar Traits Summoned Familiars can choose from the following additional Familiar Traits:",
			repeatable: true
		}
	]
};
