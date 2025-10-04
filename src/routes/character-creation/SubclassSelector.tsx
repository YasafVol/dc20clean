import React, { useState } from 'react';
import styled from 'styled-components';
import type { Subclass, ClassFeature } from '../../lib/rulesdata/schemas/character.schema';
import { barbarianClass } from '../../lib/rulesdata/classes-data/features/barbarian_features';
import { clericClass } from '../../lib/rulesdata/classes-data/features/cleric_features';
import { druidClass } from '../../lib/rulesdata/classes-data/features/druid_features';
import { wizardClass } from '../../lib/rulesdata/classes-data/features/wizard_features';
import { hunterClass } from '../../lib/rulesdata/classes-data/features/hunter_features';
import { championClass } from '../../lib/rulesdata/classes-data/features/champion_features';
import { rogueClass } from '../../lib/rulesdata/classes-data/features/rogue_features';
import { sorcererClass } from '../../lib/rulesdata/classes-data/features/sorcerer_features';
import { spellbladeClass } from '../../lib/rulesdata/classes-data/features/spellblade_features';
import { warlockClass } from '../../lib/rulesdata/classes-data/features/warlock_features';
import { bardClass } from '../../lib/rulesdata/classes-data/features/bard_features';
import { commanderClass } from '../../lib/rulesdata/classes-data/features/commander_features';
import { monkClass } from '../../lib/rulesdata/classes-data/features/monk_features';
import { psionClass } from '../../lib/rulesdata/classes-data/features/psion_features';

// Map of class IDs to their feature definitions
const CLASS_FEATURES_MAP: Record<string, any> = {
	barbarian: barbarianClass,
	cleric: clericClass,
	druid: druidClass,
	wizard: wizardClass,
	hunter: hunterClass,
	champion: championClass,
	rogue: rogueClass,
	sorcerer: sorcererClass,
	spellblade: spellbladeClass,
	warlock: warlockClass,
	bard: bardClass,
	commander: commanderClass,
	monk: monkClass,
	psion: psionClass
};

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

const SubclassFeaturesList = styled.div`
	margin-top: 1rem;
	padding-top: 1rem;
	border-top: 1px solid rgba(212, 175, 55, 0.3);
`;

const FeatureCard = styled.div`
	background: rgba(0, 0, 0, 0.2);
	border: 1px solid rgba(139, 69, 19, 0.3);
	border-radius: 6px;
	padding: 1rem;
	margin-bottom: 0.75rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

const FeatureTitle = styled.h5`
	font-family: 'Cinzel', serif;
	font-size: 1rem;
	color: #d4af37;
	margin: 0 0 0.5rem 0;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

const FeatureDescription = styled.p`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.9rem;
	color: rgba(255, 255, 255, 0.8);
	margin: 0 0 0.75rem 0;
	line-height: 1.4;
`;

const BenefitsList = styled.div`
	margin-top: 0.75rem;
`;

const BenefitItem = styled.div`
	padding: 0.5rem 0.75rem;
	margin-bottom: 0.5rem;
	background: rgba(139, 69, 19, 0.1);
	border-left: 2px solid rgba(212, 175, 55, 0.4);
	border-radius: 3px;

	&:last-child {
		margin-bottom: 0;
	}
`;

const BenefitName = styled.h6`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.85rem;
	color: #d4af37;
	font-weight: 600;
	margin: 0 0 0.25rem 0;
`;

const BenefitDescription = styled.p`
	font-family: 'Urbanist', sans-serif;
	font-size: 0.8rem;
	color: rgba(255, 255, 255, 0.7);
	margin: 0;
	line-height: 1.3;
`;

interface SubclassSelectorProps {
	classId: string;
	choiceLevel?: number;
	selectedSubclass?: string;
	onSelect: (subclass: string) => void;
}

export function SubclassSelector({
	classId,
	choiceLevel = 1,
	selectedSubclass,
	onSelect
}: SubclassSelectorProps) {
	// Get full subclass data from class features
	const classFeatures = CLASS_FEATURES_MAP[classId];
	const subclasses: Subclass[] = classFeatures?.subclasses || [];

	if (subclasses.length === 0) {
		return null; // No subclasses available for this class
	}

	// Filter features by level gained
	const getFeaturesByLevel = (subclass: Subclass): ClassFeature[] => {
		return subclass.features?.filter((f) => f.levelGained <= choiceLevel) || [];
	};

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
				{subclasses.map((subclass) => {
					const isSelected = selectedSubclass === subclass.subclassName;
					const features = getFeaturesByLevel(subclass);

					return (
						<SubclassCard
							key={subclass.subclassName}
							selected={isSelected}
							onClick={() => onSelect(subclass.subclassName)}
						>
							<SubclassHeader>
								<RadioIndicator selected={isSelected} />
								<SubclassName>{subclass.subclassName}</SubclassName>
							</SubclassHeader>
							{subclass.description && (
								<SubclassDescription>{subclass.description}</SubclassDescription>
							)}

							{/* Show features when selected */}
							{isSelected && features.length > 0 && (
								<SubclassFeaturesList>
									{features.map((feature, idx) => (
										<FeatureCard key={feature.id || `${feature.featureName}-${idx}`}>
											<FeatureTitle>{feature.featureName}</FeatureTitle>
											{feature.description && (
												<FeatureDescription>{feature.description}</FeatureDescription>
											)}

											{/* Show Benefits */}
											{feature.benefits && feature.benefits.length > 0 && (
												<BenefitsList>
													{feature.benefits.map((benefit, benefitIdx) => (
														<BenefitItem key={benefit.name || benefitIdx}>
															<BenefitName>{benefit.name}</BenefitName>
															{benefit.description && (
																<BenefitDescription>{benefit.description}</BenefitDescription>
															)}
														</BenefitItem>
													))}
												</BenefitsList>
											)}
										</FeatureCard>
									))}
								</SubclassFeaturesList>
							)}
						</SubclassCard>
					);
				})}
			</SubclassGrid>
		</Container>
	);
}

