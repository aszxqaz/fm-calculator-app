<script lang="ts">
  import KeyButton, {
    type KeyButtonType,
    type KeyButtonVariant,
  } from './KeyButton.svelte';

  type Props = {
    onDigit: (digit: string) => void;
    onOp: (op: string) => void;
    onBackspace: () => void;
    onComma: () => void;
    onEqual: () => void;
    onReset: () => void;
  };

  let keyboard: HTMLDivElement;

  const { onDigit, onOp, onBackspace, onComma, onEqual, onReset }: Props =
    $props();

  type Key = {
    type: 'digit' | 'backspace' | 'op' | 'comma' | 'reset' | 'equal';
    variant?: KeyButtonVariant;
    label: string;
    value?: string;
    btnType?: KeyButtonType;
  };

  const keys: Key[][] = [
    [
      {
        type: 'digit',
        value: '7',
        label: '7',
      },
      {
        type: 'digit',
        value: '8',
        label: '8',
      },
      {
        type: 'digit',
        value: '9',
        label: '9',
      },
      {
        type: 'backspace',
        label: 'Del',
        variant: 'secondary',
        btnType: 'text',
      },
    ],
    [
      {
        type: 'digit',
        value: '4',
        label: '4',
      },
      {
        type: 'digit',
        value: '5',
        label: '5',
      },
      {
        type: 'digit',
        value: '6',
        label: '6',
      },
      {
        type: 'op',
        value: '+',
        label: '+',
      },
    ],
    [
      {
        type: 'digit',
        value: '1',
        label: '1',
      },
      {
        type: 'digit',
        value: '2',
        label: '2',
      },
      {
        type: 'digit',
        value: '3',
        label: '3',
      },
      {
        type: 'op',
        value: '-',
        label: '-',
      },
    ],
    [
      {
        type: 'comma',
        value: '.',
        label: '.',
      },
      {
        type: 'digit',
        value: '0',
        label: '0',
      },
      {
        type: 'op',
        value: '/',
        label: '/',
      },
      {
        type: 'op',
        value: '*',
        label: 'x',
      },
    ],
    [
      {
        type: 'reset',
        label: 'Reset',
        variant: 'secondary',
        btnType: 'text',
      },
      {
        type: 'equal',
        label: '=',
        variant: 'accent',
        btnType: 'text',
      },
    ],
  ];

  function onKey(key: (typeof keys)[number][number]) {
    switch (key.type) {
      case 'digit':
        onDigit(key.value!);
        break;
      case 'backspace':
        onBackspace();
        break;
      case 'comma':
        onComma();
        break;
      case 'equal':
        onEqual();
        break;
      case 'op':
        onOp(key.value!);
        break;
      case 'reset':
        onReset();
        break;
    }
  }

  function selectButton(selector: string) {
    return keyboard.querySelector(selector) as HTMLButtonElement;
  }

  function clickButton(selector: string) {
    const button = selectButton(selector);
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 200);
    button.click();
  }

  const handlers = [
    {
      test: (e: KeyboardEvent) => '1234567890'.includes(e.key),
      do: (e: KeyboardEvent) =>
        clickButton(`[data-type="digit"][data-value="${e.key}"]`),
    },
    {
      test: (e: KeyboardEvent) => e.key == '.',
      do: (e: KeyboardEvent) => clickButton(`[data-type="comma"]`),
    },
    {
      test: (e: KeyboardEvent) => '+-*/'.includes(e.key),
      do: (e: KeyboardEvent) =>
        clickButton(`[data-type="op"][data-value="${e.key}"]`),
    },
    {
      test: (e: KeyboardEvent) => e.key == '=',
      do: (e: KeyboardEvent) => clickButton(`[data-type="equal"]`),
    },
    {
      test: (e: KeyboardEvent) => e.key == 'Backspace',
      do: (e: KeyboardEvent) => clickButton(`[data-type="backspace"]`),
    },
    {
      test: (e: KeyboardEvent) => e.key == 'Delete',
      do: (e: KeyboardEvent) => clickButton(`[data-type="reset"]`),
    },
  ];
</script>

<svelte:body
  onkeydown={(e) => {
    for (const handler of handlers) {
      if (handler.test(e)) {
        e.stopPropagation();
        handler.do(e);
        return;
      }
    }
  }}
/>
<div bind:this={keyboard} class="keyboard transition-color">
  {#each keys as row}
    {#each row as key}
      {#if ['reset', 'equal'].includes(key.type)}
        <div class="spanned">
          {@render button()}
        </div>
      {:else}
        {@render button()}
      {/if}
      {#snippet button()}
        <KeyButton
          data-type={key.type}
          data-value={key.value}
          onclick={() => onKey(key)}
          variant={key.variant}
          type={key.btnType}>{key.label}</KeyButton
        >
      {/snippet}
    {/each}
  {/each}
</div>

<style>
  .keyboard {
    width: 100%;
    padding: clamp(1.25rem, 0.5rem + 3vw, 2rem);
    background-color: var(--color-keyboard-bg);
    border-radius: var(--border-radius-keyboard);
  }

  .keyboard {
    --gap: clamp(1rem, 0.5rem + 2vw, 1.5rem);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: calc(4rem - 4px);
    column-gap: var(--gap);
    row-gap: calc(var(--gap) + 4px);
  }

  .spanned {
    display: flex;
    grid-column: span 2;
  }
</style>
