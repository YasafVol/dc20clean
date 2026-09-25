import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ART_ASSETS, getArtAsset, type ArtAsset } from '../lib/assets/assetCatalog';
import { theme } from '../routes/character-sheet/styles/theme';

interface AssetPickerProps {
	kind: ArtAsset['kind'];
	value?: string;
	onChange: (id: string | undefined) => void;
	label?: string;
}

export default function AssetPicker({ kind, value, onChange, label }: AssetPickerProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [category, setCategory] = useState('all');
	const [selectedId, setSelectedId] = useState(value);
	const selected = getArtAsset(value);
	const options = useMemo(() => ART_ASSETS.filter((asset) => asset.kind === kind), [kind]);
	const categories = useMemo(
		() => ['all', ...new Set(options.map((asset) => asset.category))],
		[options]
	);
	const filtered = useMemo(
		() =>
			options.filter(
				(asset) =>
					(category === 'all' || asset.category === category) &&
					`${asset.name} ${asset.category} ${asset.pack}`
						.toLowerCase()
						.includes(query.toLowerCase())
			),
		[options, category, query]
	);
	const chosen = getArtAsset(selectedId);

	useEffect(() => {
		if (!open) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false);
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [open]);

	const start = () => {
		setSelectedId(value);
		setCategory('all');
		setQuery('');
		setOpen(true);
	};

	return (
		<>
			<div style={{ color: theme.colors.text.primary }}>
				{label && (
					<div style={{ marginBottom: 8, color: theme.colors.text.secondary, fontSize: 14 }}>
						{label}
					</div>
				)}
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					<button
						type="button"
						onClick={start}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 10,
							minHeight: 50,
							padding: '6px 12px',
							color: theme.colors.text.primary,
							background: theme.colors.bg.elevated,
							border: `1px solid ${theme.colors.border.default}`,
							borderRadius: 8
						}}
					>
						{selected && (
							<img
								src={selected.src}
								alt=""
								width={32}
								height={32}
								style={{ imageRendering: 'pixelated', objectFit: 'contain' }}
							/>
						)}
						<span>{selected?.name ?? (kind === 'item' ? 'Choose icon' : 'Choose art')}</span>
					</button>
					{value && (
						<button
							type="button"
							onClick={() => onChange(undefined)}
							style={{ color: theme.colors.text.secondary, textDecoration: 'underline' }}
						>
							Remove
						</button>
					)}
				</div>
			</div>
			{open &&
				createPortal(
					<div
						role="presentation"
						onMouseDown={(event) => {
							if (event.target === event.currentTarget) setOpen(false);
						}}
						style={{
							position: 'fixed',
							inset: 0,
							zIndex: 1000,
							display: 'grid',
							placeItems: 'center',
							padding: 16,
							background: 'rgba(0, 0, 0, 0.72)'
						}}
					>
						<div
							role="dialog"
							aria-modal="true"
							aria-label={kind === 'item' ? 'Choose item icon' : 'Choose creature art'}
							style={{
								width: 'min(880px, 100%)',
								maxHeight: 'min(720px, 90vh)',
								display: 'flex',
								flexDirection: 'column',
								overflow: 'hidden',
								color: theme.colors.text.primary,
								background: theme.colors.bg.secondary,
								border: `1px solid ${theme.colors.border.default}`,
								borderRadius: 12,
								boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
							}}
						>
							<header
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: 18,
									borderBottom: `1px solid ${theme.colors.border.default}`
								}}
							>
								<strong style={{ fontSize: 18, color: theme.colors.accent.warning }}>
									{kind === 'item' ? 'Choose an icon' : 'Choose creature art'}
								</strong>
								<button
									type="button"
									onClick={() => setOpen(false)}
									aria-label="Close asset picker"
									style={{ color: theme.colors.text.secondary }}
								>
									✕
								</button>
							</header>
							<div
								style={{
									display: 'flex',
									gap: 10,
									flexWrap: 'wrap',
									padding: 16,
									borderBottom: `1px solid ${theme.colors.border.default}`
								}}
							>
								<input
									autoFocus
									aria-label="Search art"
									value={query}
									onChange={(event) => setQuery(event.target.value)}
									placeholder="Search..."
									style={{
										flex: '1 1 240px',
										padding: '8px 12px',
										color: theme.colors.text.primary,
										background: theme.colors.bg.primary,
										border: `1px solid ${theme.colors.border.default}`,
										borderRadius: 7
									}}
								/>
								<select
									aria-label="Art category"
									value={category}
									onChange={(event) => setCategory(event.target.value)}
									style={{
										padding: '8px 12px',
										color: theme.colors.text.primary,
										background: theme.colors.bg.primary,
										border: `1px solid ${theme.colors.border.default}`,
										borderRadius: 7
									}}
								>
									{categories.map((item) => (
										<option key={item} value={item}>
											{item === 'all' ? 'All categories' : item}
										</option>
									))}
								</select>
							</div>
							<div style={{ display: 'flex', minHeight: 0, flex: 1 }}>
								<div
									style={{
										flex: 1,
										overflowY: 'auto',
										padding: 16,
										display: 'grid',
										gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))',
										gap: 10,
										alignContent: 'start'
									}}
								>
									{filtered.map((asset) => (
										<button
											key={asset.id}
											type="button"
											onClick={() => setSelectedId(asset.id)}
											aria-pressed={selectedId === asset.id}
											style={{
												display: 'grid',
												justifyItems: 'center',
												gap: 7,
												padding: 9,
												minHeight: 106,
												color: theme.colors.text.primary,
												background:
													selectedId === asset.id
														? theme.colors.crystal.primaryAlpha20
														: theme.colors.bg.elevated,
												border: `1px solid ${selectedId === asset.id ? theme.colors.accent.primary : theme.colors.border.default}`,
												borderRadius: 8,
												textAlign: 'center'
											}}
										>
											<img
												src={asset.src}
												alt=""
												width={56}
												height={56}
												loading="lazy"
												style={{ imageRendering: 'pixelated', objectFit: 'contain' }}
											/>
											<span style={{ fontSize: 12, lineHeight: 1.2 }}>{asset.name}</span>
										</button>
									))}
									{filtered.length === 0 && <p>No matching art.</p>}
								</div>
								{chosen?.kind === kind && (
									<aside
										style={{
											width: 180,
											padding: 16,
											borderLeft: `1px solid ${theme.colors.border.default}`,
											display: 'grid',
											alignContent: 'start',
											gap: 8
										}}
									>
										<img
											src={chosen.src}
											alt=""
											width={128}
											height={128}
											style={{ width: '100%', imageRendering: 'pixelated', objectFit: 'contain' }}
										/>
										<strong>{chosen.name}</strong>
										<small style={{ color: theme.colors.text.secondary }}>
											{chosen.category} · {chosen.pack}
										</small>
									</aside>
								)}
							</div>
							<footer
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									gap: 10,
									padding: 16,
									borderTop: `1px solid ${theme.colors.border.default}`
								}}
							>
								<button
									type="button"
									onClick={() => setOpen(false)}
									style={{ padding: '8px 16px', color: theme.colors.text.primary }}
								>
									Cancel
								</button>
								<button
									type="button"
									disabled={!chosen || chosen.kind !== kind}
									onClick={() => {
										onChange(selectedId);
										setOpen(false);
									}}
									style={{
										padding: '8px 18px',
										color: theme.colors.bg.primary,
										background: theme.colors.accent.primary,
										borderRadius: 7,
										opacity: chosen?.kind === kind ? 1 : 0.5
									}}
								>
									Use selected art
								</button>
							</footer>
						</div>
					</div>,
					document.body
				)}
		</>
	);
}
