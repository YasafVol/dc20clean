/**
 * Encounter List Page
 *
 * Display all user's encounters.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { useEncounters } from '../../../lib/hooks/useEncounters';
import type { SavedEncounter } from '../../../lib/rulesdata/schemas/encounter.schema';
import { EncounterCard } from './components/EncounterCard';
import {
	PageContainer,
	Header,
	HeaderContent,
	HeaderLeft,
	HeaderRight,
	Title,
	Subtitle,
	MainContent,
	EncounterGrid,
	EmptyState,
	EmptyStateTitle,
	EmptyStateText,
} from './styles/EncounterStyles';

export const EncounterList: React.FC = () => {
	const navigate = useNavigate();
	const { encounters, isLoading, deleteEncounter, duplicateEncounter } = useEncounters();

	const handleCreateNew = () => {
		navigate('/dm/encounters/new');
	};

	const handleEdit = (encounter: SavedEncounter) => {
		navigate(`/dm/encounters/${encounter.id}`);
	};

	const handleDuplicate = async (encounter: SavedEncounter) => {
		try {
			const result = await duplicateEncounter(encounter.id);
			navigate(`/dm/encounters/${result.id}`);
		} catch (error) {
			console.error('Failed to duplicate encounter:', error);
		}
	};

	const handleDelete = async (encounter: SavedEncounter) => {
		if (confirm(`Delete "${encounter.name}"? It will be moved to trash.`)) {
			try {
				await deleteEncounter(encounter.id);
			} catch (error) {
				console.error('Failed to delete encounter:', error);
			}
		}
	};

	const handleBackToMonsters = () => {
		navigate('/dm/monsters');
	};

	return (
		<PageContainer>
			<Header>
				<HeaderContent>
					<HeaderLeft>
						<Button variant="secondary" onClick={handleBackToMonsters}>
							← Monsters
						</Button>
						<div>
							<Title>War Room</Title>
							<Subtitle>Plan and balance your encounters</Subtitle>
						</div>
					</HeaderLeft>
					<HeaderRight>
						<Button variant="secondary" onClick={handleCreateNew}>
							+ New Encounter
						</Button>
					</HeaderRight>
				</HeaderContent>
			</Header>

			<MainContent>
				{isLoading ? (
					<div className="text-center text-zinc-500 py-12">Loading...</div>
				) : encounters.length === 0 ? (
					<EmptyState>
						<EmptyStateTitle>No Encounters Yet</EmptyStateTitle>
						<EmptyStateText>
							Create your first encounter to start planning battles!
						</EmptyStateText>
						<Button variant="secondary" onClick={handleCreateNew}>
							Create Encounter
						</Button>
					</EmptyState>
				) : (
					<EncounterGrid>
						{encounters.map((encounter) => (
							<EncounterCard
								key={encounter.id}
								encounter={encounter}
								onEdit={handleEdit}
								onDuplicate={handleDuplicate}
								onDelete={handleDelete}
							/>
						))}
					</EncounterGrid>
				)}
			</MainContent>
		</PageContainer>
	);
};

export default EncounterList;
