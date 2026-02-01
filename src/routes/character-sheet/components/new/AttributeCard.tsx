import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';

interface Skill {
	name: string;
	value: number;
	proficiency?: 'none' | 'trained' | 'expertise';
}

interface AttributeCardProps {
	attribute: 'might' | 'agility' | 'charisma' | 'intelligence';
	value: number;
	save: number;
	skills: Skill[];
	isPrime?: boolean;
	onSkillClick?: (skillName: string) => void;
	className?: string;
}

const Container = styled(motion.div)<{ $color: string; $isPrime: boolean }>`
	background: ${theme.colors.bg.secondary};
	border-radius: ${theme.borderRadius.lg};
	padding: ${theme.spacing[4]};
	box-shadow: ${theme.shadows.md};
	cursor: pointer;
	border: 2px solid ${(props) => (props.$isPrime ? props.$color : 'transparent')};
	position: relative;
	overflow: hidden;
	transition: all ${theme.transitions.base};

	&:hover {
		box-shadow: ${theme.shadows.lg};
		transform: translateY(-2px);
		border-color: ${(props) => props.$color};
	}

	${(props) =>
		props.$isPrime &&
		`
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 3px;
			background: ${props.$color};
		}
	`}
`;

const AttributeAbbr = styled.div<{ $color: string }>`
	color: ${(props) => props.$color};
	font-size: ${theme.typography.fontSize['2xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	text-align: center;
	margin-bottom: ${theme.spacing[2]};
`;

const AttributeValue = styled.div`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize['3xl']};
	font-weight: ${theme.typography.fontWeight.bold};
	text-align: center;
	margin-bottom: ${theme.spacing[2]};
	line-height: ${theme.typography.lineHeight.tight};
`;

const SaveLabel = styled.div`
	color: ${theme.colors.text.secondary};
	font-size: ${theme.typography.fontSize.xs};
	text-transform: uppercase;
	letter-spacing: 0.05em;
	text-align: center;
	margin-top: ${theme.spacing[2]};
`;

const SaveValue = styled.div`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.semibold};
	text-align: center;
`;

const PrimeBadge = styled(motion.div)<{ $color: string }>`
	position: absolute;
	top: ${theme.spacing[2]};
	right: ${theme.spacing[2]};
	background: ${(props) => props.$color};
	color: ${theme.colors.text.inverse};
	font-size: ${theme.typography.fontSize.xs};
	font-weight: ${theme.typography.fontWeight.bold};
	padding: ${theme.spacing[1]} ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.full};
	text-transform: uppercase;
	letter-spacing: 0.05em;
`;

const SkillsContainer = styled(motion.div)`
	margin-top: ${theme.spacing[3]};
	padding-top: ${theme.spacing[3]};
	border-top: 1px solid ${theme.colors.border.default};
`;

const SkillRow = styled(motion.div)<{ $proficiency?: string }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${theme.spacing[2]};
	border-radius: ${theme.borderRadius.md};
	margin-bottom: ${theme.spacing[1]};
	background: ${(props) =>
		props.$proficiency === 'expertise'
			? 'rgba(125, 207, 255, 0.1)'
			: props.$proficiency === 'trained'
				? 'rgba(125, 207, 255, 0.05)'
				: 'transparent'};
	transition: all ${theme.transitions.fast};

	&:hover {
		background: ${theme.colors.bg.tertiary};
		transform: translateX(4px);
	}

	&:last-child {
		margin-bottom: 0;
	}
`;

const SkillName = styled.span`
	color: ${theme.colors.text.primary};
	font-size: ${theme.typography.fontSize.sm};
	font-weight: ${theme.typography.fontWeight.medium};
`;

const SkillValue = styled.span`
	color: ${theme.colors.accent.primary};
	font-size: ${theme.typography.fontSize.base};
	font-weight: ${theme.typography.fontWeight.bold};
`;

const ProficiencyIcon = styled.span<{ $proficiency?: string }>`
	margin-left: ${theme.spacing[2]};
	font-size: ${theme.typography.fontSize.xs};
	color: ${(props) =>
		props.$proficiency === 'expertise'
			? theme.colors.accent.primary
			: props.$proficiency === 'trained'
				? theme.colors.accent.secondary
				: theme.colors.text.muted};
`;

export const AttributeCard: React.FC<AttributeCardProps> = ({
	attribute,
	value,
	save,
	skills,
	isPrime = false,
	onSkillClick,
	className,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const colorValue = theme.colors.attribute[attribute] || theme.colors.accent.primary;

	const attributeNames = {
		might: 'MIG',
		agility: 'AGI',
		charisma: 'CHA',
		intelligence: 'INT',
	};

	const getProficiencyIcon = (proficiency?: string) => {
		switch (proficiency) {
			case 'expertise':
				return '★';
			case 'trained':
				return '●';
			default:
				return '○';
		}
	};

	return (
		<Container
			$color={colorValue}
			$isPrime={isPrime}
			className={className}
			onClick={() => setIsExpanded(!isExpanded)}
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			{isPrime && (
				<PrimeBadge
					$color={colorValue}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
				>
					Prime
				</PrimeBadge>
			)}

			<AttributeAbbr $color={colorValue}>{attributeNames[attribute]}</AttributeAbbr>

			<AttributeValue>{value >= 0 ? `+${value}` : value}</AttributeValue>

			<SaveLabel>Save</SaveLabel>
			<SaveValue>{save >= 0 ? `+${save}` : save}</SaveValue>

			<AnimatePresence>
				{isExpanded && skills.length > 0 && (
					<SkillsContainer
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
					>
						{skills.map((skill, index) => (
							<SkillRow
								key={skill.name}
								$proficiency={skill.proficiency}
								onClick={(e) => {
									e.stopPropagation();
									onSkillClick?.(skill.name);
								}}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.05 }}
							>
								<SkillName>
									{skill.name}
									<ProficiencyIcon $proficiency={skill.proficiency}>
										{getProficiencyIcon(skill.proficiency)}
									</ProficiencyIcon>
								</SkillName>
								<SkillValue>{skill.value >= 0 ? `+${skill.value}` : skill.value}</SkillValue>
							</SkillRow>
						))}
					</SkillsContainer>
				)}
			</AnimatePresence>
		</Container>
	);
};
