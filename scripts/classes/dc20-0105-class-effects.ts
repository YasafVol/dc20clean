import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { format } from 'prettier';
import { classFeaturesData } from '../../src/lib/rulesdata/loaders/class-features.loader';

const DEFAULT_REPORT = resolve(
	process.cwd(),
	'docs/migration/class-feature-effect-classification.json'
);

type EffectLike = {
	type?: string;
	target?: string;
	value?: unknown;
	condition?: string;
	userChoice?: unknown;
};

type FeatureLike = {
	id?: string;
	featureName: string;
	levelGained: number;
	description?: string;
	isFlavor?: boolean;
	isProgressionDerived?: boolean;
	effects?: EffectLike[];
	benefits?: Array<{ name: string; description?: string; effects?: EffectLike[] }>;
	choices?: Array<{
		id?: string;
		prompt: string;
		options?: Array<{ name: string; description?: string; effects?: EffectLike[] }>;
	}>;
};

type FeatureKind = 'core' | 'subclass';

const CALCULATED_STAT_TARGETS = new Set([
	'hpMax',
	'spMax',
	'mpMax',
	'pd',
	'ad',
	'attributePoints',
	'moveSpeed',
	'jumpDistance',
	'attackSpellCheck',
	'saveDC'
]);

const BUDGET_TARGETS = new Set([
	'skillPoints',
	'tradePoints',
	'languagePoints',
	'ancestryPoints',
	'maneuversKnown',
	'spellsKnown'
]);

const DISPLAY_COLLECTOR_TYPES = new Set([
	'GRANT_ABILITY',
	'GRANT_MOVEMENT',
	'GRANT_RESISTANCE',
	'GRANT_VULNERABILITY',
	'GRANT_ADV_ON_CHECK',
	'GRANT_SENSE',
	'GRANT_COMBAT_TRAINING'
]);

const CONDITION_INTERACTION_TYPES = new Set([
	'GRANT_CONDITION_IMMUNITY',
	'GRANT_CONDITION_RESISTANCE',
	'GRANT_CONDITION_VULNERABILITY'
]);

const SPELL_SLOT_TYPES = new Set(['GRANT_SPELL', 'GRANT_CANTRIP']);
const CHOICE_TYPES = new Set(['GRANT_CHOICE']);
const MASTERY_CAP_TYPES = new Set([
	'MODIFY_SKILL_MASTERY_CAP',
	'INCREASE_SKILL_MASTERY_CAP',
	'MODIFY_TRADE_MASTERY_CAP',
	'INCREASE_TRADE_MASTERY_CAP'
]);

const compareClassFeature = (
	left: {
		className: string;
		subclassName?: string | null;
		featureName?: string;
		levelGained?: number;
	},
	right: {
		className: string;
		subclassName?: string | null;
		featureName?: string;
		levelGained?: number;
	}
) =>
	left.className.localeCompare(right.className) ||
	(left.subclassName ?? '').localeCompare(right.subclassName ?? '') ||
	(left.levelGained ?? 0) - (right.levelGained ?? 0) ||
	(left.featureName ?? '').localeCompare(right.featureName ?? '');

const slugify = (value: string) =>
	value
		.toLowerCase()
		.normalize('NFKD')
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

