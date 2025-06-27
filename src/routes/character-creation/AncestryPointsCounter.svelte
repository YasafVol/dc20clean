<script lang="ts">
  import { ancestryPointsRemaining } from '../../lib/stores/characterInProgressStore.ts';
</script>

<div class="points-counter">
  <h2>Ancestry Points: {$ancestryPointsRemaining}</h2>
</div>

<style>
  .points-counter {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1rem;
  }
</style>
