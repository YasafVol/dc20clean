import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AlternativeCombatResourceSection, {
	getDamageReductionState,
	getMovementDisplayModes
} from './AlternativeCombatResourceSection';

afterEach(cleanup);

describe('AlternativeCombatResourceSection', () => {
	it('maps categorical damage reductions from calculated resistances', () => {
		expect(
			getDamageReductionState(0, [
				{ type: 'elemental', value: 'true' },
				{ type: 'mystical', value: 'true' }
			])
		).toEqual({ pdr: false, edr: true, mdr: true });

		expect(getDamageReductionState(2, [])).toEqual({
			pdr: true,
			edr: false,
			mdr: false
		});
	});

	it('orders every available movement mode without duplicating grants', () => {
		expect(
			getMovementDisplayModes(6, [
				{ type: 'glide', speed: '6' },
				{ type: 'climb', speed: '3', isDefault: true },
				{ type: 'fly', speed: '6' },
				{ type: 'swim', speed: '3', isDefault: true },
				{ type: 'burrow', speed: '3' },
				{ type: 'fly', speed: '6' }
			])
		).toEqual([
			{ type: 'walk', label: 'Walk', speed: '6' },
			{ type: 'climb', label: 'Climb', speed: '3', source: undefined, isDefault: true },
			{ type: 'swim', label: 'Swim', speed: '3', source: undefined, isDefault: true },
			{ type: 'fly', label: 'Fly', speed: '6', source: undefined, isDefault: undefined },
			{ type: 'burrow', label: 'Burrow', speed: '3', source: undefined, isDefault: undefined },
			{ type: 'glide', label: 'Glide', speed: '6', source: undefined, isDefault: undefined }
		]);
	});

	it('renders combat values and rolls actionable metrics', () => {
		const onRoll = vi.fn();
		render(
			<AlternativeCombatResourceSection
				attackBonus={5}
				saveDC={15}
				initiative={4}
				moveSpeed={5}
				jumpDistance={3}
				movements={[
					{ type: 'climb', speed: '2', isDefault: true },
					{ type: 'swim', speed: '2', isDefault: true },
					{ type: 'fly', speed: '5' },
					{ type: 'glide', speed: '5' }
				]}
				precisionDefense={12}
				areaDefense={11}
				combatMastery={2}
				might={-1}
				agility={3}
				charisma={2}
				intelligence={-1}
				physicalDamageReduction={0}
				resistances={[{ type: 'elemental', value: 'true' }]}
				onRoll={onRoll}
			/>
		);

		expect(screen.getByRole('group', { name: 'Defense thresholds' })).toBeTruthy();
		expect(screen.getByRole('group', { name: 'Movement speeds' })).toHaveTextContent(
			'Walk5Climb2Swim2Fly5Glide5'
		);
		expect(screen.getByLabelText('Precision Defense 12')).toHaveTextContent(
			/HitBase12Heavy\+517Brutal\+1022/
		);
		expect(screen.getByLabelText('Area Defense 11')).toHaveTextContent(
			/HitBase11Heavy\+516Brutal\+1021/
		);
		expect(screen.getByLabelText('PDR inactive')).toBeTruthy();
		expect(screen.getByLabelText('EDR active')).toBeTruthy();
		expect(screen.getByLabelText('MDR inactive')).toBeTruthy();

		fireEvent.click(screen.getByRole('button', { name: 'Roll Attack +5' }));
		expect(onRoll).toHaveBeenLastCalledWith('Attack', 5, 'attack');

		fireEvent.click(screen.getByRole('button', { name: 'Roll Initiative +4' }));
		expect(onRoll).toHaveBeenLastCalledWith('Initiative', 4, 'physical-check');
	});

	it('shows calculator-backed PD and AD formulas when their abbreviations are hovered', () => {
		render(
			<AlternativeCombatResourceSection
				attackBonus={5}
				saveDC={15}
				initiative={4}
				moveSpeed={5}
				jumpDistance={3}
				precisionDefense={13}
				areaDefense={12}
				combatMastery={2}
				might={-1}
				agility={3}
				charisma={3}
				intelligence={0}
				precisionDefenseBreakdown={{
					statName: 'pd',
					base: 13,
					effects: [],
					total: 13
				}}
				areaDefenseBreakdown={{
					statName: 'ad',
					base: 12,
					effects: [],
					total: 12
				}}
				physicalDamageReduction={0}
				resistances={[]}
				onRoll={vi.fn()}
			/>
		);

		const pdChip = screen.getByLabelText('PD formula');
		fireEvent.mouseEnter(pdChip.parentElement as HTMLElement);
		expect(
			screen.getByText('PD = 8 + Combat Mastery + Agility + Intelligence + Bonuses')
		).toBeVisible();

		fireEvent.mouseLeave(pdChip.parentElement as HTMLElement);
		const adChip = screen.getByLabelText('AD formula');
		fireEvent.mouseEnter(adChip.parentElement as HTMLElement);
		expect(screen.getByText('AD = 8 + Combat Mastery + Might + Charisma + Bonuses')).toBeVisible();
	});
});
