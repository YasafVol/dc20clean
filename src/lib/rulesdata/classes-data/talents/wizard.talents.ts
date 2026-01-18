import type { Talent } from './talent.types';

export const wizardTalents: Talent[] = [
	{
		id: 'wizard_expanded_spell_school',
		name: 'Expanded Spell School',
		category: 'Class',
		// DC20 v0.10 p.161: "You learn 2 Arcane Spells from this Spell School"
		description:
			'Choose 1 additional Spell School. You learn 2 Arcane Spells from this Spell School, and you can use Signature School once per chosen Spell School.',
		prerequisites: { classId: 'wizard', feature: 'Spell School Initiate' },
		effects: [
			{ type: 'GRANT_CHOICE', target: 'spell_school', value: 1 },
			{ type: 'GRANT_SPELL', target: 'chosen_school', value: 2 }
		]
	},
	{
		id: 'wizard_crowned_sigil',
		name: 'Crowned Sigil',
		category: 'Class',
		// DC20 v0.10 p.161: "you can bind it to a willing creature within 1 Space"
		description:
			'When you create an Arcane Sigil, you can bind it to a willing creature within 1 Space. While bound, the Arcane Sigil moves with the creature and grants it a +2 bonus to its AD. A creature can only be bound to one Arcane Sigil at a time. You can spend 1 AP to unbind the Arcane Sigil and place it on the ground within 1 Space of the creature.',
		prerequisites: { classId: 'wizard', feature: 'Arcane Sigil', level: 3 },
		effects: [
			{
				type: 'GRANT_ABILITY',
				target: 'crowned_sigil',
				value: 'Bind Arcane Sigil to a willing creature for mobility and +2 AD.'
			}
		]
	},
	{
		id: 'wizard_overly_prepared_spellcaster',
		name: 'Overly Prepared Spellcaster',
		category: 'Class',
		// DC20 v0.10 p.161: Full list of benefits
		description:
			'You gain Dazed Resistance. You can change your Prepared Spell when you complete a Quick or Short Rest. When you declare a Spell Duel using your Prepared Spell, you gain ADV on your Spell Check. You can use Signature School on your Prepared Spell, even if it\'s not from the chosen Spell School. When you use Mana Limit Break, you have ADV on the Check made to cast the Spell.',
		prerequisites: { classId: 'wizard', feature: 'Prepared Spell', otherFeature: 'Spell School Initiate', level: 3 },
		effects: [
			{
				type: 'GRANT_RESISTANCE',
				target: 'Dazed',
				value: true
			},
			{
				type: 'GRANT_ABILITY',
				target: 'quick_rest_prepared_spell',
				value: 'Change Prepared Spell on Quick or Short Rest.'
			},
			{
				type: 'GRANT_ABILITY',
				target: 'spell_duel_adv',
				value: 'ADV on Spell Duels with Prepared Spell.'
			},
			{
				type: 'GRANT_ABILITY',
				target: 'signature_school_prepared',
				value: 'Use Signature School on Prepared Spell regardless of school.'
			},
			{
				type: 'GRANT_ABILITY',
				target: 'mana_limit_break_adv',
				value: 'ADV on Mana Limit Break checks.'
			}
		]
	}
];
