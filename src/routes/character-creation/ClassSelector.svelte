<script lang="ts">
  import { characterInProgressStore } from '../../lib/stores/characterInProgressStore.ts';
  import { classesData } from '../../lib/rulesdata/classes.ts';
  import type { IClassDefinition } from '../../lib/rulesdata/types.ts';

  let selectedClassId: string | null = null;

  characterInProgressStore.subscribe(store => {
    selectedClassId = store.classId;
  });

  function handleSelectClass(classId: string) {
    characterInProgressStore.update(store => {
      if (store.classId === classId) {
        store.classId = null; // Deselect if already selected
      } else {
        store.classId = classId; // Select new class
      }
      return store;
    });
  }
</script>

<div class="class-selection-container">
  <h2>Choose Your Class</h2>
  <div class="class-grid">
    {#each classesData as classDef (classDef.id)}
      <button
        type="button"
        class="class-card"
        class:selected={selectedClassId === classDef.id}
        on:click={() => handleSelectClass(classDef.id)}
      >
        <h3>{classDef.name}</h3>
        <p>{classDef.description}</p>
      </button>
    {/each}
  </div>
</div>

<style>
  .class-selection-container {
    border: 1px solid #eee;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: #f9f9f9;
    margin-top: 2rem;
  }
  .class-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  .class-card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }
  .class-card:hover {
    border-color: #888;
  }
  .class-card.selected {
    border-color: blue;
    box-shadow: 0 0 5px blue;
  }
  h2 {
    margin-top: 0;
    color: #333;
  }
</style>
