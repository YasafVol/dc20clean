import type { SavedCharacter } from '../types/dataContracts';
import { getPdfVersionForCharacter } from '../rulesdata/versioning/compatibility';
import { normalizeRulesVersion } from '../rulesdata/versioning/rulesVersion';
import { fillPdfFromData } from './fillPdf';
import { transformSavedCharacterToPdfData } from './transformers';

export function getPdfFileName(character: SavedCharacter): string {
	const safeName = (character.finalName || character.id || 'Character')
		.replace(/[^A-Za-z0-9]+/g, '_')
		.replace(/^_+|_+$/g, '')
		.slice(0, 60);
	const rulesVersionLabel = normalizeRulesVersion(character.rulesVersion).replace('dc20-', '');
	return `${safeName || 'Character'}_vDC20-${rulesVersionLabel}.pdf`;
}

export async function createCharacterPdfBlob(character: SavedCharacter): Promise<Blob> {
	const pdfData = transformSavedCharacterToPdfData(character);
	return fillPdfFromData(pdfData, {
		flatten: false,
		version: getPdfVersionForCharacter(character)
	});
}

export async function downloadCharacterPdf(character: SavedCharacter): Promise<void> {
	const blob = await createCharacterPdfBlob(character);
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.download = getPdfFileName(character);
	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
	URL.revokeObjectURL(url);
}
