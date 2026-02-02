/**
 * @file Spell Focus Builder Component
 */

import React, { useState, useMemo } from 'react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import {
	SPELL_FOCUS_PROPERTIES,
	PRESET_SPELL_FOCUSES,
	getSelectableSpellFocusProperties,
	getMaxPointsForSpellFocus
} from '../../../lib/rulesdata/equipment/options/spellFocusOptions';
import { validateSpellFocus } from '../../../lib/rulesdata/equipment/validation/equipmentValidator';
import { saveCustomSpellFocus } from '../../../lib/rulesdata/equipment/storage/equipmentStorage';
import type {
	CustomSpellFocus,
	SpellFocusHands
} from '../../../lib/rulesdata/equipment/schemas/spellFocusSchema';
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

interface SpellFocusBuilderProps {
	onBack: () => void;
}

const SpellFocusBuilder: React.FC<SpellFocusBuilderProps> = ({ onBack }) => {
	const [step, setStep] = useState(1);
	const [hands, setHands] = useState<SpellFocusHands | null>(null);
	const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
	const [name, setName] = useState('');
	const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

	const maxPoints = useMemo(() => getMaxPointsForSpellFocus(hands === 'two-handed'), [hands]);

	const pointsSpent = useMemo(() => {
		return selectedProperties.reduce((total, propId) => {
			const prop = SPELL_FOCUS_PROPERTIES.find((p) => p.id === propId);
			return total + (prop?.cost || 0);
		}, 0);
	}, [selectedProperties]);

	const availableProperties = useMemo(() => {
		return getSelectableSpellFocusProperties();
	}, []);

	const validation = useMemo(() => {
		if (!hands) return { isValid: false, errors: [], warnings: [] };
		const props =
			hands === 'two-handed' ? [...selectedProperties, 'two-handed-focus'] : selectedProperties;
		return validateSpellFocus({
			hands,
			properties: props,
			maxPoints
		});
	}, [hands, selectedProperties, maxPoints]);

	const toggleProperty = (propId: string) => {
		setSelectedProperties((prev) =>
			prev.includes(propId) ? prev.filter((p) => p !== propId) : [...prev, propId]
		);
		setSelectedPreset(null); // Clear preset when manually selecting
	};

	const loadPreset = (presetId: string) => {
		const preset = PRESET_SPELL_FOCUSES.find((p) => p.id === presetId);
		if (!preset) return;

		setSelectedPreset(presetId);
		setHands(preset.hands);
		setSelectedProperties(preset.properties.filter((p) => p !== 'two-handed-focus'));
		setName(preset.name);
		setStep(3); // Jump to summary
	};

	const buildSpellFocus = (): CustomSpellFocus => {
		const props =
			hands === 'two-handed' ? [...selectedProperties, 'two-handed-focus'] : selectedProperties;

		return {
			id: `custom-focus-${Date.now()}`,
			category: 'spellFocus',
			name: name || 'Custom Spell Focus',
			hands: hands!,
			properties: props,
			pointsSpent,
			maxPoints,
			spellCheckBonus: props.includes('channeling') ? 1 : 0,
			spellAttackBonus: props.includes('vicious') ? 1 : 0,
			spellDamageBonus: props.includes('powerful') ? 1 : 0,
			adBonus: props.includes('protective') ? 1 : 0,
			hasMdr: props.includes('warded'),
			longRangeBonus: props.includes('long-ranged-focus') ? 5 : 0,
			reachBonus: props.includes('reach-focus') ? 1 : 0,
			hasCloseQuarters: props.includes('close-quarters'),
			hasMuffled: props.includes('muffled'),
			hasReactive: props.includes('reactive'),
			isPreset: !!selectedPreset,
			presetOrigin: selectedPreset || undefined,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};
	};

	const handleSave = () => {
		const focus = buildSpellFocus();
		saveCustomSpellFocus(focus);
		onBack();
	};

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

			{/* Step 1: Choose Hands or Preset */}
			{step === 1 && (
				<>
					<SectionTitle>Step 1: Choose Type or Load Preset</SectionTitle>

					<div className="mb-6">
						<h4 className="mb-3 text-sm font-semibold text-gray-400">Start Fresh</h4>
						<OptionGrid>
							<OptionCard
								$selected={hands === 'one-handed'}
								onClick={() => {
									setHands('one-handed');
									setSelectedPreset(null);
								}}
							>
								<OptionTitle>One-Handed</OptionTitle>
								<OptionDescription>
									1 point to spend on properties. Leaves a hand free.
								</OptionDescription>
							</OptionCard>
							<OptionCard
								$selected={hands === 'two-handed'}
								onClick={() => {
									setHands('two-handed');
									setSelectedPreset(null);
								}}
							>
								<OptionTitle>Two-Handed</OptionTitle>
								<OptionDescription>
									2 points to spend (Two-Handed costs -1). More powerful but occupies both hands.
								</OptionDescription>
							</OptionCard>
						</OptionGrid>
					</div>

					<div className="mb-6">
						<h4 className="mb-3 text-sm font-semibold text-gray-400">Or Load a Preset</h4>
						<OptionGrid>
							{PRESET_SPELL_FOCUSES.map((preset) => (
								<OptionCard
									key={preset.id}
									$selected={selectedPreset === preset.id}
									onClick={() => loadPreset(preset.id)}
								>
									<OptionTitle>
										{preset.name}
										<PresetBadge>{preset.hands === 'two-handed' ? '2H' : '1H'}</PresetBadge>
									</OptionTitle>
									<div className="mt-2 flex flex-wrap gap-1">
										{preset.properties
											.filter((p) => p !== 'two-handed-focus')
											.map((propId) => {
												const prop = SPELL_FOCUS_PROPERTIES.find((p) => p.id === propId);
												return (
													<Badge key={propId} variant="secondary" className="text-xs">
														{prop?.name || propId}
													</Badge>
												);
											})}
									</div>
								</OptionCard>
							))}
						</OptionGrid>
					</div>

					<ActionButtons>
						<Button variant="outline" onClick={onBack}>
							Cancel
						</Button>
						<Button onClick={() => setStep(2)} disabled={!hands}>
							Next: Choose Properties
						</Button>
					</ActionButtons>
				</>
			)}

			{/* Step 2: Choose Properties */}
			{step === 2 && (
				<>
					<SectionTitle>Step 2: Choose Properties</SectionTitle>

					<div className="mb-4 flex items-center justify-between">
						<PointsDisplay>
							<PointsLabel>Points:</PointsLabel>
							<PointsValue $over={pointsSpent > maxPoints}>
								{pointsSpent} / {maxPoints}
							</PointsValue>
						</PointsDisplay>
						{hands === 'two-handed' && (
							<Badge variant="secondary">Two-Handed (-1 cost included)</Badge>
						)}
					</div>

					<OptionGrid>
						{availableProperties.map((property) => {
							const isSelected = selectedProperties.includes(property.id);
							const wouldExceedPoints = !isSelected && pointsSpent + property.cost > maxPoints;

							return (
								<OptionCard
									key={property.id}
									$selected={isSelected}
									onClick={() => toggleProperty(property.id)}
									disabled={wouldExceedPoints && !isSelected}
								>
									<div className="mb-1 flex items-center justify-between">
										<OptionTitle>{property.name}</OptionTitle>
										<PropertyTag $cost={property.cost}>
											{property.cost > 0 ? `+${property.cost}` : property.cost}
										</PropertyTag>
									</div>
									<OptionDescription>{property.description}</OptionDescription>
									{property.effect && (
										<div className="mt-2 text-xs text-amber-400">{property.effect}</div>
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
							placeholder="Enter a name for your spell focus..."
							className="w-full rounded-md border border-gray-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
						/>
					</div>

					<SummaryCard>
						<SummaryRow>
							<SummaryLabel>Type</SummaryLabel>
							<SummaryValue>{hands === 'two-handed' ? 'Two-Handed' : 'One-Handed'}</SummaryValue>
						</SummaryRow>
						<SummaryRow>
							<SummaryLabel>Points Spent</SummaryLabel>
							<SummaryValue>
								{pointsSpent} / {maxPoints}
							</SummaryValue>
						</SummaryRow>

						{selectedProperties.length > 0 && (
							<>
								<div className="mt-4 mb-2 text-sm font-semibold text-gray-400">Properties</div>
								{selectedProperties.map((propId) => {
									const prop = SPELL_FOCUS_PROPERTIES.find((p) => p.id === propId);
									return (
										<SummaryRow key={propId}>
											<SummaryLabel>{prop?.name}</SummaryLabel>
											<SummaryValue className="text-sm text-gray-400">
												{prop?.effect || prop?.description}
											</SummaryValue>
										</SummaryRow>
									);
								})}
							</>
						)}

						{/* Calculated Bonuses */}
						<div className="mt-4 mb-2 text-sm font-semibold text-gray-400">Final Stats</div>
						{selectedProperties.includes('channeling') && (
							<SummaryRow>
								<SummaryLabel>Spell Check Bonus</SummaryLabel>
								<SummaryValue>+1</SummaryValue>
							</SummaryRow>
						)}
						{selectedProperties.includes('vicious') && (
							<SummaryRow>
								<SummaryLabel>Spell Attack Bonus</SummaryLabel>
								<SummaryValue>+1</SummaryValue>
							</SummaryRow>
						)}
						{selectedProperties.includes('powerful') && (
							<SummaryRow>
								<SummaryLabel>Spell Damage Bonus</SummaryLabel>
								<SummaryValue>+1</SummaryValue>
							</SummaryRow>
						)}
						{selectedProperties.includes('protective') && (
							<SummaryRow>
								<SummaryLabel>AD Bonus</SummaryLabel>
								<SummaryValue>+1</SummaryValue>
							</SummaryRow>
						)}
						{selectedProperties.includes('warded') && (
							<SummaryRow>
								<SummaryLabel>MDR</SummaryLabel>
								<SummaryValue>Yes</SummaryValue>
							</SummaryRow>
						)}
					</SummaryCard>

					{selectedPreset && (
						<div className="mt-4 text-sm text-blue-400">
							Based on preset: {PRESET_SPELL_FOCUSES.find((p) => p.id === selectedPreset)?.name}
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
							Save Spell Focus
						</Button>
					</ActionButtons>
				</>
			)}
		</BuilderContainer>
	);
};

export default SpellFocusBuilder;
