import { describe, expect, it } from 'vitest';
import backgroundReport from '../../../docs/migration/background-v0105-report.json';
import { skillsData } from './skills';
import { tradesData } from './trades';
import { languageCheckDcByFamily, languagesData } from './languages';

describe('DC20 v0.10.5 background source audit', () => {
	const byId = <T extends { id: string }>(left: T, right: T) => left.id.localeCompare(right.id);

	it('matches the generated source skill catalog', () => {
		expect(skillsData).toHaveLength(backgroundReport.skillCount);
		expect(
			skillsData
				.map(({ id, name, attributeAssociation }) => ({
					id,
					name,
					attribute: attributeAssociation
				}))
				.sort(byId)
		).toEqual(
			backgroundReport.skills
				.map(({ id, name, attribute }) => ({
					id,
					name,
					attribute
				}))
				.sort(byId)
		);
	});

	it('matches the generated source trade catalog', () => {
		expect(tradesData).toHaveLength(backgroundReport.tradeCount);
		expect(
			tradesData
				.map(({ id, name, tools, primaryAttribute, attributeAssociations }) => ({
					id,
					name,
					tools,
					primaryAttribute,
					attributeAssociations
				}))
				.sort(byId)
		).toEqual(
			backgroundReport.trades
				.map(({ id, name, tools, primaryAttribute, attributeAssociations }) => ({
					id,
					name,
					tools,
					primaryAttribute,
					attributeAssociations
				}))
				.sort(byId)
		);
	});

	it('matches the generated source language catalog', () => {
		expect(languagesData).toHaveLength(backgroundReport.languageCount);
		expect(
			languagesData
				.map(({ id, name, family, typicalSpeakers, checkDc }) => ({
					id,
					name,
					family,
					typicalSpeakers,
					checkDc
				}))
				.sort(byId)
		).toEqual(
			backgroundReport.languages
				.map(({ id, name, family, typicalSpeakers, checkDc }) => ({
					id,
					name,
					family,
					typicalSpeakers,
					checkDc
				}))
				.sort(byId)
		);
		expect(languageCheckDcByFamily).toEqual({
			mortal: 10,
			exotic: 15,
			divine: 15,
			outer: 20
		});
	});

	it('records the v0.10.5 source conversion contract for follow-up', () => {
		expect(backgroundReport.rules.conversions.map((conversion) => conversion.id)).toEqual([
			'skillToTrade',
			'tradeToLanguage'
		]);
		expect(
			backgroundReport.rules.disallowedConversions.map((conversion) => conversion.id)
		).toContain('tradeToSkill');
	});
});
