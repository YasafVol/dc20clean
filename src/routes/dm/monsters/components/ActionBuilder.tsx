/**
 * Action Builder Component
 *
 * Manages monster actions with inline editing.
 */

import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { generateContentId } from '../../../../lib/utils/idGenerator';
import type { MonsterAction, ActionType, TargetDefense } from '../../../../lib/rulesdata/schemas/monster.schema';
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
	FormLabel,
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
	range: string;
	area: string;
	description: string;
}

const ACTION_TYPES: { value: ActionType; label: string }[] = [
	{ value: 'martial', label: 'Martial' },
	{ value: 'spell', label: 'Spell' },
	{ value: 'special', label: 'Special' },
];

const TARGET_DEFENSES: { value: TargetDefense; label: string }[] = [
	{ value: 'pd', label: 'Physical (PD)' },
	{ value: 'ad', label: 'Arcane (AD)' },
];

export const ActionBuilder: React.FC<ActionBuilderProps> = ({
	actions,
	baseDamage,
	onChange,
}) => {
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
			description: '',
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
			range: action.range?.toString() ?? '',
			area: action.area ?? '',
			description: action.description,
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
				range: editingAction.range ? parseInt(editingAction.range, 10) : undefined,
				area: editingAction.area || undefined,
				description: editingAction.description,
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

	const handleInputChange = (field: keyof EditingAction, value: string | number) => {
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
												className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
												placeholder="Action name"
											/>
										</FormGroup>
										<FormGroup $flex={1}>
											<FormLabel>AP Cost</FormLabel>
											<select
												value={editingAction.apCost}
												onChange={(e) => handleInputChange('apCost', parseInt(e.target.value, 10))}
												className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
											>
												{[1, 2, 3, 4].map((n) => (
													<option key={n} value={n}>{n} AP</option>
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
												className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
											>
												{ACTION_TYPES.map((t) => (
													<option key={t.value} value={t.value}>{t.label}</option>
												))}
											</select>
										</FormGroup>
										<FormGroup>
											<FormLabel>Target</FormLabel>
											<select
												value={editingAction.targetDefense}
												onChange={(e) => handleInputChange('targetDefense', e.target.value as TargetDefense)}
												className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
											>
												{TARGET_DEFENSES.map((t) => (
													<option key={t.value} value={t.value}>{t.label}</option>
												))}
											</select>
										</FormGroup>
									</FormRow>

									<FormRow>
										<FormGroup>
											<FormLabel>Damage</FormLabel>
											<input
												type="number"
												value={editingAction.damage}
												onChange={(e) => handleInputChange('damage', parseFloat(e.target.value) || 0)}
												className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
												min={0}
												step={0.5}
											/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Damage Type</FormLabel>
											<input
												type="text"
												value={editingAction.damageType}
												onChange={(e) => handleInputChange('damageType', e.target.value)}
												className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
												placeholder="slashing, fire, etc."
											/>
										</FormGroup>
									</FormRow>

									<FormRow>
										<FormGroup>
											<FormLabel>Range (spaces)</FormLabel>
											<input
												type="number"
												value={editingAction.range}
												onChange={(e) => handleInputChange('range', e.target.value)}
												className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
												placeholder="Melee"
												min={0}
											/>
										</FormGroup>
										<FormGroup>
											<FormLabel>Area</FormLabel>
											<input
												type="text"
												value={editingAction.area}
												onChange={(e) => handleInputChange('area', e.target.value)}
												className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
												placeholder="cone, sphere, etc."
											/>
										</FormGroup>
									</FormRow>

									<FormGroup>
										<FormLabel>Description</FormLabel>
										<textarea
											value={editingAction.description}
											onChange={(e) => handleInputChange('description', e.target.value)}
											className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
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
									<ActionStat style={{ color: isDamageHigh ? '#fbbf24' : isDamageLow ? '#60a5fa' : undefined }}>
										Damage: <span>{action.damage}{action.damageType ? ` ${action.damageType}` : ''}</span>
										{isDamageHigh && ' ⚠️'}
									</ActionStat>
									{action.range && (
										<ActionStat>
											Range: <span>{action.range}</span>
										</ActionStat>
									)}
									{action.area && (
										<ActionStat>
											Area: <span>{action.area}</span>
										</ActionStat>
									)}
								</ActionStats>
								{action.description && (
									<ActionDescription>{action.description}</ActionDescription>
								)}
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
