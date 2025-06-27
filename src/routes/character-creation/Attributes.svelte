<script lang="ts">
  import { characterInProgressStore } from '../../lib/stores/characterInProgressStore.ts';
  import { attributesData } from '../../lib/rulesdata/attributes.ts';
  import { derived } from 'svelte/store';

  const attributePointsRemaining = derived(
    characterInProgressStore,
    ($store) => {
      const basePoints = 12;
      const spentPoints = 
        ($store.attribute_might + 2) +
        ($store.attribute_agility + 2) +
        ($store.attribute_charisma + 2) +
        ($store.attribute_intelligence + 2);
      return basePoints - spentPoints;
    }
  );

  function increaseAttribute(attribute: string) {
    characterInProgressStore.update(store => {
      if ($attributePointsRemaining > 0) {
        (store as any)[attribute]++;
      }
      return store;
    });
  }

  function decreaseAttribute(attribute: string) {
    characterInProgressStore.update(store => {
      if ((store as any)[attribute] > -2) {
        (store as any)[attribute]--;
      }
      return store;
    });
  }
</script>

<div class="attributes-container">
  <h2>Attributes</h2>
  <p>Points Remaining: {$attributePointsRemaining}</p>
  <div class="attributes-grid">
    {#each attributesData as attribute}
      <div class="attribute-card">
        <h3>{attribute.name}</h3>
        <div class="attribute-controls">
          <button on:click={() => decreaseAttribute('attribute_' + attribute.id)}>-</button>
          <p>{($characterInProgressStore as any)['attribute_' + attribute.id]}</p>
          <button on:click={() => increaseAttribute('attribute_' + attribute.id)}>+</button>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .attributes-container {
    border: 1px solid #eee;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  .attributes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  .attribute-card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
  }
  .attribute-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
</style>
