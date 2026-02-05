/**
 * Action Builder Component
 *
 * Manages monster actions with inline editing.
 */

import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { generateContentId } from '../../../../lib/utils/idGenerator';
import {
	ACTION_TRAITS,
	type MonsterAction,
	type ActionType,
	type TargetDefense,
	type ActionTrait
} from '../../../../lib/rulesdata/schemas/monster.schema';
import {
	SectionContent,
	ActionList,
	ActionCard,
	ActionHeader,
	ActionName,
	ActionApCost,
	ActionBody,
	ActionStats,
	ActionStat,
	ActionDescription,
	ActionFooter,
	FormRow,
	FormGroup,
	FormLabel
} from '../styles/MonsterStyles';

export interface ActionBuilderProps {
	actions: MonsterAction[];
	baseDamage: number;
	onChange: (actions: MonsterAction[]) => void;
}

interface EditingAction {
	id: string;
	name: string;
	apCost: number;
	type: ActionType;
	targetDefense: TargetDefense;
	damage: number;
	damageType: string;
	range: number;
	area: string;
	traits: ActionTrait[];
	description: string;
}

const ACTION_TYPES: { value: ActionType; label: string }[] = [
	{ value: 'martial', label: 'Martial' },
	{ value: 'spell', label: 'Spell' },
	{ value: 'special', label: 'Special' }
];

const TARGET_DEFENSES: { value: TargetDefense; label: string }[] = [
	{ value: 'pd', label: 'Precision (PD)' },
	{ value: 'ad', label: 'Area (AD)' }
];

// Stepper component for +/- controls
const NumberStepper: React.FC<{
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	label: string;
	showValue?: (v: number) => string;
}> = ({ value, onChange, min = 0, max = 100, step = 1, label, showValue }) => {
	const decrease = () => onChange(Math.max(min, value - step));
	const increase = () => onChange(Math.min(max, value + step));

	return (
		<div className="flex flex-col gap-1">
			<span className="text-xs text-zinc-400">{label}</span>
			<div className="flex items-center gap-1">
				<button
					type="button"
					onClick={decrease}
					disabled={value <= min}
					className="flex h-8 w-8 items-center justify-center rounded border border-purple-500/30 bg-black/40 text-white transition-colors hover:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-30"
				>
					−
				</button>
				<div className="flex h-8 w-16 items-center justify-center rounded border border-purple-500/30 bg-black/30 text-sm font-medium text-white">
					{showValue ? showValue(value) : value}
				</div>
				<button
					type="button"
					onClick={increase}
					disabled={value >= max}
					className="flex h-8 w-8 items-center justify-center rounded border border-purple-500/30 bg-black/40 text-white transition-colors hover:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-30"
				>
					+
				</button>
			</div>
		</div>
	);
};

