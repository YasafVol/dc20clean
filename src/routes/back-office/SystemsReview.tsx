import { useDeferredValue, useEffect, useState, type ReactNode } from 'react';
import { useQuery } from 'convex/react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { FunctionReturnType } from 'convex/server';
import { backOfficeApi } from './backOfficeApi';
import { Input } from '../../components/ui/input';
import {
	systemDocumentHref,
	systemNavigation,
	resolveSystemLink,
	type SystemAxis
} from './systemNavigation';

function headingId(text: string) {
	return text
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.trim()
		.replace(/\s+/g, '-');
}
function headingText(children: ReactNode): string {
	if (typeof children === 'string' || typeof children === 'number') return String(children);
	if (Array.isArray(children)) return children.map(headingText).join('');
	if (children && typeof children === 'object' && 'props' in children) {
		return headingText((children.props as { children?: ReactNode }).children);
	}
	return '';
}

type SystemList = FunctionReturnType<typeof backOfficeApi.listSystems>;
type SystemDetail = FunctionReturnType<typeof backOfficeApi.getSystem>;

export function SystemsReview() {
	const { documentId } = useParams();
	const [search, setSearch] = useState('');
	const query = useDeferredValue(search.trim());
	const documents = useQuery(backOfficeApi.listSystems, { search: query });
	const document = useQuery(backOfficeApi.getSystem, documentId ? { id: documentId } : 'skip');
	return (
		<SystemsReviewContent
			basePath="/back-office"
			documents={documents}
			document={document}
			search={search}
			onSearch={setSearch}
		/>
	);
}

