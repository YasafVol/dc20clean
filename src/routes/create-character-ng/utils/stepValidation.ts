// Step validation functions for character creation
// Returns true if the step is valid, false if invalid

export const validateClass = (): boolean => {
  // Mock validation: Class step fails
  return false;
};

export const validateFeatures = (): boolean => {
  // Mock validation: Features step succeeds
  return true;
};

export const validateAncestry = (): boolean => {
  // Mock validation: Ancestry step succeeds
  return true;
};

export const validateAttributes = (): boolean => {
  // Mock validation: Attributes step fails
  return false;
};

export const validateBackground = (): boolean => {
  // Mock validation: Background step succeeds
  return true;
};

export const validateSpells = (): boolean => {
  // Mock validation: Spells step succeeds (default)
  return true;
};

export const validateFinish = (): boolean => {
  // Mock validation: Finish step succeeds (default)
  return true;
};

// Map step IDs to validation functions
export const stepValidationMap = {
  'class': validateClass,
  'features': validateFeatures,
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