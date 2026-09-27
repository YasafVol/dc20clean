import { useDeferredValue } from 'react';
import { usePaginatedQuery, useQuery } from 'convex/react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import type { FunctionReturnType } from 'convex/server';
import type { Id } from '../../../convex/_generated/dataModel';
import { backOfficeApi } from './backOfficeApi';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

const roles = [
	'artillerist',
	'brute',
	'controller',
	'defender',
	'leader',
	'lurker',
	'skirmisher',
	'support'
] as const;
const tiers = ['standard', 'apex', 'legendary'] as const;
type Role = (typeof roles)[number];
type Tier = (typeof tiers)[number];
const label = (value: string) =>
	value.replace(/_/g, ' ').replace(/^./, (first) => first.toUpperCase());

function MonsterDetail({ id }: { id: string }) {
	const result = useQuery(backOfficeApi.getMonster, { id: id as Id<'monsters'> });
	if (result === undefined) return <p role="status">Loading stat block…</p>;
	if (!result) return <p role="alert">This monster is unavailable or has been deleted.</p>;
	return <MonsterStatBlock result={result} />;
}

export function MonsterStatBlock({
	result
}: {
	result: NonNullable<FunctionReturnType<typeof backOfficeApi.getMonster>>;
}) {
	const { monster, features, missingFeatureIds } = result;
	const origin = monster.isOfficial ? 'Official' : monster.isHomebrew ? 'Homebrew' : 'Custom';
	return (
		<>
			<span className="bo-eyebrow">Stored stat block</span>
			<h2>{monster.name}</h2>
			<p className="bo-muted">
				Level {monster.level} · {label(monster.tier)} · {label(monster.roleId)}
				{monster.size ? ` · ${monster.size}` : ''}
				{monster.monsterType ? ` ${monster.monsterType}` : ''}
			</p>
			<div className="bo-tags">
				<Badge>{origin}</Badge>
				<Badge variant="outline">{label(monster.approvalStatus)}</Badge>
				<Badge variant="outline">{label(monster.visibility)}</Badge>
			</div>
			{monster.description && <p>{monster.description}</p>}
			<div className="bo-stats">
				{[
					['HP', monster.finalHP],
					['PD', monster.finalPD],
					['AD', monster.finalAD],
					['Attack', monster.finalAttack],
					['Save DC', monster.finalSaveDC],
					['Base damage', monster.finalBaseDamage]
				].map(([name, value]) => (
					<div className="bo-stat" key={name}>
						<span>{name}</span>
						<strong>{value}</strong>
					</div>
				))}
			</div>
			<div className="bo-stats">
				{Object.entries(monster.attributes).map(([attribute, value]) => (
					<div className="bo-stat" key={attribute}>
						<span>{label(attribute)}</span>
						<strong>
							{value >= 0 ? '+' : ''}
							{value}
						</strong>
					</div>
				))}
			</div>
			<h3>
				Features · {monster.featurePointsSpent}/{monster.featurePointsMax} points
			</h3>
			{features.length === 0 && missingFeatureIds.length === 0 && (
				<p className="bo-muted">No features recorded.</p>
			)}
			{features.map((feature) => (
				<section className="bo-feature" key={feature.id}>
					<h3>
						{feature.name} <span className="bo-muted">· {feature.pointCost} points</span>
					</h3>
					<p style={{ whiteSpace: 'pre-wrap' }}>{feature.description}</p>
				</section>
			))}
			{missingFeatureIds.length > 0 && (
				<p className="bo-warning">Unresolved feature references: {missingFeatureIds.join(', ')}</p>
			)}
			<h3>Actions</h3>
			{monster.actions.length === 0 && <p className="bo-muted">No actions recorded.</p>}
			{monster.actions.map((action) => (
				<section className="bo-feature" key={action.id}>
					<h3>
						{action.name} <span className="bo-muted">· {action.apCost} AP</span>
					</h3>
					<p className="bo-muted">
						{label(action.type)} · {action.targetDefense.toUpperCase()} · {action.damage}{' '}
						{action.damageType ?? ''} damage
						{action.range !== undefined ? ` · Range ${action.range}` : ''}
						{action.area ? ` · ${action.area}` : ''}
					</p>
					{action.traits?.length ? <p className="bo-muted">{action.traits.join(' · ')}</p> : null}
					<p style={{ whiteSpace: 'pre-wrap' }}>{action.description}</p>
				</section>
			))}
			{monster.lore && (
				<section className="bo-feature">
					<h3>Lore</h3>
					<p style={{ whiteSpace: 'pre-wrap' }}>{monster.lore}</p>
				</section>
			)}
			{monster.tactics && (
				<section className="bo-feature">
					<h3>Tactics</h3>
					<p style={{ whiteSpace: 'pre-wrap' }}>{monster.tactics}</p>
				</section>
			)}
			<section className="bo-feature">
				<h3>Source and record</h3>
				<dl>
					<dt>Catalog</dt>
					<dd>{origin}</dd>
					<dt>Source reference</dt>
					<dd>
						{monster.forkedFrom
							? `Forked from ${monster.forkedFrom.name} (${monster.forkedFrom.type}) on ${monster.forkedFrom.forkedAt}`
							: 'No source document or page reference stored.'}
					</dd>
					<dt>Updated</dt>
					<dd>{monster.lastModified}</dd>
					<dt>Record</dt>
					<dd>{monster.id}</dd>
				</dl>
				{monster.rejectionReason && (
					<>
						<h3>Review note</h3>
						<p>{monster.rejectionReason}</p>
					</>
				)}
			</section>
		</>
	);
}

