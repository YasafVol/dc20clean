import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CollapsibleSection from '../CollapsibleSection';

describe('CollapsibleSection', () => {
  it('renders title and toggles content', () => {
    render(
      <CollapsibleSection title="Test Title">
        <div data-testid="content">Hello</div>
      </CollapsibleSection>
    );

    // the content node is rendered but hidden via aria when collapsed
  // With lazy-mount, region should not exist until expanded
  expect(screen.queryByRole('region')).toBeNull();

  const header = screen.getByLabelText(/toggle section/i);
  fireEvent.click(header);

  const region = screen.getByRole('region');
  expect(region).not.toBeNull();
  });
});
