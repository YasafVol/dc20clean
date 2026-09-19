/**
 * @file General Equipment Builder Component
 * Creates reusable, non-mechanical inventory items.
 */

import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { saveCustomGeneralEquipment } from '../../../lib/rulesdata/equipment/storage/equipmentStorage';
import type { CustomGeneralEquipment } from '../../../lib/rulesdata/equipment/schemas/generalEquipmentSchema';
import {
	ActionButtons,
	BuilderContainer,
	SectionTitle,
	SummaryCard,
	SummaryLabel,
	SummaryRow,
	SummaryValue
} from '../styles/CustomEquipment.styles';

interface GeneralEquipmentBuilderProps {
	onBack: () => void;
	initialEquipment?: CustomGeneralEquipment;
}

export default function GeneralEquipmentBuilder({
	onBack,
	initialEquipment
}: GeneralEquipmentBuilderProps) {
	const [name, setName] = useState(initialEquipment?.name ?? '');
	const [description, setDescription] = useState(initialEquipment?.description ?? '');
	const [cost, setCost] = useState(initialEquipment?.cost ?? '-');

	const handleSave = () => {
		const trimmedName = name.trim();
		if (!trimmedName) return;

		const now = new Date().toISOString();
		const item: CustomGeneralEquipment = {
			id: initialEquipment?.id ?? `custom-general-${Date.now()}`,
			category: 'general',
			name: trimmedName,
			description: description.trim() || undefined,
			cost: cost.trim() || '-',
			properties: [],
			pointsSpent: 0,
			maxPoints: 0,
			effects: [],
			createdAt: initialEquipment?.createdAt ?? now,
			updatedAt: now
		};

		saveCustomGeneralEquipment(item);
		onBack();
	};

	return (
		<BuilderContainer>
			<SectionTitle>
				{initialEquipment ? 'Edit General Equipment' : 'Create General Equipment'}
			</SectionTitle>

			<div className="mb-4">
				<label className="mb-2 block text-sm font-medium text-gray-400" htmlFor="general-item-name">
					Name
				</label>
				<input
					id="general-item-name"
					type="text"
					value={name}
					placeholder="Enter an item name..."
					className="w-full rounded-md border border-gray-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
					onChange={(event) => setName(event.target.value)}
				/>
			</div>

			<div className="mb-4">
				<label
					className="mb-2 block text-sm font-medium text-gray-400"
					htmlFor="general-item-description"
				>
					Description / Notes
				</label>
				<textarea
					id="general-item-description"
					value={description}
					placeholder="Describe the item..."
					className="min-h-28 w-full resize-y rounded-md border border-gray-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
					onChange={(event) => setDescription(event.target.value)}
				/>
			</div>

			<div className="mb-4">
				<label className="mb-2 block text-sm font-medium text-gray-400" htmlFor="general-item-cost">
					Cost
				</label>
				<input
					id="general-item-cost"
					type="text"
					value={cost}
					placeholder="e.g. 5g"
					className="w-full rounded-md border border-gray-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
					onChange={(event) => setCost(event.target.value)}
				/>
			</div>

			<SummaryCard>
				<SummaryRow>
					<SummaryLabel>Category</SummaryLabel>
					<SummaryValue>General Equipment</SummaryValue>
				</SummaryRow>
				<SummaryRow>
					<SummaryLabel>Mechanical effects</SummaryLabel>
					<SummaryValue>None</SummaryValue>
				</SummaryRow>
			</SummaryCard>

			<ActionButtons>
				<Button variant="outline" onClick={onBack}>
					Cancel
				</Button>
				<Button onClick={handleSave} disabled={!name.trim()}>
					{initialEquipment ? 'Save Changes' : 'Save Equipment'}
				</Button>
			</ActionButtons>
		</BuilderContainer>
	);
}
