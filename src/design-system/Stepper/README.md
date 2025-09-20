# Stepper Component

A wizard-style stepper component that shows progress through multiple steps. Supports both controlled props and Recoil state management.

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

### Using Recoil State

```tsx
import { RecoilRoot } from 'recoil';
import { Stepper } from '../design-system';
import { stepperStepsAtom, stepperCurrentStepAtom } from '../atoms/stepperAtom';

function App() {
  return (
    <RecoilRoot>
      <MyWizardWithRecoil />
    </RecoilRoot>
  );
}

function MyWizardWithRecoil() {
  // Set initial steps
  const setSteps = useSetRecoilState(stepperStepsAtom);
  
  useEffect(() => {
    setSteps([
      { id: 'step1', label: 'First Step' },
      { id: 'step2', label: 'Second Step' },
      { id: 'step3', label: 'Final Step' },
    ]);
  }, [setSteps]);

  return <Stepper useRecoil />;
}
```

## Props

- `steps?: Step[]` - Array of steps (optional when using Recoil)
- `current?: number` - Current step index (optional when using Recoil)
- `onStepClick?: (index: number) => void` - Click handler
- `useRecoil?: boolean` - Whether to use Recoil state
- `aria-label?: string` - Accessibility label

## Step Status

- `upcoming` - Step not yet reached (gray)
- `in-progress` - Current step (yellow)
- `completed` - Completed step (green)
- `error` - Step with error (red)

## Storybook

Run `npm run storybook` to see interactive examples and documentation.
