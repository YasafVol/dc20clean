import React, { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Stepper } from '../../../design-system';
import {
	stepperCurrentStepAtom,
	characterCreationStepsAtom,
	stepValidationAtom
} from '../../../atoms/stepperAtom';
import { validateAllSteps } from '../utils/stepValidation';

interface CharacterCreationStepperContainerProps {
	onStepChange?: (stepIndex: number, stepId: string) => void;
}

const CharacterCreationStepperContainer: React.FC<CharacterCreationStepperContainerProps> = ({
	onStepChange
}) => {
	const [currentStep, setCurrentStep] = useAtom(stepperCurrentStepAtom);
	const steps = useAtomValue(characterCreationStepsAtom);
	const setValidationResults = useSetAtom(stepValidationAtom);

	// Initialize validation on mount
	useEffect(() => {
		const validationResults = validateAllSteps();
		setValidationResults(validationResults);
	}, [setValidationResults]);

	// Get current validation results
	const validationResults = useAtomValue(stepValidationAtom);

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
			setCurrentStep(newStep);
			const stepId = steps[newStep]?.id || '';
			onStepChange?.(newStep, stepId);
		}
	};

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			const newStep = currentStep + 1;
			setCurrentStep(newStep);
			const stepId = steps[newStep]?.id || '';
			onStepChange?.(newStep, stepId);
		}
	};

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
		/>
	);
};

export default CharacterCreationStepperContainer;
