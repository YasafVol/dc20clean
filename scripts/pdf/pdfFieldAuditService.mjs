import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument } from 'pdf-lib';

const PDF_TYPE_BY_MAP_TYPE = {
	text: 'PDFTextField',
	checkbox: 'PDFCheckBox',
};

function compareByName(a, b) {
	return a.name.localeCompare(b.name);
}

function compareByField(a, b) {
	return a.field.localeCompare(b.field) || a.path.localeCompare(b.path);
}

function toDisplayPath(filePath, cwd = process.cwd()) {
	return path.relative(cwd, path.resolve(cwd, filePath)) || '.';
}

export async function extractPdfFieldSchema(pdfPath, label = 'pdf') {
	const resolvedPath = path.resolve(process.cwd(), pdfPath);
	const bytes = await readFile(resolvedPath);
	const pdfDoc = await PDFDocument.load(bytes);
	const fields = pdfDoc
		.getForm()
		.getFields()
		.map((field) => ({
			name: field.getName(),
			type: field.constructor.name,
		}))
		.sort(compareByName);

	return {
		label,
		pdfPath: toDisplayPath(resolvedPath),
		fieldCount: fields.length,
		fields,
	};
}

export function diffPdfFieldSchemas(oldSchema, newSchema) {
	const oldByName = new Map(oldSchema.fields.map((field) => [field.name, field]));
	const newByName = new Map(newSchema.fields.map((field) => [field.name, field]));

	const added = newSchema.fields.filter((field) => !oldByName.has(field.name));
	const removed = oldSchema.fields.filter((field) => !newByName.has(field.name));
	const typeChanged = newSchema.fields
		.filter((field) => oldByName.has(field.name) && oldByName.get(field.name).type !== field.type)
		.map((field) => ({
			name: field.name,
			oldType: oldByName.get(field.name).type,
			newType: field.type,
		}));

	return {
		added,
		removed,
		typeChanged,
		unchangedCount: newSchema.fields.length - added.length - typeChanged.length,
	};
}

function unescapeMapString(value) {
	return value.replace(/\\(['"`\\])/g, '$1');
}

export async function extractFieldMapEntries(fieldMapPath) {
	const resolvedPath = path.resolve(process.cwd(), fieldMapPath);
	const source = await readFile(resolvedPath, 'utf8');
	const entries = [];
	const entryPattern =
		/\{\s*path:\s*(['"`])((?:\\.|(?!\1).)*)\1,\s*field:\s*(['"`])((?:\\.|(?!\3).)*)\3,\s*type:\s*(['"`])(text|checkbox)\5\s*\}/g;

	let match;
	while ((match = entryPattern.exec(source)) !== null) {
		entries.push({
			path: unescapeMapString(match[2]),
			field: unescapeMapString(match[4]),
			type: match[6],
		});
	}

	return {
		fieldMapPath: toDisplayPath(resolvedPath),
		mappedItemCount: entries.length,
		entries,
	};
}

export function validateFieldMapAgainstSchema(fieldMap, schema) {
	const fieldsByName = new Map(schema.fields.map((field) => [field.name, field]));
	const entriesByField = new Map();

	for (const entry of fieldMap.entries) {
		if (!entriesByField.has(entry.field)) {
			entriesByField.set(entry.field, []);
		}
		entriesByField.get(entry.field).push(entry);
	}

	const unmappedNewFields = schema.fields.filter((field) => !entriesByField.has(field.name));
	const staleMappedFields = fieldMap.entries
		.filter((entry) => !fieldsByName.has(entry.field))
		.sort(compareByField);
	const duplicateMappedFields = Array.from(entriesByField.entries())
		.filter(([, entries]) => entries.length > 1)
		.map(([field, entries]) => ({ field, entries: entries.sort(compareByField) }))
		.sort((a, b) => a.field.localeCompare(b.field));
	const typeMismatches = fieldMap.entries
		.filter((entry) => {
			const field = fieldsByName.get(entry.field);
			return field && PDF_TYPE_BY_MAP_TYPE[entry.type] && field.type !== PDF_TYPE_BY_MAP_TYPE[entry.type];
		})
		.map((entry) => ({
			path: entry.path,
			field: entry.field,
			mapType: entry.type,
			pdfType: fieldsByName.get(entry.field).type,
			expectedPdfType: PDF_TYPE_BY_MAP_TYPE[entry.type],
		}))
		.sort(compareByField);

	return {
		fieldMapPath: fieldMap.fieldMapPath,
		mappedItemCount: fieldMap.mappedItemCount,
		uniqueMappedFieldCount: entriesByField.size,
		unmappedNewFields,
		staleMappedFields,
		duplicateMappedFields,
		typeMismatches,
	};
}

export async function runPdfFieldAudit({
	oldPdfPath,
	newPdfPath,
	oldLabel = 'old',
	newLabel = 'new',
	fieldMapPath,
}) {
	if (!newPdfPath) {
		throw new Error('newPdfPath is required');
	}

	const [oldSchema, newSchema] = await Promise.all([
		oldPdfPath ? extractPdfFieldSchema(oldPdfPath, oldLabel) : Promise.resolve(null),
		extractPdfFieldSchema(newPdfPath, newLabel),
	]);
	const fieldMap = fieldMapPath ? await extractFieldMapEntries(fieldMapPath) : null;

	return {
		generatedAt: new Date().toISOString(),
		inputs: {
			oldPdf: oldPdfPath ? toDisplayPath(oldPdfPath) : null,
			newPdf: toDisplayPath(newPdfPath),
			oldLabel,
			newLabel,
			fieldMap: fieldMapPath ? toDisplayPath(fieldMapPath) : null,
		},
		schemas: {
			old: oldSchema,
			new: newSchema,
		},
		diff: oldSchema ? diffPdfFieldSchemas(oldSchema, newSchema) : null,
		mapping: fieldMap ? validateFieldMapAgainstSchema(fieldMap, newSchema) : null,
	};
}

export async function writeJsonFile(outputPath, data) {
	const resolvedPath = path.resolve(process.cwd(), outputPath);
	await mkdir(path.dirname(resolvedPath), { recursive: true });
	await writeFile(resolvedPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
	return toDisplayPath(resolvedPath);
}
