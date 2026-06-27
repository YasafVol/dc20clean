import { afterEach, describe, expect, it, vi } from 'vitest';
import { fillPdfFromData } from './fillPdf';

describe('fillPdfFromData', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('throws a clear error when the template request returns HTML', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(
				async () => new Response('<html></html>', { headers: { 'content-type': 'text/html' } })
			)
		);

		await expect(fillPdfFromData({} as any)).rejects.toThrow(
			'PDF template request returned text/html instead of application/pdf'
		);
	});

	it('throws a clear error when the template body is not PDF bytes', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(
				async () =>
					new Response(new TextEncoder().encode('<html></html>'), {
						headers: { 'content-type': '' }
					})
			)
		);

		await expect(fillPdfFromData({} as any)).rejects.toThrow(
			'PDF template request did not return a PDF document'
		);
	});
});
