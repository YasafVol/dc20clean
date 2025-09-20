// Step validation functions for character creation
// Returns true if the step is valid, false if invalid

export const validateClassFeatures = (): boolean => {
  // Mock validation: Step 1 fails
  return false;
};

export const validateAncestry = (): boolean => {
  // Mock validation: Step 2 succeeds
  return true;
};

export const validateAttributes = (): boolean => {
  // Mock validation: Step 3 fails
  return false;
};

export const validateBackground = (): boolean => {
  // Mock validation: Step 4 succeeds
  return true;
};

export const validateSpells = (): boolean => {
  // Mock validation: Step 5 succeeds (default)
  return true;
};

export const validateFinish = (): boolean => {
  // Mock validation: Step 6 succeeds (default)
  return true;
};

// Map step IDs to validation functions
export const stepValidationMap = {
  'class': validateClassFeatures,
  'ancestry': validateAncestry,
  'attributes': validateAttributes,
  'background': validateBackground,
  'spells': validateSpells,
  'finish': validateFinish,
};

// Helper function to validate all steps
export const validateAllSteps = () => {
  const results: Record<string, boolean> = {};
  
  Object.entries(stepValidationMap).forEach(([stepId, validationFn]) => {
    results[stepId] = validationFn();
  });
  
  return results;
};