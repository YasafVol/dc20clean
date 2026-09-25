interface LongRestMaximums {
	hp: number;
	mana: number;
	stamina: number;
	rest: number;
	grit: number;
}

interface LongRestResourceActions {
	updateHP: (value: number) => void;
	updateMP: (value: number) => void;
	updateSP: (value: number) => void;
	updateRestPoints: (value: number) => void;
	updateGritPoints: (value: number) => void;
	updateTempHP: (value: number) => void;
	updateExhaustion: (value: number) => void;
}

export function restoreLongRestResources(
	maximums: LongRestMaximums,
	actions: LongRestResourceActions
) {
	actions.updateHP(maximums.hp);
	actions.updateMP(maximums.mana);
	actions.updateSP(maximums.stamina);
	actions.updateRestPoints(maximums.rest);
	actions.updateGritPoints(maximums.grit);
	actions.updateTempHP(0);
	actions.updateExhaustion(0);
}
