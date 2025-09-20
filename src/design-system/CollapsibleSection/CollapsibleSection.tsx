import React, { useState } from 'react';
import { SectionWrapper, Header, Title, ToggleIcon, Content } from './CollapsibleSection.styles';

type Props = {
  title: React.ReactNode;
  defaultExpanded?: boolean;
  selected?: boolean; // when the title is selected
  action?: React.ReactNode; // optional action button that might be another design-system component
  children?: React.ReactNode; // content rendered when expanded
  'aria-label'?: string;
};

export const CollapsibleSection: React.FC<Props> = ({ title, defaultExpanded = false, selected = false, action, children, 'aria-label': ariaLabel }) => {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);

  const toggle = () => setExpanded((s) => !s);

  return (
    <SectionWrapper>
      <Header onClick={toggle} aria-expanded={expanded} aria-label={ariaLabel ?? 'Toggle section'} $expanded={expanded}>
  <Title $selected={selected} $expanded={expanded}>{title}</Title>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {action}
          <ToggleIcon aria-hidden>{expanded ? '▾' : '▸'}</ToggleIcon>
        </div>
      </Header>

      {expanded ? (
        <Content $expanded={expanded} role="region" aria-hidden={false}>
          {children}
        </Content>
      ) : null}
    </SectionWrapper>
  );
};

export default CollapsibleSection;
