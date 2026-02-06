import React from 'react';
import styled from 'styled-components';
import {
	StyledMovementContainer,
	StyledMovementGrid,
	StyledMovementStat,
	StyledMovementLabel,
	StyledMovementValue
} from '../styles/Movement.styles';
import Tooltip from './Tooltip';
import { createEnhancedTooltip } from './EnhancedStatTooltips';
import { useCharacterSheet, useCharacterCalculatedData } from '../hooks/CharacterSheetProvider';
import { theme } from '../styles/theme';

// Styled components for alternative movements
const AltMovementSection = styled.div`
	margin-top: ${theme.spacing[3]};
	padding-top: ${theme.spacing[3]};
	border-top: 1px solid ${theme.colors.border.default};
`;

const AltMovementTitle = styled.div`
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${theme.colors.text.secondary};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	margin-bottom: ${theme.spacing[2]};
`;

const AltMovementRow = styled.div<{ $isDefault?: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.md};
	background: ${(props) => (props.$isDefault ? theme.colors.bg.primary : theme.colors.bg.elevated)};
	margin-bottom: ${theme.spacing[1]};

	&:last-child {
		margin-bottom: 0;
	}
`;

const AltMovementType = styled.span<{ $isDefault?: boolean }>`
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	color: ${(props) => (props.$isDefault ? theme.colors.text.muted : theme.colors.text.primary)};
	text-transform: capitalize;
	font-style: ${(props) => (props.$isDefault ? 'italic' : 'normal')};
`;

const AltMovementSpeed = styled.span<{ $isDefault?: boolean }>`
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${(props) => (props.$isDefault ? theme.colors.text.muted : theme.colors.accent.primary)};
`;

const SlowedLabel = styled.span`
	font-size: ${theme.typography.fontSize.xs};
	color: ${theme.colors.text.muted};
	font-style: italic;
	margin-left: ${theme.spacing[1]};
`;

// Senses, Resistances, Combat Training shared styles
const InfoSection = styled.div`
	margin-top: ${theme.spacing[3]};
	padding-top: ${theme.spacing[3]};
	border-top: 1px solid ${theme.colors.border.default};
`;

const InfoRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.md};
	background: ${theme.colors.bg.elevated};
	margin-bottom: ${theme.spacing[1]};

	&:last-child {
		margin-bottom: 0;
	}
`;

const InfoType = styled.span`
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.semibold};
	color: ${theme.colors.text.primary};
	text-transform: capitalize;
`;

const InfoValue = styled.span<{ $color?: string }>`
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.bold};
	color: ${(props) => props.$color || theme.colors.accent.primary};
`;

const VulnerabilityValue = styled(InfoValue)`
	color: #ef4444;
`;

const ResistanceValue = styled(InfoValue)`
	color: #3b82f6;
`;

const TrainingBadge = styled.span`
	font-size: ${theme.typography.fontSize.xs};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	background: ${theme.colors.bg.tertiary};
	border: 1px solid ${theme.colors.border.default};
	border-radius: ${theme.borderRadius.md};
	color: ${theme.colors.text.secondary};
	text-transform: capitalize;
	display: inline-block;
	margin: 2px;
`;

const TrainingContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${theme.spacing[1]};
	margin-top: ${theme.spacing[1]};
