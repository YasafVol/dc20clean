// Design System Color Tokens
// Define both hex values and CSS custom property names

export const colorTokens = {
  // Primary Brand Colors
  primary: '#fbbf24',        // Golden yellow for titles, accents
  primaryDark: '#f59e0b',    // Darker golden for hover states
  
  // Text Colors
  textPrimary: '#ffffff',    // Primary white text
  textSecondary: '#e5e7eb',  // Secondary light gray text
  textMuted: '#9ca3af',      // Muted gray text
  textDark: '#1e1b4b',       // Dark text for light backgrounds
  
  // Status Colors
  success: '#10b981',        // Green for completed states
  successDark: '#059669',    // Darker green
  error: '#ef4444',          // Red for error states
  errorDark: '#dc2626',      // Darker red
  warning: '#fbbf24',        // Yellow for warning states
  
  // UI Colors
  border: '#6b7280',         // Default border color
  borderLight: '#9ca3af',    // Light border color
  background: '#000000',     // Primary background
  backgroundSecondary: '#1f2937', // Secondary background
  backgroundOverlay: 'rgba(0, 0, 0, 0.9)', // Overlay backgrounds
  
  // Legacy design tokens (existing)
  sectionBorder: '#0C0C0C',
  titleSelected: '#823434',
  titleDefault: '#1E1E1E',
  actionButtonBg: '#823434',
  actionButtonText: '#D9D9D9',
} as const;

// CSS Custom Properties mapping
export const cssVariables = {
  // Primary Brand Colors
  '--color-primary': colorTokens.primary,
  '--color-primary-dark': colorTokens.primaryDark,
  
  // Text Colors
  '--color-text-primary': colorTokens.textPrimary,
  '--color-text-secondary': colorTokens.textSecondary,
  '--color-text-muted': colorTokens.textMuted,
  '--color-text-dark': colorTokens.textDark,
  
  // Status Colors
  '--color-success': colorTokens.success,
  '--color-success-dark': colorTokens.successDark,
  '--color-error': colorTokens.error,
  '--color-error-dark': colorTokens.errorDark,
  '--color-warning': colorTokens.warning,
  
  // UI Colors
  '--color-border': colorTokens.border,
  '--color-border-light': colorTokens.borderLight,
  '--color-background': colorTokens.background,
  '--color-background-secondary': colorTokens.backgroundSecondary,
  '--color-background-overlay': colorTokens.backgroundOverlay,
  
  // Legacy colors
  '--color-section-border': colorTokens.sectionBorder,
  '--color-title-selected': colorTokens.titleSelected,
  '--color-title-default': colorTokens.titleDefault,
  '--color-action-button-bg': colorTokens.actionButtonBg,
  '--color-action-button-text': colorTokens.actionButtonText,
} as const;

// Helper function to inject CSS variables into the document
export const injectCSSVariables = () => {
  const root = document.documentElement;
  Object.entries(cssVariables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

// CSS variable accessor functions (for use in styled-components)
export const colors = {
  // Primary Brand Colors
  primary: 'var(--color-primary)',
  primaryDark: 'var(--color-primary-dark)',
  
  // Text Colors
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  textMuted: 'var(--color-text-muted)',
  textDark: 'var(--color-text-dark)',
  
  // Status Colors
  success: 'var(--color-success)',
  successDark: 'var(--color-success-dark)',
  error: 'var(--color-error)',
  errorDark: 'var(--color-error-dark)',
  warning: 'var(--color-warning)',
  
  // UI Colors
  border: 'var(--color-border)',
  borderLight: 'var(--color-border-light)',
  background: 'var(--color-background)',
  backgroundSecondary: 'var(--color-background-secondary)',
  backgroundOverlay: 'var(--color-background-overlay)',
  
  // Legacy colors (for backwards compatibility)
  sectionBorder: 'var(--color-section-border)',
  titleSelected: 'var(--color-title-selected)',
  titleDefault: 'var(--color-title-default)',
  actionButtonBg: 'var(--color-action-button-bg)',
  actionButtonText: 'var(--color-action-button-text)',
} as const;

export default colors;
