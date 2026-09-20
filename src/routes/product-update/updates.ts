export interface ProductUpdateSummary {
	slug: string;
	date: string;
	dateTime: string;
	kicker: string;
	area: string;
	title: string;
	excerpt: string;
	highlights: string[];
	updateHref: string;
	featureHref: string;
	featureLabel: string;
}

/**
 * The update index is intentionally data-first so future releases can add one
 * stable dated entry without changing the index layout.
 */
export const productUpdates: ProductUpdateSummary[] = [
	{
		slug: '2026-09-18-alternative-character-sheet',
		date: 'September 18, 2026',
		dateTime: '2026-09-18',
		kicker: 'Product update',
		area: 'Character',
		title: 'The new character sheet',
		excerpt:
			'A faster, clearer place to run your character at the table—with focused sections, responsive layouts, and complete pickers for the actions you use most.',
		highlights: [
			'Focused combat view',
			'Complete weapon, spell, and maneuver pickers',
			'Same saved character, new presentation'
		],
		updateHref: '/updates/2026-09-18-alternative-character-sheet',
		featureHref: '/character2',
		featureLabel: 'Open the alternative sheet'
	}
];

export const latestProductUpdate = productUpdates[0];
