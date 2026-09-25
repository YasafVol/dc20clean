import { useId, type ReactNode } from 'react';
import {
	BuildSheet,
	BuildSheetChevron,
	BuildSheetGuidance,
	BuildSheetHeading,
	BuildSheetHeadingRow,
	BuildSheetNumber,
	BuildSheetPanel,
	BuildSheetSection,
	BuildSheetSummary,
	BuildSheetTrigger
} from './EquipmentBuildSheet.styles';

export interface EquipmentBuildSheetStep {
	id: string;
	stepLabel?: string;
	title: string;
	summary: string;
	guidance?: string;
	complete: boolean;
	disabled?: boolean;
	content: ReactNode;
}

interface EquipmentBuildSheetProps {
	ariaLabel: string;
	flowId: string;
	activeStepId: string;
	steps: EquipmentBuildSheetStep[];
	onStepChange: (stepId: string) => void;
}

export default function EquipmentBuildSheet({
	ariaLabel,
	flowId,
	activeStepId,
	steps,
	onStepChange
}: EquipmentBuildSheetProps) {
	const idPrefix = useId();

	return (
		<BuildSheet aria-label={ariaLabel} data-flow-id={flowId}>
			{steps.map((step, index) => {
				const active = step.id === activeStepId;
				const panelId = `${idPrefix}-${step.id}`;
				return (
					<BuildSheetSection key={step.id} $active={active} data-step-id={step.id}>
						<BuildSheetTrigger
							type="button"
							aria-expanded={active}
							aria-controls={panelId}
							aria-current={active ? 'step' : undefined}
							disabled={step.disabled}
							onClick={() => onStepChange(step.id)}
						>
							<BuildSheetNumber $complete={step.complete}>
								{step.stepLabel ?? index + 1}
							</BuildSheetNumber>
							<span>
								<BuildSheetHeadingRow>
									<BuildSheetHeading>{step.title}</BuildSheetHeading>
									{active && step.guidance ? (
										<BuildSheetGuidance>{step.guidance}</BuildSheetGuidance>
									) : null}
								</BuildSheetHeadingRow>
								<BuildSheetSummary>{step.summary}</BuildSheetSummary>
							</span>
							<BuildSheetChevron $active={active} aria-hidden="true">
								⌄
							</BuildSheetChevron>
						</BuildSheetTrigger>
						{active ? <BuildSheetPanel id={panelId}>{step.content}</BuildSheetPanel> : null}
					</BuildSheetSection>
				);
			})}
		</BuildSheet>
	);
}