export function MonstersReview() {
	const { monsterId } = useParams();
	const [params, setParams] = useSearchParams();
	const search = params.get('search') ?? '';
	const deferredSearch = useDeferredValue(search.trim());
	const roleValue = params.get('role') ?? '';
	const tierValue = params.get('tier') ?? '';
	const roleId = roles.includes(roleValue as Role) ? (roleValue as Role) : undefined;
	const tier = tiers.includes(tierValue as Tier) ? (tierValue as Tier) : undefined;
	const { results, status, loadMore } = usePaginatedQuery(
		backOfficeApi.listMonsters,
		{ search: deferredSearch || undefined, roleId, tier },
		{ initialNumItems: 30 }
	);
	const changeFilter = (key: string, value: string) => {
		const next = new URLSearchParams(params);
		if (value) next.set(key, value);
		else next.delete(key);
		setParams(next, { replace: true });
	};
	const detailQuery = new URLSearchParams(params);
	if (search) detailQuery.set('search', search);
	else detailQuery.delete('search');
	return (
		<>
			<div className="bo-controls">
				<Input
					aria-label="Search monsters"
					type="search"
					value={search}
					placeholder="Search monsters by name…"
					onChange={(event) => changeFilter('search', event.target.value)}
				/>
				<label>
					Role
					<select
						aria-label="Monster role"
						value={roleId ?? ''}
						onChange={(event) => changeFilter('role', event.target.value)}
					>
						<option value="">All roles</option>
						{roles.map((role) => (
							<option key={role} value={role}>
								{label(role)}
							</option>
						))}
					</select>
				</label>
				<label>
					Tier
					<select
						aria-label="Monster tier"
						value={tier ?? ''}
						onChange={(event) => changeFilter('tier', event.target.value)}
					>
						<option value="">All tiers</option>
						{tiers.map((value) => (
							<option key={value} value={value}>
								{label(value)}
							</option>
						))}
					</select>
				</label>
				<Button
					variant="outline"
					onClick={() => {
						setParams({}, { replace: true });
					}}
				>
					Reset filters
				</Button>
			</div>
			<p className="bo-muted">
				Official, custom, and homebrew monsters · stored values · read only
			</p>
			<div className="bo-split">
				<nav className="bo-list" aria-label="Monsters">
					{status === 'LoadingFirstPage' ? (
						<p role="status">Loading monsters…</p>
					) : (
						<>
							<p className="bo-muted">
								{results.length} {status === 'Exhausted' ? 'results' : 'loaded'}
							</p>
							{results.length === 0 && <p role="status">No monsters match these filters.</p>}
							{results.map((monster) => (
								<Link
									className="bo-row"
									key={monster._id}
									to={`/back-office/monsters/${monster._id}?${detailQuery}`}
									aria-current={monster._id === monsterId ? 'page' : undefined}
								>
									<strong>{monster.name}</strong>
									<small>
										Level {monster.level} · {label(monster.roleId)} · {label(monster.tier)}
									</small>
									<small>
										{monster.isOfficial ? 'Official' : monster.isHomebrew ? 'Homebrew' : 'Custom'} ·{' '}
										{label(monster.approvalStatus)}
									</small>
								</Link>
							))}
							{status !== 'Exhausted' && (
								<Button
									variant="outline"
									onClick={() => loadMore(30)}
									disabled={status !== 'CanLoadMore'}
								>
									{status === 'LoadingMore' ? 'Loading…' : 'Load more monsters'}
								</Button>
							)}
						</>
					)}
				</nav>
				<article className="bo-card bo-reader" aria-label="Monster stat block">
					{monsterId ? (
						<MonsterDetail key={monsterId} id={monsterId} />
					) : (
						<>
							<h2>Choose a monster</h2>
							<p className="bo-muted">
								Review its stored statistics, features, actions, and available source information.
							</p>
						</>
					)}
				</article>
			</div>
		</>
	);
}
