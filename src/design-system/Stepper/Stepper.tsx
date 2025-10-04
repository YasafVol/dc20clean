import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
	StepperWrapper,
	StepList,
	StepItem,
	StepLabel,
	StepCircle,
	NavigationButton,
	ButtonIcon
} from './Stepper.styles';
import { stepperCurrentStepAtom, stepperStepsAtom } from '../../atoms/stepperAtom';

export type StepStatus = 'upcoming' | 'in-progress' | 'completed' | 'error';

export type Step = {
	id: string | number;
	label?: string;
	status?: StepStatus;
};

type Props = {
	steps?: Step[]; // optional when using state management
	current?: number; // index of current step when controlled
	onStepClick?: (index: number) => void;
	onBack?: () => void; // Back button handler
	onNext?: () => void; // Next button handler
	backLabel?: string; // Custom back button label
	nextLabel?: string; // Custom next button label
	showNavigation?: boolean; // Whether to show Back/Next buttons
	nextDisabled?: boolean; // Whether to disable the next button (in addition to last step check)
	'aria-label'?: string;
	useState?: boolean; // whether to use State management
};

// Internal component that renders the actual stepper
const StepperContent: React.FC<{
	steps: Step[];
	current?: number;
	onStepClick?: (index: number) => void;
	onBack?: () => void;
	onNext?: () => void;
	backLabel?: string;
	nextLabel?: string;
	showNavigation?: boolean;
	nextDisabled?: boolean;
	'aria-label'?: string;
}> = ({
	steps,
	current,
	onStepClick,
	onBack,
	onNext,
	backLabel = 'BACK',
	nextLabel = 'NEXT',
	showNavigation = true,
	nextDisabled = false,
	'aria-label': ariaLabel
}) => {
	const activeIndex =
		typeof current === 'number' ? current : steps.findIndex((s) => s.status === 'in-progress');

	const isFirstStep = activeIndex <= 0;
	const isLastStep = activeIndex >= steps.length - 1;
	const isNextButtonDisabled = isLastStep || nextDisabled;

	return (
		<StepperWrapper aria-label={ariaLabel ?? 'Stepper navigation'}>
			{showNavigation && (
				<NavigationButton
					$disabled={isFirstStep}
					onClick={onBack}
					disabled={isFirstStep}
					type="button"
				>
					<ButtonIcon>‹</ButtonIcon>
					{backLabel}
				</NavigationButton>
			)}

			<StepList>
				{steps.map((step, idx) => {
					const status =
						step.status ??
						(idx < activeIndex ? 'completed' : idx === activeIndex ? 'in-progress' : 'upcoming');
					const isClickable = typeof onStepClick === 'function' && status !== 'in-progress';

					return (
						<StepItem
							key={step.id}
							$isClickable={!!isClickable}
							onClick={() => isClickable && onStepClick?.(idx)}
						>
							<StepCircle
								$status={status}
								aria-current={status === 'in-progress' ? 'step' : undefined}
								aria-label={`Step ${idx + 1}: ${step.label}`}
							/>

							<StepLabel $muted={status === 'upcoming'}>{step.label}</StepLabel>
						</StepItem>
					);
				})}
			</StepList>

			{showNavigation && (
				<NavigationButton
					$disabled={isNextButtonDisabled}
					onClick={onNext}
					disabled={isNextButtonDisabled}
					type="button"
				>
					{nextLabel}
					<ButtonIcon>›</ButtonIcon>
				</NavigationButton>
			)}
		</StepperWrapper>
	);
};

// Component that uses state management
const StepperWithState: React.FC<
	Pick<
		Props,
		| 'onStepClick'
		| 'onBack'
		| 'onNext'
		| 'backLabel'
		| 'nextLabel'
		| 'showNavigation'
		| 'nextDisabled'
		| 'aria-label'
	>
> = ({
	onStepClick,
	onBack,
	onNext,
	backLabel,
	nextLabel,
	showNavigation,
	nextDisabled,
	'aria-label': ariaLabel
}) => {
	const [currentStep, setCurrentStep] = useAtom(stepperCurrentStepAtom);
	const steps = useAtomValue(stepperStepsAtom);

	const handleStepClick = (idx: number) => {
		setCurrentStep(idx);
		onStepClick?.(idx);
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
		onBack?.();
	};

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
		onNext?.();
	};

	return (
		<StepperContent
			steps={steps}
			current={currentStep}
			onStepClick={handleStepClick}
			onBack={handleBack}
			onNext={handleNext}
			backLabel={backLabel}
			nextLabel={nextLabel}
			showNavigation={showNavigation}
			nextDisabled={nextDisabled}
			aria-label={ariaLabel}
		/>
	);
};

export const Stepper: React.FC<Props> = ({
	steps: propSteps,
	current: propCurrent,
	onStepClick,
	onBack,
	onNext,
	backLabel,
	nextLabel,
	showNavigation = true,
	nextDisabled = false,
	'aria-label': ariaLabel,
	useState = false
}) => {
	if (useState) {
		return (
			<StepperWithState
				onStepClick={onStepClick}
				onBack={onBack}
				onNext={onNext}
				backLabel={backLabel}
				nextLabel={nextLabel}
				showNavigation={showNavigation}
				nextDisabled={nextDisabled}
				aria-label={ariaLabel}
			/>
		);
	}

	return (
		<StepperContent
			steps={propSteps || []}
			current={propCurrent}
			onStepClick={onStepClick}
			onBack={onBack}
			onNext={onNext}
			backLabel={backLabel}
			nextLabel={nextLabel}
			showNavigation={showNavigation}
			nextDisabled={nextDisabled}
			aria-label={ariaLabel}
		/>
	);
};

export default Stepper;
