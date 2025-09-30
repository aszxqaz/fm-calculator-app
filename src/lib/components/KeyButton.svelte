<script lang="ts">
    export type KeyButtonVariant = 'secondary' | 'accent';

    export type KeyButtonType = 'text';

    type Props = {
        variant?: KeyButtonVariant;
        type?: KeyButtonType;
        children: any;
        className?: string;
    } & {
        [k: string]: any;
    };

    const { children, variant, type, className, ...props }: Props = $props();
</script>

<button class={['button', variant, type, className]} {...props}>
    {@render children()}
</button>

<style>
    .button {
        --background-color: var(--color-keybutton-bg-primary);
        --background-color-active: var(--color-keybutton-primary-active);
        --shadow-color: var(--color-keybutton-primary-shadow);
        --box-shadow-offset-y: 4px;

        width: 100%;
        display: grid;
        place-items: center;

        color: var(--color-keybutton-primary);
        background-color: var(--background-color);
        border-radius: clamp(0.3125rem, 1.27vw, 0.625rem);
        box-shadow: 0 var(--box-shadow-offset-y) 0 0 var(--shadow-color);
        user-select: none;
        -webkit-tap-highlight-color: transparent;

        transition:
            background-color 0.2s,
            transform 0.2s,
            box-shadow 0.2s;

        @media (hover: hover) {
            &:not(:disabled):hover {
                background-color: var(--background-color-active);
            }
        }

        &:active,
        &.active {
            background-color: var(--background-color-active);
            --box-shadow-offset-y: 2px;
            transform: translateY(2px);
        }

        &:focus-visible {
            outline: var(--box-shadow-offset-y) solid var(--color-body);
        }
    }

    .button {
        font-size: var(--font-size-keybutton-digit);
        color: var(--color-keybutton-primary);
    }

    .button.text {
        font-size: var(--font-size-keybutton-text);
        letter-spacing: var(--letter-spacing-keybutton-text);
        text-transform: uppercase;
    }

    .button.secondary {
        --background-color: var(--color-keybutton-bg-secondary);
        --background-color-active: var(--color-keybutton-secondary-active);
        --shadow-color: var(--color-keybutton-secondary-shadow);
        color: var(--color-keybutton-secondary);
    }

    .button.accent {
        --background-color: var(--color-keybutton-bg-accent);
        --background-color-active: var(--color-keybutton-accent-active);
        --shadow-color: var(--color-keybutton-accent-shadow);
        color: var(--color-keybutton-accent);
    }
</style>
