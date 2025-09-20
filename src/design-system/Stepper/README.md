# Stepper Component

A wizard-style stepper component that shows progress through multiple steps. Supports both controlled props and Jotai state management.

## Usage

### Basic Usage (Controlled)

```tsx
import { Stepper, sampleSteps } from '../design-system';

function MyWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Stepper
      steps={sampleSteps}
      current={currentStep}
      onStepClick={setCurrentStep}
    />
  );
}
```

### Using Jotai State

```tsx
import { Provider, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Stepper } from '../design-system';
import { stepperStepsAtom, stepperCurrentStepAtom } from '../atoms/stepperAtom';

function App() {
  return (
    <Provider>
      <MyWizardWithJotai />
    </Provider>
  );
}

function MyWizardWithJotai() {
  // Set initial steps using useSetAtom if needed
  const setSteps = useSetAtom(stepperStepsAtom);
  
  useEffect(() => {
    setSteps([
      { id: 'step1', label: 'First Step' },
      { id: 'step2', label: 'Second Step' },
      { id: 'step3', label: 'Final Step' },
    ]);
  }, [setSteps]);

  return <Stepper useState />;
}
```

## Props

- `steps?: Step[]` - Array of steps (optional when using state management)
- `current?: number` - Current step index (optional when using state management)
- `onStepClick?: (index: number) => void` - Click handler
- `useState?: boolean` - Whether to use state management
- `aria-label?: string` - Accessibility label

## Step Status

- `upcoming` - Step not yet reached (gray)
- `in-progress` - Current step (yellow)
- `completed` - Completed step (green)
- `error` - Step with error (red)

## Storybook

Run `npm run storybook` to see interactive examples and documentation.
