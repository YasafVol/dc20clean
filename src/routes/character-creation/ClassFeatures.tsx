import { useMemo } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import {
	findClassByName,
	getLegacyChoiceId,
	getAvailableSpellSchools
} from '../../lib/rulesdata/loaders/class-features.loader';
import { SpellSchool } from '../../lib/rulesdata/schemas/spell.schema';
import { getDetailedClassFeatureDescription } from '../../lib/utils/classFeatureDescriptions';
import {
	calculateCharacterWithBreakdowns,
	convertToEnhancedBuildData
} from '../../lib/services/enhancedCharacterCalculator';
import { SubclassSelector } from './SubclassSelector';
import { cn } from '../../lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

function ClassFeatures() {
	const { state, dispatch } = useCharacter();

	// Helper function to render a single choice card
	const renderChoiceCard = (choice: any) => (
		<Card key={choice.id} className="mb-4 border-2">
			<CardHeader className="pb-2">
				<CardTitle className="text-primary text-xl font-bold">{choice.prompt}</CardTitle>
				{choice.maxSelections && (
					<p className="text-muted-foreground text-sm italic">
						Select up to {choice.maxSelections} options (
						{selectedFeatureChoices[choice.id]
							? Array.isArray(selectedFeatureChoices[choice.id])
								? (selectedFeatureChoices[choice.id] as unknown as string[]).length
								: 0
							: 0}
						/{choice.maxSelections} selected)
					</p>
				)}
			</CardHeader>
			<CardContent>
				{choice.type === 'select_one' && (
					<div className="flex flex-col gap-2">
						{choice.options.map((option: any) => {
							const detailedDescription = getDetailedClassFeatureDescription(choice.id, option.value);
							const isSelected = selectedFeatureChoices[choice.id] === option.value;
							return (
								<label
									key={option.value}
									className={cn(
										'hover:border-primary flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all',
										isSelected ? 'border-primary bg-primary/10' : 'border-border bg-card/50'
									)}
								>
									<input
										type="radio"
										name={choice.id}
										value={option.value}
										checked={isSelected}
										onChange={() => handleFeatureChoice(choice.id, option.value)}
										className="accent-primary mt-1 h-4 w-4 shrink-0 cursor-pointer"
									/>
									<div className="flex flex-col gap-1">
										<span className={cn('font-bold', isSelected ? 'text-primary' : 'text-foreground')}>
											{option.label}
										</span>
										{(option.description || detailedDescription) && (
											<span className="text-muted-foreground text-sm">
												{option.description || detailedDescription}
											</span>
										)}
									</div>
								</label>
							);
						})}
					</div>
				)}
				{choice.type === 'select_multiple' && (
					<div className="flex flex-col gap-2">
						{choice.options.map((option: any) => {
							// Handle arrays directly (no legacy JSON string support)
							const currentValues: string[] = selectedFeatureChoices[choice.id]
								? Array.isArray(selectedFeatureChoices[choice.id])
									? (selectedFeatureChoices[choice.id] as unknown as string[])
									: []
								: [];
							const isSelected = currentValues.includes(option.value);
							const canSelect = currentValues.length < (choice.maxSelections || 999);
							const isDisabled = !isSelected && !canSelect;
							const detailedDescription = getDetailedClassFeatureDescription(choice.id, option.value);

							return (
								<label
									key={option.value}
									className={cn(
										'hover:border-primary flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all',
										isSelected ? 'border-primary bg-primary/10' : 'border-border bg-card/50',
										isDisabled && 'cursor-not-allowed opacity-50 hover:border-border'
									)}
								>
									<input
										type="checkbox"
										name={choice.id}
										value={option.value}
										checked={isSelected}
										disabled={isDisabled}
										onChange={(e) =>
											handleMultipleFeatureChoice(choice.id, option.value, e.target.checked)
										}
										className="accent-primary mt-1 h-4 w-4 shrink-0 cursor-pointer"
									/>
									<div className="flex flex-col gap-1">
										<span className={cn('font-bold', isSelected ? 'text-primary' : 'text-foreground')}>
											{option.label}
										</span>
										{(option.description || detailedDescription) && (
											<span className="text-muted-foreground text-sm">
												{option.description || detailedDescription}
											</span>
										)}
									</div>
								</label>
							);
						})}
					</div>
				)}
			</CardContent>
		</Card>
	);

	const selectedClass = classesData.find(
		(c) => c.id.toLowerCase() === state.classId?.toLowerCase()
	);
	const selectedClassFeatures = selectedClass ? findClassByName(selectedClass.name) : null;
	// NEW: Use typed data instead of JSON parsing
	const selectedFeatureChoices: { [key: string]: string } = state.selectedFeatureChoices || {};

	// Calculate character to check for subclass choice requirement
	const calculationResult = useMemo(() => {
		if (!state.classId) return null;
		try {
			const enhancedData = convertToEnhancedBuildData(state);
			return calculateCharacterWithBreakdowns(enhancedData);
		} catch (error) {
			console.error('Failed to calculate character:', error);
			return null;
		}
	}, [state]);

	const needsSubclassChoice = calculationResult?.resolvedFeatures?.availableSubclassChoice;
	const subclassChoiceLevel = calculationResult?.resolvedFeatures?.subclassChoiceLevel;

	function handleFeatureChoice(choiceId: string, value: string) {
		const currentChoices: Record<string, any> = { ...selectedFeatureChoices };
		currentChoices[choiceId] = value;

		// If this is a legacy key, also store under canonical id
		try {
			if (selectedClassFeatures) {
				for (const feature of selectedClassFeatures.coreFeatures) {
					if (!feature.choices) continue;
					for (let c = 0; c < feature.choices.length; c++) {
						const legacyKey = getLegacyChoiceId(
							selectedClassFeatures.className,
							feature.featureName,
							c
						);
						if (legacyKey === choiceId) {
							const canonicalId = feature.choices[c].id as string | undefined;
							if (canonicalId) currentChoices[canonicalId] = value;
						}
					}
				}
			}
		} catch { }

		dispatch({
			type: 'SET_FEATURE_CHOICES',
			selectedFeatureChoices: currentChoices
		});
	}

	function handleMultipleFeatureChoice(choiceId: string, value: string, isSelected: boolean) {
		const currentChoices: Record<string, any> = { ...selectedFeatureChoices };
		// Handle arrays directly (no legacy JSON string support)
		const currentValues: string[] = Array.isArray(currentChoices[choiceId])
			? [...(currentChoices[choiceId] as any)]
			: [];

		if (isSelected) {
			// Add the value if not already present
			if (!currentValues.includes(value)) {
				currentValues.push(value);
			}
		} else {
			// Remove the value
			const index = currentValues.indexOf(value);
			if (index > -1) {
				currentValues.splice(index, 1);
			}
		}

		currentChoices[choiceId] = currentValues;

		// If this is a legacy key, also store under canonical id
		try {
			if (selectedClassFeatures) {
				for (const feature of selectedClassFeatures.coreFeatures) {
					if (!feature.choices) continue;
					for (let c = 0; c < feature.choices.length; c++) {
						const legacyKey = getLegacyChoiceId(
							selectedClassFeatures.className,
							feature.featureName,
							c
						);
						if (legacyKey === choiceId) {
							const canonicalId = feature.choices[c].id as string | undefined;
							if (canonicalId) currentChoices[canonicalId] = currentValues;
						}
					}
				}
			}
		} catch { }

		dispatch({
			type: 'SET_FEATURE_CHOICES',
			selectedFeatureChoices: currentChoices
		});
	}

	if (!selectedClass || !selectedClassFeatures) {
		return null; // Don't render anything when no class is selected
	}

	// Get features up to current level, grouped by level
	const featuresByLevel: Record<number, typeof selectedClassFeatures.coreFeatures> = {};
	for (let level = 1; level <= state.level; level++) {
		featuresByLevel[level] = selectedClassFeatures.coreFeatures.filter(
			(feature) => feature.levelGained === level
		);
	}

	// Get all feature choices from all features up to current level (excluding in-game tactical choices)
	const inGameChoices = ['Divine Blessing', "Commander's Call", 'Debilitating Strike', 'Bardic Performance'];
	const featureChoices: any[] = [];
	for (let level = 1; level <= state.level; level++) {
		const levelFeatures = featuresByLevel[level] || [];
		levelFeatures.forEach((feature) => {
			// Skip features that are in-game tactical choices, not character creation choices
			if (feature.choices && !inGameChoices.includes(feature.featureName)) {
				feature.choices.forEach((choice, choiceIndex) => {
					const choiceId = getLegacyChoiceId(
						selectedClassFeatures.className,
						feature.featureName,
						choiceIndex
					);
					featureChoices.push({
						id: choiceId,
						prompt: choice.prompt,
						type: choice.count > 1 ? 'select_multiple' : 'select_one',
						maxSelections: choice.count > 1 ? choice.count : undefined,
						level: level, // Track which level this choice belongs to
						options:
							choice.options?.map((option) => ({
								value: option.name,
								label: option.name,
								description: option.description
							})) || []
					});
				});
			}

			// NEW: Extract userChoice options from feature effects
			if (feature.effects) {
				feature.effects.forEach((effect, effectIndex) => {
					if (effect.userChoice) {
						const choiceId = `${selectedClassFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_effect_${effectIndex}_user_choice`;

						// Transform the userChoice options into the format expected by the UI
						const options =
							effect.userChoice.options?.map((optionValue: string) => {
								// Create a human-readable label from the option value
								const label = optionValue
									.replace(/_/g, ' ')
									.replace(/\b\w/g, (l: string) => l.toUpperCase());
								return {
									value: optionValue,
									label: label,
									description: `Choose ${label.toLowerCase()} for this effect.`
								};
							}) || [];

						featureChoices.push({
							id: choiceId,
							prompt: effect.userChoice.prompt,
							type: 'select_one',
							level: level, // Track which level this choice belongs to
							options: options
						});
					}
				});
			}

			// Also check userChoice options in choice option effects
			if (feature.choices && !inGameChoices.includes(feature.featureName)) {
				feature.choices.forEach((choice, choiceIndex) => {
					const parentChoiceId = getLegacyChoiceId(
						selectedClassFeatures.className,
						feature.featureName,
						choiceIndex
					);

					choice.options?.forEach((option, optionIndex) => {
						// Only process userChoice effects if this option is actually selected
						const isOptionSelected = (() => {
							const selectedValues = selectedFeatureChoices[parentChoiceId];
							if (choice.count > 1) {
								// Multiple selection choice - check if option is in array
								return Array.isArray(selectedValues) && selectedValues.includes(option.name);
							} else {
								// Single selection choice - check if option matches
								return selectedValues === option.name;
							}
						})();

						if (isOptionSelected && (option as any).effects) {
							(option as any).effects.forEach((effect: any, effectIndex: number) => {
								if (effect.userChoice) {
									const choiceId = `${selectedClassFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_choice_${choiceIndex}_option_${optionIndex}_effect_${effectIndex}_user_choice`;

									// Transform the userChoice options into the format expected by the UI
									const options =
										effect.userChoice.options?.map((optionValue: string) => {
											// Create a human-readable label from the option value
											const label = optionValue
												.replace(/_/g, ' ')
												.replace(/\b\w/g, (l: string) => l.toUpperCase());
											return {
												value: optionValue,
												label: label,
												description: `Choose ${label.toLowerCase()} for this effect.`
											};
										}) || [];

									featureChoices.push({
										id: choiceId,
										prompt: `${option.name}: ${effect.userChoice.prompt}`,
										type: 'select_one',
										level: level, // Track which level this choice belongs to
										options: options
									});
								}
							});
						}
					});
				});
			}
		});
	}

	// Add spell school choices if needed
	if (selectedClassFeatures.spellcastingPath?.spellList) {
		const spellList = selectedClassFeatures.spellcastingPath.spellList;

		if (spellList.type === 'all_schools' && spellList.schoolCount) {
			// Warlock-style: choose X schools from all available
			const availableSchools = Object.values(SpellSchool);
			featureChoices.push({
				id: `${selectedClassFeatures.className.toLowerCase()}_spell_schools`,
				prompt: `Choose ${spellList.schoolCount} Spell School${spellList.schoolCount > 1 ? 's' : ''}`,
				type: 'select_multiple',
				maxSelections: spellList.schoolCount,
				level: 1, // Spell schools are general level 1 choices
				options: availableSchools.map((school) => ({
					value: school,
					label: school,
					description: `Access to all spells from the ${school} school`
				}))
			});
		} else if (spellList.type === 'schools' && spellList.schoolCount && spellList.schoolCount > 0) {
			// Spellblade-style: choose X additional schools (already have specificSchools)
			const availableSchools = Object.values(SpellSchool);
			const alreadyHaveSchools = spellList.specificSchools || [];
			const choosableSchools = availableSchools.filter(
				(school) => !alreadyHaveSchools.includes(school)
			);

			featureChoices.push({
				id: `${selectedClassFeatures.className.toLowerCase()}_additional_spell_schools`,
				prompt: `Choose ${spellList.schoolCount} additional Spell School${spellList.schoolCount > 1 ? 's' : ''} (you already have: ${alreadyHaveSchools.join(', ')})`,
				type: spellList.schoolCount > 1 ? 'select_multiple' : 'select_one',
				maxSelections: spellList.schoolCount > 1 ? spellList.schoolCount : undefined,
				level: 1, // Additional spell schools are general level 1 choices
				options: choosableSchools.map((school) => ({
					value: school,
					label: school,
					description: `Access to all spells from the ${school} school`
				}))
			});
		}

		// Check for features at all levels that require spell school choices (like Wizard's Spell School Initiate)
		for (let level = 1; level <= state.level; level++) {
			const levelFeatures = featuresByLevel[level] || [];
			levelFeatures.forEach((feature) => {
				const description = feature.description.toLowerCase();
				// Only include features that are character creation choices, not in-game tactical choices
				const isCharacterCreationChoice =
					(description.includes('choose a spell school') ||
						description.includes('choose 1 spell school')) &&
					// Exclude in-game features like Arcane Sigil
					!description.includes('when you create') &&
					!description.includes('when you cast') &&
					!description.includes('you can spend') &&
					// Include features that are clearly character creation (like training/specialization)
					(description.includes('training') ||
						description.includes('specialize') ||
						description.includes('initiate') ||
						description.includes('you gain the following benefits'));

				if (isCharacterCreationChoice) {
					const choiceId = `${selectedClassFeatures.className.toLowerCase()}_${feature.featureName.toLowerCase().replace(/\s+/g, '_')}_school`;

					// Only add if not already added
					if (!featureChoices.some((choice) => choice.id === choiceId)) {
						const availableSchools = Object.values(SpellSchool);
						featureChoices.push({
							id: choiceId,
							prompt: `${feature.featureName}: Choose a Spell School`,
							type: 'select_one',
							level: level, // Track which level this choice belongs to
							options: availableSchools.map((school) => ({
								value: school,
								label: school,
								description: `Specialize in the ${school} school of magic`
							}))
						});
					}
				}
			});
		}
	}

	return (
		<div className="mt-8 rounded-xl border border-white/50 bg-transparent p-6">
			<h2 className="text-primary border-primary mb-4 border-b-2 pb-2 text-center text-xl font-bold tracking-wide">
				{selectedClass.name} Features
			</h2>

			{/* Starting Equipment Section */}
			{selectedClassFeatures.startingEquipment && (
				<section className="mt-4">
					<h3 className="text-primary border-primary mb-4 border-b-2 pb-2 text-2xl font-bold">
						Starting Equipment
					</h3>
					<div className="hover:border-primary mb-4 rounded-lg border border-white/50 bg-transparent p-6 transition-colors">
						<h4 className="text-primary mb-2 text-xl font-bold">Equipment Package</h4>
						<div className="border-t border-white/10 pt-3">
							{selectedClassFeatures.startingEquipment.weaponsOrShields && (
								<div className="border-primary/40 mb-2 rounded border-l-2 bg-amber-900/10 px-3 py-2">
									<h6 className="text-primary text-sm font-semibold">Weapons/Shields</h6>
									<p className="text-foreground/70 text-sm">
										{Array.isArray(selectedClassFeatures.startingEquipment.weaponsOrShields)
											? selectedClassFeatures.startingEquipment.weaponsOrShields.join(', ')
											: selectedClassFeatures.startingEquipment.weaponsOrShields}
									</p>
								</div>
							)}
							{selectedClassFeatures.startingEquipment.rangedWeapon && (
								<div className="border-primary/40 mb-2 rounded border-l-2 bg-amber-900/10 px-3 py-2">
									<h6 className="text-primary text-sm font-semibold">Ranged Weapon</h6>
									<p className="text-foreground/70 text-sm">
										{selectedClassFeatures.startingEquipment.rangedWeapon}
									</p>
								</div>
							)}
							{selectedClassFeatures.startingEquipment.armor && (
								<div className="border-primary/40 mb-2 rounded border-l-2 bg-amber-900/10 px-3 py-2">
									<h6 className="text-primary text-sm font-semibold">Armor</h6>
									<p className="text-foreground/70 text-sm">
										{selectedClassFeatures.startingEquipment.armor}
									</p>
								</div>
							)}
							{selectedClassFeatures.startingEquipment.packs && (
								<div className="border-primary/40 rounded border-l-2 bg-amber-900/10 px-3 py-2">
									<h6 className="text-primary text-sm font-semibold">Adventure Packs</h6>
									<p className="text-foreground/70 text-sm">
										{selectedClassFeatures.startingEquipment.packs}
									</p>
								</div>
							)}
						</div>
					</div>
				</section>
			)}

			{/* Martial Path Section */}
			{selectedClassFeatures.martialPath && (
				<section className="mt-4">
					<h3 className="text-primary border-primary mb-4 border-b-2 pb-2 text-2xl font-bold">
						Martial Training
					</h3>
					<div className="hover:border-primary mb-4 rounded-lg border border-white/50 bg-transparent p-6 transition-colors">
						<h4 className="text-primary mb-2 text-xl font-bold">Combat Proficiencies</h4>
						<div className="border-t border-white/10 pt-3">
							{selectedClassFeatures.martialPath.combatTraining?.weapons && (
								<div className="border-primary/40 mb-2 rounded border-l-2 bg-amber-900/10 px-3 py-2">
									<h6 className="text-primary text-sm font-semibold">Weapon Training</h6>
									<p className="text-foreground/70 text-sm">
										{Array.isArray(selectedClassFeatures.martialPath.combatTraining.weapons)
											? selectedClassFeatures.martialPath.combatTraining.weapons.join(', ')
											: selectedClassFeatures.martialPath.combatTraining.weapons}
									</p>
								</div>
							)}
							{selectedClassFeatures.martialPath.combatTraining?.armor && (
								<div className="border-primary/40 mb-2 rounded border-l-2 bg-amber-900/10 px-3 py-2">
									<h6 className="text-primary text-sm font-semibold">Armor Training</h6>
									<p className="text-foreground/70 text-sm">
										{Array.isArray(selectedClassFeatures.martialPath.combatTraining.armor)
											? selectedClassFeatures.martialPath.combatTraining.armor.join(', ')
											: selectedClassFeatures.martialPath.combatTraining.armor}
									</p>
								</div>
							)}
							{selectedClassFeatures.martialPath.combatTraining?.shields && (
								<div className="border-primary/40 rounded border-l-2 bg-amber-900/10 px-3 py-2">
									<h6 className="text-primary text-sm font-semibold">Shield Training</h6>
									<p className="text-foreground/70 text-sm">
										{Array.isArray(selectedClassFeatures.martialPath.combatTraining.shields)
											? selectedClassFeatures.martialPath.combatTraining.shields.join(', ')
											: selectedClassFeatures.martialPath.combatTraining.shields}
									</p>
								</div>
							)}
						</div>
					</div>

					{selectedClassFeatures.martialPath.staminaRegen && (
						<div className="hover:border-primary mb-4 rounded-lg border border-white/50 bg-transparent p-6 transition-colors">
							<h4 className="text-primary mb-2 text-xl font-bold">Stamina Regeneration</h4>
							<p className="text-foreground leading-relaxed">
								{selectedClassFeatures.martialPath.staminaRegen.description}
							</p>
							{selectedClassFeatures.martialPath.staminaRegen.conditions && (
								<div className="border-t border-white/10 pt-3">
									{selectedClassFeatures.martialPath.staminaRegen.conditions.map(
										(condition, index) => (
											<div
												key={index}
												className="border-primary/40 mb-2 rounded border-l-2 bg-amber-900/10 px-3 py-2 last:mb-0"
											>
												<p className="text-foreground/70 text-sm">• {condition}</p>
											</div>
										)
									)}
								</div>
							)}
						</div>
					)}
				</section>
			)}

			{/* Spellcasting Path Section */}
			{selectedClassFeatures.spellcastingPath && (
				<section className="mt-4">
					<h3 className="text-primary border-primary mb-4 border-b-2 pb-2 text-2xl font-bold">
						Spellcasting Training
					</h3>

					{/* Combat Training for Spellcasters */}
					{(selectedClassFeatures.spellcastingPath.combatTraining?.armor ||
						selectedClassFeatures.spellcastingPath.combatTraining?.shields) && (
							<div className="hover:border-primary mb-4 rounded-lg border border-white/50 bg-transparent p-6 transition-colors">
								<h4 className="text-primary mb-2 text-xl font-bold">Combat Proficiencies</h4>
								<div className="border-t border-white/10 pt-3">
									{selectedClassFeatures.spellcastingPath.combatTraining?.armor && (
										<div className="border-primary/40 mb-2 rounded border-l-2 bg-amber-900/10 px-3 py-2">
											<h6 className="text-primary text-sm font-semibold">Armor Training</h6>
											<p className="text-foreground/70 text-sm">
												{Array.isArray(selectedClassFeatures.spellcastingPath.combatTraining.armor)
													? selectedClassFeatures.spellcastingPath.combatTraining.armor.join(', ')
													: selectedClassFeatures.spellcastingPath.combatTraining.armor}
											</p>
										</div>
									)}
									{selectedClassFeatures.spellcastingPath.combatTraining?.shields && (
										<div className="border-primary/40 rounded border-l-2 bg-amber-900/10 px-3 py-2">
											<h6 className="text-primary text-sm font-semibold">Shield Training</h6>
											<p className="text-foreground/70 text-sm">
												{Array.isArray(selectedClassFeatures.spellcastingPath.combatTraining.shields)
													? selectedClassFeatures.spellcastingPath.combatTraining.shields.join(', ')
													: selectedClassFeatures.spellcastingPath.combatTraining.shields}
											</p>
										</div>
									)}
								</div>
							</div>
						)}

					{/* Spell List Information */}
					{selectedClassFeatures.spellcastingPath.spellList && (
						<div className="hover:border-primary mb-4 rounded-lg border border-white/50 bg-transparent p-6 transition-colors">
							<h4 className="text-primary mb-2 text-xl font-bold">Spell List Access</h4>
							<div className="border-t border-white/10 pt-3">
								{selectedClassFeatures.spellcastingPath.spellList.listName && (
									<div className="border-primary/40 mb-2 rounded border-l-2 bg-amber-900/10 px-3 py-2">
										<h6 className="text-primary text-sm font-semibold">Spell List</h6>
										<p className="text-foreground/70 text-sm">
											{selectedClassFeatures.spellcastingPath.spellList.listName}
										</p>
									</div>
								)}
								{(() => {
									const availableSchools = getAvailableSpellSchools(selectedClassFeatures);
									return availableSchools.length > 0 ? (
										<div className="border-primary/40 mb-2 rounded border-l-2 bg-amber-900/10 px-3 py-2">
											<h6 className="text-primary text-sm font-semibold">Available Schools</h6>
											<p className="text-foreground/70 text-sm">
												{selectedClassFeatures.spellcastingPath.spellList?.type === 'all_schools'
													? `Choose ${selectedClassFeatures.spellcastingPath.spellList.schoolCount || 'any'} from: ${availableSchools.join(', ')}`
													: availableSchools.join(', ')}
											</p>
										</div>
									) : null;
								})()}
								{selectedClassFeatures.spellcastingPath.spellList.spellTags && (
									<div className="border-primary/40 mb-2 rounded border-l-2 bg-amber-900/10 px-3 py-2">
										<h6 className="text-primary text-sm font-semibold">Available Spell Tags</h6>
										<p className="text-foreground/70 text-sm">
											{selectedClassFeatures.spellcastingPath.spellList.spellTags.join(', ')}
										</p>
									</div>
								)}
								{selectedClassFeatures.spellcastingPath.spellList.description && (
									<div className="border-primary/40 rounded border-l-2 bg-amber-900/10 px-3 py-2">
										<h6 className="text-primary text-sm font-semibold">Selection Method</h6>
										<p className="text-foreground/70 text-sm">
											{selectedClassFeatures.spellcastingPath.spellList.description}
										</p>
									</div>
								)}
							</div>
							{selectedClassFeatures.spellcastingPath.spellList.betaNote && (
								<p className="text-foreground mt-2 leading-relaxed">
									<strong>Beta Note:</strong>{' '}
									{selectedClassFeatures.spellcastingPath.spellList.betaNote}
								</p>
							)}
						</div>
					)}

					{/* Spellcasting Progression */}
					<div className="hover:border-primary mb-4 rounded-lg border border-white/50 bg-transparent p-6 transition-colors">
						<h4 className="text-primary mb-2 text-xl font-bold">Spellcasting Progression</h4>
						<div className="border-t border-white/10 pt-3">
							{selectedClassFeatures.spellcastingPath.spells && (
								<div className="border-primary/40 mb-2 rounded border-l-2 bg-amber-900/10 px-3 py-2">
									<h6 className="text-primary text-sm font-semibold">Spells Known</h6>
									<p className="text-foreground/70 text-sm">
										{selectedClassFeatures.spellcastingPath.spells.knownIncreasesBy}
									</p>
								</div>
							)}
							{selectedClassFeatures.spellcastingPath.manaPoints && (
								<div className="border-primary/40 rounded border-l-2 bg-amber-900/10 px-3 py-2">
									<h6 className="text-primary text-sm font-semibold">Mana Points</h6>
									<p className="text-foreground/70 text-sm">
										{selectedClassFeatures.spellcastingPath.manaPoints.maximumIncreasesBy}
									</p>
								</div>
							)}
						</div>
					</div>
				</section>
			)}

			{/* Class Features - Grouped by Level with Choices */}
			{Object.entries(featuresByLevel)
				.sort(([a], [b]) => Number(a) - Number(b))
				.filter(([, features]) => features.length > 0)
				.map(([levelStr, features]) => {
					const levelNum = Number(levelStr);
					const levelChoices = featureChoices.filter((choice) => choice.level === levelNum);

					return (
						<section key={levelStr} className="mt-4">
							<h3 className="text-primary border-primary mb-4 border-b-2 pb-2 text-2xl font-bold">
								Level {levelStr} Features
							</h3>
							{features.map((feature, index) => (
								<Card key={index} className="mb-4 border-2">
									<CardHeader className="pb-2">
										<CardTitle className="text-primary text-xl font-bold">{feature.featureName}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-foreground leading-relaxed">{feature.description}</p>
										{feature.benefits && (
											<div className="mt-4 space-y-2">
												{feature.benefits.map((benefit, benefitIndex) => (
													<div
														key={benefitIndex}
														className="bg-muted/50 border-l-primary rounded-r-md border-l-4 p-3"
													>
														<h6 className="text-primary text-sm font-bold">{benefit.name}</h6>
														<p className="text-muted-foreground text-sm">{benefit.description}</p>
													</div>
												))}
											</div>
										)}
									</CardContent>
								</Card>
							))}

							{/* Render choices for this level */}
							{levelChoices.length > 0 && levelChoices.map(renderChoiceCard)}
						</section>
					);
				})}

			{/* Subclass Selection (Level 3+) */}
			{needsSubclassChoice && state.classId && (
				<SubclassSelector
					classId={state.classId}
					choiceLevel={subclassChoiceLevel}
					selectedSubclass={state.selectedSubclass}
					selectedFeatureChoices={state.selectedFeatureChoices}
					onSelect={(subclass) => dispatch({ type: 'SET_SUBCLASS', subclass })}
					onChoiceChange={(choiceKey, selections) => {
						dispatch({
							type: 'SET_FEATURE_CHOICES',
							selectedFeatureChoices: {
								...state.selectedFeatureChoices,
								[choiceKey]: selections
							}
						});
					}}
				/>
			)}
		</div>
	);
}

export default ClassFeatures;
