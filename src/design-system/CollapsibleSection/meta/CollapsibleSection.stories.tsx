import { StoryObj } from '@storybook/react';
import CollapsibleSection from '../CollapsibleSection';
import { Button } from '../../';

export default {
  title: 'DesignSystem/CollapsibleSection',
  component: CollapsibleSection,
};

type Story = StoryObj<typeof CollapsibleSection>;

export const Default: Story = {
  args: {
    title: 'DWARF',
    defaultExpanded: true,
    selected: true,
    action: (
  <Button label="Choose this Ancestry" bg="#AD393B" />
    ),
    children: (
      <div>
        <p>Content goes here — this can be any React node or design-system component.</p>
      </div>
    ),
  },
};
