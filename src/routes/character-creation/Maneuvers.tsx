import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useCharacter } from '../../lib/stores/characterContext';
import { allManeuvers, ManeuverType } from '../../lib/rulesdata/martials/maneuvers';
import { classesData } from '../../lib/rulesdata/loaders/class.loader';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Sword, Info, Filter } from 'lucide-react';
import { debug } from '../../lib/utils/debug';

// Simple deep equality helper for arrays
function arraysEqual<T>(a: T[], b: T[]): boolean {
	if (a.length !== b.length) return false;
	return a.every((val, index) => {
		if (Array.isArray(val) && Array.isArray(b[index])) {
			return arraysEqual(val as unknown[], b[index] as unknown[]);
		}
		return val === b[index];
	});
}

const Maneuvers: React.FC = () => {
	const { state, dispatch, calculationResult } = useCharacter();
	const [selectedManeuvers, setSelectedManeuvers] = useState<string[]>([]);
	const [maneuverFilter, setManeuverFilter] = useState<ManeuverType | 'all'>('all');
	const isInitialLoad = useRef(true);
	const hasInitialized = useRef(false);

	// Load existing selections from state - only run once on mount
	useEffect(() => {
		if (hasInitialized.current) {
			return;
		}

		debug.calculation('Maneuvers: Loading selections from state:', {
			selectedManeuvers: state.selectedManeuvers
		});

		if (state.selectedManeuvers && Array.isArray(state.selectedManeuvers)) {
			setSelectedManeuvers(state.selectedManeuvers);
		}

		hasInitialized.current = true;
	}, []);

	// Mark initial load as complete after first render
	useEffect(() => {
		isInitialLoad.current = false;
	}, []);

	// Calculate available maneuvers based on class
	const classData = classesData.find((c) => c.id === state.classId);

	const maneuverCount = useMemo(() => {
		const budgets = calculationResult?.levelBudgets;
		if (!budgets) return 0;

		const count = budgets.totalManeuversKnown || 0;
		return count;
	}, [calculationResult]);

	// Log step render
	useEffect(() => {
		debug.calculation('Maneuver step rendered', {
			maneuverCount,
			selectedCount: selectedManeuvers.length
		});
	}, [maneuverCount, selectedManeuvers.length]);

	const availableManeuvers = useMemo(() => {
		if (!classData) return [];
		return allManeuvers;
	}, [classData]);

	const filteredManeuvers = useMemo(() => {
		let maneuvers = availableManeuvers;
		if (maneuverFilter !== 'all') {
			maneuvers = maneuvers.filter((maneuver) => maneuver.type === maneuverFilter);
		}
		return maneuvers;
	}, [availableManeuvers, maneuverFilter]);

	// Handle maneuver selection
	const handleManeuverToggle = (maneuverName: string) => {
		setSelectedManeuvers((prev) => {
			if (prev.includes(maneuverName)) {
				debug.calculation('Maneuver deselected', { maneuverName, remaining: maneuverCount - prev.length + 1 });
				return prev.filter((name) => name !== maneuverName);
			} else {
				// Check limits
				if (prev.length >= maneuverCount) return prev;
				debug.calculation('Maneuver selected', { maneuverName, remaining: maneuverCount - prev.length - 1 });
				return [...prev, maneuverName];
			}
		});
	};

	// Save selections to character state
	useEffect(() => {
		// Skip on initial load to prevent infinite loops
		if (isInitialLoad.current) {
			return;
		}

		// Skip if we haven't initialized yet
		if (!hasInitialized.current) {
			return;
		}

		const currentStateManeuvers = state.selectedManeuvers || [];

		const maneuversChanged = !arraysEqual(selectedManeuvers, currentStateManeuvers);

		if (maneuversChanged) {
			debug.calculation('Maneuvers: Dispatching update:', {
				maneuvers: selectedManeuvers
			});
			dispatch({
				type: 'UPDATE_SPELLS_AND_MANEUVERS',
				spells: state.selectedSpells || {}, // Preserve existing spells
				maneuvers: selectedManeuvers
			});
		}
	}, [selectedManeuvers, dispatch, state.selectedManeuvers, state.selectedSpells]);

	const maneuversRemaining = maneuverCount - selectedManeuvers.length;

	if (!state.classId) {
		return (
			<div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
				<div className="rounded-full bg-purple-500/10 p-4">
					<Sword className="h-12 w-12 text-purple-400" />
				</div>
				<h2 className="font-cinzel text-2xl font-bold">Select a Class First</h2>
				<p className="text-muted-foreground max-w-md">
					Maneuvers are determined by your class. Please choose a class in the first stage to
					continue.
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl space-y-8 animate-in fade-in duration-500">
			{/* Stage Header */}
			<div className="relative overflow-hidden rounded-2xl border border-border bg-black/40 p-8 py-12 shadow-2xl">
				<div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
					<div className="max-w-2xl space-y-4">
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-purple-500/20 p-2">
								<Sword className="h-6 w-6 text-purple-400" />
							</div>
							<Badge
								variant="outline"
								className="border-purple-500/30 px-3 py-1 uppercase tracking-widest text-purple-400"
							>
								Maneuvers
							</Badge>
						</div>
						<h1 className="font-cinzel text-4xl font-black tracking-tight text-white md:text-5xl">
							LEARN <span className="text-purple-400">MANEUVERS</span>
						</h1>
						<p className="text-muted-foreground text-lg leading-relaxed">
							Master martial techniques. Choose the maneuvers that will define your character's
							combat prowess.
						</p>
					</div>

					{/* Selection Summary Card */}
					<Card className="min-w-[280px] border-purple-500/20 bg-black/60 backdrop-blur-sm">
						<CardContent className="space-y-4 p-6">
							<h3 className="font-cinzel flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-400/80">
								<Info className="h-4 w-4" /> Selection Summary
							</h3>

							<div className="space-y-3">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground flex items-center gap-1">
										<Sword className="h-3 w-3" /> Maneuvers
									</span>
									<Badge
										variant={maneuversRemaining < 0 ? 'destructive' : 'outline'}
										className="font-mono"
									>
										{selectedManeuvers.length} / {maneuverCount}
									</Badge>
								</div>
							</div>

							{maneuversRemaining > 0 ? (
								<p className="border-t border-white/5 pt-2 text-center text-[10px] italic text-muted-foreground">
									You have {maneuversRemaining} choice{maneuversRemaining !== 1 ? 's' : ''} remaining
								</p>
							) : (
								<p className="border-t border-purple-500/10 pt-2 text-center text-[10px] italic text-purple-400/60">
									All choices complete
								</p>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Background Decoration */}
				<div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-purple-500/5 blur-[100px]" />
				<div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-red-500/5 blur-[100px]" />
			</div>

			{maneuverCount > 0 && (
				<div className="space-y-6">
					{/* Filter Section */}
					<Card className="border-border bg-black/20 backdrop-blur-sm">
						<CardContent className="pt-6">
							<div className="space-y-2">
								<label className="text-muted-foreground flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
									<Filter className="h-3 w-3" /> Maneuver Type
								</label>
								<select
									value={maneuverFilter}
									onChange={(e) => setManeuverFilter(e.target.value as ManeuverType | 'all')}
									className="border-border bg-background focus:border-primary focus:ring-primary w-full max-w-xs rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
								>
									<option value="all">All Types</option>
									{Object.values(ManeuverType).map((type) => (
										<option key={type} value={type}>
											{type}
										</option>
									))}
								</select>
							</div>
						</CardContent>
					</Card>

					{/* Results Summary */}
					<div className="text-muted-foreground text-center text-sm">
						Showing {filteredManeuvers.length} of {availableManeuvers.length} available maneuvers
						{' • '}
						<span
							className={cn(
								'font-medium',
								maneuversRemaining < 0 ? 'text-destructive' : 'text-purple-400'
							)}
						>
							{maneuversRemaining} remaining
						</span>
					</div>

					{filteredManeuvers.length === 0 ? (
						<div className="border-border text-muted-foreground rounded-2xl border-2 border-dashed bg-black/10 py-24 text-center">
							<h3 className="font-cinzel mb-4 text-2xl text-purple-400">No Maneuvers Match</h3>
							<p className="mx-auto max-w-sm text-base leading-relaxed">
								Adjust your filters to discover different martial techniques.
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{filteredManeuvers.map((maneuver) => {
								const isSelected = selectedManeuvers.includes(maneuver.name);
								const canSelect = selectedManeuvers.length < maneuverCount || isSelected;

								return (
									<Card
										key={maneuver.name}
										className={cn(
											'group border-2 transition-all hover:-translate-y-1 hover:shadow-xl',
											isSelected
												? 'border-purple-500 bg-purple-500/10'
												: 'border-purple-500/30 bg-card/40 hover:border-purple-500/50'
										)}
									>
										<CardHeader className="pb-3">
											<div className="flex items-start justify-between gap-2">
												<CardTitle className="text-xl font-bold tracking-tight text-purple-400">
													{maneuver.name}
												</CardTitle>
												<Badge
													variant="outline"
													className="border-purple-500/50 text-[10px] uppercase tracking-widest text-purple-400"
												>
													{maneuver.type}
												</Badge>
											</div>
											<div className="mt-1 flex gap-2">
												<Badge
													variant="secondary"
													className="bg-red-500/10 text-[10px] text-red-400 hover:bg-red-500/20"
												>
													{maneuver.cost.ap} AP
												</Badge>
												{maneuver.cost.sp && maneuver.cost.sp > 0 && (
													<Badge
														variant="secondary"
														className="bg-yellow-500/10 text-[10px] text-yellow-400 hover:bg-yellow-500/20"
													>
														{maneuver.cost.sp} SP
													</Badge>
												)}
											</div>
										</CardHeader>
										<CardContent className="pb-6">
											<p className="text-muted-foreground line-clamp-3 h-[60px] text-sm leading-relaxed">
												{maneuver.description}
											</p>
										</CardContent>
										<CardFooter className="justify-end border-t border-white/5 bg-black/20 p-4 pt-4">
											<Button
												variant={isSelected ? 'destructive' : 'default'}
												size="sm"
												className={cn(
													'h-8 font-bold',
													!isSelected && 'bg-purple-600 hover:bg-purple-700'
												)}
												onClick={() => handleManeuverToggle(maneuver.name)}
												disabled={!canSelect}
											>
												{isSelected ? 'FORGET' : 'LEARN'}
											</Button>
										</CardFooter>
									</Card>
								);
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Maneuvers;
