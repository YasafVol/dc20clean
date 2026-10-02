import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import type { FunctionReturnType } from 'convex/server';
import type { Id } from '../../../convex/_generated/dataModel';
import systems from '../../../convex/backOfficeData/systems.json';
import { backOfficeApi } from './backOfficeApi';
import { ReviewWorkspace } from './BackOffice';
import { SystemsReviewContent } from './SystemsReview';
import { MonstersReviewContent, MonsterStatBlock } from './MonstersReview';

type MonsterDetail = NonNullable<FunctionReturnType<typeof backOfficeApi.getMonster>>;

const caveStalker: MonsterDetail = {
	monster: {
		_id: 'sample-cave-stalker' as Id<'monsters'>,
		_creationTime: 1,
		id: 'sample-cave-stalker',
		name: 'Sample Cave Stalker',
		level: 3,
		tier: 'standard',
		roleId: 'lurker',
		isOfficial: false,
		isHomebrew: true,
		finalHP: 15,
		finalPD: 13,
		finalAD: 13,
		finalAttack: 5,
		finalSaveDC: 15,
		finalBaseDamage: 3,
		attributes: { might: 1, agility: 3, charisma: -1, intelligence: 0 },
		featureIds: ['sample-darkvision'],
		featurePointsSpent: 1,
		featurePointsMax: 2,
		actions: [
			{
				id: 'sample-pounce',
				name: 'Pounce',
				apCost: 1,
				type: 'martial',
				targetDefense: 'pd',
				damage: 3,
				description: 'A sample attack used to preview the action layout.'
			}
		],
		visibility: 'private',
		approvalStatus: 'pending',
		createdAt: '2026-10-02',
		lastModified: '2026-10-02',
		schemaVersion: '1.0.0',
		breakdowns: {},
		description: 'Sample data for reviewing the back-office layout.',
		lore: 'This creature exists only in the local preview.',
		tactics: 'Use the filters and detail links to check the review flow.'
	},
	features: [
		{
			id: 'sample-darkvision',
			name: 'Cave Sight',
			description: 'A sample feature description for layout review.',
			pointCost: 1
		}
	],
	missingFeatureIds: []
};

const sampleMonsters: MonsterDetail[] = [
	caveStalker,
	{
		...caveStalker,
		features: [
			{
				id: 'sample-iron-plating',
				name: 'Iron Plating',
				description: 'A sample defensive feature for layout review.',
				pointCost: 1
			}
		],
		monster: {
			...caveStalker.monster,
			_id: 'sample-clockwork-warden' as Id<'monsters'>,
			id: 'sample-clockwork-warden',
			name: 'Sample Clockwork Warden',
			level: 5,
			roleId: 'defender',
			tier: 'apex',
			isHomebrew: false,
			approvalStatus: 'approved',
			visibility: 'public',
			featureIds: ['sample-iron-plating'],
			actions: [{ ...caveStalker.monster.actions[0], id: 'sample-slam', name: 'Slam' }],
			finalHP: 26,
			finalPD: 18,
			finalAD: 17
		}
	},
	{
		...caveStalker,
		features: [
			{
				id: 'sample-mire-sight',
				name: 'Mire Sight',
				description: 'A sample sensory feature for layout review.',
				pointCost: 1
			}
		],
		monster: {
			...caveStalker.monster,
			_id: 'sample-bog-seer' as Id<'monsters'>,
			id: 'sample-bog-seer',
			name: 'Sample Bog Seer',
			level: 2,
			roleId: 'controller',
			tier: 'standard',
			isHomebrew: false,
			approvalStatus: 'approved',
			visibility: 'public',
			featureIds: ['sample-mire-sight'],
			actions: [{ ...caveStalker.monster.actions[0], id: 'sample-mire-bolt', name: 'Mire Bolt' }],
			finalHP: 13
		}
	}
];

function PreviewSystems() {
	const { documentId } = useParams();
	const [search, setSearch] = useState('');
	const matching = systems.filter((entry) =>
		entry.markdown.toLowerCase().includes(search.trim().toLowerCase())
	);
	return (
		<SystemsReviewContent
			basePath="/back-office-preview"
			documents={matching}
			document={systems.find((entry) => entry.id === documentId) ?? null}
			search={search}
			onSearch={setSearch}
		/>
	);
}

function PreviewMonsterDetail({ id }: { id: string }) {
	const detail = sampleMonsters.find((entry) => entry.monster._id === id);
	return detail ? (
		<MonsterStatBlock result={detail} />
	) : (
		<p role="alert">This sample monster was not found.</p>
	);
}

function PreviewMonsters() {
	const [params] = useSearchParams();
	const search = (params.get('search') ?? '').trim().toLowerCase();
	const role = params.get('role');
	const tier = params.get('tier');
	const results = sampleMonsters
		.filter(
			({ monster }) =>
				monster.name.toLowerCase().includes(search) &&
				(!role || monster.roleId === role) &&
				(!tier || monster.tier === tier)
		)
		.map(({ monster }) => ({
			_id: monster._id,
			name: monster.name,
			level: monster.level,
			roleId: monster.roleId,
			tier: monster.tier,
			isOfficial: monster.isOfficial ?? false,
			isHomebrew: monster.isHomebrew,
			approvalStatus: monster.approvalStatus,
			lastModified: monster.lastModified
		}));
	return (
		<MonstersReviewContent
			basePath="/back-office-preview"
			results={results}
			status="Exhausted"
			loadMore={() => {}}
			Detail={PreviewMonsterDetail}
		/>
	);
}

export default function BackOfficePreview() {
	return (
		<main className="back-office">
			<header className="bo-header">
				<div>
					<span className="bo-eyebrow">DC20 · Local review preview</span>
					<h1>Back office</h1>
					<p className="bo-muted">Understand the systems. Review the monsters.</p>
				</div>
			</header>
			<p className="bo-preview-notice" role="note">
				Local preview · system text from this checkout · sample monsters · no account or live data
			</p>
			<ReviewWorkspace
				basePath="/back-office-preview"
				Systems={PreviewSystems}
				Monsters={PreviewMonsters}
			/>
		</main>
	);
}
