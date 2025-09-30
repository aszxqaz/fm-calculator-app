<script lang="ts" generics="T">
  import { derived } from 'svelte/store';

  type Props<T> = {
    name?: string;
    value: T;
    opts: {
      value: T;
      label: string;
      srLabel: string;
    }[];
    srLegend: string;
    legend: string;
  };

  let {
    opts,
    legend,
    srLegend,
    value = $bindable(),
    name: maybeName,
  }: Props<T> = $props();

  let id = $props.id();

  const name = $derived(maybeName ?? id);
</script>

<fieldset class="fieldset">
  <div class="legend">
    <span class="sr-only">{srLegend}</span><span aria-hidden="true">Theme</span>
  </div>
  <div class="labels">
    {#each opts as opt, index}
      <label class="label" for={`${name}-${index}`}
        ><span class="sr-only">{opt.srLabel}</span><span aria-hidden="true"
          >{opt.label}</span
        ></label
      >
    {/each}
  </div>
  <div class="inputs transition-color">
    {#each opts as opt, index}
      <input
        {name}
        type="radio"
        class="input"
        id={`${name}-${index}`}
        value={opt.value}
        bind:group={value}
      />
    {/each}
  </div>
</fieldset>

<style>
  .fieldset {
    font-size: 0.75rem;
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 0.5rem 1rem;
    user-select: none;
  }

  .legend {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    margin-block: auto;
    text-transform: uppercase;
    font-size: var(--font-size-ui-sm);
    font-weight: var(--font-weight-ui);
    letter-spacing: var(--letter-spacing-ui-sm);
  }

  .labels {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  .labels,
  .inputs {
    display: inline-flex;
    align-items: center;
    gap: 0.1666666666666667em;
    padding-inline: 0.6666666666666667em;
  }

  .inputs {
    grid-column: 2 / 3;
    grid-row: 2 / 3;

    background-color: var(--color-switcher-bg);
    padding-block: 0.4166666666666667em;
    border-radius: 1.083333333333333em;
  }

  .input,
  .label {
    width: 1.333333333333333em;
    cursor: pointer;
  }

  .label {
    text-align: center;
  }

  .input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    border-radius: 50%;
    aspect-ratio: 1;

    background-color: transparent;

    transition:
      background-color 0.3s,
      transform 0.3s;

    &:checked {
      background-color: var(--color-switcher-radio-bg);
    }
  }
</style>