function classifyEffect(effect: EffectLike) {
	if (!effect.type) {
		return {
			calculationStatus: 'missing-type',
			calculationPath: 'none',
			confidence: 0
		};
	}

	if (effect.type === 'MODIFY_ATTRIBUTE') {
		return {
			calculationStatus: 'calculated',
			calculationPath: 'stat-breakdown',
			confidence: 1
		};
	}

	if (effect.type === 'MODIFY_STAT') {
		const target = String(effect.target ?? '');
		if (CALCULATED_STAT_TARGETS.has(target)) {
			return {
				calculationStatus: 'calculated',
				calculationPath: 'stat-breakdown',
				confidence: 1
			};
		}
		if (BUDGET_TARGETS.has(target)) {
			return {
				calculationStatus: 'calculated',
				calculationPath: 'budget-or-slot-count',
				confidence: 0.9
			};
		}
		if (target === 'martial_melee_damage') {
			return {
				calculationStatus: 'sheet-todo',
				calculationPath: 'attack-row-presentation-todo',
				confidence: 0.55
			};
		}
		return {
			calculationStatus: 'unknown-target',
			calculationPath: 'none',
			confidence: 0.35
		};
	}

	if (effect.type === 'GRANT_MANEUVERS') {
		const target = String(effect.target ?? '').toLowerCase();
		return {
			calculationStatus: target === 'all_attack' ? 'display-only-or-baseline' : 'calculated',
			calculationPath: target === 'all_attack' ? 'combat-training-baseline' : 'maneuver-budget',
			confidence: target === 'all_attack' ? 0.65 : 0.9
		};
	}

	if (SPELL_SLOT_TYPES.has(effect.type)) {
		return {
			calculationStatus: 'calculated',
			calculationPath: 'spell-slot-generation',
			confidence: 0.9
		};
	}

	if (MASTERY_CAP_TYPES.has(effect.type)) {
		return {
			calculationStatus: 'validated',
			calculationPath: 'mastery-cap-validation',
			confidence: 0.85
		};
	}

	if (DISPLAY_COLLECTOR_TYPES.has(effect.type)) {
		return {
			calculationStatus: 'collected',
			calculationPath: 'sheet-collector',
			confidence: 0.8
		};
	}

	if (CONDITION_INTERACTION_TYPES.has(effect.type)) {
		return {
			calculationStatus: 'collected',
			calculationPath: 'condition-interaction-aggregation',
			confidence: 0.8
		};
	}

	if (CHOICE_TYPES.has(effect.type)) {
		return {
			calculationStatus: 'choice-tracked',
			calculationPath: 'unresolved-choice-or-ui-selection',
			confidence: 0.7
		};
	}

	if (effect.type === 'SET_VALUE') {
		if (effect.target === 'jumpCalculationAttribute' && effect.value === 'might') {
			return {
				calculationStatus: 'calculated',
				calculationPath: 'jump-distance-base-selection',
				confidence: 0.9
			};
		}
		return {
			calculationStatus: 'not-calculated',
			calculationPath: 'none',
			confidence: 0.2
		};
	}

	return {
		calculationStatus: 'unsupported',
		calculationPath: 'none',
		confidence: 0.25
	};
}

function collectEffects(feature: FeatureLike) {
	const effects: Array<{ scope: string; label: string; effect: EffectLike }> = [];
	for (const effect of feature.effects ?? []) {
		effects.push({ scope: 'feature', label: feature.featureName, effect });
	}
	for (const benefit of feature.benefits ?? []) {
		for (const effect of benefit.effects ?? []) {
			effects.push({ scope: 'benefit', label: benefit.name, effect });
		}
	}
	for (const choice of feature.choices ?? []) {
		for (const option of choice.options ?? []) {
			for (const effect of option.effects ?? []) {
				effects.push({ scope: 'choice-option', label: `${choice.prompt}: ${option.name}`, effect });
			}
		}
	}
	return effects;
}

function stableValue(value: unknown): unknown {
	if (Array.isArray(value)) return value.map(stableValue);
	if (value && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value)
				.sort(([left], [right]) => left.localeCompare(right))
				.map(([key, nestedValue]) => [key, stableValue(nestedValue)])
		);
	}
	return value ?? null;
}

function duplicateEffectKey(effect: EffectLike) {
	return JSON.stringify({
		type: effect.type ?? null,
		target: effect.target ?? null,
		value: stableValue(effect.value),
		condition: effect.condition ?? null,
		userChoice: stableValue(effect.userChoice)
	});
}

function collectDuplicateAlwaysOnEffects(
	effects: Array<{ scope: string; label: string; effect: EffectLike }>
) {
	const grouped = new Map<string, Array<{ scope: string; label: string; effect: EffectLike }>>();
	for (const entry of effects) {
		if (entry.scope === 'choice-option') continue;
		const key = duplicateEffectKey(entry.effect);
		grouped.set(key, [...(grouped.get(key) ?? []), entry]);
	}

	return Array.from(grouped.entries())
		.filter(([, entries]) => entries.length > 1)
		.map(([signature, entries]) => ({
			signature: JSON.parse(signature),
			count: entries.length,
			occurrences: entries.map((entry) => ({
				scope: entry.scope,
				label: entry.label
			}))
		}));
}

