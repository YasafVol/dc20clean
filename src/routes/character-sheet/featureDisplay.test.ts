import { describe, expect, it } from 'vitest';
import type { SavedCharacter } from '../../lib/types/dataContracts';
import { buildProgressionFeatureEntries } from './featureDisplay';

const bard = {
	classId: 'bard',
	className: 'Bard',
	level: 3,
	selectedSubclass: 'Jester',
	selectedTalents: ['bard_expanded_repertoire'],
	selectedMulticlassOption: 'novice',
	selectedMulticlassClass: 'commander',
	selectedMulticlassFeature: "Commander's Call",
	pathPointAllocations: { martial: 1 }
} as SavedCharacter;

describe('buildProgressionFeatureEntries', () => {
	it('includes eligible core, selected subclass, and selected talent entries', () => {
		const entries = buildProgressionFeatureEntries(bard);

		expect(entries).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: 'Bardic Performance', source: 'class' }),
				expect.objectContaining({ name: 'Antagonizing Act', source: 'subclass' }),
				expect.objectContaining({ name: 'Comedian', source: 'subclass' }),
				expect.objectContaining({ name: 'Expanded Repertoire', source: 'talent' }),
				expect.objectContaining({ name: "Commander's Call", source: 'talent' }),
				expect.objectContaining({ name: 'Martial Path', source: 'path' })
			])
		);
		expect(entries.some((entry) => entry.name === 'Expert Bard')).toBe(false);
	});

	it('does not invent subclass or talent entries when selections are absent', () => {
		const entries = buildProgressionFeatureEntries({
			...bard,
			selectedSubclass: undefined,
			selectedTalents: [],
			selectedMulticlassOption: null,
			selectedMulticlassClass: null,
			selectedMulticlassFeature: null,
			pathPointAllocations: {}
		});

		expect(entries.some((entry) => entry.source === 'subclass')).toBe(false);
		expect(entries.some((entry) => entry.source === 'talent')).toBe(false);
		expect(entries.some((entry) => entry.source === 'path')).toBe(false);
	});
});
