import { PDFDocument } from 'pdf-lib';
import type { PdfExportData } from '../types/pdfExport';
import { fieldMap_dc20_095 } from './fieldMap.dc20-0.9.5';
import templateUrl from '../pdf/095/DC20_Beta_0_9_5_(fillable)_Character_Sheet.pdf?url';

function getByPath(obj: any, path: string): any {
  try {
    if (!path) return undefined;
    const parts = path
      .replace(/\[(\d+)\]/g, '.$1')
      .split('.')
      .map((p) => p.trim());
    return parts.reduce((acc: any, key: string) => (acc == null ? undefined : acc[key]), obj);
  } catch {
    return undefined;
  }
}

export async function fillPdfFromData(data: PdfExportData, options?: { flatten?: boolean }): Promise<Blob> {
  const response = await fetch(templateUrl);
  const arrayBuffer = await response.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const form = pdfDoc.getForm();

  for (const item of fieldMap_dc20_095) {
    const value = getByPath(data, item.path);
    try {
      const field = form.getField(item.field) as any;
      if (item.type === 'text' && value !== undefined && value !== null) {
        if (typeof field.setText === 'function') field.setText(String(value));
      } else if (item.type === 'checkbox') {
        if (value) field.check?.();
        else field.uncheck?.();
      }
    } catch {
      // ignore missing fields
    }
  }

  if (options?.flatten) {
    try {
      form.flatten();
    } catch {
      // ignore
    }
  }

  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: 'application/pdf' });
}


