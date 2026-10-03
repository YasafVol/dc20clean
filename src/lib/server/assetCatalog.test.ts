import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ART_ASSETS, getArtAsset } from '../assets/assetCatalog';

describe('curated art catalog', () => {
	it('resolves stable IDs to actual bundled PNG files', () => {
		expect(ART_ASSETS).toHaveLength(70);
		expect(new Set(ART_ASSETS.map((asset) => asset.id)).size).toBe(ART_ASSETS.length);
		expect(ART_ASSETS.filter((asset) => asset.kind === 'item')).toHaveLength(40);
		expect(ART_ASSETS.filter((asset) => asset.kind === 'creature')).toHaveLength(30);

		for (const asset of ART_ASSETS) {
			expect(getArtAsset(asset.id)).toBe(asset);
			const bytes = readFileSync(resolve(process.cwd(), 'static', asset.src.slice(1)));
			expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
		}
		expect(getArtAsset('missing-id')).toBeUndefined();
	});
});
