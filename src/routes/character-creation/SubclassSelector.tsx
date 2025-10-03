import React from 'react';
import styled from 'styled-components';
import { getAvailableSubclasses } from '../../lib/rulesdata/classes-data/classProgressionResolver';

const Container = styled.div`
	margin-top: 2rem;
	padding: 1.5rem;
	background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(101, 67, 33, 0.05) 100%);
	border: 2px solid rgba(139, 69, 19, 0.3);
	border-radius: 8px;
`;

const Header = styled.h3`
	font-family: 'Cinzel', serif;
	font-size: 1.5rem;
	color: #d4af37;
	margin: 0 0 0.5rem 0;
	text-transform: uppercase;
	letter-spacing: 1px;
`;

const LevelBadge = styled.span`
	display: inline-block;
	background: rgba(212, 175, 55, 0.2);
	color: #d4af37;
	padding: 0.25rem 0.75rem;
	border-radius: 4px;
	font-size: 0.9rem;
	margin-left: 0.5rem;
	font-family: 'Urbanist', sans-serif;
	font-weight: 600;
`;

const Description = styled.p`
	font-family: 'Urbanist', sans-serif;
	font-size: 1rem;
	color: rgba(255, 255, 255, 0.7);
	margin: 0 0 1.5rem 0;
	line-height: 1.5;
`;

const SubclassGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 1rem;
`;

const SubclassCard = styled.div<{ selected: boolean }>`
	background: ${(props) =>
		props.selected
			? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(139, 69, 19, 0.15) 100%)'
			: 'rgba(0, 0, 0, 0.3)'};
	border: 2px solid
		${(props) => (props.selected ? '#d4af37' : 'rgba(139, 69, 19, 0.4)')};
	border-radius: 8px;
	padding: 1rem;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		border-color: ${(props) => (props.selected ? '#d4af37' : 'rgba(212, 175, 55, 0.6)')};
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}
`;

const SubclassName = styled.h4`
	font-family: 'Cinzel', serif;
	font-size: 1.1rem;
	color: #d4af37;
	margin: 0 0 0.5rem 0;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

const SubclassDescription = styled.p`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.9rem;
	color: rgba(255, 255, 255, 0.7);
	margin: 0;
	line-height: 1.4;
`;

const RadioIndicator = styled.div<{ selected: boolean }>`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid ${(props) => (props.selected ? '#d4af37' : 'rgba(255, 255, 255, 0.3)')};
	background: ${(props) => (props.selected ? '#d4af37' : 'transparent')};
	display: inline-block;
	margin-right: 0.75rem;
	transition: all 0.2s ease;
	position: relative;

	${(props) =>
		props.selected &&
		`
		&::after {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: #1a1a1a;
		}
	`}
`;

const SubclassHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.5rem;
`;

interface SubclassSelectorProps {
	classId: string;
	choiceLevel?: number;
	selectedSubclass?: string;
	onSelect: (subclass: string) => void;
}

export function SubclassSelector({
	classId,
	choiceLevel,
	selectedSubclass,
	onSelect
}: SubclassSelectorProps) {
	const subclasses = getAvailableSubclasses(classId);

	if (subclasses.length === 0) {
		return null; // No subclasses available for this class
	}

	return (
		<Container>
			<Header>
				Choose Your Subclass
				{choiceLevel && <LevelBadge>Level {choiceLevel}</LevelBadge>}
			</Header>
			<Description>
				Select a subclass to specialize your character's abilities and playstyle. This choice
				is permanent and shapes your character's identity.
			</Description>

			<SubclassGrid>
				{subclasses.map((subclass) => (
					<SubclassCard
						key={subclass.name}
						selected={selectedSubclass === subclass.name}
						onClick={() => onSelect(subclass.name)}
					>
						<SubclassHeader>
							<RadioIndicator selected={selectedSubclass === subclass.name} />
							<SubclassName>{subclass.name}</SubclassName>
						</SubclassHeader>
						{subclass.description && (
							<SubclassDescription>{subclass.description}</SubclassDescription>
						)}
					</SubclassCard>
				))}
			</SubclassGrid>
		</Container>
	);
}

