import { describe, expect, it } from 'vitest';
import sourceReport from '../../../../docs/migration/classes-v0105-report.json';
import effectReport from '../../../../docs/migration/class-feature-effect-classification.json';
import { classFeaturesData } from '../loaders/class-features.loader';

const normalizeForSourceMatch = (value: string) =>
	value
		.replace(/\s+\(Flavor Feature\)$/i, '')
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[^a-z0-9]+/g, '');

const IGNORED_RUNTIME_FEATURE_NAMES = new Set([
	'Martial Path',
	'Spellcasting Path',
	'Talent',
	'Source of Power'
]);

describe('DC20 v0.10.5 class source audit', () => {
	it('keeps the source class report aligned with loaded runtime classes', () => {
		const sourceNames = sourceReport.classes.map((classData) => classData.name).sort();
		const runtimeNames = classFeaturesData.map((classData) => classData.className).sort();

		expect(runtimeNames).toEqual(sourceNames);
		expect(sourceReport.classCount).toBe(13);
		expect(sourceReport.detailedClassCount).toBe(12);
		expect(sourceReport.findings).toEqual(
			expect.arrayContaining([expect.objectContaining({ className: 'Cleric', severity: 'info' })])
		);
	});

	it('matches runtime feature names against detailed source candidates', () => {
		const sourceByName = new Map(
			sourceReport.classes.map((classData) => [classData.name, classData])
		);
		const missingFromSource: string[] = [];

		for (const runtimeClass of classFeaturesData) {
			const sourceClass = sourceByName.get(runtimeClass.className);
			if (!sourceClass || sourceClass.sourceStatus !== 'detailed') continue;

			const sourceCandidates = new Set(
				sourceClass.coreFeatureCandidates.map((feature) => normalizeForSourceMatch(feature.name))
			);

			for (const feature of runtimeClass.coreFeatures) {
				if (!feature.levelGained || ![1, 2, 5].includes(feature.levelGained)) continue;
				if (IGNORED_RUNTIME_FEATURE_NAMES.has(feature.featureName)) continue;
				if (feature.isFlavor) continue;

				const normalizedFeatureName = normalizeForSourceMatch(feature.featureName);
				if (!sourceCandidates.has(normalizedFeatureName)) {
					missingFromSource.push(`${runtimeClass.className}: ${feature.featureName}`);
				}
			}
		}

		expect(missingFromSource).toEqual([]);
	});

	it('covers every loaded runtime core feature in the effect classification report', () => {
		const runtimeFeatureKeys = classFeaturesData
			.flatMap((classData) =>
				classData.coreFeatures.map((feature) => `${classData.className}::${feature.featureName}`)
			)
			.sort();
		const reportFeatureKeys = effectReport.features
			.filter((feature) => feature.featureKind === 'core')
			.map((feature) => `${feature.className}::${feature.featureName}`)
			.sort();

		expect(reportFeatureKeys).toEqual(runtimeFeatureKeys);
		expect(effectReport.classCount).toBe(classFeaturesData.length);
		expect(effectReport.coreFeatureCount).toBe(runtimeFeatureKeys.length);
		expect(effectReport.byStatus.covered).toBeGreaterThan(0);
	});

	it('covers every loaded runtime subclass feature in the effect classification report', () => {
		const runtimeFeatureKeys = classFeaturesData
			.flatMap((classData) =>
				classData.subclasses.flatMap((subclass) =>
					subclass.features.map(
						(feature) => `${classData.className}::${subclass.subclassName}::${feature.featureName}`
					)
				)
			)
			.sort();
		const reportFeatureKeys = effectReport.features
			.filter((feature) => feature.featureKind === 'subclass')
			.map((feature) => `${feature.className}::${feature.subclassName}::${feature.featureName}`)
			.sort();

		expect(reportFeatureKeys).toEqual(runtimeFeatureKeys);
		expect(effectReport.subclassFeatureCount).toBe(runtimeFeatureKeys.length);
	});

	it('does not duplicate always-on effects within any class feature', () => {
		expect(effectReport.duplicateAlwaysOnEffectCount).toBe(0);
		expect(effectReport.featuresWithDuplicateAlwaysOnEffects).toEqual([]);
	});

	it('does not leave class features as unstructured text-only records', () => {
		expect(effectReport.byStatus['text-only-no-effects'] ?? 0).toBe(0);
		expect(effectReport.byStatus['flavor-no-effects'] ?? 0).toBe(0);

		const unstructuredFeatures = effectReport.features.filter((feature) =>
			['text-only-no-effects', 'flavor-no-effects'].includes(feature.implementationStatus)
		);
		expect(unstructuredFeatures).toEqual([]);
	});
});
