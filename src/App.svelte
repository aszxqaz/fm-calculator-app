<script lang="ts">
  import Display from './lib/components/Display.svelte';
  import Keyboard from './lib/components/Keyboard.svelte';
  import Switcher from './lib/components/Switcher.svelte';
  import { calculator } from './lib/state/Calculator.svelte';
  import './styles/global.css';

  let theme = $state(0);
</script>

<main class="wrapper theme transition-color" data-theme={theme}>
  <div class="wrapper-child">
    <div class="keyboard-wrapper">
      <div class="header">
        <h1 class="logo">Calc</h1>
        <Switcher
          name={'theme'}
          bind:value={theme}
          legend="Theme"
          srLegend="Select a theme variant"
          opts={[
            { value: 0, label: '1', srLabel: 'First' },
            { value: 1, label: '2', srLabel: 'Second' },
            { value: 2, label: '3', srLabel: 'Third' },
          ]}
        />
      </div>
      <Display value={calculator.display} />
      <Keyboard
        onComma={calculator.addComma}
        onBackspace={calculator.del}
        onDigit={calculator.addDigit}
        onEqual={calculator.equal}
        onReset={calculator.reset}
        onOp={calculator.setOp}
      />
    </div>
  </div>
</main>

<style>
  .wrapper {
    --padding-inline: clamp(1.5rem, -3.87rem + 22.9vw, 7.125rem);

    height: 100vh;
    display: grid;

    grid-template-columns: var(--padding-inline) 1fr var(--padding-inline);
    grid-template-rows: 1fr max-content 1fr;

    justify-items: center;

    > .wrapper-child {
      width: 100%;
      grid-column: 2;
      grid-row: 2;
    }
  }

  .keyboard-wrapper {
    max-width: 33.75rem;
    margin-inline: auto;
    display: grid;
    row-gap: 1.5rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .logo {
    font-size: 2rem;
    letter-spacing: 0.015625em;
    text-transform: lowercase;
    user-select: none;
  }
</style>
