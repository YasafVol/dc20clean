import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Features from './Features';

const features = [
	{
		id: 'beastkind',
		name: 'Beastkind',
		description: 'Beastborn trait',
		source: 'ancestry' as const
	},
	{
		id: 'spellcasting-path',
		name: 'Spellcasting Path',
		description: 'Class feature',
		source: 'class' as const
	}
];

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string, options?: { section?: string }) => {
			const labels: Record<string, string> = {
				'characterSheet.featuresAncestryTraits': 'Ancestry Traits',
				'characterSheet.featuresClassFeatures': 'Class Features'
			};
			if (key === 'characterSheet.collapseSection') return `Collapse ${options?.section}`;
			if (key === 'characterSheet.expandSection') return `Expand ${options?.section}`;
			return labels[key] ?? key;
		}
	})
}));

vi.mock('../hooks/CharacterSheetProvider', () => ({
	useCharacterSheet: () => ({ state: { character: {} } }),
	useCharacterFeatures: () => features
}));

afterEach(cleanup);

describe('Features category disclosure', () => {
	it('collapses categories independently without unmounting their rows', () => {
		render(<Features showTitle={false} onFeatureClick={vi.fn()} />);

		const ancestryFeature = screen.getByRole('button', { name: 'Beastkind' });
		fireEvent.click(screen.getByRole('button', { name: 'Collapse Ancestry Traits' }));

		expect(screen.getByRole('button', { name: 'Expand Ancestry Traits' })).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Beastkind' })).not.toBeInTheDocument();
		expect(document.body.contains(ancestryFeature)).toBe(true);
		expect(screen.getByRole('button', { name: 'Spellcasting Path' })).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: 'Expand Ancestry Traits' }));
		expect(screen.getByRole('button', { name: 'Beastkind' })).toBeInTheDocument();
	});
});
