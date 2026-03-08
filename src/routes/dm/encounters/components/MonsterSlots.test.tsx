import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MonsterSlots } from './MonsterSlots';
import { useMonsterList } from '../../../../lib/hooks/useMonsters';

vi.mock('../../../../lib/hooks/useMonsters', () => ({
	useMonsterList: vi.fn()
}));

const mockedUseMonsterList = vi.mocked(useMonsterList);

describe('MonsterSlots', () => {
	beforeEach(() => {
		cleanup();
		mockedUseMonsterList.mockReturnValue({
			monsters: [
				{
					id: 'mon_1',
					name: 'Goblin Raider',
					level: 1,
					tier: 'standard'
				}
			],
			isLoading: false
		} as any);
	});

	it('creates a slot and opens picker from empty state CTA', () => {
		const onAddSlot = vi.fn();

		render(
			<MonsterSlots
				slots={[]}
				onAddSlot={onAddSlot}
				onRemoveSlot={vi.fn()}
				onSetMonster={vi.fn()}
				onClearMonster={vi.fn()}
				onSetQuantity={vi.fn()}
			/>
		);

		fireEvent.click(screen.getByRole('button', { name: 'Add & Select Monster' }));

		expect(onAddSlot).toHaveBeenCalledTimes(1);
		expect(onAddSlot.mock.calls[0][0]).toMatchObject({
			monsterId: null,
			quantity: 1,
			cost: 0
		});
		expect(onAddSlot.mock.calls[0][0].id).toContain('slot_');
		expect(screen.getByText('Select Monster')).toBeInTheDocument();
	});

	it('sets monster on the newly created slot from empty state CTA flow', () => {
		const onAddSlot = vi.fn();
		const onSetMonster = vi.fn();

		render(
			<MonsterSlots
				slots={[]}
				onAddSlot={onAddSlot}
				onRemoveSlot={vi.fn()}
				onSetMonster={onSetMonster}
				onClearMonster={vi.fn()}
				onSetQuantity={vi.fn()}
			/>
		);

		fireEvent.click(screen.getByRole('button', { name: 'Add & Select Monster' }));
		const createdSlotId = onAddSlot.mock.calls[0][0].id;
		fireEvent.click(screen.getByRole('button', { name: /Goblin Raider/i }));

		expect(onSetMonster).toHaveBeenCalledWith(createdSlotId, 'mon_1', 1, 'standard');
	});
});
