import type { ApiFromModules } from 'convex/server';
import type * as backOfficeFunctions from '../../../convex/backOffice';
import { api } from '../../../convex/_generated/api';

// Keep this feature's types independent of pre-existing seed-action inference cycles.
export const backOfficeApi: ApiFromModules<{
	backOffice: typeof backOfficeFunctions;
}>['backOffice'] = api.backOffice;
