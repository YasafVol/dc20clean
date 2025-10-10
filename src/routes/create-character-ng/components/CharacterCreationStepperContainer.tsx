import React, { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { Stepper } from '../../../design-system';
import {
	stepperCurrentStepAtom,
	characterCreationStepsAtom,
	stepValidationAtom
} from '../../../atoms/stepperAtom';
import { validateAllSteps } from '../utils/stepValidation';
import { useCharacter } from '../../../lib/stores/characterContext';

interface CharacterCreationStepperContainerProps {
	onStepChange?: (stepIndex: number, stepId: string) => void;
}

const CharacterCreationStepperContainer: React.FC<CharacterCreationStepperContainerProps> = ({
	onStepChange
}) => {
	const [currentStep, setCurrentStep] = useAtom(stepperCurrentStepAtom);
	const steps = useAtomValue(characterCreationStepsAtom);
	const [validationResults, setValidationResults] = useAtom(stepValidationAtom);
	const { state: characterState } = useCharacter();

	// Re-validate whenever character state changes
	useEffect(() => {
		const newValidationResults = validateAllSteps(characterState);
		setValidationResults(newValidationResults);
	}, [characterState, setValidationResults]);

	// Map steps with proper status based on current step and validation
	const stepsWithStatus = steps.map((step, index) => {
		let status: 'upcoming' | 'in-progress' | 'completed' | 'error';

		if (index === currentStep) {
			status = 'in-progress';
		} else if (index < currentStep) {
			// Check if this step has validation issues
			const isValid = validationResults[step.id];
			status = isValid === false ? 'error' : 'completed';
		} else {
			status = 'upcoming';
		}

		return {
			...step,
			status
		};
	});

	const handleStepClick = (stepIndex: number) => {
		setCurrentStep(stepIndex);
		const stepId = steps[stepIndex]?.id || '';
		onStepChange?.(stepIndex, stepId);
	};

	const handleBack = () => {
		if (currentStep > 0) {
			const newStep = currentStep - 1;
			const stepId = steps[newStep]?.id || '';

			console.log('🪓 [STEP NAVIGATION - BACK]', {
				from: { step: currentStep, id: steps[currentStep]?.id },
				to: { step: newStep, id: stepId },
				characterState
			});

			setCurrentStep(newStep);
			onStepChange?.(newStep, stepId);
		}
	};

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			// Check if current step is valid before allowing navigation
			const currentStepId = steps[currentStep]?.id;
			const isCurrentStepValid = validationResults[currentStepId];

			if (isCurrentStepValid === false) {
				// Don't allow navigation if current step is invalid
				console.log('🪓 [STEP NAVIGATION - BLOCKED]', {
					reason: 'Current step invalid',
					step: currentStep,
					id: currentStepId,
					characterState
				});
				return;
			}

			const newStep = currentStep + 1;
			const stepId = steps[newStep]?.id || '';

			console.log('🪓 [STEP NAVIGATION - NEXT]', {
				from: { step: currentStep, id: steps[currentStep]?.id },
				to: { step: newStep, id: stepId },
				characterState
			});

			setCurrentStep(newStep);
			onStepChange?.(newStep, stepId);
		}
	};

	// Check if next button should be disabled
	const currentStepId = steps[currentStep]?.id;
	const isCurrentStepValid = validationResults[currentStepId];
	const isNextDisabled = currentStep >= steps.length - 1 || isCurrentStepValid === false;

	return (
		<Stepper
			steps={stepsWithStatus}
			current={currentStep}
			onStepClick={handleStepClick}
			onBack={handleBack}
			onNext={handleNext}
			backLabel="BACK"
			nextLabel="NEXT"
			showNavigation={true}
			useState={false} // Use controlled mode
			nextDisabled={isNextDisabled}
		/>
	);
};

export default CharacterCreationStepperContainer;
