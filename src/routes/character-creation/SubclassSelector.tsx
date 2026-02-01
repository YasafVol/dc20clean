import React from 'react';
import type { Subclass, ClassFeature } from '../../lib/rulesdata/schemas/character.schema';
import {
	getSubclassByName,
	getFeatureChoiceKey
} from '../../lib/rulesdata/classes-data/classUtils';
import { barbarianClass } from '../../lib/rulesdata/classes-data/features/barbarian_features';
import { clericClass } from '../../lib/rulesdata/classes-data/features/cleric_features';
import { druidClass } from '../../lib/rulesdata/classes-data/features/druid_features';
import { wizardClass } from '../../lib/rulesdata/classes-data/features/wizard_features';
import { hunterClass } from '../../lib/rulesdata/classes-data/features/hunter_features';
import { championClass } from '../../lib/rulesdata/classes-data/features/champion_features';
import { rogueClass } from '../../lib/rulesdata/classes-data/features/rogue_features';
import { sorcererClass } from '../../lib/rulesdata/classes-data/features/sorcerer_features';
import { spellbladeClass } from '../../lib/rulesdata/classes-data/features/spellblade_features';
import { warlockClass } from '../../lib/rulesdata/classes-data/features/warlock_features';
import { bardClass } from '../../lib/rulesdata/classes-data/features/bard_features';
import { commanderClass } from '../../lib/rulesdata/classes-data/features/commander_features';
import { monkClass } from '../../lib/rulesdata/classes-data/features/monk_features';
import {
	FeatureCard,
	FeatureTitle,
	FeatureDescription,
	BenefitsList,
	BenefitItem,
	BenefitName,
	BenefitDescription
} from './styles/shared/FeatureDisplay.styles';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';

// Map of class IDs to their feature definitions
const CLASS_FEATURES_MAP: Record<string, any> = {
	barbarian: barbarianClass,
	cleric: clericClass,
	druid: druidClass,
	wizard: wizardClass,
	hunter: hunterClass,
	champion: championClass,
	rogue: rogueClass,
	sorcerer: sorcererClass,
	spellblade: spellbladeClass,
	warlock: warlockClass,
	bard: bardClass,
	commander: commanderClass,
	monk: monkClass
};

interface SubclassSelectorProps {
	classId: string;
	choiceLevel?: number;
	selectedSubclass?: string;
	selectedFeatureChoices?: Record<string, string[]>;
	onSelect: (subclass: string) => void;
	onChoiceChange?: (choiceKey: string, selections: string[]) => void;
}

