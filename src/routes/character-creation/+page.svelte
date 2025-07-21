<script lang="ts">
	import AncestrySelector from './AncestrySelector.svelte';
	import SelectedAncestries from './SelectedAncestries.svelte';
	import AncestryPointsCounter from './AncestryPointsCounter.svelte';
	import Attributes from './Attributes.svelte';
	import ClassSelector from './ClassSelector.svelte';
	import ClassFeatures from './ClassFeatures.svelte';
</script>

<h1>Character Creation</h1>

<div class="character-creation-page">
	<h2>Choose Your Ancestry</h2>
	<AncestrySelector />

	<section class="points-section">
		<AncestryPointsCounter />
	</section>

	<section class="traits-section">
		<h2>Ancestry Traits</h2>
		<SelectedAncestries />
	</section>
	<section class="attributes-section">
		<Attributes />
	</section>

	<section class="class-selection-section">
		<h2>Class Selection</h2>
		<ClassSelector />
	</section>
	<section class="class-features-section">
		<ClassFeatures />
	</section>

	<section class="ancestry-selection-section"></section>
</div>

<style>
	.character-creation-page {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1rem;
	}

	.class-selection-section,
	.attributes-section,
	.ancestry-selection-section,
	.points-section,
	.traits-section,
	.class-features-section {
		border: 1px solid #eee;
		padding: 1.5rem;
		border-radius: 8px;
		background-color: #f9f9f9;
	}

	h2 {
		margin-top: 0;
		color: #333;
	}
</style>