`;

interface MovementProps {
	isMobile?: boolean;
}

const Movement: React.FC<MovementProps> = ({ isMobile }) => {
	const { state } = useCharacterSheet();
	const calculation = useCharacterCalculatedData();

	if (!state.character || !calculation) {
		return <div>Loading movement...</div>;
	}

	const breakdowns = calculation.breakdowns;

	// Mobile detection logic
	const effectiveIsMobile = isMobile || (typeof window !== 'undefined' && window.innerWidth <= 768);

	// Use calculated stats for speed and jump distance
	const speed = calculation.stats.finalMoveSpeed;
	const jumpDistance = calculation.stats.finalJumpDistance;

	// Alternative movements from calculator
	const movements = calculation.movements || [];
	const senses = calculation.senses || [];
	const resistances = calculation.resistances || [];
	const vulnerabilities = calculation.vulnerabilities || [];
	const combatTraining = calculation.combatTraining || [];

	// Split movements: always show climb/swim, only show others if granted
	const alwaysShowTypes = ['climb', 'swim'];
	const optionalTypes = ['fly', 'burrow', 'glide'];

	const climbSwimMovements = movements.filter((m) =>
		alwaysShowTypes.includes(m.type.toLowerCase())
	);
	const grantedOptionalMovements = movements.filter(
		(m) => optionalTypes.includes(m.type.toLowerCase()) && !(m as any).isDefault
	);

	const hasAltMovements = climbSwimMovements.length > 0 || grantedOptionalMovements.length > 0;

	return (
		<StyledMovementContainer $isMobile={effectiveIsMobile}>
			<StyledMovementGrid $isMobile={effectiveIsMobile}>
				<StyledMovementStat $isMobile={effectiveIsMobile}>
					<StyledMovementLabel $isMobile={effectiveIsMobile}>MOVE SPEED</StyledMovementLabel>
					<Tooltip
						content={
							breakdowns?.move_speed
								? createEnhancedTooltip('Move Speed', breakdowns.move_speed)
								: `Base Movement Speed: ${speed} ft`
						}
						position="top"
					>
						<StyledMovementValue $isMobile={effectiveIsMobile}>{speed}</StyledMovementValue>
					</Tooltip>
				</StyledMovementStat>
				<StyledMovementStat $isMobile={effectiveIsMobile}>
					<StyledMovementLabel $isMobile={effectiveIsMobile}>JUMP DISTANCE</StyledMovementLabel>
					<Tooltip
						content={
							breakdowns?.jump_distance
								? createEnhancedTooltip('Jump Distance', breakdowns.jump_distance)
								: `Jump Distance: ${jumpDistance} ft`
						}
						position="top"
					>
						<StyledMovementValue $isMobile={effectiveIsMobile}>{jumpDistance}</StyledMovementValue>
					</Tooltip>
				</StyledMovementStat>
			</StyledMovementGrid>

			{/* Alternative Movement Types */}
			{hasAltMovements && (
				<AltMovementSection>
					<AltMovementTitle>Alternative Movement</AltMovementTitle>

					{/* Climb and Swim — always shown */}
					{climbSwimMovements.map((m) => {
						const isDefault = (m as any).isDefault;
						return (
							<Tooltip
								key={m.type}
								content={`Source: ${m.source.name}`}
								position="top"
							>
								<AltMovementRow $isDefault={isDefault}>
									<AltMovementType $isDefault={isDefault}>{m.type}</AltMovementType>
									<AltMovementSpeed $isDefault={isDefault}>
										{m.speed} Spaces
										{isDefault && <SlowedLabel>(Slowed)</SlowedLabel>}
									</AltMovementSpeed>
								</AltMovementRow>
							</Tooltip>
						);
					})}

					{/* Fly, Burrow, Glide — only if granted */}
					{grantedOptionalMovements.map((m) => (
						<Tooltip
							key={m.type}
							content={`Source: ${m.source.name}`}
							position="top"
						>
							<AltMovementRow>
								<AltMovementType>{m.type}</AltMovementType>
								<AltMovementSpeed>{m.speed} Spaces</AltMovementSpeed>
							</AltMovementRow>
						</Tooltip>
					))}
				</AltMovementSection>
			)}

			{/* Senses (6b) */}
			{senses.length > 0 && (
				<InfoSection>
					<AltMovementTitle>Senses</AltMovementTitle>
					{senses.map((s) => (
						<Tooltip key={s.type} content={`Source: ${s.source.name}`} position="top">
							<InfoRow>
								<InfoType>{s.type}</InfoType>
								<InfoValue>{s.range} Spaces</InfoValue>
							</InfoRow>
						</Tooltip>
					))}
				</InfoSection>
			)}

			{/* Resistances & Vulnerabilities (6c) */}
			{(resistances.length > 0 || vulnerabilities.length > 0) && (
				<InfoSection>
					<AltMovementTitle>Resistances & Vulnerabilities</AltMovementTitle>
					{resistances.map((r) => (
						<Tooltip key={r.type} content={`Source: ${r.source.name}`} position="top">
							<InfoRow>
								<InfoType>{r.type}</InfoType>
								<ResistanceValue>
									Resist {r.value === 'half' ? '(Half)' : `(${r.value})`}
								</ResistanceValue>
							</InfoRow>
						</Tooltip>
					))}
					{vulnerabilities.map((v) => (
						<Tooltip key={v.type} content={`Source: ${v.source.name}`} position="top">
							<InfoRow>
								<InfoType>{v.type}</InfoType>
								<VulnerabilityValue>
									Vuln {v.value === 'half' ? '(Half)' : `(${v.value})`}
								</VulnerabilityValue>
							</InfoRow>
						</Tooltip>
					))}
				</InfoSection>
			)}

			{/* Combat Training (6d) */}
			{combatTraining.length > 0 && (
				<InfoSection>
					<AltMovementTitle>Combat Training</AltMovementTitle>
					<TrainingContainer>
						{combatTraining.map((t) => (
							<Tooltip key={t.type} content={`Source: ${t.source.name}`} position="top">
								<TrainingBadge>{t.type}</TrainingBadge>
							</Tooltip>
						))}
					</TrainingContainer>
				</InfoSection>
			)}
		</StyledMovementContainer>
	);
};

export default Movement;
