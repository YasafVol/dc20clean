import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';
import { ART_ASSETS } from '../../src/lib/assets/assetCatalog';

type Assessment = {
	sourcePath: string;
	reviewName: string;
	classification: string;
	confidence: 'high' | 'medium' | 'low';
	note: string;
};

const root = fileURLToPath(new URL('../../', import.meta.url));
const dataPath = join(root, 'docs/reviews/curated-art-assessment.json');
const outputPath = join(root, 'docs/reviews/curated-art-index.html');
const assessments = JSON.parse(readFileSync(dataPath, 'utf8')) as Record<string, Assessment>;
const ids = new Set(ART_ASSETS.map((asset) => asset.id));

for (const asset of ART_ASSETS) {
	const assessment = assessments[asset.id];
	if (!assessment) throw new Error(`Missing review metadata: ${asset.id}`);
	if (!['high', 'medium', 'low'].includes(assessment.confidence)) {
		throw new Error(`Invalid confidence: ${asset.id}`);
	}
	if (!existsSync(join(root, 'static', asset.src.slice(1)))) {
		throw new Error(`Missing image: ${asset.src}`);
	}
}
for (const id of Object.keys(assessments)) {
	if (!ids.has(id)) throw new Error(`Review metadata has retired asset ID: ${id}`);
}

const escapeHtml = (value: string) =>
	value.replace(/[&<>"']/g, (character) => {
		const replacements: Record<string, string> = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;'
		};
		return replacements[character];
	});

const packNames: Record<string, string> = {
	'heroic-icons': 'Heroic Icon Pack',
	'heroic-creatures': 'Heroic Creature Pack',
	'monsters-minions': 'Monsters & Minions'
};

const cards = ART_ASSETS.map((asset) => {
	const review = assessments[asset.id];
	const fileName = basename(asset.src);
	const sourceFile = basename(review.sourcePath);
	const search = [
		asset.name,
		review.reviewName,
		review.classification,
		asset.category,
		fileName,
		sourceFile,
		review.note
	].join(' ');
	return `
		<article class="card ${review.confidence !== 'high' ? 'uncertain' : ''}"
			data-pack="${escapeHtml(asset.pack)}"
			data-confidence="${review.confidence}"
			data-search="${escapeHtml(search.toLowerCase())}">
			<div class="image"><img data-asset-src="${escapeHtml(asset.src)}" alt="${escapeHtml(asset.name)}" loading="lazy"></div>
			<div class="card-body">
				<div class="badges"><span>${escapeHtml(packNames[asset.pack])}</span><span class="confidence ${review.confidence}">${review.confidence === 'high' ? 'High confidence' : `${review.confidence === 'medium' ? 'Check label' : 'Needs review'} · ${review.confidence}`}</span></div>
				<h2>${escapeHtml(asset.name)}</h2>
				${review.reviewName !== asset.name ? `<p class="suggestion">Suggested: ${escapeHtml(review.reviewName)}</p>` : ''}
				<p class="classification">${escapeHtml(review.classification)}</p>
				<div class="files"><div><small>Bundled file</small><code>${escapeHtml(fileName)}</code></div><div><small>Original file</small><code>${escapeHtml(sourceFile)}</code></div></div>
				${review.note ? `<p class="note">${escapeHtml(review.note)}</p>` : ''}
				<details><summary>Source path and ID</summary><code>${escapeHtml(review.sourcePath)}</code><code>${escapeHtml(asset.id)}</code></details>
			</div>
		</article>`;
}).join('');

const uncertainCount = ART_ASSETS.filter(
	(asset) => assessments[asset.id].confidence !== 'high'
).length;

