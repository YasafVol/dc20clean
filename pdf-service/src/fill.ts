import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load the PDF template and field map once to cache them
const pdfTemplatePath = join(process.cwd(), 'pdf-service/src', 'DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf');
const fieldMapPath = join(process.cwd(), 'pdf-service/src', 'DC20_Beta_0_9_5_fields.json');

let cachedPdfDoc: PDFDocument | null = null;
let cachedFieldMap: Array<{ name: string; type: string }> = [];

async function loadPdfTemplate(): Promise<PDFDocument> {
  if (!cachedPdfDoc) {
    const existingPdfBytes = readFileSync(pdfTemplatePath);
    cachedPdfDoc = await PDFDocument.load(existingPdfBytes);
    cachedPdfDoc.registerFontkit(fontkit);
  }
  return cachedPdfDoc;
}

function loadFieldMap(): Array<{ name: string; type: string }> {
  if (!cachedFieldMap) {
    const fieldMapJson = readFileSync(fieldMapPath, 'utf-8');
    cachedFieldMap = JSON.parse(fieldMapJson);
  }
  return cachedFieldMap;
}

export async function createCharacterPdf(data: Record<string, any>): Promise<Uint8Array> {
  const pdfDoc = await loadPdfTemplate();
  const form = pdfDoc.getForm();
  const fieldMap = loadFieldMap();

  for (const fieldDef of fieldMap) {
    const fieldName = fieldDef.name;
    const fieldType = fieldDef.type;
    const value = data[fieldName];

    if (value === undefined || value === null) {
      // console.warn(`Data for field "${fieldName}" is missing or null. Skipping.`);
      continue;
    }

    try {
      if (fieldType === 'text') {
        const textField = form.getTextField(fieldName);
        if (textField) {
          // Convert numbers and booleans to string
          const stringValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value);
          textField.setText(stringValue);
        } else {
          console.warn(`Text field "${fieldName}" not found in PDF.`);
        }
      } else if (fieldType === 'button') {
        const checkbox = form.getCheckBox(fieldName);
        if (checkbox) {
          if (value === true) {
            checkbox.check();
          } else if (value === false) {
            checkbox.uncheck();
          } else {
            console.warn(`Checkbox field "${fieldName}" received non-boolean value: ${value}. Skipping.`);
          }
        } else {
          console.warn(`Button/Checkbox field "${fieldName}" not found in PDF.`);
        }
      } else {
        console.warn(`Unknown field type "${fieldType}" for field "${fieldName}". Skipping.`);
      }
    } catch (error) {
      console.error(`Error setting field "${fieldName}" with value "${value}":`, error);
    }
  }

  form.flatten(); // Flatten the form fields

  return pdfDoc.save();
}
