import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { breakpoints } from '../../../styles/responsive';
import { useBreakpoint } from './useBreakpoint';

function setViewportWidth(width: number) {
	Object.defineProperty(window, 'innerWidth', {
		configurable: true,
		value: width
	});
	window.dispatchEvent(new Event('resize'));
}

describe('useBreakpoint', () => {
	afterEach(() => {
		setViewportWidth(1024);
	});

	it('defines exactly two shared breakpoint values', () => {
		expect(breakpoints).toEqual({
			tablet: 768,
			desktop: 1200
		});
	});

	it.each([
		[767, 'mobile'],
		[768, 'tablet'],
		[1199, 'tablet'],
		[1200, 'desktop']
	] as const)('maps %ipx to %s', (width, expected) => {
		setViewportWidth(width);
		const { result } = renderHook(() => useBreakpoint());

		expect(result.current).toBe(expected);
	});

	it('updates when the viewport crosses a breakpoint', () => {
		setViewportWidth(767);
		const { result } = renderHook(() => useBreakpoint());

		act(() => setViewportWidth(768));
		expect(result.current).toBe('tablet');

		act(() => setViewportWidth(1200));
		expect(result.current).toBe('desktop');
	});
});
