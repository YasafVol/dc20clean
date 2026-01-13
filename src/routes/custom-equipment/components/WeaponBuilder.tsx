/**
 * @file Weapon Builder Component
 */

import React, { useState, useMemo } from 'react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import {
	WEAPON_TYPES,
	WEAPON_STYLES,
	PRESET_WEAPONS,
	getStylesForWeaponType,
	getPropertiesForWeaponType,
	ALL_WEAPON_PROPERTIES
} from '../../../lib/rulesdata/equipment/options/weaponOptions';
import { PHYSICAL_DAMAGE_TYPES } from '../../../lib/rulesdata/equipment/schemas/baseEquipment';
import { validateWeapon } from '../../../lib/rulesdata/equipment/validation/equipmentValidator';
import { saveCustomWeapon } from '../../../lib/rulesdata/equipment/storage/equipmentStorage';
import type {
	CustomWeapon,
	WeaponType,
	WeaponStyle
} from '../../../lib/rulesdata/equipment/schemas/weaponSchema';
import type { PhysicalDamageType } from '../../../lib/rulesdata/equipment/schemas/baseEquipment';
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

interface WeaponBuilderProps {
	onBack: () => void;
}

const WeaponBuilder: React.FC<WeaponBuilderProps> = ({ onBack }) => {
	const [step, setStep] = useState(1);
	const [weaponType, setWeaponType] = useState<WeaponType | null>(null);
	const [style, setStyle] = useState<WeaponStyle | null>(null);
	const [secondaryStyle, setSecondaryStyle] = useState<WeaponStyle | null>(null);
	const [damageType, setDamageType] = useState<PhysicalDamageType | null>(null);
	const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
	const [name, setName] = useState('');
	const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

	const maxPoints = 2;

	const pointsSpent = useMemo(() => {
		return selectedProperties.reduce((total, propId) => {
			const prop = ALL_WEAPON_PROPERTIES.find((p) => p.id === propId);
			return total + (prop?.cost || 0);
		}, 0);
	}, [selectedProperties]);

	const availableStyles = useMemo(() => {
		if (!weaponType) return [];
		return getStylesForWeaponType(weaponType);
	}, [weaponType]);

	const availableProperties = useMemo(() => {
		if (!weaponType) return [];
		return getPropertiesForWeaponType(weaponType);
	}, [weaponType]);

	const hasMultiFaceted = selectedProperties.includes('multi-faceted');

	const validation = useMemo(() => {
		if (!weaponType || !style) return { isValid: false, errors: [], warnings: [] };
		return validateWeapon({
			weaponType,
			style,
			secondaryStyle: hasMultiFaceted ? secondaryStyle || undefined : undefined,
			damageType: damageType || undefined,
			properties: selectedProperties,
			maxPoints
		});
	}, [weaponType, style, secondaryStyle, damageType, selectedProperties, hasMultiFaceted]);

	const toggleProperty = (propId: string) => {
		if (selectedProperties.includes(propId)) {
			setSelectedProperties((prev) => prev.filter((p) => p !== propId));
			// If removing multi-faceted, clear secondary style
			if (propId === 'multi-faceted') {
				setSecondaryStyle(null);
			}
		} else {
			// Check requirements before adding
			const prop = availableProperties.find((p) => p.id === propId);
			if (prop?.requires) {
				const hasAllRequirements = prop.requires.every((req) => selectedProperties.includes(req));
				if (!hasAllRequirements) {
					return; // Don't add if requirements not met
				}
			}
			// Check exclusions
			if (prop?.excludes) {
				const hasExcluded = prop.excludes.some((exc) => selectedProperties.includes(exc));
				if (hasExcluded) {
					return; // Don't add if excluded property is selected
				}
			}
			setSelectedProperties((prev) => [...prev, propId]);
		}
		setSelectedPreset(null);
	};

	const loadPreset = (presetId: string) => {
		const preset = PRESET_WEAPONS.find((p) => p.id === presetId);
		if (!preset) return;

		setSelectedPreset(presetId);
		setWeaponType(preset.weaponType);
		setStyle(preset.styles[0]);
		setSecondaryStyle(preset.styles[1] || null);
		setDamageType(preset.damageType);
		setSelectedProperties(preset.properties);
		setName(preset.name);
		setStep(4); // Jump to summary
	};

	const calculateDamage = () => {
		let damage = 1; // Base damage
		if (selectedProperties.includes('heavy') || selectedProperties.includes('heavy-ranged')) {
			damage += 1;
		}
		if (selectedProperties.includes('reload')) {
			damage += 1;
		}
		return damage;
	};

	const calculateRange = () => {
		if (weaponType === 'ranged') {
			if (selectedProperties.includes('long-ranged')) {
				return '30/90';
			}
			return '15/45';
		}
		// Melee
		if (selectedProperties.includes('reach')) {
			return '2';
		}
		return '1';
	};

	const buildWeapon = (): CustomWeapon => {
		const styleData = WEAPON_STYLES.find((s) => s.id === style);

		return {
			id: `custom-weapon-${Date.now()}`,
			category: 'weapon',
			name: name || 'Custom Weapon',
			weaponType: weaponType!,
			style: style!,
			secondaryStyle: hasMultiFaceted ? secondaryStyle || undefined : undefined,
			damageType: damageType || styleData?.defaultDamageType || 'slashing',
			secondaryDamageType: hasMultiFaceted && secondaryStyle
				? WEAPON_STYLES.find((s) => s.id === secondaryStyle)?.defaultDamageType
				: undefined,
			baseDamage: 1,
			finalDamage: calculateDamage(),
			range: calculateRange(),
			properties: selectedProperties,
			pointsSpent,
			maxPoints,
			isPreset: !!selectedPreset,
			presetOrigin: selectedPreset || undefined,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};
	};

	const handleSave = () => {
		const weapon = buildWeapon();
		saveCustomWeapon(weapon);
		onBack();
	};

	const styleData = style ? WEAPON_STYLES.find((s) => s.id === style) : null;
	const secondaryStyleData = secondaryStyle ? WEAPON_STYLES.find((s) => s.id === secondaryStyle) : null;

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
				<Step $active={step === 3} $completed={step > 3}>
					3
				</Step>
				<StepConnector $active={step > 3} />
				<Step $active={step === 4}>4</Step>
			</StepIndicator>

			{/* Step 1: Choose Type or Preset */}
			{step === 1 && (
				<>
					<SectionTitle>Step 1: Choose Weapon Type or Load Preset</SectionTitle>

					<div className="mb-6">
						<h4 className="mb-3 text-sm font-semibold text-gray-400">Start Fresh</h4>
						<OptionGrid>
							{WEAPON_TYPES.map((type) => (
								<OptionCard
									key={type.id}
									$selected={weaponType === type.id}
									onClick={() => {
										setWeaponType(type.id);
										setStyle(null);
										setSecondaryStyle(null);
										setDamageType(null);
										setSelectedProperties(type.inherentProperties || []);
										setSelectedPreset(null);
									}}
								>
									<OptionTitle>{type.name}</OptionTitle>
									<OptionDescription>{type.description}</OptionDescription>
									{type.baseRange && (
										<div className="mt-2 text-xs text-amber-400">Range: {type.baseRange}</div>
									)}
								</OptionCard>
							))}
						</OptionGrid>
					</div>

					<div className="mb-6">
						<h4 className="mb-3 text-sm font-semibold text-gray-400">Or Load a Preset</h4>
						<div className="mb-2 flex gap-2">
							<Badge variant="outline">Melee One-Handed</Badge>
							<Badge variant="outline">Versatile</Badge>
							<Badge variant="outline">Two-Handed</Badge>
							<Badge variant="outline">Ranged</Badge>
						</div>
						<div className="max-h-96 overflow-y-auto">
							<OptionGrid>
								{PRESET_WEAPONS.slice(0, 12).map((preset) => (
									<OptionCard
										key={preset.id}
										$selected={selectedPreset === preset.id}
										onClick={() => loadPreset(preset.id)}
									>
										<OptionTitle>
											{preset.name}
											<PresetBadge>
												{preset.weaponType === 'ranged' ? 'Ranged' : preset.category}
											</PresetBadge>
										</OptionTitle>
										<div className="mt-1 text-xs text-gray-500">
											{preset.damage} {preset.damageType} • {preset.styles.join('/')}
										</div>
										<div className="mt-2 flex flex-wrap gap-1">
											{preset.properties.slice(0, 3).map((propId) => (
												<Badge key={propId} variant="secondary" className="text-xs">
													{propId}
												</Badge>
											))}
											{preset.properties.length > 3 && (
												<span className="text-xs text-gray-500">+{preset.properties.length - 3}</span>
											)}
										</div>
									</OptionCard>
								))}
							</OptionGrid>
						</div>
						{PRESET_WEAPONS.length > 12 && (
							<Button
								variant="ghost"
								className="mt-2 w-full text-gray-400"
								onClick={() => {
									// Could add a modal or expand functionality
								}}
							>
								View all {PRESET_WEAPONS.length} presets...
							</Button>
						)}
					</div>

					<ActionButtons>
						<Button variant="outline" onClick={onBack}>
							Cancel
						</Button>
						<Button onClick={() => setStep(2)} disabled={!weaponType}>
							Next: Choose Style
						</Button>
					</ActionButtons>
				</>
			)}

			{/* Step 2: Choose Style & Damage Type */}
			{step === 2 && (
				<>
					<SectionTitle>Step 2: Choose Weapon Style</SectionTitle>

					<p className="mb-4 text-sm text-gray-400">
						Each style determines your Weapon Enhancement (costs 1 AP or 1 SP to use).
					</p>

					<OptionGrid>
						{availableStyles.map((styleOption) => (
							<OptionCard
								key={styleOption.id}
								$selected={style === styleOption.id}
								onClick={() => {
									setStyle(styleOption.id);
									setDamageType(styleOption.defaultDamageType);
								}}
							>
								<OptionTitle>{styleOption.name}</OptionTitle>
								<div className="mb-2 text-xs text-amber-400">
									Default: {styleOption.defaultDamageType}
								</div>
								<div className="rounded bg-slate-800/50 p-2">
									<div className="text-sm font-semibold text-amber-400">
										{styleOption.enhancement.name}
									</div>
									<div className="text-xs text-gray-400">{styleOption.enhancement.effect}</div>
								</div>
								{styleOption.specialNotes && (
									<div className="mt-2 text-xs italic text-gray-500">{styleOption.specialNotes}</div>
								)}
							</OptionCard>
						))}
					</OptionGrid>

					{style && (
						<div className="mt-6">
							<h4 className="mb-3 text-sm font-semibold text-gray-400">
								Change Damage Type (Optional)
							</h4>
							<div className="flex gap-2">
								{PHYSICAL_DAMAGE_TYPES.map((dt) => (
									<Button
										key={dt}
										variant={damageType === dt ? 'default' : 'outline'}
										size="sm"
										onClick={() => setDamageType(dt)}
										className={damageType === dt ? 'bg-amber-500 text-slate-900' : ''}
									>
										{dt.charAt(0).toUpperCase() + dt.slice(1)}
									</Button>
								))}
							</div>
						</div>
					)}

					<ActionButtons>
						<Button variant="outline" onClick={() => setStep(1)}>
							Back
						</Button>
						<Button onClick={() => setStep(3)} disabled={!style}>
							Next: Choose Properties
						</Button>
					</ActionButtons>
				</>
			)}

			{/* Step 3: Choose Properties */}
			{step === 3 && (
				<>
					<SectionTitle>Step 3: Choose Properties</SectionTitle>

					<div className="mb-4 flex items-center justify-between">
						<PointsDisplay>
							<PointsLabel>Points:</PointsLabel>
							<PointsValue $over={pointsSpent > maxPoints}>
								{pointsSpent} / {maxPoints}
							</PointsValue>
						</PointsDisplay>
						{weaponType === 'ranged' && (
							<Badge variant="secondary">Ranged: Ammo & Two-Handed included</Badge>
						)}
					</div>

					<OptionGrid>
						{availableProperties.map((property) => {
							const isSelected = selectedProperties.includes(property.id);
							const wouldExceedPoints = !isSelected && pointsSpent + property.cost > maxPoints;

							// Check requirements
							const requirementsMet =
								!property.requires ||
								property.requires.every((req) => selectedProperties.includes(req));
							const hasExcluded =
								property.excludes &&
								property.excludes.some((exc) => selectedProperties.includes(exc));

							const isDisabled =
								(wouldExceedPoints && !isSelected) || (!isSelected && (!requirementsMet || hasExcluded));

							return (
								<OptionCard
									key={property.id}
									$selected={isSelected}
									onClick={() => !isDisabled && toggleProperty(property.id)}
									disabled={isDisabled}
								>
									<div className="mb-1 flex items-center justify-between">
										<OptionTitle>{property.name}</OptionTitle>
										<PropertyTag $cost={property.cost}>
											{property.cost > 0 ? `+${property.cost}` : property.cost === 0 ? 'Free' : property.cost}
										</PropertyTag>
									</div>
									<OptionDescription>{property.description}</OptionDescription>
									{property.effect && (
										<div className="mt-2 text-xs text-amber-400">{property.effect}</div>
									)}
									{property.requires && (
										<div className="mt-2 text-xs text-gray-500">
											Requires: {property.requires.join(', ')}
										</div>
									)}
									{property.excludes && (
										<div className="mt-2 text-xs text-red-400/70">
											Excludes: {property.excludes.join(', ')}
										</div>
									)}
								</OptionCard>
							);
						})}
					</OptionGrid>

					{/* Secondary Style Selection (if Multi-Faceted) */}
					{hasMultiFaceted && (
						<div className="mt-6">
							<h4 className="mb-3 text-sm font-semibold text-amber-400">
								Choose Secondary Style (Multi-Faceted)
							</h4>
							<OptionGrid>
								{availableStyles
									.filter((s) => s.id !== style)
									.map((styleOption) => (
										<OptionCard
											key={styleOption.id}
											$selected={secondaryStyle === styleOption.id}
											onClick={() => setSecondaryStyle(styleOption.id)}
										>
											<OptionTitle>{styleOption.name}</OptionTitle>
											<div className="text-xs text-gray-400">
												{styleOption.enhancement.name}: {styleOption.enhancement.effect}
											</div>
										</OptionCard>
									))}
							</OptionGrid>
						</div>
					)}

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
						<Button variant="outline" onClick={() => setStep(2)}>
							Back
						</Button>
						<Button onClick={() => setStep(4)} disabled={pointsSpent > maxPoints}>
							Next: Review & Save
						</Button>
					</ActionButtons>
				</>
			)}

			{/* Step 4: Summary & Save */}
			{step === 4 && (
				<>
					<SectionTitle>Step 4: Review & Save</SectionTitle>

					<div className="mb-4">
						<label className="mb-2 block text-sm font-medium text-gray-400">Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter a name for your weapon..."
							className="w-full rounded-md border border-gray-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
						/>
					</div>

					<SummaryCard>
						<SummaryRow>
							<SummaryLabel>Type</SummaryLabel>
							<SummaryValue>{weaponType === 'ranged' ? 'Ranged Weapon' : 'Melee Weapon'}</SummaryValue>
						</SummaryRow>
						<SummaryRow>
							<SummaryLabel>Style</SummaryLabel>
							<SummaryValue>
								{styleData?.name}
								{secondaryStyleData && ` / ${secondaryStyleData.name}`}
							</SummaryValue>
						</SummaryRow>
						<SummaryRow>
							<SummaryLabel>Damage Type</SummaryLabel>
							<SummaryValue className="capitalize">
								{damageType}
								{secondaryStyleData && ` / ${secondaryStyleData.defaultDamageType}`}
							</SummaryValue>
						</SummaryRow>
						<SummaryRow>
							<SummaryLabel>Points Spent</SummaryLabel>
							<SummaryValue>
								{pointsSpent} / {maxPoints}
							</SummaryValue>
						</SummaryRow>

						<div className="mb-2 mt-4 text-sm font-semibold text-gray-400">Final Stats</div>
						<SummaryRow>
							<SummaryLabel>Damage</SummaryLabel>
							<SummaryValue>{calculateDamage()}</SummaryValue>
						</SummaryRow>
						<SummaryRow>
							<SummaryLabel>Range</SummaryLabel>
							<SummaryValue>{calculateRange()} Space(s)</SummaryValue>
						</SummaryRow>

						{/* Enhancement */}
						{styleData && (
							<>
								<div className="mb-2 mt-4 text-sm font-semibold text-gray-400">Weapon Enhancement</div>
								<div className="rounded bg-slate-800/50 p-3">
									<div className="font-semibold text-amber-400">{styleData.enhancement.name}</div>
									<div className="text-sm text-gray-400">{styleData.enhancement.effect}</div>
									<div className="mt-1 text-xs text-gray-500">
										Cost: {styleData.enhancement.costToUse}
									</div>
								</div>
							</>
						)}

						{secondaryStyleData && (
							<div className="mt-2 rounded bg-slate-800/50 p-3">
								<div className="font-semibold text-amber-400">{secondaryStyleData.enhancement.name}</div>
								<div className="text-sm text-gray-400">{secondaryStyleData.enhancement.effect}</div>
							</div>
						)}

						{/* Properties */}
						{selectedProperties.length > 0 && (
							<>
								<div className="mb-2 mt-4 text-sm font-semibold text-gray-400">Properties</div>
								<div className="flex flex-wrap gap-2">
									{selectedProperties.map((propId) => {
										const prop = ALL_WEAPON_PROPERTIES.find((p) => p.id === propId);
										return (
											<Badge key={propId} variant="secondary">
												{prop?.name || propId}
											</Badge>
										);
									})}
								</div>
							</>
						)}
					</SummaryCard>

					{selectedPreset && (
						<div className="mt-4 text-sm text-blue-400">
							Based on preset: {PRESET_WEAPONS.find((p) => p.id === selectedPreset)?.name}
						</div>
					)}

					<ActionButtons>
						<Button variant="outline" onClick={() => setStep(3)}>
							Back
						</Button>
						<Button
							onClick={handleSave}
							disabled={!validation.isValid && !selectedPreset}
							className="bg-amber-500 text-slate-900 hover:bg-amber-400"
						>
							Save Weapon
						</Button>
					</ActionButtons>
				</>
			)}
		</BuilderContainer>
	);
};

export default WeaponBuilder;
