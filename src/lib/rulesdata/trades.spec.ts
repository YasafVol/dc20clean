import { describe, it, expect } from 'vitest';
import { tradesData } from './trades';

describe('tradesData', () => {
	it('should contain all original trades and knowledge trades', () => {
		const tradeIds = tradesData.map((t) => t.id);

		// Check for some original trades
		expect(tradeIds).toContain('alchemy');
		expect(tradeIds).toContain('blacksmithing');
		expect(tradeIds).toContain('carpentry');

		// Check for knowledge trades
		expect(tradeIds).toContain('arcana');
		expect(tradeIds).toContain('history');
		expect(tradeIds).toContain('nature');
		expect(tradeIds).toContain('religion');
		expect(tradeIds).toContain('occultism');
	});

	it("should have 'tools' property set to 'none' for all knowledge trades", () => {
		const knowledgeTrades = [
			'arcana',
			'history',
			'nature',
			'religion',
			'occultism',
			'architecture',
			'deciphering',
			'linguistics',
			'survival'
		];

		knowledgeTrades.forEach((tradeId) => {
			const trade = tradesData.find((t) => t.id === tradeId);
			expect(trade).toBeDefined();
			expect(trade?.tools).toBe('none');
		});
	});

	it('should not have undefined tools for any trade', () => {
		const tradesWithUndefinedTools = tradesData.filter((t) => t.tools === undefined);
		expect(tradesWithUndefinedTools).toHaveLength(0);
	});
});
