import React, { useEffect } from 'react';
import {
	StyledContainer,
	StyledTitle,
	StyledContent,
	StyledInstruction,
	StyledNote
} from './Features.styles';
import { useCharacter } from '../../../../lib/stores/characterContext';
import { classesData } from '../../../../lib/rulesdata/loaders/class.loader';
import {
	getStep2FeatureChoices,
	extractFeatureGrants
} from '../../../../lib/services/classFeatures.service';
import FeatureChoiceSelector from '../class/components/FeatureChoiceSelector';

const Features: React.FC = () => {
	const { state, dispatch } = useCharacter();

	// Apply feature grants when component loads (only once when class is set)
	useEffect(() => {
		if (!state.classId) return;

		const selectedClass = classesData.find((c) => c.id === state.classId);
		if (!selectedClass) return;

		// Extract what this class grants
		const grants = extractFeatureGrants(selectedClass.name);

		// Apply grants to character state
		dispatch({
			type: 'UPDATE_STORE',
			updates: {
				grantedTechniques: grants.techniques,
				grantedManeuvers: grants.maneuvers,
				grantedSpells: grants.spells,
				grantedAbilities: grants.abilities
			}
		});

		console.log('🪓 [STEP 2 - FEATURE GRANTS APPLIED]', {
			className: selectedClass.name,
			grants,
			characterState: { ...state, ...grants }
		});
	}, [state.classId]); // Only run when classId changes

	// If no class selected, show message
	if (!state.classId) {
		return (
			<StyledContainer>
				<StyledTitle>Class Features</StyledTitle>
				<StyledContent>
					<p>Please select a class first before choosing features.</p>
				</StyledContent>
			</StyledContainer>
		);
	}

	// Get the selected class data
	const selectedClass = classesData.find((c) => c.id === state.classId);
	if (!selectedClass) {
		return (
			<StyledContainer>
				<StyledTitle>Class Features</StyledTitle>
				<StyledContent>
					<p>Error: Selected class not found.</p>
				</StyledContent>
			</StyledContainer>
		);
	}

	// Get Step 2 choices (excludes spell/maneuver choices - those are in later steps)
	const featureChoices = getStep2FeatureChoices(
		selectedClass.name,
		selectedClass.levelProgression?.[0]
	);

	if (featureChoices.length === 0) {
		return (
			<StyledContainer>
				<StyledTitle>Class Features - {selectedClass.name}</StyledTitle>
				<StyledContent>
					<p>No feature choices available for this class at level 1.</p>
					<StyledNote>(Spell and maneuver choices will be handled in later steps)</StyledNote>
				</StyledContent>
			</StyledContainer>
		);
	}

	const handleFeatureChoice = (choiceId: string, value: string, isSelected?: boolean) => {
		const currentChoices = { ...state.selectedFeatureChoices };

		if (isSelected !== undefined) {
			// Multiple choice (checkbox)
			const currentValues = Array.isArray(currentChoices[choiceId])
				? [...(currentChoices[choiceId] as string[])]
				: [];

			if (isSelected) {
				if (!currentValues.includes(value)) {
					currentValues.push(value);
				}
			} else {
				const index = currentValues.indexOf(value);
				if (index > -1) {
					currentValues.splice(index, 1);
				}
			}

			currentChoices[choiceId] = currentValues;
		} else {
			// Single choice (radio)
			currentChoices[choiceId] = value;
		}

		dispatch({
			type: 'SET_FEATURE_CHOICES',
			selectedFeatureChoices: currentChoices
		});

		console.log('🪓 [STEP 2 - FEATURE CHOICE MADE]', {
			choiceId,
			value,
			isSelected,
			allChoices: currentChoices,
			characterState: { ...state, selectedFeatureChoices: currentChoices }
		});
	};

	return (
		<StyledContainer>
			<StyledTitle>Class Features - {selectedClass.name}</StyledTitle>
			<StyledContent>
				<StyledInstruction>
					Choose your class features, techniques, and specializations.
				</StyledInstruction>

				{featureChoices.map((choice) => (
					<FeatureChoiceSelector
						key={choice.id}
						choice={choice}
						selectedValue={state.selectedFeatureChoices[choice.id] || ''}
						onChange={handleFeatureChoice}
					/>
				))}
			</StyledContent>
		</StyledContainer>
	);
};

export default Features;
