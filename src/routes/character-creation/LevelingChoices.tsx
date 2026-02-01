import { useState, useEffect } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { resolveClassProgression } from '../../lib/rulesdata/classes-data/classProgressionResolver';
import { allTalents } from '../../lib/rulesdata/classes-data/talents/talent.loader';
import { generalTalents } from '../../lib/rulesdata/classes-data/talents/talents.data';
import { CHARACTER_PATHS } from '../../lib/rulesdata/progression/paths/paths.data';
import { MULTICLASS_TIERS, type MulticlassTier } from '../../lib/rulesdata/progression/multiclass';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { findClassByName } from '../../lib/rulesdata/loaders/class-features.loader';
import { getFeatureChoiceKey } from '../../lib/rulesdata/classes-data/classUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../../components/ui/select';
import { cn } from '../../lib/utils';
import { Check, Plus, Minus } from 'lucide-react';

type ActiveTab = 'talents' | 'pathPoints';

function LevelingChoices() {
	const { state, dispatch } = useCharacter();
	const [activeTab, setActiveTab] = useState<ActiveTab>('talents');
	const [selectedTalents, setSelectedTalents] = useState<Record<string, number>>(
		state.selectedTalents || {}
	);
	const [pathPoints, setPathPoints] = useState(
		state.pathPointAllocations || { martial: 0, spellcasting: 0 }
	);
	const [resolvedProgression, setResolvedProgression] = useState<any>(null);

	// Multiclass state - restore from context if available (UI3 fix)
	const [selectedMulticlassOption, setSelectedMulticlassOption] = useState<MulticlassTier | null>(
		state.selectedMulticlassOption || null
	);
	const [selectedMulticlassClass, setSelectedMulticlassClass] = useState<string>(
		state.selectedMulticlassClass || ''
	);
	const [selectedMulticlassFeature, setSelectedMulticlassFeature] = useState<string>(
		state.selectedMulticlassFeature || ''
	);

	// Cross-path spell list selection for martial classes (L12)
	const [selectedCrossPathSpellList, setSelectedCrossPathSpellList] = useState<string>(
		state.selectedCrossPathSpellList || ''
	);

	// Resolve progression when class/level changes
	useEffect(() => {
		if (state.classId && state.level) {
			try {
				const progression = resolveClassProgression(state.classId, state.level);
				setResolvedProgression(progression);
			} catch (error) {
				console.error('Failed to resolve progression:', error);
			}
		}
	}, [state.classId, state.level]);

	if (!state.classId || state.level === 1) {
		return (
			<div className="mx-auto max-w-4xl p-8 text-center">
				<p className="text-muted-foreground text-lg italic">
					Select a class and level greater than 1 to see leveling choices.
				</p>
			</div>
		);
	}

	if (!resolvedProgression) {
		return (
			<div className="mx-auto max-w-4xl p-8 text-center">
				<p className="text-muted-foreground text-lg italic">Loading leveling options...</p>
			</div>
		);
	}

	const budgets = resolvedProgression.budgets;
	const availableTalentPoints = budgets.totalTalents;
	const availablePathPoints = budgets.totalPathPoints;
	const usedPathPoints = (pathPoints.martial || 0) + (pathPoints.spellcasting || 0);

	// Count multiclass selection as a talent
	const multiclassTalentUsed = selectedMulticlassOption && selectedMulticlassFeature ? 1 : 0;
	// Count total talent selections from the count-based record
	const totalTalentsFromRecord = Object.values(selectedTalents).reduce(
		(sum, count) => sum + count,
		0
	);
	const totalTalentsUsed = totalTalentsFromRecord + multiclassTalentUsed;

	// General talents are now imported from canonical source (talents.data.ts)
	// This ensures DC20 v0.10 correct values: Ancestry +4, Attribute +2, Skill +4
	console.log('🎯 LevelingChoices: Using canonical generalTalents', {
		count: generalTalents.length,
		talents: generalTalents.map((t) => t.name)
	});

	// Filter class talents
	const classTalents = allTalents.filter(
		(t) =>
			t.category === 'Class' &&
			t.prerequisites?.classId === state.classId &&
			(!t.prerequisites?.level || state.level >= t.prerequisites.level)
	);

	const getOwnedClassFeatures = (targetClassId: string): number => {
		if (!state.classId || !state.level) return 0;

		let count = 0;

		// Count features from main class progression
		if (targetClassId === state.classId && resolvedProgression) {
			count += resolvedProgression.unlockedFeatureIds?.length || 0;
		}

		// Count multiclass-gained features (UI2 fix)
		// If we have a multiclass feature selected for this class, add it to the count
		if (
			state.selectedMulticlassClass === targetClassId &&
			state.selectedMulticlassFeature
		) {
			count += 1;
			console.log('🔢 Multiclass feature counted:', {
				targetClassId,
				feature: state.selectedMulticlassFeature,
				totalCount: count
			});
		}

		return count;
	};

	const getOwnedSubclassFeatures = (targetClassId: string): number => {
		if (!state.classId || !state.level) return 0;
		if (targetClassId === state.classId && state.selectedSubclass && resolvedProgression) {
			if (state.level >= 3) {
				const subclassLevels = [3, 6, 9, 12, 15, 18].filter((lvl) => lvl <= state.level);
				return subclassLevels.length;
			}
		}
		return 0;
	};

	const multiclassTiers = MULTICLASS_TIERS;

	const meetsMulticlassPrerequisites = (tier: (typeof multiclassTiers)[0]): boolean => {
		if (state.level < tier.levelRequired) return false;
		if (tier.minClassFeatures === 0 && tier.minSubclassFeatures === 0) return true;
		if (tier.minClassFeatures > 0) {
			const mainClassFeatures = getOwnedClassFeatures(state.classId || '');
			if (mainClassFeatures >= tier.minClassFeatures) return true;
			return false;
		}
		if (tier.minSubclassFeatures > 0) {
			const mainSubclassFeatures = getOwnedSubclassFeatures(state.classId || '');
			if (mainSubclassFeatures >= tier.minSubclassFeatures) return true;
			return false;
		}
		return true;
	};

	const getEligibleClasses = (): typeof classesData => {
		if (!selectedMulticlassOption) return classesData;
		const selectedTier = multiclassTiers.find((t) => t.id === selectedMulticlassOption);
		if (!selectedTier) return classesData;

		if (selectedTier.minClassFeatures === 0 && selectedTier.minSubclassFeatures === 0) {
			return classesData;
		}
		if (selectedTier.minClassFeatures > 0) {
			return classesData.filter((cls) => {
				const featuresOwned = getOwnedClassFeatures(cls.id);
				return featuresOwned >= selectedTier.minClassFeatures;
			});
		}
		if (selectedTier.minSubclassFeatures > 0) {
			return classesData.filter((cls) => {
				const subclassFeaturesOwned = getOwnedSubclassFeatures(cls.id);
				return subclassFeaturesOwned >= selectedTier.minSubclassFeatures;
			});
		}
		return classesData;
	};

	const handleMulticlassClassChange = (classId: string) => {
		setSelectedMulticlassClass(classId);
		setSelectedMulticlassFeature('');
	};

	const handleMulticlassFeatureChange = (featureId: string) => {
		setSelectedMulticlassFeature(featureId);
		dispatch({
			type: 'SET_MULTICLASS',
			option: selectedMulticlassOption,
			classId: selectedMulticlassClass,
			featureId
		});
	};

	const getMulticlassFeatures = () => {
		if (!selectedMulticlassClass || !selectedMulticlassOption) return [];
		const selectedClass = classesData.find((c) => c.id === selectedMulticlassClass);
		if (!selectedClass) return [];
		const classFeatures = findClassByName(selectedClass.name);
		if (!classFeatures) return [];
		const selectedTier = multiclassTiers.find((t) => t.id === selectedMulticlassOption);
		if (!selectedTier) return [];

		const targetLevel = selectedTier.targetLevel;
		const PATH_FEATURE_NAMES = ['Martial Path', 'Spellcaster Path', 'Path Points'];

		const coreFeatures = classFeatures.coreFeatures.filter(
			(f) =>
				f.levelGained === targetLevel &&
				!PATH_FEATURE_NAMES.some((pathName) => f.featureName.includes(pathName))
		);

		if (selectedTier.includeSubclass && selectedTier.subclassLevel !== undefined) {
			const shouldIncludeCore = !selectedTier.subclassOnly;
			const features = shouldIncludeCore ? [...coreFeatures] : [];

			if (classFeatures.subclasses) {
				for (const subclass of classFeatures.subclasses) {
					if (subclass.features) {
						const subclassFeatures = subclass.features.filter(
							(f) => f.levelGained === selectedTier.subclassLevel
						);
						for (const feature of subclassFeatures) {
							features.push({
								...feature,
								featureName: `${subclass.subclassName}: ${feature.featureName}`,
								description: `${subclass.description || ''}\n\n${feature.description}`.trim()
							});
						}
					}
				}
			}
			return features;
		}
		return coreFeatures;
	};

	const handleGeneralTalentIncrement = (talentId: string) => {
		if (totalTalentsUsed >= availableTalentPoints) return;
		const newTalents = { ...selectedTalents };
		newTalents[talentId] = (newTalents[talentId] || 0) + 1;
		setSelectedTalents(newTalents);
		dispatch({ type: 'SET_SELECTED_TALENTS', talents: newTalents });
	};

	const handleGeneralTalentDecrement = (talentId: string) => {
		const currentCount = selectedTalents[talentId] || 0;
		if (currentCount === 0) return;
		const newTalents = { ...selectedTalents };
		if (currentCount === 1) {
			delete newTalents[talentId];
		} else {
			newTalents[talentId] = currentCount - 1;
		}
		setSelectedTalents(newTalents);
		dispatch({ type: 'SET_SELECTED_TALENTS', talents: newTalents });
	};

	const handleClassTalentToggle = (talentId: string) => {
		const newTalents = { ...selectedTalents };
		if (newTalents[talentId]) {
			delete newTalents[talentId];
		} else if (totalTalentsUsed < availableTalentPoints) {
			newTalents[talentId] = 1;
		} else {
			return;
		}
		setSelectedTalents(newTalents);
		dispatch({ type: 'SET_SELECTED_TALENTS', talents: newTalents });
	};

	const handlePathPointAdd = (path: 'martial' | 'spellcasting') => {
		if (usedPathPoints < availablePathPoints) {
			const currentValue = pathPoints[path] || 0;
			const newPathPoints = { ...pathPoints, [path]: currentValue + 1 };
			setPathPoints(newPathPoints);
			dispatch({ type: 'SET_PATH_POINTS', pathPoints: newPathPoints });
		}
	};

	const handlePathPointRemove = (path: 'martial' | 'spellcasting') => {
		const currentValue = pathPoints[path] || 0;
		if (currentValue > 0) {
			const newPathPoints = { ...pathPoints, [path]: currentValue - 1 };
			setPathPoints(newPathPoints);
			dispatch({ type: 'SET_PATH_POINTS', pathPoints: newPathPoints });
		}
	};

	return (
		<div className="mx-auto max-w-7xl space-y-8">
			<div className="space-y-2 text-center">
				<h2 className="font-cinzel text-primary text-3xl font-bold">Leveling Choices</h2>
				<p className="text-muted-foreground">
					Level {state.level} {resolvedProgression.className} — Choose your talents and path points
				</p>
			</div>

			<Tabs
				value={activeTab}
				onValueChange={(v) => setActiveTab(v as ActiveTab)}
				className="w-full"
			>
				<TabsList className="border-border mx-auto mb-8 grid w-full max-w-md grid-cols-2 border bg-black/40">
					<TabsTrigger
						value="talents"
						className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-cinzel text-base"
					>
						Talents ({totalTalentsUsed} / {availableTalentPoints})
					</TabsTrigger>
					<TabsTrigger
						value="pathPoints"
						className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-cinzel text-base"
					>
						Path Points ({usedPathPoints} / {availablePathPoints})
					</TabsTrigger>
				</TabsList>

				<TabsContent value="talents" className="space-y-10">
					{/* General Talents */}
					<section>
						<h3 className="font-cinzel text-primary border-border mb-4 border-b pb-2 text-xl">
							General Talents
						</h3>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							{generalTalents.map((talent) => {
								const count = selectedTalents[talent.id] || 0;
								return (
									<Card
										key={talent.id}
										className={cn(
											'border-l-4 transition-all',
											count > 0
												? 'border-l-primary bg-primary/5'
												: 'bg-card/60 border-l-transparent'
										)}
									>
										<CardHeader className="pb-2">
											<div className="flex items-start justify-between gap-2">
												<CardTitle className="text-foreground text-lg">{talent.name}</CardTitle>
												{count > 0 && (
													<Badge
														variant="secondary"
														className="bg-primary text-primary-foreground text-xs font-bold"
													>
														x{count}
													</Badge>
												)}
											</div>
											<p className="text-muted-foreground text-xs italic">{talent.category}</p>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground mb-4 min-h-[3rem] text-sm">
												{talent.description}
											</p>
											<div className="flex gap-2">
												<Button
													variant="outline"
													size="icon"
													onClick={() => handleGeneralTalentDecrement(talent.id)}
													disabled={count === 0}
													className="h-8 w-8"
												>
													<Minus className="h-4 w-4" />
												</Button>
												<Button
													variant="outline"
													size="icon"
													onClick={() => handleGeneralTalentIncrement(talent.id)}
													disabled={totalTalentsUsed >= availableTalentPoints}
													className="ml-auto h-8 w-8"
												>
													<Plus className="h-4 w-4" />
												</Button>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</section>

					{/* Class Talents */}
					{classTalents.length > 0 && (
						<section>
							<h3 className="font-cinzel text-primary border-border mb-4 border-b pb-2 text-xl">
								Class Talents
							</h3>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
								{classTalents.map((talent) => {
									const isSelected = !!selectedTalents[talent.id];
									const isDisabled = !isSelected && totalTalentsUsed >= availableTalentPoints;

									return (
										<Card
											key={talent.id}
											className={cn(
												'hover:border-primary/50 cursor-pointer border-l-4 transition-all',
												isSelected
													? 'border-l-primary bg-primary/10 ring-primary/30 ring-1'
													: 'bg-card/60 hover:bg-card border-l-transparent',
												isDisabled && 'cursor-not-allowed opacity-50'
											)}
											onClick={() => !isDisabled && handleClassTalentToggle(talent.id)}
										>
											<CardHeader className="pb-2">
												<div className="flex items-start justify-between gap-2">
													<CardTitle
														className={cn(
															'text-lg',
															isSelected ? 'text-primary' : 'text-foreground'
														)}
													>
														{talent.name}
													</CardTitle>
													{isSelected && (
														<Badge
															variant="default"
															className="bg-primary/20 text-primary hover:bg-primary/20"
														>
															<Check className="mr-1 h-3 w-3" /> Selected
														</Badge>
													)}
												</div>
												<p className="text-muted-foreground text-xs italic">
													{talent.category} - {resolvedProgression.className}
												</p>
											</CardHeader>
											<CardContent>
												<p className="text-muted-foreground text-sm">{talent.description}</p>
											</CardContent>
										</Card>
									);
								})}
							</div>
						</section>
					)}

					{/* Multiclass Talents */}
					<section>
						<h3 className="font-cinzel text-primary border-border mb-4 border-b pb-2 text-xl">
							Multiclass Talents
						</h3>
						<div className="space-y-4">
							{multiclassTiers
								.filter(
									(tier) => state.level >= tier.levelRequired && meetsMulticlassPrerequisites(tier)
								)
								.map((tier) => {
									const isSelected = selectedMulticlassOption === tier.id;
									const isDisabled = totalTalentsUsed >= availableTalentPoints && !isSelected;

									return (
										<Card
											key={tier.id}
											className={cn(
												'border-2 transition-all',
												isSelected
													? 'border-primary bg-primary/5'
													: 'bg-card/40 hover:bg-card/60 hover:border-border border-transparent',
												isDisabled && 'cursor-not-allowed opacity-50'
											)}
										>
											<div
												className="cursor-pointer p-6"
												onClick={() => {
													if (isSelected) {
														setSelectedMulticlassOption(null);
														setSelectedMulticlassClass('');
														setSelectedMulticlassFeature('');
													} else if (!isDisabled) {
														setSelectedMulticlassOption(tier.id);
														setSelectedMulticlassClass('');
														setSelectedMulticlassFeature('');
													}
												}}
											>
												<h4
													className={cn(
														'font-cinzel mb-1 text-lg font-bold',
														isSelected ? 'text-primary' : 'text-foreground'
													)}
												>
													{tier.name}
												</h4>
												<p className="text-muted-foreground text-sm">{tier.description}</p>
											</div>

											{isSelected && (
												<div className="border-border/50 mt-2 space-y-4 border-t px-6 pt-0 pb-6">
													<div className="pt-4">
														<label className="text-primary mb-2 block text-sm font-medium">
															Select Class:
														</label>
														<Select
															value={selectedMulticlassClass}
															onValueChange={handleMulticlassClassChange}
														>
															<SelectTrigger className="bg-background border-border w-full md:w-1/2">
																<SelectValue placeholder="Choose a class..." />
															</SelectTrigger>
															<SelectContent>
																{getEligibleClasses().map((cls) => (
																	<SelectItem key={cls.id} value={cls.id}>
																		{cls.name}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
													</div>

													{selectedMulticlassClass && (
														<div className="space-y-3">
															<label className="text-primary block text-sm font-medium">
																Select Feature:
															</label>
															{getMulticlassFeatures().length > 0 ? (
																<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
																	{getMulticlassFeatures().map((feature) => (
																		<div
																			key={feature.featureName}
																			className={cn(
																				'cursor-pointer rounded-md border p-3 transition-colors',
																				selectedMulticlassFeature === feature.featureName
																					? 'bg-primary/20 border-primary text-foreground'
																					: 'bg-background/50 border-border hover:border-primary/50'
																			)}
																			onClick={() =>
																				handleMulticlassFeatureChange(feature.featureName)
																			}
																		>
																			<div className="mb-1 flex items-center justify-between">
																				<span className="text-primary text-sm font-bold">
																					{feature.featureName}
																				</span>
																				{selectedMulticlassFeature === feature.featureName && (
																					<Check className="text-primary h-4 w-4" />
																				)}
																			</div>
																			<div className="text-muted-foreground mb-1 text-xs">
																				Level {feature.levelGained}
																			</div>
																			<p className="text-muted-foreground line-clamp-3 text-xs">
																				{feature.description}
																			</p>
																		</div>
																	))}
																</div>
															) : (
																<p className="text-muted-foreground text-sm italic">
																	No features available at this level for the selected class.
																</p>
															)}

															{/* Render choices for selected multiclass feature */}
															{(() => {
																const selectedFeature = getMulticlassFeatures().find(
																	(f) => f.featureName === selectedMulticlassFeature
																);
																if (!selectedFeature?.choices?.length) return null;

																return (
																	<div className="border-primary/30 mt-4 space-y-4 border-t pt-4">
																		<h4 className="text-primary text-sm font-bold">
																			Feature Choices
																		</h4>
																		{selectedFeature.choices.map((choice) => {
																			const choiceKey = getFeatureChoiceKey(
																				selectedMulticlassClass,
																				'multiclass',
																				choice.id
																			);
																			const currentSelections =
																				state.selectedFeatureChoices?.[choiceKey] || [];
																			const isComplete =
																				currentSelections.length >= choice.count;

																			const handleOptionClick = (optionName: string) => {
																				const newChoices = {
																					...state.selectedFeatureChoices
																				};
																				if (choice.count === 1) {
																					// Radio behavior
																					newChoices[choiceKey] = [optionName];
																				} else {
																					// Checkbox behavior
																					const current = newChoices[choiceKey] || [];
																					if (current.includes(optionName)) {
																						newChoices[choiceKey] = current.filter(
																							(s: string) => s !== optionName
																						);
																					} else if (current.length < choice.count) {
																						newChoices[choiceKey] = [
																							...current,
																							optionName
																						];
																					}
																				}
																				dispatch({
																					type: 'SET_FEATURE_CHOICES',
																					selectedFeatureChoices: newChoices
																				});
																			};

																			return (
																				<div key={choice.id} className="space-y-2">
																					<div className="flex items-center justify-between">
																						<span className="text-primary text-sm font-medium">
																							{choice.prompt}
																						</span>
																						<Badge
																							variant={
																								isComplete ? 'default' : 'outline'
																							}
																							className={cn(
																								isComplete
																									? 'bg-emerald-500/20 text-emerald-500'
																									: 'border-amber-500/50 text-amber-500'
																							)}
																						>
																							{isComplete
																								? 'Complete'
																								: `${currentSelections.length}/${choice.count}`}
																						</Badge>
																					</div>
																					<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
																						{choice.options?.map((option) => {
																							const isOptionSelected =
																								currentSelections.includes(option.name);
																							return (
																								<div
																									key={option.name}
																									onClick={(e) => {
																										e.stopPropagation();
																										handleOptionClick(option.name);
																									}}
																									className={cn(
																										'cursor-pointer rounded-lg border-2 p-2 transition-all',
																										isOptionSelected
																											? 'border-primary bg-primary/10'
																											: 'border-primary/30 hover:border-primary/60'
																									)}
																								>
																									<div className="flex items-center justify-between">
																										<span className="text-primary text-xs font-semibold">
																											{option.name}
																										</span>
																										{isOptionSelected && (
																											<Check className="text-primary h-3 w-3" />
																										)}
																									</div>
																									<p className="text-foreground/70 mt-1 text-xs">
																										{option.description}
																									</p>
																								</div>
																							);
																						})}
																					</div>
																				</div>
																			);
																		})}
																	</div>
																);
															})()}
														</div>
													)}
												</div>
											)}
										</Card>
									);
								})}
						</div>
					</section>
				</TabsContent>

				<TabsContent value="pathPoints" className="mt-6">
					{/* Cross-path Spell List selector for martial classes (L12) */}
					{(() => {
						// Get class category to determine cross-path grants
						const classDefinition = state.classId ? findClassByName(state.classId) : null;
						const classCategory = classDefinition?.classCategory;
						const hasSpellcasterPath = (pathPoints.spellcasting || 0) > 0;

						// Show spell list selector if martial class taking spellcaster path
						if (classCategory === 'martial' && hasSpellcasterPath && !selectedCrossPathSpellList) {
							const spellLists = ['Arcane', 'Divine', 'Occult', 'Primal'];
							return (
								<Card className="border-primary/50 bg-primary/10 mb-8 border">
									<CardHeader>
										<CardTitle className="font-cinzel text-primary">
											Choose Your Spell List
										</CardTitle>
										<p className="text-muted-foreground text-sm">
											As a martial class taking the Spellcaster Path for the first time,
											you gain a Spell List of your choice from any Class.
										</p>
									</CardHeader>
									<CardContent>
										<Select
											value={selectedCrossPathSpellList}
											onValueChange={(value) => {
												setSelectedCrossPathSpellList(value);
												dispatch({ type: 'SET_CROSS_PATH_SPELL_LIST', spellList: value });
												console.log('✨ Cross-path Spell List selected:', value);
											}}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a Spell List..." />
											</SelectTrigger>
											<SelectContent>
												{spellLists.map((list) => (
													<SelectItem key={list} value={list.toLowerCase()}>
														{list} Spell List
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</CardContent>
								</Card>
							);
						}

						// Show notification if spellcaster taking martial path
						if (classCategory === 'spellcaster' && (pathPoints.martial || 0) > 0) {
							return (
								<Card className="border-green-500/50 bg-green-500/10 mb-8 border">
									<CardHeader>
										<CardTitle className="font-cinzel text-green-400">
											Spellcaster Stamina Regen Gained
										</CardTitle>
										<p className="text-muted-foreground text-sm">
											As a spellcaster class taking the Martial Path for the first time,
											you gain Spellcaster Stamina Regen: Once per round, you regain up to
											half your maximum SP when you use a Spell Enhancement.
										</p>
									</CardHeader>
								</Card>
							);
						}

						return null;
					})()}
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
						{CHARACTER_PATHS.map((path) => {
							const currentLevel =
								path.id === 'martial_path' ? pathPoints.martial || 0 : pathPoints.spellcasting || 0;

							return (
								<Card key={path.id} className="border-border bg-black/20">
									<CardHeader>
										<div className="flex items-center justify-between">
											<CardTitle className="font-cinzel text-primary text-2xl">
												{path.name}
											</CardTitle>
											<div className="border-border flex items-center gap-3 rounded-lg border bg-black/40 p-1.5">
												<Button
													variant="ghost"
													size="icon"
													onClick={() =>
														handlePathPointRemove(
															path.id === 'martial_path' ? 'martial' : 'spellcasting'
														)
													}
													disabled={currentLevel === 0}
													className="h-8 w-8"
												>
													<Minus className="h-4 w-4" />
												</Button>
												<span className="w-8 text-center text-xl font-bold">{currentLevel}</span>
												<Button
													variant="ghost"
													size="icon"
													onClick={() =>
														handlePathPointAdd(
															path.id === 'martial_path' ? 'martial' : 'spellcasting'
														)
													}
													disabled={usedPathPoints >= availablePathPoints}
													className="h-8 w-8"
												>
													<Plus className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</CardHeader>
									<CardContent>
										<div className="mb-6 space-y-2">
											{path.progression.map((level) => {
												const isActive = currentLevel >= level.pathLevel;
												const benefits = [];
												if (level.benefits.staminaPoints)
													benefits.push(`+${level.benefits.staminaPoints} SP`);
												if (level.benefits.manaPoints)
													benefits.push(`+${level.benefits.manaPoints} MP`);
												if (level.benefits.maneuversLearned)
													benefits.push(`+${level.benefits.maneuversLearned} Maneuvers`);
												if (level.benefits.cantripsLearned)
													benefits.push(`+${level.benefits.cantripsLearned} Cantrips`);
												if (level.benefits.spellsLearned)
													benefits.push(`+${level.benefits.spellsLearned} Spells`);

												return (
													<div
														key={level.pathLevel}
														className={cn(
															'flex items-center gap-3 rounded-md border-l-2 p-2 transition-colors',
															isActive
																? 'border-l-green-500 bg-green-500/10 text-green-100'
																: 'text-muted-foreground border-l-transparent bg-white/5 opacity-60'
														)}
													>
														<div
															className={cn(
																'flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold',
																isActive
																	? 'border-green-500 bg-green-500 text-black'
																	: 'border-white/20 bg-transparent'
															)}
														>
															{isActive && <Check className="h-3 w-3" />}
														</div>
														<div className="text-sm">
															<span className="mr-2 font-bold">Level {level.pathLevel}:</span>
															<span>{benefits.join(', ')}</span>
														</div>
													</div>
												);
											})}
										</div>

										{path.specialRules && path.specialRules.length > 0 && (
											<div className="bg-primary/10 border-primary/20 rounded-md border p-4">
												<h4 className="font-cinzel text-primary mb-2 font-bold">Special Rules</h4>
												<ul className="list-inside list-disc space-y-1">
													{path.specialRules.map((rule, idx) => (
														<li key={idx} className="text-muted-foreground text-sm">
															{rule}
														</li>
													))}
												</ul>
											</div>
										)}
									</CardContent>
								</Card>
							);
						})}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default LevelingChoices;
