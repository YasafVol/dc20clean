import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { allManeuvers, ManeuverType } from '../../lib/rulesdata/martials/maneuvers';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { Sword, Filter } from 'lucide-react';
import { debug } from '../../lib/utils/debug';
import { theme } from '../character-sheet/styles/theme';
import {
	Container,
	Header,
	Title,
	Subtitle,
	ProgressSection,
	ProgressText,
	FilterSection,
	FilterLabel,
	ManeuverGrid,
	ManeuverCard,
	CardContent,
	CardHeader,
	ManeuverName,
	TypeBadge,
	ManeuverDescription,
	EmptyState,
	EmptyStateIcon,
	EmptyStateTitle,
	EmptyStateText,
	SelectedBadge,
	CostBadgesContainer,
	CostBadge,
	ButtonFooter,
	FilterText,
	FilterTextRemaining,
	ManeuverButton
} from './Maneuvers.styled';

// Simple deep equality helper for arrays
function arraysEqual<T>(a: T[], b: T[]): boolean {
	if (a.length !== b.length) return false;
	return a.every((val, index) => {
		if (Array.isArray(val) && Array.isArray(b[index])) {
			return arraysEqual(val as unknown[], b[index] as unknown[]);
		}
		return val === b[index];
	});
}

const Maneuvers: React.FC = () => {
	const { state, dispatch, calculationResult } = useCharacter();
	const [selectedManeuvers, setSelectedManeuvers] = useState<string[]>([]);
	const [maneuverFilter, setManeuverFilter] = useState<ManeuverType | 'all'>('all');
	const isInitialLoad = useRef(true);
	const hasInitialized = useRef(false);

	// Load existing selections from state - only run once on mount
	useEffect(() => {
		if (hasInitialized.current) {
			return;
		}

		debug.calculation('Maneuvers: Loading selections from state:', {
			selectedManeuvers: state.selectedManeuvers
		});

		if (state.selectedManeuvers && Array.isArray(state.selectedManeuvers)) {
			setSelectedManeuvers(state.selectedManeuvers);
		}

		hasInitialized.current = true;
	}, []);

	// Mark initial load as complete after first render
	useEffect(() => {
		isInitialLoad.current = false;
	}, []);

	// Calculate available maneuvers based on class
	const classData = classesData.find((c) => c.id === state.classId);

	const maneuverCount = useMemo(() => {
		const budgets = calculationResult?.levelBudgets;
		if (!budgets) return 0;

		const count = budgets.totalManeuversKnown || 0;
		return count;
	}, [calculationResult]);

	// Log step render
	useEffect(() => {
		debug.calculation('Maneuver step rendered', {
			maneuverCount,
			selectedCount: selectedManeuvers.length
		});
	}, [maneuverCount, selectedManeuvers.length]);

	const availableManeuvers = useMemo(() => {
		if (!classData) return [];
		return allManeuvers;
	}, [classData]);

	const filteredManeuvers = useMemo(() => {
		let maneuvers = availableManeuvers;
		if (maneuverFilter !== 'all') {
			maneuvers = maneuvers.filter((maneuver) => maneuver.type === maneuverFilter);
		}
		return maneuvers;
	}, [availableManeuvers, maneuverFilter]);

	// Handle maneuver selection
	const handleManeuverToggle = (maneuverName: string) => {
		setSelectedManeuvers((prev) => {
			if (prev.includes(maneuverName)) {
				debug.calculation('Maneuver deselected', {
					maneuverName,
					remaining: maneuverCount - prev.length + 1
				});
				return prev.filter((name) => name !== maneuverName);
			} else {
				// Check limits
				if (prev.length >= maneuverCount) return prev;
				debug.calculation('Maneuver selected', {
					maneuverName,
					remaining: maneuverCount - prev.length - 1
				});
				return [...prev, maneuverName];
			}
		});
	};

	// Save selections to character state
	useEffect(() => {
		// Skip on initial load to prevent infinite loops
		if (isInitialLoad.current) {
			return;
		}

		// Skip if we haven't initialized yet
		if (!hasInitialized.current) {
			return;
		}

		const currentStateManeuvers = state.selectedManeuvers || [];

		const maneuversChanged = !arraysEqual(selectedManeuvers, currentStateManeuvers);

		if (maneuversChanged) {
			debug.calculation('Maneuvers: Dispatching update:', {
				maneuvers: selectedManeuvers
			});
			dispatch({
				type: 'UPDATE_SPELLS_AND_MANEUVERS',
				spells: state.selectedSpells || {}, // Preserve existing spells
				maneuvers: selectedManeuvers
			});
		}
	}, [selectedManeuvers, dispatch, state.selectedManeuvers, state.selectedSpells]);

	const maneuversRemaining = maneuverCount - selectedManeuvers.length;

	if (!state.classId) {
		return (
			<Container style={{ textAlign: 'center', padding: '3rem 1rem' }}>
				<EmptyStateIcon>
					<Sword size={48} color="#A855F7" />
				</EmptyStateIcon>
				<EmptyStateTitle>Select a Class First</EmptyStateTitle>
				<EmptyStateText>
					Maneuvers are determined by your class. Please choose a class in the first stage to
					continue.
				</EmptyStateText>
			</Container>
		);
	}

	return (
		<Container>
			<Header>
				<Title>Learn Maneuvers</Title>
				<Subtitle>
					Master martial techniques. Choose the maneuvers that will define your character's
					combat prowess.
				</Subtitle>
			</Header>

			<ProgressSection>
				<ProgressText>
					Maneuvers: {selectedManeuvers.length} / {maneuverCount}
					{maneuversRemaining > 0
						? ` • ${maneuversRemaining} remaining`
						: ' • All choices complete'}
				</ProgressText>
			</ProgressSection>

			{maneuverCount > 0 && (
				<>
					<FilterSection>
						<FilterLabel>
							<Filter size={12} /> Maneuver Type
						</FilterLabel>
						<select
							value={maneuverFilter}
							onChange={(e) => setManeuverFilter(e.target.value as ManeuverType | 'all')}
							style={{
								width: '100%',
								maxWidth: '20rem',
								padding: '0.5rem 0.75rem',
								background: theme.colors.bg.primary,
								border: `1px solid ${theme.colors.bg.elevated}`,
								borderRadius: '0.375rem',
								color: theme.colors.text.primary,
								fontSize: '0.875rem'
							}}
						>
							<option value="all">All Types</option>
							{Object.values(ManeuverType).map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</FilterSection>

					<FilterText>
						Showing {filteredManeuvers.length} of {availableManeuvers.length} available maneuvers
						{' • '}
						<FilterTextRemaining $isOverLimit={maneuversRemaining < 0}>
							{maneuversRemaining} remaining
						</FilterTextRemaining>
					</FilterText>

					{filteredManeuvers.length === 0 ? (
						<EmptyState>
							<EmptyStateTitle>No Maneuvers Match</EmptyStateTitle>
							<p>Adjust your filters to discover different martial techniques.</p>
						</EmptyState>
					) : (
						<ManeuverGrid>
							{filteredManeuvers.map((maneuver) => {
								const isSelected = selectedManeuvers.includes(maneuver.name);
								const canSelect = selectedManeuvers.length < maneuverCount || isSelected;

								return (
									<ManeuverCard
										key={maneuver.name}
										$isSelected={isSelected}
										whileHover={{ y: -4 }}
										whileTap={{ scale: 0.98 }}
									>
										<CardContent>
											<CardHeader>
												<ManeuverName $isSelected={isSelected}>{maneuver.name}</ManeuverName>
												<TypeBadge $type={maneuver.type.toLowerCase()}>{maneuver.type}</TypeBadge>
											</CardHeader>
											<CostBadgesContainer>
												<CostBadge $variant="ap">{maneuver.cost.ap} AP</CostBadge>
												{maneuver.cost.sp && maneuver.cost.sp > 0 && (
													<CostBadge $variant="sp">{maneuver.cost.sp} SP</CostBadge>
												)}
											</CostBadgesContainer>
											<ManeuverDescription>{maneuver.description}</ManeuverDescription>
										</CardContent>
										<ButtonFooter>
											<ManeuverButton
												$variant={isSelected ? 'forget' : 'learn'}
												onClick={() => handleManeuverToggle(maneuver.name)}
												disabled={!isSelected && !canSelect}
											>
												{isSelected ? 'FORGET' : 'LEARN'}
											</ManeuverButton>
										</ButtonFooter>
										{isSelected && <SelectedBadge>✔</SelectedBadge>}
									</ManeuverCard>
								);
							})}
						</ManeuverGrid>
					)}
				</>
			)}
		</Container>
	);
};

export default Maneuvers;