// Trait selector component - opens upward to avoid cutoff
const TraitSelector: React.FC<{
	selected: ActionTrait[];
	onChange: (traits: ActionTrait[]) => void;
}> = ({ selected, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleTrait = (trait: ActionTrait) => {
		if (selected.includes(trait)) {
			onChange(selected.filter((t) => t !== trait));
		} else {
			onChange([...selected, trait]);
		}
	};

	return (
		<div className="relative">
			<span className="mb-1 block text-xs text-zinc-400">Traits</span>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full items-center justify-between rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-left text-sm text-white focus:border-purple-500 focus:outline-none"
			>
				<span className={selected.length ? 'text-white' : 'text-zinc-500'}>
					{selected.length ? `${selected.length} selected` : 'Select traits...'}
				</span>
				<span className="text-zinc-500">{isOpen ? '▲' : '▼'}</span>
			</button>

			{isOpen && (
				<>
					{/* Backdrop to close on click outside */}
					<div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
					{/* Dropdown opens UPWARD */}
					<div className="absolute right-0 bottom-full left-0 z-20 mb-1 rounded-lg border border-purple-500/40 bg-zinc-900 shadow-xl">
						<div className="grid max-h-64 grid-cols-3 gap-1 overflow-y-auto p-2">
							{ACTION_TRAITS.map((trait) => (
								<button
									key={trait}
									type="button"
									onClick={() => toggleTrait(trait)}
									className={`rounded px-2 py-1.5 text-left text-xs transition-colors ${
										selected.includes(trait)
											? 'border border-purple-500/50 bg-purple-500/30 text-purple-300'
											: 'bg-black/30 text-zinc-400 hover:bg-purple-500/10 hover:text-white'
									}`}
								>
									{trait}
								</button>
							))}
						</div>
						{selected.length > 0 && (
							<div className="border-t border-purple-500/20 p-2">
								<div className="flex flex-wrap gap-1">
									{selected.map((trait) => (
										<span
											key={trait}
											className="flex items-center gap-1 rounded bg-green-500/20 px-2 py-0.5 text-xs text-green-400"
										>
											{trait}
											<button
												type="button"
												onClick={() => toggleTrait(trait)}
												className="hover:text-red-400"
											>
												×
											</button>
										</span>
									))}
								</div>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export const ActionBuilder: React.FC<ActionBuilderProps> = ({ actions, baseDamage, onChange }) => {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editingAction, setEditingAction] = useState<EditingAction | null>(null);

	const handleAddAction = () => {
		const newAction: MonsterAction = {
			id: generateContentId('action'),
			name: 'New Action',
			apCost: 1,
			type: 'martial',
			targetDefense: 'pd',
			damage: baseDamage,
			traits: [],
			description: ''
		};
		onChange([...actions, newAction]);
		startEditing(newAction);
	};

	const startEditing = (action: MonsterAction) => {
		setEditingId(action.id);
		setEditingAction({
			id: action.id,
			name: action.name,
			apCost: action.apCost,
			type: action.type,
			targetDefense: action.targetDefense,
			damage: action.damage,
			damageType: action.damageType ?? '',
			range: action.range ?? 0,
			area: action.area ?? '',
			traits: action.traits ?? [],
			description: action.description
		});
	};

	const cancelEditing = () => {
		setEditingId(null);
		setEditingAction(null);
	};

	const saveEditing = () => {
		if (!editingAction) return;

		const updatedActions = actions.map((a) => {
			if (a.id !== editingAction.id) return a;
			return {
				id: editingAction.id,
				name: editingAction.name || 'Unnamed Action',
				apCost: editingAction.apCost,
				type: editingAction.type,
				targetDefense: editingAction.targetDefense,
				damage: editingAction.damage,
				damageType: editingAction.damageType || undefined,
				range: editingAction.range > 0 ? editingAction.range : undefined,
				area: editingAction.area || undefined,
				traits: editingAction.traits.length > 0 ? editingAction.traits : undefined,
				description: editingAction.description
			};
		});

		onChange(updatedActions);
		cancelEditing();
	};

	const handleDeleteAction = (id: string) => {
		if (actions.length <= 1) {
			alert('A monster must have at least one action.');
			return;
		}
		onChange(actions.filter((a) => a.id !== id));
		if (editingId === id) {
			cancelEditing();
		}
	};

	const handleInputChange = (
		field: keyof EditingAction,
		value: string | number | ActionTrait[]
	) => {
		if (!editingAction) return;
		setEditingAction({ ...editingAction, [field]: value });
	};

	return (
		<SectionContent>
			<ActionList>
				{actions.map((action) => {
					const isEditing = editingId === action.id;
					const isDamageHigh = action.damage > baseDamage * 1.5;
					const isDamageLow = action.damage < baseDamage * 0.5;

					if (isEditing && editingAction) {
						// Edit Mode
						return (
							<ActionCard key={action.id}>
								<ActionBody>
									<FormRow>
										<FormGroup $flex={2}>
											<FormLabel>Name</FormLabel>
											<input
												type="text"
												value={editingAction.name}
												onChange={(e) => handleInputChange('name', e.target.value)}
												className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
												placeholder="Action name"
											/>
										</FormGroup>
										<FormGroup $flex={1}>
											<FormLabel>AP Cost</FormLabel>
											<select
												value={editingAction.apCost}
												onChange={(e) => handleInputChange('apCost', parseInt(e.target.value, 10))}
												className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
											>
												{[1, 2, 3, 4].map((n) => (
													<option key={n} value={n}>
														{n} AP
													</option>
												))}
											</select>
										</FormGroup>
									</FormRow>

									<FormRow>
										<FormGroup>
											<FormLabel>Type</FormLabel>
											<select
												value={editingAction.type}
												onChange={(e) => handleInputChange('type', e.target.value as ActionType)}
												className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
											>
												{ACTION_TYPES.map((t) => (
													<option key={t.value} value={t.value}>
														{t.label}
													</option>
												))}
											</select>
										</FormGroup>
										<FormGroup>
											<FormLabel>Target</FormLabel>
											<select
												value={editingAction.targetDefense}
												onChange={(e) =>
													handleInputChange('targetDefense', e.target.value as TargetDefense)
												}
												className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
											>
												{TARGET_DEFENSES.map((t) => (
													<option key={t.value} value={t.value}>
														{t.label}
													</option>
												))}
											</select>
										</FormGroup>
									</FormRow>

									{/* Damage and Range with steppers */}
									<div className="mb-4 flex gap-4">
										<NumberStepper
											label="Damage"
											value={editingAction.damage}
											onChange={(v) => handleInputChange('damage', v)}
											min={0}
											max={50}
											step={0.5}
										/>
										<NumberStepper
											label="Range (spaces)"
											value={editingAction.range}
											onChange={(v) => handleInputChange('range', v)}
											min={0}
											max={30}
											step={1}
											showValue={(v) => (v === 0 ? 'Melee' : `${v}`)}
										/>
										<FormGroup $flex={1}>
											<FormLabel>Damage Type</FormLabel>
											<input
												type="text"
												value={editingAction.damageType}
												onChange={(e) => handleInputChange('damageType', e.target.value)}
												className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
												placeholder="slashing, fire..."
											/>
										</FormGroup>
									</div>

									<FormRow>
										<FormGroup>
											<FormLabel>Area</FormLabel>
											<input
												type="text"
												value={editingAction.area}
												onChange={(e) => handleInputChange('area', e.target.value)}
												className="w-full rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
												placeholder="cone, sphere, line..."
											/>
										</FormGroup>
										<FormGroup>
											<TraitSelector
												selected={editingAction.traits}
												onChange={(traits) => handleInputChange('traits', traits)}
											/>
										</FormGroup>
									</FormRow>

									<FormGroup>
										<FormLabel>Description</FormLabel>
										<textarea
											value={editingAction.description}
											onChange={(e) => handleInputChange('description', e.target.value)}
											className="w-full resize-none rounded-lg border border-purple-500/30 bg-black/30 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
											rows={2}
											placeholder="Describe the action..."
										/>
									</FormGroup>
								</ActionBody>
								<ActionFooter>
									<Button variant="secondary" size="sm" onClick={cancelEditing}>
										Cancel
									</Button>
									<Button variant="secondary" size="sm" onClick={saveEditing}>
										Save
									</Button>
								</ActionFooter>
							</ActionCard>
						);
					}

					// View Mode
					return (
						<ActionCard key={action.id}>
							<ActionHeader>
								<ActionName>{action.name}</ActionName>
								<ActionApCost>
									<span>⚡</span> {action.apCost} AP
								</ActionApCost>
							</ActionHeader>
							<ActionBody>
								<ActionStats>
									<ActionStat>
										Type: <span>{action.type}</span>
									</ActionStat>
									<ActionStat>
										Target: <span>{action.targetDefense.toUpperCase()}</span>
									</ActionStat>
									<ActionStat
										style={{
											color: isDamageHigh ? '#fbbf24' : isDamageLow ? '#60a5fa' : undefined
										}}
									>
										Damage:{' '}
										<span>
											{action.damage}
											{action.damageType ? ` ${action.damageType}` : ''}
										</span>
										{isDamageHigh && ' ⚠️'}
									</ActionStat>
									<ActionStat>
										Range: <span>{action.range ? action.range : 'Melee'}</span>
									</ActionStat>
									{action.area && (
										<ActionStat>
											Area: <span>{action.area}</span>
										</ActionStat>
									)}
								</ActionStats>
								{action.traits && action.traits.length > 0 && (
									<div className="mt-2 flex flex-wrap gap-1">
										{action.traits.map((trait) => (
											<span
												key={trait}
												className="rounded border border-purple-500/30 bg-purple-500/20 px-2 py-0.5 text-xs text-purple-300"
											>
												{trait}
											</span>
										))}
									</div>
								)}
								{action.description && <ActionDescription>{action.description}</ActionDescription>}
							</ActionBody>
							<ActionFooter>
								<Button variant="secondary" size="sm" onClick={() => startEditing(action)}>
									Edit
								</Button>
								<Button
									variant="secondary"
									size="sm"
									onClick={() => handleDeleteAction(action.id)}
									className="text-red-400 hover:text-red-300"
									disabled={actions.length <= 1}
								>
									Delete
								</Button>
							</ActionFooter>
						</ActionCard>
					);
				})}
			</ActionList>

			<div className="mt-4">
				<Button variant="secondary" onClick={handleAddAction} className="w-full">
					+ Add Action
				</Button>
			</div>
		</SectionContent>
	);
};

export default ActionBuilder;
