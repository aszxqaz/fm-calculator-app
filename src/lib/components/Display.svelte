<script lang="ts">
    type Props = {
        value: string;
    };

    const { value }: Props = $props();
</script>

<output class="display">
    <div class="text">
        {value}
    </div>
</output>

<style>
    .display {
        --padding-block: 0.725em;

        color: var(--color-display);
        background-color: var(--color-display-bg);
        border-radius: var(--border-radius-display);
        font-size: var(--font-size-display);
        letter-spacing: var(--letter-spacing-display);
        line-height: 1;
        padding-inline: 0.6em;
        height: clamp(5.5rem, 3rem + 10vw, 8rem);

        overflow: hidden;
    }

    .display {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .text {
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: right;
    }
</style>
