import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { PDFDocument } from 'pdf-lib';

async function main() {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);
  const pdfPath = path.resolve(
    currentDirPath,
    '../src/lib/pdf/095/DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf'
  );
  const bytes = readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(bytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  const result = fields.map((field) => ({ name: field.getName(), type: field.constructor.name }));
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});