export function SubclassSelector({
	classId,
	choiceLevel = 1,
	selectedSubclass,
	selectedFeatureChoices = {},
	onSelect,
	onChoiceChange
}: SubclassSelectorProps) {
	// Get full subclass data from class features
	const classFeatures = CLASS_FEATURES_MAP[classId];
	const subclasses: Subclass[] = classFeatures?.subclasses || [];

	if (subclasses.length === 0) {
		return null; // No subclasses available for this class
	}

	// Filter features by level gained
	const getFeaturesByLevel = (subclass: Subclass): ClassFeature[] => {
		return subclass.features?.filter((f) => f.levelGained <= choiceLevel) || [];
	};

	return (
		<div className="mt-8 rounded-lg border-2 border-amber-900/30 bg-gradient-to-br from-amber-900/10 to-amber-800/5 p-6">
			<h3 className="font-cinzel text-primary mb-2 text-2xl font-bold tracking-wide uppercase">
				Choose Your Subclass
				{choiceLevel && (
					<Badge variant="secondary" className="bg-primary/20 text-primary ml-2">
						Level {choiceLevel}
					</Badge>
				)}
			</h3>
			<p className="text-foreground/70 mb-6 leading-relaxed">
				Select a subclass to specialize your character's abilities and playstyle. This choice is
				permanent and shapes your character's identity.
			</p>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{subclasses.map((subclass) => {
					const isSelected = selectedSubclass === subclass.subclassName;
					const features = getFeaturesByLevel(subclass);

					return (
						<Card
							key={subclass.subclassName}
							onClick={() => onSelect(subclass.subclassName)}
							className={cn(
								'cursor-pointer border-2 transition-all hover:-translate-y-0.5 hover:shadow-lg',
								isSelected
									? 'border-primary from-primary/20 bg-gradient-to-br to-amber-900/15'
									: 'hover:border-primary/60 border-amber-900/40 bg-black/30'
							)}
						>
							<CardHeader className="pb-2">
								<div className="flex items-center gap-3">
									<div
										className={cn(
											'relative h-5 w-5 rounded-full border-2 transition-all',
											isSelected ? 'border-primary bg-primary' : 'border-white/30 bg-transparent'
										)}
									>
										{isSelected && (
											<div className="bg-background absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
										)}
									</div>
									<CardTitle className="font-cinzel text-primary text-lg font-bold tracking-wide uppercase">
										{subclass.subclassName}
									</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								{subclass.description && (
									<p className="text-foreground/70 text-sm leading-relaxed">{subclass.description}</p>
								)}

								{/* Show features for all subclasses */}
								{features.length > 0 && (
									<div className="border-primary/30 mt-4 border-t pt-4">
										{features.map((feature, idx) => (
											<div
												key={feature.id || `${feature.featureName}-${idx}`}
												className="border-primary/30 mb-3 rounded border bg-black/30 p-3 last:mb-0"
											>
												<h5 className="font-cinzel text-primary mb-1 text-sm font-bold tracking-wide uppercase">
													{feature.featureName}
												</h5>
												{feature.description && (
													<p className="text-foreground/80 mb-2 text-sm leading-relaxed">
														{feature.description}
													</p>
												)}

												{/* Show Benefits */}
												{feature.benefits && feature.benefits.length > 0 && (
													<div className="mt-2 border-t border-white/10 pt-2">
														{feature.benefits.map((benefit, benefitIdx) => (
															<div
																key={benefit.name || benefitIdx}
																className="border-primary/40 mb-2 rounded border-l-2 bg-amber-900/10 px-3 py-2 last:mb-0"
															>
																<h6 className="text-primary text-xs font-semibold">{benefit.name}</h6>
																{benefit.description && (
																	<p className="text-foreground/70 text-xs">{benefit.description}</p>
																)}
															</div>
														))}
													</div>
												)}

												{/* Show Choices only when this subclass is selected */}
												{isSelected &&
													feature.choices &&
													feature.choices.length > 0 &&
													onChoiceChange && (
														<div className="border-primary/30 mt-4 border-t pt-4">
															{feature.choices.map((choice) => {
																const choiceKey = getFeatureChoiceKey(
																	classId,
																	subclass.subclassName,
																	choice.id
																);
																const currentSelections = selectedFeatureChoices[choiceKey] || [];
																const isComplete = currentSelections.length === choice.count;

																const handleOptionClick = (optionName: string) => {
																	if (choice.count === 1) {
																		// Radio behavior: replace selection
																		onChoiceChange(choiceKey, [optionName]);
																	} else {
																		// Checkbox behavior: toggle in array
																		const newSelections = currentSelections.includes(optionName)
																			? currentSelections.filter((s) => s !== optionName)
																			: [...currentSelections, optionName].slice(0, choice.count);
																		onChoiceChange(choiceKey, newSelections);
																	}
																};

																return (
																	<div key={choice.id} className="mb-6 last:mb-0">
																		<div className="mb-2 flex items-center justify-between">
																			<h5 className="text-primary text-sm font-semibold tracking-wide uppercase">
																				{choice.prompt}
																			</h5>
																			<Badge
																				variant={isComplete ? 'default' : 'outline'}
																				className={cn(
																					isComplete
																						? 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30'
																						: 'text-amber-500 border-amber-500/50'
																				)}
																			>
																				{isComplete
																					? 'Complete'
																					: `${currentSelections.length}/${choice.count}`}
																			</Badge>
																		</div>
																		<p className="text-foreground/60 mb-3 text-xs">
																			Select {choice.count} option(s)
																		</p>

																		<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
																			{choice.options?.map((option) => {
																				const isOptionSelected = currentSelections.includes(
																					option.name
																				);

																				return (
																					<div
																						key={option.name}
																						onClick={(e) => {
																							e.stopPropagation(); // Prevent subclass card click
																							handleOptionClick(option.name);
																						}}
																						className={cn(
																							'relative cursor-pointer rounded-lg border-2 p-3 transition-all hover:-translate-y-0.5',
																							isOptionSelected
																								? 'border-primary bg-primary/10'
																								: 'border-primary/30 hover:border-primary/60'
																						)}
																					>
																						<h6 className="text-primary text-sm font-semibold">
																							{option.name}
																						</h6>
																						<p className="text-foreground/80 text-xs leading-relaxed">
																							{option.description}
																						</p>
																						{isOptionSelected && (
																							<span className="text-primary absolute top-2 right-2 text-lg">
																								✓
																							</span>
																						)}
																					</div>
																				);
																			})}
																		</div>
																	</div>
																);
															})}
														</div>
													)}
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