const rawHtml = `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Curated art review · DC20Clean</title>
	<style>
		:root { color-scheme: dark; font-family: system-ui, sans-serif; }
		* { box-sizing: border-box; }
		body { margin: 0; background: #1a1b26; color: #c0caf5; }
		main { max-width: 1480px; margin: auto; padding: 32px 24px 64px; }
		h1 { margin: 0 0 8px; color: #e0af68; font-size: 2rem; }
		p { line-height: 1.5; }
		.intro { max-width: 840px; margin: 0 0 22px; color: #a9b1d6; }
		.summary { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 22px; }
		.summary span { padding: 8px 12px; border: 1px solid #414868; border-radius: 8px; background: #24283b; }
		.summary strong { color: #e0af68; }
		.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-bottom: 14px; }
		.controls input[type=search], .controls select { min-height: 42px; padding: 8px 12px; border: 1px solid #565f89; border-radius: 8px; background: #24283b; color: #c0caf5; font: inherit; }
		.controls input[type=search] { flex: 1 1 260px; }
		.controls label { display: flex; align-items: center; gap: 7px; white-space: nowrap; }
		#visible-count { color: #a9b1d6; margin: 0 0 16px; }
		.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
		.card { min-width: 0; overflow: hidden; border: 1px solid #414868; border-radius: 12px; background: #24283b; }
		.card.uncertain { border-color: #e0af68; }
		.card[hidden] { display: none; }
		.image { display: grid; place-items: center; height: 150px; background: #16161e; }
		.image img { width: 112px; height: 112px; object-fit: contain; image-rendering: pixelated; }
		.card-body { padding: 14px; }
		.badges { display: flex; flex-wrap: wrap; gap: 5px; }
		.badges span { padding: 3px 7px; border-radius: 999px; background: #343b58; color: #a9b1d6; font-size: .68rem; }
		.badges .medium, .badges .low { background: #493b2c; color: #e0af68; }
		h2 { margin: 12px 0 4px; color: #e0e4ff; font-size: 1.08rem; }
		.suggestion { margin: 0 0 7px; color: #7aa2f7; font-size: .9rem; }
		.classification { margin: 0 0 12px; color: #bb9af7; font-size: .84rem; }
		.files { display: grid; gap: 8px; }
		.files small { display: block; margin-bottom: 2px; color: #9aa5ce; }
		code { display: block; overflow-wrap: anywhere; color: #c0caf5; font-size: .75rem; }
		.note { padding: 8px 10px; margin: 12px 0 0; border-radius: 7px; background: #352f2e; color: #e6bf87; font-size: .8rem; }
		details { margin-top: 12px; color: #9aa5ce; font-size: .75rem; }
		details code { margin-top: 6px; }
		footer { margin-top: 28px; color: #9aa5ce; font-size: .8rem; }
	</style>
</head>
<body>
	<main>
		<h1>Curated art review</h1>
		<p class="intro">The 70 images selected for the app, with the current catalog name, verified archive filename, review classification, and confidence. Confidence reflects the visible image, source name, and any user review. It does not assess usage rights.</p>
		<div class="summary"><span><strong>40</strong> item icons</span><span><strong>30</strong> creature images</span><span><strong>${uncertainCount}</strong> labels to check</span></div>
		<div class="controls">
			<input id="search" type="search" placeholder="Search name, file or classification" aria-label="Search assets">
			<select id="pack" aria-label="Filter by pack"><option value="all">All packs</option><option value="heroic-icons">Heroic Icon Pack</option><option value="heroic-creatures">Heroic Creature Pack</option><option value="monsters-minions">Monsters & Minions</option></select>
			<label><input id="uncertain" type="checkbox"> Labels to check only</label>
		</div>
		<p id="visible-count"></p>
		<div class="grid">${cards}</div>
		<footer>Generated from <code>src/lib/assets/assetCatalog.ts</code> and <code>docs/reviews/curated-art-assessment.json</code>. Rebuild with <code>./node_modules/.bin/vite-node scripts/assets/generateCuratedArtIndex.ts</code>.</footer>
	</main>
	<script>
		const prefix = location.protocol === 'file:' ? '../../static' : '';
		for (const image of document.querySelectorAll('img[data-asset-src]')) image.src = prefix + image.dataset.assetSrc;
		const cards = [...document.querySelectorAll('.card')];
		const search = document.querySelector('#search');
		const pack = document.querySelector('#pack');
		const uncertain = document.querySelector('#uncertain');
		const count = document.querySelector('#visible-count');
		function update() {
			const term = search.value.trim().toLowerCase();
			let visible = 0;
			for (const card of cards) {
				card.hidden = (pack.value !== 'all' && card.dataset.pack !== pack.value) ||
					(uncertain.checked && card.dataset.confidence === 'high') ||
					!card.dataset.search.includes(term);
				if (!card.hidden) visible++;
			}
			count.textContent = visible + ' of ' + cards.length + ' images shown';
		}
		for (const control of [search, pack, uncertain]) control.addEventListener('input', update);
		update();
	</script>
</body>
</html>
`;
const formatOptions = (await prettier.resolveConfig(outputPath)) ?? {};
const html = await prettier.format(rawHtml, { ...formatOptions, filepath: outputPath });

if (process.argv.includes('--check')) {
	if (readFileSync(outputPath, 'utf8') !== html) throw new Error('Curated art index is stale');
} else {
	writeFileSync(outputPath, html);
}
