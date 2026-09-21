/**
 * @file General Equipment Builder Component
 * Creates reusable, non-mechanical inventory items.
 */

import { useState } from 'react';
import { Backpack } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { saveCustomGeneralEquipment } from '../../../lib/rulesdata/equipment/storage/equipmentStorage';
import type { CustomGeneralEquipment } from '../../../lib/rulesdata/equipment/schemas/generalEquipmentSchema';
import EquipageBuilderFrame from './EquipageBuilderFrame';
import { ActionButtons, BuilderContainer, SectionTitle } from '../styles/CustomEquipment.styles';

interface GeneralEquipmentBuilderProps {
	onBack: () => void;
	initialEquipment?: CustomGeneralEquipment;
}

export default function GeneralEquipmentBuilder({
	onBack,
	initialEquipment
}: GeneralEquipmentBuilderProps) {
	const [step, setStep] = useState(1);
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
			<EquipageBuilderFrame
				category="general equipment"
				title={initialEquipment ? 'Edit general equipment' : 'General equipment'}
				activeStepId={String(step)}
				onStepChange={(id) => setStep(Number(id))}
				steps={[
					{
						id: '1',
						title: 'Details',
						summary: name.trim() || 'Name, description, and cost',
						complete: Boolean(name.trim())
					},
					{
						id: '2',
						title: 'Review',
						summary: name.trim() || 'Check details and save',
						complete: Boolean(name.trim()),
						disabled: !name.trim()
					}
				]}
				summaryIcon={<Backpack />}
				summaryTitle={name.trim() || 'Unnamed item'}
				summarySubtitle="General equipment"
				summaryRows={[
					{ label: 'Cost', value: cost.trim() || '—' },
					{ label: 'Description', value: description.trim() || 'Not added' },
					{ label: 'Mechanical effects', value: 'None' }
				]}
			>
				{step === 1 && (
					<>
						<SectionTitle>Details</SectionTitle>
						<div className="mb-4">
							<label
								className="mb-2 block text-sm font-medium text-gray-400"
								htmlFor="general-item-name"
							>
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
							<label
								className="mb-2 block text-sm font-medium text-gray-400"
								htmlFor="general-item-cost"
							>
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
						<ActionButtons>
							<Button variant="outline" onClick={onBack}>
								Cancel
							</Button>
							<Button onClick={() => setStep(2)} disabled={!name.trim()}>
								Continue to review
							</Button>
						</ActionButtons>
					</>
				)}
				{step === 2 && (
					<>
						<SectionTitle>Review</SectionTitle>
						<p className="text-sm text-gray-400">Review the build summary, then save.</p>
						<ActionButtons>
							<Button variant="outline" onClick={() => setStep(1)}>
								Back
							</Button>
							<Button onClick={handleSave} disabled={!name.trim()}>
								{initialEquipment ? 'Save Changes' : 'Save Equipment'}
							</Button>
						</ActionButtons>
					</>
				)}
			</EquipageBuilderFrame>
		</BuilderContainer>
	);
}
