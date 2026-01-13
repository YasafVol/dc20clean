/**
 * @file Armor Builder Component
 */

import React, { useState, useMemo } from 'react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import {
	ARMOR_TYPES,
	PRESET_ARMOR,
	getPropertiesForArmorType
} from '../../../lib/rulesdata/equipment/options/armorOptions';
import { validateArmor } from '../../../lib/rulesdata/equipment/validation/equipmentValidator';
import { saveCustomArmor } from '../../../lib/rulesdata/equipment/storage/equipmentStorage';
import type { CustomArmor, ArmorType } from '../../../lib/rulesdata/equipment/schemas/armorSchema';
import {
	BuilderContainer,
	SectionTitle,
	OptionGrid,
	OptionCard,
	OptionTitle,
	OptionDescription,
	PropertyTag,
	PointsDisplay,
	PointsLabel,
	PointsValue,
	SummaryCard,
	SummaryRow,
	SummaryLabel,
	SummaryValue,
	ActionButtons,
	StepIndicator,
	Step,
	StepConnector,
	PresetBadge
} from '../styles/CustomEquipment.styles';

interface ArmorBuilderProps {
	onBack: () => void;
}

const ArmorBuilder: React.FC<ArmorBuilderProps> = ({ onBack }) => {
	const [step, setStep] = useState(1);
	const [armorType, setArmorType] = useState<ArmorType | null>(null);
	const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
	const [name, setName] = useState('');
	const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

	const maxPoints = 2;

	const pointsSpent = useMemo(() => {
		const availableProps = armorType ? getPropertiesForArmorType(armorType) : [];
		return selectedProperties.reduce((total, propId) => {
			const prop = availableProps.find((p) => p.id === propId);
			return total + (prop?.cost || 0);
		}, 0);
	}, [selectedProperties, armorType]);

	const availableProperties = useMemo(() => {
		if (!armorType) return [];
		return getPropertiesForArmorType(armorType);
	}, [armorType]);

	const validation = useMemo(() => {
		if (!armorType) return { isValid: false, errors: [], warnings: [] };
		return validateArmor({
			armorType,
			properties: selectedProperties,
			maxPoints
		});
	}, [armorType, selectedProperties]);

	// Calculate property counts for stacking
	const propertyCounts = useMemo(() => {
		const counts = new Map<string, number>();
		selectedProperties.forEach((propId) => {
			counts.set(propId, (counts.get(propId) || 0) + 1);
		});
		return counts;
	}, [selectedProperties]);

	const toggleProperty = (propId: string) => {
		const prop = availableProperties.find((p) => p.id === propId);
		const currentCount = propertyCounts.get(propId) || 0;
		const maxStacks = prop?.maxStacks || 1;

		if (selectedProperties.includes(propId)) {
			// If already at max, remove one instance
			const index = selectedProperties.indexOf(propId);
			setSelectedProperties((prev) => prev.filter((_, i) => i !== index));
		} else if (currentCount < maxStacks) {
			// Add if under max stacks
			setSelectedProperties((prev) => [...prev, propId]);
		}
		setSelectedPreset(null);
	};

	const addProperty = (propId: string) => {
		const prop = availableProperties.find((p) => p.id === propId);
		const currentCount = propertyCounts.get(propId) || 0;
		const maxStacks = prop?.maxStacks || 1;

		if (currentCount < maxStacks) {
			setSelectedProperties((prev) => [...prev, propId]);
			setSelectedPreset(null);
		}
	};

	const loadPreset = (presetId: string) => {
		const preset = PRESET_ARMOR.find((p) => p.id === presetId);
		if (!preset) return;

		setSelectedPreset(presetId);
		setArmorType(preset.armorType);
		// Convert preset stats to properties
		const props: string[] = [];
		const pdPropId = preset.armorType === 'light' ? 'pd-increase' : 'pd-increase-heavy';
		const adPropId = preset.armorType === 'light' ? 'ad-increase' : 'ad-increase-heavy';

		for (let i = 0; i < preset.pdBonus; i++) {
			props.push(pdPropId);
		}
		for (let i = 0; i < preset.adBonus; i++) {
			props.push(adPropId);
		}
		if (preset.hasPdr) {
			props.push('pdr');
		}

		setSelectedProperties(props);
		setName(preset.name);
		setStep(3);
	};

	const calculateStats = () => {
		const pdPropId = armorType === 'light' ? 'pd-increase' : 'pd-increase-heavy';
		const adPropId = armorType === 'light' ? 'ad-increase' : 'ad-increase-heavy';

		const pdBonus = propertyCounts.get(pdPropId) || 0;
		const adBonus = propertyCounts.get(adPropId) || 0;
		const hasPdr = selectedProperties.includes('pdr');
		const hasEdr =
			selectedProperties.includes('edr-light') || selectedProperties.includes('edr-heavy');
		const hasBulky = selectedProperties.includes('bulky');
		const hasRigid = selectedProperties.includes('rigid');

		return { pdBonus, adBonus, hasPdr, hasEdr, hasBulky, hasRigid };
	};

	const buildArmor = (): CustomArmor => {
		const stats = calculateStats();
		const armorTypeData = ARMOR_TYPES.find((t) => t.id === armorType);

		return {
			id: `custom-armor-${Date.now()}`,
			category: 'armor',
			name: name || 'Custom Armor',
			armorType: armorType!,
			properties: selectedProperties,
			pointsSpent,
			maxPoints,
			pdBonus: stats.pdBonus,
			adBonus: stats.adBonus,
			hasPdr: stats.hasPdr,
			hasEdr: stats.hasEdr,
			speedPenalty: armorType === 'heavy' ? -1 : 0,
			hasAgilityDisadvantage: armorType === 'heavy' || stats.hasRigid,
			isPreset: !!selectedPreset,
			presetOrigin: selectedPreset || undefined,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};
	};

	const handleSave = () => {
		const armor = buildArmor();
		saveCustomArmor(armor);
		onBack();
	};

	const stats = calculateStats();

	return (
		<BuilderContainer>
			{/* Step Indicator */}
			<StepIndicator>
				<Step $active={step === 1} $completed={step > 1}>
					1
				</Step>
				<StepConnector $active={step > 1} />
				<Step $active={step === 2} $completed={step > 2}>
					2
				</Step>
				<StepConnector $active={step > 2} />
				<Step $active={step === 3}>3</Step>
			</StepIndicator>

			{/* Step 1: Choose Type or Preset */}
			{step === 1 && (
				<>
					<SectionTitle>Step 1: Choose Armor Type or Load Preset</SectionTitle>

					<div className="mb-6">
						<h4 className="mb-3 text-sm font-semibold text-gray-400">Start Fresh</h4>
						<OptionGrid>
							{ARMOR_TYPES.map((type) => (
								<OptionCard
									key={type.id}
									$selected={armorType === type.id}
									onClick={() => {
										setArmorType(type.id);
										setSelectedProperties([]);
										setSelectedPreset(null);
									}}
								>
									<OptionTitle>{type.name}</OptionTitle>
									<OptionDescription>{type.description}</OptionDescription>
									<div className="mt-2 text-xs text-gray-500">
										Don/Doff: {type.donTime} • Metal: {type.isMetal ? 'Yes' : 'No'}
									</div>
								</OptionCard>
							))}
						</OptionGrid>
					</div>

					<div className="mb-6">
						<h4 className="mb-3 text-sm font-semibold text-gray-400">Or Load a Preset</h4>
						<OptionGrid>
							{PRESET_ARMOR.map((preset) => (
								<OptionCard
									key={preset.id}
									$selected={selectedPreset === preset.id}
									onClick={() => loadPreset(preset.id)}
								>
									<OptionTitle>
										{preset.name}
										<PresetBadge>{preset.armorType === 'heavy' ? 'Heavy' : 'Light'}</PresetBadge>
									</OptionTitle>
									<div className="mt-2 flex flex-wrap gap-2 text-xs">
										{preset.pdBonus > 0 && <Badge variant="secondary">PD +{preset.pdBonus}</Badge>}
										{preset.adBonus > 0 && <Badge variant="secondary">AD +{preset.adBonus}</Badge>}
										{preset.hasPdr && <Badge variant="secondary">PDR (Half)</Badge>}
									</div>
								</OptionCard>
							))}
						</OptionGrid>
					</div>

					<ActionButtons>
						<Button variant="outline" onClick={onBack}>
							Cancel
						</Button>
						<Button onClick={() => setStep(2)} disabled={!armorType}>
							Next: Choose Properties
						</Button>
					</ActionButtons>
				</>
			)}

			{/* Step 2: Choose Properties */}
			{step === 2 && (
				<>
					<SectionTitle>Step 2: Choose Properties ({armorType} Armor)</SectionTitle>

					<div className="mb-4 flex items-center justify-between">
						<PointsDisplay>
							<PointsLabel>Points:</PointsLabel>
							<PointsValue $over={pointsSpent > maxPoints}>
								{pointsSpent} / {maxPoints}
							</PointsValue>
						</PointsDisplay>
					</div>

					<OptionGrid>
						{availableProperties.map((property) => {
							const count = propertyCounts.get(property.id) || 0;
							const maxStacks = property.maxStacks || 1;
							const isSelected = count > 0;
							const canAddMore = count < maxStacks && pointsSpent + property.cost <= maxPoints;

							return (
								<OptionCard
									key={property.id}
									$selected={isSelected}
									onClick={() => (isSelected ? toggleProperty(property.id) : addProperty(property.id))}
									disabled={!canAddMore && !isSelected}
								>
									<div className="mb-1 flex items-center justify-between">
										<OptionTitle>
											{property.name}
											{count > 0 && maxStacks > 1 && (
												<span className="ml-2 text-amber-400">x{count}</span>
											)}
										</OptionTitle>
										<PropertyTag $cost={property.cost}>
											{property.cost > 0 ? `+${property.cost}` : property.cost}
										</PropertyTag>
									</div>
									<OptionDescription>{property.description}</OptionDescription>
									{maxStacks > 1 && (
										<div className="mt-2 text-xs text-gray-500">Can be taken up to {maxStacks}x</div>
									)}
									{isSelected && canAddMore && (
										<Button
											size="sm"
											variant="outline"
											className="mt-2"
											onClick={(e) => {
												e.stopPropagation();
												addProperty(property.id);
											}}
										>
											Add Another (+{property.cost})
										</Button>
									)}
								</OptionCard>
							);
						})}
					</OptionGrid>

					{!validation.isValid && validation.errors.length > 0 && (
						<div className="mt-4 rounded-md bg-red-500/10 p-3">
							{validation.errors.map((error, i) => (
								<p key={i} className="text-sm text-red-400">
									{error.message}
								</p>
							))}
						</div>
					)}

					<ActionButtons>
						<Button variant="outline" onClick={() => setStep(1)}>
							Back
						</Button>
						<Button onClick={() => setStep(3)} disabled={pointsSpent > maxPoints}>
							Next: Review & Save
						</Button>
					</ActionButtons>
				</>
			)}

			{/* Step 3: Summary & Save */}
			{step === 3 && (
				<>
					<SectionTitle>Step 3: Review & Save</SectionTitle>

					<div className="mb-4">
						<label className="mb-2 block text-sm font-medium text-gray-400">Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter a name for your armor..."
							className="w-full rounded-md border border-gray-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
						/>
					</div>

					<SummaryCard>
						<SummaryRow>
							<SummaryLabel>Type</SummaryLabel>
							<SummaryValue>{armorType === 'heavy' ? 'Heavy Armor' : 'Light Armor'}</SummaryValue>
						</SummaryRow>
						<SummaryRow>
							<SummaryLabel>Points Spent</SummaryLabel>
							<SummaryValue>
								{pointsSpent} / {maxPoints}
							</SummaryValue>
						</SummaryRow>

						<div className="mb-2 mt-4 text-sm font-semibold text-gray-400">Final Stats</div>
						<SummaryRow>
							<SummaryLabel>Physical Defense (PD)</SummaryLabel>
							<SummaryValue>+{stats.pdBonus}</SummaryValue>
						</SummaryRow>
						<SummaryRow>
							<SummaryLabel>Arcane Defense (AD)</SummaryLabel>
							<SummaryValue>+{stats.adBonus}</SummaryValue>
						</SummaryRow>
						{armorType === 'heavy' && (
							<>
								<SummaryRow>
									<SummaryLabel>Physical DR</SummaryLabel>
									<SummaryValue>{stats.hasPdr ? 'Half' : 'None'}</SummaryValue>
								</SummaryRow>
								<SummaryRow>
									<SummaryLabel>Speed Penalty</SummaryLabel>
									<SummaryValue>-1</SummaryValue>
								</SummaryRow>
								<SummaryRow>
									<SummaryLabel>Agility Checks</SummaryLabel>
									<SummaryValue>DisADV</SummaryValue>
								</SummaryRow>
							</>
						)}
						{stats.hasEdr && (
							<SummaryRow>
								<SummaryLabel>Elemental DR</SummaryLabel>
								<SummaryValue>Yes</SummaryValue>
							</SummaryRow>
						)}
					</SummaryCard>

					{selectedPreset && (
						<div className="mt-4 text-sm text-blue-400">
							Based on preset: {PRESET_ARMOR.find((p) => p.id === selectedPreset)?.name}
						</div>
					)}

					<ActionButtons>
						<Button variant="outline" onClick={() => setStep(2)}>
							Back
						</Button>
						<Button
							onClick={handleSave}
							disabled={!validation.isValid}
							className="bg-amber-500 text-slate-900 hover:bg-amber-400"
						>
							Save Armor
						</Button>
					</ActionButtons>
				</>
			)}
		</BuilderContainer>
	);
};

export default ArmorBuilder;
