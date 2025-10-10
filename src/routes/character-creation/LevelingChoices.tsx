import { useState, useEffect } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { resolveClassProgression } from '../../lib/rulesdata/classes-data/classProgressionResolver';
import { allTalents } from '../../lib/rulesdata/classes-data/talents/talent.loader';
import { CHARACTER_PATHS } from '../../lib/rulesdata/progression/paths/paths.data';
import { MULTICLASS_TIERS, type MulticlassTier } from '../../lib/rulesdata/progression/multiclass';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { findClassByName } from '../../lib/rulesdata/loaders/class-features.loader';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
`;

const Title = styled.h2`
	font-family: 'Cinzel', serif;
	font-size: 2.5rem;
	color: #d4af37;
	text-align: center;
	margin-bottom: 1rem;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
	font-family: 'Urbanist', sans-serif;
	font-size: 1.1rem;
	color: rgba(255, 255, 255, 0.8);
	text-align: center;
	margin-bottom: 2rem;
`;

const BudgetSummary = styled.div`
	display: flex;
	justify-content: center;
	gap: 2rem;
	margin-bottom: 2rem;
	padding: 1.5rem;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 8px;
	border: 1px solid rgba(212, 175, 55, 0.3);
`;

const BudgetTab = styled.button<{ $active: boolean }>`
	background: ${props => props.$active ? 'rgba(212, 175, 55, 0.3)' : 'transparent'};
	border: 2px solid ${props => props.$active ? '#d4af37' : 'rgba(212, 175, 55, 0.3)'};
	border-radius: 8px;
	padding: 1rem 2rem;
	cursor: pointer;
	transition: all 0.2s;
	text-align: center;

	&:hover {
		border-color: #d4af37;
		background: rgba(212, 175, 55, 0.2);
	}
`;

const BudgetLabel = styled.div`
	font-family: 'Cinzel', serif;
	font-size: 0.9rem;
	color: #d4af37;
	text-transform: uppercase;
	margin-bottom: 0.25rem;
`;

const BudgetValue = styled.div`
	font-family: 'Urbanist', sans-serif;
	font-size: 1.5rem;
	font-weight: 700;
	color: white;
`;

const Section = styled.div`
	margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
	font-family: 'Cinzel', serif;
	font-size: 1.5rem;
	color: #d4af37;
	margin-bottom: 1rem;
	border-bottom: 2px solid rgba(212, 175, 55, 0.3);
	padding-bottom: 0.5rem;
`;

const TalentGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 1rem;
	margin-bottom: 2rem;
`;

// General talent card with counter UI
const GeneralTalentCard = styled.div<{ $hasCount: boolean }>`
	background: ${props => props.$hasCount ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0, 0, 0, 0.4)'};
	border: 2px solid ${props => props.$hasCount ? '#d4af37' : 'rgba(255, 255, 255, 0.1)'};
	border-radius: 8px;
	padding: 1rem;
	text-align: left;
	cursor: default;
	transition: border-color 0.2s;

	&:hover {
		border-color: #d4af37;
	}
`;

const TalentHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
`;

const CountBadge = styled.span`
	background: rgba(212, 175, 55, 0.9);
	color: #1a1a1a;
	font-family: 'Urbanist', sans-serif;
	font-size: 0.9rem;
	font-weight: 700;
	padding: 0.25rem 0.75rem;
	border-radius: 12px;
`;

const TalentControls = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-top: 0.75rem;
`;

const TalentButton = styled.button`
	flex: 1;
	background: rgba(212, 175, 55, 0.2);
	border: 2px solid #d4af37;
	border-radius: 6px;
	color: #d4af37;
	font-family: 'Urbanist', sans-serif;
	font-size: 1.25rem;
	font-weight: 700;
	padding: 0.5rem;
	cursor: pointer;
	transition: all 0.2s;

	&:hover:not(:disabled) {
		background: rgba(212, 175, 55, 0.3);
		transform: translateY(-1px);
	}

	&:active:not(:disabled) {
		transform: translateY(0);
	}

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
`;

