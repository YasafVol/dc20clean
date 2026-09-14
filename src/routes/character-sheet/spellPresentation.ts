import type { Spell, SpellEffect } from '../../lib/rulesdata/schemas/spell.schema';
import type { GrantedAbility } from '../../lib/services/calculatorModules/abilityCollection';

interface SpellPresentationInput {
	spell: Pick<Spell, 'range' | 'effects'>;
	baseAttackSpellCheck: number;
	grantedAbilities?: GrantedAbility[];
}

export interface SpellPresentation {
	usesSpellAttack: boolean;
	usesSpellCheck: boolean;
	checkBonus: number;
	damageBonus: number;
	range: string;
	notes: string[];
}

function hasAbility(abilities: GrantedAbility[], name: string): boolean {
	return abilities.some((ability) => ability.name === name);
}

function adjustRange(range: string, increase: number): string {
	if (increase === 0) return range;
	return range.replace(/\d+/, (value) => String(Number(value) + increase));
}

export function getSpellPresentation({
	spell,
	baseAttackSpellCheck,
	grantedAbilities = []
}: SpellPresentationInput): SpellPresentation {
	const rulesText = spell.effects.map((effect: SpellEffect) => effect.description).join(' ');
	const usesSpellAttack = /spell attack/i.test(rulesText);
	const usesSpellCheck = /spell check/i.test(rulesText);
	const vicious = usesSpellAttack && hasAbility(grantedAbilities, 'vicious_focus');
	const channeling = usesSpellCheck && hasAbility(grantedAbilities, 'channeling_focus');
	const powerful = usesSpellAttack && hasAbility(grantedAbilities, 'powerful_focus');
	const rangeValue = Number(spell.range.match(/\d+/)?.[0] ?? 0);
	const reach = rangeValue === 1 && hasAbility(grantedAbilities, 'reach_focus');
	const longRanged = rangeValue > 1 && hasAbility(grantedAbilities, 'long_ranged_focus');
	const notes: string[] = [];

	if (vicious) notes.push('Vicious focus: +1 to hit with this Spell Attack.');
	if (channeling) notes.push('Channeling focus: +1 to this Spell Check.');
	if (powerful) notes.push('Powerful focus: +1 damage to all Spell Attack targets.');
	if (reach) notes.push('Reach focus: range increased by 1 Space.');
	if (longRanged) notes.push('Long-Ranged focus: range increased by 5 Spaces.');
	for (const [abilityName, label] of [
		['close_quarters_focus', 'Close Quarters focus applies to ranged Spell Attacks in melee.'],
		['muffled_focus', 'Muffled focus limits how far Verbal Components can be heard.'],
		['reactive_focus', 'Reactive focus applies during Spell Duels.']
	] as const) {
		if (hasAbility(grantedAbilities, abilityName)) notes.push(label);
	}

	return {
		usesSpellAttack,
		usesSpellCheck,
		checkBonus: baseAttackSpellCheck + Number(vicious) + Number(channeling),
		damageBonus: Number(powerful),
		range: adjustRange(spell.range, reach ? 1 : longRanged ? 5 : 0),
		notes
	};
}
