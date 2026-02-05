/**
 * useBreakpoint Hook
 *
 * Detects current screen size breakpoint for responsive behavior.
 * Returns: 'mobile' | 'tablet' | 'desktop' | 'wide'
 *
 * Usage:
 * const breakpoint = useBreakpoint();
 * const isMobile = breakpoint === 'mobile';
 */

import { useState, useEffect } from 'react';
import { theme } from '../styles/theme';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

export const useBreakpoint = (): Breakpoint => {
	// Initialize with SSR-safe approach
	const getBreakpoint = (width: number): Breakpoint => {
		if (width <= theme.breakpoints.mobile) return 'mobile';
		if (width <= theme.breakpoints.tablet) return 'tablet';
		if (width <= theme.breakpoints.desktop) return 'desktop';
		return 'wide';
	};

	const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
		// Only detect on client-side
		if (typeof window !== 'undefined') {
			return getBreakpoint(window.innerWidth);
		}
		return 'desktop'; // SSR default
	});

	useEffect(() => {
		const handleResize = () => {
			const newBreakpoint = getBreakpoint(window.innerWidth);
			setBreakpoint(newBreakpoint);
		};

		// Check on mount
		handleResize();

		// Listen for resize
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return breakpoint;
};

// Convenience hooks for common checks
export const useIsMobile = () => useBreakpoint() === 'mobile';
export const useIsTablet = () => useBreakpoint() === 'tablet';
export const useIsDesktop = () => {
	const bp = useBreakpoint();
	return bp === 'desktop' || bp === 'wide';
};
export const useIsMobileOrTablet = () => {
	const bp = useBreakpoint();
	return bp === 'mobile' || bp === 'tablet';
};
