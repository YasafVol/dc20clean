import { describe, it, expect } from 'vitest';
import { tradesData } from './trades';

describe('tradesData', () => {
	it('should contain exactly 28 trades as per DC20 0.95 rules', () => {
		expect(tradesData).toHaveLength(28);
	});

	it('should contain all official DC20 0.95 trades', () => {
		const tradeIds = tradesData.map((t) => t.id);

		// Artistry (3)
		expect(tradeIds).toContain('illustration');
		expect(tradeIds).toContain('musician');
		expect(tradeIds).toContain('theatre');

		// Crafting (9)
		expect(tradeIds).toContain('alchemy');
		expect(tradeIds).toContain('blacksmithing');
		expect(tradeIds).toContain('glassblowing');
		expect(tradeIds).toContain('herbalism');
		expect(tradeIds).toContain('jeweler');
		expect(tradeIds).toContain('leatherworking');
		expect(tradeIds).toContain('sculpting');
		expect(tradeIds).toContain('tinkering');
		expect(tradeIds).toContain('weaving');

		// Services (6)
		expect(tradeIds).toContain('brewing');
		expect(tradeIds).toContain('carpentry');
		expect(tradeIds).toContain('cartography');
		expect(tradeIds).toContain('cooking');
		expect(tradeIds).toContain('masonry');
		expect(tradeIds).toContain('vehicles');

		// Subterfuge (4)
		expect(tradeIds).toContain('cryptography');
		expect(tradeIds).toContain('disguise');
		expect(tradeIds).toContain('gaming');
		expect(tradeIds).toContain('lockpicking');

		// Knowledge (6)
		expect(tradeIds).toContain('arcana');
		expect(tradeIds).toContain('engineering');
		expect(tradeIds).toContain('history');
		expect(tradeIds).toContain('nature');
		expect(tradeIds).toContain('occultism');
		expect(tradeIds).toContain('religion');
	});

	it("should have 'tools' property set to 'none' for all knowledge trades", () => {
		const knowledgeTrades = ['arcana', 'engineering', 'history', 'nature', 'occultism', 'religion'];

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

	it('should include primaryAttribute within attributeAssociations for every trade', () => {
		tradesData.forEach((trade) => {
			expect(trade.attributeAssociations.length).toBeGreaterThan(0);
			expect(trade.attributeAssociations).toContain(trade.primaryAttribute);
		});
	});

	it('should configure multi-attribute trades as specified', () => {
		const brewing = tradesData.find((trade) => trade.id === 'brewing');
		expect(brewing?.attributeAssociations).toEqual(['agility', 'intelligence', 'charisma']);

		const cooking = tradesData.find((trade) => trade.id === 'cooking');
		expect(cooking?.attributeAssociations).toEqual(['agility', 'intelligence', 'charisma']);

		const vehicles = tradesData.find((trade) => trade.id === 'vehicles');
		expect(vehicles?.attributeAssociations).toEqual(['agility', 'intelligence', 'might']);
		expect(vehicles?.tools).toBe('Vehicle');
	});
});
