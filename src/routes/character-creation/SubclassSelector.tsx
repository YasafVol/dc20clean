import React, { useState } from 'react';
import styled from 'styled-components';
import type { Subclass, ClassFeature } from '../../lib/rulesdata/schemas/character.schema';
import { getSubclassByName, getFeatureChoiceKey } from '../../lib/rulesdata/classes-data/classUtils';
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
import {
	FeatureCard,
	FeatureTitle,
	FeatureDescription,
	BenefitsList,
	BenefitItem,
	BenefitName,
	BenefitDescription
} from './styles/shared/FeatureDisplay.styles';

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

// Choice UI Styled Components
const ChoicesContainer = styled.div`
	margin-top: 1.5rem;
	padding-top: 1rem;
	border-top: 1px solid rgba(212, 175, 55, 0.3);
`;

const ChoiceSection = styled.div`
	margin-bottom: 2rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

const ChoiceHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
`;

const ChoicePrompt = styled.h5`
	color: #d4af37;
	font-size: 0.95rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin: 0;
`;

const ChoiceStatus = styled.span<{ complete: boolean }>`
	font-size: 0.9rem;
	color: ${(props) => (props.complete ? '#4caf50' : '#ff9800')};
	font-weight: 600;
`;

const ChoiceHint = styled.p`
	font-size: 0.85rem;
	color: rgba(255, 255, 255, 0.6);
	margin: 0 0 1rem 0;
`;

const ChoiceOptions = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 1rem;
`;

const ChoiceOptionCard = styled.div<{ selected: boolean }>`
	padding: 1rem;
	background: rgba(0, 0, 0, 0.3);
	border: 2px solid ${(props) => (props.selected ? '#d4af37' : 'rgba(212, 175, 55, 0.3)')};
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.2s;
	position: relative;

	&:hover {
		border-color: ${(props) => (props.selected ? '#d4af37' : 'rgba(212, 175, 55, 0.6)')};
		transform: translateY(-2px);
	}
`;

const OptionName = styled.h6`
	color: #d4af37;
	font-size: 0.9rem;
	font-weight: 600;
	margin: 0 0 0.5rem 0;
`;

const OptionDescription = styled.p`
	font-size: 0.85rem;
	color: rgba(255, 255, 255, 0.8);
	line-height: 1.4;
	margin: 0;
`;

const SelectedIcon = styled.span`
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
	color: #d4af37;
	font-size: 1.2rem;
`;

interface SubclassSelectorProps {
	classId: string;
	choiceLevel?: number;
	selectedSubclass?: string;
	selectedFeatureChoices?: Record<string, string[]>;
	onSelect: (subclass: string) => void;
	onChoiceChange?: (choiceKey: string, selections: string[]) => void;
}

export function SubclassSelector({
	classId,
	choiceLevel = 1,
	selectedSubclass,
	selectedFeatureChoices = {},
	onSelect,
	onChoiceChange
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

							{/* Show features for all subclasses */}
							{features.length > 0 && (
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

											{/* Show Choices only when this subclass is selected */}
											{isSelected && feature.choices && feature.choices.length > 0 && onChoiceChange && (
												<ChoicesContainer>
													{feature.choices.map((choice) => {
														const choiceKey = getFeatureChoiceKey(classId, subclass.subclassName, choice.id);
														const currentSelections = selectedFeatureChoices[choiceKey] || [];
														const isComplete = currentSelections.length === choice.count;

														const handleOptionClick = (optionName: string) => {
															if (choice.count === 1) {
																// Radio behavior: replace selection
																onChoiceChange(choiceKey, [optionName]);
															} else {
																// Checkbox behavior: toggle in array
																const newSelections = currentSelections.includes(optionName)
																	? currentSelections.filter((s) => s !== optionName)
																	: [...currentSelections, optionName].slice(0, choice.count);
																onChoiceChange(choiceKey, newSelections);
															}
														};

														return (
															<ChoiceSection key={choice.id}>
																<ChoiceHeader>
																	<ChoicePrompt>{choice.prompt}</ChoicePrompt>
																	<ChoiceStatus complete={isComplete}>
																		{isComplete
																			? '✅'
																			: `⚠️ ${currentSelections.length}/${choice.count}`}
																	</ChoiceStatus>
																</ChoiceHeader>
																<ChoiceHint>Select {choice.count} option(s)</ChoiceHint>

																<ChoiceOptions>
																	{choice.options?.map((option) => {
																		const isSelected = currentSelections.includes(option.name);

																		return (
																			<ChoiceOptionCard
																				key={option.name}
																				selected={isSelected}
																				onClick={(e) => {
																					e.stopPropagation(); // Prevent subclass card click
																					handleOptionClick(option.name);
																				}}
																			>
																				<OptionName>{option.name}</OptionName>
																				<OptionDescription>{option.description}</OptionDescription>
																				{isSelected && <SelectedIcon>✓</SelectedIcon>}
																			</ChoiceOptionCard>
																		);
																	})}
																</ChoiceOptions>
															</ChoiceSection>
														);
													})}
												</ChoicesContainer>
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

