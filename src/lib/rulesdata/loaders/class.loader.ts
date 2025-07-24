import { classesDataSchema, type IClassDefinition } from '../schemas/class.schema';

// Use Vite's import.meta.glob to import all the JSON files from the classes directory.
// The `eager: true` option imports the modules directly, so they are available synchronously.
const classModules = import.meta.glob('../classes/*.json', { eager: true });

// Extract the default export (the class object) from each module.
const rawData = Object.values(classModules).map((module: any) => module.default);

// Validate the combined data against the Zod schema.
// The parse method will throw a detailed error if validation fails.
const validatedData = classesDataSchema.parse(rawData);

// Export the validated data with the correct type.
export const classesData: IClassDefinition[] = validatedData;
