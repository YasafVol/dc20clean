import { useState, useEffect } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { resolveClassProgression } from '../../lib/rulesdata/classes-data/classProgressionResolver';
import { allTalents } from '../../lib/rulesdata/classes-data/talents/talent.loader';
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

const BudgetItem = styled.div`
	text-align: center;
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

const PathPointAllocator = styled.div`
	display: flex;
	gap: 2rem;
	justify-content: center;
`;

const PathPointControl = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	padding: 1rem;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 8px;
	border: 1px solid rgba(255, 255, 255, 0.1);
`;

const PathLabel = styled.div`
	font-family: 'Cinzel', serif;
	font-size: 1.1rem;
	color: #d4af37;
`;

const PathValue = styled.div`
	font-family: 'Urbanist', sans-serif;
	font-size: 2rem;
	font-weight: 700;
	color: white;
`;

const PathButtons = styled.div`
	display: flex;
	gap: 0.5rem;
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

	&:hover:not(:disabled) {
		background: rgba(212, 175, 55, 0.4);
	}

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
`;

const FeaturesSection = styled.div`
	margin-top: 2rem;
	padding: 1rem;
	background: rgba(0, 0, 0, 0.2);
	border-radius: 8px;
	border: 1px solid rgba(212, 175, 55, 0.2);
`;

const FeaturesList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const FeatureItem = styled.li`
	font-family: 'Urbanist', sans-serif;
	padding: 0.75rem;
	margin-bottom: 0.5rem;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 4px;
	border-left: 3px solid #d4af37;
`;

const FeatureName = styled.span`
	font-weight: 600;
	color: #d4af37;
	margin-right: 0.5rem;
`;

const FeatureDescription = styled.span`
	color: rgba(255, 255, 255, 0.8);
`;

const EmptyState = styled.div`
	text-align: center;
	padding: 3rem;
	color: rgba(255, 255, 255, 0.5);
	font-family: 'Urbanist', sans-serif;
	font-style: italic;
`;

function LevelingChoices() {
	const { state } = useCharacter();
	const [selectedTalents, setSelectedTalents] = useState<string[]>([]);
	const [pathPoints, setPathPoints] = useState({ martial: 0, spellcasting: 0 });
	const [resolvedProgression, setResolvedProgression] = useState<any>(null);

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
	const usedPathPoints = pathPoints.martial + pathPoints.spellcasting;

	// Filter talents based on class
	const generalTalents = allTalents.filter(t => t.category === 'General');
	const classTalents = allTalents.filter(
		t => t.category === 'Class' && t.prerequisites?.classId === state.classId
	);

	const handleTalentToggle = (talentId: string) => {
		if (selectedTalents.includes(talentId)) {
			setSelectedTalents(selectedTalents.filter(id => id !== talentId));
		} else if (selectedTalents.length < availableTalentPoints) {
			setSelectedTalents([...selectedTalents, talentId]);
		}
	};

	const handlePathPointAdd = (path: 'martial' | 'spellcasting') => {
		if (usedPathPoints < availablePathPoints) {
			setPathPoints({ ...pathPoints, [path]: pathPoints[path] + 1 });
		}
	};

	const handlePathPointRemove = (path: 'martial' | 'spellcasting') => {
		if (pathPoints[path] > 0) {
			setPathPoints({ ...pathPoints, [path]: pathPoints[path] - 1 });
		}
	};

	return (
		<Container>
			<Title>Leveling Choices</Title>
			<Subtitle>
				Level {state.level} {resolvedProgression.className} — Choose your talents and path points
			</Subtitle>

			<BudgetSummary>
				<BudgetItem>
					<BudgetLabel>Talents</BudgetLabel>
					<BudgetValue>{selectedTalents.length} / {availableTalentPoints}</BudgetValue>
				</BudgetItem>
				<BudgetItem>
					<BudgetLabel>Path Points</BudgetLabel>
					<BudgetValue>{usedPathPoints} / {availablePathPoints}</BudgetValue>
				</BudgetItem>
			</BudgetSummary>

			{availableTalentPoints > 0 && (
				<Section>
					<SectionTitle>Select Talents ({selectedTalents.length}/{availableTalentPoints})</SectionTitle>
					<TalentGrid>
						{generalTalents.map(talent => (
							<TalentCard
								key={talent.id}
								$selected={selectedTalents.includes(talent.id)}
								$disabled={!selectedTalents.includes(talent.id) && selectedTalents.length >= availableTalentPoints}
								onClick={() => handleTalentToggle(talent.id)}
							>
								<TalentName>{talent.name}</TalentName>
								<TalentCategory>{talent.category}</TalentCategory>
								<TalentDescription>{talent.description}</TalentDescription>
							</TalentCard>
						))}
						{classTalents.map(talent => (
							<TalentCard
								key={talent.id}
								$selected={selectedTalents.includes(talent.id)}
								$disabled={!selectedTalents.includes(talent.id) && selectedTalents.length >= availableTalentPoints}
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

			{availablePathPoints > 0 && (
				<Section>
					<SectionTitle>Allocate Path Points ({usedPathPoints}/{availablePathPoints})</SectionTitle>
					<PathPointAllocator>
						<PathPointControl>
							<PathLabel>Martial Path</PathLabel>
							<PathValue>{pathPoints.martial}</PathValue>
							<PathButtons>
								<PathButton onClick={() => handlePathPointRemove('martial')} disabled={pathPoints.martial === 0}>
									−
								</PathButton>
								<PathButton onClick={() => handlePathPointAdd('martial')} disabled={usedPathPoints >= availablePathPoints}>
									+
								</PathButton>
							</PathButtons>
						</PathPointControl>

						<PathPointControl>
							<PathLabel>Spellcasting Path</PathLabel>
							<PathValue>{pathPoints.spellcasting}</PathValue>
							<PathButtons>
								<PathButton onClick={() => handlePathPointRemove('spellcasting')} disabled={pathPoints.spellcasting === 0}>
									−
								</PathButton>
								<PathButton onClick={() => handlePathPointAdd('spellcasting')} disabled={usedPathPoints >= availablePathPoints}>
									+
								</PathButton>
							</PathButtons>
						</PathPointControl>
					</PathPointAllocator>
				</Section>
			)}

			<FeaturesSection>
				<SectionTitle>Unlocked Features</SectionTitle>
				<FeaturesList>
					{resolvedProgression.unlockedFeatures.map((feature: any, index: number) => (
						<FeatureItem key={feature.id || index}>
							<FeatureName>{feature.featureName}</FeatureName>
							<FeatureDescription>{feature.description}</FeatureDescription>
						</FeatureItem>
					))}
				</FeaturesList>
			</FeaturesSection>
		</Container>
	);
}

export default LevelingChoices;