function collectSelections(feature: FeatureLike) {
	return (feature.choices ?? []).map((choice) => ({
		id: choice.id ?? null,
		prompt: choice.prompt,
		count: (choice as { count?: number }).count ?? null,
		optionCount: choice.options?.length ?? 0,
		options: (choice.options ?? []).map((option) => ({
			name: option.name,
			effectCount: option.effects?.length ?? 0,
			effectTypes: Array.from(
				new Set((option.effects ?? []).map((effect) => effect.type ?? 'missing-type'))
			)
		}))
	}));
}

function classifyFeature(
	className: string,
	feature: FeatureLike,
	metadata: { featureKind: FeatureKind; subclassName?: string }
) {
	const effects = collectEffects(feature);
	const selections = collectSelections(feature);
	const duplicateAlwaysOnEffects = collectDuplicateAlwaysOnEffects(effects);
	const classifiedEffects = effects.map(({ scope, label, effect }) => ({
		scope,
		label,
		type: effect.type ?? null,
		target: effect.target ?? null,
		value: effect.value ?? null,
		condition: effect.condition ?? null,
		hasUserChoice: Boolean(effect.userChoice),
		...classifyEffect(effect)
	}));

	const calculatedCount = classifiedEffects.filter((effect) =>
		['calculated', 'validated', 'collected', 'choice-tracked'].includes(effect.calculationStatus)
	).length;
	const unsupportedCount = classifiedEffects.filter((effect) =>
		['unsupported', 'unknown-target', 'missing-type', 'not-calculated', 'sheet-todo'].includes(
			effect.calculationStatus
		)
	).length;

	const implementationScore =
		classifiedEffects.length === 0
			? feature.isFlavor || feature.isProgressionDerived
				? 1
				: 0.15
			: Number((calculatedCount / classifiedEffects.length).toFixed(2));

	const implementationStatus =
		classifiedEffects.length === 0
			? feature.isProgressionDerived
				? 'progression-derived'
				: feature.isFlavor
					? 'flavor-no-effects'
					: 'text-only-no-effects'
			: unsupportedCount === 0
				? 'covered'
				: calculatedCount > 0
					? 'partial'
					: 'uncovered';

	return {
		className,
		featureKind: metadata.featureKind,
		subclassName: metadata.subclassName ?? null,
		featureId: feature.id ?? `${slugify(className)}-${slugify(feature.featureName)}`,
		featureName: feature.featureName,
		levelGained: feature.levelGained,
		isFlavor: Boolean(feature.isFlavor || /\(Flavor Feature\)$/i.test(feature.featureName)),
		isProgressionDerived: Boolean(feature.isProgressionDerived),
		selectionCount: selections.length,
		selections,
		duplicateAlwaysOnEffectCount: duplicateAlwaysOnEffects.length,
		duplicateAlwaysOnEffects,
		implementationStatus,
		implementationScore,
		effectCount: classifiedEffects.length,
		calculatedCount,
		unsupportedCount,
		effects: classifiedEffects
	};
}

