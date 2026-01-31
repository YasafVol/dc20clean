/**
 * Monster List Page
 *
 * Displays all user's monsters and approved homebrew.
 * Entry point to the Monster Designer.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { useMonsters, useHomebrewMonsters } from '../../../lib/hooks/useMonsters';
import type { SavedMonster } from '../../../lib/rulesdata/schemas/monster.schema';
import { MonsterCard } from './components/MonsterCard';
import {
	PageContainer,
	Header,
	HeaderContent,
	HeaderLeft,
	HeaderRight,
	Title,
	Subtitle,
	MainContent,
	MonsterGrid,
	EmptyState,
	EmptyStateTitle,
	EmptyStateText,
} from './styles/MonsterStyles';

type TabType = 'my-monsters' | 'homebrew' | 'trash';

export const MonsterList: React.FC = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<TabType>('my-monsters');

	const {
		monsters: myMonsters,
		isLoading: isLoadingMy,
		deleteMonster,
		duplicateMonster,
		forkMonster,
	} = useMonsters();

	const { monsters: homebrewMonsters, isLoading: isLoadingHomebrew } = useHomebrewMonsters();

	const handleCreateNew = () => {
		navigate('/dm/monsters/new');
	};

	const handleEdit = (monster: SavedMonster) => {
		navigate(`/dm/monsters/${monster.id}`);
	};

	const handleDuplicate = async (monster: SavedMonster) => {
		try {
			const result = await duplicateMonster(monster.id);
			navigate(`/dm/monsters/${result.id}`);
		} catch (error) {
			console.error('Failed to duplicate monster:', error);
		}
	};

	const handleDelete = async (monster: SavedMonster) => {
		if (confirm(`Delete "${monster.name}"? It will be moved to trash.`)) {
			try {
				await deleteMonster(monster.id);
			} catch (error) {
				console.error('Failed to delete monster:', error);
			}
		}
	};

	const handleFork = async (monster: SavedMonster) => {
		try {
			const result = await forkMonster(monster.id, 'homebrew', monster);
			navigate(`/dm/monsters/${result.id}`);
		} catch (error) {
			console.error('Failed to fork monster:', error);
		}
	};

	const handleBack = () => {
		navigate('/menu');
	};

	const isLoading = activeTab === 'my-monsters' ? isLoadingMy : isLoadingHomebrew;
	const monsters = activeTab === 'my-monsters' ? myMonsters : homebrewMonsters;

	return (
		<PageContainer>
			<Header>
				<HeaderContent>
					<HeaderLeft>
						<Button variant="secondary" onClick={handleBack}>
							← Menu
						</Button>
						<div>
							<Title>Monster Laboratory</Title>
							<Subtitle>Design and manage your monsters</Subtitle>
						</div>
					</HeaderLeft>
				<HeaderRight>
					<Button variant="secondary" onClick={() => navigate('/dm/encounters')}>
						War Room
					</Button>
					<Button variant="secondary" onClick={handleCreateNew}>
						+ New Monster
					</Button>
				</HeaderRight>
				</HeaderContent>
			</Header>

			<MainContent>
				{/* Tabs */}
				<div className="flex gap-2 mb-6">
					<button
						type="button"
						className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
							activeTab === 'my-monsters'
								? 'bg-purple-600 text-white'
								: 'bg-black/30 text-zinc-400 hover:text-white'
						}`}
						onClick={() => setActiveTab('my-monsters')}
					>
						My Monsters ({myMonsters.length})
					</button>
					<button
						type="button"
						className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
							activeTab === 'homebrew'
								? 'bg-purple-600 text-white'
								: 'bg-black/30 text-zinc-400 hover:text-white'
						}`}
						onClick={() => setActiveTab('homebrew')}
					>
						Homebrew Library ({homebrewMonsters.length})
					</button>
				</div>

				{/* Content */}
				{isLoading ? (
					<div className="text-center text-zinc-500 py-12">Loading...</div>
				) : monsters.length === 0 ? (
					<EmptyState>
						<EmptyStateTitle>
							{activeTab === 'my-monsters'
								? 'No Monsters Yet'
								: 'No Homebrew Monsters'}
						</EmptyStateTitle>
						<EmptyStateText>
							{activeTab === 'my-monsters'
								? 'Create your first monster to get started!'
								: 'No community monsters have been approved yet.'}
						</EmptyStateText>
						{activeTab === 'my-monsters' && (
							<Button variant="secondary" onClick={handleCreateNew}>
								Create Monster
							</Button>
						)}
					</EmptyState>
				) : (
					<MonsterGrid>
						{monsters.map((monster) => (
							<MonsterCard
								key={monster.id}
								monster={monster}
								isOwner={activeTab === 'my-monsters'}
								onEdit={activeTab === 'my-monsters' ? handleEdit : undefined}
								onDuplicate={activeTab === 'my-monsters' ? handleDuplicate : undefined}
								onDelete={activeTab === 'my-monsters' ? handleDelete : undefined}
								onFork={activeTab === 'homebrew' ? handleFork : undefined}
							/>
						))}
					</MonsterGrid>
				)}
			</MainContent>
		</PageContainer>
	);
};

export default MonsterList;
