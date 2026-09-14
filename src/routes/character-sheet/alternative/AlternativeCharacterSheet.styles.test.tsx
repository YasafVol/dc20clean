import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ResourceCards, ResourceSection } from './AlternativeCharacterSheet.styles';

afterEach(cleanup);

describe('alternative resource layout', () => {
	it('keeps the disclosure header outside the responsive card grid', () => {
		render(
			<ResourceSection style={{ width: '1200px' }}>
				<div>Resources</div>
				<ResourceCards data-testid="resource-cards">
					{Array.from({ length: 5 }, (_, index) => (
						<div key={index}>Resource {index + 1}</div>
					))}
				</ResourceCards>
			</ResourceSection>
		);

		const section = screen.getByText('Resources').parentElement;
		const cards = screen.getByTestId('resource-cards');

		expect(section).not.toBeNull();
		expect(getComputedStyle(section!).display).toBe('block');
		expect(getComputedStyle(cards).display).toBe('grid');
		expect(cards.children).toHaveLength(5);
	});
});
