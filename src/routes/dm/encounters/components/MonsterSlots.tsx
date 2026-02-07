/**
 * Monster Slots Component
 *
 * Display and manage monster slots in encounter.
 */

import React, { useState } from 'react';
import { useMonsterList } from '../../../../lib/hooks/useMonsters';
import type { EncounterMonsterSlot } from '../../../../lib/rulesdata/schemas/encounter.schema';
import type { SavedMonster, MonsterTier } from '../../../../lib/rulesdata/schemas/monster.schema';
import { Button } from '../../../../components/common/Button';
import {
	ModalBackdrop,
	ModalContainer,
	ModalHeader,
	ModalTitle,
	ModalCloseButton,
	ModalBody,
	SearchInput
} from '../../../../components/common/Modal';
import {
	MonsterSlotList,
	MonsterSlotCard,
	SlotMonsterInfo,
	SlotMonsterName,
	SlotMonsterMeta,
	SlotQuantityControl,
	QuantityButton,
	QuantityValue,
	SlotCost,
	SlotActions,
	EmptySlotContent
} from '../styles/EncounterStyles';
import styled from 'styled-components';
import { theme } from '../../../character-sheet/styles/theme';

const MonsterListItem = styled.button`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	padding: ${theme.spacing[3]};
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	text-align: left;
	cursor: pointer;
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.accent.secondaryAlpha20};
		border-color: ${theme.colors.accent.secondary};
	}
`;

const MonsterListItemInfo = styled.div`
	flex: 1;
`;

const MonsterListItemName = styled.div`
	font-weight: ${theme.typography.fontWeight.medium};
	color: ${theme.colors.text.primary};
	margin-bottom: ${theme.spacing[1]};
`;

const MonsterListItemMeta = styled.div`
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.text.muted};
`;

const MonsterListItemCost = styled.div`
	font-weight: ${theme.typography.fontWeight.bold};
	font-size: ${theme.typography.fontSize.lg};
	color: ${theme.colors.accent.warning};
`;

const MonsterListContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing[2]};
`;

const EmptyMessage = styled.div`
	padding: ${theme.spacing[8]} 0;
	text-align: center;
	color: ${theme.colors.text.muted};
	font-size: ${theme.typography.fontSize.sm};
`;

export interface MonsterSlotsProps {
	slots: EncounterMonsterSlot[];
	onAddSlot: () => void;
	onRemoveSlot: (slotId: string) => void;
	onSetMonster: (slotId: string, monsterId: string, level: number, tier: MonsterTier) => void;
	onClearMonster: (slotId: string) => void;
	onSetQuantity: (slotId: string, quantity: number) => void;
}

// Monster picker modal
const MonsterPicker: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	onSelect: (monster: SavedMonster) => void;
}> = ({ isOpen, onClose, onSelect }) => {
	const { monsters, isLoading } = useMonsterList();
	const [search, setSearch] = useState('');

	if (!isOpen) return null;

	const filtered = monsters.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

	return (
		<>
			<ModalBackdrop onClick={onClose} />
			<ModalContainer>
				<ModalHeader>
					<ModalTitle>Select Monster</ModalTitle>
					<ModalCloseButton onClick={onClose} type="button">
						✕
					</ModalCloseButton>
				</ModalHeader>
				<div style={{ padding: theme.spacing[4], paddingBottom: theme.spacing[2] }}>
					<SearchInput
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search monsters..."
						autoFocus
					/>
				</div>
				<ModalBody>
					{isLoading ? (
						<EmptyMessage>Loading...</EmptyMessage>
					) : filtered.length === 0 ? (
						<EmptyMessage>
							{monsters.length === 0 ? 'No monsters created yet' : 'No monsters match your search'}
						</EmptyMessage>
					) : (
						<MonsterListContainer>
							{filtered.map((monster) => {
								const cost =
									monster.level *
									(monster.tier === 'legendary' ? 4 : monster.tier === 'apex' ? 2 : 1);
								return (
									<MonsterListItem
										key={monster.id}
										onClick={() => {
											onSelect(monster);
											onClose();
										}}
										type="button"
									>
										<MonsterListItemInfo>
											<MonsterListItemName>{monster.name}</MonsterListItemName>
											<MonsterListItemMeta>
												Level {monster.level} {monster.tier} • Cost: {cost}
											</MonsterListItemMeta>
										</MonsterListItemInfo>
										<MonsterListItemCost>+{cost}</MonsterListItemCost>
									</MonsterListItem>
								);
							})}
						</MonsterListContainer>
					)}
				</ModalBody>
			</ModalContainer>
		</>
	);
};

export const MonsterSlots: React.FC<MonsterSlotsProps> = ({
	slots,
	onAddSlot,
	onRemoveSlot,
	onSetMonster,
	onClearMonster,
	onSetQuantity
}) => {
	const [pickerSlotId, setPickerSlotId] = useState<string | null>(null);
	const { monsters } = useMonsterList();

	const getMonsterById = (id: string) => monsters.find((m) => m.id === id);

	const handleSelectMonster = (monster: SavedMonster) => {
		if (pickerSlotId) {
			onSetMonster(pickerSlotId, monster.id, monster.level, monster.tier);
		}
	};

	return (
		<>
			<MonsterSlotList>
				{slots.map((slot) => {
					const monster = slot.monsterId ? getMonsterById(slot.monsterId) : null;

					if (!monster) {
						// Empty slot
						return (
							<MonsterSlotCard key={slot.id} $isEmpty>
								<EmptySlotContent>
									<Button $variant="primary" $size="sm" onClick={() => setPickerSlotId(slot.id)}>
										Select Monster
									</Button>
									<Button $variant="danger" $size="sm" onClick={() => onRemoveSlot(slot.id)}>
										Remove
									</Button>
								</EmptySlotContent>
							</MonsterSlotCard>
						);
					}

					// Filled slot
					return (
						<MonsterSlotCard key={slot.id}>
							<SlotMonsterInfo>
								<SlotMonsterName>{monster.name}</SlotMonsterName>
								<SlotMonsterMeta>
									Level {monster.level} {monster.tier} • Unit cost:{' '}
									{Math.round(slot.cost / slot.quantity)}
								</SlotMonsterMeta>
							</SlotMonsterInfo>

							<SlotQuantityControl>
								<QuantityButton
									onClick={() => onSetQuantity(slot.id, Math.max(1, slot.quantity - 1))}
									disabled={slot.quantity <= 1}
								>
									−
								</QuantityButton>
								<QuantityValue>{slot.quantity}</QuantityValue>
								<QuantityButton onClick={() => onSetQuantity(slot.id, slot.quantity + 1)}>
									+
								</QuantityButton>
							</SlotQuantityControl>

							<SlotCost>Cost: {slot.cost}</SlotCost>

							<SlotActions>
								<Button $variant="secondary" $size="sm" onClick={() => setPickerSlotId(slot.id)}>
									Change
								</Button>
								<Button $variant="danger" $size="sm" onClick={() => onClearMonster(slot.id)}>
									✕
								</Button>
							</SlotActions>
						</MonsterSlotCard>
					);
				})}
			</MonsterSlotList>

			<div style={{ marginTop: theme.spacing[4] }}>
				<Button $variant="secondary" $fullWidth onClick={onAddSlot}>
					+ Add Monster Slot
				</Button>
			</div>

			<MonsterPicker
				isOpen={pickerSlotId !== null}
				onClose={() => setPickerSlotId(null)}
				onSelect={handleSelectMonster}
			/>
		</>
	);
};

export default MonsterSlots;
