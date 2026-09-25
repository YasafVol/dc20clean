import type { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../../character-sheet/styles/theme';

export type CreationSource = 'fresh' | 'preset';

interface CreationSourceSwitchProps {
	category: string;
	source: CreationSource;
	onSourceChange: (source: CreationSource) => void;
	fresh: ReactNode;
	preset: ReactNode;
}

const Choices = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: ${theme.spacing[2]};
	margin-bottom: ${theme.spacing[4]};
`;

const Choice = styled.button<{ $selected: boolean }>`
	min-width: 0;
	min-height: 48px;
	padding: ${theme.spacing[3]};
	border: 1px solid
		${(props) => (props.$selected ? theme.colors.accent.warning : theme.colors.border.default)};
	border-radius: ${theme.borderRadius.md};
	background: ${(props) =>
		props.$selected ? theme.colors.accent.warningAlpha10 : theme.colors.bg.secondary};
	color: ${(props) => (props.$selected ? theme.colors.accent.warning : theme.colors.text.primary)};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	cursor: pointer;

	&:hover {
		border-color: ${theme.colors.accent.warning};
	}

	&:focus-visible {
		outline: 2px solid ${theme.colors.border.focus};
		outline-offset: 2px;
	}
`;

const Content = styled.div`
	margin-bottom: ${theme.spacing[6]};
`;

export default function CreationSourceSwitch({
	category,
	source,
	onSourceChange,
	fresh,
	preset
}: CreationSourceSwitchProps) {
	return (
		<div>
			<Choices role="group" aria-label={`${category} starting point`}>
				<Choice
					type="button"
					$selected={source === 'fresh'}
					aria-pressed={source === 'fresh'}
					onClick={() => onSourceChange('fresh')}
				>
					Start Fresh
				</Choice>
				<Choice
					type="button"
					$selected={source === 'preset'}
					aria-pressed={source === 'preset'}
					onClick={() => onSourceChange('preset')}
				>
					Load a Preset
				</Choice>
			</Choices>
			<Content>{source === 'fresh' ? fresh : preset}</Content>
		</div>
	);
}
