<script lang="ts">
  import { characterInProgressStore } from '../../lib/stores/characterInProgressStore.ts';
  import { classesData } from '../../lib/rulesdata/classes.ts';
  import type { IClassDefinition, IFeatureChoice } from '../../lib/rulesdata/types.ts';
  import { onDestroy } from 'svelte';

  let selectedClass: IClassDefinition | undefined;
  let selectedFeatureChoices: { [key: string]: string } = {};

  const unsubscribe = characterInProgressStore.subscribe(store => {
    selectedClass = classesData.find(c => c.id === store.classId);
    selectedFeatureChoices = JSON.parse(store.selectedFeatureChoices || '{}');
  });

  onDestroy(unsubscribe);

  function handleFeatureChoice(choiceId: string, value: string) {
    characterInProgressStore.update(store => {
      const currentChoices = JSON.parse(store.selectedFeatureChoices || '{}');
      currentChoices[choiceId] = value;
      store.selectedFeatureChoices = JSON.stringify(currentChoices);
      return store;
    });
  }
</script>

<div class="class-features-container">
  {#if selectedClass}
    <h2>{selectedClass.name} Features</h2>

    <div class="features-list">
      <h3>Level 1 Features</h3>
      {#each selectedClass.level1Features || [] as feature}
        <div class="feature-card">
          <h4>{feature.name}</h4>
          <p>{feature.description}</p>
        </div>
      {/each}
    </div>

    {#if selectedClass.featureChoicesLvl1 && selectedClass.featureChoicesLvl1.length > 0}
      <div class="feature-choices-list">
        <h3>Feature Choices</h3>
        {#each selectedClass.featureChoicesLvl1 as choice}
          <div class="feature-choice-card">
            <h4>{choice.prompt}</h4>
            {#if choice.type === 'select_one'}
              <div class="choice-options">
                {#each choice.options as option}
                  <label>
                    <input
                      type="radio"
                      name={choice.id}
                      value={option.value}
                      checked={selectedFeatureChoices[choice.id] === option.value}
                      on:change={() => handleFeatureChoice(choice.id, option.value)}
                    />
                    {option.label}
                    {#if option.description}
                      <span class="option-description">({option.description})</span>
                    {/if}
                  </label>
                {/each}
              </div>
            {/if}
            <!-- Add other choice types if needed later -->
          </div>
        {/each}
      </div>
    {/if}
  {:else}
    <p>Select a Class to see its features.</p>
  {/if}
</div>

<style>
  .class-features-container {
    border: 1px solid #eee;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: #f9f9f9;
    margin-top: 2rem;
  }
  .features-list, .feature-choices-list {
    margin-top: 1rem;
  }
  .feature-card, .feature-choice-card {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 1rem;
    background-color: #fff;
  }
  .choice-options label {
    display: block;
    margin-bottom: 0.5rem;
  }
  .option-description {
    font-size: 0.9em;
    color: #666;
    margin-left: 0.5rem;
  }
  h2, h3, h4 {
    color: #333;
  }
</style>
