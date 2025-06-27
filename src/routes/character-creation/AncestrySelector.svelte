<script lang="ts">
  import { characterInProgressStore } from '../../lib/stores/characterInProgressStore.ts';
  import { ancestriesData } from '../../lib/rulesdata/ancestries.ts';
  import type { IAncestry } from '../../lib/rulesdata/types.ts';
  import type { CharacterInProgressStoreData } from '../../lib/stores/characterInProgressStore.ts';

  let selectedAncestries: string[] = [];

  characterInProgressStore.subscribe((store: CharacterInProgressStoreData) => {
    const newSelection = [];
    if (store.ancestry1Id) newSelection.push(store.ancestry1Id);
    if (store.ancestry2Id) newSelection.push(store.ancestry2Id);
    selectedAncestries = newSelection;
  });

  function handleSelectAncestry(ancestryId: string) {
    characterInProgressStore.update((store: CharacterInProgressStoreData) => {
      const isSelected = selectedAncestries.includes(ancestryId);
      if (isSelected) {
        // Deselect
        if (store.ancestry1Id === ancestryId) store.ancestry1Id = null;
        else if (store.ancestry2Id === ancestryId) store.ancestry2Id = null;
      } else {
        // Select
        if (!store.ancestry1Id) {
          store.ancestry1Id = ancestryId;
        } else if (!store.ancestry2Id) {
          store.ancestry2Id = ancestryId;
        }
      }
      return store;
    });
  }
</script>

<div class="ancestry-grid">
  {#each ancestriesData as ancestry (ancestry.id)}
    <button
      type="button"
      class="ancestry-card"
      class:selected={selectedAncestries.includes(ancestry.id)}
      on:click={() => handleSelectAncestry(ancestry.id)}
    >
      <h3>{ancestry.name}</h3>
      <p>{ancestry.description}</p>
    </button>
  {/each}
</div>

<style>
  .ancestry-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  .ancestry-card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .ancestry-card:hover {
    border-color: #888;
  }
  .ancestry-card.selected {
    border-color: blue;
    box-shadow: 0 0 5px blue;
  }
</style>
