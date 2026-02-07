/**
 * Monster List Page
 *
 * Displays all user's monsters and approved homebrew.
 * Entry point to the Monster Designer.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useMonsters, useHomebrewMonsters } from '../../../lib/hooks/useMonsters';
import type { SavedMonster } from '../../../lib/rulesdata/schemas/monster.schema';
import { MonsterCard } from './components/MonsterCard';
import { getSampleMonsters } from '../../../lib/rulesdata/dm/sampleMonsters';
import { Button } from '../../../components/common/Button';
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
	EmptyStateText
} from './styles/MonsterStyles';

type TabType = 'my-monsters' | 'homebrew' | 'trash';

export const MonsterList: React.FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<TabType>('my-monsters');
	const [isSeeding, setIsSeeding] = useState(false);
	const seedMonstersMutation = useMutation(api.monsters.seedMonsters);

	const {
		monsters: myMonsters,
		isLoading: isLoadingMy,
		deleteMonster,
		duplicateMonster,
		forkMonster
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
		if (confirm(t('dmTools.monsterLab.confirmDelete'))) {
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

	const handleSeedMonsters = async () => {
		if (isSeeding) return;
		setIsSeeding(true);
		try {
			const sampleMonsters = getSampleMonsters();
			const results = await seedMonstersMutation({ monsters: sampleMonsters });
			const successCount = results.filter((r) => r.success).length;
			const failCount = results.filter((r) => !r.success).length;
			if (failCount > 0) {
				alert(`Seeded ${successCount} monsters. ${failCount} skipped (already exist).`);
			} else {
				alert(`Successfully seeded ${successCount} sample monsters!`);
			}
		} catch (error) {
			console.error('Failed to seed monsters:', error);
			alert('Failed to seed monsters. Please try again.');
		} finally {
			setIsSeeding(false);
		}
	};

	const isLoading = activeTab === 'my-monsters' ? isLoadingMy : isLoadingHomebrew;
	const monsters = activeTab === 'my-monsters' ? myMonsters : homebrewMonsters;

	return (
		<PageContainer>
			<Header>
				<HeaderContent>
					<HeaderLeft>
						<div>
							<Title>Monster Laboratory</Title>
							<Subtitle>Design and manage your monsters</Subtitle>
						</div>
					</HeaderLeft>
					<HeaderRight>
						<Button $variant="secondary" onClick={() => navigate('/dm/encounters')}>
						{t('menu.encounterPlanner')}
					</Button>
					<Button $variant="primary" onClick={handleCreateNew}>
						{t('dmTools.monsterLab.createMonster')}
						</Button>
					</HeaderRight>
				</HeaderContent>
			</Header>

			<MainContent>
				{/* Tabs */}
				<div className="mb-6 flex gap-2">
					<button
						type="button"
						className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
							activeTab === 'my-monsters'
								? 'bg-purple-600 text-white'
								: 'bg-black/30 text-zinc-400 hover:text-white'
						}`}
						onClick={() => setActiveTab('my-monsters')}
					>
						{t('dmTools.monsters')} ({myMonsters.length})
					</button>
					<button
						type="button"
						className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
							activeTab === 'homebrew'
								? 'bg-purple-600 text-white'
								: 'bg-black/30 text-zinc-400 hover:text-white'
						}`}
						onClick={() => setActiveTab('homebrew')}
					>
						Homebrew ({homebrewMonsters.length})
					</button>
				</div>

				{/* Content */}
				{isLoading ? (
					<div className="py-12 text-center text-zinc-500">{t('common.loading')}</div>
				) : monsters.length === 0 ? (
					<EmptyState>
						<EmptyStateTitle>
							{activeTab === 'my-monsters' ? t('dmTools.monsterLab.noMonsters') : 'No Homebrew Monsters'}
						</EmptyStateTitle>
						<EmptyStateText>
							{activeTab === 'my-monsters'
								? t('dmTools.monsterLab.noMonsters')
								: 'No community monsters have been approved yet.'}
						</EmptyStateText>
						{activeTab === 'my-monsters' && (
							<div className="flex gap-3">
							<Button $variant="primary" onClick={handleCreateNew}>
								{t('dmTools.monsterLab.createMonster')}
							</Button>
							<Button $variant="secondary" onClick={handleSeedMonsters} disabled={isSeeding}>
								{isSeeding ? t('common.loading') : 'Seed Sample Monsters'}
							</Button>
							</div>
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