export function SystemsReviewContent({
	basePath,
	documents,
	document,
	search,
	onSearch
}: {
	basePath: string;
	documents: SystemList | undefined;
	document: SystemDetail | undefined;
	search: string;
	onSearch: (search: string) => void;
}) {
	const { documentId } = useParams();
	const location = useLocation();
	const [axis, setAxis] = useState<SystemAxis>('verticals');
	const [groupId, setGroupId] = useState('');
	const groups = systemNavigation[axis];
	const group = groups.find((entry) => entry.id === groupId);
	const visible = documents?.filter((entry) => !group || group.documents.includes(entry.id));
	const outline =
		document?.markdown.split('\n').flatMap((line) => {
			const match = line.match(/^## (.+)$/);
			return match ? [{ title: match[1], id: headingId(match[1]) }] : [];
		}) ?? [];

	useEffect(() => {
		if (!document || !location.hash) return;
		const frame = requestAnimationFrame(() => {
			try {
				window.document
					.getElementById(decodeURIComponent(location.hash.slice(1)))
					?.scrollIntoView();
			} catch {
				/* Ignore a malformed fragment without interrupting the reader. */
			}
		});
		return () => cancelAnimationFrame(frame);
	}, [document, location.hash]);

	return (
		<>
			<nav className="bo-nav" aria-label="System views">
				{(['verticals', 'flows', 'horizontals'] as const).map((value) => (
					<button
						key={value}
						type="button"
						aria-pressed={axis === value}
						onClick={() => {
							setAxis(value);
							setGroupId('');
						}}
					>
						{value[0].toUpperCase() + value.slice(1)}
					</button>
				))}
			</nav>
			<p className="bo-muted">
				{axis === 'verticals'
					? 'Browse by product area.'
					: axis === 'flows'
						? 'Follow a task across the systems it touches. These are reading paths, not new specifications.'
						: 'Browse the shared systems used across product areas.'}
			</p>
			<div className="bo-groups">
				{groups.map((entry) => (
					<button
						type="button"
						className="bo-card bo-group"
						key={entry.id}
						aria-pressed={groupId === entry.id}
						onClick={() => setGroupId(groupId === entry.id ? '' : entry.id)}
					>
						<h3>{entry.title}</h3>
						<p className="bo-muted">{entry.description}</p>
					</button>
				))}
			</div>
			<div className="bo-controls">
				<Input
					type="search"
					aria-label="Search system documents"
					placeholder="Search all system documents…"
					value={search}
					onChange={(event) => onSearch(event.target.value)}
				/>
				{group && (
					<button className="bo-link" onClick={() => setGroupId('')}>
						Clear area filter
					</button>
				)}
			</div>
			<div className="bo-split">
				<nav className="bo-list" aria-label="System documents">
					{documents === undefined ? (
						<p role="status">Loading systems…</p>
					) : visible?.length === 0 ? (
						<p role="status">No systems match this search and area.</p>
					) : (
						<>
							<p className="bo-muted">
								{visible?.length} documents{group ? ` · ${group.title}` : ''}
							</p>
							{visible?.map((entry) => (
								<Link
									className="bo-row"
									key={entry.id}
									to={systemDocumentHref(entry.id).replace('/back-office', basePath)}
									aria-current={entry.id === documentId ? 'page' : undefined}
								>
									<strong>{entry.title}</strong>
									<small>{entry.purpose}</small>
									<small>Updated {entry.updated || 'date not recorded'}</small>
								</Link>
							))}
						</>
					)}
				</nav>
				<article className="bo-card bo-reader">
					{!documentId ? (
						<>
							<h2>Choose a system</h2>
							<p className="bo-muted">
								Each document describes its purpose, ownership, boundaries, and related systems.
								Select an area or search the full text.
							</p>
						</>
					) : document === undefined ? (
						<p role="status">Loading document…</p>
					) : document === null ? (
						<p role="alert">This system document was not found.</p>
					) : (
						<>
							<div className="bo-document-meta">
								<span className="bo-eyebrow">System specification</span>
								<h2>{document.title}</h2>
								<p className="bo-muted">
									Updated {document.updated || 'date not recorded'} · docs/systems/{document.id}
								</p>
								<dl>
									<dt>Purpose</dt>
									<dd>{document.purpose || 'Not recorded'}</dd>
									<dt>Owns</dt>
									<dd>{document.owns || 'Not recorded'}</dd>
									<dt>Outside scope</dt>
									<dd>{document.excludes || 'Not recorded'}</dd>
									<dt>Authority</dt>
									<dd>{document.authoritativeSource || 'Not recorded'}</dd>
								</dl>
							</div>
							<nav className="bo-outline" aria-label="On this page">
								{outline.map((item) => (
									<a key={item.id} href={`#${item.id}`}>
										{item.title}
									</a>
								))}
							</nav>
							<div className="bo-markdown">
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									components={{
										h1: ({ children }) => <h2 id={headingId(headingText(children))}>{children}</h2>,
										h2: ({ children }) => <h2 id={headingId(headingText(children))}>{children}</h2>,
										h3: ({ children }) => <h3 id={headingId(headingText(children))}>{children}</h3>,
										table: ({ children }) => (
											<div className="bo-table-scroll">
												<table>{children}</table>
											</div>
										),
										a: ({ href, children }) => {
											if (!href) return <span>{children}</span>;
											if (/^https?:\/\//.test(href))
												return (
													<a href={href} target="_blank" rel="noreferrer">
														{children}
													</a>
												);
											if (href.startsWith('#')) return <a href={href}>{children}</a>;
											const destination = resolveSystemLink(href, [
												...(documents ?? []).map((entry) => entry.id),
												...Object.values(systemNavigation).flatMap((entries) =>
													entries.flatMap((entry) => entry.documents)
												)
											]);
											return destination ? (
												<Link to={destination.replace('/back-office', basePath)}>{children}</Link>
											) : (
												<span title={`Repository reference: ${href}`}>{children}</span>
											);
										}
									}}
								>
									{document.markdown}
								</ReactMarkdown>
							</div>
						</>
					)}
				</article>
			</div>
		</>
	);
}
