/**
 * Validation Feedback Components
 *
 * These components display validation errors and warnings from the central calculator.
 */

import React from 'react';
import type { ValidationError, BuildStep } from '../../../lib/types/effectSystem';

interface InlineErrorProps {
	errors: ValidationError[];
	currentStep: BuildStep;
}

export const InlineError: React.FC<InlineErrorProps> = ({ errors, currentStep }) => {
	const stepErrors = errors.filter((e) => e.step === currentStep);
	if (stepErrors.length === 0) return null;

	return (
		<div
			style={{
				background: '#fef2f2',
				border: '1px solid #fecaca',
				color: '#dc2626',
				padding: '1rem',
				borderRadius: '8px',
				margin: '1rem 0'
			}}
		>
			<strong>Attention Needed:</strong>
			<ul style={{ margin: '0.5rem 0 0 1rem', padding: 0 }}>
				{stepErrors.map((error, index) => (
					<li key={`${error.field}-${index}`}>{error.message}</li>
				))}
			</ul>
		</div>
	);
};

interface GlobalValidationBannerProps {
	errors: ValidationError[];
	isVisible?: boolean;
}

export const GlobalValidationBanner: React.FC<GlobalValidationBannerProps> = ({
	errors,
	isVisible = true
}) => {
	if (!isVisible || errors.length === 0) return null;

	return (
		<div
			style={{
				background: '#fee2e2',
				border: '2px solid #fecaca',
				color: '#991b1b',
				padding: '1rem',
				borderRadius: '8px',
				margin: '1rem 0',
				fontWeight: 'bold'
			}}
		>
			<div>⚠️ Character has validation errors ({errors.length})</div>
			<div style={{ fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 'normal' }}>
				Review the highlighted sections to complete your character.
			</div>
		</div>
	);
};
