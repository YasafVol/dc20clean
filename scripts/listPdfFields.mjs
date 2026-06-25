import path from 'node:path';
import { extractPdfFieldSchema } from './pdf/pdfFieldAuditService.mjs';

async function main() {
	const pdfPath = path.resolve(
		process.cwd(),
		process.argv[2] ?? 'src/lib/pdf/095/DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf'
	);
	const result = await extractPdfFieldSchema(pdfPath);
	console.log(JSON.stringify(result.fields, null, 2));
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
