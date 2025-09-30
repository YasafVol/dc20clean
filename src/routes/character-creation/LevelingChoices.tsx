import { useState, useEffect } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { resolveClassProgression } from '../../lib/rulesdata/classes-data/classProgressionResolver';
import { allTalents } from '../../lib/rulesdata/classes-data/talents/talent.loader';
import { CHARACTER_PATHS } from '../../lib/rulesdata/paths/paths.data';
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
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	margin-top: 1rem;
	padding: 1rem;
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

const FeatureDetailPanel = styled.div`
	grid-column: 1 / -1;
	padding: 1.5rem;
	background: rgba(0, 0, 0, 0.4);
	border: 1px solid rgba(212, 175, 55, 0.3);
	border-radius: 8px;
	margin-top: 1rem;
`;

const FeatureDetailTitle = styled.div`
	font-family: 'Cinzel', serif;
	font-size: 1.3rem;
	color: #d4af37;
	margin-bottom: 1rem;
`;

const FeatureDetailDescription = styled.div`
	font-family: 'Urbanist', sans-serif;
	font-size: 1rem;
	color: rgba(255, 255, 255, 0.9);
	line-height: 1.6;
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
	const [selectedTalents, setSelectedTalents] = useState<string[]>(state.selectedTalents || []);
	const [pathPoints, setPathPoints] = useState(state.pathPointAllocations || { martial: 0, spellcasting: 0 });
	const [resolvedProgression, setResolvedProgression] = useState<any>(null);
	
	// Multiclass state
	const [selectedMulticlassOption, setSelectedMulticlassOption] = useState<'acquire' | 'adapt' | null>(null);
	const [selectedMulticlassClass, setSelectedMulticlassClass] = useState<string>('');
	const [selectedMulticlassFeature, setSelectedMulticlassFeature] = useState<string>('');
	const [multiclassFeatureDetail, setMulticlassFeatureDetail] = useState<any>(null);

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
	const totalTalentsUsed = selectedTalents.length + multiclassTalentUsed;

	// Define General Talents (hardcoded as per spec)
	const generalTalents = [
		{
			id: 'general_attribute_increase',
			name: 'Attribute Increase',
			category: 'General',
			description: 'You gain 1 Attribute Point to put into any Attribute of your choice.'
		},
		{
			id: 'general_skill_increase',
			name: 'Skill Point Increase',
			category: 'General',
			description: 'You gain 3 Skill Points to put into any Skill of your choice.'
		},
		{
			id: 'general_trade_increase',
			name: 'Trade Point Increase',
			category: 'General',
			description: 'You gain 3 Trade Points to put into any Trade of your choice.'
		}
	];

	// Filter class talents for the current class
	const classTalents = allTalents.filter(
		t => t.category === 'Class' && t.prerequisites?.classId === state.classId
	);

	// Handle multiclass class selection
	const handleMulticlassClassChange = (classId: string) => {
		setSelectedMulticlassClass(classId);
		setSelectedMulticlassFeature('');
		setMulticlassFeatureDetail(null);
	};

	// Handle multiclass feature selection
	const handleMulticlassFeatureChange = (featureId: string) => {
		setSelectedMulticlassFeature(featureId);
		
		if (!featureId || !selectedMulticlassClass) {
			setMulticlassFeatureDetail(null);
			dispatch({ 
				type: 'SET_MULTICLASS', 
				option: selectedMulticlassOption, 
				classId: selectedMulticlassClass || '', 
				featureId: '' 
			});
			return;
		}

		// Load feature details
		const selectedClass = classesData.find(c => c.id === selectedMulticlassClass);
		if (selectedClass) {
			const classFeatures = findClassByName(selectedClass.name);
			if (classFeatures) {
				const targetLevel = selectedMulticlassOption === 'acquire' ? 1 : 2;
				const feature = classFeatures.coreFeatures.find(
					f => f.levelGained === targetLevel && f.featureName === featureId
				);
				setMulticlassFeatureDetail(feature);
			}
		}
		
		// Sync to store
		dispatch({ 
			type: 'SET_MULTICLASS', 
			option: selectedMulticlassOption, 
			classId: selectedMulticlassClass, 
			featureId 
		});
	};

	const getMulticlassFeatures = () => {
		if (!selectedMulticlassClass) return [];
		
		const selectedClass = classesData.find(c => c.id === selectedMulticlassClass);
		if (!selectedClass) return [];

		const classFeatures = findClassByName(selectedClass.name);
		if (!classFeatures) return [];

		const targetLevel = selectedMulticlassOption === 'acquire' ? 1 : 2;
		return classFeatures.coreFeatures.filter(f => f.levelGained === targetLevel);
	};

	const handleTalentToggle = (talentId: string) => {
		let newTalents: string[];
		if (selectedTalents.includes(talentId)) {
			newTalents = selectedTalents.filter(id => id !== talentId);
		} else if (totalTalentsUsed < availableTalentPoints) {
			newTalents = [...selectedTalents, talentId];
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
			{/* General Talents */}
			<Section>
				<SectionTitle>General Talents</SectionTitle>
				<TalentGrid>
					{generalTalents.map(talent => (
						<TalentCard
							key={talent.id}
							$selected={selectedTalents.includes(talent.id)}
							$disabled={!selectedTalents.includes(talent.id) && totalTalentsUsed >= availableTalentPoints}
							onClick={() => handleTalentToggle(talent.id)}
						>
							<TalentName>{talent.name}</TalentName>
							<TalentCategory>{talent.category}</TalentCategory>
							<TalentDescription>{talent.description}</TalentDescription>
						</TalentCard>
					))}
				</TalentGrid>
			</Section>

			{/* Class Talents */}
			{classTalents.length > 0 && (
				<Section>
					<SectionTitle>Class Talents</SectionTitle>
					<TalentGrid>
						{classTalents.map(talent => (
							<TalentCard
								key={talent.id}
								$selected={selectedTalents.includes(talent.id)}
								$disabled={!selectedTalents.includes(talent.id) && totalTalentsUsed >= availableTalentPoints}
								onClick={() => handleTalentToggle(talent.id)}
							>
								<TalentName>{talent.name}</TalentName>
								<TalentCategory>{talent.category} - {resolvedProgression.className}</TalentCategory>
								<TalentDescription>{talent.description}</TalentDescription>
							</TalentCard>
						))}
					</TalentGrid>
				</Section>
			)}

			{/* Multiclass Talents */}
			<Section>
				<SectionTitle>Multiclass Talents</SectionTitle>
				
				<MulticlassOption
					$selected={selectedMulticlassOption === 'acquire'}
					$disabled={totalTalentsUsed >= availableTalentPoints && selectedMulticlassOption !== 'acquire'}
					onClick={() => {
						if (selectedMulticlassOption === 'acquire') {
							setSelectedMulticlassOption(null);
							setSelectedMulticlassClass('');
							setSelectedMulticlassFeature('');
							setMulticlassFeatureDetail(null);
						} else if (totalTalentsUsed < availableTalentPoints) {
							setSelectedMulticlassOption('acquire');
							setSelectedMulticlassClass('');
							setSelectedMulticlassFeature('');
							setMulticlassFeatureDetail(null);
						}
					}}
				>
					<MulticlassTitle>Acquire Multiclass</MulticlassTitle>
					<MulticlassSubtext>You can choose a 1st Level Class Feature from any class</MulticlassSubtext>
				</MulticlassOption>

				<MulticlassOption
					$selected={selectedMulticlassOption === 'adapt'}
					$disabled={state.level < 5 || (totalTalentsUsed >= availableTalentPoints && selectedMulticlassOption !== 'adapt')}
					onClick={() => {
						if (state.level >= 5) {
							if (selectedMulticlassOption === 'adapt') {
								setSelectedMulticlassOption(null);
								setSelectedMulticlassClass('');
								setSelectedMulticlassFeature('');
								setMulticlassFeatureDetail(null);
							} else if (totalTalentsUsed < availableTalentPoints) {
								setSelectedMulticlassOption('adapt');
								setSelectedMulticlassClass('');
								setSelectedMulticlassFeature('');
								setMulticlassFeatureDetail(null);
							}
						}
					}}
				>
					<MulticlassTitle>Adapt Multiclass {state.level < 5 && '(Requires Level 5)'}</MulticlassTitle>
					<MulticlassSubtext>You can choose a 2nd Level Class Feature from any class</MulticlassSubtext>
				</MulticlassOption>

				{selectedMulticlassOption && (
					<MulticlassPickerContainer>
						<Dropdown
							value={selectedMulticlassClass}
							onChange={(e) => handleMulticlassClassChange(e.target.value)}
						>
							<option value="">Choose a class...</option>
							{classesData.map(cls => (
								<option key={cls.id} value={cls.id}>{cls.name}</option>
							))}
						</Dropdown>

						<Dropdown
							value={selectedMulticlassFeature}
							onChange={(e) => handleMulticlassFeatureChange(e.target.value)}
							disabled={!selectedMulticlassClass}
						>
							<option value="">Choose a feature...</option>
							{getMulticlassFeatures().map(feature => (
								<option key={feature.featureName} value={feature.featureName}>
									{feature.featureName}
								</option>
							))}
						</Dropdown>

						{multiclassFeatureDetail && (
							<FeatureDetailPanel>
								<FeatureDetailTitle>{multiclassFeatureDetail.featureName}</FeatureDetailTitle>
								<FeatureDetailDescription>{multiclassFeatureDetail.description}</FeatureDetailDescription>
							</FeatureDetailPanel>
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