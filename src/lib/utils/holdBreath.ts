export function calculateHoldBreath(might: number | null | undefined): number {
	return typeof might === 'number' && Number.isFinite(might) ? Math.max(1, might) : 1;
}
