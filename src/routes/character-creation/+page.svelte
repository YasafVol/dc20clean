<script lang="ts">
  import AncestrySelector from './AncestrySelector.svelte';
  import SelectedAncestries from './SelectedAncestries.svelte';
  import AncestryPointsCounter from './AncestryPointsCounter.svelte';
</script>

<h1>Ancestry</h1>

<div class="container">
  <div class="selector-column">
    <AncestrySelector />
  </div>
  <div class="details-column">
    <AncestryPointsCounter />
    <SelectedAncestries />
  </div>
</div>

<style>
  .container {
    display: flex;
    gap: 2rem;
  }
  .selector-column {
    flex: 1;
  }
  .details-column {
    flex: 2;
  }
</style>