function createReport() {
	const features = classFeaturesData.flatMap((classData) => [
		...classData.coreFeatures.map((feature) =>
			classifyFeature(classData.className, feature as FeatureLike, { featureKind: 'core' })
		),
		...classData.subclasses.flatMap((subclass) =>
			subclass.features.map((feature) =>
				classifyFeature(classData.className, feature as FeatureLike, {
					featureKind: 'subclass',
					subclassName: subclass.subclassName
				})
			)
		)
	]);
	const coreFeatureCount = features.filter((feature) => feature.featureKind === 'core').length;
	const subclassFeatureCount = features.filter(
		(feature) => feature.featureKind === 'subclass'
	).length;
	const selectionCount = features.reduce((sum, feature) => sum + feature.selectionCount, 0);
	const duplicateAlwaysOnEffectCount = features.reduce(
		(sum, feature) => sum + feature.duplicateAlwaysOnEffectCount,
		0
	);
	const featuresWithDuplicateAlwaysOnEffects = features
		.filter((feature) => feature.duplicateAlwaysOnEffectCount > 0)
		.map((feature) => ({
			className: feature.className,
			featureKind: feature.featureKind,
			subclassName: feature.subclassName,
			featureName: feature.featureName,
			duplicateAlwaysOnEffectCount: feature.duplicateAlwaysOnEffectCount
		}))
		.sort(compareClassFeature);
	const byStatus = features.reduce<Record<string, number>>((counts, feature) => {
		counts[feature.implementationStatus] = (counts[feature.implementationStatus] ?? 0) + 1;
		return counts;
	}, {});
	const byFeatureKind = features.reduce<Record<string, number>>((counts, feature) => {
		counts[feature.featureKind] = (counts[feature.featureKind] ?? 0) + 1;
		return counts;
	}, {});
	const classSummaries = classFeaturesData
		.map((classData) => {
			const classFeatures = features.filter((feature) => feature.className === classData.className);
			return {
				className: classData.className,
				classCategory: (classData as { classCategory?: string }).classCategory ?? null,
				coreFeatureCount: classFeatures.filter((feature) => feature.featureKind === 'core').length,
				subclassCount: classData.subclasses.length,
				subclassFeatureCount: classFeatures.filter((feature) => feature.featureKind === 'subclass')
					.length,
				selectionCount: classFeatures.reduce((sum, feature) => sum + feature.selectionCount, 0),
				duplicateAlwaysOnEffectCount: classFeatures.reduce(
					(sum, feature) => sum + feature.duplicateAlwaysOnEffectCount,
					0
				),
				effectCount: classFeatures.reduce((sum, feature) => sum + feature.effectCount, 0),
				byStatus: classFeatures.reduce<Record<string, number>>((counts, feature) => {
					counts[feature.implementationStatus] = (counts[feature.implementationStatus] ?? 0) + 1;
					return counts;
				}, {})
			};
		})
		.sort((left, right) => left.className.localeCompare(right.className));
	const effectTypes = features
		.flatMap((feature) => feature.effects)
		.reduce<Record<string, number>>((counts, effect) => {
			const type = effect.type ?? 'missing-type';
			counts[type] = (counts[type] ?? 0) + 1;
			return counts;
		}, {});

	return {
		rulesVersion: 'dc20-0.10.5',
		scope: 'runtime-class-feature-effects',
		generatedFrom: 'src/lib/rulesdata/classes-data/features/*_features.ts',
		calculatorPaths: {
			statBreakdownTargets: Array.from(CALCULATED_STAT_TARGETS).sort(),
			budgetTargets: Array.from(BUDGET_TARGETS).sort(),
			displayCollectorTypes: Array.from(DISPLAY_COLLECTOR_TYPES).sort(),
			spellSlotTypes: Array.from(SPELL_SLOT_TYPES).sort(),
			masteryCapTypes: Array.from(MASTERY_CAP_TYPES).sort()
		},
		classCount: classFeaturesData.length,
		featureCount: features.length,
		coreFeatureCount,
		subclassFeatureCount,
		selectionCount,
		duplicateAlwaysOnEffectCount,
		featuresWithDuplicateAlwaysOnEffects,
		byFeatureKind,
		byStatus,
		effectTypes,
		classSummaries,
		features: [...features].sort(compareClassFeature)
	};
}

const serializeReport = (value: unknown) =>
	format(JSON.stringify(value), {
		parser: 'json',
		useTabs: true,
		singleQuote: true,
		trailingComma: 'none',
		printWidth: 100
	});

async function runCli() {
	const args = new Set(process.argv.slice(2));
	const report = await serializeReport(createReport());

	if (args.has('--check')) {
		const current = readFileSync(DEFAULT_REPORT, 'utf8');
		if (current !== report) {
			throw new Error(
				'Generated class feature effect report is stale. Run npm run classes:effects:generate.'
			);
		}
		console.log('Validated class feature effect classification report.');
		return;
	}

	if (args.has('--write')) {
		mkdirSync(dirname(DEFAULT_REPORT), { recursive: true });
		writeFileSync(DEFAULT_REPORT, report);
		console.log(`Wrote ${DEFAULT_REPORT}`);
		return;
	}

	process.stdout.write(report);
}

runCli().catch((error) => {
	console.error(error.message);
	process.exitCode = 1;
});