// Class/multiclass talent card (toggle behavior)
const TalentCard = styled.button<{ $selected: boolean; $disabled: boolean }>`
	background: ${props => props.$selected ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0, 0, 0, 0.4)'};
	border: 2px solid ${props => props.$selected ? '#d4af37' : 'rgba(255, 255, 255, 0.1)'};
	border-radius: 8px;
	padding: 1rem;
	text-align: left;
	cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
	opacity: ${props => props.$disabled ? 0.5 : 1};
	transition: all 0.2s;

	&:hover:not(:disabled) {
		border-color: #d4af37;
		background: rgba(212, 175, 55, 0.1);
		transform: translateY(-2px);
	}
`;

const TalentName = styled.div`
	font-family: 'Cinzel', serif;
	font-size: 1.1rem;
	color: #d4af37;
	margin-bottom: 0.5rem;
`;

const TalentCategory = styled.div`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.85rem;
	color: rgba(255, 255, 255, 0.6);
	font-style: italic;
	margin-bottom: 0.5rem;
`;

const TalentDescription = styled.div`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.95rem;
	color: rgba(255, 255, 255, 0.9);
	line-height: 1.4;
`;

const MulticlassOption = styled.button<{ $selected: boolean; $disabled: boolean }>`
	background: ${props => props.$selected ? 'rgba(212, 175, 55, 0.4)' : 'rgba(212, 175, 55, 0.1)'};
	border: 2px solid #d4af37;
	border-radius: 8px;
	padding: 1.5rem;
	text-align: left;
	cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
	opacity: ${props => props.$disabled ? 0.5 : 1};
	transition: all 0.2s;
	width: 100%;
	margin-bottom: 1rem;

	&:hover:not(:disabled) {
		background: rgba(212, 175, 55, 0.3);
		transform: translateY(-2px);
	}
`;

const MulticlassTitle = styled.div`
	font-family: 'Cinzel', serif;
	font-size: 1.2rem;
	color: #d4af37;
	margin-bottom: 0.5rem;
`;

const MulticlassSubtext = styled.div`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.9rem;
	color: rgba(255, 255, 255, 0.8);
`;

const MulticlassPickerContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	margin-top: 1rem;
	padding: 1.5rem;
	background: rgba(0, 0, 0, 0.2);
	border-radius: 8px;
`;

const Dropdown = styled.select`
	font-family: 'Urbanist', sans-serif;
	padding: 0.75rem;
	background: rgba(0, 0, 0, 0.6);
	border: 1px solid rgba(212, 175, 55, 0.5);
	border-radius: 4px;
	color: white;
	font-size: 1rem;
	cursor: pointer;

	&:hover {
		border-color: #d4af37;
	}

	option {
		background: #1a1a1a;
		color: white;
	}
`;

const FeatureCardContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
	gap: 1rem;
	margin-top: 1rem;
`;

const MulticlassFeatureCard = styled.div<{ $selected: boolean }>`
	background: ${props => props.$selected ? 'rgba(212, 175, 55, 0.2)' : 'rgba(0, 0, 0, 0.3)'};
	border: 2px solid ${props => props.$selected ? '#d4af37' : 'rgba(212, 175, 55, 0.3)'};
	border-radius: 8px;
	padding: 1.25rem;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		border-color: #d4af37;
		background: rgba(212, 175, 55, 0.15);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
	}
`;

const FeatureCardTitle = styled.h4`
	font-family: 'Cinzel', serif;
	font-size: 1.1rem;
	color: #d4af37;
	margin: 0 0 0.5rem 0;
	display: flex;
	align-items: center;
`;

const FeatureCardLevel = styled.div`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.85rem;
	color: rgba(255, 255, 255, 0.6);
	margin-bottom: 0.75rem;
`;

const FeatureCardDescription = styled.p`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.9rem;
	color: rgba(255, 255, 255, 0.8);
	line-height: 1.5;
	margin: 0;
`;

const SelectedBadge = styled.span`
	display: inline-block;
	background: #d4af37;
	color: #1a1a1a;
	padding: 0.25rem 0.75rem;
	border-radius: 12px;
	font-family: 'Urbanist', sans-serif;
	font-size: 0.75rem;
	font-weight: 600;
	margin-left: 0.5rem;
`;

const InfoText = styled.p`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.95rem;
	color: rgba(255, 255, 255, 0.7);
	line-height: 1.4;
`;

const PathContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;
`;

const PathCard = styled.div`
	background: rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(212, 175, 55, 0.3);
	border-radius: 8px;
	padding: 1.5rem;
`;

const PathHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
`;

const PathTitle = styled.h4`
	font-family: 'Cinzel', serif;
	font-size: 1.3rem;
	color: #d4af37;
	margin: 0;
`;

const PathControls = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

const PathButton = styled.button`
	font-family: 'Urbanist', sans-serif;
	padding: 0.5rem 1rem;
	background: rgba(212, 175, 55, 0.2);
	border: 1px solid #d4af37;
	border-radius: 4px;
	color: white;
	cursor: pointer;
	transition: all 0.2s;
	font-size: 1.2rem;
	min-width: 2.5rem;

	&:hover:not(:disabled) {
		background: rgba(212, 175, 55, 0.4);
	}

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
`;

const PathCurrentValue = styled.span`
	font-family: 'Urbanist', sans-serif;
	font-size: 1.2rem;
	font-weight: 700;
	color: white;
	min-width: 2rem;
	text-align: center;
`;

const PathProgressionTable = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	margin-bottom: 1rem;
`;

const PathLevelRow = styled.div<{ $active: boolean }>`
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 0.75rem;
	background: ${props => props.$active ? 'rgba(76, 175, 80, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
	border-radius: 4px;
	border-left: 3px solid ${props => props.$active ? '#4CAF50' : 'rgba(255, 255, 255, 0.2)'};
`;

const PathLevelIndicator = styled.div<{ $completed: boolean }>`
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: ${props => props.$completed ? '#4CAF50' : 'transparent'};
	border: 2px solid ${props => props.$completed ? '#4CAF50' : 'rgba(255, 255, 255, 0.3)'};
	flex-shrink: 0;
`;

const PathLevelLabel = styled.div`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.95rem;
	color: rgba(255, 255, 255, 0.9);
	flex: 1;
`;

const PathSpecialRules = styled.div`
	background: rgba(212, 175, 55, 0.1);
	border: 1px solid rgba(212, 175, 55, 0.4);
	border-radius: 4px;
	padding: 1rem;
	margin-top: 1rem;
`;

const PathSpecialRulesTitle = styled.div`
	font-family: 'Cinzel', serif;
	font-size: 1rem;
	color: #d4af37;
	margin-bottom: 0.5rem;
`;

const PathSpecialRulesText = styled.div`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.9rem;
	color: rgba(255, 255, 255, 0.8);
	line-height: 1.5;
`;

// Feature Display - using shared styled components from FeatureDisplay.styles.ts
// Kept local: FeatureName (different color scheme for Leveling stage)

const EmptyState = styled.div`
	text-align: center;
	padding: 3rem;
	color: rgba(255, 255, 255, 0.5);
	font-family: 'Urbanist', sans-serif;
	font-style: italic;
`;

type ActiveTab = 'talents' | 'pathPoints';

function LevelingChoices() {
	const { state, dispatch } = useCharacter();
	const [activeTab, setActiveTab] = useState<ActiveTab>('talents');
	const [selectedTalents, setSelectedTalents] = useState<Record<string, number>>(state.selectedTalents || {});
	const [pathPoints, setPathPoints] = useState(state.pathPointAllocations || { martial: 0, spellcasting: 0 });
	const [resolvedProgression, setResolvedProgression] = useState<any>(null);
	
	// Multiclass state - now supports all 6 tiers (type imported from multiclass.ts)
	const [selectedMulticlassOption, setSelectedMulticlassOption] = useState<MulticlassTier | null>(null);
	const [selectedMulticlassClass, setSelectedMulticlassClass] = useState<string>('');
	const [selectedMulticlassFeature, setSelectedMulticlassFeature] = useState<string>('');

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
			<Container>
				<EmptyState>
					Select a class and level greater than 1 to see leveling choices.
				</EmptyState>
			</Container>
		);
	}

	if (!resolvedProgression) {
		return (
			<Container>
				<EmptyState>Loading leveling options...</EmptyState>
			</Container>
		);
	}

	const budgets = resolvedProgression.budgets;
	const availableTalentPoints = budgets.totalTalents;
	const availablePathPoints = budgets.totalPathPoints;
	const usedPathPoints = (pathPoints.martial || 0) + (pathPoints.spellcasting || 0);
	
	// Count multiclass selection as a talent
	const multiclassTalentUsed = selectedMulticlassOption && selectedMulticlassFeature ? 1 : 0;
	// Count total talent selections from the count-based record
	const totalTalentsFromRecord = Object.values(selectedTalents).reduce((sum, count) => sum + count, 0);
	const totalTalentsUsed = totalTalentsFromRecord + multiclassTalentUsed;

	// Define General Talents - use IDs that match talents.data.ts so effects work
	const generalTalents = [
		{
			id: 'general_attribute_increase',
			name: 'Attribute Increase',
			category: 'General',
			description: 'You gain 1 Attribute Point to put into any Attribute of your choice.',
			effects: [{ type: 'MODIFY_STAT', target: 'attributePoints', value: 1 }]
		},
		{
			id: 'general_skill_increase',
			name: 'Skill Point Increase',
			category: 'General',
			description: 'You gain 3 Skill Points to put into any Skill of your choice.',
			effects: [{ type: 'MODIFY_STAT', target: 'skillPoints', value: 3 }]
		},
		{
			id: 'general_trade_increase',
			name: 'Trade Point Increase',
			category: 'General',
			description: 'You gain 3 Trade Points to put into any Trade of your choice.',
			effects: [{ type: 'MODIFY_STAT', target: 'tradePoints', value: 3 }]
		}
	];

	// Filter class talents for the current class AND level requirement
	const classTalents = allTalents.filter(
		t => t.category === 'Class' 
		&& t.prerequisites?.classId === state.classId
		&& (!t.prerequisites?.level || state.level >= t.prerequisites.level)
	);

	// Helper: Count class features owned per class (for multiclass prerequisites)
	// This counts features from the character's main class progression
	const getOwnedClassFeatures = (targetClassId: string): number => {
		if (!state.classId || !state.level) return 0;
		
		// If target class is the character's main class, count features from progression
		if (targetClassId === state.classId && resolvedProgression) {
			// Features unlocked from level 1 to current level
			return resolvedProgression.unlockedFeatureIds?.length || 0;
		}
		
		// TODO: Count multiclass features from other classes (stored in character state)
		// For now, return 0 for other classes (will implement when multiclass effects are applied)
		return 0;
	};

	// Helper: Count subclass features owned per subclass
	const getOwnedSubclassFeatures = (targetClassId: string): number => {
		if (!state.classId || !state.level) return 0;
		
		// If target class is the character's main class and they have a subclass
		if (targetClassId === state.classId && state.selectedSubclass && resolvedProgression) {
			// Count subclass features from progression
			// Subclass features typically start at level 3
			if (state.level >= 3) {
				// Rough estimate: subclass features at levels 3, 6, 9, etc.
				// TODO: Get exact count from resolved subclass features
				const subclassLevels = [3, 6, 9, 12, 15, 18].filter(lvl => lvl <= state.level);
				return subclassLevels.length;
			}
		}
		
		// TODO: Count multiclass subclass features (will implement when multiclass effects are applied)
		return 0;
	};

	// Helper: Check if character meets prerequisites for a multiclass tier
	const meetsMulticlassPrerequisites = (tier: typeof multiclassTiers[0]): boolean => {
		// Level requirement (already checked in filter, but include for completeness)
		if (state.level < tier.levelRequired) return false;

		// No additional prerequisites for Novice and Adept
		if (tier.minClassFeatures === 0 && tier.minSubclassFeatures === 0) return true;

		// For Expert/Grandmaster: Need N class features from ANY class
		if (tier.minClassFeatures > 0) {
			// Check if character has enough features from their main class OR any multiclass
			const mainClassFeatures = getOwnedClassFeatures(state.classId || '');
			if (mainClassFeatures >= tier.minClassFeatures) return true;
			
			// TODO: Check multiclass feature counts when implemented
			return false;
		}

		// For Master/Legendary: Need N subclass features from ANY subclass
		if (tier.minSubclassFeatures > 0) {
			// Check if character has enough subclass features
			const mainSubclassFeatures = getOwnedSubclassFeatures(state.classId || '');
			if (mainSubclassFeatures >= tier.minSubclassFeatures) return true;
			
			// TODO: Check multiclass subclass feature counts when implemented
			return false;
		}

		return true;
	};

	// Use multiclass tiers from centralized definition
	const multiclassTiers = MULTICLASS_TIERS;

	// Helper: Get classes that meet prerequisites for the selected tier
	const getEligibleClasses = (): typeof classesData => {
		if (!selectedMulticlassOption) return classesData;
		
		const selectedTier = multiclassTiers.find(t => t.id === selectedMulticlassOption);
		if (!selectedTier) return classesData;

		// Novice and Adept: All classes available
		if (selectedTier.minClassFeatures === 0 && selectedTier.minSubclassFeatures === 0) {
			return classesData;
		}

		// Expert/Grandmaster: Filter to classes where character has N+ class features
		if (selectedTier.minClassFeatures > 0) {
			return classesData.filter(cls => {
				const featuresOwned = getOwnedClassFeatures(cls.id);
				return featuresOwned >= selectedTier.minClassFeatures;
			});
		}

		// Master/Legendary: Filter to classes where character has N+ subclass features
		if (selectedTier.minSubclassFeatures > 0) {
			return classesData.filter(cls => {
				const subclassFeaturesOwned = getOwnedSubclassFeatures(cls.id);
				return subclassFeaturesOwned >= selectedTier.minSubclassFeatures;
			});
		}

		return classesData;
	};

	// Handle multiclass class selection
	const handleMulticlassClassChange = (classId: string) => {
		setSelectedMulticlassClass(classId);
		setSelectedMulticlassFeature('');
	};

	// Handle multiclass feature selection
	const handleMulticlassFeatureChange = (featureId: string) => {
		setSelectedMulticlassFeature(featureId);
		
		// Sync to store
		dispatch({ 
			type: 'SET_MULTICLASS', 
			option: selectedMulticlassOption, 
			classId: selectedMulticlassClass, 
			featureId 
		});
	};

	const getMulticlassFeatures = () => {
		if (!selectedMulticlassClass || !selectedMulticlassOption) return [];
		
		const selectedClass = classesData.find(c => c.id === selectedMulticlassClass);
		if (!selectedClass) return [];

		const classFeatures = findClassByName(selectedClass.name);
		if (!classFeatures) return [];

		const selectedTier = multiclassTiers.find(t => t.id === selectedMulticlassOption);
		if (!selectedTier) return [];

		const targetLevel = selectedTier.targetLevel;
		
		// Filter out path-related features (Martial Path, Spellcaster Path)
		const PATH_FEATURE_NAMES = ['Martial Path', 'Spellcaster Path', 'Path Points'];
		
		const coreFeatures = classFeatures.coreFeatures.filter(f => 
			f.levelGained === targetLevel && 
			!PATH_FEATURE_NAMES.some(pathName => f.featureName.includes(pathName))
		);

		// For tiers that support subclass features, add them to the list
		if (selectedTier.includeSubclass && selectedTier.subclassLevel !== undefined) {
			// Expert tier: Core OR subclass features
			// Master/Legendary: Only subclass features
			const shouldIncludeCore = !selectedTier.subclassOnly;
			const features = shouldIncludeCore ? [...coreFeatures] : [];

			// Add subclass features at the specified level
			if (classFeatures.subclasses) {
				for (const subclass of classFeatures.subclasses) {
					if (subclass.features) {
						const subclassFeatures = subclass.features.filter(
							f => f.levelGained === selectedTier.subclassLevel
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

	// Handle general talent increment/decrement (count-based)
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
			// Remove key if count reaches 0
			delete newTalents[talentId];
		} else {
			newTalents[talentId] = currentCount - 1;
		}
		setSelectedTalents(newTalents);
		dispatch({ type: 'SET_SELECTED_TALENTS', talents: newTalents });
	};

	// Handle class/multiclass talent toggle (single-select)
	const handleClassTalentToggle = (talentId: string) => {
		const newTalents = { ...selectedTalents };
		if (newTalents[talentId]) {
			// Already selected, remove it
			delete newTalents[talentId];
		} else if (totalTalentsUsed < availableTalentPoints) {
			// Select it (count = 1 for class talents)
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

	const renderTalentsTab = () => (
		<>
			{/* General Talents - count-based with +/- buttons */}
			<Section>
				<SectionTitle>General Talents</SectionTitle>
				<TalentGrid>
					{generalTalents.map(talent => {
						const count = selectedTalents[talent.id] || 0;
						return (
							<GeneralTalentCard key={talent.id} $hasCount={count > 0}>
								<TalentHeader>
									<TalentName>{talent.name}</TalentName>
									{count > 0 && <CountBadge>x{count}</CountBadge>}
								</TalentHeader>
								<TalentCategory>{talent.category}</TalentCategory>
								<TalentDescription>{talent.description}</TalentDescription>
								<TalentControls>
									<TalentButton
										onClick={() => handleGeneralTalentDecrement(talent.id)}
										disabled={count === 0}
									>
										−
									</TalentButton>
									<TalentButton
										onClick={() => handleGeneralTalentIncrement(talent.id)}
										disabled={totalTalentsUsed >= availableTalentPoints}
									>
										+
									</TalentButton>
								</TalentControls>
							</GeneralTalentCard>
						);
					})}
				</TalentGrid>
			</Section>

			{/* Class Talents - single-select toggle */}
			{classTalents.length > 0 && (
				<Section>
					<SectionTitle>Class Talents</SectionTitle>
					<TalentGrid>
						{classTalents.map(talent => (
							<TalentCard
								key={talent.id}
								$selected={!!selectedTalents[talent.id]}
								$disabled={!selectedTalents[talent.id] && totalTalentsUsed >= availableTalentPoints}
								onClick={() => handleClassTalentToggle(talent.id)}
							>
								<TalentName>{talent.name}</TalentName>
								<TalentCategory>{talent.category} - {resolvedProgression.className}</TalentCategory>
								<TalentDescription>{talent.description}</TalentDescription>
							</TalentCard>
						))}
					</TalentGrid>
				</Section>
			)}

			{/* Multiclass Talents - Only show tiers that meet all prerequisites */}
			<Section>
				<SectionTitle>Multiclass Talents</SectionTitle>
				
				{multiclassTiers
					.filter(tier => state.level >= tier.levelRequired && meetsMulticlassPrerequisites(tier))
					.map((tier) => {
						const isSelected = selectedMulticlassOption === tier.id;
						const isDisabled = totalTalentsUsed >= availableTalentPoints && !isSelected;

						return (
							<MulticlassOption
								key={tier.id}
								$selected={isSelected}
								$disabled={isDisabled}
								onClick={() => {
									if (isSelected) {
										// Deselect
										setSelectedMulticlassOption(null);
										setSelectedMulticlassClass('');
										setSelectedMulticlassFeature('');
									} else if (totalTalentsUsed < availableTalentPoints) {
										// Select this tier
										setSelectedMulticlassOption(tier.id);
										setSelectedMulticlassClass('');
										setSelectedMulticlassFeature('');
									}
								}}
							>
								<MulticlassTitle>{tier.name}</MulticlassTitle>
								<MulticlassSubtext>{tier.description}</MulticlassSubtext>
							</MulticlassOption>
						);
					})}

				{selectedMulticlassOption && (
					<MulticlassPickerContainer>
						<Dropdown
							value={selectedMulticlassClass}
							onChange={(e) => handleMulticlassClassChange(e.target.value)}
						>
							<option value="">Choose a class...</option>
							{getEligibleClasses().map(cls => (
								<option key={cls.id} value={cls.id}>{cls.name}</option>
							))}
						</Dropdown>

						{selectedMulticlassClass && getMulticlassFeatures().length > 0 && (
							<FeatureCardContainer>
								{getMulticlassFeatures().map(feature => (
									<MulticlassFeatureCard
										key={feature.featureName}
										$selected={selectedMulticlassFeature === feature.featureName}
										onClick={() => handleMulticlassFeatureChange(feature.featureName)}
									>
										<FeatureCardTitle>
											{feature.featureName}
											{selectedMulticlassFeature === feature.featureName && (
												<SelectedBadge>✓ Selected</SelectedBadge>
											)}
										</FeatureCardTitle>
										<FeatureCardLevel>Level {feature.levelGained} Feature</FeatureCardLevel>
										<FeatureCardDescription>{feature.description}</FeatureCardDescription>
									</MulticlassFeatureCard>
								))}
							</FeatureCardContainer>
						)}

						{selectedMulticlassClass && getMulticlassFeatures().length === 0 && (
							<InfoText style={{ marginTop: '1rem', textAlign: 'center' }}>
								No features available at this level for the selected class.
							</InfoText>
						)}
					</MulticlassPickerContainer>
				)}
			</Section>
		</>
	);

	const renderPathPointsTab = () => (
		<PathContainer>
			{CHARACTER_PATHS.map(path => {
				const currentLevel = path.id === 'martial_path' ? (pathPoints.martial || 0) : (pathPoints.spellcasting || 0);
				
				return (
					<PathCard key={path.id}>
						<PathHeader>
							<PathTitle>{path.name}</PathTitle>
							<PathControls>
								<PathButton 
									onClick={() => handlePathPointRemove(path.id === 'martial_path' ? 'martial' : 'spellcasting')}
									disabled={currentLevel === 0}
								>
									−
								</PathButton>
								<PathCurrentValue>{currentLevel}</PathCurrentValue>
								<PathButton 
									onClick={() => handlePathPointAdd(path.id === 'martial_path' ? 'martial' : 'spellcasting')}
									disabled={usedPathPoints >= availablePathPoints}
								>
									+
								</PathButton>
							</PathControls>
						</PathHeader>

						<PathProgressionTable>
							{path.progression.map((level) => {
								const benefits = [];
								if (level.benefits.staminaPoints) benefits.push(`+${level.benefits.staminaPoints} SP`);
								if (level.benefits.manaPoints) benefits.push(`+${level.benefits.manaPoints} MP`);
								if (level.benefits.maneuversLearned) benefits.push(`+${level.benefits.maneuversLearned} Maneuvers`);
								if (level.benefits.techniquesLearned) benefits.push(`+${level.benefits.techniquesLearned} Techniques`);
								if (level.benefits.cantripsLearned) benefits.push(`+${level.benefits.cantripsLearned} Cantrips`);
								if (level.benefits.spellsLearned) benefits.push(`+${level.benefits.spellsLearned} Spells`);

								return (
									<PathLevelRow key={level.pathLevel} $active={currentLevel >= level.pathLevel}>
										<PathLevelIndicator $completed={currentLevel >= level.pathLevel} />
										<PathLevelLabel>
											<strong>Level {level.pathLevel}:</strong> {benefits.join(', ')}
										</PathLevelLabel>
									</PathLevelRow>
								);
							})}
						</PathProgressionTable>

						{path.specialRules && path.specialRules.length > 0 && (
							<PathSpecialRules>
								<PathSpecialRulesTitle>Special Rules</PathSpecialRulesTitle>
								{path.specialRules.map((rule, idx) => (
									<PathSpecialRulesText key={idx}>{rule}</PathSpecialRulesText>
								))}
							</PathSpecialRules>
						)}
					</PathCard>
				);
			})}
		</PathContainer>
	);

	return (
		<Container>
			<Title>Leveling Choices</Title>
			<Subtitle>
				Level {state.level} {resolvedProgression.className} — Choose your talents and path points
			</Subtitle>

			<BudgetSummary>
		<BudgetTab $active={activeTab === 'talents'} onClick={() => setActiveTab('talents')}>
				<BudgetLabel>Talents</BudgetLabel>
				<BudgetValue>{totalTalentsUsed} / {availableTalentPoints}</BudgetValue>
			</BudgetTab>
				<BudgetTab $active={activeTab === 'pathPoints'} onClick={() => setActiveTab('pathPoints')}>
					<BudgetLabel>Path Points</BudgetLabel>
					<BudgetValue>{usedPathPoints} / {availablePathPoints}</BudgetValue>
				</BudgetTab>
			</BudgetSummary>

			{activeTab === 'talents' ? renderTalentsTab() : renderPathPointsTab()}

		</Container>
	);
}

export default LevelingChoices;