<script lang="ts">
  import { characterInProgressStore } from '../../lib/stores/characterInProgressStore.ts';
  import { ancestriesData } from '../../lib/rulesdata/ancestries.ts';
  import { traitsData } from '../../lib/rulesdata/traits.ts';
  import type { IAncestry, ITrait } from '../../lib/rulesdata/types.ts';
  import { onDestroy } from 'svelte';

  let selectedAncestry1: IAncestry | undefined;
  let selectedAncestry2: IAncestry | undefined;
  let selectedTraits: string[] = [];

  const unsubscribe = characterInProgressStore.subscribe(store => {
    selectedAncestry1 = ancestriesData.find(a => a.id === store.ancestry1Id);
    selectedAncestry2 = ancestriesData.find(a => a.id === store.ancestry2Id);
    selectedTraits = JSON.parse(store.selectedTraitIds || '[]');
  });

  onDestroy(unsubscribe);

  function getTrait(traitId: string): ITrait | undefined {
    return traitsData.find(t => t.id === traitId);
  }

  function handleToggleTrait(traitId: string) {
    characterInProgressStore.update(store => {
      let currentTraits: string[] = JSON.parse(store.selectedTraitIds || '[]');
      const trait = getTrait(traitId);
      if (!trait) return store;

      if (currentTraits.includes(traitId)) {
        // Deselect
        currentTraits = currentTraits.filter(id => id !== traitId);
      } else {
        // Select
        currentTraits.push(traitId);
      }
      store.selectedTraitIds = JSON.stringify(currentTraits);
      return store;
    });
  }
</script>

<div class="selected-ancestries">
  {#if selectedAncestry1}
    <div class="ancestry-details">
      <h2>{selectedAncestry1.name}</h2>
      <h3>Default Traits</h3>
      <ul>
        {#each selectedAncestry1.defaultTraitIds || [] as traitId}
          <li>{getTrait(traitId)?.name} (Auto-selected)</li>
        {/each}
      </ul>
      <h3>Expanded Traits</h3>
      <ul>
        {#each selectedAncestry1.expandedTraitIds || [] as traitId}
          {@const trait = getTrait(traitId)}
          {#if trait}
            <li>
              <label>
                <input type="checkbox" checked={selectedTraits.includes(traitId)} on:change={() => handleToggleTrait(traitId)} disabled={selectedAncestry1?.defaultTraitIds?.includes(traitId)} />
                {trait.name} ({trait.cost} pts) - {trait.description}
              </label>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  {/if}
  {#if selectedAncestry2}
    <div class="ancestry-details">
      <h2>{selectedAncestry2.name}</h2>
      <h3>Default Traits</h3>
      <ul>
        {#each selectedAncestry2.defaultTraitIds || [] as traitId}
          <li>{getTrait(traitId)?.name} (Auto-selected)</li>
        {/each}
      </ul>
      <h3>Expanded Traits</h3>
      <ul>
        {#each selectedAncestry2.expandedTraitIds || [] as traitId}
          {@const trait = getTrait(traitId)}
          {#if trait}
            <li>
              <label>
                <input type="checkbox" checked={selectedTraits.includes(traitId)} on:change={() => handleToggleTrait(traitId)} disabled={selectedAncestry2?.defaultTraitIds?.includes(traitId)} />
                {trait.name} ({trait.cost} pts) - {trait.description}
              </label>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .selected-ancestries {
    display: flex;
    gap: 2rem;
  }
  .ancestry-details {
    flex: 1;
  }
</style>
