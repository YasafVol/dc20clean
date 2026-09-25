/**
 * Monster Slots Component
 *
 * Display and manage monster slots in encounter.
 */

import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { useMonsterList } from '../../../../lib/hooks/useMonsters';
import type { EncounterMonsterSlot } from '../../../../lib/rulesdata/schemas/encounter.schema';
import type { SavedMonster, MonsterTier } from '../../../../lib/rulesdata/schemas/monster.schema';
import { getArtAsset } from '../../../../lib/assets/assetCatalog';
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
			{/* Backdrop */}
			<div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />
			{/* Modal */}
			<div className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-xl border border-[var(--dm-border)] bg-[var(--dm-surface)] md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[70vh] md:w-[500px] md:-translate-x-1/2 md:-translate-y-1/2">
				<div className="border-b border-[var(--dm-border)] p-4">
					<div className="mb-3 flex items-center justify-between">
						<h3 className="font-cinzel text-lg font-semibold text-amber-400">Select Monster</h3>
						<button
							onClick={onClose}
							className="text-[var(--dm-subtext)] hover:text-[var(--dm-text)]"
						>
							✕
						</button>
					</div>
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search monsters..."
						className="w-full rounded-lg border border-[var(--dm-border)] bg-[var(--dm-field)] px-3 py-2 text-sm text-[var(--dm-text)] focus:border-[var(--dm-accent)] focus:outline-none"
						autoFocus
					/>
				</div>
				<div className="flex-1 overflow-y-auto p-2">
					{isLoading ? (
						<div className="py-8 text-center text-[var(--dm-muted)]">Loading...</div>
					) : filtered.length === 0 ? (
						<div className="py-8 text-center text-[var(--dm-muted)]">
							{monsters.length === 0 ? 'No monsters created yet' : 'No monsters match your search'}
						</div>
					) : (
						<div className="space-y-1">
							{filtered.map((monster) => (
								<button
									key={monster.id}
									onClick={() => {
										onSelect(monster);
										onClose();
									}}
									className="flex w-full items-center justify-between rounded-lg bg-[var(--dm-raised)] p-3 text-left transition-colors hover:bg-[var(--dm-accent-soft)]"
								>
									<div className="flex items-center gap-3">
										{getArtAsset(monster.artAssetId) && (
											<img
												src={getArtAsset(monster.artAssetId)!.src}
												alt=""
												width={36}
												height={36}
												className="object-contain [image-rendering:pixelated]"
											/>
										)}
										<div>
											<div className="font-medium text-[var(--dm-text)]">{monster.name}</div>
											<div className="text-xs text-[var(--dm-muted)]">
												Level {monster.level} {monster.tier} • Cost:{' '}
												{monster.level *
													(monster.tier === 'legendary' ? 4 : monster.tier === 'apex' ? 2 : 1)}
											</div>
										</div>
									</div>
									<div className="font-bold text-amber-400">
										+
										{monster.level *
											(monster.tier === 'legendary' ? 4 : monster.tier === 'apex' ? 2 : 1)}
									</div>
								</button>
							))}
						</div>
					)}
				</div>
			</div>
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
									<Button variant="secondary" size="sm" onClick={() => setPickerSlotId(slot.id)}>
										Select Monster
									</Button>
									<Button
										variant="secondary"
										size="sm"
										onClick={() => onRemoveSlot(slot.id)}
										className="text-red-400 hover:text-red-300"
									>
										Remove
									</Button>
								</EmptySlotContent>
							</MonsterSlotCard>
						);
					}

					// Filled slot
					return (
						<MonsterSlotCard key={slot.id}>
							{getArtAsset(monster.artAssetId) && (
								<img
									src={getArtAsset(monster.artAssetId)!.src}
									alt=""
									width={42}
									height={42}
									style={{ imageRendering: 'pixelated', objectFit: 'contain', flexShrink: 0 }}
								/>
							)}
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
								<Button variant="secondary" size="sm" onClick={() => setPickerSlotId(slot.id)}>
									Change
								</Button>
								<Button
									variant="secondary"
									size="sm"
									onClick={() => onClearMonster(slot.id)}
									className="text-red-400 hover:text-red-300"
								>
									✕
								</Button>
							</SlotActions>
						</MonsterSlotCard>
					);
				})}
			</MonsterSlotList>

			<div className="mt-4">
				<Button variant="secondary" onClick={onAddSlot} className="w-full">
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
