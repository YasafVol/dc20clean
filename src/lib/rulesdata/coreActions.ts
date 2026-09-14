export interface CoreActionRule {
	id: string;
	name: string;
	cost: string;
	description: string;
	success: string;
	successEachFive?: string;
}

export const MEDICINE_ACTION: CoreActionRule = {
	id: 'medicine',
	name: 'Medicine',
	cost: '1 AP',
	description: 'Touch a creature and tend to its wounds. Make a DC 10 Medicine Check.',
	success: 'End 1 stack of Bleeding on the target.',
	successEachFive: 'End 1 additional stack of Bleeding on the target.'
};
