/**
 * Tokyo Night Theme for DC20 Character Sheet
 * Modern, dark color palette with excellent contrast
 */

export const theme = {
	// Background colors
	colors: {
		bg: {
			primary: '#1A1B26',
			secondary: '#24283B',
			tertiary: '#414868',
			elevated: '#2C2E3E',
		},

		// Accent colors
		accent: {
			primary: '#7DCFFF',
			secondary: '#BB9AF7',
			warning: '#E0AF68',
			danger: '#F7768E',
			success: '#9ECE6A',
		},

		// Resource colors
		resource: {
			health: '#F7768E',
			mana: '#7AA2F7',
			stamina: '#E0AF68',
			grit: '#9ECE6A',
		},

		// Text colors
		text: {
			primary: '#C0CAF5',
			secondary: '#9AA5CE',
			muted: '#565F89',
			inverse: '#1A1B26',
		},

		// Attribute colors
		attribute: {
			might: '#F7768E',
			agility: '#9ECE6A',
			charisma: '#E0AF68',
			intelligence: '#7DCFFF',
		},

		// Semantic colors
		border: {
			default: '#3B4261',
			focus: '#7DCFFF',
		},
	},

	// Typography
	typography: {
		fontFamily: {
			primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
			mono: "'JetBrains Mono', 'Fira Code', monospace",
		},
		fontSize: {
			xs: '0.75rem', // 12px
			sm: '0.875rem', // 14px
			base: '1rem', // 16px
			lg: '1.125rem', // 18px
			xl: '1.25rem', // 20px
			'2xl': '1.5rem', // 24px
			'3xl': '1.875rem', // 30px
			'4xl': '2.25rem', // 36px
		},
		fontWeight: {
			normal: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
		},
		lineHeight: {
			tight: 1.25,
			normal: 1.5,
			relaxed: 1.75,
		},
	},

	// Spacing
	spacing: {
		1: '0.25rem', // 4px
		2: '0.5rem', // 8px
		3: '0.75rem', // 12px
		4: '1rem', // 16px
		5: '1.25rem', // 20px
		6: '1.5rem', // 24px
		8: '2rem', // 32px
		10: '2.5rem', // 40px
		12: '3rem', // 48px
	},

	// Shadows
	shadows: {
		sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
		md: '0 4px 6px rgba(0, 0, 0, 0.1)',
		lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
		xl: '0 20px 25px rgba(0, 0, 0, 0.3)',
	},

	// Border radius
	borderRadius: {
		sm: '0.25rem',
		md: '0.5rem',
		lg: '0.75rem',
		xl: '1rem',
		full: '9999px',
	},

	// Transitions
	transitions: {
		fast: '150ms ease-in-out',
		base: '200ms ease-in-out',
		slow: '300ms ease-in-out',
	},

	// Z-index
	zIndex: {
		base: 0,
		dropdown: 1000,
		sticky: 1100,
		fixed: 1200,
		modalBackdrop: 1300,
		modal: 1400,
		popover: 1500,
		tooltip: 1600,
	},
} as const;

export type Theme = typeof theme;
