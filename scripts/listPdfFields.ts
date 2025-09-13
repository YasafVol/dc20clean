/*
  Usage: ts-node scripts/listPdfFields.ts | tee docs/systems/pdf-form-fields-v0.9.5.json
*/
import { readFileSync } from 'node:fs';
import { PDFDocument } from 'pdf-lib';
import path from 'node:path';

async function main() {
  const pdfPath = path.resolve(__dirname, '../src/lib/pdf/095/DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf');
  const bytes = readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(bytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  const result = fields.map((f) => ({ name: f.getName(), type: f.constructor.name }));
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


